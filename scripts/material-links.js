/* 材料ボックスに出す楽天・Amazonのアフィリエイトリンクを組み立てる。
   生地のリンク1本だけでは選択肢が少ないので、材料リストに出てくる
   副資材（ゴム・ファスナー・接着芯など）を拾って最大4本まで並べます。

   資材1つにつき楽天とAmazonを1本ずつ出します。検索語は共通なので、
   下の対応表を直せば両方に効きます。 */

const A_ID = "5652284", P_ID = "54", PC_ID = "54", PL_ID = "616";
const AMAZON_TAG = "katagami-22";   // Amazon.co.jp（日本）のアソシエイトタグ

function rakuten(kw){
  const inner = "https://search.rakuten.co.jp/search/mall/" + encodeURIComponent(kw) + "/";
  return "//af.moshimo.com/af/c/click?a_id=" + A_ID + "&p_id=" + P_ID +
         "&pc_id=" + PC_ID + "&pl_id=" + PL_ID + "&url=" + encodeURIComponent(inner);
}

/* 英語版と同じく、商品ページではなく検索結果に飛ばします。
   廃番や在庫切れでリンクが死なないので、266ページ分を保守できます。 */
function amazonJp(kw){
  return "https://www.amazon.co.jp/s?k=" + encodeURIComponent(kw) + "&tag=" + AMAZON_TAG;
}

/* 材料の文言 → 検索キーワードと表示名。上から順に判定します。
   同じ資材を指す表記ゆれ（平ゴム/ゴムひも など）は1つにまとめています。 */
const SUPPLIES = [
  { test:/ファスナー|フラットニットファスナー/,     kw:"ファスナー 手芸 20cm",       label:"ファスナー" },
  { test:/平ゴム|ゴムひも|ゴム（\d|丸ゴム/,          kw:"平ゴム 手芸 ソーイング",     label:"平ゴム" },
  { test:/接着芯/,                                   kw:"接着芯 不織布 アイロン",     label:"接着芯" },
  { test:/キルト芯|中綿シート/,                      kw:"キルト芯 手芸 接着",         label:"キルト芯" },
  { test:/保冷シート|アルミ蒸着/,                    kw:"保冷シート 生地 手芸",       label:"保冷シート" },
  { test:/面ファスナー|マジックテープ/,              kw:"面ファスナー 手芸 縫製用",   label:"面ファスナー" },
  { test:/バイアステープ/,                           kw:"バイアステープ 手芸",        label:"バイアステープ" },
  { test:/丸ひも|アクリルコード|アクリルひも|コード（/, kw:"丸ひも アクリルコード 手芸", label:"丸ひも" },
  { test:/アクリルテープ|持ち手テープ|カバンテープ/, kw:"アクリルテープ 持ち手 手芸", label:"持ち手テープ" },
  { test:/スナップボタン|プラスナップ/,              kw:"スナップボタン 手芸 プラ",   label:"スナップボタン" },
  { test:/マグネットボタン/,                         kw:"マグネットボタン 手芸",      label:"マグネットボタン" },
  { test:/手芸わた|手芸綿|中わた/,                   kw:"手芸わた ぬいぐるみ 綿",     label:"手芸わた" },
  { test:/リブニット|リブ（/,                        kw:"リブニット 生地 ニット",     label:"リブニット" },
  { test:/ボタン(?!ホール)/,                         kw:"ボタン 手芸 シャツ",         label:"ボタン" },
  { test:/Dカン|ナスカン|移動カン|アジャスター/,     kw:"Dカン ナスカン 手芸 金具",   label:"カバン金具" },
  { test:/ハトメ/,                                   kw:"ハトメ 手芸 打ち具",         label:"ハトメ" },
  { test:/レース/,                                   kw:"レース 手芸 トーション",     label:"レース" },
  { test:/ゴムテープ|カーテンテープ/,                kw:"カーテンテープ 手芸",        label:"カーテンテープ" },
  { test:/反射テープ|リフレクター/,                  kw:"反射テープ 反射材 手芸",     label:"反射テープ" },
  { test:/透明ビニール|ビニール（/,                  kw:"透明ビニール 生地 手芸",     label:"透明ビニール" },
  { test:/メッシュ/,                                 kw:"メッシュ 生地 手芸",         label:"メッシュ生地" },
  { test:/口金|がま口/,                              kw:"がま口 口金 手芸",           label:"がま口金具" },
];

/* 道具はどのページでも同じものを使うので、材料とは別の枠に固定で出します。
   以前は材料が少ないページの穴埋めに混ぜていましたが、「材料をネットで探す」
   という見出しの下にミシン糸やまち針が並ぶのは、書いてあることと違います。 */
const TOOLS = [
  { kw:"ミシン 初心者 コンパクト",        label:"ミシン" },
  { kw:"ミシン糸 シャッペスパイ 手芸",    label:"ミシン糸" },
  { kw:"裁ちばさみ ロータリーカッター",   label:"裁ちばさみ・カッター" },
  { kw:"チャコペン 定規 ソーイング 手芸", label:"チャコペン・定規" },
];

/* 型紙ごとに要る道具。材料欄に書かれていたら、固定の道具より前に出します。
   ニット地に普通の針を使うと目が飛ぶので、そのページでは何より先に要ります。 */
const SPECIAL_TOOLS = [
  { test:/ニット用(ミシン)?針|レジロン/, kw:"ニット用 ミシン針 レジロン", label:"ニット用の針・糸" },
  { test:/ゴム通し|ひも通し/,            kw:"ゴム通し ひも通し 手芸",     label:"ゴム通し" },
  { test:/目打ち/,                       kw:"目打ち ソーイング 手芸",     label:"目打ち" },
];

const MAX_LINKS = 4;
const MAX_TOOLS = 4;

/* materials: 材料リストの文字列配列（HTMLタグを含んでいても構いません）
   fabricKw / fabricLabel: 生地の検索語と表示名（各ガイドが持っている値） */
function materialLinks(materials, fabricKw, fabricLabel){
  const links = [{ kw:fabricKw, label:fabricLabel }];
  const text = (materials || []).join("\n").replace(/<[^>]+>/g, "");
  for(const s of SUPPLIES){
    if(links.length >= MAX_LINKS) break;
    // 生地のリンク名が既にその資材を名乗っている場合（例「キルト芯・厚手コットン生地」）は
    // 重ねて出しても選択肢が増えないので飛ばします。
    if(s.test.test(text) && !links.some(l => l.label.includes(s.label) || s.label.includes(l.label))){
      links.push({ kw:s.kw, label:s.label });
    }
  }
  return links.map(withHrefs);
}

/* 道具の枠。どのページも同じ4本で、型紙固有の道具があれば先頭に入ります。 */
function toolLinks(materials){
  const text = (materials || []).join("\n").replace(/<[^>]+>/g, "");
  const links = SPECIAL_TOOLS.filter(t => t.test.test(text)).map(t => ({ kw:t.kw, label:t.label }));
  for(const t of TOOLS){
    if(links.length >= MAX_TOOLS) break;
    if(!links.some(l => l.label === t.label)) links.push(t);
  }
  return links.slice(0, MAX_TOOLS).map(withHrefs);
}

function withHrefs(l){
  return { href:rakuten(l.kw), amazonHref:amazonJp(l.kw), label:l.label };
}

module.exports = { rakuten, amazonJp, materialLinks, toolLinks, MAX_LINKS, MAX_TOOLS, AMAZON_TAG };
