import {
  createGeneratedItemId,
  GENERATED_ITEM_TYPE_FLASHCARD,
} from "../../domain/generatedStudyItem";
import {
  clampText,
  normalizeSpaces,
  splitHeadingBody,
  stripLeadingBullet,
  looksLikeFormulaChunk,
} from "../studyItemChunkHelpers";

/** @param {string[]} tags @param {string} extra */
function mergeTags(tags, extra) {
  return [...new Set([...(tags || []), extra])];
}

/**
 * @param {{ question: string, answer: string, tags: string[] } | null} r
 * @param {string} extra
 */
function withTag(r, extra) {
  if (!r) return null;
  return { ...r, tags: mergeTags(r.tags, extra) };
}

/** @param {string} chunk */
function difficultyForChunk(chunk) {
  return chunk.length > 220 ? "medium" : "simple";
}

function tryHeadingBody(chunk) {
  const split = splitHeadingBody(chunk);
  if (!split) return null;
  const { heading, body } = split;
  const headShort = heading.length > 90 ? `${heading.slice(0, 87)}…` : heading;
  return {
    question: `Explain this topic: ${headShort}`,
    answer: clampText(body),
    tags: ["heading-body"],
  };
}

function tryTermColon(chunk) {
  const t = normalizeSpaces(chunk);
  const m = t.match(/^([A-Za-z][^:\n]{0,117}):\s+(\S[\s\S]+)$/);
  if (!m) return null;
  const term = m[1].trim();
  let def = m[2].trim();
  if (term.length < 2 || def.length < 3) return null;
  if (/^https?$/i.test(term)) return null;
  const termDisplay = term.replace(/\*+/g, "").trim();
  const td =
    termDisplay.length > 72 ? `${termDisplay.slice(0, 69)}…` : termDisplay;
  return {
    question: `What does "${td}" mean in this context?`,
    answer: clampText(def),
    tags: ["term-definition"],
  };
}

function tryTermDash(chunk) {
  const t = chunk.trim();
  const m = t.match(/^(.{2,100}?)\s[–—]\s+(.+)$/);
  if (!m) return null;
  const left = normalizeSpaces(m[1]).replace(/\*+/g, "").trim();
  const right = normalizeSpaces(m[2]);
  if (left.length < 2 || right.length < 5) return null;
  if (/[.!?]$/.test(left)) return null;
  const td = left.length > 72 ? `${left.slice(0, 69)}…` : left;
  return {
    question: `Define or explain "${td}."`,
    answer: clampText(right),
    tags: ["term-definition"],
  };
}

function tryDefinition(chunk) {
  const t = chunk.trim();
  const patterns = [
    /^(.{2,140}?)\s+refers to\s+(.+)$/i,
    /^(.{2,140}?)\s+means\s+(.+)$/i,
    /^(.{2,140}?)\s+defined as\s+(.+)$/i,
    /^(.{2,140}?)\s+is defined as\s+(.+)$/i,
    /^(.{2,140}?)\s+is known as\s+(.+)$/i,
    /^(.{2,140}?)\s+is also called\s+(.+)$/i,
    /^(.{2,140}?)\s+is called\s+(.+)$/i,
    /^(.{2,140}?)\s+is\s+(.+)$/i,
    /^(.{2,100}?)\s+are\s+(.+)$/i,
  ];

  for (const re of patterns) {
    const m = t.match(re);
    if (!m) continue;
    const left = m[1].trim().replace(/\s+/g, " ");
    const right = m[2].trim().replace(/\s+/g, " ");
    if (left.length < 2 || right.length < 3) continue;
    const subj = left.replace(/^the\s+/i, "");
    const answer = clampText(right);
    return {
      question: `What is ${subj}?`,
      answer,
      tags: ["definition"],
    };
  }
  return null;
}

function tryBulletLeading(chunk) {
  const stripped = stripLeadingBullet(chunk);
  if (stripped === null) return null;
  const inner = normalizeSpaces(stripped);
  return (
    withTag(tryDefinition(inner), "list-item") ||
    withTag(tryTermColon(inner), "list-item") ||
    withTag(tryComparison(inner), "list-item") ||
    withTag(tryProcessSequence(inner), "list-item") ||
    withTag(tryFormula(inner), "list-item") ||
    {
      question: "According to this bullet, what idea should you remember?",
      answer: clampText(inner),
      tags: ["list-item"],
    }
  );
}

function tryComparison(chunk) {
  const t = chunk.trim();
  const vsParts = t.split(/\s+vs\.?\s+/i);
  if (vsParts.length === 2) {
    const a = normalizeSpaces(vsParts[0]).replace(/^the\s+/i, "").trim();
    const bAll = normalizeSpaces(vsParts[1]).trim();
    const bTerm = bAll.split(/\s+/)[0]?.replace(/[.,;:]+$/, "") || "";
    if (
      a.length >= 2 &&
      bTerm.length >= 2 &&
      a.length <= 80 &&
      bTerm.length <= 80 &&
      !/\s/.test(a)
    ) {
      return {
        question: `How do ${a} and ${bTerm} differ—or how are they related?`,
        answer: clampText(t),
        tags: ["comparison"],
      };
    }
    const aPhrase = a.split(/\s+/).slice(0, 3).join(" ");
    const bPhrase = bAll.split(/\s+/).slice(0, 3).join(" ").replace(/[.,;:]+$/, "");
    if (
      aPhrase.length >= 2 &&
      bPhrase.length >= 2 &&
      aPhrase.length <= 84 &&
      bPhrase.length <= 84
    ) {
      return {
        question: `What distinction matters between "${aPhrase}" and "${bPhrase}"?`,
        answer: clampText(t),
        tags: ["comparison"],
      };
    }
  }
  if (/\bwhereas\b/i.test(t)) {
    return {
      question: "What contrast is this note drawing?",
      answer: clampText(t),
      tags: ["comparison"],
    };
  }
  if (/\b(unlike|compared to|in contrast to|rather than)\b/i.test(t)) {
    return {
      question: "What comparison is being made here?",
      answer: clampText(t),
      tags: ["comparison"],
    };
  }
  return null;
}

function tryProcessSequence(chunk) {
  const t = chunk.trim();
  if (/^\d+\.\s+\S/.test(t)) {
    return {
      question: "What step or ordered list is described here?",
      answer: clampText(t),
      tags: ["process"],
    };
  }
  if (/\bfirst\b.*\b(then|next|second|third|finally)\b/i.test(t)) {
    return {
      question: "What sequence of steps or stages is outlined?",
      answer: clampText(t),
      tags: ["sequence"],
    };
  }
  if (/\b(step|phase)\s*(one|two|three|four|\d+)\b/i.test(t)) {
    return {
      question: "What part of a process does this describe?",
      answer: clampText(t),
      tags: ["process"],
    };
  }
  return null;
}

function tryFormula(chunk) {
  if (!looksLikeFormulaChunk(chunk)) return null;
  const t = chunk.trim();
  if (/\$[^$]+\$/.test(t)) {
    return {
      question: "What does this expression say, in plain language?",
      answer: clampText(t),
      tags: ["formula"],
    };
  }
  if (/^[A-Za-z][A-Za-z0-9_{}]*\s*=\s*\S/.test(t)) {
    return {
      question: "What relationship or equation is given here?",
      answer: clampText(t),
      tags: ["equation"],
    };
  }
  return {
    question: "What quantitative or symbolic idea should you take away?",
    answer: clampText(t),
    tags: ["formula"],
  };
}

function tryCauseEffect(chunk) {
  const t = chunk.trim();

  if (/\bbecause\b/i.test(t)) {
    const parts = t.split(/\bbecause\b/i);
    if (parts.length >= 2 && parts[0].trim().length > 8) {
      const head = parts[0].trim();
      const headShort = head.length > 100 ? `${head.slice(0, 97)}…` : head;
      return {
        question: `Why does this hold (or what follows from): "${headShort}"?`,
        answer: clampText(t),
        tags: ["cause-effect"],
      };
    }
  }

  if (/\b(causes|leads to|results in)\b/i.test(t)) {
    return {
      question: "What cause-and-effect link is described?",
      answer: clampText(t),
      tags: ["cause-effect"],
    };
  }

  return null;
}

function tryLocationContext(chunk) {
  const t = chunk.trim();
  if (!/\b(occurs in|in the|at the|on the)\b/i.test(t)) return null;
  return {
    question: "Where does this occur, or in what context does it apply?",
    answer: clampText(t),
    tags: ["context"],
  };
}

function tryMultiSentence(chunk) {
  const t = chunk.trim();
  const parts = t.split(/(?<=[.!?])\s+/).filter((p) => p.trim().length > 0);
  if (parts.length < 2) return null;
  const lead = parts[0].trim();
  if (lead.length > 220 || lead.length < 12) return null;
  const leadShort = lead.length > 110 ? `${lead.slice(0, 107)}…` : lead;
  return {
    question: `The note starts: "${leadShort}" What fuller picture should you recall?`,
    answer: clampText(t),
    tags: ["multi-sentence"],
  };
}

function tryFallback(sourceChunk) {
  return {
    question: "Summarize the key idea you'd want to recall from this note.",
    answer: clampText(sourceChunk),
    tags: ["fallback"],
  };
}

/** @type {Array<(chunk: string) => { question: string, answer: string, tags: string[] } | null>} */
const RULE_PIPELINE = [
  tryHeadingBody,
  tryTermColon,
  tryTermDash,
  tryBulletLeading,
  tryComparison,
  tryProcessSequence,
  tryFormula,
  tryDefinition,
  tryCauseEffect,
  tryLocationContext,
  tryMultiSentence,
];

function pickStudyShape(sourceChunk) {
  for (const rule of RULE_PIPELINE) {
    const r = rule(sourceChunk);
    if (r) return r;
  }
  return tryFallback(sourceChunk);
}

/**
 * One rule-based card for a single chunk (same index as in the original chunk list).
 * @param {unknown} raw
 * @param {number} index
 * @returns {import("../../domain/generatedStudyItem").GeneratedStudyItemV1 | null}
 */
export function buildRuleItemFromChunk(raw, index) {
  const sourceChunk = String(raw).trim();
  if (!sourceChunk) return null;
  const picked = pickStudyShape(sourceChunk);
  return {
    id: createGeneratedItemId(index, sourceChunk),
    type: GENERATED_ITEM_TYPE_FLASHCARD,
    sourceChunk,
    question: picked.question,
    answer: picked.answer,
    difficulty: difficultyForChunk(sourceChunk),
    tags: picked.tags,
  };
}

/**
 * Deterministic flashcards from import chunks (rule-based, no AI).
 * Returns items that still need {@link normalizeGeneratedItems} if consumed from a mixed pipeline.
 *
 * @param {string[]} chunks
 * @returns {import("../../domain/generatedStudyItem").GeneratedStudyItemV1[]}
 */
export function generateWithRules(chunks) {
  if (!Array.isArray(chunks)) return [];

  return /** @type {import("../../domain/generatedStudyItem").GeneratedStudyItemV1[]} */ (
    chunks.map((raw, index) => buildRuleItemFromChunk(raw, index)).filter(Boolean)
  );
}
