// src/components/layout/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 text-xs text-zinc-400">
        © {new Date().getFullYear()} KINE 3050 Study • Front-end only • LocalStorage
      </div>
    </footer>
  );
}
