/* 英語ガイドの材料ボックスに出す Amazon アソシエイトリンクを組み立てる。
   考え方は和文の material-links.js と同じで、材料リストの文言から副資材を
   拾って最大4本まで並べます。違いは2点だけです。

   - リンク先が Amazon.com の検索結果（商品ページではない）。
     廃番や在庫切れでリンクが死なないので、266ページ分を保守できます。
   - もしもを挟まず、検索URLに直接 tag= を付けます。これが Amazon の言う
     Special Link にあたります（SiteStripe で1商品ずつ作る必要はありません）。 */

const TAG = "katagami-20";        // Amazon.com（米国）のアソシエイトタグ

function amazon(kw){
  return "https://www.amazon.com/s?k=" + encodeURIComponent(kw) + "&tag=" + TAG;
}

/* 1本目に出す生地のリンク。材料リストの文言から布の種類を拾います。
   上から順に判定するので、複合語（double gauze / french terry）を先に置きます。
   どれにも当たらなければ最後の cotton に落ちます。 */
const FABRICS = [
  { test:/double gauze|six-layer gauze|gauze/,        kw:"double gauze fabric by the yard",   label:"Double gauze" },
  { test:/quilted cotton|quilted/,                    kw:"quilted cotton fabric by the yard", label:"Quilted cotton" },
  { test:/laminated|laminate/,                        kw:"laminated cotton fabric yard",      label:"Laminated cotton" },
  { test:/faux leather|synthetic leather/,            kw:"faux leather fabric by the yard",   label:"Faux leather" },
  { test:/sweatshirt fleece|french terry/,            kw:"french terry fabric by the yard",   label:"French terry" },
  { test:/fleece|boa|faux fur/,                       kw:"fleece fabric by the yard",         label:"Fleece" },
  { test:/jersey|interlock|rib knit|knit fabric/,     kw:"cotton jersey knit fabric yard",    label:"Jersey knit" },
  { test:/denim|chambray/,                            kw:"denim fabric by the yard",          label:"Denim" },
  { test:/corduroy/,                                  kw:"corduroy fabric by the yard",       label:"Corduroy" },
  { test:/canvas|duck cloth/,                         kw:"cotton canvas fabric by the yard",  label:"Canvas" },
  { test:/oxford/,                                    kw:"oxford cloth fabric by the yard",   label:"Oxford cloth" },
  { test:/linen/,                                     kw:"linen fabric by the yard",          label:"Linen" },
  { test:/felt/,                                      kw:"craft felt fabric sheets",          label:"Craft felt" },
  { test:/wool|tweed/,                                kw:"wool fabric by the yard",           label:"Wool" },
  { test:/satin|silk|rayon/,                          kw:"satin fabric by the yard",          label:"Satin" },
  { test:/terry|waffle/,                              kw:"terry cloth fabric by the yard",    label:"Terry cloth" },
  { test:/.*/,                                        kw:"cotton fabric by the yard quilting",label:"Cotton fabric" },
];

/* 材料の文言 → 検索キーワードと表示名。上から順に判定します。
   同じ資材の表記ゆれ（hook and loop / velcro など）は1つにまとめています。 */
const SUPPLIES = [
  { test:/zipper|fastener\b/,                       kw:"sewing zippers 9 inch assorted",     label:"Zippers" },
  { test:/elastic/,                                 kw:"flat elastic band sewing 1 inch",    label:"Elastic" },
  { test:/fusible interfacing|interfacing/,         kw:"fusible interfacing sewing",         label:"Fusible interfacing" },
  { test:/batting|wadding/,                         kw:"quilt batting cotton",               label:"Quilt batting" },
  { test:/hook and loop|hook-and-loop|velcro/,      kw:"sew on hook and loop tape",          label:"Hook & loop tape" },
  { test:/bias tape|bias binding/,                  kw:"double fold bias tape sewing",       label:"Bias tape" },
  { test:/webbing|strap(?!ping)/,                   kw:"cotton webbing strap 1 inch",        label:"Webbing" },
  { test:/magnetic snap/,                           kw:"magnetic snap closure purse",        label:"Magnetic snaps" },
  { test:/snap fastener|snap button|snaps\b/,       kw:"plastic snap fasteners kam",         label:"Snap fasteners" },
  { test:/stuffing|fiberfill|polyester filling/,    kw:"polyester fiberfill stuffing",       label:"Stuffing" },
  { test:/ribbing|rib knit/,                        kw:"rib knit fabric cuff trim",          label:"Ribbing" },
  { test:/d-ring|swivel|slider|buckle|adjuster/,    kw:"purse hardware d rings swivel hooks",label:"Bag hardware" },
  { test:/eyelet|grommet/,                          kw:"grommet eyelet kit fabric",          label:"Eyelets" },
  { test:/purse frame|clasp frame/,                 kw:"metal purse frame kiss lock",        label:"Purse frame" },
  { test:/cord\b|drawstring/,                       kw:"cotton drawstring cord 5mm",         label:"Drawstring cord" },
  { test:/buttons?\b/,                              kw:"sewing buttons assorted shirt",      label:"Buttons" },
  { test:/ribbon/,                                  kw:"grosgrain ribbon sewing",            label:"Ribbon" },
  { test:/lace/,                                    kw:"lace trim sewing",                   label:"Lace trim" },
  { test:/reflective/,                              kw:"reflective tape sew on fabric",      label:"Reflective tape" },
  { test:/vinyl|clear plastic/,                     kw:"clear vinyl fabric sewing",          label:"Clear vinyl" },
  { test:/mesh/,                                    kw:"mesh fabric sewing",                 label:"Mesh fabric" },
  { test:/insulated|thermal|foil/,                  kw:"insulated lining fabric sewing",     label:"Insulated lining" },
  { test:/curtain tape|pleat tape/,                 kw:"curtain heading tape",               label:"Curtain tape" },
];

/* 道具はどのページでも同じものを使うので、材料とは別の枠に固定で出します。
   以前は材料が少ないページの穴埋めに混ぜていましたが、"Find materials online"
   という見出しの下に糸やまち針が並ぶのは、書いてあることと違います。 */
const TOOLS = [
  { kw:"sewing machine for beginners",            label:"Sewing machine" },
  { kw:"all purpose polyester sewing thread set", label:"Sewing thread" },
  { kw:"fabric scissors and rotary cutter",       label:"Scissors & cutter" },
  { kw:"fabric marking pen and ruler sewing",     label:"Marker & ruler" },
];

/* 型紙ごとに要る道具。材料欄に書かれていたら、固定の道具より前に出します。 */
const SPECIAL_TOOLS = [
  { test:/ballpoint|stretch needle|stretch thread/, kw:"ballpoint needles knit sewing machine", label:"Ballpoint needles" },
  { test:/bodkin|threader/,                         kw:"bodkin threader elastic",               label:"Bodkin" },
  { test:/awl|stiletto/,                            kw:"sewing awl stiletto",                   label:"Awl" },
];

const MAX_LINKS = 4;
const MAX_TOOLS = 4;

/* materials: 材料リストの文字列配列（HTMLタグを含んでいても構いません） */
function materialLinksEn(materials){
  const text = textOf(materials);
  const fabric = FABRICS.find(f => f.test.test(text));
  const links = [{ kw:fabric.kw, label:fabric.label }];

  for(const s of SUPPLIES){
    if(links.length >= MAX_LINKS) break;
    // 生地のリンク名が既にその資材を名乗っている場合（例 Quilted cotton と Quilt batting）は
    // 重ねて出しても選択肢が増えないので飛ばします。
    if(s.test.test(text) && !links.some(l => l.label.includes(s.label) || s.label.includes(l.label))){
      links.push({ kw:s.kw, label:s.label });
    }
  }
  return links.map(l => ({ href:amazon(l.kw), label:l.label }));
}

/* 道具の枠。どのページも同じ4本で、型紙固有の道具があれば先頭に入ります。 */
function toolLinksEn(materials){
  const text = textOf(materials);
  const links = SPECIAL_TOOLS.filter(t => t.test.test(text)).map(t => ({ kw:t.kw, label:t.label }));
  for(const t of TOOLS){
    if(links.length >= MAX_TOOLS) break;
    if(!links.some(l => l.label === t.label)) links.push(t);
  }
  return links.slice(0, MAX_TOOLS).map(l => ({ href:amazon(l.kw), label:l.label }));
}

function textOf(materials){
  return (materials || []).join("\n").replace(/<[^>]+>/g, "").toLowerCase();
}

module.exports = { amazon, materialLinksEn, toolLinksEn, TAG, MAX_LINKS, MAX_TOOLS };
