import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt-printed-test.glb"));

const uMin = 645 / 1024; // 0.630
const uMax = 865 / 1024; // 0.845
const vMin = 1 - 582 / 1024; // 0.431
const vMax = 1 - 402 / 1024; // 0.607

console.log(`Checking vertices in UV range U [${uMin.toFixed(4)}, ${uMax.toFixed(4)}] V [${vMin.toFixed(4)}, ${vMax.toFixed(4)}]`);

let frontCount = 0;
let backCount = 0;
let sumFrontZ = 0, sumBackZ = 0;

doc.getRoot().listMeshes().forEach((mesh, mi) => {
  mesh.listPrimitives().forEach((prim, pi) => {
    const positionAttr = prim.getAttribute("POSITION");
    const uvAttr = prim.getAttribute("TEXCOORD_0");
    if (!positionAttr || !uvAttr) return;

    const count = positionAttr.getCount();
    for (let i = 0; i < count; i++) {
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      if (u >= uMin && u <= uMax && v >= vMin && v <= vMax) {
        const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
        if (z > 1.3) {
          frontCount++;
          sumFrontZ += z;
        } else {
          backCount++;
          sumBackZ += z;
        }
      }
    }
  });
});

console.log(`Found ${frontCount} front vertices (Z > 1.3), average Z = ${(sumFrontZ/frontCount || 0).toFixed(3)}`);
console.log(`Found ${backCount} back vertices (Z <= 1.3), average Z = ${(sumBackZ/backCount || 0).toFixed(3)}`);
