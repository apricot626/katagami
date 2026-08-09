/* ============================================================
   完成イメージ図を各ガイドの冒頭（.article-head のリード文の下）に挿入します。
   和文 howto-<key>.html と、あれば en/howto-<key>.html の両方。
   START/END マーカーの間を書き換えるので、何度流しても増えません。
   生成ページ（gen-ja-howto.js / gen-en-howto.js が作るもの）は
   生成器側が同じ図を出力するので、ここで挿し直しても同じ結果になります。
   Run:  node scripts/inject-howto-heroes.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const { HEROES, heroFor } = require("./howto-heroes.js");

const ROOT = path.join(__dirname, "..");
const START = "<!-- howto-hero:START -->";
const END = "<!-- howto-hero:END -->";

/* リード文（<p class="lead">…</p>）の直後、目次の前に置く */
const LEAD_END = /<p class="lead">[\s\S]*?<\/p>\n/;

function inject(file, key, lang) {
  if (!fs.existsSync(file)) return false;
  let html = fs.readFileSync(file, "utf8");
  const hero = heroFor(key, lang);
  if (!hero) return false;
  const block = `    ${START}\n    ${hero}\n    ${END}\n`;

  if (html.includes(START)) {
    const re = new RegExp("[ \\t]*" + START + "[\\s\\S]*?" + END + "\\n?");
    html = html.replace(re, block);
  } else {
    const m = html.match(LEAD_END);
    if (!m) { console.warn("skip (no lead):", file); return false; }
    const at = m.index + m[0].length;
    html = html.slice(0, at) + block + html.slice(at);
  }
  fs.writeFileSync(file, html);
  return true;
}

let done = 0;
for (const key of Object.keys(HEROES)) {
  if (inject(path.join(ROOT, `howto-${key}.html`), key, "ja")) done++;
  if (inject(path.join(ROOT, "en", `howto-${key}.html`), key, "en")) done++;
}
console.log(`injected/updated ${done} hero figures.`);
