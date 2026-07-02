/**
 * Google Drive integration module for StoneSys
 */

// Request OAuth 2.0 access token
export function getAccessToken(clientId, callback) {
  if (typeof google === 'undefined') {
    alert("Google Identity Services SDK is not loaded yet. Check your internet connection or try again.");
    return;
  }
  
  const client = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/drive.file',
    callback: (tokenResponse) => {
      if (tokenResponse.error) {
        alert("Authorization failed: " + tokenResponse.error);
        return;
      }
      callback(tokenResponse.access_token);
    }
  });
  client.requestAccessToken();
}

// Generate the printable HTML summary of the character sheet, embedding the serialized JSON
function generateCharacterHtml(state, playbook) {
  const stateStr = JSON.stringify(state);
  const b64 = btoa(unescape(encodeURIComponent(stateStr)));
  
  const statsList = Object.entries(state.stats || {})
    .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
    .join('\n');
    
  const movesList = (playbook.moves || [])
    .filter(m => (state.chosen || []).includes(m.name) || m.type === 'start')
    .map(m => `<li><strong>${m.name}</strong> (${m.type}) - ${m.description || ''}</li>`)
    .join('\n');
    
  const gearList = Object.entries(state.gear || {})
    .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
    .join('\n');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${state.name || 'Unnamed'} - ${playbook.name}</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; margin: 40px; }
    h1 { color: #111; margin-bottom: 0; }
    .subtitle { font-style: italic; color: #555; margin-bottom: 20px; font-size: 1.1em; }
    h2 { border-bottom: 2px solid #333; padding-bottom: 4px; margin-top: 30px; color: #111; }
    ul { padding-left: 20px; }
    li { margin-bottom: 8px; }
    .footer { margin-top: 50px; padding-top: 15px; border-top: 1px dashed #999; font-size: 9px; color: #666; font-family: monospace; word-break: break-all; }
  </style>
</head>
<body>
  <h1>${state.name || 'Unnamed'}</h1>
  <div class="subtitle">The ${playbook.name} — StoneSys Character Sheet</div>
  
  <h2>Vitals</h2>
  <ul>
    <li><strong>Level:</strong> ${state.level || 1}</li>
    <li><strong>XP:</strong> ${state.xp || 0}</li>
    <li><strong>HP:</strong> ${state.hp?.current ?? 20} / ${state.hp?.max ?? 20}</li>
  </ul>
  
  <h2>Stats</h2>
  <ul>
    ${statsList}
  </ul>
  
  <h2>Active Moves</h2>
  <ul>
    ${movesList}
  </ul>
  
  <h2>Gear</h2>
  <ul>
    ${gearList}
  </ul>
  
  <div class="footer">
    <p>To reload this character back into the StoneSys web app, copy the exact code block below and paste it in the import dialog:</p>
    <p>[[STONESYS_SAVE:${b64}]]</p>
  </div>
</body>
</html>`;
}

// Search for an existing document with the character name
async function searchDriveFile(accessToken, name) {
  const q = encodeURIComponent(`name = '${name.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.document' and trashed = false`);
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)`;
  
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    throw new Error("Failed to search Google Drive: " + res.statusText);
  }
  const data = await res.json();
  return data.files && data.files.length > 0 ? data.files[0] : null;
}

// Upload a Google Doc (handles both creating and updating)
async function uploadFile(accessToken, name, htmlContent, fileId = null) {
  const boundary = 'stonesys_multipart_boundary';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";
  
  const metadata = {
    name: name,
    mimeType: 'application/vnd.google-apps.document'
  };
  
  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/html; charset=UTF-8\r\n\r\n' +
    htmlContent +
    close_delim;
    
  let url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
  let method = 'POST';
  
  if (fileId) {
    url = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`;
    method = 'PATCH';
  }
  
  const res = await fetch(url, {
    method: method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: multipartRequestBody
  });
  
  if (!res.ok) {
    throw new Error(`Failed to save to Google Drive: ${res.statusText}`);
  }
  return await res.json();
}

// Save the character state to Google Drive as a Google Doc
export async function saveCharacterToDrive(accessToken, state, playbook) {
  const docName = `StoneSys - ${playbook.name} - ${state.name || 'Unnamed'}`;
  const html = generateCharacterHtml(state, playbook);
  
  // Search for existing file
  const existing = await searchDriveFile(accessToken, docName);
  const fileId = existing ? existing.id : null;
  
  return await uploadFile(accessToken, docName, html, fileId);
}

// Fetch all Stonetop/StoneSys Google Docs in the user's Drive
export async function listDriveFiles(accessToken) {
  const q = encodeURIComponent(`mimeType = 'application/vnd.google-apps.document' and name contains 'StoneSys -' and trashed = false`);
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc`;
  
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    throw new Error("Failed to list files from Google Drive: " + res.statusText);
  }
  const data = await res.json();
  return data.files || [];
}

// Load character data from a Google Document export
export async function loadFromDrive(accessToken, fileId) {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/html`;
  
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    throw new Error("Failed to read Google Document data: " + res.statusText);
  }
  const html = await res.text();
  
  // Look for the special JSON payload tag
  const match = /\[\[STONESYS_SAVE:([A-Za-z0-9+/=]+)\]\]/.exec(html);
  if (!match) {
    throw new Error("This Google Document does not contain valid StoneSys character data.");
  }
  
  try {
    const b64 = match[1];
    const decoded = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(decoded);
  } catch (e) {
    throw new Error("Failed to parse character data from document: " + e.message);
  }
}
