/* ============================================================
   Inject the star-technique figure into each JP howto-<key>.html,
   inside <section id="sew">, just before its closing </section>.
   Idempotent: content between the START/END markers is (re)written,
   so re-running updates the figure rather than duplicating it.
   Run:  node scripts/inject-howto-figs.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const { FIG_MAP, figFor } = require("./howto-figs.js");

const ROOT = path.join(__dirname, "..");
const START = "<!-- howto-fig:START -->";
const END = "<!-- howto-fig:END -->";

let done = 0, skipped = 0;
for (const key of Object.keys(FIG_MAP)) {
  const file = path.join(ROOT, `howto-${key}.html`);
  if (!fs.existsSync(file)) { skipped++; console.warn("skip (missing):", key); continue; }
  let html = fs.readFileSync(file, "utf8");
  const fig = figFor(key, "ja");
  if (!fig) { skipped++; continue; }
  const block = `    ${START}\n    ${fig}\n    ${END}\n`;

  if (html.includes(START)) {
    // replace existing injected block
    const re = new RegExp("[ \\t]*" + START + "[\\s\\S]*?" + END + "\\n?");
    html = html.replace(re, block);
  } else {
    // insert before the first </section> after <section id="sew">
    const sewIdx = html.indexOf('<section id="sew">');
    if (sewIdx < 0) { skipped++; console.warn("skip (no sew section):", key); continue; }
    const closeIdx = html.indexOf("</section>", sewIdx);
    if (closeIdx < 0) { skipped++; console.warn("skip (no close):", key); continue; }
    html = html.slice(0, closeIdx) + block + "  " + html.slice(closeIdx);
  }
  fs.writeFileSync(file, html);
  done++;
}
console.log(`injected/updated ${done} JP how-to pages (skipped ${skipped}).`);
