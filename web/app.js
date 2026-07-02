import { rollMove } from "./dice.js";

const STAT_KEYS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
const DIFFS = ["simple", "easy", "average", "hard", "daunting"];
const SP_KEY = "stonesys:storypoints";
const ADV_XP_COST = 5; // GUIDE.md: "Spend 5 XP to take one advancement checkbox."

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

// ---------- state ----------
let PB = null;
let state = null;
let storeKey = "";
let sp = { player: 1, gm: 1 };

function defaultState(pb) {
  const chosen = pb.moves.filter((m) => m.type !== "choice").map((m) => m.name);
  for (const m of pb.moves.filter((m) => m.type === "choice").slice(0, 2)) chosen.push(m.name);
  const tracks = {};
  for (const t of pb.tracks || []) tracks[t.name] = t.start;
  const holds = {};
  for (const m of pb.moves) if (m.hold) holds[m.hold.name] = 0;
  const stats = { ...pb.stats.default };
  const hp = Number(evalFormula(pb.derived.hp, stats)) || 0;
  return {
    name: pb.identity.names[0] || "",
    look: Object.fromEntries(pb.identity.look.map((l) => [l.label, l.options[0]])),
    gear: Object.fromEntries((pb.gear || []).map((g) => [g.label, g.options[0]])),
    stats, chosen, tracks, holds,
    hp: { current: hp, max: hp }, xp: 0, advChecked: {},
    advChoices: {},   // key -> stat or move name chosen for a picker-backed advancement
    trainedRanks: {}, // move name -> proficiency upgrades (1 default, 2 once trained)
    swapDone: null    // { a, b } once the one allowed chargen stat-swap is used
  };
}

// Pick slots for "choice" moves: 2 at creation, +1 per checked "take another
// move"/"take a move from another playbook" advancement.
function extraMoveSlots() {
  let n = 0;
  (PB.advancement.basic || []).forEach((t, i) => { if (state.advChecked["b" + i] && isTakeMoveText(t)) n++; });
  return n;
}
function moveSlotCap() { return 2 + extraMoveSlots(); }

function save() { localStorage.setItem(storeKey, JSON.stringify(state)); }
function saveSP() { localStorage.setItem(SP_KEY, JSON.stringify(sp)); }

// ---------- rendering ----------
function render() {
  document.getElementById("pb-name").textContent = `— ${PB.name}`;
  renderHeader(); renderLeft(); renderCenter(); renderRight(); renderFooter();
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
    el("span", { class: "vital-val", text: `${state.hp.current} / ${state.hp.max}` }),
    el("button", { class: "no-print", type: "button", text: "+", onclick: () => { state.hp.current = Math.min(state.hp.max, state.hp.current + 1); save(); render(); } })
  ]);
  const xp = el("div", { class: "vital" }, [
    el("span", { class: "vital-label", text: "XP" }),
    el("button", { class: "no-print", type: "button", text: "−", onclick: () => { state.xp = Math.max(0, state.xp - 1); save(); render(); } }),
    el("span", { class: "vital-val", text: String(state.xp) }),
    el("button", { class: "no-print", type: "button", text: "+", onclick: () => { state.xp += 1; save(); render(); } })
  ]);

  z.replaceChildren(...[
    el("h2", { text: "Stats" }),
    el("p", { class: "hint", text: "Value = ability dice. A move you have upgrades 1 to proficiency." }),
    statGrid,
    swapPanel,
    el("h2", { text: "Vitals" }), hp,
    el("div", { class: "vital-static", text: `Damage ${PB.derived.damage}  ·  Load ${evalFormula(PB.derived.load, state.stats)}` }),
    xp,
    el("p", { class: "hint", text: "Rolling physical dice instead? Use +/− to mark XP by hand — miss = +1, and mark more at the GM's call." })
  ].filter(Boolean));
}

function renderMove(m) {
  const wrap = el("div", { class: `move move-${m.type}` });
  const head = el("div", { class: "move-head" }, [
    el("span", { class: "move-name", text: m.name }),
    el("span", { class: `move-tag tag-${m.type}`, text: m.type })
  ]);
  if (m.type === "choice") {
    head.appendChild(el("label", { class: "move-pick no-print" }, [
      el("input", { type: "checkbox", checked: state.chosen.includes(m.name) ? "checked" : null,
        onchange: (e) => {
          if (e.target.checked) {
            const takenChoiceCount = state.chosen.filter((n) => {
              const mv = PB.moves.find((x) => x.name === n);
              return mv && mv.type === "choice";
            }).length;
            const cap = moveSlotCap();
            if (takenChoiceCount >= cap) {
              e.target.checked = false;
              alert(`You can only have ${cap} chosen move${cap === 1 ? "" : "s"} right now. Take a "Take another move" advancement to unlock more.`);
              return;
            }
            if (!state.chosen.includes(m.name)) state.chosen.push(m.name);
          } else {
            state.chosen = state.chosen.filter((n) => n !== m.name);
          }
          save(); render();
        } }),
      el("span", { text: "taken" })
    ]));
  }
  wrap.appendChild(head);
  wrap.appendChild(el("p", { class: "move-trigger", text: m.trigger }));

  const usable = m.type !== "choice" || state.chosen.includes(m.name);
  const res = m.results;
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

    if (!usable) {
      // Reference only: you haven't taken this move, so it can't be rolled.
      wrap.appendChild(el("p", { class: "move-locked", text: "Not taken — check \"taken\" above, or pick it via advancement, to roll this move." }));
    } else {
      // roll control
      const out = el("div", { class: "move-out" });
      let diff = m.difficulty || "average";
      let boost = 0, setback = 0, risky = true;
      let ranks = m.trained === false ? 0 : (state.trainedRanks?.[m.name] ?? 1);
      const diffSel = el("select", { class: "no-print", onchange: (e) => { diff = e.target.value; } },
        DIFFS.map((d) => el("option", { value: d, selected: d === diff ? "selected" : null, text: d })));
      // simple boost/setback steppers
      const bChip = el("span", { class: "chip", text: "boost 0" });
      const sChip = el("span", { class: "chip", text: "setback 0" });
      const controls = el("div", { class: "roll-controls no-print" }, [
        el("span", { text: "difficulty " }), diffSel,
        el("label", { class: "risky-toggle", title: "Risky rolls always carry at least 1 yellow and 1 red — triumph and despair are both live." }, [
          el("input", { type: "checkbox", checked: "checked", onchange: (e) => { risky = e.target.checked; } }),
          el("span", { text: " risky" })
        ]),
        el("span", { class: "stepper" }, [el("button", { type: "button", text: "−", onclick: () => { boost = Math.max(0, boost - 1); bChip.textContent = `boost ${boost}`; } }), bChip, el("button", { type: "button", text: "+", onclick: () => { boost++; bChip.textContent = `boost ${boost}`; } })]),
        el("span", { class: "stepper" }, [el("button", { type: "button", text: "−", onclick: () => { setback = Math.max(0, setback - 1); sChip.textContent = `setback ${setback}`; } }), sChip, el("button", { type: "button", text: "+", onclick: () => { setback++; sChip.textContent = `setback ${setback}`; } })]),
        el("button", { class: "roll-btn", type: "button", text: `Roll +${m.stat}`, onclick: () => {
          const r = rollMove({ stat: state.stats[m.stat], ranks, difficulty: diff, boost, setback, risky });
          const nodes = [
            el("div", { class: "roll-pool", text: poolText(r.pool) }),
            el("div", { class: `roll-verdict ${r.success ? "ok" : "bad"}`, text: resultSummary(r) }),
            el("div", { class: "roll-result", text: r.success ? res.success : (res.failure || "You don't. The GM makes a move.") })
          ];
          if (r.triumphs && res.triumph) nodes.push(el("div", { class: "r-triumph", text: "◆ " + res.triumph }));
          if (r.despairs && res.despair) nodes.push(el("div", { class: "r-despair", text: "✶ " + res.despair }));
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

function renderCenter() {
  document.getElementById("zone-center").replaceChildren(el("h2", { text: "Moves" }), ...PB.moves.map(renderMove));
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

function renderRight() {
  const z = document.getElementById("zone-right");
  const em = PB.embedment;
  const kids = [el("h2", { text: "Embedment" })];
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

// ---------- boot ----------
async function boot() {
  const params = new URLSearchParams(location.search);
  const id = params.get("pb") || "the-beholden";
  const res = await fetch(`../playbooks/${id}.json`);
  if (!res.ok) throw new Error(`could not load playbook ${id}`);
  PB = await res.json();
  storeKey = `stonesys:${PB.id}`;
  state = (() => {
    const s = localStorage.getItem(storeKey);
    if (!s) return defaultState(PB);
    const parsed = JSON.parse(s);
    // normalize saves made before advChoices/trainedRanks/swapDone existed
    parsed.advChoices = parsed.advChoices || {};
    parsed.trainedRanks = parsed.trainedRanks || {};
    if (parsed.swapDone === undefined) parsed.swapDone = null;
    return parsed;
  })();
  sp = (() => { const s = localStorage.getItem(SP_KEY); return s ? JSON.parse(s) : { player: 1, gm: 1 }; })();

  document.getElementById("loading").remove();
  document.getElementById("reset-btn").addEventListener("click", () => { if (confirm("Reset this character to the playbook defaults?")) { state = defaultState(PB); save(); render(); } });
  document.getElementById("print-btn").addEventListener("click", () => window.print());
  renderStoryPoints();
  render();
}

boot().catch((err) => { document.getElementById("loading").textContent = String(err); });
