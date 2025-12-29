// components/JosephusVisualization.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  participants: string[];
  k: number;
  mode: "iterative" | "recursive";
};

export default function JosephusVisualization({ participants, k, mode }: Props) {
  const [eliminationSteps, setEliminationSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const positionMap = useMemo(() => {
    const map = new Map<string, number>();
    participants.forEach((p, i) => map.set(p, i));
    return map;
  }, [participants]);

  useEffect(() => {
    if (participants.length < 2 || k < 1) return;

    const timer = setTimeout(() => {
      const steps: string[] = [];
      const circle = [...participants];
      let index = 0;

      while (circle.length > 1) {
        index = (index + k - 1) % circle.length;
        steps.push(circle.splice(index, 1)[0]);
      }

      setEliminationSteps(steps);
      setCurrentStep(0);
      setIsPlaying(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [participants, k, mode]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isPlaying || currentStep >= eliminationSteps.length) {
      timer = setTimeout(() => setIsPlaying(false), 0);
      return () => clearTimeout(timer);
    }

    timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, eliminationSteps.length]);

  const eliminatedSoFar = eliminationSteps.slice(0, currentStep);
  const remaining = participants.filter((p) => !eliminatedSoFar.includes(p));

  const isFinished = currentStep === eliminationSteps.length;
  const winner = isFinished ? remaining[0] : null;

  // === ONLY SIZE CHANGES HERE ===
  const svgWidth = 320; // was 500 → smaller
  const svgHeight = 400; // was 550 → smaller
  const nodeRadius = 36; // was 50 → smaller
  const padding = nodeRadius + 10;
  const radius = Math.min(svgWidth, svgHeight - 80) / 2 - padding;

  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2 - 15;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl text-center font-bold text-gray-800"> Mencari Siapa yang Jaga dalam Kucing-Kucingan dengan Solusi Josephus Problem Berbentuk {mode === "recursive" ? "Rekursif" : "Iteratif"}</h3>

      <svg
        width="320" // fixed smaller width
        height="400" // fixed smaller height
        viewBox="0 0 320 400"
        className="bg-linear-to-br rounded-xl" // reduced padding
      >
        {remaining.map((name, i) => {
          const next = remaining[(i + 1) % remaining.length];
          const i1 = positionMap.get(name)!;
          const i2 = positionMap.get(next)!;

          const a1 = (i1 / participants.length) * 2 * Math.PI - Math.PI / 2;
          const a2 = (i2 / participants.length) * 2 * Math.PI - Math.PI / 2;

          return (
            <line
              key={`${name}-${next}`}
              x1={centerX + radius * Math.cos(a1)}
              y1={centerY + radius * Math.sin(a1)}
              x2={centerX + radius * Math.cos(a2)}
              y2={centerY + radius * Math.sin(a2)}
              stroke="#e2e8f0"
              strokeWidth="3" // thinner lines
            />
          );
        })}

        {participants.map((name, i) => {
          const angle = (i / participants.length) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          const isEliminated = eliminatedSoFar.includes(name);
          const isJustEliminated = eliminationSteps[currentStep - 1] === name;

          return (
            <g key={name}>
              <circle
                cx={x}
                cy={y}
                r={nodeRadius}
                fill={winner === name ? "#10b981" : isEliminated ? "#ef4444" : "#3b82f6"}
                opacity={isEliminated ? 0.3 : 1}
                stroke={winner === name ? "#059669" : isJustEliminated ? "#dc2626" : "#2563eb"}
                strokeWidth={winner || isJustEliminated ? 7 : 3} // slightly thinner
              />

              <text x={x} y={y + 6} textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">
                {name.length > 8 ? name.slice(0, 7) + "…" : name}
              </text>

              {isEliminated && !winner && (
                <>
                  <line x1={x - 25} y1={y - 25} x2={x + 25} y2={y + 25} stroke="#7f1d1d" strokeWidth="6" />
                  <line x1={x + 25} y1={y - 25} x2={x - 25} y2={y + 25} stroke="#7f1d1d" strokeWidth="6" />
                </>
              )}
            </g>
          );
        })}

        {winner && (
          <text
            x={centerX}
            y={centerY + radius + 80}
            textAnchor="middle"
            fill="#059669"
            fontSize="28" // smaller winner text
            fontWeight="bold"
          >
            Terpilih: {winner}
          </text>
        )}
      </svg>

      <div className="flex flex-col items-center">
        <div className="text-lg font-semibold text-black">
          {" "}
          {currentStep} dari {eliminationSteps.length}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            disabled={isFinished}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm" // smaller button
          >
            {isPlaying ? "Jeda" : "Mulai"}
          </button>

          <button
            onClick={() => {
              setCurrentStep(0);
              setIsPlaying(true);
            }}
            className="px-5 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg text-sm" // smaller
          >
            Ulangi
          </button>

          <input
            type="range"
            min="0"
            max={eliminationSteps.length}
            value={currentStep}
            onChange={(e) => {
              setCurrentStep(Number(e.target.value));
              setIsPlaying(false);
            }}
            className="w-64 accent-blue-600" // shorter slider
          />
        </div>
      </div>
    </div>
  );
}
