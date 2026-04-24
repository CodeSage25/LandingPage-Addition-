// components/sections/WinnersGallery.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WinnersGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isTitleInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="winners"
      className="relative py-24 overflow-hidden"
      style={{ background: "#f8f9f4" }}
    >
      {/* ── Fond décoratif ─────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #29783B, transparent)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #F47820, transparent)",
          }}
        />
      </div>

      <div className="container-main relative z-10">
        {/* ── En-tête ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isTitleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="
              inline-flex items-center gap-2
              bg-orange-vif/10 border border-orange-vif/20
              text-orange-vif font-inter text-sm
              px-4 py-1.5 rounded-full mb-4
            "
          >
            <span></span>
            <span>Hall of Fame</span>
          </motion.div>

          {/* Titre */}
          <h2 className="section-title text-vert-fonce mb-4">
            Nos Futurs Gagnants
          </h2>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-inter text-gray-500 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Soyez parmi les{" "}
            <span className="font-poppins font-bold ">premiers gagnants</span>{" "}
            et voyez votre ticket affiché ici.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isTitleInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="w-20 h-1 bg-orange-vif mx-auto mt-6 rounded-full origin-left"
          />
        </motion.div>

        {/* ── Bannière principale "Bientôt" ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="
            relative overflow-hidden
            rounded-3xl
            p-10 md:p-16
            text-center
          "
          style={{
            background:
              "linear-gradient(135deg, #29783B 0%, #1a4f25 50%, #29783B 100%)",
          }}
        >
          {/* Motif trèfles fond */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ctext x='50%25' y='50%25' font-size='28' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🍀%3C/text%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Halos lumineux */}
          <div
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "#74A641" }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "#F47820" }}
          />

          {/* Contenu */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Trèfle animé */}
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-6xl md:text-7xl"
            >
              🍀
            </motion.div>

            {/* Titre + description */}
            <div>
              <h3
                className="
                  font-poppins font-black
                  text-3xl md:text-5xl
                  text-white leading-tight mb-3
                "
              >
                Bientôt disponible
              </h3>
              <p
                className="
                  font-inter text-base md:text-lg
                  max-w-lg mx-auto leading-relaxed
                "
                style={{ color: "rgba(255,255,255,0.70)" }}
              >
                Les tickets de nos premiers gagnants apparaîtront ici. Composez
                le{" "}
                <span className="font-poppins font-bold text-white">
                  #150*52#
                </span>{" "}
                et tentez d&apos;être le premier affiché !
              </p>
            </div>

            {/* CTA */}
            <motion.a
              href="tel:#150*52%23"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 16px 48px rgba(244,120,32,0.6)",
              }}
              whileTap={{ scale: 0.97 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="
                inline-flex items-center gap-3
                bg-orange-vif text-white
                font-poppins font-black
                text-base md:text-lg
                px-10 py-4 rounded-2xl
                shadow-2xl
              "
              style={{ boxShadow: "0 8px 32px rgba(244,120,32,0.5)" }}
            >
              <span>🍀</span>
              <span>Être le premier gagnant</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
