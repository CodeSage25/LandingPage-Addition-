// components/GainsTableSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gainsData, formatFCFA } from "@/lib/gains";

const COLUMNS = [
  { mise: 100 as const, label: "Addition 100F" },
  { mise: 200 as const, label: "Addition 200F" },
  { mise: 400 as const, label: "Addition 400F" },
];

export default function GainsTableSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-8 px-4 overflow-hidden"
      style={{
        backgroundImage: "url('/white.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay léger */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(255,255,255,0.72)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── Header ───────────────────────────────────────────── */}
        <div
          className="text-center mb-5 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h2 className="font-poppins font-black text-2xl md:text-3xl text-gray-800">
            Tableau des{" "}
           Gains
          </h2>
          <p className="text-xs mt-1" style={{ color: "rgba(0,0,0,0.45)" }}>
            Sélectionnez votre mise pour voir les gains associés
          </p>
        </div>

        {/* ── DESKTOP : 3 colonnes côte à côte ─────────────────── */}
        <div
          className="hidden md:grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}
        >
          {COLUMNS.map((col, colIdx) => (
            <Column
              key={col.mise}
              col={col}
              colIdx={colIdx}
              visible={visible}
            />
          ))}
        </div>

        {/* ── MOBILE ────────────────────────────────────────────── */}
        <div className="md:hidden flex flex-col gap-6">

          {/* Rangée du haut : 400 à gauche, 200 à droite */}
<div className="grid grid-cols-2 gap-3">
  {[COLUMNS[2], COLUMNS[1]].map((col, i) => (
    <Column
      key={col.mise}
      col={col}
      colIdx={i + 1}
      visible={visible}
    />
  ))}
</div>

          {/* Rangée du bas : 100 dans la col gauche, col droite vide */}
          <div className="grid grid-cols-2 gap-3">
            <Column
              col={COLUMNS[0]}
              colIdx={0}
              visible={visible}
            />
            {/* Colonne vide intentionnelle */}
            <div />
          </div>

        </div>

        {/* ── Note légale ──────────────────────────────────────── */}
        <p
          className="text-center text-[10px] mt-4 transition-all duration-700 delay-500"
          style={{
            color: "rgba(0,0,0,0.3)",
            opacity: visible ? 1 : 0,
          }}
        >
           Les gains sont versés instantanément*
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Sous-composant : colonne (desktop & mobile)
───────────────────────────────────────────────────────────────────── */
type ColDef = { mise: 100 | 200 | 400; label: string };

function Column({
  col,
  colIdx,
  visible,
}: {
  col: ColDef;
  colIdx: number;
  visible: boolean;
}) {
  const rows = gainsData[col.mise];

  return (
    <div
      className="transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${colIdx * 150}ms`,
      }}
    >
      {/* En-tête colonne */}
      <div
        className="text-center pb-2 mb-2"
        style={{ borderBottom: "2px solid var(--orange-vif)" }}
      >
        <span
          className="font-poppins font-black text-sm uppercase tracking-wide"
          style={{ color: "var()" }}
        >
          {col.label}
        </span>
      </div>

      {/* Sous-en-têtes */}
      <div
        className="grid px-2 mb-1"
        style={{ gridTemplateColumns: "44px 1fr" }}
      >
        <span
          className="text-center text-xs font-bold"
          style={{ color: "rgba(0,0,0,0.35)" }}
        >
          Somme
        </span>
        <span
          className="text-right text-xs font-bold"
          style={{ color: "rgba(0,0,0,0.35)" }}
        >
          Gain
        </span>
      </div>

      {/* Lignes */}
      <div>
        {rows.map((row, i) => (
          <div
            key={i}
            className="grid items-center px-2 py-[5px] rounded-lg transition-all duration-500"
            style={{
              gridTemplateColumns: "44px 1fr",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-10px)",
              transitionDelay: `${colIdx * 150 + i * 50}ms`,
              background:
                row.isJackpot
                  ? "rgba(244,120,32,0.08)"
                  : i % 2 === 0
                  ? "rgba(0,0,0,0.025)"
                  : "transparent",
            }}
          >
            {/* Badge somme */}
            <div className="flex justify-center">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black font-poppins flex-shrink-0"
                style={
                  row.isJackpot
                    ? {
                        background:
                          "linear-gradient(135deg, var(--orange-vif), #ffb347)",
                        color: "#fff",
                        boxShadow: "0 2px 8px rgba(244,120,32,0.4)",
                      }
                    : {
                        background: "rgba(116,166,65,0.15)",
                        color: "var(--vert-fonce)",
                        border: "1px solid rgba(116,166,65,0.3)",
                      }
                }
              >
                {row.somme}
              </span>
            </div>

            {/* Gain */}
            <div className="text-right leading-tight">
              {row.isJackpot && (
                <div className="flex items-center justify-end gap-1 mb-0.5">
                  <span
                    className="text-[9px] font-black uppercase tracking-wider"
                    style={{ color: "var(--orange-vif)" }}
                  >
                    ⭐ Jackpot
                  </span>
                </div>
              )}
              <span
                className="font-poppins font-bold"
                style={{
                  fontSize: "10.5px",
                  color: row.isJackpot ? "var(--orange-vif)" : "#1a1a1a",
                }}
              >
                {formatFCFA(row.gain)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}