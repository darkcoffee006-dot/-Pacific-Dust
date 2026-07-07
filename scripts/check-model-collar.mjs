import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

let centerVerts = [];

doc.getRoot().listMeshes().forEach((mesh, mi) => {
  mesh.listPrimitives().forEach((prim, pi) => {
    const positionAttr = prim.getAttribute("POSITION");
    if (!positionAttr) return;

    const count = positionAttr.getCount();
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
      if (Math.abs(x) < 0.05) {
        centerVerts.push({ mi, pi, i, x, y, z });
      }
    }
  });
});

// Group center vertices by Z coordinate
// Let's print the highest Y coordinate (top of neckline) for different Z values
// Front side is Z > 1.35
// Back side is Z < 1.15

const frontCollar = centerVerts.filter(v => v.z > 1.45 && v.y > 0.10);
const backCollar = centerVerts.filter(v => v.z < 1.10 && v.y > 0.10);

console.log("FRONT Collar (Z > 1.45) vertices sorted by Y descending:");
frontCollar.sort((a, b) => b.y - a.y);
frontCollar.slice(0, 10).forEach(v => {
  console.log(`  Mesh[${v.mi}] pos=[${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)}]`);
});

console.log("\nBACK Collar (Z < 1.10) vertices sorted by Y descending:");
backCollar.sort((a, b) => b.y - a.y);
backCollar.slice(0, 10).forEach(v => {
  console.log(`  Mesh[${v.mi}] pos=[${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)}]`);
});
