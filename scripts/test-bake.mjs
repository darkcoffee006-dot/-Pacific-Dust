import { NodeIO } from "@gltf-transform/core";
import sharp from "sharp";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SIZE = 1024;
const GOLD = "#C9A84C";

// Center coordinates for Front Chest
// Based on our analysis:
// Center X is at U = 0.737 -> CX = 755
// Center Y is at V = 0.520 -> CY = 492
const CX = 755;
const CY = 492;

const PRINT_W = 220;
const PRINT_H = 185;

console.log(`Baking test print at front chest center: (${CX}, ${CY})`);

// ── Kangaroo ─────────────────────────────────────────────────
const kangBuf = readFileSync(
  resolve(ROOT, "public/images/kangaro-removebg-preview.png")
);
const kangResized = await sharp(kangBuf)
  .resize(75, 75, { fit: "contain", background: { r:0, g:0, b:0, alpha:0 } })
  .png()
  .toBuffer();

// ── Text SVG ──────────────────────────────────────────────────
const textSVG = `<svg width="${PRINT_W}" height="${PRINT_H}" xmlns="http://www.w3.org/2000/svg">
  <text
    x="${PRINT_W / 2}" y="150"
    font-family="Georgia, serif"
    font-size="65"
    font-weight="bold"
    font-style="italic"
    fill="${GOLD}"
    text-anchor="middle"
    opacity="0.92"
  >pacific</text>
  <text
    x="${PRINT_W / 2}" y="177"
    font-family="Georgia, serif"
    font-size="21"
    font-weight="400"
    font-style="italic"
    fill="${GOLD}"
    text-anchor="middle"
    opacity="0.80"
    letter-spacing="6"
  >dust</text>
</svg>`;

const textBuf = await sharp(Buffer.from(textSVG)).png().toBuffer();

// Kangaroo sits above "pacific" text
const printFinal = await sharp(textBuf)
  .composite([{
    input: kangResized,
    top:   48, // Adjusted position to center it above the text
    left:  Math.round(PRINT_W / 2 - 37.5),
    blend: "over",
  }])
  .png()
  .toBuffer();

// Rotate the final print by 180 degrees to cancel out the UV mirroring/inversion on the model!
const printRotated = await sharp(printFinal)
  .rotate(180)
  .png()
  .toBuffer();

// Calculate print boundaries on texture
const printLeft = Math.max(0, CX - Math.round(PRINT_W / 2));
const printTop  = Math.max(0, CY - Math.round(PRINT_H / 2));

console.log(`Print rect: left=${printLeft} top=${printTop} w=${PRINT_W} h=${PRINT_H}`);

const creamBase = await sharp({
  create: { width: SIZE, height: SIZE, channels: 4,
    background: { r:237, g:232, b:220, alpha:255 } }
}).png().toBuffer();

const finalTexture = await sharp(creamBase)
  .composite([{ input: printRotated, top: printTop, left: printLeft, blend: "over" }])
  .png()
  .toBuffer();

// Save preview texture
await sharp(finalTexture).toFile(resolve(ROOT, "public/images/texture-preview.png"));
console.log("Texture preview saved to public/images/texture-preview.png");

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

// We save to a temporary GLB file first to verify
await io.write(resolve(ROOT, "public/oversized_t-shirt-printed-test.glb"), doc);
console.log("✓ Done: public/oversized_t-shirt-printed-test.glb");
