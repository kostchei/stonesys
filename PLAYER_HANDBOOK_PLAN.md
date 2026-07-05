# StoneSys Player Handbook Plan

Worktree: `D:\Code\StoneSys-player-handbook`
Branch: `codex/player-handbook`

## Source Material

- `GUIDE.md`: current player-facing play guide.
- `ENG-SPEC.md`: locked chassis constants and sheet behavior.
- `core.md`: Patron, God, and Bastion subsystems.
- `GENESYS_CONVERSION_PLAN.md`: confirms the four campaign buckets.
- `PLAYSETS.md`: Dark Sun, Elfquest, and Lankhmar campaign/playset notes.
- `steadings/*.md`: the three non-Stonetop steading sheets.
- `web/data.js` and `web/stonetop_playbooks.json`: original Stonetop campaign material.
- `web/playbooks/*.json`: converted Dark Sun, Elfquest, and Lankhmar playbooks.
- `expeditions.json`: Stonetop expedition examples.

## Scope

Build a player handbook for the current StoneSys rules mashup. The handbook should:

- Explain how to play from zero prior knowledge.
- Present rules in play order, not design-history order.
- Avoid explaining the reasons behind the mashup.
- Avoid assuming readers know Powered by the Apocalypse, Genesys, or Stonetop.
- Cover the four campaign buckets:
  - Stonetop
  - Dark Sun / The Free Legion
  - Elfquest / The Hollow-Oak Holt
  - Lankhmar / The Sign of the Black Cat
- Keep campaign-IP text original and refer to the local campaign names where possible.
- Be written as a player's handbook, not a GM design document.

## Proposed Deliverable

Create `PLAYER_HANDBOOK.md` as the canonical player handbook.

Keep `GUIDE.md` as the shorter table reference unless we later decide to replace it. The handbook can absorb the useful player-facing parts of `GUIDE.md`, but it should be structured for a first-time reader and should remove the PbtA/Stonetop comparison appendix from the main path.

## Handbook Structure

### 1. Starting Play

Purpose: give a new player enough orientation to sit down.

Content:

- What this game is at the table: players portray characters, the GM portrays the world, and the table follows the fiction.
- What each player needs: character sheet, dice or web roller, pencil, campaign sheet, shared Story Points.
- What the group needs: one campaign, one steading/community sheet, one shared Story Point pool.
- What the session sounds like: GM describes, players act, moves trigger when fiction matches them, dice settle risky uncertainty.

### 2. Characters

Purpose: teach what is on the character sheet before explaining resolution in detail.

Content:

- Playbook.
- Name, look, duty, background, and campaign ties.
- Stats: STR, DEX, CON, INT, WIS, CHA, rated 1 to 5.
- Vitals: HP, damage die, load, armor/soak where present, XP.
- Moves: signature, fixed, choice, and advancement moves.
- Gear and special possessions.
- Bonds and community ties.
- Tracks shown on the sheet.

### 3. Making A Character

Purpose: walk a new player through setup in order.

Content:

- Choose campaign.
- Choose playbook.
- Assign the starting stat array.
- Choose look, name, and duty details.
- Choose starting moves and gear.
- Fill bonds and community ties.
- Mark starting tracks from the playbook.
- Confirm campaign-specific starting choices.
- Introduce characters at the table.

### 4. The Basic Conversation

Purpose: teach fiction-first play without naming outside systems.

Content:

- Say what your character does.
- Ask questions when the situation is unclear.
- The GM says what happens when the outcome is obvious.
- Roll only when the action is risky, uncertain, and consequential.
- A move triggers when your described action matches its trigger.
- What is true in the scene decides difficulty, boosts, setbacks, and possible results.

### 5. Dice, Pools, And Results

Purpose: explain the dice, how to build a pool, and how to read the result with no prior knowledge.

Content:

- Ability dice: green.
- Proficiency dice: yellow.
- Boost dice: blue.
- Difficulty dice: purple.
- Challenge dice: red.
- Setback dice: black.
- Success and failure symbols.
- Advantage and threat symbols.
- Triumph and despair symbols.
- Cancellation rules.
- Triumph and despair never disappear once rolled.
- Start with green dice equal to the stat.
- Upgrade one green to yellow when the move is trained/taken.
- Apply the yellow cap.
- GM sets difficulty from simple/easy/average/hard/daunting.
- Risky rolls include at least one yellow and one red.
- Add boosts and setbacks from the fiction.
- Story Points can upgrade dice or create small true details.
- Roll the whole pool together.
- Determine success or failure.
- Mark XP on failure.
- Apply triumph and despair.
- Count net advantage or threat.
- Use move result text first.
- Use default advantage/threat spends when the move does not specify enough.
- Explain the six common outcomes:
  - Success with advantage.
  - Plain success.
  - Success with threat.
  - Failure with advantage.
  - Plain failure.
  - Any result with triumph or despair.

### 6. Moves

Purpose: teach how character abilities work.

Content:

- Rollable moves.
- Static moves.
- Holds and named counters created by moves.
- Spending hold.
- Helping and hindering.
- Using gear through fictional positioning.
- Consumables and supply loss as threat spends.
- When a move does not cover an action.

### 7. Harm, Recovery, And Pressure

Purpose: gather player-facing consequences in one place.

Content:

- HP.
- Damage dice.
- Armor and protection.
- Conditions and setback dice.
- 0 HP and desperate consequences.
- Rest, care, healing moves, and facilities.
- Strain-like pressure where playbooks or campaign moves use it.

### 8. XP And Advancement

Purpose: explain growth.

Content:

- Mark XP on failed rolls and move-specific triggers.
- End-of-session XP if retained by the current rules.
- Spending XP.
- Taking new moves.
- Advanced moves.
- Rare stat increases.
- Campaign-specific advancement choices.

### 9. Story Points

Purpose: give shared table currency its own clean section.

Content:

- Starting pool.
- Player-side and GM-side points.
- Spending a point.
- The point flips to the other side.
- Upgrade uses.
- Detail declaration uses.
- Cap overflow to boost/setback.

### 10. Patrons

Purpose: teach the player-facing side of patron play from `core.md`.

Content:

- What a patron is in play.
- Bond, Debt, and Heat.
- Asking a patron for help.
- Patron favors.
- Patron demands.
- What happens at Debt 6.
- What happens at Heat 4.
- How patron tracks change.

### 11. Gods And Sacred Powers

Purpose: teach divine relationship play.

Content:

- Devotion, Favor, and Wrath.
- Making offerings.
- Praying for aid.
- Spending Favor.
- Omens.
- Taboos.
- What happens as Wrath rises.

### 12. Bastions, Steadings, And Home

Purpose: explain the community sheet as a player-facing object.

Content:

- What the home/community sheet tracks.
- Scale, Safety, Prosperity, Influence, Supply.
- Facilities.
- Fortunes, Surplus, and Trouble where used.
- Bastion turns.
- Common bastion orders.
- How player actions improve or endanger home.
- How trouble creates adventures.

### 13. Expeditions And Downtime

Purpose: put the home/adventure loop into play order.

Content:

- Preparing to leave.
- Choosing goals.
- Gear and supplies.
- Travel, danger, and discoveries.
- Returning home.
- Recovery.
- Updating bonds, tracks, steading state, and campaign pressures.
- Taking downtime and bastion turns.

### 14. Stonetop Campaign

Purpose: summarize the default campaign in player terms and list which subsystems matter most.

Content:

- Stonetop:
  - Home-centered frontier fantasy.
  - Uses steading, fortunes, expeditions, followers, bonds, and personal duties.
  - Source from `web/data.js`, `web/stonetop_playbooks.json`, and `expeditions.json`.

### 15. Quick Reference

Purpose: make table lookup fast.

Content:

- Dice names and symbols.
- Difficulty ladder.
- Pool-building checklist.
- Roll-reading checklist.
- Advantage/threat default spends.
- Story Point uses.
- Track thresholds.
- Bastion turn steps.
- Character creation checklist.

### 16. Reference Tables

Purpose: hold longer player-facing lookups that are useful but too bulky for the quick reference.

Content:

- Common advantage spends.
- Common threat spends.
- Patron favor examples.
- Patron demand examples.
- Divine offering examples.
- Bastion order list.
- Bastion extra benefits and costs.
- Condition examples.
- Downtime options.

### 17. Wilder Options

Purpose: present the alternate campaigns as optional campaign frames.

Content:

- The Free Legion:
  - Escaped army trying to become a people.
  - Uses patrons, gods/elements, bastion-as-mobile-camp, psionics, defilement, survival pressure.
  - Source from `steadings/darksun-free-legion.md` and `web/playbooks/darksun-*.json`.
- The Hollow-Oak Holt:
  - Tribe, bonds, innate gifts, animal ties, and community survival.
  - Uses village-style bonds more than power tracks.
  - Source from `steadings/elfquest-hollow-oak.md` and `web/playbooks/elfquest-*.json`.
- The Sign of the Black Cat:
  - Street-level city survival, guilds, debt, gods, magic, heat, and a shared den.
  - Uses patrons, gods, corruption, heat, and light bastion play.
  - Source from `steadings/lankhmar-black-cat.md` and `web/playbooks/lankhmar-*.json`.

## Writing Rules

- Use direct second-person player instructions.
- Define every term before using it heavily.
- Keep design notes out of the handbook body.
- Do not include source trails in the player-facing chapters.
- Do not compare to Powered by the Apocalypse, Genesys, Stonetop, or any other system.
- Avoid "why this rule exists" explanations.
- Use examples only to demonstrate table procedure.
- Keep campaign summaries playable and original.
- Keep references to existing setting names limited to the campaign headers already used in repo docs.

## Open Checks Before Drafting

- Confirm whether `GUIDE.md` should remain separate or be replaced by `PLAYER_HANDBOOK.md`.
- Confirm whether the handbook should be plain Markdown only or eventually rendered in the web app.
- Decide whether to include the existing probability table from `GUIDE.md`; it is useful, but may be too design-facing for a player's handbook.
- Decide whether Stonetop needs its own `steadings/stonetop.md` extracted from `web/data.js` before the campaign chapter is drafted.

## Drafting Order

1. Create `PLAYER_HANDBOOK.md` with chapters 1-9, using `GUIDE.md` and `ENG-SPEC.md`.
2. Add chapters 10-13 from `core.md`, `GUIDE.md`, `expeditions.json`, and the steading docs.
3. Add chapter 14 from the Stonetop campaign sources.
4. Add chapters 15-16 as table references.
5. Add chapter 17, `Wilder Options`, from the three alternate campaign sources.
6. Run a terminology pass to remove unexplained terms, design history, and outside-system comparisons.
7. Run a consistency pass against `ENG-SPEC.md`, `core.md`, and the playbook JSON files.
8. Optional: add links from `GUIDE.md` or `README` equivalent after the draft is approved.
