import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

doc.getRoot().listMeshes().forEach((mesh, mi) => {
  console.log(`\nMesh[${mi}]: ${mesh.getName()}`);
  mesh.listPrimitives().forEach((prim, pi) => {
    const positionAttr = prim.getAttribute("POSITION");
    const uvAttr = prim.getAttribute("TEXCOORD_0");
    if (!positionAttr || !uvAttr) return;

    const count = positionAttr.getCount();
    
    // Let's filter vertices based on Z coordinate.
    // Front vertices: Z > 1.35
    // Back vertices: Z < 1.15
    
    let frontUMin = Infinity, frontUMax = -Infinity;
    let frontVMin = Infinity, frontVMax = -Infinity;
    let frontCount = 0;
    
    let backUMin = Infinity, backUMax = -Infinity;
    let backVMin = Infinity, backVMax = -Infinity;
    let backCount = 0;
    
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      
      // Let's also look at X coordinate: we want the center of the chest.
      // Torso center is around X = 0.
      const isNearCenter = Math.abs(x) < 0.15;
      
      if (z > 1.40 && isNearCenter) {
        frontUMin = Math.min(frontUMin, u);
        frontUMax = Math.max(frontUMax, u);
        frontVMin = Math.min(frontVMin, v);
        frontVMax = Math.max(frontVMax, v);
        frontCount++;
      } else if (z < 1.10 && isNearCenter) {
        backUMin = Math.min(backUMin, u);
        backUMax = Math.max(backUMax, u);
        backVMin = Math.min(backVMin, v);
        backVMax = Math.max(backVMax, v);
        backCount++;
      }
    }
    
    console.log(`  Prim[${pi}]:`);
    console.log(`    Front (Z > 1.40, |X| < 0.15): count=${frontCount} | U: [${frontUMin.toFixed(3)}, ${frontUMax.toFixed(3)}] V: [${frontVMin.toFixed(3)}, ${frontVMax.toFixed(3)}]`);
    console.log(`    Back  (Z < 1.10, |X| < 0.15): count=${backCount} | U: [${backUMin.toFixed(3)}, ${backUMax.toFixed(3)}] V: [${backVMin.toFixed(3)}, ${backVMax.toFixed(3)}]`);
  });
});
