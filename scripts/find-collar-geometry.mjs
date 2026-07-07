import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

let neckVerts = [];

doc.getRoot().listMeshes().forEach((mesh) => {
  mesh.listPrimitives().forEach((prim) => {
    const positionAttr = prim.getAttribute("POSITION");
    if (!positionAttr) return;

    const count = positionAttr.getCount();
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
      
      // The collar is at the top, Y > 0.12
      if (y > 0.12 && Math.abs(x) < 0.10) {
        neckVerts.push({ x, y, z });
      }
    }
  });
});

console.log(`Found ${neckVerts.length} collar/neckline vertices.`);

// Group by Z slices and find the min Y (deepest point of the collar on front vs back)
const frontZ = neckVerts.filter(v => v.z > 1.35);
const backZ = neckVerts.filter(v => v.z < 1.15);

const frontMinY = Math.min(...frontZ.map(v => v.y));
const frontMaxY = Math.max(...frontZ.map(v => v.y));
console.log(`Front side (Z > 1.35): Y range = [${frontMinY.toFixed(3)}, ${frontMaxY.toFixed(3)}]`);

const backMinY = Math.min(...backZ.map(v => v.y));
const backMaxY = Math.max(...backZ.map(v => v.y));
console.log(`Back side (Z < 1.15):  Y range = [${backMinY.toFixed(3)}, ${backMaxY.toFixed(3)}]`);
