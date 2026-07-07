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
    
    // Let's filter vertices where V > 0.65
    let zVals = [];
    let yVals = [];
    let xVals = [];
    let countV = 0;
    
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      
      if (v > 0.65) {
        xVals.push(x);
        yVals.push(y);
        zVals.push(z);
        countV++;
      }
    }
    
    if (countV > 0) {
      const minX = Math.min(...xVals);
      const maxX = Math.max(...xVals);
      const minY = Math.min(...yVals);
      const maxY = Math.max(...yVals);
      const minZ = Math.min(...zVals);
      const maxZ = Math.max(...zVals);
      console.log(`  Prim[${pi}]: ${countV} vertices with V > 0.65`);
      console.log(`    X: [${minX.toFixed(3)}, ${maxX.toFixed(3)}]`);
      console.log(`    Y: [${minY.toFixed(3)}, ${maxY.toFixed(3)}]`);
      console.log(`    Z: [${minZ.toFixed(3)}, ${maxZ.toFixed(3)}]`);
    } else {
      console.log(`  Prim[${pi}]: NO vertices with V > 0.65`);
    }
  });
});
