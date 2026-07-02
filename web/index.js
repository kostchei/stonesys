// StoneSys JS Application logic
import { getAccessToken, saveCharacterToDrive, listDriveFiles, loadFromDrive } from "./drive.js";

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
      window.open(`playbook.html?pb=${activeArchetype.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, '_blank');
    }
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
        const snapshot = createCharacterSnapshot();
        await saveCharacterToDrive(token, snapshot, activeArchetype);
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
  renderMoves(arch.signature_moves, arch.choice_moves);
  
  // Populate gear
  document.getElementById('gear-text').value = arch.gear || '';
  document.getElementById('steading-upgrades-text').value = '';
  document.getElementById('character-notes-text').value = '';
  renderXpLedger();
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
    container.appendChild(div);
  });
}

// Render Instincts list
function renderInstincts(instincts) {
  const container = document.getElementById('instincts-list');
  container.innerHTML = '';
  
  if (!instincts || instincts.length === 0) {
    container.innerHTML = '<div class="results-empty">No specific instincts.</div>';
    return;
  }
  
  instincts.forEach(inst => {
    const item = document.createElement('div');
    item.className = 'instinct-item';
    item.innerText = inst;
    container.appendChild(item);
  });
}

// Render Signature & Choice moves
function renderMoves(signature, choice) {
  const sigContainer = document.getElementById('signature-moves-list');
  sigContainer.innerHTML = '';
  
  if (!signature || signature.length === 0) {
    sigContainer.innerHTML = '<div class="results-empty">No signature moves.</div>';
  } else {
    signature.forEach(move => {
      const item = document.createElement('div');
      item.className = 'move-item';
      item.innerHTML = `
        <h4>${move.name}</h4>
        <p>${move.description}</p>
      `;
      sigContainer.appendChild(item);
    });
  }
  
  const choiceContainer = document.getElementById('choice-moves-list');
  choiceContainer.innerHTML = '';
  
  if (!choice || choice.length === 0) {
    choiceContainer.innerHTML = '<div class="results-empty">No choice moves.</div>';
  } else {
    choice.forEach(move => {
      const item = document.createElement('div');
      item.className = 'move-item';
      item.innerHTML = `
        <label style="display: flex; gap: 0.5rem; cursor: pointer; align-items: flex-start;">
          <input type="checkbox" class="choice-move-checkbox" value="${move.name}" style="margin-top: 0.25rem; accent-color: var(--accent-color);">
          <div>
            <h4 style="margin-bottom: 0;">${move.name}</h4>
            <p style="margin-top: 0.25rem;">${move.description}</p>
          </div>
        </label>
      `;
      choiceContainer.appendChild(item);
    });
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
  setSaveStatus('XP spend undone. Save when ready.');
}

function createCharacterSnapshot(existing) {
  const now = new Date().toISOString();
  const characterName = document.getElementById('character-name-input').value.trim();
  
  return {
    version: 1,
    id: existing && existing.id ? existing.id : makeId(),
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
    gear: document.getElementById('gear-text').value,
    steadingUpgrades: document.getElementById('steading-upgrades-text').value,
    notes: document.getElementById('character-notes-text').value,
    createdAt: existing && existing.createdAt ? existing.createdAt : now,
    updatedAt: now
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
  document.getElementById('gear-text').value = character.gear || archetype.gear || '';
  document.getElementById('steading-upgrades-text').value = character.steadingUpgrades || '';
  document.getElementById('character-notes-text').value = character.notes || '';
  
  updateSheetCounters();
  renderStats(currentStats);
  renderXpLedger();
  setSelectedBackgroundName(character.backgroundName);
  setSelectedChoiceMoves(character.choiceMoves);
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
