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

/* ---- schematic SVG diagrams for the technique guides ----
   Geometric, with bilingual labels chosen by lang. Wrapped in <figure class="fig">. */
const FIG_WRAP = (svg, cap) => `\n    <figure class="fig">\n${svg}\n      <figcaption>${cap}</figcaption>\n    </figure>`;
const FIGS = {
  seamlines: (l) => FIG_WRAP(
`      <svg viewBox="0 0 360 200" role="img" aria-label="${l === "ja" ? "出来上がり線と裁ち切り線" : "seam line and cutting line"}">
        <rect x="40" y="30" width="280" height="140" fill="none" stroke="#C24033" stroke-width="2.5"/>
        <rect x="62" y="52" width="236" height="96" fill="rgba(46,99,180,.06)" stroke="#2E63B4" stroke-width="2" stroke-dasharray="7 5"/>
        <line x1="40" y1="186" x2="62" y2="186" stroke="#1B1D1A" stroke-width="1"/>
        <line x1="40" y1="182" x2="40" y2="190" stroke="#1B1D1A" stroke-width="1"/>
        <line x1="62" y1="182" x2="62" y2="190" stroke="#1B1D1A" stroke-width="1"/>
        <text x="172" y="44" text-anchor="middle" font-size="12" fill="#C24033" font-family="sans-serif">${l === "ja" ? "裁ち切り線" : "cutting line"}</text>
        <text x="180" y="104" text-anchor="middle" font-size="12" fill="#2E63B4" font-family="sans-serif">${l === "ja" ? "出来上がり線" : "seam line"}</text>
        <text x="51" y="198" text-anchor="middle" font-size="10" fill="#1B1D1A" font-family="sans-serif">${l === "ja" ? "縫い代" : "S.A."}</text>
      </svg>`,
    l === "ja" ? "外＝裁ち切り線（布を切る）／内＝出来上がり線（縫う）。間が縫い代。" : "Outer = cutting line (cut the fabric); inner = seam line (sew). The gap is the seam allowance."),

  calibration: (l) => FIG_WRAP(
`      <svg viewBox="0 0 360 170" role="img" aria-label="${l === "ja" ? "校正枠とものさし" : "calibration box and ruler"}">
        <rect x="40" y="24" width="100" height="100" fill="none" stroke="#C24033" stroke-width="2"/>
        <text x="90" y="78" text-anchor="middle" font-size="14" fill="#C24033" font-family="sans-serif" font-weight="700">50&#8201;mm</text>
        <text x="90" y="96" text-anchor="middle" font-size="9" fill="#6b6b60" font-family="sans-serif">${l === "ja" ? "定規で確認" : "check with a ruler"}</text>
        <line x1="200" y1="60" x2="330" y2="60" stroke="#1B1D1A" stroke-width="1.5"/>
        ${[0, 1, 2, 3, 4, 5].map(i => `<line x1="${200 + i * 26}" y1="60" x2="${200 + i * 26}" y2="${i % 5 === 0 ? 48 : 53}" stroke="#1B1D1A" stroke-width="1"/>`).join("")}
        <text x="200" y="44" text-anchor="middle" font-size="9" fill="#1B1D1A" font-family="monospace">0</text>
        <text x="330" y="44" text-anchor="middle" font-size="9" fill="#1B1D1A" font-family="monospace">100</text>
        <text x="265" y="86" text-anchor="middle" font-size="10" fill="#6b6b60" font-family="sans-serif">mm</text>
      </svg>`,
    l === "ja" ? "1枚目の50mm校正枠を定規で測り、ぴったり50mmなら成功。" : "Measure the 50 mm box on the first sheet — exactly 50 mm means success."),

  tileoverlap: (l) => FIG_WRAP(
`      <svg viewBox="0 0 360 180" role="img" aria-label="${l === "ja" ? "シートの重ね合わせ" : "overlapping sheets"}">
        <rect x="30" y="40" width="150" height="110" fill="#F5F4EE" stroke="#1B1D1A" stroke-width="1.5"/>
        <rect x="160" y="40" width="150" height="110" fill="rgba(46,99,180,.06)" stroke="#1B1D1A" stroke-width="1.5"/>
        <rect x="160" y="40" width="20" height="110" fill="rgba(194,64,51,.12)" stroke="none"/>
        ${[0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="${30 + i * 25}" y1="40" x2="${30 + i * 25}" y2="150" stroke="#E0DDCF" stroke-width="0.8"/>`).join("")}
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `<line x1="${160 + i * 15}" y1="40" x2="${160 + i * 15}" y2="150" stroke="#E0DDCF" stroke-width="0.8"/>`).join("")}
        <text x="100" y="34" text-anchor="middle" font-size="11" fill="#2E63B4" font-family="monospace">1A</text>
        <text x="245" y="34" text-anchor="middle" font-size="11" fill="#2E63B4" font-family="monospace">2A</text>
        <line x1="160" y1="162" x2="180" y2="162" stroke="#C24033" stroke-width="1.2"/>
        <text x="170" y="176" text-anchor="middle" font-size="10" fill="#C24033" font-family="sans-serif">${l === "ja" ? "重ね代 約10mm" : "overlap ~10 mm"}</text>
      </svg>`,
    l === "ja" ? "右のシートを左に重ね、方眼と線を合わせて約10mm重ねる。" : "Lay the right sheet over the left, aligning the grid, overlapping ~10 mm."),

  casing: (l) => FIG_WRAP(
`      <svg viewBox="0 0 360 180" role="img" aria-label="${l === "ja" ? "ゴム通しの断面" : "elastic casing cross-section"}">
        <path d="M40,60 L320,60 L320,150 L40,150" fill="none" stroke="#1B1D1A" stroke-width="2"/>
        <path d="M40,60 L320,60 L320,96 L40,96" fill="rgba(46,99,180,.06)" stroke="#1B1D1A" stroke-width="2"/>
        <line x1="40" y1="90" x2="320" y2="90" stroke="#C24033" stroke-width="1.5" stroke-dasharray="6 4"/>
        <ellipse cx="180" cy="78" rx="120" ry="7" fill="#E0A23C" opacity=".7"/>
        <text x="180" y="50" text-anchor="middle" font-size="11" fill="#1B1D1A" font-family="sans-serif">${l === "ja" ? "折り返してトンネルを作る" : "fold to make a channel"}</text>
        <text x="300" y="82" text-anchor="end" font-size="10" fill="#9a7b25" font-family="sans-serif">${l === "ja" ? "ゴム" : "elastic"}</text>
        <text x="300" y="105" text-anchor="end" font-size="10" fill="#C24033" font-family="sans-serif">${l === "ja" ? "縫い" : "stitch"}</text>
      </svg>`,
    l === "ja" ? "布端を折り返して縫い、できたトンネルにゴムを通す。" : "Fold the edge under and stitch; thread the elastic through the channel."),

  stitches: (l) => FIG_WRAP(
`      <svg viewBox="0 0 360 170" role="img" aria-label="${l === "ja" ? "直線縫いとジグザグ" : "straight vs zigzag stitch"}">
        <line x1="40" y1="50" x2="320" y2="50" stroke="#1B1D1A" stroke-width="2.5" stroke-dasharray="14 6"/>
        <line x1="176" y1="40" x2="188" y2="60" stroke="#C24033" stroke-width="2.5"/>
        <line x1="188" y1="40" x2="176" y2="60" stroke="#C24033" stroke-width="2.5"/>
        <text x="40" y="80" font-size="11" fill="#1B1D1A" font-family="sans-serif">${l === "ja" ? "直線縫い → 伸びると糸が切れる" : "Straight stitch → snaps when stretched"}</text>
        <polyline points="${Array.from({ length: 19 }, (_, i) => `${40 + i * 15},${i % 2 ? 120 : 134}`).join(" ")}" fill="none" stroke="#2E63B4" stroke-width="2.5"/>
        <text x="40" y="158" font-size="11" fill="#2E63B4" font-family="sans-serif">${l === "ja" ? "ジグザグ → よく伸びる" : "Zigzag → stretches well"}</text>
      </svg>`,
    l === "ja" ? "ニットには細かいジグザグ（または伸縮ステッチ）を使う。" : "For knits, use a narrow zigzag (or a stretch stitch)."),

  biaswrap: (l) => FIG_WRAP(
`      <svg viewBox="0 0 360 170" role="img" aria-label="${l === "ja" ? "バイアステープでくるむ断面" : "bias binding cross-section"}">
        <rect x="120" y="70" width="180" height="22" fill="rgba(46,99,180,.06)" stroke="#1B1D1A" stroke-width="2"/>
        <path d="M150,52 L120,52 Q104,52 104,68 L104,94 Q104,110 120,110 L150,110" fill="none" stroke="#C24033" stroke-width="2.5"/>
        <line x1="135" y1="58" x2="135" y2="104" stroke="#1B1D1A" stroke-width="1.2" stroke-dasharray="5 4"/>
        <text x="240" y="66" text-anchor="middle" font-size="11" fill="#1B1D1A" font-family="sans-serif">${l === "ja" ? "布端" : "fabric edge"}</text>
        <text x="92" y="40" text-anchor="middle" font-size="11" fill="#C24033" font-family="sans-serif">${l === "ja" ? "バイアステープ" : "bias tape"}</text>
        <text x="135" y="128" text-anchor="middle" font-size="10" fill="#1B1D1A" font-family="sans-serif">${l === "ja" ? "縫い" : "stitch"}</text>
      </svg>`,
    l === "ja" ? "布端をテープでくるみ、際を縫って始末する。" : "Wrap the fabric edge with the tape and stitch close to the edge.")
};

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
  const body = g.sections.map(s => `  <section id="${s.id}">\n    <h2>${s.h2}</h2>\n    ${s.html}${s.fig && FIGS[s.fig] ? FIGS[s.fig](c.lang) : ""}\n  </section>`).join("\n\n");
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
