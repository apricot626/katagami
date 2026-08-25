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
