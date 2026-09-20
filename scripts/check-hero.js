#!/usr/bin/env node
/* ============================================================
   完成イメージ図が型紙と一致しているかを検算します。

   図は patterns.js のポリゴンから組み立てているので「同じ数字を使った」
   ことは自明ですが、それでは何も確かめたことになりません。ここでは
   図の各部の寸法を、利用者が画面で入力する値（バスト・ウエスト・袖丈…）
   と直接突き合わせます。製図の途中式を通さない独立した検算です。

   全プリセット（S/M/L/LL）とパラメータの最小・最大で回します。
   Run: node scripts/check-hero.js   （1件でも合わなければ終了コード1）
   ============================================================ */
const { loadPatterns, BUILDERS } = require("./hero-from-pattern.js");

const cm = v => v * 10;
const TOL = 1.0;          // mm。曲線の端点まわりで1mm程度は許容する

/* 図のどの寸法が、どの入力値から出るはずか */
const EXPECT = {
  onepiece: p => ({
    bodiceLen:    cm(p.bodice),
    sleeveLen:    cm(p.sleeveL),
    shoulderHalf: cm(p.shoulder) / 2,
    /* 身頃の最大幅。ウエストや肩幅を極端に大きくすると、バストではなく
       そちらが最大になる（実際 waist=110 / shoulder=50 でそうなる）。 */
    bustHalf:     Math.max(cm(p.bust + p.ease) / 4, cm(p.waist) / 4, cm(p.shoulder) / 2),
    waistHalf:    cm(p.waist) / 4,
    hemHalf:      cm(p.hip) / 4 + cm(p.flare),
    neckHalf:     cm(p.neckw) / 2,
    cuff:         cm(p.cuff),
  }),
  /* bustHalf（身頃の最大幅）は、肩を広げると袖ぐりのぶん（＋3cm）が
     バスト幅を追い越すので、入力値と1対1で対応しません。素直に対応する
     着丈・袖丈・衿ぐり・袖口だけを検算します。 */
  tee: p => ({
    bodiceLen: cm(p.len),
    sleeveLen: cm(p.sleeve),
    neckHalf:  cm(p.neckw) / 2,
    cuff:      cm(p.cuff),
  }),
  kidstee: p => ({
    bodiceLen: cm(p.len),
    sleeveLen: cm(p.sleeve),
    neckHalf:  cm(p.neckw) / 2,
    cuff:      cm(p.cuff),
  }),
  skirt: p => ({
    waistHalf: cm(p.waist) / 4,
    hemHalf:   cm(p.hip) / 4 + cm(p.flare),
  }),
  petblanket:  p => ({ w: cm(p.w), h: cm(p.h) }),
  petmat:      p => ({ w: cm(p.w), h: cm(p.h) }),
  tote:        p => ({ w: cm(p.w), h: cm(p.h), handleLen: cm(p.hl) }),
  kinchaku:    p => ({ w: cm(p.w), h: cm(p.h) }),
  pouch:       p => ({ w: cm(p.w), h: cm(p.h) }),
  sacoche:     p => ({ w: cm(p.w), h: cm(p.h), strapLen: cm(p.strapL) }),
  shoulderbag: p => ({ w: cm(p.w), h: cm(p.h), strapLen: cm(p.strapl) }),
  ehonbag:     p => ({ w: cm(p.w), h: cm(p.h), handleLen: cm(p.handle) }),
  clutchbag:   p => ({ w: cm(p.w), h: cm(p.h) }),
  bostonbag:   p => ({ w: cm(p.w), h: cm(p.h), handleLen: cm(p.handle) }),
  backpack:    p => ({ w: cm(p.w), h: cm(p.h), strapLen: cm(p.strap) }),
  tunic: p => ({
    bodiceLen: cm(p.len),
    sleeveLen: cm(p.sleeve),
    neckHalf:  cm(p.neckw) / 2,
    cuff:      cm(p.cuff),
  }),
  camisole: p => ({ bodiceLen: cm(p.len), bustHalf: cm(p.bust + p.ease) / 4, strapLen: cm(p.strapl) }),
  kidstank: p => ({ bodiceLen: cm(p.len), bustHalf: cm(p.chest + p.ease) / 4 }),
  dolman:   p => ({ bodiceLen: cm(p.len), reachHalf: cm(p.reach) }),
  /* パンツ類：前身頃1枚の幅＝(ヒップ＋ゆとり)/4、総丈＝折り返し＋股上＋股下。
     カーゴだけ型紙の高さに折り返しを含めない作図なので股上＋股下で見る。 */
  widepants:    p => ({ waistHalf: cm(p.hip + p.ease) / 4, length: cm(p.casing + p.rise + p.inseam) }),
  halfpants:    p => ({ waistHalf: cm(p.hip + p.ease) / 4, length: cm(p.casing + p.rise + p.inseam) }),
  taperedpants: p => ({ waistHalf: cm(p.hip + p.ease) / 4, length: cm(p.casing + p.rise + p.inseam) }),
  sweatpants:   p => ({ waistHalf: cm(p.hip + p.ease) / 4, length: cm(p.casing + p.rise + p.inseam) }),
  culotte:      p => ({ waistHalf: cm(p.hip + p.ease) / 4, length: cm(p.casing + p.rise + p.inseam) }),
  cargopants:   p => ({ waistHalf: cm(p.hip + p.ease) / 4, length: cm(p.rise + p.inseam) }),
  pants:        p => ({ waistHalf: cm(p.hip + p.ease) / 4, length: cm(p.casing + p.rise + p.inseam) }),
  kidshalf:     p => ({ waistHalf: cm(p.hip + p.ease) / 4, length: cm(p.casing + p.rise + p.inseam) }),
  /* ベスト：前身頃の脇幅＝(バスト＋ゆとり)/4、着丈＝len */
  adultvest: p => ({ bodiceLen: cm(p.len), bustHalf: cm(p.bust + p.ease) / 4 }),
  kidsvest:  p => ({ bodiceLen: cm(p.len), bustHalf: cm(p.bust + p.ease) / 4 }),
  /* カーディガン：Tシャツと同じ検算（着丈・袖丈・衿ぐり・袖口） */
  cardigan: p => ({ bodiceLen: cm(p.len), sleeveLen: cm(p.sleeve), neckHalf: cm(p.neckw) / 2, cuff: cm(p.cuff) }),
  /* エプロン：本体の丈と幅（片側）を検算。ひもは飾りなので対象外。
     胸当てエプロンは丈＝len。お食事エプロンは首ぐりのぶん丈が伸びるので幅だけ。 */
  apron:        p => ({ length: cm(p.len), hemW: cm(p.hip) / 2, topW: cm(p.chest) / 2 }),
  cafeapron:    p => ({ length: cm(p.len), hemW: cm(p.w) / 2 }),
  kidsapron:    p => ({ length: cm(p.len), hemW: cm(p.skirtw) }),
  kidsbibapron: p => ({ hemW: cm(p.w) / 2 }),
  /* 角丸の一枚もの：仕上がりの外形そのもの */
  babyblanket: p => ({ w: cm(p.w), h: cm(p.h) }),
  napmat:      p => ({ w: cm(p.w), h: cm(p.l) }),
  picnicmat:   p => ({ w: cm(p.w), h: cm(p.d) }),
  doormat:     p => ({ w: cm(p.w), h: cm(p.h) }),
};

function casesFor(pat) {
  const base = Object.fromEntries(pat.params.map(x => [x.key, x.val]));
  const out = pat.presets.map(pr => [`preset ${pr.label}`, { ...base, ...pr.vals }]);
  for (const prm of pat.params) {
    out.push([`${prm.key}=min(${prm.min})`, { ...base, [prm.key]: prm.min }]);
    out.push([`${prm.key}=max(${prm.max})`, { ...base, [prm.key]: prm.max }]);
  }
  return out;
}

const P = loadPatterns();
const bad = [];
let checks = 0;

for (const key of Object.keys(BUILDERS)) {
  const pat = P[key];
  for (const [label, vals] of casesFor(pat)) {
    let got;
    try {
      got = BUILDERS[key](P, vals).dims;
    } catch (e) {
      bad.push(`${key} ${label}: 例外 ${e.message}`);
      continue;
    }
    const want = EXPECT[key](vals);
    for (const [k, v] of Object.entries(want)) {
      checks++;
      if (!Number.isFinite(got[k])) { bad.push(`${key} ${label}: ${k} が数値でない (${got[k]})`); continue; }
      const diff = Math.abs(got[k] - v);
      if (diff > TOL) bad.push(`${key} ${label}: ${k} 図=${got[k].toFixed(1)}mm 入力=${v.toFixed(1)}mm 差${diff.toFixed(1)}mm`);
    }
  }
}

if (bad.length) {
  console.error(`完成イメージ図の寸法が型紙と合いません（${bad.length}件 / ${checks}項目）`);
  bad.slice(0, 40).forEach(m => console.error("  " + m));
  process.exit(1);
}
console.log(`完成イメージ図：${checks}項目すべて型紙の入力値と一致（許容±${TOL}mm）`);
