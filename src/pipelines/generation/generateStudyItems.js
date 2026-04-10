import {
  coerceGenerationMode,
  DEFAULT_GENERATION_MODE,
  GENERATION_MODE_HYBRID,
  GENERATION_MODE_LOCAL_AI,
  GENERATION_MODE_RULES,
} from "./generationMode";
import { generateWithRules } from "./generateWithRules";
import { generateWithLocalAI, isLocalAiCoverageComplete } from "./generateWithLocalAI";
import { generateWithHybrid } from "./generateWithHybrid";
import { normalizeGeneratedItems } from "./normalizeGeneratedItems";
import { buildGenerationPlan } from "./deckPlanning";

export {
  DEFAULT_GENERATION_MODE,
  GENERATION_MODE_HYBRID,
  GENERATION_MODE_LOCAL_AI,
  GENERATION_MODE_RULES,
} from "./generationMode";

/**
 * @typedef {import("./generationMode").GenerationMode} GenerationMode
 */

/**
 * @typedef {object} GenerateStudyItemsOptions
 * @property {GenerationMode} [mode] — defaults to {@link DEFAULT_GENERATION_MODE}
 * @property {Record<string, unknown>} [localAIOptions] — WebLLM: `maxChunks`, `completionTimeoutMs`,
 *   `modelId`, `onWebLlmInitProgress`, `onWebLlmEvent` (see webllmFlashcardCompletion / webllmDevConfig)
 * @property {(stage: "analyzing"|"planning"|"generating"|"finalizing") => void} [onGenerationStage]
 */

/**
 * Orchestrates rule-based, on-device AI, and hybrid generation.
 *
 * @param {string[]} chunks
 * @param {GenerateStudyItemsOptions} [options]
 * @returns {Promise<import("../../domain/generatedStudyItem").GeneratedStudyItemV1[]>}
 */
export async function generateStudyItems(chunks, options = {}) {
  const mode = coerceGenerationMode(options.mode ?? DEFAULT_GENERATION_MODE);
  const localOpts = options.localAIOptions || {};
  const onStage = options.onGenerationStage;
  const planning = buildGenerationPlan(chunks, { onStage });
  const plannedChunks =
    planning.plannedChunks.length > 0 ? planning.plannedChunks : Array.isArray(chunks) ? chunks : [];

  onStage?.("generating");
  let raw;
  switch (mode) {
    case GENERATION_MODE_LOCAL_AI: {
      raw = await generateWithLocalAI(plannedChunks, localOpts);
      if (!isLocalAiCoverageComplete(raw, plannedChunks)) {
        raw = generateWithRules(plannedChunks);
      }
      break;
    }
    case GENERATION_MODE_HYBRID:
      raw = await generateWithHybrid(plannedChunks, localOpts);
      break;
    case GENERATION_MODE_RULES:
    default:
      raw = generateWithRules(plannedChunks);
      break;
  }

  onStage?.("finalizing");
  return normalizeGeneratedItems(raw);
}
