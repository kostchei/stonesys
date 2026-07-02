---
name: forge-playset
description: Generate a coherent playset for a Stonetop-family setting from a one-line concept — nine character archetypes (playbooks) as schema-valid JSON plus a starting steading (village). Use when the user gives a setting concept and wants a full set of playbooks and a home base built, or wants original playbooks/sheets for a new campaign in this engine.
---

# Forge a Playset

Given a campaign concept, produce **nine playbooks** and **one steading** that
fit together as one starting situation. Playbooks are written as JSON that
validates against `schema/playbook.schema.json` and renders in `web/` (interactive
+ A3 print). The steading is a filled Bastion sheet (see `core.md`).

The engine is setting-neutral: six stats, `2d6 + (stat - 2)`, three result bands,
moves, bonds, HP, hold-and-spend. A *setting* layers its own archetypes,
community, and (optionally) power-structure tracks on top.

Read `core.md`, `ENG-SPEC.md`, and `schema/playbook.schema.json` before generating.

## Important: original content only

Generate **original** archetypes, moves, names, and steadings. Do not reproduce
the published text, move names, or playbooks of Stonetop or any other commercial
game. To run an existing game, point the user at the blank sheet
(`web/blank-sheet.html`) to fill from their own book.

## Inputs

- A concept: one line of tone + place. If given only a vibe, ask one clarifying
  question (what is the home, and what threatens it), then proceed.

## Chassis constants (do not vary)

Genesys narrative dice on a lean, Stonetop-shaped character, with pool rails.

- Stats: STR, DEX, CON, INT, WIS, CHA, rated `1-5`. A stat = that many positive
  dice. **Hard cap 5 dice per side.**
- Skill: having a move grants **1 rank** (upgrade 1 green to yellow). **No skill
  list.** Yellows come only from upgrades, never added — **max 2 yellow** (pins
  triumph at ~16%/roll). Difficulty is `1-4` purple (`easy`…`daunting`, default
  `average`; `simple` only for riskless chores); reds only from upgrades —
  **max 2 red**.
- Risk rule: a risky roll (the default for moves) always carries **at least 1
  yellow and 1 red** — triumph and despair are both always live.
- Read net success/failure and advantage/threat (bucketed 0 / 1-2 minor / 3+
  major); triumph and despair never cancel.
- Currency: per-move **hold-and-spend** plus a shared **Story Point** pool.
- Starting array `{4, 3, 3, 2, 2, 1}`, stat cap `5`. **Stat gain is rare** — an
  Advanced advance, never a routine pick.
- Move `difficulty` fields use only `easy | average | hard | daunting` (never
  `formidable`; reserve `daunting` for the named "greater working" advances).
- Set `chassis.resolution: "genesys-narrative"` on every playbook.

## Moves are fictional approaches, not specializations

Write moves as broad fictional levers — a way of acting, a situation, a stance
("when you read a charged room," "when you stand and hold a line"). **Never**
write gear/weapon specializations ("better with an axe", "+1 with a bow"). The
single proficiency upgrade comes from *having the move*, full stop. Damage is
just what the character wields in the fiction.

## Stat generation method (what "nudge" means)

Players do **not** pick raw numbers. Each playbook prints a **default
assignment** of the shared array that expresses its niche (primary stat = `4`).
The player may **swap up to two values**, constrained by a **hard anchor** that
keeps the archetype intact (usually `primary >= 3`). Set `stats.default`,
`stats.anchor`, and `stats.swaps: 2` on every playbook. The budget is always the
same array; only the shape differs, so the set is balanced by construction.

## Move outcome form (Genesys)

Rollable moves carry `stat`, `trained` (default true), `difficulty`, and
`results`. Write `results` as: `success` (required), optional `failure`,
`advantage` (a spend menu — feed per-move holds here), `threat` (GM spend menu),
and optional `triumph` / `despair` for big swings. Static moves use `text`.

## Choose an embedment style for the setting

Layer 2 (what ties a character to the community) has two supported styles. Pick
based on the concept; you may even mix within a set.

- **Village style (vanilla Stonetop-like):** no power-structure tracks. Each
  playbook has `embedment` with `system: "village"`, `bonds`, and
  `communityTie`, and **omits** `start` and `tracks`. Best for grounded,
  single-community games.
- **Power-structure style (StoneSys-like):** each playbook foregrounds exactly
  one of Patron / God / Bastion and starts with its tracks. Best for games about
  factions, faith, and frontier holdings. Track presets:
  - Patron → Bond `(0-3, start 1)`, Debt `(0-6, start 2)`, Heat `(0-4, start 0)`.
  - God → Devotion `(0-3, start 1)`, Favor `(0-3, start 0)`, Wrath `(0-4, start 0)`.
  - Bastion → Standing `(0-3, start 1)`, tying the PC to the steading.

## Coherence rules for a set of nine

1. **Stat spread:** every one of the six stats is the primary (`4`) of at least
   one playbook. Three stats will repeat across nine — spread the repeats.
2. **Embedment balance:** if using power-structure style, aim for ~3 Patron /
   3 God / 3 Bastion. If village style, vary each playbook's role in the
   community instead (leader, outsider, craftsperson, protector, etc.).
3. **No two signatures do the same job.** Across the nine, cover combat, social,
   lore, scouting, healing, leadership, provisioning, exploration, protection.
4. **The steading is the shared anchor.** Every `communityTie` references the
   same steading by name.

## Per-playbook content budget

- `identity`: ~10 names; 4 look menus of 4 options.
- `stats`: default assignment, anchor on the primary, `swaps: 2`.
- `derived`: `hp` (`14-20` + CON; tougher archetypes higher), `damage` (`d4-d10`),
  `load` (`6+STR`, martial `8+STR`).
- `moves`: 1 signature (usually a hold-and-spend keyed to the niche) + 1 fixed
  (an always-on tie to the embedment) + ~5 choice moves. Rollable moves carry
  `stat` + `results{strong,weak,miss}`; static moves carry `text`.
- `embedment`: per the chosen style; 4-5 `bonds` (fill-in-blank, naming other
  PCs) and 3 `communityTie` (naming the steading).
- `tracks`: present only in power-structure style.
- `advancement`: ~8 basic, built from "take another <playbook> move" x2, "take a
  move from another playbook" x2, and playbook-specific options (raise a hold cap,
  deepen a tie, train a leaned-on move to upgrade 2 dice — sparingly). **Do not**
  put stat gains in basic. The 3 `advanced` options are rare turning points: one
  may be `Raise one stat by 1 (max 5)`, the rest let the character switch/add an
  embedment (in power-structure style).

## Steading generation

Write one steading as a filled Bastion sheet (`core.md`) to `steadings/<id>.md`:

- Name, location, look, founder/owner, purpose, scale.
- Ratings `+1, +1, 0, 0, -1` across Scale/Safety/Prosperity/Influence/Supply.
- Two starting facilities (function, rating used, one thing it does well, one
  vulnerability).
- Trouble `0-1`; a strange resource if the concept is a frontier; 3-5 named NPCs
  for community ties to hook into; 2-3 looming pressures the GM can advance.
- State plainly: what does it need that cannot be bought? That seeds adventure.

## Output procedure

1. Read `core.md`, `ENG-SPEC.md`, `schema/playbook.schema.json`.
2. Pick the embedment style. Derive the roster: a 9-row table (playbook, primary
   stat, embedment/role, signature job) satisfying the coherence rules. Show it.
3. Write `steadings/<id>.md`.
4. Write `playbooks/<id>.json` for each of the nine; validate each against the
   schema (required keys, stat range `1-5`, move shape).
5. Update `playbooks/index.json` (the picker manifest) to list all nine.
6. Verify at least one new playbook renders and rolls via `web/` before
   reporting done.

## Style

Match `core.md`'s voice: concrete, second-person move triggers, costs that bite,
fiction-first. Moves are fictional actions, not buttons. Every starting value
should mean something in the first session.
