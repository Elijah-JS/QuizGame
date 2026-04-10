import React from "react";

export default function TextPasteInput({ value, onChange, disabled }) {
  return (
    <div className="space-y-2">
      <label htmlFor="import-paste" className="text-sm font-medium text-arc-subtle">
        Paste text
      </label>
      <textarea
        id="import-paste"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Paste notes, a reading, or lecture text here…"
        className="w-full min-h-[160px] rounded-lg bg-arc-inset border border-arc-border-bright text-sm text-arc-fg placeholder:text-arc-dim px-3 py-2.5
 focus:outline-none focus:ring-2 focus:ring-arc-accent/40 focus:border-arc-accent/50 disabled:opacity-50 resize-y transition-shadow duration-200"
      />
    </div>
  );
}
