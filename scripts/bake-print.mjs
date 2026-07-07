/**
 * bake-print.mjs — v5 (CORRECTED UV MAPPING)
 *
 * glTF UV convention: V=0 is BOTTOM of texture, V=1 is TOP
 * Sharp image convention: Y=0 is TOP of image, Y increases downward
 * Conversion: pixel_Y = (1 - UV_V) * SIZE
 *
 * Front panel (gold, Mesh 3) UV range:
 *   U: 0.52 → 0.96   →  pixel X: 532 → 983   center_X = 757
 *   V: 0.35 → 0.93   →  pixel Y: 72  → 666    (collar at Y=72, hem at Y=666)
 *
 * Chest center: V ≈ 0.78 → pixel Y = (1-0.78)*1024 = 225
 * Upper chest:  V ≈ 0.82 → pixel Y = (1-0.82)*1024 = 184
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

// Chest center — 35% down the front panel from collar
// Panel: y 72–666, chest at 72 + 594*0.35 = 280
const CX = 757;
const CY = 280;

const PRINT_W = 380;
const PRINT_H = 320;

console.log(`Chest center (corrected): (${CX}, ${CY})`);

// ── Kangaroo ─────────────────────────────────────────────────
const kangBuf = readFileSync(
  resolve(ROOT, "public/images/kangaro-removebg-preview.png")
);
const kangResized = await sharp(kangBuf)
  .resize(130, 130, { fit: "contain", background: { r:0, g:0, b:0, alpha:0 } })
  .png()
  .toBuffer();

// ── Text SVG ──────────────────────────────────────────────────
const textSVG = `<svg width="${PRINT_W}" height="${PRINT_H}" xmlns="http://www.w3.org/2000/svg">
  <text
    x="${PRINT_W / 2}" y="260"
    font-family="Georgia, serif"
    font-size="112"
    font-weight="bold"
    font-style="italic"
    fill="${GOLD}"
    text-anchor="middle"
    opacity="0.92"
  >pacific</text>
  <text
    x="${PRINT_W / 2}" y="308"
    font-family="Georgia, serif"
    font-size="36"
    font-weight="400"
    font-style="italic"
    fill="${GOLD}"
    text-anchor="middle"
    opacity="0.80"
    letter-spacing="10"
  >dust</text>
</svg>`;

const textBuf = await sharp(Buffer.from(textSVG)).png().toBuffer();

// Kangaroo sits above "pacific" text
const printFinal = await sharp(textBuf)
  .composite([{
    input: kangResized,
    top:   8,
    left:  Math.round(PRINT_W / 2 - 65),
    blend: "over",
  }])
  .png()
  .toBuffer();

await sharp(printFinal).toFile(resolve(ROOT, "public/images/print-preview.png"));
console.log("Print preview: http://localhost:3000/images/print-preview.png");

// ── Texture ───────────────────────────────────────────────────
const printLeft = Math.max(0, CX - Math.round(PRINT_W / 2));  // 568
const printTop  = Math.max(0, CY - Math.round(PRINT_H / 2));  // 60

console.log(`Print rect: left=${printLeft} top=${printTop} w=${PRINT_W} h=${PRINT_H}`);
console.log(`Right edge: ${printLeft + PRINT_W} (front panel ends at 983) ✓`);
console.log(`Bottom edge: ${printTop + PRINT_H} (front panel collar area ends ~666) ✓`);

const creamBase = await sharp({
  create: { width: SIZE, height: SIZE, channels: 4,
    background: { r:237, g:232, b:220, alpha:255 } }
}).png().toBuffer();

const finalTexture = await sharp(creamBase)
  .composite([{ input: printFinal, top: printTop, left: printLeft, blend: "over" }])
  .png()
  .toBuffer();

await sharp(finalTexture).toFile(resolve(ROOT, "public/images/texture-preview.png"));
console.log("Texture preview: http://localhost:3000/images/texture-preview.png");

// ── Patch GLB ─────────────────────────────────────────────────
const io  = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

const texture = doc.createTexture("print")
  .setImage(finalTexture)
  .setMimeType("image/png");

doc.getRoot().listMaterials().forEach((mat) => {
  mat.setBaseColorFactor([1, 1, 1, 1]);
  mat.setMetallicFactor(0.0);
  mat.setRoughnessFactor(0.85);
  mat.setBaseColorTexture(texture);
});

await io.write(resolve(ROOT, "public/oversized_t-shirt-printed.glb"), doc);
console.log("✓ Done: public/oversized_t-shirt-printed.glb");
