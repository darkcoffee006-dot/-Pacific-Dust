import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

console.log("Mesh and Material mapping in original unprinted GLB:");
doc.getRoot().listMeshes().forEach((mesh, mi) => {
  console.log(`\nMesh[${mi}]: ${mesh.getName()}`);
  mesh.listPrimitives().forEach((prim, pi) => {
    const mat = prim.getMaterial();
    if (!mat) {
      console.log(`  Prim[${pi}]: Material = None`);
      return;
    }
    const colorTex = mat.getBaseColorTexture();
    console.log(`  Prim[${pi}]: Material Name = "${mat.getName()}"`);
    console.log(`    Base Color Texture Name = "${colorTex ? colorTex.getName() : "None"}"`);
  });
});

console.log("\nAll materials and their textures in unprinted GLB:");
doc.getRoot().listMaterials().forEach((mat, i) => {
  const tex = mat.getBaseColorTexture();
  console.log(`  Material[${i}]: name="${mat.getName()}" textureName="${tex ? tex.getName() : "None"}"`);
});

console.log("\nAll textures in unprinted GLB:");
doc.getRoot().listTextures().forEach((tex, i) => {
  console.log(`  Texture[${i}]: name="${tex.getName()}" mimeType="${tex.getMimeType()}"`);
});
