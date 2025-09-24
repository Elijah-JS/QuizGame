// src/components/layout/TopBar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const TinyLink = ({ to, label }) => {
  const { pathname } = useLocation();
  const active = pathname === to || pathname.startsWith(to);
  return (
    <Link
      to={to}
      className={
        "px-3 py-1.5 rounded-full text-xs border transition " +
        (active
          ? "bg-emerald-500/90 border-emerald-400 text-black"
          : "bg-white/5 border-white/10 hover:bg-white/10")
      }
    >
      {label}
    </Link>
  );
};

export default function TopBar() {
  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 md:px-8 h-14">
        <div className="md:hidden text-sm font-semibold">KINE 3050 Study</div>

        {/* mobile quick nav */}
        <div className="md:hidden flex items-center gap-2">
          <TinyLink to="/" label="Hub" />
          <TinyLink to="/flash/learn" label="Learn" />
          <TinyLink to="/flash/quiz" label="Quiz" />
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-zinc-400">
          <span>Study smarter. Pass faster.</span>
        </div>
      </div>
    </div>
  );
}
