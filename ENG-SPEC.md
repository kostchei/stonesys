# StoneSys Character Sheet — Engineering Spec

Spec date: 2026-06-30

This document specifies how StoneSys playbooks are stored as data and rendered
two ways: a printable A3 character sheet and an interactive web sheet you can
roll on. Both renderers read the same data. There is no second authoring pass.

## 1. Goals

- One source of truth per playbook: a validated JSON document.
- A web sheet that renders a playbook and resolves moves by rolling
  `2d6 + (stat - 2)` and showing the matching result band.
- A printable A3 sheet generated from the same JSON, via print CSS.
- Zero mandatory build step or backend for the prototype. Open in a browser,
  serve the folder statically, and play.

## 2. Non-goals (for this iteration)

- Multi-playbook character builder with full validation of legal swaps.
- Accounts, cloud sync, multiplayer. State is local only.
- A rules engine for `core.md` (Patron/God/Bastion turns). The sheet *tracks*
  those numbers and surfaces their thresholds; it does not adjudicate them.

## 3. Architecture

How to actually play on this chassis — reading the dice as Stonetop bands,
using moves, holds, boosts/setbacks, Story Points, tracks, and the steading —
is documented in `GUIDE.md`.

```
playbooks/*.json      canonical data (validated by schema)
schema/playbook.schema.json   JSON Schema, draft 2020-12
web/
  index.html          app shell, loads the playbook + app module
  dice.js             pure dice + band engine (unit-testable in node)
  app.js              renderer, roll wiring, local state
  styles.css          screen layout + @media print A3 layout
test/dice.test.mjs    node smoke test for the band thresholds
```

Data flow: `app.js` fetches a playbook JSON, instantiates a default character,
renders the three layers, and wires each rollable element to `dice.js`. State
(stat assignment, chosen moves, track values, holds, HP, XP) persists in
`localStorage`, keyed by playbook id.

Because the app fetches JSON, it must be served over HTTP, not opened from
`file://` (browser CORS blocks `fetch` of local files). One line does it:
`python3 -m http.server` from the repo root, then open `/web/`.

## 4. Chassis constants (locked)

Resolution is **Genesys-style narrative dice** on a lean, Stonetop-shaped
character: no skill list, minimal stat gain, moves as fictional approaches (not
"better with an axe").

| Constant | Value |
| --- | --- |
| Stats | STR, DEX, CON, INT, WIS, CHA, rated `1-5` |
| Pool (positive) | stat value = that many positive dice, **hard cap 5 per side**. Yellows (proficiency) come only from upgrading greens, never added; **max 2 yellow**. |
| Skill | having a move grants **1 rank** = upgrade 1 green to yellow. No skill list. Advancement may raise a move to 2 upgrades — the yellow cap. |
| Difficulty (negative) | GM sets `1-4` purple (`easy 1 … daunting 4`, default `average` 2; `simple 0` only for riskless chores). Reds (challenge) come only from upgrading purples; **max 2 red**. |
| Risk rule | a **risky** roll (the default for moves) always carries **at least 1 yellow and 1 red** — upgrades happen even untrained, so triumph and despair are both always live |
| Read | net success/failure **and** net advantage/threat; triumph (yellow) and despair (red) never cancel. Net advantage/threat is **bucketed into tiers**: 0 none / 1-2 minor / 3+ major, so every roll resolves to a bounded outcome |
| Currency | per-move hold-and-spend **and** a shared Story Point pool (spend flips sides). SP die-upgrades respect the yellow/red caps — overflow becomes a boost/setback instead |
| Starting array | `{4, 3, 3, 2, 2, 1}`, archetype default + swap two (anchor-limited) |
| Stat cap | `5`; stat gain is a rare advanced advance, not a routine pick |
| Power tracks | optional per setting: Bond/Debt/Heat, Devotion/Favor/Wrath, Bastion Standing |
| Harm | HP + damage die stay Stonetop-style; the dice engine resolves moves, not damage |

Why the rails: triumph rate is purely a function of yellow count (2Y ≈ 16%/roll,
a healthy spike rate; 5Y ≈ 35%, criticals stop meaning anything), and difficulty
dice cannot counter it — only the yellow cap can. Despair mirrors it on red
(1R ≈ 8%, 2R ≈ 16%). The 5-die side cap bounds advantage flood (a 2Y3G max pool
averages ~+1.8 net advantage — one ripple per roll — where 3Y4G averages +3 and
demands a paragraph per roll). Simulated with the engine's faces: a capped 2Y3G
pool succeeds ~87% vs 2 purple, and **~84% vs the standard risky opposition
(1P+1R)** — rhyming with Stonetop's +3 (91.7% any hit) but a touch meaner, with
"success with net threat" playing the 7-9 role. Each difficulty step costs
roughly 10-12 points of success chance. Full odds table in `GUIDE.md`.

## 5. Data model

A playbook JSON has these top-level keys.

- `id`, `name`, `concept`: strings. `duty` optional.
- `chassis`: `{ resolution, array, statCap }`. Echoed so a renderer needs no globals.
- `identity`: `{ names[], look[ {label, options[]} ] }`.
- `stats`: `{ default{STR..CHA}, anchor{stat,min}|null, swaps }`.
- `derived`: `{ hp, damage, load }` as formula strings (e.g. `"16+CON"`).
- `gear`: `[ {label, options[]} ]`.
- `moves`: `[ move ]`.
- `embedment` (optional): `{ system?, start?, bonds[], communityTie[] }`. `system`
  is a freeform setting label; `start`/`tracks` appear only when a setting adds
  power-structure tracks. Absent for settings with no Layer-2 power systems.
- `tracks` (optional): `[ {name, min, max, start, note?} ]`.
- `advancement`: `{ basic[], advanced[] }`.

### Move object

A move is either **rollable** (Genesys form) or **static**.

```jsonc
{
  "name": "Strings",
  "type": "signature | fixed | choice",
  "trigger": "When you ... ,",
  "stat": "CHA",                 // rollable: sets ability dice
  "trained": true,              // rollable: grants the 1-rank proficiency upgrade (default true)
  "difficulty": "average",      // rollable: default task difficulty; GM may adjust
  "results": {                   // rollable
    "success": "you find someone who can help.",
    "failure": "no one useful surfaces.",          // optional
    "advantage": ["hold 1 String.", "learn who else asked."],  // spend menu
    "threat":    ["add 1 Heat.", "they want payment up front."],
    "triumph": "a power takes a favorable interest in you.",   // optional
    "despair": "you walked into a rival's net."                // optional
  },
  "hold": { "name": "Strings", "spend": ["...", "..."] },  // optional
  "text": "..."                  // present only on static moves
}
```

The renderer rolls a move iff `stat` and `results` exist. A move is broad
fictional competence (an approach, a situation) — never a gear/weapon
specialization.

## 6. Dice engine (`dice.js`)

Pure, no DOM. Genesys narrative dice with pool rails. Exports:

- `DICE`, `DIFFICULTY`, `COLORS`: face sets and the `simple 0 … daunting 4` map.
- `MAX_POOL_SIDE` (5), `MAX_YELLOW` (2), `MAX_RED` (2): the rails, defined once.
- `buildPool({stat, ranks, difficulty, boost, setback, challengeUpgrades, risky})` →
  `{ability, proficiency, difficulty, challenge, boost, setback}` counts.
  Positive side = stat clamped to 5; `ranks` upgrades green→yellow (max 2);
  `challengeUpgrades` upgrades purple→red (max 2). `risky` (default `true`)
  floors both upgrades at 1 and the opposition at 1 die.
- `rollPool(pool, rng?)` → array of rolled faces.
- `sideTier(n)` → `"none" | "minor" | "major"` (0 / 1-2 / 3+).
- `tally(faces)` → `{ success, successes, advantages, threats, advantageTier,
  threatTier, triumphs, despairs }`. Triumph counts as a success and despair as
  a failure; both also persist uncancelled.
- `rollMove(opts, rng?)` → `{ pool, faces, ...tally }`.

The node smoke test pins the rails (yellow/red caps, the risky floors, the
5-die side cap), the difficulty ladder, the tier buckets, and the cancellation
rules (despair still drags a tie to failure).

## 7. Web sheet (`app.js` + `index.html` + `styles.css`)

- On load: fetch playbook, read saved state or instantiate a default character
  (default stat assignment; signature + fixed moves + first two `choice` moves).
- Render the three layers as labelled zones (see section 8 for the zone map; the
  screen uses the same regions the print sheet does).
- Each stat and each rollable move shows roll controls (difficulty select,
  boost/setback steppers, **Roll** button). Rolling displays the dice pool, the
  net result (`SUCCESS/FAILURE · ▲ advantage · ▼ threat · ◆ triumph · ✶ despair`),
  and the matching `results` text. A failure offers a one-click **mark XP**.
- A shared **Story Point** pool lives in the toolbar; spending from one side
  moves the point to the other. Stored globally in `localStorage`.
- `tracks` render as clickable pip rows. Crossing a `core.md` threshold (e.g.
  Debt `6`) raises an inline note; the sheet does not auto-resolve it.
- `hold` currencies (e.g. Strings) render as a counter with `+`, `-`, and spend
  affordances, fed by advantage spends on the relevant move.
- All mutations write through to `localStorage`.

## 8. Printable A3 sheet

Portrait A3 (`297x420mm`), one side, via `@media print` + `@page { size: A3 }`.
The three layers map to fixed zones so the sheet teaches its own structure:

| Zone | Content | Layer |
| --- | --- | --- |
| Header band | playbook + character name, look, duty line | L1 |
| Left rail | 6 stats (value + printed mod), HP, Load, damage, harm track | L1+L3 |
| Center | signature, fixed, and chosen moves with their result bands | L3 |
| Right rail | embedment panel: track pips, bonds, community tie, holds | L2 |
| Footer band | advancement checklist, gear | L3 |

Print rules hide interactive controls (Roll buttons, dice readouts) and expand
result text so the sheet is playable on paper. A3 over A4 because the embedment
panel plus full move text does not fit A4 at table-readable size.

## 9. Adding a playbook

1. Author the prose playbook (as `playbook-*.md`) for humans.
2. Port it to `playbooks/<id>.json` against the schema.
3. Validate. The web and print sheets render it with no code changes.

## 10. Build order

1. Schema + port The Beholden to JSON. *(this iteration)*
2. Dice/band engine + node smoke test. *(this iteration)*
3. Web sheet rendering + rolling. *(this iteration)*
4. A3 print stylesheet over the same components. *(this iteration)*
5. Later: stat-swap editing UI, more playbooks, optional sync.
