// StoneSys Campaigns & Archetypes Data Bundle
// Compiled dynamically from source files

const CAMPAIGNS_DATA = [
  {
    "id": "stonetop",
    "name": "Stonetop",
    "tagline": "Hearth Fantasy (Genesys)",
    "description": "A game of hearth fantasy. You play as the heroes of Stonetop, a small, isolated village at the edge of the wider world. Adventures are personal, centering on the survival and growth of your community, neighbors, and home.",
    "mechanics": "Features the Steading sheet, community ratings (Scale, Safety, Prosperity, Influence, Supply), and seasonal moves. Resolves with Genesys narrative dice, story points, and community advancement.",
    "archetypes": [
      {
        "name": "Blessed",
        "duty": "Danu, the Great Mother, provides. We need only learn her secrets: the names by which the trees call each other; the mark made with redberry juice to ward off impure spirits; the language of the wolves. A thousand such secrets Danu keeps, to share with only her true children. Her Blessed.",
        "hp": 20,
        "damage_die": "d6",
        "stats": {
          "STR": 3,
          "DEX": 2,
          "CON": 2,
          "INT": 1,
          "WIS": 4,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "INITIA TE",
            "description": "Stonetop has long been home to a sacred order, keepers of the old ways and speakers for Danu. You are one such initiate, the most gifted in generations. You gain the Rites of the Land move. There are other initiates in Stonetop, serving the goddess and the village. They aid you as followers— see the Initiates of Danu insert. Who are they? Choose 2 or 3: Enfys, your acolyte, beloved by birds Afon, strange and Fae-touched Gwendyl, your mentor, a talented healer Olwin, your anointed lover, seer of fates Seren the Eldest, wise and hard as winter"
          },
          {
            "name": "RAISED BY WOLVES",
            "description": "Maybe not by wolves, but you grew up in the wild. Beasts of land and air were your siblings. The sighing wind taught you language. The trees and rocks were your home. Were you one of the Forest Folk? Abandoned or orphaned? Lured into the Wood? Regardless, you get the Trackless Step move (go mark it now). Also, when you Forage, you add 1 blue Boost die. For some reason, you've made yourself known to Stonetop and perhaps you even call it home. But the ways of humans are still strange to you. Once per session, when your wild ways offend or alienate you from someone, mark XP ."
          },
          {
            "name": "VESSEL",
            "description": "A seed of Danu's power has taken root in your soul. Perhaps it has always been there and only recently sprouted. Or maybe it was planted in you during some portentous event. Regardless, your dreams have been haunted by strange markings and symbols. You feel the mystic power in plants, stones, and soil. And you've felt the growing wrath of the Earth Mother as foul things begin to move about. Take the Danu's Grasp move (go mark it now). Danu's power flows through you, but at great cost. When you would spend 1 Stock from your sacred pouch, you may choose to lose 2d4 HP instead."
          }
        ],
        "instincts": [
          "DELIGHT",
          "To find beauty, in even the ugliest things.",
          "DET ACHMENT",
          "To remain unmoved, to be cold as winter.",
          "NURTURE"
        ],
        "signature_moves": [
          {
            "name": "Spirit Tongue",
            "description": "You can speak with beasts and spirits. You can always ask the GM, \"What spirits are active here?\" and get an honest answer."
          },
          {
            "name": "Call the Spirits",
            "description": "When you spend 1 Stock and perform a short rite, the spirit(s) of a place or object manifest and hear you out. What they do next is up to them."
          }
        ],
        "choice_moves": [
          {
            "name": "Trackless Step",
            "description": "When you move through nature with care and patience, you make no sound, leave no trace and can ignore any hindering or treacherous terrain (briars, mire, scree, etc.). When you spend 1 Stock and mark others, they each gain this benefit so long as the mark remains. 1 Stock can mark a number of individuals up to your level +INT ."
          },
          {
            "name": "Veil",
            "description": "When you wrap yourself or another in a subtle veil, spend 1 Stock and choose 1: A type of being you name (including \"people\") will tend to ignore your presence People will perceive you as someone else, though you must wear something of an individual's in order to impersonate them When your deception comes under scrutiny, roll INT: on success with Advantage, the veil holds, and no one is the wiser; on success with Threat, the veil holds, but there is further scrutiny or a complication (GM's choice)."
          },
          {
            "name": "Wards & Bindings",
            "description": "When you mark a boundary with sacred signs, spend 1 Stock and describe who or what they affect (using no more words than your level). Also, choose whether the affected beings are repelled or trapped by the signs. When your wards or bindings are first tested, roll INT: on success with Advantage, they will hold as long as the signs remain unmarred (and the affected creature can do nothing to affect them directly); on success with Threat, they hold for now but may be overcome through might or will."
          },
          {
            "name": "Wild Soul",
            "description": "Each time you take this move, gain a Ranger move of your choice for which you qualify. You can't pick Improved Stat or Superior Stat."
          },
          {
            "name": "Borrow Power",
            "description": "When a spirit or beast loans you power, ask the GM for one of its tags or moves. Store it in your pouch in place of 1 Stock. When you use the borrowed tag or move, roll WIS: on success with Advantage, you do it and can use the power again; on success with Threat, you do it, but lose the power. 44"
          },
          {
            "name": "Into the Lion's Den",
            "description": "When you approach a beast calmly and show no fear, it will not harm you (though it may threaten you and test your nerve). When you lay your hand gently upon a beast, it calms to your touch."
          },
          {
            "name": "Lightning Rod",
            "description": "When you Defend while touching the earth, you can spend 1 Readiness to intercept a nearby magical attack and redirect it harmlessly into the ground."
          },
          {
            "name": "Rites of the Land",
            "description": "Once per season, when you oversee the sacred rites, hold 1 Favor. If you also sacrifice 1 Surplus, hold 4 Favor instead. Spend Favor in lieu of Stock, 1-for-1. When you publicly sacrifice something or someone much-loved, either clear a steading debility or add 1 blue Boost die when the steading next rolls Fortunes. 44"
          },
          {
            "name": "Improved Stat",
            "description": "Each time you take this move, increase one of your stats by 1 (to a max of +2)."
          },
          {
            "name": "Voice of the Earth Mother",
            "description": "When you speak on behalf of Danu, natural beasts and spirits of the wild respect your authority. All but the most headstrong will do as you command, even against their instincts. IMPROVED ST AT Each time you take this move, increase one of your stats by 1 (to a max of +2)."
          },
          {
            "name": "Nature's Wrath",
            "description": "Danu's Grasp gains the area tag and can affect any creature. A mortal reduced to 0 HP is subdued or killed (your choice) rather than bound in stone."
          },
          {
            "name": "Potent Workings",
            "description": "When you craft a protective charm, you may spend 1 additional Stock to choose 1: Name an additional type of harm On success with Advantage, the charm retains its potency"
          },
          {
            "name": "Shared Souls",
            "description": "When you mark a beast with 1 Stock, you can direct its actions and perceive through its senses no matter the distance between you. Treat it as a follower with 3 Loyalty; when you spend its last Loyalty, the effect ends."
          },
          {
            "name": "Suck the Poison Out",
            "description": "When you draw a malady from a patient's body, mind, or soul, spend 1 Stock and roll WIS: on success with Advantage, you remove the malady and can safely discard it or store it in your sacred pouch (taking the space of 1 Stock) to study or inflict on another; on success with Threat, you remove it, but choose 1: Your patient suffers lingering harm or trauma You suffer some of the malady's effects It will be harmful and dangerous to discard"
          },
          {
            "name": "Superior Stat",
            "description": "Increase one of your by +1 (to a max of +3)."
          }
        ],
        "gear": "is crude +0 +1 x =1 piercing +2 x =2 piercing Olwin, your anointed lover Fates-wise, beautiful, passionate, magical HP 6; Armor 1 (shield) HPHP Max. 6Max. 6 Damage iron spear d6 (close, thrown) Instinct to lack discretion ä Perform a divination ä Speak a (dire) prophecy ä Make a big deal about something Cost tenderness, respect; Loyalty Pick 1 on each line: he she they betrothed true love ceremonial complicated contary dramatic passionate tormented rites of... blood fire sacred union Seren the Eldest Exceptional, story-wise, insightful, frail, magical HP 3; Armor 0 HPHP Max. 3Max. 3 Damage walking stick d4 (close) Instinct to hew to tradition ä Consult the spirits, or abjure them ä Spin a tale to make a point ä Use shame and guilt as leverage Cost deference, good sense shown; Loyalty Pick 1 on each line: he she they dismissed pitied feared venerated cagey friendly but firm imperious rites of... iron secret naming winter Initiates of Danu Blessed, if you took the Initiate background, then you chose 2 or 3 of the following as your fellow initiates. Mark those you picked and treat them as followers. Cross off the others. Enfys, the acolyte Bird-wise, innocent, magical, well-informed HP 6; Armor 0 HPHP Max. 6Max. 6 Damage bronze knife d4 (hand) Instinct to get distracted ä Speak with birds ä Ask a difficult question ä Wander off Cost knowledge, secret lore; Loyalty Pick 1 on each line: he she they just a child on the cusp a young adult carefully chosen marked by Danu orphaned carefree curious moody secretive Afon, a fellow initiate Fae-wise, devious, magical, self-sufficient, stealthy HP 8; Armor 2 (0 vs. iron) Damage bronze hatchet d6 (hand) Instinct to act impulsively ä Weave a minor glamor ä Appear or disappear unexpectedly ä Speak an uncomfortable truth Cost wonder, joy; Loyalty Pick 1 on each line: he she they comes and goes in the Wood a hut near town aloof bawdy and lewd unnerving rites of... ecstasy intoxication moonlight Gwendyl, your mentor Herb-wise, gossipy, tireless, healer, magical HP 6; Armor 0 HPHP Max. 6Max. 6 Damage iron knife d6 (hand) Instinct to take offense ä Tend to the sick, injured, women in labor ä Weave a talisman of fertility or good luck ä Point out a flaw in a person or plan Cost consideration, affection; Loyalty Pick 1 on each line: he she they a big family has taken you in lives alone blunt demanding put upon suffers no fools rites of... earth & soil mourning petition ORDER FOLLOWERS When you direct them to make a move and they do so, build a follower pool from tags: 1 green Ability die if a useful tag applies, upgrade it once if the follower is exceptional, and add 1 black Setback die if a tag gets in the way. When they are without orders or they act on their own initiative, the GM says what they do and how it goes. STRENGTHEN YOUR BOND When you pay their cost and you haven't done so recently, they hold 1 Loyalty (max 3). Spend their Loyalty 1-for-1 to have them: Overcome their fear to do as you say Resist acting on their instinct/tags/traits Do something they don't want to do (as long as it's not abhorrent or suicidal)"
      },
      {
        "name": "Fox",
        "duty": "The elders tell a story about Fox, who knows lots of tricks, and Hedgehog, who knows one: how to curl up into a ball when there's danger. Fox can't eat Hedgehog when he's all curled up, so in the story Fox goes hungry. But you're not that Fox, and this is no story. You want that Hedgehog? Go get a knife.",
        "hp": 20,
        "damage_die": "d6",
        "stats": {
          "STR": 1,
          "DEX": 4,
          "CON": 2,
          "INT": 3,
          "WIS": 2,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "THE NATURAL",
            "description": "You grew up around here, and always picked things up quickly. Reading and numbers, sure, but more. Hide and seek. Throwing stones. Climbing. Fighting. Whatever you tried, you were good at it. As good as anyone else, if not better. Sure, you've got a reputation for bending the rules. Playing dirty. But why play if you don't play to win, right? And who do they come to when there's a problem needs solving? You, that's who. When you Seek Insight, you may use INT as the stat instead of WIS and add \"What opportunity does no one else see?\" to the list of possible questions."
          },
          {
            "name": "A LIFE OF CRIME",
            "description": "You're new to Stonetop, having left behind a... colorful past. How did you get into that life? Why and how did you get out? Who and what did you leave behind? Regardless, these people have taken you in. Time to lead an honest life, right? You start with either Burgle or Light Fingers (your choice) as an extra move, and either burglar tools or a hidden stash (your choice) as an additional special possession. Go mark them now."
          },
          {
            "name": "THE PRODIGAL RETURNED",
            "description": "You left long ago, travelling far and living by your wits. Why did you leave? What deeds do you boast of, and which do you regret? You always longed to return to Stonetop, and return you have. You're a bit of a celebrity now, and you've got friends (or close enough) strewn about the known world. When you declare that you know someone outside of Stonetop, someone who can help, name them and roll CHA: on success with Advantage, yeah, they can help (tell us why they're willing); on success with Threat, they can help but pick 1 from the list below; on failure, the GM chooses 1 and then some. They still hold a grudge They're going to need something from you first They swore off this sort of thing long ago You can't exactly, y'know, trust them"
          }
        ],
        "instincts": [
          "CONSCIENCE",
          "To feel guilty, to try to do right.",
          "FREEDOM",
          "To chafe against rules, expectations, obligations.",
          "COMFORT"
        ],
        "signature_moves": [],
        "choice_moves": [
          {
            "name": "Ambush",
            "description": "When you get the drop on a nearby foe, you can deal your damage, or you can roll DEX. On success with Advantage, deal damage and pick 2; on success with Threat, deal damage and pick 1: Deal +1d4 damage; Stop them from making noise/raising an alarm; Slip away before they can react; Create an opportunity (you or an ally adds 1 blue Boost die to the next roll to act on it)."
          },
          {
            "name": "Skill at Arms",
            "description": "When you wield a weapon with speed and grace, roll DEX to Clash (instead of STR)."
          },
          {
            "name": "Danger Sense",
            "description": "You can always ask the GM, \"Is there an ambush or trap here?\" If they say \"yes,\" roll INT: on success with Advantage, ask the GM both of the questions below; on success with Threat, ask 1; either way, add 1 blue Boost die to your next roll to act on the answer(s). What will trigger the ambush or trap? What will happen once it's triggered? On failure, don't mark XP; you know there's a trap or ambush, but nothing bad happens just yet."
          },
          {
            "name": "Perceptive",
            "description": "When you Seek Insight, you may ask 1 additional question. Even on failure, you can ask 1 question (though you might not like how you learn the answer)."
          },
          {
            "name": "Rapier Wit",
            "description": "When you pierce an NPC's pride with a well-placed quip, they must do 1 (their choice): Attack, doing +1d4 damage if they hit but adding 1 blue Boost die to your next roll against them Stoop to your level and respond in kind Spend a few moments fuming, sputtering, or controlling their temper"
          },
          {
            "name": "Parry & Riposte",
            "description": "When you Defend with a weapon that you can wield quickly, you can spend 1 Readiness to both halve an attack's effects/damage and strike back at the attacker (deal your damage with 1 black Setback die), instead of spending 1 Readiness for each."
          },
          {
            "name": "Silver Tongued",
            "description": "When you use words to avoid suspicion or trouble, roll CHA: on success with Advantage, hold 3 Nerve; on success with Threat, hold 1 Nerve. You may spend Nerve, 1-for-1, to: Move about or maneuver unchallenged Withstand direct scrutiny or questioning Direct suspicion or attention elsewhere"
          },
          {
            "name": "Under Your Skin",
            "description": "When you engage an NPC in conversation, you can ask the GM 1 of these and get an honest answer: What are they expecting me to do? What, in general, are they trying to hide? What do they want to happen?"
          },
          {
            "name": "Free Running",
            "description": "When you carry a light load and move with speed and grace, add 1 blue Boost die to any move to surmount or bypass a physical obstacle. IMPROVED ST AT Each time you take this move, increase one of your stats by 1 (to a max of +2)."
          },
          {
            "name": "Irresistible",
            "description": "When you interact with someone, you can ask their player if they find you attractive and get an honest answer (usually \"yes\"). When you Persuade by using your considerable charms as leverage, you add 1 blue Boost die."
          },
          {
            "name": "Laugh at Danger",
            "description": "When you are about to roll CON and you make a joke about the adversity you face, you can use CHA as the stat instead."
          },
          {
            "name": "Light Fingers",
            "description": "When you perform sleight of hand on an unwary mark, you succeed and no one's the wiser. If you're being watched, roll DEX: on success with Advantage, you succeed and no one's the wiser; on success with Threat, you succeed OR no one's the wiser (your choice)."
          },
          {
            "name": "Improved Stat",
            "description": "Each time you take this move, increase one of your stats by 1 (to a max of +2)."
          },
          {
            "name": "Battle Dancer",
            "description": "When you roll DEX to Clash, on a Triumph you deal your damage, avoid your enemy's attack, and impress/embarrass/overawe your foes."
          },
          {
            "name": "Cheap Shot",
            "description": "When you Ambush with a hand weapon, you add 1 blue Boost die to your damage roll."
          },
          {
            "name": "Eye on the Door",
            "description": "When you and your allies need to get out of here, name your escape route and roll INT: on success with Advantage, you're gone; on success with Threat, you can stay or go, but if you go, it costs you—the GM will tell you what (or who) you leave behind or take with you."
          },
          {
            "name": "Pants on Fire",
            "description": "When you Defy Danger, Persuade, or Interfere by being deceitful, you add 1 blue Boost die. When another move (like Seek Insight) allows a player to ask you a question, you can opt not to answer."
          },
          {
            "name": "Second Intent",
            "description": "When you Defend and spend 1 Readiness to Parry & Riposte, also pick 1 option from the Ambush list."
          },
          {
            "name": "Slippery",
            "description": "When you roll to escape being caught or controlled, treat failure as success with Threat. On a Triumph, say how you turn the tables or use the circumstances to your 1 blue Boost die."
          },
          {
            "name": "Superior Stat",
            "description": "Increase one of your by +1 (to a max of +3)."
          }
        ],
        "gear": "is crude +0 +1 x =1 piercing +2 x =2 piercing Tall tales Someone like you gets into all sorts of trouble, whether you mean to or not. Mix and match the following to come up with a couple of your more memorable adventures, and write them down in the space at the bottom of this column. There was that time that you… (choose 1 per tale) … got lost in (choose 1) the Great Wood the Flats the Steplands Ferrier's Fen the Foothills the Huffel Peaks … were on watch when the crinwin raided … dared each other to explore the Ruined Tower … managed to rile up a small band of Hillfolk … braved the Labyrinth, just a little … stole that crazy old man's book … went poking about the old Barrow Mounds And you ended up… (choose 1 or 2 per tale) … running for your life from … landing a well-placed blow … interrupting a strange, creepy gathering … stumbling on a beast, bigger'n anything … with a sack full of treasure … getting to fight them for you … face to face with a ghost/Fae/demon … finding those strange old runes … getting to know that fine-looking fellow/ lady/person/couple But all you've got left to show for it is… … a story no one believes. … a nasty scar; wanna see? … the occasional nightmare. … this map with runes no one can read. … this key that opens who-knows-what. Introductions Wait here for everyone else. When everyone's ready, take turns introducing your characters. When someone reveals something and you want to know more, ask them about it. When someone asks you a question, answer it truthfully. 11 On your first turn, introduce yourself by name, pronouns, background, origin, and appearance. 22 On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields). 33 On your third turn, tell us your tall tales. Feel free to embellish and exaggerate to the other players, but always answer the GM truthfully. 44 On your next turn, answer one of the following, naming one or more NPCs who live in Stonetop. Who is your closest kin? Who holds the reins to your heart? Whose respect means the world to you? To whom do you owe a debt that cannot be repaid? 55 Go around again. Answer another question from 4, or pass. When everyone has passed, go on. 66 On your next turn, ask your fellow PCs one of these. When others ask you, answer as you like. Which one of you joined me in my latest hijinx? Which one of you brings your problems to me? Which one of you saved my bacon, mor'n once? Which one of you trusts me not one bit? 77 Go around again. Ask another question from 6, or pass. When everyone has passed, go on. 88 Add your home to the steading playbook. When everyone is done, let spring break forth! Player's Agenda Portray a compelling character Engage with the fictional world Play to find out what happens Player's Principles Begin and end with the fiction Connect with the other PCs Show us what's important to you Have goals and pursue them Be bold, take risks Embrace difficulty, setback, and failure Participate in worldbuilding Build on what others have said Give others a chance to shine Participate in the conversation When in doubt... Visualize the situation Ask the GM for clarification What do you want? What's your goal? Consider your strengths and weaknesses Look to others for ideas Go with the obvious choice, the interesting choice, the meaningful choice... not always the \"right\" choice (remember, you get XP on a failure!) Triggering moves If you want to do it, then do it in the fiction. Tell us how you do it, what it looks like. Be specific. But remember: if you do it in the fiction, then you have to do it. \"I rush past the hagr to grab the glowing sword\" and the GM says that's Defy Danger with DEX. It's okay to say, \"Oh, really? I guess I don't do that.\" But if you want to rush past the hagr, make with the dice. Hold and spend When a move says, \"hold X Currency (until/ while/so long as __),\" then note the Currency you hold and spend it as described by the move. Spending held Currency usually means you just do it, no roll required. Sometimes, though, spending held Currency will allow you to trigger a move (and thus roll) when otherwise you just couldn't have done it. Followers Name Tags HPHP exceptional group Max. HP Armor Damage Instinct Moves ä ä ä Cost Loyalty Gear Notes Name Tags HPHP exceptional group Max. HP Armor Damage Instinct Moves ä ä ä Cost Loyalty Gear Notes"
      },
      {
        "name": "Heavy",
        "duty": "To protect your home and survive the wild.",
        "hp": 24,
        "damage_die": "d10",
        "stats": {
          "STR": 4,
          "DEX": 2,
          "CON": 3,
          "INT": 1,
          "WIS": 2,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "SHERIFF",
            "description": "You keep order in Stonetop and protect it from outside threats. It might not be anything official, but everyone knows you've got a cool head and the weight to back up your words. When you bark an order or warning, roll CHA: on any success, they must choose 1: Do what you say Dig in/take cover/flee Attack you On success with Advantage, you can sense which one they're about to do and act first if you like; add 1 blue Boost die if you do."
          },
          {
            "name": "BLOOD-SOAKED PAST",
            "description": "You left behind a life of violence and a name mothers used to scare their children. For whatever reason, the people of Stonetop took you (back?) in and treat you like one of their own. When you Persuade using violence or threats against someone who knows your black reputation, you can use STR as the stat instead of CHA. Also, if you take the Formidable move, you can choose to use CON as the stat instead of CHA. When you fight to kill without mercy or hesitation, you deal +1d4 damage."
          },
          {
            "name": "STORM-MARKED",
            "description": "You've been touched by Tor (Rain-maker, Thunderhead, Slayer-of-Beasts!) and bear runic markings similar to those etched into the Stone. When did the marks manifest? Are they a symbol of your strength, speed, and courage? Or their source? You start with the Storm Markings major arcanum. Mark one of the boxes on the front of the Storm Markings sheet, and describe here the time you were struck by lightning and walked away unharmed:"
          }
        ],
        "instincts": [
          "PEACE",
          "To avoid (further) bloodshed or violence.",
          "PRIDE",
          "To maintain your dignity, to demand respect.",
          "RECKLESSNESS"
        ],
        "signature_moves": [
          {
            "name": "Dangerous",
            "description": "When you deal damage, you add 1 blue Boost die to your next roll against that target."
          },
          {
            "name": "Hard to Kill",
            "description": "When you are at Death's Door, you can use CON as the stat or +nothing (your choice). On success with Threat, you can mark a debility of your choice to regain 1"
          }
        ],
        "choice_moves": [
          {
            "name": "Armored",
            "description": "When you carry a shield, mark only 44 (instead of 44 44). Also, you can ignore the cumbersome tag on any armor you wear. If you take this move at the start of play, add an iron hauberk, bronze cuirass, or scale coat to your inventory (all are 2 armor, warm, cumbersome)."
          },
          {
            "name": "Uncanny Reflexes",
            "description": "When you are unarmored and carrying a normal or light load, incoming damage rolls that you could dodge or roll with add 1 black Setback die."
          },
          {
            "name": "Payback",
            "description": "When you deal damage to a foe that has harmed you or one of your allies, deal +1d4 damage."
          },
          {
            "name": "Relentless",
            "description": "When you Clash and your foe survives, you add 1 blue Boost die the next time you Clash with them."
          },
          {
            "name": "Seasoned Warrior",
            "description": "Take a move from the Fox, Marshal, Ranger, or Seeker playbooks, for which you otherwise qualify. You can pick from a different playbook each time. (You can't pick Improved Stat or Superior Stat.)"
          },
          {
            "name": "Situational Awareness",
            "description": "When you Seek Insight, add the following to the list of questions you can ask: Who or what here is the biggest threat? What is my enemy's true position? What here can I use as a weapon? When a fight breaks out, ask the GM 1 question that you could ask when Seeking Insight."
          },
          {
            "name": "Unfettered",
            "description": "When you are subject to physical or mental restraint, you may mark a debility to immediately break free of that restraint."
          },
          {
            "name": "Terror on the Field",
            "description": "When you reduce a foe to 0 HP, describe how you take them out. If you fell them in a particularly brutal or impressive manner, their allies are impressed, dismayed, or frightened and respond accordingly."
          },
          {
            "name": "Frosty",
            "description": "When you Defy Danger by keeping calm and carrying on, on success with Advantage you can also ask the GM a question that you could ask when Seeking Insight. You add 1 blue Boost die to your next move to act on the answer."
          },
          {
            "name": "Guardian",
            "description": "When you Defend, hold 1 extra Readiness. Even on failure, hold 1 Readiness (plus whatever the GM says)."
          },
          {
            "name": "Improved Stat",
            "description": "Each time you take this move, increase one of your stats by 1 (to a max of +2)."
          },
          {
            "name": "Intimidating",
            "description": "When you Persuade using violence or threats, you add 1 blue Boost die. 44"
          },
          {
            "name": "Bringer of Ruin",
            "description": "When you roll a Triumph to Clash and your foe survives, name something they possess (like their sword, their position, a limb, their dignity, etc.), but nothing that would kill them outright. Whatever you name, it is broken, shattered, lost. Tell us how."
          },
          {
            "name": "Cut from Granite",
            "description": "Gain +1 armor (stacks with other sources) and increase your max HP by another 2 (+6 HP total)."
          },
          {
            "name": "Mighty Thews",
            "description": "When you perform a feat of extraordinary strength (bursting chains, smashing through a wall, heaving a boulder, etc.), you do it (OH YEAH!) but pick 1: It takes a while You cause unwanted damage or harm It takes a toll (mark a debility)"
          },
          {
            "name": "Nemesis",
            "description": "When you Clash and your foe survives, all of your future attacks against them do +1d6 damage."
          },
          {
            "name": "Steadfast Guardian",
            "description": "While you hold Readiness (from Defend), you can always suffer the damage/effects of an attack instead of your ward; no need to spend Readiness, you can just do it."
          },
          {
            "name": "Stone Cold",
            "description": "When you Defy Danger (or Struggle as One) by keeping calm and carrying on, treat failure as success with Threat."
          },
          {
            "name": "Superior Stat",
            "description": "Increase one of your by +1 (to a max of +3)."
          }
        ],
        "gear": "is crude +0 +1 x =1 piercing +2 x =2 piercing A history of violence Just about everyone here talks about the time you… (pick 1 or 2) … drove off a thunder drake that got too close to town. … killed that hagr in the Foothills. … slew a dozen crinwin in one battle. … tossed those adventurers out of town. … bested Ivan, the scariest bandit in Brennan's gang, the Claws. … dragged yourself (and another?) into town, bleeding from a dozen wounds. … were struck by lightning and woke up covered in these marks. But folks are less keen to discuss… (pick 1 or 2) … the look in your eye when you spilled all that blood. … those hard cases who showed up looking for you. … the shouting matches between you and your love. … the time you spent as one of Brennan's Claws. … what happened to Urbgen, even if he did have it coming. … your uncontrollable seizures, where you claw those weird marks in the dirt. What keeps you up at night? (pick 1 or 2) That thrice-damned temper of yours. The worry that someone's coming after you. The feeling that the crinwin are getting bolder. Wondering what Brennan's up to, now that he's the marshal of Marshedge. Dark visions of things moving in the earth, restless, whispering, and hungry. The question of who'll look after your family when you get yourself killed. The worry that they'll all learn the truth about you, sooner or later. Introductions Wait here for everyone else. When everyone's ready, take turns introducing your characters. When someone reveals something and you want to know more, ask them about it. When someone asks you a question, answer it truthfully. 11 On your first turn, introduce yourself by name, pronouns, background, origin, and appearance. 22 On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields). 33 On your third turn, tell us about your history of violence, and what keeps you up at night. 44 On your next turn, answer one of the following, naming one or more NPCs who live in Stonetop. Who is your closest kin? Who is your lover/spouse/betrothed? Who most needs/deserves your protection? Whose forgiveness do you strive to earn? 55 Go around again. Answer another question from 4, or pass. When everyone has passed, go on. 66 On your next turn, ask your fellow PCs one of these. When others ask you, answer as you like. Which one of you once dragged me home, bleeding and unconscious? Which one of you can I trust to always have my back? Which one of you has stayed my hand? Which one of you has traded blows with me? 77 Go around again. Ask another question from 6, or pass. When everyone has passed, go on. 88 Add your home to the steading playbook. When everyone is done, let spring break forth! Player's Agenda Portray a compelling character Engage with the fictional world Play to find out what happens Player's Principles Begin and end with the fiction Connect with the other PCs Show us what's important to you Have goals and pursue them Be bold, take risks Embrace difficulty, setback, and failure Participate in worldbuilding Build on what others have said Give others a chance to shine Participate in the conversation When in doubt... Visualize the situation Ask the GM for clarification What do you want? What's your goal? Consider your strengths and weaknesses Look to others for ideas Go with the obvious choice, the interesting choice, the meaningful choice... not always the \"right\" choice (remember, you get XP on a failure!) Triggering moves If you want to do it, then do it in the fiction. Tell us how you do it, what it looks like. Be specific. But remember: if you do it in the fiction, then you have to do it. \"I rush past the hagr to grab the glowing sword\" and the GM says that's Defy Danger with DEX. It's okay to say, \"Oh, really? I guess I don't do that.\" But if you want to rush past the hagr, make with the dice. Hold and spend When a move says, \"hold X Currency (until/ while/so long as __),\" then note the Currency you hold and spend it as described by the move. Spending held Currency usually means you just do it, no roll required. Sometimes, though, spending held Currency will allow you to trigger a move (and thus roll) when otherwise you just couldn't have done it. Followers Name Tags HPHP exceptional group Max. HP Armor Damage Instinct Moves ä ä ä Cost Loyalty Gear Notes Name Tags HPHP exceptional group Max. HP Armor Damage Instinct Moves ä ä ä Cost Loyalty Gear Notes"
      },
      {
        "name": "Judge",
        "duty": "Look here at this little town, this candleflame in the darkness. Its very existence is an act of courage and faith. And Aratis has charged you to keep it: to settle its disputes; to chronicle its tales; to defend it from darkness and ruin. Take up your hammer, Judge. Your town needs you.",
        "hp": 20,
        "damage_die": "d6",
        "stats": {
          "STR": 2,
          "DEX": 1,
          "CON": 2,
          "INT": 3,
          "WIS": 4,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "LEGACY",
            "description": "You are the latest in a long line of Judges—born here, apprenticed to the prior Judge, and charged with the passing of the mantle. The Chronicle is a rich repository of lore, but there's no index, so good luck finding anything. When you Know Things about the people or history of Stonetop, you add 1 blue Boost die. When you spend days, weeks, or months poring over the Chronicle, ask the GM a question, and the GM will tell you what you learn in that time."
          },
          {
            "name": "MISSIONARY",
            "description": "You are part of a larger order of Judges, sent here to protect the flickering flame of civilization. The Chronicle is relatively new; your position in town is far from certain. Add these Judges to the Neighbors section of the steading playbook (pick 2 more): 44 Devin (from Marshedge) 44 Haeris (from Gordin's Delve) Isalde (from the Manmarch) Rahat (from Lygos) Tejisha (from Barrier Pass) Unz (from the Hillfolk) When you call upon the Judge of another steading for aid or information, they are oathbound to give it. You are likewise oathbound to support them. You have an aviary in addition to your usual choice of special possessions (go mark it now). When you send a message via trained bird, as is the way of the Judges of your order, the GM will tell you if and when you receive a response, and what it says."
          },
          {
            "name": "PROPHET",
            "description": "The line of Judges was broken long ago, the Chronicle lost or fallen into ruin. Aratis has called you personally to her service though dreams, omens, and visions. Some in town resent the authority you've assumed. When you spend a few days communing with Aratis about a threat facing Stonetop or civilization as a whole, roll WIS: on any success, Aratis reveals the course of action she would have you take; on success with Advantage, you also hold 2 Sanction. While acting on her orders, spend 1 Sanction to add 1 blue Boost die to a roll you just made."
          }
        ],
        "instincts": [
          "AMBITION",
          "To increase your status or influence.",
          "DISPASSION",
          "To disregard emotion or sentiment.",
          "HARMONY"
        ],
        "signature_moves": [
          {
            "name": "Censure",
            "description": "When you first denounce an individual in your presence as an agent of chaos or anathema to civilization, they pick 1: They are ashamed, and act accordingly They are doubtful, and hesitate, pause They are afraid, and seek to escape They are enraged, and lash out predictably (the next roll against them adds 1 blue Boost die)"
          },
          {
            "name": "Chronicler of Stonetop",
            "description": "When you write up detailed session notes and share them with the other players, hold 1 Diligence. You can spend 1 Diligence at any time to add 1 blue Boost die to a roll that you or a fellow player just made."
          }
        ],
        "choice_moves": [
          {
            "name": "The Hammer and the Book",
            "description": "When you strike a thing of supernatural chaos, roll WIS: on success with Advantage, deal your damage and choose 1 from the list below; on success with Threat, deal damage and choose 1, but you also expose yourself to harm or unwanted attention. Deal +1d6 damage Ignore the thing's armor or other defenses Suppress one of its unnatural powers Force it from its host"
          },
          {
            "name": "Truth or Consequences",
            "description": "When you look into someone's eyes and gaze upon their soul, you can ask their player, \"Are you lying or hiding something from me?\" and get an honest answer. If the answer is \"Yes,\" you add 1 blue Boost die to your next roll against them. When you lie or otherwise deceive someone through words, you add 1 black Setback die to your next roll against them."
          },
          {
            "name": "Binding Arbitration",
            "description": "When you bear witness to someone's promise or oath, henceforth you may ask their player if they have kept their word. They must answer honestly. The character need not be present. If they have broken their word, you add 1 blue Boost die to all rolls against them until they admit their wrong and suffer an appropriate consequence (your call)."
          },
          {
            "name": "Vision Unclouded",
            "description": "When you Seek Insight, you can always ask \"What here is hidden by illusion or magic?\" for free, even on failure."
          },
          {
            "name": "Well-Read",
            "description": "When you name the source in which you read about the matter at hand, roll WIS to Know Things instead of INT ."
          },
          {
            "name": "Aegis of Faith",
            "description": "When you wield a shield, it can turn away spells, magical effects, and insubstantial attacks as if they were physical blows."
          },
          {
            "name": "Armored",
            "description": "When you carry a shield, mark only 44 (instead of 44 44). Also, you can ignore the cumbersome tag on any armor you wear. If you take this move at the start of play, add an iron hauberk, bronze cuirass, or scale coat to your inventory (all are 2 armor, warm, cumbersome)."
          },
          {
            "name": "Bear Witness",
            "description": "When you speak the truth with conviction and candor, none can doubt you. They might deny what you say, but in their hearts they recognize the truth."
          },
          {
            "name": "Break Bread",
            "description": "When you share a proper meal with someone and each of you eats their fill, each of you recovers 1d8 (extra) HP ."
          },
          {
            "name": "Bulwark",
            "description": "When you Defend, you can spend 1 Readiness to stand fast, holding your position despite what befalls you. 44"
          },
          {
            "name": "Castigate",
            "description": "When you Censure someone, your voice deals 1d4 damage to them (near, loud, ignores armor)."
          },
          {
            "name": "For the Greater Good",
            "description": "When you Persuade someone to act in defense of their community or civilization at large, you add 1 blue Boost die."
          },
          {
            "name": "Hound of Aratis",
            "description": "When you Seek Insight, you can always ask \"What here is tainted by chaos?\" for free, even on failure."
          },
          {
            "name": "Like a Dog with a Bone",
            "description": "When you attack something you know to be tainted by chaos, deal +1d6 damage. IMPROVED ST AT Each time you take this move, increase one of your stats by 1 (to a max of +2)."
          },
          {
            "name": "Improved Stat",
            "description": "Each time you take this move, increase one of your stats by 1 (to a max of +2)."
          },
          {
            "name": "Knowledge is Power",
            "description": "When you succeed with Advantage on Know Things, you or an ally add 1 blue Boost die to the next roll to act on what you learn."
          },
          {
            "name": "Many Hands Make Light Work",
            "description": "When you jump in to help another character who just rolled, tell us how and ask the GM what else is required or what the consequences will be. If you accept, add 1 blue Boost die to your ally's roll."
          },
          {
            "name": "A Bundle of Sticks Unbroken",
            "description": "When you Struggle as One, you and one ally of your choice add 1 blue Boost die."
          },
          {
            "name": "A Mighty Rampart",
            "description": "When you hold Readiness (from Defend), you cannot be forced from your position. Also, you can spend 1 Readiness to completely ignore the effects/ damage of an attack that you suffer."
          },
          {
            "name": "Armistice",
            "description": "When you approach an enemy to negotiate in good faith, they will at least hear you out. Even the most debased and savage foe will delay violence until you've had your say."
          },
          {
            "name": "Condemn",
            "description": "When you Censure someone, they are marked with a mystical brand that cannot be removed or hidden until you dismiss it. Any intelligent creature who sees the mark recognizes the bearer as an agent of chaos and anathema to civilization."
          },
          {
            "name": "Proclamation",
            "description": "When you Censure, you may denounce a group or faction as long as you can clearly identify them. Apply the effects of Censure to every member of that group, regardless of distance."
          },
          {
            "name": "Mirrorshield",
            "description": "When you Defend with a shield, you can spend 1 Readiness to intercept a magical force and redirect it to a different target (or none)."
          },
          {
            "name": "The Tower Eternal",
            "description": "When you Defy Danger against magic, treat failure as success with Threat. 44"
          },
          {
            "name": "Superior Stat",
            "description": "Increase one of your stats by +1 (to a max of +3)."
          }
        ],
        "gear": "robes of office modest clothes Place of origin and name Stonetop is your home, or close enough, but where are you (or your family) from originally? Pick 1 and a name to match (or make up something similar). Stonetop: Arianrhod, Caerwyn, Einion, Eleri, Magda, Nerys, Trahaern, or Trefor Barrier Pass: Arinasai, Bortachikhan, Khadagan, Khojin, Odval, Usun, Yesui, or Yul Gordin's Delve: Pick a name from any list Marshedge: Briget, Comhall, Elnor, Liadain, Mirdach, Onghus, Somha, or Toal Lygos or some other southern town: Abrim, Cassander, Despina, Hypatta, Morecai, Nomika, Sofia, or Yose I am called... AEGIS OF FAITH When you wield a shield, it can turn away spells, magical effects, and insubstantial attacks as if they were physical blows. ARMORED When you carry a shield, mark only 44 (instead of 44 44). Also, you can ignore the cumbersome tag on any armor you wear. If you take this move at the start of play, add an iron hauberk, bronze cuirass, or scale coat to your inventory (all are 2 armor, warm, cumbersome). BEAR WITNESS When you speak the truth with conviction and candor, none can doubt you. They might deny what you say, but in their hearts they recognize the truth. BREAK BREAD When you share a proper meal with someone and each of you eats their fill, each of you recovers 1d8 (extra) HP . B ULWARK When you Defend, you can spend 1 Readiness to stand fast, holding your position despite what befalls you. 44 CENSURE When you first denounce an individual in your presence as an agent of chaos or anathema to civilization, they pick 1: They are ashamed, and act accordingly They are doubtful, and hesitate, pause They are afraid, and seek to escape They are enraged, and lash out predictably (the next roll against them adds 1 blue Boost die) CASTIGATE (Requires level 2+, Censure) When you Censure someone, your voice deals 1d4 damage to them (near, loud, ignores armor). Moves You start with Censure, Chronicler of Stonetop, plus 2 more of your choice. THE HAMMER AND THE BOOK When you strike a thing of supernatural chaos, roll WIS: on success with Advantage, deal your damage and choose 1 from the list below; on success with Threat, deal damage and choose 1, but you also expose yourself to harm or unwanted attention. Deal +1d6 damage Ignore the thing's armor or other defenses Suppress one of its unnatural powers Force it from its host TRUTH OR CONSEQUENCES When you look into someone's eyes and gaze upon their soul, you can ask their player, \"Are you lying or hiding something from me?\" and get an honest answer. If the answer is \"Yes,\" you add 1 blue Boost die to your next roll against them. When you lie or otherwise deceive someone through words, you add 1 black Setback die to your next roll against them. BINDING ARBITRATION (Requires Truth or Consequences) When you bear witness to someone's promise or oath, henceforth you may ask their player if they have kept their word. They must answer honestly. The character need not be present. If they have broken their word, you add 1 blue Boost die to all rolls against them until they admit their wrong and suffer an appropriate consequence (your call). VISION UNCLOUDED When you Seek Insight, you can always ask \"What here is hidden by illusion or magic?\" for free, even on failure. WELL-READ When you name the source in which you read about the matter at hand, roll WIS to Know Things instead of INT . A MIGHTY RAMPART (Requires level 6+; replaces Bulwark) When you hold Readiness (from Defend), you cannot be forced from your position. Also, you can spend 1 Readiness to completely ignore the effects/ damage of an attack that you suffer. ARMISTICE (Requires level 6+ and Bear Witness) When you approach an enemy to negotiate in good faith, they will at least hear you out. Even the most debased and savage foe will delay violence until you've had your say. CONDEMN (Requires level 6+ and Censure) When you Censure someone, they are marked with a mystical brand that cannot be removed or hidden until you dismiss it. Any intelligent creature who sees the mark recognizes the bearer as an agent of chaos and anathema to civilization. PROCLAMATION (Requires level 6+ and Condemn) When you Censure, you may denounce a group or faction as long as you can clearly identify them. Apply the effects of Censure to every member of that group, regardless of distance. MIRRORSHIELD (Requires level 6+ and Aegis of Faith) When you Defend with a shield, you can spend 1 Readiness to intercept a magical force and redirect it to a different target (or none). SUPERIOR ST AT (Requires level 6+) Increase one of your stats by +1 (to a max of +3). THE TOWER ETERNAL (Requires level 6+) When you Defy Danger against magic, treat failure as success with Threat. 44 CHRONICLER OF STONETOP When you write up detailed session notes and share them with the other players, hold 1 Diligence. You can spend 1 Diligence at any time to add 1 blue Boost die to a roll that you or a fellow player just made. FOR THE GREATER GOOD When you Persuade someone to act in defense of their community or civilization at large, you add 1 blue Boost die. HOUND OF ARATIS When you Seek Insight, you can always ask \"What here is tainted by chaos?\" for free, even on failure. LIKE A DOG WITH A BONE (Requires Hound of Aratis) When you attack something you know to be tainted by chaos, deal +1d6 damage. IMPROVED ST AT Each time you take this move, increase one of your stats by 1 (to a max of +2). KNOWLEDGE IS POWER When you succeed with Advantage on Know Things, you or an ally add 1 blue Boost die to the next roll to act on what you learn. MANY HANDS MAKE LIGHT WORK When you jump in to help another character who just rolled, tell us how and ask the GM what else is required or what the consequences will be. If you accept, add 1 blue Boost die to your ally's roll. A BUNDLE OF STICKS UNBROKEN (Requires Many Hands Make Light Work) When you Struggle as One, you and one ally of your choice add 1 blue Boost die. Special possessions (Pick 1, in addition to your symbol of authority and scribe's kit) 44 Your symbol of authority (pick 1): Black iron maul, utterly immune to all magic (close, forceful, awkward, +1 damage) Makerglass shield, etched with Aratis's symbol (indestructible, +1 armor, +1 Readiness on any success to Defend) Helm set with a dark ice \"jewel.\" Grants 1 blue Boost die to resist mind-affecting magic. 44 Scribe's tools: parchment, ink, pigments, vials, quills, a notebook, etc. Aviary: thick gloves, bird hoods, tethers, seed, messenger birds, birdcages, etc. Carpenter's tools: chisels, files, nails, pitch, prybars, saws, firkins, barrels, etc. Engineer's tools: rulers, tapes, rods, plumb-bobs, tripods, block & tackles, wheelbarrow, etc. Smithy (or access to it): iron goods, ingots, thick gloves, tongs, bellows, an anvil, etc. (discuss with GM) Stats Assign these scores: +2, +1, +1, +0, +0, -1. When a debility is marked, you roll with 1 black Setback die. DexterityDexterity (DEX)(DEX) WisdomWisdom (WIS)(WIS) IntelligenceIntelligence (INT)(INT) ConstitutionConstitution (CON)(CON) CharismaCharisma (CHA)(CHA) StrengthStrength (STR)(STR) ArmorArmor XPXP LevelLevelDamageDamage d6 weakened dazed miserable HP (max 20)HP (max 20) --- PAGE 2 --- Inventory for When you Outfit, mark a number of below, on specific items or Undefined. For a light load (quick & quiet), mark up to 3 44 For a normal load, mark 4-6 44 For a heavy load (noisy, slow, hot, quick to tire), mark 7-9 44 Undefined When you Have What You Need, move 44 from here to below. Supplies (4+Prosperity uses ) More supplies (4+Prosperity uses ) Even more supplies (4+Prosperity uses ) Use supplies to Recover, Make Camp, or have extra small items. Mess kit (requires fire & water; makes Supplies last longer) Bedroll (recover 1d6 extra HP when you Make Camp) Blanket (warm) Change of clothes Rope, ~25 ft Shovel Sledge/litter/travois, roll-out Snow-shoes T orch (lasts ~1 hour; reach, area, dangerous) Oil lamp ( hours, close, area, crude) Extra oil ( hours, for lamp/lantern, useless as a weapon) Firewood (enough to last 1 full night, reach, area) Hatchet, iron (hand, thrown, x piercing) Mallet, iron and/or wood (hand) Mattock, iron (close, x piercing, messy, awkward) Maul, iron (close, forceful, awkward) Staff (close) Spear, iron (close, thrown, x piercing) Long spear, iron (reach, x piercing) Bow & iron arrows (near, x piercing, low ammo, all out) Extra arrows (x piercing, plenty left, low ammo, all out) Javelins, a few, iron (thrown, x piercing, +1 damage, all out) Shield (+1 armor, +1 Readiness on any success to Defend) Thick hides (1 armor, warm) Cloak (warm) Possessions, items, loot Other things (animals, kits, stashed items, etc.) Small items Fit in a pocket, pouch, or boot. When you Outfit, mark below equal to 4+Prosperity. Undefined When you Have What You Need, move 44 from here to items below, or expend supplies to mark an additional . Knife or dagger, iron (hand) Sling (near, reload, awkward, low ammo, all out) Rushlight (lasts ~15-30 minutes, hand, crude) Tinderbox (slow) Needle & thread Handful of coppers Whisky, skin ( uses) Awl Bowstring Chalk Charcoal Clay jar Cloth/rag Comb Cup Extra socks Gloves Little box Sack (empty) Sawdust Tallow T wine/cord Waterskin Whetstone Whistle Prosperity -1 Gear is crude +0 +1 x =1 piercing +2 x =2 piercing The Chronicle The Judge of Aratis is charged with maintaining the Chronicle, a history of the community, its people, their knowledge, and their traditions. The nature of the lore contained in the Chronicle depends on your Background, but it is more than a mere book; it is a physical place. Decide on its physical structure. On the plus side, it… (choose 3) … is a sturdy vault from the time of the Makers. … has plenty of room to grow. … is hidden underground. … has but one entrance, magically sealed. … bears minor magics to preserve its contents. … is warded against spirits and magic. … includes your living quarters & office. But alas, it… (choose 2) … sits on the outskirts, near the Old Wall. … is cramped, chaotic, and overflowing. … is little more than a crude cellar. … seems to be haunted. … contains a few dangerous artifacts. Mark the location of the Chronicle on the Stonetop Playbook map. The Lawkeeper Her Judges say that Aratis has been with humanity since they first stacked one stone upon another and called it home. In Stonetop's Pavillion of the Gods, Aratis's shrine is… (pick 1) … a hub of the community, a place of frequent rites, petitions, and celebrations … used only on high holidays, for each home keeps its own shrine above the hearth … neglected by most, tended only by you and a handful of believers … a grim place of judgement and punishment, shunned by all but her chosen … newly established, cramped and spare Of her true disciples, Aratis demands… (choose 3) … truth, honesty, and forthrightness … hospitality, freely given to all who ask for it … the punishment of thieves & oathbreakers … adherence to strict rules of diet and dress … respect for authority, property, and rank Introductions Wait here for everyone else. When everyone's ready, take turns introducing your characters. When someone reveals something and you want to know more, ask them about it. When someone asks you a question, answer it truthfully. 11 On your first turn, introduce yourself by name, pronouns, background, origin, and appearance. 22 On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields). 33 On your third turn, describe the Chronicle. Then, tell us about Aratis and her shrine, and what she demands of her true disciples. 44 On your next turn, answer one of the following, naming one or more NPCs who live in Stonetop. Who is your closest kin? Who is your lover/spouse/betrothed? Who is your apprentice? Who is the wisest of the town elders? 55 Go around again. Answer another question from 4, or pass. When everyone has passed, go on. 66 On your next turn, ask your fellow PCs one of these. When others ask you, answer as you like. Which one of you is a true disciple of Aratis? Which one of you is my closest confidant? Which one of you has stood beside me in battle against unnatural chaos? Against which of you have I passed judgement? 77 Go around again. Ask another question from 6, or pass. When everyone has passed, go on. 88 Add your home to the steading playbook. When everyone is done, let spring break forth! Player's Agenda Portray a compelling character Engage with the fictional world Play to find out what happens Player's Principles Begin and end with the fiction Connect with the other PCs Show us what's important to you Have goals and pursue them Be bold, take risks Embrace difficulty, setback, and failure Participate in worldbuilding Build on what others have said Give others a chance to shine Participate in the conversation When in doubt... Visualize the situation Ask the GM for clarification What do you want? What's your goal? Consider your strengths and weaknesses Look to others for ideas Go with the obvious choice, the interesting choice, the meaningful choice... not always the \"right\" choice (remember, you get XP on a failure!) Triggering moves If you want to do it, then do it in the fiction. Tell us how you do it, what it looks like. Be specific. But remember: if you do it in the fiction, then you have to do it. \"I rush past the hagr to grab the glowing sword\" and the GM says that's Defy Danger with DEX. It's okay to say, \"Oh, really? I guess I don't do that.\" But if you want to rush past the hagr, make with the dice. Hold and spend When a move says, \"hold X Currency (until/ while/so long as __),\" then note the Currency you hold and spend it as described by the move. Spending held Currency usually means you just do it, no roll required. Sometimes, though, spending held Currency will allow you to trigger a move (and thus roll) when otherwise you just couldn't have done it. Followers Name Tags HPHP exceptional group Max. HP Armor Damage Instinct Moves ä ä ä Cost Loyalty Gear Notes Name Tags HPHP exceptional group Max. HP Armor Damage Instinct Moves ä ä ä Cost Loyalty Gear Notes"
      },
      {
        "name": "Lightbearer",
        "duty": "Imagine yourself and your kin in a cave lit by a single torch, entranced by shadow puppet stories. Imagine realizing there is a greater truth, and stepping out of the cave into the true Light of day. Would you not bring that Light back into the darkness, to set your people free?",
        "hp": 18,
        "damage_die": "d6",
        "stats": {
          "STR": 3,
          "DEX": 2,
          "CON": 2,
          "INT": 1,
          "WIS": 3,
          "CHA": 4
        },
        "backgrounds": [
          {
            "name": "AUSPICIOUS BIRTH",
            "description": "You were born in Stonetop, and that birth was marked by the God of Light. You were born during an eclipse, perhaps, or under the light of a bright new star? Maybe you bear a sun-shaped birthmark? Whatever the sign, your connection to Helior was clear early on. You've a place of honor in Stonetop, though it'd be a lie to say you don't make some uneasy. When one of your moves has you mark a debility, you may mark this background's circle instead, to no ill effect. Clear it when you Make Camp or Convalesce."
          },
          {
            "name": "ITINERANT MYSTIC",
            "description": "They think of you as a self-important kook who comes through now and again, speaking in riddles and playing tricks with the light. Sure, they know there's something holy about you, but it's not like you're a priest or anything. Priests talk sense. When you go off a-wandering, hold 1 Enigma if you're gone for days, 2 if you're gone for weeks, or 3 if you're gone for months. At the very start of play, hold 3 Enigma. Spend Enigma 1-for-1 to: Return from your wandering exactly when and where you are needed, fully Outfitted Know Things as if you rolled success with Advantage, drawing on what you learned while away Have What You Need to produce an oddly specific yet mundane item of Value 1 or less"
          },
          {
            "name": "SOUL ON FIRE",
            "description": "You once led a wordly life, full of fear and doubt, base pleasures and petty grudges. But something happened. Injury, illness, a brush with death. Or just a moment of such profound misery and selfloathing that you thought you could fall no further. There, in the dark, Helior's light shined upon you, igniting in your soul, lifting you and filling you with a profound sense of purpose. When you Persuade a group by preaching charity, mercy, and hope and roll success, aside from the usual effect, choose 1: Your name and your message spread Someone approaches you, now or later, eager to know more"
          }
        ],
        "instincts": [
          "CHARITY",
          "To go without so that others are better off.",
          "HOPE",
          "To inspire others in the face of adversity.",
          "MERCY"
        ],
        "signature_moves": [
          {
            "name": "Consecrated Flame",
            "description": "When you whisper words of consecration to a flame, the flame casts a holy light. Holy light is uncomfortable for creatures of darkness to look upon, but does no true harm. The holy light lasts until the flame goes out or until you consecrate another flame, whichever comes first."
          },
          {
            "name": "Invoke the Sun God",
            "description": "When you imbue a holy light with Helior's power, choose an Invocation you know and roll WIS: on success with Advantage, it works as described but you must choose 1 consequence from the list below; on success with Threat, it works as described, but you and the GM each choose 1. The Invocation has its reduced effect The effort taxes you; mark a debility The light is snuffed out when the Invocation is complete, its fuel consumed You must bask in sunlight for an hour or so before using that Invocation again See the Invocations insert for details."
          }
        ],
        "choice_moves": [
          {
            "name": "A Candle Against the Dark",
            "description": "When you wield a holy light but go otherwise unarmed, you have 2 Armor."
          },
          {
            "name": "Luminous Shield",
            "description": "When you brandish a holy light to turn aside an attack against body, mind, or soul, roll CHA: on success with Advantage, the attack is deflected and, if the attacker is in range of your light, they are briefly blinded; on success with Threat, the attack is deflected but your holy light flickers and dims, threatening to go out; on failure, your light snuffs out and the attack is unimpeded."
          },
          {
            "name": "All is Illuminated",
            "description": "When you look closely on another and see their soul laid bare, roll WIS: on success with Advantage, ask their player 1 question from the list below, plus \"And what would make them feel loved, beautiful, or worthy?\"; on success with Threat, ask them 1 question from the list. In any case, they must answer truthfully. Of what are they most ashamed? What do they most desire or covet? What hope have they abandoned? Who or what is most precious to them?"
          },
          {
            "name": "And Behold a Pale Horse",
            "description": "When you spend the night gazing into a flame, ask the GM to reveal an impending doom or grim portent that will come to pass unless you intervene, and how you might yet do so. 44"
          },
          {
            "name": "Keep the Home-Fires Burning",
            "description": "When you build a camp fire and sprinkle it with ash from your own hearth, anyone who Makes Camp with you is free from nightmares or bad dreams and recovers (extra) HP equal to your CHA."
          },
          {
            "name": "Lamplighter",
            "description": "When you whisper to a flammable object (a torch, a wick, kindling, etc.), it ignites in moments."
          },
          {
            "name": "Piety",
            "description": "When you spend at least an hour in proper worship to Helior, hold 1 Blessing. Other faithful PCs who partake in this worship also hold 1 Blessing. At any time, you can spend 1 Blessing to add 1 blue Boost die to a roll you just made in pursuit of a righteous cause."
          },
          {
            "name": "Purifying Flames",
            "description": "When you wield a holy light against a creature of darkness, it counts as a weapon (d10 damage, hand, close, area, 2 piercing) and you can choose to use WIS as the stat to Clash."
          },
          {
            "name": "Radiant Countenance",
            "description": "When you give someone your fond attention, you can then Persuade them with 1 blue Boost die. If they are a follower, you can instead choose to Strengthen Your Bond (as if you paid their cost)."
          },
          {
            "name": "Rise Like the Sun",
            "description": "When you draw attention to yourself by word or deed, roll CHA: on success with Advantage, everyone turns and looks, and you hold their gaze as long as you keep giving them reason to look; on success with Threat, everyone turns and looks. SPRING'"
          },
          {
            "name": "Spring's First Thaw",
            "description": "When you spend time (an hour at least, maybe more) seeking to stir hope, kindness, or mercy in an NPC, roll CHA: on success with Advantage, you light a fire deep within them and effect a lasting change; on success with Threat, you kindle goodness in their heart for now, but they will eventually return to their old ways; on failure, their heart hardens and, whatever else the GM says, you can't use this move on them again."
          },
          {
            "name": "Fire Within",
            "description": "When you are in darkness, you are able to see by the light of your inner fire. When you take damage from cold or fire, reduce that damage by 2."
          },
          {
            "name": "Guiding Light",
            "description": "When you lead one or more NPCs through danger, roll CHA: on success with Advantage, you all make it through (Helior be praised); on success with Threat, the GM will tell you what's required to get everyone through safely. HELIOR'"
          },
          {
            "name": "Helior's Unblinking Eye",
            "description": "When you stare into the sun long enough to lose your vision, name a person or place that you know and roll WIS: on success with Advantage, you briefly glimpse your subject as if from a great height, and choose 2 from the list below; on success with Threat, you briefly glimpse your subject as if from a great height, and choose 1: The glimpse lasts as long as you wish Your point of view shifts to very close range You recover your vision quickly"
          },
          {
            "name": "Improved Stat",
            "description": "Each time you take this move, increase one of your stats by 1 (to a max of +2). 44"
          },
          {
            "name": "Wielder of the White Flame",
            "description": "When you channel Helior's essence into an object you carry, roll WIS: on success with Advantage, it ignites with a white flame that casts a holy light (reach, area) and burns neither you nor the object, and you may Invoke the Sun God right now as if you rolled success with Advantage; on success with Threat, it ignites with a white flame that casts a holy light (reach, area) and burns neither you nor the object."
          },
          {
            "name": "Burn Twice as Bright",
            "description": "When you Invoke the Sun God, you may mark a debility to use 2 Invocations at once. Roll once, and apply any consequences to both Invocations."
          },
          {
            "name": "Empowered Invocations",
            "description": "When you Invoke the Sun God, you can choose an extra consequence before you roll. If you do, the Invocation has its empowered effect."
          },
          {
            "name": "Glorious Servant",
            "description": "When you Invoke the Sun God and roll success with Advantage, you need not choose a consequence; on success with Threat, you choose a consequence but the GM does not."
          },
          {
            "name": "Hungry Flames",
            "description": "When you deal damage with a holy light, you deal +1d6 damage and your target is engulfed in holy light and flames."
          },
          {
            "name": "Light, More Light",
            "description": "When you consecrate a flame, it burns brighter than normal. A rushlight or candle illuminates to reach range, an oil lamp, lantern, or torch out to near range, and a bullseye lantern out to far range."
          },
          {
            "name": "Superior Stat",
            "description": "Increase one of your by +1 (to a max of +3)."
          }
        ],
        "gear": "is crude +0 +1 x =1 piercing +2 x =2 piercing Praise the day You are the appointed servant of Helior the Daybringer, god of the sun and light, beacon of hope and mercy. The worship of Helior is… (choose 1) … ancient, widespread, and well-known … most common in Lygos and the south … a new thing, still unheard of by many … an old thing, forgotten by most … widely persecuted He is worshipped through… (choose 1 or 2) … solemn hymns … serene meditation … joyful song … ascetic denial … fervent dancing … formal ceremonies … drugs & intoxicants … pain & sacrifice In Stonetop's Pavilion of the Gods, Helior's shrine has… (choose 1) … the place of highest honor, even if Tor is more popular … been well-tended and given due respect … recently been restored/established, perhaps by you … seen better days, for certain Your predecessor, the previous Lightbearer… (choose 2 or 3) … lived long ago, a figure of legend … was martyred for their faith … died facing a mighty sorcerer or demon … wrote many works of sublime beauty … faced one of the Things Below … died in their bed, peacefully … ascended bodily into the heavens … was reincarnated—as you You came into your powers… (choose 1) … through years of study and devotion … when your predecessor passed them on … suddenly, at a moment of great need. … after a visitation from Helior or one of his servants … when you first laid eyes upon the _______ Introductions Wait here for everyone else. When everyone's ready, take turns introducing your characters. When someone reveals something and you want to know more, ask them about it. When someone asks you a question, answer it truthfully. 11 On your first turn, introduce yourself by name, pronouns, background, origin, and appearance. 22 On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields). 33 On your third turn, praise the day! T ell us of Helior, his worship and his shrine. Tell us, too, of the prior Lightbearer and how you gained your powers. 44 On your next turn, answer one of the following, naming one or more NPCs who live in Stonetop. Who is your closest kin? Who fans the flames of your heart? Whose kindness and generosity warm your soul? Who needs Helior's light, badly? 55 Go around again. Answer another question from 4, or pass. When everyone has passed, go on. 66 On your next turn, ask your fellow PCs one of these. When others ask you, answer as you like. Which one of you is an old and dear friend? Which one of you shares my faith? Which one of you scoffs at mercy and hope? Which one of you will need my guidance soon? 77 Go around again. Ask another question from 6, or pass. When everyone has passed, go on. 88 Add your home to the steading playbook. When everyone is done, let spring break forth! Invocations Lightbearer, you start knowing 2 Invocations. Each time you reach an even-numbered level, learn 1 new Invocation. While one Invocation is ongoing, you can't use another. You can end an Invocation whenever you wish, and it will end immediately if your holy light is extinguished. An Invocation's range is equal to that of its light source. BATH OF HEALING LIGHT Cup your hands around your light and focus it. Your patient... (pick 2): Regains 5 HP (can pick this twice) Clears a debility (can pick this twice) Has one of their problematic wounds stabilized Recovers from a minor condition (drunk, etc.) Reduced: pick only 1 (instead of 2). Empowered: add these to your possible choices: Regains 10 HP (can pick this twice) Fully recovers from a problematic wound Is cured of a dire affliction, poison, or disease BLINDING LIGHT (ongoing) Your light blazes. Any in range who look at it are temporarily blinded. Those not looking at it directly must avert their eyes. You are unaffected. Reduced: the light flares only for a moment. Empowered: if you wish, your allies are unaffected. CLEANSING LIGHT Your light flares, dispelling magical effects within range. Potent, lasting magics are merely suppressed, and slowly return to power once removed from your light. Reduced: potent, lasting magics are unaffected; other magical effects are merely suppressed. Empowered: the invocation is ongoing; while it lasts, any magical effects created in or brought into range are dispelled/suppressed. COLD LIGHT OF DAY (ongoing) All in your light appears as it really is, without the benefit of illusion, shapeshifting, or disguise. Reduced: it lasts only a few moments, just long enough to glimpse the truth. Empowered: illusions in the light are dispelled and shapeshifters in the light are momentarily stunned. DANCING LIGHT (ongoing) Your light takes to the air, floating as you direct it, untethered from its fuel. You can move it anywhere that you can see it, and even change its shape or color. Reduced: it dims, reducing its range by one step. Empowered: you can use another Invocation through the Dancing Light while it is ongoing. GO BACK TO THE SHADOW Spirits of darkness in your light take 2d8 damage (ignores armor). Roll damage for each spirit separately. A spirit reduced to 0 HP is either banished from this world or back to whatever tethers it here. Reduced: affected spirits take only 1d8 damage. Empowered: a spirit reduced to 0 HP is either utterly destroyed OR it's banished from the world and anything tethering it here is destroyed (GM's choice). HOLD BACK THE DARKNESS (ongoing) Spirits and creatures of darkness are repelled by your light and cannot approach. The cowardly or mindless flee outright. Those forced into range of your light deal damage with 1 black Setback die. Reduced: you must maintain an unbroken litany of prayers in order to maintain the effect. Empowered: affected entities that are forced into range of your light are vulnerable to mundane weapons, their supernatural defenses suppressed. MOTH TO A FLAME (ongoing) Name an individual or type of mortal creature. They gaze raptly at your light and will follow it, slowly. The effect ends if they take damage. Reduced: it lasts only briefly OR only some of the named creatures are affected (GM's choice). Empowered: the effect continues for a few moments after they first take damage. Taking damage a second time ends the effect immediately. TERRIBLE AS THE DAWN (ongoing) Name an individual or type of mortal creature. Your light fills them with dread, causing them to recoil and back away. The cowardly flee outright. Reduced: all mortal creatures but you are affected, including your allies. Empowered: even the brave must cower or flee. WARMTH OF THE SUN (ongoing) While in your light, you and your allies are free of fear and doubt, and unharmed by extreme cold. Reduced: only one person in the light is protected. Empowered: the light also protects from necromantic and life-draining effects."
      },
      {
        "name": "Marshal",
        "duty": "Hoping for peace isn't enough. Trouble always comes knocking. And that's why we need you: to run the drills, to man the towers, to take charge when things get bad. To be cold enough to send your neighbors to a sure death in order to keep Stonetop safe. That's the job, Marshal. You up for it?",
        "hp": 20,
        "damage_die": "d8",
        "stats": {
          "STR": 3,
          "DEX": 3,
          "CON": 2,
          "INT": 2,
          "WIS": 1,
          "CHA": 4
        },
        "backgrounds": [
          {
            "name": "SCION",
            "description": "You grew up here, descended from a long line. Some of the biggest names in Stonetop's past are perched in your family tree. Everyone in the village takes your authority as a given, and your crew is a well-established institution in town. You start with the Veteran Crew move, in addition to your usual moves. Go mark it now. When you create your Crew, they automatically have the respected tag (in addition to your usual picks, and any you get from Veteran Crew)."
          },
          {
            "name": "PENITENT",
            "description": "Before you came here, you led a band of ne'er-dowells: bandits, raiders, or bloody-handed mercenaries. But something changed. A moment of truth led you and your followers—some of them at least—to leave that life behind. And for whatever reason, the people of Stonetop took you in. When you draw on your bloody past to Know Things, you may use STR as the stat instead of INT . If you do, the GM will ask you who you wronged back then or who might still hold a grudge. Answer them now. When you create your Crew, they automatically have the warriors tag (in addition to your usual picks)."
          },
          {
            "name": "LUMINARY",
            "description": "You're a natural leader—your words inspire, your plans win the day, your deeds are recounted far and wide. Are you touched by the gods? Does ancient blood flow in your veins? Or are you simply the champion that Stonetop needs in these trying times? You start with the We Happy Few move, in addition to your usual moves. Go mark it now. When you create your Crew, they automatically have the devoted tag (in addition to your usual picks)."
          }
        ],
        "instincts": [
          "AUTHORITY",
          "To take charge and throw your weight around.",
          "CAUTION",
          "To keep everyone safe, to agonize over decisions.",
          "DRIVE"
        ],
        "signature_moves": [
          {
            "name": "Crew",
            "description": "You've got a crew of stalwarts, six or so residents of Stonetop with some steel to them. See the Crew insert for details."
          },
          {
            "name": "Logistics",
            "description": "When you have a steading Muster or Pull Together, or when you Requisition, you add 1 blue Boost die."
          }
        ],
        "choice_moves": [
          {
            "name": "Sir, Permission to Die, Sir",
            "description": "When one of your followers would die, you can spend 1 of their Loyalty to have them survive (out of the action, but alive). If you let them go, mark XP ."
          },
          {
            "name": "Speak Softly",
            "description": "When you offer peace but your enemy refuses, add 1 blue Boost die to your next roll against them."
          },
          {
            "name": "Stentorian",
            "description": "When you raise your voice, it carries far and cuts through even the din of battle. When you go into battle, hold 2 Command. Spend 1 Command to shout an order or warning and pick 1: PCs add 1 blue Boost die to their next roll to do as you say You add 1 blue Boost die to Order Followers or Deploy"
          },
          {
            "name": "Take the Measure",
            "description": "When you size someone up, ask their player one of the questions below and get an honest answer. If they fear or respect you (their call), you can ask another question. You can't use this move on them again until your relationship significantly changes. Can I trust them (to ______ )? What do they intend to do? How are they most useful/dangerous? What weakness of theirs can I exploit?"
          },
          {
            "name": "We Happy Few",
            "description": "When you give an inspiring speech to your allies before facing a dire threat, roll CHA: on success with Advantage, each ally holds 2 Inspiration; on success with Threat, each ally holds 1 Inspiration; on failure, each ally holds 1, but you add 1 black Setback die to all rolls until you share your nagging doubts with someone else. Once battle is joined, your allies can spend their Inspiration at any time, 1-for-1 to do the following: Act fearlessly in the face of terror or overwhelming odds Keep 1 HP instead of being reduced to 0 HP Add 1d6 to a damage roll they just made"
          },
          {
            "name": "Armored",
            "description": "When you carry a shield, mark only 44 (instead of 44 44). Also, you can ignore the cumbersome tag on any armor you wear. If you take this move at the start of play, add an iron hauberk, bronze cuirass, or scale coat to your inventory (all are 2 armor, warm, cumbersome)."
          },
          {
            "name": "Veteran Crew",
            "description": "Each time you take this move, pick 1. You can also choose to reselect their Instinct and Cost. Select 2 new tags for your Crew Increase their damage die from d6 to d8 Increase their max HP by 2 each"
          },
          {
            "name": "Front Line Leader",
            "description": "When you lead your crew into battle, hold 2 Presence. Spend Presence in lieu of your crew's Loyalty or as Readiness (as if you Defended them). IMPROVED ST AT Each time you take this move, increase one of your stats by 1 (to a max of +2). 44"
          },
          {
            "name": "Read the Land",
            "description": "When you first take a moment to survey the terrain, ask the GM one of the following; add 1 blue Boost die to your next roll to act on the answer. What's the best way in, out, through, or past? Where's the best spot for a trap or an ambush? Where's the most defensible position? What here is out of place?"
          },
          {
            "name": "Set-Up Strike",
            "description": "When you Clash and succeed, you can choose to deal damage with 1 black Setback die. If you do, you create an opening for ally to act on, as if you provided Aid. Describe it!"
          },
          {
            "name": "Shake It Off",
            "description": "When you order an ally to overcome fear, pain, doubt, or delusion, roll CHA: on success with Advantage, they do it; on success with Threat, a PC gets 1 blue Boost die to do it; an NPC will do it, but they'll need time, they'll resent you, or they'll feel humiliated (GM decides)."
          },
          {
            "name": "Shield Wall",
            "description": "When you have your crew form a shield wall, they Defend with 1 blue Boost die and on any success they hold +2 Readiness (instead of the usual +1 for shields). As long as they maintain formation, they can go on the offensive without losing Readiness."
          },
          {
            "name": "Arts of War",
            "description": "Take a move from the Fox, Heavy, Judge, Ranger, or Seeker playbooks, for which you otherwise qualify. You can pick from a different playbook each time. You can't take Improved Stat or Superior Stat. 44"
          },
          {
            "name": "Improved Stat",
            "description": "Each time you take this move, increase one of your stats by 1 (to a max of +2)."
          },
          {
            "name": "Prepare a Welcome",
            "description": "When you have your allies fortify a position and lie in wait for battle, hold 1 Surprise if you're rushed or 2 Surprises if you can take your time. Once battle is joined, spend 1 Surprise to reveal a ploy, defense, or dirty trick you prepared in advance and roll INT: on success with Advantage, it works as well as can be expected, and you've still got a few tricks up your sleeve—regain 1 Surprise; on success with Threat, it works as well as can be expected."
          },
          {
            "name": "Battlefield Grace",
            "description": "When you take damage while leading your allies in battle, the damage roll adds 1 black Setback die."
          },
          {
            "name": "Heroes to the Last",
            "description": "Each time you take this move, pick 1: They are exceptional (and upgrade the follower pool once instead of rolling 1 green Ability die) They are inured to terror & horror Increase their max HP by 4 each Increase their damage die one size (max d10)"
          },
          {
            "name": "Focus Fire",
            "description": "You can spend 1 Command to order your allies to bring down a foe. If you do, each ally adds 1 blue Boost die to their next damage roll against that foe."
          },
          {
            "name": "Like an Open Book",
            "description": "When you Take the Measure of someone who fears or respects you, your second question can be anything you want. The GM might ask how you could possibly know this; tell them or ask something else."
          },
          {
            "name": "Noble Mien",
            "description": "When you lead an NPC through danger and return them to safety, if they aren't part of your crew they will either offer to join your crew or pledge their future aid and support."
          },
          {
            "name": "Peace Through Strength",
            "description": "When you stand ready to fight alongside like-minded allies, anything capable of fear recognizes you as a serious threat and treats you accordingly."
          },
          {
            "name": "Superior Stat",
            "description": "Increase one of your stats by +1 (to a max of +3)."
          }
        ],
        "gear": "Place of origin and name Stonetop is your home, or close enough, but where are you (or your family) from originally? Pick 1 and a name to match (or make up something similar). Stonetop: Bethan, Cadfael, Ffraid, Gwythyr, Llewelyn, Meredith, Rhianna, or Urien Gordin's Delve: Pick a name from any list Marshedge: Brigh, Cathal, Conn, Donal, Fionna, Laith, Talulla, or Torin The Steplands (Hillfolk): Adl, Aeln, Clotild, Judoc, Katrn, Mygl, Pirn, or Sera The Manmarch: Berkhard, Gerhild, Hartig, Hilde, Sabrinne, Ulrike, Urrsla, or Weillem Lygos or some other point south: Ameer, Calixta, Hadar, Kelila, Sulaim, Ursa or Xandros I am called... ARMORED When you carry a shield, mark only 44 (instead of 44 44). Also, you can ignore the cumbersome tag on any armor you wear. If you take this move at the start of play, add an iron hauberk, bronze cuirass, or scale coat to your inventory (all are 2 armor, warm, cumbersome). ARTS OF WAR (Requires level 2+, the Marshal) Take a move from the Fox, Heavy, Judge, Ranger, or Seeker playbooks, for which you otherwise qualify. You can pick from a different playbook each time. You can't take Improved Stat or Superior Stat. 44 CREW You've got a crew of stalwarts, six or so residents of Stonetop with some steel to them. See the Crew insert for details. VETERAN CREW (Requires Crew) Each time you take this move, pick 1. You can also choose to reselect their Instinct and Cost. Select 2 new tags for your Crew Increase their damage die from d6 to d8 Increase their max HP by 2 each FRONT LINE LEADER When you lead your crew into battle, hold 2 Presence. Spend Presence in lieu of your crew's Loyalty or as Readiness (as if you Defended them). IMPROVED ST AT Each time you take this move, increase one of your stats by 1 (to a max of +2). 44 LOGISTICS When you have a steading Muster or Pull Together, or when you Requisition, you add 1 blue Boost die. Moves You start with Crew, Logistics, any moves from your Background, and 1 move of your choice. SIR, PERMISSION TO DIE, SIR When one of your followers would die, you can spend 1 of their Loyalty to have them survive (out of the action, but alive). If you let them go, mark XP . SPEAK SOFTLY When you offer peace but your enemy refuses, add 1 blue Boost die to your next roll against them. STENTORIAN When you raise your voice, it carries far and cuts through even the din of battle. When you go into battle, hold 2 Command. Spend 1 Command to shout an order or warning and pick 1: PCs add 1 blue Boost die to their next roll to do as you say You add 1 blue Boost die to Order Followers or Deploy T AKE THE MEASURE When you size someone up, ask their player one of the questions below and get an honest answer. If they fear or respect you (their call), you can ask another question. You can't use this move on them again until your relationship significantly changes. Can I trust them (to ______ )? What do they intend to do? How are they most useful/dangerous? What weakness of theirs can I exploit? WE HAPPY FEW When you give an inspiring speech to your allies before facing a dire threat, roll CHA: on success with Advantage, each ally holds 2 Inspiration; on success with Threat, each ally holds 1 Inspiration; on failure, each ally holds 1, but you add 1 black Setback die to all rolls until you share your nagging doubts with someone else. Once battle is joined, your allies can spend their Inspiration at any time, 1-for-1 to do the following: Act fearlessly in the face of terror or overwhelming odds Keep 1 HP instead of being reduced to 0 HP Add 1d6 to a damage roll they just made BATTLEFIELD GRACE (Requires level 6+ and Front Line Leader) When you take damage while leading your allies in battle, the damage roll adds 1 black Setback die. HEROES TO THE LAST (Requires level 6+ and Veteran Crew) Each time you take this move, pick 1: They are exceptional (and upgrade the follower pool once instead of rolling 1 green Ability die) They are inured to terror & horror Increase their max HP by 4 each Increase their damage die one size (max d10) FOCUS FIRE (Requires level 6+, Stentorian) You can spend 1 Command to order your allies to bring down a foe. If you do, each ally adds 1 blue Boost die to their next damage roll against that foe. LIKE AN OPEN BOOK (Requires level 6+ and Take the Measure) When you Take the Measure of someone who fears or respects you, your second question can be anything you want. The GM might ask how you could possibly know this; tell them or ask something else. NOBLE MIEN (Requires level 6+) When you lead an NPC through danger and return them to safety, if they aren't part of your crew they will either offer to join your crew or pledge their future aid and support. PEACE THROUGH STRENGTH (Requires level 6+ and Speak Softly) When you stand ready to fight alongside like-minded allies, anything capable of fear recognizes you as a serious threat and treats you accordingly. SUPERIOR ST AT (Requires level 6+) Increase one of your stats by +1 (to a max of +3). READ THE LAND When you first take a moment to survey the terrain, ask the GM one of the following; add 1 blue Boost die to your next roll to act on the answer. What's the best way in, out, through, or past? Where's the best spot for a trap or an ambush? Where's the most defensible position? What here is out of place? PREPARE A WELCOME (Requires Read the Land) When you have your allies fortify a position and lie in wait for battle, hold 1 Surprise if you're rushed or 2 Surprises if you can take your time. Once battle is joined, spend 1 Surprise to reveal a ploy, defense, or dirty trick you prepared in advance and roll INT: on success with Advantage, it works as well as can be expected, and you've still got a few tricks up your sleeve—regain 1 Surprise; on success with Threat, it works as well as can be expected. SET-UP STRIKE When you Clash and succeed, you can choose to deal damage with 1 black Setback die. If you do, you create an opening for ally to act on, as if you provided Aid. Describe it! SHAKE IT OFF When you order an ally to overcome fear, pain, doubt, or delusion, roll CHA: on success with Advantage, they do it; on success with Threat, a PC gets 1 blue Boost die to do it; an NPC will do it, but they'll need time, they'll resent you, or they'll feel humiliated (GM decides). SHIELD WALL When you have your crew form a shield wall, they Defend with 1 blue Boost die and on any success they hold +2 Readiness (instead of the usual +1 for shields). As long as they maintain formation, they can go on the offensive without losing Readiness. Special possessions (Pick 2) Chirurgeon's tools: catgut, straps, bandages, tubes, poultice, willow bark, bonesaws, etc. Distillery: skins of fine whisky ( uses, adds 1 blue Boost die to Persuade), copper tubes, malt, firkins, stills, barrels, etc. Engineer's tools: rulers, tapes, rods, plumb-bobs, tripods, block & tackles, wheelbarrow, etc. Personal symbol (a flag, crest, marking, etc.): when you display or reveal it in a dramatic fashion, your crew holds 1 Loyalty (max 3). Scribe's tools: parchment, ink, pigments, vials, quills, a notebook, etc. Weapons of war: choose up to 3 (now or later): Sword, iron (close, +1 damage) Long spear, fine steel (reach, 2 piercing) Battleaxe, iron (close, messy) Composite bow (far, +1 damage, x piercing; low ammo, all out) (discuss with GM) Stats Assign these scores: +2, +1, +1, +0, +0, -1. When a debility is marked, you roll with 1 black Setback die. DexterityDexterity (DEX)(DEX) WisdomWisdom (WIS)(WIS) IntelligenceIntelligence (INT)(INT) ConstitutionConstitution (CON)(CON) CharismaCharisma (CHA)(CHA) StrengthStrength (STR)(STR) weakened dazed miserable HP (max 20)HP (max 20) ArmorArmor XPXP LevelLevelDamageDamage d8 --- PAGE 2 --- Inventory for When you Outfit, mark a number of below, on specific items or Undefined. For a light load (quick & quiet), mark up to 3 44 For a normal load, mark 4-6 44 For a heavy load (noisy, slow, hot, quick to tire), mark 7-9 44 Undefined When you Have What You Need, move 44 from here to below. Supplies (4+Prosperity uses ) More supplies (4+Prosperity uses ) Even more supplies (4+Prosperity uses ) Use supplies to Recover, Make Camp, or have extra small items. Mess kit (requires fire & water; makes Supplies last longer) Bedroll (recover 1d6 extra HP when you Make Camp) Blanket (warm) Change of clothes Rope, ~25 ft Shovel Sledge/litter/travois, roll-out Snow-shoes T orch (lasts ~1 hour; reach, area, dangerous) Oil lamp ( hours, close, area, crude) Extra oil ( hours, for lamp/lantern, useless as a weapon) Firewood (enough to last 1 full night, reach, area) Hatchet, iron (hand, thrown, x piercing) Mallet, iron and/or wood (hand) Mattock, iron (close, x piercing, messy, awkward) Maul, iron (close, forceful, awkward) Staff (close) Spear, iron (close, thrown, x piercing) Long spear, iron (reach, x piercing) Bow & iron arrows (near, x piercing, low ammo, all out) Extra arrows (x piercing, plenty left, low ammo, all out) Javelins, a few, iron (thrown, x piercing, +1 damage, all out) Shield (+1 armor, +1 Readiness on any success to Defend) Thick hides (1 armor, warm) Cloak (warm) Possessions, items, loot Other things (animals, kits, stashed items, etc.) Small items Fit in a pocket, pouch, or boot. When you Outfit, mark below equal to 4+Prosperity. Undefined When you Have What You Need, move 44 from here to items below, or expend supplies to mark an additional . Knife or dagger, iron (hand) Sling (near, reload, awkward, low ammo, all out) Rushlight (lasts ~15-30 minutes, hand, crude) Tinderbox (slow) Needle & thread Handful of coppers Whisky, skin ( uses) Awl Bowstring Chalk Charcoal Clay jar Cloth/rag Comb Cup Extra socks Gloves Little box Sack (empty) Sawdust Tallow T wine/cord Waterskin Whetstone Whistle Prosperity -1 Gear is crude +0 +1 x =1 piercing +2 x =2 piercing War stories The last time the militia saw serious action, it was... (pick 1) ...to repel a nighttime raid by crinwin from the Great Wood. ...to drive off bandits who'd taken up near the Ruined Tower. ...to fend off Hillfolk pursuing a blood feud. ...against Brennan and his Claws, before they settled in Marshedge. ...to face a brutish hagr, come down from the Foothills to wreak havoc. ...to hunt down beasts (wolves, drakes, or bears maybe?) who'd been preying on the village. Answer at least 3 of the following questions about that action: When exactly did it happen? Who lost their life, and who mourns them? Who from Stonetop was maimed, and how? Who saved the day, and how? How did the enemy get away, and whom do you still blame for it? Who comported themselves with honor? What's been bugging you about it ever since? What's got you even more worried now? Introductions Wait here for everyone else. When everyone's ready, take turns introducing your characters. When someone reveals something and you want to know more, ask them about it. When someone asks you a question, answer it truthfully. 11 On your first turn, introduce yourself by name, pronouns, background, origin, and appearance. 22 On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields). 33 On your third turn, tell us the town's war stories, plus the answers to the questions you chose. 44 On your next turn, answer one of the following, naming one or more NPCs who live in Stonetop. Who is your closest kin? Who is your lover/spouse/betrothed? Who is your lieutenant? Whose kin is dead because of your decisions? 55 Go around again. Answer another question from 4, or pass. When everyone has passed, go on. 66 On your next turn, ask your fellow PCs one of these. When others ask you, answer as you like. Which one of you is or was part of my crew? Which one of you have I promised to keep safe? Which one of you do I still have doubts about? Which one of you ignored my orders and got someone killed? 77 Go around again. Ask another question from 6, or pass. When everyone has passed, go on. 88 Add your home to the steading playbook. When everyone is done, let spring break forth! Crew Marshal, your Crew is a half-dozen strong by default. Treat them as a follower with the group tag. All starting values here are subject to change in play. Tags Your crew starts with group, a tag granted by your background, plus 2 more of your choice. archers athletic brave cunning devoted 44 group hardy intimidating observant patient respected stealthy warriors exceptional (requires Heroes to the Last) Instinct Pick 1. To bicker, infight, and hold grudges To hew to tradition and superstition To indulge their baser instincts To lord over others To take needless risks To take things too far Cost Pick 1. Loyalty Merry-making, as a group Public recognition and respect, honor Risks taken, by you, to help them Victories won against worthy foes Wealth gained for themselves or Stonetop Inventory 3 44or fewer is a light load; 4-6 44 is a normal load; 7-9 44 is a heavy load. Hatchet, iron (hand, thrown, x piercing) Spear, iron (close, thrown, x piercing) Bow & iron arrows (near, x piercing, low ammo, all out) Shield (+1 armor, +1 Readiness on any success to Defend) Thick hides (1 armor, warm) Cloak (warm) Supplies (4+Prosperity uses per crew member) Individuals When one stands out, give them a name, a tag, and one or more traits. Names: Aled, Culhwich, Eira, Gerat, Glaw, Harri, Lowri, Mervyn, Nesta Tags: animal-lover, big, bully, cynical, drunkard, eager, gambler, greedy, grumpy, gullible, heartthrob, honest, kind, lewd, little, naive, old, popular, proud, rookie, reckless, shameless, sharp-eyed, short-tempered Traits: __'s kid/sibling/parent/cousin/__, bald, crush on __, grudge against __, hates __, idolizes __, jokes, messy, missing eye/finger/hand/__, misses their kids, nightmares, recently married, religious, scars, skinny, sharp-tongued, sings, snores, tells tall tales, too serious, troubles at home, whistles, whittler HPHP Starts at 6 ea.Starts at 6 ea. ArmorArmor Starts at 0Starts at 0 DamageDamage Starts at d6Starts at d6 ORDER FOLLOWERS When you direct them to make a move and they do so, build a follower pool from tags: 1 green Ability die if a useful tag applies, upgrade it once if the follower is exceptional, and add 1 black Setback die if a tag gets in the way. When they are without orders or they act on their own initiative, the GM says what they do and how it goes. STRENGTHEN YOUR BOND When you pay their cost and you haven't done so recently, they hold 1 Loyalty (max 3). Spend their Loyalty 1-for-1 to have them: Overcome their fear to do as you say Resist acting on their instinct/tags/traits Do something they don't want to do (as long as it's not abhorrent or suicidal)"
      },
      {
        "name": "Ranger",
        "duty": "Your true home is out there. Away from the Old Roads, in the wild places, where you've faced storm and beast alike. But unknown forces are at work beyond the Ringwall, and you fear for your kith and kin. These are strange times. Guide them, ranger, and keep them safe when darkness falls.",
        "hp": 18,
        "damage_die": "d8",
        "stats": {
          "STR": 3,
          "DEX": 3,
          "CON": 2,
          "INT": 2,
          "WIS": 4,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "MIGHTY HUNTER",
            "description": "You are a hunter of the Great Wood, the best the town has seen in generations. You know every part of the Wood within a two-day march. You start with both the Expert Tracker move and the Stalker move. Go mark them now."
          },
          {
            "name": "WIDE WANDERER",
            "description": "You have travelled much of the known world and perhaps parts beyond. Add each of the following to the Neighbors list in the Stonetop playbook, choosing 1 trait for each: Ennis (from Marshedge) Shahar (from Gordin's Delve) Yannic (from the Hillfolk) T ovia (from Lygos) Sasca (from the northern Manmarch) You start with the Mental Map move. Mark it now. When you Know Things about the wider world, you can use WIS as the stat instead of INT . When you arrive somewhere you've visited before (your call), tell the GM when you were last here, and the GM will tell you how it's changed."
          },
          {
            "name": "BEAST-BONDED",
            "description": "You grew up civilized, but your soul is bound to a beast of the wild. You're closer to it than to any man or woman. How did this bond come about? How long ago? Regardless, you start with the Animal Companion move. Go mark it now. When you focus on your animal companion for a few moments, you can use any of the actions you've marked below, no matter the distance between you. Mark 1 action at 1st level, then another at 3rd, 5th, 7th, and 9th. Gauge its distance and direction from you Call it back to your side Sense its emotional state Get a brief impression of what it senses Lend it your strength—lose 1d6 HP , and it regains an equal amount"
          }
        ],
        "instincts": [
          "ADVENTURE",
          "To test yourself, to experience new things.",
          "INDEPENDENCE",
          "To refuse help and push others away.",
          "STEWARDSHIP"
        ],
        "signature_moves": [
          {
            "name": "Home on the Range",
            "description": "When a journey requires you to Defy Danger or Struggle as One, treat failure as success with Threat."
          }
        ],
        "choice_moves": [
          {
            "name": "Predator",
            "description": "When you Seek Insight, add the following to the list of questions you can ask. When acting on the answer to either question, deal an extra 1d4 damage. Who or what here is the easiest prey? How is ________ weak or vulnerable?"
          },
          {
            "name": "Sniff Out Corruption",
            "description": "When you Seek Insight, you can ask, \"What here stinks of the unnatural?\" for free, even on failure."
          },
          {
            "name": "Stalker",
            "description": "When you carry a normal or light load and move with care, you make no noise and leave no sign of your passing. When you hide yourself in a natural environment, you remain unseen until you draw attention to yourself, move positions, or attack."
          },
          {
            "name": "Survivalist",
            "description": "When you Forage, pick 1 extra choice (even on failure, pick 1) and add \"Find or fashion some useful item or supply (GM can veto)\" to the list of options."
          },
          {
            "name": "Warden of the Wild",
            "description": "When you defeat a perversion of nature, you can ask the GM 2 of the following and get a useful answer: Will it come back? If so, how can I stop it? Will its taint spread? If so, how can I contain it? What useful (but grisly) bits can I harvest? What else can I learn about it or its ilk ?"
          },
          {
            "name": "Wild Speech",
            "description": "The grunts, barks, chirps, and calls of natural beasts are as a language to you. You can understand their intentions and communicate basic ideas. When you Persuade a beast, you can choose to use WIS as the stat."
          },
          {
            "name": "Expert Tracker",
            "description": "When you Seek Insight by searching for or studying the signs left by passing creatures, you can ask \"What happened here recently?\" for free, even on failure. When you follow a creature's trail, roll WIS: on any success you follow it to a significant change in terrain or activity; on success with Advantage, you can ask the GM a reasonable question about your quarry and get a useful answer. 44"
          },
          {
            "name": "Mental Map",
            "description": "You can always retrace your steps and can accurately gauge distances and directions. You might not know the way forward but can always find your way back. When you think back on a place you've been, you can Seek Insight retroactively, as if you were still there."
          },
          {
            "name": "Naturalist",
            "description": "When you Know Things about beasts, natural environs, or spirits of the wild, you add 1 blue Boost die."
          },
          {
            "name": "On the Hoof",
            "description": "When you travel through the wilderness, you can procure 1d6 uses of provisions each day (roll with 1 black Setback die in winter or barren terrain). Provisions can substitute for supplies when you Make Camp."
          },
          {
            "name": "Pack Horse",
            "description": "You can carry up to 4 44 with a light load, 7 44 with a normal load, and 10 44 with a heavy load."
          },
          {
            "name": "Pathfinder",
            "description": "When you lead your people to Pull Together or Deploy beyond sight of home, you add 1 blue Boost die."
          },
          {
            "name": "Worldly",
            "description": "Take a move from the Blessed, Fox, Heavy, Marshal, or Seeker playbooks, for which you otherwise qualify. You can pick from a different playbook each time. You can't pick Improved Stat or Superior Stat."
          },
          {
            "name": "Improved Stat",
            "description": "Each time you take this move, increase one of your stats by 1 (to a max of +2)."
          },
          {
            "name": "Alpha",
            "description": "When you assert dominance over another (beast, spirit, Fae, or person), roll WIS: on any success, they must pick 1 from the list below; on success with Advantage, you also add 1 blue Boost die to your next roll against them. Accept your authority, at least for now Slink away or flee, then avoid you Fight you for dominance"
          },
          {
            "name": "Beast of Legend",
            "description": "Each time you take this move, pick 1: They are exceptional (and upgrade the follower pool once instead of rolling 1 green Ability die) They get +4 HP and +1 armor They develop some unique ability or trait"
          },
          {
            "name": "Constant Vigilance",
            "description": "Unless you're dazed, you're never caught off guard— not even when asleep or if you fail. When you intercept a sudden threat (to yourself or an ally), you add 1 blue Boost die to whatever move you make."
          },
          {
            "name": "Giant Slayer",
            "description": "When you strike at a weak spot of a large or huge creature, you deal another +2 damage (+4 total)."
          },
          {
            "name": "Trailblazer",
            "description": "When a journey causes you to Defy Danger or Struggle as One, on success with Advantage you also learn or discover something interesting and useful—ask the GM what."
          },
          {
            "name": "Walk It Off",
            "description": "When you'd mark a debility, you can mark this move instead to no ill effect. Clear it as you would a debility."
          },
          {
            "name": "Superior Stat",
            "description": "Increase one of your by +1 (to a max of +3)."
          }
        ],
        "gear": "is crude +0 +1 x =1 piercing +2 x =2 piercing Something wicked this way comes You know firsthand that trouble is out there, and like it or not, one of these days the folk of Stonetop are going to have to face it. What is it that you're so worried about? (choose 1) A dark, unwholesome presence lurking in the Great Wood A strange, furtive figure seen near the Ruined Tower Something big & savage stalking the northern foothills Whatever's made the lizard-like suarachan of Ferrier's Fen so bold That of which the Hillfolk refuse to speak Then, answer at least 3 of the following questions about this threat: What, exactly, do you think it is? What did you see, and how close did you have to get to see it? Whom or what have you lost to it? What did it leave behind? What do you think it wants? Who refuses to believe you? Who can tell you more, if you can only convince them? Introductions Wait here for everyone else. When everyone's ready, take turns introducing your characters. When someone reveals something and you want to know more, ask them about it. When someone asks you a question, answer it truthfully. 11 On your first turn, introduce yourself by name, pronouns, background, origin, and appearance. 22 On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields). 33 On your third turn, tell us what you're worried about (see \"Something wicked this way comes\"). 44 On your next turn, answer one of the following, naming one or more NPCs who live in Stonetop. Who is your closest kin? To whom do you always return home? Who would be lost without you? Who has much to learn from you? 55 Go around again. Answer another question from 4, or pass. When everyone has passed, go on. 66 On your next turn, ask your fellow PCs one of these. When others ask you, answer as you like. Which one of you fears the wider world? Which one of you has shown me great beauty? Which one of you have I caught sometimes staring out at the horizon? Which one of you lacked the stomach to put something out if its misery? 77 Go around again. Ask another question from 6, or pass. When everyone has passed, go on. 88 Add your home to the steading playbook. When everyone is done, let spring break forth! Instinct Pick 1. To bully and threaten To make mischief To fill its belly To startle and panic To get distracted To run rampant To give chase Cost Pick 1. Loyalty Play, grooming, training, affection Time off on its own, free to roam Cozy quarters, comfort, ample food Each time you take Beast of Legend, pick 1: They are exceptional (see Order Followers below) They get +4 HP and +1 armor They develop a unique ability or trait Animal Companion Ranger, you are accompanied by a beast, with whom you have bonded deeply and communicate without words. Treat it as a follower. Type Pick 1. Bird (falcon, eagle, owl, buzzard, magpie, ) HP 5; Armor 1 (size); Damage d4 (hand) Pick 4 more: Improved damage die (d6) +4 HP +1 armor (agility) attack-bird cautious clever fast mimic sharp-eyed stealthy thieving 44 tiny tireless Critter (cat, fox, possum, raccoon, weasel, ) HP 5; Armor 1 (size); Damage d4 (hand) Pick 5 more: +4 HP +1 armor (agility) agile adorable annoying burrowing cautious clever climber dextrous keen-eared keen-eyed keen-nosed quick stealthy stinky 44 tiny thieving Brute (bear, boar, wolverine, aurochs, drake, ) HP 12; Armor 0; Damage d6 (hand) Pick 3 more: +1 armor (hide, scales, etc.) Damage is +2 damage, forceful Damage is messy, 1 piercing large (+4 HP , +1 damage, +close) easy-going fearless gluttonous keen-nosed powerful protective quick terrifying 44 tough Predator (hound, wolf, cougar, drake, ) HP 8; Armor 0; Damage d8 (hand, grabby) Pick 3 more: +4 HP +1 armor (hide) Damage is messy, 1 piercing agile climber clever enduring fast 44 fierce keen-eared keen-eyed pack-hunter keen-nosed patient powerful stealthy terrifying Steed (horse, mule, ) HP 12; Armor 0; Damage d6+1 (hand, close) Pick 4 more: +4 HP +1 armor (hide) Damage is +2 damage, forceful aggressive agile beautiful calm clever hardy keen-nosed 44 large powerful swift ORDER FOLLOWERS When you direct them to make a move and they do so, build a follower pool from tags: 1 green Ability die if a useful tag applies, upgrade it once if the follower is exceptional, and add 1 black Setback die if a tag gets in the way. When they are without orders or they act on their own initiative, the GM says what they do and how it goes. STRENGTHEN YOUR BOND When you pay their cost and you haven't done so recently, they hold 1 Loyalty (max 3). Spend their Loyalty 1-for-1 to have them: Overcome their fear to do as you say Resist acting on their instinct/tags/traits Do something they don't want to do (as long as it's not abhorrent or suicidal) LOYAL TO THE END When your companion is at 0 HP, roll a flat check, adding 1 blue Boost die if it holds Loyalty: on success with Advantage, it'll be fine once it regains any HP; on success with Threat, it gets the injured tag; on failure, it's injured and will die soon unless someone saves it. Name Damage tags HPHP Max. [Max. [ ]] ArmorArmor See TypeSee Type DamageDamage See TypeSee Type"
      },
      {
        "name": "Seeker",
        "duty": "Look at us. Huddling behind our walls, hearing evil in every passing noise. Cowards, all. All, but you. You fear not the unknown. You plunge into it, searching. Grasping at what has been lost. What will you find, o Seeker? Signs of a bright new age? Or signs of our doom?",
        "hp": 16,
        "damage_die": "d6",
        "stats": {
          "STR": 1,
          "DEX": 2,
          "CON": 2,
          "INT": 4,
          "WIS": 3,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "PAT RIOT",
            "description": "These people are family. Chaos grows all around, but you'll be damned if you'll let your family come to harm. Damned indeed. You have sought out and embraced dark power to protect that which you hold dear. Or perhaps that power fell upon you, and you took it up for the greater good. Either way, you seek more. You start with the Let's Make a Deal move and are Well Versed in the Things Below (go mark them now). You've also acquired 1 major arcanum: The Hec'tumel Codex The Red Scepter The Staff of the Lidless Orb"
          },
          {
            "name": "ANTIQUARIAN",
            "description": "The past has buried many secrets, and you are determined to dig them up. Years of study across the land have led you here, and you are convinced that this town holds the key to your greatest discoveries. What is it you hope to find? What is it that keeps you here? In any case, your travels and studies mean that you start with the Polyglot move and that you are Well Versed in the Makers and their arts (go mark them now). You've also acquired 1 major arcanum: Noruba's Ice Sphere The Azure Hand The Mindgem"
          },
          {
            "name": "WITCH HUNTER",
            "description": "You've dedicated your life to rooting out and destroying horrors and their servants. What set you down this path? What did you sacrifice to walk it? What led you to call Stonetop home? Regardless, you start with the Everything Bleeds move and are Well Versed in (pick 1) the Fae, the Things Below, or the Last Door and what lies beyond (go mark them now). You've also acquired 1 major arcanum: The Demonhide Cloak The Redwood Effigy The Twisted Spear"
          }
        ],
        "instincts": [
          "CUNNING",
          "To scheme, manipulate, and plot.",
          "CURIOSITY",
          "To seek answers that maybe you oughtn't.",
          "HUBRIS"
        ],
        "signature_moves": [
          {
            "name": "Well Versed",
            "description": "Mark 1 topic, in addition to the one noted in your Background. Each additional time you take this move, mark 2 more topics. The Last Door, death, and the undead The civilizations of humanity The Fae and their strange ways The Makers and their arts The primordial powers The Things Below The wild world and its spirits When you Know Things about one of your topics, you can ask the GM a follow-up question of your choice (even on failure). 44"
          },
          {
            "name": "Work With What You've Got",
            "description": "When you cleverly use your environment to harm or impede your foe(s), roll INT: on success with Advantage, pick 2; on success with Threat, pick 1: Interrupt or thwart their action(s) Create an opportunity that adds 1 blue Boost die to you or an ally on the next roll to exploit it Deal damage appropriate to the source (d4 for bruises/scrapes, d6 for bloodshed, d8 if it'd break bones, d10 if it'd kill a common person)"
          }
        ],
        "choice_moves": [
          {
            "name": "Quick Study",
            "description": "When you study something magical that should take months to understand, it instead takes mere weeks. If it should take weeks, it takes days. If it should take days, it takes only a few hours."
          },
          {
            "name": "Safety First",
            "description": "When you spend an hour or so preparing your mystical defenses, hold 2 Protection. When you are affected by harmful magic, spend 1 Protection either to add 1 blue Boost die to any roll to resist it or to halve its damage/effects."
          },
          {
            "name": "Sage Advice",
            "description": "When another PC asks you for guidance, they add 1 blue Boost die to their next roll to follow your advice. 44"
          },
          {
            "name": "Well Versed",
            "description": "Mark 1 topic, in addition to the one noted in your Background. Each additional time you take this move, mark 2 more topics. The Last Door, death, and the undead The civilizations of humanity The Fae and their strange ways The Makers and their arts The primordial powers The Things Below The wild world and its spirits When you Know Things about one of your topics, you can ask the GM a follow-up question of your choice (even on failure). 44"
          },
          {
            "name": "Work With What You've Got",
            "description": "When you cleverly use your environment to harm or impede your foe(s), roll INT: on success with Advantage, pick 2; on success with Threat, pick 1: Interrupt or thwart their action(s) Create an opportunity that adds 1 blue Boost die to you or an ally on the next roll to exploit it Deal damage appropriate to the source (d4 for bruises/scrapes, d6 for bloodshed, d8 if it'd break bones, d10 if it'd kill a common person)"
          },
          {
            "name": "Initiate of the Secret Arts",
            "description": "You have a \"Sacred Pouch\" (3 Stock, magical), as per the Blessed, but with no remarkable traits. Each time you take this move, choose a Blessed move for which you otherwise qualify. (You can't take Improved Stat or Superior Stat.)"
          },
          {
            "name": "Let's Make a Deal",
            "description": "When you Seek Insight, add \"What do they really want or need?\" to the list of questions. When you Persuade by offering them something that you know they want or need, turn one Threat into one Advantage on a successful roll."
          },
          {
            "name": "Logbook",
            "description": "You have a logbook (2 uses, slow) that doesn't take up space in your inventory. When you (and only you) consult your logbook and expend a use, you can ignore a Know Things roll you just made and treat the result as success with Advantage. When the Seasons Change, reset your logbook to 2 uses."
          },
          {
            "name": "Magpie",
            "description": "When you Have What You Need, you can produce something strange, specific, maybe even valuable or a little bit magical, but if you do, tell us where you got it and 2 of the following: How it's not quite right, but maybe it'll do? The trouble you caused back home by getting it Why using it will draw unwanted attention That it's the only thing like this that you've got, and why it'll only work the one time"
          },
          {
            "name": "Never at a Loss",
            "description": "When you Know Things and fail, you may choose to not mark XP . If you don't mark XP , the worst that happens is that the GM tells you nothing interesting or useful about the subject, but instead tells you how you could learn more."
          },
          {
            "name": "Polyglot",
            "description": "When you first encounter a living language in play, describe your proficiency with it (if any) and how you came to acquire it. When you Know Things about any script, text, runes or symbols that you encounter, you add 1 blue Boost die."
          },
          {
            "name": "Cryptologist",
            "description": "When you study encoded, forgotten, or arcane marks or writing, roll INT: on success with Advantage, you can fully decipher them in just a few minutes; on success with Threat, you get the gist in a few minutes, but fully deciphering them will take you an hour or so."
          },
          {
            "name": "Arcane Adept",
            "description": "When you wish to invent a spell or magical effect, detail its workings with the GM and Make a Plan to invent it. If you like, pick one requirement and ask the GM to provide an alternative (for example \"first you must ____\" could become \"first you must ____, or it will take months\")."
          },
          {
            "name": "Deep Insight",
            "description": "When you Seek Insight about something magical, you may ask one additional question,, not limited to the list. Even on failure, you get to ask this question."
          },
          {
            "name": "Improvise",
            "description": "When you wish to use an arcanum's move or option without having unlocked it, ask the GM what fool risk(s) it requires and/or what consequence(s) you'll incur. If you go for it, roll INT: on any success, you get it to work this once—trigger the move or use the option as if you'd unlocked it; and on success with Advantage, also mark one step towards unlocking the arcanum's mysteries."
          },
          {
            "name": "Mind Over Magic",
            "description": "When you roll to study or use an arcanum, you can use INT as the stat instead of the stat you'd normally roll."
          },
          {
            "name": "Overchannel",
            "description": "When you would mark a Consequence from a major arcanum, you may mark a debility instead."
          },
          {
            "name": "Proof Against Detection",
            "description": "When you hold Protection, you can't be scried upon or sensed by magical means, and add 1 blue Boost die to Defy Danger by being stealthy."
          },
          {
            "name": "Superior Stat",
            "description": "Increase one of your stats by +1 (to a max of +3)."
          }
        ],
        "gear": "is crude +0 +1 x =1 piercing +2 x =2 piercing Collection In your travels and investigations you have acquired arcana—artifacts of power and mystery. MAJOR ARCANA Your Background grants you 1 major arcanum. Answer at least 2 questions about it: Where did you acquire it? From whose grasp did you wrest it? Who else wants it? What did it cost you? You've begun to unlock the mysteries of your major arcanum; mark 1 or on the front of its insert. When and how did that happen? MINOR ARCANA Ask the GM for the minor arcana cards. Draw 3 at random and review both sides. Choose one whose secrets you have unlocked. If it's portable, you either keep it on your person or hidden away somewhere safe. Where is it now? How did you come to master it? Choose another, which you have not yet mastered. It is either in your possession or in a secret place known only to you. Where is it? How did you find it? The third you have not yet found, but you have a lead on it. Give the card back to the GM, but make note of it below. During play, ask the GM what you know about it. Introductions Wait here for everyone else. When everyone's ready, take turns introducing your characters. When someone reveals something and you want to know more, ask them about it. When someone asks you a question, answer it truthfully. 11 On your first turn, introduce yourself by name, pronouns, background, origin, and appearance. 22 On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields). 33 On your third turn, describe your major arcana. Tell us your answers to the questions you chose. Then, tell us about your minor arcana, too. 44 On your next turn, answer one of the following, naming one or more NPCs who live in Stonetop. Who is your closest kin? Who is your spouse/lover/betrothed? Whom do you trust, even more than yourself? Whom do you secretly watch over, and why? 55 Go around again. Answer another question from 4, or pass. When everyone has passed, go on. 66 On your next turn, ask your fellow PCs one of these. When others ask you, answer as you like. Which one of you led me to a key discovery? Which one of you has been at my side the entire way? Which one of you most fears the path I tread? Which one of you is keeping secrets from me? 77 Go around again. Ask another question from 6, or pass. When everyone has passed, go on. 88 Add your home to the steading playbook. When everyone is done, let spring break forth! Player's Agenda Portray a compelling character Engage with the fictional world Play to find out what happens Player's Principles Begin and end with the fiction Connect with the other PCs Show us what's important to you Have goals and pursue them Be bold, take risks Embrace difficulty, setback, and failure Participate in worldbuilding Build on what others have said Give others a chance to shine Participate in the conversation When in doubt... Visualize the situation Ask the GM for clarification What do you want? What's your goal? Consider your strengths and weaknesses Look to others for ideas Go with the obvious choice, the interesting choice, the meaningful choice... not always the \"right\" choice (remember, you get XP on a failure!) Triggering moves If you want to do it, then do it in the fiction. Tell us how you do it, what it looks like. Be specific. But remember: if you do it in the fiction, then you have to do it. \"I rush past the hagr to grab the glowing sword\" and the GM says that's Defy Danger with DEX. It's okay to say, \"Oh, really? I guess I don't do that.\" But if you want to rush past the hagr, make with the dice. Hold and spend When a move says, \"hold X Currency (until/ while/so long as __),\" then note the Currency you hold and spend it as described by the move. Spending held Currency usually means you just do it, no roll required. Sometimes, though, spending held Currency will allow you to trigger a move (and thus roll) when otherwise you just couldn't have done it. Followers Name Tags HPHP exceptional group Max. HP Armor Damage Instinct Moves ä ä ä Cost Loyalty Gear Notes Name Tags HPHP exceptional group Max. HP Armor Damage Instinct Moves ä ä ä Cost Loyalty Gear Notes"
      },
      {
        "name": "Would-be Hero",
        "duty": "Most people hope for a quiet life. They spend their days a-worrying: about a leaky roof, a sick child, their crops. But you aren't like most people—you're on a different path. A path to adventure! There's greatness in you. Let's hope you live long enough for everyone else to see it.",
        "hp": 16,
        "damage_die": "d6",
        "stats": {
          "STR": 4,
          "DEX": 3,
          "CON": 2,
          "INT": 1,
          "WIS": 2,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "IMPETUOUS YOUTH",
            "description": "Stonetop has always been home, but you chafe at the demands of mundane life and have always longed for more. Excitement! Danger! When you make a move and come up short, you can give it your all and treat failure as success with Threat, turn one Threat into one Advantage on a successful roll, and, if it matters, treat success with Advantage as a Triumph. But if you do, pick 1 (the GM will fill in the details): You get hurt (2d4 damage and an actual injury) You cause collateral damage, endanger others, or otherwise escalate the situation Something on your person is lost or breaks"
          },
          {
            "name": "DRIVEN",
            "description": "You once led a simple life, but something happened. Something changed you, burdened you with terrible purpose. What was it? Choose 1: A loved one was killed or abducted Someone gave their life to save you Your idol sacrificed themselves to save many You stumbled upon a dark mystery You must make amends for a terrible mistake You always have the option to Burn Brightly; you can spend 2 XP after you roll to add +1, even if you don't have enough XP to level."
          },
          {
            "name": "DESTINED",
            "description": "Fate has laid her hand upon you. Choose 3-4 of the items below to describe your destiny: anointed marked at birth your coming foretold destroy discover free protect restore unify blood civilization darkness earth & stone fire ice light life storms war water the Fae the gods the Makers the Stone the Things Below At the start of a session, roll Omens: on any success, lose all Omens and the GM will describe a vision or portent that points toward your fate and/or clarifies your current situation; also, on success with Advantage, ask the GM a follow-up question and get a clear, helpful answer; on failure, don't mark XP , hold 1 Omen, and tell us of your recent nightmares or a troubling vision, and how your fears play into them. Until your destiny is fulfilled, treat failure on Death's Door as success with Threat, and turn one Threat into one Advantage on a successful Death's Door roll."
          }
        ],
        "instincts": [
          "DEFIANCE",
          "To refuse to back down, give up, give in.",
          "DOUBT",
          "To question yourself, your actions, your worth.",
          "EARNESTNESS"
        ],
        "signature_moves": [
          {
            "name": "Anger is a Gift",
            "description": "When you burn with righteous anger, hold 2 Resolve. You can spend your Resolve 1-for-1 to: Set aside fear and doubt to do what must be done; Act suddenly, catching them off-guard; Inspire allies or bystanders to follow your lead; Strike hard (deal +1d4 damage and forceful tag); Keep your footing, position, or course despite what befalls you."
          },
          {
            "name": "Potential for Greatness",
            "description": "Once per level, when you roll a stat and get success with Advantage (or a Triumph), mark one of the following: Increase the stat you rolled by 1, to a max of +2; Increase your max HP by 4; Gain an additional starting/advancement move of your choice."
          }
        ],
        "choice_moves": [
          {
            "name": "Resourceful",
            "description": "When you Defy Danger and fail, ask the GM a question from Seek Insight after they describe what happens. Add 1 blue Boost die on your next roll to act on the answer."
          },
          {
            "name": "Something to Remember Me By",
            "description": "When you spend Readiness (from Defend) to strike back at an attacker, you deal +1d4 damage and scar, mark, or diminish them in some way (the GM will say how, or ask you to)."
          },
          {
            "name": "Tough Love",
            "description": "When you honestly think another PC is in the wrong and call them on it, their rolls against you add 1 black Setback die until you two work it out."
          },
          {
            "name": "Underestimated",
            "description": "As long as you avoid overt hostility, no enemy will consider you a threat. When you first make your move against an enemy who underestimates you, you add 1 blue Boost die."
          },
          {
            "name": "Up With People",
            "description": "| When you converse with someone (PC or NPC) you can hold 2 Rapport with them. If you do, they hold 1 Rapport with you. During the conversation, either of you can spend 1 Rapport to ask the other player one of the following and get an honest answer. What weighs you down or holds you back? What drives you forward? What lesson would you have me learn? What do you think of me, truly?"
          },
          {
            "name": "Versatile",
            "description": "Choose a move from any other playbook, as long as you meet its requirements. You can pick from a different playbook each time. You can't take Improved Stat or Superior Stat."
          },
          {
            "name": "A Force to Be Reckoned With",
            "description": "* (Requires level 6+; replaces Underestimated) Any intelligent creature who looks you in the eye or hears the steel in your voice instinctively knows that you are a force to be reckoned with, and treats you appropriately. When you Defy Danger against something trying to harm or constrain you, on a Triumph you turn the tables on them (the GM will say how, or ask you to)."
          },
          {
            "name": "Big Damn Hero",
            "description": "* (Requires level 6+; replaces In Over Your Head) When you first leap into danger to protect someone, don't roll to Defend. Instead, treat it as success with Advantage. When you Defend, you can spend 1 Readiness to lock eyes with an attacker; they add 1 black Setback die to damage rolls against you and your ward for the rest of the fight."
          },
          {
            "name": "Undaunted",
            "description": "* (Requires level 6+; replaces Better Part of Valor) When you are outnumbered or facing a foe bigger than you, you get +1"
          },
          {
            "name": "Superior Stat (Potential for Greatness)",
            "description": "Increase one of your by +1 (to a max of +3)."
          }
        ],
        "gear": "is crude +0 +1 x =1 piercing +2 x =2 piercing Fear & anger What do you fear most? (choose 1, maybe 2) Fire, burning, the smell of charred flesh That they won't take you seriously That you really aren't cut out for this The death of your family or loved ones Being alone and helpless Violence, bloodshed, and pain Monsters What you're capable of What you must do What makes you burn with righteous anger? (choose 2, maybe 3) Bullying, slavery, and oppression Wanton cruelty and unnecessary suffering Injustice and inequality Cowardice, treachery, and selfishness The despoiling of beauty and innocence Threats to your loved ones Violence to children, animals, the innocent Perversions of nature When did your fear or anger last cause you trouble? What did you do? How did it turn out? Introductions Wait here for everyone else. When everyone's ready, take turns introducing your characters. When someone reveals something and you want to know more, ask them about it. When someone asks you a question, answer it truthfully. 11 On your first turn, introduce yourself by name, pronouns, background, origin, and appearance. 22 On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields). 33 On your third turn, tell us of your fear & anger, and of the last time they caused you trouble. 44 On your next turn, answer one of the following, naming one or more NPCs who live in Stonetop. Whose heart do you hope to win? Who is counting on you? Who quietly understands the path you are on? Who do you intend to prove wrong? 55 Go around again. Answer another question from 4, or pass. When everyone has passed, go on. 66 On your next turn, ask your fellow PCs one of these. When others ask you, answer as you like. Which one of you is my closest, truest friend? Which one of you believes in me, despite it all? Which one of you has promised to teach me? Which one of you have I hurt, through what I have done or what I've failed to do? 77 Go around again. Ask another question from 6, or pass. When everyone has passed, go on. 88 Add your home to the steading playbook. When everyone is done, let spring break forth! Player's Agenda Portray a compelling character Engage with the fictional world Play to find out what happens Player's Principles Begin and end with the fiction Connect with the other PCs Show us what's important to you Have goals and pursue them Be bold, take risks Embrace difficulty, setback, and failure Participate in worldbuilding Build on what others have said Give others a chance to shine Participate in the conversation When in doubt... Visualize the situation Ask the GM for clarification What do you want? What's your goal? Consider your strengths and weaknesses Look to others for ideas Go with the obvious choice, the interesting choice, the meaningful choice... not always the \"right\" choice (remember, you get XP on a failure!) Triggering moves If you want to do it, then do it in the fiction. Tell us how you do it, what it looks like. Be specific. But remember: if you do it in the fiction, then you have to do it. \"I rush past the hagr to grab the glowing sword\" and the GM says that's Defy Danger with DEX. It's okay to say, \"Oh, really? I guess I don't do that.\" But if you want to rush past the hagr, make with the dice. Hold and spend When a move says, \"hold X Currency (until/ while/so long as __),\" then note the Currency you hold and spend it as described by the move. Spending held Currency usually means you just do it, no roll required. Sometimes, though, spending held Currency will allow you to trigger a move (and thus roll) when otherwise you just couldn't have done it. Followers Name Tags HPHP exceptional group Max. HP Armor Damage Instinct Moves ä ä ä Cost Loyalty Gear Notes Name Tags HPHP exceptional group Max. HP Armor Damage Instinct Moves ä ä ä Cost Loyalty Gear Notes"
      }
    ]
  },
  {
    "id": "lankhmar",
    "name": "Lankhmar",
    "tagline": "Gritty Sword & Sorcery",
    "description": "Street-level fantasy in the City of the Black Toga. Explore narrow alleys, negotiate with corrupt guilds, dodge capricious gods, and serve wealthy or dangerous patrons in Fritz Leiber's Nehwon.",
    "mechanics": "Emphasizes street-level Patrons (Guilds, Mages, Nobles), transaction of power (Bond, Debt, Heat tracks), street brawls, and unstable arcane magic that risks corruption or madness.",
    "archetypes": [
      {
        "name": "Bravo",
        "duty": "To prove your steel, protect your reputation, and keep your coin-purse full.",
        "hp": 24,
        "damage_die": "d10",
        "stats": {
          "STR": 4,
          "DEX": 3,
          "CON": 3,
          "INT": 2,
          "WIS": 2,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "City Sellsword",
            "description": "You have worked for merchants, nobles, and thieves. You know the layout of the city guards and street patrols, adding 1 blue Boost die when navigating urban conflicts."
          },
          {
            "name": "Northern Barbarian",
            "description": "Like Fafhrd, you came from the cold wastes. You have immense strength and are immune to the subtle ennuis of city life. You add 1 blue Boost die when resisting magical charms."
          },
          {
            "name": "Gladiator Escapee",
            "description": "You fought in illegal pits. You deal +1d4 damage when fighting unarmed or with improvised weapons."
          }
        ],
        "instincts": [
          "Carouse",
          "Brawl",
          "Demand respect",
          "Protect comrades",
          "Spend gold quickly"
        ],
        "signature_moves": [
          {
            "name": "Carouse & Brawl",
            "description": "When you spend a night drinking and looking for fights, roll CHA. On success with Advantage, you gain 2 Story Points and a useful rumor. On success with Threat, you choose one and start the next morning with a hangover (+1 Setback die to physical rolls)."
          },
          {
            "name": "Shrug It Off",
            "description": "Once per encounter, when you suffer damage, you can suffer 1 strain instead to reduce the damage by 3."
          }
        ],
        "choice_moves": [
          {
            "name": "Heavy Hitter",
            "description": "Your melee attacks gain the forceful tag, letting you knock enemies back or down on a roll with 1 blue Boost die."
          },
          {
            "name": "Intimidating Bulk",
            "description": "When you use physical presence to coerce someone, roll STR instead of CHA."
          },
          {
            "name": "Improvised Weapon Mastery",
            "description": "You can pick up anything (bottles, chairs, iron bars) and treat it as a close weapon with d8 damage."
          }
        ],
        "gear": "Broadsword (close, d10 damage), studded leather armor (1 armor), flask of cheap spirits, pouch with 10 copper shekels."
      },
      {
        "name": "Thief",
        "duty": "To slip through the shadows, bypass security, and claim what isn't yours.",
        "hp": 18,
        "damage_die": "d6",
        "stats": {
          "STR": 2,
          "DEX": 4,
          "CON": 2,
          "INT": 3,
          "WIS": 1,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "Guild Deserter",
            "description": "You fled the Thieves' Guild. You know their signs, secret marks, and hideouts, but they are looking for you. You add 1 blue Boost die when identifying traps and secret doors."
          },
          {
            "name": "Cat Burglar",
            "description": "You specialize in high-altitude climbs. You make no sound when moving across rooftops, and you ignore black Setback dice from vertical navigation."
          },
          {
            "name": "Pickpocket Prodigy",
            "description": "You spent your childhood in the gutters. You can lift items without triggering checks unless the target is actively suspicious."
          }
        ],
        "instincts": [
          "Steal",
          "Blend into shadows",
          "Avoid guards",
          "Exaggerate wealth",
          "Double-cross if needed"
        ],
        "signature_moves": [
          {
            "name": "Shadow Step",
            "description": "When you attempt to move unseen through darkness or cover, roll DEX. On success with Advantage, you move silently and remain undetected. On success with Threat, you are safe but must leave something behind or make a detour."
          },
          {
            "name": "Pick Lock",
            "description": "You can open mechanical locks with your tools. If under pressure, roll DEX. Otherwise, you succeed automatically."
          }
        ],
        "choice_moves": [
          {
            "name": "Escape Artist",
            "description": "You can slip out of ropes, cuffs, and tight spots easily. You add 1 blue Boost die to checks to escape physical bonds."
          },
          {
            "name": "Backstab",
            "description": "When you strike a foe from behind or surprise them, your damage die increases to d10 and ignores armor."
          },
          {
            "name": "Guild Contacts",
            "description": "When you seek a fence to sell hot goods, you can do so in any city-quarter without rolling."
          }
        ],
        "gear": "Fine steel daggers (hand/thrown, d6 damage), lockpicks, dark cloak, thieves' rope with grapple, pouch with 5 silver pool-pieces."
      },
      {
        "name": "Dabbler",
        "duty": "To seek forbidden secrets regardless of the sanity, safety, or spiritual cost.",
        "hp": 16,
        "damage_die": "d4",
        "stats": {
          "STR": 2,
          "DEX": 2,
          "CON": 1,
          "INT": 4,
          "WIS": 3,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "Fallen Apprentice",
            "description": "You studied under a wizard of high standing before they met a terrible fate. You start with 1 random spell formula and understand arcane calligraphy."
          },
          {
            "name": "Hedge Magician",
            "description": "You brew minor potions and read cards. You add 1 blue Boost die when identifying magical items, relics, or active curses."
          },
          {
            "name": "Relic Collector",
            "description": "You seek ancient treasures. You start with a minor magical trinket that can detect nearby magical activity."
          }
        ],
        "instincts": [
          "Seek magical secrets",
          "Distrust other wizards",
          "Experiment recklessly",
          "Hoard ancient books",
          "Look for short cuts"
        ],
        "signature_moves": [
          {
            "name": "Unstable Sorcery",
            "description": "When you cast a spell, choose its intensity (minor or major) and roll INT. On success with Advantage, the spell succeeds. On success with Threat, it succeeds but you choose: draw attention, take 1d6 strain, or spell effect is distorted."
          },
          {
            "name": "Arcane Sight",
            "description": "You can sense magical flows. By spending 1 strain, you can see invisible magical fields for one scene."
          }
        ],
        "choice_moves": [
          {
            "name": "Counterspell",
            "description": "When you defend an ally against a spell, you can use INT as the stat to absorb or redirect the magic. On success with Advantage, you nullify it completely."
          },
          {
            "name": "Scroll Writing",
            "description": "During downtime, you can spend resources to write a single-use spell scroll that anyone can activate."
          },
          {
            "name": "Forbidden Lore",
            "description": "When you Know Things about ancient demons, dark gods, or sorcery, you roll INT and add 1 blue Boost die."
          }
        ],
        "gear": "Carved walking staff (close, d4 damage), sorcerer's ink and parchment, 2 empty vials, a minor relic (glowing stone), spellbook."
      },
      {
        "name": "Street Priest",
        "duty": "To spread worship of a capricious street god and collect their holy dues.",
        "hp": 20,
        "damage_die": "d6",
        "stats": {
          "STR": 2,
          "DEX": 2,
          "CON": 3,
          "INT": 1,
          "WIS": 4,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "Cult Founder",
            "description": "You invented your god's name and tenets. You have a small flock (3-4 NPCs) who gather in the alleyways. They act as followers with 2 Loyalty."
          },
          {
            "name": "Exiled Cleric",
            "description": "You belonged to a major temple in a distant land before being exiled for heresy. You start with a holy relic of your former order."
          },
          {
            "name": "Ascetic Hermit",
            "description": "You spent years fasting. You require half the food and water of a normal human and add 1 blue Boost die to rolls to resist poisons and diseases."
          }
        ],
        "instincts": [
          "Preach in streets",
          "Demand donations",
          "Interpret omens",
          "Curse non-believers",
          "Find safe sanctuaries"
        ],
        "signature_moves": [
          {
            "name": "Invoke Capricious God",
            "description": "When you pray to your minor deity under pressure, roll WIS. On success with Advantage, the deity acts in your favor (healing 2d6 HP or striking a foe). On success with Threat, they act but demand an immediate holy vow or sacrifice."
          },
          {
            "name": "Preach & Persuade",
            "description": "When you address a crowd in the street to sway their opinion, you can use WIS as the stat instead of CHA."
          }
        ],
        "choice_moves": [
          {
            "name": "Holy Aura",
            "description": "Your prayers can create a localized zone of light that repels thieves, ghouls, and other creatures of shadow."
          },
          {
            "name": "Miraculous Healing",
            "description": "When you treat someone's wounds while praying, you can spend 1 Favor to heal them an extra 5 HP and cure disease."
          },
          {
            "name": "Divine Wrath",
            "description": "By pointing your holy symbol at a foe and pronouncing a curse, you can deal d6 damage (ignores armor) at a distance."
          }
        ],
        "gear": "Bronze mace (close, d6 damage), holy symbol, jar of incense, ceremonial vestments, a collection bowl."
      },
      {
        "name": "Foreign Mercenary",
        "duty": "To sell your sword to the highest bidder and survive this decadent city.",
        "hp": 26,
        "damage_die": "d10",
        "stats": {
          "STR": 4,
          "DEX": 3,
          "CON": 3,
          "INT": 2,
          "WIS": 2,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "Steppe Horseman",
            "description": "You grew up in the saddle. You add 1 blue Boost die when riding, fighting from horseback, or tracking across open fields."
          },
          {
            "name": "Eastern Shield-Bearer",
            "description": "You served in a structured phalanx. You gain +1 armor when wielding a shield, and you can defend allies with greater efficacy."
          },
          {
            "name": "Desert Caravan Guard",
            "description": "You survived hot sands and bandit ambushes. You ignore black Setback dice from heat, fatigue, or lack of sleep."
          }
        ],
        "instincts": [
          "Look for work",
          "Count coins",
          "Maintain weapons",
          "Stay alert for ambush",
          "Distrust city folks"
        ],
        "signature_moves": [
          {
            "name": "Veteran Combatant",
            "description": "When you engage in combat against multiple enemies, your attacks gain the sweeping tag, allowing you to hit an extra target on a success."
          },
          {
            "name": "Battle Hardened",
            "description": "You have 1 armor. You ignore the first condition (e.g., wounded, fatigued) you suffer in each session."
          }
        ],
        "choice_moves": [
          {
            "name": "Tactical Eye",
            "description": "When you enter a battle, ask the GM 'Who is the most dangerous foe here?' and 'What terrain can I exploit?'. You add 1 blue Boost die to your next action relating to the answers."
          },
          {
            "name": "Weapon Mastery",
            "description": "Choose a weapon type (swords, spears, axes). You deal +2 damage when wielding that weapon type."
          },
          {
            "name": "Bodyguard",
            "description": "When you Defend an ally, you can redirect the attack to yourself automatically without spending Story Points or rolling."
          }
        ],
        "gear": "Heavy iron scimitar (close, d10 damage), round shield (+1 armor), chainmail (2 armor), traveler's pack, contract scroll."
      },
      {
        "name": "Courtesan/Dandy",
        "duty": "To weave webs of influence and manipulate the wealthy and powerful.",
        "hp": 16,
        "damage_die": "d4",
        "stats": {
          "STR": 1,
          "DEX": 3,
          "CON": 2,
          "INT": 3,
          "WIS": 2,
          "CHA": 4
        },
        "backgrounds": [
          {
            "name": "Noble Bastard",
            "description": "You have noble blood but no title. You know the etiquette of the high courts and noble houses, adding 1 blue Boost die when mingling in high society."
          },
          {
            "name": "Guild Perfumer",
            "description": "You know how to mix scents and minor chemical reagents. You start with 1 blue Boost die when identifying poisons, drugs, and perfumes."
          },
          {
            "name": "Alleyway Actor",
            "description": "You spent years in street theater. You can easily adopt accents and disguises, making it hard for others to verify your identity."
          }
        ],
        "instincts": [
          "Gather gossip",
          "Flirt with danger",
          "Manipulate rivals",
          "Look fashionable",
          "Secure wealthy patrons"
        ],
        "signature_moves": [
          {
            "name": "Charming Deception",
            "description": "When you lie to or seduce an NPC, roll CHA. On success with Advantage, they believe you and will act on it. On success with Threat, they believe you for now but demand a token of proof or a minor favor."
          },
          {
            "name": "Whispered Secret",
            "description": "By spending a night in social gatherings, you can learn one secret about a major political faction or noble house."
          }
        ],
        "choice_moves": [
          {
            "name": "Hidden Blade",
            "description": "You can conceal a small weapon (dagger, needle) on your person. It cannot be detected by a standard search."
          },
          {
            "name": "Poisoner's Touch",
            "description": "You can slip a powder or liquid into a target's food or drink without being noticed. Roll DEX if under direct observation."
          },
          {
            "name": "Social Shield",
            "description": "When you are accompanied by a high-standing patron, you cannot be arrested or physically attacked by city guards unless they have a direct warrant."
          }
        ],
        "gear": "Ornate stiletto (hand, d4 damage), fine silk clothes, collection of perfumes, mirror, pouch with 15 silver pool-pieces."
      },
      {
        "name": "Assassin",
        "duty": "To execute contracts cleanly and leave no trace behind.",
        "hp": 18,
        "damage_die": "d8",
        "stats": {
          "STR": 2,
          "DEX": 4,
          "CON": 2,
          "INT": 3,
          "WIS": 3,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "Slayer Guild Initiate",
            "description": "You were trained by the guild of killers. You know how to send messages in code and have access to their secret dropboxes in the city."
          },
          {
            "name": "Apothecary Apprentice",
            "description": "You studied herbs and chemical toxins. You can craft simple poisons from common plants during camp scenes."
          },
          {
            "name": "Military Scout",
            "description": "You served as a sniper or advance scout in regional wars. You add 1 blue Boost die when lining up a shot from a far distance."
          }
        ],
        "instincts": [
          "Study targets",
          "Plan exits",
          "Avoid guards",
          "Check food for poison",
          "Stay silent"
        ],
        "signature_moves": [
          {
            "name": "Death Strike",
            "description": "When you strike an unaware target with a close weapon, roll DEX. On success with Advantage, you deal double damage. On success with Threat, you deal normal damage but remain hidden or escape immediately."
          },
          {
            "name": "Poisoner's Art",
            "description": "You start with 3 doses of Sleep-poison. When you apply it to a blade, the next target hit must resist or fall unconscious in 1d4 rounds."
          }
        ],
        "choice_moves": [
          {
            "name": "Wall Crawler",
            "description": "You can scale sheer stone walls without ropes or climbing gear. You ignore black Setback dice from vertical climbs."
          },
          {
            "name": "Silent Kill",
            "description": "When you eliminate a target quietly, you can prevent them from crying out or making noise. No alarm is raised."
          },
          {
            "name": "Anatomical Precision",
            "description": "Your attacks ignore up to 2 armor on targets whose weak spots you have studied."
          }
        ],
        "gear": "Assassin's shortsword (close, d8 damage), blowpipe with 5 darts, vial of sleep poison, dark leather clothes, climbing rope."
      },
      {
        "name": "Fence",
        "duty": "To broker deals, move illegal goods, and control the flow of information.",
        "hp": 18,
        "damage_die": "d6",
        "stats": {
          "STR": 3,
          "DEX": 2,
          "CON": 2,
          "INT": 4,
          "WIS": 1,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "Black Market Trader",
            "description": "You run a legitimate-looking shop that deals in stolen artifacts. You add 1 blue Boost die when evaluating the value of strange items or art."
          },
          {
            "name": "Former Guild Secretary",
            "description": "You managed the books for a major merchant cartel. You can identify forgery and financial fraud automatically."
          },
          {
            "name": "Dock Master's Assistant",
            "description": "You worked at the Grand Canal docks. You know how to smuggle items past customs and which guards accept bribes."
          }
        ],
        "instincts": [
          "Appraise items",
          "Find buyers",
          "Settle deals",
          "Bribe guards",
          "Keep records secret"
        ],
        "signature_moves": [
          {
            "name": "Underworld Network",
            "description": "When you seek a buyer or contact for illegal goods, roll CHA. On success with Advantage, you find someone who will pay full value in silver. On success with Threat, they buy it but demand a favor or trade instead of coin."
          },
          {
            "name": "Bribe",
            "description": "By spending a few silvers, you can convince a city watchman or minor official to look the other way for one scene."
          }
        ],
        "choice_moves": [
          {
            "name": "Appraise Value",
            "description": "You can inspect any item and know its true value, history, and who might want to buy it in the city."
          },
          {
            "name": "Negotiation Mastery",
            "description": "When you barter or negotiate a contract, you roll CHA and add 1 blue Boost die."
          },
          {
            "name": "Safehouse",
            "description": "You have a hidden cellar in the city. While inside, you and your allies cannot be located by magical or mundane tracking."
          }
        ],
        "gear": "Iron-studded cane (close, d6 damage), merchant scales, counterfeit papers, keys to three hideouts, pouch with 25 silver pieces."
      },
      {
        "name": "Beggar Agent",
        "duty": "To observe everything from the gutters and report to the Beggar King.",
        "hp": 20,
        "damage_die": "d6",
        "stats": {
          "STR": 2,
          "DEX": 3,
          "CON": 3,
          "INT": 2,
          "WIS": 4,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "Gutter Urchin",
            "description": "You grew up on the streets. You know the sewer routes, secret passages, and drainage pipes of the city, adding 1 blue Boost die when escaping pursuers."
          },
          {
            "name": "Ruined Merchant",
            "description": "You lost your fortune to a corrupt noble. You know how the wealthy think and can easily guess their motives."
          },
          {
            "name": "Blind Prophet",
            "description": "You pretend to be blind to gather sympathy. You have developed acute hearing and can listen to conversations from a distance."
          }
        ],
        "instincts": [
          "Listen to gossip",
          "Blend in",
          "Find food/water",
          "Flee from authority",
          "Report to king"
        ],
        "signature_moves": [
          {
            "name": "Eyes of the Gutter",
            "description": "When you spend time begging or sitting in the streets, roll WIS. On success with Advantage, you gather 2 useful rumors and remain entirely unnoticed. On success with Threat, you get 1 rumor but draw attention from a rival beggar or thug."
          },
          {
            "name": "Sewer Navigation",
            "description": "You can navigate the city's under-sewers without getting lost, bypassing any wall or gate in the city above."
          }
        ],
        "choice_moves": [
          {
            "name": "Pitiable Face",
            "description": "When you are caught in a restricted area, you can play the simple beggar. Roll CHA to convince them to throw you out instead of arresting you."
          },
          {
            "name": "Whisper Network",
            "description": "You can send messages across the city using beggar urchins. The message arrives in 1 hour without being intercepted."
          },
          {
            "name": "Scrounger",
            "description": "When you forage or search ruins for supplies, you always find double the rations or usable gear."
          }
        ],
        "gear": "Thick staff (close, d6 damage, forceful), tattered rags, bowl for coins, dry rations, map of the city sewers."
      }
    ]
  },
  {
    "id": "darksun",
    "name": "Dark Sun",
    "tagline": "Post-Apocalyptic Survival",
    "description": "Survival in the brutal, desert world of Athas. Water is life, metal is rare, and the cities are ruled by tyrannical Sorcerer-Kings. Magic is defiling, burning the life force of the soil, while the Way of Psionics is universal.",
    "mechanics": "Introduces Silt/Heat environmental hazards, weapon fragility (non-metal weapons break on major threats), Defiling magic boosts rolls at environmental cost, and universal Psionics.",
    "archetypes": [
      {
        "name": "Gladiator",
        "duty": "To dominate the arena, survive the bloody games, and prove your martial supremacy.",
        "hp": 28,
        "damage_die": "d10",
        "stats": {
          "STR": 4,
          "DEX": 3,
          "CON": 3,
          "INT": 1,
          "WIS": 2,
          "CHA": 2
        },
        "backgrounds": [
          {
            "name": "Urik Arena Star",
            "description": "You fought in Urik's famous pits. You add 1 blue Boost die when fighting before a crowd, and you can invoke your name to intimidate common soldiers."
          },
          {
            "name": "Mul Pit-Fighter",
            "description": "You are a Mul (human-dwarf hybrid). You have immense stamina and do not need sleep for up to three days, ignoring black Setback dice from fatigue."
          },
          {
            "name": "Beast Pit Survivor",
            "description": "You were thrown to the wild beasts. You deal +1d4 damage when fighting desert monsters, and you know their common weaknesses."
          }
        ],
        "instincts": [
          "Fight to kill",
          "Show off strength",
          "Suck up pain",
          "Sizing up foes",
          "Look for metal weapons"
        ],
        "signature_moves": [
          {
            "name": "Arena Mastery",
            "description": "When you enter a fight, gain 1 Momentum. You can spend Momentum to execute a special combat maneuver (e.g., disarm, trip, sweep) without rolling."
          },
          {
            "name": "Bone Cracker",
            "description": "Your attacks deal +2 damage when wielding obsidian, bone, or wooden weapons, as you know how to strike to break them against armor."
          }
        ],
        "choice_moves": [
          {
            "name": "Crowd Pleaser",
            "description": "When you defeat a foe in a dramatic way, roll CHA. On success with Advantage, onlookers are inspired or terrified (ally adds 1 blue Boost die, enemy adds 1 black Setback die)."
          },
          {
            "name": "Improvisational Combat",
            "description": "You can fight with shields, nets, or chains. When you use a shield defensively, you gain +2 armor instead of +1."
          },
          {
            "name": "Unbreakable",
            "description": "When you take damage that would reduce you to 0 HP, you can use CON as the stat. On success with Advantage, you stay at 1 HP. On success with Threat, you stay at 1 HP but take a condition."
          }
        ],
        "gear": "Obsidian greatsword (close, d10 damage, fragile), bone arm-guards (1 armor), net, water skin, arena token."
      },
      {
        "name": "Templar",
        "duty": "To enforce the Sorcerer-King's iron will and maintain order in the city-state.",
        "hp": 22,
        "damage_die": "d8",
        "stats": {
          "STR": 3,
          "DEX": 2,
          "CON": 3,
          "INT": 2,
          "WIS": 1,
          "CHA": 4
        },
        "backgrounds": [
          {
            "name": "Bureaucrat of Tyr",
            "description": "You served in Tyr's administration. You know the legal codes and how to manipulate taxes, records, and warrants to your 1 blue Boost die."
          },
          {
            "name": "Sorcerer-King's Chosen",
            "description": "You were personally selected by a Sorcerer-King. You start with a minor token of authority that commands respect from guards and slaves."
          },
          {
            "name": "Inquisitor of the Wastes",
            "description": "You hunted templar deserters and veiled alliance members. You add 1 blue Boost die when detecting magical activity or lies."
          }
        ],
        "instincts": [
          "Enforce laws",
          "Demand obedience",
          "Collect taxes",
          "Root out rebels",
          "Report to king"
        ],
        "signature_moves": [
          {
            "name": "Secular Authority",
            "description": "When you order a citizen or slave of your city-state to do something, roll CHA. On success with Advantage, they obey immediately. On success with Threat, they obey but grumble, delay, or demand a bribe."
          },
          {
            "name": "Sorcerous Decree",
            "description": "You can call upon your Sorcerer-King's power. Spend 1 strain to project a bolt of dark energy that deals d8 damage (ignores armor) at a distance."
          }
        ],
        "choice_moves": [
          {
            "name": "Requisition",
            "description": "You can demand supplies, mounts, or services from any citizen or slave in the name of your king. Roll CHA if resisted."
          },
          {
            "name": "Iron Discipline",
            "description": "Allies acting under your direct orders gain +1 blue Boost die to their rolls to resist fear, magic, or environmental danger."
          },
          {
            "name": "Judicial Sentence",
            "description": "By declaring someone an outlaw, you grant all allies 1 blue Boost die on the attack roll against them."
          }
        ],
        "gear": "Iron mace (rare! close, d8 damage), templar robes, steel-banded shield (+1 armor), writ of authority, water skin."
      },
      {
        "name": "Preserver",
        "duty": "To cast arcane magic in secret, protecting the life force of Athas from destruction.",
        "hp": 16,
        "damage_die": "d4",
        "stats": {
          "STR": 3,
          "DEX": 2,
          "CON": 2,
          "INT": 4,
          "WIS": 3,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "Veiled Alliance Agent",
            "description": "You belong to the underground rebellion. You know their signs, secret meeting places, and add 1 blue Boost die when concealing your spellcasting from templars."
          },
          {
            "name": "Solitary Hermit",
            "description": "You studied magic alone in the deep desert. You know how to read ancient stone tablets and add 1 blue Boost die when researching ancient ruins."
          },
          {
            "name": "Refugee Scholar",
            "description": "You fled a collapsed city-state. You have a collection of scrolls detailing botanical and elemental lore."
          }
        ],
        "instincts": [
          "Hide magic",
          "Preserve plant life",
          "Distrust defilers",
          "Gather ancient scrolls",
          "Avoid templars"
        ],
        "signature_moves": [
          {
            "name": "Preserving Spellcast",
            "description": "When you cast a spell without harming the environment, roll INT. On success with Advantage, the spell succeeds. On success with Threat, it succeeds but you must spend 1 strain or the spell's effect is delayed."
          },
          {
            "name": "Veiled Signs",
            "description": "You can cast spells using subtle gestures and whispers. Templars or other onlookers must roll a hard check to detect that magic is being used."
          }
        ],
        "choice_moves": [
          {
            "name": "Nature's Shield",
            "description": "By spending 1 strain, you can wrap yourself in a defensive barrier of wind and dust, gaining +2 armor for one scene."
          },
          {
            "name": "Arcane Restoration",
            "description": "You can spend downtime in an oasis or garden to channel natural energy, restoring 2d6 HP to an ally or clearing a debility."
          },
          {
            "name": "Botanical Telepathy",
            "description": "By touching a living plant, you can ask the GM 1 question about what has passed nearby in the last 24 hours."
          }
        ],
        "gear": "Wooden staff (close, d4 damage), collection of dried herbs, spell scrolls, Veiled Alliance sigil, water skin."
      },
      {
        "name": "Defiler",
        "duty": "To seize magical power at any cost, regardless of the ash left in your wake.",
        "hp": 18,
        "damage_die": "d6",
        "stats": {
          "STR": 2,
          "DEX": 2,
          "CON": 3,
          "INT": 4,
          "WIS": 1,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "Outlaw Sorcerer",
            "description": "You are wanted by both templars and the Veiled Alliance. You know how to hide in the ruins of the wastes and add 1 blue Boost die when set up in defensive positions."
          },
          {
            "name": "Renegade Templar",
            "description": "You stole arcane scrolls from a templar library. You know templar procedures and add 1 blue Boost die when hiding within city-states."
          },
          {
            "name": "Wasteland Raider",
            "description": "You sell your destructive powers to bandit kings. You deal +1d4 damage when attacking caravans or open camps."
          }
        ],
        "instincts": [
          "Seek power",
          "Burn vegetation",
          "Slay witnesses",
          "Rebel against kings",
          "Hoard metal items"
        ],
        "signature_moves": [
          {
            "name": "Defiling Spark",
            "description": "When you cast an arcane spell, you can choose to defile the surrounding soil. If you do, upgrade one Ability die to a yellow Proficiency die to your check, but all plant life within a 10-meter radius turns to ash, and allies take a black Setback die due to choking dust."
          },
          {
            "name": "Ash Blast",
            "description": "You can channel the ash of your defiling magic into a blinding cloud, giving all nearby enemies a black Setback die for 1 round."
          }
        ],
        "choice_moves": [
          {
            "name": "Life Drain",
            "description": "When you defile, you can choose to drain the life force of a nearby ally or beast instead of plants, dealing 1d6 damage to them to upgrade your spell roll."
          },
          {
            "name": "Destructive Magic",
            "description": "Your spells gain the destructive tag, allowing them to ignore armor and damage structures or vehicles."
          },
          {
            "name": "Fear Master",
            "description": "Your defiling magic is so terrifying that when you cast, nearby enemies must roll a check to avoid fleeing or cowering."
          }
        ],
        "gear": "Obsidian dagger (hand, d6 damage, fragile), dark cloak, stolen scrolls, bag of ash, water skin."
      },
      {
        "name": "Psionicist",
        "duty": "To unlock the hidden potential of the Way and bend minds to your will.",
        "hp": 18,
        "damage_die": "d6",
        "stats": {
          "STR": 2,
          "DEX": 3,
          "CON": 2,
          "INT": 3,
          "WIS": 4,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "Monastery Initiate",
            "description": "You were trained in a hidden psionic academy in the Ringwall Mountains. You have deep knowledge of the Way and add 1 blue Boost die when identifying psionic phenomena."
          },
          {
            "name": "City Gladiator",
            "description": "You used your mind-powers to survive the arenas of Balic. You add 1 blue Boost die when using telekinesis to manipulate items in combat."
          },
          {
            "name": "Wild Talent",
            "description": "You discovered your powers alone in the wastes. You have an erratic style that makes your mind difficult for other telepaths to read."
          }
        ],
        "instincts": [
          "Read minds",
          "Stay calm",
          "Manipulate items",
          "Shield thoughts",
          "Look for crystals"
        ],
        "signature_moves": [
          {
            "name": "Mind Strike",
            "description": "You can strike a foe's mind directly. Roll WIS. On success with Advantage, deal your damage die (ignores armor) and the target is stunned for 1 round. On success with Threat, choose one: deal damage or stun them."
          },
          {
            "name": "Telepathic Sending",
            "description": "You can communicate silently with any intelligent creature within your line of sight. They can respond telepathically."
          }
        ],
        "choice_moves": [
          {
            "name": "Telekinetic Grip",
            "description": "By spending 1 strain, you can move objects weighing up to a human at a distance. If used in combat (e.g. throwing a weapon), roll WIS."
          },
          {
            "name": "Thought Shield",
            "description": "You gain +1 defense. Other telepaths or mind-readers cannot read your thoughts or manipulate your mind unless you allow it."
          },
          {
            "name": "Sensory Overload",
            "description": "By flooding a foe's senses with telepathic noise, you give them a black Setback die to all rolls for one scene."
          }
        ],
        "gear": "Crystal staff (close, d6 damage), focus crystal, simple tunic, sandals, water skin."
      },
      {
        "name": "Dune Trader",
        "duty": "To lead caravans through the wastes, secure routes, and amass wealth.",
        "hp": 20,
        "damage_die": "d6",
        "stats": {
          "STR": 2,
          "DEX": 2,
          "CON": 3,
          "INT": 3,
          "WIS": 1,
          "CHA": 4
        },
        "backgrounds": [
          {
            "name": "House Shom Agent",
            "description": "You work for one of the giant merchant houses. You have access to their outposts, guards, and can obtain credit in major cities."
          },
          {
            "name": "Independent Smuggler",
            "description": "You run a small, illegal caravan. You know how to bypass toll gates and hide contraband from templars, adding 1 blue Boost die when smuggling."
          },
          {
            "name": "Elven Bazar Trader",
            "description": "You grew up in the fast-moving elven markets. You can spot a forgery or bad deal instantly and add 1 blue Boost die when bartering."
          }
        ],
        "instincts": [
          "Count coins",
          "Negotiate deals",
          "Protect cargo",
          "Bribe authorities",
          "Find water/oasis"
        ],
        "signature_moves": [
          {
            "name": "Wasteland Barter",
            "description": "When you buy, sell, or trade goods in a market, roll CHA. On success with Advantage, you double your profits or buy items at half price. On success with Threat, you secure a fair deal but must throw in a minor favor or secret."
          },
          {
            "name": "Caravan Leader",
            "description": "You travel with a loyal mount (Erdlu or Inix) and a hireling guard. The guard acts as a follower with 2 Loyalty."
          }
        ],
        "choice_moves": [
          {
            "name": "Evaluate Goods",
            "description": "By inspecting an item, you know its material, history, structural weaknesses, and true market value."
          },
          {
            "name": "Safe Passage",
            "description": "When traveling along established trade routes, you and your caravan cannot be ambushed by standard raiders unless they have a major leader."
          },
          {
            "name": "Elixir of Life",
            "description": "You know how to preserve water and food. Your caravan requires half the standard water consumption during desert travel."
          }
        ],
        "gear": "Obsidian spear (close/thrown, d6 damage, fragile), merchant scales, ledger book, loyal Erdlu mount, water skin."
      },
      {
        "name": "Elemental Priest",
        "duty": "To honor the elemental pacts (Earth, Air, Fire, Water) in a barren, dying land.",
        "hp": 22,
        "damage_die": "d8",
        "stats": {
          "STR": 3,
          "DEX": 2,
          "CON": 3,
          "INT": 2,
          "WIS": 4,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "Fire Shrine Keeper",
            "description": "You serve the element of Fire. You start with a holy brazier and add 1 blue Boost die when casting fire spells or resisting heat damage."
          },
          {
            "name": "Water Searcher",
            "description": "You serve the element of Water. You can locate underground water sources in the desert and add 1 blue Boost die when negotiating with thirsty factions."
          },
          {
            "name": "Silt Walker",
            "description": "You serve the element of Earth/Dust. You can walk across silt basins without sinking, ignoring black Setback dice from silt."
          }
        ],
        "instincts": [
          "Pray to elements",
          "Seek shrines",
          "Avenge profanation",
          "Avoid city politics",
          "Conserve resources"
        ],
        "signature_moves": [
          {
            "name": "Elemental Pact",
            "description": "Choose your primary element (Fire, Water, Earth, Air). When you call upon your element to alter the environment (e.g. summon wind, shape clay, spark flame), roll WIS. On success with Advantage, the effect is clean and powerful. On success with Threat, choose one: it is brief, or you take 1d6 strain."
          },
          {
            "name": "Purify Water",
            "description": "By spending 1 strain and praying over a source of dirty, salty, or poisoned water, you can make it pure and safe to drink for up to 10 people."
          }
        ],
        "choice_moves": [
          {
            "name": "Flame Weapon",
            "description": "By spending 1 strain, you can coat your weapon in elemental fire, dealing +1d6 fire damage for one scene."
          },
          {
            "name": "Grounded Earth",
            "description": "When you are touching solid rock or soil, you gain +1 armor and add 1 blue Boost die to rolls to resist physical knockbacks."
          },
          {
            "name": "Wind Ride",
            "description": "By calling upon Air, you can jump double the standard height or float safely down from any height."
          }
        ],
        "gear": "Stone hammer (close, d8 damage), holy elemental symbol, bag of holy sand, water skin, fire-striker."
      },
      {
        "name": "Wasteland Scout",
        "duty": "To guide travelers through silt basins and avoid deadly desert predators.",
        "hp": 22,
        "damage_die": "d8",
        "stats": {
          "STR": 2,
          "DEX": 4,
          "CON": 3,
          "INT": 2,
          "WIS": 3,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "Gith Hunter",
            "description": "You lived among the Gith. You know how to track Gith raiders, speak their gutter language, and add 1 blue Boost die when setting up ambushes in rocky badlands."
          },
          {
            "name": "Caravan Scout",
            "description": "You guided major merchant houses. You know the locations of secret oases and can predict sandstorms 1 hour in advance."
          },
          {
            "name": "Ruins Explorer",
            "description": "You specialize in navigating the ruins of ancient Athas. You add 1 blue Boost die when searching for items in ancient stone complexes."
          }
        ],
        "instincts": [
          "Track beasts",
          "Find oases",
          "Conceal camps",
          "Stay downwind",
          "Check water supplies"
        ],
        "signature_moves": [
          {
            "name": "Desert Survivalist",
            "description": "When you lead a party through the deep desert under pressure (sandstorms, heat waves), roll WIS. On success with Advantage, you navigate safely without losing resources. On success with Threat, you arrive safely but the journey costs 1 supply (rations or water)."
          },
          {
            "name": "Wasteland Stealth",
            "description": "When you hide in desert terrain (dunes, rocks, silt edges), you add 1 blue Boost die. Enemies cannot spot you unless they walk directly onto your position."
          }
        ],
        "choice_moves": [
          {
            "name": "Beast Whisperer",
            "description": "You can calm wild desert beasts (Inixes, Kanks). Roll WIS. On success with Advantage, they will not attack you and will allow you to pass. On success with Threat, they pass but demand food."
          },
          {
            "name": "Sniper Shot",
            "description": "When you fire a bow or blowpipe from hidden cover, your attack ignores the target's armor and deals +1d4 damage."
          },
          {
            "name": "Resourceful Forager",
            "description": "When you forage for food and water in the wastes, you always find enough supplies to sustain your party for 1 day."
          }
        ],
        "gear": "Cactus-wood bow (far, d8 damage, reload), bone dagger (hand, d6 damage), water skin, compass, climbing spikes."
      },
      {
        "name": "Rebellious Slave",
        "duty": "To break the chains of the Sorcerer-Kings and lead others to freedom.",
        "hp": 24,
        "damage_die": "d8",
        "stats": {
          "STR": 4,
          "DEX": 3,
          "CON": 3,
          "INT": 2,
          "WIS": 1,
          "CHA": 2
        },
        "backgrounds": [
          {
            "name": "Arena Slave",
            "description": "You cleaned the pits and survived the beatings. You add 1 blue Boost die when defending against physical torture or intimidation, and you start with 1 armor."
          },
          {
            "name": "Plantation Laborer",
            "description": "You harvested crops under the hot sun. You have incredible heat tolerance and require half the water of a normal human."
          },
          {
            "name": "Escaped Rebel",
            "description": "You belong to a hidden rebel camp in the dunes. You know how to communicate using coded symbols and have contacts in the city-state slums."
          }
        ],
        "instincts": [
          "Break chains",
          "Resist authority",
          "Inspire slaves",
          "Look for weapons",
          "Steal food/water"
        ],
        "signature_moves": [
          {
            "name": "Unshackled Might",
            "description": "When you use raw strength to break bonds, gates, or chains, roll STR. On success with Advantage, you break them cleanly and silently. On success with Threat, you break them but cause noise or injure yourself (take 1d4 damage)."
          },
          {
            "name": "Rebel Call",
            "description": "When you speak to slaves or outcasts to incite rebellion, roll CHA. On success with Advantage, they create a distraction or riot in your favor. On success with Threat, they assist you but demand protection or weapons."
          }
        ],
        "choice_moves": [
          {
            "name": "Dirty Fighting",
            "description": "When you fight dirty (throwing sand in eyes, low blows), you can stun a target for 1 round on a success with 1 blue Boost die."
          },
          {
            "name": "Slip Away",
            "description": "When you attempt to escape from captivity or a chase, you can use DEX as the stat with 1 blue Boost die."
          },
          {
            "name": "Shared Burden",
            "description": "When an ally takes damage, you can choose to take half of it yourself (rounded up), representing your solidarity."
          }
        ],
        "gear": "Broken chains (improvised weapon, d8 damage, close/forceful), stolen guard tunic, lockpick, water skin, rebel band."
      }
    ]
  },
  {
    "id": "elfquest",
    "name": "Elfquest",
    "tagline": "Prehistoric Elf Survival",
    "description": "Play as tribal elves in a prehistoric world of wolves, spirits, and human tribes. Ride giant wolves, communicate through telepathic Sending, and protect your holt from fire, wild beasts, and superstitious humans.",
    "mechanics": "Focuses on Wolf Bonding (riding and fighting alongside pack wolves), 'Sending' telepathy, Flesh-Shaping healing, and tribal bonds without formal power-structure tracks.",
    "archetypes": [
      {
        "name": "Wolfrider",
        "duty": "To hunt with the pack, protect the tribe's territory, and run with the wolves.",
        "hp": 22,
        "damage_die": "d8",
        "stats": {
          "STR": 3,
          "DEX": 4,
          "CON": 3,
          "INT": 2,
          "WIS": 2,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "Wolf Friend",
            "description": "You grew up riding giant wolves. You add 1 blue Boost die when riding, tracking, or hunting with wolves, and you can understand their body language perfectly."
          },
          {
            "name": "Silent Hunter",
            "description": "You are a master of stealth. You make no sound when moving through forest undergrowth, ignoring setbacks related to dense terrain."
          },
          {
            "name": "Tribe Champion",
            "description": "You are the primary defender of the tribe's boundary. You deal +1d4 damage when fighting to protect your kin."
          }
        ],
        "instincts": [
          "Run with wolves",
          "Protect pack",
          "Hunt game",
          "Scent danger",
          "Distrust humans"
        ],
        "signature_moves": [
          {
            "name": "Wolf Bond",
            "description": "You have a giant pack-wolf mount. It acts as a loyal companion with 3 Loyalty and can fight alongside you. It deals d8 damage (close/grabby)."
          },
          {
            "name": "The Sending",
            "description": "You can send thoughts, emotions, and memories telepathically to other elves. This is silent and cannot be intercepted by non-elves."
          }
        ],
        "choice_moves": [
          {
            "name": "Pack Tactics",
            "description": "When you and your wolf attack the same target, you have 1 blue Boost die on the attack roll."
          },
          {
            "name": "Wild Scent",
            "description": "By spending 1 strain, you can smell danger, tracks, or water within a 100-meter radius, even through dense forest."
          },
          {
            "name": "Leap and Strike",
            "description": "When you jump from high branches or your wolf's back to attack, your strike gains the forceful tag and deals +2 damage."
          }
        ],
        "gear": "Bone spear (close/thrown, d8 damage), leather furs, hunting horn, wolf saddle, dried meat rations."
      },
      {
        "name": "Chieftain",
        "duty": "To lead the Wolfriders through hardship, preserve their way, and make the hard choices.",
        "hp": 20,
        "damage_die": "d8",
        "stats": {
          "STR": 3,
          "DEX": 3,
          "CON": 2,
          "INT": 1,
          "WIS": 2,
          "CHA": 4
        },
        "backgrounds": [
          {
            "name": "Cutter's Heir",
            "description": "You are the son or daughter of the previous chief. You bear the ancient chief's sword and have absolute respect from your tribe members."
          },
          {
            "name": "Wasteland Guide",
            "description": "You led the tribe across the great desert. You know how to find oases and avoid heat stroke, adding 1 blue Boost die when guiding travelers in dry lands."
          },
          {
            "name": "Diplomat Chief",
            "description": "You believe in peace between tribes. You add 1 blue Boost die when negotiating with other elf chiefs or strange factions."
          }
        ],
        "instincts": [
          "Make choices",
          "Protect tribe",
          "Honor ancestors",
          "Keep secrets",
          "Lead charge"
        ],
        "signature_moves": [
          {
            "name": "The Way",
            "description": "When you command your tribe members or allies under pressure, roll CHA. On success with Advantage, they follow your order without hesitation, gaining a blue Boost die. On success with Threat, they follow but demand a reason or concession."
          },
          {
            "name": "Chief's Resolve",
            "description": "Once per session, when an ally would suffer a condition or take fatal damage, you can spend a Story Point to allow them to shrug it off."
          }
        ],
        "choice_moves": [
          {
            "name": "Inspire Pack",
            "description": "When you lead your allies into battle, all allies gain +1 armor for the first round of combat."
          },
          {
            "name": "Ancient Broadsword",
            "description": "Your sword (passed down through chiefs) deals +2 damage and is indestructible."
          },
          {
            "name": "Tribe Loyalty",
            "description": "You can call upon 2-3 young hunters to assist you. They act as followers with 2 Loyalty."
          }
        ],
        "gear": "Chief's iron sword (passed down; close, d8 damage, +2 damage), leather vest, chief's band, water skin."
      },
      {
        "name": "Stargazer",
        "duty": "To read the stars, remember the High Ones' origins, and guide the tribe's spirit.",
        "hp": 14,
        "damage_die": "d4",
        "stats": {
          "STR": 1,
          "DEX": 2,
          "CON": 2,
          "INT": 4,
          "WIS": 3,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "Memory Keeper",
            "description": "You spent years looking at ancient paintings and scrolls. You know the exact history of the High Ones and add 1 blue Boost die when decoding runes."
          },
          {
            "name": "Star Reader",
            "description": "You can read the night sky. You can predict weather changes and astronomical events 24 hours in advance."
          },
          {
            "name": "High One Descendant",
            "description": "You bear a strong physical resemblance to the ancient High Ones. You add 1 blue Boost die when interacting with ancient elven spirits or constructs."
          }
        ],
        "instincts": [
          "Read stars",
          "Dream of High Ones",
          "Advise chief",
          "Ponder mysteries",
          "Collect crystal relics"
        ],
        "signature_moves": [
          {
            "name": "Memory of the High Ones",
            "description": "When you study an ancient relic or ruin, roll INT. On success with Advantage, the GM will tell you its history, purpose, and how to activate it. On success with Threat, you learn its history but activate it incorrectly or draw attention."
          },
          {
            "name": "Astral Guidance",
            "description": "By spending 1 strain under the open night sky, you can locate the exact direction of any location or object you have seen in dreams."
          }
        ],
        "choice_moves": [
          {
            "name": "Prehistoric Lore",
            "description": "When you Know Things about ancient beasts, geology, or primeval history, you roll INT and add 1 blue Boost die."
          },
          {
            "name": "Predict Storm",
            "description": "By observing the wind and stars, you can grant all allies a blue Boost die to resist environmental hazards for the next day."
          },
          {
            "name": "Mental Shield",
            "description": "Your mind is a vault. Other senders or telepaths cannot read your thoughts unless you allow it."
          }
        ],
        "gear": "Wooden staff with crystal tip (close, d4 damage), scroll of star maps, crystal shard, warm furs, water skin."
      },
      {
        "name": "Healer",
        "duty": "To heal wounds, mend broken bones, and maintain the tribe's physical vitality.",
        "hp": 16,
        "damage_die": "d4",
        "stats": {
          "STR": 1,
          "DEX": 3,
          "CON": 2,
          "INT": 3,
          "WIS": 4,
          "CHA": 2
        },
        "backgrounds": [
          {
            "name": "Flesh-Shaper Apprentice",
            "description": "You studied under the tribe's master healer. You can heal minor scratches instantly without using magic or supplies."
          },
          {
            "name": "Herbal Remedy Expert",
            "description": "You know how to find healing herbs in any forest. You start with 1 blue Boost die when identifying plants, roots, and poisons."
          },
          {
            "name": "Soothing Voice",
            "description": "Your presence calms troubled minds. You add 1 blue Boost die when attempting to calm terrified NPCs or wild animals."
          }
        ],
        "instincts": [
          "Heal sick",
          "Collect herbs",
          "Conserve energy",
          "Avoid violence",
          "Sooth pain"
        ],
        "signature_moves": [
          {
            "name": "Flesh-Shaping",
            "description": "When you touch an injured creature and focus your inner magic, roll WIS. On success with Advantage, they heal 2d6 HP and their injuries are knit. On success with Threat, they heal 1d6 HP but you take 1d4 strain or draw spirits."
          },
          {
            "name": "Cure Toxin",
            "description": "By spending 1 strain, you can draw poison or disease out of a patient's body through your fingertips."
          }
        ],
        "choice_moves": [
          {
            "name": "Soothing Sending",
            "description": "You can send feelings of peace and healing. When you use Sending to calm an ally, they immediately recover 1d4 strain."
          },
          {
            "name": "Herbal Poultice",
            "description": "During camp scenes, you can craft a poultice that grants an ally +1d6 extra HP recovery when they rest."
          },
          {
            "name": "Life Sense",
            "description": "You can sense the presence of living beings within a 50-meter radius, knowing their health status and species."
          }
        ],
        "gear": "Bronze scalpel (hand, d4 damage), bag of dried herbs, bandages, jar of honey, water skin."
      },
      {
        "name": "Glider",
        "duty": "To preserve the ancient mountain stronghold and hover in isolation.",
        "hp": 18,
        "damage_die": "d6",
        "stats": {
          "STR": 2,
          "DEX": 3,
          "CON": 2,
          "INT": 3,
          "WIS": 4,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "Blue Mountain Dweller",
            "description": "You spent centuries in the quiet halls of Blue Mountain. You know the tunnels perfectly and add 1 blue Boost die when hiding inside stone structures."
          },
          {
            "name": "Ancient Aristocrat",
            "description": "You remember when the High Ones first landed. You have an imperious voice that commands respect from younger elves."
          },
          {
            "name": "Wind Glider",
            "description": "You studied the currents of air. You ignore black Setback dice from wind, high altitude, or thin air."
          }
        ],
        "instincts": [
          "Hover silently",
          "Stay aloof",
          "Collect ancient art",
          "Ignore mundane chores",
          "Guard mountain"
        ],
        "signature_moves": [
          {
            "name": "Levitation",
            "description": "You can float up to 3 meters off the ground. You make no sound when moving, and you can cross dangerous terrain (lava, silt, water) safely. If under pressure, roll WIS."
          },
          {
            "name": "Wind Shield",
            "description": "By spending 1 strain, you can deflect standard arrows or thrown weapons using air currents, gaining +2 armor against ranged attacks."
          }
        ],
        "choice_moves": [
          {
            "name": "Silent Flight",
            "description": "You can fly silently at high speeds for short distances. If carrying another passenger, roll WIS."
          },
          {
            "name": "Ancient Memory",
            "description": "When you try to recall events from thousands of years ago, you roll INT and add 1 blue Boost die."
          },
          {
            "name": "Hover Strike",
            "description": "When you attack a foe from above while hovering, you add 1 blue Boost die to your damage roll."
          }
        ],
        "gear": "Polished stone dagger (hand, d6 damage), silk robes, ancient coin, collection of feathers, water skin."
      },
      {
        "name": "Preserver Sprite",
        "duty": "To wrap things in protective webbing and preserve the tribe's treasures.",
        "hp": 12,
        "damage_die": "d4",
        "stats": {
          "STR": 1,
          "DEX": 4,
          "CON": 3,
          "INT": 2,
          "WIS": 2,
          "CHA": 3
        },
        "backgrounds": [
          {
            "name": "Pet Sprite",
            "description": "You are a tiny, insectoid sprite who lives with the Wolfriders. You can hide inside a pouch or hair lock, and you ignore black Setback dice from small size."
          },
          {
            "name": "Web Spinner",
            "description": "You know how to spin cocoons. You start with 1 blue Boost die when constructing bindings or securing objects."
          },
          {
            "name": "Berry Finder",
            "description": "You love sweet things. You can find wild fruits, honey, or berries in any terrain, always securing 1 ration when foraging."
          }
        ],
        "instincts": [
          "Spin web cocoons",
          "Fly about",
          "Gather sweets",
          "Play tricks",
          "Hide in hair"
        ],
        "signature_moves": [
          {
            "name": "Preserving Webbing",
            "description": "When you spin a web around an item or creature, roll DEX. On success with Advantage, they are wrapped in a cocoon that preserves them perfectly (no decay, no aging, ignores damage). On success with Threat, they are preserved but the web is thin and breaks on any contact."
          },
          {
            "name": "Tiny Wing Flight",
            "description": "You have gossamer wings and can fly. You can bypass any vertical obstacle easily but cannot fly in heavy winds."
          }
        ],
        "choice_moves": [
          {
            "name": "Web Trap",
            "description": "You can throw a ball of sticky webbing at a target's eyes or feet. Roll DEX. On a success, they are restrained for 1 round."
          },
          {
            "name": "Tiny Spy",
            "description": "Because of your small size, you add 1 blue Boost die when sneaking into restricted areas or listening to conversations."
          },
          {
            "name": "Sweet Spark",
            "description": "By sprinkling magical dust on an ally, you give them a blue Boost die to their next social roll."
          }
        ],
        "gear": "Pointed pin (hand, d4 damage), bag of sweet berries, spool of sprite thread, collection of colorful pebbles."
      },
      {
        "name": "Rock-Shaper",
        "duty": "To mold solid stone like clay for shelter, tools, and defenses.",
        "hp": 24,
        "damage_die": "d8",
        "stats": {
          "STR": 4,
          "DEX": 2,
          "CON": 3,
          "INT": 3,
          "WIS": 2,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "Mountain Sculptor",
            "description": "You carved the halls of Blue Mountain. You know the structural integrity of stone and can find weak points in walls automatically."
          },
          {
            "name": "Tomb Architect",
            "description": "You designed the burial mounds of the ancestors. You add 1 blue Boost die when identifying ancient traps or sarcophagi."
          },
          {
            "name": "Gem Carver",
            "description": "You know how to locate and cut raw gemstones. You start with 3 valuable uncut gems."
          }
        ],
        "instincts": [
          "Mold stone",
          "Inspect foundations",
          "Seek gems",
          "Build walls",
          "Suck up damage"
        ],
        "signature_moves": [
          {
            "name": "Stone-Shaping",
            "description": "When you touch solid rock or stone, you can mold it like wet clay. Roll STR. On success with Advantage, you mold it into a useful shape (a wall, a spear, a door) cleanly and quickly. On success with Threat, you mold it but it takes 1d6 strain or the shape has structural flaws."
          },
          {
            "name": "Stone Melding",
            "description": "By spending 1 strain, you can step into a solid stone wall and remain hidden inside it for up to 10 minutes."
          }
        ],
        "choice_moves": [
          {
            "name": "Stone Armor",
            "description": "You can wrap your limbs in stone scales, gaining +2 armor for one scene, but you suffer a black Setback die to DEX rolls due to the weight."
          },
          {
            "name": "Shatter",
            "description": "By striking a stone wall or floor, you can cause it to shatter, creating a shower of sharp stone fragments that deals d6 damage to all nearby foes."
          },
          {
            "name": "Gem Sense",
            "description": "You can sense the presence of precious metals or gems within a 20-meter radius, even through solid rock."
          }
        ],
        "gear": "Stone hammer (close, d8 damage), bag of clay, 3 uncut gemstones, leather apron, water skin."
      },
      {
        "name": "Sun-Folk Villager",
        "duty": "To cultivate the oasis, maintain the peace of Sorrow's End, and heal disputes.",
        "hp": 18,
        "damage_die": "d6",
        "stats": {
          "STR": 2,
          "DEX": 2,
          "CON": 3,
          "INT": 1,
          "WIS": 3,
          "CHA": 4
        },
        "backgrounds": [
          {
            "name": "Oasis Farmer",
            "description": "You cultivate crops in the hot desert sands. You require half the water of a normal elf and add 1 blue Boost die when finding edible desert plants."
          },
          {
            "name": "Master Potter",
            "description": "You craft jars and bricks. You start with 3 sturdy clay jars and add 1 blue Boost die when constructing simple camp facilities."
          },
          {
            "name": "Sorrow's End Elder",
            "description": "You are respected in the village. You add 1 blue Boost die when resolving disputes peacefully between villagers or guests."
          }
        ],
        "instincts": [
          "Cultivate oasis",
          "Solve disputes",
          "Avoid conflict",
          "Share water",
          "Welcome guests"
        ],
        "signature_moves": [
          {
            "name": "Oasis Cultivation",
            "description": "When you work to find or grow food/water in a dry land, roll WIS. On success with Advantage, you secure double the rations and create a small safe camp. On success with Threat, you secure normal rations but the camp is exposed or temporary."
          },
          {
            "name": "Calm Conflict",
            "description": "When you step between two arguing parties to negotiate peace, you can use CHA as the stat. On success with Advantage, they agree to lay down their weapons for now. On success with Threat, they agree but demand you arbitrate the dispute."
          }
        ],
        "choice_moves": [
          {
            "name": "Share Comfort",
            "description": "When you share your water skin or rations with an ally during a rest scene, they immediately recover 1d6 HP."
          },
          {
            "name": "Desert Medicine",
            "description": "You know how to treat heat stroke and desert fever. You add 1 blue Boost die when treating conditions caused by heat or thirst."
          },
          {
            "name": "Villager's Hospitality",
            "description": "When you welcome a stranger to your camp or village, you add 1 blue Boost die to all social rolls against them for the scene."
          }
        ],
        "gear": "Bronze knife (hand, d6 damage), potter's clay, 3 clay water jars, colorful sash, desert cloak."
      },
      {
        "name": "Huntress",
        "duty": "To secure game for the tribe, scout the boundaries, and strike from cover.",
        "hp": 18,
        "damage_die": "d8",
        "stats": {
          "STR": 3,
          "DEX": 4,
          "CON": 2,
          "INT": 2,
          "WIS": 3,
          "CHA": 1
        },
        "backgrounds": [
          {
            "name": "Redwood Archer",
            "description": "You trained in the high redwood branches. You can climb trees with speed and add 1 blue Boost die when firing from elevated positions."
          },
          {
            "name": "Night Scout",
            "description": "You hunt during the moons' rise. You have acute night vision and ignore black Setback dice from poor light or shadows."
          },
          {
            "name": "Beast Tracker",
            "description": "You spent years tracking forest game. You can identify the species, size, and health of any beast from its tracks."
          }
        ],
        "instincts": [
          "Secure game",
          "Scout ahead",
          "Stay hidden",
          "Listen for wind",
          "Shoot to kill"
        ],
        "signature_moves": [
          {
            "name": "Silent Arrow",
            "description": "When you fire a bow from hidden cover, roll DEX. On success with Advantage, deal your damage and remain undetected. On success with Threat, deal your damage but your position is revealed to your target."
          },
          {
            "name": "Camouflage",
            "description": "By using mud, leaves, or sand, you can blend into any natural environment. Onlookers cannot see you unless they walk directly onto you."
          }
        ],
        "choice_moves": [
          {
            "name": "Double Shot",
            "description": "By spending 1 strain, you can fire two arrows at once, hitting two separate targets within range on a success."
          },
          {
            "name": "Eagle Eye",
            "description": "You can see clearly up to 1 kilometer away. You ignore distance setbacks when using a bow."
          },
          {
            "name": "Snare Trap",
            "description": "During a camp scene, you can set up a hidden wire trap. The next creature to walk into it is restrained and rings a alarm bell."
          }
        ],
        "gear": "Fine wooden bow (far, d8 damage, x piercing), quiver of 20 arrows, skinning knife (hand, d6 damage), camouflage paint, furs."
      }
    ]
  }
];
