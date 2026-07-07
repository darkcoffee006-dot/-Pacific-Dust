import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

let leftSide = []; // x in [-0.02, 0.0]
let rightSide = []; // x in [0.0, 0.02]

doc.getRoot().listMeshes().forEach((mesh, mi) => {
  mesh.listPrimitives().forEach((prim, pi) => {
    const positionAttr = prim.getAttribute("POSITION");
    const uvAttr = prim.getAttribute("TEXCOORD_0");
    if (!positionAttr || !uvAttr) return;

    const count = positionAttr.getCount();
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      
      if (z > 1.45 && y > 0.02 && y < 0.12) {
        if (x >= -0.02 && x <= 0) {
          leftSide.push({ mi, pi, x, y, z, u, v });
        } else if (x >= 0 && x <= 0.02) {
          rightSide.push({ mi, pi, x, y, z, u, v });
        }
      }
    }
  });
});

console.log(`Left Side (X in [-0.02, 0.0]):`);
console.log(`  Count = ${leftSide.length}`);
console.log(`  U range: [${Math.min(...leftSide.map(v => v.u)).toFixed(4)}, ${Math.max(...leftSide.map(v => v.u)).toFixed(4)}]`);
console.log(`  V range: [${Math.min(...leftSide.map(v => v.v)).toFixed(4)}, ${Math.max(...leftSide.map(v => v.v)).toFixed(4)}]`);
console.log("  Samples:");
leftSide.slice(0, 5).forEach((v) => {
  console.log(`    Mesh[${v.mi}] x=${v.x.toFixed(3)} y=${v.y.toFixed(3)} z=${v.z.toFixed(3)} u=${v.u.toFixed(4)} v=${v.v.toFixed(4)}`);
});

console.log(`\nRight Side (X in [0.0, 0.02]):`);
console.log(`  Count = ${rightSide.length}`);
console.log(`  U range: [${Math.min(...rightSide.map(v => v.u)).toFixed(4)}, ${Math.max(...rightSide.map(v => v.u)).toFixed(4)}]`);
console.log(`  V range: [${Math.min(...rightSide.map(v => v.v)).toFixed(4)}, ${Math.max(...rightSide.map(v => v.v)).toFixed(4)}]`);
console.log("  Samples:");
rightSide.slice(0, 5).forEach((v) => {
  console.log(`    Mesh[${v.mi}] x=${v.x.toFixed(3)} y=${v.y.toFixed(3)} z=${v.z.toFixed(3)} u=${v.u.toFixed(4)} v=${v.v.toFixed(4)}`);
});
