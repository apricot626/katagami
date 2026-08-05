/* 手書きの作り方ページの材料ボックスに、副資材の楽天リンクを足す。
   各ページの「1. 材料と道具」の材料リストを読み、material-links.js の
   判定にかけて最大4本のリンクに置き換えます。何度実行しても同じ結果
   になるよう、1本目（生地）は既存リンクの検索語をそのまま使います。 */

const fs = require("fs");
const path = require("path");
const { materialLinks } = require("./material-links.js");

const ROOT = path.join(__dirname, "..");
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

/* もしも経由のURLから、楽天の検索語を取り出す */
function keywordFromHref(href){
  const m = String(href).match(/[?&]url=([^"&]+)/);
  if(!m) return null;
  try{
    const inner = decodeURIComponent(m[1]);
    const k = inner.match(/\/search\/mall\/([^/]+)\//);
    return k ? decodeURIComponent(k[1]) : null;
  }catch(e){ return null; }
}

/* 材料セクションの <li> を抜き出す */
function materialsOf(html){
  const sec = html.match(/<section id="materials">([\s\S]*?)<\/section>/);
  if(!sec) return [];
  const ul = sec[1].match(/<h3>材料[\s\S]*?<ul>([\s\S]*?)<\/ul>/);
  if(!ul) return [];
  return [...ul[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => m[1]);
}

const files = fs.readdirSync(ROOT).filter(f => /^howto-.+\.html$/.test(f));
let changed = 0, skipped = 0;

for(const f of files){
  const p = path.join(ROOT, f);
  const html = fs.readFileSync(p, "utf8");
  const box = html.match(/(<div class="material-links">)([\s\S]*?)(<\/div>)/);
  if(!box){ skipped++; continue; }

  const first = box[2].match(/<a class="ml-btn[^"]*" href="([^"]+)"[^>]*>楽天 — ([^<]+)<\/a>/);
  if(!first){ skipped++; continue; }
  const kw = keywordFromHref(first[1]);
  if(!kw){ skipped++; continue; }

  const links = materialLinks(materialsOf(html), kw, first[2]);
  const body = links.map(l =>
    `        <a class="ml-btn ml-btn-rakuten" href="${l.href}" target="_blank" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" attributionsrc>楽天 — ${esc(l.label)}</a>`
  ).join("\n");
  const next = box[1] + "\n" + body + "\n      " + box[3];

  if(next === box[0]){ skipped++; continue; }
  fs.writeFileSync(p, html.replace(box[0], next));
  changed++;
}

console.log(`material links: updated ${changed} pages (unchanged ${skipped}).`);
