#!/usr/bin/env node
/* サイト全体の機械チェック。`node scripts/audit.js` で実行します。
   見つかった問題を種類ごとにまとめて出力し、1件でもあれば終了コード1を返します。
   チェック項目は docs/review-checklist.md の「自動」欄に対応しています。 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const SITE = "https://katagami.org";

const findings = [];
const add = (kind, file, msg) => findings.push({ kind, file, msg });

/* ---------- 対象ファイルを集める ---------- */
const jaPages = fs.readdirSync(ROOT).filter(f => f.endsWith(".html"));
const enPages = fs.readdirSync(path.join(ROOT, "en")).filter(f => f.endsWith(".html")).map(f => "en/" + f);
const pages = [...jaPages, ...enPages];
/* 検索対象にしないページ（転送用ページと 404）。sitemap に載せず、canonical も
   持たないので、通常のチェックからは外す。noindex が付いているかどうかで判定する。 */
const isNoindex = f => {
  const h = fs.readFileSync(path.join(ROOT, f), "utf8");
  return /<meta http-equiv="refresh"/.test(h) || /<meta name="robots" content="[^"]*noindex/.test(h);
};
const redirects = new Set(pages.filter(isNoindex));
const read = f => fs.readFileSync(path.join(ROOT, f), "utf8");
const isFile = f => { try { return fs.statSync(path.join(ROOT, f)).isFile(); } catch (e) { return false; } };

/* ---------- パターン定義を読む ---------- */
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "patterns.js"), "utf8") +
  ";globalThis.__P=PATTERNS;", sandbox);
const PATTERNS = sandbox.__P;

/* ---------- i18n を読む ---------- */
const i18nBox = { console, location: { search: "" }, URLSearchParams };
i18nBox.window = i18nBox;
vm.createContext(i18nBox);
vm.runInContext(
  fs.readFileSync(path.join(ROOT, "i18n.js"), "utf8")
    .replace("})();", "globalThis.__R={NAME:NAME,NOTE:NOTE,LABEL:LABEL,PRESET:PRESET," +
      "PIECE:PIECE,UNIT:UNIT,TOGGLE:TOGGLE,MODE:MODE,HOWTO_EN:HOWTO_EN};})();"),
  i18nBox);
const I = i18nBox.__R;
const JA_DATA = require("./ja-howto-data.js");
const EN_DATA = require("./en-howto-data.js");

/* app.js の HOWTO（ツール画面の「作り方」リンク）を取り出す */
const APP_HOWTO = (() => {
  const m = fs.readFileSync(path.join(ROOT, "app.js"), "utf8").match(/const HOWTO=\{[\s\S]*?\n\};/);
  if (!m) return {};
  const box = vm.createContext({});
  vm.runInContext(m[0] + ";globalThis.__H=HOWTO;", box);
  return box.__H;
})();

/* =========================================================
   1. HTML の基本
   ========================================================= */
for (const f of pages) {
  const h = read(f);

  // title / description の有無と重複しやすい落とし穴
  const title = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  if (!title) add("meta", f, "<title> がありません");
  else {
    if (/&(?!amp;|lt;|gt;|quot;|#\d|#x)/.test(title))
      add("html", f, "<title> にエスケープされていない & があります: " + title.trim());
    const len = title.replace(/&(amp|lt|gt|quot|#\d+);/g, "x").length;
    // 日本語のタイトルは全角なので、英語より短い文字数で切られる
    const maxTitle = f.startsWith("en/") ? 70 : 40;
    if (len > maxTitle) add("meta", f, `<title> が長すぎます（${len}文字・目安${maxTitle === 40 ? "35" : "60"}前後）`);
  }

  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!desc) add("meta", f, "meta description がありません");
  else {
    // 検索結果で切られる長さは言語で違う（全角の日本語は英語の約半分の文字数で切れる）
    const ja = !f.startsWith("en/");
    const len = desc.length;
    const max = ja ? 90 : 170, min = ja ? 40 : 50;
    const guide = ja ? "目安60〜85" : "目安120〜160";
    if (len > max) add("meta", f, `meta description が長すぎます（${len}文字・${guide}）`);
    if (len < min) add("meta", f, `meta description が短すぎます（${len}文字）`);
  }

  // 生のテンプレートリテラルが漏れていないか
  if (/\$\{[a-zA-Z_]/.test(h.replace(/<script[\s\S]*?<\/script>/g, "")))
    add("html", f, "本文に ${...} が残っています（テンプレートリテラルの漏れ）");

  // データの取りこぼしがそのまま出力されていないか
  const visible = h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
  for (const bad of ["undefined", "NaN", "[object Object]", "&amp;amp;"])
    if (visible.includes(bad)) add("html", f, `本文に "${bad}" が出力されています`);

  // id の重複
  const ids = [...h.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const dupIds = ids.filter((v, i) => ids.indexOf(v) !== i);
  if (dupIds.length) add("html", f, "id が重複: " + [...new Set(dupIds)].join(", "));

  // lang 属性
  const lang = (h.match(/<html lang="([^"]+)"/) || [])[1];
  const want = f.startsWith("en/") ? "en" : "ja";
  if (lang !== want) add("html", f, `<html lang> が "${lang}"（"${want}" のはず）`);

  // h1 は1つ
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) add("html", f, `<h1> が ${h1} 個あります（1つにすべき）`);

  // 見出しレベルの飛び（h2 の前に h3 が出るなど）
  const heads = [...h.matchAll(/<h([1-6])[\s>]/g)].map(m => +m[1]);
  for (let i = 1; i < heads.length; i++)
    if (heads[i] - heads[i - 1] > 1) {
      add("html", f, `見出しレベルが飛んでいます（h${heads[i - 1]} → h${heads[i]}）`);
      break;
    }
}

/* =========================================================
   2. リンク
   ========================================================= */
for (const f of pages) {
  const h = read(f);
  const dir = path.dirname(path.join(ROOT, f));
  const hrefs = [...h.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
  for (const href of hrefs) {
    if (/^(https?:|\/\/|mailto:|#|data:)/.test(href)) continue;
    const clean = href.split("#")[0].split("?")[0];
    if (!clean) continue;
    const target = clean.startsWith("/")
      ? path.join(ROOT, clean.slice(1))
      : path.join(dir, clean);
    if (!fs.existsSync(target)) add("link", f, "リンク切れ: " + href);
  }
  // tool.html?p=xxx のキーが実在するか
  for (const m of h.matchAll(/tool\.html\?p=([a-zA-Z]+)/g))
    if (!PATTERNS[m[1]]) add("link", f, "存在しない型紙キー: " + m[1]);
}

/* =========================================================
   3. canonical / hreflang / sitemap
   ========================================================= */
for (const f of pages) {
  if (redirects.has(f)) continue;
  const h = read(f);
  const canon = (h.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (!canon) { add("seo", f, "canonical がありません"); continue; }
  const expect = SITE + "/" + (f === "index.html" ? "" : f === "en/index.html" ? "en/" : f);
  if (canon !== expect) add("seo", f, `canonical が ${canon}（${expect} のはず）`);

  const alts = [...h.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
  if (alts.length) {
    const byLang = Object.fromEntries(alts.map(a => [a[1], a[2]]));
    for (const need of ["ja", "en", "x-default"])
      if (!byLang[need]) add("seo", f, `hreflang="${need}" がありません`);
    // 相手側からも自分に返ってきているか
    for (const [, lg, url] of alts) {
      if (lg === "x-default") continue;
      const rel = url.replace(SITE + "/", "");
      const file = (rel === "" || rel.endsWith("/")) ? rel + "index.html" : rel;
      if (!isFile(file)) {
        add("seo", f, `hreflang="${lg}" の相手 ${url} が存在しません`);
        continue;
      }
      const other = read(file);
      if (!other.includes(canon)) add("seo", f, `hreflang が片側だけ（${file} から ${canon} への参照なし）`);
    }
  }
}

/* sitemap と実ファイルの突き合わせ */
const sm = read("sitemap.xml");
const smUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const dupSm = smUrls.filter((v, i) => smUrls.indexOf(v) !== i);
if (dupSm.length) add("sitemap", "sitemap.xml", "URL 重複: " + [...new Set(dupSm)].join(", "));
for (const u of smUrls) {
  const rel = u.replace(SITE + "/", "");
  const file = rel === "" ? "index.html" : rel.endsWith("/") ? rel + "index.html" : rel;
  if (!isFile(file)) add("sitemap", "sitemap.xml", "存在しないURL: " + u);
}
const smSet = new Set(smUrls.map(u => u.replace(SITE + "/", "").replace(/\/$/, "/index.html") || "index.html"));
for (const f of pages) {
  if (redirects.has(f)) continue;
  const key = f === "index.html" ? "index.html" : f === "en/index.html" ? "en/index.html" : f;
  if (!smSet.has(key)) add("sitemap", "sitemap.xml", "sitemap に載っていない: " + f);
}

/* =========================================================
   4. 構造化データ
   ========================================================= */
for (const f of pages) {
  const h = read(f);
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let j;
    try { j = JSON.parse(m[1]); }
    catch (e) { add("jsonld", f, "JSON-LD がパースできません: " + e.message); continue; }
    const objs = Array.isArray(j) ? j : [j];
    for (const o of objs) {
      if (!o["@context"]) add("jsonld", f, "@context がありません");
      if (!o["@type"]) add("jsonld", f, "@type がありません");
      if (o["@type"] === "HowTo") {
        if (!o.step || !o.step.length) add("jsonld", f, "HowTo に step がありません");
        else o.step.forEach((s, i) => {
          if (!s.name) add("jsonld", f, `HowTo step[${i}] に name がありません`);
          if (!s.text) add("jsonld", f, `HowTo step[${i}] に text がありません`);
        });
      }
      if (o["@type"] === "BreadcrumbList") {
        const pos = (o.itemListElement || []).map(x => x.position);
        if (pos.join(",") !== pos.slice().sort((a, b) => a - b).join(","))
          add("jsonld", f, "BreadcrumbList の position が昇順ではありません");
      }
      if (o["@type"] === "Article" && o.image && typeof o.image === "string") {
        const rel = o.image.replace(SITE + "/", "");
        if (!fs.existsSync(path.join(ROOT, rel))) add("jsonld", f, "Article の image が存在しません: " + o.image);
      }
    }
  }
  // OGP 画像の実在
  for (const m of h.matchAll(/<meta property="og:image" content="([^"]+)"/g)) {
    const rel = m[1].replace(SITE + "/", "");
    if (!fs.existsSync(path.join(ROOT, rel))) add("ogp", f, "og:image が存在しません: " + m[1]);
  }
}

/* =========================================================
   5. タイトル・説明の重複
   ========================================================= */
for (const group of [jaPages, enPages]) {
  const seenT = {}, seenD = {};
  for (const f of group) {
    if (redirects.has(f)) continue;
    const h = read(f);
    const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
    const d = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    if (t) (seenT[t] = seenT[t] || []).push(f);
    if (d) (seenD[d] = seenD[d] || []).push(f);
  }
  for (const [t, fl] of Object.entries(seenT))
    if (fl.length > 1) add("meta", fl[0], `<title> が他ページと重複（${fl.length}件）: ${t.slice(0, 40)}…`);
  for (const [, fl] of Object.entries(seenD))
    if (fl.length > 1) add("meta", fl[0], `meta description が他ページと重複（${fl.length}件）`);
}

/* =========================================================
   6. 英語ページに日本語が混ざっていないか
   ========================================================= */
const JP = /[ぁ-んァ-ヶ一-龥]/;
for (const f of enPages) {
  const body = read(f)
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  // ブランド表記「カタガミ」は英語ページでも意図的に出るので除外
  // 英語ページでも日本語が出るのが正しい箇所は除く：
  //  ・日本語版へ渡すリンク（"日本語" と表示するのが親切）
  //  ・用語集などで日本語の原語を引用している <em>（例: the Japanese term is wa, 輪）
  //  ・ブランド表記のカタガミ
  const text = body
    .replace(/<a[^>]+href="\.\.\/[^"]*"[^>]*>[\s\S]*?<\/a>/g, " ")
    .replace(/<em>[\s\S]*?<\/em>[^<]*/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/カタガミ|カタ|ガミ/g, "");
  const hits = [...new Set(text.match(new RegExp(JP.source + "+", "g")) || [])];
  if (hits.length) add("i18n", f, "英語ページに日本語: " + hits.slice(0, 6).join(" / "));
}

/* つづりは米式にそろえている（docs/review-checklist.md の9章）。
   英式が混ざると、同じページの中で colour と color が並ぶことになる。 */
const BRITISH = {
  cosy: "cozy", cosier: "cozier", colour: "color", colours: "colors", coloured: "colored",
  centre: "center", centres: "centers", metre: "meter", metres: "meters",
  organise: "organize", organised: "organized", organiser: "organizer",
  nappy: "diaper", nappies: "diapers", pushchair: "stroller", pyjama: "pajama", pyjamas: "pajamas",
  towelling: "toweling", labelled: "labeled", aluminium: "aluminum", jewellery: "jewelry",
  practise: "practice", favourite: "favorite", neighbour: "neighbor", neighbours: "neighbors",
  fibre: "fiber", fibres: "fibers", moulded: "molded", grey: "gray", analyse: "analyze",
};
for (const f of enPages) {
  if (redirects.has(f)) continue;
  const text = read(f).replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  const hits = [...new Set([...text.matchAll(/[A-Za-z]+/g)].map(m => m[0].toLowerCase())
    .filter(w => BRITISH[w]))];
  if (hits.length)
    add("i18n", f, "英式のつづり: " + hits.map(w => `${w} → ${BRITISH[w]}`).join(" / "));
}

/* ページの取りこぼし。
   全型紙に作り方ガイドがあるか、和文にあるページの英語版があるか（逆も）、
   そして「4. 縫い方」が工程ごとに区切られているか。
   基礎ガイドは和文6本に対して英語3本しかなく、気づかないままでした。 */
for (const k of Object.keys(PATTERNS)) {
  for (const [f, lang] of [[`howto-${k}.html`, "和文"], [`en/howto-${k}.html`, "英文"]])
    if (!isFile(f)) add("link", f, `${lang}の作り方ガイドがありません（型紙 ${k}）`);
}
for (const f of pages) {
  if (redirects.has(f)) continue;
  const other = f.startsWith("en/") ? f.slice(3) : "en/" + f;
  if (!isFile(other)) add("link", f, `対になる ${other} がありません`);
  // 縫い方の節は「4-1.」のように工程で区切る（6ページが一続きのままでした）
  if (/^(en\/)?howto-[a-z]+\.html$/.test(f) && !/<h3[^>]*>\s*\d+-\d+\./.test(read(f)))
    add("html", f, "「縫い方」に工程の小見出し（4-1. …）がありません");
}

/* 和文の表記ゆれ（docs/review-checklist.md の10章の表）。
   同じ物が2つの書き方で出てくると、読んでいて別物かと迷います。 */
const JA_STYLE = [
  [/できあがり線/, "できあがり線 → 出来上がり線"],
  [/待ち針/, "待ち針 → まち針"],
  [/なか表/, "なか表 → 中表"],
  [/(?<!抱っこ|肩)紐/, "紐 → ひも（抱っこ紐・肩紐のような複合語だけ漢字）"],
  [/することができ/, "〜することができます → 〜できます"],
  [/下さい/, "下さい → ください"],
  [/出来ます|出来る(?!上が)/, "出来ます → できます"],
  [/ショルダー紐/, "ショルダー紐 → ショルダーひも"],
];
for (const f of jaPages) {
  if (redirects.has(f)) continue;
  const text = read(f).replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  const hits = JA_STYLE.filter(([re]) => re.test(text)).map(([, msg]) => msg);
  if (hits.length) add("i18n", f, "表記ゆれ: " + hits.join(" / "));
}

/* 和文ページのガイドリンクに、型紙のキーがそのまま出ていないか。
   表示名の取りこぼしは、リンク文字が "blouse" のような英字になって現れます。 */
for (const f of jaPages) {
  if (redirects.has(f)) continue;
  const bad = [...read(f).matchAll(/<a href="howto-([a-z]+)\.html"[^>]*>([^<]+)<\/a>/g)]
    .filter(m => m[2].trim() === m[1]).map(m => m[1]);
  if (bad.length) add("i18n", f, "和文ページのリンク文字が型紙キーのまま: " + [...new Set(bad)].join(", "));
}

/* =========================================================
   7. i18n の網羅
   ========================================================= */
for (const k of Object.keys(PATTERNS)) {
  const p = PATTERNS[k];
  if (!I.NAME[k]) add("i18n", "i18n.js", `NAME に ${k} がありません`);
  if (!I.NOTE[k]) add("i18n", "i18n.js", `NOTE に ${k} がありません`);
  for (const x of p.params || []) {
    if (!I.LABEL[x.label]) add("i18n", "i18n.js", `LABEL 未訳: "${x.label}"（${k}）`);
    if (x.unit && !I.UNIT[x.unit]) add("i18n", "i18n.js", `UNIT 未訳: "${x.unit}"（${k}）`);
  }
  for (const x of p.presets || [])
    if (!I.PRESET[x.label]) add("i18n", "i18n.js", `PRESET 未訳: "${x.label}"（${k}）`);
  for (const x of p.toggles || [])
    if (!I.TOGGLE[x.label]) add("i18n", "i18n.js", `TOGGLE 未訳: "${x.label}"（${k}）`);
  // トグルは on/off で出るパーツ名が変わることがあるので、全組み合わせを見る
  const toggles = p.toggles || [];
  const combos = [];
  for (let mask = 0; mask < (1 << Math.min(toggles.length, 8)); mask++) {
    const t = {};
    toggles.forEach((x, i) => t[x.key] = !!(mask & (1 << i)));
    combos.push(t);
  }
  for (const t of combos) {
    const d = {};
    (p.params || []).forEach(x => d[x.key] = x.val);
    Object.assign(d, t);
    let pieces;
    try { pieces = p.gen(d, 10).pieces; } catch (e) { continue; }
    for (const pc of pieces) {
      if (pc.title && !I.PIECE[pc.title]) add("i18n", "i18n.js", `PIECE 未訳: "${pc.title}"（${k}）`);
      if (pc.cutInfo && !I.PIECE[pc.cutInfo]) add("i18n", "i18n.js", `PIECE 未訳(cutInfo): "${pc.cutInfo.slice(0, 30)}…"（${k}）`);
    }
  }
  // 型紙の名前とガイドの表題がずれると、同じ物が2つの名前で呼ばれることになる。
  // 一覧では型紙名、ガイドでは別名、という食い違いが実際に9件ありました。
  for (const [data, field, want, label] of [
    [JA_DATA, "title", p.name, "和文ガイドの title"],
    [JA_DATA, "toolName", p.name, "和文ガイドの toolName"],
    [EN_DATA, "title", I.NAME[k], "英文ガイドの title"],
    [EN_DATA, "toolName", I.NAME[k], "英文ガイドの toolName"],
  ]) {
    const g = data[k];
    if (g && g[field] !== want)
      add("i18n", "scripts", `${k}: ${label} 「${g[field]}」が型紙名「${want}」と違います`);
  }
  // app.js の HOWTO はツール画面から作り方ガイドへ出すリンク。ここが実際のページと
  // ずれると、ガイドがあるのにツールから辿れません（61件で止まっていました）。
  if (isFile(`howto-${k}.html`) && !redirects.has(`howto-${k}.html`) && !APP_HOWTO[k])
    add("link", "app.js", `HOWTO に ${k} がありません（howto-${k}.html は存在します）`);
  if (APP_HOWTO[k] && !isFile(`howto-${k}.html`))
    add("link", "app.js", `HOWTO の ${k} に対応する howto-${k}.html がありません`);
  // HOWTO_EN は英語ツール画面の「作り方」リンクの向き先を決める。ここが実際の
  // ページとずれると、英語版があるのに日本語ガイドへ送ってしまう。
  const hasEnPage = isFile(`en/howto-${k}.html`);
  if (hasEnPage && !I.HOWTO_EN[k])
    add("i18n", "i18n.js", `HOWTO_EN に ${k} がありません（en/howto-${k}.html は存在します）`);
  if (!hasEnPage && I.HOWTO_EN[k])
    add("i18n", "i18n.js", `HOWTO_EN の ${k} に対応する en/howto-${k}.html がありません`);
}

/* =========================================================
   8. 型紙の製図
   ========================================================= */
function polyMaxOffset(fin, cut) {
  let m = 0;
  for (const c of cut) {
    let d = Infinity;
    for (let i = 0; i < fin.length; i++) {
      const a = fin[i], b = fin[(i + 1) % fin.length];
      const vx = b.x - a.x, vy = b.y - a.y, L2 = vx * vx + vy * vy || 1;
      let t = ((c.x - a.x) * vx + (c.y - a.y) * vy) / L2;
      t = Math.max(0, Math.min(1, t));
      d = Math.min(d, Math.hypot(c.x - a.x - t * vx, c.y - a.y - t * vy));
    }
    m = Math.max(m, d);
  }
  return m;
}
const SA = 10; // 1cm
for (const k of Object.keys(PATTERNS)) {
  const p = PATTERNS[k];
  // 既定値 + 全プリセット + 各パラメータの最小/最大の端値
  const cases = [{ label: "既定", vals: {} }, ...(p.presets || []).map(x => ({ label: x.label, vals: x.vals }))];
  for (const x of p.params || []) {
    cases.push({ label: `${x.label}=最小`, vals: { [x.key]: x.min } });
    cases.push({ label: `${x.label}=最大`, vals: { [x.key]: x.max } });
  }
  for (const c of cases) {
    const d = {};
    (p.params || []).forEach(x => d[x.key] = x.val);
    (p.toggles || []).forEach(x => d[x.key] = x.def);
    Object.assign(d, c.vals);
    let r;
    try { r = p.gen(d, SA); }
    catch (e) { add("pattern", k, `${c.label} で例外: ${e.message}`); continue; }
    if (!r || !r.pieces || !r.pieces.length) { add("pattern", k, `${c.label} でパーツが空`); continue; }
    for (const pc of r.pieces) {
      for (const [name, arr] of [["finished", pc.finished], ["cut", pc.cut]]) {
        if (!arr || arr.length < 3) { add("pattern", k, `${c.label} / ${pc.title} の ${name} が3点未満`); continue; }
        if (arr.some(q => !isFinite(q.x) || !isFinite(q.y)))
          add("pattern", k, `${c.label} / ${pc.title} の ${name} に NaN/Infinity`);
      }
      if (!pc.finished || !pc.cut) continue;
      const xs = pc.cut.map(q => q.x), ys = pc.cut.map(q => q.y);
      const w = Math.max(...xs) - Math.min(...xs), hh = Math.max(...ys) - Math.min(...ys);
      if (!(w > 0 && hh > 0)) add("pattern", k, `${c.label} / ${pc.title} のサイズが0`);
      if (w > 4000 || hh > 4000)
        add("pattern", k, `${c.label} / ${pc.title} が異常に大きい（${(w / 10) | 0}×${(hh / 10) | 0}cm）`);
      const off = polyMaxOffset(pc.finished, pc.cut);
      if (off > SA * 3)
        add("pattern", k, `${c.label} / ${pc.title} の縫い代にトゲ（最大 ${(off / SA).toFixed(1)} 倍）`);
    }
  }
  // memo にテンプレートの穴が残っていないか
  const d0 = {};
  (p.params || []).forEach(x => d0[x.key] = x.val);
  try {
    const memo = p.gen(d0, SA).memo || "";
    if (/undefined|NaN|\$\{/.test(memo)) add("pattern", k, "memo に undefined/NaN/${} が入っています: " + memo);
  } catch (e) { /* 上で報告済み */ }
}

/* =========================================================
   8.5 縫い合わせる辺の長さが釣り合うか（袖山と袖ぐり）
   どの辺とどの辺を縫うかは形状からは分からないので、生成側が
   袖パーツに seamLen（＝相手になる袖ぐりの実長）を持たせる約束にしている。
   袖山はパーツの上側を測れば求まるので、その2つを突き合わせる。
   セットイン袖は袖山が袖ぐりより少し長い（いせ込み分）のが正しく、
   短いと物理的に袖が付かない。
   ========================================================= */
/* 袖山は、袖幅がいちばん広い2点（＝左右の袖下）のあいだを、上を通って結ぶ経路。
   「上から何割まで」で切り出すと、袖丈が短い型紙（半袖の小さいサイズなど）で
   袖下の点を取りこぼし、袖山が実際より短く出ます。 */
function capSeamLen(f) {
  let li = 0, ri = 0;
  f.forEach((q, i) => { if (q.x < f[li].x) li = i; if (q.x > f[ri].x) ri = i; });
  const walk = (a, b) => {
    const out = [];
    for (let i = a; ; i = (i + 1) % f.length) { out.push(f[i]); if (i === b) break; }
    return out;
  };
  const a = walk(li, ri), b = walk(ri, li);
  const top = Math.min(...a.map(q => q.y)) <= Math.min(...b.map(q => q.y)) ? a : b;
  let t = 0;
  for (let i = 1; i < top.length; i++) t += Math.hypot(top[i].x - top[i - 1].x, top[i].y - top[i - 1].y);
  return t;
}
const EASE_MIN = 1, EASE_MAX = 45;   // mm。いせは 0.1〜4.5cm を許容範囲とする
for (const k of Object.keys(PATTERNS)) {
  const p = PATTERNS[k];
  const cases = [{ label: "既定", vals: {} },
                 ...(p.presets || []).map(x => ({ label: x.label, vals: x.vals }))];
  for (const c of cases) {
    const d = {};
    (p.params || []).forEach(x => d[x.key] = x.val);
    (p.toggles || []).forEach(x => d[x.key] = x.def);
    Object.assign(d, c.vals);
    let pieces;
    try { pieces = p.gen(d, 0).pieces; } catch (e) { continue; }
    const sleeve = pieces.find(x => x.title === "袖");
    if (!sleeve || !sleeve.seamLen) continue;
    const cap = capSeamLen(sleeve.finished), arm = sleeve.seamLen;
    const ease = cap - arm;
    if (ease < EASE_MIN || ease > EASE_MAX)
      add("pattern", k,
        `${c.label} / 袖山 ${(cap / 10).toFixed(1)}cm と袖ぐり ${(arm / 10).toFixed(1)}cm が釣り合いません` +
        `（いせ ${(ease / 10).toFixed(1)}cm・目安 0.1〜4.5cm）`);
    // セットイン袖は縦に置くので、パーツの高さがそのまま入力した袖丈になるはず。
    // 袖山が y=0 に届いていないと、印刷した型紙が入力より短くなります。
    const sp = (p.params || []).find(x => x.label === "袖丈");
    if (sp) {
      const ys = sleeve.finished.map(q => q.y);
      const h = Math.max(...ys) - Math.min(...ys), want = d[sp.key] * 10;
      if (Math.abs(h - want) > 2)
        add("pattern", k,
          `${c.label} / 袖パーツの高さ ${(h / 10).toFixed(1)}cm が入力した袖丈 ${d[sp.key]}cm と違います`);
    }
  }
}

/* =========================================================
   8.55 図解の割り当て
   FIG_MAP に存在しない図の名前を書くと figFor() が空文字を返し、
   そのページだけ図解なしで静かに素通りします。
   ========================================================= */
{
  const { FIGS, FIG_MAP } = require("./howto-figs.js");
  for (const [k, id] of Object.entries(FIG_MAP))
    if (!FIGS[id]) add("pattern", "scripts/howto-figs.js", `${k} の図 "${id}" が FIGS にありません`);
  for (const k of Object.keys(PATTERNS))
    if (isFile(`howto-${k}.html`) && !FIG_MAP[k] && !redirects.has(`howto-${k}.html`))
      add("pattern", "scripts/howto-figs.js", `${k} に図解が割り当てられていません`);
}

/* =========================================================
   8.6 quad() の戻り値を plen() で測っていないか（ソースの静的チェック）
   quad() は始点を含まない点列を返すので、plen(quad(...)) だと曲線の実長より
   1区間ぶん（1割ほど）短く出る。袖ぐりの長さを測る場面でこれをやると、
   袖山が足りなくなって袖が付かなくなる。始点を足す arcLen() を使うこと。
   ========================================================= */
{
  const src = fs.readFileSync(path.join(ROOT, "patterns.js"), "utf8");
  // quad() を返す関数名（mkArm のようなラッパー）を拾う
  const wrappers = new Set(["quad"]);
  for (const m of src.matchAll(/const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*quad\(/g)) wrappers.add(m[1]);
  // それらの戻り値を受けている変数名を拾う
  const curveVars = new Set();
  for (const w of wrappers)
    for (const m of src.matchAll(new RegExp("(?:const|let)\\s+(\\w+)\\s*=\\s*" + w + "\\(", "g")))
      curveVars.add(m[1]);
  // plen(その変数) を探す
  const lines = src.split("\n");
  for (let i = 0; i < lines.length; i++)
    for (const m of lines[i].matchAll(/\bplen\(\s*(\w+)\s*\)/g))
      if (curveVars.has(m[1]))
        add("pattern", "patterns.js",
          `${i + 1}行目: plen(${m[1]}) — ${m[1]} は quad() の戻り値なので始点が抜けます。arcLen(始点, ${m[1]}) を使ってください`);
}

/* =========================================================
   9. アフィリエイトリンク
   ========================================================= */
for (const f of jaPages.filter(x => x.startsWith("howto-") && !redirects.has(x))) {
  const h = read(f);
  const btns = [...h.matchAll(/<a class="ml-btn[^"]*" href="([^"]+)"[^>]*>楽天 — ([^<]+)<\/a>/g)];
  if (!btns.length) { add("affiliate", f, "材料リンクがありません"); continue; }
  if (btns.length < 3) add("affiliate", f, `材料リンクが ${btns.length} 本（3本以上にしたい）`);
  const labels = btns.map(b => b[2]);
  for (let i = 0; i < labels.length; i++)
    for (let j = i + 1; j < labels.length; j++)
      if (labels[i].includes(labels[j]) || labels[j].includes(labels[i]))
        add("affiliate", f, `材料リンクのラベルが重複: ${labels[i]} / ${labels[j]}`);
  for (const b of btns) {
    if (!b[1].startsWith("//af.moshimo.com/af/c/click?a_id="))
      add("affiliate", f, "リンク形式がおかしい: " + b[1].slice(0, 60));
    if (!/url=https%3A%2F%2Fsearch\.rakuten\.co\.jp/.test(b[1]))
      add("affiliate", f, "楽天の検索URLが二重エンコードされていません: " + b[2]);
  }
  if (!/本ページはアフィリエイト広告/.test(h)) add("affiliate", f, "アフィリエイトの表記がありません");
}

/* =========================================================
   出力
   ========================================================= */
const byKind = {};
for (const f of findings) (byKind[f.kind] = byKind[f.kind] || []).push(f);
const order = ["pattern", "html", "link", "seo", "sitemap", "jsonld", "ogp", "meta", "i18n", "affiliate"];
const LABEL = {
  pattern: "製図", html: "HTML", link: "リンク", seo: "canonical/hreflang",
  sitemap: "sitemap", jsonld: "構造化データ", ogp: "OGP", meta: "メタ情報",
  i18n: "翻訳", affiliate: "アフィリエイト",
};
console.log(`対象: 日本語 ${jaPages.length} ページ / 英語 ${enPages.length} ページ / 型紙 ${Object.keys(PATTERNS).length} 種\n`);
for (const k of order) {
  const list = byKind[k] || [];
  console.log(`## ${LABEL[k]}: ${list.length} 件`);
  const shown = process.env.AUDIT_ALL ? list : list.slice(0, 40);
  for (const x of shown) console.log(`   [${x.file}] ${x.msg}`);
  if (list.length > shown.length) console.log(`   … 他 ${list.length - shown.length} 件`);
  console.log("");
}
console.log(`合計 ${findings.length} 件`);
process.exit(findings.length ? 1 : 0);
