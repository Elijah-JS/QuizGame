import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import Footer from "./Footer";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-arc-bg text-arc-fg arc-subtle-grid">
      <div className="min-h-screen flex flex-col md:grid md:grid-cols-[260px_minmax(0,1fr)]">
        <Sidebar />

        <div className="flex flex-col min-h-screen min-w-0 flex-1">
          <TopBar />

          <main className="flex-1 px-4 sm:px-5 md:px-8 lg:px-10 py-4 md:py-6">
            <div className="arc-main-shell p-5 sm:p-6 md:p-8 arc-page-ease shadow-arc">
              {children}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
