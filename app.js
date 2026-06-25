/* ============================================================
   カタガミ — parametric sewing pattern → mm-accurate A4 tiling
   全長さ単位: mm（内部）。入力はcm。
   ============================================================ */

/* ---- A4 タイル設定 (mm) ---- */
const PAGE_W=210, PAGE_H=297, MARGIN=10, OVERLAP=10;
const CONTENT_W=PAGE_W-2*MARGIN;        // 190
const CONTENT_H=PAGE_H-2*MARGIN;        // 277
const STEP_X=CONTENT_W-OVERLAP;         // 180
const STEP_Y=CONTENT_H-OVERLAP;         // 267
const LAYOUT_GAP=22;                    // ピース間の隙間
const CANVAS_PAD=8;
const WRAP_W=640;                       // この幅でレイアウト改行

/* ---- 状態 & UI ---- */
const state={mode:"human", pat:"skirt", params:{}, toggles:{}, sa:1.0, showSew:true};
const MODES=[
  {key:"human",label:"大人服"},
  {key:"kids", label:"子供服"},
  {key:"small",label:"小物"},
  {key:"bag",  label:"バッグ"},
  {key:"pet",  label:"ペット"},
];
const patsInMode=m=>Object.keys(PATTERNS).filter(k=>PATTERNS[k].mode===m);
const el=id=>document.getElementById(id);
const SVGNS="http://www.w3.org/2000/svg";
function S(tag,attrs){const e=document.createElementNS(SVGNS,tag);
  for(const k in attrs)e.setAttribute(k,attrs[k]);return e;}
function ptsStr(a){return a.map(p=>`${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");}

/* ---- GA4 イベント送信（gtag 未ロード時は無視） ---- */
function ga(name,params){if(typeof gtag==='function')gtag('event',name,params);}

/* ---- 印刷透かし：各シートSVGに斜め反復テキストを挿入 ---- */
let _wmSeq=0;
function addWatermark(svg){
  const id='wm'+(++_wmSeq);
  let defs=svg.querySelector('defs');
  if(!defs){defs=S('defs',{});svg.insertBefore(defs,svg.firstChild);}
  const pat=S('pattern',{id,x:0,y:0,width:84,height:48,
    patternTransform:'rotate(32)',patternUnits:'userSpaceOnUse'});
  const t=S('text',{x:2,y:34,'font-size':8,'font-family':'sans-serif',
    fill:'#1B1D1A','fill-opacity':'0.07','font-weight':'700','letter-spacing':'3'});
  t.textContent='カタガミ.com';
  pat.appendChild(t);
  defs.appendChild(pat);
  // watermark rect: insert right after defs so it renders behind all content
  svg.insertBefore(S('rect',{x:0,y:0,width:PAGE_W,height:PAGE_H,fill:'url(#'+id+')'}),
    defs.nextSibling);
}

function initParams(){
  const def=PATTERNS[state.pat];
  state.params={}; def.params.forEach(f=>state.params[f.key]=f.val);
  state.toggles={}; (def.toggles||[]).forEach(t=>state.toggles[t.key]=t.val);
}

function buildModes(){
  const wrap=el("modeTabs"); wrap.innerHTML="";
  MODES.forEach(m=>{
    const b=document.createElement("button");
    b.textContent=m.label; b.setAttribute("aria-pressed", m.key===state.mode);
    b.onclick=()=>{
      state.mode=m.key;
      const list=patsInMode(m.key);
      if(!list.includes(state.pat)) state.pat=list[0];
      initParams(); buildModes(); buildTabs(); buildFields(); render();
      ga('select_mode',{mode:m.key,mode_label:m.label});
    };
    wrap.appendChild(b);
  });
}
function buildTabs(){
  const wrap=el("patTabs"); wrap.innerHTML="";
  patsInMode(state.mode).forEach(k=>{
    const v=PATTERNS[k];
    const b=document.createElement("button");
    b.textContent=v.name; b.setAttribute("aria-pressed", k===state.pat);
    b.onclick=()=>{state.pat=k; initParams(); render(); buildFields(); buildTabs();
      ga('select_pattern',{pattern:k,pattern_name:v.name,mode:state.mode});
    };
    wrap.appendChild(b);
  });
}
function buildFields(){
  const def=PATTERNS[state.pat];
  el("patNote").textContent=def.note;
  const box=el("fields"); box.innerHTML="";
  if(def.presets && def.presets.length){
    const ps=document.createElement("div"); ps.className="presets";
    const row=def.presets.map(pr=>`<button type="button">${pr.label}</button>`).join("");
    ps.innerHTML=`<div class="ptitle">目安サイズ（クリックで数値を入れる）</div><div class="prow">${row}</div>`;
    ps.querySelectorAll(".prow button").forEach((btn,i)=>{
      btn.onclick=()=>{
        const vals=def.presets[i].vals;
        def.params.forEach(f=>{ if(f.key in vals){
          state.params[f.key]=Math.min(f.max,Math.max(f.min,vals[f.key])); } });
        buildFields(); render();
      };
    });
    box.appendChild(ps);
  }
  def.params.forEach(f=>{
    const fd=document.createElement("div"); fd.className="field";
    fd.innerHTML=`<label>${f.label}<span><span class="v mono">${state.params[f.key]}</span><span class="unit">${f.unit}</span></span></label>
      <div class="row"><input type="range" min="${f.min}" max="${f.max}" step="${f.step}" value="${state.params[f.key]}">
      <input type="number" min="${f.min}" max="${f.max}" step="${f.step}" value="${state.params[f.key]}"></div>`;
    const [rng,num]=fd.querySelectorAll("input");
    const vlab=fd.querySelector(".v");
    const upd=v=>{v=Math.min(f.max,Math.max(f.min,parseFloat(v)||f.min));
      state.params[f.key]=v; rng.value=v; num.value=v; vlab.textContent=v; render();};
    rng.oninput=e=>upd(e.target.value); num.oninput=e=>upd(e.target.value);
    box.appendChild(fd);
  });
  (def.toggles||[]).forEach(t=>{
    const lab=document.createElement("label"); lab.className="toggle";
    lab.innerHTML=`<input type="checkbox" ${state.toggles[t.key]?"checked":""}> ${t.label}`;
    lab.querySelector("input").onchange=e=>{state.toggles[t.key]=e.target.checked; render();};
    box.appendChild(lab);
  });
}
function buildSAControls(){
  const r=el("saRange"),n=el("saNum"),v=el("saV");
  r.value=state.sa;n.value=state.sa;v.textContent=state.sa.toFixed(1);
  const upd=val=>{val=Math.min(5,Math.max(0,parseFloat(val)||0));
    state.sa=val;r.value=val;n.value=val;v.textContent=val.toFixed(1);render();};
  r.oninput=e=>upd(e.target.value); n.oninput=e=>upd(e.target.value);
  el("showSew").onchange=e=>{state.showSew=e.target.checked;render();};
}

/* ============================================================
   レイアウト：ピースを並べて世界座標を確定
   ============================================================ */
function layout(){
  const res=PATTERNS[state.pat].gen({...state.params, ...state.toggles}, cm(state.sa));
  const pieces=res.pieces; const memo=res.memo||null;
  let curX=CANVAS_PAD, curY=CANVAS_PAD, rowH=0, canvasW=0;
  const placed=pieces.map(pc=>{
    const bb=bbox(pc.cut);
    const w=bb.w, h=bb.h;
    if(curX>CANVAS_PAD && curX+w>WRAP_W){curX=CANVAS_PAD; curY+=rowH+LAYOUT_GAP; rowH=0;}
    const ox=curX-bb.x0, oy=curY-bb.y0;   // cut の左上を (curX,curY) に
    curX+=w+LAYOUT_GAP; rowH=Math.max(rowH,h); canvasW=Math.max(canvasW,curX-LAYOUT_GAP);
    return {pc, ox, oy, w, h};
  });
  const canvasH=curY+rowH+CANVAS_PAD;
  canvasW=Math.max(canvasW,1)+CANVAS_PAD;
  return {placed, canvasW, canvasH, memo};
}

function tileGrid(canvasW,canvasH){
  const cols=Math.max(1,Math.ceil((canvasW-1e-6)/STEP_X));
  const rows=Math.max(1,Math.ceil((canvasH-1e-6)/STEP_Y));
  return {cols,rows};
}
const colLabel=i=>String(i+1);
const rowLabel=i=>String.fromCharCode(65+i); // A,B,...
const tileCode=(c,r)=>`${colLabel(c)}${rowLabel(r)}`;

/* ============================================================
   ピース描画（共通）  g に対して描く
   ============================================================ */
function drawPiece(parent, p, ox, oy, opt){
  const g=S("g",{transform:`translate(${ox},${oy})`}); parent.appendChild(g);
  const sc=opt.scale||1;            // 線幅補正（プレビュー時に細く見えすぎ防止）
  const lw=k=>k/sc;
  // 出来上がり線（縫い線）
  if(opt.showSew!==false){
    g.appendChild(S("polygon",{points:ptsStr(p.finished),fill:"none",
      stroke:"var(--chalk)","stroke-width":lw(0.8),"stroke-dasharray":`${lw(4)} ${lw(3)}`}));
  }
  // 裁ち切り線
  g.appendChild(S("polygon",{points:ptsStr(p.cut),fill:"rgba(46,99,180,0.05)",
    stroke:"var(--vermilion)","stroke-width":lw(1.1)}));
  // わ（縦）
  if(p.foldX!=null){
    const bb=bbox(p.cut);
    g.appendChild(S("line",{x1:p.foldX,y1:bb.y0,x2:p.foldX,y2:bb.y1,
      stroke:"var(--ink)","stroke-width":lw(1),"stroke-dasharray":`${lw(7)} ${lw(2)} ${lw(1)} ${lw(2)}`}));
    const t=S("text",{x:p.foldX+lw(2),y:(bb.y0+bb.y1)/2,fill:"var(--ink)",
      "font-size":lw(5),"transform":`rotate(-90 ${p.foldX+lw(2)} ${(bb.y0+bb.y1)/2})`,
      "text-anchor":"middle"}); t.textContent="わ"; g.appendChild(t);
  }
  // わ（横＝底）
  if(p.foldY!=null){
    const bb=bbox(p.cut);
    g.appendChild(S("line",{x1:bb.x0,y1:p.foldY,x2:bb.x1,y2:p.foldY,
      stroke:"var(--ink)","stroke-width":lw(1),"stroke-dasharray":`${lw(7)} ${lw(2)} ${lw(1)} ${lw(2)}`}));
    const t=S("text",{x:(bb.x0+bb.x1)/2,y:p.foldY-lw(2),fill:"var(--ink)",
      "font-size":lw(5),"text-anchor":"middle"}); t.textContent="わ（底）"; g.appendChild(t);
  }
  // ひも通し口（巾着）
  if(p.casingLines){
    const bb=bbox(p.cut);
    p.casingLines.forEach(cy=>{
      g.appendChild(S("line",{x1:bb.x0,y1:cy,x2:bb.x1,y2:cy,
        stroke:"var(--chalk)","stroke-width":lw(0.7),"stroke-dasharray":`${lw(3)} ${lw(2)}`}));
    });
    const t=S("text",{x:bbox(p.cut).x1-lw(2),y:p.casingLines[0]-lw(1.5),"text-anchor":"end",
      fill:"var(--chalk)","font-size":lw(3.6)}); t.textContent=p.casingLabel||"ひも通し口"; g.appendChild(t);
  }
  // 縦折り線（ブックカバー等）
  if(p.vFoldLines){
    const bb=bbox(p.cut);
    p.vFoldLines.forEach(fx=>{
      g.appendChild(S("line",{x1:fx,y1:bb.y0,x2:fx,y2:bb.y1,
        stroke:"var(--chalk)","stroke-width":lw(0.7),"stroke-dasharray":`${lw(3)} ${lw(2)}`}));
    });
  }
  // マチ切り欠き（トート）
  if(p.cornerMark){
    p.cornerMark.forEach(m=>{
      g.appendChild(S("rect",{x:m.x===0?0:m.x,y:m.y,width:m.c,height:m.c,
        fill:"none",stroke:"var(--vermilion)","stroke-width":lw(0.7),
        "stroke-dasharray":`${lw(2)} ${lw(1.5)}`}));
    });
  }
  // 合印
  (p.notches||[]).forEach(nt=>{
    g.appendChild(S("line",{x1:nt.x,y1:nt.y-lw(3),x2:nt.x,y2:nt.y+lw(3),
      stroke:"var(--ink)","stroke-width":lw(1.2)}));
  });
  // 布目線
  if(p.grain){
    const gid=opt.arrowId;
    g.appendChild(S("line",{x1:p.grain.x1,y1:p.grain.y1,x2:p.grain.x2,y2:p.grain.y2,
      stroke:"var(--ink)","stroke-width":lw(0.9),
      "marker-start":`url(#${gid})`,"marker-end":`url(#${gid})`}));
    const mx=(p.grain.x1+p.grain.x2)/2, my=(p.grain.y1+p.grain.y2)/2;
    const t=S("text",{x:mx+lw(3),y:my,fill:"var(--ink)","font-size":lw(4.2),
      "transform":`rotate(-90 ${mx+lw(3)} ${my})`,"text-anchor":"middle"});
    t.textContent="布目線"; g.appendChild(t);
  }
  // ラベル
  if(p.labelAt){
    const t=S("text",{x:p.labelAt.x,y:p.labelAt.y,"text-anchor":"middle",
      fill:"var(--ink)","font-size":lw(6),"font-weight":"700"});
    t.textContent=p.title; g.appendChild(t);
    const t2=S("text",{x:p.labelAt.x,y:p.labelAt.y+lw(7),"text-anchor":"middle",
      fill:"var(--muted)","font-size":lw(3.6)});
    t2.textContent=p.cutInfo; g.appendChild(t2);
  }
}

function arrowMarker(id,scale){
  const m=S("marker",{id,markerWidth:10,markerHeight:10,refX:5,refY:5,
    orient:"auto",markerUnits:"userSpaceOnUse"});
  const s=(8/(scale||1));
  m.setAttribute("markerWidth",s);m.setAttribute("markerHeight",s);
  m.setAttribute("refX",s/2);m.setAttribute("refY",s/2);
  m.appendChild(S("path",{d:`M0,0 L${s},${s/2} L0,${s} Z`,fill:"var(--ink)"}));
  return m;
}

/* ============================================================
   プレビュー描画
   ============================================================ */
// 型紙ごとの作り方記事（ある型紙だけ文脈リンクを表示）
const HOWTO={
  kinchaku:{url:"howto-kinchaku.html", label:"📄 巾着の作り方を見る"}
};

function render(){
  const {placed,canvasW,canvasH,memo}=layout();
  const def=PATTERNS[state.pat];
  el("patNote").textContent = memo ? `${def.note} ／ ${memo}` : def.note;
  // 作り方リンク（対応する記事がある型紙のときだけ表示）
  const howto=HOWTO[state.pat], hl=el("howtoLink");
  if(howto){hl.href=howto.url; hl.textContent=howto.label; hl.style.display="inline-block";}
  else{hl.style.display="none";}
  const {cols,rows}=tileGrid(canvasW,canvasH);
  el("sheetCount").textContent=cols*rows;
  buildSAControls();

  const svg=el("preview");
  svg.innerHTML="";
  const wrap=svg.closest(".preview-wrap");
  const availW=Math.max(320,(wrap?wrap.clientWidth:760)-60);
  const availH=Math.max(320,(wrap?wrap.clientHeight:600)-70);
  const scale=Math.min(availW/canvasW, availH/canvasH, 2.4);
  svg.setAttribute("width",(canvasW*scale).toFixed(0));
  svg.setAttribute("height",(canvasH*scale).toFixed(0));
  svg.setAttribute("viewBox",`0 0 ${canvasW} ${canvasH}`);

  const defs=S("defs",{}); svg.appendChild(defs);
  defs.appendChild(arrowMarker("arrPrev",scale));

  // 製図グリッド 50mm
  const grid=S("g",{}); svg.appendChild(grid);
  for(let x=0;x<=canvasW;x+=50)grid.appendChild(S("line",{x1:x,y1:0,x2:x,y2:canvasH,
    stroke:"var(--rule-soft)","stroke-width":0.4/scale}));
  for(let y=0;y<=canvasH;y+=50)grid.appendChild(S("line",{x1:0,y1:y,x2:canvasW,y2:y,
    stroke:"var(--rule-soft)","stroke-width":0.4/scale}));

  // ピース
  const opt={scale,showSew:state.showSew,arrowId:"arrPrev"};
  placed.forEach(pl=>drawPiece(svg,pl.pc,pl.ox,pl.oy,opt));

  // A4 境界オーバーレイ
  const grp=S("g",{}); svg.appendChild(grp);
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
    const x=c*STEP_X, y=r*STEP_Y;
    grp.appendChild(S("rect",{x,y,width:CONTENT_W,height:CONTENT_H,fill:"none",
      stroke:"var(--tape)","stroke-width":0.8/scale,"stroke-dasharray":`${6/scale} ${4/scale}`,opacity:.8}));
    const t=S("text",{x:x+3,y:y+8,fill:"var(--tape)","font-size":7/scale,"font-weight":"700"});
    t.textContent=tileCode(c,r); grp.appendChild(t);
  }
}

/* ============================================================
   印刷：案内シート + タイル
   ============================================================ */
function buildPrintSheets(){
  const root=el("print-root"); root.innerHTML="";
  const {placed,canvasW,canvasH,memo}=layout();
  const {cols,rows}=tileGrid(canvasW,canvasH);
  const def=PATTERNS[state.pat];

  /* --- 案内シート --- */
  const guide=document.createElement("div"); guide.className="sheet";
  const gs=S("svg",{width:"210mm",height:"297mm",viewBox:`0 0 ${PAGE_W} ${PAGE_H}`});
  guide.appendChild(gs); root.appendChild(guide);
  const G=(tag,a)=>{const e=S(tag,a);gs.appendChild(e);return e;};
  // 見出し
  let ty=24;
  const title=S("text",{x:MARGIN,y:ty,"font-size":7,"font-weight":"800",fill:"#1B1D1A","font-family":"sans-serif"});
  title.textContent=`カタガミ — ${def.name}`; gs.appendChild(title);
  G("line",{x1:MARGIN,y1:ty+3,x2:PAGE_W-MARGIN,y2:ty+3,stroke:"#1B1D1A","stroke-width":0.5});
  ty+=14;
  const sub=S("text",{x:MARGIN,y:ty,"font-size":4,fill:"#444","font-family":"sans-serif"});
  sub.textContent="案内シート ／ まず校正枠を測ってから型紙を切り出してください"; gs.appendChild(sub);
  ty+=12;
  // パラメータ一覧
  const lh=6.4;
  const addLine=(s)=>{const t=S("text",{x:MARGIN,y:ty,"font-size":4,fill:"#1B1D1A","font-family":"monospace"});
    t.textContent=s;gs.appendChild(t);ty+=lh;};
  def.params.forEach(f=>addLine(`${f.label}：${state.params[f.key]} ${f.unit}`));
  (def.toggles||[]).forEach(t=>addLine(`${t.label}：${state.toggles[t.key]?"あり":"なし"}`));
  addLine(`縫い代：${state.sa.toFixed(1)} cm`);
  addLine(`型紙シート：${cols}列 × ${rows}行 ＝ ${cols*rows} 枚`);
  if(memo) addLine(memo);
  ty+=4;

  // 校正枠 50mm + 100mm定規
  const calX=MARGIN, calY=ty;
  G("rect",{x:calX,y:calY,width:50,height:50,fill:"none",stroke:"#C24033","stroke-width":0.5});
  const ct=S("text",{x:calX+25,y:calY+27,"text-anchor":"middle","font-size":3.4,fill:"#C24033","font-family":"sans-serif"});
  ct.textContent="この枠＝50mm"; gs.appendChild(ct);
  const ct2=S("text",{x:calX+25,y:calY+32,"text-anchor":"middle","font-size":2.6,fill:"#777","font-family":"sans-serif"});
  ct2.textContent="定規で確認"; gs.appendChild(ct2);
  // 100mm 定規
  const rulY=calY+62, rulX=calX;
  G("line",{x1:rulX,y1:rulY,x2:rulX+100,y2:rulY,stroke:"#1B1D1A","stroke-width":0.5});
  for(let i=0;i<=100;i+=10){
    const big=i%50===0;
    G("line",{x1:rulX+i,y1:rulY,x2:rulX+i,y2:rulY-(big?4:2.5),stroke:"#1B1D1A","stroke-width":0.4});
    const lt=S("text",{x:rulX+i,y:rulY-(big?6:4.5),"text-anchor":"middle","font-size":2.6,fill:"#1B1D1A","font-family":"monospace"});
    lt.textContent=i; gs.appendChild(lt);
  }
  const rt=S("text",{x:rulX,y:rulY+6,"font-size":3,fill:"#777","font-family":"sans-serif"});
  rt.textContent="0–100mm 校正定規"; gs.appendChild(rt);

  // 組み立て図（タイル配置のミニマップ）右側
  const mapX=120, mapY=calY, mw=78, mh=78;
  const cell=Math.min(mw/cols, mh/rows, 16);
  const mt=S("text",{x:mapX,y:mapY-4,"font-size":4,"font-weight":"700",fill:"#1B1D1A","font-family":"sans-serif"});
  mt.textContent="貼り合わせ図"; gs.appendChild(mt);
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
    const x=mapX+c*cell, y=mapY+r*cell;
    G("rect",{x,y,width:cell,height:cell,fill:"#F5F4EE",stroke:"#1B1D1A","stroke-width":0.3});
    const tc=S("text",{x:x+cell/2,y:y+cell/2+1.4,"text-anchor":"middle","font-size":Math.min(4,cell*0.4),fill:"#2E63B4","font-family":"monospace"});
    tc.textContent=tileCode(c,r); gs.appendChild(tc);
  }
  const mn=S("text",{x:mapX,y:mapY+rows*cell+6,"font-size":2.8,fill:"#777","font-family":"sans-serif"});
  mn.textContent=`左上(1A)から右へ→下へ並べ、約${OVERLAP}mmの重ね代を合わせて貼ります`; gs.appendChild(mn);

  // 注意書き
  const warn=S("text",{x:MARGIN,y:PAGE_H-MARGIN-4,"font-size":3.4,fill:"#C24033","font-family":"sans-serif","font-weight":"700"});
  warn.textContent="印刷倍率＝100%（実際のサイズ）／「用紙に合わせる」はオフ"; gs.appendChild(warn);
  addWatermark(gs);

  /* --- タイル群 --- */
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
    const sheet=document.createElement("div"); sheet.className="sheet";
    const svg=S("svg",{width:"210mm",height:"297mm",viewBox:`0 0 ${PAGE_W} ${PAGE_H}`});
    sheet.appendChild(svg); root.appendChild(sheet);
    const defs=S("defs",{}); svg.appendChild(defs);
    defs.appendChild(arrowMarker("arr_"+r+"_"+c,1));

    const originX=c*STEP_X, originY=r*STEP_Y;
    // 内容領域: ネストSVGのviewBoxでカナバス座標をクリップ（clipPathの負変換バグを回避）
    const world=S("svg",{x:MARGIN,y:MARGIN,
      width:CONTENT_W,height:CONTENT_H,
      viewBox:`${originX} ${originY} ${CONTENT_W} ${CONTENT_H}`,
      overflow:"hidden"});
    svg.appendChild(world);

    // 50mm グリッド（貼り合わせ補助）
    const grid=S("g",{}); world.appendChild(grid);
    const gx0=Math.floor(originX/50)*50, gy0=Math.floor(originY/50)*50;
    for(let x=gx0;x<=originX+CONTENT_W;x+=50)grid.appendChild(S("line",{x1:x,y1:gy0,x2:x,y2:originY+CONTENT_H+50,
      stroke:"#E7E4D8","stroke-width":0.2}));
    for(let y=gy0;y<=originY+CONTENT_H;y+=50)grid.appendChild(S("line",{x1:gx0,y1:y,x2:originX+CONTENT_W+50,y2:y,
      stroke:"#E7E4D8","stroke-width":0.2}));

    // ピース
    const opt={scale:1,showSew:state.showSew,arrowId:"arr_"+r+"_"+c};
    placed.forEach(pl=>drawPiece(world,pl.pc,pl.ox,pl.oy,opt));

    // --- 内容枠・トンボ・タイル情報（クリップ外＝ページ座標） ---
    const x0=MARGIN,y0=MARGIN,x1=MARGIN+CONTENT_W,y1=MARGIN+CONTENT_H;
    svg.appendChild(S("rect",{x:x0,y:y0,width:CONTENT_W,height:CONTENT_H,fill:"none",
      stroke:"#1B1D1A","stroke-width":0.3,"stroke-dasharray":"2 2"}));
    // 角トンボ
    const cm2=4;
    [[x0,y0,1,1],[x1,y0,-1,1],[x0,y1,1,-1],[x1,y1,-1,-1]].forEach(([x,y,sx,sy])=>{
      svg.appendChild(S("line",{x1:x,y1:y,x2:x+sx*cm2,y2:y,stroke:"#1B1D1A","stroke-width":0.4}));
      svg.appendChild(S("line",{x1:x,y1:y,x2:x,y2:y+sy*cm2,stroke:"#1B1D1A","stroke-width":0.4}));
    });
    // タイルコード（大）
    const code=S("text",{x:x0+2,y:y0-2.5,"font-size":5,"font-weight":"800",fill:"#2E63B4","font-family":"monospace"});
    code.textContent=tileCode(c,r); svg.appendChild(code);
    const tot=S("text",{x:x1,y:y0-2.5,"font-size":3,fill:"#777","text-anchor":"end","font-family":"sans-serif"});
    tot.textContent=`${def.name}  ／  ${c+1}列 ${rowLabel(r)}行  （全${cols*rows}枚）`; svg.appendChild(tot);
    // 隣接案内
    const mid=(a,b)=>(a+b)/2;
    if(c<cols-1){const t=S("text",{x:x1-1,y:mid(y0,y1),"text-anchor":"end","font-size":3.4,
      fill:"#C24033","font-family":"sans-serif","font-weight":"700"});
      t.textContent=`→ ${tileCode(c+1,r)} へ`; svg.appendChild(t);}
    if(r<rows-1){const t=S("text",{x:mid(x0,x1),y:y1-1.5,"text-anchor":"middle","font-size":3.4,
      fill:"#C24033","font-family":"sans-serif","font-weight":"700"});
      t.textContent=`↓ ${tileCode(c,r+1)} へ`; svg.appendChild(t);}
    if(c>0){const t=S("text",{x:x0+1,y:mid(y0,y1),"text-anchor":"start","font-size":2.8,
      fill:"#999","font-family":"sans-serif"});
      t.textContent=`${tileCode(c-1,r)} と重ねる`; svg.appendChild(t);}
    if(r>0){const t=S("text",{x:mid(x0,x1),y:y0+4,"text-anchor":"middle","font-size":2.8,
      fill:"#999","font-family":"sans-serif"});
      t.textContent=`${tileCode(c,r-1)} と重ねる`; svg.appendChild(t);}
    addWatermark(svg);
  }
}

/* ============================================================
   採寸プロファイル保存／呼び出し（F-20）
   ============================================================ */
const PROFILES_KEY='katagami_profiles';
function getProfiles(){try{return JSON.parse(localStorage.getItem(PROFILES_KEY)||'[]');}catch{return [];}}
function saveProfiles(arr){localStorage.setItem(PROFILES_KEY,JSON.stringify(arr));}

function saveProfile(){
  const name=window.prompt('この設定の名前を入力してください（例：娘90cm夏）');
  if(!name||!name.trim())return;
  const arr=getProfiles();
  arr.push({name:name.trim(), pat:state.pat, params:{...state.params}, toggles:{...state.toggles}, sa:state.sa});
  saveProfiles(arr);
  renderProfiles();
  ga('save_profile',{pattern:state.pat});
}

function applyProfile(idx){
  const arr=getProfiles(); const p=arr[idx]; if(!p)return;
  // パターン存在確認
  if(!PATTERNS[p.pat])return;
  state.pat=p.pat;
  // modeをパターンに合わせる
  state.mode=PATTERNS[p.pat].mode;
  initParams();
  // 保存値で上書き（範囲チェック付き）
  const def=PATTERNS[state.pat];
  def.params.forEach(f=>{if(p.params&&p.params[f.key]!=null){
    state.params[f.key]=Math.min(f.max,Math.max(f.min,p.params[f.key]));
  }});
  (def.toggles||[]).forEach(t=>{if(p.toggles&&p.toggles[t.key]!=null)state.toggles[t.key]=p.toggles[t.key];});
  if(p.sa!=null)state.sa=Math.min(5,Math.max(0,p.sa));
  buildModes(); buildTabs(); buildFields(); buildSAControls(); render();
  ga('load_profile',{pattern:state.pat});
}

function deleteProfile(idx){
  if(!window.confirm('この設定を削除しますか？'))return;
  const arr=getProfiles(); arr.splice(idx,1); saveProfiles(arr); renderProfiles();
}

function renderProfiles(){
  const list=el("profileList"); list.innerHTML="";
  getProfiles().forEach((p,i)=>{
    const item=document.createElement("div"); item.className="profile-item";
    const load=document.createElement("button"); load.className="p-load";
    load.textContent=p.name; load.title=`${PATTERNS[p.pat]?.name||p.pat} を読み込む`;
    load.onclick=()=>applyProfile(i);
    const del=document.createElement("button"); del.className="p-del";
    del.textContent="×"; del.title="削除"; del.onclick=()=>deleteProfile(i);
    item.appendChild(load); item.appendChild(del);
    list.appendChild(item);
  });
}

el("saveProfileBtn").onclick=()=>saveProfile();

el("printBtn").onclick=()=>{
  buildPrintSheets();
  const {canvasW,canvasH}=layout();
  const {cols,rows}=tileGrid(canvasW,canvasH);
  ga('print_pattern',{pattern:state.pat,pattern_name:PATTERNS[state.pat].name,
    mode:state.mode,sheet_count:cols*rows,seam_allowance:state.sa});
  setTimeout(()=>window.print(),60);
};

/* ---- プライバシーポリシー モーダル ---- */
const modal=el("privacyModal");
el("openPrivacy").onclick=()=>{modal.classList.add("open"); ga('view_privacy_policy',{});};
el("closePrivacy").onclick=()=>modal.classList.remove("open");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open");});
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open");});

/* ---- 起動 ---- */
initParams(); buildModes(); buildTabs(); buildFields(); buildSAControls(); render(); renderProfiles();
window.addEventListener("resize",()=>render());
