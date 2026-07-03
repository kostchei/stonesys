const DEFAULT_STARTING_CHOICE_COUNT = 2;

const CAMPAIGN_SUPPLEMENTS = {
  darksun: {
    startingText: "Also choose one free wild psionic talent; every Athasian hero has at least a spark of the Way.",
    startingSlots: 1,
    startingRuleLabel: "Choose one wild psionic talent",
    byArchetype: {
      "The Gladiator": {
        starting: ["Wild Talent: Kinetic Push", "Wild Talent: Body Control", "Wild Talent: Heat Endurance", "Wild Talent: Mind Blank", "Wild Talent: Threat Sense", "Wild Talent: Pain Lock"],
        advancement: ["Psionic Discipline: Psychokinesis", "Psionic Discipline: Psychometabolism", "Arena Mind-Feint", "Harden a psionic defense", "Learn a psionic attack mode", "Body as Weapon", "Read an opponent's intent", "Ignore the pain command", "Break a mental hold", "Crowd-Fueled Focus"],
        level6: ["Mastered Wild Talent", "Psionic Duelist", "Mind over the Arena", "Break the Beast's Will", "Shield a Company Mind", "Awaken a Latent Talent", "Stand Before the Sorcerer-King"]
      },
      "The Templar": {
        starting: ["Wild Talent: Telepathic Nudge", "Wild Talent: Object Reading", "Wild Talent: Empathic Reading", "Wild Talent: Mind Blank", "Wild Talent: Commanding Glare", "Wild Talent: Sense Treachery"],
        advancement: ["Psionic Discipline: Telepathy", "Psionic Discipline: Clairsentience", "Harden a psionic defense", "Hide your talent from templar scrutiny", "Read an obsidian memory shard", "Compel a hesitant witness", "Mask a thought before inspection", "Brand a mind with authority", "Interrogate through the Way", "Borrow a bureau secret"],
        level6: ["Open the Inner Way", "Defy the Sorcerer-King's Gaze", "Seal a Thought-Crime", "Command a Court Mind", "Imperial Psionic Writ", "Shield a Company Mind", "Awaken a Latent Talent"]
      },
      "The Preserver": {
        starting: ["Wild Talent: Sense Life", "Wild Talent: Object Reading", "Wild Talent: Far Hearing", "Wild Talent: Empathic Reading", "Wild Talent: Gentle Touch", "Wild Talent: Green Memory"],
        advancement: ["Psionic Discipline: Clairsentience", "Psionic Discipline: Telepathy", "Train with a Way tutor", "Read an obsidian memory shard", "Hide your talent from templar scrutiny", "Hear the life-web", "Soothe a frightened mind", "Preserve a fading memory", "Sense defiling scars", "Quiet the spell's footprint"],
        level6: ["Mastered Wild Talent", "Open the Inner Way", "Garden of the Mind", "Restore a Burned Memory", "Shield a Company Mind", "Awaken a Latent Talent", "Defy the Sorcerer-King's Gaze"]
      },
      "The Defiler": {
        starting: ["Wild Talent: Kinetic Push", "Wild Talent: Heat Endurance", "Wild Talent: Mind Blank", "Wild Talent: Telepathic Nudge", "Wild Talent: Drain Echo", "Wild Talent: Withering Glance"],
        advancement: ["Psionic Discipline: Psychokinesis", "Psionic Discipline: Telepathy", "Learn a psionic attack mode", "Hide your talent from templar scrutiny", "Harden a psionic defense", "Overpower a lesser mind", "Feed focus from fear", "Leave a false mental trail", "Read a victim's last panic", "Burn through a ward"],
        level6: ["Mastered Wild Talent", "Open the Inner Way", "Defy the Sorcerer-King's Gaze", "Mind over the Waste", "Black Sun Thought", "Awaken a Latent Talent", "Break a Company Mind"]
      },
      "The Psionicist": {
        starting: ["Wild Talent: Telepathic Nudge", "Wild Talent: Sense Life", "Wild Talent: Kinetic Push", "Wild Talent: Body Control", "Wild Talent: Object Reading", "Wild Talent: Far Hearing", "Wild Talent: Empathic Reading", "Wild Talent: Heat Endurance", "Wild Talent: Mind Blank"],
        advancement: ["Psionic Discipline: Clairsentience", "Psionic Discipline: Psychokinesis", "Psionic Discipline: Psychometabolism", "Psionic Discipline: Psychoportation", "Psionic Discipline: Telepathy", "Train with a Way tutor", "Harden a psionic defense", "Learn a psionic attack mode", "Read an obsidian memory shard", "Open a second talent"],
        level6: ["Mastered Wild Talent", "Open the Inner Way", "Psionic Duelist", "Mind over the Waste", "Shield a Company Mind", "Awaken a Latent Talent", "Walk the Unseen Way"]
      },
      "The Dune Trader": {
        starting: ["Wild Talent: Empathic Reading", "Wild Talent: Object Reading", "Wild Talent: Far Hearing", "Wild Talent: Telepathic Nudge", "Wild Talent: Sense Water Debt", "Wild Talent: Coin Memory"],
        advancement: ["Psionic Discipline: Clairsentience", "Psionic Discipline: Telepathy", "Read an obsidian memory shard", "Hide your talent from templar scrutiny", "Harden a psionic defense", "Know the buyer's hunger", "Sense an ambush price", "Whisper across a caravan", "Seal a bargain in the Way", "Map a market rumor"],
        level6: ["Mastered Wild Talent", "Open the Inner Way", "Ledger in Every Mind", "Shield a Caravan Mind", "Awaken a Latent Talent", "Defy the Sorcerer-King's Gaze", "Mind over the Trade Road"]
      },
      "The Elemental Priest": {
        starting: ["Wild Talent: Sense Life", "Wild Talent: Heat Endurance", "Wild Talent: Body Control", "Wild Talent: Mind Blank", "Wild Talent: Elemental Murmur", "Wild Talent: Water Memory"],
        advancement: ["Psionic Discipline: Psychometabolism", "Psionic Discipline: Clairsentience", "Train with a Way tutor", "Harden a psionic defense", "Hear an elemental omen", "Endure the killing sun", "Still panic with a prayer", "Sense poison in the body", "Carry a spark through silence", "Read the ash of a place"],
        level6: ["Mastered Wild Talent", "Open the Inner Way", "Elemental Mind-Vessel", "Mind over the Waste", "Shield a Company Mind", "Awaken a Latent Talent", "Speak Where No Voice Carries"]
      },
      "The Wasteland Scout": {
        starting: ["Wild Talent: Sense Life", "Wild Talent: Far Hearing", "Wild Talent: Heat Endurance", "Wild Talent: Mind Blank", "Wild Talent: Dust-Sense", "Wild Talent: Predator's Stillness"],
        advancement: ["Psionic Discipline: Clairsentience", "Psionic Discipline: Psychoportation", "Harden a psionic defense", "Read an obsidian memory shard", "Hide your talent from templar scrutiny", "Hear pursuit through stone", "Sense water under sand", "Leave no mental spoor", "Follow a fading life-sign", "Run beyond thirst"],
        level6: ["Mastered Wild Talent", "Mind over the Waste", "Open the Inner Way", "Walk Between Heat-Shimmers", "Shield a Company Mind", "Awaken a Latent Talent", "Defy the Sorcerer-King's Gaze"]
      },
      "The Rebellious Slave": {
        starting: ["Wild Talent: Mind Blank", "Wild Talent: Body Control", "Wild Talent: Empathic Reading", "Wild Talent: Kinetic Push", "Wild Talent: Chain-Snap Focus", "Wild Talent: Hope-Spark"],
        advancement: ["Psionic Discipline: Psychometabolism", "Psionic Discipline: Telepathy", "Harden a psionic defense", "Learn a psionic attack mode", "Hide your talent from templar scrutiny", "Break a master's command", "Share courage silently", "Turn pain into motion", "Awaken a comrade's talent", "Remember the name they stole"],
        level6: ["Mastered Wild Talent", "Open the Inner Way", "Shield a Company Mind", "Awaken a Latent Talent", "Break the Collar in the Mind", "Defy the Sorcerer-King's Gaze", "Mind over the Slave-Pits"]
      }
    }
  },
  lankhmar: {
    startingText: "Also choose one Lankhmar patron: a god or cult, a guildmaster or city power-broker, or a weird alien mentor like Ningauble or Sheelba.",
    startingSlots: 1,
    startingRuleLabel: "Choose one god, guildmaster, or weird patron",
    byArchetype: {
      "The Bravo": {
        starting: ["Weird Patron: Ningauble of the Seven Eyes", "Weird Patron: Sheelba of the Eyeless Face", "God: Kos of Dooms", "Guildmaster: A Black-Toga Factor", "Guildmaster: A Duel Yard Backer", "God: The Red God of Knives"],
        advancement: ["Favor from Ningauble", "Errand for Sheelba", "Black-Toga Legal Fiction", "Temple Debt Marker", "Duelist's Witness", "Watch Sergeant's Blind Eye", "Insult That Must Be Answered", "Noble's Dirty Favor", "Old Overlord Rumor", "Street Champion's Claim"],
        level6: ["Audience with Ningauble", "Summons from Sheelba", "A God Walks in Lankhmar", "Patron's Impossible Price", "The City Itself Takes Notice", "Champion of a Street God", "Duel at the Gods' Door"]
      },
      "The Thief": {
        starting: ["Weird Patron: Ningauble of the Seven Eyes", "Guildmaster: A Thieves' Guild Whisperer", "Guildmaster: A Black-Toga Factor", "God: Mog the Spider God", "God: The Gods of Lankhmar", "Guildmaster: A Roof-Runner Crew"],
        advancement: ["Guild Password", "Rat-Run Escape", "Bazaar Fence Network", "Favor from Ningauble", "Spider-Cult Safehouse", "Black-Toga Legal Fiction", "Old Overlord Rumor", "Marked Window", "Silent Roof Bell", "Cutpurse's Map"],
        level6: ["Audience with Ningauble", "Patron's Impossible Price", "The City Itself Takes Notice", "Master Key of the Inner City", "Gods of Lankhmar Remember You", "Cult Uprising", "Vault No One Admits Exists"]
      },
      "The Dabbler": {
        starting: ["Weird Patron: Ningauble of the Seven Eyes", "Weird Patron: Sheelba of the Eyeless Face", "God: Death's Quiet Ledger", "God: Mog the Spider God", "Guildmaster: A Forbidden Bookseller", "God: The Gods of Trouble"],
        advancement: ["Favor from Ningauble", "Errand for Sheelba", "Death Owes You a Delay", "Spider-Cult Safehouse", "Old Overlord Rumor", "Black-Toga Legal Fiction", "Candle of Unwise Questions", "Borrowed Demon Name", "Ash-Smeared Ward", "Price Written in a Dream"],
        level6: ["Audience with Ningauble", "Summons from Sheelba", "Death Names a Quota", "Patron's Impossible Price", "A God Walks in Lankhmar", "Spell the City Forbids", "Door Beneath the Seventh Eye"]
      },
      "The Street Priest": {
        starting: ["God: Issek of the Jug", "God: Kos of Dooms", "God: Death's Quiet Ledger", "God: Mog the Spider God", "God: The Gods of Lankhmar", "Guildmaster: A Street Shrine Keeper"],
        advancement: ["Temple Debt Marker", "Death Owes You a Delay", "Spider-Cult Safehouse", "Cult Offering Cache", "Pilgrim's Ugly Secret", "Street Sermon Favor", "Borrowed Relic", "Gods' Coin Box", "Fickle Blessing", "Rival Priest's Shame"],
        level6: ["Death Names a Quota", "A God Walks in Lankhmar", "Cult Uprising", "The City Itself Takes Notice", "God Takes Your Face", "Miracle in a Cheap Alley", "Temple Bell That Answers"]
      },
      "The Foreign Mercenary": {
        starting: ["God: Kos of Dooms", "Guildmaster: A Black-Toga Factor", "Guildmaster: A Foreign Captain", "God: Death's Quiet Ledger", "Weird Patron: Sheelba of the Eyeless Face", "God: A Hearth-God from Home"],
        advancement: ["Black-Toga Legal Fiction", "Temple Debt Marker", "Old Overlord Rumor", "Watch Sergeant's Blind Eye", "Foreign Blade Contract", "Barracks Drinking Friend", "Caravan Guard Signal", "Mercenary Oath Marker", "Border War Tale", "Debt of Blood"],
        level6: ["Summons from Sheelba", "A God Walks in Lankhmar", "Patron's Impossible Price", "The City Itself Takes Notice", "War Band at the Gate", "Death Names a Quota", "Foreign God Answers Here"]
      },
      "The Courtesan/Dandy": {
        starting: ["Weird Patron: Ningauble of the Seven Eyes", "Guildmaster: A Black-Toga Factor", "God: Issek of the Jug", "God: The Gods of Lankhmar", "Guildmaster: A Salon of Masks", "Guildmaster: A Jealous Noble"],
        advancement: ["Favor from Ningauble", "Black-Toga Legal Fiction", "Temple Debt Marker", "Bazaar Fence Network", "Invitation No One Gets", "Scandal Ledger", "Perfumed Spy", "Masked Ball Exit", "Noble's Dirty Favor", "Whispered Vow"],
        level6: ["Audience with Ningauble", "Patron's Impossible Price", "A God Walks in Lankhmar", "The City Itself Takes Notice", "Scandal That Topples a House", "Mask Worn by a God", "Summons from Sheelba"]
      },
      "The Assassin": {
        starting: ["God: Death's Quiet Ledger", "God: Mog the Spider God", "Guildmaster: A Thieves' Guild Whisperer", "Weird Patron: Sheelba of the Eyeless Face", "Guildmaster: A Silent Contract Broker", "God: The Knife Before Dawn"],
        advancement: ["Death Owes You a Delay", "Spider-Cult Safehouse", "Guild Password", "Errand for Sheelba", "Marked Victim's Routine", "Poisoner's Mercy", "Silent Contract Seal", "Window Without a Watchman", "Body No One Finds", "Old Overlord Rumor"],
        level6: ["Death Names a Quota", "Summons from Sheelba", "Cult Uprising", "Patron's Impossible Price", "The City Itself Takes Notice", "Name Crossed from Death's Book", "A God Walks in Lankhmar"]
      },
      "The Fence": {
        starting: ["Weird Patron: Ningauble of the Seven Eyes", "Guildmaster: A Black-Toga Factor", "Guildmaster: A Thieves' Guild Whisperer", "God: The Gods of Lankhmar", "Guildmaster: A Collector of Unclean Relics", "God: Mog the Spider God"],
        advancement: ["Favor from Ningauble", "Bazaar Fence Network", "Black-Toga Legal Fiction", "Guild Password", "Old Overlord Rumor", "Appraiser's Lie", "Collector's Private Door", "Stolen Relic Provenance", "Warehouse Nobody Owns", "Temple Debt Marker"],
        level6: ["Audience with Ningauble", "Patron's Impossible Price", "The City Itself Takes Notice", "A God Walks in Lankhmar", "Vault No One Admits Exists", "Market That Opens at Midnight", "Cult Uprising"]
      },
      "The Beggar Agent": {
        starting: ["Weird Patron: Ningauble of the Seven Eyes", "God: Issek of the Jug", "God: The Gods of Lankhmar", "Guildmaster: A Beggar-King", "Guildmaster: A Thieves' Guild Whisperer", "God: The Small God Under the Step"],
        advancement: ["Favor from Ningauble", "Rat-Run Escape", "Guild Password", "Temple Debt Marker", "Old Overlord Rumor", "Beggar Sign Network", "Door No Noble Sees", "Street Child Messenger", "Soup-Line Alibi", "Crutch with a Knife Inside"],
        level6: ["Audience with Ningauble", "A God Walks in Lankhmar", "The City Itself Takes Notice", "Patron's Impossible Price", "Every Beggar Knows Your Name", "Cult Uprising", "God Beneath the Threshold"]
      }
    }
  },
  elfquest: {
    startingText: "Also choose one animal bond or companion tie; beast-kinship is available beyond the Wolfriders.",
    startingSlots: 1,
    startingRuleLabel: "Choose one animal bond",
    byArchetype: {
      "Wolfrider": {
        starting: ["Animal Bond: Pack Wolf", "Animal Bond: Hunting Hawk", "Animal Bond: River Otter", "Animal Bond: Preserver Friend", "Animal Bond: No Beast, Only Sending", "Animal Bond: Elder Wolf"],
        advancement: ["Deepen Animal Bonding", "Wolf-Bonding", "Sending", "Magic Feeling", "Pack Hunt Signal", "Read the Scent Trail", "Share the Beast's Senses", "Guard the Holt Path", "Silent Bow from Wolfback", "Soul Name Trust"],
        level6: ["Pack-Mind Call", "Ancient High One Memory", "Spirit-Sending Across the World", "Wolfpack Answers War", "Recognition Dream", "Heal What Should Not Heal", "Share the Beast's Senses"]
      },
      "Chieftain": {
        starting: ["Animal Bond: Pack Wolf", "Animal Bond: Stag or Herd-Beast", "Animal Bond: Hunting Hawk", "Animal Bond: Preserver Friend", "Animal Bond: No Beast, Only Sending", "Animal Bond: Tribe's Totem Beast"],
        advancement: ["Sending", "Magic Feeling", "Deepen Animal Bonding", "Soul Name Trust", "Recognition Dream", "Call the Tribe Together", "Hold the Blood Feud Back", "Read a Rival Chief", "Share Courage Through Sending", "Name the Holt's Need"],
        level6: ["Pack-Mind Call", "Spirit-Sending Across the World", "Ancient High One Memory", "Lead a People Through Recognition", "Shape a Living Refuge", "The Holt Moves as One", "Heal What Should Not Heal"]
      },
      "Stargazer": {
        starting: ["Animal Bond: Hunting Hawk", "Animal Bond: No Beast, Only Sending", "Animal Bond: Night Bird", "Animal Bond: Stag or Herd-Beast", "Animal Bond: Preserver Friend", "Animal Bond: Star-Marked Companion"],
        advancement: ["Sending", "Magic Feeling", "Astral Projection", "Soul Name Trust", "Recognition Dream", "Read the Sky-Road", "Hear a Far Sending", "Dream of the High Ones", "Mark the Omen Star", "See the Path Not Taken"],
        level6: ["Spirit-Sending Across the World", "Ancient High One Memory", "Share the Beast's Senses", "Star-Dream Walk", "Recognition Dream", "Pack-Mind Call", "Shape a Living Refuge"]
      },
      "Healer": {
        starting: ["Animal Bond: River Otter", "Animal Bond: Stag or Herd-Beast", "Animal Bond: Preserver Friend", "Animal Bond: No Beast, Only Sending", "Animal Bond: Gentle Den-Mate", "Animal Bond: Watchful Wolf"],
        advancement: ["Healing", "Flesh-Shaping", "Sending", "Magic Feeling", "Soul Name Trust", "Recognition Dream", "Ease a Beast's Pain", "Draw Venom from Blood", "Calm the Wounded Mind", "Mend a Broken Bond"],
        level6: ["Heal What Should Not Heal", "Spirit-Sending Across the World", "Ancient High One Memory", "Recognition Dream", "Share the Beast's Senses", "Shape a Living Refuge", "Life Answers Your Hands"]
      },
      "Glider": {
        starting: ["Animal Bond: Hunting Hawk", "Animal Bond: No Beast, Only Sending", "Animal Bond: High Aerie Bird", "Animal Bond: Preserver Friend", "Animal Bond: Stag or Herd-Beast", "Animal Bond: Distant White Wing"],
        advancement: ["Astral Projection", "Sending", "Magic Feeling", "Soul Name Trust", "Glide Beyond Sight", "Hear the High Air", "Dream of Blue Mountain", "Stillness Above Fear", "Far-Eye Warning", "Recognition Dream"],
        level6: ["Spirit-Sending Across the World", "Ancient High One Memory", "Share the Beast's Senses", "High One Memory Wakes", "Sky-Mind Call", "Shape a Living Refuge", "Recognition Dream"]
      },
      "Preserver Sprite": {
        starting: ["Animal Bond: Preserver Friend", "Animal Bond: River Otter", "Animal Bond: Hunting Hawk", "Animal Bond: No Beast, Only Sending", "Animal Bond: Tiny Den-Critter", "Animal Bond: Silk-Wrapped Beetle"],
        advancement: ["Deepen Animal Bonding", "Sending", "Magic Feeling", "Preserver Wrap-Stuff", "Laugh Away Danger", "Remember a Wrapped Thing", "Buzz a Warning", "Share a Tiny Secret", "Tangle a Pursuer", "Soul Name Trust"],
        level6: ["Spirit-Sending Across the World", "Ancient High One Memory", "Shape a Living Refuge", "Preserver Swarm Answers", "Pack-Mind Call", "Share the Beast's Senses", "Heal What Should Not Heal"]
      },
      "Rock-Shaper": {
        starting: ["Animal Bond: Cave Lizard", "Animal Bond: Pack Wolf", "Animal Bond: No Beast, Only Sending", "Animal Bond: Preserver Friend", "Animal Bond: Stone-Burrower", "Animal Bond: Deep Cave Moth"],
        advancement: ["Rock-Shaping", "Magic Feeling", "Sending", "Soul Name Trust", "Shape a Shelter Wall", "Hear Stone Memory", "Find the Hidden Spring", "Read a Cave's Temper", "Seal a Dangerous Passage", "Recognition Dream"],
        level6: ["Stone Answers Your Hands", "Ancient High One Memory", "Shape a Living Refuge", "Spirit-Sending Across the World", "Share the Beast's Senses", "Cavern Opens Like a Hand", "Heal What Should Not Heal"]
      },
      "Sun-Folk Villager": {
        starting: ["Animal Bond: Desert Runner", "Animal Bond: Stag or Herd-Beast", "Animal Bond: Hunting Hawk", "Animal Bond: No Beast, Only Sending", "Animal Bond: Sand-Cat", "Animal Bond: Oasis Lizard"],
        advancement: ["Fire-Starting", "Sending", "Magic Feeling", "Soul Name Trust", "Desert Path Memory", "Share Water Wisdom", "Read the Heat Haze", "Call a Sun-Folk Circle", "Recognition Dream", "Shelter Under Burning Light"],
        level6: ["Spirit-Sending Across the World", "Ancient High One Memory", "Shape a Living Refuge", "Sun-Flame Answers", "Share the Beast's Senses", "Recognition Dream", "Heal What Should Not Heal"]
      },
      "Huntress": {
        starting: ["Animal Bond: Pack Wolf", "Animal Bond: Hunting Hawk", "Animal Bond: Great Cat", "Animal Bond: River Otter", "Animal Bond: No Beast, Only Sending", "Animal Bond: Silent Stalker"],
        advancement: ["Deepen Animal Bonding", "Wolf-Bonding", "Sending", "Magic Feeling", "Read the Scent Trail", "Strike from Brush", "Share the Beast's Senses", "Track Across Stone", "Hunt Without Killing", "Soul Name Trust"],
        level6: ["Pack-Mind Call", "Share the Beast's Senses", "Spirit-Sending Across the World", "Ancient High One Memory", "Great Hunt Dream", "Recognition Dream", "Heal What Should Not Heal"]
      }
    }
  }
};

const CORE_STONETOP_MOVES = {
  "The Blessed": {
    startingText: "Start with Spirit Tongue, Call the Spirits, one background move, and one pre-6 Blessed move.",
    startingSlots: 1,
    startingRules: [],
    fixed: ["Spirit Tongue", "Call the Spirits"],
    starting: ["Trackless Step", "Veil", "Wards & Bindings", "Wild Soul", "Borrow Power", "Into the Lion's Den", "Lightning Rod", "Rites of the Land"],
    advancement: ["Trackless Step", "Veil", "Wards & Bindings", "Wild Soul", "Borrow Power", "Into the Lion's Den", "Lightning Rod", "Rites of the Land", "Improved Stat"],
    level6: ["Voice of the Earth Mother", "Nature's Wrath", "Potent Workings", "Shared Souls", "Suck the Poison Out", "Superior Stat"]
  },
  "The Fox": {
    startingText: "Start with Ambush or Skill at Arms; Danger Sense or Perceptive; and one additional pre-6 Fox move.",
    startingSlots: 3,
    startingRules: [
      { label: "Choose Ambush or Skill at Arms", min: 1, moves: ["Ambush", "Skill at Arms"] },
      { label: "Choose Danger Sense or Perceptive", min: 1, moves: ["Danger Sense", "Perceptive"] }
    ],
    fixed: [],
    starting: ["Ambush", "Skill at Arms", "Danger Sense", "Perceptive", "Rapier Wit", "Parry & Riposte", "Silver Tongued", "Under Your Skin", "Free Running", "Irresistible", "Laugh at Danger", "Light Fingers"],
    advancement: ["Ambush", "Skill at Arms", "Danger Sense", "Perceptive", "Rapier Wit", "Parry & Riposte", "Silver Tongued", "Under Your Skin", "Free Running", "Improved Stat", "Irresistible", "Laugh at Danger", "Light Fingers"],
    level6: ["Battle Dancer", "Cheap Shot", "Eye on the Door", "Pants on Fire", "Second Intent", "Slippery", "Superior Stat"]
  },
  "The Heavy": {
    startingText: "Start with Dangerous, Hard to Kill, and either Armored or Uncanny Reflexes.",
    startingSlots: 1,
    startingRules: [
      { label: "Choose Armored or Uncanny Reflexes", min: 1, max: 1, moves: ["Armored", "Uncanny Reflexes"] }
    ],
    fixed: ["Dangerous", "Hard to Kill"],
    starting: ["Armored", "Uncanny Reflexes"],
    advancement: ["Armored", "Uncanny Reflexes", "Payback", "Relentless", "Seasoned Warrior", "Situational Awareness", "Unfettered", "Terror on the Field", "Frosty", "Guardian", "Improved Stat", "Intimidating"],
    level6: ["Bringer of Ruin", "Cut from Granite", "Mighty Thews", "Nemesis", "Steadfast Guardian", "Stone Cold", "Superior Stat"]
  },
  "The Judge": {
    startingText: "Start with Censure, Chronicler of Stonetop, and two pre-6 Judge moves.",
    startingSlots: 2,
    startingRules: [],
    fixed: ["Censure", "Chronicler of Stonetop"],
    starting: ["The Hammer and the Book", "Truth or Consequences", "Binding Arbitration", "Vision Unclouded", "Well-Read", "Aegis of Faith", "Armored", "Bear Witness", "Break Bread", "Bulwark"],
    advancement: ["The Hammer and the Book", "Truth or Consequences", "Binding Arbitration", "Vision Unclouded", "Well-Read", "Aegis of Faith", "Armored", "Bear Witness", "Break Bread", "Bulwark", "Castigate", "For the Greater Good", "Hound of Aratis", "Like a Dog with a Bone", "Improved Stat", "Knowledge is Power", "Many Hands Make Light Work", "A Bundle of Sticks Unbroken"],
    level6: ["A Mighty Rampart", "Armistice", "Condemn", "Proclamation", "Mirrorshield", "The Tower Eternal", "Superior Stat"]
  },
  "The Lightbearer": {
    startingText: "Start with Consecrated Flame, Invoke the Sun God, and one pre-6 Lightbearer move.",
    startingSlots: 1,
    startingRules: [],
    fixed: ["Consecrated Flame", "Invoke the Sun God"],
    starting: ["A Candle Against the Dark", "Luminous Shield", "All is Illuminated", "And Behold a Pale Horse", "Keep the Home-Fires Burning", "Lamplighter", "Piety", "Purifying Flames", "Radiant Countenance", "Rise Like the Sun"],
    advancement: ["A Candle Against the Dark", "Luminous Shield", "All is Illuminated", "And Behold a Pale Horse", "Keep the Home-Fires Burning", "Lamplighter", "Piety", "Purifying Flames", "Radiant Countenance", "Rise Like the Sun", "Spring's First Thaw", "Fire Within", "Guiding Light", "Helior's Unblinking Eye", "Improved Stat"],
    level6: ["Wielder of the White Flame", "Burn Twice as Bright", "Empowered Invocations", "Glorious Servant", "Hungry Flames", "Light, More Light", "Superior Stat"]
  },
  "The Marshal": {
    startingText: "Start with Crew, Logistics, background moves, and one pre-6 Marshal move.",
    startingSlots: 1,
    startingRules: [],
    fixed: ["Crew", "Logistics"],
    starting: ["Sir, Permission to Die, Sir", "Speak Softly", "Stentorian", "Take the Measure", "We Happy Few", "Armored", "Veteran Crew", "Front Line Leader", "Read the Land", "Set-Up Strike", "Shake It Off", "Shield Wall"],
    advancement: ["Sir, Permission to Die, Sir", "Speak Softly", "Stentorian", "Take the Measure", "We Happy Few", "Armored", "Arts of War", "Veteran Crew", "Front Line Leader", "Improved Stat", "Read the Land", "Prepare a Welcome", "Set-Up Strike", "Shake It Off", "Shield Wall"],
    level6: ["Battlefield Grace", "Heroes to the Last", "Focus Fire", "Like an Open Book", "Noble Mien", "Peace Through Strength", "Superior Stat"]
  },
  "The Ranger": {
    startingText: "Start with Home on the Range, background moves, and one pre-6 Ranger move.",
    startingSlots: 1,
    startingRules: [],
    fixed: ["Home on the Range"],
    starting: ["Predator", "Sniff Out Corruption", "Stalker", "Survivalist", "Warden of the Wild", "Wild Speech", "Expert Tracker", "Mental Map", "Naturalist", "On the Hoof", "Pack Horse", "Pathfinder"],
    advancement: ["Predator", "Sniff Out Corruption", "Stalker", "Survivalist", "Warden of the Wild", "Wild Speech", "Worldly", "Expert Tracker", "Improved Stat", "Mental Map", "Naturalist", "On the Hoof", "Pack Horse", "Pathfinder"],
    level6: ["Alpha", "Beast of Legend", "Constant Vigilance", "Giant Slayer", "Trailblazer", "Walk It Off", "Superior Stat"]
  },
  "The Seeker": {
    startingText: "Start with Well Versed, Work With What You've Got, and one background move.",
    startingSlots: 0,
    startingRules: [],
    fixed: ["Well Versed", "Work With What You've Got"],
    starting: [],
    advancement: ["Quick Study", "Safety First", "Sage Advice", "Well Versed", "Work With What You've Got", "Initiate of the Secret Arts", "Let's Make a Deal", "Logbook", "Magpie", "Never at a Loss", "Polyglot", "Cryptologist"],
    level6: ["Arcane Adept", "Deep Insight", "Improvise", "Mind Over Magic", "Overchannel", "Proof Against Detection", "Superior Stat"]
  },
  "The Would-be Hero": {
    startingText: "Start with Anger is a Gift, Potential for Greatness, and two pre-6 Would-be Hero moves.",
    startingSlots: 2,
    startingRules: [],
    fixed: ["Anger is a Gift", "Potential for Greatness"],
    starting: ["Resourceful", "Something to Remember Me By", "Tough Love", "Underestimated", "Up With People", "Versatile"],
    advancement: ["Resourceful", "Something to Remember Me By", "Tough Love", "Underestimated", "Up With People", "Versatile"],
    level6: ["A Force to Be Reckoned With", "Big Damn Hero", "Undaunted", "Superior Stat (Potential for Greatness)"]
  }
};

function normalizeName(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function sentenceCaseFallback(name) {
  return `Core Stonetop move: ${name}.`;
}

function descriptionIndex(arch) {
  const index = new Map();
  [...(arch.signature_moves || []), ...(arch.choice_moves || [])].forEach((move) => {
    index.set(normalizeName(move.name), move.description || move.text || "");
  });
  return index;
}

function moveFromName(name, descriptions, extra = {}) {
  return {
    name,
    description: descriptions.get(normalizeName(name)) || sentenceCaseFallback(name),
    ...extra
  };
}

function syntheticMove(text, extra = {}) {
  return {
    name: text.replace(/\.$/, ""),
    description: text,
    synthetic: true,
    ...extra
  };
}

function splitLevelSix(moves) {
  const level6 = [];
  const lower = [];
  moves.forEach((move) => {
    if (/Requires level 6\+/i.test(move.description || move.text || "")) {
      level6.push(move);
    } else {
      lower.push(move);
    }
  });
  return { lower, level6 };
}

function resolveCampaignSupplement(campaign, arch) {
  if (!campaign) return null;
  const supplement = CAMPAIGN_SUPPLEMENTS[campaign.id];
  if (!supplement) return null;
  const archetypeSupplement = supplement.byArchetype && supplement.byArchetype[arch.name]
    ? supplement.byArchetype[arch.name]
    : {};
  return {
    startingText: supplement.startingText,
    startingSlots: supplement.startingSlots || 0,
    startingRuleLabel: supplement.startingRuleLabel,
    starting: archetypeSupplement.starting || supplement.starting || [],
    advancement: archetypeSupplement.advancement || supplement.advancement || [],
    level6: archetypeSupplement.level6 || supplement.level6 || []
  };
}

export function getMoveGroups(arch, campaign) {
  const descriptions = descriptionIndex(arch);
  const core = campaign && campaign.id === "stonetop" ? CORE_STONETOP_MOVES[arch.name] : null;
  if (core) {
    return {
      startingText: core.startingText,
      startingSlots: core.startingSlots,
      startingRules: core.startingRules || [],
      fixed: core.fixed.map((name) => moveFromName(name, descriptions, { category: "fixed" })),
      starting: core.starting.map((name) => moveFromName(name, descriptions, { category: "starting" })),
      advancement: core.advancement.map((name) => moveFromName(name, descriptions, { category: "advancement" })),
      level6: core.level6.map((name) => moveFromName(name, descriptions, { category: "level6", locked: true }))
    };
  }

  const supplement = resolveCampaignSupplement(campaign, arch);
  const fixed = (arch.signature_moves || []).map((move) => ({ ...move, category: "fixed" }));
  const { lower, level6 } = splitLevelSix(arch.choice_moves || []);
  const baseStartingSlots = Math.min(DEFAULT_STARTING_CHOICE_COUNT, lower.length);
  const supplementStartingSlots = supplement ? supplement.startingSlots || 0 : 0;
  const startingSlots = baseStartingSlots + supplementStartingSlots;
  const starting = lower
    .slice(0, baseStartingSlots)
    .map((move) => ({ ...move, category: "starting" }))
    .concat((supplement && supplement.starting ? supplement.starting : [])
      .map((text) => syntheticMove(text, { category: "starting" })));
  const advancement = lower.slice(baseStartingSlots).map((move) => ({ ...move, category: "advancement" }));
  const basicAdvancement = (arch.advancement && arch.advancement.basic ? arch.advancement.basic : [])
    .map((text) => syntheticMove(text, { category: "advancement" }));
  const advancedAdvancement = (arch.advancement && arch.advancement.advanced ? arch.advancement.advanced : [])
    .map((text) => syntheticMove(text, { category: "level6", locked: true }));
  const supplementalAdvancement = (supplement && supplement.advancement ? supplement.advancement : [])
    .map((text) => syntheticMove(text, { category: "advancement" }));
  const supplementalLevel6 = (supplement && supplement.level6 ? supplement.level6 : [])
    .map((text) => syntheticMove(text, { category: "level6", locked: true }));
  const startingRules = supplement && supplementStartingSlots
    ? [{
      label: supplement.startingRuleLabel || `Choose ${supplementStartingSlots} campaign option${supplementStartingSlots === 1 ? "" : "s"}`,
      min: supplementStartingSlots,
      max: supplementStartingSlots,
      moves: supplement.starting || []
    }]
    : [];
  const baseStartingText = baseStartingSlots
    ? `Choose ${baseStartingSlots} starting move${baseStartingSlots === 1 ? "" : "s"} at character creation.`
    : "No additional archetype starting move choices.";

  return {
    startingText: supplement ? `${baseStartingText} ${supplement.startingText}` : baseStartingText,
    startingSlots,
    startingRules,
    fixed,
    starting,
    advancement: advancement.concat(basicAdvancement, supplementalAdvancement),
    level6: level6.map((move) => ({ ...move, category: "level6", locked: true })).concat(advancedAdvancement, supplementalLevel6)
  };
}

export function getMoveGroupSummary(arch, campaign) {
  const groups = getMoveGroups(arch, campaign);
  return {
    fixed: groups.fixed.length,
    starting: groups.starting.length,
    startingSlots: groups.startingSlots,
    advancement: groups.advancement.length,
    level6: groups.level6.length
  };
}

export function validateStartingChoices(groups, selectedMoveNames, options = {}) {
  const selected = new Set(selectedMoveNames || []);
  const selectedCount = selected.size;
  const slotCount = groups.startingSlots || 0;
  const requireComplete = !!options.requireComplete;

  if (selectedCount > slotCount) {
    return {
      ok: false,
      message: `Choose no more than ${slotCount} starting move${slotCount === 1 ? "" : "s"}.`
    };
  }

  for (const rule of groups.startingRules || []) {
    const count = (rule.moves || []).filter((name) => selected.has(name)).length;
    if (rule.max != null && count > rule.max) {
      return { ok: false, message: rule.label || `Choose no more than ${rule.max} from this group.` };
    }
    if (requireComplete && rule.min != null && count < rule.min) {
      return { ok: false, message: rule.label || `Choose at least ${rule.min} from this group.` };
    }
  }

  if (requireComplete && selectedCount < slotCount) {
    return {
      ok: false,
      message: `Choose ${slotCount} starting move${slotCount === 1 ? "" : "s"} before saving.`
    };
  }

  return { ok: true, message: "" };
}
