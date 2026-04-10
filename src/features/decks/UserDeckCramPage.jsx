import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import CramSession from "../cram/CramSession";
import { getUserDeckById } from "../../shared/utils/userDeckStorage";
import { userDeckToStudyPool } from "../../shared/study/userDeckToStudyCards";

const linkPrimary =
  "inline-flex justify-center px-4 py-2.5 rounded-lg text-sm font-medium bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition shadow-arc-glow";

export default function UserDeckCramPage() {
  const { deckId } = useParams();
  const deck = useMemo(() => getUserDeckById(deckId), [deckId]);
  const pool = useMemo(() => (deck ? userDeckToStudyPool(deck) : []), [deck]);

  if (!deck) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto text-center py-12 px-2">
        <p className="text-arc-muted">This deck wasn’t found in this browser.</p>
        <Link to="/decks" className={linkPrimary}>
          Back to My decks
        </Link>
      </div>
    );
  }

  if (!pool.length) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto text-center py-12 px-2">
        <p className="text-arc-muted">This deck has no cards to study yet.</p>
        <Link to={`/decks/${deckId}`} className={linkPrimary}>
          Deck details
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm min-w-0">
        <Link
          to={`/decks/${deckId}`}
          className="text-arc-subtle hover:text-arc-fg truncate max-w-[min(100%,20rem)] underline underline-offset-2 decoration-arc-border-bright"
          title={deck.title}
        >
          ← {deck.title}
        </Link>
        <span className="text-arc-dim hidden sm:inline" aria-hidden>
          |
        </span>
        <Link
          to={`/decks/${deckId}/learn`}
          className="text-arc-muted hover:text-arc-subtle text-xs sm:text-sm whitespace-nowrap"
        >
          Learn
        </Link>
        <Link
          to={`/decks/${deckId}/scenario`}
          className="text-arc-muted hover:text-arc-subtle text-xs sm:text-sm whitespace-nowrap"
        >
          Scenario
        </Link>
      </div>
      <CramSession poolOverride={pool} titleLabel={deck.title} />
    </div>
  );
}
