import { WEBLLM_MODEL_HERMES_3B, WEBLLM_MODEL_SMOL } from "./webllmDevConfig";

/** Bounds for user-configurable max WebLLM chunks per import (aligned with StoreProvider). */
export const SETTINGS_MAX_CHUNKS_MIN = 4;
export const SETTINGS_MAX_CHUNKS_MAX = 48;

/**
 * User-selectable WebLLM prebuilt models (must match @mlc-ai/web-llm prebuilt ids).
 * @typedef {{ id: string, name: string, tagline: string, detail: string }} WebLlmModelChoice
 */

/** @type {WebLlmModelChoice[]} */
export const WEBLLM_MODEL_CHOICES = [
  {
    id: WEBLLM_MODEL_SMOL,
    name: "SmolLM2 1.7B Instruct",
    tagline: "Lighter · faster load",
    detail:
      "Smaller download and quicker to initialize. Best when you want snappy iteration or are on modest hardware. Quality ceiling is lower on dense material.",
  },
  {
    id: WEBLLM_MODEL_HERMES_3B,
    name: "Hermes 3 · Llama 3.2 3B",
    tagline: "Stronger · larger download",
    detail:
      "More capable reasoning and phrasing for tougher notes. Uses more memory and time to download and start. Choose when quality matters more than speed.",
  },
];

const ALLOWED = new Set(WEBLLM_MODEL_CHOICES.map((m) => m.id));

/**
 * @param {unknown} raw
 * @returns {string}
 */
export function normalizeWebLlmModelId(raw) {
  const id = typeof raw === "string" ? raw.trim() : "";
  if (ALLOWED.has(id)) return id;
  return WEBLLM_MODEL_SMOL;
}

/**
 * @param {string} id
 * @returns {WebLlmModelChoice | undefined}
 */
export function getWebLlmModelChoice(id) {
  return WEBLLM_MODEL_CHOICES.find((m) => m.id === id);
}
