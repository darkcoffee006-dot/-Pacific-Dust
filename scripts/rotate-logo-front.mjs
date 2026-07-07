import { NodeIO } from "@gltf-transform/core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT   = resolve(__dirname, "..");
const INPUT  = resolve(ROOT, "public", "oversized_t-shirt-printed-test.glb");
const OUTPUT = resolve(ROOT, "public", "oversized_t-shirt-printed-test-front.glb");

const io  = new NodeIO();
const doc = await io.read(INPUT);

function arrMin(arr){ let m=Infinity; for(const v of arr) if(v<m) m=v; return m; }
function arrMax(arr){ let m=-Infinity; for(const v of arr) if(v>m) m=v; return m; }

// --- 1. Collect all (z, u, v) samples --------------------------------------
const zArr=[], uArr=[], vArr=[];
const allSamples=[];
for (const mesh of doc.getRoot().listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    const pos = prim.getAttribute("POSITION");
    const uv  = prim.getAttribute("TEXCOORD_0");
    if (!pos || !uv) continue;
    for (let i = 0; i < pos.getCount(); i++) {
      const [x,y,z] = pos.getElement(i,[0,0,0]);
      const [u,v]   = uv.getElement(i, [0,0]);
      zArr.push(z); uArr.push(u); vArr.push(v);
      allSamples.push({z,u,v});
    }
  }
}

// --- 2. midZ --------------------------------------------------------------
const minZ=arrMin(zArr), maxZ=arrMax(zArr), midZ=(minZ+maxZ)/2;
console.log(`Z range [${minZ.toFixed(3)}, ${maxZ.toFixed(3)}]  midZ=${midZ.toFixed(3)}`);

const front=allSamples.filter(s=>s.z>midZ);
const back =allSamples.filter(s=>s.z<midZ);

function bbox(arr){
  let uMin=Infinity,uMax=-Infinity,vMin=Infinity,vMax=-Infinity;
  for(const s of arr){
    if(s.u<uMin)uMin=s.u; if(s.u>uMax)uMax=s.u;
    if(s.v<vMin)vMin=s.v; if(s.v>vMax)vMax=s.v;
  }
  return {uMin,uMax,vMin,vMax};
}
const fBox=bbox(front), bBox=bbox(back);
console.log(`Front UV: U[${fBox.uMin.toFixed(3)},${fBox.uMax.toFixed(3)}] V[${fBox.vMin.toFixed(3)},${fBox.vMax.toFixed(3)}] (${front.length} verts)`);
console.log(`Back  UV: U[${bBox.uMin.toFixed(3)},${bBox.uMax.toFixed(3)}] V[${bBox.vMin.toFixed(3)},${bBox.vMax.toFixed(3)}] (${back.length} verts)`);

// --- 3. Swap front?back UV ------------------------------------------------
const fW=fBox.uMax-fBox.uMin, fH=fBox.vMax-fBox.vMin;
const bW=bBox.uMax-bBox.uMin, bH=bBox.vMax-bBox.vMin;
let n=0;

for (const mesh of doc.getRoot().listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    const pos = prim.getAttribute("POSITION");
    const uv  = prim.getAttribute("TEXCOORD_0");
    if (!pos || !uv) continue;
    for (let i = 0; i < pos.getCount(); i++) {
      const [,,z] = pos.getElement(i,[0,0,0]);
      const [u,v] = uv.getElement(i, [0,0]);
      if (z > midZ && fW>0 && bW>0) {
        const uN=(u-fBox.uMin)/fW, vN=(v-fBox.vMin)/fH;
        uv.setElement(i,[bBox.uMin+uN*bW, bBox.vMin+vN*bH]); n++;
      } else if (z < midZ && fW>0 && bW>0) {
        const uN=(u-bBox.uMin)/bW, vN=(v-bBox.vMin)/bH;
        uv.setElement(i,[fBox.uMin+uN*fW, fBox.vMin+vN*fH]); n++;
      }
    }
  }
}
console.log(`Remapped ${n} vertices`);
await io.write(OUTPUT, doc);
console.log(`? Done ? ${OUTPUT}`);
