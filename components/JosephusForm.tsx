// JosephusForm.tsx or app/page.tsx
"use client";

import { useState } from "react";
import { josephusIterative } from "@/libraries/josephusIterative";
import { josephusRecursive } from "@/libraries/josephusRecursive";
import JosephusVisualization from "@/components/JosephusVisualization";

export default function JosephusForm() {
  const [input, setInput] = useState("Andi\nBudi\nCaca\nDedi\nEuis\nFafa\nGina");
  const [k, setK] = useState(3);
  const [mode, setMode] = useState<"iterative" | "recursive">("iterative");
  const [participants, setParticipants] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  const handleCalculate = () => {
    try {
      const parts = input
        .split(/\n|,\s*/)
        .map((s) => s.trim())
        .filter(Boolean);

      if (parts.length < 2) {
        alert("Minimal 2 peserta untuk permainan Josephus!");
        return;
      }

      const n = parts.length;

      const result = mode === "iterative" ? josephusIterative(parts, k, n) : josephusRecursive(parts, k, n);

      setParticipants(parts);
      setWinner(result);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-100 to-blue-400 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="grid md:grid-cols-2 gap-6">
          <div className="max-h-min bg-white rounded-xl shadow-md p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Daftar Peserta</label>
              <textarea
                rows={6}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                placeholder="Satu nama per baris atau pisah koma"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Nilai k (langkah eliminasi)</label>
              <input
                type="number"
                min={1}
                value={k}
                onChange={(e) => setK(Math.max(1, +e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Mode Algoritma</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as "iterative" | "recursive")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="iterative">Iteratif</option>
                <option value="recursive">Rekursif</option>
              </select>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md text-md transition"
            >
              Mulai Visualisasi
            </button>

            {winner && (
              <div className="mt-2 p-3 bg-green-100 border border-green-600 rounded-md text-center">
                <p className="text-lg font-bold text-green-600">Terpilih: {winner}</p>
              </div>
            )}
          </div>

          {/* Visualization */}
          <div className="flex justify-center items-start">
            {participants.length > 0 && <JosephusVisualization participants={participants} k={k} mode={mode} />}
          </div>
        </div>
      </div>
    </div>
  );
}
