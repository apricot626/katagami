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
        casingLines:[cm(p.casing)]
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
    {label:"90cm",  vals:{bust:54, len:34, shoulder:27, sleeve:11, cuff:12, neckw:13, ease:8}},
    {label:"100cm", vals:{bust:58, len:38, shoulder:28, sleeve:12, cuff:12, neckw:13, ease:8}},
    {label:"110cm", vals:{bust:62, len:42, shoulder:30, sleeve:13, cuff:13, neckw:14, ease:10}},
    {label:"120cm", vals:{bust:66, len:46, shoulder:31, sleeve:14, cuff:13, neckw:14, ease:10}},
    {label:"130cm", vals:{bust:70, len:50, shoulder:33, sleeve:15, cuff:14, neckw:15, ease:10}},
  ],
};
