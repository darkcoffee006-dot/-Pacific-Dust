import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const io = new NodeIO();
const doc = await io.read(resolve(ROOT, "public/oversized_t-shirt.glb"));

// Let's divide the UV space into a 10x10 grid and find the average 3D position and mesh for each cell
const GRID_SIZE = 10;
const cells = Array.from({ length: GRID_SIZE }, () =>
  Array.from({ length: GRID_SIZE }, () => ({
    count: 0,
    sumX: 0,
    sumY: 0,
    sumZ: 0,
    meshes: new Set()
  }))
);

doc.getRoot().listMeshes().forEach((mesh, mi) => {
  mesh.listPrimitives().forEach((prim) => {
    const positionAttr = prim.getAttribute("POSITION");
    const uvAttr = prim.getAttribute("TEXCOORD_0");
    if (!positionAttr || !uvAttr) return;

    const count = positionAttr.getCount();
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positionAttr.getElement(i, [0, 0, 0]);
      const [u, v] = uvAttr.getElement(i, [0, 0]);

      const ui = Math.min(GRID_SIZE - 1, Math.floor(u * GRID_SIZE));
      const vi = Math.min(GRID_SIZE - 1, Math.floor(v * GRID_SIZE));
      
      if (ui >= 0 && vi >= 0) {
        const cell = cells[vi][ui];
        cell.count++;
        cell.sumX += x;
        cell.sumY += y;
        cell.sumZ += z;
        cell.meshes.add(mi);
      }
    }
  });
});

console.log("UV Grid Map (each cell shows: [Avg X, Avg Y, Avg Z] (count) Meshes):");
for (let vi = GRID_SIZE - 1; vi >= 0; vi--) {
  console.log(`\n--- V-Row ${vi} (V: ${(vi/GRID_SIZE).toFixed(1)} to ${((vi+1)/GRID_SIZE).toFixed(1)}) ---`);
  let line = "";
  for (let ui = 0; ui < GRID_SIZE; ui++) {
    const cell = cells[vi][ui];
    if (cell.count === 0) {
      line += `[  EMPTY  ] `;
    } else {
      const ax = cell.sumX / cell.count;
      const ay = cell.sumY / cell.count;
      const az = cell.sumZ / cell.count;
      line += `[U${ui}: ${ax.toFixed(2)},${ay.toFixed(2)},${az.toFixed(2)} (#${cell.count})] `;
    }
  }
  console.log(line);
}
