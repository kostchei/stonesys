import assert from 'node:assert';
import { saveCharacterToDrive, loadFromDrive } from "../web/drive.js";

// Mock globals for testing in Node environment
globalThis.google = {
  accounts: {
    oauth2: {
      initTokenClient: () => ({ requestAccessToken: () => {} })
    }
  }
};

let fetchCalls = [];
let mockSearchFiles = [];

globalThis.fetch = async (url, options = {}) => {
  fetchCalls.push({ url, options });
  
  // Mock Search Drive File
  if (url.includes('/drive/v3/files?q=')) {
    return {
      ok: true,
      json: async () => ({
        files: mockSearchFiles
      })
    };
  }
  
  // Mock Upload File (POST/PATCH)
  if (url.includes('/upload/drive/v3/files')) {
    const isPatch = url.includes('PATCH') || (options.method === 'PATCH') || url.includes('existing-drive-file-id') || url.includes('mock-searched-file-id');
    return {
      ok: true,
      json: async () => ({
        id: isPatch ? 'existing-drive-file-id' : 'new-drive-file-id'
      })
    };
  }
  
  // Mock Export File (loadFromDrive)
  if (url.includes('/export?mimeType=text/html')) {
    const mockState = { name: 'Enfys', hp: 20 };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(mockState))));
    const html = `<html><body>[[STONESYS_SAVE:${b64}]]</body></html>`;
    return {
      ok: true,
      text: async () => html
    };
  }

  return { ok: false, statusText: 'Not Found' };
};

async function runTests() {
  console.log("Running Google Drive integration unit tests...");

  // Test Case 1: Save brand new character (no existing file on Drive, triggers POST)
  {
    fetchCalls = [];
    mockSearchFiles = []; // Empty search results
    const state = { name: "Enfys" };
    const playbook = { name: "Blessed" };
    const result = await saveCharacterToDrive("mock-token", state, playbook);
    
    assert.strictEqual(result.id, "new-drive-file-id");
    assert.strictEqual(state.driveFileId, "new-drive-file-id");
    
    // Verify fetch calls: one search call, one POST upload call
    assert.strictEqual(fetchCalls.length, 2);
    assert.ok(fetchCalls[0].url.includes('/drive/v3/files?q='));
    assert.ok(fetchCalls[1].url.includes('/upload/drive/v3/files?uploadType=multipart'));
    assert.strictEqual(fetchCalls[1].options.method, 'POST');
    console.log("ok   Save new character (triggers Search and POST)");
  }

  // Test Case 1b: Save new character but there is already an existing file on Drive with the same name
  {
    fetchCalls = [];
    mockSearchFiles = [{ id: 'mock-searched-file-id', name: 'StoneSys - Blessed - Enfys' }];
    const state = { name: "Enfys" };
    const playbook = { name: "Blessed" };
    const result = await saveCharacterToDrive("mock-token", state, playbook);
    
    assert.strictEqual(result.id, "existing-drive-file-id");
    assert.strictEqual(state.driveFileId, "existing-drive-file-id");
    
    assert.strictEqual(fetchCalls.length, 2);
    assert.ok(fetchCalls[0].url.includes('/drive/v3/files?q='));
    assert.ok(fetchCalls[1].url.includes('/upload/drive/v3/files/mock-searched-file-id?'));
    assert.strictEqual(fetchCalls[1].options.method, 'PATCH');
    console.log("ok   Save new character with name collision (updates existing file)");
  }

  // Test Case 2: Save existing character with driveFileId (performs direct PATCH, no search)
  {
    fetchCalls = [];
    const state = { name: "Enfys", driveFileId: "existing-drive-file-id" };
    const playbook = { name: "Blessed" };
    const result = await saveCharacterToDrive("mock-token", state, playbook);
    
    assert.strictEqual(result.id, "existing-drive-file-id");
    assert.strictEqual(state.driveFileId, "existing-drive-file-id");
    
    // Verify fetch calls: only one PATCH upload call, no search
    assert.strictEqual(fetchCalls.length, 1);
    assert.ok(fetchCalls[0].url.includes('/upload/drive/v3/files/existing-drive-file-id?'));
    assert.strictEqual(fetchCalls[0].options.method, 'PATCH');
    console.log("ok   Save existing character (direct PATCH)");
  }

  // Test Case 3: Load character from Drive (should inject driveFileId)
  {
    fetchCalls = [];
    const fileId = "loaded-drive-file-id";
    const loadedState = await loadFromDrive("mock-token", fileId);
    
    assert.strictEqual(loadedState.name, "Enfys");
    assert.strictEqual(loadedState.driveFileId, "loaded-drive-file-id");
    
    assert.strictEqual(fetchCalls.length, 1);
    assert.ok(fetchCalls[0].url.includes(`/files/${fileId}/export`));
    console.log("ok   Load character from Drive (injects driveFileId)");
  }

  console.log("\nAll Google Drive unit tests passed successfully!");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
