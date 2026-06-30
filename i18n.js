/* ============================================================
   katagami i18n layer (Phase 1: English tool support)
   - Language is 'ja' by default. 'en' is enabled when the page
     sets window.KATAGAMI_LANG='en' or the URL has ?lang=en.
   - When lang==='ja', every helper returns the original Japanese
     string unchanged, so the Japanese site is 100% unaffected.
   - Pattern piece "memo" strings contain interpolated numbers and
     are intentionally NOT translated in Phase 1 (shown only in JA).
   ============================================================ */
(function(){
  var fromUrl;
  try{ fromUrl = new URLSearchParams(location.search).get('lang'); }catch(e){ fromUrl=null; }
  var lang = (window.KATAGAMI_LANG || fromUrl || 'ja');
  lang = (lang==='en') ? 'en' : 'ja';

  /* ---- UI chrome (dynamic strings rendered by app.js) ---- */
  var UI={
    presetTitle:"Size presets (click to fill values)",
    fold:"fold", foldBase:"fold (base)", grain:"grain",
    seamAllowance:"Seam allowance", yes:"Yes", no:"No",
    guideSub:"Guide sheet / Measure the calibration box before cutting the pattern.",
    sheetsLine:function(c,r,t){return "Pattern sheets: "+c+" cols x "+r+" rows = "+t+" sheets";},
    box50:"This box = 50 mm", checkRuler:"Check with a ruler",
    calRuler:"0–100 mm calibration ruler",
    assemblyMap:"Assembly map",
    assemblyNote:function(ov){return "Lay from top-left (1A) to the right, then down, overlapping ~"+ov+" mm.";},
    printWarn:"Print scale = 100% (actual size) / turn OFF “Fit to page”.",
    tileInfo:function(name,col,row,total){return name+"  /  col "+col+" row "+row+"  ("+total+" total)";},
    toCode:function(code){return "→ to "+code;},
    downCode:function(code){return "↓ to "+code;},
    overlapWith:function(code){return "overlap with "+code;},
    titlePrefix:"Katagami — ",
    profilePrompt:"Enter a name for this setup (e.g. Daughter 90cm summer)",
    profileDelete:"Delete this saved setup?",
    profileLoad:function(name){return "Load "+name;},
    profileDel:"Delete",
    howtoJa:"📖 Sewing guide (Japanese only)",
    howtoView:"📄 Read the sewing guide"
  };

  /* パターンキー → 英語版howtoが存在するもの（en/howto-<key>.html） */
  var HOWTO_EN={ tee:1, tote:1, kinchaku:1, pouch:1, shuushu:1, bowtie:1, placemat:1, bookcover:1, headband:1, sacoche:1, skirt:1, gather:1, apron:1, mask:1, pants:1, kidstee:1, pouchgusset:1, tissuecase:1, cushioncover:1, dog:1 };

  var MODE={ human:"Adult clothes", kids:"Kids' clothes", baby:"Baby",
    small:"Accessories", bag:"Bags", pet:"Pets", home:"Home" };

  var NAME={
    tee:"T-shirt", apron:"Apron", skirt:"A-line skirt", flareskirt:"Circle skirt",
    mermaid:"Mermaid skirt", sleevedress:"Sleeveless dress", adultgather:"Gathered skirt (adult)",
    widepants:"Wide pants (elastic waist)", halfpants:"Shorts (adult)", tunic:"Tunic",
    camisole:"Camisole", blouse:"Blouse", onepiece:"Dress (with sleeves)", jacket:"Jacket",
    coat:"Coat", kidstee:"Kids' T-shirt", kidsdress:"Kids' dress", smock:"Kids' smock",
    kidsvest:"Kids' vest", pants:"Elastic-waist pants", kidshalf:"Kids' shorts", gather:"Gathered skirt",
    bloomers:"Bloomers", swaddle:"Swaddle (hooded)", bandanastai:"Bandana bib", stai:"Baby bib",
    babyhat:"Baby hat (tulip hat)", legwarmer:"Baby leg warmers", kinchaku:"Drawstring pouch",
    kincgusset:"Cup bag (gusseted)", gymbag:"Gym bag (drawstring backpack)", shoesbag:"Shoe bag",
    movepocket:"Clip-on pocket", mask:"Pleated mask", fittedmask:"Fitted mask (2-piece)",
    bandana:"Triangle headscarf", placemat:"Placemat", shuushu:"Scrunchie", headband:"Headband",
    tissuecase:"Tissue case", bookcover:"Book cover", bowtie:"Bow tie", tote:"Tote bag",
    pouch:"Zipper pouch", pouchgusset:"Pouch (gusseted)", gamaguchi:"Clasp purse (gamaguchi)",
    sacoche:"Sacoche", azuma:"Azuma bag", panel:"Generic panel", clutchbag:"Clutch bag",
    shoulderbag:"Shoulder bag (flap)", dog:"Dog clothes (tank)", dogsleeved:"Dog clothes (sleeved)",
    mannerbelt:"Manner belt", petbandana:"Pet bandana", petsnood:"Dog snood (neck warmer)",
    catfuku:"Cat clothes (tank top)", petvest:"Pet vest (dog & cat)",
    cushioncover:"Cushion cover (envelope)", tablecloth:"Tablecloth", pillowcase:"Pillowcase (envelope)"
  };

  var NOTE={
    tee:"A relaxed drop-shoulder box tee. Front & back bodice plus sleeves. Baste first to check the neckline and armholes before final stitching. Best for knit fabric.",
    apron:"Three pieces: trapezoid body, two waist ties and one neck tie. Waist-tie positions are shown as dashed lines. Add pockets as you like.",
    skirt:"A simple A-line (no darts) with both front and back cut on the fold. Waist is meant for elastic or a side opening. Cut one front and one back (2 pieces total).",
    flareskirt:"A circle skirt. Full circle gives maximum flare; half circle keeps plenty of volume while using less fabric. Intended for an elastic waist. The pattern is a quarter circle (fan) placed on folded fabric to cut.",
    mermaid:"A mermaid line: fitted from waist to below the knee, then flaring at the hem. Two pieces: upper panel (waist to seam) and lower panel (seam to hem). Cut 2 each front and back, 4 total.",
    sleevedress:"Three pieces: front bodice, back bodice and skirt. A simple A-line silhouette. Finish the neckline and armholes with bias tape.",
    adultgather:"The easiest gathered skirt (adult size): fold a rectangle at the top and run elastic through. Sew the two front/back pieces at the sides. Left edge is the fold (center). The gather ratio sets the fabric width and how full it looks.",
    widepants:"Relaxed straight elastic-waist pants. The front and back use the same pattern: sew center (crotch) seams together, sew the sides, then fold the waist over for elastic. Baste the crotch to check the fit.",
    halfpants:"Relaxed elastic-waist shorts for adults. Same pattern as the wide pants with a shorter inseam. Adjust the inseam for knee-length, above-the-knee, etc.",
    tunic:"A relaxed long top that covers to above the knee. Same drop-shoulder pattern as the T-shirt, with the sleeve length adjustable from three-quarter to full. Best for soft fabrics like knit, double gauze or linen.",
    camisole:"A simple camisole: sew the front and back at the sides and add straps. Both front and back are cut on the fold. Works with many fabrics (knit, satin, linen). Adjust strap length when worn.",
    blouse:"A front-opening button-down blouse. Back is cut on the fold; the front is cut as 2 pieces (including the button stand). Set-in sleeves. Best for woven fabric (shirting, double gauze, linen).",
    onepiece:"A waist-seam dress with sleeves. Fitted bodice and an A-line skirt. Best for woven fabric (cotton, linen, double gauze).",
    jacket:"A front-button jacket with set-in sleeves. Back is cut on the fold; the front is cut as 2 pieces (including the button stand). Best for thicker woven fabric (wool, cotton twill).",
    coat:"A front-button A-line coat. Back is cut on the fold; the front is cut as 2 pieces (including the button stand). Set-in sleeves. Best for heavy fabric like wool, tweed or quilted fabric. Adding a lining gives a cleaner finish.",
    kidstee:"The same drop-shoulder box tee as the adult version, sized for kids. Start from the height presets, then baste first to check the neckline and armholes. Best for knit fabric.",
    kidsdress:"A two-tier dress: a sleeveless bodice joined to a fully gathered skirt. Three pieces: front bodice, back bodice and skirt. Finish the neckline and armholes with bias tape. Close the back opening with a button or snap.",
    smock:"The classic pullover smock for nursery and preschool. A relaxed drop-shoulder body (shared front/back) plus tube sleeves. Run elastic through the neckline and cuffs to gather. Since it goes over the head, check that the neckline fits over the head.",
    kidsvest:"A simple front-opening vest. One back piece (on the fold) and two front pieces. Finish the neckline, front edges, armholes and hem with bias tape or facings. Close the front with buttons or snaps.",
    pants:"A relaxed silhouette using the same pattern front and back. Sew the center lines together, sew the sides, then fold the waist over for elastic. The right edge is the crotch curve (center seam side). Baste the crotch to check the fit.",
    kidshalf:"Shorts made by shortening the inseam of the elastic-waist pants. Same pattern front and back: sew center (crotch) seams, sew the sides, fold the waist for elastic. Hem the legs.",
    gather:"The easiest gathered skirt: fold a rectangle at the top and run elastic through. Sew the two front/back pieces at the sides. Left edge is the fold (center). The gather ratio sets the fabric width and how full it looks.",
    bloomers:"Soft bloomers with elastic at both the waist and the legs. Same pattern front and back: sew the center (crotch) seams together, then sew the sides. Shorter length and more ease give a rounder, pumpkin-like shape. For babies to kids.",
    swaddle:"A square body with a triangular hood at one corner. Place the outer and lining right sides together, sew around, and turn through the opening. Tuck the hood into one corner of the body.",
    bandanastai:"A cute triangular bandana-style bib. Sew the outer and lining right sides together, turn through the opening, and fasten the two neck points (the left/right corners of the top edge) with snaps.",
    stai:"The classic bib: layer the outer and lining, sew, and turn right side out through the opening. The neck curve is a guide; adjust to the actual neck size and fasten with a snap.",
    babyhat:"A tulip hat with a crown of 6 petals (gores) and a downward brim. Cut 6 petals; cut the brim on a double fold for one outer and one lining. Make it with separate outer and lining fabrics for a reversible hat.",
    legwarmer:"Leg warmers you just sew into tubes. Fold the long edge right sides together to make a tube, then fold and hem the top and bottom. Knit fabric is comfortable without binding. Cut for two (left and right).",
    kinchaku:"The simplest drawstring pouch: fold one piece of fabric at the base (bottom) into a loop and sew both sides. The dotted line near the top marks the drawstring casing (fold-over).",
    kincgusset:"A drawstring pouch with a triangular base gusset. Cut the base on the fold. After sewing the sides, pinch the base corners into triangles up to the notches (▽) to sew the gusset, then fold the triangles.",
    gymbag:"A drawstring-top bag. Cut as one piece with the base on the fold and sew both sides. Add loops at the bottom corners to thread the cord and carry it like a backpack.",
    shoesbag:"A shoe bag you can hang by its D-ring handle. Body cut as one piece with the base on the fold, plus one handle and one D-ring tab. Fold the opening, sandwich the handle and tab, and sew the sides.",
    movepocket:"A clip-on pocket that threads onto a backpack strap. Three parts: 2 body pieces, 2 flap pieces and 1 belt loop. Sew the body and flap right sides together and turn, then bind with the belt loop.",
    mask:"A flat mask with three pleats in the center. Sew the outer and lining right sides together, then fold the sides into elastic casings. The dashed lines mark the pleat folds.",
    fittedmask:"A fitted, shaped mask joining upper and lower pieces along a wavy seam. The curved seam creates the shape around the nose. Cut each part on the fold for outer and lining; sew each part, turn, then join top and bottom.",
    bandana:"A triangular headscarf worn over the head. Place the long edge across the forehead and tie at the back. Just triple-fold hem the three edges. Run elastic through the base edge to make it pull-on.",
    placemat:"A simple placemat sewn around four sides. Works either single-layer (folding the seam allowance as you sew) or double-layer (two pieces sewn and turned).",
    shuushu:"A hair accessory made by sewing fabric into a tube and threading elastic through. Length sets the fullness, width sets the volume. When joining the short ends, leave a small opening to insert the elastic.",
    headband:"A headband: sew the long edge into a tube, then join the short ends. Same construction as the scrunchie but wider. With knit fabric you can rely on the stretch and skip the elastic.",
    tissuecase:"A pocket-tissue cover made from a single folded piece. Hem the top and bottom edges (the opening), fold so they overlap at the center, then sew the two sides. The dashed lines mark the hems and center fold.",
    bookcover:"A simple wrap-and-fold book cover. Sew the top and bottom, then fold the left and right flaps (dashed sections) inward to tuck the book in and hold it.",
    bowtie:"The classic type: fold the body into a loop at the center, gather it, and wrap with a center band. Depending on size it suits adults, kids or dogs (threaded onto a collar).",
    tote:"A boxed-corner tote. The body is cut as one piece folded at the base (front and back connected). Cut out the squares at the base corners and sew to form the gusset. The handles are separate.",
    pouch:"A flat pouch with a zipper at the top. Simply sew the front and back together. The zipper length is roughly the finished width.",
    pouchgusset:"A flat pouch with a gusset made by pinching and sewing the base corners into triangles. Sew the front and back together, then pinch the base corners and sew along the gusset line (dashed).",
    gamaguchi:"Automatically sizes the fabric from the clasp size. Place the actual clasp above the dashed line to trace its shape and adjust the fabric outline. Fabric width is roughly clasp width x 1.6.",
    sacoche:"A simple shoulder bag made by sewing the front and back together. Close the opening with a zipper or magnetic snap.",
    azuma:"An azuma bag made by folding a single 1:3 rectangle into thirds and sewing. It wraps like a furoshiki for a bento or as a reusable bag. The dashed lines are the fold positions.",
    panel:"For cushion covers, bag panels, small items and more. Just enter width and height. Set one side as the fold to cut a symmetrical piece.",
    clutchbag:"A long-wallet-style clutch folded in half with the base on the fold. Add a zipper to the body or make a flap-over version. Fabrics with character (canvas, faux leather, cotton) work well.",
    shoulderbag:"A standard shoulder bag: sew the front and back body panels together and add a flap. Use an adjuster on the strap to change the length freely. Best for canvas or denim.",
    dog:"A tube-shaped tank sewn at the sides from a back panel and a belly panel. The front-leg openings are the inner curves at the sides. Body shapes vary a lot, so baste first and adjust to your dog.",
    dogsleeved:"A three-piece tank-style dog garment with tube sleeves added for the front legs. Adjust the sleeves to the front-leg girth. Front-leg shapes vary greatly between dogs, so we recommend basting the sleeveless tank first to check the back and belly panels before making the sleeves.",
    mannerbelt:"A belly band to prevent marking. Fold the fabric lengthwise into a tube, sew, and fasten with hook-and-loop. Finish it a bit longer than the belly girth and adjust with the overlap.",
    petbandana:"A triangular bandana that threads onto the collar. Fold the top edge into a tube to pass the collar through. Triple-fold hem a single piece, or make it from an outer and a lining.",
    petsnood:"To keep long-eared dogs clean at mealtimes or warm in the cold. A neck warmer sewn into a tube. Fold both ends over, or run elastic through one side to fit the face and neck.",
    catfuku:"The same tube-shaped tank (back panel + belly panel) as the dog clothes, adjusted for cats. Many cats dislike front legs, so baste first and adjust the front-leg opening position. The preset values suit a cat's slim neck and short body.",
    petvest:"A vest style with wider front-leg openings. Same pattern as the dog tank but with larger leg openings for a lighter silhouette. Just sew the front and back panels at the sides. Great for walks in hot weather or as indoor wear.",
    cushioncover:"An envelope cushion cover that opens at the back. No zipper needed and simple to make. One outer piece plus two back pieces. Best for sturdy fabric like cotton, linen or canvas.",
    tablecloth:"Just enter the table size and overhang to calculate the fabric you need. Simply triple-fold hem all four sides. Use any fabric you like — cotton, linen or polyester.",
    pillowcase:"An envelope pillowcase. No zipper needed; the overlap at the opening holds the pillow in. One outer piece plus two back pieces. Best for gentle fabric like cotton, linen or double gauze."
  };

  var LABEL={
    "バスト":"Bust","着丈":"Length","肩幅":"Shoulder width","袖丈":"Sleeve length",
    "袖口（裁ち幅）":"Cuff (cut width)","衿ぐり幅":"Neckline width","ゆとり（総量）":"Ease (total)",
    "胸幅（上端）":"Chest width (top)","裾幅":"Hem width","エプロン丈":"Apron length",
    "腰ひも位置（上から）":"Waist tie position (from top)","腰ひも長さ（片側）":"Waist tie length (each side)",
    "衿ひも長さ":"Neck tie length","ひも裁ち幅":"Tie cut width","ウエスト":"Waist","ヒップ":"Hip",
    "スカート丈":"Skirt length","ヒップ下がり":"Hip drop","裾フレア（脇に+）":"Hem flare (to side +)",
    "ウエストゆとり":"Waist ease","スカート丈（合計）":"Skirt length (total)",
    "切替位置（ウエストから）":"Seam position (from waist)","裾フレア（片側に＋）":"Hem flare (each side +)",
    "ボディス丈（肩〜ウエスト）":"Bodice length (shoulder–waist)","裾フレア（脇に＋）":"Hem flare (to side +)",
    "バストゆとり":"Bust ease","ヒップ（目安）":"Hip (approx.)","ギャザー倍率":"Gather ratio",
    "ウエスト折り返し":"Waist fold-over","股上":"Rise","股下":"Inseam","股ぐり延長":"Crotch extension",
    "着丈（脇丈）":"Length (side)","前衿ぐり深さ":"Front neckline depth","肩ひも幅":"Strap width","肩ひも長さ":"Strap length",
    "袖口幅":"Cuff width","打ち合わせ幅":"Overlap (button stand)","身頃丈（肩〜ウエスト）":"Bodice length (shoulder–waist)",
    "股上（ウエスト〜股ぐり）":"Rise (waist–crotch)","股下（股〜裾）":"Inseam (crotch–hem)",
    "股上（ウエスト〜股）":"Rise (waist–crotch)","裾丈（股〜裾）":"Leg length (crotch–hem)",
    "ゴム通し折り返し":"Elastic casing fold","本体一辺":"Body side length","フードの辺":"Hood side",
    "上辺（首回り側）":"Top edge (neck side)","たれ丈（深さ）":"Drop length (depth)","横幅":"Width","全長":"Total length",
    "首くり幅":"Neckline width","首くり深さ":"Neckline depth","頭囲":"Head circumference","クラウン深さ":"Crown depth",
    "ブリム幅":"Brim width","ゆとり":"Ease","足回り（ふくらはぎ）":"Leg circumference (calf)","丈":"Length",
    "折り返し":"Fold-over","仕上がり幅":"Finished width","仕上がり高さ":"Finished height","ひも通し下がり":"Drawstring casing drop",
    "マチ（底の奥行）":"Gusset (base depth)","持ち手の長さ":"Handle length","ポケット幅":"Pocket width","ポケット高さ":"Pocket height",
    "フラップ高さ":"Flap height","ランドセルベルト幅":"Backpack strap width","幅（広げた状態）":"Width (unfolded)",
    "高さ（プリーツ前）":"Height (before pleats)","顔幅":"Face width","鼻下〜顎丈":"Nose-to-chin length","鼻立体量":"Nose curve depth",
    "底辺（額まわり側）":"Base (forehead side)","高さ（深さ）":"Height (depth)","縦（高さ）":"Height","布の長さ":"Fabric length",
    "裁ち幅":"Cut width","ティッシュの横幅":"Tissue width","ティッシュの高さ":"Tissue height","差し込み代（重なり）":"Insertion allowance (overlap)",
    "本の高さ":"Book height","本の幅（片面）":"Book width (one side)","本の厚み":"Book thickness","折り返し幅":"Fold-over width",
    "中央バンド幅":"Center band width","首バンドの長さ":"Neck band length","持ち手の裁ち幅":"Handle cut width",
    "マチ（底の奥行き）":"Gusset (base depth)","口金の幅（外幅）":"Clasp width (outer)","口金の高さ":"Clasp height",
    "ポーチの深さ":"Pouch depth","ショルダー紐長さ":"Shoulder strap length","紐の裁ち幅":"Strap cut width",
    "基準の正方形（一辺）":"Base square (side)","幅":"Width","高さ（収納）":"Height (folded)","フラップ深さ":"Flap depth",
    "高さ":"Height","ストラップ長さ":"Strap length","ストラップ幅（裁ち幅）":"Strap width (cut)",
    "胴回り":"Chest girth","背丈（背側）":"Back length","腹側の丈":"Belly length","首回り":"Neck girth",
    "前足ぐり位置":"Front leg opening position","前足ぐり大きさ":"Front leg opening size","前足回り":"Front leg circumference",
    "袖ゆとり":"Sleeve ease","お腹回り":"Belly girth","ベルト幅（仕上がり）":"Belt width (finished)","面ファスナー重ね":"Hook-and-loop overlap",
    "上辺（首側）":"Top edge (neck side)","たれ丈":"Drop length","首輪通し折り返し":"Collar casing fold","前足ぐり（大きさ）":"Front leg opening (size)",
    "クッション幅":"Cushion width","クッション高さ":"Cushion height","重なり幅（入口）":"Overlap (opening)",
    "テーブル幅":"Table width","テーブル長さ":"Table length","垂れ幅":"Overhang","枕幅":"Pillow width","枕高さ":"Pillow height"
  };

  var PRESET={
    "レディースS":"Women's S","レディースM":"Women's M","メンズM":"Men's M","メンズL":"Men's L",
    "大人フル":"Adult full","大人ハーフ":"Adult half","子供":"Child","S":"S","M":"M","L":"L","LL":"XL",
    "80cm":"80cm","90cm":"90cm","100cm":"100cm","110cm":"110cm","120cm":"120cm","130cm":"130cm","大人M":"Adult M",
    "子供80":"Child 80","子供90":"Child 90","子供100":"Child 100","子供110":"Child 110","子供120":"Child 120","子供130":"Child 130",
    "70(6-12M)":"70 (6–12M)","80(1-2歳)":"80 (1–2y)","90(2-3歳)":"90 (2–3y)","95(3-4歳)":"95 (3–4y)",
    "標準":"Standard","大きめ":"Large","新生児":"Newborn","3〜6M":"3–6M","6〜12M":"6–12M","1〜2歳":"1–2y","2〜3歳":"2–3y","0〜1歳":"0–1y",
    "給食袋":"Lunch bag","体操着袋":"Gym clothes bag","お着替え袋":"Clothes bag","コップ袋S":"Cup bag S","コップ袋M":"Cup bag M","お弁当袋":"Bento bag",
    "小さめ":"Small","大人小さめ":"Adult small","大人":"Adult","女性":"Women","男性":"Men","幼児":"Toddler","小学生":"School age","幼稚園":"Preschool","小学校":"Elementary",
    "A4横":"A4 landscape","細め":"Slim","ふんわり":"Fluffy","大人S":"Adult S","ターバン":"Turban","大判":"Large",
    "文庫":"Bunko (A6)","新書":"Shinsho","B6":"B6","A5":"A5","通園バッグS":"Nursery bag S","レッスンバッグ":"Lesson bag","A4縦対応":"Fits A4 portrait","たっぷり":"Roomy",
    "カード入れ":"Card case","コスメS":"Cosmetic S","コスメM":"Cosmetic M","コスメL":"Cosmetic L","ペンケース":"Pen case",
    "8cm口金":"8cm clasp","10.5cm口金":"10.5cm clasp","15cm口金":"15cm clasp","18cm口金":"18cm clasp","スリム":"Slim","お弁当":"Bento",
    "クラッチS":"Clutch S","クラッチM":"Clutch M","クラッチL":"Clutch L","ミニ":"Mini","スタンダード":"Standard","A4対応":"Fits A4",
    "小型犬S":"Small dog S","中型犬M":"Medium dog M","大型犬L":"Large dog L","小型犬":"Small dog","中型犬":"Medium dog","大型犬":"Large dog","子猫":"Kitten",
    "標準（♀）":"Standard (♀)","標準（♂）":"Standard (♂)","大柄":"Large build","猫・豆柴":"Cat / Mame Shiba",
    "45角（標準）":"45 sq (standard)","35角（小型）":"35 sq (small)","60×40（長方形）":"60×40 (rect)",
    "2〜4人掛け":"2–4 seats","4〜6人掛け":"4–6 seats","6〜8人掛け":"6–8 seats",
    "大判（63×43）":"Large (63×43)","小判（50×35）":"Small (50×35)","欧米（70×50）":"Euro (70×50)"
  };

  var TOGGLE={
    "ハーフサークルにする（布使い少なめ・フレアやや控えめ）":"Half-circle (less fabric, slightly less flare)",
    "首バンドを付ける（人・子供用）":"Add neck band (for people/kids)",
    "角丸タイプ（口金角の丸みに合わせる）":"Rounded corners (match clasp corners)",
    "左端を「わ」にする":"Left edge on fold"
  };

  var UNIT={ "cm":"cm", "倍":"×" };

  /* piece titles + static cutInfo + casing labels */
  var PIECE={
    /* titles */
    "前身頃":"Front bodice","後身頃":"Back bodice","袖":"Sleeve","本体":"Body","腰ひも":"Waist tie","衿ひも":"Neck tie",
    "前/後 スカート":"Front/Back skirt","スカート":"Skirt","上（ウエスト〜切替）":"Upper (waist–seam)","下（切替〜裾）":"Lower (seam–hem)",
    "スカート（前・後共通）":"Skirt (front & back)","前/後パンツ":"Front/Back pants","肩ひも":"Strap","前身頃（右）":"Front bodice (right)",
    "前/後身頃（共通）":"Front/Back bodice (shared)","後ろ身頃":"Back bodice","前/後 ブルマ（共通）":"Front/Back bloomers (shared)",
    "フード（角）":"Hood (corner)","バンダナスタイ":"Bandana bib","スタイ本体":"Bib body","クラウン（花びら）":"Crown (petal)","ブリム":"Brim",
    "レッグウォーマー":"Leg warmer","袋本体":"Bag body","持ち手":"Handle","Dカンタブ":"D-ring tab","フラップ":"Flap","ベルト通し":"Belt loop",
    "マスク本体":"Mask body","上パーツ（鼻・頰）":"Upper piece (nose/cheek)","下パーツ（口・顎）":"Lower piece (mouth/chin)","三角巾":"Triangle scarf",
    "ランチョンマット":"Placemat","シュシュ本体":"Scrunchie body","ヘアバンド本体":"Headband body","ケース本体":"Case body","ブックカバー":"Book cover",
    "中央バンド":"Center band","首バンド":"Neck band","ポーチ前/後":"Pouch front/back","ポーチ本体":"Pouch body","ショルダー紐":"Shoulder strap","パネル":"Panel",
    "ストラップ":"Strap","背パネル":"Back panel","腹パネル":"Belly panel","前足袖":"Front-leg sleeve","マナーベルト":"Manner belt","バンダナ":"Bandana",
    "スヌード本体":"Snood body","表布":"Outer fabric","裏布（2枚）":"Lining (2 pcs)","テーブルクロス":"Tablecloth",
    /* cutInfo */
    "中心を「わ」／前 1枚":"Center on fold / Front ×1","中心を「わ」／後ろ 1枚":"Center on fold / Back ×1",
    "2枚（左右）":"2 pcs (L/R)","1枚":"1 pc","2枚":"2 pcs","1枚（二つ折りで縫う）":"1 pc (fold in half and sew)",
    "中心を「わ」に置いて 前1枚・後1枚（計2枚）":"Center on fold / Front ×1, Back ×1 (2 total)",
    "CF・CBとも「わ」に置いて1枚裁ち（計1枚）":"CF & CB on fold / cut 1 pc (1 total)",
    "中心を「わ」に置いて1枚（前1枚・後1枚）":"Center on fold / 1 pc (Front ×1, Back ×1)",
    "前後それぞれ2枚（左右）計4枚／中心線・股ぐり同士を縫う":"2 pcs each front/back (L/R), 4 total / sew center & crotch seams",
    "CF（中心）を「わ」に置いて 1枚":"CF (center) on fold / 1 pc","CB（中心）を「わ」に置いて 1枚":"CB (center) on fold / 1 pc",
    "4枚（前後左右 各2枚を中表で縫って表に返す）":"4 pcs (2 each front/back, sew right sides together and turn)",
    "2枚（左右対称に裁断）":"2 pcs (cut mirror image)",
    "2枚（左右）／ 袖口をゴム通しにし、袖下を縫って身頃の袖ぐりに付ける":"2 pcs (L/R) / make cuff casing, sew underarm, attach to armhole",
    "後ろ中心を「わ」に置いて1枚":"Back center on fold / 1 pc",
    "前後それぞれ2枚（左右）計4枚 ／ 中心(股ぐり)同士を縫い、脇を縫う":"2 pcs each front/back (L/R), 4 total / sew center (crotch), then sides",
    "表布・裏布 各1枚（計2枚）":"Outer & lining, 1 pc each (2 total)",
    "表布・裏布 各1枚（計2枚）／ 本体の角に重ねて挟む":"Outer & lining, 1 pc each (2 total) / sandwich at the body corner",
    "2枚（表・裏）を中表に縫い、返し口から返す":"2 pcs (outer/lining), sew right sides together and turn through the opening",
    "2枚（表・裏）を重ねて縫い、返し口から表に返す":"2 pcs (outer/lining), sew together and turn through the opening",
    "6枚 ／ 曲線の辺同士を順に縫い合わせてドーム状にする":"6 pcs / sew the curved edges in sequence into a dome",
    "CF・CBとも「わ」に置いて1枚裁ち ×2（表・裏）":"CF & CB on fold / cut 1 pc ×2 (outer/lining)",
    "2枚（左右）／ 長辺を縫って筒にし上下をヘム":"2 pcs (L/R) / sew the long edge into a tube, hem top and bottom",
    "底（下端）を「わ」に置いて 1枚":"Base (bottom) on fold / 1 pc",
    "底（下端）を「わ」に置いて 1枚 ／ 脇縫い後に底角の▽位置で三角につまんでマチを縫う":"Base (bottom) on fold / 1 pc / after side seams, pinch the base corners at ▽ to sew the gusset",
    "底（下端）を「わ」に置いて1枚／脇を縫う":"Base (bottom) on fold / 1 pc / sew the sides",
    "1本（4つ折りにして縫う）":"1 pc (fold in quarters and sew)","1本（4つ折り→Dカンに通して二つ折り）":"1 pc (fold in quarters → thread D-ring → fold in half)",
    "2枚（表・裏）":"2 pcs (outer/lining)","1枚（長さ方向に二つ折り→両端を折って縫う）":"1 pc (fold lengthwise → fold the ends and sew)",
    "表・裏 各1枚（計2枚）":"Outer & lining, 1 pc each (2 total)",
    "中心を「わ」に置いて 2枚（表・裏）。表・裏を中表で波形縫い目を縫い、表に返す。":"Center on fold / 2 pcs (outer/lining). Sew the wavy seam right sides together and turn.",
    "中心を「わ」に置いて 2枚（表・裏）。上パーツと同様に表・裏を縫って返す。":"Center on fold / 2 pcs (outer/lining). Sew and turn like the upper piece.",
    "1枚／三辺を三つ折りでヘム":"1 pc / triple-fold hem on three sides","1枚（一重）または2枚（表・裏・二重仕立て）":"1 pc (single) or 2 pcs (outer/lining, double)",
    "1枚 ／ 長辺を縫って筒にし、短辺同士を縫い合わせる":"1 pc / sew the long edge into a tube, then join the short edges",
    "1枚 ／ 上下辺をヘムしてから中央で折り、両脇を縫う":"1 pc / hem top and bottom, fold at center, sew both sides",
    "1枚 ／ 上下を縫い代分折ってから左右フラップを折り込む":"1 pc / fold top and bottom by the seam allowance, then tuck in the side flaps",
    "1枚 ／ 中央(合印)で輪に折る":"1 pc / fold into a loop at the center (notch)","1枚 ／ 中央に巻いて裏で留める":"1 pc / wrap at the center and fasten on the back",
    "1枚 ／ 二つ折りで縫い首に回す":"1 pc / fold in half, sew, wrap around the neck",
    "底（下端）を「わ」に置いて 1枚 ／ 底角の□を切り欠く":"Base (bottom) on fold / 1 pc / cut out the □ at the base corners",
    "2枚（前後）":"2 pcs (front/back)","2枚（前後）／ 底角を三角につまんでマチ縫い線で縫う":"2 pcs (front/back) / pinch the base corners and sew along the gusset line",
    "2枚（前後）／ 上端に口金をあてて形を写す":"2 pcs (front/back) / place the clasp at the top and trace the shape",
    "1枚（長さ方向に二つ折りで縫う）":"1 pc (fold lengthwise and sew)","1枚（長辺＝基準正方形×3）":"1 pc (long side = base square ×3)",
    "必要枚数だけ裁断":"Cut as many as needed","底（下端）を「わ」に置いて 2枚（表・裏）":"Base (bottom) on fold / 2 pcs (outer/lining)",
    "2枚（前・後）":"2 pcs (front/back)","1枚（長辺を縫って筒にし表返す／Dカン・ナスカン付き）":"1 pc (sew the long edge into a tube and turn / with D-ring & swivel hook)",
    "中心を「わ」／1枚（背側）":"Center on fold / 1 pc (back side)","中心を「わ」／1枚（腹側）":"Center on fold / 1 pc (belly side)",
    "2枚（左右）／ 袖口端を折ってから前足ぐり合印に合わせて縫い付ける":"2 pcs (L/R) / fold the cuff edge, then attach at the front-leg notches",
    "1枚 ／ 長さ方向に二つ折りにして縫い、面ファスナーを付ける":"1 pc / fold lengthwise, sew, add hook-and-loop",
    "1枚（上辺を折り返して首輪通しにする）／または表・裏2枚":"1 pc (fold the top edge into a collar casing) / or 2 pcs (outer/lining)",
    "1枚／長辺を縫って筒にし、上下をヘムまたはゴム通し":"1 pc / sew the long edge into a tube, then hem or add a casing top and bottom",
    "同じ型紙を2枚裁断 ／ 内側の端をヘム処理":"Cut 2 from the same pattern / hem the inner edge",
    "1枚 ／ 四辺を三つ折りでヘム処理":"1 pc / triple-fold hem on all four sides",
    /* casing labels */
    "腰ひも付け位置":"Waist tie position","ウエスト折り返し":"Waist fold-over","袖口ゴム通し":"Cuff elastic casing","ウエスト/裾ゴム通し":"Waist/hem elastic casing",
    "折り返しヘム":"Fold-over hem","ひも通し口":"Drawstring opening","プリーツ折り山の目安":"Pleat fold guide",
    "折り目の目安（上下＝ヘム折り・中央＝組み立て折り）":"Fold guide (top/bottom = hem, center = assembly)",
    "マチ縫い線（底角をつまんでここで縫う）":"Gusset line (pinch the base corner and sew here)","口金取り付け位置（ここに口金をあわせる）":"Clasp placement (align the clasp here)",
    "二つ折り線":"Fold line","首輪通し折り返し":"Collar casing fold","折り返し／ゴム通し":"Fold-over / elastic casing"
  };

  function tr(map,s){ if(lang!=='en'||s==null) return s; return (s in map)?map[s]:s; }

  window.KG={
    lang:lang,
    ui:UI,
    mode:function(k,ja){ return (lang==='en'&&MODE[k])?MODE[k]:ja; },
    name:function(k,ja){ return (lang==='en'&&NAME[k])?NAME[k]:ja; },
    note:function(k,ja){ return (lang==='en'&&NOTE[k])?NOTE[k]:ja; },
    label:function(s){ return tr(LABEL,s); },
    preset:function(s){ return tr(PRESET,s); },
    toggle:function(s){ return tr(TOGGLE,s); },
    unit:function(s){ return tr(UNIT,s); },
    piece:function(s){ return tr(PIECE,s); },
    howtoEN:function(k){ return !!HOWTO_EN[k]; }
  };
})();
