/**
 * Local-only .docx → plain text (Mammoth). Output feeds {@link ingestText} like PDF/txt.
 * No server: parses Open XML in the browser via JSZip + XML.
 */

/**
 * @param {ArrayBuffer} arrayBuffer
 * @returns {Promise<string>}
 */
export async function extractTextFromDocxArrayBuffer(arrayBuffer) {
  if (!arrayBuffer || arrayBuffer.byteLength === 0) {
    throw new Error("This document appears empty.");
  }

  const mammothMod = await import("mammoth");
  const extractRawText =
    typeof mammothMod.extractRawText === "function"
      ? mammothMod.extractRawText
      : mammothMod.default?.extractRawText;

  if (typeof extractRawText !== "function") {
    throw new Error("Could not load the DOCX converter.");
  }

  let result;
  try {
    result = await extractRawText({ buffer: arrayBuffer });
  } catch {
    throw new Error(
      "Could not read this Word file. It may be corrupted, password-protected, or not a real .docx."
    );
  }

  const text = (result && typeof result.value === "string" ? result.value : "").trim();
  if (!text) {
    throw new Error(
      "No text was found in this document. It might be empty or use a layout we could not read."
    );
  }

  return text;
}
