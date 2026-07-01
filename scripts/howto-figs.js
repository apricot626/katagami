/* ============================================================
   Shared how-to technique figures (bilingual SVG diagrams).
   Used by:
     - scripts/inject-howto-figs.js  (injects into JP howto-*.html)
     - scripts/gen-en-howto.js       (emits into en/howto-*.html)
   Each figure is a small, print-friendly SVG that illustrates the
   star technique of a pattern. Styling relies on .fig in howto.css.
   ============================================================ */

const WRAP = (svg, cap) =>
  `<figure class="fig">\n${svg}\n      <figcaption>${cap}</figcaption>\n    </figure>`;

const T = (ja, en, l) => (l === "ja" ? ja : en);

const FIGS = {
  /* 三つ折り — double-fold hem (cross-section) */
  mitsuori: (l) => WRAP(
`      <svg viewBox="0 0 360 170" role="img" aria-label="${T("三つ折りの断面","double-fold hem cross-section",l)}">
        <path d="M40,70 L250,70 L250,86 L120,86 L120,102 L250,102" fill="none" stroke="#1B1D1A" stroke-width="2.5" stroke-linejoin="round"/>
        <line x1="150" y1="62" x2="150" y2="110" stroke="#C24033" stroke-width="2" stroke-dasharray="6 4"/>
        <circle cx="150" cy="78" r="1.6" fill="#C24033"/><circle cx="150" cy="94" r="1.6" fill="#C24033"/>
        <text x="235" y="58" text-anchor="middle" font-size="11" fill="#1B1D1A" font-family="sans-serif">${T("布端","raw edge",l)}</text>
        <text x="150" y="130" text-anchor="middle" font-size="11" fill="#C24033" font-family="sans-serif">${T("端ミシン","topstitch",l)}</text>
        <text x="70" y="60" text-anchor="middle" font-size="10" fill="#6b6b60" font-family="sans-serif">${T("表布","fabric",l)}</text>
      </svg>`,
    T("布端を2回折り込み、重ねた上から端を縫って始末する。","Fold the raw edge under twice and topstitch through the layers.", l)),

  /* マチ — boxed corner / gusset */
  gusset: (l) => WRAP(
`      <svg viewBox="0 0 360 175" role="img" aria-label="${T("マチ（底角）の縫い方","boxing a bottom corner",l)}">
        <path d="M100,40 L100,150 L260,150 L260,40" fill="none" stroke="#1B1D1A" stroke-width="2"/>
        <path d="M100,150 L60,110 M260,150 L300,110" fill="none" stroke="#1B1D1A" stroke-width="2"/>
        <path d="M60,110 L100,150 L140,110" fill="rgba(46,99,180,.07)" stroke="#1B1D1A" stroke-width="1.5"/>
        <line x1="70" y1="120" x2="130" y2="120" stroke="#C24033" stroke-width="2.5"/>
        <line x1="63" y1="113" x2="137" y2="113" stroke="#C24033" stroke-width="1" stroke-dasharray="4 3"/>
        <text x="100" y="110" text-anchor="middle" font-size="10" fill="#C24033" font-family="sans-serif">${T("マチを縫う","stitch",l)}</text>
        <text x="100" y="142" text-anchor="middle" font-size="10" fill="#6b6b60" font-family="sans-serif">${T("底角","corner",l)}</text>
        <text x="235" y="120" text-anchor="middle" font-size="11" fill="#2E63B4" font-family="sans-serif">${T("袋の底","bag base",l)}</text>
      </svg>`,
    T("底角を三角につまみ、幅を測って直角に縫うとマチができる。","Pinch each bottom corner into a triangle and sew straight across to box it.", l)),

  /* 返し口から表に返す — turn right side out through a gap */
  turnout: (l) => WRAP(
`      <svg viewBox="0 0 360 170" role="img" aria-label="${T("返し口から表に返す","turning right side out through a gap",l)}">
        <rect x="50" y="40" width="150" height="95" rx="6" fill="rgba(46,99,180,.06)" stroke="#1B1D1A" stroke-width="2"/>
        <line x1="105" y1="135" x2="145" y2="135" stroke="#F5F4EE" stroke-width="4"/>
        <line x1="105" y1="135" x2="145" y2="135" stroke="#C24033" stroke-width="2" stroke-dasharray="3 3"/>
        <text x="125" y="153" text-anchor="middle" font-size="10" fill="#C24033" font-family="sans-serif">${T("返し口","gap",l)}</text>
        <path d="M215,88 Q255,88 268,88" fill="none" stroke="#2E63B4" stroke-width="2"/>
        <path d="M262,82 L272,88 L262,94" fill="none" stroke="#2E63B4" stroke-width="2"/>
        <path d="M285,45 L335,45 L335,130 L285,130 Z" fill="none" stroke="#1B1D1A" stroke-width="2"/>
        <path d="M285,45 L297,57 M335,45 L323,57 M285,130 L297,118 M335,130 L323,118" stroke="#1B1D1A" stroke-width="1.4"/>
        <text x="310" y="150" text-anchor="middle" font-size="10" fill="#1B1D1A" font-family="sans-serif">${T("角を出す","push corners",l)}</text>
      </svg>`,
    T("周囲を縫って返し口を残し、そこから表に返して角を出す。","Sew around leaving a gap, turn right side out through it, then push the corners out.", l)),

  /* 筒縫い — sew a flat piece into a tube */
  tube: (l) => WRAP(
`      <svg viewBox="0 0 360 165" role="img" aria-label="${T("筒縫い","sewing into a tube",l)}">
        <rect x="40" y="55" width="120" height="70" fill="rgba(46,99,180,.06)" stroke="#1B1D1A" stroke-width="2"/>
        <line x1="40" y1="66" x2="160" y2="66" stroke="#C24033" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="100" y="48" text-anchor="middle" font-size="10" fill="#C24033" font-family="sans-serif">${T("長辺を縫う","stitch long edge",l)}</text>
        <text x="100" y="146" text-anchor="middle" font-size="10" fill="#6b6b60" font-family="sans-serif">${T("中表に折る","fold, right sides in",l)}</text>
        <path d="M185,90 Q215,90 228,90" fill="none" stroke="#2E63B4" stroke-width="2"/>
        <path d="M222,84 L232,90 L222,96" fill="none" stroke="#2E63B4" stroke-width="2"/>
        <ellipse cx="290" cy="90" rx="18" ry="34" fill="rgba(46,99,180,.06)" stroke="#1B1D1A" stroke-width="2"/>
        <path d="M290,56 L330,56 M290,124 L330,124" stroke="#1B1D1A" stroke-width="2"/>
        <ellipse cx="330" cy="90" rx="18" ry="34" fill="none" stroke="#1B1D1A" stroke-width="2" stroke-dasharray="4 3"/>
        <text x="308" y="150" text-anchor="middle" font-size="10" fill="#1B1D1A" font-family="sans-serif">${T("表に返す","turn out",l)}</text>
      </svg>`,
    T("中表に折って長辺を縫い、表に返すと筒になる。","Fold right sides together, sew the long edge, and turn it out into a tube.", l)),

  /* ゴム通し — elastic casing (reused from the tips guides) */
  casing: (l) => WRAP(
`      <svg viewBox="0 0 360 170" role="img" aria-label="${T("ゴム通しの断面","elastic casing cross-section",l)}">
        <path d="M40,60 L320,60 L320,150 L40,150" fill="none" stroke="#1B1D1A" stroke-width="2"/>
        <path d="M40,60 L320,60 L320,96 L40,96" fill="rgba(46,99,180,.06)" stroke="#1B1D1A" stroke-width="2"/>
        <line x1="40" y1="90" x2="320" y2="90" stroke="#C24033" stroke-width="1.5" stroke-dasharray="6 4"/>
        <ellipse cx="180" cy="78" rx="120" ry="7" fill="#E0A23C" opacity=".7"/>
        <text x="180" y="50" text-anchor="middle" font-size="11" fill="#1B1D1A" font-family="sans-serif">${T("折り返してトンネルを作る","fold to make a channel",l)}</text>
        <text x="300" y="82" text-anchor="end" font-size="10" fill="#9a7b25" font-family="sans-serif">${T("ゴム","elastic",l)}</text>
        <text x="300" y="108" text-anchor="end" font-size="10" fill="#C24033" font-family="sans-serif">${T("縫い","stitch",l)}</text>
      </svg>`,
    T("布端を折り返して縫い、できたトンネルにゴムを通す。","Fold the edge under and stitch; thread the elastic through the channel.", l)),

  /* バイアス始末 — bias binding a curved edge (reused) */
  bias: (l) => WRAP(
`      <svg viewBox="0 0 360 165" role="img" aria-label="${T("バイアステープでくるむ断面","bias binding cross-section",l)}">
        <rect x="120" y="70" width="180" height="22" fill="rgba(46,99,180,.06)" stroke="#1B1D1A" stroke-width="2"/>
        <path d="M150,52 L120,52 Q104,52 104,68 L104,94 Q104,110 120,110 L150,110" fill="none" stroke="#C24033" stroke-width="2.5"/>
        <line x1="135" y1="58" x2="135" y2="104" stroke="#1B1D1A" stroke-width="1.2" stroke-dasharray="5 4"/>
        <text x="240" y="66" text-anchor="middle" font-size="11" fill="#1B1D1A" font-family="sans-serif">${T("布端（首ぐり等）","edge (neckline)",l)}</text>
        <text x="92" y="40" text-anchor="middle" font-size="11" fill="#C24033" font-family="sans-serif">${T("バイアステープ","bias tape",l)}</text>
        <text x="135" y="128" text-anchor="middle" font-size="10" fill="#1B1D1A" font-family="sans-serif">${T("縫い","stitch",l)}</text>
      </svg>`,
    T("首ぐり・そでぐりなどの布端をテープでくるみ、際を縫う。","Wrap a curved edge such as a neckline with tape and stitch close to it.", l)),

  /* ニットの縫い — straight vs zigzag on knits (reused) */
  knit: (l) => WRAP(
`      <svg viewBox="0 0 360 165" role="img" aria-label="${T("直線縫いとジグザグ","straight vs zigzag stitch",l)}">
        <line x1="40" y1="50" x2="320" y2="50" stroke="#1B1D1A" stroke-width="2.5" stroke-dasharray="14 6"/>
        <line x1="176" y1="40" x2="188" y2="60" stroke="#C24033" stroke-width="2.5"/>
        <line x1="188" y1="40" x2="176" y2="60" stroke="#C24033" stroke-width="2.5"/>
        <text x="40" y="80" font-size="11" fill="#1B1D1A" font-family="sans-serif">${T("直線縫い → 伸びると糸が切れる","Straight stitch → snaps when stretched",l)}</text>
        <polyline points="${Array.from({ length: 19 }, (_, i) => `${40 + i * 15},${i % 2 ? 120 : 134}`).join(" ")}" fill="none" stroke="#2E63B4" stroke-width="2.5"/>
        <text x="40" y="158" font-size="11" fill="#2E63B4" font-family="sans-serif">${T("ジグザグ → よく伸びる","Zigzag → stretches well",l)}</text>
      </svg>`,
    T("ニットは細かいジグザグ（または伸縮ステッチ）で縫うと糸が切れにくい。","For knits, use a narrow zigzag (or stretch stitch) so the thread won't snap.", l))
};

/* pattern key -> star technique figure */
const FIG_MAP = {
  // adult clothes
  tee:"knit", skirt:"casing", gather:"casing", apron:"mitsuori", tunic:"mitsuori",
  camisole:"bias", sleevedress:"bias", onepiece:"mitsuori", blouse:"mitsuori",
  jacket:"mitsuori", coat:"mitsuori", flareskirt:"casing", adultgather:"casing",
  widepants:"casing", halfpants:"casing", mermaid:"casing", pants:"casing", mask:"mitsuori",
  // kids
  kidstee:"knit", kidsdress:"turnout", smock:"casing", kidsvest:"turnout", kidshalf:"casing",
  // baby
  bloomers:"casing", swaddle:"turnout", stai:"turnout", bandanastai:"turnout",
  babyhat:"turnout", legwarmer:"tube",
  // small / accessories
  kinchaku:"casing", shuushu:"tube", bowtie:"turnout", placemat:"turnout",
  bookcover:"mitsuori", headband:"tube", sacoche:"turnout", tissuecase:"mitsuori",
  shoesbag:"casing", gymbag:"casing", bandana:"mitsuori", azuma:"mitsuori",
  movepocket:"turnout", kincgusset:"gusset", fittedmask:"bias",
  // bags
  tote:"gusset", pouch:"turnout", pouchgusset:"gusset", gamaguchi:"turnout",
  panel:"turnout", clutchbag:"turnout", shoulderbag:"gusset",
  // pets
  dog:"bias", dogsleeved:"tube", mannerbelt:"turnout", petbandana:"casing",
  petsnood:"tube", catfuku:"bias", petvest:"bias",
  // home
  tablecloth:"mitsuori", pillowcase:"turnout", cushioncover:"turnout"
};

/* returns the figure HTML for a pattern key, or "" if unmapped */
function figFor(key, lang) {
  const id = FIG_MAP[key];
  return id && FIGS[id] ? FIGS[id](lang === "en" ? "en" : "ja") : "";
}

module.exports = { FIGS, FIG_MAP, figFor };
