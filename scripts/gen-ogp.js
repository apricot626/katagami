/* 型紙別OGP画像を ogp/<key>.png に生成。
   要ローカルサーバー(localhost:8099, リポジトリルート配信)。
   Run: (cd repo && python3 -m http.server 8099 &) ; node scripts/gen-ogp.js */
const { chromium } = require(require("path").join(__dirname,"..","node_modules","playwright-core"));
const fs=require("fs"), path=require("path");
const ROOT=path.join(__dirname,"..");
let src=fs.readFileSync(path.join(ROOT,"patterns.js"),"utf8").replace(/\bconst PATTERNS=/,"globalThis.PATTERNS=").replace(/window\./g,"globalThis._w_");
(0,eval)(src);
const keys=Object.keys(globalThis.PATTERNS);
(async()=>{
  const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium"});
  let n=0, errs=[];
  for(const k of keys){
    const p=await b.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
    const e=[]; p.on('pageerror',x=>e.push(x.message));
    await p.goto("http://localhost:8099/scripts/ogp-template.html?p="+k,{waitUntil:"networkidle"});
    await p.waitForTimeout(120);
    await (await p.$("#card")).screenshot({path:path.join(ROOT,"ogp",k+".png")});
    if(e.length) errs.push(k+":"+e[0]);
    await p.close(); n++;
  }
  await b.close();
  console.log("generated",n,"ogp images | errors:",errs);
})();
