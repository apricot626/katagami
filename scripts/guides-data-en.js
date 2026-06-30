/* English versions of the お役立ちガイド (tips guides). Output into en/ by gen-guides.js. */
module.exports = [
  {
    slug: "guide-print",
    title: "How to print sewing patterns at actual size (100%, no scaling)",
    h1: "Printing patterns at actual size",
    desc: "How to print PDF/home sewing patterns at true 100% size on Letter or A4. Turn off “Fit to page”, set scale to 100%, and check the calibration box. Fixes patterns that print too small.",
    keywords: "print sewing pattern,actual size,100%,no scaling,fit to page,letter,A4,pattern prints too small",
    lead: "The most common problem with home-printed patterns is “it printed the wrong size.” Almost always the cause is the printer's <strong>automatic shrink-to-fit</strong>. Here's how to print at true actual size and confirm it worked.",
    sections: [
      { id: "why", h2: "1. Why patterns print the wrong size",
        html: `<p>PDF and browser print dialogs often default to <strong>“Fit to page” / “Shrink oversized pages”</strong>, which scales the artwork down a few percent to fit the margins. Even a few millimetres of shrink changes the fit of a garment or bag.</p>
        <p>The fix is simple: set the <strong>scale to 100% (actual size)</strong> and turn <strong>off</strong> any fit options.</p>` },
      { id: "settings", h2: "2. The correct print settings",
        html: `<h3>Chrome / Edge</h3>
        <ol class="steps">
          <li>Set the destination to your printer (or “Save as PDF”).</li>
          <li>Open <strong>More settings</strong> and set <strong>Scale → Custom → 100</strong> (the “Default” option can silently shrink).</li>
          <li><strong>Uncheck “Fit to page / Fit to printable area”.</strong></li>
          <li>Confirm the paper size is correct (<strong>Letter</strong> in the US, <strong>A4</strong> elsewhere) and print.</li>
        </ol>
        <h3>Firefox / Preview (Mac)</h3>
        <ol class="steps">
          <li>Set <strong>Scale to 100%</strong>.</li>
          <li>Turn off “Shrink to fit” / “Scale to fit”.</li>
        </ol>
        <p class="note">✏️ To save as PDF, choose “Save as PDF” and still set 100% — you can then print at actual size later, even at a copy shop.</p>` },
      { id: "calibration", h2: "3. Always check the calibration box",
        html: `<p>Even with the right settings, a printer's margin handling can shrink things slightly, so <strong>measure after printing</strong>.</p>
        <p>Every Katagami pattern includes a <strong>50&nbsp;mm calibration box</strong> and a <strong>0–100&nbsp;mm ruler</strong> on the first guide sheet. Measure the box with a ruler: if it is exactly <strong>50&nbsp;mm (about 2&nbsp;in)</strong>, you're good to go.</p>
        <ul>
          <li>50 mm → print is correct</li>
          <li>48–49 mm → fit-to-page is still on; recheck 100% scale</li>
          <li>Too big → remove any enlargement setting</li>
        </ul>` },
      { id: "trouble", h2: "4. Still not right? Checklist",
        html: `<ul>
          <li><strong>Printer driver scaling</strong>: the OS/driver dialog may have its own “fit to page”. Turn it off too.</li>
          <li><strong>Borderless mode</strong>: borderless printing can enlarge the image — use normal printing.</li>
          <li><strong>Wrong paper size</strong>: printing A4 data on Letter (or vice-versa) shrinks it. Match the data to the paper — in Katagami, choose your paper in the tool.</li>
          <li><strong>Printing from a phone</strong>: many apps can't set scale. Save to PDF first, then print.</li>
        </ul>` }
    ],
    faq: [
      { q: "It still prints the wrong size at 100%.", a: "Your printer driver may also have a “fit to page” option. Turn off scaling in both the browser/app and the driver, then measure the calibration box to confirm." },
      { q: "The calibration box measures about 48 mm.", a: "That's roughly 4% shrink, usually from fit-to-page. Always set the scale to exactly 100% (Custom), not the default option." },
      { q: "Can I print at a copy shop?", a: "Yes. Save as PDF at 100%, then print “actual size / 100%” on the shop's machine. Check the calibration box the same way." }
    ],
    related: [
      { href: "guide-assembly.html", label: "Assembling tiled sheets" },
      { href: "guide-seam-allowance.html", label: "How much seam allowance?" },
      { href: "tool.html", label: "Open the pattern tool" }
    ]
  },

  {
    slug: "guide-assembly",
    title: "How to assemble tiled A4 / Letter pattern sheets",
    h1: "Assembling tiled pattern sheets",
    desc: "How to join home-printed pattern sheets into one piece: the order to lay them out (row/column codes), how to overlap the seam allowance, and tips for a straight, accurate join.",
    keywords: "assemble pattern,tiled pattern,join A4 sheets,letter,overlap,pattern assembly,print at home",
    lead: "A large pattern is printed across several sheets and joined into one. There are really only two things to get right: <strong>the order you lay the sheets out</strong> and <strong>how you overlap them</strong>.",
    sections: [
      { id: "order", h2: "1. Lay the sheets out (top-left, across, then down)",
        html: `<p>Each sheet has a <strong>row/column code</strong> in the corner (1A, 2A… / 1B, 2B…). Starting from <strong>1A at the top-left, go right, then to the next row</strong> to see the whole layout.</p>
        <p>Katagami prints an <strong>assembly map</strong> (a mini diagram) on the first guide sheet, and each tile also shows its neighbours (“→ to 2A”, “↓ to 1B”). Lay everything out on a floor or table first.</p>` },
      { id: "overlap", h2: "2. Overlap the join",
        html: `<p>Adjacent sheets are made to <strong>overlap by about 10&nbsp;mm</strong>. When overlapping, line up the <strong>dashed content border and the grid lines</strong> exactly.</p>
        <ol class="steps">
          <li>Lay the right-hand sheet <strong>on top of</strong> the left one, over its border.</li>
          <li>Slide it until the grid and the drawn lines run continuously, then fix in place.</li>
          <li>Holding the join up to a <strong>window or bright light</strong> makes it easy to see the lines align.</li>
        </ol>
        <p class="note">✏️ Trimming a few mm off the overlapping margin first gives a flatter, neater join.</p>` },
      { id: "glue", h2: "3. Tools and order",
        html: `<ul>
          <li><strong>Tools</strong>: masking tape (easy to redo) / glue stick / clear tape.</li>
          <li><strong>Order</strong>: join one horizontal row first, then join the rows top-to-bottom — this keeps errors from adding up.</li>
          <li>Once it's all joined, cut along the outer <strong>cutting line (solid)</strong>.</li>
        </ul>` },
      { id: "trouble", h2: "4. Common mistakes",
        html: `<ul>
          <li><strong>It drifts and the last sheet won't match</strong>: you must <strong>overlap</strong> the 10&nbsp;mm margin, not butt the edges together.</li>
          <li><strong>Everything is slightly small</strong>: likely it didn't print at actual size — check the <a href="guide-print.html">printing settings</a> and calibration box first.</li>
          <li><strong>Unsure of the order</strong>: use the assembly map and the corner codes on each sheet.</li>
        </ul>` }
    ],
    faq: [
      { q: "Do I butt the edges or overlap them?", a: "Overlap. Adjacent sheets share about a 10 mm overlap, so layer them until the lines run straight. Butting the edges makes the whole pattern smaller." },
      { q: "Should I trim before joining?", a: "Trim a few mm off the margin of the sheet that goes on top to reduce the step. Cut the actual cutting line only after everything is joined." },
      { q: "There are so many sheets.", a: "Use a smaller finished size, or start with the pieces that need fewer sheets. Katagami shows the sheet count before you print." }
    ],
    related: [
      { href: "guide-print.html", label: "Printing at actual size" },
      { href: "guide-seam-allowance.html", label: "How much seam allowance?" },
      { href: "tool.html", label: "Open the pattern tool" }
    ]
  },

  {
    slug: "guide-seam-allowance",
    title: "How much seam allowance? A by-area guide for beginners",
    h1: "How much seam allowance?",
    desc: "Seam allowance basics and recommended amounts by area (sides, hems, armholes, curves). The difference between the seam line and cutting line, and how to add seam allowance.",
    keywords: "seam allowance,how much,by area,seam line,cutting line,sewing basics,beginner",
    lead: "Seam allowance is the <strong>extra you add outside the finished (seam) line</strong> for sewing. The right amount varies by area. Here's a quick reference and tips for adding it cleanly.",
    sections: [
      { id: "what", h2: "1. What seam allowance is (two lines)",
        html: `<p>A pattern has two outlines: the <strong>seam line</strong> (the finished shape) and, outside it, the <strong>cutting line</strong> (where you cut). The <strong>gap between them is the seam allowance</strong>.</p>
        <p>In Katagami you can set the seam allowance with a <strong>slider (0–3&nbsp;cm)</strong>, show or hide the seam line, and the pattern is output <strong>with the allowance included</strong> — no need to add it by hand.</p>` },
      { id: "table", h2: "2. Recommended amounts by area",
        html: `<table class="g-table">
          <thead><tr><th>Area</th><th>Amount</th><th>Note</th></tr></thead>
          <tbody>
            <tr><td>Straight seams (sides, shoulders)</td><td>1.0–1.5 cm (3/8–5/8 in)</td><td>Standard; press open or to one side</td></tr>
            <tr><td>Hems, cuffs</td><td>2–4 cm (3/4–1 1/2 in)</td><td>Extra for folding under</td></tr>
            <tr><td>Neckline / armhole curves</td><td>0.7–1.0 cm (1/4–3/8 in)</td><td>Narrow is easier to finish</td></tr>
            <tr><td>Zipper insertion</td><td>1.0–1.5 cm (3/8–5/8 in)</td><td>Match the tape width</td></tr>
            <tr><td>Bag / pouch openings</td><td>1–3 cm (3/8–1 1/4 in)</td><td>Depends on the fold-over</td></tr>
            <tr><td>Tight curves</td><td>0.5–0.7 cm (1/4 in)</td><td>Clip to turn smoothly</td></tr>
          </tbody>
        </table>
        <p class="note">✏️ Beginners: using <strong>1.0–1.5 cm</strong> everywhere is easy to remember and forgiving.</p>` },
      { id: "how", h2: "3. How to add seam allowance",
        html: `<ol class="steps">
          <li><strong>By hand</strong>: draw a line <strong>parallel</strong> to the seam line, the chosen distance outside it, on every edge. A grid ruler helps.</li>
          <li><strong>Corners</strong>: extend the lines to their intersection, or fold the excess in after sewing.</li>
          <li><strong>Automatically</strong>: in Katagami, just pick a value and an even allowance is added all around.</li>
        </ol>` },
      { id: "curve", h2: "4. Clean curves and corners",
        html: `<ul>
          <li><strong>Outer curves (armholes)</strong>: clip small notches into the allowance so it doesn't pull when turned.</li>
          <li><strong>Inner curves</strong>: cut small V-notches out before turning to reduce bulk.</li>
          <li><strong>Corners</strong>: trim the corner of the allowance diagonally before turning for a sharp point.</li>
        </ul>` }
    ],
    faq: [
      { q: "Should the seam allowance be the same everywhere?", a: "Use 1–1.5 cm on straight seams and more (2–4 cm) on hems for folding. If unsure, 1.5 cm everywhere works fine." },
      { q: "Do I cut on the seam line or the cutting line?", a: "Cut the fabric on the outer cutting line; sew on the inner seam line. Katagami can show both." },
      { q: "Same allowance for knits?", a: "Knits stretch, so 0.7–1.0 cm is easy to handle, especially if you finish with a serger." }
    ],
    related: [
      { href: "yougoshu.html", label: "Sewing glossary" },
      { href: "guide-print.html", label: "Printing at actual size" },
      { href: "tool.html", label: "Open the pattern tool" }
    ]
  }
];
