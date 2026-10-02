import * as THREE from 'three';
import { Batch, Kit, UNIT, col } from '../core/geom.js';
import { MATS, TEX } from '../core/materials.js';
import { toTexture, tatteredAlphaCanvas } from '../core/textures.js';
import { makeRng, fbm, smooth, clamp } from '../core/rng.js';
import * as C from '../core/constants.js';

// ---------------------------------------------------------------------------
// Above ground: a dusty plain cut along z = 0, the earth section below it,
// silo hoods, the hill with its dead tree, and a ruined skyline in the haze.
// ---------------------------------------------------------------------------

const EXTENT = 3200;
const EARTH_BOTTOM = -1204;

/** Silo hood positions: silo 18 at the origin, 17 to the north-west. */
export const SILOS = (() => {
  const r = makeRng(5050);
  const list = [
    { id: 18, x: 0, z: 0 },
    { id: 17, x: C.SILO17_POS[0], z: C.SILO17_POS[1] },
  ];
  // the rest of 18's ring
  const c0 = [29, -329];
  const a18 = Math.atan2(0 - c0[1], 0 - c0[0]);
  let id = 1;
  const nextId = () => {
    while (id === 17 || id === 18) id++;
    return id++;
  };
  for (let k = 1; k < 6; k++) {
    const a = a18 + (k / 6) * Math.PI * 2;
    if (k === 1) continue; // that slot is silo 17's neighbourhood
    list.push({ id: nextId(), x: c0[0] + Math.cos(a) * 330, z: c0[1] + Math.sin(a) * 330 });
  }
  list.push({ id: nextId(), x: c0[0], z: c0[1] });
  // six more clusters of seven, spread across the plain behind
  const centres = [
    [1250, -700],
    [-1500, -650],
    [2150, -1500],
    [-2250, -1450],
    [700, -1800],
    [-800, -1900],
  ];
  for (const [cx, cz] of centres) {
    const rot = r() * Math.PI;
    list.push({ id: nextId(), x: cx, z: cz });
    for (let k = 0; k < 6; k++) {
      const a = rot + (k / 6) * Math.PI * 2;
      list.push({ id: nextId(), x: cx + Math.cos(a) * (360 + r() * 60), z: cz + Math.sin(a) * (360 + r() * 60) });
    }
  }
  for (const s of list) {
    // each hood faces roughly towards silo 18 / the viewer
    s.face = Math.atan2(-s.z, -s.x);
  }
  return list;
})();

// Height field ---------------------------------------------------------------
function crater(x, z, cx, cz, rimH, floorY = 0.12, rIn = 82, rRim = 116, rOut = 230) {
  const d = Math.hypot(x - cx, z - cz);
  if (d > rOut) return null;
  if (d < rIn) return { h: floorY, w: 1 };
  if (d < rRim) {
    const t = smooth(rIn, rRim, d);
    return { h: floorY + (rimH - floorY) * t, w: 1 };
  }
  const t = smooth(rRim, rOut, d);
  return { h: rimH, w: 1 - t };
}

/** Crater proportions: 18 and its dead neighbour 17 sit in the big bowls. */
const craterOf = (s) =>
  s.id === 18 || s.id === 17
    ? { floor: 0.12, rIn: 82, rRim: 118, rOut: 235, big: true }
    : { floor: 0.6, rIn: 60, rRim: 92, rOut: 180, big: false };

export function terrainY(x, z) {
  const dunes = 4.4 + fbm(x / 640, z / 640, 4) * 5 + fbm(x / 170 + 9.1, z / 170 - 3.3, 3) * 1.8;
  let h = dunes;
  for (const s of SILOS) {
    if (Math.abs(x - s.x) > 240 || Math.abs(z - s.z) > 240) continue;
    const k = craterOf(s);
    // 17's rim stands a little higher than 18's (its flag flies at ~20 m)
    const rimH = s.id === 18 ? 11.2 + fbm(x / 60, z / 60, 3) * 3.2 : k.big ? 13.4 + fbm(x / 60 + 31, z / 60, 3) * 2.4 : 9.4 + fbm(x / 80 + s.id, z / 80, 2) * 1.8;
    const c = crater(x, z, s.x, s.z, rimH, k.floor, k.rIn, k.rRim, k.rOut);
    if (c) h = c.h * c.w + h * (1 - c.w);
  }
  // the hill with the dead tree swells out of the east rim
  const hill = Math.exp(-((x - 110) ** 2 + (z + 9) ** 2) / (2 * 22 ** 2));
  h += hill * 3.2;
  return h;
}

/** 0..1: how much of a crater's pale, dusty floor lies under (x, z). */
function dustAt(x, z) {
  let a = 0;
  for (const s of SILOS) {
    const k = craterOf(s);
    const dx = x - s.x, dz = z - s.z;
    const lim = k.rIn + 12;
    if (Math.abs(dx) > lim || Math.abs(dz) > lim) continue;
    const d = Math.hypot(dx, dz);
    a = Math.max(a, 1 - smooth(k.rIn - 16, k.rIn + 8, d));
  }
  return a;
}

// Spacing grows away from silo 18 but is capped at `cap` metres out to
// `capTo`, so the other silos' crater rims (30 m slopes) stay resolved.
function axisSamples(max, near, far, dense = 1.6, cap = 12, capTo = 2700) {
  const out = [0];
  let v = 0;
  while (v < max) {
    let s = clamp(dense + v * near + (v / 420) ** 2 * far, dense, 70);
    if (v < capTo) s = Math.min(s, cap);
    v = Math.min(max, v + s);
    out.push(v);
  }
  return out;
}

function buildTerrain() {
  const xsPos = axisSamples(EXTENT, 0.011, 5.5);
  const xs = [...xsPos.slice(1).map((v) => -v).reverse(), ...xsPos];
  const zs = axisSamples(EXTENT, 0.012, 5.5, 1.6, 12, 2450).map((v) => -v);
  const nx = xs.length, nz = zs.length;
  const pos = new Float32Array(nx * nz * 3);
  const uv = new Float32Array(nx * nz * 2);
  const colr = new Float32Array(nx * nz * 3);
  // grey-brown dust close by, crater floors bleached almost white, and the
  // whole plain lifting into a pale haze with distance
  const base = new THREE.Color('#918e83');
  const dark = new THREE.Color('#73716a');
  const dusty = new THREE.Color('#dcdad0');
  const haze = new THREE.Color('#c3c3b6');
  const c = new THREE.Color();
  for (let j = 0; j < nz; j++) {
    for (let i = 0; i < nx; i++) {
      const x = xs[i], z = zs[j];
      const y = terrainY(x, z);
      const k = j * nx + i;
      pos[k * 3] = x;
      pos[k * 3 + 1] = y;
      pos[k * 3 + 2] = z;
      uv[k * 2] = x / 16;
      uv[k * 2 + 1] = z / 16;
      const n = fbm(x / 90 + 3, z / 90 - 7, 3);
      c.copy(base).lerp(dark, clamp(0.3 + n * 0.8, 0, 1));
      const dust = dustAt(x, z);
      if (dust > 0) c.lerp(dusty, dust * 0.85);
      c.lerp(haze, smooth(140, 760, Math.hypot(x, z)) * 0.82);
      colr[k * 3] = c.r;
      colr[k * 3 + 1] = c.g;
      colr[k * 3 + 2] = c.b;
    }
  }
  const idx = [];
  // leave an opening where the hood sits over the top of the ramp
  const underHood = (x, z) => x > -34.3 && x < -22.9 && z > -5.2;
  for (let j = 0; j < nz - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      const a = j * nx + i, b = a + 1, d = a + nx, e = d + 1;
      if (underHood((xs[i] + xs[i + 1]) / 2, (zs[j] + zs[j + 1]) / 2)) continue;
      // counter-clockwise seen from above (z runs away from the viewer)
      idx.push(a, b, d, b, e, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.BufferAttribute(colr, 3));
  g.setIndex(nx * nz > 65535 ? new THREE.Uint32BufferAttribute(idx, 1) : new THREE.Uint16BufferAttribute(idx, 1));
  g.computeVertexNormals();
  g.computeBoundingSphere();
  const mat = new THREE.MeshStandardMaterial({ name: 'terrain', map: TEX.terrain, vertexColors: true, roughness: 1, metalness: 0 });
  const mesh = new THREE.Mesh(g, mat);
  mesh.name = 'terrain';
  mesh.receiveShadow = true;
  return { mesh, xs };
}

// ---------------------------------------------------------------------------
// The earth is a diorama cut: a thin crust spanning the plain, and a tapered
// column of backfill hugging the silo down past its foundations. Everything
// else below the crust is open void.
// ---------------------------------------------------------------------------
const CRUST_Y = -60;
const EARTH_DEPTH = 140;
const surroundHalf = (y) => 141 + ((y - EARTH_BOTTOM) / (CRUST_Y - EARTH_BOTTOM)) * 4;

function buildEarth(xsAll) {
  const b = new Batch();
  const c = new THREE.Color();
  const V = (x, y, z, nx, ny, nz, u, v, shade) => {
    c.setRGB(shade, shade * 0.96, shade * 0.93);
    return b.vert(x, y, z, nx, ny, nz, u, v, c);
  };
  const quad = (A, B2, Cc, D) => {
    b.tri(A, B2, Cc);
    b.tri(A, Cc, D);
  };
  const vOf = (y) => (y - EARTH_BOTTOM) / (20 - EARTH_BOTTOM);
  // the cut reads as dark brown loam, like the backfill column below it
  const crustShade = (y) => 0.4 + (1 - smooth(-4, -40, y)) * 0.05;
  const crustBottom = (x) => CRUST_Y + fbm(x / 300, 3.3, 2) * 4;

  // crust front face
  const xs = [...new Set([...xsAll.filter((_, i) => i % 2 === 0), -C.R_OUT, C.R_OUT])].sort((a, d) => a - d);
  for (let i = 0; i < xs.length - 1; i++) {
    const x0 = xs[i], x1 = xs[i + 1];
    if (Math.abs((x0 + x1) / 2) < C.R_OUT) continue;
    const t0 = terrainY(x0, 0), t1 = terrainY(x1, 0);
    const bot0 = Math.abs(x0) <= surroundHalf(CRUST_Y) ? CRUST_Y - 2 : crustBottom(x0);
    const bot1 = Math.abs(x1) <= surroundHalf(CRUST_Y) ? CRUST_Y - 2 : crustBottom(x1);
    const rows = 4;
    for (let k = 0; k < rows; k++) {
      const f0 = k / rows, f1 = (k + 1) / rows;
      const ya0 = t0 + (bot0 - t0) * f0, ya1 = t1 + (bot1 - t1) * f0;
      const yb0 = t0 + (bot0 - t0) * f1, yb1 = t1 + (bot1 - t1) * f1;
      quad(
        V(x0, yb0, 0.02, 0, 0, 1, x0 / 180, vOf(yb0), crustShade(yb0)),
        V(x1, yb1, 0.02, 0, 0, 1, x1 / 180, vOf(yb1), crustShade(yb1)),
        V(x1, ya1, 0.02, 0, 0, 1, x1 / 180, vOf(ya1), crustShade(ya1)),
        V(x0, ya0, 0.02, 0, 0, 1, x0 / 180, vOf(ya0), crustShade(ya0))
      );
    }
    // underside of the crust where the void opens
    const inside = Math.max(Math.abs(x0), Math.abs(x1)) <= surroundHalf(CRUST_Y) + 1;
    if (!inside) {
      quad(
        V(x0, bot0, -EARTH_DEPTH, 0, -1, 0, x0 / 180, 0, 0.16),
        V(x1, bot1, -EARTH_DEPTH, 0, -1, 0, x1 / 180, 0, 0.16),
        V(x1, bot1, 0.02, 0, -1, 0, x1 / 180, 0.1, 0.2),
        V(x0, bot0, 0.02, 0, -1, 0, x0 / 180, 0.1, 0.2)
      );
    }
  }

  // backfill column around the silo: front face with the silo notch
  const yTunTop = C.floorY(70) + C.ROOM_H, yTunBot = C.floorY(70);
  const ys = [];
  for (let y = CRUST_Y; y > EARTH_BOTTOM; y -= 36) ys.push(y);
  ys.push(EARTH_BOTTOM, C.CAVE_Y, yTunTop, yTunBot);
  const Y = [...new Set(ys)].sort((a, d) => d - a);
  const inNotch = (x, y) => (Math.abs(x) < C.R_OUT - 1e-3 && y > C.CAVE_Y) || (x > -96 && x < -C.R_OUT + 1e-3 && y < yTunTop && y > yTunBot);
  const colShade = (y) => 0.46 + fbm(y / 40, 1.7, 2) * 0.03;
  for (const side of [-1, 1]) {
    for (let k = 0; k < Y.length - 1; k++) {
      const yt = Y[k], yb = Y[k + 1];
      const wt = surroundHalf(yt), wb = surroundHalf(yb);
      // split the band at the silo wall (and the tunnel mouth on the west)
      const cuts = side < 0 ? [-wt, -96, -C.R_OUT, 0] : [0, C.R_OUT, wt];
      for (let j = 0; j < cuts.length - 1; j++) {
        let xa = cuts[j], xb = cuts[j + 1];
        const xm = (xa + xb) / 2, ym = (yt + yb) / 2;
        if (inNotch(xm, ym)) continue;
        // outer edges follow the taper
        const xaB = xa === -wt ? -wb : xa, xbB = xb === wt ? wb : xb;
        quad(
          V(xaB, yb, 0.02, 0, 0, 1, xaB / 180, vOf(yb), colShade(yb)),
          V(xbB, yb, 0.02, 0, 0, 1, xbB / 180, vOf(yb), colShade(yb)),
          V(xb, yt, 0.02, 0, 0, 1, xb / 180, vOf(yt), colShade(yt)),
          V(xa, yt, 0.02, 0, 0, 1, xa / 180, vOf(yt), colShade(yt))
        );
      }
      // side face of the column
      const xT = side * wt, xB = side * wb;
      const n = [side, 0, 0];
      quad(
        V(xB, yb, 0.02, ...n, 0, vOf(yb), 0.3),
        V(xB, yb, -EARTH_DEPTH, ...n, EARTH_DEPTH / 180, vOf(yb), 0.3),
        V(xT, yt, -EARTH_DEPTH, ...n, EARTH_DEPTH / 180, vOf(yt), 0.3),
        V(xT, yt, 0.02, ...n, 0, vOf(yt), 0.3)
      );
    }
  }
  // bottom of the column
  const wB = surroundHalf(EARTH_BOTTOM);
  quad(
    V(-wB, EARTH_BOTTOM, 0.02, 0, -1, 0, 0, 0, 0.2),
    V(wB, EARTH_BOTTOM, 0.02, 0, -1, 0, 1, 0, 0.2),
    V(wB, EARTH_BOTTOM, -EARTH_DEPTH, 0, -1, 0, 1, 1, 0.2),
    V(-wB, EARTH_BOTTOM, -EARTH_DEPTH, 0, -1, 0, 0, 1, 0.2)
  );

  const g = b.build();
  // make every triangle agree with its normal
  const p = g.attributes.position, nrm = g.attributes.normal, idx = g.index.array;
  const A = new THREE.Vector3(), B = new THREE.Vector3(), Cv = new THREE.Vector3(), N = new THREE.Vector3();
  for (let i = 0; i < idx.length; i += 3) {
    A.fromBufferAttribute(p, idx[i]);
    B.fromBufferAttribute(p, idx[i + 1]);
    Cv.fromBufferAttribute(p, idx[i + 2]);
    N.fromBufferAttribute(nrm, idx[i]);
    if (B.sub(A).cross(Cv.sub(A)).dot(N) < 0) [idx[i + 1], idx[i + 2]] = [idx[i + 2], idx[i + 1]];
  }
  const mat = new THREE.MeshStandardMaterial({ name: 'earth', map: TEX.earth, vertexColors: true, roughness: 1, metalness: 0 });
  const mesh = new THREE.Mesh(g, mat);
  mesh.name = 'earth';
  mesh.receiveShadow = true;
  return mesh;
}

// ---------------------------------------------------------------------------
/** A dry grass tuft: flat, tapering blades fanning out from one root. */
function shrubGeometry() {
  const b = new Batch();
  const r = makeRng(33);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const blade = new THREE.BufferGeometry();
  // a thin triangle, 1 tall, 1 wide at the root, with a slight fold
  blade.setAttribute('position', new THREE.Float32BufferAttribute([-0.5, 0, 0, 0.5, 0, 0, 0, 1, 0.08, 0, 0, 0.12], 3));
  blade.setIndex([0, 1, 2, 1, 3, 2, 3, 0, 2]);
  blade.computeVertexNormals();
  const N = 15;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 + r() * 0.5;
    // stiff, mostly upright blades
    const tilt = 0.12 + r() * 0.55;
    q.setFromEuler(new THREE.Euler(tilt, a, 0, 'YXZ'));
    const h = 0.9 + r() * 1.0;
    m.compose(new THREE.Vector3((r() - 0.5) * 0.12, 0, (r() - 0.5) * 0.12), q, new THREE.Vector3(0.09 + r() * 0.05, h, 1));
    b.add(blade, m, col('#ffffff').clone().multiplyScalar(0.8 + r() * 0.35));
  }
  return b.build();
}

function buildHood(kit, x, z, face, big = true) {
  // a squat concrete shroud with a steel door
  kit.push(x, 0, z, -face + 0, 1);
  if (big) {
    kit.box('concrete', -5.2, 1.7, 0, 10.5, 3.6, 6.2, '#8a8578');
    kit.box('concrete', -5.2, 3.65, 0, 10.9, 0.3, 6.6, '#7f7a6e');
    kit.box('steel', 0.1, 1.45, 0, 0.25, 2.9, 3.4, '#3a3f3d');
    kit.box('steel', 0.2, 1.45, 0, 0.12, 2.5, 3.0, '#4a504d');
    kit.cylR('steel', 0.3, 1.5, 0.9, 0.12, 0.25, '#6c706c', 0, 0, Math.PI / 2, 10);
  } else {
    kit.box('concrete', -2.5, 1.2, 0, 5, 2.4, 4, '#8a8578');
    kit.box('steel', 0.05, 1.0, 0, 0.15, 1.9, 2.2, '#3a3f3d');
  }
  kit.pop();
}

/** Prism from a 2D outline in the XY plane, extruded between z0 and z1. */
function prism(kit, mat, pts, z0, z1, color) {
  const shape = new THREE.Shape(pts.map(([px, py]) => new THREE.Vector2(px, py)));
  const g = new THREE.ExtrudeGeometry(shape, { depth: z1 - z0, bevelEnabled: false });
  kit.geo(mat, g, 0, 0, z0, color);
}

export function buildSurface({ pool }) {
  const group = new THREE.Group();
  group.name = 'surface';

  const { mesh: terrain, xs } = buildTerrain();
  group.add(terrain);

  const far = new THREE.Mesh(
    new THREE.PlaneGeometry(16000, 8000),
    new THREE.MeshStandardMaterial({ name: 'farPlain', color: '#818072', roughness: 1 })
  );
  far.rotation.x = -Math.PI / 2;
  far.position.set(0, -0.6, -4000);
  far.name = 'farPlain';
  group.add(far);

  group.add(buildEarth(xs));

  // props -------------------------------------------------------------------
  const kit = new Kit('surface/props');
  // Silo 18's exit: the ramp's own roof rises out of the ground as a low
  // wedge (built with the ramp); here the portal at its top end, the steel
  // door, a cheek wall behind it and a worn apron.
  const pitch = Math.atan2(7.6, 20.6);
  const wedgeTop = 3.75;
  const wedgeFoot = -24.2 - wedgeTop / Math.tan(pitch);
  prism(kit, 'concrete', [[wedgeFoot, -0.3], [-23.4, -0.3], [-23.4, wedgeTop + 0.15], [-24.2, wedgeTop + 0.15]], -5.35, -4.6, '#8c877a');
  kit.bb('concrete', -24.3, 0, -5.35, -22.7, 0.9, -4.6, '#86817a'); // jamb (back)
  kit.bb('concrete', -24.3, 0, -0.75, -22.7, 0.9, -0.05, '#86817a'); // jamb stub (front, cut)
  kit.bb('concrete', -24.3, 0.9, -5.35, -23.4, wedgeTop, -4.3, '#8a8578');
  kit.bb('concrete', -24.3, 0.9, -0.75, -23.4, wedgeTop, -0.05, '#8a8578');
  kit.bb('concrete', -24.3, wedgeTop - 0.55, -5.35, -22.7, wedgeTop + 0.15, -0.05, '#7f7a6e'); // lintel
  kit.bb('concrete', -22.7, 0.02, -5.6, -16.8, 0.24, -0.1, '#a19c8e'); // apron
  kit.box('steel', -23.1, 1.55, -2.52, 0.22, 3.1, 3.5, '#2c302f');
  kit.box('steel', -22.96, 1.55, -2.52, 0.08, 2.7, 3.1, '#3c413f');
  for (let k = 0; k < 5; k++) kit.box('steel', -22.9, 0.5 + k * 0.52, -2.52, 0.05, 0.06, 3.0, '#232625');
  kit.cylR('steel', -22.82, 1.5, -1.3, 0.14, 0.25, '#6c706c', 0, 0, Math.PI / 2, 10);
  // the sensor post by the door
  kit.cyl('concrete', -21.5, 0, -6, 0.42, 0.4, '#8f8a7e', 12);
  kit.cyl('steel', -21.5, 0.4, -6, 0.22, 1.25, '#3a3f3d', 10, 0.6);
  kit.sphere('steel', -21.5, 1.72, -6, 0.2, '#2a2e2d', 12, 8);
  kit.box('steel', -21.5, 1.45, -5.82, 0.16, 0.12, 0.06, '#1f2322');
  // path to the hill: a straight trodden line from the door to the tree
  const path = kit.batch('path');
  const p0 = new THREE.Vector2(-17, -3.4), p1 = new THREE.Vector2(104, -10.5);
  const steps = 120;
  let prev = null;
  const pc = col('#ffffff').clone();
  const dx = p1.x - p0.x, dz = p1.y - p0.y;
  const L = Math.hypot(dx, dz);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = p0.x + dx * t, z = p0.y + dz * t;
    const w = 0.62 + Math.sin(t * 13) * 0.06;
    const ox = (-dz / L) * w, oz = (dx / L) * w;
    const a = path.vert(x + ox, terrainY(x + ox, z + oz) + 0.14, z + oz, 0, 1, 0, 0, t * 20, pc);
    const b2 = path.vert(x - ox, terrainY(x - ox, z - oz) + 0.14, z - oz, 0, 1, 0, 1, t * 20, pc);
    if (prev) {
      // counter-clockwise seen from above
      path.tri(prev[0], b2, prev[1]);
      path.tri(prev[0], a, b2);
    }
    prev = [a, b2];
  }
  // two mounds beside the tree
  for (const [x, z, ry] of [
    [101, -14.5, 0.4],
    [98.5, -12, 0.25],
  ]) {
    kit.geo('mound', UNIT.sphere(14, 8), x, terrainY(x, z) - 0.05, z, '#a8a494', 1.15, 0.4, 0.62, 0, ry, 0);
  }
  // the dead tree: a stout trunk forking at half height into wide, bare limbs
  const tx = 108, tz = -10, ty = terrainY(tx, tz) - 0.25;
  const bark = '#4a423a';
  const branch = (a, b2, r0) => kit.rod('bark', a, b2, r0, bark, 7);
  kit.geo('bark', UNIT.cyl(8, 0.55), tx, ty + 0.35, tz, bark, 0.5, 0.7, 0.5);
  const fork = [tx + 0.15, ty + 4.7, tz - 0.1];
  branch([tx, ty, tz], [tx + 0.08, ty + 2.4, tz - 0.04], 0.34);
  branch([tx + 0.08, ty + 2.4, tz - 0.04], fork, 0.27);
  const limbs = [
    [tx - 1.8, ty + 7.2, tz + 1.9],
    [tx + 3.0, ty + 6.7, tz - 2.2],
    [tx + 0.6, ty + 7.8, tz - 3.3],
    [tx - 1.0, ty + 7.4, tz - 1.4],
  ];
  const tr = makeRng(108);
  limbs.forEach((Lb, i) => {
    branch(fork, Lb, i === 3 ? 0.12 : 0.16);
    // each limb ends in a Y of two tapering twigs
    const dir = [Lb[0] - fork[0], Lb[1] - fork[1], Lb[2] - fork[2]];
    for (const sgn of [-1, 1]) {
      const sp = 0.55 + tr() * 0.35;
      const end = [Lb[0] + dir[0] * 0.3 + sgn * dir[2] * sp * 0.5, Lb[1] + 0.8 + tr() * 0.7, Lb[2] + dir[2] * 0.3 - sgn * dir[0] * sp * 0.5];
      branch(Lb, end, 0.065);
      if (tr() < 0.6) branch(end, [end[0] + (tr() - 0.5) * 0.8, end[1] + 0.35, end[2] + (tr() - 0.5) * 0.8], 0.03);
    }
  });
  // hoods of every other silo
  for (const s of SILOS) {
    if (s.id === 18) continue;
    const hx = s.x + Math.cos(s.face) * 58, hz = s.z + Math.sin(s.face) * 58;
    const hy = terrainY(hx, hz) - 0.2;
    kit.push(0, hy, 0);
    buildHood(kit, hx, hz, s.face, s.id === 17);
    kit.pop();
    s.hood = [hx, hy, hz];
  }
  const propsMats = {
    concrete: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0 }),
    steel: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, metalness: 0.65 }),
    path: new THREE.MeshStandardMaterial({ name: 'path', color: '#968f7e', roughness: 1, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
    mound: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }),
    bark: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }),
  };
  const props = kit.finish(propsMats);
  props.name = 'props';
  group.add(props);

  // shrubs ---------------------------------------------------------------------
  // Tufts line the crest of 18's crater and spill down its outer side (the
  // bleached inner slope stays bare), stand behind the dead tree, ring 17's
  // rim, and dot the plain in between.
  const sr = makeRng(71);
  const shrubGeo = shrubGeometry();
  const shrubs = [];
  const tryShrub = (x, z, s = 1) => {
    if (z > -3) return;
    if (Math.hypot(x, z) < 90 && z > -96) return;
    if (x > -36 && x < -14 && z > -9) return; // keep the doorway clear
    if (Math.abs(x - 108) < 2.2 && Math.abs(z + 10) < 2.2) return;
    const y = terrainY(x, z);
    shrubs.push([x, y, z, s * (0.75 + sr() * 0.85), sr() * 6]);
  };
  for (let i = 0; i < 175; i++) {
    const a = Math.PI + sr() * Math.PI;
    const d = 114 + Math.pow(sr(), 1.5) * 34;
    tryShrub(Math.cos(a) * d, Math.sin(a) * d);
  }
  for (let i = 0; i < 10; i++) {
    // behind the dead tree and off to its east, clear of the mounds
    const a = Math.PI * (1.5 + sr() * 0.45), d = 4 + sr() * 9;
    tryShrub(108 + Math.cos(a) * d, -11 + Math.sin(a) * d, 1.15);
  }
  for (let i = 0; i < 64; i++) {
    const a = sr() * Math.PI * 2, d = 114 + Math.pow(sr(), 1.5) * 36;
    tryShrub(C.SILO17_POS[0] + Math.cos(a) * d, C.SILO17_POS[1] + Math.sin(a) * d);
  }
  for (let i = 0; i < 28; i++) tryShrub(-430 + sr() * 700, -sr() * 640 - 5);
  const shrubMesh = new THREE.InstancedMesh(
    shrubGeo,
    new THREE.MeshStandardMaterial({ name: 'shrubs', color: '#4a453c', roughness: 1, vertexColors: true, side: THREE.DoubleSide }),
    shrubs.length
  );
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  shrubs.forEach(([x, y, z, s, ry], i) => {
    m4.compose(new THREE.Vector3(x, y - 0.08, z), q.setFromEuler(e.set(0, ry, 0)), new THREE.Vector3(s * 1.25, s, s * 1.25));
    shrubMesh.setMatrixAt(i, m4);
  });
  shrubMesh.castShadow = true;
  shrubMesh.name = 'shrubs';
  shrubMesh.computeBoundingSphere();
  group.add(shrubMesh);

  // skyline ---------------------------------------------------------------------
  // One ruined city on the horizon: a dense core of towers (some stepped, a
  // few with masts) a little east of centre, thinning out to long, low blocks
  // at either end.
  const kr = makeRng(404);
  const blocks = [];
  const gauss = () => (kr() + kr() + kr() - 1.5) / 1.5;
  for (let i = 0; i < 46; i++) {
    // towers spread across ~3.2 km (x -1400 .. 1800), tallest a little east
    // of centre but still tall out to both ends of the core
    const x = clamp(200 + ((kr() * 2 - 1) * 0.86 + gauss() * 0.14) * 1720, -1460, 1860);
    const z = -5250 + (kr() - 0.5) * 1100;
    const core = Math.exp(-(((x - 450) / 2400) ** 2));
    const h = 38 + core * (55 + Math.pow(kr(), 0.9) * 118) + kr() * 18;
    const w = 32 + kr() * 55, d = 30 + kr() * 45;
    blocks.push([x, 0, z, w, h, d]);
    if (kr() < 0.55 && blocks.length < 76) {
      // a set-back upper tier
      const f = 0.45 + kr() * 0.3;
      const h2 = Math.min(h * (0.12 + kr() * 0.22), 250 - h);
      blocks.push([x + (kr() - 0.5) * w * (1 - f) * 0.6, h, z, w * f, h2, d * f]);
      if (kr() < 0.2 && h + h2 < 222 && blocks.length < 76) blocks.push([x, h + h2, z, 3.5, 12 + kr() * 20, 3.5]);
    }
  }
  const ends = [
    [-2560, -5500],
    [-2250, -5150],
    [-1950, -5800],
    [2250, -5350],
    [2420, -4800],
  ];
  for (const [x, z] of ends) {
    if (blocks.length >= 81) break;
    blocks.push([x, 0, z, 150 + kr() * 110, 16 + kr() * 26, 70 + kr() * 60]);
  }
  while (blocks.length < 81) blocks.push([-1500 + kr() * 3500, 0, -5600 + kr() * 900, 60 + kr() * 80, 22 + kr() * 40, 50 + kr() * 40]);
  const sky = new THREE.InstancedMesh(UNIT.box(), new THREE.MeshStandardMaterial({ name: 'skyline', color: '#7e807a', roughness: 1, vertexColors: true }), blocks.length);
  blocks.forEach(([x, y0, z, w, h, d], i) => {
    m4.compose(new THREE.Vector3(x, y0 + h / 2 - 8, z), q.identity(), new THREE.Vector3(w, h, d));
    sky.setMatrixAt(i, m4);
    sky.setColorAt(i, new THREE.Color().setScalar(0.88 + kr() * 0.24));
  });
  sky.name = 'skyline';
  sky.computeBoundingSphere();
  group.add(sky);

  // a lamp over the apron, a few metres out from the door (not inside it)
  pool.add(-19.2, 3.6, -2.8, 0xffe4c0, 6);
  return group;
}

// ---------------------------------------------------------------------------
// Moving parts of the surface: silo 17's flag (the blowing sand is in
// sandstorm.js).
// ---------------------------------------------------------------------------
export function buildSurfaceDynamic() {
  const group = new THREE.Group();
  group.name = 'surface-dynamic';

  // tattered flag on silo 17's rim
  const fx = -216.6, fz = -216.6, fy = terrainY(fx, fz);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 6.5, 6), new THREE.MeshStandardMaterial({ color: '#3a3a36', roughness: 0.6, metalness: 0.5 }));
  pole.position.set(fx - 1.25, fy + 3.2, fz);
  group.add(pole);
  // hoisted by its pole end, so it can turn to fly along the wind
  const flagGeo = new THREE.PlaneGeometry(2.4, 1.3, 14, 6).translate(1.2, 0, 0);
  const flag = new THREE.Mesh(
    flagGeo,
    new THREE.MeshStandardMaterial({
      name: 'flag17',
      color: '#3d6b36',
      roughness: 0.95,
      side: THREE.DoubleSide,
      alphaMap: toTexture(tatteredAlphaCanvas(), { srgb: false, repeat: false }),
      alphaTest: 0.5,
    })
  );
  flag.position.set(fx - 1.2, fy + 5.8, fz);
  // flies downwind (the sandstorm's wind, from the west and a little away)
  flag.rotation.y = Math.atan2(0.32, 1);
  flag.name = 'flag17';
  flag.castShadow = true;
  const base = flagGeo.attributes.position.array.slice();
  group.add(flag);

  const update = (dt, t) => {
    const p = flagGeo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = base[i * 3], y = base[i * 3 + 1];
      const k = x / 2.4;
      // ripples run from the pole out to the fly end
      p.setZ(i, Math.sin(t * 4.5 - x * 2.6 + y * 0.8) * 0.28 * k + Math.sin(t * 7.0 - x * 4.0) * 0.06 * k);
    }
    p.needsUpdate = true;
    flagGeo.computeVertexNormals();
  };
  return { group, update };
}
