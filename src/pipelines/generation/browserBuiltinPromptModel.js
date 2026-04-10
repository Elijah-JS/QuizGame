/**
 * Chrome / Chromium on-device Prompt API (experimental).
 * Study Coach generation now uses WebLLM (see webllmEngine.js); this module is kept for reference.
 *
 * Runs locally in the browser — no cloud API keys and no Study Coach backend.
 *
 * Availability varies by browser, flags, and hardware. When unavailable, helpers return null.
 *
 * @see https://developer.chrome.com/docs/ai/build-with-ai
 * @see https://github.com/explainers-by-googlers/prompt-api
 */

/**
 * @typedef {object} BuiltinPromptSession
 * @property {(input: string) => Promise<string>} prompt
 * @property {() => Promise<void>} [destroy]
 */

/**
 * @returns {Promise<BuiltinPromptSession | null>}
 */
export async function createBrowserBuiltinPromptSession() {
  if (typeof window === "undefined") return null;
  try {
    const LM = window.LanguageModel;
    if (LM && typeof LM.create === "function") {
      if (typeof LM.availability === "function") {
        const a = await LM.availability();
        if (a === "unavailable") return null;
      }
      const session = await LM.create();
      return {
        prompt: (input) => session.prompt(input),
        destroy: () => session.destroy?.() ?? session.close?.() ?? Promise.resolve(),
      };
    }
  } catch {
    /* ignore */
  }

  try {
    const lm = window.ai?.languageModel;
    if (lm && typeof lm.create === "function") {
      const session = await lm.create();
      return {
        prompt: (input) => session.prompt(input),
        destroy: () => session.destroy?.() ?? session.close?.() ?? Promise.resolve(),
      };
    }
  } catch {
    /* ignore */
  }

  return null;
}
