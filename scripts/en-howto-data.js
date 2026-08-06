/* English how-to content. Keyed by pattern key (matches PATTERNS / i18n NAME). */
module.exports = {

  tote: {
    title: "Tote bag",
    tab: "bag",
    toolName: "Tote bag",
    sizeStep: "Enter the finished width, height, gusset (base depth) and handle length. If unsure, click a preset like “Lesson bag”.",
    desc: "A beginner-friendly guide to sewing a boxed-corner tote bag. The body is cut as one piece, and you box the corners to make the gusset. Print a true-to-size pattern with Katagami.",
    keywords: "tote bag,how to sew,sewing pattern,boxed corners,lesson bag,handmade",
    lead: "A classic tote bag with a boxed base. The body is cut as a single piece folded at the bottom, and notching and sewing the base corners creates the gusset. Perfect as a lesson bag, library bag or shopping bag.",
    matNote: "lesson-bag size",
    materials: [
      "Main fabric (oxford, canvas or other medium/heavy weight) — about 70 × 90 cm (28 × 35 in)",
      "Fabric for the handles, or webbing — about 4 × 120 cm (1.5 × 47 in)",
      "Optional: lining fabric and fusible interfacing"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Lay the pattern on the wrong side of the fabric and trace the cut line (outer solid line) and the seam line (inner dashed line). Align the grain (lengthwise threads) with the grainline on the pattern.",
      "<strong>Cut</strong><br>Cut the body as one piece with the base on the fold, and cut 2 handles. The squares (notch marks) at the base corners are cut out after sewing the sides and base.",
      "<strong>Finish the edges</strong><br>For fabrics that fray, zigzag or serge the seam-allowance edges after cutting for a cleaner finish."
    ],
    sew: [
      { h: "4-1. Make the handles", items: [
        "Fold each handle piece in half lengthwise, right sides together, and sew the long edge. Turn right side out, press, and topstitch both edges for strength. (Skip this step if you use ready-made webbing.)"
      ]},
      { h: "4-2. Baste the handles", items: [
        "On the right side of the bag opening (top edge), baste the handle ends at equal distances from the center. Make sure the handles are not twisted."
      ]},
      { h: "4-3. Sew the sides", items: [
        "Fold the body at the base, right sides together, pin the two sides and sew with the seam allowance (1–1.5 cm).",
        "Press the seam allowances open."
      ]},
      { h: "4-4. Box the corners", items: [
        "At each base corner, open it into a triangle so the side seam lines up with the base fold.",
        "Sew straight across the notch line (gusset line). Do the same at both base corners.",
        "Trim the triangle tip leaving 1 cm, or leave it and fold it down."
      ]},
      { h: "4-5. Finish the opening", items: [
        "Fold the opening under by the seam allowance, then fold again 2–3 cm to make a double fold; press and topstitch all the way around. Flip the handles up and topstitch once more for strength.",
        "Turn right side out, shape it, and you're done."
      ]}
    ],
    tips: [
      "<strong>Make it sturdier</strong>: add fusible interfacing to the back of the body, or add a lining for a double-layer bag that keeps its shape.",
      "<strong>Strengthen the base</strong>: add a separate base panel or insert a base board for heavier loads.",
      "<strong>Deeper gusset</strong>: increase the “gusset” value for a roomier, more three-dimensional bag that fits boxes and bulky items."
    ]
  },

  kinchaku: {
    title: "Drawstring pouch",
    tab: "small",
    toolName: "Drawstring pouch",
    sizeStep: "Enter the finished width and height (and the casing drop). Presets fill in common sizes for you.",
    desc: "How to sew the simplest drawstring pouch from a single piece of fabric. Fold at the base, sew the sides, leave a drawstring casing. Print a true-to-size pattern with Katagami.",
    keywords: "drawstring pouch,drawstring bag,how to sew,sewing pattern,gift bag,handmade",
    lead: "The simplest drawstring pouch: fold one piece of fabric into a loop at the base and sew both sides. The dotted line near the top marks the drawstring casing. Great for small gifts, toys or odds and ends.",
    matNote: "small pouch",
    materials: [
      "Fabric (cotton, linen or light canvas) — about 25 × 45 cm (10 × 18 in)",
      "Cord or ribbon for the drawstring — about 80 cm (32 in) × 1 (or × 2 for both-side draw)"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Lay the pattern on the wrong side of the fabric and trace the cut line and seam line. Align the grain with the grainline.",
      "<strong>Cut</strong><br>Cut the body as one piece with the base on the fold. The dotted line near the top is the drawstring casing fold line.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the side edges so they don't fray once turned."
    ],
    sew: [
      { h: "4-1. Mark the casing opening", items: [
        "Fold the body in half at the base, right sides together. On both sides, leave the top section (above the casing line) unsewn — this opening is where the cord comes out."
      ]},
      { h: "4-2. Sew the sides", items: [
        "Sew each side from the base up to the casing opening with the seam allowance.",
        "Press the seam allowances open, including the open part of the opening, so the casing lies flat."
      ]},
      { h: "4-3. Make the casing", items: [
        "Fold the top edge under by the seam allowance, then fold down along the casing line to make a channel; press and topstitch close to the lower fold, all the way around.",
        "Leave both ends of the channel open for the cord."
      ]},
      { h: "4-4. Thread the cord", items: [
        "Use a safety pin or bodkin to thread the cord through the casing and back out. Knot the ends.",
        "For a both-side draw, thread a second cord from the opposite side."
      ]}
    ],
    tips: [
      "<strong>Flat bottom</strong>: box the base corners (like a tote) for a pouch that stands up.",
      "<strong>Lined version</strong>: make an outer and a lining and bag them together for a neat, reversible finish.",
      "<strong>Size it</strong>: widen and lengthen for a shoe bag or gym bag; keep it small for a coin or charm pouch."
    ]
  },

  pouch: {
    title: "Zipper pouch",
    tab: "bag",
    toolName: "Zipper pouch",
    sizeStep: "Enter the finished width and height. The zipper length is roughly the finished width.",
    desc: "How to sew a flat zipper pouch by joining a front and back around a zipper. A simple, satisfying first zipper project. Print a true-to-size pattern with Katagami.",
    keywords: "zipper pouch,how to sew a zipper,sewing pattern,pencil case,cosmetic bag,handmade",
    lead: "A flat pouch with a zipper across the top. You sew the front and back to the zipper tape, then close up the sides — a great first zipper project. The zipper length is roughly the finished width.",
    matNote: "pencil-case size",
    materials: [
      "Main fabric (cotton, canvas or laminate) — about 25 × 40 cm (10 × 16 in)",
      "Optional lining — about 25 × 40 cm (10 × 16 in)",
      "1 zipper, roughly the finished width (e.g. 20 cm / 8 in)"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric. Align the grain with the grainline.",
      "<strong>Cut</strong><br>Cut 2 (front and back). Cut the same in lining if you are lining the pouch.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the side and bottom edges to stop fraying."
    ],
    sew: [
      { h: "4-1. Attach the zipper to the front", items: [
        "Place the zipper face down along the top edge of the front piece, right sides together, and pin.",
        "Using a zipper foot, sew along the top edge close to the zipper teeth."
      ]},
      { h: "4-2. Attach the zipper to the back", items: [
        "Place the other long edge of the zipper along the top edge of the back piece, right sides together, and sew the same way.",
        "Open the pieces out flat and topstitch alongside the zipper on both sides for a crisp finish."
      ]},
      { h: "4-3. Sew up the sides and base", items: [
        "<b>Open the zipper halfway first</b> (so you can turn the pouch later). Fold the pouch right sides together, matching front and back.",
        "Sew around the two sides and the bottom with the seam allowance, backstitching over the zipper ends.",
        "Trim the corners, turn right side out through the open zipper, and push the corners out."
      ]}
    ],
    tips: [
      "<strong>Always open the zipper before sewing the sides</strong> — otherwise you can't turn the pouch right side out.",
      "<strong>Add a gusset</strong>: box the base corners for a stand-up pouch that holds more.",
      "<strong>Add a tab</strong>: fold a short strip and catch it in the side seam by the zipper for an easy-to-grab pull."
    ]
  },

  shuushu: {
    title: "Scrunchie",
    tab: "small",
    toolName: "Scrunchie",
    sizeStep: "Enter the length and width. Longer = fuller gathers, wider = more volume. Presets cover common sizes.",
    desc: "How to sew a scrunchie in minutes: sew fabric into a tube and thread elastic through. Length sets the fullness, width sets the volume. Print a true-to-size pattern with Katagami.",
    keywords: "scrunchie,how to sew,sewing pattern,hair tie,beginner,handmade,scrap fabric",
    lead: "A hair accessory you sew into a tube and thread elastic through. The length sets how full it gathers and the width sets the volume. A perfect 10-minute project for using up scraps.",
    matNote: "one scrunchie",
    materials: [
      "Fabric (cotton, satin or other soft fabric) — about 12 × 55 cm (5 × 22 in)",
      "Elastic (about 6 mm / 1/4 in wide) — about 20 cm (8 in)"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line onto the wrong side of the fabric. A soft fabric with a little drape gathers best.",
      "<strong>Cut</strong><br>Cut 1 long strip.",
      "<strong>(Optional) press</strong><br>Press the strip so it's easier to fold accurately."
    ],
    sew: [
      { h: "4-1. Sew the tube", items: [
        "Fold the strip in half lengthwise, right sides together, and sew the long edge to make a tube. Leave the short ends open.",
        "Turn the tube right side out (a safety pin or turning tool helps). Press lightly."
      ]},
      { h: "4-2. Thread the elastic", items: [
        "Attach a safety pin to one end of the elastic and feed it all the way through the tube.",
        "Overlap the two ends of the elastic and sew them together securely; let the elastic disappear into the tube."
      ]},
      { h: "4-3. Close the tube", items: [
        "Tuck one raw short end inside the other, fold the seam allowance under, and slip-stitch (or topstitch) the opening closed, distributing the gathers evenly."
      ]}
    ],
    tips: [
      "<strong>More volume</strong>: increase the width; <strong>fuller gathers</strong>: increase the length.",
      "<strong>No-show seam</strong>: a hand slip-stitch closes the opening invisibly; a machine topstitch is faster.",
      "<strong>Velvet or satin</strong> makes a dressier scrunchie; quilting cotton is the easiest to handle."
    ]
  },

  tee: {
    title: "T-shirt",
    tab: "human",
    toolName: "T-shirt",
    sizeStep: "Enter your bust, shoulder width, length, sleeve length and neckline width, or start from a size preset (S–XL).",
    desc: "How to sew a relaxed drop-shoulder T-shirt from knit fabric. Front and back bodice plus sleeves. Baste first to check the fit. Print a true-to-size pattern with Katagami.",
    keywords: "t-shirt,how to sew,knit fabric,sewing pattern,drop shoulder,handmade clothes",
    lead: "A relaxed drop-shoulder box tee: front and back bodice plus sleeves. It's a great intro to sewing with knits. Baste first to check the neckline and armholes before final stitching.",
    matNote: "adult M",
    materials: [
      "Knit fabric (cotton jersey, French terry, etc.) — about 150 × 100 cm (60 × 40 in)",
      "Optional: ribbing for the neckband — about 50 × 10 cm (20 × 4 in)",
      "Ballpoint / stretch machine needle and (ideally) stretch or zigzag stitch"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric. Align the grain with the grainline; for knits the most stretchy direction usually goes around the body.",
      "<strong>Cut</strong><br>Cut the back on the fold (1), the front on the fold (1) and 2 sleeves. Mark the notches on the armholes.",
      "<strong>Use a stretch stitch</strong><br>Sew with a narrow zigzag or stretch stitch, or a serger, so the seams stretch with the fabric."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Place front and back right sides together and sew both shoulder seams."
      ]},
      { h: "4-2. Set in the sleeves", items: [
        "Open the body out flat. Matching the sleeve notch to the shoulder seam, pin each sleeve to the armhole, right sides together, and sew along the curve."
      ]},
      { h: "4-3. Sew the sides and underarms", items: [
        "Fold right sides together and sew each side from the sleeve cuff down to the hem in one continuous seam. Match the underarm point."
      ]},
      { h: "4-4. Finish neckline, cuffs and hem", items: [
        "Neckline: attach a ribbing band, or turn under and topstitch with a twin needle / zigzag.",
        "Cuffs and hem: turn under and topstitch. Press lightly — avoid stretching the fabric as you sew."
      ]}
    ],
    tips: [
      "<strong>Baste first</strong>: knits are forgiving but the neckline and armholes are easier to adjust before final stitching.",
      "<strong>No serger?</strong> A narrow zigzag works fine; just don't pull the fabric through the machine.",
      "<strong>Change the look</strong>: lengthen for a tunic, shorten the sleeves for a tee, or widen the body for an oversized fit."
    ]
  },

  bowtie: {
    title: "Bow tie",
    tab: "small",
    toolName: "Bow tie",
    sizeStep: "Enter the bow width and height (and the center band width). Presets cover adult, kids and pet sizes.",
    desc: "How to sew a classic bow tie: fold the body into a loop, gather it, and wrap a center band. Sizes for adults, kids or even a pet collar. Print a true-to-size pattern with Katagami.",
    keywords: "bow tie,how to sew,sewing pattern,wedding,kids,pet collar,handmade",
    lead: "The classic type: fold the body into a loop at the center, gather it, and wrap a center band around it. Depending on the size it suits an adult, a child or a pet (threaded onto a collar).",
    matNote: "adult bow tie",
    materials: [
      "Main fabric (cotton, satin or a crisp shirting) — about 25 × 25 cm (10 × 10 in)",
      "Optional: lightweight fusible interfacing for body",
      "An adjustable bow-tie strap with hardware, or elastic, for wearing"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric.",
      "<strong>Cut</strong><br>Cut 1 body (folded into a loop at the center notch) and 1 center band.",
      "<strong>(Optional) interface</strong><br>For soft fabric, fuse a light interfacing to the body so the bow holds its shape."
    ],
    sew: [
      { h: "4-1. Sew the body into a loop", items: [
        "Fold the body piece in half at the center, right sides together, and sew the long edge into a tube. Turn right side out and press with the seam centered at the back.",
        "Bring the two short ends together and sew them, forming a loop (ring)."
      ]},
      { h: "4-2. Shape the bow", items: [
        "Flatten the loop with the joining seam hidden at the center back.",
        "Pinch the center into accordion folds (gathers) to form the bow shape."
      ]},
      { h: "4-3. Wrap the center band", items: [
        "Fold the center band into a narrow strip and press. Wrap it snugly around the gathered center and hand-stitch it closed at the back.",
        "Thread the wearing strap (or elastic) behind the center band."
      ]}
    ],
    tips: [
      "<strong>Crisper bow</strong>: use interfacing or a slightly stiffer fabric so the loops stand out.",
      "<strong>Pet bow tie</strong>: leave the center band loose enough to slide onto the collar.",
      "<strong>Pre-tied look</strong>: this style is pre-shaped, so it stays neat all day — ideal for weddings and photos."
    ]
  },

  placemat: {
    title: "Placemat",
    tab: "small",
    toolName: "Placemat",
    sizeStep: "Enter the finished width and height (e.g. 40 × 30 cm / 16 × 12 in). Presets cover common sizes.",
    desc: "How to sew a simple placemat. Make it single-layer by folding the seam allowance, or double-layer by sewing two pieces and turning. A quick, beginner-friendly project.",
    keywords: "placemat,how to sew,sewing pattern,table linen,beginner,handmade",
    lead: "A simple placemat sewn around four sides. Make it single-layer (folding the seam allowance as you sew) or double-layer (two pieces sewn right sides together and turned). A great quick project for beginners.",
    matNote: "one placemat",
    materials: [
      "Fabric (cotton, linen or canvas) — about 45 × 35 cm (18 × 14 in) per layer",
      "Optional: fusible batting or interfacing for body"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric.",
      "<strong>Cut</strong><br>Cut 1 for a single-layer mat, or 2 (front and back) for a double-layer mat.",
      "<strong>Finish the edges</strong><br>For a single layer, you can zigzag the edges, but folding them under (below) hides them."
    ],
    sew: [
      { h: "4-1. Double-layer (turned) version", items: [
        "Place the two pieces right sides together and sew around, leaving a 8–10 cm (3–4 in) gap on one side for turning.",
        "Trim the corners, turn right side out through the gap, and push the corners out. Press flat.",
        "Topstitch all the way around close to the edge; this also closes the turning gap."
      ]},
      { h: "4-2. Single-layer (folded) version", items: [
        "Fold each edge under by the seam allowance, then fold again to make a double fold; press.",
        "Mitre or overlap the corners neatly, then topstitch all the way around."
      ]}
    ],
    tips: [
      "<strong>Add body</strong>: insert fusible batting for a padded mat that protects the table.",
      "<strong>Rounded corners</strong>: round the corners slightly for an easier turn and a softer look.",
      "<strong>Make a set</strong>: cut several at once from the same fabric for a matching set."
    ]
  },

  bookcover: {
    title: "Book cover",
    tab: "small",
    toolName: "Book cover",
    sizeStep: "Enter your book height, width (one side) and thickness. Presets cover common book sizes.",
    desc: "How to sew a simple wrap-and-fold book cover. Sew the top and bottom, then tuck the flaps to hold the book — no closures needed. Sized to your exact book.",
    keywords: "book cover,fabric book cover,how to sew,sewing pattern,handmade,gift",
    lead: "A simple wrap-and-fold book cover. Sew the top and bottom edges, then fold the left and right flaps inward and slip the book's covers in — no buttons or closures needed.",
    matNote: "paperback size",
    materials: [
      "Fabric (cotton, linen or laminate) — about 40 × 25 cm (16 × 10 in)",
      "Optional: lightweight interfacing for body"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric. The dashed lines mark the flap folds.",
      "<strong>Cut</strong><br>Cut 1 piece. The width includes both covers plus the spine and the fold-in flaps.",
      "<strong>Finish the edges</strong><br>Zigzag the left and right (flap) edges so they don't fray."
    ],
    sew: [
      { h: "4-1. Hem the flap edges", items: [
        "Fold the left and right short edges under and topstitch a narrow hem (these become the open edges of the flaps)."
      ]},
      { h: "4-2. Form the flaps", items: [
        "With the fabric right side up, fold the left and right ends inward along the flap fold lines to form pockets, right sides together.",
        "Pin the folded flaps in place."
      ]},
      { h: "4-3. Sew top and bottom", items: [
        "Sew the top and bottom edges straight across (catching the folded flaps in the seams).",
        "Turn right side out through one of the flap openings and push the corners out. Press.",
        "Slip the book's front and back covers into the side pockets."
      ]}
    ],
    tips: [
      "<strong>Add a bookmark</strong>: catch a ribbon in the top seam at the spine.",
      "<strong>Stiffer cover</strong>: fuse a light interfacing so the cover holds its shape.",
      "<strong>Any size</strong>: enter the exact book thickness so the cover fits snugly."
    ]
  },

  headband: {
    title: "Headband",
    tab: "small",
    toolName: "Headband",
    sizeStep: "Enter the head circumference and the band width. With knit fabric you can rely on the stretch.",
    desc: "How to sew a simple fabric headband. Sew the fabric into a tube and join the ends. Same idea as a scrunchie, made wider. Great for knit scraps.",
    keywords: "headband,how to sew,sewing pattern,knit,turban,hair accessory,handmade",
    lead: "A headband made by sewing fabric into a tube and joining the short ends. It's the same idea as a scrunchie, just wider. Knit fabric lets you skip the elastic and rely on the stretch.",
    matNote: "adult headband",
    materials: [
      "Fabric (knit jersey, or woven cotton) — about 50 × 25 cm (20 × 10 in)",
      "Optional: elastic for the back, if using a non-stretch fabric"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line onto the wrong side of the fabric. For knit, place the stretch around the head.",
      "<strong>Cut</strong><br>Cut 1 long strip.",
      "<strong>(Optional) press</strong><br>Press the strip so the long fold is easy to sew accurately."
    ],
    sew: [
      { h: "4-1. Sew the tube", items: [
        "Fold the strip in half lengthwise, right sides together, and sew the long edge to make a tube. Leave the short ends open.",
        "Turn the tube right side out and press with the seam centered at the back."
      ]},
      { h: "4-2. Join the ends", items: [
        "Bring the two short ends together, right sides facing, and sew to form a loop. (For a turban look, cross the two ends before joining.)",
        "Tuck the seam allowance in and close the gap with a few hand stitches."
      ]}
    ],
    tips: [
      "<strong>Knit = no elastic</strong>: jersey stretches enough to stay put without elastic.",
      "<strong>Non-stretch fabric</strong>: add a short length of elastic at the back so it fits snugly.",
      "<strong>Turban style</strong>: cross the ends before joining for a twisted front."
    ]
  },

  sacoche: {
    title: "Sacoche",
    tab: "bag",
    toolName: "Sacoche",
    sizeStep: "Enter the finished width and height (and the shoulder strap length).",
    desc: "How to sew a flat crossbody sacoche by joining a front and back. A light, simple shoulder bag for phone, wallet and keys. Close with a zipper or magnetic snap.",
    keywords: "sacoche,crossbody bag,how to sew,sewing pattern,shoulder bag,handmade",
    lead: "A simple flat shoulder bag (sacoche): sew the front and back together and add a strap. Light and quick — perfect for a phone, wallet and keys. Close the top with a zipper or a magnetic snap.",
    matNote: "phone-and-wallet size",
    materials: [
      "Main fabric (nylon, canvas or cotton) — about 30 × 50 cm (12 × 20 in)",
      "Strap webbing or fabric — about 4 × 120 cm (1.5 × 47 in)",
      "1 zipper or a magnetic snap for the closure"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric.",
      "<strong>Cut</strong><br>Cut 2 (front and back). Cut a strap, or use ready-made webbing.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the side and bottom edges to stop fraying."
    ],
    sew: [
      { h: "4-1. Add the closure", items: [
        "If using a zipper, attach it across the top edges of the front and back as for a zipper pouch. For a magnetic snap, fix the two halves to the facings before assembling.",
        "<b>If using a zipper, open it halfway</b> so you can turn the bag later."
      ]},
      { h: "4-2. Attach the strap", items: [
        "Pin the strap ends to the top side seams (between front and back), right sides together, so the strap hangs inside.",
        "Make sure the strap is not twisted."
      ]},
      { h: "4-3. Sew the bag", items: [
        "Place front and back right sides together and sew the two sides and the bottom, catching the strap ends in the side seams.",
        "Trim the corners, turn right side out (through the open zipper), and push the corners out. Press."
      ]}
    ],
    tips: [
      "<strong>Adjustable strap</strong>: add a slider buckle to change the length.",
      "<strong>Inside pocket</strong>: sew a patch pocket to the lining or back before assembling.",
      "<strong>Water-resistant</strong>: use nylon or laminated fabric for an outdoor-friendly bag."
    ]
  },

  skirt: {
    title: "A-line skirt",
    tab: "human",
    toolName: "A-line skirt",
    sizeStep: "Enter your waist, hip, skirt length and hem flare. Presets cover S–XL.",
    desc: "How to sew a simple elastic-waist A-line skirt. Two pieces, sew the sides, make an elastic casing and hem. A great first garment in your own size.",
    keywords: "A-line skirt,elastic waist,how to sew,sewing pattern,beginner skirt,handmade",
    lead: "A simple A-line skirt with an elastic waist: two pieces cut on the fold, sewn at the sides, with an elastic casing at the top. A great first garment — and you can make it in your exact size.",
    matNote: "adult skirt",
    materials: [
      "Fabric (medium cotton or linen) — about 110 cm wide × (skirt length + 15 cm)",
      "Waist elastic (2–3 cm / 3/4–1 in wide) — your waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric. Align the grain with the grainline.",
      "<strong>Cut</strong><br>Cut the front and back each on the fold (2 pieces total).",
      "<strong>Finish the edges</strong><br>Zigzag or serge the side and hem edges so they don't fray."
    ],
    sew: [
      { h: "4-1. Sew the sides", items: [
        "Place the front and back right sides together and sew both side seams.",
        "Press the seam allowances open and finish the edges."
      ]},
      { h: "4-2. Make the waist casing", items: [
        "Fold the waist under by the seam allowance, then fold again by the elastic width plus a little ease (e.g. about 3.5 cm for 3 cm elastic); press.",
        "Stitch close to the lower fold all the way around, leaving a 2–3 cm gap as the elastic opening."
      ]},
      { h: "4-3. Thread the elastic", items: [
        "Thread the elastic through the casing with a bodkin or safety pin.",
        "Fit it to your waist, overlap the ends and sew them together, then close the opening."
      ]},
      { h: "4-4. Hem", items: [
        "Fold the hem under twice, press and topstitch all the way around.",
        "Give it a final press and you're done."
      ]}
    ],
    tips: [
      "<strong>More or less flare</strong>: increase the hem flare value for a fuller A-line.",
      "<strong>Length</strong>: adjust the skirt length for mini, knee or midi.",
      "<strong>Pockets</strong>: add in-seam pockets at the side seams before sewing them."
    ]
  },

  gather: {
    title: "Kids' gathered skirt",
    tab: "kids",
    toolName: "Kids' gathered skirt",
    sizeStep: "Enter the waist, skirt length and gather ratio. A higher ratio = fuller gathers.",
    desc: "How to sew the easiest gathered elastic-waist skirt. Straight rectangles, side seams, an elastic casing and a hem. The gather ratio sets the fullness.",
    keywords: "gathered skirt,elastic waist,how to sew,sewing pattern,easy skirt,kids,handmade",
    lead: "The easiest gathered skirt: two near-rectangular pieces, sewn at the sides, with an elastic waist that gathers the fullness. The gather ratio sets how full it looks. Perfect for kids or a simple adult skirt.",
    matNote: "child skirt",
    materials: [
      "Fabric (light–medium cotton, linen or double gauze) — about 110 cm wide × (skirt length + 10 cm)",
      "Waist elastic (2–3 cm / 3/4–1 in wide) — the waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric. Align the grain with the grainline.",
      "<strong>Cut</strong><br>Cut the front and back each on the fold (2 pieces). You can also cut a single loop piece.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the side and hem edges so they don't fray."
    ],
    sew: [
      { h: "4-1. Sew the sides", items: [
        "Place the front and back right sides together and sew both side seams.",
        "Press the seam allowances open and finish the edges."
      ]},
      { h: "4-2. Make the waist casing", items: [
        "Fold the waist under by the seam allowance, then again by the elastic width plus ease; press.",
        "Stitch close to the lower fold all the way around, leaving a 2–3 cm elastic opening."
      ]},
      { h: "4-3. Thread the elastic", items: [
        "Thread the elastic, fit it to the waist, overlap and sew the ends, then close the opening.",
        "Distribute the gathers evenly around the waist."
      ]},
      { h: "4-4. Hem", items: [
        "Fold the hem under twice and topstitch — it's a straight edge, so it's easy.",
        "Press to finish."
      ]}
    ],
    tips: [
      "<strong>Fuller skirt</strong>: increase the gather ratio for more volume.",
      "<strong>Tiered look</strong>: add a second gathered tier at the hem.",
      "<strong>Soft fabric</strong>: double gauze and lawn gather beautifully."
    ]
  },

  apron: {
    title: "Apron",
    tab: "human",
    toolName: "Apron",
    sizeStep: "Enter the chest width, apron length, hem width and the tie lengths. Presets cover common sizes.",
    desc: "How to sew a simple trapezoid apron with waist and neck ties. Hem the edges, make the ties, attach them, and add a pocket if you like.",
    keywords: "apron,how to sew,sewing pattern,half apron,kitchen,handmade,ties",
    lead: "A simple apron: a trapezoid body with two waist ties and one neck tie. Hem the edges, make and attach the ties, and add a pocket if you like. Sturdy fabric works best.",
    matNote: "adult apron",
    materials: [
      "Main fabric (heavy cotton, linen or canvas) — about 90 × 100 cm (35 × 40 in)",
      "Fabric for the ties (self fabric is fine) — from the leftovers",
      "Optional: fabric for a pocket"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric.",
      "<strong>Cut</strong><br>Cut 1 body (trapezoid), 2 waist ties and 1 neck tie. The waist-tie positions are shown as dashed lines.",
      "<strong>Finish the edges</strong><br>Zigzag or serge edges that fray before hemming."
    ],
    sew: [
      { h: "4-1. Hem the body edges", items: [
        "Double-fold and press the top edge, the two angled sides and the hem, then topstitch all the way around.",
        "On the angled sides and corners, a narrower fold turns more neatly."
      ]},
      { h: "4-2. Make the ties", items: [
        "Fold each tie in half lengthwise, right sides together, sew the long edge and turn right side out (or fold in quarters and edgestitch).",
        "Press flat and edgestitch."
      ]},
      { h: "4-3. Attach the ties", items: [
        "Stitch the waist ties firmly at the marked positions (a box with an X inside is strong).",
        "Attach the ends of the neck tie to the top corners the same way."
      ]},
      { h: "4-4. Add a pocket (optional)", items: [
        "Fold the pocket edges under, topstitch the opening, then stitch it to the body where you like.",
        "Give it a final press."
      ]}
    ],
    tips: [
      "<strong>Adjustable neck</strong>: add a slider or a button loop to the neck tie.",
      "<strong>Cafe apron</strong>: skip the bib and neck tie for a waist-only apron.",
      "<strong>Sturdy ties</strong>: webbing makes quick, strong ties."
    ]
  },

  mask: {
    title: "Pleated mask",
    tab: "small",
    toolName: "Pleated mask",
    sizeStep: "Enter the width (unfolded) and height. Presets cover adult and child sizes.",
    desc: "How to sew a simple pleated face mask. Sew the outer and lining, fold three pleats, and make elastic casings at the sides. A quick beginner project.",
    keywords: "pleated mask,face mask,how to sew,sewing pattern,double gauze,handmade",
    lead: "A flat mask with three pleats. Sew the outer and lining together, fold the pleats, and make casings at the sides for the ear elastic. A quick, beginner-friendly project.",
    matNote: "one mask",
    materials: [
      "Outer fabric (double gauze or sheeting) — about 20 cm (8 in) square",
      "Lining (soft double gauze) — about the same",
      "Mask elastic — about 30 cm (12 in), two pieces"
    ],
    cut: [
      "<strong>Cut 2</strong><br>Cut one outer and one lining from the pattern.",
      "<strong>Mark the pleats</strong><br>Mark the dashed pleat folds at the edges so they're easy to fold later."
    ],
    sew: [
      { h: "4-1. Sew outer and lining", items: [
        "Place the outer and lining right sides together and sew the top and bottom (long) edges.",
        "Turn right side out and topstitch along the top and bottom."
      ]},
      { h: "4-2. Fold the pleats", items: [
        "Fold the three pleats in the same direction (downward) using the marks, and pin.",
        "Baste the left and right edges to hold the pleats."
      ]},
      { h: "4-3. Make the elastic casings", items: [
        "Fold each side edge under twice and stitch to form a channel.",
        "Thread the elastic through, tie the ends, and hide the knot inside the casing."
      ]}
    ],
    tips: [
      "<strong>Nose fit</strong>: insert a nose wire in the top edge before topstitching.",
      "<strong>Filter pocket</strong>: leave a gap in the lining seam to insert a filter.",
      "<strong>Adjustable</strong>: use adjustable cord stoppers on the elastic."
    ]
  },

  pants: {
    title: "Kids' pants",
    tab: "kids",
    toolName: "Kids' pants",
    sizeStep: "Enter the rise, inseam, waist and hip. Presets cover heights 80–130 cm and adult M.",
    desc: "How to sew simple elastic-waist pants. Front and back use the same pattern: sew the center seams, then the sides and inseam, add an elastic waist and hem. The only curve is the crotch.",
    keywords: "elastic waist pants,how to sew,sewing pattern,kids pants,easy pants,handmade",
    lead: "Relaxed pull-on pants. The front and back use the same pattern: sew the center (crotch) seams, sew the sides and inseam, fold the waist for elastic, and hem. The only curve is the crotch, so it's one of the easier garments to make.",
    matNote: "child / adult M",
    materials: [
      "Fabric (light–medium cotton, linen or knit) — about 110 cm wide × (rise + inseam + 15 cm) × 2",
      "Waist elastic (2–3 cm / 3/4–1 in wide) — the waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric. Align the grain with the grainline.",
      "<strong>Cut</strong><br>Using the same pattern for front and back, cut 2 of each (4 pieces). The right edge is the crotch curve (center-seam side).",
      "<strong>Finish the edges</strong><br>Zigzag or serge the edges so they don't fray."
    ],
    sew: [
      { h: "4-1. Sew the center seams", items: [
        "Place the two front pieces right sides together and sew the crotch (center) curve.",
        "Do the same with the two back pieces."
      ]},
      { h: "4-2. Sew the sides and inseam", items: [
        "Open the front and back out and place them right sides together.",
        "Sew each side seam.",
        "Sew the inseam in one pass, from one hem all the way to the other."
      ]},
      { h: "4-3. Make the elastic waist", items: [
        "Fold the waist under by the seam allowance, then again by the elastic width plus ease; stitch around, leaving an elastic opening.",
        "Thread the elastic, fit it to the waist, sew the ends and close the opening."
      ]},
      { h: "4-4. Hem", items: [
        "Fold each leg hem under twice and topstitch.",
        "Press to finish."
      ]}
    ],
    tips: [
      "<strong>Shorts</strong>: shorten the inseam for shorts.",
      "<strong>Knit fabric</strong>: use a stretch/zigzag stitch for joggers.",
      "<strong>Pockets</strong>: add patch or in-seam pockets before closing the sides."
    ]
  },

  kidstee: {
    title: "Kids' T-shirt",
    tab: "kids",
    toolName: "Kids' T-shirt",
    sizeStep: "Start from a height preset (80–130 cm), then fine-tune chest, length, sleeve and neckline.",
    desc: "How to sew a kids' drop-shoulder T-shirt from knit fabric. Front and back bodice plus sleeves, with a ribbing neckband. Quick to make each season as they grow.",
    keywords: "kids t-shirt,knit,how to sew,sewing pattern,childrens clothes,handmade",
    lead: "The same relaxed drop-shoulder box tee as the adult version, sized for kids. Just a front and back bodice plus sleeves, with a knit neckband — quick to remake each season as they grow.",
    matNote: "child, by height",
    materials: [
      "Knit fabric (jersey, interlock) — about 100 cm wide × 50–70 cm",
      "Ribbing or self fabric for the neckband",
      "Ballpoint/stretch machine needle and stretch or zigzag stitch"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric. Align the grain; the stretchiest direction usually goes around the body.",
      "<strong>Cut</strong><br>Cut the front and back each on the fold, and 2 sleeves. Use plenty of pins — knits shift easily.",
      "<strong>Use a stretch stitch</strong><br>Sew with a narrow zigzag, stretch stitch or serger."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Place front and back right sides together and sew both shoulder seams. Stay tape steadies the seam."
      ]},
      { h: "4-2. Add the neckband", items: [
        "Cut a neckband about 0.8–0.85× the neckline length and join it into a loop.",
        "Fold it in half, pin to the neckline and sew all around while gently stretching the band to fit.",
        "Press the seam allowance toward the body and topstitch."
      ]},
      { h: "4-3. Set in the sleeves", items: [
        "Match the sleeve notch to the shoulder seam and sew each sleeve to the armhole, right sides together (you can do this flat)."
      ]},
      { h: "4-4. Sew the sides and underarms", items: [
        "Sew each side from the hem up to the sleeve cuff in one pass, matching the underarm seams."
      ]},
      { h: "4-5. Hem the bottom and cuffs", items: [
        "Turn the hem and cuffs under and topstitch with a stretch stitch.",
        "Press to finish."
      ]}
    ],
    tips: [
      "<strong>No serger?</strong> A narrow zigzag works; don't pull the fabric as you sew.",
      "<strong>Grow with them</strong>: add length and longer sleeves for next season.",
      "<strong>Contrast neckband</strong>: a different color band makes a fun accent."
    ]
  },

  pouchgusset: {
    title: "Pouch (gusseted)",
    tab: "bag",
    toolName: "Pouch (gusseted)",
    sizeStep: "Enter the finished width, height and gusset (base depth).",
    desc: "How to sew a boxed/gusseted zipper pouch. Make a flat zipper pouch, then pinch and sew the base corners to add depth. Roomier than a flat pouch.",
    keywords: "gusseted pouch,boxed pouch,zipper pouch,how to sew,cosmetic bag,handmade",
    lead: "A roomy zipper pouch with a gusset, made by pinching and sewing the base corners. If you can make a flat zipper pouch, one extra step gives you a lot more capacity — great for cosmetics or pens.",
    matNote: "cosmetic-bag size",
    materials: [
      "Main fabric — about 30 × 40 cm (12 × 16 in)",
      "Lining — same as the main fabric",
      "1 zipper, roughly the finished width",
      "Optional: fusible interfacing"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric.",
      "<strong>Cut</strong><br>Cut 2 main and 2 lining. The pattern shows a dashed gusset line a little above the base.",
      "<strong>Finish the edges</strong><br>Zigzag or serge edges that fray."
    ],
    sew: [
      { h: "4-1. Attach the zipper", items: [
        "As for a flat zipper pouch, sandwich the zipper between the main and lining at the top edge and sew; topstitch alongside the zipper."
      ]},
      { h: "4-2. Sew around", items: [
        "<b>Open the zipper halfway.</b> With main-to-main and lining-to-lining, right sides together, sew all the way around, leaving a turning gap in the lining."
      ]},
      { h: "4-3. Box the corners", items: [
        "At each base corner, open it into a triangle so the side and base seams line up.",
        "Sew straight across at the gusset line. Do all four corners (main and lining).",
        "Trim each triangle tip leaving 1 cm.",
        "Turn right side out through the zipper and the gap, close the gap, and shape it."
      ]}
    ],
    tips: [
      "<strong>Hold its shape</strong>: add fusible interfacing to the main fabric.",
      "<strong>Deeper pouch</strong>: a larger gusset value adds capacity.",
      "<strong>Easy grab</strong>: catch a fabric tab by the zipper end."
    ]
  },

  tissuecase: {
    title: "Tissue case",
    tab: "small",
    toolName: "Tissue case",
    sizeStep: "Enter the tissue width, tissue height and the insertion (overlap) allowance.",
    desc: "How to sew a pocket-tissue case from a single piece of fabric. Hem the openings, fold so they overlap, and sew the two sides. Straight stitching only — about 10 minutes.",
    keywords: "tissue case,tissue cover,how to sew,sewing pattern,scrap fabric,beginner,handmade",
    lead: "A pocket-tissue cover from a single piece of fabric. Hem the two openings, fold so they overlap at the center, and sew the two sides. Straight stitching only — a great first project and a good use of scraps.",
    matNote: "one case",
    materials: [
      "Fabric — about 15 × 25 cm (6 × 10 in)",
      "A pack of pocket tissues"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric.",
      "<strong>Cut</strong><br>Cut one tall rectangle. The pattern shows the top/bottom hem folds and the center assembly fold as dashed lines.",
      "<strong>Finish the edges</strong><br>Zigzag the side edges if the fabric frays."
    ],
    sew: [
      { h: "4-1. Hem the openings", items: [
        "Fold the top and bottom edges under (double-fold) and topstitch — these become the opening edges."
      ]},
      { h: "4-2. Fold and sew the sides", items: [
        "With the right side up, fold the top and bottom toward the center so the hemmed edges overlap (right sides together).",
        "Pin, then sew the two side seams.",
        "Turn right side out through the center opening and press. Pop in a pack of tissues."
      ]}
    ],
    tips: [
      "<strong>Lined / reversible</strong>: use a second fabric so the inside shows a contrast.",
      "<strong>Add a loop</strong>: catch a ribbon loop in a side seam to clip it to a bag.",
      "<strong>Make a batch</strong>: they sew up fast and make nice little gifts."
    ]
  },

  cushioncover: {
    title: "Cushion cover (envelope)",
    tab: "home",
    toolName: "Cushion cover (envelope)",
    sizeStep: "Enter the cushion width, height and the back overlap. Presets cover common sizes.",
    desc: "How to sew an envelope cushion cover with no zipper. One front piece and two overlapping back pieces. A simple, beginner-friendly home project.",
    keywords: "cushion cover,envelope cushion,pillow cover,no zipper,how to sew,sewing pattern,handmade",
    lead: "An envelope cushion cover that needs no zipper. One front piece and two back pieces that overlap at the opening. A simple, satisfying home project for sturdy fabric like cotton, linen or canvas.",
    matNote: "one cover",
    materials: [
      "Outer fabric (cotton, linen or canvas) — about 110 cm wide × 60 cm",
      "Back fabric (same fabric is fine) — about 110 cm wide × 80 cm",
      "A cushion insert"
    ],
    cut: [
      "<strong>Cut the front</strong><br>Cut 1 front: the cushion width × height plus seam allowance.",
      "<strong>Cut the back</strong><br>Cut 2 backs from the (shorter) back pattern.",
      "<strong>Finish the opening edges</strong><br>Finish all seam-allowance edges, and especially the back opening edges (one short edge of each back piece)."
    ],
    sew: [
      { h: "4-1. Hem the back opening edges", items: [
        "Double-fold and press the inner (opening) edge of each back piece.",
        "Topstitch about 2 mm from the fold."
      ]},
      { h: "4-2. Overlap the back pieces", items: [
        "Lay the two back pieces right side up, overlapping the hemmed edges by the overlap amount.",
        "Pin, and baste the overlap to make it easier to sew."
      ]},
      { h: "4-3. Sew front and back together", items: [
        "Lay the front right side down, then the overlapped backs right side up on top (right sides together).",
        "Sew all four sides.",
        "Trim the corners diagonally to reduce bulk."
      ]},
      { h: "4-4. Turn and finish", items: [
        "Turn right side out through the back opening.",
        "Push the corners out, press, and topstitch the edges if you like. Insert the cushion."
      ]}
    ],
    tips: [
      "<strong>Snug fit</strong>: make the cover ~1 cm smaller than the insert for a plump look.",
      "<strong>Bigger overlap</strong>: a larger overlap keeps the insert hidden.",
      "<strong>Piping</strong>: add piping in the seam for a tailored finish."
    ]
  },

  dog: {
    title: "Dog clothes (tank top)",
    tab: "pet",
    toolName: "Dog clothes (tank top)",
    sizeStep: "Enter the chest girth, back length, neck and front-leg opening. Baste first and adjust to your dog.",
    desc: "How to sew a sleeveless tube tank for a dog. Sew a back panel and a belly panel at the sides, leaving the front-leg openings. Baste first — dogs vary a lot in shape.",
    keywords: "dog clothes,dog tank,pet clothes,how to sew,sewing pattern,handmade",
    lead: "A sleeveless tube tank made from a back panel and a belly panel sewn at the sides, with the front-leg openings left in the side seams. Dogs vary a lot in shape, so basting first and fitting to your dog is the key to success.",
    matNote: "small–medium dog",
    materials: [
      "Knit fabric (jersey, interlock — something with stretch) — about 50 × 70 cm",
      "Ballpoint/stretch machine needle and stretch or zigzag stitch",
      "Optional: ribbing for the neckline and leg openings"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side of the fabric. Align the grain with the grainline.",
      "<strong>Cut</strong><br>Cut the back panel and belly panel each on the fold (1 of each). Mark the two front-leg notches.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the edges so they don't fray."
    ],
    sew: [
      { h: "4-1. Baste and check the fit", items: [
        "First baste the side seams of the back and belly panels with a long stitch and try it on your dog.",
        "If it's tight or loose, adjust at the side seam allowance."
      ]},
      { h: "4-2. Sew the sides", items: [
        "Place the back and belly panels right sides together and sew the sides, leaving the front-leg openings (between the notches) unsewn."
      ]},
      { h: "4-3. Finish the neck, leg openings and hem", items: [
        "Turn the neckline, front-leg openings and hem under and finish with a stretch stitch.",
        "To use ribbing, join it into a loop and sew it to each opening.",
        "Try it on again — if it fits, you're done."
      ]}
    ],
    tips: [
      "<strong>Baste first, always</strong>: dog body shapes vary a lot; check before final stitching.",
      "<strong>Snug but comfy</strong>: knit should hug without restricting movement.",
      "<strong>Add a sleeve later</strong>: once the tank fits, you can add front-leg sleeves."
    ]
  },

  tablecloth: {
    title: "Tablecloth",
    tab: "home",
    toolName: "Tablecloth",
    sizeStep: "Enter your table width, table length and the overhang (drop). The tool adds the rest.",
    desc: "How to sew a simple single-layer tablecloth. Enter your table size and drop, then triple-fold hem all four sides. Easy, straight stitching only.",
    keywords: "tablecloth,how to sew,sewing pattern,table linen,hem,beginner,handmade",
    lead: "Just enter your table size and how far you want it to drop, and the tool gives you the fabric size. Then it's a single-layer cloth — triple-fold hem the four sides. Straight stitching only.",
    matNote: "any table",
    materials: [
      "Fabric (cotton, linen or polyester) — table size + overhang × 2 + seam allowance"
    ],
    cut: [
      "<strong>Prewash / straighten the grain</strong><br>If the fabric may shrink, prewash and press before cutting.",
      "<strong>Cut to size</strong><br>Cut the fabric to the calculated size, keeping the corners square. A long or L-square ruler helps.",
      "<strong>Edges</strong><br>A triple-fold hem needs no special finishing, but zigzag the edges if you won't sew right away."
    ],
    sew: [
      { h: "4-1. Deal with the corners", items: [
        "Mitre the corners (a diagonal fold) or simply fold them in. Mitred corners give the cleanest finish."
      ]},
      { h: "4-2. Hem the short sides", items: [
        "Triple-fold the two short edges and press (a 1 cm → 1 cm double fold is standard).",
        "Topstitch about 2 mm from the fold."
      ]},
      { h: "4-3. Hem the long sides", items: [
        "Triple-fold and press the two long edges the same way.",
        "Topstitch about 2 mm from the fold."
      ]}
    ],
    tips: [
      "<strong>Round corners</strong>: round the corners for a softer look that's easy to hem.",
      "<strong>Bigger drop</strong>: increase the overhang for a more formal look.",
      "<strong>Wipe-clean</strong>: laminated cotton makes a practical everyday cloth."
    ]
  },

  pillowcase: {
    title: "Pillowcase (envelope)",
    tab: "home",
    toolName: "Pillowcase (envelope)",
    sizeStep: "Enter the pillow width, height and the back overlap. Presets cover common sizes.",
    desc: "How to sew an envelope pillowcase with no zipper. One front piece and two overlapping back pieces. A simple, beginner-friendly project for soft fabric.",
    keywords: "pillowcase,envelope pillowcase,no zipper,how to sew,sewing pattern,handmade",
    lead: "An envelope pillowcase that needs no zipper. One front piece and two back pieces that overlap at the opening. Best in soft, skin-friendly fabric like cotton, double gauze or linen.",
    matNote: "one pillowcase",
    materials: [
      "Front fabric (cotton, double gauze or linen) — about 110 cm wide × 70 cm",
      "Back fabric (same fabric is fine) — about 110 cm wide × 100 cm"
    ],
    cut: [
      "<strong>Cut the front</strong><br>Cut 1 front: the pillow width × height plus seam allowance.",
      "<strong>Cut the back</strong><br>Cut 2 backs from the (shorter) back pattern.",
      "<strong>Finish the opening edges</strong><br>Finish all edges, and especially the back opening edge (one short edge of each back piece)."
    ],
    sew: [
      { h: "4-1. Hem the back opening edges", items: [
        "Double-fold and press the inner (opening) edge of each back piece.",
        "Topstitch about 2 mm from the fold."
      ]},
      { h: "4-2. Overlap the back pieces", items: [
        "Lay the two backs right side up, overlapping the hemmed edges by the overlap amount, and baste."
      ]},
      { h: "4-3. Sew front and back together", items: [
        "Lay the front right side down, then the overlapped backs right side up on top (right sides together).",
        "Sew all four sides and trim the corners diagonally."
      ]},
      { h: "4-4. Turn and finish", items: [
        "Turn right side out through the back opening, push out the corners and press.",
        "Topstitch the edges if you like, then insert the pillow."
      ]}
    ],
    tips: [
      "<strong>Soft on skin</strong>: double gauze and washed linen feel lovely for sleeping.",
      "<strong>Bigger overlap</strong>: a larger overlap keeps the pillow hidden.",
      "<strong>Matching set</strong>: make a cushion cover from the same fabric."
    ]
  },

  tunic: {
    title: "Tunic",
    tab: "human",
    toolName: "Tunic",
    sizeStep: "Enter bust, shoulder, length and sleeve length. Make the length and sleeves longer than a tee.",
    desc: "How to sew a relaxed drop-shoulder tunic. The same pattern as the T-shirt with a longer body and sleeves. Front and back bodice plus sleeves.",
    keywords: "tunic,drop shoulder,how to sew,sewing pattern,double gauze,linen,handmade",
    lead: "A relaxed long top that covers to above the knee. It's the same drop-shoulder draft as the T-shirt — just longer in the body and sleeves. If you can sew a tee, you can sew this.",
    matNote: "adult M",
    materials: [
      "Fabric (double gauze, linen, or jersey/interlock knit) — about 150 cm wide × 180 cm",
      "Bias binding or ribbing for the neckline — the neckline length"
    ],
    cut: [
      "<strong>Front and back</strong><br>Place the center edge on the fold and cut one of each, for symmetrical pieces.",
      "<strong>Sleeves</strong><br>Cut 2 sleeves and mark the sleeve-cap notch.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the seam-allowance edges."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Place front and back right sides together and sew the straight shoulder seams; press toward the back."
      ]},
      { h: "4-2. Finish the neckline", items: [
        "Cut bias binding or ribbing to about 90% of the neckline length and join into a loop.",
        "Sew it on, gently stretching to fit, then press the seam toward the body."
      ]},
      { h: "4-3. Set in the sleeves", items: [
        "Match the sleeve-cap notch to the shoulder seam, pin and sew, clipping the curve before pressing toward the body."
      ]},
      { h: "4-4. Sew underarms and sides", items: [
        "Sew each sleeve underarm and side in one continuous line from cuff to hem.",
        "Press the seams."
      ]},
      { h: "4-5. Hem the bottom and cuffs", items: [
        "Double-fold and press the hem and cuffs, then topstitch 2–3 mm from the edge."
      ]}
    ],
    tips: [
      "<strong>Woven or knit</strong>: double gauze and linen give a soft drape; knit makes a cozy version.",
      "<strong>Sleeve length</strong>: anywhere from three-quarter to full.",
      "<strong>Side slits</strong>: leave the lower side seams open for slits."
    ]
  },

  camisole: {
    title: "Camisole",
    tab: "human",
    toolName: "Camisole",
    sizeStep: "Enter bust, length, neckline and the strap width/length. Adjust the straps when worn.",
    desc: "How to sew a simple camisole. Sew the front and back at the sides, bind the neckline and armholes, and add straps. Works in knit, satin or linen.",
    keywords: "camisole,cami,how to sew,sewing pattern,straps,beginner,handmade",
    lead: "A simple camisole: sew the front and back at the sides, finish the neckline and armholes, and add straps. The front has a U neckline and the back a shallow neck. Works in almost any fabric.",
    matNote: "adult cami",
    materials: [
      "Fabric (jersey/interlock knit, satin or linen) — about 110 cm wide × 140 cm",
      "Bias binding or ribbing for the neckline and armholes"
    ],
    cut: [
      "<strong>Front and back</strong><br>Place the center edge on the fold and cut one of each.",
      "<strong>Straps</strong><br>Cut 4 strap pieces (two layers per strap).",
      "<strong>Finish the edges</strong><br>Zigzag or serge the seam-allowance edges."
    ],
    sew: [
      { h: "4-1. Sew the sides", items: [
        "Place front and back right sides together and sew both side seams; press."
      ]},
      { h: "4-2. Finish neckline and armholes", items: [
        "Bind the neckline and armhole (side) edges with bias binding, or roll a narrow hem and topstitch."
      ]},
      { h: "4-3. Make the straps", items: [
        "Sew each pair of strap pieces right sides together along the long edge, turn and press. Make two straps."
      ]},
      { h: "4-4. Attach the straps", items: [
        "Try the top on to set the strap length, then sew the straps to the front neckline and back top.",
        "Baste and check the position before final stitching."
      ]},
      { h: "4-5. Hem the bottom", items: [
        "Double-fold and press the hem and topstitch 2–3 mm from the edge."
      ]}
    ],
    tips: [
      "<strong>Layering piece</strong>: make it in jersey to wear under sheer tops.",
      "<strong>Adjustable straps</strong>: add sliders for adjustable length.",
      "<strong>Dressy version</strong>: satin or cupro makes an elegant cami."
    ]
  },

  shoesbag: {
    title: "Shoe bag",
    tab: "small",
    toolName: "Shoe bag",
    sizeStep: "Enter the finished width, height and the handle length. Presets fit indoor shoes.",
    desc: "How to sew a hanging shoe bag with a D-ring handle. The body is cut as one piece on the fold; sandwich the handle and tab, then sew the sides. A school-bag classic.",
    keywords: "shoe bag,indoor shoes bag,D-ring,how to sew,sewing pattern,school,handmade",
    lead: "A shoe bag you can hang by its D-ring handle. The body is cut as one piece with the base on the fold; you fold the opening, sandwich the handle and tab, and sew the sides. A back-to-school staple.",
    matNote: "indoor-shoes size",
    materials: [
      "Fabric (quilted or oxford, medium/heavy weight) — about 110 cm wide × 40 cm",
      "1 D-ring (25 mm inner width)",
      "Handle: self fabric or webbing"
    ],
    cut: [
      "<strong>Cut the body</strong><br>Fold the fabric right sides together and cut the body as one piece with the base fold on the fold.",
      "<strong>Cut the handle and tab</strong><br>Cut 1 handle and 1 D-ring tab.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the side edges."
    ],
    sew: [
      { h: "4-1. Make the handle and tab", items: [
        "Fold the handle and tab in quarters and edgestitch both sides.",
        "Thread the tab through the D-ring and fold it in half."
      ]},
      { h: "4-2. Fold the opening and add the handle", items: [
        "Double-fold the bag opening (top edge).",
        "Tuck the handle ends and the D-ring tab into the opening and topstitch all around."
      ]},
      { h: "4-3. Sew the sides", items: [
        "Fold the body right sides together and sew both sides.",
        "Finish the seam allowances with zigzag or bias."
      ]},
      { h: "4-4. Finish", items: [
        "Turn right side out, push the corners out and press."
      ]}
    ],
    tips: [
      "<strong>Sturdier bag</strong>: quilted fabric protects shoes and holds its shape.",
      "<strong>Boxed base</strong>: box the corners for a wider bag.",
      "<strong>Name tag</strong>: add a label or initials for school."
    ]
  },

  gymbag: {
    title: "Gym bag (drawstring backpack)",
    tab: "small",
    toolName: "Gym bag (drawstring backpack)",
    sizeStep: "Enter the finished width, height and the casing drop. Presets fit gym clothes.",
    desc: "How to sew a drawstring bag that doubles as a backpack. Thread the cords through loops at the base corners to carry it on your back. A school classic.",
    keywords: "gym bag,drawstring backpack,cinch bag,how to sew,sewing pattern,school,handmade",
    lead: "The classic top-cinching drawstring bag. Thread the cords through loops at the bottom corners and it becomes a drawstring backpack. Great for gym clothes or a change of clothes.",
    matNote: "gym-clothes size",
    materials: [
      "Fabric (nylon, cotton oxford or sheeting) — about 110 cm wide × 50 cm",
      "Acrylic cord (5–6 mm) — about 2 m (use two cords)"
    ],
    cut: [
      "<strong>Fold and cut</strong><br>Fold the fabric right sides together and cut the body as one piece with the base on the fold.",
      "<strong>Mark the notches</strong><br>Mark the bottom-corner notches (where the cord loops go).",
      "<strong>Finish the edges</strong><br>Zigzag or serge the side edges."
    ],
    sew: [
      { h: "4-1. Make the cord loops (for backpack use)", items: [
        "Make two small loops from fabric or cord and baste them at the two bottom corners."
      ]},
      { h: "4-2. Sew the sides", items: [
        "Sew both sides from below the drawstring opening (dashed line) down to the base.",
        "Leave the casing opening unsewn and finish those seam allowances neatly."
      ]},
      { h: "4-3. Make the drawstring casing", items: [
        "Fold the top under by the seam allowance, then by the casing drop, and topstitch all around."
      ]},
      { h: "4-4. Thread the cords", items: [
        "Thread one cord from each side and tie each into a loop.",
        "For backpack use, pass the cord ends through the bottom loops and knot."
      ]}
    ],
    tips: [
      "<strong>Water-resistant</strong>: nylon makes a light, wipeable bag.",
      "<strong>Reinforce corners</strong>: backstitch where the cords pull at the base.",
      "<strong>Lined version</strong>: add a lining for a tidier inside."
    ]
  },

  bloomers: {
    title: "Bloomers",
    tab: "baby",
    toolName: "Bloomers",
    sizeStep: "Enter the rise, inseam, waist and leg opening. Shorter and roomier = a rounder shape.",
    desc: "How to sew puffy baby bloomers with elastic at the waist and legs. Four pieces from one pattern; mostly straight stitching. A great first baby garment.",
    keywords: "bloomers,baby bloomers,pumpkin pants,how to sew,sewing pattern,elastic,handmade",
    lead: "Round, puffy bloomers that fit right over a diaper. Four pieces from the same pattern, with elastic at both the waist and the legs. Mostly straight stitching — a lovely first baby garment.",
    matNote: "baby–toddler",
    materials: [
      "Fabric (soft double gauze, light cotton or jersey) — about 110 cm wide × 40 cm",
      "Waist elastic (1–1.5 cm) — the waist measurement",
      "Leg elastic (0.6–1 cm) — thigh circumference × 2"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>The right curve is the crotch, the left straight edge is the side.",
      "<strong>Cut 4</strong><br>Cut 2 mirror pairs (4 pieces) from the same pattern. Mark the crotch notches.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the edges so they don't fray."
    ],
    sew: [
      { h: "4-1. Sew the center (crotch) seams", items: [
        "Place a left and right piece right sides together and sew the crotch curve; do this for the front pair and the back pair.",
        "Clip the curve so it opens smoothly when turned."
      ]},
      { h: "4-2. Sew the inseam", items: [
        "Open the front and back out, place right sides together, and sew the inseam in one pass."
      ]},
      { h: "4-3. Sew the sides", items: [
        "Sew the side seams right sides together and press."
      ]},
      { h: "4-4. Elastic at waist and legs", items: [
        "Make a waist casing (fold by the seam allowance, then the elastic width plus ease) and stitch, leaving an opening.",
        "Make leg casings the same way, one opening per leg.",
        "Thread the waist and leg elastics, fit, sew the ends and close the openings."
      ]}
    ],
    tips: [
      "<strong>Rounder shape</strong>: shorter length and more ease give the pumpkin look.",
      "<strong>Soft elastic</strong>: use gentle elastic on baby legs so it doesn't dig in.",
      "<strong>Grows a little</strong>: a touch of ease lets them wear it longer."
    ]
  },

  bandana: {
    title: "Triangle headscarf",
    tab: "small",
    toolName: "Triangle headscarf",
    sizeStep: "Enter the base and the height. Add elastic to make it pull-on.",
    desc: "How to sew a simple triangle headscarf. Just triple-fold hem the three edges. Run elastic through the base to make a no-tie, pull-on version.",
    keywords: "triangle headscarf,bandana,kerchief,how to sew,sewing pattern,kids,handmade",
    lead: "A triangle headscarf for cooking, chores or play. Just triple-fold hem the three edges. Run elastic through the base edge and it becomes a no-tie, pull-on version.",
    matNote: "child size",
    materials: [
      "Fabric (cotton, oxford or sheeting) — about 60 cm square",
      "Optional: flat elastic (1 cm) — about 20 cm, or fabric for ties"
    ],
    cut: [
      "<strong>Cut 1</strong><br>Cut one triangle from the pattern.",
      "<strong>Edges</strong><br>A triple-fold hem needs no overlocking."
    ],
    sew: [
      { h: "4-1. Hem the two angled sides", items: [
        "Triple-fold and stitch the two angled (short) sides."
      ]},
      { h: "4-2. Hem the base", items: [
        "Triple-fold and stitch the base (long) edge.",
        "For elastic, leave both ends open to make a channel."
      ]},
      { h: "4-3. Add elastic or ties", items: [
        "Thread elastic through the base channel, fit to the head and secure.",
        "For a tie version, sew ties to the two base corners instead."
      ]}
    ],
    tips: [
      "<strong>No-tie</strong>: the elastic version is easy for little ones to put on themselves.",
      "<strong>Reversible</strong>: line it with a second fabric for two looks.",
      "<strong>Matching set</strong>: make one with a matching apron."
    ]
  },

  swaddle: {
    title: "Swaddle (hooded)",
    tab: "baby",
    toolName: "Swaddle (hooded)",
    sizeStep: "Enter the body side length and the hood side. Larger = more wrapping room.",
    desc: "How to sew a hooded baby swaddle. A square body with a triangular hood at one corner. Sew the outer and lining together and turn. Simple and useful.",
    keywords: "swaddle,hooded blanket,baby blanket,how to sew,sewing pattern,handmade,baby gift",
    lead: "Wrap the baby or use it as a stroller blanket. The triangular hood at one corner covers the head. Simple construction: sew the outer and lining together and turn.",
    matNote: "baby swaddle",
    materials: [
      "Outer fabric (double gauze, terry or cotton) — a square of the body side + seam allowance",
      "Lining (same; a contrast is nice) — the same size",
      "Optional: lace, ribbon or a decorative button"
    ],
    cut: [
      "<strong>Cut the body</strong><br>Cut one square each in outer and lining.",
      "<strong>Cut the hood</strong><br>Cut one triangle each in outer and lining.",
      "<strong>Corners</strong><br>Clip the corner seam allowances so they turn out crisply."
    ],
    sew: [
      { h: "4-1. Make the hood", items: [
        "Sew the hood outer and lining right sides together along the long (diagonal) edge, turn and press."
      ]},
      { h: "4-2. Baste the hood to the body", items: [
        "Pin/baste the hood to one corner of the body outer, right sides together, matching the corner."
      ]},
      { h: "4-3. Sew the body and turn", items: [
        "Place the body outer and lining right sides together (hood sandwiched) and sew around, leaving a ~10 cm turning gap.",
        "Trim the corner allowances, turn right side out and shape the corners."
      ]},
      { h: "4-4. Finish", items: [
        "Slip-stitch the gap closed, or topstitch all around to close it.",
        "Press to finish."
      ]}
    ],
    tips: [
      "<strong>Soft and absorbent</strong>: terry on one side makes a cozy blanket.",
      "<strong>Lovely gift</strong>: a contrasting lining and a name make a great baby gift.",
      "<strong>Add a hood point</strong>: a small tassel or ear detail is cute."
    ]
  },

  azuma: {
    title: "Azuma bag (Japanese origami tote)",
    tab: "bag",
    toolName: "Azuma bag (Japanese origami tote)",
    sizeStep: "Enter the base square (the bag scales from it). The fabric is a 1:3 rectangle.",
    desc: "How to sew an azuma bag from one 1:3 rectangle folded in thirds and sewn. It wraps like a furoshiki and ties to adjust. Great as a reusable shopping or bento bag.",
    keywords: "azuma bag,furoshiki bag,reusable bag,how to sew,sewing pattern,eco bag,handmade",
    lead: "Fold a single 1:3 rectangle into thirds and sew two seams — that's the whole bag. It wraps like a furoshiki and the knot adjusts the size. Handy as a bento wrap, reusable shopping bag or spare bag.",
    matNote: "reusable bag",
    materials: [
      "Fabric (cotton, linen or tenugui) — a rectangle 3× the base square by 1×",
      "Tip: a light, soft fabric folds and knots best"
    ],
    cut: [
      "<strong>Cut 1</strong><br>Cut one rectangle from the pattern; mind the print direction.",
      "<strong>Mark the folds</strong><br>Mark the 1/3 and 2/3 fold positions at the edges.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the edges."
    ],
    sew: [
      { h: "4-1. Fold the left third and sew", items: [
        "With the fabric right sides together, fold the left third over the center block.",
        "Sew the overlapped right edge."
      ]},
      { h: "4-2. Fold the right third and sew", items: [
        "Now fold the right third over the center.",
        "Sew the overlapped left edge."
      ]},
      { h: "4-3. Turn and shape", items: [
        "Finish the seam allowances, turn right side out and shape.",
        "The open triangles at the top become the handles you tie."
      ]}
    ],
    tips: [
      "<strong>Reversible</strong>: french seams or a lining make it neat on both sides.",
      "<strong>Bento wrap</strong>: a small one wraps a lunch box; a big one is a shopping bag.",
      "<strong>Packs flat</strong>: it folds tiny to keep in a pocket or bag."
    ]
  },

  sleevedress: {
    title: "Sleeveless dress",
    tab: "human",
    toolName: "Sleeveless dress",
    sizeStep: "Enter bust, waist, hip, bodice length, skirt length and flare. Presets cover S–XL.",
    desc: "How to sew a simple sleeveless A-line dress. A bodice joined to an A-line skirt, with the neckline and armholes bound with bias tape. A great next step after tees and skirts.",
    keywords: "sleeveless dress,a-line dress,how to sew,sewing pattern,summer dress,bias binding,handmade",
    lead: "A simple sleeveless dress: a bodice joined to an A-line skirt, with the neckline and armholes simply bound in bias tape. With no sleeves it's an easy build — a great next step once you're comfortable with tees and skirts.",
    matNote: "adult dress",
    materials: [
      "Fabric (medium cotton, linen or lawn) — about 110 cm wide × (dress length + 30 cm)",
      "Double-fold bias tape (1.1–1.3 cm) — the neckline + armhole length, plus extra (self fabric is fine)"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side; align the grain.",
      "<strong>Cut</strong><br>Cut the front and back bodice each on the fold (1 each), and the front and back skirt each on the fold (2 total).",
      "<strong>Mark notches</strong><br>Mark the waist and armhole notches.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the seam-allowance edges."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Place front and back bodice right sides together and sew the shoulder seams; press open."
      ]},
      { h: "4-2. Bind the neckline and armholes", items: [
        "Sew bias tape to the neckline right sides together, wrap it to the inside and topstitch.",
        "Do the same on both armholes. Binding while flat (before the side seams) is easiest for beginners."
      ]},
      { h: "4-3. Sew the sides", items: [
        "Sew the bodice side seams, continuing neatly from the bound armhole edge; press open."
      ]},
      { h: "4-4. Make the skirt and join it", items: [
        "Sew the skirt side seams and press open.",
        "Match the bodice waist to the skirt waist (aligning side seams and notches) and sew all around.",
        "Press the waist seam toward the bodice."
      ]},
      { h: "4-5. Hem", items: [
        "Double-fold and press the hem, topstitch all around, and give it a final press."
      ]}
    ],
    tips: [
      "<strong>Self-fabric binding</strong>: cut bias strips from the dress fabric for a coordinated finish.",
      "<strong>Pockets</strong>: add in-seam pockets in the skirt side seams.",
      "<strong>Length</strong>: adjust bodice and skirt lengths for your height."
    ]
  },

  flareskirt: {
    title: "Circle skirt",
    tab: "human",
    toolName: "Circle skirt",
    sizeStep: "Enter waist, skirt length and choose full or half circle. Elastic waist.",
    desc: "How to sew a flowing circle (flare) skirt. Cut from a fan-shaped pattern on folded fabric — the circle shape creates the drape, no gathers needed. Elastic waist.",
    keywords: "circle skirt,flare skirt,full circle,half circle,how to sew,sewing pattern,handmade",
    lead: "A flowing circle skirt cut from a fan-shaped pattern. The circular shape itself creates beautiful drape — no darts or gathers. Choose a full circle for maximum flare, or a half circle to use less fabric. Elastic waist for comfort.",
    matNote: "adult skirt",
    materials: [
      "Soft, drapey fabric (cotton, linen, double gauze) — a full circle needs a lot; roughly 110 cm wide × (skirt length + waist radius + 15 cm), about doubled",
      "Waist elastic (2–3 cm wide) — the waist measurement"
    ],
    cut: [
      "<strong>Fold the fabric</strong><br>Fold into quarters for a full circle, or in half for a half circle. Place the two fold edges of the pattern on the fabric folds.",
      "<strong>Trace</strong><br>Trace the inner arc (waist) and outer arc (hem).",
      "<strong>Cut</strong><br>Cut along the fan shape through the folds; it opens into a circle (or half circle).",
      "<strong>Finish the edges</strong><br>Zigzag or serge the cut edges."
    ],
    sew: [
      { h: "4-1. Sew the back seam (half circle only)", items: [
        "For a half circle, sew the straight center-back seam and press open. A full circle has no seam here."
      ]},
      { h: "4-2. Make the waist casing", items: [
        "Fold the waist under by the seam allowance, then by the elastic width plus ease, easing the curve as you fold; press.",
        "Stitch around, leaving a 2–3 cm elastic opening."
      ]},
      { h: "4-3. Thread the elastic", items: [
        "Thread the elastic, fit to the waist, sew the ends and close the opening."
      ]},
      { h: "4-4. Hem", items: [
        "Hang the skirt for a day or two first so the bias settles and the length evens out.",
        "Hem with a narrow fold (0.7–1 cm), easing around the strong curve, then press."
      ]}
    ],
    tips: [
      "<strong>Let it hang</strong>: the bias drops over time — hang before hemming for an even hem.",
      "<strong>Narrow hem</strong>: a rolled or narrow hem handles the curve best.",
      "<strong>Half circle</strong>: choose it to save fabric while keeping plenty of swish."
    ]
  },

  adultgather: {
    title: "Gathered skirt",
    tab: "human",
    toolName: "Gathered skirt",
    sizeStep: "Enter waist, skirt length and gather ratio. A higher ratio = fuller gathers.",
    desc: "How to sew the easiest gathered skirt for adults. Just two rectangles, side seams, an elastic waist and a hem. The gather ratio sets the fullness.",
    keywords: "gathered skirt,elastic waist,easy skirt,how to sew,sewing pattern,beginner,handmade",
    lead: "Sew two rectangles and run elastic through the waist — the easiest skirt there is, and a perfect first sewing project. The gather ratio sets the fabric width and how full it looks.",
    matNote: "adult skirt",
    materials: [
      "Fabric (cotton, linen or lawn) — 110 cm wide × (skirt length + fold-over + 10 cm), two pieces",
      "Waist elastic (2–3 cm wide) — the waist measurement"
    ],
    cut: [
      "<strong>Fold and cut</strong><br>Fold the fabric right sides together and place the pattern's fold edge on the fold.",
      "<strong>Cut 2</strong><br>Cut a front and a back (2 pieces).",
      "<strong>Finish the edges</strong><br>Zigzag or serge the side and hem edges."
    ],
    sew: [
      { h: "4-1. Sew the sides", items: [
        "Sew the front and back right sides together at both sides; press open."
      ]},
      { h: "4-2. Make the waist casing", items: [
        "Fold the waist under by the seam allowance, then by the elastic width plus ease; press.",
        "Stitch around, leaving a 2–3 cm elastic opening."
      ]},
      { h: "4-3. Thread the elastic", items: [
        "Thread the elastic, fit to the waist, sew the ends and close the opening."
      ]},
      { h: "4-4. Hem", items: [
        "Double-fold and topstitch the hem; press to finish."
      ]}
    ],
    tips: [
      "<strong>Fuller skirt</strong>: increase the gather ratio for more volume.",
      "<strong>Soft fabric</strong>: lawn and double gauze gather beautifully.",
      "<strong>Pockets</strong>: add in-seam pockets before sewing the sides."
    ]
  },

  widepants: {
    title: "Wide pants (elastic waist)",
    tab: "human",
    toolName: "Wide pants (elastic waist)",
    sizeStep: "Enter the rise, inseam, waist and hip. Baste the crotch curve to check the fit.",
    desc: "How to sew relaxed wide-leg elastic-waist pants. Front and back use the same pattern: sew the crotch seams, inseam and sides, then an elastic waist and hem.",
    keywords: "wide pants,palazzo pants,elastic waist,how to sew,sewing pattern,linen pants,handmade",
    lead: "Easy, relaxed wide-leg pants with an elastic waist. The front and back use the same pattern, so they're quick to make and great year-round in linen or cotton. Just baste the crotch curve to check the fit.",
    matNote: "adult pants",
    materials: [
      "Fabric (linen, cotton twill, chambray) — 110 cm wide × (rise + inseam + 15 cm), two pieces",
      "Waist elastic (3 cm wide) — the waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>The right curve is the crotch, the left straight edge is the side.",
      "<strong>Cut 4</strong><br>Cut 2 mirror pairs (4 pieces) from the same pattern. Mark the crotch notches.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the edges."
    ],
    sew: [
      { h: "4-1. Sew the center (crotch) seams", items: [
        "Sew the crotch curve on the front pair and the back pair, right sides together.",
        "Clip the curve so it turns smoothly."
      ]},
      { h: "4-2. Sew the inseam", items: [
        "Open the front and back out, place right sides together, and sew the inseam in one pass."
      ]},
      { h: "4-3. Sew the sides", items: [
        "Sew the side seams right sides together and press open."
      ]},
      { h: "4-4. Waist and hem", items: [
        "Make an elastic waist casing and stitch, leaving an opening; thread the elastic, fit and close.",
        "Double-fold and topstitch the leg hems; press."
      ]}
    ],
    tips: [
      "<strong>Crisp drape</strong>: linen and twill give the best wide-leg shape.",
      "<strong>Cropped</strong>: shorten the inseam for cropped wide pants.",
      "<strong>Pockets</strong>: add in-seam side pockets before closing the sides."
    ]
  },

  halfpants: {
    title: "Shorts",
    tab: "human",
    toolName: "Shorts",
    sizeStep: "Enter the rise, inseam, waist and hip. Adjust the inseam for the length you want.",
    desc: "How to sew relaxed elastic-waist shorts. Same construction as the wide pants with a shorter inseam: sew the crotch seams, inseam and sides, then hem and add elastic.",
    keywords: "shorts,elastic waist shorts,how to sew,sewing pattern,easy shorts,handmade",
    lead: "Relaxed elastic-waist shorts. Four pieces from one pattern: sew the crotch, sew the sides, hem and run elastic through the waist. Change the inseam for knee-length or shorter — a summer staple.",
    matNote: "adult shorts",
    materials: [
      "Fabric (cotton, linen, sheeting or denim) — 110 cm wide × 90 cm",
      "Waist elastic (2–3 cm wide) — the waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>The right curve is the crotch (center-seam side), the left straight edge is the side.",
      "<strong>Cut 4</strong><br>Cut 2 mirror pairs (4 pieces). Keep directional prints the right way up.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the edges."
    ],
    sew: [
      { h: "4-1. Sew the center (crotch) seams", items: [
        "Sew the crotch curve on the front pair and the back pair, right sides together.",
        "Clip the curve; press open or to one side."
      ]},
      { h: "4-2. Sew the inseam", items: [
        "Open out, place right sides together and sew the inseam in one pass, matching notches."
      ]},
      { h: "4-3. Sew the sides", items: [
        "Sew the side seams right sides together; press."
      ]},
      { h: "4-4. Hem the legs", items: [
        "Double-fold and press each leg hem, then topstitch 2–3 mm from the edge."
      ]},
      { h: "4-5. Elastic waist", items: [
        "Fold the waist for the elastic and stitch, leaving an opening.",
        "Cut the elastic 2–3 cm shorter than the waist, thread it, sew the ends and close the opening."
      ]}
    ],
    tips: [
      "<strong>Length</strong>: adjust the inseam for above-the-knee or longer.",
      "<strong>Cuffed</strong>: add a folded cuff for a tailored look.",
      "<strong>Pockets</strong>: add patch or in-seam pockets."
    ]
  },

  blouse: {
    title: "Blouse",
    tab: "human",
    toolName: "Blouse",
    sizeStep: "Enter bust, shoulder, length, sleeve and the button-stand width. Presets cover S–XL.",
    desc: "How to sew a button-down blouse with set-in sleeves. Back cut on the fold, front cut as two pieces with a button stand. Best in woven fabric like shirting, double gauze or linen.",
    keywords: "blouse,button-down,shirt,set-in sleeve,how to sew,sewing pattern,woven,handmade",
    lead: "A button-down blouse with set-in sleeves: the back is cut on the fold and the front as two pieces with a button stand. Best in woven fabric. Casual or smart depending on your fabric.",
    matNote: "adult blouse",
    materials: [
      "Woven fabric (shirting, double gauze, linen) — 110 cm wide × about 200 cm",
      "Buttons (1–1.2 cm) — 7–9",
      "Interfacing for the button stand and neckline — a little",
      "Bias tape for the neckline — the neckline length"
    ],
    cut: [
      "<strong>Cut the back</strong><br>Place the center-back on the fold and cut 1.",
      "<strong>Cut the fronts</strong><br>Cut 1 with the front pattern, then flip it and cut a mirror image (2 total).",
      "<strong>Cut the sleeves</strong><br>Cut 2 sleeves.",
      "<strong>Finish the edges</strong><br>Finish the seam-allowance edges; the front button-stand edge depends on your finish."
    ],
    sew: [
      { h: "4-1. Sew the shoulders and sides", items: [
        "Sew the front and back at the shoulders and sides, right sides together; press open."
      ]},
      { h: "4-2. Finish the neckline", items: [
        "Measure the neckline and cut bias tape to fit.",
        "Sew the bias tape around the neckline, turn it in and press."
      ]},
      { h: "4-3. Set in the sleeves", items: [
        "Match the sleeve-cap notch to the shoulder seam and sew each sleeve into the armhole; press toward the sleeve."
      ]},
      { h: "4-4. Sew the underarm/side in one line", items: [
        "Sew from the sleeve cuff down to the hem in one continuous seam; press."
      ]},
      { h: "4-5. Finish the front opening", items: [
        "Fold back the button stand on each front, press and topstitch.",
        "Mark and make the buttonholes, then sew the buttons on the opposite side."
      ]},
      { h: "4-6. Hem", items: [
        "Double-fold and press the hem, then topstitch 2 mm from the edge."
      ]}
    ],
    tips: [
      "<strong>Crisp collar area</strong>: interface the button stand and neckline.",
      "<strong>Sleeve length</strong>: shorten for short sleeves or add a cuff.",
      "<strong>Fabric</strong>: double gauze is soft; shirting is crisp and smart."
    ]
  },

  onepiece: {
    title: "Dress (with sleeves)",
    tab: "human",
    toolName: "Dress (with sleeves)",
    sizeStep: "Enter bust, waist, hip, bodice length, skirt length and sleeve length.",
    desc: "How to sew a waist-seam dress with set-in sleeves. A fitted bodice joined to an A-line skirt, neckline bound with bias tape. Best in woven fabric.",
    keywords: "dress with sleeves,waist seam dress,set-in sleeve,how to sew,sewing pattern,woven,handmade",
    lead: "A waist-seam dress: a fitted bodice joined to an A-line skirt, with set-in sleeves and a bias-bound neckline. Comfortable and pretty in woven fabric like cotton, linen or double gauze.",
    matNote: "adult dress",
    materials: [
      "Woven fabric (cotton, linen, double gauze) — 110 cm wide × about 300 cm",
      "Bias tape for the neckline (and armholes) — the relevant lengths",
      "An invisible zipper or waist elastic — 1"
    ],
    cut: [
      "<strong>Cut the bodice</strong><br>Cut the front and back bodice each on the fold (1 each).",
      "<strong>Cut the skirt</strong><br>Cut the front and back skirt each on the fold (1 each).",
      "<strong>Cut the sleeves</strong><br>Cut 2 sleeves.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the seam-allowance edges."
    ],
    sew: [
      { h: "4-1. Sew the bodice", items: [
        "Sew the front and back bodice at the sides, right sides together; press open."
      ]},
      { h: "4-2. Sew the skirt", items: [
        "Sew the skirt front and back at the sides (leave room for a zipper at the back if using one); press open."
      ]},
      { h: "4-3. Join the bodice and skirt", items: [
        "Match the bodice waist to the skirt waist, aligning centers and side notches, and sew.",
        "Press the seam up toward the bodice."
      ]},
      { h: "4-4. Finish the neckline", items: [
        "Bind the neckline with bias tape and press the seam to the inside."
      ]},
      { h: "4-5. Set in the sleeves", items: [
        "Match the sleeve-cap notch to the shoulder and sew each sleeve in.",
        "Sew the sleeve underarm seams and press."
      ]},
      { h: "4-6. Hem the skirt and cuffs", items: [
        "Double-fold and topstitch the skirt hem and the sleeve cuffs; press."
      ]}
    ],
    tips: [
      "<strong>Closure</strong>: an invisible back zipper gives a fitted look; elastic at the waist is easier.",
      "<strong>Length</strong>: adjust bodice and skirt lengths to your height.",
      "<strong>Pockets</strong>: in-seam skirt pockets are handy."
    ]
  },

  jacket: {
    title: "Jacket",
    tab: "human",
    toolName: "Jacket",
    sizeStep: "Enter bust, shoulder, length, sleeve and the button-stand width. Allow extra ease.",
    desc: "How to sew a front-button jacket with set-in sleeves. Back cut on the fold, front cut as two pieces with a button stand. Best in thicker woven fabric like twill or wool.",
    keywords: "jacket,set-in sleeve,button front,how to sew,sewing pattern,wool,twill,handmade",
    lead: "A front-button jacket with set-in sleeves: the back is cut on the fold, the front as two pieces with a button stand. Best in thicker woven fabric. Add a lining for a dressier finish, or leave it single-layer for casual wear.",
    matNote: "adult jacket",
    materials: [
      "Outer fabric (cotton twill, wool, denim) — 110 cm wide × about 250 cm",
      "Lining (cotton or polyester) — 110 cm wide × about 230 cm (optional)",
      "Interfacing for the button stand — a little",
      "Buttons (1.5–2 cm) — 5–6"
    ],
    cut: [
      "<strong>Cut the back</strong><br>Place the center-back on the fold and cut 1.",
      "<strong>Cut the fronts</strong><br>Cut 1, then flip the pattern and cut a mirror image (2 total).",
      "<strong>Cut the sleeves</strong><br>Cut 2 sleeves.",
      "<strong>Interface</strong><br>Fuse interfacing to the front button-stand area.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the seam-allowance edges."
    ],
    sew: [
      { h: "4-1. Sew the shoulders and sides", items: [
        "Sew the front and back at the shoulders and sides, right sides together; press open."
      ]},
      { h: "4-2. Finish the neckline", items: [
        "Finish the neckline by binding the seam allowance with bias tape or self fabric."
      ]},
      { h: "4-3. Set in the sleeves", items: [
        "Match the sleeve-cap notch to the shoulder seam and sew each sleeve in; press toward the sleeve."
      ]},
      { h: "4-4. Sew the underarm/side in one line", items: [
        "Sew from cuff to hem in one continuous seam; press open."
      ]},
      { h: "4-5. Finish the front opening", items: [
        "Fold back and topstitch the button stand.",
        "Mark and make the buttonholes, then sew on the buttons."
      ]},
      { h: "4-6. Hem and cuffs", items: [
        "Fold and press the hem, then topstitch or slip-stitch. Finish the cuffs the same way."
      ]}
    ],
    tips: [
      "<strong>Add a lining</strong>: a lining hides the seams and feels dressier.",
      "<strong>Topstitch</strong>: edge topstitching gives a crisp, tailored look.",
      "<strong>Press well</strong>: pressing each seam makes a big difference on a jacket."
    ]
  },

  coat: {
    title: "Coat",
    tab: "human",
    toolName: "Coat",
    sizeStep: "Enter bust, shoulder, length, sleeve and the button-stand width. Allow plenty of ease.",
    desc: "How to sew a front-button A-line coat with set-in sleeves. Back cut on the fold, front cut as two pieces with a button stand. Best in heavy fabric like wool, tweed or quilted fabric.",
    keywords: "coat,a-line coat,set-in sleeve,button front,how to sew,sewing pattern,wool,handmade",
    lead: "A front-button A-line coat with set-in sleeves: the back is cut on the fold, the front as two pieces with a button stand. Best in heavy fabric like wool, tweed or quilted fabric. A lining makes the finish even nicer.",
    matNote: "adult coat",
    materials: [
      "Outer fabric (wool, tweed, quilted) — 150 cm wide × about 300 cm",
      "Lining (cotton or polyester) — 110 cm wide × about 280 cm (optional)",
      "Interfacing for the button stand — a little",
      "Buttons (2–2.5 cm) — 5–7"
    ],
    cut: [
      "<strong>Cut the back</strong><br>Place the center-back on the fold and cut 1.",
      "<strong>Cut the fronts</strong><br>Cut 1, then flip the pattern and cut a mirror image (2 total).",
      "<strong>Cut the sleeves</strong><br>Cut 2 sleeves.",
      "<strong>Interface</strong><br>Fuse interfacing to the front button-stand area.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the seam-allowance edges."
    ],
    sew: [
      { h: "4-1. Sew the shoulders and sides", items: [
        "Sew the front and back at the shoulders and sides, right sides together; press open."
      ]},
      { h: "4-2. Finish the neckline", items: [
        "Bind the neckline seam allowance with bias tape or self fabric (or attach a collar/facing if you prefer)."
      ]},
      { h: "4-3. Set in the sleeves", items: [
        "Match the sleeve-cap notch to the shoulder seam and sew each sleeve in; press toward the sleeve."
      ]},
      { h: "4-4. Sew the underarm/side in one line", items: [
        "Sew from cuff to hem in one continuous seam; press open."
      ]},
      { h: "4-5. Finish the front opening", items: [
        "Fold back and topstitch the button stand.",
        "Mark and make the buttonholes, then sew on the buttons."
      ]},
      { h: "4-6. Hem and cuffs", items: [
        "Fold and press the hem, then topstitch or slip-stitch. Finish the cuffs the same way."
      ]}
    ],
    tips: [
      "<strong>Add a lining</strong>: a lining makes a coat warmer and much cleaner inside.",
      "<strong>Heavy fabric</strong>: lengthen your stitch and press firmly.",
      "<strong>Bigger buttons</strong>: large buttons suit a coat and are easy to fasten."
    ]
  },

  stai: {
    title: "Baby bib",
    tab: "baby",
    toolName: "Baby bib",
    sizeStep: "Enter the neckline width and depth, and the bib size by age. Add a snap to close.",
    desc: "How to sew the classic baby bib. Layer an outer and an absorbent backing, sew around, turn through a gap and close with a snap. A lovely, quick baby gift.",
    keywords: "baby bib,bib,how to sew,sewing pattern,baby gift,snap,handmade",
    lead: "The classic baby bib: layer an outer fabric and an absorbent backing, sew around, turn right side out through a gap, and finish with a snap. Gauze or toweling is gentle on skin and makes a welcome baby gift.",
    matNote: "one bib",
    materials: [
      "Outer fabric (cotton, double gauze) — about 25 × 30 cm (10 × 12 in)",
      "Backing (toweling or gauze, absorbent) — the same size",
      "1 set of snaps (e.g. plastic snaps)"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side; align the grain.",
      "<strong>Cut 2</strong><br>Cut one outer and one backing. Trace the neck curve accurately.",
      "<strong>Finish the edges</strong><br>Zigzag the edges if the fabric frays."
    ],
    sew: [
      { h: "4-1. Sew around", items: [
        "Place the outer and backing right sides together.",
        "Sew all the way around, leaving a ~5 cm turning gap."
      ]},
      { h: "4-2. Clip and turn", items: [
        "Clip the neck curve and corners (without cutting the stitches) so they turn smoothly.",
        "Turn right side out through the gap and shape the curves with a point turner."
      ]},
      { h: "4-3. Topstitch and add the snap", items: [
        "Topstitch all around, closing the turning gap as you go.",
        "Attach the two halves of the snap at the neck points (near the top corners)."
      ]}
    ],
    tips: [
      "<strong>Extra absorbent</strong>: use toweling or a layer of batting for the backing.",
      "<strong>Bandana style</strong>: a triangular version catches more drool.",
      "<strong>Great gift</strong>: make a few in coordinating prints."
    ]
  },

  mermaid: {
    title: "Mermaid skirt",
    tab: "human",
    toolName: "Mermaid skirt",
    sizeStep: "Enter waist, hip, skirt length, the seam position and hem flare. Elastic waist.",
    desc: "How to sew a mermaid skirt: fitted from waist to knee, then flaring at the hem. An upper and lower panel joined at a seam, four pieces total. Adjustable seam position and flare.",
    keywords: "mermaid skirt,fishtail skirt,how to sew,sewing pattern,fitted skirt,handmade",
    lead: "Fitted from the waist to below the knee, then flaring out like a fishtail. An upper panel (waist to seam) and a lower panel (seam to hem) are joined, four pieces in all. You can move the seam position and change the flare.",
    matNote: "adult skirt",
    materials: [
      "Fabric (medium cotton, linen or twill with some body) — about 110 cm wide × (skirt length + 20 cm); allow extra for a big flare",
      "Waist elastic (2–3 cm wide) — the waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut and seam lines; align the grain.",
      "<strong>Cut 4</strong><br>Cut the upper panel front and back on the fold (2), and the lower panel front and back on the fold (2).",
      "<strong>Mark the seam notches</strong><br>Mark the notches on the upper/lower seam line.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the edges."
    ],
    sew: [
      { h: "4-1. Join the upper and lower panels", items: [
        "Match the front upper and lower panels at the seam, easing the slightly wider lower panel to the notches, and sew.",
        "Press the seam up. Join the back the same way."
      ]},
      { h: "4-2. Sew the sides", items: [
        "Place the joined front and back right sides together and sew the sides from waist to hem in one pass, matching the seam lines; press open."
      ]},
      { h: "4-3. Make the waist casing", items: [
        "Fold the waist for the elastic and stitch, leaving an opening."
      ]},
      { h: "4-4. Thread the elastic", items: [
        "Thread the elastic, fit to the waist, sew the ends and close the opening."
      ]},
      { h: "4-5. Hem", items: [
        "Hem with a narrow fold (1–1.5 cm) since the hem flares; press to finish."
      ]}
    ],
    tips: [
      "<strong>Move the seam</strong>: a lower seam gives a more dramatic fishtail.",
      "<strong>Fabric with body</strong>: a little stiffness makes the flare stand out.",
      "<strong>More flare</strong>: increase the hem flare value for extra swish."
    ]
  },

  kidsdress: {
    title: "Kids' dress",
    tab: "kids",
    toolName: "Kids' dress",
    sizeStep: "Start from a height preset, then adjust the bodice and skirt lengths.",
    desc: "How to sew a two-tier kids' dress: a sleeveless bodice joined to a fully gathered skirt. Three pieces, bias-bound neckline and armholes, a button or snap at the back.",
    keywords: "kids dress,girls dress,gathered dress,how to sew,sewing pattern,childrens,handmade",
    lead: "A sleeveless bodice joined to a fully gathered skirt — a sweet two-tier dress. Just three pieces, with the neckline and armholes bound in bias tape. Wear it as a summer dress or a layering pinafore.",
    matNote: "child dress",
    materials: [
      "Fabric (cotton, linen, lawn or double gauze) — 110 cm wide × 80–100 cm",
      "Double-fold bias tape (about 1.1 cm) — for the neckline and armholes (~120 cm)",
      "1–2 snaps or small buttons for the back opening"
    ],
    cut: [
      "<strong>Fold and cut</strong><br>Place the pattern fold edge on the fabric fold.",
      "<strong>Cut the bodice</strong><br>Cut the front and back bodice each on the fold (the front neckline is lower).",
      "<strong>Cut the skirt</strong><br>Cut the front and back skirt each on the fold (2 pieces).",
      "<strong>Finish the edges</strong><br>Zigzag or serge the edges."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Sew the front and back bodice at the shoulders; press open.",
        "For a back-button opening, sew up to the opening stop and leave the top open."
      ]},
      { h: "4-2. Bind the neckline and armholes", items: [
        "Sew bias tape to the neckline, turn and topstitch.",
        "Bind both armholes the same way."
      ]},
      { h: "4-3. Gather the skirt", items: [
        "Sew the skirt sides into a tube (leave one side or the center back open if using a back opening).",
        "Sew two rows of long stitches at the top and pull the threads to gather to the bodice waist width."
      ]},
      { h: "4-4. Join bodice and skirt", items: [
        "Match bodice and skirt waists, distribute the gathers evenly and sew all around.",
        "Press the seam up and topstitch from the front."
      ]},
      { h: "4-5. Finish", items: [
        "Sew the bodice sides, add the snap/button at the back, double-fold and topstitch the hem, and press."
      ]}
    ],
    tips: [
      "<strong>Pinafore</strong>: make it in corduroy or denim to layer over a tee.",
      "<strong>Fuller skirt</strong>: cut the skirt wider for more gathers.",
      "<strong>Grow with them</strong>: deep hems let you lengthen it later."
    ]
  },

  smock: {
    title: "Kids' smock",
    tab: "kids",
    toolName: "Kids' smock",
    sizeStep: "Start from a height preset. Check the neckline fits over the head.",
    desc: "How to sew a pull-on kids' smock for nursery and preschool. A relaxed drop-shoulder body plus tube sleeves, with elastic at the neckline and cuffs.",
    keywords: "kids smock,art smock,preschool,how to sew,sewing pattern,pullover,handmade",
    lead: "The classic pull-on smock for nursery and preschool art and meals. A relaxed drop-shoulder body (same front and back) plus tube sleeves, with elastic at the neckline and cuffs for easy on and off.",
    matNote: "child smock",
    materials: [
      "Fabric (easy-care sheeting, broadcloth or light oxford) — 110 cm wide × 80–100 cm",
      "Thin elastic (0.5–0.6 cm) for the neckline and cuffs — the neckline plus two cuffs"
    ],
    cut: [
      "<strong>Cut the body</strong><br>Fold the fabric and cut the front and back (same shape) on the fold; keep the neckline the right way up.",
      "<strong>Cut the sleeves</strong><br>Cut 2 sleeves, minding the cuff direction.",
      "<strong>Mark notches</strong><br>Mark the armhole notches.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the edges."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Sew the front and back at the shoulders; press open."
      ]},
      { h: "4-2. Make the elastic neckline", items: [
        "Fold the neckline into a casing, leaving an opening, and stitch.",
        "Thread elastic cut to fit over the head, join the ends and close the opening."
      ]},
      { h: "4-3. Set in the sleeves", items: [
        "Gather the sleeve cap lightly and sew each sleeve to the armhole (flat, drop-shoulder)."
      ]},
      { h: "4-4. Sew underarms and sides", items: [
        "Sew from the cuff to the hem in one continuous seam, matching the underarm seams."
      ]},
      { h: "4-5. Elastic cuffs and hem", items: [
        "Make each cuff into a casing, leave an opening, thread elastic and close.",
        "Double-fold and topstitch the hem; press."
      ]}
    ],
    tips: [
      "<strong>Wipe-clean</strong>: laminated cotton makes a great painting smock.",
      "<strong>Name it</strong>: add a label or initials for nursery.",
      "<strong>Roomy</strong>: a relaxed fit goes on easily over clothes."
    ]
  },

  kidsvest: {
    title: "Kids' vest",
    tab: "kids",
    toolName: "Kids' vest",
    sizeStep: "Start from a height preset. Bind the edges or add buttons to close.",
    desc: "How to sew a simple front-opening kids' vest. A back and two fronts, no sleeves, edges bound with bias tape. Warm in quilted or fleece fabric.",
    keywords: "kids vest,gilet,how to sew,sewing pattern,layering,fleece,handmade",
    lead: "A simple front-opening vest, great for layering. Just a back and two fronts — no sleeves, so it's quick. Make it in quilting cotton or fleece for a warm outer layer.",
    matNote: "child vest",
    materials: [
      "Fabric (quilted, fleece or cotton) — 110 cm wide × 50–70 cm",
      "Bias tape for the neckline, front edges and armholes (~150 cm), or 2–3 buttons"
    ],
    cut: [
      "<strong>Cut the back</strong><br>Place the center-back on the fold and cut 1.",
      "<strong>Cut the fronts</strong><br>Cut 2 mirror-image fronts (the center fronts are the opening).",
      "<strong>Finish the edges</strong><br>Zigzag or serge the edges."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Sew the fronts and back at the shoulders; press open."
      ]},
      { h: "4-2. Bind the neckline and front edges", items: [
        "Bind from the neckline down the front edges with bias tape, or use a facing.",
        "For buttons, add buttonholes and buttons at the front edges."
      ]},
      { h: "4-3. Bind the armholes", items: [
        "Bind both armholes with bias tape."
      ]},
      { h: "4-4. Sew the sides and hem", items: [
        "Sew the side seams right sides together.",
        "Double-fold and topstitch the hem; press."
      ]}
    ],
    tips: [
      "<strong>Reversible</strong>: line it to make it wearable both ways.",
      "<strong>Warm version</strong>: fleece or quilted fabric adds warmth.",
      "<strong>Snaps</strong>: snaps are easy for little ones to fasten."
    ]
  },

  kidshalf: {
    title: "Kids' shorts",
    tab: "kids",
    toolName: "Kids' shorts",
    sizeStep: "Enter the rise, inseam, waist and hip. Presets cover heights 80–130 cm.",
    desc: "How to sew easy elastic-waist kids' shorts. Four pieces from one pattern: sew the crotch seams, sides and inseam, hem and add elastic. Great for summer.",
    keywords: "kids shorts,elastic waist,how to sew,sewing pattern,summer,childrens,handmade",
    lead: "Easy, comfy elastic-waist shorts for active kids. Four pieces from the same pattern: sew the crotch, sides and inseam, hem the legs and run elastic through the waist. For boys or girls.",
    matNote: "child shorts",
    materials: [
      "Fabric (cotton, double gauze or jersey) — 110 cm wide × about 40 cm",
      "Waist elastic (2 cm wide) — the waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>The right curve is the crotch, the left straight edge is the side.",
      "<strong>Cut 4</strong><br>Cut 2 mirror pairs (4 pieces). Mark the crotch notches.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the edges."
    ],
    sew: [
      { h: "4-1. Sew the crotch seams", items: [
        "Sew the crotch curve on the front pair and back pair; clip the curve."
      ]},
      { h: "4-2. Sew the inseam", items: [
        "Open out, place right sides together and sew the inseam in one pass."
      ]},
      { h: "4-3. Sew the sides", items: [
        "Sew the side seams right sides together; press open."
      ]},
      { h: "4-4. Waist and hem", items: [
        "Make an elastic waist casing and stitch, leaving an opening; thread the elastic, fit and close.",
        "Double-fold and topstitch the leg hems; press."
      ]}
    ],
    tips: [
      "<strong>Knit version</strong>: jersey makes soft play shorts (use a stretch stitch).",
      "<strong>Pockets</strong>: add patch pockets for treasures.",
      "<strong>Length</strong>: adjust the inseam to taste."
    ]
  },

  bandanastai: {
    title: "Bandana bib",
    tab: "baby",
    toolName: "Bandana bib",
    sizeStep: "Enter the neckline width and depth, and the bib size. Snaps at the neck points.",
    desc: "How to sew a triangular bandana-style baby bib. Smaller than a regular bib and a cute accent. Sew an outer and an absorbent backing, turn, and add snaps.",
    keywords: "bandana bib,baby bib,triangle bib,how to sew,sewing pattern,baby gift,handmade",
    lead: "A stylish triangular bandana bib. It uses less fabric than a regular bib and adds a cute accent to any outfit. Sew an outer and an absorbent backing, turn right side out, and finish with snaps.",
    matNote: "one bib",
    materials: [
      "Outer fabric (double gauze, cotton) — about 25 cm square",
      "Backing (toweling or terry, absorbent) — the same size",
      "1 set of snaps"
    ],
    cut: [
      "<strong>Cut 2</strong><br>Cut one outer and one backing from the triangle pattern.",
      "<strong>Corners</strong><br>Clip the corner seam allowances so they turn out crisply."
    ],
    sew: [
      { h: "4-1. Sew right sides together", items: [
        "Place the outer and backing right sides together and sew around, leaving a ~5 cm turning gap.",
        "Trim the corner allowances."
      ]},
      { h: "4-2. Turn right side out", items: [
        "Turn through the gap and shape the corners.",
        "Slip-stitch the gap, or topstitch all around to close it."
      ]},
      { h: "4-3. Add the snaps", items: [
        "Attach a snap at each of the two top corners to fit the neck."
      ]}
    ],
    tips: [
      "<strong>Absorbent backing</strong>: terry on the back soaks up drool.",
      "<strong>Mix and match</strong>: make several in coordinating prints.",
      "<strong>Great gift</strong>: a set of bandana bibs makes a lovely baby gift."
    ]
  },

  babyhat: {
    title: "Baby hat (tulip hat)",
    tab: "baby",
    toolName: "Baby hat (tulip hat)",
    sizeStep: "Enter the head circumference, crown depth and brim width. Presets cover ages.",
    desc: "How to sew a tulip hat for babies: a six-petal crown with a downward brim. Make it with an outer and lining for a reversible hat. Cute sun protection.",
    keywords: "baby hat,tulip hat,sun hat,how to sew,sewing pattern,reversible,handmade",
    lead: "A round crown of six petals (gores) with a downward brim. Make it with an outer and a lining and it's fully reversible. Cute sun protection for baby outings.",
    matNote: "baby hat",
    materials: [
      "Outer fabric (double gauze, light cotton) — about 50 cm square",
      "Lining (same; a contrast for reversible) — about 50 cm square",
      "Optional: twill tape or elastic for a chin strap, a decorative button"
    ],
    cut: [
      "<strong>Cut the petals</strong><br>Cut 6 petals. For reversible, cut 6 outer + 6 lining (12 total).",
      "<strong>Cut the brim</strong><br>Fold the fabric in quarters and place the brim's fold edges on the folds so it opens into a ring; cut one outer and one lining.",
      "<strong>Prepare curves</strong><br>Plan to clip the curved seam allowances so they turn smoothly."
    ],
    sew: [
      { h: "4-1. Make the crown", items: [
        "Sew the petals right sides together along their curved edges, one after another, then close into a ring to form a dome.",
        "Clip the curves and press the allowances open at the top.",
        "Make an outer crown and a lining crown."
      ]},
      { h: "4-2. Make the brim", items: [
        "Sew the outer and lining brims right sides together around the outer (large) circle.",
        "Clip the seam, turn right side out and topstitch around the outer edge."
      ]},
      { h: "4-3. Join the crown and brim", items: [
        "Sew the outer crown's opening to the inner edge of the brim, right sides together.",
        "Tuck the lining crown's allowance in and slip-stitch or topstitch it to finish (reversible). Press."
      ]}
    ],
    tips: [
      "<strong>Reversible</strong>: two fabrics give two hats in one.",
      "<strong>Chin strap</strong>: add a tie or elastic so it stays on in the wind.",
      "<strong>Sun protection</strong>: a deeper brim shades little faces."
    ]
  },

  legwarmer: {
    title: "Baby leg warmers",
    tab: "baby",
    toolName: "Baby leg warmers",
    sizeStep: "Enter the leg circumference and length. Knit fabric hugs without binding.",
    desc: "How to sew the easiest baby item: tube leg warmers. Sew into a tube and hem the ends. Makes diaper changes easy and keeps little legs warm.",
    keywords: "baby leg warmers,leg warmers,how to sew,sewing pattern,knit,easy,handmade",
    lead: "The simplest baby make: sew a tube and hem the ends. Leg warmers keep little legs cozy, protect knees during crawling, and make diaper changes easy. Stretch knit is comfiest.",
    matNote: "one pair",
    materials: [
      "Knit fabric (ribbing, jersey, interlock) — two 25 cm squares",
      "Tip: stretch fabric is best; add a little ease if using a woven"
    ],
    cut: [
      "<strong>Cut 2</strong><br>Cut 2 (left and right) from the rectangle pattern. For knit, run the stretch around the leg.",
      "<strong>Use a stretch stitch</strong><br>A ballpoint needle and stretch stitch help."
    ],
    sew: [
      { h: "4-1. Sew into a tube", items: [
        "Fold each piece in half lengthwise, right sides together, and sew the long edge into a tube.",
        "Press the seam open or to one side."
      ]},
      { h: "4-2. Hem the ends", items: [
        "Turn each end under and topstitch to hem, using the dashed fold guide."
      ]}
    ],
    tips: [
      "<strong>Use ribbing</strong>: ribbing grips gently and looks neat.",
      "<strong>Repurpose</strong>: an old jersey sleeve makes instant leg warmers.",
      "<strong>Toddler arm warmers</strong>: the same idea works for little arms."
    ]
  },

  kincgusset: {
    title: "Cup bag (gusseted)",
    tab: "small",
    toolName: "Cup bag (gusseted)",
    sizeStep: "Enter the width, height and gusset (base depth). Presets fit a cup or bento.",
    desc: "How to sew a drawstring cup bag with a triangular base gusset, so it stands up and fits a cup or bento box. Cut on the fold, sew the sides, box the corners.",
    keywords: "cup bag,gusseted drawstring,bento bag,how to sew,sewing pattern,school,handmade",
    lead: "A drawstring bag with a triangular base gusset so it holds a cup or bento box. Cut with the base on the fold, sew the sides, then pinch and sew the base corners. A back-to-school staple.",
    matNote: "cup / bento size",
    materials: [
      "Fabric (cotton oxford or canvas) — about 35 × 50 cm",
      "Round cord (3–5 mm) — about 50 cm × 2 (both-side draw)",
      "Bodkin (or a safety pin)"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut and seam lines; align the grain.",
      "<strong>Cut</strong><br>Cut as one piece with the base on the fold. The base corners show gusset notches (▽).",
      "<strong>Finish the edges</strong><br>Zigzag or serge the side edges."
    ],
    sew: [
      { h: "4-1. Prepare the cord openings", items: [
        "From the top down to the casing line (dashed), fold the side seam allowances under to make the cord openings (opening stops)."
      ]},
      { h: "4-2. Sew the sides", items: [
        "Fold at the base, right sides together, and sew each side up to the casing opening stop.",
        "Leave above the openings unsewn; press the allowances open."
      ]},
      { h: "4-3. Box the base corners", items: [
        "Pinch each base corner into a triangle so the side seam meets the base fold.",
        "Sew straight across the gusset line (▽ to ▽) at both corners; fold or trim the triangle tips."
      ]},
      { h: "4-4. Make the casing", items: [
        "Tidy the allowances above the opening stops and topstitch the openings.",
        "Double-fold the top and stitch around to make the cord channel."
      ]},
      { h: "4-5. Thread the cords", items: [
        "Thread one cord from each side (both-side draw) and knot the ends; shape the bag."
      ]}
    ],
    tips: [
      "<strong>Stands up</strong>: a deeper gusset holds a wider cup or box.",
      "<strong>Wipe-clean lining</strong>: line with laminate for food bags.",
      "<strong>Name tag</strong>: add a label for school."
    ]
  },

  movepocket: {
    title: "Clip-on pocket",
    tab: "small",
    toolName: "Clip-on pocket",
    sizeStep: "Enter the pocket width and height, the flap height and the belt-loop width.",
    desc: "How to sew a clip-on pocket for clothes without pockets. A body, a flap and a belt loop; close with a snap and attach with clips or a belt loop.",
    keywords: "clip-on pocket,detachable pocket,how to sew,sewing pattern,school,tissue pocket,handmade",
    lead: "A handy pocket you attach to a waistband when clothes have no pockets. Hold a tissue or handkerchief, close with a snap, and clip it on or thread a belt through the loop. Three parts: body, flap and belt loop.",
    matNote: "one pocket",
    materials: [
      "Outer and lining fabric — about 15 × 35 cm each",
      "Flap fabric (self or contrast) — a little",
      "Belt-loop fabric — a little",
      "1 set of snaps",
      "Clip-on pocket clips (×2), or use the belt loop"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut and seam lines; align the grain.",
      "<strong>Cut</strong><br>Cut 2 body (outer/lining), 2 flap (outer/lining) and 1 belt loop.",
      "<strong>Finish the edges</strong><br>Zigzag or serge edges that fray."
    ],
    sew: [
      { h: "4-1. Make the flap", items: [
        "Sew the flap outer and lining right sides together (leave the top edge open) and turn.",
        "Topstitch around and add one half of the snap."
      ]},
      { h: "4-2. Make the body", items: [
        "Fold the body up to make the pocket (or layer outer and lining), and sew the sides; turn.",
        "Add the other half of the snap at the pocket opening."
      ]},
      { h: "4-3. Assemble with the belt loop", items: [
        "Fold and sew the belt loop and stitch its ends to the back of the body to form a loop.",
        "Catch the flap at the top edge of the body and sew.",
        "Check the snap, then clip it on or thread a belt through the loop."
      ]}
    ],
    tips: [
      "<strong>Two ways to attach</strong>: clips for skirts, the belt loop for trousers.",
      "<strong>Laminate</strong>: a wipe-clean version is handy for younger kids.",
      "<strong>Coordinate</strong>: match it to a bag or smock."
    ]
  },

  fittedmask: {
    title: "Fitted mask",
    tab: "small",
    toolName: "Fitted mask",
    sizeStep: "Enter the face width, nose-to-chin length and nose depth. Three sizes.",
    desc: "How to sew a 3D fitted face mask from an upper and lower piece joined on a curved center seam. It sits off the lips for easier breathing. A nose-wire pocket included.",
    keywords: "fitted mask,3D mask,face mask,how to sew,sewing pattern,nose wire,handmade",
    lead: "A shaped 3D mask made by joining an upper and a lower piece along a curved center seam. Unlike a flat mask, it follows the face so it sits off the lips and breathes easier. Three sizes (child, women's, men's).",
    matNote: "one mask",
    materials: [
      "Outer fabric (double gauze, cotton) — about 25 cm square",
      "Lining (gauze or cotton) — the same",
      "Nose wire (aluminum or craft wire) — about 10 cm",
      "Flat mask elastic (3–4 mm) — about 30–35 cm × 2"
    ],
    cut: [
      "<strong>Cut the upper piece</strong><br>Place the center edge on the fold and cut one outer and one lining (2 total).",
      "<strong>Cut the lower piece</strong><br>The same way: one outer and one lining (2 total).",
      "<strong>Finish the edges</strong><br>Zigzag the edges so thin fabric doesn't fray."
    ],
    sew: [
      { h: "4-1. Join the upper and lower on the center curve", items: [
        "Sew the outer upper and lower pieces right sides together along the curved center (nose-to-mouth) line.",
        "Clip the curve (about every 5 mm) and press open. Do the same for the lining."
      ]},
      { h: "4-2. Sew outer and lining together", items: [
        "Place outer and lining right sides together and sew the two sides and the top (nose) edge, leaving a 5–6 cm gap at the bottom (chin).",
        "Clip the corners, turn right side out and slip-stitch the gap; press."
      ]},
      { h: "4-3. Add the nose wire", items: [
        "Make a small pocket near the top seam and insert the nose wire (or slip it into a small opening in the top seam), then close it."
      ]},
      { h: "4-4. Add the elastic", items: [
        "Make small loops at the sides (folded fabric or bias tape), or fold the side allowances to take the elastic.",
        "Thread the elastic, fit it over your ears and tie or stitch the ends."
      ]}
    ],
    tips: [
      "<strong>Better fit</strong>: the nose wire seals the top for glasses-wearers.",
      "<strong>Filter pocket</strong>: leave the lining seam partly open to add a filter.",
      "<strong>Adjustable</strong>: cord stoppers on the elastic dial in the fit."
    ]
  },

  gamaguchi: {
    title: "Clasp purse (gamaguchi)",
    tab: "bag",
    toolName: "Clasp purse (gamaguchi)",
    sizeStep: "Enter your clasp's outer width and height plus the purse depth; the fabric width is auto-calculated as clasp width × 1.6. Turn on the rounded-corner option to match the clasp curve.",
    desc: "How to make a Japanese gamaguchi clasp purse. Sew an outer and a lining bag, join them around the opening, then glue the fabric into the metal clasp. Perfect for coins or small accessories.",
    keywords: "gamaguchi,clasp purse,coin purse,metal frame purse,how to sew,sewing pattern,handmade",
    lead: "The gamaguchi is the classic Japanese coin purse with a satisfying snap clasp. Enter your clasp size and the tool works out the matching fabric pattern. Fusible interfacing on the outer gives the purse body that plump, structured look.",
    matNote: "a 10.5 cm clasp purse",
    materials: [
      "Outer fabric — about 25 × 30 cm (10 × 12 in)",
      "Lining fabric — the same size",
      "Fusible interfacing — the same size",
      "Insert-type metal clasp (gamaguchi frame) — your chosen size",
      "Paper cord (often supplied with the clasp)",
      "Awl, plus craft glue or clasp-specific adhesive"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace onto the wrong side of the fabric. Fuse interfacing to the outer so it sits firmly in the clasp.",
      "<strong>Cut the pieces</strong><br>Cut 2 outer and 2 lining. The dashed line at the top edge of the pattern is the clasp position.",
      "<strong>Check against the clasp</strong><br>Before sewing, hold the actual clasp against the top edge to confirm the width and curve match — this avoids surprises later."
    ],
    sew: [
      {
        h: "4-1. Sew the bags",
        items: [
          "Place the 2 outer pieces right sides together and sew the sides and bottom below the clasp line (dashed). Leave the part above the line unsewn.",
          "Sew the lining the same way, leaving a turning gap on one side.",
          "For a flat base, pinch each bottom corner into a triangle and sew across."
        ]
      },
      {
        h: "4-2. Join outer and lining",
        items: [
          "Turn the outer right side out and slip it inside the lining (still wrong side out), right sides together.",
          "Sew around the curved opening where the clasp will attach.",
          "Turn everything right side out through the gap in the lining, close the gap, and shape the opening."
        ]
      },
      {
        h: "4-3. Fit the clasp",
        items: [
          "Run craft glue (or clasp adhesive) into the channel of the metal frame.",
          "Push the fabric edge into the channel with an awl, working from the center out to each end so it stays even.",
          "Press paper cord into the channel alongside the fabric to lock it in place.",
          "With a scrap of cloth protecting the metal, gently squeeze the clasp ends with pliers. Let it dry and you are done."
        ]
      }
    ],
    tips: [
      "<strong>Plumper body</strong>: interface both outer and lining for a rounder, firmer purse.",
      "<strong>Clasp won't fit</strong>: the fabric edge may be too thick — use lighter interfacing or thinner paper cord.",
      "<strong>First clasp</strong>: an insert-type frame around 10.5 cm is the easiest to learn on."
    ]
  },

  panel: {
    title: "Fabric panel (square)",
    tab: "bag",
    toolName: "Fabric panel (square)",
    sizeStep: "Enter the finished width and height. Turn on \"left edge on the fold\" to cut symmetrically from folded fabric.",
    desc: "How to make a simple fabric panel — the building block of cushion covers, bag panels, placemats and pouch bases. Enter a width and height for a seam-allowance-included pattern. Shown here as an envelope cushion cover.",
    keywords: "fabric panel,square,cushion cover,envelope cushion,how to sew,sewing pattern,beginner",
    lead: "A plain rectangle of fabric is the foundation of countless projects — cushion covers, bag panels, placemats, pouch bases. Enter a width and height and the tool adds seam allowance for you. Here we use it to make an envelope-back cushion cover.",
    matNote: "a 40 × 40 cm cushion cover",
    materials: [
      "Fabric — your finished size plus seam allowance",
      "For a cushion cover: a cushion insert"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line (outer solid) and seam line (inner dashed) onto the wrong side; align the grain with the grain line.",
      "<strong>Cut the pieces</strong><br>Cut as many as you need. For an envelope cushion, cut one front plus a back with extra overlap.",
      "<strong>Finish the edges</strong><br>Zigzag or overlock the seam edges if the fabric frays."
    ],
    sew: [
      {
        h: "4-1. Envelope cushion cover",
        items: [
          "Split the back into two pieces; on each, hem the opening edge with a double fold.",
          "Lay the front right side up, then layer the two back pieces on top right sides together so their openings overlap at the center.",
          "Sew all four sides at the seam allowance.",
          "Trim the corners diagonally and turn right side out through the opening.",
          "Shape it, insert the cushion through the center opening, and you are done."
        ]
      }
    ],
    tips: [
      "<strong>Snug fit</strong>: make a cushion cover 1–2 cm smaller than the insert for a plump finish.",
      "<strong>Match the print</strong>: with checks or stripes, adjust the cutting position so front and back line up.",
      "<strong>So versatile</strong>: the same square becomes a bag, pouch, mat or cover depending on how you sew it."
    ]
  },

  clutchbag: {
    title: "Clutch bag",
    tab: "bag",
    toolName: "Clutch bag",
    sizeStep: "Enter the width, body height and flap depth, or pick a card-case / clutch S/M/L preset. The body is cut as one piece folded on the bottom \"wa\".",
    desc: "How to make a long-wallet-style clutch bag from just two pieces — body and flap. Add a zip or simply fold the flap over. Canvas, faux leather or cotton takes it from casual to formal.",
    keywords: "clutch bag,clutch,wallet bag,faux leather,how to sew,sewing pattern,flap bag",
    lead: "This clutch folds at the bottom on the \"wa\" (fold), so the body is a single piece. With just a body and a flap, you can add a zip or simply snap the flap shut. Canvas, denim or faux leather makes it casual; a refined print makes it formal.",
    matNote: "a size-M clutch",
    materials: [
      "Outer fabric (canvas, cotton, denim, faux leather) — about 30 × 80 cm (12 × 31 in)",
      "Lining (quilting cotton, etc.) — the same amount",
      "Zip (optional) — about 25 cm",
      "Fusible interfacing (on the outer keeps the shape) — the same amount",
      "1 magnetic or metal snap for the flap"
    ],
    cut: [
      "<strong>Cut the body</strong><br>Place the pattern's bottom edge (the \"wa\") on the fold and cut one outer and one lining. Unfolded, the body is twice the storage height.",
      "<strong>Cut the flap</strong><br>Cut one outer and one lining flap (2 pieces total).",
      "<strong>Interface</strong><br>Fuse interfacing to the wrong side of the outer body and flap and press."
    ],
    sew: [
      {
        h: "4-1. Make the flap",
        items: [
          "Place the flap outer and lining right sides together and sew around, leaving a 5–6 cm turning gap.",
          "Clip the curved seam allowance, turn right side out, and close the gap with a slip stitch or edge stitch.",
          "Fit the female half of the magnetic snap centered on the flap lining."
        ]
      },
      {
        h: "4-2. Make the body",
        items: [
          "Fold the outer body in half at the bottom \"wa\".",
          "With outer-to-outer and lining-to-lining right sides together, sew both side seams.",
          "Turn the outer right side out and fit the male half of the snap centered on the front (flap side).",
          "Slip the lining inside the outer and join them at the opening. To add a zip, sew the zip tape into the opening at this stage."
        ]
      },
      {
        h: "4-3. Attach the flap",
        items: [
          "Sew the flap to the top edge of the back opening to finish.",
          "For a zip-only version without a flap, skip this step."
        ]
      }
    ],
    tips: [
      "<strong>Add a zip</strong>: sewing a zip into the opening makes storage more secure; combine it with the flap for a double closure.",
      "<strong>Inner pocket</strong>: a small divider pocket on the lining makes a handy card and coin slot.",
      "<strong>Wrist strap</strong>: catch a leather cord or D-ring in the side seam to make a wristlet."
    ]
  },

  shoulderbag: {
    title: "Shoulder bag (flap)",
    tab: "bag",
    toolName: "Shoulder bag (flap)",
    sizeStep: "Enter the width, height, flap depth, strap length and strap width, or pick a mini / standard / A4 preset. The pattern gives body, flap and strap pieces.",
    desc: "How to make a simple flap shoulder bag from three pieces — body, flap and strap. A lined body with a flap that snaps shut. Canvas, faux leather or cotton suits both casual and smart looks.",
    keywords: "shoulder bag,crossbody bag,flap bag,how to sew,sewing pattern,messenger bag",
    lead: "Three pieces — body, flap and strap — make this easygoing shoulder bag. The body is lined, the flap folds over and snaps shut, and the strap clips on with swivel hooks. Choose canvas, denim or faux leather to set the mood.",
    matNote: "a standard-size bag",
    materials: [
      "Outer fabric (canvas, denim, faux leather) — about 40 × 90 cm (16 × 35 in)",
      "Lining (cotton, quilting) — the same amount",
      "Fusible interfacing (on the outer keeps the shape) — the same amount",
      "Strap webbing (about 2.5 cm wide cotton or nylon tape) — about 120 cm, adjustable",
      "1 swivel hook and 1 rectangle ring",
      "1 magnetic or metal snap for the flap"
    ],
    cut: [
      "<strong>Cut the body</strong><br>Cut 2 outer and 2 lining body pieces (4 total) for front and back.",
      "<strong>Cut the flap</strong><br>Cut one outer and one lining flap.",
      "<strong>Cut the strap</strong><br>Cut one strap piece, or cut ready-made webbing to length.",
      "<strong>Interface</strong><br>Fuse interfacing to the wrong side of the outer body and flap and press."
    ],
    sew: [
      {
        h: "4-1. Make the flap",
        items: [
          "Place the flap outer and lining right sides together and sew around, leaving a 5–6 cm turning gap on the top edge.",
          "Clip the corners and curves, turn right side out, and close the gap with a slip or edge stitch.",
          "Fit the female snap centered and slightly low on the flap lining."
        ]
      },
      {
        h: "4-2. Make the body",
        items: [
          "Place the front and back outer pieces right sides together and sew the bottom and both sides; round the corners if you like.",
          "Sew the lining the same way, leaving about a 10 cm gap in the bottom seam.",
          "Turn the outer right side out and fit the male snap on the front, where the flap lands."
        ]
      },
      {
        h: "4-3. Prepare the strap",
        items: [
          "Fold the strap fabric right sides together along the long edge, sew, and turn right side out (skip for ready-made webbing).",
          "Thread each end through the swivel hook and rectangle ring, fold back and stitch to secure."
        ]
      },
      {
        h: "4-4. Finish",
        items: [
          "Catch the strap ends (or D-rings) at the top of each side seam of the outer.",
          "Slip the lining inside the outer and sew them together around the opening.",
          "Pull everything right side out through the gap in the lining and close the gap.",
          "Sew the flap to the top of the back opening to finish."
        ]
      }
    ],
    tips: [
      "<strong>Add a gusset</strong>: sew a triangle at each bottom corner for a boxed base — 4–6 cm gives a roomy, stand-up shape.",
      "<strong>Inner pocket</strong>: a zip or slip pocket on the lining front makes it far more practical.",
      "<strong>Adjustable strap</strong>: add a slide buckle with the rectangle ring for a two-way shoulder/crossbody length."
    ]
  },

  dogsleeved: {
    title: "Dog clothes (sleeved)",
    tab: "pet",
    toolName: "Dog clothes (sleeved)",
    sizeStep: "Enter the same measurements as the tank, plus front-leg circumference, sleeve length and sleeve ease. Presets cover small / medium / large dogs.",
    desc: "How to make a sleeved dog coat — a sleeveless tank with tube sleeves added for the front legs. Because front-leg shape varies so much, fit the tank body first, then add the sleeves.",
    keywords: "dog clothes,dog coat,sleeved dog wear,pet clothes,how to sew,sewing pattern,knit",
    lead: "This warm dog coat is a sleeveless tank with tube sleeves added for the front legs. Front-leg shape varies hugely between dogs, so the trick is to fit the back and belly panels as a tank first, then make the sleeves — that way the armholes never end up in the wrong place.",
    matNote: "a medium dog (size M)",
    materials: [
      "Knit (stretch) fabric — about 60 × 80 cm (24 × 31 in)",
      "Ballpoint (knit) machine needle and thread",
      "Optional ribbing for the openings"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side; align the grain with the grain line.",
      "<strong>Cut the pieces</strong><br>Cut one back and one belly panel (center on the fold) and 2 sleeves. Mark the front-leg notches accurately.",
      "<strong>Finish the edges</strong><br>Zigzag or overlock the seam edges if the fabric frays."
    ],
    sew: [
      {
        h: "4-1. Fit the tank first",
        items: [
          "Baste the sides of the back and belly panels, leaving the front-leg openings, and try it on your dog to check the body size.",
          "If it fits, sew the sides for real (leave the front-leg openings open)."
        ]
      },
      {
        h: "4-2. Make the sleeves",
        items: [
          "Roll each front-leg sleeve right sides together and sew into a tube.",
          "Fold and stitch a hem at the cuff."
        ]
      },
      {
        h: "4-3. Attach the sleeves",
        items: [
          "Pin each sleeve into a front-leg opening (between the notches), right sides together, and sew.",
          "Repeat for the other side."
        ]
      },
      {
        h: "4-4. Finish",
        items: [
          "Fold and finish the neckline and hem with a knit stitch.",
          "Try it on, check that your dog can move freely, and you are done."
        ]
      }
    ],
    tips: [
      "<strong>Loose sleeves</strong>: add a little extra sleeve ease so the front legs move freely and it's easy to put on.",
      "<strong>Warmer</strong>: brushed knit or fleece makes a cozy coat for cold-weather walks.",
      "<strong>Build up to it</strong>: if sleeves feel daunting, make the sleeveless dog tank first to lock in your dog's measurements."
    ]
  },

  mannerbelt: {
    title: "Dog belly band",
    tab: "pet",
    toolName: "Dog belly band",
    sizeStep: "Measure your dog's belly circumference and enter it, then set the finished band width and the hook-and-loop overlap. Presets cover small / medium / large dogs.",
    desc: "How to make a dog belly band (manner belt) to prevent marking. Fold the fabric in half lengthwise into a tube, sew, and close with hook-and-loop. Slip a pad or pet sheet inside for use.",
    keywords: "belly band,manner belt,dog marking,male dog,how to sew,sewing pattern,pet",
    lead: "Wrapped around the belly, a manner belt helps prevent marking. The construction couldn't be simpler: fold the fabric lengthwise into a tube, sew, and close with hook-and-loop tape. Tuck a waterproof pad or pet sheet inside in use.",
    matNote: "a medium dog (size M)",
    materials: [
      "Fabric (cotton, quilting) — belly circumference + overlap × band width × 2",
      "Hook-and-loop tape — about 5 cm × the band width",
      "Optional waterproof fabric for the inside"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line onto the wrong side; align the grain with the grain line.",
      "<strong>Cut one rectangle</strong><br>Cut a single rectangle (cut width is twice the finished width, since it folds lengthwise). The pattern marks the fold line and the hook-and-loop positions.",
      "<strong>Finish the edges</strong><br>Zigzag or overlock the seam edges if the fabric frays."
    ],
    sew: [
      {
        h: "4-1. Sew the band",
        items: [
          "Fold the fabric right sides together lengthwise and sew the long edge and one short edge, leaving the other short edge open as a turning gap.",
          "Trim the corners, turn right side out through the gap, and press.",
          "Close the gap and topstitch all the way around.",
          "Sew the hook-and-loop tape at the marked positions — one half on the front near one end, the other half on the back near the opposite end, so it fastens when wrapped.",
          "Sew waterproof fabric inside, or just tuck in a pet sheet in use, and you are done."
        ]
      }
    ],
    tips: [
      "<strong>Stay dry</strong>: sew in a waterproof layer or use a pet sheet; make a few so you always have a clean one.",
      "<strong>Not too tight</strong>: keep enough ease in the overlap so the belly is never squeezed.",
      "<strong>Gentle inside</strong>: choose soft cotton or gauze for the side against the skin so your dog tolerates it."
    ]
  },

  petbandana: {
    title: "Pet bandana",
    tab: "pet",
    toolName: "Pet bandana",
    sizeStep: "Enter the top (neck) edge, the drop length and the collar-channel fold-back, or pick a small / medium / large preset. The single triangle pattern folds at the top into a collar channel.",
    desc: "How to make a slip-on pet bandana. The top edge folds into a channel that threads onto the collar, so there's nothing to tie and it goes on and off in seconds. Great for walks and photo days.",
    keywords: "pet bandana,dog bandana,cat bandana,collar bandana,how to sew,sewing pattern,no tie",
    lead: "Thread it onto the collar and your dog or cat instantly looks the part. Because the top edge folds into a channel that the collar passes through, there's nothing to tie — it slips on and off in seconds. Lovely for walks, outings and birthday photos.",
    matNote: "a medium dog",
    materials: [
      "Fabric (cotton, oxford) — about 30 cm (12 in) square",
      "For a double-layer version, two pieces"
    ],
    cut: [
      "<strong>Cut</strong><br>Cut from the triangle pattern: one piece for a single layer, two for a double layer.",
      "<strong>Finish the edges</strong><br>For a single layer, triple-fold hem the three edges. For a double layer, sew right sides together and turn."
    ],
    sew: [
      {
        h: "4-1. Finish the two drop edges",
        items: [
          "Single layer: triple-fold hem the two diagonal edges.",
          "Double layer: sew right sides together except the top edge, then turn right side out."
        ]
      },
      {
        h: "4-2. Make the collar channel",
        items: [
          "Fold the top edge back by the channel amount and sew, forming a tunnel the collar can pass through."
        ]
      },
      {
        h: "4-3. Thread the collar",
        items: [
          "Pass the collar through the channel, then put the collar on your dog or cat as usual."
        ]
      }
    ],
    tips: [
      "<strong>Channel width</strong>: check your collar's width plus a little ease before deciding the fold-back, so it threads smoothly.",
      "<strong>Seasonal prints</strong>: make them in holiday or seasonal fabrics for photogenic results.",
      "<strong>Name embroidery</strong>: stitch a name on the point to double as an ID tag."
    ]
  },

  petsnood: {
    title: "Pet snood",
    tab: "pet",
    toolName: "Pet snood",
    sizeStep: "Enter the neck circumference, length and ease, or pick a small / medium / large preset. The single rectangle pattern is sewn into a tube and hemmed (or threaded with elastic).",
    desc: "How to make a tube-style dog snood. It keeps long ears clean at mealtimes and warm on cold days. Just sew the long edge into a tube; add elastic on one side for a gentle face-side fit.",
    keywords: "dog snood,neck warmer,ear cover,floppy ears,how to sew,sewing pattern,pet",
    lead: "A simple tube snood keeps a floppy-eared dog's ears out of the food bowl and warm on chilly days. You just sew the long edge into a tube; thread elastic through one end and it hugs the face gently.",
    matNote: "a medium dog",
    materials: [
      "Fabric (fleece, knit, cotton) — a rectangle of tube circumference + length",
      "Optional 1 cm wide flat elastic — your dog's neck measurement"
    ],
    cut: [
      "<strong>Cut one piece</strong><br>Cut a single rectangle. With stretch knit, mind the grain direction.",
      "<strong>Finish the edges</strong><br>Finish the seam edges (skip for fleece, which doesn't fray)."
    ],
    sew: [
      {
        h: "4-1. Sew the tube",
        items: [
          "Fold the fabric right sides together and sew the long edge into a tube."
        ]
      },
      {
        h: "4-2. Finish the ends",
        items: [
          "Fold and hem the top and bottom edges.",
          "Make one end a casing and thread elastic sized to the neck so the face side gathers in."
        ]
      }
    ],
    tips: [
      "<strong>Meals vs warmth</strong>: make a washable cotton one for meals and a fleece one for warmth.",
      "<strong>Adjust the ease</strong>: a narrower face side stays on better; a wider neck side is easier to slip on.",
      "<strong>Spares</strong>: they get dirty quickly, so a few on hand is reassuring."
    ]
  },

  catfuku: {
    title: "Cat clothes (tank top)",
    tab: "pet",
    toolName: "Cat clothes (tank top)",
    sizeStep: "Enter the chest, body length, belly length, neck, front-leg position, front-leg width and ease, or pick a kitten / standard / large preset. Recommended seam allowance 0.7 cm.",
    desc: "How to make a cat tank top — a tube top joining a back and a belly panel, with wide front-leg openings for easy on and off. Soft knit or cotton keeps your cat comfortable.",
    keywords: "cat clothes,cat tank top,cat shirt,pet clothes,how to sew,sewing pattern,knit",
    lead: "This cat top is a tube made by joining a back panel and a belly panel, with the front-leg openings cut extra wide for easy dressing. Cats tolerate clothes best in soft, light, stretchy knit — start with short wearing sessions.",
    matNote: "a standard cat",
    materials: [
      "Fabric (jersey knit, smooth knit, cotton) — about 30 × 40 cm (12 × 16 in)",
      "Bias tape or rib knit for the neck and front-leg openings — enough for each circumference"
    ],
    cut: [
      "<strong>Cut the back panel</strong><br>Cut one back panel — a trapezoid that's narrow at the neck and wider at the rear.",
      "<strong>Cut the belly panel</strong><br>Cut one belly panel — shorter than the back, with large front-leg cut-outs.",
      "<strong>Finish the edges</strong><br>Zigzag or overlock the seam edges of each piece."
    ],
    sew: [
      {
        h: "4-1. Sew the sides",
        items: [
          "Place the back and belly panels right sides together and sew both sides (behind the front-leg openings).",
          "Press the seams open or to one side."
        ]
      },
      {
        h: "4-2. Finish the neckline",
        items: [
          "Measure the neckline and cut bias tape or rib into a loop about 85–90% of the neckline length.",
          "Sew it on while stretching slightly, then press the seam allowance inward."
        ]
      },
      {
        h: "4-3. Finish the front-leg openings",
        items: [
          "Sew bias tape or rib around each front-leg opening, easing it along the curve without pulling."
        ]
      },
      {
        h: "4-4. Hem",
        items: [
          "Triple-fold the hem, press, and topstitch 2 mm from the edge."
        ]
      }
    ],
    tips: [
      "<strong>Easy on and off</strong>: widen the neck a little, or add buttons/snaps at the back. Never force it — start with short sessions.",
      "<strong>How to measure</strong>: take the chest at the widest point just behind the front legs, and the body length from the base of the neck to the base of the tail. Allow at least 5 cm of ease.",
      "<strong>Have fun with prints</strong>: stripes or florals look great; use lightweight interfacing for comfort."
    ]
  },

  petvest: {
    title: "Pet vest",
    tab: "pet",
    toolName: "Pet vest",
    sizeStep: "Enter the chest, body length, belly length, neck, front-leg position, front-leg width and ease, or pick a cat / mame-shiba / small / medium / large preset. Recommended seam allowance 0.7 cm.",
    desc: "How to make a pet vest for dogs and cats. A two-piece back-and-belly design with wide front-leg openings, easy to put on either pet. Breathable and unrestrictive — ideal as a summer fashion piece.",
    keywords: "pet vest,dog vest,cat vest,pet clothes,how to sew,sewing pattern,summer",
    lead: "This vest has wide-open front-leg holes and a two-piece back-and-belly design that suits both dogs and cats. It moves freely and stays breathable, making it a great summer wardrobe piece. Knit keeps it stretchy; cotton or linen leans more stylish.",
    matNote: "a small-to-medium dog",
    materials: [
      "Fabric (jersey knit, cotton, linen) — about 30 × 50 cm (12 × 20 in), varies with size",
      "Bias tape or rib knit for the neck and front-leg openings — enough for each circumference"
    ],
    cut: [
      "<strong>Cut the back panel</strong><br>Cut one back panel — narrow at the neck, widening gently toward the hem.",
      "<strong>Cut the belly panel</strong><br>Cut one belly panel with large front-leg cut-outs.",
      "<strong>Finish the edges</strong><br>Zigzag or overlock the seam edges of each piece."
    ],
    sew: [
      {
        h: "4-1. Sew the sides",
        items: [
          "Place the back and belly panels right sides together and sew both sides behind the front-leg openings.",
          "Press the seams open or to one side."
        ]
      },
      {
        h: "4-2. Finish the neckline",
        items: [
          "Measure the neckline and cut bias tape or rib into a loop about 85–90% of the neckline length.",
          "Sew it on while stretching slightly, then press the seam allowance inward."
        ]
      },
      {
        h: "4-3. Finish the front-leg openings",
        items: [
          "Sew bias tape or rib around each front-leg opening, taking the large curves slowly."
        ]
      },
      {
        h: "4-4. Hem",
        items: [
          "Triple-fold the hem, press, and topstitch 2 mm from the edge."
        ]
      }
    ],
    tips: [
      "<strong>How to measure</strong>: chest at the widest point behind the front legs; body length from neck base to tail base. Allow 4–6 cm ease for small dogs, 6–10 cm for large dogs.",
      "<strong>Easier dressing</strong>: snaps or hook-and-loop at the back or belly make changing quick — hook-and-loop is especially fast.",
      "<strong>Dog vs cat</strong>: for cats, add a little more ease (about +2 cm) and widen the front-leg openings so it feels more like a vest and they tolerate it better."
    ]
  },

  /* ===================== adult clothes ===================== */

  tightskirt: {
    title: "Pencil skirt",
    tab: "human",
    toolName: "Pencil skirt",
    sizeStep: "Enter waist, hip, skirt length, hip drop and hem taper. Presets cover S, M, L and XL.",
    desc: "How to sew a pencil skirt with an elastic waist. Only two pieces, both cut on the fold, plus a back slit so you can walk in it.",
    keywords: "pencil skirt,straight skirt,how to sew,sewing pattern,elastic waist,handmade",
    lead: "A slim skirt that follows the waist and hip and tapers slightly to the hem. Front and back are each cut as one piece on the fold, so there are only two pattern pieces. The back slit is what makes it walkable — don't skip it.",
    matNote: "size M",
    materials: [
      "Main fabric (twill, gabardine or wool) — about 110 cm wide × 80 cm (43 × 31 in)",
      "Flat elastic (2–3 cm / 1 in wide) — your waist measurement",
      "Optional: lining fabric"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Lay the pattern on the wrong side of the fabric and trace the cut line and the seam line. Align the grain with the grainline marking.",
      "<strong>Cut</strong><br>Cut the front and back as one piece each, with the center on the fold. If you want a back slit, cut the back open at the center instead and add seam allowance there.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the side seam allowances before you start sewing."
    ],
    sew: [
      { h: "4-1. Sew the sides", items: [
        "Place front and back right sides together and sew both side seams. Pin the hip notches first — matching them keeps the two sides level.",
        "Press the seam allowances open."
      ]},
      { h: "4-2. Make the elastic waist", items: [
        "Fold the waist edge under by the seam allowance, then fold again by the elastic width plus a little ease to make a casing. Topstitch all the way around, leaving a 3 cm (1¼ in) gap to thread the elastic.",
        "Thread the elastic, try it on, overlap and stitch the ends, then close the gap."
      ]},
      { h: "4-3. Hem and slit", items: [
        "At the center back, sew the seam from the waist down to about 15–20 cm (6–8 in) above the hem. The unsewn part is the slit.",
        "Press the slit seam allowances to each side and topstitch them down.",
        "Turn the hem up twice and stitch."
      ]}
    ],
    sewNote: "Without a slit the skirt hangs straight but you cannot take a full stride. If you skip it, either shorten the skirt to above the knee or reduce the hem taper.",
    tips: [
      "<strong>Add a lining</strong>: cut the same pattern in lining fabric and join at the waist. It stops the skirt clinging and looks far more finished.",
      "<strong>Hide the elastic</strong>: make a separate waistband, flat at the front and elasticated only at the back, for a smoother line.",
      "<strong>Room to sit</strong>: too little hip ease and you cannot sit down. Enter your actual hip plus about 4 cm (1½ in)."
    ],
    related: ["skirt", "flareskirt", "pleatskirt", "wrapskirt"]
  },

  pleatskirt: {
    title: "Pleated skirt",
    tab: "human",
    toolName: "Pleated skirt",
    sizeStep: "Enter waist, skirt length, pleat ratio and the visible pleat width. The tool works out how many pleats you get and how much each one folds away.",
    desc: "How to sew a pleated skirt from two rectangles. No curves anywhere — mark, fold, press and add an elastic waist.",
    keywords: "pleated skirt,knife pleats,how to sew,sewing pattern,elastic waist,handmade",
    lead: "A skirt made by folding the fabric at regular intervals. The pattern is two rectangles and there is not a single curve. The tool calculates the number of pleats and how much each one takes up, so all you do is mark and fold. Crisp lightweight fabric holds the pleats best.",
    matNote: "size M at a 3× pleat ratio",
    materials: [
      "Main fabric (polyester, chambray or lightweight wool) — about 110 cm wide × 130 cm (43 × 51 in)",
      "Flat elastic (2–3 cm / 1 in wide) — your waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Both pieces are rectangles, so you can skip printing and mark the measurements from the guide sheet straight onto the fabric.",
      "<strong>Cut</strong><br>Cut two panels. The pleat ratio makes these wide — check you have enough fabric width before you start.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the side seam allowances."
    ],
    sew: [
      { h: "4-1. Join into a loop", items: [
        "Place the two panels right sides together, sew both side seams and press the allowances open."
      ]},
      { h: "4-2. Fold the pleats", items: [
        "Along the waist edge, mark at the interval given as the visible pleat width on the guide sheet.",
        "Fold at the marks, all in the same direction, and pin. The amount each pleat folds away is on the guide sheet.",
        "Baste 2–3 cm (1 in) below the waist edge with a long machine stitch so the pleats cannot shift.",
        "Press the whole thing firmly. If you want the pleats to show all the way down, press them to the hem too."
      ]},
      { h: "4-3. Waist and hem", items: [
        "Fold the waist edge over twice to make a casing and stitch, leaving a 3 cm (1¼ in) gap.",
        "Thread the elastic, fit it to your waist, stitch the ends and close the gap.",
        "Turn the hem up twice and stitch."
      ]}
    ],
    sewNote: "Work in this order: mark → fold and pin every pleat → baste → press. If you sew as you go, a pleat that drifts out of place cannot be corrected without unpicking.",
    tips: [
      "<strong>Pleats that last</strong>: polyester blends take a pressed crease and keep it through the wash. Pure linen will not.",
      "<strong>Fewer pleats</strong>: increase the visible pleat width to about 5 cm (2 in) for a calmer, box-pleat look and far less folding.",
      "<strong>Short on fabric</strong>: drop the pleat ratio to 2–2.5×. The pleats are shallower but still read as pleats."
    ],
    related: ["skirt", "tightskirt", "adultgather", "tieredskirt"]
  },

  wrapskirt: {
    title: "Wrap skirt",
    tab: "human",
    toolName: "Wrap skirt",
    sizeStep: "Enter waist, skirt length, overlap width, hem flare and tie length. Presets cover S, M, L and a wider version.",
    desc: "How to sew a wrap skirt that ties at the waist. One body piece and two ties — no zip, no buttons, and it adjusts as your size changes.",
    keywords: "wrap skirt,tie skirt,how to sew,sewing pattern,beginner,handmade",
    lead: "A skirt you wrap around and tie. One body piece and two ties, with no zip or buttons to fit. It goes on easily, and because it ties, it still fits when your size shifts. Give it a generous overlap and it will not fall open as you walk.",
    matNote: "size M",
    materials: [
      "Main fabric (linen, cotton or double gauze) — about 110 cm wide × 90 cm (43 × 35 in)",
      "Optional: one button to hold the overlap in place"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Lay the pattern on the wrong side of the fabric and trace the cut line and seam line.",
      "<strong>Cut</strong><br>Cut one body piece and two ties.",
      "<strong>Finish the edges</strong><br>The front edges and hem are double-folded, so only the waist edge needs finishing."
    ],
    sew: [
      { h: "4-1. Make the ties", items: [
        "Fold each tie in quarters lengthwise and topstitch the long edge and one short end. Make two."
      ]},
      { h: "4-2. Finish the body", items: [
        "Turn both front edges under twice and stitch.",
        "Hem the lower edge the same way. Where the hem curves, ease it in a little at a time as you fold."
      ]},
      { h: "4-3. Attach the ties and waistband", items: [
        "Baste a tie at each end of the waist edge, pointing inward so they end up on the outside once turned.",
        "Fold the waist edge over twice, catching the ties, and stitch all the way across.",
        "Flip the ties up and stitch across them again — that second line is what stops them pulling out."
      ]}
    ],
    sewNote: "Make a buttonhole in the waistband on one side and pass that tie through it to the outside. The skirt then closes on both the inside and the outside, which is far more secure than tying over the top.",
    tips: [
      "<strong>Overlap generously</strong>: 25 cm (10 in) or more and your leg stays covered when you walk.",
      "<strong>Add a button</strong>: one button on the inner overlap stops the layers sliding apart.",
      "<strong>Make it reversible</strong>: cut the body twice, sew right sides together and turn, and you get a skirt you can wear either way."
    ],
    related: ["skirt", "tightskirt", "adultgather", "culotte"]
  },

  tieredskirt: {
    title: "Tiered skirt",
    tab: "human",
    toolName: "Tiered skirt",
    sizeStep: "Enter waist, the length of each of the three tiers, the gather ratio and the waist casing. The width of each tier is worked out for you.",
    desc: "How to sew a three-tier gathered skirt. Every tier is a rectangle, so it is straight seams all the way — plus an elastic waist.",
    keywords: "tiered skirt,gathered skirt,how to sew,sewing pattern,elastic waist,handmade",
    lead: "A full skirt built from three tiers, each gathered onto the one above and each wider than the last. Every tier is a rectangle, so it is straight sewing throughout, and the tool works out the width of each one.",
    matNote: "size M",
    materials: [
      "Main fabric (lawn, double gauze or linen) — about 110 cm wide × 180 cm (43 × 71 in)",
      "Flat elastic (2–3 cm / 1 in wide) — your waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>All three tiers are rectangles, so marking the measurements straight onto the fabric is quicker than printing.",
      "<strong>Cut</strong><br>Cut two panels for each tier, six pieces in total. Keep them labeled — the tiers look similar once they are off the table.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the side seam allowances of every panel."
    ],
    sew: [
      { h: "4-1. Join each tier into a loop", items: [
        "Sew the two panels of each tier together at both sides. Do this for all three tiers."
      ]},
      { h: "4-2. Gather and join the tiers", items: [
        "Run two rows of long machine stitches along the top edge of tier 2. Pull both bobbin threads until it matches the lower edge of tier 1.",
        "Pin tier 1 and tier 2 right sides together, spreading the gathers evenly, and sew.",
        "Join tier 3 to tier 2 the same way.",
        "Press each seam allowance upward and topstitch from the right side to hold it flat."
      ]},
      { h: "4-3. Waist and hem", items: [
        "Fold the waist edge over twice to make a casing and stitch, leaving a 3 cm (1¼ in) gap.",
        "Thread the elastic, fit, stitch the ends and close the gap.",
        "Turn the hem up twice and stitch."
      ]}
    ],
    sewNote: "Always gather with two rows of stitching and pull both threads together. With a single row the thread snaps halfway along and the gathers come out uneven.",
    tips: [
      "<strong>Mix the fabrics</strong>: use a different fabric for each tier for a patchwork effect.",
      "<strong>Less volume</strong>: drop the gather ratio to 1.3× for a much calmer shape.",
      "<strong>For children</strong>: pick the child preset and you get the twirly skirt they actually want."
    ],
    related: ["adultgather", "pleatskirt", "wrapskirt", "gather"]
  },

  adultvest: {
    title: "Vest",
    tab: "human",
    toolName: "Vest",
    sizeStep: "Enter bust, length, shoulder width, front neck depth and the front overlap. Presets cover women's S/M and men's M/L.",
    desc: "How to sew an open-front vest. Two fronts and one back, with the neckline and armholes bound in bias tape — no sleeves to set in.",
    keywords: "vest,gilet,waistcoat,how to sew,sewing pattern,bias binding,handmade",
    lead: "A sleeveless open-front vest. Two fronts and one back is the whole thing, and as a single layer you simply bind the neckline and armholes with bias tape. Thrown over a plain outfit it changes the whole look.",
    matNote: "women's M",
    materials: [
      "Main fabric (linen, wool or tweed) — about 110 cm wide × 130 cm (43 × 51 in)",
      "Bias tape for the neckline and armholes — about 130 cm (51 in)",
      "Optional: 2–3 buttons"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Lay the pattern on the wrong side of the fabric and trace the cut line and seam line.",
      "<strong>Cut</strong><br>Cut one back with the center on the fold and two fronts, cutting the second with the pattern flipped over.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the shoulder and side seam allowances."
    ],
    sew: [
      { h: "4-1. Sew the shoulders and sides", items: [
        "Place fronts and back right sides together, sew both shoulder seams and press the allowances open.",
        "Sew both side seams and press those open too."
      ]},
      { h: "4-2. Bind the neckline and armholes", items: [
        "Bind in one continuous run: up one front edge, around the neckline and back down the other front edge.",
        "Bind each armhole the same way. Go slowly around the curve and do not pull the tape."
      ]},
      { h: "4-3. Finish", items: [
        "If you have not bound the hem, turn it up twice and stitch.",
        "Add buttons and buttonholes if you want it to fasten."
      ]}
    ],
    sewNote: "Let bias tape follow the curve rather than forcing it. Pull it and the edge puckers; leave it slack and the edge ripples. Feed it in at the rate the tape naturally wants to bend.",
    tips: [
      "<strong>Add a lining</strong>: cut the same pattern in lining, sew right sides together and turn for a properly tailored finish.",
      "<strong>Make it long</strong>: set the length to about 80 cm (31 in) and you have a long gilet to layer over everything.",
      "<strong>Self-fabric binding</strong>: cutting your own bias strips from the main fabric looks far more considered than shop-bought tape."
    ],
    related: ["kidsvest", "cardigan", "jacket", "poncho"]
  },

  cardigan: {
    title: "Cardigan",
    tab: "human",
    toolName: "Cardigan",
    sizeStep: "Enter bust, length, shoulder width, sleeve length, cuff width, neck width and the front band width. Presets cover women's S/M/L and men's M/L.",
    desc: "How to sew a cardigan in knit fabric. Fronts, back and sleeves plus a front band that runs in one piece from hem to hem.",
    keywords: "cardigan,knit cardigan,how to sew,sewing pattern,front band,handmade",
    lead: "An open-front cardigan you can throw on. Beyond the usual fronts, back and sleeves there is a front band — a long strip sewn to the front edges. Add buttons or leave it open. In a stretchy knit it is genuinely comfortable to wear.",
    matNote: "women's M",
    materials: [
      "Main fabric (jersey, interlock or other knit) — about 150 cm wide × 160 cm (59 × 63 in)",
      "Ballpoint machine needle and stretch thread",
      "Optional: 5–6 buttons",
      "Optional: stay tape for the front band"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the back (center on the fold), the fronts, the sleeves and the front band.",
      "<strong>Cut</strong><br>Knit stretches, so cut it lying flat and relaxed — never pull it straight as you cut.",
      "<strong>Finish the edges</strong><br>Knits do not fray, so you can skip finishing, but a serged edge wears better over many washes."
    ],
    sew: [
      { h: "4-1. Shoulders and sleeves", items: [
        "Sew both shoulder seams with a stretch stitch — a straight stitch will snap when you pull the cardigan on.",
        "Match the center of the sleeve head to the shoulder seam and sew each sleeve into its armhole."
      ]},
      { h: "4-2. Sides and underarms", items: [
        "Sew from the cuff, along the underarm and down the side seam in one continuous line.",
        "Line the underarm seams up with each other before you start or the sleeve will twist."
      ]},
      { h: "4-3. Attach the front band", items: [
        "Fold the band in half lengthwise and press.",
        "Sew one long edge of the band to the garment in one continuous run: up the front edge, around the neckline and down the other front edge. Stretch the band very slightly around the neck curve.",
        "Turn the band out, fold the remaining edge under to hide the seam, and topstitch it down."
      ]},
      { h: "4-4. Cuffs and hem", items: [
        "Turn the cuffs and hem under by the seam allowance and finish with a stretch stitch."
      ]}
    ],
    sewNote: "Sew the band as one piece from front edge to front edge without breaking it at the shoulders. A band pieced at the neck never hangs straight once the cardigan is on.",
    tips: [
      "<strong>Add buttons</strong>: work buttonholes in the band. Fuse stay tape behind them first — knit buttonholes stretch out otherwise.",
      "<strong>Make it long</strong>: 70–80 cm (28–31 in) turns it into a longline cardigan.",
      "<strong>Heavier fabric</strong>: sweatshirt fleece or wool knit makes this warm enough to wear as a jacket."
    ],
    related: ["adultvest", "hoodie", "jacket", "blouson"]
  },

  taperedpants: {
    title: "Tapered pants",
    tab: "human",
    toolName: "Tapered pants",
    sizeStep: "Enter hip, rise, inseam, hem width, ease and the waist casing. Presets cover women's S/M/L and men's M/L.",
    desc: "How to sew tapered pants with an elastic waist. Front and back use the same pattern piece, so it is four pieces and three seams.",
    keywords: "tapered pants,trousers,how to sew,sewing pattern,elastic waist,handmade",
    lead: "Roomy through the hip and narrowing towards the hem. Front and back use the same pattern piece, so you cut four and sew — but the taper is what makes them look considered rather than casual. The waist is elastic, so they are as comfortable as they look.",
    matNote: "women's M",
    materials: [
      "Main fabric (twill, linen or stretch woven) — about 110 cm wide × 160 cm (43 × 63 in)",
      "Flat elastic (3 cm / 1¼ in wide) — your waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line, and mark the crotch curve carefully — it is the one line that decides how they fit.",
      "<strong>Cut</strong><br>Cut two fronts and two backs from the same pattern, flipping it for the second of each pair.",
      "<strong>Finish the edges</strong><br>Serge or zigzag the crotch, side and inseam allowances."
    ],
    sew: [
      { h: "4-1. Sew the crotch seams", items: [
        "Put the two front legs right sides together and sew the curved center front seam. Repeat for the backs.",
        "Sew the curve slowly with a shorter stitch length — it takes the strain every time you sit down."
      ]},
      { h: "4-2. Sides and inseams", items: [
        "Open the front and back out, lay them right sides together and sew both side seams.",
        "Sew the inseam in one continuous line from one hem, through the crotch, to the other hem. Backstitch two or three times over the crotch junction."
      ]},
      { h: "4-3. Waist and hem", items: [
        "Fold the waist edge over twice to make a casing and stitch, leaving a 3 cm (1¼ in) gap.",
        "Thread the elastic, fit it, stitch the ends and close the gap.",
        "Turn the hems up twice and stitch."
      ]}
    ],
    sewNote: "Baste the crotch seams and try them on before sewing for real. A shallow rise pulls when you sit and a deep one bags underneath — five minutes of basting saves the whole pair.",
    tips: [
      "<strong>Choosing the length</strong>: an ankle length that shows the ankle bone (about 60 cm / 24 in inseam) looks the most current.",
      "<strong>Press a crease</strong>: after sewing, press a crease down the center front of each leg for a much sharper look.",
      "<strong>Add pockets</strong>: catch a pocket bag in each side seam before you sew it."
    ],
    related: ["pants", "widepants", "sweatpants", "cargopants"]
  },

  culotte: {
    title: "Culottes",
    tab: "human",
    toolName: "Culottes",
    sizeStep: "Enter hip, rise, inseam, hem flare, ease and the waist casing. Presets cover S, M, L and a cropped version.",
    desc: "How to sew wide culottes with an elastic waist. They read as a skirt but move like pants, and the pattern is four straight-ish pieces.",
    keywords: "culottes,gaucho pants,wide leg,how to sew,sewing pattern,handmade",
    lead: "Wide enough through the leg to look like a skirt, but they are pants, so nothing rides up and nothing blows about. Front and back use the same pattern piece and the waist is elastic, which makes this one of the quickest wearable garments in the collection.",
    matNote: "size M",
    materials: [
      "Main fabric (linen, rayon or other fabric with drape) — about 110 cm wide × 170 cm (43 × 67 in)",
      "Flat elastic (3 cm / 1¼ in wide) — your waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line, seam line and the crotch curve.",
      "<strong>Cut</strong><br>Cut two fronts and two backs, flipping the pattern for the second of each pair. The pieces are wide, so lay the fabric out fully before you start.",
      "<strong>Finish the edges</strong><br>Serge or zigzag the seam allowances."
    ],
    sew: [
      { h: "4-1. Sew the crotch seams", items: [
        "Sew the two fronts together along the center front curve, then the two backs the same way.",
        "Clip the curve every 5 mm (¼ in) so it opens out flat."
      ]},
      { h: "4-2. Sides and inseams", items: [
        "Lay front and back right sides together and sew both side seams.",
        "Sew the inseam in one run from hem to hem, reinforcing the crotch junction."
      ]},
      { h: "4-3. Waist and hem", items: [
        "Fold the waist edge over twice, stitch leaving a gap, thread the elastic, fit and close.",
        "Hem the wide legs with a double fold. Because the hem is wider than the leg above it, ease the fabric in a little at a time as you fold."
      ]}
    ],
    sewNote: "Wide hems fight you when you turn them up — the outer edge is longer than the inner one. Press in small sections rather than trying to fold the whole hem at once, or bind the edge with bias tape instead.",
    tips: [
      "<strong>Fabric matters</strong>: culottes live or die on drape. Linen and rayon fall beautifully; stiff cotton makes them look like a tent.",
      "<strong>Cropped version</strong>: a shorter inseam reads more like a skirt; a longer one reads more like wide trousers.",
      "<strong>Add pockets</strong>: side-seam pockets disappear into the width and are genuinely useful here."
    ],
    related: ["widepants", "kidsculotte", "taperedpants", "wrapskirt"]
  },

  poncho: {
    title: "Poncho",
    tab: "human",
    toolName: "Poncho",
    sizeStep: "Enter the width, length, neck opening and neck ease. Presets cover a short cape, standard and a long version.",
    desc: "How to sew a poncho from one piece of fabric with a neck opening cut in it. About as few seams as a garment can have.",
    keywords: "poncho,cape,how to sew,sewing pattern,beginner,wool,handmade",
    lead: "One piece of fabric with a hole for your head. That really is the construction — which makes it a genuine first garment, and still something you will actually wear. Wool or fleece for winter, gauze or linen for a summer layer.",
    matNote: "standard size",
    materials: [
      "Main fabric (wool, fleece, linen or double gauze) — about 140 cm wide × 140 cm (55 × 55 in)",
      "Bias tape for the neckline — about 70 cm (28 in)",
      "Optional: fringe trim or pompoms for the hem"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the outline and the neck opening. Mark the neckline before you cut anything — it is easier to place while the fabric is still square.",
      "<strong>Cut</strong><br>Cut the body, then cut out the neck opening.",
      "<strong>Finish the edges</strong><br>Fleece and boiled wool can be left raw. Anything that frays needs the outer edges hemmed."
    ],
    sew: [
      { h: "4-1. Bind the neckline", items: [
        "Pin bias tape around the neck opening right sides together and sew.",
        "Clip the seam allowance every 5 mm (¼ in) around the curve, turn the tape to the inside and topstitch it down.",
        "Without those clips the neckline will not lie flat, however carefully you sew."
      ]},
      { h: "4-2. Hem the outer edges", items: [
        "Turn the outer edges under twice and stitch.",
        "At the corners, fold one side first and then the other so the layers do not build up."
      ]},
      { h: "4-3. Finish", items: [
        "Add fringe or pompoms along the hem if you like.",
        "Try it on and check the neckline sits where you want it — you can still adjust the drape by shifting the opening slightly."
      ]}
    ],
    sewNote: "Check the neck opening will actually go over your head before you bind it. Once the tape is on, enlarging it means unpicking. Measure around your head, not around your neck.",
    tips: [
      "<strong>Fleece is the shortcut</strong>: it does not fray, so you only finish the neckline and you are done in an hour.",
      "<strong>Add a hood</strong>: attach the hood pattern from the hoodie to the neck opening instead of binding it.",
      "<strong>Make it uneven</strong>: cutting the front shorter than the back keeps it out of the way while still covering your back."
    ],
    related: ["gown", "babycape", "adultvest", "petcape"]
  },

  overall: {
    title: "Overalls (dungarees)",
    tab: "human",
    toolName: "Overalls (dungarees)",
    sizeStep: "Enter hip, rise, inseam, bib width and height, strap length and width, ease and the waist casing. Presets cover S, M, L and a cropped version.",
    desc: "How to sew overalls with an elastic waist. Pants plus a bib and two straps — no fly, no zip and no buttonholes.",
    keywords: "overalls,dungarees,how to sew,sewing pattern,bib,elastic waist,handmade",
    lead: "Pants with a bib and straps. Because the waist is elastic there is no fly, no zip and no buttonholes — the hard parts of a normal pair of trousers are simply absent. Denim or linen both work; denim reads as workwear, linen as summer.",
    matNote: "size M",
    materials: [
      "Main fabric (denim, linen or twill) — about 110 cm wide × 220 cm (43 × 87 in)",
      "Flat elastic (2.5–3 cm / 1 in wide) — for the back waist",
      "Overall buckles and buttons — 2 sets",
      "Optional: fabric for a bib pocket"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the legs, the bib and the straps.",
      "<strong>Cut</strong><br>Cut two fronts and two backs, the bib in outer and lining, and two straps.",
      "<strong>Finish the edges</strong><br>Serge or zigzag the crotch, side and inseam allowances."
    ],
    sew: [
      { h: "4-1. Make the bib and straps", items: [
        "Sew the bib outer and lining right sides together, leaving the lower edge open. Turn, press and topstitch the edges.",
        "Fold each strap in quarters lengthwise and topstitch both long edges. Make two.",
        "If you want a bib pocket, sew it on now while the bib is still flat."
      ]},
      { h: "4-2. Sew the legs", items: [
        "Sew the two fronts together at the center front curve, then the two backs.",
        "Lay them right sides together and sew both side seams, then the inseam in one run from hem to hem. Reinforce the crotch junction."
      ]},
      { h: "4-3. Attach the bib and straps", items: [
        "Pin the lower edge of the bib to the center front waist edge, right sides together, and sew.",
        "Baste the strap ends to the back waist edge, crossing them if you prefer.",
        "Fold the waist edge over twice to make a casing, catching the bib and straps, and stitch — leaving a gap at the back for the elastic.",
        "Thread elastic through the back section only, so the front stays flat."
      ]},
      { h: "4-4. Finish", items: [
        "Fit the buckles to the strap ends and sew the buttons to the bib.",
        "Turn the hems up twice and stitch."
      ]}
    ],
    sewNote: "Elasticate the back of the waist only. Run elastic all the way round and the bib gathers up and sits badly; a flat front with a stretchy back is what makes overalls fit.",
    tips: [
      "<strong>Adjustable straps</strong>: overall buckles let you set the length after you have made them, which matters more than you would think.",
      "<strong>Cross the straps</strong>: crossing them at the back stops them sliding off your shoulders.",
      "<strong>Denim needle</strong>: heavy denim will break a universal needle at the seam intersections. Use a jeans needle."
    ],
    related: ["kidsrompers", "taperedpants", "cargopants", "kidsbibapron"]
  },

  dolman: {
    title: "Dolman-sleeve top",
    tab: "human",
    toolName: "Dolman-sleeve top",
    sizeStep: "Enter bust, length, sleeve reach from center, cuff width, neck width and ease. Presets cover S, M, L and a cropped version.",
    desc: "How to sew a dolman top where the body and sleeve are cut as one piece. No sleeve to set in, so there is nothing to ease.",
    keywords: "dolman sleeve,batwing top,how to sew,sewing pattern,no set-in sleeve,handmade",
    lead: "The body and sleeve are cut as one piece, so there is no armhole to ease a sleeve into — the single step that puts most people off making tops. Two pieces, four seams. Jersey or anything with drape.",
    matNote: "size M",
    materials: [
      "Main fabric (jersey, rayon or other fabric with drape) — about 150 cm wide × 130 cm (59 × 51 in)",
      "Bias tape or ribbing for the neckline — about 60 cm (24 in)",
      "Ballpoint needle and stretch thread if using knit"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the front and back. Both are wide — the sleeve is part of the piece — so check your fabric width first.",
      "<strong>Cut</strong><br>Cut one front and one back, each with the center on the fold.",
      "<strong>Finish the edges</strong><br>Serge or zigzag the shoulder, underarm and side allowances."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Place front and back right sides together and sew along the top edge, from the neckline out to the cuff.",
        "This one seam forms the shoulder and the top of the sleeve at the same time."
      ]},
      { h: "4-2. Sew the underarm and sides", items: [
        "Sew from the cuff, through the underarm curve and down to the hem in one continuous line.",
        "Clip into the underarm curve — it is a tight corner and will pull if you do not."
      ]},
      { h: "4-3. Finish the neckline", items: [
        "Bind the neckline with bias tape, or attach ribbing stretched slightly as you sew.",
        "Ribbing should be about 85% of the neckline length so it pulls in and sits flat."
      ]},
      { h: "4-4. Cuffs and hem", items: [
        "Turn the cuffs and hem under twice and stitch."
      ]}
    ],
    sewNote: "The underarm is the one place this shape can fail. It is a tight curve carrying all the movement, so clip the allowance and sew a second line just outside the first before you clip.",
    tips: [
      "<strong>Fabric with drape</strong>: the whole point of a dolman is the fold of fabric under the arm. Stiff cotton looks boxy.",
      "<strong>Cropped version</strong>: shortening the body makes it work over high-waisted skirts and trousers.",
      "<strong>Longer sleeve</strong>: increasing the sleeve reach gives a full batwing."
    ],
    related: ["tee", "tunic", "raglantee", "cardigan"]
  },

  hoodie: {
    title: "Hoodie",
    tab: "human",
    toolName: "Hoodie",
    sizeStep: "Enter bust, length, shoulder width, sleeve length, cuff width, hood height and ease. Presets cover women's M, men's M/L and a relaxed fit.",
    desc: "How to sew a pullover hoodie. Front, back, two sleeves and a hood — and the hood is just two pieces sewn together and attached to the neckline.",
    keywords: "hoodie,hooded sweatshirt,how to sew,sewing pattern,fleece,knit,handmade",
    lead: "A pullover hoodie in four pattern pieces. The hood looks like the difficult part but it is two pieces sewn right sides together and then joined to the neckline. Sweatshirt fleece or French terry has enough body to sew easily and enough stretch to be comfortable.",
    matNote: "men's M",
    materials: [
      "Main fabric (French terry, sweatshirt fleece or other knit) — about 150 cm wide × 180 cm (59 × 71 in)",
      "Ballpoint machine needle and stretch thread",
      "Optional: ribbing for the cuffs and hem",
      "Optional: cord for the hood (about 120 cm / 47 in) and eyelets"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the front, back, sleeves and hood.",
      "<strong>Cut</strong><br>Cut one front and one back (each on the fold), two sleeves and two hood pieces. Cut knit lying flat and relaxed.",
      "<strong>Finish the edges</strong><br>Serge or zigzag the allowances. Knits do not fray, but the edges wear better finished."
    ],
    sew: [
      { h: "4-1. Shoulders and sleeves", items: [
        "Sew both shoulder seams with a stretch stitch.",
        "Match the center of each sleeve head to the shoulder seam and sew the sleeves into the armholes while the garment is still flat."
      ]},
      { h: "4-2. Sides and underarms", items: [
        "Sew from the cuff along the underarm and down the side in one continuous line, lining the underarm seams up first."
      ]},
      { h: "4-3. Make and attach the hood", items: [
        "Sew the two hood pieces right sides together along the curved back edge.",
        "Turn the front edge of the hood under twice and stitch. If you are adding a cord, this fold is the channel it runs through.",
        "Pin the lower edge of the hood to the neckline right sides together, matching the notches, and sew all the way around."
      ]},
      { h: "4-4. Cuffs and hem", items: [
        "Turn the cuffs and hem under and finish with a stretch stitch.",
        "For ribbing, sew it into a loop, fold in half and attach it stretched slightly as you sew."
      ]}
    ],
    sewNote: "Hood order matters: sew the back curve, then finish the front edge, then attach it to the neckline. Leave the front edge until last and you will be trying to fold a narrow hem inside a hood that is already attached.",
    tips: [
      "<strong>Ribbing looks shop-bought</strong>: cuff and hem ribbing cut to about 85% of the opening is what makes a home-made hoodie stop looking home-made.",
      "<strong>Add a kangaroo pocket</strong>: a trapezoid with the top and bottom turned under, topstitched to the front before you sew the sides.",
      "<strong>If knits scare you</strong>: a walking foot feeds the layers evenly and removes most of the difficulty."
    ],
    related: ["kidshoodie", "cardigan", "raglantee", "sweatpants"]
  },

  raglantee: {
    title: "Raglan T-shirt",
    tab: "human",
    toolName: "Raglan T-shirt",
    sizeStep: "Enter bust, length, raglan seam length, sleeve length, cuff width, neck width and ease. Presets cover women's M, men's M/L and a relaxed fit.",
    desc: "How to sew a raglan tee. The sleeve runs to the neckline in one piece, so there is no shoulder seam and no armhole curve to ease.",
    keywords: "raglan t-shirt,raglan sleeve,how to sew,sewing pattern,knit,baseball tee,handmade",
    lead: "On a raglan the sleeve reaches all the way to the neckline, so there is no shoulder seam and no set-in armhole. Four long straight-ish seams and you have a shirt. Cut the sleeves in a contrast fabric for the classic baseball look.",
    matNote: "men's M",
    materials: [
      "Main fabric (jersey or interlock) — about 150 cm wide × 150 cm (59 × 59 in)",
      "Optional: contrast knit for the sleeves",
      "Ribbing for the neckline — about 60 cm (24 in)",
      "Ballpoint machine needle and stretch thread"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the front, back and raglan sleeves. Mark the notches on the raglan seams — they are what keeps front and back level.",
      "<strong>Cut</strong><br>Cut one front and one back on the fold, plus two sleeves.",
      "<strong>Finish the edges</strong><br>Serge or zigzag the raglan and side allowances."
    ],
    sew: [
      { h: "4-1. Sew the raglan seams", items: [
        "Pin the front edge of one sleeve to the front raglan edge, matching the notches, and sew.",
        "Sew the back edge of the same sleeve to the back. Repeat for the other sleeve.",
        "All four raglan seams are slightly curved. Match the notches first and the curves fall into place."
      ]},
      { h: "4-2. Sides and underarms", items: [
        "Sew from the cuff along the underarm and down the side in one continuous line on each side."
      ]},
      { h: "4-3. Attach the neckband", items: [
        "Sew the ribbing into a loop and fold it in half lengthwise.",
        "Pin it to the neckline in quarters and sew, stretching the ribbing to fit as you go.",
        "Cut the ribbing to about 85% of the neckline length — any longer and the neck gapes."
      ]},
      { h: "4-4. Cuffs and hem", items: [
        "Turn the cuffs and hem under and finish with a stretch stitch."
      ]}
    ],
    sewNote: "The four raglan seams are the whole garment, so the notches matter more here than anywhere else. Pin notch to notch first, then fill in between — starting at one end guarantees you run out of fabric at the other.",
    tips: [
      "<strong>Contrast sleeves</strong>: the classic baseball tee. It costs nothing extra and transforms the look.",
      "<strong>Easier than a set-in sleeve</strong>: no easing, no sleeve cap. If set-in sleeves have put you off, start here.",
      "<strong>Three-quarter sleeves</strong>: a shorter sleeve length gives the classic raglan proportions."
    ],
    related: ["tee", "hoodie", "kidsraglan", "dolman"]
  },

  sweatpants: {
    title: "Sweatpants (joggers)",
    tab: "human",
    toolName: "Sweatpants (joggers)",
    sizeStep: "Enter hip, rise, inseam, hem width, hem ribbing height, ease and the waist casing. Presets cover S, M, L and a cropped version.",
    desc: "How to sew sweatpants with ribbed cuffs and an elastic waist. Front and back share a pattern piece.",
    keywords: "sweatpants,joggers,track pants,how to sew,sewing pattern,French terry,handmade",
    lead: "Sweatpants gathered into ribbing at the ankle. Front and back use the same pattern piece, so the sewing is three seams plus the waist and cuffs. French terry or sweatshirt fleece — the same fabric as the hoodie, if you want a set.",
    matNote: "men's M",
    materials: [
      "Main fabric (French terry or sweatshirt fleece) — about 150 cm wide × 160 cm (59 × 63 in)",
      "Ribbing for the cuffs — about 40 cm (16 in)",
      "Flat elastic (3 cm / 1¼ in wide) — your waist measurement",
      "Optional: cord for the waist and eyelets"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the leg pattern and the cuff ribbing.",
      "<strong>Cut</strong><br>Cut two fronts and two backs from the same pattern, flipping it for the second of each pair, plus two cuffs.",
      "<strong>Finish the edges</strong><br>Serge or zigzag the allowances, or skip it — knit does not fray."
    ],
    sew: [
      { h: "4-1. Sew the crotch seams", items: [
        "Sew the two fronts together along the center front curve, then the two backs."
      ]},
      { h: "4-2. Sides and inseams", items: [
        "Lay front and back right sides together and sew both side seams.",
        "Sew the inseam in one run from hem to hem and reinforce the crotch junction."
      ]},
      { h: "4-3. Attach the cuffs", items: [
        "Sew each cuff into a loop and fold it in half lengthwise.",
        "Pin it to the leg opening in quarters and sew, stretching the ribbing to fit.",
        "Cut the ribbing to about 85% of the leg opening — that difference is what makes the cuff hug the ankle."
      ]},
      { h: "4-4. Waist", items: [
        "Fold the waist edge over twice to make a casing and stitch, leaving a gap.",
        "Thread the elastic, fit it and close the gap. Add eyelets and a cord at the front if you want a drawstring."
      ]}
    ],
    sewNote: "Ribbing must be shorter than the opening it goes on, or it does nothing. About 85% is the standard ratio: enough to pull in, not so much that it grips.",
    tips: [
      "<strong>Make a set</strong>: the same fabric as the hoodie gives you a matching tracksuit.",
      "<strong>Add pockets</strong>: side-seam pockets are worth the ten extra minutes on trousers you will live in.",
      "<strong>No ribbing</strong>: a plain double-fold hem gives straight-leg sweatpants instead of joggers."
    ],
    related: ["hoodie", "taperedpants", "pants", "cargopants"]
  },

  shirtdress: {
    title: "Shirt dress",
    tab: "human",
    toolName: "Shirt dress",
    sizeStep: "Enter bust, length, shoulder width, sleeve length, front overlap, neck width and ease. Presets cover S, M, L and a short-sleeved version.",
    desc: "How to sew a shirt dress. A button-front shirt lengthened into a dress, with a stand collar and set-in sleeves.",
    keywords: "shirt dress,button front dress,how to sew,sewing pattern,collar,handmade",
    lead: "A shirt lengthened into a dress. Two fronts, one back, two sleeves and a collar — the same construction as a shirt, just longer, so if you can make one you can make the other. Wear it buttoned as a dress or open over a tee.",
    matNote: "size M",
    materials: [
      "Main fabric (cotton lawn, linen or chambray) — about 110 cm wide × 280 cm (43 × 110 in)",
      "Lightweight fusible interfacing — for the collar and front bands",
      "Buttons (1–1.3 cm / ½ in) — 8–10",
      "Optional: a fabric belt or tie"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the back (on the fold), the fronts, the sleeves and the collar.",
      "<strong>Cut</strong><br>Cut one back, two fronts, two sleeves and two collar pieces.",
      "<strong>Apply interfacing</strong><br>Fuse interfacing to one collar piece and to the front band area — buttonholes need it or they stretch out.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the shoulder, side and underarm allowances."
    ],
    sew: [
      { h: "4-1. Finish the front edges", items: [
        "Turn each front edge under twice by the overlap width and stitch. Press the folds firmly first so the two sides match.",
        "Do this before anything else — once the collar is on, the presser foot will not reach."
      ]},
      { h: "4-2. Shoulders and sleeves", items: [
        "Sew both shoulder seams and press the allowances open.",
        "Match the center of each sleeve head to the shoulder seam and sew the sleeves in while the garment is flat."
      ]},
      { h: "4-3. Make and attach the collar", items: [
        "Sew the two collar pieces right sides together, leaving the lower edge open. Trim the corners, turn and press.",
        "Sandwich the neckline between the collar layers and sew all the way around, lining the collar ends up with the folded front edges.",
        "Clip the neckline curve so the collar stands up rather than fighting the neckline."
      ]},
      { h: "4-4. Sides, hem and buttons", items: [
        "Sew from the cuff along the underarm and down the side in one line.",
        "Turn the cuffs and hem under twice and stitch.",
        "Work buttonholes on the right front and sew buttons to the left. Space them evenly, starting 1 cm below the collar."
      ]}
    ],
    sewNote: "Test every buttonhole on a scrap first. Machines differ, and a hole cut a millimetre short will not take the button while one cut long lets it slip out. The correct length is the button diameter plus its thickness.",
    tips: [
      "<strong>Belt it</strong>: a tie belt at the waist turns the same dress into a completely different shape.",
      "<strong>Short sleeves</strong>: the short-sleeve preset makes it a summer dress from the same pattern.",
      "<strong>Snaps instead</strong>: if buttonholes put you off, plastic snaps do the same job with no cutting."
    ],
    related: ["shirt", "onepiece", "blouse", "kidsshirt"]
  },

  shirt: {
    title: "Shirt",
    tab: "human",
    toolName: "Shirt",
    sizeStep: "Enter bust, length, shoulder width, sleeve length, cuff width, neck width and the front overlap. Presets cover women's M, men's M/L and a short-sleeved version.",
    desc: "How to sew a button-front shirt with a stand collar. Two fronts, one back, two sleeves and a collar, with every step spelled out.",
    keywords: "shirt,button front shirt,how to sew,sewing pattern,collar,oxford,handmade",
    lead: "A classic shirt with a front band and a stand collar. Two fronts, one back, two sleeves and a collar — once you are past the buttonholes the steps run in a straight line. Oxford, broadcloth or linen all have enough body to be easy to handle.",
    matNote: "men's M",
    materials: [
      "Main fabric (oxford, broadcloth or linen) — about 110 cm wide × 200 cm (43 × 79 in)",
      "Lightweight fusible interfacing — for the collar and front bands",
      "Buttons (1–1.3 cm / ½ in) — 7–8",
      "Sewing thread to match"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the back (on the fold), the fronts, the sleeves and the collar. The front pieces already include the button band allowance.",
      "<strong>Cut</strong><br>Cut one back, two fronts, two sleeves and two collar pieces.",
      "<strong>Apply interfacing</strong><br>Fuse interfacing to one collar piece and to the front band area.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the shoulder, side and underarm allowances."
    ],
    sew: [
      { h: "4-1. Finish the front edges", items: [
        "Turn each front edge under twice by the overlap width and stitch. Press hard before stitching so both sides come out the same width.",
        "Always do this first — it is impossible once the collar is attached."
      ]},
      { h: "4-2. Shoulders and sleeves", items: [
        "Sew both shoulder seams and press the allowances open.",
        "Match the center of each sleeve head to the shoulder seam and sew the sleeve into the armhole while everything is still flat.",
        "The sleeve head is slightly longer than the armhole. Spread that ease across the top of the cap rather than letting it bunch in one spot."
      ]},
      { h: "4-3. Make and attach the collar", items: [
        "Sew the collar pieces right sides together, leaving the lower edge open. Trim the corners, turn and press.",
        "Sandwich the neckline between the collar layers and sew around, lining the collar ends up with the folded front edges.",
        "Clip the neckline curve every 5 mm (¼ in)."
      ]},
      { h: "4-4. Sides, cuffs and buttons", items: [
        "Sew from the cuff, along the underarm and down the side hem in one continuous line, matching the underarm seams.",
        "Turn the cuffs and hem under twice and stitch. A curved shirt hem is easier if you stitch a guideline first and press to it.",
        "Work buttonholes on the right front, sew buttons on the left, evenly spaced from just under the collar to the hem."
      ]}
    ],
    sewNote: "Sew a test buttonhole on a scrap of the same fabric with the same interfacing. The right length is the button diameter plus the button thickness — a millimetre short and it will not do up.",
    tips: [
      "<strong>Short sleeves</strong>: the short-sleeve preset uses the same body, so you can make both from one pattern.",
      "<strong>Straight or curved hem</strong>: straight to wear out, curved to tuck in.",
      "<strong>Interface the band</strong>: it is tempting to skip, but an uninterfaced button band ripples after a few washes."
    ],
    related: ["shirtdress", "blouse", "kidsshirt", "pajamas"]
  },

  yukata: {
    title: "Yukata",
    tab: "human",
    toolName: "Yukata",
    sizeStep: "Enter height, bust, panel width, sleeve width and length, okumi width and collar width. Presets cover a child's 120 cm, women's and men's sizes.",
    desc: "How to sew a yukata, the casual Japanese summer robe. Every piece is a rectangle — there is not one curve in the whole garment.",
    keywords: "yukata,kimono,japanese robe,how to sew,sewing pattern,straight cut,handmade",
    lead: "Traditional Japanese summer wear cut entirely from straight lines. Four kinds of rectangle — body panels, sleeves, okumi (front panels) and collar — and not a single curve, so it is approachable even if you have never sewn a kimono. Cotton or cotton-linen makes a casual, wearable version.",
    matNote: "women's size",
    materials: [
      "Main fabric (cotton, cotton-linen or shibori; a traditional bolt is about 36 cm / 14 in wide) — about 11 m (12 yd)",
      "Hand sewing thread (kimono is traditionally hand sewn, but a machine works)",
      "Optional: collar stiffener"
    ],
    cut: [
      "<strong>Check the measurements</strong><br>Every piece is a rectangle, so skip printing and mark the measurements from the guide sheet straight onto the fabric — a yukata is long and would take a great many sheets.",
      "<strong>Cut</strong><br>Cut two body panels (folded at the shoulder), two sleeves, two okumi and one collar.",
      "<strong>Finish the edges</strong><br>Traditional kimono seam allowances are folded rather than serged, so no edge finishing is needed."
    ],
    sew: [
      { h: "4-1. Sew the body", items: [
        "Fold each body panel at the shoulder and sew the two center back edges together.",
        "Sew the side seams, leaving the sleeve opening (the miyatsuguchi) unsewn."
      ]},
      { h: "4-2. Make and attach the sleeves", items: [
        "Fold each sleeve at the top and sew the underarm seam, leaving the cuff opening unsewn.",
        "Turn the cuff and the rounded lower sleeve edge under twice and stitch.",
        "Pin each sleeve to its opening on the body, right sides together, and sew."
      ]},
      { h: "4-3. Attach the okumi", items: [
        "Sew an okumi panel to each front edge, right sides together.",
        "Press the seam allowances towards the body."
      ]},
      { h: "4-4. Attach the collar", items: [
        "Fold the collar in half lengthwise and press.",
        "Sew one edge of the collar to the garment in one continuous run, from the end of one okumi, around the back neck, to the end of the other.",
        "Turn the collar out, fold the remaining edge under and slipstitch it down."
      ]},
      { h: "4-5. Hem", items: [
        "Turn the hem under twice and slipstitch."
      ]}
    ],
    sewNote: "In Japanese garment sewing you press seam allowances to one side rather than open, and you keep every allowance falling the same way. Do that and no seam shows from the outside — the principle holds whether you sew by hand or by machine.",
    tips: [
      "<strong>Start child-sized</strong>: far less fabric and far less sewing. Make one in the child size before committing 11 m of fabric.",
      "<strong>A machine is fine</strong>: it is all straight seams. Slipstitch only the collar by hand and it still looks right.",
      "<strong>Make a set</strong>: a jinbei in the same fabric gives the whole family matching summer wear."
    ],
    related: ["samue", "jinbei", "hanten", "kappogi"]
  },

  samue: {
    title: "Samue (Japanese work jacket)",
    tab: "human",
    toolName: "Samue (Japanese work jacket)",
    sizeStep: "Enter bust, length, shoulder width, sleeve length, front overlap, ease and tie length. Presets cover women's M and men's M/L.",
    desc: "How to sew a samue jacket. One back, two fronts, two sleeves and ties — it fastens at the sides, so it goes on and off easily.",
    keywords: "samue,japanese work jacket,how to sew,sewing pattern,sashiko,handmade",
    lead: "A Japanese jacket that began as workwear. One back, two fronts, two sleeves and ties, fastening at the sides rather than the front. Pair it with the tapered pants or jinbei shorts and you have the full set. Cotton or sashiko weave suits it best.",
    matNote: "women's M",
    materials: [
      "Main fabric (cotton, sashiko weave or denim) — about 110 cm wide × 200 cm (43 × 79 in)",
      "Optional: snap fasteners"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the back, fronts, sleeves and ties.",
      "<strong>Cut</strong><br>Cut one back, two fronts, two sleeves and four ties.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the shoulder, side and underarm allowances."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Sew both shoulder seams and press the allowances open."
      ]},
      { h: "4-2. Attach the sleeves", items: [
        "Hem the cuff edge of each sleeve first, while the sleeve is still flat.",
        "Match the center of the sleeve to the shoulder seam and sew it into the armhole."
      ]},
      { h: "4-3. Sew the sides", items: [
        "Sew from the underarm down to the hem on each side."
      ]},
      { h: "4-4. Finish the front edges, neckline and hem", items: [
        "Turn the front edges and neckline under twice in one continuous run and stitch.",
        "Hem the lower edge the same way."
      ]},
      { h: "4-5. Attach the ties", items: [
        "Fold each of the four ties in quarters lengthwise and topstitch.",
        "Sew them at the top of the side openings, positioned so that one pair ties on the inside and the other on the outside."
      ]}
    ],
    sewNote: "Tie the inside pair first, then the outside pair. That two-stage closure is what stops the front falling open when you move — a single tie will not hold it.",
    tips: [
      "<strong>Make the set</strong>: tapered pants or jinbei shorts in the same fabric give you a complete samue.",
      "<strong>Sashiko weave</strong>: sashiko or kasuri cotton makes it look properly traditional rather than costume-like.",
      "<strong>As loungewear</strong>: double gauze makes a soft, light version for wearing at home."
    ],
    related: ["yukata", "jinbei", "hanten", "kappogi"]
  },

  kappogi: {
    title: "Kappogi (Japanese cover-all apron)",
    tab: "human",
    toolName: "Kappogi (Japanese cover-all apron)",
    sizeStep: "Enter bust, length, shoulder width, sleeve length, cuff elastic and back tie length. Presets cover adult and child sizes.",
    desc: "How to sew a kappogi, the Japanese apron with sleeves that goes right over your clothes. Elastic cuffs keep sleeves clean and it ties at the back.",
    keywords: "kappogi,apron with sleeves,cover-all apron,how to sew,sewing pattern,handmade",
    lead: "A Japanese apron with sleeves that you pull on over your clothes. Elastic at the cuffs keeps your sleeves out of the washing up, and it simply ties at the back, so it goes on and off in seconds. Good for cooking, cleaning and school lunch duty.",
    matNote: "adult size",
    materials: [
      "Main fabric (cotton, sheeting or broadcloth) — about 110 cm wide × 230 cm (43 × 91 in)",
      "Flat elastic (1 cm / ⅜ in wide) — about 40 cm (16 in) for the cuffs",
      "Optional: fabric for a pocket"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the front, back, sleeves and back ties.",
      "<strong>Cut</strong><br>Cut one front, one back, two sleeves and two ties.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the shoulder, side and underarm allowances."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Sew both shoulder seams and press the allowances open."
      ]},
      { h: "4-2. Attach the sleeves", items: [
        "Match the center of each sleeve head to the shoulder seam and sew it into the armhole.",
        "Turn each cuff under twice to make a casing and stitch, leaving a 2 cm (¾ in) gap for the elastic."
      ]},
      { h: "4-3. Sides and back opening", items: [
        "Sew from the cuff along the underarm and down the side in one line — but do not sew the center back closed. That opening is how you get into it.",
        "Turn the back opening edges and the neckline under twice and stitch."
      ]},
      { h: "4-4. Ties, elastic and hem", items: [
        "Fold each tie in quarters lengthwise, topstitch, and sew them to the back at waist level.",
        "Thread the cuff elastic, fit it around your wrist, stitch the ends and close the gap.",
        "Turn the hem up twice and stitch."
      ]}
    ],
    sewNote: "Leaving the center back open is the whole point of a kappogi. Sew it closed and you cannot get it over your head, so watch that you do not run the side seam past the back opening.",
    tips: [
      "<strong>Add a pocket</strong>: a large patch pocket at hip level on the front holds cloths and utensils.",
      "<strong>Water-repellent fabric</strong>: laminated or coated cotton is worth it if you do a lot of washing up.",
      "<strong>Child size</strong>: the child preset gives the size used for school lunch duty in Japan."
    ],
    related: ["apron", "samue", "smock", "kidsbibapron"]
  },

  pajamas: {
    title: "Pajama top",
    tab: "human",
    toolName: "Pajama top",
    sizeStep: "Enter bust, length, shoulder width, sleeve length, cuff width, neck width and the front overlap. Presets cover S, M, L and a short-sleeved version.",
    desc: "How to sew a relaxed button-front pajama top. Two fronts, one back, two sleeves and a collar, cut loose enough to sleep in.",
    keywords: "pajama top,pajamas,sleepwear,how to sew,sewing pattern,double gauze,handmade",
    lead: "A loose button-front pajama top with nothing that binds when you turn over. Pair it with the sweatpants or tapered pants for a set. Double gauze or brushed flannel is the obvious choice — soft, and it gets softer with washing.",
    matNote: "size M",
    materials: [
      "Main fabric (double gauze, flannel or cotton) — about 110 cm wide × 220 cm (43 × 87 in)",
      "Lightweight fusible interfacing — about 40 × 40 cm (16 × 16 in) for the collar and front bands",
      "Buttons — 5–6"
    ],
    cut: [
      "<strong>Pre-wash the fabric</strong><br>Double gauze shrinks by about 10%. Wash, dry and press it before you cut or the finished top will not fit after its first wash.",
      "<strong>Trace the pattern</strong><br>Trace the back, fronts, sleeves and collar.",
      "<strong>Cut</strong><br>Cut one back, two fronts, two sleeves and two collar pieces, then fuse interfacing to one collar piece and the front band areas."
    ],
    sew: [
      { h: "4-1. Finish the front edges", items: [
        "Turn each front edge under twice and topstitch."
      ]},
      { h: "4-2. Shoulders, sleeves and sides", items: [
        "Sew both shoulder seams and press the allowances open.",
        "Match the center of each sleeve head to the shoulder seam and sew the sleeves in.",
        "Sew from the cuff along the underarm and down the side in one continuous line."
      ]},
      { h: "4-3. Make and attach the collar", items: [
        "Sew the collar pieces right sides together around the outer edge, trim the corners and turn.",
        "Sew the collar to the neckline, then fold the inner layer under and topstitch it down."
      ]},
      { h: "4-4. Finish", items: [
        "Turn the cuffs and hem under twice and stitch.",
        "Work the buttonholes and sew on the buttons."
      ]}
    ],
    sewNote: "Pre-washing double gauze is not optional. It shrinks around 10%, so a top that fits when you make it will be a size smaller after one wash. Wash, dry, then press while slightly damp.",
    tips: [
      "<strong>Make the set</strong>: sweatpants or tapered pants in the same fabric.",
      "<strong>Short sleeves</strong>: the short-sleeve preset turns it into summer pajamas.",
      "<strong>Add a chest pocket</strong>: it is what makes a shirt read as pajamas rather than a shirt."
    ],
    related: ["shirt", "sweatpants", "gown", "taperedpants"]
  },

  blouson: {
    title: "Blouson jacket",
    tab: "human",
    toolName: "Blouson jacket",
    sizeStep: "Enter bust, length excluding ribbing, shoulder width, sleeve length, hem and cuff ribbing height and ease. Presets cover S, M, L and a relaxed fit.",
    desc: "How to sew a blouson jacket gathered into ribbing at the hem and cuffs, closed with a separating zip.",
    keywords: "blouson,bomber jacket,how to sew,sewing pattern,ribbing,zip,handmade",
    lead: "A light jacket pulled in by ribbing at the hem and cuffs. Two fronts, one back, two sleeves and the ribbing. Close it with a separating zip or with snaps if zips are not your favorite. Nylon, twill or denim all have the body this shape needs.",
    matNote: "size M",
    materials: [
      "Main fabric (nylon, twill or denim) — about 110 cm wide × 180 cm (43 × 71 in)",
      "Ribbing for the hem and cuffs — about 30 × 90 cm (12 × 35 in)",
      "Separating zip — to the finished body length"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the back, fronts, sleeves and the two ribbing pieces.",
      "<strong>Cut</strong><br>Cut one back, two fronts, two sleeves, two cuff ribbings and one hem ribbing.",
      "<strong>Finish the edges</strong><br>Serge or zigzag the shoulder, side and underarm allowances."
    ],
    sew: [
      { h: "4-1. Shoulders, sleeves and sides", items: [
        "Sew both shoulder seams and press the allowances open.",
        "Match the center of each sleeve head to the shoulder seam and sew the sleeves in.",
        "Sew from the cuff along the underarm and down the side in one continuous line."
      ]},
      { h: "4-2. Attach the ribbing", items: [
        "Sew each cuff ribbing into a loop, fold it in half lengthwise and sew it to the cuff, stretching it to fit.",
        "Fold the hem ribbing in half lengthwise and sew it to the hem, stretching evenly. It is shorter than the hem — that is what makes the jacket blouse."
      ]},
      { h: "4-3. Insert the zip", items: [
        "Sew one side of the separating zip to each front edge. Line the bottom stops up with each other before you start, or one side will finish higher than the other.",
        "Turn the neckline under twice and stitch."
      ]}
    ],
    sewNote: "Cut ribbing to about 85% of the edge it goes on. Stretching that shorter piece evenly as you sew is exactly what pulls the hem in and gives a blouson its shape.",
    tips: [
      "<strong>If zips put you off</strong>: snaps or hook-and-loop close it just as well. Make it that way first and add a zip to the second one.",
      "<strong>Water-repellent fabric</strong>: in coated nylon this becomes a light rain jacket.",
      "<strong>Add pockets</strong>: slash pockets caught in the side seams are worth the extra ten minutes."
    ],
    related: ["cardigan", "jacket", "nocollarjacket", "hoodie"]
  },

  gown: {
    title: "Robe",
    tab: "human",
    toolName: "Robe",
    sizeStep: "Enter bust, length, shoulder width, sleeve length, lapel fold width and ease. Presets cover women's M, men's M and a short version.",
    desc: "How to sew a wrap robe tied with a sash. One back, two fronts, two sleeves and a sash — no buttons and no zip.",
    keywords: "robe,dressing gown,bathrobe,how to sew,sewing pattern,waffle,handmade",
    lead: "A robe you wrap and tie. No buttons, no zip — just knot the sash, which makes this one of the least fiddly garments here. Waffle or gauze makes a bathrobe; linen makes a summer cover-up. Same pattern, completely different garment.",
    matNote: "women's M",
    materials: [
      "Main fabric (waffle, double gauze or linen) — about 110 cm wide × 330 cm (43 × 130 in)",
      "Optional: self-fabric belt loops for the sides",
      "Thread to match"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the back (on the fold), the fronts, the sleeves and the sash. The front edge already includes the allowance that folds back to form the lapel.",
      "<strong>Cut</strong><br>Cut one back, two fronts (flipping the pattern for the second), two sleeves and one sash.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the shoulder, side and underarm allowances."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Sew both shoulder seams and press the allowances open. A robe carries weight on the shoulders, so pressed-open seams sit better than pressed-to-one-side."
      ]},
      { h: "4-2. Attach the sleeves", items: [
        "Match the center of each sleeve head to the shoulder seam and sew the sleeve into the armhole.",
        "Sew the sleeves in while the garment is still flat — the armhole is far easier to handle open than in the round."
      ]},
      { h: "4-3. Sides and underarms", items: [
        "Sew from the cuff along the underarm and down to the hem in one continuous line, lining the underarm seams up first.",
        "If you are adding belt loops, catch them in the side seams now."
      ]},
      { h: "4-4. Fold back the lapel", items: [
        "Fold the allowance on each front edge to the inside — that fold is the lapel.",
        "Topstitch it down in one run from the hem, around the neckline, to the other hem.",
        "Clip the neckline curve so the lapel lies flat instead of standing away."
      ]},
      { h: "4-5. Cuffs, hem and sash", items: [
        "Turn the cuffs and hem under twice and stitch.",
        "Fold the sash in quarters lengthwise, press and topstitch all round.",
        "Thread it through the belt loops."
      ]}
    ],
    sewNote: "The fold-back allowance on the front edge is the lapel, so its width is the width of the lapel. Wider reads as a shawl collar, narrower as a light wrap. About 7 cm (2¾ in) is easy to sew and looks balanced.",
    tips: [
      "<strong>Waffle for a bathrobe</strong>: absorbent and quick-drying, which is the whole job.",
      "<strong>Add pockets</strong>: catch pocket bags in the side seams for your phone and glasses.",
      "<strong>Belt loops are essential</strong>: without them the sash slides round and the robe falls open. They take five minutes."
    ],
    related: ["poncho", "pajamas", "cardigan", "samue"]
  },

  nocollarjacket: {
    title: "Collarless jacket",
    tab: "human",
    toolName: "Collarless jacket",
    sizeStep: "Enter bust, length, shoulder width, sleeve length and ease. Presets cover women's S/M and a relaxed fit.",
    desc: "How to sew a collarless open-front jacket. With no collar to set, this is the most approachable jacket shape — the neckline is finished with a facing.",
    keywords: "collarless jacket,no collar jacket,how to sew,sewing pattern,facing,tweed,handmade",
    lead: "An open-front jacket with no collar. Collar setting is the step that defeats most people on a jacket, and here it simply is not there — yet worn, it still reads as a jacket. Tweed or linen, anything with a bit of body.",
    matNote: "women's M",
    materials: [
      "Main fabric (tweed, linen or heavy cotton) — about 110 cm wide × 200 cm (43 × 79 in)",
      "Lightweight fusible interfacing — about 30 cm (12 in) for the front facings",
      "Optional: a covered button or snap",
      "Optional: lining fabric"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the back (on the fold), the fronts, the sleeves and the front facings.",
      "<strong>Cut</strong><br>Cut one back, two fronts, two sleeves and two facings.",
      "<strong>Apply interfacing</strong><br>Fuse interfacing to the facings. That is what makes the front edge sit crisply instead of rolling.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the shoulder, side and underarm allowances."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Sew both shoulder seams and press the allowances open."
      ]},
      { h: "4-2. Attach the facings", items: [
        "Join the facings at the shoulders if your version continues around the back neck.",
        "Pin a facing to each front, right sides together, and sew in one run up the front edge and around the neckline.",
        "Clip the neckline curve every 5 mm (¼ in). Skip this and the neckline will pull no matter how carefully you sewed it.",
        "Turn the facing to the inside, press hard, and understitch 2–3 mm from the edge so it stays rolled in."
      ]},
      { h: "4-3. Attach the sleeves", items: [
        "Match the center of each sleeve head to the shoulder seam and sew the sleeve in.",
        "Spread the sleeve-head ease across roughly 15 cm (6 in) either side of the top. Bunched in one place it becomes a tuck."
      ]},
      { h: "4-4. Sides and underarms", items: [
        "Sew from the cuff along the underarm and down to the hem in one line, matching the underarm seams."
      ]},
      { h: "4-5. Cuffs and hem", items: [
        "Turn the cuffs under twice and stitch.",
        "Hem the lower edge. At the facings, fold the hem with the facing opened out, then fold the facing back and slipstitch.",
        "Add a snap or covered button at chest height if you want it to fasten."
      ]}
    ],
    sewNote: "Do not be shy about clipping the neckline. Curved seam allowances always pull unless they are clipped, up to 1–2 mm short of the stitching, every 5 mm. Kept that shallow they will not fray.",
    tips: [
      "<strong>Interface the facings only</strong>: interfacing the whole jacket makes it board-stiff. The front edge and neckline are all that need to hold their shape.",
      "<strong>No fastening needed</strong>: collarless jackets are usually worn open. Leaving off the button looks entirely deliberate.",
      "<strong>Adding a lining</strong>: cut the same pattern in lining and join it to the inner edge of the facings. It slides on far more easily."
    ],
    related: ["jacket", "cardigan", "adultvest", "blouson"]
  },

  cargopants: {
    title: "Cargo pants",
    tab: "human",
    toolName: "Cargo pants",
    sizeStep: "Enter hip, rise, inseam, hem width, side pocket width and height, ease and the waist casing. Presets cover women's M, men's M and a shorts version.",
    desc: "How to sew cargo pants with big patch pockets on the legs. The waist is elastic, so there is no fly, zip or buttonhole.",
    keywords: "cargo pants,work pants,how to sew,sewing pattern,patch pocket,elastic waist,handmade",
    lead: "Work pants with big patch pockets on the sides. Because the waist is elastic there is no fly and no buttonholes — you sew the legs, then stitch the pockets on. Chino or ripstop holds the pocket shape; anything too soft and the pockets collapse.",
    matNote: "men's M",
    materials: [
      "Main fabric (chino, twill or ripstop) — about 110 cm wide × 220 cm (43 × 87 in)",
      "Flat elastic (2.5–3 cm / 1 in wide) — about 90 cm (35 in)",
      "Optional: snap fasteners for the pocket flaps — 2 sets"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the leg pattern, the side pockets and the pocket flaps.",
      "<strong>Cut</strong><br>Cut two fronts and two backs, two pockets, and the flaps in outer and lining.",
      "<strong>Finish the edges</strong><br>Serge or zigzag the crotch, side and inseam allowances."
    ],
    sew: [
      { h: "4-1. Make the pockets", items: [
        "Turn the top edge of each pocket under twice and stitch — that is the opening.",
        "Press the other three edges under by 1 cm (⅜ in), folding the corners diagonally so the layers do not build up.",
        "Sew each flap in outer and lining, leaving the top edge open, then turn and topstitch."
      ]},
      { h: "4-2. Attach the pockets", items: [
        "Position a pocket on each leg towards the side, 5–8 cm (2–3 in) below the rise so it does not dig in when you sit.",
        "Topstitch the three folded edges down 2–3 mm from the edge.",
        "Reinforce both top corners of the opening with a triangle or a square of stitching — that is where a patch pocket always tears first.",
        "Lay a flap above each pocket and stitch straight across the top.",
        "Do all of this before the legs become tubes — once the seams are sewn the presser foot cannot reach."
      ]},
      { h: "4-3. Sew the crotch seams", items: [
        "Sew the two fronts together along the center front curve, then the two backs.",
        "Clip the curves every 5 mm (¼ in)."
      ]},
      { h: "4-4. Sides and inseams", items: [
        "Sew both side seams, then the inseam in one run from hem to hem. Reinforce the crotch junction."
      ]},
      { h: "4-5. Waist and hem", items: [
        "Fold the waist edge over twice, stitch leaving a 4 cm (1½ in) gap, thread the elastic to about 85–90% of your waist, stitch the ends and close.",
        "Turn the hems up twice and stitch."
      ]}
    ],
    sewNote: "Attach the pockets while the legs are still flat pieces. Once you have sewn the side and inseam, the leg is a tube and the machine arm will not reach the pocket position.",
    tips: [
      "<strong>Measure what goes in</strong>: if the pocket is for a phone or wallet, measure it before you set the pocket size.",
      "<strong>Add pocket gussets</strong>: folding a pleat into the sides and base gives depth for bulky things. Fiddly, but a real difference.",
      "<strong>Shorts version</strong>: the shorts preset gives cargo shorts from the same pattern."
    ],
    related: ["taperedpants", "sweatpants", "widepants", "overall"]
  },

  hanten: {
    title: "Hanten (Japanese padded jacket)",
    tab: "human",
    toolName: "Hanten (Japanese padded jacket)",
    sizeStep: "Enter panel width, length, sleeve length, sleeve width and finished collar width. Presets cover child, women's and men's sizes.",
    desc: "How to sew a hanten, the padded Japanese house jacket. Every piece is a straight cut, and a layer of batting turns it into the real thing.",
    keywords: "hanten,padded jacket,japanese jacket,how to sew,sewing pattern,quilted,handmade",
    lead: "The Japanese padded jacket you live in all winter. Not one curve anywhere — the body panels fold at the shoulder, so there is not even a shoulder seam to sew. Add a layer of batting and it becomes the genuinely warm article rather than a light robe.",
    matNote: "women's size",
    materials: [
      "Main fabric (Japanese-print cotton, chirimen or flannel) — about 110 cm wide × 300 cm (43 × 118 in)",
      "Lining fabric (lightweight cotton) — the same amount",
      "Medium batting — about 200 cm (79 in) if you are padding it",
      "Optional: ties or a decorative cord for the front"
    ],
    cut: [
      "<strong>Check the measurements</strong><br>Body, sleeves and collar are all rectangles, so mark them straight onto the fabric from the guide sheet rather than printing.",
      "<strong>Cut</strong><br>Cut two body panels (folded at the shoulder), two sleeves and one collar.",
      "<strong>Open the center front</strong><br>Cut the front half of each body panel open down the center — that is where you get into it.",
      "<strong>If padding</strong><br>Cut the batting to the same dimensions as the body and sleeves."
    ],
    sew: [
      { h: "4-1. Sew the center back", items: [
        "Place the two body panels right sides together and sew the center back seam. The shoulders are folds, so there is nothing to sew there.",
        "If you are padding it, layer outer, batting and lining now and quilt a grid across them to lock the layers together."
      ]},
      { h: "4-2. Make and attach the sleeves", items: [
        "Fold each sleeve in half and sew the underarm seam, leaving the cuff open.",
        "Sew the open edge of each sleeve to the body between the notches. Both edges are straight, so if the notches match, the seam matches."
      ]},
      { h: "4-3. Sew the sides", items: [
        "Sew each side from below the sleeve opening down to the hem, reinforcing where the sleeve meets the body."
      ]},
      { h: "4-4. Attach the collar", items: [
        "Fold the collar in half lengthwise and sew one edge to the garment in one run: front edge, around the back neck, down to the other front edge.",
        "Turn it out, fold the remaining edge under and slipstitch or topstitch it down.",
        "The collar goes on as one straight line — there is no curve to ease it around."
      ]},
      { h: "4-5. Cuffs and hem", items: [
        "Turn the cuffs and hem under twice and stitch. If it is padded, hand slipstitching handles the bulk better than a machine.",
        "Add ties at the front if you want it to fasten."
      ]}
    ],
    sewNote: "If you are padding it, do not skip the quilting grid. Batting that is only caught at the edges shifts to one side in the first wash and never comes back. A grid every 10–15 cm (4–6 in) fixes it permanently.",
    tips: [
      "<strong>Do not print the pattern</strong>: it is all rectangles. Ruling the lines straight onto the fabric is faster and more accurate.",
      "<strong>Skip the padding</strong>: in flannel or fleece as a single layer it becomes a light spring jacket.",
      "<strong>Child size</strong>: the child preset makes the version worn for festivals and shichi-go-san."
    ],
    related: ["samue", "yukata", "gown", "jinbei"]
  },

  /* ===================== kids' clothes ===================== */

  jinbei: {
    title: "Jinbei top",
    tab: "kids",
    toolName: "Jinbei top",
    sizeStep: "Enter bust, length, shoulder width, sleeve length, front overlap, ease and tie length. Presets cover 90–130 cm.",
    desc: "How to sew a jinbei top, the Japanese summer jacket for children. One back, two fronts, two sleeves and four ties that fasten at the sides.",
    keywords: "jinbei,japanese summer wear,kids,how to sew,sewing pattern,festival,handmade",
    lead: "The Japanese summer top worn to festivals and as nightwear. One back, two fronts, two sleeves and four ties, fastening at the sides rather than the front. Choose an airy weave — crinkle cotton or shijira — and it stays cool even in August.",
    matNote: "size 110 cm",
    materials: [
      "Main fabric (cotton, crinkle cotton or shijira weave) — about 110 cm wide × 120 cm (43 × 47 in)",
      "Optional: snap fasteners if you want the front to close"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the back, fronts, sleeves and ties.",
      "<strong>Cut</strong><br>Cut one back, two fronts, two sleeves and four ties.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the shoulder, side and underarm allowances."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Sew both shoulder seams and press the allowances open."
      ]},
      { h: "4-2. Attach the sleeves", items: [
        "Hem the cuff edge of each sleeve first, while it is still flat.",
        "Match the center of the sleeve to the shoulder seam and sew it into the armhole. Repeat on the other side."
      ]},
      { h: "4-3. Sew the sides", items: [
        "Sew each side from the underarm down to the hem. Leaving the upper part of the side seam open lets air through — which is the point of a jinbei."
      ]},
      { h: "4-4. Finish the front edges, neckline and hem", items: [
        "Turn the front edges and neckline under twice in one continuous run and stitch.",
        "Hem the lower edge the same way."
      ]},
      { h: "4-5. Attach the ties", items: [
        "Fold each of the four ties in quarters lengthwise and topstitch.",
        "Sew them at the top of the side openings so one pair ties inside the front and the other outside."
      ]}
    ],
    sewNote: "There are two pairs of ties for a reason: one ties inside the front, the other outside. Tie the inner pair first and the front cannot fall open however much a child runs about.",
    tips: [
      "<strong>Make the set</strong>: jinbei shorts in the same fabric complete it, and the sizing labels match so you pick the same preset.",
      "<strong>Keep it cool</strong>: textured weaves like crinkle cotton do not stick to damp skin the way flat cotton does.",
      "<strong>Make two</strong>: children sweat through summer clothes. Having a spare saves a lot of evening laundry."
    ],
    related: ["jinbeipants", "kidsshirt", "samue", "yukata"]
  },

  kidsrompers: {
    title: "Rompers",
    tab: "kids",
    toolName: "Rompers",
    sizeStep: "Enter chest, length from shoulder to crotch, shoulder width, crotch tab width, neck width and ease. Presets cover 70–90 cm.",
    desc: "How to sew a sleeveless baby romper that snaps at the crotch. Just a front and a back, bound at the neck and armholes.",
    keywords: "rompers,bodysuit,baby,how to sew,sewing pattern,snaps,knit,handmade",
    lead: "A sleeveless bodysuit that fastens with snaps between the legs. Two pieces — front and back — and because it snaps under, it never rides up, so no bare tummy when you pick the baby up. Stretchy knit is far easier to get on a wriggling baby.",
    matNote: "size 80 cm",
    materials: [
      "Main fabric (jersey or interlock) — about 100 × 80 cm (39 × 31 in)",
      "Ballpoint machine needle and stretch thread",
      "Bias tape for the neckline and armholes — about 120 cm (47 in)",
      "Snap fasteners — 3 sets"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the front and back, including the crotch tabs.",
      "<strong>Cut</strong><br>Cut one front and one back. Cut knit lying flat and relaxed.",
      "<strong>Finish the edges</strong><br>Knit does not fray, so edge finishing is optional."
    ],
    sew: [
      { h: "4-1. Shoulders and sides", items: [
        "Sew both shoulder seams with a stretch stitch.",
        "Sew both side seams, leaving the crotch tabs unsewn."
      ]},
      { h: "4-2. Bind the neckline and armholes", items: [
        "Sew bias tape around the neckline, letting it follow the curve without pulling.",
        "Bind both armholes the same way."
      ]},
      { h: "4-3. Finish the crotch and add snaps", items: [
        "Turn the edges of the crotch tabs under twice and stitch.",
        "Fit three snaps where the front and back tabs overlap. Space them so you can open just the middle one for a quick diaper check."
      ]}
    ],
    sewNote: "Do not stretch bias tape as you sew it round the neckline — a pulled binding puckers the whole edge. Let it follow the curve at its own pace and feed it gently.",
    tips: [
      "<strong>Soft fabric next to skin</strong>: jersey or double gauze. This sits directly against the baby all day.",
      "<strong>Two rows of snaps</strong>: diaper sizes change. A second row of snaps lets you lengthen the crotch later.",
      "<strong>Add sleeves</strong>: borrow the sleeve from the kids' T-shirt pattern and set it into the armhole."
    ],
    related: ["kidstee", "bloomers", "sleeper", "stai"]
  },

  kidsraglan: {
    title: "Kids' raglan T-shirt",
    tab: "kids",
    toolName: "Kids' raglan T-shirt",
    sizeStep: "Enter chest, length, raglan seam length, sleeve length, neck width and ease. Presets cover 90–130 cm.",
    desc: "How to sew a raglan T-shirt for children. The sleeve reaches the neckline, so there is no shoulder seam and no armhole to ease.",
    keywords: "raglan t-shirt,kids,how to sew,sewing pattern,knit,baseball tee,handmade",
    lead: "A T-shirt where the sleeve runs all the way to the neckline. The seams sit diagonally across the shoulder and they are almost straight, which makes them far easier to sew than a set-in sleeve. Cut the sleeves in a contrast color and it looks shop-bought.",
    matNote: "size 110 cm",
    materials: [
      "Main fabric (jersey or interlock) — about 150 cm wide × 80 cm (59 × 31 in)",
      "Contrast knit for the sleeves (optional) — about 50 × 40 cm (20 × 16 in)",
      "Ribbing for the neckline — about 8 × 45 cm (3 × 18 in)",
      "Ballpoint machine needle and stretch thread"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the front, back and sleeves, and mark the notches on the raglan seams.",
      "<strong>Cut</strong><br>Cut one front and one back on the fold, plus two sleeves.",
      "<strong>Finish the edges</strong><br>Optional on knit, but a serged edge lasts better through repeated washing."
    ],
    sew: [
      { h: "4-1. Sew the raglan seams", items: [
        "Sew the front raglan edge of one sleeve to the front, matching the notches.",
        "Sew the back edge of the same sleeve to the back.",
        "Repeat for the other sleeve. The neckline is now a complete circle."
      ]},
      { h: "4-2. Sides and underarms", items: [
        "Sew from the cuff along the underarm and down to the hem in one continuous line on each side."
      ]},
      { h: "4-3. Neckband, cuffs and hem", items: [
        "Sew the ribbing into a loop, fold it in half and sew it to the neckline, stretching it to fit.",
        "Turn the cuffs and hem under and finish with a stretch stitch."
      ]}
    ],
    sewNote: "On children's clothes the neckline has to go over the head. Before you attach the ribbing, check the neckline circumference is larger than the child's head — about 50 cm (20 in) at age three.",
    tips: [
      "<strong>Contrast sleeves</strong>: the classic baseball tee, at no extra cost.",
      "<strong>Match with an adult</strong>: the adult raglan uses the same construction, so you can make a matching pair.",
      "<strong>Long sleeves</strong>: lengthen the sleeve and make it in French terry for winter."
    ],
    related: ["kidstee", "raglantee", "kidshoodie", "smock"]
  },

  jumperskirt: {
    title: "Pinafore dress",
    tab: "kids",
    toolName: "Pinafore dress",
    sizeStep: "Enter chest, total length, bodice length, strap length and width, gather ratio and ease. Presets cover 90–130 cm.",
    desc: "How to sew a pinafore dress with a gathered skirt. Bib, skirt and straps — and the skirt is a rectangle.",
    keywords: "pinafore dress,jumper dress,kids,how to sew,sewing pattern,gathered skirt,handmade",
    lead: "A strappy pinafore to layer over a T-shirt or blouse. Three parts — bib, gathered skirt and straps — joined at the waist. The skirt is a plain rectangle, so the only technique involved is gathering.",
    matNote: "size 110 cm",
    materials: [
      "Main fabric (corduroy, linen or cotton) — about 110 cm wide × 90 cm (43 × 35 in)",
      "Lining fabric for the bib — about 30 × 30 cm (12 × 12 in)",
      "Optional: 2 buttons for adjustable straps"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the bib, the skirt panels and the straps.",
      "<strong>Cut</strong><br>Cut the bib in outer and lining (front and back), two skirt panels and two straps.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the skirt side seams."
    ],
    sew: [
      { h: "4-1. Make the straps", items: [
        "Fold each strap in half lengthwise, right sides together, sew the long edge, turn and press. Make two."
      ]},
      { h: "4-2. Make the bib", items: [
        "Baste the straps to the right side of the front bib at the marked positions, pointing inward so they end up outside once turned.",
        "Sew the bib outer and lining right sides together along the top and both sides, leaving the lower edge open.",
        "Trim the corners, turn and press. Make the back bib the same way."
      ]},
      { h: "4-3. Make the skirt", items: [
        "Sew the two skirt panels together at both sides to form a loop.",
        "Run two rows of long stitches along the top edge and pull the threads until it matches the width of the bib."
      ]},
      { h: "4-4. Join and finish", items: [
        "Pin the lower edge of the bib to the gathered skirt edge, right sides together, spreading the gathers evenly, and sew.",
        "Press the allowance towards the bib and topstitch from the right side.",
        "Hem the skirt with a double fold.",
        "Thread the straps through the back bib and button them, or stitch them down directly."
      ]}
    ],
    sewNote: "Always gather with two rows of stitching and pull both threads together. One row snaps partway along and leaves the gathers uneven.",
    tips: [
      "<strong>Adjustable straps</strong>: buttons on the back bib and two or three buttonholes in each strap let it grow with the child.",
      "<strong>Add pockets</strong>: patch pockets on the skirt are the first thing a child looks for.",
      "<strong>Autumn version</strong>: corduroy or wool over tights makes this a winter dress."
    ],
    related: ["kidsdress", "gather", "kidsbibapron", "smock"]
  },

  kidshoodie: {
    title: "Kids' hoodie",
    tab: "kids",
    toolName: "Kids' hoodie",
    sizeStep: "Enter chest, length, shoulder width, sleeve length, cuff width, hood height and ease. Presets cover 90–130 cm.",
    desc: "How to sew a pullover hoodie for children. Front, back, sleeves and a hood made from two pieces.",
    keywords: "kids hoodie,hooded sweatshirt,children,how to sew,sewing pattern,French terry,handmade",
    lead: "A pullover hoodie in child sizes. Four pattern pieces, and the hood is just two pieces sewn together and joined to the neckline. In French terry or sweatshirt fleece it becomes the thing they reach for every day.",
    matNote: "size 110 cm",
    materials: [
      "Main fabric (French terry or sweatshirt fleece) — about 150 cm wide × 110 cm (59 × 43 in)",
      "Ballpoint machine needle and stretch thread",
      "Optional: ribbing for the cuffs and hem"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the front, back, sleeves and hood.",
      "<strong>Cut</strong><br>Cut one front and one back on the fold, two sleeves and two hood pieces.",
      "<strong>Finish the edges</strong><br>Optional on knit."
    ],
    sew: [
      { h: "4-1. Shoulders and sleeves", items: [
        "Sew both shoulder seams with a stretch stitch.",
        "Match the center of each sleeve head to the shoulder seam and sew the sleeves in."
      ]},
      { h: "4-2. Sides and underarms", items: [
        "Sew from the cuff along the underarm and down to the hem in one continuous line."
      ]},
      { h: "4-3. Make and attach the hood", items: [
        "Sew the two hood pieces right sides together along the curved back edge.",
        "Turn the front edge of the hood under twice and stitch.",
        "Pin the lower edge of the hood to the neckline and sew all the way around."
      ]},
      { h: "4-4. Cuffs and hem", items: [
        "Turn the cuffs and hem under and finish with a stretch stitch, or attach ribbing stretched slightly as you sew."
      ]}
    ],
    sewNote: "Children put clothes under real strain. Backstitch over the underarm and side junctions — those two points are where a home-made garment gives way first.",
    tips: [
      "<strong>Size up</strong>: children grow fast. Making the next size and turning back the cuffs buys you a year.",
      "<strong>No drawcord</strong>: hood cords are a strangulation hazard on playground equipment. Leave them off for small children.",
      "<strong>Add a name tag</strong>: stitched inside the hem, it saves the lost property box."
    ],
    related: ["hoodie", "kidsraglan", "kidstee", "kidscoat"]
  },

  kidstank: {
    title: "Kids' tank top",
    tab: "kids",
    toolName: "Kids' tank top",
    sizeStep: "Enter chest, length, strap width and spacing, armhole depth and ease. Presets cover 90–130 cm.",
    desc: "How to sew a sleeveless tank top for children. Two pieces with the neckline and armholes bound in bias tape.",
    keywords: "kids tank top,vest top,children,how to sew,sewing pattern,bias binding,handmade",
    lead: "A sleeveless top in two pieces. With no sleeves to set, the only technique is binding the neckline and armholes — which makes it a good first garment for anyone starting on clothes. Jersey for everyday, double gauze for hot weather.",
    matNote: "size 110 cm",
    materials: [
      "Main fabric (jersey, interlock or double gauze) — about 100 × 60 cm (39 × 24 in)",
      "Bias tape for the neckline and armholes — about 130 cm (51 in)",
      "Ballpoint machine needle and stretch thread if using knit"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the front and back — the front neckline is cut lower than the back.",
      "<strong>Cut</strong><br>Cut one front and one back, each with the center on the fold.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the shoulder and side allowances if the fabric frays."
    ],
    sew: [
      { h: "4-1. Sew the shoulders and sides", items: [
        "Sew both shoulder seams — they are short, so backstitch at both ends.",
        "Sew both side seams and press the allowances open."
      ]},
      { h: "4-2. Bind the neckline and armholes", items: [
        "Sew bias tape around the neckline, following the curve without pulling.",
        "Bind both armholes the same way. Sew slowly around the tight underarm curve."
      ]},
      { h: "4-3. Hem", items: [
        "Turn the hem under twice and stitch."
      ]}
    ],
    sewNote: "Check the neckline goes over the child's head before you bind it. The straps are narrow here, so it is easy to end up with an opening that looks fine flat but will not pass a head.",
    tips: [
      "<strong>Contrast binding</strong>: bias tape in a different color turns a plain tank into something deliberate.",
      "<strong>As an undershirt</strong>: in soft double gauze it works as a base layer under everything.",
      "<strong>Make several</strong>: it uses very little fabric and sews up in under an hour."
    ],
    related: ["kidstee", "kidsvest", "kidsraglan", "camisole"]
  },

  kidscoat: {
    title: "Kids' coat",
    tab: "kids",
    toolName: "Kids' coat",
    sizeStep: "Enter chest, length, shoulder width, sleeve length, cuff width, front overlap, neck width and ease. Presets cover 90–130 cm.",
    desc: "How to sew an unlined coat for children. Fronts, back, sleeves and a stand collar, closed with buttons.",
    keywords: "kids coat,children's coat,how to sew,sewing pattern,wool,unlined,handmade",
    lead: "A simple unlined coat in child sizes. Two fronts, one back, two sleeves and a stand collar — the same construction as a shirt, in heavier fabric. Wool or quilted cotton keeps it warm without needing a lining.",
    matNote: "size 110 cm",
    materials: [
      "Main fabric (wool, quilted cotton or heavy twill) — about 110 cm wide × 130 cm (43 × 51 in)",
      "Fusible interfacing — for the collar and front bands",
      "Buttons — 4–5",
      "Optional: lining fabric"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the back (on the fold), the fronts, the sleeves and the collar.",
      "<strong>Cut</strong><br>Cut one back, two fronts, two sleeves and two collar pieces, then fuse interfacing to one collar piece and the front bands.",
      "<strong>Finish the edges</strong><br>Serge or zigzag the shoulder, side and underarm allowances — thick fabric frays badly."
    ],
    sew: [
      { h: "4-1. Finish the front edges", items: [
        "Turn each front edge under twice and stitch, pressing hard first so both sides match."
      ]},
      { h: "4-2. Shoulders and sleeves", items: [
        "Sew both shoulder seams and press the allowances open.",
        "Match the center of each sleeve head to the shoulder seam and sew the sleeve in while everything is flat."
      ]},
      { h: "4-3. Make and attach the collar", items: [
        "Sew the collar pieces right sides together, leaving the lower edge open. Trim the corners, turn and press.",
        "Sandwich the neckline between the collar layers and sew all the way around, then clip the neckline curve."
      ]},
      { h: "4-4. Sides, hem and buttons", items: [
        "Sew from the cuff along the underarm and down to the hem in one line.",
        "Turn the cuffs and hem under twice and stitch. In thick fabric, slipstitching by hand handles the bulk better.",
        "Work buttonholes and sew on the buttons — large ones are easier for small hands."
      ]}
    ],
    sewNote: "Thick fabric needs a bigger needle. A size 14 or 16 will get through wool and quilted cotton; a universal 11 will snap where the seams cross.",
    tips: [
      "<strong>Big buttons</strong>: 2 cm (¾ in) or more, so a child can do the coat up without help.",
      "<strong>Add a lining</strong>: cut the same pattern in lining and it slides on over a jumper instead of sticking.",
      "<strong>Add a hood</strong>: borrow the hood from the kids' hoodie and attach it to the neckline instead of a collar."
    ],
    related: ["kidshoodie", "kidsshirt", "coat", "kidsvest"]
  },

  kidsbibapron: {
    title: "Feeding bib apron",
    tab: "kids",
    toolName: "Feeding bib apron",
    sizeStep: "Enter chest, length, neck opening, sleeve reach and ease. Presets cover 80–110 cm.",
    desc: "How to sew a sleeveless feeding apron for toddlers. It covers the front and ties at the back, and laminated fabric wipes clean.",
    keywords: "feeding bib,smock bib,toddler,how to sew,sewing pattern,laminated fabric,handmade",
    lead: "A large bib that covers the whole front, for the age when meals go everywhere. Sleeveless, so it goes on quickly, and it ties at the back. In laminated or coated fabric you wipe it down instead of washing it.",
    matNote: "size 90 cm",
    materials: [
      "Main fabric (laminated cotton, coated fabric or oilcloth) — about 60 × 60 cm (24 × 24 in)",
      "Bias tape for the edges — about 150 cm (59 in)",
      "Hook-and-loop or a snap for the back",
      "Sewing clips (pins leave permanent holes in laminate)"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body and mark the neck opening.",
      "<strong>Cut</strong><br>Cut one body piece. Use clips rather than pins throughout — laminate keeps every hole you make.",
      "<strong>Finish the edges</strong><br>Laminate does not fray, so the edges only need binding for comfort and strength."
    ],
    sew: [
      { h: "4-1. Bind the neckline", items: [
        "Sew bias tape around the neck opening, clipping the curve so it lies flat.",
        "Leave long tails at the back — those become the ties."
      ]},
      { h: "4-2. Bind the outer edges", items: [
        "Bind the outer edges the same way, working slowly around the curves.",
        "If the tape sticks to the presser foot, switch to a Teflon foot or lay tissue paper under the work and tear it away afterwards."
      ]},
      { h: "4-3. Finish the back", items: [
        "Add hook-and-loop or a snap at the back neck so it fastens quickly.",
        "Check the neck opening is loose enough to be comfortable but not loose enough to slip off a shoulder."
      ]}
    ],
    sewNote: "Never pin laminated fabric — the holes are permanent and they show. Clips hold it just as well, and if you have to unpick, the stitch line stays visible, so plan the seam before you sew it.",
    tips: [
      "<strong>Add a catch pocket</strong>: a fold along the bottom edge, stitched at the sides, catches everything that falls.",
      "<strong>Long enough to matter</strong>: it should reach past the highchair tray, or the food lands on the lap anyway.",
      "<strong>Make two</strong>: one is always in the wash at exactly the wrong moment."
    ],
    related: ["stai", "apron", "smock", "kappogi"]
  },

  jinbeipants: {
    title: "Jinbei shorts",
    tab: "kids",
    toolName: "Jinbei shorts",
    sizeStep: "Enter hip, rise, inseam, ease and the waist casing. Presets cover 90–130 cm.",
    desc: "How to sew jinbei shorts with an elastic waist. Front and back use the same pattern piece, so it is four pieces and three seams.",
    keywords: "jinbei shorts,japanese summer wear,kids,how to sew,sewing pattern,elastic waist,handmade",
    lead: "The shorts that go with the jinbei top. Front and back use the same pattern piece, the waist is elastic, and there is nothing to fit — which makes them one of the quickest things here to sew. In plain fabric they work as ordinary summer shorts too.",
    matNote: "size 110 cm",
    materials: [
      "Main fabric (cotton, crinkle cotton or shijira weave) — about 110 cm wide × 60 cm (43 × 24 in)",
      "Flat elastic (2 cm / ¾ in wide) — the child's waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line, seam line and the crotch curve.",
      "<strong>Cut</strong><br>Cut two fronts and two backs from the same pattern, flipping it for the second of each pair.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the seam allowances."
    ],
    sew: [
      { h: "4-1. Sew the crotch seams", items: [
        "Sew the two fronts together along the center front curve, then the two backs."
      ]},
      { h: "4-2. Sides and inseams", items: [
        "Sew both side seams, then the inseam in one run from hem to hem.",
        "Backstitch two or three times over the crotch junction — it takes the strain when a child climbs."
      ]},
      { h: "4-3. Waist and hem", items: [
        "Fold the waist edge over twice to make a casing and stitch, leaving a gap.",
        "Thread the elastic to about 85% of the child's waist, stitch the ends and close the gap.",
        "Turn the hems up twice and stitch."
      ]}
    ],
    sewNote: "Children dress themselves, so do not make the elastic tight. About 85% of the actual waist is enough to stay up, and it is worth checking against the child rather than the tape measure.",
    tips: [
      "<strong>Make the set</strong>: the jinbei top in the same fabric and size preset.",
      "<strong>Cool fabrics</strong>: textured weaves do not cling to damp skin.",
      "<strong>Plain colors</strong>: made up plain, these are simply good summer shorts."
    ],
    related: ["jinbei", "kidshalf", "kidsculotte", "pants"]
  },

  kidsculotte: {
    title: "Kids' culottes",
    tab: "kids",
    toolName: "Kids' culottes",
    sizeStep: "Enter hip, rise, inseam and hem flare. Presets cover 90–130 cm.",
    desc: "How to sew culottes for children. They look like a skirt but move like shorts, so nothing flies up in the playground.",
    keywords: "culottes,skort,kids,how to sew,sewing pattern,elastic waist,handmade",
    lead: "It looks like a skirt and moves like shorts, so there is nothing to worry about on the climbing frame. Front and back use the same pattern piece — cut four, sew three seams, add elastic. A nursery and primary-school favorite.",
    matNote: "size 120 cm",
    materials: [
      "Main fabric (cotton, linen or denim) — about 110 cm wide × 70 cm (43 × 28 in)",
      "Flat elastic (2 cm / ¾ in wide) — the child's waist measurement"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line and seam line.",
      "<strong>Cut</strong><br>Cut two fronts and two backs from the same pattern, four pieces in total.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the seam allowances."
    ],
    sew: [
      { h: "4-1. Sew the crotch seams", items: [
        "Sew the two fronts together along the center front curve, then the two backs."
      ]},
      { h: "4-2. Sides and inseams", items: [
        "Sew both side seams, then the inseam in one run from hem to hem, reinforcing the crotch junction."
      ]},
      { h: "4-3. Waist and hem", items: [
        "Fold the waist edge over twice, stitch leaving a gap, thread the elastic, stitch the ends and close.",
        "Hem the legs with a double fold."
      ]}
    ],
    sewNote: "The hem is wider than the leg above it, so the outer edge is longer when you turn it up. Ease it in a little at a time as you fold, or bind the edge with bias tape instead.",
    tips: [
      "<strong>Everyday nursery wear</strong>: no restrictions on climbing or sitting, which is why nurseries like them.",
      "<strong>Add pockets</strong>: side pockets are always welcome.",
      "<strong>Length changes everything</strong>: short reads as culottes, long reads as gaucho pants."
    ],
    related: ["jinbeipants", "kidshalf", "gather", "culotte"]
  },

  kidsshirt: {
    title: "Kids' shirt",
    tab: "kids",
    toolName: "Kids' shirt",
    sizeStep: "Enter chest, length, shoulder width, sleeve length, front overlap and ease. Presets cover 90, 110 and 130 cm.",
    desc: "How to sew a button-front shirt for children. Two fronts, one back, two sleeves and a stand collar — three to five buttons is enough.",
    keywords: "kids shirt,children's shirt,how to sew,sewing pattern,collar,oxford,handmade",
    lead: "A button-front shirt in child sizes. The construction is the same as an adult shirt, but the pieces are smaller, the seams are shorter and three to five buttons covers it. Good for nursery, school and weekends alike.",
    matNote: "size 110 cm",
    materials: [
      "Main fabric (oxford, broadcloth or linen) — about 110 cm wide × 110 cm (43 × 43 in)",
      "Lightweight fusible interfacing — about 30 cm (12 in) for the collar and front bands",
      "Buttons (1–1.3 cm / ½ in) — 3–5",
      "Sewing thread to match"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the back (on the fold), the fronts, the sleeves and the collar. The fronts already include the button band allowance.",
      "<strong>Cut</strong><br>Cut one back, two fronts, two sleeves and two collar pieces.",
      "<strong>Apply interfacing</strong><br>Fuse interfacing to one collar piece and the front band area — buttonholes fray without it.",
      "<strong>Finish the edges</strong><br>Zigzag the shoulder, side and underarm allowances."
    ],
    sew: [
      { h: "4-1. Finish the front edges", items: [
        "Turn each front edge under twice by the overlap width and stitch. Press the folds firmly first so both sides come out the same.",
        "Do this first — once the collar is on, the presser foot will not fit."
      ]},
      { h: "4-2. Shoulders and sleeves", items: [
        "Sew both shoulder seams and press the allowances open.",
        "Match the center of each sleeve head to the shoulder seam and sew the sleeve in.",
        "Child armholes are small — the free arm on your machine makes this much easier."
      ]},
      { h: "4-3. Make and attach the collar", items: [
        "Sew the collar pieces right sides together, leaving the lower edge open. Trim the corners and turn.",
        "Sandwich the neckline between the collar layers and sew around, lining the collar ends up with the folded front edges.",
        "Clip the neckline curve so the collar stands rather than fights the neckline."
      ]},
      { h: "4-4. Sides, cuffs and buttons", items: [
        "Sew from the cuff along the underarm and down to the hem in one line.",
        "Turn the cuffs and hem under twice and stitch.",
        "Work buttonholes on the right front and sew buttons on the left, evenly spaced with the first 1 cm below the collar."
      ]}
    ],
    sewNote: "Always test a buttonhole on a scrap first. Machines differ, and a hole a millimetre short will not take the button while one cut long lets it slip open. The right length is the button diameter plus its thickness.",
    tips: [
      "<strong>Snaps for small children</strong>: plastic snaps are far easier for little fingers than buttonholes.",
      "<strong>Short sleeves</strong>: shorten the sleeve and the same pattern covers summer.",
      "<strong>Add a name tag</strong>: inside the back neck, it also tells the child which way round it goes."
    ],
    related: ["shirt", "kidstee", "kidsvest", "smock"]
  },

  /* ===================== baby ===================== */

  sleeper: {
    title: "Baby sleep sack",
    tab: "baby",
    toolName: "Baby sleep sack",
    sizeStep: "Enter chest, length, neck width, armhole depth and hem flare. Presets cover 0–1, 1–2 and 2–3 years.",
    desc: "How to sew a sleeveless baby sleep sack. Two fronts and one back, snapped down the front — it stays on when the blanket comes off.",
    keywords: "sleep sack,baby sleeping bag,wearable blanket,how to sew,sewing pattern,gauze,handmade",
    lead: "Babies kick their blankets off. A sleep sack stays put. Two fronts and one back is the whole construction, opening down the front with snaps. Six-layer gauze works all year; fleece is for winter.",
    matNote: "size 1–2 years",
    materials: [
      "Main fabric (six-layer gauze, fleece or quilted cotton) — about 100 × 110 cm (39 × 43 in)",
      "Lining fabric (the same, or plain cotton) — the same amount",
      "Bias tape for the neckline and armholes — about 150 cm (59 in)",
      "Snap fasteners — 4–5 sets"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the back (on the fold) and the two fronts.",
      "<strong>Cut</strong><br>Cut the back and both fronts in outer and lining.",
      "<strong>Finish the edges</strong><br>Everything is enclosed between two layers, so no edge finishing is needed."
    ],
    sew: [
      { h: "4-1. Assemble the outer and the lining", items: [
        "Sew the outer fronts to the outer back at the shoulders and sides.",
        "Assemble the lining the same way."
      ]},
      { h: "4-2. Join outer and lining", items: [
        "Place them right sides together and sew around the front edges and the hem, leaving a 10 cm (4 in) gap to turn through.",
        "Trim the corners, turn through the gap, press and close the gap."
      ]},
      { h: "4-3. Bind the neckline and armholes", items: [
        "With outer and lining now behaving as one layer, bind the neckline and both armholes with bias tape."
      ]},
      { h: "4-4. Add the snaps", items: [
        "Fit 4–5 snaps down the center front, evenly spaced."
      ]}
    ],
    sewNote: "Place the top and bottom snaps first, then divide the space between them evenly — snaps spaced by eye always drift. Leave the neck one loose enough not to press on the throat.",
    tips: [
      "<strong>Season by fabric</strong>: single-layer gauze for summer, lined fleece or quilted cotton for winter. Same pattern either way.",
      "<strong>Wide at the hem</strong>: a generous hem flare lets the legs move when the baby rolls over.",
      "<strong>Make two</strong>: it is used every night, so one is always in the wash."
    ],
    related: ["swaddle", "babyblanket", "kidsrompers", "babypants"]
  },

  babyshoes: {
    title: "Baby shoes",
    tab: "baby",
    toolName: "Baby shoes",
    sizeStep: "Enter foot length, foot width and the opening height. Presets cover newborn, 3–6 and 6–12 months.",
    desc: "How to sew soft baby shoes. A sole, a toe piece and a heel piece — the sole sandwiches the other two, so the seams disappear inside.",
    keywords: "baby shoes,soft booties,first shoes,how to sew,sewing pattern,baby gift,handmade",
    lead: "Soft first shoes in three pieces: a sole, a toe and a heel. For babies who are not walking yet, so they are about warmth and looks rather than support. Add lining and thin batting and they come out plump — which is why they make such a good baby gift.",
    matNote: "one pair, 3–6 months",
    materials: [
      "Main fabric (cotton, corduroy or felt) — about 30 × 30 cm (12 × 12 in)",
      "Lining fabric (gauze or cotton) — the same amount",
      "Lightweight batting — about 30 × 30 cm (12 × 12 in)",
      "Optional: narrow elastic for the opening, or ribbon"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the sole, the toe and the heel, and mark the notches — they set where the pieces overlap.",
      "<strong>Cut</strong><br>For one pair: two soles, two toes and two heels, each in outer and lining. Remember to mirror the second shoe.",
      "<strong>Finish the edges</strong><br>Everything is enclosed, so no edge finishing is needed."
    ],
    sew: [
      { h: "4-1. Make the toe and heel", items: [
        "Sew the toe outer and lining right sides together along the upper curve — that curve becomes the shoe opening. Turn and press.",
        "Make the heel the same way, sewing along its opening edge."
      ]},
      { h: "4-2. Arrange them on the sole", items: [
        "Lay the outer sole right side up and place the toe piece at the front and the heel piece at the back, both right side up.",
        "Overlap their side edges slightly and baste all the way around the edge of the sole, using the notches to place them."
      ]},
      { h: "4-3. Close the sole", items: [
        "Lay the lining sole on top, right sides together, sandwiching the toe and heel between the two soles.",
        "Sew around the sole, leaving a 4 cm (1½ in) gap.",
        "Clip the curved seam allowance, turn through the gap, close it and shape the shoe. Repeat for the other foot."
      ]}
    ],
    sewNote: "Sandwiching the toe and heel between the two soles and sewing them in one pass is what makes these look neat — attach them separately and every raw edge shows on the inside.",
    tips: [
      "<strong>Keep them on</strong>: elastic through the opening, or a strip of elastic at the heel, stops them being kicked off.",
      "<strong>Once they pull to stand</strong>: add a non-slip sole sheet or use non-slip fabric for the sole.",
      "<strong>As a gift</strong>: tiny, sweet and made from scraps — one of the best things on this site to give away."
    ],
    related: ["babymitten", "babyhat", "legwarmer", "stai"]
  },

  babymitten: {
    title: "Baby mittens",
    tab: "baby",
    toolName: "Baby mittens",
    sizeStep: "Enter palm width, total length and the elastic casing fold. Presets cover newborn, 3–6 and 6–12 months.",
    desc: "How to sew scratch mittens for a newborn. One pattern piece, sewn in pairs — small enough to make from scraps.",
    keywords: "baby mittens,scratch mittens,newborn,how to sew,sewing pattern,gauze,handmade",
    lead: "Newborns scratch their own faces. These are the little mittens that stop it. One pattern piece, two layers sewn right sides together and turned. Small enough that a scrap of double gauze or jersey will do.",
    matNote: "one pair",
    materials: [
      "Main fabric (double gauze, jersey or anything soft) — about 30 × 30 cm (12 × 12 in)",
      "Narrow flat elastic (0.6–0.8 cm / ¼ in wide) — about 30 cm (12 in), or 60 cm (24 in) of ribbon",
      "Bodkin (a safety pin works)"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>These are small pieces, so mark thin, accurate lines — a thick chalk line is a real error at this size.",
      "<strong>Cut</strong><br>Cut four mitten pieces: two per hand. Cut knit and gauze lying flat and relaxed.",
      "<strong>Finish the edges</strong><br>Zigzag the wrist edge if the fabric frays; the rest is enclosed."
    ],
    sew: [
      { h: "4-1. Make the wrist casing", items: [
        "On each piece, fold the straight wrist edge under by 1 cm, then again by the casing width.",
        "Stitch close to the fold. Do all four pieces.",
        "Do the wrists first — once the mitten is a closed bag it is far too small to get a presser foot inside."
      ]},
      { h: "4-2. Sew the pairs", items: [
        "Place two pieces right sides together and sew all the way around except the wrist.",
        "Clip the curve at the fingertip every 5 mm (¼ in) so it turns out round rather than pointed.",
        "Repeat for the second mitten."
      ]},
      { h: "4-3. Turn and thread the elastic", items: [
        "Turn through the wrist opening and ease the fingertip out with a point turner. Press.",
        "Thread the elastic. It should be slightly shorter than the baby's wrist — but you must still be able to slip a finger underneath.",
        "Overlap and stitch the elastic ends, then close the opening with a few stitches."
      ]}
    ],
    sewNote: "Never make the elastic tight. A baby's wrist is tiny and marks easily. Check you can slide a finger under it, and if you are unsure, thread ribbon instead and tie it loosely.",
    tips: [
      "<strong>Watch the inside</strong>: this surface sits against the baby's skin, so check no thread ends are left inside after turning.",
      "<strong>Pre-wash gauze</strong>: double gauze shrinks by about 10%. Wash, dry and press before cutting.",
      "<strong>As a gift</strong>: make them in the same fabric as a bib and a baby hat for a three-piece set."
    ],
    related: ["stai", "babyhat", "babyshoes", "legwarmer"]
  },

  babycape: {
    title: "Baby cape",
    tab: "baby",
    toolName: "Baby cape",
    sizeStep: "Enter neck circumference, length from the neck and neck ease. Presets cover newborn, 0–1 and 1–2 years.",
    desc: "How to sew a baby cape. It is cut as a quarter-circle from folded fabric, so a large piece comes together in minutes.",
    keywords: "baby cape,car seat cape,pram cape,how to sew,sewing pattern,fleece,handmade",
    lead: "A cape you throw over a baby in a carrier or a pram. No sleeves, so it goes on easily and does not bunch up in a car seat. The pattern is a quarter-circle: fold the fabric in four, cut once, and the whole thing is done.",
    matNote: "size 0–1 year",
    materials: [
      "Main fabric (fleece, wool or double gauze) — about 110 cm wide × 90 cm (43 × 35 in)",
      "Snap fasteners or covered buttons — 1–2 sets",
      "Optional: fabric for a hood, or bias tape for the neckline"
    ],
    cut: [
      "<strong>Fold the fabric in four</strong><br>Fold it in half, then in half again. The corner where the two folds meet is the center of the cape.",
      "<strong>Place the pattern</strong><br>Line the right-angled corner of the quarter-circle pattern up with that folded corner and trace the neck arc and the hem arc.",
      "<strong>Cut</strong><br>Cut through all four layers. Opened out you have a doughnut. Cut one straight line from the outer edge to the neck — that is the front opening."
    ],
    sew: [
      { h: "4-1. Finish the front edges and hem", items: [
        "Turn both front edges under twice and stitch.",
        "Hem the outer arc the same way. It is a curve, so the outer edge is longer — ease it in gradually or press as you go.",
        "Fleece does not fray, so you can leave the hem raw."
      ]},
      { h: "4-2. Finish the neckline", items: [
        "Sew bias tape around the inner arc, right sides together, then turn it to the inside and stitch it down.",
        "Without tape, clip the allowance every 7–8 mm before folding — a curve that is not clipped will not lie flat."
      ]},
      { h: "4-3. Add the fastening", items: [
        "Fit one or two snaps near the neck at the front. Two, one above the other, keeps the wind out.",
        "If you use buttons, sew them on with doubled thread — a baby will pull at them."
      ]}
    ],
    sewNote: "A circular piece stretches under its own weight, most of all on the bias. Finish the neckline the same day you cut it, and store it flat rather than on a hanger.",
    tips: [
      "<strong>Add a hood</strong>: attach the hood from the hoodie pattern to the neckline and it becomes far warmer.",
      "<strong>Make it reversible</strong>: cut two, sew right sides together and turn. You skip the front and hem folds, so it is barely more work.",
      "<strong>Fleece is fastest</strong>: it does not fray, so only the neckline needs finishing. A good first project."
    ],
    related: ["swaddle", "babyhat", "carriercover", "poncho"]
  },

  babypants: {
    title: "Baby pull-on pants",
    tab: "baby",
    toolName: "Baby pull-on pants",
    sizeStep: "Enter hip, rise, inseam, ease, crotch extension, waist casing and hem casing. Presets cover 60, 70, 80 and 90 cm.",
    desc: "How to sew baby pants with a deep rise that fits over a diaper. Elastic at the waist and at the hems.",
    keywords: "baby pants,baby trousers,diaper cover,how to sew,sewing pattern,elastic,handmade",
    lead: "Pants with a rise deep enough to go over a diaper. Front and back use the same pattern piece, so you cut four and sew in three stages: crotch, sides and inseam, then elastic. Elastic at the hems as well as the waist means they stay put through crawling.",
    matNote: "size 80 cm",
    materials: [
      "Main fabric (jersey, double gauze or light cotton) — about 110 cm wide × 60 cm (43 × 24 in)",
      "Flat elastic (1.5 cm / ⅝ in wide) — about 50 cm (20 in) for the waist",
      "Narrow flat elastic (0.8 cm / ⅜ in wide) — about 40 cm (16 in) for the hems",
      "Bodkin"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the cut line, seam line and the crotch curve.",
      "<strong>Cut</strong><br>Cut two fronts and two backs from the same pattern, flipping it for the second of each pair.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the allowances. Knit does not need it."
    ],
    sew: [
      { h: "4-1. Sew the crotch seams", items: [
        "Sew the two fronts together along the center front curve, then the two backs.",
        "Clip the curves every 5 mm (¼ in) so they open flat."
      ]},
      { h: "4-2. Sides and inseams", items: [
        "Sew both side seams, then the inseam in one run from hem to hem.",
        "Backstitch two or three times over the crotch junction."
      ]},
      { h: "4-3. Waist elastic", items: [
        "Fold the waist edge over twice to make a casing and stitch, leaving a 3 cm (1¼ in) gap.",
        "Thread the 1.5 cm elastic to about 85% of the baby's waist, stitch the ends and close the gap."
      ]},
      { h: "4-4. Hems", items: [
        "Make a casing at each hem the same way and thread the narrow elastic.",
        "Set it loosely around the calf for a soft, gathered leg — or skip the hem elastic entirely for straight legs."
      ]}
    ],
    sewNote: "The room for the diaper comes from the rise and the crotch extension. With cloth diapers, add 2–3 cm (1 in) to the rise beyond the preset. With disposables the preset is enough.",
    tips: [
      "<strong>Loose leg elastic</strong>: a baby's legs move constantly. The hem elastic should leave no mark at all.",
      "<strong>Mark the back</strong>: front and back are the same shape, so a tag or a line of stitching inside the back waist saves confusion at 3 am.",
      "<strong>Make a set</strong>: the same fabric as a bib or a baby hat."
    ],
    related: ["bloomers", "kidsrompers", "sleeper", "legwarmer"]
  },

  babyblanket: {
    title: "Baby blanket",
    tab: "baby",
    toolName: "Baby blanket",
    sizeStep: "Enter the width, length and corner radius. Presets cover pram size, standard and large.",
    desc: "How to sew a baby blanket. Two layers sewn right sides together and turned — with rounded corners so it turns out neatly.",
    keywords: "baby blanket,pram blanket,how to sew,sewing pattern,gauze,baby gift,handmade",
    lead: "A small blanket for the pram or for naps. Sew the two layers right sides together, turn through the gap, topstitch. Gauze on one side and fleece on the other makes it work all year. Embroider a name and it becomes a baby gift.",
    matNote: "standard size",
    materials: [
      "Main fabric (six-layer gauze or printed cotton) — about 110 cm wide × 110 cm (43 × 43 in)",
      "Backing fabric (fleece or double gauze) — the same amount",
      "Optional: wide bias tape if you bind the edges instead"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>If you want rounded corners, trace the curves. With the radius set to zero it is a plain rectangle, so mark it straight onto the fabric instead of printing.",
      "<strong>Cut</strong><br>Cut one piece in each fabric, the same size.",
      "<strong>Straighten the grain</strong><br>Over this area, a skewed grain shows. Pull the fabric gently on the diagonal until the threads sit square, then press."
    ],
    sew: [
      { h: "4-1. Sew the layers together", items: [
        "Place the two layers right sides together and clip all four sides.",
        "Sew all the way around, leaving a 15 cm (6 in) gap in the middle of one long side.",
        "If the corners are rounded, clip the seam allowance every 1 cm (⅜ in)."
      ]},
      { h: "4-2. Turn and press", items: [
        "Turn through the gap. Push the corners out gently with a point turner rather than forcing them.",
        "Press the edges firmly, folding the seam allowance at the gap to the inside as you go."
      ]},
      { h: "4-3. Topstitch", items: [
        "Topstitch 5 mm (¼ in) from the edge all the way around. This closes the gap and stops the layers shifting in the wash."
      ]},
      { h: "4-4. Tack the middle (optional)", items: [
        "On a large blanket, tack the two layers together at a few points so they cannot shift.",
        "Two or three stitches every 20–30 cm (8–12 in), with the knots hidden, is enough."
      ]}
    ],
    sewNote: "The corner radius makes more difference than you would expect. A generous 3–4 cm (1½ in) radius turns out cleanly; square corners collect fabric and bulge however carefully you trim.",
    tips: [
      "<strong>Bind instead</strong>: lay the two layers wrong sides together and bind the edge with wide bias tape. No gap to close, and easier on a large blanket.",
      "<strong>Embroider a name</strong>: add it before the topstitching and it becomes a real gift.",
      "<strong>Skip the pattern</strong>: with square corners it is a rectangle. Ruling it onto the fabric is faster than printing and taping sheets."
    ],
    related: ["swaddle", "sleeper", "petmat", "cushioncover"]
  },

  babytoy: {
    title: "Baby rattle toy",
    tab: "baby",
    toolName: "Baby rattle toy",
    sizeStep: "Enter the diameter and how far the ribbon loop sticks out. Presets cover small, standard and large.",
    desc: "How to sew a soft rattle for a baby. Two pieces, turned and stuffed with a bell inside — half an hour from scraps.",
    keywords: "baby rattle,soft toy,grasping toy,how to sew,sewing pattern,baby gift,handmade",
    lead: "A palm-sized soft toy for a baby to grip. Two pieces sewn right sides together, turned, and filled with stuffing and a bell — half an hour, start to finish. Catch a loop of ribbon in the seam and it clips to a pram or a car seat.",
    matNote: "one toy",
    materials: [
      "Main fabric (printed cotton or double gauze) — two scraps about 20 × 20 cm (8 × 8 in)",
      "Toy stuffing — a handful",
      "Craft bell (a plastic rattle ball is safest) — 1",
      "Ribbon (1–1.5 cm / ½ in wide) — 10 cm (4 in)"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>It is small, so a shifted line changes the shape. Mark carefully.",
      "<strong>Cut</strong><br>Cut two pieces. A print on one side and a plain on the other gives it two faces.",
      "<strong>Finish the edges</strong><br>Not needed — everything is enclosed."
    ],
    sew: [
      { h: "4-1. Position the ribbon", items: [
        "Fold the ribbon into a loop and lay it on the right side of one piece with the loop pointing inward.",
        "Keep the ribbon ends inside the seam allowance and baste or tape them in place.",
        "Pointing the loop outward is the classic mistake — it ends up inside the toy after turning."
      ]},
      { h: "4-2. Sew the two pieces", items: [
        "Lay the second piece on top, right sides together, and sew all the way around leaving a 4 cm (1½ in) gap.",
        "Clip the curve every 5 mm (¼ in) — it is a round shape and will turn out lumpy without it.",
        "Backstitch two or three times over the ribbon. That is what a baby pulls on."
      ]},
      { h: "4-3. Stuff it", items: [
        "Turn through the gap and shape it.",
        "Add the stuffing in small pieces, filling the outside first and the middle last. One big lump gives a bumpy toy.",
        "When it is about half full, drop the bell in and pack stuffing around it so it sits centrally.",
        "Stuff it so it squashes when squeezed — packed hard, a baby cannot grip it."
      ]},
      { h: "4-4. Close the gap", items: [
        "Fold the seam allowance in and close with ladder stitch.",
        "Use doubled thread and go around twice — this is the first seam a baby will open."
      ]}
    ],
    sewNote: "This will go in the baby's mouth. Do not add buttons, beads or small appliqués — anything that can come off can be swallowed. A plastic craft rattle ball is safer than a small metal bell.",
    tips: [
      "<strong>Crinkle sound</strong>: a scrap of laminated fabric or plastic tucked in with the stuffing makes the crackle babies love.",
      "<strong>Make it washable</strong>: washable fabric and washable stuffing. This toy will be covered in dribble within a day.",
      "<strong>Make a few</strong>: two or three in different prints wrap up beautifully as a gift."
    ],
    related: ["pettoy", "teddy", "stai", "babymitten"]
  },

  diaperpouch: {
    title: "Diaper pouch",
    tab: "baby",
    toolName: "Diaper pouch",
    sizeStep: "Enter the finished width, height, gusset and flap depth. Presets cover small, standard and large.",
    desc: "How to sew a diaper pouch that opens flat into a changing mat. Body, flap and a handle.",
    keywords: "diaper pouch,diaper wallet,changing pouch,how to sew,sewing pattern,laminated,handmade",
    lead: "A pouch that holds diapers and wipes together, and opens out flat to become a changing mat. Body, flap and handle. In laminated fabric you wipe it down in seconds, which matters more than it sounds.",
    matNote: "standard size",
    materials: [
      "Main fabric (laminated cotton, oxford or canvas) — about 70 × 60 cm (28 × 24 in)",
      "Lining fabric (wipe-clean fabric works best) — the same amount",
      "Snap fastener or hook-and-loop — 1 set",
      "Sewing clips"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body (base on the fold), the flap and the handle.",
      "<strong>Cut</strong><br>Cut the body in outer and lining, the flap in outer and lining, and one handle. Use clips rather than pins on laminate.",
      "<strong>Finish the edges</strong><br>Laminate does not fray. Zigzag the allowances on ordinary fabric."
    ],
    sew: [
      { h: "4-1. Make the flap and handle", items: [
        "Sew the flap outer and lining right sides together, leaving the attachment edge open. Turn, press and topstitch.",
        "Fold the handle in quarters lengthwise and topstitch both long edges."
      ]},
      { h: "4-2. Sew the body and gusset", items: [
        "Fold the body at the base, right sides together, and sew both sides. Do the same with the lining, leaving a 10 cm (4 in) gap in one side.",
        "Pinch each base corner into a triangle, matching the side seam to the base fold, and sew across to form the gusset."
      ]},
      { h: "4-3. Join and finish", items: [
        "Turn the outer right side out and slip it inside the lining, right sides together.",
        "Catch the flap at the back edge and the handle at the side as you sew around the opening.",
        "Turn through the gap in the lining, close it, push the lining inside and topstitch around the opening.",
        "Add the snap or hook-and-loop so the flap holds shut."
      ]}
    ],
    sewNote: "Laminated fabric sticks to the presser foot. A Teflon foot solves it, or lay tissue paper on top and tear it away afterwards. And never pin — the holes are permanent.",
    tips: [
      "<strong>Wipe-clean lining</strong>: this is what turns it into a changing mat you can actually use on a public bench.",
      "<strong>Size it around the diapers</strong>: measure the pack you buy, not the baby.",
      "<strong>Add a wipes slot</strong>: an opening in the lining lets you pull wipes out one at a time."
    ],
    related: ["wipescase", "pouchgusset", "carriercover", "movepocket"]
  },

  wipescase: {
    title: "Baby wipes case",
    tab: "baby",
    toolName: "Baby wipes case",
    sizeStep: "Enter the pack width, depth and height, and the opening width. Presets cover standard and large packs.",
    desc: "How to sew a cover for a shop-bought pack of baby wipes. A lid, an opening and hook-and-loop.",
    keywords: "wipes case,wipes cover,baby wipes,how to sew,sewing pattern,laminated,handmade",
    lead: "A cover that slips over a plastic pack of wipes. Cut an opening in the top, add a lid held shut with hook-and-loop, and the packaging disappears. Refill it forever. Laminated fabric wipes clean, which is the point.",
    matNote: "standard pack",
    materials: [
      "Main fabric (laminated cotton, oxford or canvas) — about 60 × 50 cm (24 × 20 in)",
      "Lining fabric — the same amount, or omit for a single layer",
      "Hook-and-loop — one 2.5 cm (1 in) square set",
      "Lightweight interfacing if the fabric is thin"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body and the lid, and mark the opening position on the top face.",
      "<strong>Cut</strong><br>Cut the body in outer and lining, and the lid in outer and lining. Use clips on laminate, not pins.",
      "<strong>Finish the edges</strong><br>Laminate does not fray; zigzag ordinary fabric."
    ],
    sew: [
      { h: "4-1. Make the opening", items: [
        "Cut out the marked opening through both the outer and the lining.",
        "Place them right sides together and sew around the opening.",
        "Trim the allowance to 5 mm, clip the curves, then pull the whole piece through the hole to turn it right side out. The opening edge is now cleanly bound.",
        "Topstitch 3 mm from the edge all the way around."
      ]},
      { h: "4-2. Assemble the body", items: [
        "Fold the body into a box along the marked fold lines, sewing the corners right sides together to form the sides.",
        "Leave the base open, or close it with hook-and-loop so you can swap packs easily."
      ]},
      { h: "4-3. Make and attach the lid", items: [
        "Sew the lid outer and lining right sides together, leaving the attachment edge open. Turn, press and topstitch.",
        "Stitch the attachment edge to the top face. Sew it twice, or in a stitched rectangle with a cross, because that edge takes strain every time it opens."
      ]},
      { h: "4-4. Add the hook-and-loop", items: [
        "Fit the two halves to the underside of the lid and the matching spot on the top face, with the lid closed so you can see where they land.",
        "Stitch all four sides of each square so the corners cannot lift."
      ]}
    ],
    sewNote: "Do not make the opening too big. Wipes dry out through it, and a large hole weakens the top face so it distorts every time you pull. Two fingers' width is plenty.",
    tips: [
      "<strong>Magnetic snap</strong>: it opens one-handed, which is exactly what you need mid-change.",
      "<strong>Match the diaper pouch</strong>: made in the same fabric, the two look like a set.",
      "<strong>Measure the pack</strong>: brands differ. Measure the one you actually buy."
    ],
    related: ["diaperpouch", "tissuecase", "tissuebox", "carriercover"]
  },

  carriercover: {
    title: "Baby carrier strap covers",
    tab: "baby",
    toolName: "Baby carrier strap covers",
    sizeStep: "Enter the length, strap width, wrap ease and corner radius. Presets cover standard and wide straps.",
    desc: "How to sew drool covers for baby carrier straps. They wrap around and fasten with hook-and-loop, so they come off to wash.",
    keywords: "carrier strap covers,drool pads,suck pads,baby carrier,how to sew,sewing pattern,handmade",
    lead: "Covers that wrap around the shoulder straps of a baby carrier to take the dribble. Babies chew those straps constantly, and washing a whole carrier is a nuisance — these come off in seconds. One pair, fastened with hook-and-loop.",
    matNote: "one pair",
    materials: [
      "Main fabric (printed cotton or oxford) — about 50 × 40 cm (20 × 16 in)",
      "Backing fabric (double gauze or toweling — something absorbent) — the same amount",
      "Hook-and-loop — 2.5 cm (1 in) wide × 20 cm (8 in)",
      "Optional: 2 D-rings for hanging toys"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body including the corner radius.",
      "<strong>Cut</strong><br>Cut two in the main fabric and two in the backing — four pieces for the pair.",
      "<strong>Finish the edges</strong><br>Not needed. Shake toweling out after cutting to lose the loose fibers."
    ],
    sew: [
      { h: "4-1. Attach the hook-and-loop first", items: [
        "Sew it on now — after turning, the stitching would show on the outside.",
        "Sew the hook (stiff) half to the wrong side of the main fabric at one end, and the loop (soft) half to the right side of the backing at the other end.",
        "Wrap a piece around an actual strap first to check where the two ends meet."
      ]},
      { h: "4-2. Sew the layers together", items: [
        "Place main and backing right sides together and sew around, leaving an 8 cm (3 in) gap.",
        "Clip the corner curves and trim the allowance to 5 mm."
      ]},
      { h: "4-3. Turn and topstitch", items: [
        "Turn through the gap, ease the corners out and press.",
        "Topstitch 5 mm from the edge all the way around, closing the gap as you go.",
        "Make the second cover the same way."
      ]},
      { h: "4-4. Add D-rings (optional)", items: [
        "Catch a small self-fabric loop with a D-ring in the seam to hang toys or a pacifier clip.",
        "Add it before you topstitch, somewhere other than the turning gap."
      ]}
    ],
    sewNote: "Hook on the main fabric, loop on the backing — get that the wrong way round and the two halves never face each other when wrapped. Wrap a test piece around the real strap before you stitch anything down.",
    tips: [
      "<strong>Toweling backing</strong>: this side takes the dribble. Toweling or gauze absorbs; printed cotton just spreads it.",
      "<strong>Add batting</strong>: one layer of thin batting makes them plumper and nicer to chew. Allow a little extra length for the thickness.",
      "<strong>Make two pairs</strong>: otherwise the carrier is out of action while they dry."
    ],
    related: ["stai", "bandanastai", "wipescase", "babycape"]
  },

  nursingcape: {
    title: "Nursing cover",
    tab: "baby",
    toolName: "Nursing cover",
    sizeStep: "Enter the finished width, length, gather allowance at the top and neck strap length. Presets cover compact, standard and generous.",
    desc: "How to sew a nursing cover. Gather the top edge, hang it from a neck strap, and thread wire so you can see the baby.",
    keywords: "nursing cover,breastfeeding cover,how to sew,sewing pattern,boning,double gauze,handmade",
    lead: "A cover to drape over you while feeding out and about. The construction is simple — gather the top edge of a rectangle and hang it from a strap — but the wire threaded through the top is what makes it work, holding the neckline open so you can see how the feed is going.",
    matNote: "standard size",
    materials: [
      "Main fabric (double gauze, light cotton or linen) — about 110 cm wide × 80 cm (43 × 31 in)",
      "Craft wire or shape-retaining tape — about 40 cm (16 in)",
      "Strap slider — 1",
      "Thread to match"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body, the neck strap and the wire casing. The body is a rectangle, so you can mark it straight onto the fabric.",
      "<strong>Cut</strong><br>Cut one body, one strap and one wire casing. The body width already includes the gathering allowance.",
      "<strong>Finish the edges</strong><br>Not needed — everything is double-folded. Pre-wash gauze before cutting."
    ],
    sew: [
      { h: "4-1. Hem three sides", items: [
        "Turn both sides and the lower edge under twice and stitch. Leave the top edge alone.",
        "Doing these first is the trick — once the top is gathered, the fabric bunches and these hems become fiddly."
      ]},
      { h: "4-2. Attach the wire casing", items: [
        "Fold the long edges of the casing strip under and press.",
        "Stitch it to the wrong side of the top edge, centered, with two rows of stitching. Leave both ends open.",
        "Do not insert the wire yet — that comes after gathering."
      ]},
      { h: "4-3. Gather the top edge", items: [
        "Run two rows of long stitches along the top edge, at 5 mm and 10 mm from the raw edge.",
        "Pull both bobbin threads gently until the edge matches the finished width. Using two rows keeps the gathers even and stops the fabric twisting.",
        "Concentrate the gathers in the middle and keep the ends looser — that is what makes the front stand away from you.",
        "Turn the top edge under twice, over the gathers, and stitch."
      ]},
      { h: "4-4. Make and attach the strap", items: [
        "Fold the strap in quarters lengthwise and topstitch both edges.",
        "Thread the slider on, then stitch the strap ends to the top corners.",
        "Sew them with a stitched rectangle and a cross — the whole weight of the cover hangs from these two points."
      ]},
      { h: "4-5. Insert the wire", items: [
        "Thread the wire through the casing.",
        "The cut ends will work through the fabric as it is used. Bend each end into a loop or seal it with fabric glue first.",
        "Close both ends of the casing with a few stitches, or add snaps so you can remove the wire before washing."
      ]}
    ],
    sewNote: "Finishing the wire ends is not optional — an unfinished craft-wire end will eventually push through the fabric and touch you. Loop or seal both ends before threading. It is the only step here with any consequence.",
    tips: [
      "<strong>The wire is the point</strong>: without it the fabric falls flat against you and you cannot see the baby. That one piece changes the whole thing.",
      "<strong>Pre-wash gauze</strong>: double gauze shrinks about 10%.",
      "<strong>Afterwards</strong>: remove the strap and it becomes a scarf or a lap blanket."
    ],
    related: ["carriercover", "babycape", "stai", "swaddle"]
  },

  strollerseat: {
    title: "Stroller seat liner",
    tab: "baby",
    toolName: "Stroller seat liner",
    sizeStep: "Enter the backrest width and height, seat width and depth, and the corner radius. Presets cover full-recline, lightweight and car seats.",
    desc: "How to sew a seat liner for a stroller or car seat. Back and seat cut as one piece, with slots for the harness.",
    keywords: "stroller liner,pram liner,car seat liner,how to sew,sewing pattern,gauze,handmade",
    lead: "A single-piece liner for a stroller or car seat, with the back and the seat cut as one. It takes the sweat and the spills so the stroller itself stays clean — and a stroller is far harder to wash than a liner. Two is a sensible number to make.",
    matNote: "full-recline stroller",
    materials: [
      "Main fabric (six-layer gauze, toweling or printed cotton) — about 110 cm wide × 90 cm (43 × 35 in)",
      "Backing fabric (muslin or light cotton) — the same amount",
      "Lightweight batting — the same amount, for a little padding",
      "Eyelet pliers, or a buttonhole foot, for the harness slots"
    ],
    cut: [
      "<strong>Measure your stroller</strong><br>Measure the backrest width and height and the seat width and depth. Also measure where the harness straps come through, from the edge of the seat.",
      "<strong>Trace the pattern</strong><br>Trace the body. The marked points are suggested harness slot positions.",
      "<strong>Cut</strong><br>Cut the main and backing fabric, and the batting 1 cm smaller all round so the seam allowance is not bulky.",
      "<strong>Check the slot positions</strong><br>The pattern marks are typical. If your measurements differ, mark your own instead."
    ],
    sew: [
      { h: "4-1. Layer and sew", items: [
        "Stack backing right side up, main fabric right side down, then batting on top.",
        "Sew all the way around, leaving a 15 cm (6 in) gap.",
        "Clip the outer corner curves, and clip into the inward corners where the back meets the seat — skip that and it will pull when turned."
      ]},
      { h: "4-2. Turn and topstitch", items: [
        "Turn through the gap and ease the corners out.",
        "Press the edges, using a pressing cloth and a light hand so the batting is not flattened.",
        "Topstitch 1 cm (⅜ in) from the edge all the way around, closing the gap."
      ]},
      { h: "4-3. Make the harness slots", items: [
        "Mark your measured positions: two for the shoulder straps and one for the crotch strap.",
        "Either set eyelets or work large buttonholes, about 5 mm wider than the harness webbing.",
        "Hold it in the stroller and check the positions before you cut anything. This step cannot be undone.",
        "Stitch a rectangle around each slot so it cannot spread under load."
      ]},
      { h: "4-4. Tack the layers", items: [
        "Tack through all layers at a few points, two or three stitches every 20 cm (8 in), so the batting cannot shift."
      ]}
    ],
    sewNote: "Do not trust the pattern's slot marks. Shoulder strap spacing and crotch strap position vary enormously between models. Measure your own, mark them, then hold the liner in place and check again before you cut.",
    tips: [
      "<strong>Gauze against the skin</strong>: the side the baby lies on should be absorbent. Gauze or toweling, not laminate.",
      "<strong>Make two</strong>: this gets washed constantly.",
      "<strong>Or skip the slots</strong>: for short trips you can simply lay it in place without threading the harness through at all."
    ],
    related: ["babyblanket", "carriercover", "petmat", "chairpad"]
  },

  /* ===================== accessories ===================== */

  potholder: {
    title: "Pot holder",
    tab: "small",
    toolName: "Pot holder",
    sizeStep: "Enter the side length, corner radius, loop length and loop cut width. Presets cover small, standard and large.",
    desc: "How to sew a square pot holder with batting inside and a hanging loop caught in the corner.",
    keywords: "pot holder,trivet,kitchen,how to sew,sewing pattern,batting,handmade",
    lead: "A square pot holder with rounded corners. Batting between two layers, sewn and turned — that is the whole thing. Catch a loop in one corner to hang it up, and make two so you can lift a pan with both hands.",
    matNote: "one pot holder",
    materials: [
      "Main fabric (cotton or linen, 100% natural fiber) — about 25 × 25 cm (10 × 10 in)",
      "Backing fabric — the same amount",
      "Heavy cotton batting — about 25 × 25 cm (10 × 10 in)",
      "Fabric for the loop — about 5 × 12 cm (2 × 5 in)"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body including the corner radius, and the loop strip.",
      "<strong>Cut</strong><br>Cut one main, one backing, one batting and one loop.",
      "<strong>Check the fibers</strong><br>Fabric and batting must both be 100% cotton. Polyester melts against a hot pan."
    ],
    sew: [
      { h: "4-1. Make the loop", items: [
        "Fold the loop strip in quarters lengthwise and topstitch both long edges.",
        "Fold it in half to form a loop."
      ]},
      { h: "4-2. Layer and sew", items: [
        "Stack batting, then backing right side up, then main fabric right side down.",
        "Slip the loop into one corner between the main and backing layers, with the loop pointing inward.",
        "Sew all the way around, leaving an 8 cm (3 in) gap."
      ]},
      { h: "4-3. Turn and finish", items: [
        "Clip the corner curves and turn through the gap.",
        "Press, close the gap, and topstitch all the way around.",
        "Add a grid of stitching across the middle so the batting cannot shift in the wash."
      ]}
    ],
    sewNote: "The loop goes between the main and backing layers with the loop pointing inward — it comes out on the outside when you turn it. Point it outward and it ends up sewn inside, which means unpicking.",
    tips: [
      "<strong>More insulation</strong>: two layers of batting, or a layer of heavy cotton in between, keeps far more heat out.",
      "<strong>Make a pair</strong>: two lets you lift a hot pan with both hands.",
      "<strong>Or a mitt</strong>: if you want to slide your hand inside, use the oven mitt pattern instead."
    ],
    related: ["ovenmitt", "coaster", "placemat", "apron"]
  },

  eyemask: {
    title: "Eye mask",
    tab: "small",
    toolName: "Eye mask",
    sizeStep: "Enter the width, height, nose notch depth and elastic length. Presets cover standard, wide and a child size.",
    desc: "How to sew a sleep mask with a notch for the nose, so light does not leak in at the sides.",
    keywords: "eye mask,sleep mask,how to sew,sewing pattern,silk,travel,handmade",
    lead: "A sleep mask with a notch cut for the nose, which is what stops light creeping in beside it. Two layers sewn right sides together and turned. Line it in silk or gauze and it feels completely different against the skin.",
    matNote: "one mask",
    materials: [
      "Main fabric (cotton or linen) — about 25 × 15 cm (10 × 6 in)",
      "Lining fabric (silk, gauze or interlock) — the same amount",
      "Lightweight batting (for better light blocking) — the same amount",
      "Flat elastic (0.8–1 cm / ⅜ in wide) — about 30 cm (12 in)"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body including the nose notch, and mark where the elastic attaches.",
      "<strong>Cut</strong><br>Cut one main, one lining and, if using, one batting.",
      "<strong>Finish the edges</strong><br>Not needed — everything is enclosed."
    ],
    sew: [
      { h: "4-1. Baste the elastic", items: [
        "Lay the main fabric right side up and baste an elastic end at each marked point, pointing inward.",
        "Check the elastic is not twisted before you stitch."
      ]},
      { h: "4-2. Sew and turn", items: [
        "Lay the lining on top, right sides together (batting on the outside of the stack), and sew around leaving a 6 cm (2½ in) gap.",
        "Clip into the nose notch and any other inward curve. On outward curves, cut small wedges out instead to reduce bulk.",
        "Turn through the gap and press."
      ]},
      { h: "4-3. Finish", items: [
        "Close the gap and topstitch all the way around.",
        "Backstitch over the elastic anchors so they cannot pull out."
      ]}
    ],
    sewNote: "The nose notch is an inward curve, so it will pull when turned unless it is clipped. Clip up to 1–2 mm short of the stitching — close, but not through it.",
    tips: [
      "<strong>Block more light</strong>: one layer of thin batting makes a real difference. Thick batting presses on the eyes.",
      "<strong>Silk lining</strong>: the side against your face is worth spending on. Silk or double gauze.",
      "<strong>Adjustable</strong>: a slider on one side of the elastic lets you set the fit."
    ],
    related: ["neckwarmer", "scarf", "headband", "maskcase"]
  },

  neckwarmer: {
    title: "Neck warmer",
    tab: "small",
    toolName: "Neck warmer",
    sizeStep: "Enter the finished circumference and height. Presets cover child, standard and long.",
    desc: "How to sew a tube neck warmer. Sew the short edges into a loop and hem — done in an afternoon.",
    keywords: "neck warmer,snood,cowl,how to sew,sewing pattern,fleece,handmade",
    lead: "A tube that covers the neck. Sew the short edges together into a loop and hem the top and bottom — you can finish it the same day you start. Fleece or knit works best, and a double layer is warmer and hides every seam.",
    matNote: "standard size",
    materials: [
      "Main fabric (fleece, knit or faux fur) — about 55 × 30 cm (22 × 12 in)",
      "Optional: lining fabric for a double layer — the same amount"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>It is a rectangle, so mark it straight onto the fabric.",
      "<strong>Cut</strong><br>Cut one piece, or two if you are lining it.",
      "<strong>Finish the edges</strong><br>Fleece can be left raw. Anything that frays needs the top and bottom hemmed."
    ],
    sew: [
      { h: "4-1. Single layer", items: [
        "Fold the fabric right sides together and sew the short edges into a loop.",
        "Turn the top and bottom edges under and hem. On fleece you can leave them raw."
      ]},
      { h: "4-2. Double layer", items: [
        "Make two loops, one in each fabric, by sewing the short edges.",
        "Slip one inside the other, right sides together, and sew all the way around one edge.",
        "Turn through the open edge, fold the remaining raw edges inward and stitch them closed."
      ]}
    ],
    sewNote: "Size it to your neck plus ease — but if the fabric does not stretch, check it will go over your head first. Anything smaller than your head circumference simply will not go on.",
    tips: [
      "<strong>Check the head measurement</strong>: with non-stretch fabric, make the inner circumference at least 56–58 cm (22–23 in).",
      "<strong>Longer is warmer</strong>: extra height lets you pull it up over your chin.",
      "<strong>For dogs too</strong>: the dog snood pattern is the same idea in dog sizes."
    ],
    related: ["scarf", "legwarmer", "armcover", "petsnood"]
  },

  maskcase: {
    title: "Mask case",
    tab: "small",
    toolName: "Mask case",
    sizeStep: "Enter the finished width, height and flap depth. Presets cover child, standard and large.",
    desc: "How to sew a folding case to hold a mask while you eat. One piece folded up and stitched at the sides.",
    keywords: "mask case,mask holder,how to sew,sewing pattern,laminated,handmade",
    lead: "A folding case for the mask you take off at the table. One piece folded up from the bottom with the sides stitched — twenty minutes, start to finish. Add a divider inside and you can keep the used one apart from the spare. Laminated fabric wipes clean.",
    matNote: "one case",
    materials: [
      "Main fabric (laminated cotton, oxford or cotton) — about 30 × 30 cm (12 × 12 in)",
      "Lining fabric — the same amount",
      "Snap fastener or hook-and-loop — 1 set",
      "Lightweight interfacing if the fabric is thin"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body and mark the fold line.",
      "<strong>Cut</strong><br>Cut one main and one lining. Use clips rather than pins on laminated fabric.",
      "<strong>Apply interfacing</strong><br>On thin fabric, fuse interfacing to the main piece so the case holds its shape."
    ],
    sew: [
      { h: "4-1. Sew the layers together", items: [
        "Place main and lining right sides together and sew around, leaving an 8 cm (3 in) gap.",
        "Trim the corners diagonally so they turn out sharp."
      ]},
      { h: "4-2. Turn and topstitch", items: [
        "Turn through the gap, ease the corners out and press.",
        "Topstitch 3–5 mm from the edge all the way around, closing the gap.",
        "You now have a two-sided rectangle."
      ]},
      { h: "4-3. Fold and stitch the sides", items: [
        "Fold up from the bottom at the marked line, leaving the flap standing above.",
        "Stitch both sides 2–3 mm from the edge. This stitching shows, so match your thread to the main fabric.",
        "Backstitch at the start and end of each side seam."
      ]},
      { h: "4-4. Add the fastening", items: [
        "Close the flap and mark where the fastening lands.",
        "Fit a snap or hook-and-loop 2–3 mm outside your mark to allow for the thickness of a mask inside."
      ]}
    ],
    sewNote: "For an internal divider, sew a slightly smaller piece to the lining on three sides at step 4-3, before folding — and hem its top edge first. Neither can be done once the case is assembled.",
    tips: [
      "<strong>Laminated lining</strong>: a wipe-clean inside means a used mask does not contaminate the case.",
      "<strong>Keep it slim</strong>: heavy interfacing makes it too bulky for a pocket. Lightweight is right.",
      "<strong>Other uses</strong>: at other sizes this is a passbook case or a ticket wallet."
    ],
    related: ["mask", "fittedmask", "cardcase", "tissuecase"]
  },

  armcover: {
    title: "Arm covers",
    tab: "small",
    toolName: "Arm covers",
    sizeStep: "Enter the upper arm and wrist circumferences, the length and the elastic casing. Presets cover child, women's and men's.",
    desc: "How to sew tube arm covers with elastic at both ends. Sun protection in summer, sleeve protection for chores.",
    keywords: "arm covers,arm sleeves,UV protection,how to sew,sewing pattern,cooling fabric,handmade",
    lead: "Tapered tubes for keeping the sun off, or keeping your sleeves clean. Sew the long edge into a tube, add a casing at each end, thread elastic. In UV-blocking or cooling knit they earn their keep in summer; in water-repellent fabric they protect your sleeves at the sink.",
    matNote: "one pair",
    materials: [
      "Main fabric (UV-blocking fabric, cooling knit or cotton) — about 60 × 50 cm (24 × 20 in)",
      "Narrow flat elastic (0.8–1 cm / ⅜ in wide) — about 80 cm (32 in)",
      "Bodkin"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>The piece is a tapered rectangle — wider at one end. Mark which end is the top.",
      "<strong>Cut</strong><br>Cut two. Cut stretch fabric lying flat and relaxed.",
      "<strong>Finish the edges</strong><br>Serge or zigzag the long edge."
    ],
    sew: [
      { h: "4-1. Sew into a tube", items: [
        "Fold each piece right sides together lengthwise and sew the long edge.",
        "On stretch fabric use a stretch stitch or a narrow zigzag — a straight stitch will snap as you pull it on.",
        "Press the seam allowance to one side."
      ]},
      { h: "4-2. Make the casings", items: [
        "Fold the wide end under twice to make a casing and stitch, leaving a 2 cm (¾ in) gap.",
        "Do the same at the narrow end."
      ]},
      { h: "4-3. Thread the elastic", items: [
        "Cut the upper elastic 2–3 cm (1 in) shorter than your upper arm — enough to stay up, not enough to dig in.",
        "Cut the lower elastic 1–2 cm shorter than your wrist, but make sure your hand still goes through.",
        "Thread, overlap and stitch the ends, then close the gaps. Repeat for the second cover."
      ]}
    ],
    sewNote: "The balance between the two elastics decides how these wear. Tight at the top and loose at the bottom and they slide down every time you bend your arm. Aim for the least at the top that stays up and the most at the wrist that still lets your hand through.",
    tips: [
      "<strong>Add a thumb hole</strong>: leave 1.5 cm (⅝ in) unsewn at the lower end for your thumb. It covers the back of the hand and stops them riding up.",
      "<strong>Skip the elastic</strong>: in stretchy knit, hemmed ends grip well enough on their own.",
      "<strong>For chores</strong>: water-repellent fabric keeps your sleeves dry at the sink."
    ],
    related: ["legwarmer", "neckwarmer", "headband", "shuushu"]
  },

  keycase: {
    title: "Key case",
    tab: "small",
    toolName: "Key case",
    sizeStep: "Enter the finished width, height and closure tab extension. Presets cover small, standard and large.",
    desc: "How to sew a bi-fold key case. Sew the outer and lining right sides together, turn, fold at the center and hand-stitch the hardware in.",
    keywords: "key case,key holder,how to sew,sewing pattern,leather,scraps,handmade",
    lead: "A small bi-fold case that keeps keys from scratching everything else in your bag. Twenty centimeters of fabric is enough, so this is where a favorite scrap earns its place. Interfacing is what makes it look bought rather than made.",
    matNote: "one case",
    materials: [
      "Main fabric (canvas, faux leather or heavy cotton) — about 25 × 20 cm (10 × 8 in)",
      "Lining fabric — the same amount",
      "Firm fusible interfacing — the same as the main fabric",
      "Key case hardware (a 6-hook key ring plate) — 1",
      "Snap fastener — 1 set"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body and mark the center fold line.",
      "<strong>Cut</strong><br>Cut one main and one lining.",
      "<strong>Apply interfacing</strong><br>Fuse firm interfacing to the main fabric — a key case needs body to hold its shape."
    ],
    sew: [
      { h: "4-1. Sew the layers together", items: [
        "Place main and lining right sides together and sew around, leaving a 6 cm (2½ in) gap.",
        "Clip the curve on a rounded tab, or trim the corners diagonally on a square one."
      ]},
      { h: "4-2. Turn and topstitch", items: [
        "Turn through the gap, ease the corners out and press.",
        "Topstitch 3 mm from the edge all the way around, closing the gap. Slow the machine down — it is thick."
      ]},
      { h: "4-3. Attach the hardware", items: [
        "Position the key plate on the center fold line.",
        "Stitch it on by hand through its mounting holes. The machine cannot reach past the metal, so this part is hand sewing.",
        "Use doubled heavy thread and go back and forth four or five times per hole — the weight of the keys hangs here permanently."
      ]},
      { h: "4-4. Add the snap", items: [
        "Fold at the center and check where the tab reaches.",
        "Fit the snap, allowing for the thickness of the keys inside."
      ]}
    ],
    sewNote: "Hand-stitching the hardware is the one step people rush, and it is the one that fails. Doubled thread, four or five passes per hole, and hide the knots between the layers if you can.",
    tips: [
      "<strong>Faux leather needs no interfacing</strong>: it has body of its own. But every needle hole is permanent, so sew it once.",
      "<strong>Add a D-ring</strong>: caught in the side seam, it takes a strap or a carabiner.",
      "<strong>Contrast lining</strong>: a different fabric inside is a small pleasure every time it opens."
    ],
    related: ["cardcase", "wallet", "gamaguchi", "glassescase"]
  },

  glassescase: {
    title: "Glasses case",
    tab: "small",
    toolName: "Glasses case",
    sizeStep: "Enter the finished width, height, flap depth and flap corner radius. Presets cover standard, large and sunglasses.",
    desc: "How to sew a soft glasses case with a flap. Batting inside protects the lenses; one piece folded up and stitched at the sides.",
    keywords: "glasses case,spectacle case,sunglasses case,how to sew,sewing pattern,batting,handmade",
    lead: "A soft case with a flap that folds over and snaps shut. One piece folded up with the sides stitched, so it takes under an hour. A layer of batting or felt inside means your lenses survive a day in a bag with everything else.",
    matNote: "one case",
    materials: [
      "Main fabric (cotton, canvas or linen) — about 30 × 25 cm (12 × 10 in)",
      "Lining fabric (flannel or brushed cotton — something soft) — the same amount",
      "Fusible batting — the same as the main fabric",
      "Snap or magnetic fastener — 1 set"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body including the flap curve, and mark the fold line.",
      "<strong>Cut</strong><br>Cut one main and one lining.",
      "<strong>Fuse the batting</strong><br>Press the batting onto the wrong side of the main fabric. Press straight down rather than gliding the iron, or the batting shifts."
    ],
    sew: [
      { h: "4-1. Sew the layers together", items: [
        "Place main and lining right sides together and sew around, leaving an 8 cm (3 in) gap.",
        "Clip the flap curve every 5 mm and trim the allowance to 5–7 mm — with batting in there it will not turn otherwise."
      ]},
      { h: "4-2. Turn and topstitch", items: [
        "Turn through the gap and press with a cloth and a light hand so the batting is not crushed.",
        "Topstitch 5 mm from the edge all the way around."
      ]},
      { h: "4-3. Fold and stitch the sides", items: [
        "Fold up from the bottom at the marked line, leaving the flap above.",
        "Stitch both sides 3 mm from the edge. Increase the presser foot pressure or turn the handwheel by hand — it is thick.",
        "Backstitch at both ends of each seam."
      ]},
      { h: "4-4. Add the fastening", items: [
        "Put the glasses in, fold the flap over and mark where it lands.",
        "Fit a snap, or a magnetic fastener if you want to open it one-handed."
      ]}
    ],
    sewNote: "Measure your actual glasses. Fold them and measure the thickest point — the hinge — and add that to the width. With batting, add another 5 mm. Cases that are too tight scratch the lenses going in.",
    tips: [
      "<strong>Brushed lining</strong>: the surface the lens touches. A soft napped fabric cleans as well as protects.",
      "<strong>Sunglasses are bigger</strong>: larger lenses and springier arms. Use the sunglasses preset or add a centimeter of width.",
      "<strong>Also a pencil case</strong>: the same construction at a different size."
    ],
    related: ["keycase", "cardcase", "pencase", "pouch"]
  },

  sunhat: {
    title: "Bucket hat",
    tab: "small",
    toolName: "Bucket hat",
    sizeStep: "Enter head circumference, crown depth, brim width and ease. Presets cover child, adult and large.",
    desc: "How to sew a bucket hat. A crown, a side band and a brim — three pieces, all joined in circles.",
    keywords: "bucket hat,sun hat,how to sew,sewing pattern,cotton,linen,handmade",
    lead: "A classic bucket hat in three pieces: the flat crown, the side band and the brim. Everything joins in a circle, which is the only skill involved — and it is the same skill three times over. Cotton or linen, ideally with interfacing in the brim.",
    matNote: "adult size",
    materials: [
      "Main fabric (cotton, linen or canvas) — about 70 × 70 cm (24 × 24 in)",
      "Lining fabric — the same amount",
      "Fusible interfacing — for the brim",
      "Optional: a cord and eyelets for a chin strap"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the crown (a circle), the side band and the brim (a ring).",
      "<strong>Cut</strong><br>Cut each piece in both main and lining fabric. Fuse interfacing to the brim pieces.",
      "<strong>Finish the edges</strong><br>Not needed if you are lining it."
    ],
    sew: [
      { h: "4-1. Make the brim", items: [
        "Sew the two brim rings right sides together along the outer edge.",
        "Clip the curve, turn and press. Topstitch concentric rings across the brim — that is what makes it hold its shape."
      ]},
      { h: "4-2. Make the crown and band", items: [
        "Sew the side band into a loop, then sew the crown circle to its upper edge.",
        "Pin at four points first, then fill in between. Starting at one end guarantees you run short at the other.",
        "Assemble the lining the same way."
      ]},
      { h: "4-3. Assemble", items: [
        "Pin the brim to the lower edge of the outer band, right sides together, and sew.",
        "Slip the lining over it, right sides together, and sew around the same edge, leaving a gap.",
        "Turn through the gap, close it, push the lining inside and topstitch around the base of the crown."
      ]}
    ],
    sewNote: "Every seam here joins two circles. Pin at four points, then halve the gaps, then halve again. Sew from one end and the last few centimeters will never match.",
    tips: [
      "<strong>Interface the brim</strong>: without it the brim flops and the hat looks unfinished.",
      "<strong>Reversible</strong>: use two good fabrics and it works either way out.",
      "<strong>Add a chin cord</strong>: two eyelets and a cord keeps it on in wind, which matters for children."
    ],
    related: ["cap", "beret", "babyhat", "bandana"]
  },

  beret: {
    title: "Beret",
    tab: "small",
    toolName: "Beret",
    sizeStep: "Enter head circumference, puff, facing height and ease. Presets cover child, adult S, adult and large.",
    desc: "How to sew a beret. A large top circle joined to a smaller ring, so the extra fullness makes the dome.",
    keywords: "beret,hat,how to sew,sewing pattern,wool,corduroy,handmade",
    lead: "A soft, round beret. The top circle is larger than the ring it joins to, and that difference is what puffs it up into a dome. Wool or corduroy holds the shape; anything too soft collapses.",
    matNote: "adult size",
    materials: [
      "Main fabric (wool, corduroy or felt) — about 60 × 60 cm (24 × 24 in)",
      "Lining fabric (cupro or light cotton) — the same amount, if lining",
      "Lightweight fusible interfacing — for the facing",
      "Optional: a covered button or short cord for the center top"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the top (a circle), the underside (a ring) and the facing (a band). Weight the pattern down — a shifted circle shows.",
      "<strong>Cut</strong><br>Cut one top, two underside halves and two facings. On wool with a nap, keep every piece facing the same way.",
      "<strong>Finish the edges</strong><br>Zigzag the allowances. Wool frays badly, so do not skip this."
    ],
    sew: [
      { h: "4-1. Join the underside into a ring", items: [
        "Sew the two underside halves together at their short edges to form a ring, and press the seams open."
      ]},
      { h: "4-2. Join the top to the underside", items: [
        "Match the outer edges right sides together. The top is the larger of the two.",
        "Pin at four points, then halve the gaps, then halve again — the aim is to spread the extra fullness evenly all the way round.",
        "Sew with the top on the underside, easing the fullness in with your fingertips as you go. Done evenly it puffs; bunched in one place it makes a lump.",
        "Press the allowance towards the underside."
      ]},
      { h: "4-3. Make and attach the facing", items: [
        "Fuse interfacing to the facings, sew them into a ring and fold in half lengthwise.",
        "Sew the facing to the inner opening of the underside, right sides together.",
        "Fold it to the inside and topstitch 3 mm from the edge."
      ]},
      { h: "4-4. Shape it", items: [
        "Hold a steam iron just above the crown, without touching, and lift the dome.",
        "Stuff it with a rolled towel and let it dry that way to set the shape."
      ]}
    ],
    sewNote: "The whole hat depends on distributing the extra fullness evenly. Pin at 4 points, then 8, then 16. Gather it all in one place and you get a bump instead of a dome.",
    tips: [
      "<strong>Add a lining</strong>: cut the same pattern in lining and baste it in before the facing. It stops static and feels better.",
      "<strong>Adjust the puff</strong>: more puff for a slouchy beret, less for a flat classic one.",
      "<strong>Top detail</strong>: a covered button or short loop of cord at the center is what says beret."
    ],
    related: ["cap", "sunhat", "babyhat", "hairturban"]
  },

  hairturban: {
    title: "Hair turban",
    tab: "small",
    toolName: "Hair turban",
    sizeStep: "Enter head circumference, finished width and the back elastic length. Presets cover child, adult and wide.",
    desc: "How to sew a twisted hair turban. Two bands crossed at the front and joined to elastic at the back.",
    keywords: "hair turban,headband,twisted headband,how to sew,sewing pattern,knit,handmade",
    lead: "A turban with a twist at the front — more of a statement than a plain headband, and just as useful after a shower. Two bands crossed at the center front, with elastic at the back. In stretch knit it slips on and off easily.",
    matNote: "one turban",
    materials: [
      "Main fabric (jersey, interlock or cotton) — about 60 × 30 cm (24 × 12 in)",
      "Flat elastic (2–2.5 cm / 1 in wide) — about 15 cm (6 in)",
      "Bodkin"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the band twice. On stretch fabric, run the direction of most stretch along the length.",
      "<strong>Cut</strong><br>Cut two bands. Two different fabrics make the twist far more interesting.",
      "<strong>Finish the edges</strong><br>Not needed — each band is sewn into a tube and turned."
    ],
    sew: [
      { h: "4-1. Make the tubes", items: [
        "Fold one band right sides together lengthwise and sew the long edge, leaving both ends open.",
        "Turn it right side out with a loop turner, or a safety pin pushed through.",
        "Roll the seam to one edge with your fingers and press. Make the second band the same way."
      ]},
      { h: "4-2. Cross them at the front", items: [
        "Lay the two bands flat and cross them at the center, one passing over the other.",
        "Pin the crossing and try it on to check how the twist sits — this is what gives the turban its shape.",
        "Baste the crossing at both sides to hold it."
      ]},
      { h: "4-3. Attach the elastic", items: [
        "Bring the ends of both bands together and sew across them at one side.",
        "Catch one end of the elastic in that seam, and the other end in the matching seam on the other side.",
        "Wrap the raw seam in a small scrap of fabric (about 3 × 5 cm) so it does not sit against your head."
      ]}
    ],
    sewNote: "You can leave the crossing loose rather than basting it, and the twist will shift as you wear it. Baste it and the shape stays put through washing. Both are valid — decide which you want before you sew.",
    tips: [
      "<strong>Use knit</strong>: non-stretch fabric puts all the strain on the elastic and it goes slack quickly.",
      "<strong>Two fabrics</strong>: a plain and a print makes the crossing read properly.",
      "<strong>Wide for skincare</strong>: a wider band holds a fringe back properly while you wash your face."
    ],
    related: ["headband", "shuushu", "beret", "neckwarmer"]
  },

  bottleholder: {
    title: "Bottle holder",
    tab: "small",
    toolName: "Bottle holder",
    sizeStep: "Enter the bottle diameter and height, the strap length and the strap cut width. Presets cover 500 ml, 350 ml and 1 L.",
    desc: "How to sew a shoulder holder for a drink bottle. A circular base, a body and a strap — insulate it and drinks stay cold.",
    keywords: "bottle holder,water bottle carrier,how to sew,sewing pattern,insulated,handmade",
    lead: "A tube holder for a drink bottle. Line it with insulating fabric and a cold drink stays cold for hours. The round base means it stands up on its own, and the shoulder strap frees your hands. A staple for school bags and summer outings.",
    matNote: "500 ml bottle",
    materials: [
      "Main fabric (oxford, quilted cotton or canvas) — about 50 × 40 cm (20 × 16 in)",
      "Lining fabric (insulating sheet, or lightweight quilted cotton) — the same amount",
      "Webbing or a self-fabric strap — the length you chose",
      "Optional: a swivel hook and slider for adjustment"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the base (a circle), the body (a rectangle) and the strap. Trace the circle accurately — a distorted base will not fit the tube.",
      "<strong>Cut</strong><br>Cut the base and body in both main and lining, and one strap.",
      "<strong>Finish the edges</strong><br>Not needed with a lining. Insulating sheet can be left raw."
    ],
    sew: [
      { h: "4-1. Make the strap", items: [
        "For a self-fabric strap, fold it in quarters lengthwise, press and topstitch both edges.",
        "For webbing, cut to length and seal the ends with a lighter."
      ]},
      { h: "4-2. Sew the body into a tube", items: [
        "Fold the main body right sides together and sew the short edge. Press the seam open.",
        "Do the same with the lining, but leave an 8 cm (3 in) gap in the seam for turning."
      ]},
      { h: "4-3. Attach the base", items: [
        "Pin the base circle to the lower edge of the tube, right sides together. Pin at four points first, then fill in between.",
        "Sew with the circle uppermost, turning the work a little at a time.",
        "Clip the allowance every 5 mm so the base settles into a curve.",
        "Attach the lining base the same way."
      ]},
      { h: "4-4. Join and finish", items: [
        "Turn the main piece right side out and slip it inside the lining, right sides together.",
        "Catch the strap ends at the sides as you sew around the opening. Check the strap is not twisted.",
        "Turn through the gap in the lining, close it, push the lining inside and topstitch around the opening."
      ]}
    ],
    sewNote: "Setting a circle into a tube is the only difficult part. Pin at four points, then halve each gap. If the circle seems slightly too big or too small, do not pull it — add more pins and spread the difference.",
    tips: [
      "<strong>Insulating sheet</strong>: sold in craft shops as thermal or foil-backed sheeting. Using it as the lining makes a striking difference.",
      "<strong>Add a lid</strong>: a self-fabric flap with hook-and-loop improves the insulation further.",
      "<strong>For a flask</strong>: measure your own flask and it becomes a flask cover."
    ],
    related: ["flaskcover", "roundkinchaku", "kincgusset", "lunchbag"]
  },

  cap: {
    title: "Baseball cap",
    tab: "small",
    toolName: "Baseball cap",
    sizeStep: "Enter head circumference, crown depth, brim length and width, and ease. Presets cover child, adult and large.",
    desc: "How to sew a six-panel baseball cap. Six panels form the crown and two pieces make the brim.",
    keywords: "baseball cap,six panel cap,how to sew,sewing pattern,twill,denim,handmade",
    lead: "A classic six-panel cap. The panels are joined in sequence to build the rounded crown, and a stiffened brim is set into the front. There are more seams here than in most accessories, but each one is short and the shape comes out of the sequence rather than out of skill.",
    matNote: "adult size",
    materials: [
      "Main fabric (twill, denim or canvas) — about 60 × 60 cm (24 × 20 in)",
      "Lining fabric — the same amount",
      "Firm fusible interfacing or a brim insert — for the brim",
      "Optional: an adjuster strap or elastic for the back"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the crown panel and the brim.",
      "<strong>Cut</strong><br>Cut six panels and two brim pieces, plus lining. Fuse interfacing to the brim.",
      "<strong>Finish the edges</strong><br>Zigzag or serge the panel seam allowances — there are a lot of them."
    ],
    sew: [
      { h: "4-1. Join the panels", items: [
        "Sew the panels together in pairs, then join the pairs into two sets of three, then join those two halves.",
        "Working 2 → 3 sets → whole keeps the seams meeting neatly at the top. Sewing them one after another leaves a gap at the crown.",
        "Press each seam open, or to one side and topstitch, as you go."
      ]},
      { h: "4-2. Make the brim", items: [
        "Sew the two brim pieces right sides together along the outer curve.",
        "Clip the curve, turn and press, then topstitch several concentric lines across the brim to stiffen it."
      ]},
      { h: "4-3. Attach the brim", items: [
        "Pin the brim to the front of the crown opening, right sides together, matching the centers, and sew.",
        "Baste it first and try the cap on — brim position is the difference between a cap that looks right and one that does not."
      ]},
      { h: "4-4. Finish the opening", items: [
        "Sew the lining crown the same way and set it inside.",
        "Bind or turn the lower edge, catching the brim, and topstitch all the way around.",
        "Add an adjuster or elastic at the back if you want it to fit more than one head."
      ]}
    ],
    sewNote: "Join the panels in pairs, then in threes, then join the halves. Sewn one after another around the circle, the last seam never closes cleanly and the crown pulls to one side.",
    tips: [
      "<strong>Stiffen the brim properly</strong>: a floppy brim is the one thing that makes a home-made cap look home-made. Use a proper brim insert if you can find one.",
      "<strong>Topstitch the panels</strong>: pressing the seams to one side and topstitching gives the ridged look of a bought cap.",
      "<strong>Adjuster at the back</strong>: it makes the cap fit anyone, and it is five minutes' work."
    ],
    related: ["sunhat", "beret", "bousaizukin", "babyhat"]
  },

  boshitecho: {
    title: "Health-record book case",
    tab: "small",
    toolName: "Health-record book case",
    sizeStep: "Enter the book width, height, thickness and the inner pocket height. Presets cover A6, B6 and A5.",
    desc: "How to sew a bi-fold case for a health record book, appointment cards and insurance cards. Body plus inner pockets.",
    keywords: "record book case,document case,passbook case,how to sew,sewing pattern,handmade",
    lead: "A bi-fold case that keeps a child health record, appointment cards, an insurance card and scan photos in one place. Body and inner pockets is the whole construction, and stitching the pocket vertically turns it into card slots. It works just as well as a passbook or medicine-record case.",
    matNote: "A6 size",
    materials: [
      "Main fabric (oxford, linen or canvas) — about 60 × 40 cm (24 × 16 in)",
      "Lining fabric (light cotton) — the same amount",
      "Pocket fabric — about 40 × 25 cm (16 × 10 in)",
      "Firm fusible interfacing — for the main fabric",
      "Snap fastener or elastic — 1"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body and the inner pockets, and mark the center fold on the body.",
      "<strong>Cut</strong><br>Cut the body in main and lining, and one or two pocket pieces.",
      "<strong>Apply interfacing</strong><br>Fuse firm interfacing to the main fabric. Loaded up, this case is heavy, and without interfacing it collapses."
    ],
    sew: [
      { h: "4-1. Make the pockets", items: [
        "Turn the top edge of each pocket under twice and stitch. Always do this first — it cannot be done once the pocket is attached.",
        "If you are using two, make them different heights so the contents are easy to tell apart."
      ]},
      { h: "4-2. Attach the pockets", items: [
        "Lay the pockets on the right side of the lining, aligning the lower and side edges.",
        "For card slots, stitch vertically now. About 6 cm (2⅜ in) per card is right. Backstitch at the top of each line — that is where the pocket tears.",
        "Baste the lower and side edges within the seam allowance."
      ]},
      { h: "4-3. Sew the layers together", items: [
        "Place main and lining right sides together and sew around, leaving a 10 cm (4 in) gap.",
        "Trim the corners, turn through the gap and press.",
        "Topstitch 5 mm from the edge all the way around."
      ]},
      { h: "4-4. Fold and add the closure", items: [
        "Fold at the center line and press.",
        "Put the actual contents in and check how it closes before fitting a snap, or run an elastic band around the spine."
      ]}
    ],
    sewNote: "The thickness setting matters more than it looks. A record book, appointment cards and an insurance card together come to nearly 1.5 cm. Leave that out and the case is pulled open by its own contents.",
    tips: [
      "<strong>Stagger the pockets</strong>: card slots at different heights let you see at a glance what is where.",
      "<strong>Add a pen loop</strong>: caught in the side seam, so there is always a pen at appointments.",
      "<strong>Also a passbook case</strong>: same size, different pocket divisions."
    ],
    related: ["bankbook", "cardcase", "passportcase", "bookcover"]
  },

  cardcase: {
    title: "Card case",
    tab: "small",
    toolName: "Card case",
    sizeStep: "Enter the card width, height and ease. Presets cover business card, credit card and a larger size.",
    desc: "How to sew a small bi-fold card case. Body plus an inner pocket, sewn right sides together and folded at the center.",
    keywords: "card case,business card holder,how to sew,sewing pattern,scraps,interfacing,handmade",
    lead: "A small bi-fold case for business cards or loyalty cards. Twenty-five centimeters of fabric is enough, so this is where a good scrap goes. Firm interfacing is what turns it from homemade-looking into something you would hand to a client.",
    matNote: "one case",
    materials: [
      "Main fabric (faux leather, canvas or heavy cotton) — about 25 × 20 cm (10 × 8 in)",
      "Lining fabric — the same amount",
      "Pocket fabric — about 15 × 15 cm (6 × 6 in)",
      "Firm fusible interfacing — for the main fabric",
      "Optional: a snap fastener"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body and the pocket, and mark the center fold.",
      "<strong>Cut</strong><br>Cut the body in main and lining, plus one pocket.",
      "<strong>Apply interfacing</strong><br>Fuse interfacing to the main fabric. On something this small the difference is dramatic."
    ],
    sew: [
      { h: "4-1. Make the pocket", items: [
        "Turn the top edge of the pocket under twice — 5 mm and 5 mm — and stitch. Press the folds hard first; at this size a wobble shows."
      ]},
      { h: "4-2. Attach the pocket", items: [
        "Lay it on the right side of the lining, to one side of the center fold, and baste the lower and side edges within the seam allowance."
      ]},
      { h: "4-3. Sew the layers together", items: [
        "Place main and lining right sides together and sew around, leaving a 6 cm (2½ in) gap.",
        "Trim the corners well — on a small piece, bulk at the corners is obvious.",
        "Turn, press and topstitch 3 mm from the edge all the way around."
      ]},
      { h: "4-4. Fold", items: [
        "Fold firmly at the center and press.",
        "Stitching the sides together for a couple of centimeters stops cards sliding out sideways.",
        "Fit a snap with the cards in place if you want it to close."
      ]}
    ],
    sewNote: "The ease setting is what makes this work. Cut to the exact card size and the interfacing plus seam allowances leave no room for a card at all. The preset ease already accounts for that — do not reduce it.",
    tips: [
      "<strong>Do not over-interface</strong>: too stiff and the case springs open instead of folding. Medium weight is right.",
      "<strong>Faux leather</strong>: has body without interfacing, but every needle hole is permanent.",
      "<strong>As a gift</strong>: small, cheap and genuinely used. One of the best things here to give away."
    ],
    related: ["keycase", "wallet", "boshitecho", "gamaguchi"]
  },

  bousaizukin: {
    title: "Disaster hood cover",
    tab: "small",
    toolName: "Disaster hood cover",
    sizeStep: "Enter the hood width, height and thickness, and the chair band length. Presets cover standard and large.",
    desc: "How to sew a cover for a Japanese school disaster hood. It holds the hood and doubles as a chair-back cushion.",
    keywords: "disaster hood cover,school,japan,how to sew,sewing pattern,quilted,handmade",
    lead: "Japanese schools issue a padded hood for earthquake drills, and it lives on the back of the chair inside a cover like this one. The cover holds the hood and works as a back cushion at the same time. Schools usually specify the size, so enter what they ask for. Quilted fabric is the standard choice.",
    matNote: "standard size",
    materials: [
      "Main fabric (quilted cotton or canvas) — about 110 cm wide × 90 cm (43 × 35 in)",
      "Flat elastic (2.5 cm / 1 in wide) — about 70 cm (28 in)",
      "Optional: hook-and-loop for the opening"
    ],
    cut: [
      "<strong>Check the school's specification</strong><br>Most schools give exact dimensions. Enter those rather than measuring the hood.",
      "<strong>Trace the pattern</strong><br>Trace the body and the chair bands.",
      "<strong>Cut</strong><br>Cut one body and two bands.",
      "<strong>Finish the edges</strong><br>Serge or zigzag the side allowances — quilted fabric frays quickly."
    ],
    sew: [
      { h: "4-1. Make the bands", items: [
        "Fold each band in quarters lengthwise and topstitch both long edges. Make two."
      ]},
      { h: "4-2. Finish the opening", items: [
        "Turn the opening edge under twice and stitch.",
        "Add hook-and-loop here if you want it to close."
      ]},
      { h: "4-3. Sew the body", items: [
        "Fold the body right sides together and sew both sides.",
        "Pinch the base corners into triangles and sew across to give the depth for the hood."
      ]},
      { h: "4-4. Attach the bands", items: [
        "Stitch a band to each side of the back, positioned to go around the chair back.",
        "Sew them with a stitched rectangle and a cross — these take the weight of the whole thing every day."
      ]}
    ],
    sewNote: "Follow the school's dimensions exactly rather than measuring the hood. Schools specify a size so the covers all fit the chairs, and a cover that is a centimeter out will be sent home.",
    tips: [
      "<strong>Quilted fabric</strong>: it is the standard for a reason — it holds its shape and survives daily handling.",
      "<strong>Name it clearly</strong>: every child in the class has one, and they all look similar.",
      "<strong>Elastic instead of ties</strong>: elastic bands go over the chair back faster than ties, which matters to a six-year-old."
    ],
    related: ["gymbag", "ehonbag", "shoesbag", "randocover"]
  },

  dollclothes: {
    title: "Doll dress",
    tab: "small",
    toolName: "Doll dress",
    sizeStep: "Enter the doll's chest, length, shoulder width, hem flare and ease. Presets cover 20 cm, 27 cm and 40 cm dolls.",
    desc: "How to sew an A-line dress for a doll. One front and two backs, fastened with snaps — and 5 mm seam allowances throughout.",
    keywords: "doll clothes,doll dress,how to sew,sewing pattern,scraps,miniature,handmade",
    lead: "An A-line dress for a doll. One front, two backs, snaps down the spine. Measure your own doll's chest and length and it will fit whatever you have. The pieces are tiny, which also makes it a low-stakes way to practice techniques you would not risk on a full-size garment.",
    matNote: "27 cm doll",
    materials: [
      "Main fabric (lawn, broadcloth or double gauze — something thin) — about 40 × 30 cm (16 × 12 in)",
      "Tiny snap fasteners or narrow hook-and-loop — 2–3 sets",
      "Narrow bias tape (about 6 mm / ¼ in finished) — about 60 cm (24 in)",
      "Optional: narrow lace or ribbon"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Use a mechanical pencil rather than chalk — a thick chalk line is a 1–2 mm error at this scale.",
      "<strong>Cut</strong><br>Cut one front on the fold and two backs.",
      "<strong>Finish the edges</strong><br>Seam allowances are 5 mm, so pinking shears are more manageable than a zigzag."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Place front and backs right sides together and sew both shoulder seams with a 5 mm allowance.",
        "Press the allowances to one side rather than open — at this scale, pressing open adds visible bulk."
      ]},
      { h: "4-2. Bind the neckline and armholes", items: [
        "Sew narrow bias tape around the neckline, turn it to the inside and topstitch.",
        "Bind the armholes the same way.",
        "Wide tape will not follow a doll-sized neckline. Use narrow tape, or cut your own bias strips from the main fabric."
      ]},
      { h: "4-3. Sew the sides", items: [
        "Sew both side seams from the underarm to the hem, backstitching at the underarm."
      ]},
      { h: "4-4. Finish the back and hem", items: [
        "Turn each back opening edge under twice — 5 mm and 5 mm — and stitch.",
        "Hem the lower edge the same way, easing the flare in as you fold.",
        "Fit two or three snaps, or narrow hook-and-loop, down the back."
      ]}
    ],
    sewNote: "Two things decide whether doll clothes look right: a 5 mm seam allowance and thin fabric. A standard 1 cm allowance makes the side seams so bulky the dress will not go on.",
    tips: [
      "<strong>Hook-and-loop is easier</strong>: much simpler for a child to manage than tiny snaps.",
      "<strong>Small prints only</strong>: a large print puts no complete motif on a garment this size.",
      "<strong>Practice piece</strong>: bias-bound necklines and flared hems, in miniature and using almost no fabric."
    ],
    related: ["nuiclothes", "teddy", "kidsdress", "babytoy"]
  },

  teddy: {
    title: "Teddy bear",
    tab: "small",
    toolName: "Teddy bear",
    sizeStep: "Enter the overall height, head size and ear size. Presets cover small, standard and large.",
    desc: "How to sew a flat teddy bear. Two body pieces and four ear pieces, turned and stuffed.",
    keywords: "teddy bear,soft toy,plush,how to sew,sewing pattern,stuffing,handmade",
    lead: "A simple flat-construction teddy. Two body pieces and four ear pieces — far less work than a jointed bear, and it still comes out unmistakably a bear. Fleece, felt or corduroy gives it character. Embroider the face rather than using button eyes.",
    matNote: "standard size",
    materials: [
      "Main fabric (fleece, felt or corduroy) — about 60 × 50 cm (24 × 20 in)",
      "Toy stuffing — about 200 g (7 oz)",
      "Embroidery floss (black or brown) — for the eyes and nose",
      "Optional: ribbon for the neck"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body (on the fold) and the ears. On napped fabric, trace from the wrong side and keep the pile running the same way on every piece.",
      "<strong>Cut</strong><br>Cut two bodies and four ears.",
      "<strong>Cutting fleece</strong><br>Lift the upper layer slightly and cut the backing rather than the pile — far less mess."
    ],
    sew: [
      { h: "4-1. Make the ears", items: [
        "Sew two ear pieces right sides together, leaving the base open. Make two.",
        "Clip the curve and turn.",
        "Leave them unstuffed — flat ears look more like a bear than stuffed ones."
      ]},
      { h: "4-2. Sew the body with the ears caught in", items: [
        "Lay the ears on the right side of one body piece at the head, loops pointing inward, and baste them in the seam allowance.",
        "Lay the second body on top, right sides together, and sew around leaving a 10 cm (4 in) gap — the side under the arm turns most easily.",
        "Clip into every inward curve: the neck, the underarms and between the legs. Skip these and the shape never appears."
      ]},
      { h: "4-3. Turn and stuff", items: [
        "Turn through the gap, easing the paws out with a chopstick or the handle of a point turner.",
        "Stuff in small pieces, working paws first, then head, then body. You cannot reach the paws once the body is full.",
        "Stuff the head firmly and the body more softly — it sits better that way."
      ]},
      { h: "4-4. Close and embroider the face", items: [
        "Close the gap with ladder stitch.",
        "Embroider the eyes and nose. Set the eyes lower and closer together than instinct suggests — that is what makes a face look sweet rather than staring.",
        "Pin markers in first and look from a distance before committing."
      ]}
    ],
    sewNote: "If this is for a small child, embroider the eyes and nose. Plastic safety eyes and buttons come off eventually, and anything that comes off can be swallowed. Embroidery cannot, and it washes.",
    tips: [
      "<strong>Stuffing changes everything</strong>: packed hard it becomes a firm character; loosely filled it becomes something to cuddle.",
      "<strong>Make it washable</strong>: washable fabric and stuffing. The more loved it is, the more this matters.",
      "<strong>A ribbon at the neck</strong>: ten seconds, and it turns it into a present."
    ],
    related: ["babytoy", "pettoy", "nuiclothes", "dollclothes"]
  },

  scarf: {
    title: "Scarf",
    tab: "small",
    toolName: "Scarf",
    sizeStep: "Enter the total length and finished width. Presets cover child, standard and wide.",
    desc: "How to sew a fabric scarf. Fold a rectangle lengthwise and sew — or cut fleece and fringe the ends.",
    keywords: "scarf,winter scarf,how to sew,sewing pattern,fleece,fringe,handmade",
    lead: "You do not need to knit to make a scarf. Fold a rectangle lengthwise, sew, turn. Fleece or wool for winter, double gauze for spring. Far faster than knitting — which is exactly what you want when a gift deadline is closing in.",
    matNote: "standard size",
    materials: [
      "Main fabric (fleece, wool or double gauze) — about 110 cm wide × 160 cm (43 × 63 in)",
      "Optional: a second fabric for a double-sided scarf"
    ],
    cut: [
      "<strong>Mark the measurements</strong><br>It is a rectangle, so mark it straight onto the fabric.",
      "<strong>Straighten the grain</strong><br>On something this long, a skewed grain shows. Pull a single thread and cut along the line it leaves.",
      "<strong>Cut</strong><br>Cut one piece for a folded scarf, or one of each fabric for a double-sided one."
    ],
    sew: [
      { h: "4-1. Sew the long edge", items: [
        "Fold the piece lengthwise, right sides together, and sew the long edge with a 1 cm (⅜ in) allowance.",
        "For a double-sided version, place the two fabrics right sides together and sew both long edges.",
        "It is a long seam — support the fabric with your left hand so its weight does not drag it off line."
      ]},
      { h: "4-2. Sew one end and turn", items: [
        "Sew one short end closed and leave the other open.",
        "Turn through the open end. A chopstick pushed inside speeds this up considerably.",
        "Roll the seam to the edge with your fingers and press."
      ]},
      { h: "4-3. Close the open end", items: [
        "Fold the remaining raw edges inward and close with ladder stitch, or topstitch 3 mm from the edge.",
        "If you topstitch, do the other end to match."
      ]},
      { h: "4-4. Fringe (optional)", items: [
        "Instead of closing the ends, pull the crosswise threads out one at a time to make a fringe.",
        "Stitch a line across at the depth you want first — 5–8 cm (2–3 in) — or the fringe keeps unravelling."
      ]}
    ],
    sewNote: "With fleece, most of this is unnecessary. Fleece does not fray, so cut a rectangle, snip the ends into a fringe, and you are done in fifteen minutes. That is the fastest gift on this site.",
    tips: [
      "<strong>Length</strong>: roughly your own height gives you options for how to wrap it. About 120 cm (47 in) suits a child.",
      "<strong>Two-sided</strong>: different fabrics front and back show a glimpse of contrast as it falls.",
      "<strong>For small children</strong>: a neck warmer is safer than a long scarf around playground equipment."
    ],
    related: ["neckwarmer", "legwarmer", "bandana", "headband"]
  },

  nametag: {
    title: "Name tag holder",
    tab: "small",
    toolName: "Name tag holder",
    sizeStep: "Enter the badge width, height, ease and clip strip length. Presets cover standard and large.",
    desc: "How to sew a name tag holder that clips on instead of pinning. A vinyl window keeps the badge visible.",
    keywords: "name tag holder,name badge cover,school,how to sew,sewing pattern,vinyl,handmade",
    lead: "School name badges are pinned on, and the pin makes a hole in the clothes. This holder clips instead. Add a clear vinyl window and the name still shows while the badge slides in and out. A standard part of the Japanese back-to-school list.",
    matNote: "one holder",
    materials: [
      "Main fabric (oxford or printed cotton) — about 25 × 20 cm (10 × 8 in)",
      "Clear vinyl (about 0.3 mm) — about 12 × 10 cm (5 × 4 in)",
      "Fabric for the clip strip — about 15 × 8 cm (6 × 3 in)",
      "A clip (badge clips are sold for exactly this) — 1"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body and the clip strip, and mark the window opening.",
      "<strong>Cut</strong><br>Cut two body pieces and one clip strip. Cut the vinyl slightly larger than the window.",
      "<strong>Handling vinyl</strong><br>Pins leave permanent holes. Use clips or a strip of tape."
    ],
    sew: [
      { h: "4-1. Make the window", items: [
        "Cut the marked opening out of the piece that will be the front.",
        "Lay the vinyl behind it and stitch 3 mm outside the opening edge all the way around.",
        "Vinyl sticks to the presser foot. Lay tissue paper on top and tear it away afterwards."
      ]},
      { h: "4-2. Make the clip strip", items: [
        "Fold it in quarters lengthwise, press and topstitch both edges.",
        "Fold it into a loop and check the clip passes through."
      ]},
      { h: "4-3. Sew the body", items: [
        "Place the two body pieces right sides together, catching the clip loop at the top edge with the loop pointing inward.",
        "Sew around, leaving 8 cm (3 in) open at the bottom for the badge.",
        "Trim the corners diagonally."
      ]},
      { h: "4-4. Turn and finish", items: [
        "Turn through the opening and shape the corners. Press with a cloth on a low setting and keep the iron away from the vinyl.",
        "Fold the opening edges in and topstitch 3 mm from the edge.",
        "Thread the clip through the loop and check the badge slides in easily."
      ]}
    ],
    sewNote: "An iron will melt vinyl. Use a pressing cloth, a low setting, and keep away from the vinyl entirely. If that worries you, crease the folds with a ruler instead of pressing them.",
    tips: [
      "<strong>Skip the vinyl</strong>: a plain pocket that the badge slides into avoids handling vinyl altogether — and is easier to make.",
      "<strong>Buy the clip</strong>: badge clips are sold in craft and hundred-yen shops and are designed not to mark clothes.",
      "<strong>Make one per child</strong>: different fabrics stop them getting mixed up."
    ],
    related: ["movepocket", "cardcase", "randocover", "maskcase"]
  },

  pencase: {
    title: "Pencil case",
    tab: "small",
    toolName: "Pencil case",
    sizeStep: "Enter the finished width, height and gusset depth. Presets cover slim, standard and large.",
    desc: "How to sew a boxy zip pencil case. One piece folded at the base, sewn into a tube with boxed corners.",
    keywords: "pencil case,pen case,how to sew,sewing pattern,zip,canvas,handmade",
    lead: "A boxy pencil case with a zip. One piece, folded at the base, sewn into a tube with the base corners boxed. Interfaced, it stands up on its own, so tipped on its end it becomes a pen pot on the desk. Canvas or corduroy.",
    matNote: "one case",
    materials: [
      "Main fabric (canvas, corduroy or heavy cotton) — about 40 × 30 cm (16 × 12 in)",
      "Lining fabric (light cotton) — the same amount",
      "Firm fusible interfacing — for the main fabric",
      "Zip — about 2 cm (¾ in) longer than the finished width",
      "Optional: fabric for zip end tabs"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body (base on the fold) and the zip end tabs.",
      "<strong>Cut</strong><br>Cut the body in main and lining, plus two tabs.",
      "<strong>Apply interfacing</strong><br>Fuse firm interfacing to the main fabric. This is what makes it stand up, so do not skip it."
    ],
    sew: [
      { h: "4-1. Add the zip tabs", items: [
        "Fold each tab in quarters and press.",
        "Fold a tab over each end of the zip and topstitch. This hides the metal stops and lets you fine-tune the length."
      ]},
      { h: "4-2. Insert the zip", items: [
        "Lay the zip right sides together on one top edge of the main fabric, then lay the lining on top and sew all three layers.",
        "Open the two fabrics away from the zip and topstitch close to the zip teeth.",
        "Repeat on the other top edge with the other side of the zip.",
        "That main–zip–lining sandwich is what keeps all the raw edges enclosed."
      ]},
      { h: "4-3. Sew the sides", items: [
        "Open the zip halfway — you will need it open to turn the case through.",
        "Arrange main against main and lining against lining, right sides together, and sew both side seams. Leave an 8 cm (3 in) gap in one lining seam.",
        "Turn the handwheel by hand over the zip teeth."
      ]},
      { h: "4-4. Box the corners and turn", items: [
        "Pinch each base corner into a triangle, matching the side seam to the base fold, and sew across at the gusset depth. Trim to 1 cm.",
        "Do the same on the lining.",
        "Turn everything through the gap, close it, push the lining in and shape the case."
      ]}
    ],
    sewNote: "Buy the zip 2 cm longer than the finished width. Cut exactly to size, the metal stops end up inside the side seam allowance and you cannot sew past them. Too long is easy to hide with tabs; too short cannot be fixed.",
    tips: [
      "<strong>Firm interfacing</strong>: soft interfacing makes it slump, which defeats the boxy shape.",
      "<strong>Stand it up</strong>: on its end with the zip open, it is a pen pot. That is the reason for the boxy shape.",
      "<strong>Other sizes</strong>: the same construction makes a glasses case or a tool roll."
    ],
    related: ["pouchgusset", "glassescase", "gadgetpouch", "cosmepouch"]
  },

  bankbook: {
    title: "Passbook case",
    tab: "small",
    toolName: "Passbook case",
    sizeStep: "Enter the passbook width, height, how many you carry and the inner pocket height. Presets cover 1–2 books, 3 books and a medicine record book.",
    desc: "How to sew a bi-fold case for bank passbooks, cards and a seal. Stitch the pocket vertically for card slots.",
    keywords: "passbook case,bankbook cover,document case,how to sew,sewing pattern,handmade",
    lead: "A bi-fold case that keeps passbooks, cards and a seal together instead of scattered through a drawer. Stitch the inner pocket vertically and it becomes card slots; add an elastic band and nothing falls out. Another good use for a nice scrap.",
    matNote: "3 passbooks",
    materials: [
      "Main fabric (linen, oxford or canvas) — about 50 × 30 cm (20 × 12 in)",
      "Lining fabric (light cotton) — the same amount",
      "Pocket fabric — about 40 × 15 cm (16 × 6 in)",
      "Firm fusible interfacing — for the main fabric",
      "Narrow elastic (0.6 cm / ¼ in) — about 30 cm (12 in), or a snap"
    ],
    cut: [
      "<strong>Measure what goes in</strong><br>Measure a passbook and count how many you carry — the thickness is calculated from that.",
      "<strong>Trace the pattern</strong><br>Trace the body and the pocket, and mark the center fold.",
      "<strong>Cut</strong><br>Cut the body in main and lining, plus one or two pockets, and fuse interfacing to the main fabric."
    ],
    sew: [
      { h: "4-1. Make the pocket", items: [
        "Turn the top edge under twice and stitch. Do this before it goes anywhere near the case.",
        "With two pockets, make them different heights so the contents are easy to identify."
      ]},
      { h: "4-2. Attach the pocket", items: [
        "Lay it on the right side of the lining, aligning the lower and side edges.",
        "For card slots, stitch vertically now — about 6 cm (2⅜ in) per card. Backstitch at the top of each line.",
        "Baste the lower and side edges within the seam allowance."
      ]},
      { h: "4-3. Sew the layers together", items: [
        "Place main and lining right sides together and sew around, leaving a 10 cm (4 in) gap.",
        "Trim the corners, turn, press and topstitch 5 mm from the edge."
      ]},
      { h: "4-4. Fold and close", items: [
        "Fold at the center and press.",
        "For an elastic closure, sew a small loop of self-fabric at the spine and run the elastic around the case.",
        "For a snap, load the case first and mark the position with everything inside."
      ]}
    ],
    sewNote: "Be honest about how many passbooks you carry. Each one is about 3.5 mm, so three come to over a centimeter. Leave that thickness out and the case will not stay shut.",
    tips: [
      "<strong>Stagger the slots</strong>: card pockets at different heights make everything visible at a glance.",
      "<strong>A pocket for the seal</strong>: one small extra pocket stops it rolling around loose.",
      "<strong>Elastic beats a snap</strong>: it copes with a varying thickness, which a snap does not."
    ],
    related: ["boshitecho", "cardcase", "passportcase", "bookcover"]
  },

  flaskcover: {
    title: "Water bottle cover",
    tab: "small",
    toolName: "Water bottle cover",
    sizeStep: "Enter the flask diameter and height, the strap length and cut width. Presets cover a 480 ml child flask, 600 ml standard and 1 L.",
    desc: "How to sew an insulated shoulder cover for a flask, with a lid. A circular base, a body, a lid and a strap.",
    keywords: "flask cover,bottle cover,insulated,school,how to sew,sewing pattern,handmade",
    lead: "A shoulder cover with a lid for a flask. Covers wear out long before flasks do, and making a new one is far cheaper than replacing the flask. Line it with insulating fabric and it also stops the flask getting dented in a school bag.",
    matNote: "600 ml standard",
    materials: [
      "Main fabric (oxford, quilted cotton or canvas) — about 60 × 50 cm (24 × 20 in)",
      "Lining fabric (insulating sheet, or lightweight quilted cotton) — the same amount",
      "Webbing or a self-fabric strap — the length you chose",
      "A slider and swivel hook for adjustment — 1 each",
      "Snap fastener for the lid — 1 set"
    ],
    cut: [
      "<strong>Measure the flask</strong><br>Measure the widest diameter and the height including the cap and handle. Measuring the body only gives a cover the flask will not fit into.",
      "<strong>Trace the pattern</strong><br>Trace the base (circle), the body, the lid (circle) and the strap. Trace the circles accurately.",
      "<strong>Cut</strong><br>Cut the base, body and lid in both main and lining, and one strap."
    ],
    sew: [
      { h: "4-1. Make the strap and lid", items: [
        "For a self-fabric strap, fold in quarters, press and topstitch. For webbing, cut to length and seal the ends.",
        "Sew the lid main and lining right sides together, leaving the straight attachment edge open.",
        "Clip the curve, turn, press and topstitch around."
      ]},
      { h: "4-2. Sew the body into a tube", items: [
        "Fold the main body right sides together and sew the short edge. Press the seam open.",
        "Do the same with the lining, leaving an 8 cm (3 in) gap for turning."
      ]},
      { h: "4-3. Attach the base", items: [
        "Pin the base circle to the lower edge of the tube, right sides together, pinning at four points first.",
        "Sew with the circle uppermost, turning the work gradually and clipping the allowance every 5 mm.",
        "Attach the lining base the same way."
      ]},
      { h: "4-4. Join and add the snap", items: [
        "Turn the main piece out and slip it inside the lining, right sides together.",
        "Catch the lid at the back edge and the strap ends at the sides, then sew around the opening.",
        "Turn through the gap, close it, push the lining in and topstitch around the opening.",
        "Put the flask in, close the lid and fit the snap 2–3 mm outside where it lands, to allow for the thickness."
      ]}
    ],
    sewNote: "Setting the circular base into the tube is the only awkward part. Pin at four points and halve the gaps from there. If the circle seems slightly off, add pins rather than pulling — pulling distorts the base and the flask goes in crooked.",
    tips: [
      "<strong>Insulating sheet</strong>: sold as thermal or foil-backed sheeting in craft shops. The difference is genuinely noticeable.",
      "<strong>Measure with the cap on</strong>: flask height means the whole thing, lid and handle included.",
      "<strong>Adjustable strap</strong>: children grow. A slider makes the cover last several years."
    ],
    related: ["bottleholder", "roundkinchaku", "kincgusset", "lunchbag"]
  },

  randocover: {
    title: "School satchel cover",
    tab: "small",
    toolName: "School satchel cover",
    sizeStep: "Enter the flap width, length, lower corner radius and ease. Presets cover standard, large and a version for a clear cover.",
    desc: "How to sew a cover for the flap of a Japanese school satchel. Water-repellent fabric plus reflective tape.",
    keywords: "school satchel cover,randoseru cover,school bag,how to sew,sewing pattern,reflective,handmade",
    lead: "A cover for the flap of a randoseru, the Japanese school satchel. It keeps the leather dry and unscratched, and a strip of reflective tape makes a child far more visible on a dark walk home. Water-repellent or laminated fabric is the point of it.",
    matNote: "standard size",
    materials: [
      "Main fabric (water-repellent fabric, laminate or nylon) — about 40 × 45 cm (16 × 18 in)",
      "Wide bias tape — about 120 cm (47 in)",
      "Reflective tape — about 25 cm (10 in)",
      "Narrow flat elastic (0.6 cm / ¼ in) — about 40 cm (16 in)",
      "Optional: clear vinyl (about 0.3 mm)"
    ],
    cut: [
      "<strong>Measure the satchel</strong><br>Measure the flap width and its length from the hinge to the tip, and note the radius of the rounded end.",
      "<strong>Trace the pattern</strong><br>Trace the body. The marks show suggested elastic positions.",
      "<strong>Cut</strong><br>Cut one body. Use clips rather than pins — laminate keeps every hole.",
      "<strong>Finish the edges</strong><br>Not needed; the edges are bound."
    ],
    sew: [
      { h: "4-1. Attach the reflective tape", items: [
        "Lay the tape along the curve at the lower end, on the right side, and stitch both long edges.",
        "Change direction gradually to follow the curve.",
        "Do this first — once the edge is bound, the tape ends have nowhere to hide."
      ]},
      { h: "4-2. Bind the edges", items: [
        "Bind all the way around with wide bias tape, which follows the curve naturally.",
        "If you double-fold instead, ease the outer edge in around the curve.",
        "Laminate sticks to the presser foot: use a Teflon foot, or lay tissue paper on top and tear it away."
      ]},
      { h: "4-3. Attach the elastic", items: [
        "Sew elastic loops at the center of the lower edge and at the marked points on each side.",
        "The lower loop hooks over the satchel's clasp; the side loops go over the strap fittings.",
        "Fit the cover to the satchel and check the positions before sewing them permanently. Too loose and it falls off; too tight and the flap will not close."
      ]},
      { h: "4-4. Finish the top edge", items: [
        "Either add two self-fabric loops that hook over the satchel hardware, or leave the top edge to tuck under the fitting.",
        "For a version that holds a road-safety card, make the top edge into a pocket the card slides into."
      ]}
    ],
    sewNote: "Laminate and coated fabric keep every needle hole. You cannot unpick and try again, so fit the cover to the actual satchel and mark the elastic positions before you sew anything down. Clips, not pins.",
    tips: [
      "<strong>Reflective tape earns its place</strong>: it costs very little and transforms visibility on a dark walk. Do not leave it off.",
      "<strong>Water-repellent fabric only</strong>: the whole purpose is rain, and ordinary cotton simply soaks through.",
      "<strong>Make two</strong>: it gets splashed with mud constantly."
    ],
    related: ["bousaizukin", "movepocket", "nametag", "ehonbag"]
  },

  recordercase: {
    title: "Recorder case",
    tab: "small",
    toolName: "Recorder case",
    sizeStep: "Enter the recorder length, bag width and the drawstring casing drop. Presets cover a soprano recorder, an alto recorder and a melodica hose.",
    desc: "How to sew a drawstring bag for a school recorder. Fold one piece, sew the sides, add a drawstring at the top.",
    keywords: "recorder case,recorder bag,school,how to sew,sewing pattern,drawstring,handmade",
    lead: "A slim drawstring bag for a school recorder. Fold one piece at the base, sew the sides, make a casing. Shop-bought ones come in whatever print the shop had; this way the child picks the fabric. The same construction takes a melodica hose.",
    matNote: "soprano recorder",
    materials: [
      "Main fabric (oxford, sheeting or printed cotton) — about 25 × 80 cm (10 × 31 in)",
      "Cord (4–5 mm / ³⁄₁₆ in) — about 70 cm (28 in)",
      "Bodkin",
      "Optional: a fabric label for the name"
    ],
    cut: [
      "<strong>Measure the recorder</strong><br>Measure it assembled — that is how a child will put it away.",
      "<strong>Trace the pattern</strong><br>It is a rectangle folded at the base, so mark it straight onto the fabric.",
      "<strong>Cut</strong><br>Cut one piece.",
      "<strong>Finish the edges</strong><br>Zigzag the side allowances — they get plenty of wear."
    ],
    sew: [
      { h: "4-1. Sew the sides, leaving the casing openings", items: [
        "Fold at the base, right sides together.",
        "Sew each side, but stop at the casing drop measured down from the top. Those unsewn sections are where the cord comes out.",
        "It is a narrow bag, so a wandering seam shows. Rule a line and follow it."
      ]},
      { h: "4-2. Finish the casing openings", items: [
        "Press the allowances open at the unsewn sections and topstitch them down in a narrow rectangle.",
        "Backstitch at the point where the seam stops — that is where a bag tears."
      ]},
      { h: "4-3. Make the casing", items: [
        "Fold the top edge under twice, to the casing depth, and stitch all the way around.",
        "Check the channel connects to the side openings you left."
      ]},
      { h: "4-4. Thread the cord", items: [
        "Turn right side out, thread the cord in one opening, around, and back out the same one. Knot the ends.",
        "For a two-cord version, thread a second cord from the other side so it pulls evenly.",
        "Add a name label and check the recorder goes in easily."
      ]}
    ],
    sewNote: "Measure the recorder assembled, not in pieces. Children put it away in one piece. If the cleaning rod goes in too, add a centimeter to the width or the bag will always be a struggle.",
    tips: [
      "<strong>Name it prominently</strong>: every child in the class has the same recorder.",
      "<strong>Melodica hose</strong>: the hose preset is sized for the tube and mouthpiece.",
      "<strong>Washable fabric</strong>: it holds an instrument that goes in a mouth. Cotton that survives a hot wash."
    ],
    related: ["kinchaku", "shoesbag", "gymbag", "ehonbag"]
  },

  nuiclothes: {
    title: "Plush toy dress",
    tab: "small",
    toolName: "Plush toy dress",
    sizeStep: "Enter the plush toy's chest, bodice length, skirt length, shoulder width, skirt fullness and ease. Presets cover 10 cm and 20 cm plush toys and a 30 cm doll.",
    desc: "How to sew a dress for a plush toy. A bodice with a gathered skirt, closing with snaps at the back.",
    keywords: "plush toy clothes,plushie outfit,doll dress,how to sew,sewing pattern,scraps,handmade",
    lead: "A dress for a plush toy around 20 cm tall. A bodice with a gathered skirt, snapping at the back. Shop-bought outfits assume a standard size that plush toys do not actually share — measure your own and it will fit. Scraps are all you need.",
    matNote: "20 cm plush toy",
    materials: [
      "Main fabric (lawn, broadcloth or double gauze — thin) — about 40 × 30 cm (16 × 12 in)",
      "Tiny snap fasteners or narrow hook-and-loop — 2–3 sets",
      "Narrow bias tape (about 6 mm / ¼ in finished) — about 50 cm (20 in)",
      "Optional: narrow lace or ribbon"
    ],
    cut: [
      "<strong>Measure the toy</strong><br>Measure the chest at its widest, the shoulder width and the length you want. Lay the tape on gently — plush toys compress.",
      "<strong>Trace the pattern</strong><br>Trace the front bodice (on the fold), the back bodices and the skirt. Use a mechanical pencil.",
      "<strong>Cut</strong><br>Cut one front, two backs and two skirt panels.",
      "<strong>Finish the edges</strong><br>Seam allowances are 5 mm — pinking shears handle this better than a zigzag."
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Sew both shoulder seams with a 5 mm allowance.",
        "Press the allowances to one side rather than open."
      ]},
      { h: "4-2. Bind the neckline and armholes", items: [
        "Sew narrow bias tape around the neckline, turn it in and topstitch.",
        "Bind the armholes the same way. Wide tape will not follow these curves."
      ]},
      { h: "4-3. Make and attach the skirt", items: [
        "Sew the two skirt panels together at both sides to form a loop.",
        "Run two rows of long stitches along the top edge and pull until it matches the bodice hem.",
        "Pin the skirt to the bodice right sides together, spreading the gathers evenly, and sew.",
        "Match the center front, sides and center back first, then even out the gathers between those points."
      ]},
      { h: "4-4. Finish the back and hem", items: [
        "Turn each back opening edge under twice — 5 mm and 5 mm — and stitch.",
        "Hem the skirt the same way.",
        "Fit two or three snaps, or narrow hook-and-loop, down the back."
      ]}
    ],
    sewNote: "Use a 5 mm seam allowance throughout and thin fabric. A standard 1 cm allowance on something this small makes the side seams so thick the dress will not go over the toy.",
    tips: [
      "<strong>Hook-and-loop</strong>: much easier than snaps if the outfit is going to be changed often.",
      "<strong>Tiny prints only</strong>: a large print puts no complete motif anywhere on the garment.",
      "<strong>Measure your own</strong>: two toys both described as 20 cm can be completely different widths."
    ],
    related: ["dollclothes", "teddy", "babytoy", "kidsdress"]
  },

  /* ===================== bags ===================== */

  ecobag: {
    title: "Foldable shopping bag",
    tab: "bag",
    toolName: "Foldable shopping bag",
    sizeStep: "Enter the finished width, height, gusset and handle length. Presets cover small, standard and large.",
    desc: "How to sew a shopping bag that folds into its own pocket. Lightweight nylon keeps it small enough to live in a handbag.",
    keywords: "shopping bag,eco bag,foldable tote,how to sew,sewing pattern,nylon,handmade",
    lead: "A shopping bag that folds down into a small pocket sewn to its own side. In lightweight nylon it packs to the size of a purse, which is the only reason a spare bag ever actually gets carried.",
    matNote: "standard size",
    materials: [
      "Main fabric (lightweight nylon or fine cotton) — about 110 cm wide × 90 cm (43 × 35 in)",
      "Fabric for the fold-away pocket — about 15 × 20 cm (6 × 8 in)",
      "Optional: a snap or short elastic to hold it folded"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body (base on the fold), the handles and the pocket.",
      "<strong>Cut</strong><br>Cut one body, two handles and one pocket.",
      "<strong>Finish the edges</strong><br>Serge or zigzag, or use French seams — lightweight nylon frays quickly."
    ],
    sew: [
      { h: "4-1. Make the handles and pocket", items: [
        "Fold each handle in quarters lengthwise and topstitch both long edges.",
        "Turn the pocket's opening edge under twice and stitch, then press the other three edges under."
      ]},
      { h: "4-2. Attach the pocket", items: [
        "Topstitch the pocket to the outside of the body, low on one side, while the fabric is still flat.",
        "This is the pocket the whole bag folds into, so stitch all three edges firmly."
      ]},
      { h: "4-3. Sew the body", items: [
        "Fold the body at the base, right sides together, and sew both sides.",
        "Pinch each base corner into a triangle and sew across to form the gusset."
      ]},
      { h: "4-4. Finish the opening and handles", items: [
        "Turn the opening edge under twice and stitch.",
        "Topstitch the handles to the inside of the opening with a stitched rectangle and a cross at each end.",
        "Lightweight fabric plus a full shopping bag is a lot of load on four small squares of stitching, so go over them twice."
      ]}
    ],
    sewNote: "Reinforce the handle attachments harder than feels necessary. Thin nylon tears at the stitch line long before the fabric itself gives way, and a bag of groceries finds that point immediately.",
    tips: [
      "<strong>French seams</strong>: they enclose every raw edge, which makes a thin bag far more durable.",
      "<strong>Fold it small</strong>: roll from the base and tuck it into its pocket. A snap keeps it closed.",
      "<strong>Ripstop</strong>: ripstop nylon is light, strong and packs down to almost nothing."
    ],
    related: ["tote", "azuma", "kinchaku", "bucketbag"]
  },

  bucketbag: {
    title: "Bucket tote bag",
    tab: "bag",
    toolName: "Bucket tote bag",
    sizeStep: "Enter the base diameter, bag height, handle length and cut width, and the opening fold. Presets cover small, standard and large.",
    desc: "How to sew a cylindrical bucket tote with a round base. It stands up on its own and nothing falls to the corners.",
    keywords: "bucket bag,bucket tote,round base bag,how to sew,sewing pattern,canvas,handmade",
    lead: "A cylindrical bag with a round base that stands on its own. With no corners, the contents do not disappear into them and you can see everything from above. Canvas gives it the body it needs to hold the shape.",
    matNote: "standard size",
    materials: [
      "Main fabric (8–11 oz canvas) — about 110 cm wide × 70 cm (43 × 28 in)",
      "Lining fabric (sheeting or heavy cotton) — the same amount",
      "Heavy fusible interfacing — for the base and body",
      "Optional: a plastic base insert"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the base (a circle), the body and the handles. Trace the circle accurately or the base will not fit.",
      "<strong>Cut</strong><br>Cut the base in main and lining, the body in main and lining (two panels each), and two handles.",
      "<strong>Apply interfacing</strong><br>Fuse heavy interfacing to the main base and body if you want it to stand up."
    ],
    sew: [
      { h: "4-1. Make the handles", items: [
        "Fold each handle in quarters lengthwise, press, and topstitch 3 mm from both edges. Two parallel lines of stitching is what makes them look shop-bought."
      ]},
      { h: "4-2. Sew the body into a tube", items: [
        "Sew the two main body panels together at both sides. Press the seams open.",
        "Do the same with the lining, leaving a 12 cm (5 in) gap in one seam."
      ]},
      { h: "4-3. Attach the base", items: [
        "Pin the base to the lower edge of the tube, right sides together. Pin at four points — the two side seams and the midpoints between them — then fill in.",
        "Sew with the circle uppermost, turning the work gradually.",
        "Clip the allowance every 1 cm so the base sits round rather than faceted.",
        "Attach the lining base the same way."
      ]},
      { h: "4-4. Join and finish", items: [
        "Turn the main bag right side out and slip it inside the lining, right sides together.",
        "Catch the handle ends at even positions front and back as you sew around the opening. Check they are not twisted.",
        "Turn through the gap in the lining, close it, push the lining in and topstitch around the opening."
      ]}
    ],
    sewNote: "Setting the circular base is the only real skill here. Pin at four points and halve the gaps. If the circle seems to be running short or long, add pins and spread the difference — pulling it distorts the base and the bag leans.",
    tips: [
      "<strong>Base insert</strong>: a piece of plastic board cut to the base size stops it sagging when loaded.",
      "<strong>Inner pocket</strong>: sew it to the lining before you make the lining into a tube. It cannot be done afterwards.",
      "<strong>No corner gussets</strong>: a round base means no triangle-pinching step at all — this is simpler than a square tote."
    ],
    related: ["tote", "roundkinchaku", "shoulderbag", "lunchbag"]
  },

  backpack: {
    title: "Backpack",
    tab: "bag",
    toolName: "Backpack",
    sizeStep: "Enter the finished width, height, gusset, strap length and width, and the flap depth. Presets cover small, standard and large.",
    desc: "How to sew a flap backpack. Body, gusset, flap and shoulder straps, closed with a buckle or hook-and-loop.",
    keywords: "backpack,rucksack,day pack,how to sew,sewing pattern,canvas,handmade",
    lead: "A flap-closing backpack. Two body panels, a continuous gusset, a flap and two shoulder straps. It has more pieces than most bags here, but each seam is straightforward and the result carries real weight. Canvas or nylon.",
    matNote: "standard size",
    materials: [
      "Main fabric (canvas or nylon) — about 110 cm wide × 150 cm (43 × 59 in)",
      "Lining fabric — the same amount",
      "Heavy fusible interfacing — for the body",
      "Webbing for the straps (about 4 cm / 1½ in wide) — the length you chose",
      "Sliders and a buckle, or hook-and-loop — 1 set"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body panels, the gusset, the flap and the straps.",
      "<strong>Cut</strong><br>Cut everything in main and lining, plus two straps. The gusset is long — take it along the length of the fabric.",
      "<strong>Apply interfacing</strong><br>Fuse heavy interfacing to the main body and gusset."
    ],
    sew: [
      { h: "4-1. Make the straps and flap", items: [
        "Fold self-fabric straps in quarters and topstitch, or cut webbing to length and seal the ends.",
        "Sew the flap in main and lining, leaving the attachment edge open. Turn, press and topstitch."
      ]},
      { h: "4-2. Attach the straps to the back panel", items: [
        "Stitch the strap tops to the back panel near the top, and the strap bottoms near the base.",
        "Stitch each anchor as a rectangle with a cross through it, twice.",
        "The straps carry everything the bag holds, so this is the joint that decides whether the bag survives."
      ]},
      { h: "4-3. Attach the gusset", items: [
        "Match the center of the gusset to the center of the base of one body panel and pin outward from there.",
        "Sew all the way around, clipping the gusset allowance at the base corners.",
        "Attach the second body panel the same way. Assemble the lining likewise, leaving a gap."
      ]},
      { h: "4-4. Join and close", items: [
        "Turn the main bag out and slip it inside the lining, right sides together, catching the flap at the back edge.",
        "Sew around the opening, turn through the gap, close it and push the lining in.",
        "Topstitch around the opening and fit the buckle or hook-and-loop."
      ]}
    ],
    sewNote: "Work outward from the center when attaching the gusset. Starting at one end guarantees the two pieces run out of step and the last corner will not close.",
    tips: [
      "<strong>Webbing straps</strong>: stronger than self-fabric and far quicker. Add a shoulder pad if you carry weight.",
      "<strong>Base reinforcement</strong>: a second layer of fabric on the base is worth the ten minutes.",
      "<strong>Inner pocket</strong>: sew it to the lining while everything is still flat."
    ],
    related: ["gymbag", "bostonbag", "tote", "bodybag"]
  },

  roundkinchaku: {
    title: "Round-base drawstring bag",
    tab: "bag",
    toolName: "Round-base drawstring bag",
    sizeStep: "Enter the base diameter, bag height and the drawstring casing drop. Presets cover a cup bag, standard, lunch size and large.",
    desc: "How to sew a drawstring bag with a circular base, so it stands up. Two cords, one from each side, close it evenly.",
    keywords: "drawstring bag,round base,cup bag,lunch bag,how to sew,sewing pattern,handmade",
    lead: "A drawstring bag with a round base, so it sits upright instead of flopping. That means a cup or a lunch box goes in standing rather than tipped. Two pieces, and threading a cord from each side lets it close evenly with one pull.",
    matNote: "standard size",
    materials: [
      "Main fabric (oxford, sheeting or printed cotton) — about 60 × 50 cm (24 × 20 in)",
      "Lining fabric — the same amount, if lining",
      "Cord (about 5 mm / ³⁄₁₆ in) — the length given, × 2",
      "Bodkin"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the base (a circle) and the body. Trace the circle accurately.",
      "<strong>Cut</strong><br>Cut the base and two body panels, in main and lining if you are lining it.",
      "<strong>Finish the edges</strong><br>Unlined, zigzag the side and base allowances."
    ],
    sew: [
      { h: "4-1. Sew the sides, leaving the casing openings", items: [
        "Sew the two body panels together at both sides.",
        "Stop each seam at the casing drop measured down from the top — those unsewn sections are where the cords come out.",
        "Press the allowances open there and topstitch them down in a narrow rectangle. Backstitch at the point where the seam stops."
      ]},
      { h: "4-2. Attach the base", items: [
        "Pin the base to the lower edge of the tube, right sides together, at four points first, then fill in.",
        "Sew with the circle uppermost, clipping the allowance every 1 cm.",
        "Turn out and shape the base."
      ]},
      { h: "4-3. Make the casing", items: [
        "Fold the opening edge under twice to the casing depth and stitch all the way around.",
        "Check the channel connects to both side openings."
      ]},
      { h: "4-4. Thread the cords", items: [
        "Thread one cord in through one opening, all the way around, and back out the same opening. Knot the ends.",
        "Thread the second cord from the other opening.",
        "One cord from each side is what lets it close evenly by pulling both."
      ]}
    ],
    sewNote: "Both casing openings must stop at exactly the same height. Mark them on the two panels while they are stacked together, or the bag closes crooked.",
    tips: [
      "<strong>Cup bag size</strong>: the cup preset matches the size nurseries usually ask for.",
      "<strong>Interface the base</strong>: heavy interfacing on the base makes it genuinely self-supporting.",
      "<strong>Cord length</strong>: each cord should be about the circumference of the opening. Too short and it will not open fully."
    ],
    related: ["kinchaku", "kincgusset", "bucketbag", "laundrybag"]
  },

  bodybag: {
    title: "Sling bag (crossbody)",
    tab: "bag",
    toolName: "Sling bag (crossbody)",
    sizeStep: "Enter the finished width, height, gusset, lower corner radius, strap length and cut width. Presets cover small, standard and large.",
    desc: "How to sew a compact crossbody sling bag with a zip. Body, gusset and an adjustable strap.",
    keywords: "sling bag,crossbody bag,body bag,how to sew,sewing pattern,nylon,handmade",
    lead: "A small bag worn across the body. The zip keeps everything in, and worn on the back it stays out of the way while you walk. Good as a day bag or as a second bag when travelling. Nylon or canvas.",
    matNote: "standard size",
    materials: [
      "Main fabric (nylon or canvas) — about 70 × 140 cm (28 × 24 in)",
      "Lining fabric — the same amount",
      "Fusible interfacing — for the main fabric",
      "Webbing or a self-fabric strap — the length you chose",
      "Zip — to the opening width",
      "A slider for adjustment — 1"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body including the lower corner radius, the gusset and the strap.",
      "<strong>Cut</strong><br>Cut two body panels and one gusset in main and lining, plus one strap.",
      "<strong>Apply interfacing</strong><br>Fuse interfacing to the main pieces so the bag holds its shape when empty."
    ],
    sew: [
      { h: "4-1. Make the strap", items: [
        "For a self-fabric strap, fold in quarters, press and topstitch both edges. For webbing, cut and seal the ends.",
        "Thread the slider on before attaching anything."
      ]},
      { h: "4-2. Insert the zip", items: [
        "Sandwich the zip between the main fabric and the lining along the opening edge and sew all three layers.",
        "Open them away from the zip and topstitch close to the teeth. Repeat on the other side."
      ]},
      { h: "4-3. Attach the gusset", items: [
        "Match the center of the gusset to the base center of one body panel and pin outward.",
        "Sew all the way around, catching the strap ends at the top of each side.",
        "Attach the second body panel the same way, remembering to open the zip first so you can turn it."
      ]},
      { h: "4-4. Finish", items: [
        "Turn through the open zip and shape the bag.",
        "Topstitch around the gusset seams if you want a crisper edge."
      ]}
    ],
    sewNote: "Open the zip before you sew the second body panel on. Sew it closed and the bag becomes a sealed pouch with no way to turn it right side out.",
    tips: [
      "<strong>Adjustable strap</strong>: a slider lets you wear it high at the chest or low at the hip.",
      "<strong>Wear it forward</strong>: pulled round to the front in a crowd, it is far harder to get into.",
      "<strong>Water-repellent fabric</strong>: this bag lives outdoors."
    ],
    related: ["waistbag", "sacoche", "phonepouch", "backpack"]
  },

  baginbag: {
    title: "Bag-in-bag organizer",
    tab: "bag",
    toolName: "Bag-in-bag organizer",
    sizeStep: "Enter the finished width, height, gusset, divider height and handle length. Presets cover small, standard and large.",
    desc: "How to sew an organizer insert for a large bag. Dividers stop everything falling to the bottom, and it moves between bags.",
    keywords: "bag organizer,bag in bag,insert,how to sew,sewing pattern,canvas,handmade",
    lead: "An insert that stops everything in a large tote settling at the bottom. Stitch the divider vertically and pens, phone and keys each get a place. Change bags and you lift the whole thing across. It needs firm fabric or it collapses and defeats the point.",
    matNote: "standard size",
    materials: [
      "Main fabric (canvas, oxford or quilted cotton) — about 110 cm wide × 60 cm (43 × 24 in)",
      "Divider fabric — about 50 × 40 cm (20 × 16 in)",
      "Heavy fusible interfacing — for the body",
      "Optional: webbing for the handles"
    ],
    cut: [
      "<strong>Measure the outer bag</strong><br>Measure the inside of the bag it goes into and make this 1–2 cm (½ in) smaller in width and height.",
      "<strong>Trace the pattern</strong><br>Trace the body (base on the fold), the dividers and the handles.",
      "<strong>Cut</strong><br>Cut one body, one or two dividers and two handles, then fuse heavy interfacing to the body."
    ],
    sew: [
      { h: "4-1. Make the dividers", items: [
        "Turn the top edge of each divider under twice and stitch. Do this first.",
        "With two dividers, make them different heights so the contents are visible."
      ]},
      { h: "4-2. Attach the dividers", items: [
        "Lay the body flat and position a divider the divider-height above the base fold.",
        "Stitch vertically to create the pockets — about 2 cm (¾ in) for a pen, about 8 cm (3 in) for a phone.",
        "Backstitch at the top of each line; that is where pockets tear.",
        "Baste the lower and side edges within the seam allowance.",
        "All of this must happen before the body becomes a tube — the machine arm cannot reach inside afterwards."
      ]},
      { h: "4-3. Sew the sides and gusset", items: [
        "Fold the body at the base, right sides together, and sew both sides.",
        "Pinch each base corner into a triangle and sew across at the gusset depth. Check both sides match before sewing.",
        "Trim the triangles to 1 cm and finish the edges."
      ]},
      { h: "4-4. Finish the opening and handles", items: [
        "Turn the opening edge under twice and stitch.",
        "Stitch the handles inside the opening with a rectangle and a cross. They only have to lift the organizer out, so they can be short."
      ]}
    ],
    sewNote: "Everything involving the dividers happens while the body is flat. Once the sides are sewn it becomes a tube, and there is no way to stitch a divider inside a tube on a domestic machine.",
    tips: [
      "<strong>Measure the host bag</strong>: 1–2 cm smaller in each direction is what makes it easy to lift in and out.",
      "<strong>Dividers on both faces</strong>: front and back doubles the organization.",
      "<strong>Firm interfacing matters</strong>: a soft organizer slumps inside the bag and does nothing at all."
    ],
    related: ["tote", "gadgetpouch", "pouchgusset", "boshitecho"]
  },

  wallet: {
    title: "Long wallet",
    tab: "bag",
    toolName: "Long wallet",
    sizeStep: "Enter the note width and height, card pocket height, coin section height and thickness. Presets cover standard, slim and large.",
    desc: "How to sew a bi-fold long wallet that takes notes flat. Body, card pockets and a coin section.",
    keywords: "long wallet,bifold wallet,how to sew,sewing pattern,card slots,handmade",
    lead: "A long wallet that takes banknotes flat rather than folded. Body, card pockets and a coin section. Stitching the card pocket vertically decides how many slots you get, and interfacing is what keeps it looking like a wallet rather than a fabric envelope.",
    matNote: "standard size",
    materials: [
      "Main fabric (faux leather, canvas or heavy cotton) — about 60 × 50 cm (24 × 16 in)",
      "Lining fabric — the same amount",
      "Card pocket fabric — about 40 × 30 cm (16 × 12 in)",
      "Firm fusible interfacing — for the main fabric",
      "Zip for the coin section — about 15 cm (6 in)",
      "Snap fastener — 1 set"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body, the card pockets and the coin section, and mark the center fold.",
      "<strong>Cut</strong><br>Cut the body in main and lining, two or three card pockets and one coin section piece.",
      "<strong>Apply interfacing</strong><br>Fuse firm interfacing to the main fabric."
    ],
    sew: [
      { h: "4-1. Make the card pockets", items: [
        "Turn the top edge of each card pocket under twice and stitch.",
        "Stack them at staggered heights so each slot is visible."
      ]},
      { h: "4-2. Attach the pockets", items: [
        "Lay them on the lining, from the lowest upward, aligning the sides.",
        "Stitch vertically to divide them into slots — about 6 cm (2⅜ in) per card. Backstitch at the top of each line.",
        "Work from the bottom up; attaching the top one first puts it under the presser foot when you sew the ones below."
      ]},
      { h: "4-3. Make the coin section", items: [
        "Fold the coin piece in half and set the zip into the opening.",
        "Attach it to the lining on the opposite side from the card pockets."
      ]},
      { h: "4-4. Assemble and fold", items: [
        "Place main and lining right sides together and sew around, leaving a 12 cm (5 in) gap.",
        "Trim the corners, turn, press and topstitch all the way around.",
        "Fold at the center, load the wallet and fit the snap with everything inside."
      ]}
    ],
    sewNote: "Attach card pockets from the bottom upward. Sew the top one on first and every pocket below it has to be sewn with the finished one bunched under the presser foot.",
    tips: [
      "<strong>Stagger the slots</strong>: each card should show a centimeter of itself so you can find the right one.",
      "<strong>Do not over-interface</strong>: too stiff and the wallet springs open in your bag.",
      "<strong>Faux leather</strong>: it has body without interfacing, but every needle hole is permanent."
    ],
    related: ["cardcase", "keycase", "gamaguchi", "passportcase"]
  },

  phonepouch: {
    title: "Phone crossbody pouch",
    tab: "bag",
    toolName: "Phone crossbody pouch",
    sizeStep: "Enter your phone's width, height and thickness, the flap depth, strap length and cut width. Presets cover standard, large-screen and slim.",
    desc: "How to sew a small crossbody pouch for a phone. Body, flap and a shoulder strap — sized from your own phone.",
    keywords: "phone pouch,phone crossbody,phone bag,how to sew,sewing pattern,handmade",
    lead: "A small crossbody pouch that takes a phone and little else. For a walk or a quick errand that is all you need, and it leaves your hands free. Measure your own phone and it will actually fit — the flap keeps it in even if you run.",
    matNote: "standard size",
    materials: [
      "Main fabric (canvas, faux leather or heavy cotton) — about 50 × 40 cm (20 × 16 in)",
      "Lining fabric — the same amount",
      "Fusible interfacing — for the main fabric",
      "Webbing or a self-fabric strap — the length you chose",
      "Snap or magnetic fastener — 1 set",
      "Optional: a slider, swivel hook and D-rings"
    ],
    cut: [
      "<strong>Measure your phone</strong><br>Measure width, height and thickness with the case on. The camera bump counts.",
      "<strong>Trace the pattern</strong><br>Trace the body (base on the fold), the flap and the strap.",
      "<strong>Cut</strong><br>Cut the body in main and lining, the flap in main and lining, and one strap."
    ],
    sew: [
      { h: "4-1. Make the flap and strap", items: [
        "Sew the flap main and lining right sides together, leaving the attachment edge open. Clip any curve, turn and topstitch.",
        "For a self-fabric strap, fold in quarters and topstitch both edges."
      ]},
      { h: "4-2. Sew the sides and gusset", items: [
        "Fold the body at the base, right sides together, and sew both sides.",
        "Pinch each base corner into a triangle and sew across at the phone's thickness. It is a small measurement — use a ruler rather than eyeing it, and check both sides match.",
        "Trim the triangles to 1 cm."
      ]},
      { h: "4-3. Attach the flap and strap", items: [
        "Turn the opening edge under twice and stitch.",
        "Stitch the flap to the back of the opening with two rows, or a rectangle with a cross.",
        "Stitch the strap ends at the sides. D-rings here let you change the strap later.",
        "Try the strap on before sewing it down — length is much easier to judge on the body than on the table."
      ]},
      { h: "4-4. Add the fastening", items: [
        "Put the phone in, close the flap and mark where it lands.",
        "A magnetic fastener opens one-handed, which matters on a bag you open while walking."
      ]}
    ],
    sewNote: "The thickness measurement is where this usually goes wrong. Measure with the case on, at the thickest point, camera bump included. Entering 1 cm when the reality is 1.5 cm produces a pouch the phone will not go into.",
    tips: [
      "<strong>D-rings for a swappable strap</strong>: stitch D-rings to the bag and clip the strap on, and you can change it whenever you like.",
      "<strong>Add a slider</strong>: it lets you adjust for wearing over a coat.",
      "<strong>One inner pocket</strong>: on the lining, for a card or a key."
    ],
    related: ["sacoche", "bodybag", "waistbag", "pouchgusset"]
  },

  lunchbag: {
    title: "Insulated lunch bag",
    tab: "bag",
    toolName: "Insulated lunch bag",
    sizeStep: "Enter the lunch box width, depth and height, and the handle length and cut width. Presets cover one-tier, two-tier and large.",
    desc: "How to sew a boxy lunch bag that holds a lunch box upright. Insulating lining keeps things cool.",
    keywords: "lunch bag,insulated bag,bento bag,how to sew,sewing pattern,handmade",
    lead: "A boxy bag that holds a lunch box upright rather than letting it tip. That is the whole point — a tipped lunch box leaks. Line it with insulating fabric for summer, and measure your own box so the fit is right.",
    matNote: "standard, one-tier",
    materials: [
      "Main fabric (oxford, quilted cotton or canvas) — about 60 × 60 cm (24 × 24 in)",
      "Lining fabric (insulating sheet or water-repellent fabric) — the same amount",
      "Webbing or a self-fabric handle — the length you chose, × 2",
      "Optional: hook-and-loop to close the opening"
    ],
    cut: [
      "<strong>Measure the lunch box</strong><br>Width, depth and height. If an ice pack goes in too, add its thickness.",
      "<strong>Trace the pattern</strong><br>Trace the body (base on the fold) and the handles.",
      "<strong>Cut</strong><br>Cut the body in main and lining, and two handles. Insulating sheet can be left raw."
    ],
    sew: [
      { h: "4-1. Make the handles", items: [
        "Fold self-fabric handles in quarters and topstitch, or cut webbing to length and seal the ends."
      ]},
      { h: "4-2. Sew the main body and gusset", items: [
        "Fold the main body at the base, right sides together, and sew both sides.",
        "Pinch each base corner into a triangle, matching the side seam to the base fold exactly.",
        "Sew across at the depth of the lunch box. Check both sides measure the same before you sew — this is what decides whether the box sits level.",
        "Trim the triangles to 1 cm."
      ]},
      { h: "4-3. Sew the lining", items: [
        "Make the lining the same way, leaving a 12 cm (5 in) gap in one side seam.",
        "Insulating sheet is bulky — press its seam allowances to one side rather than open."
      ]},
      { h: "4-4. Join and finish", items: [
        "Turn the main bag out and slip it inside the lining, right sides together.",
        "Catch the handle ends front and back as you sew around the opening.",
        "Turn through the gap, close it, push the lining in and topstitch around the opening."
      ]}
    ],
    sewNote: "Both gussets must be identical. If the side seam and base fold are not exactly aligned when you pinch the triangle, one side ends up deeper and the lunch box sits at an angle — which is how it leaks.",
    tips: [
      "<strong>Insulating sheet as lining</strong>: sold as thermal or foil-backed sheeting. It makes a real difference in summer.",
      "<strong>Close the opening</strong>: hook-and-loop across the top improves insulation and stops things falling out.",
      "<strong>Two-tier boxes are tall</strong>: taller than people expect. Use the two-tier preset or measure."
    ],
    related: ["kincgusset", "bottleholder", "flaskcover", "tote"]
  },

  cosmepouch: {
    title: "Cosmetic pouch (stand-up)",
    tab: "bag",
    toolName: "Cosmetic pouch (stand-up)",
    sizeStep: "Enter the opening width, base width, height and base depth. Presets cover small, standard and large.",
    desc: "How to sew a trapezoid cosmetic pouch that stands up and opens wide. Two body pieces plus a base.",
    keywords: "cosmetic pouch,makeup bag,stand up pouch,how to sew,sewing pattern,quilted,handmade",
    lead: "A trapezoid pouch with a wide base that opens up so you can see inside. Make-up stands upright rather than lying in a heap, and it stays put on a bathroom shelf. Interfacing or quilted fabric is what makes it stand.",
    matNote: "standard size",
    materials: [
      "Main fabric (quilted cotton, canvas or oxford) — about 50 × 40 cm (20 × 16 in)",
      "Lining fabric (light cotton or water-repellent fabric) — the same amount",
      "Heavy fusible interfacing — for the main fabric (not needed with quilted fabric)",
      "Zip — about 2 cm (¾ in) longer than the opening"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body (a trapezoid) and the base (a rectangle).",
      "<strong>Cut</strong><br>Cut two body pieces and one base, in both main and lining.",
      "<strong>Apply interfacing</strong><br>Unless you are using quilted fabric, fuse heavy interfacing to the main pieces."
    ],
    sew: [
      { h: "4-1. Insert the zip", items: [
        "Lay the zip right sides together on the top edge of one body piece, add the lining on top, and sew all three layers.",
        "Open the fabrics away and topstitch close to the teeth.",
        "Attach the second body piece to the other side of the zip the same way."
      ]},
      { h: "4-2. Sew the sides", items: [
        "Open the zip halfway — with it closed you cannot turn the pouch afterwards.",
        "Arrange main against main and lining against lining, right sides together, and sew the sloping side edges.",
        "The sides are angled, so line the top corners up carefully before sewing or the pouch will be lopsided."
      ]},
      { h: "4-3. Attach the base", items: [
        "Pin the base to the lower edges, right sides together, matching the four corners first.",
        "Sew all the way around, turning the work at each corner with the needle down.",
        "Attach the lining base the same way, leaving an 8 cm (3 in) gap in one edge."
      ]},
      { h: "4-4. Turn and finish", items: [
        "Turn everything through the gap in the lining.",
        "Close the gap, push the lining inside and shape the corners.",
        "Check it stands up and that the opening falls open when unzipped."
      ]}
    ],
    sewNote: "Match the four corners of the base before you sew any of it. The lengths work out exactly on paper, but sewing from one end without matching the corners leaves you with fabric spare at the far end every time.",
    tips: [
      "<strong>Quilted fabric is the shortcut</strong>: it skips the interfacing step entirely and stands just as well.",
      "<strong>Wipe-clean lining</strong>: laminate or coated nylon means a leaked bottle is not a disaster.",
      "<strong>Zip length</strong>: 2 cm longer than the opening, or the metal stops land inside the side seam."
    ],
    related: ["pouchgusset", "pencase", "gadgetpouch", "pouch"]
  },

  passportcase: {
    title: "Passport case",
    tab: "bag",
    toolName: "Passport case",
    sizeStep: "Enter the passport width and height, the contents thickness and the card pocket height. Presets cover 1 person, 2 people and a family of 4.",
    desc: "How to sew a bi-fold travel wallet for passports, tickets, cards and currency.",
    keywords: "passport case,travel wallet,document holder,how to sew,sewing pattern,handmade",
    lead: "A bi-fold case that keeps passports, boarding passes, cards and local currency in one place, so you are not searching a bag at the gate. Sized for a family, it lets you hand over everyone's documents at once, which is worth a great deal at immigration.",
    matNote: "2 people",
    materials: [
      "Main fabric (canvas, faux leather or heavy cotton) — about 50 × 40 cm (20 × 16 in)",
      "Lining fabric (light cotton) — the same amount",
      "Pocket fabric — about 40 × 30 cm (16 × 12 in)",
      "Firm fusible interfacing — for the main fabric",
      "Optional: a snap or elastic closure"
    ],
    cut: [
      "<strong>Measure the contents</strong><br>Measure a passport, and stack everything you intend to carry to get the thickness.",
      "<strong>Trace the pattern</strong><br>Trace the body, the card pocket and the ticket pocket, and mark the center fold.",
      "<strong>Cut</strong><br>Cut the body in main and lining, one card pocket and one ticket pocket, and fuse interfacing to the main fabric."
    ],
    sew: [
      { h: "4-1. Make the pockets", items: [
        "Turn the top edge of each pocket under twice and stitch. Do this before they go near the case."
      ]},
      { h: "4-2. Attach the pockets", items: [
        "Lay the card pocket on one side of the center fold on the lining, and the ticket pocket on the other.",
        "Stitch the card pocket vertically into slots, about 6 cm (2⅜ in) each. Backstitch at the top of every line.",
        "Making the ticket pocket full height lets a passport slot in behind its cover, which holds it open at the photo page.",
        "Baste the lower and side edges within the seam allowance."
      ]},
      { h: "4-3. Sew the layers together", items: [
        "Place main and lining right sides together and sew around, leaving a 12 cm (5 in) gap.",
        "Trim the corners, turn, press and topstitch all the way around."
      ]},
      { h: "4-4. Fold and close", items: [
        "Fold at the center and press.",
        "Load it and fit the snap or elastic with everything inside."
      ]}
    ],
    sewNote: "Measure the thickness for real. One passport is about 5 mm; four passports with boarding passes and cards comes to nearly 2 cm. Leave that out and the case is held open by its own contents.",
    tips: [
      "<strong>Add a pen loop</strong>: you will need a pen for landing cards, and there is never one to hand.",
      "<strong>Faux leather</strong>: no interfacing needed, but sew it once — the needle holes are permanent.",
      "<strong>Also a passbook case</strong>: at other sizes this is a passbook or record book case."
    ],
    related: ["boshitecho", "bankbook", "cardcase", "wallet"]
  },

  laptopcase: {
    title: "Laptop sleeve",
    tab: "bag",
    toolName: "Laptop sleeve",
    sizeStep: "Enter your laptop's width, depth, thickness, ease and the flap depth. Presets cover 13, 14 and 16 inch.",
    desc: "How to sew a padded laptop sleeve. One piece folded at the base with batting inside — sized from your own machine.",
    keywords: "laptop sleeve,laptop case,padded sleeve,how to sew,sewing pattern,batting,handmade",
    lead: "A padded sleeve for a laptop. Shop-bought sleeves come in a handful of sizes and rarely fit any particular machine properly. Measure your own and there is no slop and no squeeze. A layer of batting is all it takes to protect it in a bag.",
    matNote: "14 inch",
    materials: [
      "Main fabric (canvas, corduroy or heavy cotton) — about 60 × 60 cm (24 × 24 in)",
      "Lining fabric (flannel or brushed cotton — something soft) — the same amount",
      "Fusible batting (medium) — the same amount",
      "Hook-and-loop or a magnetic fastener — 1 set"
    ],
    cut: [
      "<strong>Measure the laptop</strong><br>Width, depth and thickness. Measure the thickness at its greatest point — hinge and feet included.",
      "<strong>Trace the pattern</strong><br>Trace the body. It is one piece folded at the base, with the flap continuing above.",
      "<strong>Cut</strong><br>Cut the main and lining, and the batting 1 cm smaller all round so the seams are not bulky.",
      "<strong>Fuse the batting</strong><br>Press it onto the wrong side of the main fabric, pressing straight down rather than gliding."
    ],
    sew: [
      { h: "4-1. Sew the layers together", items: [
        "Place main and lining right sides together and sew around, leaving a 15 cm (6 in) gap.",
        "Trim the corners and cut the allowance back to 7 mm — with batting in there it will not turn otherwise."
      ]},
      { h: "4-2. Turn and topstitch", items: [
        "Turn through the gap and ease the corners out.",
        "Press with a cloth and a light hand so the batting is not flattened.",
        "Topstitch 5 mm from the edge all the way around, closing the gap.",
        "You now have one large two-sided rectangle."
      ]},
      { h: "4-3. Fold and stitch the sides", items: [
        "Fold up from the marked line, leaving the flap standing above.",
        "Stitch both sides 3 mm from the edge. Increase the presser foot pressure, or work the handwheel by hand.",
        "Backstitch at both ends, then run a second line just inside the first — a laptop is heavy."
      ]},
      { h: "4-4. Add the fastening", items: [
        "Put the laptop in, close the flap and mark where it lands.",
        "Fit hook-and-loop or a magnetic fastener 3 mm outside the mark to allow for the thickness."
      ]}
    ],
    sewNote: "Do not skip the measuring. A 13 inch label describes the screen, not the machine, and two 13 inch laptops can differ by more than 2 cm in width. Measure, then add the ease.",
    tips: [
      "<strong>Brushed lining</strong>: the surface the lid rests against. A napped fabric will not scratch it.",
      "<strong>Medium batting</strong>: too thin and it protects nothing; too thick and the sleeve will not go in a bag.",
      "<strong>Add a handle</strong>: a self-fabric loop caught in the side seam makes it easier to carry around the house."
    ],
    related: ["tabletcase", "gadgetpouch", "baginbag", "pouchgusset"]
  },

  tabletcase: {
    title: "Tablet case",
    tab: "bag",
    toolName: "Tablet case",
    sizeStep: "Enter your tablet's width, height, thickness, ease and the flap depth. Presets cover 8, 10 and 12 inch.",
    desc: "How to sew a padded tablet case with a flap. Slim enough to fit inside a school bag.",
    keywords: "tablet case,iPad case,school tablet,how to sew,sewing pattern,batting,handmade",
    lead: "A flap case for a tablet. With one device per child in many schools now, a lot of people suddenly need one of these. Made at home it is lighter than a bought case, fits inside a school bag, and can carry a name where the teacher can see it.",
    matNote: "10 inch",
    materials: [
      "Main fabric (quilted cotton, canvas or heavy cotton) — about 50 × 50 cm (20 × 20 in)",
      "Lining fabric (flannel or light cotton) — the same amount",
      "Fusible batting (medium) — the same amount, unless using quilted fabric",
      "Snap or hook-and-loop — 1 set",
      "Optional: a fabric name label"
    ],
    cut: [
      "<strong>Measure the tablet</strong><br>Width, height and thickness. If it stays in its own case, measure it with the case on.",
      "<strong>Trace the pattern</strong><br>Trace the body — one piece folded at the base with the flap above.",
      "<strong>Cut</strong><br>Cut the main, lining and batting.",
      "<strong>Fuse the batting</strong><br>Press it onto the main fabric. With quilted fabric, skip this."
    ],
    sew: [
      { h: "4-1. Sew the layers together", items: [
        "Place main and lining right sides together and sew around, leaving a 12 cm (5 in) gap.",
        "Trim the corners and cut the allowance back to 7 mm."
      ]},
      { h: "4-2. Turn and topstitch", items: [
        "Turn through the gap and ease the corners out.",
        "Press with a cloth, then topstitch 5 mm from the edge all the way around."
      ]},
      { h: "4-3. Fold and stitch the sides", items: [
        "Fold up from the marked line, leaving the flap above.",
        "Stitch both sides 3 mm from the edge, backstitching at both ends."
      ]},
      { h: "4-4. Fastening and name", items: [
        "Put the tablet in, close the flap and mark the fastening position.",
        "Fit the snap or hook-and-loop.",
        "Sew a name label to the outside of the flap. Every tablet in the classroom looks identical."
      ]}
    ],
    sewNote: "Keep it slim if it has to go in a school bag. Two layers of batting protect better but the case then will not fit alongside the books. Medium batting, one layer, and no more than 1.5 cm of ease.",
    tips: [
      "<strong>Quilted fabric</strong>: skips the batting step and comes in prints children like.",
      "<strong>Name it outside</strong>: not inside. The point is that a teacher can hand it back.",
      "<strong>Add a loop</strong>: caught in the side seam, so it is less likely to be dropped."
    ],
    related: ["laptopcase", "ehonbag", "bousaizukin", "gadgetpouch"]
  },

  waistbag: {
    title: "Belt bag (waist pack)",
    tab: "bag",
    toolName: "Belt bag (waist pack)",
    sizeStep: "Enter the finished width, height, gusset, flap depth, belt length and cut width. Presets cover small, standard and a sling-style version.",
    desc: "How to sew a belt bag you can wear at the waist or across the chest. Body, flap and an adjustable belt.",
    keywords: "belt bag,waist pack,fanny pack,sling bag,how to sew,sewing pattern,handmade",
    lead: "A small bag worn at the waist or across the chest — the belt length decides which. Hands free, and everything stays where you can feel it. Good for travel, walks, festivals and theme parks.",
    matNote: "standard size",
    materials: [
      "Main fabric (nylon, canvas or heavy cotton) — about 70 × 60 cm (28 × 24 in)",
      "Lining fabric (light cotton) — the same amount",
      "Fusible interfacing — for the main fabric",
      "Webbing or a self-fabric belt — the length you chose",
      "A side-release buckle and slider — 1 each",
      "Snap or magnetic fastener — 1 set"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body (base on the fold), the flap and the belt.",
      "<strong>Cut</strong><br>Cut the body in main and lining, the flap in main and lining, and one belt.",
      "<strong>Apply interfacing</strong><br>Fuse interfacing to the main fabric so the bag keeps its shape when it is not full."
    ],
    sew: [
      { h: "4-1. Make the flap and belt", items: [
        "Sew the flap main and lining right sides together, leaving the attachment edge open. Clip the corner curves, turn, press and topstitch.",
        "For a self-fabric belt, fold in quarters and topstitch. For webbing, cut and seal the ends."
      ]},
      { h: "4-2. Sew the sides and gusset", items: [
        "Fold the main body at the base, right sides together, and sew both sides. Do the same with the lining, leaving a 10 cm (4 in) gap.",
        "Pinch each base corner into a triangle and sew across at the gusset depth. Check both sides match."
      ]},
      { h: "4-3. Attach the flap and belt", items: [
        "Turn the main bag out and slip it inside the lining, right sides together.",
        "Catch the flap at the back edge and the belt ends at the sides as you sew around the opening.",
        "Check the belt is not twisted before you sew."
      ]},
      { h: "4-4. Finish", items: [
        "Turn through the gap in the lining, close it, push the lining in and topstitch around the opening.",
        "Thread the buckle and slider onto the belt.",
        "Load the bag, close the flap and fit the snap or magnetic fastener."
      ]}
    ],
    sewNote: "The belt attachment is the highest-stress point on this bag. Backstitch two or three times, or stitch a rectangle with a cross. Webbing itself is strong; the stitching holding it is what fails, and when it does the bag goes on the ground.",
    tips: [
      "<strong>Belt length changes the bag</strong>: about 100 cm (39 in) for the waist, about 140 cm (55 in) to wear across the body. A slider covers both.",
      "<strong>Magnetic fastener</strong>: opens one-handed while walking, which is exactly how this bag gets used.",
      "<strong>Water-repellent fabric</strong>: it is an outdoor bag, so a sudden shower should not matter."
    ],
    related: ["bodybag", "sacoche", "petpouch", "phonepouch"]
  },

  bostonbag: {
    title: "Boston bag",
    tab: "bag",
    toolName: "Boston bag",
    sizeStep: "Enter the finished width, height, gusset, handle length and cut width, and the base corner radius. Presets cover 1 night, 2 nights and a sports size.",
    desc: "How to sew a Boston bag for a night or two away. Two body panels, one continuous gusset and two handles.",
    keywords: "boston bag,duffel bag,weekend bag,how to sew,sewing pattern,canvas,handmade",
    lead: "A roomy bag for a night or two away. The gusset is one continuous strip that forms the base and both sides, so there are only two seams joining it to the body panels. It looks like a complicated bag and is not.",
    matNote: "2 nights",
    materials: [
      "Main fabric (8–11 oz canvas or nylon) — about 110 cm wide × 150 cm (43 × 59 in)",
      "Lining fabric (sheeting or nylon) — the same amount",
      "Heavy fusible interfacing — for the body",
      "Webbing for the handles (about 4 cm / 1½ in wide) — the length you chose, × 2",
      "Zip — about the width of the opening",
      "Optional: a plastic base insert"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body panels, the gusset and the handles. The gusset is a long strip — its length is the width plus twice the height.",
      "<strong>Cut</strong><br>Cut two body panels and one gusset in main and lining, plus two handles. Take the gusset along the length of the fabric.",
      "<strong>Apply interfacing</strong><br>Fuse heavy interfacing to the main body and gusset."
    ],
    sew: [
      { h: "4-1. Make the handles", items: [
        "Fold self-fabric handles in quarters and topstitch both edges, with webbing inside for comfort if you like.",
        "For webbing handles, cut to length and seal the ends."
      ]},
      { h: "4-2. Attach the handles", items: [
        "Stitch a handle to each body panel, positioned symmetrically.",
        "Run two lines of stitching from the handle end down about a third of the bag's height, and finish the top with a rectangle and a cross.",
        "That long attachment is what stops handles pulling out. Stitched only at the top, they will come off.",
        "Do this while the panels are still flat."
      ]},
      { h: "4-3. Attach the gusset", items: [
        "Match the center of the gusset to the center of the base of one body panel and pin.",
        "Work outward from there — base, then base corners, then up the sides — pinning a little at a time.",
        "Clip the gusset allowance at the base corners so it turns.",
        "Attach the second body panel the same way. Assemble the lining likewise, leaving a 15 cm (6 in) gap."
      ]},
      { h: "4-4. Insert the zip and finish", items: [
        "Turn the main bag out and slip it inside the lining, right sides together.",
        "Sandwich the zip in the opening and sew all the way around. Open the zip halfway first.",
        "Turn through the gap, close it, push the lining in and topstitch around the opening.",
        "Cut a plastic board to the base size and drop it in."
      ]}
    ],
    sewNote: "Always work outward from the center of the gusset. Start at one end and the two pieces run out of step, so by the far corner you are easing in several centimeters of gusset that has nowhere to go.",
    tips: [
      "<strong>The handles are everything</strong>: a travel bag is heavy. Stitch them a third of the way down the body or they will pull out.",
      "<strong>Base insert</strong>: plastic board cut to the base keeps the bag flat when loaded.",
      "<strong>Add a shoulder strap</strong>: D-rings at each end let you add one later, which matters over any distance."
    ],
    related: ["tote", "backpack", "lunchbag", "bucketbag"]
  },

  gadgetpouch: {
    title: "Gadget pouch",
    tab: "bag",
    toolName: "Gadget pouch",
    sizeStep: "Enter the finished width, height, gusset and pocket height. Presets cover small, standard and large.",
    desc: "How to sew a book-style pouch for chargers and cables. Mesh pockets and elastic loops keep everything visible.",
    keywords: "gadget pouch,cable organizer,tech pouch,how to sew,sewing pattern,travel,handmade",
    lead: "A pouch that keeps chargers, cables and earphones in order. Run the zip around three sides and it opens flat like a book, so you can see everything at once. That small stress of untangling cables in a bag simply disappears.",
    matNote: "standard size",
    materials: [
      "Main fabric (canvas, nylon or heavy cotton) — about 50 × 40 cm (20 × 16 in)",
      "Lining fabric (light cotton, or mesh) — the same amount",
      "Pocket fabric (mesh lets you see the contents) — about 30 × 20 cm (12 × 8 in)",
      "Fusible interfacing — for the main fabric",
      "Flat elastic (1.5 cm / ⅝ in wide) — about 40 cm (16 in)",
      "Zip — long enough to run around three sides"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body (base on the fold), the pockets and the elastic backing strips.",
      "<strong>Cut</strong><br>Cut the body in main and lining, one or two pockets and one or two backing strips.",
      "<strong>Apply interfacing</strong><br>Fuse interfacing to the main fabric so it holds its shape when open."
    ],
    sew: [
      { h: "4-1. Make and attach the pockets", items: [
        "Turn the top edge of each pocket under twice and stitch. With mesh, bind the top edge with bias tape instead.",
        "Stitch a pocket to one face of the lining and divide it vertically into two or three compartments.",
        "Backstitch at the top of each dividing line."
      ]},
      { h: "4-2. Add the elastic loops", items: [
        "Lay the elastic across the other face of the lining, cover it with the backing strip, and stitch across at both ends and at each division.",
        "Space the divisions 3–5 cm (1½–2 in) apart so a cable slots into each.",
        "Leave the elastic slack as you sew. Stitched taut, nothing will fit under it.",
        "Do all of this while everything is still flat."
      ]},
      { h: "4-3. Insert the zip", items: [
        "Lay the zip along the top edge and around both upper sides — three sides in all — sandwiched between main and lining, and sew.",
        "Open the fabrics away and topstitch close to the teeth.",
        "The three-sided zip is what lets it open flat like a book."
      ]},
      { h: "4-4. Sew the sides and gusset", items: [
        "Open the zip halfway, arrange main to main and lining to lining, and sew the remaining side seams. Leave a 10 cm (4 in) gap in the lining.",
        "Pinch the base corners into triangles and sew across at the gusset depth.",
        "Turn through the gap, close it and push the lining in."
      ]}
    ],
    sewNote: "Sew the elastic slack, not taut. About 5 mm of slack per compartment is what lets both a thin cable and a chunky charger fit under it. Stitched tight, the loops are decorative.",
    tips: [
      "<strong>Mesh pockets</strong>: you can see what is in them without opening anything.",
      "<strong>The zip must go round three sides</strong>: with a zip along the top only, this is just a pouch. The book opening is the entire point.",
      "<strong>Keep it slim</strong>: a 5 cm gusset is plenty. Deeper and it stops fitting inside a bag."
    ],
    related: ["pencase", "cosmepouch", "baginbag", "laptopcase"]
  },

  ehonbag: {
    title: "Book bag (lesson bag)",
    tab: "bag",
    toolName: "Book bag (lesson bag)",
    sizeStep: "Enter the finished width and height, and the handle length and cut width. Presets cover the usual nursery size (40 × 30), small and large.",
    desc: "How to sew a flat book bag with no gusset. One piece folded at the base plus two handles.",
    keywords: "book bag,lesson bag,library bag,school,how to sew,sewing pattern,quilted,handmade",
    lead: "The flat tote that nurseries and schools ask for, usually with an exact size specified. Shop-bought ones rarely match, which is why so many people make one. The body is a single piece and you sew two side seams — it is a genuine first project.",
    matNote: "nursery standard (40 × 30)",
    materials: [
      "Main fabric (quilted cotton, oxford or canvas) — about 110 cm wide × 70 cm (43 × 28 in)",
      "Lining fabric (sheeting or light cotton) — the same amount",
      "Webbing for the handles (2.5–3 cm / 1 in wide) — the length you chose, × 2",
      "Optional: an appliqué or name label"
    ],
    cut: [
      "<strong>Check the specified size</strong><br>Schools give it as height × width. Enter those numbers as they are — they are finished dimensions, not cutting dimensions.",
      "<strong>Trace the pattern</strong><br>The body is a rectangle folded at the base, so mark it straight onto the fabric.",
      "<strong>Cut</strong><br>Cut the body in main and lining, plus two handles.",
      "<strong>Finish the edges</strong><br>Quilted fabric frays fast — zigzag the edges as soon as you cut, or sew straight away."
    ],
    sew: [
      { h: "4-1. Position the handles", items: [
        "Lay the main body flat and place the handle ends at the marked points on the opening edge, front and back.",
        "Make sure the loops face outward, not inward — get this wrong and they end up inside the bag after turning.",
        "Baste them 1 cm from the edge.",
        "Do this while the fabric is still flat."
      ]},
      { h: "4-2. Sew the sides", items: [
        "Fold the main body at the base, right sides together, and sew both sides.",
        "Do the same with the lining, leaving a 12 cm (5 in) gap in one side.",
        "Press the seam allowances open."
      ]},
      { h: "4-3. Join the layers", items: [
        "Turn the main bag right side out and slip it inside the lining, right sides together.",
        "Match the side seams to each other and pin, then sew all the way around the opening.",
        "Backstitch two or three times where the handles are caught."
      ]},
      { h: "4-4. Turn and finish", items: [
        "Turn through the gap in the lining and close it by machine.",
        "Push the lining inside, shape the opening and press.",
        "Topstitch 5 mm from the opening edge so the lining cannot roll out."
      ]}
    ],
    sewNote: "The size a school gives is the finished size, and this pattern takes finished sizes too — so enter their numbers unchanged. Adding seam allowance yourself makes the bag a size too big for the locker, which is the most common mistake here.",
    tips: [
      "<strong>Quilted fabric</strong>: enough body to stop picture books bending, and it survives daily use.",
      "<strong>Webbing handles</strong>: stronger and quicker than self-fabric, and they look right.",
      "<strong>Make the set</strong>: a shoe bag, a gym bag and a cup bag in the same fabric covers the whole nursery list."
    ],
    related: ["tote", "shoesbag", "gymbag", "kincgusset"]
  },

  /* ===================== pets ===================== */

  petbed: {
    title: "Pet bed",
    tab: "pet",
    toolName: "Pet bed",
    sizeStep: "Enter the inner diameter, bolster height and bolster thickness. Presets cover cat/small dog, medium and large.",
    desc: "How to sew a round pet bed with a stuffed bolster around the edge. A base circle plus a long padded rim.",
    keywords: "pet bed,dog bed,cat bed,how to sew,sewing pattern,fleece,handmade",
    lead: "A round bed with a stuffed rim to rest a head on. A base circle and one long strip that becomes the bolster. Fleece or boa fabric for winter; cotton for summer. Make it washable — that matters more than anything else here.",
    matNote: "cat / small dog",
    materials: [
      "Main fabric (fleece, boa or quilted cotton) — about 110 cm wide × 100 cm (43 × 39 in)",
      "Toy stuffing — 400–800 g (14–28 oz) depending on size",
      "Optional: non-slip fabric for the base"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the base (a circle) and the bolster (a long strip). Trace the circle accurately.",
      "<strong>Cut</strong><br>Cut two base circles and two bolster strips (join them if your fabric is not long enough).",
      "<strong>Finish the edges</strong><br>Fleece does not fray. Zigzag anything that does."
    ],
    sew: [
      { h: "4-1. Make the bolster", items: [
        "Sew the bolster strips together at their short ends to make one long loop.",
        "Fold it in half lengthwise, right sides together, and sew the long edge, leaving a gap for stuffing.",
        "Turn it right side out."
      ]},
      { h: "4-2. Make the base", items: [
        "Sew the two base circles right sides together, leaving a gap. Turn and close the gap.",
        "For extra comfort, quilt a layer of batting between them."
      ]},
      { h: "4-3. Attach the bolster", items: [
        "Pin the raw lower edge of the bolster around the edge of the base, matching at four points first.",
        "Sew all the way around."
      ]},
      { h: "4-4. Stuff and close", items: [
        "Push stuffing into the bolster a little at a time, working around the ring.",
        "Fill it firmly enough to hold its shape — an under-stuffed bolster collapses and the bed becomes a mat.",
        "Close the stuffing gap with ladder stitch."
      ]}
    ],
    sewNote: "Stuff the bolster in small handfuls, working right around the ring rather than filling one section at a time. Fill one part fully and the stuffing packs solid there while the far side stays empty.",
    tips: [
      "<strong>Make it washable</strong>: pet beds need washing often. Washable fabric and washable stuffing, and a separate cover if you can manage it.",
      "<strong>Non-slip base</strong>: stops the bed skating across a wooden floor when the dog gets in.",
      "<strong>Size it generously</strong>: measure the animal curled up and add a good margin — they spread out more than you expect."
    ],
    related: ["petmat", "petcarrier", "cushioncover", "chairpad"]
  },

  petcape: {
    title: "Pet raincoat",
    tab: "pet",
    toolName: "Pet raincoat",
    sizeStep: "Enter back length, chest, neck, ease, strap length and cut width. Presets cover small, medium and large dogs.",
    desc: "How to sew a cape-style raincoat for a dog. No legs to thread, so it goes on quickly even on a reluctant dog.",
    keywords: "dog raincoat,pet raincoat,dog cape,how to sew,sewing pattern,waterproof,handmade",
    lead: "A cape that covers the back, fastening with straps at the neck and belly. Because there are no legs to thread, even a dog that hates being dressed will tolerate it. Water-repellent or laminated fabric makes wet walks far less of an ordeal.",
    matNote: "medium dog",
    materials: [
      "Main fabric (water-repellent fabric, laminate or nylon) — about 110 cm wide × 80 cm (43 × 31 in)",
      "Lining fabric (mesh or light cotton), if lining",
      "Hook-and-loop — 2.5 cm (1 in) wide × 30 cm (12 in)",
      "Optional: reflective tape for night walks"
    ],
    cut: [
      "<strong>Measure your dog</strong><br>Measure the back from the base of the neck to the base of the tail, the chest at its widest, and the neck where the collar sits. Measure standing.",
      "<strong>Trace the pattern</strong><br>Trace the cape (center back on the fold) and the straps.",
      "<strong>Cut</strong><br>Cut one cape and two straps. Use clips rather than pins on laminate."
    ],
    sew: [
      { h: "4-1. Make the straps", items: [
        "Fold each strap in quarters lengthwise, press and topstitch both edges.",
        "Sew hook to one end and loop to the underside of the other, making the loop side long so the length adjusts.",
        "Make two — one for the neck and one for the belly."
      ]},
      { h: "4-2. Finish the edges", items: [
        "For a single layer, turn the edges under twice and stitch. Ease the curves in as you fold, or bind them with bias tape.",
        "If lining it, sew main and lining right sides together, leave a gap, turn and topstitch."
      ]},
      { h: "4-3. Attach the straps", items: [
        "Stitch the neck strap at the sides near the neck, positioned to fasten under the throat.",
        "Stitch the belly strap at the sides around the middle.",
        "Stitch each one as a rectangle with a cross — a dog pulls at these constantly.",
        "Fit the cape to the dog and check the positions before sewing them down."
      ]},
      { h: "4-4. Reflective tape (optional)", items: [
        "Stitch reflective tape along the back or the hem for visibility in the dark."
      ]}
    ],
    sewNote: "Laminated and coated fabric keep every needle hole. There is no unpicking, so fit the cape to the dog and mark the strap positions before you sew. Clips, not pins.",
    tips: [
      "<strong>Do not reduce the ease</strong>: it goes on over a coat of fur, so the preset ease is not generous — it is necessary.",
      "<strong>Keep the hem short</strong>: too long and it tangles in the back legs. To the base of the tail is enough.",
      "<strong>Skip the hood</strong>: dogs dislike having their ears covered. Covering the neck is as far as most will accept."
    ],
    related: ["dog", "dogsleeved", "petvest", "petbandana"]
  },

  petcollar: {
    title: "Collar cover",
    tab: "pet",
    toolName: "Collar cover",
    sizeStep: "Enter the collar length, collar width and the threading ease. Presets cover cat, small, medium and large dogs.",
    desc: "How to sew a fabric cover that slides over an existing collar. A tube, turned and threaded on.",
    keywords: "collar cover,dog collar,cat collar,how to sew,sewing pattern,scraps,handmade",
    lead: "A tube of fabric that slides onto the collar the animal already wears, so you can change the look without buying a new collar. Make a few in different prints and walks become a bit more fun. It uses almost no fabric — this is a scrap project.",
    matNote: "one cover",
    materials: [
      "Main fabric (printed cotton or linen) — a scrap about 50 × 15 cm (20 × 6 in)",
      "Optional: fray-stop liquid"
    ],
    cut: [
      "<strong>Measure the collar</strong><br>Measure the full length including the buckle, and the width.",
      "<strong>Trace the pattern</strong><br>It is a long rectangle — mark it straight onto the fabric.",
      "<strong>Cut</strong><br>Cut one piece."
    ],
    sew: [
      { h: "4-1. Sew into a tube", items: [
        "Fold lengthwise, right sides together, and sew the long edge to make a narrow tube, leaving both ends open.",
        "Use a 5–7 mm seam allowance. Anything wider bunches inside and the collar will not go through.",
        "Trim the allowance to 5 mm."
      ]},
      { h: "4-2. Turn it right side out", items: [
        "Use a loop turner, or pin a safety pin to one end and push it back through the tube.",
        "This is the only fiddly step. Work slowly.",
        "Roll the seam to one edge and press flat."
      ]},
      { h: "4-3. Finish the ends", items: [
        "Fold about 1 cm of each end inside and press.",
        "Topstitch 3 mm from each end to close it.",
        "A dab of fray-stop on the raw edges before folding is worth the extra minute."
      ]},
      { h: "4-4. Thread the collar", items: [
        "Slide the collar through the tube.",
        "If the buckle will not pass, leave one end open and close it by hand afterwards, or fit hook-and-loop there instead."
      ]}
    ],
    sewNote: "Do not reduce the threading ease. Cut to the exact collar width, the seam allowances take up the space and the collar simply will not go through. The preset already allows for the buckle.",
    tips: [
      "<strong>Change with the season</strong>: florals, tartans, festive prints. Each one costs almost nothing.",
      "<strong>Works on a harness</strong>: the same idea at other widths covers a harness strap.",
      "<strong>Make several</strong>: the area around a collar gets greasy, so having spares keeps it clean."
    ],
    related: ["petbandana", "petsnood", "mannerbelt", "bowtie"]
  },

  pettoy: {
    title: "Kicker toy (for cats)",
    tab: "pet",
    toolName: "Kicker toy (for cats)",
    sizeStep: "Enter the total length, thickness and end radius. Presets cover small, standard and large.",
    desc: "How to sew a kicker toy for a cat. Two pieces, turned and stuffed — with catnip inside if you want it used.",
    keywords: "cat toy,kicker toy,catnip toy,how to sew,sewing pattern,handmade",
    lead: "The long toy a cat grabs with its front paws and kicks with its back ones. Two pieces sewn right sides together, turned and stuffed. Add catnip and the difference in interest is dramatic. A cat's back legs are stronger than you think, so build it properly.",
    matNote: "one toy",
    materials: [
      "Main fabric (denim, canvas or heavy cotton — something tough) — about 40 × 30 cm (16 × 12 in)",
      "Toy stuffing — about 100 g (3½ oz)",
      "Optional: catnip (powdered), a bell, or crinkle material"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body including the rounded ends.",
      "<strong>Cut</strong><br>Cut two pieces. Different fabrics on each side make it easier to see in play.",
      "<strong>Finish the edges</strong><br>Not needed — everything is enclosed."
    ],
    sew: [
      { h: "4-1. Sew the two pieces", items: [
        "Place them right sides together and sew around, leaving an 8 cm (3 in) gap.",
        "Set the stitch length shorter than usual, about 2 mm, so a cat cannot burst the seam.",
        "Sewing a second line just inside the first is worth the extra minute.",
        "Clip the curved ends every 5 mm."
      ]},
      { h: "4-2. Turn", items: [
        "Turn through the gap. It is long and narrow, so work a chopstick in and ease it through gradually.",
        "Push the ends out from inside with the handle of a point turner."
      ]},
      { h: "4-3. Stuff", items: [
        "Add stuffing in small pieces, starting at the ends and pushing it down with a chopstick.",
        "For catnip, wrap it in a small fabric pouch or a tea bag and add it once the toy is half full — loose catnip migrates to one end.",
        "Stuff it so it gives slightly when squeezed. Packed solid, a cat cannot grip it."
      ]},
      { h: "4-4. Close the gap", items: [
        "Fold the allowance in and close with ladder stitch.",
        "Use doubled thread with small stitches and go around twice. This is the first seam that fails."
      ]}
    ],
    sewNote: "A cat's back-leg kick is much stronger than it looks. Thin fabric or a long stitch length and the toy splits open within days. Denim or canvas, a 2 mm stitch length, and ideally a second line of stitching.",
    tips: [
      "<strong>Catnip changes everything</strong>: powdered catnip in a tea bag inside the toy transforms how much it gets used.",
      "<strong>Add a crinkle</strong>: a scrap of laminate mixed into the stuffing makes the crackle cats respond to.",
      "<strong>Length matters</strong>: about the length of the cat's own body is what it can hold and kick most easily."
    ],
    related: ["babytoy", "teddy", "petmat", "petbed"]
  },

  petmat: {
    title: "Pet mat",
    tab: "pet",
    toolName: "Pet mat",
    sizeStep: "Enter the width, depth and corner radius. Presets cover cat/small dog, medium and large.",
    desc: "How to sew a thin pet mat with batting inside and a grid of quilting so the filling cannot shift.",
    keywords: "pet mat,crate mat,dog mat,how to sew,sewing pattern,batting,handmade",
    lead: "A thin mat for a crate or a napping spot. Batting between two layers, with a grid of stitching so the filling stays put. Being thin, it washes and dries easily — which is why two of these beat one thick bed.",
    matNote: "medium dog",
    materials: [
      "Main fabric (cotton, oxford or boa) — about 110 cm wide × 80 cm (43 × 31 in)",
      "Backing fabric (non-slip fabric works well) — the same amount",
      "Medium batting — the same amount",
      "Optional: bias tape if you bind the edges instead"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>With the corner radius at zero it is a rectangle, so mark it straight onto the fabric.",
      "<strong>Cut</strong><br>Cut one main, one backing and one batting, cutting the batting 1 cm smaller all round.",
      "<strong>Finish the edges</strong><br>Not needed — everything is enclosed."
    ],
    sew: [
      { h: "4-1. Layer the three pieces", items: [
        "Stack backing right side up, main fabric right side down, batting on top.",
        "Clip all four sides. It is a large piece, so use plenty."
      ]},
      { h: "4-2. Sew and turn", items: [
        "Sew all the way around, leaving a 20 cm (8 in) gap.",
        "Clip the corner curves and trim the corners.",
        "Turn through the gap. It is bulky with the batting in, so ease it through gradually."
      ]},
      { h: "4-3. Topstitch", items: [
        "Fold the gap allowance in and press.",
        "Topstitch 1 cm (⅜ in) from the edge all the way around, closing the gap."
      ]},
      { h: "4-4. Quilt a grid", items: [
        "Mark a grid at 10–15 cm (4–6 in) intervals.",
        "Stitch along the lines, always working from the center outward so the batting cannot bunch ahead of the needle."
      ]}
    ],
    sewNote: "Do not skip the grid. Batting caught only at the edges migrates to one side in the first wash and never comes back. And always quilt from the center outward — starting at an edge leaves you with a ripple at the far end.",
    tips: [
      "<strong>Non-slip backing</strong>: sold in craft shops. It stops the mat sliding on a wooden floor.",
      "<strong>Make two</strong>: pet things get dirty. One in use, one in the wash.",
      "<strong>Bind instead</strong>: layer the three wrong sides together and bind the edge, and you skip the turning entirely — much easier at large sizes."
    ],
    related: ["petbed", "babyblanket", "chairpad", "cushioncover"]
  },

  petpouch: {
    title: "Dog walking pouch",
    tab: "pet",
    toolName: "Dog walking pouch",
    sizeStep: "Enter the finished width, height, gusset, flap height and belt loop width. Presets cover small, standard and large.",
    desc: "How to sew a walking pouch for treats, waste bags and keys. It threads onto a belt or a bag strap.",
    keywords: "dog walking pouch,treat pouch,belt pouch,how to sew,sewing pattern,handmade",
    lead: "A pouch for treats, waste bags, keys and a phone, threaded onto a belt or a bag strap. Hands stay free for the lead, and a treat comes out in one movement. Use something you can throw in the wash.",
    matNote: "standard size",
    materials: [
      "Main fabric (canvas, oxford or water-repellent fabric) — about 60 × 40 cm (24 × 16 in)",
      "Lining fabric — the same amount",
      "Fusible interfacing — for the main fabric",
      "Snap or magnetic fastener — 1 set",
      "Optional: an eyelet for dispensing waste bags"
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the body (base on the fold), the flap and the belt loop.",
      "<strong>Cut</strong><br>Cut the body in main and lining, the flap in main and lining, and one belt loop.",
      "<strong>Apply interfacing</strong><br>Fuse interfacing to the main fabric — loaded with treats, an unstructured pouch collapses."
    ],
    sew: [
      { h: "4-1. Make the flap and belt loop", items: [
        "Sew the flap main and lining right sides together, leaving the attachment edge open. Turn, press and topstitch.",
        "Fold the belt loop in quarters lengthwise, press and topstitch both edges."
      ]},
      { h: "4-2. Sew the sides and gusset", items: [
        "Fold the body at the base, right sides together, and sew both sides.",
        "Pinch each base corner into a triangle and sew across at the gusset depth. Check both sides match.",
        "Trim the triangles to 1 cm."
      ]},
      { h: "4-3. Attach the flap and belt loop", items: [
        "Turn the opening edge under twice and stitch.",
        "Stitch the flap to the back of the opening with two rows, or a rectangle with a cross.",
        "Lay the belt loop vertically on the back and stitch across it at the top and bottom, leaving room for a belt to pass through.",
        "Stitch two lines at each end of the loop — this is what carries the weight while you walk."
      ]},
      { h: "4-4. Add the fastening", items: [
        "Load the pouch, close the flap and mark where it lands.",
        "A magnetic fastener opens one-handed, which matters when the other hand is holding a lead."
      ]}
    ],
    sewNote: "Stitch the belt loop with two lines of stitching at each end. One line will fail — the pouch swings back and forth with every step, and that force never stops while you are walking.",
    tips: [
      "<strong>Magnetic fastener</strong>: a snap needs two hands. On this pouch that is the difference between usable and not.",
      "<strong>Eyelet for waste bags</strong>: set an eyelet in the side or base and feed a roll through it, so bags pull out one at a time.",
      "<strong>Washable fabric</strong>: it will get treat crumbs and worse. Choose something you can put in a machine."
    ],
    related: ["mannerbelt", "sacoche", "waistbag", "pouchgusset"]
  },

  petsling: {
    title: "Pet sling",
    tab: "pet",
    toolName: "Pet sling",
    sizeStep: "Enter the body length, pouch depth, gusset, shoulder strap length and cut width. Presets cover cat/toy dog, small dog and medium dog.",
    desc: "How to sew a crossbody sling for carrying a small dog or cat, with a safety lead inside.",
    keywords: "pet sling,dog carrier,cat sling,how to sew,sewing pattern,vet trips,handmade",
    lead: "A crossbody sling for carrying a small dog or cat — for vet trips, or for the point on a walk where they refuse to go further. It leaves both hands free on stairs and trains. The animal's whole weight goes through these seams, so build it accordingly.",
    matNote: "small dog",
    materials: [
      "Main fabric (8–11 oz canvas or denim — something strong) — about 110 cm wide × 120 cm (43 × 47 in)",
      "Lining fabric (mesh or light cotton) — the same amount",
      "Wide webbing or self-fabric for the shoulder strap — the length you chose",
      "A slider and swivel hook — 1–2 each",
      "Heavy fusible interfacing — for the body"
    ],
    cut: [
      "<strong>Measure your animal</strong><br>Measure the body length curled up, and the height. A sling holds them curled, so it does not need standing measurements.",
      "<strong>Trace the pattern</strong><br>Trace the body (base on the fold), the shoulder strap and the safety lead.",
      "<strong>Cut</strong><br>Cut the body in main and lining, one strap and one lead, and fuse heavy interfacing to the main body."
    ],
    sew: [
      { h: "4-1. Make the strap and lead", items: [
        "Fold the shoulder strap in quarters lengthwise, press and topstitch. Make it wide — a narrow strap cuts into the shoulder.",
        "Thread the slider on so you can adjust the length with the animal already in it.",
        "Make the safety lead the same way and fit a swivel hook to one end."
      ]},
      { h: "4-2. Sew the sides and gusset", items: [
        "Fold the body at the base, right sides together, and sew both sides.",
        "Sew every one of these seams twice — a second line 1 mm inside the first. The animal's weight hangs on them.",
        "Pinch each base corner into a triangle and sew across at the gusset depth, twice again. Trim to 1 cm.",
        "Sew the lining the same way, leaving a 12 cm (5 in) gap."
      ]},
      { h: "4-3. Attach the strap and lead", items: [
        "Turn the main bag out and slip it inside the lining, right sides together.",
        "Catch the shoulder strap ends at the sides and the safety lead at the inner center as you sew around the opening.",
        "Backstitch three times over the strap and lead anchors."
      ]},
      { h: "4-4. Finish and test", items: [
        "Turn through the gap, close it, push the lining in and topstitch around the opening.",
        "Before using it, load it with something of the same weight — a bottle of water works — and hang it for a few minutes to check every seam.",
        "Always clip the safety lead to a harness, never to a collar."
      ]}
    ],
    sewNote: "Sew the side and base seams twice. The entire weight of the animal passes through them, and a seam that fails is a fall. Load-test it with an equivalent weight before you put an animal in it.",
    tips: [
      "<strong>The lead is not optional</strong>: cats and dogs both jump when startled, faster than you can react.",
      "<strong>Clip to a harness</strong>: a lead clipped to a collar injures the neck if they jump.",
      "<strong>Wide strap</strong>: 10 cm (4 in) or more spreads the weight so your shoulder survives a long walk."
    ],
    related: ["petcarrier", "petpouch", "petcape", "petbed"]
  },

  petcarrier: {
    title: "Pet carrier bag",
    tab: "pet",
    toolName: "Pet carrier bag",
    sizeStep: "Enter the finished width, height, gusset and the handle length and cut width. Presets cover cat/small dog, standard and large.",
    desc: "How to sew a boxy pet carrier with a mesh top. Two body panels, a continuous gusset, a mesh top and handles.",
    keywords: "pet carrier,cat carrier,dog carrier,how to sew,sewing pattern,mesh,handmade",
    lead: "A boxy carrier for a small dog or cat. The mesh top lets you see in and keeps the air moving, and a fabric carrier is often better tolerated than a hard plastic one. A stiff board in the base keeps it steady when you lift it.",
    matNote: "standard size",
    materials: [
      "Main fabric (8–11 oz canvas or quilted cotton) — about 110 cm wide × 160 cm (43 × 63 in)",
      "Lining fabric (water-repellent or washable) — the same amount",
      "Mesh fabric — about 40 × 30 cm (16 × 12 in)",
      "Heavy fusible interfacing or batting — for the body",
      "Webbing for the handles — the length you chose, × 2",
      "Zip for the top opening — 1",
      "Plastic board for the base"
    ],
    cut: [
      "<strong>Measure your animal</strong><br>Measure the body length lying down and the height sitting up. They will not stand in a carrier, so lying measurements are what matter.",
      "<strong>Trace the pattern</strong><br>Trace the body panels, the gusset, the top and the handles.",
      "<strong>Cut</strong><br>Cut everything in main and lining, plus two handles, and fuse heavy interfacing or batting to the main body and gusset."
    ],
    sew: [
      { h: "4-1. Make the mesh top", items: [
        "Cut the window out of the top panel.",
        "Lay the mesh underneath and stitch 3 mm outside the window edge.",
        "Bind the window edge with bias tape, or enclose it between the main and lining layers. A raw mesh edge catches claws.",
        "Set the zip along one side of the top so it opens."
      ]},
      { h: "4-2. Attach the handles", items: [
        "Stitch a handle to each body panel, running the stitching a third of the way down the panel and finishing with a rectangle and a cross.",
        "The animal's weight is on these. Reinforce them thoroughly.",
        "Do it while the panels are flat."
      ]},
      { h: "4-3. Attach the gusset", items: [
        "Match the center of the gusset to the base center of one body panel and pin outward from there.",
        "Sew all the way around, clipping the gusset at the base corners.",
        "Attach the second panel the same way, and assemble the lining likewise leaving a 15 cm (6 in) gap.",
        "Working from the center outward is what keeps the two pieces in step."
      ]},
      { h: "4-4. Attach the top and finish", items: [
        "Turn the main carrier out and slip it inside the lining, right sides together.",
        "Sew the top panel into the upper edge on three sides, leaving the zip side free to open.",
        "Turn through the gap, close it, push the lining in and topstitch around the opening.",
        "Cut a plastic board to the base size and drop it in."
      ]}
    ],
    sewNote: "The mesh edge must be bound. A raw mesh edge is exactly what a claw catches on, and a claw caught in mesh is a genuine injury. Bind it or enclose it between two layers — this one is not optional.",
    tips: [
      "<strong>Base board</strong>: plastic board in the base stops the carrier sagging, and an animal on a firm floor settles much faster.",
      "<strong>Washable lining</strong>: accidents happen. Water-repellent lining, or a separate removable mat.",
      "<strong>Add a shoulder strap</strong>: D-rings at each end let you add one, which is far easier over any distance."
    ],
    related: ["petsling", "petbed", "petmat", "bostonbag"]
  },
  curtain: {
    title: "Curtain", tab: "home", toolName: "Curtain",
    sizeStep: "Enter the rail width, curtain length, fullness ratio and the top, hem and side turn-backs. Presets cover small, sill-height, floor-length and wide windows.",
    desc: "How to sew curtains that fit your window exactly. Measure the rail, add fullness, hem three sides and stitch curtain tape along the top. Works for blackout or sheer fabric.",
    keywords: "curtain,how to sew curtains,curtain sewing pattern,window curtain,curtain tape,DIY curtains",
    lead: "Curtains sized from your own window, with fullness and turn-backs calculated for you. The sewing is only ever \"hem three sides, then stitch curtain tape along the top\". When a ready-made size does not fit your window, making your own gets you to the centimeter. Blackout and sheer fabric are made exactly the same way.",
    matNote: "a pair for a sill-height window",
    materials: [
      "Main fabric (curtain fabric, blackout fabric or linen) — 3–8 m depending on the window",
      "Curtain tape (heading tape) — rail width × fullness ratio × 2 panels",
      "Curtain hooks — as many as the tape needs",
      "Optional: weight tape for the hem",
    ],
    cut: [
      "<strong>Measure the window carefully</strong><br>Measure the rail width end to end, and the drop from the hook position to the floor (or to the bottom of the window frame). Measure the drop in three places — left, center and right — and use the shortest figure.",
      "<strong>Check the cut sizes</strong><br>The guide sheet shows cut sizes that already include fullness and turn-backs. Curtains are large, so rather than printing the pattern, mark these measurements straight onto the fabric and cut.",
      "<strong>Cut the panels</strong><br>Cut two panels, one for each side. With a print, shift the cutting position so the motifs line up between the two panels.",
      "<strong>If the fabric is not wide enough</strong><br>Join two widths. Place the seam towards the outer edge rather than the middle of the window and it will hardly show.",
    ],
    sew: [
      { h: "4-1. Hem the sides", items: [
        "Double-fold both side edges by the given turn-back and press. The panels are long, so press as you go rather than all at once.",
        "Topstitch close to the fold, straight from top to bottom.",
        "Because the fabric is heavy, set a table beside the machine to support it. Otherwise the weight drags the fabric and the stitching wanders.",
      ]},
      { h: "4-2. Hem the bottom", items: [
        "Double-fold the hem by the given turn-back. A curtain hem is normally deep — 5 to 10 cm. The weight makes the fabric hang straight and drape well.",
        "Topstitch close to the fold.",
        "If you are using weight tape, tuck it into the fold before stitching.",
      ]},
      { h: "4-3. Attach the curtain tape", items: [
        "Fold the top edge to the inside by the given turn-back.",
        "Lay the curtain tape over it and stitch along both long edges of the tape.",
        "Curtain tape has evenly spaced pockets for the hooks. Check that the tape is the right way up (pocket openings facing down) before you stitch.",
      ]},
      { h: "4-4. Hook it up", items: [
        "Push the hooks into the tape pockets at even intervals.",
        "Hang the curtain on the rail and check the length. If it is slightly long, moving the hooks down one row of pockets adjusts it by a few centimeters.",
        "Make the second panel the same way.",
      ]},
    ],
    sewNote: "Do not skip \"measure the drop in three places\". Neither window frames nor floors are truly level. If you do not work to the shortest measurement, one side will drag on the floor. Conversely, you can fine-tune by purpose: leave sheers 1 cm clear of the floor, let blackout curtains puddle 1 cm.",
    tips: [
      "<strong>Fullness changes the look</strong>: 1.5× hangs almost flat; 2× gives a generous drape. The thinner the fabric, the more fullness it needs to look expensive.",
      "<strong>Do not print the pattern</strong>: a curtain is a rectangle. Ruling the lines straight onto the fabric from the guide sheet is faster and more accurate than taping dozens of A4 sheets together.",
      "<strong>Make the hem deep</strong>: a turn-back of 5 cm or more lets the weight pull the fabric into an even drape. Skimping here is what makes a curtain look cheap.",
    ],
    related: ["cafecurtain", "noren", "boxcover"],
  },

  chairpad: {
    title: "Chair pad", tab: "home", toolName: "Chair pad",
    sizeStep: "Enter the seat width, depth, corner radius, tie length and tie cut width. Presets cover small, standard and large seats.",
    desc: "How to sew a tie-on chair pad with rounded corners. Batting or foam between outer and lining, plus two ties that fasten to the chair back so it never slips.",
    keywords: "chair pad,seat cushion,chair cushion,how to sew,sewing pattern,tie-on cushion",
    lead: "A rounded-corner pad for a chair seat. All you do is sandwich quilt batting or memory foam between an outer and a lining. Two ties at the back fasten it to the chair, so it stays put however much you shift about. Make it from the same fabric as the chair back cover and the whole dining set pulls together.",
    matNote: "one pad, standard size",
    materials: [
      "Outer fabric (cotton, linen or canvas) — about 50 cm × 100 cm",
      "Lining fabric — the same amount",
      "Thick quilt batting or memory foam sheet — the size of the seat",
      "Matching fabric for the ties — about 60 cm × 10 cm",
    ],
    cut: [
      "<strong>Measure the seat</strong><br>Measure the width and depth of the chair seat. If the seat is a trapezoid, measure at the widest point.",
      "<strong>Trace the pattern</strong><br>Trace the pad and the ties. Do not forget the notches that mark where the ties go at the back.",
      "<strong>Cut the pieces</strong><br>Cut 1 pad in the outer fabric, 1 in the lining, 1 in batting and 2 ties. Cut the batting 1 cm smaller all round so the seam allowance does not get bulky.",
    ],
    sew: [
      { h: "4-1. Make the ties", items: [
        "Fold each tie in four (both edges to the center, then in half) and press.",
        "Topstitch 3 mm from both long edges. Make both ties the same way.",
        "One end will be caught in the seam, so it needs no finishing. Turn the other end in by 5 mm and stitch it for a neat finish.",
      ]},
      { h: "4-2. Sew with the ties caught in", items: [
        "Lay the outer fabric right side up and pin the raw end of each tie at the back notches, pointing inwards. Baste them in place.",
        "Lay the lining on top, right sides together, then the batting on top of that.",
        "Sew all the way round, leaving a 15 cm opening for turning. Backstitch over the ties to reinforce them.",
      ]},
      { h: "4-3. Turn and press", items: [
        "Clip the seam allowance around the rounded corners and turn right side out through the opening.",
        "The batting makes it bulky, so ease it out a little at a time, coaxing the corners with an awl.",
        "Fold the opening edges in and press. Use a pressing cloth and a light touch so you do not flatten the batting.",
      ]},
      { h: "4-4. Topstitch to finish", items: [
        "Topstitch all the way round, 1 cm in from the edge. This closes the opening at the same time.",
        "A grid or diamond of quilting through the middle stops the batting shifting in the wash. Sew from the center outwards.",
        "Put it on the chair, tie it to the chair back, and it is done.",
      ]},
    ],
    sewNote: "Decide where the ties go with the pad actually on the chair. The uprights of a chair back sit in different places on different chairs, so the notches on the pattern may not reach yours. Measure the gap between the uprights while you are measuring the seat and you will not have to guess.",
    tips: [
      "<strong>Memory foam is kinder</strong>: swap the batting for a memory foam sheet (sold at craft shops) and long sittings stop being tiring.",
      "<strong>Non-slip lining</strong>: use non-slip fabric for the lining and it will stay in place even without the ties.",
      "<strong>Make the set</strong>: a chair back cover in the same fabric transforms how the whole chair reads.",
    ],
    related: ["chaircover", "cushioncover", "zabuton"],
  },

  wallpocket: {
    title: "Wall pocket organizer", tab: "home", toolName: "Wall pocket organizer",
    sizeStep: "Enter the panel width and height, the pocket height, the number of rows and the hanging loop width. Presets cover small, standard and large.",
    desc: "How to sew a hanging wall pocket organizer. A backing panel with rows of pockets stitched into compartments, hung from a rod through loops at the top.",
    keywords: "wall pocket,hanging organizer,wall organizer,how to sew,sewing pattern,storage",
    lead: "A fabric organizer to hang on a wall or the back of a door. The construction is simple: pocket strips stitched onto a backing panel, then divided vertically into compartments. Remote controls, stationery, school letters, bathroom odds and ends — everything that has nowhere to live gets a home. Loops at the top take a rod.",
    matNote: "standard size",
    materials: [
      "Outer fabric (canvas, oxford cloth or heavy cotton) — about 110 cm wide × 100 cm",
      "Lining fabric — the same amount",
      "Fabric for the pockets — depending on the number of rows",
      "Heavyweight fusible interfacing — enough for the backing panel",
      "A tension rod or wooden dowel — slightly wider than the panel",
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace three pieces: the backing panel, the pocket strips and the hanging loops. Mark the position of each row of pockets on the panel as well.",
      "<strong>Cut the pieces</strong><br>Cut 1 panel in the outer fabric and 1 in the lining, one pocket strip per row, and 2 loops.",
      "<strong>Fuse the interfacing</strong><br>Fuse heavyweight interfacing to the wrong side of the outer panel. Be generous here — it is what stops the panel sagging under the weight of the contents.",
    ],
    sew: [
      { h: "4-1. Hem the top edge of each pocket strip", items: [
        "Double-fold the top edge of each pocket strip by 1 cm and 1 cm again, then stitch.",
        "Do this for every row before you go any further. Once a strip is attached to the panel you cannot reach this edge.",
      ]},
      { h: "4-2. Attach the pockets to the panel", items: [
        "Spread out the outer panel and lay the pocket strips on, starting with the bottom row and working up.",
        "Line up the bottom edge of each strip with its marked position and stitch it down.",
        "For roomier pockets, take a 1–2 cm tuck along the bottom edge before stitching. That gives the pocket depth for bulkier items.",
        "Baste the side edges too, inside the seam allowance.",
      ]},
      { h: "4-3. Divide into compartments", items: [
        "Stitch vertical lines through each row to divide it into compartments. Set the widths to suit what you want to store.",
        "Always backstitch at the start of each line (the top edge of the pocket). This is where it will tear.",
        "You can also leave a row undivided as one wide pocket, which is handier for large items.",
      ]},
      { h: "4-4. Finish the panel and add the loops", items: [
        "Fold each loop in four, topstitch, then fold it in half to make a loop.",
        "Lay the outer panel and lining right sides together, tucking the raw ends of the loops in at the top edge, pointing inwards.",
        "Sew all the way round leaving a 15 cm opening, turn right side out and press.",
        "Topstitch 5 mm from the edge all the way round. Slide a rod through the loops and hang it up.",
      ]},
    ],
    sewNote: "Attach the pockets from the bottom row upwards. If you start at the top, the finished upper pockets end up jammed under the presser foot while you sew the rows below. And never skip the backstitching at the top of each dividing line — that is exactly where a wall pocket tears with use.",
    tips: [
      "<strong>Vary the row heights</strong>: deeper at the bottom, shallower at the top, and you can see what is in each pocket.",
      "<strong>Tuck the pockets</strong>: a tuck along the bottom edge turns a flat pocket into a gusseted one that holds bulky things.",
      "<strong>Behind a door</strong>: hang it on the back of a door and you gain storage without changing how the room looks. Great in a child's room or a bathroom.",
    ],
    related: ["remotepocket", "laundrybag", "boxcover"],
  },

  laundrybag: {
    title: "Laundry bag", tab: "home", toolName: "Laundry bag",
    sizeStep: "Enter the finished width, height, gusset and the depth of the drawstring casing. Presets cover small, standard and generous.",
    desc: "How to sew a large drawstring laundry bag. One body piece folded at the base, a boxed gusset and cord threaded from both sides so the top closes firmly.",
    keywords: "laundry bag,drawstring bag,large drawstring bag,how to sew,sewing pattern,laundry hamper",
    lead: "A big drawstring bag that swallows a whole load of laundry. It looks softer in a room than a plastic basket, and folds away flat when you do not need it. A casing at the top with cord threaded in from both sides pulls the opening properly shut, so nobody sees what is inside. Use breathable cotton or linen.",
    matNote: "standard size",
    materials: [
      "Main fabric (linen, canvas or heavy cotton) — about 110 cm wide × 120 cm",
      "Cord (thick cotton rope, about 8 mm) — 2 lengths, as given on the guide sheet",
      "A bodkin (or a safety pin)",
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the bag body. It is cut in one piece with the base on the fold. It is large, so spread the fabric on the floor to work.",
      "<strong>Cut the piece</strong><br>Cut 1 body with the base on the fold. It is a rectangle, so the quickest route is to rule the measurements from the guide sheet straight onto the fabric rather than printing the pattern.",
      "<strong>Finish the edges</strong><br>Zigzag or overlock the side seam allowances. This is where the fabric rubs every time laundry goes in or out.",
    ],
    sew: [
      { h: "4-1. Sew the sides, leaving the casing gaps", items: [
        "Fold the body in half at the base, right sides together, and sew both sides.",
        "Leave the seam open from the top edge down to the casing depth. These gaps are where the cord goes in and out.",
        "Press the unsewn seam allowances open and topstitch a rectangle around each gap to hold them flat. Backstitch at the bottom of the gap, which takes all the strain.",
      ]},
      { h: "4-2. Box the base corners", items: [
        "Pinch each bottom corner into a triangle, matching the side seam exactly to the base fold.",
        "Rule a line at the gusset measurement and sew. Check both corners are the same width.",
        "Trim off the triangle leaving 2 cm and zigzag the raw edge. On a bag this size, leaving more rather than less makes it stronger.",
      ]},
      { h: "4-3. Make the drawstring casing", items: [
        "Fold the top edge over by 1 cm, then again by the casing depth, to make a double fold.",
        "Stitch close to the fold all the way round. Make sure the gaps you left in step 4-1 open into this channel.",
        "The casing carries the weight of the laundry, so backstitch firmly at the start and end.",
      ]},
      { h: "4-4. Thread the cord", items: [
        "Using the bodkin, feed one cord in through one gap, all the way round, and out of the same gap. Knot the ends together.",
        "Thread the second cord the same way, starting from the gap on the other side.",
        "With one cord from each side, pulling both ways closes the bag.",
      ]},
    ],
    sewNote: "A large bag drags on the machine under its own weight. Set a table or a chair in front of and to the left of the machine to support the fabric and your seams will stay straight. Sew it unsupported and the stitching drifts diagonally, which twists the finished bag.",
    tips: [
      "<strong>Add handles</strong>: two handles just below the opening make carrying it to the machine much easier.",
      "<strong>Breathability first</strong>: damp laundry goes in here, so avoid vinyl and laminated fabric. Cotton and linen are ideal.",
      "<strong>Hang it up</strong>: make the cords longer and hook the bag on the wall so it never sits on the floor.",
    ],
    related: ["wallpocket", "boxcover", "ecobag"],
  },

  chaircover: {
    title: "Chair back cover", tab: "home", toolName: "Chair back cover",
    sizeStep: "Enter the chair back width, the length you want it to cover, the thickness of the back and the top corner radius. Presets cover dining, small and large chairs.",
    desc: "How to sew a slip-on chair back cover. Two pieces joined together, with elastic or ties at the hem so it stays put. Protects the chair and changes the look of a room.",
    keywords: "chair back cover,chair cover,slipcover,how to sew,sewing pattern,dining chair",
    lead: "A cover that simply slips over a chair back. Joining the front and back is essentially the same as making a bag. It protects the chair from marks and wear, and changing the fabric changes the feel of the whole room. Match it with a chair pad and the dining set looks deliberate.",
    matNote: "one chair",
    materials: [
      "Main fabric (linen, canvas or heavy cotton) — about 110 cm wide × 70 cm",
      "Optional: elastic for the hem, or matching fabric for ties",
    ],
    cut: [
      "<strong>Measure the chair back</strong><br>Measure the width at the widest point, the length you want covered, and the thickness of the back. Forget the thickness and the cover will be too tight to go on.",
      "<strong>Trace the pattern</strong><br>Trace the cover (the same piece serves for front and back). Do not forget the rounded top corners.",
      "<strong>Cut the pieces</strong><br>Cut 2 from the same pattern, one front and one back.",
      "<strong>Finish the edges</strong><br>Zigzag or overlock the seam allowances.",
    ],
    sew: [
      { h: "4-1. Join the two pieces", items: [
        "Place the two pieces right sides together and sew the top edge and both sides. Leave the hem open.",
        "If the top corners are rounded, clip the seam allowance every 5 mm.",
        "Press the seam allowances open.",
      ]},
      { h: "4-2. Hem the bottom", items: [
        "Double-fold the hem by 1 cm and then 2 cm, and stitch.",
        "If you are adding elastic, leave a 3 cm gap for threading.",
      ]},
      { h: "4-3. Turn it and try it on", items: [
        "Turn right side out and press into shape.",
        "Slip it onto the chair and check that it is neither tight nor the wrong length.",
        "If it is tight, take less in the side seams; if it is loose, take more.",
      ]},
      { h: "4-4. Stop it slipping (optional)", items: [
        "Elastic threaded through the hem pulls the cover snug against the chair. Cut it to about 85% of the actual hem circumference.",
        "Alternatively, sew ties to the left and right of the hem and knot them behind the chair back. That version works on any chair shape.",
      ]},
    ],
    sewNote: "Do not forget to enter the thickness. A chair back is not a flat board — most are 3 to 5 cm thick. Work from width and length alone and the cover will not go on. Measure the thickness, or if you are unsure, allow an extra centimeter.",
    tips: [
      "<strong>Elastic does the work</strong>: threading elastic through the hem takes five minutes and makes the cover fit snugly instead of looking homemade.",
      "<strong>Make a spare</strong>: dining chairs get dirtier than you expect. A second cover in the same fabric means you can always have one in the wash.",
      "<strong>Match the pad</strong>: a chair pad in the same fabric unifies the whole chair.",
    ],
    related: ["chairpad", "boxcover", "cushioncover"],
  },

  boxcover: {
    title: "Storage box cover", tab: "home", toolName: "Storage box cover",
    sizeStep: "Enter the box width, depth, the height you want covered, and the ease. Presets cover small, standard and cube-shelf sizes.",
    desc: "How to sew a fabric cover for a storage box or shelf cube. One top piece plus four sides, with elastic in the hem. Every piece is a rectangle, so you can skip printing.",
    keywords: "storage box cover,box cover,shelf cover,fabric cover,how to sew,sewing pattern",
    lead: "A fabric cover for a storage cube or plastic box. One top piece and four sides sewn into a simple box shape. Hiding the contents alone makes a room read as tidy, and swapping the fabric is the cheapest redecoration there is. Every piece is a straight rectangle, so cutting directly without printing the pattern is the easy route.",
    matNote: "standard size",
    materials: [
      "Main fabric (linen, canvas or heavy cotton) — about 110 cm wide × 100 cm",
      "Optional: elastic for the hem",
      "Optional: fusible interfacing (if you want the top to stay crisp)",
    ],
    cut: [
      "<strong>Measure the box</strong><br>Measure the width, depth and the height you want covered. Without ease the cover will not go on — use the ease from the preset as it is.",
      "<strong>Check the cut sizes</strong><br>Everything is a rectangle, so rather than printing the pattern, rule the measurements from the guide sheet straight onto the fabric.",
      "<strong>Cut the pieces</strong><br>Cut 1 top, 2 sides (front and back) and 2 sides (left and right) — 5 pieces in all.",
      "<strong>Finish the edges</strong><br>Zigzag the seam allowances.",
    ],
    sew: [
      { h: "4-1. Join the sides into a ring", items: [
        "Sew the four sides together right sides together in the order front → right → back → left, forming a ring.",
        "The last seam is awkward because the fabric is now a loop. Slide it onto the free arm of the machine and go slowly.",
        "Press the seam allowances open.",
      ]},
      { h: "4-2. Attach the top", items: [
        "Place the top on the upper edge of the ring, right sides together.",
        "Pin the four corners first, then pin evenly between them. Getting the corners right is what decides how the cover looks.",
        "Sew all the way round. At each corner, stop with the needle down, lift the presser foot, pivot the fabric 90° and carry on.",
        "Trim the corner seam allowances diagonally.",
      ]},
      { h: "4-3. Hem the bottom", items: [
        "Double-fold the hem by 1 cm and then 2 cm, and stitch.",
        "If you are adding elastic, leave a 3 cm gap for threading.",
      ]},
      { h: "4-4. Fit it over the box", items: [
        "Thread the elastic if you are using it, overlap and stitch the ends, then close the gap.",
        "Turn right side out and fit the cover over the box, checking that the elastic catches under the base.",
      ]},
    ],
    sewNote: "The one thing that matters is matching the corners when you attach the top. Pin the four corners so the side seams land exactly on the four corners of the top, then fill in between. Get that wrong and the whole cover sits twisted on the box.",
    tips: [
      "<strong>Cut directly</strong>: with nothing but rectangles, a ruler is faster and more accurate than taping A4 sheets together.",
      "<strong>Interface the top</strong>: if the top sinks in the middle, fusible interfacing gives it body.",
      "<strong>Add a pull tab</strong>: a fabric loop on the front makes the box easy to pull off a shelf.",
    ],
    related: ["chaircover", "tissuebox", "wallpocket"],
  },

  slipper: {
    title: "Room slippers", tab: "home", toolName: "Room slippers",
    sizeStep: "Enter the foot length, foot width and the depth of the upper. Presets cover children, women and men.",
    desc: "How to sew warm room slippers. Two soles and two uppers with batting in between, and non-slip fabric underneath. A quick project and a good one for guest pairs.",
    keywords: "slippers,room slippers,house shoes,how to sew,sewing pattern,handmade slippers",
    lead: "Warm slippers that wrap the whole foot. Just two soles and two uppers; add quilt batting and they come out plush. Use non-slip fabric for the underside and they are safe on a wooden floor too — worth making a few pairs to keep for guests.",
    matNote: "women's size (24 cm foot)",
    materials: [
      "Outer fabric (quilted cotton, corduroy or felt) — about 50 × 50 cm",
      "Lining fabric — the same amount",
      "Non-slip fabric for the sole — about 30 × 30 cm",
      "Quilt batting — about 50 × 50 cm",
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Lay the pattern on the wrong side of the fabric and trace both the cutting line and the finished line. Flip the pattern over for one of each pair so they mirror each other.",
      "<strong>Cut the pieces</strong><br>Cut 2 soles (left and right) and 2 uppers, in both outer and lining. Using non-slip fabric for the sole lining is the safe choice. Cut the batting to the same shapes.",
      "<strong>Transfer the notches</strong><br>Mark the front and back notches on the soles and the center notch on the uppers.",
    ],
    sew: [
      { h: "4-1. Make the uppers", items: [
        "Place the outer and lining uppers right sides together and sew the curved top edge — the opening your foot goes through. A layer of batting in between makes it plumper.",
        "Clip the seam allowance, turn right side out and press.",
      ]},
      { h: "4-2. Attach the upper to the sole", items: [
        "Lay the outer sole right side up and place the upper on it, wrong sides together, matching the center notch of the upper to the toe notch of the sole.",
        "Ease the bottom edge of the upper around the sole and baste. Clipping the seam allowance of the upper helps it follow the curve.",
      ]},
      { h: "4-3. Close the sole", items: [
        "Lay the sole lining (the non-slip fabric) on top, right sides together, sandwiching the upper, and sew all the way round leaving an 8 cm opening.",
        "Clip the seam allowance on the curves, then turn right side out through the opening.",
        "Slipstitch the opening closed and press into shape. Make the other slipper the same way.",
      ]},
    ],
    sewNote: "When you ease the upper around the sole, clip its seam allowance and the fabric will follow the curve willingly. Force it round without clipping and you will get puckers.",
    tips: [
      "<strong>Stay on your feet</strong>: non-slip fabric on the sole, or a bought non-slip sheet, matters on a wooden floor.",
      "<strong>Keep warm</strong>: two layers of batting, or a fleece outer, and your feet stay warm all winter.",
      "<strong>For guests</strong>: a few pairs in a plain fabric are always useful when people visit.",
    ],
    related: ["neckpillow", "coaster", "chairpad"],
  },

  zabuton: {
    title: "Floor cushion cover", tab: "home", toolName: "Floor cushion cover",
    sizeStep: "Enter the cushion width, depth, thickness and the back overlap. Presets cover the standard Japanese meisen and hattan sizes plus a small cushion.",
    desc: "How to sew an envelope cover for a Japanese floor cushion (zabuton). No zipper — one front and two overlapping back pieces. Every piece is a rectangle.",
    keywords: "floor cushion cover,zabuton cover,envelope cover,no zipper,how to sew,sewing pattern",
    lead: "An envelope-style cover for a Japanese floor cushion. There is no zipper — the two back pieces simply overlap, so a beginner cannot really get it wrong. Three pieces in total: one front and two backs. Enter the size of the cushion you actually own. Everything is a rectangle, so cutting directly is the quick route.",
    matNote: "one meisen-size cover",
    materials: [
      "Main fabric (cotton, Japanese print or linen) — about 110 cm wide × 160 cm",
      "Optional: decorative thread for the corner tufts",
    ],
    cut: [
      "<strong>Measure the cushion</strong><br>Measure the width, depth and thickness. If you leave out the thickness, the corners will be pulled tight when the cushion goes in and the seams will split.",
      "<strong>Check the cut sizes</strong><br>Everything is a rectangle, so rule the measurements from the guide sheet straight onto the fabric instead of printing the pattern.",
      "<strong>Cut the pieces</strong><br>Cut 1 front and 2 backs. The backs are shorter than the front by the amount they overlap.",
      "<strong>Finish the edges</strong><br>Zigzag the seam allowances.",
    ],
    sew: [
      { h: "4-1. Hem the back opening edges", items: [
        "Double-fold the opening edge of each back piece (the edge that will overlap) by 1 cm and then 2 cm, and stitch.",
        "Doing this first is the rule. Once the pieces are joined you cannot reach these edges.",
      ]},
      { h: "4-2. Layer front and backs", items: [
        "Lay the front right side up.",
        "Lay the two back pieces on top, right sides together, overlapping each other in the middle by the overlap measurement.",
        "That overlap is the opening you push the cushion through. Too little and the filling shows every time someone sits down.",
      ]},
      { h: "4-3. Sew all four sides", items: [
        "Sew right round all four sides. Go slowly where the two back pieces overlap — that part is thick.",
        "Trim the four corner seam allowances diagonally.",
        "Backstitch at the start and end of the overlapped section.",
      ]},
      { h: "4-4. Turn and finish", items: [
        "Reach in through the back overlap and turn the cover right side out.",
        "Poke the corners out with an awl and press.",
        "Slide the cushion in, check it is not straining, and it is done.",
        "Decorative tufts at the four corners give it a traditional look.",
      ]},
    ],
    sewNote: "Always enter the thickness. A floor cushion is 5 to 7 cm thick. Work from width and depth alone and the corners will be dragged tight when you insert it — the seams will split after a handful of uses. The right size is the one with the thickness added.",
    tips: [
      "<strong>Envelope backs are easiest</strong>: no zipper to insert and easy to take off for washing. This is the standard way floor cushion covers are made.",
      "<strong>Be generous with the overlap</strong>: too little and the cushion shows. Do not reduce the preset figure.",
      "<strong>Standard sizes</strong>: meisen (55 × 59 cm) is the most common; hattan (59 × 63 cm) is the guest size. Measuring your own is always safest.",
    ],
    related: ["cushioncover", "chairpad", "pillowcase"],
  },

  cafecurtain: {
    title: "Cafe curtain", tab: "home", toolName: "Cafe curtain",
    sizeStep: "Enter the finished width, length, fullness ratio, rod pocket height and the hem and side turn-backs. Presets cover small windows, standard and sill-height windows.",
    desc: "How to sew a cafe curtain. One rectangle hemmed on three sides with a rod pocket at the top — no curtain tape and no hooks. A perfect first sewing project.",
    keywords: "cafe curtain,rod pocket curtain,short curtain,how to sew,sewing pattern,kitchen curtain",
    lead: "A short curtain for the lower half of a window, or to screen a shelf. You just fold the top edge over to make a rod pocket, so there is no curtain tape and no hooks. One rectangle, hemmed on three sides. If you have just bought a sewing machine, this is the project that makes you feel you can sew.",
    matNote: "standard size",
    materials: [
      "Main fabric (linen, lace or lightweight cotton) — about 110 cm wide × 60 cm",
      "A tension rod or slim dowel to fit the window",
    ],
    cut: [
      "<strong>Measure the window</strong><br>Measure the drop from where the rod will sit down to where you want the curtain to end, and the width you want to cover.",
      "<strong>Check the cut sizes</strong><br>The guide sheet shows cut sizes that already include fullness and turn-backs. It is a rectangle, so rule the lines straight onto the fabric instead of printing.",
      "<strong>Cut the piece</strong><br>Cut 1. Keep the grain straight and the hem will not ripple when it hangs.",
      "<strong>Finish the edges</strong><br>Not needed — every edge is double-folded.",
    ],
    sew: [
      { h: "4-1. Hem the sides", items: [
        "Double-fold both side edges by the given turn-back. Press the folds first and the stitching stays straight.",
        "Topstitch close to the fold, straight from top to bottom.",
        "Lace is sheer, so the seam allowances show from the front. Take extra care to keep the fold widths even.",
      ]},
      { h: "4-2. Hem the bottom", items: [
        "Double-fold the hem by the given turn-back.",
        "Topstitch close to the fold. A slightly deep hem, 3 to 5 cm, weights the curtain so it hangs well.",
      ]},
      { h: "4-3. Make the rod pocket", items: [
        "Fold the top edge over by 1 cm, then again by the rod pocket height.",
        "Topstitch close to the fold, straight from one side to the other. This channel is what the rod goes through.",
        "Allow 5 mm clearance above and below the diameter of your rod. Made to the exact size, the rod will not go in.",
      ]},
      { h: "4-4. Hang it up", items: [
        "Slide the tension rod through and fit it in the window.",
        "Arrange the gathers with your hands. Distributed evenly, it looks shop-bought.",
      ]},
    ],
    sewNote: "Always leave the rod pocket bigger than the rod. Tension rods are usually 1 to 2 cm across, so a pocket of around 3 cm slides on easily and lets the curtain move smoothly. Make it exact and it is a struggle to thread and the gathers never sit right.",
    tips: [
      "<strong>Your first project</strong>: three straight seams and nothing else. This is the ideal thing to make first.",
      "<strong>Lace lets the light in</strong>: lace screens the view while still letting light through — lovely on a small kitchen window.",
      "<strong>Screen a shelf</strong>: hung across the front of open shelving, it hides cluttered storage in one move.",
    ],
    related: ["curtain", "noren", "coaster"],
  },

  coaster: {
    title: "Coaster", tab: "home", toolName: "Coaster",
    sizeStep: "Enter the side length and the corner radius. Presets cover standard, large and round. Set the radius to half the side length and you get a circle.",
    desc: "How to sew a coaster in five minutes. Two squares sewn right sides together, turned and topstitched. Perfect for using up scraps and for small gifts.",
    keywords: "coaster,fabric coaster,drink coaster,how to sew,sewing pattern,scrap fabric project",
    lead: "A coaster you can finish in five minutes: sew the outer and lining right sides together and turn. Rounding the corners makes it easier to turn and gives it a softer look. It is the perfect use for scraps, and a set of them makes a small gift.",
    matNote: "standard size, 10 cm square",
    materials: [
      "Outer fabric (linen or cotton) — about 13 × 13 cm per coaster",
      "Lining fabric — the same amount",
      "Optional: lightweight quilt batting — the same amount",
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Lay the pattern on the wrong side of the fabric and trace both the cutting line and the finished line.",
      "<strong>Cut the pieces</strong><br>Cut 1 outer and 1 lining. If you are adding batting, cut 1 of that too.",
      "<strong>Cut in batches</strong><br>If you are making several, stack the fabric and cut them all at once.",
    ],
    sew: [
      { h: "4-1. Sew and turn", items: [
        "Place the outer and lining right sides together (with the batting underneath everything, if you are using it).",
        "Sew all the way round, leaving a 4 cm opening for turning.",
        "If the corners are rounded, clip the seam allowance; if they are square, trim them diagonally.",
        "Turn right side out through the opening and press into shape.",
      ]},
      { h: "4-2. Finish", items: [
        "Fold the opening edges in and topstitch all the way round. That single line of stitching closes the opening at the same time.",
      ]},
    ],
    sewNote: "The final round of topstitching closes the opening for you, so there is no hand sewing at all. Stitching 2–3 mm from the edge looks the neatest.",
    tips: [
      "<strong>More absorbent</strong>: use terry or waffle cloth for the lining and it will soak up the condensation from a cold glass.",
      "<strong>As a gift</strong>: a set of four tied with a ribbon makes a lovely little present.",
      "<strong>Scale it up</strong>: at 18–20 cm a side with thicker batting, the same pattern becomes a trivet.",
    ],
    related: ["ovenmitt", "cafecurtain", "tablecloth"],
  },

  ovenmitt: {
    title: "Oven mitt", tab: "home", toolName: "Oven mitt",
    sizeStep: "Enter the palm width, total length, thumb projection and loop length. Presets cover standard, large and short.",
    desc: "How to sew an oven mitt. Two layers of cotton batting between outer and lining keep the heat out. Use 100% cotton throughout — polyester melts.",
    keywords: "oven mitt,oven glove,pot holder,heat resistant,how to sew,sewing pattern",
    lead: "A mitt-shaped pot holder that you slide your hand into. With two layers of quilt batting between the outer and the lining, even an oven tray will not get through to you. Make it long enough to cover the wrist and reaching into the oven stops being nerve-racking. Use heavy cotton and 100% cotton thread.",
    matNote: "one mitt (double it for a pair)",
    materials: [
      "Outer fabric (heavy cotton, canvas or quilted cotton — 100% cotton) — about 50 cm × 40 cm",
      "Lining fabric (also 100% cotton) — the same amount",
      "Quilt batting (100% cotton) — enough for two layers",
      "Wide bias tape — about 40 cm",
      "Thread (cotton or polyester)",
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the mitt body, the thumb and the hanging loop. Mark the notch on the body where the thumb attaches.",
      "<strong>Cut the pieces</strong><br>Cut 4 body pieces (2 outer, 2 lining), 4 thumbs (2 outer, 2 lining), 2 body layers and 2 thumb layers in batting, and 1 loop.",
      "<strong>Mirror the pieces</strong><br>Flip the pattern over for two of the body pieces so they mirror each other. Cut all four the same way round and you end up with two mitts for the same hand.",
      "<strong>Check your materials</strong><br>Fabric and batting must both be 100% cotton. Polyester melts under heat.",
    ],
    sew: [
      { h: "4-1. Make and attach the thumb", items: [
        "Sandwich batting between the outer and lining thumb pieces and baste round the edge.",
        "Finish the edge where the thumb joins the body, either bound with bias tape or double-folded.",
        "Lay the thumb on the outer body at the notch and baste it in place.",
      ]},
      { h: "4-2. Build the outer and lining layers", items: [
        "Stack batting with the two outer body pieces and baste the three layers as one unit. Do the same for the lining.",
        "Two layers of batting insulate better but make the whole thing thicker. Increase the presser foot pressure and change to a heavier needle (size 90/14).",
        "If the thickness makes it hard to handle, quilt a grid through the layers first to lock them together.",
      ]},
      { h: "4-3. Sew outer and lining together", items: [
        "Place the outer and lining right sides together and sew all the way round, leaving the wrist open.",
        "Clip the seam allowance every 5 mm around the fingertip curve and at the base of the thumb. With this much thickness, skipping the clips means it will pull when you turn it.",
        "Trim the seam allowance to 7 mm.",
      ]},
      { h: "4-4. Turn and bind the wrist", items: [
        "Turn right side out through the wrist opening. It is thick, so work it through a little at a time.",
        "Bind the wrist edge with the wide bias tape.",
        "Catch the ends of the loop in as you bind, so you can hang the mitt up.",
        "Make the mitt for the other hand the same way, with the pieces mirrored.",
      ]},
    ],
    sewNote: "Every material must be 100% cotton. Polyester fabric and polyester batting melt or shrink under heat. Buy batting labeled 100% cotton or flame-resistant. This is the one thing not to compromise on — it is a burn risk.",
    tips: [
      "<strong>Two layers of batting</strong>: one layer lets the heat through. Use two for the oven; one is fine for lifting a saucepan lid.",
      "<strong>A heavier needle</strong>: with this many layers a standard 75/11 needle can snap. Switch to 90/14 or heavier.",
      "<strong>Cover the wrist</strong>: a longer mitt protects your forearm when you reach into the oven. Adjust the length to how you actually cook.",
    ],
    related: ["coaster", "apron", "tablecloth"],
  },

  tissuebox: {
    title: "Tissue box cover", tab: "home", toolName: "Tissue box cover",
    sizeStep: "Enter the box width, depth, height, the width of the opening and the ease. Presets cover standard, slim and large boxes.",
    desc: "How to sew a tissue box cover. One top piece with a bound opening plus four sides, and elastic in the hem so it stays on when you swap the box.",
    keywords: "tissue box cover,tissue cover,box cover,how to sew,sewing pattern,home decor",
    lead: "A cover that goes over a boxed tissue. Simply hiding the loud packaging makes a room feel considerably calmer. Cut an opening in the top piece and join the four sides — a plain box shape. Thread elastic through the hem and it stays on even after you refill it.",
    matNote: "standard size",
    materials: [
      "Main fabric (linen, cotton or canvas) — about 60 cm × 50 cm",
      "Bias tape for the opening — about 50 cm",
      "Flat elastic (8 mm) — about 60 cm",
      "Lightweight fusible interfacing — enough for the top (if you want it crisp)",
    ],
    cut: [
      "<strong>Measure the box</strong><br>Measure the width, depth and height of your tissue box. Heights vary a lot between brands, so measure the real thing.",
      "<strong>Trace the pattern</strong><br>Trace three shapes: the top, the front/back sides and the left/right sides. All are rectangles.",
      "<strong>Cut the pieces</strong><br>Cut 1 top, 2 front/back sides and 2 left/right sides — 5 pieces in all.",
      "<strong>Finish the edges</strong><br>Zigzag the seam allowances.",
    ],
    sew: [
      { h: "4-1. Make the opening", items: [
        "Draw the opening in the middle of the top piece, between the notches. Match the width to the opening on the box itself, and make it 2 to 2.5 cm high.",
        "Cut along the line. Rounding the corners makes the binding much easier later.",
        "Bind the cut edge with bias tape. Narrow bias tape follows a small opening better.",
        "Do not make the opening too big or the tissues dry out. Room for two fingers is plenty.",
      ]},
      { h: "4-2. Join the sides into a ring", items: [
        "Sew the four sides together right sides together in the order front → right → back → left, forming a ring.",
        "The last seam is awkward because the fabric is now a loop. Slide it onto the free arm and go slowly.",
        "Press the seam allowances open.",
      ]},
      { h: "4-3. Attach the top", items: [
        "Place the top on the upper edge of the ring, right sides together.",
        "Pin the four corners first, then pin evenly between them. The side seams must land on the four corners of the top.",
        "Sew all the way round, pivoting at each corner with the needle down.",
        "Trim the corner seam allowances diagonally.",
      ]},
      { h: "4-4. Thread elastic through the hem", items: [
        "Double-fold the hem by 1 cm and then 1.5 cm and stitch, leaving a 3 cm gap for threading.",
        "Thread the flat elastic — about 85% of the actual hem circumference. Overlap and stitch the ends, then close the gap.",
        "Turn right side out, fit it over the box and check that the elastic catches under the base.",
      ]},
    ],
    sewNote: "Do not make the opening too big. Cut it wider than the opening on the box itself and the tissues are exposed and dry out. Too large also weakens the top, so it distorts every time you pull a tissue. The same size as the box opening, or a little smaller, is right.",
    tips: [
      "<strong>Hang it up instead</strong>: put the opening in the base rather than the top and add a strap, and it hangs on a wall or the back of a car seat.",
      "<strong>Elastic earns its keep</strong>: without it, the cover lifts every time you pull a tissue. Five minutes of work changes how it feels to use.",
      "<strong>For wet wipes too</strong>: change the dimensions and the same pattern covers a wet-wipe box.",
    ],
    related: ["boxcover", "wipescase", "remotepocket"],
  },

  noren: {
    title: "Noren (Japanese doorway curtain)", tab: "home", toolName: "Noren (Japanese doorway curtain)",
    sizeStep: "Enter the finished width, length, the number of panels, the slit length, the rod pocket height and the hem and side turn-backs. Presets cover small windows and shelves, standard, and room dividers.",
    desc: "How to sew a noren, the Japanese split doorway curtain. Fold the top for a rod pocket and leave the panels open below to form slits. Straight seams only.",
    keywords: "noren,japanese curtain,doorway curtain,room divider,how to sew,sewing pattern",
    lead: "A Japanese-style curtain hung to divide a room or screen a doorway. You fold the top edge over for a rod pocket and leave the lower part of the panel seams open to make the slits. There is nothing but straight stitching, so it works well as the first thing you make on a new machine. In linen or cotton-linen it sits happily in a Western room as well as a Japanese one.",
    matNote: "standard size",
    materials: [
      "Main fabric (linen, cotton-linen or cotton) — about 110 cm wide × 150 cm",
      "A tension rod or wooden dowel, slightly wider than the finished width",
      "Thread",
    ],
    cut: [
      "<strong>Measure where it will hang</strong><br>Measure the drop from the rod position down, and the width you want to cover. A noren normally stops 10 to 20 cm short of the floor rather than reaching it.",
      "<strong>Check the cut sizes</strong><br>The guide sheet shows cut sizes that already include the turn-backs. It is a rectangle, so rule the measurements straight onto the fabric rather than printing.",
      "<strong>Cut the panels</strong><br>Cut as many panels as you have chosen. Two is standard; three makes it easier to walk through.",
      "<strong>Straighten the grain</strong><br>Square the fabric up before cutting. Pulling out a single lengthwise thread and cutting along that line gives you a truly straight edge.",
    ],
    sew: [
      { h: "4-1. Hem the sides and bottom", items: [
        "Double-fold both side edges of each panel by the given turn-back and stitch.",
        "Hem the bottom edge the same way.",
        "Press the folds before stitching. A noren is seen hanging, so a wandering seam line shows.",
        "Remember to finish the inner edges — the edges of the slits — as well as the outer side edges.",
      ]},
      { h: "4-2. Join the panels at the top", items: [
        "Place the panels right sides together and sew from the top edge down to the point where the slit begins.",
        "In other words, sew only the upper part and leave the lower part open. That opening is the slit.",
        "The end of that seam takes the strain every time someone walks through. Backstitch two or three times over it.",
        "Press the seam allowances open.",
      ]},
      { h: "4-3. Make the rod pocket", items: [
        "Fold the top edge over by 1 cm, then again by the rod pocket height.",
        "Topstitch close to the fold, straight from one side to the other. This channel takes the rod.",
        "Allow 5 mm clearance above and below the diameter of your rod. Made to the exact size, it will not go on.",
      ]},
      { h: "4-4. Hang it up", items: [
        "Slide the rod through and fit it in place.",
        "Arrange how far the slits fall open with your hands.",
        "If it turns out too long, deepen the fold at the top rather than cutting the hem.",
      ]},
    ],
    sewNote: "Always reinforce the end of the slit seam. A noren is pushed aside by hand every time somebody passes through, so that one point takes the strain over and over. Backstitch two or three times, or run a short horizontal bar tack across it, and it will survive years of use.",
    tips: [
      "<strong>Keep it off the floor</strong>: a noren that reaches the floor gets trodden on and dirty. Ending 10 to 20 cm short is the norm.",
      "<strong>Make the slits long</strong>: short slits are awkward to walk through and you end up lifting the panel every time. About two-thirds of the length is comfortable.",
      "<strong>Screen a kitchen</strong>: hung in front of a dresser or a washing machine, it hides cluttered storage in one move.",
    ],
    related: ["cafecurtain", "curtain", "tablecloth"],
  },

  remotepocket: {
    title: "Remote control caddy", tab: "home", toolName: "Remote control caddy",
    sizeStep: "Enter the armrest width, the front drop, the inner drop, the pocket height and the number of compartments. Presets cover narrow, standard and wide armrests.",
    desc: "How to sew a remote control caddy for a sofa armrest. One band plus one pocket panel. The inner drop acts as a counterweight so it never slides off.",
    keywords: "remote control caddy,sofa organizer,armrest organizer,remote holder,how to sew,sewing pattern",
    lead: "Storage that hangs over the arm of a sofa. Missing remote controls and magazines piled on the floor both get solved in one go. It straddles the armrest, and the part that hangs down on the inside acts as a counterweight so it does not slide off. The construction is minimal: one band and one pocket panel.",
    matNote: "standard size",
    materials: [
      "Outer fabric (linen, canvas or heavy cotton) — about 50 cm × 100 cm",
      "Lining fabric — the same amount",
      "Fabric for the pocket — about 30 cm × 25 cm",
      "Heavyweight fusible interfacing — enough for the outer",
      "Optional: a weight for the inner drop (poly pellets or a small bag of sand)",
    ],
    cut: [
      "<strong>Measure the armrest</strong><br>Measure the width across the top of the sofa arm, and how far you want the caddy to hang on the front and on the inside.",
      "<strong>Trace the pattern</strong><br>Trace the band and the pocket panel. The section between the notches on the band is the part that sits on top of the armrest.",
      "<strong>Cut the pieces</strong><br>Cut 1 band in the outer fabric and 1 in the lining, plus 1 pocket panel.",
      "<strong>Fuse the interfacing</strong><br>Fuse heavyweight interfacing to the wrong side of the outer band. That is what stops the caddy sagging once the pockets are loaded.",
    ],
    sew: [
      { h: "4-1. Make the pocket", items: [
        "Double-fold the top edge of the pocket panel by 1 cm and 1 cm again and stitch. That is the opening.",
        "Fold the seam allowance of the other three edges 1 cm to the wrong side and press.",
      ]},
      { h: "4-2. Attach the pocket to the band", items: [
        "Spread out the outer band and lay the pocket on the section that will hang down at the front.",
        "Check the orientation before you pin: the pocket opening must face upwards when the caddy is draped over the sofa arm. Get it upside down and the remotes fall out.",
        "Stitch the three folded edges down, 2–3 mm from the edge.",
        "Stitch vertical dividing lines at the notches. About 5–6 cm per remote is a good width.",
        "Always backstitch at the start of each line — the top of the pocket.",
      ]},
      { h: "4-3. Assemble the band", items: [
        "Lay the outer and lining bands right sides together and sew all the way round, leaving a 12 cm opening.",
        "If you are adding a weight, tuck the small bag into the tip of the inner drop at this stage.",
        "Trim the four corner seam allowances diagonally and turn right side out through the opening.",
        "Press, then topstitch 5 mm from the edge all the way round. That closes the opening too.",
      ]},
      { h: "4-4. Fit it to the sofa", items: [
        "Drape it over the armrest.",
        "Check that the section between the notches sits flat on top of the arm and that both sides hang naturally.",
        "If it slides, lengthen the inner drop or add more weight to the tip.",
      ]},
    ],
    sewNote: "The one thing to get right is which way the pocket faces. With the band flat on the table, the pocket opening looks like it is pointing down. Once the caddy is draped over the sofa arm the front drops, and in that position the opening faces up — that is correct. Picture it hanging before you place the pins.",
    tips: [
      "<strong>The inner drop is the counterweight</strong>: without it the loaded pockets pull the caddy off. A little shorter than the front drop is the balanced length.",
      "<strong>Fit the dividers to real remotes</strong>: lay your own remotes out and measure before deciding where the dividing lines go.",
      "<strong>Beside the bed too</strong>: tucked between the mattress and the frame, it becomes a home for a phone and a book.",
    ],
    related: ["wallpocket", "tissuebox", "boxcover"],
  },

  neckpillow: {
    title: "Neck pillow", tab: "home", toolName: "Neck pillow",
    sizeStep: "Enter the outer radius, the inner radius and the gap that goes around the neck. Presets cover children, standard and large.",
    desc: "How to sew a U-shaped neck pillow. Two pieces sewn right sides together, turned and stuffed. Choose your own soft fabric and fill with batting or beads.",
    keywords: "neck pillow,travel pillow,U-shaped pillow,how to sew,sewing pattern,travel accessory",
    lead: "A U-shaped cushion that supports your neck. Sew two pieces right sides together, turn, and fill. With a bought one you take whatever fabric it comes in; making your own means choosing something that actually feels good against your skin. Batting gives a soft, airy fill; microbeads give a squishy one. Make a separate cover and you can wash it.",
    matNote: "standard size",
    materials: [
      "Main fabric (fleece, terry or smooth jersey — something pleasant to touch) — about 50 cm × 80 cm",
      "Polyester stuffing — about 200 g, or expanded polystyrene microbeads",
      "Optional: lightweight cotton for an inner bag (if using beads)",
      "Thread",
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace the pillow body. It has an outer curve, an inner curve and the gap that goes around your neck.",
      "<strong>Cut the pieces</strong><br>Cut 2. With fleece, cut with just the tips of the scissors through the base fabric so the pile does not fly everywhere.",
      "<strong>Finish the edges</strong><br>Not needed — it is turned right side out.",
      "<strong>If you are using beads</strong><br>Cut 2 inner bag pieces from lightweight cotton using the same pattern. Never put beads straight into the pillow; bag them first.",
    ],
    sew: [
      { h: "4-1. Sew the two pieces together", items: [
        "Place the two pieces right sides together and sew all the way round, leaving a 10 cm opening somewhere inconspicuous on the outer curve.",
        "Clip the seam allowance of the outer curve every 1 cm.",
        "The inner curve — the side that rests against your neck — has the opposite problem: too much seam allowance. Cut small notches out of it every 1 cm. Which way the curve bends decides whether you clip or notch.",
        "Backstitch at both ends of the neck gap, where the strain falls.",
      ]},
      { h: "4-2. Turn it right side out", items: [
        "Turn it through the opening. It is a U, so pull one end through and then the other.",
        "Push the inner curve out from the inside with an awl and shape it.",
        "Do not press it. Heat flattens the pile of fleece and terry. Shaping it by hand is enough.",
      ]},
      { h: "4-3. Fill it", items: [
        "With stuffing, tear off small pieces and feed them in from both ends. A chopstick pushes them right to the tips.",
        "With beads, make the inner bag first, fill it, sew it firmly shut and then put it inside the pillow. Poured in loose, they escape through the tiniest gap in a seam, endlessly.",
        "Fill it until it gives a little when you press it against your neck. Packed hard, it lifts your head instead of supporting it and you end up more tired.",
        "Keep the two ends — the parts under your chin — a little less full so you can still turn your head.",
      ]},
      { h: "4-4. Close the opening", items: [
        "Fold the opening seam allowances inside and close with ladder stitch.",
        "Use a double thread and small stitches, and go round twice. The filling tugs at this seam every time it shifts.",
        "Hide the knot inside.",
      ]},
    ],
    sewNote: "If you use beads, always bag them first. Expanded polystyrene beads are as fine as sand and will pour out endlessly through the smallest gap in a seam. Once they start escaping there is no stopping them. The inner bag takes ten minutes; skipping it is something you will regret.",
    tips: [
      "<strong>Make a separate cover</strong>: a slightly larger cover from the same pattern, closed with a zipper or hook-and-loop, means you can wash it. Your face touches this, so it is worth it.",
      "<strong>Do not overfill</strong>: a hard pillow pushes your head up and tires your neck. Just soft enough to compress is right.",
      "<strong>Mind the gap</strong>: too narrow and it will not go round your neck; too wide and it gives no support. About a third of your actual neck measurement is the guide.",
    ],
    related: ["slipper", "cushioncover", "passportcase"],
  },
  coverall: {
    title: "Baby coverall", tab: "baby", toolName: "Baby coverall",
    sizeStep: "Enter the chest, body length (shoulder to crotch), inseam, shoulder width, sleeve length, neckline width, leg opening and ease. Presets cover 50-60 through 80-90.",
    desc: "How to sew a baby coverall. Two fronts, one back and two sleeves, with snaps down the center front and along the inseam so you can change a diaper without undressing.",
    keywords: "baby coverall,all-in-one,footed romper,how to sew,sewing pattern,baby clothes,newborn",
    lead: "A front-opening all-in-one that covers baby from neck to ankle. Four pieces: two fronts, one back and two sleeves. Snaps run down the center front and along the inseam, so you can change a diaper without lifting baby up. Nothing rides up at the waist, which matters once they start rolling. Use a stretch knit or double gauze.",
    matNote: "one coverall, size 70-80",
    materials: [
      "Main fabric (jersey, interlock or double gauze) — about 110 cm wide × 90 cm",
      "Bias tape for the neckline — about 60 cm",
      "Plastic snaps — 12 to 15 sets (center front and inseam)",
      "A ballpoint (jersey) needle, size 75/11, and stretch thread",
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace three pieces: front, back and sleeve. The front has an extension along the center front edge for the snap placket. Place the back on the fold.",
      "<strong>Cut the pieces</strong><br>Cut 2 fronts (left and right), 1 back on the fold and 2 sleeves. Flip the pattern over for the second front so the pair mirrors.",
      "<strong>Transfer the notches</strong><br>Mark the underarm notch and the inseam notch. If those two are off, the sleeve and the inseam will not meet.",
      "<strong>Finish the edges</strong><br>Overlock or zigzag. Knit stretches, so let the feed dogs pull the fabric rather than tugging it through.",
    ],
    sew: [
      { h: "4-1. Sew the shoulders", items: [
        "Place front and back right sides together and sew both shoulder seams.",
        "Knit shoulders stretch out over time. Stabilize them with clear elastic or a narrow strip of selvage caught in the seam.",
        "Press the seam allowances towards the back.",
      ]},
      { h: "4-2. Set in the sleeves", items: [
        "Attach each sleeve to the armhole while the garment is still flat, before the side seams are closed.",
        "Match the notch at the top of the sleeve to the shoulder seam.",
        "The sleeve cap is very slightly longer than the armhole. Distribute that ease with pins rather than letting it bunch in one spot.",
        "Press the seam allowances towards the body.",
      ]},
      { h: "4-3. Sew side, underarm and inseam in one run", items: [
        "Fold the coverall right sides together and sew from the cuff, down the underarm, through the armpit and along the side, in one continuous seam. Repeat on the other side.",
        "Then sew the inseam, matching the front and back inseam notches.",
        "Leave the snap section of the inseam open. Backstitch where the opening ends.",
      ]},
      { h: "4-4. Finish the neckline, front edge, cuffs and hems", items: [
        "Bind the neckline with bias tape, easing the tape gently around the curve.",
        "Double-fold the center front edges by 1 cm and 1 cm again and stitch. This is the placket the snaps go into.",
        "Hem the cuffs and the leg openings. Use a zigzag or stretch stitch so the hems still give.",
        "Fit plastic snaps evenly down the center front (about every 10 cm) and three along the inseam.",
      ]},
    ],
    sewNote: "Put the male half of each inseam snap on the front and the female half on the back. Reversed, the raised stud presses into baby's back whenever they lie down. It looks like a trivial detail, and babies cannot tell you about it — check the orientation before you set them.",
    tips: [
      "<strong>Knit is the right choice</strong>: a woven fabric restricts rolling and crawling. Choose jersey or interlock with real stretch.",
      "<strong>Why front-opening</strong>: unlike a pullover, you can dress a baby lying down, before they can hold their head up. Make newborn sizes front-opening.",
      "<strong>Closed feet</strong>: close the leg openings into a bag rather than hemming them and you get built-in feet — worth it for a winter newborn size.",
    ],
    related: ["kidsrompers", "babypants", "sleeper"],
  },

  uchiwacover: {
    title: "Fan sleeve (uchiwa case)", tab: "small", toolName: "Fan sleeve (uchiwa case)",
    sizeStep: "Enter the fan width and height, the handle width, how far the handle sticks out, the top corner radius and the ease. Presets cover standard, large and compact.",
    desc: "How to sew a padded sleeve for a cheering fan (uchiwa). The handle comes out at the bottom so you can pull the fan out one-handed. Outer and lining, closed at the top.",
    keywords: "fan case,uchiwa cover,fan sleeve,concert goods,how to sew,sewing pattern,fandom",
    lead: "A sleeve to carry a cheering fan. The handle sticks out at the bottom, so you can slide the fan in and out with one hand. Outer and lining, closed at the top with hook-and-loop or a snap. Quilted or heavy fabric keeps the corners from bending on the way to the venue.",
    matNote: "one case, standard size",
    materials: [
      "Outer fabric (quilted cotton, canvas or heavy cotton) — about 40 cm × 60 cm",
      "Lining fabric — the same amount",
      "Hook-and-loop tape, 2.5 cm wide — 6 cm",
      "Optional: webbing for a shoulder strap, 2.5 cm wide — about 120 cm",
    ],
    cut: [
      "<strong>Measure your fan</strong><br>Measure the width and height of the fan face and the width of the handle. Jumbo fan sizes vary between makers, so measure the actual fan.",
      "<strong>Trace the pattern</strong><br>Trace the body. The tab at the bottom is where the handle passes through. Do not forget the rounded top corners.",
      "<strong>Cut the pieces</strong><br>Cut 2 in the outer fabric and 2 in the lining. Quilted fabric frays fast, so zigzag the edges as soon as you have cut them.",
      "<strong>Transfer the notches</strong><br>Mark the two notches at the base of the handle tab. Those are the stopping points for the seam.",
    ],
    sew: [
      { h: "4-1. Sew the outer and lining separately", items: [
        "Place the two outer pieces right sides together and sew all the way round except the top edge, which is the opening.",
        "Clip the inner corners where the handle tab meets the body, so the corners turn out cleanly.",
        "Sew the lining the same way, but leave a 10 cm opening in the bottom for turning.",
      ]},
      { h: "4-2. Join outer and lining", items: [
        "Turn the outer right side out and slip it inside the lining, which stays wrong side out. The two are now right sides together.",
        "Sew around the top opening. Match the side seams of the outer and lining before you pin.",
        "Pull everything through the opening you left in the lining.",
      ]},
      { h: "4-3. Shape it and topstitch", items: [
        "Close the opening with ladder stitch and push the lining down inside the case.",
        "Press into shape. With quilted fabric, use a pressing cloth and a light touch so you do not flatten it.",
        "Topstitch 5 mm from the opening edge all the way round. The lining stops rolling out and the opening keeps its shape.",
      ]},
      { h: "4-4. Add the closure", items: [
        "Sew hook-and-loop tape to the inside of the opening, centered. Catch only the lining so the stitching does not show on the outside.",
        "For a shoulder strap, catch webbing in the side seams at the top. Doing it during step 4-2 makes it much stronger.",
        "Slide the fan in and check that the handle comes out easily.",
      ]},
    ],
    sewNote: "Make the handle tab about 5 mm wider than the actual handle. Cut to the exact size, it snags every time you use it. Too wide and the fan slides down through it — 5 mm to 1 cm of clearance is the sweet spot.",
    tips: [
      "<strong>Quilted fabric is ideal</strong>: a fan with a bent corner is a ruined fan. Use something with enough body to cushion it.",
      "<strong>Skip the clear window</strong>: it is tempting to show the design, but light and rubbing will fade it. The point of a case is to cover.",
      "<strong>Two fans at once</strong>: double the width and stitch a divider down the middle to carry two fans separately.",
    ],
    related: ["itabag", "nametag", "flaskcover"],
  },

  itabag: {
    title: "Ita bag (clear window tote)", tab: "bag", toolName: "Ita bag (clear window tote)",
    sizeStep: "Enter the finished width and height, the gusset, the window border width and the handle length. Presets cover standard (A4), small and large.",
    desc: "How to sew an ita bag — a tote with a clear vinyl window on the front for displaying badges and charms. Body, gusset, handles and a swappable backing panel.",
    keywords: "ita bag,clear window tote,badge bag,fandom bag,how to sew,sewing pattern,vinyl",
    lead: "A tote with a clear window on the front so you can display badges and plush charms. Swap the backing panel behind the window and the background color changes with your mood. Four pieces: body, gusset, handles and backing panel. Use heavyweight clear vinyl for the window.",
    matNote: "standard size, fits A4",
    materials: [
      "Outer fabric (11 oz canvas or oxford cloth) — about 110 cm wide × 140 cm",
      "Lining fabric — the same amount",
      "Clear vinyl, around 0.3 mm thick — about 30 cm × 40 cm",
      "Heavyweight fusible interfacing — enough for the outer",
      "Backing panel fabric (a plain color, or felt) — about 30 cm × 40 cm",
    ],
    cut: [
      "<strong>Trace the pattern</strong><br>Trace four shapes: body, gusset, handles and window. Mark on the body where the window opening goes.",
      "<strong>Cut the pieces</strong><br>Cut 2 bodies in the outer and 2 in the lining, 1 gusset in each, 2 handles and 1 window in vinyl.",
      "<strong>Fuse the interfacing</strong><br>Fuse heavyweight interfacing to the outer body and gusset. The area around the window especially needs the support — do not skip it.",
      "<strong>Handling the vinyl</strong><br>Never press clear vinyl. It melts. If you need a crease, finger-press it, or use a pressing cloth on the lowest setting for a moment only.",
    ],
    sew: [
      { h: "4-1. Cut the window", items: [
        "On the piece that will be the front, cut out the area inside the marks. Rounding the corners slightly makes the next step much easier.",
        "Lay the clear vinyl behind the opening, overlapping by 1 cm all round.",
        "Topstitch 3–5 mm inside the edge of the opening, all the way round, to hold the vinyl in place.",
      ]},
      { h: "4-2. How to sew vinyl", items: [
        "Vinyl sticks to the presser foot and refuses to feed. Lay tracing paper over it, sew through both and tear the paper away afterwards.",
        "A Teflon foot is the reliable answer. Failing that, a strip of tape on the sole of an ordinary foot helps a lot.",
        "Do not use pins — the holes stay. Use clips.",
        "Stitching cannot be undone either. Every hole is permanent, so check the position before you sew.",
      ]},
      { h: "4-3. Build the bag", items: [
        "Fold the handles in four, topstitch, and baste them to the top edge of the outer body pieces.",
        "Place the front body and the gusset right sides together, matching the center of the gusset to the center of the base, and sew. Clip into the gusset seam allowance at the corners so it turns.",
        "Attach the back body the same way to form the bag.",
        "Sew the lining the same way, leaving a 15 cm opening in the base.",
      ]},
      { h: "4-4. Join outer and lining", items: [
        "Turn the outer right side out and slip it inside the lining, which stays wrong side out.",
        "Sew around the top opening. Backstitch where the handles are caught in.",
        "Pull everything through the opening in the lining and close it.",
        "Topstitch 5 mm from the top edge all the way round. Slide the backing panel in behind the window and it is ready.",
      ]},
    ],
    sewNote: "Never press clear vinyl. It melts instantly and takes the mark of the iron permanently. Do all your pressing before the window goes in, and plan the rest of the construction on the assumption that no iron will touch the bag again.",
    tips: [
      "<strong>The backing panel does the work</strong>: swapping the fabric behind the window completely changes how the badges read. Make a few in different colors.",
      "<strong>0.3 mm vinyl</strong>: thinner creases immediately, thicker will not feed through the machine. Buy what is sold as bag-weight.",
      "<strong>Keep the window modest</strong>: the bigger the window, the weaker the bag. Leave a border of at least 3 cm.",
    ],
    related: ["uchiwacover", "tote", "nuiclothes"],
  },

  teacosy: {
    title: "Tea cozy", tab: "home", toolName: "Tea cozy",
    sizeStep: "Enter the teapot width and height, the ease and the top loop length. Presets cover 2-3 cups, 4-5 cups and small.",
    desc: "How to sew a tea cozy. Outer and lining with quilt batting between, left open at both sides for the spout and the handle. Lift it off by the loop on top.",
    keywords: "tea cozy,teapot warmer,teapot cover,how to sew,sewing pattern,quilted,kitchen",
    lead: "A padded cover that keeps a teapot hot. Outer and lining with quilt batting between, left open at both sides for the spout and the handle. Lift it off by the loop on top. Tea that is still hot ten minutes after brewing makes more difference than you would expect.",
    matNote: "one cozy, 4-5 cup size",
    materials: [
      "Outer fabric (linen or a cotton print) — about 50 cm × 50 cm",
      "Lining fabric — the same amount",
      "Thick quilt batting — about 50 cm × 50 cm",
      "Optional: aluminized insulating sheet, for extra heat retention",
    ],
    cut: [
      "<strong>Measure the teapot</strong><br>Measure the width including the spout and the handle, and the height up to the top of the lid knob. The cozy goes over the pot, so it has to be bigger than the pot itself.",
      "<strong>Trace the pattern</strong><br>Trace the body and the top loop. Below the notches on each side is the opening for the spout and the handle.",
      "<strong>Cut the pieces</strong><br>Cut 2 in the outer, 2 in the lining, 2 in batting and 1 loop.",
      "<strong>Finish the edges</strong><br>Not needed — it is turned right side out.",
    ],
    sew: [
      { h: "4-1. Build the outer and the lining", items: [
        "Lay batting against the wrong side of one outer piece and baste around the edge. Do the same with the second.",
        "Place the two batted outer pieces right sides together and sew the domed top only. Do not sew below the side notches.",
        "Clip the seam allowance around the curve every 1 cm.",
        "Sew the two lining pieces the same way, domed top only.",
      ]},
      { h: "4-2. Add the loop", items: [
        "Fold the loop in four, topstitch and fold it into a loop.",
        "Baste it to the top of the outer, pointing inwards.",
      ]},
      { h: "4-3. Join outer and lining", items: [
        "Turn the outer right side out and slip it inside the lining, which stays wrong side out.",
        "Sew around the bottom edge, leaving a 10 cm opening for turning.",
        "Sew the side openings too, matching the edges. Skip these and the raw seam allowances stay exposed at the openings.",
      ]},
      { h: "4-4. Turn and finish", items: [
        "Turn right side out through the opening and shape it. Press with a cloth and a light touch so you do not flatten the batting.",
        "Close the opening with ladder stitch.",
        "Topstitch 5 mm in from the bottom edge and both side openings.",
        "Put it over the pot and check that the spout and the handle come through.",
      ]},
    ],
    sewNote: "Do not reduce the ease. A teapot is wider across the spout and the handle than it is across the body. Measure only the body and the cozy will catch on the spout and refuse to go on. The 4 cm of ease in the preset is there for exactly that.",
    tips: [
      "<strong>Use thick batting</strong>: the whole point is insulation, so thin batting defeats it. One thick layer, or two thin ones.",
      "<strong>Add a foil layer</strong>: an aluminized sheet between the batting and the lining makes a noticeable difference.",
      "<strong>Deep side openings</strong>: shallow openings snag on the spout. Half the height is a good guide.",
    ],
    related: ["ovenmitt", "coaster", "tablecloth"],
  },

  cutlerycase: {
    title: "Cutlery roll", tab: "small", toolName: "Cutlery roll",
    sizeStep: "Enter the cutlery length, the number of slots, the width per slot, the flap depth and the tie length. Presets cover 3-piece, 4-piece and paintbrushes.",
    desc: "How to sew a roll-up cutlery case. Lay a pocket panel over the body and stitch vertical dividers. Change the count and it holds paintbrushes or knitting needles.",
    keywords: "cutlery roll,utensil roll,chopstick case,brush roll,how to sew,sewing pattern,lunch",
    lead: "A roll that holds chopsticks, a spoon and a fork in separate slots, then ties shut. Lay a pocket panel over the body and stitch vertical dividers — that is the whole construction. Change the count and the slot width and the same pattern holds paintbrushes, knitting needles or colored pencils.",
    matNote: "one roll, 4-piece set",
    materials: [
      "Outer fabric (linen, canvas or oxford cloth) — about 30 cm × 40 cm",
      "Lining fabric — the same amount",
      "Fabric for the pocket — about 25 cm × 15 cm",
      "Matching fabric or cotton tape, 1.5 cm wide, for the tie — about 60 cm",
    ],
    cut: [
      "<strong>Measure what goes in</strong><br>Measure the longest piece of cutlery and the widest one. Chopsticks set the length; a spoon sets the width.",
      "<strong>Trace the pattern</strong><br>Trace the body, the pocket panel and the tie. The notches along the pocket panel mark the dividing lines.",
      "<strong>Cut the pieces</strong><br>Cut 1 body in the outer, 1 in the lining, 1 pocket panel and 1 tie.",
      "<strong>Finish the edges</strong><br>Not needed — it is turned right side out.",
    ],
    sew: [
      { h: "4-1. Hem the top of the pocket panel", items: [
        "Double-fold the top edge of the pocket panel by 1 cm and 1 cm again and stitch. That is the opening the cutlery slides into.",
        "Do it first. Once the panel is on the body you cannot reach this edge.",
      ]},
      { h: "4-2. Lay the pocket on the body", items: [
        "Spread the outer body right side up and lay the pocket panel on it, bottom edges aligned.",
        "Baste the sides and the bottom, inside the seam allowance.",
        "Do not sew the top edge. If it is closed, nothing goes in.",
      ]},
      { h: "4-3. Stitch the dividers", items: [
        "Stitch from the top of the pocket down to the bottom at each notch. That creates one slot per piece.",
        "Always backstitch at the start of each line, at the top of the pocket. That is where a roll tears with use.",
        "Spoons and forks are different widths. Nudging the divider positions to match your actual cutlery gets a snug fit.",
      ]},
      { h: "4-4. Assemble and add the tie", items: [
        "Fold the tie in four and topstitch.",
        "Baste the end of the tie to the outer body, halfway up one side edge — the point it comes round to when the roll is closed.",
        "Place the outer and lining right sides together and sew all the way round, leaving an 8 cm opening.",
        "Trim the corners diagonally, turn right side out through the opening and press.",
        "Topstitch 3 mm from the edge all the way round, which closes the opening too.",
      ]},
    ],
    sewNote: "The pocket is a little over half the length of the cutlery. Deeper and it is awkward to get things out; shallower and they work loose when you roll it. Rolled up, the flap should fold over the tips — that is how you know the proportions are right.",
    tips: [
      "<strong>For packed lunches</strong>: rolled and tied, nothing rattles loose in your bag. It is the thing that finally gets you off disposables.",
      "<strong>Water-resistant lining</strong>: cutlery goes back in damp, so a coated lining saves the roll.",
      "<strong>Not just cutlery</strong>: 8 slots at 3.5 cm each turns it into a brush or knitting needle roll. Same pattern.",
    ],
    related: ["kinchaku", "pencase", "placemat"],
  },

  necktie: {
    title: "Necktie", tab: "small", toolName: "Necktie",
    sizeStep: "Enter the overall length, the wide blade width, the narrow blade width and the width at the neck. Presets cover standard (8 cm), narrow (6 cm) and wide (9 cm).",
    desc: "How to sew a necktie. Three pieces: the wide blade, the narrow blade and the keeper loop. Cutting on the bias is what lets the knot sit and the creases fall out.",
    keywords: "necktie,tie,bias cut,how to sew,sewing pattern,menswear,handmade gift",
    lead: "Three pieces: the wide blade, the narrow blade and the keeper loop. Cutting on the bias — 45 degrees to the grain — is the whole trick. It lets the knot pull up properly and lets creases fall out overnight. An interlining gives it the body of a bought tie. Tie widths move with fashion, so measure one you already like.",
    matNote: "one tie",
    materials: [
      "Main fabric (silk, wool or a fine cotton) — about 110 cm wide × 100 cm (bias cutting needs extra)",
      "Tipping fabric for the back of the points — about 20 cm × 20 cm",
      "Necktie interlining — about 110 cm wide × 15 cm",
      "Hand-sewing thread for the slip stitch",
    ],
    cut: [
      "<strong>Find the grain</strong><br>Identify the direction of the lengthwise threads. The pattern must sit at 45 degrees to it — the arrow on the piece shows the direction.",
      "<strong>Trace the pattern</strong><br>Trace the wide blade, the narrow blade and the keeper loop. Laying them on the bias uses more fabric than you would expect.",
      "<strong>Cut the pieces</strong><br>Cut 1 wide blade, 1 narrow blade and 1 loop. Cut the interlining to the same shapes, minus the seam allowance.",
      "<strong>Handling bias-cut fabric</strong><br>Once cut, it stretches easily. Carry it flat rather than letting it hang. Stretch it now and the finished tie will twist.",
    ],
    sew: [
      { h: "4-1. Join the two blades", items: [
        "Place the narrow ends of the wide and narrow blades right sides together — the ends that meet at the back of the neck — and sew.",
        "Because both pieces are on the bias, the join runs diagonally. That is correct.",
        "Press the seam allowance open.",
      ]},
      { h: "4-2. Tip the points", items: [
        "Place the tipping fabric on the point of the wide blade, right sides together, and sew the two edges of the V.",
        "Trim the corner diagonally, turn right side out and push the point out with an awl.",
        "Do the same on the narrow blade.",
      ]},
      { h: "4-3. Wrap the interlining", items: [
        "Lay the interlining along the center line of the tie.",
        "Fold both seam allowances in over it so they overlap slightly down the middle.",
        "Slip stitch that overlap closed by hand, the whole length. Do not use the machine.",
        "Let the thread stay slightly slack as you go. Sewn taut, the tie cannot give when you knot it and the fabric splits.",
      ]},
      { h: "4-4. Add the keeper and finish", items: [
        "Fold the loop in four, topstitch and form it into a loop.",
        "Stitch it to the back of the wide blade, about halfway down. The narrow blade passes through it.",
        "Lay the tie flat and press lightly through a cloth — shaping it, not flattening it.",
      ]},
    ],
    sewNote: "The bias cut is not optional. Cut on the straight grain, the knot will not pull up and a crease never falls out. It takes more fabric, but whether the thing behaves like a necktie is decided right here. The slack in the center slip stitch is there for the same reason.",
    tips: [
      "<strong>Take one apart first</strong>: unpicking a tie you no longer wear shows you the whole construction, especially how the interlining sits and how loose the slip stitch is.",
      "<strong>Choose light fabric</strong>: heavy cloth makes an unwieldy knot. Fine silk or wool suits it.",
      "<strong>As a gift</strong>: for Father's Day or a graduation. Choosing the fabric yourself is something you only get by making it.",
    ],
    related: ["bowtie", "shirt", "scarf"],
  },

  treeskirt: {
    title: "Christmas tree skirt", tab: "home", toolName: "Christmas tree skirt",
    sizeStep: "Enter the finished diameter and the diameter of the center hole. Presets cover 120 cm, 150 cm and 180 cm trees.",
    desc: "How to sew a Christmas tree skirt. Cut four quarter panels, join three seams and leave the fourth open as the slit. It hides the stand and holds the presents.",
    keywords: "tree skirt,christmas tree skirt,christmas sewing,how to sew,sewing pattern,holiday",
    lead: "A circle of fabric for the base of a Christmas tree. It has a hole in the middle and one slit out to the edge, so it wraps around the trunk. Cut four quarter panels, sew three seams and leave the fourth open. Just covering the bare stand changes how the whole tree reads.",
    matNote: "for a 150 cm tree (110 cm diameter)",
    materials: [
      "Outer fabric (cotton print, felt or velvet) — about 110 cm wide × 240 cm",
      "Lining fabric — the same amount",
      "Wide bias tape for binding — about 400 cm",
      "Optional: hook-and-loop tape or snaps to close the slit — 3 sets",
    ],
    cut: [
      "<strong>Measure the tree</strong><br>Measure the diameter of the stand and how far the lowest branches reach. The skirt should sit just inside the tips of those branches.",
      "<strong>Trace the pattern</strong><br>Trace the quarter panel. Both the outer and the inner edge are arcs.",
      "<strong>Cut the pieces</strong><br>Cut 4 in the outer and 4 in the lining. With a directional print, make sure all four panels face the same way.",
      "<strong>Finish the edges</strong><br>Not needed — the edges are bound with bias tape.",
    ],
    sew: [
      { h: "4-1. Join the outer panels", items: [
        "Place the outer quarter panels right sides together and sew them along the straight radial edges.",
        "Sew only three seams. Leave the fourth open — that is the slit.",
        "Press the seam allowances open. All four seams converge at the center, so trim the allowances short there to reduce the bulk.",
      ]},
      { h: "4-2. Join the lining the same way", items: [
        "Sew the four lining panels along the same three seams.",
        "Check that the open seam is in the same position on both layers, or they will not line up.",
      ]},
      { h: "4-3. Layer outer and lining", items: [
        "Place outer and lining wrong sides together and baste around the edges. You could sew them right sides together and turn, but at this size turning is a struggle — layering and binding is more reliable.",
        "Pin the center hole, then the two edges of the slit, then the outer edge, matching as you go.",
      ]},
      { h: "4-4. Bind the edges", items: [
        "Bind with bias tape in this order: the center hole, the two slit edges, then the outer edge.",
        "The outer edge is long. Ease the tape along the fabric rather than pulling it — pulled tape makes the finished edge cup upwards.",
        "Add three sets of hook-and-loop tape or snaps along the slit so it closes once it is around the trunk.",
      ]},
    ],
    sewNote: "Do not pull the bias tape as you bind the outer edge. A circular edge travels slightly further than a straight one, and tape stretched along it pulls the rim up so the skirt will not lie flat on the floor.",
    tips: [
      "<strong>Non-slip lining</strong>: on a wooden floor, a non-slip backing keeps it from wandering.",
      "<strong>Quilt it</strong>: batting between the layers with a grid of quilting lifts the whole thing visually.",
      "<strong>A round mat the rest of the year</strong>: close the slit and it is simply a circular mat, so it need not go back in the box.",
    ],
    related: ["tablecloth", "coaster", "fabricbasket"],
  },

  fabricbasket: {
    title: "Fabric storage basket", tab: "home", toolName: "Fabric storage basket",
    sizeStep: "Enter the finished width, depth, height and the cuff depth. Presets cover small, standard and large.",
    desc: "How to sew a fabric storage basket that stands on its own. One continuous side piece joined to a base, with the opening turned back as a cuff. Interfacing holds the shape.",
    keywords: "fabric basket,storage basket,fabric bin,how to sew,sewing pattern,storage,organizer",
    lead: "A square fabric basket that stands up on its own. One continuous side piece joined to a base, with the opening turned back as a cuff. Interfacing or a stiff stabilizer holds the shape. A home for diapers, yarn or remote controls — the things that end up left out. Hiding the contents alone makes a room look tidier.",
    matNote: "one basket, standard size",
    materials: [
      "Outer fabric (8 oz canvas or heavy linen) — about 110 cm wide × 60 cm",
      "Lining fabric — the same amount",
      "Heavyweight fusible interfacing or fusible fleece — enough for the outer",
      "Optional: cardboard or corrugated plastic for the base",
    ],
    cut: [
      "<strong>Measure the space</strong><br>If it goes on a shelf, subtract about 2 cm from the shelf's inside measurements. Cut to the exact size and you will not be able to get it in and out.",
      "<strong>Trace the pattern</strong><br>Trace two pieces: the continuous side and the base. The side has three notches that match the corners of the base.",
      "<strong>Cut the pieces</strong><br>Cut 1 side and 1 base in the outer, and the same in the lining. The side piece is long, so spread the fabric out to cut it.",
      "<strong>Fuse the interfacing</strong><br>Fuse heavyweight interfacing to the outer pieces. Whether the basket stands up is decided here, so do not substitute something lighter.",
    ],
    sew: [
      { h: "4-1. Join the side into a ring", items: [
        "Place the short ends of the side piece right sides together and sew, forming a ring.",
        "Press the seam allowance open. Position that seam at a back corner and it will hardly show.",
        "Do the same with the lining.",
      ]},
      { h: "4-2. Attach the base", items: [
        "Place the lower edge of the ring and the base right sides together.",
        "Pin the notches on the side to the four corners of the base. Each stretch between notches corresponds to one edge of the base.",
        "Sew all the way round. At each corner, stop with the needle down, clip into the side's seam allowance and pivot 90°. Without the clip the fabric will not turn.",
        "Attach the lining base the same way.",
      ]},
      { h: "4-3. Join outer and lining", items: [
        "Turn the outer right side out and slip it inside the lining, which stays wrong side out.",
        "Sew around the opening, leaving a 12 cm gap for turning.",
        "Turn right side out through the gap and push the lining down inside.",
      ]},
      { h: "4-4. Cuff it and finish", items: [
        "Close the gap with ladder stitch.",
        "Topstitch 5 mm from the opening edge all the way round.",
        "Turn the opening down to the outside. The doubled rim is what keeps the shape.",
        "A piece of cardboard or corrugated plastic in the base stops it sagging when loaded.",
      ]},
    ],
    sewNote: "The corners of the base are the only difficult part. The side is a single band, so you have to clip its seam allowance at each corner or the fabric will not go round. Clip to within 1 mm of the stitching, no further — cut too deep and it tears there.",
    tips: [
      "<strong>The interfacing decides it</strong>: whether it stands up is entirely down to the weight of the interfacing. If it slumps, use fusible fleece instead.",
      "<strong>The cuff is structural</strong>: turning the opening down doubles the rim and holds the shape. It is not only decorative.",
      "<strong>Make a set</strong>: two or three the same size lined up on a shelf clear the visual clutter completely.",
    ],
    related: ["boxcover", "laundrybag", "wallpocket"],
  },
  tablerunner: {
    title: "Table runner", tab: "home", toolName: "Table runner",
    sizeStep: "Enter the finished length, the finished width and the depth of the point at each end. Presets cover tables seating 4 or 6, plus a version with square ends.",
    desc: "How to sew a table runner with pointed ends. Outer and lining sewn right sides together and turned. It uses far less fabric than a tablecloth and is easier to wash.",
    keywords: "table runner,how to sew,sewing pattern,table linen,home decor,pointed ends",
    lead: "A long narrow cloth for the middle of a table. Pointed ends give it the look of a bought one. Outer and lining sewn right sides together and turned — that is all. It uses far less fabric than a tablecloth and washes more easily. Having one designated spot for the flowers and the serving dishes also keeps the table from silting up.",
    matNote: "one runner for a table seating 6",
    materials: [
      "Outer fabric (linen, cotton-linen or a cotton print) — about 110 cm wide × 180 cm",
      "Lining fabric — the same amount",
      "Optional: lightweight fusible interfacing, if you want it to lie crisply",
    ],
    cut: [
      "<strong>Measure the table</strong><br>Measure the length of the table. A runner normally hangs 15–20 cm over each end, though you can also keep it entirely on the tabletop.",
      "<strong>Trace the pattern</strong><br>Trace the body, including the points at both ends. It is long, so spread the fabric on the floor.",
      "<strong>Cut the pieces</strong><br>Cut 1 outer and 1 lining. Watch the direction of a one-way print.",
      "<strong>Finish the edges</strong><br>Not needed — it is turned right side out.",
    ],
    sew: [
      { h: "4-1. Sew outer and lining together", items: [
        "Place outer and lining right sides together and sew all the way round, leaving a 15 cm opening. Put the opening in the middle of a long side.",
        "Trim the seam allowance at the points aggressively, on the diagonal. Leave it in and the point turns out rounded and lumpy instead of sharp.",
        "Trim the corner allowances at the sides too.",
      ]},
      { h: "4-2. Turn and shape", items: [
        "Turn right side out through the opening. It is long, so work it through from one end a little at a time.",
        "Push the points out with an awl. Do not jab — you will go through the fabric. Coax them from the outside.",
        "Press flat. Rolling the lining 0.5 mm to the inside keeps the seam from showing on the front.",
      ]},
      { h: "4-3. Topstitch to finish", items: [
        "Fold the opening edges in.",
        "Topstitch 3–5 mm from the edge all the way round. That closes the opening too.",
        "It is a long straight run, so clip the layers together at intervals to stop them shifting.",
      ]},
    ],
    sewNote: "Be bold about trimming the seam allowance at the points. The sharper the angle, the more the leftover allowance bunches up inside. Cutting to within 1–2 mm of the stitching is fine. Skimp here and the point you went to the trouble of drafting comes out round.",
    tips: [
      "<strong>Length guide</strong>: the table length plus 15–20 cm at each end. If you are not letting it hang, make it 10 cm shorter than the table.",
      "<strong>Interfacing for body</strong>: a soft fabric ripples. Lightweight fusible interfacing on the outer lets it lie flat.",
      "<strong>Make the set</strong>: placemats in the same fabric pull the table together.",
    ],
    related: ["placemat", "tablecloth", "coaster"],
  },

  picnicmat: {
    title: "Picnic blanket", tab: "home", toolName: "Picnic blanket",
    sizeStep: "Enter the finished width, depth, corner radius and the strap length. Presets cover 2 people, 4 people and family size.",
    desc: "How to sew a picnic blanket. A water-resistant backing keeps the damp of the ground out. One main piece plus a strap to hold it rolled. Rounded corners fold neatly.",
    keywords: "picnic blanket,picnic mat,waterproof,how to sew,sewing pattern,outdoor,park",
    lead: "A fabric blanket to spread out at the park or on sports day. A water-resistant backing stops the damp of the ground coming through. Just one main piece and a strap to hold it rolled. Unlike a plastic sheet it does not crackle and it does not look like a plastic sheet. Rounded corners keep it from bulking up when folded.",
    matNote: "one blanket, for 4 people",
    materials: [
      "Outer fabric (canvas, heavy cotton or duck) — about 150 cm × 110 cm",
      "Backing fabric (water-resistant or laminated) — the same amount",
      "Hook-and-loop tape, 2.5 cm wide — 8 cm",
      "Optional: lightweight quilt batting for the middle",
    ],
    cut: [
      "<strong>Choose the size</strong><br>About 120 cm wide seats two adults, about 140 cm seats four. Allow for where the bags go too — slightly larger is more comfortable.",
      "<strong>Check the cut sizes</strong><br>It is large, so rather than printing the pattern, mark the measurements from the guide sheet straight onto the fabric. For the rounded corners, trace round a plate or a bowl.",
      "<strong>Cut the pieces</strong><br>Cut 1 outer, 1 backing and 1 strap — the strap comes out of the leftover outer fabric. If the fabric is not wide enough, join two widths for the body and offset the seam so it does not land in the middle.",
      "<strong>Handling laminated fabric</strong><br>Pins leave permanent holes in laminated fabric. Use clips. It cannot be pressed either.",
    ],
    sew: [
      { h: "4-1. Make the strap", items: [
        "Fold the strap in four (both edges to the center, then in half) and press.",
        "Topstitch 3 mm from both long edges.",
        "Sew the loop half of the hook-and-loop tape to one end on the front, and the hook half to the other end on the back.",
      ]},
      { h: "4-2. Sew with the strap caught in", items: [
        "Spread the outer right side up and baste the raw end of the strap halfway along one side, pointing inwards — where it comes round to when the blanket is rolled.",
        "Lay the backing on top, right sides together. With laminated fabric, hold it with clips.",
        "Sew all the way round, leaving a 25 cm opening. On something this big, leave a generous opening.",
      ]},
      { h: "4-3. How to sew laminated fabric", items: [
        "If the laminated face sticks to the presser foot, lay tracing paper over it, sew through both and tear the paper away afterwards.",
        "A Teflon foot is the reliable answer. Failing that, a strip of tape on the sole of an ordinary foot helps.",
        "The piece is large, so set a table in front of and to the left of the machine to support it. Unsupported, the weight drags the stitching off line.",
      ]},
      { h: "4-4. Turn and finish", items: [
        "Clip the seam allowance around the rounded corners every 1 cm.",
        "Turn right side out through the opening and shape the corners.",
        "Fold the opening edges in and topstitch 5 mm from the edge all the way round.",
        "A grid of quilting through the middle stops the two layers shifting. The bigger the blanket, the more it matters.",
      ]},
    ],
    sewNote: "Do not put pins through a laminated or coated backing. The holes never close, and water comes through them. Use clips, or keep pins strictly inside the seam allowance. Observe that one rule and the rest is just a large rectangle.",
    tips: [
      "<strong>Coat the back only</strong>: a water-resistant face on top makes it slippery to sit on. Ordinary canvas on top, coated fabric underneath.",
      "<strong>Add batting</strong>: lightweight batting in the middle saves you from hard ground, at the cost of weight. Weigh that against how far you carry it.",
      "<strong>It washes</strong>: unlike a plastic sheet you can put it through the machine, which changes how you feel about getting it out again.",
    ],
    related: ["tablecloth", "cushioncover", "kinchaku"],
  },

  yogamatbag: {
    title: "Yoga mat bag", tab: "bag", toolName: "Yoga mat bag",
    sizeStep: "Enter the diameter of the rolled mat, the mat length, the ease and the shoulder strap length. Presets cover standard, thick mats and short travel mats.",
    desc: "How to sew a yoga mat bag. One side piece, one round base and a shoulder strap. A drawstring casing at the top means no flap and no fastening.",
    keywords: "yoga mat bag,yoga mat carrier,drawstring,how to sew,sewing pattern,cylinder bag",
    lead: "A tube-shaped bag for a rolled yoga mat. One side piece, one round base and a shoulder strap. Make the top edge into a drawstring casing and it needs no flap and no fastening. It carries over the shoulder. Make it slightly roomier than a bought one and a sloppy roll still goes in.",
    matNote: "standard, for a 180 cm mat",
    materials: [
      "Main fabric (11 oz canvas, oxford cloth or duck) — about 110 cm wide × 230 cm",
      "Cord (5 mm round cord) — about 100 cm",
      "Webbing, 2.5 cm wide, if you prefer it for the strap — as given on the guide sheet",
      "Eyelets, 1 cm — 2 sets, for the cord exits",
    ],
    cut: [
      "<strong>Measure the mat</strong><br>Roll the mat the way you normally do and measure the diameter and the length. Rolling style makes a real difference — if you roll loosely, allow more diameter.",
      "<strong>Check the cut sizes</strong><br>The side is a rectangle and the base is a circle. Mark the side straight onto the fabric rather than printing it.",
      "<strong>Cut the pieces</strong><br>Cut 1 side, 1 round base and 1 shoulder strap. For the base, trace round a plate or a bowl.",
      "<strong>Finish the edges</strong><br>Zigzag the side seam allowance and the edge of the base.",
    ],
    sew: [
      { h: "4-1. Sew the side into a tube", items: [
        "Fold the side piece in half right sides together and sew the seam to form a tube.",
        "Leave the seam open from the top edge down to the notch. That gap is where the cord comes in and out.",
        "Press the seam allowance open and backstitch at the bottom of the gap.",
      ]},
      { h: "4-2. Attach the round base", items: [
        "Place the lower edge of the tube and the base right sides together.",
        "Pin at four points first — front, back and both sides — then fill in between. You are matching a circle to a straight edge, so distribute it evenly a little at a time.",
        "Sew all the way round. Clipping the tube's seam allowance every 5 mm helps it follow the circle.",
        "Zigzag the seam allowance.",
      ]},
      { h: "4-3. Make the drawstring casing", items: [
        "Fold the top edge over by 1 cm, then again by 3 cm.",
        "Stitch close to the fold all the way round. Make sure the gap you left in the side seam opens into this channel.",
        "Thread the cord and knot the ends.",
      ]},
      { h: "4-4. Attach the shoulder strap", items: [
        "Fold the strap in four and topstitch. If you are using webbing, use it as it is.",
        "Sew one end at the top of the side seam and the other beside the base on the same side. Stitch a box with a cross through it — that is the strongest.",
        "Load the mat and check the strap length on your shoulder. Shorten it if it hangs too low.",
      ]},
    ],
    sewNote: "When attaching the round base, pin the four quarter points before you pin anything else. Start sewing straight from one end and you will always have fabric left over at the finish. The circumference and the tube are drafted to the same length, but fabric stretches — distributing it evenly is the only trick there is.",
    tips: [
      "<strong>Be generous with the ease</strong>: how thick the roll ends up depends on how you roll it. Treat 2 cm of ease as the minimum.",
      "<strong>Use a heavy fabric</strong>: a mat is heavy and a light fabric gives way at the base. Choose 11 oz canvas or heavier.",
      "<strong>Eyelets for the cord</strong>: eyelets instead of a gap in the seam look neater and do not fray.",
    ],
    related: ["kinchaku", "roundkinchaku", "bostonbag"],
  },

  pincushion: {
    title: "Wrist pincushion", tab: "small", toolName: "Wrist pincushion",
    sizeStep: "Enter the cushion diameter, your wrist measurement and the strap width. Presets cover standard, small and child size.",
    desc: "How to sew a wrist pincushion. Two cushion circles and one strap, so you stop hunting for somewhere to put the pins. Made from scraps in half an hour.",
    keywords: "pincushion,wrist pincushion,sewing accessory,how to sew,sewing pattern,scrap project",
    lead: "A pincushion that straps to your wrist, so you stop hunting for somewhere to put the pins while you sew. Two cushion circles and one strap. Fill it with polyester stuffing, or with wool roving, which keeps needles sliding smoothly and helps them stay rust-free. Scraps are enough and it takes half an hour.",
    matNote: "one pincushion, standard size",
    materials: [
      "Fabric (cotton or linen) — about 15 cm × 25 cm",
      "Polyester stuffing, or wool roving — a small amount",
      "Hook-and-loop tape, 2 cm wide — 4 cm",
      "Thread",
    ],
    cut: [
      "<strong>Measure your wrist</strong><br>Measure at the narrowest point. The strap is that measurement plus 4 cm of overlap.",
      "<strong>Trace the pattern</strong><br>Trace the cushion circle and the strap. You can trace round a plate or a glass for the circle.",
      "<strong>Cut the pieces</strong><br>Cut 2 cushions and 1 strap.",
      "<strong>Finish the edges</strong><br>Not needed — it is turned right side out.",
    ],
    sew: [
      { h: "4-1. Make the strap", items: [
        "Fold the strap in four, press, and topstitch 3 mm from both long edges.",
        "Sew the loop half of the hook-and-loop tape to one end on the front, and the hook half to the other end on the back.",
        "Try it on your wrist. Too loose and it rotates while you work.",
      ]},
      { h: "4-2. Sew the cushion", items: [
        "Place the two cushion circles right sides together and sew all the way round, leaving a 3 cm opening.",
        "Clip the seam allowance every 1 cm around the curve. It is small, so keep the clips shallow — just the tips of the scissors.",
        "Turn right side out through the opening.",
      ]},
      { h: "4-3. Stuff it", items: [
        "Tear the stuffing into small pieces and feed them in. A chopstick or the handle of an awl pushes it right in.",
        "Pack it firmly. Loosely filled, the pins go all the way through and reach your wrist.",
        "The same goes for wool roving. The lanolin in wool helps keep needles from rusting.",
        "Close the opening with ladder stitch.",
      ]},
      { h: "4-4. Attach it to the strap", items: [
        "Hand-sew the cushion to the middle of the strap.",
        "Stitch right around the base of the cushion. A few tacking stitches will not do — it will swivel every time you push a pin in.",
        "Put it on and check that the cushion sits on the back of your hand.",
      ]},
    ],
    sewNote: "Pack the stuffing firmly. A soft pincushion lets a pin go in up to the head and press against your wrist. \"Does not give when you press it\" is the right density. Push a pin in a few times as you fill it and make sure the tip does not come out the other side.",
    tips: [
      "<strong>Wool roving</strong>: the lanolin in wool keeps needles from rusting and makes them slide in more easily. Craft shops sell it in small quantities.",
      "<strong>Cushion on the outside</strong>: mounted on the inside of the wrist it hits the table every time you rest your hand.",
      "<strong>As a gift</strong>: small, takes no space, and anyone who sews will actually use it. Scraps are all you need.",
    ],
    related: ["shuushu", "headband", "coaster"],
  },

  machinecover: {
    title: "Sewing machine cover", tab: "home", toolName: "Sewing machine cover",
    sizeStep: "Enter the machine's width, depth and height, plus the ease. Presets cover domestic, compact and large machines.",
    desc: "How to sew a cover for a sewing machine. One piece runs from the front over the top to the back, with two side panels — only two shapes to cut.",
    keywords: "sewing machine cover,dust cover,how to sew,sewing pattern,sewing room,storage",
    lead: "A fabric cover to put over the sewing machine when it is not in use. No dust settles on it, and it stops looking like clutter even left out. One piece runs from the front over the top to the back, plus two side panels — only two shapes to cut. A good first project for anyone who has just bought a machine.",
    matNote: "one cover, domestic machine",
    materials: [
      "Main fabric (linen, canvas or heavy cotton) — about 110 cm wide × 110 cm",
      "Optional: lining fabric — the same amount",
      "Optional: matching fabric for a pocket, to hold the feet and accessories",
      "Bias tape for the hem — about 200 cm",
    ],
    cut: [
      "<strong>Measure the machine</strong><br>Measure the width, depth and height. Measure the height with the spool pin folded down — measured upright, the cover comes out so large it slides off.",
      "<strong>Check the cut sizes</strong><br>Everything is a rectangle, so rule the measurements from the guide sheet straight onto the fabric.",
      "<strong>Cut the pieces</strong><br>Cut 1 wrap (front, top and back in one) and 2 side panels.",
      "<strong>Finish the edges</strong><br>Zigzag the seam allowances. Not needed if you are lining it.",
    ],
    sew: [
      { h: "4-1. Add a pocket (optional)", items: [
        "Sew a pocket onto the part that will be the front. It gives the presser feet and a small screwdriver somewhere to live.",
        "Hem the top edge of the pocket first.",
        "Do it with the wrap laid out flat. Once assembled you cannot reach it.",
      ]},
      { h: "4-2. Attach the side panels", items: [
        "Place one long edge of the wrap and one side panel right sides together.",
        "Pin the notches on the wrap — the points that land on the front and back corners of the top — to the corners of the side panel. Between the notches corresponds to the top.",
        "At each corner, stop with the needle down, clip into the wrap's seam allowance and pivot 90°.",
        "Attach the second side panel the same way.",
      ]},
      { h: "4-3. Finish the hem", items: [
        "Double-fold the hem by 1 cm and then 2 cm and stitch.",
        "If you are lining it, sew outer and lining right sides together at the hem, turn and topstitch.",
        "Binding the hem with bias tape is another option, and easier with a heavy fabric.",
      ]},
      { h: "4-4. Try it on", items: [
        "Turn right side out and put it over the machine.",
        "Check that the handwheel and the levers are not caught and that the hem does not ride up.",
        "If it is tight, take less in the side seams; if it is loose, take more.",
      ]},
    ],
    sewNote: "Fold the spool pin down before you measure the height. Measured upright it reads more than 10 cm too tall and the finished cover swims. If your machine has a fixed upright pin, measure to that height instead.",
    tips: [
      "<strong>The pocket earns its place</strong>: a pocket on the front holds the presser feet and bobbins, and the clutter around the machine stops accumulating.",
      "<strong>Lining is optional</strong>: it changes nothing functionally. Bind the hem and a single layer is plenty.",
      "<strong>Use leftovers</strong>: made from the offcuts of something you sewed and liked, it lifts the mood every time you get the machine out.",
    ],
    related: ["boxcover", "fabricbasket", "cutlerycase"],
  },

  kidscape: {
    title: "Kids' cape", tab: "kids", toolName: "Kids' cape",
    sizeStep: "Enter the length, the hem circumference, the neck measurement, the collar height and the tie length. Presets cover 100, 120 and 140 cm.",
    desc: "How to sew a kids' cape. A rectangle gathered at the neck into a collar band, tied at the throat. Straight cutting only — good for Halloween or a school play.",
    keywords: "kids cape,child cape,halloween costume,dress up,how to sew,sewing pattern",
    lead: "A cape for dressing up or for warmth. A rectangle gathered at the neck into a collar band, tied at the throat. Because it ties, it fits even when the size is not exact. Straight cutting only — no sleeves, no fitting. You can start it the night before Halloween and finish it.",
    matNote: "one cape, size 120",
    materials: [
      "Main fabric (satin, felt, fleece or cotton) — about 110 cm wide × 160 cm",
      "Optional: lining fabric (a contrasting color looks convincing)",
      "Thread",
    ],
    cut: [
      "<strong>Choose the length</strong><br>Measure from the base of the neck to where you want the hem. Mid-calf moves well; floor length gets stepped on.",
      "<strong>Trace the pattern</strong><br>Trace the body, the collar and the ties. Place the body with the center back on the fold. Everything is a rectangle.",
      "<strong>Cut the pieces</strong><br>Cut 1 body on the fold, 1 collar in the outer and 1 in the lining, and 2 ties.",
      "<strong>Finish the edges</strong><br>The hem and front edges are double-folded, so nothing is needed there. Zigzag the top edge so it does not fray while you gather it.",
    ],
    sew: [
      { h: "4-1. Hem the front edges and the bottom", items: [
        "Double-fold the front edges by 1 cm and 1 cm again and stitch.",
        "Then hem the bottom by 1 cm and 2 cm.",
        "Do this first. Once the collar is on, the fabric is awkward to turn under the machine.",
        "Satin slips, so press the folds firmly before you stitch.",
      ]},
      { h: "4-2. Gather the top edge", items: [
        "Sew two rows of long machine stitches (about 4 mm) at 5 mm and 1 cm from the top edge. Do not backstitch.",
        "Pull both top threads together to gather the fabric. Work from one side at a time.",
        "Gather until it matches the length of the collar. You are pulling a hem of roughly four times the neck measurement into the neck, so expect a lot of fullness.",
        "Run your fingers along to spread the gathers evenly rather than letting them bunch.",
      ]},
      { h: "4-3. Attach the collar", items: [
        "Fold the ties in four and topstitch.",
        "Place the outer collar and the gathered top edge right sides together and sew, catching the end of a tie at each end.",
        "Lay the collar lining on, and sew the top edge and both ends.",
        "Turn right side out, fold the lining's seam allowance under and slipstitch it to the seam line.",
      ]},
      { h: "4-4. Finish", items: [
        "Topstitch 3 mm from the edge all the way round the collar.",
        "Pull out the long gathering stitches wherever they still show.",
        "Try it on and check that the neck is not tight and the length is not too long.",
      ]},
    ],
    sewNote: "Always sew two rows of gathering stitches, not one. With a single row the fabric twists as you pull and the gathers slide to one side. With the fabric held between two rows, the folds stay upright and even. Pull a little from each end alternately.",
    tips: [
      "<strong>Black satin for Halloween</strong>: line it in red and the flash of color as it swings sells the whole costume. Felt needs no edge finishing at all.",
      "<strong>Fleece for winter</strong>: made in fleece it becomes a genuinely warm layer, and fleece does not fray so the hems can be left raw.",
      "<strong>Add a hood</strong>: swap the collar for a hood and you have Red Riding Hood or a wizard. A hood is just two half-circles sewn together.",
    ],
    related: ["poncho", "babycape", "smock"],
  },

  toiletcover: {
    title: "Toilet lid cover", tab: "home", toolName: "Toilet lid cover",
    sizeStep: "Enter the lid width, the lid length and the ease. Presets cover standard, long narrow and large lids.",
    desc: "How to sew a toilet lid cover. Elastic through the edge means it pulls on and stays. Outer and lining, so you can match it to the rest of the room.",
    keywords: "toilet lid cover,toilet seat cover,bathroom,how to sew,sewing pattern,home decor",
    lead: "A fabric cover for a toilet lid. Elastic through the edge means it simply pulls on and stays put. Outer and lining. Bought ones come in whatever print they come in; making your own means matching the rest of the room. Make two and you always have a clean one while the other is in the wash.",
    matNote: "one cover, standard size",
    materials: [
      "Outer fabric (cotton, linen or quilted cotton) — about 50 cm × 60 cm",
      "Lining fabric (terry or a pile fabric grips better) — the same amount",
      "Flat elastic, 8 mm wide — about 120 cm",
      "A bodkin (or a safety pin)",
    ],
    cut: [
      "<strong>Measure the lid</strong><br>Measure the width at the widest point and the length front to back, including the curve of the rim. Sizes vary a lot between makers, so measure your own.",
      "<strong>Trace the pattern</strong><br>Trace the body. It is an egg shape, slightly narrower at the hinge end. Mark which end is which so you do not get it the wrong way round.",
      "<strong>Cut the pieces</strong><br>Cut 1 outer and 1 lining.",
      "<strong>Finish the edges</strong><br>Not needed — it is turned right side out.",
    ],
    sew: [
      { h: "4-1. Sew outer and lining together", items: [
        "Place outer and lining right sides together and sew all the way round, leaving a 12 cm opening.",
        "Clip the seam allowance every 1 cm around the curve. The curve is tight, so skipping this makes it pull when turned.",
        "Turn right side out through the opening and press.",
      ]},
      { h: "4-2. Make the elastic channel", items: [
        "Topstitch 1.5 cm in from the edge, all the way round. The space between that line and the edge is the channel.",
        "Leave the section at the opening unstitched — that is where the elastic goes in.",
        "Make the channel at least 5 mm wider than your elastic. Any narrower and it will not feed through.",
      ]},
      { h: "4-3. Thread and gather the elastic", items: [
        "Feed the flat elastic all the way round with the bodkin, starting at the opening.",
        "Cut the elastic to about 85% of the actual circumference. Too long and it will not grip; too short and the lid will not close.",
        "Overlap the ends by 2 cm and stitch them together.",
      ]},
      { h: "4-4. Fit it and check", items: [
        "Close the opening with ladder stitch.",
        "Fit it over the lid and check that the elastic has pulled right around the underside of the rim.",
        "Close the lid and make sure nothing is trapped between lid and seat. If it lifts there, it will shift every time it is used.",
      ]},
    ],
    sewNote: "Cut the elastic to about 85% of the circumference. Going shorter to make it \"nice and tight\" stops the lid closing fully; going longer means it slides off every time the lid is raised. Thread it, try it on the lid, adjust, and only then stitch the ends. Before they are stitched you can change your mind as often as you like.",
    tips: [
      "<strong>Terry for the lining</strong>: a smooth lining slides around on the lid. Terry or pile grips.",
      "<strong>Make two</strong>: with nothing to put on while one is in the wash, you stop using it. Make the spare from the start.",
      "<strong>Match the mat</strong>: a bathroom mat in the same fabric pulls a small room together.",
    ],
    related: ["cushioncover", "chaircover", "zabuton"],
  },

  camerastrap: {
    title: "Camera strap", tab: "small", toolName: "Camera strap",
    sizeStep: "Enter the overall length, the finished strap width, the shoulder pad length and the attachment tab width. Presets cover standard, short and wide.",
    desc: "How to sew a camera strap. Three pieces: the strap, a shoulder pad and two attachment tabs. Batting in the pad stops it digging into your neck.",
    keywords: "camera strap,neck strap,DSLR strap,how to sew,sewing pattern,photography,handmade",
    lead: "A neck strap for a camera. Three pieces: the strap itself, a pad for where it sits on your shoulder, and two tabs that attach to the camera. Bought straps come in black; this one can be any fabric you like. Batting in the pad means even heavy gear stops digging in.",
    matNote: "one strap",
    materials: [
      "Main fabric (8 oz canvas, heavy cotton or denim) — about 110 cm wide × 30 cm",
      "Lining fabric for the shoulder pad — about 40 cm × 15 cm",
      "Quilt batting — about 40 cm × 15 cm",
      "Lightweight fusible interfacing — enough for the strap and the tabs",
    ],
    cut: [
      "<strong>Choose the length</strong><br>Standard is the length that puts the camera at the base of your sternum when worn around the neck. Measuring a strap you already own is the surest way. Add about 20 cm to wear it crossbody.",
      "<strong>Trace the pattern</strong><br>Trace the strap, the shoulder pad and the attachment tabs. All are rectangles.",
      "<strong>Cut the pieces</strong><br>Cut 1 strap, 1 shoulder pad in the outer, 1 in the lining, 1 in batting, and 2 tabs.",
      "<strong>Fuse the interfacing</strong><br>Fuse lightweight interfacing to the strap and the tabs. These carry the weight of the camera, so they must not stretch.",
    ],
    sew: [
      { h: "4-1. Make the strap", items: [
        "Fold the strap in four (both edges to the center, then in half) and press.",
        "Topstitch 3 mm from both long edges. It is long, so release the clips as you go and keep it straight.",
        "Canvas folded in four gets thick. Increase the presser foot pressure and change to a size 90/14 needle or heavier.",
      ]},
      { h: "4-2. Make the attachment tabs", items: [
        "Fold each tab in four and topstitch. Make both the same.",
        "The tabs are narrow, so press the folds and hold them with clips rather than trying to fold as you sew.",
        "Every bit of the camera's weight lands here. Topstitch both long edges without exception.",
      ]},
      { h: "4-3. Make the shoulder pad", items: [
        "Place the pad's outer and lining right sides together with the batting behind.",
        "Sew all round except one long edge, and turn right side out.",
        "Wrap the pad around the middle of the strap, fold the open edge under, and stitch through the strap as you close it.",
        "Stitch both ends of the pad to the strap as well so it cannot slide.",
      ]},
      { h: "4-4. Attach the tabs", items: [
        "Overlap one end of a tab onto the end of the strap and stitch a box with a cross through it. That is the strongest way to do it.",
        "Thread the other end through the camera's strap lug, fold it back and stitch it the same way.",
        "Hang the camera on it and inspect the stitching. If you have any doubt at all, sew it again.",
      ]},
    ],
    sewNote: "Attach the tabs with a box stitch — a rectangle with a cross through it. Every bit of the camera's weight passes through those four points. A single line of stitching, or backstitching alone, eventually gives way and drops the camera. Use a heavier polyester thread too.",
    tips: [
      "<strong>Length guide</strong>: worn on the neck, the camera should sit at the base of your sternum. Add 20 cm for crossbody. Measuring a strap you own is quickest.",
      "<strong>The pad is optional</strong>: for a light compact camera, the strap and tabs alone are fine. Add it for a DSLR.",
      "<strong>Use hardware</strong>: swivel hooks and rings let you take the strap off, which is handy on a tripod.",
    ],
    related: ["nametag", "phonepouch", "keycase"],
  },
};
