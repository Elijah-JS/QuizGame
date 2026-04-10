import React from "react";
import { Link, useLocation } from "react-router-dom";

const TinyLink = ({ to, label }) => {
  const { pathname } = useLocation();
  const active =
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      className={
        "px-2.5 py-1.5 rounded-md text-[11px] sm:text-xs border transition-all duration-200 whitespace-nowrap motion-safe:active:scale-[0.97] " +
        (active
          ? "bg-arc-primary border-arc-primary text-arc-ink font-medium shadow-arc-glow"
          : "bg-arc-panel/80 border-arc-border text-arc-subtle hover:bg-arc-panel-soft hover:text-arc-fg hover:border-arc-border-bright/70")
      }
    >
      {label}
    </Link>
  );
};

export default function TopBar() {
  return (
    <div className="sticky top-0 z-30 border-b border-arc-border bg-arc-elevated/95 backdrop-blur-sm shadow-[0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex flex-col gap-2 px-4 md:px-8 py-3 md:py-0 md:h-14 md:flex-row md:items-center md:justify-between md:gap-3">
        <div className="flex items-center justify-between gap-2 min-w-0">
          <div className="md:hidden text-sm font-semibold font-display truncate text-arc-fg">
            Study Coach
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-arc-muted">
            <span>Your notes → saved decks → study</span>
          </div>
        </div>

        <nav
          className="flex flex-wrap gap-1.5 justify-end md:hidden"
          aria-label="Main navigation"
        >
          <TinyLink to="/" label="Home" />
          <TinyLink to="/import" label="Import" />
          <TinyLink to="/review" label="Review" />
          <TinyLink to="/decks" label="Decks" />
          <TinyLink to="/settings" label="Settings" />
        </nav>
      </div>
    </div>
  );
}
