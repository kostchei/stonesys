import { rollMove, modFor, BANDS } from "./dice.js";

const STAT_KEYS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
const BAND_LABEL = { strong: "10+ Strong hit", weak: "7-9 Cost / choice", miss: "6- Miss (+XP)" };

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

// ---------- formula eval (trusted data only) ----------
function evalFormula(formula, stats) {
  let expr = formula;
  for (const k of STAT_KEYS) expr = expr.replaceAll(k, String(stats[k]));
  if (!/^[-+0-9\s]+$/.test(expr)) return formula; // not arithmetic (e.g. "d6")
  try {
    // eslint-disable-next-line no-new-func
    return Function(`"use strict";return (${expr});`)();
  } catch {
    return formula;
  }
}

// ---------- state ----------
let PB = null;
let state = null;
let storeKey = "";

function defaultState(pb) {
  const chosen = pb.moves.filter((m) => m.type !== "choice").map((m) => m.name);
  for (const m of pb.moves.filter((m) => m.type === "choice").slice(0, 2)) chosen.push(m.name);
  const tracks = {};
  for (const t of pb.tracks) tracks[t.name] = t.start;
  const holds = {};
  for (const m of pb.moves) if (m.hold) holds[m.hold.name] = 0;
  const stats = { ...pb.stats.default };
  return {
    name: pb.identity.names[0] || "",
    look: Object.fromEntries(pb.identity.look.map((l) => [l.label, l.options[0]])),
    gear: Object.fromEntries((pb.gear || []).map((g) => [g.label, g.options[0]])),
    stats,
    chosen,
    tracks,
    holds,
    hp: { current: Number(evalFormula(pb.derived.hp, stats)) || 0, max: Number(evalFormula(pb.derived.hp, stats)) || 0 },
    xp: 0,
    advChecked: {}
  };
}

function save() {
  localStorage.setItem(storeKey, JSON.stringify(state));
}

// ---------- render ----------
function render() {
  document.getElementById("pb-name").textContent = `— ${PB.name}`;
  renderHeader();
  renderLeft();
  renderCenter();
  renderRight();
  renderFooter();
}

function renderHeader() {
  const z = document.getElementById("zone-header");
  z.replaceChildren(
    el("div", { class: "pb-title" }, [
      el("h1", { text: PB.name }),
      el("input", {
        class: "char-name", value: state.name, "aria-label": "character name", placeholder: "name",
        oninput: (e) => { state.name = e.target.value; save(); }
      })
    ]),
    el("p", { class: "concept", text: PB.concept }),
    el("div", { class: "look-row no-print" },
      PB.identity.look.map((l) =>
        el("label", { class: "look" }, [
          el("span", { text: l.label + ": " }),
          el("select", { onchange: (e) => { state.look[l.label] = e.target.value; save(); } },
            l.options.map((o) => el("option", { value: o, selected: state.look[l.label] === o ? "selected" : null, text: o })))
        ])
      )
    ),
    el("p", { class: "look-print print-only", text: PB.identity.look.map((l) => `${l.label}: ${state.look[l.label]}`).join("  ·  ") }),
    el("p", { class: "duty", text: PB.duty })
  );
}

function renderLeft() {
  const z = document.getElementById("zone-left");
  const statGrid = el("div", { class: "stat-grid" },
    STAT_KEYS.map((k) => {
      const v = state.stats[k];
      const mod = modFor(v);
      const out = el("span", { class: "stat-roll-out" });
      return el("div", { class: "stat" }, [
        el("div", { class: "stat-name", text: k }),
        el("input", {
          class: "stat-val", type: "number", min: "1", max: String(PB.chassis.statCap), value: String(v),
          onchange: (e) => {
            let n = Math.max(1, Math.min(PB.chassis.statCap, Number(e.target.value) || 1));
            state.stats[k] = n; e.target.value = String(n); save(); render();
          }
        }),
        el("div", { class: "stat-mod", text: (mod >= 0 ? "+" : "") + mod }),
        el("button", { class: "roll-btn no-print", type: "button", onclick: () => {
          const r = rollMove(v);
          out.textContent = `${r.dice[0]}+${r.dice[1]}${r.mod >= 0 ? "+" : ""}${r.mod} = ${r.total}`;
          out.className = `stat-roll-out band-${r.band}`;
        }, text: "roll" }),
        out
      ]);
    })
  );

  const hp = el("div", { class: "vital" }, [
    el("span", { class: "vital-label", text: "HP" }),
    el("button", { class: "no-print", type: "button", onclick: () => { state.hp.current = Math.max(0, state.hp.current - 1); save(); render(); }, text: "−" }),
    el("span", { class: "vital-val", text: `${state.hp.current} / ${state.hp.max}` }),
    el("button", { class: "no-print", type: "button", onclick: () => { state.hp.current = Math.min(state.hp.max, state.hp.current + 1); save(); render(); }, text: "+" })
  ]);

  const xp = el("div", { class: "vital" }, [
    el("span", { class: "vital-label", text: "XP" }),
    el("button", { class: "no-print", type: "button", onclick: () => { state.xp = Math.max(0, state.xp - 1); save(); render(); }, text: "−" }),
    el("span", { class: "vital-val", text: String(state.xp) }),
    el("button", { class: "no-print", type: "button", onclick: () => { state.xp += 1; save(); render(); }, text: "+" })
  ]);

  z.replaceChildren(
    el("h2", { text: "Stats" }),
    statGrid,
    el("h2", { text: "Vitals" }),
    hp,
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
      el("input", {
        type: "checkbox", checked: state.chosen.includes(m.name) ? "checked" : null,
        onchange: (e) => {
          if (e.target.checked) { if (!state.chosen.includes(m.name)) state.chosen.push(m.name); }
          else state.chosen = state.chosen.filter((n) => n !== m.name);
          save(); render();
        }
      }),
      el("span", { text: "taken" })
    ]));
  }
  wrap.appendChild(head);
  wrap.appendChild(el("p", { class: "move-trigger", text: m.trigger }));

  if (m.results) {
    const out = el("div", { class: "move-out" });
    wrap.appendChild(el("button", { class: "roll-btn no-print", type: "button", text: `Roll +${m.stat}`, onclick: () => {
      const r = rollMove(state.stats[m.stat]);
      out.replaceChildren(
        el("div", { class: `roll-line band-${r.band}`, text: `${r.dice[0]} + ${r.dice[1]} ${r.mod >= 0 ? "+" : ""}${r.mod} = ${r.total} — ${BAND_LABEL[r.band]}` }),
        el("div", { class: "roll-result", text: m.results[r.band] }),
        r.band === BANDS.MISS ? el("button", { class: "xp-btn", type: "button", text: "mark XP", onclick: () => { state.xp += 1; save(); render(); } }) : null
      );
    } }));
    const bands = el("ul", { class: "bands" }, [
      el("li", { class: "band-strong" }, [el("b", { text: "10+ " }), m.results.strong]),
      el("li", { class: "band-weak" }, [el("b", { text: "7-9 " }), m.results.weak]),
      el("li", { class: "band-miss" }, [el("b", { text: "6- " }), m.results.miss])
    ]);
    wrap.appendChild(bands);
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
  const z = document.getElementById("zone-center");
  z.replaceChildren(
    el("h2", { text: "Moves" }),
    ...PB.moves.map(renderMove)
  );
}

function renderTrack(t) {
  const row = el("div", { class: "track" });
  row.appendChild(el("div", { class: "track-name", text: t.name }));
  const pips = el("div", { class: "pips" });
  for (let i = t.min; i <= t.max; i++) {
    pips.appendChild(el("button", {
      class: "pip" + (i <= state.tracks[t.name] && i > 0 ? " filled" : "") + (i === 0 ? " zero" : ""),
      type: "button", title: String(i),
      onclick: () => { state.tracks[t.name] = i; save(); render(); }
    }, [String(i)]));
  }
  row.appendChild(pips);
  if (t.note) row.appendChild(el("div", { class: "track-note", text: t.note }));
  return row;
}

function renderRight() {
  const z = document.getElementById("zone-right");
  const startStr = Object.entries(PB.embedment.start).map(([k, v]) => `${k} ${v}`).join(", ");
  z.replaceChildren(
    el("h2", { text: "Embedment" }),
    el("p", { class: "embed-system", text: `Foregrounds the ${PB.embedment.system} system. Start: ${startStr}.` }),
    el("div", { class: "tracks" }, PB.tracks.map(renderTrack)),
    el("h3", { text: "Bonds" }),
    el("ul", { class: "bonds-list" }, PB.embedment.bonds.map((b) => el("li", { text: b }))),
    el("h3", { text: "Community tie" }),
    el("ul", { class: "tie-list" }, PB.embedment.communityTie.map((b) => el("li", { text: b })))
  );
}

function advItem(text, key) {
  return el("label", { class: "adv" }, [
    el("input", { class: "no-print", type: "checkbox", checked: state.advChecked[key] ? "checked" : null,
      onchange: (e) => { state.advChecked[key] = e.target.checked; save(); } }),
    el("span", { class: "adv-box print-only", text: state.advChecked[key] ? "☑" : "☐" }),
    el("span", { text: text })
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
    ])
  ));
  z.replaceChildren(
    el("div", { class: "footer-col" }, [
      el("h2", { text: "Advancement" }),
      el("div", { class: "adv-list" }, PB.advancement.basic.map((a, i) => advItem(a, "b" + i)))
    ]),
    el("div", { class: "footer-col" }, [
      el("h3", { text: "Advanced (after 5)" }),
      el("div", { class: "adv-list" }, PB.advancement.advanced.map((a, i) => advItem(a, "a" + i))),
      el("h2", { text: "Gear" }),
      gear
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
  const saved = localStorage.getItem(storeKey);
  state = saved ? JSON.parse(saved) : defaultState(PB);

  document.getElementById("loading").remove();
  document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Reset this character to the playbook defaults?")) { state = defaultState(PB); save(); render(); }
  });
  document.getElementById("print-btn").addEventListener("click", () => window.print());
  render();
}

boot().catch((err) => {
  document.getElementById("loading").textContent = String(err);
});
