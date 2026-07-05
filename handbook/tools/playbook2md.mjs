// playbook2md.mjs — render StoneSys playbook JSON as handbook markdown.
// Usage: node playbook2md.mjs <out-dir> <playbook.json> [more.json...]
// Emits one .md per input, full reproduction, uniform layout.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { basename, join } from "node:path";

const STATS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
const outDir = process.argv[2];
mkdirSync(outDir, { recursive: true });

const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

function cleanText(s) {
  if (typeof s !== "string") return s;
  return s
    .replace(/\bper core\.md:/g, "per chapter 13:")
    .replace(/\bcore\.md:\s*Pray for Aid, Devotion, Wrath/g, "chapter 13: Pray for Aid, Devotion, Wrath")
    .replace(/\bInvoke Patron,\s*core\.md/g, "Invoke Patron — chapter 12")
    .replace(/\s*\(core\.md\)\.?/g, ".")
    .replace(/\bcore\.md\b/g, "the core rules");
}

function cleanData(value) {
  if (Array.isArray(value)) return value.map(cleanData);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, cleanData(child)])
    );
  }
  return cleanText(value);
}

function renderStart(start) {
  if (!start) return "";
  if (typeof start === "string") return start;
  if (Array.isArray(start)) return start.join(", ");
  if (typeof start === "object") {
    return `Start: ${Object.entries(start)
      .map(([k, v]) => `${k} ${v}`)
      .join(", ")}.`;
  }
  return String(start);
}

function renderMove(m) {
  const L = [];
  const kind = cap(m.type);
  L.push(`#### ${m.name}  ·  *${kind}*`);
  L.push("");
  if (m.stat && m.results) {
    const r = m.results;
    const bits = [`**Roll +${m.stat}**`];
    if (m.difficulty) bits.push(`default difficulty **${m.difficulty}**`);
    if (m.trained === false) bits.push("untrained (no upgrade)");
    L.push(`> ${m.trigger}`);
    L.push("");
    L.push(bits.join(" · ") + ".");
    L.push("");
    L.push(`- **Success:** ${r.success}`);
    if (r.failure) L.push(`- **Failure:** ${r.failure}`);
    if (r.advantage?.length)
      L.push(`- **▲ spend:** ${r.advantage.join(" / ")}`);
    if (r.threat?.length) L.push(`- **▼ costs:** ${r.threat.join(" / ")}`);
    if (r.triumph) L.push(`- **◆ Triumph:** ${r.triumph}`);
    if (r.despair) L.push(`- **✶ Despair:** ${r.despair}`);
    if (m.hold) {
      L.push("");
      L.push(
        `**Hold — ${m.hold.name}.** Spend 1 to: ${m.hold.spend.join(" / ")}`
      );
    }
  } else {
    if (m.trigger) {
      L.push(`> ${m.trigger}`);
      L.push("");
    }
    L.push(m.text ?? "");
  }
  L.push("");
  return L.join("\n");
}

function render(p) {
  const L = [];
  L.push(`### ${p.name}`);
  L.push("");
  L.push(`*${p.concept}*`);
  L.push("");
  if (p.duty) L.push(`**Duty:** ${p.duty}`);
  L.push("");

  // Stats
  const d = p.stats.default;
  L.push(`| ${STATS.join(" | ")} |`);
  L.push(`| ${STATS.map(() => "---").join(" | ")} |`);
  L.push(`| ${STATS.map((s) => d[s]).join(" | ")} |`);
  L.push("");
  const anchor = p.stats.anchor
    ? ` Anchor: **${p.stats.anchor.stat} ${p.stats.anchor.min}+** — no swap may take it lower.`
    : "";
  L.push(
    `Default array shown; you may swap up to ${p.stats.swaps} pairs.${anchor}`
  );
  L.push("");
  L.push(
    `**HP** ${p.derived.hp} · **Damage** ${p.derived.damage} · **Load** ${p.derived.load}`
  );
  L.push("");

  // Identity
  if (p.identity?.names?.length)
    L.push(`**Names:** ${p.identity.names.join(", ")}`);
  L.push("");
  if (p.identity?.look?.length) {
    L.push("**Look** — choose one per line:");
    L.push("");
    for (const row of p.identity.look)
      L.push(`- *${row.label}:* ${row.options.join(", ")}`);
    L.push("");
  }

  // Gear
  if (p.gear?.length) {
    L.push("**Gear** — choose as marked:");
    L.push("");
    for (const g of p.gear) L.push(`- *${g.label}:* ${g.options.join(" · ")}`);
    L.push("");
  }

  // Moves
  L.push("#### Moves");
  L.push("");
  const order = { signature: 0, fixed: 1, choice: 2 };
  const moves = [...p.moves].sort(
    (a, b) => (order[a.type] ?? 3) - (order[b.type] ?? 3)
  );
  const nStart = p.movesStart ?? 2;
  L.push(
    `You begin with the signature move, every fixed move, and ${nStart} choice moves.`
  );
  L.push("");
  for (const m of moves) L.push(renderMove(m));

  // Embedment
  const e = p.embedment;
  if (e) {
    L.push("#### Embedment");
    L.push("");
    if (e.system) L.push(`*${e.system}*`);
    if (e.start) L.push(`\n${renderStart(e.start)}`);
    L.push("");
    if (e.bonds?.length) {
      L.push("**Bonds** — fill in at least two:");
      L.push("");
      for (const b of e.bonds) L.push(`- ${b}`);
      L.push("");
    }
    if (e.communityTie?.length) {
      L.push("**Community tie** — choose one:");
      L.push("");
      for (const c of e.communityTie) L.push(`- ${c}`);
      L.push("");
    }
  }
  if (p.tracks?.length) {
    L.push("**Tracks:**");
    L.push("");
    for (const t of p.tracks)
      L.push(
        `- **${t.name}** (${t.min}–${t.max}, start ${t.start}).${t.note ? " " + t.note.replace(/\s*\(core\.md\)\.?/, ".") : ""}`
      );
    L.push("");
  }

  // Advancement
  if (p.advancement) {
    L.push("#### Advancement");
    L.push("");
    if (p.advancement.basic?.length) {
      L.push("**Basic** (5 XP each):");
      L.push("");
      for (const a of p.advancement.basic) L.push(`- ☐ ${a}`);
      L.push("");
    }
    if (p.advancement.advanced?.length) {
      L.push("**Advanced:**");
      L.push("");
      for (const a of p.advancement.advanced) L.push(`- ☐ ${a}`);
      L.push("");
    }
  }
  L.push("\\newpage");
  L.push("");
  return L.join("\n");
}

for (const f of process.argv.slice(3)) {
  const p = cleanData(JSON.parse(readFileSync(f, "utf8")));
  const out = join(outDir, basename(f).replace(/\.json$/, ".md"));
  writeFileSync(out, render(p));
  console.log("wrote", out);
}
