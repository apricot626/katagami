/* ============================================================
   型紙（patterns.js）から完成イメージ図を組み立てます。
   手描きの座標を持たず、gen() が返す出来上がり線ポリゴンだけを使うので、
   型紙を直せば図も一緒に動きます。図の寸法は型紙と同一物です。

   図として決めているのは腕の角度（ARM_ANGLE）だけです。正面図に立体を
   落とすときの作図上の約束で、これ以外の寸法はすべて型紙から取ります。

   単位は patterns.js と同じ mm（cm = v*10）。
   ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");

/* 腕が垂直から外へ開く角度。フラット画の慣習で15〜20度。 */
const ARM_ANGLE = 16;

let _patterns = null;
function loadPatterns() {
  if (_patterns) return _patterns;            // 260ページ分呼ばれるので1回だけ読む
  const box = { window: {}, console };
  vm.createContext(box);
  vm.runInContext(
    fs.readFileSync(path.join(ROOT, "patterns.js"), "utf8") + ";globalThis.__P=PATTERNS;",
    box);
  return (_patterns = box.__P);
}

const bbox = pts => ({
  x0: Math.min(...pts.map(p => p.x)), x1: Math.max(...pts.map(p => p.x)),
  y0: Math.min(...pts.map(p => p.y)), y1: Math.max(...pts.map(p => p.y)),
});
const mirror = pts => pts.map(p => ({ x: -p.x, y: p.y }));
const shiftY = (pts, dy) => pts.map(p => ({ x: p.x, y: p.y + dy }));
/* 「わ」で裁つ半身を左右に開く */
const openFold = pts => pts.concat(mirror(pts.slice().reverse()));
const near = (a, b) => Math.abs(a - b) < 0.01;

/* 袖：肩先から袖山を曲線で回し、二の腕→袖口→脇下と閉じる。s=-1 で左右反転 */
const sleevePath = (S, s) => {
  const f = p => `${(p.x * s).toFixed(1)},${p.y.toFixed(1)}`;
  return `M${f(S.start)} Q${f(S.cap)} ${f(S.bicep)} L${f(S.cuffOut)} L${f(S.cuffIn)} L${f(S.underarm)} Z`;
};
const poly = pts => "M" + pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L") + " Z";
const line = pts => "M" + pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L");

/* ---- ワンピース（袖付き） ---------------------------------
   前身頃・スカートは「わ」で開いて正面に、袖は肩先と脇下に接続します。 */
function onepiece(P, vals, opts = {}) {
  const { pieces } = P.onepiece.gen(vals, 0);          // 縫い代0＝出来上がり線
  const [front, , skirt, sleeve] = pieces;
  const fPts = front.finished, sPts = skirt.finished, slPts = sleeve.finished;
  const bF = bbox(fPts), bS = bbox(sPts), bSl = bbox(slPts);

  const BL = bF.y1;                                    // ボディス丈
  const shoulder = fPts.filter(p => near(p.y, 0)).reduce((a, p) => p.x > a.x ? p : a);
  const neckEnd = fPts.filter(p => near(p.y, 0)).reduce((a, p) => p.x < a.x ? p : a);
  const underarm = front.notches[0];                   // 型紙が宣言している脇下
  const waistHalf = Math.max(...fPts.filter(p => near(p.y, bF.y1)).map(p => p.x));

  /* 袖：二の腕の見え幅＝袖幅の半分。袖丈・袖山・袖口はパーツの実寸から。 */
  const bicepHalf = bSl.x1 / 2;
  const hemXs = slPts.filter(p => near(p.y, bSl.y1)).map(p => p.x);
  const cuffHalf = (Math.max(...hemXs) - Math.min(...hemXs)) / 2;
  const SL = bSl.y1;
  const capH = Math.min(...slPts.filter(p => p.y > 0).map(p => p.y));

  const th = (opts.armAngle ?? ARM_ANGLE) * Math.PI / 180;
  const ax = { x: Math.sin(th), y: Math.cos(th) };     // 腕の軸（下・外向き）
  const nx = { x: Math.cos(th), y: -Math.sin(th) };    // 軸に直交・外向き
  const add = (p, v, k) => ({ x: p.x + v.x * k, y: p.y + v.y * k });

  const bicepOut = add(underarm, nx, bicepHalf);       // 二の腕の外側
  const cuffOut = add(bicepOut, ax, SL - capH);        // 袖口の外側
  /* 正面図に見えるのは筒の半分。二の腕も袖口も「半分の幅」で描く。 */
  const cuffIn = add(cuffOut, nx, -cuffHalf);          // 袖口の内側
  /* 肩先から二の腕までは袖山のふくらみ。直線だと翼のように見えるので
     袖山の高さぶんだけ外へ張り出す2次曲線にする。 */
  const capBulge = add(
    { x: (shoulder.x + bicepOut.x) / 2, y: (shoulder.y + bicepOut.y) / 2 },
    nx, capH * 1.2);
  const sleeveR = { start: shoulder, cap: capBulge, bicep: bicepOut,
                    cuffOut, cuffIn, underarm };

  /* 衿ぐり曲線（中心の前下がりから肩側の端まで） */
  const neckIdx = fPts.findIndex(p => near(p.y, 0));
  const neckCurve = fPts.slice(0, neckIdx + 1);
  /* スカートの裾曲線（下端に沿う点列） */
  const hemCurve = sPts.filter(p => p.y > bS.y1 * 0.97);

  const bodice = openFold(fPts);
  const skirtFull = shiftY(openFold(sPts), BL);

  return {
    /* 奥から手前の順。境界がそのまま縫い目に見える */
    parts: [
      { role: "sleeve", d: sleevePath(sleeveR, 1) },
      { role: "sleeve", d: sleevePath(sleeveR, -1) },
      { role: "skirt",  d: poly(skirtFull) },
      { role: "bodice", d: poly(bodice) },
    ],
    /* 赤い破線＝縫う線。位置はすべて型紙由来 */
    seams: [
      line(neckCurve.concat(mirror(neckCurve.slice().reverse()))),
      line([{ x: -waistHalf, y: BL }, { x: waistHalf, y: BL }]),
      line(shiftY(hemCurve.concat(mirror(hemCurve.slice().reverse())), BL)),
      line([cuffOut, cuffIn]),
      line(mirror([cuffOut, cuffIn])),
    ],
    /* ドレープ線。寸法ではなく布の落ち感を示す飾りなので、
       スカートの幅に対する割合で置く。 */
    drape: [0.32, 0.62].flatMap(f => {
      const wTop = waistHalf * f, wBot = bS.x1 * (f * 1.06);
      return [line([{ x: wTop, y: BL + 24 }, { x: wBot, y: BL + bS.y1 - 30 }]),
              line([{ x: -wTop, y: BL + 24 }, { x: -wBot, y: BL + bS.y1 - 30 }])];
    }),
    anchors: {
      neck:   neckEnd,
      sleeve: add(bicepOut, ax, (SL - capH) * 0.5),
      waist:  { x: waistHalf, y: BL },
      skirt:  { x: (waistHalf + bS.x1) * 0.5 + 20, y: BL + bS.y1 * 0.6 },
      hem:    { x: bS.x1 * 0.9, y: BL + bS.y1 - 8 },
    },
    /* audit がこの値と型紙の寸法を突き合わせる（すべて mm） */
    dims: {
      bodiceLen: BL, skirtLen: bS.y1, sleeveLen: SL,
      shoulderHalf: shoulder.x, bustHalf: bF.x1, waistHalf, hemHalf: bS.x1,
      neckHalf: neckEnd.x, neckDrop: fPts[0].y, armholeDepth: underarm.y,
      bicep: bicepHalf * 2, cuff: cuffHalf * 2,
    },
  };
}

const BUILDERS = { onepiece };

/* ---- SVGに起こす ------------------------------------------
   寸法は build の座標をそのまま拡大縮小するだけ。陰影とドレープは
   布の落ち感を示す飾りで、寸法には触れません。 */
function renderSVG(build, { labels, aria, armShade = true }) {
  const nums = s => s.match(/-?\d+(\.\d+)?/g).map(Number);
  const xs = [], ys = [];
  for (const p of build.parts) {
    const n = nums(p.d);
    for (let i = 0; i < n.length; i += 2) { xs.push(n[i]); ys.push(n[i + 1]); }
  }
  const X0 = Math.min(...xs), X1 = Math.max(...xs);
  const Y0 = Math.min(...ys), Y1 = Math.max(...ys);

  const H = 330, k = H / (Y1 - Y0), W = (X1 - X0) * k;
  const PAD = 10, FS = 17;
  /* 全角は約1em、半角は約0.55em。ここを見誤るとラベルが枠の外で切れる */
  const emWidth = t => [...t].reduce((n, c) => n + (/[\u3000-\u9fff\uff00-\uffef]/.test(c) ? 1 : 0.55), 0);
  const COL = Math.round(Math.max(...labels.map(l => emWidth(l.text))) * FS) + 34;
  const VW = Math.round(W + PAD * 2 + COL), VH = Math.round(H + PAD * 2);
  const tx = PAD - X0 * k, ty = PAD - Y0 * k;
  const w = v => (v / k).toFixed(1);                  // 線幅は拡大率で戻す

  const lx = Math.round(PAD + W + 26);
  const step = labels.length > 1 ? (H - 60) / (labels.length - 1) : 0;
  let leaders = "", texts = "";
  labels.forEach((l, i) => {
    const a = build.anchors[l.at];
    const ax = tx + a.x * k, ay = ty + a.y * k, ly = PAD + 30 + step * i;
    leaders += `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${lx - 7}" y2="${(ly - FS * 0.32).toFixed(1)}"/>` +
               `<circle cx="${ax.toFixed(1)}" cy="${ay.toFixed(1)}" r="2.4"/>`;
    texts += `<text x="${lx}" y="${ly.toFixed(1)}">${l.text}</text>`;
  });

  const shade = armShade
    ? `<defs><linearGradient id="hg" x1="0" x2="1">` +
      `<stop offset="0" stop-color="#2E63B4" stop-opacity=".13"/>` +
      `<stop offset=".38" stop-color="#2E63B4" stop-opacity=".05"/>` +
      `<stop offset=".72" stop-color="#2E63B4" stop-opacity=".05"/>` +
      `<stop offset="1" stop-color="#2E63B4" stop-opacity=".13"/></linearGradient></defs>` : "";
  const fill = armShade ? "url(#hg)" : "rgba(46,99,180,.07)";

  return `      <svg viewBox="0 0 ${VW} ${VH}" role="img" aria-label="${aria}">
        ${shade}
        <g transform="translate(${tx.toFixed(2)},${ty.toFixed(2)}) scale(${k.toFixed(4)})">
${build.parts.map(p => `          <path d="${p.d}" fill="${fill}" stroke="#1B1D1A" stroke-width="${w(1.5)}" stroke-linejoin="round" stroke-linecap="round"/>`).join("\n")}
${build.drape.map(d => `          <path d="${d}" fill="none" stroke="#1B1D1A" stroke-width="${w(0.9)}" opacity=".22"/>`).join("\n")}
${build.seams.map(d => `          <path d="${d}" fill="none" stroke="#C24033" stroke-width="${w(1.5)}" stroke-dasharray="${w(6)} ${w(4)}"/>`).join("\n")}
        </g>
        <g stroke="#6b6b60" stroke-width="1" fill="#6b6b60">${leaders}</g>
        <g font-size="${FS}" font-family="sans-serif" fill="#1B1D1A">${texts}</g>
      </svg>`;
}

module.exports = { loadPatterns, BUILDERS, bbox, renderSVG, ARM_ANGLE };
