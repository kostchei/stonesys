// Build static HTML wiki pages for the Azure Static Web App under web/wiki.
// Usage: node handbook/tools/build-web-wiki.mjs
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const root = process.cwd();
const handbookDir = join(root, "handbook");
const outDir = join(root, "web", "wiki");

const chapterFiles = readdirSync(handbookDir)
  .filter((file) => /^\d\d-.*\.md$/.test(file))
  .sort();

function readUtf8(path) {
  return readFileSync(path, "utf8").replace(/^\uFEFF/, "");
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(value) {
  const code = [];
  let text = value.replace(/`([^`]+)`/g, (_match, body) => {
    code.push(`<code>${escapeHtml(body)}</code>`);
    return `@@CODE${code.length - 1}@@`;
  });
  text = escapeHtml(text);
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
  code.forEach((html, index) => {
    text = text.replace(`@@CODE${index}@@`, html);
  });
  return text;
}

function titleFromMarkdown(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].replace(/^\d+\.\s*/, "").trim() : fallback;
}

function pageSlug(file, title) {
  const number = basename(file).slice(0, 2);
  const slug = title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${number}-${slug}`;
}

function splitTableRow(line) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

function isTableSeparator(line) {
  return splitTableRow(line).every((cell) => /^:?-{3,}:?$/.test(cell));
}

function tableToHtml(lines) {
  const rows = lines.filter((line) => !isTableSeparator(line)).map(splitTableRow);
  if (!rows.length) return "";
  const [head, ...body] = rows;
  return `<div class="table-wrap"><table><thead><tr>${head
    .map((cell) => `<th>${inlineMarkdown(cell)}</th>`)
    .join("")}</tr></thead><tbody>${body
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`
    )
    .join("")}</tbody></table></div>`;
}

function flushParagraph(buffer, html) {
  if (!buffer.length) return;
  const text = buffer.map((line) => line.trim()).join(" ").trim();
  if (text) html.push(`<p>${inlineMarkdown(text)}</p>`);
  buffer.length = 0;
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  const paragraph = [];
  let i = 0;
  let inCode = false;
  let codeLines = [];

  while (i < lines.length) {
    const raw = lines[i].replace(/\s+$/, "");
    const line = raw.trim();

    if (line.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        flushParagraph(paragraph, html);
        inCode = true;
      }
      i += 1;
      continue;
    }
    if (inCode) {
      codeLines.push(raw);
      i += 1;
      continue;
    }
    if (!line) {
      flushParagraph(paragraph, html);
      i += 1;
      continue;
    }
    if (line === "---" || line === "\\newpage") {
      flushParagraph(paragraph, html);
      i += 1;
      continue;
    }
    if (line.startsWith("|") && line.includes("|", 1)) {
      flushParagraph(paragraph, html);
      const table = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        table.push(lines[i].trim());
        i += 1;
      }
      html.push(tableToHtml(table));
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph(paragraph, html);
      const level = Math.min(heading[1].length, 4);
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }
    if (line.startsWith(">")) {
      flushParagraph(paragraph, html);
      html.push(`<blockquote>${inlineMarkdown(line.replace(/^>\s?/, ""))}</blockquote>`);
      i += 1;
      continue;
    }
    const list = line.match(/^([-*]|\d+\.)\s+(.+)$/);
    if (list) {
      flushParagraph(paragraph, html);
      const ordered = /\d+\./.test(list[1]);
      const tag = ordered ? "ol" : "ul";
      const items = [];
      while (i < lines.length) {
        const nextRaw = lines[i].replace(/\s+$/, "");
        const nextLine = nextRaw.trim();
        const match = nextLine.match(/^([-*]|\d+\.)\s+(.+)$/);
        if (!match || /\d+\./.test(match[1]) !== ordered) break;
        let text = match[2];
        i += 1;
        const continuation = [];
        while (i < lines.length) {
          const continuationRaw = lines[i].replace(/\s+$/, "");
          const continuationLine = continuationRaw.trim();
          if (!continuationLine) break;
          if (continuationLine.match(/^([-*]|\d+\.)\s+(.+)$/)) break;
          if (continuationRaw.startsWith("  ") || continuationRaw.startsWith("\t")) {
            continuation.push(continuationLine);
            i += 1;
            continue;
          }
          break;
        }
        if (continuation.length) text = [text, ...continuation].join(" ");
        items.push(`<li>${inlineMarkdown(text)}</li>`);
      }
      html.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    paragraph.push(line);
    i += 1;
  }

  flushParagraph(paragraph, html);
  return html.join("\n");
}

function pageTemplate({ title, body, chapters, currentSlug }) {
  const nav = chapters
    .map(
      (chapter) =>
        `<a class="${chapter.slug === currentSlug ? "active" : ""}" href="${chapter.slug}.html">${escapeHtml(chapter.title)}</a>`
    )
    .join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} - StoneSys Wiki</title>
  <link rel="stylesheet" href="wiki.css">
</head>
<body>
  <header class="wiki-topbar">
    <a class="brand" href="../index.html">StoneSys</a>
    <nav>
      <a href="index.html">Handbook Wiki</a>
      <a href="rules.html">Rules Index</a>
      <a href="playbooks.html">Playbooks</a>
      <a href="../index.html">Dashboard</a>
    </nav>
  </header>
  <main class="wiki-layout">
    <aside class="wiki-sidebar">
      <h2>Handbook</h2>
      ${nav}
    </aside>
    <article class="wiki-content">
      ${body}
    </article>
  </main>
</body>
</html>
`;
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const chapters = chapterFiles.map((file) => {
  const source = readUtf8(join(handbookDir, file));
  const title = titleFromMarkdown(source, file);
  return {
    file,
    source,
    title,
    slug: pageSlug(file, title),
  };
});

for (const chapter of chapters) {
  writeFileSync(
    join(outDir, `${chapter.slug}.html`),
    pageTemplate({
      title: chapter.title,
      body: markdownToHtml(chapter.source),
      chapters,
      currentSlug: chapter.slug,
    }),
    "utf8"
  );
}

function wikiLink(slug, label) {
  return `<li><a href="${slug}.html">${escapeHtml(label)}</a></li>`;
}

writeFileSync(
  join(outDir, "index.html"),
  pageTemplate({
    title: "Handbook Wiki",
    body: `<h1>StoneSys Player Handbook Wiki</h1>
<p>This wiki is generated from the canonical <code>handbook/</code> chapter sources and published inside the Azure Static Web App.</p>
<h2>Chapters</h2>
<ol>${chapters.map((chapter) => wikiLink(chapter.slug, chapter.title)).join("")}</ol>
<h2>Indexes</h2>
<ul>
  <li><a href="rules.html">Rules Index</a></li>
  <li><a href="playbooks.html">Playbooks</a></li>
</ul>`,
    chapters,
    currentSlug: "",
  }),
  "utf8"
);

writeFileSync(
  join(outDir, "rules.html"),
  pageTemplate({
    title: "Rules Index",
    body: `<h1>Rules Index</h1>
<ul>
${wikiLink("03-the-conversation", "Action scenes and fiction first")}
${wikiLink("04-making-a-check", "Risky checks and dice pools")}
${wikiLink("05-reading-a-roll", "Reading a roll")}
${wikiLink("08-moves", "Moves")}
${wikiLink("09-currencies", "Currencies and hold")}
${wikiLink("10-harm-and-recovery", "Harm, HP, armor, recovery, and Death's Door")}
${wikiLink("11-growing", "XP and advancement")}
${wikiLink("12-patrons", "Patrons, Bond, Debt, and Heat")}
${wikiLink("13-gods", "Gods, Devotion, Favor, and Wrath")}
${wikiLink("15-your-steading", "Steading turns, downtime, and strange resources")}
${wikiLink("16-expeditions", "Expeditions")}
${wikiLink("21-appendices", "Reference appendices")}
</ul>`,
    chapters,
    currentSlug: "",
  }),
  "utf8"
);

writeFileSync(
  join(outDir, "playbooks.html"),
  pageTemplate({
    title: "Playbooks",
    body: `<h1>Playbooks</h1>
<h2>Core</h2>
<ul>${wikiLink("17-stonetop", "Stonetop playbooks")}</ul>
<h2>Campaign playsets</h2>
<ul>
${wikiLink("18-the-free-legion", "The Free Legion")}
${wikiLink("19-the-hollow-oak-holt", "The Hollow-Oak Holt")}
${wikiLink("20-the-sign-of-the-black-cat", "The Sign of the Black Cat")}
</ul>`,
    chapters,
    currentSlug: "",
  }),
  "utf8"
);

writeFileSync(
  join(outDir, "wiki.css"),
  `@font-face { font-family: "IM Fell English"; src: url("../fonts/imfell-400.woff2") format("woff2"); font-display: swap; }
@font-face { font-family: "EB Garamond"; src: url("../fonts/ebgaramond-400.woff2") format("woff2"); font-display: swap; }
@font-face { font-family: "EB Garamond"; src: url("../fonts/ebgaramond-700.woff2") format("woff2"); font-weight: 700; font-display: swap; }
:root { --paper: #f7f3ea; --panel: #f1ebdd; --card: #fffefb; --ink: #1c1a17; --muted: #5f574b; --line: #cabfa6; --accent: #6b4f2a; }
* { box-sizing: border-box; }
body { margin: 0; color: var(--ink); background: var(--paper); font: 19px/1.55 "EB Garamond", Georgia, serif; }
.wiki-topbar { position: sticky; top: 0; z-index: 5; min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 12px 28px; background: var(--panel); border-bottom: 1px solid var(--line); }
.brand { font: 28px/1 "IM Fell English", Georgia, serif; color: var(--ink); text-decoration: none; }
.wiki-topbar nav { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
.wiki-topbar nav a { color: var(--accent); text-decoration: none; border: 1px solid var(--line); background: var(--card); padding: 5px 10px; border-radius: 4px; font-size: 16px; }
.wiki-layout { display: grid; grid-template-columns: 280px minmax(0, 1fr); min-height: calc(100vh - 64px); }
.wiki-sidebar { position: sticky; top: 65px; height: calc(100vh - 65px); overflow: auto; padding: 22px 18px; background: var(--panel); border-right: 1px solid var(--line); }
.wiki-sidebar h2 { margin: 0 0 12px; color: var(--accent); font: 20px/1.2 "IM Fell English", Georgia, serif; text-transform: uppercase; letter-spacing: .08em; }
.wiki-sidebar a { display: block; color: var(--ink); text-decoration: none; padding: 6px 8px; border-radius: 4px; font-size: 16px; line-height: 1.25; }
.wiki-sidebar a:hover, .wiki-sidebar a.active { background: var(--card); color: var(--accent); }
.wiki-content { max-width: 980px; padding: 42px 56px 72px; }
h1, h2, h3, h4 { font-family: "IM Fell English", Georgia, serif; line-height: 1.15; }
h1 { font-size: 42px; margin: 0 0 18px; }
h2 { font-size: 30px; margin: 34px 0 12px; color: var(--accent); border-bottom: 1px solid var(--line); padding-bottom: 4px; }
h3 { font-size: 24px; margin: 26px 0 8px; }
h4 { font-size: 20px; margin: 22px 0 6px; font-style: italic; }
p, ul, ol, blockquote, .table-wrap { margin: 0 0 14px; }
ul, ol { padding-left: 26px; }
li { margin: 4px 0; }
a { color: var(--accent); }
code { font-family: "Consolas", monospace; font-size: .86em; background: #eee6d8; padding: 1px 4px; border-radius: 3px; }
pre { overflow: auto; background: #eee6d8; padding: 12px; border: 1px solid var(--line); }
blockquote { border-left: 4px solid var(--line); padding-left: 14px; color: var(--muted); font-style: italic; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 16px; background: var(--card); }
th, td { border: 1px solid var(--line); padding: 7px 8px; vertical-align: top; }
th { background: #ebe5d9; text-align: left; color: var(--ink); }
@media (max-width: 860px) {
  .wiki-topbar { position: static; align-items: flex-start; flex-direction: column; }
  .wiki-layout { display: block; }
  .wiki-sidebar { position: static; height: auto; border-right: 0; border-bottom: 1px solid var(--line); }
  .wiki-content { padding: 28px 20px 56px; }
  h1 { font-size: 34px; }
}
`,
  "utf8"
);

writeFileSync(
  join(outDir, "README.md"),
  `# Azure Static Web App Wiki\n\nGenerated from \`handbook/\` by \`node handbook/tools/build-web-wiki.mjs\`.\n\nThe deployed entry point is \`/wiki/\`.\n`,
  "utf8"
);

console.log(`Wrote Azure Static Web App wiki to ${outDir}`);
