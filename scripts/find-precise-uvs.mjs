import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

let frontVerts = [];
let backVerts = [];

doc.getRoot().listMeshes().forEach((mesh, mi) => {
  mesh.listPrimitives().forEach((prim, pi) => {
    const positionAttr = prim.getAttribute("POSITION");
    const uvAttr = prim.getAttribute("TEXCOORD_0");
    if (!positionAttr || !uvAttr) return;

    const count = positionAttr.getCount();
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      
      const isNearCenter = Math.abs(x) < 0.04;
      const isUpperChest = y > 0.04 && y < 0.08;
      
      if (isNearCenter && isUpperChest) {
        if (z > 1.45) {
          frontVerts.push({ mi, pi, i, x, y, z, u, v });
        } else if (z < 1.15) {
          backVerts.push({ mi, pi, i, x, y, z, u, v });
        }
      }
    }
  });
});

console.log(`Front vertices count: ${frontVerts.length}`);
if (frontVerts.length > 0) {
  // Sort by y descending, or just print average/samples
  const avgU = frontVerts.reduce((sum, v) => sum + v.u, 0) / frontVerts.length;
  const avgV = frontVerts.reduce((sum, v) => sum + v.v, 0) / frontVerts.length;
  console.log(`Front Chest Average UV: U = ${avgU.toFixed(4)} (pixel: ${Math.round(avgU * 1024)}), V = ${avgV.toFixed(4)} (pixel Y = ${Math.round((1 - avgV) * 1024)})`);
  console.log(`Front Chest UV ranges: U [${Math.min(...frontVerts.map(v => v.u)).toFixed(4)}, ${Math.max(...frontVerts.map(v => v.u)).toFixed(4)}]`);
  console.log(`Front Chest UV ranges: V [${Math.min(...frontVerts.map(v => v.v)).toFixed(4)}, ${Math.max(...frontVerts.map(v => v.v)).toFixed(4)}]`);
  console.log(`Sample front vertices:`);
  frontVerts.slice(0, 10).forEach((vert) => {
    console.log(`  Mesh[${vert.mi}] Prim[${vert.pi}] Vertex[${vert.i}]: pos=[${vert.x.toFixed(3)}, ${vert.y.toFixed(3)}, ${vert.z.toFixed(3)}] uv=[${vert.u.toFixed(4)}, ${vert.v.toFixed(4)}]`);
  });
}

console.log(`\nBack vertices count: ${backVerts.length}`);
if (backVerts.length > 0) {
  const avgU = backVerts.reduce((sum, v) => sum + v.u, 0) / backVerts.length;
  const avgV = backVerts.reduce((sum, v) => sum + v.v, 0) / backVerts.length;
  console.log(`Back Chest Average UV: U = ${avgU.toFixed(4)} (pixel: ${Math.round(avgU * 1024)}), V = ${avgV.toFixed(4)} (pixel Y = ${Math.round((1 - avgV) * 1024)})`);
  console.log(`Back Chest UV ranges: U [${Math.min(...backVerts.map(v => v.u)).toFixed(4)}, ${Math.max(...backVerts.map(v => v.u)).toFixed(4)}]`);
  console.log(`Back Chest UV ranges: V [${Math.min(...backVerts.map(v => v.v)).toFixed(4)}, ${Math.max(...backVerts.map(v => v.v)).toFixed(4)}]`);
  console.log(`Sample back vertices:`);
  backVerts.slice(0, 10).forEach((vert) => {
    console.log(`  Mesh[${vert.mi}] Prim[${vert.pi}] Vertex[${vert.i}]: pos=[${vert.x.toFixed(3)}, ${vert.y.toFixed(3)}, ${vert.z.toFixed(3)}] uv=[${vert.u.toFixed(4)}, ${vert.v.toFixed(4)}]`);
  });
}
