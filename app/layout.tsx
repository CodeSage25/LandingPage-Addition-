// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// ── Google Fonts via next/font (auto-hébergé, RGPD OK) ────────────
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
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
    "Cameroun",
    "jeu loterie",
    "PMUC",
    "#150*52#",
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
    title: "#",
    description: "",
    type: "website",
    locale: "fr_CM",
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
    <html lang="fr" className={inter.variable}>
      <body className="font-inter antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
