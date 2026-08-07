/* ============================================================
   幾何ユーティリティ
   ============================================================ */
function signedArea(p){let a=0;for(let i=0;i<p.length;i++){const q=p[(i+1)%p.length];a+=p[i].x*q.y-q.x*p[i].y;}return a/2;}
// pts: 時計回り(y-down)前提。dist: 各辺(pts[i]→pts[i+1])の外向きオフセット量
function offsetPolygon(pts, dist){
  let p=pts.slice(), d=dist.slice();
  if(signedArea(p)<0){p.reverse(); d.reverse();}
  const n=p.length, lines=[];
  for(let i=0;i<n;i++){
    const a=p[i], b=p[(i+1)%n];
    let dx=b.x-a.x, dy=b.y-a.y; const L=Math.hypot(dx,dy)||1; dx/=L; dy/=L;
    const nx=dy, ny=-dx;                       // area>0 巻きの外向き法線
    const off=d[i]||0;
    lines.push({x:a.x+nx*off, y:a.y+ny*off, dx, dy, nx, ny, off});
  }
  // 鋭角の頂点では2本のオフセット線の交点が頂点から大きく離れ、縫い代線が
  // 細長いトゲになる。市販の型紙と同じように、伸びすぎた角は面取りする。
  const MITER=2.5;
  const out=[];
  for(let i=0;i<n;i++){
    const l1=lines[(i-1+n)%n], l2=lines[i], v=p[i];
    const det=l1.dx*(-l2.dy)-(-l1.dy)*l2.dx;
    if(Math.abs(det)<1e-9){out.push({x:l2.x,y:l2.y});continue;}
    const t=((l2.x-l1.x)*(-l2.dy)-(l2.y-l1.y)*(-l2.dx))/det;
    const q={x:l1.x+l1.dx*t,y:l1.y+l1.dy*t};
    const lim=Math.max(l1.off,l2.off)*MITER;
    if(lim>0 && Math.hypot(q.x-v.x,q.y-v.y)>lim){
      out.push({x:v.x+l1.nx*l1.off, y:v.y+l1.ny*l1.off});
      out.push({x:v.x+l2.nx*l2.off, y:v.y+l2.ny*l2.off});
    }else{
      out.push(q);
    }
  }
  return out;
}
function quad(p0,p1,p2,n){const a=[];for(let i=1;i<=n;i++){const t=i/n,u=1-t;
  a.push({x:u*u*p0.x+2*u*t*p1.x+t*t*p2.x,y:u*u*p0.y+2*u*t*p1.y+t*t*p2.y});}return a;}
function bbox(pts){let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const p of pts){
  x0=Math.min(x0,p.x);y0=Math.min(y0,p.y);x1=Math.max(x1,p.x);y1=Math.max(y1,p.y);}
  return {x0,y0,x1,y1,w:x1-x0,h:y1-y0};}
function plen(a){let s=0;for(let i=1;i<a.length;i++)s+=Math.hypot(a[i].x-a[i-1].x,a[i].y-a[i-1].y);return s;}
const cm=v=>v*10; // cm→mm
// quad() は始点を含まない点列を返すので、曲線の実長は始点を足して測る。
// これを忘れると袖ぐりの長さが1区間ぶん（約1割）短く出て、袖山が足りなくなる。
const arcLen=(p0,curve)=>plen([p0,...curve]);
// 角の丸み半径を、その角が接する辺の長さの半分までに抑える。
// 半径が辺の半分を超えると出来上がり線が自己交差し、縫い代線に長いトゲが出ます。
const clampR=(r,...sides)=>Math.max(0,Math.min(r,...sides.map(s=>s/2)));

/* ============================================================
   パターン定義
   各 generator(params, sa)  →  { pieces:[ piece... ] }
   piece = { title, cutInfo, finished:[{x,y}], cut:[{x,y}],
             grain:{x1,y1,x2,y2}|null, foldX:Number|null,
             notches:[{x,y}], labelAt:{x,y} }
   座標は piece ローカル(時計回り, y-down)。配置はレイアウト時に平行移動。
   ============================================================ */

// 連続する重複頂点を除去する（始点=終点も含む）。
// 長さ0の辺が残ると offsetPolygon の法線が定まらず、縫い代線にトゲが出る。
function dedupe(pts){
  const out=[];
  for(const p of pts){
    const q=out[out.length-1];
    if(!q || Math.hypot(p.x-q.x,p.y-q.y)>1e-6) out.push(p);
  }
  while(out.length>2){
    const a=out[0], b=out[out.length-1];
    if(Math.hypot(a.x-b.x,a.y-b.y)<=1e-6) out.pop(); else break;
  }
  return out;
}

function pieceFrom(finished, foldEdgeTest, sa){
  // foldEdgeTest(a,b) → true なら その辺は縫い代0(=わ)
  finished = dedupe(finished);
  const dist=finished.map((p,i)=>{
    const b=finished[(i+1)%finished.length];
    return foldEdgeTest(p,b)?0:sa;
  });
  return {finished, cut:offsetPolygon(finished,dist)};
}

const PATTERNS={
  /* ---- 汎用パネル（四角） ---- */
  panel:{
    mode:"bag",
    name:"四角パネル",
    note:"クッションカバー・バッグの面・小物などに。幅と高さを入れるだけ。片側を「わ」にすると左右対称に裁てます。",
    params:[
      {key:"w",label:"仕上がり幅",unit:"cm",min:5,max:120,step:0.5,val:40},
      {key:"h",label:"仕上がり高さ",unit:"cm",min:5,max:160,step:0.5,val:40},
    ],
    toggles:[{key:"fold",label:"左端を「わ」にする",val:false}],
    gen(p,sa){
      const W=cm(p.w),H=cm(p.h);
      const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
      const isFold=(a,b)=> p.fold && a.x===0 && b.x===0;
      const pc=pieceFrom(fin,isFold,sa);
      return {pieces:[{
        title:"パネル", cutInfo:p.fold?"「わ」で左右対称 ／ 必要枚数だけ裁断":"必要枚数だけ裁断",
        ...pc, foldX:p.fold?0:null,
        grain:{x1:W/2,y1:12,x2:W/2,y2:H-12},
        notches:[], labelAt:{x:W/2,y:H/2}
      }]};
    }
  },

  /* ---- トートバッグ（角マチ式） ---- */
  tote:{
    mode:"bag",
    name:"トートバッグ",
    note:"角マチ式。本体は底で輪に折って裁つ前提（前後つながり）。底角の四角を切り欠いて縫うとマチになります。持ち手は別ピース。",
    params:[
      {key:"w",label:"仕上がり幅",unit:"cm",min:15,max:55,step:0.5,val:34},
      {key:"h",label:"仕上がり高さ",unit:"cm",min:15,max:50,step:0.5,val:36},
      {key:"d",label:"マチ（底の奥行）",unit:"cm",min:2,max:24,step:0.5,val:12},
      {key:"hl",label:"持ち手の長さ",unit:"cm",min:20,max:80,step:1,val:55},
      {key:"hw",label:"持ち手の裁ち幅",unit:"cm",min:3,max:10,step:0.5,val:6},
    ],
    presets:[
      {label:"通園バッグS",    vals:{w:30, h:30, d:4,  hl:36, hw:6}},
      {label:"レッスンバッグ", vals:{w:40, h:30, d:6,  hl:40, hw:6}},
      {label:"A4縦対応",       vals:{w:32, h:38, d:8,  hl:42, hw:6}},
      {label:"たっぷり",       vals:{w:38, h:36, d:12, hl:50, hw:6}},
    ],
    toggles:[],
    gen(p,sa){
      const W=cm(p.w),H=cm(p.h),D=cm(p.d),c=D/2;
      const PW=W+D, PH=H+c;        // 角マチ式の標準寸法
      // 本体（底=下端を「わ」にして前後一枚で裁つ）。下端中央が輪。
      const fin=[
        {x:0,y:0},{x:PW,y:0},
        {x:PW,y:PH-c},{x:PW-c,y:PH-c},{x:PW-c,y:PH},
        {x:c,y:PH},{x:c,y:PH-c},{x:0,y:PH-c}
      ];
      const isFold=(a,b)=> a.y===PH && b.y===PH; // 底辺=わ
      const pc=pieceFrom(fin,isFold,sa);
      const body={
        title:"本体", cutInfo:"底（下端）を「わ」に置いて 1枚 ／ 底角の□を切り欠く",
        ...pc, foldX:null, foldY:PH,
        grain:{x1:PW/2,y1:14,x2:PW/2,y2:PH-c-10},
        notches:[{x:PW-c,y:PH-c},{x:c,y:PH-c}],
        labelAt:{x:PW/2,y:(PH-c)/2},
        cornerMark:[{x:PW-c,y:PH-c,c},{x:0,y:PH-c,c}]
      };
      // 持ち手
      const HLL=cm(p.hl),HWW=cm(p.hw);
      const hf=[{x:0,y:0},{x:HWW,y:0},{x:HWW,y:HLL},{x:0,y:HLL}];
      const hpc=pieceFrom(hf,()=>false,sa);
      const handle={
        title:"持ち手", cutInfo:"2枚（左右）", ...hpc, foldX:null,
        grain:{x1:HWW/2,y1:14,x2:HWW/2,y2:HLL-14},
        notches:[], labelAt:{x:HWW/2,y:HLL/2}
      };
      return {pieces:[body,handle]};
    }
  },

  /* ---- Aラインスカート ---- */
  skirt:{
    mode:"human",
    name:"Aラインスカート",
    note:"前後とも中心を「わ」に置く簡易Aライン（タックなし）。ウエストはゴムまたは脇あきを想定。前後で1枚ずつ＝計2枚裁ちます。",
    params:[
      {key:"waist",label:"ウエスト",unit:"cm",min:50,max:110,step:1,val:70},
      {key:"hip",label:"ヒップ",unit:"cm",min:70,max:130,step:1,val:94},
      {key:"len",label:"スカート丈",unit:"cm",min:30,max:95,step:1,val:58},
      {key:"drop",label:"ヒップ下がり",unit:"cm",min:14,max:24,step:0.5,val:19},
      {key:"flare",label:"裾フレア（脇に+）",unit:"cm",min:0,max:25,step:0.5,val:9},
    ],
    presets:[
      {label:"S",  vals:{waist:62, hip:86,  len:56, drop:18, flare:8}},
      {label:"M",  vals:{waist:70, hip:94,  len:58, drop:19, flare:9}},
      {label:"L",  vals:{waist:78, hip:102, len:60, drop:20, flare:10}},
      {label:"LL", vals:{waist:86, hip:110, len:62, drop:21, flare:11}},
    ],
    toggles:[],
    gen(p,sa){
      const qW=cm(p.waist)/4, qH=cm(p.hip)/4, L=cm(p.len), drop=cm(p.drop), fl=cm(p.flare);
      const sideDip=10; // 脇のウエストを少し下げる
      // 出来上がり線（時計回り, 左=中心わ）
      const wTop={x:0,y:0};
      const wSide={x:qW,y:sideDip};
      const hipPt={x:qH,y:drop};
      const hemSide={x:qH+fl,y:L};
      const hemCF={x:0,y:L};
      let fin=[wTop];
      // ウエスト: CF→脇 ゆるい下りカーブ
      fin=fin.concat(quad(wTop,{x:qW*0.55,y:0},wSide,10));
      // 脇: ウエスト→ヒップ 外ぶくらみ
      fin=fin.concat(quad(wSide,{x:qH*1.02,y:drop*0.62},hipPt,12));
      // ヒップ→裾(直線フレア)
      fin.push(hemSide);
      // 裾: 脇→CF（CFで直角になるよう少し持ち上げ）
      fin=fin.concat(quad(hemSide,{x:qH*0.5,y:L+Math.min(8,fl*0.4)},hemCF,10));
      // CF（わ・直線で上へ）
      fin.push(hemCF);
      const isFold=(a,b)=> a.x===0 && b.x===0; // CF=わ
      const pc=pieceFrom(fin,isFold,sa);
      return {pieces:[{
        title:"前/後 スカート", cutInfo:"中心を「わ」に置いて 前1枚・後1枚（計2枚）",
        ...pc, foldX:0,
        grain:{x1:qH*0.42,y1:drop*0.5,x2:qH*0.42,y2:L*0.86},
        notches:[{x:qH,y:drop}],
        labelAt:{x:qH*0.42,y:L*0.5}
      }]};
    }
  },

  /* ---- Tシャツ（ドロップショルダーのボックスT） ---- */
  tee:{
    mode:"human",
    order:0,
    name:"Tシャツ",
    note:"肩を落としたゆったりボックスT。前後身頃＋袖。まず仮縫いで衿ぐり・袖ぐりを確認してから本縫いを。ニット地向き。",
    params:[
      {key:"bust",label:"バスト",unit:"cm",min:74,max:130,step:1,val:100},
      {key:"len",label:"着丈",unit:"cm",min:45,max:85,step:1,val:66},
      {key:"shoulder",label:"肩幅",unit:"cm",min:34,max:56,step:1,val:44},
      {key:"sleeve",label:"袖丈",unit:"cm",min:8,max:60,step:1,val:20},
      {key:"cuff",label:"袖口（裁ち幅）",unit:"cm",min:10,max:32,step:1,val:18},
      {key:"neckw",label:"衿ぐり幅",unit:"cm",min:14,max:24,step:0.5,val:18},
      {key:"ease",label:"ゆとり（総量）",unit:"cm",min:0,max:30,step:1,val:12},
    ],
    presets:[
      {label:"レディースS", vals:{bust:84,  len:58, shoulder:38, sleeve:18, cuff:16, neckw:17, ease:12}},
      {label:"レディースM", vals:{bust:90,  len:62, shoulder:40, sleeve:19, cuff:17, neckw:18, ease:12}},
      {label:"メンズM",     vals:{bust:96,  len:68, shoulder:44, sleeve:20, cuff:18, neckw:18, ease:12}},
      {label:"メンズL",     vals:{bust:104, len:71, shoulder:46, sleeve:22, cuff:19, neckw:19, ease:14}},
    ],
    toggles:[],
    gen(p,sa){
      const HW=cm(p.bust)/4+cm(p.ease)/4, L=cm(p.len), NWh=cm(p.neckw)/2;
      const slope=cm(4), SHx=cm(p.shoulder)/2+cm(3), ADy=cm(24);
      const body=(back)=>{
        const FD=cm(back?2.5:8);
        const neckCurve=quad({x:0,y:FD},{x:NWh*0.5,y:FD},{x:NWh,y:0},10);
        const armCurve=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
        let fin=[{x:0,y:FD}].concat(neckCurve);
        fin.push({x:SHx,y:slope});
        fin=fin.concat(armCurve);
        fin.push({x:HW,y:L}); fin.push({x:0,y:L});
        const isFold=(a,b)=>a.x===0&&b.x===0;
        const pc=pieceFrom(fin,isFold,sa);
        return {pc,
          arm:arcLen({x:SHx,y:slope},armCurve), neck:arcLen({x:0,y:FD},neckCurve),
          piece:{title:back?"後身頃":"前身頃",
            cutInfo:`中心を「わ」／${back?"後ろ":"前"} 1枚`,
            ...pc, foldX:0,
            grain:{x1:HW*0.5,y1:slope+8,x2:HW*0.5,y2:L-14},
            notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.55}}};
      };
      const F=body(false), B=body(true);
      // 袖（左右対称・cut2）
      const armSeam=F.arm+B.arm, capFull=armSeam, SL=cm(p.sleeve), cuff=cm(p.cuff), capH=cm(2.5), cx=capFull/2;
      let sf=[{x:0,y:capH}];
      sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
      sf=sf.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
      sf.push({x:(capFull+cuff)/2,y:SL}); sf.push({x:(capFull-cuff)/2,y:SL});
      const spc=pieceFrom(sf,()=>false,sa);
      const sleeve={title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
        grain:{x1:cx,y1:capH+6,x2:cx,y2:SL-6},
        notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.55}};
      return {pieces:[F.piece,B.piece,sleeve],
        memo:`衿ぐり1周 約${((F.neck+B.neck)/10).toFixed(0)}cm（衿ぐりバインダーの参考長）`};
    }
  },

  /* ---- 巾着（子供用の小袋） ---- */
  kinchaku:{
    mode:"small",
    name:"巾着袋",
    note:"1枚の布を底（下端）で輪に折って両脇を縫う、いちばん簡単な巾着。上部の点線がひも通し口（折り返し）の目安です。",
    params:[
      {key:"w",label:"仕上がり幅",unit:"cm",min:8,max:45,step:0.5,val:22},
      {key:"h",label:"仕上がり高さ",unit:"cm",min:8,max:50,step:0.5,val:26},
      {key:"casing",label:"ひも通し下がり",unit:"cm",min:2,max:8,step:0.5,val:4},
    ],
    presets:[
      {label:"給食袋",     vals:{w:18, h:22, casing:3.5}},
      {label:"体操着袋",   vals:{w:30, h:35, casing:4}},
      {label:"お着替え袋", vals:{w:35, h:40, casing:4}},
    ],
    toggles:[],
    gen(p,sa){
      const W=cm(p.w),H=cm(p.h),cas=cm(p.casing);
      const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:2*H},{x:0,y:2*H}];
      const isFold=(a,b)=>a.y===2*H&&b.y===2*H; // 底辺=わ
      const pc=pieceFrom(fin,isFold,sa);
      return {pieces:[{
        title:"袋本体", cutInfo:"底（下端）を「わ」に置いて 1枚",
        ...pc, foldX:null, foldY:2*H,
        grain:{x1:W/2,y1:cas+18,x2:W/2,y2:2*H-18},
        notches:[], labelAt:{x:W/2,y:H},
        casingLines:[cas, 2*H-cas]
      }]};
    }
  },

  /* ---- 蝶ネクタイ ---- */
  bowtie:{
    mode:"small",
    name:"蝶ネクタイ",
    note:"本体を中央で輪に折り、ギャザーを寄せて中央バンドで巻く定番タイプ。サイズ次第で人・子供・犬（首輪に通す）どれにも。",
    params:[
      {key:"w",label:"仕上がり幅",unit:"cm",min:5,max:16,step:0.5,val:11},
      {key:"h",label:"仕上がり高さ",unit:"cm",min:3,max:10,step:0.5,val:6},
      {key:"knotw",label:"中央バンド幅",unit:"cm",min:1.5,max:4,step:0.5,val:2.5},
      {key:"band",label:"首バンドの長さ",unit:"cm",min:10,max:60,step:1,val:38},
    ],
    toggles:[{key:"addband",label:"首バンドを付ける（人・子供用）",val:true}],
    gen(p,sa){
      const W=cm(p.w),H=cm(p.h),KW=cm(p.knotw),KL=cm(p.h)+cm(3);
      // 本体（中央で輪に折るので幅は仕上がりの2倍）
      const bodyFin=[{x:0,y:0},{x:2*W,y:0},{x:2*W,y:H},{x:0,y:H}];
      const body=pieceFrom(bodyFin,()=>false,sa);
      const bodyPiece={title:"本体", cutInfo:"1枚 ／ 中央(合印)で輪に折る",
        ...body, foldX:null,
        grain:{x1:W,y1:10,x2:W,y2:H-10},
        notches:[{x:W,y:0},{x:W,y:H}], labelAt:{x:W,y:H/2}};
      // 中央バンド
      const knotFin=[{x:0,y:0},{x:KW,y:0},{x:KW,y:KL},{x:0,y:KL}];
      const knot=pieceFrom(knotFin,()=>false,sa);
      const knotPiece={title:"中央バンド", cutInfo:"1枚 ／ 中央に巻いて裏で留める",
        ...knot, foldX:null,
        grain:{x1:KW/2,y1:8,x2:KW/2,y2:KL-8}, notches:[], labelAt:{x:KW/2,y:KL/2}};
      const pieces=[bodyPiece,knotPiece];
      let memo;
      if(p.addband){
        const BW=cm(3.5),BL=cm(p.band);
        const bandFin=[{x:0,y:0},{x:BW,y:0},{x:BW,y:BL},{x:0,y:BL}];
        const band=pieceFrom(bandFin,()=>false,sa);
        pieces.push({title:"首バンド", cutInfo:"1枚 ／ 二つ折りで縫い首に回す",
          ...band, foldX:null,
          grain:{x1:BW/2,y1:12,x2:BW/2,y2:BL-12}, notches:[], labelAt:{x:BW/2,y:BL/2}});
        memo=`首バンドは縦半分に折って縫う前提（仕上がり幅 約${(3.5/2).toFixed(1)}cm）`;
      }else{
        memo="首バンドなし：中央バンドを輪にして襟・首輪に通せます";
      }
      return {pieces, memo};
    }
  },

  /* ---- 犬服（筒型タンク・前足袖なし） ---- */
  dog:{
    mode:"pet",
    name:"犬服（タンクトップ）",
    note:"背パネルと腹パネルを脇で縫う筒型タンク。前足ぐりは脇の内えぐり。体型差が大きいので、まず仮縫いしてワンちゃんに合わせて調整してください。",
    params:[
      {key:"chest",label:"胴回り",unit:"cm",min:24,max:90,step:1,val:48},
      {key:"len",label:"背丈（背側）",unit:"cm",min:14,max:60,step:1,val:34},
      {key:"bellylen",label:"腹側の丈",unit:"cm",min:10,max:45,step:1,val:24},
      {key:"neck",label:"首回り",unit:"cm",min:16,max:60,step:1,val:28},
      {key:"legpos",label:"前足ぐり位置",unit:"cm",min:4,max:20,step:0.5,val:11},
      {key:"legw",label:"前足ぐり大きさ",unit:"cm",min:3,max:14,step:0.5,val:7},
      {key:"ease",label:"ゆとり（総量）",unit:"cm",min:0,max:16,step:1,val:6},
    ],
    presets:[
      {label:"小型犬S", vals:{chest:36, len:26, bellylen:18, neck:22, legpos:8,  legw:5,  ease:5}},
      {label:"中型犬M", vals:{chest:56, len:40, bellylen:28, neck:34, legpos:12, legw:8,  ease:6}},
      {label:"大型犬L", vals:{chest:76, len:52, bellylen:36, neck:44, legpos:15, legw:10, ease:8}},
    ],
    toggles:[],
    gen(p,sa){
      const HW=cm(p.chest)/4+cm(p.ease)/4;
      // 首まわりが胴回りに対して大きいと、衿ぐりの曲線がパネルの脇を追い越して
      // 出来上がり線が自己交差する。半身幅の8割までに抑える。
      const NWh=Math.min(cm(p.neck)/4, HW*0.8);
      const panel=(belly)=>{
        const L=cm(belly?p.bellylen:p.len);
        // 衿ぐりの下がりと前足ぐりが、丈の中に収まるようにする
        const Ndrop=Math.min(cm(belly?6:2.5), L*0.35);
        const legW=Math.min(cm(p.legw), (L-Ndrop)*0.7);
        const legY=Math.min(Math.max(cm(p.legpos), Ndrop+legW/2), L-legW/2);
        let fin=[{x:0,y:Ndrop}];
        fin=fin.concat(quad({x:0,y:Ndrop},{x:NWh*0.5,y:Ndrop},{x:NWh,y:0},8));
        fin.push({x:HW,y:legY-legW/2});
        fin=fin.concat(quad({x:HW,y:legY-legW/2},{x:HW-legW*0.5,y:legY},{x:HW,y:legY+legW/2},6));
        fin.push({x:HW,y:L}); fin.push({x:0,y:L});
        const isFold=(a,b)=>a.x===0&&b.x===0;
        const pc=pieceFrom(fin,isFold,sa);
        return {title:belly?"腹パネル":"背パネル",
          cutInfo:`中心を「わ」／1枚（${belly?"腹側":"背側"}）`,
          ...pc, foldX:0,
          grain:{x1:HW*0.5,y1:legY+legW,x2:HW*0.5,y2:L-12},
          notches:[{x:HW,y:legY-legW/2},{x:HW,y:legY+legW/2}],
          labelAt:{x:HW*0.5,y:(legY+legW+L)/2}};
      };
      return {pieces:[panel(false),panel(true)]};
    }
  },

  /* ---- ギャザースカート（ゴムウエスト・矩形ベース） ---- */
  gather:{
    mode:"kids",
    name:"キッズギャザースカート",
    note:"長方形を上端で折り返してゴムを通す、いちばん簡単なギャザースカート。前後2枚を脇で縫います。左端は「わ」（中心）。ギャザー倍率で布幅＝ふんわり具合が決まります。",
    params:[
      {key:"hip",label:"ヒップ（目安）",unit:"cm",min:45,max:130,step:1,val:88},
      {key:"len",label:"スカート丈",unit:"cm",min:20,max:90,step:1,val:50},
      {key:"full",label:"ギャザー倍率",unit:"倍",min:1.3,max:3,step:0.1,val:1.8},
      {key:"casing",label:"ウエスト折り返し",unit:"cm",min:2,max:8,step:0.5,val:4},
    ],
    presets:[
      {label:"子供80",  vals:{hip:50, len:21, full:1.8, casing:3}},
      {label:"子供90",  vals:{hip:54, len:24, full:1.8, casing:3}},
      {label:"子供100", vals:{hip:58, len:28, full:1.8, casing:3}},
      {label:"子供110", vals:{hip:62, len:32, full:1.8, casing:3}},
      {label:"子供120", vals:{hip:66, len:36, full:1.8, casing:3}},
      {label:"子供130", vals:{hip:70, len:40, full:1.8, casing:3}},
      {label:"大人M",   vals:{hip:92, len:55, full:1.8, casing:4}},
    ],
    toggles:[],
    gen(p,sa){
      const W=cm(p.hip)*p.full/2;          // 左端を「わ」：開くと hip×倍率
      const H=cm(p.len)+cm(p.casing);      // 丈＋ウエスト折り返し分
      const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
      const isFold=(a,b)=>a.x===0&&b.x===0; // 左端=わ（中心）
      const pc=pieceFrom(fin,isFold,sa);
      return {pieces:[{
        title:"前/後 スカート", cutInfo:"中心を「わ」に置いて 前1枚・後1枚（計2枚）",
        ...pc, foldX:0,
        grain:{x1:W/2,y1:cm(p.casing)+16,x2:W/2,y2:H-16},
        notches:[], labelAt:{x:W/2,y:H/2},
        casingLines:[cm(p.casing)], casingLabel:"ウエスト折り返し"
      }],
      memo:`上端を${p.casing}cm折り返してゴムを通す前提。仕上がりウエストはゴムの長さで決まります。`};
    }
  }
};

/* ---- キッズTシャツ：Tシャツの製図ロジックを流用し、寸法とプリセットのみ子供向けに ---- */
PATTERNS.kidstee={
  ...PATTERNS.tee,
  mode:"kids",
  name:"キッズTシャツ",
  note:"大人Tシャツと同じドロップショルダーのボックスT。寸法は子供向け。身長別プリセットを出発点に、まず仮縫いで衿ぐり・袖ぐりを確認してください。ニット地向き。",
  params:[
    {key:"bust",label:"バスト",unit:"cm",min:48,max:90,step:1,val:64},
    {key:"len",label:"着丈",unit:"cm",min:28,max:60,step:1,val:40},
    {key:"shoulder",label:"肩幅",unit:"cm",min:22,max:42,step:1,val:30},
    {key:"sleeve",label:"袖丈",unit:"cm",min:5,max:45,step:1,val:14},
    {key:"cuff",label:"袖口（裁ち幅）",unit:"cm",min:8,max:24,step:1,val:13},
    {key:"neckw",label:"衿ぐり幅",unit:"cm",min:10,max:20,step:0.5,val:14},
    {key:"ease",label:"ゆとり（総量）",unit:"cm",min:0,max:24,step:1,val:10},
  ],
  presets:[
    {label:"80cm",  vals:{bust:50, len:30, shoulder:23, sleeve:7,  cuff:10, neckw:12, ease:8}},
    {label:"90cm",  vals:{bust:54, len:34, shoulder:27, sleeve:11, cuff:12, neckw:13, ease:8}},
    {label:"100cm", vals:{bust:58, len:38, shoulder:28, sleeve:12, cuff:12, neckw:13, ease:8}},
    {label:"110cm", vals:{bust:62, len:42, shoulder:30, sleeve:13, cuff:13, neckw:14, ease:10}},
    {label:"120cm", vals:{bust:66, len:46, shoulder:31, sleeve:14, cuff:13, neckw:14, ease:10}},
    {label:"130cm", vals:{bust:70, len:50, shoulder:33, sleeve:15, cuff:14, neckw:15, ease:10}},
  ],
};

/* ---- シュシュ ---- */
PATTERNS.shuushu={
  mode:"small",
  name:"シュシュ",
  note:"布を筒状に縫ってゴムを通すヘアアクセサリー。長さでふんわり感、幅でボリュームが決まります。短辺を縫い合わせるとき少しずらしてゴムを通す口を残してください。",
  params:[
    {key:"len",label:"布の長さ",unit:"cm",min:40,max:100,step:2,val:68},
    {key:"w",  label:"裁ち幅", unit:"cm",min:6, max:18, step:0.5,val:10},
  ],
  presets:[
    {label:"細め",     vals:{len:58, w:8}},
    {label:"標準",     vals:{len:68, w:10}},
    {label:"ふんわり", vals:{len:82, w:14}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.len), H=cm(p.w);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"シュシュ本体", cutInfo:"1枚 ／ 長辺を縫って筒にし、短辺同士を縫い合わせる",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:6,x2:W/2,y2:H-6},
      notches:[], labelAt:{x:W/2,y:H/2}
    }],
    memo:`ゴム長さの目安：${Math.round(p.len*0.35)}〜${Math.round(p.len*0.4)}cm`};
  }
};

/* ---- ブックカバー ---- */
PATTERNS.bookcover={
  mode:"small",
  name:"ブックカバー",
  note:"本を包んで折り返すシンプルなカバー。上下をミシンで縫い、左右のフラップ（破線部分）を折り返して差し込むだけで固定できます。",
  params:[
    {key:"bh",   label:"本の高さ",      unit:"cm",min:10,max:26,step:0.1,val:14.8},
    {key:"bw",   label:"本の幅（片面）",unit:"cm",min:7, max:16,step:0.1,val:10.5},
    {key:"thick",label:"本の厚み",       unit:"cm",min:0.5,max:5,step:0.1,val:1.5},
    {key:"flap", label:"折り返し幅",     unit:"cm",min:3, max:8, step:0.5,val:4},
  ],
  presets:[
    {label:"文庫",  vals:{bh:14.8, bw:10.5, thick:1.5, flap:4}},
    {label:"新書",  vals:{bh:17.3, bw:10.8, thick:1.8, flap:4}},
    {label:"B6",    vals:{bh:18.2, bw:12.8, thick:2.0, flap:4}},
    {label:"A5",    vals:{bh:21.0, bw:14.8, thick:2.0, flap:5}},
  ],
  toggles:[],
  gen(p,sa){
    const BH=cm(p.bh), BW=cm(p.bw), TH=cm(p.thick), FL=cm(p.flap);
    const W=FL+BW+TH+BW+FL;
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:BH},{x:0,y:BH}];
    // 左右辺はフラップの折り返し端 → 縫い代なし
    const isFold=(a,b)=>(a.x===0&&b.x===0)||(a.x===W&&b.x===W);
    const pc=pieceFrom(fin,isFold,sa);
    return {pieces:[{
      title:"ブックカバー", cutInfo:"1枚 ／ 上下を縫い代分折ってから左右フラップを折り込む",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:8,x2:W/2,y2:BH-8},
      notches:[],
      vFoldLines:[FL, FL+BW, FL+BW+TH, FL+BW+TH+BW],
      labelAt:{x:W/2,y:BH/2}
    }]};
  }
};

/* ---- ファスナーポーチ ---- */
PATTERNS.pouch={
  mode:"bag",
  name:"ファスナーポーチ",
  note:"ファスナーを上に付けるフラットポーチ。前後2枚を縫い合わせるシンプルな作りです。ファスナーの長さ＝仕上がり幅が目安。",
  params:[
    {key:"w",label:"仕上がり幅", unit:"cm",min:8, max:40,step:1,val:20},
    {key:"h",label:"仕上がり高さ",unit:"cm",min:6, max:30,step:1,val:15},
  ],
  presets:[
    {label:"カード入れ",vals:{w:14, h:10}},
    {label:"コスメS",   vals:{w:18, h:13}},
    {label:"コスメM",   vals:{w:22, h:16}},
    {label:"コスメL",   vals:{w:28, h:20}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ポーチ前/後", cutInfo:"2枚（前後）",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:10,x2:W/2,y2:H-10},
      notches:[], labelAt:{x:W/2,y:H/2}
    }],
    memo:`ファスナー長さの目安：${p.w}cm`};
  }
};

/* ---- マナーベルト（犬用） ---- */
PATTERNS.mannerbelt={
  mode:"pet",
  name:"マナーベルト",
  note:"マーキング防止のお腹まきベルト。布を長さ方向に二つ折りにして筒状に縫い、面ファスナーで固定します。お腹周りよりやや長めに仕上げて重ね代で調整します。",
  params:[
    {key:"belly",  label:"お腹回り",          unit:"cm",min:20,max:80,step:1,  val:42},
    {key:"w",      label:"ベルト幅（仕上がり）",unit:"cm",min:4, max:15,step:0.5,val:8},
    {key:"overlap",label:"面ファスナー重ね",   unit:"cm",min:2, max:8, step:0.5,val:4},
  ],
  presets:[
    {label:"小型犬S",vals:{belly:28, w:6,  overlap:3}},
    {label:"中型犬M",vals:{belly:42, w:8,  overlap:4}},
    {label:"大型犬L",vals:{belly:58, w:10, overlap:5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.belly)+cm(p.overlap);
    const H=cm(p.w)*2;   // 二つ折りにするので裁ち幅は仕上がりの2倍
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    const ov=cm(p.overlap);
    return {pieces:[{
      title:"マナーベルト", cutInfo:"1枚 ／ 長さ方向に二つ折りにして縫い、面ファスナーを付ける",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:8,x2:W/2,y2:H-8},
      casingLines:[H/2], casingLabel:"二つ折り線",
      notches:[{x:ov/2,y:0},{x:ov/2,y:H},{x:W-ov/2,y:0},{x:W-ov/2,y:H}],
      labelAt:{x:W/2,y:H/2}
    }],
    memo:`面ファスナーは両端から約${p.overlap/2}cmの位置に付ける`};
  }
};

/* ---- ポーチ（マチ付き） ---- */
PATTERNS.pouchgusset={
  mode:"bag",
  name:"ポーチ（マチ付き）",
  note:"底角を三角につまんで縫うことでマチを作るフラットポーチ。前後2枚を縫い合わせ、底角をつまんでマチ縫い線（破線）で縫います。",
  params:[
    {key:"w",label:"仕上がり幅", unit:"cm",min:10,max:40,step:1,val:22},
    {key:"h",label:"仕上がり高さ",unit:"cm",min:6, max:30,step:1,val:15},
    {key:"d",label:"マチ（底の奥行き）",unit:"cm",min:2,max:12,step:1,val:5},
  ],
  presets:[
    {label:"コスメS",    vals:{w:18, h:12, d:4}},
    {label:"コスメM",    vals:{w:22, h:15, d:5}},
    {label:"コスメL",    vals:{w:26, h:17, d:6}},
    {label:"ペンケース", vals:{w:20, h:10, d:4}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), D=cm(p.d);
    const Hcut=H+D/2;
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:Hcut},{x:0,y:Hcut}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ポーチ前/後", cutInfo:"2枚（前後）／ 底角を三角につまんでマチ縫い線で縫う",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:10,x2:W/2,y2:Hcut-10},
      casingLines:[H], casingLabel:"マチ縫い線（底角をつまんでここで縫う）",
      notches:[], labelAt:{x:W/2,y:H/2}
    }],
    memo:`ファスナー長さの目安：${p.w}cm　マチ：${p.d}cm`};
  }
};

/* ---- エプロン ---- */
PATTERNS.apron={
  mode:"human",
  name:"エプロン",
  note:"台形本体＋腰ひも2本＋衿ひも1本の3ピース。腰ひも付け位置は破線で表示。ポケットは好みで追加してください。",
  params:[
    {key:"chest", label:"胸幅（上端）",        unit:"cm",min:24,max:50,step:1,  val:34},
    {key:"hip",   label:"裾幅",                unit:"cm",min:40,max:80,step:1,  val:58},
    {key:"len",   label:"エプロン丈",           unit:"cm",min:40,max:90,step:1,  val:70},
    {key:"waist", label:"腰ひも位置（上から）", unit:"cm",min:15,max:45,step:1,  val:28},
    {key:"tieL",  label:"腰ひも長さ（片側）",  unit:"cm",min:50,max:120,step:1, val:65},
    {key:"neckL", label:"衿ひも長さ",           unit:"cm",min:50,max:100,step:1, val:65},
    {key:"tieW",  label:"ひも裁ち幅",           unit:"cm",min:4, max:10, step:0.5,val:6},
  ],
  presets:[
    {label:"大人フル",   vals:{chest:34, hip:58, len:70, waist:28, tieL:65, neckL:65, tieW:6}},
    {label:"大人ハーフ", vals:{chest:30, hip:52, len:42, waist:20, tieL:62, neckL:62, tieW:6}},
    {label:"子供",       vals:{chest:26, hip:44, len:55, waist:22, tieL:50, neckL:55, tieW:5}},
  ],
  toggles:[],
  gen(p,sa){
    const CW=cm(p.chest), HW=cm(p.hip), L=cm(p.len), off=(HW-CW)/2;
    // 本体（台形）
    const bodyFin=[{x:off,y:0},{x:off+CW,y:0},{x:HW,y:L},{x:0,y:L}];
    const bodypc=pieceFrom(bodyFin,()=>false,sa);
    const body={title:"本体", cutInfo:"1枚",
      ...bodypc, foldX:null,
      grain:{x1:HW/2,y1:L*0.15,x2:HW/2,y2:L*0.85},
      casingLines:[cm(p.waist)], casingLabel:"腰ひも付け位置",
      notches:[], labelAt:{x:HW/2,y:L*0.6}};
    // 腰ひも（2枚）
    const TL=cm(p.tieL), TW=cm(p.tieW);
    const tieFin=[{x:0,y:0},{x:TW,y:0},{x:TW,y:TL},{x:0,y:TL}];
    const tiepc=pieceFrom(tieFin,()=>false,sa);
    const tie={title:"腰ひも", cutInfo:"2枚",
      ...tiepc, foldX:null,
      grain:{x1:TW/2,y1:12,x2:TW/2,y2:TL-12},
      notches:[], labelAt:{x:TW/2,y:TL/2}};
    // 衿ひも（1枚）
    const NL=cm(p.neckL);
    const neckFin=[{x:0,y:0},{x:TW,y:0},{x:TW,y:NL},{x:0,y:NL}];
    const neckpc=pieceFrom(neckFin,()=>false,sa);
    const neck={title:"衿ひも", cutInfo:"1枚（二つ折りで縫う）",
      ...neckpc, foldX:null,
      grain:{x1:TW/2,y1:12,x2:TW/2,y2:NL-12},
      notches:[], labelAt:{x:TW/2,y:NL/2}};
    return {pieces:[body,tie,neck]};
  }
};

/* ---- サコッシュ ---- */
PATTERNS.sacoche={
  mode:"bag",
  name:"サコッシュ",
  note:"前後2枚を縫い合わせるシンプルなショルダーバッグ。ファスナーまたはマグネットホックで口を閉じます。",
  params:[
    {key:"w",     label:"仕上がり幅",      unit:"cm",min:15,max:40,step:1,  val:22},
    {key:"h",     label:"仕上がり高さ",    unit:"cm",min:12,max:35,step:1,  val:18},
    {key:"strapL",label:"ショルダーひも長さ",unit:"cm",min:80,max:180,step:5, val:120},
    {key:"strapW",label:"ひもの裁ち幅",      unit:"cm",min:3, max:8,  step:0.5,val:5},
  ],
  presets:[
    {label:"スリム", vals:{w:18, h:15, strapL:120, strapW:4}},
    {label:"標準",   vals:{w:22, h:18, strapL:130, strapW:5}},
    {label:"大きめ", vals:{w:28, h:22, strapL:140, strapW:6}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h);
    const bodyFin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const bodypc=pieceFrom(bodyFin,()=>false,sa);
    const body={title:"本体", cutInfo:"2枚（前後）",
      ...bodypc, foldX:null,
      grain:{x1:W/2,y1:10,x2:W/2,y2:H-10},
      notches:[], labelAt:{x:W/2,y:H/2}};
    const SL=cm(p.strapL), SW=cm(p.strapW);
    const strapFin=[{x:0,y:0},{x:SW,y:0},{x:SW,y:SL},{x:0,y:SL}];
    const strappc=pieceFrom(strapFin,()=>false,sa);
    const strap={title:"ショルダーひも", cutInfo:"1枚（長さ方向に二つ折りで縫う）",
      ...strappc, foldX:null,
      grain:{x1:SW/2,y1:15,x2:SW/2,y2:SL-15},
      notches:[], labelAt:{x:SW/2,y:SL/2}};
    return {pieces:[body,strap],
      memo:`ファスナー長さの目安：${p.w}cm`};
  }
};

/* ---- がまぐちポーチ ---- */
PATTERNS.gamaguchi={
  mode:"bag",
  name:"がまぐちポーチ",
  note:"口金サイズから布サイズを自動計算します。破線より上に実際の口金をあてて形を写し、布の輪郭線を調整してください。布幅は口金幅×1.6が目安。",
  params:[
    {key:"fw",   label:"口金の幅（外幅）",unit:"cm",min:8,  max:22,step:0.5,val:12},
    {key:"fh",   label:"口金の高さ",      unit:"cm",min:2,  max:8, step:0.5,val:3},
    {key:"depth",label:"ポーチの深さ",    unit:"cm",min:5,  max:20,step:1,  val:10},
  ],
  presets:[
    {label:"8cm口金",    vals:{fw:8,   fh:2.5, depth:7}},
    {label:"10.5cm口金", vals:{fw:10.5,fh:3,   depth:9}},
    {label:"15cm口金",   vals:{fw:15,  fh:4,   depth:12}},
    {label:"18cm口金",   vals:{fw:18,  fh:5,   depth:14}},
  ],
  toggles:[{key:"curve",label:"角丸タイプ（口金角の丸みに合わせる）",val:false}],
  gen(p,sa){
    const FW=cm(p.fw), FH=cm(p.fh), D=cm(p.depth);
    const W=FW*1.6;
    const H=D+FH;
    const R=FW*0.2; // 角丸半径（口金幅の20%が目安）
    let fin;
    if(p.curve){
      fin=[{x:R,y:0}];
      fin.push({x:W-R,y:0});
      fin=fin.concat(quad({x:W-R,y:0},{x:W,y:0},{x:W,y:R},5));
      fin.push({x:W,y:H},{x:0,y:H},{x:0,y:R});
      fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},5));
    } else {
      fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    }
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ポーチ本体", cutInfo:"2枚（前後）／ 上端に口金をあてて形を写す",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:FH+10,x2:W/2,y2:H-10},
      casingLines:[FH], casingLabel:"口金取り付け位置（ここに口金をあわせる）",
      notches:[], labelAt:{x:W/2,y:(FH+H)/2}
    }],
    memo:`口金${p.fw}cm用。布幅の目安：${(FW*1.6/10).toFixed(1)}cm（口金幅×1.6）`};
  }
};

/* ---- スタイ（よだれかけ） ---- */
PATTERNS.stai={
  mode:"baby",
  name:"スタイ",
  note:"表・裏2枚を重ねて縫い、返し口から表に返す定番スタイ。首ぐりのカーブは目安です。実際の首回りに合わせて調整し、スナップボタンで留めます。",
  params:[
    {key:"w",    label:"横幅",       unit:"cm",min:15,max:30,step:1,  val:20},
    {key:"len",  label:"全長",       unit:"cm",min:15,max:35,step:1,  val:24},
    {key:"neckw",label:"首くり幅",   unit:"cm",min:8, max:16,step:0.5,val:11},
    {key:"neckd",label:"首くり深さ", unit:"cm",min:3, max:8, step:0.5,val:5},
  ],
  presets:[
    {label:"新生児",  vals:{w:17, len:20, neckw:9,  neckd:4}},
    {label:"3〜6M",   vals:{w:19, len:22, neckw:10, neckd:4.5}},
    {label:"6〜12M",  vals:{w:21, len:25, neckw:11, neckd:5}},
    {label:"1〜2歳",  vals:{w:23, len:27, neckw:12, neckd:5.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), L=cm(p.len), NW=cm(p.neckw), ND=cm(p.neckd);
    const nl=(W-NW)/2, nr=(W+NW)/2;
    // ctrl.y=2*ND で実際の最深点がNDになる（ベジェ補正）
    let fin=[{x:0,y:0},{x:nl,y:0}];
    fin=fin.concat(quad({x:nl,y:0},{x:W/2,y:2*ND},{x:nr,y:0},10));
    fin.push({x:W,y:0},{x:W,y:L},{x:0,y:L});
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"スタイ本体", cutInfo:"2枚（表・裏）を重ねて縫い、返し口から表に返す",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:ND+10,x2:W/2,y2:L-10},
      notches:[], labelAt:{x:W/2,y:(ND+L)/2}
    }],
    memo:"スナップボタンは左右肩先（上端の角付近）に付ける"};
  }
};

/* ---- キッズパンツ ---- */
PATTERNS.pants={
  mode:"kids",
  name:"キッズパンツ",
  note:"前後同じ型紙のゆったりシルエット。中心線同士を縫い合わせ、脇縫いして、ウエストを折り返してゴムを通します。右端が股ぐりカーブ（中心縫い側）。仮縫いで股ぐりを確認してください。",
  params:[
    {key:"hip",    label:"ヒップ",             unit:"cm",min:44,max:130,step:1,  val:68},
    {key:"rise",   label:"股上（ウエスト〜股ぐり）",unit:"cm",min:14,max:40,step:1,  val:24},
    {key:"inseam", label:"股下（股〜裾）",      unit:"cm",min:10,max:80,step:1,  val:30},
    {key:"ease",   label:"ゆとり（総量）",      unit:"cm",min:4, max:30,step:1,  val:10},
    {key:"crotchF",label:"股ぐり延長",          unit:"cm",min:1, max:6, step:0.5,val:2.5},
    {key:"casing", label:"ウエスト折り返し",    unit:"cm",min:2, max:6, step:0.5,val:3},
  ],
  presets:[
    {label:"80cm",  vals:{hip:48, rise:15, inseam:19, ease:8,  crotchF:2,   casing:3}},
    {label:"90cm",  vals:{hip:52, rise:18, inseam:25, ease:8,  crotchF:2,   casing:3}},
    {label:"100cm", vals:{hip:56, rise:20, inseam:28, ease:8,  crotchF:2.5, casing:3}},
    {label:"110cm", vals:{hip:60, rise:21, inseam:32, ease:8,  crotchF:2.5, casing:3}},
    {label:"120cm", vals:{hip:64, rise:23, inseam:36, ease:8,  crotchF:3,   casing:3}},
    {label:"130cm", vals:{hip:68, rise:24, inseam:40, ease:8,  crotchF:3,   casing:3}},
    {label:"大人M",  vals:{hip:90, rise:30, inseam:65, ease:12, crotchF:3.5, casing:4}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.hip)+cm(p.ease))/4; // 左=脇縫い、右=中心縫い
    const CR=cm(p.rise), IL=cm(p.inseam), CAS=cm(p.casing), CF=cm(p.crotchF);
    const H=CAS+CR+IL;
    // 股ぐりカーブ：(HW,CAS)から右に張り出して(HW+CF, CAS+CR)へ
    let fin=[{x:0,y:0},{x:HW,y:0},{x:HW,y:CAS}];
    fin=fin.concat(quad({x:HW,y:CAS},{x:HW+CF,y:CAS},{x:HW+CF,y:CAS+CR},8));
    fin.push({x:HW+CF,y:H},{x:0,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"前/後パンツ", cutInfo:"前後それぞれ2枚（左右）計4枚／中心線・股ぐり同士を縫う",
      ...pc, foldX:null,
      grain:{x1:HW/2,y1:CAS+CR/2,x2:HW/2,y2:H-20},
      casingLines:[CAS], casingLabel:"ウエスト折り返し",
      notches:[{x:HW+CF,y:CAS+CR}], labelAt:{x:HW/2,y:CAS+(CR+IL)/2}
    }],
    memo:`ウエストゴム長の目安：${Math.round((cm(p.hip)+cm(p.ease))*0.875/10)}cm`};
  }
};

/* ---- ランチョンマット ---- */
PATTERNS.placemat={
  mode:"small",
  name:"ランチョンマット",
  note:"四辺を縫うシンプルなランチョンマット。縫い代を折りながら縫う一重仕立て、または表裏2枚を縫い合わせて返す二重仕立てどちらにも対応できます。",
  params:[
    {key:"w",label:"横幅",   unit:"cm",min:25,max:55,step:1,val:36},
    {key:"h",label:"縦（高さ）",unit:"cm",min:15,max:40,step:1,val:26},
  ],
  presets:[
    {label:"幼稚園",  vals:{w:40, h:30}},
    {label:"小学校",  vals:{w:36, h:26}},
    {label:"A4横",    vals:{w:30, h:21}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ランチョンマット", cutInfo:"1枚（一重）または2枚（表・裏・二重仕立て）",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:10,x2:W/2,y2:H-10},
      notches:[], labelAt:{x:W/2,y:H/2}
    }]};
  }
};

/* ---- ティッシュケース ---- */
PATTERNS.tissuecase={
  mode:"small",
  name:"ティッシュケース",
  note:"1枚の布を折って作るポケットティッシュカバー。上下2辺（開口部）を折りヘムし、中央で重なるように折ってから左右の脇を縫います。破線はヘムと中央折りの目安。",
  params:[
    {key:"pw",  label:"ティッシュの横幅",  unit:"cm",min:9,  max:14,step:0.5,val:11.5},
    {key:"ph",  label:"ティッシュの高さ",  unit:"cm",min:6,  max:10,step:0.5,val:7.5},
    {key:"flap",label:"差し込み代（重なり）",unit:"cm",min:2,max:5, step:0.5,val:3},
  ],
  presets:[
    {label:"標準", vals:{pw:11.5, ph:7.5, flap:3}},
    {label:"大判", vals:{pw:13,   ph:9,   flap:3.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.pw), PH=cm(p.ph), FL=cm(p.flap);
    const H=2*(PH+FL);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ケース本体", cutInfo:"1枚 ／ 上下辺をヘムしてから中央で折り、両脇を縫う",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:10,x2:W/2,y2:H-10},
      casingLines:[FL, H/2, H-FL], casingLabel:"折り目の目安（上下＝ヘム折り・中央＝組み立て折り）",
      notches:[], labelAt:{x:W/2,y:H/2}
    }]};
  }
};

/* ---- ヘアバンド ---- */
PATTERNS.headband={
  mode:"small",
  name:"ヘアバンド",
  note:"長辺を縫って筒にし、短辺同士を縫い合わせるヘアバンド。シュシュと同じ作り方で幅広にしたもの。ニット地は伸縮を利用しゴムなしでも使えます。",
  params:[
    {key:"len",label:"布の長さ",unit:"cm",min:40,max:70,step:2,val:54},
    {key:"w",  label:"裁ち幅", unit:"cm",min:8, max:20,step:0.5,val:13},
  ],
  presets:[
    {label:"子供",    vals:{len:46, w:10}},
    {label:"大人S",   vals:{len:50, w:12}},
    {label:"大人M",   vals:{len:54, w:14}},
    {label:"ターバン", vals:{len:60, w:20}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.len), H=cm(p.w);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ヘアバンド本体", cutInfo:"1枚 ／ 長辺を縫って筒にし、短辺同士を縫い合わせる",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:6,x2:W/2,y2:H-6},
      notches:[], labelAt:{x:W/2,y:H/2}
    }],
    memo:`ゴムを使う場合：頭回りの65〜70%の長さが目安`};
  }
};

/* ---- 移動ポケット ---- */
PATTERNS.movepocket={
  mode:"small",
  name:"移動ポケット",
  note:"ランドセルのベルトに通して使う移動ポケット。本体2枚＋フラップ2枚＋ベルト通し1枚の3種。本体とフラップを中表で縫って返し、ベルト通しで束ねます。",
  params:[
    {key:"pw",    label:"ポケット幅",        unit:"cm",min:8,  max:20,step:0.5,val:12},
    {key:"ph",    label:"ポケット高さ",      unit:"cm",min:10, max:25,step:0.5,val:15},
    {key:"flapH", label:"フラップ高さ",      unit:"cm",min:3,  max:10,step:0.5,val:5},
    {key:"strapW",label:"ランドセルベルト幅",unit:"cm",min:2.5,max:5, step:0.5,val:3.5},
  ],
  presets:[
    {label:"小さめ", vals:{pw:10, ph:12, flapH:4,  strapW:3.5}},
    {label:"標準",   vals:{pw:12, ph:15, flapH:5,  strapW:3.5}},
    {label:"大きめ", vals:{pw:14, ph:18, flapH:6,  strapW:4}},
  ],
  toggles:[],
  gen(p,sa){
    const PW=cm(p.pw), PH=cm(p.ph), FH=cm(p.flapH), SW=cm(p.strapW);
    // 本体
    const bodyFin=[{x:0,y:0},{x:PW,y:0},{x:PW,y:PH},{x:0,y:PH}];
    const bodypc=pieceFrom(bodyFin,()=>false,sa);
    const body={title:"本体", cutInfo:"2枚（表・裏）",
      ...bodypc, foldX:null,
      grain:{x1:PW/2,y1:10,x2:PW/2,y2:PH-10},
      notches:[], labelAt:{x:PW/2,y:PH/2}};
    // フラップ
    const flapFin=[{x:0,y:0},{x:PW,y:0},{x:PW,y:FH},{x:0,y:FH}];
    const flappc=pieceFrom(flapFin,()=>false,sa);
    const flap={title:"フラップ", cutInfo:"2枚（表・裏）",
      ...flappc, foldX:null,
      grain:{x1:PW/2,y1:8,x2:PW/2,y2:FH-8},
      notches:[], labelAt:{x:PW/2,y:FH/2}};
    // ベルト通し（ストラップ幅×2＋重なり代で長さを計算）
    const BW=cm(4), BL=SW*2+cm(4);
    const beltFin=[{x:0,y:0},{x:BW,y:0},{x:BW,y:BL},{x:0,y:BL}];
    const beltpc=pieceFrom(beltFin,()=>false,sa);
    const belt={title:"ベルト通し", cutInfo:"1枚（長さ方向に二つ折り→両端を折って縫う）",
      ...beltpc, foldX:null,
      grain:{x1:BW/2,y1:8,x2:BW/2,y2:BL-8},
      notches:[], labelAt:{x:BW/2,y:BL/2}};
    return {pieces:[body,flap,belt],
      memo:`ベルト通し内径：${p.strapW}cm（ランドセルベルト幅に合わせて調整）`};
  }
};

/* ---- コップ袋（マチ付き巾着） ---- */
PATTERNS.kincgusset={
  mode:"small",
  name:"コップ袋（マチ付き）",
  note:"底に三角マチを付けた巾着。底辺はわ（輪）に置いて裁ちます。両脇を縫った後、底角の合印（▽）まで三角につまんでマチを縫い、三角部分を折ります。",
  params:[
    {key:"w",     label:"仕上がり幅",    unit:"cm",min:8, max:30,step:0.5,val:16},
    {key:"h",     label:"仕上がり高さ",  unit:"cm",min:8, max:40,step:0.5,val:20},
    {key:"gusset",label:"マチ（底の奥行）",unit:"cm",min:2,max:12,step:1,  val:4},
    {key:"casing",label:"ひも通し下がり",unit:"cm",min:2, max:8, step:0.5,val:4},
  ],
  presets:[
    {label:"コップ袋S", vals:{w:14, h:18, gusset:4,  casing:3.5}},
    {label:"コップ袋M", vals:{w:16, h:20, gusset:4,  casing:4}},
    {label:"お弁当袋",  vals:{w:22, h:24, gusset:8,  casing:4}},
    {label:"体操着袋",  vals:{w:30, h:35, gusset:8,  casing:4}},
  ],
  toggles:[],
  gen(p,sa){
    const TW=cm(p.w)+cm(p.gusset); // マチ分だけ幅を広くとる
    const TH=2*cm(p.h);
    const cas=cm(p.casing), gus=cm(p.gusset);
    const fin=[{x:0,y:0},{x:TW,y:0},{x:TW,y:TH},{x:0,y:TH}];
    const isFold=(a,b)=>a.y===TH&&b.y===TH;
    const pc=pieceFrom(fin,isFold,sa);
    return {pieces:[{
      title:"袋本体", cutInfo:"底（下端）を「わ」に置いて 1枚 ／ 脇縫い後に底角の▽位置で三角につまんでマチを縫う",
      ...pc, foldX:null, foldY:TH,
      grain:{x1:TW/2,y1:cas+18,x2:TW/2,y2:TH-18},
      casingLines:[cas, TH-cas], casingLabel:"ひも通し口",
      notches:[{x:gus/2,y:TH},{x:TW-gus/2,y:TH}],
      labelAt:{x:TW/2,y:TH/2}
    }],
    memo:`底角の合印から各辺に沿って${p.gusset/2}cmの位置でマチを縫う`};
  }
};

/* ---- 犬服（袖付き） ---- */
PATTERNS.dogsleeved={
  ...PATTERNS.dog,
  name:"犬服（袖付き）",
  note:"タンク型犬服に前足の筒袖を追加した3ピース構成。袖は前足回りに合わせて調整します。前足の形は個体差が非常に大きいため、まず袖なしタンクを仮縫いして背・腹パネルを確認してから袖を作ることをお勧めします。",
  params:[
    {key:"chest",   label:"胴回り",        unit:"cm",min:24,max:90,step:1,  val:48},
    {key:"len",     label:"背丈（背側）",  unit:"cm",min:18,max:60,step:1,  val:34},
    {key:"bellylen",label:"腹側の丈",      unit:"cm",min:10,max:45,step:1,  val:24},
    {key:"neck",    label:"首回り",        unit:"cm",min:16,max:60,step:1,  val:28},
    {key:"legpos",  label:"前足ぐり位置",  unit:"cm",min:6, max:20,step:0.5,val:11},
    {key:"legw",    label:"前足ぐり大きさ",unit:"cm",min:3, max:14,step:0.5,val:7},
    {key:"ease",    label:"ゆとり（総量）",unit:"cm",min:0, max:16,step:1,  val:6},
    {key:"sleevecirc",label:"前足回り",    unit:"cm",min:6, max:22,step:0.5,val:10},
    {key:"sleevelen", label:"袖丈",        unit:"cm",min:2, max:15,step:0.5,val:5},
    {key:"sleeveease",label:"袖ゆとり",    unit:"cm",min:1, max:6, step:0.5,val:2},
  ],
  presets:[
    {label:"小型犬S", vals:{chest:36, len:26, bellylen:18, neck:22, legpos:8,  legw:5,  ease:5, sleevecirc:7,  sleevelen:4, sleeveease:1.5}},
    {label:"中型犬M", vals:{chest:56, len:40, bellylen:28, neck:34, legpos:12, legw:8,  ease:6, sleevecirc:11, sleevelen:6, sleeveease:2}},
    {label:"大型犬L", vals:{chest:76, len:52, bellylen:36, neck:44, legpos:15, legw:10, ease:8, sleevecirc:15, sleevelen:8, sleeveease:2.5}},
  ],
  gen(p,sa){
    const base=PATTERNS.dog.gen(p,sa);
    const SC=cm(p.sleevecirc)+cm(p.sleeveease), SL=cm(p.sleevelen);
    const slFin=[{x:0,y:0},{x:SC,y:0},{x:SC,y:SL},{x:0,y:SL}];
    const slpc=pieceFrom(slFin,()=>false,sa);
    const sleeve={
      title:"前足袖", cutInfo:"2枚（左右）／ 袖口端を折ってから前足ぐり合印に合わせて縫い付ける",
      ...slpc, foldX:null,
      grain:{x1:SC/2,y1:6,x2:SC/2,y2:SL-6},
      notches:[], labelAt:{x:SC/2,y:SL/2}
    };
    return {pieces:[...base.pieces, sleeve],
      memo:`前足袖は背/腹パネルの前足ぐり（合印間）に縫い付ける。袖周り目安：${p.sleevecirc}cm＋ゆとり${p.sleeveease}cm`};
  }
};

/* ---- フレアスカート（サーキュラー） ---- */
PATTERNS.flareskirt={
  mode:"human",
  name:"フレアスカート",
  note:"サーキュラースカート。フルサークルは最大限のフレア、ハーフサークルは布使いを抑えながらたっぷりのボリュームを出すデザイン。ウエストはゴム仕様を想定。型紙は四半円（扇形）で、折りたたんだ布に置いて裁断します。",
  params:[
    {key:"waist",label:"ウエスト",unit:"cm",min:50,max:110,step:1,val:70},
    {key:"len",label:"スカート丈",unit:"cm",min:30,max:90,step:1,val:55},
    {key:"ease",label:"ウエストゆとり",unit:"cm",min:0,max:10,step:1,val:2},
  ],
  presets:[
    {label:"S",  vals:{waist:62,len:52,ease:2}},
    {label:"M",  vals:{waist:70,len:55,ease:2}},
    {label:"L",  vals:{waist:78,len:58,ease:2}},
    {label:"LL", vals:{waist:86,len:60,ease:2}},
  ],
  toggles:[{key:"half",label:"ハーフサークルにする（布使い少なめ・フレアやや控えめ）",val:false}],
  gen(p,sa){
    const W=cm(p.waist)+cm(p.ease);
    const L=cm(p.len);
    const half=p.half;
    const ri=half?W/Math.PI:W/(2*Math.PI);
    const ro=ri+L;
    const STEPS=24;
    const inv=1/Math.SQRT2;
    // 内弧（ウエスト）: θ=π/2→0 → (0,ri)から(ri,0)
    const innerArc=[];
    for(let i=0;i<=STEPS;i++){const θ=(Math.PI/2)*(1-i/STEPS);innerArc.push({x:ri*Math.cos(θ),y:ri*Math.sin(θ)});}
    // 外弧（裾）: θ=0→π/2 → (ro,0)から(0,ro)
    const outerArc=[];
    for(let i=0;i<=STEPS;i++){const θ=(Math.PI/2)*(i/STEPS);outerArc.push({x:ro*Math.cos(θ),y:ro*Math.sin(θ)});}
    // 多角形: innerArc(0,ri)→(ri,0) → コーナー(ro,0) → outerArc→(0,ro) → 閉じて(0,ri)
    const fin=[...innerArc,{x:ro,y:0},...outerArc.slice(1)];
    const EPS=0.5;
    const isFold=(a,b)=>{
      const left=Math.abs(a.x)<EPS&&Math.abs(b.x)<EPS;
      const top=Math.abs(a.y)<EPS&&Math.abs(b.y)<EPS;
      return left||(!half&&top);
    };
    const pc=pieceFrom(fin,isFold,sa);
    const g1=(ri+L*0.2)*inv,g2=(ri+L*0.65)*inv;
    return {pieces:[{
      title:"スカート",
      cutInfo:half?"後中心を「わ」に置いて1枚裁ち（計1枚）":"前中心・後中心とも「わ」に置いて1枚裁ち（計1枚）",
      ...pc,foldX:0,foldY:half?null:0,
      grain:{x1:g1,y1:g1,x2:g2,y2:g2},
      notches:[],
      labelAt:{x:(ri+ro)*0.5*inv,y:(ri+ro)*0.5*inv}
    }],
    memo:`内径(ウエスト) 約${(ri/10).toFixed(1)}cm / 外径(裾) 約${(ro/10).toFixed(1)}cm`};
  }
};

/* ---- マーメイドスカート ---- */
PATTERNS.mermaid={
  mode:"human",
  name:"マーメイドスカート",
  note:"腰からひざ下まではタイトに、裾だけ大きくフレアするマーメイドライン。上パネル（ウエスト〜切替）と下パネル（切替〜裾）の2枚構成。前後それぞれ各2枚、計4枚裁ちます。",
  params:[
    {key:"waist",label:"ウエスト",unit:"cm",min:50,max:110,step:1,val:70},
    {key:"hip",label:"ヒップ",unit:"cm",min:70,max:130,step:1,val:94},
    {key:"total",label:"スカート丈（合計）",unit:"cm",min:60,max:120,step:1,val:80},
    {key:"split",label:"切替位置（ウエストから）",unit:"cm",min:40,max:90,step:1,val:60},
    {key:"drop",label:"ヒップ下がり",unit:"cm",min:14,max:24,step:0.5,val:19},
    {key:"flare",label:"裾フレア（片側に＋）",unit:"cm",min:10,max:50,step:1,val:22},
    {key:"ease",label:"ゆとり（総量）",unit:"cm",min:2,max:14,step:1,val:4},
  ],
  presets:[
    {label:"S",  vals:{waist:62,hip:86, total:78,split:58,drop:18,flare:20,ease:4}},
    {label:"M",  vals:{waist:70,hip:94, total:80,split:60,drop:19,flare:22,ease:4}},
    {label:"L",  vals:{waist:78,hip:102,total:82,split:62,drop:20,flare:24,ease:4}},
    {label:"LL", vals:{waist:86,hip:110,total:84,split:64,drop:21,flare:26,ease:4}},
  ],
  toggles:[],
  gen(p,sa){
    const qW=cm(p.waist)/4+cm(p.ease)/4;
    const qH=cm(p.hip)/4+cm(p.ease)/4;
    const SL=cm(p.split);
    const TL=cm(p.total);
    const drop=cm(p.drop);
    const fl=cm(p.flare);
    const sideDip=10;
    const splitX=qH*0.97; // 切替幅（ヒップより僅かに絞る）
    // ---- 上パネル ----
    const wTop={x:0,y:0},wSide={x:qW,y:sideDip},hipPt={x:qH,y:drop};
    const splitSide={x:splitX,y:SL},splitCF={x:0,y:SL};
    let fin1=[wTop];
    fin1=fin1.concat(quad(wTop,{x:qW*0.55,y:0},wSide,10));
    fin1=fin1.concat(quad(wSide,{x:qH*1.02,y:drop*0.62},hipPt,12));
    fin1=fin1.concat(quad(hipPt,{x:(qH+splitX)*0.5,y:(drop+SL)*0.5},splitSide,10));
    fin1=fin1.concat(quad(splitSide,{x:splitX*0.5,y:SL},splitCF,8));
    const isFold1=(a,b)=>a.x===0&&b.x===0;
    const pc1=pieceFrom(fin1,isFold1,sa);
    const upper={
      title:"上（ウエスト〜切替）",cutInfo:"中心を「わ」に置いて 前1枚・後1枚（計2枚）",
      ...pc1,foldX:0,
      grain:{x1:qH*0.42,y1:sideDip+8,x2:qH*0.42,y2:SL*0.86},
      notches:[{x:qH,y:drop}],
      labelAt:{x:qH*0.42,y:SL*0.5}
    };
    // ---- 下パネル ----
    const flLen=TL-SL;
    const topW=splitX;
    const hemW=topW+fl;
    const fl_fin=[{x:0,y:0},{x:topW,y:0},{x:hemW,y:flLen},{x:0,y:flLen}];
    const isFold2=(a,b)=>a.x===0&&b.x===0;
    const pc2=pieceFrom(fl_fin,isFold2,sa);
    const lower={
      title:"下（切替〜裾）",cutInfo:"中心を「わ」に置いて 前1枚・後1枚（計2枚）",
      ...pc2,foldX:0,
      grain:{x1:topW*0.3,y1:flLen*0.2,x2:topW*0.3,y2:flLen*0.8},
      notches:[],
      labelAt:{x:topW*0.3,y:flLen*0.5}
    };
    return {pieces:[upper,lower],
      memo:`切替位置 ${p.split}cm / 裾の出来上がり幅（わ開き時）約${((topW+fl)*2/10).toFixed(0)}cm`};
  }
};

/* ---- ノースリーブワンピース ---- */
PATTERNS.sleevedress={
  mode:"human",
  name:"ノースリーブワンピース",
  note:"前後身頃とスカートの3パーツ構成。シンプルなAラインシルエット。衿ぐりとアームホールはバイアステープで仕上げます。",
  params:[
    {key:"bust",label:"バスト",unit:"cm",min:74,max:130,step:1,val:90},
    {key:"waist",label:"ウエスト",unit:"cm",min:55,max:110,step:1,val:70},
    {key:"hip",label:"ヒップ",unit:"cm",min:80,max:135,step:1,val:94},
    {key:"shoulder",label:"肩幅",unit:"cm",min:30,max:50,step:1,val:38},
    {key:"bodice",label:"ボディス丈（肩〜ウエスト）",unit:"cm",min:30,max:52,step:1,val:38},
    {key:"skirtlen",label:"スカート丈",unit:"cm",min:40,max:100,step:1,val:60},
    {key:"drop",label:"ヒップ下がり",unit:"cm",min:14,max:24,step:0.5,val:19},
    {key:"flare",label:"裾フレア（脇に＋）",unit:"cm",min:0,max:25,step:0.5,val:10},
    {key:"ease",label:"バストゆとり",unit:"cm",min:4,max:20,step:1,val:8},
    {key:"neckw",label:"衿ぐり幅",unit:"cm",min:10,max:22,step:0.5,val:15},
  ],
  presets:[
    {label:"S",  vals:{bust:82, waist:62,hip:88, shoulder:35,bodice:36,skirtlen:58,drop:18,flare:9, ease:8,neckw:14}},
    {label:"M",  vals:{bust:90, waist:70,hip:94, shoulder:38,bodice:38,skirtlen:60,drop:19,flare:10,ease:8,neckw:15}},
    {label:"L",  vals:{bust:98, waist:78,hip:102,shoulder:40,bodice:40,skirtlen:62,drop:20,flare:11,ease:8,neckw:16}},
    {label:"LL", vals:{bust:106,waist:86,hip:110,shoulder:42,bodice:42,skirtlen:64,drop:21,flare:12,ease:8,neckw:17}},
  ],
  toggles:[],
  gen(p,sa){
    const BW=cm(p.bust)/4+cm(p.ease)/4;
    const WW=cm(p.waist)/4;
    const BL=cm(p.bodice);
    const SHx=cm(p.shoulder)/2;
    const NWh=cm(p.neckw)/2;
    const AHy=cm(18); // 袖ぐり深さ（固定）
    // ---- 身頃（前・後共通ジェネレータ）----
    const bodice=(isBack)=>{
      const FD=cm(isBack?2.5:8);
      const neckCurve=quad({x:0,y:FD},{x:NWh*0.5,y:FD},{x:NWh,y:0},10);
      const shoulderPt={x:SHx,y:0};
      const underarm={x:BW,y:AHy};
      const armCurve=quad(shoulderPt,{x:SHx+(BW-SHx)*0.45,y:AHy*0.55},underarm,10);
      const waistSide={x:WW,y:BL};
      let fin=[{x:0,y:FD}];
      fin=fin.concat(neckCurve);
      fin.push(shoulderPt);
      fin=fin.concat(armCurve);
      fin=fin.concat(quad(underarm,{x:(BW+WW)*0.5,y:(AHy+BL)*0.55},waistSide,8));
      fin.push({x:0,y:BL});
      const isFold=(a,b)=>a.x===0&&b.x===0;
      const pc=pieceFrom(fin,isFold,sa);
      return {
        title:isBack?"後身頃":"前身頃",
        cutInfo:"中心を「わ」に置いて1枚（前1枚・後1枚）",
        ...pc,foldX:0,
        grain:{x1:BW*0.4,y1:FD+12,x2:BW*0.4,y2:BL-10},
        notches:[{x:BW,y:AHy}],
        labelAt:{x:BW*0.4,y:(FD+BL)*0.5}
      };
    };
    // ---- スカート（Aライン）----
    const qW=cm(p.waist)/4,qH=cm(p.hip)/4;
    const L=cm(p.skirtlen),drop=cm(p.drop),fl=cm(p.flare);
    const sideDip=8;
    const wTop={x:0,y:0},wSide={x:qW,y:sideDip},hipPt={x:qH,y:drop};
    const hemSide={x:qH+fl,y:L},hemCF={x:0,y:L};
    let finS=[wTop];
    finS=finS.concat(quad(wTop,{x:qW*0.55,y:0},wSide,10));
    finS=finS.concat(quad(wSide,{x:qH*1.02,y:drop*0.62},hipPt,12));
    finS.push(hemSide);
    finS=finS.concat(quad(hemSide,{x:qH*0.5,y:L+Math.min(8,fl*0.4)},hemCF,10));
    const isFoldS=(a,b)=>a.x===0&&b.x===0;
    const pcS=pieceFrom(finS,isFoldS,sa);
    const skirtPiece={
      title:"スカート（前・後共通）",cutInfo:"中心を「わ」に置いて 前1枚・後1枚（計2枚）",
      ...pcS,foldX:0,
      grain:{x1:qH*0.42,y1:drop*0.5,x2:qH*0.42,y2:L*0.86},
      notches:[{x:qH,y:drop}],
      labelAt:{x:qH*0.42,y:L*0.5}
    };
    return {pieces:[bodice(false),bodice(true),skirtPiece],
      memo:"身頃ウエストとスカートウエストを合わせて接ぎ合わせる。衿ぐり・袖ぐりはバイアステープで仕上げる。"};
  }
};

/* ---- かぼちゃパンツ（ブルマ） ---- */
PATTERNS.bloomers={
  mode:"baby",
  name:"かぼちゃパンツ（ブルマ）",
  note:"ウエストと裾の両方にゴムを通したふんわりブルマ。前後同じ型紙で、中心（股ぐり）同士を縫い合わせ、脇を縫います。丈を短く・ゆとりを多くするほどかぼちゃらしい丸みが出ます。ベビー〜キッズ向け。",
  params:[
    {key:"hip",    label:"ヒップ",             unit:"cm",min:40,max:80,step:1,  val:50},
    {key:"rise",   label:"股上（ウエスト〜股）",unit:"cm",min:14,max:30,step:1,  val:18},
    {key:"leglen", label:"裾丈（股〜裾）",      unit:"cm",min:5, max:25,step:1,  val:10},
    {key:"ease",   label:"ゆとり（総量）",      unit:"cm",min:4, max:24,step:1,  val:8},
    {key:"crotchF",label:"股ぐり延長",          unit:"cm",min:1, max:6, step:0.5,val:2.5},
    {key:"casing", label:"ゴム通し折り返し",    unit:"cm",min:2, max:5, step:0.5,val:2.5},
  ],
  presets:[
    {label:"70(6-12M)", vals:{hip:46, rise:16, leglen:8,  ease:6, crotchF:2,   casing:2.5}},
    {label:"80(1-2歳)", vals:{hip:48, rise:17, leglen:9,  ease:8, crotchF:2,   casing:3}},
    {label:"90(2-3歳)", vals:{hip:52, rise:18, leglen:10, ease:8, crotchF:2.5, casing:3}},
    {label:"95(3-4歳)", vals:{hip:54, rise:19, leglen:11, ease:8, crotchF:2.5, casing:3}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.hip)+cm(p.ease))/4;        // 左=脇、右=中心(股ぐり)
    const CR=cm(p.rise), LL=cm(p.leglen), CAS=cm(p.casing), CF=cm(p.crotchF);
    const H=CAS+CR+LL;
    let fin=[{x:0,y:0},{x:HW,y:0},{x:HW,y:CAS}];
    fin=fin.concat(quad({x:HW,y:CAS},{x:HW+CF,y:CAS+CR*0.45},{x:HW+CF,y:CAS+CR},10));
    fin.push({x:HW+CF,y:H},{x:0,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"前/後 ブルマ（共通）", cutInfo:"前後それぞれ2枚（左右）計4枚 ／ 中心(股ぐり)同士を縫い、脇を縫う",
      ...pc, foldX:null,
      grain:{x1:HW/2,y1:CAS+CR/2,x2:HW/2,y2:H-16},
      casingLines:[CAS, H-CAS], casingLabel:"ウエスト/裾ゴム通し",
      notches:[{x:HW+CF,y:CAS+CR}], labelAt:{x:HW/2,y:CAS+(CR+LL)/2}
    }],
    memo:`ウエスト・裾ともゴム通し。ウエストゴム長の目安：${Math.round((cm(p.hip)+cm(p.ease))*0.85/10)}cm／裾ゴムは太もも回り−2cm程度。`};
  }
};

/* ---- キッズワンピース（身頃＋ギャザースカート） ---- */
PATTERNS.kidsdress={
  mode:"kids",
  name:"キッズワンピース",
  note:"ノースリーブ身頃にたっぷりギャザーのスカートを接いだ2段ワンピース。前後身頃＋スカートの3パーツ。衿ぐり・袖ぐりはバイアステープ仕上げ。後ろ開きはボタンやスナップで留めます。",
  params:[
    {key:"bust",    label:"バスト",              unit:"cm",min:48,max:80,step:1,  val:58},
    {key:"shoulder",label:"肩幅",                unit:"cm",min:20,max:36,step:1,  val:26},
    {key:"bodice",  label:"身頃丈（肩〜ウエスト）",unit:"cm",min:18,max:34,step:1,  val:24},
    {key:"skirtlen",label:"スカート丈",          unit:"cm",min:18,max:55,step:1,  val:32},
    {key:"full",    label:"ギャザー倍率",        unit:"倍",min:1.4,max:2.6,step:0.1,val:1.8},
    {key:"neckw",   label:"衿ぐり幅",            unit:"cm",min:9, max:16,step:0.5,val:12},
    {key:"ease",    label:"ゆとり（総量）",      unit:"cm",min:4, max:16,step:1,  val:8},
  ],
  presets:[
    {label:"90cm",  vals:{bust:54,shoulder:23,bodice:21,skirtlen:26,full:1.8,neckw:11,ease:8}},
    {label:"100cm", vals:{bust:58,shoulder:25,bodice:23,skirtlen:30,full:1.8,neckw:12,ease:8}},
    {label:"110cm", vals:{bust:62,shoulder:26,bodice:25,skirtlen:34,full:1.8,neckw:12,ease:8}},
    {label:"120cm", vals:{bust:66,shoulder:28,bodice:27,skirtlen:38,full:1.8,neckw:13,ease:8}},
    {label:"130cm", vals:{bust:70,shoulder:30,bodice:29,skirtlen:42,full:1.8,neckw:14,ease:8}},
  ],
  toggles:[],
  gen(p,sa){
    const BW=cm(p.bust)/4+cm(p.ease)/4;
    const BL=cm(p.bodice);
    const SHx=cm(p.shoulder)/2;
    const NWh=cm(p.neckw)/2;
    const AHy=cm(11); // 子供向け袖ぐり深さ
    const bodice=(isBack)=>{
      const FD=cm(isBack?2:5.5);
      const neckCurve=quad({x:0,y:FD},{x:NWh*0.5,y:FD},{x:NWh,y:0},10);
      const shoulderPt={x:SHx,y:0};
      const underarm={x:BW,y:AHy};
      const armCurve=quad(shoulderPt,{x:SHx+(BW-SHx)*0.45,y:AHy*0.55},underarm,10);
      const waistSide={x:BW*0.92,y:BL};
      let fin=[{x:0,y:FD}];
      fin=fin.concat(neckCurve);
      fin.push(shoulderPt);
      fin=fin.concat(armCurve);
      fin=fin.concat(quad(underarm,{x:BW,y:(AHy+BL)*0.55},waistSide,8));
      fin.push({x:0,y:BL});
      const isFold=(a,b)=>a.x===0&&b.x===0;
      const pc=pieceFrom(fin,isFold,sa);
      return {
        title:isBack?"後身頃":"前身頃",
        cutInfo:"中心を「わ」に置いて1枚（前1枚・後1枚）",
        ...pc,foldX:0,
        grain:{x1:BW*0.4,y1:FD+10,x2:BW*0.4,y2:BL-8},
        notches:[{x:BW,y:AHy}],
        labelAt:{x:BW*0.4,y:(FD+BL)*0.5}
      };
    };
    // スカート：ギャザーを寄せる長方形（左端＝わ）
    const skW=(cm(p.bust)+cm(p.ease))*p.full/2;
    const skH=cm(p.skirtlen);
    const finS=[{x:0,y:0},{x:skW,y:0},{x:skW,y:skH},{x:0,y:skH}];
    const pcS=pieceFrom(finS,(a,b)=>a.x===0&&b.x===0,sa);
    const skirt={
      title:"スカート（前・後共通）",cutInfo:"中心を「わ」に置いて 前1枚・後1枚（計2枚）",
      ...pcS,foldX:0,
      grain:{x1:skW/2,y1:14,x2:skW/2,y2:skH-14},
      notches:[],labelAt:{x:skW/2,y:skH/2}
    };
    return {pieces:[bodice(false),bodice(true),skirt],
      memo:"スカート上端にギャザーを寄せ、身頃ウエストに合わせて接ぐ。衿ぐり・袖ぐりはバイアステープ仕上げ。後ろ中心は開きを作ってボタン/スナップ留めに。"};
  }
};

/* ---- キッズスモック ---- */
PATTERNS.smock={
  mode:"kids",
  name:"キッズスモック",
  note:"保育園・幼稚園の定番かぶりスモック。ゆったりドロップショルダーの前後共通身頃＋筒袖の2型。衿ぐり・袖口はゴムを通してギャザーに。かぶって着る仕様なので衿ぐりは頭が通る寸法を確認してください。",
  params:[
    {key:"bust",  label:"バスト",     unit:"cm",min:52,max:84,step:1,  val:64},
    {key:"len",   label:"着丈",       unit:"cm",min:30,max:55,step:1,  val:40},
    {key:"sleeve",label:"袖丈",       unit:"cm",min:18,max:42,step:1,  val:28},
    {key:"neckw", label:"衿ぐり幅",   unit:"cm",min:14,max:22,step:0.5,val:17},
    {key:"ease",  label:"ゆとり（総量）",unit:"cm",min:10,max:30,step:1,  val:18},
  ],
  presets:[
    {label:"90cm",  vals:{bust:56,len:34,sleeve:22,neckw:16,ease:16}},
    {label:"100cm", vals:{bust:60,len:38,sleeve:25,neckw:16,ease:18}},
    {label:"110cm", vals:{bust:64,len:42,sleeve:28,neckw:17,ease:18}},
    {label:"120cm", vals:{bust:68,len:46,sleeve:31,neckw:18,ease:20}},
    {label:"130cm", vals:{bust:72,len:50,sleeve:34,neckw:18,ease:20}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4;  // 中心わ(左)からの半身幅
    const L=cm(p.len);
    const NWh=cm(p.neckw)/2;
    const ND=cm(2.5);              // 前後共通の浅い衿ぐり（ゴムギャザー前提）
    const drop=cm(3);              // ドロップショルダーの肩下がり
    const AHy=cm(15);              // 袖ぐり位置
    const neckCurve=quad({x:0,y:ND},{x:NWh*0.5,y:ND},{x:NWh,y:0},10);
    const shoulderPt={x:HW*0.78,y:drop};
    const underarm={x:HW,y:AHy};
    let fin=[{x:0,y:ND}];
    fin=fin.concat(neckCurve);
    fin.push(shoulderPt);
    fin=fin.concat(quad(shoulderPt,{x:HW,y:(drop+AHy)*0.5},underarm,8));
    fin.push({x:HW,y:L},{x:0,y:L});
    const isFold=(a,b)=>a.x===0&&b.x===0;
    const pc=pieceFrom(fin,isFold,sa);
    const body={
      title:"前/後身頃（共通）",cutInfo:"中心を「わ」に置いて 前1枚・後1枚（計2枚）",
      ...pc,foldX:0,
      grain:{x1:HW*0.4,y1:AHy,x2:HW*0.4,y2:L-10},
      notches:[{x:HW,y:AHy}],
      labelAt:{x:HW*0.4,y:(AHy+L)*0.5}
    };
    // 袖：袖山を袖ぐりに合わせた筒袖（袖口ゴム）
    const SW=Math.max(cm(p.bust)*0.5, 2*(AHy-drop)*1.1);
    const SL=cm(p.sleeve);
    const slFin=[{x:0,y:0},{x:SW,y:0},{x:SW,y:SL},{x:0,y:SL}];
    const slpc=pieceFrom(slFin,()=>false,sa);
    const sleeve={
      title:"袖",cutInfo:"2枚（左右）／ 袖口をゴム通しにし、袖下を縫って身頃の袖ぐりに付ける",
      ...slpc,foldX:null,
      grain:{x1:SW/2,y1:10,x2:SW/2,y2:SL-10},
      casingLines:[SL-cm(2.5)],casingLabel:"袖口ゴム通し",
      notches:[],labelAt:{x:SW/2,y:SL/2}
    };
    return {pieces:[body,sleeve],
      memo:"衿ぐり・袖口はゴム通し（三つ折り）にしてギャザーを寄せる。袖は袖山にも軽くギャザーを寄せて袖ぐりに付ける。裾は三つ折りでまつる。"};
  }
};

/* ---- ベビー帽子（チューリップハット） ---- */
PATTERNS.babyhat={
  mode:"baby",
  name:"ベビー帽子（チューリップハット）",
  note:"花びら（ゴア）6枚を縫い合わせたクラウンに、下向きのブリムを付けたチューリップハット。花びらは6枚、ブリムは「わ」二重に置いて表・裏各1枚を裁ちます。表布と裏布で作ればリバーシブルにできます。",
  params:[
    {key:"head", label:"頭囲",          unit:"cm",min:38,max:54,step:1,  val:46},
    {key:"crown",label:"クラウン深さ",  unit:"cm",min:8, max:16,step:0.5,val:11},
    {key:"brim", label:"ブリム幅",      unit:"cm",min:4, max:9, step:0.5,val:6},
    {key:"ease", label:"ゆとり",        unit:"cm",min:0, max:4, step:0.5,val:1},
  ],
  presets:[
    {label:"新生児",  vals:{head:42,crown:9, brim:5,  ease:1}},
    {label:"3〜6M",   vals:{head:44,crown:10,brim:5.5,ease:1}},
    {label:"6〜12M",  vals:{head:46,crown:11,brim:6,  ease:1}},
    {label:"1〜2歳",  vals:{head:48,crown:11,brim:6.5,ease:1}},
    {label:"2〜3歳",  vals:{head:50,crown:12,brim:7,  ease:1.5}},
  ],
  toggles:[],
  gen(p,sa){
    const HC=cm(p.head)+cm(p.ease);
    const W=HC/6;            // 花びら1枚の底辺幅
    const H=cm(p.crown);     // クラウン深さ＝花びら丈
    const cx=W/2;
    const Wm=W*0.62;         // 中央のふくらみ（中心からの張り出し）
    // 花びら：底辺(0,H)→(W,H)、左右の曲線が頂点(cx,0)で合わさる
    let petal=[{x:0,y:H}];
    petal=petal.concat(quad({x:0,y:H},{x:cx-Wm,y:H*0.45},{x:cx,y:0},12));
    petal=petal.concat(quad({x:cx,y:0},{x:cx+Wm,y:H*0.45},{x:W,y:H},12));
    const petalpc=pieceFrom(petal,()=>false,sa);
    const petalPiece={
      title:"クラウン（花びら）",cutInfo:"6枚 ／ 曲線の辺同士を順に縫い合わせてドーム状にする",
      ...petalpc,foldX:null,
      grain:{x1:cx,y1:H*0.25,x2:cx,y2:H*0.85},
      notches:[],labelAt:{x:cx,y:H*0.6}
    };
    // ブリム：四半円のドーナツ（内径＝頭囲、外径＝＋ブリム幅）。CF・CBわで全周。
    const ri=HC/(2*Math.PI);
    const ro=ri+cm(p.brim);
    const STEPS=24, inv=1/Math.SQRT2;
    const innerArc=[],outerArc=[];
    for(let i=0;i<=STEPS;i++){const θ=(Math.PI/2)*(1-i/STEPS);innerArc.push({x:ri*Math.cos(θ),y:ri*Math.sin(θ)});}
    for(let i=0;i<=STEPS;i++){const θ=(Math.PI/2)*(i/STEPS);outerArc.push({x:ro*Math.cos(θ),y:ro*Math.sin(θ)});}
    const brimFin=[...innerArc,{x:ro,y:0},...outerArc.slice(1)];
    const EPS=0.5;
    const brimFold=(a,b)=>{
      const left=Math.abs(a.x)<EPS&&Math.abs(b.x)<EPS;
      const top=Math.abs(a.y)<EPS&&Math.abs(b.y)<EPS;
      return left||top;
    };
    const brimpc=pieceFrom(brimFin,brimFold,sa);
    const g1=(ri+cm(p.brim)*0.3)*inv,g2=(ri+cm(p.brim)*0.8)*inv;
    const brimPiece={
      title:"ブリム",cutInfo:"前中心・後中心とも「わ」に置いて1枚裁ち ×2（表・裏）",
      ...brimpc,foldX:0,foldY:0,
      grain:{x1:g1,y1:g1,x2:g2,y2:g2},
      notches:[],labelAt:{x:(ri+ro)*0.5*inv,y:(ri+ro)*0.5*inv}
    };
    return {pieces:[petalPiece,brimPiece],
      memo:`クラウン内周（頭囲）約${(HC/10).toFixed(0)}cm。花びら6枚を縫ってドームにし、ブリム（表・裏を中表で外周縫い→返す）の内周に付ける。`};
  }
};

/* ============================================================
   追加パターン（カテゴリ統一に伴う新規）
   ============================================================ */

/* ---- ベビー：バンダナスタイ ---- */
PATTERNS.bandanastai={
  mode:"baby",
  name:"バンダナスタイ",
  note:"三角の形がかわいいバンダナ風スタイ。表・裏2枚を中表に縫って返し口から返し、首回りの2点（上辺の左右の角）をスナップで留めます。",
  params:[
    {key:"w",  label:"上辺（首回り側）",unit:"cm",min:22,max:36,step:1,val:30},
    {key:"len",label:"たれ丈（深さ）",  unit:"cm",min:12,max:26,step:1,val:18},
  ],
  presets:[
    {label:"新生児",vals:{w:28,len:16}},
    {label:"3〜6M", vals:{w:30,len:18}},
    {label:"6〜12M",vals:{w:32,len:20}},
    {label:"1〜2歳",vals:{w:34,len:22}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w),L=cm(p.len);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W/2,y:L}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{title:"バンダナスタイ",cutInfo:"2枚（表・裏）を中表に縫い、返し口から返す",
      ...pc,foldX:null,grain:{x1:W/2,y1:8,x2:W/2,y2:L-8},notches:[],labelAt:{x:W/2,y:L*0.42}}],
      memo:"上辺の左右の角にスナップを付ける。首回りに合わせて上辺幅を調整。"};
  }
};

/* ---- ベビー：レッグウォーマー ---- */
PATTERNS.legwarmer={
  mode:"small",
  name:"レッグウォーマー",
  note:"筒状に縫うだけのレッグウォーマー。長辺を中表に縫って筒にし、上下を折り返してヘムします。ニット地なら締め付けず快適。左右2本分を裁ちます。赤ちゃんから大人まで、足回りと丈を変えれば同じ作り方で作れます。",
  params:[
    {key:"circ",label:"足回り（ふくらはぎ）",unit:"cm",min:12,max:46,step:1,val:34},
    {key:"len", label:"丈",unit:"cm",min:12,max:60,step:1,val:35},
    {key:"hem", label:"折り返し",unit:"cm",min:1.5,max:6,step:0.5,val:3},
  ],
  presets:[
    {label:"大人（ロング）",vals:{circ:36,len:45,hem:3}},
    {label:"大人（ショート）",vals:{circ:34,len:28,hem:3}},
    {label:"子供",vals:{circ:24,len:28,hem:3}},
    {label:"ベビー（0〜1歳）",vals:{circ:14,len:16,hem:2.5}},
    {label:"ベビー（1〜2歳）",vals:{circ:16,len:20,hem:2.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.circ),H=cm(p.len)+2*cm(p.hem);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{title:"レッグウォーマー",cutInfo:"2枚（左右）／ 長辺を縫って筒にし上下をヘム",
      ...pc,foldX:null,grain:{x1:W/2,y1:10,x2:W/2,y2:H-10},
      casingLines:[cm(p.hem),H-cm(p.hem)],casingLabel:"折り返しヘム",
      notches:[],labelAt:{x:W/2,y:H/2}}],
      memo:"ニット地推奨。筒径は足回りと同寸（ニットの伸びでフィット）。"};
  }
};

/* ---- ベビー：おくるみ（フード付き） ---- */
PATTERNS.swaddle={
  mode:"baby",
  name:"おくるみ（フード付き）",
  note:"正方形の本体に、角へ三角のフードを付けたおくるみ。表布と裏布を中表に合わせて周囲を縫い、返し口から返します。フードは本体の一角に挟みます。",
  params:[
    {key:"size",label:"本体一辺",unit:"cm",min:60,max:90,step:1,val:75},
    {key:"hood",label:"フードの辺",unit:"cm",min:20,max:32,step:1,val:26},
  ],
  presets:[
    {label:"標準",  vals:{size:75,hood:26}},
    {label:"大きめ",vals:{size:85,hood:28}},
  ],
  toggles:[],
  gen(p,sa){
    const S=cm(p.size),Hd=cm(p.hood);
    const sq=[{x:0,y:0},{x:S,y:0},{x:S,y:S},{x:0,y:S}];
    const sqpc=pieceFrom(sq,()=>false,sa);
    const square={title:"本体",cutInfo:"表布・裏布 各1枚（計2枚）",
      ...sqpc,foldX:null,grain:{x1:S/2,y1:14,x2:S/2,y2:S-14},notches:[],labelAt:{x:S/2,y:S/2}};
    const tri=[{x:0,y:0},{x:Hd,y:0},{x:0,y:Hd}];
    const tripc=pieceFrom(tri,()=>false,sa);
    const hood={title:"フード（角）",cutInfo:"表布・裏布 各1枚（計2枚）／ 本体の角に重ねて挟む",
      ...tripc,foldX:null,grain:{x1:Hd*0.3,y1:Hd*0.28,x2:Hd*0.14,y2:Hd*0.6},notches:[],labelAt:{x:Hd*0.26,y:Hd*0.26}};
    return {pieces:[square,hood],memo:"フードは本体の一角に、斜辺を内向きにして挟んで縫う。"};
  }
};

/* ---- 子供服：キッズハーフパンツ（キッズパンツ流用） ---- */
PATTERNS.kidshalf={
  ...PATTERNS.pants,
  mode:"kids",
  name:"キッズハーフパンツ",
  note:"キッズパンツの股下を短くしたハーフパンツ。前後同じ型紙で中心（股ぐり）同士を縫い、脇を縫い、ウエストを折り返してゴムを通します。裾は折り返してヘム。",
  params:[
    {key:"hip",    label:"ヒップ",unit:"cm",min:50,max:90,step:1,val:60},
    {key:"rise",   label:"股上",unit:"cm",min:16,max:30,step:1,val:21},
    {key:"inseam", label:"股下",unit:"cm",min:6,max:30,step:1,val:14},
    {key:"ease",   label:"ゆとり（総量）",unit:"cm",min:4,max:24,step:1,val:10},
    {key:"crotchF",label:"股ぐり延長",unit:"cm",min:1,max:6,step:0.5,val:2.5},
    {key:"casing", label:"ウエスト折り返し",unit:"cm",min:2,max:6,step:0.5,val:3},
  ],
  presets:[
    {label:"90cm", vals:{hip:52,rise:18,inseam:10,ease:8,crotchF:2,  casing:3}},
    {label:"100cm",vals:{hip:56,rise:20,inseam:12,ease:8,crotchF:2.5,casing:3}},
    {label:"110cm",vals:{hip:60,rise:21,inseam:14,ease:8,crotchF:2.5,casing:3}},
    {label:"120cm",vals:{hip:64,rise:23,inseam:16,ease:8,crotchF:3,  casing:3}},
    {label:"130cm",vals:{hip:68,rise:24,inseam:18,ease:8,crotchF:3,  casing:3}},
  ],
};

/* ---- 子供服：キッズベスト ---- */
PATTERNS.kidsvest={
  mode:"kids",
  name:"キッズベスト",
  note:"前開きのシンプルなベスト。後ろ身頃（わ）1枚と前身頃2枚の構成。衿ぐり・前端・袖ぐり・裾はバイアステープまたは見返しで始末します。前はボタンやスナップで留めます。",
  params:[
    {key:"bust",label:"バスト",unit:"cm",min:50,max:84,step:1,val:62},
    {key:"len",label:"着丈",unit:"cm",min:24,max:46,step:1,val:34},
    {key:"shoulder",label:"肩幅",unit:"cm",min:20,max:36,step:1,val:26},
    {key:"neckw",label:"衿ぐり幅",unit:"cm",min:9,max:16,step:0.5,val:12},
    {key:"ease",label:"ゆとり（総量）",unit:"cm",min:4,max:18,step:1,val:10},
  ],
  presets:[
    {label:"90cm", vals:{bust:54,len:28,shoulder:23,neckw:11,ease:8}},
    {label:"100cm",vals:{bust:58,len:31,shoulder:25,neckw:12,ease:10}},
    {label:"110cm",vals:{bust:62,len:34,shoulder:26,neckw:12,ease:10}},
    {label:"120cm",vals:{bust:66,len:37,shoulder:28,neckw:13,ease:10}},
    {label:"130cm",vals:{bust:70,len:40,shoulder:30,neckw:14,ease:12}},
  ],
  toggles:[],
  gen(p,sa){
    const BW=cm(p.bust)/4+cm(p.ease)/4;
    const L=cm(p.len);
    const SHx=cm(p.shoulder)/2;
    const NWh=cm(p.neckw)/2;
    const AHy=cm(12);
    const mk=(isBack)=>{
      const FD=cm(isBack?2:6.5);
      const neck=quad({x:0,y:FD},{x:NWh*0.5,y:FD},{x:NWh,y:0},10);
      const arm=quad({x:SHx,y:0},{x:SHx+(BW-SHx)*0.45,y:AHy*0.55},{x:BW,y:AHy},10);
      let fin=[{x:0,y:FD}];
      fin=fin.concat(neck);
      fin.push({x:SHx,y:0});
      fin=fin.concat(arm);
      fin.push({x:BW,y:L},{x:0,y:L});
      const isFold=isBack?((a,b)=>a.x===0&&b.x===0):(()=>false);
      const pc=pieceFrom(fin,isFold,sa);
      return {title:isBack?"後ろ身頃":"前身頃",
        cutInfo:isBack?"後ろ中心を「わ」に置いて1枚":"2枚（左右）",
        ...pc,foldX:isBack?0:null,
        grain:{x1:BW*0.45,y1:FD+10,x2:BW*0.45,y2:L-8},
        notches:[{x:BW,y:AHy}],labelAt:{x:BW*0.45,y:(FD+L)*0.5}};
    };
    return {pieces:[mk(true),mk(false)],
      memo:"肩と脇を縫い、衿ぐり・前端・袖ぐり・裾をバイアスまたは見返しで始末。前はボタン留め。"};
  }
};

/* ---- 小物：体操着袋（巾着リュック） ---- */
PATTERNS.gymbag={
  mode:"small",
  name:"体操着袋（巾着リュック）",
  note:"上をひもで絞る巾着型。底を「わ」に置いて1枚で裁ち、両脇を縫います。底の両角にひもを通すループを付ければリュックのように背負えます。",
  params:[
    {key:"w",label:"仕上がり幅",unit:"cm",min:24,max:40,step:1,val:32},
    {key:"h",label:"仕上がり高さ",unit:"cm",min:28,max:46,step:1,val:36},
    {key:"casing",label:"ひも通し下がり",unit:"cm",min:3,max:8,step:0.5,val:5},
  ],
  presets:[
    {label:"標準",  vals:{w:32,h:36,casing:5}},
    {label:"大きめ",vals:{w:36,h:42,casing:5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w),TH=2*cm(p.h),cas=cm(p.casing);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:TH},{x:0,y:TH}];
    const isFold=(a,b)=>a.y===TH&&b.y===TH;
    const pc=pieceFrom(fin,isFold,sa);
    return {pieces:[{title:"袋本体",cutInfo:"底（下端）を「わ」に置いて1枚／脇を縫う",
      ...pc,foldX:null,foldY:TH,grain:{x1:W/2,y1:cas+18,x2:W/2,y2:TH-18},
      casingLines:[cas,TH-cas],casingLabel:"ひも通し口",
      notches:[{x:0,y:TH},{x:W,y:TH}],labelAt:{x:W/2,y:TH/2}}],
      memo:"底の両角（合印）にひもループを挟むとリュックになる。ひも長さの目安：（縦＋横＋40cm）×2本。"};
  }
};

/* ---- 小物：上履き入れ ---- */
PATTERNS.shoesbag={
  mode:"small",
  name:"上履き入れ",
  note:"Dカン付きの持ち手で吊るせる上履き入れ。本体は底を「わ」に置いて1枚、持ち手とDカンタブを各1本。本体の口を折り、持ち手とタブを挟んで脇を縫います。",
  params:[
    {key:"w",label:"仕上がり幅",unit:"cm",min:18,max:30,step:1,val:23},
    {key:"h",label:"仕上がり高さ",unit:"cm",min:24,max:38,step:1,val:29},
    {key:"handle",label:"持ち手の長さ",unit:"cm",min:18,max:36,step:1,val:26},
  ],
  presets:[
    {label:"標準",  vals:{w:23,h:29,handle:26}},
    {label:"大きめ",vals:{w:26,h:32,handle:28}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w),TH=2*cm(p.h);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:TH},{x:0,y:TH}];
    const isFold=(a,b)=>a.y===TH&&b.y===TH;
    const pc=pieceFrom(fin,isFold,sa);
    const body={title:"本体",cutInfo:"底（下端）を「わ」に置いて1枚／脇を縫う",
      ...pc,foldX:null,foldY:TH,grain:{x1:W/2,y1:18,x2:W/2,y2:TH-18},notches:[],labelAt:{x:W/2,y:TH/2}};
    const HW=cm(3.5),HL=cm(p.handle);
    const hFin=[{x:0,y:0},{x:HW,y:0},{x:HW,y:HL},{x:0,y:HL}];
    const hpc=pieceFrom(hFin,()=>false,sa);
    const handle={title:"持ち手",cutInfo:"1本（4つ折りにして縫う）",...hpc,foldX:null,
      grain:{x1:HW/2,y1:8,x2:HW/2,y2:HL-8},notches:[],labelAt:{x:HW/2,y:HL/2}};
    const TW=cm(3.5),TL=cm(7);
    const tFin=[{x:0,y:0},{x:TW,y:0},{x:TW,y:TL},{x:0,y:TL}];
    const tpc=pieceFrom(tFin,()=>false,sa);
    const tab={title:"Dカンタブ",cutInfo:"1本（4つ折り→Dカンに通して二つ折り）",...tpc,foldX:null,
      grain:{x1:TW/2,y1:6,x2:TW/2,y2:TL-6},notches:[],labelAt:{x:TW/2,y:TL/2}};
    return {pieces:[body,handle,tab],memo:"口を三つ折りし、持ち手とDカンタブを挟んでから両脇を縫う。"};
  }
};

/* ---- 小物：プリーツマスク ---- */
PATTERNS.mask={
  mode:"small",
  name:"プリーツマスク",
  note:"中央に3本のプリーツをとった平面マスク。表・裏2枚を中表に縫い、左右を折ってゴム通しにします。破線はプリーツの折り山の目安です。",
  params:[
    {key:"w",label:"幅（広げた状態）",unit:"cm",min:14,max:20,step:0.5,val:17},
    {key:"h",label:"高さ（プリーツ前）",unit:"cm",min:12,max:18,step:0.5,val:15},
  ],
  presets:[
    {label:"子供",      vals:{w:15,h:13}},
    {label:"大人小さめ",vals:{w:16,h:14}},
    {label:"大人",      vals:{w:17,h:15}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w),H=cm(p.h);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{title:"マスク本体",cutInfo:"表・裏 各1枚（計2枚）",
      ...pc,foldX:null,grain:{x1:W/2,y1:8,x2:W/2,y2:H-8},
      casingLines:[H*0.32,H*0.5,H*0.68],casingLabel:"プリーツ折り山の目安",
      notches:[],labelAt:{x:W/2,y:H*0.15}}],
      memo:"プリーツは3本とも下向きに折る。左右を三つ折りしてゴムを通す。"};
  }
};

/* ---- 小物：三角巾 ---- */
PATTERNS.bandana={
  mode:"small",
  name:"三角巾",
  note:"頭にかぶる三角巾。長辺を額に当て、後ろで結びます。三辺を三つ折りでヘムするだけ。底辺にゴムを通せばかぶるだけにもできます。",
  params:[
    {key:"w",label:"底辺（額まわり側）",unit:"cm",min:40,max:60,step:1,val:50},
    {key:"len",label:"高さ（深さ）",unit:"cm",min:22,max:36,step:1,val:28},
  ],
  presets:[
    {label:"幼児",  vals:{w:44,len:24}},
    {label:"小学生",vals:{w:50,len:28}},
    {label:"大人",  vals:{w:56,len:32}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w),L=cm(p.len);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W/2,y:L}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{title:"三角巾",cutInfo:"1枚／三辺を三つ折りでヘム",
      ...pc,foldX:null,grain:{x1:W/2,y1:8,x2:W/2,y2:L-8},notches:[],labelAt:{x:W/2,y:L*0.4}}],
      memo:"底辺の左右に結びひもを足すか、底辺にゴムを通すとかぶるだけで使える。"};
  }
};

/* ---- バッグ：あずま袋 ---- */
PATTERNS.azuma={
  mode:"bag",
  name:"あずま袋",
  note:"1枚の長方形（1：3）を三つに折って縫うだけのあずま袋。風呂敷のように包め、お弁当やマイバッグに。破線が折り位置です。",
  params:[
    {key:"unit",label:"基準の正方形（一辺）",unit:"cm",min:20,max:40,step:1,val:30},
  ],
  presets:[
    {label:"お弁当",vals:{unit:24}},
    {label:"標準",  vals:{unit:30}},
    {label:"大きめ",vals:{unit:36}},
  ],
  toggles:[],
  gen(p,sa){
    const u=cm(p.unit),W=3*u,H=u;
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{title:"本体",cutInfo:"1枚（長辺＝基準正方形×3）",
      ...pc,foldX:null,grain:{x1:W/2,y1:10,x2:W/2,y2:H-10},
      vFoldLines:[u,2*u],labelAt:{x:W/2,y:H/2}}],
      memo:"左1/3を中央に折って右辺を縫い、右1/3を中央に折って左辺を縫う。上辺が持ち手の口になる。"};
  }
};

/* ---- ペット：ペットバンダナ ---- */
PATTERNS.petbandana={
  mode:"pet",
  name:"ペットバンダナ",
  note:"首輪に通して使う三角バンダナ。上辺を筒状に折って首輪を通すタイプ。1枚を三つ折りでヘムするか、表・裏2枚で作ります。",
  params:[
    {key:"w",label:"上辺（首側）",unit:"cm",min:16,max:40,step:1,val:26},
    {key:"len",label:"たれ丈",unit:"cm",min:12,max:30,step:1,val:20},
    {key:"casing",label:"首輪通し折り返し",unit:"cm",min:2.5,max:6,step:0.5,val:4},
  ],
  presets:[
    {label:"小型犬",vals:{w:20,len:15,casing:3.5}},
    {label:"中型犬",vals:{w:28,len:21,casing:4}},
    {label:"大型犬",vals:{w:36,len:27,casing:5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w),L=cm(p.len),cas=cm(p.casing);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W/2,y:L}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{title:"バンダナ",cutInfo:"1枚（上辺を折り返して首輪通しにする）／または表・裏2枚",
      ...pc,foldX:null,grain:{x1:W/2,y1:cas+6,x2:W/2,y2:L-8},
      casingLines:[cas],casingLabel:"首輪通し折り返し",
      notches:[],labelAt:{x:W/2,y:L*0.45}}],
      memo:"上辺を首輪通し分だけ折り返して縫い、首輪を通す。"};
  }
};

/* ---- ペット：ペットスヌード ---- */
PATTERNS.petsnood={
  mode:"pet",
  name:"ペットスヌード",
  note:"耳の長い犬の食事時の汚れ防止や防寒に。筒状に縫うネックウォーマー。両端を折り返すか、片側にゴムを通して顔・首にフィットさせます。",
  params:[
    {key:"neck",label:"首回り",unit:"cm",min:16,max:50,step:1,val:30},
    {key:"len",label:"丈",unit:"cm",min:10,max:30,step:1,val:18},
    {key:"ease",label:"ゆとり",unit:"cm",min:0,max:10,step:1,val:4},
  ],
  presets:[
    {label:"小型犬",vals:{neck:22,len:14,ease:3}},
    {label:"中型犬",vals:{neck:30,len:18,ease:4}},
    {label:"大型犬",vals:{neck:42,len:24,ease:6}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.neck)+cm(p.ease),H=cm(p.len);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{title:"スヌード本体",cutInfo:"1枚／長辺を縫って筒にし、上下をヘムまたはゴム通し",
      ...pc,foldX:null,grain:{x1:W/2,y1:10,x2:W/2,y2:H-10},
      casingLines:[cm(2.5),H-cm(2.5)],casingLabel:"折り返し／ゴム通し",
      notches:[],labelAt:{x:W/2,y:H/2}}],
      memo:"筒径＝首回り＋ゆとり。片側にゴムを通すと顔側がしぼれる。"};
  }
};

/* ---- 大人服：ワイドパンツ（キッズパンツ流用） ---- */
PATTERNS.widepants={
  ...PATTERNS.pants,
  mode:"human",
  name:"ワイドパンツ（ゴムウエスト）",
  note:"ゆったりストレートのキッズパンツ。前後同じ型紙で中心（股ぐり）同士を縫い、脇を縫い、ウエストを折り返してゴムを通します。股ぐりは仮縫いで確認を。",
  params:[
    {key:"hip",    label:"ヒップ",unit:"cm",min:80,max:130,step:1,val:96},
    {key:"rise",   label:"股上",unit:"cm",min:24,max:40,step:1,val:30},
    {key:"inseam", label:"股下",unit:"cm",min:50,max:80,step:1,val:66},
    {key:"ease",   label:"ゆとり（総量）",unit:"cm",min:8,max:36,step:1,val:20},
    {key:"crotchF",label:"股ぐり延長",unit:"cm",min:2,max:7,step:0.5,val:4},
    {key:"casing", label:"ウエスト折り返し",unit:"cm",min:3,max:7,step:0.5,val:4},
  ],
  presets:[
    {label:"S", vals:{hip:88, rise:28,inseam:62,ease:18,crotchF:3.5,casing:4}},
    {label:"M", vals:{hip:96, rise:30,inseam:66,ease:20,crotchF:4,  casing:4}},
    {label:"L", vals:{hip:104,rise:32,inseam:68,ease:22,crotchF:4.5,casing:4}},
    {label:"LL",vals:{hip:112,rise:33,inseam:70,ease:24,crotchF:5,  casing:4}},
  ],
};

/* ---- 大人服：ギャザースカート（ギャザースカート流用） ---- */
PATTERNS.adultgather={
  ...PATTERNS.gather,
  mode:"human",
  name:"ギャザースカート",
  note:"長方形を上端で折り返してゴムを通す、いちばん簡単なギャザースカート（大人サイズ）。前後2枚を脇で縫います。左端は「わ」（中心）。ギャザー倍率で布幅＝ふんわり具合が決まります。",
  params:[
    {key:"hip",label:"ヒップ（目安）",unit:"cm",min:80,max:130,step:1,val:94},
    {key:"len",label:"スカート丈",unit:"cm",min:40,max:95,step:1,val:62},
    {key:"full",label:"ギャザー倍率",unit:"倍",min:1.3,max:3,step:0.1,val:1.8},
    {key:"casing",label:"ウエスト折り返し",unit:"cm",min:2,max:8,step:0.5,val:4},
  ],
  presets:[
    {label:"S", vals:{hip:88, len:58,full:1.8,casing:4}},
    {label:"M", vals:{hip:94, len:62,full:1.8,casing:4}},
    {label:"L", vals:{hip:102,len:64,full:1.9,casing:4}},
    {label:"LL",vals:{hip:110,len:66,full:1.9,casing:4}},
  ],
};

/* ---- 大人服：ハーフパンツ ---- */
PATTERNS.halfpants={
  ...PATTERNS.widepants,
  name:"ハーフパンツ",
  note:"大人向けのゆったりゴムウエストショートパンツ。ワイドパンツと同じ型紙で股下だけ短く。ひざ丈・膝上など好みに合わせて股下丈を調整できます。",
  params:[
    {key:"hip",    label:"ヒップ",unit:"cm",min:80,max:130,step:1,val:96},
    {key:"rise",   label:"股上",unit:"cm",min:22,max:40,step:1,val:28},
    {key:"inseam", label:"股下",unit:"cm",min:3,max:45,step:1,val:26},
    {key:"ease",   label:"ゆとり（総量）",unit:"cm",min:8,max:36,step:1,val:18},
    {key:"crotchF",label:"股ぐり延長",unit:"cm",min:2,max:7,step:0.5,val:4},
    {key:"casing", label:"ウエスト折り返し",unit:"cm",min:3,max:7,step:0.5,val:4},
  ],
  presets:[
    {label:"S",  vals:{hip:88, rise:26,inseam:20,ease:16,crotchF:3.5,casing:4}},
    {label:"M",  vals:{hip:96, rise:28,inseam:24,ease:18,crotchF:4,  casing:4}},
    {label:"L",  vals:{hip:104,rise:30,inseam:26,ease:20,crotchF:4.5,casing:4}},
    {label:"LL", vals:{hip:112,rise:31,inseam:28,ease:22,crotchF:5,  casing:4}},
  ],
};

/* ---- 大人服：チュニック ---- */
PATTERNS.tunic={
  ...PATTERNS.tee,
  name:"チュニック",
  note:"ひざ上までカバーするロング丈のゆったりトップス。Tシャツと同じドロップショルダーの型紙で、袖丈を7分〜長袖にアレンジできます。ニット・ダブルガーゼ・リネンなどやわらかい素材に向きます。",
  params:[
    {key:"bust",    label:"バスト",        unit:"cm",min:74,max:130,step:1,  val:100},
    {key:"len",     label:"着丈",          unit:"cm",min:68,max:110,step:1,  val:84},
    {key:"shoulder",label:"肩幅",          unit:"cm",min:34,max:56, step:1,  val:44},
    {key:"sleeve",  label:"袖丈",          unit:"cm",min:8, max:60, step:1,  val:46},
    {key:"cuff",    label:"袖口（裁ち幅）",unit:"cm",min:10,max:32, step:1,  val:18},
    {key:"neckw",   label:"衿ぐり幅",      unit:"cm",min:14,max:24, step:0.5,val:18},
    {key:"ease",    label:"ゆとり（総量）",unit:"cm",min:0, max:30, step:1,  val:14},
  ],
  presets:[
    {label:"S",  vals:{bust:84, len:78, shoulder:38, sleeve:42, cuff:16, neckw:17, ease:12}},
    {label:"M",  vals:{bust:90, len:82, shoulder:40, sleeve:44, cuff:17, neckw:18, ease:14}},
    {label:"L",  vals:{bust:98, len:86, shoulder:42, sleeve:46, cuff:18, neckw:18, ease:16}},
    {label:"LL", vals:{bust:106,len:90, shoulder:44, sleeve:48, cuff:19, neckw:19, ease:18}},
  ],
};

/* ---- 大人服：キャミソール ---- */
PATTERNS.camisole={
  mode:"human",
  name:"キャミソール",
  note:"前後身頃を脇で縫い合わせ肩ひもをつけるだけのシンプルなキャミソール。前後とも中心（わ）裁ち。ニット・サテン・リネンなど様々な素材に対応。肩ひもは着用時に長さを調整してください。",
  params:[
    {key:"bust",   label:"バスト",        unit:"cm",min:72,max:126,step:1,  val:92},
    {key:"len",    label:"着丈（脇丈）",  unit:"cm",min:40,max:80, step:1,  val:60},
    {key:"ease",   label:"ゆとり（総量）",unit:"cm",min:2, max:20, step:1,  val:8},
    {key:"neckw",  label:"衿ぐり幅",      unit:"cm",min:12,max:24, step:0.5,val:18},
    {key:"neckd",  label:"前衿ぐり深さ",  unit:"cm",min:6, max:20, step:0.5,val:12},
    {key:"strapw", label:"肩ひも幅",      unit:"cm",min:1.5,max:5, step:0.5,val:2.5},
    {key:"strapl", label:"肩ひも長さ",    unit:"cm",min:18,max:40, step:1,  val:28},
  ],
  presets:[
    {label:"S",  vals:{bust:82, len:54,ease:6, neckw:17,neckd:10,strapw:2.5,strapl:26}},
    {label:"M",  vals:{bust:88, len:58,ease:8, neckw:18,neckd:12,strapw:2.5,strapl:28}},
    {label:"L",  vals:{bust:96, len:62,ease:8, neckw:19,neckd:14,strapw:3,  strapl:30}},
    {label:"LL", vals:{bust:104,len:66,ease:10,neckw:20,neckd:16,strapw:3,  strapl:32}},
  ],
  toggles:[],
  gen(p,sa){
    const W=(cm(p.bust)+cm(p.ease))/4;
    const H=cm(p.len);
    const NW=cm(p.neckw)/2;
    const ND=cm(p.neckd);
    const AH=H*0.35;
    const SW=cm(p.strapw);
    const SL=cm(p.strapl);
    // 前身頃（半分、わ＝CF x=0）
    let frontFin=[{x:NW+SW,y:0}];
    frontFin.push({x:W,y:AH});
    frontFin.push({x:W,y:H});
    frontFin.push({x:0,y:H});
    frontFin.push({x:0,y:ND});
    frontFin=frontFin.concat(quad({x:0,y:ND},{x:NW*0.25,y:ND*0.1},{x:NW,y:0},8).slice(1));
    const isFoldF=(a,b)=>Math.abs(a.x)<0.5&&Math.abs(b.x)<0.5;
    const fpc=pieceFrom(frontFin,isFoldF,sa);
    const front={
      title:"前身頃",cutInfo:"前中心を「わ」に置いて 1枚",
      ...fpc,foldX:0,
      grain:{x1:W*0.5,y1:AH+10,x2:W*0.5,y2:H-14},
      notches:[{x:W,y:AH}],labelAt:{x:W*0.5,y:(AH+H)/2}
    };
    // 後身頃
    const BND=cm(2.5);
    let backFin=[{x:NW+SW,y:0}];
    backFin.push({x:W,y:AH});
    backFin.push({x:W,y:H});
    backFin.push({x:0,y:H});
    backFin.push({x:0,y:BND});
    backFin=backFin.concat(quad({x:0,y:BND},{x:NW*0.3,y:BND*0.3},{x:NW,y:0},8).slice(1));
    const isFoldB=(a,b)=>Math.abs(a.x)<0.5&&Math.abs(b.x)<0.5;
    const bpc=pieceFrom(backFin,isFoldB,sa);
    const back={
      title:"後身頃",cutInfo:"後中心を「わ」に置いて 1枚",
      ...bpc,foldX:0,
      grain:{x1:W*0.5,y1:AH+10,x2:W*0.5,y2:H-14},
      notches:[{x:W,y:AH}],labelAt:{x:W*0.5,y:(AH+H)/2}
    };
    // 肩ひも
    const stFin=[{x:0,y:0},{x:SW,y:0},{x:SW,y:SL},{x:0,y:SL}];
    const stpc=pieceFrom(stFin,()=>false,sa);
    const strap={
      title:"肩ひも",cutInfo:"4枚（前後左右 各2枚を中表で縫って表に返す）",
      ...stpc,foldX:null,
      grain:{x1:SW/2,y1:8,x2:SW/2,y2:SL-8},
      notches:[],labelAt:{x:SW/2,y:SL/2}
    };
    return {pieces:[front,back,strap],
      memo:`前後の脇を縫い合わせ（脇丈${Math.round(H/10)}cm）、肩ひも（表裏縫って返す）を前後にそれぞれ縫い付ける。丈は仮縫いで確認してから本縫いを。`};
  }
};

/* ---- バッグ：クラッチバッグ ---- */
PATTERNS.clutchbag={
  mode:"bag",
  name:"クラッチバッグ",
  note:"底を「わ」にして2つ折りにする長財布型クラッチ。本体にファスナーを付けるか、フラップをかぶせるタイプにアレンジできます。帆布・合皮・コットンなど表情のある素材がおすすめ。",
  params:[
    {key:"w",   label:"幅",          unit:"cm",min:15,max:35,step:0.5,val:24},
    {key:"h",   label:"高さ（収納）",unit:"cm",min:10,max:25,step:0.5,val:16},
    {key:"flap",label:"フラップ深さ",unit:"cm",min:5, max:16,step:0.5,val:9},
  ],
  presets:[
    {label:"カード入れ",vals:{w:18,h:12,flap:7}},
    {label:"クラッチS", vals:{w:22,h:14,flap:8}},
    {label:"クラッチM", vals:{w:24,h:16,flap:9}},
    {label:"クラッチL", vals:{w:28,h:18,flap:10}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w),H=cm(p.h),F=cm(p.flap);
    const bodyFin=[{x:0,y:0},{x:W,y:0},{x:W,y:2*H},{x:0,y:2*H}];
    const isFoldBody=(a,b)=>a.y===2*H&&b.y===2*H;
    const bpc=pieceFrom(bodyFin,isFoldBody,sa);
    const body={
      title:"本体",cutInfo:"底（下端）を「わ」に置いて 2枚（表・裏）",
      ...bpc,foldX:null,foldY:2*H,
      grain:{x1:W/2,y1:20,x2:W/2,y2:2*H-20},
      notches:[{x:0,y:H},{x:W,y:H}],labelAt:{x:W/2,y:H}
    };
    const rad=Math.min(cm(3),W/4,F/3);
    let flapFin=[{x:0,y:0},{x:W,y:0},{x:W,y:F-rad}];
    flapFin=flapFin.concat(quad({x:W,y:F-rad},{x:W,y:F},{x:W-rad,y:F},6).slice(1));
    flapFin.push({x:rad,y:F});
    flapFin=flapFin.concat(quad({x:rad,y:F},{x:0,y:F},{x:0,y:F-rad},6).slice(1));
    const fpc=pieceFrom(flapFin,()=>false,sa);
    const flap={
      title:"フラップ",cutInfo:"2枚（表・裏）",
      ...fpc,foldX:null,
      grain:{x1:W/2,y1:10,x2:W/2,y2:F-10},
      notches:[],labelAt:{x:W/2,y:F/2}
    };
    return {pieces:[body,flap],
      memo:`本体を底の「わ」で2つ折り→脇縫い→表に返す。フラップは表・裏を縫って返し本体背面の口端に縫い付ける。ファスナー仕様の場合は口にファスナーテープを縫い付ける。`};
  }
};

/* ---- バッグ：ショルダーバッグ（フラップ型） ---- */
PATTERNS.shoulderbag={
  mode:"bag",
  name:"ショルダーバッグ（フラップ型）",
  note:"前後の本体パネルを縫い合わせフラップを被せるスタンダードなショルダーバッグ。ストラップを調節金具付きにすれば長さを自由に変えられます。キャンバス・帆布・デニム地向き。",
  params:[
    {key:"w",     label:"幅",                    unit:"cm",min:18,max:42,step:0.5,val:26},
    {key:"h",     label:"高さ",                  unit:"cm",min:16,max:38,step:0.5,val:22},
    {key:"flap",  label:"フラップ深さ",          unit:"cm",min:6, max:18,step:0.5,val:10},
    {key:"strapl",label:"ストラップ長さ",        unit:"cm",min:60,max:160,step:5, val:120},
    {key:"strapw",label:"ストラップ幅（裁ち幅）",unit:"cm",min:3, max:8,  step:0.5,val:5},
  ],
  presets:[
    {label:"ミニ",         vals:{w:20,h:16,flap:8, strapl:100,strapw:4}},
    {label:"スタンダード", vals:{w:26,h:22,flap:10,strapl:120,strapw:5}},
    {label:"A4対応",       vals:{w:34,h:26,flap:12,strapl:130,strapw:5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w),H=cm(p.h),F=cm(p.flap);
    const SL=cm(p.strapl),SW=cm(p.strapw);
    const bodyFin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const bpc=pieceFrom(bodyFin,()=>false,sa);
    const body={
      title:"本体",cutInfo:"2枚（前・後）",
      ...bpc,foldX:null,
      grain:{x1:W/2,y1:14,x2:W/2,y2:H-14},
      notches:[],labelAt:{x:W/2,y:H/2}
    };
    const rad=Math.min(cm(3),W/4,F/3);
    let flapFin=[{x:0,y:0},{x:W,y:0},{x:W,y:F-rad}];
    flapFin=flapFin.concat(quad({x:W,y:F-rad},{x:W,y:F},{x:W-rad,y:F},6).slice(1));
    flapFin.push({x:rad,y:F});
    flapFin=flapFin.concat(quad({x:rad,y:F},{x:0,y:F},{x:0,y:F-rad},6).slice(1));
    const fpc=pieceFrom(flapFin,()=>false,sa);
    const flap={
      title:"フラップ",cutInfo:"2枚（表・裏）",
      ...fpc,foldX:null,
      grain:{x1:W/2,y1:10,x2:W/2,y2:F-10},
      notches:[],labelAt:{x:W/2,y:F/2}
    };
    const strapFin=[{x:0,y:0},{x:SW,y:0},{x:SW,y:SL},{x:0,y:SL}];
    const spc=pieceFrom(strapFin,()=>false,sa);
    const strap={
      title:"ストラップ",cutInfo:"1枚（長辺を縫って筒にし表返す／Dカン・ナスカン付き）",
      ...spc,foldX:null,
      grain:{x1:SW/2,y1:14,x2:SW/2,y2:SL-14},
      notches:[],labelAt:{x:SW/2,y:SL/2}
    };
    return {pieces:[body,flap,strap],
      memo:`前後本体を中表で3辺縫い→表返す。フラップは表・裏を縫って返し後身頃上端に縫い付ける。ストラップをDカン×2でバッグ両側に取り付ける。`};
  }
};

/* ---- ペット：猫服（タンクトップ） ---- */
PATTERNS.catfuku={
  ...PATTERNS.dog,
  name:"猫服（タンクトップ）",
  note:"犬服と同じ背パネル＋腹パネルの筒型タンクを猫向けに調整。猫は前足を嫌がる個体が多いためまず仮縫いして前足ぐり位置を調整してください。首が細く胴が短い猫の特徴に合わせたプリセット値です。",
  presets:[
    {label:"子猫",     vals:{chest:24,len:16,bellylen:10,neck:18,legpos:5,legw:5,ease:4}},
    {label:"標準（♀）",vals:{chest:32,len:22,bellylen:14,neck:24,legpos:7,legw:6,ease:4}},
    {label:"標準（♂）",vals:{chest:38,len:26,bellylen:16,neck:28,legpos:8,legw:7,ease:5}},
    {label:"大柄",     vals:{chest:44,len:30,bellylen:19,neck:32,legpos:9,legw:8,ease:5}},
  ],
};

/* ---- ペット：ペットベスト ---- */
PATTERNS.petvest={
  ...PATTERNS.dog,
  name:"ペットベスト",
  note:"前足ぐりを広めに開けたベスト型。犬服（タンクトップ）と同じ型紙で前足ぐりを大きめにとり軽快なシルエットに。前後パネルの脇を縫うだけで完成。暑い季節のお散歩や室内着にどうぞ。",
  params:[
    {key:"chest",   label:"胴回り",            unit:"cm",min:22,max:88,step:1,  val:36},
    {key:"len",     label:"背丈（背側）",       unit:"cm",min:12,max:55,step:1,  val:24},
    {key:"bellylen",label:"腹側の丈",           unit:"cm",min:8, max:40,step:1,  val:14},
    {key:"neck",    label:"首回り",             unit:"cm",min:14,max:55,step:1,  val:22},
    {key:"legpos",  label:"前足ぐり位置",       unit:"cm",min:4, max:18,step:0.5,val:8},
    {key:"legw",    label:"前足ぐり（大きさ）", unit:"cm",min:5, max:18,step:0.5,val:10},
    {key:"ease",    label:"ゆとり（総量）",     unit:"cm",min:0, max:16,step:1,  val:5},
  ],
  presets:[
    {label:"猫・豆柴", vals:{chest:28,len:18,bellylen:10,neck:18,legpos:6, legw:8, ease:4}},
    {label:"小型犬",   vals:{chest:36,len:24,bellylen:14,neck:22,legpos:8, legw:10,ease:5}},
    {label:"中型犬",   vals:{chest:54,len:36,bellylen:22,neck:32,legpos:12,legw:13,ease:6}},
    {label:"大型犬",   vals:{chest:72,len:48,bellylen:30,neck:42,legpos:16,legw:16,ease:7}},
  ],
};

/* ---- 小物：立体マスク ---- */
PATTERNS.fittedmask={
  mode:"small",
  name:"立体マスク",
  note:"上下2枚を波形縫い目で接合する立体成型マスク。縫い目の曲線が鼻の立体感を生み出します。各パーツは中心（わ）裁ちで表・裏2枚作り、まず各パーツを縫って表に返してから上下を合わせて接合します。",
  params:[
    {key:"fw",  label:"顔幅",          unit:"cm",min:10,max:18,step:0.5,val:14},
    {key:"nh",  label:"鼻下〜顎丈",    unit:"cm",min:7, max:14,step:0.5,val:10},
    {key:"nose",label:"鼻立体量",      unit:"cm",min:0.5,max:3,step:0.1,val:1.5},
    {key:"ease",label:"ゆとり（総量）",unit:"cm",min:0, max:4, step:0.5,val:2},
  ],
  presets:[
    {label:"子供",vals:{fw:12,nh:8.5, nose:1,  ease:1}},
    {label:"女性",vals:{fw:14,nh:10,  nose:1.5,ease:2}},
    {label:"男性",vals:{fw:16,nh:11.5,nose:1.8,ease:2}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.fw)/2+cm(p.ease)/2;
    const H=cm(p.nh);
    const H1=H*0.4;
    const H2=H*0.6;
    const ND=cm(p.nose);
    // 上パーツ（わ＝左端 x=0）
    let upFin=[{x:0,y:0},{x:W,y:0},{x:W,y:H1}];
    upFin=upFin.concat(quad({x:W,y:H1},{x:W/2,y:H1+ND*1.5},{x:0,y:H1+ND},10));
    const isFoldUp=(a,b)=>Math.abs(a.x)<0.5&&Math.abs(b.x)<0.5;
    const uppc=pieceFrom(upFin,isFoldUp,sa);
    const upper={
      title:"上パーツ（鼻・頰）",
      cutInfo:"中心を「わ」に置いて 2枚（表・裏）。表・裏を中表で波形縫い目を縫い、表に返す。",
      ...uppc,foldX:0,
      grain:{x1:W*0.5,y1:H1*0.25,x2:W*0.5,y2:H1*0.85},
      notches:[{x:W/2,y:H1+ND*0.8}],
      labelAt:{x:W*0.5,y:H1*0.5}
    };
    // 下パーツ（わ＝左端 x=0）
    let lowFin=[{x:0,y:0}];
    lowFin=lowFin.concat(quad({x:0,y:0},{x:W/2,y:ND*1.5},{x:W,y:ND},10));
    lowFin.push({x:W,y:ND+H2});
    lowFin.push({x:0,y:ND+H2});
    const isFoldLow=(a,b)=>Math.abs(a.x)<0.5&&Math.abs(b.x)<0.5;
    const lowpc=pieceFrom(lowFin,isFoldLow,sa);
    const lower={
      title:"下パーツ（口・顎）",
      cutInfo:"中心を「わ」に置いて 2枚（表・裏）。上パーツと同様に表・裏を縫って返す。",
      ...lowpc,foldX:0,
      grain:{x1:W*0.5,y1:ND+H2*0.2,x2:W*0.5,y2:ND+H2*0.8},
      notches:[{x:W/2,y:ND*0.8}],
      labelAt:{x:W*0.5,y:ND+H2*0.5}
    };
    return {pieces:[upper,lower],
      memo:`上下パーツの波形縫い目を合わせてトップステッチで接合。両脇（耳ひも位置）に平ゴム（幅0.5〜0.7cm）を縫い付けてマスク完成。`};
  }
};

/* ---- 大人服：ブラウス（前あきボタンダウン） ---- */
PATTERNS.blouse={
  mode:"human",
  name:"ブラウス",
  note:"前あきボタンダウンブラウス。後身頃はわ裁ち、前身頃は2枚裁断（打ち合わせ幅込み）。袖はセットイン。布帛（シャツ生地・ダブルガーゼ・リネンなど）に向きます。",
  params:[
    {key:"bust",    label:"バスト",          unit:"cm",min:74,max:130,step:1,  val:90},
    {key:"shoulder",label:"肩幅",            unit:"cm",min:34,max:56, step:1,  val:38},
    {key:"bodyLen", label:"着丈",            unit:"cm",min:50,max:90, step:1,  val:62},
    {key:"sleeveL", label:"袖丈",            unit:"cm",min:15,max:62, step:1,  val:54},
    {key:"cuff",    label:"袖口幅",          unit:"cm",min:22,max:34, step:1,  val:26},
    {key:"neckw",   label:"衿ぐり幅",        unit:"cm",min:12,max:22, step:0.5,val:15},
    {key:"ease",    label:"ゆとり（総量）",  unit:"cm",min:6, max:28, step:1,  val:10},
    {key:"overlap", label:"打ち合わせ幅",    unit:"cm",min:1, max:4,  step:0.5,val:2},
  ],
  presets:[
    {label:"S",  vals:{bust:84, shoulder:36,bodyLen:58,sleeveL:52,cuff:24,neckw:14,ease:9, overlap:2}},
    {label:"M",  vals:{bust:90, shoulder:38,bodyLen:62,sleeveL:54,cuff:26,neckw:15,ease:10,overlap:2}},
    {label:"L",  vals:{bust:98, shoulder:40,bodyLen:66,sleeveL:56,cuff:28,neckw:16,ease:12,overlap:2}},
    {label:"LL", vals:{bust:106,shoulder:42,bodyLen:70,sleeveL:58,cuff:30,neckw:17,ease:14,overlap:2}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=cm(p.bust)/4+cm(p.ease)/4;
    const L=cm(p.bodyLen);
    const NWh=cm(p.neckw)/2;
    const SHx=cm(p.shoulder)/2;
    const ADy=cm(22);
    const slope=cm(2);
    const OL=cm(p.overlap);
    const mkArm=(sx,sy,ex,ey)=>quad({x:sx,y:sy},{x:sx+(ex-sx)*0.45,y:sy+(ey-sy)*0.5},{x:ex,y:ey},10);
    // 後身頃（わ at CB x=0）
    const bND=cm(2.5);
    const bNeck=quad({x:0,y:bND},{x:NWh*0.5,y:bND},{x:NWh,y:0},10);
    const bArm=mkArm(SHx,slope,HW,ADy);
    let bFin=[{x:0,y:bND}].concat(bNeck);
    bFin.push({x:SHx,y:slope});
    bFin=bFin.concat(bArm);
    bFin.push({x:HW,y:L},{x:0,y:L});
    const bPC=pieceFrom(bFin,(a,b)=>a.x===0&&b.x===0,sa);
    const backPiece={title:"後身頃",cutInfo:"後中心を「わ」に置いて 1枚",
      ...bPC,foldX:0,
      grain:{x1:HW*0.5,y1:ADy+12,x2:HW*0.5,y2:L-14},
      notches:[{x:HW,y:ADy}],labelAt:{x:HW*0.5,y:L*0.6}};
    // 前身頃（わなし・x=0が打ち合わせ端、x=OLがCF）
    const fND=cm(8);
    const fNeck=quad({x:OL,y:fND},{x:OL+NWh*0.5,y:fND},{x:OL+NWh,y:0},10);
    const fArm=mkArm(OL+SHx,slope,OL+HW,ADy);
    let fFin=[{x:0,y:fND},{x:OL,y:fND}];
    fFin=fFin.concat(fNeck);
    fFin.push({x:OL+SHx,y:slope});
    fFin=fFin.concat(fArm);
    fFin.push({x:OL+HW,y:L},{x:0,y:L});
    const fPC=pieceFrom(fFin,()=>false,sa);
    const frontPiece={title:"前身頃（右）",cutInfo:"2枚（左右対称に裁断）",
      ...fPC,foldX:null,
      grain:{x1:OL+HW*0.5,y1:ADy+12,x2:OL+HW*0.5,y2:L-14},
      notches:[{x:OL,y:fND},{x:OL+HW,y:ADy}],
      labelAt:{x:OL+HW*0.5,y:L*0.6}};
    // 袖
    const armSeam=arcLen({x:SHx,y:slope},bArm)*2; const armCirc=armSeam;
    const SL=cm(p.sleeveL),cuff=cm(p.cuff),capH=cm(3),cx=armCirc/2;
    let sf=[{x:0,y:capH}];
    sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sf=sf.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:armCirc,y:capH},10));
    sf.push({x:(armCirc+cuff)/2,y:SL},{x:(armCirc-cuff)/2,y:SL});
    const sPC=pieceFrom(sf,()=>false,sa);
    const sleeve={title:"袖", seamLen:armSeam,cutInfo:"2枚（左右）",
      ...sPC,foldX:null,
      grain:{x1:cx,y1:capH+8,x2:cx,y2:SL-8},
      notches:[{x:cx,y:0}],labelAt:{x:cx,y:SL*0.55}};
    return {pieces:[backPiece,frontPiece,sleeve],
      memo:`打ち合わせ幅${p.overlap}cmを折り返してボタンホールを設ける。衿ぐりはバイアステープで仕上げる。`};
  }
};

/* ---- 大人服：ワンピース（袖付き） ---- */
PATTERNS.onepiece={
  mode:"human",
  name:"ワンピース（袖付き）",
  note:"ウエスト切り替えの袖ありワンピース。ボディスはフィット、スカートはAライン。布帛（コットン・リネン・ダブルガーゼなど）向き。",
  params:[
    {key:"bust",    label:"バスト",                  unit:"cm",min:74,max:130,step:1,  val:90},
    {key:"waist",   label:"ウエスト",               unit:"cm",min:55,max:110,step:1,  val:70},
    {key:"hip",     label:"ヒップ",                 unit:"cm",min:80,max:135,step:1,  val:94},
    {key:"shoulder",label:"肩幅",                   unit:"cm",min:30,max:50, step:1,  val:38},
    {key:"bodice",  label:"ボディス丈（肩〜ウエスト）",unit:"cm",min:30,max:52,step:1,val:38},
    {key:"skirtlen",label:"スカート丈",             unit:"cm",min:40,max:100,step:1,  val:62},
    {key:"sleeveL", label:"袖丈",                   unit:"cm",min:15,max:62, step:1,  val:54},
    {key:"cuff",    label:"袖口幅",                 unit:"cm",min:22,max:34, step:1,  val:26},
    {key:"ease",    label:"バストゆとり",           unit:"cm",min:4, max:20, step:1,  val:8},
    {key:"flare",   label:"裾フレア（脇に＋）",     unit:"cm",min:0, max:25, step:0.5,val:10},
    {key:"neckw",   label:"衿ぐり幅",               unit:"cm",min:10,max:22, step:0.5,val:15},
  ],
  presets:[
    {label:"S",  vals:{bust:82, waist:62,hip:88, shoulder:35,bodice:36,skirtlen:60,sleeveL:52,cuff:24,ease:8,flare:9, neckw:14}},
    {label:"M",  vals:{bust:90, waist:70,hip:94, shoulder:38,bodice:38,skirtlen:62,sleeveL:54,cuff:26,ease:8,flare:10,neckw:15}},
    {label:"L",  vals:{bust:98, waist:78,hip:102,shoulder:40,bodice:40,skirtlen:64,sleeveL:56,cuff:28,ease:8,flare:11,neckw:16}},
    {label:"LL", vals:{bust:106,waist:86,hip:110,shoulder:42,bodice:42,skirtlen:66,sleeveL:58,cuff:30,ease:8,flare:12,neckw:17}},
  ],
  toggles:[],
  gen(p,sa){
    const BW=cm(p.bust)/4+cm(p.ease)/4;
    const WW=cm(p.waist)/4;
    const BL=cm(p.bodice);
    const SHx=cm(p.shoulder)/2;
    const NWh=cm(p.neckw)/2;
    const AHy=cm(18);
    // ボディス（前後共通ジェネレータ）
    const bodice=(isBack)=>{
      const FD=cm(isBack?2.5:8);
      const neckCurve=quad({x:0,y:FD},{x:NWh*0.5,y:FD},{x:NWh,y:0},10);
      const shoulderPt={x:SHx,y:0};
      const underarm={x:BW,y:AHy};
      const armCurve=quad(shoulderPt,{x:SHx+(BW-SHx)*0.45,y:AHy*0.55},underarm,10);
      const waistSide={x:WW,y:BL};
      let fin=[{x:0,y:FD}];
      fin=fin.concat(neckCurve);
      fin.push(shoulderPt);
      fin=fin.concat(armCurve);
      fin=fin.concat(quad(underarm,{x:(BW+WW)*0.5,y:(AHy+BL)*0.55},waistSide,8));
      fin.push({x:0,y:BL});
      const pc=pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa);
      return {piece:{title:isBack?"後身頃":"前身頃",cutInfo:"中心を「わ」に置いて1枚（前1枚・後1枚）",
        ...pc,foldX:0,
        grain:{x1:BW*0.4,y1:FD+12,x2:BW*0.4,y2:BL-10},
        notches:[{x:BW,y:AHy}],labelAt:{x:BW*0.4,y:(FD+BL)*0.5}},
        armLen:arcLen(shoulderPt,armCurve)};
    };
    const F=bodice(false),B=bodice(true);
    // スカート（Aライン）
    const qW=cm(p.waist)/4,qH=cm(p.hip)/4;
    const L=cm(p.skirtlen),drop=cm(19),fl=cm(p.flare);
    const wTop={x:0,y:0},wSide={x:qW,y:8},hipPt={x:qH,y:drop};
    const hemSide={x:qH+fl,y:L},hemCF={x:0,y:L};
    let finS=[wTop];
    finS=finS.concat(quad(wTop,{x:qW*0.55,y:0},wSide,10));
    finS=finS.concat(quad(wSide,{x:qH*1.02,y:drop*0.62},hipPt,12));
    finS.push(hemSide);
    finS=finS.concat(quad(hemSide,{x:qH*0.5,y:L+Math.min(8,fl*0.4)},hemCF,10));
    const pcS=pieceFrom(finS,(a,b)=>a.x===0&&b.x===0,sa);
    const skirt={title:"スカート（前・後共通）",cutInfo:"中心を「わ」に置いて 前1枚・後1枚（計2枚）",
      ...pcS,foldX:0,
      grain:{x1:qH*0.42,y1:drop*0.5,x2:qH*0.42,y2:L*0.86},
      notches:[{x:qH,y:drop}],labelAt:{x:qH*0.42,y:L*0.5}};
    // 袖
    const armSeam=F.armLen+B.armLen; const armCirc=armSeam;
    const SL=cm(p.sleeveL),cuff=cm(p.cuff),capH=cm(3),cx=armCirc/2;
    let sf=[{x:0,y:capH}];
    sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sf=sf.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:armCirc,y:capH},10));
    sf.push({x:(armCirc+cuff)/2,y:SL},{x:(armCirc-cuff)/2,y:SL});
    const sPC=pieceFrom(sf,()=>false,sa);
    const sleeve={title:"袖", seamLen:armSeam,cutInfo:"2枚（左右）",
      ...sPC,foldX:null,
      grain:{x1:cx,y1:capH+8,x2:cx,y2:SL-8},
      notches:[{x:cx,y:0}],labelAt:{x:cx,y:SL*0.55}};
    return {pieces:[F.piece,B.piece,skirt,sleeve],
      memo:`身頃ウエストとスカートウエストを合わせて接ぎ合わせる。衿ぐり・袖ぐりはバイアステープで仕上げる。`};
  }
};

/* ---- 大人服：コート（spread from blouse） ---- */
PATTERNS.coat={
  ...PATTERNS.blouse,
  name:"コート",
  note:"フロントボタンのAラインコート。後身頃はわ裁ち、前身頃は2枚裁断（打ち合わせ幅込み）。袖はセットイン。ウール・ツイード・キルト生地など厚手素材向き。裏地を付けると仕上がりが美しくなります。",
  params:[
    {key:"bust",    label:"バスト",          unit:"cm",min:74,max:130,step:1,  val:92},
    {key:"shoulder",label:"肩幅",            unit:"cm",min:34,max:56, step:1,  val:40},
    {key:"bodyLen", label:"着丈",            unit:"cm",min:80,max:130,step:1,  val:105},
    {key:"sleeveL", label:"袖丈",            unit:"cm",min:50,max:65, step:1,  val:58},
    {key:"cuff",    label:"袖口幅",          unit:"cm",min:24,max:38, step:1,  val:30},
    {key:"neckw",   label:"衿ぐり幅",        unit:"cm",min:12,max:22, step:0.5,val:16},
    {key:"ease",    label:"ゆとり（総量）",  unit:"cm",min:10,max:35, step:1,  val:18},
    {key:"overlap", label:"打ち合わせ幅",    unit:"cm",min:2, max:6,  step:0.5,val:3},
  ],
  presets:[
    {label:"S",  vals:{bust:84, shoulder:37,bodyLen:100,sleeveL:56,cuff:28,neckw:15,ease:16,overlap:3}},
    {label:"M",  vals:{bust:92, shoulder:40,bodyLen:105,sleeveL:58,cuff:30,neckw:16,ease:18,overlap:3}},
    {label:"L",  vals:{bust:100,shoulder:42,bodyLen:110,sleeveL:60,cuff:32,neckw:17,ease:20,overlap:3}},
    {label:"LL", vals:{bust:108,shoulder:44,bodyLen:115,sleeveL:62,cuff:34,neckw:18,ease:22,overlap:3}},
  ],
};

/* ---- 大人服：ジャケット（spread from blouse） ---- */
PATTERNS.jacket={
  ...PATTERNS.blouse,
  name:"ジャケット",
  note:"フロントボタンのセットインスリーブジャケット。後身頃はわ裁ち、前身頃は2枚裁断（打ち合わせ幅込み）。厚みのある布帛（ウール・コットンツイルなど）向き。",
  params:[
    {key:"bust",    label:"バスト",          unit:"cm",min:74,max:130,step:1,  val:92},
    {key:"shoulder",label:"肩幅",            unit:"cm",min:34,max:56, step:1,  val:40},
    {key:"bodyLen", label:"着丈",            unit:"cm",min:50,max:85, step:1,  val:62},
    {key:"sleeveL", label:"袖丈",            unit:"cm",min:40,max:62, step:1,  val:56},
    {key:"cuff",    label:"袖口幅",          unit:"cm",min:24,max:36, step:1,  val:27},
    {key:"neckw",   label:"衿ぐり幅",        unit:"cm",min:12,max:20, step:0.5,val:15},
    {key:"ease",    label:"ゆとり（総量）",  unit:"cm",min:8, max:28, step:1,  val:14},
    {key:"overlap", label:"打ち合わせ幅",    unit:"cm",min:2, max:5,  step:0.5,val:2.5},
  ],
  presets:[
    {label:"S",  vals:{bust:84, shoulder:37,bodyLen:58,sleeveL:54,cuff:25,neckw:14,ease:12,overlap:2.5}},
    {label:"M",  vals:{bust:92, shoulder:40,bodyLen:62,sleeveL:56,cuff:27,neckw:15,ease:14,overlap:2.5}},
    {label:"L",  vals:{bust:100,shoulder:42,bodyLen:66,sleeveL:58,cuff:29,neckw:16,ease:16,overlap:2.5}},
    {label:"LL", vals:{bust:108,shoulder:44,bodyLen:70,sleeveL:60,cuff:31,neckw:17,ease:18,overlap:2.5}},
  ],
};

/* ---- ホーム：クッションカバー（封筒型） ---- */
PATTERNS.cushioncover={
  mode:"home",
  name:"クッションカバー（封筒型）",
  note:"封筒式の背面で着脱するクッションカバー。ファスナー不要でシンプルに作れます。表布1枚＋裏布2枚の構成。コットン・リネン・帆布など丈夫な素材向き。",
  params:[
    {key:"w",      label:"クッション幅",    unit:"cm",min:20,max:70,step:1,val:45},
    {key:"h",      label:"クッション高さ",  unit:"cm",min:20,max:70,step:1,val:45},
    {key:"overlap",label:"重なり幅（入口）",unit:"cm",min:10,max:25,step:1,val:15},
  ],
  presets:[
    {label:"45角（標準）",   vals:{w:45,h:45,overlap:15}},
    {label:"35角（小型）",   vals:{w:35,h:35,overlap:12}},
    {label:"60×40（長方形）",vals:{w:60,h:40,overlap:15}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w),H=cm(p.h),OV=cm(p.overlap);
    // 表布
    const frontFin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const frontPC=pieceFrom(frontFin,()=>false,sa);
    const front={title:"表布",cutInfo:"1枚",
      ...frontPC,foldX:null,
      grain:{x1:W/2,y1:14,x2:W/2,y2:H-14},
      notches:[],labelAt:{x:W/2,y:H/2}};
    // 裏布（2枚同一型紙）
    const BH=H/2+OV;
    const backFin=[{x:0,y:0},{x:W,y:0},{x:W,y:BH},{x:0,y:BH}];
    const backPC=pieceFrom(backFin,()=>false,sa);
    const back={title:"裏布（2枚）",cutInfo:"同じ型紙を2枚裁断 ／ 内側の端をヘム処理",
      ...backPC,foldX:null,
      grain:{x1:W/2,y1:14,x2:W/2,y2:BH-14},
      notches:[],labelAt:{x:W/2,y:BH/2}};
    return {pieces:[front,back],
      memo:`裏布2枚の内側端を三つ折りでヘム処理→2枚を${p.overlap}cm重ねて表布と中表で縫い合わせる。${p.w}×${p.h}cmクッション用。`};
  }
};

/* ---- ホーム：テーブルクロス ---- */
PATTERNS.tablecloth={
  mode:"home",
  name:"テーブルクロス",
  note:"テーブルサイズと垂れ幅を入力するだけで必要な布のサイズを計算します。四辺を三つ折りでヘム処理するだけのシンプルな作り方。コットン・リネン・ポリエステルなど好みの素材で。",
  params:[
    {key:"tableW",  label:"テーブル幅",  unit:"cm",min:50, max:250,step:5, val:90},
    {key:"tableL",  label:"テーブル長さ",unit:"cm",min:60, max:350,step:5, val:150},
    {key:"overhang",label:"垂れ幅",      unit:"cm",min:10, max:50, step:5, val:20},
  ],
  presets:[
    {label:"2〜4人掛け",    vals:{tableW:80, tableL:120,overhang:20}},
    {label:"4〜6人掛け",    vals:{tableW:90, tableL:150,overhang:25}},
    {label:"6〜8人掛け",    vals:{tableW:100,tableL:200,overhang:30}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.tableW)+2*cm(p.overhang);
    const H=cm(p.tableL)+2*cm(p.overhang);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"テーブルクロス",cutInfo:"1枚 ／ 四辺を三つ折りでヘム処理",
      ...pc,foldX:null,
      grain:{x1:W/2,y1:20,x2:W/2,y2:H-20},
      notches:[],labelAt:{x:W/2,y:H/2}
    }],
    memo:`仕上がり寸法 ${p.tableW+2*p.overhang}×${p.tableL+2*p.overhang}cm（テーブル${p.tableW}×${p.tableL}cm、垂れ幅${p.overhang}cm×各2辺）。`};
  }
};

/* ---- ホーム：枕カバー（封筒型）---- */
PATTERNS.pillowcase={
  ...PATTERNS.cushioncover,
  name:"枕カバー（封筒型）",
  note:"封筒式の枕カバー。ファスナー不要で、入口の重なりで枕を固定します。表布1枚＋裏布2枚の構成。コットン・リネン・ダブルガーゼなど肌に優しい素材向き。",
  params:[
    {key:"w",      label:"枕幅",            unit:"cm",min:35,max:80,step:1,val:63},
    {key:"h",      label:"枕高さ",          unit:"cm",min:25,max:60,step:1,val:43},
    {key:"overlap",label:"重なり幅（入口）",unit:"cm",min:10,max:30,step:1,val:20},
  ],
  presets:[
    {label:"大判（63×43）", vals:{w:63,h:43,overlap:20}},
    {label:"小判（50×35）", vals:{w:50,h:35,overlap:18}},
    {label:"欧米（70×50）", vals:{w:70,h:50,overlap:22}},
  ],
};


/* ============================================================
   追加パターン 2026-07 バッチ（大人服）
   ============================================================ */

/* ---- タイトスカート ---- */
PATTERNS.tightskirt={
  mode:"human",
  name:"タイトスカート",
  note:"ウエストからヒップに沿わせ、裾へわずかに絞る細身のスカート。前後とも中心を「わ」に置いて各1枚。ウエストはゴムまたは脇あきを想定。歩きやすさのため後ろ中心に裾から15〜20cmのスリットを入れてください。",
  params:[
    {key:"waist", label:"ウエスト",       unit:"cm",min:52,max:110,step:1,  val:70},
    {key:"hip",   label:"ヒップ",         unit:"cm",min:74,max:130,step:1,  val:94},
    {key:"len",   label:"スカート丈",     unit:"cm",min:35,max:90, step:1,  val:58},
    {key:"drop",  label:"ヒップ下がり",   unit:"cm",min:14,max:24, step:0.5,val:19},
    {key:"narrow",label:"裾の絞り（片側）",unit:"cm",min:0, max:6,  step:0.5,val:2},
  ],
  presets:[
    {label:"S",  vals:{waist:62, hip:86,  len:56, drop:18, narrow:1.5}},
    {label:"M",  vals:{waist:70, hip:94,  len:58, drop:19, narrow:2}},
    {label:"L",  vals:{waist:78, hip:102, len:60, drop:20, narrow:2}},
    {label:"LL", vals:{waist:86, hip:110, len:62, drop:21, narrow:2.5}},
  ],
  toggles:[],
  gen(p,sa){
    const qW=cm(p.waist)/4, qH=cm(p.hip)/4, L=cm(p.len), drop=cm(p.drop), nr=cm(p.narrow);
    const sideDip=8;
    const hemX=Math.max(qW*0.95, qH-nr);
    let fin=[{x:0,y:0}];
    fin=fin.concat(quad({x:0,y:0},{x:qW*0.55,y:0},{x:qW,y:sideDip},10));
    fin=fin.concat(quad({x:qW,y:sideDip},{x:qH*1.02,y:drop*0.62},{x:qH,y:drop},12));
    fin.push({x:hemX,y:L});
    fin.push({x:0,y:L});
    const isFold=(a,b)=>a.x===0&&b.x===0;
    const pc=pieceFrom(fin,isFold,sa);
    return {pieces:[{
      title:"前/後 スカート", cutInfo:"中心を「わ」に置いて 前1枚・後1枚（計2枚）",
      ...pc, foldX:0,
      grain:{x1:qH*0.45,y1:drop*0.5,x2:qH*0.45,y2:L*0.88},
      notches:[{x:qH,y:drop}],
      labelAt:{x:qH*0.45,y:L*0.55}
    }],
    memo:`裾まわり 約${(hemX*4/10).toFixed(0)}cm ／ スリットは裾から15〜20cmが目安`};
  }
};

/* ---- プリーツスカート ---- */
PATTERNS.pleatskirt={
  mode:"human",
  name:"プリーツスカート",
  note:"布を一定間隔でたたんでひだを作るスカート。長方形を2枚裁ち、脇を縫ってウエストにゴムを通します。ひだの本数とたたむ量を自動計算。ハリのある薄手の生地が向きます。型紙はすべて長方形なので、印刷せずに案内シートの寸法どおり布に直接線を引いて裁つのが手軽です。",
  params:[
    {key:"waist", label:"ウエスト",       unit:"cm",min:50,max:110,step:1,  val:70},
    {key:"len",   label:"スカート丈",     unit:"cm",min:30,max:95, step:1,  val:55},
    {key:"ratio", label:"ひだ倍率",       unit:"倍",min:2, max:3.5,step:0.1,val:3},
    {key:"pleat", label:"ひだの見え幅",   unit:"cm",min:1.5,max:6, step:0.5,val:3},
    {key:"casing",label:"ウエスト折り返し",unit:"cm",min:2, max:6,  step:0.5,val:3.5},
    {key:"hem",   label:"裾の折り返し",   unit:"cm",min:1, max:5,  step:0.5,val:3},
  ],
  presets:[
    {label:"S",  vals:{waist:62, len:52, ratio:3, pleat:3, casing:3.5, hem:3}},
    {label:"M",  vals:{waist:70, len:55, ratio:3, pleat:3, casing:3.5, hem:3}},
    {label:"L",  vals:{waist:78, len:58, ratio:3, pleat:3, casing:3.5, hem:3}},
    {label:"子供",vals:{waist:56, len:38, ratio:2.5,pleat:2.5,casing:3, hem:2}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.waist)*p.ratio/2, H=cm(p.len)+cm(p.casing)+cm(p.hem), CAS=cm(p.casing);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    const n=Math.max(1,Math.round(cm(p.waist)/cm(p.pleat)));
    return {pieces:[{
      title:"スカート（前・後共通）", cutInfo:"2枚（前・後）／両脇を縫って輪にする",
      ...pc, foldX:null,
      grain:{x1:W*0.5,y1:CAS+20,x2:W*0.5,y2:H-20},
      casingLines:[CAS], casingLabel:"ウエスト折り返し",
      notches:[], labelAt:{x:W*0.5,y:H*0.55}
    }],
    memo:`ひだ 約${n}本（見え幅${p.pleat}cm）／ 1ひだのたたみ量 約${(p.pleat*(p.ratio-1)).toFixed(1)}cm`};
  }
};

/* ---- ラップスカート ---- */
PATTERNS.wrapskirt={
  mode:"human",
  name:"ラップスカート",
  note:"腰に巻いてひもで留める巻きスカート。本体1枚＋ひも2本。前で重なるので着脱がらくで、サイズの融通もききます。重なり幅を多めにとると歩いてもはだけません。",
  params:[
    {key:"waist",  label:"ウエスト",         unit:"cm",min:52,max:110,step:1,  val:70},
    {key:"len",    label:"スカート丈",       unit:"cm",min:30,max:95, step:1,  val:60},
    {key:"overlap",label:"重なり幅",         unit:"cm",min:10,max:40, step:1,  val:22},
    {key:"flare",  label:"裾フレア（片側に＋）",unit:"cm",min:0,max:20,step:0.5,val:6},
    {key:"tie",    label:"ひも長さ（片側）", unit:"cm",min:50,max:120,step:5,  val:80},
    {key:"tiew",   label:"ひも裁ち幅",       unit:"cm",min:4, max:10, step:0.5,val:6},
  ],
  presets:[
    {label:"S",  vals:{waist:62, len:56, overlap:20, flare:5, tie:75, tiew:6}},
    {label:"M",  vals:{waist:70, len:60, overlap:22, flare:6, tie:80, tiew:6}},
    {label:"L",  vals:{waist:78, len:64, overlap:24, flare:7, tie:85, tiew:6}},
    {label:"大判",vals:{waist:86, len:70, overlap:28, flare:9, tie:95, tiew:7}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.waist)+cm(p.overlap))/2, L=cm(p.len), fl=cm(p.flare);
    const sideDip=6;
    let fin=[{x:0,y:0}];
    fin=fin.concat(quad({x:0,y:0},{x:HW*0.6,y:0},{x:HW,y:sideDip},10));
    fin.push({x:HW+fl,y:L});
    fin=fin.concat(quad({x:HW+fl,y:L},{x:HW*0.5,y:L+Math.min(6,fl*0.3)},{x:0,y:L},10));
    const isFold=(a,b)=>a.x===0&&b.x===0;
    const pc=pieceFrom(fin,isFold,sa);
    const TW=cm(p.tiew), TL=cm(p.tie);
    const tf=[{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}];
    const tpc=pieceFrom(tf,()=>false,sa);
    return {pieces:[
      {title:"スカート本体", cutInfo:"後ろ中心を「わ」に置いて 1枚",
       ...pc, foldX:0,
       grain:{x1:HW*0.5,y1:sideDip+16,x2:HW*0.5,y2:L*0.88},
       notches:[{x:HW,y:sideDip}], labelAt:{x:HW*0.5,y:L*0.55}},
      {title:"腰ひも", cutInfo:"2本（4つ折りにして縫う）",
       ...tpc, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`ウエスト実寸 約${((cm(p.waist)+cm(p.overlap))/10).toFixed(0)}cm（重なり${p.overlap}cm込み）`};
  }
};

/* ---- ティアードスカート ---- */
PATTERNS.tieredskirt={
  mode:"human",
  name:"ティアードスカート",
  note:"段ごとに布を足してギャザーを寄せる、たっぷりしたスカート。3段構成で下の段ほど幅が広がります。各段は長方形なので直線縫いだけで作れます。型紙はすべて長方形なので、印刷せずに案内シートの寸法どおり布に直接線を引いて裁つのが手軽です。",
  params:[
    {key:"waist", label:"ウエスト",       unit:"cm",min:50,max:110,step:1,  val:70},
    {key:"t1",    label:"1段目の丈",      unit:"cm",min:8, max:35, step:1,  val:18},
    {key:"t2",    label:"2段目の丈",      unit:"cm",min:8, max:35, step:1,  val:20},
    {key:"t3",    label:"3段目の丈",      unit:"cm",min:8, max:40, step:1,  val:24},
    {key:"ratio", label:"ギャザー倍率",   unit:"倍",min:1.2,max:2, step:0.1,val:1.5},
    {key:"casing",label:"ウエスト折り返し",unit:"cm",min:2, max:6,  step:0.5,val:3.5},
  ],
  presets:[
    {label:"S",  vals:{waist:62, t1:16, t2:18, t3:22, ratio:1.5, casing:3.5}},
    {label:"M",  vals:{waist:70, t1:18, t2:20, t3:24, ratio:1.5, casing:3.5}},
    {label:"L",  vals:{waist:78, t1:20, t2:22, t3:26, ratio:1.5, casing:3.5}},
    {label:"子供",vals:{waist:56, t1:12, t2:14, t3:16, ratio:1.5, casing:3}},
  ],
  toggles:[],
  gen(p,sa){
    const CAS=cm(p.casing), r=p.ratio;
    const w1=cm(p.waist)*r, w2=w1*r, w3=w2*r;
    const mk=(w,h,title,info,casing)=>{
      const W=w/2, H=h;
      const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
      const pc=pieceFrom(fin,()=>false,sa);
      return {title, cutInfo:info, ...pc, foldX:null,
        grain:{x1:W*0.5,y1:12,x2:W*0.5,y2:H-12},
        casingLines:casing?[CAS]:null, casingLabel:"ウエスト折り返し",
        notches:[], labelAt:{x:W*0.5,y:H*0.55}};
    };
    return {pieces:[
      mk(w1, cm(p.t1)+CAS, "1段目（ウエスト）","2枚／脇を縫って輪にする", true),
      mk(w2, cm(p.t2),     "2段目（中段）",    "2枚／ギャザーを寄せて1段目に付ける", false),
      mk(w3, cm(p.t3)+cm(2),"3段目（裾）",     "2枚／ギャザーを寄せて2段目に付ける（裾折り返し2cm込み）", false),
    ],
    memo:`裾まわり 約${(w3/10).toFixed(0)}cm ／ 総丈 約${(p.t1+p.t2+p.t3)}cm`};
  }
};

/* ---- ベスト ---- */
PATTERNS.adultvest={
  mode:"human",
  name:"ベスト",
  note:"袖のない前開きベスト。前身頃2枚＋後身頃1枚。前端はボタンまたは打ち合わせのみ。裏地を付ければ本格的に、1枚仕立てなら衿ぐり・袖ぐりをバイアステープで始末します。",
  params:[
    {key:"bust",    label:"バスト",         unit:"cm",min:78,max:130,step:1,  val:96},
    {key:"len",     label:"着丈",           unit:"cm",min:40,max:80, step:1,  val:58},
    {key:"shoulder",label:"肩幅",           unit:"cm",min:32,max:50, step:1,  val:38},
    {key:"neckw",   label:"衿ぐり幅",       unit:"cm",min:14,max:24, step:0.5,val:18},
    {key:"vdepth",  label:"前衿ぐり深さ",   unit:"cm",min:8, max:30, step:1,  val:18},
    {key:"overlap", label:"打ち合わせ幅",   unit:"cm",min:0, max:8,  step:0.5,val:3},
    {key:"ease",    label:"ゆとり（総量）", unit:"cm",min:4, max:24, step:1,  val:12},
  ],
  presets:[
    {label:"レディースS",vals:{bust:84, len:54, shoulder:36, neckw:17, vdepth:16, overlap:3, ease:10}},
    {label:"レディースM",vals:{bust:90, len:58, shoulder:38, neckw:18, vdepth:18, overlap:3, ease:12}},
    {label:"メンズM",    vals:{bust:98, len:64, shoulder:44, neckw:19, vdepth:20, overlap:3.5,ease:14}},
    {label:"メンズL",    vals:{bust:106,len:68, shoulder:46, neckw:20, vdepth:21, overlap:3.5,ease:16}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const SHx=cm(p.shoulder)/2, slope=cm(3.5), ADy=cm(22), OV=cm(p.overlap), VD=cm(p.vdepth);
    // 後身頃（中心わ）
    const bNeck=quad({x:0,y:cm(2.2)},{x:NWh*0.5,y:cm(2.2)},{x:NWh,y:0},10);
    const bArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.5},{x:HW,y:ADy},10);
    let bf=[{x:0,y:cm(2.2)}].concat(bNeck);
    bf.push({x:SHx,y:slope});
    bf=bf.concat(bArm);
    bf.push({x:HW,y:L},{x:0,y:L});
    const bpc=pieceFrom(bf,(a,b)=>a.x===0&&b.x===0,sa);
    // 前身頃（左右2枚・前端は打ち合わせ分を足す）
    const fNeck=quad({x:0,y:VD},{x:NWh*0.55,y:VD*0.35},{x:NWh,y:0},12);
    const fArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.5},{x:HW,y:ADy},10);
    let ff=[{x:-OV,y:VD}].concat(fNeck);
    ff.push({x:SHx,y:slope});
    ff=ff.concat(fArm);
    ff.push({x:HW,y:L},{x:-OV,y:L});
    const fpc=pieceFrom(ff,()=>false,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚",
       ...bpc, foldX:0,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.58}},
      {title:"前身頃", cutInfo:"2枚（左右対称に裁断）",
       ...fpc, foldX:null,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.45,y:L*0.62}}
    ],
    memo:`衿ぐり・袖ぐりの始末にバイアステープ 約${Math.round((arcLen({x:0,y:cm(2.2)},bNeck)*2+arcLen({x:0,y:VD},fNeck)*2+arcLen({x:SHx,y:slope},bArm)*2+arcLen({x:SHx,y:slope},fArm)*2)/10)}cm`};
  }
};

/* ---- カーディガン ---- */
PATTERNS.cardigan={
  mode:"human",
  name:"カーディガン",
  note:"前開きのゆったりカーディガン。前身頃2枚＋後身頃1枚＋袖2枚＋前立て。ニット地向き。前立ては共布で作り、ボタンを付けるかそのまま羽織りにもできます。",
  params:[
    {key:"bust",    label:"バスト",         unit:"cm",min:78,max:130,step:1,  val:98},
    {key:"len",     label:"着丈",           unit:"cm",min:45,max:85, step:1,  val:62},
    {key:"shoulder",label:"肩幅",           unit:"cm",min:34,max:56, step:1,  val:44},
    {key:"sleeve",  label:"袖丈",           unit:"cm",min:20,max:65, step:1,  val:52},
    {key:"cuff",    label:"袖口（裁ち幅）", unit:"cm",min:14,max:30, step:1,  val:20},
    {key:"neckw",   label:"衿ぐり幅",       unit:"cm",min:14,max:24, step:0.5,val:19},
    {key:"band",    label:"前立て幅（仕上がり）",unit:"cm",min:2,max:8,step:0.5,val:4},
    {key:"ease",    label:"ゆとり（総量）", unit:"cm",min:6, max:30, step:1,  val:16},
  ],
  presets:[
    {label:"レディースS",vals:{bust:84, len:56, shoulder:40, sleeve:50, cuff:18, neckw:18, band:4, ease:14}},
    {label:"レディースM",vals:{bust:90, len:62, shoulder:42, sleeve:52, cuff:19, neckw:19, band:4, ease:16}},
    {label:"メンズM",    vals:{bust:98, len:68, shoulder:46, sleeve:56, cuff:20, neckw:19, band:4.5,ease:18}},
    {label:"メンズL",    vals:{bust:106,len:72, shoulder:48, sleeve:58, cuff:21, neckw:20, band:4.5,ease:20}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const SHx=cm(p.shoulder)/2+cm(2), slope=cm(4), ADy=cm(24), BD=cm(p.band);
    const bNeck=quad({x:0,y:cm(2.5)},{x:NWh*0.5,y:cm(2.5)},{x:NWh,y:0},10);
    const bArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
    let bf=[{x:0,y:cm(2.5)}].concat(bNeck);
    bf.push({x:SHx,y:slope}); bf=bf.concat(bArm);
    bf.push({x:HW,y:L},{x:0,y:L});
    const bpc=pieceFrom(bf,(a,b)=>a.x===0&&b.x===0,sa);
    // 前身頃：前端は前立てを別付けするので中心線でカット
    const fNeck=quad({x:0,y:cm(8)},{x:NWh*0.5,y:cm(8)},{x:NWh,y:0},10);
    const fArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
    let ff=[{x:0,y:cm(8)}].concat(fNeck);
    ff.push({x:SHx,y:slope}); ff=ff.concat(fArm);
    ff.push({x:HW,y:L},{x:0,y:L});
    const fpc=pieceFrom(ff,()=>false,sa);
    // 袖
    const armSeam=arcLen({x:SHx,y:slope},bArm)+arcLen({x:SHx,y:slope},fArm), capFull=armSeam, SL=cm(p.sleeve), cuff=cm(p.cuff), capH=cm(3), cx=capFull/2;
    let sf=[{x:0,y:capH}];
    sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sf=sf.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sf.push({x:(capFull+cuff)/2,y:SL},{x:(capFull-cuff)/2,y:SL});
    const spc=pieceFrom(sf,()=>false,sa);
    // 前立て（左右2本）
    const bandLen=L+arcLen({x:0,y:cm(8)},fNeck);
    const bf2=[{x:0,y:0},{x:BD*2,y:0},{x:BD*2,y:bandLen},{x:0,y:bandLen}];
    const bpc2=pieceFrom(bf2,()=>false,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...bpc, foldX:0,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.58}},
      {title:"前身頃", cutInfo:"2枚（左右対称に裁断）", ...fpc, foldX:null,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+8,x2:cx,y2:SL-8},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.55}},
      {title:"前立て", cutInfo:"2本（二つ折りにして前端に付ける）", ...bpc2, foldX:BD,
       grain:{x1:BD,y1:20,x2:BD,y2:bandLen-20},
       notches:[], labelAt:{x:BD,y:bandLen*0.5}}
    ],
    memo:`前立ては仕上がり${p.band}cm（裁ち幅${(p.band*2).toFixed(1)}cm）を二つ折りで使用`};
  }
};

/* ---- テーパードパンツ ---- */
PATTERNS.taperedpants={
  mode:"human",
  name:"テーパードパンツ",
  note:"腰まわりはゆったり、裾に向かって細くなる大人のキッズパンツ。前後同じ型紙で、中心（股ぐり）同士を縫ってから脇と股下を縫います。仮縫いで股ぐりを確認してください。",
  params:[
    {key:"hip",    label:"ヒップ",             unit:"cm",min:74,max:130,step:1,  val:94},
    {key:"rise",   label:"股上（ウエスト〜股ぐり）",unit:"cm",min:22,max:40,step:1,val:28},
    {key:"inseam", label:"股下（股〜裾）",      unit:"cm",min:40,max:85, step:1,  val:66},
    {key:"hemw",   label:"裾幅（片足・裁ち）",  unit:"cm",min:14,max:32, step:0.5,val:19},
    {key:"ease",   label:"ゆとり（総量）",      unit:"cm",min:6, max:30, step:1,  val:14},
    {key:"crotchF",label:"股ぐり延長",          unit:"cm",min:2, max:8,  step:0.5,val:4},
    {key:"casing", label:"ウエスト折り返し",    unit:"cm",min:2, max:6,  step:0.5,val:4},
  ],
  presets:[
    {label:"S",  vals:{hip:86, rise:26, inseam:62, hemw:17, ease:12, crotchF:3.5, casing:4}},
    {label:"M",  vals:{hip:94, rise:28, inseam:66, hemw:19, ease:14, crotchF:4,   casing:4}},
    {label:"L",  vals:{hip:102,rise:30, inseam:68, hemw:20, ease:16, crotchF:4,   casing:4}},
    {label:"LL", vals:{hip:110,rise:31, inseam:70, hemw:21, ease:18, crotchF:4.5, casing:4}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.hip)+cm(p.ease))/4, CR=cm(p.rise), IL=cm(p.inseam);
    const CAS=cm(p.casing), CF=cm(p.crotchF), HEM=cm(p.hemw);
    const H=CAS+CR+IL;
    const hipX=HW+CF;
    let fin=[{x:0,y:0},{x:HW,y:0},{x:HW,y:CAS}];
    fin=fin.concat(quad({x:HW,y:CAS},{x:hipX,y:CAS},{x:hipX,y:CAS+CR},8));
    // 股下：内股側を裾に向けて絞る
    fin.push({x:HEM,y:H},{x:0,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"前/後パンツ", cutInfo:"前後それぞれ2枚（左右）計4枚／中心線・股ぐり同士を縫う",
      ...pc, foldX:null,
      grain:{x1:HW*0.45,y1:CAS+CR/2,x2:HW*0.45,y2:H-24},
      casingLines:[CAS], casingLabel:"ウエスト折り返し",
      notches:[{x:hipX,y:CAS+CR}], labelAt:{x:HW*0.45,y:CAS+(CR+IL)*0.55}
    }],
    memo:`ウエストゴム長の目安 ${Math.round((cm(p.hip)+cm(p.ease))*0.85/10)}cm ／ 裾まわり 約${(p.hemw*2).toFixed(0)}cm`};
  }
};

/* ---- キュロット（ガウチョパンツ） ---- */
PATTERNS.culotte={
  mode:"human",
  name:"キュロット",
  note:"裾に向かって広がる、スカートのように見えるワイドなパンツ。ゴムウエストで着心地がらく。前後同じ型紙で、中心（股ぐり）同士を縫ってから脇と股下を縫います。とろみのある生地が向きます。",
  params:[
    {key:"hip",    label:"ヒップ",             unit:"cm",min:74,max:130,step:1,  val:94},
    {key:"rise",   label:"股上（ウエスト〜股ぐり）",unit:"cm",min:24,max:42,step:1,val:30},
    {key:"inseam", label:"股下（股〜裾）",      unit:"cm",min:20,max:70, step:1,  val:42},
    {key:"flare",  label:"裾の広がり（片側に＋）",unit:"cm",min:4,max:26,step:0.5,val:12},
    {key:"ease",   label:"ゆとり（総量）",      unit:"cm",min:8, max:34, step:1,  val:18},
    {key:"crotchF",label:"股ぐり延長",          unit:"cm",min:3, max:10, step:0.5,val:5},
    {key:"casing", label:"ウエスト折り返し",    unit:"cm",min:2, max:6,  step:0.5,val:4},
  ],
  presets:[
    {label:"S",  vals:{hip:86, rise:28, inseam:38, flare:10, ease:16, crotchF:4.5, casing:4}},
    {label:"M",  vals:{hip:94, rise:30, inseam:42, flare:12, ease:18, crotchF:5,   casing:4}},
    {label:"L",  vals:{hip:102,rise:31, inseam:44, flare:13, ease:20, crotchF:5,   casing:4}},
    {label:"ミニ",vals:{hip:94, rise:29, inseam:26, flare:11, ease:18, crotchF:5,  casing:4}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.hip)+cm(p.ease))/4, CR=cm(p.rise), IL=cm(p.inseam);
    const CAS=cm(p.casing), CF=cm(p.crotchF), FL=cm(p.flare);
    const H=CAS+CR+IL, hipX=HW+CF;
    let fin=[{x:0,y:0},{x:HW,y:0},{x:HW,y:CAS}];
    fin=fin.concat(quad({x:HW,y:CAS},{x:hipX,y:CAS},{x:hipX,y:CAS+CR},8));
    fin.push({x:hipX+FL,y:H},{x:-FL*0.5,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"前/後パンツ", cutInfo:"前後それぞれ2枚（左右）計4枚／中心線・股ぐり同士を縫う",
      ...pc, foldX:null,
      grain:{x1:HW*0.45,y1:CAS+CR/2,x2:HW*0.45,y2:H-24},
      casingLines:[CAS], casingLabel:"ウエスト折り返し",
      notches:[{x:hipX,y:CAS+CR}], labelAt:{x:HW*0.45,y:CAS+(CR+IL)*0.55}
    }],
    memo:`裾まわり 約${(((hipX+FL)+(FL*0.5))*4/10).toFixed(0)}cm ／ ウエストゴム長の目安 ${Math.round((cm(p.hip)+cm(p.ease))*0.85/10)}cm`};
  }
};

/* ---- 甚平（子供・上衣） ---- */
PATTERNS.jinbei={
  mode:"kids",
  name:"甚平（上衣）",
  note:"夏祭りや寝間着にぴったりの和風トップス。後身頃1枚＋前身頃2枚＋袖2枚＋ひも。脇はひもで結ぶ仕立て。パンツは「キッズハーフパンツ」の型紙と組み合わせると甚平セットになります。綿・楊柳・しじら織が向きます。",
  params:[
    {key:"bust",   label:"胸まわり",       unit:"cm",min:52,max:96, step:1,  val:68},
    {key:"len",    label:"着丈",           unit:"cm",min:28,max:60, step:1,  val:40},
    {key:"shoulder",label:"肩幅",          unit:"cm",min:22,max:40, step:1,  val:28},
    {key:"sleeve", label:"袖丈",           unit:"cm",min:8, max:28, step:1,  val:14},
    {key:"overlap",label:"前の打ち合わせ", unit:"cm",min:4, max:14, step:0.5,val:8},
    {key:"ease",   label:"ゆとり（総量）", unit:"cm",min:6, max:24, step:1,  val:14},
    {key:"tie",    label:"ひも長さ（1本）",unit:"cm",min:20,max:60, step:1,  val:34},
  ],
  presets:[
    {label:"90cm", vals:{bust:52, len:32, shoulder:24, sleeve:11, overlap:6, ease:12, tie:28}},
    {label:"100cm",vals:{bust:56, len:35, shoulder:25, sleeve:12, overlap:7, ease:12, tie:30}},
    {label:"110cm",vals:{bust:60, len:38, shoulder:27, sleeve:13, overlap:7, ease:14, tie:32}},
    {label:"120cm",vals:{bust:64, len:40, shoulder:28, sleeve:14, overlap:8, ease:14, tie:34}},
    {label:"130cm",vals:{bust:68, len:43, shoulder:30, sleeve:15, overlap:8, ease:14, tie:36}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4, L=cm(p.len);
    const SHx=cm(p.shoulder)/2, slope=cm(2), ADy=cm(14), OV=cm(p.overlap);
    const NWh=cm(6);
    // 後身頃（中心わ・和風の四角い衿ぐり）
    let bf=[{x:0,y:cm(1.5)},{x:NWh,y:0},{x:SHx,y:slope},{x:HW,y:ADy},{x:HW,y:L},{x:0,y:L}];
    const bpc=pieceFrom(bf,(a,b)=>a.x===0&&b.x===0,sa);
    // 前身頃（打ち合わせ分を前端に足し、衿ぐりは深いV）
    const fNeck=quad({x:-OV,y:cm(p.len)*0.42},{x:NWh*0.4,y:cm(p.len)*0.16},{x:NWh,y:0},12);
    let ff=[{x:-OV,y:cm(p.len)*0.42}].concat(fNeck);
    ff.push({x:SHx,y:slope},{x:HW,y:ADy},{x:HW,y:L},{x:-OV,y:L});
    const fpc=pieceFrom(ff,()=>false,sa);
    // 袖（筒状の平袖）
    const SL=cm(p.sleeve), SW=ADy*2;
    const sf=[{x:0,y:0},{x:SL,y:0},{x:SL,y:SW},{x:0,y:SW}];
    const spc=pieceFrom(sf,()=>false,sa);
    // ひも
    const TL=cm(p.tie), TW=cm(3);
    const tf=[{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}];
    const tpc=pieceFrom(tf,()=>false,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...bpc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+8,x2:HW*0.5,y2:L-12},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"前身頃", cutInfo:"2枚（左右対称に裁断）", ...fpc, foldX:null,
       grain:{x1:HW*0.5,y1:ADy+8,x2:HW*0.5,y2:L-12},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.65}},
      {title:"袖", cutInfo:"2枚（左右）／袖口を三つ折りにして身頃の袖ぐりに付ける", ...spc, foldX:null,
       grain:{x1:SL*0.5,y1:10,x2:SL*0.5,y2:SW-10},
       notches:[{x:0,y:SW/2}], labelAt:{x:SL*0.5,y:SW*0.5}},
      {title:"結びひも", cutInfo:"4本（4つ折りにして縫う）", ...tpc, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`脇のひもは前後の脇上端に付けます／袖ぐり深さ ${(ADy/10).toFixed(0)}cm`};
  }
};

/* ---- ロンパース（子供） ---- */
PATTERNS.kidsrompers={
  mode:"kids",
  name:"ロンパース",
  note:"股下をスナップで留める、めくれ上がらないつなぎトップス。前身頃・後身頃の2枚仕立てで袖なし。衿ぐりと袖ぐりはバイアステープで始末します。伸縮するニット地が向きます。",
  params:[
    {key:"chest", label:"胸まわり",       unit:"cm",min:40,max:64, step:1,  val:50},
    {key:"len",   label:"着丈（肩〜股）", unit:"cm",min:28,max:52, step:1,  val:38},
    {key:"shoulder",label:"肩幅",         unit:"cm",min:16,max:30, step:0.5,val:21},
    {key:"neckw", label:"衿ぐり幅",       unit:"cm",min:10,max:20, step:0.5,val:14},
    {key:"crotchw",label:"股下タブ幅",    unit:"cm",min:6, max:16, step:0.5,val:10},
    {key:"ease",  label:"ゆとり（総量）", unit:"cm",min:2, max:14, step:1,  val:6},
  ],
  presets:[
    {label:"70(6-12M)",vals:{chest:44, len:32, shoulder:18, neckw:13, crotchw:9,  ease:6}},
    {label:"80(1-2歳)",vals:{chest:47, len:35, shoulder:19, neckw:13, crotchw:9,  ease:6}},
    {label:"90(2-3歳)",vals:{chest:50, len:38, shoulder:21, neckw:14, crotchw:10, ease:6}},
    {label:"95(3-4歳)",vals:{chest:53, len:41, shoulder:22, neckw:14, crotchw:10, ease:6}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.chest)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const SHx=cm(p.shoulder)/2, slope=cm(1.8), ADy=cm(11), CW=cm(p.crotchw)/2;
    const body=(back)=>{
      const FD=cm(back?1.8:5.5);
      const neck=quad({x:0,y:FD},{x:NWh*0.5,y:FD},{x:NWh,y:0},10);
      const arm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.5},{x:HW,y:ADy},10);
      let fin=[{x:0,y:FD}].concat(neck);
      fin.push({x:SHx,y:slope});
      fin=fin.concat(arm);
      // 脇→股ぐりへ絞る
      fin.push({x:HW,y:L*0.62});
      fin=fin.concat(quad({x:HW,y:L*0.62},{x:CW*1.5,y:L*0.9},{x:CW,y:L},10));
      fin.push({x:0,y:L});
      const pc=pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa);
      return {pc, neck:arcLen({x:0,y:FD},neck), arm:arcLen({x:SHx,y:slope},arm)};
    };
    const F=body(false), B=body(true);
    return {pieces:[
      {title:"前身頃", cutInfo:"中心を「わ」／前 1枚", ...F.pc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+6,x2:HW*0.5,y2:L*0.7},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.45,y:L*0.5}},
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...B.pc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+6,x2:HW*0.5,y2:L*0.7},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.45,y:L*0.5}}
    ],
    memo:`衿ぐり1周 約${((F.neck+B.neck)/10).toFixed(0)}cm ／ 袖ぐり1周 約${((F.arm+B.arm)/10).toFixed(0)}cm（バイアステープの参考長）／ 股下にスナップ3個`};
  }
};

/* ---- ラグランTシャツ（子供） ---- */
PATTERNS.kidsraglan={
  mode:"kids",
  name:"キッズラグランTシャツ",
  note:"袖が衿ぐりまでつながるラグラン袖のTシャツ。前後身頃＋袖2枚。肩の縫い目が斜めに入るデザインで、袖付けが直線的でやさしいのが特徴。身頃と袖を別色にすると本格的です。ニット地向き。",
  params:[
    {key:"chest",  label:"胸まわり",       unit:"cm",min:48,max:84, step:1,  val:62},
    {key:"len",    label:"着丈",           unit:"cm",min:28,max:56, step:1,  val:40},
    {key:"sleeve", label:"袖丈",           unit:"cm",min:8, max:46, step:1,  val:16},
    {key:"cuff",   label:"袖口（裁ち幅）", unit:"cm",min:10,max:24, step:0.5,val:15},
    {key:"neckw",  label:"衿ぐり幅",       unit:"cm",min:12,max:22, step:0.5,val:16},
    {key:"ease",   label:"ゆとり（総量）", unit:"cm",min:4, max:20, step:1,  val:10},
  ],
  presets:[
    {label:"90cm", vals:{chest:52, len:34, sleeve:13, cuff:13, neckw:15, ease:10}},
    {label:"100cm",vals:{chest:56, len:37, sleeve:14, cuff:14, neckw:15, ease:10}},
    {label:"110cm",vals:{chest:59, len:40, sleeve:15, cuff:14, neckw:16, ease:10}},
    {label:"120cm",vals:{chest:62, len:43, sleeve:16, cuff:15, neckw:16, ease:10}},
    {label:"130cm",vals:{chest:66, len:46, sleeve:17, cuff:16, neckw:17, ease:12}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.chest)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2, ADy=cm(13);
    const body=(back)=>{
      const FD=cm(back?2:5);
      const neck=quad({x:0,y:FD},{x:NWh*0.55,y:FD},{x:NWh,y:0},10);
      // ラグラン線：衿ぐり端から脇下へ斜めのゆるいカーブ
      const rag=quad({x:NWh,y:0},{x:NWh+(HW-NWh)*0.5,y:ADy*0.30},{x:HW,y:ADy},14);
      let fin=[{x:0,y:FD}].concat(neck);
      fin=fin.concat(rag);
      fin.push({x:HW,y:L},{x:0,y:L});
      const pc=pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa);
      return {pc, rag:arcLen({x:NWh,y:0},rag), neck:arcLen({x:0,y:FD},neck)};
    };
    const F=body(false), B=body(true);
    // 袖：袖幅は二の腕まわりから算出し、前後のラグライン長に合わせて山の高さを決める
    const SL=cm(p.sleeve), cuff=cm(p.cuff);
    const SW=(cm(p.chest)+cm(p.ease))*0.36;        // 袖幅（二の腕まわり）
    const half=SW/2;
    const drop=(rag)=>Math.max(Math.sqrt(Math.max(rag*rag-half*half,0)), SW*0.18);
    const dF=drop(F.rag), dB=drop(B.rag);
    let sf=[{x:0,y:dF}];
    sf=sf.concat(quad({x:0,y:dF},{x:half*0.45,y:dF*0.30},{x:half,y:0},12));      // 前ラグラン線
    sf=sf.concat(quad({x:half,y:0},{x:half*1.55,y:dB*0.30},{x:SW,y:dB},12));     // 後ラグラン線
    sf.push({x:SW-(SW-cuff)/2,y:dB+SL});                                          // 後袖下→袖口
    sf.push({x:(SW-cuff)/2,y:dF+SL});                                             // 袖口→前袖下
    const spc=pieceFrom(sf,()=>false,sa);
    return {pieces:[
      {title:"前身頃", cutInfo:"中心を「わ」／前 1枚", ...F.pc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+8,x2:HW*0.5,y2:L-12},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.45,y:L*0.6}},
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...B.pc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+8,x2:HW*0.5,y2:L-12},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.45,y:L*0.6}},
      {title:"ラグラン袖", cutInfo:"2枚（左右）／前後のラグラン線に合わせて縫う", ...spc, foldX:null,
       grain:{x1:half,y1:Math.min(dF,dB)+16,x2:half,y2:dF+SL-16},
       notches:[{x:half,y:0}], labelAt:{x:half,y:(dF+SL)*0.62}}
    ],
    memo:`衿ぐり1周 約${((F.neck+B.neck)/10).toFixed(0)}cm（リブ・バインダーの参考長）`};
  }
};

/* ---- ジャンパースカート ---- */
PATTERNS.jumperskirt={
  mode:"kids",
  name:"ジャンパースカート",
  note:"肩ひもの付いた吊りスカート。Tシャツやブラウスの上から着られます。ボディス（胸当て）＋ギャザースカート＋肩ひも。ウエストで切り替えてギャザーを寄せます。",
  params:[
    {key:"chest",  label:"胸まわり",       unit:"cm",min:48,max:80, step:1,  val:60},
    {key:"bodice", label:"胸当て丈",       unit:"cm",min:10,max:28, step:1,  val:16},
    {key:"skirt",  label:"スカート丈",     unit:"cm",min:20,max:50, step:1,  val:32},
    {key:"ratio",  label:"ギャザー倍率",   unit:"倍",min:1.3,max:2.2,step:0.1,val:1.7},
    {key:"strap",  label:"肩ひも長さ",     unit:"cm",min:25,max:55, step:1,  val:38},
    {key:"strapw", label:"肩ひも幅",       unit:"cm",min:2.5,max:6, step:0.5,val:4},
    {key:"ease",   label:"ゆとり（総量）", unit:"cm",min:2, max:14, step:1,  val:6},
  ],
  presets:[
    {label:"90cm", vals:{chest:52, bodice:13, skirt:26, ratio:1.7, strap:32, strapw:3.5, ease:6}},
    {label:"100cm",vals:{chest:55, bodice:14, skirt:29, ratio:1.7, strap:34, strapw:4,   ease:6}},
    {label:"110cm",vals:{chest:58, bodice:15, skirt:31, ratio:1.7, strap:36, strapw:4,   ease:6}},
    {label:"120cm",vals:{chest:61, bodice:16, skirt:33, ratio:1.7, strap:38, strapw:4,   ease:6}},
    {label:"130cm",vals:{chest:65, bodice:18, skirt:36, ratio:1.7, strap:41, strapw:4.5, ease:8}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.chest)+cm(p.ease))/4, BL=cm(p.bodice), SK=cm(p.skirt);
    // ボディス（中心わ・上端は少し狭める）
    const topX=HW*0.68;
    const bf=[{x:0,y:0},{x:topX,y:0},{x:HW,y:BL},{x:0,y:BL}];
    const bpc=pieceFrom(bf,(a,b)=>a.x===0&&b.x===0,sa);
    // スカート（長方形・ギャザー）
    const SW=cm(p.chest)*p.ratio/2, SH=SK+cm(2);
    const sf=[{x:0,y:0},{x:SW,y:0},{x:SW,y:SH},{x:0,y:SH}];
    const spc=pieceFrom(sf,()=>false,sa);
    // 肩ひも
    const TL=cm(p.strap), TW=cm(p.strapw)*2;
    const tf=[{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}];
    const tpc=pieceFrom(tf,()=>false,sa);
    return {pieces:[
      {title:"胸当て（前・後共通）", cutInfo:"中心を「わ」／前1枚・後1枚（表布・裏布 各2枚で計4枚）",
       ...bpc, foldX:0,
       grain:{x1:HW*0.4,y1:8,x2:HW*0.4,y2:BL-8},
       notches:[{x:topX,y:0}], labelAt:{x:HW*0.4,y:BL*0.55}},
      {title:"スカート（前・後共通）", cutInfo:"2枚（前・後）／上端にギャザーを寄せて胸当てに付ける",
       ...spc, foldX:null,
       grain:{x1:SW*0.5,y1:12,x2:SW*0.5,y2:SH-12},
       notches:[{x:SW/2,y:0}], labelAt:{x:SW*0.5,y:SH*0.55}},
      {title:"肩ひも", cutInfo:"2本（二つ折りにして縫い、表に返す）", ...tpc, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`スカート裾まわり 約${(SW*2/10).toFixed(0)}cm ／ 肩ひもは仕上がり幅${p.strapw}cm`};
  }
};

/* ---- キッズパーカー ---- */
PATTERNS.kidshoodie={
  mode:"kids",
  name:"キッズパーカー",
  note:"フード付きのプルオーバーパーカー。前後身頃＋袖2枚＋フード2枚。裏毛・スウェット地が向きます。フードは2枚を中表に縫って衿ぐりに付けます。袖口と裾はリブを付けても。",
  params:[
    {key:"chest",  label:"胸まわり",       unit:"cm",min:52,max:88, step:1,  val:66},
    {key:"len",    label:"着丈",           unit:"cm",min:30,max:58, step:1,  val:42},
    {key:"shoulder",label:"肩幅",          unit:"cm",min:24,max:42, step:1,  val:32},
    {key:"sleeve", label:"袖丈",           unit:"cm",min:20,max:50, step:1,  val:36},
    {key:"cuff",   label:"袖口（裁ち幅）", unit:"cm",min:10,max:22, step:0.5,val:14},
    {key:"neckw",  label:"衿ぐり幅",       unit:"cm",min:13,max:22, step:0.5,val:16},
    {key:"hoodh",  label:"フード高さ",     unit:"cm",min:22,max:38, step:1,  val:29},
    {key:"ease",   label:"ゆとり（総量）", unit:"cm",min:6, max:24, step:1,  val:14},
  ],
  presets:[
    {label:"100cm",vals:{chest:56, len:36, shoulder:28, sleeve:31, cuff:12, neckw:15, hoodh:26, ease:12}},
    {label:"110cm",vals:{chest:60, len:39, shoulder:30, sleeve:34, cuff:13, neckw:16, hoodh:27, ease:14}},
    {label:"120cm",vals:{chest:64, len:42, shoulder:32, sleeve:36, cuff:14, neckw:16, hoodh:29, ease:14}},
    {label:"130cm",vals:{chest:68, len:45, shoulder:34, sleeve:39, cuff:15, neckw:17, hoodh:30, ease:14}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.chest)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const SHx=cm(p.shoulder)/2+cm(1.5), slope=cm(3), ADy=cm(16);
    const body=(back)=>{
      const FD=cm(back?2.2:6);
      const neck=quad({x:0,y:FD},{x:NWh*0.5,y:FD},{x:NWh,y:0},10);
      const arm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
      let fin=[{x:0,y:FD}].concat(neck);
      fin.push({x:SHx,y:slope});
      fin=fin.concat(arm);
      fin.push({x:HW,y:L},{x:0,y:L});
      const pc=pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa);
      return {pc, arm:arcLen({x:SHx,y:slope},arm), neck:arcLen({x:0,y:FD},neck)};
    };
    const F=body(false), B=body(true);
    const armSeam=F.arm+B.arm, capFull=armSeam, SL=cm(p.sleeve), cuff=cm(p.cuff), capH=cm(2.5), cx=capFull/2;
    let sf=[{x:0,y:capH}];
    sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sf=sf.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sf.push({x:(capFull+cuff)/2,y:SL},{x:(capFull-cuff)/2,y:SL});
    const spc=pieceFrom(sf,()=>false,sa);
    // フード：前端が直線、後ろが丸い
    const HH=cm(p.hoodh), HD=(F.neck+B.neck)*1.05;
    let hf=[{x:0,y:0},{x:HD,y:0}];
    hf=hf.concat(quad({x:HD,y:0},{x:HD*1.06,y:HH*0.62},{x:HD*0.72,y:HH},12));
    hf.push({x:0,y:HH});
    const hpc=pieceFrom(hf,()=>false,sa);
    return {pieces:[
      {title:"前身頃", cutInfo:"中心を「わ」／前 1枚", ...F.pc, foldX:0,
       grain:{x1:HW*0.5,y1:slope+12,x2:HW*0.5,y2:L-14},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...B.pc, foldX:0,
       grain:{x1:HW*0.5,y1:slope+12,x2:HW*0.5,y2:L-14},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+8,x2:cx,y2:SL-8},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.55}},
      {title:"フード", cutInfo:"2枚（中表に縫い合わせて衿ぐりに付ける）", ...hpc, foldX:null,
       grain:{x1:HD*0.45,y1:12,x2:HD*0.45,y2:HH-14},
       notches:[{x:0,y:HH}], labelAt:{x:HD*0.45,y:HH*0.55}}
    ],
    memo:`衿ぐり1周 約${((F.neck+B.neck)/10).toFixed(0)}cm ／ フード下端をこの長さに合わせて付けます`};
  }
};

/* ---- スリーパー（ベビー） ---- */
PATTERNS.sleeper={
  mode:"baby",
  name:"スリーパー",
  note:"寝ている間の布団はだけを防ぐ袖なしのベスト型寝具。前身頃2枚＋後身頃1枚。前開きでスナップ留め。6重ガーゼやフリースで作ると一年中使えます。",
  params:[
    {key:"chest",  label:"胸まわり",       unit:"cm",min:44,max:76, step:1,  val:56},
    {key:"len",    label:"着丈",           unit:"cm",min:34,max:70, step:1,  val:48},
    {key:"shoulder",label:"肩幅",          unit:"cm",min:16,max:32, step:0.5,val:22},
    {key:"neckw",  label:"衿ぐり幅",       unit:"cm",min:11,max:20, step:0.5,val:14},
    {key:"armd",   label:"袖ぐり深さ",     unit:"cm",min:9, max:20, step:0.5,val:13},
    {key:"flare",  label:"裾の広がり（片側に＋）",unit:"cm",min:0,max:12,step:0.5,val:4},
  ],
  presets:[
    {label:"新生児",  vals:{chest:46, len:38, shoulder:18, neckw:12, armd:10, flare:3}},
    {label:"0〜1歳",  vals:{chest:52, len:44, shoulder:20, neckw:13, armd:12, flare:3.5}},
    {label:"1〜2歳",  vals:{chest:56, len:48, shoulder:22, neckw:14, armd:13, flare:4}},
    {label:"2〜3歳",  vals:{chest:60, len:54, shoulder:24, neckw:15, armd:14, flare:5}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.chest))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const SHx=cm(p.shoulder)/2, slope=cm(2), ADy=cm(p.armd), FL=cm(p.flare);
    // 後身頃
    const bNeck=quad({x:0,y:cm(1.8)},{x:NWh*0.5,y:cm(1.8)},{x:NWh,y:0},10);
    const bArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.5},{x:HW,y:ADy},10);
    let bf=[{x:0,y:cm(1.8)}].concat(bNeck);
    bf.push({x:SHx,y:slope}); bf=bf.concat(bArm);
    bf.push({x:HW+FL,y:L},{x:0,y:L});
    const bpc=pieceFrom(bf,(a,b)=>a.x===0&&b.x===0,sa);
    // 前身頃（前中心で分割・重なりなし＝突き合わせスナップ）
    const fNeck=quad({x:0,y:cm(5)},{x:NWh*0.5,y:cm(5)},{x:NWh,y:0},10);
    const fArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.5},{x:HW,y:ADy},10);
    let ff=[{x:0,y:cm(5)}].concat(fNeck);
    ff.push({x:SHx,y:slope}); ff=ff.concat(fArm);
    ff.push({x:HW+FL,y:L},{x:0,y:L});
    const fpc=pieceFrom(ff,()=>false,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚（表布・裏布 各1枚）", ...bpc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+8,x2:HW*0.5,y2:L-14},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"前身頃", cutInfo:"2枚（左右対称）／表布・裏布 各2枚", ...fpc, foldX:null,
       grain:{x1:HW*0.5,y1:ADy+8,x2:HW*0.5,y2:L-14},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.62}}
    ],
    memo:`前中心にスナップ4〜5個 ／ 衿ぐり・袖ぐりはバイアステープで始末（約${Math.round((arcLen({x:0,y:cm(1.8)},bNeck)*2+arcLen({x:0,y:cm(5)},fNeck)*2+arcLen({x:SHx,y:slope},bArm)*2+arcLen({x:SHx,y:slope},fArm)*2)/10)}cm）`};
  }
};

/* ---- ベビーシューズ ---- */
PATTERNS.babyshoes={
  mode:"baby",
  name:"ベビーシューズ",
  note:"やわらかい布で作るファーストシューズ。底1枚＋甲（つま先側）＋かかとの3パーツ。裏布とキルト芯を挟むとふっくら仕上がります。まだ歩かない赤ちゃんのおしゃれ・防寒に。",
  params:[
    {key:"footlen",label:"足の長さ",   unit:"cm",min:8, max:15, step:0.5,val:11},
    {key:"footw",  label:"足の幅",     unit:"cm",min:4, max:8,  step:0.5,val:5.5},
    {key:"height", label:"履き口の高さ",unit:"cm",min:3.5,max:8, step:0.5,val:5},
  ],
  presets:[
    {label:"3〜6M",  vals:{footlen:9.5, footw:5,   height:4}},
    {label:"6〜12M", vals:{footlen:11,  footw:5.5, height:5}},
    {label:"1〜2歳", vals:{footlen:12.5,footw:6,   height:5.5}},
  ],
  toggles:[],
  gen(p,sa){
    const FL=cm(p.footlen), FW=cm(p.footw), HT=cm(p.height);
    // 底：楕円（つま先やや広め）
    const sole=[];
    const n=40;
    for(let i=0;i<n;i++){
      const t=i/n*Math.PI*2;
      const rx=FW/2*(1+0.08*Math.cos(t));
      sole.push({x:FL/2+FL/2*Math.cos(t)*0.98, y:FW/2+rx*Math.sin(t)});
    }
    const spc=pieceFrom(sole,()=>false,sa);
    // 甲（つま先側）：底の前半分に沿う山型
    const vampW=FW*Math.PI*0.52;
    let vf=[{x:0,y:HT}];
    vf=vf.concat(quad({x:0,y:HT},{x:vampW*0.25,y:0},{x:vampW*0.5,y:0},10));
    vf=vf.concat(quad({x:vampW*0.5,y:0},{x:vampW*0.75,y:0},{x:vampW,y:HT},10));
    vf.push({x:vampW*0.86,y:HT+FL*0.30},{x:vampW*0.14,y:HT+FL*0.30});
    const vpc=pieceFrom(vf,()=>false,sa);
    // かかと：後ろを包む帯
    const heelW=FL*0.62, heelH=HT+cm(1.5);
    let hf=[{x:0,y:cm(1.2)}];
    hf=hf.concat(quad({x:0,y:cm(1.2)},{x:heelW*0.5,y:0},{x:heelW,y:cm(1.2)},10));
    hf.push({x:heelW,y:heelH},{x:0,y:heelH});
    const hpc=pieceFrom(hf,()=>false,sa);
    return {pieces:[
      {title:"底（ソール）", cutInfo:"2枚（左右）／表布・裏布 各2枚", ...spc, foldX:null,
       grain:{x1:FL*0.5,y1:FW*0.25,x2:FL*0.5,y2:FW*0.75},
       notches:[{x:FL/2-FL/2*0.98,y:FW/2},{x:FL/2+FL/2*0.98,y:FW/2}], labelAt:{x:FL*0.5,y:FW*0.5}},
      {title:"甲（つま先）", cutInfo:"2枚（左右）／表布・裏布 各2枚", ...vpc, foldX:null,
       grain:{x1:vampW*0.5,y1:HT*0.6,x2:vampW*0.5,y2:HT+FL*0.22},
       notches:[{x:vampW*0.5,y:0}], labelAt:{x:vampW*0.5,y:HT*0.8}},
      {title:"かかと", cutInfo:"2枚（左右）／表布・裏布 各2枚", ...hpc, foldX:null,
       grain:{x1:heelW*0.5,y1:cm(2),x2:heelW*0.5,y2:heelH-8},
       notches:[{x:heelW*0.5,y:heelH}], labelAt:{x:heelW*0.5,y:heelH*0.62}}
    ],
    memo:`底の周囲 約${Math.round(plen(sole.concat([sole[0]]))/10)}cm ／ 甲＋かかとの下端をこの長さに合わせます`};
  }
};

/* ---- ベビーミトン ---- */
PATTERNS.babymitten={
  mode:"baby",
  name:"ベビーミトン",
  note:"赤ちゃんのひっかき防止ミトン。1パーツを2枚ずつ縫い合わせるだけの簡単な作り。手首にゴムを通すか、リボンで結びます。ガーゼやニットなど肌にやさしい生地で。",
  params:[
    {key:"palmw", label:"手のひら幅",   unit:"cm",min:4, max:9,  step:0.5,val:6},
    {key:"len",   label:"全長",         unit:"cm",min:7, max:14, step:0.5,val:10},
    {key:"casing",label:"ゴム通し折り返し",unit:"cm",min:1.5,max:4,step:0.5,val:2.5},
  ],
  presets:[
    {label:"新生児", vals:{palmw:5,   len:8.5, casing:2}},
    {label:"3〜6M",  vals:{palmw:6,   len:10,  casing:2.5}},
    {label:"6〜12M", vals:{palmw:6.5, len:11,  casing:2.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.palmw), L=cm(p.len), CAS=cm(p.casing);
    let fin=[{x:0,y:L}];
    fin=fin.concat(quad({x:0,y:CAS+ (L-CAS)*0.30},{x:0,y:CAS*0.2},{x:W*0.5,y:0},12));
    fin=fin.concat(quad({x:W*0.5,y:0},{x:W,y:CAS*0.2},{x:W,y:CAS+(L-CAS)*0.30},12));
    fin.push({x:W,y:L});
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ミトン本体", cutInfo:"4枚（片手2枚×左右）／2枚を中表に縫って表に返す",
      ...pc, foldX:null,
      grain:{x1:W*0.5,y1:L*0.35,x2:W*0.5,y2:L-6},
      casingLines:[L-CAS], casingLabel:"ゴム通し折り返し",
      notches:[], labelAt:{x:W*0.5,y:L*0.6}
    }],
    memo:`手首のゴムは ${(p.palmw*1.5).toFixed(0)}cm 程度が目安（きつすぎないよう調整）`};
  }
};

/* ---- 鍋つかみ ---- */
PATTERNS.potholder={
  mode:"small",
  name:"鍋つかみ",
  note:"角を丸くした四角い鍋つかみ。表布・裏布のあいだにキルト芯や厚手の綿を挟んで縫います。角にループを挟むと吊るして収納できます。ミトン型にせず両手で挟んで使うタイプ。",
  params:[
    {key:"size",  label:"一辺の長さ",   unit:"cm",min:12,max:26, step:0.5,val:18},
    {key:"round", label:"角の丸み",     unit:"cm",min:0, max:8,  step:0.5,val:3},
    {key:"loop",  label:"ループ長さ",   unit:"cm",min:6, max:16, step:0.5,val:10},
    {key:"loopw", label:"ループ裁ち幅", unit:"cm",min:2.5,max:6, step:0.5,val:4},
  ],
  presets:[
    {label:"小さめ", vals:{size:15, round:2.5, loop:8,  loopw:3.5}},
    {label:"標準",   vals:{size:18, round:3,   loop:10, loopw:4}},
    {label:"大きめ", vals:{size:22, round:4,   loop:12, loopw:4}},
  ],
  toggles:[],
  gen(p,sa){
    const S=cm(p.size), R=clampR(cm(p.round),S,S);
    let fin=[];
    if(R>0){
      fin.push({x:R,y:0});
      fin.push({x:S-R,y:0});
      fin=fin.concat(quad({x:S-R,y:0},{x:S,y:0},{x:S,y:R},6));
      fin.push({x:S,y:S-R});
      fin=fin.concat(quad({x:S,y:S-R},{x:S,y:S},{x:S-R,y:S},6));
      fin.push({x:R,y:S});
      fin=fin.concat(quad({x:R,y:S},{x:0,y:S},{x:0,y:S-R},6));
      fin.push({x:0,y:R});
      fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},6));
    }else{
      fin=[{x:0,y:0},{x:S,y:0},{x:S,y:S},{x:0,y:S}];
    }
    const pc=pieceFrom(fin,()=>false,sa);
    const LL=cm(p.loop), LW=cm(p.loopw);
    const lf=[{x:0,y:0},{x:LL,y:0},{x:LL,y:LW},{x:0,y:LW}];
    const lpc=pieceFrom(lf,()=>false,sa);
    return {pieces:[
      {title:"本体", cutInfo:"表布・裏布 各1枚（＋キルト芯1枚）", ...pc, foldX:null,
       grain:{x1:S*0.5,y1:R+8,x2:S*0.5,y2:S-R-8},
       notches:[], labelAt:{x:S*0.5,y:S*0.5}},
      {title:"つり下げループ", cutInfo:"1本（4つ折りにして縫い、角に挟む）", ...lpc, foldX:null,
       grain:{x1:LL*0.2,y1:LW/2,x2:LL*0.8,y2:LW/2},
       notches:[], labelAt:{x:LL*0.5,y:LW*0.5}}
    ],
    memo:`2枚1組で作ると使いやすいです（同じ型紙で2セット）`};
  }
};

/* ---- アイマスク ---- */
PATTERNS.eyemask={
  mode:"small",
  name:"アイマスク",
  note:"目もとをやさしく覆うアイマスク。表布・裏布のあいだに薄いキルト芯を挟むと遮光性が上がります。裏布はシルクやガーゼなど肌ざわりのよい生地がおすすめ。両端にゴムを挟んで縫います。",
  params:[
    {key:"width", label:"横幅",         unit:"cm",min:14,max:24, step:0.5,val:19},
    {key:"height",label:"縦（高さ）",   unit:"cm",min:7, max:12, step:0.5,val:9},
    {key:"nose",  label:"鼻のくぼみ",   unit:"cm",min:0, max:3,  step:0.1,val:1.2},
    {key:"elastic",label:"ゴム長さ",    unit:"cm",min:20,max:40, step:1,  val:28},
  ],
  presets:[
    {label:"子供",   vals:{width:16, height:8,  nose:1,   elastic:24}},
    {label:"標準",   vals:{width:19, height:9,  nose:1.2, elastic:28}},
    {label:"大きめ", vals:{width:21, height:10, nose:1.5, elastic:30}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.width), H=cm(p.height), NS=cm(p.nose);
    const cx=W/2;
    let fin=[{x:0,y:H*0.5}];
    // 上辺：ゆるいアーチ
    fin=fin.concat(quad({x:0,y:H*0.5},{x:cx*0.35,y:0},{x:cx,y:H*0.06},10));
    fin=fin.concat(quad({x:cx,y:H*0.06},{x:W-cx*0.35,y:0},{x:W,y:H*0.5},10));
    // 右端→下辺
    fin=fin.concat(quad({x:W,y:H*0.5},{x:W-cx*0.3,y:H},{x:cx+NS*1.6,y:H*0.92},10));
    // 鼻のくぼみ
    fin=fin.concat(quad({x:cx+NS*1.6,y:H*0.92},{x:cx,y:H*0.92-NS},{x:cx-NS*1.6,y:H*0.92},8));
    fin=fin.concat(quad({x:cx-NS*1.6,y:H*0.92},{x:cx*0.3,y:H},{x:0,y:H*0.5},10));
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"アイマスク本体", cutInfo:"表布・裏布 各1枚（＋薄手キルト芯1枚）／返し口を残して縫い表に返す",
      ...pc, foldX:null,
      grain:{x1:cx,y1:H*0.2,x2:cx,y2:H*0.8},
      notches:[{x:0,y:H*0.5},{x:W,y:H*0.5}], labelAt:{x:cx,y:H*0.5}
    }],
    memo:`両端の合印にゴム（${p.elastic}cm）を挟んで縫い込みます`};
  }
};

/* ---- ネックウォーマー ---- */
PATTERNS.neckwarmer={
  mode:"small",
  name:"ネックウォーマー",
  note:"首まわりをすっぽり覆う筒型のウォーマー。長辺を縫って輪にするだけの簡単な作り。フリースやニットなど伸びる生地が向きます。二重仕立てにすると暖かく、縫い目も隠れます。",
  params:[
    {key:"neck",  label:"首回り",   unit:"cm",min:28,max:60, step:1,  val:40},
    {key:"len",   label:"丈",       unit:"cm",min:14,max:35, step:1,  val:24},
    {key:"ease",  label:"ゆとり",   unit:"cm",min:2, max:20, step:1,  val:10},
  ],
  presets:[
    {label:"子供",   vals:{neck:32, len:18, ease:8}},
    {label:"大人S",  vals:{neck:38, len:22, ease:10}},
    {label:"大人",   vals:{neck:40, len:24, ease:10}},
    {label:"ゆったり",vals:{neck:44, len:28, ease:16}},
  ],
  toggles:[],
  gen(p,sa){
    const W=(cm(p.neck)+cm(p.ease))/2, H=cm(p.len);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"本体", cutInfo:"1枚（二つ折りにして短辺を縫い輪にする）／二重仕立ては2枚",
      ...pc, foldX:null,
      grain:{x1:W*0.5,y1:12,x2:W*0.5,y2:H-12},
      notches:[], labelAt:{x:W*0.5,y:H*0.5}
    }],
    memo:`仕上がり内周 約${(p.neck+p.ease)}cm ／ 伸びない生地のときはゆとりを多めに`};
  }
};

/* ---- マスクケース ---- */
PATTERNS.maskcase={
  mode:"small",
  name:"マスクケース",
  note:"外したマスクを一時的に入れておく二つ折りのケース。1枚の布を折って両脇を縫うだけ。内側に仕切りを付ければ「使用中」と「予備」を分けられます。洗える生地やラミネート地が便利。",
  params:[
    {key:"w",     label:"仕上がり幅",   unit:"cm",min:10,max:22, step:0.5,val:13},
    {key:"h",     label:"仕上がり高さ", unit:"cm",min:8, max:18, step:0.5,val:11},
    {key:"flap",  label:"フタの深さ",   unit:"cm",min:2, max:8,  step:0.5,val:4},
  ],
  presets:[
    {label:"子供",   vals:{w:11, h:9,  flap:3.5}},
    {label:"標準",   vals:{w:13, h:11, flap:4}},
    {label:"大きめ", vals:{w:15, h:12, flap:4.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), FP=cm(p.flap);
    const total=H*2+FP;
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:total},{x:0,y:total}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ケース本体", cutInfo:"表布・裏布 各1枚／中表に縫って表に返し、下から折り上げて両脇を縫う",
      ...pc, foldX:null, foldY:H,
      grain:{x1:W*0.5,y1:12,x2:W*0.5,y2:total-12},
      casingLines:[H*2], casingLabel:"フタの折り線",
      notches:[{x:0,y:H},{x:W,y:H}], labelAt:{x:W*0.5,y:total*0.55}
    }],
    memo:`下端から${p.h}cmで折り上げてポケットにし、上の${p.flap}cmをフタにします`};
  }
};

/* ---- エコバッグ ---- */
PATTERNS.ecobag={
  mode:"bag",
  name:"エコバッグ（折りたたみ）",
  note:"小さくたためる買い物バッグ。本体1枚（底わ）＋持ち手2本。薄手で丈夫なナイロンやシーチングが向きます。底にマチを付けるとお弁当や箱物も安定して入ります。",
  params:[
    {key:"w",      label:"仕上がり幅",     unit:"cm",min:20,max:50, step:1,  val:34},
    {key:"h",      label:"仕上がり高さ",   unit:"cm",min:20,max:55, step:1,  val:38},
    {key:"gusset", label:"マチ（底の奥行）",unit:"cm",min:0, max:20, step:1,  val:10},
    {key:"handle", label:"持ち手の長さ",   unit:"cm",min:30,max:70, step:1,  val:50},
    {key:"handlew",label:"持ち手の裁ち幅", unit:"cm",min:4, max:12, step:0.5,val:7},
    {key:"hem",    label:"袋口の折り返し", unit:"cm",min:1.5,max:5, step:0.5,val:3},
  ],
  presets:[
    {label:"小さめ", vals:{w:28, h:32, gusset:8,  handle:44, handlew:6, hem:2.5}},
    {label:"標準",   vals:{w:34, h:38, gusset:10, handle:50, handlew:7, hem:3}},
    {label:"たっぷり",vals:{w:40, h:44, gusset:14, handle:56, handlew:8, hem:3}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset), HEM=cm(p.hem);
    const halfW=W/2+G/2, halfH=H+G/2+HEM;
    const fin=[{x:0,y:0},{x:halfW,y:0},{x:halfW,y:halfH},{x:0,y:halfH}];
    const pc=pieceFrom(fin,(a,b)=>a.y===halfH&&b.y===halfH,sa);
    const HL=cm(p.handle), HW2=cm(p.handlew);
    const hf=[{x:0,y:0},{x:HL,y:0},{x:HL,y:HW2},{x:0,y:HW2}];
    const hpc=pieceFrom(hf,()=>false,sa);
    return {pieces:[
      {title:"袋本体", cutInfo:"底（下端）を「わ」に置いて 1枚 ／ 脇を縫い、底角を三角につまんでマチを縫う",
       ...pc, foldX:null, foldY:halfH,
       grain:{x1:halfW*0.5,y1:HEM+14,x2:halfW*0.5,y2:halfH-14},
       casingLines:[HEM], casingLabel:"袋口の折り返し",
       notches:[{x:halfW,y:halfH-G/2}], labelAt:{x:halfW*0.5,y:halfH*0.55}},
      {title:"持ち手", cutInfo:"2本（4つ折りにして縫う）", ...hpc, foldX:null,
       grain:{x1:HL*0.2,y1:HW2/2,x2:HL*0.8,y2:HW2/2},
       notches:[], labelAt:{x:HL*0.5,y:HW2*0.5}}
    ],
    memo:`マチ${p.gusset}cm ／ 底角の切り欠きは一辺 ${(p.gusset/2).toFixed(1)}cm が目安`};
  }
};

/* ---- バケツ型トートバッグ ---- */
PATTERNS.bucketbag={
  mode:"bag",
  name:"バケツ型トートバッグ",
  note:"丸い底で自立する円筒形のバッグ。底1枚（円）＋本体1枚＋持ち手2本。底が丸いので中身が見渡しやすく、荷物が偏りません。帆布など張りのある生地が向きます。",
  params:[
    {key:"dia",    label:"底の直径",       unit:"cm",min:14,max:34, step:0.5,val:22},
    {key:"h",      label:"バッグの高さ",   unit:"cm",min:15,max:40, step:1,  val:26},
    {key:"handle", label:"持ち手の長さ",   unit:"cm",min:25,max:65, step:1,  val:42},
    {key:"handlew",label:"持ち手の裁ち幅", unit:"cm",min:4, max:12, step:0.5,val:7},
    {key:"hem",    label:"袋口の折り返し", unit:"cm",min:1.5,max:5, step:0.5,val:3},
  ],
  presets:[
    {label:"小さめ", vals:{dia:18, h:22, handle:36, handlew:6, hem:2.5}},
    {label:"標準",   vals:{dia:22, h:26, handle:42, handlew:7, hem:3}},
    {label:"大きめ", vals:{dia:26, h:32, handle:50, handlew:8, hem:3}},
  ],
  toggles:[],
  gen(p,sa){
    const D=cm(p.dia), R=D/2, H=cm(p.h), HEM=cm(p.hem);
    // 底：円
    const base=[]; const n=48;
    for(let i=0;i<n;i++){const t=i/n*Math.PI*2; base.push({x:R+R*Math.cos(t), y:R+R*Math.sin(t)});}
    const bpc=pieceFrom(base,()=>false,sa);
    // 本体：円周 × 高さ の長方形（半分に分けて2枚裁ち）
    const circ=Math.PI*D, BW=circ/2, BH=H+HEM;
    const bf=[{x:0,y:0},{x:BW,y:0},{x:BW,y:BH},{x:0,y:BH}];
    const bodypc=pieceFrom(bf,()=>false,sa);
    const HL=cm(p.handle), HW2=cm(p.handlew);
    const hf=[{x:0,y:0},{x:HL,y:0},{x:HL,y:HW2},{x:0,y:HW2}];
    const hpc=pieceFrom(hf,()=>false,sa);
    return {pieces:[
      {title:"底（円）", cutInfo:"1枚（表布・裏布 各1枚）", ...bpc, foldX:null,
       grain:{x1:R,y1:R*0.35,x2:R,y2:R*1.65},
       notches:[{x:0,y:R},{x:D,y:R}], labelAt:{x:R,y:R}},
      {title:"本体（側面）", cutInfo:"2枚（前後）／両脇を縫って筒にし、底を縫い付ける",
       ...bodypc, foldX:null,
       grain:{x1:BW*0.5,y1:HEM+14,x2:BW*0.5,y2:BH-14},
       casingLines:[HEM], casingLabel:"袋口の折り返し",
       notches:[{x:BW/2,y:BH}], labelAt:{x:BW*0.5,y:BH*0.55}},
      {title:"持ち手", cutInfo:"2本（4つ折りにして縫う）", ...hpc, foldX:null,
       grain:{x1:HL*0.2,y1:HW2/2,x2:HL*0.8,y2:HW2/2},
       notches:[], labelAt:{x:HL*0.5,y:HW2*0.5}}
    ],
    memo:`底の円周 約${(circ/10).toFixed(0)}cm ＝ 本体2枚の下端の合計と合わせます`};
  }
};

/* ---- カーテン ---- */
PATTERNS.curtain={
  mode:"home",
  name:"カーテン",
  note:"窓のサイズから縫い代・ヒダ分を計算した無地カーテン。上端はカーテンテープを縫い付けてフックを通します。2枚（左右）に分けて作るのが一般的。遮光・レースどちらでも同じ作りです。サイズが大きいので、型紙は印刷せず案内シートの裁ち切り寸法どおり布に直接線を引いて裁つのがおすすめです。",
  params:[
    {key:"railw", label:"レール幅",       unit:"cm",min:60,max:300,step:1,  val:180},
    {key:"len",   label:"カーテン丈",     unit:"cm",min:60,max:250,step:1,  val:178},
    {key:"ratio", label:"ヒダ倍率",       unit:"倍",min:1.1,max:2.5,step:0.1,val:1.5},
    {key:"tophem",label:"上端の折り返し", unit:"cm",min:5, max:15, step:0.5,val:9},
    {key:"bothem",label:"裾の折り返し",   unit:"cm",min:5, max:20, step:0.5,val:10},
    {key:"sidehem",label:"脇の折り返し",  unit:"cm",min:1.5,max:5, step:0.5,val:3},
  ],
  presets:[
    {label:"小窓",       vals:{railw:90,  len:100, ratio:1.5, tophem:8,  bothem:8,  sidehem:2.5}},
    {label:"腰窓",       vals:{railw:150, len:130, ratio:1.5, tophem:9,  bothem:10, sidehem:3}},
    {label:"掃き出し窓", vals:{railw:180, len:178, ratio:1.5, tophem:9,  bothem:10, sidehem:3}},
    {label:"大きい窓",   vals:{railw:250, len:200, ratio:1.5, tophem:9,  bothem:12, sidehem:3}},
  ],
  toggles:[],
  gen(p,sa){
    const W=(cm(p.railw)*p.ratio)/2 + cm(p.sidehem)*2;  // 1枚分（左右2枚）
    const H=cm(p.len)+cm(p.tophem)+cm(p.bothem);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,0);   // 折り返し込みなので縫い代0
    return {pieces:[{
      title:"カーテン（1枚分）", cutInfo:"2枚（左右）／裁ち切りサイズ（折り返し込み・縫い代不要）",
      ...pc, foldX:null,
      grain:{x1:W*0.5,y1:cm(p.tophem)+20,x2:W*0.5,y2:H-cm(p.bothem)-20},
      casingLines:[cm(p.tophem), H-cm(p.bothem)], casingLabel:"上端／裾の折り返し",
      notches:[], labelAt:{x:W*0.5,y:H*0.5}
    }],
    memo:`裁ち切り 幅${(W/10).toFixed(0)}cm × 丈${(H/10).toFixed(0)}cm を2枚 ／ 必要な布 約${((H/10)*2/100).toFixed(1)}m（幅${(W/10).toFixed(0)}cm以上の生地）`};
  }
};

/* ---- 椅子クッション ---- */
PATTERNS.chairpad={
  mode:"home",
  name:"椅子クッション",
  note:"椅子の座面に敷く角の丸いクッション。表布・裏布のあいだにキルト芯や低反発シートを挟みます。後ろ2か所にひもを付けて背もたれに結ぶとずれません。",
  params:[
    {key:"w",     label:"座面の幅",     unit:"cm",min:28,max:50, step:0.5,val:40},
    {key:"d",     label:"座面の奥行",   unit:"cm",min:28,max:50, step:0.5,val:40},
    {key:"round", label:"角の丸み",     unit:"cm",min:0, max:10, step:0.5,val:5},
    {key:"tie",   label:"ひも長さ（1本）",unit:"cm",min:20,max:50, step:1, val:32},
    {key:"tiew",  label:"ひも裁ち幅",   unit:"cm",min:2.5,max:6, step:0.5,val:4},
  ],
  presets:[
    {label:"小さめ", vals:{w:34, d:34, round:4, tie:28, tiew:3.5}},
    {label:"標準",   vals:{w:40, d:40, round:5, tie:32, tiew:4}},
    {label:"大きめ", vals:{w:45, d:44, round:6, tie:36, tiew:4}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), D=cm(p.d), R=clampR(cm(p.round),W,D);
    let fin=[];
    if(R>0){
      fin.push({x:R,y:0},{x:W-R,y:0});
      fin=fin.concat(quad({x:W-R,y:0},{x:W,y:0},{x:W,y:R},8));
      fin.push({x:W,y:D-R});
      fin=fin.concat(quad({x:W,y:D-R},{x:W,y:D},{x:W-R,y:D},8));
      fin.push({x:R,y:D});
      fin=fin.concat(quad({x:R,y:D},{x:0,y:D},{x:0,y:D-R},8));
      fin.push({x:0,y:R});
      fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    }else{
      fin=[{x:0,y:0},{x:W,y:0},{x:W,y:D},{x:0,y:D}];
    }
    const pc=pieceFrom(fin,()=>false,sa);
    const TL=cm(p.tie), TW=cm(p.tiew);
    const tf=[{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}];
    const tpc=pieceFrom(tf,()=>false,sa);
    return {pieces:[
      {title:"クッション本体", cutInfo:"表布・裏布 各1枚（＋キルト芯1枚）／返し口を残して縫い表に返す",
       ...pc, foldX:null,
       grain:{x1:W*0.5,y1:R+10,x2:W*0.5,y2:D-R-10},
       notches:[{x:R,y:D},{x:W-R,y:D}], labelAt:{x:W*0.5,y:D*0.5}},
      {title:"結びひも", cutInfo:"2本（4つ折りにして縫い、後ろの合印に挟む）", ...tpc, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`ひもは後ろ側の合印（角の丸み終わり）に挟んで縫い込みます`};
  }
};


/* ============================================================
   追加パターン 2026-07 バッチ2
   ============================================================ */

/* ---- ポンチョ ---- */
PATTERNS.poncho={
  mode:"human",
  name:"ポンチョ",
  note:"頭からかぶるだけの羽織りもの。前後2枚を肩で縫い合わせるだけの簡単な作り。衿ぐりと裾はバイアステープかステッチで始末します。ウール・フリース・薄手のブランケット地などで。",
  params:[
    {key:"width", label:"身幅（肩まわり）",unit:"cm",min:60,max:130,step:1,  val:96},
    {key:"len",   label:"着丈",           unit:"cm",min:40,max:100,step:1,  val:66},
    {key:"neckw", label:"衿ぐり幅",       unit:"cm",min:16,max:30, step:0.5,val:22},
    {key:"neckd", label:"前衿ぐり深さ",   unit:"cm",min:5, max:18, step:0.5,val:9},
  ],
  presets:[
    {label:"子供",   vals:{width:70, len:46, neckw:19, neckd:7}},
    {label:"レディースM",vals:{width:96, len:66, neckw:22, neckd:9}},
    {label:"大判",   vals:{width:112,len:78, neckw:24, neckd:10}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=cm(p.width)/2, L=cm(p.len), NW=cm(p.neckw)/2;
    const mk=(back)=>{
      const ND=back?cm(2.5):cm(p.neckd);
      const neck=quad({x:0,y:ND},{x:NW*0.55,y:ND},{x:NW,y:0},12);
      let fin=[{x:0,y:ND}].concat(neck);
      fin.push({x:HW,y:0},{x:HW,y:L},{x:0,y:L});
      const pc=pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa);
      return {pc, neck:arcLen({x:0,y:ND},neck)};
    };
    const F=mk(false), B=mk(true);
    return {pieces:[
      {title:"前身頃", cutInfo:"中心を「わ」／前 1枚", ...F.pc, foldX:0,
       grain:{x1:HW*0.5,y1:20,x2:HW*0.5,y2:L-20},
       notches:[{x:HW,y:0}], labelAt:{x:HW*0.5,y:L*0.55}},
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...B.pc, foldX:0,
       grain:{x1:HW*0.5,y1:20,x2:HW*0.5,y2:L-20},
       notches:[{x:HW,y:0}], labelAt:{x:HW*0.5,y:L*0.55}}
    ],
    memo:`衿ぐり1周 約${((F.neck+B.neck)/10).toFixed(0)}cm（バイアステープの参考長）／ 肩線は左右それぞれ端から縫います`};
  }
};

/* ---- サロペット（オーバーオール） ---- */
PATTERNS.overall={
  mode:"human",
  name:"サロペット",
  note:"胸当てと肩ひもの付いたつなぎパンツ。胸当て＋パンツ＋肩ひもの3パーツ。パンツは前後同じ型紙で、中心（股ぐり）同士を縫ってから脇と股下を縫います。デニムやリネンが向きます。",
  params:[
    {key:"hip",    label:"ヒップ",             unit:"cm",min:60,max:130,step:1,  val:94},
    {key:"rise",   label:"股上（ウエスト〜股ぐり）",unit:"cm",min:20,max:42,step:1,val:30},
    {key:"inseam", label:"股下（股〜裾）",      unit:"cm",min:20,max:80, step:1,  val:62},
    {key:"bibw",   label:"胸当て幅",            unit:"cm",min:18,max:36, step:1,  val:26},
    {key:"bibh",   label:"胸当て丈",            unit:"cm",min:14,max:32, step:1,  val:22},
    {key:"strap",  label:"肩ひも長さ",          unit:"cm",min:50,max:100,step:1,  val:70},
    {key:"strapw", label:"肩ひも幅",            unit:"cm",min:3, max:7,  step:0.5,val:4},
    {key:"ease",   label:"ゆとり（総量）",      unit:"cm",min:8, max:32, step:1,  val:18},
  ],
  presets:[
    {label:"S",  vals:{hip:86, rise:28, inseam:58, bibw:24, bibh:20, strap:66, strapw:4, ease:16}},
    {label:"M",  vals:{hip:94, rise:30, inseam:62, bibw:26, bibh:22, strap:70, strapw:4, ease:18}},
    {label:"L",  vals:{hip:102,rise:31, inseam:64, bibw:28, bibh:23, strap:74, strapw:4.5,ease:20}},
    {label:"子供",vals:{hip:64, rise:22, inseam:38, bibw:18, bibh:15, strap:52, strapw:3.5,ease:12}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.hip)+cm(p.ease))/4, CR=cm(p.rise), IL=cm(p.inseam), CF=cm(4);
    const H=CR+IL, hipX=HW+CF;
    let fin=[{x:0,y:0},{x:HW,y:0}];
    fin=fin.concat(quad({x:HW,y:0},{x:hipX,y:0},{x:hipX,y:CR},10));
    fin.push({x:hipX,y:H},{x:0,y:H});
    const ppc=pieceFrom(fin,()=>false,sa);
    // 胸当て（中心わ）
    const BW=cm(p.bibw)/2, BH=cm(p.bibh);
    const bf=[{x:0,y:0},{x:BW,y:0},{x:BW,y:BH},{x:0,y:BH}];
    const bpc=pieceFrom(bf,(a,b)=>a.x===0&&b.x===0,sa);
    const TL=cm(p.strap), TW=cm(p.strapw)*2;
    const tf=[{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}];
    const tpc=pieceFrom(tf,()=>false,sa);
    return {pieces:[
      {title:"パンツ（前後共通）", cutInfo:"前後それぞれ2枚（左右）計4枚／中心線・股ぐり同士を縫う",
       ...ppc, foldX:null,
       grain:{x1:HW*0.45,y1:CR*0.6,x2:HW*0.45,y2:H-24},
       notches:[{x:hipX,y:CR}], labelAt:{x:HW*0.45,y:H*0.6}},
      {title:"胸当て", cutInfo:"中心を「わ」／表布・裏布 各1枚（計2枚）", ...bpc, foldX:0,
       grain:{x1:BW*0.5,y1:10,x2:BW*0.5,y2:BH-10},
       notches:[{x:BW,y:0}], labelAt:{x:BW*0.5,y:BH*0.5}},
      {title:"肩ひも", cutInfo:"2本（二つ折りにして縫い、表に返す）", ...tpc, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`肩ひもは仕上がり幅${p.strapw}cm ／ 背中でクロスさせてボタンやバックルで留めます`};
  }
};

/* ---- ドルマンスリーブトップス ---- */
PATTERNS.dolman={
  mode:"human",
  name:"ドルマンスリーブトップス",
  note:"身頃と袖がひと続きになった、袖付けのいらないトップス。前後2枚を縫い合わせるだけなので初心者にもおすすめ。脇から袖下にかけてゆるやかにつながるシルエットです。とろみのあるニット地が向きます。",
  params:[
    {key:"bust",   label:"バスト",         unit:"cm",min:78,max:130,step:1,  val:96},
    {key:"len",    label:"着丈",           unit:"cm",min:45,max:85, step:1,  val:60},
    {key:"reach",  label:"袖先まで（中心から）",unit:"cm",min:30,max:80,step:1,val:52},
    {key:"cuff",   label:"袖口（裁ち幅）", unit:"cm",min:10,max:30, step:0.5,val:17},
    {key:"neckw",  label:"衿ぐり幅",       unit:"cm",min:15,max:26, step:0.5,val:20},
    {key:"armd",   label:"袖ぐり深さ",     unit:"cm",min:18,max:34, step:1,  val:26},
    {key:"ease",   label:"ゆとり（総量）", unit:"cm",min:6, max:30, step:1,  val:16},
  ],
  presets:[
    {label:"レディースS",vals:{bust:84, len:56, reach:48, cuff:16, neckw:19, armd:24, ease:14}},
    {label:"レディースM",vals:{bust:90, len:60, reach:52, cuff:17, neckw:20, armd:26, ease:16}},
    {label:"レディースL",vals:{bust:98, len:63, reach:55, cuff:18, neckw:21, armd:27, ease:18}},
    {label:"メンズM",    vals:{bust:104,len:68, reach:58, cuff:19, neckw:21, armd:28, ease:20}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const R=cm(p.reach), cuff=cm(p.cuff), ADy=cm(p.armd), slope=cm(5);
    const mk=(back)=>{
      const FD=cm(back?2.5:7);
      const neck=quad({x:0,y:FD},{x:NWh*0.55,y:FD},{x:NWh,y:0},10);
      let fin=[{x:0,y:FD}].concat(neck);
      fin.push({x:R,y:slope});                    // 肩〜袖先（上側）
      fin.push({x:R,y:slope+cuff});               // 袖口
      // 袖下→脇：内側にえぐるカーブ
      fin=fin.concat(quad({x:R,y:slope+cuff},{x:HW+(R-HW)*0.35,y:ADy*0.92},{x:HW,y:ADy},14));
      fin.push({x:HW,y:L},{x:0,y:L});
      const pc=pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa);
      return {pc, neck:arcLen({x:0,y:FD},neck)};
    };
    const F=mk(false), B=mk(true);
    return {pieces:[
      {title:"前身頃", cutInfo:"中心を「わ」／前 1枚", ...F.pc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+10,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.7}},
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...B.pc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+10,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.7}}
    ],
    memo:`衿ぐり1周 約${((F.neck+B.neck)/10).toFixed(0)}cm ／ 肩〜袖上と、袖下〜脇をそれぞれ一続きに縫います`};
  }
};

/* ---- キッズタンクトップ ---- */
PATTERNS.kidstank={
  mode:"kids",
  name:"キッズタンクトップ",
  note:"肩ひもが身頃と一続きになったタンクトップ。前後2枚だけのシンプルな作り。衿ぐり・袖ぐりはバイアステープかリブで始末します。ニット・天竺が向きます。",
  params:[
    {key:"chest", label:"胸まわり",       unit:"cm",min:46,max:80, step:1,  val:58},
    {key:"len",   label:"着丈",           unit:"cm",min:26,max:50, step:1,  val:36},
    {key:"strapw",label:"肩ひも幅",       unit:"cm",min:2, max:6,  step:0.5,val:3.5},
    {key:"strapd",label:"肩ひも間隔（片側）",unit:"cm",min:3,max:10,step:0.5,val:5},
    {key:"armd",  label:"袖ぐり深さ",     unit:"cm",min:10,max:22, step:0.5,val:15},
    {key:"ease",  label:"ゆとり（総量）", unit:"cm",min:2, max:16, step:1,  val:8},
  ],
  presets:[
    {label:"90cm", vals:{chest:50, len:30, strapw:3,   strapd:4,   armd:13, ease:8}},
    {label:"100cm",vals:{chest:53, len:33, strapw:3.5, strapd:4.5, armd:14, ease:8}},
    {label:"110cm",vals:{chest:56, len:35, strapw:3.5, strapd:5,   armd:15, ease:8}},
    {label:"120cm",vals:{chest:59, len:38, strapw:4,   strapd:5.5, armd:16, ease:8}},
    {label:"130cm",vals:{chest:63, len:41, strapw:4,   strapd:6,   armd:17, ease:10}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.chest)+cm(p.ease))/4, L=cm(p.len);
    const SI=cm(p.strapd), SW=cm(p.strapw), ADy=cm(p.armd);
    const mk=(back)=>{
      const ND=back?cm(2):cm(5);
      const neck=quad({x:0,y:ND},{x:SI*0.6,y:ND},{x:SI,y:0},10);
      const arm=quad({x:SI+SW,y:0},{x:SI+SW+(HW-SI-SW)*0.35,y:ADy*0.55},{x:HW,y:ADy},12);
      let fin=[{x:0,y:ND}].concat(neck);
      fin.push({x:SI+SW,y:0});
      fin=fin.concat(arm);
      fin.push({x:HW,y:L},{x:0,y:L});
      const pc=pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa);
      return {pc, neck:arcLen({x:0,y:ND},neck), arm:arcLen({x:SI+SW,y:0},arm)};
    };
    const F=mk(false), B=mk(true);
    return {pieces:[
      {title:"前身頃", cutInfo:"中心を「わ」／前 1枚", ...F.pc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+6,x2:HW*0.5,y2:L-12},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.45,y:L*0.65}},
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...B.pc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+6,x2:HW*0.5,y2:L-12},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.45,y:L*0.65}}
    ],
    memo:`衿ぐり1周 約${((F.neck+B.neck)/10).toFixed(0)}cm ／ 袖ぐり1周 約${((F.arm+B.arm)/10).toFixed(0)}cm（バイアステープの参考長）`};
  }
};

/* ---- キッズコート ---- */
PATTERNS.kidscoat={
  mode:"kids",
  name:"キッズコート",
  note:"前を打ち合わせてボタンで留めるAラインのコート。前身頃2枚＋後身頃1枚＋袖2枚＋衿。裾に向かって広がるので重ね着しても着やすい形です。ウール・キルティング地などで。",
  params:[
    {key:"chest",  label:"胸まわり",       unit:"cm",min:54,max:88, step:1,  val:68},
    {key:"len",    label:"着丈",           unit:"cm",min:34,max:70, step:1,  val:50},
    {key:"shoulder",label:"肩幅",          unit:"cm",min:24,max:42, step:1,  val:31},
    {key:"sleeve", label:"袖丈",           unit:"cm",min:22,max:52, step:1,  val:36},
    {key:"cuff",   label:"袖口（裁ち幅）", unit:"cm",min:11,max:24, step:0.5,val:15},
    {key:"neckw",  label:"衿ぐり幅",       unit:"cm",min:12,max:22, step:0.5,val:15},
    {key:"overlap",label:"打ち合わせ幅",   unit:"cm",min:2, max:8,  step:0.5,val:4},
    {key:"flare",  label:"裾フレア（脇に+）",unit:"cm",min:0,max:14, step:0.5,val:6},
    {key:"ease",   label:"ゆとり（総量）", unit:"cm",min:8, max:28, step:1,  val:16},
  ],
  presets:[
    {label:"100cm",vals:{chest:58, len:42, shoulder:27, sleeve:31, cuff:13, neckw:14, overlap:3.5, flare:5, ease:14}},
    {label:"110cm",vals:{chest:62, len:46, shoulder:29, sleeve:34, cuff:14, neckw:15, overlap:4,   flare:5, ease:16}},
    {label:"120cm",vals:{chest:66, len:50, shoulder:31, sleeve:36, cuff:15, neckw:15, overlap:4,   flare:6, ease:16}},
    {label:"130cm",vals:{chest:70, len:54, shoulder:33, sleeve:39, cuff:16, neckw:16, overlap:4.5, flare:7, ease:18}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.chest)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const SHx=cm(p.shoulder)/2+cm(1), slope=cm(3), ADy=cm(17), OV=cm(p.overlap), FL=cm(p.flare);
    const bNeck=quad({x:0,y:cm(2.2)},{x:NWh*0.5,y:cm(2.2)},{x:NWh,y:0},10);
    const bArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
    let bf=[{x:0,y:cm(2.2)}].concat(bNeck);
    bf.push({x:SHx,y:slope}); bf=bf.concat(bArm);
    bf.push({x:HW+FL,y:L},{x:0,y:L});
    const bpc=pieceFrom(bf,(a,b)=>a.x===0&&b.x===0,sa);
    const fNeck=quad({x:0,y:cm(6)},{x:NWh*0.5,y:cm(6)},{x:NWh,y:0},10);
    const fArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
    let ff=[{x:-OV,y:cm(6)}].concat(fNeck);
    ff.push({x:SHx,y:slope}); ff=ff.concat(fArm);
    ff.push({x:HW+FL,y:L},{x:-OV,y:L});
    const fpc=pieceFrom(ff,()=>false,sa);
    const armSeam=arcLen({x:SHx,y:slope},bArm)+arcLen({x:SHx,y:slope},fArm), capFull=armSeam, SL=cm(p.sleeve), cuff=cm(p.cuff), capH=cm(2.5), cx=capFull/2;
    let sf=[{x:0,y:capH}];
    sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sf=sf.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sf.push({x:(capFull+cuff)/2,y:SL},{x:(capFull-cuff)/2,y:SL});
    const spc=pieceFrom(sf,()=>false,sa);
    // 衿（スタンド）
    const colLen=arcLen({x:0,y:cm(2.2)},bNeck)*2+arcLen({x:0,y:cm(6)},fNeck)*2, colH=cm(5);
    const cf=[{x:0,y:0},{x:colLen/2,y:0},{x:colLen/2,y:colH},{x:0,y:colH}];
    const cpc=pieceFrom(cf,(a,b)=>a.x===0&&b.x===0,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...bpc, foldX:0,
       grain:{x1:HW*0.5,y1:slope+12,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"前身頃", cutInfo:"2枚（左右対称に裁断）", ...fpc, foldX:null,
       grain:{x1:HW*0.5,y1:slope+12,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.62}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+8,x2:cx,y2:SL-8},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.55}},
      {title:"衿（スタンド）", cutInfo:"中心を「わ」／表布・裏布 各1枚", ...cpc, foldX:0,
       grain:{x1:colLen*0.25,y1:6,x2:colLen*0.25,y2:colH-6},
       notches:[], labelAt:{x:colLen*0.25,y:colH*0.5}}
    ],
    memo:`前中心にボタン4〜5個 ／ 衿ぐり1周 約${(colLen/10).toFixed(0)}cm`};
  }
};

/* ---- お食事エプロン ---- */
PATTERNS.kidsbibapron={
  mode:"kids",
  name:"お食事エプロン",
  note:"食べこぼしを受けるポケット付きのエプロン。下端を折り上げて縫うだけでポケットになります。首まわりはマジックテープかスナップで留めます。ラミネート地やナイロンなら洗ってすぐ乾きます。",
  params:[
    {key:"w",      label:"身幅",           unit:"cm",min:20,max:40, step:0.5,val:28},
    {key:"len",    label:"着丈",           unit:"cm",min:22,max:45, step:0.5,val:32},
    {key:"pocket", label:"ポケットの深さ", unit:"cm",min:4, max:12, step:0.5,val:7},
    {key:"neckw",  label:"首くり幅",       unit:"cm",min:10,max:20, step:0.5,val:14},
    {key:"neckd",  label:"首くり深さ",     unit:"cm",min:2.5,max:8, step:0.5,val:4},
    {key:"tie",    label:"首ひも長さ",     unit:"cm",min:18,max:45, step:1,  val:28},
  ],
  presets:[
    {label:"0〜1歳",vals:{w:24, len:27, pocket:6, neckw:12, neckd:3.5, tie:24}},
    {label:"1〜2歳",vals:{w:28, len:32, pocket:7, neckw:14, neckd:4,   tie:28}},
    {label:"2〜3歳",vals:{w:31, len:36, pocket:8, neckw:15, neckd:4.5, tie:31}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=cm(p.w)/2, L=cm(p.len)+cm(p.pocket), NW=cm(p.neckw)/2, ND=cm(p.neckd);
    // 中心わ・上端に首くり、肩は外へ広がる
    let fin=[{x:0,y:ND}];
    fin=fin.concat(quad({x:0,y:ND},{x:NW*0.6,y:ND},{x:NW,y:0},10));
    fin.push({x:HW*0.62,y:0});
    fin=fin.concat(quad({x:HW*0.62,y:0},{x:HW,y:cm(3)},{x:HW,y:cm(9)},10));
    fin.push({x:HW,y:L},{x:0,y:L});
    const pc=pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa);
    const TL=cm(p.tie), TW=cm(3);
    const tf=[{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}];
    const tpc=pieceFrom(tf,()=>false,sa);
    return {pieces:[
      {title:"エプロン本体", cutInfo:"中心を「わ」／1枚（表布・裏布 各1枚にしても）",
       ...pc, foldX:0,
       grain:{x1:HW*0.5,y1:ND+14,x2:HW*0.5,y2:L-14},
       casingLines:[L-cm(p.pocket)], casingLabel:"ポケットの折り上げ線",
       notches:[{x:HW,y:L-cm(p.pocket)}], labelAt:{x:HW*0.5,y:L*0.45}},
      {title:"首ひも", cutInfo:"2本（4つ折りにして縫う）／片端に面ファスナー", ...tpc, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`下端から${p.pocket}cmを折り上げ、両脇を縫うとポケットになります`};
  }
};

/* ---- ベビーケープ ---- */
PATTERNS.babycape={
  mode:"baby",
  name:"ベビーケープ",
  note:"抱っこやベビーカーの上からさっと羽織らせるマント。円形に裁つので肩まわりがつっぱりません。首もとはボタンかスナップで留めます。フリースや二重ガーゼで。",
  params:[
    {key:"neck", label:"首回り",       unit:"cm",min:24,max:44, step:1,  val:32},
    {key:"len",  label:"丈（首から）", unit:"cm",min:25,max:60, step:1,  val:40},
    {key:"ease", label:"首まわりゆとり",unit:"cm",min:2, max:12, step:1,  val:6},
  ],
  presets:[
    {label:"新生児",vals:{neck:26, len:32, ease:5}},
    {label:"0〜1歳",vals:{neck:30, len:38, ease:6}},
    {label:"1〜2歳",vals:{neck:34, len:44, ease:7}},
  ],
  toggles:[],
  gen(p,sa){
    const C=cm(p.neck)+cm(p.ease);
    const r0=C/(2*Math.PI), r1=r0+cm(p.len);
    const n=28, A=Math.PI/2;                       // 1/4円（「わ」で2回折って裁つ）
    const fin=[];
    for(let i=0;i<=n;i++){const t=A*i/n; fin.push({x:r1*Math.sin(t), y:r1-r1*Math.cos(t)});}
    for(let i=n;i>=0;i--){const t=A*i/n; fin.push({x:r0*Math.sin(t), y:r1-r0*Math.cos(t)});}
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ケープ本体", cutInfo:"1/4円の型紙。布を四つ折りにして中心を合わせ 1枚裁つ（前中心で開く）",
      ...pc, foldX:null,
      grain:{x1:r1*0.35,y1:r1-r0*0.9,x2:r1*0.35,y2:r1-r1*0.15},
      notches:[{x:0,y:r1-r0}], labelAt:{x:r1*0.34,y:r1-(r0+r1)*0.45}
    }],
    memo:`首まわり 約${((r0*2*Math.PI)/10).toFixed(0)}cm ／ 裾まわり 約${((r1*2*Math.PI)/10).toFixed(0)}cm ／ 前中心を開いてスナップ留め`};
  }
};

/* ---- ベビーパンツ（おむつ対応） ---- */
PATTERNS.babypants={
  mode:"baby",
  name:"ベビーパンツ",
  note:"おむつがすっぽり入るゆったりした股上のパンツ。前後同じ型紙で、中心（股ぐり）同士を縫ってから脇と股下を縫います。ウエストと裾にゴムを通します。ニット・ダブルガーゼが向きます。",
  params:[
    {key:"hip",    label:"ヒップ",             unit:"cm",min:40,max:70, step:1,  val:52},
    {key:"rise",   label:"股上（ウエスト〜股ぐり）",unit:"cm",min:16,max:32,step:1,val:23},
    {key:"inseam", label:"股下（股〜裾）",      unit:"cm",min:8, max:34, step:1,  val:18},
    {key:"ease",   label:"ゆとり（総量）",      unit:"cm",min:6, max:24, step:1,  val:14},
    {key:"crotchF",label:"股ぐり延長",          unit:"cm",min:2, max:7,  step:0.5,val:3.5},
    {key:"casing", label:"ウエスト折り返し",    unit:"cm",min:2, max:5,  step:0.5,val:3},
    {key:"hemcas", label:"裾ゴム通し折り返し",  unit:"cm",min:0, max:4,  step:0.5,val:2},
  ],
  presets:[
    {label:"60(0-3M)", vals:{hip:44, rise:19, inseam:11, ease:12, crotchF:3,   casing:3, hemcas:2}},
    {label:"70(6-12M)",vals:{hip:48, rise:21, inseam:15, ease:14, crotchF:3,   casing:3, hemcas:2}},
    {label:"80(1-2歳)",vals:{hip:52, rise:23, inseam:18, ease:14, crotchF:3.5, casing:3, hemcas:2}},
    {label:"90(2-3歳)",vals:{hip:56, rise:24, inseam:22, ease:14, crotchF:3.5, casing:3, hemcas:2}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.hip)+cm(p.ease))/4, CR=cm(p.rise), IL=cm(p.inseam);
    const CAS=cm(p.casing), CF=cm(p.crotchF), HC=cm(p.hemcas);
    const H=CAS+CR+IL+HC, hipX=HW+CF;
    let fin=[{x:0,y:0},{x:HW,y:0},{x:HW,y:CAS}];
    fin=fin.concat(quad({x:HW,y:CAS},{x:hipX,y:CAS},{x:hipX,y:CAS+CR},8));
    fin.push({x:hipX*0.86,y:H},{x:0,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    const lines=HC>0?[CAS,H-HC]:[CAS];
    return {pieces:[{
      title:"前/後パンツ", cutInfo:"前後それぞれ2枚（左右）計4枚／中心線・股ぐり同士を縫う",
      ...pc, foldX:null,
      grain:{x1:HW*0.45,y1:CAS+CR/2,x2:HW*0.45,y2:H-16},
      casingLines:lines, casingLabel:"ゴム通し折り返し",
      notches:[{x:hipX,y:CAS+CR}], labelAt:{x:HW*0.45,y:CAS+(CR+IL)*0.6}
    }],
    memo:`ウエストゴムの目安 ${Math.round(cm(p.hip)*0.8/10)}cm ／ おむつ替えしやすいよう股上は多めに設定しています`};
  }
};

/* ---- アームカバー ---- */
PATTERNS.armcover={
  mode:"small",
  name:"アームカバー",
  note:"日よけや汚れ防止に使う筒状のカバー。長辺を縫って筒にし、上下にゴムを通すだけ。UVカット素材や接触冷感ニットで作ると夏に活躍します。",
  params:[
    {key:"upper", label:"上側まわり（二の腕）",unit:"cm",min:18,max:40,step:1,val:28},
    {key:"lower", label:"下側まわり（手首）",  unit:"cm",min:12,max:28,step:1,val:18},
    {key:"len",   label:"丈",                 unit:"cm",min:20,max:55,step:1,val:38},
    {key:"casing",label:"ゴム通し折り返し",   unit:"cm",min:1.5,max:4,step:0.5,val:2.5},
  ],
  presets:[
    {label:"子供", vals:{upper:22, lower:14, len:26, casing:2}},
    {label:"女性", vals:{upper:28, lower:18, len:38, casing:2.5}},
    {label:"男性", vals:{upper:32, lower:20, len:42, casing:2.5}},
  ],
  toggles:[],
  gen(p,sa){
    const UW=cm(p.upper), LW=cm(p.lower), L=cm(p.len), CAS=cm(p.casing);
    const H=L+CAS*2;
    const fin=[{x:0,y:0},{x:UW,y:0},{x:(UW+LW)/2,y:H},{x:(UW-LW)/2,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"アームカバー本体", cutInfo:"2枚（左右）／長辺を縫って筒にし、上下をゴム通しにする",
      ...pc, foldX:null,
      grain:{x1:UW*0.5,y1:CAS+10,x2:UW*0.5,y2:H-CAS-10},
      casingLines:[CAS,H-CAS], casingLabel:"ゴム通し折り返し",
      notches:[], labelAt:{x:UW*0.5,y:H*0.5}
    }],
    memo:`ゴムの目安：上 ${(p.upper*0.8).toFixed(0)}cm ／ 下 ${(p.lower*0.85).toFixed(0)}cm`};
  }
};

/* ---- キーケース ---- */
PATTERNS.keycase={
  mode:"small",
  name:"キーケース",
  note:"二つ折りにして金具を付ける小さなキーケース。表布・裏布を中表に縫って返し、中央で折るだけ。中央にキーホルダー金具を、端にスナップを付けて留めます。ハギレ活用にぴったり。",
  params:[
    {key:"w",     label:"仕上がり幅",   unit:"cm",min:5, max:10, step:0.5,val:7},
    {key:"h",     label:"仕上がり高さ", unit:"cm",min:6, max:14, step:0.5,val:9},
    {key:"tab",   label:"留めタブの出",unit:"cm",min:0, max:4,  step:0.5,val:1.5},
  ],
  presets:[
    {label:"小さめ",vals:{w:6,  h:8,  tab:1.5}},
    {label:"標準",  vals:{w:7,  h:9,  tab:1.5}},
    {label:"大きめ",vals:{w:8,  h:11, tab:2}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)*2+cm(p.tab), H=cm(p.h);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"キーケース本体", cutInfo:"表布・裏布 各1枚／中表に縫って返し、中央で二つ折り",
      ...pc, foldX:cm(p.w),
      grain:{x1:W*0.5,y1:8,x2:W*0.5,y2:H-8},
      notches:[{x:cm(p.w),y:0},{x:cm(p.w),y:H}], labelAt:{x:W*0.5,y:H*0.55}
    }],
    memo:`折り線（わ）にキーホルダー金具を付け、右端の${p.tab}cmの出にスナップを付けます`};
  }
};

/* ---- メガネケース ---- */
PATTERNS.glassescase={
  mode:"small",
  name:"メガネケース",
  note:"フタを折り返してスナップで留めるソフトケース。1枚の布を折って両脇を縫うだけ。内側にキルト芯やフェルトを挟むとレンズを守れます。",
  params:[
    {key:"w",    label:"仕上がり幅",   unit:"cm",min:6, max:12, step:0.5,val:8.5},
    {key:"h",    label:"仕上がり高さ", unit:"cm",min:12,max:20, step:0.5,val:16},
    {key:"flap", label:"フタの深さ",   unit:"cm",min:2, max:7,  step:0.5,val:4},
    {key:"round",label:"フタの丸み",   unit:"cm",min:0, max:5,  step:0.5,val:3},
  ],
  presets:[
    {label:"標準",   vals:{w:8.5, h:16, flap:4, round:3}},
    {label:"大きめ", vals:{w:9.5, h:18, flap:5, round:3.5}},
    {label:"サングラス",vals:{w:10.5,h:18, flap:5, round:4}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), FP=cm(p.flap), R=clampR(cm(p.round),W,FP*2);
    const total=H*2+FP;
    let fin=[{x:0,y:0},{x:W,y:0},{x:W,y:total-R}];
    if(R>0){
      fin=fin.concat(quad({x:W,y:total-R},{x:W,y:total},{x:W-R,y:total},8));
      fin.push({x:R,y:total});
      fin=fin.concat(quad({x:R,y:total},{x:0,y:total},{x:0,y:total-R},8));
    }else{ fin.push({x:W,y:total},{x:0,y:total}); }
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ケース本体", cutInfo:"表布・裏布 各1枚／中表に縫って返し、下から折り上げて両脇を縫う",
      ...pc, foldX:null, foldY:H,
      grain:{x1:W*0.5,y1:10,x2:W*0.5,y2:total-10},
      casingLines:[H*2], casingLabel:"フタの折り線",
      notches:[{x:0,y:H},{x:W,y:H}], labelAt:{x:W*0.5,y:total*0.45}
    }],
    memo:`下端から${p.h}cmで折り上げてポケットにし、上の${p.flap}cmをフタにしてスナップ留め`};
  }
};

/* ---- バケットハット ---- */
PATTERNS.sunhat={
  mode:"small",
  name:"バケットハット",
  note:"日よけになるつば付きの帽子。天井（円）＋サイド＋つばの3パーツ。つばは輪の形に裁ち、2枚を縫い合わせて表に返します。リバーシブルにすると2倍楽しめます。",
  params:[
    {key:"head",  label:"頭囲",       unit:"cm",min:44,max:64, step:0.5,val:57},
    {key:"crown", label:"クラウン深さ",unit:"cm",min:6, max:14, step:0.5,val:9},
    {key:"brim",  label:"つばの幅",   unit:"cm",min:3, max:10, step:0.5,val:6},
    {key:"ease",  label:"ゆとり",     unit:"cm",min:0, max:4,  step:0.5,val:1},
  ],
  presets:[
    {label:"子供",   vals:{head:50, crown:7.5, brim:5,  ease:1}},
    {label:"大人S",  vals:{head:55, crown:8.5, brim:5.5,ease:1}},
    {label:"大人",   vals:{head:57, crown:9,   brim:6,  ease:1}},
    {label:"大きめ", vals:{head:60, crown:9.5, brim:6.5,ease:1}},
  ],
  toggles:[],
  gen(p,sa){
    const C=cm(p.head)+cm(p.ease), r=C/(2*Math.PI), CH=cm(p.crown), BR=cm(p.brim);
    // 天井（円）
    const top=[]; const n=48;
    for(let i=0;i<n;i++){const t=i/n*Math.PI*2; top.push({x:r+r*Math.cos(t), y:r+r*Math.sin(t)});}
    const tpc=pieceFrom(top,()=>false,sa);
    // サイド（長方形・2枚に分割）
    const SW=C/2, sf=[{x:0,y:0},{x:SW,y:0},{x:SW,y:CH},{x:0,y:CH}];
    const spc=pieceFrom(sf,()=>false,sa);
    // つば（半ドーナツ）
    const R1=r+BR, bf=[];
    for(let i=0;i<=n/2;i++){const t=Math.PI*i/(n/2); bf.push({x:R1+R1*Math.cos(t), y:R1-R1*Math.sin(t)});}
    for(let i=n/2;i>=0;i--){const t=Math.PI*i/(n/2); bf.push({x:R1+r*Math.cos(t), y:R1-r*Math.sin(t)});}
    const bpc=pieceFrom(bf,()=>false,sa);
    return {pieces:[
      {title:"天井（クラウン）", cutInfo:"1枚（表布・裏布 各1枚）", ...tpc, foldX:null,
       grain:{x1:r,y1:r*0.4,x2:r,y2:r*1.6},
       notches:[{x:0,y:r},{x:r*2,y:r}], labelAt:{x:r,y:r}},
      {title:"サイド", cutInfo:"2枚（表布・裏布 各2枚）／脇を縫って輪にし、天井を付ける",
       ...spc, foldX:null,
       grain:{x1:SW*0.5,y1:8,x2:SW*0.5,y2:CH-8},
       notches:[{x:SW/2,y:0}], labelAt:{x:SW*0.5,y:CH*0.5}},
      {title:"つば（ブリム）", cutInfo:"2枚（表布・裏布 各2枚）／内側の弧をサイドの下端に付ける",
       ...bpc, foldX:null,
       grain:{x1:R1,y1:R1-r-6,x2:R1,y2:R1-BR*0.2},
       notches:[{x:R1,y:R1-R1}], labelAt:{x:R1,y:R1-(r+R1)*0.5}}
    ],
    memo:`頭まわり 約${(C/10).toFixed(0)}cm ／ 天井の円周＝サイドの上端の長さです`};
  }
};

/* ---- リュックサック ---- */
PATTERNS.backpack={
  mode:"bag",
  name:"リュックサック",
  note:"フラップをかぶせて留めるシンプルなリュック。本体（前後）＋マチ＋フラップ＋肩ひも。マチを別パーツにすることでしっかり自立します。帆布や厚手のコットンが向きます。",
  params:[
    {key:"w",      label:"幅",             unit:"cm",min:20,max:40, step:1,  val:28},
    {key:"h",      label:"高さ",           unit:"cm",min:24,max:48, step:1,  val:36},
    {key:"gusset", label:"マチ（奥行）",   unit:"cm",min:6, max:20, step:1,  val:12},
    {key:"flap",   label:"フラップ深さ",   unit:"cm",min:8, max:24, step:1,  val:16},
    {key:"strap",  label:"肩ひも長さ",     unit:"cm",min:50,max:100,step:1,  val:75},
    {key:"strapw", label:"肩ひも裁ち幅",   unit:"cm",min:6, max:16, step:0.5,val:9},
  ],
  presets:[
    {label:"子供",   vals:{w:24, h:30, gusset:10, flap:14, strap:62, strapw:8}},
    {label:"標準",   vals:{w:28, h:36, gusset:12, flap:16, strap:75, strapw:9}},
    {label:"大きめ", vals:{w:32, h:42, gusset:14, flap:18, strap:82, strapw:10}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset), FP=cm(p.flap);
    const bf=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const bpc=pieceFrom(bf,()=>false,sa);
    // マチ（両脇＋底が一続き）
    const GL=H*2+W, gf=[{x:0,y:0},{x:G,y:0},{x:G,y:GL},{x:0,y:GL}];
    const gpc=pieceFrom(gf,()=>false,sa);
    // フラップ（下端が丸い）
    let ff=[{x:0,y:0},{x:W,y:0},{x:W,y:FP-cm(3)}];
    ff=ff.concat(quad({x:W,y:FP-cm(3)},{x:W,y:FP},{x:W-cm(3),y:FP},8));
    ff.push({x:cm(3),y:FP});
    ff=ff.concat(quad({x:cm(3),y:FP},{x:0,y:FP},{x:0,y:FP-cm(3)},8));
    const fpc=pieceFrom(ff,()=>false,sa);
    const SL=cm(p.strap), SW=cm(p.strapw);
    const sf=[{x:0,y:0},{x:SL,y:0},{x:SL,y:SW},{x:0,y:SW}];
    const spc=pieceFrom(sf,()=>false,sa);
    return {pieces:[
      {title:"本体（前・後）", cutInfo:"2枚（表布・裏布 各2枚）", ...bpc, foldX:null,
       grain:{x1:W*0.5,y1:14,x2:W*0.5,y2:H-14},
       notches:[{x:0,y:H},{x:W,y:H}], labelAt:{x:W*0.5,y:H*0.5}},
      {title:"マチ（脇・底）", cutInfo:"1枚（表布・裏布 各1枚）／本体の脇と底に沿わせて縫う",
       ...gpc, foldX:null,
       grain:{x1:G*0.5,y1:20,x2:G*0.5,y2:GL-20},
       notches:[{x:G,y:H},{x:G,y:H+W}], labelAt:{x:G*0.5,y:GL*0.5}},
      {title:"フラップ", cutInfo:"表布・裏布 各1枚／中表に縫って返し、後ろ上端に付ける",
       ...fpc, foldX:null,
       grain:{x1:W*0.5,y1:10,x2:W*0.5,y2:FP-10},
       notches:[{x:W/2,y:FP}], labelAt:{x:W*0.5,y:FP*0.5}},
      {title:"肩ひも", cutInfo:"2本（4つ折りにして縫う）", ...spc, foldX:null,
       grain:{x1:SL*0.2,y1:SW/2,x2:SL*0.8,y2:SW/2},
       notches:[], labelAt:{x:SL*0.5,y:SW*0.5}}
    ],
    memo:`マチの長さ ${(GL/10).toFixed(0)}cm ＝ 本体の脇＋底＋脇の合計 ／ 合印を合わせて縫います`};
  }
};

/* ---- 丸底巾着 ---- */
PATTERNS.roundkinchaku={
  mode:"bag",
  name:"丸底巾着",
  note:"底が円形でころんと自立する巾着。底（円）＋本体の2パーツ。上部にひも通し口を作り、両側からひもを通すと開閉しやすくなります。お弁当袋やコスメポーチにも。",
  params:[
    {key:"dia",    label:"底の直径",       unit:"cm",min:8, max:26, step:0.5,val:15},
    {key:"h",      label:"袋の高さ",       unit:"cm",min:10,max:36, step:1,  val:20},
    {key:"casing", label:"ひも通し下がり", unit:"cm",min:2, max:8,  step:0.5,val:4},
  ],
  presets:[
    {label:"コップ袋",vals:{dia:11, h:16, casing:3.5}},
    {label:"標準",    vals:{dia:15, h:20, casing:4}},
    {label:"お弁当",  vals:{dia:18, h:22, casing:4.5}},
    {label:"大きめ",  vals:{dia:22, h:28, casing:5}},
  ],
  toggles:[],
  gen(p,sa){
    const D=cm(p.dia), R=D/2, H=cm(p.h), CAS=cm(p.casing);
    const base=[]; const n=44;
    for(let i=0;i<n;i++){const t=i/n*Math.PI*2; base.push({x:R+R*Math.cos(t), y:R+R*Math.sin(t)});}
    const bpc=pieceFrom(base,()=>false,sa);
    const circ=Math.PI*D, BW=circ/2, BH=H+CAS;
    const bf=[{x:0,y:0},{x:BW,y:0},{x:BW,y:BH},{x:0,y:BH}];
    const bodypc=pieceFrom(bf,()=>false,sa);
    return {pieces:[
      {title:"底（円）", cutInfo:"1枚（表布・裏布 各1枚）", ...bpc, foldX:null,
       grain:{x1:R,y1:R*0.35,x2:R,y2:R*1.65},
       notches:[{x:0,y:R},{x:D,y:R}], labelAt:{x:R,y:R}},
      {title:"本体（側面）", cutInfo:"2枚／両脇を縫って筒にし（ひも通し口を残す）、底を付ける",
       ...bodypc, foldX:null,
       grain:{x1:BW*0.5,y1:CAS+12,x2:BW*0.5,y2:BH-12},
       casingLines:[CAS], casingLabel:"ひも通し下がり",
       notches:[{x:BW/2,y:BH}], labelAt:{x:BW*0.5,y:BH*0.6}}
    ],
    memo:`底の円周 約${(circ/10).toFixed(0)}cm ＝ 本体2枚の下端の合計 ／ ひもは ${Math.round(circ/10)+15}cm を2本`};
  }
};

/* ---- ペットベッド ---- */
PATTERNS.petbed={
  mode:"pet",
  name:"ペットベッド",
  note:"底パーツのまわりに筒状のクッション（ふち）を付けた丸型ベッド。底1枚＋ふち1枚。ふちに綿を詰めると、あごを乗せられる縁になります。洗い替えに2枚作っておくと便利。",
  params:[
    {key:"dia",   label:"内側の直径",   unit:"cm",min:30,max:80, step:1,  val:48},
    {key:"bolst", label:"ふちの高さ",   unit:"cm",min:8, max:22, step:1,  val:13},
    {key:"bolstw",label:"ふちの太さ",   unit:"cm",min:6, max:20, step:1,  val:11},
  ],
  presets:[
    {label:"猫・小型犬",vals:{dia:38, bolst:11, bolstw:9}},
    {label:"中型犬",    vals:{dia:48, bolst:13, bolstw:11}},
    {label:"大型犬",    vals:{dia:62, bolst:16, bolstw:14}},
  ],
  toggles:[],
  gen(p,sa){
    const D=cm(p.dia), R=D/2, BH=cm(p.bolst), BW=cm(p.bolstw);
    const base=[]; const n=48;
    for(let i=0;i<n;i++){const t=i/n*Math.PI*2; base.push({x:R+R*Math.cos(t), y:R+R*Math.sin(t)});}
    const bpc=pieceFrom(base,()=>false,sa);
    // ふち：内周×（高さ×2＋太さ）の帯を2枚に分割
    const circ=Math.PI*D, W=circ/2, H=BH*2+BW;
    const rf=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const rpc=pieceFrom(rf,()=>false,sa);
    return {pieces:[
      {title:"底（円）", cutInfo:"2枚（表・裏）／間にキルト芯を挟む", ...bpc, foldX:null,
       grain:{x1:R,y1:R*0.35,x2:R,y2:R*1.65},
       notches:[{x:0,y:R},{x:D,y:R}], labelAt:{x:R,y:R}},
      {title:"ふち（クッション）", cutInfo:"2枚／短辺同士を縫って輪にし、長さ方向に二つ折りして綿を詰める",
       ...rpc, foldX:null,
       grain:{x1:W*0.5,y1:14,x2:W*0.5,y2:H-14},
       casingLines:[BH,BH+BW], casingLabel:"折り位置",
       notches:[{x:W/2,y:0}], labelAt:{x:W*0.5,y:H*0.5}}
    ],
    memo:`底の円周 約${(circ/10).toFixed(0)}cm ＝ ふち2枚の長さの合計 ／ 綿は${p.dia>50?"多め":"ほどよく"}詰めて形を整えます`};
  }
};

/* ---- ペットレインコート ---- */
PATTERNS.petcape={
  mode:"pet",
  name:"ペットレインコート",
  note:"背中をすっぽり覆うケープ型のレインコート。首とお腹をベルトで留めるだけなので着せやすく、脚を通す必要がありません。撥水生地やラミネート地で作ります。",
  params:[
    {key:"back",   label:"背丈（首〜尾）", unit:"cm",min:20,max:70, step:1,  val:40},
    {key:"chest",  label:"胴回り",         unit:"cm",min:30,max:90, step:1,  val:52},
    {key:"neck",   label:"首回り",         unit:"cm",min:18,max:56, step:1,  val:32},
    {key:"ease",   label:"ゆとり",         unit:"cm",min:2, max:14, step:1,  val:6},
    {key:"belt",   label:"ベルト長さ",     unit:"cm",min:14,max:50, step:1,  val:26},
    {key:"beltw",  label:"ベルト裁ち幅",   unit:"cm",min:4, max:10, step:0.5,val:6},
  ],
  presets:[
    {label:"小型犬",vals:{back:30, chest:42, neck:26, ease:5, belt:20, beltw:5}},
    {label:"中型犬",vals:{back:40, chest:52, neck:32, ease:6, belt:26, beltw:6}},
    {label:"大型犬",vals:{back:55, chest:70, neck:42, ease:8, belt:34, beltw:7}},
  ],
  toggles:[],
  gen(p,sa){
    const L=cm(p.back), HW=(cm(p.chest)+cm(p.ease))/2/2, NW=cm(p.neck)/2/2;
    // 背中心を「わ」に。首側は狭く、胴で最大幅、尾側はやや絞る
    let fin=[{x:0,y:0},{x:NW,y:0}];
    fin=fin.concat(quad({x:NW,y:0},{x:HW*0.95,y:L*0.14},{x:HW,y:L*0.34},12));
    fin=fin.concat(quad({x:HW,y:L*0.34},{x:HW,y:L*0.80},{x:HW*0.72,y:L},12));
    fin.push({x:0,y:L});
    const pc=pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa);
    const BL=cm(p.belt), BW=cm(p.beltw);
    const bf=[{x:0,y:0},{x:BL,y:0},{x:BL,y:BW},{x:0,y:BW}];
    const bpc=pieceFrom(bf,()=>false,sa);
    return {pieces:[
      {title:"ケープ本体", cutInfo:"背中心を「わ」に置いて 1枚（表布・裏布 各1枚にしても）",
       ...pc, foldX:0,
       grain:{x1:HW*0.5,y1:L*0.2,x2:HW*0.5,y2:L*0.85},
       notches:[{x:HW,y:L*0.34}], labelAt:{x:HW*0.5,y:L*0.55}},
      {title:"留めベルト", cutInfo:"2本（首用・お腹用）／4つ折りにして縫い、面ファスナーを付ける",
       ...bpc, foldX:null,
       grain:{x1:BL*0.2,y1:BW/2,x2:BL*0.8,y2:BW/2},
       notches:[], labelAt:{x:BL*0.5,y:BW*0.5}}
    ],
    memo:`首用ベルトは上端から3cm、お腹用は合印（胴の最大幅）の位置に付けます`};
  }
};

/* ---- 首輪カバー ---- */
PATTERNS.petcollar={
  mode:"pet",
  name:"首輪カバー",
  note:"いま使っている首輪に通すだけで着せ替えできるカバー。筒状に縫って首輪を通します。季節の柄で何枚か作ると、お散歩やお出かけが楽しくなります。ハギレ活用にも。",
  params:[
    {key:"collar", label:"首輪の長さ",   unit:"cm",min:18,max:60, step:1,  val:34},
    {key:"cw",     label:"首輪の幅",     unit:"cm",min:1, max:4,  step:0.5,val:2},
    {key:"ease",   label:"通しのゆとり", unit:"cm",min:0.5,max:2, step:0.5,val:1},
  ],
  presets:[
    {label:"猫",    vals:{collar:22, cw:1,   ease:0.5}},
    {label:"小型犬",vals:{collar:28, cw:1.5, ease:1}},
    {label:"中型犬",vals:{collar:34, cw:2,   ease:1}},
    {label:"大型犬",vals:{collar:46, cw:2.5, ease:1}},
  ],
  toggles:[],
  gen(p,sa){
    const L=cm(p.collar), W=(cm(p.cw)+cm(p.ease))*2;
    const fin=[{x:0,y:0},{x:L,y:0},{x:L,y:W},{x:0,y:W}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"首輪カバー本体", cutInfo:"1枚／長辺を中表に縫って筒にし、表に返して首輪を通す",
      ...pc, foldX:null,
      grain:{x1:L*0.2,y1:W/2,x2:L*0.8,y2:W/2},
      notches:[], labelAt:{x:L*0.5,y:W*0.5}
    }],
    memo:`仕上がり幅 約${((cm(p.cw)+cm(p.ease))/10).toFixed(1)}cm ／ 首輪より少し長めに作ると通しやすいです`};
  }
};

/* ---- けりぐるみ（猫のおもちゃ） ---- */
PATTERNS.pettoy={
  mode:"pet",
  name:"けりぐるみ",
  note:"猫が抱えて後ろ足で蹴って遊ぶ細長いぬいぐるみ。1枚を二つ折りにして縫い、返して綿を詰めるだけ。中にまたたびや鈴を入れても。丈夫なコットンやデニムが向きます。",
  params:[
    {key:"len",   label:"全長",     unit:"cm",min:14,max:40, step:1,  val:24},
    {key:"w",     label:"太さ（幅）",unit:"cm",min:5, max:14, step:0.5,val:8},
    {key:"round", label:"先端の丸み",unit:"cm",min:0, max:6,  step:0.5,val:3},
  ],
  presets:[
    {label:"小さめ",vals:{len:18, w:6.5, round:2.5}},
    {label:"標準",  vals:{len:24, w:8,   round:3}},
    {label:"大きめ",vals:{len:30, w:10,  round:4}},
  ],
  toggles:[],
  gen(p,sa){
    const L=cm(p.len), W=cm(p.w), R=clampR(cm(p.round),L,W);
    let fin=[{x:R,y:0},{x:L-R,y:0}];
    fin=fin.concat(quad({x:L-R,y:0},{x:L,y:0},{x:L,y:R},8));
    fin.push({x:L,y:W-R});
    fin=fin.concat(quad({x:L,y:W-R},{x:L,y:W},{x:L-R,y:W},8));
    fin.push({x:R,y:W});
    fin=fin.concat(quad({x:R,y:W},{x:0,y:W},{x:0,y:W-R},8));
    fin.push({x:0,y:R});
    fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"けりぐるみ本体", cutInfo:"2枚／中表に縫い、返し口から表に返して綿を詰める",
      ...pc, foldX:null,
      grain:{x1:L*0.2,y1:W/2,x2:L*0.8,y2:W/2},
      notches:[], labelAt:{x:L*0.5,y:W*0.5}
    }],
    memo:`綿はしっかり詰めると蹴りごたえが出ます ／ 誤飲防止のため装飾は縫い付けを丈夫に`};
  }
};

/* ---- ウォールポケット ---- */
PATTERNS.wallpocket={
  mode:"home",
  name:"ウォールポケット",
  note:"壁やドアに掛けて小物を整理する布製ポケット。土台1枚＋ポケット布。ポケット布を等間隔に縫い分けると、区切られた収納になります。上部に棒を通すループを付けて吊るします。",
  params:[
    {key:"w",      label:"土台の幅",     unit:"cm",min:20,max:60, step:1,  val:34},
    {key:"h",      label:"土台の高さ",   unit:"cm",min:30,max:90, step:1,  val:56},
    {key:"pockh",  label:"ポケットの高さ",unit:"cm",min:8, max:24, step:0.5,val:14},
    {key:"rows",   label:"ポケットの段数",unit:"倍",min:1, max:4,  step:1,  val:3},
    {key:"loop",   label:"吊りループ幅", unit:"cm",min:3, max:10, step:0.5,val:6},
  ],
  presets:[
    {label:"小さめ",vals:{w:26, h:44, pockh:12, rows:3, loop:5}},
    {label:"標準",  vals:{w:34, h:56, pockh:14, rows:3, loop:6}},
    {label:"大きめ",vals:{w:42, h:72, pockh:16, rows:4, loop:7}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), PH=cm(p.pockh), rows=Math.round(p.rows);
    const bf=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const bpc=pieceFrom(bf,()=>false,sa);
    // ポケット布：高さは（ポケット高さ＋ゆとり分）
    const PPH=PH+cm(2);
    const pf=[{x:0,y:0},{x:W,y:0},{x:W,y:PPH},{x:0,y:PPH}];
    const ppc=pieceFrom(pf,()=>false,sa);
    const LW=cm(p.loop), LL=cm(12);
    const lf=[{x:0,y:0},{x:LL,y:0},{x:LL,y:LW},{x:0,y:LW}];
    const lpc=pieceFrom(lf,()=>false,sa);
    const lines=[]; for(let i=1;i<=rows;i++) lines.push(H*i/(rows+0.3));
    return {pieces:[
      {title:"土台", cutInfo:"表布・裏布 各1枚", ...bpc, foldX:null,
       grain:{x1:W*0.5,y1:16,x2:W*0.5,y2:H-16},
       casingLines:lines, casingLabel:"ポケットの取り付け位置",
       notches:[], labelAt:{x:W*0.5,y:H*0.5}},
      {title:"ポケット布", cutInfo:"必要な段数だけ（上端を三つ折りしてから土台に付ける）", ...ppc, foldX:null,
       grain:{x1:W*0.5,y1:10,x2:W*0.5,y2:PPH-10},
       notches:[{x:W/3,y:PPH},{x:W*2/3,y:PPH}], labelAt:{x:W*0.5,y:PPH*0.55}},
      {title:"吊りループ", cutInfo:"2本（4つ折りにして縫い、上端に付ける）", ...lpc, foldX:null,
       grain:{x1:LL*0.2,y1:LW/2,x2:LL*0.8,y2:LW/2},
       notches:[], labelAt:{x:LL*0.5,y:LW*0.5}}
    ],
    memo:`ポケット${rows}段 ／ 合印で縦に縫い分けると1段が3つの仕切りになります`};
  }
};

/* ---- ランドリーバッグ ---- */
PATTERNS.laundrybag={
  mode:"home",
  name:"ランドリーバッグ",
  note:"洗濯物をたっぷり入れられる大きな巾着。本体1枚（底わ）＋ひも。上部にひも通し口を作り、両側からひもを通すと口がしっかり閉まります。通気性のよい綿や麻で。",
  params:[
    {key:"w",      label:"仕上がり幅",     unit:"cm",min:28,max:60, step:1,  val:42},
    {key:"h",      label:"仕上がり高さ",   unit:"cm",min:35,max:85, step:1,  val:60},
    {key:"gusset", label:"マチ（底の奥行）",unit:"cm",min:0, max:24, step:1,  val:12},
    {key:"casing", label:"ひも通し下がり", unit:"cm",min:3, max:10, step:0.5,val:6},
  ],
  presets:[
    {label:"小さめ",  vals:{w:34, h:48, gusset:8,  casing:5}},
    {label:"標準",    vals:{w:42, h:60, gusset:12, casing:6}},
    {label:"たっぷり",vals:{w:50, h:72, gusset:16, casing:7}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset), CAS=cm(p.casing);
    const halfW=W/2+G/2, halfH=H+G/2;
    const fin=[{x:0,y:0},{x:halfW,y:0},{x:halfW,y:halfH},{x:0,y:halfH}];
    const pc=pieceFrom(fin,(a,b)=>a.y===halfH&&b.y===halfH,sa);
    return {pieces:[{
      title:"袋本体", cutInfo:"底（下端）を「わ」に置いて 1枚 ／ 脇を縫い（ひも通し口を残す）、底角にマチを縫う",
      ...pc, foldX:null, foldY:halfH,
      grain:{x1:halfW*0.5,y1:CAS+16,x2:halfW*0.5,y2:halfH-16},
      casingLines:[CAS], casingLabel:"ひも通し下がり",
      notches:[{x:halfW,y:halfH-G/2}], labelAt:{x:halfW*0.5,y:halfH*0.55}
    }],
    memo:`ひもは ${Math.round((W*2+G*2)/10)+20}cm を2本（両側から通す）／ マチ${p.gusset}cm`};
  }
};

/* ---- 椅子の背もたれカバー ---- */
PATTERNS.chaircover={
  mode:"home",
  name:"背もたれカバー",
  note:"椅子の背もたれにかぶせるカバー。前後2枚を縫い合わせるだけで、椅子の傷や汚れを防げます。裾にひもやゴムを付けるとずれにくくなります。椅子クッションと同じ生地で揃えても。",
  params:[
    {key:"w",     label:"背もたれの幅",   unit:"cm",min:24,max:55, step:0.5,val:40},
    {key:"h",     label:"かぶせる丈",     unit:"cm",min:16,max:55, step:0.5,val:32},
    {key:"thick", label:"背もたれの厚み", unit:"cm",min:1, max:8,  step:0.5,val:3},
    {key:"round", label:"上角の丸み",     unit:"cm",min:0, max:10, step:0.5,val:4},
  ],
  presets:[
    {label:"ダイニング",vals:{w:40, h:32, thick:3, round:4}},
    {label:"小さめ",    vals:{w:32, h:26, thick:2.5,round:3}},
    {label:"大きめ",    vals:{w:48, h:40, thick:4, round:6}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.thick), H=cm(p.h), R=clampR(cm(p.round),W,H*2);
    let fin=[{x:R,y:0},{x:W-R,y:0}];
    fin=fin.concat(quad({x:W-R,y:0},{x:W,y:0},{x:W,y:R},8));
    fin.push({x:W,y:H},{x:0,y:H},{x:0,y:R});
    fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"カバー（前・後共通）", cutInfo:"2枚（前・後）／上辺と両脇を縫い合わせ、裾を三つ折りする",
      ...pc, foldX:null,
      grain:{x1:W*0.5,y1:R+12,x2:W*0.5,y2:H-12},
      notches:[{x:0,y:H},{x:W,y:H}], labelAt:{x:W*0.5,y:H*0.55}
    }],
    memo:`厚み${p.thick}cm分を幅に加算しています ／ 裾にゴムかひもを通すとずれにくくなります`};
  }
};


/* ============================================================
   追加パターン 2026-07 バッチ3
   ============================================================ */

/* ---- パーカー ---- */
PATTERNS.hoodie={
  mode:"human",
  name:"パーカー",
  note:"フード付きのプルオーバーパーカー。前後身頃＋袖2枚＋フード2枚。裏毛・スウェット地が向きます。袖口と裾にリブを付けると本格的な仕上がりに。前ポケットを足すのもおすすめ。",
  params:[
    {key:"bust",    label:"バスト",         unit:"cm",min:80,max:135,step:1,  val:100},
    {key:"len",     label:"着丈",           unit:"cm",min:45,max:85, step:1,  val:64},
    {key:"shoulder",label:"肩幅",           unit:"cm",min:36,max:58, step:1,  val:46},
    {key:"sleeve",  label:"袖丈",           unit:"cm",min:40,max:70, step:1,  val:56},
    {key:"cuff",    label:"袖口（裁ち幅）", unit:"cm",min:12,max:26, step:0.5,val:17},
    {key:"neckw",   label:"衿ぐり幅",       unit:"cm",min:16,max:26, step:0.5,val:20},
    {key:"hoodh",   label:"フード高さ",     unit:"cm",min:30,max:45, step:1,  val:36},
    {key:"ease",    label:"ゆとり（総量）", unit:"cm",min:8, max:32, step:1,  val:18},
  ],
  presets:[
    {label:"レディースM",vals:{bust:88, len:60, shoulder:42, sleeve:53, cuff:16, neckw:19, hoodh:34, ease:16}},
    {label:"メンズM",    vals:{bust:98, len:66, shoulder:46, sleeve:57, cuff:17, neckw:20, hoodh:36, ease:18}},
    {label:"メンズL",    vals:{bust:106,len:70, shoulder:48, sleeve:59, cuff:18, neckw:21, hoodh:37, ease:20}},
    {label:"ゆったり",   vals:{bust:112,len:72, shoulder:52, sleeve:60, cuff:19, neckw:22, hoodh:38, ease:26}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const SHx=cm(p.shoulder)/2+cm(2), slope=cm(4), ADy=cm(24);
    const body=(back)=>{
      const FD=cm(back?2.5:7);
      const neck=quad({x:0,y:FD},{x:NWh*0.5,y:FD},{x:NWh,y:0},10);
      const arm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
      let fin=[{x:0,y:FD}].concat(neck);
      fin.push({x:SHx,y:slope}); fin=fin.concat(arm);
      fin.push({x:HW,y:L},{x:0,y:L});
      return {pc:pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa), arm:arcLen({x:SHx,y:slope},arm), neck:arcLen({x:0,y:FD},neck)};
    };
    const F=body(false), B=body(true);
    const armSeam=F.arm+B.arm, capFull=armSeam, SL=cm(p.sleeve), cuff=cm(p.cuff), capH=cm(3), cx=capFull/2;
    let sf=[{x:0,y:capH}];
    sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sf=sf.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sf.push({x:(capFull+cuff)/2,y:SL},{x:(capFull-cuff)/2,y:SL});
    const spc=pieceFrom(sf,()=>false,sa);
    const HH=cm(p.hoodh), HD=(F.neck+B.neck)*1.05;
    let hf=[{x:0,y:0},{x:HD,y:0}];
    hf=hf.concat(quad({x:HD,y:0},{x:HD*1.06,y:HH*0.62},{x:HD*0.72,y:HH},12));
    hf.push({x:0,y:HH});
    const hpc=pieceFrom(hf,()=>false,sa);
    return {pieces:[
      {title:"前身頃", cutInfo:"中心を「わ」／前 1枚", ...F.pc, foldX:0,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...B.pc, foldX:0,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+10,x2:cx,y2:SL-10},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.55}},
      {title:"フード", cutInfo:"2枚（中表に縫い合わせて衿ぐりに付ける）", ...hpc, foldX:null,
       grain:{x1:HD*0.45,y1:14,x2:HD*0.45,y2:HH-16},
       notches:[{x:0,y:HH}], labelAt:{x:HD*0.45,y:HH*0.55}}
    ],
    memo:`衿ぐり1周 約${((F.neck+B.neck)/10).toFixed(0)}cm ／ フード下端をこの長さに合わせて付けます`};
  }
};

/* ---- ラグランTシャツ ---- */
PATTERNS.raglantee={
  mode:"human",
  name:"ラグランTシャツ",
  note:"袖が衿ぐりまでつながるラグラン袖のTシャツ。前後身頃＋袖2枚。肩の縫い目が斜めに入り、袖付けが直線的で縫いやすいのが特徴です。身頃と袖を別色にすると定番のラグランに。ニット地向き。",
  params:[
    {key:"bust",   label:"バスト",         unit:"cm",min:78,max:130,step:1,  val:96},
    {key:"len",    label:"着丈",           unit:"cm",min:45,max:80, step:1,  val:62},
    {key:"sleeve", label:"袖丈",           unit:"cm",min:10,max:62, step:1,  val:20},
    {key:"cuff",   label:"袖口（裁ち幅）", unit:"cm",min:14,max:34, step:0.5,val:22},
    {key:"neckw",  label:"衿ぐり幅",       unit:"cm",min:15,max:26, step:0.5,val:19},
    {key:"ease",   label:"ゆとり（総量）", unit:"cm",min:6, max:28, step:1,  val:14},
  ],
  presets:[
    {label:"レディースS",vals:{bust:84, len:57, sleeve:18, cuff:20, neckw:18, ease:12}},
    {label:"レディースM",vals:{bust:90, len:60, sleeve:19, cuff:21, neckw:19, ease:14}},
    {label:"メンズM",    vals:{bust:98, len:66, sleeve:21, cuff:23, neckw:19, ease:16}},
    {label:"メンズL",    vals:{bust:106,len:70, sleeve:22, cuff:24, neckw:20, ease:18}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2, ADy=cm(20);
    const body=(back)=>{
      const FD=cm(back?2.5:6);
      const neck=quad({x:0,y:FD},{x:NWh*0.55,y:FD},{x:NWh,y:0},10);
      const rag=quad({x:NWh,y:0},{x:NWh+(HW-NWh)*0.5,y:ADy*0.30},{x:HW,y:ADy},14);
      let fin=[{x:0,y:FD}].concat(neck);
      fin=fin.concat(rag);
      fin.push({x:HW,y:L},{x:0,y:L});
      return {pc:pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa), rag:arcLen({x:NWh,y:0},rag), neck:arcLen({x:0,y:FD},neck)};
    };
    const F=body(false), B=body(true);
    const SL=cm(p.sleeve), cuff=cm(p.cuff);
    const SW=(cm(p.bust)+cm(p.ease))*0.36, half=SW/2;
    const drop=r=>Math.max(Math.sqrt(Math.max(r*r-half*half,0)), SW*0.18);
    const dF=drop(F.rag), dB=drop(B.rag);
    let sf=[{x:0,y:dF}];
    sf=sf.concat(quad({x:0,y:dF},{x:half*0.45,y:dF*0.30},{x:half,y:0},12));
    sf=sf.concat(quad({x:half,y:0},{x:half*1.55,y:dB*0.30},{x:SW,y:dB},12));
    sf.push({x:SW-(SW-cuff)/2,y:dB+SL},{x:(SW-cuff)/2,y:dF+SL});
    const spc=pieceFrom(sf,()=>false,sa);
    return {pieces:[
      {title:"前身頃", cutInfo:"中心を「わ」／前 1枚", ...F.pc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+10,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.45,y:L*0.62}},
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...B.pc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+10,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.45,y:L*0.62}},
      {title:"ラグラン袖", cutInfo:"2枚（左右）／前後のラグラン線に合わせて縫う", ...spc, foldX:null,
       grain:{x1:half,y1:Math.min(dF,dB)+16,x2:half,y2:dF+SL-16},
       notches:[{x:half,y:0}], labelAt:{x:half,y:(dF+SL)*0.62}}
    ],
    memo:`衿ぐり1周 約${((F.neck+B.neck)/10).toFixed(0)}cm（リブ・バインダーの参考長）／ 袖幅 約${(SW/10).toFixed(0)}cm`};
  }
};

/* ---- スウェットパンツ ---- */
PATTERNS.sweatpants={
  mode:"human",
  name:"スウェットパンツ",
  note:"裾をリブで絞ったジョガータイプのパンツ。前後同じ型紙で、中心（股ぐり）同士を縫ってから脇と股下を縫います。ウエストはゴム＋ひも、裾はリブを輪にして付けます。裏毛やスウェット地で。",
  params:[
    {key:"hip",    label:"ヒップ",             unit:"cm",min:60,max:130,step:1,  val:96},
    {key:"rise",   label:"股上（ウエスト〜股ぐり）",unit:"cm",min:22,max:42,step:1,val:30},
    {key:"inseam", label:"股下（股〜裾）",      unit:"cm",min:40,max:85, step:1,  val:64},
    {key:"hemw",   label:"裾幅（リブ付け位置）",unit:"cm",min:14,max:32, step:0.5,val:20},
    {key:"ribh",   label:"裾リブの高さ",        unit:"cm",min:0, max:12, step:0.5,val:6},
    {key:"ease",   label:"ゆとり（総量）",      unit:"cm",min:8, max:32, step:1,  val:18},
    {key:"crotchF",label:"股ぐり延長",          unit:"cm",min:2, max:8,  step:0.5,val:4.5},
    {key:"casing", label:"ウエスト折り返し",    unit:"cm",min:3, max:7,  step:0.5,val:4.5},
  ],
  presets:[
    {label:"レディースM",vals:{hip:90, rise:28, inseam:62, hemw:18, ribh:6, ease:16, crotchF:4,  casing:4.5}},
    {label:"メンズM",    vals:{hip:96, rise:30, inseam:66, hemw:20, ribh:6, ease:18, crotchF:4.5,casing:4.5}},
    {label:"メンズL",    vals:{hip:104,rise:31, inseam:68, hemw:21, ribh:7, ease:20, crotchF:5,  casing:5}},
    {label:"子供",       vals:{hip:66, rise:22, inseam:44, hemw:14, ribh:5, ease:12, crotchF:3,  casing:3.5}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.hip)+cm(p.ease))/4, CR=cm(p.rise), IL=cm(p.inseam);
    const CAS=cm(p.casing), CF=cm(p.crotchF), HEM=cm(p.hemw), RH=cm(p.ribh);
    const H=CAS+CR+IL, hipX=HW+CF;
    let fin=[{x:0,y:0},{x:HW,y:0},{x:HW,y:CAS}];
    fin=fin.concat(quad({x:HW,y:CAS},{x:hipX,y:CAS},{x:hipX,y:CAS+CR},8));
    fin.push({x:HEM,y:H},{x:0,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    const pieces=[{
      title:"前/後パンツ", cutInfo:"前後それぞれ2枚（左右）計4枚／中心線・股ぐり同士を縫う",
      ...pc, foldX:null,
      grain:{x1:HW*0.45,y1:CAS+CR/2,x2:HW*0.45,y2:H-24},
      casingLines:[CAS], casingLabel:"ウエスト折り返し",
      notches:[{x:hipX,y:CAS+CR}], labelAt:{x:HW*0.45,y:CAS+(CR+IL)*0.55}
    }];
    if(RH>0){
      const RW=HEM*0.86, rf=[{x:0,y:0},{x:RW,y:0},{x:RW,y:RH*2},{x:0,y:RH*2}];
      pieces.push({title:"裾リブ", cutInfo:"2枚（左右）／輪に縫って二つ折りにし、裾に付ける",
        ...pieceFrom(rf,()=>false,sa), foldX:null, foldY:RH,
        grain:{x1:RW*0.2,y1:RH,x2:RW*0.8,y2:RH},
        notches:[], labelAt:{x:RW*0.5,y:RH}});
    }
    return {pieces,
      memo:`ウエストゴムの目安 ${Math.round((cm(p.hip)+cm(p.ease))*0.85/10)}cm ／ 裾リブは裾幅の約85%の長さで輪にします`};
  }
};

/* ---- シャツワンピース ---- */
PATTERNS.shirtdress={
  mode:"human",
  name:"シャツワンピース",
  note:"前開きのシャツ型ワンピース。前身頃2枚＋後身頃1枚＋袖2枚＋衿。ウエストの切り替えがないストレートシルエットで、ベルトを締めても、羽織りとして着てもOK。リネンやコットンで。",
  params:[
    {key:"bust",    label:"バスト",         unit:"cm",min:80,max:130,step:1,  val:96},
    {key:"len",     label:"着丈",           unit:"cm",min:75,max:130,step:1,  val:105},
    {key:"shoulder",label:"肩幅",           unit:"cm",min:34,max:52, step:1,  val:40},
    {key:"sleeve",  label:"袖丈",           unit:"cm",min:10,max:60, step:1,  val:24},
    {key:"cuff",    label:"袖口（裁ち幅）", unit:"cm",min:14,max:34, step:0.5,val:24},
    {key:"neckw",   label:"衿ぐり幅",       unit:"cm",min:15,max:24, step:0.5,val:18},
    {key:"overlap", label:"打ち合わせ幅",   unit:"cm",min:2, max:8,  step:0.5,val:4},
    {key:"flare",   label:"裾フレア（脇に+）",unit:"cm",min:0,max:20, step:0.5,val:7},
    {key:"ease",    label:"ゆとり（総量）", unit:"cm",min:8, max:30, step:1,  val:16},
  ],
  presets:[
    {label:"S",  vals:{bust:84, len:98,  shoulder:38, sleeve:22, cuff:22, neckw:17, overlap:3.5, flare:6, ease:14}},
    {label:"M",  vals:{bust:90, len:105, shoulder:40, sleeve:24, cuff:24, neckw:18, overlap:4,   flare:7, ease:16}},
    {label:"L",  vals:{bust:98, len:110, shoulder:42, sleeve:25, cuff:25, neckw:19, overlap:4,   flare:8, ease:18}},
    {label:"ロング",vals:{bust:94,len:120,shoulder:41, sleeve:24, cuff:24, neckw:18, overlap:4,  flare:9, ease:18}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const SHx=cm(p.shoulder)/2, slope=cm(3.5), ADy=cm(22), OV=cm(p.overlap), FL=cm(p.flare);
    const bNeck=quad({x:0,y:cm(2.2)},{x:NWh*0.5,y:cm(2.2)},{x:NWh,y:0},10);
    const bArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
    let bf=[{x:0,y:cm(2.2)}].concat(bNeck);
    bf.push({x:SHx,y:slope}); bf=bf.concat(bArm);
    bf.push({x:HW+FL,y:L},{x:0,y:L});
    const bpc=pieceFrom(bf,(a,b)=>a.x===0&&b.x===0,sa);
    const fNeck=quad({x:0,y:cm(7)},{x:NWh*0.5,y:cm(7)},{x:NWh,y:0},10);
    const fArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
    let ff=[{x:-OV,y:cm(7)}].concat(fNeck);
    ff.push({x:SHx,y:slope}); ff=ff.concat(fArm);
    ff.push({x:HW+FL,y:L},{x:-OV,y:L});
    const fpc=pieceFrom(ff,()=>false,sa);
    const armSeam=arcLen({x:SHx,y:slope},bArm)+arcLen({x:SHx,y:slope},fArm), capFull=armSeam, SL=cm(p.sleeve), cuff=cm(p.cuff), capH=cm(3), cx=capFull/2;
    let sf=[{x:0,y:capH}];
    sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sf=sf.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sf.push({x:(capFull+cuff)/2,y:SL},{x:(capFull-cuff)/2,y:SL});
    const spc=pieceFrom(sf,()=>false,sa);
    const colLen=arcLen({x:0,y:cm(2.2)},bNeck)*2+arcLen({x:0,y:cm(7)},fNeck)*2, colH=cm(6);
    const cf=[{x:0,y:0},{x:colLen/2,y:0},{x:colLen/2,y:colH},{x:0,y:colH}];
    const cpc=pieceFrom(cf,(a,b)=>a.x===0&&b.x===0,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...bpc, foldX:0,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-18},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"前身頃", cutInfo:"2枚（左右対称に裁断）", ...fpc, foldX:null,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-18},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.62}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+8,x2:cx,y2:SL-8},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.55}},
      {title:"衿（スタンド）", cutInfo:"中心を「わ」／表布・裏布 各1枚", ...cpc, foldX:0,
       grain:{x1:colLen*0.25,y1:8,x2:colLen*0.25,y2:colH-8},
       notches:[], labelAt:{x:colLen*0.25,y:colH*0.5}}
    ],
    memo:`前中心にボタン7〜9個 ／ 衿ぐり1周 約${(colLen/10).toFixed(0)}cm`};
  }
};

/* ---- 甚平（パンツ） ---- */
PATTERNS.jinbeipants={
  mode:"kids",
  name:"甚平（パンツ）",
  note:"甚平の上衣と合わせる短パン。ゆったりした股上でウエストはゴム。「甚平（上衣）」と同じ生地で作るとセットになります。裾は折り返してステッチするだけ。楊柳やしじら織で涼しく。",
  params:[
    {key:"hip",    label:"ヒップ",             unit:"cm",min:46,max:86, step:1,  val:62},
    {key:"rise",   label:"股上（ウエスト〜股ぐり）",unit:"cm",min:16,max:34,step:1,val:23},
    {key:"inseam", label:"股下（股〜裾）",      unit:"cm",min:8, max:32, step:1,  val:16},
    {key:"ease",   label:"ゆとり（総量）",      unit:"cm",min:8, max:28, step:1,  val:16},
    {key:"crotchF",label:"股ぐり延長",          unit:"cm",min:2, max:7,  step:0.5,val:3.5},
    {key:"casing", label:"ウエスト折り返し",    unit:"cm",min:2, max:5,  step:0.5,val:3},
  ],
  presets:[
    {label:"90cm", vals:{hip:52, rise:19, inseam:12, ease:14, crotchF:3,   casing:3}},
    {label:"100cm",vals:{hip:56, rise:20, inseam:13, ease:14, crotchF:3,   casing:3}},
    {label:"110cm",vals:{hip:59, rise:21, inseam:14, ease:16, crotchF:3.5, casing:3}},
    {label:"120cm",vals:{hip:62, rise:23, inseam:16, ease:16, crotchF:3.5, casing:3}},
    {label:"130cm",vals:{hip:66, rise:24, inseam:18, ease:16, crotchF:4,   casing:3}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.hip)+cm(p.ease))/4, CR=cm(p.rise), IL=cm(p.inseam);
    const CAS=cm(p.casing), CF=cm(p.crotchF);
    const H=CAS+CR+IL, hipX=HW+CF;
    let fin=[{x:0,y:0},{x:HW,y:0},{x:HW,y:CAS}];
    fin=fin.concat(quad({x:HW,y:CAS},{x:hipX,y:CAS},{x:hipX,y:CAS+CR},8));
    fin.push({x:hipX,y:H},{x:0,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"前/後パンツ", cutInfo:"前後それぞれ2枚（左右）計4枚／中心線・股ぐり同士を縫う",
      ...pc, foldX:null,
      grain:{x1:HW*0.45,y1:CAS+CR/2,x2:HW*0.45,y2:H-14},
      casingLines:[CAS], casingLabel:"ウエスト折り返し",
      notches:[{x:hipX,y:CAS+CR}], labelAt:{x:HW*0.45,y:CAS+(CR+IL)*0.6}
    }],
    memo:`ウエストゴムの目安 ${Math.round(cm(p.hip)*0.82/10)}cm ／ 「甚平（上衣）」と同じサイズを選ぶとセットになります`};
  }
};

/* ---- キッズキュロット（子供） ---- */
PATTERNS.kidsculotte={
  mode:"kids",
  name:"キッズキュロット",
  note:"見た目はスカート、動きはパンツ。裾が広がるので、走っても遊んでもめくれる心配がありません。前後同じ型紙で、中心（股ぐり）同士を縫ってから脇と股下を縫います。ウエストはゴム。",
  params:[
    {key:"hip",    label:"ヒップ",             unit:"cm",min:46,max:86, step:1,  val:62},
    {key:"rise",   label:"股上（ウエスト〜股ぐり）",unit:"cm",min:16,max:34,step:1,val:23},
    {key:"inseam", label:"股下（股〜裾）",      unit:"cm",min:8, max:34, step:1,  val:16},
    {key:"flare",  label:"裾の広がり（片側に＋）",unit:"cm",min:3,max:20,step:0.5,val:8},
    {key:"ease",   label:"ゆとり（総量）",      unit:"cm",min:6, max:26, step:1,  val:14},
    {key:"crotchF",label:"股ぐり延長",          unit:"cm",min:2, max:8,  step:0.5,val:4},
    {key:"casing", label:"ウエスト折り返し",    unit:"cm",min:2, max:5,  step:0.5,val:3},
  ],
  presets:[
    {label:"90cm", vals:{hip:52, rise:19, inseam:11, flare:6,  ease:12, crotchF:3.5, casing:3}},
    {label:"100cm",vals:{hip:56, rise:20, inseam:13, flare:7,  ease:12, crotchF:3.5, casing:3}},
    {label:"110cm",vals:{hip:59, rise:21, inseam:14, flare:7,  ease:14, crotchF:4,   casing:3}},
    {label:"120cm",vals:{hip:62, rise:23, inseam:16, flare:8,  ease:14, crotchF:4,   casing:3}},
    {label:"130cm",vals:{hip:66, rise:24, inseam:18, flare:9,  ease:14, crotchF:4.5, casing:3}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.hip)+cm(p.ease))/4, CR=cm(p.rise), IL=cm(p.inseam);
    const CAS=cm(p.casing), CF=cm(p.crotchF), FL=cm(p.flare);
    const H=CAS+CR+IL, hipX=HW+CF;
    let fin=[{x:0,y:0},{x:HW,y:0},{x:HW,y:CAS}];
    fin=fin.concat(quad({x:HW,y:CAS},{x:hipX,y:CAS},{x:hipX,y:CAS+CR},8));
    fin.push({x:hipX+FL,y:H},{x:-FL*0.5,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"前/後パンツ", cutInfo:"前後それぞれ2枚（左右）計4枚／中心線・股ぐり同士を縫う",
      ...pc, foldX:null,
      grain:{x1:HW*0.45,y1:CAS+CR/2,x2:HW*0.45,y2:H-14},
      casingLines:[CAS], casingLabel:"ウエスト折り返し",
      notches:[{x:hipX,y:CAS+CR}], labelAt:{x:HW*0.45,y:CAS+(CR+IL)*0.6}
    }],
    memo:`裾まわり 約${(((hipX+FL)+(FL*0.5))*4/10).toFixed(0)}cm ／ ウエストゴムの目安 ${Math.round(cm(p.hip)*0.82/10)}cm`};
  }
};

/* ---- お昼寝ケット（ベビーブランケット） ---- */
PATTERNS.babyblanket={
  mode:"baby",
  name:"お昼寝ケット",
  note:"ベビーカーやお昼寝に使う小さめのブランケット。表布と裏布を中表に縫って返すだけ。ガーゼを重ねたり、周囲をバイアステープでくるんでも。名前を刺繍すると出産祝いにぴったりです。大判なので、角の丸みを0にすれば印刷せず寸法どおり直接裁つこともできます。",
  params:[
    {key:"w",     label:"幅",         unit:"cm",min:50,max:110,step:1,  val:80},
    {key:"h",     label:"長さ",       unit:"cm",min:50,max:130,step:1,  val:100},
    {key:"round", label:"角の丸み",   unit:"cm",min:0, max:12, step:0.5,val:5},
  ],
  presets:[
    {label:"ベビーカー",vals:{w:70, h:85,  round:5}},
    {label:"標準",      vals:{w:80, h:100, round:5}},
    {label:"大判",      vals:{w:95, h:120, round:6}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), R=clampR(cm(p.round),W,H);
    let fin=[];
    if(R>0){
      fin.push({x:R,y:0},{x:W-R,y:0});
      fin=fin.concat(quad({x:W-R,y:0},{x:W,y:0},{x:W,y:R},8));
      fin.push({x:W,y:H-R});
      fin=fin.concat(quad({x:W,y:H-R},{x:W,y:H},{x:W-R,y:H},8));
      fin.push({x:R,y:H});
      fin=fin.concat(quad({x:R,y:H},{x:0,y:H},{x:0,y:H-R},8));
      fin.push({x:0,y:R});
      fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    }else{ fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}]; }
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ブランケット本体", cutInfo:"表布・裏布 各1枚／中表に縫い、返し口から表に返してステッチ",
      ...pc, foldX:null,
      grain:{x1:W*0.5,y1:R+16,x2:W*0.5,y2:H-R-16},
      notches:[], labelAt:{x:W*0.5,y:H*0.5}
    }],
    memo:`仕上がり ${p.w}×${p.h}cm ／ バイアステープでくるむ場合は 約${Math.round((W+H)*2/10)}cm 必要です`};
  }
};

/* ---- にぎにぎ（布おもちゃ） ---- */
PATTERNS.babytoy={
  mode:"baby",
  name:"にぎにぎ",
  note:"赤ちゃんが握って遊ぶ布のおもちゃ。2枚を中表に縫って返し、綿と鈴を入れるだけ。輪にしたリボンを挟むとベビーカーに付けられます。誤飲防止のため、縫い目は返し縫いでしっかりと。",
  params:[
    {key:"size",  label:"直径",       unit:"cm",min:7, max:16, step:0.5,val:11},
    {key:"tab",   label:"リボンの出", unit:"cm",min:0, max:6,  step:0.5,val:3},
  ],
  presets:[
    {label:"小さめ",vals:{size:9,  tab:2.5}},
    {label:"標準",  vals:{size:11, tab:3}},
    {label:"大きめ",vals:{size:14, tab:3.5}},
  ],
  toggles:[],
  gen(p,sa){
    const R=cm(p.size)/2, TB=cm(p.tab);
    const fin=[]; const n=40;
    // 花びら風のゆるい波形（握りやすい形）
    for(let i=0;i<n;i++){
      const t=i/n*Math.PI*2;
      const rr=R*(1+0.10*Math.cos(t*5));
      fin.push({x:R+TB+rr*Math.cos(t), y:R+rr*Math.sin(t)});
    }
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"にぎにぎ本体", cutInfo:"2枚／中表に縫い、返し口から表に返して綿と鈴を入れる",
      ...pc, foldX:null,
      grain:{x1:R+TB,y1:R*0.35,x2:R+TB,y2:R*1.65},
      notches:[{x:Math.min(...fin.map(q=>q.x)),y:R}], labelAt:{x:R+TB,y:R}
    }],
    memo:`左側の合印にリボン（輪にして${p.tab}cm出す）を挟んで縫い込みます`};
  }
};

/* ---- ベレー帽 ---- */
PATTERNS.beret={
  mode:"small",
  name:"ベレー帽",
  note:"ふんわりまるいシルエットのベレー帽。天面（大きい円）＋底面（ドーナツ）＋見返しの3パーツ。天面のほうが大きいので、縫い合わせるとふっくら立体になります。ウールやコーデュロイで。",
  params:[
    {key:"head", label:"頭囲",       unit:"cm",min:44,max:62, step:0.5,val:56},
    {key:"puff", label:"ふくらみ",   unit:"cm",min:3, max:12, step:0.5,val:7},
    {key:"band", label:"見返し高さ", unit:"cm",min:2, max:6,  step:0.5,val:3.5},
    {key:"ease", label:"ゆとり",     unit:"cm",min:0, max:4,  step:0.5,val:1},
  ],
  presets:[
    {label:"子供",  vals:{head:50, puff:6,   band:3,   ease:1}},
    {label:"大人S", vals:{head:54, puff:6.5, band:3.5, ease:1}},
    {label:"大人",  vals:{head:56, puff:7,   band:3.5, ease:1}},
    {label:"大きめ",vals:{head:59, puff:8,   band:4,   ease:1}},
  ],
  toggles:[],
  gen(p,sa){
    const C=cm(p.head)+cm(p.ease), r=C/(2*Math.PI), R=r+cm(p.puff), BH=cm(p.band);
    const n=48;
    // 天面：大きい円
    const top=[];
    for(let i=0;i<n;i++){const t=i/n*Math.PI*2; top.push({x:R+R*Math.cos(t), y:R+R*Math.sin(t)});}
    const tpc=pieceFrom(top,()=>false,sa);
    // 底面：外径R・内径r のドーナツ（半分に分けて2枚裁ち）
    const bf=[];
    for(let i=0;i<=n/2;i++){const t=Math.PI*i/(n/2); bf.push({x:R+R*Math.cos(t), y:R-R*Math.sin(t)});}
    for(let i=n/2;i>=0;i--){const t=Math.PI*i/(n/2); bf.push({x:R+r*Math.cos(t), y:R-r*Math.sin(t)});}
    const bpc=pieceFrom(bf,()=>false,sa);
    // 見返し（頭まわりの帯）
    const SW=C/2, sf=[{x:0,y:0},{x:SW,y:0},{x:SW,y:BH*2},{x:0,y:BH*2}];
    const spc=pieceFrom(sf,()=>false,sa);
    return {pieces:[
      {title:"天面（トップ）", cutInfo:"1枚", ...tpc, foldX:null,
       grain:{x1:R,y1:R*0.35,x2:R,y2:R*1.65},
       notches:[{x:0,y:R},{x:R*2,y:R}], labelAt:{x:R,y:R}},
      {title:"底面（ドーナツ）", cutInfo:"2枚／短辺同士を縫って輪にし、外周を天面と縫い合わせる",
       ...bpc, foldX:null,
       grain:{x1:R,y1:R-r-8,x2:R,y2:R-cm(1)},
       notches:[{x:R,y:0}], labelAt:{x:R,y:R-(r+R)*0.5}},
      {title:"見返し（頭まわり）", cutInfo:"2枚／輪に縫って二つ折りにし、内周に付ける",
       ...spc, foldX:null, foldY:BH,
       grain:{x1:SW*0.2,y1:BH,x2:SW*0.8,y2:BH},
       notches:[], labelAt:{x:SW*0.5,y:BH}}
    ],
    memo:`頭まわり 約${(C/10).toFixed(0)}cm ／ 天面の円周（約${(2*Math.PI*R/10).toFixed(0)}cm）を底面の外周にいせ込みながら縫います`};
  }
};

/* ---- ヘアターバン ---- */
PATTERNS.hairturban={
  mode:"small",
  name:"ヘアターバン",
  note:"前中央でねじった立体感のあるターバン。本体2本を中央でクロスさせ、後ろはゴムでフィットさせます。伸びるニット地だと着脱がらく。ヘアバンドより華やかで、お風呂上がりにも便利。",
  params:[
    {key:"head",  label:"頭囲",       unit:"cm",min:44,max:62, step:0.5,val:56},
    {key:"width", label:"仕上がり幅", unit:"cm",min:4, max:12, step:0.5,val:8},
    {key:"elastic",label:"後ろゴム長さ",unit:"cm",min:6, max:20, step:0.5,val:11},
  ],
  presets:[
    {label:"子供",  vals:{head:50, width:6, elastic:9}},
    {label:"大人",  vals:{head:56, width:8, elastic:11}},
    {label:"太め",  vals:{head:56, width:11,elastic:11}},
  ],
  toggles:[],
  gen(p,sa){
    const C=cm(p.head), EL=cm(p.elastic), W=cm(p.width)*2;
    // ねじり分を含め、2本それぞれ（頭囲－ゴム）÷2 ＋ 重なり
    const L=(C-EL)/2+cm(6);
    const fin=[{x:0,y:0},{x:L,y:0},{x:L,y:W},{x:0,y:W}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ターバン本体", cutInfo:"2本／長さ方向に二つ折りして縫い、表に返す",
      ...pc, foldX:null, foldY:W/2,
      grain:{x1:L*0.2,y1:W/2,x2:L*0.8,y2:W/2},
      notches:[{x:L,y:0},{x:L,y:W}], labelAt:{x:L*0.5,y:W*0.5}
    }],
    memo:`仕上がり幅 ${p.width}cm ／ 2本を前中央でクロスさせ、後ろは${p.elastic}cmのゴムでつなぎます`};
  }
};

/* ---- ペットボトルホルダー ---- */
PATTERNS.bottleholder={
  mode:"small",
  name:"ペットボトルホルダー",
  note:"保冷剤シートを挟めば冷たさが長持ちする筒型ホルダー。底（円）＋本体＋ショルダーひも。裏地に保冷シートを使うと本格的。夏のお出かけや通園・通学に。",
  params:[
    {key:"dia",   label:"ボトルの直径",   unit:"cm",min:5, max:10, step:0.5,val:6.5},
    {key:"h",     label:"ボトルの高さ",   unit:"cm",min:12,max:26, step:0.5,val:19},
    {key:"strap", label:"ショルダーひも長さ",unit:"cm",min:40,max:110,step:1,  val:80},
    {key:"strapw",label:"ひもの裁ち幅",     unit:"cm",min:3, max:8,  step:0.5,val:5},
  ],
  presets:[
    {label:"500ml", vals:{dia:6.5, h:19, strap:80, strapw:5}},
    {label:"350ml", vals:{dia:6,   h:14, strap:70, strapw:4.5}},
    {label:"1L",    vals:{dia:8.5, h:24, strap:90, strapw:5.5}},
  ],
  toggles:[],
  gen(p,sa){
    const D=cm(p.dia)+cm(1), R=D/2, H=cm(p.h)+cm(1.5);
    const base=[]; const n=40;
    for(let i=0;i<n;i++){const t=i/n*Math.PI*2; base.push({x:R+R*Math.cos(t), y:R+R*Math.sin(t)});}
    const bpc=pieceFrom(base,()=>false,sa);
    const circ=Math.PI*D;
    const bf=[{x:0,y:0},{x:circ,y:0},{x:circ,y:H},{x:0,y:H}];
    const bodypc=pieceFrom(bf,()=>false,sa);
    const SL=cm(p.strap), SW=cm(p.strapw);
    const sf=[{x:0,y:0},{x:SL,y:0},{x:SL,y:SW},{x:0,y:SW}];
    const spc=pieceFrom(sf,()=>false,sa);
    return {pieces:[
      {title:"底（円）", cutInfo:"1枚（表布・裏布 各1枚）", ...bpc, foldX:null,
       grain:{x1:R,y1:R*0.35,x2:R,y2:R*1.65},
       notches:[{x:0,y:R},{x:D,y:R}], labelAt:{x:R,y:R}},
      {title:"本体（側面）", cutInfo:"1枚（表布・裏布 各1枚）／短辺を縫って筒にし、底を付ける",
       ...bodypc, foldX:null,
       grain:{x1:circ*0.5,y1:10,x2:circ*0.5,y2:H-10},
       notches:[{x:circ/2,y:H}], labelAt:{x:circ*0.5,y:H*0.55}},
      {title:"ショルダーひも", cutInfo:"1本（4つ折りにして縫い、両脇に付ける）", ...spc, foldX:null,
       grain:{x1:SL*0.2,y1:SW/2,x2:SL*0.8,y2:SW/2},
       notches:[], labelAt:{x:SL*0.5,y:SW*0.5}}
    ],
    memo:`ボトル直径＋1cmのゆとりで計算 ／ 底の円周 約${(circ/10).toFixed(0)}cm ＝ 本体の下端の長さ`};
  }
};

/* ---- ボディバッグ ---- */
PATTERNS.bodybag={
  mode:"bag",
  name:"ボディバッグ",
  note:"斜めがけで体に沿う小さめのバッグ。本体（前後）＋マチ＋ストラップ。ファスナー開閉で中身が落ちにくく、お出かけや旅行のサブバッグに。ナイロンや帆布が向きます。",
  params:[
    {key:"w",      label:"幅",           unit:"cm",min:16,max:34, step:1,  val:24},
    {key:"h",      label:"高さ",         unit:"cm",min:12,max:28, step:1,  val:18},
    {key:"gusset", label:"マチ（奥行）", unit:"cm",min:3, max:12, step:0.5,val:7},
    {key:"round",  label:"下角の丸み",   unit:"cm",min:0, max:8,  step:0.5,val:4},
    {key:"strap",  label:"ストラップ長さ",unit:"cm",min:70,max:150,step:1, val:110},
    {key:"strapw", label:"ストラップ幅（裁ち幅）",unit:"cm",min:4,max:10,step:0.5,val:6},
  ],
  presets:[
    {label:"小さめ",vals:{w:20, h:15, gusset:6, round:3, strap:100, strapw:5}},
    {label:"標準",  vals:{w:24, h:18, gusset:7, round:4, strap:110, strapw:6}},
    {label:"大きめ",vals:{w:28, h:22, gusset:9, round:5, strap:120, strapw:6.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset), R=clampR(cm(p.round),W,H*2);
    let fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H-R}];
    fin=fin.concat(quad({x:W,y:H-R},{x:W,y:H},{x:W-R,y:H},8));
    fin.push({x:R,y:H});
    fin=fin.concat(quad({x:R,y:H},{x:0,y:H},{x:0,y:H-R},8));
    const bpc=pieceFrom(fin,()=>false,sa);
    // マチ：脇＋底が一続き
    const GL=(H-R)*2+R*Math.PI+ (W-R*2);
    const gf=[{x:0,y:0},{x:G,y:0},{x:G,y:GL},{x:0,y:GL}];
    const gpc=pieceFrom(gf,()=>false,sa);
    const SL=cm(p.strap), SW=cm(p.strapw);
    const sf=[{x:0,y:0},{x:SL,y:0},{x:SL,y:SW},{x:0,y:SW}];
    const spc=pieceFrom(sf,()=>false,sa);
    return {pieces:[
      {title:"本体（前・後）", cutInfo:"2枚（表布・裏布 各2枚）／上端にファスナーを付ける",
       ...bpc, foldX:null,
       grain:{x1:W*0.5,y1:12,x2:W*0.5,y2:H-R-8},
       notches:[{x:0,y:H-R},{x:W,y:H-R}], labelAt:{x:W*0.5,y:H*0.5}},
      {title:"マチ（脇・底）", cutInfo:"1枚（表布・裏布 各1枚）／本体の脇と底に沿わせて縫う",
       ...gpc, foldX:null,
       grain:{x1:G*0.5,y1:16,x2:G*0.5,y2:GL-16},
       notches:[{x:G,y:H-R},{x:G,y:GL-(H-R)}], labelAt:{x:G*0.5,y:GL*0.5}},
      {title:"ストラップ", cutInfo:"1本（4つ折りにして縫い、アジャスターを通す）", ...spc, foldX:null,
       grain:{x1:SL*0.2,y1:SW/2,x2:SL*0.8,y2:SW/2},
       notches:[], labelAt:{x:SL*0.5,y:SW*0.5}}
    ],
    memo:`マチの長さ ${(GL/10).toFixed(0)}cm ＝ 本体の脇＋底の周囲 ／ 合印を合わせて縫います`};
  }
};

/* ---- バッグインバッグ ---- */
PATTERNS.baginbag={
  mode:"bag",
  name:"バッグインバッグ",
  note:"大きなバッグの中を仕切って整理する内袋。本体1枚（底わ）＋仕切り＋持ち手。仕切りを縫い分けるとポケットになり、バッグを替えるときは中身ごと移せます。しっかりした生地で。",
  params:[
    {key:"w",      label:"仕上がり幅",     unit:"cm",min:16,max:40, step:1,  val:26},
    {key:"h",      label:"仕上がり高さ",   unit:"cm",min:10,max:26, step:1,  val:16},
    {key:"gusset", label:"マチ（底の奥行）",unit:"cm",min:4, max:16, step:1,  val:9},
    {key:"pockh",  label:"仕切りの高さ",   unit:"cm",min:6, max:20, step:0.5,val:12},
    {key:"handle", label:"持ち手の長さ",   unit:"cm",min:12,max:30, step:1,  val:18},
  ],
  presets:[
    {label:"小さめ",vals:{w:22, h:13, gusset:7,  pockh:10, handle:16}},
    {label:"標準",  vals:{w:26, h:16, gusset:9,  pockh:12, handle:18}},
    {label:"大きめ",vals:{w:32, h:19, gusset:11, pockh:14, handle:20}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset), PH=cm(p.pockh);
    const halfW=W/2+G/2, halfH=H+G/2;
    const fin=[{x:0,y:0},{x:halfW,y:0},{x:halfW,y:halfH},{x:0,y:halfH}];
    const pc=pieceFrom(fin,(a,b)=>a.y===halfH&&b.y===halfH,sa);
    // 仕切り（ポケット布）
    const pf=[{x:0,y:0},{x:W,y:0},{x:W,y:PH},{x:0,y:PH}];
    const ppc=pieceFrom(pf,()=>false,sa);
    const HL=cm(p.handle), HW2=cm(5);
    const hf=[{x:0,y:0},{x:HL,y:0},{x:HL,y:HW2},{x:0,y:HW2}];
    const hpc=pieceFrom(hf,()=>false,sa);
    return {pieces:[
      {title:"袋本体", cutInfo:"底（下端）を「わ」に置いて 1枚 ／ 脇を縫い、底角を三角につまんでマチを縫う",
       ...pc, foldX:null, foldY:halfH,
       grain:{x1:halfW*0.5,y1:14,x2:halfW*0.5,y2:halfH-14},
       notches:[{x:halfW,y:halfH-G/2}], labelAt:{x:halfW*0.5,y:halfH*0.55}},
      {title:"仕切り（ポケット）", cutInfo:"1〜2枚／上端を三つ折りし、縦に縫い分けてポケットにする",
       ...ppc, foldX:null,
       grain:{x1:W*0.5,y1:8,x2:W*0.5,y2:PH-8},
       notches:[{x:W/3,y:PH},{x:W*2/3,y:PH}], labelAt:{x:W*0.5,y:PH*0.55}},
      {title:"持ち手", cutInfo:"2本（4つ折りにして縫う）", ...hpc, foldX:null,
       grain:{x1:HL*0.2,y1:HW2/2,x2:HL*0.8,y2:HW2/2},
       notches:[], labelAt:{x:HL*0.5,y:HW2*0.5}}
    ],
    memo:`マチ${p.gusset}cm ／ 仕切りの合印で縦に縫うと3つのポケットになります`};
  }
};

/* ---- ペットマット ---- */
PATTERNS.petmat={
  mode:"pet",
  name:"ペットマット",
  note:"ケージやお昼寝スペースに敷く薄手のマット。表布・裏布のあいだにキルト芯を挟み、格子にステッチを入れると中綿がよれません。洗い替えに数枚あると便利です。",
  params:[
    {key:"w",     label:"幅",       unit:"cm",min:30,max:90, step:1,  val:55},
    {key:"h",     label:"奥行",     unit:"cm",min:24,max:70, step:1,  val:40},
    {key:"round", label:"角の丸み", unit:"cm",min:0, max:12, step:0.5,val:5},
  ],
  presets:[
    {label:"猫・小型犬",vals:{w:45, h:33, round:4}},
    {label:"中型犬",    vals:{w:55, h:40, round:5}},
    {label:"大型犬",    vals:{w:75, h:55, round:7}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), R=clampR(cm(p.round),W,H);
    let fin=[];
    if(R>0){
      fin.push({x:R,y:0},{x:W-R,y:0});
      fin=fin.concat(quad({x:W-R,y:0},{x:W,y:0},{x:W,y:R},8));
      fin.push({x:W,y:H-R});
      fin=fin.concat(quad({x:W,y:H-R},{x:W,y:H},{x:W-R,y:H},8));
      fin.push({x:R,y:H});
      fin=fin.concat(quad({x:R,y:H},{x:0,y:H},{x:0,y:H-R},8));
      fin.push({x:0,y:R});
      fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    }else{ fin=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}]; }
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"マット本体", cutInfo:"表布・裏布 各1枚（＋キルト芯1枚）／返し口を残して縫い表に返す",
      ...pc, foldX:null,
      grain:{x1:W*0.5,y1:R+12,x2:W*0.5,y2:H-R-12},
      notches:[], labelAt:{x:W*0.5,y:H*0.5}
    }],
    memo:`仕上がり ${p.w}×${p.h}cm ／ 表から10cm間隔で格子ステッチを入れると中綿がずれません`};
  }
};

/* ---- お散歩ポーチ ---- */
PATTERNS.petpouch={
  mode:"pet",
  name:"お散歩ポーチ",
  note:"おやつ・エチケット袋・鍵などをまとめて持ち歩けるポーチ。本体（底わ）＋フラップ＋ベルト通し。ベルトやバッグに通して使えます。汚れても洗える生地がおすすめ。",
  params:[
    {key:"w",     label:"仕上がり幅",     unit:"cm",min:10,max:22, step:0.5,val:15},
    {key:"h",     label:"仕上がり高さ",   unit:"cm",min:8, max:20, step:0.5,val:13},
    {key:"gusset",label:"マチ（底の奥行）",unit:"cm",min:0, max:10, step:0.5,val:5},
    {key:"flap",  label:"フラップ高さ",   unit:"cm",min:4, max:12, step:0.5,val:7},
    {key:"loopw", label:"ベルト通し幅",   unit:"cm",min:3, max:8,  step:0.5,val:5},
  ],
  presets:[
    {label:"小さめ",vals:{w:12, h:10, gusset:4, flap:6, loopw:4}},
    {label:"標準",  vals:{w:15, h:13, gusset:5, flap:7, loopw:5}},
    {label:"大きめ",vals:{w:18, h:15, gusset:6, flap:8, loopw:6}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset), FP=cm(p.flap), LW=cm(p.loopw);
    const halfW=W/2+G/2, halfH=H+G/2;
    const fin=[{x:0,y:0},{x:halfW,y:0},{x:halfW,y:halfH},{x:0,y:halfH}];
    const pc=pieceFrom(fin,(a,b)=>a.y===halfH&&b.y===halfH,sa);
    let ff=[{x:0,y:0},{x:W,y:0},{x:W,y:FP-cm(2)}];
    ff=ff.concat(quad({x:W,y:FP-cm(2)},{x:W,y:FP},{x:W-cm(2),y:FP},8));
    ff.push({x:cm(2),y:FP});
    ff=ff.concat(quad({x:cm(2),y:FP},{x:0,y:FP},{x:0,y:FP-cm(2)},8));
    const fpc=pieceFrom(ff,()=>false,sa);
    const lf=[{x:0,y:0},{x:LW*2,y:0},{x:LW*2,y:H*0.7},{x:0,y:H*0.7}];
    const lpc=pieceFrom(lf,()=>false,sa);
    return {pieces:[
      {title:"ポーチ本体", cutInfo:"底（下端）を「わ」に置いて 1枚 ／ 脇を縫い、底角にマチを縫う",
       ...pc, foldX:null, foldY:halfH,
       grain:{x1:halfW*0.5,y1:10,x2:halfW*0.5,y2:halfH-10},
       notches:[{x:halfW,y:halfH-G/2}], labelAt:{x:halfW*0.5,y:halfH*0.55}},
      {title:"フラップ", cutInfo:"表布・裏布 各1枚／中表に縫って返し、後ろ上端に付ける",
       ...fpc, foldX:null,
       grain:{x1:W*0.5,y1:8,x2:W*0.5,y2:FP-8},
       notches:[{x:W/2,y:FP}], labelAt:{x:W*0.5,y:FP*0.5}},
      {title:"ベルト通し", cutInfo:"1本（4つ折りにして縫い、後ろに縫い付ける）", ...lpc, foldX:LW,
       grain:{x1:LW,y1:8,x2:LW,y2:H*0.7-8},
       notches:[], labelAt:{x:LW,y:H*0.35}}
    ],
    memo:`マチ${p.gusset}cm ／ ベルト通しは仕上がり幅${p.loopw}cm（お使いのベルト幅に合わせて調整）`};
  }
};

/* ---- 収納ボックスカバー ---- */
PATTERNS.boxcover={
  mode:"home",
  name:"収納ボックスカバー",
  note:"カラーボックスや収納ケースにかぶせる布カバー。天面1枚＋側面4枚を縫い合わせる、シンプルな箱型。入れ替えるだけで部屋の雰囲気が変わります。裾にゴムを通すとずれません。型紙はすべて直線なので、印刷せずに案内シートの寸法どおり布に直接線を引いて裁つのが手軽です。",
  params:[
    {key:"w",     label:"箱の幅",     unit:"cm",min:15,max:60, step:0.5,val:30},
    {key:"d",     label:"箱の奥行",   unit:"cm",min:15,max:60, step:0.5,val:30},
    {key:"h",     label:"かぶせる高さ",unit:"cm",min:8, max:45, step:0.5,val:24},
    {key:"ease",  label:"ゆとり",     unit:"cm",min:0, max:4,  step:0.5,val:1},
  ],
  presets:[
    {label:"小さめ",  vals:{w:22, d:22, h:18, ease:1}},
    {label:"標準",    vals:{w:30, d:30, h:24, ease:1}},
    {label:"カラーボックス",vals:{w:38, d:29, h:38, ease:1.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.ease), D=cm(p.d)+cm(p.ease), H=cm(p.h);
    const tf=[{x:0,y:0},{x:W,y:0},{x:W,y:D},{x:0,y:D}];
    const tpc=pieceFrom(tf,()=>false,sa);
    const s1=[{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}];
    const s1pc=pieceFrom(s1,()=>false,sa);
    const s2=[{x:0,y:0},{x:D,y:0},{x:D,y:H},{x:0,y:H}];
    const s2pc=pieceFrom(s2,()=>false,sa);
    return {pieces:[
      {title:"天面", cutInfo:"1枚", ...tpc, foldX:null,
       grain:{x1:W*0.5,y1:10,x2:W*0.5,y2:D-10},
       notches:[], labelAt:{x:W*0.5,y:D*0.5}},
      {title:"側面（前・後）", cutInfo:"2枚", ...s1pc, foldX:null,
       grain:{x1:W*0.5,y1:10,x2:W*0.5,y2:H-10},
       notches:[{x:W/2,y:0}], labelAt:{x:W*0.5,y:H*0.5}},
      {title:"側面（左・右）", cutInfo:"2枚", ...s2pc, foldX:null,
       grain:{x1:D*0.5,y1:10,x2:D*0.5,y2:H-10},
       notches:[{x:D/2,y:0}], labelAt:{x:D*0.5,y:H*0.5}}
    ],
    memo:`ゆとり${p.ease}cmを加算しています ／ 側面4枚を輪に縫ってから天面を付けます`};
  }
};

/* ---- ルームシューズ ---- */
PATTERNS.slipper={
  mode:"home",
  name:"ルームシューズ",
  note:"足を包むあたたかいルームシューズ。底2枚＋甲2枚。底に滑り止め生地を使うと安心です。キルト芯を挟むとふかふかに。来客用に何足か作っておくのもおすすめ。",
  params:[
    {key:"footlen",label:"足の長さ",     unit:"cm",min:18,max:29, step:0.5,val:24},
    {key:"footw",  label:"足の幅",       unit:"cm",min:7, max:12, step:0.5,val:9.5},
    {key:"vamp",   label:"甲の深さ",     unit:"cm",min:6, max:14, step:0.5,val:9},
  ],
  presets:[
    {label:"子供",  vals:{footlen:19, footw:8,   vamp:7}},
    {label:"女性",  vals:{footlen:24, footw:9.5, vamp:9}},
    {label:"男性",  vals:{footlen:27, footw:10.5,vamp:10}},
  ],
  toggles:[],
  gen(p,sa){
    const FL=cm(p.footlen)+cm(1), FW=cm(p.footw)+cm(0.5), VP=cm(p.vamp);
    // 底：かかとが細く、つま先が広い楕円
    const sole=[]; const n=44;
    for(let i=0;i<n;i++){
      const t=i/n*Math.PI*2;
      const taper=1-0.14*Math.cos(t);                 // つま先側をやや広く
      sole.push({x:FL/2+FL/2*Math.cos(t)*0.99, y:FW/2+FW/2*taper*Math.sin(t)});
    }
    const spc=pieceFrom(sole,()=>false,sa);
    // 甲：底の前半分をおおうドーム
    const vw=FW*Math.PI*0.55;
    let vf=[{x:0,y:VP}];
    vf=vf.concat(quad({x:0,y:VP},{x:vw*0.22,y:0},{x:vw*0.5,y:0},12));
    vf=vf.concat(quad({x:vw*0.5,y:0},{x:vw*0.78,y:0},{x:vw,y:VP},12));
    vf.push({x:vw*0.88,y:VP+FL*0.34},{x:vw*0.12,y:VP+FL*0.34});
    const vpc=pieceFrom(vf,()=>false,sa);
    return {pieces:[
      {title:"底（ソール）", cutInfo:"2枚（左右）／表布・裏布 各2枚（＋滑り止め布）", ...spc, foldX:null,
       grain:{x1:FL*0.5,y1:FW*0.25,x2:FL*0.5,y2:FW*0.75},
       notches:[{x:FL/2-FL/2*0.99,y:FW/2},{x:FL/2+FL/2*0.99,y:FW/2}], labelAt:{x:FL*0.5,y:FW*0.5}},
      {title:"甲（アッパー）", cutInfo:"2枚（左右）／表布・裏布 各2枚", ...vpc, foldX:null,
       grain:{x1:vw*0.5,y1:VP*0.6,x2:vw*0.5,y2:VP+FL*0.25},
       notches:[{x:vw*0.5,y:0}], labelAt:{x:vw*0.5,y:VP*0.85}}
    ],
    memo:`足の長さ＋1cmのゆとりで計算 ／ 底の周囲 約${Math.round(plen(sole.concat([sole[0]]))/10)}cm`};
  }
};


/* ============================================================
   追加パターン 2026-07 バッチ4（リクエストリスト対応）
   ============================================================ */

/* ---- シャツ ---- */
PATTERNS.shirt={
  mode:"human",
  name:"シャツ",
  note:"前立て付きの定番シャツ。前身頃2枚＋後身頃1枚＋袖2枚＋衿。裾は直線でもラウンドにしても。オックスやブロード、リネンなど張りのある生地が向きます。",
  params:[
    {key:"bust",    label:"バスト",         unit:"cm",min:80,max:132,step:1,  val:100},
    {key:"len",     label:"着丈",           unit:"cm",min:55,max:85, step:1,  val:68},
    {key:"shoulder",label:"肩幅",           unit:"cm",min:36,max:52, step:1,  val:44},
    {key:"sleeve",  label:"袖丈",           unit:"cm",min:12,max:64, step:1,  val:58},
    {key:"cuff",    label:"袖口（裁ち幅）", unit:"cm",min:14,max:32, step:0.5,val:23},
    {key:"neckw",   label:"衿ぐり幅",       unit:"cm",min:15,max:24, step:0.5,val:19},
    {key:"overlap", label:"打ち合わせ幅",   unit:"cm",min:2, max:7,  step:0.5,val:3.5},
    {key:"ease",    label:"ゆとり（総量）", unit:"cm",min:8, max:30, step:1,  val:18},
  ],
  presets:[
    {label:"レディースM",vals:{bust:88, len:62, shoulder:40, sleeve:54, cuff:21, neckw:18, overlap:3,   ease:16}},
    {label:"メンズM",    vals:{bust:98, len:70, shoulder:44, sleeve:58, cuff:23, neckw:19, overlap:3.5, ease:18}},
    {label:"メンズL",    vals:{bust:106,len:74, shoulder:47, sleeve:60, cuff:24, neckw:20, overlap:3.5, ease:20}},
    {label:"半袖",       vals:{bust:98, len:68, shoulder:44, sleeve:22, cuff:30, neckw:19, overlap:3.5, ease:18}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const SHx=cm(p.shoulder)/2, slope=cm(3.5), ADy=cm(23), OV=cm(p.overlap);
    const bNeck=quad({x:0,y:cm(2)},{x:NWh*0.5,y:cm(2)},{x:NWh,y:0},10);
    const bArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
    let bf=[{x:0,y:cm(2)}].concat(bNeck);
    bf.push({x:SHx,y:slope}); bf=bf.concat(bArm);
    bf.push({x:HW,y:L},{x:0,y:L});
    const bpc=pieceFrom(bf,(a,b)=>a.x===0&&b.x===0,sa);
    const fNeck=quad({x:0,y:cm(7)},{x:NWh*0.5,y:cm(7)},{x:NWh,y:0},10);
    const fArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
    let ff=[{x:-OV,y:cm(7)}].concat(fNeck);
    ff.push({x:SHx,y:slope}); ff=ff.concat(fArm);
    ff.push({x:HW,y:L},{x:-OV,y:L});
    const fpc=pieceFrom(ff,()=>false,sa);
    const armSeam=arcLen({x:SHx,y:slope},bArm)+arcLen({x:SHx,y:slope},fArm), capFull=armSeam, SL=cm(p.sleeve), cuff=cm(p.cuff), capH=cm(3.5), cx=capFull/2;
    let sf=[{x:0,y:capH}];
    sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sf=sf.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sf.push({x:(capFull+cuff)/2,y:SL},{x:(capFull-cuff)/2,y:SL});
    const spc=pieceFrom(sf,()=>false,sa);
    const colLen=arcLen({x:0,y:cm(2)},bNeck)*2+arcLen({x:0,y:cm(7)},fNeck)*2, colH=cm(7);
    const cf=[{x:0,y:0},{x:colLen/2,y:0},{x:colLen/2,y:colH},{x:0,y:colH}];
    const cpc=pieceFrom(cf,(a,b)=>a.x===0&&b.x===0,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...bpc, foldX:0,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"前身頃", cutInfo:"2枚（左右対称に裁断）", ...fpc, foldX:null,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.62}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+10,x2:cx,y2:SL-10},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.55}},
      {title:"衿（スタンド）", cutInfo:"中心を「わ」／表布・裏布 各1枚", ...cpc, foldX:0,
       grain:{x1:colLen*0.25,y1:8,x2:colLen*0.25,y2:colH-8},
       notches:[], labelAt:{x:colLen*0.25,y:colH*0.5}}
    ],
    memo:`前中心にボタン6〜7個 ／ 衿ぐり1周 約${(colLen/10).toFixed(0)}cm`};
  }
};

/* ---- 浴衣 ---- */
PATTERNS.yukata={
  mode:"human",
  name:"浴衣",
  note:"直線裁ちだけで作る和装。身頃2枚（肩で折り返す）＋袖2枚＋おくみ2枚＋衿1本。曲線がひとつもないので、和裁が初めてでも作れます。反物幅（約36cm）に合わせた寸法で計算します。綿や綿麻で。すべて長方形なので、型紙は印刷せず案内シートの寸法どおり布に直接線を引いて裁つのがおすすめです（着丈が長く印刷枚数が多くなるため）。",
  params:[
    {key:"height", label:"身長",           unit:"cm",min:100,max:185,step:1,  val:160},
    {key:"bust",   label:"バスト",         unit:"cm",min:60,max:120,step:1,  val:88},
    {key:"width",  label:"身幅（片身）",   unit:"cm",min:26,max:40, step:0.5,val:33},
    {key:"sleevew",label:"袖幅",           unit:"cm",min:26,max:38, step:0.5,val:33},
    {key:"sleevel",label:"袖丈",           unit:"cm",min:35,max:60, step:1,  val:49},
    {key:"okumi",  label:"おくみ幅",       unit:"cm",min:12,max:20, step:0.5,val:15},
    {key:"collarw",label:"衿幅（裁ち）",   unit:"cm",min:9, max:16, step:0.5,val:11},
  ],
  presets:[
    {label:"子供120",vals:{height:120,bust:62, width:26, sleevew:26, sleevel:36, okumi:12, collarw:9}},
    {label:"レディースM",vals:{height:160,bust:88, width:33, sleevew:33, sleevel:49, okumi:15, collarw:11}},
    {label:"レディースL",vals:{height:165,bust:96, width:35, sleevew:34, sleevel:49, okumi:15, collarw:11}},
    {label:"メンズM",   vals:{height:172,bust:96, width:35, sleevew:34, sleevel:49, okumi:16, collarw:12}},
  ],
  toggles:[],
  gen(p,sa){
    const L=cm(p.height)*0.99;                      // 着丈≒身長
    const BW=cm(p.width), SW=cm(p.sleevew), SL=cm(p.sleevel);
    const OK=cm(p.okumi), CW=cm(p.collarw);
    // 身頃：肩で折るので長さは着丈×2（上端が「わ」）
    const bf=[{x:0,y:0},{x:BW,y:0},{x:BW,y:L*2},{x:0,y:L*2}];
    const bpc=pieceFrom(bf,()=>false,sa);
    // 袖：袖山で折るので長さは袖丈×2
    const sf=[{x:0,y:0},{x:SW,y:0},{x:SW,y:SL*2},{x:0,y:SL*2}];
    const spc=pieceFrom(sf,()=>false,sa);
    // おくみ
    const of=[{x:0,y:0},{x:OK,y:0},{x:OK,y:L*0.78},{x:0,y:L*0.78}];
    const opc=pieceFrom(of,()=>false,sa);
    // 衿（長い帯・半分に分けて表示）
    const CL=L*1.15, cf=[{x:0,y:0},{x:CW,y:0},{x:CW,y:CL},{x:0,y:CL}];
    const cpc=pieceFrom(cf,()=>false,sa);
    return {pieces:[
      {title:"身頃", cutInfo:"2枚（左右）／上端の「わ」で肩を折り返す", ...bpc, foldX:null, foldY:L,
       grain:{x1:BW*0.5,y1:20,x2:BW*0.5,y2:L*2-20},
       notches:[{x:BW,y:L-cm(p.sleevew)*0.0}], labelAt:{x:BW*0.5,y:L*0.5}},
      {title:"袖", cutInfo:"2枚（左右）／上端の「わ」で袖山を折り返す", ...spc, foldX:null, foldY:SL,
       grain:{x1:SW*0.5,y1:16,x2:SW*0.5,y2:SL*2-16},
       notches:[], labelAt:{x:SW*0.5,y:SL*0.5}},
      {title:"おくみ", cutInfo:"2枚（左右）／前身頃の内側に縫い足す", ...opc, foldX:null,
       grain:{x1:OK*0.5,y1:16,x2:OK*0.5,y2:L*0.78-16},
       notches:[], labelAt:{x:OK*0.5,y:L*0.39}},
      {title:"衿", cutInfo:"1本（長さが足りなければ継ぐ）／二つ折りにして衿ぐりに付ける", ...cpc, foldX:CW/2,
       grain:{x1:CW*0.5,y1:20,x2:CW*0.5,y2:CL-20},
       notches:[], labelAt:{x:CW*0.5,y:CL*0.5}}
    ],
    memo:`着丈 約${(L/10).toFixed(0)}cm ／ すべて直線裁ち。反物（幅約36cm）なら約${Math.ceil((L*2+SL*2+L*0.78+CL)/10/100)}m が目安です`};
  }
};

/* ---- 作務衣（上衣） ---- */
PATTERNS.samue={
  mode:"human",
  name:"作務衣（上衣）",
  note:"作業着として生まれた和風の上衣。後身頃1枚＋前身頃2枚＋袖2枚＋ひも。脇のひもで留めるので着脱がらくです。パンツは「テーパードパンツ」や「甚平（パンツ）」と合わせるとセットに。綿や刺子織で。",
  params:[
    {key:"bust",    label:"バスト",         unit:"cm",min:82,max:128,step:1,  val:100},
    {key:"len",     label:"着丈",           unit:"cm",min:55,max:85, step:1,  val:70},
    {key:"shoulder",label:"肩幅",           unit:"cm",min:36,max:54, step:1,  val:44},
    {key:"sleeve",  label:"袖丈",           unit:"cm",min:20,max:56, step:1,  val:44},
    {key:"overlap", label:"前の打ち合わせ", unit:"cm",min:8, max:22, step:0.5,val:14},
    {key:"ease",    label:"ゆとり（総量）", unit:"cm",min:10,max:32, step:1,  val:20},
    {key:"tie",     label:"ひも長さ（1本）",unit:"cm",min:30,max:70, step:1,  val:46},
  ],
  presets:[
    {label:"レディースM",vals:{bust:88, len:64, shoulder:40, sleeve:42, overlap:12, ease:18, tie:42}},
    {label:"メンズM",    vals:{bust:98, len:70, shoulder:44, sleeve:44, overlap:14, ease:20, tie:46}},
    {label:"メンズL",    vals:{bust:106,len:74, shoulder:47, sleeve:46, overlap:15, ease:22, tie:50}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4, L=cm(p.len);
    const SHx=cm(p.shoulder)/2, slope=cm(2.5), ADy=cm(22), OV=cm(p.overlap), NWh=cm(8);
    let bf=[{x:0,y:cm(2)},{x:NWh,y:0},{x:SHx,y:slope},{x:HW,y:ADy},{x:HW,y:L},{x:0,y:L}];
    const bpc=pieceFrom(bf,(a,b)=>a.x===0&&b.x===0,sa);
    const fNeck=quad({x:-OV,y:L*0.40},{x:NWh*0.4,y:L*0.14},{x:NWh,y:0},12);
    let ff=[{x:-OV,y:L*0.40}].concat(fNeck);
    ff.push({x:SHx,y:slope},{x:HW,y:ADy},{x:HW,y:L},{x:-OV,y:L});
    const fpc=pieceFrom(ff,()=>false,sa);
    const SL=cm(p.sleeve), SWd=ADy*2;
    const sf=[{x:0,y:0},{x:SL,y:0},{x:SL,y:SWd},{x:0,y:SWd}];
    const spc=pieceFrom(sf,()=>false,sa);
    const TL=cm(p.tie), TW=cm(4);
    const tf=[{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}];
    const tpc=pieceFrom(tf,()=>false,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...bpc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+10,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"前身頃", cutInfo:"2枚（左右対称に裁断）", ...fpc, foldX:null,
       grain:{x1:HW*0.5,y1:ADy+10,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.66}},
      {title:"袖", cutInfo:"2枚（左右）／袖口を三つ折りにして身頃の袖ぐりに付ける", ...spc, foldX:null,
       grain:{x1:SL*0.5,y1:14,x2:SL*0.5,y2:SWd-14},
       notches:[{x:0,y:SWd/2}], labelAt:{x:SL*0.5,y:SWd*0.5}},
      {title:"結びひも", cutInfo:"4本（4つ折りにして縫う）", ...tpc, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`脇のひもは前後の脇上端に付けます ／ パンツは「テーパードパンツ」等と合わせてセットに`};
  }
};

/* ---- 割烹着 ---- */
PATTERNS.kappogi={
  mode:"human",
  name:"割烹着",
  note:"服の上からすっぽり着られる袖付きエプロン。前後身頃＋袖2枚＋ひも。背中で結ぶタイプで、袖口はゴムを通して汚れを防ぎます。台所仕事や掃除、園の給食当番にも。",
  params:[
    {key:"bust",   label:"バスト",         unit:"cm",min:60,max:130,step:1,  val:100},
    {key:"len",    label:"着丈",           unit:"cm",min:45,max:100,step:1,  val:80},
    {key:"sleeve", label:"袖丈",           unit:"cm",min:25,max:55, step:1,  val:44},
    {key:"cuff",   label:"袖口（裁ち幅）", unit:"cm",min:14,max:30, step:0.5,val:20},
    {key:"neckw",  label:"衿ぐり幅",       unit:"cm",min:16,max:28, step:0.5,val:22},
    {key:"ease",   label:"ゆとり（総量）", unit:"cm",min:14,max:40, step:1,  val:26},
    {key:"tie",    label:"背中ひも長さ",   unit:"cm",min:40,max:90, step:1,  val:62},
  ],
  presets:[
    {label:"レディースM",vals:{bust:88, len:78, sleeve:42, cuff:19, neckw:21, ease:24, tie:60}},
    {label:"レディースL",vals:{bust:96, len:82, sleeve:44, cuff:20, neckw:22, ease:26, tie:64}},
    {label:"子供",       vals:{bust:64, len:52, sleeve:32, cuff:15, neckw:18, ease:18, tie:44}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const SHx=HW*0.72, slope=cm(3), ADy=cm(24);
    const mk=(back)=>{
      const FD=cm(back?9:6);
      const neck=quad({x:0,y:FD},{x:NWh*0.55,y:FD},{x:NWh,y:0},10);
      const arm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
      let fin=[{x:0,y:FD}].concat(neck);
      fin.push({x:SHx,y:slope}); fin=fin.concat(arm);
      fin.push({x:HW,y:L},{x:0,y:L});
      return {pc:pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa), arm:arcLen({x:SHx,y:slope},arm), neck:arcLen({x:0,y:FD},neck)};
    };
    const F=mk(false), B=mk(true);
    const armSeam=F.arm+B.arm, capFull=armSeam, SL=cm(p.sleeve), cuff=cm(p.cuff), capH=cm(2.5), cx=capFull/2;
    let sf=[{x:0,y:capH}];
    sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sf=sf.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sf.push({x:(capFull+cuff)/2,y:SL},{x:(capFull-cuff)/2,y:SL});
    const spc=pieceFrom(sf,()=>false,sa);
    const TL=cm(p.tie), TW=cm(6);
    const tf=[{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}];
    const tpc=pieceFrom(tf,()=>false,sa);
    return {pieces:[
      {title:"前身頃", cutInfo:"中心を「わ」／前 1枚", ...F.pc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+10,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚（背中は開けて仕立てる）", ...B.pc, foldX:0,
       grain:{x1:HW*0.5,y1:ADy+10,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）／袖口をゴム通しにする", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+10,x2:cx,y2:SL-10},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.55}},
      {title:"背中ひも", cutInfo:"2本（4つ折りにして縫い、後ろ脇に付ける）", ...tpc, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`袖口ゴムの目安 ${(p.cuff*0.75).toFixed(0)}cm ／ 衿ぐり1周 約${((F.neck+B.neck)/10).toFixed(0)}cm`};
  }
};

/* ---- パジャマ（上衣） ---- */
PATTERNS.pajamas={
  mode:"human",
  name:"パジャマ（上衣）",
  note:"前開きのゆったりしたパジャマトップス。前身頃2枚＋後身頃1枚＋袖2枚＋衿。締めつけないシルエットで寝返りもらく。パンツは「スウェットパンツ」や「テーパードパンツ」と合わせてセットに。ダブルガーゼやネル生地で。",
  params:[
    {key:"bust",    label:"バスト",         unit:"cm",min:60,max:130,step:1,  val:100},
    {key:"len",     label:"着丈",           unit:"cm",min:40,max:80, step:1,  val:66},
    {key:"shoulder",label:"肩幅",           unit:"cm",min:28,max:54, step:1,  val:44},
    {key:"sleeve",  label:"袖丈",           unit:"cm",min:14,max:62, step:1,  val:54},
    {key:"cuff",    label:"袖口（裁ち幅）", unit:"cm",min:14,max:32, step:0.5,val:22},
    {key:"neckw",   label:"衿ぐり幅",       unit:"cm",min:15,max:24, step:0.5,val:19},
    {key:"overlap", label:"打ち合わせ幅",   unit:"cm",min:2, max:7,  step:0.5,val:3.5},
    {key:"ease",    label:"ゆとり（総量）", unit:"cm",min:12,max:34, step:1,  val:22},
  ],
  presets:[
    {label:"レディースM",vals:{bust:88, len:62, shoulder:40, sleeve:50, cuff:20, neckw:18, overlap:3,   ease:20}},
    {label:"メンズM",    vals:{bust:98, len:68, shoulder:44, sleeve:54, cuff:22, neckw:19, overlap:3.5, ease:22}},
    {label:"半袖",       vals:{bust:96, len:66, shoulder:43, sleeve:20, cuff:28, neckw:19, overlap:3.5, ease:22}},
    {label:"子供",       vals:{bust:66, len:46, shoulder:31, sleeve:38, cuff:16, neckw:16, overlap:3,   ease:16}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const SHx=cm(p.shoulder)/2+cm(1), slope=cm(3), ADy=cm(23), OV=cm(p.overlap);
    const bNeck=quad({x:0,y:cm(2)},{x:NWh*0.5,y:cm(2)},{x:NWh,y:0},10);
    const bArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
    let bf=[{x:0,y:cm(2)}].concat(bNeck);
    bf.push({x:SHx,y:slope}); bf=bf.concat(bArm);
    bf.push({x:HW,y:L},{x:0,y:L});
    const bpc=pieceFrom(bf,(a,b)=>a.x===0&&b.x===0,sa);
    const fNeck=quad({x:0,y:cm(6.5)},{x:NWh*0.5,y:cm(6.5)},{x:NWh,y:0},10);
    const fArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
    let ff=[{x:-OV,y:cm(6.5)}].concat(fNeck);
    ff.push({x:SHx,y:slope}); ff=ff.concat(fArm);
    ff.push({x:HW,y:L},{x:-OV,y:L});
    const fpc=pieceFrom(ff,()=>false,sa);
    const armSeam=arcLen({x:SHx,y:slope},bArm)+arcLen({x:SHx,y:slope},fArm), capFull=armSeam, SL=cm(p.sleeve), cuff=cm(p.cuff), capH=cm(3), cx=capFull/2;
    let sf=[{x:0,y:capH}];
    sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sf=sf.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sf.push({x:(capFull+cuff)/2,y:SL},{x:(capFull-cuff)/2,y:SL});
    const spc=pieceFrom(sf,()=>false,sa);
    const colLen=arcLen({x:0,y:cm(2)},bNeck)*2+arcLen({x:0,y:cm(6.5)},fNeck)*2, colH=cm(6);
    const cf=[{x:0,y:0},{x:colLen/2,y:0},{x:colLen/2,y:colH},{x:0,y:colH}];
    const cpc=pieceFrom(cf,(a,b)=>a.x===0&&b.x===0,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...bpc, foldX:0,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.6}},
      {title:"前身頃", cutInfo:"2枚（左右対称に裁断）", ...fpc, foldX:null,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-16},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.62}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+10,x2:cx,y2:SL-10},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.55}},
      {title:"衿（スタンド）", cutInfo:"中心を「わ」／表布・裏布 各1枚", ...cpc, foldX:0,
       grain:{x1:colLen*0.25,y1:8,x2:colLen*0.25,y2:colH-8},
       notches:[], labelAt:{x:colLen*0.25,y:colH*0.5}}
    ],
    memo:`前中心にボタン5〜6個 ／ 衿ぐり1周 約${(colLen/10).toFixed(0)}cm`};
  }
};

/* ---- ブルゾン ---- */
PATTERNS.blouson={
  mode:"human",
  name:"ブルゾン",
  note:"裾と袖口をリブで絞った軽アウター。前身頃2枚＋後身頃1枚＋袖2枚＋リブ（裾・袖口）。前はファスナーでもボタンでも。ナイロンやツイル、デニムなど張りのある生地で。",
  params:[
    {key:"bust",    label:"バスト",         unit:"cm",min:84,max:135,step:1,  val:104},
    {key:"len",     label:"着丈（リブ含まず）",unit:"cm",min:40,max:70,step:1, val:54},
    {key:"shoulder",label:"肩幅",           unit:"cm",min:38,max:56, step:1,  val:46},
    {key:"sleeve",  label:"袖丈",           unit:"cm",min:40,max:66, step:1,  val:54},
    {key:"cuff",    label:"袖口リブ（裁ち幅）",unit:"cm",min:14,max:26,step:0.5,val:18},
    {key:"ribh",    label:"リブの高さ",     unit:"cm",min:4, max:12, step:0.5,val:7},
    {key:"neckw",   label:"衿ぐり幅",       unit:"cm",min:16,max:26, step:0.5,val:20},
    {key:"ease",    label:"ゆとり（総量）", unit:"cm",min:12,max:36, step:1,  val:22},
  ],
  presets:[
    {label:"レディースM",vals:{bust:90, len:50, shoulder:42, sleeve:52, cuff:17, ribh:6, neckw:19, ease:20}},
    {label:"メンズM",    vals:{bust:100,len:56, shoulder:46, sleeve:55, cuff:18, ribh:7, neckw:20, ease:22}},
    {label:"メンズL",    vals:{bust:108,len:59, shoulder:49, sleeve:57, cuff:19, ribh:7, neckw:21, ease:24}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.bust)+cm(p.ease))/4, L=cm(p.len), NWh=cm(p.neckw)/2;
    const SHx=cm(p.shoulder)/2+cm(2), slope=cm(4), ADy=cm(24), RH=cm(p.ribh);
    const bNeck=quad({x:0,y:cm(2.5)},{x:NWh*0.5,y:cm(2.5)},{x:NWh,y:0},10);
    const bArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
    let bf=[{x:0,y:cm(2.5)}].concat(bNeck);
    bf.push({x:SHx,y:slope}); bf=bf.concat(bArm);
    bf.push({x:HW*0.94,y:L},{x:0,y:L});
    const bpc=pieceFrom(bf,(a,b)=>a.x===0&&b.x===0,sa);
    const fNeck=quad({x:0,y:cm(7)},{x:NWh*0.5,y:cm(7)},{x:NWh,y:0},10);
    const fArm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.45},{x:HW,y:ADy},10);
    let ff=[{x:0,y:cm(7)}].concat(fNeck);
    ff.push({x:SHx,y:slope}); ff=ff.concat(fArm);
    ff.push({x:HW*0.94,y:L},{x:0,y:L});
    const fpc=pieceFrom(ff,()=>false,sa);
    const armSeam=arcLen({x:SHx,y:slope},bArm)+arcLen({x:SHx,y:slope},fArm), capFull=armSeam, SL=cm(p.sleeve), cuff=cm(p.cuff), capH=cm(3), cx=capFull/2;
    let sf=[{x:0,y:capH}];
    sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sf=sf.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sf.push({x:(capFull+cuff)/2,y:SL},{x:(capFull-cuff)/2,y:SL});
    const spc=pieceFrom(sf,()=>false,sa);
    const hemRibW=HW*0.94*2*0.86;
    const rf=[{x:0,y:0},{x:hemRibW,y:0},{x:hemRibW,y:RH*2},{x:0,y:RH*2}];
    const rpc=pieceFrom(rf,()=>false,sa);
    const cuffRibW=cuff*0.82;
    const crf=[{x:0,y:0},{x:cuffRibW,y:0},{x:cuffRibW,y:RH*2},{x:0,y:RH*2}];
    const crpc=pieceFrom(crf,()=>false,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...bpc, foldX:0,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-14},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.62}},
      {title:"前身頃", cutInfo:"2枚（左右対称に裁断）／前端にファスナーを付ける", ...fpc, foldX:null,
       grain:{x1:HW*0.5,y1:slope+14,x2:HW*0.5,y2:L-14},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.62}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+10,x2:cx,y2:SL-10},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.55}},
      {title:"裾リブ", cutInfo:"1枚（二つ折りにして裾に付ける）", ...rpc, foldX:null, foldY:RH,
       grain:{x1:hemRibW*0.2,y1:RH,x2:hemRibW*0.8,y2:RH},
       notches:[], labelAt:{x:hemRibW*0.5,y:RH}},
      {title:"袖口リブ", cutInfo:"2枚（左右）／輪に縫って二つ折りにし、袖口に付ける", ...crpc, foldX:null, foldY:RH,
       grain:{x1:cuffRibW*0.2,y1:RH,x2:cuffRibW*0.8,y2:RH},
       notches:[], labelAt:{x:cuffRibW*0.5,y:RH}}
    ],
    memo:`裾リブは身頃裾まわりの約86%の長さ ／ 伸びるリブニットを使ってください`};
  }
};

/* ---- おむつポーチ ---- */
PATTERNS.diaperpouch={
  mode:"baby",
  name:"おむつポーチ",
  note:"おむつとおしりふきをまとめて持ち歩けるポーチ。本体（底わ）＋フラップ＋持ち手。フラップを開くとおむつ替えシートにもなります。ラミネート地なら汚れてもさっと拭けます。",
  params:[
    {key:"w",     label:"仕上がり幅",     unit:"cm",min:18,max:34, step:0.5,val:25},
    {key:"h",     label:"仕上がり高さ",   unit:"cm",min:12,max:26, step:0.5,val:18},
    {key:"gusset",label:"マチ（底の奥行）",unit:"cm",min:4, max:14, step:0.5,val:8},
    {key:"flap",  label:"フラップ深さ",   unit:"cm",min:6, max:18, step:0.5,val:11},
    {key:"handle",label:"持ち手の長さ",   unit:"cm",min:12,max:30, step:1,  val:18},
  ],
  presets:[
    {label:"Sサイズ",vals:{w:21, h:15, gusset:6, flap:9,  handle:16}},
    {label:"標準",   vals:{w:25, h:18, gusset:8, flap:11, handle:18}},
    {label:"大きめ", vals:{w:29, h:21, gusset:10,flap:13, handle:20}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset), FP=cm(p.flap);
    const halfW=W/2+G/2, halfH=H+G/2;
    const pc=pieceFrom([{x:0,y:0},{x:halfW,y:0},{x:halfW,y:halfH},{x:0,y:halfH}],(a,b)=>a.y===halfH&&b.y===halfH,sa);
    let ff=[{x:0,y:0},{x:W,y:0},{x:W,y:FP-cm(3)}];
    ff=ff.concat(quad({x:W,y:FP-cm(3)},{x:W,y:FP},{x:W-cm(3),y:FP},8));
    ff.push({x:cm(3),y:FP});
    ff=ff.concat(quad({x:cm(3),y:FP},{x:0,y:FP},{x:0,y:FP-cm(3)},8));
    const fpc=pieceFrom(ff,()=>false,sa);
    const HL=cm(p.handle), HW2=cm(6);
    const hpc=pieceFrom([{x:0,y:0},{x:HL,y:0},{x:HL,y:HW2},{x:0,y:HW2}],()=>false,sa);
    return {pieces:[
      {title:"ポーチ本体", cutInfo:"底（下端）を「わ」に置いて 1枚 ／ 脇を縫い、底角にマチを縫う",
       ...pc, foldX:null, foldY:halfH,
       grain:{x1:halfW*0.5,y1:12,x2:halfW*0.5,y2:halfH-12},
       notches:[{x:halfW,y:halfH-G/2}], labelAt:{x:halfW*0.5,y:halfH*0.55}},
      {title:"フラップ", cutInfo:"表布・裏布 各1枚／中表に縫って返し、後ろ上端に付ける", ...fpc, foldX:null,
       grain:{x1:W*0.5,y1:10,x2:W*0.5,y2:FP-10},
       notches:[{x:W/2,y:FP}], labelAt:{x:W*0.5,y:FP*0.5}},
      {title:"持ち手", cutInfo:"1本（4つ折りにして縫う）", ...hpc, foldX:null,
       grain:{x1:HL*0.2,y1:HW2/2,x2:HL*0.8,y2:HW2/2},
       notches:[], labelAt:{x:HL*0.5,y:HW2*0.5}}
    ],
    memo:`マチ${p.gusset}cm ／ おむつ4〜5枚＋おしりふきが入る目安サイズです`};
  }
};

/* ---- おしりふきケース ---- */
PATTERNS.wipescase={
  mode:"baby",
  name:"おしりふきケース",
  note:"市販のおしりふきの袋にかぶせるカバー。取り出し口を開けた1枚仕立てで、面ファスナーで留めます。使い捨ての袋がそのまま可愛くなり、フタも付けられます。ラミネート地やオックスで。",
  params:[
    {key:"w",     label:"袋の幅",     unit:"cm",min:12,max:24, step:0.5,val:18},
    {key:"d",     label:"袋の奥行",   unit:"cm",min:6, max:16, step:0.5,val:10},
    {key:"h",     label:"袋の高さ",   unit:"cm",min:4, max:14, step:0.5,val:7},
    {key:"open",  label:"取り出し口の幅",unit:"cm",min:5,max:14,step:0.5,val:9},
  ],
  presets:[
    {label:"標準",  vals:{w:18, d:10, h:7,  open:9}},
    {label:"大容量",vals:{w:21, d:12, h:9,  open:10}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), D=cm(p.d), H=cm(p.h), OP=cm(p.open);
    // 展開：上面＋前後面＋下面を一続きに
    const total=D+H*2+D;
    const pc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:total},{x:0,y:total}],()=>false,sa);
    // フタ（取り出し口を覆う）
    const lf=[{x:0,y:0},{x:OP+cm(4),y:0},{x:OP+cm(4),y:cm(7)},{x:0,y:cm(7)}];
    const lpc=pieceFrom(lf,()=>false,sa);
    return {pieces:[
      {title:"ケース本体", cutInfo:"1枚（表布・裏布 各1枚）／上面の中央に取り出し口を開ける",
       ...pc, foldX:null,
       grain:{x1:W*0.5,y1:12,x2:W*0.5,y2:total-12},
       casingLines:[D,D+H,D+H+ (H)], casingLabel:"折り線（上面・前後面・下面）",
       notches:[{x:(W-OP)/2,y:D*0.5},{x:(W+OP)/2,y:D*0.5}], labelAt:{x:W*0.5,y:total*0.55}},
      {title:"フタ", cutInfo:"表布・裏布 各1枚／中表に縫って返し、面ファスナーで留める", ...lpc, foldX:null,
       grain:{x1:(OP+cm(4))*0.5,y1:8,x2:(OP+cm(4))*0.5,y2:cm(7)-8},
       notches:[], labelAt:{x:(OP+cm(4))*0.5,y:cm(3.5)}}
    ],
    memo:`合印の間（${p.open}cm）が取り出し口です ／ 折り線で箱形に折り、両脇を縫います`};
  }
};

/* ---- 抱っこ紐カバー（よだれカバー） ---- */
PATTERNS.carriercover={
  mode:"baby",
  name:"抱っこ紐カバー",
  note:"抱っこ紐の肩ベルトに巻いて、よだれや汚れから守るカバー。面ファスナーやスナップで留めるだけなので着脱かんたん。ガーゼやタオル地で作ると吸水性があり、赤ちゃんが噛んでも安心です。",
  params:[
    {key:"len",   label:"長さ",       unit:"cm",min:16,max:36, step:0.5,val:25},
    {key:"belt",  label:"ベルトの幅", unit:"cm",min:4, max:12, step:0.5,val:7},
    {key:"ease",  label:"巻きのゆとり",unit:"cm",min:1, max:5,  step:0.5,val:2.5},
    {key:"round", label:"角の丸み",   unit:"cm",min:0, max:5,  step:0.5,val:2},
  ],
  presets:[
    {label:"標準",  vals:{len:25, belt:7, ease:2.5, round:2}},
    {label:"幅広",  vals:{len:28, belt:9, ease:3,   round:2.5}},
  ],
  toggles:[],
  gen(p,sa){
    const L=cm(p.len), W=(cm(p.belt)+cm(p.ease))*2, R=clampR(cm(p.round),L,W);
    let fin=[];
    if(R>0){
      fin.push({x:R,y:0},{x:L-R,y:0});
      fin=fin.concat(quad({x:L-R,y:0},{x:L,y:0},{x:L,y:R},8));
      fin.push({x:L,y:W-R});
      fin=fin.concat(quad({x:L,y:W-R},{x:L,y:W},{x:L-R,y:W},8));
      fin.push({x:R,y:W});
      fin=fin.concat(quad({x:R,y:W},{x:0,y:W},{x:0,y:W-R},8));
      fin.push({x:0,y:R});
      fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    }else{ fin=[{x:0,y:0},{x:L,y:0},{x:L,y:W},{x:0,y:W}]; }
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"カバー本体", cutInfo:"2組（左右のベルト用）／表布・裏布 各2枚。中表に縫って返す",
      ...pc, foldX:null,
      grain:{x1:L*0.2,y1:W/2,x2:L*0.8,y2:W/2},
      notches:[{x:L*0.15,y:0},{x:L*0.15,y:W}], labelAt:{x:L*0.5,y:W*0.5}
    }],
    memo:`ベルト幅${p.belt}cm＋ゆとり${p.ease}cmで一周分を計算 ／ 長辺の端に面ファスナーを付けます`};
  }
};

/* ---- キャップ ---- */
PATTERNS.cap={
  mode:"small",
  name:"キャップ",
  note:"6枚はぎのクラウンにつばを付けた定番キャップ。パネル6枚＋つば2枚。パネルを順に縫い合わせると丸いクラウンになります。つばには芯を入れて形をキープ。ツイルやデニムで。",
  params:[
    {key:"head",  label:"頭囲",       unit:"cm",min:46,max:62, step:0.5,val:57},
    {key:"crown", label:"クラウン深さ",unit:"cm",min:9, max:18, step:0.5,val:13},
    {key:"brim",  label:"つばの長さ", unit:"cm",min:4, max:9,  step:0.5,val:7},
    {key:"ease",  label:"ゆとり",     unit:"cm",min:0, max:4,  step:0.5,val:1},
  ],
  presets:[
    {label:"子供",  vals:{head:50, crown:11, brim:6,   ease:1}},
    {label:"大人S", vals:{head:55, crown:12.5,brim:6.5,ease:1}},
    {label:"大人",  vals:{head:57, crown:13, brim:7,   ease:1}},
    {label:"大きめ",vals:{head:60, crown:14, brim:7.5, ease:1}},
  ],
  toggles:[],
  gen(p,sa){
    const C=cm(p.head)+cm(p.ease), CH=cm(p.crown), BR=cm(p.brim);
    const PW=C/6;                                   // パネル下端の幅
    // パネル：下が広く上が尖った木の葉形
    let pf=[{x:0,y:CH}];
    pf=pf.concat(quad({x:0,y:CH},{x:PW*0.10,y:CH*0.42},{x:PW*0.5,y:0},14));
    pf=pf.concat(quad({x:PW*0.5,y:0},{x:PW*0.90,y:CH*0.42},{x:PW,y:CH},14));
    const ppc=pieceFrom(pf,()=>false,sa);
    // つば：三日月形（内側の弧＝頭囲の約半分）
    const r=C/(2*Math.PI), R1=r+BR, n=28;
    const bf=[];
    for(let i=0;i<=n;i++){const t=Math.PI*(0.15+0.7*i/n); bf.push({x:R1+R1*Math.cos(t), y:R1-R1*Math.sin(t)});}
    for(let i=n;i>=0;i--){const t=Math.PI*(0.15+0.7*i/n); bf.push({x:R1+r*Math.cos(t), y:R1-r*Math.sin(t)});}
    const bpc=pieceFrom(bf,()=>false,sa);
    return {pieces:[
      {title:"クラウンパネル", cutInfo:"6枚 ／ 曲線の辺同士を順に縫い合わせてドーム状にする",
       ...ppc, foldX:null,
       grain:{x1:PW*0.5,y1:CH*0.35,x2:PW*0.5,y2:CH-8},
       notches:[{x:PW*0.5,y:0}], labelAt:{x:PW*0.5,y:CH*0.62}},
      {title:"つば（ブリム）", cutInfo:"2枚（表・裏）＋芯1枚 ／ 中表に縫って返し、クラウン前面に付ける",
       ...bpc, foldX:null,
       grain:{x1:R1,y1:R1-r-6,x2:R1,y2:R1-BR*0.2},
       notches:[{x:R1,y:R1-R1}], labelAt:{x:R1,y:R1-(r+R1)*0.5}}
    ],
    memo:`頭まわり 約${(C/10).toFixed(0)}cm ／ パネル6枚の下端合計がこの長さになります`};
  }
};

/* ---- 母子手帳ケース ---- */
PATTERNS.boshitecho={
  mode:"small",
  name:"母子手帳ケース",
  note:"母子手帳・診察券・保険証をまとめて入れる二つ折りケース。本体＋内ポケット。ポケットを縦に縫い分けるとカード入れになります。通帳ケースとしても使えます。",
  params:[
    {key:"w",     label:"手帳の幅",     unit:"cm",min:9, max:18, step:0.5,val:13},
    {key:"h",     label:"手帳の高さ",   unit:"cm",min:13,max:24, step:0.5,val:18.5},
    {key:"thick", label:"厚み",         unit:"cm",min:0.5,max:4, step:0.5,val:1.5},
    {key:"pockh", label:"内ポケット高さ",unit:"cm",min:5, max:14, step:0.5,val:9},
  ],
  presets:[
    {label:"A6（標準）",vals:{w:11, h:16,   thick:1.5, pockh:8}},
    {label:"B6",        vals:{w:13, h:18.5, thick:1.5, pockh:9}},
    {label:"A5",        vals:{w:15, h:21,   thick:2,   pockh:10}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), T=cm(p.thick);
    const total=W*2+T;
    const pc=pieceFrom([{x:0,y:0},{x:total,y:0},{x:total,y:H},{x:0,y:H}],()=>false,sa);
    const PH=cm(p.pockh);
    const ppc=pieceFrom([{x:0,y:0},{x:total,y:0},{x:total,y:PH},{x:0,y:PH}],()=>false,sa);
    return {pieces:[
      {title:"ケース本体", cutInfo:"表布・裏布 各1枚／中表に縫って返し、中央で二つ折り",
       ...pc, foldX:W+T/2,
       grain:{x1:total*0.5,y1:10,x2:total*0.5,y2:H-10},
       notches:[{x:W,y:0},{x:W+T,y:0}], labelAt:{x:total*0.5,y:H*0.55}},
      {title:"内ポケット", cutInfo:"1〜2枚／上端を三つ折りし、縦に縫い分けてカード入れにする",
       ...ppc, foldX:null,
       grain:{x1:total*0.5,y1:8,x2:total*0.5,y2:PH-8},
       notches:[{x:total/3,y:PH},{x:total*2/3,y:PH}], labelAt:{x:total*0.5,y:PH*0.55}}
    ],
    memo:`裁ち切り 約${(total/10).toFixed(1)}×${(H/10).toFixed(1)}cm ／ 厚み${p.thick}cm分を中央に加算しています`};
  }
};

/* ---- カードケース ---- */
PATTERNS.cardcase={
  mode:"small",
  name:"カードケース",
  note:"名刺やポイントカードを入れる小さな二つ折りケース。本体1枚＋内ポケット。表布・裏布を中表に縫って返し、中央で折るだけ。接着芯を貼るとしっかりします。ハギレでどうぞ。",
  params:[
    {key:"cardw", label:"カードの幅",   unit:"cm",min:5, max:10, step:0.1,val:9},
    {key:"cardh", label:"カードの高さ", unit:"cm",min:4, max:8,  step:0.1,val:5.5},
    {key:"ease",  label:"ゆとり",       unit:"cm",min:0.5,max:2, step:0.5,val:1},
  ],
  presets:[
    {label:"名刺",      vals:{cardw:9,   cardh:5.5, ease:1}},
    {label:"クレジット",vals:{cardw:8.6, cardh:5.4, ease:1}},
    {label:"大きめ",    vals:{cardw:10,  cardh:7,   ease:1}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.cardw)+cm(p.ease), H=cm(p.cardh)+cm(p.ease);
    const total=W*2+cm(0.6);
    const pc=pieceFrom([{x:0,y:0},{x:total,y:0},{x:total,y:H},{x:0,y:H}],()=>false,sa);
    const ppc=pieceFrom([{x:0,y:0},{x:total,y:0},{x:total,y:H*0.62},{x:0,y:H*0.62}],()=>false,sa);
    return {pieces:[
      {title:"ケース本体", cutInfo:"表布・裏布 各1枚／中表に縫って返し、中央で二つ折り",
       ...pc, foldX:total/2,
       grain:{x1:total*0.5,y1:6,x2:total*0.5,y2:H-6},
       notches:[{x:total/2,y:0},{x:total/2,y:H}], labelAt:{x:total*0.5,y:H*0.55}},
      {title:"内ポケット", cutInfo:"1枚／上端を三つ折りしてから本体裏に重ねて縫う", ...ppc, foldX:null,
       grain:{x1:total*0.5,y1:5,x2:total*0.5,y2:H*0.62-5},
       notches:[], labelAt:{x:total*0.5,y:H*0.34}}
    ],
    memo:`カード＋ゆとり${p.ease}cmで計算 ／ 仕上がり 約${(total/2/10).toFixed(1)}×${(H/10).toFixed(1)}cm（折りたたみ時）`};
  }
};

/* ---- 防災頭巾カバー ---- */
PATTERNS.bousaizukin={
  mode:"small",
  name:"防災頭巾カバー",
  note:"防災頭巾を入れて、椅子の背もたれに掛けて座布団にもなるカバー。本体1枚＋ゴムバンド。学校の指定サイズに合わせて寸法を入れてください。丈夫なキルティング地が定番です。",
  params:[
    {key:"w",     label:"頭巾の幅",     unit:"cm",min:24,max:40, step:0.5,val:31},
    {key:"h",     label:"頭巾の高さ",   unit:"cm",min:28,max:48, step:0.5,val:38},
    {key:"thick", label:"頭巾の厚み",   unit:"cm",min:2, max:10, step:0.5,val:5},
    {key:"band",  label:"背もたれバンド長さ",unit:"cm",min:20,max:50,step:1,val:32},
  ],
  presets:[
    {label:"標準",  vals:{w:31, h:38, thick:5, band:32}},
    {label:"小さめ",vals:{w:28, h:34, thick:4, band:28}},
    {label:"大きめ",vals:{w:34, h:43, thick:6, band:36}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.thick), H=cm(p.h)+cm(p.thick)/2, FL=cm(12);
    const total=H*2+FL;
    const pc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:total},{x:0,y:total}],()=>false,sa);
    const BL=cm(p.band), BW=cm(7);
    const bpc=pieceFrom([{x:0,y:0},{x:BL,y:0},{x:BL,y:BW},{x:0,y:BW}],()=>false,sa);
    return {pieces:[
      {title:"カバー本体", cutInfo:"1枚 ／ 下から折り上げて両脇を縫い、上のフラップをかぶせる",
       ...pc, foldX:null, foldY:H,
       grain:{x1:W*0.5,y1:16,x2:W*0.5,y2:total-16},
       casingLines:[H*2], casingLabel:"フタの折り線",
       notches:[{x:0,y:H},{x:W,y:H}], labelAt:{x:W*0.5,y:total*0.45}},
      {title:"背もたれバンド", cutInfo:"2本（4つ折りにして縫い、背面に付ける）", ...bpc, foldX:null,
       grain:{x1:BL*0.2,y1:BW/2,x2:BL*0.8,y2:BW/2},
       notches:[], labelAt:{x:BL*0.5,y:BW*0.5}}
    ],
    memo:`厚み${p.thick}cm分を幅に加算 ／ 学校の指定サイズがある場合はそれに合わせてください`};
  }
};

/* ---- ドール服（ワンピース） ---- */
PATTERNS.dollclothes={
  mode:"small",
  name:"ドール服（ワンピース）",
  note:"お人形さんのAラインワンピース。前後身頃2枚だけ。背中はスナップかマジックテープで留めます。人形の胴回りと着丈を測って入力してください。ハギレで作れて縫う面積も小さいので、練習にも。",
  params:[
    {key:"chest", label:"胴回り",     unit:"cm",min:8, max:36, step:0.5,val:18},
    {key:"len",   label:"着丈",       unit:"cm",min:5, max:26, step:0.5,val:12},
    {key:"shoulder",label:"肩幅",     unit:"cm",min:3, max:14, step:0.5,val:6},
    {key:"flare", label:"裾フレア（脇に+）",unit:"cm",min:0,max:8,step:0.5,val:2.5},
    {key:"ease",  label:"ゆとり（総量）",unit:"cm",min:1,max:8, step:0.5,val:2},
  ],
  presets:[
    {label:"小（20cm人形）",vals:{chest:13, len:8,  shoulder:4.5,flare:1.5, ease:1.5}},
    {label:"中（27cm人形）",vals:{chest:18, len:12, shoulder:6,  flare:2.5, ease:2}},
    {label:"大（40cm人形）",vals:{chest:26, len:17, shoulder:8.5,flare:3.5, ease:3}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.chest)+cm(p.ease))/4, L=cm(p.len), FL=cm(p.flare);
    const SHx=cm(p.shoulder)/2, slope=cm(0.6), ADy=L*0.30, NWh=SHx*0.55;
    const mk=(back)=>{
      const FD=back?cm(0.5):cm(1.2);
      const neck=quad({x:0,y:FD},{x:NWh*0.55,y:FD},{x:NWh,y:0},8);
      const arm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.5},{x:HW,y:ADy},8);
      let fin=[{x:0,y:FD}].concat(neck);
      fin.push({x:SHx,y:slope}); fin=fin.concat(arm);
      fin.push({x:HW+FL,y:L},{x:0,y:L});
      return pieceFrom(fin,(a,b)=>a.x===0&&b.x===0,sa);
    };
    return {pieces:[
      {title:"前身頃", cutInfo:"中心を「わ」／前 1枚", ...mk(false), foldX:0,
       grain:{x1:HW*0.5,y1:ADy+3,x2:HW*0.5,y2:L-4},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.65}},
      {title:"後身頃", cutInfo:"2枚（背中で開けてスナップ留め）", ...mk(true), foldX:0,
       grain:{x1:HW*0.5,y1:ADy+3,x2:HW*0.5,y2:L-4},
       notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.65}}
    ],
    memo:`小さいので縫い代は0.5〜0.7cmがおすすめ ／ 衿ぐり・袖ぐりはバイアスかジグザグで始末します`};
  }
};

/* ---- くまのぬいぐるみ ---- */
PATTERNS.teddy={
  mode:"small",
  name:"くまのぬいぐるみ",
  note:"平面で作れるシンプルなくまのぬいぐるみ。本体2枚＋耳4枚。中表に縫って返し口から返し、綿を詰めます。フェルトやボア、コーデュロイなどで。目や鼻は刺しゅうにすると小さな子にも安心。",
  params:[
    {key:"h",     label:"全体の高さ", unit:"cm",min:12,max:36, step:0.5,val:22},
    {key:"headr", label:"頭の大きさ", unit:"cm",min:4, max:14, step:0.5,val:8},
    {key:"earr",  label:"耳の大きさ", unit:"cm",min:1.5,max:6, step:0.5,val:3},
  ],
  presets:[
    {label:"小さめ",vals:{h:16, headr:6,  earr:2.5}},
    {label:"標準",  vals:{h:22, headr:8,  earr:3}},
    {label:"大きめ",vals:{h:30, headr:11, earr:4}},
  ],
  toggles:[],
  gen(p,sa){
    const H=cm(p.h), HR=cm(p.headr)/2, ER=cm(p.earr)/2;
    const bodyW=HR*2.1, cx=bodyW;
    let fin=[{x:cx,y:0}];
    // 頭（右半分）
    fin=fin.concat(quad({x:cx,y:0},{x:cx+HR*1.15,y:0},{x:cx+HR,y:HR*1.15},10));
    // 首→肩→腕
    fin=fin.concat(quad({x:cx+HR,y:HR*1.15},{x:cx+HR*0.6,y:HR*1.6},{x:cx+bodyW*0.55,y:HR*2.0},8));
    fin=fin.concat(quad({x:cx+bodyW*0.55,y:HR*2.0},{x:cx+bodyW*1.05,y:HR*2.5},{x:cx+bodyW*0.72,y:H*0.55},10));
    // 胴→脚
    fin=fin.concat(quad({x:cx+bodyW*0.72,y:H*0.55},{x:cx+bodyW*0.5,y:H*0.72},{x:cx+bodyW*0.62,y:H*0.9},8));
    fin=fin.concat(quad({x:cx+bodyW*0.62,y:H*0.9},{x:cx+bodyW*0.6,y:H},{x:cx+bodyW*0.2,y:H},8));
    // 中心（わ）で上へ
    fin.push({x:cx,y:H});
    const pc=pieceFrom(fin,(a,b)=>a.x===cx&&b.x===cx,sa);
    // 耳（円）
    const ear=[]; const n=24;
    for(let i=0;i<n;i++){const t=i/n*Math.PI*2; ear.push({x:ER+ER*Math.cos(t), y:ER+ER*Math.sin(t)});}
    const epc=pieceFrom(ear,()=>false,sa);
    return {pieces:[
      {title:"本体", cutInfo:"中心を「わ」／2枚（前・後）。中表に縫い、返し口から返して綿を詰める",
       ...pc, foldX:cx,
       grain:{x1:cx+bodyW*0.3,y1:HR*2.2,x2:cx+bodyW*0.3,y2:H*0.85},
       notches:[{x:cx+HR,y:HR*1.15}], labelAt:{x:cx+bodyW*0.34,y:H*0.5}},
      {title:"耳", cutInfo:"4枚（2枚1組で縫い、頭に挟むか縫い付ける）", ...epc, foldX:null,
       grain:{x1:ER,y1:ER*0.4,x2:ER,y2:ER*1.6},
       notches:[{x:ER,y:ER*2}], labelAt:{x:ER,y:ER}}
    ],
    memo:`綿はしっかり詰めて形を整えます ／ 誤飲防止のため、目鼻はボタンではなく刺しゅうがおすすめ`};
  }
};

/* ---- マフラー ---- */
PATTERNS.scarf={
  mode:"small",
  name:"マフラー",
  note:"長方形を二つ折りにして縫うだけの布マフラー。裏布を付けると両面楽しめます。フリースなら端の始末もいらず、切りっぱなしでフリンジにもできます。冬のプレゼントにも。",
  params:[
    {key:"len",   label:"全長",     unit:"cm",min:90,max:200,step:5,  val:150},
    {key:"width", label:"仕上がり幅",unit:"cm",min:12,max:35, step:0.5,val:20},
  ],
  presets:[
    {label:"子供",  vals:{len:110, width:14}},
    {label:"標準",  vals:{len:150, width:20}},
    {label:"大判",  vals:{len:180, width:28}},
  ],
  toggles:[],
  gen(p,sa){
    const L=cm(p.len), W=cm(p.width)*2;
    const pc=pieceFrom([{x:0,y:0},{x:L,y:0},{x:L,y:W},{x:0,y:W}],()=>false,sa);
    return {pieces:[{
      title:"マフラー本体", cutInfo:"1枚 ／ 長さ方向に二つ折りして縫い、表に返す（裏布を付ける場合は2枚）",
      ...pc, foldX:null, foldY:W/2,
      grain:{x1:L*0.2,y1:W/2,x2:L*0.8,y2:W/2},
      notches:[], labelAt:{x:L*0.5,y:W*0.5}
    }],
    memo:`仕上がり ${p.len}×${p.width}cm ／ 型紙は長方形なので、印刷せず布に直接線を引いて裁つのが手軽です`};
  }
};

/* ---- 名札ケース ---- */
PATTERNS.nametag={
  mode:"small",
  name:"名札ケース",
  note:"服に穴を開けずに名札を付けられるカバー。本体とクリップ布のみ。ビニールを挟めば透明窓になり、名札の出し入れもできます。入園入学の準備に。",
  params:[
    {key:"w",     label:"名札の幅",   unit:"cm",min:5, max:12, step:0.5,val:8},
    {key:"h",     label:"名札の高さ", unit:"cm",min:3, max:9,  step:0.5,val:5},
    {key:"ease",  label:"ゆとり",     unit:"cm",min:0.5,max:2, step:0.5,val:1},
    {key:"clip",  label:"クリップ布の長さ",unit:"cm",min:5,max:14,step:0.5,val:8},
  ],
  presets:[
    {label:"標準",  vals:{w:8,  h:5, ease:1, clip:8}},
    {label:"大きめ",vals:{w:10, h:6, ease:1, clip:9}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.ease), H=cm(p.h)+cm(p.ease);
    const pc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}],()=>false,sa);
    const CL=cm(p.clip), CW=cm(5);
    const cpc=pieceFrom([{x:0,y:0},{x:CL,y:0},{x:CL,y:CW},{x:0,y:CW}],()=>false,sa);
    return {pieces:[
      {title:"ケース本体", cutInfo:"2枚（表・裏）／間にビニールを挟むと透明窓になる", ...pc, foldX:null,
       grain:{x1:W*0.5,y1:6,x2:W*0.5,y2:H-6},
       notches:[], labelAt:{x:W*0.5,y:H*0.5}},
      {title:"クリップ布", cutInfo:"1本（4つ折りにして縫い、上端に付けてクリップを通す）", ...cpc, foldX:null,
       grain:{x1:CL*0.2,y1:CW/2,x2:CL*0.8,y2:CW/2},
       notches:[], labelAt:{x:CL*0.5,y:CW*0.5}}
    ],
    memo:`名札＋ゆとり${p.ease}cmで計算 ／ 安全ピンを使わないので服を傷めません`};
  }
};

/* ---- 長財布 ---- */
PATTERNS.wallet={
  mode:"bag",
  name:"長財布",
  note:"お札がそのまま入る二つ折りの長財布。本体＋カードポケット＋小銭入れ。カードポケットは縦に縫い分けて枚数を調整できます。接着芯を貼るとしっかり形が保てます。",
  params:[
    {key:"w",     label:"仕上がり幅",     unit:"cm",min:16,max:22, step:0.5,val:19},
    {key:"h",     label:"仕上がり高さ",   unit:"cm",min:8, max:13, step:0.5,val:10},
    {key:"pockh", label:"カードポケット高さ",unit:"cm",min:4,max:9, step:0.5,val:6},
    {key:"coinh", label:"小銭入れ高さ",   unit:"cm",min:0, max:11, step:0.5,val:8},
  ],
  presets:[
    {label:"標準",  vals:{w:19, h:10,  pockh:6, coinh:8}},
    {label:"大きめ",vals:{w:20, h:11,  pockh:7, coinh:9}},
    {label:"薄型",  vals:{w:19, h:9.5, pockh:6, coinh:0}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), PH=cm(p.pockh), CH=cm(p.coinh);
    const total=H*2+cm(1);
    const pc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:total},{x:0,y:total}],()=>false,sa);
    const ppc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:PH},{x:0,y:PH}],()=>false,sa);
    const pieces=[
      {title:"財布本体", cutInfo:"表布・裏布 各1枚／中表に縫って返し、中央で二つ折り",
       ...pc, foldX:null, foldY:total/2,
       grain:{x1:W*0.5,y1:10,x2:W*0.5,y2:total-10},
       notches:[{x:0,y:total/2},{x:W,y:total/2}], labelAt:{x:W*0.5,y:total*0.55}},
      {title:"カードポケット", cutInfo:"2〜3枚／上端を三つ折りし、縦に縫い分けてカード入れにする",
       ...ppc, foldX:null,
       grain:{x1:W*0.5,y1:6,x2:W*0.5,y2:PH-6},
       notches:[{x:W/2,y:PH}], labelAt:{x:W*0.5,y:PH*0.55}}
    ];
    if(CH>0){
      const cpc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:CH*2},{x:0,y:CH*2}],()=>false,sa);
      pieces.push({title:"小銭入れ", cutInfo:"1枚／二つ折りにしてファスナーを付ける", ...cpc, foldX:null, foldY:CH,
        grain:{x1:W*0.5,y1:8,x2:W*0.5,y2:CH*2-8},
        notches:[], labelAt:{x:W*0.5,y:CH}});
    }
    return {pieces, memo:`お札（長辺15.5cm）が余裕で入る幅 ／ カードポケットは縦に縫うと1枚あたり約${((cm(p.w)/3)/10).toFixed(1)}cm幅`};
  }
};

/* ---- スマホポーチ ---- */
PATTERNS.phonepouch={
  mode:"bag",
  name:"スマホポーチ",
  note:"スマホと小物だけを入れて出かける、斜めがけの小さなポーチ。本体（底わ）＋フラップ＋ショルダーひも。手ぶらで散歩や買い物に行けます。お使いのスマホのサイズを入力してください。",
  params:[
    {key:"phonew",label:"スマホの幅",     unit:"cm",min:6, max:10, step:0.5,val:7.5},
    {key:"phoneh",label:"スマホの高さ",   unit:"cm",min:12,max:18, step:0.5,val:15},
    {key:"thick", label:"厚み（マチ）",   unit:"cm",min:1, max:6,  step:0.5,val:3},
    {key:"flap",  label:"フラップ深さ",   unit:"cm",min:3, max:9,  step:0.5,val:5},
    {key:"strap", label:"ショルダーひも長さ",unit:"cm",min:80,max:140,step:1, val:110},
    {key:"strapw",label:"ひもの裁ち幅",     unit:"cm",min:3, max:8,  step:0.5,val:5},
  ],
  presets:[
    {label:"標準",  vals:{phonew:7.5,phoneh:15,  thick:3, flap:5, strap:110, strapw:5}},
    {label:"大画面",vals:{phonew:8,  phoneh:16.5,thick:3.5,flap:5.5,strap:115,strapw:5}},
    {label:"薄型",  vals:{phonew:7,  phoneh:14.5,thick:2, flap:4.5,strap:110,strapw:4.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.phonew)+cm(1.5), H=cm(p.phoneh)+cm(1), G=cm(p.thick), FP=cm(p.flap);
    const halfW=W/2+G/2, halfH=H+G/2;
    const pc=pieceFrom([{x:0,y:0},{x:halfW,y:0},{x:halfW,y:halfH},{x:0,y:halfH}],(a,b)=>a.y===halfH&&b.y===halfH,sa);
    let ff=[{x:0,y:0},{x:W,y:0},{x:W,y:FP-cm(2)}];
    ff=ff.concat(quad({x:W,y:FP-cm(2)},{x:W,y:FP},{x:W-cm(2),y:FP},8));
    ff.push({x:cm(2),y:FP});
    ff=ff.concat(quad({x:cm(2),y:FP},{x:0,y:FP},{x:0,y:FP-cm(2)},8));
    const fpc=pieceFrom(ff,()=>false,sa);
    const SL=cm(p.strap), SW=cm(p.strapw);
    const spc=pieceFrom([{x:0,y:0},{x:SL,y:0},{x:SL,y:SW},{x:0,y:SW}],()=>false,sa);
    return {pieces:[
      {title:"ポーチ本体", cutInfo:"底（下端）を「わ」に置いて 1枚 ／ 脇を縫い、底角にマチを縫う",
       ...pc, foldX:null, foldY:halfH,
       grain:{x1:halfW*0.5,y1:10,x2:halfW*0.5,y2:halfH-10},
       notches:[{x:halfW,y:halfH-G/2}], labelAt:{x:halfW*0.5,y:halfH*0.55}},
      {title:"フラップ", cutInfo:"表布・裏布 各1枚／中表に縫って返し、後ろ上端に付ける", ...fpc, foldX:null,
       grain:{x1:W*0.5,y1:8,x2:W*0.5,y2:FP-8},
       notches:[{x:W/2,y:FP}], labelAt:{x:W*0.5,y:FP*0.5}},
      {title:"ショルダーひも", cutInfo:"1本（4つ折りにして縫い、両脇に付ける）", ...spc, foldX:null,
       grain:{x1:SL*0.2,y1:SW/2,x2:SL*0.8,y2:SW/2},
       notches:[], labelAt:{x:SL*0.5,y:SW*0.5}}
    ],
    memo:`スマホ＋ゆとりで計算（幅+1.5cm・高さ+1cm）／ マチ${p.thick}cm`};
  }
};

/* ---- 保冷ランチバッグ ---- */
PATTERNS.lunchbag={
  mode:"bag",
  name:"保冷ランチバッグ",
  note:"お弁当箱がまっすぐ入る箱型のバッグ。本体（底わ）＋持ち手。裏布に保冷シートを使えば夏も安心です。マチをしっかり取ると、汁もれしにくく安定します。",
  params:[
    {key:"w",      label:"お弁当箱の幅",   unit:"cm",min:10,max:26, step:0.5,val:17},
    {key:"d",      label:"お弁当箱の奥行", unit:"cm",min:6, max:20, step:0.5,val:11},
    {key:"h",      label:"お弁当箱の高さ", unit:"cm",min:5, max:20, step:0.5,val:9},
    {key:"handle", label:"持ち手の長さ",   unit:"cm",min:16,max:44, step:1,  val:26},
    {key:"handlew",label:"持ち手の裁ち幅", unit:"cm",min:4, max:10, step:0.5,val:6},
  ],
  presets:[
    {label:"1段",  vals:{w:17, d:11, h:7,  handle:24, handlew:6}},
    {label:"2段",  vals:{w:17, d:11, h:12, handle:26, handlew:6}},
    {label:"大きめ",vals:{w:21, d:14, h:12, handle:30, handlew:7}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(1.5), D=cm(p.d)+cm(1.5), H=cm(p.h)+cm(2);
    const halfW=W/2+D/2, halfH=H+D/2+cm(3);
    const pc=pieceFrom([{x:0,y:0},{x:halfW,y:0},{x:halfW,y:halfH},{x:0,y:halfH}],(a,b)=>a.y===halfH&&b.y===halfH,sa);
    const HL=cm(p.handle), HW2=cm(p.handlew);
    const hpc=pieceFrom([{x:0,y:0},{x:HL,y:0},{x:HL,y:HW2},{x:0,y:HW2}],()=>false,sa);
    return {pieces:[
      {title:"袋本体", cutInfo:"底（下端）を「わ」に置いて 1枚（表布・裏布 各1枚）／脇を縫い、底角にマチを縫う",
       ...pc, foldX:null, foldY:halfH,
       grain:{x1:halfW*0.5,y1:14,x2:halfW*0.5,y2:halfH-14},
       casingLines:[cm(3)], casingLabel:"袋口の折り返し",
       notches:[{x:halfW,y:halfH-D/2}], labelAt:{x:halfW*0.5,y:halfH*0.55}},
      {title:"持ち手", cutInfo:"2本（4つ折りにして縫う）", ...hpc, foldX:null,
       grain:{x1:HL*0.2,y1:HW2/2,x2:HL*0.8,y2:HW2/2},
       notches:[], labelAt:{x:HL*0.5,y:HW2*0.5}}
    ],
    memo:`お弁当箱＋ゆとりで計算（幅・奥行+1.5cm、高さ+2cm）／ 底の切り欠きは一辺 ${((D/2)/10).toFixed(1)}cm`};
  }
};

/* ---- 座布団カバー ---- */
PATTERNS.zabuton={
  mode:"home",
  name:"座布団カバー",
  note:"座布団にかぶせる封筒式のカバー。ファスナーを使わず、後ろで布を重ねるだけで出し入れできます。前面1枚＋後面2枚。銘仙判・八端判など、お使いの座布団サイズを入力してください。型紙は長方形なので、印刷せず寸法どおり直接裁つのが手軽です。",
  params:[
    {key:"w",      label:"座布団の幅",   unit:"cm",min:40,max:70, step:0.5,val:55},
    {key:"d",      label:"座布団の奥行", unit:"cm",min:40,max:75, step:0.5,val:59},
    {key:"thick",  label:"座布団の厚み", unit:"cm",min:2, max:12, step:0.5,val:5},
    {key:"overlap",label:"重なり幅（入口）",unit:"cm",min:8,max:25,step:1, val:15},
  ],
  presets:[
    {label:"銘仙判（55×59）",vals:{w:55, d:59, thick:5, overlap:15}},
    {label:"八端判（59×63）",vals:{w:59, d:63, thick:5, overlap:16}},
    {label:"小座布団（50×50）",vals:{w:50, d:50, thick:4, overlap:14}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.thick)*0.5, D=cm(p.d)+cm(p.thick)*0.5, OV=cm(p.overlap);
    const fpc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:D},{x:0,y:D}],()=>false,sa);
    const bh=D/2+OV/2;
    const bpc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:bh},{x:0,y:bh}],()=>false,sa);
    return {pieces:[
      {title:"前面", cutInfo:"1枚", ...fpc, foldX:null,
       grain:{x1:W*0.5,y1:16,x2:W*0.5,y2:D-16},
       notches:[], labelAt:{x:W*0.5,y:D*0.5}},
      {title:"後面", cutInfo:"2枚 ／ 開き口になる辺を三つ折りしてから、中央で重ねる", ...bpc, foldX:null,
       grain:{x1:W*0.5,y1:14,x2:W*0.5,y2:bh-14},
       notches:[{x:0,y:bh},{x:W,y:bh}], labelAt:{x:W*0.5,y:bh*0.55}}
    ],
    memo:`厚み${p.thick}cmの半分を各辺に加算 ／ 後面2枚が中央で${p.overlap}cm重なります`};
  }
};

/* ---- カフェカーテン ---- */
PATTERNS.cafecurtain={
  mode:"home",
  name:"カフェカーテン",
  note:"窓の下半分や棚の目隠しに使う短いカーテン。上端を折り返して棒を通すだけの簡単な作り。1枚の長方形なので、初めてのカーテン作りにおすすめです。リネンやレースで。",
  params:[
    {key:"w",      label:"仕上がり幅",   unit:"cm",min:30,max:150,step:1,  val:80},
    {key:"h",      label:"仕上がり丈",   unit:"cm",min:20,max:90, step:1,  val:50},
    {key:"ratio",  label:"ヒダ倍率",     unit:"倍",min:1, max:2,  step:0.1,val:1.3},
    {key:"pocket", label:"棒通しの高さ", unit:"cm",min:2, max:8,  step:0.5,val:4},
    {key:"bothem", label:"裾の折り返し", unit:"cm",min:2, max:10, step:0.5,val:4},
    {key:"sidehem",label:"脇の折り返し", unit:"cm",min:1, max:4,  step:0.5,val:2},
  ],
  presets:[
    {label:"小窓",  vals:{w:60,  h:40, ratio:1.3, pocket:4, bothem:4, sidehem:2}},
    {label:"標準",  vals:{w:80,  h:50, ratio:1.3, pocket:4, bothem:4, sidehem:2}},
    {label:"腰窓",  vals:{w:120, h:60, ratio:1.4, pocket:5, bothem:5, sidehem:2.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)*p.ratio+cm(p.sidehem)*2;
    const PK=cm(p.pocket), BH=cm(p.bothem);
    const H=cm(p.h)+PK*2+BH;
    const pc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}],()=>false,0);
    return {pieces:[{
      title:"カフェカーテン", cutInfo:"1枚 ／ 裁ち切りサイズ（折り返し込み・縫い代不要）",
      ...pc, foldX:null,
      grain:{x1:W*0.5,y1:PK*2+16,x2:W*0.5,y2:H-BH-16},
      casingLines:[PK,PK*2,H-BH], casingLabel:"棒通し／裾の折り返し",
      notches:[], labelAt:{x:W*0.5,y:H*0.5}
    }],
    memo:`裁ち切り 幅${(W/10).toFixed(0)}cm × 丈${(H/10).toFixed(0)}cm ／ 長方形なので印刷せず直接裁つのが手軽です`};
  }
};

/* ---- コースター ---- */
PATTERNS.coaster={
  mode:"home",
  name:"コースター",
  note:"表布・裏布を中表に縫って返すだけの、5分でできるコースター。角を丸くすると返しやすく、やさしい印象に。ハギレの消費にぴったりで、まとめて作ればちょっとした贈り物にもなります。",
  params:[
    {key:"size",  label:"一辺の長さ", unit:"cm",min:7, max:16, step:0.5,val:10},
    {key:"round", label:"角の丸み",   unit:"cm",min:0, max:5,  step:0.5,val:2},
  ],
  presets:[
    {label:"標準",  vals:{size:10, round:2}},
    {label:"大きめ",vals:{size:12, round:2.5}},
    {label:"丸",    vals:{size:10, round:5}},
  ],
  toggles:[],
  gen(p,sa){
    const S=cm(p.size), R=Math.min(cm(p.round),S/2);
    let fin=[];
    if(R>0){
      fin.push({x:R,y:0},{x:S-R,y:0});
      fin=fin.concat(quad({x:S-R,y:0},{x:S,y:0},{x:S,y:R},8));
      fin.push({x:S,y:S-R});
      fin=fin.concat(quad({x:S,y:S-R},{x:S,y:S},{x:S-R,y:S},8));
      fin.push({x:R,y:S});
      fin=fin.concat(quad({x:R,y:S},{x:0,y:S},{x:0,y:S-R},8));
      fin.push({x:0,y:R});
      fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    }else{ fin=[{x:0,y:0},{x:S,y:0},{x:S,y:S},{x:0,y:S}]; }
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"コースター本体", cutInfo:"表布・裏布 各1枚（＋キルト芯）／返し口を残して縫い表に返す",
      ...pc, foldX:null,
      grain:{x1:S*0.5,y1:R+5,x2:S*0.5,y2:S-R-5},
      notches:[], labelAt:{x:S*0.5,y:S*0.5}
    }],
    memo:`角の丸みを一辺の半分（${(p.size/2).toFixed(1)}cm）にすると円形になります`};
  }
};

/* ---- 鍋つかみミトン ---- */
PATTERNS.ovenmitt={
  mode:"home",
  name:"鍋つかみミトン",
  note:"手を差し込んで使うミトン型の鍋つかみ。表布・裏布のあいだにキルト芯を2枚重ねると、熱がしっかり防げます。手首まで覆う長さにすると、オーブンからの出し入れも安心です。",
  params:[
    {key:"handw", label:"手のひら幅", unit:"cm",min:8, max:14, step:0.5,val:11},
    {key:"len",   label:"全長",       unit:"cm",min:18,max:34, step:0.5,val:26},
    {key:"thumb", label:"親指の張り出し",unit:"cm",min:2,max:7, step:0.5,val:4},
    {key:"loop",  label:"ループ長さ", unit:"cm",min:5, max:14, step:0.5,val:9},
  ],
  presets:[
    {label:"標準",  vals:{handw:11, len:26, thumb:4,   loop:9}},
    {label:"大きめ",vals:{handw:12.5,len:30, thumb:4.5, loop:10}},
    {label:"短め",  vals:{handw:11, len:21, thumb:4,   loop:8}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.handw), L=cm(p.len), TB=cm(p.thumb);
    const cx=TB;
    let fin=[{x:cx,y:L}];
    // 手首→手のひら外側→指先の丸み
    fin.push({x:cx,y:L*0.34});
    fin=fin.concat(quad({x:cx,y:L*0.34},{x:cx,y:cm(1)},{x:cx+W*0.42,y:0},12));
    fin=fin.concat(quad({x:cx+W*0.42,y:0},{x:cx+W,y:cm(1.5)},{x:cx+W,y:L*0.30},12));
    // 親指側へ下る
    fin.push({x:cx+W,y:L});
    const pc=pieceFrom(fin,()=>false,sa);
    // 親指
    const th=[];
    const tw=TB*2, tl=L*0.32;
    th.push({x:0,y:tl});
    th.push(...quad({x:0,y:tl},{x:0,y:0},{x:tw*0.5,y:0},10));
    th.push(...quad({x:tw*0.5,y:0},{x:tw,y:0},{x:tw,y:tl},10));
    const tpc=pieceFrom(th,()=>false,sa);
    const LL=cm(p.loop), LW=cm(4);
    const lpc=pieceFrom([{x:0,y:0},{x:LL,y:0},{x:LL,y:LW},{x:0,y:LW}],()=>false,sa);
    return {pieces:[
      {title:"ミトン本体", cutInfo:"4枚（表2・裏2）＋キルト芯2枚 ／ 左右対称に裁つ",
       ...pc, foldX:null,
       grain:{x1:cx+W*0.5,y1:L*0.25,x2:cx+W*0.5,y2:L-10},
       notches:[{x:cx,y:L*0.34}], labelAt:{x:cx+W*0.5,y:L*0.6}},
      {title:"親指", cutInfo:"4枚（表2・裏2）／合印を本体の合印に合わせて縫い付ける", ...tpc, foldX:null,
       grain:{x1:tw*0.5,y1:8,x2:tw*0.5,y2:tl-8},
       notches:[{x:tw,y:tl}], labelAt:{x:tw*0.5,y:tl*0.6}},
      {title:"つり下げループ", cutInfo:"1本（4つ折りにして縫い、手首側に挟む）", ...lpc, foldX:null,
       grain:{x1:LL*0.2,y1:LW/2,x2:LL*0.8,y2:LW/2},
       notches:[], labelAt:{x:LL*0.5,y:LW*0.5}}
    ],
    memo:`左右1組で使うなら同じ型紙を反転して2組作ります ／ キルト芯は2枚重ねると安心`};
  }
};

/* ============================================================
   2026-08 追加バッチ（リクエストリスト対応）
   ============================================================ */

/* ---- ガウン ---- */
PATTERNS.gown={
  mode:"human",
  name:"ガウン",
  note:"前を開けて羽織るローブ型のガウン。後身頃1枚＋前身頃2枚＋袖2枚＋腰ひも。ボタンもファスナーもいらず、腰ひもで結ぶだけ。ワッフル地やガーゼで作るとバスローブに、リネンで作れば夏の羽織りになります。",
  params:[
    {key:"bust",     label:"バスト",       unit:"cm",min:76,max:120,step:1,  val:92},
    {key:"len",      label:"着丈",         unit:"cm",min:70,max:130,step:1,  val:100},
    {key:"shoulder", label:"肩幅",         unit:"cm",min:34,max:52, step:0.5,val:40},
    {key:"sleeve",   label:"袖丈",         unit:"cm",min:20,max:62, step:1,  val:52},
    {key:"lapel",    label:"衿の折り返し幅",unit:"cm",min:4, max:12, step:0.5,val:7},
    {key:"ease",     label:"ゆとり（総量）",unit:"cm",min:8, max:30, step:1,  val:18},
  ],
  presets:[
    {label:"レディースM",vals:{bust:88, len:95, shoulder:38,sleeve:50,lapel:7, ease:18}},
    {label:"メンズM",    vals:{bust:96, len:105,shoulder:43,sleeve:56,lapel:8, ease:20}},
    {label:"ショート丈", vals:{bust:92, len:78, shoulder:40,sleeve:34,lapel:6, ease:18}},
  ],
  toggles:[],
  gen(p,sa){
    const HB=(cm(p.bust)+cm(p.ease))/2;      // 身頃 半身幅
    const L=cm(p.len), SH=cm(p.shoulder)/2, SL=cm(p.sleeve), LP=cm(p.lapel);
    const arm=L*0.30;                        // 袖ぐり深さ
    const neck=SH*0.42;                      // 衿ぐり幅
    // 袖ぐりのカーブ。身頃にもこの曲線をそのまま入れ、袖山もこの実長から出すので、
    // 袖ぐりと袖山の長さが必ず一致する。
    const armCurve=quad({x:SH,y:cm(1.5)},{x:(SH+HB/2)/2,y:cm(1.5)+(arm-cm(1.5))*0.45},{x:HB/2,y:arm},10);
    // 後身頃（中心わ）
    const back=[
      {x:0,y:0},{x:neck,y:0},
      ...quad({x:neck,y:0},{x:SH*0.8,y:0},{x:SH,y:cm(1.5)},8),
      ...armCurve,{x:HB/2,y:L},{x:0,y:L}
    ];
    const bpc=pieceFrom(back,(a,b)=>a.x<1e-6&&b.x<1e-6,sa);
    // 前身頃（前端に見返し分を足す）
    const front=[
      {x:0,y:0},{x:neck,y:0},
      ...quad({x:neck,y:0},{x:SH*0.8,y:0},{x:SH,y:cm(1.5)},8),
      ...armCurve,{x:HB/2,y:L},{x:-LP,y:L},{x:-LP,y:cm(2)}
    ];
    const fpc=pieceFrom(front,()=>false,sa);
    // 袖：袖山の縫い線が袖ぐり（前後の合計）と釣り合うよう、いせ分だけ長くする
    const armSeam=arcLen({x:SH,y:cm(1.5)},armCurve)*2; const armLen=armSeam;
    const capH=cm(3.5), cuffRatio=0.72;
    // 袖山カーブは直線より少し長くなるので、その分を見込んで幅を決める
    const capFull=armLen, cx=capFull/2, cuffW=capFull*cuffRatio;
    let sl=[{x:0,y:capH}];
    sl=sl.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sl=sl.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sl.push({x:(capFull+cuffW)/2,y:SL},{x:(capFull-cuffW)/2,y:SL});
    const spc=pieceFrom(sl,()=>false,sa);
    // 腰ひも
    const TL=cm(p.bust)+cm(60), TW=cm(6);
    const tpc=pieceFrom([{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}],()=>false,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後 1枚", ...bpc, foldX:0,
       grain:{x1:HB*0.28,y1:arm+20,x2:HB*0.28,y2:L-20},
       notches:[{x:HB/2,y:arm}], labelAt:{x:HB*0.26,y:L*0.6}},
      {title:"前身頃", cutInfo:"2枚（左右）／前端の見返し分を折り返して衿にする", ...fpc, foldX:null,
       grain:{x1:HB*0.25,y1:arm+20,x2:HB*0.25,y2:L-20},
       notches:[{x:HB/2,y:arm},{x:0,y:L}], labelAt:{x:HB*0.24,y:L*0.6}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+15,x2:cx,y2:SL-15},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.62}},
      {title:"腰ひも", cutInfo:"1本（4つ折りにして縫う）／ベルト通しを脇に付けると落ちません", ...tpc, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`前端の見返し ${p.lapel}cm を折り返すと衿になります ／ 着丈 ${p.len}cm`};
  }
};

/* ---- ノーカラージャケット ---- */
PATTERNS.nocollarjacket={
  mode:"human",
  name:"ノーカラージャケット",
  note:"衿のない前開きジャケット。衿付けがないぶん、ジャケットの中でいちばん作りやすい形です。後身頃1枚＋前身頃2枚＋袖2枚＋見返し。衿ぐりは見返しで始末します。ツイードやリネンで。",
  params:[
    {key:"bust",     label:"バスト",       unit:"cm",min:76,max:116,step:1,  val:88},
    {key:"len",      label:"着丈",         unit:"cm",min:45,max:85, step:1,  val:58},
    {key:"shoulder", label:"肩幅",         unit:"cm",min:34,max:48, step:0.5,val:38},
    {key:"sleeve",   label:"袖丈",         unit:"cm",min:18,max:62, step:1,  val:56},
    {key:"ease",     label:"ゆとり（総量）",unit:"cm",min:6, max:20, step:1,  val:12},
  ],
  presets:[
    {label:"レディースS",vals:{bust:82,len:54,shoulder:36,sleeve:54,ease:12}},
    {label:"レディースM",vals:{bust:88,len:58,shoulder:38,sleeve:56,ease:12}},
    {label:"ゆったり",   vals:{bust:96,len:64,shoulder:41,sleeve:58,ease:18}},
  ],
  toggles:[],
  gen(p,sa){
    const HB=(cm(p.bust)+cm(p.ease))/2, L=cm(p.len), SH=cm(p.shoulder)/2, SL=cm(p.sleeve);
    const arm=L*0.42, neck=SH*0.40;
    const back=[
      {x:0,y:0},{x:neck,y:0},
      ...quad({x:neck,y:0},{x:SH*0.82,y:0},{x:SH,y:cm(1.5)},8),
      {x:HB/2,y:arm},{x:HB/2,y:L},{x:0,y:L}
    ];
    const bpc=pieceFrom(back,(a,b)=>a.x<1e-6&&b.x<1e-6,sa);
    const front=[
      ...quad({x:0,y:neck*0.9},{x:neck*0.2,y:0},{x:neck,y:0},10),
      ...quad({x:neck,y:0},{x:SH*0.82,y:0},{x:SH,y:cm(1.5)},8),
      {x:HB/2,y:arm},{x:HB/2,y:L},{x:0,y:L}
    ];
    const fpc=pieceFrom(front,()=>false,sa);
    // 袖：袖幅は身頃の袖ぐり実長に合わせ、パーツの高さがそのまま袖丈になるようにします。
    const armCurve=quad({x:SH,y:cm(1.5)},{x:(SH+HB/2)/2,y:cm(1.5)+(arm-cm(1.5))*0.45},{x:HB/2,y:arm},10);
    const armSeam=arcLen({x:SH,y:cm(1.5)},armCurve)*2, capFull=armSeam, capH=cm(3), cx=capFull/2, cuffW=capFull*0.62;
    let sl=[{x:0,y:capH}];
    sl=sl.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sl=sl.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sl.push({x:(capFull+cuffW)/2,y:SL},{x:(capFull-cuffW)/2,y:SL});
    const spc=pieceFrom(sl,()=>false,sa);
    const FW=cm(7);
    const fac=[{x:0,y:0},{x:FW,y:0},{x:FW,y:L},{x:0,y:L}];
    const facpc=pieceFrom(fac,()=>false,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後 1枚", ...bpc, foldX:0,
       grain:{x1:HB*0.28,y1:arm+15,x2:HB*0.28,y2:L-15},
       notches:[{x:HB/2,y:arm}], labelAt:{x:HB*0.26,y:L*0.65}},
      {title:"前身頃", cutInfo:"2枚（左右）", ...fpc, foldX:null,
       grain:{x1:HB*0.26,y1:arm+15,x2:HB*0.26,y2:L-15},
       notches:[{x:HB/2,y:arm}], labelAt:{x:HB*0.24,y:L*0.65}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+15,x2:cx,y2:SL-15},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.62}},
      {title:"前見返し", cutInfo:"2枚（左右）／前端と衿ぐりを裏から始末する", ...facpc, foldX:null,
       grain:{x1:FW/2,y1:15,x2:FW/2,y2:L-15},
       notches:[], labelAt:{x:FW*0.5,y:L*0.5}}
    ],
    memo:`衿がないので衿ぐりは見返しで始末します ／ 着丈 ${p.len}cm`};
  }
};

/* ---- カーゴパンツ ---- */
PATTERNS.cargopants={
  mode:"human",
  name:"カーゴパンツ",
  note:"脇に大きな貼りポケットが付いたワークパンツ。前後パンツ＋ポケット＋ポケットのフタ。ウエストはゴムなのでファスナーもボタンも不要です。チノやリップストップなど、張りのある生地で。",
  params:[
    {key:"hip",    label:"ヒップ",         unit:"cm",min:80,max:120,step:1,val:92},
    {key:"rise",   label:"股上",           unit:"cm",min:24,max:36, step:0.5,val:29},
    {key:"inseam", label:"股下",           unit:"cm",min:20,max:82, step:1,val:70},
    {key:"hem",    label:"裾まわり",       unit:"cm",min:28,max:56, step:1,val:40},
    {key:"pockw",  label:"脇ポケット幅",   unit:"cm",min:10,max:20, step:0.5,val:15},
    {key:"pockh",  label:"脇ポケット高さ", unit:"cm",min:12,max:24, step:0.5,val:18},
    {key:"ease",   label:"ゆとり（総量）", unit:"cm",min:6, max:24, step:1,val:14},
    {key:"casing", label:"ウエスト折り返し",unit:"cm",min:2.5,max:6,step:0.5,val:4},
  ],
  presets:[
    {label:"レディースM",vals:{hip:90, rise:28,inseam:66,hem:38,pockw:14,pockh:17,ease:14,casing:4}},
    {label:"メンズM",    vals:{hip:96, rise:30,inseam:74,hem:44,pockw:16,pockh:19,ease:16,casing:4}},
    {label:"ハーフ丈",   vals:{hip:92, rise:29,inseam:26,hem:52,pockw:15,pockh:18,ease:14,casing:4}},
  ],
  toggles:[],
  gen(p,sa){
    const Q=(cm(p.hip)+cm(p.ease))/4, R=cm(p.rise), IN=cm(p.inseam);
    const HEM=cm(p.hem)/2, CA=cm(p.casing), crotch=Q*0.30;
    const pant2=[
      {x:0,y:0},{x:Q,y:0},
      ...quad({x:Q,y:0},{x:Q,y:R*0.72},{x:Q+crotch,y:R},10),
      {x:HEM,y:R+IN},{x:0,y:R+IN}
    ];
    const ppc=pieceFrom(pant2,(a,b)=>Math.abs(a.x)<1e-6&&Math.abs(b.x)<1e-6,sa);
    const PW=cm(p.pockw), PH=cm(p.pockh);
    const pkpc=pieceFrom([{x:0,y:0},{x:PW,y:0},{x:PW,y:PH},{x:0,y:PH}],()=>false,sa);
    const FH=PH*0.32;
    const flpc=pieceFrom([{x:0,y:0},{x:PW+cm(1),y:0},{x:PW+cm(1),y:FH},{x:0,y:FH}],()=>false,sa);
    return {pieces:[
      {title:"前/後パンツ", cutInfo:"前後それぞれ2枚（左右）計4枚／脇線を「わ」にせず、脇と股下を縫う", ...ppc, foldX:0,
       grain:{x1:Q*0.45,y1:R+20,x2:Q*0.45,y2:R+IN-20},
       notches:[{x:0,y:CA},{x:Q+crotch,y:R}], labelAt:{x:Q*0.42,y:(R+IN)*0.6}},
      {title:"脇ポケット", cutInfo:"2枚（左右の脇に付ける）／上端を三つ折りし、まわりを折り込んで縫い付ける", ...pkpc, foldX:null,
       grain:{x1:PW/2,y1:10,x2:PW/2,y2:PH-10},
       notches:[], labelAt:{x:PW*0.5,y:PH*0.55}},
      {title:"ポケットのフタ", cutInfo:"2枚（表布・裏布 各2枚）／中表に縫って返し、ポケットの上に付ける", ...flpc, foldX:null,
       grain:{x1:(PW+cm(1))/2,y1:8,x2:(PW+cm(1))/2,y2:FH-8},
       notches:[], labelAt:{x:(PW+cm(1))*0.5,y:FH*0.55}}
    ],
    memo:`ウエストはゴム（折り返し ${p.casing}cm）／ 股下 ${p.inseam}cm ／ 脇ポケット ${p.pockw}×${p.pockh}cm`};
  }
};

/* ---- 半纏（はんてん） ---- */
PATTERNS.hanten={
  mode:"human",
  name:"半纏（はんてん）",
  note:"綿入りの和風の羽織り。すべて直線裁ちで、身頃2枚（肩わ）＋袖2枚＋衿の構成です。中に薄い綿（キルト芯）を挟むと、市販の半纏のような暖かさになります。前は打ち合わせるだけで、ひもやひも留めで結びます。",
  params:[
    {key:"width", label:"身幅（片身）", unit:"cm",min:26,max:44, step:0.5,val:34},
    {key:"len",   label:"着丈",         unit:"cm",min:55,max:95, step:1,  val:75},
    {key:"sleeve",label:"袖丈",         unit:"cm",min:20,max:45, step:0.5,val:32},
    {key:"sleeveh",label:"袖幅（袖付け丈）",unit:"cm",min:26,max:44,step:0.5,val:34},
    {key:"collar",label:"衿幅（仕上がり）",unit:"cm",min:5, max:12, step:0.5,val:8},
  ],
  presets:[
    {label:"子供",  vals:{width:26,len:56,sleeve:22,sleeveh:26,collar:6}},
    {label:"レディース",vals:{width:32,len:72,sleeve:30,sleeveh:32,collar:8}},
    {label:"メンズ",vals:{width:36,len:80,sleeve:34,sleeveh:36,collar:9}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.width), L=cm(p.len), SL=cm(p.sleeve), SH=cm(p.sleeveh), CW=cm(p.collar);
    // 身頃（肩を「わ」にして前後続き裁ち）
    const body=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:L*2},{x:0,y:L*2}],
      (a,b)=>Math.abs(a.y)<1e-6&&Math.abs(b.y)<1e-6,sa);
    const sl=pieceFrom([{x:0,y:0},{x:SL*2,y:0},{x:SL*2,y:SH},{x:0,y:SH}],
      (a,b)=>Math.abs(a.x)<1e-6&&Math.abs(b.x)<1e-6,sa);
    const CL=L+cm(p.width)*0.6;
    const col=pieceFrom([{x:0,y:0},{x:CW*2,y:0},{x:CW*2,y:CL},{x:0,y:CL}],()=>false,sa);
    return {pieces:[
      {title:"身頃", cutInfo:"2枚（左右）／肩を「わ」に置き、前後続きで裁つ。前中心を切り開く", ...body, foldY:0,
       grain:{x1:W*0.5,y1:L*0.3,x2:W*0.5,y2:L*1.7},
       notches:[{x:W,y:L-SH/2},{x:W,y:L+SH/2}], labelAt:{x:W*0.5,y:L*1.2}},
      {title:"袖", cutInfo:"2枚（左右）／袖の中心を「わ」に置く。袖口以外を縫って筒にする", ...sl, foldX:0,
       grain:{x1:SL,y1:SH*0.25,x2:SL,y2:SH*0.75},
       notches:[{x:0,y:SH/2}], labelAt:{x:SL,y:SH*0.55}},
      {title:"衿", cutInfo:"1本（二つ折りにして前端から衿ぐりを通し、反対の前端まで付ける）", ...col, foldX:null,
       grain:{x1:CW,y1:CL*0.15,x2:CW,y2:CL*0.85},
       notches:[{x:CW,y:CL/2}], labelAt:{x:CW,y:CL*0.5}}
    ],
    memo:`すべて直線裁ち ／ 中にキルト芯を挟むと綿入りになります ／ 着丈 ${p.len}cm`};
  }
};

/* ---- キッズシャツ ---- */
PATTERNS.kidsshirt={
  mode:"kids",
  name:"キッズシャツ",
  note:"子供用の前開きシャツ。前身頃2枚＋後身頃＋袖2枚＋衿。ボタンは3〜5個で足ります。入園入学の通園服にも、休日のお出かけにも。オックスやブロード、リネンで。",
  params:[
    {key:"chest",    label:"胸囲",         unit:"cm",min:48,max:80, step:1,  val:60},
    {key:"len",      label:"着丈",         unit:"cm",min:32,max:60, step:1,  val:42},
    {key:"shoulder", label:"肩幅",         unit:"cm",min:22,max:36, step:0.5,val:28},
    {key:"sleeve",   label:"袖丈",         unit:"cm",min:8, max:44, step:1,  val:16},
    {key:"placket",  label:"打ち合わせ幅", unit:"cm",min:2, max:4,  step:0.5,val:2.5},
    {key:"ease",     label:"ゆとり（総量）",unit:"cm",min:6, max:18, step:1,  val:12},
  ],
  presets:[
    {label:"90cm", vals:{chest:52,len:36,shoulder:24,sleeve:12,placket:2.5,ease:10}},
    {label:"110cm",vals:{chest:58,len:42,shoulder:27,sleeve:15,placket:2.5,ease:12}},
    {label:"130cm",vals:{chest:66,len:48,shoulder:31,sleeve:18,placket:3,  ease:12}},
  ],
  toggles:[],
  gen(p,sa){
    const HB=(cm(p.chest)+cm(p.ease))/2, L=cm(p.len), SH=cm(p.shoulder)/2, SL=cm(p.sleeve), PL=cm(p.placket);
    const arm=L*0.42, neck=SH*0.44;
    const back=[
      {x:0,y:0},{x:neck,y:0},
      ...quad({x:neck,y:0},{x:SH*0.82,y:0},{x:SH,y:cm(1.2)},8),
      {x:HB/2,y:arm},{x:HB/2,y:L},{x:0,y:L}
    ];
    const bpc=pieceFrom(back,(a,b)=>a.x<1e-6&&b.x<1e-6,sa);
    const fNeckCurve=quad({x:0,y:neck*0.75},{x:neck*0.25,y:0},{x:neck,y:0},10);
    const front=[
      ...fNeckCurve,
      ...quad({x:neck,y:0},{x:SH*0.82,y:0},{x:SH,y:cm(1.2)},8),
      {x:HB/2,y:arm},{x:HB/2,y:L},{x:-PL,y:L},{x:-PL,y:neck*0.75}
    ];
    const fpc=pieceFrom(front,()=>false,sa);
    // 袖：袖幅は身頃の袖ぐり実長に合わせ、パーツの高さがそのまま袖丈になるようにします。
    const armCurve=quad({x:SH,y:cm(1.2)},{x:(SH+HB/2)/2,y:cm(1.2)+(arm-cm(1.2))*0.45},{x:HB/2,y:arm},10);
    const armSeam=arcLen({x:SH,y:cm(1.5)},armCurve)*2, capFull=armSeam, capH=cm(2.5), cx=capFull/2, cuffW=capFull*0.78;
    let sl=[{x:0,y:capH}];
    sl=sl.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sl=sl.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sl.push({x:(capFull+cuffW)/2,y:SL},{x:(capFull-cuffW)/2,y:SL});
    const spc=pieceFrom(sl,()=>false,sa);
    // 衿の長さは衿ぐりの実長から出す（前立て分も足す）。
    // 場当たりの係数で決めると衿が届かなくなる。
    const backNeck=neck, frontNeck=arcLen({x:0,y:neck*0.75},fNeckCurve);
    const neckSeam=(backNeck+frontNeck)*2;
    const CL=neckSeam+PL*2, CH=cm(4);
    const cpc=pieceFrom([{x:0,y:0},{x:CL,y:0},{x:CL,y:CH},{x:0,y:CH}],()=>false,sa);
    return {pieces:[
      {title:"後身頃", cutInfo:"中心を「わ」／後 1枚", ...bpc, foldX:0,
       grain:{x1:HB*0.28,y1:arm+12,x2:HB*0.28,y2:L-12},
       notches:[{x:HB/2,y:arm}], labelAt:{x:HB*0.26,y:L*0.66}},
      {title:"前身頃", cutInfo:"2枚（左右）／前端に打ち合わせ分が付いています", ...fpc, foldX:null,
       grain:{x1:HB*0.26,y1:arm+12,x2:HB*0.26,y2:L-12},
       notches:[{x:HB/2,y:arm},{x:0,y:L}], labelAt:{x:HB*0.24,y:L*0.66}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+10,x2:cx,y2:SL-10},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.62}},
      {title:"衿（スタンドカラー）", seamLen:neckSeam, cutInfo:"表布・裏布 各1枚／中表に縫って返し、衿ぐりに挟んで付ける", ...cpc, foldX:null,
       grain:{x1:CL*0.5,y1:6,x2:CL*0.5,y2:CH-6},
       notches:[{x:CL/2,y:0}], labelAt:{x:CL*0.5,y:CH*0.55}}
    ],
    memo:`ボタンは3〜5個 ／ 打ち合わせ ${p.placket}cm ／ 着丈 ${p.len}cm`};
  }
};

/* ---- 授乳ケープ ---- */
PATTERNS.nursingcape={
  mode:"baby",
  name:"授乳ケープ",
  note:"外出先で授乳するときに前を覆うケープ。1枚の布の上端をギャザーで絞り、首ひもで吊るします。上端にワイヤーを通すと胸元が開いて、赤ちゃんの様子が見えます。ダブルガーゼや薄手コットンで。",
  params:[
    {key:"w",     label:"仕上がり幅",     unit:"cm",min:60,max:110,step:1,  val:80},
    {key:"h",     label:"丈",             unit:"cm",min:50,max:85, step:1,  val:68},
    {key:"gather",label:"上端のギャザー量",unit:"cm",min:10,max:40, step:1,  val:24},
    {key:"strap", label:"首ひも長さ",     unit:"cm",min:50,max:90, step:1,  val:70},
  ],
  presets:[
    {label:"コンパクト",vals:{w:70, h:60, gather:20,strap:64}},
    {label:"標準",      vals:{w:80, h:68, gather:24,strap:70}},
    {label:"たっぷり",  vals:{w:96, h:76, gather:30,strap:76}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.gather), H=cm(p.h);
    const body=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}],()=>false,sa);
    const SL=cm(p.strap), SW=cm(5);
    const st=pieceFrom([{x:0,y:0},{x:SL,y:0},{x:SL,y:SW},{x:0,y:SW}],()=>false,sa);
    const wireLen=cm(p.w)*0.45, wpc=pieceFrom([{x:0,y:0},{x:wireLen,y:0},{x:wireLen,y:cm(4)},{x:0,y:cm(4)}],()=>false,sa);
    return {pieces:[
      {title:"ケープ本体", cutInfo:"1枚／上端にギャザーを寄せて首ひもを付ける",...body, foldX:null,
       grain:{x1:W*0.5,y1:20,x2:W*0.5,y2:H-20},
       notches:[{x:W*0.5,y:0},{x:W*0.28,y:0},{x:W*0.72,y:0}], labelAt:{x:W*0.5,y:H*0.55}},
      {title:"首ひも", cutInfo:"1本（4つ折りにして縫う）／長さ調節のアジャスターを入れると便利", ...st, foldX:null,
       grain:{x1:SL*0.2,y1:SW/2,x2:SL*0.8,y2:SW/2},
       notches:[], labelAt:{x:SL*0.5,y:SW*0.5}},
      {title:"ワイヤー通し", cutInfo:"1本（上端中央の裏に縫い付け、手芸用ワイヤーを通す）", ...wpc, foldX:null,
       grain:{x1:wireLen*0.2,y1:cm(2),x2:wireLen*0.8,y2:cm(2)},
       notches:[], labelAt:{x:wireLen*0.5,y:cm(2)}}
    ],
    memo:`本体幅は仕上がり ${p.w}cm ＋ ギャザー分 ${p.gather}cm ／ 丈 ${p.h}cm`};
  }
};

/* ---- ベビーカーシート ---- */
PATTERNS.strollerseat={
  mode:"baby",
  name:"ベビーカーシート",
  note:"ベビーカーやチャイルドシートに敷く、背もたれと座面が続いた1枚のシート。汗や食べこぼしからベビーカー本体を守ります。ベルトを通す穴の位置は、お使いのベビーカーに合わせて調整してください。ガーゼやタオル地で。",
  params:[
    {key:"backw", label:"背もたれの幅", unit:"cm",min:24,max:42, step:0.5,val:32},
    {key:"backh", label:"背もたれの高さ",unit:"cm",min:30,max:55, step:0.5,val:42},
    {key:"seatw", label:"座面の幅",     unit:"cm",min:22,max:40, step:0.5,val:30},
    {key:"seath", label:"座面の奥行",   unit:"cm",min:20,max:40, step:0.5,val:28},
    {key:"round", label:"角の丸み",     unit:"cm",min:0, max:8,  step:0.5,val:4},
  ],
  presets:[
    {label:"A型ベビーカー",vals:{backw:32,backh:44,seatw:30,seath:30,round:4}},
    {label:"B型ベビーカー",vals:{backw:28,backh:38,seatw:26,seath:26,round:4}},
    {label:"チャイルドシート",vals:{backw:34,backh:48,seatw:32,seath:30,round:5}},
  ],
  toggles:[],
  gen(p,sa){
    const BW=cm(p.backw), BH=cm(p.backh), SW=cm(p.seatw), SD=cm(p.seath), R=clampR(cm(p.round),BW,SW,BH*2,SD*2);
    const cx=BW/2, hs=SW/2, hb=BW/2;
    const total=BH+SD;
    const fin=[
      {x:cx-hb+R,y:0},
      ...quad({x:cx-hb+R,y:0},{x:cx-hb,y:0},{x:cx-hb,y:R},6),
      {x:cx-hb,y:BH},
      {x:cx-hs,y:BH+cm(1)},
      {x:cx-hs,y:total-R},
      ...quad({x:cx-hs,y:total-R},{x:cx-hs,y:total},{x:cx-hs+R,y:total},6),
      {x:cx+hs-R,y:total},
      ...quad({x:cx+hs-R,y:total},{x:cx+hs,y:total},{x:cx+hs,y:total-R},6),
      {x:cx+hs,y:BH+cm(1)},
      {x:cx+hb,y:BH},
      {x:cx+hb,y:R},
      ...quad({x:cx+hb,y:R},{x:cx+hb,y:0},{x:cx+hb-R,y:0},6)
    ];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[
      {title:"シート本体", cutInfo:"表布・裏布 各1枚（＋キルト芯1枚）／返し口を残して縫い、表に返す", ...pc, foldX:null,
       grain:{x1:cx,y1:20,x2:cx,y2:total-20},
       notches:[{x:cx-hs*0.55,y:BH*0.55},{x:cx+hs*0.55,y:BH*0.55},{x:cx,y:total-cm(3)}],
       labelAt:{x:cx,y:total*0.62}}
    ],
    memo:`ベルト穴の位置（合印）はお使いのベビーカーに合わせて調整してください ／ 背 ${p.backh}cm＋座面 ${p.seath}cm`};
  }
};

/* ---- ペンケース ---- */
PATTERNS.pencase={
  mode:"small",
  name:"ペンケース",
  note:"ファスナーを付けた箱型のペンケース。本体1枚（底わ）を筒に縫って、底角にマチを取るだけ。接着芯を貼ると自立します。倒して使えばペン立てにもなります。帆布やコーデュロイで。",
  params:[
    {key:"w",      label:"仕上がり幅",   unit:"cm",min:14,max:26, step:0.5,val:20},
    {key:"h",      label:"仕上がり高さ", unit:"cm",min:5, max:12, step:0.5,val:7},
    {key:"gusset", label:"マチ（奥行）", unit:"cm",min:3, max:10, step:0.5,val:6},
  ],
  presets:[
    {label:"スリム",vals:{w:19,h:5.5,gusset:4}},
    {label:"標準",  vals:{w:20,h:7,  gusset:6}},
    {label:"大容量",vals:{w:22,h:9,  gusset:8}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset);
    const bw=W+G, bh=(H+G/2)*2;   // 底わの1枚裁ち
    const pc=pieceFrom([{x:0,y:0},{x:bw,y:0},{x:bw,y:bh},{x:0,y:bh}],
      (a,b)=>Math.abs(a.y-bh/2)<1e-6&&Math.abs(b.y-bh/2)<1e-6,sa);
    const tab=pieceFrom([{x:0,y:0},{x:cm(4),y:0},{x:cm(4),y:cm(3)},{x:0,y:cm(3)}],()=>false,sa);
    return {pieces:[
      {title:"ケース本体", cutInfo:"底（中央）を「わ」に置いて 1枚（表布・裏布 各1枚）／脇を縫い、底角にマチを縫う", ...pc, foldY:bh/2,
       grain:{x1:bw*0.5,y1:15,x2:bw*0.5,y2:bh-15},
       notches:[{x:0,y:bh/2},{x:bw,y:bh/2}], labelAt:{x:bw*0.5,y:bh*0.28}},
      {title:"ファスナー端のタブ", cutInfo:"2枚（4つ折りにしてファスナーの両端に付ける）", ...tab, foldX:null,
       grain:{x1:cm(0.8),y1:cm(1.5),x2:cm(3.2),y2:cm(1.5)},
       notches:[], labelAt:{x:cm(2),y:cm(1.5)}}
    ],
    memo:`仕上がり 約${p.w}×${p.h}×${p.gusset}cm ／ ファスナーは仕上がり幅＋2cm 程度のものを`};
  }
};

/* ---- 通帳ケース ---- */
PATTERNS.bankbook={
  mode:"small",
  name:"通帳ケース",
  note:"通帳・カード・印鑑をまとめて入れる二つ折りケース。本体1枚＋内ポケット。ポケットを縦に縫い分けるとカード入れになります。ゴムバンドで留めると中身が落ちません。ハギレでも作れます。",
  params:[
    {key:"w",     label:"通帳の幅",     unit:"cm",min:8, max:16, step:0.5,val:13},
    {key:"h",     label:"通帳の高さ",   unit:"cm",min:6, max:16, step:0.1,val:8.7},
    {key:"count", label:"入れる冊数",   unit:"冊",min:1, max:6,  step:1,  val:3},
    {key:"pockh", label:"内ポケット高さ",unit:"cm",min:4, max:10, step:0.5,val:6},
  ],
  presets:[
    {label:"通帳1〜2冊",vals:{w:13,h:8.7,count:2,pockh:6}},
    {label:"通帳3冊",   vals:{w:13,h:8.7,count:3,pockh:6}},
    {label:"お薬手帳",  vals:{w:11,h:15, count:2,pockh:7}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h)+cm(1), thick=cm(0.35)*p.count;
    const total=W*2+thick;
    const pc=pieceFrom([{x:0,y:0},{x:total,y:0},{x:total,y:H},{x:0,y:H}],()=>false,sa);
    const PH=cm(p.pockh);
    const ppc=pieceFrom([{x:0,y:0},{x:total,y:0},{x:total,y:PH},{x:0,y:PH}],()=>false,sa);
    return {pieces:[
      {title:"ケース本体", cutInfo:"表布・裏布 各1枚／中表に縫って返し、中央で二つ折り", ...pc, foldX:total/2,
       grain:{x1:total*0.5,y1:8,x2:total*0.5,y2:H-8},
       notches:[{x:total/2,y:0},{x:total/2,y:H}], labelAt:{x:total*0.5,y:H*0.6}},
      {title:"内ポケット", cutInfo:"1〜2枚／上端を三つ折りし、縦に縫い分けてカード入れにする", ...ppc, foldX:null,
       grain:{x1:total*0.5,y1:6,x2:total*0.5,y2:PH-6},
       notches:[{x:total*0.25,y:0},{x:total*0.75,y:0}], labelAt:{x:total*0.5,y:PH*0.55}}
    ],
    memo:`通帳${p.count}冊分の厚み ${(thick/10).toFixed(1)}cm を見込んでいます ／ 折りたたみ 約${(total/2/10).toFixed(1)}×${(H/10).toFixed(1)}cm`};
  }
};

/* ---- 水筒カバー ---- */
PATTERNS.flaskcover={
  mode:"small",
  name:"水筒カバー",
  note:"水筒にかぶせる、フタ付きのショルダーカバー。底（円）＋側面＋フタ＋ショルダーひも。裏地に保冷シートを使うと保冷力が上がります。ぶつけても本体が傷つかないので、通園・通学に。",
  params:[
    {key:"dia",   label:"水筒の直径",     unit:"cm",min:5, max:12, step:0.5,val:7.5},
    {key:"h",     label:"水筒の高さ",     unit:"cm",min:12,max:32, step:0.5,val:22},
    {key:"strap", label:"ショルダーひも長さ",unit:"cm",min:50,max:130,step:1,  val:90},
    {key:"strapw",label:"ひもの裁ち幅",     unit:"cm",min:4, max:10, step:0.5,val:6},
  ],
  presets:[
    {label:"子供 480ml",vals:{dia:7,  h:20,strap:80, strapw:5}},
    {label:"標準 600ml",vals:{dia:7.5,h:23,strap:90, strapw:6}},
    {label:"大 1L",     vals:{dia:9,  h:28,strap:100,strapw:6}},
  ],
  toggles:[],
  gen(p,sa){
    const D=cm(p.dia)+cm(1), R=D/2, H=cm(p.h);
    const circ=[]; for(let i=0;i<48;i++){const t=i/48*Math.PI*2; circ.push({x:R+R*Math.cos(t),y:R+R*Math.sin(t)});}
    const bot=pieceFrom(circ,()=>false,sa);
    const CIRC=Math.PI*D;
    const side=pieceFrom([{x:0,y:0},{x:CIRC,y:0},{x:CIRC,y:H},{x:0,y:H}],()=>false,sa);
    const lid=pieceFrom(circ.map(q=>({x:q.x*1.06-R*0.06,y:q.y*1.06-R*0.06})),()=>false,sa);
    const SL=cm(p.strap), SW=cm(p.strapw);
    const st=pieceFrom([{x:0,y:0},{x:SL,y:0},{x:SL,y:SW},{x:0,y:SW}],()=>false,sa);
    return {pieces:[
      {title:"底（円）", cutInfo:"1枚（表布・裏布 各1枚）", ...bot, foldX:null,
       grain:{x1:R,y1:R*0.35,x2:R,y2:R*1.65},
       notches:[{x:R,y:0},{x:R,y:D},{x:0,y:R},{x:D,y:R}], labelAt:{x:R,y:R}},
      {title:"本体（側面）", cutInfo:"1枚（表布・裏布 各1枚）／短辺を縫って筒にし、底を付ける", ...side, foldX:null,
       grain:{x1:CIRC*0.5,y1:15,x2:CIRC*0.5,y2:H-15},
       notches:[{x:CIRC*0.25,y:H},{x:CIRC*0.5,y:H},{x:CIRC*0.75,y:H}], labelAt:{x:CIRC*0.5,y:H*0.55}},
      {title:"フタ（円）", cutInfo:"表布・裏布 各1枚／中表に縫って返し、後ろ側に付けてスナップで留める", ...lid, foldX:null,
       grain:{x1:R,y1:R*0.35,x2:R,y2:R*1.7},
       notches:[{x:R,y:0}], labelAt:{x:R,y:R*1.05}},
      {title:"ショルダーひも", cutInfo:"1本（4つ折りにして縫い、両脇に付ける）／移動カンで長さ調節を", ...st, foldX:null,
       grain:{x1:SL*0.2,y1:SW/2,x2:SL*0.8,y2:SW/2},
       notches:[], labelAt:{x:SL*0.5,y:SW*0.5}}
    ],
    memo:`直径にゆとり1cmを足しています ／ 側面の長さ ${(CIRC/10).toFixed(1)}cm（円周）`};
  }
};

/* ---- ランドセルカバー ---- */
PATTERNS.randocover={
  mode:"small",
  name:"ランドセルカバー",
  note:"ランドセルのかぶせ（フタ）に付けるカバー。雨や傷から守り、反射材を付ければ夜も安全です。1枚仕立てで、下端と両脇にゴムを通してランドセルに引っかけます。撥水生地やラミネート地で。",
  params:[
    {key:"w",     label:"かぶせの幅",   unit:"cm",min:20,max:32, step:0.5,val:24},
    {key:"h",     label:"かぶせの長さ", unit:"cm",min:28,max:46, step:0.5,val:36},
    {key:"round", label:"下端の丸み",   unit:"cm",min:2, max:14, step:0.5,val:9},
    {key:"ease",  label:"ゆとり",       unit:"cm",min:0.5,max:3, step:0.5,val:1.5},
  ],
  presets:[
    {label:"標準",  vals:{w:24,h:36,round:9, ease:1.5}},
    {label:"大きめ",vals:{w:26,h:40,round:10,ease:1.5}},
    {label:"透明カバー用",vals:{w:24,h:36,round:9,ease:2}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.ease), H=cm(p.h)+cm(p.ease), R=clampR(cm(p.round),W,H*2);
    const fin=[
      {x:0,y:0},{x:W,y:0},{x:W,y:H-R},
      ...quad({x:W,y:H-R},{x:W,y:H},{x:W-R,y:H},10),
      {x:R,y:H},
      ...quad({x:R,y:H},{x:0,y:H},{x:0,y:H-R},10)
    ];
    const pc=pieceFrom(fin,()=>false,sa);
    const rl=W*0.8;
    const ref=pieceFrom([{x:0,y:0},{x:rl,y:0},{x:rl,y:cm(2.5)},{x:0,y:cm(2.5)}],()=>false,sa);
    return {pieces:[
      {title:"カバー本体", cutInfo:"1枚（裏地を付ける場合は表布・裏布 各1枚）／まわりを三つ折りかバイアスで始末する", ...pc, foldX:null,
       grain:{x1:W*0.5,y1:15,x2:W*0.5,y2:H-15},
       notches:[{x:0,y:cm(6)},{x:W,y:cm(6)},{x:W*0.5,y:H}], labelAt:{x:W*0.5,y:H*0.55}},
      {title:"反射テープ位置", cutInfo:"市販の反射テープを下端の丸みに沿って縫い付けると、夜に目立ちます", ...ref, foldX:null,
       grain:{x1:rl*0.2,y1:cm(1.25),x2:rl*0.8,y2:cm(1.25)},
       notches:[], labelAt:{x:rl*0.5,y:cm(1.25)}}
    ],
    memo:`上端はランドセルの金具に引っかけ、下端と脇はゴムで留めます ／ かぶせ ${p.w}×${p.h}cm＋ゆとり${p.ease}cm`};
  }
};

/* ---- リコーダーケース ---- */
PATTERNS.recordercase={
  mode:"small",
  name:"リコーダーケース",
  note:"小学校で使うソプラノリコーダーを入れる細長い袋。1枚を二つ折りにして脇を縫い、上をひもで絞るだけ。名前タグを付ければ取り違えもありません。鍵盤ハーモニカのホース入れにも使えます。",
  params:[
    {key:"len",   label:"リコーダーの長さ",unit:"cm",min:24,max:50, step:0.5,val:33},
    {key:"w",     label:"袋の幅",         unit:"cm",min:5, max:12, step:0.5,val:7},
    {key:"casing",label:"ひも通し下がり", unit:"cm",min:2, max:6,  step:0.5,val:3.5},
  ],
  presets:[
    {label:"ソプラノリコーダー",vals:{len:33,w:7, casing:3.5}},
    {label:"アルトリコーダー",  vals:{len:48,w:8, casing:3.5}},
    {label:"ホース入れ",        vals:{len:28,w:9, casing:3.5}},
  ],
  toggles:[],
  gen(p,sa){
    const L=cm(p.len)+cm(4)+cm(p.casing)*2, W=cm(p.w);
    const pc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:L*2},{x:0,y:L*2}],
      (a,b)=>Math.abs(a.y-L)<1e-6&&Math.abs(b.y-L)<1e-6,sa);
    return {pieces:[
      {title:"袋本体", cutInfo:"底（中央）を「わ」に置いて 1枚／両脇を縫い（ひも通し口を残す）、上をひも通しにする", ...pc, foldY:L,
       grain:{x1:W*0.5,y1:15,x2:W*0.5,y2:L*2-15},
       notches:[{x:0,y:cm(p.casing)},{x:W,y:cm(p.casing)},{x:0,y:L*2-cm(p.casing)},{x:W,y:L*2-cm(p.casing)}],
       labelAt:{x:W*0.5,y:L*0.55}}
    ],
    memo:`リコーダー ${p.len}cm ＋ ゆとりとひも通し分 ／ 仕上がり 約${p.w}×${(cm(p.len)/10+4).toFixed(0)}cm`};
  }
};

/* ---- ぬいぐるみ服（ワンピース） ---- */
PATTERNS.nuiclothes={
  mode:"small",
  name:"ぬいぐるみ服（ワンピース）",
  note:"20cm前後のぬいぐるみに着せるワンピース。前身頃1枚＋後身頃2枚＋スカート。背中はスナップかマジックテープで留めます。お手持ちのぬいぐるみの胴回りと着丈を測って入力してください。ハギレで作れます。",
  params:[
    {key:"chest",   label:"胴回り",       unit:"cm",min:12,max:40, step:0.5,val:22},
    {key:"bodice",  label:"身頃の丈",     unit:"cm",min:3, max:12, step:0.5,val:6},
    {key:"skirt",   label:"スカート丈",   unit:"cm",min:3, max:14, step:0.5,val:7},
    {key:"shoulder",label:"肩幅",         unit:"cm",min:4, max:14, step:0.5,val:7},
    {key:"flare",   label:"スカートのふくらみ",unit:"倍",min:1.2,max:2.4,step:0.1,val:1.7},
    {key:"ease",    label:"ゆとり（総量）",unit:"cm",min:1, max:6,  step:0.5,val:2},
  ],
  presets:[
    {label:"10cmぬい",vals:{chest:14,bodice:4, skirt:4, shoulder:5, flare:1.7,ease:1.5}},
    {label:"20cmぬい",vals:{chest:22,bodice:6, skirt:7, shoulder:7, flare:1.7,ease:2}},
    {label:"30cm人形",vals:{chest:30,bodice:8, skirt:10,shoulder:9, flare:1.8,ease:2.5}},
  ],
  toggles:[],
  gen(p,sa){
    const HB=(cm(p.chest)+cm(p.ease))/2, BL=cm(p.bodice), SH=cm(p.shoulder)/2;
    const neck=SH*0.5, arm=BL*0.5;
    const front=[
      ...quad({x:0,y:neck*0.7},{x:neck*0.25,y:0},{x:neck,y:0},8),
      {x:SH,y:0},{x:HB/2,y:arm},{x:HB/2,y:BL},{x:0,y:BL}
    ];
    const fpc=pieceFrom(front,(a,b)=>a.x<1e-6&&b.x<1e-6,sa);
    const back=[
      ...quad({x:0,y:neck*0.45},{x:neck*0.25,y:0},{x:neck,y:0},8),
      {x:SH,y:0},{x:HB/2,y:arm},{x:HB/2,y:BL},{x:0,y:BL}
    ];
    const bpc=pieceFrom(back,()=>false,sa);
    const SKW=(cm(p.chest)+cm(p.ease))*p.flare/2, SKL=cm(p.skirt);
    const skpc=pieceFrom([{x:0,y:0},{x:SKW,y:0},{x:SKW,y:SKL},{x:0,y:SKL}],()=>false,sa);
    return {pieces:[
      {title:"前身頃", cutInfo:"中心を「わ」／前 1枚", ...fpc, foldX:0,
       grain:{x1:HB*0.25,y1:arm+3,x2:HB*0.25,y2:BL-3},
       notches:[{x:HB/2,y:BL}], labelAt:{x:HB*0.24,y:BL*0.7}},
      {title:"後身頃", cutInfo:"2枚（背中で開けてスナップ留め）", ...bpc, foldX:null,
       grain:{x1:HB*0.25,y1:arm+3,x2:HB*0.25,y2:BL-3},
       notches:[{x:HB/2,y:BL}], labelAt:{x:HB*0.24,y:BL*0.7}},
      {title:"スカート", cutInfo:"2枚（前・後）／上端にギャザーを寄せて身頃に付ける", ...skpc, foldX:null,
       grain:{x1:SKW*0.5,y1:4,x2:SKW*0.5,y2:SKL-4},
       notches:[{x:SKW*0.5,y:0}], labelAt:{x:SKW*0.5,y:SKL*0.55}}
    ],
    memo:`縫い代は5mmで作ると小さくてもごわつきません ／ スカートは胴回りの${p.flare}倍`};
  }
};

/* ---- コスメポーチ ---- */
PATTERNS.cosmepouch={
  mode:"bag",
  name:"コスメポーチ（自立）",
  note:"底が広く、口が開いて中が見える台形のポーチ。本体2枚＋底1枚。接着芯かキルティングで作ると自立します。化粧品を立てて入れられるので、旅行にも便利です。",
  params:[
    {key:"topw",  label:"口の幅",   unit:"cm",min:12,max:26, step:0.5,val:18},
    {key:"botw",  label:"底の幅",   unit:"cm",min:10,max:24, step:0.5,val:16},
    {key:"h",     label:"高さ",     unit:"cm",min:8, max:18, step:0.5,val:12},
    {key:"gusset",label:"底の奥行", unit:"cm",min:5, max:14, step:0.5,val:9},
  ],
  presets:[
    {label:"小さめ",vals:{topw:15,botw:13,h:10,gusset:7}},
    {label:"標準",  vals:{topw:18,botw:16,h:12,gusset:9}},
    {label:"大きめ",vals:{topw:22,botw:20,h:15,gusset:11}},
  ],
  toggles:[],
  gen(p,sa){
    const TW=cm(p.topw), BW=cm(p.botw), H=cm(p.h), G=cm(p.gusset);
    const off=(TW-BW)/2;
    const side=pieceFrom([{x:0,y:0},{x:TW,y:0},{x:TW-off,y:H},{x:off,y:H}],()=>false,sa);
    const bot=pieceFrom([{x:0,y:0},{x:BW,y:0},{x:BW,y:G},{x:0,y:G}],()=>false,sa);
    return {pieces:[
      {title:"本体（前・後）", cutInfo:"2枚（表布・裏布 各2枚）／上端にファスナーを付け、脇を縫う", ...side, foldX:null,
       grain:{x1:TW*0.5,y1:10,x2:TW*0.5,y2:H-10},
       notches:[{x:off,y:H},{x:TW-off,y:H}], labelAt:{x:TW*0.5,y:H*0.55}},
      {title:"底", cutInfo:"1枚（表布・裏布 各1枚）／本体2枚の下端に縫い付ける", ...bot, foldX:null,
       grain:{x1:BW*0.5,y1:8,x2:BW*0.5,y2:G-8},
       notches:[{x:0,y:G/2},{x:BW,y:G/2}], labelAt:{x:BW*0.5,y:G*0.5}}
    ],
    memo:`底が広い台形なので自立します ／ ファスナーは口の幅 ${p.topw}cm より 2cm 長いものを`};
  }
};

/* ---- パスポートケース ---- */
PATTERNS.passportcase={
  mode:"bag",
  name:"パスポートケース",
  note:"パスポート・航空券・カード・現地通貨をまとめて入れる二つ折りケース。本体1枚＋ポケット2種。ポケットを縦に縫い分けるとカード入れになります。旅行のたびに使えます。",
  params:[
    {key:"w",     label:"パスポートの幅", unit:"cm",min:8, max:16, step:0.5,val:12.5},
    {key:"h",     label:"パスポートの高さ",unit:"cm",min:10,max:22, step:0.5,val:17.5},
    {key:"thick", label:"入れる厚み",     unit:"cm",min:0.5,max:4, step:0.5,val:2},
    {key:"cardh", label:"カードポケット高さ",unit:"cm",min:4,max:10,step:0.5,val:6},
  ],
  presets:[
    {label:"1人分",vals:{w:12.5,h:17.5,thick:1.5,cardh:6}},
    {label:"2人分",vals:{w:12.5,h:17.5,thick:2.5,cardh:6}},
    {label:"家族4人分",vals:{w:13,h:18,thick:3.5,cardh:7}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(1), H=cm(p.h)+cm(1), T=cm(p.thick);
    const total=W*2+T;
    const pc=pieceFrom([{x:0,y:0},{x:total,y:0},{x:total,y:H},{x:0,y:H}],()=>false,sa);
    const CH=cm(p.cardh);
    const cpc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:CH},{x:0,y:CH}],()=>false,sa);
    const tpc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:H*0.62},{x:0,y:H*0.62}],()=>false,sa);
    return {pieces:[
      {title:"ケース本体", cutInfo:"表布・裏布 各1枚／中表に縫って返し、中央で二つ折り", ...pc, foldX:total/2,
       grain:{x1:total*0.5,y1:10,x2:total*0.5,y2:H-10},
       notches:[{x:total/2,y:0},{x:total/2,y:H}], labelAt:{x:total*0.5,y:H*0.62}},
      {title:"カードポケット", cutInfo:"1枚／上端を三つ折りし、縦に縫い分けてカード入れにする", ...cpc, foldX:null,
       grain:{x1:W*0.5,y1:6,x2:W*0.5,y2:CH-6},
       notches:[{x:W/2,y:0}], labelAt:{x:W*0.5,y:CH*0.55}},
      {title:"チケットポケット", cutInfo:"1枚／上端を三つ折りしてから本体裏に重ねて縫う", ...tpc, foldX:null,
       grain:{x1:W*0.5,y1:8,x2:W*0.5,y2:H*0.62-8},
       notches:[], labelAt:{x:W*0.5,y:H*0.34}}
    ],
    memo:`厚み ${p.thick}cm を見込んでいます ／ 折りたたみ 約${((W)/10).toFixed(1)}×${(H/10).toFixed(1)}cm`};
  }
};

/* ---- ノートPCケース ---- */
PATTERNS.laptopcase={
  mode:"bag",
  name:"ノートPCケース",
  note:"ノートパソコンを入れるクッション入りのスリーブ。本体1枚（底わ）にキルト芯を挟んで縫うだけ。口は面ファスナーかファスナーで留めます。お使いのPCの実寸を入力してください。",
  params:[
    {key:"pcw",   label:"PCの幅",     unit:"cm",min:22,max:42, step:0.5,val:32},
    {key:"pch",   label:"PCの奥行",   unit:"cm",min:16,max:30, step:0.5,val:22},
    {key:"thick", label:"PCの厚み",   unit:"cm",min:0.5,max:4, step:0.1,val:2},
    {key:"ease",  label:"ゆとり",     unit:"cm",min:0.5,max:3, step:0.5,val:1.5},
    {key:"flap",  label:"フタの深さ", unit:"cm",min:0, max:12, step:0.5,val:7},
  ],
  presets:[
    {label:"13インチ",vals:{pcw:31,pch:22,thick:1.7,ease:1.5,flap:7}},
    {label:"14インチ",vals:{pcw:32,pch:22.5,thick:1.8,ease:1.5,flap:7}},
    {label:"16インチ",vals:{pcw:36,pch:25,thick:2,  ease:1.5,flap:8}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.pcw)+cm(p.ease)+cm(p.thick), H=cm(p.pch)+cm(p.ease)/2, F=cm(p.flap);
    const total=H*2+F;
    const pc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:total},{x:0,y:total}],
      (a,b)=>Math.abs(a.y-total)<1e-6&&Math.abs(b.y-total)<1e-6,sa);
    return {pieces:[
      {title:"ケース本体", cutInfo:"底（下端）を「わ」に置いて 1枚（表布・裏布 各1枚＋キルト芯）／下から折り上げて両脇を縫う", ...pc, foldY:total,
       grain:{x1:W*0.5,y1:15,x2:W*0.5,y2:total-15},
       notches:[{x:0,y:F},{x:W,y:F},{x:0,y:F+H},{x:W,y:F+H}],
       labelAt:{x:W*0.5,y:total*0.7}}
    ],
    memo:`PC ${p.pcw}×${p.pch}×厚み${p.thick}cm ＋ ゆとり${p.ease}cm ／ フタ ${p.flap}cm（0でスリーブ型）`};
  }
};

/* ---- タブレットケース ---- */
PATTERNS.tabletcase={
  mode:"bag",
  name:"タブレットケース",
  note:"タブレットを入れるフタ付きのケース。本体1枚（底わ）にキルト芯を挟み、フタをスナップで留めます。学校のタブレット学習にも。ランドセルに入る薄さで作れます。",
  params:[
    {key:"tw",    label:"タブレットの幅", unit:"cm",min:14,max:30, step:0.5,val:19},
    {key:"th",    label:"タブレットの高さ",unit:"cm",min:18,max:34, step:0.5,val:25},
    {key:"thick", label:"厚み",           unit:"cm",min:0.3,max:3, step:0.1,val:1},
    {key:"ease",  label:"ゆとり",         unit:"cm",min:0.5,max:3, step:0.5,val:1.5},
    {key:"flap",  label:"フタの深さ",     unit:"cm",min:3, max:12, step:0.5,val:6},
  ],
  presets:[
    {label:"8インチ", vals:{tw:14,th:20,thick:0.8,ease:1.5,flap:5}},
    {label:"10インチ",vals:{tw:18,th:25,thick:1,  ease:1.5,flap:6}},
    {label:"12インチ",vals:{tw:22,th:29,thick:1.2,ease:1.5,flap:7}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.tw)+cm(p.ease)+cm(p.thick), H=cm(p.th)+cm(p.ease)/2, F=cm(p.flap);
    const total=H*2+F;
    const pc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:total},{x:0,y:total}],
      (a,b)=>Math.abs(a.y-total)<1e-6&&Math.abs(b.y-total)<1e-6,sa);
    return {pieces:[
      {title:"ケース本体", cutInfo:"底（下端）を「わ」に置いて 1枚（表布・裏布 各1枚＋キルト芯）／下から折り上げて両脇を縫う", ...pc, foldY:total,
       grain:{x1:W*0.5,y1:12,x2:W*0.5,y2:total-12},
       notches:[{x:0,y:F},{x:W,y:F},{x:0,y:F+H},{x:W,y:F+H}],
       labelAt:{x:W*0.5,y:total*0.7}}
    ],
    memo:`タブレット ${p.tw}×${p.th}×厚み${p.thick}cm ＋ ゆとり${p.ease}cm ／ フタ ${p.flap}cm`};
  }
};

/* ---- ウエストポーチ ---- */
PATTERNS.waistbag={
  mode:"bag",
  name:"ウエストポーチ",
  note:"腰やたすき掛けで使う小さめのポーチ。本体（底わ）＋フラップ＋ベルト。ベルトを長くすればボディバッグとしても使えます。手ぶらで動けるので、旅行や散歩、フェスに。",
  params:[
    {key:"w",     label:"仕上がり幅", unit:"cm",min:16,max:34, step:0.5,val:24},
    {key:"h",     label:"仕上がり高さ",unit:"cm",min:10,max:22, step:0.5,val:14},
    {key:"gusset",label:"マチ（奥行）",unit:"cm",min:3, max:12, step:0.5,val:7},
    {key:"flap",  label:"フラップ深さ",unit:"cm",min:5, max:16, step:0.5,val:9},
    {key:"belt",  label:"ベルト長さ", unit:"cm",min:70,max:150,step:1,  val:110},
    {key:"beltw", label:"ベルト裁ち幅",unit:"cm",min:5, max:12, step:0.5,val:8},
  ],
  presets:[
    {label:"小さめ",  vals:{w:20,h:12,gusset:5,flap:8, belt:100,beltw:7}},
    {label:"標準",    vals:{w:24,h:14,gusset:7,flap:9, belt:110,beltw:8}},
    {label:"ボディバッグ風",vals:{w:26,h:16,gusset:8,flap:10,belt:140,beltw:8}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset), F=cm(p.flap);
    const bw=W+G, bh=(H+G/2)*2;
    const pc=pieceFrom([{x:0,y:0},{x:bw,y:0},{x:bw,y:bh},{x:0,y:bh}],
      (a,b)=>Math.abs(a.y-bh/2)<1e-6&&Math.abs(b.y-bh/2)<1e-6,sa);
    const fr=Math.min(F*0.5,W*0.18);
    const fl=[
      {x:0,y:0},{x:W,y:0},{x:W,y:F-fr},
      ...quad({x:W,y:F-fr},{x:W,y:F},{x:W-fr,y:F},8),
      {x:fr,y:F},
      ...quad({x:fr,y:F},{x:0,y:F},{x:0,y:F-fr},8)
    ];
    const flpc=pieceFrom(fl,()=>false,sa);
    const BL=cm(p.belt), BW=cm(p.beltw);
    const bl=pieceFrom([{x:0,y:0},{x:BL,y:0},{x:BL,y:BW},{x:0,y:BW}],()=>false,sa);
    return {pieces:[
      {title:"ポーチ本体", cutInfo:"底（中央）を「わ」に置いて 1枚（表布・裏布 各1枚）／脇を縫い、底角にマチを縫う", ...pc, foldY:bh/2,
       grain:{x1:bw*0.5,y1:15,x2:bw*0.5,y2:bh-15},
       notches:[{x:0,y:bh/2},{x:bw,y:bh/2}], labelAt:{x:bw*0.5,y:bh*0.28}},
      {title:"フラップ", cutInfo:"表布・裏布 各1枚／中表に縫って返し、後ろ上端に付ける", ...flpc, foldX:null,
       grain:{x1:W*0.5,y1:8,x2:W*0.5,y2:F-8},
       notches:[{x:W*0.5,y:F}], labelAt:{x:W*0.5,y:F*0.5}},
      {title:"ベルト", cutInfo:"1本（4つ折りにして縫う）／バックルと移動カンで長さ調節を", ...bl, foldX:null,
       grain:{x1:BL*0.2,y1:BW/2,x2:BL*0.8,y2:BW/2},
       notches:[], labelAt:{x:BL*0.5,y:BW*0.5}}
    ],
    memo:`仕上がり 約${p.w}×${p.h}×${p.gusset}cm ／ ベルト ${p.belt}cm（たすき掛けなら140cm前後）`};
  }
};

/* ---- ボストンバッグ ---- */
PATTERNS.bostonbag={
  mode:"bag",
  name:"ボストンバッグ",
  note:"1〜2泊の旅行に使える大容量のバッグ。本体2枚（前後）＋マチ1本（底と両脇が続いた帯）＋持ち手2本。マチが1本続きなので、縫い合わせは2回で済みます。帆布やナイロンで。",
  params:[
    {key:"w",      label:"仕上がり幅",   unit:"cm",min:34,max:60, step:1,  val:45},
    {key:"h",      label:"仕上がり高さ", unit:"cm",min:22,max:40, step:1,  val:28},
    {key:"gusset", label:"マチ（奥行）", unit:"cm",min:14,max:30, step:0.5,val:20},
    {key:"handle", label:"持ち手の長さ", unit:"cm",min:38,max:70, step:1,  val:52},
    {key:"handlew",label:"持ち手の裁ち幅",unit:"cm",min:6, max:14, step:0.5,val:9},
    {key:"round",  label:"底角の丸み",   unit:"cm",min:0, max:8,  step:0.5,val:4},
  ],
  presets:[
    {label:"1泊",  vals:{w:42,h:26,gusset:18,handle:48,handlew:8, round:4}},
    {label:"2泊",  vals:{w:48,h:30,gusset:22,handle:54,handlew:9, round:4}},
    {label:"スポーツ",vals:{w:52,h:30,gusset:24,handle:58,handlew:9,round:5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset), R=clampR(cm(p.round),W,H*2);
    const side=[
      {x:0,y:0},{x:W,y:0},{x:W,y:H-R},
      ...quad({x:W,y:H-R},{x:W,y:H},{x:W-R,y:H},8),
      {x:R,y:H},
      ...quad({x:R,y:H},{x:0,y:H},{x:0,y:H-R},8)
    ];
    const spc=pieceFrom(side,()=>false,sa);
    const GL=W+H*2;           // 底＋両脇の続き帯
    const gpc=pieceFrom([{x:0,y:0},{x:G,y:0},{x:G,y:GL},{x:0,y:GL}],()=>false,sa);
    const HL=cm(p.handle), HW=cm(p.handlew);
    const hpc=pieceFrom([{x:0,y:0},{x:HL,y:0},{x:HL,y:HW},{x:0,y:HW}],()=>false,sa);
    return {pieces:[
      {title:"本体（前・後）", cutInfo:"2枚（表布・裏布 各2枚）", ...spc, foldX:null,
       grain:{x1:W*0.5,y1:15,x2:W*0.5,y2:H-15},
       notches:[{x:W*0.5,y:H},{x:0,y:H*0.5},{x:W,y:H*0.5}], labelAt:{x:W*0.5,y:H*0.55}},
      {title:"マチ（底＋両脇の続き）", cutInfo:"1本（表布・裏布 各1本）／中央を底に合わせ、両脇を上まで縫い上げる", ...gpc, foldX:null,
       grain:{x1:G*0.5,y1:20,x2:G*0.5,y2:GL-20},
       notches:[{x:0,y:GL/2},{x:G,y:GL/2},{x:0,y:GL/2-W/2},{x:G,y:GL/2-W/2},{x:0,y:GL/2+W/2},{x:G,y:GL/2+W/2}],
       labelAt:{x:G*0.5,y:GL*0.5}},
      {title:"持ち手", cutInfo:"2本（4つ折りにして縫う）／芯テープを挟むと持ちやすくなります", ...hpc, foldX:null,
       grain:{x1:HL*0.2,y1:HW/2,x2:HL*0.8,y2:HW/2},
       notches:[], labelAt:{x:HL*0.5,y:HW*0.5}}
    ],
    memo:`マチ帯の全長 ${(GL/10).toFixed(0)}cm（幅${p.w}＋高さ${p.h}×2）／ 容量 約${Math.round(cm(p.w)*cm(p.h)*cm(p.gusset)/1000000)}L`};
  }
};

/* ---- ガジェットポーチ ---- */
PATTERNS.gadgetpouch={
  mode:"bag",
  name:"ガジェットポーチ",
  note:"充電器やケーブルを整理して持ち歩く、見開き式のポーチ。本体（底わ）＋メッシュポケット＋ゴムバンド。開くと中身が一目で見えるので、必要なものをすぐ取り出せます。",
  params:[
    {key:"w",     label:"仕上がり幅", unit:"cm",min:14,max:28, step:0.5,val:20},
    {key:"h",     label:"仕上がり高さ",unit:"cm",min:10,max:22, step:0.5,val:14},
    {key:"gusset",label:"マチ（奥行）",unit:"cm",min:2, max:8,  step:0.5,val:5},
    {key:"pockh", label:"ポケットの高さ",unit:"cm",min:5,max:14,step:0.5,val:8},
  ],
  presets:[
    {label:"小さめ",vals:{w:17,h:12,gusset:4,pockh:7}},
    {label:"標準",  vals:{w:20,h:14,gusset:5,pockh:8}},
    {label:"大きめ",vals:{w:24,h:17,gusset:6,pockh:10}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset), PH=cm(p.pockh);
    const bw=W+G, bh=(H+G/2)*2;
    const pc=pieceFrom([{x:0,y:0},{x:bw,y:0},{x:bw,y:bh},{x:0,y:bh}],
      (a,b)=>Math.abs(a.y-bh/2)<1e-6&&Math.abs(b.y-bh/2)<1e-6,sa);
    const ppc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:PH},{x:0,y:PH}],()=>false,sa);
    const EL=W, EW=cm(3);
    const epc=pieceFrom([{x:0,y:0},{x:EL,y:0},{x:EL,y:EW},{x:0,y:EW}],()=>false,sa);
    return {pieces:[
      {title:"ポーチ本体", cutInfo:"底（中央）を「わ」に置いて 1枚（表布・裏布 各1枚）／脇を縫い、底角にマチを縫う", ...pc, foldY:bh/2,
       grain:{x1:bw*0.5,y1:12,x2:bw*0.5,y2:bh-12},
       notches:[{x:0,y:bh/2},{x:bw,y:bh/2}], labelAt:{x:bw*0.5,y:bh*0.28}},
      {title:"内ポケット", cutInfo:"1〜2枚／上端を三つ折りし、裏布に縫い付けてから組み立てる", ...ppc, foldX:null,
       grain:{x1:W*0.5,y1:8,x2:W*0.5,y2:PH-8},
       notches:[{x:W*0.33,y:0},{x:W*0.66,y:0}], labelAt:{x:W*0.5,y:PH*0.55}},
      {title:"ゴムバンド用の当て布", cutInfo:"1〜2枚／平ゴムを挟んで裏布に縫い付け、ケーブルを差し込む", ...epc, foldX:null,
       grain:{x1:EL*0.2,y1:EW/2,x2:EL*0.8,y2:EW/2},
       notches:[], labelAt:{x:EL*0.5,y:EW*0.5}}
    ],
    memo:`仕上がり 約${p.w}×${p.h}×${p.gusset}cm ／ ファスナーは3辺に回すと見開きにできます`};
  }
};

/* ---- 絵本バッグ（レッスンバッグ） ---- */
PATTERNS.ehonbag={
  mode:"bag",
  name:"絵本バッグ（レッスンバッグ）",
  note:"入園・入学の定番、マチなしの手さげバッグ。本体1枚（底わ）＋持ち手2本。園や学校の指定サイズに合わせて寸法を入れてください。キルティングで作ると、しっかりして絵本が曲がりません。",
  params:[
    {key:"w",      label:"仕上がり幅",   unit:"cm",min:24,max:48, step:0.5,val:40},
    {key:"h",      label:"仕上がり高さ", unit:"cm",min:20,max:40, step:0.5,val:30},
    {key:"handle", label:"持ち手の長さ", unit:"cm",min:26,max:50, step:1,  val:34},
    {key:"handlew",label:"持ち手の裁ち幅",unit:"cm",min:5, max:12, step:0.5,val:8},
  ],
  presets:[
    {label:"園の標準（40×30）",vals:{w:40,h:30,handle:34,handlew:8}},
    {label:"小さめ（35×27）",  vals:{w:35,h:27,handle:32,handlew:7}},
    {label:"大きめ（45×35）",  vals:{w:45,h:35,handle:38,handlew:8}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h);
    const pc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:H*2},{x:0,y:H*2}],
      (a,b)=>Math.abs(a.y-H)<1e-6&&Math.abs(b.y-H)<1e-6,sa);
    const HL=cm(p.handle), HW=cm(p.handlew);
    const hpc=pieceFrom([{x:0,y:0},{x:HL,y:0},{x:HL,y:HW},{x:0,y:HW}],()=>false,sa);
    return {pieces:[
      {title:"バッグ本体", cutInfo:"底（中央）を「わ」に置いて 1枚（表布・裏布 各1枚）／両脇を縫うだけ", ...pc, foldY:H,
       grain:{x1:W*0.5,y1:20,x2:W*0.5,y2:H*2-20},
       notches:[{x:W*0.25,y:0},{x:W*0.75,y:0},{x:W*0.25,y:H*2},{x:W*0.75,y:H*2}],
       labelAt:{x:W*0.5,y:H*0.5}},
      {title:"持ち手", cutInfo:"2本（4つ折りにして縫う）／袋口の合印に合わせて付ける", ...hpc, foldX:null,
       grain:{x1:HL*0.2,y1:HW/2,x2:HL*0.8,y2:HW/2},
       notches:[], labelAt:{x:HL*0.5,y:HW*0.5}}
    ],
    memo:`仕上がり ${p.w}×${p.h}cm（マチなし）／ 園の指定サイズに合わせて入力してください`};
  }
};

/* ---- ペットスリング ---- */
PATTERNS.petsling={
  mode:"pet",
  name:"ペットスリング",
  note:"小型犬や猫を抱っこして運ぶ斜めがけのスリング。本体1枚（底わ）＋ショルダー＋飛び出し防止のリード。動物病院やお散歩の抱っこに。丈夫で洗える生地を選んでください。",
  params:[
    {key:"len",   label:"本体の長さ",   unit:"cm",min:30,max:56, step:0.5,val:42},
    {key:"depth", label:"袋の深さ",     unit:"cm",min:16,max:32, step:0.5,val:24},
    {key:"gusset",label:"マチ（底の幅）",unit:"cm",min:6, max:20, step:0.5,val:12},
    {key:"strap", label:"ショルダー長さ",unit:"cm",min:80,max:150,step:1,  val:110},
    {key:"strapw",label:"ショルダー裁ち幅",unit:"cm",min:10,max:24,step:0.5,val:16},
  ],
  presets:[
    {label:"猫・超小型犬",vals:{len:36,depth:20,gusset:10,strap:100,strapw:14}},
    {label:"小型犬",      vals:{len:42,depth:24,gusset:12,strap:110,strapw:16}},
    {label:"中型犬",      vals:{len:50,depth:28,gusset:15,strap:120,strapw:18}},
  ],
  toggles:[],
  gen(p,sa){
    const L=cm(p.len), D=cm(p.depth), G=cm(p.gusset);
    const bw=L+G, bh=(D+G/2)*2;
    const pc=pieceFrom([{x:0,y:0},{x:bw,y:0},{x:bw,y:bh},{x:0,y:bh}],
      (a,b)=>Math.abs(a.y-bh/2)<1e-6&&Math.abs(b.y-bh/2)<1e-6,sa);
    const SL=cm(p.strap), SW=cm(p.strapw);
    const spc=pieceFrom([{x:0,y:0},{x:SL,y:0},{x:SL,y:SW},{x:0,y:SW}],()=>false,sa);
    const lead=pieceFrom([{x:0,y:0},{x:cm(24),y:0},{x:cm(24),y:cm(4)},{x:0,y:cm(4)}],()=>false,sa);
    return {pieces:[
      {title:"スリング本体", cutInfo:"底（中央）を「わ」に置いて 1枚（表布・裏布 各1枚）／脇を縫い、底角にマチを縫う", ...pc, foldY:bh/2,
       grain:{x1:bw*0.5,y1:20,x2:bw*0.5,y2:bh-20},
       notches:[{x:0,y:bh/2},{x:bw,y:bh/2},{x:bw*0.5,y:0},{x:bw*0.5,y:bh}], labelAt:{x:bw*0.5,y:bh*0.28}},
      {title:"ショルダー", cutInfo:"1本（4つ折りにして縫う）／幅広にすると肩が痛くなりません。移動カンで長さ調節を", ...spc, foldX:null,
       grain:{x1:SL*0.2,y1:SW/2,x2:SL*0.8,y2:SW/2},
       notches:[{x:SL*0.5,y:0}], labelAt:{x:SL*0.5,y:SW*0.5}},
      {title:"飛び出し防止リード", cutInfo:"1本（4つ折りにして縫い、内側にナスカンを付ける）／ハーネスに必ず留めてください", ...lead, foldX:null,
       grain:{x1:cm(5),y1:cm(2),x2:cm(19),y2:cm(2)},
       notches:[], labelAt:{x:cm(12),y:cm(2)}}
    ],
    memo:`体重がかかるので、脇と底は2度縫いで補強してください ／ 本体 ${p.len}×深さ${p.depth}cm`};
  }
};

/* ---- ペットキャリーバッグ ---- */
PATTERNS.petcarrier={
  mode:"pet",
  name:"ペットキャリーバッグ",
  note:"小型犬・猫を入れて運ぶ箱型のキャリー。本体2枚＋マチ1本＋天面（メッシュ窓）＋持ち手。天面にメッシュを付けると中の様子が見え、通気も確保できます。底に厚紙を入れると安定します。",
  params:[
    {key:"w",      label:"仕上がり幅",   unit:"cm",min:28,max:50, step:0.5,val:38},
    {key:"h",      label:"仕上がり高さ", unit:"cm",min:20,max:36, step:0.5,val:26},
    {key:"gusset", label:"マチ（奥行）", unit:"cm",min:16,max:34, step:0.5,val:24},
    {key:"handle", label:"持ち手の長さ", unit:"cm",min:34,max:60, step:1,  val:44},
    {key:"handlew",label:"持ち手の裁ち幅",unit:"cm",min:7, max:14, step:0.5,val:10},
  ],
  presets:[
    {label:"猫・小型犬",vals:{w:36,h:24,gusset:22,handle:42,handlew:9}},
    {label:"標準",      vals:{w:38,h:26,gusset:24,handle:44,handlew:10}},
    {label:"大きめ",    vals:{w:44,h:30,gusset:28,handle:48,handlew:10}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset);
    const spc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}],()=>false,sa);
    const GL=W+H*2;
    const gpc=pieceFrom([{x:0,y:0},{x:G,y:0},{x:G,y:GL},{x:0,y:GL}],()=>false,sa);
    const tpc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:G},{x:0,y:G}],()=>false,sa);
    const HL=cm(p.handle), HW=cm(p.handlew);
    const hpc=pieceFrom([{x:0,y:0},{x:HL,y:0},{x:HL,y:HW},{x:0,y:HW}],()=>false,sa);
    return {pieces:[
      {title:"本体（前・後）", cutInfo:"2枚（表布・裏布 各2枚）／厚手の接着芯かキルト芯を貼る", ...spc, foldX:null,
       grain:{x1:W*0.5,y1:15,x2:W*0.5,y2:H-15},
       notches:[{x:W*0.5,y:H},{x:0,y:H*0.5},{x:W,y:H*0.5}], labelAt:{x:W*0.5,y:H*0.55}},
      {title:"マチ（底＋両脇の続き）", cutInfo:"1本（表布・裏布 各1本）／中央を底に合わせ、両脇を上まで縫い上げる", ...gpc, foldX:null,
       grain:{x1:G*0.5,y1:20,x2:G*0.5,y2:GL-20},
       notches:[{x:0,y:GL/2},{x:G,y:GL/2},{x:0,y:GL/2-W/2},{x:G,y:GL/2-W/2},{x:0,y:GL/2+W/2},{x:G,y:GL/2+W/2}],
       labelAt:{x:G*0.5,y:GL*0.5}},
      {title:"天面（メッシュ窓）", cutInfo:"1枚／中央をくり抜いてメッシュを張り、片側をファスナーで開閉できるようにする", ...tpc, foldX:null,
       grain:{x1:W*0.5,y1:15,x2:W*0.5,y2:G-15},
       notches:[{x:W*0.5,y:0},{x:W*0.5,y:G}], labelAt:{x:W*0.5,y:G*0.5}},
      {title:"持ち手", cutInfo:"2本（4つ折りにして縫う）／芯テープを挟んで丈夫に", ...hpc, foldX:null,
       grain:{x1:HL*0.2,y1:HW/2,x2:HL*0.8,y2:HW/2},
       notches:[], labelAt:{x:HL*0.5,y:HW*0.5}}
    ],
    memo:`底に厚紙やプラダンを敷くと安定します ／ 仕上がり ${p.w}×${p.h}×${p.gusset}cm`};
  }
};

/* ---- ボックスティッシュカバー ---- */
PATTERNS.tissuebox={
  mode:"home",
  name:"ボックスティッシュカバー",
  note:"箱ティッシュにかぶせるカバー。天面（取り出し口つき）＋側面4枚。生活感のある箱が隠れて、部屋の印象がすっきりします。吊り下げ用のループを付ければ、壁や車の背もたれにも掛けられます。",
  params:[
    {key:"w",     label:"箱の幅",       unit:"cm",min:18,max:30, step:0.5,val:24},
    {key:"d",     label:"箱の奥行",     unit:"cm",min:8, max:16, step:0.5,val:12},
    {key:"h",     label:"箱の高さ",     unit:"cm",min:4, max:12, step:0.5,val:6},
    {key:"open",  label:"取り出し口の幅",unit:"cm",min:8, max:20, step:0.5,val:14},
    {key:"ease",  label:"ゆとり",       unit:"cm",min:0.5,max:3, step:0.5,val:1},
  ],
  presets:[
    {label:"標準",  vals:{w:24,d:12,h:6, open:14,ease:1}},
    {label:"薄型",  vals:{w:23,d:12,h:4, open:14,ease:1}},
    {label:"大きめ",vals:{w:26,d:13,h:8, open:16,ease:1}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.ease), D=cm(p.d)+cm(p.ease), H=cm(p.h)+cm(p.ease)/2;
    const top=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:D},{x:0,y:D}],()=>false,sa);
    const s1=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}],()=>false,sa);
    const s2=pieceFrom([{x:0,y:0},{x:D,y:0},{x:D,y:H},{x:0,y:H}],()=>false,sa);
    const OW=cm(p.open);
    return {pieces:[
      {title:"天面（取り出し口つき）", cutInfo:"1枚／中央の合印の間に取り出し口を開け、縁をバイアスで始末する", ...top, foldX:null,
       grain:{x1:W*0.5,y1:10,x2:W*0.5,y2:D-10},
       notches:[{x:(W-OW)/2,y:D/2},{x:(W+OW)/2,y:D/2}], labelAt:{x:W*0.5,y:D*0.72}},
      {title:"側面（前・後）", cutInfo:"2枚／天面の長辺に縫い付ける", ...s1, foldX:null,
       grain:{x1:W*0.5,y1:8,x2:W*0.5,y2:H-8},
       notches:[{x:W*0.5,y:0}], labelAt:{x:W*0.5,y:H*0.55}},
      {title:"側面（左・右）", cutInfo:"2枚／天面の短辺に縫い付ける", ...s2, foldX:null,
       grain:{x1:D*0.5,y1:8,x2:D*0.5,y2:H-8},
       notches:[{x:D*0.5,y:0}], labelAt:{x:D*0.5,y:H*0.55}}
    ],
    memo:`裾にゴムを通すと箱にフィットします ／ 箱 ${p.w}×${p.d}×${p.h}cm＋ゆとり${p.ease}cm`};
  }
};

/* ---- のれん ---- */
PATTERNS.noren={
  mode:"home",
  name:"のれん",
  note:"部屋の仕切りや目隠しに掛ける和風のカーテン。上端を折り返して棒を通し、下側にスリット（切り込み）を入れるだけ。直線縫いだけでできます。リネンや綿麻で作ると、和洋どちらの部屋にもなじみます。",
  params:[
    {key:"w",      label:"仕上がり幅",   unit:"cm",min:50,max:110,step:1,  val:85},
    {key:"h",      label:"仕上がり丈",   unit:"cm",min:60,max:180,step:1,  val:120},
    {key:"panels", label:"垂れの枚数",   unit:"枚",min:2, max:5,  step:1,  val:2},
    {key:"slit",   label:"スリットの長さ",unit:"cm",min:30,max:140,step:1, val:80},
    {key:"pocket", label:"棒通しの高さ", unit:"cm",min:3, max:8,  step:0.5,val:5},
    {key:"hem",    label:"裾・脇の折り返し",unit:"cm",min:1,max:4, step:0.5,val:2},
  ],
  presets:[
    {label:"小窓・棚",vals:{w:60, h:70, panels:2,slit:45, pocket:4,hem:2}},
    {label:"標準",    vals:{w:85, h:120,panels:2,slit:80, pocket:5,hem:2}},
    {label:"間仕切り",vals:{w:100,h:170,panels:3,slit:120,pocket:5,hem:2}},
  ],
  toggles:[],
  gen(p,sa){
    const PW=cm(p.w)/p.panels+cm(p.hem)*2, H=cm(p.h)+cm(p.pocket)*2+cm(p.hem)*2;
    const pc=pieceFrom([{x:0,y:0},{x:PW,y:0},{x:PW,y:H},{x:0,y:H}],()=>false,sa);
    return {pieces:[
      {title:"のれん（1枚分）", cutInfo:"必要な枚数だけ／裁ち切りサイズ（折り返し込み・縫い代不要）。上端どうしを縫い合わせ、下はスリットとして開ける", ...pc, foldX:null,
       grain:{x1:PW*0.5,y1:20,x2:PW*0.5,y2:H-20},
       notches:[{x:0,y:cm(p.pocket)*2},{x:PW,y:cm(p.pocket)*2},{x:0,y:H-cm(p.slit)},{x:PW,y:H-cm(p.slit)}],
       labelAt:{x:PW*0.5,y:H*0.55}}
    ],
    memo:`${p.panels}枚を上端で縫い合わせ、下から${p.slit}cmはスリットにします ／ 仕上がり ${p.w}×${p.h}cm`};
  }
};

/* ---- リモコンポケット ---- */
PATTERNS.remotepocket={
  mode:"home",
  name:"リモコンポケット",
  note:"ソファのひじ掛けに掛けて使う、リモコンや雑誌の収納。おもりを兼ねた反対側の垂れがあるので、ずり落ちません。ポケットを縦に縫い分けると、リモコンが1本ずつ立ちます。",
  params:[
    {key:"armw",  label:"ひじ掛けの幅", unit:"cm",min:8, max:30, step:0.5,val:18},
    {key:"front", label:"手前側の垂れ丈",unit:"cm",min:20,max:50, step:0.5,val:32},
    {key:"back",  label:"内側の垂れ丈", unit:"cm",min:16,max:45, step:0.5,val:26},
    {key:"pockh", label:"ポケットの高さ",unit:"cm",min:10,max:26, step:0.5,val:18},
    {key:"rows",  label:"ポケットの仕切り数",unit:"個",min:1,max:5,step:1,val:3},
  ],
  presets:[
    {label:"細いひじ掛け",vals:{armw:12,front:28,back:22,pockh:16,rows:2}},
    {label:"標準",        vals:{armw:18,front:32,back:26,pockh:18,rows:3}},
    {label:"幅広",        vals:{armw:26,front:36,back:28,pockh:20,rows:4}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.armw), L=cm(p.front)+W+cm(p.back);
    const pc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:L},{x:0,y:L}],()=>false,sa);
    const PH=cm(p.pockh);
    const ppc=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:PH},{x:0,y:PH}],()=>false,sa);
    return {pieces:[
      {title:"土台（ひじ掛けに掛ける帯）", cutInfo:"表布・裏布 各1枚／中表に縫って返し、まわりにステッチ", ...pc, foldX:null,
       grain:{x1:W*0.5,y1:20,x2:W*0.5,y2:L-20},
       notches:[{x:0,y:cm(p.front)},{x:W,y:cm(p.front)},{x:0,y:cm(p.front)+W},{x:W,y:cm(p.front)+W}],
       labelAt:{x:W*0.5,y:L*0.45}},
      {title:"ポケット布", cutInfo:"1枚／上端を三つ折りし、手前側の垂れに縫い付けて、合印で縦に縫い分ける", ...ppc, foldX:null,
       grain:{x1:W*0.5,y1:10,x2:W*0.5,y2:PH-10},
       notches:Array.from({length:p.rows-1},(_,i)=>({x:W*(i+1)/p.rows,y:0})),
       labelAt:{x:W*0.5,y:PH*0.6}}
    ],
    memo:`合印の間（${p.armw}cm）がひじ掛けの上に乗ります ／ 内側の垂れがおもりになってずれません`};
  }
};

/* ---- ネックピロー ---- */
PATTERNS.neckpillow={
  mode:"home",
  name:"ネックピロー",
  note:"首を支えるU字型のクッション。2枚を中表に縫って返し、綿やビーズを詰めるだけ。旅行や車内での仮眠に。カバーを別に作れば洗えます。手ざわりのよいニットやボア、パイル地で。",
  params:[
    {key:"outer", label:"外周の半径", unit:"cm",min:12,max:22, step:0.5,val:16},
    {key:"inner", label:"内側の半径", unit:"cm",min:4, max:10, step:0.5,val:6},
    {key:"gap",   label:"開き（首を通す幅）",unit:"cm",min:6,max:18,step:0.5,val:10},
  ],
  presets:[
    {label:"子供",  vals:{outer:13,inner:5,gap:8}},
    {label:"標準",  vals:{outer:16,inner:6,gap:10}},
    {label:"大きめ",vals:{outer:18,inner:7,gap:12}},
  ],
  toggles:[],
  gen(p,sa){
    const RO=cm(p.outer), RI=cm(p.inner), GAP=cm(p.gap);
    // 開き角（首を通す隙間）
    const half=Math.min(Math.asin(Math.max(Math.min(GAP/2/RO,0.95),0.05)),1.2);
    const a0=Math.PI/2+half, a1=Math.PI/2+Math.PI*2-half;
    const N=44, out=[], inn=[];
    for(let i=0;i<=N;i++){ const t=a0+(a1-a0)*i/N; out.push({x:RO+RO*Math.cos(t), y:RO+RO*Math.sin(t)}); }
    for(let i=N;i>=0;i--){ const t=a0+(a1-a0)*i/N; inn.push({x:RO+RI*Math.cos(t), y:RO+RI*Math.sin(t)}); }
    const pc=pieceFrom([...out,...inn],()=>false,sa);
    return {pieces:[
      {title:"ピロー本体", cutInfo:"2枚／中表に縫い、返し口から表に返して綿またはビーズを詰める", ...pc, foldX:null,
       grain:{x1:RO,y1:RO-RI*0.4,x2:RO,y2:RO+RO*0.8},
       notches:[{x:RO,y:RO+RO},{x:RO-RO*0.85,y:RO},{x:RO+RO*0.85,y:RO}],
       labelAt:{x:RO,y:RO+RO*0.6}}
    ],
    memo:`外周の直径 ${(p.outer*2)}cm ／ 開き ${p.gap}cm ／ ビーズを詰めるならこぼれないよう二重に縫ってください`};
  }
};

/* ---- ベビーカバーオール ---- */
PATTERNS.coverall={
  mode:"baby",
  name:"カバーオール",
  note:"足先まで包む前開きのつなぎ。前身頃2枚・後身頃1枚・袖2枚の4パーツで、前中心と股下をスナップで留めます。おなかが出ないので寝返りの時期にも安心。伸縮するニット地かダブルガーゼが向きます。",
  params:[
    {key:"chest",   label:"胸まわり",       unit:"cm",min:40,max:66,step:1,  val:48},
    {key:"len",     label:"着丈（肩〜股）", unit:"cm",min:26,max:46,step:1,  val:32},
    {key:"inseam",  label:"股下丈",         unit:"cm",min:8, max:34,step:1,  val:18},
    {key:"shoulder",label:"肩幅",           unit:"cm",min:15,max:28,step:0.5,val:19},
    {key:"sleeve",  label:"袖丈",           unit:"cm",min:6, max:30,step:1,  val:14},
    {key:"neckw",   label:"衿ぐり幅",       unit:"cm",min:10,max:20,step:0.5,val:13},
    {key:"legw",    label:"裾幅（片足）",   unit:"cm",min:8, max:20,step:0.5,val:12},
    {key:"ease",    label:"ゆとり（総量）", unit:"cm",min:4, max:16,step:1,  val:8},
  ],
  presets:[
    {label:"50-60(新生児)",vals:{chest:42,len:27,inseam:11,shoulder:16,sleeve:9, neckw:11,legw:9, ease:8}},
    {label:"60-70(3-6M)",  vals:{chest:45,len:30,inseam:15,shoulder:18,sleeve:12,neckw:12,legw:10,ease:8}},
    {label:"70-80(6-12M)", vals:{chest:48,len:32,inseam:18,shoulder:19,sleeve:14,neckw:13,legw:12,ease:8}},
    {label:"80-90(1-2歳)", vals:{chest:52,len:36,inseam:23,shoulder:21,sleeve:17,neckw:14,legw:13,ease:8}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.chest)+cm(p.ease))/4, L=cm(p.len), IN=cm(p.inseam), PL=cm(2);
    const SHx=Math.min(cm(p.shoulder)/2, HW*0.9), slope=cm(1.2);
    // 衿ぐり幅は肩幅より内側に収める。逆転すると衿ぐりの曲線が肩先を追い越す。
    const NWh=Math.min(cm(p.neckw)/2, SHx*0.9);
    const ADy=Math.min(cm(11), L*0.45);
    // 裾幅は半身幅より狭く。広いと外側の脇線が股上へ向かって外に膨らむ。
    const LW=Math.min(cm(p.legw), HW*0.85), ankIn=cm(0.5), ankOut=ankIn+LW;
    const CWx=HW*0.30;                       // 股下の内また点
    const body=(back)=>{
      const FD=Math.min(cm(back?1.5:4.5), L*0.3);
      const neck=quad({x:0,y:FD},{x:NWh*0.5,y:FD},{x:NWh,y:0},10);
      const arm=quad({x:SHx,y:slope},{x:(SHx+HW)/2,y:slope+(ADy-slope)*0.5},{x:HW,y:ADy},10);
      const outleg=quad({x:HW,y:L*0.95},{x:HW,y:L+IN*0.4},{x:ankOut,y:L+IN},10);
      const inleg=quad({x:ankIn,y:L+IN},{x:ankIn,y:L+IN*0.5},{x:CWx,y:L+cm(0.5)},10);
      const crotch=quad({x:CWx,y:L+cm(0.5)},{x:CWx*0.4,y:L+cm(0.5)},{x:0,y:L},8);
      let fin=[];
      if(!back) fin.push({x:-PL,y:FD});
      fin.push({x:0,y:FD});
      fin=fin.concat(neck);
      fin.push({x:SHx,y:slope});
      fin=fin.concat(arm,[{x:HW,y:L*0.95}],outleg,[{x:ankIn,y:L+IN}],inleg,crotch);
      if(!back) fin.push({x:-PL,y:L});
      const pc=pieceFrom(fin,(a,b)=>back&&a.x===0&&b.x===0,sa);
      return {pc, neck:arcLen({x:0,y:FD},neck), arm:arcLen({x:SHx,y:slope},arm)};
    };
    const F=body(false), B=body(true);
    // 袖山の幅は身頃の袖ぐりの実長に合わせる。パーツの高さがそのまま袖丈になるよう袖山は浅く取る。
    const armSeam=F.arm+B.arm, capFull=armSeam, capH=cm(2.5), cx=capFull/2;
    const cuffW=capFull*0.72, SL=cm(p.sleeve);
    let sl=[{x:0,y:capH}];
    sl=sl.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:0},10));
    sl=sl.concat(quad({x:cx,y:0},{x:cx*1.5,y:0},{x:capFull,y:capH},10));
    sl.push({x:(capFull+cuffW)/2,y:SL},{x:(capFull-cuffW)/2,y:SL});
    const spc=pieceFrom(sl,()=>false,sa);
    return {pieces:[
      {title:"前身頃", cutInfo:"2枚（左右）／前端に打ち合わせ分が付いています", ...F.pc, foldX:null,
       grain:{x1:HW*0.45,y1:ADy+12,x2:HW*0.45,y2:L-8},
       notches:[{x:HW,y:ADy},{x:CWx,y:L+cm(0.5)}], labelAt:{x:HW*0.4,y:L*0.6}},
      {title:"後身頃", cutInfo:"中心を「わ」／後ろ 1枚", ...B.pc, foldX:0,
       grain:{x1:HW*0.45,y1:ADy+12,x2:HW*0.45,y2:L-8},
       notches:[{x:HW,y:ADy},{x:CWx,y:L+cm(0.5)}], labelAt:{x:HW*0.4,y:L*0.6}},
      {title:"袖", seamLen:armSeam, cutInfo:"2枚（左右）", ...spc, foldX:null,
       grain:{x1:cx,y1:capH+10,x2:cx,y2:SL-10},
       notches:[{x:cx,y:0}], labelAt:{x:cx,y:SL*0.62}}
    ],
    memo:`衿ぐり1周 約${((F.neck+B.neck)*2/10).toFixed(0)}cm ／ 袖ぐり1周 約${(armSeam/10).toFixed(0)}cm ／ 前中心にスナップ${Math.max(4,Math.round(L/60))}個・股下に3個`};
  }
};

/* ---- うちわカバー ---- */
PATTERNS.uchiwacover={
  mode:"small",
  name:"うちわカバー",
  note:"応援うちわを持ち運ぶための袋。持ち手が下から出る形なので、出し入れが片手でできます。表布・裏布の2枚仕立てで、口はマジックテープかスナップで留めます。厚手の生地かキルティングにすると角が折れません。",
  params:[
    {key:"w",       label:"うちわの幅",     unit:"cm",min:20,max:35,step:0.5,val:28},
    {key:"h",       label:"うちわの高さ",   unit:"cm",min:25,max:45,step:0.5,val:32},
    {key:"handlew", label:"持ち手の幅",     unit:"cm",min:3, max:8, step:0.5,val:5},
    {key:"handleh", label:"持ち手の出る長さ",unit:"cm",min:6,max:20,step:0.5,val:12},
    {key:"round",   label:"上角の丸み",     unit:"cm",min:0, max:8, step:0.5,val:3},
    {key:"ease",    label:"ゆとり",         unit:"cm",min:1, max:4, step:0.5,val:2},
  ],
  presets:[
    {label:"標準（レギュラー）",vals:{w:28,h:32,handlew:5,handleh:12,round:3,ease:2}},
    {label:"大きめ",            vals:{w:31,h:36,handlew:6,handleh:14,round:4,ease:2}},
    {label:"コンパクト",        vals:{w:24,h:28,handlew:4,handleh:10,round:2.5,ease:1.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.ease), H=cm(p.h)+cm(p.ease)/2;
    const TW=Math.min(cm(p.handlew)+cm(p.ease)/2, W*0.6), TH=cm(p.handleh);
    const R=clampR(cm(p.round), W, H);
    let fin=[{x:0,y:R}];
    fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    fin.push({x:W-R,y:0});
    fin=fin.concat(quad({x:W-R,y:0},{x:W,y:0},{x:W,y:R},8));
    fin.push({x:W,y:H},{x:(W+TW)/2,y:H},{x:(W+TW)/2,y:H+TH},{x:(W-TW)/2,y:H+TH},{x:(W-TW)/2,y:H},{x:0,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[
      {title:"本体", cutInfo:"表布2枚・裏布2枚／上端が出し入れ口", ...pc, foldX:null,
       grain:{x1:W*0.5,y1:R+12,x2:W*0.5,y2:H-12},
       notches:[{x:(W-TW)/2,y:H},{x:(W+TW)/2,y:H}], labelAt:{x:W*0.5,y:H*0.55}}
    ],
    memo:`うちわ ${p.w}×${p.h}cm＋ゆとり${p.ease}cm ／ 口にマジックテープを2か所`};
  }
};

/* ---- 痛バッグ（クリア窓トート） ---- */
PATTERNS.itabag={
  mode:"bag",
  name:"痛バッグ（クリア窓トート）",
  note:"前面に透明窓を付けて、缶バッジやぬいぐるみを見せて持ち歩くトートバッグ。窓の裏に台紙布を入れ替えれば、地の色を気分で変えられます。本体・マチ・持ち手・台紙布の4パーツ。窓には厚手の透明ビニールを使ってください。",
  params:[
    {key:"w",      label:"仕上がり幅",   unit:"cm",min:20,max:40,step:1,  val:28},
    {key:"h",      label:"仕上がり高さ", unit:"cm",min:22,max:42,step:1,  val:32},
    {key:"gusset", label:"マチ",         unit:"cm",min:4, max:16,step:0.5,val:8},
    {key:"margin", label:"窓の縁幅",     unit:"cm",min:2, max:6, step:0.5,val:3.5},
    {key:"handle", label:"持ち手の長さ", unit:"cm",min:25,max:70,step:1,  val:45},
  ],
  presets:[
    {label:"標準（A4）",vals:{w:28,h:32,gusset:8, margin:3.5,handle:45}},
    {label:"小さめ",    vals:{w:22,h:26,gusset:6, margin:3,  handle:38}},
    {label:"大きめ",    vals:{w:34,h:38,gusset:12,margin:4,  handle:52}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), G=cm(p.gusset), M=cm(p.margin);
    const body=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}],()=>false,sa);
    // 窓は縁幅を引いた内側。縁が広すぎて窓が消えないよう、最低でも幅の3割は残す。
    const WW=Math.max(W-M*2, W*0.3), WH=Math.max(H-M*2, H*0.3);
    const win=pieceFrom([{x:0,y:0},{x:WW,y:0},{x:WW,y:WH},{x:0,y:WH}],()=>false,sa);
    const GL=H*2+W;                          // 底と両脇を一続きにしたマチ
    const gus=pieceFrom([{x:0,y:0},{x:G,y:0},{x:G,y:GL},{x:0,y:GL}],()=>false,sa);
    const HL=cm(p.handle), HWd=cm(4);
    const hpc=pieceFrom([{x:0,y:0},{x:HL,y:0},{x:HL,y:HWd},{x:0,y:HWd}],()=>false,sa);
    return {pieces:[
      {title:"本体（前・後）", cutInfo:"表布2枚・裏布2枚／前面だけ中央をくり抜いて窓にする", ...body, foldX:null,
       grain:{x1:W*0.5,y1:12,x2:W*0.5,y2:H-12},
       notches:[{x:M,y:M},{x:W-M,y:M}], labelAt:{x:W*0.5,y:H*0.62}},
      {title:"窓（透明ビニール）", cutInfo:"1枚／前面のくり抜きより四方1cm大きく裁ち、裏から縫い付ける", ...win, foldX:null,
       grain:null, notches:[], labelAt:{x:WW*0.5,y:WH*0.5}},
      {title:"マチ（底・脇 一続き）", cutInfo:"表布1枚・裏布1枚／底の中心を合わせて本体に縫い付ける", ...gus, foldX:null,
       grain:{x1:G*0.5,y1:12,x2:G*0.5,y2:GL-12},
       notches:[{x:0,y:GL/2},{x:G,y:GL/2}], labelAt:{x:G*0.5,y:GL*0.5}},
      {title:"持ち手", cutInfo:"2本（4つ折りにして縫う）", ...hpc, foldX:null,
       grain:{x1:HL*0.2,y1:HWd/2,x2:HL*0.8,y2:HWd/2},
       notches:[], labelAt:{x:HL*0.5,y:HWd*0.5}}
    ],
    memo:`窓の内寸 約${(WW/10).toFixed(0)}×${(WH/10).toFixed(0)}cm ／ 台紙布は窓より一回り大きく裁って差し替える`};
  }
};

/* ---- ティーコゼー ---- */
PATTERNS.teacosy={
  mode:"home",
  name:"ティーコゼー",
  note:"ティーポットにかぶせて保温する布のカバー。表布・裏布のあいだにキルト芯を挟んだ2枚仕立てで、両脇に注ぎ口と持ち手を通す開きを残します。上のループをつまんで外せます。",
  params:[
    {key:"w",      label:"ポットの幅",   unit:"cm",min:16,max:34,step:0.5,val:24},
    {key:"h",      label:"ポットの高さ", unit:"cm",min:12,max:26,step:0.5,val:17},
    {key:"ease",   label:"ゆとり",       unit:"cm",min:2, max:8, step:0.5,val:4},
    {key:"loop",   label:"つまみループ丈",unit:"cm",min:5,max:14,step:0.5,val:8},
  ],
  presets:[
    {label:"2〜3人用",vals:{w:22,h:15,ease:4,loop:8}},
    {label:"4〜5人用",vals:{w:26,h:19,ease:4,loop:9}},
    {label:"小ぶり",  vals:{w:18,h:13,ease:3,loop:7}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.ease), H=cm(p.h)+cm(p.ease)/2;
    const SH=H*0.5;                          // ここから上がドーム
    let fin=[{x:0,y:H},{x:0,y:SH}];
    fin=fin.concat(quad({x:0,y:SH},{x:0,y:0},{x:W/2,y:0},12));
    fin=fin.concat(quad({x:W/2,y:0},{x:W,y:0},{x:W,y:SH},12));
    fin.push({x:W,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    const LL=cm(p.loop), LW=cm(3);
    const lpc=pieceFrom([{x:0,y:0},{x:LW,y:0},{x:LW,y:LL},{x:0,y:LL}],()=>false,sa);
    return {pieces:[
      {title:"本体", cutInfo:"表布2枚・裏布2枚・キルト芯2枚／両脇の合印から下は縫わずに開ける", ...pc, foldX:null,
       grain:{x1:W*0.5,y1:SH*0.5,x2:W*0.5,y2:H-12},
       notches:[{x:0,y:SH},{x:W,y:SH}], labelAt:{x:W*0.5,y:H*0.72}},
      {title:"つまみループ", cutInfo:"1本（4つ折りにして縫う）／二つ折りにして上部に挟む", ...lpc, foldX:null,
       grain:{x1:LW/2,y1:LL*0.2,x2:LW/2,y2:LL*0.8},
       notches:[], labelAt:{x:LW*0.5,y:LL*0.5}}
    ],
    memo:`ポット ${p.w}×${p.h}cm＋ゆとり${p.ease}cm ／ 脇の開き 約${(H*0.5/10).toFixed(0)}cm（注ぎ口と持ち手を出す）`};
  }
};

/* ---- カトラリーケース（ロール式） ---- */
PATTERNS.cutlerycase={
  mode:"small",
  name:"カトラリーケース（ロール式）",
  note:"箸・スプーン・フォークを1本ずつ差して、くるくる巻いてひもで留めるケース。本体にポケット布を重ね、縦にステッチを入れて仕切るだけ。本数と1本あたりの幅を変えれば、絵筆や編み針のケースにもなります。",
  params:[
    {key:"itemlen",label:"カトラリーの長さ",unit:"cm",min:12,max:30,step:0.5,val:20},
    {key:"slots",  label:"差し込む本数",    unit:"本",min:2, max:8, step:1,  val:4},
    {key:"slotw",  label:"1本あたりの幅",  unit:"cm",min:3, max:8, step:0.5,val:5},
    {key:"flap",   label:"かぶせの深さ",    unit:"cm",min:3, max:10,step:0.5,val:6},
    {key:"tie",    label:"ひもの長さ",      unit:"cm",min:40,max:100,step:1, val:60},
  ],
  presets:[
    {label:"3点（箸・スプーン・フォーク）",vals:{itemlen:20,slots:3,slotw:5,flap:6,tie:60}},
    {label:"4点セット",                    vals:{itemlen:22,slots:4,slotw:5,flap:6,tie:65}},
    {label:"絵筆・編み針",                 vals:{itemlen:26,slots:8,slotw:3.5,flap:5,tie:70}},
  ],
  toggles:[],
  gen(p,sa){
    const SW=cm(p.slotw), W=SW*p.slots+cm(2), IL=cm(p.itemlen), FL=cm(p.flap);
    const H=IL+FL+cm(3);
    const body=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:H},{x:0,y:H}],()=>false,sa);
    const PH=IL*0.55;                        // ポケットの高さ（差した柄が見える深さ）
    const pk=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:PH},{x:0,y:PH}],()=>false,sa);
    const TL=cm(p.tie), TW=cm(3);
    const tie=pieceFrom([{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}],()=>false,sa);
    // 仕切りの位置。両端の縫い代を除いた内側を等分する。
    const div=[];
    for(let i=1;i<p.slots;i++) div.push({x:cm(1)+SW*i,y:0});
    return {pieces:[
      {title:"本体", cutInfo:"表布1枚・裏布1枚／上端がかぶせになる", ...body, foldX:null,
       grain:{x1:W*0.5,y1:12,x2:W*0.5,y2:H-12},
       notches:[{x:0,y:FL},{x:W,y:FL}], labelAt:{x:W*0.5,y:H*0.75}},
      {title:"ポケット布", cutInfo:"1枚／上端を三つ折りしてから本体に重ね、合印で縦に仕切る", ...pk, foldX:null,
       grain:{x1:W*0.5,y1:8,x2:W*0.5,y2:PH-8},
       notches:div, labelAt:{x:W*0.5,y:PH*0.6}},
      {title:"ひも", cutInfo:"1本（4つ折りにして縫う）／脇の中ほどに縫い付ける", ...tie, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`仕上がり ${(W/10).toFixed(0)}×${(H/10).toFixed(0)}cm ／ ${p.slots}本差し（1本 ${p.slotw}cm）`};
  }
};

/* ---- ネクタイ ---- */
PATTERNS.necktie={
  mode:"small",
  name:"ネクタイ",
  note:"大剣・小剣・ループの3パーツ。バイアス（布目に対して45度）で裁つのが要で、そうすると結び目がきれいに締まり、しわも戻ります。裏に中しん（芯地）を入れると市販品のような張りが出ます。ネクタイ幅は流行で変わるので好みで調整を。",
  params:[
    {key:"len",   label:"全長",         unit:"cm",min:130,max:155,step:1,  val:145},
    {key:"bigw",  label:"大剣の幅",     unit:"cm",min:5,  max:9.5,step:0.5,val:8},
    {key:"smallw",label:"小剣の幅",     unit:"cm",min:3,  max:6,  step:0.5,val:4.5},
    {key:"neckw", label:"首まわりの幅", unit:"cm",min:3,  max:5,  step:0.5,val:4},
  ],
  presets:[
    {label:"標準（幅8cm）",vals:{len:145,bigw:8,  smallw:4.5,neckw:4}},
    {label:"ナロー（6cm）",vals:{len:143,bigw:6,  smallw:3.5,neckw:3.5}},
    {label:"ワイド（9cm）",vals:{len:148,bigw:9,  smallw:5,  neckw:4.5}},
  ],
  toggles:[],
  gen(p,sa){
    const TOT=cm(p.len), BW=cm(p.bigw), SW=cm(p.smallw);
    // 首まわりは大剣・小剣どちらより広くならないようにする（結び目が入らなくなる）。
    const NW=Math.min(cm(p.neckw), BW*0.9, SW*0.9);
    const blade=(w,L)=>{
      const tip=w*0.55;                      // 先端のV字の深さ
      const flare=Math.min(L*0.35, w*3);     // 幅が一定になるまでの長さ
      let fin=[{x:w/2,y:0},{x:w,y:tip},{x:w,y:flare}];
      fin=fin.concat(quad({x:w,y:flare},{x:w,y:L*0.75},{x:(w+NW)/2,y:L},10));
      fin.push({x:(w-NW)/2,y:L});
      fin=fin.concat(quad({x:(w-NW)/2,y:L},{x:0,y:L*0.75},{x:0,y:flare},10));
      fin.push({x:0,y:tip});
      return pieceFrom(fin,()=>false,sa);
    };
    const BL=TOT*0.58, SL=TOT*0.42;
    const bpc=blade(BW,BL), spc=blade(SW,SL);
    const LW=cm(3), LL=cm(7);
    const lpc=pieceFrom([{x:0,y:0},{x:LW,y:0},{x:LW,y:LL},{x:0,y:LL}],()=>false,sa);
    return {pieces:[
      {title:"大剣", cutInfo:"1枚／バイアス（布目に45度）で裁つ", ...bpc, foldX:null,
       grain:{x1:BW*0.5-cm(1.5),y1:BL*0.45,x2:BW*0.5+cm(1.5),y2:BL*0.45-cm(3)},
       notches:[{x:BW/2,y:BL}], labelAt:{x:BW*0.5,y:BL*0.6}},
      {title:"小剣", cutInfo:"1枚／バイアス（布目に45度）で裁つ", ...spc, foldX:null,
       grain:{x1:SW*0.5-cm(1),y1:SL*0.45,x2:SW*0.5+cm(1),y2:SL*0.45-cm(2)},
       notches:[{x:SW/2,y:SL}], labelAt:{x:SW*0.5,y:SL*0.6}},
      {title:"ループ（小剣通し）", cutInfo:"1本（4つ折りにして縫う）／大剣の裏に縫い付ける", ...lpc, foldX:null,
       grain:{x1:LW/2,y1:LL*0.2,x2:LW/2,y2:LL*0.8},
       notches:[], labelAt:{x:LW*0.5,y:LL*0.5}}
    ],
    memo:`仕上がり全長 約${p.len}cm ／ 大剣${p.bigw}cm・小剣${p.smallw}cm ／ 大剣と小剣を首の位置ではぎ合わせる`};
  }
};

/* ---- ツリースカート ---- */
PATTERNS.treeskirt={
  mode:"home",
  name:"ツリースカート",
  note:"クリスマスツリーの足元に敷く円形の布。中心に穴、外周まで1か所スリットを入れて、幹を囲むようにかぶせます。4分の1の型紙を4枚裁ち、3辺を縫って1辺を開けたままにするだけ。プレゼントの土台にもなります。",
  params:[
    {key:"dia",  label:"仕上がり直径", unit:"cm",min:70,max:150,step:1,  val:110},
    {key:"hole", label:"中心の穴の直径",unit:"cm",min:8, max:24, step:0.5,val:12},
  ],
  presets:[
    {label:"120cmツリー",vals:{dia:90, hole:10}},
    {label:"150cmツリー",vals:{dia:110,hole:12}},
    {label:"180cmツリー",vals:{dia:130,hole:15}},
  ],
  toggles:[],
  gen(p,sa){
    const R=cm(p.dia)/2;
    // 穴は外径より必ず小さく保つ。逆転すると内周が外周を追い越して型紙が裏返る。
    const r=Math.min(cm(p.hole)/2, R*0.5);
    const N=24, fin=[];
    for(let i=0;i<=N;i++){                   // 外周（0度→90度）
      const t=Math.PI/2*i/N;
      fin.push({x:R*Math.cos(t), y:R*Math.sin(t)});
    }
    for(let i=N;i>=0;i--){                   // 内周（90度→0度）
      const t=Math.PI/2*i/N;
      fin.push({x:r*Math.cos(t), y:r*Math.sin(t)});
    }
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[
      {title:"1/4パネル", cutInfo:"表布4枚・裏布4枚／3辺を縫い合わせ、残り1辺は開けてスリットにする", ...pc, foldX:null,
       grain:{x1:R*0.45,y1:R*0.2,x2:R*0.45,y2:R*0.55},
       notches:[{x:r,y:0},{x:0,y:r}], labelAt:{x:R*0.42,y:R*0.42}}
    ],
    memo:`外径 ${p.dia}cm・中心穴 ${p.hole}cm ／ 外周 約${(2*Math.PI*R/10).toFixed(0)}cm（縁取りのバイアス参考長）`};
  }
};

/* ---- 布バスケット ---- */
PATTERNS.fabricbasket={
  mode:"home",
  name:"布バスケット",
  note:"自立する四角い布かご。側面をぐるりと1本でつないで底を付け、口を外側に折り返します。接着芯や厚手の芯地を入れると形が保てます。おむつ・毛糸・リモコンなど、出しっぱなしになるものの置き場に。",
  params:[
    {key:"w",     label:"仕上がり幅",   unit:"cm",min:14,max:40,step:0.5,val:24},
    {key:"d",     label:"仕上がり奥行", unit:"cm",min:10,max:32,step:0.5,val:18},
    {key:"h",     label:"仕上がり高さ", unit:"cm",min:10,max:32,step:0.5,val:18},
    {key:"cuff",  label:"折り返し幅",   unit:"cm",min:0, max:10,step:0.5,val:5},
  ],
  presets:[
    {label:"小（小物入れ）",vals:{w:16,d:12,h:12,cuff:4}},
    {label:"標準",          vals:{w:24,d:18,h:18,cuff:5}},
    {label:"大（おもちゃ）",vals:{w:34,d:26,h:26,cuff:6}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), D=cm(p.d), H=cm(p.h)+cm(p.cuff);
    const SL=(W+D)*2;                        // 側面1本の長さ（周囲）
    const side=pieceFrom([{x:0,y:0},{x:SL,y:0},{x:SL,y:H},{x:0,y:H}],()=>false,sa);
    const bottom=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:D},{x:0,y:D}],()=>false,sa);
    return {pieces:[
      {title:"側面（一続き）", cutInfo:"表布1枚・裏布1枚／両端を縫って輪にし、合印を底の角に合わせる", ...side, foldX:null,
       grain:{x1:SL*0.5,y1:12,x2:SL*0.5,y2:H-12},
       notches:[{x:W,y:H},{x:W+D,y:H},{x:W*2+D,y:H}], labelAt:{x:SL*0.5,y:H*0.5}},
      {title:"底", cutInfo:"表布1枚・裏布1枚／厚紙かプラダンを入れると安定する", ...bottom, foldX:null,
       grain:{x1:W*0.5,y1:10,x2:W*0.5,y2:D-10},
       notches:[{x:W*0.5,y:0},{x:W*0.5,y:D}], labelAt:{x:W*0.5,y:D*0.5}}
    ],
    memo:`仕上がり ${p.w}×${p.d}×${p.h}cm（折り返し${p.cuff}cm込みの高さで裁断）／ 側面の周囲 ${(SL/10).toFixed(0)}cm`};
  }
};

/* ---- テーブルランナー ---- */
PATTERNS.tablerunner={
  mode:"home",
  name:"テーブルランナー",
  note:"食卓の中央に細長く敷く布。両端を三角に尖らせると、市販品らしい表情になります。表布と裏布を中表に縫って返すだけ。テーブルクロスより布が少なくて済み、洗濯もらくです。",
  params:[
    {key:"len",  label:"仕上がり長さ", unit:"cm",min:90,max:250,step:1,  val:160},
    {key:"w",    label:"仕上がり幅",   unit:"cm",min:25,max:50, step:1,  val:33},
    {key:"point",label:"両端の尖り",   unit:"cm",min:0, max:20, step:0.5,val:12},
  ],
  presets:[
    {label:"4人掛け",vals:{len:140,w:30,point:10}},
    {label:"6人掛け",vals:{len:180,w:33,point:12}},
    {label:"角なし", vals:{len:160,w:35,point:0}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), L=cm(p.len);
    // 尖りが長さの4分の1を超えると、両端の三角が中央で出会って形が崩れる
    const PT=Math.min(cm(p.point), L*0.25);
    const fin=[{x:0,y:PT},{x:W/2,y:0},{x:W,y:PT},{x:W,y:L-PT},{x:W/2,y:L},{x:0,y:L-PT}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[
      {title:"本体", cutInfo:"表布1枚・裏布1枚／中表に縫って返す", ...pc, foldX:null,
       grain:{x1:W*0.5,y1:PT+20,x2:W*0.5,y2:L-PT-20},
       notches:[{x:0,y:PT},{x:W,y:PT}], labelAt:{x:W*0.5,y:L*0.5}}
    ],
    memo:`仕上がり ${p.w}×${p.len}cm ／ 両端の尖り ${(PT/10).toFixed(1)}cm ／ テーブルから左右に15〜20cm垂らすと収まりがよい`};
  }
};

/* ---- レジャーシート ---- */
PATTERNS.picnicmat={
  mode:"home",
  name:"レジャーシート",
  note:"公園や運動会で広げる布のシート。裏に撥水生地を使えば地面の湿りが染みません。本体1枚と、丸めて留めるベルト1本だけの構成です。角を丸くすると、たたむときにかさばりません。",
  params:[
    {key:"w",    label:"仕上がり幅",   unit:"cm",min:90,max:200,step:1,  val:140},
    {key:"d",    label:"仕上がり奥行", unit:"cm",min:60,max:160,step:1,  val:100},
    {key:"round",label:"角の丸み",     unit:"cm",min:0, max:15, step:0.5,val:6},
    {key:"belt", label:"留めベルトの長さ",unit:"cm",min:30,max:80,step:1, val:50},
  ],
  presets:[
    {label:"2人用",  vals:{w:120,d:90, round:5,belt:45}},
    {label:"4人用",  vals:{w:140,d:100,round:6,belt:50}},
    {label:"ファミリー",vals:{w:180,d:140,round:8,belt:65}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), D=cm(p.d), R=clampR(cm(p.round), W, D);
    let fin=[{x:0,y:R}];
    fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    fin.push({x:W-R,y:0});
    fin=fin.concat(quad({x:W-R,y:0},{x:W,y:0},{x:W,y:R},8));
    fin.push({x:W,y:D-R});
    fin=fin.concat(quad({x:W,y:D-R},{x:W,y:D},{x:W-R,y:D},8));
    fin.push({x:R,y:D});
    fin=fin.concat(quad({x:R,y:D},{x:0,y:D},{x:0,y:D-R},8));
    const pc=pieceFrom(fin,()=>false,sa);
    const BL=cm(p.belt), BW=cm(5);
    const bpc=pieceFrom([{x:0,y:0},{x:BL,y:0},{x:BL,y:BW},{x:0,y:BW}],()=>false,sa);
    return {pieces:[
      {title:"本体", cutInfo:"表布1枚・裏布（撥水生地）1枚／中表に縫って返す", ...pc, foldX:null,
       grain:{x1:W*0.5,y1:R+30,x2:W*0.5,y2:D-R-30},
       notches:[{x:W*0.5,y:0},{x:W*0.5,y:D}], labelAt:{x:W*0.5,y:D*0.5}},
      {title:"留めベルト", cutInfo:"1本（4つ折りにして縫う）／端に面ファスナーを付ける", ...bpc, foldX:null,
       grain:{x1:BL*0.2,y1:BW/2,x2:BL*0.8,y2:BW/2},
       notches:[], labelAt:{x:BL*0.5,y:BW*0.5}}
    ],
    memo:`仕上がり ${p.w}×${p.d}cm ／ 布幅が足りないときは2枚はぎ合わせる（継ぎ目は中央を避ける）`};
  }
};

/* ---- ヨガマットケース ---- */
PATTERNS.yogamatbag={
  mode:"bag",
  name:"ヨガマットケース",
  note:"丸めたヨガマットを入れる筒型のケース。側面1枚と丸底1枚、ショルダーひも1本の構成です。上端をひも通しにして絞れば、フタも面ファスナーも要りません。肩に掛けて持ち運べます。",
  params:[
    {key:"matdia",label:"丸めたマットの直径",unit:"cm",min:12,max:24,step:0.5,val:16},
    {key:"matlen",label:"マットの長さ",      unit:"cm",min:60,max:190,step:1, val:175},
    {key:"ease",  label:"ゆとり",            unit:"cm",min:1, max:5,  step:0.5,val:2},
    {key:"strap", label:"ショルダーの長さ",  unit:"cm",min:60,max:140,step:1, val:100},
  ],
  presets:[
    {label:"標準（180cmマット）",vals:{matdia:16,matlen:175,ease:2,strap:100}},
    {label:"厚手マット",         vals:{matdia:20,matlen:180,ease:2.5,strap:105}},
    {label:"トラベル用（短い）", vals:{matdia:13,matlen:65, ease:1.5,strap:85}},
  ],
  toggles:[],
  gen(p,sa){
    const D=cm(p.matdia)+cm(p.ease);
    const CIRC=Math.PI*D, H=cm(p.matlen)+cm(6);   // 6cm はひも通しと底の縫い代ぶん
    const side=pieceFrom([{x:0,y:0},{x:CIRC,y:0},{x:CIRC,y:H},{x:0,y:H}],()=>false,sa);
    const r=D/2, N=28, circ=[];
    for(let i=0;i<N;i++){
      const t=2*Math.PI*i/N;
      circ.push({x:r+r*Math.cos(t), y:r+r*Math.sin(t)});
    }
    const bpc=pieceFrom(circ,()=>false,sa);
    const SL=cm(p.strap), SW=cm(5);
    const spc=pieceFrom([{x:0,y:0},{x:SL,y:0},{x:SL,y:SW},{x:0,y:SW}],()=>false,sa);
    return {pieces:[
      {title:"側面", cutInfo:"1枚／両端を縫って筒にし、上端はひも通しにする", ...side, foldX:null,
       grain:{x1:CIRC*0.5,y1:20,x2:CIRC*0.5,y2:H-20},
       notches:[{x:0,y:cm(6)},{x:CIRC,y:cm(6)}], labelAt:{x:CIRC*0.5,y:H*0.5}},
      {title:"丸底", cutInfo:"1枚／筒の下端に合わせて縫い付ける", ...bpc, foldX:null,
       grain:{x1:r,y1:r*0.35,x2:r,y2:r*1.65},
       notches:[{x:r*2,y:r},{x:0,y:r}], labelAt:{x:r,y:r}},
      {title:"ショルダーひも", cutInfo:"1本（4つ折りにして縫う）／上端と底の脇に縫い付ける", ...spc, foldX:null,
       grain:{x1:SL*0.2,y1:SW/2,x2:SL*0.8,y2:SW/2},
       notches:[], labelAt:{x:SL*0.5,y:SW*0.5}}
    ],
    memo:`筒の周囲 ${(CIRC/10).toFixed(0)}cm ／ 丸底の直径 ${(D/10).toFixed(1)}cm ／ ひもは口の周囲＋30cm`};
  }
};

/* ---- リストピンクッション ---- */
PATTERNS.pincushion={
  mode:"small",
  name:"リストピンクッション",
  note:"手首に巻いて使う針山。縫っている最中にまち針の置き場を探さずに済みます。クッション2枚とベルト1本だけ。中身は手芸わたのほか、羊毛を詰めると針のすべりがよくなります。",
  params:[
    {key:"dia",  label:"クッションの直径",unit:"cm",min:6, max:12,step:0.5,val:8},
    {key:"wrist",label:"手首まわり",      unit:"cm",min:13,max:24,step:0.5,val:16},
    {key:"beltw",label:"ベルトの幅",      unit:"cm",min:2, max:5, step:0.5,val:3.5},
  ],
  presets:[
    {label:"標準",  vals:{dia:8, wrist:16,beltw:3.5}},
    {label:"小さめ",vals:{dia:6.5,wrist:15,beltw:3}},
    {label:"子供",  vals:{dia:6, wrist:13.5,beltw:2.5}},
  ],
  toggles:[],
  gen(p,sa){
    const r=cm(p.dia)/2, N=24, circ=[];
    for(let i=0;i<N;i++){
      const t=2*Math.PI*i/N;
      circ.push({x:r+r*Math.cos(t), y:r+r*Math.sin(t)});
    }
    const cpc=pieceFrom(circ,()=>false,sa);
    const BL=cm(p.wrist)+cm(4), BW=cm(p.beltw);   // 4cm は面ファスナーの重なり分
    const bpc=pieceFrom([{x:0,y:0},{x:BL,y:0},{x:BL,y:BW},{x:0,y:BW}],()=>false,sa);
    return {pieces:[
      {title:"クッション", cutInfo:"2枚／中表に縫って返し、わたを詰める", ...cpc, foldX:null,
       grain:{x1:r,y1:r*0.35,x2:r,y2:r*1.65},
       notches:[{x:0,y:r},{x:r*2,y:r}], labelAt:{x:r,y:r}},
      {title:"ベルト", cutInfo:"1本（4つ折りにして縫う）／両端に面ファスナーを付ける", ...bpc, foldX:null,
       grain:{x1:BL*0.2,y1:BW/2,x2:BL*0.8,y2:BW/2},
       notches:[{x:BL*0.5,y:0},{x:BL*0.5,y:BW}], labelAt:{x:BL*0.5,y:BW*0.5}}
    ],
    memo:`クッション直径 ${p.dia}cm ／ ベルト全長 ${((BL)/10).toFixed(1)}cm（手首${p.wrist}cm＋重なり4cm）`};
  }
};

/* ---- ミシンカバー ---- */
PATTERNS.machinecover={
  mode:"home",
  name:"ミシンカバー",
  note:"使わないときのミシンにかぶせる布カバー。ほこりが積もらず、出しっぱなしでも生活感が出ません。前面から天面、背面までを1枚でつなぎ、両脇を付けるだけ。パーツは2種類だけです。",
  params:[
    {key:"w",   label:"ミシンの幅",   unit:"cm",min:30,max:60,step:0.5,val:45},
    {key:"d",   label:"ミシンの奥行", unit:"cm",min:15,max:32,step:0.5,val:20},
    {key:"h",   label:"ミシンの高さ", unit:"cm",min:22,max:45,step:0.5,val:32},
    {key:"ease",label:"ゆとり",       unit:"cm",min:1, max:5, step:0.5,val:2},
  ],
  presets:[
    {label:"家庭用（標準）",vals:{w:45,d:20,h:32,ease:2}},
    {label:"コンパクト",    vals:{w:38,d:17,h:28,ease:2}},
    {label:"大きめ・職業用",vals:{w:52,d:24,h:36,ease:2.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.ease), D=cm(p.d)+cm(p.ease), H=cm(p.h)+cm(p.ease)/2;
    const SPAN=H*2+D;                              // 前面 → 天面 → 背面
    const band=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:SPAN},{x:0,y:SPAN}],()=>false,sa);
    const side=pieceFrom([{x:0,y:0},{x:D,y:0},{x:D,y:H},{x:0,y:H}],()=>false,sa);
    return {pieces:[
      {title:"渡し（前・天・後 一続き）", cutInfo:"1枚／合印が天面の前後の角に来る", ...band, foldX:null,
       grain:{x1:W*0.5,y1:20,x2:W*0.5,y2:SPAN-20},
       notches:[{x:0,y:H},{x:W,y:H},{x:0,y:H+D},{x:W,y:H+D}], labelAt:{x:W*0.5,y:SPAN*0.5}},
      {title:"脇", cutInfo:"2枚（左右）／渡しの両脇に縫い付ける", ...side, foldX:null,
       grain:{x1:D*0.5,y1:12,x2:D*0.5,y2:H-12},
       notches:[{x:D*0.5,y:0}], labelAt:{x:D*0.5,y:H*0.55}}
    ],
    memo:`ミシン ${p.w}×${p.d}×${p.h}cm＋ゆとり${p.ease}cm ／ 渡しの全長 ${(SPAN/10).toFixed(0)}cm`};
  }
};

/* ---- キッズマント ---- */
PATTERNS.kidscape={
  mode:"kids",
  name:"キッズマント",
  note:"仮装にも防寒にも使えるマント。裾まわりの長方形を衿ぐりでギャザーに寄せ、衿のバンドで受けます。首もとはひもで結ぶので、サイズが多少合わなくても着られます。ハロウィンや発表会に。",
  params:[
    {key:"len",   label:"着丈",         unit:"cm",min:40,max:100,step:1,  val:65},
    {key:"hem",   label:"裾まわり",     unit:"cm",min:90,max:220,step:1,  val:140},
    {key:"neck",  label:"首まわり",     unit:"cm",min:26,max:44, step:0.5,val:32},
    {key:"collar",label:"衿の高さ",     unit:"cm",min:2, max:8,  step:0.5,val:4},
    {key:"tie",   label:"結びひもの長さ",unit:"cm",min:25,max:70, step:1,  val:40},
  ],
  presets:[
    {label:"100cm",vals:{len:52,hem:115,neck:29,collar:3.5,tie:35}},
    {label:"120cm",vals:{len:65,hem:140,neck:32,collar:4,  tie:40}},
    {label:"140cm",vals:{len:78,hem:165,neck:35,collar:4.5,tie:45}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=cm(p.hem)/2, L=cm(p.len);             // 後中心を「わ」に置いた半身
    const body=pieceFrom([{x:0,y:0},{x:HW,y:0},{x:HW,y:L},{x:0,y:L}],(a,b)=>a.x===0&&b.x===0,sa);
    const CL=cm(p.neck)+cm(3), CH=cm(p.collar)*2;  // 3cm は前端の重なり、衿は二つ折り
    const cpc=pieceFrom([{x:0,y:0},{x:CL,y:0},{x:CL,y:CH},{x:0,y:CH}],()=>false,sa);
    const TL=cm(p.tie), TW=cm(3);
    const tpc=pieceFrom([{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}],()=>false,sa);
    return {pieces:[
      {title:"身頃", cutInfo:"後中心を「わ」／1枚。上端をギャザーに寄せて衿に付ける", ...body, foldX:0,
       grain:{x1:HW*0.5,y1:20,x2:HW*0.5,y2:L-20},
       notches:[{x:HW*0.5,y:0}], labelAt:{x:HW*0.5,y:L*0.55}},
      {title:"衿（バンド）", cutInfo:"表布1枚・裏布1枚／二つ折りにして身頃の上端を挟む", ...cpc, foldX:null,
       grain:{x1:CL*0.5,y1:8,x2:CL*0.5,y2:CH-8},
       notches:[{x:CL*0.5,y:0}], labelAt:{x:CL*0.5,y:CH*0.5}},
      {title:"結びひも", cutInfo:"2本（4つ折りにして縫う）／衿の両端に挟む", ...tpc, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`裾まわり ${p.hem}cm を衿ぐり ${p.neck}cm に寄せます（ギャザー ${(cm(p.hem)/cm(p.neck)).toFixed(1)}倍）／ 着丈 ${p.len}cm`};
  }
};

/* ---- トイレフタカバー ---- */
PATTERNS.toiletcover={
  mode:"home",
  name:"トイレフタカバー",
  note:"便座のフタにかぶせる布カバー。周囲にゴムを通してあるので、かぶせるだけで留まります。表布と裏布の2枚仕立て。市販品は柄が選べませんが、手作りなら好きな生地でそろえられます。",
  params:[
    {key:"w",   label:"フタの幅",   unit:"cm",min:30,max:45,step:0.5,val:37},
    {key:"len", label:"フタの長さ", unit:"cm",min:36,max:56,step:0.5,val:45},
    {key:"ease",label:"ゆとり",     unit:"cm",min:1, max:5, step:0.5,val:2},
  ],
  presets:[
    {label:"標準",      vals:{w:37,len:45,ease:2}},
    {label:"細長いフタ",vals:{w:35,len:50,ease:2}},
    {label:"大きめ",    vals:{w:41,len:49,ease:2.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.ease), L=cm(p.len)+cm(p.ease);
    const N=40, fin=[];
    for(let i=0;i<N;i++){
      const t=2*Math.PI*i/N;
      // 上（ちょうつがい側）をやや細くした卵形にする
      const narrow=1-0.14*(1+Math.cos(t))/2;
      fin.push({x:W/2+(W/2)*Math.sin(t)*narrow, y:(L/2)*(1-Math.cos(t))});
    }
    const pc=pieceFrom(fin,()=>false,sa);
    const per=plen([...fin,fin[0]]);
    return {pieces:[
      {title:"本体", cutInfo:"表布1枚・裏布1枚／周囲にゴムを通す口を残して縫う", ...pc, foldX:null,
       grain:{x1:W*0.5,y1:L*0.2,x2:W*0.5,y2:L*0.8},
       notches:[{x:W*0.5,y:0},{x:W*0.5,y:L}], labelAt:{x:W*0.5,y:L*0.5}}
    ],
    memo:`フタ ${p.w}×${p.len}cm＋ゆとり${p.ease}cm ／ 周囲 約${(per/10).toFixed(0)}cm ／ ゴムは周囲の85%（約${(per*0.85/10).toFixed(0)}cm）`};
  }
};

/* ---- カメラストラップ ---- */
PATTERNS.camerastrap={
  mode:"small",
  name:"カメラストラップ",
  note:"首から下げるカメラのストラップ。細いひも1本と、肩に当たる部分のパッド、カメラに付けるタブ2本の3パーツ。市販品は黒ばかりですが、手作りなら好きな布で作れます。パッドにキルト芯を入れると首が痛くなりません。",
  params:[
    {key:"len",   label:"全長",           unit:"cm",min:70,max:150,step:1,  val:100},
    {key:"w",     label:"ひもの仕上がり幅",unit:"cm",min:2, max:5,  step:0.5,val:3},
    {key:"padlen",label:"パッドの長さ",   unit:"cm",min:20,max:50, step:1,  val:35},
    {key:"tabw",  label:"取り付けタブの幅",unit:"cm",min:1, max:2.5,step:0.5,val:1.5},
  ],
  presets:[
    {label:"標準",        vals:{len:100,w:3,  padlen:35,tabw:1.5}},
    {label:"短め（斜め掛けしない）",vals:{len:80, w:2.5,padlen:30,tabw:1.5}},
    {label:"太幅（重い機材）",vals:{len:110,w:4,  padlen:42,tabw:2}},
  ],
  toggles:[],
  gen(p,sa){
    const SL=cm(p.len), SW=cm(p.w)*2+cm(1);        // 4つ折りにするので仕上がり幅の2倍＋折り込み
    const spc=pieceFrom([{x:0,y:0},{x:SL,y:0},{x:SL,y:SW},{x:0,y:SW}],()=>false,sa);
    const PL=Math.min(cm(p.padlen), SL*0.6), PW=cm(p.w)*2.4;
    const ppc=pieceFrom([{x:0,y:0},{x:PL,y:0},{x:PL,y:PW},{x:0,y:PW}],()=>false,sa);
    const TL=cm(12), TW=cm(p.tabw)*2+cm(1);
    const tpc=pieceFrom([{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}],()=>false,sa);
    return {pieces:[
      {title:"ストラップ", cutInfo:"1本（4つ折りにして両端をステッチ）", ...spc, foldX:null,
       grain:{x1:SL*0.2,y1:SW/2,x2:SL*0.8,y2:SW/2},
       notches:[{x:SL*0.5,y:0},{x:SL*0.5,y:SW}], labelAt:{x:SL*0.5,y:SW*0.5}},
      {title:"肩パッド", cutInfo:"表布1枚・裏布1枚・キルト芯1枚／ストラップの中央にかぶせて縫う", ...ppc, foldX:null,
       grain:{x1:PL*0.2,y1:PW/2,x2:PL*0.8,y2:PW/2},
       notches:[{x:PL*0.5,y:0}], labelAt:{x:PL*0.5,y:PW*0.5}},
      {title:"取り付けタブ", cutInfo:"2本（4つ折りにして縫う）／カメラの金具に通して折り返す", ...tpc, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`全長 ${p.len}cm（首から下げてカメラがみぞおちの高さ）／ 仕上がり幅 ${p.w}cm ／ タブは幅${p.tabw}cmの金具に対応`};
  }
};

/* ---- 作務衣（パンツ） ---- */
PATTERNS.samuepants={
  mode:"human",
  name:"作務衣（パンツ）",
  note:"作務衣の下。ウエストはゴム、裾はひもで絞る形です。前後同じ型紙で、股ぐり同士を縫ってから脇と股下を縫います。「作務衣（上衣）」と同じ生地で作るとセットになります。綿や刺子織で。",
  params:[
    {key:"hip",    label:"ヒップ",             unit:"cm",min:80,max:130,step:1,  val:96},
    {key:"rise",   label:"股上（ウエスト〜股ぐり）",unit:"cm",min:24,max:42,step:1,val:30},
    {key:"inseam", label:"股下（股〜裾）",     unit:"cm",min:45,max:80, step:1,  val:62},
    {key:"cuff",   label:"裾まわり",           unit:"cm",min:24,max:48, step:1,  val:34},
    {key:"ease",   label:"ゆとり（総量）",     unit:"cm",min:10,max:36, step:1,  val:20},
    {key:"crotchF",label:"股ぐり延長",         unit:"cm",min:2, max:7,  step:0.5,val:4},
    {key:"casing", label:"ウエスト折り返し",   unit:"cm",min:3, max:7,  step:0.5,val:4},
  ],
  presets:[
    {label:"S",    vals:{hip:88, rise:28,inseam:58,cuff:32,ease:18,crotchF:4,casing:4}},
    {label:"M",    vals:{hip:96, rise:30,inseam:62,cuff:34,ease:20,crotchF:4,casing:4}},
    {label:"L",    vals:{hip:104,rise:32,inseam:65,cuff:36,ease:22,crotchF:4.5,casing:4}},
    {label:"LL",   vals:{hip:112,rise:34,inseam:68,cuff:38,ease:24,crotchF:5,casing:4.5}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.hip)+cm(p.ease))/4, CR=cm(p.rise), IL=cm(p.inseam);
    const CAS=cm(p.casing), CF=cm(p.crotchF);
    // 裾は半身幅より広げない。広げると裾が脇線を追い越して型紙が反り返る。
    const CW=Math.min(cm(p.cuff)/2, HW+CF);
    const H=CAS+CR+IL, hipX=HW+CF;
    let fin=[{x:0,y:0},{x:HW,y:0},{x:HW,y:CAS}];
    fin=fin.concat(quad({x:HW,y:CAS},{x:hipX,y:CAS},{x:hipX,y:CAS+CR},8));
    fin.push({x:CW,y:H},{x:0,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    const TL=cm(60), TW=cm(3);
    const tie=pieceFrom([{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}],()=>false,sa);
    return {pieces:[
      {title:"前/後パンツ", cutInfo:"前後それぞれ2枚（左右）計4枚／中心線・股ぐり同士を縫う",
       ...pc, foldX:null,
       grain:{x1:HW*0.45,y1:CAS+CR/2,x2:HW*0.45,y2:H-16},
       casingLines:[CAS], casingLabel:"ウエスト折り返し",
       notches:[{x:hipX,y:CAS+CR}], labelAt:{x:HW*0.45,y:CAS+(CR+IL)*0.6}},
      {title:"裾ひも", cutInfo:"2本（4つ折りにして縫う）／裾のひも通しに通す", ...tie, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2},
       notches:[], labelAt:{x:TL*0.5,y:TW*0.5}}
    ],
    memo:`ウエストゴムの目安 ${Math.round(cm(p.hip)*0.82/10)}cm ／ 裾まわり ${p.cuff}cm ／ 「作務衣（上衣）」と同じサイズを選ぶとセットになります`};
  }
};

/* ---- パジャマ（パンツ） ---- */
PATTERNS.pajamapants={
  mode:"human",
  name:"パジャマ（パンツ）",
  note:"ウエストゴムのゆったりしたパジャマパンツ。前後同じ型紙で、股ぐり同士を縫ってから脇と股下を縫います。「パジャマ（上衣）」と同じ生地で作るとセットに。ダブルガーゼや天竺など、肌に当たっても気にならない生地で。",
  params:[
    {key:"hip",    label:"ヒップ",             unit:"cm",min:80,max:130,step:1,  val:96},
    {key:"rise",   label:"股上（ウエスト〜股ぐり）",unit:"cm",min:24,max:42,step:1,val:30},
    {key:"inseam", label:"股下（股〜裾）",     unit:"cm",min:20,max:80, step:1,  val:64},
    {key:"cuff",   label:"裾まわり",           unit:"cm",min:26,max:60, step:1,  val:44},
    {key:"ease",   label:"ゆとり（総量）",     unit:"cm",min:10,max:36, step:1,  val:22},
    {key:"crotchF",label:"股ぐり延長",         unit:"cm",min:2, max:7,  step:0.5,val:4},
    {key:"casing", label:"ウエスト折り返し",   unit:"cm",min:3, max:7,  step:0.5,val:4},
  ],
  presets:[
    {label:"S",        vals:{hip:88, rise:28,inseam:60,cuff:42,ease:20,crotchF:4,casing:4}},
    {label:"M",        vals:{hip:96, rise:30,inseam:64,cuff:44,ease:22,crotchF:4,casing:4}},
    {label:"L",        vals:{hip:104,rise:32,inseam:67,cuff:46,ease:24,crotchF:4.5,casing:4}},
    {label:"ハーフ丈", vals:{hip:96, rise:30,inseam:28,cuff:52,ease:22,crotchF:4,casing:4}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.hip)+cm(p.ease))/4, CR=cm(p.rise), IL=cm(p.inseam);
    const CAS=cm(p.casing), CF=cm(p.crotchF);
    const CW=Math.min(cm(p.cuff)/2, HW+CF);
    const H=CAS+CR+IL, hipX=HW+CF;
    let fin=[{x:0,y:0},{x:HW,y:0},{x:HW,y:CAS}];
    fin=fin.concat(quad({x:HW,y:CAS},{x:hipX,y:CAS},{x:hipX,y:CAS+CR},8));
    fin.push({x:CW,y:H},{x:0,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[
      {title:"前/後パンツ", cutInfo:"前後それぞれ2枚（左右）計4枚／中心線・股ぐり同士を縫う",
       ...pc, foldX:null,
       grain:{x1:HW*0.45,y1:CAS+CR/2,x2:HW*0.45,y2:H-16},
       casingLines:[CAS], casingLabel:"ウエスト折り返し",
       notches:[{x:hipX,y:CAS+CR}], labelAt:{x:HW*0.45,y:CAS+(CR+IL)*0.6}}
    ],
    memo:`ウエストゴムの目安 ${Math.round(cm(p.hip)*0.82/10)}cm ／ 裾まわり ${p.cuff}cm ／ 「パジャマ（上衣）」と同じサイズを選ぶとセットになります`};
  }
};

/* ---- 布ボール（おもちゃ） ---- */
PATTERNS.fabricball={
  mode:"baby",
  name:"布ボール",
  note:"6枚のパネルを縫い合わせて作る布のボール。当たっても痛くないので、室内でも安心して転がせます。中に鈴を入れると音が鳴ります。返し口は最後にコの字とじで閉じてください。",
  params:[
    {key:"dia",  label:"できあがりの直径",unit:"cm",min:8, max:22, step:1,  val:14},
    {key:"panel",label:"パネルの枚数",    unit:"枚",min:5, max:8,  step:1,  val:6},
  ],
  presets:[
    {label:"小さめ（にぎり用）",vals:{dia:10,panel:6}},
    {label:"標準",              vals:{dia:14,panel:6}},
    {label:"大きめ",            vals:{dia:18,panel:6}},
  ],
  toggles:[],
  gen(p,sa){
    const D=cm(p.dia), N=p.panel;
    // 球の外周の半分がパネルの丈。幅は赤道の周長を枚数で割る。
    const H=Math.PI*D/2, W=Math.PI*D/N;
    const fin=[]; const n=28;
    for(let i=0;i<=n;i++){ const t=i/n; fin.push({x:W/2*Math.sin(Math.PI*t), y:H*t}); }
    for(let i=n;i>=0;i--){ const t=i/n; fin.push({x:-W/2*Math.sin(Math.PI*t), y:H*t}); }
    const sh=fin.map(q=>({x:q.x+W/2, y:q.y}));
    const pc=pieceFrom(sh,()=>false,sa);
    return {pieces:[{
      title:"パネル", cutInfo:`${N}枚／となり合う辺を中表に縫い合わせる`,
      ...pc, foldX:null,
      grain:{x1:W/2,y1:H*0.25,x2:W/2,y2:H*0.75},
      notches:[{x:W/2,y:H/2}], labelAt:{x:W/2,y:H/2}
    }],
    memo:`${N}枚を順に縫い、最後の1辺を7cmほど残して返し口にします ／ 綿は角までしっかり詰めると丸くなります`};
  }
};

/* ---- 布絵本（おもちゃ） ---- */
PATTERNS.clothbook={
  mode:"baby",
  name:"布絵本",
  note:"やぶれない布の絵本。表布と裏布を中表に縫って返し、中心を縫うと本になります。ページにフェルトの果物やボタンを付ければ、遊びながら指先の練習に。角は丸く落としてあります。",
  params:[
    {key:"w",    label:"1ページの幅",unit:"cm",min:10,max:22, step:1,  val:15},
    {key:"h",    label:"高さ",       unit:"cm",min:10,max:24, step:1,  val:16},
    {key:"sheet",label:"シートの枚数",unit:"枚",min:2, max:5,  step:1,  val:3},
    {key:"round",label:"角の丸み",   unit:"cm",min:0, max:4,  step:0.5,val:2},
  ],
  presets:[
    {label:"小さめ",vals:{w:12,h:13,sheet:3,round:1.5}},
    {label:"標準",  vals:{w:15,h:16,sheet:3,round:2}},
    {label:"大きめ",vals:{w:18,h:19,sheet:4,round:2.5}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)*2, H=cm(p.h), R=Math.min(cm(p.round),W/2-1,H/2-1);
    let fin=[{x:R,y:0},{x:W-R,y:0}];
    fin=fin.concat(quad({x:W-R,y:0},{x:W,y:0},{x:W,y:R},8));
    fin.push({x:W,y:H-R});
    fin=fin.concat(quad({x:W,y:H-R},{x:W,y:H},{x:W-R,y:H},8));
    fin.push({x:R,y:H});
    fin=fin.concat(quad({x:R,y:H},{x:0,y:H},{x:0,y:H-R},8));
    fin.push({x:0,y:R});
    fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ページシート", cutInfo:`${p.sheet*2}枚（${p.sheet}組）／2枚ずつ中表に縫って返し、中心で二つ折り`,
      ...pc, foldX:null,
      grain:{x1:W/2,y1:H*0.2,x2:W/2,y2:H*0.8},
      casingLines:[], notches:[{x:W/2,y:0},{x:W/2,y:H}], labelAt:{x:W/2,y:H/2}
    }],
    memo:`できあがり ${p.w}×${p.h}cm の ${p.sheet*2}ページ ／ 中心の合印をそろえて重ね、まとめて縫うと背になります`};
  }
};

/* ---- タグハンカチ（おもちゃ） ---- */
PATTERNS.taghanky={
  mode:"baby",
  name:"タグハンカチ",
  note:"周りにリボンのタグをはさんだ小さなハンカチ。赤ちゃんはタグを触るのが好きなので、これひとつでよく遊びます。2枚を中表に縫って返すだけ。タオル地とガーゼで作ると手触りが変わって楽しめます。",
  params:[
    {key:"size", label:"1辺の長さ",unit:"cm",min:14,max:30, step:1,  val:20},
    {key:"round",label:"角の丸み", unit:"cm",min:0, max:5,  step:0.5,val:2.5},
    {key:"tabs", label:"タグの数（1辺あたり）",unit:"個",min:1,max:4,step:1,val:2},
  ],
  presets:[
    {label:"小さめ",vals:{size:16,round:2,tabs:2}},
    {label:"標準",  vals:{size:20,round:2.5,tabs:2}},
    {label:"大きめ",vals:{size:25,round:3,tabs:3}},
  ],
  toggles:[],
  gen(p,sa){
    const S=cm(p.size), R=Math.min(cm(p.round),S/2-1);
    let fin=[{x:R,y:0},{x:S-R,y:0}];
    fin=fin.concat(quad({x:S-R,y:0},{x:S,y:0},{x:S,y:R},8));
    fin.push({x:S,y:S-R});
    fin=fin.concat(quad({x:S,y:S-R},{x:S,y:S},{x:S-R,y:S},8));
    fin.push({x:R,y:S});
    fin=fin.concat(quad({x:R,y:S},{x:0,y:S},{x:0,y:S-R},8));
    fin.push({x:0,y:R});
    fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    const pc=pieceFrom(fin,()=>false,sa);
    const nt=[];
    for(let i=1;i<=p.tabs;i++){ const t=S*i/(p.tabs+1);
      nt.push({x:t,y:0},{x:t,y:S},{x:0,y:t},{x:S,y:t}); }
    return {pieces:[{
      title:"ハンカチ", cutInfo:"2枚（表布・裏布）／合印にタグをはさんで中表に縫う",
      ...pc, foldX:null,
      grain:{x1:S/2,y1:S*0.2,x2:S/2,y2:S*0.8},
      notches:nt, labelAt:{x:S/2,y:S/2}
    }],
    memo:`タグは合計 ${p.tabs*4} 本 ／ リボンは6cmに切って輪にし、外向きに合わせてはさみます`};
  }
};

/* ---- お手玉（おもちゃ） ---- */
PATTERNS.otedama={
  mode:"baby",
  name:"お手玉",
  note:"座布団型のお手玉。長方形2枚を十字に組んで縫うと、あの形になります。中身はペレットか小豆を6分目まで。にぎる・投げる・音を聞く、と長く遊べます。縫い目は返し縫いで詰めてください。",
  params:[
    {key:"w",label:"布の短辺",unit:"cm",min:5, max:11, step:0.5,val:7},
    {key:"l",label:"布の長辺",unit:"cm",min:12,max:26, step:1,  val:17},
  ],
  presets:[
    {label:"小さめ",vals:{w:6,l:14}},
    {label:"標準",  vals:{w:7,l:17}},
    {label:"大きめ",vals:{w:8.5,l:20}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), L=cm(p.l);
    const fin=[{x:0,y:0},{x:W,y:0},{x:W,y:L},{x:0,y:L}];
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"お手玉布", cutInfo:"2枚／十字に重ねて、突き合う辺どうしを縫う",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:L*0.2,x2:W/2,y2:L*0.8},
      notches:[{x:0,y:L/2},{x:W,y:L/2}], labelAt:{x:W/2,y:L/2}
    }],
    memo:`中身は約 ${Math.round(p.w*p.l*0.55)}g が目安（ペレットまたは小豆）／ 入れすぎると角が張るので6分目で`};
  }
};

/* ---- ベビー枕（ドーナツ枕） ---- */
PATTERNS.babypillow={
  mode:"baby",
  name:"ベビー枕（ドーナツ型）",
  note:"まんなかがくぼんだドーナツ型のベビー枕。頭の一点に重さがかからないので、向きぐせが気になるときに。ドーナツ2枚を中表に縫い、外周の返し口から返して綿を入れます。洗い替えに2つあると安心です。",
  params:[
    {key:"outer",label:"外径",     unit:"cm",min:16,max:30, step:1,  val:22},
    {key:"inner",label:"内径（穴）",unit:"cm",min:5, max:14, step:1,  val:8},
  ],
  presets:[
    {label:"新生児",   vals:{outer:19,inner:7}},
    {label:"標準",     vals:{outer:22,inner:8}},
    {label:"大きめ",   vals:{outer:26,inner:10}},
  ],
  toggles:[],
  gen(p,sa){
    const RO=cm(p.outer)/2, RI=Math.min(cm(p.inner)/2, RO-cm(3));
    const ring=(r,cx,cy)=>{const a=[];for(let i=0;i<48;i++){const t=i/48*Math.PI*2;
      a.push({x:cx+r*Math.cos(t),y:cy+r*Math.sin(t)});}return a;};
    const out=pieceFrom(ring(RO,RO,RO),()=>false,sa);
    const inn=pieceFrom(ring(RI,RI,RI),()=>false,sa);
    return {pieces:[
      {title:"枕（外まわり）", cutInfo:"2枚／中表に合わせ、外周を返し口を残して縫う",
       ...out, foldX:null, grain:{x1:RO,y1:RO*0.3,x2:RO,y2:RO*1.7},
       notches:[{x:RO*2,y:RO}], labelAt:{x:RO,y:RO}},
      {title:"中央の穴", cutInfo:"2枚に同じ位置で開ける／穴のまわりを先に縫ってから外周へ",
       ...inn, foldX:null, grain:{x1:RI,y1:RI*0.4,x2:RI,y2:RI*1.6},
       notches:[], labelAt:{x:RI,y:RI}}
    ],
    memo:`穴は枕の中央に配置します ／ 綿はやわらかめに、押すと沈むくらいで止めてください`};
  }
};

/* ---- お昼寝マット ---- */
PATTERNS.napmat={
  mode:"baby",
  name:"お昼寝マット",
  note:"床にさっと敷ける薄手のマット。表布・キルト芯・裏布を重ねて周りをバイアスでくるむだけ。保育園のお昼寝用にも、リビングでの寝かせ置きにも。丸めてひもで留められます。",
  params:[
    {key:"w",    label:"幅",       unit:"cm",min:50,max:90, step:1,  val:70},
    {key:"l",    label:"長さ",     unit:"cm",min:80,max:140,step:1,  val:120},
    {key:"round",label:"角の丸み", unit:"cm",min:0, max:10, step:1,  val:5},
  ],
  presets:[
    {label:"新生児",       vals:{w:60,l:90, round:4}},
    {label:"標準",         vals:{w:70,l:120,round:5}},
    {label:"保育園サイズ", vals:{w:78,l:128,round:6}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), L=cm(p.l), R=Math.min(cm(p.round),W/2-1,L/2-1);
    let fin=[{x:R,y:0},{x:W-R,y:0}];
    fin=fin.concat(quad({x:W-R,y:0},{x:W,y:0},{x:W,y:R},8));
    fin.push({x:W,y:L-R});
    fin=fin.concat(quad({x:W,y:L-R},{x:W,y:L},{x:W-R,y:L},8));
    fin.push({x:R,y:L});
    fin=fin.concat(quad({x:R,y:L},{x:0,y:L},{x:0,y:L-R},8));
    fin.push({x:0,y:R});
    fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    const pc=pieceFrom(fin,()=>false,sa);
    const TL=cm(50), TW=cm(3.5);
    const tie=pieceFrom([{x:0,y:0},{x:TL,y:0},{x:TL,y:TW},{x:0,y:TW}],()=>false,sa);
    return {pieces:[
      {title:"マット本体", cutInfo:"表布1枚・裏布1枚・キルト芯1枚／3枚重ねて周りをバイアスでくるむ",
       ...pc, foldX:null, grain:{x1:W/2,y1:L*0.15,x2:W/2,y2:L*0.85},
       notches:[{x:0,y:L*0.25},{x:0,y:L*0.75}], labelAt:{x:W/2,y:L/2}},
      {title:"留めひも", cutInfo:"1本（4つ折りにして縫う）／左端の合印に縫い付ける", ...tie, foldX:null,
       grain:{x1:TL*0.2,y1:TW/2,x2:TL*0.8,y2:TW/2}, notches:[], labelAt:{x:TL/2,y:TW/2}}
    ],
    memo:`バイアステープは約 ${Math.round((2*(p.w+p.l))/10+30)/10*10}cm 必要です ／ 芯は薄手のドミット芯が扱いやすいです`};
  }
};

/* ---- ベビー布団カバー ---- */
PATTERNS.babyfuton={
  mode:"baby",
  name:"ベビー布団カバー",
  note:"ベビー布団の掛けカバー。封筒型で、入れ口を折り返すだけなのでファスナーもボタンも要りません。お使いの布団の実寸に少しゆとりを足して作ります。ダブルガーゼで作ると軽くて乾きも早いです。",
  params:[
    {key:"w",   label:"布団の幅",   unit:"cm",min:60,max:110,step:1,val:90},
    {key:"l",   label:"布団の長さ", unit:"cm",min:80,max:140,step:1,val:120},
    {key:"ease",label:"ゆとり",     unit:"cm",min:0, max:6,  step:0.5,val:2},
    {key:"flap",label:"入れ口の折り返し",unit:"cm",min:10,max:30,step:1,val:18},
  ],
  presets:[
    {label:"ミニサイズ",   vals:{w:75, l:95, ease:2,flap:15}},
    {label:"レギュラー",   vals:{w:90, l:120,ease:2,flap:18}},
    {label:"大きめ",       vals:{w:100,l:130,ease:3,flap:20}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w)+cm(p.ease), L=cm(p.l)+cm(p.ease), F=cm(p.flap);
    const front=pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:L},{x:0,y:L}],()=>false,sa);
    const back =pieceFrom([{x:0,y:0},{x:W,y:0},{x:W,y:L+F},{x:0,y:L+F}],()=>false,sa);
    return {pieces:[
      {title:"表面", cutInfo:"1枚", ...front, foldX:null,
       grain:{x1:W/2,y1:L*0.2,x2:W/2,y2:L*0.8}, notches:[], labelAt:{x:W/2,y:L/2}},
      {title:"裏面（折り返しつき）", cutInfo:`1枚／下端を${p.flap}cm内側に折り返して入れ口にする`,
       ...back, foldX:null, grain:{x1:W/2,y1:L*0.2,x2:W/2,y2:L*0.8},
       casingLines:[L], casingLabel:"折り返し位置", notches:[{x:0,y:L},{x:W,y:L}], labelAt:{x:W/2,y:L/2}}
    ],
    memo:`できあがり ${Math.round(p.w+p.ease)}×${Math.round(p.l+p.ease)}cm ／ 洗い替えに2枚あると安心です`};
  }
};

/* ---- おむつカバー ---- */
PATTERNS.diapercover={
  mode:"baby",
  name:"おむつカバー",
  note:"布おむつの上からはくカバー。股上を深めにとって、脇はスナップで留めます。脚まわりと胴まわりにゴムを通すともれにくくなります。防水布で作ると外出にも使えます。",
  params:[
    {key:"waist", label:"胴まわり",   unit:"cm",min:36,max:56, step:1,  val:44},
    {key:"rise",  label:"股上",       unit:"cm",min:14,max:26, step:1,  val:19},
    {key:"crotch",label:"股ぐりの幅", unit:"cm",min:7, max:14, step:0.5,val:10},
    {key:"ease",  label:"ゆとり（総量）",unit:"cm",min:4,max:14,step:1, val:8},
  ],
  presets:[
    {label:"新生児",  vals:{waist:38,rise:16,crotch:8, ease:6}},
    {label:"3〜6か月",vals:{waist:44,rise:19,crotch:10,ease:8}},
    {label:"6〜12か月",vals:{waist:50,rise:22,crotch:11,ease:9}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.waist)+cm(p.ease))/4, CR=cm(p.rise), CW=cm(p.crotch)/2;
    let fin=[{x:0,y:0},{x:HW,y:0}];
    fin=fin.concat(quad({x:HW,y:0},{x:HW,y:CR*0.72},{x:CW,y:CR},10));
    fin.push({x:0,y:CR});
    const pc=pieceFrom(fin,(a,b)=>Math.abs(a.x)<0.01&&Math.abs(b.x)<0.01,sa);
    return {pieces:[{
      title:"前/後カバー", cutInfo:"前後それぞれ「わ」で1枚ずつ／股下を縫い、脇はスナップ留め",
      ...pc, foldX:0,
      grain:{x1:HW*0.5,y1:CR*0.2,x2:HW*0.5,y2:CR*0.8},
      casingLines:[cm(1.5)], casingLabel:"胴まわりのゴム通し",
      notches:[{x:HW,y:CR*0.72}], labelAt:{x:HW*0.45,y:CR*0.5}
    }],
    memo:`胴のゴムは ${Math.round(p.waist*0.85)}cm、脚まわりは各 ${Math.round(p.crotch*1.6)}cm が目安 ／ 脇はスナップ2組`};
  }
};

/* ---- 授乳クッションカバー ---- */
PATTERNS.nursingpillow={
  mode:"baby",
  name:"授乳クッションカバー",
  note:"三日月型の授乳クッションにかぶせるカバー。よごれるたびに洗えるよう、入れ口は封筒型にしてあります。手持ちのクッションの外径・内径・幅を測って入れてください。",
  params:[
    {key:"outer",label:"外径",   unit:"cm",min:40,max:70, step:1,  val:56},
    {key:"inner",label:"内径",   unit:"cm",min:12,max:34, step:1,  val:22},
    {key:"thick",label:"厚み",   unit:"cm",min:8, max:18, step:1,  val:12},
    {key:"open", label:"開き角度",unit:"度",min:50,max:110,step:5,  val:80},
  ],
  presets:[
    {label:"小さめ",vals:{outer:50,inner:18,thick:10,open:75}},
    {label:"標準",  vals:{outer:56,inner:22,thick:12,open:80}},
    {label:"大きめ",vals:{outer:64,inner:28,thick:14,open:90}},
  ],
  toggles:[],
  gen(p,sa){
    const RO=cm(p.outer)/2, RI=cm(p.inner)/2, T=cm(p.thick);
    const a0=(p.open/2)*Math.PI/180, a1=Math.PI*2-a0;   // 開口部を残した三日月
    const fin=[];
    for(let i=0;i<=40;i++){const t=a0+(a1-a0)*i/40; fin.push({x:RO+RO*Math.cos(t),y:RO+RO*Math.sin(t)});}
    for(let i=40;i>=0;i--){const t=a0+(a1-a0)*i/40; fin.push({x:RO+RI*Math.cos(t),y:RO+RI*Math.sin(t)});}
    const pc=pieceFrom(fin,()=>false,sa);
    const gl=pieceFrom([{x:0,y:0},{x:Math.PI*RO*1.2,y:0},{x:Math.PI*RO*1.2,y:T},{x:0,y:T}],()=>false,sa);
    return {pieces:[
      {title:"上面/下面", cutInfo:"2枚（上下）／まち布をはさんで縫い合わせる",
       ...pc, foldX:null, grain:{x1:RO,y1:RO*0.35,x2:RO,y2:RO*1.65},
       notches:[{x:RO+RO*Math.cos(a0),y:RO+RO*Math.sin(a0)}], labelAt:{x:RO,y:RO*0.35}},
      {title:"まち布", cutInfo:`2本（外まわり用・内まわり用）／幅${p.thick}cm。長さは縫いながら合わせる`,
       ...gl, foldX:null, grain:{x1:Math.PI*RO*0.2,y1:T/2,x2:Math.PI*RO,y2:T/2},
       notches:[], labelAt:{x:Math.PI*RO*0.6,y:T/2}}
    ],
    memo:`まち布は少し長めに裁って、縫いながら余りを切ると失敗しません ／ 開口部は重ねの封筒型にします`};
  }
};

/* ---- ガーゼハンカチ ---- */
PATTERNS.gauzehanky={
  mode:"baby",
  name:"ガーゼハンカチ",
  note:"沐浴にも、汗ふきにも、よだれふきにも使う定番。ダブルガーゼ2枚を中表に縫って返すだけなので、はぎれの消化にもぴったりです。何枚あっても困りません。角は丸くしてあります。",
  params:[
    {key:"w",    label:"幅",      unit:"cm",min:18,max:36, step:1,  val:25},
    {key:"h",    label:"高さ",    unit:"cm",min:18,max:36, step:1,  val:25},
    {key:"round",label:"角の丸み",unit:"cm",min:0, max:5,  step:0.5,val:2},
  ],
  presets:[
    {label:"小（沐浴用）",vals:{w:20,h:20,round:1.5}},
    {label:"標準",        vals:{w:25,h:25,round:2}},
    {label:"大（body用）",vals:{w:32,h:32,round:3}},
  ],
  toggles:[],
  gen(p,sa){
    const W=cm(p.w), H=cm(p.h), R=Math.min(cm(p.round),W/2-1,H/2-1);
    let fin=[{x:R,y:0},{x:W-R,y:0}];
    fin=fin.concat(quad({x:W-R,y:0},{x:W,y:0},{x:W,y:R},8));
    fin.push({x:W,y:H-R});
    fin=fin.concat(quad({x:W,y:H-R},{x:W,y:H},{x:W-R,y:H},8));
    fin.push({x:R,y:H});
    fin=fin.concat(quad({x:R,y:H},{x:0,y:H},{x:0,y:H-R},8));
    fin.push({x:0,y:R});
    fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"ハンカチ", cutInfo:"2枚／中表に縫い、返し口から返してぐるりとステッチ",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:H*0.2,x2:W/2,y2:H*0.8},
      notches:[{x:W*0.35,y:H},{x:W*0.65,y:H}], labelAt:{x:W/2,y:H/2}
    }],
    memo:`下辺の合印のあいだ（約${Math.round(p.w*0.3)}cm）を返し口に残します ／ 水通しをすると縮みが落ち着きます`};
  }
};

/* ---- ベビーレギンス ---- */
PATTERNS.babyleggings={
  mode:"baby",
  name:"ベビーレギンス",
  note:"おむつの上からはける、細身のレギンス。前後同じ型紙で、股ぐり同士を縫ってから股下を縫います。おむつ分に股上を深くとってあります。ニット地で作ってください。",
  params:[
    {key:"hip",   label:"ヒップ",   unit:"cm",min:36,max:60, step:1,  val:46},
    {key:"rise",  label:"股上",     unit:"cm",min:16,max:28, step:1,  val:21},
    {key:"inseam",label:"股下",     unit:"cm",min:10,max:34, step:1,  val:20},
    {key:"cuff",  label:"裾まわり", unit:"cm",min:10,max:22, step:1,  val:14},
    {key:"ease",  label:"ゆとり（総量）",unit:"cm",min:0,max:10,step:1,val:4},
    {key:"casing",label:"ウエスト折り返し",unit:"cm",min:2,max:4,step:0.5,val:2.5},
  ],
  presets:[
    {label:"70cm", vals:{hip:44,rise:20,inseam:17,cuff:13,ease:4,casing:2.5}},
    {label:"80cm", vals:{hip:47,rise:21,inseam:21,cuff:14,ease:4,casing:2.5}},
    {label:"90cm", vals:{hip:50,rise:22,inseam:25,cuff:15,ease:4,casing:3}},
  ],
  toggles:[],
  gen(p,sa){
    const HW=(cm(p.hip)+cm(p.ease))/4, CR=cm(p.rise), IL=cm(p.inseam);
    const CAS=cm(p.casing), CF=cm(2.5);
    const CW=Math.min(cm(p.cuff)/2, HW+CF);
    const H=CAS+CR+IL, hipX=HW+CF;
    let fin=[{x:0,y:0},{x:HW,y:0},{x:HW,y:CAS}];
    fin=fin.concat(quad({x:HW,y:CAS},{x:hipX,y:CAS},{x:hipX,y:CAS+CR},8));
    fin.push({x:CW,y:H},{x:0,y:H});
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"前/後レギンス", cutInfo:"前後それぞれ2枚（左右）計4枚／中心線・股ぐり同士を縫う",
      ...pc, foldX:null,
      grain:{x1:HW*0.45,y1:CAS+CR/2,x2:HW*0.45,y2:H-8},
      casingLines:[CAS], casingLabel:"ウエスト折り返し",
      notches:[{x:hipX,y:CAS+CR}], labelAt:{x:HW*0.45,y:CAS+(CR+IL)*0.6}
    }],
    memo:`ウエストゴムの目安 ${Math.round(p.hip*0.8)}cm ／ ニット用針とストレッチステッチで縫ってください`};
  }
};

/* ---- 抱っこ紐よだれカバー ---- */
PATTERNS.suckpad={
  mode:"baby",
  name:"抱っこ紐よだれカバー",
  note:"抱っこ紐の肩ベルトに巻きつけて、よだれから守るカバー。スナップで留めるだけなので、洗いたいときにすぐ外せます。表はガーゼ、裏はタオル地にすると吸います。左右2枚で1組です。",
  params:[
    {key:"len",  label:"長さ",       unit:"cm",min:16,max:32, step:1,  val:22},
    {key:"wrap", label:"ベルトを巻く幅",unit:"cm",min:14,max:26,step:1,val:19},
    {key:"round",label:"角の丸み",   unit:"cm",min:0, max:4,  step:0.5,val:2},
  ],
  presets:[
    {label:"細めのベルト",vals:{len:20,wrap:16,round:2}},
    {label:"標準",        vals:{len:22,wrap:19,round:2}},
    {label:"太めのベルト",vals:{len:26,wrap:23,round:2.5}},
  ],
  toggles:[],
  gen(p,sa){
    const L=cm(p.len), W=cm(p.wrap), R=Math.min(cm(p.round),W/2-1,L/2-1);
    let fin=[{x:R,y:0},{x:W-R,y:0}];
    fin=fin.concat(quad({x:W-R,y:0},{x:W,y:0},{x:W,y:R},8));
    fin.push({x:W,y:L-R});
    fin=fin.concat(quad({x:W,y:L-R},{x:W,y:L},{x:W-R,y:L},8));
    fin.push({x:R,y:L});
    fin=fin.concat(quad({x:R,y:L},{x:0,y:L},{x:0,y:L-R},8));
    fin.push({x:0,y:R});
    fin=fin.concat(quad({x:0,y:R},{x:0,y:0},{x:R,y:0},8));
    const pc=pieceFrom(fin,()=>false,sa);
    return {pieces:[{
      title:"よだれカバー", cutInfo:"表布2枚・裏布2枚（左右で1組）／中表に縫って返す",
      ...pc, foldX:null,
      grain:{x1:W/2,y1:L*0.2,x2:W/2,y2:L*0.8},
      notches:[{x:0,y:L*0.5},{x:W,y:L*0.5}], labelAt:{x:W/2,y:L/2}
    }],
    memo:`左右の合印にスナップを2組ずつ ／ 巻いてみて、ベルトが動かない位置で留め具を決めてください`};
  }
};

/* ---- 人気順に表示順を整列 ---- */
(function(){
  const ORDER=[
    /* 大人服 */  'tee','apron','skirt','flareskirt','mermaid','sleevedress','adultgather','widepants','halfpants','tunic','camisole','blouse','onepiece','jacket','coat','tightskirt','pleatskirt','wrapskirt','tieredskirt','adultvest','cardigan','taperedpants','culotte','poncho','overall','dolman','hoodie','raglantee','sweatpants','shirtdress','shirt','yukata','samue','samuepants','kappogi','pajamas','pajamapants','blouson', 'gown','nocollarjacket','cargopants','hanten',
    /* 子供服 */  'kidstee','kidsdress','smock','kidsvest','pants','kidshalf','gather','jinbei','kidsrompers','kidsraglan','jumperskirt','kidshoodie','kidstank','kidscoat','kidsbibapron','jinbeipants','kidsculotte', 'kidsshirt','kidscape',
    /* ベビー */  'bloomers','swaddle','bandanastai','stai','babyhat','sleeper','babyshoes','babymitten','babycape','babypants','babyblanket','babytoy','fabricball','clothbook','taghanky','otedama','babypillow','napmat','babyfuton','diapercover','nursingpillow','gauzehanky','babyleggings','suckpad','diaperpouch','wipescase','carriercover', 'nursingcape','strollerseat', 'coverall',
    /* 小物 */    'kinchaku','kincgusset','gymbag','shoesbag','movepocket','mask','fittedmask','bandana','placemat','shuushu','headband','tissuecase','bookcover','bowtie','potholder','eyemask','neckwarmer','legwarmer','maskcase','armcover','keycase','glassescase','sunhat','beret','hairturban','bottleholder','cap','boshitecho','cardcase','bousaizukin','dollclothes','teddy','scarf','nametag', 'pencase','bankbook','flaskcover','randocover','recordercase','nuiclothes', 'uchiwacover','cutlerycase','necktie','pincushion','camerastrap',
    /* バッグ */  'tote','pouch','pouchgusset','gamaguchi','sacoche','azuma','panel','clutchbag','shoulderbag','ecobag','bucketbag','backpack','roundkinchaku','bodybag','baginbag','wallet','phonepouch','lunchbag', 'cosmepouch','passportcase','laptopcase','tabletcase','waistbag','bostonbag','gadgetpouch','ehonbag', 'itabag','yogamatbag',
    /* ペット */  'dog','dogsleeved','mannerbelt','petbandana','petsnood','catfuku','petvest','petbed','petcape','petcollar','pettoy','petmat','petpouch', 'petsling','petcarrier',
    /* ホーム */  'cushioncover','tablecloth','pillowcase','curtain','chairpad','wallpocket','laundrybag','chaircover','boxcover','slipper','zabuton','cafecurtain','coaster','ovenmitt', 'tissuebox','noren','remotepocket','neckpillow', 'teacosy','treeskirt','fabricbasket','tablerunner','picnicmat','machinecover','toiletcover',
  ];
  const extras=Object.keys(PATTERNS).filter(k=>!ORDER.includes(k));
  [...ORDER,...extras].forEach(k=>{
    if(!PATTERNS[k])return;
    const v=PATTERNS[k]; delete PATTERNS[k]; PATTERNS[k]=v;
  });
})();
