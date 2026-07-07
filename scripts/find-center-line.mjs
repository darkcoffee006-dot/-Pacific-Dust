import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

let verts = [];

doc.getRoot().listMeshes().forEach((mesh, mi) => {
  mesh.listPrimitives().forEach((prim, pi) => {
    const positionAttr = prim.getAttribute("POSITION");
    const uvAttr = prim.getAttribute("TEXCOORD_0");
    if (!positionAttr || !uvAttr) return;

    const count = positionAttr.getCount();
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      
      // Look at the center column
      if (Math.abs(x) < 0.01) {
        verts.push({ mi, pi, i, x, y, z, u, v });
      }
    }
  });
});

console.log(`Total center-line vertices: ${verts.length}`);

// Group by Front (Z > 1.3) vs Back (Z < 1.2)
const front = verts.filter(v => v.z > 1.3);
const back = verts.filter(v => v.z < 1.2);

console.log(`Front center-line vertices: ${front.length}`);
// Sort front by height (Y) descending (collar to hem)
front.sort((a, b) => b.y - a.y);
console.log("Top 15 Front vertices (Collar region):");
front.slice(0, 15).forEach((v) => {
  console.log(`  Mesh[${v.mi}] pos=[${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)}] uv=[${v.u.toFixed(4)}, ${v.v.toFixed(4)}]`);
});
console.log("Middle 15 Front vertices (Chest region):");
const midFrontStart = Math.floor(front.length / 3);
front.slice(midFrontStart, midFrontStart + 15).forEach((v) => {
  console.log(`  Mesh[${v.mi}] pos=[${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)}] uv=[${v.u.toFixed(4)}, ${v.v.toFixed(4)}]`);
});

console.log(`\nBack center-line vertices: ${back.length}`);
// Sort back by height (Y) descending
back.sort((a, b) => b.y - a.y);
console.log("Top 15 Back vertices (Collar region):");
back.slice(0, 15).forEach((v) => {
  console.log(`  Mesh[${v.mi}] pos=[${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)}] uv=[${v.u.toFixed(4)}, ${v.v.toFixed(4)}]`);
});
console.log("Middle 15 Back vertices (Chest region):");
const midBackStart = Math.floor(back.length / 3);
back.slice(midBackStart, midBackStart + 15).forEach((v) => {
  console.log(`  Mesh[${v.mi}] pos=[${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)}] uv=[${v.u.toFixed(4)}, ${v.v.toFixed(4)}]`);
});
