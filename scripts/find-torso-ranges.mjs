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
    
    // Front: Z > 1.35
    let frontU = [];
    let frontV = [];
    let frontY = [];
    
    // Back: Z < 1.15
    let backU = [];
    let backV = [];
    let backY = [];
    
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      
      // Let's filter to torso: |X| < 0.15
      if (Math.abs(x) < 0.15) {
        if (z > 1.35) {
          frontU.push(u);
          frontV.push(v);
          frontY.push(y);
        } else if (z < 1.15) {
          backU.push(u);
          backV.push(v);
          backY.push(y);
        }
      }
    }
    
    if (frontU.length > 0) {
      const minU = Math.min(...frontU);
      const maxU = Math.max(...frontU);
      const minV = Math.min(...frontV);
      const maxV = Math.max(...frontV);
      const minY = Math.min(...frontY);
      const maxY = Math.max(...frontY);
      console.log(`  Prim[${pi}] FRONT Torso:`);
      console.log(`    Y range: [${minY.toFixed(3)}, ${maxY.toFixed(3)}]`);
      console.log(`    U range: [${minU.toFixed(4)}, ${maxU.toFixed(4)}]`);
      console.log(`    V range: [${minV.toFixed(4)}, ${maxV.toFixed(4)}] (count=${frontU.length})`);
    }
    if (backU.length > 0) {
      const minU = Math.min(...backU);
      const maxU = Math.max(...backU);
      const minV = Math.min(...backV);
      const maxV = Math.max(...backV);
      const minY = Math.min(...backY);
      const maxY = Math.max(...backY);
      console.log(`  Prim[${pi}] BACK Torso:`);
      console.log(`    Y range: [${minY.toFixed(3)}, ${maxY.toFixed(3)}]`);
      console.log(`    U range: [${minU.toFixed(4)}, ${maxU.toFixed(4)}]`);
      console.log(`    V range: [${minV.toFixed(4)}, ${maxV.toFixed(4)}] (count=${backU.length})`);
    }
  });
});
