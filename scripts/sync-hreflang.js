#!/usr/bin/env node
/* 日本語ページの hreflang / English リンクを、英語版の有無に合わせてそろえる。

   Google は hreflang を相互参照でしか認めないので、英語版があるのに
   日本語側から返していないと、注釈ごと無視されます。逆に英語版がないのに
   宣言していると、存在しないURLを指すことになります。

   何度実行しても同じ結果になります（べき等）。 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = "https://katagami.org";

const jaPages = fs.readdirSync(ROOT)
  .filter(f => f.endsWith(".html") && f !== "tool.html");

let added = 0, removed = 0, linkFixed = 0, untouched = 0;

for (const f of jaPages) {
  const p = path.join(ROOT, f);
  let h = fs.readFileSync(p, "utf8");
  const before = h;
  const hasEn = fs.existsSync(path.join(ROOT, "en", f));

  const jaUrl = SITE + "/" + (f === "index.html" ? "" : f);
  const enUrl = SITE + "/en/" + (f === "index.html" ? "" : f);
  const block =
    `<link rel="alternate" hreflang="ja" href="${jaUrl}">\n` +
    `<link rel="alternate" hreflang="en" href="${enUrl}">\n` +
    `<link rel="alternate" hreflang="x-default" href="${jaUrl}">`;

  // いったん既存の hreflang 行をすべて外してから、必要なら入れ直す
  h = h.replace(/^[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*">\n/gm, "");

  if (hasEn) {
    const canon = h.match(/^[ \t]*<link rel="canonical" href="[^"]*">$/m);
    if (!canon) { console.warn(`  ${f}: canonical が見つからないので飛ばします`); continue; }
    h = h.replace(canon[0], canon[0] + "\n" + block);
  }

  // 「English」リンクの向き先も合わせる。
  // 英語版がないページは、英語トップ（作り方一覧があるページ）へ送る。
  const fallback = f.startsWith("howto-") || f === "howto.html" ? "en/howto.html" : "en/index.html";
  h = h.replace(/(<a class="lang-link" href=")([^"]+)(">English<\/a>)/,
    (m, a, href, c) => a + (hasEn ? "en/" + f : fallback) + c);

  if (h !== before) {
    fs.writeFileSync(p, h);
    if (hasEn && !/hreflang/.test(before)) added++;
    else if (!hasEn && /hreflang/.test(before)) removed++;
    else linkFixed++;
  } else untouched++;
}

console.log(`hreflang: 追加 ${added} / 削除 ${removed} / リンクのみ修正 ${linkFixed} / 変更なし ${untouched}`);
