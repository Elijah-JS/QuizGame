import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserDecks, deleteUserDeck } from "../../shared/utils/userDeckStorage";
import { getDeckLibraryOverview } from "../../shared/utils/userDeckProgressStats";
import DeckList from "./DeckList";

export default function DeckLibraryPage() {
  const location = useLocation();
  const [decks, setDecks] = useState(() => getUserDecks());

  const refresh = useCallback(() => {
    setDecks(getUserDecks());
  }, []);

  useEffect(() => {
    refresh();
  }, [location.pathname, location.key, refresh]);

  const handleDelete = useCallback(
    (deckId) => {
      if (!window.confirm("Delete this deck from this browser? This cannot be undone.")) {
        return;
      }
      deleteUserDeck(deckId);
      refresh();
    },
    [refresh]
  );

  const overview = useMemo(() => getDeckLibraryOverview(decks), [decks]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-arc-muted font-display">
            Library
          </p>
          <h1 className="text-2xl sm:text-[1.65rem] font-semibold tracking-tight font-display text-arc-fg">
            My decks
          </h1>
          <p className="text-sm text-arc-muted max-w-lg leading-relaxed">
            Your generated decks live here. Open one to study or edit cards — stored only in this
            browser.
          </p>
        </div>
        <Link
          to="/import"
          className="inline-flex justify-center shrink-0 min-h-[48px] items-center px-5 rounded-xl text-sm font-semibold bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition-all duration-200 shadow-arc-glow motion-safe:active:scale-[0.98]"
        >
          New deck
        </Link>
      </header>

      {overview.deckCount > 0 && (
        <div className="rounded-2xl border border-arc-border/90 bg-arc-panel/45 px-5 py-4 sm:px-6 text-sm text-arc-subtle space-y-2 shadow-arc-inset">
          <p className="leading-relaxed">
            <span className="font-semibold tabular-nums text-arc-fg">{overview.deckCount}</span>{" "}
            deck{overview.deckCount !== 1 ? "s" : ""}
            <span className="text-arc-dim mx-1.5">·</span>
            <span className="tabular-nums text-arc-fg">{overview.totalCards}</span> cards
            <span className="text-arc-dim mx-1.5">·</span>
            <span className="tabular-nums text-arc-warn">{overview.totalDue}</span> due now
          </p>
          {overview.nextDeck ? (
            <p className="text-xs sm:text-sm">
              <span className="text-arc-dim">Suggested next: </span>
              <Link
                to={`/decks/${overview.nextDeck.id}`}
                className="text-arc-fg hover:text-arc-subtle font-medium underline underline-offset-4 decoration-arc-border-bright"
              >
                {overview.nextDeck.title}
              </Link>
              <span className="text-arc-dim">
                {" "}
                ({overview.nextDeck.due} due)
              </span>
            </p>
          ) : overview.totalDue === 0 && overview.totalCards > 0 ? (
            <p className="text-xs text-arc-dim">You’re caught up — nothing due right now.</p>
          ) : null}
        </div>
      )}

      <DeckList decks={decks} onDeleteDeck={handleDelete} />
    </div>
  );
}
