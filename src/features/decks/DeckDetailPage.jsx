import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import {
  getUserDeckById,
  updateUserDeck,
  renameUserDeck,
  duplicateUserDeck,
  deleteUserDeck,
  createManualFlashcardItem,
} from "../../shared/utils/userDeckStorage";
import { deleteCardProgress, getDeckProgressSummary } from "../../shared/utils/userDeckProgressStorage";
import { formatShortLastStudied } from "../../shared/utils/userDeckProgressStats";

const btnGhost =
  "inline-flex justify-center items-center min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium border border-arc-border-bright bg-arc-panel text-arc-subtle hover:bg-arc-panel-soft transition-all duration-200 motion-safe:active:scale-[0.98]";
const btnDangerGhost =
  "inline-flex justify-center items-center min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium border border-arc-bad-border bg-arc-bad-surface/60 text-arc-bad hover:bg-arc-bad-surface/80 transition";
const inputClass =
  "w-full rounded-lg border border-arc-border-bright bg-arc-inset px-3 py-2.5 text-sm text-arc-fg placeholder:text-arc-dim focus:outline-none focus:ring-2 focus:ring-arc-accent/35";

export default function DeckDetailPage() {
  const { deckId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [deckVersion, setDeckVersion] = useState(0);
  const [deck, setDeck] = useState(() => getUserDeckById(deckId));
  const reloadDeck = useCallback(() => setDeckVersion((v) => v + 1), []);

  useEffect(() => {
    setDeck(getUserDeckById(deckId));
  }, [deckId, deckVersion]);

  const [dismissSaved, setDismissSaved] = useState(false);
  const showSavedBanner = location.state?.justSaved && !dismissSaved;

  const [notice, setNotice] = useState(null);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4500);
    return () => clearTimeout(t);
  }, [notice]);

  const [renaming, setRenaming] = useState(false);
  const [renameDraft, setRenameDraft] = useState("");

  const [editingCardId, setEditingCardId] = useState(null);
  const [editDraft, setEditDraft] = useState({ q: "", a: "" });

  const [showAddCard, setShowAddCard] = useState(false);
  const [addDraft, setAddDraft] = useState({ q: "", a: "", difficulty: "medium" });

  const items = useMemo(() => {
    if (!deck || !Array.isArray(deck.items)) return [];
    return deck.items;
  }, [deck]);

  const progressSummary = useMemo(() => {
    void location.key;
    if (!deck?.id) {
      return {
        total: 0,
        reviewed: 0,
        due: 0,
        lastStudied: 0,
        avgConfidence: null,
        masteryPercent: null,
      };
    }
    return getDeckProgressSummary(deck.id, items.map((it) => it.id));
  }, [deck?.id, items, location.key]);

  const reviewedPct =
    progressSummary.total > 0
      ? Math.round((progressSummary.reviewed / progressSummary.total) * 100)
      : 0;

  const startRename = useCallback(() => {
    if (!deck) return;
    setRenameDraft(deck.title || "");
    setRenaming(true);
  }, [deck]);

  const cancelRename = useCallback(() => {
    setRenaming(false);
    setRenameDraft("");
  }, []);

  const commitRename = useCallback(() => {
    if (!deck?.id) return;
    const next = renameUserDeck(deck.id, renameDraft);
    if (!next) {
      setNotice({ kind: "error", text: "Could not rename this deck." });
      return;
    }
    reloadDeck();
    setRenaming(false);
    setNotice({ kind: "success", text: "Deck renamed." });
  }, [deck?.id, renameDraft, reloadDeck]);

  const handleDuplicate = useCallback(() => {
    if (!deck?.id) return;
    const copy = duplicateUserDeck(deck.id);
    if (!copy) {
      setNotice({ kind: "error", text: "Could not duplicate this deck." });
      return;
    }
    setNotice({ kind: "success", text: "Deck duplicated." });
    navigate(`/decks/${copy.id}`, { replace: false });
  }, [deck?.id, navigate]);

  const handleDeleteDeck = useCallback(() => {
    if (!deck?.id) return;
    if (!window.confirm("Delete this deck and its study progress in this browser? This cannot be undone.")) {
      return;
    }
    deleteUserDeck(deck.id);
    navigate("/decks", { replace: true });
  }, [deck?.id, navigate]);

  const startEditCard = useCallback((item) => {
    setEditingCardId(item.id);
    setEditDraft({ q: item.question ?? "", a: item.answer ?? "" });
  }, []);

  const cancelEditCard = useCallback(() => {
    setEditingCardId(null);
    setEditDraft({ q: "", a: "" });
  }, []);

  const saveEditCard = useCallback(() => {
    if (!deck || !editingCardId) return;
    const q = editDraft.q.trim();
    if (!q) {
      setNotice({ kind: "error", text: "Question cannot be empty." });
      return;
    }
    const nextItems = items.map((it) =>
      it.id === editingCardId ? { ...it, question: q, answer: editDraft.a.trim() } : it
    );
    const updated = updateUserDeck({ ...deck, items: nextItems });
    if (!updated) {
      setNotice({ kind: "error", text: "Could not save this card." });
      return;
    }
    reloadDeck();
    cancelEditCard();
    setNotice({ kind: "success", text: "Card updated." });
  }, [deck, editingCardId, editDraft, items, reloadDeck, cancelEditCard]);

  const handleDeleteCard = useCallback(
    (cardId) => {
      if (!deck?.id || !cardId) return;
      if (!window.confirm("Remove this card from the deck?")) return;
      deleteCardProgress(deck.id, cardId);
      const nextItems = items.filter((it) => it.id !== cardId);
      const updated = updateUserDeck({ ...deck, items: nextItems });
      if (!updated) {
        setNotice({ kind: "error", text: "Could not remove the card." });
        return;
      }
      if (editingCardId === cardId) cancelEditCard();
      reloadDeck();
      setNotice({ kind: "success", text: "Card removed." });
    },
    [deck, items, editingCardId, cancelEditCard, reloadDeck]
  );

  const handleAddManualCard = useCallback(() => {
    if (!deck) return;
    const q = addDraft.q.trim();
    if (!q) {
      setNotice({ kind: "error", text: "Add a question for the new card." });
      return;
    }
    const item = createManualFlashcardItem({
      question: q,
      answer: addDraft.a,
      difficulty: addDraft.difficulty === "simple" ? "simple" : "medium",
    });
    const updated = updateUserDeck({ ...deck, items: [...items, item] });
    if (!updated) {
      setNotice({ kind: "error", text: "Could not add the card." });
      return;
    }
    reloadDeck();
    setAddDraft({ q: "", a: "", difficulty: addDraft.difficulty });
    setShowAddCard(false);
    setNotice({ kind: "success", text: "Card added." });
  }, [deck, items, addDraft, reloadDeck]);

  if (!deck) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto text-center py-12">
        <p className="text-arc-muted">Deck not found.</p>
        <Link
          to="/decks"
          className="inline-flex px-4 py-2 rounded-lg text-sm font-medium bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition shadow-arc-glow"
        >
          Back to library
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {notice && (
        <div
          role="status"
          className={
            notice.kind === "success"
              ? "rounded-lg border border-arc-ok-border bg-arc-ok-surface/80 px-4 py-3 text-sm text-arc-ok"
              : "rounded-lg border border-arc-bad-border bg-arc-bad-surface/70 px-4 py-3 text-sm text-arc-bad"
          }
        >
          {notice.text}
        </div>
      )}

      {showSavedBanner && (
        <div
          className="rounded-lg border border-arc-ok-border bg-arc-ok-surface/70 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-arc-inset"
          role="status"
        >
          <p className="text-sm text-arc-ok">
            Deck saved: <span className="font-medium">{location.state?.savedTitle || deck.title}</span>
          </p>
          <button
            type="button"
            onClick={() => setDismissSaved(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-arc-ok-border text-arc-ok hover:bg-arc-ok-surface shrink-0 min-h-[44px] sm:min-h-0 transition"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <Link
            to="/decks"
            className="text-xs text-arc-muted hover:text-arc-subtle mb-2 inline-block underline underline-offset-2 decoration-arc-border-bright"
          >
            ← My decks
          </Link>
          {renaming ? (
            <div className="space-y-2 mt-1">
              <label className="sr-only" htmlFor="deck-rename-input">
                Deck title
              </label>
              <input
                id="deck-rename-input"
                className={inputClass}
                value={renameDraft}
                onChange={(e) => setRenameDraft(e.target.value)}
                autoComplete="off"
              />
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={commitRename} className={btnGhost}>
                  Save title
                </button>
                <button type="button" onClick={cancelRename} className={btnGhost}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <h1 className="text-xl font-semibold tracking-tight font-display text-arc-fg break-words">{deck.title}</h1>
          )}
          <p className="text-sm text-arc-muted mt-1">
            {items.length} card{items.length !== 1 ? "s" : ""} ·{" "}
            {deck.sourceType === "imported-text" ? "Imported text" : deck.sourceType}
          </p>
          {items.length > 0 && (
            <div className="mt-3 rounded-xl border border-arc-border bg-arc-panel px-3 py-3 sm:px-4 space-y-3 max-w-lg shadow-arc-inset">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-arc-muted">
                <span>
                  <span className="tabular-nums text-arc-fg">{progressSummary.reviewed}</span>
                  <span className="text-arc-dim"> / </span>
                  <span className="tabular-nums text-arc-fg">{progressSummary.total}</span>
                  <span className="text-arc-dim"> reviewed</span>
                </span>
                <span>
                  <span className="tabular-nums text-arc-fg">{progressSummary.due}</span>
                  <span className="text-arc-dim"> due now</span>
                </span>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-arc-muted mb-1">
                  <span>Cards seen at least once</span>
                  <span className="tabular-nums text-arc-subtle">{reviewedPct}%</span>
                </div>
                <div
                  className="h-1.5 rounded-full bg-arc-inset overflow-hidden"
                  role="progressbar"
                  aria-valuenow={reviewedPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Share of cards reviewed at least once"
                >
                  <div
                    className="h-full rounded-full bg-arc-accent transition-[width]"
                    style={{ width: `${reviewedPct}%` }}
                  />
                </div>
              </div>
              {progressSummary.masteryPercent != null && progressSummary.avgConfidence != null ? (
                <div>
                  <div className="flex justify-between text-[11px] text-arc-muted mb-1">
                    <span>Mastery (avg. confidence)</span>
                    <span className="tabular-nums text-arc-subtle">
                      {progressSummary.masteryPercent}% ·{" "}
                      {progressSummary.avgConfidence.toFixed(1)}/5
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full bg-arc-inset overflow-hidden"
                    role="progressbar"
                    aria-valuenow={progressSummary.masteryPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Average confidence as a percent of maximum"
                  >
                    <div
                      className="h-full rounded-full bg-arc-primary/85 transition-[width]"
                      style={{ width: `${progressSummary.masteryPercent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-arc-muted">
                  Mastery appears after you study at least one card in this deck.
                </p>
              )}
              <p className="text-[11px] text-arc-muted">
                Last studied:{" "}
                {progressSummary.lastStudied > 0 ? (
                  <span className="text-arc-subtle">{formatShortLastStudied(progressSummary.lastStudied)}</span>
                ) : (
                  <span>not yet</span>
                )}
              </p>
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {!renaming && (
              <button type="button" onClick={startRename} className={btnGhost}>
                Rename
              </button>
            )}
            <button type="button" onClick={handleDuplicate} className={btnGhost}>
              Duplicate
            </button>
            <button type="button" onClick={handleDeleteDeck} className={btnDangerGhost}>
              Delete deck
            </button>
          </div>
        </div>
        {items.length > 0 ? (
          <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto sm:max-w-md">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:flex-wrap">
              <Link
                to={`/decks/${deck.id}/learn`}
                className="inline-flex justify-center px-3 py-2.5 sm:px-4 rounded-lg text-sm font-medium bg-arc-primary text-arc-ink hover:bg-arc-primary-hover transition min-h-[44px] items-center text-center shadow-arc-glow motion-safe:active:scale-[0.98]"
              >
                Study in Learn
              </Link>
              <Link
                to={`/decks/${deck.id}/quiz`}
                className="inline-flex justify-center px-3 py-2.5 sm:px-4 rounded-lg text-sm font-medium bg-arc-panel-soft border border-arc-border-bright text-arc-fg hover:bg-arc-inset transition min-h-[44px] items-center text-center"
              >
                Study in Quiz
              </Link>
              <Link
                to={`/decks/${deck.id}/cram`}
                className="inline-flex justify-center px-3 py-2.5 sm:px-4 rounded-lg text-sm font-medium bg-arc-panel-soft border border-arc-border-bright text-arc-fg hover:bg-arc-inset transition min-h-[44px] items-center text-center"
              >
                Study in Cram
              </Link>
              <Link
                to={`/decks/${deck.id}/scenario`}
                className="inline-flex justify-center px-3 py-2.5 sm:px-4 rounded-lg text-sm font-medium bg-arc-panel-soft border border-arc-border-bright text-arc-fg hover:bg-arc-inset transition min-h-[44px] items-center text-center"
              >
                Study in Scenario
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-xs text-arc-muted shrink-0 max-w-xs text-right sm:text-left self-start sm:self-center">
            Add cards below or save cards from Import → Review.
          </p>
        )}
      </div>

      <ul className="space-y-3 list-none p-0 m-0" aria-label="Cards in deck">
        {items.map((item, i) => (
          <li
            key={item.id || i}
            className="rounded-xl border border-arc-border bg-arc-panel p-4 sm:p-5 space-y-3 shadow-arc-inset"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-[11px] uppercase tracking-wider text-arc-muted font-display">
                Card {i + 1} · {item.type || "flashcard"}
              </div>
              <div className="flex flex-wrap gap-2">
                {editingCardId === item.id ? (
                  <>
                    <button type="button" onClick={saveEditCard} className={btnGhost + " !min-h-[40px] text-xs px-2.5"}>
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditCard}
                      className={btnGhost + " !min-h-[40px] text-xs px-2.5"}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => startEditCard(item)}
                      className={btnGhost + " !min-h-[40px] text-xs px-2.5"}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCard(item.id)}
                      className={btnDangerGhost + " !min-h-[40px] text-xs px-2.5"}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
            {editingCardId === item.id ? (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-arc-muted mb-1 block" htmlFor={`cq-${item.id}`}>
                    Question
                  </label>
                  <textarea
                    id={`cq-${item.id}`}
                    className={inputClass + " min-h-[88px] resize-y"}
                    value={editDraft.q}
                    onChange={(e) => setEditDraft((d) => ({ ...d, q: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-[11px] text-arc-muted mb-1 block" htmlFor={`ca-${item.id}`}>
                    Answer
                  </label>
                  <textarea
                    id={`ca-${item.id}`}
                    className={inputClass + " min-h-[88px] resize-y"}
                    value={editDraft.a}
                    onChange={(e) => setEditDraft((d) => ({ ...d, a: e.target.value }))}
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="text-[11px] text-arc-muted mb-0.5">Question</div>
                  <p className="text-sm text-arc-fg leading-relaxed line-clamp-4">{item.question}</p>
                </div>
                <div>
                  <div className="text-[11px] text-arc-muted mb-0.5">Answer</div>
                  <p className="text-sm text-arc-subtle/95 leading-relaxed line-clamp-4 whitespace-pre-wrap">
                    {item.answer}
                  </p>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <section className="rounded-xl border border-arc-border bg-arc-panel p-4 sm:p-5 space-y-3 shadow-arc-inset" aria-label="Add card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-sm font-medium font-display text-arc-subtle">Add a card</h2>
          <button
            type="button"
            onClick={() => setShowAddCard((v) => !v)}
            className={btnGhost + " sm:shrink-0"}
            aria-expanded={showAddCard}
          >
            {showAddCard ? "Close" : "New manual card"}
          </button>
        </div>
        {showAddCard && (
          <div className="space-y-3 pt-1">
            <div>
              <label className="text-[11px] text-arc-muted mb-1 block" htmlFor="manual-q">
                Question
              </label>
              <textarea
                id="manual-q"
                className={inputClass + " min-h-[88px] resize-y"}
                value={addDraft.q}
                onChange={(e) => setAddDraft((d) => ({ ...d, q: e.target.value }))}
                placeholder="Front of the card"
              />
            </div>
            <div>
              <label className="text-[11px] text-arc-muted mb-1 block" htmlFor="manual-a">
                Answer
              </label>
              <textarea
                id="manual-a"
                className={inputClass + " min-h-[88px] resize-y"}
                value={addDraft.a}
                onChange={(e) => setAddDraft((d) => ({ ...d, a: e.target.value }))}
                placeholder="Back of the card"
              />
            </div>
            <div>
              <label className="text-[11px] text-arc-muted mb-1 block" htmlFor="manual-diff">
                Difficulty
              </label>
              <select
                id="manual-diff"
                className={inputClass}
                value={addDraft.difficulty}
                onChange={(e) => setAddDraft((d) => ({ ...d, difficulty: e.target.value }))}
              >
                <option value="simple">Simple</option>
                <option value="medium">Medium</option>
              </select>
            </div>
            <button type="button" onClick={handleAddManualCard} className={btnGhost}>
              Add to deck
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
