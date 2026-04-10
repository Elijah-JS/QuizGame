import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { StoreProvider } from "../providers/StoreProvider";
import AppLayout from "../layouts/AppLayout";

const ModeHub = lazy(() => import("../features/mode-hub"));
const Settings = lazy(() => import("../features/settings"));
const ImportPage = lazy(() => import("../features/import/ImportPage"));
const ReviewPage = lazy(() => import("../features/review/ReviewPage"));
const DeckLibraryPage = lazy(() => import("../features/decks/DeckLibraryPage"));
const UserDeckLearnPage = lazy(() => import("../features/decks/UserDeckLearnPage"));
const UserDeckQuizPage = lazy(() => import("../features/decks/UserDeckQuizPage"));
const UserDeckCramPage = lazy(() => import("../features/decks/UserDeckCramPage"));
const UserDeckScenarioPage = lazy(() => import("../features/decks/UserDeckScenarioPage"));
const DeckDetailPage = lazy(() => import("../features/decks/DeckDetailPage"));
const NotFound = lazy(() => import("../features/not-found"));

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppLayout>
          <Suspense
            fallback={
              <div className="min-h-[60vh] grid place-items-center text-arc-muted">
                <div className="animate-pulse text-sm tracking-wide font-display">Loading…</div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<ModeHub />} />
              <Route path="/import" element={<ImportPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/decks" element={<DeckLibraryPage />} />
              <Route path="/decks/:deckId/learn" element={<UserDeckLearnPage />} />
              <Route path="/decks/:deckId/quiz" element={<UserDeckQuizPage />} />
              <Route path="/decks/:deckId/cram" element={<UserDeckCramPage />} />
              <Route path="/decks/:deckId/scenario" element={<UserDeckScenarioPage />} />
              <Route path="/decks/:deckId" element={<DeckDetailPage />} />
              <Route path="/flash/learn" element={<Navigate to="/decks" replace />} />
              <Route path="/flash/quiz" element={<Navigate to="/decks" replace />} />
              <Route path="/scenario/practice" element={<Navigate to="/decks" replace />} />
              <Route path="/cram" element={<Navigate to="/decks" replace />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </StoreProvider>
    </BrowserRouter>
  );
}
