// name-generators.js
// -----------------------------
// CAMPAIGN NAME LISTS & SYLLABLES
// -----------------------------

const NAME_DATA = {
  stonetop: {
    male: [
      "Lancelot", "Gawain", "Percival", "Galahad", "Kay", "Bedivere", "Tristan",
      "Gaheris", "Gareth", "Bors", "Lionel", "Ector", "Uther", "Lot", "Merlin",
      "Yvain", "Sagramore", "Geraint", "Owain", "Accolon", "Arianrhod", "Caerwyn",
      "Einion", "Trahaern", "Trefor", "Eleri", "Eldest", "Devin", "Haeris", "Rahat",
      "Unz", "Cynan", "Elidir", "Gethin", "Iolo", "Madog", "Pryderi", "Rhodri",
      "Taliesin", "Vaughan", "Aidan", "Niall", "Cormac", "Finnegan", "Kieran",
      "Ronan", "Declan", "Maeve", "Fiona", "Bridger"
    ],
    female: [
      "Guinevere", "Morgana", "Morgause", "Elaine", "Vivienne", "Gwenhwyfar",
      "Igraine", "Nimue", "Arianwen", "Branwen", "Ceridwen", "Dilys", "Eira",
      "Ffion", "Gwen", "Heulwen", "Isolde", "Lynette", "Morfudd", "Nerys",
      "Olwen", "Rhiannon", "Sian", "Tegwen", "Wynne", "Magda", "Sofia", "Isalde",
      "Tejisha", "Sofia", "Hypatta", "Despina", "Nomika", "Briget", "Liadain",
      "Somha", "Elen", "Carys", "Angharad", "Anwen", "Catrin", "Delyth", "Efa",
      "Gwenllian", "Lowri", "Myfanwy", "Nesta", "Sioned", "Mair", "Nia"
    ],
    syllables: {
      maleStart: ["Ar", "Ca", "Ei", "El", "Ma", "Ne", "Tr", "Ba", "Gl", "Gw", "Rh", "Ur", "Ow", "Ce", "Ad", "Fi", "Ni"],
      maleMid: ["an", "er", "rhod", "wyn", "in", "el", "da", "rys", "ha", "e", "or", "ol", "on", "al", "en"],
      maleEnd: ["wyn", "ion", "ri", "da", "ys", "ern", "for", "ach", "an", "el", "on", "ith", "ert", "las", "yn"],
      femaleStart: ["An", "Ca", "Ei", "El", "Ma", "Ne", "Br", "Co", "Li", "So", "Ad", "Ni", "Gw", "Ol", "Se", "Af", "Rh"],
      femaleMid: ["an", "er", "rhod", "wyn", "in", "el", "da", "rys", "ha", "e", "or", "ol", "on", "al", "en"],
      femaleEnd: ["rhod", "wyn", "ri", "da", "ys", "a", "or", "et", "all", "ain", "ach", "eth", "el", "ys", "wen"]
    }
  },
  lankhmar: {
    male: [
      "Fafhrd", "Mouser", "Fisk", "Cutter", "Ryse", "Ovid", "Sparrow", "Denn",
      "Prig", "Vael", "Moth", "Corliss", "Pulgh", "Krovas", "Sarevok", "Arvlan",
      "Bannat", "Basharat", "Braggi", "Bwadres", "Danius", "Effendrit", "Essendinex",
      "Gis", "Glavas Rho", "Glipkerio", "Gnarlag", "Gortch", "Grilli", "Harrax",
      "Harsel", "Hor", "Hrey", "Hringorl", "Hristomilo", "Issek", "Kivies",
      "Kooskra", "Kreshmar", "Larlt", "Lavas Laerk", "Lithquil", "Mingsward",
      "Moolsh", "Moulsh", "Nalgorn", "Ohmphal", "Ourph", "Ouwenyis", "Wiggin"
    ],
    female: [
      "Nella", "Isolde", "Lessnya", "Slevyas", "Ilala", "Innesgay", "Ivlis",
      "Laavyan", "Srith", "Stravas", "Zizzi", "Atya", "Mara", "Mor", "Tres",
      "Vaelia", "Sharna", "Kyra", "Lyra", "Tessa", "Gillian", "Esmeralda", "Cat",
      "Silk", "Whisper", "Nightshade", "Raven", "Talon", "Claw", "Dagger", "Poison",
      "Jade", "Ruby", "Onyx", "Pearl", "Ivory", "Amber", "Sapphire", "Emerald",
      "Diamond", "Ophelia", "Desdemona", "Rosalind", "Viola", "Beatrice", "Cordelia",
      "Goneril", "Regan", "Miranda", "Juliet"
    ],
    syllables: {
      maleStart: ["Arv", "Bash", "Brag", "Bwad", "Dan", "Eff", "Gliv", "Gnar", "Gor", "Gril", "Har", "Hring", "Hrist", "Kiv", "Koos", "Kresh", "Laav", "Lar", "Mings", "Mool", "Moul", "Nalg", "Ohm", "Our", "Ouw", "Skel", "Slev", "Strav", "Teer", "Ur", "Wig", "Zax"],
      maleMid: ["a", "e", "i", "o", "u", "aa", "ee", "oo", "uu"],
      maleEnd: ["lan", "rat", "gi", "res", "ius", "rit", "dex", "lio", "lag", "tch", "li", "rax", "sel", "gor", "orl", "lo", "sek", "es", "kra", "mar", "yan", "lt", "laerk", "quil", "ward", "sh", "gorn", "phal", "ph", "yis", "gaan", "gin"],
      femaleStart: ["At", "Mar", "Nel", "Is", "Less", "Slev", "Il", "Inn", "Ivl", "Laav", "Sr", "Strav", "Ziz", "Vael", "Sharn", "Kyr", "Lyr", "Tess", "Gill"],
      femaleMid: ["a", "e", "i", "o", "u", "aa", "ee", "oo", "uu", "ia", "ea", "oa"],
      femaleEnd: ["ya", "olde", "nya", "vas", "ala", "gay", "is", "yan", "ith", "a", "zi", "ra", "sa", "ian", "da", "et", "ria", "lott"]
    }
  },
  darksun: {
    male: [
      "Rikus", "Agis", "Tithian", "Ktandeo", "Fylo", "Yarig", "Kalak", "Hamanu",
      "Borys", "Nibenay", "Andropinis", "Tectuktitlay", "Daskinor", "Oronis",
      "Keltis", "Irikos", "Boaz", "Brazin", "Ero", "Laban", "Lafus", "Luris",
      "Mirch", "Navarch", "Poortool", "Regg", "Ruach", "Solzak", "Vok", "Wek",
      "Wheetan", "Xutan", "Barak", "Dakan", "Kalan", "Malan", "Nalan", "Rakan",
      "Sakan", "Takan", "Varan", "Zakan", "Habar", "Jabar", "Karn", "Brak",
      "Grog", "Thok", "Karg", "Mug"
    ],
    female: [
      "Sadira", "Neeva", "Lalali-Puy", "Abalach-Re", "Kalid-Ma", "Fyrian",
      "Gathalimay", "Melestan", "Valeria", "Lysandra", "Cassandra", "Selene",
      "Artemis", "Hecate", "Pandora", "Medea", "Circe", "Calypso", "Nausicaa",
      "Penelope", "Helen", "Clytemnestra", "Electra", "Iphigenia", "Antigone",
      "Ismene", "Jocasta", "Thais", "Phryne", "Aspasia", "Zenobia", "Cleopatra",
      "Nefertiti", "Hatshepsut", "Semiramis", "Artemisia", "Makeda", "Candace",
      "Olympias", "Roxana", "Statira", "Parysatis", "Amestris", "Atossa",
      "Cassandane", "Mandane", "Phaedyme", "Stateira"
    ],
    syllables: {
      maleStart: ["Rik", "Ag", "Tith", "Ktand", "Fyl", "Yar", "Kal", "Ham", "Bor", "Nib", "Andr", "Tect", "Dask", "Oron", "Kelt", "Irik", "Bo", "Braz", "Er", "Lab", "Laf", "Lur", "Mir", "Nav", "Poort", "Reg", "Ru", "Solz", "V", "W", "Wheet", "Xut", "Bar", "Dak", "Kal", "Mal", "Nal", "Rak", "Sak", "Tak", "Var", "Zak"],
      maleMid: ["a", "e", "i", "o", "u", "o'", "a'"],
      maleEnd: ["us", "is", "ian", "eo", "o", "ig", "ak", "anu", "ys", "ay", "inis", "itlay", "inor", "onis", "is", "os", "az", "in", "o", "an", "us", "ch", "arch", "ool", "g", "ach", "ak", "ek", "an", "ar", "arn", "og"],
      femaleStart: ["Sadir", "Neev", "Lalal", "Abal", "Kalid", "Fyr", "Gath", "Mel", "Valer", "Lysand", "Cassand", "Selen", "Artem", "Hecat", "Pandor", "Mede", "Circ", "Calyps", "Nausic", "Penelop", "Hel", "Clytemn", "Electr", "Iphigen", "Antigon", "Ismen", "Jocast", "Tha", "Phryn", "Aspas", "Zenob", "Cleopatr", "Nefert", "Hatsheps", "Semiram", "Artemis", "Maked", "Candac", "Olympi", "Roxan", "Statir", "Parysat", "Amestr", "Atoss", "Cassand", "Mandan", "Phaedym", "Stateir"],
      femaleMid: ["a", "e", "i", "o", "u"],
      femaleEnd: ["a", "ia", "uy", "re", "ma", "an", "ay", "is", "ra", "ne", "es", "te", "or", "yps", "ep", "en", "tra", "ca", "ia", "is", "ni", "ut", "as", "ne", "ir", "at", "os"]
    }
  },
  elfquest: {
    male: [
      "Cutter", "Skywise", "Redlance", "Strongbow", "Treestump", "Scouter", "One-Eye",
      "Pike", "Picknose", "Rayek", "Sunstream", "Dart", "Windkin", "Kimo",
      "Tyldak", "Two-Edge", "Door", "Teir", "Korillan", "Mender", "Zhahor",
      "Sari", "Rellhe", "Ghen", "Chot", "Jethel", "Vrim", "Bearclaw", "Mantricker",
      "Oakroot", "Brightwater", "Longreach", "Swiftfoot", "Surefoot", "Sharpblade",
      "Fastwing", "Stormlight", "Shadowrun", "Highcrest", "Clouddancer", "Greenleaf",
      "Wildwood", "Ironwood", "Stonebender", "Flintcutter", "Earthshaper", "Woodcarver",
      "Firestarter", "Daybreak", "Starwatcher"
    ],
    female: [
      "Leetah", "Nightfall", "Clearbrook", "Dewshine", "Shena", "Joyleaf", "Ember",
      "Venka", "Yun", "Kahvi", "Dodia", "Savah", "Shenshen", "Winnowill", "Sharla",
      "Lyra", "Tyleet", "Moonshade", "Ahri", "Maleen", "Vaya", "Rainsong",
      "Woodsong", "Shuna", "Treetop", "Sunburst", "Starlight", "Silverleaf",
      "Whisperwind", "Blossom", "Willow", "Fern", "Heather", "Bramble", "Clover",
      "Dandelion", "Petal", "Rowan", "Hazel", "Autumn", "Summer", "Winter",
      "Spring", "Meadow", "River", "Brook", "Lake", "Rain", "Cloud"
    ],
    syllables: {
      prefix: ["Bear", "Bright", "Clear", "Cloud", "Dark", "Day", "Deep", "Dew", "Earth", "Fast", "Fire", "Flint", "Free", "Green", "High", "Iron", "Light", "Long", "Moon", "Night", "Oak", "Red", "Rock", "Shadow", "Sharp", "Sky", "Star", "Stone", "Storm", "Strong", "Sun", "Sure", "Swift", "Tree", "Whisper", "Wild", "Wind", "Wood"],
      maleSuffix: ["lance", "bow", "stump", "eye", "stream", "kin", "edge", "claw", "root", "reach", "foot", "blade", "wing", "light", "run", "crest", "leaf", "wood", "bender", "cutter", "shaper", "carver", "starter", "break", "watcher"],
      femaleSuffix: ["fall", "brook", "shine", "leaf", "song", "shade", "wind", "flower", "blossom", "willow", "fern", "heather", "bramble", "clover", "petal", "rowan", "hazel", "meadow", "river", "lake", "rain", "cloud", "wave", "dancer"]
    }
  }
};

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateName(campaignId) {
  const data = NAME_DATA[campaignId] || NAME_DATA.stonetop;
  
  // 50% chance of pre-defined list, 50% chance of randomizer
  if (Math.random() < 0.5) {
    const list = Math.random() < 0.5 ? data.male : data.female;
    return rand(list);
  } else {
    // Generate name using syllable algorithm
    const syl = data.syllables;
    if (campaignId === 'elfquest') {
      const isMale = Math.random() < 0.5;
      const suf = isMale ? syl.maleSuffix : syl.femaleSuffix;
      return rand(syl.prefix) + rand(suf).toLowerCase();
    } else {
      const isMale = Math.random() < 0.5;
      const start = rand(isMale ? syl.maleStart : syl.femaleStart);
      const mid = rand(isMale ? syl.maleMid : syl.femaleMid);
      const end = rand(isMale ? syl.maleEnd : syl.femaleEnd);
      return start + mid + end;
    }
  }
}
