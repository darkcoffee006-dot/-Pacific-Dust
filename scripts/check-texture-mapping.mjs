import { NodeIO } from "@gltf-transform/core";
import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();

// Read the test GLB
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt-printed-test.glb"));

// Find the texture
const texture = doc.getRoot().listTextures()[3]; // our print texture
const texBytes = texture.getImage();
const metadata = await sharp(Buffer.from(texBytes)).metadata();
const width = metadata.width;
const height = metadata.height;

// Get raw pixel buffer
const { data, info } = await sharp(Buffer.from(texBytes))
  .raw()
  .toBuffer({ resolveWithObject: true });

// Function to check if a pixel is not the cream background (237, 232, 220)
function isLogoPixel(r, g, b) {
  // Cream is approx 237, 232, 220. Logo is gold (approx 201, 168, 76) or transparent/other
  const isCream = Math.abs(r - 237) < 5 && Math.abs(g - 232) < 5 && Math.abs(b - 220) < 5;
  return !isCream;
}

let printedVerts = [];

doc.getRoot().listMeshes().forEach((mesh, mi) => {
  mesh.listPrimitives().forEach((prim, pi) => {
    const positionAttr = prim.getAttribute("POSITION");
    const uvAttr = prim.getAttribute("TEXCOORD_0");
    if (!positionAttr || !uvAttr) return;

    const count = positionAttr.getCount();
    for (let i = 0; i < count; i++) {
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      
      // Map UV to pixel
      const px = Math.floor(u * width);
      const py = Math.floor((1 - v) * height);
      
      if (px >= 0 && px < width && py >= 0 && py < height) {
        const offset = (py * width + px) * info.channels;
        const r = data[offset];
        const g = data[offset + 1];
        const b = data[offset + 2];
        
        if (isLogoPixel(r, g, b)) {
          const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
          printedVerts.push({ mi, pi, i, x, y, z, u, v, px, py, r, g, b });
        }
      }
    }
  });
});

console.log(`Total vertices that sample the logo color: ${printedVerts.length}`);
if (printedVerts.length > 0) {
  const front = printedVerts.filter(v => v.z > 1.3);
  const back = printedVerts.filter(v => v.z <= 1.3);
  console.log(`  Front vertices (Z > 1.3): ${front.length}`);
  console.log(`  Back vertices (Z <= 1.3):  ${back.length}`);
  
  if (front.length > 0) {
    console.log("  Sample Front vertices:");
    front.slice(0, 5).forEach((v) => {
      console.log(`    Mesh[${v.mi}] pos=[${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)}] uv=[${v.u.toFixed(4)}, ${v.v.toFixed(4)}] px=[${v.px}, ${v.py}] color=[${v.r}, ${v.g}, ${v.b}]`);
    });
  }
  if (back.length > 0) {
    console.log("  Sample Back vertices:");
    back.slice(0, 5).forEach((v) => {
      console.log(`    Mesh[${v.mi}] pos=[${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)}] uv=[${v.u.toFixed(4)}, ${v.v.toFixed(4)}] px=[${v.px}, ${v.py}] color=[${v.r}, ${v.g}, ${v.b}]`);
    });
  }
}
