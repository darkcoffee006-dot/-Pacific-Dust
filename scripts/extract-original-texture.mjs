import { NodeIO } from "@gltf-transform/core";
import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt-printed.glb"));

const textures = doc.getRoot().listTextures();
console.log(`Found ${textures.length} textures in the original printed GLB.`);

for (let i = 0; i < textures.length; i++) {
  const tex = textures[i];
  const name = tex.getName() || `texture_${i}`;
  const mimeType = tex.getMimeType();
  const imageBuffer = tex.getImage();
  console.log(`Texture[${i}]: name="${name}" mimeType="${mimeType}" size=${imageBuffer.byteLength} bytes`);
  
  if (imageBuffer) {
    const filename = resolve(ROOT, `public/images/original_extracted_${name}.png`);
    await sharp(Buffer.from(imageBuffer)).toFile(filename);
    console.log(`Saved original texture to ${filename}`);
  }
}
