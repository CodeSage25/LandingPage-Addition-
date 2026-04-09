// components/sections/GroupSection.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function GroupSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="group"
      className="relative overflow-hidden bg-neutral-950 text-white"
    >
      {/* ── Fond ambiant ───────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-neutral-950 to-neutral-950" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* ── Contenu ────────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* ════════════════════════════════════════════════════════
              COLONNE GAUCHE — Texte + CTA
          ════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            {/* Badge */}
            <div
              className="
              inline-flex items-center gap-2
              rounded-full border border-white/10
              bg-white/5 px-4 py-2 backdrop-blur
            "
            >
              <span
                className="
                inline-flex h-8 w-8 items-center justify-center
                rounded-full bg-emerald-400/10
                text-emerald-200 ring-1 ring-emerald-300/10
                text-base
              "
              >
                🍀
              </span>
              <span className="font-inter text-xs font-medium text-white/80">
                Rejoignez les gagnants
              </span>
            </div>

            {/* Titre */}
            <h2
              className="
              mt-5 font-poppins font-semibold
              text-3xl tracking-tight text-white
            "
            >
              Le groupe des gagnants,{" "}
              <span className="text-orange-vif">en toute clarté</span>
            </h2>

            {/* Description */}
            <p className="mt-3 font-inter text-sm leading-relaxed text-white/70">
              Rejoignez la communauté des gagnants Là Là Là. Chaque jour, des
              abonnés Orange remportent des gains instantanés en composant
              simplement le{" "}
              <span className="font-poppins font-bold text-white">
                #150*52#
              </span>
              .
            </p>

            {/* Key points */}
            <div className="mt-6 grid gap-3">
              {[
                {
                  icon: "🏆",
                  title: "Gains immédiats",
                  desc: "Résultat instantané par SMS après chaque mise.",
                },
                {
                  icon: "🔒",
                  title: "Paiement sécurisé",
                  desc: "Transactions protégées via Orange Money.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                  className="
                    flex items-start gap-3
                    rounded-2xl border border-white/10
                    bg-white/5 p-4
                  "
                >
                  <span
                    className="
                    mt-0.5 inline-flex h-9 w-9 flex-shrink-0
                    items-center justify-center
                    rounded-xl bg-white/5
                    ring-1 ring-white/10 text-lg
                  "
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-poppins font-semibold text-sm text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 font-inter text-xs text-white/70">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="
                mt-7 rounded-3xl
                border border-white/10
                bg-gradient-to-b from-white/[0.07] to-white/[0.04]
                p-5 backdrop-blur
              "
            >
              <div
                className="
                flex flex-col gap-4
                sm:flex-row sm:items-center sm:justify-between
              "
              >
                {/* Info code */}
                <div className="min-w-0">
                  <p className="font-inter text-xs font-medium text-white/60">
                    Composez
                  </p>
                  <p className="mt-1 font-poppins text-lg font-semibold tracking-tight text-white">
                    #150*52#
                  </p>
                  <p className="mt-1 font-inter text-xs text-white/60">
                    Abonnés Orange uniquement
                  </p>
                </div>

                {/* Bouton */}
                <motion.a
                  href="tel:*150*52%23"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    inline-flex items-center justify-center gap-3
                    rounded-full bg-orange-vif
                    px-6 py-3
                    font-poppins text-sm font-semibold text-white
                    shadow-lg shadow-orange-500/20
                    ring-1 ring-orange-300/20
                    transition-colors duration-200
                    hover:brightness-110
                  "
                >
                  <span
                    className="
                    inline-flex h-8 w-8 items-center justify-center
                    rounded-full bg-white/15
                    ring-1 ring-white/20 text-base
                  "
                  >
                    ▶
                  </span>
                  <span>Jouer maintenant</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════
              COLONNE DROITE — Carte image
          ════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div
              className="
              relative overflow-hidden
              rounded-3xl border border-white/10
              bg-white/5 shadow-2xl shadow-black/40
            "
            >
              {/* ── Zone image ──────────────────────────────────── */}
              <div className="relative aspect-[16/10] w-full">
                {/* Gradient derrière */}
                <div
                  className="
                  absolute inset-0
                  bg-gradient-to-br from-emerald-500/10
                  via-transparent to-orange-500/10
                "
                />

                {/* Image — pleine zone, sans cadre intérieur */}
                <Image
                  src="/images/groupe.webp"
                  alt="Gagnants Là Là Là — 15 000 000 FCFA"
                  fill
                  quality={90}
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 58vw"
                  priority={false}
                />

                {/* Vignette légère */}
                <div
                  className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-t from-neutral-950/35
                  via-transparent to-neutral-950/10
                "
                />

                {/* Caption bas */}
              </div>
              {/* fin zone image */}

              {/* Footer micro */}
              <div
                className="
                flex items-center justify-between gap-3
                border-t border-white/10
                px-6 py-4
                font-inter text-xs text-white/60
              "
              >
                <div className="flex items-center gap-2">
                  <span>Là Là Là · Orange Money · PMUC</span>
                </div>
                <span className="text-white/40">Cameroun </span>
              </div>
            </div>

            {/* Note bas */}
            <p className="mt-4 font-inter text-xs text-white/55">
              En partenariat avec Orange Money &amp; PMUC · Abonnés Orange
              uniquement
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
