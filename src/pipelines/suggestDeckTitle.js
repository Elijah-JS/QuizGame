import { cleanText } from "./ingest";

const MAX_LEN = 56;

function truncateTitle(s) {
  const t = String(s).replace(/\s+/g, " ").trim();
  if (t.length <= MAX_LEN) return t;
  return `${t.slice(0, MAX_LEN - 1).trim()}…`;
}

function stripExtension(name) {
  return String(name || "")
    .replace(/[\\/:*?"<>|]+/g, "")
    .replace(/\.[^.]+$/, "")
    .replace(/[_]+/g, " ")
    .replace(/[-]+/g, " ")
    .trim();
}

function looksLikeHeading(line) {
  const t = line.trim();
  if (t.length < 6 || t.length > 88) return false;
  if (/^https?:\/\//i.test(t)) return false;
  if (/^[0-9]+\s*[).]\s+/.test(t)) return true;
  if (/^#{1,3}\s+\S/.test(t)) return true;
  const words = t.split(/\s+/);
  if (words.length > 14) return false;
  if (/[.!?]$/.test(t) && words.length > 10) return false;
  return true;
}

/**
 * Suggest a deck title from cleaned material and optional original filename (user may edit later).
 * @param {unknown} rawText
 * @param {string | null} [fileBaseName]
 * @returns {string}
 */
export function suggestDeckTitle(rawText, fileBaseName) {
  const cleaned = cleanText(rawText);
  const fromFile = stripExtension(fileBaseName);
  if (fromFile.length >= 2 && fromFile.length <= 96) {
    return truncateTitle(fromFile);
  }

  const lines = cleaned
    .split(/\n/)
    .map((l) => l.replace(/^#+\s*/, "").trim())
    .filter(Boolean);

  for (const line of lines.slice(0, 20)) {
    if (looksLikeHeading(line)) {
      return truncateTitle(line);
    }
  }

  const first = lines[0];
  if (first && first.length >= 6 && first.length <= 120) {
    return truncateTitle(first);
  }

  return "Study deck";
}
