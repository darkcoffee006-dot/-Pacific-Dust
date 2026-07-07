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
    if (!positionAttr || !uvAttr) {
      console.log(`  Prim[${pi}]: missing position or uv`);
      return;
    }

    const count = positionAttr.getCount();
    
    // Find bounding boxes in 3D space and UV space
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;
    let minU = Infinity, maxU = -Infinity;
    let minV = Infinity, maxV = -Infinity;
    
    let sumX = 0, sumY = 0, sumZ = 0;
    
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
      
      minU = Math.min(minU, u); maxU = Math.max(maxU, u);
      minV = Math.min(minV, v); maxV = Math.max(maxV, v);
      
      sumX += x; sumY += y; sumZ += z;
    }
    
    const avgX = sumX / count;
    const avgY = sumY / count;
    const avgZ = sumZ / count;
    
    console.log(`  Prim[${pi}]: ${count} vertices`);
    console.log(`    Bounds X: [${minX.toFixed(3)}, ${maxX.toFixed(3)}]`);
    console.log(`    Bounds Y: [${minY.toFixed(3)}, ${maxY.toFixed(3)}]`);
    console.log(`    Bounds Z: [${minZ.toFixed(3)}, ${maxZ.toFixed(3)}] (Avg Z: ${avgZ.toFixed(3)})`);
    console.log(`    Bounds UV: U[${minU.toFixed(3)}, ${maxU.toFixed(3)}] V[${minV.toFixed(3)}, ${maxV.toFixed(3)}]`);
  });
});
