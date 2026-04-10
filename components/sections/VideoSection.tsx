// components/sections/VideoSection.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useVideoSound } from "@/hooks/useVideoSound";

// ── Icône son OFF ──────────────────────────────────────────────────
function IconMuted() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

// ── Icône son ON ───────────────────────────────────────────────────
function IconUnmuted() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

// ── Icône Play ─────────────────────────────────────────────────────
function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

// ── Icône Pause ────────────────────────────────────────────────────
function IconPause() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

// ── Composant principal ────────────────────────────────────────────
export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { videoRef, isMuted, isPlaying, toggleSound, togglePlay } =
    useVideoSound();

  return (
    <section
      ref={sectionRef}
      id="video"
      className="relative py-24 overflow-hidden"
      style={{ background: "#111111" }}
    >
      {/* ── Fond étoilé décoratif ───────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Points lumineux aléatoires */}
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.4 + 0.1,
            }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Halos verts flous */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl"
          style={{
            background: "radial-gradient(circle, #74A641, transparent)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full
                     opacity-[0.06] blur-3xl"
          style={{
            background: "radial-gradient(circle, #F47820, transparent)",
          }}
        />
      </div>

      <div className="container-main relative z-10">
        {/* ── Titre ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="
              inline-flex items-center gap-2
              bg-vert-fonce/30 border border-vert-moyen/30
              text-vert-moyen font-inter text-sm
              px-4 py-1.5 rounded-full mb-4
            "
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              🍀
            </motion.span>
            <span>L&apos;univers du jeu</span>
          </motion.div>

          <h2 className="section-title text-white mb-3">
            L&apos;univers{" "}
            <span
              className="font-poppins font-black italic"
              style={{
                background: "linear-gradient(135deg, #74A641, #29783B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Là Là Là
            </span>
          </h2>

          <p className="font-inter text-white/50 text-lg max-w-md mx-auto">
            Plongez dans l&apos;ambiance unique du jeu qui fait gagner des
            milliers de parieurs chaque jour.
          </p>
        </motion.div>

        {/* ── Conteneur vidéo ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
        >
          {/* ── Bordure lumineuse verte animée (CSS keyframe) ────── */}

          {/* ── Wrapper vidéo ─────────────────────────────────────── */}
          <div className="relative z-10 rounded-2xl overflow-hidden bg-black">
            {/* Vidéo */}
            <video
              ref={videoRef}
              src="/videos/lala.mp4"
              autoPlay
              loop
              muted // obligatoire pour autoplay
              playsInline // iOS : lecture inline (pas fullscreen forcé)
              className="w-full aspect-video object-cover"
              aria-label="Animation Là Là Là"
            />

            {/* ── Overlay gradient bas (dégradé sur la vidéo) ───── */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
              }}
            />

            {/* ── Bouton Play/Pause centré ───────────────────────── */}
            <motion.button
              onClick={togglePlay}
              aria-label={isPlaying ? "Mettre en pause" : "Lancer la vidéo"}
              className="
                absolute inset-0 flex items-center justify-center
                group cursor-pointer
              "
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isPlaying ? 0 : 1,
                  scale: isPlaying ? 0.8 : 1,
                }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="
                  w-16 h-16 rounded-full
                  bg-white/20 backdrop-blur-sm
                  border border-white/40
                  flex items-center justify-center
                  text-white
                  group-hover:bg-white/30
                  transition-colors duration-200
                "
              >
                {isPlaying ? <IconPause /> : <IconPlay />}
              </motion.div>
            </motion.button>

            {/* ── Bouton Toggle Son (coin bas droite) ───────────── */}
            <div className="absolute bottom-4 right-4 z-20">
              <motion.button
                onClick={toggleSound}
                aria-label={isMuted ? "Activer le son" : "Couper le son"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="
                  flex items-center gap-2
                  bg-black/60 backdrop-blur-sm
                  border border-white/20
                  text-white
                  px-3 py-2 rounded-full
                  font-inter text-xs
                  transition-colors duration-200
                  hover:bg-black/80
                "
              >
                {/* Icône animée au toggle */}
                <motion.span
                  key={isMuted ? "muted" : "unmuted"}
                  initial={{ scale: 0.5, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {isMuted ? <IconMuted /> : <IconUnmuted />}
                </motion.span>
                <span>{isMuted ? "Son OFF" : "Son ON"}</span>
              </motion.button>
            </div>

            {/* ── Badge LIVE coin haut gauche ────────────────────── */}
            <div className="absolute top-4 left-4 z-20">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="
                  flex items-center gap-1.5
                  bg-red-600/80 backdrop-blur-sm
                  text-white font-poppins font-bold text-xs
                  px-2.5 py-1 rounded-full
                "
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                LIVE
              </motion.div>
            </div>
          </div>
          {/* fin wrapper vidéo */}
        </motion.div>

        {/* ── Stats sous la vidéo ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="
            flex flex-wrap justify-center gap-8 mt-12
          "
        >
          {[
            { value: "15 000 000", label: "FCFA Jackpot max", icon: "" },
            { value: "100 FCFA", label: "Mise minimum", icon: "" },
            { value: "#150*52#", label: "Code d'accès Orange", icon: "" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.12 }}
              className="
                flex flex-col items-center gap-1
                text-center
              "
            >
              <span className="text-2xl mb-1">{stat.icon}</span>
              <span className="font-poppins font-black text-xl text-white italic">
                {stat.value}
              </span>
              <span className="font-inter text-white/40 text-xs uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Transition vers section suivante ───────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 50"
          className="w-full h-10 sm:h-14"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 C480,60 960,0 1440,30 L1440,50 L0,50 Z"
            fill="#29783B"
          />
        </svg>
      </div>
    </section>
  );
}
