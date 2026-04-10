import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { shuffle } from "../../shared/utils/shuffle";

/**
 * @param {{ poolOverride?: Array<unknown> | null, titleLabel?: string | null }} [props]
 */
export default function ScenarioPractice({ poolOverride = null, titleLabel = null } = {}) {
  const pool = useMemo(() => {
    return Array.isArray(poolOverride) ? poolOverride : [];
  }, [poolOverride]);

  const headerDeck = titleLabel ?? "Scenario";

  const [seed, setSeed] = useState(0);
  const set = useMemo(() => {
    void seed;
    return shuffle(pool).slice(0, 12);
  }, [pool, seed]);

  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState(null);
  const [results, setResults] = useState([]);
  const card = set[i];

  if (!set.length) {
    return (
      <div className="p-6 rounded-xl border border-arc-border bg-arc-panel text-center space-y-3 shadow-arc-inset">
        <p className="text-sm text-arc-muted">
          {pool.length === 0
            ? "Scenario practice uses a saved deck. Open My decks and start from a deck with cards."
            : "No scenario cards in this deck yet."}
        </p>
        {pool.length === 0 && (
          <Link
            to="/decks"
            className="inline-flex justify-center px-4 py-2.5 rounded-lg text-sm font-medium bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition shadow-arc-glow"
          >
            My decks
          </Link>
        )}
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
    if (results.length >= set.length) return;
    if (i + 1 >= set.length) {
      setI(i);
      setRevealed(false);
      setPicked(null);
    } else {
      setI((x) => x + 1);
      setRevealed(false);
      setPicked(null);
    }
  };

  const restart = () => {
    setSeed((s) => s + 1);
    setI(0);
    setResults([]);
    setRevealed(false);
    setPicked(null);
  };

  const progress = Math.min(results.length / set.length, 1);

  if (results.length === set.length) {
    const correctCount = results.filter((r) => r.correct).length;
    const missed = results.filter((r) => !r.correct);

    return (
      <div className="p-6 rounded-xl border border-arc-border bg-arc-panel shadow-arc-inset">
        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="text-xs font-medium tracking-wide text-arc-muted font-display">
            Scenario practice · {headerDeck}
          </div>
          <div className="text-sm text-arc-muted shrink-0 tabular-nums">
            Score: <span className="font-semibold text-arc-fg">{correctCount}</span> / {set.length}
          </div>
        </div>

        <div className="h-1.5 w-full bg-arc-inset rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-arc-accent transition-all"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="rounded-lg border border-arc-border bg-arc-inset p-4 mb-6 shadow-arc-inset">
          <div className="text-lg font-semibold mb-1 font-display text-arc-fg">Great work!</div>
          <div className="text-sm text-arc-muted">
            You answered <span className="font-medium text-arc-subtle">{correctCount}</span> of{" "}
            {set.length} correctly.
          </div>
        </div>

        {missed.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-arc-subtle">
              Review what you missed
            </div>
            {missed.map((m, idx) => (
              <div
                key={m.id}
                className="rounded-lg border border-arc-bad-border bg-arc-bad-surface/60 p-4"
              >
                <div className="text-sm font-medium mb-1 text-arc-fg">
                  {idx + 1}. {m.prompt}
                </div>
                <div className="text-xs">
                  <div className="mb-1">
                    <span className="text-arc-muted">Your answer:</span>{" "}
                    <span className="text-arc-bad">{m.your}</span>
                  </div>
                  <div className="mb-1">
                    <span className="text-arc-muted">Correct:</span>{" "}
                    <span className="text-arc-ok">{m.correctText}</span>
                  </div>
                  {m.explain && (
                    <div className="text-arc-muted">{m.explain}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={restart}
            className="px-3 py-2 rounded-lg bg-arc-primary text-arc-ink hover:bg-arc-primary-hover shadow-arc-glow transition"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-arc-border bg-arc-panel shadow-arc-inset">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div className="text-xs font-medium tracking-wide text-arc-muted font-display">
          Scenario · {headerDeck} · {i + 1}/{set.length}
        </div>
        <div className="text-sm text-arc-muted tabular-nums">
          Score:{" "}
          <span className="font-semibold text-arc-fg">
            {results.filter((r) => r.correct).length}
          </span>{" "}
          / {set.length}
        </div>
      </div>

      <div className="h-1.5 w-full bg-arc-inset rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-arc-accent transition-all"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="text-lg font-medium mb-4 text-arc-fg">{card.prompt}</div>

      {isTF && (
        <div className="grid grid-cols-2 gap-2">
          {["True", "False"].map((lbl, idx) => {
            const correctLbl = card.answerBool ? "True" : "False";
            const isCorrectBtn = lbl === correctLbl;
            const isPick = picked === idx;
            return (
              <button
                type="button"
                key={lbl}
                onClick={() => pick(idx)}
                className={
                  "px-3 py-2 rounded-lg border text-center transition " +
                  (revealed
                    ? isCorrectBtn
                      ? "bg-arc-ok-surface/90 border-arc-ok-border text-arc-ok"
                      : isPick
                      ? "bg-arc-bad-surface/70 border-arc-bad-border text-arc-bad"
                      : "bg-arc-panel-soft border-arc-border-bright text-arc-subtle"
                    : "bg-arc-panel-soft border-arc-border-bright text-arc-subtle hover:bg-arc-inset")
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
                type="button"
                key={idx}
                onClick={() => pick(idx)}
                className={
                  "w-full text-left px-3 py-2 rounded-lg border transition " +
                  (revealed
                    ? correct
                      ? "bg-arc-ok-surface/90 border-arc-ok-border text-arc-ok"
                      : isPick
                      ? "bg-arc-bad-surface/70 border-arc-bad-border text-arc-bad"
                      : "bg-arc-panel-soft border-arc-border-bright text-arc-subtle"
                    : "bg-arc-panel-soft border-arc-border-bright text-arc-subtle hover:bg-arc-inset")
                }
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {revealed && card.explain && (
        <div className="mt-4 text-sm text-arc-muted">{card.explain}</div>
      )}

      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={next}
          disabled={!revealed}
          className={
            "px-3 py-2 rounded-lg transition " +
            (revealed
              ? "bg-arc-primary text-arc-ink hover:bg-arc-primary-hover shadow-arc-glow"
              : "bg-arc-inset text-arc-dim cursor-not-allowed border border-arc-border")
          }
        >
          {i + 1 >= set.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
