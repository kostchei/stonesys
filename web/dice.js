// StoneSys dice engine — Genesys-style narrative dice. Pure, no DOM.
// A stat (1-5) sets the number of ability dice; a skill rank upgrades that many
// ability dice to proficiency (capped by the stat); difficulty sets challenge
// dice. Faces are tallied into successes / advantages / triumphs / despairs.

// Face tuple order: [success, advantage, triumph, failure, threat, despair]
const B = [0, 0, 0, 0, 0, 0];
const F = {
  s: [1, 0, 0, 0, 0, 0], ss: [2, 0, 0, 0, 0, 0],
  a: [0, 1, 0, 0, 0, 0], aa: [0, 2, 0, 0, 0, 0], sa: [1, 1, 0, 0, 0, 0],
  T: [0, 0, 1, 0, 0, 0],
  f: [0, 0, 0, 1, 0, 0], ff: [0, 0, 0, 2, 0, 0],
  h: [0, 0, 0, 0, 1, 0], hh: [0, 0, 0, 0, 2, 0], fh: [0, 0, 0, 1, 1, 0],
  D: [0, 0, 0, 0, 0, 1]
};

// Standard Genesys die faces.
export const DICE = {
  ability:     [B, F.s, F.s, F.ss, F.a, F.a, F.sa, F.aa],                                   // green d8
  proficiency: [B, F.s, F.s, F.ss, F.ss, F.a, F.sa, F.sa, F.sa, F.aa, F.aa, F.T],            // yellow d12
  difficulty:  [B, F.f, F.ff, F.h, F.h, F.h, F.hh, F.fh],                                    // purple d8
  challenge:   [B, F.f, F.f, F.ff, F.ff, F.h, F.h, F.fh, F.fh, F.hh, F.hh, F.D],             // red d12
  boost:       [B, B, F.s, F.sa, F.aa, F.a],                                                 // blue d6
  setback:     [B, B, F.f, F.f, F.h, F.h]                                                    // black d6
};

export const DIFFICULTY = { simple: 0, easy: 1, average: 2, hard: 3, daunting: 4, formidable: 5 };
export const COLORS = { ability: "green", proficiency: "yellow", difficulty: "purple", challenge: "red", boost: "blue", setback: "black" };

// Build a pool from a move roll. ranks upgrades ability->proficiency (<= stat);
// challengeUpgrades upgrades difficulty->challenge (<= difficulty count).
export function buildPool({ stat, ranks = 0, difficulty = "average", boost = 0, setback = 0, challengeUpgrades = 0 }) {
  const diffN = DIFFICULTY[difficulty] ?? 2;
  const proficiency = Math.min(ranks, stat);
  const ability = Math.max(0, stat - proficiency);
  const challenge = Math.min(challengeUpgrades, diffN);
  const purple = diffN - challenge;
  return { ability, proficiency, difficulty: purple, challenge, boost, setback };
}

export function rollPool(pool, rng = Math.random) {
  const faces = [];
  for (const [type, count] of Object.entries(pool)) {
    const set = DICE[type];
    if (!set) continue;
    for (let i = 0; i < count; i++) faces.push({ type, face: set[Math.floor(rng() * set.length)] });
  }
  return faces;
}

// Tally rolled faces into a net result. Triumph counts as a success, despair as
// a failure; triumphs/despairs themselves are never cancelled.
export function tally(faces) {
  const sum = [0, 0, 0, 0, 0, 0];
  for (const { face } of faces) for (let i = 0; i < 6; i++) sum[i] += face[i];
  const [s, a, T, f, h, D] = sum;
  const netSucc = (s + T) - (f + D);
  const netAdv = a - h;
  return {
    success: netSucc > 0,
    successes: Math.max(0, netSucc),
    advantages: netAdv > 0 ? netAdv : 0,
    threats: netAdv < 0 ? -netAdv : 0,
    triumphs: T,
    despairs: D
  };
}

export function rollMove(opts, rng = Math.random) {
  const pool = buildPool(opts);
  const faces = rollPool(pool, rng);
  return { pool, faces, ...tally(faces) };
}
