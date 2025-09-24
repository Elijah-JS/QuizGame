import React from "react";
import { useStore } from "../../context/StoreProvider";

export default function Settings() {
  const { settings, updateSettings, resetProgress } = useStore();

  return (
    <div className="grid gap-4">
      <section className="p-6 rounded-2xl border border-white/10 bg-zinc-900/60">
        <div className="text-lg font-semibold mb-3">Quiz Settings</div>
        <div className="flex items-center gap-3">
          <label className="text-sm">Quiz length:</label>
          <input
            type="number"
            min={5}
            max={50}
            value={settings.quizLength}
            onChange={(e) => updateSettings({ quizLength: Number(e.target.value) })}
            className="w-24 bg-zinc-800 border border-white/10 rounded px-2 py-1 text-sm"
          />
        </div>
        <div className="flex items-center gap-3 mt-3">
          <label className="text-sm">Cram length:</label>
          <input
            type="number"
            min={5}
            max={100}
            value={settings.cramLength}
            onChange={(e) => updateSettings({ cramLength: Number(e.target.value) })}
            className="w-24 bg-zinc-800 border border-white/10 rounded px-2 py-1 text-sm"
          />
        </div>
      </section>

      <section className="p-6 rounded-2xl border border-white/10 bg-zinc-900/60">
        <div className="text-lg font-semibold mb-3">Progress</div>
        <button
          onClick={resetProgress}
          className="px-3 py-2 rounded bg-red-600/80 hover:bg-red-600 text-sm"
        >
          Reset Progress
        </button>
      </section>
    </div>
  );
}
