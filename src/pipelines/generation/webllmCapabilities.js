/**
 * WebLLM / WebGPU capability checks for dev-facing messages (no engine load).
 */

/**
 * @returns {{ ok: true } | { ok: false, userMessage: string }}
 */
export function getWebGpuAvailability() {
  if (typeof navigator === "undefined") {
    return { ok: false, userMessage: "WebLLM needs a browser tab (navigator missing)." };
  }
  if (!navigator.gpu) {
    return {
      ok: false,
      userMessage:
        "WebGPU is not available in this browser. Use a recent Chromium-based browser with WebGPU enabled, or use Rules only in Settings.",
    };
  }
  return { ok: true };
}

/**
 * One-line summary for Settings / diagnostics.
 * @returns {string}
 */
export function getWebLlmEnvironmentSummary() {
  const gpu = getWebGpuAvailability();
  if (!gpu.ok) return gpu.userMessage;
  return "WebGPU is exposed — WebLLM can run after the model downloads.";
}
