/**
 * How study items are produced. "rules" is the default; local-ai / hybrid use WebLLM (WebGPU) in dev.
 */

/** @typedef {"rules"|"local-ai"|"hybrid"} GenerationMode */

export const GENERATION_MODE_RULES = "rules";
export const GENERATION_MODE_LOCAL_AI = "local-ai";
export const GENERATION_MODE_HYBRID = "hybrid";

/** @type {GenerationMode} */
export const DEFAULT_GENERATION_MODE = GENERATION_MODE_RULES;

const VALID = new Set([
  GENERATION_MODE_RULES,
  GENERATION_MODE_LOCAL_AI,
  GENERATION_MODE_HYBRID,
]);

/**
 * @param {unknown} mode
 * @returns {GenerationMode}
 */
export function coerceGenerationMode(mode) {
  if (typeof mode === "string" && VALID.has(mode)) return /** @type {GenerationMode} */ (mode);
  return DEFAULT_GENERATION_MODE;
}
