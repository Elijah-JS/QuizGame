/**
 * Planning stage before card generation:
 * 1) analyzeDocument: build concept candidates from chunks
 * 2) planStudyDeck: rank, budget, dedupe/compress
 *
 * Output is a reduced ordered list of generation units (not one chunk = one card).
 */

function clean(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

function splitWords(s) {
  return clean(s)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3);
}

function isLikelyHeading(s) {
  const t = clean(s);
  if (!t) return false;
  if (t.length > 96) return false;
  const words = t.split(/\s+/);
  if (words.length > 10) return false;
  if (/[.!?]$/.test(t)) return false;
  return /^[A-Z0-9][A-Za-z0-9/,&()\-:\s]+$/.test(t);
}

function looksDefinition(s) {
  return /\b(is|are|refers to|defined as|means|is called)\b/i.test(s);
}
function looksProcess(s) {
  return /\b(first|second|third|step|phase|then|next|finally|procedure)\b/i.test(s);
}
function looksComparison(s) {
  return /\b(vs\.?|versus|compared to|whereas|in contrast)\b/i.test(s);
}
function looksFormula(s) {
  return /[=+\-/*^<>]/.test(s) && /\d/.test(s);
}

/**
 * @param {string[]} chunks
 */
export function analyzeDocument(chunks) {
  const rows = Array.isArray(chunks)
    ? chunks.map((c, i) => ({ i, text: clean(c) })).filter((x) => x.text)
    : [];

  /** @type {Map<string, { key: string, topic: string, chunkIds: number[], evidence: string[], signals: { definition: number, process: number, comparison: number, formula: number, heading: number }, score: number }>} */
  const conceptMap = new Map();

  let currentTopic = "general";
  for (const row of rows) {
    const text = row.text;
    if (isLikelyHeading(text)) currentTopic = text;

    const words = splitWords(text).slice(0, 10);
    const lexicalKey = words.slice(0, 4).join("_") || `row_${row.i}`;
    const key = `${currentTopic.toLowerCase()}::${lexicalKey}`;

    const prev = conceptMap.get(key) || {
      key,
      topic: currentTopic,
      chunkIds: [],
      evidence: [],
      signals: { definition: 0, process: 0, comparison: 0, formula: 0, heading: 0 },
      score: 0,
    };
    prev.chunkIds.push(row.i);
    if (prev.evidence.length < 3) prev.evidence.push(text);

    const sDef = looksDefinition(text) ? 1 : 0;
    const sProc = looksProcess(text) ? 1 : 0;
    const sComp = looksComparison(text) ? 1 : 0;
    const sFor = looksFormula(text) ? 1 : 0;
    const sHead = isLikelyHeading(text) ? 1 : 0;
    prev.signals.definition += sDef;
    prev.signals.process += sProc;
    prev.signals.comparison += sComp;
    prev.signals.formula += sFor;
    prev.signals.heading += sHead;

    prev.score +=
      1 +
      sDef * 2.4 +
      sProc * 2.0 +
      sComp * 1.8 +
      sFor * 2.1 +
      sHead * 1.2 +
      Math.min(1.6, text.length / 420);

    conceptMap.set(key, prev);
  }

  const concepts = Array.from(conceptMap.values()).sort((a, b) => b.score - a.score);
  const topics = Array.from(new Set(concepts.map((c) => c.topic)));
  return {
    totalChunks: rows.length,
    topics,
    concepts,
  };
}

function computeDeckBudget(totalChunks) {
  if (totalChunks <= 0) return 0;
  // Concise by default: grows sublinearly and is hard-capped.
  const base = Math.round(Math.sqrt(totalChunks) * 6 + 12);
  return Math.max(12, Math.min(96, base));
}

function importanceFromRank(rank, n) {
  if (n <= 1) return "essential";
  const q = rank / n;
  if (q < 0.35) return "essential";
  if (q < 0.75) return "important";
  return "minor";
}

function fingerprint(s) {
  const words = splitWords(s);
  return words.slice(0, 8).join(" ");
}

/**
 * @param {ReturnType<typeof analyzeDocument>} analysis
 */
export function planStudyDeck(analysis) {
  const concepts = Array.isArray(analysis?.concepts) ? analysis.concepts : [];
  const budget = computeDeckBudget(analysis?.totalChunks || 0);
  if (concepts.length === 0 || budget <= 0) {
    return {
      budget,
      concepts: [],
      plannedUnits: [],
      droppedMinorCount: 0,
    };
  }

  const ranked = concepts.map((c, idx) => ({
    ...c,
    importance: importanceFromRank(idx, concepts.length),
  }));

  const essentials = ranked.filter((c) => c.importance === "essential");
  const importants = ranked.filter((c) => c.importance === "important");
  const selected = [...essentials];
  const remaining = Math.max(0, budget - selected.length);
  selected.push(...importants.slice(0, remaining));

  const seen = new Set();
  /** @type {{ sourceChunk: string, conceptKey: string, importance: "essential"|"important"|"minor", topic: string, score: number, originalChunkIds: number[] }[]} */
  const plannedUnits = [];
  for (const c of selected) {
    const merged = clean(c.evidence.join(" "));
    const fp = fingerprint(merged);
    if (!fp || seen.has(fp)) continue;
    seen.add(fp);
    plannedUnits.push({
      sourceChunk: merged,
      conceptKey: c.key,
      importance: c.importance,
      topic: c.topic,
      score: c.score,
      originalChunkIds: [...c.chunkIds].sort((a, b) => a - b),
    });
    if (plannedUnits.length >= budget) break;
  }

  return {
    budget,
    concepts: ranked,
    plannedUnits,
    droppedMinorCount: ranked.filter((c) => c.importance === "minor").length,
  };
}

/**
 * End-to-end planner helper used by generation.
 * @param {string[]} chunks
 * @param {{ onStage?: (stage: "analyzing"|"planning") => void }} [opts]
 */
export function buildGenerationPlan(chunks, opts = {}) {
  opts.onStage?.("analyzing");
  const analysis = analyzeDocument(chunks);
  opts.onStage?.("planning");
  const plan = planStudyDeck(analysis);
  return {
    ...plan,
    analysis,
    plannedChunks: plan.plannedUnits.map((u) => u.sourceChunk).filter(Boolean),
  };
}
