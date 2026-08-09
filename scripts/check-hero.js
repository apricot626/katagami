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
