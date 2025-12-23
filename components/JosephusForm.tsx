"use client";

import { useState } from "react";
import { josephusIterative } from "@/libraries/josephusIterative";
import { josephusRecursive } from "@/libraries/josephusRecursive";

export default function JosephusForm() {
  const [input, setInput] = useState("A\nB\nC\nD\nE");
  const [k, setK] = useState(2);
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<"iterative" | "recursive">("iterative");

  const handleCalculate = () => {
    try {
      const participants = input
        .split(/\n|,/)
        .map(s => s.trim())
        .filter(Boolean);

      if (participants.length === 0) {
        throw new Error("Daftar peserta tidak boleh kosong");
      }

      const res =
        mode === "iterative"
          ? josephusIterative(participants, k, participants.length)
          : josephusRecursive(participants, k, participants.length);

      setResult(res);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Kita cari siapa yang harus jaga di kejar-kejaran ini!
      </h2>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Daftar Peserta
        </label>
        <textarea
          rows={5}
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Pisahkan dengan enter atau koma"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Langkah Eliminasi
        </label>
        <input
          type="number"
          min={1}
          value={k}
          onChange={e => setK(+e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Mode Algoritma
        </label>
        <select
          value={mode}
          onChange={e =>
            setMode(e.target.value as "iterative" | "recursive")
          }
          className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="iterative">Iteratif</option>
          <option value="recursive">Rekursif</option>
        </select>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700 transition"
      >
        Hitung
      </button>

      {result && (
        <div className="mt-4 p-3 bg-gray-50 border rounded-md">
          <p className="text-sm text-gray-700">
            Orang yang terpilih:
            <span className="ml-1 font-semibold text-gray-900">
              {result}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
