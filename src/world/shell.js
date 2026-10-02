import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Batch, InstanceSet, UNIT, col, extrude, archShape, whiten } from '../core/geom.js';
import { MATS, TEX } from '../core/materials.js';
import { numeralAtlas } from '../core/textures.js';
import { makeRng } from '../core/rng.js';
import * as C from '../core/constants.js';
import { SPECIAL_SIDES } from '../data/places.js';

// ---------------------------------------------------------------------------
// The concrete shell: outer wall, cut faces, 145 floor slabs, level numerals,
// slab-edge light strips and the generic rooms that fill every level that
// isn't one of the named places.
// ---------------------------------------------------------------------------

const PAL = {
  teal: ['#437f77', '#4b8983', '#3f7871', '#498a83', '#3d6e68', '#2e514f', '#365a57', '#3f6967'],
  grey: ['#848073', '#7e7a6e', '#8b8679', '#77746a'],
  green: ['#5f7f55', '#6b8a5c', '#56744e', '#6d8c64'],
  warm: ['#8a7b62', '#7d6f58', '#93846a'],
  partition: '#888376',
  cap: '#a39d91',
  blanket: ['#b5372e', '#4f6a5a', '#556a46', '#784035', '#4b6a69', '#6a5a3c', '#8c6b3a', '#3e5c7a', '#9b4b2f'],
  wood: ['#6a4b32', '#7b5f3f', '#5c4330'],
  dark: ['#3f4342', '#414544', '#393e3c'],
  crop: ['#1f6b23', '#2a7d2c', '#1a5e20', '#34883a', '#23752a', '#2f6f2a', '#3f8f3c', '#27802e'],
  box: ['#b08f5e', '#737a45', '#a8a08a', '#7a5c3c', '#c49a4a', '#8f8a78', '#9c7a52', '#6f7a43', '#b98a4a'],
};

export function levelType(n) {
  if (n >= 125) return 'deep';
  if (n >= 106 && n <= 119) return 'storage';
  if ((n >= 71 && n <= 79) || (n >= 120 && n <= 124) || n === 66) return 'farm';
  if (n >= 80 && n <= 89) return n % 2 === 0 ? 'farm' : 'apart';
  if ([30, 50, 52, 54, 70, 105].includes(n) || (n >= 56 && n <= 61)) return 'office';
  return 'apart';
}

const STRIP_BY_TYPE = { apart: '#d6b980', office: '#dccfa8', farm: '#c6e6b0', storage: '#e2e6a4', deep: '#e9b93c' };
const STRIP_BY_LEVEL = {
  1: '#d8b77a',
  14: '#d24a3c',
  19: '#6fd6ea',
  20: '#6fd6ea',
  55: '#79e3e0',
  62: '#e2f4ea',
  66: '#c9efb6',
  68: '#ecc664',
  70: '#e8d7a6',
  73: '#f0a8d0',
  75: '#c9efb6',
  // warning yellow either side of the Gap
  90: '#f0b020',
  91: '#f0b020',
  92: '#f0b020',
  110: '#dde6a4',
};
const SLAB_TINT = { apart: '#eaddc8', office: '#e2dccd', farm: '#d4cdb8', storage: '#d8d6c6', deep: '#5c5c5a' };

// ---------------------------------------------------------------------------
// Custom geometries used by the instanced props (vertex colours baked in so a
// single instance colour tints the whole thing).
// ---------------------------------------------------------------------------
function buildDoorGeo() {
  const b = new Batch();
  const m = new THREE.Matrix4();
  const frame = new THREE.Shape();
  const outer = archShape(1.42, 2.46);
  frame.curves = outer.curves;
  frame.holes.push(archShape(1.12, 2.3));
  const fg = extrude(frame, 0.08, false, 6);
  b.add(fg, m.makeTranslation(0, 0, 0), col('#ffffff'));
  const panel = extrude(archShape(1.12, 2.3), 0.04, false, 6);
  b.add(panel, m.makeTranslation(0, 0, 0.01), col('#6e6c66'));
  b.add(UNIT.box(), m.compose(new THREE.Vector3(0.4, 1.1, 0.07), new THREE.Quaternion(), new THREE.Vector3(0.08, 0.2, 0.06)), col('#cfc9bc'));
  return b.build();
}

function buildPortholeGeo() {
  const b = new Batch();
  const m = new THREE.Matrix4();
  const ring = new THREE.Shape();
  ring.absarc(0, 0, 0.5, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, 0.38, 0, Math.PI * 2, true);
  ring.holes.push(hole);
  b.add(extrude(ring, 0.1, false, 12), m.identity(), col('#ffffff'));
  const glass = new THREE.CircleGeometry(0.39, 16);
  b.add(glass, m.makeTranslation(0, 0, 0.03), col('#2b3432'));
  return b.build();
}

function buildTreeGeo() {
  const b = new Batch();
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  b.add(UNIT.cyl(6, 0.7), m.compose(new THREE.Vector3(0, 0.6, 0), q, new THREE.Vector3(0.09, 1.2, 0.09)), col('#6a4a30'));
  b.add(UNIT.ico(0), m.compose(new THREE.Vector3(0, 1.5, 0), q, new THREE.Vector3(0.7, 0.62, 0.7)), col('#ffffff'));
  b.add(UNIT.ico(0), m.compose(new THREE.Vector3(0.28, 1.25, 0.1), q.setFromEuler(new THREE.Euler(0.3, 0.8, 0)), new THREE.Vector3(0.42, 0.4, 0.42)), col('#e8f2e0'));
  return b.build();
}

const RACK = { w: 1.9, h: 4.1, d: 0.62, shelves: [0.14, 0.92, 1.7, 2.48, 3.26, 4.04] };
function buildRackGeo() {
  const b = new Batch();
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const W = RACK.w, H = RACK.h, D = RACK.d;
  for (const x of [-W / 2, W / 2]) for (const z of [-D / 2, D / 2]) b.add(UNIT.box(), m.compose(new THREE.Vector3(x, H / 2, z), q, new THREE.Vector3(0.05, H, 0.05)), col('#ffffff'));
  for (const y of RACK.shelves) b.add(UNIT.box(), m.compose(new THREE.Vector3(0, y, 0), q, new THREE.Vector3(W, 0.04, D)), col('#e6e6e0'));
  // diagonal brace on the back, corner to corner
  b.add(UNIT.box(), m.compose(new THREE.Vector3(0, H / 2, -D / 2), q.setFromEuler(new THREE.Euler(0, 0, -Math.atan2(W, H))), new THREE.Vector3(0.03, Math.hypot(W, H), 0.03)), col('#d8d8d0'));
  return b.build();
}

function buildCatwalkGeo() {
  const b = new Batch();
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const L = 5, W = 1.4;
  b.add(UNIT.box(), m.compose(new THREE.Vector3(0, 0, 0), q, new THREE.Vector3(L, 0.08, W)), col('#2f302f'));
  for (const x of [-L / 2 + 0.1, 0, L / 2 - 0.1]) b.add(UNIT.box(), m.compose(new THREE.Vector3(x, 0.55, W / 2), q, new THREE.Vector3(0.05, 1.1, 0.05)), col('#3a3b3a'));
  // safety-yellow top rail, dark knee rail
  b.add(UNIT.box(), m.compose(new THREE.Vector3(0, 1.08, W / 2), q, new THREE.Vector3(L, 0.06, 0.06)), col('#e3b53c'));
  b.add(UNIT.box(), m.compose(new THREE.Vector3(0, 0.55, W / 2), q, new THREE.Vector3(L, 0.035, 0.035)), col('#3a3b3a'));
  return b.build();
}

function buildBenchGeo() {
  const b = new Batch();
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const L = 1.9;
  b.add(UNIT.box(), m.compose(new THREE.Vector3(0, 0.45, 0), q, new THREE.Vector3(0.45, 0.07, L)), col('#ffffff'));
  b.add(UNIT.box(), m.compose(new THREE.Vector3(-0.2, 0.78, 0), q, new THREE.Vector3(0.06, 0.4, L)), col('#f0ece4'));
  for (const z of [-L / 2 + 0.15, L / 2 - 0.15]) b.add(UNIT.box(), m.compose(new THREE.Vector3(0, 0.22, z), q, new THREE.Vector3(0.4, 0.44, 0.06)), col('#4a4a46'));
  return b.build();
}

// ---------------------------------------------------------------------------
// Slab geometry: half annulus with separate groups for floor, ceiling and the
// cut/edge faces.
// ---------------------------------------------------------------------------
function halfAnnulusShape(rIn, rOut, seg = 72) {
  const s = new THREE.Shape();
  // shape y maps to world -z (back half of the silo)
  s.moveTo(rOut, 0);
  for (let i = 1; i <= seg; i++) {
    const a = (i / seg) * Math.PI;
    s.lineTo(Math.cos(a) * rOut, Math.sin(a) * rOut);
  }
  if (rIn > 0) {
    s.lineTo(-rIn, 0);
    for (let i = seg - 1; i >= 0; i--) {
      const a = (i / seg) * Math.PI;
      s.lineTo(Math.cos(a) * rIn, Math.sin(a) * rIn);
    }
  }
  s.closePath();
  return s;
}

function sideFaces(b, edges, y0, y1, color) {
  // edges: list of [x0, z0, x1, z1] with outward normal on the right-hand side
  for (const [x0, z0, x1, z1] of edges) {
    const dx = x1 - x0, dz = z1 - z0;
    const len = Math.hypot(dx, dz);
    const nx = dz / len, nz = -dx / len;
    const u0 = 0, u1 = len / 10;
    const a = b.vert(x0, y0, z0, nx, 0, nz, u0, y0 / 10, color);
    const bb = b.vert(x1, y0, z1, nx, 0, nz, u1, y0 / 10, color);
    const c = b.vert(x1, y1, z1, nx, 0, nz, u1, y1 / 10, color);
    const d = b.vert(x0, y1, z0, nx, 0, nz, u0, y1 / 10, color);
    b.tri(a, c, bb);
    b.tri(a, d, c);
  }
}

export function slabGeometry({ rIn = C.R_HOLE, rOut = C.R_SLAB, holes = [], seg = 72 } = {}) {
  const shape = halfAnnulusShape(rIn, rOut, seg);
  for (const h of holes) {
    // h: [x0, z0, x1, z1] in world coords (z negative)
    const p = new THREE.Path();
    p.moveTo(h[0], -h[1]);
    p.lineTo(h[0], -h[3]);
    p.lineTo(h[2], -h[3]);
    p.lineTo(h[2], -h[1]);
    p.closePath();
    shape.holes.push(p);
  }
  const top = new THREE.ShapeGeometry(shape, 1);
  top.rotateX(-Math.PI / 2);
  const uv = top.attributes.uv;
  const pos = top.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) / 10, pos.getZ(i) / 10);
  whiten(top);

  const bottom = top.clone();
  bottom.translate(0, -C.SLAB_T, 0);
  const nb = bottom.attributes.normal;
  for (let i = 0; i < nb.count; i++) nb.setXYZ(i, 0, -1, 0);
  const idx = bottom.index.array;
  for (let i = 0; i < idx.length; i += 3) {
    const t = idx[i + 1];
    idx[i + 1] = idx[i + 2];
    idx[i + 2] = t;
  }

  const sb = new Batch();
  const white = new THREE.Color(1, 1, 1);
  const y0 = -C.SLAB_T, y1 = 0;
  const edges = [];
  // cut faces at z = 0 (orientation is fixed up below)
  if (rIn > 0) edges.push([rIn, 0, rOut, 0], [-rOut, 0, -rIn, 0]);
  else edges.push([-rOut, 0, rOut, 0]);
  if (rIn > 0) {
    // inner arc (normal toward the axis)
    for (let i = 0; i < seg; i++) {
      const a0 = Math.PI + (i / seg) * Math.PI, a1 = Math.PI + ((i + 1) / seg) * Math.PI;
      edges.push([Math.cos(a0) * rIn, Math.sin(a0) * rIn, Math.cos(a1) * rIn, Math.sin(a1) * rIn]);
    }
  }
  for (let i = 0; i < seg; i++) {
    const a0 = Math.PI + (i / seg) * Math.PI, a1 = Math.PI + ((i + 1) / seg) * Math.PI;
    edges.push([Math.cos(a1) * rOut, Math.sin(a1) * rOut, Math.cos(a0) * rOut, Math.sin(a0) * rOut]);
  }
  for (const h of holes) {
    const [x0, z0, x1, z1] = h;
    edges.push([x0, z1, x0, z0], [x0, z0, x1, z0], [x1, z0, x1, z1], [x1, z1, x0, z1]);
  }
  // fix orientation: we want normals pointing out of the solid
  const fixed = edges.map(([ax, az, bx, bz]) => {
    const mx = (ax + bx) / 2, mz = (az + bz) / 2;
    const dx = bx - ax, dz = bz - az;
    const len = Math.hypot(dx, dz) || 1;
    const nx = dz / len, nz = -dx / len;
    // probe a point slightly along the normal: it must be outside the slab
    const px = mx + nx * 0.05, pz = mz + nz * 0.05;
    const r = Math.hypot(px, pz);
    let inside = pz <= 0 && r >= rIn && r <= rOut;
    for (const h of holes) if (px > h[0] && px < h[2] && pz > h[3] && pz < h[1]) inside = false;
    return inside ? [bx, bz, ax, az] : [ax, az, bx, bz];
  });
  sideFaces(sb, fixed, y0, y1, white);
  const sides = sb.build();

  const g = mergeGeometries([top, bottom, sides], true);
  g.computeBoundingSphere();
  return g;
}

// ---------------------------------------------------------------------------
// Outer wall (inner face, r = 75) with optional holes, and the cut ring faces.
// ---------------------------------------------------------------------------
function wallGeometry(holes) {
  const b = new Batch();
  const seg = 96;
  const ys = new Set([0, C.floorY(C.LEVELS), C.BASE_Y]);
  for (const h of holes) {
    ys.add(h.y0);
    ys.add(h.y1);
  }
  const Y = [...ys].sort((a, b2) => b2 - a); // top to bottom
  const r = C.R_IN;
  const white = new THREE.Color(1, 1, 1);
  for (let i = 0; i < seg; i++) {
    const a0 = Math.PI + (i / seg) * Math.PI, a1 = Math.PI + ((i + 1) / seg) * Math.PI;
    for (let k = 0; k < Y.length - 1; k++) {
      const yt = Y[k], yb = Y[k + 1];
      const am = (a0 + a1) / 2, ym = (yt + yb) / 2;
      if (holes.some((h) => am >= h.a0 && am <= h.a1 && ym <= h.y1 && ym >= h.y0)) continue;
      const pts = [
        [a0, yb],
        [a1, yb],
        [a1, yt],
        [a0, yt],
      ].map(([a, y]) => b.vert(Math.cos(a) * r, y, Math.sin(a) * r, -Math.cos(a), 0, -Math.sin(a), (a * r) / 24, y / 24, white));
      // inward-facing: counter-clockwise as seen from the axis
      b.tri(pts[0], pts[1], pts[2]);
      b.tri(pts[0], pts[2], pts[3]);
    }
  }
  return b.build();
}

function sectionGeometry(holes) {
  const b = new Batch();
  const white = new THREE.Color(1, 1, 1);
  const rect = (x0, x1, y0, y1) => {
    const a = b.vert(x0, y0, 0, 0, 0, 1, x0 / 12, y0 / 12, white);
    const c = b.vert(x1, y0, 0, 0, 0, 1, x1 / 12, y0 / 12, white);
    const d = b.vert(x1, y1, 0, 0, 0, 1, x1 / 12, y1 / 12, white);
    const e = b.vert(x0, y1, 0, 0, 0, 1, x0 / 12, y1 / 12, white);
    b.tri(a, c, d);
    b.tri(a, d, e);
  };
  for (const side of [1, -1]) {
    const x0 = side > 0 ? C.R_IN : -C.R_OUT;
    const x1 = side > 0 ? C.R_OUT : -C.R_IN;
    const cuts = holes.filter((h) => h.side === side).sort((a, b2) => b2.y1 - a.y1);
    let top = 0;
    for (const h of cuts) {
      rect(x0, x1, h.y1, top);
      top = h.y0;
    }
    rect(x0, x1, C.BASE_Y, top);
  }
  // top rim of the wall at ground level
  // (theta 0..PI lands behind the cut once the ring is laid flat)
  const rim = new THREE.RingGeometry(C.R_IN, C.R_OUT, 64, 1, 0, Math.PI);
  rim.rotateX(-Math.PI / 2);
  b.add(rim, new THREE.Matrix4().makeTranslation(0, -0.02, 0), white);
  return b.build();
}

// ---------------------------------------------------------------------------
// Numerals painted on the cut face of the wall.
// ---------------------------------------------------------------------------
function numeralsMesh() {
  const atlas = numeralAtlas(147, 16, 128);
  const { cols, rows } = atlas.userData;
  const b = new Batch();
  const white = new THREE.Color(1, 1, 1);
  const quad = (n, x, y, size) => {
    const i = n - 1;
    const cx = i % cols, cy = Math.floor(i / cols);
    const u0 = cx / cols, u1 = (cx + 1) / cols;
    const v1 = 1 - cy / rows, v0 = 1 - (cy + 1) / rows;
    const h = size / 2;
    const a = b.vert(x - h, y - h, 0.03, 0, 0, 1, u0, v0, white);
    const c = b.vert(x + h, y - h, 0.03, 0, 0, 1, u1, v0, white);
    const d = b.vert(x + h, y + h, 0.03, 0, 0, 1, u1, v1, white);
    const e = b.vert(x - h, y + h, 0.03, 0, 0, 1, u0, v1, white);
    b.tri(a, c, d);
    b.tri(a, d, e);
  };
  for (let n = 1; n <= C.LEVELS; n++) {
    const y = C.floorY(n) + 3.7;
    const size = n % 10 === 0 ? 3.0 : 2.4;
    quad(n, 76.5, y, size);
    quad(n, -76.5, y, size);
  }
  const mat = new THREE.MeshBasicMaterial({
    map: atlas,
    transparent: true,
    depthWrite: false,
    // over-bright so the paint stays crisp white against the grey cut face
    color: new THREE.Color(1.55, 1.52, 1.44),
    polygonOffset: true,
    polygonOffsetFactor: -2,
  });
  const mesh = new THREE.Mesh(b.build(), mat);
  mesh.name = 'shell-numerals';
  mesh.renderOrder = 2;
  return mesh;
}

// ---------------------------------------------------------------------------
export function buildShell({ pool }) {
  const group = new THREE.Group();
  group.name = 'shell';

  // Materials local to the shell
  const wallMat = new THREE.MeshStandardMaterial({ name: 'shell-wall', map: TEX.wall, color: '#b4ae9f', roughness: 0.9 });
  const sectionMat = new THREE.MeshStandardMaterial({ name: 'shell-section', map: TEX.section, color: '#a8a19a', roughness: 0.85 });
  // a shade down so the tiles sit at the original's dim greige
  const floorMat = new THREE.MeshStandardMaterial({ name: 'slab-floor', map: TEX.floor, color: '#d9dbdc', normalMap: TEX.floorN, normalScale: new THREE.Vector2(0.5, 0.5), roughness: 0.82 });
  const ceilMat = new THREE.MeshStandardMaterial({ name: 'slab-ceiling', map: TEX.section, color: '#c9c3b6', roughness: 0.9 });
  const slabSection = new THREE.MeshStandardMaterial({ name: 'slab-section', map: TEX.section, color: '#ddd7c9', roughness: 0.85 });

  // wall + cut ring
  const tunnel = { side: -1, y0: C.floorY(70) - 0.05, y1: C.floorY(70) + C.ROOM_H + 0.05, a0: Math.PI - 0.01, a1: Math.PI + Math.asin(9 / C.R_IN) };
  const wall = new THREE.Mesh(wallGeometry([tunnel]), wallMat);
  wall.name = 'shell-wall';
  wall.receiveShadow = true;
  wall.castShadow = true;
  const section = new THREE.Mesh(sectionGeometry([tunnel]), sectionMat);
  section.name = 'shell-wall-section';
  section.receiveShadow = true;
  group.add(wall, section);

  // floor slabs 1..144 (instanced) + roof cap with the opening under the hatch
  const slabGeo = slabGeometry();
  const slabs = new THREE.InstancedMesh(slabGeo, [floorMat, ceilMat, slabSection], C.LEVELS);
  slabs.name = 'shell-slabs';
  const m4 = new THREE.Matrix4();
  const tint = new THREE.Color();
  for (let n = 1; n <= C.LEVELS; n++) {
    m4.makeTranslation(0, C.floorY(n), 0);
    slabs.setMatrixAt(n - 1, m4);
    tint.set(SLAB_TINT[levelType(n)]);
    slabs.setColorAt(n - 1, tint);
  }
  slabs.castShadow = slabs.receiveShadow = true;
  slabs.computeBoundingSphere();
  group.add(slabs);

  const roofGeo = slabGeometry({ rIn: 0, holes: [[-31.5, -0.7, -23.8, -4.3]] });
  const roof = new THREE.Mesh(roofGeo, [ceilMat, ceilMat, slabSection]);
  roof.name = 'shell-roofcap';
  roof.castShadow = roof.receiveShadow = true;
  group.add(roof);

  group.add(numeralsMesh());

  // ------------------------------------------------------------------ strips
  const strips = new InstanceSet('shell-strip', UNIT.box(), MATS.glow, { castShadow: false, receiveShadow: false });
  for (let n = 0; n <= C.LEVELS; n++) {
    const y = C.floorY(n) - C.SLAB_T / 2;
    const c = n === 0 ? '#d8c49a' : STRIP_BY_LEVEL[n] || STRIP_BY_TYPE[levelType(n)];
    // the Gap's warning strips stay saturated rather than blooming to white
    const k = n >= 90 && n <= 92 ? 1.9 : 1.7;
    for (const s of [1, -1]) strips.add(s * 47.25, y, 0.035, 55.5, 0.14, 0.06, col(c, k));
  }

  // --------------------------------------------------------------- generics
  const S = {
    box: new InstanceSet('shell-box', UNIT.box(), MATS.matte),
    cyl: new InstanceSet('shell-cyl', UNIT.cyl(8), MATS.matte),
    column: new InstanceSet('shell-column', UNIT.cyl(12), MATS.matte),
    pipe: new InstanceSet('shell-pipe', UNIT.cyl(7), MATS.metal),
    bigPipe: new InstanceSet('shell-bigPipe', UNIT.cyl(10), MATS.metal),
    door: new InstanceSet('shell-door', buildDoorGeo(), MATS.matte),
    porthole: new InstanceSet('shell-porthole', buildPortholeGeo(), MATS.matte),
    blob: new InstanceSet('shell-blob', UNIT.ico(0), MATS.foliage),
    tree: new InstanceSet('shell-tree', buildTreeGeo(), MATS.foliage),
    rack: new InstanceSet('shell-rack', buildRackGeo(), MATS.matte),
    catwalk: new InstanceSet('shell-catwalk', buildCatwalkGeo(), MATS.metal),
    bench: new InstanceSet('shell-bench', buildBenchGeo(), MATS.wood),
    lampBox: new InstanceSet('shell-lampBox', UNIT.box(), MATS.glow, { castShadow: false, receiveShadow: false }),
    lampCyl: new InstanceSet('shell-lampCyl', UNIT.cyl(8), MATS.glow, { castShadow: false, receiveShadow: false }),
  };

  for (let n = 1; n <= C.LEVELS; n++) {
    const special = SPECIAL_SIDES.get(n) || {};
    for (const side of ['east', 'west']) {
      const s = side === 'east' ? 1 : -1;
      landing(S, n, s, special[side]);
      if (special[side]) continue;
      buildGenericSide(S, n, s, pool);
    }
  }

  group.add(strips.build());
  for (const set of Object.values(S)) group.add(set.build());
  return group;
}

// ---------------------------------------------------------------------------
// The strip of floor between the stair landing ring and the rooms: a bench,
// a lamp, a bin and (on two-storey levels) a stair to the upper walkway.
// ---------------------------------------------------------------------------
function landing(S, n, s, special) {
  const y0 = C.floorY(n);
  const r = makeRng(n * 31 + (s > 0 ? 7 : 3));
  const type = levelType(n);
  if (n === 1) return; // the top landing belongs to the sheriff's office and the cafeteria
  S.bench.add(s * 21.8, y0, -3.2 - r() * 1.4, 1, 1, 1, '#886946', 0, s > 0 ? Math.PI : 0, 0);
  // bright wall lamp on the stairwell wall's outer face, on the short return
  // between the cut and the side doorway (z 0 .. -0.8)
  S.lampBox.add(s * 19.66, y0 + 3.05, -0.42, 0.3, 0.5, 0.4, col('#fff0d6', 7));
  if (special) return;
  S.cyl.add(s * 24.2, y0 + 0.45, -1.2, 0.3, 0.9, 0.3, PAL.dark[2]);
  S.box.add(s * 24.83, y0 + 1.8, -3.9 - r() * 0.8, 0.04, 0.9, 1.3, '#cabc97');
  if (type === 'apart' || type === 'office' || type === 'storage') {
    // stair up to the upper walkway
    S.box.add(s * 22.9, y0 + 1.65, -6.6, 1.3, 0.22, 5.9, PAL.partition, 0.636, 0, 0);
    for (let k = 0; k < 9; k++) {
      const t = (k + 0.5) / 9;
      S.box.add(s * 22.9, y0 + 0.2 + t * 3.3, -3.9 - t * 5.4, 1.3, 0.06, 0.34, '#9a9488');
    }
    S.box.add(s * 22.25, y0 + 2.6, -6.6, 0.05, 0.05, 6.4, '#26282c', 0.636, 0, 0);
    // lower partition, upper balustrade and rail
    S.box.add(s * 25, y0 + 1.63, -6.53, 0.3, 3.25, 12.95, PAL.partition);
    S.box.add(s * 25, y0 + 1.63, -0.03, 0.32, 3.26, 0.05, PAL.cap);
    S.box.add(s * 25, y0 + 4.0, -6.53, 0.2, 1.0, 12.95, PAL.partition);
    S.box.add(s * 25, y0 + 4.0, -0.03, 0.22, 1.01, 0.05, PAL.cap);
    S.box.add(s * 25, y0 + 4.62, -6.5, 0.07, 0.07, 13.0, '#26282c');
  }
}

// ---------------------------------------------------------------------------
function buildGenericSide(S, n, s, pool) {
  const type = levelType(n);
  const y0 = C.floorY(n);
  const r = makeRng(n * 977 + (s > 0 ? 13 : 29));
  const X = (x) => s * x;
  if (type === 'apart' || type === 'office') cells(S, n, s, type, r, pool);
  else if (type === 'farm') farm(S, n, s, r, pool);
  else if (type === 'storage') storage(S, n, s, r, pool);
  else if (type === 'deep') deep(S, n, s, r, pool);

  // service pipes along the front edge of the ceiling
  if (type !== 'deep') {
    const copper = r() < 0.35;
    S.pipe.add(X(50), y0 + 6.54, -0.55, 0.14, 50, 0.14, '#696965', 0, 0, Math.PI / 2);
    S.pipe.add(X(50), y0 + 6.05, -1.15, 0.2, 50, 0.2, copper ? '#7a4a2c' : '#696965', 0, 0, Math.PI / 2);
    S.pipe.add(X(50), y0 + 6.51, -1.9, 0.11, 50, 0.11, '#696965', 0, 0, Math.PI / 2);
    if (type === 'apart' || type === 'office' || type === 'storage') S.pipe.add(X(50), y0 + 3.05, -0.6, 0.09, 50, 0.09, '#696965', 0, 0, Math.PI / 2);
  }
}

/** Two-storey rows of apartments or offices. */
function cells(S, n, s, type, r, pool) {
  const y0 = C.floorY(n);
  const X = (x) => s * x;
  const zone = C.zoneOf(n);
  const wallPal = zone === 'top' ? [...PAL.teal, ...PAL.teal, ...PAL.grey] : zone === 'mids' ? [...PAL.teal, ...PAL.green, ...PAL.grey] : [...PAL.grey, ...PAL.warm, ...PAL.teal];
  // mid floor and partitions
  S.box.add(X(50), y0 + 3.38, -6.53, 50, 0.25, 12.95, PAL.partition);
  S.box.add(X(50), y0 + 3.38, -0.03, 50, 0.26, 0.05, PAL.cap);
  for (let i = 1; i < 6; i++) {
    const x = C.CELL_X0 + i * C.CELL_W;
    S.box.add(X(x), y0 + 3.5, -6.53, 0.3, 7, 12.95, PAL.partition);
    S.box.add(X(x), y0 + 3.5, -0.03, 0.32, 7.01, 0.05, PAL.cap);
  }
  const storeys = [
    { base: 0, h: 3.25 },
    { base: 3.5, h: 3.5 },
  ];
  for (let i = 0; i < 6; i++) {
    const xc = C.CELL_X0 + (i + 0.5) * C.CELL_W;
    for (const st of storeys) {
      const yb = y0 + st.base;
      // back wall
      const wc = r.pick(wallPal);
      S.box.add(X(xc), yb + st.h / 2, -12.85, C.CELL_W, st.h, 0.3, wc);
      // door and porthole on the back wall
      const doorLeft = r() < 0.5;
      const dx = xc + (doorLeft ? -1 : 1) * (1.6 + r() * 0.9);
      const px = xc + (doorLeft ? 1 : -1) * (1.8 + r() * 0.7);
      S.door.add(X(dx), yb, -12.69, 1, 1, 1, '#8b8679');
      S.porthole.add(X(px), yb + 1.75, -12.69, 1, 1, 1, '#8b8679');
      const lampY = yb + st.h;
      if (type === 'office') {
        officeCell(S, X, xc, yb, r);
        if (r() < 0.75) S.lampBox.add(X(xc), lampY - 0.06, -6.5, 1.4, 0.08, 0.6, col('#f4f2ea', 2.6));
      } else {
        apartmentCell(S, X, xc, yb, r);
        if (r() < 0.82) S.lampCyl.add(X(xc), lampY - 0.55, -6.5, 0.24, 0.28, 0.24, col('#fff0d2', 4.2));
        else S.lampBox.add(X(xc), lampY - 0.06, -6.5, 1.4, 0.08, 0.6, col('#f4f2ea', 2.4));
      }
    }
    if (i % 3 === 1) pool.add(X(xc), y0 + 2.6, -6.5, 0xffe2b8, 10);
  }
}

function apartmentCell(S, X, xc, yb, r) {
  const flip = r() < 0.5 ? 1 : -1;
  // bed against the back wall
  const bx = xc - flip * (2.4 + r() * 0.6);
  S.box.add(X(bx), yb + 0.28, -11.8, 2.0, 0.55, 1.0, r.pick(PAL.blanket));
  S.box.add(X(bx - flip * 0.8), yb + 0.62, -11.8, 0.35, 0.18, 0.8, '#e8e2d4');
  // cabinet / dresser
  S.box.add(X(xc + flip * (2.4 + r() * 0.5)), yb + 0.45, -12.2, 1.6, 0.9, 0.6, r.pick(PAL.dark));
  // table in the middle
  S.box.add(X(xc + (r() - 0.5) * 2), yb + 0.37, -5 - r() * 1.4, 1.2, 0.74, 0.8, r.pick(PAL.wood));
  // wardrobe by a partition
  S.box.add(X(xc - flip * 3.75), yb + 1.0, -4.3 - r() * 3.5, 0.4, 2.0, 1.5, '#7b5f3f');
  // a couch or rug near the front, sometimes
  if (r() < 0.45) S.box.add(X(xc + (r() - 0.5) * 3), yb + 0.36, -3.1 - r() * 1.8, 1.8, 0.72, 0.85, r.pick(PAL.blanket));
  if (r() < 0.25) S.box.add(X(xc + (r() - 0.5) * 3), yb + 0.02, -6 - r() * 2, 2.2, 0.03, 1.6, r.pick(['#8c3b2c', '#3e5c7a', '#6a5a3c']));
  // pot plant on a shelf
  if (r() < 0.35) S.blob.add(X(xc + (r() - 0.5) * 5), yb + 0.5 + (r() < 0.5 ? 0 : 1.4), -12.1, 0.4, 0.35, 0.4, '#41883c', 0, r() * 3, 0);
  // stool
  if (r() < 0.5) S.cyl.add(X(xc + (r() - 0.5) * 3), yb + 0.25, -6 - r(), 0.22, 0.5, 0.22, r.pick(PAL.wood));
}

function officeCell(S, X, xc, yb, r) {
  for (const k of [-1, 1]) {
    const dx = xc + k * (1.4 + r() * 0.8);
    const dz = -5 - r() * 4.5;
    S.box.add(X(dx), yb + 0.37, dz, 1.6, 0.74, 0.8, '#414544');
    S.box.add(X(dx), yb + 0.97, dz - 0.3 + r() * 0.2, 0.45, 0.42, 0.45, '#373d38');
    if (r() < 0.6) S.box.add(X(dx + 0.2), yb + 0.22, dz + 0.9, 0.45, 0.45, 0.45, '#2f3432');
  }
  S.box.add(X(xc + (r() - 0.5) * 6), yb + 0.9, -12.3, 0.5, 1.8, 0.6, '#393e3c');
  if (r() < 0.5) S.box.add(X(xc + (r() - 0.5) * 5), yb + 0.9, -12.3, 0.5, 1.8, 0.6, '#454a47');
}

/** Crop levels: one deep soil bed packed with crops, columns and grow-light tubes. */
function farm(S, n, s, r, pool) {
  const y0 = C.floorY(n);
  const X = (x) => s * x;
  S.box.add(X(50), y0 + 3.5, -12.85, 50, 7, 0.3, r.pick(['#4a5a44', '#4f5e47', '#475743']));
  // soil from just behind the slab edge to the back wall
  S.box.add(X(50), y0 + 0.18, -6.75, 48, 0.36, 11.3, '#3a2a1f');
  S.box.add(X(50), y0 + 0.37, -6.75, 48.1, 0.04, 11.36, '#43301f');
  // close rows of big, dark leafy clumps that all but hide the soil
  const rows = [-1.75, -3.55, -5.35, -7.15, -8.95, -10.75];
  rows.forEach((z, ri) => {
    const count = 30 + Math.floor(r() * 4);
    for (let k = 0; k < count; k++) {
      const x = 26.2 + (k + 0.15 + r() * 0.7) * (47.6 / count);
      const rad = (ri === 0 ? 0.72 : 0.62) + r() * 0.3;
      S.blob.add(X(x), y0 + 0.36 + rad * 0.5, z + (r() - 0.5) * 0.7, rad, rad * 0.8, rad, r.pick(PAL.crop), r(), r() * 6, 0);
    }
  });
  // cool white grow tubes under the ceiling
  for (const z of [-2.4, -4.9, -7.4, -9.8]) S.lampBox.add(X(50), y0 + 6.72, z, 47, 0.06, 0.14, col('#f2f5ff', 2.8));
  for (let k = 0; k < 5; k++) {
    const x = 28 + r() * 44;
    const sc = 1.1 + r() * 0.5;
    S.tree.add(X(x), y0 + 0.36, -10.8 - r() * 1.2, sc, sc * (1 + r() * 0.25), sc, '#86c47f', 0, r() * 6, 0);
  }
  for (const x of [33.3, 50, 66.7]) {
    S.column.add(X(x), y0 + 3.5, -8.6, 0.85, 7, 0.85, '#6f6c66');
  }
  for (let k = 0; k < 5; k++) S.lampCyl.add(X(28 + r() * 44), y0 + 4.2 + r() * 1.6, -4.4 - r() * 3.1, 0.14, 0.14, 0.14, col('#ffe2a8', 5));
  pool.add(X(50), y0 + 5, -6, 0xe8f0e0, 14);
}

/** Storage levels: two long rows of white racks loaded with cartons. */
function storage(S, n, s, r, pool) {
  const y0 = C.floorY(n);
  const X = (x) => s * x;
  S.box.add(X(50), y0 + 3.5, -12.85, 50, 7, 0.3, r.pick(['#4d5d3f', '#52613f', '#4a5a3d']));
  // two rows of open white racks, lightly stocked: a carton or two on some
  // shelves, many shelves bare
  for (const [z, off] of [
    [-3.0, 0],
    [-9.8, 1.05],
  ]) {
    for (let k = 0; k < 23; k++) {
      const x = 26.5 + off + k * 2.15 + (r() - 0.5) * 0.1;
      // keep clear of the curved outer wall
      if (x + RACK.w / 2 > Math.sqrt(C.R_IN ** 2 - (Math.abs(z) + RACK.d / 2) ** 2) - 0.1) continue;
      S.rack.add(X(x), y0, z, 1, 1, 1, '#eeeeea', 0, 0, 0);
      RACK.shelves.slice(0, -1).forEach((sy) => {
        let cx = x - RACK.w / 2 + 0.06;
        for (;;) {
          const w = 0.44 + r() * 0.2;
          if (cx + w > x + RACK.w / 2 - 0.04) break;
          if (r() < 0.36) {
            const h = Math.min(0.56, w * (0.8 + r() * 0.3));
            S.box.add(X(cx + w / 2), y0 + sy + h / 2 + 0.02, z + (r() - 0.5) * 0.1, w * 0.9, h, 0.46 + r() * 0.1, r.pick(PAL.box));
          }
          cx += w + 0.05;
        }
      });
    }
  }
  for (let k = 0; k < 7; k++) S.lampBox.add(X(28 + k * 7.2), y0 + 6.94, -6.5, 1.4, 0.08, 0.6, col('#f4f2ea', 2.6));
  pool.add(X(50), y0 + 5, -6.5, 0xf0f0e8, 10);
}

/** Down Deep: open machine halls, catwalks and big pipes. */
function deep(S, n, s, r, pool) {
  const y0 = C.floorY(n);
  const X = (x) => s * x;
  S.box.add(X(50), y0 + 3.5, -12.85, 50, 7, 0.3, r.pick(['#57544c', '#5c5850', '#524f48']));
  // yellow-railed catwalk across the middle of the hall
  for (let k = 0; k < 10; k++) S.catwalk.add(X(27.5 + k * 5), y0 + 3.45, -4.5, 1, 1, 1, '#ffffff');
  // big pipes
  S.bigPipe.add(X(50), y0 + 6.25, -1.6, 0.42, 50, 0.42, '#55565a', 0, 0, Math.PI / 2);
  S.bigPipe.add(X(50), y0 + 5.45, -2.9, 0.28, 50, 0.28, '#5d5d58', 0, 0, Math.PI / 2);
  S.bigPipe.add(X(50), y0 + 1.1, -11.6, 0.32, 50, 0.32, '#6a3a24', 0, 0, Math.PI / 2);
  for (let k = 0; k < 3; k++) {
    const x = 32 + k * 16 + (r() - 0.5) * 4;
    S.bigPipe.add(X(x), y0 + 3.5, -7.4, 0.17, 7, 0.17, '#5e3524');
  }
  // machines on the floor and on the catwalk
  for (let k = 0; k < 4; k++) {
    const x = 29 + k * 12 + r() * 5;
    const w = 2.2 + r() * 1.2, h = 1.1 + r() * 0.5;
    S.box.add(X(x), y0 + h / 2, -9.6, w, h, 1.7, r.pick(['#3a3d3c', '#434746', '#353836']));
    S.box.add(X(x + w * 0.3), y0 + h + 0.05, -9.0, 0.12, 0.08, 0.12, col('#ff3b2e', 4));
  }
  for (let k = 0; k < 3; k++) {
    // a few cabinets and toolboxes left on the catwalk
    const x = 30 + k * 15 + r() * 6;
    const w = 0.8 + r() * 0.9;
    S.box.add(X(x), y0 + 3.5 + 0.35, -4.8, w, 0.7, 0.7, r.pick(['#3a3d3c', '#4a3f35', '#454846']));
    if (r() < 0.6) S.box.add(X(x), y0 + 4.25, -4.5, 0.1, 0.08, 0.1, col('#ff4a36', 4));
  }
  // switch panels and rusted plates on the back wall above the catwalk
  for (let k = 0; k < 6; k++) {
    const x = 29 + k * 8 + r() * 3;
    const rust = r() < 0.45;
    S.box.add(X(x), y0 + 5.3 + r() * 0.3, -12.62, 1.2 + r() * 0.8, 1.1 + r() * 0.5, 0.14, rust ? '#6b4a32' : '#2e3230');
  }
  // bright fittings along the front of the ceiling
  // hung low enough under the slab edge to be seen from the level above
  for (let k = 0; k < 8; k++) S.lampBox.add(X(28.5 + k * 6.3), y0 + 6.72, -0.95, 1.1, 0.1, 0.36, col('#f6f3ea', 5));
  pool.add(X(50), y0 + 4, -6.5, 0xffe9c8, 12);
}
