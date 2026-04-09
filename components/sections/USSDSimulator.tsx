// components/sections/USSDSimulator.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { gainsData, formatFCFA, type MiseType } from "@/lib/gains";

// ══════════════════════════════════════════════════════════════════
// TYPES & STATE MACHINE
// ══════════════════════════════════════════════════════════════════

type ScreenId =
  | "home"
  | "jeux-lala"
  | "addition-100"
  | "addition-200"
  | "addition-400"
  | "jouer-100"
  | "jouer-200"
  | "jouer-400"
  | "resultats"
  | "gains-100"
  | "gains-200"
  | "gains-400"
  | "verifier"
  | "en-savoir-plus"
  | "termes"
  | "solde-insuffisant";

interface Screen {
  id: ScreenId;
  title: string;
  content: React.ReactNode;
}

// ══════════════════════════════════════════════════════════════════
// COMPOSANTS UI USSD
// ══════════════════════════════════════════════════════════════════

// En-tête écran USSD
function USSDHeader({ title }: { title: string }) {
  return (
    <div
      className="
        bg-vert-fonce text-white
        px-4 py-3
        border-b-2 border-orange-vif
      "
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">🍀</span>
        <div>
          <p className="font-poppins font-black text-sm leading-tight">
            {title}
          </p>
          <p className="font-inter text-white/60 text-[10px]">
            Là Là Là · Orange Money
          </p>
        </div>
      </div>
    </div>
  );
}

// Option de menu cliquable
function USSDOption({
  number,
  label,
  onClick,
  highlight = false,
}: {
  number: string | number;
  label: string;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97, backgroundColor: "rgba(41,120,59,0.1)" }}
      whileHover={{ backgroundColor: "rgba(41,120,59,0.05)" }}
      className={`
        w-full text-left px-4 py-3
        flex items-center gap-3
        border-b border-gray-100
        transition-colors duration-150
        ${highlight ? "bg-orange-vif/5" : ""}
      `}
    >
      <span
        className={`
          w-7 h-7 rounded-full flex items-center justify-center
          font-poppins font-bold text-sm flex-shrink-0
          ${
            highlight
              ? "bg-orange-vif text-white"
              : "bg-vert-fonce/10 text-vert-fonce"
          }
        `}
      >
        {number}
      </span>
      <span
        className={`
          font-inter text-sm
          ${highlight ? "text-orange-vif font-semibold" : "text-gray-700"}
        `}
      >
        {label}
      </span>
    </motion.button>
  );
}

// Bouton retour
function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="
        flex items-center gap-2
        text-vert-fonce font-inter text-xs font-semibold
        px-4 py-2 mt-auto
        border-t border-gray-200 w-full
        hover:bg-gray-50 transition-colors
      "
    >
      <span>←</span>
      <span>Retour</span>
    </motion.button>
  );
}

// Message USSD informatif
function USSDMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-3 bg-blue-50 border-l-3 border-bleu-ciel mx-4 mt-3 rounded-r-lg">
      <p className="font-inter text-xs text-gray-700 leading-relaxed">
        {children}
      </p>
    </div>
  );
}
// ══════════════════════════════════════════════════════════════════
// TABLEAU DES GAINS — Composant
// ══════════════════════════════════════════════════════════════════

function GainsTable({ mise, onBack }: { mise: MiseType; onBack: () => void }) {
  const rows = gainsData[mise];

  return (
    <div className="flex flex-col h-full">
      <USSDHeader title={`Tableau — Addition ${mise}`} />

      <div className="flex-1 overflow-y-auto px-3 py-2">
        {/* Label colonne */}
        <div className="flex justify-between px-2 py-1 mb-1">
          <span className="font-poppins font-bold text-[10px] text-gray-400 uppercase tracking-wide">
            Somme
          </span>
          <span className="font-poppins font-bold text-[10px] text-gray-400 uppercase tracking-wide">
            Gain
          </span>
        </div>

        {rows.map((row, i) => (
          <motion.div
            key={row.somme}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className={`
              flex items-center justify-between
              px-3 py-2 rounded-lg mb-1
              ${
                row.isJackpot
                  ? "bg-gradient-to-r from-orange-vif/15 to-yellow-400/10 border border-orange-vif/30"
                  : i % 2 === 0
                    ? "bg-gray-50"
                    : "bg-white"
              }
            `}
          >
            {/* Somme */}
            <div className="flex items-center gap-2">
              {row.isJackpot && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm"
                >
                  ⭐
                </motion.span>
              )}
              <span
                className={`
                  font-poppins font-black text-base
                  ${row.isJackpot ? "text-orange-vif" : "text-gray-800"}
                `}
              >
                {row.somme}
              </span>
              {row.isJackpot && (
                <span className="font-inter text-[9px] bg-orange-vif text-white px-1.5 py-0.5 rounded-full font-bold">
                  JACKPOT
                </span>
              )}
            </div>

            {/* Gain */}
            <motion.span
              animate={
                row.isJackpot
                  ? {
                      color: ["#F47820", "#FFB347", "#F47820"],
                      textShadow: [
                        "0 0 5px rgba(244,120,32,0.3)",
                        "0 0 15px rgba(244,120,32,0.6)",
                        "0 0 5px rgba(244,120,32,0.3)",
                      ],
                    }
                  : {}
              }
              transition={
                row.isJackpot ? { duration: 2, repeat: Infinity } : {}
              }
              className={`
                font-poppins font-black text-sm italic
                ${row.isJackpot ? "text-orange-vif" : "text-vert-fonce"}
              `}
            >
              {formatFCFA(row.gain)}
            </motion.span>
          </motion.div>
        ))}
      </div>

      <BackButton onClick={onBack} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ÉCRAN JOUER — Confirmation paiement
// ══════════════════════════════════════════════════════════════════

function JouerScreen({
  mise,
  onBack,
  onInsufficientBalance,
}: {
  mise: MiseType;
  onBack: () => void;
  onInsufficientBalance: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <USSDHeader title="Confirmation" />

      <div className="flex-1 px-4 py-4 flex flex-col gap-4">
        {/* Détail paiement */}
        <div className="bg-vert-fonce/5 border border-vert-fonce/20 rounded-xl p-4">
          <p className="font-inter text-xs text-gray-500 mb-3">
            Validez votre paiement Orange Money
          </p>
          <div className="flex justify-between items-center mb-2">
            <span className="font-inter text-sm text-gray-600">Jeu</span>
            <span className="font-poppins font-bold text-sm text-gray-800">
              Là Là Là
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-inter text-sm text-gray-600">Montant</span>
            <span className="font-poppins font-black text-lg text-orange-vif">
              {mise} FCFA
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-inter text-sm text-gray-600">
              Jackpot possible
            </span>
            <span className="font-poppins font-bold text-sm text-vert-fonce">
              {formatFCFA(gainsData[mise][0].gain)}
            </span>
          </div>
        </div>

        {/* Boutons */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="
            w-full bg-vert-fonce text-white
            font-poppins font-bold text-sm
            py-3 rounded-xl
            shadow-md
          "
        >
          ✓ Confirmer le paiement
        </motion.button>

        <motion.button
          onClick={onInsufficientBalance}
          whileTap={{ scale: 0.97 }}
          className="
            w-full border border-gray-300 text-gray-600
            font-inter text-sm
            py-3 rounded-xl
          "
        >
          Solde insuffisant ?
        </motion.button>
      </div>

      <BackButton onClick={onBack} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SIMULATEUR PRINCIPAL
// ══════════════════════════════════════════════════════════════════

export default function USSDSimulator() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>("home");
  const [history, setHistory] = useState<ScreenId[]>([]);
  const [selectedMise, setSelectedMise] = useState<MiseType>(100);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Navigation vers un nouvel écran
  const navigate = (screen: ScreenId, mise?: MiseType) => {
    setHistory((prev) => [...prev, currentScreen]);
    if (mise) setSelectedMise(mise);
    setCurrentScreen(screen);
  };

  // Retour arrière
  const goBack = () => {
    const prev = history[history.length - 1];
    if (prev) {
      setHistory((h) => h.slice(0, -1));
      setCurrentScreen(prev);
    }
  };

  // Reset complet
  const reset = () => {
    setHistory([]);
    setCurrentScreen("home");
  };

  // ── Contenu de chaque écran ──────────────────────────────────────
  const renderScreen = () => {
    switch (currentScreen) {
      // ─── ÉCRAN 0 : Accueil ────────────────────────────────────
      case "home":
        return (
          <div className="flex flex-col h-full">
            <USSDHeader title="Gaming & Lotto" />
            <USSDMessage>
              Bienvenue sur le menu Là Là Là.{"\n"}
              Veuillez sélectionner une option.
            </USSDMessage>
            <div className="flex-1 mt-2">
              <USSDOption
                number={1}
                label="Jeux Là Là Là"
                onClick={() => navigate("jeux-lala")}
                highlight
              />
              <USSDOption
                number={2}
                label="En Savoir Plus"
                onClick={() => navigate("en-savoir-plus")}
              />
              <USSDOption
                number={3}
                label="Termes & Conditions"
                onClick={() => navigate("termes")}
              />
            </div>
          </div>
        );

      // ─── ÉCRAN 1 : Jeux Là Là Là ─────────────────────────────
      case "jeux-lala":
        return (
          <div className="flex flex-col h-full">
            <USSDHeader title="Jeux Là Là Là" />
            <USSDMessage>
              Choisissez votre mise. Plus vous misez,{"\n"}
              plus le jackpot est élevé !
            </USSDMessage>
            <div className="flex-1 mt-2">
              <USSDOption
                number={1}
                label="Addition 100 FCFA — Jackpot 1M"
                onClick={() => navigate("addition-100", 100)}
              />
              <USSDOption
                number={2}
                label="Addition 200 FCFA — Jackpot 2M"
                onClick={() => navigate("addition-200", 200)}
              />
              <USSDOption
                number={3}
                label="Addition 400 FCFA — Jackpot 15M"
                onClick={() => navigate("addition-400", 400)}
                highlight
              />
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      // ─── ÉCRAN 2a/b/c : Addition 100 / 200 / 400 ─────────────
      case "addition-100":
      case "addition-200":
      case "addition-400": {
        const mise =
          currentScreen === "addition-100"
            ? 100
            : currentScreen === "addition-200"
              ? 200
              : 400;
        return (
          <div className="flex flex-col h-full">
            <USSDHeader title={`Addition ${mise} FCFA`} />
            <div className="flex-1 mt-2">
              <USSDOption
                number={1}
                label="Jouer"
                onClick={() => navigate(`jouer-${mise}` as ScreenId)}
                highlight
              />
              <USSDOption
                number={2}
                label="Résultats (dernier pari)"
                onClick={() => navigate("resultats")}
              />
              <USSDOption
                number={3}
                label="Tableau de Gains"
                onClick={() => navigate(`gains-${mise}` as ScreenId, mise)}
              />
              <USSDOption
                number={4}
                label="Vérifier Ticket"
                onClick={() => navigate("verifier")}
              />
            </div>
            <BackButton onClick={goBack} />
          </div>
        );
      }

      // ─── ÉCRAN 3a : Jouer ────────────────────────────────────
      case "jouer-100":
      case "jouer-200":
      case "jouer-400": {
        const mise =
          currentScreen === "jouer-100"
            ? 100
            : currentScreen === "jouer-200"
              ? 200
              : 400;
        return (
          <JouerScreen
            mise={mise as MiseType}
            onBack={goBack}
            onInsufficientBalance={() => navigate("solde-insuffisant")}
          />
        );
      }

      // ─── ÉCRAN 3b : Tableau de Gains ─────────────────────────
      case "gains-100":
        return <GainsTable mise={100} onBack={goBack} />;
      case "gains-200":
        return <GainsTable mise={200} onBack={goBack} />;
      case "gains-400":
        return <GainsTable mise={400} onBack={goBack} />;

      // ─── ÉCRAN : Résultats ────────────────────────────────────
      case "resultats":
        return (
          <div className="flex flex-col h-full">
            <USSDHeader title="Dernier Résultat" />
            <div className="flex-1 px-4 py-4">
              <div className="bg-vert-fonce/5 border border-vert-fonce/20 rounded-xl p-4 mb-3">
                <p className="font-inter text-xs text-gray-500 mb-2">
                  Ticket #633892281294
                </p>
                <div className="flex gap-2 mb-3">
                  {[6, 1, 4, 3, 7].map((n, i) => (
                    <div
                      key={i}
                      className="
                        w-9 h-9 rounded-full
                        bg-vert-fonce text-white
                        font-poppins font-black text-sm
                        flex items-center justify-center
                      "
                    >
                      {String(n).padStart(2, "0")}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-gray-600">
                    Total :
                  </span>
                  <span className="font-poppins font-black text-lg text-orange-vif">
                    21
                  </span>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                <p className="font-poppins font-bold text-green-700 text-sm">
                  🏆 Vous avez gagné 400 FCFA !
                </p>
              </div>
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      // ─── ÉCRAN : Vérifier Ticket ──────────────────────────────
      case "verifier":
        return (
          <div className="flex flex-col h-full">
            <USSDHeader title="Vérifier Ticket" />
            <div className="flex-1 px-4 py-4">
              <USSDMessage>
                Entrez votre numéro de ticket pour vérifier votre gain.
              </USSDMessage>
              <div className="mt-4 bg-gray-100 rounded-xl p-4 font-inter text-xs text-gray-500 text-center">
                [Saisie du numéro de ticket via clavier USSD]
              </div>
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      // ─── ÉCRAN : En Savoir Plus ───────────────────────────────
      case "en-savoir-plus":
        return (
          <div className="flex flex-col h-full">
            <USSDHeader title="En Savoir Plus" />
            <div className="flex-1 px-4 py-4 overflow-y-auto">
              <p className="font-inter text-xs text-gray-700 leading-relaxed">
                Le jeu Là Là Là est accessible à tous les abonnés Orange Côte
                d&apos;Ivoire.
                {"\n\n"}
                Composez <strong>#150*52#</strong>, misez entre 100 et 400 FCFA,
                recevez 5 numéros par SMS et additionnez-les.
                {"\n\n"}
                En partenariat avec <strong>Orange Money</strong> et{" "}
                <strong>PMUC</strong>.
              </p>
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      // ─── ÉCRAN : Termes & Conditions ──────────────────────────
      case "termes":
        return (
          <div className="flex flex-col h-full">
            <USSDHeader title="Termes & Conditions" />
            <div className="flex-1 px-4 py-4 overflow-y-auto">
              <p className="font-inter text-xs text-gray-700 leading-relaxed">
                Ce jeu est réservé aux abonnés Orange Côte d&apos;Ivoire
                majeurs.
                {"\n\n"}
                La participation implique l&apos;acceptation du règlement en
                vigueur. Le montant misé est débité immédiatement du solde
                Orange Money.
                {"\n\n"}
                Les gains sont crédités sous 24h.
                {"\n\n"}© 2025 Là Là Là · Jeu responsable.
              </p>
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      // ─── ÉCRAN : Solde insuffisant ────────────────────────────
      case "solde-insuffisant":
        return (
          <div className="flex flex-col h-full">
            <USSDHeader title="Erreur Paiement" />
            <div className="flex-1 px-4 py-6 flex flex-col items-center justify-center gap-4">
              <div className="text-4xl">⚠️</div>
              <div className="text-center">
                <p className="font-poppins font-bold text-gray-800 text-sm mb-2">
                  Paiement non effectué
                </p>
                <p className="font-inter text-xs text-gray-500 leading-relaxed">
                  Votre paiement n&apos;a pas pu être effectué. Vérifiez votre
                  solde Orange Money et réessayez.
                </p>
              </div>
              <a
                href="tel:*144%23"
                className="
                  bg-orange-vif text-white
                  font-poppins font-bold text-xs
                  px-4 py-2 rounded-full
                  mt-2
                "
              >
                Recharger mon compte
              </a>
            </div>
            <BackButton onClick={goBack} />
          </div>
        );

      default:
        return null;
    }
  };

  // ══════════════════════════════════════════════════════════════
  // RENDU PRINCIPAL
  // ══════════════════════════════════════════════════════════════

  return (
    <section
      ref={sectionRef}
      id="simulator"
      className="relative py-24 overflow-hidden"
      style={{ background: "#fdf8f3" }}
    >
      {/* ── Fond décoratif sable ──────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(206,170,116,0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(116,166,65,0.08) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container-main relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* ── Colonne gauche : Texte + instructions ──────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <div
              className="
                inline-flex items-center gap-2
                bg-sable/30 border border-sable/50
                text-vert-fonce font-inter text-sm
                px-4 py-1.5 rounded-full mb-4
              "
            >
              <span>📱</span>
              <span>Menu interactif</span>
            </div>

            <h2 className="section-title text-vert-fonce mb-4">
              Explorez le menu du jeu
            </h2>

            <p className="font-inter text-gray-600 leading-relaxed mb-8 max-w-md">
              Naviguez dans le simulateur comme si vous étiez sur votre
              téléphone Orange. Cliquez sur les options pour explorer toute
              l&apos;arborescence du menu.
            </p>

            {/* Instructions */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                { icon: "👆", text: "Cliquez sur une option pour naviguer" },
                { icon: "← ", text: "Le bouton Retour revient en arrière" },
                { icon: "🔄", text: "Réinitialisez pour recommencer" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-inter text-gray-600 text-sm">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Breadcrumb navigation */}
            <div className="flex flex-wrap items-center gap-1 mb-4">
              <span className="font-inter text-xs text-gray-400">
                Vous êtes :
              </span>
              {[
                "Accueil",
                ...history.map((s) => s.replace("-", " ")),
                currentScreen.replace("-", " "),
              ]
                .slice(-4)
                .map((crumb, i, arr) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="text-gray-300">›</span>}
                    <span
                      className={`
                        font-inter text-xs capitalize
                        ${
                          i === arr.length - 1
                            ? "text-vert-fonce font-semibold"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {crumb}
                    </span>
                  </span>
                ))}
            </div>

            {/* Bouton reset */}
            {currentScreen !== "home" && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={reset}
                whileTap={{ scale: 0.95 }}
                className="
                  inline-flex items-center gap-2
                  border-2 border-vert-fonce text-vert-fonce
                  font-poppins font-bold text-sm
                  px-5 py-2.5 rounded-full
                  hover:bg-vert-fonce hover:text-white
                  transition-colors duration-200
                "
              >
                <span>↺</span>
                <span>Recommencer</span>
              </motion.button>
            )}

            {/* CTA téléphone */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="font-inter text-gray-500 text-sm mb-3">
                Prêt à jouer pour de vrai ?
              </p>
              <motion.a
                href="tel:*150*52%23"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  inline-flex items-center gap-3
                  bg-orange-vif text-white
                  font-poppins font-bold
                  px-7 py-3.5 rounded-full
                  shadow-lg
                "
                style={{ boxShadow: "0 6px 24px rgba(244,120,32,0.4)" }}
              >
                <span>📱</span>
                <span>Composer le #150*52#</span>
              </motion.a>
            </div>
          </motion.div>

          {/* ── Colonne droite : Simulateur téléphone ──────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              {/* Halo décoratif derrière le téléphone */}
              <div
                className="absolute inset-0 blur-3xl opacity-20 scale-110"
                style={{
                  background: "radial-gradient(circle, #29783B, #74A641)",
                }}
              />

              <PhoneMockup screenKey={currentScreen}>
                <div className="h-full flex flex-col">{renderScreen()}</div>
              </PhoneMockup>

              {/* Label flottant */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute -top-4 -right-4
                  bg-orange-vif text-white
                  font-poppins font-bold text-xs
                  px-3 py-1.5 rounded-full
                  shadow-lg
                "
              >
                #150*52# Live
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
