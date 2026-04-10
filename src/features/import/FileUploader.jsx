import React, { useRef, useState } from "react";
import { extractTextFromPdfArrayBuffer } from "../../pipelines/extractPdfText";
import { extractTextFromDocxArrayBuffer } from "../../pipelines/extractDocxText";

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const ACCEPT = [".txt", ".pdf", ".docx", "text/plain", "application/pdf", DOCX_MIME].join(",");

/** ~32 MiB — keeps extraction responsive in the browser. */
const MAX_BINARY_BYTES = 32 * 1024 * 1024;

/**
 * @param {(text: string, fileName: string) => void} onTextLoaded
 */
export default function FileUploader({ onTextLoaded, disabled }) {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [busy, setBusy] = useState(false);
  /** @type {"pdf"|"docx"|null} */
  const [busyKind, setBusyKind] = useState(null);

  const pickFile = () => {
    setError(null);
    inputRef.current?.click();
  };

  const loadBinaryAndExtract = (file, kind, extractFn) => {
    if (file.size > MAX_BINARY_BYTES) {
      setError(
        `This file is too large (${Math.round(file.size / (1024 * 1024))} MB). Try a file under 32 MB or paste text instead.`
      );
      setLastName(null);
      return;
    }
    setBusy(true);
    setBusyKind(kind);
    setError(null);
    setLastName(null);
    const reader = new FileReader();
    reader.onload = async () => {
      const buf = reader.result;
      if (!(buf instanceof ArrayBuffer)) {
        setBusy(false);
        setBusyKind(null);
        setError("Could not read this file into memory.");
        return;
      }
      try {
        const text = await extractFn(buf);
        setLastName(file.name);
        setError(null);
        onTextLoaded(text, file.name);
      } catch (err) {
        setLastName(null);
        setError(
          err instanceof Error ? err.message : "Could not extract text from this file."
        );
      } finally {
        setBusy(false);
        setBusyKind(null);
      }
    };
    reader.onerror = () => {
      setBusy(false);
      setBusyKind(null);
      setError("Could not read that file.");
      setLastName(null);
    };
    reader.readAsArrayBuffer(file);
  };

  const onChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const name = file.name || "";
    const lower = name.toLowerCase();
    const isDocx = lower.endsWith(".docx") || file.type === DOCX_MIME;
    const isPdf = lower.endsWith(".pdf") || file.type === "application/pdf";
    const isTxtOnly =
      lower.endsWith(".txt") ||
      file.type === "text/plain" ||
      (file.type === "" && !lower.endsWith(".pdf") && !lower.endsWith(".docx"));

    if (!isDocx && !isPdf && !isTxtOnly) {
      setError("Please choose a .txt, .pdf, or .docx file.");
      setLastName(null);
      return;
    }

    if (isDocx) {
      loadBinaryAndExtract(file, "docx", extractTextFromDocxArrayBuffer);
      return;
    }

    if (isPdf) {
      loadBinaryAndExtract(file, "pdf", extractTextFromPdfArrayBuffer);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setError(null);
      setLastName(file.name);
      onTextLoaded(text, file.name);
    };
    reader.onerror = () => {
      setError("Could not read that file.");
      setLastName(null);
    };
    reader.readAsText(file, "UTF-8");
  };

  const busyLabel =
    busyKind === "pdf" ? "Extracting PDF…" : busyKind === "docx" ? "Extracting Word document…" : "Working…";

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-arc-subtle block">Upload file</span>
      <p className="text-xs text-arc-muted">
        <span className="text-arc-subtle">.txt</span>, <span className="text-arc-subtle">.pdf</span>, or{" "}
        <span className="text-arc-subtle">.docx</span> — processed only in your browser (nothing is
        uploaded to a server).
      </p>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={onChange}
        disabled={disabled || busy}
        aria-label="Choose a text, PDF, or Word file"
      />
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={pickFile}
          disabled={disabled || busy}
          className="inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-arc-panel-soft border border-arc-border-bright text-arc-fg
            hover:bg-arc-inset transition-all duration-200 disabled:opacity-50 min-h-[44px] motion-safe:active:scale-[0.98]"
        >
          {busy ? (
            <>
              <span
                className="inline-block size-4 border-2 border-arc-border border-t-arc-accent rounded-full animate-spin shrink-0"
                aria-hidden
              />
              {busyLabel}
            </>
          ) : (
            "Choose .txt, .pdf, or .docx"
          )}
        </button>
        {lastName && !busy && (
          <span className="text-xs text-arc-muted truncate max-w-full sm:max-w-[min(100%,18rem)]" title={lastName}>
            Loaded: {lastName}
          </span>
        )}
      </div>
      {error && (
        <div
          className="rounded-lg border border-arc-bad-border bg-arc-bad-surface/70 px-3 py-2 text-xs text-arc-bad space-y-1"
          role="alert"
        >
          <p>{error}</p>
          <p className="text-arc-bad/90">
            Try another file, or paste the text below if the file is protected, scanned, or not
            supported.
          </p>
        </div>
      )}
    </div>
  );
}
