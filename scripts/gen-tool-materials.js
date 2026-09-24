/* 型紙ツールの「印刷したあとの買い物枠」に出す材料を、作り方ガイドから集める。

   材料の対応表は作り方ガイド側にあります（material-links.js / material-links-en.js）。
   ツール用にもう一度書くと、必ず片方が古くなります。なので出来上がった
   ガイドのHTMLから拾って、ツール用のデータに落とします。

   出力は tool-materials.js。URLは丸ごと持たずに検索語だけ持ちます。
   もしも経由の楽天URLは長いので、全型紙分を抱えるとページが重くなるためです。
   URLの組み立ては app.js 側で行います（組み立て方は material-links.js と同じ）。

   実行：node scripts/gen-tool-materials.js */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");

/* 型紙のキー一覧 */
const PATTERNS = (() => {
  const box = { window: {}, console };
  vm.createContext(box);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "patterns.js"), "utf8") +
    ";globalThis.__P=PATTERNS;", box);
  return box.__P;
})();

/* 材料の枠（道具の枠ではない）から、表示名と検索語を取り出す */
function materialsOf(file, kind) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return null;
  const h = fs.readFileSync(p, "utf8");
  const head = kind === "ja" ? "材料をネットで探す" : "Find materials online";
  const box = h.match(new RegExp(
    '<p class="material-box-head">' + head + '</p>([\\s\\S]*?)</div>'));
  if (!box) return null;

  const out = [];
  if (kind === "ja") {
    // 楽天のリンクから、二重エンコードされた検索語を戻す
    for (const m of box[1].matchAll(/<a class="ml-btn[^"]*" href="([^"]+)"[^>]*>楽天 — ([^<]+)<\/a>/g)) {
      const u = m[1].match(/[?&]url=([^"&]+)/);
      if (!u) continue;
      try {
        const inner = decodeURIComponent(u[1]);
        const k = inner.match(/\/search\/mall\/([^/]+)\//);
        if (k) out.push([m[2], decodeURIComponent(k[1])]);
      } catch (e) { /* 壊れたURLは飛ばす */ }
    }
  } else {
    for (const m of box[1].matchAll(/<a class="ml-btn[^"]*" href="https:\/\/www\.amazon\.com\/s\?k=([^&"]+)[^"]*"[^>]*>Amazon — ([^<]+)<\/a>/g)) {
      out.push([m[2].replace(/&amp;/g, "&"), decodeURIComponent(m[1])]);
    }
  }
  return out.length ? out : null;
}

const ja = {}, en = {};
let missJa = 0, missEn = 0;
for (const key of Object.keys(PATTERNS)) {
  const a = materialsOf(`howto-${key}.html`, "ja");
  const b = materialsOf(`en/howto-${key}.html`, "en");
  if (a) ja[key] = a; else missJa++;
  if (b) en[key] = b; else missEn++;
}

const body =
`/* 自動生成：node scripts/gen-tool-materials.js
   型紙ツールで印刷したあとに出す材料リンクの元データ。手で直さないでください。
   直すときは作り方ガイド側（scripts/material-links.js / material-links-en.js）を
   直してからガイドを生成し直し、このスクリプトを流します。
   [表示名, 検索語] の並びです。URLは app.js が組み立てます。 */
const TOOL_MATERIALS = ${JSON.stringify(ja)};
const TOOL_MATERIALS_EN = ${JSON.stringify(en)};
`;
fs.writeFileSync(path.join(ROOT, "tool-materials.js"), body);
const kb = (Buffer.byteLength(body) / 1024).toFixed(1);
console.log(`tool materials: 和文 ${Object.keys(ja).length}型紙 / 英文 ${Object.keys(en).length}型紙` +
  ` (${kb}KB, 取れなかった 和${missJa}・英${missEn})`);
