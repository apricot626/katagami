#!/usr/bin/env node
/* ============================================================
   季節・イベント特集ページを生成します（日本語 season.html / 英語 en/season.html）。

   データは scripts/seasons-data.js（日英共通）。型紙名は日本語＝patterns.js、
   英語＝i18n.js の NAME から取り、両ページを同じデータで組み立てます。
   Run: node scripts/gen-seasons.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const { loadPatterns } = require("./hero-from-pattern.js");
const SEASONS = require("./seasons-data.js");

const ROOT = path.join(__dirname, "..");
const P = loadPatterns();

/* 英語名（i18n.js の NAME={...} を読み取る） */
function loadEnNames() {
  const src = fs.readFileSync(path.join(ROOT, "i18n.js"), "utf8");
  const start = src.indexOf("var NAME={");
  if (start < 0) throw new Error("i18n.js: NAME block not found");
  // 対応する閉じ } を素朴に探す
  let depth = 0, i = src.indexOf("{", start), end = -1;
  for (; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") { depth--; if (depth === 0) { end = i; break; } }
  }
  const block = src.slice(start, end + 1);
  const map = {};
  const re = /"?([A-Za-z0-9_]+)"?\s*:\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(block))) map[m[1]] = m[2];
  return map;
}
const EN = loadEnNames();

function jaName(key) {
  if (!P[key]) throw new Error(`patterns.js に型紙キーがありません: ${key}`);
  return P[key].name;
}
function enName(key) {
  if (!EN[key]) throw new Error(`i18n.js に英語名がありません: ${key}`);
  return EN[key];
}

const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const MON_EN = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthLabel(months, lang) {
  if (!months.length) return lang === "en" ? "Year-round" : "通年";
  if (lang === "en") {
    return months.length === 1 ? MON_EN[months[0]]
      : `${MON_EN[months[0]]}–${MON_EN[months[months.length - 1]]}`;
  }
  return months.length === 1 ? `${months[0]}月`
    : `${months[0]}–${months[months.length - 1]}月`;
}

/* イベント1件のHTML */
function eventHtml(ev, lang) {
  const name = lang === "en" ? ev.en : ev.ja;
  const note = lang === "en" ? ev.en_note : ev.ja_note;
  const chips = ev.keys.map(k => {
    const nm = esc(lang === "en" ? enName(k) : jaName(k));
    const href = lang === "en" ? `tool.html?p=${k}&lang=en` : `tool.html?p=${k}`;
    return `          <li><a href="${href}">${nm}</a></li>`;
  }).join("\n");
  return `      <div class="season-event" id="ev-${ev.id}" data-months="${ev.months.join(",")}">
        <h3><span class="ev-emoji" aria-hidden="true">${ev.emoji}</span>${esc(name)}<span class="ev-mon">${monthLabel(ev.months, lang)}</span></h3>
        <p class="ev-note">${esc(note)}</p>
        <ul class="season-chips">
${chips}
        </ul>
      </div>`;
}

function sectionHtml(sec, lang) {
  const title = lang === "en" ? sec.en : sec.ja;
  const evs = sec.events.map(e => eventHtml(e, lang)).join("\n");
  return `    <section class="season-sec">
      <h2><span aria-hidden="true">${sec.emoji}</span> ${esc(title)}</h2>
${evs}
    </section>`;
}

const STYLE = `<style>
  .season-lead{font-size:1.02rem;line-height:1.7}
  .season-now{margin:18px 0 6px;padding:14px 16px;border:1px solid #E3DFD3;border-radius:12px;background:#FBF9F3}
  .season-now h2{margin:0 0 8px;font-size:1.05rem;border:0;padding:0}
  .season-sec{margin-top:34px}
  .season-sec>h2{border-bottom:2px solid #1B1D1A;padding-bottom:6px}
  .season-event{margin:20px 0 6px}
  .season-event h3{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin:0 0 4px;font-size:1.12rem}
  .ev-emoji{font-size:1.15em}
  .ev-mon{font-size:.8rem;font-weight:600;color:#6b5220;background:#F3EAD6;border-radius:999px;padding:2px 10px}
  .ev-note{margin:.2em 0 .6em;color:#4a4a42}
  .season-chips{list-style:none;display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0}
  .season-chips a{display:inline-block;padding:7px 13px;border:1px solid #D8D3C6;border-radius:999px;
    background:#fff;color:#1B1D1A;text-decoration:none;font-size:.94rem;line-height:1.2}
  .season-chips a:hover{border-color:#2E63B4;color:#2E63B4}
</style>`;

function page(lang) {
  const en = lang === "en";
  const cssHref = en ? "../howto.css" : "howto.css";
  const favBase = en ? "../" : "";
  const canonical = en ? "https://katagami.org/en/season.html" : "https://katagami.org/season.html";
  const title = en ? "Seasonal & event sewing patterns | Katagami" : "季節・イベントの型紙｜カタガミ";
  const desc = en
    ? "Free sewing patterns grouped by season and event — New Year, back-to-school, summer festival, Halloween, Christmas and more. Find what to make right now."
    : "お正月・入園入学・夏祭り・ハロウィン・クリスマスなど、季節や行事に合わせて作れる無料型紙をまとめました。今の時期に作りたいものが見つかります。";
  const lead = en
    ? "The patterns we already have, grouped by season and event — Japanese events, events around the world, and life events. Costume and decoration patterns will keep growing."
    : "季節や行事に合わせて、いまある型紙をイベントごとにまとめました。日本の行事・世界のイベント・ライフイベントの3つに分けています。仮装や飾りの型紙は順次増やしていきます。";
  const titleE = esc(title), descE = esc(desc), leadE = esc(lead);
  const crumbLabel = en ? "Breadcrumb" : "パンくずリスト";
  const crumbCur = en ? "Seasonal patterns" : "季節・イベントの型紙";
  const h1 = en ? "Seasonal & event sewing patterns" : "季節・イベントの型紙";
  const nowTitle = en ? "In season now" : "今月のおすすめ";
  const header = en
    ? `<header class="site-header">
  <a class="brand" href="index.html">Kata<b>gami</b></a>
  <div class="tag">Free sewing-pattern tool — print at actual size</div>
  <a class="lang-link" href="../season.html">日本語</a>
</header>`
    : `<header class="site-header">
  <a class="brand" href="index.html">カタ<b>ガミ</b></a>
  <div class="tag">サイズ自由自在の洋裁型紙 — A4に実寸印刷</div>
  <a class="lang-link" href="en/season.html">English</a>
</header>`;
  const footer = en
    ? `<footer class="site-footer">
  <span>© 2026 Katagami</span>
  <a href="index.html">Home</a>
  <a href="howto.html">All guides</a>
  <a href="tool.html">Pattern tool</a>
  <a href="about.html">About</a>
</footer>`
    : `<footer class="site-footer">
  <span>© 2026 カタガミ</span>
  <a href="index.html">トップ</a>
  <a href="howto.html">作り方一覧</a>
  <a href="tool.html">型紙ツール</a>
  <a href="about.html">運営者情報</a>
</footer>`;
  const sections = SEASONS.map(s => sectionHtml(s, lang)).join("\n");

  return `<!DOCTYPE html>
<html lang="${en ? "en" : "ja"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3HFK3VE3Q8"></script>
<script>
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  gtag("js",new Date());
  gtag("config","G-3HFK3VE3Q8");
</script>
<title>${titleE}</title>
<meta name="description" content="${descE}">
<meta name="robots" content="index,follow">
<link rel="icon" href="${favBase}favicon.svg" type="image/svg+xml">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="ja" href="https://katagami.org/season.html">
<link rel="alternate" hreflang="en" href="https://katagami.org/en/season.html">
<link rel="alternate" hreflang="x-default" href="https://katagami.org/season.html">
<meta property="og:type" content="website">
<meta property="og:title" content="${titleE}">
<meta property="og:description" content="${descE}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="https://katagami.org/ogp/tee.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${titleE}">
<meta name="twitter:description" content="${descE}">
<meta name="twitter:image" content="https://katagami.org/ogp/tee.png">
<link rel="stylesheet" href="${cssHref}">
${STYLE}
</head>
<body>
${header}

<main>
  <article class="guide">
    <nav class="crumb" aria-label="${crumbLabel}"><a href="index.html">${en ? "Katagami" : "カタガミ"}</a><span class="sep" aria-hidden="true">›</span><span class="cur">${crumbCur}</span></nav>
    <h1>${h1}</h1>
    <p class="lead season-lead">${leadE}</p>

    <div class="season-now" id="seasonNow" hidden>
      <h2>${nowTitle}</h2>
      <ul class="season-chips" id="seasonNowChips"></ul>
    </div>

${sections}
  </article>
</main>

${footer}

<script>
/* 「今月のおすすめ」：今の月にあたるイベントを上に集める（JSなしでも全一覧は見える） */
(function(){
  var now=new Date().getMonth()+1;
  var out=document.getElementById('seasonNowChips');
  var box=document.getElementById('seasonNow');
  if(!out||!box) return;
  var hits=[];
  document.querySelectorAll('.season-event').forEach(function(ev){
    var m=(ev.getAttribute('data-months')||'').split(',').filter(Boolean).map(Number);
    if(m.indexOf(now)>=0){
      var h3=ev.querySelector('h3');
      hits.push({id:ev.id,label:h3?h3.textContent.replace(/\\s+/g,' ').trim():ev.id});
    }
  });
  if(!hits.length) return;
  hits.forEach(function(h){
    var li=document.createElement('li'), a=document.createElement('a');
    a.href='#'+h.id; a.textContent=h.label;
    li.appendChild(a); out.appendChild(li);
  });
  box.hidden=false;
})();
</script>
</body>
</html>
`;
}

fs.writeFileSync(path.join(ROOT, "season.html"), page("ja"));
fs.writeFileSync(path.join(ROOT, "en", "season.html"), page("en"));

const nPat = SEASONS.reduce((a, s) => a + s.events.reduce((b, e) => b + e.keys.length, 0), 0);
const nEv = SEASONS.reduce((a, s) => a + s.events.length, 0);
console.log(`季節特集を生成：${SEASONS.length}セクション / ${nEv}イベント / のべ${nPat}型紙リンク（season.html・en/season.html）`);
