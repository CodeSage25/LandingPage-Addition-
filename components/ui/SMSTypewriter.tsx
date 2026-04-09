// components/ui/SMSTypewriter.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Données SMS ────────────────────────────────────────────────────
const SMS_MESSAGES = [
  {
    id: 1,
    sender: "Là Là Là",
    time: "14:32",
    text: "Vous avez misé avec succès pour le Là Là Là. Faites votre addition : 06+01+04+03+07 = ? Ticket 633892281294",
    type: "info" as const,
  },
  {
    id: 2,
    sender: "Là Là Là",
    time: "14:33",
    text: "Bravo ! Vous gagnez 400 FCFA. 06+01+04+03+07 = 21. Ticket 633892281294",
    type: "win" as const,
  },
];

// ── Hook typewriter ────────────────────────────────────────────────
function useTypewriter(text: string, speed = 28, active = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, active]);

  return { displayed, done };
}

// ── Composant bulle SMS individuelle ──────────────────────────────
function SMSBubble({
  message,
  isActive,
  isVisible,
  delay = 0,
}: {
  message: (typeof SMS_MESSAGES)[0];
  isActive: boolean;
  isVisible: boolean;
  delay?: number;
}) {
  const { displayed, done } = useTypewriter(message.text, 25, isActive);

  const isWin = message.type === "win";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay, ease: "easeOut" }}
          className="flex flex-col gap-1"
        >
          {/* Header SMS */}
          <div className="flex items-center gap-2 px-1">
            {/* Avatar */}
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                text-sm font-bold text-white flex-shrink-0
                ${isWin ? "bg-orange-vif" : "bg-vert-fonce"}
              `}
            >
              🍀
            </div>
            <span className="text-xs font-inter font-semibold text-gray-500">
              {message.sender}
            </span>
            <span className="text-xs font-inter text-gray-400 ml-auto">
              {message.time}
            </span>
          </div>

          {/* Bulle */}
          <div
            className={`
              relative ml-10 rounded-2xl rounded-tl-sm px-4 py-3
              max-w-[320px] shadow-md
              ${
                isWin
                  ? "bg-gradient-to-br from-orange-vif/10 to-vert-moyen/10 border border-orange-vif/30"
                  : "bg-white border border-gray-200"
              }
            `}
          >
            {/* Badge gagnant */}
            {isWin && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                className="
                  absolute -top-2 -right-2
                  bg-orange-vif text-white
                  text-[10px] font-poppins font-bold
                  px-2 py-0.5 rounded-full
                  shadow-md
                "
              >
                🏆 GAGNANT
              </motion.div>
            )}

            {/* Texte typewriter */}
            <p className="font-inter text-sm text-gray-800 leading-relaxed">
              {displayed}
              {/* Curseur clignotant */}
              {isActive && !done && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className={`
                    inline-block w-0.5 h-4 ml-0.5 align-middle rounded-full
                    ${isWin ? "bg-orange-vif" : "bg-vert-fonce"}
                  `}
                />
              )}
            </p>

            {/* Highlight addition si SMS win */}
            {isWin && done && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="
                  mt-2 pt-2 border-t border-orange-vif/20
                  flex items-center gap-2
                "
              >
                <span className="text-xs font-inter text-gray-500">
                  Résultat :
                </span>
                <span className="font-poppins font-black text-sm text-orange-vif italic">
                  06+01+04+03+07 = 21
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Composant principal SMSTypewriter ─────────────────────────────
export default function SMSTypewriter() {
  const [currentSMS, setCurrentSMS] = useState(0);
  const [showSecond, setShowSecond] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Durée approximative du 1er SMS (nb caractères × vitesse + buffer)
  const SMS1_DURATION = SMS_MESSAGES[0].text.length * 25 + 1200;

  const startAnimation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentSMS(0);
    setShowSecond(false);
    setCompleted(false);

    // Après le 1er SMS → affiche le 2ème
    timerRef.current = setTimeout(() => {
      setShowSecond(true);
      setCurrentSMS(1);

      // Marque comme terminé après le 2ème SMS
      const SMS2_DURATION = SMS_MESSAGES[1].text.length * 25 + 800;
      timerRef.current = setTimeout(() => {
        setCompleted(true);
        setIsRunning(false);
      }, SMS2_DURATION);
    }, SMS1_DURATION);
  };

  // Reset + relance
  const handleReplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentSMS(0);
    setShowSecond(false);
    setIsRunning(false);
    setCompleted(false);
    setTimeout(startAnimation, 100);
  };

  // Nettoyage
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      {/* ── Mockup téléphone ──────────────────────────────────────── */}
      <div
        className="
          relative w-full
          bg-gray-50 rounded-3xl
          border-4 border-gray-800
          shadow-2xl overflow-hidden
        "
        style={{ minHeight: "320px" }}
      >
        {/* Barre status téléphone */}
        <div className="bg-gray-800 px-6 py-2 flex items-center justify-between">
          <span className="text-white text-xs font-inter">14:32</span>
          <div className="w-16 h-3 bg-gray-700 rounded-full mx-auto" />
          <div className="flex gap-1 items-center">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-white text-xs">●●●</span>
          </div>
        </div>

        {/* Header conversation */}
        <div className="bg-vert-fonce px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
            🍀
          </div>
          <div>
            <p className="text-white font-poppins font-bold text-sm">
              Là Là Là
            </p>
            <p className="text-white/60 text-xs font-inter">
              Service Orange Money
            </p>
          </div>
        </div>

        {/* Zone messages */}
        <div className="p-4 flex flex-col gap-4 min-h-[200px]">
          {/* SMS 1 — toujours visible dès le démarrage */}
          {isRunning || completed ? (
            <SMSBubble
              message={SMS_MESSAGES[0]}
              isActive={currentSMS === 0 && !showSecond}
              isVisible={true}
              delay={0}
            />
          ) : null}

          {/* SMS 2 */}
          {showSecond && (
            <SMSBubble
              message={SMS_MESSAGES[1]}
              isActive={currentSMS === 1}
              isVisible={showSecond}
              delay={0.1}
            />
          )}

          {/* État initial — invite à démarrer */}
          {!isRunning && !completed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full gap-3 py-8"
            >
              <p className="text-gray-400 font-inter text-sm text-center">
                Découvrez comment fonctionne le jeu
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Boutons de contrôle ───────────────────────────────────── */}
      <div className="flex gap-3">
        {!isRunning && !completed && (
          <motion.button
            onClick={startAnimation}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className="
              bg-vert-fonce text-white
              font-poppins font-bold text-sm
              px-6 py-3 rounded-full
              shadow-lg
              flex items-center gap-2
            "
          >
            <span>▶</span> Simuler la réception SMS
          </motion.button>
        )}

        {completed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleReplay}
            whileTap={{ scale: 0.95 }}
            className="
              border-2 border-vert-fonce text-vert-fonce
              font-poppins font-bold text-sm
              px-6 py-3 rounded-full
              flex items-center gap-2
              hover:bg-vert-fonce hover:text-white
              transition-colors duration-200
            "
          >
            <span>↺</span> Rejouer
          </motion.button>
        )}
      </div>
    </div>
  );
}
