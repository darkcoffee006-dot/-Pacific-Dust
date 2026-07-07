/**
 * bake-print.mjs — v2
 *
 * UV atlas analysis shows:
 *   Front body panel (gold/Mesh 3) = bottom-right of texture
 *   U: 0.52 → 0.96  (center ~0.72)
 *   V: 0.35 → 0.95  (center ~0.62, chest ~0.45)
 *
 *   Texture is 1024×1024.
 *   V is flipped in sharp (V=0 = top of image, V=1 = bottom).
 *   So chest center on texture:
 *     x = 0.72 * 1024 ≈ 737
 *     y = (1 - 0.45) * 1024 ≈ 563
 *
 * Print design (matches reference image):
 *   - "pacific" large bold italic gold serif — widest element
 *   - kangaroo silhouette overlapping the letters
 *   - "dust" smaller centered below
 */

import { NodeIO } from "@gltf-transform/core";
import sharp from "sharp";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SIZE = 1024;
const GOLD = "#C9A84C";

// Front panel spans U:0.52-0.96 (x:532-983), V:0.35-0.95
// Center of front panel: U=0.74 → x=758, V=0.72 (chest) → y=287
const CX = Math.round(0.74 * SIZE);   // 758 — horizontal center of front panel
const CY = Math.round((1 - 0.72) * SIZE); // 287 — chest height

console.log(`Front chest center on texture: (${CX}, ${CY})`);

// Print fits inside front panel width (450px) with padding
const PRINT_W = 400;
const PRINT_H = 240;

const printSVG = `<svg width="${PRINT_W}" height="${PRINT_H}" xmlns="http://www.w3.org/2000/svg">
  <text
    x="${PRINT_W / 2}"
    y="140"
    font-family="Georgia, serif"
    font-size="130"
    font-weight="bold"
    font-style="italic"
    fill="${GOLD}"
    text-anchor="middle"
    opacity="0.92"
  >pacific</text>
  <text
    x="${PRINT_W / 2}"
    y="205"
    font-family="Georgia, serif"
    font-size="42"
    font-weight="400"
    font-style="italic"
    fill="${GOLD}"
    text-anchor="middle"
    opacity="0.78"
    letter-spacing="12"
  >dust</text>
</svg>`;

// Render SVG text layer
const textBuf = await sharp(Buffer.from(printSVG))
  .png()
  .toBuffer();

// ── 2. Load kangaroo, resize to fit between letters ─────────
const kangBuf = readFileSync(
  resolve(ROOT, "public/images/kangaro-removebg-preview.png")
);
// Kangaroo at 150px — proportional to new print size
const kangResized = await sharp(kangBuf)
  .resize(150, 150, { fit: "contain", background: { r:0, g:0, b:0, alpha:0 } })
  .png()
  .toBuffer();

const printComposite = await sharp(textBuf)
  .composite([{
    input: kangResized,
    top:   -10,
    left:  Math.round(PRINT_W * 0.46 - 75),
    blend: "over",
  }])
  .png()
  .toBuffer();

// ── 4. Build the full 1024×1024 texture ─────────────────────
// Cream base, then composite the print at chest center
const creamBase = await sharp({
  create: {
    width: SIZE, height: SIZE, channels: 4,
    background: { r: 237, g: 232, b: 220, alpha: 255 }, // #EDE8DC
  }
}).png().toBuffer();

// Position print centered on chest UV
const printLeft = CX - Math.round(PRINT_W / 2);
const printTop  = CY - Math.round(PRINT_H / 2);

console.log(`Print positioned at: left=${printLeft}, top=${printTop}`);

const finalTexture = await sharp(creamBase)
  .composite([{
    input: printComposite,
    top:   printTop,
    left:  printLeft,
    blend: "over",
  }])
  .png()
  .toBuffer();

// Save a preview so we can check it in the browser
await sharp(finalTexture)
  .toFile(resolve(ROOT, "public/images/print-preview.png"));
console.log("Preview: http://localhost:3000/images/print-preview.png");

// ── 5. Patch GLB and write ───────────────────────────────────
const io  = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));
const root = doc.getRoot();

const texture = doc.createTexture("print")
  .setImage(finalTexture)
  .setMimeType("image/png");

root.listMaterials().forEach((mat) => {
  mat.setBaseColorFactor([1, 1, 1, 1]); // white so texture shows true
  mat.setMetallicFactor(0.0);
  mat.setRoughnessFactor(0.85);
  mat.setBaseColorTexture(texture);
});

await io.write(
  resolve(ROOT, "public/oversized_t-shirt-printed.glb"),
  doc
);
console.log("Done: public/oversized_t-shirt-printed.glb");
