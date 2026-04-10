import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, label, icon }) => {
  const { pathname } = useLocation();
  const active =
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      className={
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 border motion-safe:active:scale-[0.98] " +
        (active
          ? "bg-arc-panel-soft border-arc-border-bright text-arc-fg shadow-arc-inset"
          : "bg-arc-panel/60 border-arc-border text-arc-subtle hover:bg-arc-panel-soft hover:text-arc-fg hover:border-arc-border-bright/80")
      }
      title={label}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col gap-4 border-r border-arc-border bg-arc-elevated p-4 sticky top-0 h-screen">
      <div className="px-2 pt-2 pb-1">
        <div className="text-lg font-semibold tracking-tight font-display text-arc-fg">
          Study Coach
        </div>
        <div className="text-[11px] text-arc-muted">Import · Save · Study locally</div>
      </div>

      <nav className="flex flex-col gap-2">
        {[
          ["/", "Home", 0x1f3e0],
          ["/import", "Import", 0x1f4cb],
          ["/review", "Review", 0x270f],
          ["/decks", "My decks", 0x1f4da],
          ["/settings", "Settings", 0x2699],
        ].map(([to, label, cp]) => (
          <NavItem
            key={to}
            to={to}
            label={label}
            icon={
              label === "Settings"
                ? String.fromCodePoint(0x2699, 0xfe0f)
                : String.fromCodePoint(cp)
            }
          />
        ))}
      </nav>

      <div className="mt-2 p-3 rounded-lg border border-arc-border bg-arc-panel/80 text-[11px] text-arc-muted leading-relaxed shadow-arc-inset">
        Study modes (Learn, Quiz, Cram, Scenario) open from each saved deck&apos;s detail page.
      </div>

      <div className="mt-auto text-[11px] text-arc-dim px-2 pb-3">
        Local-first • This browser only
      </div>
    </aside>
  );
}
