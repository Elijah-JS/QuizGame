export const BOX_INTERVAL_MIN = { 1: 0, 2: 10, 3: 60, 4: 720, 5: 2880 }; // now, 10m, 1h, 12h, 2d
export const clampBox = (b) => Math.max(1, Math.min(5, b));
export const nowMs = () => Date.now();
export const minutesFromNow = (min) => nowMs() + min * 60 * 1000;

export function selectByDeck(bank, deckName) {
  return deckName === "All" ? bank : bank.filter((q) => q.deck === deckName);
}

export function pickDueOrAny(bank, progressMap) {
  const due = [];
  const rest = [];
  bank.forEach((q) => {
    const p = progressMap[q.id];
    if (!p || p.nextDue <= nowMs()) due.push(q);
    else rest.push(q);
  });
  return due.length ? due : rest;
}

export function rateCard(progressMap, cardId, isCorrect) {
  const prev = progressMap[cardId] || { box: 1, nextDue: nowMs(), seen: 0, correct: 0 };
  const nextBox = clampBox(isCorrect ? prev.box + 1 : prev.box - 1);
  const nextDue = minutesFromNow(BOX_INTERVAL_MIN[nextBox]);
  return {
    ...progressMap,
    [cardId]: {
      box: nextBox,
      nextDue,
      seen: prev.seen + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
    },
  };
}
