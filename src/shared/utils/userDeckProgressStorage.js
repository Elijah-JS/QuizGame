import { loadJSON, saveJSON } from "./storage";

const STORAGE_KEY = "study_coach_user_deck_progress_v1";

/**
 * @typedef {Object} UserDeckCardProgress
 * @property {string} deckId
 * @property {string} cardId
 * @property {number} lastReviewedAt  Unix ms
 * @property {number} timesSeen
 * @property {number} timesCorrect
 * @property {number} confidence  0–5 scale (higher = stronger recall)
 * @property {number} nextDueAt    Unix ms
 */

function loadAll() {
  const raw = loadJSON(STORAGE_KEY, {});
  return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
}

function saveAll(data) {
  saveJSON(STORAGE_KEY, data);
}

function defaultRow(deckId, cardId) {
  return {
    deckId,
    cardId,
    lastReviewedAt: 0,
    timesSeen: 0,
    timesCorrect: 0,
    confidence: 2,
    nextDueAt: 0,
  };
}

/**
 * @param {string} deckId
 * @returns {Record<string, UserDeckCardProgress>}
 */
export function getUserDeckProgress(deckId) {
  if (!deckId) return {};
  const all = loadAll();
  const row = all[deckId];
  if (!row || typeof row !== "object" || Array.isArray(row)) return {};
  return { ...row };
}

/**
 * @param {string} deckId
 * @param {string} cardId
 * @returns {UserDeckCardProgress | null}
 */
export function getCardProgress(deckId, cardId) {
  const m = getUserDeckProgress(deckId);
  return m[cardId] || null;
}

/**
 * @param {string} deckId
 * @param {string} cardId
 * @param {Partial<UserDeckCardProgress>} partial
 */
export function saveCardProgress(deckId, cardId, partial) {
  if (!deckId || !cardId) return null;
  const all = loadAll();
  if (!all[deckId]) all[deckId] = {};
  const prev = all[deckId][cardId] || defaultRow(deckId, cardId);
  const next = { ...prev, ...partial, deckId, cardId };
  all[deckId][cardId] = next;
  saveAll(all);
  return next;
}

const LEARN_INTERVALS_MS = {
  again: 60 * 1000,
  hard: 10 * 60 * 1000,
  good: 24 * 60 * 60 * 1000,
  easy: 3 * 24 * 60 * 60 * 1000,
};

/**
 * @param {string} deckId
 * @param {string} cardId
 * @param {"again"|"hard"|"good"|"easy"} rating
 */
export function updateCardProgressFromLearn(deckId, cardId, rating) {
  const now = Date.now();
  const prev = getCardProgress(deckId, cardId) || defaultRow(deckId, cardId);
  const confDelta = { again: -2, hard: -1, good: 1, easy: 2 };
  const d = confDelta[rating] ?? 0;
  const confidence = Math.max(0, Math.min(5, prev.confidence + d));
  const timesSeen = prev.timesSeen + 1;
  let timesCorrect = prev.timesCorrect;
  if (rating === "good" || rating === "easy") timesCorrect += 1;
  const nextDueAt = now + (LEARN_INTERVALS_MS[rating] ?? LEARN_INTERVALS_MS.again);

  return saveCardProgress(deckId, cardId, {
    lastReviewedAt: now,
    timesSeen,
    timesCorrect,
    confidence,
    nextDueAt,
  });
}

/**
 * @param {string} deckId
 * @param {string} cardId
 * @param {boolean} isCorrect
 */
export function updateCardProgressFromQuiz(deckId, cardId, isCorrect) {
  const now = Date.now();
  const prev = getCardProgress(deckId, cardId) || defaultRow(deckId, cardId);
  const timesSeen = prev.timesSeen + 1;
  const timesCorrect = prev.timesCorrect + (isCorrect ? 1 : 0);
  let confidence = prev.confidence;
  let nextDueAt;
  if (isCorrect) {
    confidence = Math.min(5, confidence + 1);
    nextDueAt = now + 12 * 60 * 60 * 1000;
  } else {
    confidence = Math.max(0, confidence - 1);
    nextDueAt = now + 5 * 60 * 1000;
  }

  return saveCardProgress(deckId, cardId, {
    lastReviewedAt: now,
    timesSeen,
    timesCorrect,
    confidence,
    nextDueAt,
  });
}

/**
 * Quiz “reveal only” cards: count a view, gentle next interval.
 * @param {string} deckId
 * @param {string} cardId
 */
export function updateCardProgressFromQuizReveal(deckId, cardId) {
  const now = Date.now();
  const prev = getCardProgress(deckId, cardId) || defaultRow(deckId, cardId);
  return saveCardProgress(deckId, cardId, {
    lastReviewedAt: now,
    timesSeen: prev.timesSeen + 1,
    timesCorrect: prev.timesCorrect,
    confidence: prev.confidence,
    nextDueAt: now + 45 * 60 * 1000,
  });
}

/**
 * @param {string} deckId
 */
export function clearUserDeckProgress(deckId) {
  if (!deckId) return;
  const all = loadAll();
  delete all[deckId];
  saveAll(all);
}

/** Dev / settings: wipe all saved-deck study progress in this browser. */
export function clearAllUserDeckProgress() {
  saveAll({});
}

/**
 * Remove progress for one card (e.g. after the card is deleted from the deck).
 * @param {string} deckId
 * @param {string} cardId
 */
export function deleteCardProgress(deckId, cardId) {
  if (!deckId || !cardId) return;
  const all = loadAll();
  const row = all[deckId];
  if (!row || typeof row !== "object" || Array.isArray(row)) return;
  if (!Object.prototype.hasOwnProperty.call(row, cardId)) return;
  const nextRow = { ...row };
  delete nextRow[cardId];
  if (Object.keys(nextRow).length === 0) delete all[deckId];
  else all[deckId] = nextRow;
  saveAll(all);
}

/**
 * Due = no row yet, or nextDueAt <= now. If at least one due, return [due..., rest...].
 * Otherwise return full pool order (nothing due yet).
 * @template T
 * @param {T[]} pool
 * @param {Record<string, UserDeckCardProgress>} progressByCardId
 * @param {number} [now]
 * @returns {T[]}
 */
export function prioritizeDueCards(pool, progressByCardId, now = Date.now()) {
  if (!Array.isArray(pool)) return [];
  const due = [];
  const notDue = [];
  for (const card of pool) {
    const id = card?.id;
    if (!id) continue;
    const p = progressByCardId[id];
    if (!p || (p.nextDueAt ?? 0) <= now) due.push(card);
    else notDue.push(card);
  }
  if (due.length > 0) return [...due, ...notDue];
  return [...pool];
}

/**
 * Aggregated per-deck stats for UI (reviewed / due / mastery).
 * @param {string} deckId
 * @param {string[]} cardIds
 * @param {number} [now]
 * @returns {{
 *   total: number,
 *   reviewed: number,
 *   due: number,
 *   lastStudied: number,
 *   avgConfidence: number | null,
 *   masteryPercent: number | null,
 * }}
 */
export function getDeckProgressSummary(deckId, cardIds, now = Date.now()) {
  const map = getUserDeckProgress(deckId);
  let reviewed = 0;
  let due = 0;
  let lastStudied = 0;
  let confidenceSum = 0;
  let confidenceCount = 0;
  const ids = Array.isArray(cardIds) ? cardIds : [];
  for (const id of ids) {
    const p = map[id];
    if (p && (p.timesSeen || 0) > 0) {
      reviewed += 1;
      const c = typeof p.confidence === "number" && Number.isFinite(p.confidence) ? p.confidence : 2;
      confidenceSum += c;
      confidenceCount += 1;
    }
    if (!p || (p.nextDueAt ?? 0) <= now) due += 1;
    if (p?.lastReviewedAt && p.lastReviewedAt > lastStudied) lastStudied = p.lastReviewedAt;
  }
  const avgConfidence = confidenceCount > 0 ? confidenceSum / confidenceCount : null;
  const masteryPercent =
    avgConfidence != null ? Math.round((avgConfidence / 5) * 100) : null;
  return {
    total: ids.length,
    reviewed,
    due,
    lastStudied,
    avgConfidence,
    masteryPercent,
  };
}
