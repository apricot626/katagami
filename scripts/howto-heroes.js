/* ============================================================
   完成イメージ図（記事冒頭のヒーロー図）
   Used by:
     - scripts/inject-howto-heroes.js  (手書きの和文ガイドへ挿入)
     - scripts/gen-ja-howto.js / gen-en-howto.js  (生成ページに出力)

   図解（howto-figs.js）が「縫い方の1手順」を描くのに対して、
   こちらは「出来上がるとこうなる」を1枚で見せるための図です。

   形は手で描かず、patterns.js の出来上がり線から組み立てます
   （hero-from-pattern.js）。型紙を直せば図も一緒に動き、
   scripts/check-hero.js が図の寸法と入力値の一致を検算します。

   ■ vals（見せる設定）について
   既定プリセットをそのまま描く義務はありません。カタログ写真が
   着せる服を選ぶのと同じで、見栄えのする設定を選んでかまいません。
   ただし **選んだ数値は必ずキャプションに出す** こと。読者がその値を
   入力すれば同じ型紙が出る、という状態を崩さないためです。
   ============================================================ */
const { loadPatterns, BUILDERS, renderSVG } = require("./hero-from-pattern.js");

const WRAP = (svg, cap) =>
  `<figure class="fig hero-fig">\n${svg}\n      <figcaption>${cap}</figcaption>\n    </figure>`;

const T = (ja, en, l) => (l === "ja" ? ja : en);

/* キャプションはどの型紙も同じ言い回し。「この数値を入れれば同じ型紙が出る」
   という約束を全図で共有します（shown の数値がそのままレシピになる）。 */
const CAP = {
  ja: s => `完成イメージ（${s}）。赤い破線が縫う線です。この数値をツールに入れると同じ型紙が出ます。`,
  en: s => `What it looks like finished (${s}). Red dashed lines are the stitching — enter these numbers in the tool to get this exact pattern.`,
};

const SPECS = {
  onepiece: {
    /* 既定は袖丈54cm（長袖）。半袖・広めの衿ぐり・フレア多めのほうが
       この型紙の魅力が伝わるので、その設定で描いてキャプションに明記する。 */
    vals: { sleeveL: 20, flare: 16, neckw: 18 },
    shown: { ja: "袖丈20cm・裾フレア16cm・衿ぐり幅18cm", en: "20 cm sleeves, 16 cm hem flare, 18 cm neck width" },
    preset: "M",
    armAngle: 9,
    aria: {
      ja: "ワンピース（袖付き）の完成イメージ。ウエストで切り替えたボディスとAラインスカート、セットインの袖",
      en: "Finished dress with sleeves: a fitted bodice joined at the waist to an A-line skirt, with set-in sleeves",
    },
    labels: [
      { at: "neck",   ja: "衿ぐりはバイアス始末", en: "Bias-bound neckline" },
      { at: "sleeve", ja: "セットイン袖",         en: "Set-in sleeve" },
      { at: "waist",  ja: "ウエスト切り替え",     en: "Waist seam" },
      { at: "skirt",  ja: "Aラインスカート",      en: "A-line skirt" },
      { at: "hem",    ja: "裾は三つ折り",         en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  tee: {
    /* 既定のボックスTそのまま。肩を落とした半袖が自然に見える角度に。 */
    vals: {},
    shown: { ja: "バスト100cm・着丈66cm・袖丈20cm", en: "100 cm bust, 66 cm length, 20 cm sleeves" },
    aria: {
      ja: "Tシャツの完成イメージ。肩を落とした半袖のボックスシルエット、前後身頃と袖、始末した衿ぐり",
      en: "Finished T-shirt: a boxy drop-shoulder short-sleeve silhouette with front and back bodice, sleeves and a finished neckline",
    },
    labels: [
      { at: "neck",   ja: "衿ぐりの始末", en: "Neckline finish" },
      { at: "sleeve", ja: "袖を付ける",   en: "Sleeve" },
      { at: "side",   ja: "脇を縫う",     en: "Side seam" },
      { at: "hem",    ja: "裾は三つ折り", en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  skirt: {
    /* フレアを少し足してAラインらしく見せる。 */
    vals: { flare: 12 },
    shown: { ja: "ウエスト70cm・スカート丈58cm・フレア12cm", en: "70 cm waist, 58 cm length, 12 cm flare" },
    aria: {
      ja: "Aラインスカートの完成イメージ。ウエストから裾へ広がる台形。ウエストはゴム、裾は三つ折り",
      en: "Finished A-line skirt: a trapezoid widening from the waist to the hem, with an elastic waist and a double-fold hem",
    },
    labels: [
      { at: "waist", ja: "ウエストはゴム", en: "Elastic waist" },
      { at: "side",  ja: "脇を縫う",       en: "Side seam" },
      { at: "hem",   ja: "裾は三つ折り",   en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  kidstee: {
    vals: {},
    shown: { ja: "バスト64cm・着丈40cm・袖丈14cm", en: "64 cm chest, 40 cm length, 14 cm sleeves" },
    aria: {
      ja: "キッズTシャツの完成イメージ。肩を落とした半袖のボックスシルエット",
      en: "Finished kids' T-shirt: a boxy drop-shoulder short-sleeve silhouette",
    },
    labels: [
      { at: "neck",   ja: "衿ぐりの始末", en: "Neckline finish" },
      { at: "sleeve", ja: "袖を付ける",   en: "Sleeve" },
      { at: "side",   ja: "脇を縫う",     en: "Side seam" },
      { at: "hem",    ja: "裾は三つ折り", en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  petblanket: {
    vals: {},
    shown: { ja: "幅55cm・長さ70cm・角丸4cm", en: "55 × 70 cm, 4 cm rounded corners" },
    aria: {
      ja: "ペットブランケットの完成イメージ。角を丸くした長方形、まわりをステッチ",
      en: "Finished pet blanket: a rounded rectangle topstitched around the edge",
    },
    labels: [
      { at: "corner", ja: "角は丸く",             en: "Rounded corners" },
      { at: "edge",   ja: "まわりをステッチ",     en: "Topstitch the edge" },
      { at: "center", ja: "2枚を中表に縫って返す", en: "Two layers, sewn and turned" },
    ],
    caption: CAP,
  },

  tote: {
    vals: {},
    shown: { ja: "幅34cm・丈36cm・マチ12cm・持ち手55cm", en: "34 cm wide, 36 cm tall, 12 cm gusset, 55 cm handles" },
    aria: {
      ja: "トートバッグの完成イメージ。底にマチ、袋口を三つ折り、持ち手が2本",
      en: "Finished tote bag: a boxed bottom, a folded opening and two handles",
    },
    labels: [
      { at: "handle",  ja: "持ち手",         en: "Handle" },
      { at: "opening", ja: "袋口を三つ折り", en: "Folded opening" },
      { at: "gusset",  ja: "底のマチ",       en: "Boxed bottom" },
    ],
    caption: CAP,
  },

  kinchaku: {
    vals: {},
    shown: { ja: "幅22cm・丈26cm・ひも通し4cm", en: "22 cm wide, 26 cm tall, 4 cm casing" },
    aria: {
      ja: "巾着袋の完成イメージ。上をひも通しにして絞る、底は「わ」",
      en: "Finished drawstring pouch: a drawstring casing at the top, folded at the base",
    },
    labels: [
      { at: "casing", ja: "ひも通し",     en: "Drawstring casing" },
      { at: "top",    ja: "ひもで絞る",   en: "Draw it closed" },
      { at: "fold",   ja: "底は「わ」",   en: "Fold at the base" },
    ],
    caption: CAP,
  },

  petmat: {
    vals: {},
    shown: { ja: "幅55cm・長さ40cm・角丸5cm", en: "55 × 40 cm, 5 cm rounded corners" },
    aria: {
      ja: "ペットマットの完成イメージ。角を丸くした長方形、まわりをステッチ",
      en: "Finished pet mat: a rounded rectangle topstitched around the edge",
    },
    labels: [
      { at: "corner", ja: "角は丸く",             en: "Rounded corners" },
      { at: "edge",   ja: "まわりをステッチ",     en: "Topstitch the edge" },
      { at: "center", ja: "中に芯を入れてもOK",   en: "Add batting if you like" },
    ],
    caption: CAP,
  },

  pouch: {
    vals: {},
    shown: { ja: "幅20cm・丈15cm", en: "20 cm wide, 15 cm tall" },
    aria: {
      ja: "ファスナーポーチの完成イメージ。上にファスナー、両脇と底を縫う",
      en: "Finished zip pouch: a zip along the top, sides and base sewn",
    },
    labels: [
      { at: "zip",  ja: "ファスナー",   en: "Zip" },
      { at: "side", ja: "両脇を縫う",   en: "Sew the sides" },
      { at: "base", ja: "底を縫う",     en: "Sew the base" },
    ],
    caption: CAP,
  },

  sacoche: {
    vals: {},
    shown: { ja: "幅22cm・丈18cm・ショルダー120cm", en: "22 × 18 cm, 120 cm strap" },
    aria: {
      ja: "サコッシュの完成イメージ。前後1枚の平たい袋に、長い斜め掛けひも",
      en: "Finished sacoche: a flat pouch with a long crossbody strap",
    },
    labels: [
      { at: "strap",   ja: "ショルダーひも", en: "Crossbody strap" },
      { at: "opening", ja: "袋口",           en: "Opening" },
      { at: "body",    ja: "本体（前後1枚）", en: "Body (front & back)" },
    ],
    caption: CAP,
  },

  shoulderbag: {
    vals: {},
    shown: { ja: "幅26cm・丈22cm・フラップ10cm・ショルダー120cm", en: "26 × 22 cm, 10 cm flap, 120 cm strap" },
    aria: {
      ja: "フラップ型ショルダーバッグの完成イメージ。前面をフラップで覆い、斜め掛けひも",
      en: "Finished flap shoulder bag: a flap over the front and a crossbody strap",
    },
    labels: [
      { at: "strap", ja: "ショルダーひも", en: "Crossbody strap" },
      { at: "flap",  ja: "フラップ",       en: "Flap" },
      { at: "body",  ja: "本体",           en: "Body" },
    ],
    caption: CAP,
  },
};

/* 型紙の既定値＋プリセット＋見せる設定を重ねる */
function valuesFor(pat, spec) {
  const base = Object.fromEntries(pat.params.map(p => [p.key, p.val]));
  const pre = spec.preset ? (pat.presets.find(p => p.label === spec.preset) || {}).vals : null;
  return { ...base, ...(pre || {}), ...(spec.vals || {}) };
}

/* returns the hero figure HTML for a pattern key, or "" if none */
function heroFor(key, lang) {
  const spec = SPECS[key];
  const build = BUILDERS[key];
  if (!spec || !build) return "";
  const l = lang === "en" ? "en" : "ja";
  const P = loadPatterns();

  const svg = renderSVG(build(P, valuesFor(P[key], spec), { armAngle: spec.armAngle }), {
    labels: spec.labels.map(x => ({ at: x.at, text: x[l] })),
    aria: spec.aria[l],
  });
  return WRAP(svg, spec.caption[l](spec.shown[l]));
}

module.exports = { HEROES: SPECS, heroFor };
