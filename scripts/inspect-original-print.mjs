import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const texBytes = await sharp(resolve(ROOT, "public/images/original_extracted_print.png"))
  .raw()
  .toBuffer({ resolveWithObject: true });

const { data, info } = texBytes;
const width = info.width;
const height = info.height;

// Function to check if a pixel is not cream
function isLogoPixel(r, g, b) {
  const isCream = Math.abs(r - 237) < 5 && Math.abs(g - 232) < 5 && Math.abs(b - 220) < 5;
  return !isCream;
}

let minX = width, maxX = 0;
let minY = height, maxY = 0;
let count = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const offset = (y * width + x) * info.channels;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    
    if (isLogoPixel(r, g, b)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      count++;
    }
  }
}

console.log(`Original print dimensions: ${width}x${height}`);
console.log(`Found ${count} non-cream logo pixels.`);
if (count > 0) {
  console.log(`Logo Bounding Box on texture:`);
  console.log(`  X: [${minX}, ${maxX}] (width: ${maxX - minX}, center: ${(minX + maxX)/2})`);
  console.log(`  Y: [${minY}, ${maxY}] (height: ${maxY - minY}, center: ${(minY + maxY)/2})`);
  console.log(`  UV U-range: [${(minX/width).toFixed(4)}, ${(maxX/width).toFixed(4)}]`);
  console.log(`  UV V-range: [${(1 - maxY/height).toFixed(4)}, ${(1 - minY/height).toFixed(4)}]`);
}
