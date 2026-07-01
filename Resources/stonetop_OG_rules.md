# Stonetop Original Rules Reference

This document summarizes the core rules, procedures, and moves from Jeremy Strandberg's *Stonetop* (Book I). It serves as a comprehensive design reference for the original rules system.

---

## 1. Core Resolution & Dice Mechanics

### The Conversation
Stonetop is played as a conversational game. 
- The GM describes the situation, hazards, weather, and NPC behavior.
- The players say what their characters (PCs) do, think, and feel.
- Actions are governed by **fictional positioning**. To do something in the rules, the character must do it in the fiction. If they do it in the fiction, the move is triggered.

### The 2D6 Roll
Most moves require rolling **2d6 + Stat**. 
- **10+ (Strong Hit):** The action succeeds as well as could be hoped.
- **7-9 (Weak Hit):** Success with a cost, consequence, constraint, or a difficult choice.
- **6- (Miss):** 
  - The player marks **1 XP** (unless the move says otherwise).
  - The GM describes the consequences, making a **GM Move** (soft or hard) that flows logically from the fiction. It does not necessarily mean the character made a mistake; rather, something goes wrong.

### Advantage and Disadvantage
- **Advantage:** Roll **3d6** and sum the two highest dice.
- **Disadvantage:** Roll **3d6** and sum the two lowest dice.
- If a roll has both advantage and disadvantage, they cancel each other out.
- **Damage Rolls:** For advantage/disadvantage on damage, roll the main damage die twice and keep the higher/lower result, then add any flat bonuses.

### The Die of Fate
- When the GM wants to let fate decide an outcome that is not covered by a move, they ask for a roll of **1d6** (with no modifiers). High is good, low is bad.

---

## 2. Character Mechanics

### The Six Stats
PCs distribute the values **+2, +1, +1, +0, +0, -1** among these six attributes (except the Would-be Hero, who has a lower array but unique moves):
- **Strength (STR):** Power, brute force, close-quarters combat. (Used to *Clash*).
- **Dexterity (DEX):** Agility, speed, ranged combat, finesse. (Used to *Let Fly*).
- **Constitution (CON):** Stamina, endurance, holding steady. (Used to *Defend*).
- **Intelligence (INT):** Knowledge, logic, history, clever plans. (Used to *Know Things*).
- **Wisdom (WIS):** Perception, senses, willpower, intuition. (Used to *Seek Insight*).
- **Charisma (CHA):** Connecting with others, charm, empathy. (Used to *Persuade*).

### Hit Points (HP) & Armor
- **HP (Hit Points):** Represents fighting spirit, luck, grit, and plot armor (not direct physical meat). 
  - Starting HP is determined by the playbook. 
  - HP does **not** increase automatically upon leveling up.
  - At **0 HP**, the PC is out of the action and may be dying.
- **Armor:** Subtracts from incoming damage. Armor ratings do not stack unless a piece of gear explicitly grants "+1 armor". Armor defaults to 0. Ignored if an attack has the "ignores armor" tag or if the damage bypasses physical defense (e.g. fire, psychic).

### Weapons & Damage

#### 1. Damage is Playbook-Based, Not Weapon-Based
Unlike traditional RPGs, a weapon does not dictate the size of your damage die. Instead, your character's playbook defines it based on how combat-effective and dangerous that character archetype is:
- **The Heavy** deals **1d10** damage, whether they are swinging a massive battleaxe, throwing a dagger, or punching someone.
- **The Ranger** deals **1d8** damage.
- **The Lightbearer** deals **1d4** damage.
- *(Note: You do not add STR or DEX modifiers to damage rolls.)*

#### 2. Weapons as Fictional Enablers
Weapons define your fictional positioning—what you can do and at what range. You cannot trigger a move like *Clash* or *Let Fly* unless your weapon makes it fictionally plausible:
- **Range Tags** (*hand*, *close*, *reach*, *near*, *far*) dictate the physical distance at which you can attack. For example, you cannot attack a giant spider 3 paces away (*reach*) with a dagger (*hand*) unless you close the distance first.
- **Plausibility:** You cannot damage an enemy made of solid stone with an ordinary iron sword, regardless of your damage die, because the fiction rules it impossible.

#### 3. Weapon Tags and Exceptions
Weapons modify combat through tags and occasional numeric bonuses:
- **Damage Modifiers:** Certain specialized "weapons of war" (like a long sword, crossbow, or composite bow) grant **+1 damage** to your playbook roll.
- **Armor Piercing:**
  - `[n] piercing` ignores $n$ points of the target's armor (e.g., a warhammer with *2 piercing* ignores 2 armor).
  - `x piercing` ignores armor equal to Stonetop's current Prosperity score.
- **Narrative Effects:**
  - `forceful` can knock enemies off their feet or push them back.
  - `messy` inflicts horrific, destructive wounds (ripping limbs, breaking shields, shattering armor) and often prompts the GM to inflict lasting "problematic wounds" on the target.

### Debilities
Debilities represent ongoing physical or mental strain, applying disadvantage to two related stats:
- **Weakened:** Sluggish, tired, or physically shaky. Disadvantage on **STR** and **DEX** rolls.
- **Dazed:** Disoriented, confused, or concussed. Disadvantage on **INT** and **WIS** rolls.
- **Miserable:** In severe pain, angry, or sick. Disadvantage on **CON** and **CHA** rolls.

### XP & Leveling Up
- **Marking XP:** Marked on a 6- roll, during the *End of Session* move, or via specific moves.
- **Downtime Level Up:** When in a safe place at home with XP $\ge 6 + (2 \times \text{Current Level})$:
  1. Subtract $6 + (2 \times \text{Current Level})$ from XP.
  2. Increase level by 1.
  3. Choose a new move from your playbook (or an unlocked insert).
  4. Blessed (or PCs with a sacred pouch) increase max Stock by 1 if the new level is even.
  5. Lightbearer (or PCs with Invoke the Sun God) select a new invocation if the new level is even.
  6. Review Instinct and Appearance.

---

## 3. Basic & Special Moves

### Basic Moves

#### DEFY DANGER
When danger looms, the stakes are high, and you do something chancy, check if another move applies. If not, roll...
- **+STR** to power through or test your might
- **+DEX** to employ speed, agility, or finesse
- **+CON** to endure or hold steady
- **+INT** to apply expertise or enact a clever plan
- **+WIS** to exert willpower or rely on your senses
- **+CHA** to charm, bluff, impress, or fit in

**Results:**
- **10+:** You pull it off as well as one could hope.
- **7-9:** You can do it, but the GM presents a lesser success, a cost, or a consequence (and maybe a choice or a chance to back down).

#### AID
When you help someone who has not yet rolled, the GM picks 1:
- They can accomplish more than they could alone.
- They gain advantage on their roll.

*Either way, you are exposed to any risk, cost, or consequence associated with their roll.*

#### CLASH
When you fight in melee or close quarters, roll **+STR**:
- **10+:** Your maneuver works as expected (deal your damage) and pick 1:
  - Avoid, prevent, or counter your enemy's attack.
  - Strike hard and fast, for +1d6 damage, but suffer your enemy's attack.
- **7-9:** Your maneuver works, mostly (deal your damage), but you suffer your enemy's attack.

#### DEFEND
When you take up a defensive stance or jump in to protect others, roll **+CON**:
- **10+:** Hold 3 Readiness (or 4 with a shield).
- **7-9:** Hold 1 Readiness (or 2 with a shield).

*Spend Readiness 1-for-1 to:*
- Suffer an attack's damage/effects instead of your ward.
- Halve an attack's effect or damage.
- Draw all attention from your ward to yourself.
- Strike back at an attacker (deal your damage, with disadvantage).

*When you go on the offense, cease to focus on defense, or the threat passes, lose any Readiness that you hold.*

#### INTERFERE
When you try to foil another PC's action and neither of you back down, roll +Stat (corresponding to the action):
- **10+:** They choose 1 from the list below.
- **7-9:** They choose 1 from the list below, but you are left off-balance, exposed, or otherwise vulnerable.
  - **Options:**
    - Do it anyway, but with disadvantage on their (next) roll.
    - Relent, change course, or allow their move to be foiled.

#### KNOW THINGS
When you consult your accumulated knowledge, roll **+INT**:
- **10+:** The GM tells you something interesting and useful about the topic.
- **7-9:** The GM tells you something interesting; it is on you to make it useful.

*Either way, the GM might ask "how do you know this?"*

#### LET FLY
When you take an easy shot with a ranged weapon, deal your damage. 
If the shot is tricky or you're under pressure, first roll **+DEX**:
- **10+:** You have a clear shot, deal your damage.
- **7-9:** Pick 1:
  - Deal your damage, but deplete your ammo (mark the next status by your weapon).
  - Hold steady and wait for a clear shot; when the moment arrives (GM's call), deal your damage.
  - Move to get a clear shot—exposing yourself to danger or giving up some advantage (GM says how)—then deal your damage.
  - Rush the shot and deal your damage, leading to a cost or complication of the GM's choice.

#### PERSUADE (vs. NPCs)
When you press or entice an NPC, say what you want them to do (or not do). If they have reason to resist, roll **+CHA**:
- **10+:** They either do as you want or reveal the easiest way to convince them.
- **7-9:** They reveal something you can do to convince them (likely costly, tricky, or distasteful).

#### PERSUADE (vs. PCs)
When you press or entice a PC and they resist, ask their player: *"Could I possibly get you to do this, yes or no?"*
- If they say **"no"**, let it drop.
- If they say **"yes"**, roll **+CHA**:
  - **10+:** They mark XP if they do what you want; if they don't, they must say how you could convince them.
  - **7-9:** They mark XP if they do what you want (but can refuse or make a counter-offer).

#### SEEK INSIGHT
When you study a situation or person, looking to the GM for insight, roll **+WIS**:
- **10+:** Ask the GM 3 questions from the list below.
- **7-9:** Ask 1 question.
  - **Questions:**
    - What happened here recently?
    - What is about to happen?
    - What should I be on the lookout for?
    - What here is useful or valuable to me?
    - Who or what is really in control here?
    - What here is not what it appears to be?

*Either way, take advantage on your next move to act on the answers.*

---

### Special Moves

#### ADVANTAGE/DISADVANTAGE
*(Summarized in Section 1).*

#### BURN BRIGHTLY
When you have enough XP to Level Up ($6 + 2 \times \text{Level}$), you may spend **2 XP** after any roll you make to add **+1** to that roll (max +1 per roll).

#### DEATH'S DOOR
When you are dying (reduced to 0 HP by a potentially lethal source), glimpse the Last Door and the Lady of Crows (describe them). Then, roll **+nothing**:
- **10+:** Wrest yourself back to the living—return to **1 HP** but say how your brush with death has marked you.
- **7-9:** The Lady waves you off—you're no longer dying but you're out of the action (unconscious).
- **6-:** Your time has come—choose 1:
  - Make one last move as if you rolled a 12+, then step through the Last Door.
  - Refuse to go; gain the **Revenant** or **Ghost** insert.
  - Call on one of the Things Below by name and beseech it to intercede; gain the **Thrall** insert.

#### END OF SESSION
When a session ends:
1. Point out how you demonstrated or struggled with your instinct. If you can, mark XP.
2. Say how your relationship with or opinion of a PC, NPC, or group has changed. If you can, mark XP.
3. Answer these questions as a group. For each "yes," everyone marks XP:
   - Did we learn more about the world or its history?
   - Did we defeat a threat to Stonetop or the region?
   - Did we improve our standing with our neighbors?
   - Did we make a lasting improvement to Stonetop, or tangible progress towards doing so?
4. Praise something about the session that you enjoyed or appreciated.
5. Offer up a wish for future sessions (more, less, a chance to, etc.).

---

## 4. Expedition & Travel Moves

### Inventory and Load Slots
- **Light Load (Up to 3 slots marked):** Move quick and quiet.
- **Normal Load (4–6 slots marked):** Typical weight.
- **Heavy Load (7–9 slots marked):** Noisy, slow, hot, and quick to tire.
- **Overloaded (10+ slots marked):** Risk of exhaustion, accident, or injury.

### Supplies & Provisions
- **Supplies:** Counted in slots. 1 slot contains **$4 + \text{Prosperity}$** uses.
  - Used for daily rations (1 use/day, or covers up to 4 people if using a *mess kit* with fire & water).
  - Used to *Recover*, *Make Camp*, or produce small items on the fly.
- **Provisions:** Foraged food. Can substitute for supplies 1-for-1 when making camp, but prone to spoiling or attracting predators.

---

### Expedition Moves

#### CHART A COURSE
When you wish to travel to a distant place, name or describe your destination. If the route is unclear, tell the GM how you intend to reach it. The GM tells you what's required, the risks, and how long it will take.
When you set out, the GM presents each challenge one at a time (plus surprises). Address them all to reach the destination.

#### OUTFIT
When you prepare for an expedition in a friendly community, mark as many slots on your Inventory insert as you wish to carry (up to 3 for light, 4-6 for normal, 7-9 for heavy). Mark small items equal to **$4 + \text{Prosperity}$**. Tell the GM what you are bringing and answer questions.

#### REQUISITION
When you borrow some of the steading's assets for an expedition (like horses or a plow), roll **+Fortunes**:
- **10+:** Go ahead, bring it back safely.
- **7-9:** You'll need to do some convincing.
- **6-:** Don't mark XP. You can take the asset, but reduce **Fortunes by 1**.

#### HAVE WHAT YOU NEED
When you decide that you had something all along, transfer a mark from your "undefined" inventory to a specific item. Or, expend **1 use of supplies** to mark an additional small item/slot.

#### RECOVER
When you take time to catch your breath and tend to what ails you, expend **1 use of supplies** and recover HP equal to **$4 + \text{Prosperity}$**. You cannot gain this benefit again until you take more damage.
When you tend to a debility or problematic wound, say how. The GM will either say it's resolved or tell you what is required (e.g. rest, specific herbs, field surgery, or rolls).

#### STRUGGLE AS ONE
When you Defy Danger as a group, establish the party's approach and each roll +Stat (per Defy Danger):
- **10+:** You pull your weight and do well enough to get someone else out of a spot, if you can tell us how.
- **7-9:** You pull your weight.
- **6-:** You find yourself in a spot (GM describes it). If someone saves you, do not mark XP.

#### KEEP COMPANY
When you spend a stretch of time together, ask the others if they want to Keep Company. If they do, take turns asking a PC or NPC one of the following:
- *What do you do that's annoying/endearing?*
- *What do I do that you find annoying/endearing?*
- *Who or what seems to be on your mind?*
- *What do we find ourselves talking about?*
- *How do you/we pass the time?*
- *What new thing do you reveal about yourself?*

#### MAKE CAMP
When you settle in to rest in an unsafe area, answer the GM's questions about your campsite. Each member must consume **1 use of supplies/provisions** (covers up to 4 if using a mess kit). If you eat and sleep, pick 1:
- Regain HP equal to **1/2 your max** (round up).
- Clear a debility.

*If rest was peaceful and comfortable, gain advantage on your next roll. If using a bedroll, recover +1d6 extra HP.*

#### FORAGE
When you spend a few hours seeking food in the wild, roll **+WIS** (disadvantage in winter):
- **10+:** Pick 2.
- **7-9:** Pick 1.
  - **Options:**
    - Acquire provisions (1d6 uses).
    - Acquire an extra 1d6 uses of provisions.
    - Discover something interesting or useful.
    - Avoid danger or risk (else, there is some).

#### RETURN TRIUMPHANT
When you return home in triumph (saving fellows, resolving threats, seizing opportunities), clear one steading debility (**diminished**, **lacking**, or **malcontent**). If the steading has no debilities, increase **Fortunes by 1**.

---

## 5. Homefront & Steading Moves

### Steading Sheet Stats
- **Prosperity (typically +0 to +3):** Wealth, resources, quality of tools and supplies.
- **Population (typically 0 to 5):** Number of able-bodied villagers.
- **Defenses (typically 0 to 5):** Fortifications, watchtowers, trained guards.
- **Surplus (typically 0 to 5):** Excess food and goods stored.
- **Fortunes (typically -1 to +2):** Morale, luck, and general well-being.

### Steading Debilities
- **Diminished:** Sickness, injuries, or low morale. (Disadvantage on *Deploy*, *Muster*, *Pull Together* rolls).
- **Lacking:** Shortages, hoarding, or distrust. (Treat Prosperity as 1 lower).
- **Malcontent:** Internal anger, fear, or despair. (Fortunes reset to +0 each season instead of +1; NPCs require Persuade more often).

---

### Homefront Moves

#### BOLSTER
When you prepare for what's coming or seek the favor of the gods, say how and answer the GM's questions. Hold Preparation based on time devoted:
- **A week:** 1 Preparation.
- **A month:** 2 Preparation.
- **A season:** 3 Preparation.

*Spend 1 Preparation to add +1 to any roll after it is made (max +1 per roll).*

#### CONVALESCE
*(Summarized in Section 2).*

#### DEPLOY
When you send a steading's people into danger or rally them against an attack, roll **+Defenses**:
- **10+:** It goes as well as can be expected.
- **7-9:** It works, but someone chooses 1 (PCs choose if acting from strength; GM chooses otherwise):
  - It is less effective than expected.
  - Injuries abound: the steading marks **diminished**.
  - A named NPC involved in the action dies.

#### MAKE A PLAN
When you wish to accomplish some project but aren't sure how, tell the GM what you hope to achieve. The GM outlines what is required. If stuck on a requirement, you can *Make a Plan* for that specifically.

#### MEET WITH DISASTER
When calamity befalls the steading or panic spreads, reduce **Fortunes by 1** (min -1).
If Fortunes would drop below -1, the GM picks 1 instead:
- Mark **diminished** (disadvantage to Deploy, Muster, Pull Together).
- Mark **lacking** (treat Prosperity as 1 lower).
- Mark **malcontent** (Fortunes reset to +0 each season, folks need Persuading more often).
- Reduce **Population by 1** (folks leave).

#### MUSTER
When you press every able body into defense, reduce **Fortunes by 1** and roll **+Population**:
- **7+:** The steading is alert and ready until the threat passes, seasons change, or you cease to oversee it.
- **10+:** Also pick 2; **7-9:** Also pick 1.
  - **Options:**
    - Everyone is willing to pitch in; do not reduce Fortunes after all.
    - The muster holds together without your presence.
    - 1 or 2 individuals show real potential (GM says who and how).

#### PULL TOGETHER
When you set the community to work on improvements, secure resources, or make repairs, spend the required time/material/Surplus and roll **+Population**:
- **10+:** The job gets done.
- **7-9:** The job gets done, but pick 1:
  - Other work suffers; reduce **Fortunes by 1**.
  - The work is shoddy and crude.
  - There is a consequence (bad blood, injury, threat unearthed).
  - There is an unforeseen cost/requirement/challenge; address it and the job is done.

#### TRADE & BARTER
When you acquire/sell a commonly available item, you can do so automatically.
When you seek to acquire/sell a special item, roll **+Prosperity - Value** (disadvantage in winter):
- **10+:** You buy or sell it for a fair price.
- **7-9 (Buying):** The GM picks 1:
  - It costs more than usual.
  - Someone has it, but they are reluctant to part with it.
  - You get something close, but not quite right.
- **7-9 (Selling):** You can sell it now, but you won't get its full worth.
- **6-:** Don't mark XP. You must travel elsewhere or wait until next season to try again.

#### SEASONS CHANGE
- **Spring:** Most hopeful rolls **+Fortunes**:
  - **10+:** Pick 1 seasonal gain.
  - **7-9:** Pick 1 gain, but a threat makes itself known or worsens.
  - **6-:** Threats abound (no XP).
  - *Result:* Reset Fortunes to +1.
- **Summer:** Most content rolls **+Fortunes**:
  - **10+:** Pick 2 seasonal gains.
  - **7-9:** Pick 1 gain.
  - **6-:** A threat makes itself known or worsens (no XP).
  - *Result:* Steading generates **1d4 - 1 Surplus**. Reset Fortunes to +1.
- **Autumn:** Most determined rolls **+Fortunes**:
  - **10+:** Pick 1 seasonal gain.
  - **7-9:** Pick 1 gain, but a threat makes itself known or worsens.
  - **6-:** Threats abound (no XP).
  - *Result:* Harvest completes; generate **1d4 Surplus**. Reset Fortunes to +1.
- **Winter:** Weariest rolls **1d4 + Population**:
  - The steading consumes that much Surplus. If insufficient, Surplus falls to 0 and the steading *Meets with Disaster*, then pick 1:
    - Reduce Population by 1 (death/departure).
    - An important resource is lost or not maintained.
    - An important NPC dies, role unfilled.
    - A PC dies, leaves, or retires.
  - Then, roll **+Fortunes**:
    - **10+:** Winter is mild; player-NPC relationships improve.
    - **7-9:** Steading must consume an additional **1d4 + Population Surplus** before winter ends, or suffer consequences as above.
    - **6-:** Same as 7-9, but threats also abound (no XP).
  - *Result:* Reset Fortunes to +1.

#### Seasonal Gains
- **Population boom:** Youth come of age or outsiders settle (+1 Population, max +3).
- **Tor's blessing:** Fine weather. +1 to *Pull Together* this season; roll twice for weather Die of Fate.
- **Unexpected bounty:** Sudden wild game or trade profits (+1 Surplus).
- **Trade opportunity:** Someone offers a unique/valuable item at a reasonable price.
- **Interesting news:** Opportunity to improve fortunes, knowledge, relations, or steading projects.
- **Valuable insight:** Learn details to address a major threat plaguing the steading.
