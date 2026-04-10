import {
  createGeneratedItemId,
  GENERATED_ITEM_TYPE_FLASHCARD,
} from "../../domain/generatedStudyItem";
import { webllmDevConfig } from "../../config/webllmDevConfig";
import { buildFlashcardPrompt, parseAiFlashcardJson } from "./aiFlashcardJson";
import {
  ensureWebLlmEngineForGeneration,
  pickWebLlmOptions,
  webLlmCompleteFlashcardPrompt,
} from "./webllmFlashcardCompletion";
import { normalizeGeneratedItems } from "./normalizeGeneratedItems";

function difficultyForChunk(chunk) {
  return String(chunk).length > 220 ? "medium" : "simple";
}

function countNonEmptyChunks(chunks) {
  if (!Array.isArray(chunks)) return 0;
  return chunks.reduce((n, c) => (String(c).trim() ? n + 1 : n), 0);
}

/**
 * WebLLM-backed local generation (dev spike). Returns partial output if some chunks fail;
 * {@link generateStudyItems} falls back to rules when coverage is incomplete.
 *
 * @param {string[]} chunks
 * @param {Record<string, unknown>} [options] — see {@link pickWebLlmOptions}; may include maxChunks, completionTimeoutMs, modelId, callbacks
 * @returns {Promise<import("../../domain/generatedStudyItem").GeneratedStudyItemV1[]>}
 *
 * @see ./localAIContract.js
 */
export async function generateWithLocalAI(chunks, options = {}) {
  if (!Array.isArray(chunks) || !chunks.length) return [];

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
  if (!engineGate.ok) return [];

  const { engine } = engineGate;
  const out = /** @type {import("../../domain/generatedStudyItem").GeneratedStudyItemV1[]} */ ([]);

  let promptsUsed = 0;
  for (let i = 0; i < chunks.length; i++) {
    const sourceChunk = String(chunks[i]).trim();
    if (!sourceChunk) continue;

    if (promptsUsed >= maxPrompts) break;
    promptsUsed += 1;

    let resp = "";
    try {
      resp = await webLlmCompleteFlashcardPrompt(
        engine,
        buildFlashcardPrompt(sourceChunk),
        timeoutMs
      );
    } catch (e) {
      webOpts.onWebLlmEvent?.({
        type: "chunk",
        message: `WebLLM chunk failed: ${e instanceof Error ? e.message : String(e)}`,
      });
      continue;
    }

    const parsed = parseAiFlashcardJson(resp);
    if (!parsed) continue;

    out.push({
      id: createGeneratedItemId(i, sourceChunk),
      type: GENERATED_ITEM_TYPE_FLASHCARD,
      sourceChunk,
      question: parsed.question,
      answer: parsed.answer,
      difficulty: difficultyForChunk(sourceChunk),
      tags: ["local-ai", "webllm", ...parsed.tags],
    });
  }

  return out;
}

/**
 * True when normalized AI output covers every non-empty chunk (same count).
 * @param {import("../../domain/generatedStudyItem").GeneratedStudyItemV1[]} raw
 * @param {string[]} chunks
 */
export function isLocalAiCoverageComplete(raw, chunks) {
  const need = countNonEmptyChunks(chunks);
  if (need === 0) return true;
  return normalizeGeneratedItems(raw).length === need;
}
