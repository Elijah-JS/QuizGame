import React from "react";
import { Link } from "react-router-dom";

const surface =
  "rounded-xl border border-arc-border bg-arc-panel/90 shadow-arc-inset transition-all duration-200";
const btnPrimary =
  "shrink-0 rounded-lg px-3 py-1 text-xs font-medium border border-arc-border-bright/80 bg-arc-panel-soft text-arc-fg group-hover:bg-arc-inset group-hover:border-arc-accent/40 transition motion-safe:group-hover:translate-x-0.5";

const Card = ({ to, title, subtitle }) => (
  <Link
    to={to}
    className={`group block ${surface} hover:border-arc-border-bright/90 hover:shadow-arc-card motion-safe:hover:-translate-y-0.5 p-5`}
  >
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-lg font-semibold tracking-tight font-display text-arc-fg">{title}</div>
        <div className="text-sm text-arc-muted">{subtitle}</div>
      </div>
      <div className={btnPrimary}>Open</div>
    </div>
  </Link>
);

export default function ModeHub() {
  return (
    <div className="grid gap-5 max-w-3xl mx-auto">
      <div className={`${surface} p-5 space-y-2`}>
        <h1 className="text-xl font-semibold tracking-tight font-display text-arc-fg">Study Coach</h1>
        <p className="text-sm text-arc-muted leading-relaxed">
          Import your notes or files, generate flashcards, save decks in this browser, then study
          with Learn, Quiz, Cram, and Scenario from <span className="text-arc-subtle">My decks</span>.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card
          to="/import"
          title="Import material"
          subtitle="Paste text or upload .txt, .pdf, or .docx — processed locally."
        />
        <Card
          to="/decks"
          title="My decks"
          subtitle="Open a deck to study or manage cards."
        />
        <Card
          to="/review"
          title="Review"
          subtitle="Edit generated cards before saving (after import)."
        />
        <Card to="/settings" title="Settings" subtitle="Generation mode, quiz length, progress." />
      </div>

      <p className="text-xs text-arc-dim px-1">
        No built-in course bank — everything you study comes from what you import and save.
      </p>
    </div>
  );
}
