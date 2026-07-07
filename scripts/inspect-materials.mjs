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
    const mat = prim.getMaterial();
    console.log(`  Prim[${pi}]: Material Name = "${mat ? mat.getName() : "None"}"`);
  });
});

console.log("\nAll Materials in Document:");
doc.getRoot().listMaterials().forEach((mat, i) => {
  console.log(`  Material[${i}]: name="${mat.getName()}" colorFactor=[${mat.getBaseColorFactor()}]`);
});
