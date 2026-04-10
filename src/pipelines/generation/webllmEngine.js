/**
 * Single shared MLCEngine for dev: avoids reloading the model on every chunk / import.
 * Switching `activeModelId` in webllmDevConfig unloads the previous model on next load.
 */

import { webllmDevConfig } from "../../config/webllmDevConfig";

/** @type {unknown} */
let engineInstance = null;
/** @type {string | null} */
let loadedModelId = null;

/**
 * @param {{ modelId?: string, onInitProgress?: (report: { progress: number, text: string }) => void }} opts
 * @returns {Promise<{ ok: true, engine: unknown } | { ok: false, error: unknown }>}
 */
export async function getSharedWebLlmEngine(opts = {}) {
  const modelId =
    typeof opts.modelId === "string" && opts.modelId.trim().length > 0
      ? opts.modelId.trim()
      : webllmDevConfig.activeModelId;

  if (engineInstance && loadedModelId !== modelId) {
    await unloadSharedWebLlmEngine();
  }

  if (engineInstance && loadedModelId === modelId) {
    return { ok: true, engine: engineInstance };
  }

  try {
    const { CreateMLCEngine } = await import("@mlc-ai/web-llm");
    const wrapProgress =
      opts.onInitProgress ||
      (webllmDevConfig.logInitProgressToConsole
        ? (report) => {
            console.info("[WebLLM]", report.text, report.progress);
          }
        : undefined);

    const engine = await CreateMLCEngine(modelId, {
      initProgressCallback: wrapProgress,
    });
    engineInstance = engine;
    loadedModelId = modelId;
    return { ok: true, engine };
  } catch (error) {
    engineInstance = null;
    loadedModelId = null;
    return { ok: false, error };
  }
}

export async function unloadSharedWebLlmEngine() {
  if (!engineInstance) return;
  try {
    await /** @type {{ unload: () => Promise<void> }} */ (engineInstance).unload();
  } catch {
    /* ignore */
  } finally {
    engineInstance = null;
    loadedModelId = null;
  }
}
