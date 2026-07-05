# StoneSys Playsets — Build Plan

Plan date: 2026-06-30

Three settings to build on the StoneSys engine (Genesys narrative dice, lean
Stonetop-shaped characters, optional Patron/God/Bastion power tracks). Each is a
**steading + nine archetypes**, produced via the `forge-playset` skill.

## Ground rules

- **Original content only.** These are unofficial, from-scratch adaptations for
  personal play, inspired by the named settings. No published text, named
  characters, or proprietary stat material is reproduced. Role names are generic
  descriptors. Steading and NPC names are invented here.
- **Engine constants** (see `ENG-SPEC.md`): stat `1-5` = ability dice; a move
  grants one proficiency upgrade; GM sets difficulty; success/failure +
  advantage/threat + triumph/despair; per-move holds + shared Story Points;
  moves are fictional approaches, never gear specializations; stat gain is rare.
- **File layout:** playbooks at `playbooks/<setting>-<role>.json`; steadings at
  `steadings/<setting>.md`; all listed in `playbooks/index.json`.
- **Coherence:** every set covers all six stats as a primary; no two signatures
  do the same job; every community tie names that set's steading.
- **Research cadence:** build one setting at a time. For each, gather public,
  wiki-level setting texture, then write original archetypes/steading. Cite a
  short source trail per setting (as `core.md` does), reproducing nothing.

---

## 1. Dark Sun — "The Free Legion"

**Embedment style: power-structure (Patron/God/Bastion).** This setting is built
on sorcerer-kings, templar bureaucracies, merchant houses, elemental faith, and
two kinds of arcane magic — a perfect fit for the three-system model.

**Steading:** an escaped gladiator-slave army on the move in the scrub near a
great city, hunted, thirsty, and trying to become something more than fugitives.
A mobile Bastion (see `steadings/darksun-free-legion.md`).

| id | Archetype | Primary | Embedment | Signature job |
| --- | --- | --- | --- | --- |
| darksun-preserver | Preserver | INT | Patron (a hidden alliance of mages) | arcane magic drawn gently from life |
| darksun-gladiator | Mul Gladiator | STR | Bastion (the Legion's champion) | arena-bred melee and endurance |
| darksun-trader-thief | Trader-Thief | DEX | Patron (a merchant house) | smuggling, contacts, sleight |
| darksun-psionicist | Psionicist | WIS | innate (the Way; bonds only) | disciplined mind powers |
| darksun-templar | Templar | CHA | Patron (a sorcerer-king) | borrowed authority and granted magic |
| darksun-defiler | Defiler | INT | personal track: Defilement | magic torn from life, fast and scarring |
| darksun-elementalist | Elemental Cleric | WIS | God (a single element) | elemental faith and its bargains |
| darksun-poison-bard | Poison-Bard | CHA | Patron (a performers' guild) | performance, poison, quiet murder |
| darksun-dune-raider | Elven Dune-Raider | CON | Patron (an elf raiding tribe) | desert running, raids, trade-runs |

Stat spread: INT×2, WIS×2, CHA×2, STR, DEX, CON. Embedment leans Patron (the
setting is faction-soaked); Defiler and Psionicist carry personal/innate layers.

---

## 2. Elfquest — "the Hollow-Oak Holt"

**Embedment style: village (bonds + tribe, no power tracks).** The magic here is
innate gift, not a patron's or god's loan, so it lives in moves. The community is
a single tribe; ties are personal. This set demonstrates the village style.

**Steading:** a small forest tribe's refuge, pressed by a hardening climate,
encroaching neighbors, and dwindling game; they have lately taken in an outsider
or two (see `steadings/elfquest-hollow-oak.md`).

| id | Archetype | Primary | Embedment | Signature job |
| --- | --- | --- | --- | --- |
| elfquest-troll-smith | Troll Weaponsmith | STR | village (outsider ally) | forging arms and armor |
| elfquest-desert-elf | Desert Elf | CON | village (newcomer) | sun-lore, desert survival, patience |
| elfquest-chief | Chief | CHA | village (leader) | leading the tribe through war and peace |
| elfquest-healer | Healer | WIS | village | the magic of flesh and wounds |
| elfquest-tree-shaper | Tree-Shaper | INT | village | shaping living wood and plant |
| elfquest-dreamweaver | Dreamweaver | CHA | village | dream, spirit, and silent sending |
| elfquest-stargazer | Stargazer | INT | village | sky-lore and uneasy prophecy |
| elfquest-hunter | Master Hunter | DEX | village | the bow, the track, the hunt |
| elfquest-rockshaper | Rockshaper | CON | village | shaping stone and earth |

Stat spread: STR, CON×2, CHA×2, WIS, INT×2, DEX. "Recognition" and "sending" are
carried through Bonds rather than a track.

---

## 3. Lankhmar — "the Sign of the Black Cat"

**Embedment style: power-structure, Patron-heavy.** Guilds, capricious city gods,
the Thieves' and Assassins' Brotherhoods, and a dark patron or two. A shared lair
gives a light Bastion.

**Steading:** a band of ne'er-do-wells working out of a rented cellar-den in a
poor quarter, scraping between guild dues, the watch, rival gangs, and the gods
(see `steadings/lankhmar-black-cat.md`).

| id | Archetype | Primary | Embedment | Signature job |
| --- | --- | --- | --- | --- |
| lankhmar-thief | Sanctioned Thief | DEX | Patron (Thieves' Guild) | guild-licensed burglary |
| lankhmar-zealot | Zealot of the Street of Gods | WIS | God (a fickle city god) | street-preacher faith |
| lankhmar-duelist | Back-Alley Duelist | DEX | Bastion (the band's turf) | rapier work and dangerous reputation |
| lankhmar-scavenger | Sewer Scavenger | CON | Bastion (the under-city) | surviving and reading the depths |
| lankhmar-assassin | Brotherhood Assassin | WIS | Patron (Assassins' Brotherhood) | the patient contract kill |
| lankhmar-mercenary | Outlander Mercenary | STR | innate/outsider (bonds) | hired northern muscle |
| lankhmar-fence | Antiquarian Fence | CHA | Patron (collectors and the market) | appraisal, fencing, networks |
| lankhmar-dabbler | Dabbler in the Black Arts | INT | personal track: Corruption | dangerous minor sorcery |

Only eight given. Stat spread is already complete (DEX×2, WIS×2, CON, STR, CHA,
INT). **Open question for a ninth** — a natural fit is a **Guild Beggar-Spy**
(WIS, Patron: a beggars' guild; eyes-and-ears, disguise, information), which adds
an information role no one else owns. Confirm or swap before we reach Lankhmar.

---

## Build order and status

Build one setting at a time, steading first, then the nine, then wire into the
picker manifest and verify one renders/rolls.

- [x] **Dark Sun**: steading → 9 playbooks → manifest → verified
- [x] **Elfquest**: steading → 9 playbooks (village style, no tracks) → manifest → verified
- [x] **Lankhmar**: 9th = Guild Beggar-Spy (used; swap if desired) → steading → 9 playbooks → manifest → verified

Each setting also gets a short source trail appended to its steading file.
