// components/sections/Hero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ── Variants Framer Motion (remplacent les @keyframes CSS) ─────────
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  },
});

const pulseVariants = {
  animate: {
    scale: [1, 1.03, 1],
    boxShadow: [
      "0 8px 32px rgba(244,120,32,0.3), 0 2px 8px rgba(0,0,0,0.2)",
      "0 12px 40px rgba(244,120,32,0.5), 0 4px 12px rgba(0,0,0,0.3)",
      "0 8px 32px rgba(244,120,32,0.3), 0 2px 8px rgba(0,0,0,0.2)",
    ],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
};

const scrollLineVariants = {
  animate: {
    scaleY: [1, 0.5, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
};

const chevronVariants = (delay = 0) => ({
  animate: {
    y: [0, 6, 0],
    opacity: [1, 0.4, 1],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
      delay,
    },
  },
});

// ── Icône Chevron SVG ──────────────────────────────────────────────
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ── Icône Lock SVG ─────────────────────────────────────────────────
function IconLock({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// ── Icône Play SVG ─────────────────────────────────────────────────
function IconPlay({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════════════

export default function Hero() {
  const handleScrollDown = () => {
    document
      .getElementById("how-to-play")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Logo discret haut gauche ──────────────────────────────── */}
      <header
        className="
        absolute top-0 left-0 w-full
        px-6 py-8 z-30
        flex justify-between items-center
        pointer-events-none
      "
      ></header>

      {/* ── Section Hero ─────────────────────────────────────────── */}
      <section
        id="hero"
        className="
          relative w-full overflow-hidden
          flex flex-col items-center justify-end
        "
        style={{ height: "100dvh", minHeight: "600px" }}
      >
        {/* ── Image de fond ──────────────────────────────────────── */}
        <div className="absolute inset-0 w-full h-full z-0">
          {/* Desktop & Laptop — 16:9 */}
          <Image
            src="/images/background-desktop.jpeg"
            alt="Là Là Là — Tentez ta chance au #150*52#"
            fill
            priority
            quality={90}
            className="hidden lg:block object-cover object-center"
            sizes="100vw"
            style={{ opacity: 0.9, objectPosition: "center 10%" }}
          />

          {/* Tablette & petit laptop — 3:2 */}
          <Image
            src="/images/background.jpeg"
            alt="Là Là Là — Tentez ta chance au #150*52#"
            fill
            priority
            quality={90}
            className="hidden md:block lg:hidden object-cover object-center"
            sizes="100vw"
            style={{ opacity: 0.9 }}
          />

          {/* Mobile portrait — 9:16 */}
          <Image
            src="/images/background-mobile.jpeg"
            alt="Là Là Là — Tentez ta chance au #150*52#"
            fill
            priority
            quality={90}
            className="block md:hidden object-cover object-center"
            sizes="100vw"
            style={{ opacity: 0.9 }}
          />
        </div>

        {/* ── Vignette radiale ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, transparent 70%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* ── Dégradé bas ────────────────────────────────────────── */}

        {/* ── Contenu principal ──────────────────────────────────── */}
        <div
          className="
          relative z-20
          flex flex-col items-center
          w-full px-4
          pb-28 sm:pb-32
          text-center
        "
        >
          <motion.div
            {...fadeInUp(0.8)}
            className="flex flex-col items-center gap-6 w-full"
          >
            {/* CTA principal */}
            <motion.a
              href="tel:*150*52%23"
              variants={pulseVariants}
              animate="animate"
              whileHover={{ scale: 1.02, backgroundColor: "#fa8936" }}
              whileTap={{ scale: 0.98 }}
              className="
                inline-flex items-center gap-3
                bg-orange-vif text-white
                font-poppins font-semibold
                text-base sm:text-lg
                px-8 sm:px-10 py-4 sm:py-5
                rounded-full
                transition-colors duration-300
                select-none cursor-pointer
              "
            >
              <IconPlay className="w-6 h-6" />
              <span>Composer le #150*52#</span>
            </motion.a>

            {/* Badge sécurité */}
            <div
              className="
              flex items-center gap-2.5
              bg-white/5 backdrop-blur-md
              text-white/80
              text-xs sm:text-sm
              px-5 py-2.5 rounded-full
              border border-white/10
              shadow-sm
            "
            >
              <IconLock className="w-4 h-4 text-white/70" />
              <span className="font-inter font-medium">
                Paiement sécurisé Orange Money
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ───────────────────────────────────── */}
        <button
          onClick={handleScrollDown}
          aria-label="Défiler vers le bas"
          className="
            absolute bottom-8 left-1/2 -translate-x-1/2
            z-20 flex flex-col items-center gap-1.5
            cursor-pointer opacity-80
            hover:opacity-100 transition-opacity duration-300
            p-4
          "
        >
          {/* Ligne verticale */}
          <motion.div
            variants={scrollLineVariants}
            animate="animate"
            className="w-px h-8 bg-white/40 origin-top"
          />

          {/* Double chevron */}
          <div className="flex flex-col items-center -space-y-2 mt-1">
            <motion.div {...chevronVariants(0)}>
              <ChevronDown className="w-5 h-5 text-white/60" />
            </motion.div>
            <motion.div {...chevronVariants(0.15)}>
              <ChevronDown className="w-5 h-5 text-white/30" />
            </motion.div>
          </div>
        </button>
      </section>
    </>
  );
}
