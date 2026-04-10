// components/layout/Footer.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import type { Variants } from "framer-motion";

// ══════════════════════════════════════════════════════════════════
// ICÔNES SVG — Pas de dépendance externe
// ══════════════════════════════════════════════════════════════════

function IconFacebook() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// Logo Orange Money placeholder
function LogoOrangeMoney() {
  return (
    <div
      className="
        flex items-center gap-2
        bg-white/10 border border-white/20
        rounded-xl px-4 py-2.5
      "
    >
      <div className="w-8 h-8 rounded-full bg-[#F47820] flex items-center justify-center">
        <span className="text-white font-poppins font-black text-xs">OM</span>
      </div>
      <div>
        <p className="font-poppins font-bold text-white text-xs leading-tight">
          Orange Money
        </p>
        <p className="font-inter text-white/50 text-[10px]">
          Partenaire officiel
        </p>
      </div>
    </div>
  );
}

// Logo PMUC placeholder
function LogoPMUC() {
  return (
    <div
      className="
        flex items-center gap-2
        bg-white/10 border border-white/20
        rounded-xl px-4 py-2.5
      "
    >
      <div className="w-8 h-8 rounded-xl bg-[#E7177E] flex items-center justify-center">
        <span className="text-white font-poppins font-black text-xs">PM</span>
      </div>
      <div>
        <p className="font-poppins font-bold text-white text-xs leading-tight">
          PMUC
        </p>
        <p className="font-inter text-white/50 text-[10px]">
          Pari Mutuel Urbain Camerounais
        </p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// VARIANTS
// ══════════════════════════════════════════════════════════════════

const colVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: "easeOut" as const,
    },
  }),
};
// ══════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL FOOTER
// ══════════════════════════════════════════════════════════════════

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-40px" });

  // Liens qui scrollent vers le simulateur USSD
  const handleSimulatorLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const simulator = document.getElementById("simulator");
    simulator?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #29783B, #1a4f25)",
      }}
    >
      {/* ════════════════════════════════════════════════════════
          VAGUE SVG SÉPARATRICE (haut du footer)
      ════════════════════════════════════════════════════════ */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden leading-none"
        style={{ transform: "translateY(-99%)" }}
      >
        <svg
          viewBox="0 0 1440 80"
          className="w-full h-16 sm:h-20"
          preserveAspectRatio="none"
        >
          {/* Vague arrière */}
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,50 L1440,80 L0,80 Z"
            fill="rgba(41,120,59,0.4)"
          />
          {/* Vague avant */}
          <path
            d="M0,55 C300,15 600,70 900,40 C1100,20 1300,60 1440,35 L1440,80 L0,80 Z"
            fill="#29783B"
          />
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOTIF DÉCORATIF FOND
      ════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Halos lumineux */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.06] blur-3xl"
          style={{
            background: "radial-gradient(circle, #74A641, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-[0.05] blur-3xl"
          style={{
            background: "radial-gradient(circle, #F47820, transparent)",
          }}
        />
        {/* Grille subtile */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ════════════════════════════════════════════════════════
          CONTENU PRINCIPAL — 3 COLONNES
      ════════════════════════════════════════════════════════ */}
      <div className="container-main relative z-10 pt-20 pb-10">
        <div
          className="
            grid grid-cols-1 md:grid-cols-3
            gap-12 md:gap-8 lg:gap-16
            mb-16
          "
        >
          {/* ── COLONNE 1 : Logo + Tagline ───────────────────── */}
          <motion.div
            custom={0}
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center md:items-start gap-6"
          >
            {/* Logo image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <Image
                src="/images/logo-lala.jpeg"
                alt="Logo Là Là Là"
                width={120}
                height={120}
                className="object-contain drop-shadow-lg"
              />
            </motion.div>

            {/* Tagline */}
            <p className="font-inter text-white/70 text-sm leading-relaxed text-center md:text-left max-w-xs">
              Le jeu qui additionne vos chances.
              <br />
              <span className="text-white/50 text-xs">
                Composez le #150*52# sur Orange Money.
              </span>
            </p>

            {/* Pill mise en avant */}
            <div
              className="
                flex items-center gap-2
                bg-orange-vif/20 border border-orange-vif/30
                text-white font-poppins font-bold text-sm
                px-4 py-2 rounded-full
              "
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ⭐
              </motion.span>
              <span>Jackpot jusqu&apos;à 15 000 000 FCFA</span>
            </div>

            {/* Mise rapide info */}
            <div className="flex gap-2">
              {["100", "200", "400"].map((mise) => (
                <div
                  key={mise}
                  className="
                    bg-white/10 border border-white/15
                    text-white font-poppins font-bold text-xs
                    px-3 py-1.5 rounded-full
                    text-center
                  "
                >
                  {mise} FCFA
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── COLONNE 2 : Liens navigation ─────────────────── */}
          <motion.div
            custom={1}
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center md:items-start gap-6"
          >
            {/* Titre colonne */}
            <div>
              <h3 className="font-poppins font-black text-white text-lg mb-1">
                Le Jeu
              </h3>
              <div className="w-8 h-0.5 bg-orange-vif rounded-full" />
            </div>

            {/* Liens */}
            <nav className="flex flex-col gap-1 w-full">
              {[
                {
                  label: "📱 Jouer maintenant",
                  href: "tel:*150*52%23",
                  isPhone: true,
                  highlight: true,
                },
                {
                  label: "ℹ️ En Savoir Plus",
                  href: "#simulator",
                  isPhone: false,
                  highlight: false,
                },
                {
                  label: "📋 Termes & Conditions",
                  href: "#simulator",
                  isPhone: false,
                  highlight: false,
                },
                {
                  label: "🎫 Vérifier mon Ticket",
                  href: "#simulator",
                  isPhone: false,
                  highlight: false,
                },
                {
                  label: "🏆 Tableau des Gains",
                  href: "#simulator",
                  isPhone: false,
                  highlight: false,
                },
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  onClick={!link.isPhone ? handleSimulatorLink : undefined}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    flex items-center gap-3
                    font-inter text-sm
                    py-2.5 px-3 rounded-xl
                    transition-colors duration-200
                    group
                    ${
                      link.highlight
                        ? "bg-orange-vif/15 border border-orange-vif/25 text-white font-semibold hover:bg-orange-vif/25"
                        : "text-white/70 hover:text-white hover:bg-white/8"
                    }
                  `}
                >
                  <span>{link.label}</span>
                  <span
                    className="
                      ml-auto opacity-0 group-hover:opacity-100
                      transition-opacity text-xs
                    "
                  >
                    →
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Code USSD mis en avant */}
            <motion.a
              href="tel:*150*52%23"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                w-full text-center
                bg-vert-moyen/30 border border-vert-moyen/40
                text-white font-poppins font-black text-xl
                py-4 rounded-2xl
                tracking-wider
                hover:bg-vert-moyen/50
                transition-colors duration-200
              "
            >
              #150*52#
            </motion.a>
          </motion.div>

          {/* ── COLONNE 3 : Réseaux + Partenaires ────────────── */}
          <motion.div
            custom={2}
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center md:items-start gap-6"
          >
            {/* Titre colonne */}
            <div>
              <h3 className="font-poppins font-black text-white text-lg mb-1">
                Communauté
              </h3>
              <div className="w-8 h-0.5 bg-orange-vif rounded-full" />
            </div>

            {/* Facebook */}
            <div className="flex flex-col gap-3 w-full">
              <p className="font-inter text-white/50 text-xs uppercase tracking-wider">
                Suivez-nous
              </p>
              <motion.a
                href="https://www.facebook.com/lalalacm"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="
                  flex items-center gap-3
                  bg-[#1877F2]/20 border border-[#1877F2]/30
                  text-white
                  px-4 py-3 rounded-xl
                  hover:bg-[#1877F2]/35
                  transition-colors duration-200
                  group
                "
              >
                <div
                  className="
                    w-9 h-9 rounded-full bg-[#1877F2]
                    flex items-center justify-center
                    text-white flex-shrink-0
                    group-hover:scale-110
                    transition-transform duration-200
                  "
                >
                  <IconFacebook />
                </div>
                <div>
                  <p className="font-poppins font-bold text-sm">
                    Là Là Là Officiel
                  </p>
                  <p className="font-inter text-white/50 text-xs">
                    Facebook · Suivre
                  </p>
                </div>
                <span className="ml-auto text-white/30 text-xs">→</span>
              </motion.a>
            </div>

            {/* Partenaires */}
            <div className="flex flex-col gap-3 w-full">
              <p className="font-inter text-white/50 text-xs uppercase tracking-wider">
                Partenaires officiels
              </p>
              <div className="flex flex-col gap-2">
                <LogoOrangeMoney />
                <LogoPMUC />
              </div>
            </div>

            {/* Mention jeu responsable */}
            <div
              className="
                bg-white/5 border border-white/10
                rounded-xl px-4 py-3
                text-center md:text-left
              "
            >
              <p className="font-inter text-white/40 text-xs leading-relaxed">
                Jeu responsable · Jouez raisonnablement. +21.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════
            SÉPARATEUR + COPYRIGHT
        ════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Ligne séparatrice avec trèfles */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/10" />
            <div className="flex gap-3 text-white/20 text-sm">
              <span>🍀</span>
              <span>🍀</span>
              <span>🍀</span>
            </div>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Copyright + infos légales */}
          <div
            className="
              flex flex-col sm:flex-row
              items-center justify-between
              gap-4
              text-center sm:text-left
            "
          >
            <p className="font-inter text-white/40 text-sm">
              © 2026 Là Là Là ·
            </p>

            <div className="flex items-center gap-4">
              <span className="font-inter text-white/30 text-xs">Cameroun</span>
              <span className="text-white/20">·</span>
              <span className="font-inter text-white/30 text-xs">
                Powered by Orange Money
              </span>
              <span className="text-white/20">·</span>
              {/* Petit trèfle animé en copyright */}
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="text-vert-moyen text-sm"
              >
                🍀
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
