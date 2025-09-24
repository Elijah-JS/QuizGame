import React, { useMemo, useState } from "react";
import { useStore } from "../../context/StoreProvider";
import { selectByDeck } from "../../utils/scheduler";
import { shuffle } from "../../utils/shuffle";

export default function Practice() {
  const { BANK, deck } = useStore();

  // pick scenario-type first; otherwise MC/TF cards (no recall)
  const pool = useMemo(() => {
    const byDeck = selectByDeck(BANK, deck);
    const tagged = byDeck.filter((q) => q.type === "scenario");
    return tagged.length ? tagged : byDeck.filter((q) => q.type !== "recall");
  }, [BANK, deck]);

  // allow reshuffle on restart by bumping a seed
  const [seed, setSeed] = useState(0);
  const set = useMemo(() => shuffle(pool).slice(0, 12), [pool, seed]);

  // per-run state
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState(null);
  const [results, setResults] = useState([]); // [{id, prompt, correct, your, correctText, explain}]
  const card = set[i];

  if (!set.length) {
    return (
      <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/60">
        No scenario cards in this deck yet.
      </div>
    );
  }

  const isTF = card.type === "tf";
  const isMC = card.type === "mc" || card.type === "scenario";

  const computeChoiceStrings = (idx) => {
    if (isTF) {
      const your = idx === 0 ? "True" : "False";
      const correctText = card.answerBool ? "True" : "False";
      const correct = (idx === 0) === card.answerBool;
      return { your, correctText, correct };
    }
    // MC/scenario
    const your = card.options[idx];
    const correctText = card.options[card.answerIndex];
    const correct = idx === card.answerIndex;
    return { your, correctText, correct };
  };

  const pick = (idx) => {
    if (revealed) return;
    const { your, correctText, correct } = computeChoiceStrings(idx);
    setPicked(idx);
    setRevealed(true);
    // store result immediately
    setResults((prev) => [
      ...prev,
      {
        id: card.id,
        prompt: card.prompt,
        correct,
        your,
        correctText,
        explain: card.explain || "",
      },
    ]);
  };

  const next = () => {
    // if already finished, do nothing
    if (results.length >= set.length) return;
    if (i + 1 >= set.length) {
      // will trigger summary view via results.length === set.length
      setI(i); // stay
      setRevealed(false);
      setPicked(null);
    } else {
      setI((x) => x + 1);
      setRevealed(false);
      setPicked(null);
    }
  };

  const restart = () => {
    setSeed((s) => s + 1); // reshuffle
    setI(0);
    setResults([]);
    setRevealed(false);
    setPicked(null);
  };

  const progress = Math.min(results.length / set.length, 1);

  // ----- SUMMARY VIEW -----
  if (results.length === set.length) {
    const correctCount = results.filter((r) => r.correct).length;
    const missed = results.filter((r) => !r.correct);

    return (
      <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/60">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs uppercase tracking-wider text-emerald-400/90">
            Scenario Practice • {deck}
          </div>
          <div className="text-sm text-zinc-300">
            Score: <span className="font-semibold">{correctCount}</span> / {set.length}
          </div>
        </div>

        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-6">
          <div className="text-lg font-semibold mb-1">Great work!</div>
          <div className="text-sm text-zinc-300/90">
            You answered <span className="font-medium">{correctCount}</span> of{" "}
            {set.length} correctly.
          </div>
        </div>

        {missed.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-zinc-200">
              Review what you missed
            </div>
            {missed.map((m, idx) => (
              <div
                key={m.id}
                className="rounded-xl border border-red-500/30 bg-red-900/10 p-4"
              >
                <div className="text-sm font-medium mb-1">
                  {idx + 1}. {m.prompt}
                </div>
                <div className="text-xs">
                  <div className="mb-1">
                    <span className="text-zinc-400">Your answer:</span>{" "}
                    <span className="text-red-300">{m.your}</span>
                  </div>
                  <div className="mb-1">
                    <span className="text-zinc-400">Correct:</span>{" "}
                    <span className="text-emerald-300">{m.correctText}</span>
                  </div>
                  {m.explain && (
                    <div className="text-zinc-300/90">{m.explain}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            onClick={restart}
            className="px-3 py-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-600"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // ----- PRACTICE VIEW -----
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/60">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs uppercase tracking-wider text-emerald-400/90">
          Scenario Practice • {deck} • {i + 1}/{set.length}
        </div>
        <div className="text-sm text-zinc-300">
          Score:{" "}
          <span className="font-semibold">
            {results.filter((r) => r.correct).length}
          </span>{" "}
          / {set.length}
        </div>
      </div>

      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="text-lg font-medium mb-4">{card.prompt}</div>

      {isTF && (
        <div className="grid grid-cols-2 gap-2">
          {["True", "False"].map((lbl, idx) => {
            const correctLbl = card.answerBool ? "True" : "False";
            const isCorrectBtn = lbl === correctLbl;
            const isPick = picked === idx;
            return (
              <button
                key={lbl}
                onClick={() => pick(idx)}
                className={
                  "px-3 py-2 rounded-xl border text-center " +
                  (revealed
                    ? isCorrectBtn
                      ? "bg-emerald-900/40 border-emerald-600/50"
                      : isPick
                      ? "bg-red-900/30 border-red-600/50"
                      : "bg-zinc-800 border-white/10"
                    : "bg-zinc-800 border-white/10 hover:bg-zinc-700")
                }
              >
                {lbl}
              </button>
            );
          })}
        </div>
      )}

      {isMC && (
        <div className="space-y-2">
          {card.options.map((opt, idx) => {
            const correct = idx === card.answerIndex;
            const isPick = picked === idx;
            return (
              <button
                key={idx}
                onClick={() => pick(idx)}
                className={
                  "w-full text-left px-3 py-2 rounded-xl border " +
                  (revealed
                    ? correct
                      ? "bg-emerald-900/40 border-emerald-600/50"
                      : isPick
                      ? "bg-red-900/30 border-red-600/50"
                      : "bg-zinc-800 border-white/10"
                    : "bg-zinc-800 border-white/10 hover:bg-zinc-700")
                }
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {revealed && card.explain && (
        <div className="mt-4 text-sm text-zinc-300/90">{card.explain}</div>
      )}

      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          onClick={next}
          disabled={!revealed}
          className={
            "px-3 py-2 rounded-lg transition " +
            (revealed
              ? "bg-emerald-600/80 hover:bg-emerald-600"
              : "bg-zinc-700 cursor-not-allowed")
          }
        >
          {i + 1 >= set.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
