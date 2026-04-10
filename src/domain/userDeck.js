/**
 * User-created decks (local persistence). Separate from static `bank.js` seed data.
 *
 * @typedef {import("./generatedStudyItem").GeneratedStudyItemV1} UserDeckItem
 */

/** @type {"imported-text"} */
export const USER_DECK_SOURCE_IMPORTED_TEXT = "imported-text";

/**
 * @typedef {Object} UserDeckV1
 * @property {string} id
 * @property {string} title
 * @property {number} createdAt  Unix ms
 * @property {number} updatedAt  Unix ms
 * @property {"imported-text"} sourceType
 * @property {number} itemCount
 * @property {UserDeckItem[]} items
 */
