import React from "react";

/** Legacy chunk preview — not used in the main import UX; kept for optional tooling. */
export default function ImportPreview({ chunks }) {
  if (!chunks?.length) return null;

  return (
    <div className="rounded-xl border border-arc-border bg-arc-panel overflow-hidden shadow-arc-inset">
      <div className="px-4 py-3 border-b border-arc-border flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold font-display text-arc-fg">Preview</h2>
        <span className="text-xs text-arc-muted tabular-nums">{chunks.length} chunks</span>
      </div>
      <ul
        className="max-h-[min(50vh,28rem)] overflow-y-auto divide-y divide-arc-border"
        aria-label="Text chunks"
      >
        {chunks.map((chunk, i) => (
          <li key={i} className="px-4 py-3 text-sm text-arc-subtle/95 leading-relaxed">
            <span className="text-[11px] text-arc-dim font-mono mr-2 select-none">
              {i + 1}.
            </span>
            {chunk}
          </li>
        ))}
      </ul>
    </div>
  );
}
