/**
 * Run one strict-JSON flashcard prompt through a loaded WebLLM engine (dev spike).
 */

import { webllmDevConfig } from "../../config/webllmDevConfig";
import { getSharedWebLlmEngine } from "./webllmEngine";
import { getWebGpuAvailability } from "./webllmCapabilities";

/**
 * @param {number} ms
 * @param {string} label
 */
function withTimeout(promise, ms, label) {
  let timer;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(label)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

/**
 * @param {unknown} engine — loaded MLCEngine from @mlc-ai/web-llm
 * @param {string} userPrompt
 * @param {number} [timeoutMs]
 * @returns {Promise<string>}
 */
export async function webLlmCompleteFlashcardPrompt(engine, userPrompt, timeoutMs) {
  const cap =
    typeof timeoutMs === "number" && timeoutMs > 0 ? timeoutMs : webllmDevConfig.completionTimeoutMs;

  const completion = await withTimeout(
    /** @type {{ chat: { completions: { create: Function } } }} */ (engine).chat.completions.create({
      messages: [{ role: "user", content: userPrompt }],
      temperature: 0.2,
      max_tokens: 512,
    }),
    cap,
    "WebLLM completion timed out"
  );

  const content = completion?.choices?.[0]?.message?.content;
  return typeof content === "string" ? content : "";
}

/**
 * @typedef {object} WebLlmFlashcardGenOptions
 * @property {string} [modelId]
 * @property {number} [maxChunks]
 * @property {number} [completionTimeoutMs]
 * @property {(report: { progress: number, text: string }) => void} [onWebLlmInitProgress]
 * @property {(ev: { type: string, message: string }) => void} [onWebLlmEvent]
 */

/**
 * Acquire engine after WebGPU check; surfaces dev errors via onWebLlmEvent.
 * @param {WebLlmFlashcardGenOptions} options
 * @returns {Promise<{ ok: true, engine: unknown } | { ok: false }>}
 */
export async function ensureWebLlmEngineForGeneration(options = {}) {
  const gpu = getWebGpuAvailability();
  if (!gpu.ok) {
    options.onWebLlmEvent?.({ type: "webgpu", message: gpu.userMessage });
    return { ok: false };
  }

  const modelId =
    typeof options.modelId === "string" && options.modelId.trim().length > 0
      ? options.modelId.trim()
      : webllmDevConfig.activeModelId;

  const mergedProgress = (report) => {
    if (webllmDevConfig.logInitProgressToConsole) {
      console.info("[WebLLM]", report.text, Math.round((report.progress ?? 0) * 100), "%");
    }
    options.onWebLlmInitProgress?.(report);
  };

  const res = await getSharedWebLlmEngine({
    modelId,
    onInitProgress: mergedProgress,
  });

  if (!res.ok) {
    const msg = res.error instanceof Error ? res.error.message : String(res.error);
    options.onWebLlmEvent?.({
      type: "engine",
      message: `WebLLM could not load model "${modelId}": ${msg}`,
    });
    return { ok: false };
  }

  return { ok: true, engine: res.engine };
}

/**
 * @param {Record<string, unknown>} [raw]
 * @returns {WebLlmFlashcardGenOptions}
 */
export function pickWebLlmOptions(raw) {
  if (!raw || typeof raw !== "object") return {};
  const o = /** @type {WebLlmFlashcardGenOptions} */ ({
    modelId: typeof raw.modelId === "string" ? raw.modelId : undefined,
    maxChunks: typeof raw.maxChunks === "number" ? raw.maxChunks : undefined,
    completionTimeoutMs:
      typeof raw.completionTimeoutMs === "number" ? raw.completionTimeoutMs : undefined,
    onWebLlmInitProgress:
      typeof raw.onWebLlmInitProgress === "function" ? raw.onWebLlmInitProgress : undefined,
    onWebLlmEvent: typeof raw.onWebLlmEvent === "function" ? raw.onWebLlmEvent : undefined,
  });
  return o;
}
