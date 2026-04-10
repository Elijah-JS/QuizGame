import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-arc-border bg-arc-elevated">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 text-xs text-arc-muted">
        © {new Date().getFullYear()} Study Coach • Local-first • This browser only
      </div>
    </footer>
  );
}
