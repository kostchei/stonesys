# StoneSys — How to Play

Guide date: 2026-07-02

This is the table guide for StoneSys: a Stonetop-shaped game resolved with
Genesys narrative dice under strict pool rails. It covers how to play, how to
read a character sheet, how to use moves, and how to use every resource on the
sheet. It assumes the chassis in `ENG-SPEC.md` and the power systems in
`core.md`.

The design goal is **mechanical similarity to Stonetop**: every structure in
Stonetop's engine — result bands, advantage/disadvantage, hold, conditions,
aid, the steading's seasonal economy — has one clear equivalent here. If you
know Stonetop, section 9 is a one-page conversion. If you don't, start at
section 1.

---

## 1. What you need

- One set of Genesys narrative dice (or the web sheet at `web/index.html`,
  which rolls virtual ones), plus a d6/d8/d10 for damage.
- A playbook sheet per player (printed A3 landscape or the web sheet).
- The steading sheet for your playset (`steadings/`).
- Two tokens for Story Points (start one player-side, one GM-side).

The dice, named by color:

| Die | Color | Sides | What it is |
| --- | --- | --- | --- |
| Ability | green | d8 | your raw stat |
| Proficiency | yellow | d12 | trained competence; the only die with **◆ Triumph** |
| Boost | blue | d6 | a momentary edge (this system's "advantage") |
| Difficulty | purple | d8 | how hard the task is |
| Challenge | red | d12 | real peril; the only die with **✶ Despair** |
| Setback | black | d6 | a momentary hindrance (this system's "disadvantage") |

## 2. The core loop

Play is a conversation, exactly as in Stonetop:

1. The GM describes the situation.
2. You say what your character does, concretely, in the fiction.
3. If what you do triggers a move ("when you pass yourself off as someone you
   are not…"), the move happens — build a pool, roll, read it.
4. If no move triggers, the GM just says what happens. Not everything is a
   roll. Chores succeed; only risk rolls.
5. The result changes the situation. Go to 1.

**Fiction first.** You cannot "use Read the Room" the way you press a button;
you describe your character sizing up the hall, and *that* triggers the move.
What is true in the fiction (position, tools, light, who's watching) decides
whether a move triggers at all, what the difficulty is, and what boosts or
setbacks apply — settle all of that *before* dice hit the table.

## 3. Building a pool and reading the dice

### Building the pool

- **Positive side:** take green dice equal to the stat the move names (1–5).
  If you *have* the move (all your taken moves), upgrade **one green to
  yellow**. Nothing ever adds a die past 5; yellows never exceed **2**.
- **Negative side:** the GM sets difficulty in purple — `easy 1`, `average 2`
  (the default), `hard 3`, `daunting 4`.
- **Risk rule:** if the roll is risky — and moves are risky by default —
  upgrade so the pool has **at least 1 yellow and 1 red**, even untrained,
  even at easy difficulty. Something wonderful and something terrible are
  always possible when the stakes are real. Reds never exceed **2**.
- Add blue boosts and black setbacks from the fiction (see section 6).

Roll everything together. Symbols cancel pairwise: each ☓ failure cancels a ✱
success; each ▼ threat cancels a ▲ advantage. ◆ Triumph also counts as one
success and ✶ Despair as one failure, but **the triumph/despair themselves are
never cancelled** — they always fire.

### Reading the result — in this order

1. **Did it work?** Net successes ≥ 1 = **success**; otherwise **failure**.
   On a failure, **mark XP** — misses teach, exactly as in Stonetop.
2. **◆ / ✶ fire regardless.** A triumph on a failure is a silver lining; a
   despair on a success means you got it *and* something bad ignites.
3. **Read the texture** from net advantage or threat, bucketed into tiers:

| Net side symbols | Tier | What it means |
| --- | --- | --- |
| 0 | none | clean and quiet; nothing extra |
| 1–2 | minor | one ripple — pick one item from the move's menu |
| 3+ | major | a real turn — a big pick, or two menu items |

### The Stonetop band map

This is the heart of the conversion. Read your roll as a Stonetop result:

| Stonetop | This system |
| --- | --- |
| **10+ strong hit** | Success with net advantage (or clean success) |
| **7–9 weak hit** | Success with net **threat** — you get it, but pay from the move's threat menu |
| **6− miss** (mark XP, GM moves) | Failure (mark XP, GM moves). Failure with advantage = a miss with a silver lining; the GM's move is softer or you keep something |
| **12+ special tier** | **◆ Triumph** on a success — the move's triumph line |
| *(no equivalent)* | **✶ Despair** — license for the GM's hardest move, right now, even on a success |

The probabilities rhyme on purpose: a capped max pool (2 yellow 3 green vs.
average) succeeds ~87% — Stonetop's +3 hits on 91.7% — and success-with-threat
naturally fills the 7–9 role. Triumph at 2 yellows runs ~16% per roll,
comparable to Stonetop's 12+ at high stats.

## 4. How to read the character sheet

The sheet (web and A3 print) has five zones. Reading order:

**Header** — playbook name, your name, Look, and the duty line in bold. The
duty line is not flavor: it is the standing pressure your archetype lives
under, and the GM will lean on it.

**Left rail — Stats & Vitals.** Six stats, STR / DEX / CON / INT / WIS / CHA,
each rated 1–5. *The number is your dice*: WIS 3 means three greens when a
move says "roll +WIS." Below each stat the sheet prints its dice count. Under
that: **HP** (current/max), **damage die** (what you deal when the fiction says
you hurt something), **Load** (how much you can carry), **XP**.

**Center — Moves.** Everything your character can *do* beyond the obvious,
in three kinds:

- **Signature** (bordered): always on, the move that *is* your archetype.
  Usually carries a hold currency.
- **Fixed**: always on. Often static text — a standing truth, not a roll.
- **Choice** (checkbox "taken"): you have the checked ones; take more through
  advancement.

**Right rail — Embedment.** Who you are entangled with. Depending on the
playset this shows power-structure tracks (Bond/Debt/Heat with a patron;
Devotion/Favor/Wrath with a god; Standing with the steading; a personal track
like Defilement or Corruption) as clickable pip rows, plus your **Bonds**
(fill-in statements naming other PCs) and **Community tie** (your hook into
the steading). Village-style playsets (Elfquest) have no tracks here at all —
the bonds *are* the embedment.

**Footer — Advancement & Gear.** The advancement checklist (spend XP, take one
per level; stat gains live only in the rare "Advanced" list) and your gear
picks.

## 5. Using moves

### Rollable moves

A rollable move has a trigger, a stat, and a results block:

1. **Trigger it in the fiction.** Describe the action; the table agrees the
   move fires.
2. **Build the pool** (section 3). The move's printed difficulty is the
   default; the GM adjusts for the fiction. The web sheet's **Roll +STAT**
   button does all of this — set difficulty, toggle risky, add boost/setback,
   click.
3. **Read it against the move's block:**
   - **Success:** the success line happens.
   - **Failure:** the failure line (or the GM makes a move), and mark XP.
   - **▲ Advantage:** spend it on the move's advantage menu — that is where
     holds are earned ("Hold 1 String…").
   - **▼ Threat:** the GM spends it from the threat menu ("add 1 Heat…",
     "the contact wants payment…").
   - **◆ Triumph / ✶ Despair:** the move's own big lines fire.
4. **The fiction changes.** Say what it looks like.

If a move's menus don't cover what the dice gave you, use the default
exchange rates in section 6.

### Static moves

Moves with plain text (Leash, Collateral, The Patron's Purse…) don't roll —
they are standing permissions and prices. When their trigger happens, do what
they say. Many trade a track mark (＋1 Debt) for an effect; that trade *is*
the move.

### Helping and hindering

- **Aid:** if your bond or position makes it credible, describe how you help
  and give the roller **a blue boost die**. You are in the scene now — the GM
  may spend threat from that roll against *you*.
- **Interfere:** impose **a black setback die** on someone whose action you
  work against, and accept the fictional consequences of getting in the way.

## 6. Resources — every currency on the table

### Boost and setback dice (Stonetop's advantage/disadvantage)

Stonetop rolls an extra d6 and keeps the best or worst two; here the same
fictional causes add **blue** or **black** dice instead:

- The right tool, high ground, surprise, a true insight ("+1 forward", acting
  on answers, aid) → **+1 blue** on the relevant roll.
- Poor light, no footing, improvised gear, being watched ("−1 forward",
  interference) → **+1 black**.
- Lasting states ("+1 ongoing" while a ward stands, while collateral holds) →
  the blue persists while the fiction holds.
- **Conditions** (wounded-and-untreated, exhausted, shaken — Stonetop's
  debilities): each condition names a pair of stats and adds **a black die to
  every roll using either**, until treated. Write conditions next to HP.

Blues and blacks never cancel each other before the roll — throw them all.

### Hold (the named move currencies)

Holds are this system's stored agency: **Strings, Momentum, Favor, Writ,
Focus, Quarry, Reverie, Bedrock…** Each belongs to one move, is earned mostly
by **spending ▲ advantage on that move's menu**, and is spent later, one for
one, for the effects the move lists. Track them on the sheet's counters.

Default exchange rates when a menu doesn't say otherwise:

| Dice result | Buys |
| --- | --- |
| 1–2 ▲ (minor) | one small menu item, or a blue die to the next ally acting on this |
| 3+ ▲ (major) | one big item, or two small, or **hold 1** of the move's currency |
| ◆ Triumph | the move's triumph line, or hold 1 *and* a small item |
| 1–2 ▼ (minor) | one small cost: a black die soon, lose a consumable, a detail turns sour |
| 3+ ▼ (major) | a real cost: **tick a track** (Heat, Debt, Wrath, Trouble), lose the position, break the tool |
| ✶ Despair | the move's despair line, or the GM's hardest move — now |

That "lose a consumable" line is how ammo, torches, provisions, and remedies
deplete — supply erosion is a threat spend, not bookkeeping.

### Story Points

A shared pool of two (or one per player at bigger tables), split between the
players' side and the GM's side. Spend one to:

- **Upgrade a die**: green→yellow on your roll (GM: purple→red on the
  opposition). *The rails still bind* — if the pool already holds 2 yellows
  (or 2 reds), the spend adds a blue (black) instead.
- **Declare a detail**: a small true thing — there's a back stair; the guard
  is someone you know; you *did* pack it.

A spent point moves to the other side. Spend at dramatic moments; every point
you use arms the GM, and vice versa. This is the game's pacing valve.

### Power-structure tracks (`core.md`)

These are standings, not dice — they never join the pool; moves and threat
spends move them:

- **Bond (0–3) / Debt (0–6) / Heat (0–4)** with a patron. Debt 6 forces a
  major demand, then resets to 3. Heat 4 is open retaliation.
- **Devotion (0–3) / Favor (0–3) / Wrath (0–4)** with a god. Favor is itself
  a spendable hold (bless a roll that serves the god, ask an omen…). Wrath
  climbing is the god turning away.
- **Standing (0–3)** with the steading — how hard the community rallies to you.
- **Personal tracks** (Defilement, Corruption, Scars): they do not heal on
  their own; at the top the GM tells you what you've become.

Click the pips on the web sheet; the notes under each track state its
threshold rule.

### HP, armor, damage

Harm stays Stonetop-simple and does not use the narrative dice: when the
fiction says you take harm, take the damage die's result off HP (armor in the
fiction reduces it); when you deal harm, roll your damage die. Hitting 0 HP
triggers whatever desperate move your playbook offers (Hard to Kill…) or the
GM's mercy. Recover through rest, the Healer, the infirmary — fiction first.

### XP and advancement

Mark XP on **every failed roll** and when a move says so. At the session's
end, also mark for bonds resolved and duty honored (table's choice). Spend 5
XP to take one advancement checkbox. Stat raises live only in the **Advanced**
list and should feel like turning points, not shopping.

## 7. The steading

The community is a character (`steadings/`, `core.md` Bastion rules). Its
sheet carries ratings (Scale, Safety, Prosperity, Influence, Supply, −1..+3),
facilities, Trouble, named NPCs, and pressures.

Mapping Stonetop's seasonal economy onto the pools:

- **Fortunes** (the steading's confidence and goodwill) is a 1–5 rating on
  the steading sheet. **Season moves and Bastion turns roll it as a pool**:
  greens equal to Fortunes, upgraded once if the steading has a facility that
  clearly leads the work, against difficulty set by the season (spring
  `average`, deep winter `hard` or worse).
- **Surplus** is the steading's hold currency: gained on season-roll
  advantage, spent to feed the winter, fund projects ("Pull Together"), or
  trade. When Surplus hits 0 in winter, that is a crisis — the GM moves
  against the steading.
- **Trouble** ticks up on season-roll threat, exactly like Heat on a
  character. Trouble 4 is the steading's Despair.
- **◆ on a season roll**: a windfall, an alliance, a birth, a discovery.
  **✶**: disaster — raid, fire, plague, the GM's hardest steading move.

One roll a season, plus one Bastion turn per week of downtime, keeps the
home front moving without bookkeeping.

## 8. A worked round

> **Vesh the Beholden** slips into the river-quarter ahead of the caravan and
> puts out feelers for a contact — that triggers **Strings** (roll +CHA).
> CHA 4, move taken: **3 green, 1 yellow**. The GM calls it average and risky:
> **1 purple, 1 red**. Vesh's player spends a Story Point — 2nd yellow is
> legal (cap is 2), so upgrade: **2Y 2G vs 1P 1R**. The token slides to the GM.
>
> The roll: 2 successes, 1 advantage, 1 triumph, 1 threat. Net: **success,
> ▲/▼ cancel to 0, ◆ fires.** Read: success line ("you find someone who can
> help you here") plus the triumph line — *someone with real reach takes a
> favorable interest*. No net advantage, so no Strings held this time.
> The GM notes the new patron-shaped attention and the fiction moves.

## 9. Stonetop conversion cheat-sheet

For players arriving from Stonetop:

| Stonetop term | Here |
| --- | --- |
| 2d6 + stat (−1..+3) | pool of greens = stat (1..5); −1→1, +0→2, +1→3, +2→4, +3→5 |
| 10+ / 7–9 / 6− | success+advantage / success+threat / failure (+XP) |
| 12+ results | ◆ Triumph on a success |
| Advantage (3d6 keep best 2) | +1 blue boost die |
| Disadvantage (3d6 keep worst 2) | +1 black setback die |
| +1 forward | +1 blue on that next roll |
| +1 ongoing | +1 blue while the fiction holds |
| Conditions / debilities (disadvantage on stat pairs) | +1 black on rolls with either paired stat, until treated |
| Hold 1 / spend hold | identical — earned via ▲ menus, spent 1:1 |
| Aid / Interfere | give a blue / impose a black, and share the risk |
| Mark XP on a miss | mark XP on any failure |
| Armor, damage dice, HP | unchanged |
| Steading Fortunes | steading rating 1–5, rolled as a green pool on season moves |
| Surplus | the steading's hold currency |
| Season moves (roll +Fortunes) | season roll: Fortunes pool vs. season difficulty |
| GM soft/hard moves | unchanged; ✶ Despair is an immediate license for the hardest |

What you gain over 2d6: a *fail-forward texture axis* (failure with advantage,
success with despair) that 2d6 cannot express, and dice you can feel in your
hand growing with your character. What the rails protect: the bounded outcome
space — never more than 2 yellows or 2 reds, never more than 5 dice a side —
so results stay readable as Stonetop bands instead of dissolving into symbol
soup.

## Source trail

Mechanical structures verified against public commentary on Stonetop's
engine (advantage/disadvantage in place of forward/ongoing, condition
debilities, Fortunes/Surplus seasonal economy):

- [Spouting Lore: Playing Stonetop (and Other PbtA Games)](https://spoutinglore.blogspot.com/2023/02/playing-stonetop-and-other-pbta-games.html)
- [The Indie Game Reading Club: Deep Dive, Stonetop](https://indiegamereadingclub.com/indie-game-reading-club/deep-dive-stonetop/)
- [Spouting Lore: New Inventory System for Stonetop](https://spoutinglore.blogspot.com/2019/01/new-inventory-system-for-stonetop.html)
- [Troy Press: Stonetop review](https://troypress.com/stonetop-is-a-state-of-the-art-fantasy-role-playing-game/)

All text here is original; no Stonetop rules text is reproduced.
