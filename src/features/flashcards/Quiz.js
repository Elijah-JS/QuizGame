import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../providers/StoreProvider";
import { shuffle } from "../../shared/utils/shuffle";
import { getQuizCardMode, getCorrectText } from "../../shared/study/quizCardMode";
import {
  getUserDeckProgress,
  prioritizeDueCards,
  updateCardProgressFromQuiz,
  updateCardProgressFromQuizReveal,
} from "../../shared/utils/userDeckProgressStorage";

export default function Quiz({ poolOverride = null, quizHeaderLabel = null, userDeckId = null }) {
  const { settings } = useStore();
  const [quizOrderTick, setQuizOrderTick] = useState(0);
  const revealProgressSentRef = useRef(false);

  const pool = useMemo(() => {
    void quizOrderTick;
    const base = Array.isArray(poolOverride) ? poolOverride : [];
    if (userDeckId) {
      return prioritizeDueCards(base, getUserDeckProgress(userDeckId));
    }
    return base;
  }, [poolOverride, userDeckId, quizOrderTick]);

  const headerDeck = quizHeaderLabel ?? "Quiz";

  const quizSet = useMemo(() => {
    const len = settings.quizLength || 10;
    if (userDeckId) {
      return pool.slice(0, Math.min(len, pool.length));
    }
    return shuffle(pool).slice(0, len);
  }, [pool, settings.quizLength, userDeckId]);

  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState(null);
  const [misses, setMisses] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  const card = quizSet[i];
  const norm = getQuizCardMode(card, pool);

  useEffect(() => {
    revealProgressSentRef.current = false;
  }, [i, userDeckId]);

  useEffect(() => {
    setI(0);
    setScore(0);
    setRevealed(false);
    setPicked(null);
    setMisses([]);
    setShowSummary(false);
  }, [pool]);

  if (!quizSet.length || !card) {
    return (
      <div className="rounded-xl border border-arc-border bg-arc-panel p-6 text-center space-y-3">
        <div className="text-lg font-semibold mb-1 text-arc-fg">No quiz cards available.</div>
        <div className="text-sm text-arc-muted">
          Choose a saved deck with cards from My decks.
        </div>
        <Link
          to="/decks"
          className="inline-flex justify-center px-4 py-2.5 rounded-lg text-sm font-medium bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition shadow-arc-glow"
        >
          My decks
        </Link>
      </div>
    );
  }

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
    if (
      userDeckId &&
      card?.id &&
      revealed &&
      norm.mode === "reveal" &&
      !revealProgressSentRef.current
    ) {
      updateCardProgressFromQuizReveal(userDeckId, card.id);
      revealProgressSentRef.current = true;
    }

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
    if (userDeckId) setQuizOrderTick((t) => t + 1);
  };

  const pickTF = (ans) => {
    if (revealed || norm.mode !== "tf") return;
    const correct = ans === card.answerBool;
    setScore((s) => s + (correct ? 1 : 0));
    setPicked(ans ? "True" : "False");
    if (!correct) recordMiss(ans ? "True" : "False");
    if (userDeckId && card?.id) updateCardProgressFromQuiz(userDeckId, card.id, correct);
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
    if (userDeckId && card?.id) updateCardProgressFromQuiz(userDeckId, card.id, correct);
    setRevealed(true);
  };

  if (showSummary) {
    const total = quizSet.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="rounded-xl border border-arc-border bg-arc-panel p-6">
        <div className="flex items-center justify-between mb-6 gap-2">
          <div className="text-xs font-medium tracking-wide text-arc-muted">
            Results · {headerDeck}
          </div>
          <div className="text-xs px-3 py-1 rounded-md bg-arc-panel-soft border border-arc-border-bright text-arc-subtle shrink-0 tabular-nums">
            Score: <span className="font-semibold text-arc-fg">{score}</span>/{total} ({pct}%)
          </div>
        </div>

        <div className="h-2 w-full rounded-full bg-arc-panel-soft overflow-hidden mb-5">
          <div className="h-full bg-arc-accent transition-all" style={{ width: "100%" }} />
        </div>

        {misses.length === 0 ? (
          <div className="rounded-lg border border-arc-ok-border bg-arc-ok-surface/80 p-4 text-arc-ok">
            Perfect! You didn’t miss any questions.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-arc-muted">
              You missed <span className="font-semibold text-arc-fg">{misses.length}</span>:
            </div>
            <ol className="space-y-3">
              {misses.map((m, idx) => (
                <li key={idx} className="rounded-lg border border-arc-border bg-arc-inset p-3">
                  <div className="text-sm font-medium mb-1">
                    {m.idx}. {m.prompt}
                  </div>
                  <div className="text-xs">
                    <span className="text-arc-muted">Your answer:</span>{" "}
                    <span className="text-arc-bad">{m.your}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-arc-muted">Correct:</span>{" "}
                    <span className="text-arc-ok">{m.correct}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end">
          <button
            type="button"
            onClick={restart}
            className="px-3 py-2 rounded-lg bg-arc-primary text-arc-ink hover:bg-arc-primary-hover font-medium transition shadow-arc-glow"
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  const topBar = (
    <div className="flex items-center justify-between mb-4 gap-2">
      <div className="text-xs font-medium tracking-wide text-arc-muted truncate">
        Quiz · {headerDeck} · {i + 1}/{quizSet.length}
      </div>
      <div className="text-xs px-3 py-1 rounded-md bg-arc-panel-soft border border-arc-border-bright text-arc-subtle shrink-0 tabular-nums">
        Score: <span className="font-semibold text-arc-fg">{score}</span>/{i}
      </div>
    </div>
  );

  const progress = (
    <div className="h-2 w-full rounded-full bg-arc-panel-soft overflow-hidden mb-5">
      <div className="h-full bg-arc-accent transition-all" style={{ width: `${progressPct}%` }} />
    </div>
  );

  return (
    <div className="rounded-xl border border-arc-border bg-arc-panel p-6">
      {topBar}
      {progress}

      {userDeckId && (
        <p className="text-[11px] text-arc-muted mb-3">
          Due cards are listed first for this session. Restart the quiz to refresh order from saved
          progress.
        </p>
      )}

      <div className="text-lg font-medium leading-relaxed mb-5 text-arc-fg">{card.prompt}</div>

      {norm.mode === "tf" && (
        <div className="flex gap-2">
          {["True", "False"].map((lbl) => {
            const isCorrect = lbl === (card.answerBool ? "True" : "False");
            const base = "flex-1 px-3 py-2 rounded-lg border transition text-center";
            const idle = "bg-arc-panel-soft border-arc-border-bright text-arc-fg hover:bg-arc-inset";
            const revealedClass = isCorrect
              ? "bg-arc-ok-surface/90 border-arc-ok-border text-arc-ok"
              : "bg-arc-panel-soft border-arc-border-bright text-arc-subtle";
            return (
              <button
                type="button"
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

      {(norm.mode === "mc" || norm.mode === "mc-auto") && (
        <div className="space-y-2">
          {(norm.mode === "mc" ? card.options : norm.built.options).map((opt, idx) => {
            const correctIndex = norm.mode === "mc" ? card.answerIndex : norm.built.answerIndex;
            const correct = idx === correctIndex;
            const isPick = picked === idx;
            const base = "w-full text-left px-3 py-2 rounded-lg border transition";
            const idle = "bg-arc-panel-soft border-arc-border-bright text-arc-fg hover:bg-arc-inset";
            const revealedClass = correct
              ? "bg-arc-ok-surface/90 border-arc-ok-border text-arc-ok"
              : isPick
              ? "bg-arc-bad-surface/70 border-arc-bad-border text-arc-bad"
              : "bg-arc-panel-soft border-arc-border-bright text-arc-subtle";
            return (
              <button
                type="button"
                key={idx}
                onClick={() => pickMC(idx, norm.mode === "mc-auto")}
                className={`${base} ${revealed ? revealedClass : idle}`}
              >
                {opt}
              </button>
            );
          })}
          {norm.mode === "mc-auto" && (
            <div className="text-[11px] text-arc-muted mt-1">Choices auto-generated.</div>
          )}
        </div>
      )}

      {norm.mode === "reveal" && (
        <div className="rounded-lg border border-arc-border bg-arc-inset p-4 mt-2">
          {!revealed ? (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="px-3 py-2 rounded-lg bg-arc-panel-soft border border-arc-border-bright text-arc-fg hover:bg-arc-inset transition"
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
                    <div className="text-sm text-arc-muted">{card.explain}</div>
                  )}
                </>
              )}
            </div>
          )}
          {!revealed && <div className="mt-2 text-xs text-arc-muted">This card has no preset choices.</div>}
        </div>
      )}

      {(norm.mode === "tf" || norm.mode === "mc" || norm.mode === "mc-auto") &&
        revealed &&
        card.explain && (
          <div className="mt-5 text-sm text-arc-muted bg-arc-inset border border-arc-border rounded-lg p-3">
            {card.explain}
          </div>
        )}

      <div className="mt-6 flex items-center justify-end gap-2 flex-wrap">
        {!revealed ? (
          <span className="text-xs text-arc-muted">Pick an answer…</span>
        ) : (
          <span
            className={
              "text-xs px-2 py-1 rounded-md border " +
              ((norm.mode === "mc" || norm.mode === "mc-auto")
                ? (picked === (norm.mode === "mc" ? card.answerIndex : norm.built.answerIndex)
                    ? "bg-arc-ok-surface/90 border-arc-ok-border text-arc-ok"
                    : "bg-arc-bad-surface/70 border-arc-bad-border text-arc-bad")
                : norm.mode === "tf"
                ? (picked === (card.answerBool ? "True" : "False")
                    ? "bg-arc-ok-surface/90 border-arc-ok-border text-arc-ok"
                    : "bg-arc-bad-surface/70 border-arc-bad-border text-arc-bad")
                : "bg-arc-panel-soft border-arc-border-bright text-arc-fg")
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
          type="button"
          onClick={next}
          className="px-3 py-2 rounded-lg bg-arc-primary text-arc-ink hover:bg-arc-primary-hover font-medium transition shadow-arc-glow"
        >
          {i + 1 >= quizSet.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
