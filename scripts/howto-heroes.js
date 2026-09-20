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

  ehonbag: {
    vals: {},
    shown: { ja: "幅40cm・丈30cm・持ち手34cm", en: "40 × 30 cm, 34 cm handles" },
    aria: {
      ja: "絵本バッグ（レッスンバッグ）の完成イメージ。マチなしの平らなトートに持ち手2本",
      en: "Finished lesson bag: a flat tote with no gusset and two handles",
    },
    labels: [
      { at: "handle",  ja: "持ち手",         en: "Handles" },
      { at: "opening", ja: "袋口を三つ折り", en: "Folded opening" },
      { at: "body",    ja: "本体（底でわ）", en: "Body (fold at base)" },
    ],
    caption: CAP,
  },

  clutchbag: {
    vals: {},
    shown: { ja: "幅24cm・丈16cm・フラップ9cm", en: "24 × 16 cm, 9 cm flap" },
    aria: {
      ja: "クラッチバッグの完成イメージ。平らな本体にかぶせ蓋",
      en: "Finished clutch bag: a flat body with a fold-over flap",
    },
    labels: [
      { at: "flap", ja: "かぶせ蓋",   en: "Flap" },
      { at: "body", ja: "本体",       en: "Body" },
      { at: "fold", ja: "底は「わ」", en: "Fold at the base" },
    ],
    caption: CAP,
  },

  bostonbag: {
    vals: {},
    shown: { ja: "幅45cm・丈28cm・マチ20cm・持ち手52cm", en: "45 × 28 cm, 20 cm gusset, 52 cm handles" },
    aria: {
      ja: "ボストンバッグの完成イメージ。角丸の本体に持ち手2本、口はファスナー",
      en: "Finished Boston bag: a rounded body with two handles and a zip opening",
    },
    labels: [
      { at: "handle",  ja: "持ち手",       en: "Handles" },
      { at: "opening", ja: "ファスナー口", en: "Zip opening" },
      { at: "body",    ja: "本体",         en: "Body" },
    ],
    caption: CAP,
  },

  backpack: {
    vals: {},
    shown: { ja: "幅28cm・丈36cm・マチ12cm・フラップ16cm・肩ひも75cm", en: "28 × 36 cm, 12 cm gusset, 16 cm flap, 75 cm straps" },
    aria: {
      ja: "リュックサックの完成イメージ。本体にかぶせ蓋、背中側から肩ひも",
      en: "Finished backpack: a body with a fold-over flap and shoulder straps",
    },
    labels: [
      { at: "strap", ja: "肩ひも",     en: "Shoulder straps" },
      { at: "flap",  ja: "かぶせ蓋",   en: "Flap" },
      { at: "body",  ja: "本体",       en: "Body" },
    ],
    caption: CAP,
  },

  tunic: {
    vals: {},
    shown: { ja: "バスト100cm・着丈84cm・袖丈46cm", en: "100 cm bust, 84 cm length, 46 cm sleeves" },
    aria: {
      ja: "チュニックの完成イメージ。丈の長いドロップショルダーのボックスシルエット",
      en: "Finished tunic: a long boxy drop-shoulder silhouette with sleeves",
    },
    labels: [
      { at: "neck",   ja: "衿ぐりの始末", en: "Neckline finish" },
      { at: "sleeve", ja: "袖を付ける",   en: "Sleeve" },
      { at: "side",   ja: "脇を縫う",     en: "Side seam" },
      { at: "hem",    ja: "裾は三つ折り", en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  camisole: {
    vals: {},
    shown: { ja: "バスト92cm・着丈60cm・肩ひも28cm", en: "92 cm bust, 60 cm length, 28 cm straps" },
    aria: {
      ja: "キャミソールの完成イメージ。前後の身頃に肩ひも2本",
      en: "Finished camisole: front and back bodice with two shoulder straps",
    },
    labels: [
      { at: "strap", ja: "肩ひも",       en: "Shoulder straps" },
      { at: "neck",  ja: "衿ぐり",       en: "Neckline" },
      { at: "hem",   ja: "裾は三つ折り", en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  kidstank: {
    vals: {},
    shown: { ja: "胸囲58cm・着丈36cm", en: "58 cm chest, 36 cm length" },
    aria: {
      ja: "キッズタンクトップの完成イメージ。肩ひもも身頃と続きの一枚",
      en: "Finished kids' tank top: straps cut in one with the body",
    },
    labels: [
      { at: "neck", ja: "衿ぐり",       en: "Neckline" },
      { at: "arm",  ja: "袖ぐり",       en: "Armhole" },
      { at: "hem",  ja: "裾は三つ折り", en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  dolman: {
    vals: {},
    shown: { ja: "バスト96cm・着丈60cm・リーチ52cm", en: "96 cm bust, 60 cm length, 52 cm reach" },
    aria: {
      ja: "ドルマンスリーブトップスの完成イメージ。袖が身頃と続きのバットウィング",
      en: "Finished dolman-sleeve top: a batwing with the sleeve cut in one with the body",
    },
    labels: [
      { at: "neck", ja: "衿ぐり",       en: "Neckline" },
      { at: "cuff", ja: "袖口",         en: "Cuff" },
      { at: "hem",  ja: "裾は三つ折り", en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  /* ---- パンツ類（正面の見え姿） ----
     どれも「前後同じ一枚」を左右2本に組み立てた正面図。ラベルは共通。 */
  widepants: {
    vals: {},
    shown: { ja: "ヒップ96cm・股上30cm・股下66cm", en: "96 cm hip, 30 cm rise, 66 cm inseam" },
    aria: {
      ja: "ワイドパンツの完成イメージ。ウエストゴムでまっすぐ落ちる幅広の2本脚",
      en: "Finished wide-leg pants: two straight, roomy legs with an elastic waist",
    },
    labels: [
      { at: "waist",  ja: "ウエストはゴム",   en: "Elastic waist" },
      { at: "crotch", ja: "中心・股ぐりを縫う", en: "Center & crotch seam" },
      { at: "side",   ja: "脇を縫う",         en: "Side seam" },
      { at: "hem",    ja: "裾は三つ折り",     en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  halfpants: {
    vals: {},
    shown: { ja: "ヒップ96cm・股上28cm・股下26cm", en: "96 cm hip, 28 cm rise, 26 cm inseam" },
    aria: {
      ja: "ハーフパンツの完成イメージ。ウエストゴムの短い2本脚",
      en: "Finished half pants: short two-leg shorts with an elastic waist",
    },
    labels: [
      { at: "waist",  ja: "ウエストはゴム",   en: "Elastic waist" },
      { at: "crotch", ja: "中心・股ぐりを縫う", en: "Center & crotch seam" },
      { at: "side",   ja: "脇を縫う",         en: "Side seam" },
      { at: "hem",    ja: "裾は三つ折り",     en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  taperedpants: {
    vals: {},
    shown: { ja: "ヒップ94cm・股下66cm・裾幅19cm", en: "94 cm hip, 66 cm inseam, 19 cm hem width" },
    aria: {
      ja: "テーパードパンツの完成イメージ。裾に向かって細くなる2本脚",
      en: "Finished tapered pants: two legs narrowing toward the hem",
    },
    labels: [
      { at: "waist",  ja: "ウエストはゴム",   en: "Elastic waist" },
      { at: "crotch", ja: "中心・股ぐりを縫う", en: "Center & crotch seam" },
      { at: "side",   ja: "脇を縫う",         en: "Side seam" },
      { at: "hem",    ja: "裾は三つ折り",     en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  sweatpants: {
    vals: {},
    shown: { ja: "ヒップ96cm・股下64cm・裾幅20cm", en: "96 cm hip, 64 cm inseam, 20 cm hem width" },
    aria: {
      ja: "スウェットパンツの完成イメージ。裾を絞ったリラックスシルエットの2本脚",
      en: "Finished sweatpants: a relaxed two-leg silhouette gathered at the hem",
    },
    labels: [
      { at: "waist",  ja: "ウエストはゴム",   en: "Elastic waist" },
      { at: "crotch", ja: "中心・股ぐりを縫う", en: "Center & crotch seam" },
      { at: "side",   ja: "脇を縫う",         en: "Side seam" },
      { at: "hem",    ja: "裾はリブ",         en: "Ribbed hem" },
    ],
    caption: CAP,
  },

  culotte: {
    vals: {},
    shown: { ja: "ヒップ94cm・股下42cm・フレア12cm", en: "94 cm hip, 42 cm inseam, 12 cm flare" },
    aria: {
      ja: "キュロットの完成イメージ。スカートのように広がる2本脚",
      en: "Finished culotte: two wide legs that flare out like a skirt",
    },
    labels: [
      { at: "waist",  ja: "ウエストはゴム",   en: "Elastic waist" },
      { at: "crotch", ja: "中心・股ぐりを縫う", en: "Center & crotch seam" },
      { at: "side",   ja: "脇を縫う",         en: "Side seam" },
      { at: "hem",    ja: "裾は三つ折り",     en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  cargopants: {
    vals: {},
    shown: { ja: "ヒップ92cm・股下70cm・裾まわり40cm", en: "92 cm hip, 70 cm inseam, 40 cm hem circumference" },
    aria: {
      ja: "カーゴパンツの完成イメージ。ウエストゴムのワークパンツ（脇に貼りポケット）",
      en: "Finished cargo pants: elastic-waist work pants (with side patch pockets)",
    },
    labels: [
      { at: "waist",  ja: "ウエストはゴム",   en: "Elastic waist" },
      { at: "crotch", ja: "中心・股ぐりを縫う", en: "Center & crotch seam" },
      { at: "side",   ja: "脇にポケット",     en: "Side pocket" },
      { at: "hem",    ja: "裾は三つ折り",     en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  pants: {
    vals: {},
    shown: { ja: "ヒップ68cm・股上24cm・股下30cm", en: "68 cm hip, 24 cm rise, 30 cm inseam" },
    aria: {
      ja: "キッズパンツの完成イメージ。ウエストゴムのゆったり2本脚",
      en: "Finished kids' pants: roomy two-leg pants with an elastic waist",
    },
    labels: [
      { at: "waist",  ja: "ウエストはゴム",   en: "Elastic waist" },
      { at: "crotch", ja: "中心・股ぐりを縫う", en: "Center & crotch seam" },
      { at: "side",   ja: "脇を縫う",         en: "Side seam" },
      { at: "hem",    ja: "裾は三つ折り",     en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  kidshalf: {
    vals: {},
    shown: { ja: "ヒップ60cm・股上21cm・股下14cm", en: "60 cm hip, 21 cm rise, 14 cm inseam" },
    aria: {
      ja: "キッズハーフパンツの完成イメージ。ウエストゴムの短い2本脚",
      en: "Finished kids' half pants: short two-leg shorts with an elastic waist",
    },
    labels: [
      { at: "waist",  ja: "ウエストはゴム",   en: "Elastic waist" },
      { at: "crotch", ja: "中心・股ぐりを縫う", en: "Center & crotch seam" },
      { at: "side",   ja: "脇を縫う",         en: "Side seam" },
      { at: "hem",    ja: "裾は三つ折り",     en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  /* ---- ベスト（正面の見え姿） ---- */
  adultvest: {
    vals: {},
    shown: { ja: "バスト96cm・着丈58cm・V衿深さ18cm", en: "96 cm bust, 58 cm length, 18 cm V-neck depth" },
    aria: {
      ja: "ベストの完成イメージ。前開きのV衿、袖なしの身頃",
      en: "Finished vest: a front-opening V-neck sleeveless body",
    },
    labels: [
      { at: "neck", ja: "V衿・前開き",   en: "V-neck front opening" },
      { at: "arm",  ja: "袖ぐりの始末", en: "Armhole finish" },
      { at: "hem",  ja: "裾は三つ折り", en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  kidsvest: {
    vals: {},
    shown: { ja: "バスト62cm・着丈34cm・肩幅26cm", en: "62 cm chest, 34 cm length, 26 cm shoulders" },
    aria: {
      ja: "キッズベストの完成イメージ。丸首・袖なしの身頃",
      en: "Finished kids' vest: a round-neck sleeveless body",
    },
    labels: [
      { at: "neck", ja: "丸首の衿ぐり", en: "Round neckline" },
      { at: "arm",  ja: "袖ぐりの始末", en: "Armhole finish" },
      { at: "hem",  ja: "裾は三つ折り", en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  cardigan: {
    vals: {},
    shown: { ja: "バスト98cm・着丈62cm・袖丈52cm", en: "98 cm bust, 62 cm length, 52 cm sleeves" },
    aria: {
      ja: "カーディガンの完成イメージ。前開き・丸首のドロップショルダー、長袖",
      en: "Finished cardigan: a front-opening round-neck drop-shoulder with long sleeves",
    },
    labels: [
      { at: "neck",   ja: "丸首・前開き",   en: "Round neck, front opening" },
      { at: "sleeve", ja: "袖を付ける",     en: "Sleeve" },
      { at: "side",   ja: "脇を縫う",       en: "Side seam" },
      { at: "hem",    ja: "裾は三つ折り",   en: "Double-fold hem" },
    ],
    caption: CAP,
  },

  /* ---- 角丸の一枚もの（マット・ケット類） ---- */
  babyblanket: {
    vals: {},
    shown: { ja: "幅80cm・長さ100cm・角丸5cm", en: "80 × 100 cm, 5 cm rounded corners" },
    aria: {
      ja: "お昼寝ケットの完成イメージ。角を丸くした長方形、まわりをステッチ",
      en: "Finished nap blanket: a rounded rectangle topstitched around the edge",
    },
    labels: [
      { at: "corner", ja: "角は丸く",             en: "Rounded corners" },
      { at: "edge",   ja: "まわりをステッチ",     en: "Topstitch the edge" },
      { at: "center", ja: "2枚を中表に縫って返す", en: "Two layers, sewn and turned" },
    ],
    caption: CAP,
  },

  napmat: {
    vals: {},
    shown: { ja: "幅70cm・長さ120cm・角丸5cm", en: "70 × 120 cm, 5 cm rounded corners" },
    aria: {
      ja: "お昼寝マットの完成イメージ。角を丸くした長方形、まわりをステッチ",
      en: "Finished nap mat: a rounded rectangle topstitched around the edge",
    },
    labels: [
      { at: "corner", ja: "角は丸く",         en: "Rounded corners" },
      { at: "edge",   ja: "まわりをステッチ", en: "Topstitch the edge" },
      { at: "center", ja: "中に綿を入れる",   en: "Add batting inside" },
    ],
    caption: CAP,
  },

  picnicmat: {
    vals: {},
    shown: { ja: "幅140cm・奥行100cm・角丸6cm", en: "140 × 100 cm, 6 cm rounded corners" },
    aria: {
      ja: "レジャーシートの完成イメージ。角を丸くした大きな長方形、まわりをステッチ",
      en: "Finished picnic mat: a large rounded rectangle topstitched around the edge",
    },
    labels: [
      { at: "corner", ja: "角は丸く",             en: "Rounded corners" },
      { at: "edge",   ja: "まわりをステッチ",     en: "Topstitch the edge" },
      { at: "center", ja: "裏に防水布を合わせる", en: "Back with waterproof fabric" },
    ],
    caption: CAP,
  },

  doormat: {
    vals: {},
    shown: { ja: "幅60cm・奥行38cm・角丸3cm", en: "60 × 38 cm, 3 cm rounded corners" },
    aria: {
      ja: "玄関マットの完成イメージ。角を丸くした長方形、まわりをステッチ",
      en: "Finished doormat: a rounded rectangle topstitched around the edge",
    },
    labels: [
      { at: "corner", ja: "角は丸く",           en: "Rounded corners" },
      { at: "edge",   ja: "まわりをステッチ",   en: "Topstitch the edge" },
      { at: "center", ja: "中に芯を入れてもOK", en: "Add batting if you like" },
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
