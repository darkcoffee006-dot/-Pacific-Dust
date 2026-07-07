import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..", ".."); // project root
const glbPath = resolve(__dirname, "..", "public", "oversized_t-shirt-printed-test.glb"); // correct path

async function listNodes() {
  const io = new NodeIO();
  const doc = await io.read(glbPath);
  const nodes = doc.getRoot().listNodes();
  console.log("GLB Nodes:");
  nodes.forEach((node, i) => {
    const mesh = node.getMesh();
    console.log(`${i}: ${node.getName() || '(unnamed)'} ${mesh ? '- mesh: ' + (mesh.getName() || '(unnamed)') : ''}`);
  });
}

listNodes().catch(console.error);
