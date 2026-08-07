/* 型紙一覧の副題（サブカテゴリ）と並び順。

   大人服だけで42種あり、ただ並べるとスカートとパンツが混ざって目当てのものが
   探せません。カテゴリの中をさらに小分けにして、副題を立てて並べ直します。

   ここに書いた順が、そのまま一覧の並び順になります。
   どのグループにも入れなかった型紙は末尾の「その他」にまとまります
   （scripts/audit.js が拾って警告するので、入れ忘れても気づけます）。 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.GROUPS = factory();
})(typeof self !== "undefined" ? self : this, function () {

  return {
    human: [
      { ja: "トップス", en: "Tops",
        keys: ["tee", "raglantee", "tunic", "camisole", "blouse", "shirt",
               "dolman", "hoodie", "adultvest", "cardigan"] },
      { ja: "スカート", en: "Skirts",
        keys: ["skirt", "flareskirt", "mermaid", "adultgather", "tightskirt",
               "pleatskirt", "wrapskirt", "tieredskirt"] },
      { ja: "パンツ", en: "Trousers",
        keys: ["widepants", "taperedpants", "halfpants", "culotte",
               "sweatpants", "cargopants"] },
      { ja: "ワンピース・つなぎ", en: "Dresses & all-in-ones",
        keys: ["onepiece", "sleevedress", "shirtdress", "overall"] },
      { ja: "アウター", en: "Outerwear",
        keys: ["jacket", "nocollarjacket", "coat", "blouson", "gown", "poncho"] },
      { ja: "和装", en: "Japanese clothing",
        keys: ["yukata", "samue", "samuepants", "hanten"] },
      { ja: "部屋着・エプロン", en: "Loungewear & aprons",
        keys: ["pajamas", "pajamapants", "kappogi", "apron"] },
    ],

    kids: [
      { ja: "トップス", en: "Tops",
        keys: ["kidstee", "kidsraglan", "kidstank", "kidsshirt",
               "kidsvest", "kidshoodie"] },
      { ja: "ボトムス", en: "Bottoms",
        keys: ["pants", "kidshalf", "gather", "kidsculotte"] },
      { ja: "ワンピース・スモック", en: "Dresses & smocks",
        keys: ["kidsdress", "jumperskirt", "smock", "kidsrompers"] },
      { ja: "アウター", en: "Outerwear",
        keys: ["kidscoat", "kidscape"] },
      { ja: "甚平・食事まわり", en: "Jinbei & mealtime",
        keys: ["jinbei", "jinbeipants", "kidsbibapron"] },
    ],

    baby: [
      { ja: "ウェア", en: "Clothing",
        keys: ["coverall", "bloomers", "babypants", "sleeper"] },
      { ja: "寝る・くるむ", en: "Sleep & swaddle",
        keys: ["swaddle", "babyblanket"] },
      { ja: "スタイ・身につける小物", en: "Bibs & small things",
        keys: ["stai", "bandanastai", "babyhat", "babymitten", "babyshoes"] },
      { ja: "おでかけ", en: "Out and about",
        keys: ["babycape", "nursingcape", "carriercover", "strollerseat"] },
      { ja: "お世話", en: "Diaper changing",
        keys: ["diaperpouch", "wipescase"] },
      { ja: "おもちゃ", en: "Toys",
        keys: ["babytoy"] },
    ],

    small: [
      { ja: "通園・通学", en: "School & nursery",
        keys: ["kinchaku", "kincgusset", "gymbag", "shoesbag", "movepocket",
               "nametag", "pencase", "randocover", "recordercase",
               "bousaizukin", "flaskcover", "cutlerycase", "bandana"] },
      { ja: "マスク・衛生", en: "Masks & hygiene",
        keys: ["mask", "fittedmask", "maskcase", "armcover"] },
      { ja: "帽子", en: "Hats",
        keys: ["sunhat", "beret", "cap"] },
      { ja: "ヘアもの", en: "Hair",
        keys: ["shuushu", "headband", "hairturban"] },
      { ja: "防寒・リラックス", en: "Warmth & rest",
        keys: ["scarf", "neckwarmer", "legwarmer", "eyemask"] },
      { ja: "ケース・カバー", en: "Cases & covers",
        keys: ["tissuecase", "bookcover", "keycase", "glassescase", "boshitecho",
               "cardcase", "bankbook", "uchiwacover", "bottleholder"] },
      { ja: "アクセサリー", en: "Neckwear",  /* 英語は大分類が Accessories なので重複を避ける */
        keys: ["bowtie", "necktie"] },
      { ja: "キッチン・食卓", en: "Kitchen & table",
        keys: ["potholder", "placemat"] },
      { ja: "手芸・ぬいぐるみ", en: "Craft & soft toys",
        keys: ["dollclothes", "nuiclothes", "teddy", "pincushion", "camerastrap"] },
    ],

    bag: [
      { ja: "トート・肩掛け", en: "Totes & shoulder bags",
        keys: ["tote", "bucketbag", "shoulderbag", "sacoche", "bodybag",
               "ecobag", "ehonbag", "itabag"] },
      { ja: "ポーチ", en: "Pouches",
        keys: ["pouch", "pouchgusset", "gamaguchi", "cosmepouch",
               "gadgetpouch", "phonepouch", "baginbag"] },
      { ja: "財布・カード", en: "Wallets & cards",
        keys: ["wallet", "passportcase"] },
      { ja: "リュック・旅", en: "Backpacks & travel",
        keys: ["backpack", "bostonbag", "waistbag", "yogamatbag"] },
      { ja: "PC・タブレット", en: "Laptops & tablets",
        keys: ["laptopcase", "tabletcase"] },
      { ja: "和もの・その他", en: "Japanese & others",
        keys: ["azuma", "panel", "clutchbag", "roundkinchaku", "lunchbag"] },
    ],

    pet: [
      { ja: "犬・猫の服", en: "Dog & cat clothes",
        keys: ["dog", "dogsleeved", "catfuku", "petvest", "petcape"] },
      { ja: "首まわり", en: "Around the neck",
        keys: ["petbandana", "petsnood", "petcollar"] },
      { ja: "おでかけ", en: "Out and about",
        keys: ["mannerbelt", "petpouch", "petsling", "petcarrier"] },
      { ja: "くつろぐ", en: "Rest & play",
        keys: ["petbed", "petmat", "pettoy"] },
    ],

    home: [
      { ja: "クッション・カバー", en: "Cushions & covers",
        keys: ["cushioncover", "zabuton", "chairpad", "chaircover",
               "pillowcase", "neckpillow"] },
      { ja: "窓・仕切り", en: "Windows & doorways",
        keys: ["curtain", "cafecurtain", "noren"] },
      { ja: "キッチン・食卓", en: "Kitchen & table",
        keys: ["tablecloth", "tablerunner", "coaster", "teacosy",
               "ovenmitt", "picnicmat"] },
      { ja: "収納", en: "Storage",
        keys: ["wallpocket", "boxcover", "laundrybag", "fabricbasket",
               "remotepocket", "tissuebox"] },
      { ja: "足元・その他", en: "Underfoot & others",
        keys: ["slipper", "machinecover", "toiletcover", "treeskirt"] },
    ],
  };
});
