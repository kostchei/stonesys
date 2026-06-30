// Smoke test for the Genesys narrative dice engine.
// Run: node test/dice.test.mjs
import { buildPool, tally, DICE, DIFFICULTY } from "../web/dice.js";

let failures = 0;
function check(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) { failures++; console.error(`FAIL ${name}: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`); }
  else console.log(`ok   ${name}`);
}

// Pool: stat 4, 1 rank, Average difficulty -> 3 ability + 1 proficiency + 2 difficulty
check("buildPool stat4/rank1/avg", buildPool({ stat: 4, ranks: 1, difficulty: "average" }),
  { ability: 3, proficiency: 1, difficulty: 2, challenge: 0, boost: 0, setback: 0 });

// Lean skills: ranks never exceed stat in upgrades
check("buildPool ranks>stat caps", buildPool({ stat: 2, ranks: 5, difficulty: "easy" }),
  { ability: 0, proficiency: 2, difficulty: 1, challenge: 0, boost: 0, setback: 0 });

// Difficulty mapping + challenge upgrade
check("buildPool hard +1 upgrade", buildPool({ stat: 3, ranks: 1, difficulty: "hard", challengeUpgrades: 1 }),
  { ability: 2, proficiency: 1, difficulty: 2, challenge: 1, boost: 0, setback: 0 });

check("DIFFICULTY average", DIFFICULTY.average, 2);

// tally: build faces by name from the dice sets to exercise cancellation rules.
const faces = [
  { type: "ability", face: DICE.ability[3] },     // ss  -> 2 success
  { type: "proficiency", face: DICE.proficiency[11] }, // T -> triumph (+1 success)
  { type: "difficulty", face: DICE.difficulty[1] },    // f  -> 1 failure
  { type: "ability", face: DICE.ability[4] }       // a  -> 1 advantage
];
// successes raw = 2 + 1(triumph) = 3; failures = 1; net = 2; adv 1, threat 0
check("tally net success", tally(faces),
  { success: true, successes: 2, advantages: 1, threats: 0, triumphs: 1, despairs: 0 });

// despair counts as failure and persists
const faces2 = [
  { type: "ability", face: DICE.ability[1] },   // s
  { type: "challenge", face: DICE.challenge[11] } // D -> despair (+1 failure)
];
// succ 1, fail 1, net 0 -> failure; despair 1
check("tally despair fails tie", tally(faces2),
  { success: false, successes: 0, advantages: 0, threats: 0, triumphs: 0, despairs: 1 });

if (failures) { console.error(`\n${failures} test(s) failed`); process.exit(1); }
console.log("\nall dice tests passed");
