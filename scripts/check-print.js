#!/usr/bin/env node
/* 印刷が実寸(100%)で出るかを見る。ローカルサーバー(localhost:8099)が要ります。

     python3 -m http.server 8099 &
     node scripts/check-print.js

   このサイトの売りは「A4・Letter に実寸で印刷できる」ことなので、ここが崩れると
   型紙として成立しません。印刷用メディアを当てた状態で3つ確かめます。

     1. 用紙（@page）の寸法が、選んだ用紙と一致しているか
     2. 版面（.sheet の中の SVG）が用紙をはみ出していないか
     3. 案内シートの校正枠がちょうど 50mm 四方で出るか

   実際に @page{size:A4} が固定されていて、Letter を選んでも A4 の版面で出力され、
   ブラウザが用紙に合わせて縮小する状態になっていました。 */

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

const CASES = [
  { url: "tool.html?p=tee",                     w: 210, h: 297, label: "和文（A4固定）" },
  { url: "en/tool.html?p=tee&paper=a4",         w: 210, h: 297, label: "英語 A4" },
  { url: "en/tool.html?p=tee&paper=letter",     w: 216, h: 279, label: "英語 Letter" },
  { url: "en/tool.html?p=coverall&paper=letter", w: 216, h: 279, label: "英語 Letter（別の型紙）" },
];

(async () => {
  const { chromium } = findPW();
  const browser = await chromium.launch({ executablePath: findChrome() });
  const page = await browser.newPage();
  const findings = [];

  for (const c of CASES) {
    await page.goto("http://localhost:8099/" + c.url, { waitUntil: "load" });
    await page.waitForTimeout(300);
    await page.evaluate(() => { const b = document.getElementById("printBtn"); if (b) b.click(); });
    await page.waitForTimeout(400);
    await page.emulateMedia({ media: "print" });

    const r = await page.evaluate(() => {
      const mm = v => v / (96 / 25.4);
      const sheet = document.querySelector("#print-root .sheet");
      if (!sheet) return null;
      const sb = sheet.getBoundingClientRect();
      const sv = sheet.querySelector("svg").getBoundingClientRect();
      let calib = null;
      for (const el of sheet.querySelectorAll("rect")) {
        const b = el.getBoundingClientRect();
        if (Math.abs(mm(b.width) - 50) < 6 && Math.abs(mm(b.height) - 50) < 6) {
          calib = [mm(b.width), mm(b.height)];
          break;
        }
      }
      return { sheetW: mm(sb.width), sheetH: mm(sb.height), svgW: mm(sv.width), svgH: mm(sv.height), calib };
    });
    await page.emulateMedia({ media: "screen" });

    if (!r) { findings.push(`${c.label}: 印刷用のシートが作られませんでした`); continue; }
    const near = (a, b) => Math.abs(a - b) < 0.6;
    if (!near(r.sheetW, c.w) || !near(r.sheetH, c.h))
      findings.push(`${c.label}: 用紙が ${r.sheetW.toFixed(1)}×${r.sheetH.toFixed(1)}mm（${c.w}×${c.h}mm のはず）`);
    if (r.svgW > r.sheetW + 0.6 || r.svgH > r.sheetH + 0.6)
      findings.push(`${c.label}: 版面 ${r.svgW.toFixed(1)}×${r.svgH.toFixed(1)}mm が用紙をはみ出しています`);
    if (!r.calib) findings.push(`${c.label}: 案内シートに50mmの校正枠が見つかりません`);
    else if (!near(r.calib[0], 50) || !near(r.calib[1], 50))
      findings.push(`${c.label}: 校正枠が ${r.calib[0].toFixed(2)}×${r.calib[1].toFixed(2)}mm（50mm のはず）`);
  }

  await browser.close();
  if (findings.length) {
    console.log(findings.map(f => "  " + f).join("\n"));
    console.log(`\n合計 ${findings.length} 件`);
    process.exit(1);
  }
  console.log(`${CASES.length}通り：用紙・版面・校正枠(50mm) すべて一致`);
})();
