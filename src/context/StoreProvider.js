// src/context/StoreProvider.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BANK } from "../data/bank";
import { loadJSON, saveJSON } from "../utils/storage";
import { nowMs } from "../utils/scheduler";

/** LocalStorage key — bump when you change deck taxonomy or bank format */
const LS_KEY = "kine3050_state_v2";

/** Canonical deck list matching the UPDATED bank */
const DECKS = [
  "All",
  "Activism & History",
  "Laws & Principles",
  "IEP & LRE",
  "Program Controls & Contraindications",
  "Conditions: Early (0–5)",
  "Conditions: School Age (6–21)",
  "Conditions: Adults (21–50)",
  "Conditions: 50+ & Aging",
  "Benefits & Labeling",
];

/** Map older deck names -> new canonical names */
const DECK_MIGRATION = {
  "Activism & Cases": "Activism & History",
  "Labeling & Benefits": "Benefits & Labeling",
  // Older apps sometimes had a single "Conditions" bucket; map to school-age by default
  Conditions: "Conditions: School Age (6–21)",
};

/** default settings */
const defaultSettings = {
  quizLength: 10,
  cramLength: 15,
};

/** build a fresh progress object for the current BANK */
function freshProgress() {
  return BANK.reduce((acc, q) => {
    acc[q.id] = { box: 1, nextDue: nowMs(), seen: 0, correct: 0 };
    return acc;
  }, {});
}

/** merge saved progress with current BANK (add new, drop removed) */
function reconcileProgress(savedProgress) {
  const base = freshProgress();
  if (!savedProgress || typeof savedProgress !== "object") return base;
  // keep any existing entries that still exist in BANK
  for (const q of BANK) {
    if (savedProgress[q.id]) {
      const p = savedProgress[q.id];
      base[q.id] = {
        box: typeof p.box === "number" ? p.box : 1,
        nextDue: typeof p.nextDue === "number" ? p.nextDue : nowMs(),
        seen: typeof p.seen === "number" ? p.seen : 0,
        correct: typeof p.correct === "number" ? p.correct : 0,
      };
    }
  }
  return base;
}

/** migrate any old deck name to a valid new one; default to "All" */
function normalizeDeckName(name) {
  if (!name) return "All";
  const migrated = DECK_MIGRATION[name] || name;
  return DECKS.includes(migrated) ? migrated : "All";
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const saved = loadJSON(LS_KEY);

  // Normalize deck & progress on load
  const [deck, setDeckState] = useState(normalizeDeckName(saved?.deck));
  const [settings, setSettings] = useState(saved?.settings || defaultSettings);
  const [progress, setProgress] = useState(reconcileProgress(saved?.progress));

  // Persist to LocalStorage whenever state changes
  useEffect(() => {
    saveJSON(LS_KEY, { deck, settings, progress });
  }, [deck, settings, progress]);

  // Public setter that auto-normalizes incoming names
  const setDeck = (name) => setDeckState(normalizeDeckName(name));

  const value = useMemo(
    () => ({
      BANK,
      DECKS,                 // expose canonical decks to the UI
      deck,
      setDeck,
      settings,
      updateSettings: (partial) => setSettings((s) => ({ ...s, ...partial })),
      progress,
      setProgress,
      resetProgress: () => setProgress(freshProgress()),
    }),
    [deck, settings, progress]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
