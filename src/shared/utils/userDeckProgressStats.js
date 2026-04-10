import { getDeckProgressSummary } from "./userDeckProgressStorage";

/**
 * Deck-level study metrics (see getDeckProgressSummary in userDeckProgressStorage).
 * Use this module for library/overview helpers; storage remains the source of truth for raw progress.
 */

/**
 * @param {number} ts  Unix ms
 * @returns {string}
 */
export function formatShortLastStudied(ts) {
  if (typeof ts !== "number" || !Number.isFinite(ts) || ts <= 0) return "—";
  try {
    return new Date(ts).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

/**
 * @param {import("../../domain/userDeck").UserDeckV1[]} decks
 * @param {number} [now]
 * @returns {{
 *   deckCount: number,
 *   totalCards: number,
 *   totalDue: number,
 *   nextDeck: { id: string, title: string, due: number } | null,
 * }}
 */
export function getDeckLibraryOverview(decks, now = Date.now()) {
  const list = Array.isArray(decks) ? decks : [];
  let totalCards = 0;
  let totalDue = 0;
  /** @type {{ id: string, title: string, due: number, score: number } | null} */
  let next = null;

  for (const deck of list) {
    const ids = Array.isArray(deck.items) ? deck.items.map((it) => it.id).filter(Boolean) : [];
    const n = ids.length;
    totalCards += n;
    if (n === 0) continue;

    const m = getDeckProgressSummary(deck.id, ids, now);
    totalDue += m.due;

    const last = m.lastStudied || 0;
    const score = m.due * 1e12 - last;
    const title =
      typeof deck.title === "string" && deck.title.trim() ? deck.title.trim() : "Untitled Deck";
    if (!next || score > next.score) {
      next = { id: deck.id, title, due: m.due, score };
    }
  }

  return {
    deckCount: list.length,
    totalCards,
    totalDue,
    nextDeck: next && next.due > 0 ? { id: next.id, title: next.title, due: next.due } : null,
  };
}
