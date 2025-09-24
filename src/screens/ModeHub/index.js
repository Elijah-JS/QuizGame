// src/screens/ModeHub/index.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreProvider";

const Card = ({ to, title, subtitle }) => (
  <Link
    to={to}
    className="group block rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition shadow-lg shadow-black/20 p-5"
  >
    <div className="flex items-center justify-between">
      <div>
        <div className="text-lg font-semibold tracking-tight">{title}</div>
        <div className="text-sm text-zinc-300/90">{subtitle}</div>
      </div>
      <div
        className="shrink-0 rounded-xl px-3 py-1 text-xs border border-emerald-400/30 text-emerald-300 bg-emerald-500/10
                   group-hover:bg-emerald-500/20 transition"
      >
        Start
      </div>
    </div>
  </Link>
);

export default function ModeHub() {
  const { deck } = useStore();

  return (
    <div className="grid gap-5">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="text-sm text-zinc-300/90">
          Current deck: <span className="font-medium text-white">{deck}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Card
          to="/flash/learn"
          title="Flashcards: Learn"
          subtitle="Spaced repetition to master terms quickly."
        />
        <Card
          to="/flash/quiz"
          title="Flashcards: Quiz"
          subtitle="Timed MCQ / T-F with explanations."
        />
        <Card
          to="/scenario/practice"
          title="Scenario Practice"
          subtitle="Apply concepts to short real-world cases."
        />
        <Card
          to="/cram"
          title="Cram Mode"
          subtitle="Rapid-fire review for last-minute refresh."
        />
      </div>

      <div className="flex gap-3">
        <Link
          to="/settings"
          className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] transition"
        >
          Settings
        </Link>
      </div>
    </div>
  );
}
