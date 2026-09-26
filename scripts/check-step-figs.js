#!/usr/bin/env node
/* 工程の図解（step-*.html の SVG）を点検し、全部の図を1枚の一覧画像にする。
   ローカルサーバー(localhost:8099)が要ります。

     python3 -m http.server 8099 &
     node scripts/check-step-figs.js            # 全部
     node scripts/check-step-figs.js poncho     # キーで絞る

   見ているのは、目で探すと往復が増える2つだけです。
     1. 文字が図の枠（viewBox）からはみ出していないか
     2. 文字どうしが重なっていないか
   和文・英文の両方を見ます（英語は文字が長く、はみ出しやすい）。
   一覧画像は /tmp/step-figs-<lang>.png。人はこれを1回見るだけで済みます。
   1件でも見つかれば終了コード1。 */

const fs = require("fs");
const path = require("path");
const DATA = require("./step-flow-data.js");

function findPW() {
  for (const p of [path.join(__dirname, "..", "node_modules", "playwright-core"),
                   "/opt/node22/lib/node_modules/playwright/node_modules/playwright-core"]) {
    try { return require(p); } catch (e) {}
  }
  throw new Error("playwright-core が見つかりません");
}
function findChrome() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  try {
    for (const d of fs.readdirSync(base)) {
      const p = path.join(base, d, "chrome-linux", "chrome");
      if (fs.existsSync(p)) return p;
    }
  } catch (e) {}
  return undefined;
}

const only = process.argv[2];
const keys = Object.keys(DATA).filter(k => !only || k === only);

(async () => {
  const pw = findPW();
  const browser = await pw.chromium.launch({ executablePath: findChrome() });
  // JS を切って開く。step-flow.js が手順を1つずつ隠すと、隠れた図は大きさ0で測れないため
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, javaScriptEnabled: false });
  const problems = [];

  for (const lang of ["ja", "en"]) {
    const svgs = [];
    for (const key of keys)
      for (const f of DATA[key]) {
        const file = `${lang === "en" ? "en/" : ""}step-${key}-${f.slug}.html`;
        await page.goto(`http://localhost:8099/${file}`);
        const found = await page.$$eval(".flow-fig svg", list => list.map((svg, i) => {
          const vb = svg.viewBox.baseVal;
          const boxes = [...svg.querySelectorAll("text")].map(t => {
            const b = t.getBBox();
            return { s: t.textContent, x: b.x, y: b.y, w: b.width, h: b.height };
          });
          const out = [];
          for (const b of boxes)
            if (b.x < -1 || b.y < -1 || b.x + b.w > vb.width + 1 || b.y + b.h > vb.height + 1)
              out.push(`手順${i + 1}: 枠からはみ出し「${b.s}」`);
          for (let a = 0; a < boxes.length; a++)
            for (let c = a + 1; c < boxes.length; c++) {
              const p = boxes[a], q = boxes[c];
              const ox = Math.min(p.x + p.w, q.x + q.w) - Math.max(p.x, q.x);
              const oy = Math.min(p.y + p.h, q.y + q.h) - Math.max(p.y, q.y);
              if (ox > 2 && oy > 2) out.push(`手順${i + 1}: 文字が重なっている「${p.s}」と「${q.s}」`);
            }
          return { html: svg.outerHTML, out };
        }));
        found.forEach(x => x.out.forEach(m => problems.push(`[${file}] ${m}`)));
        svgs.push(...found.map((x, i) => ({ html: x.html, label: `${f.slug} ${i + 1}` })));
      }
    await page.setContent(
      `<body style="margin:0;display:grid;grid-template-columns:repeat(3,360px);gap:6px;background:#F5F4EE;font:11px sans-serif">` +
      svgs.map(s => `<div style="border:1px solid #999">${s.label}<br>${s.html.replace("<svg", '<svg width="360"')}</div>`).join("") +
      `</body>`);
    const out = `/tmp/step-figs-${lang}.png`;
    await page.screenshot({ path: out, fullPage: true });
    console.log(`一覧画像: ${out}（${svgs.length} 枚）`);
  }
  await browser.close();

  if (problems.length) {
    console.log(`\n${problems.length} 件:`);
    problems.forEach(p => console.log("  " + p));
    process.exit(1);
  }
  console.log("文字のはみ出し・重なり：問題なし");
})();
