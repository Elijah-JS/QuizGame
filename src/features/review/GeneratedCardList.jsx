import React from "react";
import GeneratedCardPreview from "./GeneratedCardPreview";

export default function GeneratedCardList({ items, onUpdateItem, onRemoveItem }) {
  if (!items.length) return null;

  return (
    <ul className="space-y-4 list-none p-0 m-0" aria-label="Generated flashcards">
      {items.map((item) => (
        <li key={item.id}>
          <GeneratedCardPreview
            item={item}
            onChange={(patch) => onUpdateItem(item.id, patch)}
            onRemove={() => onRemoveItem(item.id)}
          />
        </li>
      ))}
    </ul>
  );
}
