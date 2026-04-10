/**
 * Local-only PDF text extraction (Mozilla PDF.js).
 * Output is plain text → feed through {@link ingestText} / {@link cleanText} like pasted text.
 */

/**
 * Pull plain text from all pages. No OCR — image-only PDFs yield empty or minimal text.
 *
 * @param {ArrayBuffer} arrayBuffer
 * @returns {Promise<string>}
 */
export async function extractTextFromPdfArrayBuffer(arrayBuffer) {
  if (!arrayBuffer || arrayBuffer.byteLength === 0) {
    throw new Error("This PDF file appears empty.");
  }

  const { getDocument } = await import("pdfjs-dist/webpack.mjs");

  let pdf;
  try {
    pdf = await getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
    }).promise;
  } catch {
    throw new Error(
      "Could not read this PDF. It may be corrupted, encrypted, or not a valid PDF."
    );
  }

  const parts = [];
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const line = content.items
      .map((item) => ("str" in item && item.str ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (line) parts.push(line);
  }

  const text = parts.join("\n\n").trim();
  if (!text) {
    throw new Error(
      "No text found in this PDF. Scanned or image-only documents are not supported without OCR."
    );
  }

  return text;
}
