/* ============================================================
   工程の図解ページを生成し、作り方ガイドの枠からリンクを張ります。

     1. scripts/step-flow-data.js から step-<key>-<slug>.html（和文）と
        en/step-<key>-<slug>.html（英文）を書き出す
     2. howto-<key>.html の該当する枠（<li>）に「図解で見る」リンクを差し込む
        （英語ガイドは match.en があるときだけ）
     3. sitemap.xml に無いページを足す

   何度実行しても同じ結果になります（べき等）。gen-ja-howto.js で
   ガイドを作り直すとリンクが消えるので、そのあとに必ず流してください。
   Run: node scripts/gen-step-flows.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const DATA = require("./step-flow-data.js");
const JA = require("./ja-howto-data.js");
const EN = require("./en-howto-data.js");

const ROOT = path.join(__dirname, "..");
const SITE = "https://katagami.org";
const DATE = "2026-09-26";
const GA = `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3HFK3VE3Q8"></script>
<script>
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  gtag("js",new Date());
  gtag("config","G-3HFK3VE3Q8");
</script>`;

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ld = o => '<script type="application/ld+json">\n' + JSON.stringify(o, null, 2).replace(/</g, "\\u003c") + "\n</script>";
const fileOf = (key, slug) => `step-${key}-${slug}.html`;
const NUM = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];

const L = {
  ja: {
    brand: "カタ<b>ガミ</b>", site: "カタガミ", tag: "サイズ自由自在の洋裁型紙 — A4に実寸印刷",
    other: "English", guides: "作り方ガイド", crumbLabel: "パンくずリスト",
    howto: t => `${t}の作り方`, pageTitle: (s, t) => `${s}（図解）｜${t}の作り方｜カタガミ`,
    desc: (t, s, steps) => {
      const head = `${t}の「${s}」を図解で。`;
      let body = steps.map((x, i) => NUM[i] + x).join(" ");
      const room = 86 - head.length - 1;
      if (body.length > room) body = body.slice(0, room - 1) + "…";
      return head + body;
    },
    cat: (t, sec, n) => `${t}の作り方 ${sec} の${NUM[n - 1]}`,
    nav: "手順", step: i => `手順${i}`, of: (i, n) => `${i} / ${n}`, prev: "‹ 前へ", next: "次へ ›",
    source: "ガイドの説明", nextFlow: "次の工程", back: t => `← ${t}の作り方に戻る`,
    toolCta: "型紙はカタガミで無料生成できます。", toolBtn: "型紙ツールを開く →",
    footer: ["© 2026 カタガミ", ["howto.html", "作り方一覧"], ["tool.html", "型紙ツール"], ["about.html", "運営者情報"], ["privacy.html", "プライバシーポリシー"]],
    link: "図解で見る", note: "※ ",
  },
  en: {
    brand: "Kata<b>gami</b>", site: "Katagami", tag: "Free sewing-pattern tool — print at actual size",
    other: "日本語", guides: "Sewing guides", crumbLabel: "Breadcrumb",
    howto: t => t, pageTitle: (s, t) => `${s}, step by step — ${t} | Katagami`,
    desc: (t, s, steps) => {
      const head = `${t}: ${s.toLowerCase()}, illustrated step by step. `;
      let body = steps.map((x, i) => `${i + 1}. ${x}.`).join(" ");
      const room = 165 - head.length;
      if (body.length > room) body = body.slice(0, room - 1) + "…";
      return head + body;
    },
    cat: (t, sec, n) => `${t} · step ${sec}`,
    nav: "Steps", step: i => `Step ${i}`, of: (i, n) => `${i} / ${n}`, prev: "‹ Back", next: "Next ›",
    source: "From the guide", nextFlow: "Next", back: t => `← Back to the ${t.toLowerCase()} guide`,
    toolCta: "Make the pattern in your size with Katagami — free.", toolBtn: "Open the pattern tool →",
    footer: ["© 2026 Katagami", ["howto.html", "All guides"], ["tool.html", "Pattern tool"], ["about.html", "About"], ["privacy.html", "Privacy Policy"]],
    link: "See it step by step", note: "",
  },
};

function render(key, flows, i, lang) {
  const f = flows[i], t = L[lang], up = lang === "en" ? "../" : "";
  const g = lang === "ja" ? JA[key] : EN[key];
  const gTitle = g.title;
  const file = fileOf(key, f.slug);
  const url = `${SITE}/${lang === "en" ? "en/" : ""}${file}`;
  const jaUrl = `${SITE}/${file}`, enUrl = `${SITE}/en/${file}`;
  const guideFile = `howto-${key}.html`;
  const anchor = f.anchor || "sew";
  const title = t.pageTitle(f.title[lang], gTitle);
  const heads = f.steps.map(s => s.h[lang]);
  const desc = t.desc(gTitle, f.title[lang], heads);
  const og = `${SITE}/ogp/${key}.png`;
  // ガイドの枠の文章（<strong> などのタグは外して見せる）
  const source = f.match && f.match[lang] &&
    f.match[lang].replace(/<br\s*\/?>/g, " ").replace(/<[^>]+>/g, "");
  const next = flows[i + 1];

  const nav = f.steps.map((s, j) =>
    `        <li><a class="flow-dot" href="#s${j + 1}" aria-label="${esc(t.step(j + 1) + ": " + s.h[lang])}">${j + 1}</a></li>`).join("\n");

  const panels = f.steps.map((s, j) => `    <section class="flow-step" id="s${j + 1}">
      <h2><span class="flow-no" aria-hidden="true">${j + 1}</span>${esc(s.h[lang])}</h2>
      <figure class="fig flow-fig">
      ${s.svg(lang)}
      </figure>
      <p>${esc(s.text[lang])}</p>${s.note ? `
      <p class="note">${t.note}${esc(s.note[lang])}</p>` : ""}
    </section>`).join("\n");

  const howToLd = {
    "@context": "https://schema.org", "@type": "HowTo",
    name: `${lang === "ja" ? gTitle + "の作り方：" : gTitle + ": "}${f.title[lang]}`,
    description: desc, inLanguage: lang, image: og,
    step: f.steps.map((s, j) => ({
      "@type": "HowToStep", position: j + 1, name: s.h[lang], text: s.text[lang], url: `${url}#s${j + 1}`,
    })),
  };
  const crumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      [t.site, `${SITE}/${lang === "en" ? "en/" : ""}`],
      [t.guides, `${SITE}/${lang === "en" ? "en/" : ""}howto.html`],
      [t.howto(gTitle), `${SITE}/${lang === "en" ? "en/" : ""}${guideFile}`],
      [f.title[lang], url],
    ].map(([name, item], j) => ({ "@type": "ListItem", position: j + 1, name, item })),
  };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<link rel="icon" href="${up}favicon.svg" type="image/svg+xml">
<link rel="icon" href="${up}favicon.png" type="image/png">
<link rel="apple-touch-icon" href="${up}apple-touch-icon.png">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${GA}
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:locale" content="${lang === "ja" ? "ja_JP" : "en_US"}">
<link rel="stylesheet" href="${up}howto.css">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="ja" href="${jaUrl}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="x-default" href="${jaUrl}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${og}">
${ld(howToLd)}
${ld(crumbLd)}
</head>
<body>
<header class="site-header">
  <a class="brand" href="index.html">${t.brand}</a>
  <span class="tag">${t.tag}</span>
  <a class="lang-link" href="${lang === "ja" ? "en/" : "../"}${file}">${t.other}</a>
</header>

<article class="article">
  <div class="article-head flow-head">
    <nav class="crumb" aria-label="${t.crumbLabel}"><a href="index.html">${t.site}</a><span class="sep" aria-hidden="true">›</span><a href="howto.html">${t.guides}</a><span class="sep" aria-hidden="true">›</span><a href="${guideFile}#${anchor}">${esc(t.howto(gTitle))}</a><span class="sep" aria-hidden="true">›</span><span class="cur">${esc(f.title[lang])}</span></nav>
    <p class="category">${esc(t.cat(gTitle, f.sec, f.n))}</p>
    <h1>${esc(f.title[lang])}</h1>${source ? `
    <p class="flow-source"><span>${t.source}</span>${esc(source)}</p>` : ""}
  </div>

  <div class="flow" data-flow data-prev="${esc(t.prev)}" data-next="${esc(t.next)}">
    <nav class="flow-nav" aria-label="${t.nav}">
      <ol>
${nav}
      </ol>
    </nav>
${panels}
  </div>

  <nav class="flow-foot" aria-label="${lang === "ja" ? "前後の工程" : "More steps"}">${next ? `
    <a class="flow-nextlink" href="${fileOf(key, next.slug)}"><span>${t.nextFlow}</span>${esc(next.title[lang])} ›</a>` : ""}
    <a class="flow-back" href="${guideFile}#${anchor}">${esc(t.back(gTitle))}</a>
  </nav>

  <div class="cta-box">
    <p>${t.toolCta}</p>
    <a href="tool.html?p=${key}" class="cta-btn">${t.toolBtn}</a>
  </div>
</article>

<footer class="site-footer">
  <span>${t.footer[0]}</span>
${t.footer.slice(1).map(([h, s]) => `  <a href="${h}">${s}</a>`).join("\n")}
</footer>
${lang === "ja" ? '<script src="terms.js"></script>\n' : ""}<script src="${up}step-flow.js"></script>
</body>
</html>
`;
}

/* ---------- ガイドの枠にリンクを差し込む ---------- */
const LINK_RE = /<a class="flow-link"[^>]*>[^<]*<\/a>/;
function inject(file, text, href, label) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) { console.warn("  skip (missing):", file); return false; }
  let h = fs.readFileSync(p, "utf8");
  const a = `<a class="flow-link" href="${href}">${label}</a>`;
  // 既に差し込み済み（べき等）か、素の枠か
  const re = new RegExp(`<li(?: class="has-flow")?>${text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:${LINK_RE.source})?</li>`);
  const m = h.match(re);
  if (!m) { console.warn(`  ${file}: 枠が見つかりません: ${text.slice(0, 30)}…`); return false; }
  h = h.replace(m[0], `<li class="has-flow">${text}${a}</li>`);
  fs.writeFileSync(p, h);
  return true;
}

let pages = 0, links = 0;
const made = [];
for (const [key, flows] of Object.entries(DATA)) {
  flows.forEach((f, i) => {
    for (const lang of ["ja", "en"]) {
      const rel = (lang === "en" ? "en/" : "") + fileOf(key, f.slug);
      fs.writeFileSync(path.join(ROOT, rel), render(key, flows, i, lang));
      made.push(rel);
      pages++;
      const text = f.match && f.match[lang];
      if (text && inject(rel.replace(fileOf(key, f.slug), `howto-${key}.html`), text, fileOf(key, f.slug), L[lang].link)) links++;
    }
  });
}

/* ---------- sitemap ---------- */
const smPath = path.join(ROOT, "sitemap.xml");
let sm = fs.readFileSync(smPath, "utf8");
let block = "";
for (const rel of made) {
  const u = `${SITE}/${rel}`;
  if (sm.includes(`<loc>${u}</loc>`)) continue;
  block += `  <url>\n    <loc>${u}</loc>\n    <lastmod>${DATE}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
}
if (block) {
  const at = sm.lastIndexOf("</urlset>");
  fs.writeFileSync(smPath, sm.slice(0, at) + block + sm.slice(at));
}
console.log(`図解ページ ${pages} 枚を書き出し、ガイドにリンク ${links} 本。sitemap に ${(block.match(/<url>/g) || []).length} 件追加。`);
