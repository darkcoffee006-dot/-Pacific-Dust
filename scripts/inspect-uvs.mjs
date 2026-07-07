/**
 * Reads the GLB and prints UV coordinate ranges per mesh
 * so we can figure out where the front chest panel maps on the texture.
 */
import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const document = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

const root = document.getRoot();
root.listMeshes().forEach((mesh, mi) => {
  console.log(`\nMesh[${mi}]: ${mesh.getName()}`);
  mesh.listPrimitives().forEach((prim, pi) => {
    const uvAttr = prim.getAttribute("TEXCOORD_0");
    if (!uvAttr) { console.log(`  Prim[${pi}]: no UVs`); return; }
    const count = uvAttr.getCount();
    let minU = 1, maxU = 0, minV = 1, maxV = 0;
    for (let i = 0; i < count; i++) {
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      if (u < minU) minU = u;
      if (u > maxU) maxU = u;
      if (v < minV) minV = v;
      if (v > maxV) maxV = v;
    }
    console.log(`  Prim[${pi}]: ${count} verts | U[${minU.toFixed(3)}–${maxU.toFixed(3)}] V[${minV.toFixed(3)}–${maxV.toFixed(3)}]`);
    // Sample a few vertices near the center to guess front chest
    const samples = Math.min(20, count);
    const step = Math.floor(count / samples);
    console.log(`  Sample UVs:`);
    for (let i = 0; i < count; i += step) {
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      console.log(`    [${i}] u=${u.toFixed(3)} v=${v.toFixed(3)}`);
    }
  });
});
