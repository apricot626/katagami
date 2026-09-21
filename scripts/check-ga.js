#!/usr/bin/env node
/* 計測イベントが本当に飛ぶかを、本物のブラウザで確かめる。
   ローカルサーバー(localhost:8099)が要ります。

     python3 -m http.server 8099 &
     node scripts/check-ga.js

   イベントは「送っているつもり」で壊れていても画面に何も出ないので、
   気づけるのは GA4 のレポートが空になった数週間後です。ここで見張ります。

     1. ガイドからツールへ来たとき、どのガイドから来たかが記録されるか
     2. 直接ツールを開いたときは direct として記録されるか
     3. 印刷したときに型紙のキーが記録されるか
     4. ホームの絞り込みで、探した語と件数が記録されるか
     5. 打鍵ごとの断片（「く」「くる」「くるみ」）が送られていないか
     6. **採寸値がイベントに混ざっていないか**
     7. 材料リンクを押したとき、店（楽天／Amazon）と資材名が記録されるか

   6 がこの検査の主目的です。採寸値はブラウザ内だけで処理するとプライバシー
   ポリシーで約束しているので、うっかりパラメータに足すと約束を破ります。
   計測の通信そのものは遮断したうえで、dataLayer に積まれた中身を読みます。 */

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

const BASE = process.env.BASE || "http://localhost:8099";
const WAIT = 1600;   // search.js の送信待ち(1200ms)より長く取る

/* 採寸値として送ってはいけないキー。patterns.js のパラメータ名から拾います。 */
const MEASURES = (() => {
  const vm = require("vm"), fs = require("fs");
  const box = { window: {}, console };
  vm.createContext(box);
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "patterns.js"), "utf8") +
    ";globalThis.__P=PATTERNS;", box);
  const keys = new Set();
  for (const p of Object.values(box.__P)) for (const f of p.params || []) keys.add(f.key);
  return [...keys];
})();

(async () => {
  const { chromium } = findPW();
  const browser = await chromium.launch({ executablePath: findChrome() });
  const ctx = await browser.newContext();
  await ctx.route("**://www.googletagmanager.com/**", r => r.abort());   // 実際には送らない

  const findings = [], jsErrors = [];
  const open = async url => {
    const p = await ctx.newPage();
    p.on("pageerror", e => jsErrors.push(`${url}: ${e.message}`));
    await p.goto(BASE + url);
    return p;
  };
  const events = p => p.evaluate(() =>
    (window.dataLayer || []).filter(a => a[0] === "event").map(a => ({ name: a[1], p: a[2] })));
  const waitFor = (p, name) => p.waitForFunction(
    n => (window.dataLayer || []).some(a => a[0] === "event" && a[1] === n), name, { timeout: 10000 });

  /* 1. ガイド → ツール */
  const g = await open("/howto-tote.html");
  await g.click('a[href="tool.html?p=tote"]');
  await waitFor(g, "open_tool").catch(() => findings.push("ガイドから来てもイベントが飛びません"));
  const e1 = (await events(g)).find(e => e.name === "open_tool");
  if (e1) {
    if (e1.p.pattern !== "tote") findings.push(`型紙のキーが違います: ${e1.p.pattern}`);
    if (e1.p.from_kind !== "howto") findings.push(`参照元の種別が違います: ${e1.p.from_kind}`);
    if (e1.p.from_page !== "/howto-tote.html") findings.push(`参照元のパスが違います: ${e1.p.from_page}`);
  }

  /* 2. 直接ツールを開く */
  const t = await open("/tool.html");
  await waitFor(t, "open_tool").catch(() => findings.push("直接開いたときにイベントが飛びません"));
  const e2 = (await events(t)).find(e => e.name === "open_tool");
  if (e2 && (e2.p.from_kind !== "direct" || e2.p.pattern !== "(none)"))
    findings.push(`直接アクセスの判定がおかしい: ${JSON.stringify(e2.p)}`);

  /* 3. 印刷 */
  await g.click("#printBtn");
  await waitFor(g, "print_pattern").catch(() => findings.push("印刷してもイベントが飛びません"));
  const e3 = (await events(g)).find(e => e.name === "print_pattern");
  if (e3 && e3.p.pattern !== "tote") findings.push(`印刷した型紙のキーが違います: ${e3.p.pattern}`);

  /* 4-5. ホームの絞り込み */
  const h = await open("/index.html");
  await h.type("#siteSearch input", "犬 ベスト", { delay: 40 });   // 1文字ずつ打つ
  await h.waitForTimeout(WAIT);
  await h.fill("#siteSearch input", "ぜったいにない語");
  await h.waitForTimeout(WAIT);
  const e4 = (await events(h)).filter(e => e.name === "search");
  if (e4.length !== 2)
    findings.push(`検索イベントが2件ではありません（${e4.length}件）。断片が送られている可能性があります → ` +
      e4.map(e => e.p.search_term).join(" / "));
  if (e4[0] && !(e4[0].p.results > 0)) findings.push("「犬 ベスト」が0件になっています");
  if (e4[1] && e4[1].p.results !== 0) findings.push("存在しない語が0件になっていません");

  /* 7. 材料リンクのクリック（和文・英文）
     対になった楽天とAmazonを見分けられないと、どちらで買われているか
     分からなくなります。店名が item に混ざっていないことも見ます。 */
  const clicks = [];
  for (const [url, cls, shop, box] of [
    ["/howto-tote.html",    "ml-btn-rakuten", "rakuten", 0],
    ["/howto-tote.html",    "ml-btn-amazon",  "amazon",  0],
    ["/howto-tote.html",    "ml-btn-rakuten", "rakuten", 1],   // 道具の枠
    ["/en/howto-tote.html", "ml-btn-amazon",  "amazon",  0],
    ["/en/howto-tote.html", "ml-btn-amazon",  "amazon",  1],   // 道具の枠
  ]) {
    const c = await open(url);
    // target="_blank" で別タブが開くと検査が散らかるので、遷移だけ止めます
    await c.evaluate(() => document.querySelectorAll("a.ml-btn")
      .forEach(a => a.addEventListener("click", e => e.preventDefault())));
    await c.click(`.material-links >> nth=${box} >> a.${cls} >> nth=0`);
    await waitFor(c, "affiliate_click")
      .catch(() => findings.push(`${url} の枠${box + 1}（${shop}）のリンクを押してもイベントが飛びません`));
    const e7 = (await events(c)).find(e => e.name === "affiliate_click");
    if (e7) {
      if (e7.p.shop !== shop) findings.push(`${url}: 店名が違います: ${e7.p.shop}`);
      if (!e7.p.item) findings.push(`${url}: 資材名が空です`);
      else if (/楽天|Amazon|—/.test(e7.p.item))
        findings.push(`${url}: 資材名に店名か区切りが残っています: ${e7.p.item}`);
    }
    clicks.push(...await events(c));
  }

  /* 6. 採寸値が混ざっていないこと */
  const all = [...await events(g), ...await events(t), ...await events(h), ...clicks];
  for (const e of all)
    for (const k of Object.keys(e.p || {}))
      if (MEASURES.includes(k))
        findings.push(`採寸値がイベントに混ざっています: ${e.name} の "${k}"`);

  for (const x of jsErrors) findings.push(`JSエラー → ${x.slice(0, 120)}`);
  await browser.close();

  if (findings.length) {
    console.log(findings.map(f => "  " + f).join("\n"));
    console.log(`\n合計 ${findings.length} 件`);
    process.exit(1);
  }
  console.log(`計測イベント ${all.length} 件を確認：問題なし（採寸値の混入なし）`);
})();
