# StoneSys Player's Handbook — Build Plan

Plan date: 2026-07-05 · Branch: `player-handbook` (worktree `.worktrees/player-handbook/`)

Goal: a complete, self-contained player's handbook for the StoneSys mashup
(Genesys narrative dice on a PbtA/Stonetop-shaped character), covering the
engine and all four campaigns. Zero assumed prior knowledge of Genesys, PbtA,
Stonetop, or any RPG jargon that isn't defined on first use. No design
rationale, no "why we did it this way," no migration notes — pure "here is how
you play," ordered so each chapter only uses concepts already introduced.

## Voice and constraints

- Second person, present tense, imperative where possible ("Take green dice
  equal to your stat").
- Every term defined at first use; a glossary backs it up.
- No references to Genesys, Stonetop, PbtA, 2d6 bands, or source games
  anywhere in the body. (GUIDE.md's appendix and odds-comparison content is
  explicitly *excluded*.)
- Original text only — same IP ground rules as PLAYSETS.md. Campaign chapters
  keep the invented names (Free Legion, Hollow-Oak Holt, Sign of the Black
  Cat) and generic role descriptors.
- Probability commentary trimmed to at most a "what to expect" sidebar; no
  odds tables in the body (one may land in an appendix).
- Worked examples throughout — at least one per rules chapter, in the style
  of GUIDE.md §9.

## Structure (reading order = learning order)

**Part I — Playing the Game** (everyone reads this)

1. **Welcome** — what this game is (a conversation with dice), what a player
   does, what the GM does, what you need at the table (dice set or web sheet,
   playbook sheet, steading sheet, two Story Point tokens).
2. **The Dice** — the six dice by color, the four symbol pairs
   (success/failure, advantage/threat, triumph/despair), cancellation rules,
   "triumph and despair always fire."
3. **The Conversation** — the core loop; fiction first; when dice come out
   (only when a move triggers; chores just succeed).
4. **Making a Check** — building the pool step by step: greens = stat,
   trained upgrade to yellow, difficulty ladder (easy 1 → daunting 4), the
   risk rule (≥1 yellow and ≥1 red on risky rolls), the rails (5-die side
   cap, max 2 yellow, max 2 red), blue boosts and black setbacks from the
   fiction.
5. **Reading a Roll** — the reading order (did it work → ◆/✶ fire → texture
   tiers 0/minor/major), the seven-row outcome grid, mark XP on failure,
   default exchange rates for spending ▲/▼ when a move's menu doesn't cover
   it. Worked example.

**Part II — Your Character**

6. **The Character Sheet** — the five zones (header/duty, stats & vitals,
   moves, embedment rail, advancement & gear); the six stats and what each
   covers; HP, damage die, Load, XP.
7. **Creating a Character** — pick a playbook; the stat array {4,3,3,2,2,1}
   with archetype default + two swaps (anchor rule); name and Look; starting
   moves (signature + fixed + choices); gear picks; Bonds; community tie;
   embedment start values. Presented as a numbered checklist.
8. **Moves** — the three kinds (signature, fixed, choice); rollable move
   anatomy (trigger, stat, difficulty, results block, hold); static moves as
   standing permissions/prices; aiding (give a blue, share the risk) and
   interfering (impose a black).
9. **Currencies** — holds (earned via ▲ menus, spent 1:1); Story Points
   (upgrade a die or declare a detail; spend flips the token; cap overflow
   becomes boost/setback); conditions (paired-stat black die until treated);
   supply erosion as a threat spend (ammo, torches, provisions).
10. **Harm and Recovery** — taking and dealing damage, armor in the fiction,
    0 HP, recovery routes; conditions recap.
11. **Growing** — XP triggers (failures, move grants, end-of-session), 5 XP =
    one advancement checkbox, stat gains as rare Advanced picks.

**Part III — The Powers That Be** (used by playsets that have tracks)

12. **Patrons** — what a patron is; Bond/Debt/Heat tracks and thresholds
    (Debt 6 forces a demand, resets 3; Heat 4 = open retaliation); Invoke
    Patron move; favors and demands tables (player-relevant subset).
13. **Gods** — Devotion/Favor/Wrath; Favor as a spendable hold; Pray for Aid
    move; offerings; everyday religion (player-facing framing).
14. **Personal tracks** — Defilement, Corruption, and kin: they don't heal;
    thresholds mean transformation.

**Part IV — Home and the Year**

15. **Your Steading** — the community as a shared character: ratings
    (Scale/Safety/Prosperity/Influence/Supply), facilities, Fortunes rolls,
    Surplus, Trouble, Standing; season moves and the Bastion Turn (orders
    menu, extra benefits, costs). Player-facing: what you can order, what
    the tracks mean; GM-only move lists stay out.
16. **Expeditions** — the shape of an adventure: why you leave home
    (threats, opportunities, personal drives), preparing, and how the season
    ticks while you're away. (Distilled player-facing framing from the
    expedition-seed structure; individual seeds stay GM-side.)

**Part V — The Four Campaigns** (one chapter each; identical template)

Template per campaign: the premise in one page → your home (steading sheet
summary: ratings, key facilities, named NPCs players would know, current
pressures) → embedment style (which tracks are live, or "bonds only") →
the nine playbooks, each as a half-page profile: concept, duty, primary
stat, signature move (full text), embedment hook, and what the archetype is
*for* at the table → any campaign-specific rules (Defilement, Obligation
checks, Corruption, sending/recognition via bonds).

17. **Stonetop** — hearth-fantasy village; nine playbooks from
    `web/stonetop_playbooks.json` (Blessed, Fox, Heavy, Judge, Lightbearer,
    Marshal, Ranger, Seeker, Would-be Hero); full track suite as configured.
18. **The Free Legion** (Dark Sun playset) — fugitive gladiator army; mobile
    bastion; Patron-heavy; Defilement personal track.
19. **The Hollow-Oak Holt** (Elfquest playset) — forest tribe; village
    embedment, no power tracks, bonds carry everything.
20. **The Sign of the Black Cat** (Lankhmar playset) — city ne'er-do-wells;
    Patron-heavy, light bastion, Corruption track.

**Part VI — Reference**

21. **Appendices** — A: character creation checklist (one page). B: the
    outcome grid + exchange rates (one page, table-side reference). C:
    difficulty ladder and pool rails card. D: track thresholds card
    (Debt/Heat/Wrath/Trouble/Favor). E: glossary. F: what-to-expect odds
    (optional, the only place numbers live).

## Source mapping

| Handbook part | Drawn from |
| --- | --- |
| I (engine) | GUIDE.md §1–4, §6–7; ENG-SPEC.md §4 (rails, constants) |
| II (character) | GUIDE.md §5, §7; ENG-SPEC.md §5 (data model → prose); schema |
| III (powers) | core.md (Patrons, Gods), GUIDE.md §7 tracks |
| IV (home/year) | core.md (Bastions), GUIDE.md §8; expeditions.json framing |
| V (campaigns) | PLAYSETS.md; steadings/*.md; web/playbooks/*.json; web/stonetop_playbooks.json |
| VI (reference) | condensed from all of the above |

Rules text is *restated for players*, not copy-pasted: GUIDE.md talks to
converts and designers in places; the handbook never does. Where GUIDE.md,
ENG-SPEC.md, and core.md disagree, ENG-SPEC.md's locked constants win and
the discrepancy gets flagged back to you.

## Deliverable and file layout

Working format: one markdown file per chapter in `handbook/` in this
worktree (`handbook/01-welcome.md` … `handbook/21-appendices.md`) plus
`handbook/00-contents.md`, then a compiled single-document build. Final
output format(s) per your call — see open questions.

## Build order

1. Skeleton: `handbook/` with all chapter stubs + contents page.
2. Part I (the engine teach) — the hard part; get the pedagogy right first.
3. Parts II, then III–IV.
4. Part V campaign chapters, one at a time (Stonetop first — it exercises
   every subsystem), extracting playbook profiles from the JSON.
5. Part VI reference cards, generated last so they match the body.
6. Verification pass: (a) every rule in the handbook checked against
   ENG-SPEC/GUIDE/core for contradictions; (b) a "cold reader" pass —
   confirm no chapter uses a term before it's defined; (c) playbook
   profiles diffed against the JSON for accuracy.
7. Compile final format; commit on `player-handbook`.

## Decisions (Ash, 2026-07-05)

1. **Final format: print-ready PDF for Lulu, A4 trim.** Interior PDF pages
   sized A4 + 0.125 in (3.18 mm) bleed per side = **216.4 × 303.4 mm**;
   fonts embedded, layers flattened, body text/images kept ≥ 0.5 in inside
   the trim edge. Cover PDF is a separate later step (needs final page
   count for spine width). Build pipeline: markdown chapters →
   HTML/print-CSS or LaTeX → PDF, checked against Lulu's specs.
2. **Playbook depth: full reproductions.** Part V carries every playbook
   completely — identity/looks, duty, stat array + anchor, all moves
   (signature, fixed, every choice) with full result blocks, gear, bonds,
   community ties, tracks, and the advancement lists, regenerated as prose
   from the JSON. Expect Part V to be the bulk of the book (~120–180 pp).
3. **GM material: none.** Strictly player-facing; GM move lists,
   demand/wrath/side-effect tables, and expedition seeds excluded.
4. **Source revision: working tree.** Current on-disk versions of the
   playbook JSONs, GUIDE.md, core.md, and steadings are copied into this
   worktree as the canonical inputs before writing begins.

### Consequences for the build order

- Step 0 (new): sync working-tree rule/playbook sources into the worktree.
- Step 4 grows: generate full playbook chapters from JSON via a small
  script (`handbook/tools/playbook2md.mjs`) so all 36 render uniformly and
  can be regenerated when playbooks change; hand-write only the campaign
  framing around them.
- Step 5 (new): print pipeline — A4+bleed page geometry, two-column body,
  embedded fonts, PDF/X-friendly output; verify with a Lulu preflight-style
  check (page size, font embedding via `pdffonts`).
