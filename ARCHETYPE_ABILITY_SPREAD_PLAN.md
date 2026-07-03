# Archetype Ability Spread Plan

Plan date: 2026-07-03

## Goal

Every archetype in every campaign should present the same creation and
advancement structure:

- **Signature / fixed:** always-on starting moves.
- **Starting choices:** the small number chosen at character creation.
- **Advancement choices:** roughly 10-13 pre-level-6 options, depending on the
  playbook.
- **Level 6+ choices:** usually 7 options, hidden until level 6.

The converted non-Stonetop campaigns also need their setting abilities spread
across archetypes. The goal is not to add new mechanics; it is to widen each
archetype's available range while keeping its choices distinct.

## Invariants

- Stonetop keeps the explicit core playbook grouping already modeled in
  `web/move-groups.js`.
- Dark Sun characters all get a free wild psionic talent, but each archetype
  sees a tailored list that fits its role.
- Lankhmar characters choose a cult, patron, or supernatural entanglement, but
  the visible list should match their place in the city.
- Elfquest characters choose an animal bond or companion tie, with tribe magic
  and bond options weighted by archetype.
- Level 6+ options remain hidden until the sheet reaches the level-6 gate.

## Campaign Allocation

### Stonetop

Stonetop already has per-playbook move identity from the core rules. No new
spread is needed beyond keeping the fixed / starting / advancement / level-6
sections intact.

### Dark Sun

All archetypes get one required wild talent. The spread should make psionics
feel universal but not identical:

| Archetype | Starting talent emphasis | Advancement emphasis |
| --- | --- | --- |
| Gladiator | combat reflex, endurance, force | arena combat, defense, psionic dueling |
| Templar | command, scrutiny, secrets | discipline, templar masking, authority |
| Preserver | sense, memory, gentle contact | clairsentience, hidden training, preservation |
| Defiler | force, heat, domination | attack modes, defiling pressure, concealment |
| Psionicist | broad formal talent | all disciplines, advanced Way mastery |
| Dune Trader | empathy, reading, far sense | contacts, memory, concealment |
| Elemental Priest | endurance, life sense, warding | elemental meditation, defense, survival |
| Wasteland Scout | life sense, far hearing, heat | range, tracking, survival instincts |
| Rebellious Slave | mind blank, body control, empathy | resistance, awakening, hidden talent |

### Lankhmar

Every archetype gets one Lankhmar patron. In this campaign, "patron" is broad:
it can be a god or cult, a guildmaster or city power-broker, or a weird alien
mentor like Ningauble of the Seven Eyes or Sheelba of the Eyeless Face. The
spread should connect the archetype to the city instead of giving every
archetype the same list:

| Archetype | Starting patron emphasis | Advancement emphasis |
| --- | --- | --- |
| Bravo | alien patrons, duel-yard guildmasters, war gods | street leverage, impossible errands |
| Thief | guildmasters, Ningauble, fences, city gods | passwords, safehouses, stolen rumors |
| Dabbler | Ningauble, Sheelba, Death, black arts | alien bargains, sorcerous debt |
| Street Priest | gods, cults, shrine keepers | temple debts, divine notices |
| Foreign Mercenary | outsider gods, war patrons, captains | watch pressure, hired blades |
| Courtesan/Dandy | salon guildmasters, black-toga patrons, gossip gods | leverage, invitations, debts |
| Assassin | Death, guildmasters, shadow cults | quotas, silent contracts |
| Fence | collector guildmasters, markets, Ningauble | appraisal, rumor, legal fiction |
| Beggar Agent | beggar guildmasters, small gods, alien listeners | street intelligence, hidden doors |

### Elfquest

Every archetype gets one bond or companion tie. The spread should distinguish
animal bonds from innate elven gifts:

| Archetype | Starting bond emphasis | Advancement emphasis |
| --- | --- | --- |
| Wolfrider | wolf pack, sending, hunt bonds | wolf-bonding, pack-mind, tracking |
| Chieftain | pack, tribe, leadership bond | recognition, tribe calls, command |
| Stargazer | sending, no-beast path, night creatures | astral projection, star prophecy |
| Healer | gentle companions, flesh bond | healing, flesh-shaping, recognition |
| Glider | hawk, height, distant sending | astral projection, air and vision |
| Preserver Sprite | preserver friend, small beasts | wrapping, memory, playful magic |
| Rock-Shaper | cave creatures, stone kinship | rock-shaping, shelter, deep memory |
| Sun-Folk Villager | desert runners, herd beasts | fire-starting, sun survival |
| Huntress | pack, hawk, great cat | hunt bonds, ambush, beast senses |

## Verification Checklist

- Count every archetype's move groups after generation.
- Confirm starting rules still require exactly one campaign option for the
  converted settings.
- Confirm non-Stonetop advancement lists remain in the 10-13 pre-level-6 band.
- Confirm level-6 lists remain hidden until the level-6 gate.
