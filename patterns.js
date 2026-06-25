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
    lines.push({x:a.x+nx*off, y:a.y+ny*off, dx, dy});
  }
  const out=[];
  for(let i=0;i<n;i++){
    const l1=lines[(i-1+n)%n], l2=lines[i];
    const det=l1.dx*(-l2.dy)-(-l1.dy)*l2.dx;
    if(Math.abs(det)<1e-9){out.push({x:l2.x,y:l2.y});continue;}
    const t=((l2.x-l1.x)*(-l2.dy)-(l2.y-l1.y)*(-l2.dx))/det;
    out.push({x:l1.x+l1.dx*t,y:l1.y+l1.dy*t});
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

/* ============================================================
   パターン定義
   各 generator(params, sa)  →  { pieces:[ piece... ] }
   piece = { title, cutInfo, finished:[{x,y}], cut:[{x,y}],
             grain:{x1,y1,x2,y2}|null, foldX:Number|null,
             notches:[{x,y}], labelAt:{x,y} }
   座標は piece ローカル(時計回り, y-down)。配置はレイアウト時に平行移動。
   ============================================================ */

function pieceFrom(finished, foldEdgeTest, sa){
  // foldEdgeTest(a,b) → true なら その辺は縫い代0(=わ)
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
    name:"汎用パネル",
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
          arm:plen(armCurve), neck:plen(neckCurve),
          piece:{title:back?"後身頃":"前身頃",
            cutInfo:`中心を「わ」／${back?"後ろ":"前"} 1枚`,
            ...pc, foldX:0,
            grain:{x1:HW*0.5,y1:slope+8,x2:HW*0.5,y2:L-14},
            notches:[{x:HW,y:ADy}], labelAt:{x:HW*0.5,y:L*0.55}}};
      };
      const F=body(false), B=body(true);
      // 袖（左右対称・cut2）
      const capFull=F.arm+B.arm, SL=cm(p.sleeve), cuff=cm(p.cuff), capH=cm(2.5), cx=capFull/2;
      let sf=[{x:0,y:capH}];
      sf=sf.concat(quad({x:0,y:capH},{x:cx*0.5,y:0},{x:cx,y:capH*0.4},8));
      sf=sf.concat(quad({x:cx,y:capH*0.4},{x:cx*1.5,y:0},{x:capFull,y:capH},8));
      sf.push({x:(capFull+cuff)/2,y:SL}); sf.push({x:(capFull-cuff)/2,y:SL});
      const spc=pieceFrom(sf,()=>false,sa);
      const sleeve={title:"袖", cutInfo:"2枚（左右）", ...spc, foldX:null,
        grain:{x1:cx,y1:capH+6,x2:cx,y2:SL-6},
        notches:[{x:cx,y:capH*0.4}], labelAt:{x:cx,y:SL*0.55}};
      return {pieces:[F.piece,B.piece,sleeve],
        memo:`衿ぐり1周 約${((F.neck+B.neck)/10).toFixed(0)}cm（衿ぐりバインダーの参考長）`};
    }
  },

  /* ---- 巾着（子供用の小袋） ---- */
  kinchaku:{
    mode:"small",
    name:"巾着・小袋",
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
    name:"犬服（タンク）",
    note:"背パネルと腹パネルを脇で縫う筒型タンク。前足ぐりは脇の内えぐり。体型差が大きいので、まず仮縫いしてワンちゃんに合わせて調整してください。",
    params:[
      {key:"chest",label:"胴回り",unit:"cm",min:24,max:90,step:1,val:48},
      {key:"len",label:"背丈（背側）",unit:"cm",min:18,max:60,step:1,val:34},
      {key:"bellylen",label:"腹側の丈",unit:"cm",min:10,max:45,step:1,val:24},
      {key:"neck",label:"首回り",unit:"cm",min:16,max:60,step:1,val:28},
      {key:"legpos",label:"前足ぐり位置",unit:"cm",min:6,max:20,step:0.5,val:11},
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
      const HW=cm(p.chest)/4+cm(p.ease)/4, NWh=cm(p.neck)/4;
      const legY=cm(p.legpos), legW=cm(p.legw);
      const panel=(belly)=>{
        const L=cm(belly?p.bellylen:p.len), Ndrop=cm(belly?6:2.5);
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
    name:"ギャザースカート",
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

/* ---- 子供Tシャツ：Tシャツの製図ロジックを流用し、寸法とプリセットのみ子供向けに ---- */
PATTERNS.kidstee={
  ...PATTERNS.tee,
  mode:"kids",
  name:"子供Tシャツ",
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
    {key:"bh",   label:"本の高さ",      unit:"cm",min:10,max:26,step:0.5,val:14.8},
    {key:"bw",   label:"本の幅（片面）",unit:"cm",min:7, max:16,step:0.5,val:10.5},
    {key:"thick",label:"本の厚み",       unit:"cm",min:0.5,max:5,step:0.5,val:1.5},
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

/* ---- ポーチ（マチあり） ---- */
PATTERNS.pouchgusset={
  mode:"bag",
  name:"ポーチ（マチあり）",
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
    {key:"tieL",  label:"腰ひも長さ（片側）",  unit:"cm",min:50,max:120,step:5, val:65},
    {key:"neckL", label:"衿ひも長さ",           unit:"cm",min:50,max:100,step:5, val:65},
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
    {key:"strapL",label:"ショルダー紐長さ",unit:"cm",min:80,max:180,step:5, val:120},
    {key:"strapW",label:"紐の裁ち幅",      unit:"cm",min:3, max:8,  step:0.5,val:5},
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
    const strap={title:"ショルダー紐", cutInfo:"1枚（長さ方向に二つ折りで縫う）",
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
  mode:"kids",
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

/* ---- ゴムウエストパンツ ---- */
PATTERNS.pants={
  mode:"kids",
  name:"ゴムウエストパンツ",
  note:"前後同じ型紙のゆったりシルエット。中心線同士を縫い合わせ、脇縫いして、ウエストを折り返してゴムを通します。右端が股ぐりカーブ（中心縫い側）。仮縫いで股ぐりを確認してください。",
  params:[
    {key:"hip",    label:"ヒップ",             unit:"cm",min:50,max:130,step:1,  val:68},
    {key:"rise",   label:"股上（ウエスト〜股ぐり）",unit:"cm",min:18,max:40,step:1,  val:24},
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
  mode:"kids",
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
      cutInfo:half?"CBを「わ」に置いて1枚裁ち（計1枚）":"CF・CBとも「わ」に置いて1枚裁ち（計1枚）",
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

/* ---- 人気順に表示順を整列 ---- */
(function(){
  const ORDER=[
    /* バッグ */  'tote','pouch','pouchgusset','gamaguchi','sacoche','panel',
    /* 大人服 */  'tee','apron','skirt','flareskirt','mermaid','sleevedress',
    /* 小物 */    'kinchaku','kincgusset','placemat','shuushu','headband','tissuecase','bookcover','bowtie',
    /* ペット */  'dog','dogsleeved','mannerbelt',
    /* 子供服 */  'kidstee','stai','movepocket','pants','gather',
  ];
  const extras=Object.keys(PATTERNS).filter(k=>!ORDER.includes(k));
  [...ORDER,...extras].forEach(k=>{
    if(!PATTERNS[k])return;
    const v=PATTERNS[k]; delete PATTERNS[k]; PATTERNS[k]=v;
  });
})();
