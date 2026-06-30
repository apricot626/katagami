/* ============================================================
   お役立ちガイド（ロングテール記事）の生成。
   scripts/guides-data.js から guide-*.html を出力。
   Article + FAQPage + BreadcrumbList の構造化データ付き。
   Run: node scripts/gen-guides.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const DATE = "2026-06-30";
const BASE = "https://katagami.org/";
const GUIDES = require("./guides-data.js");

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const strip = s => String(s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const ld = obj => '<script type="application/ld+json">\n' + JSON.stringify(obj, null, 2).replace(/</g, "\\u003c") + '\n</script>';

function render(g) {
  const url = BASE + g.slug + ".html";
  const toc = g.sections.map(s => `        <li><a href="#${s.id}">${esc(strip(s.h2).replace(/^\d+\.\s*/, ""))}</a></li>`).join("\n");
  const body = g.sections.map(s => `  <section id="${s.id}">\n    <h2>${s.h2}</h2>\n    ${s.html}\n  </section>`).join("\n\n");
  const faqHtml = g.faq && g.faq.length
    ? `  <section id="faq">\n    <h2>よくある質問</h2>\n    <dl class="faq">\n` +
      g.faq.map(f => `      <dt>${esc(f.q)}</dt>\n      <dd>${esc(f.a)}</dd>`).join("\n") +
      `\n    </dl>\n  </section>\n` : "";
  const related = `  <nav class="related" aria-label="関連ガイド">\n    <h2>あわせて読みたい</h2>\n    <ul>\n` +
    g.related.map(r => `      <li><a href="${r.href}">${esc(r.label)}</a></li>`).join("\n") +
    `\n    </ul>\n  </nav>\n`;

  const articleLd = ld({
    "@context": "https://schema.org", "@type": "Article",
    headline: g.h1, description: g.desc, inLanguage: "ja",
    image: "https://katagami.org/ogp.png",
    author: { "@type": "Organization", name: "カタガミ", url: BASE },
    publisher: { "@type": "Organization", name: "カタガミ", url: BASE },
    datePublished: DATE, dateModified: DATE,
    mainEntityOfPage: { "@type": "WebPage", "@id": url }
  });
  const crumbLd = ld({
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "カタガミ", item: BASE },
      { "@type": "ListItem", position: 2, name: "お役立ちガイド", item: BASE + "index.html#guides" },
      { "@type": "ListItem", position: 3, name: g.h1, item: url }
    ]
  });
  const faqLd = g.faq && g.faq.length ? "\n" + ld({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: g.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  }) : "";

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
<title>${esc(g.title)}｜カタガミ</title>
<meta name="description" content="${esc(g.desc)}">
<meta name="keywords" content="${esc(g.keywords)}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(g.title)}｜カタガミ">
<meta property="og:description" content="${esc(g.desc)}">
<meta property="og:locale" content="ja_JP">
<link rel="stylesheet" href="howto.css">
<link rel="canonical" href="${url}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://katagami.org/ogp.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(g.title)}｜カタガミ">
<meta name="twitter:description" content="${esc(g.desc)}">
<meta name="twitter:image" content="https://katagami.org/ogp.png">
${articleLd}
${crumbLd}${faqLd}
</head>
<body>
<header class="site-header">
  <a class="brand" href="index.html">カタ<b>ガミ</b></a>
  <span class="tag">サイズ自由自在の洋裁型紙 — A4に実寸印刷</span>
  <a class="lang-link" href="en/">English</a>
</header>

<article class="article">
  <div class="article-head">
    <nav class="crumb" aria-label="パンくずリスト"><a href="index.html">カタガミ</a><span class="sep">›</span><a href="index.html#guides">お役立ちガイド</a><span class="sep">›</span><span class="cur">${esc(g.h1)}</span></nav>
    <h1>${esc(g.h1)}</h1>
    <p class="lead">
      ${g.lead}
    </p>
    <div class="toc">
      <p class="toc-h">目次</p>
      <ol>
${toc}
${g.faq && g.faq.length ? '        <li><a href="#faq">よくある質問</a></li>' : ""}
      </ol>
    </div>
  </div>

${body}

${faqHtml}
  <div class="cta-box">
    <p>型紙はカタガミで無料生成できます。好きなサイズで作って、実寸印刷できます。</p>
    <a href="tool.html" class="cta-btn">型紙ツールを開く →</a>
  </div>

${related}</article>

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

let n = 0;
for (const g of GUIDES) { fs.writeFileSync(path.join(ROOT, g.slug + ".html"), render(g)); n++; }
console.log("generated", n, "guide pages");
