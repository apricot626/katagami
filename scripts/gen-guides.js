/* ============================================================
   お役立ちガイド（ロングテール記事）の生成。
   - 日本語: scripts/guides-data.js -> guide-*.html（ルート）
   - 英語:   scripts/guides-data-en.js -> en/guide-*.html
   Article + FAQPage + BreadcrumbList の構造化データ付き。
   Run: node scripts/gen-guides.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const DATE = "2026-06-30";
const BASE = "https://katagami.org/";

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const strip = s => String(s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const ld = obj => '<script type="application/ld+json">\n' + JSON.stringify(obj, null, 2).replace(/</g, "\\u003c") + '\n</script>';

const CFG = {
  ja: {
    lang: "ja", outDir: ROOT, asset: "", urlFor: s => BASE + s + ".html", altFor: s => BASE + "en/" + s + ".html",
    locale: "ja_JP", localeAlt: "en_US", titleSuffix: "｜カタガミ",
    brand: "カタ<b>ガミ</b>", brandTag: "サイズ自由自在の洋裁型紙 — A4に実寸印刷",
    langLabel: "English", langHref: s => "en/" + s + ".html",
    crumbHome: { name: "カタガミ", href: "index.html" },
    crumbMid: { name: "お役立ちガイド", href: "index.html#guides", item: BASE + "index.html#guides" },
    toc: "目次", faqH: "よくある質問", relH: "あわせて読みたい",
    ctaText: "型紙はカタガミで無料生成できます。好きなサイズで作って、実寸印刷できます。", ctaBtn: "型紙ツールを開く →",
    footHowto: { href: "howto.html", label: "作り方一覧" }, footTool: { href: "tool.html", label: "型紙ツール" },
    terms: true
  },
  en: {
    lang: "en", outDir: path.join(ROOT, "en"), asset: "../", urlFor: s => BASE + "en/" + s + ".html", altFor: s => BASE + s + ".html",
    locale: "en_US", localeAlt: "ja_JP", titleSuffix: " | Katagami",
    brand: "Kata<b>gami</b>", brandTag: "Free sewing-pattern tool — print at actual size",
    langLabel: "日本語", langHref: s => "../" + s + ".html",
    crumbHome: { name: "Katagami", href: "index.html" },
    crumbMid: null,
    toc: "Contents", faqH: "Frequently asked questions", relH: "Related guides",
    ctaText: "Draft a pattern in your own size and print it at actual size on Letter or A4.", ctaBtn: "Open the pattern tool →",
    footHowto: { href: "howto.html", label: "Sewing guides" }, footTool: { href: "tool.html", label: "Pattern tool" },
    terms: false
  }
};

function render(g, c) {
  const url = c.urlFor(g.slug), alt = c.altFor(g.slug);
  const A = c.asset;
  const toc = g.sections.map(s => `        <li><a href="#${s.id}">${esc(strip(s.h2).replace(/^\d+\.\s*/, ""))}</a></li>`).join("\n");
  const body = g.sections.map(s => `  <section id="${s.id}">\n    <h2>${s.h2}</h2>\n    ${s.html}\n  </section>`).join("\n\n");
  const faqHtml = g.faq && g.faq.length
    ? `  <section id="faq">\n    <h2>${c.faqH}</h2>\n    <dl class="faq">\n` +
      g.faq.map(f => `      <dt>${esc(f.q)}</dt>\n      <dd>${esc(f.a)}</dd>`).join("\n") + `\n    </dl>\n  </section>\n` : "";
  const related = `  <nav class="related" aria-label="${c.relH}">\n    <h2>${c.relH}</h2>\n    <ul>\n` +
    g.related.map(r => `      <li><a href="${r.href}">${esc(r.label)}</a></li>`).join("\n") + `\n    </ul>\n  </nav>\n`;

  const crumbItems = [{ "@type": "ListItem", position: 1, name: c.crumbHome.name, item: BASE + (c.lang === "en" ? "en/" : "") }];
  if (c.crumbMid) crumbItems.push({ "@type": "ListItem", position: 2, name: c.crumbMid.name, item: c.crumbMid.item });
  crumbItems.push({ "@type": "ListItem", position: crumbItems.length + 1, name: g.h1, item: url });

  const articleLd = ld({
    "@context": "https://schema.org", "@type": "Article", headline: g.h1, description: g.desc, inLanguage: c.lang,
    image: "https://katagami.org/ogp.png",
    author: { "@type": "Organization", name: "Katagami", url: BASE }, publisher: { "@type": "Organization", name: "Katagami", url: BASE },
    datePublished: DATE, dateModified: DATE, mainEntityOfPage: { "@type": "WebPage", "@id": url }
  });
  const crumbLd = ld({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbItems });
  const faqLd = g.faq && g.faq.length ? "\n" + ld({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: g.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  }) : "";

  const crumbHtml = `<nav class="crumb" aria-label="Breadcrumb"><a href="${c.crumbHome.href}">${esc(c.crumbHome.name)}</a>` +
    (c.crumbMid ? `<span class="sep">›</span><a href="${c.crumbMid.href}">${esc(c.crumbMid.name)}</a>` : "") +
    `<span class="sep">›</span><span class="cur">${esc(g.h1)}</span></nav>`;

  return `<!DOCTYPE html>
<html lang="${c.lang}">
<head>
<meta charset="UTF-8">
<link rel="icon" href="${A}favicon.svg" type="image/svg+xml">
<link rel="icon" href="${A}favicon.png" type="image/png">
<link rel="apple-touch-icon" href="${A}apple-touch-icon.png">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3HFK3VE3Q8"></script>
<script>
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  gtag("js",new Date());
  gtag("config","G-3HFK3VE3Q8");
</script>
<title>${esc(g.title)}${c.titleSuffix}</title>
<meta name="description" content="${esc(g.desc)}">
<meta name="keywords" content="${esc(g.keywords)}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(g.title)}${c.titleSuffix}">
<meta property="og:description" content="${esc(g.desc)}">
<meta property="og:locale" content="${c.locale}">
<meta property="og:locale:alternate" content="${c.localeAlt}">
<link rel="stylesheet" href="${A}howto.css">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="ja" href="${c.lang === "ja" ? url : alt}">
<link rel="alternate" hreflang="en" href="${c.lang === "en" ? url : alt}">
<link rel="alternate" hreflang="x-default" href="${c.lang === "ja" ? url : alt}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://katagami.org/ogp.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(g.title)}${c.titleSuffix}">
<meta name="twitter:description" content="${esc(g.desc)}">
<meta name="twitter:image" content="https://katagami.org/ogp.png">
${articleLd}
${crumbLd}${faqLd}
</head>
<body>
<header class="site-header">
  <a class="brand" href="index.html">${c.brand}</a>
  <span class="tag">${c.brandTag}</span>
  <a class="lang-link" href="${c.langHref(g.slug)}">${c.langLabel}</a>
</header>

<article class="article">
  <div class="article-head">
    ${crumbHtml}
    <h1>${esc(g.h1)}</h1>
    <p class="lead">
      ${g.lead}
    </p>
    <div class="toc">
      <p class="toc-h">${c.toc}</p>
      <ol>
${toc}
${g.faq && g.faq.length ? `        <li><a href="#faq">${c.faqH}</a></li>` : ""}
      </ol>
    </div>
  </div>

${body}

${faqHtml}
  <div class="cta-box">
    <p>${c.ctaText}</p>
    <a href="tool.html" class="cta-btn">${c.ctaBtn}</a>
  </div>

${related}</article>

<footer class="site-footer">
  <span>© 2026 Katagami</span>
  <a href="${c.footHowto.href}">${c.footHowto.label}</a>
  <a href="${c.footTool.href}">${c.footTool.label}</a>
</footer>
${c.terms ? '<script src="terms.js"></script>\n' : ""}</body>
</html>
`;
}

let n = 0;
for (const [g, file] of [
  ...require("./guides-data.js").map(g => [g, CFG.ja]),
  ...require("./guides-data-en.js").map(g => [g, CFG.en])
]) { fs.writeFileSync(path.join(file.outDir, g.slug + ".html"), render(g, file)); n++; }
console.log("generated", n, "guide pages (ja + en)");
