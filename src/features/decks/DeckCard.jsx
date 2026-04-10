import React from "react";
import { Link } from "react-router-dom";
import { formatShortLastStudied } from "../../shared/utils/userDeckProgressStats";

function formatUpdated(ts) {
  if (typeof ts !== "number" || !Number.isFinite(ts)) return "—";
  try {
    return new Date(ts).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
}

export default function DeckCard({ deck, metrics, onDelete }) {
  const total = metrics?.total ?? deck.itemCount ?? deck.items?.length ?? 0;
  const reviewed = metrics?.reviewed ?? 0;
  const due = metrics?.due ?? 0;
  const lastStudied = metrics?.lastStudied ?? 0;

  return (
    <article className="group relative rounded-2xl border border-arc-border/90 bg-arc-panel/70 overflow-hidden min-w-0 flex flex-col shadow-arc-inset hover:border-arc-border-bright/90 hover:shadow-arc-card motion-safe:hover:-translate-y-0.5 transition-all duration-200">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-arc-primary/90 opacity-95" aria-hidden />
      <div className="absolute right-3 top-3 size-6 rounded border border-arc-border/60 bg-arc-inset/80 opacity-60 group-hover:opacity-100 transition pointer-events-none" aria-hidden />
      <div className="pl-4 sm:pl-5 p-4 sm:p-5 flex flex-col gap-4 flex-1">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-arc-muted font-display">
            Saved deck
          </p>
          <Link
            to={`/decks/${deck.id}`}
            className="block text-lg font-semibold tracking-tight font-display text-arc-fg group-hover:text-arc-subtle transition line-clamp-2 leading-snug"
          >
            {deck.title || "Untitled Deck"}
          </Link>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center rounded-lg border border-arc-border bg-arc-inset/80 px-2.5 py-1 text-arc-subtle tabular-nums">
              {total} card{total !== 1 ? "s" : ""}
            </span>
            {total > 0 ? (
              <>
                <span className="inline-flex items-center rounded-lg border border-arc-border bg-arc-inset/80 px-2.5 py-1 text-arc-muted tabular-nums">
                  {reviewed} reviewed
                </span>
                <span
                  className={
                    "inline-flex items-center rounded-lg border px-2.5 py-1 tabular-nums " +
                    (due > 0
                      ? "border-arc-warn-border bg-arc-warn-surface/90 text-arc-warn"
                      : "border-arc-border bg-arc-inset/80 text-arc-dim")
                  }
                >
                  {due} due
                </span>
              </>
            ) : null}
          </div>
          <div className="text-[11px] text-arc-dim space-y-0.5 pt-1 border-t border-arc-border/80">
            <p>
              Last studied:{" "}
              {lastStudied > 0 ? (
                <span className="text-arc-muted">{formatShortLastStudied(lastStudied)}</span>
              ) : (
                <span className="text-arc-dim">not yet</span>
              )}
            </p>
            <p className="text-arc-dim">Updated {formatUpdated(deck.updatedAt)}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            to={`/decks/${deck.id}`}
            className="inline-flex justify-center min-h-[44px] items-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition flex-1 sm:flex-none motion-safe:active:scale-[0.98] shadow-arc-glow"
          >
            Open deck
          </Link>
          <button
            type="button"
            onClick={() => onDelete(deck.id)}
            className="inline-flex justify-center min-h-[44px] items-center px-4 py-2.5 rounded-xl text-sm border border-arc-bad-border text-arc-bad hover:bg-arc-bad-surface/50 transition motion-safe:active:scale-[0.98]"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
