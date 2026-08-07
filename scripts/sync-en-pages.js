#!/usr/bin/env node
/* 英語ガイドを足したあとに、周辺のページを追随させる。

   - en/howto.html のカードを、英語ガイドのデータからカテゴリごとに並べ直す
   - sitemap.xml に、まだ載っていないページを追加する（転送用ページは除く）

   何度実行しても同じ結果になります（べき等）。 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = "https://katagami.org";
const DATA = require("./en-howto-data.js");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* カードの副題。data に sub があればそれを、なければ desc の最初の句を短く使う。 */
function cardSub(g) {
  if (g.sub) return g.sub;
  const first = String(g.desc).replace(/^How to sew\s+/i, "").replace(/^How to make\s+/i, "").split(". ")[0];
  const t = first.charAt(0).toUpperCase() + first.slice(1);
  return t.length > 46 ? t.slice(0, 45).replace(/[ ,]+$/, "") + "…" : t;
}

/* ---------- 1. en/howto.html のカード ---------- */
const TAB_H = {
  human: "Adult clothes", kids: "Kids' clothes", baby: "Baby",
  small: "Accessories", bag: "Bags", pet: "Pets", home: "Home", oshi: "Fandom",
};

const p = path.join(ROOT, "en", "howto.html");
let html = fs.readFileSync(p, "utf8");

/* 既存カードの副題は、手で書かれた良い文言なので拾って引き継ぐ */
const existingSub = {};
for (const m of html.matchAll(
  /<a class="howto-card" href="howto-([a-z]+)\.html">\s*<p class="card-title">[^<]*<\/p>\s*<p class="card-sub">([^<]*)<\/p>/g))
  existingSub[m[1]] = m[2];

let cardCount = 0;
for (const [tab, heading] of Object.entries(TAB_H)) {
  const keys = Object.keys(DATA).filter(k => DATA[k].tab === tab);
  if (!keys.length) continue;
  const cards = keys.map(k =>
    `      <a class="howto-card" href="howto-${k}.html">\n` +
    `        <p class="card-title">${esc(DATA[k].title)}</p>\n` +
    `        <p class="card-sub">${existingSub[k] || esc(cardSub(DATA[k]))}</p>\n` +
    `        <p class="card-arrow">Read the guide →</p>\n` +
    `      </a>\n`).join("");
  cardCount += keys.length;

  const head = new RegExp(`<h2>${heading.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}</h2>\\s*\\n\\s*<div class="howto-grid">`);
  const m = html.match(head);
  if (!m) { console.warn(`  en/howto.html: "${heading}" の見出しが見つかりません`); continue; }
  const start = m.index + m[0].length;
  const end = html.indexOf("    </div>\n  </section>", start);
  html = html.slice(0, start) + "\n" + cards + html.slice(end);
}
fs.writeFileSync(p, html);
console.log(`en/howto.html: カード ${cardCount} 枚に更新`);

/* ---------- 2. i18n.js の HOWTO_EN ---------- */
/* 英語ツール画面の「作り方」リンクは、この一覧に載っているかどうかで
   英語ガイドへ送るか日本語ガイドへ送るかを決めています。手で足すと必ず
   取りこぼすので、英語ガイドのデータから毎回書き直します。 */
const i18nPath = path.join(ROOT, "i18n.js");
const i18n = fs.readFileSync(i18nPath, "utf8");
const line = "  var HOWTO_EN={ " + Object.keys(DATA).map(k => k + ":1").join(", ") + " };";
const replaced = i18n.replace(/^ {2}var HOWTO_EN=\{[^}]*\};$/m, line);
if (replaced === i18n && !i18n.includes(line))
  console.warn("  i18n.js: HOWTO_EN の行が見つかりません");
else if (replaced !== i18n) {
  fs.writeFileSync(i18nPath, replaced);
  console.log(`i18n.js: HOWTO_EN を ${Object.keys(DATA).length} 件に更新`);
} else {
  console.log("i18n.js: HOWTO_EN は変更なし");
}

/* ---------- 3. sitemap ---------- */
const smPath = path.join(ROOT, "sitemap.xml");
let sm = fs.readFileSync(smPath, "utf8");
const today = new Date().toISOString().slice(0, 10);

const allPages = [
  ...fs.readdirSync(ROOT).filter(f => f.endsWith(".html")),
  ...fs.readdirSync(path.join(ROOT, "en")).filter(f => f.endsWith(".html")).map(f => "en/" + f),
];
let added = 0;
let block = "";
for (const f of allPages) {
  // 転送用ページは検索対象にしないので載せない
  if (/<meta http-equiv="refresh"/.test(fs.readFileSync(path.join(ROOT, f), "utf8"))) continue;
  const url = SITE + "/" + (f === "index.html" ? "" : f === "en/index.html" ? "en/" : f);
  if (sm.includes(`<loc>${url}</loc>`)) continue;
  block += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n` +
           `    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  added++;
}
if (added) {
  const at = sm.lastIndexOf("</urlset>");
  fs.writeFileSync(smPath, sm.slice(0, at) + block + sm.slice(at));
}
console.log(`sitemap.xml: ${added} 件追加（計 ${(fs.readFileSync(smPath, "utf8").match(/<url>/g) || []).length} URL）`);
