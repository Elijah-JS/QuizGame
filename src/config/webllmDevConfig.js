/**
 * WebLLM defaults and dev-only toggles. User-facing model choice lives in app settings
 * (`webLlmModelId`); these values apply when no override is passed and as factory defaults.
 */

/** @type {string} Default spike model — light instruct, q4f16. */
export const WEBLLM_MODEL_SMOL = "SmolLM2-1.7B-Instruct-q4f16_1-MLC";

/** @type {string} Step-up model when SmolLM2 quality is too weak (still not 7B/8B). */
export const WEBLLM_MODEL_HERMES_3B = "Hermes-3-Llama-3.2-3B-q4f16_1-MLC";

export const webllmDevConfig = {
  /** Fallback when generation options do not pass `modelId` (e.g. older callers). */
  activeModelId: WEBLLM_MODEL_SMOL,

  /** Default max non-empty chunks per import for AI paths; user may override in Settings. */
  maxChunksForAi: 24,

  /** Per-chunk chat completion cap (model JSON is small; keeps hangs bounded). */
  completionTimeoutMs: 120_000,

  /** Log model download / init progress from WebLLM to the console. */
  logInitProgressToConsole: true,
};
