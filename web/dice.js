// StoneSys dice + band engine. Pure, no DOM. The band thresholds are defined
// here once and imported everywhere (web sheet and tests).

export const BANDS = { STRONG: "strong", WEAK: "weak", MISS: "miss" };

export function rollDie() {
  return 1 + Math.floor(Math.random() * 6);
}

// Roll modifier from a 1-5 stat value: stat - 2 (range -1 to +3).
export function modFor(statValue) {
  return statValue - 2;
}

export function bandFor(total) {
  if (total >= 10) return BANDS.STRONG;
  if (total >= 7) return BANDS.WEAK;
  return BANDS.MISS;
}

// Resolve a move: roll 2d6, add the stat modifier, classify the band.
export function rollMove(statValue, dieFn = rollDie) {
  const dice = [dieFn(), dieFn()];
  const mod = modFor(statValue);
  const total = dice[0] + dice[1] + mod;
  return { dice, mod, total, band: bandFor(total) };
}
