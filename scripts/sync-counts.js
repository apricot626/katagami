/* 本文中の「型紙◯種」「ガイド◯本」を、実際の数に合わせ直します。

   一覧やカードの件数は sync-ja-pages.js / sync-en-pages.js が直しますが、
   紹介文・meta description・構造化データに手で書いた数だけは、どこにも
   つながっていないので置いていかれます。実際、型紙が265種になっても
   トップの meta description は「190種類以上」のままでした。検索結果に
   出る文言なので、古いままだと目立ちます。

   置き換える場所はこの表に明記します。全文を正規表現でなでると、
   更新履歴（news-list）の「175種になりました」まで書き換えてしまい、
   過去の記録が壊れます。履歴はそのときの事実なので触りません。

   Run: node scripts/sync-counts.js
   古い数が残っていないかは scripts/audit.js の「件数表記」が見ます。 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");

/* ---- 実際の数を数える ---- */
const box = { window: {}, console };
vm.createContext(box);
vm.runInContext(fs.readFileSync(path.join(ROOT, "patterns.js"), "utf8") +
  ";globalThis.__P=PATTERNS;", box);
const PAT = Object.keys(box.__P).length;
/* 名前を変えた型紙の転送ページ（noindex）が残っているので、それは数えない。
   howto-tissuepouch.html は howto-tissuecase.html への転送で、ガイドではありません。 */
const guides = d => fs.readdirSync(path.join(ROOT, d))
  .filter(f => /^howto-.+\.html$/.test(f))
  .filter(f => !/content="noindex/.test(fs.readFileSync(path.join(ROOT, d, f), "utf8")))
  .length;
const JA = guides("."), EN = guides("en");

/* ---- 直す場所（file, 探す文字列を作る関数, 置き換える文字列） ----
   探す側も数を変数にしてあるので、次に数が変わっても同じ表で追随します。 */
const N = "(\\d+)";
const RULES = [
  ["index.html",     `${N}種類以上に対応`, () => `${PAT}種類に対応`],
  ["index.html",     `${N}種類以上から選択可能`, () => `${PAT}種類から選択可能`],
  ["howto.html",     `${N}種類すべての`,   () => `${PAT}種類すべての`],
  ["404.html",       `型紙${N}種の一覧`,   () => `型紙${PAT}種の一覧`],
  ["404.html",       `all ${N} patterns`,  () => `all ${EN} patterns`],
  ["en/index.html",  `the ${N} patterns`,  () => `the ${EN} patterns`],
  ["en/howto.html",  `the ${N} patterns`,  () => `the ${EN} patterns`],
  ["about.html",
   `型紙${N}種と、作り方ガイド${N}本（日本語${N}本・英語${N}本）`,
   () => `型紙${PAT}種と、作り方ガイド${JA + EN}本（日本語${JA}本・英語${EN}本）`],
  ["en/about.html",
   `There are ${N} patterns and ${N} how-to guides \\(${N} in Japanese, ${N} in English\\)`,
   () => `There are ${PAT} patterns and ${JA + EN} how-to guides (${JA} in Japanese, ${EN} in English)`],
];

let changed = 0, files = new Set();
for (const [file, pattern, build] of RULES) {
  const p = path.join(ROOT, file);
  const html = fs.readFileSync(p, "utf8");
  const next = html.replace(new RegExp(pattern, "g"), build());
  if (next === html) continue;
  fs.writeFileSync(p, next);
  changed++; files.add(file);
}

console.log(files.size
  ? `件数表記: ${changed}か所を更新（${[...files].join(", ")}）／型紙${PAT}種・和文${JA}本・英文${EN}本`
  : `件数表記: 変更なし（型紙${PAT}種・和文${JA}本・英文${EN}本）`);
