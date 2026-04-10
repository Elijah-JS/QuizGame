import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../providers/StoreProvider";
import { shuffle } from "../../shared/utils/shuffle";

/**
 * @param {{ poolOverride?: Array<unknown> | null, titleLabel?: string | null }} [props]
 */
export default function CramSession({ poolOverride = null, titleLabel = null } = {}) {
  const { settings } = useStore();

  const pool = useMemo(() => {
    return Array.isArray(poolOverride) ? poolOverride : [];
  }, [poolOverride]);

  const headerDeck = titleLabel ?? "Cram";

  const [starred, setStarred] = useState(() => new Set());
  const [starsOnly, setStarsOnly] = useState(false);

  const workingPool = useMemo(() => {
    if (!starsOnly) return pool;
    const ids = new Set(Array.from(starred));
    return pool.filter((c) => ids.has(c.id));
  }, [pool, starsOnly, starred]);

  const [seed, setSeed] = useState(0);
  const sessionSet = useMemo(() => {
    void seed;
    return shuffle(workingPool).slice(0, settings.cramLength || 25);
  }, [workingPool, settings.cramLength, seed]);

  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const [seen, setSeen] = useState(0);
  const [revealed, setRevealed] = useState(0);

  const empty = sessionSet.length === 0;
  const card = !empty ? sessionSet[i] : undefined;

  const progress = !empty ? (i + (show ? 1 : 0)) / sessionSet.length : 0;
  const isStar = card ? starred.has(card.id) : false;

  const toggleReveal = useCallback(() => {
    setShow((s) => {
      if (!s) setRevealed((r) => r + 1);
      return !s;
    });
  }, []);

  const go = useCallback(
    (dir) => {
      if (empty) return;
      setShow(false);
      setI((x) => {
        const n = (x + dir + sessionSet.length) % sessionSet.length;
        if (dir > 0) setSeen((c) => Math.min(c + 1, sessionSet.length));
        return n;
      });
    },
    [empty, sessionSet.length]
  );

  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  const toggleStar = useCallback(() => {
    if (!card) return;
    setStarred((old) => {
      const s = new Set(old);
      if (s.has(card.id)) s.delete(card.id);
      else s.add(card.id);
      return s;
    });
  }, [card]);

  const reshuffle = useCallback(() => {
    setSeed((s) => s + 1);
    setI(0);
    setShow(false);
    setSeen(0);
    setRevealed(0);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.code === "Space") {
        e.preventDefault();
        toggleReveal();
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        next();
      } else if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key?.toLowerCase() === "s") {
        toggleStar();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, toggleReveal, toggleStar]);

  const [autoAdvance, setAutoAdvance] = useState(true);
  const [autoDelayMs, setAutoDelayMs] = useState(900);
  useEffect(() => {
    if (!autoAdvance || !show || empty) return;
    const t = setTimeout(() => next(), autoDelayMs);
    return () => clearTimeout(t);
  }, [show, autoAdvance, autoDelayMs, next, empty]);

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-arc-border bg-arc-panel shadow-arc-inset">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div className="text-xs font-medium tracking-wide text-arc-muted font-display">
          Cram · {headerDeck}
        </div>
        <div className="text-xs text-arc-muted flex flex-wrap gap-x-3 gap-y-1">
          <span>Cards: {sessionSet.length}</span>
          <span>Seen: {seen}</span>
          <span>Revealed: {revealed}</span>
        </div>
      </div>

      <div className="h-1.5 w-full bg-arc-inset rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-arc-accent transition-all"
          style={{ width: `${Math.min(progress, 1) * 100 || 0}%` }}
        />
      </div>

      {empty ? (
        <div className="rounded-xl border border-arc-border bg-arc-inset p-6 space-y-3">
          <div className="text-sm text-arc-subtle">
            {starsOnly              ? "No starred cards yet in this deck."
              : pool.length === 0
                ? "No cards to cram. Open a saved deck from My decks."
                : "No cards in this deck yet."}
          </div>
          {pool.length === 0 && (
            <Link
              to="/decks"
              className="inline-flex justify-center px-4 py-2.5 rounded-lg text-sm font-medium bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition shadow-arc-glow"
            >
              My decks
            </Link>
          )}
          {starsOnly && (
            <button
              type="button"
              onClick={() => setStarsOnly(false)}
              className="px-3 py-2 rounded-lg bg-arc-primary text-arc-ink hover:bg-arc-primary-hover shadow-arc-glow"
            >
              Show all
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-arc-border bg-arc-inset p-4 shadow-arc-inset">
            <div className="flex items-center justify-between mb-2 gap-2">
              <div className="text-[11px] uppercase tracking-wider text-arc-muted font-display">
                {i + 1}/{sessionSet.length}
              </div>
              <button
                type="button"
                onClick={toggleStar}
                className={
                  "px-2 py-1 text-xs rounded border shrink-0 " +
                  (isStar
                    ? "bg-arc-warn-surface border-arc-warn-border text-arc-warn"
                    : "bg-arc-panel-soft border-arc-border-bright text-arc-subtle hover:bg-arc-inset")
                }
              >
                {isStar ? "★ Starred" : "\u2606 Star"}
              </button>
            </div>

            <div className="text-lg font-medium mb-3 text-arc-fg">{card.prompt}</div>

            <div className="flex flex-col gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={
                    "text-xs px-2 py-1 rounded border " +
                    (show
                      ? "bg-arc-inset border-arc-border-bright"
                      : "bg-arc-panel-soft border-arc-border-bright hover:bg-arc-inset")
                  }
                  onClick={toggleReveal}
                >
                  {show ? "Hide" : "Reveal"} (Space)
                </button>

                <label className="text-xs text-arc-subtle flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="accent-arc-accent"
                    checked={autoAdvance}
                    onChange={(e) => setAutoAdvance(e.target.checked)}
                  />
                  Auto-advance
                </label>

                <label className="text-xs text-arc-subtle flex items-center gap-1">
                  <span>Delay</span>
                  <select
                    className="bg-arc-panel border border-arc-border-bright rounded-lg px-2 py-1 text-xs text-arc-fg"
                    value={autoDelayMs}
                    onChange={(e) => setAutoDelayMs(Number(e.target.value))}
                  >
                    {[700, 900, 1200, 1500, 2000].map((ms) => (
                      <option key={ms} value={ms}>
                        {ms} ms
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="text-xs text-arc-subtle flex items-center gap-1 w-fit">
                <input
                  type="checkbox"
                    className="accent-arc-accent"
                  checked={starsOnly}
                  onChange={(e) => {
                    setStarsOnly(e.target.checked);
                    setI(0);
                    setShow(false);
                    setSeen(0);
                    setRevealed(0);
                  }}
                />
                Starred only
              </label>
            </div>

            {show && (
              <div className="mt-3 text-sm space-y-2">
                {card.type === "tf" && (
                  <div className="px-3 py-2 rounded-lg border bg-arc-panel-soft border-arc-border-bright">
                    Answer:{" "}
                    <b className="text-arc-accent">
                      {card.answerBool ? "True" : "False"}
                    </b>
                  </div>
                )}

                {card.type === "mc" && (
                  <div className="px-3 py-2 rounded-lg border bg-arc-panel-soft border-arc-border-bright">
                    Correct:{" "}
                    <b className="text-arc-accent">
                      {card.options?.[card.answerIndex]}
                    </b>
                  </div>
                )}

                {card.type === "recall" && (
                  <div className="px-3 py-2 rounded-lg border bg-arc-panel-soft border-arc-border-bright">
                    Expected: <b className="text-arc-accent">{card.expected}</b>
                  </div>
                )}

                {card.explain && (
                  <div className="text-arc-muted">{card.explain}</div>
                )}
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between gap-2 flex-wrap">
            <button
              type="button"
              onClick={prev}
              className="px-3 py-2 rounded-lg bg-arc-panel-soft border border-arc-border-bright text-arc-subtle hover:bg-arc-inset transition"
            >
              ← Prev
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={reshuffle}
                className="px-3 py-2 rounded-lg bg-arc-panel-soft border border-arc-border-bright text-arc-subtle hover:bg-arc-inset transition"
              >
                Reshuffle
              </button>
              <button
                type="button"
                onClick={next}
                className="px-3 py-2 rounded-lg bg-arc-primary text-arc-ink hover:bg-arc-primary-hover shadow-arc-glow transition"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-arc-dim">
            Shortcuts: <b>Space</b> reveal • <b>←/→</b> prev/next • <b>S</b> star
          </div>
        </>
      )}
    </div>
  );
}
