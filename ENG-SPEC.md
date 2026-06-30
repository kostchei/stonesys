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
| Pool | stat value = that many **ability dice** |
| Skill | having a move grants **1 rank** = upgrade 1 ability die to proficiency. No skill list. Advancement may raise a move's upgrade to 2 (capped at its stat), rarely. |
| Difficulty | GM sets challenge dice (`simple 0 … formidable 5`); default `average` (2) |
| Read | net success/failure **and** net advantage/threat; triumph (proficiency) and despair (challenge) never cancel |
| Currency | per-move hold-and-spend **and** a shared Story Point pool (spend flips sides) |
| Starting array | `{4, 3, 3, 2, 2, 1}`, archetype default + swap two (anchor-limited) |
| Stat cap | `5`; stat gain is a rare advanced advance, not a routine pick |
| Power tracks | optional per setting: Bond/Debt/Heat, Devotion/Favor/Wrath, Bastion Standing |
| Harm | HP + damage die stay Stonetop-style; the dice engine resolves moves, not damage |

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

Pure, no DOM. Genesys narrative dice. Exports:

- `DICE`, `DIFFICULTY`, `COLORS`: the standard face sets and difficulty map.
- `buildPool({stat, ranks, difficulty, boost, setback, challengeUpgrades})` →
  `{ability, proficiency, difficulty, challenge, boost, setback}` counts.
  `ranks` upgrades ability→proficiency (capped at `stat`).
- `rollPool(pool, rng?)` → array of rolled faces.
- `tally(faces)` → `{ success, successes, advantages, threats, triumphs, despairs }`.
  Triumph counts as a success and despair as a failure; both also persist
  uncancelled.
- `rollMove(opts, rng?)` → `{ pool, faces, ...tally }`.

The node smoke test pins pool construction (lean: upgrades capped at the stat)
and the cancellation rules (despair still drags a tie to failure).

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
