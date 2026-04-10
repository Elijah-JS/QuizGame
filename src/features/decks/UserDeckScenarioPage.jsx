import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ScenarioPractice from "../scenarios/ScenarioPractice";
import { getUserDeckById } from "../../shared/utils/userDeckStorage";
import { userDeckToScenarioPool } from "../../shared/study/userDeckToScenarioPool";

const linkPrimary =
  "inline-flex justify-center px-4 py-2.5 rounded-lg text-sm font-medium bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition shadow-arc-glow";

export default function UserDeckScenarioPage() {
  const { deckId } = useParams();
  const deck = useMemo(() => getUserDeckById(deckId), [deckId]);
  const pool = useMemo(() => (deck ? userDeckToScenarioPool(deck) : []), [deck]);

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

  if (!deck.items?.length) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto text-center py-12 px-2">
        <p className="text-arc-muted">This deck has no cards to study yet.</p>
        <Link to={`/decks/${deckId}`} className={linkPrimary}>
          Deck details
        </Link>
      </div>
    );
  }

  if (!pool.length) {
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
        </div>
        <div className="rounded-xl border border-arc-border bg-arc-panel px-4 py-6 text-sm text-arc-subtle shadow-arc-inset">
          <p className="font-medium font-display text-arc-fg mb-2">Scenario mode needs clearer answer choices</p>
          <p className="text-arc-muted leading-relaxed">
            We build multiple-choice prompts from your card answers. This deck didn’t yield usable
            combinations yet. Try <strong>Learn</strong> or <strong>Quiz</strong>, or add more cards
            with distinct answers.
          </p>
        </div>
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
          to={`/decks/${deckId}/cram`}
          className="text-arc-muted hover:text-arc-subtle text-xs sm:text-sm whitespace-nowrap"
        >
          Cram
        </Link>
      </div>
      <p className="text-[11px] text-arc-dim leading-relaxed">
        Choices mix the right answer with other answers from this deck (and a few generic options).
        This is practice-style recall, not a full clinical scenario simulation.
      </p>
      <ScenarioPractice poolOverride={pool} titleLabel={deck.title} />
    </div>
  );
}
