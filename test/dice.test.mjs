// Smoke test for the Genesys narrative dice engine and its pool rails.
// Run: node test/dice.test.mjs
import { buildPool, tally, sideTier, DICE, DIFFICULTY } from "../web/dice.js";

let failures = 0;
function check(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) { failures++; console.error(`FAIL ${name}: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`); }
  else console.log(`ok   ${name}`);
}

// --- Pool rails ---

// Risky default: stat 4, 1 rank, Average -> 3G+1Y vs 1P+1R (risk floors 1 red)
check("risky stat4/rank1/avg", buildPool({ stat: 4, ranks: 1, difficulty: "average" }),
  { ability: 3, proficiency: 1, difficulty: 1, challenge: 1, boost: 0, setback: 0 });

// Risk rule: untrained risky roll still gets 1 yellow and 1 red
check("risky untrained gets 1Y1R", buildPool({ stat: 3, ranks: 0, difficulty: "easy" }),
  { ability: 2, proficiency: 1, difficulty: 0, challenge: 1, boost: 0, setback: 0 });

// Risky + simple difficulty: opposition floored to 1 die (a red)
check("risky floors difficulty", buildPool({ stat: 2, ranks: 0, difficulty: "simple" }),
  { ability: 1, proficiency: 1, difficulty: 0, challenge: 1, boost: 0, setback: 0 });

// Yellow cap: ranks 5 on stat 5 still yields only 2 yellow
check("max 2 yellow", buildPool({ stat: 5, ranks: 5, difficulty: "average" }),
  { ability: 3, proficiency: 2, difficulty: 1, challenge: 1, boost: 0, setback: 0 });

// Red cap: challengeUpgrades 4 at daunting still yields only 2 red
check("max 2 red", buildPool({ stat: 3, ranks: 1, difficulty: "daunting", challengeUpgrades: 4 }),
  { ability: 2, proficiency: 1, difficulty: 2, challenge: 2, boost: 0, setback: 0 });

// Side cap: stat clamped to 5 positive dice
check("positive side capped at 5", buildPool({ stat: 9, ranks: 0, difficulty: "average", risky: false }),
  { ability: 5, proficiency: 0, difficulty: 2, challenge: 0, boost: 0, setback: 0 });

// Non-risky chore: no forced upgrades, simple stays 0 dice
check("non-risky chore", buildPool({ stat: 3, ranks: 0, difficulty: "simple", risky: false }),
  { ability: 3, proficiency: 0, difficulty: 0, challenge: 0, boost: 0, setback: 0 });

// Difficulty ladder tops at daunting (4)
check("DIFFICULTY ladder", [DIFFICULTY.simple, DIFFICULTY.easy, DIFFICULTY.average, DIFFICULTY.hard, DIFFICULTY.daunting], [0, 1, 2, 3, 4]);

// --- Tally + tiers ---

const faces = [
  { type: "ability", face: DICE.ability[3] },          // ss -> 2 success
  { type: "proficiency", face: DICE.proficiency[11] }, // T  -> triumph (+1 success)
  { type: "difficulty", face: DICE.difficulty[1] },    // f  -> 1 failure
  { type: "ability", face: DICE.ability[4] }           // a  -> 1 advantage
];
check("tally net success", tally(faces),
  { success: true, successes: 2, advantages: 1, threats: 0, advantageTier: "minor", threatTier: "none", triumphs: 1, despairs: 0 });

const faces2 = [
  { type: "ability", face: DICE.ability[1] },          // s
  { type: "challenge", face: DICE.challenge[11] }      // D -> despair (+1 failure)
];
check("tally despair fails tie", tally(faces2),
  { success: false, successes: 0, advantages: 0, threats: 0, advantageTier: "none", threatTier: "none", triumphs: 0, despairs: 1 });

check("sideTier buckets", [sideTier(0), sideTier(1), sideTier(2), sideTier(3), sideTier(7)], ["none", "minor", "minor", "major", "major"]);

if (failures) { console.error(`\n${failures} test(s) failed`); process.exit(1); }
console.log("\nall dice tests passed");
