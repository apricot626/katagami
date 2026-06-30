/* English how-to content. Keyed by pattern key (matches PATTERNS / i18n NAME). */
module.exports = {

  tote: {
    title: "Tote bag",
    tab: "bag",
    toolName: "Tote bag",
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
  }

};
