/* ============================================================
   工程の図解ページ（step-<key>-<slug>.html / en/ 同名）のデータ。

   作り方ガイドの「縫い方」の1枠（<li>）を、①②③…の小さな手順に
   分けて、手順ごとに「何を・どこに」するかを絵で見せます。
   ガイドの枠を押すと、このページに飛びます。

     key       … 作り方ガイドのキー（howto-<key>.html）
     slug      … ページ名の後半（step-<key>-<slug>.html）
     sec       … ガイド側の小見出し番号（"4-1" など）と、その中の何番目の枠か
     match     … ガイド側の枠の文章（完全一致で探してリンクを差し込む）。
                 英語ガイドは構成が違うことがあるので、無ければ省略可
     title     … ページの見出し（工程名）
     steps[]   … 手順。h（見出し）・text（説明）・note（※注意・任意）・svg

   生成: node scripts/gen-step-flows.js
   ============================================================ */

const T = (ja, en, l) => (l === "ja" ? ja : en);

/* ---------- 色（howto.css の変数と同じ値） ---------- */
const INK = "#1B1D1A", BLUE = "#2E63B4", RED = "#C24033", TAPE = "#E0A23C",
      MUTED = "#6b6b60", PAPER = "#F5F4EE";
const OMOTE = "#D3DEF0";   // 布の表
const URA = "#FFFFFF";     // 布の裏

/* ---------- 描画の小道具 ---------- */
const svg = (label, body, h = 240) =>
  `<svg viewBox="0 0 360 ${h}" role="img" aria-label="${label}">\n${body}\n      </svg>`;
const txt = (x, y, s, o = {}) =>
  `        <text x="${x}" y="${y}" text-anchor="${o.a || "middle"}" font-size="${o.size || 11}"` +
  `${o.bold ? ' font-weight="700"' : ""} fill="${o.c || INK}" font-family="sans-serif">${s}</text>`;
const line = (x1, y1, x2, y2, c = INK, w = 2, dash = "") =>
  `        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"` +
  `${dash ? ` stroke-dasharray="${dash}"` : ""} stroke-linecap="round"/>`;
const pathEl = (d, o = {}) =>
  `        <path d="${d}" fill="${o.fill || "none"}" stroke="${o.stroke || INK}" stroke-width="${o.w || 2}"` +
  `${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.op ? ` opacity="${o.op}"` : ""} stroke-linejoin="round" stroke-linecap="round"/>`;

/* 矢じり付きの矢印（marker は id が要り、1ページに図が並ぶと重複するので使わない） */
function arrow(x1, y1, x2, y2, c = BLUE, curve = 0) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const cx = mx - dy / len * curve, cy = my + dx / len * curve;
  // 終点での向き（曲線なら制御点から終点へ）
  const ex = x2 - (curve ? cx : x1), ey = y2 - (curve ? cy : y1), el = Math.hypot(ex, ey) || 1;
  const ux = ex / el, uy = ey / el, s = 7;
  const a1 = `${(x2 - ux * s - uy * s * 0.6).toFixed(1)},${(y2 - uy * s + ux * s * 0.6).toFixed(1)}`;
  const a2 = `${(x2 - ux * s + uy * s * 0.6).toFixed(1)},${(y2 - uy * s - ux * s * 0.6).toFixed(1)}`;
  const d = curve ? `M${x1},${y1} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2},${y2}` : `M${x1},${y1} L${x2},${y2}`;
  return pathEl(d, { stroke: c, w: 2 }) + "\n" + pathEl(`M${a1} L${x2},${y2} L${a2}`, { stroke: c, w: 2 });
}

/* まち針（頭が上、布端をまたいで刺す） */
const pin = (x, y, len = 22) =>
  line(x, y - len / 2, x, y + len / 2, MUTED, 1.4) + "\n" +
  `        <circle cx="${x}" cy="${y - len / 2 - 2}" r="3.2" fill="${BLUE}"/>`;

/* 縫い目：いま縫うところは赤い破線、縫い終わったところは赤い実線 */
const stitch = (x1, y1, x2, y2, done = false) =>
  line(x1, y1, x2, y2, RED, done ? 2.2 : 2.6, done ? "" : "6 4");

/* 返し縫いの印（縫い始め・縫い終わりの小さな往復） */
const backtack = (x, y) =>
  pathEl(`M${x - 5},${y - 3} L${x + 5},${y - 3} M${x - 5},${y + 3} L${x + 5},${y + 3}`, { stroke: RED, w: 1.6 });

/* 縫い代：布端から縫う線までの帯を、薄い赤で塗る */
const SA_FILL = "rgba(194,64,51,.2)";
const saBand = (x, y, w, h) => `        <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${SA_FILL}"/>`;

/* かがり縫い（ジグザグミシン・手縫いのかがり）：布端に沿った青いギザギザ */
function zigzag(x1, x2, y, amp = 4, step = 6) {
  const pts = [];
  for (let x = x1, up = true; x <= x2; x += step, up = !up) pts.push(`${x},${up ? y - amp : y + amp}`);
  return pathEl("M" + pts.join(" L"), { stroke: BLUE, w: 1.8 });
}

/* 凡例。items を左から並べる（右端は 360 を越えないこと）
   omote=表 / ura=裏 / sa=縫い代 / stitch=縫う線 / zig=かがる */
function key(l, items, y = 232, x = 12) {
  const cw = l === "ja" ? 10 : 5.4;
  const LBL = {
    omote: T("表", "right side", l), ura: T("裏", "wrong side", l),
    sa: T("縫い代", "seam allowance", l), stitch: T("縫う線", "stitch line", l), zig: T("かがる", "overcast", l),
  };
  const out = [];
  for (const k of items) {
    if (k === "omote" || k === "ura")
      out.push(`        <rect x="${x}" y="${y - 9}" width="14" height="10" fill="${k === "omote" ? OMOTE : URA}" stroke="${INK}" stroke-width="1"/>`);
    else if (k === "sa") out.push(saBand(x, y - 9, 14, 10));
    else if (k === "stitch") out.push(line(x, y - 4, x + 14, y - 4, RED, 2.4, "5 3"));
    else if (k === "zig") out.push(zigzag(x, x + 14, y - 4, 3, 3.5));
    out.push(txt(x + 18, y, LBL[k], { a: "start", size: 10, c: MUTED }));
    x += 18 + LBL[k].length * cw + 12;
  }
  return out.join("\n");
}

/* ポンチョの身頃（長方形の上辺の中央に衿ぐり）。
   down=true のときは上下を返して、衿ぐりが下辺に来る。
   衿ぐりは patterns.js と同じ2次曲線（制御点は衿ぐり幅の55%の位置）。 */
function ponchoPiece(x, y, w, h, nw, nd, down = false) {
  const cx = x + w / 2;
  if (!down)
    return `M${x},${y} L${cx - nw},${y} Q${cx - nw * 0.55},${y + nd} ${cx},${y + nd} ` +
           `Q${cx + nw * 0.55},${y + nd} ${cx + nw},${y} L${x + w},${y} L${x + w},${y + h} L${x},${y + h} Z`;
  const b = y + h;
  return `M${x},${y} L${x + w},${y} L${x + w},${b} L${cx + nw},${b} Q${cx + nw * 0.55},${b - nd} ${cx},${b - nd} ` +
         `Q${cx - nw * 0.55},${b - nd} ${cx - nw},${b} L${x},${b} Z`;
}
const piece = (d, fill) => pathEl(d, { fill, stroke: INK, w: 2 });

/* ---------- 肩を縫う：重ねた2枚（上が前身頃の裏、下に後身頃の表） ---------- */
const SX = 60, SY = 62, SW = 240, SH = 140, SNW = 27, SFD = 22, SBD = 6;
const SCX = SX + SW / 2, SL = SCX - SNW, SR = SCX + SNW;   // 左肩の終わり・右肩の始まり
const SY_SA = 11;   // 縫い代の幅（見やすいように実寸より太く描く）
const SLINE = SY + SY_SA;   // 縫う線
function stacked(l, extra) {
  return [
    piece(ponchoPiece(SX, SY, SW, SH, SNW, SBD), OMOTE),
    piece(ponchoPiece(SX, SY, SW, SH, SNW, SFD), URA),
    txt(SCX, SY + 80, T("前身頃（裏）", "front (wrong side up)", l), { size: 12, bold: true }),
    txt(SCX, SY + 98, T("下に後身頃（表）が重なっている", "back underneath, right side up", l), { size: 10, c: MUTED }),
    // 肩の縫い代（布端から縫う線まで）
    saBand(SX + 1, SY + 1, SL - SX - 1, SY_SA - 1), saBand(SR, SY + 1, SX + SW - SR - 1, SY_SA - 1),
    extra,
    key(l, ["omote", "ura", "sa", "stitch"]),
  ].join("\n");
}
const shoulderLabels = l => [
  txt((SX + SL) / 2, SY - 26, T("左の肩", "left shoulder", l), { bold: true }),
  txt((SR + SX + SW) / 2, SY - 26, T("右の肩", "right shoulder", l), { bold: true }),
].join("\n");

/* ---------- 断面図の小道具 ---------- */
// 布の断面（太い線）。表の側に薄い青の帯を添えて、どちらが表か分かるようにする
const layer = (d, c = INK) => pathEl(d, { stroke: c, w: 3 });
const iron = (x, y) =>
  pathEl(`M${x},${y + 30} L${x + 70},${y + 30} Q${x + 92},${y + 30} ${x + 96},${y + 14} L${x + 70},${y} L${x + 8},${y} Q${x},${y} ${x},${y + 8} Z`,
         { fill: "#E6E4DA", stroke: INK, w: 2 }) + "\n" +
  pathEl(`M${x + 18},${y} Q${x + 30},${y - 22} ${x + 58},${y - 18} L${x + 66},${y}`, { stroke: INK, w: 2 });

/* ============================================================
   データ本体
   ============================================================ */
module.exports = {
  poncho: [
    /* ---------------- 3 ③ 端の処理（布端をかがる） ---------------- */
    {
      slug: "edge", sec: "3", n: 3, anchor: "cut",
      match: { ja: "<strong>端の処理</strong><br>フリースはほつれないので省略できます。それ以外は縫い代の端を処理しておきます。" },
      title: { ja: "布端をかがる（端の処理）", en: "Finish the raw edges" },
      steps: [
        {
          h: { ja: "かがる場所を確かめる", en: "See which edges to finish" },
          text: {
            ja: "前身頃・後身頃とも、肩の布端をかがります。肩はあとで縫い代を割るので、縫う前に1枚ずつかがっておきます。衿ぐりはバイアステープでくるみ、裾と脇は三つ折りにするので、ここではかがらなくて大丈夫です。",
            en: "Finish the shoulder edges of both the front and the back. The shoulder seams are pressed open later, so each edge is finished separately, before sewing. The neckline is bound and the outer edges are hemmed, so they need nothing now.",
          },
          note: {
            ja: "フリースはほつれないので、この工程は省略できます。",
            en: "Fleece does not fray — you can skip this step.",
          },
          svg: l => svg(T("かがる場所", "the edges to finish", l), [
            piece(ponchoPiece(20, 70, 140, 96, 16, 4), URA),
            piece(ponchoPiece(200, 70, 140, 96, 16, 13), URA),
            saBand(21, 71, 53, 8), saBand(106, 71, 53, 8), saBand(201, 71, 53, 8), saBand(286, 71, 53, 8),
            zigzag(22, 72, 70, 3.5, 5), zigzag(108, 158, 70, 3.5, 5),
            zigzag(202, 252, 70, 3.5, 5), zigzag(288, 338, 70, 3.5, 5),
            txt(90, 124, T("後ろ", "back", l), { size: 13, bold: true }),
            txt(270, 124, T("前", "front", l), { size: 13, bold: true }),
            txt(90, 50, T("肩の布端", "shoulder edges", l), { c: BLUE, bold: true }),
            txt(270, 50, T("肩の布端", "shoulder edges", l), { c: BLUE, bold: true }),
            txt(180, 190, T("衿ぐり・裾・脇はかがらない", "not the neck, hem or sides", l), { size: 10, c: MUTED }),
            key(l, ["ura", "sa", "zig"]),
          ].join("\n")),
        },
        {
          h: { ja: "ジグザグミシンで布端をかがる", en: "Zigzag over the edge" },
          text: {
            ja: "ミシンをジグザグ縫いに切り替え、布の裏を上にして、肩の布端に沿って縫います。針が右に振れたときに、布端のすぐ外側に落ちるくらいの位置がちょうどよく、糸が布端を包んでほつれを止めます。",
            en: "Switch the machine to zigzag and sew along each shoulder edge, wrong side up. Place it so the right-hand swing of the needle drops just off the edge — the thread then wraps the edge and stops it fraying.",
          },
          note: {
            ja: "かがるのは布端だけ。赤い点線（あとで縫う線）より外側の、縫い代の中に収まります。",
            en: "The zigzag stays inside the seam allowance, outside the red line you will sew later.",
          },
          svg: l => svg(T("ジグザグミシンでかがる", "zigzagging the edge", l), [
            `        <rect x="30" y="70" width="300" height="120" fill="${URA}" stroke="${INK}" stroke-width="2"/>`,
            saBand(31, 71, 298, 40),
            zigzag(40, 320, 80, 8, 12),
            line(30, 110, 330, 110, RED, 2, "6 4"),
            pathEl(`M338,70 L344,70 L344,110 L338,110`, { stroke: RED, w: 1.4 }),
            txt(40, 132, T("あとで縫う線", "stitch line (later)", l), { a: "start", size: 10, c: RED, bold: true }),
            txt(180, 58, T("布端", "raw edge", l), { size: 10, c: MUTED }),
            arrow(270, 40, 290, 70, BLUE, 6),
            txt(262, 36, T("針の右振りは布端のすぐ外", "right swing just off the edge", l), { a: "end", size: 10, c: BLUE, bold: true }),
            txt(180, 164, T("肩の布端（裏から見たところ）", "shoulder edge, wrong side up", l), { size: 10, c: MUTED }),
            key(l, ["sa", "stitch", "zig"]),
          ].join("\n")),
        },
        {
          h: { ja: "手縫いなら、かがり縫いで", en: "By hand: an overcast stitch" },
          text: {
            ja: "ミシンがなければ手縫いのかがり縫いで。布端から3〜5mm内側に針を出し、糸を布端に巻きつけるようにして、5mmほどの間隔で進みます。糸は引きすぎず、布端が縮まない程度に。",
            en: "No machine? Overcast by hand: bring the needle up 3–5 mm in from the edge, take the thread over the edge and come up again about 5 mm along. Keep the tension easy so the edge does not pucker.",
          },
          svg: l => svg(T("手縫いのかがり縫い", "hand overcasting", l), [
            `        <rect x="30" y="70" width="300" height="120" fill="${URA}" stroke="${INK}" stroke-width="2"/>`,
            saBand(31, 71, 298, 40),
            ...Array.from({ length: 11 }, (_, i) => {
              const x = 54 + i * 22;
              return pathEl(`M${x},86 L${x + 12},64 Q${x + 16},58 ${x + 14},70`, { stroke: BLUE, w: 1.8 });
            }),
            line(30, 110, 330, 110, RED, 2, "6 4"),
            txt(40, 132, T("あとで縫う線", "stitch line (later)", l), { a: "start", size: 10, c: RED, bold: true }),
            txt(300, 150, T("3〜5mm内側に針を出す", "needle up 3–5 mm in", l), { a: "end", size: 10, c: BLUE, bold: true }),
            arrow(292, 142, 296, 90, BLUE, 6),
            txt(180, 44, T("糸を布端に巻きつける", "thread wraps over the edge", l), { size: 10, c: BLUE, bold: true }),
            txt(180, 178, T("裏から見たところ", "wrong side up", l), { size: 10, c: MUTED }),
            key(l, ["sa", "stitch", "zig"]),
          ].join("\n")),
        },
      ],
    },

    /* ---------------- 4-1 ① 肩を縫う ---------------- */
    {
      slug: "shoulder", sec: "4-1", n: 1,
      match: { ja: "前身頃と後身頃を中表に合わせ、左右の肩をそれぞれ端から縫います。中央（衿ぐり）は開けたままにしてください。" },
      title: { ja: "肩を縫う", en: "Sew the shoulders" },
      steps: [
        {
          h: { ja: "前身頃と後身頃を中表に合わせる", en: "Place front and back right sides together" },
          text: {
            ja: "後身頃を表が上になるように置き、その上に前身頃を裏が上になるように重ねます。表どうしが内側で向き合う、これが「中表」です。衿ぐりが深く切れているほうが前身頃です。",
            en: "Lay the back right side up, then lay the front on top of it wrong side up, so the two right sides face each other. The piece with the deeper neck curve is the front.",
          },
          svg: l => svg(T("前身頃と後身頃を中表に重ねる", "placing the front on the back, right sides together", l), [
            piece(ponchoPiece(20, 70, 140, 96, 16, 4), OMOTE),
            piece(ponchoPiece(200, 70, 140, 96, 16, 13), URA),
            txt(90, 124, T("後ろ", "back", l), { size: 13, bold: true }),
            txt(270, 124, T("前", "front", l), { size: 13, bold: true }),
            txt(90, 186, T("表を上に置く", "right side up", l), { c: MUTED }),
            txt(270, 186, T("裏を上にして重ねる", "wrong side up, on top", l), { c: MUTED }),
            txt(270, 98, T("衿ぐりが深い", "deeper neck", l), { size: 10, c: BLUE }),
            arrow(262, 60, 104, 60, BLUE, 34),
            txt(183, 22, T("重ねる", "lay on top", l), { c: BLUE, bold: true }),
            key(l, ["omote", "ura"]),
          ].join("\n")),
        },
        {
          h: { ja: "肩と端をそろえて、まち針でとめる", en: "Line up the shoulders and pin" },
          text: {
            ja: "上の辺（肩）と左右の端をきっちりそろえ、左右の肩をそれぞれまち針でとめます。まち針は布端に対して直角に刺すと、縫うときにずれにくくなります。",
            en: "Match the top edges (the shoulders) and the side edges exactly, then pin each shoulder. Pins placed at right angles to the edge hold best while you sew.",
          },
          note: {
            ja: "真ん中の衿ぐりの部分にはまち針を打ちません。ここは最後まで縫わずに開けておきます。",
            en: "Do not pin across the neck opening in the middle — it stays open.",
          },
          svg: l => svg(T("肩をまち針でとめる", "pinning the shoulders", l), stacked(l, [
            line(SX + 2, SLINE, SL - 2, SLINE, RED, 1.2, "3 3"), line(SR + 2, SLINE, SX + SW - 2, SLINE, RED, 1.2, "3 3"),
            pin(84, SY + 4), pin(126, SY + 4), pin(234, SY + 4), pin(276, SY + 4),
            arrow(112, SY + 40, 106, SY + 14, RED, 6),
            txt(112, SY + 54, T("縫い代（1cm）", "allowance (1 cm)", l), { size: 10, c: RED, bold: true }),
            shoulderLabels(l),
            txt(SCX, SY - 26, T("衿ぐり", "neck", l), { size: 10, c: MUTED }),
          ].join("\n"))),
        },
        {
          h: { ja: "左の肩を、端から衿ぐりの角まで縫う", en: "Sew the left shoulder, from the edge to the neck" },
          text: {
            ja: "左の肩を、外側の端から衿ぐりの角まで、縫い代の幅（出来上がり線）で縫います。縫い始めと縫い終わりは3〜4針返し縫いをして、ほどけないようにします。",
            en: "Stitch the left shoulder on the seam line, from the outer edge in to the corner of the neck opening. Backstitch 3–4 stitches at the start and the end so it cannot unravel.",
          },
          note: {
            ja: "中央（衿ぐり）は開けたまま。衿ぐりの角に来たら、そこで止めます。",
            en: "Stop at the corner of the neck opening — the middle stays open.",
          },
          svg: l => svg(T("左の肩を縫う", "sewing the left shoulder", l), stacked(l, [
            stitch(SX + 2, SLINE, SL - 2, SLINE),
            arrow(SX + 30, SLINE + 12, SL - 22, SLINE + 12, RED),
            backtack(SX + 8, SLINE), backtack(SL - 8, SLINE),
            pin(234, SY + 4), pin(276, SY + 4),
            shoulderLabels(l),
            txt(SX + 4, SLINE + 28, T("端から", "from edge", l), { a: "start", size: 10, c: RED }),
            txt(SL, SLINE + 28, T("角で止める", "stop", l), { size: 10, c: RED }),
            pathEl(`M${SL + 4},${SY + 4} Q${SCX},${SY + 30} ${SR - 4},${SY + 4}`, { stroke: MUTED, w: 1.2, dash: "3 3" }),
            txt(SCX, SY - 10, T("縫わない", "leave open", l), { size: 10, c: MUTED, bold: true }),
          ].join("\n"))),
        },
        {
          h: { ja: "右の肩を、端から衿ぐりの角まで縫う", en: "Sew the right shoulder the same way" },
          text: {
            ja: "右の肩も同じように、外側の端から衿ぐりの角に向かって縫います。こちらも縫い始めと縫い終わりに返し縫いをします。",
            en: "Now stitch the right shoulder the same way, from the outer edge in toward the neck corner, backstitching at both ends.",
          },
          note: {
            ja: "左右とも「外側から中央へ」縫うと、衿ぐりの角の位置が左右でそろいます。",
            en: "Sewing both sides from the outside in keeps the two neck corners level.",
          },
          svg: l => svg(T("右の肩を縫う", "sewing the right shoulder", l), stacked(l, [
            stitch(SX + 2, SLINE, SL - 2, SLINE, true),
            stitch(SX + SW - 2, SLINE, SR + 2, SLINE),
            arrow(SX + SW - 30, SLINE + 12, SR + 22, SLINE + 12, RED),
            backtack(SX + SW - 8, SLINE), backtack(SR + 8, SLINE),
            shoulderLabels(l),
            txt(SX + SW - 4, SLINE + 28, T("端から", "from edge", l), { a: "end", size: 10, c: RED }),
            txt(SR, SLINE + 28, T("角で止める", "stop", l), { size: 10, c: RED }),
            txt((SX + SL) / 2, SLINE + 28, T("縫えた", "done", l), { size: 10, c: MUTED }),
            txt(SCX, SY - 10, T("縫わない", "leave open", l), { size: 10, c: MUTED, bold: true }),
          ].join("\n"))),
        },
        {
          h: { ja: "開いて、頭が通る穴を確かめる", en: "Open it out and check the head opening" },
          text: {
            ja: "2枚を開くと、肩の縫い目の間に衿ぐりの穴ができています。前のほうが深く、後ろは浅いカーブです。頭が通るか、ここで一度かぶって確かめておくと安心です。",
            en: "Open the two layers out. Between the shoulder seams there is now a neck opening — deeper at the front, shallow at the back. Try it over your head now, while it is still easy to adjust.",
          },
          svg: l => svg(T("開いたところ", "opened out", l), [
            piece(ponchoPiece(70, 20, 220, 96, 25, 5, true), OMOTE),
            piece(ponchoPiece(70, 116, 220, 96, 25, 20), OMOTE),
            stitch(70, 116, 155, 116, true), stitch(205, 116, 290, 116, true),
            txt(180, 64, T("後身頃", "back", l), { size: 12, bold: true }),
            txt(180, 192, T("前身頃", "front", l), { size: 12, bold: true }),
            arrow(40, 150, 100, 118, RED, 10),
            txt(38, 166, T("肩の縫い目", "shoulder seam", l), { size: 10, c: RED }),
            arrow(180, 152, 180, 130, BLUE),
            txt(180, 166, T("頭が通る穴", "head opening", l), { size: 10, c: BLUE, bold: true }),
            txt(180, 230, T("表から見たところ", "seen from the right side", l), { size: 10, c: MUTED }),
          ].join("\n")),
        },
      ],
    },

    /* ---------------- 4-1 ② 縫い代を割る ---------------- */
    {
      slug: "press", sec: "4-1", n: 2,
      match: { ja: "縫い代をアイロンで割ります。" },
      title: { ja: "縫い代をアイロンで割る", en: "Press the shoulder seams open" },
      steps: [
        {
          h: { ja: "裏を上にして広げる", en: "Open it out, wrong side up" },
          text: {
            ja: "肩を縫ったら2枚を開き、裏が上になるようにアイロン台に置きます。縫い目のところで、縫い代が2枚重なって立っています。",
            en: "Open the pieces out and lay them wrong side up on the ironing board. At the seam, the two seam allowances stand up together.",
          },
          svg: l => svg(T("縫い代が立っている断面", "cross-section: seam allowances standing up", l), [
            saBand(172, 96, 16, 48),
            layer(`M40,150 L176,150 L176,96`), layer(`M320,150 L184,150 L184,96`),
            line(176, 146, 184, 146, RED, 2.4),
            txt(180, 84, T("縫い代（2枚）", "seam allowances", l), { bold: true }),
            arrow(222, 138, 188, 146, RED, 0),
            txt(228, 134, T("縫い目", "seam", l), { a: "start", size: 10, c: RED }),
            txt(100, 176, T("前身頃（裏）", "front (wrong side)", l), { c: MUTED }),
            txt(262, 176, T("後身頃（裏）", "back (wrong side)", l), { c: MUTED }),
            txt(180, 206, T("肩の縫い目を横から見たところ", "shoulder seam, side view", l), { size: 10, c: MUTED }),
            key(l, ["sa", "stitch"]),
          ].join("\n")),
        },
        {
          h: { ja: "縫い代を左右に開く", en: "Fold the allowances apart" },
          text: {
            ja: "立っている2枚の縫い代を、指で左右に分けて倒します。これが「割る」です。縫い目が真ん中にくるように開きます。",
            en: "Split the two allowances with your fingers and fold one to each side, so the seam sits in the middle. This is called pressing the seam open.",
          },
          svg: l => svg(T("縫い代を左右に開く", "folding the allowances apart", l), [
            saBand(132, 138, 96, 10),
            layer(`M40,150 L176,150`), layer(`M320,150 L184,150`),
            layer(`M176,150 L176,144 L132,144`), layer(`M184,150 L184,144 L228,144`),
            pathEl(`M176,146 L176,96`, { stroke: MUTED, w: 1.4, dash: "4 3" }),
            pathEl(`M184,146 L184,96`, { stroke: MUTED, w: 1.4, dash: "4 3" }),
            arrow(172, 96, 136, 132, BLUE, 16), arrow(188, 96, 224, 132, BLUE, -16),
            line(176, 150, 184, 150, RED, 2.4),
            txt(180, 76, T("左右に分けて倒す", "fold one each way", l), { c: BLUE, bold: true }),
            txt(100, 176, T("前身頃（裏）", "front (wrong side)", l), { c: MUTED }),
            txt(262, 176, T("後身頃（裏）", "back (wrong side)", l), { c: MUTED }),
            key(l, ["sa", "stitch"]),
          ].join("\n")),
        },
        {
          h: { ja: "アイロンで上から押さえる", en: "Press from above" },
          text: {
            ja: "開いた縫い代の上からアイロンを当てて、平らに押さえます。すべらせずに、置いて・持ち上げてを繰り返すと布がのびません。",
            en: "Press the opened allowances flat with the iron. Lift and set the iron down rather than sliding it, so the fabric does not stretch.",
          },
          note: {
            ja: "フリースやウールは熱に弱いので、低めの温度で当て布をしてください。",
            en: "Fleece and wool are heat-sensitive: use a low setting and a press cloth.",
          },
          svg: l => svg(T("アイロンで押さえる", "pressing with an iron", l), [
            saBand(132, 148, 96, 10),
            layer(`M40,160 L176,160`), layer(`M320,160 L184,160`),
            layer(`M176,160 L176,154 L132,154`), layer(`M184,160 L184,154 L228,154`),
            line(176, 160, 184, 160, RED, 2.4),
            iron(132, 88),
            arrow(180, 126, 180, 146, BLUE),
            txt(180, 56, T("すべらせずに、置いて押さえる", "press — don't slide", l), { c: BLUE, bold: true }),
            txt(180, 190, T("縫い目が真ん中、縫い代は平らに", "seam centered, allowances flat", l), { size: 10, c: MUTED }),
            key(l, ["sa", "stitch"]),
          ].join("\n")),
        },
      ],
    },

    /* ---------------- 4-2 ① 衿ぐりをバイアステープでくるむ ---------------- */
    {
      slug: "neckline", sec: "4-2", n: 1,
      match: { ja: "衿ぐりをバイアステープでくるんで始末します。カーブに沿わせながら、引っぱらずに縫ってください。" },
      title: { ja: "衿ぐりをバイアステープでくるむ", en: "Bind the neckline with bias tape" },
      steps: [
        {
          h: { ja: "テープの片側の折り目を開く", en: "Unfold one edge of the tape" },
          text: {
            ja: "両折れのバイアステープは、両端が内側に折ってあります。片側だけ折り目を開いておきます。この折り目の線が、あとで縫う位置になります。",
            en: "Double-fold bias tape has both long edges pressed under. Open out one of them. That crease is the line you will stitch on in the next steps.",
          },
          svg: l => svg(T("バイアステープの断面", "bias tape, cross-section", l), [
            txt(180, 36, T("そのまま（両側が折ってある）", "as bought — both edges folded", l), { c: MUTED }),
            pathEl(`M140,68 L110,68 L110,58 L250,58 L250,68 L220,68`, { stroke: TAPE, w: 4 }),
            arrow(180, 90, 180, 118, BLUE),
            txt(180, 140, T("片側だけ開く", "open one side", l), { c: BLUE, bold: true }),
            pathEl(`M70,170 L110,170 L250,170 L250,180 L220,180`, { stroke: TAPE, w: 4 }),
            line(110, 158, 110, 196, RED, 1.4, "4 3"),
            txt(110, 214, T("折り目＝縫う線", "crease = stitch line", l), { size: 10, c: RED, bold: true }),
          ].join("\n")),
        },
        {
          h: { ja: "衿ぐりの表に合わせて、まち針でとめる", en: "Pin it around the neck, right sides together" },
          text: {
            ja: "身頃を表に返し、開いたテープの端を衿ぐりの布端にそろえて、中表でぐるりと一周まち針でとめます。始まりは目立たない肩の縫い目の位置にして、テープの端を1cm折っておきます。",
            en: "Turn the body right side out. Lay the opened edge of the tape along the raw edge of the neck, right sides together, and pin all the way round. Start at a shoulder seam where it will not show, with the end of the tape folded back 1 cm.",
          },
          note: {
            ja: "カーブではテープを引っぱらず、布端に沿わせるように置いていきます。",
            en: "Ease the tape around the curves — do not stretch it.",
          },
          svg: l => svg(T("衿ぐりにテープをまち針でとめる", "pinning tape around the neckline", l), [
            `        <rect x="20" y="20" width="320" height="190" fill="${OMOTE}" stroke="${INK}" stroke-width="2"/>`,
            pathEl(`M120,96 Q156,86 180,86 Q204,86 240,96 Q214,150 180,150 Q146,150 120,96 Z`, { fill: PAPER, stroke: INK, w: 2 }),
            pathEl(`M112,94 Q156,78 180,78 Q204,78 248,94 Q218,160 180,160 Q142,160 112,94 Z`, { stroke: TAPE, w: 9, op: .85 }),
            stitch(20, 96, 118, 96, true), stitch(242, 96, 340, 96, true),
            pin(150, 76, 18), pin(210, 76, 18), pin(128, 132, 18), pin(232, 132, 18), pin(180, 160, 18),
            `        <circle cx="116" cy="95" r="6" fill="none" stroke="${RED}" stroke-width="2"/>`,
            txt(60, 124, T("始まり", "start here", l), { size: 10, c: RED, bold: true }),
            txt(60, 138, T("（肩の縫い目）", "(shoulder seam)", l), { size: 10, c: RED }),
            txt(180, 122, T("穴", "opening", l), { size: 10, c: MUTED }),
            txt(300, 150, T("テープ", "tape", l), { size: 10, c: "#9A6A16", bold: true }),
            arrow(290, 142, 246, 116, "#9A6A16", 8),
            txt(180, 196, T("身頃（表）", "body (right side)", l), { size: 11, bold: true }),
            txt(180, 232, T("上から見たところ", "seen from above", l), { size: 10, c: MUTED }),
          ].join("\n")),
        },
        {
          h: { ja: "折り目の上を、一周縫う", en: "Stitch round on the crease" },
          text: {
            ja: "テープの折り目の線の上を、ゆっくり一周縫います。カーブでは少しずつ布を回しながら、テープを引っぱらないように進めます。",
            en: "Stitch slowly round the neck, right on the crease line. On the curves, turn the fabric a little at a time and let the tape follow without pulling.",
          },
          svg: l => svg(T("テープを縫い付ける断面", "cross-section: sewing the tape on", l), [
            layer(`M40,140 L270,140`, INK),
            `        <rect x="40" y="141" width="230" height="5" fill="${OMOTE}"/>`,
            pathEl(`M270,132 L140,132 L140,124 L170,124`, { stroke: TAPE, w: 4 }),
            saBand(248, 118, 22, 30),
            line(248, 104, 248, 164, RED, 2.6, "6 4"),
            pathEl(`M248,172 L248,178 L270,178 L270,172`, { stroke: RED, w: 1.4 }),
            txt(259, 192, T("縫い代", "allowance", l), { size: 10, c: RED, bold: true }),
            txt(248, 94, T("折り目の上を縫う", "stitch on the crease", l), { c: RED, bold: true }),
            txt(150, 110, T("テープ", "tape", l), { size: 10, c: "#9A6A16", bold: true }),
            txt(120, 166, T("身頃（表を上）", "body, right side up", l), { size: 10, c: MUTED }),
            txt(282, 146, T("布端", "edge", l), { a: "start", size: 10, c: MUTED }),
            txt(120, 212, T("布端とテープの端をそろえる", "tape edge level with the raw edge", l), { size: 10, c: MUTED }),
            key(l, ["sa", "stitch"]),
          ].join("\n")),
        },
        {
          h: { ja: "終わりは1cm重ねて切る", en: "Overlap the end by 1 cm and trim" },
          text: {
            ja: "一周して始まりの位置に戻ったら、テープを始まりの上に1cmほど重ねて縫い、余りを切ります。始まりの端を折ってあるので、切り口が表に出ません。",
            en: "When you get back to the start, run the tape about 1 cm over the folded-back beginning, stitch across, and trim the rest. The folded start hides the cut end.",
          },
          svg: l => svg(T("テープの始まりと終わりを重ねる", "overlapping the ends of the tape", l), [
            `        <rect x="40" y="96" width="170" height="30" fill="${TAPE}" opacity=".55" stroke="#9A6A16" stroke-width="1.4"/>`,
            line(200, 96, 200, 126, "#9A6A16", 1.4, "3 3"),
            txt(120, 86, T("始まり（端を1cm折ってある）", "start (end folded back 1 cm)", l), { size: 10, c: "#9A6A16" }),
            `        <rect x="178" y="96" width="142" height="30" fill="${TAPE}" opacity=".85" stroke="#9A6A16" stroke-width="1.4"/>`,
            txt(250, 146, T("終わり", "end", l), { size: 10, c: "#9A6A16", bold: true }),
            pathEl(`M178,168 L178,176 L210,176 L210,168`, { stroke: RED, w: 1.6 }),
            txt(194, 196, T("1cm重ねる", "1 cm overlap", l), { size: 11, c: RED, bold: true }),
            stitch(40, 118, 320, 118),
            txt(180, 226, T("上から見たところ（衿ぐりの一部）", "from above — a short stretch of the neckline", l), { size: 10, c: MUTED }),
          ].join("\n")),
        },
        {
          h: { ja: "テープを裏に返してくるみ、際を縫う", en: "Wrap the tape to the inside and stitch" },
          text: {
            ja: "テープを布端にかぶせるように裏側へ返し、縫い代をくるみます。残りの折り目がさっきの縫い目を少し越える位置でまち針をとめ、表からテープの際を一周縫えば完成です。",
            en: "Fold the tape over the raw edge to the wrong side so it wraps the seam allowance. Pin so the remaining folded edge just covers the first line of stitching, then topstitch close to the tape edge all the way round from the right side.",
          },
          note: {
            ja: "カーブの内側の縫い代が突っ張るときは、縫い目を切らないように5mm間隔で切り込みを入れると、なじみます。",
            en: "If the allowance puckers on a tight curve, clip it every 5 mm, stopping short of the stitching.",
          },
          svg: l => svg(T("テープでくるんだ断面", "cross-section: tape wrapped round the edge", l), [
            layer(`M40,120 L250,120`, INK),
            `        <rect x="40" y="114" width="210" height="5" fill="${OMOTE}"/>`,
            pathEl(`M170,110 L252,110 Q266,110 266,122 Q266,134 252,134 L172,134`, { stroke: TAPE, w: 4 }),
            line(184, 94, 184, 150, RED, 2.6, "6 4"),
            txt(184, 84, T("際を縫う", "topstitch", l), { c: RED, bold: true }),
            arrow(300, 100, 270, 116, BLUE, -10),
            txt(304, 96, T("くるむ", "wrap", l), { a: "start", size: 10, c: BLUE, bold: true }),
            txt(100, 104, T("表", "right side", l), { size: 10, c: MUTED }),
            txt(100, 144, T("裏", "wrong side", l), { size: 10, c: MUTED }),
            txt(180, 206, T("首まわりの布端が、テープの中に隠れる", "the raw neck edge is hidden inside the tape", l), { size: 10, c: MUTED }),
          ].join("\n")),
        },
      ],
    },

    /* ---------------- 4-3 ① 裾と脇を三つ折りにする ---------------- */
    {
      slug: "hem", sec: "4-3", n: 1,
      match: { ja: "裾と脇の開き部分を三つ折りにして縫ったら完成です。フリースなら切りっぱなしでもOKで、フリンジにしても素敵です。" },
      title: { ja: "裾と脇を三つ折りで縫う", en: "Hem the outer edges" },
      steps: [
        {
          h: { ja: "縫うところを確かめる", en: "See which edges to hem" },
          text: {
            ja: "肩を縫ったポンチョを開くと、まわりの布端がぐるりと一周つながっています。前後の裾と、左右の脇の開き部分を、すべて三つ折りにして縫います。",
            en: "With the shoulders sewn, open the poncho out: the outer edge runs all the way round. The front and back hems and the open sides are all hemmed with a double fold.",
          },
          note: {
            ja: "フリースならほつれないので、切りっぱなしでもOK。1cm幅に切り込んでフリンジにしても素敵です。",
            en: "Fleece does not fray, so you can leave it raw — or cut a 1 cm fringe all round.",
          },
          svg: l => svg(T("三つ折りにする場所", "the edges to hem", l), [
            piece(ponchoPiece(90, 18, 180, 92, 22, 5, true), OMOTE),
            piece(ponchoPiece(90, 110, 180, 92, 22, 18), OMOTE),
            stitch(90, 110, 159, 110, true), stitch(201, 110, 270, 110, true),
            pathEl(`M90,18 L270,18 L270,202 L90,202 Z`, { stroke: TAPE, w: 7, op: .8 }),
            txt(180, 66, T("後身頃", "back", l), { size: 11, bold: true }),
            txt(180, 170, T("前身頃", "front", l), { size: 11, bold: true }),
            txt(180, 222, T("裾", "hem", l), { size: 11, c: "#9A6A16", bold: true }),
            txt(52, 64, T("脇", "side", l), { size: 11, c: "#9A6A16", bold: true }),
            txt(52, 78, T("（開き）", "(open)", l), { size: 10, c: "#9A6A16" }),
            txt(308, 160, T("脇", "side", l), { size: 11, c: "#9A6A16", bold: true }),
            txt(308, 174, T("（開き）", "(open)", l), { size: 10, c: "#9A6A16" }),
            txt(180, 12, T("ぐるりと一周", "all the way round", l), { size: 10, c: MUTED }),
          ].join("\n"), 236),
        },
        {
          h: { ja: "1cm折って、アイロンで押さえる", en: "Fold under 1 cm and press" },
          text: {
            ja: "裏を上にして置き、布端を裏側へ1cm折ってアイロンで押さえます。まず一周ぶん、この1回目の折りを付けておきます。",
            en: "With the wrong side up, fold the raw edge over 1 cm toward you and press. Do the whole way round with this first fold.",
          },
          svg: l => svg(T("1回目の折り", "first fold", l), [
            saBand(222, 122, 40, 22),
            layer(`M40,140 L260,140 L260,126 L222,126`),
            arrow(250, 90, 238, 118, BLUE, 8),
            pathEl(`M222,158 L222,166 L260,166 L260,158`, { stroke: RED, w: 1.6 }),
            txt(241, 184, T("1cm", "1 cm", l), { c: RED, bold: true }),
            txt(120, 124, T("裏", "wrong side", l), { size: 10, c: MUTED }),
            txt(120, 164, T("表", "right side", l), { size: 10, c: MUTED }),
            txt(180, 212, T("布端を横から見たところ", "edge, side view", l), { size: 10, c: MUTED }),
            key(l, ["sa"]),
          ].join("\n")),
        },
        {
          h: { ja: "もう一度折って、まち針でとめる", en: "Fold again and pin" },
          text: {
            ja: "折った端をもう一度、残りの縫い代の幅で折ります。布端が折り目の中に隠れれば三つ折りのでき上がり。まち針でとめておきます。",
            en: "Fold it over once more, by the rest of the seam allowance, so the raw edge is tucked inside. Pin it in place.",
          },
          svg: l => svg(T("2回目の折り（三つ折り）", "second fold (double-fold hem)", l), [
            saBand(196, 118, 66, 36),
            layer(`M40,150 L260,150 L260,136 L196,136 L196,122 L240,122`),
            arrow(270, 96, 246, 118, BLUE, 8),
            pin(222, 136, 40),
            txt(120, 134, T("裏", "wrong side", l), { size: 10, c: MUTED }),
            txt(120, 174, T("表", "right side", l), { size: 10, c: MUTED }),
            txt(228, 196, T("布端が中に隠れる", "raw edge tucked inside", l), { size: 10, c: RED, bold: true }),
          ].join("\n")),
        },
        {
          h: { ja: "角は、片側ずつ折る", en: "At the corners, fold one side first" },
          text: {
            ja: "裾と脇が出会う角は、先に裾側を三つ折りにし、その上に脇側を重ねて折ります。一度に両方を折るより、布が重なりすぎず、角がきれいに出ます。",
            en: "Where the hem meets the side, fold the hem edge first, then fold the side edge over it. The corner comes out neater and less bulky than folding both at once.",
          },
          svg: l => svg(T("角の折り方", "folding a corner", l), [
            `        <rect x="60" y="30" width="240" height="170" fill="${URA}" stroke="${INK}" stroke-width="2"/>`,
            `        <rect x="60" y="172" width="240" height="28" fill="${TAPE}" opacity=".45" stroke="#9A6A16" stroke-width="1.4"/>`,
            `        <rect x="272" y="30" width="28" height="170" fill="${TAPE}" opacity=".85" stroke="#9A6A16" stroke-width="1.4"/>`,
            txt(150, 191, T("① 先に裾を折る", "① fold the hem first", l), { c: "#7A5410", bold: true }),
            txt(262, 110, T("② 脇を重ねる", "② then the side", l), { a: "end", c: "#7A5410", bold: true }),
            txt(160, 90, T("身頃（裏）", "body (wrong side)", l), { size: 11, c: MUTED }),
            `        <circle cx="286" cy="186" r="15" fill="none" stroke="${RED}" stroke-width="2"/>`,
            txt(180, 226, T("裏から見た、裾と脇の角", "hem-side corner, from the wrong side", l), { size: 10, c: MUTED }),
          ].join("\n")),
        },
        {
          h: { ja: "折り山の際を、ぐるりと縫う", en: "Stitch close to the fold all round" },
          text: {
            ja: "裏側から、内側の折り山の際（1〜2mm内側）を一周縫います。角ではミシンの針を刺したまま押さえを上げ、布を90度回してから続けて縫います。",
            en: "From the wrong side, stitch 1–2 mm from the inner fold all the way round. At each corner, leave the needle down, lift the presser foot, turn the fabric 90° and carry on.",
          },
          svg: l => svg(T("三つ折りの際を縫う", "stitching the double-fold hem", l), [
            saBand(196, 118, 66, 36),
            layer(`M40,150 L260,150 L260,136 L196,136 L196,122 L240,122`),
            line(206, 104, 206, 166, RED, 2.6, "6 4"),
            txt(206, 94, T("折り山の際を縫う", "stitch by the fold", l), { c: RED, bold: true }),
            txt(120, 134, T("裏", "wrong side", l), { size: 10, c: MUTED }),
            txt(120, 174, T("表", "right side", l), { size: 10, c: MUTED }),
            txt(180, 206, T("これで完成！", "and it's finished", l), { size: 12, c: BLUE, bold: true }),
            key(l, ["sa", "stitch"]),
          ].join("\n")),
        },
      ],
    },
  ],
};
