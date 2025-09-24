// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { StoreProvider } from "./context/StoreProvider";
import AppLayout from "./components/layout/AppLayout";

// Lazy screens (each must exist with matching case)
const ModeHub = lazy(() => import("./screens/ModeHub"));
const FlashLearn = lazy(() => import("./screens/Flashcards/Learn"));
const FlashQuiz = lazy(() => import("./screens/Flashcards/Quiz"));
const ScenarioPractice = lazy(() => import("./screens/Scenarios/Practice"));
const Cram = lazy(() => import("./screens/Cram"));
const Settings = lazy(() => import("./screens/Settings"));
// Use ONE of these two depending on your file:
const NotFound = lazy(() => import("./screens/NotFound"));       // if folder: screens/NotFound/index.jsx
// const NotFound = lazy(() => import("./screens/NotFound.jsx")); // if single file

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppLayout>
          <Suspense
            fallback={
              <div className="min-h-[60vh] grid place-items-center text-zinc-300">
                <div className="animate-pulse text-sm">loading…</div>
              </div>
            }
          >
            <Routes>
              {/* Hub */}
              <Route path="/" element={<ModeHub />} />

              {/* Flashcards */}
              <Route path="/flash/learn" element={<FlashLearn />} />
              <Route path="/flash/quiz" element={<FlashQuiz />} />

              {/* Scenarios */}
              <Route path="/scenario/practice" element={<ScenarioPractice />} />

              {/* Cram + Settings */}
              <Route path="/cram" element={<Cram />} />
              <Route path="/settings" element={<Settings />} />

              {/* Redirects & 404 */}
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </StoreProvider>
    </BrowserRouter>
  );
}
