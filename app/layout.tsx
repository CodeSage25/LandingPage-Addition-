// app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

// ── Google Fonts via next/font (auto-hébergé, RGPD OK) ────────────
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// ── Métadonnées SEO ────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Là Là Là — Tentez ta chance au #150*52#",
  description:
    "Jouez au Là Là Là sur Orange Money. Composez le #150*52#, misez 100/200/400 FCFA, additionnez vos 5 numéros et gagnez jusqu'à 15 000 000 FCFA !",
  keywords: [
    "Là Là Là",
    "Orange Money",
    "Côte d'Ivoire",
    "jeu loterie",
    "PMUC",
    "150*52",
    "gagner argent mobile",
  ],
  authors: [{ name: "Là Là Là" }],
  icons: {
    icon: [
      {
        url: "/favicon.svg",
      },
    ],
  },
  openGraph: {
    title: "Là Là Là — Tentez ta chance au #150*52#",
    description: "Gagnez jusqu'à 15 000 000 FCFA avec Orange Money !",
    type: "website",
    locale: "fr_CI",
  },
  // Empêche le zoom sur mobile (important pour le simulateur USSD)
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-inter antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
