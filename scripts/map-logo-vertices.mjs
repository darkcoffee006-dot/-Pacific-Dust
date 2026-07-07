import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

const uMin = 0.554, uMax = 0.925;
const vMin = 0.629, vMax = 0.942;

// Let's divide this UV box into 5x5 sub-rectangles and find the average 3D position of vertices in each
const W = 5, H = 5;
const grid = Array.from({ length: H }, () => Array.from({ length: W }, () => ({ count: 0, x: 0, y: 0, z: 0 })));

doc.getRoot().listMeshes().forEach((mesh) => {
  mesh.listPrimitives().forEach((prim) => {
    const positionAttr = prim.getAttribute("POSITION");
    const uvAttr = prim.getAttribute("TEXCOORD_0");
    if (!positionAttr || !uvAttr) return;

    const count = positionAttr.getCount();
    for (let i = 0; i < count; i++) {
      const [u, v] = uvAttr.getElement(i, [0, 0]);
      if (u >= uMin && u <= uMax && v >= vMin && v <= vMax) {
        const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
        
        const ui = Math.min(W - 1, Math.floor(((u - uMin) / (uMax - uMin)) * W));
        const vi = Math.min(H - 1, Math.floor(((v - vMin) / (vMax - vMin)) * H));
        
        if (ui >= 0 && vi >= 0) {
          const cell = grid[vi][ui];
          cell.count++;
          cell.x += x;
          cell.y += y;
          cell.z += z;
        }
      }
    }
  });
});

console.log("Current Logo UV to 3D Map (shown as [X, Y, Z] at each UV point):");
console.log("(Note: Bottom of grid is V = 0.629, Top of grid is V = 0.942)");
console.log("(Left of grid is U = 0.554, Right of grid is U = 0.925)");
for (let vi = H - 1; vi >= 0; vi--) {
  let line = "";
  for (let ui = 0; ui < W; ui++) {
    const cell = grid[vi][ui];
    if (cell.count === 0) {
      line += `[  EMPTY  ] `;
    } else {
      const ax = cell.x / cell.count;
      const ay = cell.y / cell.count;
      const az = cell.z / cell.count;
      line += `[${ax.toFixed(2)},${ay.toFixed(2)},${az.toFixed(2)}] `;
    }
  }
  console.log(line);
}
