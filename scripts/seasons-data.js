/* ============================================================
   季節・イベント特集のデータ（日本語サイト・英語サイトで共用）

   方針：型紙そのものは日英で分けない。既存の型紙に「どのイベントに向くか」
   のタグを付け、特集ページはこの1つのデータから日英どちらも生成する。
   言語で変わるのは “見せ方（ラベル・並び）” だけで、型紙の中身は共通。

   keys は既存の型紙キー（tool.html?p=<key> と patterns.js のキー）。
   ここには新しい型紙は作らず、いまあるものを行事に割り当てるだけ。

   months: その行事があたる月（1–12）。空配列は通年。
           トップの「今月のおすすめ」は months で選ぶ。
   ============================================================ */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.SEASONS = factory();
})(typeof self !== "undefined" ? self : this, function () {

  return [
    {
      id: "jp", emoji: "🇯🇵",
      ja: "日本の季節・行事", en: "Japanese seasons & events",
      events: [
        { id: "shogatsu", emoji: "🎍", ja: "お正月", en: "New Year (Japan)",
          months: [12, 1],
          ja_note: "年始の防寒と、贈りもの・お年玉を包む和の袋もの。",
          en_note: "Winter warmers and Japanese-style pouches for new-year gifts.",
          keys: ["hanten", "azuma", "kinchaku", "gamaguchi", "zabuton"] },
        { id: "nyugaku", emoji: "🎒", ja: "入園・入学", en: "Starting nursery & school",
          months: [3, 4],
          ja_note: "4月に向けた通園・通学グッズ一式。まとめて作れます。",
          en_note: "The full set of nursery and school bags for the April term.",
          keys: ["ehonbag", "shoesbag", "gymbag", "kincgusset", "kinchaku",
                 "cutlerycase", "recordercase", "flaskcover", "randocover",
                 "bousaizukin", "nametag", "movepocket", "cap"] },
        { id: "natsumatsuri", emoji: "🎆", ja: "夏祭り・花火", en: "Summer festival",
          months: [7, 8],
          ja_note: "浴衣・甚平と、うちわや小銭を入れて出かける小物。",
          en_note: "Yukata, jinbei and small bags to carry to the festival.",
          keys: ["yukata", "kidsyukata", "jinbei", "jinbeipants", "adultjinbei",
                 "samue", "uchiwacover", "kinchaku", "gamaguchi", "azuma"] },
        { id: "shichigosan", emoji: "⛩️", ja: "七五三", en: "Shichi-go-san",
          months: [11],
          ja_note: "晴れ着に添える巾着や、子ども用の浴衣。",
          en_note: "A drawstring pouch and kids' yukata for the celebration.",
          keys: ["kidsyukata", "kinchaku"] },
      ],
    },
    {
      id: "world", emoji: "🌎",
      ja: "世界のイベント", en: "Events around the world",
      events: [
        { id: "valentine", emoji: "❤️", ja: "バレンタイン", en: "Valentine's Day",
          months: [2],
          ja_note: "お菓子作りのエプロンと、ギフトを包む袋もの。",
          en_note: "Aprons for baking and pouches to wrap a gift.",
          keys: ["apron", "cafeapron", "kappogi", "pouch", "gamaguchi"] },
        { id: "mother", emoji: "💐", ja: "母の日", en: "Mother's Day",
          months: [5],
          ja_note: "手作りギフトと、ラッピング代わりの袋・トート。",
          en_note: "Handmade gifts, plus bags to wrap them in.",
          keys: ["apron", "brooch", "pouch", "tote", "gamaguchi"] },
        { id: "father", emoji: "👔", ja: "父の日", en: "Father's Day",
          months: [6],
          ja_note: "ネクタイ・蝶ネクタイ・チーフの贈りもの。",
          en_note: "Neckties, bow ties and pocket squares to give.",
          keys: ["necktie", "bowtie", "pocketsquare"] },
        { id: "halloween", emoji: "🎃", ja: "ハロウィン", en: "Halloween",
          months: [10],
          ja_note: "魔女帽・マント・ネコ耳などの仮装小物と、お菓子を入れるバッグ、ペットの仮装。",
          en_note: "Costume pieces (witch hat, cape, cat ears), trick-or-treat bags and pet costumes.",
          keys: ["witchhat", "costumecape", "jaggedcape", "hoodcape", "costumeponcho", "catears", "costumecollar", "costumetail", "costumewings", "tutu", "kinchaku", "ehonbag", "tote", "petcape", "petbandana", "catfuku"] },
        { id: "christmas", emoji: "🎄", ja: "クリスマス", en: "Christmas",
          months: [12],
          ja_note: "ツリーの足元布と、サンタ気分のペット・ぬいの小物。",
          en_note: "A tree skirt and Santa-style extras for pets and plushies.",
          keys: ["santahat", "stocking", "treeskirt", "petcape", "petbandana", "nuicape", "nuihat", "kinchaku"] },
      ],
    },
    {
      id: "life", emoji: "🎂",
      ja: "ライフイベント", en: "Life events",
      events: [
        { id: "birthday", emoji: "🎂", ja: "誕生日・パーティー", en: "Birthday & parties",
          months: [],
          ja_note: "飾りとギフト、ペットのおめかし。通年で使えます。",
          en_note: "Decorations, gifts and pet finery — all year round.",
          keys: ["crown", "rosette", "canbadge", "brooch", "petbowtie", "petbandana",
                 "petscarf", "kinchaku", "gamaguchi", "tote"] },
        { id: "babyshower", emoji: "🍼", ja: "出産祝い", en: "New baby",
          months: [],
          ja_note: "贈って喜ばれるベビー小物のひとそろい。",
          en_note: "A gift set of baby essentials.",
          keys: ["swaddle", "stai", "bandanastai", "babyhat", "babymitten",
                 "babyshoes", "babytoy", "babyblanket", "gauzehanky"] },
        { id: "formal", emoji: "💍", ja: "結婚・フォーマル", en: "Weddings & formal",
          months: [],
          ja_note: "装いに添えるフォーマルな小物。",
          en_note: "Formal touches to wear.",
          keys: ["bowtie", "necktie", "pocketsquare", "brooch"] },
      ],
    },
  ];
});
