/**
 * Local-first text ingest: normalize, chunk by sentences (with line-based fallback).
 * No network, no AI, no persistence.
 *
 * PDFs and Word .docx files are converted to plain text in the browser first
 * ({@link extractTextFromPdfArrayBuffer}, {@link extractTextFromDocxArrayBuffer}),
 * then passed through {@link ingestText} like paste or .txt uploads.
 */

/**
 * Normalize whitespace and line endings. Does not remove intentional paragraph breaks.
 * @param {unknown} rawText
 * @returns {string}
 */
export function cleanText(rawText) {
  if (rawText == null) return "";
  return String(rawText)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[\t\f\v]+/g, " ")
    .replace(/ +/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Split into sentence-like chunks; drop empties. Falls back to non-empty lines if no clear sentences.
 * @param {string} cleanedText
 * @returns {string[]}
 */
export function chunkText(cleanedText) {
  if (!cleanedText) return [];

  const trimmed = cleanedText.trim();
  if (!trimmed) return [];

  const bySentence = trimmed
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (bySentence.length > 1) return bySentence;

  const byLine = trimmed
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (byLine.length > 1) return byLine;
  if (byLine.length === 1) return byLine;

  return [trimmed];
}

/**
 * Full ingest: clean then chunk.
 * @param {unknown} rawText
 * @returns {{ cleanedText: string, chunks: string[], chunkCount: number }}
 */
export function ingestText(rawText) {
  const cleanedText = cleanText(rawText);
  const chunks = chunkText(cleanedText);
  return {
    cleanedText,
    chunks,
    chunkCount: chunks.length,
  };
}
