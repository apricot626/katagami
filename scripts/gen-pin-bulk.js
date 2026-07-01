/* ============================================================
   Generate Pinterest BULK CREATE CSVs (official column format)
   for all 61 patterns, JP and EN.
   Columns: Title,Media URL,Pinterest board,Thumbnail,Description,Link,Publish date,Keywords
   Media URL / Link point to the public katagami.org site.
   Run: node scripts/gen-pin-bulk.js
   Output: pins/pinterest_bulk_ja.csv, pins/pinterest_bulk_en.csv
   ============================================================ */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const BASE = "https://katagami.org";

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
const KW_CAT_JA = {
  human: ["大人服", "洋裁"], kids: ["子供服", "入園準備", "入学準備"],
  baby: ["ベビー", "出産準備"], small: ["布小物", "手作り小物"],
  bag: ["バッグ", "レッスンバッグ"], pet: ["犬服", "猫服", "ペット服"],
  home: ["インテリア", "布小物"]
};
const KW_UNIV_JA = ["型紙", "無料型紙", "ハンドメイド", "ソーイング", "A4実寸印刷"];
const KW_UNIV_EN = ["free sewing pattern", "PDF pattern", "print at home", "DIY sewing", "handmade"];

function metaDesc(key) {
  try {
    const h = fs.readFileSync(path.join(ROOT, `howto-${key}.html`), "utf8");
    const m = h.match(/<meta name="description" content="([^"]*)"/);
    if (m) return m[1].replace(/カタガミで型紙を(?:無料で)?(?:実寸印刷|生成)できます。?/g, "").trim();
  } catch (e) {}
  return "";
}
function dedupe(arr, cap) {
  const seen = new Set(), out = [];
  for (const x of arr) { const k = x.trim().toLowerCase(); if (x.trim() && !seen.has(k)) { seen.add(k); out.push(x.trim()); } if (out.length >= cap) break; }
  return out;
}
function csv(v) { return '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"'; }

const HEADER = ["Title", "Media URL", "Pinterest board", "Thumbnail", "Description", "Link", "Publish date", "Keywords"];
const ja = [], en = [];
for (const key of Object.keys(P)) {
  const g = ENH[key]; if (!g) continue;
  const tab = g.tab;
  const jaName = P[key].name;
  const jaClean = jaName.replace(/（.*?）/g, "").trim();
  const enTitle = g.title;

  // JP
  const jaHook = metaDesc(key);
  const jaTitle = `${jaName}の無料型紙｜サイズ自由・A4に実寸印刷`;
  const jaDesc = `${jaHook} 数値を入れるだけで、縫い代こみの型紙を無料でA4に実寸印刷できます。ダウンロード不要・ブラウザだけで完結、作り方ガイド付き。`.replace(/\s+/g, " ").trim();
  const jaKw = dedupe([jaClean, ...KW_CAT_JA[tab], ...KW_UNIV_JA], 10).join(", ");
  ja.push([jaTitle, `${BASE}/pins/${key}.png`, BOARD[tab].ja, "", jaDesc, `${BASE}/howto-${key}.html`, "", jaKw]);

  // EN
  const enHook = (g.lead || g.desc || "").replace(/\s+/g, " ").trim();
  const enTitleLine = `${enTitle} — Free PDF Sewing Pattern (Print at Home)`;
  const enDesc = `${enHook} Enter your size and print the seam-allowance-included pattern at home on A4 or Letter — free, no download, with a step-by-step guide.`.replace(/\s+/g, " ").trim();
  const enKw = dedupe([...(g.keywords || "").split(","), ...KW_UNIV_EN], 12).join(", ");
  en.push([enTitleLine, `${BASE}/pins/en/${key}.png`, BOARD[tab].en, "", enDesc, `${BASE}/en/howto-${key}.html`, "", enKw]);
}
function write(file, rows) {
  const head = HEADER.join(",");                       // plain header (matches Pinterest's sample)
  const body = rows.map(r => r.map(csv).join(",")).join("\r\n");
  fs.writeFileSync(path.join(ROOT, file), "﻿" + head + "\r\n" + body + "\r\n");
}
write("pins/pinterest_bulk_ja.csv", ja);
write("pins/pinterest_bulk_en.csv", en);
console.log(`wrote pins/pinterest_bulk_ja.csv (${ja.length}) & pins/pinterest_bulk_en.csv (${en.length})`);
