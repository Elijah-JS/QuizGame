/**
 * Phase 3: generated study items (in-memory, not yet merged into bank).
 *
 * @typedef {Object} GeneratedStudyItemV1
 * @property {string} id
 * @property {"flashcard"} type
 * @property {string} sourceChunk
 * @property {string} question
 * @property {string} answer
 * @property {"simple"|"medium"} difficulty
 * @property {string[]} tags
 */

export const GENERATED_ITEM_TYPE_FLASHCARD = "flashcard";

/**
 * Deterministic id from index + chunk snippet (stable for same import session).
 * @param {number} index
 * @param {string} chunk
 */
export function createGeneratedItemId(index, chunk) {
  let h = 0;
  const s = String(chunk);
  const n = Math.min(s.length, 96);
  for (let i = 0; i < n; i++) {
    h = (h * 33 + s.charCodeAt(i)) >>> 0;
  }
  return `gen_fc_${index}_${h.toString(36)}`;
}
