import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useStore } from "../../context/StoreProvider";
import { selectByDeck } from "../../utils/scheduler";

/* ------------------------------------------
   Clean, correct answer formatter for Quiz 3
---------------------------------------------*/
function getAnswerText(card) {
  if (!card) return "";

  switch (card.type) {
    case "mc":
      return card.options?.[card.answerIndex] ?? "";

    case "tf":
      return card.answerBool ? "True" : "False";

    case "ma":
      // Show the correct options as a list
      if (!Array.isArray(card.answerIndexes)) return "(See explanation)";
      return card.answerIndexes
        .map((i) => card.options?.[i])
        .filter(Boolean)
        .join(", ");

    case "sa":
      // Short-answer always uses card.answer for Quiz 3
      return card.answer ?? "(Review explanation)";

    case "match":
      // Display pairs visually readable
      if (!Array.isArray(card.pairs)) return "(See explanation)";
      return card.pairs.map(([left, right]) => `${left} → ${right}`).join(" | ");

    default:
      return "(Review the explanation)";
  }
}

export default function Learn() {
  const { BANK, deck } = useStore();
  const pool = useMemo(() => selectByDeck(BANK, deck), [BANK, deck]);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = pool[index] || null;

  // Reset flip on card change
  useEffect(() => setFlipped(false), [index, deck]);

  const next = useCallback(() => {
    if (!pool.length) return;
    setIndex((i) => (i + 1) % pool.length);
  }, [pool.length]);

  const back = useCallback(() => {
    if (!pool.length) return;
    setIndex((i) => (i - 1 + pool.length) % pool.length);
  }, [pool.length]);

  // Keyboard shortcuts: Space = flip, Right = next, Left = back
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;

      if (e.code === "Space") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.code === "ArrowRight") {
        next();
      } else if (e.code === "ArrowLeft") {
        back();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, back]);

  if (!pool.length || !card) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 md:p-8 text-center">
        <div className="text-lg font-semibold mb-1">No cards available 🎉</div>
        <div className="text-sm text-zinc-300/80">
          Add or switch decks to start learning.
        </div>
      </div>
    );
  }

  const answerText = getAnswerText(card);

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-emerald-300">
          Learn • {deck}
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-white/[0.06] border border-white/10">
          {index + 1}/{pool.length}
        </div>
      </div>

      {/* Flip card */}
      <div
        className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] [perspective:1200px]"
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          className={
            "absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d] rounded-2xl " +
            (flipped ? "[transform:rotateY(180deg)]" : "")
          }
        >
          {/* Front */}
          <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.055] backdrop-blur-xl shadow-2xl shadow-black/30 p-5 sm:p-6 [backface-visibility:hidden] flex">
            <div className="m-auto text-center">
              <div className="text-[11px] uppercase tracking-wider text-emerald-300 mb-2">
                Prompt
              </div>
              <div className="text-lg md:text-xl font-medium leading-relaxed">
                {card.prompt}
              </div>
              <div className="mt-3 text-[12px] text-zinc-400">
                Click or press <span className="text-white/90 font-medium">Space</span> to
                reveal
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-xl shadow-2xl shadow-black/30 p-5 sm:p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] flex">
            <div className="m-auto text-center max-w-2xl">
              <div className="text-[11px] uppercase tracking-wider text-emerald-300 mb-2">
                Answer
              </div>
              <div className="text-lg md:text-xl font-semibold whitespace-pre-wrap">
                {answerText}
              </div>
              {card.explain && (
                <div className="mt-3 text-sm text-zinc-300/90">{card.explain}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={back}
          className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition"
        >
          Back
        </button>
        <button
          onClick={next}
          className="px-4 py-2 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-black font-medium transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
