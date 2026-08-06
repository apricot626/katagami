#!/usr/bin/env node
/* 読み上げ・キーボード操作まわりの点検。ローカルサーバー(localhost:8099)が要ります。

     python3 -m http.server 8099 &
     node scripts/check-a11y.js

   見ているのは3つです。

     1. 入力欄に名前があるか（label / aria-label のどれか）
        ツール画面の寸法スライダーには名前がなく、読み上げでは
        「スライダー」としか読まれない状態でした
     2. ボタンとリンクに読み上げできる文字があるか
     3. 文字と背景のコントラスト（WCAG AA：小さい文字 4.5:1、大きい文字 3:1）

   飾りの記号（パンくずの「›」など）は aria-hidden を付けて読み上げから外して
   あるので、コントラストの対象からも外します。 */

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

const PAGES = [
  "index.html", "tool.html?p=tee", "tool.html?p=coverall", "howto.html",
  "howto-tee.html", "yougoshu.html", "guide-print.html",
  "en/index.html", "en/tool.html?p=tee", "en/howto.html", "en/howto-tee.html", "en/guide-knit.html",
];

(async () => {
  const { chromium } = findPW();
  const browser = await chromium.launch({ executablePath: findChrome() });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const findings = [];

  for (const url of PAGES) {
    await page.goto("http://localhost:8099/" + url, { waitUntil: "load" });
    await page.waitForTimeout(300);
    const bad = await page.evaluate(() => {
      const out = [];
      const hidden = el => el.closest("[aria-hidden='true']") !== null;

      for (const el of document.querySelectorAll("input,select,textarea")) {
        if (el.type === "hidden" || hidden(el)) continue;
        const named = (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)) ||
          el.closest("label") || el.getAttribute("aria-label") || el.getAttribute("aria-labelledby");
        if (!named) out.push(`名前のない入力欄: <${el.tagName.toLowerCase()} type="${el.type}">`);
      }
      for (const el of document.querySelectorAll("button,a")) {
        if (hidden(el)) continue;
        if (!(el.textContent || "").trim() && !el.getAttribute("aria-label") &&
            !el.querySelector("img[alt]:not([alt=''])"))
          out.push(`名前のない${el.tagName.toLowerCase()}: ${el.outerHTML.slice(0, 60)}`);
      }

      const lum = c => {
        const m = c.match(/[\d.]+/g).map(Number);
        const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
        return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]);
      };
      const bgOf = el => {
        let n = el;
        while (n && n !== document.documentElement) {
          const c = getComputedStyle(n).backgroundColor;
          if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return c;
          n = n.parentElement;
        }
        return "rgb(255, 255, 255)";
      };
      const seen = new Set();
      for (const el of document.querySelectorAll("p,li,a,button,span,dd,dt,h1,h2,h3,figcaption,label")) {
        if (el.children.length || hidden(el)) continue;
        const t = (el.textContent || "").trim();
        if (!t) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none") continue;
        const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
        const l1 = lum(cs.color), l2 = lum(bgOf(el));
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        const need = (size >= 24 || (size >= 18.66 && bold)) ? 3 : 4.5;
        if (ratio < need) {
          const k = cs.color + "|" + cs.fontSize;
          if (!seen.has(k)) {
            seen.add(k);
            out.push(`コントラスト ${ratio.toFixed(2)}:1（${need}:1 が必要）${cs.fontSize} ${cs.color} … ${t.slice(0, 24)}`);
          }
        }
      }
      return out;
    });
    for (const b of [...new Set(bad)]) findings.push(`${url}: ${b}`);
  }

  await browser.close();
  if (findings.length) {
    console.log(findings.map(f => "  " + f).join("\n"));
    console.log(`\n合計 ${findings.length} 件`);
    process.exit(1);
  }
  console.log(`${PAGES.length} ページ：入力欄の名前・リンク名・コントラスト すべて問題なし`);
})();
