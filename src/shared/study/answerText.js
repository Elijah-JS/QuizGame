/** Format the correct answer string for flip-card / review UIs. */
export function getAnswerText(card) {
  if (!card) return "";

  switch (card.type) {
    case "mc":
      return card.options?.[card.answerIndex] ?? "";

    case "tf":
      return card.answerBool ? "True" : "False";

    case "ma":
      if (!Array.isArray(card.answerIndexes)) return "(See explanation)";
      return card.answerIndexes
        .map((i) => card.options?.[i])
        .filter(Boolean)
        .join(", ");

    case "sa":
      return card.answer ?? "(Review explanation)";

    case "match":
      if (!Array.isArray(card.pairs)) return "(See explanation)";
      return card.pairs.map(([left, right]) => `${left} → ${right}`).join(" | ");

    case "recall":
      return (card.expected ?? "").toString() || "(Review explanation)";

    default:
      return "(Review the explanation)";
  }
}
