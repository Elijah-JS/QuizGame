/**
 * Adapts saved user-deck flashcard items into the recall-shaped cards Learn / Quiz already handle.
 * Does not mutate stored deck data.
 */

function truncateSource(s, max) {
  const t = String(s || "").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

/**
 * @param {import("../../domain/userDeck").UserDeckV1} deck
 * @returns {Array<{ id: string, deck: string, type: "recall", prompt: string, expected: string, explain: string }>}
 */
export function userDeckToStudyPool(deck) {
  if (!deck?.id) return [];
  const items = Array.isArray(deck.items) ? deck.items : [];
  const deckTag = `__user_deck__:${deck.id}`;

  return items.map((item) => ({
    id: item.id,
    deck: deckTag,
    type: "recall",
    prompt: item.question,
    expected: item.answer,
    explain: item.sourceChunk ? truncateSource(item.sourceChunk, 280) : "",
  }));
}
