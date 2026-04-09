// components/sections/HowToPlay.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SMSTypewriter from "@/components/ui/SMSTypewriter";

// ── Données des étapes ─────────────────────────────────────────────
const STEPS = [
  {
    id: 1,
    emoji: "📱",
    title: "Composez",
    description: "Composez le #150*52# sur votre téléphone Orange",
    highlight: "#150*52#",
    color: "from-white/10 to-white/5",
    border: "border-white/20",
  },
  {
    id: 2,
    emoji: "🎮",
    title: "Choisissez",
    description: 'Sélectionnez "Jeux Là Là Là" dans le menu Gaming & Lotto',
    highlight: "Jeux Là Là Là",
    color: "from-white/10 to-white/5",
    border: "border-white/20",
  },
  {
    id: 3,
    emoji: "💰",
    title: "Misez",
    description:
      "Choisissez votre mise : 100, 200 ou 400 FCFA selon votre budget",
    highlight: "100 / 200 / 400 FCFA",
    color: "from-orange-vif/20 to-orange-vif/5",
    border: "border-orange-vif/30",
  },
  {
    id: 4,
    emoji: "➕",
    title: "Additionnez",
    description: "Recevez 5 numéros par SMS, additionnez-les et gagnez !",
    highlight: "5 numéros par SMS",
    color: "from-sable/20 to-sable/5",
    border: "border-sable/30",
  },
];

// ── Variants Framer Motion ─────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stepVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const dividerVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
  },
};

// ── Composant StepCard ─────────────────────────────────────────────
function StepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  return (
    <motion.div
      variants={stepVariants}
      className={`
        relative flex flex-col gap-4
        bg-gradient-to-br ${step.color}
        border ${step.border}
        rounded-2xl p-6
        backdrop-blur-sm
        group
        cursor-default
      `}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      {/* Numéro d'étape */}
      <div
        className="
          absolute -top-3 -left-3
          w-8 h-8 rounded-full
          bg-orange-vif text-white
          font-poppins font-black text-sm
          flex items-center justify-center
          shadow-lg
        "
      >
        {index + 1}
      </div>

      {/* Emoji */}
      <motion.div
        className="text-4xl"
        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
      >
        {step.emoji}
      </motion.div>

      {/* Titre */}
      <h3 className="font-poppins font-black text-xl text-white">
        {step.title}
      </h3>

      {/* Description */}
      <p className="font-inter text-white/80 text-sm leading-relaxed">
        {step.description}
      </p>

      {/* Highlight pill */}
      <div
        className="
          inline-flex self-start
          bg-white/10 border border-white/20
          text-white font-poppins font-bold text-xs
          px-3 py-1.5 rounded-full
          mt-auto
        "
      >
        {step.highlight}
      </div>

      {/* Flèche connecteur (pas sur le dernier) */}
      {index < STEPS.length - 1 && (
        <div
          className="
            hidden lg:flex
            absolute -right-4 top-1/2 -translate-y-1/2
            z-10 text-white/40 text-xl
          "
        >
          →
        </div>
      )}
    </motion.div>
  );
}

// ── Composant principal ────────────────────────────────────────────
export default function HowToPlay() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const smsRef = useRef<HTMLDivElement>(null);

  // Déclenche les animations quand la section est visible
  const isStepsInView = useInView(stepsRef, { once: true, margin: "-80px" });
  const isSmsInView = useInView(smsRef, { once: true, margin: "-80px" });
  const isTitleInView = useInView(sectionRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      id="how-to-play"
      className="relative overflow-hidden py-24"
      style={{
        background: "linear-gradient(to bottom, #29783B, #74A641)",
      }}
    >
      {/* ── Motif décoratif arrière-plan ──────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cercles décoratifs flous */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #CEAA74, transparent)",
          }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #7CBEE9, transparent)",
          }}
        />
        {/* Grille subtile */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-main relative z-10">
        {/* ── Titre section ──────────────────────────────────────── */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isTitleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="
              inline-flex items-center gap-2
              bg-white/10 border border-white/20
              text-white/80 font-inter text-sm
              px-4 py-1.5 rounded-full mb-4
            "
          >
            <span>Simple comme bonjour</span>
          </motion.div>

          <h2 className="section-title text-white mb-4">Comment jouer ?</h2>

          <p className="font-inter text-white/70 text-lg max-w-xl mx-auto">
            En 4 étapes simples, tentez de remporter jusqu&apos;à{" "}
            <span className="font-poppins font-black text-orange-vif">
              15 000 000 FCFA
            </span>
          </p>

          {/* Divider animé */}
          <motion.div
            variants={dividerVariants}
            initial="hidden"
            animate={isTitleInView ? "visible" : "hidden"}
            className="w-24 h-1 bg-orange-vif mx-auto mt-6 rounded-full origin-left"
          />
        </motion.div>

        {/* ── Grid des 4 étapes ─────────────────────────────────── */}
        <div ref={stepsRef}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isStepsInView ? "visible" : "hidden"}
            className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
              gap-6 lg:gap-8
              mb-20
            "
          >
            {STEPS.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </motion.div>
        </div>

        {/* ── Séparateur ────────────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-white/50 font-inter text-sm px-4">
            Exemple en temps réel
          </span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* ── Section SMS Typewriter ─────────────────────────────── */}
        <div ref={smsRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isSmsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="
              flex flex-col lg:flex-row
              items-center gap-12 lg:gap-20
            "
          >
            {/* Texte explicatif gauche */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-poppins font-black text-2xl sm:text-3xl text-white mb-4">
                Recevez vos résultats{" "}
                <span className="text-orange-vif">par SMS</span>
              </h3>
              <p className="font-inter text-white/70 leading-relaxed mb-6">
                Après chaque mise, vous recevez instantanément vos 5 numéros.
                Additionnez-les et découvrez si vous êtes gagnant !
              </p>

              {/* Infos mise rapide */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  { mise: "100", jackpot: "1 000 000" },
                  { mise: "200", jackpot: "2 000 000" },
                  { mise: "400", jackpot: "15 000 000" },
                ].map((item) => (
                  <div
                    key={item.mise}
                    className="
                      bg-white/10 border border-white/20
                      rounded-xl px-4 py-3
                      text-center
                    "
                  >
                    <p className="text-white/60 font-inter text-xs mb-1">
                      Mise
                    </p>
                    <p className="font-poppins font-black text-white text-lg">
                      {item.mise}
                      <span className="text-xs font-inter font-normal ml-1">
                        FCFA
                      </span>
                    </p>
                    <p className="text-white font-poppins font-bold text-xs mt-1">
                      Jackpot : {item.jackpot} FCFA
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SMS Typewriter droite */}
            <div className="flex-1 w-full max-w-sm">
              <SMSTypewriter />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Vague de transition vers section suivante ─────────────── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-12 sm:h-16"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z"
            fill="rgba(206,170,116,0.15)"
          />
          <path
            d="M0,50 C480,10 960,50 1440,30 L1440,60 L0,60 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
