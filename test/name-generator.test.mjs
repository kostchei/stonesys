import assert from 'node:assert';
import { generateName } from "../web/name-generators.js";

function runTests() {
  console.log("Running Name Generator unit tests...");

  const campaigns = ['stonetop', 'lankhmar', 'darksun', 'elfquest'];
  
  campaigns.forEach(campaignId => {
    console.log(`Testing names generated for campaign: ${campaignId}`);
    
    const names = [];
    for (let i = 0; i < 200; i++) {
      const name = generateName(campaignId);
      assert.strictEqual(typeof name, 'string');
      assert.ok(name.length > 1, `Name should be a valid string, got: "${name}"`);
      names.push(name);
    }
    
    // Ensure we generated some varying names
    const uniqueNames = new Set(names);
    assert.ok(uniqueNames.size > 10, `Generated names should be diverse, got only ${uniqueNames.size} unique out of 200`);
    console.log(`ok   ${campaignId} names are diverse (${uniqueNames.size} unique names)`);
  });

  console.log("\nAll Name Generator unit tests passed successfully!");
}

runTests();
