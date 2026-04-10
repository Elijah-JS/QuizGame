import {
  createGeneratedItemId,
  GENERATED_ITEM_TYPE_FLASHCARD,
} from "../../domain/generatedStudyItem";
import { webllmDevConfig } from "../../config/webllmDevConfig";
import { buildFlashcardPrompt, parseAiFlashcardJson } from "./aiFlashcardJson";
import { buildRuleItemFromChunk } from "./generateWithRules";
import {
  ensureWebLlmEngineForGeneration,
  pickWebLlmOptions,
  webLlmCompleteFlashcardPrompt,
} from "./webllmFlashcardCompletion";

function difficultyForChunk(chunk) {
  return String(chunk).length > 220 ? "medium" : "simple";
}

/**
 * Try WebLLM per chunk; fill gaps with rule-based cards. If WebGPU/engine fails, rules only.
 *
 * @param {string[]} chunks
 * @param {Record<string, unknown>} [options]
 * @returns {Promise<import("../../domain/generatedStudyItem").GeneratedStudyItemV1[]>}
 */
export async function generateWithHybrid(chunks, options = {}) {
  if (!Array.isArray(chunks)) return [];

  const webOpts = pickWebLlmOptions(options);
  const maxPrompts =
    typeof webOpts.maxChunks === "number" && webOpts.maxChunks > 0
      ? webOpts.maxChunks
      : webllmDevConfig.maxChunksForAi;
  const timeoutMs =
    typeof webOpts.completionTimeoutMs === "number" && webOpts.completionTimeoutMs > 0
      ? webOpts.completionTimeoutMs
      : webllmDevConfig.completionTimeoutMs;

  const engineGate = await ensureWebLlmEngineForGeneration(webOpts);
  if (!engineGate.ok) {
    return chunks.map((c, i) => buildRuleItemFromChunk(c, i)).filter(Boolean);
  }

  const { engine } = engineGate;
  let promptsUsed = 0;
  const out = /** @type {import("../../domain/generatedStudyItem").GeneratedStudyItemV1[]} */ ([]);

  for (let i = 0; i < chunks.length; i++) {
    const sourceChunk = String(chunks[i]).trim();
    if (!sourceChunk) continue;

    let row = null;
    if (promptsUsed < maxPrompts) {
      promptsUsed += 1;
      try {
        const resp = await webLlmCompleteFlashcardPrompt(
          engine,
          buildFlashcardPrompt(sourceChunk),
          timeoutMs
        );
        const parsed = parseAiFlashcardJson(resp);
        if (parsed) {
          row = {
            id: createGeneratedItemId(i, sourceChunk),
            type: GENERATED_ITEM_TYPE_FLASHCARD,
            sourceChunk,
            question: parsed.question,
            answer: parsed.answer,
            difficulty: difficultyForChunk(sourceChunk),
            tags: ["hybrid", "local-ai", "webllm", ...parsed.tags],
          };
        }
      } catch {
        /* use rules below */
      }
    }

    if (!row) {
      const fallback = buildRuleItemFromChunk(chunks[i], i);
      if (fallback) {
        row = {
          ...fallback,
          tags: [...fallback.tags, "hybrid"],
        };
      }
    }

    if (row) out.push(row);
  }

  return out;
}
