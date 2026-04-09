// lib/gains.ts

export type GainRow = {
  somme: number;
  gain: number;
  isJackpot?: boolean;
};

export type MiseType = 100 | 200 | 400;

export const gainsData: Record<MiseType, GainRow[]> = {
  100: [
    { somme: 33, gain: 1_000_000, isJackpot: true },
    { somme: 18, gain: 100_000 },
    { somme: 39, gain: 10_000 },
    { somme: 36, gain: 5_000 },
    { somme: 45, gain: 1_000 },
    { somme: 42, gain: 500 },
    { somme: 27, gain: 400 },
    { somme: 24, gain: 300 },
    { somme: 30, gain: 200 },
  ],
  200: [
    { somme: 33, gain: 2_000_000, isJackpot: true },
    { somme: 45, gain: 100_000 },
    { somme: 48, gain: 50_000 },
    { somme: 39, gain: 50_000 },
    { somme: 42, gain: 20_000 },
    { somme: 36, gain: 10_000 },
    { somme: 27, gain: 2_000 },
    { somme: 51, gain: 1_500 },
    { somme: 30, gain: 1_000 },
    { somme: 18, gain: 500 },
    { somme: 24, gain: 300 },
    { somme: 21, gain: 200 },
  ],
  400: [
    { somme: 33, gain: 15_000_000, isJackpot: true },
    { somme: 18, gain: 400_000 },
    { somme: 39, gain: 100_000 },
    { somme: 30, gain: 40_000 },
    { somme: 42, gain: 20_000 },
    { somme: 36, gain: 10_000 },
    { somme: 51, gain: 4_000 },
    { somme: 48, gain: 3_000 },
    { somme: 57, gain: 2_000 },
    { somme: 27, gain: 1_500 },
    { somme: 24, gain: 1_000 },
    { somme: 54, gain: 600 },
    { somme: 21, gain: 400 },
  ],
};

// Formatte un montant en FCFA lisible
export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}
