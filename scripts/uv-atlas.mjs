/**
 * Generates a UV atlas PNG showing where each mesh maps on the texture.
 * Each mesh gets a different color. Save as public/uv-atlas.png to view.
 */
import { NodeIO } from "@gltf-transform/core";
import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

const SIZE = 1024;
// Raw RGBA buffer, all white
const buf = Buffer.alloc(SIZE * SIZE * 4, 255);

const COLORS = [
  [255, 80,  80,  180],  // red   — Mesh 0
  [80,  180, 255, 180],  // blue  — Mesh 1
  [80,  220, 120, 180],  // green — Mesh 2
  [220, 140, 40,  180],  // gold  — Mesh 3
];

doc.getRoot().listMeshes().forEach((mesh, mi) => {
  const color = COLORS[mi % COLORS.length];
  mesh.listPrimitives().forEach((prim) => {
    const uv  = prim.getAttribute("TEXCOORD_0");
    const idx = prim.getIndices();
    if (!uv) return;
    const count = idx ? idx.getCount() : uv.getCount();
    for (let i = 0; i < count; i++) {
      const vi = idx ? idx.getScalar(i) : i;
      const [u, v] = uv.getElement(vi, [0, 0]);
      const px = Math.floor(u * SIZE);
      const py = Math.floor((1 - v) * SIZE); // flip Y
      if (px < 0 || px >= SIZE || py < 0 || py >= SIZE) continue;
      const off = (py * SIZE + px) * 4;
      buf[off]     = color[0];
      buf[off + 1] = color[1];
      buf[off + 2] = color[2];
      buf[off + 3] = color[3];
    }
  });
});

await sharp(buf, { raw: { width: SIZE, height: SIZE, channels: 4 } })
  .png()
  .toFile(resolve(ROOT, "public/images/uv-atlas.png"));

console.log("UV atlas saved to public/images/uv-atlas.png");
console.log("Open http://localhost:3000/images/uv-atlas.png to view");
