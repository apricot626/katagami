/* 材料ボックスに出す楽天アフィリエイトリンクを組み立てる。
   生地のリンク1本だけでは選択肢が少ないので、材料リストに出てくる
   副資材（ゴム・ファスナー・接着芯など）を拾って最大4本まで並べます。 */

const A_ID = "5652284", P_ID = "54", PC_ID = "54", PL_ID = "616";

function rakuten(kw){
  const inner = "https://search.rakuten.co.jp/search/mall/" + encodeURIComponent(kw) + "/";
  return "//af.moshimo.com/af/c/click?a_id=" + A_ID + "&p_id=" + P_ID +
         "&pc_id=" + PC_ID + "&pl_id=" + PL_ID + "&url=" + encodeURIComponent(inner);
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
  { test:/ニット用(ミシン)?針|レジロン/,             kw:"ニット用 ミシン針 レジロン", label:"ニット用の針・糸" },
];

/* 副資材が少ないページでも選択肢が並ぶよう、道具まわりの汎用リンクで埋めます。
   道具（ミシン・チャコペン・定規・まち針）はどのページでも使うものなので、
   材料リストに書いていなくても関連は外れません。 */
const GENERIC = [
  { kw:"ミシン糸 シャッペスパイ 手芸",   label:"ミシン糸" },
  { kw:"まち針 クリップ ソーイング 手芸", label:"まち針・クリップ" },
  { kw:"チャコペン 定規 ソーイング 手芸", label:"チャコペン・定規" },
];

const MIN_LINKS = 3;
const MAX_LINKS = 4;

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
  for(const g of GENERIC){
    if(links.length >= MIN_LINKS) break;
    links.push(g);
  }
  return links.map(l => ({ href:rakuten(l.kw), label:l.label }));
}

module.exports = { rakuten, materialLinks, MAX_LINKS };
