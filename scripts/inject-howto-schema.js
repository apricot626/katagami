/* ============================================================
   Inject HowTo + BreadcrumbList structured data, a visible
   breadcrumb, and a "related guides" block into the Japanese
   howto-*.html pages.

   - Derives pattern names / categories from patterns.js.
   - Extracts steps/materials from each page via a real DOM
     (headless Chromium, file:// — no server needed).
   - Idempotent: pages that already contain the schema are skipped,
     so this is safe to re-run after adding new howto pages.

   Run:  node scripts/inject-howto-schema.js
   (EN pages get the same treatment from scripts/gen-en-howto.js.)
   ============================================================ */
const fs = require("fs");
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "node_modules", "playwright-core"));

const ROOT = path.join(__dirname, "..");
const BASE = "https://katagami.org/";

// ---- pattern name / category maps from patterns.js ----
let src = fs.readFileSync(path.join(ROOT, "patterns.js"), "utf8")
  .replace(/\bconst PATTERNS=/, "globalThis.PATTERNS=").replace(/window\./g, "globalThis._w_");
(0, eval)(src);
const P = globalThis.PATTERNS;
const order = Object.keys(P).sort((a, b) => (P[a].order ?? 999) - (P[b].order ?? 999));
const NAME = {}; const byCat = {};
for (const k of order) { NAME[k] = P[k].name; (byCat[P[k].mode] = byCat[P[k].mode] || []).push(k); }

const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ld = obj => '<script type="application/ld+json">\n' + JSON.stringify(obj, null, 2).replace(/</g, "\\u003c") + '\n</script>';

function relatedHtml(key) {
  const sibs = byCat[P[key].mode].filter(k => k !== key).slice(0, 4);
  const items = sibs.map(k => `        <li><a href="howto-${k}.html">${esc(NAME[k])}</a></li>`).join("\n");
  return `  <nav class="related" aria-label="関連する作り方">\n    <h2>関連する作り方</h2>\n    <ul>\n${items}\n    </ul>\n  </nav>\n`;
}

(async () => {
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  let done = 0, skip = 0, errs = [];
  for (const key of order) {
    const file = path.join(ROOT, `howto-${key}.html`);
    if (!fs.existsSync(file)) { errs.push(key + " missing"); continue; }
    let html = fs.readFileSync(file, "utf8");
    if (/"@type":\s*"HowTo"/.test(html) || html.includes('class="related"')) { skip++; continue; }

    const p = await browser.newPage();
    await p.goto("file://" + file, { waitUntil: "domcontentloaded" });
    const data = await p.evaluate(() => {
      const clean = s => s.replace(/\s+/g, " ").trim();
      const name = clean(document.querySelector("h1").textContent);
      const desc = document.querySelector("meta[name=description]")?.content || "";
      const uls = document.querySelectorAll("#materials ul");
      const supplies = uls[0] ? [...uls[0].querySelectorAll("li")].map(li => clean(li.textContent)) : [];
      const tools = uls[1] ? [...uls[1].querySelectorAll("li")].map(li => clean(li.textContent)) : [];
      const steps = [];
      for (const sec of ["cut", "sew"]) {
        document.querySelectorAll(`#${sec} ol.steps > li`).forEach(li => {
          const strong = li.querySelector("strong");
          steps.push({ name: strong ? clean(strong.textContent) : "", text: clean(li.textContent), section: sec });
        });
      }
      return { name, desc, supplies, tools, steps };
    });
    await p.close();

    const url = BASE + `howto-${key}.html`;
    const howTo = {
      "@context": "https://schema.org", "@type": "HowTo",
      name: data.name, description: data.desc, inLanguage: "ja",
      image: "https://katagami.org/ogp.png",
      supply: data.supplies.map(s => ({ "@type": "HowToSupply", name: s })),
      tool: data.tools.map(t => ({ "@type": "HowToTool", name: t })),
      step: data.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name || ("手順" + (i + 1)), text: s.text, url: url + "#" + s.section }))
    };
    const crumbs = {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "カタガミ", item: BASE },
        { "@type": "ListItem", position: 2, name: "作り方ガイド", item: BASE + "howto.html" },
        { "@type": "ListItem", position: 3, name: data.name, item: url }
      ]
    };
    html = html.replace("</head>", ld(howTo) + "\n" + ld(crumbs) + "\n</head>");
    const crumbHtml = `<nav class="crumb" aria-label="パンくずリスト"><a href="index.html">カタガミ</a><span class="sep">›</span><a href="howto.html">作り方ガイド</a><span class="sep">›</span><span class="cur">${esc(data.name)}</span></nav>`;
    html = html.replace('<p class="category">作り方ガイド</p>', crumbHtml);
    html = html.replace("</article>", relatedHtml(key) + "</article>");
    fs.writeFileSync(file, html);
    done++;
  }
  await browser.close();
  console.log(`injected: ${done} | skipped(existing): ${skip} | errors:`, errs);
})();
