import { GENERATED_ITEM_TYPE_FLASHCARD } from "../../domain/generatedStudyItem";

/**
 * Ensure difficulty is a supported label.
 * @param {unknown} d
 * @returns {"simple"|"medium"}
 */
function sanitizeDifficulty(d) {
  return d === "medium" ? "medium" : "simple";
}

/**
 * Coerce tags to a clean string array.
 * @param {unknown} tags
 * @returns {string[]}
 */
function sanitizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  return tags.map((t) => String(t).trim()).filter(Boolean);
}

/**
 * Validate and normalize items from any generator (rules, future local AI, etc.).
 * Drops entries that cannot be coerced into a minimal valid card.
 *
 * @param {unknown} items
 * @returns {import("../../domain/generatedStudyItem").GeneratedStudyItemV1[]}
 */
export function normalizeGeneratedItems(items) {
  if (!Array.isArray(items)) return [];
  return items.map(normalizeOne).filter(Boolean);
}

/**
 * @param {unknown} item
 * @returns {import("../../domain/generatedStudyItem").GeneratedStudyItemV1 | null}
 */
function normalizeOne(item) {
  if (!item || typeof item !== "object") return null;

  const id = String(/** @type {{ id?: unknown }} */ (item).id ?? "").trim();
  const sourceChunk = String(
    /** @type {{ sourceChunk?: unknown }} */ (item).sourceChunk ?? ""
  ).trim();
  const question = String(/** @type {{ question?: unknown }} */ (item).question ?? "").trim();
  const answer = String(/** @type {{ answer?: unknown }} */ (item).answer ?? "").trim();

  if (!id || !sourceChunk) return null;

  const type = GENERATED_ITEM_TYPE_FLASHCARD;

  return {
    id,
    type,
    sourceChunk,
    question: question || "Review this note.",
    answer: answer || sourceChunk,
    difficulty: sanitizeDifficulty(/** @type {{ difficulty?: unknown }} */ (item).difficulty),
    tags: sanitizeTags(/** @type {{ tags?: unknown }} */ (item).tags),
  };
}
