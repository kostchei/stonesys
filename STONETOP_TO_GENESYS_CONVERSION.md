# Stonetop to Genesys Mechanical Translation Guide

This document scopes out the systematic translation of PbtA (Powered by the Apocalypse) rules in *Stonetop* (rolling 2d6 + Stat) into the *Genesys* narrative dice system (rolling positive Ability/Proficiency pools against negative Difficulty/Challenge pools) while preserving game intent, balance, and mathematical probability.

---

## 1. The Core Probability Map

In PbtA, all moves resolve to one of three tiers: a **Strong Hit (10+)**, a **Weak Hit (7-9)**, or a **Miss (6-)**. In Genesys, results are resolved on two independent axes: **Success vs. Failure** and **Advantage vs. Threat** (with Triumphs and Despairs as narrative wildcards).

To preserve the tripartite structure of PbtA, moves should be translated using the following mapping:

| PbtA Outcome | Genesys Equivalent | Approximate Probability | Narrative Meaning |
| :--- | :--- | :--- | :--- |
| **Strong Hit (10+)** | **Success** with **Advantage** (or Triumph) | ~15% – 35% | The character succeeds cleanly and gains extra momentum or secondary options. |
| **Weak Hit (7-9)** | **Success** with **Threat** (or no Adv/Thr) | ~40% – 50% | The character succeeds, but it comes with a cost, compromise, or minor complication. |
| **Miss (6-)** | **Failure** (regardless of Adv/Thr) | ~15% – 40% | The action fails, the situation worsens, the GM makes a move, and the player marks 1 XP. |

> [!NOTE]
> Because Genesys separates success from flavor, a player can roll a **Failure with Advantage**. In a translated Stonetop move, this counts mechanically as a **Miss** (the action fails, mark XP), but the player can spend the Advantage to gain a minor consolation (e.g., passing a Boost die to a teammate, or learning a minor detail).

---

## 2. Attribute Alignment

Stonetop attributes map directly to Genesys attributes as follows:

| Stonetop Stat | Genesys Equivalent | Primary Domain |
| :--- | :--- | :--- |
| **STR** (Strength) | **Brawn / Strength** | Physical power, heavy weapons, feats of raw muscle. |
| **DEX** (Dexterity) | **Agility / Dexterity** | Speed, stealth, ranged weapons, fast defense. |
| **CON** (Constitution) | **Brawn / Constitution** | Endurance, poison resistance, resisting death's door. |
| **INT** (Intelligence) | **Intellect** | Warding, lore, logic, deciphering ancient ruins. |
| **WIS** (Wisdom) | **Willpower / Cunning** | Observation, animal bonding, sensing spirits. |
| **CHA** (Charisma) | **Presence / Charisma** | Persuasion, leadership, parleying, holding rapport. |

---

## 3. Translating PbtA Mechanics to Genesys

### A. Hold and Readiness
PbtA moves often grant "Hold" (e.g., *Hold 3*), which players spend 1-for-1 to trigger specific options.
*   **Genesys Translation**:
    *   Map "Hold" to temporary **Boost dice (blue d6)** or **Advantage points** that can be spent on a list of special effects.
    *   Alternatively, keep the "Hold" resource intact, but specify that players gain the resource when they roll a **Success with Advantage** (minor = 1 hold, major = 2 hold).

### B. Risky Rolls (Despair & Triumph)
Under the StoneSys dice engine rules:
*   **Triumphs** cannot be cancelled by Despair. In moves, a Triumph should immediately trigger a signature success effect, bypass a major restriction, or restore a point of Stock/Readiness.
*   **Despairs** are always live on risky rolls. A Despair represents a narrative catastrophe (e.g., weapons breaking, warning alarms sounding, attracting a corrupted spirit's attention) that occurs *even if the roll succeeded*.

---

## 4. Move Translation Walkthroughs

Here is how the three previously missing Blessed moves are systematically translated to fit Genesys:

### 1. Borrow Power
*   **Original PbtA**: 
    > When a spirit or beast loans you power, ask the GM for one of its tags or moves. Store it in your pouch in place of 1 Stock. When you use the borrowed tag or move, **roll WIS**: on a **10+**, you do it and can use the power again; on a **7-9**, you do it, but lose the power.
*   **Genesys Translation**:
    > When you use a borrowed tag or move, **roll WIS (Willpower/Cunning)**.
    > *   **Success with Advantage**: You successfully use the power, and it remains stored in your pouch.
    > *   **Success with Threat**: You successfully use the power, but it is expended and lost.
    > *   **Failure**: You fail to invoke the power, it is lost, and the GM makes a move.
    > *   *Triumph Option*: You use the power, keep it, and gain a Boost die on its next use.
    > *   *Despair Option*: The power backfires, dealing strain or damage to you as the spirit asserts its dominance.

### 2. Into the Lion's Den
*   **Original PbtA**:
    > When you approach a beast calmly and show no fear, it will not harm you (though it may threaten you and test your nerve). When you lay your hand gently upon a beast, it calms to your touch. (Passive/No roll, or rolls Defy Danger on threat).
*   **Genesys Translation**:
    > Passive effect. However, if the beast is actively hostile or corrupted:
    > *   To calm it or approach safely, **roll WIS (Willpower/Cunning)** against a difficulty based on the beast's wildness.
    > *   **Success**: The beast is calmed or stands down.
    > *   **Threat/Despair**: The beast tests your nerve; you must suffer 2 Strain to stand your ground, or it lashes out.

### 3. Lightning Rod
*   **Original PbtA**:
    > When you Defend while touching the earth, you can spend 1 Readiness to intercept a nearby magical attack and redirect it harmlessly into the ground.
*   **Genesys Translation**:
    > When you perform the **Defend** action while touching the earth, you may spend **1 Readiness** (or **2 Advantages** from your Defend roll) to intercept a nearby magical attack and redirect it harmlessly into the ground, completely student-negating its damage and status effects.

---

## 5. Next Steps for Implementation

To fully implement this Genesys alignment:
1.  **Review Supplements**: Systematically check non-Stonetop campaign supplements (like Dark Sun or Lankhmar) to ensure their move descriptions similarly use the Success/Failure/Advantage/Threat wording rather than 2d6-style hit tiers.
2.  **Stat Checks**: Replace references like "roll INT" or "roll DEX" on the custom playbook pages with the appropriate narrative skill/attribute checks.
