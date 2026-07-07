import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

let frontVerts = [];

doc.getRoot().listMeshes().forEach((mesh, mi) => {
  mesh.listPrimitives().forEach((prim, pi) => {
    const positionAttr = prim.getAttribute("POSITION");
    const uvAttr = prim.getAttribute("TEXCOORD_0");
    if (!positionAttr || !uvAttr) return;

    const count = positionAttr.getCount();
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      
      // Let's filter to front chest center
      if (z > 1.45 && Math.abs(x) < 0.02 && y > 0.02 && y < 0.12) {
        frontVerts.push({ mi, pi, i, x, y, z, u, v });
      }
    }
  });
});

console.log(`Found ${frontVerts.length} front chest center vertices:`);
// Group by mesh
const byMesh = {};
frontVerts.forEach(v => {
  const key = `Mesh[${v.mi}] Prim[${v.pi}]`;
  if (!byMesh[key]) byMesh[key] = [];
  byMesh[key].push(v);
});

for (const [key, list] of Object.entries(byMesh)) {
  const minU = Math.min(...list.map(v => v.u));
  const maxU = Math.max(...list.map(v => v.u));
  const minV = Math.min(...list.map(v => v.v));
  const maxV = Math.max(...list.map(v => v.v));
  console.log(`  ${key}: Count = ${list.length}`);
  console.log(`    U: [${minU.toFixed(4)} - ${maxU.toFixed(4)}]`);
  console.log(`    V: [${minV.toFixed(4)} - ${maxV.toFixed(4)}]`);
  
  // Sample 5 vertices
  console.log("    Samples:");
  list.slice(0, 5).forEach((v) => {
    console.log(`      pos=[${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)}] uv=[${v.u.toFixed(4)}, ${v.v.toFixed(4)}]`);
  });
}
