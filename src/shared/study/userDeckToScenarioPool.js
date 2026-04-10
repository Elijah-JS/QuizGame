/**
 * Builds simple multiple-choice "scenario" cards from user-deck recall items.
 * Distractors come from other answers in the same deck (plus shared generic fallbacks in
 * {@link buildMCFromRecall}). Does not mutate stored deck data.
 */

import { userDeckToStudyPool } from "./userDeckToStudyCards";
import { buildMCFromRecall } from "../utils/choices";

/**
 * @param {import("../../domain/userDeck").UserDeckV1} deck
 * @returns {Array<{ id: string, deck: string, type: "scenario", prompt: string, options: string[], answerIndex: number, expected?: string, explain: string }>}
 */
export function userDeckToScenarioPool(deck) {
  const recallPool = userDeckToStudyPool(deck);
  if (!recallPool.length) return [];

  const out = [];
  for (const card of recallPool) {
    const built = buildMCFromRecall(card, recallPool, 4);
    if (!built || built.answerIndex < 0) continue;
    out.push({
      ...card,
      type: "scenario",
      options: built.options,
      answerIndex: built.answerIndex,
    });
  }
  return out;
}
