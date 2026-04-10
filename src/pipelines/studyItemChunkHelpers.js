/**
 * Small, explicit helpers for rule-based study item generation (Phase 7A).
 * Keep logic readable for later local-AI handoff.
 */

/** @param {string} s @param {number} [max] */
export function clampText(s, max = 600) {
  const t = String(s);
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

/** @param {string} s */
export function normalizeSpaces(s) {
  return String(s).trim().replace(/\s+/g, " ");
}

/**
 * Strip a single leading markdown heading marker from a line.
 * @param {string} line
 */
export function stripMarkdownHeadingPrefix(line) {
  return String(line).replace(/^#{1,6}\s+/, "").trim();
}

/**
 * If the chunk starts with a bullet marker, return the remainder; else null.
 * @param {string} chunk
 * @returns {string | null}
 */
export function stripLeadingBullet(chunk) {
  const m = String(chunk)
    .trim()
    .match(/^\s*[-*•·]\s+(\S[\s\S]*)$/);
  return m ? m[1].trim() : null;
}

/**
 * Split "title line" + body when there is a clear newline break.
 * @param {string} chunk
 * @returns {{ heading: string, body: string } | null}
 */
export function splitHeadingBody(chunk) {
  const t = String(chunk).trim();
  if (!t.includes("\n")) return null;
  const lines = t
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return null;
  const head = stripMarkdownHeadingPrefix(lines[0]).replace(/\*\*/g, "").trim();
  const body = lines.slice(1).join(" ").trim();
  if (head.length < 3 || head.length > 120) return null;
  if (body.length < 12) return null;
  if (/[.!?]\s*$/.test(head) && head.length > 60) return null;
  return { heading: head, body };
}

/**
 * True if chunk likely carries a symbolic / equation-style relationship.
 * @param {string} chunk
 */
export function looksLikeFormulaChunk(chunk) {
  const t = String(chunk);
  if (/\$[^$]{1,120}\$/.test(t)) return true;
  if (/[\u221A\u2264\u2265\u00B1\u00D7\u00F7\u2192\u221E\u2248\u2260\u03B1-\u03C9\u0391-\u03A9]/.test(t))
    return true;
  if (/^[A-Za-z][A-Za-z0-9_{}]*\s*=\s*\S/.test(t.trim()) && t.length <= 280) return true;
  if (/\b\d+\s*\+\s*\d+\s*=\s*\d+/.test(t)) return true;
  return false;
}
