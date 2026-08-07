/* ============================================================
   和文how-to生成器
   scripts/ja-howto-data.js の内容から howto-<key>.html を生成します。
   既存の手書きページと同じ構造・クラス・スキーマで出力するため、
   見た目と内部リンクの一貫性が保たれます。
   既存ページは上書きしません（data に載せたキーだけ生成）。
   Run: node scripts/gen-ja-howto.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { figFor } = require("./howto-figs.js");
const DATA = require("./ja-howto-data.js");

const ROOT = path.join(__dirname, "..");
const DATE = "2026-07-30";

const TAB = { human:"大人服", kids:"子供服", baby:"ベビー", small:"小物", bag:"バッグ", pet:"ペット", home:"ホーム", oshi:"推し活" };
const TOOLS = ["ミシン（または針と糸）","チャコペン・鉛筆","定規・はさみ","アイロン","まち針またはクリップ"];

const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const strip = s => String(s).replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
const strongName = s => { const m=String(s).match(/<strong>(.*?)<\/strong>/); return m?strip(m[1]):""; };
const ld = o => '<script type="application/ld+json">\n'+JSON.stringify(o,null,2).replace(/</g,"\\u003c")+'\n</script>';

/* 楽天アフィリエイト検索リンク（既存ページと同じ もしも経由の形式）。
   生地1本だけだと選びにくいので、材料リストから副資材も拾って並べます。 */
const { materialLinks } = require("./material-links.js");

/* 型紙の和名。ja-howto-data.js より前に手で書いたガイドはデータを持たないので、
   関連リンクの表示名はここから引きます。キーをそのまま出すと、和文ページに
   "blouse" のような英字が並んでしまいます。 */
const patBox = { window: {}, console };
vm.createContext(patBox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "patterns.js"), "utf8") +
  ";globalThis.__P=PATTERNS;", patBox);
const PAT_NAME = Object.fromEntries(Object.entries(patBox.__P).map(([k, v]) => [k, v.name]));

/* 英語版ガイドがあるキー（lang-link の向き先を決める） */
const EN_KEYS = new Set(
  fs.readdirSync(path.join(ROOT,"en")).filter(f=>/^howto-.+\.html$/.test(f)).map(f=>f.slice(6,-5))
);

function render(key, g, allKeys){
  const url = `https://katagami.org/howto-${key}.html`;
  const ogImg = `https://katagami.org/ogp/${key}.png`;
  const title = `${g.title}の作り方`;
  const langHref = EN_KEYS.has(key) ? `en/howto-${key}.html` : "en/howto.html";
  // hreflang は相互参照でないと Google に無視されるので、英語版があるときだけ出す
  const hreflang = EN_KEYS.has(key)
    ? `<link rel="alternate" hreflang="ja" href="${url}">\n` +
      `<link rel="alternate" hreflang="en" href="https://katagami.org/en/howto-${key}.html">\n` +
      `<link rel="alternate" hreflang="x-default" href="${url}">\n`
    : "";

  const patternSteps = [
    `<strong>ツールを開く</strong><br>\n        <a href="tool.html">型紙ツール</a>を開き、上部タブの「<b>${TAB[g.tab]}</b>」→「<b>${g.toolName}</b>」を選択します。`,
    `<strong>サイズを入力する</strong><br>\n        ${g.sizeStep}`,
    `<strong>縫い代を設定する</strong><br>\n        下部スライダーで縫い代幅を選びます（初心者は <b>1.0〜1.5 cm</b> がおすすめ）。`,
    `<strong>印刷する</strong><br>\n        「印刷する（A4・実寸）」ボタンを押し、印刷ダイアログで<b>倍率 100%・用紙に合わせるをオフ</b>にして印刷します。\n        1枚目の案内シートにある50mm校正枠を定規で確認してください。`
  ];

  const sewHtml = g.sew.map(b=>{
    const items = b.items.map(t=>`      <li>${t}</li>`).join("\n");
    const head = b.h ? `    <h3>${b.h}</h3>\n` : "";
    return `${head}    <ol class="steps">\n${items}\n    </ol>`;
  }).join("\n\n");
  const sewNote = g.sewNote ? `\n    <p class="note">✏️ ${g.sewNote}</p>\n` : "";

  /* ---- 構造化データ ---- */
  const steps=[];
  g.cut.forEach(s=>steps.push({ "@type":"HowToStep", name:strongName(s)||("手順"+(steps.length+1)), text:strip(s), url:url+"#cut" }));
  g.sew.forEach(b=>b.items.forEach(s=>steps.push({ "@type":"HowToStep", name:strongName(s)||strip(b.h||"")||("手順"+(steps.length+1)), text:strip(s), url:url+"#sew" })));
  steps.forEach((s,i)=>s.position=i+1);

  const articleLd = ld({
    "@context":"https://schema.org","@type":"Article",
    headline:title, description:g.desc, inLanguage:"ja", image:ogImg,
    author:{"@type":"Organization",name:"カタガミ",url:"https://katagami.org/"},
    publisher:{"@type":"Organization",name:"カタガミ",url:"https://katagami.org/"},
    datePublished:DATE, dateModified:DATE,
    mainEntityOfPage:{"@type":"WebPage","@id":url}
  });
  const howToLd = ld({
    "@context":"https://schema.org","@type":"HowTo",
    name:title, description:g.desc, inLanguage:"ja", image:ogImg,
    supply:g.materials.map(m=>({"@type":"HowToSupply",name:strip(m)})),
    tool:TOOLS.map(t=>({"@type":"HowToTool",name:t})),
    step:steps
  });
  const crumbLd = ld({
    "@context":"https://schema.org","@type":"BreadcrumbList",
    itemListElement:[
      {"@type":"ListItem",position:1,name:"カタガミ",item:"https://katagami.org/"},
      {"@type":"ListItem",position:2,name:"作り方ガイド",item:"https://katagami.org/howto.html"},
      {"@type":"ListItem",position:3,name:title,item:url}
    ]
  });

  /* 関連ガイド：data の related、無ければ同カテゴリーから補う */
  let rel = (g.related||[]).filter(k=>k!==key);
  if(rel.length<4){
    for(const k of allKeys){
      if(rel.length>=4) break;
      if(k!==key && DATA[k] && DATA[k].tab===g.tab && !rel.includes(k)) rel.push(k);
    }
  }
  rel = rel.slice(0,4);
  const relHtml = rel.map(k=>{
    const t = (DATA[k] && DATA[k].title) || PAT_NAME[k] || k;
    return `        <li><a href="howto-${k}.html">${esc(t)}</a></li>`;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon.png" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3HFK3VE3Q8"></script>
<script>
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  gtag("js",new Date());
  gtag("config","G-3HFK3VE3Q8");
</script>
<title>${esc(title)}｜カタガミ</title>
<meta name="description" content="${esc(g.desc)}">
<meta name="keywords" content="${esc(g.keywords)}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}｜カタガミ">
<meta property="og:description" content="${esc(g.desc)}">
<meta property="og:locale" content="ja_JP">
<link rel="stylesheet" href="howto.css">
<link rel="canonical" href="${url}">
${hreflang}<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}｜カタガミ">
<meta name="twitter:description" content="${esc(g.desc)}">
<meta name="twitter:image" content="${ogImg}">
${articleLd}
${howToLd}
${crumbLd}
</head>
<body>
<header class="site-header">
  <a class="brand" href="index.html">カタ<b>ガミ</b></a>
  <span class="tag">サイズ自由自在の洋裁型紙 — A4に実寸印刷</span>
  <a class="lang-link" href="${langHref}">English</a>
</header>

<article class="article">
  <div class="article-head">
    <nav class="crumb" aria-label="パンくずリスト"><a href="index.html">カタガミ</a><span class="sep" aria-hidden="true">›</span><a href="howto.html">作り方ガイド</a><span class="sep" aria-hidden="true">›</span><span class="cur">${esc(title)}</span></nav>
    <h1>${esc(title)}</h1>
    <p class="lead">
      ${g.lead}
    </p>
    <div class="toc">
      <p class="toc-h">目次</p>
      <ol>
        <li><a href="#materials">材料と道具</a></li>
        <li><a href="#pattern">型紙の作り方（カタガミで自動生成）</a></li>
        <li><a href="#cut">布の裁断</a></li>
        <li><a href="#sew">縫い方</a></li>
        <li><a href="#tips">コツと応用</a></li>
      </ol>
    </div>
  </div>

  <section id="materials">
    <h2>1. 材料と道具</h2>
    <h3>材料（${esc(g.matNote)}）</h3>
    <ul>
${g.materials.map(m=>`      <li>${m}</li>`).join("\n")}
    </ul>
    <h3>道具</h3>
    <ul>
${TOOLS.map(t=>`      <li>${t}</li>`).join("\n")}
    </ul>
    <div class="material-box">
      <p class="material-box-head">材料をネットで探す</p>
      <div class="material-links">
${materialLinks(g.materials, g.buy, g.buyLabel).map(l=>
`        <a class="ml-btn ml-btn-rakuten" href="${l.href}" target="_blank" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" attributionsrc>楽天 — ${esc(l.label)}</a>`).join("\n")}
      </div>
      <img src="//i.moshimo.com/af/i/impression?a_id=5652284&p_id=54&pc_id=54&pl_id=616" width="1" height="1" style="border:none;" alt="" loading="lazy">
      <p class="material-pr">※ 本ページはアフィリエイト広告（楽天アフィリエイト）を含みます。</p>
    </div>
  </section>

  <section id="pattern">
    <h2>2. 型紙の作り方（カタガミで自動生成）</h2>
    <p>
      カタガミの<a href="tool.html">型紙ツール</a>を使うと、仕上がりサイズを入力するだけで縫い代付きの型紙を自動計算してA4に分割印刷できます。
    </p>
    <ol class="steps">
${patternSteps.map(s=>`      <li>\n        ${s}\n      </li>`).join("\n")}
    </ol>
  </section>

  <section id="cut">
    <h2>3. 布の裁断</h2>
    <ol class="steps">
${g.cut.map(s=>`      <li>${s}</li>`).join("\n")}
    </ol>
  </section>

  <section id="sew">
    <h2>4. 縫い方</h2>

${sewHtml}
${sewNote}  </section>

  <section id="tips">
    <h2>5. コツと応用</h2>
    <ul>
${g.tips.map(t=>`      <li>\n        ${t}\n      </li>`).join("\n")}
    </ul>

    <div class="cta-box">
      <p>型紙はカタガミで無料生成できます。サイズを変えてすぐに試せます。</p>
      <a href="tool.html?p=${key}" class="cta-btn">型紙ツールを開く →</a>
    </div>
  </section>
  <nav class="related" aria-label="関連する作り方">
    <h2>関連する作り方</h2>
    <ul>
${relHtml}
    </ul>
  </nav>
</article>

<footer class="site-footer">
  <span>© 2026 カタガミ</span>
  <a href="howto.html">作り方一覧</a>
  <a href="tool.html">型紙ツール</a>
</footer>
<script src="terms.js"></script>
</body>
</html>
`;
}

const keys = Object.keys(DATA);
let n=0;
for(const key of keys){
  fs.writeFileSync(path.join(ROOT, `howto-${key}.html`), render(key, DATA[key], keys));
  n++;
}
console.log(`generated ${n} Japanese how-to pages`);
