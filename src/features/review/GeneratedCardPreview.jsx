import React, { useState, useCallback } from "react";

const SOURCE_PREVIEW_LEN = 160;

export default function GeneratedCardPreview({ item, onChange, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [draftQ, setDraftQ] = useState(item.question);
  const [draftA, setDraftA] = useState(item.answer);

  const openEdit = useCallback(() => {
    setDraftQ(item.question);
    setDraftA(item.answer);
    setEditing(true);
  }, [item.question, item.answer]);

  const cancelEdit = useCallback(() => {
    setDraftQ(item.question);
    setDraftA(item.answer);
    setEditing(false);
  }, [item.question, item.answer]);

  const saveEdit = useCallback(() => {
    onChange({
      question: draftQ.trim() || item.question,
      answer: draftA.trim() || item.answer,
    });
    setEditing(false);
  }, [draftQ, draftA, item.question, item.answer, onChange]);

  const sourcePreview =
    item.sourceChunk.length > SOURCE_PREVIEW_LEN
      ? `${item.sourceChunk.slice(0, SOURCE_PREVIEW_LEN)}…`
      : item.sourceChunk;

  return (
    <article className="rounded-xl border border-arc-border bg-arc-panel/95 p-4 sm:p-5 space-y-3 shadow-arc-card transition-all duration-200 hover:border-arc-border-bright/85">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider text-arc-muted font-display">
          <span className="text-arc-subtle">{item.type}</span>
          <span className="text-arc-dim">•</span>
          <span>{item.difficulty}</span>
          {item.tags?.length > 0 && (
            <>
              <span className="text-arc-dim">•</span>
              <span className="normal-case text-arc-muted">{item.tags.join(", ")}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {!editing ? (
            <button
              type="button"
              onClick={openEdit}
              className="text-xs px-3 py-1.5 rounded-lg border border-arc-border-bright bg-arc-panel-soft text-arc-subtle hover:bg-arc-inset transition motion-safe:active:scale-[0.98]"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={saveEdit}
                className="text-xs px-3 py-1.5 rounded-lg bg-arc-primary text-arc-ink hover:bg-arc-primary-hover font-medium transition motion-safe:active:scale-[0.98]"
              >
                Save
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="text-xs px-3 py-1.5 rounded-lg border border-arc-border-bright bg-arc-panel-soft text-arc-subtle hover:bg-arc-inset transition"
              >
                Cancel
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onRemove}
            className="text-xs px-3 py-1.5 rounded-lg border border-arc-bad-border text-arc-bad hover:bg-arc-bad-surface/60 transition"
          >
            Remove
          </button>
        </div>
      </div>

      {editing ? (
        <div className="space-y-3">
          <div>
            <label className="text-[11px] text-arc-muted block mb-1">Question</label>
            <textarea
              value={draftQ}
              onChange={(e) => setDraftQ(e.target.value)}
              rows={3}
              className="w-full rounded-lg bg-arc-inset border border-arc-border-bright text-sm px-3 py-2 text-arc-fg focus:outline-none focus:ring-2 focus:ring-arc-accent/35"
            />
          </div>
          <div>
            <label className="text-[11px] text-arc-muted block mb-1">Answer</label>
            <textarea
              value={draftA}
              onChange={(e) => setDraftA(e.target.value)}
              rows={4}
              className="w-full rounded-lg bg-arc-inset border border-arc-border-bright text-sm px-3 py-2 text-arc-fg focus:outline-none focus:ring-2 focus:ring-arc-accent/35"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div>
            <div className="text-[11px] text-arc-muted mb-0.5">Question</div>
            <p className="text-sm sm:text-base text-arc-fg leading-relaxed">{item.question}</p>
          </div>
          <div>
            <div className="text-[11px] text-arc-muted mb-0.5">Answer</div>
            <p className="text-sm text-arc-subtle/95 leading-relaxed whitespace-pre-wrap">
              {item.answer}
            </p>
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-arc-border">
        <div className="text-[11px] text-arc-muted mb-0.5">Source chunk</div>
        <p className="text-xs text-arc-muted/90 leading-relaxed font-mono">{sourcePreview}</p>
      </div>
    </article>
  );
}
