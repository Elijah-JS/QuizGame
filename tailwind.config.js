/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arc: {
          bg: "#06080f",
          elevated: "#0a0d14",
          panel: "#101521",
          "panel-soft": "#141b29",
          inset: "#0b0f18",
          border: "#252d3f",
          "border-bright": "#3d4a63",
          fg: "#e9edf5",
          subtle: "#b6bdd0",
          muted: "#8892a8",
          dim: "#5c6578",
          primary: "#d4a84a",
          "primary-hover": "#e2bc68",
          ink: "#0b0c10",
          accent: "#3eadc1",
          "accent-soft": "rgba(62, 173, 193, 0.12)",
          ok: "#6fd4b4",
          "ok-surface": "#142722",
          "ok-border": "#2a5445",
          bad: "#e8929c",
          "bad-surface": "#251318",
          "bad-border": "#5c2f3a",
          warn: "#d9a85c",
          "warn-surface": "#231e14",
          "warn-border": "#4a3f24",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
        ],
        display: ["Oxanium", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        arc: "0 0 0 1px rgba(255,255,255,0.04), 0 12px 40px -16px rgba(0,0,0,0.65)",
        "arc-glow": "0 0 36px -10px rgba(212, 168, 74, 0.32)",
        "arc-inset": "inset 0 1px 0 0 rgba(255,255,255,0.06)",
        "arc-card": "0 1px 0 rgba(255,255,255,0.05), 0 10px 32px -14px rgba(0,0,0,0.55)",
      },
      keyframes: {
        arcFadeUp: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "arc-in": "arcFadeUp 0.35s ease-out both",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [],
};
