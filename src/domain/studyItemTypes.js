/**
 * Question / card `type` strings used across the static bank and study modes.
 * Generated content should converge on these (extend deliberately when adding modes).
 */
export const STUDY_ITEM_TYPES = Object.freeze([
  "mc",
  "tf",
  "recall",
  "scenario",
  "ma",
  "sa",
  "match",
]);

/**
 * @typedef {Object} CardProgress
 * @property {number} box
 * @property {number} nextDue
 * @property {number} seen
 * @property {number} correct
 */

/**
 * @typedef {Object} StudyCoachPersistedState
 * @property {string} [deck]
 * @property {{ quizLength?: number, cramLength?: number }} [settings]
 * @property {Record<string, CardProgress>} [progress]
 */
