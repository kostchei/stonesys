// Smoke test for the dice/band engine. Run: node test/dice.test.mjs
import { modFor, bandFor, rollMove, BANDS } from "../web/dice.js";

let failures = 0;
function check(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) {
    failures++;
    console.error(`FAIL ${name}: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`);
  } else {
    console.log(`ok   ${name}`);
  }
}

// modFor: 1-5 maps to -1..+3
check("modFor(1)", modFor(1), -1);
check("modFor(2)", modFor(2), 0);
check("modFor(5)", modFor(5), 3);

// band thresholds: 10 strong, 9 and 7 weak, 6 miss
check("bandFor(12)", bandFor(12), BANDS.STRONG);
check("bandFor(10)", bandFor(10), BANDS.STRONG);
check("bandFor(9)", bandFor(9), BANDS.WEAK);
check("bandFor(7)", bandFor(7), BANDS.WEAK);
check("bandFor(6)", bandFor(6), BANDS.MISS);
check("bandFor(2)", bandFor(2), BANDS.MISS);

// rollMove with deterministic dice: 6,6 + mod(5)=3 => 15 strong
const seq = [6, 6];
let i = 0;
const fixed = () => seq[i++];
check("rollMove(5, [6,6])", rollMove(5, fixed), { dice: [6, 6], mod: 3, total: 15, band: BANDS.STRONG });

// rollMove 1,1 + mod(1)=-1 => 1 miss
i = 0;
const seq2 = [1, 1];
const fixed2 = () => seq2[i++];
check("rollMove(1, [1,1])", rollMove(1, fixed2), { dice: [1, 1], mod: -1, total: 1, band: BANDS.MISS });

if (failures) {
  console.error(`\n${failures} test(s) failed`);
  process.exit(1);
}
console.log("\nall dice tests passed");
