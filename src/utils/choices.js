// src/utils/choices.js
import { shuffle } from "./shuffle";

/** Extract the "correct" text for any card. */
export function getCorrectText(card) {
  if (!card) return "";
  if (card.type === "tf") return card.answerBool ? "True" : "False";
  if (card.type === "mc" && Array.isArray(card.options)) {
    return card.options?.[card.answerIndex] ?? "";
  }
  return (card.expected || "").toString();
}

// Topic keyword → curated distractors (short, plausible, but wrong)
const TOPIC_DISTRACTORS = [
  {
    keys: ["autism", "autistic", "sensory", "noise"],
    items: [
      "Punish stimming behaviors",
      "Increase background noise to desensitize",
      "Force eye contact throughout activity",
      "Ignore sensory breaks",
      "Remove all routines and visuals",
    ],
  },
  {
    keys: ["diabetes"],
    items: [
      "Skip pre-activity snack",
      "Add unplanned high-intensity intervals",
      "Never check blood glucose around activity",
      "Avoid carrying fast-acting carbs",
    ],
  },
  {
    keys: ["cardio", "cardiovascular", "hypertension", "heart"],
    items: [
      "Maximal testing session day one",
      "Sustained heavy isometrics",
      "No warm-up or cool-down",
      "Hold breath during lifts (Valsalva)",
    ],
  },
  {
    keys: ["ms", "multiple sclerosis"],
    items: [
      "Exercise in a hot gym without cooling",
      "Long, continuous bouts without breaks",
      "Avoid hydration to reduce bathroom trips",
      "Schedule mid-afternoon in peak fatigue",
    ],
  },
  {
    keys: ["blind", "visual", "visually impaired"],
    items: [
      "Start with free weights without orientation",
      "No tactile or auditory cues",
      "Randomize equipment placement daily",
      "Spotter stands silent and far away",
    ],
  },
];

// Generic last-resort distractors
const GENERIC_DISTRACTORS = [
  "Ignore symptoms and continue",
  "Increase intensity immediately",
  "One-size-fits-all program",
  "No modifications/controls needed",
  "Delay communication with caregivers",
  "Skip safety briefing",
];

function topicMatches(prompt = "", topic) {
  const p = prompt.toLowerCase();
  return topic.keys.some((k) => p.includes(k));
}

/**
 * Build MC choices for a recall/malformed card.
 * Always returns 3–4 options (correct + 2–3 distractors) if at all possible.
 */
export function buildMCFromRecall(card, pool, targetChoices = 4) {
  const correct = getCorrectText(card)?.trim();
  if (!correct) return null;

  // 1) Pull candidate distractors from other cards' correct texts
  const fromPool = [];
  for (const c of pool) {
    const txt = getCorrectText(c)?.trim();
    if (!txt) continue;
    if (txt.toLowerCase() === correct.toLowerCase()) continue;
    fromPool.push(txt);
  }

  // 2) Add topic-specific distractors if needed
  const topical = TOPIC_DISTRACTORS.find((t) => topicMatches(card.prompt, t));
  const topicAdds = topical ? topical.items : [];

  // 3) Add generic if still short
  const candidates = Array.from(new Set([...fromPool, ...topicAdds, ...GENERIC_DISTRACTORS]))
    .filter((t) => t && t.length >= 3 && t.length <= 160 && t.toLowerCase() !== correct.toLowerCase());

  // Pick distractors (prefer more choices, but allow 2 if that’s all we can build)
  const need = Math.max(2, Math.min(targetChoices - 1, candidates.length));
  if (need < 2) {
    // still not enough to make MC reasonably
    return null;
  }

  const distractors = shuffle(candidates).slice(0, need);
  const options = shuffle([correct, ...distractors]);
  const answerIndex = options.findIndex((t) => t === correct);

  return { options, answerIndex };
}
