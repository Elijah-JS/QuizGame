import { loadJSON, saveJSON } from "./storage";
import { USER_DECK_SOURCE_IMPORTED_TEXT } from "../../domain/userDeck";
import { clearUserDeckProgress } from "./userDeckProgressStorage";

const STORAGE_KEY = "study_coach_user_decks_v1";

/** @returns {import("../../domain/userDeck").UserDeckV1[]} */
function readAllRaw() {
  const data = loadJSON(STORAGE_KEY, []);
  return Array.isArray(data) ? data : [];
}

/**
 * @returns {import("../../domain/userDeck").UserDeckV1[]}
 */
export function getUserDecks() {
  return readAllRaw().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
}

/**
 * @param {string} deckId
 * @returns {import("../../domain/userDeck").UserDeckV1 | null}
 */
export function getUserDeckById(deckId) {
  if (!deckId) return null;
  return readAllRaw().find((d) => d.id === deckId) || null;
}

function newDeckId() {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return `udeck_${crypto.randomUUID()}`;
    }
  } catch {
    /* ignore */
  }
  return `udeck_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function newCardId() {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return `ucard_${crypto.randomUUID()}`;
    }
  } catch {
    /* ignore */
  }
  return `ucard_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Manual flashcard aligned with GeneratedStudyItemV1.
 * @param {{ question: string, answer: string, difficulty?: "simple"|"medium" }} input
 * @returns {import("../../domain/generatedStudyItem").GeneratedStudyItemV1}
 */
export function createManualFlashcardItem(input) {
  const q = typeof input?.question === "string" ? input.question.trim() : "";
  const a = typeof input?.answer === "string" ? input.answer.trim() : "";
  const d = input?.difficulty === "simple" ? "simple" : "medium";
  return {
    id: newCardId(),
    type: "flashcard",
    sourceChunk: "",
    question: q,
    answer: a,
    difficulty: d,
    tags: ["manual"],
  };
}

/**
 * Insert a new deck. Sets id, timestamps, itemCount if missing.
 * @param {Omit<import("../../domain/userDeck").UserDeckV1, "id"|"createdAt"|"updatedAt"|"itemCount"> & { id?: string, items: unknown[] }} deck
 * @returns {import("../../domain/userDeck").UserDeckV1 | null}
 */
export function saveUserDeck(deck) {
  const items = Array.isArray(deck.items) ? deck.items : [];
  if (items.length === 0) return null;

  const now = Date.now();
  const all = readAllRaw();
  const trimmedTitle =
    typeof deck.title === "string" && deck.title.trim().length
      ? deck.title.trim()
      : "Untitled Deck";

  const row = {
    id: deck.id && String(deck.id).length ? deck.id : newDeckId(),
    title: trimmedTitle,
    createdAt: typeof deck.createdAt === "number" ? deck.createdAt : now,
    updatedAt: now,
    sourceType: deck.sourceType || USER_DECK_SOURCE_IMPORTED_TEXT,
    itemCount: items.length,
    items: items.map((x) => ({ ...x })),
  };

  if (all.some((d) => d.id === row.id)) {
    return null;
  }

  all.push(row);
  saveJSON(STORAGE_KEY, all);
  return row;
}

/**
 * Replace an existing deck by id.
 * @param {import("../../domain/userDeck").UserDeckV1} deck
 * @returns {import("../../domain/userDeck").UserDeckV1 | null}
 */
export function updateUserDeck(deck) {
  if (!deck?.id) return null;
  const all = readAllRaw();
  const i = all.findIndex((d) => d.id === deck.id);
  if (i === -1) return null;

  const now = Date.now();
  const items = Array.isArray(deck.items) ? deck.items : all[i].items;
  const merged = {
    ...all[i],
    ...deck,
    id: all[i].id,
    updatedAt: now,
    itemCount: Array.isArray(items) ? items.length : all[i].itemCount,
    items: Array.isArray(deck.items) ? deck.items.map((x) => ({ ...x })) : all[i].items,
  };

  all[i] = merged;
  saveJSON(STORAGE_KEY, all);
  return merged;
}

/**
 * @param {string} deckId
 * @param {string} nextTitle
 * @returns {import("../../domain/userDeck").UserDeckV1 | null}
 */
export function renameUserDeck(deckId, nextTitle) {
  const prev = getUserDeckById(deckId);
  if (!prev) return null;
  const trimmed =
    typeof nextTitle === "string" && nextTitle.trim().length ? nextTitle.trim() : "Untitled Deck";
  return updateUserDeck({ ...prev, title: trimmed });
}

/**
 * Copy a deck with a new id and fresh card ids (progress is not copied).
 * @param {string} deckId
 * @returns {import("../../domain/userDeck").UserDeckV1 | null}
 */
export function duplicateUserDeck(deckId) {
  const src = getUserDeckById(deckId);
  if (!src || !Array.isArray(src.items)) return null;
  const now = Date.now();
  const newItems = src.items.map((it) => ({
    ...it,
    id: newCardId(),
  }));
  const baseTitle = typeof src.title === "string" && src.title.trim() ? src.title.trim() : "Untitled Deck";
  const title = `Copy of ${baseTitle}`;
  const sourceType = src.sourceType || USER_DECK_SOURCE_IMPORTED_TEXT;
  if (newItems.length === 0) {
    const all = readAllRaw();
    const row = {
      id: newDeckId(),
      title,
      createdAt: now,
      updatedAt: now,
      sourceType,
      itemCount: 0,
      items: [],
    };
    if (all.some((d) => d.id === row.id)) return null;
    all.push(row);
    saveJSON(STORAGE_KEY, all);
    return row;
  }
  return saveUserDeck({
    title,
    sourceType,
    items: newItems,
    createdAt: now,
  });
}

/**
 * @param {string} deckId
 */
export function deleteUserDeck(deckId) {
  if (!deckId) return;
  clearUserDeckProgress(deckId);
  const next = readAllRaw().filter((d) => d.id !== deckId);
  saveJSON(STORAGE_KEY, next);
}
