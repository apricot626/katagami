/* ============================================================
   Pinterest pin generator — vertical 2:3 (1000×1500) images.
   Renders scripts/pin-template.html?p=<key>&lang=<ja|en> and
   screenshots #pin into pins/<key>.png (JP) and pins/en/<key>.png (EN).

   Requires a local static server at repo root and a Japanese font
   with bold weights (e.g. Noto Sans JP) installed so headings render
   bold. Run:
     (cd repo && python3 -m http.server 8096 &) ; node scripts/gen-pins.js
   ============================================================ */
const { chromium } = require(require("path").join(__dirname, "..", "node_modules", "playwright-core"));
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PORT = process.env.PIN_PORT || 8096;

// resolve a chrome binary under PLAYWRIGHT_BROWSERS_PATH (version-agnostic)
function findChrome() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  try {
    for (const d of fs.readdirSync(base)) {
      const p = path.join(base, d, "chrome-linux", "chrome");
      if (fs.existsSync(p)) return p;
    }
  } catch (e) {}
  return undefined; // fall back to Playwright's default
}

// load PATTERNS from patterns.js to know the keys
let src = fs.readFileSync(path.join(ROOT, "patterns.js"), "utf8")
  .replace(/\bconst PATTERNS=/, "globalThis.PATTERNS=")
  .replace(/window\./g, "globalThis._w_");
(0, eval)(src);
const keys = Object.keys(globalThis.PATTERNS);

(async () => {
  fs.mkdirSync(path.join(ROOT, "pins"), { recursive: true });
  fs.mkdirSync(path.join(ROOT, "pins", "en"), { recursive: true });
  const exe = findChrome();
  const b = await chromium.launch(exe ? { executablePath: exe } : {});
  let n = 0, errs = [];
  for (const lang of ["ja", "en"]) {
    for (const k of keys) {
      const p = await b.newPage({ viewport: { width: 1000, height: 1500 }, deviceScaleFactor: 1 });
      const e = []; p.on("pageerror", x => e.push(x.message));
      await p.goto(`http://localhost:${PORT}/scripts/pin-template.html?p=${k}&lang=${lang}`, { waitUntil: "networkidle" });
      await p.waitForTimeout(150);
      const out = lang === "en" ? path.join(ROOT, "pins", "en", k + ".png") : path.join(ROOT, "pins", k + ".png");
      await (await p.$("#pin")).screenshot({ path: out });
      if (e.length) errs.push(`${lang}/${k}:${e[0]}`);
      await p.close(); n++;
    }
  }
  await b.close();
  console.log(`generated ${n} pins (${keys.length} × 2 langs) | errors:`, errs.length ? errs : "none");
})();
