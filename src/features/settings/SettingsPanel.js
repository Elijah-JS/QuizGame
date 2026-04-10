import React, { useCallback } from "react";
import { useStore } from "../../providers/StoreProvider";
import { clearAllUserDeckProgress } from "../../shared/utils/userDeckProgressStorage";
import { webllmDevConfig } from "../../config/webllmDevConfig";
import {
  SETTINGS_MAX_CHUNKS_MAX,
  SETTINGS_MAX_CHUNKS_MIN,
  WEBLLM_MODEL_CHOICES,
} from "../../config/webLlmModels";
import { getWebGpuAvailability, getWebLlmEnvironmentSummary } from "../../pipelines/generation/webllmCapabilities";
import {
  GENERATION_MODE_HYBRID,
  GENERATION_MODE_LOCAL_AI,
  GENERATION_MODE_RULES,
} from "../../pipelines/generateStudyItems";

const panelClass =
  "rounded-xl border border-arc-border bg-arc-panel shadow-arc-inset overflow-hidden";
const panelHeaderClass = "px-5 sm:px-6 py-4 border-b border-arc-border bg-arc-inset/40";
const panelBodyClass = "px-5 sm:px-6 py-5 space-y-4";
const inputClass =
  "w-full max-w-md bg-arc-inset border border-arc-border-bright rounded-lg px-3 py-2.5 text-sm min-h-[44px] text-arc-fg focus:outline-none focus:ring-2 focus:ring-arc-accent/35";
const numberClass =
  "w-full max-w-[8rem] bg-arc-inset border border-arc-border-bright rounded-lg px-3 py-2 text-sm text-arc-fg focus:outline-none focus:ring-2 focus:ring-arc-accent/35";

export default function SettingsPanel() {
  const { settings, updateSettings } = useStore();
  const genMode = settings.generationMode || GENERATION_MODE_RULES;
  const aiModesOn = genMode === GENERATION_MODE_LOCAL_AI || genMode === GENERATION_MODE_HYBRID;
  const webGpu = getWebGpuAvailability();

  const handleClearDeckProgress = useCallback(() => {
    if (
      !window.confirm(
        "Clear all study progress for every saved deck in this browser? Decks and cards stay; only review stats reset."
      )
    ) {
      return;
    }
    clearAllUserDeckProgress();
  }, []);

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <header className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-arc-muted font-display">
          Settings
        </p>
        <h1 className="text-2xl sm:text-[1.65rem] font-semibold tracking-tight font-display text-arc-fg">
          Control center
        </h1>
        <p className="text-sm text-arc-muted leading-relaxed max-w-xl">
          Adjust how decks are generated and how you study. Changes apply to this browser only.
        </p>
      </header>

      {/* AI & Generation */}
      <section className={panelClass} aria-labelledby="settings-ai-heading">
        <div className={panelHeaderClass}>
          <h2 id="settings-ai-heading" className="text-base font-semibold font-display text-arc-fg">
            AI &amp; generation
          </h2>
          <p className="text-xs text-arc-muted mt-1 leading-relaxed">
            On-device models run with WebLLM (WebGPU). Saved decks are unchanged when you switch
            models—only the next import uses the new choice.
          </p>
        </div>
        <div className={panelBodyClass}>
          <div>
            <label className="text-sm font-medium text-arc-subtle block mb-1.5" htmlFor="generation-mode">
              Generation mode
            </label>
            <select
              id="generation-mode"
              value={genMode}
              onChange={(e) => updateSettings({ generationMode: e.target.value })}
              className={inputClass}
            >
              <option value={GENERATION_MODE_RULES}>Rules only — works in any browser</option>
              <option value={GENERATION_MODE_LOCAL_AI}>Local AI — WebLLM, falls back to rules if needed</option>
              <option value={GENERATION_MODE_HYBRID}>Hybrid — AI per chunk when possible, rules fill gaps</option>
            </select>
            <p className="text-[11px] text-arc-dim mt-2 leading-relaxed">
              Local AI and Hybrid need WebGPU. If the model cannot load, Local AI uses a full rules
              deck; Hybrid uses rules for failed chunks.
            </p>
          </div>

          <div
            className={
              "rounded-lg border px-3 py-2.5 text-xs leading-relaxed " +
              (webGpu.ok
                ? "border-arc-ok-border/60 bg-arc-ok-surface/35 text-arc-muted"
                : "border-arc-warn-border/50 bg-arc-warn-surface/40 text-arc-muted")
            }
            role="status"
          >
            {getWebLlmEnvironmentSummary()}
          </div>

          <div>
            <span className="text-sm font-medium text-arc-subtle block mb-2">Local AI model</span>
            <p className="text-[11px] text-arc-dim mb-3 leading-relaxed">
              {aiModesOn
                ? "Used for the next import when mode is Local AI or Hybrid."
                : "Not used while mode is Rules only. Your choice is saved for when you enable AI."}
            </p>
            <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="WebLLM model">
              {WEBLLM_MODEL_CHOICES.map((m) => {
                const selected = settings.webLlmModelId === m.id;
                return (
                  <label
                    key={m.id}
                    className={
                      "relative flex flex-col rounded-xl border p-4 cursor-pointer transition-all duration-200 text-left motion-safe:active:scale-[0.99] " +
                      (selected
                        ? "border-arc-primary bg-arc-primary/10 shadow-arc-glow ring-1 ring-arc-primary/25"
                        : "border-arc-border bg-arc-inset/50 hover:border-arc-border-bright hover:bg-arc-inset")
                    }
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      name="webllm-model"
                      value={m.id}
                      checked={selected}
                      onChange={() => updateSettings({ webLlmModelId: m.id })}
                    />
                    <span className="text-sm font-semibold font-display text-arc-fg pr-16">{m.name}</span>
                    <span className="text-[11px] text-arc-accent font-medium mt-0.5">{m.tagline}</span>
                    <p className="text-xs text-arc-muted mt-2 leading-relaxed">{m.detail}</p>
                    {selected ? (
                      <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-arc-primary">
                        Active
                      </span>
                    ) : null}
                  </label>
                );
              })}
            </div>
            <p className="text-[11px] text-arc-dim mt-2 font-mono break-all opacity-90">
              ID: {settings.webLlmModelId}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-arc-subtle block mb-1" htmlFor="max-chunks-ai">
              Max AI chunks per import
            </label>
            <input
              id="max-chunks-ai"
              type="number"
              min={SETTINGS_MAX_CHUNKS_MIN}
              max={SETTINGS_MAX_CHUNKS_MAX}
              value={settings.maxChunksForAi}
              onChange={(e) => updateSettings({ maxChunksForAi: Number(e.target.value) })}
              className={numberClass}
            />
            <p className="text-[11px] text-arc-dim mt-2 leading-relaxed">
              Caps how many text chunks run through WebLLM per run ({SETTINGS_MAX_CHUNKS_MIN}–
              {SETTINGS_MAX_CHUNKS_MAX}). Extra chunks are skipped (Local AI) or filled with rules
              (Hybrid). Default in code: {webllmDevConfig.maxChunksForAi}.
            </p>
          </div>

          <details className="text-xs text-arc-muted rounded-lg border border-arc-border bg-arc-inset/40 px-3 py-2">
            <summary className="cursor-pointer select-none text-arc-subtle font-medium py-1">
              Technical notes
            </summary>
            <ul className="list-disc pl-5 mt-2 space-y-1 leading-relaxed text-arc-dim">
              <li>
                Completion timeout per chunk:{" "}
                <span className="tabular-nums">{webllmDevConfig.completionTimeoutMs}</span>
                ms (set in dev config).
              </li>
              <li>Switching models unloads the previous WebLLM engine on the next generation run.</li>
            </ul>
          </details>
        </div>
      </section>

      {/* Study & Progress */}
      <section className={panelClass} aria-labelledby="settings-study-heading">
        <div className={panelHeaderClass}>
          <h2 id="settings-study-heading" className="text-base font-semibold font-display text-arc-fg">
            Study &amp; progress
          </h2>
          <p className="text-xs text-arc-muted mt-1 leading-relaxed">
            Session sizes for quiz and cram. Learn mode uses your full deck order (due-first when
            applicable).
          </p>
        </div>
        <div className={panelBodyClass}>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="text-sm text-arc-subtle block mb-1" htmlFor="quiz-length">
                Quiz length
              </label>
              <input
                id="quiz-length"
                type="number"
                min={5}
                max={50}
                value={settings.quizLength}
                onChange={(e) => updateSettings({ quizLength: Number(e.target.value) })}
                className={numberClass}
              />
              <p className="text-[11px] text-arc-dim mt-1">Cards per quiz session (5–50).</p>
            </div>
            <div>
              <label className="text-sm text-arc-subtle block mb-1" htmlFor="cram-length">
                Cram session size
              </label>
              <input
                id="cram-length"
                type="number"
                min={5}
                max={100}
                value={settings.cramLength}
                onChange={(e) => updateSettings({ cramLength: Number(e.target.value) })}
                className={numberClass}
              />
              <p className="text-[11px] text-arc-dim mt-1">Cards per cram shuffle (5–100).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Storage / Cleanup */}
      <section className={panelClass} aria-labelledby="settings-storage-heading">
        <div className={panelHeaderClass}>
          <h2 id="settings-storage-heading" className="text-base font-semibold font-display text-arc-fg">
            Storage &amp; cleanup
          </h2>
          <p className="text-xs text-arc-muted mt-1 leading-relaxed">
            Decks and cards stay on this device. You can reset study statistics without deleting
            decks.
          </p>
        </div>
        <div className={panelBodyClass}>
          <p className="text-sm text-arc-muted leading-relaxed">
            Clears Learn/Quiz scheduling and progress for <span className="text-arc-subtle">all</span>{" "}
            saved decks in this browser. Does not remove decks or card text.
          </p>
          <button
            type="button"
            onClick={handleClearDeckProgress}
            className="px-4 py-2.5 rounded-lg border border-arc-bad-border bg-arc-bad-surface/60 text-arc-bad text-sm font-medium hover:bg-arc-bad-surface/80 transition motion-safe:active:scale-[0.98]"
          >
            Clear all deck study progress
          </button>
        </div>
      </section>
    </div>
  );
}
