# StoneSys — How to Play

Guide date: 2026-07-02

This is the table guide for StoneSys. It covers how to play, how to read a
character sheet, how to use moves, and how to use every resource on the sheet.
It assumes the chassis in `ENG-SPEC.md` and the power systems in `core.md`.
If you're coming from Stonetop or another Powered-by-the-Apocalypse game, the
appendix at the end maps every familiar term — but you don't need it to play.

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
| Boost | blue | d6 | a momentary edge |
| Difficulty | purple | d8 | how hard the task is |
| Challenge | red | d12 | real peril; the only die with **✶ Despair** |
| Setback | black | d6 | a momentary hindrance |

## 2. The core loop

Play is a conversation:

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

## 3. Building a pool

- **Positive side:** take green dice equal to the stat the move names (1–5).
  If you *have* the move, upgrade **one green to yellow**. Nothing ever adds
  a die past 5; yellows never exceed **2**.
- **Negative side:** the GM sets difficulty in purple — `easy 1`, `average 2`
  (the default), `hard 3`, `daunting 4`.
- **The risk rule:** if the roll is risky — and moves are risky by default —
  upgrade so the pool has **at least 1 yellow and 1 red**, even untrained,
  even at easy difficulty. When the stakes are real, something wonderful and
  something terrible are always possible. Reds never exceed **2**.
- Add blue boosts and black setbacks from the fiction (section 6).

Roll everything together. Symbols cancel pairwise: each ☓ failure cancels a
✱ success; each ▼ threat cancels a ▲ advantage. ◆ Triumph also counts as one
success and ✶ Despair as one failure, but **the triumph/despair symbols
themselves are never cancelled** — they always fire.

## 4. Reading your roll

Read in this order:

1. **Did it work?** Net successes ≥ 1 = yes. On a failure, **mark XP** —
   failing is how you grow.
2. **◆ and ✶ fire no matter what.** They are their own axis.
3. **Read the texture** from net advantage or threat, in tiers:
   0 = none · 1–2 = **minor** (one ripple) · 3+ = **major** (a real turn).

Every roll lands in one row of this grid:

| The dice say | Call it | What happens |
| --- | --- | --- |
| Success + net ▲ | **Success, and…** | The move's success line, plus spend the advantage (menu, or hold) |
| Success, net 0 | **Success** | The success line, clean and quiet |
| Success + net ▼ | **Success, but…** | You get it *and* pay — the GM spends the threat from the move's menu |
| Failure + net ▲ | **Miss with a silver lining** | Mark XP; the GM moves, but softer — or you salvage something on the way down |
| Failure | **Miss** | Mark XP; the GM makes a move |
| **◆ Triumph** (either way) | **A turn in your favor** | The move's triumph line — even on a failure, something breaks your way |
| **✶ Despair** (either way) | **A turn against you** | The move's despair line, or the GM's hardest move, right now — even on a success |

**"Success, but…" and "miss with a silver lining" are normal, not edge
cases.** At middling stats, a costly success is the *most common* kind of
success, and roughly a quarter of all rolls are misses that still hand you an
advantage to spend. Expect texture on most rolls; clean-and-quiet is the rare
one.

### What the odds feel like

For a **trained, risky roll at average difficulty** (the standard case):

| Stat | Pool | Success | of which "and…" / clean / "but…" | ◆ | ✶ |
| --- | --- | --- | --- | --- | --- |
| 2 | 1G+1Y vs 1P+1R | 42% | 5% / 10% / 27% | 8% | 8% |
| 3 | 2G+1Y vs 1P+1R | 59% | 19% / 16% / 23% | 8% | 8% |
| 4 | 3G+1Y vs 1P+1R | 71% | 38% / 17% / 17% | 8% | 8% |
| 5 | 4G+1Y vs 1P+1R | 80% | 56% / 14% / 11% | 8% | 8% |
| 5, mastered (2 ranks) | 3G+2Y vs 1P+1R | 84% | — | **16%** | 8% |

Rules of thumb worth teaching at the table:

- **Each step of difficulty costs roughly 10–12 points of success chance**
  (a stat-5 master: 80% at average → 71% hard → 61% daunting).
- **◆ Triumph depends only on your yellows**: ~8% with one, ~16% with two.
  Difficulty can't touch it — mastery keeps producing wonders even on hard
  days.
- **✶ Despair depends only on the reds**: ~8% with one, ~16% if the GM
  upgrades to two. About one risky roll in twelve goes memorably wrong.
- A maxed-out master still averages about **+1.8 net advantage** per roll —
  one good ripple — never a flood.

## 5. How to read the character sheet

The sheet (web and A3 print) has five zones. Reading order:

**Header** — playbook name, your name, Look, and the duty line in bold. The
duty line is not flavor: it is the standing pressure your archetype lives
under, and the GM will lean on it.

**Left rail — Stats & Vitals.** Six stats, STR / DEX / CON / INT / WIS / CHA,
each rated 1–5. *The number is your dice*: WIS 3 means three greens when a
move says "roll +WIS." Below each stat the sheet prints its dice count. Under
that: **HP** (current/max), **damage die** (what you deal when the fiction
says you hurt something), **Load** (your carrying limits: Light, Normal, Heavy based on STR), **XP**.

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

**Footer — Advancement & Gear.** The advancement checklist (spend XP, take
one per level; stat gains live only in the rare "Advanced" list) and your
gear picks.

## 6. Using moves

### Rollable moves

A rollable move has a trigger, a stat, and a results block:

1. **Trigger it in the fiction.** Describe the action; the table agrees the
   move fires.
2. **Build the pool** (section 3). The move's printed difficulty is the
   default; the GM adjusts for the fiction. The web sheet's **Roll +STAT**
   button does all of this — set difficulty, toggle risky, add boost/setback,
   click.
3. **Read it against the move's block** (section 4): success/failure lines,
   ▲ spends from the advantage menu (that's where holds are earned — "Hold 1
   String…"), ▼ spends from the threat menu, and the move's own ◆/✶ lines.
4. **The fiction changes.** Say what it looks like.

If a move's menus don't cover what the dice gave you, use the exchange rates
in section 7.

### Static moves

Moves with plain text (Leash, Collateral, The Patron's Purse…) don't roll —
they are standing permissions and prices. When their trigger happens, do what
they say. Many trade a track mark (＋1 Debt) for an effect; that trade *is*
the move.

### Helping and hindering

- **Aid:** if your bond or position makes it credible, describe how you help
  and give the roller **a blue die**. You are in the scene now — the GM may
  spend threat from that roll against *you*.
- **Interfere:** impose **a black die** on someone whose action you work
  against, and accept the fictional consequences of getting in the way.

## 7. Resources — every currency on the table

### Blue and black dice (edges and hindrances)

- The right tool, high ground, surprise, a true insight, an ally's aid →
  **+1 blue** on the relevant roll.
- Poor light, no footing, improvised gear, being watched, interference →
  **+1 black**.
- Lasting states (while a ward stands, while collateral holds) → the blue
  persists while the fiction holds.
- **Conditions** (wounded-and-untreated, exhausted, shaken): each condition
  names a pair of stats and adds **a black die to every roll using either**,
  until treated. Write conditions next to HP.

Blues and blacks never cancel each other before the roll — throw them all.

### Hold (the named move currencies)

Holds are stored agency: **Strings, Momentum, Favor, Writ, Focus, Quarry,
Reverie, Bedrock…** Each belongs to one move, is earned mostly by **spending
▲ advantage on that move's menu**, and is spent later, one for one, for the
effects the move lists. Track them on the sheet's counters.

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
- **Standing (0–3)** with the steading — how hard the community rallies to
  you.
- **Personal tracks** (Defilement, Corruption, Scars): they do not heal on
  their own; at the top the GM tells you what you've become.

Click the pips on the web sheet; the notes under each track state its
threshold rule.

### HP, armor, damage

Harm stays simple and does not use the narrative dice: when the fiction says
you take harm, take the damage die's result off HP (armor in the fiction
reduces it); when you deal harm, roll your damage die. Hitting 0 HP triggers
whatever desperate move your playbook offers (Hard to Kill…) or the GM's
mercy. Recover through rest, the Healer, the infirmary — fiction first.

### XP and advancement

Mark XP on **every failed roll** and when a move says so. At the session's
end, also mark for bonds resolved and duty honored (table's choice). Spend 5
XP to take one advancement checkbox. Stat raises live only in the **Advanced**
list and should feel like turning points, not shopping.

## 8. The steading

The community is a character (`steadings/`, `core.md` Bastion rules). Its
sheet carries ratings (Scale, Safety, Prosperity, Influence, Supply, −1..+3),
facilities, Trouble, named NPCs, and pressures. Beyond those, three resources
drive the year:

- **Fortunes** — the steading's confidence and goodwill, rated 1–5. **Season
  moves and Bastion turns roll it as a pool**: greens equal to Fortunes,
  upgraded once if a facility clearly leads the work, against difficulty set
  by the season (spring `average`, deep winter `hard` or worse). Season rolls
  are always risky: the year always carries a yellow and a red.
- **Surplus** — the steading's hold currency: gained by spending a season
  roll's ▲, spent to feed the winter, fund projects, or trade. Surplus at 0
  in winter is a crisis — the GM moves against the steading.
- **Trouble** — ticks up on season-roll ▼, exactly like Heat on a character.
  Trouble 4 is the steading's ✶.
- **◆ on a season roll**: a windfall, an alliance, a birth, a discovery.
  **✶**: disaster — raid, fire, plague, the GM's hardest steading move.

One roll a season, plus one Bastion turn per week of downtime, keeps the home
front moving without bookkeeping.

## 9. A worked round

> **Vesh the Fox** slips into the river-quarter ahead of the caravan and
> tries to talk his way past a suspicious guard — that triggers **Silver Tongued** (roll +CHA).
> CHA 4, move taken: **3 green, 1 yellow**. The GM calls it average and
> risky: **1 purple, 1 red**. Vesh's player spends a Story Point — a second
> yellow is legal (cap is 2), so upgrade: **2Y 2G vs 1P 1R**. The token
> slides to the GM.
>
> The roll: 2 successes, 1 advantage, 1 triumph, 1 threat. Net: **success,
> ▲/▼ cancel to 0, ◆ fires.** Read: the success line ("you successfully avoid suspicion") plus the triumph line — *someone in authority takes
> a favorable interest*. No net advantage, so no Nerve held this time. The
> GM notes the new attention, and the fiction moves.

## Appendix: for players coming from Stonetop / PbtA

You don't need this to play — it's a translation for the migrating.

| Stonetop term | Here |
| --- | --- |
| 2d6 + stat (−1..+3) | pool of greens = stat (1..5); −1→1, +0→2, +1→3, +2→4, +3→5 |
| 10+ / 7–9 / 6− | success+▲ / success+▼ / failure (+XP) |
| 12+ results | ◆ Triumph on a success |
| Advantage (3d6 keep best 2) | +1 blue die |
| Disadvantage (3d6 keep worst 2) | +1 black die |
| +1 forward / +1 ongoing | +1 blue on that roll / while the fiction holds |
| Conditions / debilities | +1 black on rolls with either paired stat, until treated |
| Hold 1 / spend hold | identical — earned via ▲ menus, spent 1:1 |
| Aid / Interfere | give a blue / impose a black, and share the risk |
| Mark XP on a miss | mark XP on any failure |
| Armor, damage dice, HP | unchanged |
| Steading Fortunes | rated 1–5, rolled as a green pool on season moves |
| Surplus / seasonal moves | the steading's hold currency / season roll vs. season difficulty |
| GM soft/hard moves | unchanged; ✶ is an immediate license for the hardest |

How the curves compare, at the capped maximum (2Y3G, trained master) against
a risky average roll (1P+1R): **~84% success** here vs. 91.7% any-hit at
Stonetop's +3 — a touch meaner, because a red die is always in the pool.
"Success, but…" fills the 7–9 role. ◆ at 2 yellows runs ~16% per roll
(Stonetop's 12+ at +2 is ~17%); ✶ adds a ~8% wild-turn chance per risky roll
that 2d6 has no equivalent for. What the rails protect is the bounded outcome
space: never more than 2 yellows or 2 reds, never more than 5 dice a side, so
results stay readable as bands instead of dissolving into symbol soup.

## Source trail

Mechanical structures for the appendix verified against public commentary:

- [Spouting Lore: Playing Stonetop (and Other PbtA Games)](https://spoutinglore.blogspot.com/2023/02/playing-stonetop-and-other-pbta-games.html)
- [The Indie Game Reading Club: Deep Dive, Stonetop](https://indiegamereadingclub.com/indie-game-reading-club/deep-dive-stonetop/)
- [Spouting Lore: New Inventory System for Stonetop](https://spoutinglore.blogspot.com/2019/01/new-inventory-system-for-stonetop.html)
- [Troy Press: Stonetop review](https://troypress.com/stonetop-is-a-state-of-the-art-fantasy-role-playing-game/)

All text here is original; no Stonetop rules text is reproduced.
