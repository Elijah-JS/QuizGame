import React from "react";
import { getDeckProgressSummary } from "../../shared/utils/userDeckProgressStorage";
import DeckCard from "./DeckCard";

export default function DeckList({ decks, onDeleteDeck }) {
  if (!decks.length) {
    return (
      <div className="rounded-xl border border-arc-border bg-arc-panel/80 p-8 text-center text-sm text-arc-muted shadow-arc-inset">
        No saved decks yet. Review cards from an import and save them here.
      </div>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 list-none p-0 m-0">
      {decks.map((deck) => {
        const ids = Array.isArray(deck.items) ? deck.items.map((it) => it.id).filter(Boolean) : [];
        const metrics = getDeckProgressSummary(deck.id, ids);
        return (
          <li key={deck.id} className="min-w-0">
            <DeckCard deck={deck} metrics={metrics} onDelete={onDeleteDeck} />
          </li>
        );
      })}
    </ul>
  );
}
