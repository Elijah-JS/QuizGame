import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 space-y-4">
      <h1 className="text-4xl font-bold font-display text-arc-fg tracking-tight">404</h1>
      <p className="text-lg text-arc-muted">
        The page you’re looking for doesn’t exist.
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        <Link
          to="/"
          className="inline-flex px-4 py-2 rounded-lg text-sm font-medium bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition shadow-arc-glow"
        >
          Home
        </Link>
        <Link
          to="/decks"
          className="inline-flex px-4 py-2 rounded-lg text-sm border border-arc-border-bright bg-arc-panel-soft text-arc-subtle hover:bg-arc-inset transition"
        >
          My decks
        </Link>
      </div>
    </div>
  );
}
