/* ============================================================
   English how-to generator (Phase 2)
   Emits /en/howto-<key>.html from the GUIDES data below, using a
   shared template so head/schema/header/footer stay consistent.
   Run:  node scripts/gen-en-howto.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const { figFor } = require("./howto-figs.js");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "en");
const DATE = "2026-07-01";

/* tabs shown in the tool, used in the "generate the pattern" step */
const TAB = {
  human: "Adult clothes", kids: "Kids' clothes", baby: "Baby",
  small: "Accessories", bag: "Bags", pet: "Pets", home: "Home"
};

function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function stripTags(s){ return String(s).replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim(); }
function strongName(s){ const m=String(s).match(/<strong>(.*?)<\/strong>/i); return m?stripTags(m[1]):""; }
function ld(obj){ return '<script type="application/ld+json">\n'+JSON.stringify(obj,null,2).replace(/</g,"\\u003c")+'\n</script>'; }

function li(items){ return items.map(t=>`      <li>${t}</li>`).join("\n"); }
function steps(items){
  return `    <ol class="steps">\n` + items.map(t=>`      <li>${t}</li>`).join("\n") + `\n    </ol>`;
}

const TOOLS_EN = ["Sewing machine (or needle and thread)","Fabric marker or pencil","Ruler and scissors","Iron","Pins or clips"];
/* 英語ガイドのキーと表題はデータから導く。手書きのリストを置くと、
   ガイドを足すたびに更新し忘れて関連リンクが古いままになる。 */
const DATA = require("./en-howto-data.js");
const EN_KEYS = Object.keys(DATA);
const EN_TITLE = Object.fromEntries(EN_KEYS.map(k => [k, DATA[k].title]));

/* Google truncates the description in search results at roughly 160 characters,
   so cut it at the last sentence that still fits. If no sentence boundary is
   close enough, fall back to a word boundary. */
function clampDesc(text, max = 158) {
  const t = String(text).replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const head = t.slice(0, max + 1);
  const dot = head.lastIndexOf(". ");
  if (dot >= 90) return head.slice(0, dot + 1);
  const space = head.lastIndexOf(" ");
  return (space > 0 ? head.slice(0, space) : head.slice(0, max)).replace(/[,;:]$/, "") + "…";
}

function render(key, g){
  const url = `https://katagami.org/en/howto-${key}.html`;
  const jaUrl = `https://katagami.org/howto-${key}.html`;
  const tab = TAB[g.tab];
  const ogImg = `https://katagami.org/ogp/${key}.png`;
  const lc = g.title.toLowerCase();
  // plural/mass nouns take no article ("...make dog clothes", "...make pants")
  const makeTitle = /\b(pants|clothes|shorts|bloomers|warmers)\b/.test(lc)
    ? `How to make ${lc}`
    : `How to make ${/^[aeiou]/.test(lc) ? "an" : "a"} ${lc}`;  // "an apron", "a tote bag"
  // same rule reused for meta descriptions: "for pants" vs "for a tote bag"
  const forPhrase = /\b(pants|clothes|shorts|bloomers|warmers)\b/.test(lc)
    ? `for ${lc}`
    : `for ${/^[aeiou]/.test(lc) ? "an" : "a"} ${lc}`;
  // Google shows about 60 characters of the title. Long pattern names would push
  // the brand off the end, so drop the secondary phrase when the title gets long.
  const longTitle = `${g.title} — Free Sewing Pattern & How to Sew | Katagami`;
  // エスケープはテンプレート側の esc() が行うので、ここでは素のまま返す
  const pageTitle = longTitle.length <= 66 ? longTitle
    : `${g.title} — Free Sewing Pattern | Katagami`;
  const sewNote = g.sewNote ? `    <p class="note">✏️ ${g.sewNote}</p>\n` : "";
  const metaDesc = clampDesc(`Free printable sewing pattern ${forPhrase}, in your size. ${g.desc}`);
  const patternSteps = [
    `<strong>Open the tool</strong><br>Open the <a href="tool.html">pattern tool</a> and choose “<b>${tab}</b>” → “<b>${g.toolName}</b>” from the tabs at the top.`,
    `<strong>Enter the size</strong><br>${g.sizeStep}`,
    `<strong>Set the seam allowance</strong><br>Use the slider at the bottom (beginners: <b>1.0–1.5&nbsp;cm / about 3/8–5/8&nbsp;in</b>).`,
    `<strong>Print</strong><br>Press “<b>Print (actual size)</b>”, then in the print dialog set <b>Scale = 100%</b> and turn <b>“Fit to page” OFF</b>. Check the 50&nbsp;mm calibration box on the first guide sheet with a ruler.`
  ];
  const figJson = figFor(key, "en");
  const figHtml = figJson ? `    ${figJson}\n` : "";
  const sew = g.sew.map(block=>{
    return `    <h3>${block.h}</h3>\n` + steps(block.items);
  }).join("\n\n");

  // ---- structured data: HowTo + BreadcrumbList ----
  const stepObjs = [];
  g.cut.forEach(s=>stepObjs.push({ "@type":"HowToStep", name:strongName(s)||("Step "+(stepObjs.length+1)), text:stripTags(s), url:url+"#cut" }));
  g.sew.forEach(block=>block.items.forEach(s=>stepObjs.push({ "@type":"HowToStep", name:strongName(s)||stripTags(block.h), text:stripTags(s), url:url+"#sew" })));
  stepObjs.forEach((s,i)=>s.position=i+1);
  const howToLd = ld({
    "@context":"https://schema.org","@type":"HowTo",
    name:makeTitle, description:g.desc, inLanguage:"en",
    image:ogImg,
    supply:g.materials.map(m=>({ "@type":"HowToSupply", name:stripTags(m) })),
    tool:TOOLS_EN.map(t=>({ "@type":"HowToTool", name:t })),
    step:stepObjs
  });
  const crumbLd = ld({
    "@context":"https://schema.org","@type":"BreadcrumbList",
    itemListElement:[
      { "@type":"ListItem", position:1, name:"Katagami", item:"https://katagami.org/en/" },
      { "@type":"ListItem", position:2, name:"Sewing guides", item:"https://katagami.org/en/howto.html" },
      { "@type":"ListItem", position:3, name:makeTitle, item:url }
    ]
  });
  // visible breadcrumb (replaces the plain category label)
  const crumbHtml = `<nav class="crumb" aria-label="Breadcrumb"><a href="index.html">Katagami</a><span class="sep">›</span><a href="howto.html">Sewing guides</a><span class="sep">›</span><span class="cur">${esc(g.title)}</span></nav>`;
  // related guides: other English guides
  // 明示指定があればそれを、なければ同じカテゴリのガイドを、それでも足りなければ他から補う
  const sameTab = EN_KEYS.filter(k => k !== key && DATA[k].tab === g.tab);
  const others  = EN_KEYS.filter(k => k !== key && DATA[k].tab !== g.tab);
  const relKeys = [...(g.related || []).filter(k => DATA[k] && k !== key), ...sameTab, ...others]
    .filter((k, i, a) => a.indexOf(k) === i).slice(0, 4);
  const relItems = relKeys
    .map(k=>`        <li><a href="howto-${k}.html">${esc(EN_TITLE[k])}</a></li>`).join("\n");
  const relatedHtml = `  <nav class="related" aria-label="Related guides">\n    <h2>Related guides</h2>\n    <ul>\n${relItems}\n    </ul>\n  </nav>\n`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<link rel="icon" href="../favicon.png" type="image/png">
<link rel="apple-touch-icon" href="../apple-touch-icon.png">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3HFK3VE3Q8"></script>
<script>
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  gtag("js",new Date());
  gtag("config","G-3HFK3VE3Q8");
</script>
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(metaDesc)}">
<meta name="keywords" content="${esc(g.keywords)},free sewing pattern,PDF sewing pattern,printable pattern,print at home">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(g.title)} — Free Sewing Pattern & How to Sew | Katagami">
<meta property="og:description" content="${esc(metaDesc)}">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="ja_JP">
<link rel="stylesheet" href="../howto.css">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="ja" href="${jaUrl}">
<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="x-default" href="${jaUrl}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(g.title)} — Free Sewing Pattern & How to Sew | Katagami">
<meta name="twitter:description" content="${esc(metaDesc)}">
<meta name="twitter:image" content="${ogImg}">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${esc(makeTitle)}",
  "description": "${esc(g.desc)}",
  "inLanguage": "en",
  "image": "${ogImg}",
  "author": { "@type": "Organization", "name": "Katagami", "url": "https://katagami.org/" },
  "publisher": { "@type": "Organization", "name": "Katagami", "url": "https://katagami.org/" },
  "datePublished": "${DATE}",
  "dateModified": "${DATE}",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "${url}" }
}
</script>
${howToLd}
${crumbLd}
</head>
<body>
<header class="site-header">
  <a class="brand" href="index.html">Kata<b>gami</b></a>
  <span class="tag">Free sewing-pattern tool — print at actual size</span>
  <a class="lang-link" href="../howto-${key}.html">日本語</a>
</header>

<article class="article">
  <div class="article-head">
    ${crumbHtml}
    <h1>${esc(makeTitle)}</h1>
    <p class="lead">
      ${g.lead}
    </p>
    <div class="toc">
      <p class="toc-h">Contents</p>
      <ol>
        <li><a href="#materials">Materials &amp; tools</a></li>
        <li><a href="#pattern">Make the pattern (auto-generated in Katagami)</a></li>
        <li><a href="#cut">Cutting the fabric</a></li>
        <li><a href="#sew">Sewing</a></li>
        <li><a href="#tips">Tips &amp; variations</a></li>
      </ol>
    </div>
  </div>

  <section id="materials">
    <h2>1. Materials &amp; tools</h2>
    <h3>Materials (${g.matNote})</h3>
    <ul>
${li(g.materials)}
    </ul>
    <h3>Tools</h3>
    <ul>
      <li>Sewing machine (or needle and thread)</li>
      <li>Fabric marker or pencil</li>
      <li>Ruler and scissors</li>
      <li>Iron</li>
      <li>Pins or clips</li>
    </ul>
  </section>

  <section id="pattern">
    <h2>2. Make the pattern (auto-generated in Katagami)</h2>
    <p>
      With the Katagami <a href="tool.html">pattern tool</a>, you just enter the finished size and it drafts a seam-allowance-included pattern, tiled to print at actual size on Letter or A4.
    </p>
${steps(patternSteps)}
  </section>

  <section id="cut">
    <h2>3. Cutting the fabric</h2>
${steps(g.cut)}
  </section>

  <section id="sew">
    <h2>4. Sewing</h2>

${sew}
${sewNote}${figHtml}  </section>

  <section id="tips">
    <h2>5. Tips &amp; variations</h2>
    <ul>
${li(g.tips)}
    </ul>

    <div class="cta-box">
      <p>Generate the pattern for free in Katagami and print it at actual size. Change the size and try again in seconds.</p>
      <a href="tool.html?p=${key}" class="cta-btn">Open the pattern tool →</a>
    </div>
  </section>

${relatedHtml}</article>

<footer class="site-footer">
  <span>© 2026 Katagami</span>
  <a href="howto.html">All guides</a>
  <a href="tool.html">Pattern tool</a>
</footer>
</body>
</html>
`;
}

/* ---- guide content ---- */
const GUIDES = DATA;

let count = 0;
for (const key of Object.keys(GUIDES)) {
  const html = render(key, GUIDES[key]);
  fs.writeFileSync(path.join(OUT, `howto-${key}.html`), html);
  count++;
}
console.log(`generated ${count} English how-to pages into en/`);
