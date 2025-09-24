// src/components/layout/AppLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import Footer from "./Footer";

export default function AppLayout({ children }) {
  return (
    <div className="relative min-h-screen text-white">
      {/* background (soft aurora + vignette) */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,#0f172a_0%,transparent_60%),radial-gradient(1000px_500px_at_110%_10%,#0ea5e9_0%,transparent_55%),radial-gradient(900px_500px_at_-10%_90%,#10b981_0%,transparent_50%)] bg-[#0b0b10]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_35%,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      <div className="grid grid-cols-[260px_minmax(0,1fr)] min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main column */}
        <div className="flex flex-col min-h-screen">
          <TopBar />

          <main className="flex-1 px-5 md:px-8 lg:px-10 py-6">
            {/* page surface (glassy sheet) */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl shadow-2xl shadow-black/30 p-6 md:p-8">
              {children}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
