// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Palette couleurs Là Là Là ──────────────────────────────────
      colors: {
        "bleu-ciel": "#7CBEE9",
        "orange-vif": "#F47820",
        "vert-moyen": "#74A641",
        "vert-fonce": "#29783B",
        sable: "#CEAA74",
        "bleu-eau": "#5FB0CC",
        // Alias sémantiques pour usage rapide
        primary: "#29783B", // vert-fonce
        accent: "#F47820", // orange-vif
        secondary: "#74A641", // vert-moyen
      },

      // ── Typographie ────────────────────────────────────────────────
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },

      // ── Animations custom ──────────────────────────────────────────
      keyframes: {
        // Pulsation du CTA Hero
        "pulse-cta": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        // Bounce du scroll indicator
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0px)", opacity: "1" },
          "50%": { transform: "translateY(10px)", opacity: "0.5" },
        },
        // Lueur verte autour de la vidéo
        "glow-green": {
          "0%, 100%": {
            boxShadow:
              "0 0 10px 2px rgba(41, 120, 59, 0.4), 0 0 30px 5px rgba(116, 166, 65, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 20px 5px rgba(41, 120, 59, 0.8), 0 0 60px 10px rgba(116, 166, 65, 0.4)",
          },
        },
        // Rotation lente du trèfle footer
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        // Curseur clignotant SMS typewriter
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        // Jackpot pulse doré
        "jackpot-pulse": {
          "0%, 100%": {
            textShadow: "0 0 5px rgba(244, 120, 32, 0.5)",
            color: "#F47820",
          },
          "50%": {
            textShadow:
              "0 0 20px rgba(244, 120, 32, 1), 0 0 40px rgba(244, 120, 32, 0.5)",
            color: "#FFB347",
          },
        },
      },
      animation: {
        "pulse-cta": "pulse-cta 2s ease-in-out infinite",
        "bounce-slow": "bounce-slow 1.5s ease-in-out infinite",
        "glow-green": "glow-green 2s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        blink: "blink 1s step-end infinite",
        "jackpot-pulse": "jackpot-pulse 2s ease-in-out infinite",
      },

      // ── Dégradés utilitaires ───────────────────────────────────────
      backgroundImage: {
        "gradient-green": "linear-gradient(to bottom, #29783B, #74A641)",
        "gradient-footer": "linear-gradient(to bottom, #29783B, #1a4f25)",
        "gradient-sable":
          "linear-gradient(to bottom, rgba(206,170,116,0.15), rgba(255,255,255,0))",
      },

      // ── Espacement / dimensions ────────────────────────────────────
      height: {
        screen: "100dvh", // dvh pour mobile (évite la barre d'URL)
      },
    },
  },
  plugins: [],
};

export default config;
