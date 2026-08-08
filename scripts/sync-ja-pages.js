#!/usr/bin/env node
/* 型紙やガイドを足したあとに、一覧ページを追随させる。

   - index.html / en/index.html の「型紙一覧」を PATTERNS の並び順どおりに書き直す
   - index.html の「作り方ガイド」一覧と howto.html のカードを、和文ガイドのデータから並べ直す

   一覧を手で足すと必ず取りこぼすので、毎回データから作り直しています。
   何度実行しても同じ結果になります（べき等）。 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "patterns.js"), "utf8") +
  ";globalThis.__P=PATTERNS;", sandbox);
const PATTERNS = sandbox.__P;

const i18nBox = { console, location: { search: "" }, URLSearchParams };
i18nBox.window = i18nBox;
vm.createContext(i18nBox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "i18n.js"), "utf8")
  .replace("})();", "globalThis.__R={NAME:NAME};})();"), i18nBox);
const EN_NAME = i18nBox.__R.NAME;

const JA = require("./ja-howto-data.js");
const GROUPS = require("../groups.js");

/* カテゴリの見出し。PATTERNS の mode と一覧の <h3> を対応させる。 */
const CATS = [
  { mode: "human", ja: "大人服", en: "Adult clothes" },
  { mode: "kids",  ja: "子供服", en: "Kids' clothes" },
  { mode: "baby",  ja: "ベビー", en: "Baby" },
  { mode: "small", ja: "小物",   en: "Accessories" },
  { mode: "bag",   ja: "バッグ", en: "Bags" },
  { mode: "pet",   ja: "ペット", en: "Pets" },
  { mode: "home",  ja: "ホーム", en: "Home" },
  { mode: "oshi",  ja: "推し活", en: "Fandom" },
];

/* 検索語を組み立てる。型紙名だけだと「ズボン」でパンツが出ないので、
   カテゴリ・副題に加えて、言い換えと作りの特徴語も入れておく。 */
const ALIAS = [
  [/パンツ|ズボン/, "パンツ ズボン ぱんつ"],
  [/バッグ|リュック|トート/, "バッグ かばん カバン ばっぐ"],
  [/帽子|ハット|キャップ|ベレー|キャスケット/, "帽子 ぼうし ハット キャップ"],
  [/ワンピース|ドレス/, "ワンピース ドレス"],
  [/Tシャツ|カットソー/, "Tシャツ ティーシャツ カットソー"],
  [/エプロン/, "エプロン 前掛け"],
  [/ポーチ|巾着/, "ポーチ 小物入れ きんちゃく 巾着"],
  [/犬|ドッグ/, "犬 いぬ ドッグ"],
  [/猫|キャット/, "猫 ねこ キャット"],
  [/ぬい|ドール/, "ぬい ぬいぐるみ 推し 推し活 ドール"],
  [/カバー|ケース/, "カバー ケース"],
  [/甚平|浴衣|作務衣|半纏/, "和装 じんべい ゆかた さむえ"],
  [/スタイ/, "スタイ よだれかけ"],
  [/スカート/, "スカート すかーと"],
  [/マスク/, "マスク ますく"],
  [/ふとん|布団|枕|寝袋/, "寝具 ふとん まくら"],
];
/* 作りの特徴。note から拾えるものだけ、白名簿で。 */
const FEATURES = ["ゴム", "ファスナー", "面ファスナー", "スナップ", "ボタン",
  "ギャザー", "まち", "フード", "ポケット", "裏地", "バイアス", "キルト芯", "ニット"];
function searchTerms(key, catJa, subJa) {
  const p = PATTERNS[key];
  const name = p.name;
  const out = new Set([name, catJa, subJa]);
  for (const [re, words] of ALIAS) if (re.test(name)) words.split(" ").forEach(w => out.add(w));
  for (const f of FEATURES) if ((p.note || "").includes(f)) out.add(f);
  return [...out].filter(Boolean).join(" ");
}

/* 見出し <h3>…</h3> の直後にある <ul class="…"> の中身を差し替える。 */
function replaceList(html, heading, cls, body, file) {
  const head = new RegExp(
    `<h3 class="cat-h">${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</h3>\\s*\\n\\s*<ul class="${cls}">`);
  const m = html.match(head);
  if (!m) { console.warn(`  ${file}: 「${heading}」の見出しが見つかりません`); return html; }
  const start = m.index + m[0].length;
  const end = html.indexOf("</ul>", start);
  return html.slice(0, start) + "\n" + body + "        " + html.slice(end);
}

/* ---------- 1. 型紙一覧 ---------- */
for (const [file, lang] of [["index.html", "ja"], ["en/index.html", "en"]]) {
  const p = path.join(ROOT, file);
  let html = fs.readFileSync(p, "utf8");
  let n = 0;
  for (const c of CATS) {
    const keys = Object.keys(PATTERNS).filter(k => PATTERNS[k].mode === c.mode);
    if (!keys.length) continue;
    /* 副題ごとに並べ直す。どのグループにも無いものは末尾の「その他」へ。 */
    const groups = (GROUPS[c.mode] || []).map(g => ({
      label: lang === "en" ? g.en : g.ja,
      keys: g.keys.filter(k => keys.includes(k)),
    })).filter(g => g.keys.length);
    const grouped = new Set(groups.flatMap(g => g.keys));
    const rest = keys.filter(k => !grouped.has(k));
    if (rest.length) groups.push({ label: lang === "en" ? "Others" : "その他", keys: rest });
    const body = groups.map(g => {
      const li = k => {
        const nm = lang === "en" ? (EN_NAME[k] || PATTERNS[k].name) : PATTERNS[k].name;
        const terms = lang === "en"
          ? [nm, c.en, g.label].filter(Boolean).join(" ")
          : searchTerms(k, c.ja, g.label);
        return `          <li data-s="${esc(terms)}"><a href="tool.html?p=${k}">${esc(nm)}</a></li>\n`;
      };
      return `          <li class="pat-sub" role="presentation">${esc(g.label)}</li>\n` +
        g.keys.map(li).join("");
    }).join("");
    html = replaceList(html, lang === "en" ? c.en : c.ja, "pat-list", body, file);
    n += keys.length;
  }
  fs.writeFileSync(p, html);
  console.log(`${file}: 型紙一覧 ${n} 件に更新`);
}

/* 和文ガイドの一覧は、データではなく実在するページから作る。
   ja-howto-data.js より前に手で書いたガイドが 60 本ほどあり、データだけを見ると
   それらが一覧から消えてしまいます。並び順と見出しは PATTERNS に合わせます。 */
const guideKeys = Object.keys(PATTERNS).filter(k => {
  const f = path.join(ROOT, `howto-${k}.html`);
  if (!fs.existsSync(f)) return false;
  return !/<meta http-equiv="refresh"/.test(fs.readFileSync(f, "utf8"));  // 転送用は載せない
});
const guidesOf = mode => guideKeys.filter(k => PATTERNS[k].mode === mode);

/* ---------- 2. index.html の作り方ガイド一覧 ---------- */
{
  const p = path.join(ROOT, "index.html");
  let html = fs.readFileSync(p, "utf8");
  let n = 0;
  for (const c of CATS) {
    const keys = guidesOf(c.mode);
    if (!keys.length) continue;
    const body = keys.map(k =>
      `          <li data-s="${esc([title(k), c.ja].join(" "))}"><a href="howto-${k}.html">${esc(title(k))}</a></li>\n`).join("");
    html = replaceList(html, c.ja, "howto-chips", body, "index.html");
    n += keys.length;
  }
  fs.writeFileSync(p, html);
  console.log(`index.html: 作り方ガイド一覧 ${n} 件に更新`);
}

/* ---------- 3. app.js の HOWTO ---------- */
/* ツール画面から作り方ガイドへ出すリンク。手で足していたため61件で止まっていて、
   ガイドがあるのにリンクが出ない型紙が129種ありました。実在するページから作ります。 */
{
  const p = path.join(ROOT, "app.js");
  const src = fs.readFileSync(p, "utf8");
  const body = guideKeys.map(k =>
    `  ${k}:{url:"howto-${k}.html", label:"📄 ${title(k)}の作り方を見る"},`).join("\n");
  const next = src.replace(/const HOWTO=\{\n[\s\S]*?\n\};/, `const HOWTO={\n${body}\n};`);
  if (next === src && !src.includes(body)) console.warn("  app.js: HOWTO の定義が見つかりません");
  else if (next !== src) {
    fs.writeFileSync(p, next);
    console.log(`app.js: HOWTO を ${guideKeys.length} 件に更新`);
  } else {
    console.log("app.js: HOWTO は変更なし");
  }
}

/* ---------- 4. howto.html のカード ---------- */
{
  const p = path.join(ROOT, "howto.html");
  let html = fs.readFileSync(p, "utf8");

  /* 既存カードの副題は手で書かれた良い文言なので拾って引き継ぐ */
  const existingSub = {};
  for (const m of html.matchAll(
    /<a class="howto-card" href="howto-([a-z]+)\.html">\s*<p class="card-title">[^<]*<\/p>\s*<p class="card-sub">([^<]*)<\/p>/g))
    existingSub[m[1]] = m[2];

  let n = 0;
  for (const c of CATS) {
    const keys = guidesOf(c.mode);
    if (!keys.length) continue;
    const cards = keys.map(k =>
      `      <a class="howto-card" href="howto-${k}.html">\n` +
      `        <p class="card-title">${esc(title(k))}</p>\n` +
      `        <p class="card-sub">${existingSub[k] || esc(cardSub(k))}</p>\n` +
      `        <p class="card-arrow">作り方を見る →</p>\n` +
      `      </a>\n`).join("");
    const head = new RegExp(`<h2>${c.ja}</h2>\\s*\\n\\s*<div class="howto-grid">`);
    const m = html.match(head);
    if (!m) { console.warn(`  howto.html: 「${c.ja}」の見出しが見つかりません`); continue; }
    const start = m.index + m[0].length;
    const end = html.indexOf("    </div>\n  </section>", start);
    html = html.slice(0, start) + "\n" + cards + html.slice(end);
    n += keys.length;
  }
  fs.writeFileSync(p, html);
  console.log(`howto.html: カード ${n} 枚に更新`);
}

/* ガイドの表題。データにあればそれを、なければ型紙の名前を使う。 */
function title(k) {
  return (JA[k] && JA[k].title) || PATTERNS[k].name;
}

/* カードの副題。リード文（なければ型紙の説明）の最初の文を短く切って使う。 */
function cardSub(k) {
  const src = (JA[k] && JA[k].lead) || PATTERNS[k].note || "";
  const first = String(src).split("。")[0];
  return first.length > 20 ? first.slice(0, 20) + "…" : first;
}
