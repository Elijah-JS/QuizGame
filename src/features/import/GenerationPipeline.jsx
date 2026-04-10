import React from "react";

const STEPS = [
  { key: "reading", label: "Reading material" },
  { key: "analyzing", label: "Analyzing concepts" },
  { key: "planning", label: "Planning deck" },
  { key: "generating", label: "Generating cards" },
  { key: "finalizing", label: "Finalizing results" },
];

/**
 * @param {{ activeKey: string | null, detail?: string | null }} props
 */
export default function GenerationPipeline({ activeKey, detail }) {
  const idx = activeKey ? STEPS.findIndex((s) => s.key === activeKey) : -1;

  return (
    <div
      className="rounded-2xl border border-arc-border-bright/70 bg-arc-inset/90 px-4 py-5 sm:px-6 sm:py-6 shadow-arc-inset"
      role="status"
      aria-live="polite"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-arc-muted mb-4 font-display">
        Processing
      </p>
      <ol className="space-y-0 list-none p-0 m-0">
        {STEPS.map((step, i) => {
          const done = idx > i;
          const active = idx === i;
          return (
            <li key={step.key} className="flex gap-3 sm:gap-4 min-h-[44px] items-start">
              <div
                className={
                  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border text-[11px] font-mono tabular-nums transition-colors duration-200 " +
                  (done
                    ? "border-arc-ok-border bg-arc-ok-surface/80 text-arc-ok"
                    : active
                      ? "border-arc-accent/55 bg-arc-accent-soft text-arc-fg shadow-[0_0_0_1px_rgba(62,173,193,0.15)]"
                      : "border-arc-border bg-arc-panel/50 text-arc-dim")
                }
                aria-hidden
              >
                {done ? "\u2713" : active ? "\u2022" : i + 1}
              </div>
              <div className="min-w-0 pt-0.5">
                <p
                  className={
                    "text-sm leading-snug " +
                    (active ? "text-arc-fg font-medium" : done ? "text-arc-muted" : "text-arc-dim")
                  }
                >
                  {step.label}
                </p>
                {active && detail ? (
                  <p className="text-xs text-arc-muted mt-1 leading-relaxed break-words">{detail}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
