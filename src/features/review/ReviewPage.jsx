import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { USER_DECK_SOURCE_IMPORTED_TEXT } from "../../domain/userDeck";
import { saveUserDeck } from "../../shared/utils/userDeckStorage";
import GeneratedCardList from "./GeneratedCardList";

export default function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const passedItems = location.state?.items;
  const suggestedTitleRaw = location.state?.suggestedTitle;
  const cardCountHint = location.state?.cardCount;

  const [items, setItems] = useState(() =>
    Array.isArray(passedItems) ? passedItems : []
  );
  const [deckTitle, setDeckTitle] = useState(() =>
    typeof suggestedTitleRaw === "string" ? suggestedTitleRaw.trim() : ""
  );
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (Array.isArray(location.state?.items)) {
      setItems(location.state.items);
    }
  }, [location.state]);

  useEffect(() => {
    const s = location.state?.suggestedTitle;
    if (typeof s === "string" && s.trim()) {
      setDeckTitle(s.trim());
    }
  }, [location.state?.suggestedTitle]);

  const updateItem = useCallback((id, patch) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const handleSaveDeck = useCallback(() => {
    setSaveError(null);
    if (items.length === 0) return;

    const title = deckTitle.trim() || "Untitled Deck";
    const saved = saveUserDeck({
      title,
      sourceType: USER_DECK_SOURCE_IMPORTED_TEXT,
      items,
    });

    if (!saved) {
      setSaveError("Could not save deck. Try again.");
      return;
    }

    navigate(`/decks/${saved.id}`, {
      state: { justSaved: true, savedTitle: saved.title },
    });
  }, [items, deckTitle, navigate]);

  const count = items.length;
  const countLabel =
    typeof cardCountHint === "number" && cardCountHint === count
      ? count
      : count;

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <header className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-arc-muted font-display">
          Review
        </p>
        <h1 className="text-2xl sm:text-[1.65rem] font-semibold tracking-tight font-display text-arc-fg leading-tight">
          Your new deck is ready
        </h1>
        <p className="text-sm text-arc-muted leading-relaxed max-w-xl">
          Refine cards below, set the deck name, then save. You can rename anytime from{" "}
          <Link
            to="/decks"
            className="text-arc-subtle hover:text-arc-fg underline underline-offset-4 decoration-arc-border-bright"
          >
            My decks
          </Link>
          .
        </p>
      </header>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-arc-border bg-arc-panel/50 p-8 text-center space-y-4 shadow-arc-inset">
          <p className="text-sm text-arc-muted max-w-md mx-auto">
            Nothing to review yet. Generate a deck from the import screen to see cards here.
          </p>
          <Link
            to="/import"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl text-sm font-semibold bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition-all duration-200 shadow-arc-glow motion-safe:active:scale-[0.98]"
          >
            Go to import
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-sm text-arc-muted">
              <span className="tabular-nums font-semibold text-arc-fg">{countLabel}</span>{" "}
              high-value card{count !== 1 ? "s" : ""}
            </p>
            <Link
              to="/import"
              className="text-xs sm:text-sm text-arc-dim hover:text-arc-subtle underline underline-offset-4 decoration-arc-border-bright"
            >
              Start over
            </Link>
          </div>

          <section className="rounded-2xl border border-arc-border/90 bg-arc-panel/40 p-5 sm:p-6 space-y-4 shadow-arc-inset">
            <div className="flex flex-col gap-1">
              <label htmlFor="deck-title" className="text-[11px] font-medium uppercase tracking-wider text-arc-muted font-display">
                Deck name
              </label>
              <p className="text-xs text-arc-dim">
                Suggested from your material — edit freely; you always have the final say.
              </p>
            </div>
            <input
              id="deck-title"
              type="text"
              value={deckTitle}
              onChange={(e) => setDeckTitle(e.target.value)}
              placeholder="Name this deck"
              autoComplete="off"
              className="w-full rounded-xl bg-arc-inset border border-arc-border-bright text-base sm:text-sm text-arc-fg placeholder:text-arc-dim px-4 py-3
 focus:outline-none focus:ring-2 focus:ring-arc-accent/40 focus:border-arc-accent/55 transition-shadow duration-200"
            />
            {saveError ? (
              <p className="text-sm text-arc-bad" role="alert">
                {saveError}
              </p>
            ) : null}
            <button
              type="button"
              onClick={handleSaveDeck}
              className="w-full sm:w-auto min-h-[48px] inline-flex justify-center items-center px-6 rounded-xl text-sm font-semibold bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition-all duration-200 shadow-arc-glow motion-safe:active:scale-[0.98]"
            >
              Save to My decks
            </button>
          </section>

          <div className="space-y-3">
            <h2 className="text-xs font-medium uppercase tracking-wider text-arc-muted font-display">Cards</h2>
            <GeneratedCardList
              items={items}
              onUpdateItem={updateItem}
              onRemoveItem={removeItem}
            />
          </div>
        </>
      )}
    </div>
  );
}
