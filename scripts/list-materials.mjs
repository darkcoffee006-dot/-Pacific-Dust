import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const glbPath = resolve(__dirname, "..", "public", "oversized_t-shirt-printed-test.glb");

async function listMaterials() {
  const io = new NodeIO();
  const doc = await io.read(glbPath);
  const nodes = doc.getRoot().listNodes();
  console.log("Node -> Materials");
  for (const node of nodes) {
    const mesh = node.getMesh();
    if (!mesh) continue;
    const primitives = mesh.listPrimitives();
    for (let i = 0; i < primitives.length; ++i) {
      const mat = primitives[i].getMaterial();
      const matName = mat?.getName() || '(unnamed)';
      console.log(`${node.getName() || '(unnamed)'} - primitive ${i}: ${matName}`);
    }
  }
}

listMaterials().catch(console.error);
