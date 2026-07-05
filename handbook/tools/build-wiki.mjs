// Build a GitHub Wiki-style markdown export from handbook chapter sources.
// Usage: node handbook/tools/build-wiki.mjs
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const root = process.cwd();
const handbookDir = join(root, "handbook");
const outDir = join(root, "wiki");

const chapterFiles = readdirSync(handbookDir)
  .filter((file) => /^\d\d-.*\.md$/.test(file))
  .sort();

function readUtf8(file) {
  return readFileSync(file, "utf8").replace(/^\uFEFF/, "");
}

function titleFromMarkdown(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].replace(/^\d+\.\s*/, "").trim() : fallback;
}

function pageNameFor(file, title) {
  const number = basename(file).slice(0, 2);
  const slug = title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${number}-${slug}`;
}

function normalizeChapterMarkdown(markdown, pageTitle) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const output = [];
  let replacedTitle = false;
  for (const line of lines) {
    if (!replacedTitle && line.startsWith("# ")) {
      output.push(`# ${pageTitle}`);
      replacedTitle = true;
      continue;
    }
    if (line.trim() === "\\newpage") continue;
    output.push(line);
  }
  return output.join("\n").trim() + "\n";
}

function link(page, label) {
  return `[[${label}|${page}]]`;
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const chapters = chapterFiles.map((file) => {
  const source = readUtf8(join(handbookDir, file));
  const title = titleFromMarkdown(source, file);
  return {
    file,
    title,
    page: pageNameFor(file, title),
    source,
  };
});

for (let index = 0; index < chapters.length; index += 1) {
  const chapter = chapters[index];
  const previous = chapters[index - 1];
  const next = chapters[index + 1];
  const nav = [
    previous ? `Previous: ${link(previous.page, previous.title)}` : "",
    next ? `Next: ${link(next.page, next.title)}` : "",
  ]
    .filter(Boolean)
    .join(" | ");
  const body = normalizeChapterMarkdown(chapter.source, chapter.title);
  writeFileSync(
    join(outDir, `${chapter.page}.md`),
    `${nav ? `${nav}\n\n---\n\n` : ""}${body}${nav ? `\n---\n\n${nav}\n` : ""}`,
    "utf8"
  );
}

const toc = chapters.map((chapter) => `- ${link(chapter.page, chapter.title)}`).join("\n");

writeFileSync(
  join(outDir, "Home.md"),
  `# StoneSys Player Handbook Wiki\n\nThis wiki is generated from the canonical \`handbook/\` chapter sources.\n\n## Chapters\n\n${toc}\n\n## Indexes\n\n- ${link("Rules-Index", "Rules Index")}\n- ${link("Playbooks", "Playbooks")}\n- ${link("Reference", "Reference")}\n`,
  "utf8"
);

writeFileSync(
  join(outDir, "_Sidebar.md"),
  `# StoneSys\n\n- ${link("Home", "Home")}\n- ${link("Rules-Index", "Rules Index")}\n- ${link("Playbooks", "Playbooks")}\n- ${link("Reference", "Reference")}\n\n## Chapters\n\n${toc}\n`,
  "utf8"
);

writeFileSync(
  join(outDir, "Rules-Index.md"),
  `# Rules Index\n\n- ${link("03-the-conversation", "Action scenes and fiction first")}\n- ${link("04-making-a-check", "Risky checks and dice pools")}\n- ${link("05-reading-a-roll", "Reading a roll")}\n- ${link("08-moves", "Moves")}\n- ${link("09-currencies", "Currencies and hold")}\n- ${link("10-harm-and-recovery", "Harm, HP, armor, recovery, and Death's Door")}\n- ${link("11-growing", "XP and advancement")}\n- ${link("12-patrons", "Patrons, Bond, Debt, and Heat")}\n- ${link("13-gods", "Gods, Devotion, Favor, and Wrath")}\n- ${link("15-your-steading", "Steading turns, downtime, and strange resources")}\n- ${link("16-expeditions", "Expeditions")}\n- ${link("21-appendices", "Reference appendices")}\n`,
  "utf8"
);

writeFileSync(
  join(outDir, "Playbooks.md"),
  `# Playbooks\n\n## Stonetop\n\n- ${link("17-stonetop", "Stonetop playbooks")}\n\n## Campaign Playsets\n\n- ${link("18-the-free-legion", "The Free Legion")}\n- ${link("19-the-hollow-oak-holt", "The Hollow-Oak Holt")}\n- ${link("20-the-sign-of-the-black-cat", "The Sign of the Black Cat")}\n`,
  "utf8"
);

writeFileSync(
  join(outDir, "Reference.md"),
  `# Reference\n\n- ${link("00-stonesys-the-players-handbook", "Contents")}\n- ${link("21-appendices", "Appendices")}\n- ${link("Rules-Index", "Rules Index")}\n\n## Build\n\nRegenerate this wiki with:\n\n\`\`\`powershell\nnode handbook/tools/build-wiki.mjs\n\`\`\`\n`,
  "utf8"
);

writeFileSync(
  join(outDir, "README.md"),
  `# StoneSys Wiki Export\n\nGenerated from \`handbook/\`.\n\nFor GitHub Wiki, copy the contents of this directory into the repository wiki checkout. \`Home.md\` and \`_Sidebar.md\` are included.\n\nRegenerate with:\n\n\`\`\`powershell\nnode handbook/tools/build-wiki.mjs\n\`\`\`\n`,
  "utf8"
);

console.log(`Wrote ${chapters.length} chapter pages plus index pages to ${outDir}`);
