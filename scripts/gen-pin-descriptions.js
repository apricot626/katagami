/* ============================================================
   Generate Pinterest pin copy (title/description/hashtags/URL)
   for all 61 patterns, JP and EN, as CSV for copy-paste.
   Sources: patterns.js (JP names), scripts/en-howto-data.js
   (EN title/desc/tab), and each howto-<key>.html <meta description>
   for a unique JP hook.
   Run: node scripts/gen-pin-descriptions.js
   Output: pins/descriptions_ja.csv, pins/descriptions_en.csv
   ============================================================ */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

// JP names + key list
let src = fs.readFileSync(path.join(ROOT, "patterns.js"), "utf8")
  .replace(/\bconst PATTERNS=/, "globalThis.PATTERNS=").replace(/window\./g, "globalThis._w_");
(0, eval)(src);
const P = globalThis.PATTERNS;
const EN = require("./en-howto-data.js");
const ENH = EN.EN_HOWTO || EN;

const BOARD = {
  human: { ja: "大人服の無料型紙", en: "Women's Clothes Patterns" },
  kids:  { ja: "子供服の型紙",     en: "Kids' Clothes Patterns" },
  baby:  { ja: "ベビーグッズの手作り型紙", en: "Baby Sewing Projects" },
  small: { ja: "巾着・ポーチ・小物", en: "Pouch & Small Sewing" },
  bag:   { ja: "バッグの無料型紙",   en: "Bag Sewing Patterns" },
  pet:   { ja: "犬服・猫服の型紙",   en: "Pet Clothes Patterns" },
  home:  { ja: "家のもの・インテリア", en: "Home & Interior Sewing" }
};
const TAG = {
  human: { ja: "#大人服ハンドメイド", en: "#dressmaking" },
  kids:  { ja: "#子供服ハンドメイド #入園入学準備", en: "#kidsclothes" },
  baby:  { ja: "#ベビー用品手作り #出産準備", en: "#babysewing" },
  small: { ja: "#ハンドメイド小物", en: "#pouch" },
  bag:   { ja: "#バッグの作り方 #レッスンバッグ", en: "#bagpattern" },
  pet:   { ja: "#犬服ハンドメイド #ペット服", en: "#petclothes #dogclothes" },
  home:  { ja: "#ハンドメイドインテリア", en: "#homedecorsewing" }
};
const HASH_JA = "#ハンドメイド #型紙 #ソーイング #無料型紙";
const HASH_EN = "#sewingpattern #freepattern #sewing #diysewing";

function metaDesc(key) {
  try {
    const h = fs.readFileSync(path.join(ROOT, `howto-${key}.html`), "utf8");
    const m = h.match(/<meta name="description" content="([^"]*)"/);
    if (m) return m[1]
      .replace(/カタガミで型紙を(?:無料で)?(?:実寸印刷|生成)できます。?/g, "")
      .replace(/カタガミの型紙ツールで.*?。/g, "")
      .trim();
  } catch (e) {}
  return "";
}
function csv(v) { return '"' + String(v).replace(/"/g, '""') + '"'; }

const rowsJa = [], rowsEn = [];
for (const key of Object.keys(P)) {
  const g = ENH[key]; if (!g) continue;
  const tab = g.tab;
  const jaName = P[key].name;
  const enTitle = g.title;
  // JP
  const jaHook = metaDesc(key);
  const jaTitle = `${jaName}の無料型紙｜サイズ自由・A4に実寸印刷`;
  const jaDesc = `${jaHook} 作りたいサイズの数値を入れるだけで、縫い代こみの型紙を無料でA4に実寸印刷できます。ダウンロード不要・ブラウザだけで完結、作り方ガイド付き。 ${HASH_JA} ${TAG[tab].ja}`.replace(/\s+/g, " ").trim();
  rowsJa.push([BOARD[tab].ja, `pins/${key}.png`, jaTitle, jaDesc, `https://katagami.org/howto-${key}.html`]);
  // EN
  const enHook = (g.lead || g.desc || "").replace(/\s+/g, " ").trim();
  const enTitleLine = `${enTitle} — Free PDF Sewing Pattern (Print at Home)`;
  const enDesc = `${enHook} Enter your size and print the seam-allowance-included pattern at home on A4 or Letter — free, no download, with a step-by-step guide. ${HASH_EN} ${TAG[tab].en}`.replace(/\s+/g, " ").trim();
  rowsEn.push([BOARD[tab].en, `pins/en/${key}.png`, enTitleLine, enDesc, `https://katagami.org/en/howto-${key}.html`]);
}

function write(file, header, rows) {
  const body = [header, ...rows].map(r => r.map(csv).join(",")).join("\r\n");
  fs.writeFileSync(path.join(ROOT, file), "﻿" + body + "\r\n");
}
const H_JA = ["ボード", "画像ファイル", "タイトル", "説明文", "リンク先URL"];
const H_EN = ["Board", "Image file", "Title", "Description", "Destination URL"];
write("pins/descriptions_ja.csv", H_JA, rowsJa);
write("pins/descriptions_en.csv", H_EN, rowsEn);
console.log(`wrote pins/descriptions_ja.csv (${rowsJa.length}) & pins/descriptions_en.csv (${rowsEn.length})`);
