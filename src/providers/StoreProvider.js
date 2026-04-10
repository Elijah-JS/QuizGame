import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STUDY_COACH_STORAGE_KEY } from "../domain/persistence";
import { webllmDevConfig } from "../config/webllmDevConfig";
import {
  normalizeWebLlmModelId,
  SETTINGS_MAX_CHUNKS_MAX,
  SETTINGS_MAX_CHUNKS_MIN,
} from "../config/webLlmModels";
import { loadJSON, saveJSON } from "../shared/utils/storage";

const StoreContext = createContext(null);

function clampMaxChunks(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return webllmDevConfig.maxChunksForAi;
  const rounded = Math.round(n);
  return Math.min(SETTINGS_MAX_CHUNKS_MAX, Math.max(SETTINGS_MAX_CHUNKS_MIN, rounded));
}

export function StoreProvider({ children }) {
  const saved = loadJSON(STUDY_COACH_STORAGE_KEY);

  const [settings, setSettings] = useState(() => {
    const s = saved?.settings;
    const base = {
      quizLength: 10,
      cramLength: 15,
      generationMode: "rules",
      webLlmModelId: normalizeWebLlmModelId(null),
      maxChunksForAi: webllmDevConfig.maxChunksForAi,
    };
    if (!s || typeof s !== "object") return base;
    const mode =
      s.generationMode === "local-ai" || s.generationMode === "hybrid" || s.generationMode === "rules"
        ? s.generationMode
        : "rules";
    return {
      quizLength: typeof s.quizLength === "number" ? s.quizLength : base.quizLength,
      cramLength: typeof s.cramLength === "number" ? s.cramLength : base.cramLength,
      generationMode: mode,
      webLlmModelId: normalizeWebLlmModelId(s.webLlmModelId),
      maxChunksForAi: clampMaxChunks(s.maxChunksForAi),
    };
  });

  useEffect(() => {
    saveJSON(STUDY_COACH_STORAGE_KEY, { settings });
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      updateSettings: (partial) =>
        setSettings((s) => {
          const next = { ...s, ...partial };
          if (partial.webLlmModelId !== undefined) {
            next.webLlmModelId = normalizeWebLlmModelId(partial.webLlmModelId);
          }
          if (partial.maxChunksForAi !== undefined) {
            next.maxChunksForAi = clampMaxChunks(partial.maxChunksForAi);
          }
          return next;
        }),
    }),
    [settings]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
