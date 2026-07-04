// Stonetop Page 2 Backstories Data
const BACKSTORIES_DATA = {
  "Blessed": {
    "title": "Spirit Devotion & The Initiates of Danu",
    "description": "Danu, the Great Mother, provides. Keepers of the old ways speak for her and tend to her wild spirits.",
    "sections": [
      {
        "type": "checkbox",
        "title": "Select your fellow initiates/companions (Choose 2 or 3):",
        "limit": 3,
        "options": [
          "Enfys, acolyte (Bird-wise, innocent, magical, well-informed)",
          "Afon, initiate (Fae-wise, devious, magical, self-sufficient, stealthy)",
          "Gwendyl, mentor (Herb-wise, gossipy, tireless, healer, magical)",
          "Olwin, lover (Fates-wise, beautiful, passionate, magical)",
          "Seren the Eldest (Exceptional, story-wise, insightful, frail, magical)"
        ]
      },
      {
        "type": "textarea",
        "title": "Detail your relationships, sacred duties, or spiritual compacts:"
      }
    ]
  },
  "Fox": {
    "title": "Tall Tales",
    "description": "Someone like you gets into all sorts of trouble, whether you mean to or not. Mix and match the following to come up with a couple of your more memorable adventures.",
    "sections": [
      {
        "type": "checkbox",
        "title": "There was that time that you… (Choose 1 per tale):",
        "limit": 1,
        "options": [
          "… got lost in the Great Wood",
          "… got lost in the Flats",
          "… got lost in the Steplands",
          "… got lost in Ferrier’s Fen",
          "… got lost in the Foothills",
          "… got lost in the Huffel Peaks",
          "… were on watch when the crinwin raided",
          "… dared each other to explore the Ruined Tower",
          "… managed to rile up a small band of Hillfolk",
          "… braved the Labyrinth, just a little",
          "… stole that crazy old man's book",
          "… went poking about the old Barrow Mounds"
        ]
      },
      {
        "type": "checkbox",
        "title": "And you ended up… (Choose 1 or 2 per tale):",
        "limit": 2,
        "options": [
          "… landing a well-placed blow",
          "… interrupting a strange, creepy gathering",
          "… stumbling on a beast, bigger’n anything",
          "… with a sack full of treasure",
          "… face to face with a ghost/Fae/demon",
          "… finding those strange old runes",
          "… getting to know that fine-looking fellow/lady/person/couple"
        ]
      },
      {
        "type": "text_options",
        "title": "Additional outcomes:",
        "inputs": [
          { "label": "… running for your life from:", "placeholder": "who or what?" },
          { "label": "… getting someone to fight them for you:", "placeholder": "who did you trick?" }
        ]
      },
      {
        "type": "checkbox",
        "title": "But all you’ve got left to show for it is… (Choose 1 or 2 per tale):",
        "limit": 2,
        "options": [
          "… a story no one believes.",
          "… a nasty scar; wanna see?",
          "… the occasional nightmare.",
          "… this map with runes no one can read.",
          "… this key that opens who-knows-what."
        ]
      }
    ]
  },
  "Heavy": {
    "title": "A History of Violence",
    "description": "Just about everyone in Stonetop talks about your past deeds—both the legendary ones and the ones they whisper about.",
    "sections": [
      {
        "type": "checkbox",
        "title": "Just about everyone here talks about the time you… (Pick 1 or 2):",
        "limit": 2,
        "options": [
          "… drove off a thunder drake that got too close to town.",
          "… killed that hagr in the Foothills.",
          "… slew a dozen crinwin in one battle.",
          "… tossed those adventurers out of town.",
          "… bested Ivan, the scariest bandit in Brennan's gang, the Claws.",
          "… dragged yourself (and another?) into town, bleeding from a dozen wounds.",
          "… were struck by lightning and woke up covered in these marks."
        ]
      },
      {
        "type": "checkbox",
        "title": "But folks are less keen to discuss… (Pick 1 or 2):",
        "limit": 2,
        "options": [
          "… the look in your eye when you spilled all that blood.",
          "… those hard cases who showed up looking for you.",
          "… the shouting matches between you and your love.",
          "… the time you spent as one of Brennan's Claws.",
          "… what happened to Urbgen, even if he did have it coming.",
          "… your uncontrollable seizures, where you claw those weird marks in the dirt."
        ]
      },
      {
        "type": "checkbox",
        "title": "What keeps you up at night? (Pick 1 or 2):",
        "limit": 2,
        "options": [
          "That thrice-damned temper of yours.",
          "The worry that someone's coming after you.",
          "The feeling that the crinwin are getting bolder.",
          "Wondering what Brennan's up to, now that he's the marshal of Marshedge.",
          "Dark visions of things moving in the earth, restless, whispering, and hungry.",
          "The question of who'll look after your family when you get yourself killed.",
          "The worry that they'll all learn the truth about you, sooner or later."
        ]
      }
    ]
  },
  "Judge": {
    "title": "The Chronicle & The Lawkeeper",
    "description": "You are charged with maintaining the Chronicle of Stonetop and upholding Aratis's law.",
    "sections": [
      {
        "type": "checkbox",
        "title": "Decide on the physical structure of the Chronicle. On the plus side, it… (Choose 3):",
        "limit": 3,
        "options": [
          "… is a sturdy vault from the time of the Makers.",
          "… has plenty of room to grow.",
          "… is hidden underground.",
          "… has but one entrance, magically sealed.",
          "… bears minor magics to preserve its contents.",
          "… is warded against spirits and magic.",
          "… includes your living quarters & office."
        ]
      },
      {
        "type": "checkbox",
        "title": "But alas, it… (Choose 2):",
        "limit": 2,
        "options": [
          "… sits on the outskirts, near the Old Wall.",
          "… is cramped, chaotic, and overflowing.",
          "… is little more than a crude cellar.",
          "… seems to be haunted.",
          "… contains a few dangerous artifacts."
        ]
      },
      {
        "type": "radio",
        "title": "In Stonetop's Pavillion of the Gods, Aratis's shrine is… (Pick 1):",
        "options": [
          "… a hub of the community, a place of frequent rites, petitions, and celebrations",
          "… used only on high holidays, for each home keeps its own shrine above the hearth",
          "… neglected by most, tended only by you and a handful of believers",
          "… a grim place of judgement and punishment, shunned by all but her chosen",
          "… newly established, cramped and spare"
        ]
      },
      {
        "type": "checkbox",
        "title": "Of her true disciples, Aratis demands… (Choose 3):",
        "limit": 3,
        "options": [
          "… truth, honesty, and forthrightness",
          "… hospitality, freely given to all who ask for it",
          "… the punishment of thieves & oathbreakers",
          "… adherence to strict rules of diet and dress",
          "… respect for authority, property, and rank"
        ]
      }
    ]
  },
  "Lightbearer": {
    "title": "Praise the Day",
    "description": "You are the servant of Helior the Daybringer, god of sun and hope.",
    "sections": [
      {
        "type": "radio",
        "title": "The worship of Helior is… (Choose 1):",
        "options": [
          "… ancient, widespread, and well-known",
          "… most common in Lygos and the south",
          "… a new thing, still unheard of by many",
          "… an old thing, forgotten by most",
          "… widely persecuted"
        ]
      },
      {
        "type": "checkbox",
        "title": "He is worshipped through… (Choose 1 or 2):",
        "limit": 2,
        "options": [
          "… solemn hymns",
          "… serene meditation",
          "… joyful song",
          "… ascetic denial",
          "… fervent dancing",
          "… formal ceremonies",
          "… drugs & intoxicants",
          "… pain & sacrifice"
        ]
      },
      {
        "type": "radio",
        "title": "In Stonetop's Pavilion of the Gods, Helior's shrine has… (Choose 1):",
        "options": [
          "… the place of highest honor, even if Tor is more popular",
          "… been well-tended and given due respect",
          "… recently been restored/established, perhaps by you",
          "… seen better days, for certain"
        ]
      },
      {
        "type": "checkbox",
        "title": "Your predecessor, the previous Lightbearer… (Choose 2 or 3):",
        "limit": 3,
        "options": [
          "… lived long ago, a figure of legend",
          "… was martyred for their faith",
          "… died facing a mighty sorcerer or demon",
          "… wrote many works of sublime beauty",
          "… faced one of the Things Below",
          "… died in their bed, peacefully",
          "… ascended bodily into the heavens",
          "… was reincarnated—as you"
        ]
      },
      {
        "type": "radio",
        "title": "You came into your powers… (Choose 1):",
        "options": [
          "… through years of study and devotion",
          "… when your predecessor passed them on",
          "… suddenly, at a moment of great need.",
          "… after a visitation from Helior or one of his servants"
        ]
      },
      {
        "type": "text_options",
        "title": "Or by touch:",
        "inputs": [
          { "label": "… when you first laid eyes upon the:", "placeholder": "what relic or symbol?" }
        ]
      }
    ]
  },
  "Marshal": {
    "title": "War Stories",
    "description": "The town militia has seen blood under your lead. The past shapes your tactical decisions today.",
    "sections": [
      {
        "type": "radio",
        "title": "The last time the militia saw serious action, it was… (Pick 1):",
        "options": [
          "...to repel a nighttime raid by crinwin from the Great Wood.",
          "...to drive off bandits who'd taken up near the Ruined Tower.",
          "...to fend off Hillfolk pursuing a blood feud.",
          "...against Brennan and his Claws, before they settled in Marshedge.",
          "...to face a brutish hagr, come down from the Foothills to wreak havoc.",
          "...to hunt down beasts (wolves, drakes, or bears?) who'd been preying on the village."
        ]
      },
      {
        "type": "text_options",
        "title": "Answer at least 3 of the following questions about that action:",
        "inputs": [
          { "label": "When exactly did it happen?", "placeholder": "e.g. Last winter, three years ago..." },
          { "label": "Who lost their life, and who mourns them?", "placeholder": "Names and relations..." },
          { "label": "Who from Stonetop was maimed, and how?", "placeholder": "NPC name and injury..." },
          { "label": "Who saved the day, and how?", "placeholder": "Heroic details..." },
          { "label": "How did the enemy get away, and whom do you still blame for it?", "placeholder": "Escaped and blame..." },
          { "label": "Who comported themselves with honor?", "placeholder": "Honorable soldier..." },
          { "label": "What's been bugging you about it ever since?", "placeholder": "Regrets or anomalies..." },
          { "label": "What's got you even more worried now?", "placeholder": "Threat escalation..." }
        ]
      }
    ]
  },
  "Ranger": {
    "title": "Something Wicked This Way Comes",
    "description": "You know firsthand that trouble is out there, stalking Stonetop. It's only a matter of time before the village has to face it.",
    "sections": [
      {
        "type": "radio",
        "title": "What is it that you're so worried about? (Choose 1):",
        "options": [
          "A dark, unwholesome presence lurking in the Great Wood",
          "A strange, furtive figure seen near the Ruined Tower",
          "Something big & savage stalking the northern foothills",
          "Whatever's made the lizard-like suarachan of Ferrier's Fen so bold",
          "That of which the Hillfolk refuse to speak"
        ]
      },
      {
        "type": "text_options",
        "title": "Answer at least 3 of the following questions about this threat:",
        "inputs": [
          { "label": "What, exactly, do you think it is?", "placeholder": "Description or beast name..." },
          { "label": "What did you see, and how close did you have to get?", "placeholder": "Encounter details..." },
          { "label": "Whom or what have you lost to it?", "placeholder": "Companions, dogs, or family..." },
          { "label": "What did it leave behind?", "placeholder": "Tracks, marks, residues..." },
          { "label": "What do you think it wants?", "placeholder": "Terrible instincts..." },
          { "label": "Who refuses to believe you?", "placeholder": "Skeptical NPC..." },
          { "label": "Who can tell you more, if you can convince them?", "placeholder": "Wise NPC or outlander..." }
        ]
      }
    ]
  },
  "Seeker": {
    "title": "Collection",
    "description": "In your travels and investigations, you have acquired arcana—artifacts of power and mystery.",
    "sections": [
      {
        "type": "text_options",
        "title": "Major Arcanum: Answer at least 2 questions about it:",
        "inputs": [
          { "label": "Where did you acquire it?", "placeholder": "Ruin or vault name..." },
          { "label": "From whose grasp did you wrest it?", "placeholder": "Guardian or rival..." },
          { "label": "Who else wants it?", "placeholder": "Factions or monsters..." },
          { "label": "What did it cost you?", "placeholder": "Scars, sacrifice, or coin..." }
        ]
      },
      {
        "type": "text_options",
        "title": "Minor Arcana:",
        "inputs": [
          { "label": "Mastered Minor Arcanum (Where is it now? How did you master it?):", "placeholder": "details..." },
          { "label": "Possessed Minor Arcanum (Where is it? How did you find it?):", "placeholder": "details..." },
          { "label": "Unfound Lead (What lead do you have?):", "placeholder": "details..." }
        ]
      }
    ]
  },
  "Would-be Hero": {
    "title": "Fear & Anger",
    "description": "You aren't like other folk. You're on the path of adventure. But fear and anger still pull at your soul.",
    "sections": [
      {
        "type": "checkbox",
        "title": "What do you fear most? (Choose 1, maybe 2):",
        "limit": 2,
        "options": [
          "Fire, burning, the smell of charred flesh",
          "That they won't take you seriously",
          "That you really aren't cut out for this",
          "The death of your family or loved ones",
          "Being alone and helpless",
          "Violence, bloodshed, and pain",
          "Monsters",
          "What you're capable of",
          "What you must do"
        ]
      },
      {
        "type": "checkbox",
        "title": "What makes you burn with righteous anger? (Choose 2, maybe 3):",
        "limit": 3,
        "options": [
          "Bullying, slavery, and oppression",
          "Wanton cruelty and unnecessary suffering",
          "Injustice and inequality",
          "Cowardice, treachery, and selfishness",
          "The despoiling of beauty and innocence",
          "Threats to your loved ones",
          "Violence to children, animals, the innocent",
          "Perversions of nature"
        ]
      },
      {
        "type": "textarea",
        "title": "When did your fear or anger last cause you trouble? What did you do? How did it turn out?"
      }
    ]
  }
};
