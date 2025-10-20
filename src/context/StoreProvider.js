// src/context/StoreProvider.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BANK as RAW_BANK } from "../data/bank";
import { loadJSON, saveJSON } from "../utils/storage";
import { nowMs } from "../utils/scheduler";

/** LocalStorage key — bump when you change deck taxonomy or bank format */
const LS_KEY = "kine3050_state_v4";

/** ✅ Canonical deck list (NEW taxonomy) */
const DECKS = [
  "All",
  "Ableism vs Disablism",
  "Universal Design (UD)",
  "Barriers to Inclusion",
  "Health & Physical Activity Benefits/Risks",
  "Policy, Law & Rights",
  "Employment & Poverty",
  "Labeling & Language",
  "Activism, Leadership & Case Studies",
  "Public Health & Disparities",
];

/** 🔁 Migrate *old deck names* → new taxonomy (broad/default mapping) */
const DECK_MIGRATION_NAME = {
  // Previous course schema → closest new bucket
  "Activism & History": "Activism, Leadership & Case Studies",
  "Laws & Principles": "Policy, Law & Rights",
  "IEP & LRE": "Policy, Law & Rights",
  "Program Controls & Contraindications": "Health & Physical Activity Benefits/Risks",
  "Conditions: Early (0–5)": "Health & Physical Activity Benefits/Risks",
  "Conditions: School Age (6–21)": "Health & Physical Activity Benefits/Risks",
  "Conditions: Adults (21–50)": "Health & Physical Activity Benefits/Risks",
  "Conditions: 50+ & Aging": "Health & Physical Activity Benefits/Risks",
  "Benefits & Labeling": "Labeling & Language",

  // Other variants we encountered
  "Activism & Cases": "Activism, Leadership & Case Studies",
  "Ableism vs Disablism": "Ableism vs Disablism",
  "Universal Design (UD)": "Universal Design (UD)",
  "Public Health & Disparities": "Public Health & Disparities",
  "Program Controls": "Health & Physical Activity Benefits/Risks",
};

/** 🎯 Fine-grained migration using question ID prefixes (overrides name mapping) */
function migrateDeckByIdPrefix(q) {
  const id = q.id || "";
  if (id.startsWith("ah_")) return "Activism, Leadership & Case Studies";
  if (id.startsWith("lp_")) return "Policy, Law & Rights";
  if (id.startsWith("il_")) return "Policy, Law & Rights"; // IEP/LRE
  if (id.startsWith("pc_")) return "Health & Physical Activity Benefits/Risks"; // program controls/contra
  if (id.startsWith("c_early_")) return "Health & Physical Activity Benefits/Risks";
  if (id.startsWith("c_school_")) return "Health & Physical Activity Benefits/Risks";
  if (id.startsWith("c_adult_")) return "Health & Physical Activity Benefits/Risks";
  if (id.startsWith("c_aging_")) return "Health & Physical Activity Benefits/Risks";
  if (id.startsWith("bl_benefits_")) return "Health & Physical Activity Benefits/Risks";
  if (id.startsWith("bl_label")) return "Labeling & Language";
  if (id.startsWith("ad_")) return "Ableism vs Disablism";
  if (id.startsWith("ud_")) return "Universal Design (UD)";
  if (id.startsWith("ph_")) return "Public Health & Disparities";
  if (id.startsWith("emp_")) return "Employment & Poverty";
  if (id.startsWith("cg_")) return "Caregiver & Support Systems";
  if (id.startsWith("bs_")) return "Barriers to Inclusion";
  if (id.startsWith("pp_")) return "Practical Strategies & Solutions";
  if (id.startsWith("rb_")) return "Health & Physical Activity Benefits/Risks";
  if (id.startsWith("gs_")) return "Discussion & Exam Concepts";
  return null; // no override → fall back to name mapping
}

/** Normalize any deck name into the new canonical set; default "All" */
function normalizeDeckName(name) {
  if (!name) return "All";
  const migrated = DECK_MIGRATION_NAME[name] || name;
  return DECKS.includes(migrated) ? migrated : "All";
}

/** Produce a BANK that’s *canonically decked* for the new taxonomy */
function mapBankToNewDecks(bank) {
  return bank.map((q) => {
    const byId = migrateDeckByIdPrefix(q);
    const migrated = byId || normalizeDeckName(q.deck);
    if (!DECKS.includes(migrated)) {
      // last-resort safety net
      return { ...q, deck: "Key Terms & Big Ideas" };
    }
    return { ...q, deck: migrated };
  });
}

/** Build fresh progress for a given (mapped) BANK */
function freshProgress(MAPPED_BANK) {
  return MAPPED_BANK.reduce((acc, q) => {
    acc[q.id] = { box: 1, nextDue: nowMs(), seen: 0, correct: 0 };
    return acc;
  }, {});
}

/** Merge saved progress with current (mapped) BANK (add new, drop removed) */
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
  // 1) Map the raw bank to the NEW deck taxonomy (pure, stable)
  const BANK = useMemo(() => mapBankToNewDecks(RAW_BANK), []);

  // Dev helper: warn once if anything still looks off
  useEffect(() => {
    const badDecks = Array.from(new Set(BANK.map((q) => q.deck))).filter(
      (d) => !DECKS.includes(d)
    );
    if (badDecks.length) {
      // eslint-disable-next-line no-console
      console.warn("[StoreProvider] Non-canonical decks after migration:", badDecks);
    }
  }, [BANK]);

  // 2) Load saved state (note: version bump → resets if prior key missing)
  const saved = loadJSON(LS_KEY);

  // Normalize selected deck & progress on load using the *mapped* BANK
  const [deck, setDeckState] = useState(normalizeDeckName(saved?.deck));
  const [settings, setSettings] = useState(
    saved?.settings || { quizLength: 10, cramLength: 15 }
  );
  const [progress, setProgress] = useState(reconcileProgress(saved?.progress, BANK));

  // 3) Persist to LocalStorage whenever state changes
  useEffect(() => {
    saveJSON(LS_KEY, { deck, settings, progress });
  }, [deck, settings, progress]);

  // Public setter that auto-normalizes incoming names
  const setDeck = (name) => setDeckState(normalizeDeckName(name));

  const value = useMemo(
    () => ({
      BANK,         // ← already mapped to NEW taxonomy
      DECKS,        // expose canonical decks to the UI
      deck,
      setDeck,
      settings,
      updateSettings: (partial) => setSettings((s) => ({ ...s, ...partial })),
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
