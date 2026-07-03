const DEFAULT_STARTING_CHOICE_COUNT = 2;

const CAMPAIGN_SUPPLEMENTS = {
  darksun: {
    startingText: "Also choose one free wild psionic talent; every Athasian hero has at least a spark of the Way.",
    startingSlots: 1,
    startingRuleLabel: "Choose one wild psionic talent",
    byArchetype: {
      "Gladiator": {
        starting: ["Wild Talent: Kinetic Push", "Wild Talent: Body Control", "Wild Talent: Heat Endurance", "Wild Talent: Mind Blank", "Wild Talent: Threat Sense", "Wild Talent: Pain Lock"],
        advancement: ["Psionic Discipline: Psychokinesis", "Psionic Discipline: Psychometabolism", "Arena Mind-Feint", "Harden a psionic defense", "Learn a psionic attack mode", "Body as Weapon", "Read an opponent's intent", "Ignore the pain command", "Break a mental hold", "Crowd-Fueled Focus"],
        level6: ["Mastered Wild Talent", "Psionic Duelist", "Mind over the Arena", "Break the Beast's Will", "Shield a Company Mind", "Awaken a Latent Talent", "Stand Before the Sorcerer-King"]
      },
      "Templar": {
        starting: ["Wild Talent: Telepathic Nudge", "Wild Talent: Object Reading", "Wild Talent: Empathic Reading", "Wild Talent: Mind Blank", "Wild Talent: Commanding Glare", "Wild Talent: Sense Treachery"],
        advancement: ["Psionic Discipline: Telepathy", "Psionic Discipline: Clairsentience", "Harden a psionic defense", "Hide your talent from templar scrutiny", "Read an obsidian memory shard", "Compel a hesitant witness", "Mask a thought before inspection", "Brand a mind with authority", "Interrogate through the Way", "Borrow a bureau secret"],
        level6: ["Open the Inner Way", "Defy the Sorcerer-King's Gaze", "Seal a Thought-Crime", "Command a Court Mind", "Imperial Psionic Writ", "Shield a Company Mind", "Awaken a Latent Talent"]
      },
      "Preserver": {
        starting: ["Wild Talent: Sense Life", "Wild Talent: Object Reading", "Wild Talent: Far Hearing", "Wild Talent: Empathic Reading", "Wild Talent: Gentle Touch", "Wild Talent: Green Memory"],
        advancement: ["Psionic Discipline: Clairsentience", "Psionic Discipline: Telepathy", "Train with a Way tutor", "Read an obsidian memory shard", "Hide your talent from templar scrutiny", "Hear the life-web", "Soothe a frightened mind", "Preserve a fading memory", "Sense defiling scars", "Quiet the spell's footprint"],
        level6: ["Mastered Wild Talent", "Open the Inner Way", "Garden of the Mind", "Restore a Burned Memory", "Shield a Company Mind", "Awaken a Latent Talent", "Defy the Sorcerer-King's Gaze"]
      },
      "Defiler": {
        starting: ["Wild Talent: Kinetic Push", "Wild Talent: Heat Endurance", "Wild Talent: Mind Blank", "Wild Talent: Telepathic Nudge", "Wild Talent: Drain Echo", "Wild Talent: Withering Glance"],
        advancement: ["Psionic Discipline: Psychokinesis", "Psionic Discipline: Telepathy", "Learn a psionic attack mode", "Hide your talent from templar scrutiny", "Harden a psionic defense", "Overpower a lesser mind", "Feed focus from fear", "Leave a false mental trail", "Read a victim's last panic", "Burn through a ward"],
        level6: ["Mastered Wild Talent", "Open the Inner Way", "Defy the Sorcerer-King's Gaze", "Mind over the Waste", "Black Sun Thought", "Awaken a Latent Talent", "Break a Company Mind"]
      },
      "Psionicist": {
        starting: ["Wild Talent: Telepathic Nudge", "Wild Talent: Sense Life", "Wild Talent: Kinetic Push", "Wild Talent: Body Control", "Wild Talent: Object Reading", "Wild Talent: Far Hearing", "Wild Talent: Empathic Reading", "Wild Talent: Heat Endurance", "Wild Talent: Mind Blank"],
        advancement: ["Psionic Discipline: Clairsentience", "Psionic Discipline: Psychokinesis", "Psionic Discipline: Psychometabolism", "Psionic Discipline: Psychoportation", "Psionic Discipline: Telepathy", "Train with a Way tutor", "Harden a psionic defense", "Learn a psionic attack mode", "Read an obsidian memory shard", "Open a second talent"],
        level6: ["Mastered Wild Talent", "Open the Inner Way", "Psionic Duelist", "Mind over the Waste", "Shield a Company Mind", "Awaken a Latent Talent", "Walk the Unseen Way"]
      },
      "Dune Trader": {
        starting: ["Wild Talent: Empathic Reading", "Wild Talent: Object Reading", "Wild Talent: Far Hearing", "Wild Talent: Telepathic Nudge", "Wild Talent: Sense Water Debt", "Wild Talent: Coin Memory"],
        advancement: ["Psionic Discipline: Clairsentience", "Psionic Discipline: Telepathy", "Read an obsidian memory shard", "Hide your talent from templar scrutiny", "Harden a psionic defense", "Know the buyer's hunger", "Sense an ambush price", "Whisper across a caravan", "Seal a bargain in the Way", "Map a market rumor"],
        level6: ["Mastered Wild Talent", "Open the Inner Way", "Ledger in Every Mind", "Shield a Caravan Mind", "Awaken a Latent Talent", "Defy the Sorcerer-King's Gaze", "Mind over the Trade Road"]
      },
      "Elemental Priest": {
        starting: ["Wild Talent: Sense Life", "Wild Talent: Heat Endurance", "Wild Talent: Body Control", "Wild Talent: Mind Blank", "Wild Talent: Elemental Murmur", "Wild Talent: Water Memory"],
        advancement: ["Psionic Discipline: Psychometabolism", "Psionic Discipline: Clairsentience", "Train with a Way tutor", "Harden a psionic defense", "Hear an elemental omen", "Endure the killing sun", "Still panic with a prayer", "Sense poison in the body", "Carry a spark through silence", "Read the ash of a place"],
        level6: ["Mastered Wild Talent", "Open the Inner Way", "Elemental Mind-Vessel", "Mind over the Waste", "Shield a Company Mind", "Awaken a Latent Talent", "Speak Where No Voice Carries"]
      },
      "Wasteland Scout": {
        starting: ["Wild Talent: Sense Life", "Wild Talent: Far Hearing", "Wild Talent: Heat Endurance", "Wild Talent: Mind Blank", "Wild Talent: Dust-Sense", "Wild Talent: Predator's Stillness"],
        advancement: ["Psionic Discipline: Clairsentience", "Psionic Discipline: Psychoportation", "Harden a psionic defense", "Read an obsidian memory shard", "Hide your talent from templar scrutiny", "Hear pursuit through stone", "Sense water under sand", "Leave no mental spoor", "Follow a fading life-sign", "Run beyond thirst"],
        level6: ["Mastered Wild Talent", "Mind over the Waste", "Open the Inner Way", "Walk Between Heat-Shimmers", "Shield a Company Mind", "Awaken a Latent Talent", "Defy the Sorcerer-King's Gaze"]
      },
      "Rebellious Slave": {
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
      "Bravo": {
        starting: ["Weird Patron: Ningauble of the Seven Eyes", "Weird Patron: Sheelba of the Eyeless Face", "God: Kos of Dooms", "Guildmaster: A Black-Toga Factor", "Guildmaster: A Duel Yard Backer", "God: The Red God of Knives"],
        advancement: ["Favor from Ningauble", "Errand for Sheelba", "Black-Toga Legal Fiction", "Temple Debt Marker", "Duelist's Witness", "Watch Sergeant's Blind Eye", "Insult That Must Be Answered", "Noble's Dirty Favor", "Old Overlord Rumor", "Street Champion's Claim"],
        level6: ["Audience with Ningauble", "Summons from Sheelba", "A God Walks in Lankhmar", "Patron's Impossible Price", "The City Itself Takes Notice", "Champion of a Street God", "Duel at the Gods' Door"]
      },
      "Thief": {
        starting: ["Weird Patron: Ningauble of the Seven Eyes", "Guildmaster: A Thieves' Guild Whisperer", "Guildmaster: A Black-Toga Factor", "God: Mog the Spider God", "God: The Gods of Lankhmar", "Guildmaster: A Roof-Runner Crew"],
        advancement: ["Guild Password", "Rat-Run Escape", "Bazaar Fence Network", "Favor from Ningauble", "Spider-Cult Safehouse", "Black-Toga Legal Fiction", "Old Overlord Rumor", "Marked Window", "Silent Roof Bell", "Cutpurse's Map"],
        level6: ["Audience with Ningauble", "Patron's Impossible Price", "The City Itself Takes Notice", "Master Key of the Inner City", "Gods of Lankhmar Remember You", "Cult Uprising", "Vault No One Admits Exists"]
      },
      "Dabbler": {
        starting: ["Weird Patron: Ningauble of the Seven Eyes", "Weird Patron: Sheelba of the Eyeless Face", "God: Death's Quiet Ledger", "God: Mog the Spider God", "Guildmaster: A Forbidden Bookseller", "God: The Gods of Trouble"],
        advancement: ["Favor from Ningauble", "Errand for Sheelba", "Death Owes You a Delay", "Spider-Cult Safehouse", "Old Overlord Rumor", "Black-Toga Legal Fiction", "Candle of Unwise Questions", "Borrowed Demon Name", "Ash-Smeared Ward", "Price Written in a Dream"],
        level6: ["Audience with Ningauble", "Summons from Sheelba", "Death Names a Quota", "Patron's Impossible Price", "A God Walks in Lankhmar", "Spell the City Forbids", "Door Beneath the Seventh Eye"]
      },
      "Street Priest": {
        starting: ["God: Issek of the Jug", "God: Kos of Dooms", "God: Death's Quiet Ledger", "God: Mog the Spider God", "God: The Gods of Lankhmar", "Guildmaster: A Street Shrine Keeper"],
        advancement: ["Temple Debt Marker", "Death Owes You a Delay", "Spider-Cult Safehouse", "Cult Offering Cache", "Pilgrim's Ugly Secret", "Street Sermon Favor", "Borrowed Relic", "Gods' Coin Box", "Fickle Blessing", "Rival Priest's Shame"],
        level6: ["Death Names a Quota", "A God Walks in Lankhmar", "Cult Uprising", "The City Itself Takes Notice", "God Takes Your Face", "Miracle in a Cheap Alley", "Temple Bell That Answers"]
      },
      "Foreign Mercenary": {
        starting: ["God: Kos of Dooms", "Guildmaster: A Black-Toga Factor", "Guildmaster: A Foreign Captain", "God: Death's Quiet Ledger", "Weird Patron: Sheelba of the Eyeless Face", "God: A Hearth-God from Home"],
        advancement: ["Black-Toga Legal Fiction", "Temple Debt Marker", "Old Overlord Rumor", "Watch Sergeant's Blind Eye", "Foreign Blade Contract", "Barracks Drinking Friend", "Caravan Guard Signal", "Mercenary Oath Marker", "Border War Tale", "Debt of Blood"],
        level6: ["Summons from Sheelba", "A God Walks in Lankhmar", "Patron's Impossible Price", "The City Itself Takes Notice", "War Band at the Gate", "Death Names a Quota", "Foreign God Answers Here"]
      },
      "Courtesan/Dandy": {
        starting: ["Weird Patron: Ningauble of the Seven Eyes", "Guildmaster: A Black-Toga Factor", "God: Issek of the Jug", "God: The Gods of Lankhmar", "Guildmaster: A Salon of Masks", "Guildmaster: A Jealous Noble"],
        advancement: ["Favor from Ningauble", "Black-Toga Legal Fiction", "Temple Debt Marker", "Bazaar Fence Network", "Invitation No One Gets", "Scandal Ledger", "Perfumed Spy", "Masked Ball Exit", "Noble's Dirty Favor", "Whispered Vow"],
        level6: ["Audience with Ningauble", "Patron's Impossible Price", "A God Walks in Lankhmar", "The City Itself Takes Notice", "Scandal That Topples a House", "Mask Worn by a God", "Summons from Sheelba"]
      },
      "Assassin": {
        starting: ["God: Death's Quiet Ledger", "God: Mog the Spider God", "Guildmaster: A Thieves' Guild Whisperer", "Weird Patron: Sheelba of the Eyeless Face", "Guildmaster: A Silent Contract Broker", "God: The Knife Before Dawn"],
        advancement: ["Death Owes You a Delay", "Spider-Cult Safehouse", "Guild Password", "Errand for Sheelba", "Marked Victim's Routine", "Poisoner's Mercy", "Silent Contract Seal", "Window Without a Watchman", "Body No One Finds", "Old Overlord Rumor"],
        level6: ["Death Names a Quota", "Summons from Sheelba", "Cult Uprising", "Patron's Impossible Price", "The City Itself Takes Notice", "Name Crossed from Death's Book", "A God Walks in Lankhmar"]
      },
      "Fence": {
        starting: ["Weird Patron: Ningauble of the Seven Eyes", "Guildmaster: A Black-Toga Factor", "Guildmaster: A Thieves' Guild Whisperer", "God: The Gods of Lankhmar", "Guildmaster: A Collector of Unclean Relics", "God: Mog the Spider God"],
        advancement: ["Favor from Ningauble", "Bazaar Fence Network", "Black-Toga Legal Fiction", "Guild Password", "Old Overlord Rumor", "Appraiser's Lie", "Collector's Private Door", "Stolen Relic Provenance", "Warehouse Nobody Owns", "Temple Debt Marker"],
        level6: ["Audience with Ningauble", "Patron's Impossible Price", "The City Itself Takes Notice", "A God Walks in Lankhmar", "Vault No One Admits Exists", "Market That Opens at Midnight", "Cult Uprising"]
      },
      "Beggar Agent": {
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
  "Blessed": {
    startingText: "Start with Spirit Tongue, Call the Spirits, one background move, and one pre-6 Blessed move.",
    startingSlots: 1,
    startingRules: [],
    fixed: ["Spirit Tongue", "Call the Spirits"],
    starting: ["Trackless Step", "Veil", "Wards & Bindings", "Wild Soul", "Borrow Power", "Into the Lion's Den", "Lightning Rod", "Rites of the Land"],
    advancement: ["Trackless Step", "Veil", "Wards & Bindings", "Wild Soul", "Borrow Power", "Into the Lion's Den", "Lightning Rod", "Rites of the Land", "Improved Stat"],
    level6: ["Voice of the Earth Mother", "Nature's Wrath", "Potent Workings", "Shared Souls", "Suck the Poison Out", "Superior Stat"]
  },
  "Fox": {
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
  "Heavy": {
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
  "Judge": {
    startingText: "Start with Censure, Chronicler of Stonetop, and two pre-6 Judge moves.",
    startingSlots: 2,
    startingRules: [],
    fixed: ["Censure", "Chronicler of Stonetop"],
    starting: ["The Hammer and the Book", "Truth or Consequences", "Binding Arbitration", "Vision Unclouded", "Well-Read", "Aegis of Faith", "Armored", "Bear Witness", "Break Bread", "Bulwark"],
    advancement: ["The Hammer and the Book", "Truth or Consequences", "Binding Arbitration", "Vision Unclouded", "Well-Read", "Aegis of Faith", "Armored", "Bear Witness", "Break Bread", "Bulwark", "Castigate", "For the Greater Good", "Hound of Aratis", "Like a Dog with a Bone", "Improved Stat", "Knowledge is Power", "Many Hands Make Light Work", "A Bundle of Sticks Unbroken"],
    level6: ["A Mighty Rampart", "Armistice", "Condemn", "Proclamation", "Mirrorshield", "The Tower Eternal", "Superior Stat"]
  },
  "Lightbearer": {
    startingText: "Start with Consecrated Flame, Invoke the Sun God, and one pre-6 Lightbearer move.",
    startingSlots: 1,
    startingRules: [],
    fixed: ["Consecrated Flame", "Invoke the Sun God"],
    starting: ["A Candle Against the Dark", "Luminous Shield", "All is Illuminated", "And Behold a Pale Horse", "Keep the Home-Fires Burning", "Lamplighter", "Piety", "Purifying Flames", "Radiant Countenance", "Rise Like the Sun"],
    advancement: ["A Candle Against the Dark", "Luminous Shield", "All is Illuminated", "And Behold a Pale Horse", "Keep the Home-Fires Burning", "Lamplighter", "Piety", "Purifying Flames", "Radiant Countenance", "Rise Like the Sun", "Spring's First Thaw", "Fire Within", "Guiding Light", "Helior's Unblinking Eye", "Improved Stat"],
    level6: ["Wielder of the White Flame", "Burn Twice as Bright", "Empowered Invocations", "Glorious Servant", "Hungry Flames", "Light, More Light", "Superior Stat"]
  },
  "Marshal": {
    startingText: "Start with Crew, Logistics, background moves, and one pre-6 Marshal move.",
    startingSlots: 1,
    startingRules: [],
    fixed: ["Crew", "Logistics"],
    starting: ["Sir, Permission to Die, Sir", "Speak Softly", "Stentorian", "Take the Measure", "We Happy Few", "Armored", "Veteran Crew", "Front Line Leader", "Read the Land", "Set-Up Strike", "Shake It Off", "Shield Wall"],
    advancement: ["Sir, Permission to Die, Sir", "Speak Softly", "Stentorian", "Take the Measure", "We Happy Few", "Armored", "Arts of War", "Veteran Crew", "Front Line Leader", "Improved Stat", "Read the Land", "Prepare a Welcome", "Set-Up Strike", "Shake It Off", "Shield Wall"],
    level6: ["Battlefield Grace", "Heroes to the Last", "Focus Fire", "Like an Open Book", "Noble Mien", "Peace Through Strength", "Superior Stat"]
  },
  "Ranger": {
    startingText: "Start with Home on the Range, background moves, and one pre-6 Ranger move.",
    startingSlots: 1,
    startingRules: [],
    fixed: ["Home on the Range"],
    starting: ["Predator", "Sniff Out Corruption", "Stalker", "Survivalist", "Warden of the Wild", "Wild Speech", "Expert Tracker", "Mental Map", "Naturalist", "On the Hoof", "Pack Horse", "Pathfinder"],
    advancement: ["Predator", "Sniff Out Corruption", "Stalker", "Survivalist", "Warden of the Wild", "Wild Speech", "Worldly", "Expert Tracker", "Improved Stat", "Mental Map", "Naturalist", "On the Hoof", "Pack Horse", "Pathfinder"],
    level6: ["Alpha", "Beast of Legend", "Constant Vigilance", "Giant Slayer", "Trailblazer", "Walk It Off", "Superior Stat"]
  },
  "Seeker": {
    startingText: "Start with Well Versed, Work With What You've Got, and one background move.",
    startingSlots: 0,
    startingRules: [],
    fixed: ["Well Versed", "Work With What You've Got"],
    starting: [],
    advancement: ["Quick Study", "Safety First", "Sage Advice", "Well Versed", "Work With What You've Got", "Initiate of the Secret Arts", "Let's Make a Deal", "Logbook", "Magpie", "Never at a Loss", "Polyglot", "Cryptologist"],
    level6: ["Arcane Adept", "Deep Insight", "Improvise", "Mind Over Magic", "Overchannel", "Proof Against Detection", "Superior Stat"]
  },
  "Would-be Hero": {
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

function sentenceCaseFallback(name, campaignId = "stonetop") {
  if (campaignId === "lankhmar") return `Lankhmar campaign move: ${name}.`;
  if (campaignId === "darksun") return `Dark Sun campaign move: ${name}.`;
  if (campaignId === "elfquest") return `Elfquest campaign move: ${name}.`;
  return `Core Stonetop move: ${name}.`;
}

function getSyntheticMoveDescription(name, campaignId) {
  const custom = {
    // Lankhmar starting / patrons
    "Weird Patron: Ningauble of the Seven Eyes": "You serve the wizard of the cavern with seven nostrils. Once per session, you can ask Ningauble for guidance; he answers in confusing riddles. Gain 1 Story Point when you act on a riddle to your own detriment.",
    "Weird Patron: Sheelba of the Eyeless Face": "You serve the swamp-dwelling wizard of the eyeless cowl. Once per session, Sheelba grants you a minor shadow-magic token or scroll. Gain 1 black Setback die to social rolls with common folk who smell the swamp on you.",
    "God: Kos of Dooms": "You worship the northern god of fate and battle. Once per encounter, you can add 1 blue Boost die to a physical attack. If you fail, you must offer a trophy or take 1 strain.",
    "God: Mog the Spider God": "You worship the arachnid god. When climbing, you ignore all black Setback dice. You can spend 1 Favor to summon a distraction of venomous spiders.",
    "God: The Gods of Lankhmar": "You carry the terrible ward of the mummified city gods. Once per session, you can unleash a wave of supernatural dread that forces nearby commoners to flee, but you take 2 strain.",
    "God: Issek of the Jug": "You worship the god of water and simple faith. When you share fresh water from your jug with a thirsty stranger, you add 1 blue Boost die to your next Persuade check against them.",
    "Guildmaster: A Black-Toga Factor": "You have a patron in the corrupt civil courts. Once per session, you can ignore 1 Heat level or legal complication by having your factor draft a legal fiction or bribe a magistrate.",
    "Guildmaster: A Duel Yard Backer": "A wealthy patron finances your training and gear. Once per session, you can upgrade your weapon or armor quality for one encounter. You must return 10% of any coin gained to your backer.",
    "God: The Red God of Knives": "You worship the bloody patron of assassins. When you attack a surprised or helpless target, you deal +2 damage. You must leave a signature cut or token on the victim.",
    "Guildmaster: A Thieves' Guild Whisperer": "You are connected to the Guild's network of lookouts and fences. You can find a secure hideout in any quarter of Lankhmar and ignore 1 black Setback die when gathering street rumors.",
    "Guildmaster: A Roof-Runner Crew": "You are allied with the high-altitude thieves. You can always cross Lankhmar via the rooftops without making checks unless pursued, and you have a secure escape route.",
    "Guildmaster: A Forbidden Bookseller": "A seller of outlawed grimoires supplies you with lore. Add 1 blue Boost die to Know Things about ancient history, dead languages, or black magic.",
    "God: The Gods of Trouble": "You worship the minor spirits of misfortune. Once per encounter, you can add 1 black Setback die to an enemy's check by invoking a small curse of bad luck.",
    "Guildmaster: A Street Shrine Keeper": "A keeper of the Street of Gods shrines shelters you. You can rest safely in any public temple and can procure minor offerings (incense, holy water) for free.",
    "Guildmaster: A Salon of Masks": "You have access to a high-society salon. Add 1 blue Boost die to social checks with nobles, and you can secure invitations to private balls or court gatherings.",
    "Guildmaster: A Jealous Noble": "A wealthy aristocrat uses you to spy or fight. You can borrow high-fashion clothes and carry a letter of passage, but you must perform dirty errands to maintain their favor.",
    "Guildmaster: A Beggar-King": "You are protected by the Beggars' Guild. Add 1 blue Boost die to stealth and street intelligence gathering; beggars will warn you of approaching city watch patrols.",
    "God: The Small God Under the Step": "You feed a forgotten household spirit. Once per session, you can ask the spirit to retrieve a small key or item that went missing in your immediate area.",
    "Guildmaster: A Collector of Unclean Relics": "An eccentric scholar pays you for weird curios. Once per session, you can sell a seemingly worthless relic or monster part to your patron for 10 silver shekels.",

    // Lankhmar advancement / options
    "Favor from Ningauble": "Spend 1 Story Point to call on Ningauble's wizardry, bypassing a magical barrier or securing a weird potion that cures all strain.",
    "Errand for Sheelba": "Perform a task for Sheelba. When you complete a session where you advanced her agenda, gain +1 XP and a shadow-shroud token (add +1 black Setback die to attacks against you).",
    "Black-Toga Legal Fiction": "Spend 1 silver shekel to forge a document. You can pass yourself off as an official agent, tax collector, or noble representative without making a check unless directly challenged.",
    "Temple Debt Marker": "You hold a debt marker over a local temple. You can claim free healing, sanctuary, or minor magical scrolls from the faithful by demanding payment.",
    "Duelist's Witness": "Your duels are legally recognized. When you fight in a formal duel, you cannot be interfered with by the city watch, and you add 1 blue Boost die to your roll.",
    "Watch Sergeant's Blind Eye": "You pay off a city watch sergeant. You can bring contraband through the gates or carry martial weapons openly in noble quarters without harassment.",
    "Insult That Must Be Answered": "You can goad a proud foe into attacking you first. Upgrade the difficulty of their first attack roll against you by 1 red Challenge die.",
    "Noble's Dirty Favor": "You performed a secret task for a noble. Once per campaign, you can cash in this favor to secure a pardon, release an ally from prison, or clear a large debt.",
    "Old Overlord Rumor": "You know a secret passage or vault left behind by a previous ruler. Add 1 blue Boost die when searching or breaking into old sewers, fortresses, or vaults.",
    "Street Champion's Claim": "Your reputation in the slums is fearsome. Slum-dwellers will not betray you to the watch or other guilds, and you can demand free lodging and simple food.",
    "Guild Password": "You know the active phrase of the Thieves' Guild. You can enter secure guild taverns and request aid from roof-runners or lookouts.",
    "Rat-Run Escape": "When cornered in the city, you can slip through narrow gutters or wall gaps. Add 1 blue Boost die to escape checks, and you cannot be tracked through alleys.",
    "Bazaar Fence Network": "You have a network of corrupt merchants. You can sell stolen goods at full value (instead of half) and purchase outlawed poisons or lockpicks.",
    "Spider-Cult Safehouse": "You have access to a webbed cellar. You can hide here for up to three days without drawing any Heat, and you find a stash of spider-venom.",
    "Marked Window": "A secret mark on a building tells you of its wealth and weak points. Add 1 blue Boost die to lockpicking and stealth rolls when breaking into marked houses.",
    "Silent Roof Bell": "You carry a small, magically silenced bell. Once per session, you can ring it to signal local roof-runners to create a distraction nearby.",
    "Cutpurse's Map": "You possess a map of hidden stashes in Lankhmar's alleys. Once per session, you can search a junk pile to find minor gear worth up to 5 silver shekels.",
    "Death Owes You a Delay": "You made a bargain with Death. When you are at Death's Door, you can delay rolling for one round to take one final action.",
    "Candle of Unwise Questions": "When lit, this black wax candle allows you to speak with a recently dead corpse. You can ask 1 question before the candle burns down, but you take 1 strain.",
    "Borrowed Demon Name": "You know the true name of a minor imp. You can spend 1 strain to command the imp to create a minor light, sound, or temperature distraction.",
    "Ash-Smeared Ward": "By smearing ash on your forehead, you protect your mind. Add 1 blue Boost die to checks to resist mental spells, illusions, or fear.",
    "Price Written in a Dream": "A dream tells you the price a spirit wants. When negotiating with a spirit, you can automatically succeed on your first Persuade roll by offering the dream's price.",
    "Cult Offering Cache": "You know where a rival cult keeps its tithes. Once per session, you can raid a local shrine to steal silver or offerings worth 8 shekels.",
    "Pilgrim's Ugly Secret": "You know a shameful secret about a wealthy pilgrim. Add 1 blue Boost die to social checks when blackmailing or demanding help from them.",
    "Street Sermon Favor": "Your fiery preaching has earned you devotees. You can call upon 1d4 commoners to act as a temporary distraction or shield during a brawl.",
    "Borrowed Relic": "You carry a minor holy relic. Once per session, you can spend 1 Favor to shine a beam of holy light that dazes 1 creature of darkness.",
    "Gods' Coin Box": "You steal from the beggar bowls. Once per session, you can gain 3 silver shekels, but you add 1 black Setback die to your next luck roll.",
    "Fickle Blessing": "Your god grants you a sudden, brief blessing. Add 2 blue Boost dice to your next check, but add 2 black Setback dice to the roll immediately after.",
    "Rival Priest's Shame": "You know of a rival priest's corrupt dealings. Add 1 blue Boost die to checks to discredit them or turn their congregation against them.",

    // Dark Sun starting / wild talents
    "Wild Talent: Kinetic Push": "You can push a small object or throw off a foe's footing. Roll INT as a ranged attack against an easy target to knock them back or disarm them.",
    "Wild Talent: Body Control": "You can ignore physical discomfort. Once per encounter, you can spend 1 strain to ignore the effects of 1 debility or physical injury for one round.",
    "Wild Talent: Heat Endurance": "You can survive the killing sun of Athas. You ignore all black Setback dice from extreme heat, thirst, or hot desert winds.",
    "Wild Talent: Mind Blank": "You can shut your mind to mental intrusion. Add 1 blue Boost die to resist telepathy, psionic attacks, or mental charm magic.",
    "Wild Talent: Threat Sense": "You feel a prickle of danger before it strikes. Add 1 blue Boost die to initiative checks, and you cannot be surprised in combat.",
    "Wild Talent: Pain Lock": "You can suppress your nervous system. Once per encounter, when you take damage, you can spend 1 strain to reduce the damage taken by your Soak rating again.",
    "Wild Talent: Telepathic Nudge": "You can plant a quiet thought in a nearby mind. Roll INT against an average difficulty to plant a simple command or distraction in a target.",
    "Wild Talent: Object Reading": "By holding an object, you sense its history. Roll INT to learn who last held it, what strong emotion they felt, or what happened to it recently.",
    "Wild Talent: Empathic Reading": "You sense the emotional state of a target. You can always ask the GM, 'What is this person's true feeling right now?' and get an honest answer.",
    "Wild Talent: Commanding Glare": "You project mental authority. Add 1 blue Boost die when using coercion or physical threats to force a target to halt or obey.",
    "Wild Talent: Sense Treachery": "You sense hostile intent in nearby minds. Once per encounter, you can detect if anyone in the immediate area is planning to attack or betray you.",
    "Wild Talent: Sense Life": "You can feel the presence of living beings. You can detect the location of any living creature within short range, even through walls or in complete darkness.",
    "Wild Talent: Far Hearing": "You can project your hearing to a distant spot. You can hear quiet whispers or sounds up to medium range as if you were standing there.",
    "Wild Talent: Gentle Touch": "You can soothe pain through touch. Spend 1 strain to heal a nearby ally of 2 strain or clear the dazed condition.",
    "Wild Talent: Green Memory": "You can touch a plant to recall the history of the soil. Learn when it last rained, if defiling magic was cast nearby, or who passed by.",
    "Wild Talent: Drain Echo": "You feel where defiling magic has drained the land. You can sense if defiling magic was cast in the area within the last week, and in which direction the defiler went.",
    "Wild Talent: Withering Glance": "You project a flash of mental rot. Roll INT against an easy target to inflict 2 strain and add 1 black Setback die to their next action.",
    "Wild Talent: Sense Water Debt": "You sense the presence of moisture. Add 1 blue Boost die to Forage rolls for water, and you always know the direction of the nearest oasis.",
    "Wild Talent: Coin Memory": "By touching currency, you see its transaction history. Learn who spent it last, what it was traded for, or if it was stolen.",
    "Wild Talent: Elemental Murmur": "You hear the whispers of the elementals. Once per session, you can ask the elemental spirits of earth, air, fire, or water for 1 helpful rumor.",
    "Wild Talent: Water Memory": "By tasting water, you know where it came from. Learn if a well is poisoned, if it is natural spring water, or if it was summoned magically.",
    "Wild Talent: Dust-Sense": "You sense motions in the desert dust. You ignore black Setback dice from blindness or duststorms when detecting nearby enemies.",
    "Wild Talent: Predator's Stillness": "You can slow your breathing and pulse. Add 1 blue Boost die to stealth checks when hiding in natural desert environments.",
    "Wild Talent: Chain-Snap Focus": "You focus your mind on structural weak points. You can spend 1 strain to add 1 blue Boost die and the forceful tag to an attack against locks, chains, or doors.",
    "Wild Talent: Hope-Spark": "You project a flash of mental courage. Once per session, you can clear 1 black Setback die from fear or despair for all nearby allies.",

    // Elfquest starting / bonds
    "Animal Bond: Pack Wolf": "You are bonded with a loyal wolf. The wolf acts as a follower (HP 8, Armor 1, Damage d6) and you can communicate with it mind-to-mind via sending.",
    "Animal Bond: Hunting Hawk": "You are bonded with a swift hawk. The hawk can scout from above, ignoring obstacles, and adds 1 blue Boost die to your perception rolls.",
    "Animal Bond: River Otter": "You are bonded with a playful otter. The otter can retrieve small items from water and helps soothe your strain; once per session, clear 2 strain.",
    "Animal Bond: Preserver Friend": "A tiny, winged Preserver sprite follows you. The sprite can spin cocoon-wrap to bind wounds (heals 2 HP once per session) or talk in funny rhymes.",
    "Animal Bond: No Beast, Only Sending": "You have no physical beast, but your mind is wide open to Sending. You can send thoughts up to long range, and you add 1 blue Boost die to resist mental charms.",
    "Animal Bond: Elder Wolf": "You are bonded with a wise, old wolf. The wolf has +2 HP and can warn you of approaching dangers; you cannot be ambushed while the wolf is awake.",
    "Animal Bond: Stag or Herd-Beast": "You are bonded with a large herd beast. The beast can carry up to 4 extra load and can be ridden, adding 1 blue Boost die to wilderness travel checks.",
    "Animal Bond: Tribe's Totem Beast": "You are bonded with the sacred beast of your tribe. You add 1 blue Boost die to social checks with members of your own holt.",
    "Animal Bond: Night Bird": "You are bonded with a nocturnal owl or nightjar. You ignore all black Setback dice from darkness or shadows when scouting at night.",
    "Animal Bond: Star-Marked Companion": "Your companion beast has a star-like mark and deep wisdom. Add 1 blue Boost die when using your bond to navigate or read omens.",
    "Animal Bond: Gentle Den-Mate": "You bond with a small burrowing creature. The creature can navigate tight tunnels and find secure underground passages.",
    "Animal Bond: Watchful Wolf": "Your wolf companion stands guard. When you Make Camp, you can always sleep safely, and you add 1 blue Boost die to watch rolls.",
    "Animal Bond: High Aerie Bird": "Your bird companion lives on the highest peaks. Add 1 blue Boost die to climb checks or when reading the weather.",
    "Animal Bond: Distant White Wing": "You are bonded with a rare mountain falcon. You can send your falcon to deliver messages or scout up to extreme range.",
    "Animal Bond: Tiny Den-Critter": "A tiny rodent or weasel crawls in your cloak. Add 1 blue Boost die to sleight of hand or pickpocketing checks.",
    "Animal Bond: Silk-Wrapped Beetle": "A large, docile beetle lives in your pouch. You can use its bioluminescent shell as a torch, and it can chew through tough roots or silk.",
    "Animal Bond: Cave Lizard": "You are bonded with a sticky-toed lizard. The lizard can scale vertical walls easily and carry small ropes or cords.",
    "Animal Bond: Stone-Burrower": "Your companion is a digging badger or mole. You can find soft dirt paths and detect hollow passages behind stone walls.",
    "Animal Bond: Deep Cave Moth": "A large moth sits on your shoulder. The moth can detect poisonous gases or bad air in caverns, flutter-warning you in advance.",
    "Animal Bond: Desert Runner": "You bond with a swift, long-legged runner. You can travel through hot desert sands twice as fast as normal.",
    "Animal Bond: Sand-Cat": "You are bonded with a stealthy sand-cat. The cat ignores all black Setback dice from shifting sands and adds 1 blue Boost die to your stealth checks.",
    "Animal Bond: Oasis Lizard": "You bond with a cold-blooded desert lizard. The lizard helps you find shaded rest; once per session, you can heal 2 extra HP when Resting.",
    "Animal Bond: Great Cat": "You are bonded with a powerful sand-panther. The panther acts as a heavy follower (HP 12, Armor 1, Damage d8 forceful) and can intimidate foes.",
    "Animal Bond: Silent Stalker": "Your beast companion is a master of camouflage. Add 1 blue Boost die to stealth checks for both you and your beast in natural terrain."
  };

  if (custom[name]) return custom[name];

  // Prefix-based systemic generator
  if (name.startsWith("Wild Talent:")) {
    const talent = name.replace("Wild Talent:", "").trim();
    return `A minor psionic wild talent: ${talent}. When you activate this talent under pressure, roll INT or WIS against an Average difficulty: on Success, you manifest the effect; on Advantage, you gain 1 story point or clear 1 strain.`;
  }
  if (name.startsWith("Psionic Discipline:")) {
    const discipline = name.replace("Psionic Discipline:", "").trim();
    return `A major psionic discipline: ${discipline}. Once per encounter, you can roll INT to perform this discipline. On success, you manifest major telepathic, psychokinetic, or metabolic effects; on Threat, you take 2 strain.`;
  }
  if (name.startsWith("Animal Bond:")) {
    const beast = name.replace("Animal Bond:", "").trim();
    return `You are bonded with a ${beast}. The creature travels with you and acts as a loyal companion. Once per session, you can spend 1 strain to send a mental message or sense its emotions.`;
  }
  if (name.startsWith("Weird Patron:") || name.startsWith("Guildmaster:") || name.startsWith("God:")) {
    const patron = name.replace(/^(Weird Patron:|Guildmaster:|God:)/, "").trim();
    return `Your patron, god, or guild alliance in Nehwon: ${patron}. Once per session, when you invoke their influence to bypass a city complication, roll CHA or WIS. On success with Advantage, they grant you a temporary asset; on success with Threat, they demand a service or payment.`;
  }

  // Suffix/Category-based fallback based on campaign
  if (campaignId === "lankhmar") {
    return `A Lankhmar urban ability or asset: ${name}. You can spend a Story Point or roll an appropriate social stat (CHA or WIS) to leverage this connection, rumor, or safehouse in the city.`;
  }
  if (campaignId === "darksun") {
    return `An Athasian survival technique or psionic talent: ${name}. Roll CON or INT to resist the desert waste, harness the Way, or protect yourself from the sorcerer-kings.`;
  }
  if (campaignId === "elfquest") {
    return `An elven tribal magic, bond trait, or sending ability: ${name}. You can spend 1 strain to send a message across the world, shape the environment (rock/wood), or call upon your beast companions.`;
  }

  return `Campaign-specific move: ${name}.`;
}

function syntheticMove(text, extra = {}) {
  const name = text.replace(/\.$/, "");
  const campaignId = extra.campaignId || "";
  const description = getSyntheticMoveDescription(name, campaignId);
  return {
    name,
    description,
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
      fixed: core.fixed.map((name) => moveFromName(name, descriptions, { category: "fixed", campaignId: "stonetop" })),
      starting: core.starting.map((name) => moveFromName(name, descriptions, { category: "starting", campaignId: "stonetop" })),
      advancement: core.advancement.map((name) => moveFromName(name, descriptions, { category: "advancement", campaignId: "stonetop" })),
      level6: core.level6.map((name) => moveFromName(name, descriptions, { category: "level6", locked: true, campaignId: "stonetop" }))
    };
  }

  const supplement = resolveCampaignSupplement(campaign, arch);
  const campaignId = campaign ? campaign.id : "";
  const fixed = (arch.signature_moves || []).map((move) => ({ ...move, category: "fixed" }));
  const { lower, level6 } = splitLevelSix(arch.choice_moves || []);
  const baseStartingSlots = Math.min(DEFAULT_STARTING_CHOICE_COUNT, lower.length);
  const supplementStartingSlots = supplement ? supplement.startingSlots || 0 : 0;
  const startingSlots = baseStartingSlots + supplementStartingSlots;
  const starting = lower
    .slice(0, baseStartingSlots)
    .map((move) => ({ ...move, category: "starting" }))
    .concat((supplement && supplement.starting ? supplement.starting : [])
      .map((text) => syntheticMove(text, { category: "starting", campaignId })));
  const advancement = lower.slice(baseStartingSlots).map((move) => ({ ...move, category: "advancement" }));
  const basicAdvancement = (arch.advancement && arch.advancement.basic ? arch.advancement.basic : [])
    .map((text) => syntheticMove(text, { category: "advancement", campaignId }));
  const advancedAdvancement = (arch.advancement && arch.advancement.advanced ? arch.advancement.advanced : [])
    .map((text) => syntheticMove(text, { category: "level6", locked: true, campaignId }));
  const supplementalAdvancement = (supplement && supplement.advancement ? supplement.advancement : [])
    .map((text) => syntheticMove(text, { category: "advancement", campaignId }));
  const supplementalLevel6 = (supplement && supplement.level6 ? supplement.level6 : [])
    .map((text) => syntheticMove(text, { category: "level6", locked: true, campaignId }));
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
