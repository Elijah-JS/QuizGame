import { buildMCFromRecall, getCorrectText } from "../utils/choices";

/**
 * Decide how Quiz UI should render a card (native TF/MC, auto-built MC, or reveal-only).
 */
export function getQuizCardMode(card, pool) {
  if (!card) return { mode: "empty" };

  if (card.type === "tf" && typeof card.answerBool === "boolean") return { mode: "tf" };

  if (card.type === "mc" && Array.isArray(card.options) && card.options.length >= 2)
    return { mode: "mc" };

  const built = buildMCFromRecall(card, pool, 4);
  if (built && Array.isArray(built.options) && built.options.length >= 2) {
    return { mode: "mc-auto", built };
  }

  const expected =
    card?.expected ??
    (card?.type === "mc" && typeof card?.answerIndex === "number" && card?.options
      ? card.options[card.answerIndex]
      : undefined);

  return { mode: "reveal", expected };
}

export { getCorrectText };
