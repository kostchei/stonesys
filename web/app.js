import { rollMove } from "./dice.js";

const STAT_KEYS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
const DIFFS = ["simple", "easy", "average", "hard", "daunting", "formidable"];
const SP_KEY = "stonesys:storypoints";

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
    hp: { current: hp, max: hp }, xp: 0, advChecked: {}
  };
}

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
  if (r.advantages) bits.push(`▲ ${r.advantages} advantage`);
  if (r.threats) bits.push(`▼ ${r.threats} threat`);
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
      el("input", { class: "stat-val", type: "number", min: "1", max: String(PB.chassis.statCap), value: String(v),
        onchange: (e) => { let n = Math.max(1, Math.min(PB.chassis.statCap, Number(e.target.value) || 1)); state.stats[k] = n; e.target.value = String(n); save(); render(); } }),
      el("div", { class: "stat-dice", text: `${v} dice` }),
      el("button", { class: "roll-btn no-print", type: "button", text: "roll", onclick: () => {
        const r = rollMove({ stat: v, ranks: 0, difficulty: "average" });
        out.textContent = resultSummary(r);
        out.className = `stat-roll-out ${r.success ? "ok" : "bad"}`;
      } }),
      out
    ]);
  }));

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

  z.replaceChildren(
    el("h2", { text: "Stats" }),
    el("p", { class: "hint", text: "Value = ability dice. A move you have upgrades 1 to proficiency." }),
    statGrid,
    el("h2", { text: "Vitals" }), hp,
    el("div", { class: "vital-static", text: `Damage ${PB.derived.damage}  ·  Load ${evalFormula(PB.derived.load, state.stats)}` }),
    xp
  );
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
        onchange: (e) => { if (e.target.checked) { if (!state.chosen.includes(m.name)) state.chosen.push(m.name); } else state.chosen = state.chosen.filter((n) => n !== m.name); save(); render(); } }),
      el("span", { text: "taken" })
    ]));
  }
  wrap.appendChild(head);
  wrap.appendChild(el("p", { class: "move-trigger", text: m.trigger }));

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

    // roll control
    const out = el("div", { class: "move-out" });
    let diff = m.difficulty || "average";
    let boost = 0, setback = 0;
    const diffSel = el("select", { class: "no-print", onchange: (e) => { diff = e.target.value; } },
      DIFFS.map((d) => el("option", { value: d, selected: d === diff ? "selected" : null, text: d })));
    const stepper = (label, get, set) => el("span", { class: "stepper" }, [
      el("button", { type: "button", text: "−", onclick: () => { set(Math.max(0, get() - 1)); chip.textContent = `${label} ${get()}`; } }),
      (() => { const chip = el("span", { class: "chip", text: `${label} ${get()}` }); stepper._chip = chip; return chip; })(),
      el("button", { type: "button", text: "+", onclick: () => { set(get() + 1); chip.textContent = `${label} ${get()}`; } })
    ]);
    // simple boost/setback steppers
    const bChip = el("span", { class: "chip", text: "boost 0" });
    const sChip = el("span", { class: "chip", text: "setback 0" });
    const controls = el("div", { class: "roll-controls no-print" }, [
      el("span", { text: "difficulty " }), diffSel,
      el("span", { class: "stepper" }, [el("button", { type: "button", text: "−", onclick: () => { boost = Math.max(0, boost - 1); bChip.textContent = `boost ${boost}`; } }), bChip, el("button", { type: "button", text: "+", onclick: () => { boost++; bChip.textContent = `boost ${boost}`; } })]),
      el("span", { class: "stepper" }, [el("button", { type: "button", text: "−", onclick: () => { setback = Math.max(0, setback - 1); sChip.textContent = `setback ${setback}`; } }), sChip, el("button", { type: "button", text: "+", onclick: () => { setback++; sChip.textContent = `setback ${setback}`; } })]),
      el("button", { class: "roll-btn", type: "button", text: `Roll +${m.stat}`, onclick: () => {
        const ranks = m.trained === false ? 0 : 1;
        const r = rollMove({ stat: state.stats[m.stat], ranks, difficulty: diff, boost, setback });
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

function advItem(text, key) {
  return el("label", { class: "adv" }, [
    el("input", { class: "no-print", type: "checkbox", checked: state.advChecked[key] ? "checked" : null,
      onchange: (e) => { state.advChecked[key] = e.target.checked; save(); } }),
    el("span", { class: "adv-box print-only", text: state.advChecked[key] ? "☑" : "☐" }),
    el("span", { text })
  ]);
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
  state = (() => { const s = localStorage.getItem(storeKey); return s ? JSON.parse(s) : defaultState(PB); })();
  sp = (() => { const s = localStorage.getItem(SP_KEY); return s ? JSON.parse(s) : { player: 1, gm: 1 }; })();

  document.getElementById("loading").remove();
  document.getElementById("reset-btn").addEventListener("click", () => { if (confirm("Reset this character to the playbook defaults?")) { state = defaultState(PB); save(); render(); } });
  document.getElementById("print-btn").addEventListener("click", () => window.print());
  renderStoryPoints();
  render();
}

boot().catch((err) => { document.getElementById("loading").textContent = String(err); });
