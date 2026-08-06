#!/usr/bin/env node
/* スマホ幅での表示崩れを見る。ローカルサーバー(localhost:8099)が要ります。

     python3 -m http.server 8099 &
     node scripts/check-mobile.js

   見ているのは3つだけです。どれも「見れば分かるが、見ないと気づかない」種類のものです。

     1. 横スクロールが出ていないか（どこかがビューポートより広い）
     2. ボタンやリンクの文字が枠から切れていないか（省略記号なしで消える）
     3. JS エラーが出ていないか

   ページを足したら PAGES に追加してください。1件でも見つかれば終了コード1。 */

const path = require("path");

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
    for (const d of require("fs").readdirSync(base)) {
      const p = path.join(base, d, "chrome-linux", "chrome");
      if (require("fs").existsSync(p)) return p;
    }
  } catch (e) {}
  return undefined;
}

/* 320px は iPhone SE、390px は iPhone 15 相当。狭いほうで崩れがちです。 */
const WIDTHS = [320, 390];
const PAGES = [
  "index.html", "howto.html", "yougoshu.html",
  "tool.html?p=tee", "tool.html?p=coverall", "tool.html?p=picnicmat",
  "howto-tee.html", "howto-coverall.html",
  "en/index.html", "en/howto.html",
  "en/tool.html?p=tee", "en/tool.html?p=coverall",
  "en/howto-tee.html",
];

(async () => {
  const { chromium } = findPW();
  const browser = await chromium.launch({ executablePath: findChrome() });
  const findings = [];

  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const jsErrors = [];
    page.on("pageerror", e => jsErrors.push(e.message));

    for (const url of PAGES) {
      jsErrors.length = 0;
      await page.goto("http://localhost:8099/" + url, { waitUntil: "load" });
      await page.waitForTimeout(400);
      const r = await page.evaluate(() => {
        const out = { scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth, cut: [] };
        for (const el of document.querySelectorAll("button, a, .card-title, .pat-list li")) {
          // scrollWidth が clientWidth を超える＝文字が枠から出て見えなくなっている
          if (el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1)
            out.cut.push(el.textContent.trim().slice(0, 24));
        }
        out.cut = [...new Set(out.cut)].slice(0, 6);
        return out;
      });
      const where = `${width}px ${url}`;
      if (r.scrollW > r.innerW + 1)
        findings.push(`${where}: 横スクロールが出ています（${r.scrollW} > ${r.innerW}）`);
      if (r.cut.length)
        findings.push(`${where}: 文字が切れています → ${r.cut.join(" / ")}`);
      if (jsErrors.length)
        findings.push(`${where}: JSエラー → ${jsErrors[0].slice(0, 100)}`);
    }
    await page.close();
  }
  await browser.close();

  if (findings.length) {
    console.log(findings.map(f => "  " + f).join("\n"));
    console.log(`\n合計 ${findings.length} 件`);
    process.exit(1);
  }
  console.log(`${PAGES.length} ページ × ${WIDTHS.join("/")}px：問題なし`);
})();
