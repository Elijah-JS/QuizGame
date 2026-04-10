/** Max chars sent to the on-device model per chunk (keep prompts bounded). */
export const AI_CHUNK_PROMPT_MAX_CHARS = 3500;

/**
 * @param {string} sourceChunk
 */
export function buildFlashcardPrompt(sourceChunk) {
  const body = String(sourceChunk).trim().slice(0, AI_CHUNK_PROMPT_MAX_CHARS);
  return `You are helping a student study. Output exactly one JSON object and nothing else. No markdown fences. Use double quotes for all keys and string values.

Required keys:
- "question": a clear, concise flashcard question (one sentence when possible).
- "answer": a direct answer the student should recall (can be a short paragraph).
- "tags": an array of 1 to 4 short lowercase topic words (e.g. ["biology","cell"]).

Base the card only on this excerpt:

---
${body}
---`;
}

/**
 * @param {string} raw
 * @returns {{ question: string, answer: string, tags: string[] } | null}
 */
export function parseAiFlashcardJson(raw) {
  let s = String(raw ?? "").trim();
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) s = fence[1].trim();

  let obj;
  try {
    obj = JSON.parse(s);
  } catch {
    const start = s.indexOf("{");
    const end = s.lastIndexOf("}");
    if (start === -1 || end <= start) return null;
    try {
      obj = JSON.parse(s.slice(start, end + 1));
    } catch {
      return null;
    }
  }

  if (!obj || typeof obj !== "object") return null;
  const question = typeof obj.question === "string" ? obj.question.trim() : "";
  const answer = typeof obj.answer === "string" ? obj.answer.trim() : "";
  const tags = Array.isArray(obj.tags) ? obj.tags.map((t) => String(t).trim()).filter(Boolean) : [];

  if (!question || !answer) return null;
  return { question, answer, tags };
}
