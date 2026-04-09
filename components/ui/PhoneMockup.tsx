// components/ui/PhoneMockup.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  screenKey: string; // clé unique pour déclencher l'animation de transition
}

// Variants pour le slide horizontal entre écrans
const screenVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.15 },
    },
  }),
};

export default function PhoneMockup({ children, screenKey }: PhoneMockupProps) {
  return (
    <div
      className="
        relative mx-auto
        w-[280px] sm:w-[300px]
      "
    >
      {/* ── Corps du téléphone ──────────────────────────────────── */}
      <div
        className="
          relative
          bg-gray-900
          rounded-[3rem]
          p-3
          shadow-[0_30px_80px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.1)]
          border border-gray-700
        "
      >
        {/* Bouton power droit */}
        <div className="absolute right-[-3px] top-28 w-[3px] h-10 bg-gray-700 rounded-l-sm" />
        {/* Boutons volume gauche */}
        <div className="absolute left-[-3px] top-20 w-[3px] h-8 bg-gray-700 rounded-r-sm" />
        <div className="absolute left-[-3px] top-32 w-[3px] h-8 bg-gray-700 rounded-r-sm" />

        {/* Encoche Dynamic Island */}
        <div className="flex justify-center mb-2">
          <div className="w-24 h-5 bg-gray-900 rounded-full border border-gray-700" />
        </div>

        {/* ── Écran ────────────────────────────────────────────── */}
        <div
          className="
            relative
            bg-gray-100
            rounded-[2rem]
            overflow-hidden
            border border-gray-800
          "
          style={{ height: "480px" }}
        >
          {/* Barre de statut */}
          <div className="absolute top-0 left-0 right-0 bg-gray-800 px-4 py-1.5 flex items-center justify-between z-10">
            <span className="text-white text-[10px] font-inter font-medium">
              9:41
            </span>
            <div className="flex items-center gap-1">
              {/* Signal */}
              <div className="flex items-end gap-[2px]">
                {[3, 5, 7, 9].map((h, i) => (
                  <div
                    key={i}
                    className="w-[3px] bg-white rounded-sm"
                    style={{ height: `${h}px`, opacity: i < 3 ? 1 : 0.3 }}
                  />
                ))}
              </div>
              {/* Wifi */}
              <span className="text-white text-[8px]">WiFi</span>
              {/* Batterie */}
              <div className="flex items-center gap-0.5">
                <div className="w-5 h-2.5 border border-white rounded-sm flex items-center px-0.5">
                  <div className="w-3 h-1.5 bg-green-400 rounded-sm" />
                </div>
                <div className="w-0.5 h-1.5 bg-white/50 rounded-r-sm" />
              </div>
            </div>
          </div>

          {/* Zone de contenu USSD — avec overflow scroll */}
          <div className="absolute inset-0 top-8 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={screenKey}
                custom={1}
                variants={screenVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 overflow-y-auto"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Barre home */}
        <div className="flex justify-center mt-2">
          <div className="w-20 h-1 bg-gray-600 rounded-full" />
        </div>
      </div>

      {/* Reflet bas */}
      <div
        className="
          absolute -bottom-6 left-4 right-4 h-8
          bg-black/20 blur-xl rounded-full
        "
      />
    </div>
  );
}
