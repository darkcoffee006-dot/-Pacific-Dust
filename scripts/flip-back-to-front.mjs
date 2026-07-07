import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const glbPath = resolve(__dirname, "..", "public", "oversized_t-shirt-printed-test.glb");
const outPath = resolve(__dirname, "..", "public", "oversized_t-shirt-printed-test-front.glb");

async function flipBackToFront() {
  const io = new NodeIO();
  const doc = await io.read(glbPath);
  const root = doc.getRoot();
  const nodes = root.listNodes();

  for (const node of nodes) {
    const mesh = node.getMesh();
    if (!mesh) continue;
    // compute average Z of all positions in the mesh
    let sumZ = 0, count = 0;
    for (const prim of mesh.listPrimitives()) {
      const pos = prim.getAttribute("POSITION");
      if (!pos) continue;
      for (let i = 0; i < pos.getCount(); ++i) {
        const [x, y, z] = pos.getArray(i);
        sumZ += z;
        count++;
      }
    }
    if (count === 0) continue;
    const avgZ = sumZ / count;
    // If the mesh is on the back (negative Z), flip its Z coordinates
    if (avgZ < 0) {
      console.log(`Flipping node ${node.getName() || '(unnamed)'} avgZ=${avgZ.toFixed(3)}`);
      for (const prim of mesh.listPrimitives()) {
        const pos = prim.getAttribute("POSITION");
        if (!pos) continue;
        const array = pos.getArray(); // Float32Array
        for (let i = 0; i < array.length; i += 3) {
          // invert Z
          array[i + 2] = -array[i + 2];
        }
        // write back modified attribute
        prim.setAttribute("POSITION", pos);
      }
    }
  }

  await io.write(outPath, doc);
  console.log(`Wrote new GLB to ${outPath}`);
}

flipBackToFront().catch(console.error);
