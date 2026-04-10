/**
 * Local AI generation contract (dev spike: WebLLM).
 *
 * ## Runtime (current)
 * - **WebLLM** (`@mlc-ai/web-llm`): runs in-browser on **WebGPU**. First run downloads model weights
 *   (cached by the browser). No cloud inference API and no Study Coach backend.
 *
 * ## Input
 * - `chunks: string[]` — ingest chunks (sentences/lines).
 * - `options.maxChunks` — max WebLLM completion calls per run (see `webllmDevConfig.maxChunksForAi`).
 * - Optional callbacks: `onWebLlmInitProgress`, `onWebLlmEvent` (dev UX / diagnostics).
 *
 * ## Output
 * - `GeneratedStudyItemV1[]` — same schema as rules. Orchestrator always runs
 *   {@link normalizeGeneratedItems} on the final list.
 *
 * ## Fallback
 * - **rules** mode: rules only.
 * - **local-ai** mode: WebLLM first; if coverage is incomplete or WebGPU/engine fails, **full rules** deck.
 * - **hybrid** mode: WebLLM per chunk when possible; **rules** fill per-chunk gaps; if engine unavailable, **rules only**.
 */

/** @typedef {import("../../domain/generatedStudyItem").GeneratedStudyItemV1} GeneratedStudyItemV1 */
