// src/context/StoreProvider.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BANK as RAW_BANK } from "../data/bank";
import { loadJSON, saveJSON } from "../utils/storage";
import { nowMs } from "../utils/scheduler";

/** LocalStorage key — new namespace for Quiz 3 version */
const LS_KEY = "kine3050_q3_state_v1";

/** ✅ Canonical deck list for QUIZ 3 (FINAL) */
const DECKS = [
  "All",

  // Families & Caregivers
  "Families & Caregivers",
  "Caregiver Stress, Grief & Coping",
  "Family Dynamics, Culture & Finances",

  // Assessment & Planning
  "Assessment vs Evaluation",
  "Paradigm for Effectiveness",
  "Assessment Tools & Issues",
  "Program Planning Across the Lifespan",

  // Health, Leisure, Promotion
  "Health-Related Fitness & Public Health",
  "Leisure & Recreation",
  "Barriers to Participation",
  "Promoting PA, Exercise, Recreation & Leisure",

  // Adapted Sport
  "Adapted Sport & Equal Opportunity",
  "School Policy, ADA & 504",
];

/** Normalize any requested deck name; default to "All" if invalid */
function normalizeDeckName(name) {
  if (!name) return "All";
  return DECKS.includes(name) ? name : "All";
}

/** Optionally guard that all questions live in valid decks */
function mapBankToCanonicalDecks(bank) {
  return bank.map((q) => {
    const deck = normalizeDeckName(q.deck);
    return { ...q, deck };
  });
}

/** Build fresh spaced-repetition progress for a given BANK */
function freshProgress(MAPPED_BANK) {
  return MAPPED_BANK.reduce((acc, q) => {
    acc[q.id] = { box: 1, nextDue: nowMs(), seen: 0, correct: 0 };
    return acc;
  }, {});
}

/** Merge saved progress with current BANK (add new, drop removed) */
function reconcileProgress(savedProgress, MAPPED_BANK) {
  const base = freshProgress(MAPPED_BANK);
  if (!savedProgress || typeof savedProgress !== "object") return base;

  for (const q of MAPPED_BANK) {
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

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // 1) Ensure the BANK only uses canonical decks
  const BANK = useMemo(() => mapBankToCanonicalDecks(RAW_BANK), []);

  // Dev helper: warn once if something still sneaks into a non-canonical deck
  useEffect(() => {
    const nonCanon = Array.from(new Set(BANK.map((q) => q.deck))).filter(
      (d) => !DECKS.includes(d)
    );
    if (nonCanon.length) {
      // eslint-disable-next-line no-console
      console.warn(
        "[StoreProvider] Non-canonical decks detected in BANK:",
        nonCanon
      );
    }
  }, [BANK]);

  // 2) Load saved state under the new Quiz 3 LS key
  const saved = loadJSON(LS_KEY);

  // 3) Normalize selected deck & progress on load
  const [deck, setDeckState] = useState(normalizeDeckName(saved?.deck));
  const [settings, setSettings] = useState(
    saved?.settings || { quizLength: 10, cramLength: 15 }
  );
  const [progress, setProgress] = useState(reconcileProgress(saved?.progress, BANK));

  // 4) Persist to LocalStorage whenever state changes
  useEffect(() => {
    saveJSON(LS_KEY, { deck, settings, progress });
  }, [deck, settings, progress]);

  // Public setter that auto-normalizes incoming names
  const setDeck = (name) => setDeckState(normalizeDeckName(name));

  const value = useMemo(
    () => ({
      BANK,   // Quiz 3 questions, already using canonical decks
      DECKS,  // canonical deck list for the UI
      deck,
      setDeck,
      settings,
      updateSettings: (partial) =>
        setSettings((s) => ({ ...s, ...partial })),
      progress,
      setProgress,
      resetProgress: () => setProgress(freshProgress(BANK)),
    }),
    [BANK, deck, settings, progress]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
