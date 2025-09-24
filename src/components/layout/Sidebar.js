// src/components/layout/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../../context/StoreProvider";

const NavItem = ({ to, label, icon }) => {
  const { pathname } = useLocation();
  const active = pathname === to || pathname.startsWith(to);
  return (
    <Link
      to={to}
      className={
        "flex items-center gap-3 px-3 py-2 rounded-xl transition border " +
        (active
          ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-200"
          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.08]")
      }
      title={label}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  const { deck, setDeck, DECKS } = useStore();

  return (
    <aside className="hidden md:flex flex-col gap-4 border-r border-white/10 bg-black/30 backdrop-blur-xl p-4 sticky top-0 h-screen">
      {/* Brand */}
      <div className="px-2 pt-2 pb-1">
        <div className="text-lg font-semibold tracking-tight">KINE 3050 Study</div>
        <div className="text-[11px] text-zinc-400">Flashcards • Scenarios • Cram</div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2">
        <NavItem to="/" label="Hub" icon="🏠" />
        <NavItem to="/flash/learn" label="Learn" icon="🧠" />
        <NavItem to="/flash/quiz" label="Quiz" icon="📝" />
        <NavItem to="/scenario/practice" label="Scenario" icon="🎯" />
        <NavItem to="/cram" label="Cram" icon="⚡" />
        <NavItem to="/settings" label="Settings" icon="⚙️" />
      </nav>

      {/* Deck select (modern dark dropdown) */}
      <div className="mt-2 p-3 rounded-xl border border-white/10 bg-white/[0.03]">
        <div className="text-xs mb-1 text-zinc-400">Deck</div>

        <div className="relative">
          <select
            value={deck}
            onChange={(e) => setDeck(e.target.value)}
            className="w-full appearance-none rounded-lg bg-zinc-900/80 border border-white/10 text-sm text-white py-2 pl-3 pr-8
                       hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 transition-colors"
          >
            {DECKS.map((d) => (
              <option key={d} value={d} className="bg-zinc-900 text-white">
                {d}
              </option>
            ))}
          </select>

          {/* Chevron */}
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-auto text-[11px] text-zinc-500 px-2 pb-3">
        v1 • LocalStorage • Front-end only
      </div>
    </aside>
  );
}
