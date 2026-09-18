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
/* Tシャツの袖を「外・下」へ垂らす角度（水平から下向き）。普通の半袖は
   水平よりだいぶ下がって見えるので、30度前後に置く。 */
const SLEEVE_DROP = 28;

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

const cm = v => v * 10;               // patterns.js と同じ mm 換算
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

/* ---- Tシャツ（袖付きトップス） --------------------------------
   前身頃を「わ」で開いて正面に、袖を肩先に接続します。

   ワンピースとの違いが2つあります。
   ①肩が前下がり（袖ぐりの上端＝肩先が y=0 に来ない）ので、肩先は
     「右上に最も張り出す点」＝x−y が最大の点として取ります。
   ②これは肩を落としたボックスTで、袖山がほぼ0のドロップショルダーです。
     袖ぐりが深い（肩先→脇下で20cm）ため、ワンピースのように袖を「脇下」
     起点で描くと、その深さぶん袖が下にずれて長袖に見えてしまいます。
     袖は肩先を起点にして袖丈ぶん下ろします。 */
function boxTee(pat, vals, opts = {}) {
  const { pieces } = pat.gen(vals, 0);
  const [front, , sleeve] = pieces;
  const fPts = front.finished, slPts = sleeve.finished;
  const bF = bbox(fPts), bSl = bbox(slPts);

  const BL = bF.y1;                                       // 着丈
  const underarm = front.notches[0];                      // 脇下（袖の内側はここへ閉じる）
  const shoulder = fPts.reduce((a, p) => (p.x - p.y) > (a.x - a.y) ? p : a); // 肩先
  const neckIdx = fPts.findIndex(p => near(p.y, 0));
  const neckCurve = fPts.slice(0, neckIdx + 1);
  const neckEnd = fPts[neckIdx];

  const bicepHalf = bSl.x1 / 2;
  const hemXs = slPts.filter(p => near(p.y, bSl.y1)).map(p => p.x);
  const cuffHalf = (Math.max(...hemXs) - Math.min(...hemXs)) / 2;
  const SL = bSl.y1;
  const capH = Math.min(...slPts.filter(p => p.y > 0.5).map(p => p.y));

  /* 袖は肩先(shoulder)と脇下(underarm)から「外・下」へ垂らす。以前は袖ぐりに
     直交する向き（上向き成分あり）に二の腕を置いたため、袖が上を向いていた。
     普通のTシャツの袖は下に垂れるので、水平から下向きの角度で伸ばす。 */
  const drop = (opts.armAngle ?? SLEEVE_DROP) * Math.PI / 180;  // 水平からの下がり角
  const d  = { x: Math.cos(drop), y: Math.sin(drop) };          // 外・下
  const perp = { x: -Math.sin(drop), y: Math.cos(drop) };       // 直交・下向き
  const add = (p, v, k) => ({ x: p.x + v.x * k, y: p.y + v.y * k });

  const cuffOut = add(shoulder, d, SL - capH);            // 袖口の外(上)側＝肩先から袖丈ぶん
  const cuffIn = add(cuffOut, perp, cuffHalf);            // 袖口の内(下)側
  /* 上辺（肩先→袖口）を袖山のぶんだけ軽く外へふくらませる */
  const capMid = add(
    { x: (shoulder.x + cuffOut.x) / 2, y: (shoulder.y + cuffOut.y) / 2 },
    perp, -Math.max(capH, cm(0.4)));
  const f = (p, s) => `${(p.x * s).toFixed(1)},${p.y.toFixed(1)}`;
  const sleevePath2 = s =>
    `M${f(shoulder, s)} Q${f(capMid, s)} ${f(cuffOut, s)} L${f(cuffIn, s)} L${f(underarm, s)} Z`;

  const body = openFold(fPts);
  return {
    parts: [
      { role: "sleeve", d: sleevePath2(1) },
      { role: "sleeve", d: sleevePath2(-1) },
      { role: "body",   d: poly(body) },
    ],
    seams: [
      line(neckCurve.concat(mirror(neckCurve.slice().reverse()))),
      line([{ x: -bF.x1, y: BL }, { x: bF.x1, y: BL }]),   // 裾
      line([cuffOut, cuffIn]),
      line(mirror([cuffOut, cuffIn])),
    ],
    drape: [],
    anchors: {
      neck:   neckEnd,
      sleeve: { x: (cuffOut.x + underarm.x) / 2, y: (cuffOut.y + underarm.y) / 2 },
      side:   { x: bF.x1, y: BL * 0.62 },
      hem:    { x: bF.x1 * 0.5, y: BL },
    },
    dims: {
      bodiceLen: BL, sleeveLen: SL,
      bustHalf: bF.x1, neckHalf: neckEnd.x, cuff: cuffHalf * 2,
    },
  };
}
/* 大人Tシャツと子供Tシャツは同じ構成（前身頃・袖・脇下の合印）なので、
   同じ作図を使い回す。 */
const tee = (P, vals, opts = {}) => boxTee(P.tee, vals, opts);
const kidstee = (P, vals, opts = {}) => boxTee(P.kidstee, vals, opts);

/* ---- スカート（ウエスト〜裾の一枚） ---------------------------
   「わ」で開いて正面の台形に。上端がウエスト、下端が裾。 */
function skirt(P, vals, opts = {}) {
  const { pieces } = P.skirt.gen(vals, 0);
  const sPts = pieces[0].finished;   // 中心ウエスト→右脇→裾→中心裾 の順
  const L = bbox(sPts).y1;
  /* ウエストと裾はまっすぐでなく緩く弧を描きます。丈に対する割合で帯を取ると
     丈が長いとき脇線を巻き込むので、端から辺を辿り、傾きが急になった点＝
     「ほぼ水平なウエスト／裾」から「斜めに落ちる脇線」への角で止めます。
     ウエスト・裾は傾き0.1前後、脇はフレアを効かせても0.6以上なので、
     しきい値0.4で確実に分かれます。 */
  const flat = (a, b) => Math.abs(b.y - a.y) < 0.4 * Math.abs(b.x - a.x);
  let i = 0;
  while (i + 1 < sPts.length && flat(sPts[i], sPts[i + 1])) i++;
  let j = sPts.length - 1;
  while (j - 1 >= 0 && flat(sPts[j], sPts[j - 1])) j--;
  const waistCurve = sPts.slice(0, i + 1);
  const hemCurve = sPts.slice(j);
  const waistHalf = Math.max(...waistCurve.map(p => p.x));
  const hemHalf = Math.max(...hemCurve.map(p => p.x));

  return {
    parts: [{ role: "skirt", d: poly(openFold(sPts)) }],
    seams: [
      line(waistCurve.concat(mirror(waistCurve.slice().reverse()))),  // ウエスト
      line(hemCurve.concat(mirror(hemCurve.slice().reverse()))),      // 裾
    ],
    /* 布の落ち感（飾り）。ウエスト幅に対する割合で置く */
    drape: [0.4, 0.72].flatMap(f => [
      line([{ x: waistHalf * f, y: L * 0.12 }, { x: hemHalf * (f * 1.02), y: L - 12 }]),
      line([{ x: -waistHalf * f, y: L * 0.12 }, { x: -hemHalf * (f * 1.02), y: L - 12 }]),
    ]),
    anchors: {
      waist: { x: waistHalf, y: 0 },
      side:  { x: (waistHalf + hemHalf) / 2, y: L * 0.5 },
      hem:   { x: hemHalf * 0.9, y: L },
    },
    dims: { skirtLen: L, waistHalf, hemHalf },
  };
}

/* ---- 角丸の一枚もの（ブランケット・マット） --------------------
   出来上がりの外形そのもの。まわりのステッチを内側に少し縮めて描く。 */
function flatRounded(pat, vals) {
  const pts = pat.gen(vals, 0).pieces[0].finished;
  const b = bbox(pts);
  const cx = (b.x0 + b.x1) / 2, cy = (b.y0 + b.y1) / 2;
  const inset = pts.map(p => ({ x: cx + (p.x - cx) * 0.93, y: cy + (p.y - cy) * 0.93 }));
  return {
    parts: [{ role: "flat", d: poly(pts) }],
    seams: [line(inset.concat([inset[0]]))],       // まわりをぐるりとステッチ
    drape: [],
    anchors: {
      corner: { x: b.x1 - (b.x1 - b.x0) * 0.06, y: b.y0 + (b.y1 - b.y0) * 0.06 },
      edge:   { x: b.x1, y: cy },
      center: { x: cx, y: cy },
    },
    dims: { w: b.x1 - b.x0, h: b.y1 - b.y0 },
  };
}
const petblanket = (P, vals) => flatRounded(P.petblanket, vals);
const petmat = (P, vals) => flatRounded(P.petmat, vals);

/* ---- トートバッグ（正面の見え姿） ------------------------------
   出来上がりの正面を、型紙から取った寸法で組み立てます。
   本体の裁ち幅は 幅＋マチ、合印がマチの位置（＝マチ/2）なので、
   そこから仕上がりの 幅・丈を逆算します。持ち手の長さは持ち手パーツから。 */
function tote(P, vals) {
  const { pieces } = P.tote.gen(vals, 0);
  const body = pieces[0], handle = pieces[1];
  const bB = bbox(body.finished), bH = bbox(handle.finished);
  const dHalf = Math.min(...body.notches.map(n => n.x));   // マチ/2
  const W = (bB.x1 - bB.x0) - 2 * dHalf;                    // 仕上がり幅
  const H = (bB.y1 - bB.y0) - dHalf;                        // 仕上がり丈
  const handleLen = Math.max(bH.x1 - bH.x0, bH.y1 - bH.y0);
  const HW = Math.min(bH.x1 - bH.x0, bH.y1 - bH.y0);
  const bodyRect = [{ x: -W / 2, y: 0 }, { x: W / 2, y: 0 }, { x: W / 2, y: H }, { x: -W / 2, y: H }];
  const ax = W * 0.26;                                      // 持ち手付け位置（中心から）
  const RISE = Math.min(handleLen * 0.32, H * 0.75);
  const f = v => v.toFixed(1);
  const handlePath = `M${f(-ax)},0 Q0,${f(-RISE)} ${f(ax)},0 Q0,${f(-RISE + HW)} ${f(-ax)},0 Z`;
  return {
    parts: [
      { role: "handle", d: handlePath },
      { role: "body",   d: poly(bodyRect) },
    ],
    seams: [
      line([{ x: -W / 2, y: cm(2) }, { x: W / 2, y: cm(2) }]),           // 袋口
      line([{ x: -W / 2, y: H - dHalf }, { x: -W / 2 + dHalf, y: H }]),  // 底のマチ（左）
      line([{ x: W / 2, y: H - dHalf }, { x: W / 2 - dHalf, y: H }]),    // 底のマチ（右）
    ],
    drape: [],
    anchors: {
      handle:  { x: ax, y: -RISE * 0.7 },
      opening: { x: -W * 0.2, y: cm(2) },
      gusset:  { x: W / 2 - dHalf * 0.5, y: H - dHalf * 0.5 },
    },
    dims: { w: W, h: H, handleLen },
  };
}

/* ---- 巾着袋（正面の見え姿） -----------------------------------
   一枚を底で二つ折りにする袋。裁ち高さは仕上がり丈の2倍なので半分に。
   上をひも通しにして絞るので、口を少しすぼめて描く。 */
function kinchaku(P, vals) {
  const pts = P.kinchaku.gen(vals, 0).pieces[0].finished;
  const b = bbox(pts);
  const W = b.x1 - b.x0;
  const H = (b.y1 - b.y0) / 2;
  const casY = cm(vals.casing);
  const cinch = W * 0.14;
  /* ひも通し（casY）から上だけを絞る。下は本体そのままの長方形。
     上をすぼめ、下を真っすぐにすると、スカートでなく巾着に見える。 */
  const bodyPts = [
    { x: -W / 2 + cinch, y: 0 }, { x: W / 2 - cinch, y: 0 },
    { x: W / 2, y: casY }, { x: W / 2, y: H },
    { x: -W / 2, y: H }, { x: -W / 2, y: casY },
  ];
  return {
    parts: [{ role: "bag", d: poly(bodyPts) }],
    seams: [
      line([{ x: -W / 2 + cinch * 0.5, y: casY }, { x: W / 2 - cinch * 0.5, y: casY }]), // ひも通し
      line([{ x: -W / 2, y: H }, { x: W / 2, y: H }]),                                    // 底は「わ」
    ],
    /* 口のギャザーを短い縦線で示す（絞りぎわの飾り） */
    drape: [-0.45, -0.15, 0.15, 0.45].map(t =>
      line([{ x: W * t * 0.72, y: cm(0.4) }, { x: W * t * 0.9, y: casY - cm(0.4) }])),
    anchors: {
      casing: { x: W / 2, y: casY },
      top:    { x: 0, y: cm(0.4) },
      fold:   { x: -W * 0.3, y: H },
    },
    dims: { w: W, h: H },
  };
}

/* ---- ファスナーポーチ（正面の見え姿） -------------------------
   前後同じ一枚。上にファスナー、両脇と底を縫うだけ。 */
function pouch(P, vals) {
  const pts = P.pouch.gen(vals, 0).pieces[0].finished;
  const b = bbox(pts);
  const W = b.x1 - b.x0, H = b.y1 - b.y0;
  const bodyRect = [{ x: -W / 2, y: 0 }, { x: W / 2, y: 0 }, { x: W / 2, y: H }, { x: -W / 2, y: H }];
  const n = Math.max(6, Math.round(W / cm(1.3)));
  const teeth = [];
  for (let i = 0; i <= n; i++) { const x = -W / 2 + W * i / n; teeth.push(line([{ x, y: 0 }, { x, y: cm(0.8) }])); }
  return {
    parts: [{ role: "pouch", d: poly(bodyRect) }],
    seams: [line([{ x: -W / 2, y: cm(1.4) }, { x: W / 2, y: cm(1.4) }])],  // ファスナー下の縫い
    drape: teeth,                                                          // ファスナーの務歯
    anchors: {
      zip:  { x: W * 0.1, y: cm(0.4) },
      side: { x: W / 2, y: H * 0.55 },
      base: { x: -W * 0.2, y: H },
    },
    dims: { w: W, h: H },
  };
}

/* 長い斜め掛けひもは実寸で描くと本体が豆粒になるので、描く高さは抑え、
   本当の長さはキャプションに出す（check-hero はパーツの実寸で照合）。 */
function strapArc(sx, SH, W) {
  const f = v => v.toFixed(1);
  return `M${f(-sx)},0 Q${f(-W * 0.58)},${f(-SH)} 0,${f(-SH)} Q${f(W * 0.58)},${f(-SH)} ${f(sx)},0`;
}

/* ---- サコッシュ（本体＋斜め掛けひも） -------------------------- */
function sacoche(P, vals) {
  const { pieces } = P.sacoche.gen(vals, 0);
  const bB = bbox(pieces[0].finished), bS = bbox(pieces[1].finished);
  const W = bB.x1 - bB.x0, H = bB.y1 - bB.y0;
  const strapLen = Math.max(bS.x1 - bS.x0, bS.y1 - bS.y0);
  const bodyRect = [{ x: -W / 2, y: 0 }, { x: W / 2, y: 0 }, { x: W / 2, y: H }, { x: -W / 2, y: H }];
  const SH = H * 1.25;
  return {
    parts: [{ role: "body", d: poly(bodyRect) }],
    straps: [strapArc(W * 0.42, SH, W)],
    seams: [line([{ x: -W / 2, y: cm(1.2) }, { x: W / 2, y: cm(1.2) }])],   // 袋口
    drape: [],
    anchors: {
      strap:   { x: W * 0.29, y: -SH * 0.72 },
      opening: { x: -W * 0.15, y: cm(1.2) },
      body:    { x: W * 0.3, y: H * 0.62 },
    },
    dims: { w: W, h: H, strapLen },
  };
}

/* ---- ショルダーバッグ（フラップ＋斜め掛けひも） --------------- */
function shoulderbag(P, vals) {
  const { pieces } = P.shoulderbag.gen(vals, 0);
  const bB = bbox(pieces[0].finished);
  const bF = bbox(pieces[1].finished);      // フラップ
  const bS = bbox(pieces[2].finished);      // ストラップ
  const W = bB.x1 - bB.x0, H = bB.y1 - bB.y0;
  const FD = bF.y1 - bF.y0;                  // フラップの垂れ
  const strapLen = Math.max(bS.x1 - bS.x0, bS.y1 - bS.y0);
  const bodyRect = [{ x: -W / 2, y: 0 }, { x: W / 2, y: 0 }, { x: W / 2, y: H }, { x: -W / 2, y: H }];
  const r = Math.min(FD * 0.5, W * 0.12);
  /* フラップ：上辺いっぱい、下の両角を落として前面にかぶせる台形 */
  const flap = [
    { x: -W / 2, y: 0 }, { x: W / 2, y: 0 },
    { x: W / 2, y: FD - r }, { x: W / 2 - r, y: FD },
    { x: -W / 2 + r, y: FD }, { x: -W / 2, y: FD - r },
  ];
  const SH = H * 1.15;
  return {
    parts: [
      { role: "body", d: poly(bodyRect) },
      { role: "flap", d: poly(flap) },
    ],
    straps: [strapArc(W * 0.44, SH, W)],
    seams: [line([{ x: -W / 2 + r, y: FD }, { x: W / 2 - r, y: FD }])],   // フラップの縫い目
    drape: [],
    anchors: {
      strap: { x: W * 0.3, y: -SH * 0.72 },
      flap:  { x: W * 0.28, y: FD * 0.5 },
      body:  { x: -W * 0.28, y: H * 0.78 },
    },
    dims: { w: W, h: H, strapLen },
  };
}

const BUILDERS = { onepiece, tee, kidstee, skirt, petblanket, petmat, tote, kinchaku, pouch, sacoche, shoulderbag };

/* ---- SVGに起こす ------------------------------------------
   寸法は build の座標をそのまま拡大縮小するだけ。陰影とドレープは
   布の落ち感を示す飾りで、寸法には触れません。 */
function renderSVG(build, { labels, aria, armShade = true }) {
  const nums = s => s.match(/-?\d+(\.\d+)?/g).map(Number);
  const straps = build.straps || [];
  const xs = [], ys = [];
  /* 持ち手・ショルダーは本体より上に出るので、枠の計算にも含める（切れ防止） */
  for (const p of [...build.parts, ...straps.map(d => ({ d }))]) {
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
${straps.map(d => `          <path d="${d}" fill="none" stroke="#1B1D1A" stroke-width="${w(2.2)}" stroke-linejoin="round" stroke-linecap="round"/>\n`).join("")}${build.parts.map(p => `          <path d="${p.d}" fill="${fill}" stroke="#1B1D1A" stroke-width="${w(1.5)}" stroke-linejoin="round" stroke-linecap="round"/>`).join("\n")}
${build.drape.map(d => `          <path d="${d}" fill="none" stroke="#1B1D1A" stroke-width="${w(0.9)}" opacity=".22"/>`).join("\n")}
${build.seams.map(d => `          <path d="${d}" fill="none" stroke="#C24033" stroke-width="${w(1.5)}" stroke-dasharray="${w(6)} ${w(4)}"/>`).join("\n")}
        </g>
        <g stroke="#6b6b60" stroke-width="1" fill="#6b6b60">${leaders}</g>
        <g font-size="${FS}" font-family="sans-serif" fill="#1B1D1A">${texts}</g>
      </svg>`;
}

module.exports = { loadPatterns, BUILDERS, bbox, renderSVG, ARM_ANGLE };
