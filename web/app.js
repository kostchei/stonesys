import { rollMove } from "./dice.js";
import { getAccessToken, saveCharacterToDrive, listDriveFiles, loadFromDrive } from "./drive.js";
import { getMoveGroups, validateStartingChoices } from "./move-groups.js";
import { generateName } from "./name-generators.js";


const CLIENT_ID_KEY = "stonesys:gdrive_client_id";
const ACTIVE_PB_KEY = "stonesys:active_playbook";

const STAT_KEYS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
const DIFFS = ["simple", "easy", "average", "hard", "daunting"];
const SP_KEY = "stonesys:storypoints";
const ADV_XP_COST = 5; // GUIDE.md: "Spend 5 XP to take one advancement checkbox."
const LEVEL_SIX_ADVANCEMENT_COUNT = 5;

const COMMON_MOVES = [
  {
    name: "Risky Check",
    type: "fixed",
    category: "common",
    trigger: "When danger looms, the stakes are high, and no named move fits, choose the stat that matches your approach. On success, you do it. On threat, the GM gives a lesser success, cost, consequence, or hard choice. On failure, mark XP and the GM makes a move.",
    stat: "WIS",
    statPick: true,
    trained: false
  },
  {
    name: "Clash",
    type: "fixed",
    category: "common",
    trigger: "When you fight in melee or close quarters, roll with the stat that fits the weapon and approach, usually STR. On success, deal your damage. Advantage can avoid, prevent, or counter the enemy's attack, or strike hard for +1d6 while still suffering their attack. Threat usually means the enemy's attack lands or another immediate cost follows.",
    stat: "STR",
    statPick: true,
    trained: false
  },
  {
    name: "Let Fly",
    type: "fixed",
    category: "common",
    trigger: "When you take an easy shot with a clear line, deal your damage. If the shot is tricky or you are under pressure, roll DEX. On success, deal your damage. On threat, deplete ammo, wait for a clear shot, move into danger, or accept the GM's complication.",
    stat: "DEX",
    trained: false
  },
  {
    name: "Defend",
    type: "fixed",
    category: "common",
    trigger: "When you take up a defensive stance or throw yourself between a threat and your ward, roll CON. On advantage, hold Readiness; a shield gives more. Spend Readiness to suffer an attack instead of your ward, halve damage or effect, draw attention, or strike back with disadvantage.",
    stat: "CON",
    trained: false,
    hold: {
      name: "Readiness",
      spend: [
        "Suffer an attack's damage or effect instead of your ward.",
        "Halve an attack's effect or damage.",
        "Draw attention to yourself.",
        "Strike back with disadvantage on damage."
      ]
    }
  },
  {
    name: "Aid",
    type: "fixed",
    category: "common",
    trigger: "When your bond, position, or skill makes the help credible, describe how you help and give the roller one blue die. If the table calls for a risky roll to make the help matter, roll the stat that fits your approach. You are in the scene now, and the GM may spend threat from that roll against you.",
    stat: "CHA",
    statPick: true,
    trained: false
  },
  {
    name: "Interfere",
    type: "fixed",
    category: "common",
    trigger: "When you get in someone's way, describe how you impose one black die on their roll and accept the fictional consequences. If active opposition is uncertain, roll the stat that fits how you interfere.",
    stat: "DEX",
    statPick: true,
    trained: false
  }
];

// Advancement effects are detected from text patterns rather than a
// structured field: verified consistent across every playbook in
// playbooks/*.json (see commit history), so this is pattern-matching known
// text, not guessing at arbitrary free text.
function isTakeMoveText(t) { return /^Take another .+ move\.?$/i.test(t) || t === "Take a move from another playbook."; }
function isStatRaiseText(t) { return /^Raise one stat by 1 \(max 5\)/i.test(t); }
function isTrainMoveText(t) { return /upgrades 2 dice to proficiency/i.test(t); }

// ---------- tiny DOM helper ----------
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

function evalFormula(formula, stats) {
  let expr = formula;
  for (const k of STAT_KEYS) expr = expr.replaceAll(k, String(stats[k]));
  if (!/^[-+0-9\s]+$/.test(expr)) return formula;
  try { return Function(`"use strict";return (${expr});`)(); } catch { return formula; }
}

function numericFormulaValue(formula, stats, fallback = 0) {
  const value = Number(evalFormula(formula, stats));
  return Number.isFinite(value) ? value : fallback;
}

const CONTAINER_LOAD_RULES = [
  { label: "haulage", bonus: 8, capacity: "various", tier: "heavy", pattern: /\b(?:sledge|litter|travois|cart|wagon|wheelbarrow)\b/i },
  { label: "pack animal", bonus: 8, capacity: "various", tier: "light", pattern: /\b(?:pack horse|pack mule|pack animal|mule|horse)\b/i },
  { label: "large sea chest (heavy)", bonus: 3, capacity: "up to 20 normal items", tier: "heavy", pattern: /\b(?:large sea chest|sea chest|chest|coffer)\b/i },
  { label: "backpack (medium)", bonus: 2, capacity: "up to 10 normal items", tier: "medium", pattern: /\b(?:backpack|pack)\b/i },
  { label: "satchel (medium)", bonus: 2, capacity: "up to 8 normal items", tier: "medium", pattern: /\b(?:satchel|case)\b/i },
  { label: "bandolier (light)", bonus: 1, capacity: "up to 6 small items", tier: "light", pattern: /\b(?:bandolier|quiver)\b/i },
  { label: "bucket/pouches (light)", bonus: 0, capacity: "up to 4 normal items", tier: "light", pattern: /\b(?:bucket|hidden pouch|hidden pouches|porter knot|pouch|purse|bag|sack|box|coffer|jar)\b/i }
];

function detectedContainerLoad() {
  return containerLoadFromGearText(state.gearText);
}

function autoPackBonus() {
  return detectedContainerLoad().reduce((sum, entry) => sum + entry.bonus, 0);
}

function loadLimits() {
  const str = Number(state.stats.STR) || 0;
  const packBonus = autoPackBonus() + (Number(state.loadBonus) || 0);
  return {
    light: str + 1 + packBonus,
    normal: (str * 2) + 1 + packBonus,
    heavy: (str * 3) + 6 + packBonus
  };
}

function loadCapacity() {
  return loadLimits().heavy;
}

function loadUsed() {
  return Math.max(0, Number(state.loadUsed) || 0);
}

function splitGearItems(text) {
  const items = [];
  let current = "";
  let depth = 0;
  for (const ch of String(text || "")) {
    if (ch === "(") depth++;
    if (ch === ")") depth = Math.max(0, depth - 1);
    if ((ch === "," || ch === "·") && depth === 0) {
      if (current.trim()) items.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) items.push(current.trim());
  return items;
}

function containerLoadForItem(item) {
  const text = String(item || "").toLowerCase();
  if (/\bpack[- ](?:hunter|tactics|wolf|kin)\b/.test(text)) return null;
  if (/\b(?:run with the pack|pack tactics|inspire pack)\b/.test(text)) return null;
  if (/\b(?:water skin|waterskin|wineskin|skin)\b/.test(text)) return null;
  const rule = CONTAINER_LOAD_RULES.find((candidate) => candidate.pattern.test(text));
  return rule ? { item: String(item || "").trim(), label: rule.label, bonus: rule.bonus, capacity: rule.capacity, tier: rule.tier } : null;
}

function containerLoadFromGearText(text) {
  const gearText = compactGearText(text);
  if (!gearText) return [];
  return splitGearItems(gearText)
    .map(containerLoadForItem)
    .filter(Boolean);
}

function estimateLoadFromGearText(text) {
  const gearText = compactGearText(text);
  if (!gearText) return 0;
  return splitGearItems(gearText).length;
}

// ---------- state ----------
let PB = null;
let state = null;
let storeKey = "";
let sp = { player: 1, gm: 1 };

function getMaxHp() {
  let max = state.hp.max || 0;
  if (state.obligationTriggered === "Weird Patron: Sheelba of the Eyeless Face") {
    max = Math.max(1, max - 2);
  }
  return max;
}

function rollObligation() {
  const roll = Math.floor(Math.random() * 100) + 1;
  state.obligationSessionRoll = roll;
  
  let currentRangeStart = 1;
  let triggered = null;
  
  for (const o of state.obligations || []) {
    const val = Number(o.value) || 0;
    if (val <= 0) continue;
    const rangeEnd = currentRangeStart + val - 1;
    if (roll >= currentRangeStart && roll <= rangeEnd) {
      triggered = o.type;
      break;
    }
    currentRangeStart += val;
  }
  
  state.obligationTriggered = triggered;
  if (triggered) {
    alert(`⚠️ Obligation Triggered: "${triggered}"! (d100 Roll: ${roll})\n\nConsequence applied to sheet.`);
  } else {
    alert(`✅ No Obligation triggered. (d100 Roll: ${roll})`);
  }
  save();
  render();
}

function defaultState(pb) {
  const chosen = pb.moves.filter((m) => m.type !== "choice").map((m) => m.name);
  defaultStartingChoices(pb).forEach((name) => chosen.push(name));
  const tracks = {};
  for (const t of pb.tracks || []) tracks[t.name] = t.start;
  const holds = {};
  for (const m of pb.moves) if (m.hold) holds[m.hold.name] = 0;
  const stats = { ...pb.stats.default };
  const hp = Number(evalFormula(pb.derived.hp, stats)) || 0;
  
  let obligations = [];
  if (pb.campaignId === "lankhmar") {
    obligations = [{ type: "Patron Debt", value: 10 }];
  } else if (pb.campaignId === "darksun") {
    let type = "Hunted by the Templars";
    if (pb.name.toLowerCase().includes("defiler")) {
      type = "Defiler's Reek";
    } else if (pb.name.toLowerCase().includes("templar")) {
      type = "Sorcerer-King's Pact";
    }
    obligations = [{ type, value: 10 }];
  }

  return {
    name: pb.identity.names[0] || "",
    look: Object.fromEntries(pb.identity.look.map((l) => [l.label, l.options[0]])),
    gear: Object.fromEntries((pb.gear || []).map((g) => [g.label, g.options[0]])),
    stats, chosen, tracks, holds,
    hp: { current: hp, max: hp }, xp: 0, advChecked: {},
    advChoices: {},   // key -> stat or move name chosen for a picker-backed advancement
    trainedRanks: {}, // move name -> proficiency upgrades (1 default, 2 once trained)
    swapDone: null,   // { a, b } once the one allowed chargen stat-swap is used
    loadUsed: 0,
    loadBonus: 0,
    obligations,
    obligationTriggered: null,
    obligationSessionRoll: null
  };
}

function normalizeLoadedState(raw, pb, id) {
  const base = defaultState(pb);
  const parsed = raw && typeof raw === "object" ? raw : {};
  const maxHp = Number(evalFormula(pb.derived.hp, parsed.stats || base.stats)) || base.hp.max;
  const fixedNames = pb.moves.filter((m) => m.type !== "choice").map((m) => m.name);
  const chosen = Array.isArray(parsed.chosen)
    ? parsed.chosen.slice()
    : fixedNames.concat(Array.isArray(parsed.choiceMoves) ? parsed.choiceMoves : []);
  const normalized = {
    ...base,
    ...parsed,
    playbookId: parsed.playbookId || id,
    name: parsed.name || base.name,
    stats: { ...base.stats, ...(parsed.stats || {}) },
    gear: parsed.gear && typeof parsed.gear === "object" && !Array.isArray(parsed.gear) ? parsed.gear : base.gear,
    chosen: Array.from(new Set(chosen.length ? chosen : base.chosen)),
    tracks: { ...base.tracks, ...(parsed.tracks || {}) },
    holds: { ...base.holds, ...(parsed.holds || {}) },
    advChecked: parsed.advChecked || {},
    advChoices: parsed.advChoices || {},
    trainedRanks: parsed.trainedRanks || {},
    swapDone: parsed.swapDone === undefined ? null : parsed.swapDone,
    obligations: parsed.obligations || base.obligations || [],
    obligationTriggered: parsed.obligationTriggered === undefined ? null : parsed.obligationTriggered,
    obligationSessionRoll: parsed.obligationSessionRoll === undefined ? null : parsed.obligationSessionRoll,
    backgroundName: parsed.backgroundName || "",
    gearText: typeof parsed.gear === "string" ? parsed.gear : (parsed.gearText || ""),
    steadingUpgrades: parsed.steadingUpgrades || "",
    notes: parsed.notes || "",
    backstorySelections: parsed.backstorySelections || {}
  };
  normalized.loadBonus = Number.isFinite(Number(parsed.loadBonus)) ? Number(parsed.loadBonus) : base.loadBonus;
  normalized.loadUsed = Number.isFinite(Number(parsed.loadUsed))
    ? Math.max(0, Number(parsed.loadUsed))
    : estimateLoadFromGearText(normalized.gearText);

  if (parsed.hp && typeof parsed.hp === "object") {
    normalized.hp = {
      current: Math.max(0, Number(parsed.hp.current) || 0),
      max: Math.max(1, Number(parsed.hp.max) || maxHp)
    };
  } else {
    normalized.hp = {
      current: Math.max(0, Math.min(maxHp, Number(parsed.hp) || maxHp)),
      max: maxHp
    };
  }
  normalized.xp = Number.isFinite(Number(parsed.xp))
    ? Number(parsed.xp)
    : (Number.isFinite(Number(parsed.availableXp)) ? Number(parsed.availableXp) : base.xp);

  return normalized;
}

// Pick slots for "choice" moves: 2 at creation, +1 per checked "take another
// move"/"take a move from another playbook" advancement.
function extraMoveSlots() {
  let n = 0;
  (PB.advancement.basic || []).forEach((t, i) => { if (state.advChecked["b" + i] && isTakeMoveText(t)) n++; });
  return n;
}
function moveSlotCap() { return (PB.startingSlots ?? 2) + extraMoveSlots(); }

function save() { localStorage.setItem(storeKey, JSON.stringify(state)); }
function saveSP() { localStorage.setItem(SP_KEY, JSON.stringify(sp)); }

// ---------- rendering ----------
function render() {
  document.getElementById("pb-name").textContent = `— ${PB.name}`;
  renderHeader(); renderLeft(); renderCenter(); renderRight(); renderFooter();
  
  // Update printable import/export footer
  try {
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
    document.getElementById("import-code-val").textContent = b64;
  } catch (e) {
    console.error("Failed to generate import code:", e);
  }
}

function renderHeader() {
  const z = document.getElementById("zone-header");
  z.replaceChildren(
    el("div", { class: "pb-title" }, [
      el("h1", { text: PB.name }),
      el("input", { class: "char-name", value: state.name, placeholder: "name",
        oninput: (e) => { state.name = e.target.value; save(); } })
    ]),
    el("p", { class: "concept", text: PB.concept }),
    el("div", { class: "look-row no-print" }, PB.identity.look.map((l) =>
      el("label", { class: "look" }, [
        el("span", { text: l.label + ": " }),
        el("select", { onchange: (e) => { state.look[l.label] = e.target.value; save(); } },
          l.options.map((o) => el("option", { value: o, selected: state.look[l.label] === o ? "selected" : null, text: o })))
      ]))),
    el("p", { class: "look-print print-only", text: PB.identity.look.map((l) => `${l.label}: ${state.look[l.label]}`).join("  ·  ") }),
    PB.duty ? el("p", { class: "duty", text: PB.duty }) : null
  );
}

// dice pool -> short chip string e.g. "3 ability + 1 prof vs 2 diff"
function poolText(pool) {
  const parts = [];
  if (pool.ability) parts.push(`${pool.ability} ability`);
  if (pool.proficiency) parts.push(`${pool.proficiency} prof`);
  if (pool.boost) parts.push(`${pool.boost} boost`);
  const neg = [];
  if (pool.difficulty) neg.push(`${pool.difficulty} diff`);
  if (pool.challenge) neg.push(`${pool.challenge} chal`);
  if (pool.setback) neg.push(`${pool.setback} setback`);
  return parts.join(" + ") + (neg.length ? ` vs ${neg.join(" + ")}` : "");
}

function resultSummary(r) {
  const bits = [];
  bits.push(r.success ? `SUCCESS (${r.successes})` : "FAILURE");
  if (r.advantages) bits.push(`▲ ${r.advantageTier} advantage (${r.advantages})`);
  if (r.threats) bits.push(`▼ ${r.threatTier} threat (${r.threats})`);
  if (r.triumphs) bits.push(`◆ ${r.triumphs} triumph`);
  if (r.despairs) bits.push(`✶ ${r.despairs} despair`);
  return bits.join("  ·  ");
}

function renderLeft() {
  const z = document.getElementById("zone-left");
  const statGrid = el("div", { class: "stat-grid" }, STAT_KEYS.map((k) => {
    const v = state.stats[k];
    const out = el("span", { class: "stat-roll-out" });
    return el("div", { class: "stat" }, [
      el("div", { class: "stat-name", text: k }),
      el("div", { class: "stat-val", text: String(v) }),
      el("div", { class: "stat-dice", text: `${v} dice` }),
      el("button", { class: "roll-btn no-print", type: "button", text: "roll", onclick: () => {
        // bare check: plain green vs purple, no risk upgrades
        const r = rollMove({ stat: v, ranks: 0, difficulty: "average", risky: false });
        out.textContent = resultSummary(r);
        out.className = `stat-roll-out ${r.success ? "ok" : "bad"}`;
      } }),
      out
    ]);
  }));

  // Chargen: the array is fixed; the archetype's default assignment may be
  // adjusted with exactly one swap of two stats (per stats.swaps > 0),
  // respecting the anchor minimum if the playbook has one.
  let swapPanel = null;
  if (PB.stats.swaps > 0) {
    const selA = el("select", { class: "no-print" }, STAT_KEYS.map((k) => el("option", { value: k, text: k })));
    const selB = el("select", { class: "no-print" }, STAT_KEYS.map((k) => el("option", { value: k, text: k })));
    selB.selectedIndex = 1;
    const status = state.swapDone
      ? `Swapped ${state.swapDone.a} ↔ ${state.swapDone.b}.`
      : "No swap used yet.";
    const anchorNote = PB.stats.anchor ? ` ${PB.stats.anchor.stat} must stay ≥ ${PB.stats.anchor.min}.` : "";
    swapPanel = el("div", { class: "swap-panel no-print" }, [
      el("p", { class: "hint", text: `Chargen: swap two stats' values once, if you like.${anchorNote}` }),
      selA, el("span", { text: " ↔ " }), selB,
      el("button", { class: "no-print", type: "button", text: state.swapDone ? "Undo swap" : "Swap", onclick: () => {
        if (state.swapDone) {
          const { a, b } = state.swapDone;
          const tmp = state.stats[a]; state.stats[a] = state.stats[b]; state.stats[b] = tmp;
          state.swapDone = null;
          save(); render();
          return;
        }
        const a = selA.value, b = selB.value;
        if (a === b) { alert("Pick two different stats to swap."); return; }
        const newA = state.stats[b], newB = state.stats[a];
        const anchor = PB.stats.anchor;
        if (anchor && anchor.stat === a && newA < anchor.min) { alert(`That swap would drop ${a} below its minimum of ${anchor.min}.`); return; }
        if (anchor && anchor.stat === b && newB < anchor.min) { alert(`That swap would drop ${b} below its minimum of ${anchor.min}.`); return; }
        state.stats[a] = newA; state.stats[b] = newB;
        state.swapDone = { a, b };
        save(); render();
      } }),
      el("span", { class: "swap-status", text: " " + status })
    ]);
  }

  const hp = el("div", { class: "vital" }, [
    el("span", { class: "vital-label", text: "HP" }),
    el("button", { class: "no-print", type: "button", text: "−", onclick: () => { state.hp.current = Math.max(0, state.hp.current - 1); save(); render(); } }),
    el("span", { class: "vital-val", text: `${state.hp.current} / ${getMaxHp()}` }),
    el("button", { class: "no-print", type: "button", text: "+", onclick: () => { state.hp.current = Math.min(getMaxHp(), state.hp.current + 1); save(); render(); } })
  ]);
  const xp = el("div", { class: "vital" }, [
    el("span", { class: "vital-label", text: "XP" }),
    el("button", { class: "no-print", type: "button", text: "−", onclick: () => { state.xp = Math.max(0, state.xp - 1); save(); render(); } }),
    el("span", { class: "vital-val", text: String(state.xp) }),
    el("button", { class: "no-print", type: "button", text: "+", onclick: () => { state.xp += 1; save(); render(); } })
  ]);

  const carried = loadUsed();
  const containerLoad = detectedContainerLoad();
  const packAuto = containerLoad.reduce((sum, entry) => sum + entry.bonus, 0);
  const packManual = Number(state.loadBonus) || 0;
  const limits = loadLimits();
  const capacity = limits.heavy;
  const containerSummary = containerLoad
    .map((entry) => `${entry.item} (+${entry.bonus} Load, holds ${entry.capacity})`)
    .join("; ");

  // Determine highest minimum container tier
  let minTierVal = 0; // 0=light, 1=medium, 2=heavy
  for (const entry of containerLoad) {
    if (entry.tier === "heavy") minTierVal = Math.max(minTierVal, 2);
    else if (entry.tier === "medium") minTierVal = Math.max(minTierVal, 1);
  }

  // Evaluate final load tier taking min container tier into account
  let loadTier = "Light";
  let tierDesc = "quick & quiet";
  if (carried > limits.heavy) {
    loadTier = "Overloaded";
    tierDesc = "immobile / encumbered";
  } else if (carried > limits.normal || minTierVal >= 2) {
    loadTier = "Heavy";
    tierDesc = "noisy, slow, hot, quick to tire";
  } else if (carried > limits.light || minTierVal >= 1) {
    loadTier = "Normal";
    tierDesc = "standard mobility";
  }

  const load = el("div", { class: "load-box" }, [
    el("div", { class: "load-row" }, [
      el("span", { class: "vital-label", text: "Load" }),
      el("button", { class: "no-print", type: "button", text: "-", title: "Remove carried equipment load", onclick: () => { state.loadUsed = Math.max(0, loadUsed() - 1); save(); render(); } }),
      el("span", { class: "vital-val", text: `${carried} / ${capacity}` }),
      el("button", { class: "no-print", type: "button", text: "+", title: "Add carried equipment load", onclick: () => { state.loadUsed = loadUsed() + 1; save(); render(); } })
    ]),
    el("div", { class: "load-row no-print" }, [
      el("span", { class: "vital-label", text: "Pack" }),
      el("button", { type: "button", text: "-", title: "Remove manual pack space", onclick: () => { state.loadBonus = Math.max(0, (Number(state.loadBonus) || 0) - 1); save(); render(); } }),
      el("span", { class: "load-bonus", title: containerSummary ? `Detected container space: ${containerSummary}` : "No container space detected", text: `+${packAuto} auto / +${packManual}` }),
      el("button", { type: "button", text: "+", title: "Add manual pack space", onclick: () => { state.loadBonus = (Number(state.loadBonus) || 0) + 1; save(); render(); } })
    ]),
    containerSummary ? el("div", { class: "load-detected", text: `Detected: ${containerSummary}` }) : null,
    el("div", {
      class: "load-note" + (carried > limits.heavy ? " over" : ""),
      text: `Status: ${loadTier} (${tierDesc}). Limits: Light ≤${limits.light}, Normal ≤${limits.normal}, Heavy ≤${limits.heavy}.`
    })
  ]);

  z.replaceChildren(...[
    el("h2", { text: "Stats" }),
    el("p", { class: "hint", text: "Value = ability dice. A move you have upgrades 1 to proficiency." }),
    statGrid,
    swapPanel,
    el("h2", { text: "Vitals" }), hp,
    el("div", { class: "vital-static", text: `Damage ${PB.derived.damage}` }),
    load,
    xp,
    el("p", { class: "hint", text: "Rolling physical dice instead? Use +/− to mark XP by hand — failure = +1, and mark more at the GM's call." })
  ].filter(Boolean));
}

function renderMove(m) {
  const wrap = el("div", { class: `move move-${m.type}` });
  const head = el("div", { class: "move-head" }, [
    el("span", { class: "move-name", text: m.name }),
    el("span", { class: `move-tag tag-${m.category || m.type}`, text: m.locked ? "level 6+" : (m.category || m.type) })
  ]);
  if (m.type === "choice" && !m.locked) {
    head.appendChild(el("label", { class: "move-pick no-print" }, [
      el("input", { type: "checkbox", checked: state.chosen.includes(m.name) ? "checked" : null,
        onchange: (e) => {
          if (e.target.checked) {
            if (m.category === "starting") {
              const proposed = state.chosen.includes(m.name) ? state.chosen.slice() : state.chosen.concat(m.name);
              const startingMoves = proposed.filter((n) => {
                const mv = PB.moves.find((x) => x.name === n);
                return mv && mv.type === "choice" && mv.category === "starting";
              });
              const validation = validateStartingChoices(
                { startingSlots: moveSlotCap(), startingRules: PB.startingRules || [] },
                startingMoves,
                { requireComplete: false }
              );
              if (!validation.ok) {
                e.target.checked = false;
                alert(validation.message);
                return;
              }
            }
            if (!state.chosen.includes(m.name)) state.chosen.push(m.name);
            if (m.name.match(/^(Weird Patron:|God:|Guildmaster:)/)) {
              state.obligations = state.obligations || [];
              if (!state.obligations.some(o => o.type === m.name)) {
                state.obligations.push({ type: m.name, value: 10 });
              }
            }
          } else {
            state.chosen = state.chosen.filter((n) => n !== m.name);
            if (m.name.match(/^(Weird Patron:|God:|Guildmaster:)/)) {
              state.obligations = (state.obligations || []).filter(o => o.type !== m.name);
            }
          }
          save(); render();
        } }),
      el("span", { text: "taken" })
    ]));
  }
  wrap.appendChild(head);
  wrap.appendChild(el("p", { class: "move-trigger", text: m.trigger }));

  const usable = m.type !== "choice" || (!m.locked && state.chosen.includes(m.name));
  const res = m.results;
  const rollable = !!(res || m.statPick || m.stat);

  // Structured results block, only for moves that define one (older per-file
  // playbooks). Bundle moves state their outcomes in the description instead.
  if (res) {
    const block = el("div", { class: "results" });
    block.appendChild(el("p", { class: "r-success" }, [el("b", { text: "Success: " }), res.success]));
    if (res.failure) block.appendChild(el("p", { class: "r-failure" }, [el("b", { text: "Failure: " }), res.failure]));
    if (res.advantage && res.advantage.length) {
      block.appendChild(el("div", { class: "r-adv" }, [el("b", { text: "▲ Advantage — spend on:" }), el("ul", {}, res.advantage.map((x) => el("li", { text: x })))]));
    }
    if (res.threat && res.threat.length) {
      block.appendChild(el("div", { class: "r-threat" }, [el("b", { text: "▼ Threat — GM spends on:" }), el("ul", {}, res.threat.map((x) => el("li", { text: x })))]));
    }
    if (res.triumph) block.appendChild(el("p", { class: "r-triumph" }, [el("b", { text: "◆ Triumph: " }), res.triumph]));
    if (res.despair) block.appendChild(el("p", { class: "r-despair" }, [el("b", { text: "✶ Despair: " }), res.despair]));
    wrap.appendChild(block);
  }

  if (rollable) {
    if (!usable) {
      // Reference only: you haven't taken this move, so it can't be rolled.
      wrap.appendChild(el("p", { class: "move-locked", text: m.locked ? "Locked until level 6+." : "Not taken — check \"taken\" above, or pick it via advancement, to roll this move." }));
    } else {
      const out = el("div", { class: "move-out" });
      let diff = m.difficulty || "average";
      let boost = 0, setback = 0, risky = true;
      let stat = m.stat;
      let ranks = m.trained === false ? 0 : (state.trainedRanks?.[m.name] ?? 1);
      const diffSel = el("select", { class: "no-print", onchange: (e) => { diff = e.target.value; } },
        DIFFS.map((d) => el("option", { value: d, selected: d === diff ? "selected" : null, text: d })));
      // stat picker for moves that don't name a stat (player chooses by fiction)
      const statSel = m.statPick ? el("select", { class: "no-print", title: "Which stat fits what you're doing?", onchange: (e) => { stat = e.target.value; } },
        STAT_KEYS.map((k) => el("option", { value: k, selected: k === stat ? "selected" : null, text: `${k} (${state.stats[k]})` }))) : null;
      const bChip = el("span", { class: "chip", text: "boost 0" });
      const sChip = el("span", { class: "chip", text: "setback 0" });
      const controls = el("div", { class: "roll-controls no-print" }, [
        m.statPick ? el("span", { text: "stat " }) : null, statSel,
        el("span", { text: " difficulty " }), diffSel,
        el("label", { class: "risky-toggle", title: "Risky rolls always carry at least 1 yellow and 1 red — triumph and despair are both live." }, [
          el("input", { type: "checkbox", checked: "checked", onchange: (e) => { risky = e.target.checked; } }),
          el("span", { text: " risky" })
        ]),
        el("span", { class: "stepper" }, [el("button", { type: "button", text: "−", onclick: () => { boost = Math.max(0, boost - 1); bChip.textContent = `boost ${boost}`; } }), bChip, el("button", { type: "button", text: "+", onclick: () => { boost++; bChip.textContent = `boost ${boost}`; } })]),
        el("span", { class: "stepper" }, [el("button", { type: "button", text: "−", onclick: () => { setback = Math.max(0, setback - 1); sChip.textContent = `setback ${setback}`; } }), sChip, el("button", { type: "button", text: "+", onclick: () => { setback++; sChip.textContent = `setback ${setback}`; } })]),
        el("button", { class: "roll-btn", type: "button", text: m.statPick ? "Roll" : `Roll +${m.stat}`, onclick: () => {
          const r = rollMove({ stat: state.stats[stat], ranks, difficulty: diff, boost, setback, risky });
          const nodes = [
            el("div", { class: "roll-pool", text: poolText(r.pool) }),
            el("div", { class: `roll-verdict ${r.success ? "ok" : "bad"}`, text: resultSummary(r) })
          ];
          if (res) {
            nodes.push(el("div", { class: "roll-result", text: r.success ? res.success : (res.failure || "You don't. The GM makes a move.") }));
            if (r.triumphs && res.triumph) nodes.push(el("div", { class: "r-triumph", text: "◆ " + res.triumph }));
            if (r.despairs && res.despair) nodes.push(el("div", { class: "r-despair", text: "✶ " + res.despair }));
          } else {
            nodes.push(el("div", { class: "roll-result hint", text: "Read the move above to apply this result." }));
          }
          if (!r.success) nodes.push(el("button", { class: "xp-btn", type: "button", text: "mark XP", onclick: () => { state.xp += 1; save(); render(); } }));
          out.replaceChildren(...nodes);
        } })
      ]);
      wrap.appendChild(controls);
      wrap.appendChild(out);
    }
  } else if (m.text) {
    wrap.appendChild(el("p", { class: "move-text", text: m.text }));
  }
  if (m.hold) wrap.appendChild(renderHold(m.hold));
  return wrap;
}

function renderHold(hold) {
  const box = el("div", { class: "hold" });
  box.appendChild(el("div", { class: "hold-head" }, [
    el("span", { class: "hold-name", text: hold.name }),
    el("button", { class: "no-print", type: "button", text: "−", onclick: () => { state.holds[hold.name] = Math.max(0, (state.holds[hold.name] || 0) - 1); save(); render(); } }),
    el("span", { class: "hold-val", text: String(state.holds[hold.name] || 0) }),
    el("button", { class: "no-print", type: "button", text: "+", onclick: () => { state.holds[hold.name] = (state.holds[hold.name] || 0) + 1; save(); render(); } })
  ]));
  box.appendChild(el("ul", { class: "hold-spend" }, hold.spend.map((s) => el("li", { text: s }))));
  return box;
}

function renderMoveSection(title, moves, hint = "") {
  return el("section", { class: "move-section" }, [
    el("h2", { text: title }),
    hint ? el("p", { class: "hint", text: hint }) : null,
    ...(moves.length ? moves.map(renderMove) : [el("p", { class: "hint", text: "No moves in this section." })])
  ]);
}

function renderHiddenMoveSection(title, hint = "") {
  return el("section", { class: "move-section move-section-hidden" }, [
    el("h2", { text: title }),
    el("p", { class: "hint", text: hint })
  ]);
}

function playableMove(move) {
  return { ...move, type: "fixed", locked: false };
}

function isReferenceMove(move) {
  return move.name.startsWith("Background ") || move.name === "Instincts" || move.name === "Gear";
}

function uniqueMovesByName(moves) {
  const seen = new Set();
  return moves.filter((move) => {
    if (seen.has(move.name)) return false;
    seen.add(move.name);
    return true;
  });
}

function defaultStartingChoices(pb) {
  const startingMoves = pb.moves.filter((m) => m.type === "choice" && m.category === "starting");
  const startingNames = startingMoves.map((m) => m.name);
  const chosen = [];
  for (const rule of pb.startingRules || []) {
    const firstAllowed = (rule.moves || []).find((name) => startingNames.includes(name) && !chosen.includes(name));
    if (firstAllowed) chosen.push(firstAllowed);
  }
  const ruleMoveNames = new Set((pb.startingRules || []).flatMap((rule) => rule.moves || []));
  for (const move of startingMoves) {
    if (chosen.length >= (pb.startingSlots || 0)) break;
    if (!chosen.includes(move.name) && !ruleMoveNames.has(move.name)) chosen.push(move.name);
  }
  for (const move of startingMoves) {
    if (chosen.length >= (pb.startingSlots || 0)) break;
    if (!chosen.includes(move.name)) chosen.push(move.name);
  }
  return chosen;
}

function advancementMarkerCount() {
  if (!PB || !state) return 0;
  const chosenAdvancements = PB.moves
    .filter((m) => m.category === "advancement" && state.chosen.includes(m.name))
    .length;
  const checkedAdvancements = Object.values(state.advChecked || {}).filter(Boolean).length;
  return Math.max(chosenAdvancements, checkedAdvancements);
}

function levelSixUnlocked() {
  return advancementMarkerCount() >= LEVEL_SIX_ADVANCEMENT_COUNT;
}

function renderCenter() {
  const chosen = new Set(state.chosen || []);
  const fixed = PB.moves.filter((m) => m.category === "fixed" && !isReferenceMove(m));
  const selected = uniqueMovesByName(PB.moves.filter((m) => m.category !== "fixed" && chosen.has(m.name)));
  const playbookMoves = fixed.concat(selected).map(playableMove);
  document.getElementById("zone-center").replaceChildren(
    renderMoveSection("Common Moves", COMMON_MOVES, "Available to every character at the table."),
    renderMoveSection("Your Moves", playbookMoves, "Only fixed moves and the choices on this character are shown here.")
  );
}

function renderTrack(t) {
  const row = el("div", { class: "track" });
  row.appendChild(el("div", { class: "track-name", text: t.name }));
  const pips = el("div", { class: "pips" });
  for (let i = t.min; i <= t.max; i++) {
    pips.appendChild(el("button", { class: "pip" + (i <= state.tracks[t.name] && i > 0 ? " filled" : "") + (i === 0 ? " zero" : ""), type: "button", title: String(i),
      onclick: () => { state.tracks[t.name] = i; save(); render(); } }, [String(i)]));
  }
  row.appendChild(pips);
  if (t.note) row.appendChild(el("div", { class: "track-note", text: t.note }));
  return row;
}

function flattenChoiceValue(value) {
  if (value == null || value === "") return [];
  if (Array.isArray(value)) return value.flatMap(flattenChoiceValue);
  if (typeof value === "object") return Object.values(value).flatMap(flattenChoiceValue);
  return [String(value)];
}

function normalizeChoiceName(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function backgroundChoiceName(moveName) {
  return String(moveName || "").replace(/^Background\s+[^A-Za-z0-9]*\s*/, "").trim();
}

function moveChoiceDetail(move) {
  if (!move) return "";
  const parts = [move.trigger, move.text, move.description]
    .filter((part, index, list) => part && list.indexOf(part) === index);
  return parts.join(" ");
}

function compactChoiceText(value, max = 170) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

function compactGearText(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  const markers = [
    " Place of origin",
    " AEGIS OF FAITH",
    " Moves You start",
    " Special possessions",
    " Stats Assign",
    " --- PAGE"
  ];
  const markerAt = markers
    .map((marker) => text.indexOf(marker))
    .filter((index) => index > 0)
    .sort((a, b) => a - b)[0];
  return compactChoiceText(markerAt ? text.slice(0, markerAt) : text);
}

function findBackgroundChoice(name) {
  const target = normalizeChoiceName(name);
  if (!target) return null;
  return PB.moves.find((move) =>
    move.category === "fixed" &&
    move.name.startsWith("Background") &&
    normalizeChoiceName(backgroundChoiceName(move.name)) === target
  ) || null;
}

function renderChoiceValue(value, detail = "") {
  return el("span", {
    class: "choice-value",
    text: value,
    title: detail || null
  });
}

function renderChoiceItem(title, detail = "") {
  const cleanDetail = compactChoiceText(detail);
  return el("div", { class: "choice-item" }, [
    renderChoiceValue(title, detail),
    cleanDetail ? el("div", { class: "choice-item-detail", text: cleanDetail }) : null
  ]);
}

function renderChoiceRow(label, children) {
  return [
    el("dt", { text: label }),
    el("dd", {}, children)
  ];
}

function renderChoicesPanel() {
  const chosen = new Set(state.chosen || []);
  const selectedMoves = uniqueMovesByName(PB.moves
    .filter((m) => m.category !== "fixed" && chosen.has(m.name)));
  const backgroundMove = findBackgroundChoice(state.backgroundName);
  const backstoryChoices = flattenChoiceValue(state.backstorySelections)
    .filter((item) => item.trim());
  const rows = [
    state.backgroundName ? renderChoiceRow("Background", [
      renderChoiceItem(state.backgroundName, moveChoiceDetail(backgroundMove))
    ]) : null,
    selectedMoves.length ? renderChoiceRow("Moves", selectedMoves.map((move) =>
      renderChoiceItem(move.name, moveChoiceDetail(move))
    )) : null,
    state.gearText ? renderChoiceRow("Gear", [
      renderChoiceValue(compactGearText(state.gearText))
    ]) : null,
    state.steadingUpgrades ? renderChoiceRow("Steading", [
      renderChoiceValue(compactChoiceText(state.steadingUpgrades), state.steadingUpgrades)
    ]) : null,
    backstoryChoices.length ? renderChoiceRow("Backstory", [
      renderChoiceValue(compactChoiceText(backstoryChoices.join(" | ")), backstoryChoices.join(" | "))
    ]) : null,
    state.notes ? renderChoiceRow("Notes", [
      renderChoiceValue(compactChoiceText(state.notes), state.notes)
    ]) : null
  ].filter(Boolean).flat();

  return el("section", { class: "choice-summary" }, [
    el("h2", { text: "Choices" }),
    rows.length
      ? el("dl", { class: "choice-summary-list" }, rows)
      : el("p", { class: "hint", text: "No character-generation choices have been saved yet." })
  ]);
}

function renderRight() {
  const z = document.getElementById("zone-right");
  const em = PB.embedment;
  const kids = [renderChoicesPanel(), el("h2", { text: "Embedment" })];
  if (em) {
    if (em.system) {
      const startStr = em.start ? ` Start: ${Object.entries(em.start).map(([k, v]) => `${k} ${v}`).join(", ")}.` : "";
      kids.push(el("p", { class: "embed-system", text: `Foregrounds the ${em.system} system.${startStr}` }));
    }
    if (PB.tracks && PB.tracks.length) kids.push(el("div", { class: "tracks" }, PB.tracks.map(renderTrack)));
    if (em.bonds) { kids.push(el("h3", { text: "Bonds" })); kids.push(el("ul", { class: "bonds-list" }, em.bonds.map((b) => el("li", { text: b })))); }
    if (em.communityTie) { kids.push(el("h3", { text: "Community tie" })); kids.push(el("ul", { class: "tie-list" }, em.communityTie.map((b) => el("li", { text: b })))); }
  } else {
    kids.push(el("p", { class: "embed-system", text: "No power-structure layer in this setting; ties are tracked through Bonds." }));
  }

  // Obligations panel for Lankhmar and Dark Sun
  if (PB.campaignId === "lankhmar" || PB.campaignId === "darksun") {
    kids.push(el("h2", { text: "Patrons & Obligations" }));
    kids.push(el("p", { class: "hint", text: "Track your debts, patrons, or complications. Roll d100 at the start of each session." }));

    state.obligations = state.obligations || [];
    const listDiv = el("div", { class: "obligations-list" });
    
    let totalObligation = 0;
    state.obligations.forEach((o, index) => {
      totalObligation += Number(o.value) || 0;
      
      const row = el("div", { class: "obligation-row", style: "display: flex; gap: 4px; margin-bottom: 4px;" }, [
        el("input", {
          type: "text",
          value: o.type || "",
          placeholder: "e.g., Hunted by Templars",
          style: "flex: 2; font-size: 0.85rem; padding: 2px 4px;",
          onchange: (e) => { o.type = e.target.value; save(); }
        }),
        el("input", {
          type: "number",
          value: String(o.value || 0),
          min: "0",
          max: "100",
          style: "width: 50px; font-size: 0.85rem; padding: 2px 4px;",
          onchange: (e) => { o.value = Math.max(0, Number(e.target.value) || 0); save(); render(); }
        }),
        el("button", {
          type: "button",
          text: "−",
          class: "no-print clear-btn danger",
          style: "padding: 2px 8px; font-size: 0.85rem;",
          onclick: () => {
            state.obligations.splice(index, 1);
            save();
            render();
          }
        })
      ]);
      listDiv.appendChild(row);
    });
    kids.push(listDiv);

    // Controls
    const controls = el("div", { style: "display: flex; gap: 4px; margin-top: 8px;" }, [
      el("button", {
        type: "button",
        text: "+ Add Obligation",
        class: "clear-btn",
        style: "flex: 1; font-size: 0.85rem;",
        onclick: () => {
          state.obligations.push({ type: "", value: 10 });
          save();
          render();
        }
      }),
      el("button", {
        type: "button",
        text: "🎲 Roll d100 Check",
        class: "clear-btn",
        style: "flex: 1; font-size: 0.85rem; background-color: var(--accent-light);",
        onclick: () => rollObligation()
      })
    ]);
    kids.push(controls);

    // Status / Summary
    const statusText = state.obligationSessionRoll
      ? `Last Roll: ${state.obligationSessionRoll} (Total Range: 1–${totalObligation})`
      : `Not rolled this session (Total Value: ${totalObligation})`;
      
    const statusRow = el("div", { style: "margin-top: 8px; font-size: 0.85rem; display: flex; align-items: center; justify-content: space-between;" }, [
      el("span", { text: statusText }),
      state.obligationTriggered ? el("button", {
        type: "button",
        text: "Clear Trigger",
        class: "clear-btn",
        style: "font-size: 0.75rem; padding: 2px 6px;",
        onclick: () => {
          state.obligationTriggered = null;
          state.obligationSessionRoll = null;
          save();
          render();
        }
      }) : null
    ]);
    kids.push(statusRow);

    // Show active triggered warning
    if (state.obligationTriggered) {
      let penaltyDesc = "Shared party stress (-1 Strain Threshold). Check campaign rules for narrative complications.";
      if (state.obligationTriggered.includes("Ningauble")) {
        penaltyDesc = "⚠️ STORY POINT LOCKOUT: You cannot spend Player Story Points this session!";
      } else if (state.obligationTriggered.includes("Sheelba")) {
        penaltyDesc = "⚠️ SHADOW SICKNESS: -2 HP to your maximum Wound Threshold (already applied to your sheet)!";
      } else if (state.obligationTriggered.includes("Watch")) {
        penaltyDesc = "⚠️ WATCH SURVEILLANCE: All stealth and disguise checks in noble quarters upgrade 1 purple Difficulty to 1 red Challenge die!";
      } else if (state.obligationTriggered.includes("Thieves' Guild")) {
        penaltyDesc = "⚠️ GUILD DEBT: 20% coin toll this session. If unpaid, upgrade Rest checks by 1 red Challenge die.";
      } else if (state.obligationTriggered.includes("Hunted")) {
        penaltyDesc = "⚠️ TEMPLAR HUNT: All Initiative and Stealth rolls upgrade 1 purple Difficulty to 1 red Challenge die.";
      } else if (state.obligationTriggered.includes("Defiler's Reek")) {
        penaltyDesc = "⚠️ ANATHEMA: All social checks with commoners or druids suffer 2 black Setback dice.";
      } else if (state.obligationTriggered.includes("Sorcerer-King")) {
        penaltyDesc = "⚠️ WAY DRAIN: Triggering any psionic wild talents or disciplines costs 1 additional strain (or 1 HP/wound).";
      }
      
      const alertBox = el("div", {
        class: "r-threat",
        style: "margin-top: 10px; padding: 8px; border-radius: 4px; border: 1px solid var(--border-color);"
      }, [
        el("b", { text: `⚠️ TRIGGERED: ${state.obligationTriggered}` }),
        el("p", { style: "margin: 4px 0 0 0; font-size: 0.8rem; line-height: 1.2;", text: penaltyDesc })
      ]);
      kids.push(alertBox);
    }
  }

  z.replaceChildren(...kids);
}

// GUIDE.md: "Spend 5 XP to take one advancement checkbox." Checking spends
// the XP (blocked if you can't afford it); unchecking refunds it and reverts
// any effect the box applied (stat raise, trained rank, extra move slot).
function onAdvToggle(key, wantChecked, kind) {
  if (wantChecked) {
    if (state.xp < ADV_XP_COST) {
      alert(`Not enough XP. This costs ${ADV_XP_COST} XP; you have ${state.xp}.`);
      render(); // re-sync the checkbox visual back to unchecked
      return;
    }
    state.xp -= ADV_XP_COST;
    state.advChecked[key] = true;
  } else {
    state.xp += ADV_XP_COST;
    state.advChecked[key] = false;
    if (kind.isStat && state.advChoices[key]) {
      state.stats[state.advChoices[key]] = Math.max(1, state.stats[state.advChoices[key]] - 1);
      delete state.advChoices[key];
    }
    if (kind.isTrain && state.advChoices[key]) {
      delete state.trainedRanks[state.advChoices[key]];
      delete state.advChoices[key];
    }
    // isTakeMove: no stored effect to revert; moveSlotCap() recomputes live.
    // Any already-chosen moves over the new cap are left alone, not stripped.
  }
  save(); render();
}

function applyStatRaise(key, statKey) {
  if (!state.advChecked[key] || state.advChoices[key] === statKey) return;
  if (state.advChoices[key]) state.stats[state.advChoices[key]] = Math.max(1, state.stats[state.advChoices[key]] - 1);
  if (statKey) {
    state.stats[statKey] = Math.min(PB.chassis.statCap, (state.stats[statKey] || 1) + 1);
    state.advChoices[key] = statKey;
  } else {
    delete state.advChoices[key];
  }
  save(); render();
}

function applyTrainMove(key, moveName) {
  if (!state.advChecked[key] || state.advChoices[key] === moveName) return;
  if (state.advChoices[key]) delete state.trainedRanks[state.advChoices[key]];
  if (moveName) {
    state.trainedRanks[moveName] = 2;
    state.advChoices[key] = moveName;
  } else {
    delete state.advChoices[key];
  }
  save(); render();
}

function advItem(text, key) {
  const isStat = isStatRaiseText(text);
  const isTrain = isTrainMoveText(text);
  const isTakeMove = isTakeMoveText(text);
  const checked = !!state.advChecked[key];
  const kids = [
    el("input", { class: "no-print", type: "checkbox", checked: checked ? "checked" : null,
      onchange: (e) => onAdvToggle(key, e.target.checked, { isStat, isTrain, isTakeMove }) }),
    el("span", { class: "adv-box print-only", text: checked ? "☑" : "☐" }),
    el("span", { text: text + " " }),
    el("span", { class: "adv-cost", text: `(${ADV_XP_COST} XP)` })
  ];
  if (checked && isStat) {
    const chosenStat = state.advChoices[key] || "";
    kids.push(el("select", { class: "no-print adv-picker", onchange: (e) => applyStatRaise(key, e.target.value) },
      [el("option", { value: "", selected: !chosenStat ? "selected" : null, text: "choose stat…" })].concat(
        STAT_KEYS.map((k) => el("option", { value: k, selected: chosenStat === k ? "selected" : null, text: `${k} (${state.stats[k]})` })))));
    if (chosenStat) kids.push(el("span", { class: "adv-applied", text: `→ ${chosenStat} raised` }));
  }
  if (checked && isTrain) {
    const rollableTaken = PB.moves.filter((mv) => state.chosen.includes(mv.name) && mv.results);
    const chosenMove = state.advChoices[key] || "";
    kids.push(el("select", { class: "no-print adv-picker", onchange: (e) => applyTrainMove(key, e.target.value) },
      [el("option", { value: "", selected: !chosenMove ? "selected" : null, text: "choose a taken move…" })].concat(
        rollableTaken.map((mv) => el("option", { value: mv.name, selected: chosenMove === mv.name ? "selected" : null, text: mv.name })))));
    if (chosenMove) kids.push(el("span", { class: "adv-applied", text: `→ ${chosenMove} trained to 2` }));
  }
  return el("label", { class: "adv" }, kids);
}

function renderFooter() {
  const z = document.getElementById("zone-footer");
  const gear = el("div", { class: "gear" }, (PB.gear || []).map((g) =>
    el("label", { class: "gear-row" }, [
      el("span", { class: "gear-label", text: g.label + ": " }),
      el("select", { class: "no-print", onchange: (e) => { state.gear[g.label] = e.target.value; save(); render(); } },
        g.options.map((o) => el("option", { value: o, selected: state.gear[g.label] === o ? "selected" : null, text: o }))),
      el("span", { class: "gear-print print-only", text: state.gear[g.label] })
    ])));
  z.replaceChildren(
    el("div", { class: "footer-col" }, [el("h2", { text: "Advancement" }), el("div", { class: "adv-list" }, PB.advancement.basic.map((a, i) => advItem(a, "b" + i)))]),
    el("div", { class: "footer-col" }, [
      el("h3", { text: "Advanced (rare)" }),
      el("div", { class: "adv-list" }, PB.advancement.advanced.map((a, i) => advItem(a, "a" + i))),
      el("h2", { text: "Gear" }), gear
    ])
  );
}

function renderStoryPoints() {
  const host = document.getElementById("story-points");
  host.replaceChildren(
    el("span", { class: "sp-label", text: "Story Points" }),
    el("span", { class: "sp-side" }, [
      el("span", { text: "you " }),
      el("button", { type: "button", text: "−", onclick: () => { if (sp.player > 0) { sp.player--; sp.gm++; saveSP(); renderStoryPoints(); } } }),
      el("b", { text: String(sp.player) }),
      el("button", { type: "button", text: "+", onclick: () => { sp.player++; saveSP(); renderStoryPoints(); } })
    ]),
    el("span", { class: "sp-side" }, [
      el("span", { text: "GM " }),
      el("button", { type: "button", text: "−", onclick: () => { if (sp.gm > 0) { sp.gm--; sp.player++; saveSP(); renderStoryPoints(); } } }),
      el("b", { text: String(sp.gm) }),
      el("button", { type: "button", text: "+", onclick: () => { sp.gm++; saveSP(); renderStoryPoints(); } })
    ])
  );
}

// The one loader: resolve a playbook id (a slugified archetype name) against
// the CAMPAIGNS_DATA bundle and adapt that archetype into the shape the sheet
// renderers expect. This is the single source of truth for every campaign.
// Returns null if no matching archetype is found.
function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

function inferredLoadFormula(arch, campaign) {
  if (arch.load) return arch.load;
  if (!campaign || campaign.id === "stonetop") return "6+STR";
  const heavyNames = /gladiator|mercenary|scavenger|smith|shaper/i;
  if (arch.damage_die === "d10" || Number(arch.hp) >= 20 || heavyNames.test(arch.name || "")) return "8+STR";
  return "6+STR";
}

// ---- Genesys enrichment layer ----
// The bundle stores moves as name + description, and the converted campaigns
// already fold their Genesys outcomes into that description prose ("on a
// success with Advantage, ...; on Threat, ..."). So enrichment here does NOT
// fabricate a duplicate results menu — it makes each move *rollable* (a pool
// the player builds and rolls, choosing the stat that fits the fiction) and
// adds a light per-campaign embedment track. The move's own text is the read.
const CAMPAIGN_TRACKS = {
  stonetop: [{ name: "Standing", min: 0, max: 3, start: 1, note: "Your standing with the folk of the village." }],
  darksun: [{ name: "Heat", min: 0, max: 4, start: 0, note: "How much danger's eye is on you in the wastes." }],
  lankhmar: [{ name: "Heat", min: 0, max: 4, start: 0, note: "The city's eye — the watch, the guilds, and rivals." }],
  elfquest: [{ name: "Standing", min: 0, max: 3, start: 1, note: "Your standing within the tribe." }]
};

function highestStat(stats) {
  return STAT_KEYS.reduce((best, k) => ((stats[k] || 0) > (stats[best] || 0) ? k : best), STAT_KEYS[0]);
}

function bundleArchetypeToPlaybook(id) {
  const bundle = (typeof window !== "undefined" && window.CAMPAIGNS_DATA) || null;
  if (!bundle) return null;
  let arch = null, campaign = null;
  for (const c of bundle) {
    const found = (c.archetypes || []).find((a) => slugify(a.name) === id);
    if (found) { arch = found; campaign = c; break; }
  }
  if (!arch) return null;

  const topStat = highestStat(arch.stats || {});
  const groups = getMoveGroups(arch, campaign);
  const moves = [];
  const addGroupedMove = (m, type) => moves.push({
    name: m.name,
    type,
    category: m.category,
    locked: !!m.locked,
    trigger: m.description || m.text || "",
    stat: topStat,
    statPick: !m.synthetic
  });
  groups.fixed.forEach((m) => addGroupedMove(m, "fixed"));
  groups.starting.forEach((m) => addGroupedMove(m, "choice"));
  groups.advancement.forEach((m) => addGroupedMove(m, "choice"));
  groups.level6.forEach((m) => addGroupedMove(m, "choice"));
  // Surface backgrounds and instincts (which the sheet has no dedicated slot
  // for) as always-on reference entries so nothing is lost.
  (arch.backgrounds || []).forEach((b) => moves.push({ name: `Background — ${b.name}`, type: "fixed", category: "fixed", trigger: "", text: b.description || "" }));
  if (Array.isArray(arch.instincts) && arch.instincts.length) {
    moves.push({ name: "Instincts", type: "fixed", category: "fixed", trigger: "", text: arch.instincts.join(" · ") });
  }
  const gearText = Array.isArray(arch.gear) ? arch.gear.join(" · ") : (arch.gear || "");
  if (gearText) moves.push({ name: "Gear", type: "fixed", category: "fixed", trigger: "", text: gearText });

  const tracks = CAMPAIGN_TRACKS[campaign && campaign.id] || [];
  const statCap = 5;
  return {
    id,
    campaignId: campaign ? campaign.id : "stonetop",
    name: arch.name,
    concept: campaign ? `${campaign.name} — ${campaign.tagline || ""}`.trim() : "",
    duty: arch.duty || "",
    chassis: { resolution: "genesys-narrative", array: [4, 3, 3, 2, 2, 1], statCap },
    identity: { names: [], look: [] },
    stats: { default: { ...arch.stats }, anchor: null, swaps: 0 },
    derived: { hp: String(arch.hp ?? 0), damage: arch.damage_die || "d6", load: inferredLoadFormula(arch, campaign) },
    gear: [],
    moves,
    startingText: groups.startingText,
    startingSlots: groups.startingSlots,
    startingRules: groups.startingRules,
    embedment: tracks.length ? {} : undefined,
    tracks,
    advancement: { basic: [], advanced: [] }
  };
}

// ---------- boot ----------
async function boot() {
  const params = new URLSearchParams(location.search);
  
  // Handle URL import if present
  const importCode = params.get("import") || params.get("load");
  let urlImportState = null;
  if (importCode) {
    try {
      const decoded = decodeURIComponent(escape(atob(importCode)));
      urlImportState = JSON.parse(decoded);
    } catch (e) {
      console.error("URL import failed:", e);
    }
  }

  // Determine which playbook to load
  let id = params.get("pb") || (urlImportState ? urlImportState.playbookId : null);
  let showSelectorOnBoot = false;
  
  if (!id) {
    id = localStorage.getItem(ACTIVE_PB_KEY);
    if (!id) {
      // Default to the first archetype of the first campaign in the bundle.
      const firstArch = window.CAMPAIGNS_DATA?.[0]?.archetypes?.[0];
      id = firstArch ? slugify(firstArch.name) : "";
      showSelectorOnBoot = true; // Show selector overlay immediately on first boot
    }
  }
  
  // Save current active playbook ID
  localStorage.setItem(ACTIVE_PB_KEY, id);

  // Single source of truth: every archetype is loaded from the CAMPAIGNS_DATA
  // bundle (data.js) and adapted to the sheet's shape. No per-file fetch, no
  // fallback — the bundle is the one complete, consistent set of all campaigns.
  PB = bundleArchetypeToPlaybook(id);
  if (!PB) throw new Error(`could not load playbook "${id}" from the campaign data`);
  storeKey = `stonesys:${PB.id}`;
  
  state = (() => {
    if (urlImportState) {
      // Clean url parameters
      const url = new URL(window.location);
      url.searchParams.delete("import");
      url.searchParams.delete("load");
      window.history.replaceState({}, document.title, url.toString());
      return normalizeLoadedState(urlImportState, PB, id);
    }
    const s = localStorage.getItem(storeKey);
    if (!s) return defaultState(PB);
    return normalizeLoadedState(JSON.parse(s), PB, id);
  })();
  
  sp = (() => { const s = localStorage.getItem(SP_KEY); return s ? JSON.parse(s) : { player: 1, gm: 1 }; })();

  // Wire up Google Drive actions
  const settingsModal = document.getElementById("settings-modal");
  const clientIdInput = document.getElementById("gdrive-client-id-input");
  
  document.getElementById("gdrive-settings-btn").addEventListener("click", () => {
    clientIdInput.value = localStorage.getItem(CLIENT_ID_KEY) || "";
    settingsModal.style.display = "flex";
  });
  
  document.getElementById("settings-save-btn").addEventListener("click", () => {
    localStorage.setItem(CLIENT_ID_KEY, clientIdInput.value.trim());
    settingsModal.style.display = "none";
  });
  
  document.getElementById("settings-close-btn").addEventListener("click", () => {
    settingsModal.style.display = "none";
  });

  document.getElementById("gdrive-save-btn").addEventListener("click", () => {
    const clientId = localStorage.getItem(CLIENT_ID_KEY);
    if (!clientId) {
      alert("Please configure your Google OAuth Client ID in Settings first.");
      clientIdInput.value = "";
      settingsModal.style.display = "flex";
      return;
    }
    
    getAccessToken(clientId, async (accessToken) => {
      const loadingEl = document.getElementById("loading");
      try {
        if (loadingEl) {
          loadingEl.style.display = "block";
          loadingEl.textContent = "Saving character to Google Drive...";
        }
        // Save playbookId inside state so url importing knows which file to fetch
        state.playbookId = id;
        const result = await saveCharacterToDrive(accessToken, state, PB);
        if (result && result.id) {
          state.driveFileId = result.id;
          save();
        }
        alert("Character saved to Google Drive successfully!");
      } catch (err) {
        alert("Error saving to Drive: " + err.message);
      } finally {
        if (loadingEl) loadingEl.style.display = "none";
      }
    });
  });

  const loaderModal = document.getElementById("loader-modal");
  const fileListContainer = document.getElementById("gdrive-file-list");
  
  document.getElementById("gdrive-load-btn").addEventListener("click", () => {
    const clientId = localStorage.getItem(CLIENT_ID_KEY);
    if (!clientId) {
      alert("Please configure your Google OAuth Client ID in Settings first.");
      clientIdInput.value = "";
      settingsModal.style.display = "flex";
      return;
    }
    
    getAccessToken(clientId, (accessToken) => {
      const loadingEl = document.getElementById("loading");
      if (loadingEl) {
        loadingEl.style.display = "block";
        loadingEl.textContent = "Fetching character list...";
      }
      
      listDriveFiles(accessToken).then((files) => {
        if (loadingEl) loadingEl.style.display = "none";
        
        fileListContainer.replaceChildren();
        if (files.length === 0) {
          fileListContainer.appendChild(el("div", { class: "file-item", text: "No StoneSys character sheets found in Google Drive." }));
        } else {
          files.forEach((file) => {
            const mDate = new Date(file.modifiedTime).toLocaleString();
            const item = el("div", { class: "file-item" }, [
              el("span", { class: "file-name", text: file.name }),
              el("span", { class: "file-date", text: mDate })
            ]);
            item.addEventListener("click", async () => {
              try {
                if (loadingEl) {
                  loadingEl.style.display = "block";
                  loadingEl.textContent = "Loading character data...";
                }
                loaderModal.style.display = "none";
                const loadedState = await loadFromDrive(accessToken, file.id);
                state = normalizeLoadedState(loadedState, PB, loadedState.playbookId || id);
                save();
                
                // If the playbook changed, we need to reload the page to load the correct JSON
                if (state.playbookId && state.playbookId !== id) {
                  window.location.search = `?pb=${state.playbookId}`;
                } else {
                  render();
                  alert(`Character "${state.name || 'Unnamed'}" loaded successfully!`);
                }
              } catch (err) {
                alert("Error loading character: " + err.message);
              } finally {
                if (loadingEl) loadingEl.style.display = "none";
              }
            });
            fileListContainer.appendChild(item);
          });
        }
        loaderModal.style.display = "flex";
      }).catch((err) => {
        if (loadingEl) loadingEl.style.display = "none";
        alert("Error listing files: " + err.message);
      });
    });
  });
  
  document.getElementById("loader-close-btn").addEventListener("click", () => {
    loaderModal.style.display = "none";
  });

  // Playbook Selector Modal wire up
  const pbSelectModal = document.getElementById("playbook-select-modal");
  const pbListContainer = document.getElementById("playbook-list-container");
  const pbCloseBtn = document.getElementById("playbook-select-close-btn");
  
  if (showSelectorOnBoot) {
    pbCloseBtn.style.display = "none"; // Hide cancel button if we don't have an active playbook loaded
  } else {
    pbCloseBtn.style.display = "inline-block";
  }

  const openPlaybookSelector = async () => {
    try {
      const bundle = (window.CAMPAIGNS_DATA) || null;
      if (!bundle) throw new Error("campaign data not loaded");

      pbListContainer.replaceChildren();
      bundle.forEach((campaign) => {
        const group = el("div", { class: "setting-group" }, [
          el("div", { class: "setting-title", text: campaign.name })
        ]);

        const grid = el("div", { class: "playbook-grid" });
        (campaign.archetypes || []).forEach((arch) => {
          const pid = slugify(arch.name);
          const btn = el("button", { class: "playbook-btn", text: arch.name, type: "button" });
          btn.addEventListener("click", () => {
            localStorage.setItem(ACTIVE_PB_KEY, pid);
            window.location.search = `?pb=${pid}`;
          });
          grid.appendChild(btn);
        });

        group.appendChild(grid);
        pbListContainer.appendChild(group);
      });
      pbSelectModal.style.display = "flex";
    } catch (err) {
      alert("Error loading playbooks: " + err.message);
    }
  };

  document.getElementById("change-pb-btn").addEventListener("click", () => {
    pbCloseBtn.style.display = "inline-block"; // Allow cancel if opened manually
    openPlaybookSelector();
  });
  
  pbCloseBtn.addEventListener("click", () => {
    pbSelectModal.style.display = "none";
  });

  if (showSelectorOnBoot) {
    openPlaybookSelector();
  }

  const bootLoading = document.getElementById("loading");
  if (bootLoading) bootLoading.style.display = "none";
  
  document.getElementById("reset-btn").addEventListener("click", () => { if (confirm("Reset this character to the playbook defaults?")) { state = defaultState(PB); save(); render(); } });
  document.getElementById("generate-btn").addEventListener("click", () => {
    state.name = generateName(PB.campaignId || "stonetop");
    if (PB.identity && Array.isArray(PB.identity.look)) {
      PB.identity.look.forEach((l) => {
        if (l.options && l.options.length) {
          state.look[l.label] = l.options[Math.floor(Math.random() * l.options.length)];
        }
      });
    }
    if (Array.isArray(PB.gear)) {
      PB.gear.forEach((g) => {
        if (g.options && g.options.length) {
          state.gear[g.label] = g.options[Math.floor(Math.random() * g.options.length)];
        }
      });
    }
    save();
    render();
  });
  document.getElementById("print-btn").addEventListener("click", () => window.print());
  renderStoryPoints();
  render();
}

boot().catch((err) => { document.getElementById("loading").textContent = String(err); });
