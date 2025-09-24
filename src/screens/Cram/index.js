import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useStore } from "../../context/StoreProvider";
import { selectByDeck } from "../../utils/scheduler";
import { shuffle } from "../../utils/shuffle";

export default function Cram() {
  const { BANK, deck, settings } = useStore();

  // ----- Data pools -----
  const pool = useMemo(() => selectByDeck(BANK, deck), [BANK, deck]);

  const [starred, setStarred] = useState(() => new Set());
  const [starsOnly, setStarsOnly] = useState(false);

  const workingPool = useMemo(() => {
    if (!starsOnly) return pool;
    const ids = new Set(Array.from(starred));
    return pool.filter((c) => ids.has(c.id));
  }, [pool, starsOnly, starred]);

  const [seed, setSeed] = useState(0);
  const sessionSet = useMemo(
    () => shuffle(workingPool).slice(0, settings.cramLength || 25),
    [workingPool, settings.cramLength, seed]
  );

  // ----- Per-run state -----
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const [seen, setSeen] = useState(0);
  const [revealed, setRevealed] = useState(0);

  const empty = sessionSet.length === 0;
  const card = !empty ? sessionSet[i] : undefined;

  const progress = !empty ? (i + (show ? 1 : 0)) / sessionSet.length : 0;
  const isStar = card ? starred.has(card.id) : false;

  // ----- Helpers -----
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

  // Keyboard shortcuts
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

  // Optional auto-advance
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [autoDelayMs, setAutoDelayMs] = useState(900);
  useEffect(() => {
    if (!autoAdvance || !show || empty) return;
    const t = setTimeout(() => next(), autoDelayMs);
    return () => clearTimeout(t);
  }, [show, autoAdvance, autoDelayMs, next, empty]);

  // ----- Render -----
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/60">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs uppercase tracking-wider text-emerald-400/90">
          Cram • {deck}
        </div>
        <div className="text-xs text-zinc-400 space-x-3">
          <span>Cards: {sessionSet.length}</span>
          <span>Seen: {seen}</span>
          <span>Revealed: {revealed}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: `${Math.min(progress, 1) * 100 || 0}%` }}
        />
      </div>

      {/* Empty state */}
      {empty ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="text-sm mb-3">
            {starsOnly ? "No starred cards yet in this deck." : "No cards in this deck yet."}
          </div>
          {starsOnly && (
            <button
              onClick={() => setStarsOnly(false)}
              className="px-3 py-2 rounded bg-emerald-600/80 hover:bg-emerald-600"
            >
              Show all
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                {i + 1}/{sessionSet.length}
              </div>
              <button
                onClick={toggleStar}
                className={
                  "px-2 py-1 text-xs rounded border " +
                  (isStar
                    ? "bg-yellow-500/20 border-yellow-400/40 text-yellow-200"
                    : "bg-zinc-800 border-white/10 text-zinc-300 hover:bg-zinc-700")
                }
              >
                {isStar ? "★ Starred" : "☆ Star"}
              </button>
            </div>

            <div className="text-lg font-medium mb-3">{card.prompt}</div>

            {/* Controls */}
            <div className="flex items-center gap-2 mb-2">
              <button
                className={
                  "text-xs px-2 py-1 rounded border " +
                  (show
                    ? "bg-zinc-700 border-white/10"
                    : "bg-zinc-800 border-white/10 hover:bg-zinc-700")
                }
                onClick={toggleReveal}
              >
                {show ? "Hide" : "Reveal"} (Space)
              </button>

              <label className="text-xs text-zinc-300 flex items-center gap-1">
                <input
                  type="checkbox"
                  className="accent-emerald-500"
                  checked={autoAdvance}
                  onChange={(e) => setAutoAdvance(e.target.checked)}
                />
                Auto-advance
              </label>

              <label className="text-xs text-zinc-300 flex items-center gap-1">
                <span>Delay</span>
                <select
                  className="bg-zinc-800 border border-white/10 rounded px-2 py-1 text-xs"
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

              <label className="ml-auto text-xs text-zinc-300 flex items-center gap-1">
                <input
                  type="checkbox"
                  className="accent-emerald-500"
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

            {/* Answer */}
            {show && (
              <div className="mt-3 text-sm space-y-2">
                {card.type === "tf" && (
                  <div className="px-3 py-2 rounded border bg-zinc-800 border-white/10">
                    Answer:{" "}
                    <b className="text-emerald-300">
                      {card.answerBool ? "True" : "False"}
                    </b>
                  </div>
                )}

                {card.type === "mc" && (
                  <div className="px-3 py-2 rounded border bg-zinc-800 border-white/10">
                    Correct:{" "}
                    <b className="text-emerald-300">
                      {card.options?.[card.answerIndex]}
                    </b>
                  </div>
                )}

                {card.type === "recall" && (
                  <div className="px-3 py-2 rounded border bg-zinc-800 border-white/10">
                    Expected: <b className="text-emerald-300">{card.expected}</b>
                  </div>
                )}

                {card.explain && (
                  <div className="text-zinc-300/90">{card.explain}</div>
                )}
              </div>
            )}
          </div>

          {/* Nav */}
          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={prev}
              className="px-3 py-2 rounded bg-zinc-800 border border-white/10 hover:bg-zinc-700"
            >
              ← Prev
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={reshuffle}
                className="px-3 py-2 rounded bg-zinc-800 border border-white/10 hover:bg-zinc-700"
              >
                Reshuffle
              </button>
              <button
                onClick={next}
                className="px-3 py-2 rounded bg-emerald-600/80 hover:bg-emerald-600"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-zinc-500">
            Shortcuts: <b>Space</b> reveal • <b>←/→</b> prev/next • <b>S</b> star
          </div>
        </>
      )}
    </div>
  );
}


