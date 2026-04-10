import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ingestText } from "../../pipelines/ingest";
import { generateStudyItems } from "../../pipelines/generateStudyItems";
import { suggestDeckTitle } from "../../pipelines/suggestDeckTitle";
import { useStore } from "../../providers/StoreProvider";
import TextPasteInput from "./TextPasteInput";
import FileUploader from "./FileUploader";
import GenerationPipeline from "./GenerationPipeline";

export default function ImportPage() {
  const navigate = useNavigate();
  const { settings } = useStore();
  const [text, setText] = useState("");
  const [lastFileName, setLastFileName] = useState(null);
  const [confirmBusy, setConfirmBusy] = useState(false);
  const [confirmError, setConfirmError] = useState(null);
  const [pipelineKey, setPipelineKey] = useState(null);
  const [pipelineDetail, setPipelineDetail] = useState(null);

  const generationMode = settings.generationMode || "rules";
  const isAiGeneration = generationMode === "local-ai" || generationMode === "hybrid";

  const handlePasteChange = useCallback((value) => {
    setText(value);
    setLastFileName(null);
    setConfirmError(null);
  }, []);

  const handleFileLoaded = useCallback((fileText, fileName) => {
    setText(fileText);
    setLastFileName(fileName || null);
    setConfirmError(null);
  }, []);

  const handleGenerate = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setConfirmBusy(true);
    setConfirmError(null);
    setPipelineDetail(null);
    setPipelineKey("reading");

    try {
      const out = ingestText(trimmed);
      if (!out.chunks?.length) {
        setConfirmError("We couldn’t read usable text from this material. Try a different file or paste.");
        setPipelineKey(null);
        return;
      }

      const items = await generateStudyItems(out.chunks, {
        mode: generationMode,
        onGenerationStage: (stage) => {
          setPipelineKey(stage);
          if (stage !== "generating") setPipelineDetail(null);
        },
        localAIOptions: isAiGeneration
          ? {
              modelId: settings.webLlmModelId,
              maxChunks: settings.maxChunksForAi,
              onWebLlmInitProgress: (report) => {
                const pct = Math.round((report.progress ?? 0) * 100);
                setPipelineDetail(
                  report.text ? `${report.text} (${pct}%)` : `Preparing on-device model… ${pct}%`
                );
              },
              onWebLlmEvent: (ev) => {
                setPipelineDetail(ev.message);
              },
            }
          : {},
      });

      if (!items.length) {
        setConfirmError("No cards were produced. Try different material or adjust generation in Settings.");
        setPipelineKey(null);
        return;
      }

      const suggestedTitle = suggestDeckTitle(trimmed, lastFileName);
      navigate("/review", {
        state: {
          items,
          suggestedTitle,
          cardCount: items.length,
        },
      });
    } catch {
      setConfirmError("Something went wrong while building your deck. You can try again or switch mode in Settings.");
    } finally {
      setConfirmBusy(false);
      setPipelineKey(null);
      setPipelineDetail(null);
    }
  }, [
    text,
    lastFileName,
    navigate,
    generationMode,
    isAiGeneration,
    settings.webLlmModelId,
    settings.maxChunksForAi,
  ]);

  const clearAll = useCallback(() => {
    setText("");
    setLastFileName(null);
    setConfirmError(null);
  }, []);

  const hasText = text.trim().length > 0;
  const showPipeline = confirmBusy && pipelineKey;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <header className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-arc-muted font-display">
          Import
        </p>
        <h1 className="text-2xl sm:text-[1.65rem] font-semibold tracking-tight font-display text-arc-fg leading-tight">
          Build a study deck from your notes
        </h1>
        <p className="text-sm text-arc-muted leading-relaxed max-w-xl">
          Paste or upload material. Everything runs locally in your browser — then you review, name
          your deck, and save it to{" "}
          <Link
            to="/decks"
            className="text-arc-subtle hover:text-arc-fg underline underline-offset-4 decoration-arc-border-bright"
          >
            My decks
          </Link>
          .
        </p>
      </header>

      <div className="rounded-2xl border border-arc-border/90 bg-arc-panel/50 p-5 sm:p-6 space-y-6 shadow-arc-inset">
        <TextPasteInput value={text} onChange={handlePasteChange} disabled={confirmBusy} />
        <div className="relative">
          <div
            className="absolute inset-x-0 top-0 flex items-center gap-3"
            aria-hidden
          >
            <div className="h-px flex-1 bg-arc-border" />
            <span className="text-[11px] uppercase tracking-wider text-arc-dim font-display">or</span>
            <div className="h-px flex-1 bg-arc-border" />
          </div>
          <div className="pt-8">
            <FileUploader onTextLoaded={handleFileLoaded} disabled={confirmBusy} />
          </div>
        </div>

        {lastFileName ? (
          <p className="text-xs text-arc-muted">
            Loaded <span className="text-arc-subtle">{lastFileName}</span>
          </p>
        ) : null}

        <div className="flex flex-col-reverse sm:flex-row sm:flex-wrap gap-3 pt-1">
          <button
            type="button"
            onClick={clearAll}
            disabled={confirmBusy || !hasText}
            className="inline-flex justify-center min-h-[48px] items-center px-5 rounded-xl text-sm font-medium border border-arc-border-bright bg-arc-inset text-arc-subtle hover:bg-arc-panel-soft hover:text-arc-fg transition-all duration-200 disabled:opacity-35 motion-safe:active:scale-[0.98]"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => void handleGenerate()}
            disabled={!hasText || confirmBusy}
            className="inline-flex flex-1 sm:flex-none justify-center min-h-[48px] items-center gap-2 px-6 rounded-xl text-sm font-semibold bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition-all duration-200 disabled:opacity-40 shadow-arc-glow motion-safe:active:scale-[0.98]"
          >
            {confirmBusy ? (
              <>
                <span
                  className="inline-block size-4 border-2 border-arc-ink/25 border-t-arc-ink rounded-full animate-spin shrink-0"
                  aria-hidden
                />
                Working…
              </>
            ) : (
              "Generate study deck"
            )}
          </button>
        </div>

        <p className="text-[11px] text-arc-dim leading-relaxed">
          Generation style:{" "}
          <span className="text-arc-muted">
            {generationMode === "rules" && "Rules"}
            {generationMode === "local-ai" && "Local AI"}
            {generationMode === "hybrid" && "Hybrid"}
          </span>
          . Change in{" "}
          <Link to="/settings" className="text-arc-muted hover:text-arc-subtle underline underline-offset-2">
            Settings
          </Link>
          .
        </p>
      </div>

      {showPipeline ? (
        <GenerationPipeline activeKey={pipelineKey} detail={pipelineDetail} />
      ) : null}

      {confirmError ? (
        <p
          className="text-sm text-arc-bad rounded-xl border border-arc-bad-border bg-arc-bad-surface/80 px-4 py-3"
          role="alert"
        >
          {confirmError}
        </p>
      ) : null}
    </div>
  );
}
