/* ============================================================
   完成イメージ図（記事冒頭のヒーロー図）
   Used by:
     - scripts/inject-howto-heroes.js  (手書きの和文ガイドへ挿入)
     - scripts/gen-ja-howto.js / gen-en-howto.js  (生成ページに出力)
   図解（howto-figs.js）が「縫い方の1手順」を描くのに対して、
   こちらは「出来上がるとこうなる」を1枚で見せるための図です。
   赤い破線＝縫う線、細い黒線＝縫い目、というサイト共通の約束を使います。
   スタイルは howto.css の .fig / .hero-fig に依存します。
   ============================================================ */

const WRAP = (svg, cap) =>
  `<figure class="fig hero-fig">\n${svg}\n      <figcaption>${cap}</figcaption>\n    </figure>`;

const T = (ja, en, l) => (l === "ja" ? ja : en);

const HEROES = {
  /* ワンピース（袖付き）— ウエスト切り替え＋セットイン袖＋Aラインスカート */
  onepiece: (l) => WRAP(
`      <svg viewBox="0 0 380 340" role="img" aria-label="${T("ワンピース（袖付き）の完成イメージ。ウエストで切り替えたボディスとAラインスカート、セットインの袖","Finished dress with sleeves: a fitted bodice joined at the waist to an A-line skirt, with set-in sleeves",l)}">
        <!-- 本体シルエット：衿ぐり→肩→袖→脇→スカート裾 -->
        <path d="M100,48 L72,56 Q52,74 50,112 L70,126 L76,102 L86,176 L56,316 Q118,328 180,316 L150,176 L160,102 L166,126 L186,112 Q184,74 164,56 L136,48 C134,74 102,74 100,48 Z"
              fill="rgba(46,99,180,.07)" stroke="#1B1D1A" stroke-width="2" stroke-linejoin="round"/>
        <!-- 袖ぐり（セットインの縫い目） -->
        <path d="M72,56 Q64,80 76,102" fill="none" stroke="#1B1D1A" stroke-width="1.2"/>
        <path d="M164,56 Q172,80 160,102" fill="none" stroke="#1B1D1A" stroke-width="1.2"/>
        <!-- スカートのドレープ -->
        <path d="M100,182 L86,310" fill="none" stroke="#1B1D1A" stroke-width="1" opacity=".3"/>
        <path d="M136,182 L150,310" fill="none" stroke="#1B1D1A" stroke-width="1" opacity=".3"/>
        <!-- 縫う線（赤い破線） -->
        <path d="M105,50 C107,69 129,69 131,50" fill="none" stroke="#C24033" stroke-width="1.6" stroke-dasharray="5 3"/>
        <line x1="86" y1="176" x2="150" y2="176" stroke="#C24033" stroke-width="1.6" stroke-dasharray="5 3"/>
        <line x1="72" y1="119" x2="52" y2="105" stroke="#C24033" stroke-width="1.6" stroke-dasharray="5 3"/>
        <line x1="164" y1="119" x2="184" y2="105" stroke="#C24033" stroke-width="1.6" stroke-dasharray="5 3"/>
        <path d="M58,308 Q118,320 178,308" fill="none" stroke="#C24033" stroke-width="1.6" stroke-dasharray="5 3"/>
        <!-- 引き出し線 -->
        <g stroke="#6b6b60" stroke-width="1" fill="#6b6b60">
          <line x1="136" y1="48" x2="194" y2="34"/><circle cx="136" cy="48" r="1.8"/>
          <line x1="185" y1="104" x2="194" y2="100"/><circle cx="185" cy="104" r="1.8"/>
          <line x1="150" y1="176" x2="194" y2="176"/><circle cx="150" cy="176" r="1.8"/>
          <line x1="165" y1="246" x2="194" y2="240"/><circle cx="165" cy="246" r="1.8"/>
          <line x1="176" y1="314" x2="194" y2="306"/><circle cx="176" cy="314" r="1.8"/>
        </g>
        <g font-size="11.5" font-family="sans-serif" fill="#1B1D1A">
          <text x="199" y="38">${T("衿ぐりはバイアス始末","Bias-bound neckline",l)}</text>
          <text x="199" y="104">${T("セットイン袖","Set-in sleeve",l)}</text>
          <text x="199" y="180">${T("ウエスト切り替え","Waist seam",l)}</text>
          <text x="199" y="244">${T("Aラインスカート","A-line skirt",l)}</text>
          <text x="199" y="310">${T("裾は三つ折り","Double-fold hem",l)}</text>
        </g>
        <text x="14" y="28" font-size="10" font-family="sans-serif" fill="#6b6b60">${T("前から見たところ","front view",l)}</text>
      </svg>`,
    T("完成イメージ。ボディスとスカートをウエストで接ぎ、袖はセットインで付けます。赤い破線が縫う線です。",
      "What it looks like finished: bodice and skirt joined at the waist, sleeves set into the armholes. Red dashed lines are the stitching.", l)),
};

/* returns the hero figure HTML for a pattern key, or "" if none */
function heroFor(key, lang) {
  const h = HEROES[key];
  return h ? h(lang === "en" ? "en" : "ja") : "";
}

module.exports = { HEROES, heroFor };
