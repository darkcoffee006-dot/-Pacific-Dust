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
    
    // Let's find the bounding box in UV space for vertices on the:
    // 1. FRONT Chest: Z > 1.45, |X| < 0.1, Y in [0.03, 0.12]
    // 2. BACK Upper Back: Z < 1.15, |X| < 0.1, Y in [0.03, 0.12]
    
    let frontU = [];
    let frontV = [];
    let backU = [];
    let backV = [];
    
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      
      const isNearCenter = Math.abs(x) < 0.12;
      const isUpperBody = y > 0.02 && y < 0.13;
      
      if (isNearCenter && isUpperBody) {
        if (z > 1.40) {
          frontU.push(u);
          frontV.push(v);
        } else if (z < 1.15) {
          backU.push(u);
          backV.push(v);
        }
      }
    }
    
    if (frontU.length > 0) {
      const minU = Math.min(...frontU);
      const maxU = Math.max(...frontU);
      const minV = Math.min(...frontV);
      const maxV = Math.max(...frontV);
      console.log(`  Prim[${pi}] FRONT chest UV box: U [${minU.toFixed(4)} - ${maxU.toFixed(4)}], V [${minV.toFixed(4)} - ${maxV.toFixed(4)}] (Count: ${frontU.length})`);
    }
    if (backU.length > 0) {
      const minU = Math.min(...backU);
      const maxU = Math.max(...backU);
      const minV = Math.min(...backV);
      const maxV = Math.max(...backV);
      console.log(`  Prim[${pi}] BACK upper-body UV box: U [${minU.toFixed(4)} - ${maxU.toFixed(4)}], V [${minV.toFixed(4)} - ${maxV.toFixed(4)}] (Count: ${backU.length})`);
    }
  });
});
