/* 手書きの作り方ページに、材料と道具の2つの買い物枠を組み直す。
   各ページの「1. 材料と道具」の材料リストを読み、material-links.js の
   判定にかけます。何度実行しても同じ結果になるよう、生地の検索語は
   既存リンクからそのまま引き継ぎます。

   枠はそれぞれのリストの直下に置きます。見出しが「材料をネットで探す」
   なのに道具が並んでいると、書いてあることと中身が食い違うためです。

     <h3>材料</h3><ul>…</ul>  →  材料をネットで探す
     <h3>道具</h3><ul>…</ul>  →  道具をネットで探す */

const fs = require("fs");
const path = require("path");
const { materialLinks, toolLinks } = require("./material-links.js");

const ROOT = path.join(__dirname, "..");
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

const PR_TEXT = "※ 本ページはアフィリエイト広告（楽天アフィリエイト・Amazonアソシエイト）を含みます。";

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

function shopBox(head, links){
  return `    <div class="material-box">
      <p class="material-box-head">${head}</p>
      <div class="material-links">
${links.map((l, i) => (i % 2 === 0)
? `        <a class="ml-btn ml-btn-rakuten" href="${l.href}" target="_blank" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" attributionsrc>楽天 — ${esc(l.label)}</a>`
: `        <a class="ml-btn ml-btn-amazon" href="${esc(l.amazonHref)}" target="_blank" rel="nofollow sponsored">Amazon — ${esc(l.label)}</a>`).join("\n")}
      </div>
      <img src="//i.moshimo.com/af/i/impression?a_id=5652284&p_id=54&pc_id=54&pl_id=616" width="1" height="1" style="border:none;" alt="" loading="lazy">
      <p class="material-pr">${PR_TEXT}</p>
    </div>`;
}

const files = fs.readdirSync(ROOT).filter(f => /^howto-.+\.html$/.test(f));
let changed = 0, skipped = 0;

for(const f of files){
  const p = path.join(ROOT, f);
  const html = fs.readFileSync(p, "utf8");

  /* 生地の検索語は既存の1本目から引き継ぎます。無ければ触りません。 */
  const first = html.match(/<a class="ml-btn[^"]*" href="([^"]+)"[^>]*>楽天 — ([^<]+)<\/a>/);
  if(!first){ skipped++; continue; }
  const kw = keywordFromHref(first[1]);
  if(!kw){ skipped++; continue; }

  const materials = materialsOf(html);

  /* いまある買い物枠をいったん全部外してから、所定の位置に置き直します。
     1枠だった頃のページも、2枠になったあとのページも同じ結果になります。 */
  let out = html.replace(/[ \t]*<div class="material-box">[\s\S]*?<p class="material-pr">[^<]*<\/p>\s*<\/div>\n?/g, "");
  if(/<div class="material-box">/.test(out)){ skipped++; continue; }   // 外しきれなければ触らない

  const toolsHead = out.match(/([ \t]*)<h3>道具<\/h3>/);
  if(!toolsHead){ skipped++; continue; }

  out = out.replace(/([ \t]*)<h3>道具<\/h3>/,
    shopBox("材料をネットで探す", materialLinks(materials, kw, first[2])) + "\n$1<h3>道具</h3>");

  /* 道具リストの直後（= 材料セクションの終わり）に道具の枠を足します。 */
  out = out.replace(/(<h3>道具<\/h3>[\s\S]*?<\/ul>\n)/,
    "$1" + shopBox("道具をネットで探す", toolLinks(materials)) + "\n");

  /* 材料リンクのクリック計測。gen-ja-howto.js が作らない手書きページにも
     要るので、買い物枠を組んだこの場で一緒に入れます。 */
  if(!out.includes('src="affiliate.js"'))
    out = out.replace('<script src="terms.js"></script>',
                      '<script src="terms.js"></script>\n<script src="affiliate.js"></script>');

  if(out === html){ skipped++; continue; }
  fs.writeFileSync(p, out);
  changed++;
}

console.log(`material links: updated ${changed} pages (unchanged ${skipped}).`);
