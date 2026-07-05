// StoneSys JS Application logic
import { getAccessToken, saveCharacterToDrive, listDriveFiles, loadFromDrive } from "./drive.js";
import { getMoveGroups, validateStartingChoices } from "./move-groups.js";
import { generateName } from "./name-generators.js";

// Application State
let activeCampaign = null;
let activeArchetype = null;
let currentCharacterId = null;

let currentHP = 20;
let currentXP = 0;
let currentTotalXP = 0;
let currentStats = {};
let xpLedger = [];

const SAVE_STORAGE_KEY = 'stonesys.characters.v1';
const STAT_NAMES = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
const STONETOP_CREATION_STATS = [4, 3, 3, 2, 2, 1];
const STONETOP_WOULD_BE_HERO_STATS = [3, 2, 2, 2, 2, 1];
const STAT_ADVANCE_XP_COST = 10;
const LEVEL_SIX_ADVANCEMENT_COUNT = 5;
const LEVEL_ADVANCEMENT_CATEGORIES = new Set(['ability', 'move']);

const STARTING_GEAR_DATA = {
  "Blessed": {
    label: "Choose 1 Special Possession (in addition to symbol of authority and scribe's kit):",
    limit: 1,
    options: [
      "Black iron maul (utterly immune to all magic; close, forceful, awkward, +1 damage)",
      "Makerglass shield (indestructible, +1 armor, +1 Readiness on success to Defend)",
      "Helm set with a dark ice jewel (adds 1 blue Boost die to resist mind-affecting magic)"
    ]
  },
  "Fox": {
    label: "Choose 2 Special Possessions:",
    limit: 2,
    options: [
      "Burglar's kit (picks, files, snippers, wire, dark-lantern, grappling hook, thin rope)",
      "Carpenter's tools (chisels, files, nails, pitch, prybars, saws, firkins, barrels)",
      "Distillery (skins of fine whisky [3 uses], copper tubes, malt, stills, casks)",
      "Hidden stash (valuables worth a purse of silver [Value 3])",
      "Mummer's kit (juggling balls, motley, ribbons, bells, makeup, masks, lute, fiddle)",
      "Scribe's tools (parchment, ink, pigments, vials, quills, notebook)"
    ]
  },
  "Heavy": {
    label: "Choose 2 Special Possessions:",
    limit: 2,
    options: [
      "Burglar's kit (picks, files, snippers, wire, dark-lantern, grappling hook, thin rope)",
      "Carpenter's tools (chisels, files, nails, pitch, prybars, saws, firkins, barrels)",
      "Distillery (skins of fine whisky [3 uses], copper tubes, malt, stills, casks)",
      "Hidden stash (valuables worth a purse of silver [Value 3])",
      "Mummer's kit (juggling balls, motley, ribbons, bells, makeup, masks, lute, fiddle)",
      "Scribe's tools (parchment, ink, pigments, vials, quills, notebook)"
    ]
  },
  "Judge": {
    label: "Choose 1 Symbol & 1 Tool kit (Max 2):",
    limit: 2,
    options: [
      "[Symbol] Black iron maul (immune to magic; close, forceful, awkward, +1 damage)",
      "[Symbol] Makerglass shield (indestructible, +1 armor, +1 Readiness on Defend)",
      "[Symbol] Helm set with a dark ice jewel (1 blue Boost die vs mind magic)",
      "[Tool] Scribe's tools (parchment, ink, pigments, vials, quills, notebook)",
      "[Tool] Aviary (thick gloves, bird hoods, tethers, messenger birds, cages)",
      "[Tool] Carpenter's tools (chisels, files, nails, pitch, prybars, saws)",
      "[Tool] Engineer's tools (rulers, tapes, plumb-bobs, tripods, block & tackle)",
      "[Tool] Smithy or smithy access (ingots, thick gloves, tongs, bellows, anvil)"
    ]
  },
  "Lightbearer": {
    label: "Choose 2 Special Possessions:",
    limit: 2,
    options: [
      "Apiary (beeswax, candles [lasts ~1 hr], honey, bee smokers, hats & veils)",
      "Books & scrolls (3 uses; consult for Know Things success with Advantage)",
      "Chandlery (beeswax, candles, wicks, scented herbs, soap, lye, ash)",
      "Distillery (skins of fine whisky [3 uses], copper tubes, malt, stills, barrels)",
      "Glassworks (vials, charms, lenses, lanterns, extra oil, etc.)",
      "Holy relics (3 uses; spend in lieu of Invoke Sun God consequence)",
      "Luthier's tools (chisels, files, catgut, woods, stains, lute, fiddle)"
    ]
  },
  "Marshal": {
    label: "Choose 2 Special Possessions:",
    limit: 2,
    options: [
      "Chirurgeon's tools (catgut, straps, bandages, poultice, willow bark, bonesaws)",
      "Distillery (skins of fine whisky [3 uses], copper tubes, malt, stills, barrels)",
      "Engineer's tools (rulers, tapes, plumb-bobs, tripods, block & tackle, wheelbarrow)",
      "Personal symbol (flag, crest, marking; display to gain crew Loyalty)",
      "Scribe's tools (parchment, ink, pigments, vials, quills, notebook)",
      "Weapons of war (sword, long steel spear, battleaxe, composite bow)"
    ]
  },
  "Ranger": {
    label: "Choose 2 Special Possessions (in addition to composite bow):",
    limit: 2,
    options: [
      "Distillery (skins of fine whisky [3 uses], copper tubes, malt, stills, barrels)",
      "Hideouts (3 uses; expend to have a well-stocked, safe shelter nearby)",
      "Husbandry tools (brushes, muzzles, collars, feed, whips, bridles)",
      "Hounds (2-3 followers; trackers, keen-nosed, fast; HP 6, Armor 0, Damage d6)"
    ]
  },
  "Seeker": {
    label: "Choose 2 Special Possessions (in addition to scribe's tools):",
    limit: 2,
    options: [
      "Books & scrolls (3 uses; consult for Know Things success with Advantage)",
      "Distillery (skins of fine whisky [3 uses], copper tubes, malt, stills, barrels)",
      "Engineer's tools (rulers, tapes, plumb-bobs, tripods, block & tackle, wheelbarrow)",
      "Laboratory (chemics, reagents, vials, measures, scales, decanters)",
      "Naphtha kit (produces d4-1 uses of thrown, area, dangerous, ignores armor naphtha)"
    ]
  },
  "Would-be Hero": {
    label: "Choose 2 Special Possessions:",
    limit: 2,
    options: [
      "Chirurgeon's tools (catgut, straps, bandages, poultice, willow bark, bonesaws)",
      "Distillery (skins of fine whisky [3 uses], copper tubes, malt, stills, barrels)",
      "Engineer's tools (rulers, tapes, plumb-bobs, tripods, block & tackle, wheelbarrow)",
      "Personal symbol (flag, crest, marking)",
      "Scribe's tools (parchment, ink, pigments, vials, quills, notebook)",
      "Weapons of war (sword, long steel spear, battleaxe, composite bow)"
    ]
  }
};

const BONDS_QUESTIONS_DATA = {
  "Blessed": [
    "Who is your betrothed / true love / ceremonial partner?",
    "Whom do you secretly watch over, and why?",
    "Which of you fears the wider world?"
  ],
  "Fox": [
    "Which one of you joined me in my latest hijinx?",
    "Which one of you brings your problems to me?",
    "Which one of you saved my bacon, mor'n once?",
    "Which one of you trusts me not one bit?"
  ],
  "Heavy": [
    "Which one of you once dragged me home, bleeding and unconscious?",
    "Which one of you can I trust to always have my back?",
    "Which one of you has stayed my hand?",
    "Which one of you has traded blows with me?"
  ],
  "Judge": [
    "Which one of you is a true disciple of Aratis?",
    "Which one of you is my closest confidant?",
    "Which one of you has stood beside me in battle against unnatural chaos?",
    "Against which of you have I passed judgement?"
  ],
  "Lightbearer": [
    "Which one of you is an old and dear friend?",
    "Which one of you shares my faith?",
    "Which one of you scoffs at mercy and hope?",
    "Which one of you will need my guidance soon?"
  ],
  "Marshal": [
    "Which one of you is or was part of my crew?",
    "Which one of you have I promised to keep safe?",
    "Which one of you do I still have doubts about?",
    "Which one of you ignored my orders and got someone killed?"
  ],
  "Ranger": [
    "Which one of you fears the wider world?",
    "Which one of you has shown me great beauty?",
    "Which one of you have I caught sometimes staring out at the horizon?",
    "Which one of you lacked the stomach to put something out if its misery?"
  ],
  "Seeker": [
    "Which one of you led me to a key discovery?",
    "Which one of you has been at my side the entire way?",
    "Which one of you most fears the path I tread?",
    "Which one of you is keeping secrets from me?"
  ],
  "Would-be Hero": [
    "Which one of you is my childhood rival/friend?",
    "Which one of you did I try to impress, and fail?",
    "Which one of you saved me from my own folly?",
    "Which one of you has stayed my hand?"
  ]
};

let dicePool = {
  ability: 0,
  proficiency: 0,
  boost: 0,
  difficulty: 0,
  challenge: 0,
  setback: 0
};
let isRisky = false;

// Dice Faces Standard Definitions
const DICE_FACES = {
  ability: [
    { blank: true },
    { success: 1 },
    { success: 1 },
    { success: 2 },
    { advantage: 1 },
    { advantage: 1 },
    { success: 1, advantage: 1 },
    { advantage: 2 }
  ],
  proficiency: [
    { blank: true },
    { success: 1 },
    { success: 1 },
    { success: 2 },
    { success: 2 },
    { advantage: 1 },
    { success: 1, advantage: 1 },
    { success: 1, advantage: 1 },
    { success: 1, advantage: 1 },
    { advantage: 2 },
    { advantage: 2 },
    { triumph: 1, success: 1 } // Triumph counts as Triumph and 1 Success
  ],
  boost: [
    { blank: true },
    { blank: true },
    { success: 1 },
    { success: 1, advantage: 1 },
    { advantage: 2 },
    { advantage: 1 }
  ],
  difficulty: [
    { blank: true },
    { failure: 1 },
    { failure: 2 },
    { threat: 1 },
    { threat: 1 },
    { threat: 1 },
    { threat: 2 },
    { failure: 1, threat: 1 }
  ],
  challenge: [
    { blank: true },
    { failure: 1 },
    { failure: 1 },
    { failure: 2 },
    { failure: 2 },
    { threat: 1 },
    { threat: 1 },
    { failure: 1, threat: 1 },
    { failure: 1, threat: 1 },
    { threat: 2 },
    { threat: 2 },
    { despair: 1, failure: 1 } // Despair counts as Despair and 1 Failure
  ],
  setback: [
    { blank: true },
    { blank: true },
    { failure: 1 },
    { failure: 1 },
    { threat: 1 },
    { threat: 1 }
  ]
};

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
  renderSavedCharacters();
  renderCampaigns();
  
  // Set up default blank state
  clearDicePool();

  // Google Drive Event Listeners
  const CLIENT_ID_KEY = "stonesys:gdrive_client_id";
  
  const settingsModal = document.getElementById("settings-modal");
  const loaderModal = document.getElementById("loader-modal");
  const clientIdInput = document.getElementById("gdrive-client-id-input");
  
  // Load saved client ID
  clientIdInput.value = localStorage.getItem(CLIENT_ID_KEY) || "";
  
  document.getElementById("gdrive-settings-btn").addEventListener("click", () => {
    clientIdInput.value = localStorage.getItem(CLIENT_ID_KEY) || "";
    settingsModal.style.display = "flex";
  });
  
  document.getElementById("settings-close-btn").addEventListener("click", () => {
    settingsModal.style.display = "none";
  });
  
  document.getElementById("settings-save-btn").addEventListener("click", () => {
    localStorage.setItem(CLIENT_ID_KEY, clientIdInput.value.trim());
    settingsModal.style.display = "none";
  });
  
  document.getElementById("loader-close-btn").addEventListener("click", () => {
    loaderModal.style.display = "none";
  });
  
  document.getElementById("print-playbook-btn").addEventListener("click", () => {
    if (activeArchetype) {
      const characters = getSavedCharacters();
      const existing = characters.find(character => character.id === currentCharacterId);
      const snapshot = createCharacterSnapshot(existing);
      const slug = activeArchetype.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      localStorage.setItem(`stonesys:${slug}`, JSON.stringify(snapshot));
      window.open(`playbook.html?pb=${slug}`, '_blank');
    }
  });

  document.getElementById("generate-character-btn").addEventListener("click", () => {
    if (!activeArchetype) return;

    // 1. Generate name
    const nameInput = document.getElementById('character-name-input');
    nameInput.value = generateName(activeCampaign ? activeCampaign.id : 'stonetop');

    // 2. Randomize stats using getCreationStatPool and shuffle
    const pool = getCreationStatPool();
    const shuffledNames = shuffleStats(STAT_NAMES);
    const sortedPool = pool.slice().sort((a, b) => b - a);
    currentStats = {};
    shuffledNames.forEach((statName, index) => {
      currentStats[statName] = sortedPool[index] || 2;
    });
    renderStats(currentStats);

    // 3. Randomize background
    const bgRadios = Array.from(document.querySelectorAll('input[name="archetype-background"]'));
    if (bgRadios.length > 0) {
      bgRadios.forEach(r => r.checked = false);
      const randBg = bgRadios[Math.floor(Math.random() * bgRadios.length)];
      randBg.checked = true;
    }

    // 3.5. Randomize Instinct
    const instinctRadios = Array.from(document.querySelectorAll('input[name="character-instinct"]'));
    if (instinctRadios.length > 0) {
      instinctRadios.forEach(r => r.checked = false);
      const randInstinct = instinctRadios[Math.floor(Math.random() * instinctRadios.length)];
      randInstinct.checked = true;
    }

    // 3.7. Randomize Starting Gear
    if (activeCampaign && activeCampaign.id === 'stonetop' && activeArchetype) {
      const gearData = STARTING_GEAR_DATA[activeArchetype.name];
      if (gearData) {
        const checkboxes = Array.from(document.querySelectorAll('.starting-gear-checkbox'));
        checkboxes.forEach(cb => cb.checked = false);
        const shuffled = shuffleStats(checkboxes);
        const toCheck = shuffled.slice(0, gearData.limit);
        toCheck.forEach(cb => cb.checked = true);
        updateGearTextarea(activeArchetype, toCheck.map(cb => cb.value));
      }
    }

    // 3.8. Randomize Bonds
    if (activeCampaign && activeCampaign.id === 'stonetop') {
      const inputs = Array.from(document.querySelectorAll('.bonds-question-input'));
      inputs.forEach(input => {
        input.value = generateName('stonetop');
      });
    }

    // 4. Randomize starting moves
    const startingCheckboxes = Array.from(document.querySelectorAll('.choice-move-checkbox[data-move-stage="starting"]'));
    startingCheckboxes.forEach(cb => cb.checked = false);
    const shuffledCbs = shuffleStats(startingCheckboxes);
    const groups = getMoveGroups(activeArchetype, activeCampaign);
    for (const cb of shuffledCbs) {
      cb.checked = true;
      const currentSelected = Array.from(document.querySelectorAll('.choice-move-checkbox[data-move-stage="starting"]:checked')).map(input => input.value);
      const result = validateStartingChoices(groups, currentSelected, { requireComplete: false });
      if (!result.ok) {
        cb.checked = false;
      }
    }

    updateStatRuleNote();
    setSaveStatus('Unsaved randomized changes.');
  });

  // Save to Google Drive
  document.getElementById("gdrive-save-btn").addEventListener("click", () => {
    if (!activeCampaign || !activeArchetype) {
      alert("Please select a campaign and archetype first.");
      return;
    }
    const clientId = localStorage.getItem(CLIENT_ID_KEY);
    if (!clientId) {
      alert("Please configure your Google OAuth Client ID in Settings first.");
      settingsModal.style.display = "flex";
      return;
    }
    
    document.getElementById("loading").style.display = "block";
        getAccessToken(clientId, async (token) => {
      try {
        const characters = getSavedCharacters();
        const existing = characters.find(character => character.id === currentCharacterId);
        const snapshot = createCharacterSnapshot(existing);
        const result = await saveCharacterToDrive(token, snapshot, activeArchetype);
        
        if (result && result.id) {
          snapshot.driveFileId = result.id;
          const nextCharacters = existing
            ? characters.map(character => character.id === snapshot.id ? snapshot : character)
            : characters.concat(snapshot);
          
          currentCharacterId = snapshot.id;
          writeSavedCharacters(nextCharacters);
          renderSavedCharacters();
        }
        
        alert("Character sheet successfully saved to Google Drive!");
      } catch (e) {
        alert("Failed to save to Google Drive: " + e.message);
      } finally {
        document.getElementById("loading").style.display = "none";
      }
    });
  });

  // Load from Google Drive
  document.getElementById("gdrive-load-btn").addEventListener("click", () => {
    const clientId = localStorage.getItem(CLIENT_ID_KEY);
    if (!clientId) {
      alert("Please configure your Google OAuth Client ID in Settings first.");
      settingsModal.style.display = "flex";
      return;
    }
    
    document.getElementById("loading").style.display = "block";
    getAccessToken(clientId, async (token) => {
      try {
        const files = await listDriveFiles(token);
        const listDiv = document.getElementById("gdrive-file-list");
        listDiv.innerHTML = "";
        
        if (files.length === 0) {
          listDiv.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-muted);">No StoneSys character documents found.</div>';
        } else {
          files.forEach(f => {
            const item = document.createElement("div");
            item.className = "file-item";
            const dateStr = new Date(f.modifiedTime).toLocaleDateString();
            item.innerHTML = `
              <span class="file-name">${f.name}</span>
              <span class="file-date">Modified: ${dateStr}</span>
            `;
            item.addEventListener("click", async () => {
              loaderModal.style.display = "none";
              document.getElementById("loading").style.display = "block";
              try {
                const character = await loadFromDrive(token, f.id);
                applyCharacterSnapshot(character);
                saveCurrentCharacter();
                alert("Character sheet successfully loaded!");
              } catch (e) {
                alert("Failed to load character: " + e.message);
              } finally {
                document.getElementById("loading").style.display = "none";
              }
            });
            listDiv.appendChild(item);
          });
        }
        loaderModal.style.display = "flex";
      } catch (e) {
        alert("Failed to list files: " + e.message);
      } finally {
        document.getElementById("loading").style.display = "none";
      }
    });
  });

  // Auto-import from URL parameter
  const params = new URLSearchParams(window.location.search);
  const importCode = params.get("import") || params.get("load");
  if (importCode) {
    try {
      const decoded = decodeURIComponent(escape(atob(importCode)));
      const parsed = JSON.parse(decoded);
      
      applyCharacterSnapshot(parsed);
      saveCurrentCharacter();
      
      const url = new URL(window.location);
      url.searchParams.delete("import");
      url.searchParams.delete("load");
      window.history.replaceState({}, document.title, url.toString());
    } catch (e) {
      console.error("URL import failed:", e);
    }
  }
});

function getSavedCharacters() {
  try {
    const raw = localStorage.getItem(SAVE_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Unable to read saved characters', error);
    return [];
  }
}

function writeSavedCharacters(characters) {
  localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(characters));
}

function setSaveStatus(message) {
  const status = document.getElementById('save-status');
  if (status) status.innerText = message;
}

function renderSavedCharacters() {
  const select = document.getElementById('saved-character-select');
  if (!select) return;
  
  const characters = getSavedCharacters();
  select.innerHTML = '';
  
  if (characters.length === 0) {
    const empty = document.createElement('option');
    empty.value = '';
    empty.innerText = 'No saved characters';
    select.appendChild(empty);
    return;
  }
  
  characters
    .slice()
    .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
    .forEach(character => {
      const option = document.createElement('option');
      option.value = character.id;
      option.innerText = `${character.name || 'Unnamed'} - ${character.campaignName || character.campaignId} / ${character.archetypeName}`;
      select.appendChild(option);
    });
  
  if (currentCharacterId) {
    select.value = currentCharacterId;
  }
}

// Render campaigns list
function renderCampaigns() {
  const container = document.getElementById('campaign-list');
  container.innerHTML = '';
  
  CAMPAIGNS_DATA.forEach(campaign => {
    const card = document.createElement('div');
    card.className = `campaign-card ${activeCampaign && activeCampaign.id === campaign.id ? 'active' : ''}`;
    card.innerHTML = `
      <h3>${campaign.name}</h3>
      <p>${campaign.tagline}</p>
    `;
    card.addEventListener('click', () => selectCampaign(campaign));
    container.appendChild(card);
  });
}

// Select Campaign
function selectCampaign(campaign) {
  activeCampaign = campaign;
  activeArchetype = null;
  
  // Re-render campaigns to update active class
  renderCampaigns();
  
  // Render active campaign summary
  const summaryBox = document.getElementById('campaign-summary');
  summaryBox.innerHTML = `
    <h2>${campaign.name}</h2>
    <div class="tagline">${campaign.tagline}</div>
    <p>${campaign.description}</p>
    <div class="mechanics-note">
      <strong>Core Rules Summary:</strong> ${campaign.mechanics}
    </div>
  `;
  
  // Render archetypes for this campaign
  renderArchetypes();
  
  // Hide character sheet and show empty state
  document.getElementById('character-sheet').style.display = 'none';
  document.getElementById('sheet-empty-state').style.display = 'block';
}

// Render Archetypes list
function renderArchetypes() {
  const container = document.getElementById('archetype-list');
  container.innerHTML = '';
  
  if (!activeCampaign) return;
  
  activeCampaign.archetypes.forEach(arch => {
    const btn = document.createElement('button');
    btn.className = `archetype-btn ${activeArchetype && activeArchetype.name === arch.name ? 'active' : ''}`;
    btn.innerHTML = `
      <span>${arch.name}</span>
      <span class="btn-arrow">➔</span>
    `;
    btn.addEventListener('click', () => selectArchetype(arch));
    container.appendChild(btn);
  });
}

// Select Archetype
function selectArchetype(arch) {
  activeArchetype = arch;
  currentCharacterId = null;
  
  // Update active class on buttons
  renderArchetypes();
  
  // Show sheet, hide empty state
  document.getElementById('character-sheet').style.display = 'block';
  document.getElementById('sheet-empty-state').style.display = 'none';
  
  // Populate sheet details
  document.getElementById('sheet-name').innerText = arch.name;
  document.getElementById('sheet-duty').innerText = arch.duty;
  document.getElementById('character-name-input').value = '';
  
  currentHP = arch.hp;
  currentTotalXP = 0;
  currentXP = 0;
  currentStats = normalizeStatsToPool(arch.stats, getCreationStatPool());
  xpLedger = [];
  updateSheetCounters();
  
  // Populate stats
  renderStats(currentStats);
  
  // Populate backgrounds
  renderBackgrounds(arch.backgrounds);
  
  // Populate Instincts
  renderInstincts(arch.instincts);
  
  // Populate moves
  renderMoves(arch);
  
  // Populate gear
  if (activeCampaign && activeCampaign.id === 'stonetop') {
    renderStartingGear(arch, null);
    updateGearTextarea(arch, []);
    renderBondsQuestions(arch, null);
  } else {
    document.getElementById('starting-gear-container').style.display = 'none';
    document.getElementById('bonds-questions-container').style.display = 'none';
    document.getElementById('gear-text').value = arch.gear || '';
  }
  document.getElementById('steading-upgrades-text').value = '';
  document.getElementById('character-notes-text').value = '';
  renderXpLedger();
  
  // Render backstory and companions (Page 2)
  renderBackstoryAndCompanions(arch, null);

  setSaveStatus('New unsaved character.');
}

// Update HP/XP Display
function updateSheetCounters() {
  document.getElementById('sheet-hp-display').value = currentHP;
  document.getElementById('sheet-total-xp-display').value = currentTotalXP;
  document.getElementById('sheet-xp-display').value = currentXP;
}

function getSpentXP() {
  return xpLedger.reduce((sum, entry) => sum + entry.amount, 0);
}

function getCurrentStatTotal() {
  return STAT_NAMES.reduce((sum, statName) => sum + (currentStats[statName] || 0), 0);
}

function getCreationStatPool() {
  if (!activeArchetype) return [];
  
  if (activeCampaign && activeCampaign.id === 'stonetop') {
    if (activeArchetype.name === 'The Would-be Hero') {
      return STONETOP_WOULD_BE_HERO_STATS.slice();
    }
    return STONETOP_CREATION_STATS.slice();
  }
  
  return STAT_NAMES.map(statName => activeArchetype.stats[statName] || 2).sort((a, b) => b - a);
}

function shuffleStats(statNames) {
  const shuffled = statNames.slice();
  
  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  
  return shuffled;
}

function normalizeStatsToPool(baseStats, pool) {
  const valueGroups = {};
  STAT_NAMES.forEach(statName => {
    const value = baseStats[statName] || 0;
    if (!valueGroups[value]) valueGroups[value] = [];
    valueGroups[value].push(statName);
  });
  
  const rankedStats = Object.keys(valueGroups)
    .map(Number)
    .sort((a, b) => b - a)
    .flatMap(value => shuffleStats(valueGroups[value]));
  const sortedPool = pool.slice().sort((a, b) => b - a);
  const normalized = {};
  
  rankedStats.forEach((statName, index) => {
    normalized[statName] = sortedPool[index] || 2;
  });
  
  return normalized;
}

function getCreationStatBank() {
  const poolTotal = getCreationStatPool().reduce((sum, value) => sum + value, 0);
  return Math.max(0, poolTotal - getCurrentStatTotal());
}

function statsMatchCreationPool() {
  const current = STAT_NAMES.map(statName => currentStats[statName] || 0).sort((a, b) => b - a);
  const pool = getCreationStatPool().slice().sort((a, b) => b - a);
  return current.length === pool.length && current.every((value, index) => value === pool[index]);
}

function isCreationStatMode() {
  return activeArchetype && !currentCharacterId;
}

function updateStatRuleNote() {
  const note = document.getElementById('stat-rule-note');
  if (!note || !activeArchetype) return;
  
  if (isCreationStatMode()) {
    const poolText = getCreationStatPool().join(', ');
    const bank = getCreationStatBank();
    let completeText = 'assignment has the wrong mix';
    if (statsMatchCreationPool()) {
      completeText = 'assignment complete';
    } else if (bank > 0) {
      completeText = `${bank} unassigned ${bank === 1 ? 'point' : 'points'}`;
    }
    note.innerText = `Creation stats: assign ${poolText} wherever you want. Lower one stat to free points, then raise another. Save locks the assignment. ${completeText}.`;
  } else {
    note.innerText = `Stats are fixed after save. Raising a stat costs ${STAT_ADVANCE_XP_COST} XP and records an ability spend.`;
  }
}

function adjustHP(delta) {
  if (!activeArchetype) return;
  currentHP = Math.max(0, Math.min(activeArchetype.hp + 10, currentHP + delta));
  updateSheetCounters();
}

function adjustXP(delta) {
  if (!activeArchetype) return;
  const maxAvailable = Math.max(0, currentTotalXP - getSpentXP());
  currentXP = Math.max(0, Math.min(maxAvailable, currentXP + delta));
  updateSheetCounters();
}

function adjustTotalXP(delta) {
  if (!activeArchetype) return;
  const nextTotal = Math.max(getSpentXP(), currentTotalXP + delta);
  const actualDelta = nextTotal - currentTotalXP;
  currentTotalXP = nextTotal;
  currentXP = Math.max(0, Math.min(currentTotalXP - getSpentXP(), currentXP + actualDelta));
  updateSheetCounters();
}

// Render Stats Cards
function renderStats(stats) {
  const container = document.getElementById('stats-grid-container');
  container.innerHTML = '';
  updateStatRuleNote();
  
  STAT_NAMES.forEach(sName => {
    const val = stats[sName] || 2;
    const card = document.createElement('div');
    card.className = 'stat-card';
    card.innerHTML = `
      <div class="stat-name">${sName}</div>
      <div class="stat-val">${val}</div>
      <div class="stat-dice">
        <div class="die-icon ability" style="width:12px; height:12px; font-size: 8px;"></div>
        <span>${val} Green</span>
      </div>
      <div class="stat-adjust-row">
        <button type="button" onclick="event.stopPropagation(); adjustStat('${sName}', -1)">-</button>
        <button type="button" onclick="event.stopPropagation(); adjustStat('${sName}', 1)">+</button>
      </div>
    `;
    card.addEventListener('click', () => loadStatIntoPool(sName, val));
    container.appendChild(card);
  });
}

function adjustStat(statName, delta) {
  if (!activeArchetype) return;
  const current = currentStats[statName] || activeArchetype.stats[statName] || 2;
  const pool = getCreationStatPool();
  const minCreationStat = Math.min(...pool);
  const maxCreationStat = Math.max(...pool);
  
  if (delta < 0) {
    if (!isCreationStatMode()) {
      setSaveStatus('Stats are fixed after character creation. Undo an ability XP spend to reverse a purchased increase.');
      return;
    }
    if (current <= minCreationStat) {
      setSaveStatus(`${statName} is already at the creation minimum of ${minCreationStat}.`);
      return;
    }
    currentStats[statName] = current - 1;
    renderStats(currentStats);
    return;
  }
  
  if (isCreationStatMode()) {
    if (current >= maxCreationStat) {
      setSaveStatus(`${statName} is already at the creation maximum of ${maxCreationStat}.`);
      return;
    }
    
    if (getCreationStatBank() <= 0) {
      setSaveStatus('Lower another stat first; creation assignment cannot create extra stat points.');
      return;
    }
    
    currentStats[statName] = current + 1;
    renderStats(currentStats);
    return;
  }
  
  if (current < 5) {
    buyStatIncrease(statName);
  }
}

function buyStatIncrease(statName) {
  if (currentXP < STAT_ADVANCE_XP_COST) {
    setSaveStatus(`Raising ${statName} costs ${STAT_ADVANCE_XP_COST} XP.`);
    return;
  }
  
  const current = currentStats[statName] || activeArchetype.stats[statName] || 2;
  if (current >= 5) {
    setSaveStatus(`${statName} is already at the maximum of 5.`);
    return;
  }
  
  const entry = {
    id: makeId(),
    amount: STAT_ADVANCE_XP_COST,
    category: 'ability',
    label: `${statName} +1`,
    statName,
    statDelta: 1,
    createdAt: new Date().toISOString()
  };
  
  xpLedger.push(entry);
  currentXP = Math.max(0, currentXP - STAT_ADVANCE_XP_COST);
  currentStats[statName] = current + 1;
  updateSheetCounters();
  renderStats(currentStats);
  renderXpLedger();
  rerenderMovesPreservingSelections();
  setSaveStatus(`${statName} raised for ${STAT_ADVANCE_XP_COST} XP. Save when ready.`);
}

function applyStatLedgerUndo(entry) {
  if (!entry.statName || !entry.statDelta) return;
  const current = currentStats[entry.statName] || activeArchetype.stats[entry.statName] || 2;
  currentStats[entry.statName] = Math.max(1, current - entry.statDelta);
  renderStats(currentStats);
}

// Render Backgrounds radio choices
function renderBackgrounds(backgrounds) {
  const container = document.getElementById('backgrounds-list');
  container.innerHTML = '';
  
  if (!backgrounds || backgrounds.length === 0) {
    container.innerHTML = '<div class="results-empty">No background details.</div>';
    return;
  }
  
  backgrounds.forEach((bg, index) => {
    const div = document.createElement('div');
    div.className = 'bg-choice';
    div.innerHTML = `
      <label>
        <input type="radio" name="archetype-background" value="${bg.name}" ${index === 0 ? 'checked' : ''}>
        <div>
          <h4>${bg.name}</h4>
          <p>${bg.description}</p>
        </div>
      </label>
    `;
    const input = div.querySelector('input[name="archetype-background"]');
    input.addEventListener('change', () => {
      setSaveStatus('Unsaved background change.');
      if (activeArchetype) {
        renderBackstoryAndCompanions(activeArchetype, getBackstorySelections());
      }
    });
    container.appendChild(div);
  });
}

// Render Instincts list
function renderInstincts(instincts, selectedInstinct = null) {
  const container = document.getElementById('instincts-list');
  container.innerHTML = '';
  
  if (!instincts || instincts.length === 0) {
    container.innerHTML = '<div class="results-empty">No specific instincts.</div>';
    return;
  }
  
  const isStonetop = activeCampaign && activeCampaign.id === 'stonetop';
  const parsed = [];
  
  if (isStonetop) {
    for (let i = 0; i < instincts.length; i += 2) {
      const name = instincts[i];
      const desc = instincts[i + 1] || '';
      parsed.push({ name, desc });
    }
  } else {
    instincts.forEach(name => {
      parsed.push({ name, desc: '' });
    });
  }
  
  parsed.forEach(inst => {
    const item = document.createElement('div');
    item.className = 'instinct-select-row';
    
    const label = document.createElement('label');
    label.className = 'instinct-label';
    
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'character-instinct';
    input.value = inst.name;
    
    if (selectedInstinct && selectedInstinct === inst.name) {
      input.checked = true;
    } else if (!selectedInstinct && parsed.length === 1) {
      // If there's only 1 instinct, select it by default
      input.checked = true;
    }
    
    input.addEventListener('change', () => {
      setSaveStatus('Unsaved instinct change.');
    });
    
    const textSpan = document.createElement('span');
    textSpan.className = 'instinct-text';
    if (inst.desc) {
      textSpan.innerHTML = `<strong>${inst.name}</strong> · <span class="instinct-desc">${inst.desc}</span>`;
    } else {
      textSpan.innerText = inst.name;
    }
    
    label.appendChild(input);
    label.appendChild(textSpan);
    item.appendChild(label);
    container.appendChild(item);
  });
}

// Render starting gear picker (Stonetop playbooks)
function renderStartingGear(arch, savedSelections = null) {
  const container = document.getElementById('starting-gear-container');
  const choicesDiv = document.getElementById('starting-gear-choices');
  const label = document.getElementById('starting-gear-label');
  
  choicesDiv.innerHTML = '';
  
  if (!activeCampaign || activeCampaign.id !== 'stonetop' || !STARTING_GEAR_DATA[arch.name]) {
    container.style.display = 'none';
    return;
  }
  
  const data = STARTING_GEAR_DATA[arch.name];
  container.style.display = 'block';
  label.innerText = data.label;
  
  data.options.forEach((opt, idx) => {
    const row = document.createElement('label');
    row.style.display = 'flex';
    row.style.alignItems = 'flex-start';
    row.style.gap = '0.4rem';
    row.style.fontSize = '0.85rem';
    row.style.cursor = 'pointer';
    row.style.marginBottom = '0.2rem';
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'starting-gear-checkbox';
    input.value = opt;
    
    if (savedSelections && savedSelections.includes(opt)) {
      input.checked = true;
    }
    
    input.addEventListener('change', () => {
      const checked = choicesDiv.querySelectorAll('.starting-gear-checkbox:checked');
      if (checked.length > data.limit) {
        input.checked = false;
        alert(`You can select at most ${data.limit} starting possessions.`);
        return;
      }
      
      updateGearTextarea(arch, Array.from(choicesDiv.querySelectorAll('.starting-gear-checkbox:checked')).map(cb => cb.value));
      setSaveStatus('Unsaved gear change.');
    });
    
    row.appendChild(input);
    row.appendChild(document.createTextNode(opt));
    choicesDiv.appendChild(row);
  });
}

function updateGearTextarea(arch, selectedPossessions) {
  const gearText = document.getElementById('gear-text');
  
  // Base fixed items per playbook
  let baseGear = [];
  if (arch.name === "Blessed") baseGear = ["Symbol of authority", "Scribe's tools"];
  else if (arch.name === "Judge") baseGear = ["Symbol of authority", "Scribe's tools"];
  else if (arch.name === "Seeker") baseGear = ["Scribe's tools"];
  else if (arch.name === "Ranger") baseGear = ["Composite bow", "Modest clothes"];
  else if (arch.name === "Fox") baseGear = ["Modest clothes", "Dagger"];
  else if (arch.name === "Heavy") baseGear = ["Modest clothes", "Dagger"];
  else if (arch.name === "Lightbearer") baseGear = ["Modest clothes", "Consecrated flame", "Dagger"];
  else if (arch.name === "Marshal") baseGear = ["Modest clothes", "Dagger"];
  else if (arch.name === "Would-be Hero") baseGear = ["Modest clothes", "Dagger"];
  
  let header = baseGear.map(item => `• ${item}`).join('\n');
  let selections = selectedPossessions.map(p => `• ${p}`).join('\n');
  
  // Filter out existing bulleted items or base items in current textarea to preserve custom manual entries
  const currentLines = gearText.value.split('\n');
  const customLines = currentLines.filter(line => {
    const clean = line.trim();
    if (!clean) return false;
    if (clean.startsWith('•')) return false;
    if (clean === "Additional Gear:") return false;
    // Check if it's one of the base items
    if (baseGear.some(item => clean.toLowerCase().includes(item.toLowerCase()))) return false;
    return true;
  });
  
  let result = "";
  if (header) result += header + "\n";
  if (selections) result += selections + "\n";
  if (customLines.length > 0) {
    result += "\nAdditional Gear:\n" + customLines.join('\n');
  }
  
  gearText.value = result.trim();
}

// Render bonds questions inputs (Stonetop playbooks)
function renderBondsQuestions(arch, savedAnswers = null) {
  const container = document.getElementById('bonds-questions-container');
  const listDiv = document.getElementById('bonds-questions-list');
  
  listDiv.innerHTML = '';
  
  if (!activeCampaign || activeCampaign.id !== 'stonetop' || !BONDS_QUESTIONS_DATA[arch.name]) {
    container.style.display = 'none';
    return;
  }
  
  const questions = BONDS_QUESTIONS_DATA[arch.name];
  container.style.display = 'block';
  
  questions.forEach((q, idx) => {
    const row = document.createElement('div');
    row.className = 'bonds-question-row';
    row.style.display = 'flex';
    row.style.flexDirection = 'column';
    row.style.gap = '0.2rem';
    row.style.marginBottom = '0.5rem';
    
    const label = document.createElement('label');
    label.innerText = q;
    label.style.fontSize = '0.85rem';
    label.style.color = 'var(--text-main)';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'bonds-question-input';
    input.dataset.index = idx;
    input.placeholder = "Enter character name & details...";
    input.style.padding = '0.35rem 0.5rem';
    input.style.fontSize = '0.85rem';
    input.style.border = '1px solid rgba(107, 79, 42, 0.2)';
    input.style.borderRadius = '4px';
    input.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    input.style.color = 'var(--text-main)';
    
    if (savedAnswers && savedAnswers[idx]) {
      input.value = savedAnswers[idx];
    }
    
    input.addEventListener('input', () => {
      setSaveStatus('Unsaved bonds change.');
    });
    
    row.appendChild(label);
    row.appendChild(input);
    listDiv.appendChild(row);
  });
}

function renderMoveList(container, moves, options = {}) {
  container.innerHTML = '';

  if (!moves || moves.length === 0) {
    container.innerHTML = `<div class="results-empty">${options.emptyText || 'No moves in this category.'}</div>`;
    return;
  }
  
  moves.forEach(move => {
    const item = document.createElement('div');
    item.className = `move-item ${move.locked ? 'move-locked' : ''}`;
    const description = move.description || move.text || '';
    const badge = move.locked ? '<span class="move-lock-badge">Level 6+</span>' : '';

    if (options.selectable) {
      item.innerHTML = `
        <label class="move-select-label">
          <input type="checkbox" class="choice-move-checkbox" value="${move.name}" data-move-stage="${options.stage || 'advancement'}">
          <div>
            <h4 style="margin-bottom: 0;">${move.name} ${badge}</h4>
            <p style="margin-top: 0.25rem;">${description}</p>
          </div>
        </label>
      `;
      const checkbox = item.querySelector('.choice-move-checkbox');
      checkbox.addEventListener('change', (event) => {
        if (options.stage === 'starting') {
          const groups = getMoveGroups(activeArchetype, activeCampaign);
          const result = validateStartingChoices(groups, getSelectedStartingMoves(), { requireComplete: false });
          if (!result.ok) {
            event.target.checked = false;
            setSaveStatus(result.message);
          }
          return;
        }
        if (options.stage === 'advancement' || options.stage === 'level6') {
          rerenderMovesPreservingSelections();
        }
      });
    } else {
      item.innerHTML = `
        <h4>${move.name} ${badge}</h4>
        <p>${description}</p>
      `;
    }
    container.appendChild(item);
  });
}

function getAdvancementMarkerCount(selectedMoveNames = null, groups = null) {
  const ledgerCount = xpLedger.filter((entry) => LEVEL_ADVANCEMENT_CATEGORIES.has(entry.category)).length;
  let checkedAdvancementCount = document.querySelectorAll('.choice-move-checkbox[data-move-stage="advancement"]:checked').length;
  if (Array.isArray(selectedMoveNames) && groups) {
    const advancementNames = new Set(groups.advancement.map((move) => move.name));
    checkedAdvancementCount = selectedMoveNames.filter((name) => advancementNames.has(name)).length;
  }
  return Math.max(ledgerCount, checkedAdvancementCount);
}

function isLevelSixUnlocked(selectedMoveNames = null, groups = null) {
  return getAdvancementMarkerCount(selectedMoveNames, groups) >= LEVEL_SIX_ADVANCEMENT_COUNT;
}

function renderHiddenLevelSixList(container, totalChoices) {
  container.innerHTML = `
    <div class="results-empty">
      Hidden until level 6. Mark ${LEVEL_SIX_ADVANCEMENT_COUNT} advancement choices or advancement XP spends to reveal ${totalChoices} level 6+ choice${totalChoices === 1 ? '' : 's'}.
    </div>
  `;
}

function rerenderMovesPreservingSelections() {
  if (!activeArchetype) return;
  const selectedMoves = getSelectedChoiceMoves();
  renderMoves(activeArchetype, selectedMoves);
  setSelectedChoiceMoves(selectedMoves);
}

// Render fixed, starting, advancement, and level-gated moves
function renderMoves(arch, selectedMoveNames = null) {
  const groups = getMoveGroups(arch, activeCampaign);
  const sigContainer = document.getElementById('signature-moves-list');
  const startingContainer = document.getElementById('starting-moves-list');
  const advancementContainer = document.getElementById('advancement-moves-list');
  const level6Container = document.getElementById('level6-moves-list');
  const startingNote = document.getElementById('starting-moves-note');
  const startingBadge = document.getElementById('starting-moves-badge');
  const level6Badge = document.getElementById('level6-moves-badge');

  const campaignBox = document.getElementById('campaign-moves-box');
  const campaignContainer = document.getElementById('campaign-moves-list');
  const campaignBadge = document.getElementById('campaign-moves-badge');
  const campaignNote = document.getElementById('campaign-moves-note');

  if (startingNote) startingNote.innerText = groups.startingText || '';
  if (startingBadge) startingBadge.innerText = groups.startingSlots
    ? `Choose ${groups.startingSlots}`
    : 'Background only';

  if (campaignBox && campaignContainer) {
    if (groups.campaignChoice && groups.campaignChoice.length > 0) {
      campaignBox.style.display = 'block';
      if (campaignNote) campaignNote.innerText = groups.campaignChoiceText || '';
      if (campaignBadge) campaignBadge.innerText = groups.campaignChoiceSlots
        ? `Choose ${groups.campaignChoiceSlots}`
        : '';
      renderMoveList(campaignContainer, groups.campaignChoice, {
        selectable: true,
        stage: 'starting',
        emptyText: 'No campaign option choices.'
      });
    } else {
      campaignBox.style.display = 'none';
    }
  }

  renderMoveList(sigContainer, groups.fixed, { emptyText: 'No fixed moves.' });
  renderMoveList(startingContainer, groups.starting, {
    selectable: true,
    stage: 'starting',
    emptyText: 'No starting move choices.'
  });
  renderMoveList(advancementContainer, groups.advancement, {
    selectable: true,
    stage: 'advancement',
    emptyText: 'No pre-6 advancement moves.'
  });
  if (isLevelSixUnlocked(selectedMoveNames, groups)) {
    if (level6Badge) level6Badge.innerText = 'Unlocked';
    renderMoveList(level6Container, groups.level6.map((move) => ({ ...move, locked: false })), {
      selectable: true,
      stage: 'level6',
      emptyText: 'No level 6+ moves.'
    });
  } else {
    if (level6Badge) level6Badge.innerText = 'Hidden';
    renderHiddenLevelSixList(level6Container, groups.level6.length);
  }
}

function getSelectedBackgroundName() {
  const checked = document.querySelector('input[name="archetype-background"]:checked');
  return checked ? checked.value : '';
}

function setSelectedBackgroundName(backgroundName) {
  if (!backgroundName) return;
  const options = document.querySelectorAll('input[name="archetype-background"]');
  options.forEach(option => {
    option.checked = option.value === backgroundName;
  });
}

function getSelectedChoiceMoves() {
  return Array.from(document.querySelectorAll('.choice-move-checkbox:checked')).map(input => input.value);
}

function getSelectedStartingMoves() {
  return Array.from(document.querySelectorAll('.choice-move-checkbox[data-move-stage="starting"]:checked')).map(input => input.value);
}

function setSelectedChoiceMoves(moveNames) {
  const selected = new Set(moveNames || []);
  document.querySelectorAll('.choice-move-checkbox').forEach(input => {
    input.checked = selected.has(input.value);
  });
}

function renderXpLedger() {
  const container = document.getElementById('xp-ledger-list');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!xpLedger.length) {
    container.innerHTML = '<div class="results-empty">No XP spent yet.</div>';
    return;
  }
  
  xpLedger.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'xp-ledger-item';
    
    const cost = document.createElement('div');
    cost.className = 'xp-cost';
    cost.innerText = `${entry.amount} XP`;
    
    const body = document.createElement('div');
    const label = document.createElement('div');
    label.innerText = entry.label || 'Unlabeled spend';
    const meta = document.createElement('div');
    meta.className = 'xp-meta';
    meta.innerText = entry.category || 'other';
    body.appendChild(label);
    body.appendChild(meta);
    
    const remove = document.createElement('button');
    remove.className = 'clear-btn';
    remove.type = 'button';
    remove.innerText = 'Undo';
    remove.addEventListener('click', () => removeXpSpend(entry.id));
    
    item.appendChild(cost);
    item.appendChild(body);
    item.appendChild(remove);
    container.appendChild(item);
  });
}

function makeId() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `char-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function addXpSpend() {
  if (!activeArchetype) return;
  
  const amountInput = document.getElementById('xp-spend-amount');
  const categoryInput = document.getElementById('xp-spend-category');
  const labelInput = document.getElementById('xp-spend-label');
  
  const amount = Math.max(1, Number.parseInt(amountInput.value, 10) || 1);
  if (amount > currentXP) {
    setSaveStatus(`Not enough available XP for a ${amount} XP spend.`);
    return;
  }
  
  const entry = {
    id: makeId(),
    amount,
    category: categoryInput.value,
    label: labelInput.value.trim() || `${categoryInput.value} purchase`,
    createdAt: new Date().toISOString()
  };
  
  xpLedger.push(entry);
  currentXP = Math.max(0, currentXP - amount);
  labelInput.value = '';
  updateSheetCounters();
  renderXpLedger();
  rerenderMovesPreservingSelections();
  setSaveStatus('XP spend added. Save when ready.');
}

function removeXpSpend(entryId) {
  const entry = xpLedger.find(item => item.id === entryId);
  if (!entry) return;
  
  xpLedger = xpLedger.filter(item => item.id !== entryId);
  currentXP += entry.amount;
  applyStatLedgerUndo(entry);
  updateSheetCounters();
  renderXpLedger();
  rerenderMovesPreservingSelections();
  setSaveStatus('XP spend undone. Save when ready.');
}

function createCharacterSnapshot(existing) {
  const now = new Date().toISOString();
  const characterName = document.getElementById('character-name-input').value.trim();
  const characters = getSavedCharacters();
  const activeExisting = existing || characters.find(c => c.id === currentCharacterId);
  
  const selectedInstinctInput = document.querySelector('input[name="character-instinct"]:checked');
  const selectedInstinct = selectedInstinctInput ? selectedInstinctInput.value : null;
  
  const selectedStartingGear = Array.from(document.querySelectorAll('.starting-gear-checkbox:checked')).map(cb => cb.value);
  const relationshipAnswers = Array.from(document.querySelectorAll('.bonds-question-input')).map(input => input.value);
  
  return {
    version: 1,
    id: activeExisting && activeExisting.id ? activeExisting.id : (currentCharacterId || makeId()),
    name: characterName || `${activeArchetype.name} Character`,
    campaignId: activeCampaign.id,
    campaignName: activeCampaign.name,
    archetypeName: activeArchetype.name,
    hp: currentHP,
    totalXp: currentTotalXP,
    availableXp: currentXP,
    xpSpent: xpLedger.reduce((sum, entry) => sum + entry.amount, 0),
    xpLedger: xpLedger.slice(),
    stats: { ...currentStats },
    backgroundName: getSelectedBackgroundName(),
    choiceMoves: getSelectedChoiceMoves(),
    selectedInstinct,
    selectedStartingGear,
    relationshipAnswers,
    gear: document.getElementById('gear-text').value,
    steadingUpgrades: document.getElementById('steading-upgrades-text').value,
    notes: document.getElementById('character-notes-text').value,
    backstorySelections: getBackstorySelections(),
    createdAt: activeExisting && activeExisting.createdAt ? activeExisting.createdAt : now,
    updatedAt: now,
    driveFileId: activeExisting && activeExisting.driveFileId ? activeExisting.driveFileId : null
  };
}

function saveCurrentCharacter() {
  if (!activeCampaign || !activeArchetype) {
    setSaveStatus('Select a campaign and archetype before saving.');
    return;
  }
  
  if (isCreationStatMode() && !statsMatchCreationPool()) {
    setSaveStatus(`Finish stat assignment before saving. Use exactly: ${getCreationStatPool().join(', ')}.`);
    return;
  }

  const moveValidation = validateStartingChoices(
    getMoveGroups(activeArchetype, activeCampaign),
    getSelectedStartingMoves(),
    { requireComplete: true }
  );
  if (!moveValidation.ok) {
    setSaveStatus(moveValidation.message);
    return;
  }
  
  const characters = getSavedCharacters();
  const existing = characters.find(character => character.id === currentCharacterId);
  const snapshot = createCharacterSnapshot(existing);
  const nextCharacters = existing
    ? characters.map(character => character.id === snapshot.id ? snapshot : character)
    : characters.concat(snapshot);
  
  currentCharacterId = snapshot.id;
  writeSavedCharacters(nextCharacters);
  renderSavedCharacters();
  renderStats(currentStats);
  setSaveStatus(`Saved ${snapshot.name}.`);
}

function loadSelectedCharacter() {
  const select = document.getElementById('saved-character-select');
  const characterId = select ? select.value : '';
  if (!characterId) {
    setSaveStatus('No saved character selected.');
    return;
  }
  
  const character = getSavedCharacters().find(item => item.id === characterId);
  if (!character) {
    setSaveStatus('Saved character was not found.');
    renderSavedCharacters();
    return;
  }
  
  applyCharacterSnapshot(character);
}

function applyCharacterSnapshot(character) {
  const campaign = CAMPAIGNS_DATA.find(item => item.id === character.campaignId || item.name === character.campaignName);
  if (!campaign) {
    setSaveStatus('Saved campaign is no longer available.');
    return;
  }
  
  const archetype = campaign.archetypes.find(item => item.name === character.archetypeName);
  if (!archetype) {
    setSaveStatus('Saved archetype is no longer available.');
    return;
  }
  
  selectCampaign(campaign);
  selectArchetype(archetype);
  
  currentCharacterId = character.id;
  currentHP = Number.isFinite(character.hp) ? character.hp : archetype.hp;
  currentTotalXP = Number.isFinite(character.totalXp) ? character.totalXp : 0;
  currentXP = Number.isFinite(character.availableXp) ? character.availableXp : 0;
  currentStats = { ...archetype.stats, ...(character.stats || {}) };
  xpLedger = Array.isArray(character.xpLedger) ? character.xpLedger.slice() : [];
  
  document.getElementById('character-name-input').value = character.name || '';
  if (activeCampaign && activeCampaign.id === 'stonetop') {
    renderStartingGear(archetype, character.selectedStartingGear || null);
    renderBondsQuestions(archetype, character.relationshipAnswers || null);
  } else {
    document.getElementById('starting-gear-container').style.display = 'none';
    document.getElementById('bonds-questions-container').style.display = 'none';
  }
  document.getElementById('gear-text').value = character.gear || '';
  document.getElementById('steading-upgrades-text').value = character.steadingUpgrades || '';
  document.getElementById('character-notes-text').value = character.notes || '';
  
  updateSheetCounters();
  renderStats(currentStats);
  renderXpLedger();
  setSelectedBackgroundName(character.backgroundName);
  setSelectedChoiceMoves(character.choiceMoves);
  rerenderMovesPreservingSelections();
  
  // Restore selected instinct
  renderInstincts(archetype.instincts, character.selectedInstinct || null);
  
  // Restore Page 2 selections
  renderBackstoryAndCompanions(archetype, character.backstorySelections || null);

  renderSavedCharacters();
  setSaveStatus(`Loaded ${character.name || archetype.name}.`);
}

function newCharacterSave() {
  currentCharacterId = null;
  if (activeArchetype) {
    selectArchetype(activeArchetype);
  }
  renderSavedCharacters();
  setSaveStatus('Started a new unsaved character.');
}

function deleteSelectedCharacter() {
  const select = document.getElementById('saved-character-select');
  const characterId = select ? select.value : '';
  if (!characterId) {
    setSaveStatus('No saved character selected.');
    return;
  }
  
  const character = getSavedCharacters().find(item => item.id === characterId);
  const nextCharacters = getSavedCharacters().filter(item => item.id !== characterId);
  writeSavedCharacters(nextCharacters);
  
  if (currentCharacterId === characterId) {
    currentCharacterId = null;
  }
  
  renderSavedCharacters();
  setSaveStatus(`Deleted ${character ? character.name : 'saved character'}.`);
}

// ==========================================
// DICE ROLLER ACTIONS & STATE
// ==========================================

function updateDiceDisplay() {
  Object.keys(dicePool).forEach(type => {
    document.getElementById(`count-${type}`).innerText = dicePool[type];
  });
}

function adjustDie(type, delta) {
  const current = dicePool[type];
  let val = Math.max(0, current + delta);
  
  // Total dice per side constraints (green + yellow max 5, purple + red max 5)
  if (type === 'ability' || type === 'proficiency') {
    const otherType = type === 'ability' ? 'proficiency' : 'ability';
    if (val + dicePool[otherType] > 5) {
      val = 5 - dicePool[otherType];
    }
  } else if (type === 'difficulty' || type === 'challenge') {
    const otherType = type === 'difficulty' ? 'challenge' : 'difficulty';
    if (val + dicePool[otherType] > 5) {
      val = 5 - dicePool[otherType];
    }
  }
  
  dicePool[type] = val;
  
  // Check if we violate risky constraints
  if (isRisky) {
    if (dicePool.proficiency === 0 && dicePool.ability > 0) {
      // Upgrade one to satisfy risky rule
      dicePool.ability -= 1;
      dicePool.proficiency = 1;
    }
    if (dicePool.challenge === 0 && dicePool.difficulty > 0) {
      dicePool.difficulty -= 1;
      dicePool.challenge = 1;
    }
  }
  
  updateDiceDisplay();
}

function clearDicePool() {
  Object.keys(dicePool).forEach(type => {
    dicePool[type] = 0;
  });
  isRisky = false;
  document.getElementById('risky-toggle').checked = false;
  updateDiceDisplay();
  
  // Reset results display
  document.getElementById('results-placeholder').style.display = 'block';
  document.getElementById('results-content').style.display = 'none';
}

function toggleRisky(enabled) {
  isRisky = enabled;
  
  if (isRisky) {
    // Risky rule: must have at least 1 yellow (Proficiency) and 1 red (Challenge)
    // If we have positive dice but no yellow, upgrade one green to yellow
    if (dicePool.proficiency === 0) {
      if (dicePool.ability > 0) {
        dicePool.ability -= 1;
        dicePool.proficiency = 1;
      } else {
        dicePool.proficiency = 1;
      }
    }
    
    // If we have negative dice but no red, upgrade one purple to red
    if (dicePool.challenge === 0) {
      if (dicePool.difficulty > 0) {
        dicePool.difficulty -= 1;
        dicePool.challenge = 1;
      } else {
        dicePool.challenge = 1;
      }
    }
  }
  
  updateDiceDisplay();
}

function loadStatIntoPool(statName, value) {
  // Average difficulty default is 2 Purple dice
  dicePool.ability = value;
  dicePool.proficiency = 0;
  dicePool.boost = 0;
  dicePool.difficulty = 2;
  dicePool.challenge = 0;
  dicePool.setback = 0;
  
  // If risky toggle is already on, apply upgrades
  if (isRisky) {
    if (dicePool.ability > 0) {
      dicePool.ability -= 1;
      dicePool.proficiency = 1;
    }
    if (dicePool.difficulty > 0) {
      dicePool.difficulty -= 1;
      dicePool.challenge = 1;
    }
  }
  
  updateDiceDisplay();
  
  // Flash roller sidebar to show update
  const sidebar = document.querySelector('.right-panel');
  sidebar.style.borderColor = 'var(--accent-color)';
  setTimeout(() => {
    sidebar.style.borderColor = 'var(--border-color)';
  }, 300);
}

// Upgrade Green -> Yellow (Max 2 yellow, then adds blue)
function upgradePositiveDice() {
  if (dicePool.ability > 0) {
    if (dicePool.proficiency < 2) {
      dicePool.ability -= 1;
      dicePool.proficiency += 1;
    } else {
      // Yellows capped at 2, add a boost blue die instead
      dicePool.boost = Math.min(5, dicePool.boost + 1);
    }
  } else if (dicePool.ability + dicePool.proficiency < 5) {
    // If no green to upgrade, but we have space, add a yellow
    if (dicePool.proficiency < 2) {
      dicePool.proficiency += 1;
    } else {
      dicePool.boost = Math.min(5, dicePool.boost + 1);
    }
  }
  updateDiceDisplay();
}

// Upgrade Purple -> Red (Max 2 red, then adds black)
function upgradeNegativeDice() {
  if (dicePool.difficulty > 0) {
    if (dicePool.challenge < 2) {
      dicePool.difficulty -= 1;
      dicePool.challenge += 1;
    } else {
      // Reds capped at 2, add a setback black die instead
      dicePool.setback = Math.min(5, dicePool.setback + 1);
    }
  } else if (dicePool.difficulty + dicePool.challenge < 5) {
    // If no purple to upgrade, but we have space, add a red
    if (dicePool.challenge < 2) {
      dicePool.challenge += 1;
    } else {
      dicePool.setback = Math.min(5, dicePool.setback + 1);
    }
  }
  updateDiceDisplay();
}

// Execute the Genesys roll simulation
function executeRoll() {
  // Check if pool is empty
  const totalDice = Object.values(dicePool).reduce((a, b) => a + b, 0);
  if (totalDice === 0) {
    alert("Please add at least one die to your pool before rolling!");
    return;
  }
  
  const rollBtn = document.getElementById('roll-btn');
  const resultsBox = document.getElementById('roll-results');
  
  // Add animation
  rollBtn.classList.add('rolling-anim');
  resultsBox.classList.add('rolling-anim');
  rollBtn.disabled = true;
  
  setTimeout(() => {
    rollBtn.classList.remove('rolling-anim');
    resultsBox.classList.remove('rolling-anim');
    rollBtn.disabled = false;
    
    performDiceRollMath();
  }, 600);
}

function performDiceRollMath() {
  let rolledSymbols = {
    success: 0,
    failure: 0,
    advantage: 0,
    threat: 0,
    triumph: 0,
    despair: 0
  };
  
  let diceFacesHtml = "";
  const rollOrder = ['proficiency', 'ability', 'boost', 'challenge', 'difficulty', 'setback'];
  
  rollOrder.forEach(dieType => {
    const count = dicePool[dieType];
    if (count === 0) return;
    
    const faces = DICE_FACES[dieType];
    
    for (let i = 0; i < count; i++) {
      const rollIndex = Math.floor(Math.random() * faces.length);
      const faceResult = faces[rollIndex];
      
      // Keep track of what symbols were rolled
      Object.keys(faceResult).forEach(sym => {
        if (sym !== 'blank') {
          rolledSymbols[sym] += faceResult[sym];
        }
      });
      
      // format symbol list for UI display
      let symbolsList = [];
      if (faceResult.blank) symbolsList.push("Blank");
      if (faceResult.success) symbolsList.push(`Success x${faceResult.success} (✱)`);
      if (faceResult.failure) symbolsList.push(`Failure x${faceResult.failure} (☓)`);
      if (faceResult.advantage) symbolsList.push(`Advantage x${faceResult.advantage} (▲)`);
      if (faceResult.threat) symbolsList.push(`Threat x${faceResult.threat} (▼)`);
      if (faceResult.triumph) symbolsList.push(`Triumph (◆)`);
      if (faceResult.despair) symbolsList.push(`Despair (✶)`);
      
      const symbolsStr = symbolsList.join(" + ");
      
      diceFacesHtml += `
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 0.2rem;">
          <div class="die-icon ${dieType}" style="width: 18px; height: 18px; font-size: 0.6rem; flex-shrink: 0;">
            <span>${dieType[0].toUpperCase()}</span>
          </div>
          <span style="font-weight: 500; text-transform: capitalize; color: var(--text-main);">${dieType}:</span>
          <span style="color: var(--text-muted); font-style: italic;">${symbolsStr}</span>
        </div>
      `;
    }
  });
  
  // Calculate Net Results
  const netSuccess = rolledSymbols.success - rolledSymbols.failure;
  const netAdvantage = rolledSymbols.advantage - rolledSymbols.threat;
  
  // Compile prominent Totals Summary Line description
  let totalsArray = [];
  if (netSuccess > 0) {
    totalsArray.push(`Success ${netSuccess}`);
  } else if (netSuccess < 0) {
    totalsArray.push(`Failure ${Math.abs(netSuccess)}`);
  } else {
    totalsArray.push(`Success 0`);
  }
  
  if (netAdvantage > 0) {
    totalsArray.push(`Advantage ${netAdvantage}`);
  } else if (netAdvantage < 0) {
    totalsArray.push(`Threat ${Math.abs(netAdvantage)}`);
  }
  
  if (rolledSymbols.triumph > 0) {
    totalsArray.push(`Triumph ${rolledSymbols.triumph}`);
  }
  if (rolledSymbols.despair > 0) {
    totalsArray.push(`Despair ${rolledSymbols.despair}`);
  }
  
  const totalsLineText = "Totals: " + totalsArray.join(", ");
  
  // Interpret Narrative Outcome from GUIDE.md
  let outcomeTitle = "";
  let outcomeDesc = "";
  let outcomeClass = "success"; // for history logging
  
  if (netSuccess >= 1) {
    outcomeClass = "success";
    if (netAdvantage >= 1) {
      outcomeTitle = "Success, and...";
      outcomeDesc = "You succeed and get a beneficial side effect: spend the advantage (menu, or hold).";
    } else if (netAdvantage === 0) {
      outcomeTitle = "Success";
      outcomeDesc = "You succeed cleanly and quietly with no extra complications.";
    } else {
      outcomeTitle = "Success, but...";
      outcomeDesc = "You succeed but pay a cost: the GM spends the threat from the threat menu.";
    }
  } else {
    outcomeClass = "failure";
    // failure gets XP
    if (netAdvantage >= 1) {
      outcomeTitle = "Failure with a silver lining";
      outcomeDesc = "You fail (mark XP!), but you salvage something on the way down or give an ally an opening.";
    } else {
      outcomeTitle = "Failure";
      outcomeDesc = "You fail (mark XP!) and the GM makes a soft or hard move against you.";
    }
  }
  
  // Append Triumph & Despair notices
  if (rolledSymbols.triumph > 0) {
    outcomeTitle += " (Triumph!)";
    outcomeDesc += " Exceptional wonder! A turn in your favor fires regardless of success or failure.";
  }
  if (rolledSymbols.despair > 0) {
    outcomeTitle += " (Despair!)";
    outcomeDesc += " Exceptional peril! A turn against you fires regardless of success or failure.";
  }
  
  // Update UI Elements
  document.getElementById('results-placeholder').style.display = 'none';
  document.getElementById('results-content').style.display = 'block';
  
  document.getElementById('outcome-title').innerText = outcomeTitle;
  document.getElementById('outcome-desc').innerText = outcomeDesc;
  
  // Update prominent totals summary element
  document.getElementById('outcome-totals-summary').innerText = totalsLineText;
  
  document.getElementById('result-success-count').innerText = netSuccess;
  document.getElementById('result-advantage-count').innerText = netAdvantage;
  document.getElementById('result-triumph-count').innerText = rolledSymbols.triumph;
  document.getElementById('result-despair-count').innerText = rolledSymbols.despair;
  
  // Inject rolled dice faces list
  document.getElementById('rolled-dice-faces-container').innerHTML = diceFacesHtml;

  
  // Add to History Log
  addToHistory(outcomeTitle, netSuccess, netAdvantage, rolledSymbols.triumph, rolledSymbols.despair, outcomeClass);
  
  // Automatically mark XP on Failure
  if (netSuccess <= 0 && activeArchetype) {
    adjustTotalXP(1);
  }
}

function addToHistory(outcome, netSuccess, netAdvantage, triumphs, despairs, outcomeClass) {
  const historyList = document.getElementById('history-list');
  
  // Clear placeholder if it's there
  if (historyList.querySelector('.results-empty')) {
    historyList.innerHTML = '';
  }
  
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const item = document.createElement('div');
  item.className = `history-item ${outcomeClass}`;
  
  let details = `Success: ${netSuccess}, Adv: ${netAdvantage}`;
  if (triumphs > 0) details += `, Triumph!`;
  if (despairs > 0) details += `, Despair!`;
  
  item.innerHTML = `
    <div>
      <strong>${outcome}</strong> <br>
      <span style="font-size: 0.75rem; color: var(--text-muted);">${details}</span>
    </div>
    <div class="time">${time}</div>
  `;
  
  historyList.insertBefore(item, historyList.firstChild);
}

// Expose functions to the window object to support inline HTML event handlers
window.executeRoll = executeRoll;
window.adjustDie = adjustDie;
window.clearDicePool = clearDicePool;
window.toggleRisky = toggleRisky;
window.upgradePositiveDice = upgradePositiveDice;
window.upgradeNegativeDice = upgradeNegativeDice;
window.newCharacterSave = newCharacterSave;
window.saveCurrentCharacter = saveCurrentCharacter;
window.loadSelectedCharacter = loadSelectedCharacter;
window.deleteSelectedCharacter = deleteSelectedCharacter;
window.adjustHP = adjustHP;
window.adjustXP = adjustXP;
window.adjustTotalXP = adjustTotalXP;
window.addXpSpend = addXpSpend;
window.removeXpSpend = removeXpSpend;
window.buyStatIncrease = buyStatIncrease;
window.adjustStat = adjustStat;
window.selectCampaign = selectCampaign;
window.selectArchetype = selectArchetype;

// Page 2 Narrative & Companions Rendering
function renderBackstoryAndCompanions(arch, savedBackstoryState = null) {
  const backstoryBox = document.getElementById('backstory-section-box');
  const backstoryTitle = document.getElementById('backstory-title');
  const backstoryDesc = document.getElementById('backstory-desc');
  const backstoryContent = document.getElementById('backstory-content');
  
  const companionsBox = document.getElementById('companions-section-box');
  const companionsContent = document.getElementById('companions-content');

  backstoryContent.innerHTML = '';
  companionsContent.innerHTML = '';
  backstoryBox.style.display = 'none';
  companionsBox.style.display = 'none';

  if (!activeCampaign || activeCampaign.id !== 'stonetop') {
    return;
  }

  // 1. Backstory Section
  const data = typeof BACKSTORIES_DATA !== 'undefined' ? BACKSTORIES_DATA[arch.name] : null;
  if (data) {
    backstoryBox.style.display = 'block';
    backstoryTitle.innerText = data.title;
    backstoryDesc.innerText = data.description;

    data.sections.forEach((sect, sectIndex) => {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'backstory-group';

      const titleH4 = document.createElement('h4');
      titleH4.innerText = sect.title;
      groupDiv.appendChild(titleH4);

      if (sect.type === 'checkbox' || sect.type === 'radio') {
        const optionsList = document.createElement('div');
        optionsList.className = 'backstory-options-list';

        sect.options.forEach((opt, optIndex) => {
          const rowLabel = document.createElement('label');
          rowLabel.className = 'backstory-option-row';

          const input = document.createElement('input');
          input.type = sect.type;
          input.name = `backstory_${arch.name}_sect_${sectIndex}`;
          input.value = opt;
          
          const savedKey = `sect_${sectIndex}`;
          if (savedBackstoryState && savedBackstoryState[savedKey]) {
            if (Array.isArray(savedBackstoryState[savedKey])) {
              input.checked = savedBackstoryState[savedKey].includes(opt);
            } else {
              input.checked = savedBackstoryState[savedKey] === opt;
            }
          }

          if (sect.type === 'checkbox' && sect.limit) {
            input.addEventListener('change', () => {
              const checked = optionsList.querySelectorAll('input[type="checkbox"]:checked');
              if (checked.length > sect.limit) {
                input.checked = false;
                alert(`You can select at most ${sect.limit} options for this section.`);
              }
            });
          }

          rowLabel.appendChild(input);
          rowLabel.appendChild(document.createTextNode(opt));
          optionsList.appendChild(rowLabel);
        });

        groupDiv.appendChild(optionsList);
      } else if (sect.type === 'text_options') {
        const textInputsDiv = document.createElement('div');
        textInputsDiv.className = 'backstory-text-inputs';

        sect.inputs.forEach((inputSpec, inputIndex) => {
          const row = document.createElement('div');
          row.className = 'backstory-text-row';

          const label = document.createElement('label');
          label.innerText = inputSpec.label;
          row.appendChild(label);

          const textInput = document.createElement('input');
          textInput.type = 'text';
          textInput.className = 'backstory-text-input';
          textInput.placeholder = inputSpec.placeholder;
          textInput.name = `backstory_${arch.name}_text_${sectIndex}_${inputIndex}`;

          const savedKey = `text_${sectIndex}_${inputIndex}`;
          if (savedBackstoryState && savedBackstoryState[savedKey]) {
            textInput.value = savedBackstoryState[savedKey];
          }

          row.appendChild(textInput);
          textInputsDiv.appendChild(row);
        });

        groupDiv.appendChild(textInputsDiv);
      } else if (sect.type === 'textarea') {
        const textarea = document.createElement('textarea');
        textarea.className = 'sheet-textarea';
        textarea.style.height = '100px';
        textarea.name = `backstory_${arch.name}_textarea_${sectIndex}`;
        textarea.placeholder = "Write details here...";

        const savedKey = `textarea_${sectIndex}`;
        if (savedBackstoryState && savedBackstoryState[savedKey]) {
          textarea.value = savedBackstoryState[savedKey];
        }

        groupDiv.appendChild(textarea);
      }

      backstoryContent.appendChild(groupDiv);
    });
  }

  // 2. Companions Section
  const isStormMarkedHeavy = arch.name === 'Heavy' && getSelectedBackgroundName().toUpperCase() === 'STORM-MARKED';
  if (arch.name === 'Ranger' || arch.name === 'Marshal' || arch.name === 'Blessed' || arch.name === 'Seeker' || isStormMarkedHeavy) {
    companionsBox.style.display = 'block';

    if (arch.name === 'Ranger') {
      companionsContent.appendChild(createCompanionCard(
        "Animal Companion",
        "Type: Bird, Critter, Hound, or Hunter. HP 5/8/10. Max HP is tracked below.",
        ["agile", "cautious", "clever", "mimic", "sharp-eyed", "stealthy", "tireless"],
        savedBackstoryState ? savedBackstoryState.companions : null
      ));
    } else if (arch.name === 'Marshal') {
      companionsContent.appendChild(createCompanionCard(
        "Militia Crew (Stalwarts)",
        "A half-dozen strong residents of Stonetop who follow your orders in battle. Loyalty starts at 2.",
        ["archers", "athletic", "brave", "cunning", "devoted", "hardy", "intimidating", "observant", "warriors"],
        savedBackstoryState ? savedBackstoryState.companions : null
      ));
    } else if (arch.name === 'Blessed') {
      companionsContent.appendChild(createCompanionCard(
        "Initiates of Danu",
        "If you chose the Initiate background, these are your fellow disciples.",
        ["Enfys (acolyte)", "Afon (devious Fae)", "Gwendyl (mentor/healer)", "Olwin (anointed lover)", "Seren the Eldest"],
        savedBackstoryState ? savedBackstoryState.companions : null
      ));
    } else if (arch.name === 'Seeker') {
      companionsContent.appendChild(createSeekerArcanaCard(
        savedBackstoryState ? savedBackstoryState.arcana : null
      ));
    } else if (arch.name === 'Heavy') {
      companionsContent.appendChild(createStormMarkingsCard(
        savedBackstoryState ? savedBackstoryState.companions : null
      ));
    }
  }
}

function createCompanionCard(name, desc, tags, savedState = null) {
  const card = document.createElement('div');
  card.className = 'follower-card';

  const header = document.createElement('div');
  header.className = 'follower-card-header';
  
  const h5 = document.createElement('h5');
  h5.innerText = name;
  header.appendChild(h5);
  card.appendChild(header);

  const body = document.createElement('div');
  body.className = 'follower-card-body';
  body.innerText = desc;
  card.appendChild(body);

  const stats = document.createElement('div');
  stats.className = 'follower-card-stats';
  
  const hpLabel = document.createElement('span');
  hpLabel.innerText = "HP: ";
  const hpInput = document.createElement('input');
  hpInput.type = 'number';
  hpInput.name = `${name}_hp`;
  hpInput.value = savedState && savedState.hp ? savedState.hp : 6;
  hpInput.style.width = '40px';
  hpInput.style.fontSize = '11px';
  stats.appendChild(hpLabel);
  stats.appendChild(hpInput);

  const loyaltyLabel = document.createElement('span');
  loyaltyLabel.innerText = " Loyalty: ";
  const loyaltyInput = document.createElement('input');
  loyaltyInput.type = 'number';
  loyaltyInput.name = `${name}_loyalty`;
  loyaltyInput.value = savedState && savedState.loyalty ? savedState.loyalty : 2;
  loyaltyInput.style.width = '40px';
  loyaltyInput.style.fontSize = '11px';
  stats.appendChild(loyaltyLabel);
  stats.appendChild(loyaltyInput);

  card.appendChild(stats);

  const tagsTitle = document.createElement('div');
  tagsTitle.style.marginTop = '0.5rem';
  tagsTitle.style.fontSize = '0.8rem';
  tagsTitle.style.fontWeight = 'bold';
  tagsTitle.innerText = "Available Tags / Skills:";
  card.appendChild(tagsTitle);

  const tagsGrid = document.createElement('div');
  tagsGrid.style.display = 'grid';
  tagsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
  tagsGrid.style.gap = '0.3rem';
  tagsGrid.style.marginTop = '0.25rem';

  tags.forEach(tag => {
    const row = document.createElement('label');
    row.className = 'follower-checkbox';
    row.style.fontSize = '0.8rem';
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '0.25rem';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = `${name}_tag_${tag}`;
    checkbox.value = tag;
    
    if (savedState && savedState.tags && savedState.tags.includes(tag)) {
      checkbox.checked = true;
    }

    row.appendChild(checkbox);
    row.appendChild(document.createTextNode(tag));
    tagsGrid.appendChild(row);
  });
  card.appendChild(tagsGrid);

  return card;
}

function createSeekerArcanaCard(savedState = null) {
  const card = document.createElement('div');
  card.className = 'follower-card';
  card.style.border = '1px solid var(--accent-color)';
  
  const header = document.createElement('div');
  header.className = 'follower-card-header';
  const h5 = document.createElement('h5');
  h5.innerText = "Arcana Collection";
  header.appendChild(h5);
  card.appendChild(header);
  
  const body = document.createElement('div');
  body.className = 'follower-card-body';
  body.style.display = 'flex';
  body.style.flexDirection = 'column';
  body.style.gap = '0.75rem';
  
  const majorLabel = document.createElement('label');
  majorLabel.innerHTML = '<strong>Major Arcanum:</strong>';
  majorLabel.style.fontSize = '0.85rem';
  const majorSelect = document.createElement('select');
  majorSelect.name = 'Seeker_major_arcanum';
  majorSelect.style.width = '100%';
  majorSelect.style.fontSize = '0.85rem';
  majorSelect.style.padding = '0.25rem';
  majorSelect.style.backgroundColor = 'rgba(0,0,0,0.2)';
  majorSelect.style.color = 'var(--text-main)';
  majorSelect.style.border = '1px solid rgba(107, 79, 42, 0.2)';
  majorSelect.addEventListener('change', () => {
    setSaveStatus('Unsaved backstory selections change.');
  });
  
  const options = [
    "None selected",
    "The Demonhide Cloak",
    "The Redwood Effigy",
    "The Twisted Spear",
    "Noruba's Ice Sphere",
    "The Azure Hand",
    "The Mindgem"
  ];
  options.forEach(opt => {
    const o = document.createElement('option');
    o.value = opt;
    o.innerText = opt;
    if (savedState && savedState.majorArcanum === opt) {
      o.selected = true;
    }
    majorSelect.appendChild(o);
  });
  
  majorLabel.appendChild(majorSelect);
  body.appendChild(majorLabel);
  
  const qDiv = document.createElement('div');
  qDiv.style.display = 'flex';
  qDiv.style.flexDirection = 'column';
  qDiv.style.gap = '0.4rem';
  
  const questions = [
    "Where did you acquire it?",
    "From whose grasp did you wrest it?",
    "Who else wants it?",
    "What did it cost you?"
  ];
  
  questions.forEach((q, idx) => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexDirection = 'column';
    row.style.gap = '0.15rem';
    
    const label = document.createElement('label');
    label.innerText = q;
    label.style.fontSize = '0.8rem';
    label.style.color = 'var(--text-muted)';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.name = `Seeker_major_q_${idx}`;
    input.style.fontSize = '0.8rem';
    input.style.padding = '0.25rem';
    input.style.border = '1px solid rgba(107, 79, 42, 0.1)';
    input.style.borderRadius = '3px';
    input.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    input.style.color = 'var(--text-main)';
    
    if (savedState && savedState.questions && savedState.questions[idx]) {
      input.value = savedState.questions[idx];
    }
    
    input.addEventListener('input', () => {
      setSaveStatus('Unsaved backstory selections change.');
    });
    
    row.appendChild(label);
    row.appendChild(input);
    qDiv.appendChild(row);
  });
  body.appendChild(qDiv);
  
  const mysteryDiv = document.createElement('div');
  mysteryDiv.style.display = 'flex';
  mysteryDiv.style.alignItems = 'center';
  mysteryDiv.style.gap = '0.5rem';
  mysteryDiv.style.fontSize = '0.8rem';
  mysteryDiv.innerHTML = '<span>Mysteries Unlocked:</span>';
  
  for (let i = 0; i < 3; i++) {
    const cbLabel = document.createElement('label');
    cbLabel.style.display = 'flex';
    cbLabel.style.alignItems = 'center';
    cbLabel.style.gap = '0.2rem';
    
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = `Seeker_major_mystery_${i}`;
    if (savedState && savedState.mysteries && savedState.mysteries[i]) {
      cb.checked = true;
    }
    
    cb.addEventListener('change', () => {
      setSaveStatus('Unsaved backstory selections change.');
    });
    
    cbLabel.appendChild(cb);
    cbLabel.appendChild(document.createTextNode(`Mystery ${i+1}`));
    mysteryDiv.appendChild(cbLabel);
  }
  body.appendChild(mysteryDiv);
  
  const minorDiv = document.createElement('div');
  minorDiv.style.display = 'flex';
  minorDiv.style.flexDirection = 'column';
  minorDiv.style.gap = '0.4rem';
  minorDiv.style.borderTop = '1px solid rgba(107, 79, 42, 0.2)';
  minorDiv.style.paddingTop = '0.5rem';
  
  const minorRoles = [
    { label: "Mastered Minor Arcanum (unlocked secrets):", name: "minorMastered" },
    { label: "Possessed Minor Arcanum (not yet mastered):", name: "minorPossessed" },
    { label: "Lead on Minor Arcanum (not yet found):", name: "minorLead" }
  ];
  
  minorRoles.forEach(role => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexDirection = 'column';
    row.style.gap = '0.15rem';
    
    const label = document.createElement('label');
    label.innerText = role.label;
    label.style.fontSize = '0.8rem';
    label.style.fontWeight = 'bold';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.name = `Seeker_${role.name}`;
    input.placeholder = "Name of Minor Arcanum...";
    input.style.fontSize = '0.8rem';
    input.style.padding = '0.25rem';
    input.style.border = '1px solid rgba(107, 79, 42, 0.1)';
    input.style.borderRadius = '3px';
    input.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    input.style.color = 'var(--text-main)';
    
    if (savedState && savedState[role.name]) {
      input.value = savedState[role.name];
    }
    
    input.addEventListener('input', () => {
      setSaveStatus('Unsaved backstory selections change.');
    });
    
    row.appendChild(label);
    row.appendChild(input);
    minorDiv.appendChild(row);
  });
  
  body.appendChild(minorDiv);
  card.appendChild(body);
  return card;
}

function createStormMarkingsCard(savedState = null) {
  const card = document.createElement('div');
  card.className = 'follower-card';
  card.style.border = '1px solid var(--accent-color)';
  
  const header = document.createElement('div');
  header.className = 'follower-card-header';
  const h5 = document.createElement('h5');
  h5.innerText = "Storm Markings";
  header.appendChild(h5);
  card.appendChild(header);
  
  const body = document.createElement('div');
  body.className = 'follower-card-body';
  body.style.fontSize = '0.85rem';
  body.innerText = "You woke up covered in lightning marks that crackle with elemental power.";
  
  const mysteryDiv = document.createElement('div');
  mysteryDiv.style.display = 'flex';
  mysteryDiv.style.alignItems = 'center';
  mysteryDiv.style.gap = '0.5rem';
  mysteryDiv.style.fontSize = '0.8rem';
  mysteryDiv.style.marginTop = '0.5rem';
  mysteryDiv.innerHTML = '<span>Mysteries Unlocked:</span>';
  
  for (let i = 0; i < 3; i++) {
    const cbLabel = document.createElement('label');
    cbLabel.style.display = 'flex';
    cbLabel.style.alignItems = 'center';
    cbLabel.style.gap = '0.2rem';
    
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = `Heavy_storm_mystery_${i}`;
    if (savedState && savedState.mysteries && savedState.mysteries[i]) {
      cb.checked = true;
    }
    
    cb.addEventListener('change', () => {
      setSaveStatus('Unsaved backstory selections change.');
    });
    
    cbLabel.appendChild(cb);
    cbLabel.appendChild(document.createTextNode(`Mystery ${i+1}`));
    mysteryDiv.appendChild(cbLabel);
  }
  body.appendChild(mysteryDiv);
  card.appendChild(body);
  return card;
}

function getBackstorySelections() {
  if (!activeArchetype || !activeCampaign || activeCampaign.id !== 'stonetop') {
    return null;
  }

  const state = {};
  const data = typeof BACKSTORIES_DATA !== 'undefined' ? BACKSTORIES_DATA[activeArchetype.name] : null;
  
  if (data) {
    data.sections.forEach((sect, sectIndex) => {
      if (sect.type === 'checkbox' || sect.type === 'radio') {
        const name = `backstory_${activeArchetype.name}_sect_${sectIndex}`;
        const inputs = document.querySelectorAll(`input[name="${name}"]:checked`);
        if (sect.type === 'checkbox') {
          state[`sect_${sectIndex}`] = Array.from(inputs).map(i => i.value);
        } else {
          state[`sect_${sectIndex}`] = inputs.length ? inputs[0].value : null;
        }
      } else if (sect.type === 'text_options') {
        sect.inputs.forEach((inputSpec, inputIndex) => {
          const name = `backstory_${activeArchetype.name}_text_${sectIndex}_${inputIndex}`;
          const input = document.querySelector(`input[name="${name}"]`);
          state[`text_${sectIndex}_${inputIndex}`] = input ? input.value : '';
        });
      } else if (sect.type === 'textarea') {
        const name = `backstory_${activeArchetype.name}_textarea_${sectIndex}`;
        const textarea = document.querySelector(`textarea[name="${name}"]`);
        state[`textarea_${sectIndex}`] = textarea ? textarea.value : '';
      }
    });
  }

  if (activeArchetype.name === 'Ranger' || activeArchetype.name === 'Marshal' || activeArchetype.name === 'Blessed') {
    let name = "";
    if (activeArchetype.name === 'Ranger') name = "Animal Companion";
    else if (activeArchetype.name === 'Marshal') name = "Militia Crew (Stalwarts)";
    else if (activeArchetype.name === 'Blessed') name = "Initiates of Danu";

    const hpInput = document.querySelector(`input[name="${name}_hp"]`);
    const loyaltyInput = document.querySelector(`input[name="${name}_loyalty"]`);
    const tagInputs = document.querySelectorAll(`input[name^="${name}_tag_"]:checked`);

    state.companions = {
      hp: hpInput ? Number(hpInput.value) : 6,
      loyalty: loyaltyInput ? Number(loyaltyInput.value) : 2,
      tags: Array.from(tagInputs).map(t => t.value)
    };
  }

  if (activeArchetype.name === 'Seeker') {
    const majorSelect = document.querySelector('select[name="Seeker_major_arcanum"]');
    const questions = [];
    for (let i = 0; i < 4; i++) {
      const qInput = document.querySelector(`input[name="Seeker_major_q_${i}"]`);
      questions.push(qInput ? qInput.value : '');
    }
    const mysteries = [];
    for (let i = 0; i < 3; i++) {
      const cb = document.querySelector(`input[name="Seeker_major_mystery_${i}"]`);
      mysteries.push(cb ? cb.checked : false);
    }
    const minorMastered = document.querySelector('input[name="Seeker_minorMastered"]');
    const minorPossessed = document.querySelector('input[name="Seeker_minorPossessed"]');
    const minorLead = document.querySelector('input[name="Seeker_minorLead"]');
    
    state.arcana = {
      majorArcanum: majorSelect ? majorSelect.value : 'None selected',
      questions,
      mysteries,
      minorMastered: minorMastered ? minorMastered.value : '',
      minorPossessed: minorPossessed ? minorPossessed.value : '',
      minorLead: minorLead ? minorLead.value : ''
    };
  }

  if (activeArchetype.name === 'Heavy' && getSelectedBackgroundName().toUpperCase() === 'STORM-MARKED') {
    const mysteries = [];
    for (let i = 0; i < 3; i++) {
      const cb = document.querySelector(`input[name="Heavy_storm_mystery_${i}"]`);
      mysteries.push(cb ? cb.checked : false);
    }
    state.companions = {
      mysteries
    };
  }

  return state;
}
