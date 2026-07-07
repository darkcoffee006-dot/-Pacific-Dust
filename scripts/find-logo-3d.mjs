import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

const uMin = 0.554;
const uMax = 0.925;
const vMin = 0.629;
const vMax = 0.942;

doc.getRoot().listMeshes().forEach((mesh, mi) => {
  console.log(`\nMesh[${mi}]: ${mesh.getName()}`);
  mesh.listPrimitives().forEach((prim, pi) => {
    const positionAttr = prim.getAttribute("POSITION");
    const uvAttr = prim.getAttribute("TEXCOORD_0");
    if (!positionAttr || !uvAttr) return;

    const count = positionAttr.getCount();
    let matchCount = 0;
    let sumX = 0, sumY = 0, sumZ = 0;
    
    for (let i = 0; i < count; i++) {
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      if (u >= uMin && u <= uMax && v >= vMin && v <= vMax) {
        const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
        sumX += x;
        sumY += y;
        sumZ += z;
        matchCount++;
      }
    }
    
    if (matchCount > 0) {
      console.log(`  Prim[${pi}] has ${matchCount} vertices in the logo UV range:`);
      console.log(`    Avg Position: [${(sumX/matchCount).toFixed(3)}, ${(sumY/matchCount).toFixed(3)}, ${(sumZ/matchCount).toFixed(3)}]`);
    } else {
      console.log(`  Prim[${pi}] has NO vertices in the logo UV range.`);
    }
  });
});
