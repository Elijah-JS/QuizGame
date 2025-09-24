// src/screens/Flashcards/Quiz.jsx
import React, { useMemo, useState } from "react";
import { useStore } from "../../context/StoreProvider";
import { selectByDeck } from "../../utils/scheduler";
import { shuffle } from "../../utils/shuffle";
import { buildMCFromRecall, getCorrectText } from "../../utils/choices";

// Decide safe mode for a card; try to auto-build MC for recall.
function normalizeCard(card, pool) {
  if (!card) return { mode: "empty" };

  // Native TF
  if (card.type === "tf" && typeof card.answerBool === "boolean")
    return { mode: "tf" };

  // Native MC
  if (card.type === "mc" && Array.isArray(card.options) && card.options.length >= 2)
    return { mode: "mc" };

  // Try to auto-build MC from recall / malformed
  const built = buildMCFromRecall(card, pool, 4);
  if (built && Array.isArray(built.options) && built.options.length >= 2) {
    return { mode: "mc-auto", built };
  }

  // Fall back to reveal-only
  const expected =
    card?.expected ??
    (card?.type === "mc" && typeof card?.answerIndex === "number" && card?.options
      ? card.options[card.answerIndex]
      : undefined);

  return { mode: "reveal", expected };
}

export default function Quiz() {
  const { BANK, deck, settings } = useStore();

  const pool = useMemo(() => selectByDeck(BANK, deck), [BANK, deck]);
  const quizSet = useMemo(() => {
    const base = shuffle(pool).slice(0, settings.quizLength || 10);
    return base;
  }, [pool, settings.quizLength]);

  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState(null);
  const [misses, setMisses] = useState([]); // {idx, prompt, your, correct}
  const [showSummary, setShowSummary] = useState(false);

  const card = quizSet[i];
  const norm = normalizeCard(card, pool);

  if (!quizSet.length || !card) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <div className="text-lg font-semibold mb-1">No quiz cards available.</div>
        <div className="text-sm text-zinc-300/80">Try switching decks or adding more items.</div>
      </div>
    );
  }

  // progress = count current only after answering/revealing
  const progressPct = (() => {
    if (showSummary) return 100;
    const answered = revealed ? i + 1 : i;
    return Math.round((answered / quizSet.length) * 100);
  })();

  const recordMiss = (yourAnswer) => {
    const correctText =
      norm.mode === "mc-auto"
        ? norm.built.options[norm.built.answerIndex]
        : getCorrectText(card) || norm.expected || "—";
    setMisses((m) => [
      ...m,
      { idx: i + 1, prompt: card.prompt, your: yourAnswer ?? "—", correct: correctText },
    ]);
  };

  const next = () => {
    const last = i + 1 >= quizSet.length;
    if (last) {
      setShowSummary(true);
      return;
    }
    setI(i + 1);
    setRevealed(false);
    setPicked(null);
  };

  const restart = () => {
    setI(0);
    setScore(0);
    setRevealed(false);
    setPicked(null);
    setMisses([]);
    setShowSummary(false);
  };

  // --- Handlers ---
  const pickTF = (ans) => {
    if (revealed || norm.mode !== "tf") return;
    const correct = ans === card.answerBool;
    setScore((s) => s + (correct ? 1 : 0));
    setPicked(ans ? "True" : "False");
    if (!correct) recordMiss(ans ? "True" : "False");
    setRevealed(true);
  };

  const pickMC = (idx, isAuto = false) => {
    if (revealed || (norm.mode !== "mc" && norm.mode !== "mc-auto")) return;
    const correctIndex = isAuto ? norm.built.answerIndex : card.answerIndex;
    const options = isAuto ? norm.built.options : card.options;

    const correct = idx === correctIndex;
    setScore((s) => s + (correct ? 1 : 0));
    setPicked(idx);
    if (!correct) recordMiss(options?.[idx]);
    setRevealed(true);
  };

  // -------- Summary View --------
  if (showSummary) {
    const total = quizSet.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs uppercase tracking-wider text-emerald-300">Results • {deck}</div>
          <div className="text-xs px-3 py-1 rounded-full bg-white/[0.06] border border-white/10">
            Score: <span className="font-semibold">{score}</span>/{total} ({pct}%)
          </div>
        </div>

        <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden mb-5 border border-white/10">
          <div className="h-full bg-emerald-500/80 transition-all" style={{ width: "100%" }} />
        </div>

        {misses.length === 0 ? (
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            🎉 Perfect! You didn’t miss any questions.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-zinc-300/90">
              You missed <span className="font-semibold">{misses.length}</span>:
            </div>
            <ol className="space-y-3">
              {misses.map((m, idx) => (
                <li key={idx} className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
                  <div className="text-sm font-medium mb-1">
                    {m.idx}. {m.prompt}
                  </div>
                  <div className="text-xs">
                    <span className="text-zinc-400">Your answer:</span>{" "}
                    <span className="text-red-200">{m.your}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-zinc-400">Correct:</span>{" "}
                    <span className="text-emerald-200">{m.correct}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={restart}
            className="px-3 py-2 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-black font-medium transition"
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  // -------- Question View --------
  const topBar = (
    <div className="flex items-center justify-between mb-4">
      <div className="text-xs uppercase tracking-wider text-emerald-300">
        Quiz • {deck} • {i + 1}/{quizSet.length}
      </div>
      <div className="text-xs px-3 py-1 rounded-full bg-white/[0.06] border border-white/10">
        Score: <span className="font-semibold">{score}</span>/{i}
      </div>
    </div>
  );

  const progress = (
    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden mb-5 border border-white/10">
      <div className="h-full bg-emerald-500/80 transition-all" style={{ width: `${progressPct}%` }} />
    </div>
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20">
      {topBar}
      {progress}

      <div className="text-lg font-medium leading-relaxed mb-5">{card.prompt}</div>

      {/* TF */}
      {norm.mode === "tf" && (
        <div className="flex gap-2">
          {["True", "False"].map((lbl) => {
            const isCorrect = lbl === (card.answerBool ? "True" : "False");
            const base = "flex-1 px-3 py-2 rounded-xl border transition text-center";
            const idle = "bg-white/[0.06] border-white/10 hover:bg-white/[0.1]";
            const revealedClass = isCorrect
              ? "bg-emerald-500/10 border-emerald-400/40"
              : "bg-white/[0.06] border-white/10";
            return (
              <button
                key={lbl}
                onClick={() => pickTF(lbl === "True")}
                className={`${base} ${revealed ? revealedClass : idle}`}
              >
                {lbl}
              </button>
            );
          })}
        </div>
      )}

      {/* Native MC or Auto MC */}
      {(norm.mode === "mc" || norm.mode === "mc-auto") && (
        <div className="space-y-2">
          {(norm.mode === "mc" ? card.options : norm.built.options).map((opt, idx) => {
            const correctIndex = norm.mode === "mc" ? card.answerIndex : norm.built.answerIndex;
            const correct = idx === correctIndex;
            const isPick = picked === idx;
            const base = "w-full text-left px-3 py-2 rounded-xl border transition";
            const idle = "bg-white/[0.06] border-white/10 hover:bg-white/[0.1]";
            const revealedClass = correct
              ? "bg-emerald-500/10 border-emerald-400/40"
              : isPick
              ? "bg-red-500/10 border-red-400/40"
              : "bg-white/[0.06] border-white/10";
            return (
              <button
                key={idx}
                onClick={() => pickMC(idx, norm.mode === "mc-auto")}
                className={`${base} ${revealed ? revealedClass : idle}`}
              >
                {opt}
              </button>
            );
          })}
          {norm.mode === "mc-auto" && (
            <div className="text-[11px] text-zinc-400 mt-1">Choices auto-generated.</div>
          )}
        </div>
      )}

      {/* Reveal fallback */}
      {norm.mode === "reveal" && (
        <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 mt-2">
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="px-3 py-2 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition"
            >
              Reveal
            </button>
          ) : (
            <div className="space-y-3">
              {(norm.expected || card.explain) && (
                <>
                  {norm.expected && (
                    <div className="text-sm">
                      <span className="font-semibold">Answer:</span> {norm.expected}
                    </div>
                  )}
                  {card.explain && (
                    <div className="text-sm text-zinc-300/90">{card.explain}</div>
                  )}
                </>
              )}
            </div>
          )}
          {!revealed && <div className="mt-2 text-xs text-zinc-400">This card has no preset choices.</div>}
        </div>
      )}

      {(norm.mode === "tf" || norm.mode === "mc" || norm.mode === "mc-auto") &&
        revealed &&
        card.explain && (
          <div className="mt-5 text-sm text-zinc-300/90 bg-white/[0.05] border border-white/10 rounded-xl p-3">
            {card.explain}
          </div>
        )}

      <div className="mt-6 flex items-center justify-end gap-2">
        {!revealed ? (
          <span className="text-xs text-zinc-400">Pick an answer…</span>
        ) : (
          <span
            className={
              "text-xs px-2 py-1 rounded-full border " +
              ((norm.mode === "mc" || norm.mode === "mc-auto")
                ? (picked === (norm.mode === "mc" ? card.answerIndex : norm.built.answerIndex)
                    ? "bg-emerald-500/10 border-emerald-400/40 text-emerald-200"
                    : "bg-red-500/10 border-red-400/40 text-red-200")
                : norm.mode === "tf"
                ? (picked === (card.answerBool ? "True" : "False")
                    ? "bg-emerald-500/10 border-emerald-400/40 text-emerald-200"
                    : "bg-red-500/10 border-red-400/40 text-red-200")
                : "bg-white/10 border-white/20 text-zinc-200")
            }
          >
            {norm.mode === "reveal"
              ? "Revealed"
              : (norm.mode === "mc" || norm.mode === "mc-auto")
              ? picked === (norm.mode === "mc" ? card.answerIndex : norm.built.answerIndex)
                ? "Correct"
                : "Incorrect"
              : picked === (card.answerBool ? "True" : "False")
              ? "Correct"
              : "Incorrect"}
          </span>
        )}

        <button
          onClick={next}
          className="px-3 py-2 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-black font-medium transition"
        >
          {i + 1 >= quizSet.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}



