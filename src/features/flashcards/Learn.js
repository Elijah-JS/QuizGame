import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAnswerText } from "../../shared/study/answerText";
import {
  getUserDeckProgress,
  prioritizeDueCards,
  updateCardProgressFromLearn,
} from "../../shared/utils/userDeckProgressStorage";

/**
 * @param {{
 *   poolOverride?: Array<unknown> | null,
 *   headerLabel?: string | null,
 *   userDeckId?: string | null,
 * }} [props]
 */
export default function Learn({ poolOverride = null, headerLabel = null, userDeckId = null }) {
  const [progressEpoch, setProgressEpoch] = useState(0);

  const basePool = useMemo(() => {
    return Array.isArray(poolOverride) ? poolOverride : [];
  }, [poolOverride]);

  const progressMap = useMemo(() => {
    if (!userDeckId) return {};
    void progressEpoch;
    return getUserDeckProgress(userDeckId);
  }, [userDeckId, progressEpoch]);

  const pool = useMemo(() => {
    if (userDeckId) return prioritizeDueCards(basePool, progressMap);
    return basePool;
  }, [userDeckId, basePool, progressMap]);

  const subtitle = headerLabel ?? "Study";

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = pool[index] || null;

  useEffect(() => {
    setIndex(0);
  }, [pool]);

  useEffect(() => setFlipped(false), [index, pool]);

  const next = useCallback(() => {
    if (!pool.length) return;
    if (userDeckId && flipped) return;
    setIndex((i) => (i + 1) % pool.length);
  }, [pool.length, userDeckId, flipped]);

  const back = useCallback(() => {
    if (!pool.length) return;
    setIndex((i) => (i - 1 + pool.length) % pool.length);
  }, [pool.length]);

  const rateAndContinue = useCallback(
    (rating) => {
      if (!userDeckId || !card?.id) return;
      updateCardProgressFromLearn(userDeckId, card.id, rating);
      setProgressEpoch((e) => e + 1);
      setFlipped(false);
    },
    [userDeckId, card?.id]
  );

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
      <div className="rounded-xl border border-arc-border bg-arc-panel p-6 md:p-8 text-center space-y-3 shadow-arc-inset">
        <div className="text-lg font-semibold mb-1 font-display text-arc-fg">No cards to study</div>
        <div className="text-sm text-arc-muted">
          Open a saved deck from My decks, or import material and save a deck first.
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

  const answerText = getAnswerText(card);
  const showUserRatings = Boolean(userDeckId && flipped);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs font-medium tracking-wide text-arc-muted truncate font-display">
          Learn · {subtitle}
        </div>
        <div className="text-xs px-3 py-1 rounded-md bg-arc-panel-soft border border-arc-border-bright text-arc-subtle shrink-0 tabular-nums">
          {index + 1}/{pool.length}
        </div>
      </div>

      {userDeckId && (
        <p className="text-[11px] text-arc-dim">
          Due cards are shown first. Rate after you reveal the answer to update your schedule.
        </p>
      )}

      <div
        className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] [perspective:1200px]"
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label="Flip card"
      >
        <div
          className={
            "absolute inset-0 motion-safe:transition-transform motion-safe:duration-400 [transform-style:preserve-3d] rounded-xl " +
            (flipped ? "[transform:rotateY(180deg)]" : "")
          }
        >
          <div className="absolute inset-0 rounded-xl border border-arc-border-bright/80 bg-arc-panel p-5 sm:p-6 [backface-visibility:hidden] flex shadow-arc-card ring-1 ring-white/5">
            <div className="m-auto text-center">
              <div className="text-[11px] font-medium tracking-wide text-arc-muted mb-2 font-display">Prompt</div>
              <div className="text-lg md:text-xl font-medium leading-relaxed text-arc-fg">
                {card.prompt}
              </div>
              <div className="mt-3 text-[12px] text-arc-dim">
                Click or press <span className="text-arc-subtle font-medium">Space</span> to reveal
              </div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-xl border border-arc-border-bright/80 bg-arc-panel p-5 sm:p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] flex shadow-arc-card ring-1 ring-arc-accent/10">
            <div className="m-auto text-center max-w-2xl">
              <div className="text-[11px] font-medium tracking-wide text-arc-muted mb-2 font-display">Answer</div>
              <div className="text-lg md:text-xl font-semibold whitespace-pre-wrap text-arc-fg">
                {answerText}
              </div>
              {card.explain && <div className="mt-3 text-sm text-arc-muted">{card.explain}</div>}
            </div>
          </div>
        </div>
      </div>

      {showUserRatings && (
        <div
          className="rounded-xl border border-arc-border bg-arc-panel p-4 space-y-2 shadow-arc-inset"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="group"
          aria-label="Rate recall"
        >
          <div className="text-xs text-arc-muted">How well did you know it?</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              ["again", "Again", "border-arc-bad-border bg-arc-bad-surface/50 text-arc-bad hover:bg-arc-bad-surface/70"],
              ["hard", "Hard", "border-arc-border-bright bg-arc-panel-soft text-arc-subtle hover:bg-arc-inset"],
              ["good", "Good", "border-arc-ok-border bg-arc-ok-surface/80 text-arc-ok hover:bg-arc-ok-surface"],
              ["easy", "Easy", "border-arc-border-bright bg-arc-panel-soft text-arc-fg hover:bg-arc-inset"],
            ].map(([key, label, cls]) => (
              <button
                key={key}
                type="button"
                onClick={() => rateAndContinue(key)}
                className={`px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition ${cls}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={back}
          className="px-4 py-2 rounded-lg bg-arc-panel-soft border border-arc-border-bright text-arc-subtle hover:bg-arc-inset transition motion-safe:active:scale-[0.98]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={Boolean(userDeckId && flipped)}
          className={
            "px-4 py-2 rounded-lg font-medium transition motion-safe:active:scale-[0.98] " +
            (userDeckId && flipped
              ? "bg-arc-inset text-arc-dim cursor-not-allowed border border-arc-border"
              : "bg-arc-primary text-arc-ink hover:bg-arc-primary-hover shadow-arc-glow")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
