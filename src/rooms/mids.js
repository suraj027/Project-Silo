import * as THREE from 'three';
import { Kit, UNIT, col, extrude, roundRectShape } from '../core/geom.js';
import { MATS } from '../core/materials.js';
import { makeRng } from '../core/rng.js';
import * as C from '../core/constants.js';
import { Wisps } from '../world/fx.js';
import { P, Signs, shell, screen, roomMats, SECTION } from './common.js';
import { toTexture, surfaceViewCanvas } from '../core/textures.js';

// ---------------------------------------------------------------------------
// The Mids: levels 50–119.
// ---------------------------------------------------------------------------

export function buildMids({ pool }) {
  const group = new THREE.Group();
  group.name = 'rooms/mids';
  const dyn = new THREE.Group();
  dyn.name = 'rooms/mids/dyn';
  const updaters = [];
  const signs = new Signs('mids');
  const ctx = { pool, signs, dyn, updaters };
  for (const make of [filtration, medical, gardens, market, mines, farms, midscafe]) group.add(make(ctx));
  group.add(signs.mesh());
  return { group, dyn, update: (dt, t) => updaters.forEach((u) => u(dt, t)) };
}

// ---------------------------------------------------------------------------
// Local helpers
// ---------------------------------------------------------------------------

/** |x| of the silo's inner face at depth z. */
const xCirc = (z, r = C.R_IN) => Math.sqrt(Math.max(0, r * r - z * z));
const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

const waterMat = () => {
  const m = MATS.water.clone();
  m.normalMap = MATS.water.normalMap.clone();
  m.normalMap.needsUpdate = true;
  return m;
};

/** Horizontal water surface with an explicit tint (the material uses vertex colours). */
function waterPlane(w, d, color, mat) {
  const g = new THREE.PlaneGeometry(w, d);
  const c = col(color);
  const n = g.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) arr.set([c.r, c.g, c.b], i * 3);
  g.setAttribute('color', new THREE.Float32BufferAttribute(arr, 3));
  const m = new THREE.Mesh(g, mat);
  m.rotation.x = -Math.PI / 2;
  return m;
}

/** Horizontal water surface over an [x, z] outline, tinted like waterPlane. */
function waterShape(pts, y, color, mat) {
  const sh = new THREE.Shape();
  pts.forEach(([x, z], i) => (i ? sh.lineTo(x, -z) : sh.moveTo(x, -z)));
  const g = new THREE.ShapeGeometry(sh);
  const c = col(color);
  const n = g.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) arr.set([c.r, c.g, c.b], i * 3);
  g.setAttribute('color', new THREE.Float32BufferAttribute(arr, 3));
  // planar UVs in metres so the ripple normal map tiles like the plane version
  const uv = g.attributes.uv;
  for (let i = 0; i < n; i++) uv.setXY(i, g.attributes.position.getX(i) / 8, g.attributes.position.getY(i) / 8);
  const m = new THREE.Mesh(g, mat);
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  return m;
}

/** Points on the silo's inner circle (radius r) between depths z0 > z1. */
function arcPts(s, r, z0, z1, n = 24) {
  const a0 = Math.asin(Math.min(1, -z0 / r)), a1 = Math.asin(Math.min(1, -z1 / r));
  const out = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n;
    out.push([s * r * Math.cos(a), -r * Math.sin(a)]);
  }
  return out;
}

/** Flat slab from a polygon of [x, z] points; its top face sits at yTop. */
function slab(k, pts, yTop, color, { t = 0.03, mat = 'matte' } = {}) {
  const sh = new THREE.Shape();
  pts.forEach(([x, z], i) => (i ? sh.lineTo(x, z) : sh.moveTo(x, z)));
  sh.closePath();
  k.geo(mat, extrude(sh, t, false, 1), 0, yTop, 0, color, 1, 1, 1, Math.PI / 2, 0, 0);
}

/** Floor covering the whole room footprint out to the curved silo wall. */
function roomFloor(k, s, y0, x0, back, color, opts) {
  const R = C.R_IN - 0.02;
  slab(k, [[s * x0, 0], ...arcPts(s, R, 0, -back, 28), [s * x0, -back]], y0 + 0.02, color, opts);
}

/**
 * Lining on the curved silo wall between depths z0 > z1, so the room reads
 * as its own space rather than bare shell concrete.
 */
function liner(k, s, y0, z0, z1, color, { h = C.ROOM_H, y = 0, dado = null, dadoH = 1.1, cap = true } = {}) {
  const R = C.R_IN - 0.07;
  const a0 = Math.asin(-z0 / R) + 0.04 / R, a1 = Math.asin(Math.min(1, -z1 / R));
  const n = Math.max(2, Math.ceil((R * (a1 - a0)) / 2.4));
  const seg = (R * (a1 - a0)) / n;
  for (let i = 0; i < n; i++) {
    const a = a0 + ((a1 - a0) * (i + 0.5)) / n;
    const ry = Math.atan2(Math.cos(a), -s * Math.sin(a));
    k.box('matte', s * R * Math.cos(a), y0 + y + h / 2, -R * Math.sin(a), seg + 0.06, h, 0.12, color, ry);
    if (dado) {
      const rd = R - 0.08;
      k.box('matte', s * rd * Math.cos(a), y0 + y + dadoH / 2, -rd * Math.sin(a), (seg * rd) / R + 0.06, dadoH, 0.04, dado, ry);
    }
  }
  if (cap && z0 === 0) k.bb('matte', s * (C.R_IN - 0.2), y0 + y, -0.05, s * C.R_IN, y0 + y + h, 0.001, SECTION);
}

/**
 * A wall with arched doorways cut right through it. Built in a local frame at
 * (x, y, z) turned by ry: the wall runs along local +x for `len`, centred on
 * local z = 0. Doors are { c, w, h } (centre along the wall, width, height).
 */
function archWall(k, x, y, z, ry, len, h, color, { t = 0.3, doors = [], dado = null, dadoH = 1.1, frame = null } = {}) {
  const ds = [...doors].sort((a, b) => a.c - b.c);
  const sh = new THREE.Shape();
  sh.moveTo(0, 0);
  for (const d of ds) {
    const r0 = d.w / 2;
    sh.lineTo(d.c - r0, 0);
    sh.lineTo(d.c - r0, d.h - r0);
    sh.absarc(d.c, d.h - r0, r0, Math.PI, 0, true);
    sh.lineTo(d.c + r0, 0);
  }
  sh.lineTo(len, 0);
  sh.lineTo(len, h);
  sh.lineTo(0, h);
  sh.closePath();
  k.push(x, y, z, ry);
  k.geo('matte', extrude(sh, t, false, 10), 0, 0, -t / 2, color);
  if (dado) {
    let from = 0;
    const spans = [];
    for (const d of ds) {
      spans.push([from, d.c - d.w / 2]);
      from = d.c + d.w / 2;
    }
    spans.push([from, len]);
    for (const [a, b] of spans) {
      if (b - a < 0.02) continue;
      for (const sz of [-1, 1]) k.box('matte', (a + b) / 2, dadoH / 2, sz * (t / 2 + 0.015), b - a, dadoH, 0.03, dado);
    }
  }
  if (frame) for (const d of ds) P.archFrame(k, d.c, 0, 0, 0, { w: d.w, h: d.h, color: frame, depth: t + 0.08, t: 0.12 });
  k.pop();
}

/** Plain wall along z at x, from za (nearer the cut) back to zb, with a cut cap at z = 0. */
function wallZ(k, x, za, zb, y0, color, { h = C.ROOM_H, t = 0.3, dado = null, dadoH = 1.1 } = {}) {
  k.bb('matte', x - t / 2, y0, zb, x + t / 2, y0 + h, za, color);
  if (dado) for (const sx of [-1, 1]) k.bb('matte', x + sx * (t / 2), y0, zb, x + sx * (t / 2 + 0.03), y0 + dadoH, za - (za === 0 ? 0.06 : 0), dado);
  if (za === 0) k.bb('matte', x - t / 2 - 0.02, y0, -0.05, x + t / 2 + 0.02, y0 + h, 0.001, SECTION);
}

/** Catenary-ish string of bulbs between two points. */
function bulbString(k, a, b, sag, n, { color = '#ffd9a0', power = 5, r = 0.07, wire = '#1a1a1a' } = {}) {
  const pts = [];
  for (let j = 0; j <= n; j++) {
    const t = j / n;
    pts.push([lerp(a[0], b[0], t), lerp(a[1], b[1], t) - 4 * sag * t * (1 - t), lerp(a[2], b[2], t)]);
  }
  for (let j = 0; j < n; j++) k.rod('metal', pts[j], pts[j + 1], 0.01, wire, 3);
  for (let j = 1; j < n; j++) k.sphere('glow', pts[j][0], pts[j][1] - 0.06, pts[j][2], r, col(color, power), 6, 4);
  return n - 1;
}

/** Small bulb in a wire cage, tucked under the ceiling. */
function cagedBulb(k, x, yc, z, { drop = 0.45, color = '#fff6e6', power = 6 } = {}) {
  k.cyl('metal', x, yc - drop + 0.15, z, 0.015, drop - 0.15, '#2a2c2d', 4);
  k.cyl('metal', x, yc - 0.04, z, 0.12, 0.04, '#6b706e', 10);
  k.geo('glass', UNIT.cyl(10), x, yc - drop, z, '#e8ecea', 0.15, 0.3, 0.15);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.4;
    k.rod('metal', [x + Math.cos(a) * 0.15, yc - drop - 0.15, z + Math.sin(a) * 0.15], [x + Math.cos(a) * 0.15, yc - drop + 0.15, z + Math.sin(a) * 0.15], 0.008, '#3a3c3d', 3);
  }
  k.sphere('glow', x, yc - drop, z, 0.075, col(color, power), 8, 6);
}

/** Lamp standard: thin black post with a warm bulb on top. */
function lampPost(k, x, y0, z, { h = 3.8, color = '#ffe0a8', power = 6 } = {}) {
  k.cyl('metal', x, y0, z, 0.16, 0.1, '#1f2122', 8);
  k.cyl('metal', x, y0, z, 0.055, h, '#1f2122', 6);
  k.cyl('metal', x, y0 + h, z, 0.11, 0.05, '#1f2122', 8);
  k.sphere('glow', x, y0 + h + 0.14, z, 0.15, col(color, power), 10, 8);
}

// ---------------------------------------------------------------------------
// Level 55, west: water filtration. Dark steel tanks on plinths, a raised
// trough and a settling pool of lit water, and a curved railed catwalk.
// ---------------------------------------------------------------------------
function filtration({ pool, signs, dyn, updaters }) {
  const k = new Kit('mids/filtration');
  const y0 = C.floorY(55), yc = y0 + C.ROOM_H;
  const r = makeRng(5555);
  const wall = '#6a716c', back = 40;
  shell(k, { s: -1, y0, x0: 20.8, back, wall, door: [-1.2, -4.4] });
  roomFloor(k, -1, y0, 20.8, back, '#52574f');
  liner(k, -1, y0, 0, -back, wall);
  k.bb('matte', -xCirc(back) - 0.2, y0, -back + 0.01, -21, y0 + 0.45, -back + 0.07, '#3c4141');
  // tanks get a satin finish: lighter than bare metal so they read as grey steel
  const mats = roomMats();
  mats.tank = MATS.metal.clone();
  mats.tank.name = 'tank';
  mats.tank.metalness = 0.35;
  mats.tank.roughness = 0.34;

  const wm = waterMat();
  const water = new THREE.Group();
  dyn.add(water);
  updaters.push((dt, t) => wm.normalMap.offset.set(t * 0.03, t * 0.017));
  const LIT = col('#5fd8d2', 1.9);

  // raised trough on the west side, running back from the cut, which slices
  // it open into a U
  {
    const x0 = -59.8, x1 = -56.5, z1 = -21, H = 1.05, t = 0.35, WALL = '#7b807e', TOP = '#a3a9a6';
    for (const [a, b] of [[x0, x0 + t], [x1 - t, x1]]) {
      k.bb('matte', a, y0, z1, b, y0 + H - 0.05, 0, WALL);
      k.bb('matte', a, y0 + H - 0.05, z1, b, y0 + H, -0.02, TOP);
    }
    k.bb('matte', x0, y0, z1 - t, x1, y0 + H, z1, WALL);
    k.bb('matte', x0 + t, y0, z1, x1 - t, y0 + 0.35, 0, '#2c3435');
    k.bb('glow', x0 + t, y0 + H - 0.3, z1, x1 - t, y0 + H - 0.28, -0.03, LIT);
    const w = waterPlane(x1 - x0 - 2 * t, -z1, '#8fe6e2', wm);
    w.position.set((x0 + x1) / 2, y0 + H - 0.22, z1 / 2);
    w.name = 'filtration/water';
    water.add(w);
    // the cut: concrete U, and the water body behind the section
    k.bb('matte', x0 - 0.01, y0, -0.05, x0 + t, y0 + H, 0.001, SECTION);
    k.bb('matte', x1 - t, y0, -0.05, x1 + 0.01, y0 + H, 0.001, SECTION);
    k.bb('matte', x0 + t, y0, -0.05, x1 - t, y0 + 0.35, 0.001, SECTION);
    k.bb('glow', x0 + t, y0 + 0.35, -0.06, x1 - t, y0 + H - 0.22, -0.04, col('#3f9c98', 1.2));
  }

  // settling pool by the door: a low raised basin whose west rim sweeps back
  // in a long curve, with weir walls across the water
  const poolEdge = (z) => 29.08 - Math.sqrt(57.6 * 57.6 - (z + 0.62) ** 2);
  {
    const R = 57.6, ccx = 29.08, ccz = -0.62, xI = -21.3, zF = -2.2, H = 0.8, t = 0.3;
    const xL = poolEdge;
    const zB = ccz - Math.sqrt(R * R - (ccx - xI) ** 2);
    const N = 14, curve = [];
    for (let i = 0; i <= N; i++) {
      const z = zF + ((zB - zF) * i) / N;
      curve.push([xL(z), z]);
    }
    const poly = [...curve, [xI, zF]];
    const RIM = '#343a3a', EDGE = '#8a908e';
    for (let i = 0; i < N; i++) {
      const [ax, az] = curve[i], [bx, bz] = curve[i + 1];
      const dx = bx - ax, dz = bz - az, len = Math.hypot(dx, dz);
      const nx = dz / len, nz = -dx / len;
      const mx = (ax + bx) / 2 + (nx * t) / 2, mz = (az + bz) / 2 + (nz * t) / 2;
      const ry = -Math.atan2(dz, dx);
      k.box('matte', mx, y0 + (H - 0.06) / 2, mz, len + 0.04, H - 0.06, t, RIM, ry);
      k.box('matte', mx, y0 + H - 0.03, mz, len + 0.04, 0.06, t + 0.02, EDGE, ry);
    }
    k.bb('matte', xL(zF) - t, y0, zF, xI, y0 + H - 0.06, zF + t, RIM);
    k.bb('matte', xL(zF) - t, y0 + H - 0.06, zF - 0.01, xI, y0 + H, zF + t + 0.01, EDGE);
    k.bb('matte', xI, y0, zB - 0.2, xI + 0.3, y0 + H, zF + t, RIM);
    slab(k, poly, y0 + 0.12, '#263031', { t: 0.1 });
    slab(k, poly, y0 + H - 0.3, LIT, { t: 0.02, mat: 'glow' });
    const pw = waterShape(poly, y0 + H - 0.2, '#8fe6e2', wm);
    pw.name = 'filtration/pool';
    water.add(pw);
    for (let z = zF - 3.6; z > zB + 2; z -= 3.6) k.bb('matte', xL(z) + 0.05, y0 + 0.1, z - 0.09, xI, y0 + H - 0.14, z + 0.09, '#2d3435');
  }

  // seventeen tanks: a west bank following the wall, one out front, a long
  // back row and bank A beside the settling pool
  const TANK = '#8c9597', BAND = '#aab2b4';
  const tank = (x, z, rr = 1.7, h = 4.55) => {
    k.bb('metal', x - rr - 0.25, y0, z - rr - 0.25, x + rr + 0.25, y0 + 0.22, z + rr + 0.25, '#3a3e3f');
    k.cyl('tank', x, y0 + 0.22, z, rr, h, TANK, 28);
    k.geo('tank', UNIT.hemi(28, 7), x, y0 + 0.22 + h, z, TANK, rr, rr * 0.78, rr);
    for (const f of [0.2, 0.5, 0.8]) k.geo('tank', UNIT.torus(0.03, 4, 32), x, y0 + 0.22 + h * f, z, BAND, rr + 0.03, rr + 0.03, rr + 0.03, Math.PI / 2, 0, 0);
    k.cyl('metal', x, y0 + 0.22 + h + rr * 0.72, z, 0.12, 0.6, '#3a3f40', 10);
    // gauge facing the viewer, valve wheel lower down
    k.push(x, y0, z, -0.55);
    k.cylR('matte', 0, 2.5, rr + 0.03, 0.19, 0.06, '#e9e7df', Math.PI / 2, 0, 0, 14);
    k.box('matte', 0, 2.53, rr + 0.065, 0.02, 0.14, 0.01, '#2a2a2a', 0, 0, 0.7);
    k.pop();
    k.push(x, y0, z, 0.45);
    k.cylR('metal', 0, 1.75, rr + 0.06, 0.05, 0.16, '#3a3f40', Math.PI / 2, 0, 0, 6);
    k.geo('metal', UNIT.torus(0.12, 6, 18), 0, 1.75, rr + 0.15, '#5a6264', 0.26, 0.26, 0.26);
    k.pop();
  };
  const WEST = [[-66.2, -9.5], [-65.2, -15.1], [-63.9, -20.9], [-62, -26.3]];
  const BACKROW = [[-60.1, -35.2], [-56.1, -35], [-52.5, -35.2], [-48.9, -35.4], [-45.3, -35.6], [-41.7, -35.8]];
  const BANKA = [[-33.4, -7.8], [-31.6, -17.6], [-29.4, -25], [-26.4, -30.5]];
  for (const [x, z] of [...WEST, [-49.8, -6], [-58.5, -30.2], [-65.5, -31], ...BACKROW, ...BANKA]) tank(x, z);

  // low teal feed pipes into the trough, and dark manifolds overhead
  const teal = '#3a7a80';
  for (const [x, z] of WEST.slice(0, 3)) k.rod('metal', [x + 1.7, y0 + 0.5, z], [-59.8, y0 + 0.5, z], 0.11, teal, 8);
  k.rod('metal', [-61.8, y0 + 0.55, -33], [-37, y0 + 0.55, -33], 0.13, teal, 8);
  for (const [x] of BACKROW) k.rod('metal', [x, y0 + 0.55, -33], [x, y0 + 0.55, -33.4], 0.1, teal, 6);
  k.rod('metal', [-58.15, y0 + 0.55, -33], [-58.15, y0 + 0.55, -21.35], 0.12, teal, 8);
  for (const [x, z] of BANKA.slice(1, 3)) k.rod('metal', [x + 1.7, y0 + 0.45, z], [poolEdge(z) - 0.3, y0 + 0.45, z], 0.11, teal, 8);
  k.rod('metal', [-62, y0 + 6.55, -35.4], [-39, y0 + 6.55, -35.4], 0.2, '#343939', 10);
  k.rod('metal', [-67.2, y0 + 6.55, -8], [-61.6, y0 + 6.55, -28], 0.18, '#343939', 10);
  // risers by bank A
  for (const [x, z] of [[-35.6, -25.5], [-23.5, -33.5]]) {
    k.rod('metal', [x, y0, z], [x, yc, z], 0.16, '#3d4445', 10);
    for (const f of [0.15, 0.6]) k.cyl('metal', x, y0 + C.ROOM_H * f, z, 0.24, 0.12, '#2f3536', 10);
  }

  // glass settling column with a lamp inside, in the far corner
  const gx = -63.9, gz = -36;
  k.cyl('metal', gx, y0, gz, 1.75, 0.22, '#323637', 20);
  k.geo('glass', UNIT.cyl(20), gx, y0 + 3.2, gz, '#cfe6e2', 1.6, 6.0, 1.6);
  k.cyl('metal', gx, yc - 0.35, gz, 1.75, 0.35, '#323637', 20);
  k.sphere('glow', gx, y0 + 2.7, gz, 0.13, col('#e6fbff', 6), 10, 8);

  // curved catwalk: ramps up from the cut, then sweeps round towards bank A
  const cx = -31.5, cz = -1.5, cR = 12, cw = 2.6, N = 22;
  const A0 = Math.PI - 0.12, A1 = Math.PI * 1.5;
  const angle = (i) => A0 + ((A1 - A0) * i) / N;
  const deck = (i) => y0 + 0.12 + 0.68 * smooth(Math.min(1, i / (N * 0.28)));
  const at = (i, rr) => [cx + Math.cos(angle(i)) * rr, cz + Math.sin(angle(i)) * rr];
  const segLen = (cR * (A1 - A0)) / N;
  for (let i = 0; i < N; i++) {
    const a = (angle(i) + angle(i + 1)) / 2;
    const ry = Math.atan2(-Math.cos(a), -Math.sin(a));
    const ya = deck(i), yb = deck(i + 1), ym = (ya + yb) / 2;
    const rz = Math.atan2(yb - ya, segLen);
    const [px, pz] = [cx + Math.cos(a) * cR, cz + Math.sin(a) * cR];
    k.box('matte', px, ym, pz, segLen + 0.06, 0.1, cw, '#727978', ry, 0, rz);
    for (const e of [-1, 1]) {
      const rr = cR + e * (cw / 2);
      k.box('metal', cx + Math.cos(a) * rr, ym - 0.14, cz + Math.sin(a) * rr, ((segLen * rr) / cR) + 0.06, 0.28, 0.05, '#2c3030', ry, 0, rz);
    }
    if (i % 4 === 2) for (const e of [-1, 1]) {
      const [qx, qz] = [cx + Math.cos(a) * (cR + e * (cw / 2 - 0.15)), cz + Math.sin(a) * (cR + e * (cw / 2 - 0.15))];
      k.cyl('metal', qx, y0, qz, 0.06, ym - y0 - 0.05, '#2c3030', 6);
    }
  }
  const rail = '#1e2222';
  for (const e of [-1, 1]) {
    const rr = cR + e * (cw / 2 - 0.05);
    for (let i = 0; i < N; i++) {
      const [ax, az] = at(i, rr), [bx, bz] = at(i + 1, rr);
      k.rod('metal', [ax, deck(i) + 1.0, az], [bx, deck(i + 1) + 1.0, bz], 0.035, rail, 5);
      k.rod('metal', [ax, deck(i) + 0.5, az], [bx, deck(i + 1) + 0.5, bz], 0.022, rail, 4);
    }
    for (let i = 0; i <= N; i += 2) {
      const [ax, az] = at(i, rr);
      k.rod('metal', [ax, deck(i), az], [ax, deck(i) + 1.0, az], 0.028, rail, 4);
    }
  }
  // gauge post where the catwalk meets bank A
  const [ex, ez] = at(N, cR);
  k.cyl('metal', ex + 1.1, deck(N), ez, 0.04, 1.3, '#2c3030', 6);
  k.sphere('matte', ex + 1.1, deck(N) + 1.4, ez, 0.16, '#ecebe4', 10, 8);
  k.geo('matte', UNIT.torus(0.1, 6, 16), ex + 1.3, deck(N) + 0.9, ez + 0.1, '#a3342b', 0.22, 0.22, 0.22);

  // drums of treatment chemicals by the door
  for (let i = 0; i < 18; i++) P.barrel(k, -25.3 + (i % 6) * 0.62, y0, -0.5 - Math.floor(i / 6) * 0.65, { r: 0.28, h: 0.8, color: r.pick(['#3f6a8a', '#8a3f2f', '#5e6a3a']) });
  // ceiling tubes run front to back, so from the cut they read as short bright blobs
  for (const x of [-69.6, -57.4, -45.6, -33.9, -22.4]) {
    for (let j = 0; j < 6; j++) {
      const z = -3.2 - j * 8.1;
      if (z < -back + 2 || -x > xCirc(Math.abs(z) + 1.6) - 1.2) continue;
      P.tube(k, x, yc - 0.5, z, 3.0, Math.PI / 2, { color: '#e2f6ff', power: 4.5 });
    }
  }

  // the name board hangs from the ceiling in front of the back row
  for (const x of [-46.6, -39.2]) k.rod('metal', [x, y0 + 6.6, -30], [x, yc, -30], 0.015, '#1e2222', 3);
  signs.place(signs.make('WATER FILTRATION 55', { style: 'panel', size: 58, padY: 1.0, bg: '#2f3a3c' }), -42.9, y0 + 5.75, -30, 1.75);
  // bank B's board is bracketed off the front tank, bank A's sits on its tank
  for (const x of [-52.1, -50.1]) k.rod('metal', [x, y0 + 4.06, -4.02], [x, y0 + 4.06, -5.0], 0.02, '#2a2e2e', 4);
  signs.place(signs.make('OSMOSIS BANK B', { style: 'panel', size: 46, bg: '#2a3234' }), -51.0, y0 + 4.06, -3.98, 0.46);
  signs.place(signs.make('OSMOSIS BANK A', { style: 'panel', size: 46, bg: '#2a3234' }), -33.4, y0 + 3.95, -7.8 + 1.76, 0.4);
  const rz = -12.8, rx = -xCirc(rz, C.R_IN - 0.2);
  signs.place(signs.make('RESERVOIR ←', { style: 'panel', size: 40, bg: '#2a3234' }), rx, y0 + 3.9, rz, 0.62, Math.atan2(-rx, -rz));
  const w = new Wisps('filtration/wisp', { size: 1.6, opacity: 0.28, seed: 55 });
  w.add(-23.6, y0 + 1.0, -6, 1).add(-23.2, y0 + 1.0, -12, 1).add(-22.6, y0 + 1.0, -19, 1).add(-58.15, y0 + 1.2, -8, 1);
  dyn.add(w.group);
  updaters.push(w.update);
  pool.add(-44, y0 + 4.5, -18, 0xd8f4ff, 24);
  pool.add(-30, y0 + 4, -8, 0xd8f4ff, 18);
  pool.add(-60, y0 + 4, -12, 0xd8f4ff, 18);
  pool.add(-50, y0 + 4.5, -30, 0xd8f4ff, 14);
  return k.finish(mats);
}

// ---------------------------------------------------------------------------
// Level 62, east: medical. An entrance with visitors' chairs and cots, a
// foyer whose back wall opens into four arched bays, the front ward (beds,
// lockers, oxygen) with an arch through to the back ward, and a dim side
// room beyond the exit arch.
// ---------------------------------------------------------------------------
function medical({ pool, signs }) {
  const k = new Kit('mids/medical');
  const y0 = C.floorY(62), yc = y0 + C.ROOM_H, H = C.ROOM_H;
  const r = makeRng(6262);
  const wall = '#86958b', dado = '#5f6b62', dim = '#646d64', dimDado = '#4a524c', frame = '#d3dad6';
  const foyer = '#6f7c74', foyerDado = '#4f5a53';
  const back = 42;
  shell(k, { s: 1, y0, x0: 20.8, back, wall, door: [-1.2, -4.4], wainscot: dado });
  roomFloor(k, 1, y0, 20.8, back, '#929a90');
  liner(k, 1, y0, 0, -back, dim, { dado: dimDado });
  // the side room beyond the exit arch has a darker, scuffed floor
  slab(k, [[54.1, -0.01], ...arcPts(1, C.R_IN - 0.03, -0.01, -15.8, 6), [54.1, -15.8]], y0 + 0.035, '#747c70', { t: 0.01 });

  // partitions (x) and cross walls (z)
  wallZ(k, 30.9, 0, -3.2, y0, wall, { dado });
  wallZ(k, 34.4, 0, -16.15, y0, wall, { dado });
  archWall(k, 53.9, y0, 0, Math.PI / 2, 16.15, H, wall, { doors: [{ c: 4.2, w: 2.1, h: 2.7 }], dado, frame });
  k.bb('matte', 53.9 - 0.17, y0, -0.05, 53.9 + 0.17, yc, 0.001, SECTION);
  // foyer back wall with four tall, narrow bays, each a dim niche
  const BAYS = [28.7, 30.3, 31.9, 33.5];
  archWall(k, 20.95, y0, -16, 0, 34.25 - 20.95, H, foyer, {
    doors: BAYS.map((x) => ({ c: x - 20.95, w: 0.95, h: 2.8 })),
    dado: foyerDado,
    frame: '#8d9a92',
  });
  for (const x of BAYS) {
    k.bb('matte', x - 0.62, y0, -17.05, x + 0.62, y0 + 3.05, -16.95, '#48524d');
    for (const sx of [-0.62, 0.62]) k.bb('matte', x + sx - 0.05, y0, -16.95, x + sx + 0.05, y0 + 3.05, -16.2, '#56615b');
    k.bb('matte', x - 0.62, y0 + 2.95, -16.95, x + 0.62, y0 + 3.05, -16.2, '#56615b');
  }
  // front ward back wall with the arch to the back ward
  archWall(k, 34.55, y0, -9.6, 0, 53.75 - 34.55, H, wall, { doors: [{ c: 43.7 - 34.55, w: 2.3, h: 2.9 }], dado, frame });
  // side room and back ward walls
  archWall(k, 54.05, y0, -16, 0, xCirc(16) - 54.05, H, dim, { doors: [{ c: 3, w: 1.3, h: 2.5 }], dado: dimDado });
  archWall(k, 20.95, y0, -30, 0, 53.9 - 20.95, H, wall, { doors: [{ c: 6, w: 1.4, h: 2.5 }, { c: 27, w: 1.4, h: 2.5 }], dado });
  wallZ(k, 53.9, -16, -30, y0, wall, { dado });

  // beds: four in the front ward, the rest out of sight behind
  const beds = [
    [37.2, -6.4, 0], [40.6, -6.4, 0], [47.2, -6.4, 0], [50.3, -6.4, 0],
    [36.6, -11.0, Math.PI], [39.3, -11.0, Math.PI], [44.4, -12.7, 0.35], [48.6, -11.0, Math.PI], [51.3, -11.0, Math.PI],
    [36.6, -19.8, 0], [39.3, -19.8, 0], [42, -19.8, 0], [44.7, -19.8, 0], [47.4, -19.8, 0], [50.1, -19.8, 0],
    [36.5, -28.8, 0], [39.2, -28.8, 0], [41.9, -28.8, 0], [44.6, -28.8, 0], [47.3, -28.8, 0], [50, -28.8, 0], [52.6, -28.8, 0],
    [22.6, -28.8, 0], [25.3, -28.8, 0], [28, -28.8, 0], [30.7, -28.8, 0], [33.2, -28.8, 0], [23.5, -20.5, Math.PI / 2],
    [43.7, -4.8, 0],
  ];
  // iron beds: dark frames, head and foot boards, white linen
  const bed = (x, z, ry, blanket) => {
    const w = 1.0, l = 2.0, F = '#2b2f2e';
    k.push(x, y0, z, ry);
    k.box('metal', 0, 0.3, 0, w, 0.1, l, F);
    for (const [a, b] of [[-w / 2 + 0.04, -l / 2 + 0.04], [w / 2 - 0.04, -l / 2 + 0.04], [-w / 2 + 0.04, l / 2 - 0.04], [w / 2 - 0.04, l / 2 - 0.04]]) k.box('metal', a, 0.15, b, 0.05, 0.3, 0.05, F);
    k.box('fabric', 0, 0.43, 0, w - 0.06, 0.16, l - 0.06, '#ecebe6');
    k.box('fabric', 0, 0.52, 0.2, w - 0.02, 0.05, l * 0.62, blanket);
    k.box('fabric', 0, 0.56, -l / 2 + 0.3, w * 0.7, 0.1, 0.34, '#f4f2ec');
    k.box('metal', 0, 0.62, -l / 2 + 0.03, w, 0.64, 0.06, F);
    k.box('metal', 0, 0.46, l / 2 - 0.03, w, 0.32, 0.05, F);
    k.pop();
  };
  beds.forEach(([x, z, ry]) => bed(x, z, ry, r.pick(['#dfe4df', '#cdd8dc', '#e3dccd'])));
  // oxygen cylinders and drip stands between them
  const o2 = [[39.9, -8.8], [45.3, -8.4], [38, -12.6], [43.4, -21.6], [49, -21.6], [40.5, -27.3], [26.7, -27.3]];
  for (const [x, z] of o2) {
    k.cyl('metal', x, y0, z, 0.16, 1.3, '#3f7a4a', 12);
    k.sphere('metal', x, y0 + 1.3, z, 0.16, '#3f7a4a', 10, 6);
    k.cyl('metal', x, y0 + 1.42, z, 0.04, 0.14, '#9aa09c', 6);
  }
  for (const [x, z] of [[36, -7.4], [48.6, -7.4], [41, -18.5], [46, -27.5], [29.3, -27.4]]) {
    k.cyl('metal', x, y0, z, 0.2, 0.04, '#9aa09c', 8);
    k.cyl('metal', x, y0, z, 0.02, 1.9, '#c9ccca', 5);
    k.box('metal', x, y0 + 1.9, z, 0.4, 0.02, 0.02, '#c9ccca');
    k.box('glass', x - 0.15, y0 + 1.7, z, 0.12, 0.24, 0.06, '#e8f0f0');
  }
  // lockers and cabinets
  const locker = (x, z, ry, color = '#a2aba7', w = 1.1, h = 2.0) => {
    k.push(x, y0, z, ry);
    k.box('metal', 0, h / 2, 0, w, h, 0.6, color);
    k.box('metal', 0, h / 2, 0.305, 0.02, h - 0.1, 0.01, col(color, 0.7));
    for (const sx of [-0.12, 0.12]) k.box('metal', sx, h * 0.55, 0.31, 0.03, 0.14, 0.02, '#d8dcd9');
    k.pop();
  };
  locker(39, -9.1, 0);
  locker(46.1, -9.1, 0);
  locker(52.8, -9.1, 0, '#4a514e');
  locker(69.2, -10.6, -0.35, '#3d4341', 1.0, 1.9);
  locker(57.2, -4.6, -Math.PI / 2, '#848b88', 0.6, 1.75);
  locker(21.6, -1.3, Math.PI / 2, '#7d8582', 0.9, 1.8);
  locker(22, -15.5, 0, '#c9cec9', 1.8, 1.4);
  for (let i = 0; i < 15; i++) {
    const x = 22.2 + i * 2.1;
    if (Math.abs(x - 26.95) < 1.1 || Math.abs(x - 47.95) < 1.1) continue;
    locker(x, -30.5, Math.PI, '#dfe3df', 1.1, 1.8);
    locker(x, -41.2 + (x > 50 ? 3 : 0), 0, '#c9cfcb', 1.1, 1.8);
  }
  // entrance: cots and visitors' armchairs
  for (let i = 0; i < 8; i++) {
    const x = 22.1 + (i % 2) * 2.8, z = -5.4 - Math.floor(i / 2) * 1.7;
    k.box('fabric', x + 0.95, y0 + 0.36, z, 1.9, 0.08, 0.75, '#6f7f6a');
    k.box('metal', x + 0.95, y0 + 0.17, z, 1.8, 0.34, 0.05, '#5a5f5c');
  }
  for (let i = 0; i < 6; i++) {
    const x = 22.8 + (i % 3) * 2.8, z = -1.4 - Math.floor(i / 3) * 2.6;
    k.box('fabric', x, y0 + 0.28, z, 0.9, 0.56, 0.8, '#8b5e3c');
    k.box('fabric', x, y0 + 0.72, z - 0.33, 0.9, 0.62, 0.16, '#7d5334');
    for (const sx of [-0.4, 0.4]) k.box('fabric', x + sx, y0 + 0.5, z, 0.12, 0.3, 0.8, '#7d5334');
  }
  // caged bulbs close under the ceiling
  for (const [x, z] of [
    [32.6, -5.6], [32.6, -10.6], [29.2, -8.2], [29.4, -13.2], [24, -3], [24.5, -9.5],
    [38.5, -4.6], [44, -4.6], [49.5, -4.6], [61, -6], [66, -11],
    [38, -14.5], [44, -14.5], [50, -14.5], [38, -24.5], [44, -24.5], [50, -24.5],
    [25, -20], [30.5, -20], [25, -26.5], [30.5, -26.5],
  ]) cagedBulb(k, x, yc, z);

  signs.place(signs.make('MEDICAL 62', { style: 'panel', size: 60, bg: '#2c3b3d', spacing: 0.2 }), 30.75, y0 + 4.4, -15.83, 0.84);
  BAYS.forEach((x, i) => signs.place(signs.make(`BAY ${i + 1}`, { style: 'panel', size: 30, bg: '#2c3b3d' }), x, y0 + 3.2, -15.8, 0.14));
  signs.place(signs.make('EXIT', { style: 'panel', size: 34, bg: '#23302e' }), 53.72, y0 + 3.2, -4.2, 0.26, -Math.PI / 2);
  signs.place(signs.make('WARD A', { style: 'light', size: 30 }), 43.7, y0 + 3.3, -9.43, 0.2);
  for (const [x, z, i] of [[27, -7, 12], [32.6, -9, 14], [44, -5, 18], [44, -18, 12], [62, -8, 8]]) pool.add(x, y0 + 5.5, z, 0xf4fff8, i);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 66, west: the gardens. Lawns and clipped hedges round a rectangular
// reflection pond, lamp posts strung with bulbs, and a long lean-to glass
// house that follows the curve of the silo wall.
// ---------------------------------------------------------------------------
function gardens({ pool, signs, dyn, updaters }) {
  const k = new Kit('mids/gardens');
  const y0 = C.floorY(66);
  const r = makeRng(6666);
  const wall = '#5c5a53', back = 52.5;
  shell(k, { s: -1, y0, x0: 20.8, back, wall, door: [-1.2, -4.4] });
  roomFloor(k, -1, y0, 20.8, back, '#3c6a33', { mat: 'foliage' });
  liner(k, -1, y0, 0, -back, wall);

  // paths
  const PATH = '#9d9282';
  const path = (x0, x1, z0, z1) => k.bb('matte', x0, y0 + 0.02, z1, x1, y0 + 0.07, z0, PATH);
  path(-38.8, -35.9, 0, -7.4); // from the cut to the pond
  path(-50.4, -38.0, -7.4, -16.4); // pond surround
  path(-59.3, -21.2, -20.4, -22.6); // cross walk
  path(-45.4, -42.6, -16.4, -back); // pond to the back wall
  path(-23.0, -21.2, -4.6, -20.4); // along the entrance wall
  path(-35.9, -21.2, -2.6, -4.6);

  // clipped hedges: short blocks at the front, lines along the walks
  const HEDGE = '#2d5a2d';
  const hedge = (x0, x1, z0, z1, h = 1.1) => k.bb('foliage', x0, y0, z1, x1, y0 + h, z0, col(HEDGE, 0.9 + r() * 0.2));
  for (const [x0, x1, z0, z1, h] of [
    [-59.6, -57.0, -1.6, -2.8, 1.25], [-56.2, -54.2, -2.9, -4.4],
    [-39.8, -38.9, -1.3, -7.0], [-35.8, -34.9, -2.3, -9.6],
    [-34.6, -33.8, -10.4, -17.6], [-36.4, -31.0, -18.8, -19.7], [-28.2, -24.0, -18.8, -19.7],
    [-60.2, -59.3, -11.8, -19.6], [-57.4, -56.6, -12.6, -19.6],
    [-59.2, -52.4, -23.5, -24.4], [-49.5, -46.2, -23.5, -24.4], [-41.8, -30.5, -23.5, -24.4],
    [-46.4, -45.6, -25.5, -34], [-42.4, -41.6, -25.5, -34], [-46.4, -45.6, -36, -46], [-42.4, -41.6, -36, -46],
    [-53.8, -51.2, -7.4, -8.3], [-29.4, -27.2, -2.2, -3.1],
  ]) hedge(x0, x1, z0, z1, h);

  // rectangular reflection pond with a fountain
  const px0 = -49, px1 = -39.4, pz0 = -8.2, pz1 = -15.6, rim = '#bdb8ab';
  k.bb('matte', px0 - 0.4, y0, pz1 - 0.4, px1 + 0.4, y0 + 0.45, pz1, rim);
  k.bb('matte', px0 - 0.4, y0, pz0, px1 + 0.4, y0 + 0.45, pz0 + 0.4, rim);
  k.bb('matte', px0 - 0.4, y0, pz1, px0, y0 + 0.45, pz0, rim);
  k.bb('matte', px1, y0, pz1, px1 + 0.4, y0 + 0.45, pz0, rim);
  k.bb('matte', px0, y0, pz1, px1, y0 + 0.08, pz0, '#243d3c');
  const wm = waterMat();
  const pond = waterPlane(px1 - px0, pz0 - pz1, '#5e7a74', wm);
  pond.position.set((px0 + px1) / 2, y0 + 0.34, (pz0 + pz1) / 2);
  pond.name = 'gardens/water';
  dyn.add(pond);
  updaters.push((dt, t) => wm.normalMap.offset.set(t * 0.02, t * 0.013));
  for (let i = 0; i < 26; i++) {
    const x = px0 + 0.6 + r() * (px1 - px0 - 1.2), z = pz1 + 0.6 + r() * (pz0 - pz1 - 1.2);
    if (Math.hypot(x + 44.2, z + 11.9) < 1.5) continue;
    k.cyl('foliage', x, y0 + 0.36, z, 0.26 + r() * 0.18, 0.02, '#4f8a3c', 10);
  }
  const fx = -44.2, fz = -11.9, stone = '#55595a';
  k.cyl('matte', fx, y0, fz, 1.0, 0.5, stone, 16);
  k.cyl('matte', fx, y0 + 0.5, fz, 0.32, 0.8, stone, 10);
  k.cyl('matte', fx, y0 + 1.3, fz, 0.75, 0.14, stone, 16);
  k.cyl('matte', fx, y0 + 1.44, fz, 0.18, 0.4, stone, 8);
  k.sphere('matte', fx, y0 + 1.9, fz, 0.2, stone, 10, 8);

  // trees and benches
  for (const [x, z, s] of [[-60.6, -13.8, 0.85], [-47.2, -3.2, 0.95], [-40.8, -28.7, 1.05], [-29, -8.2, 1.15], [-24.4, -16.7, 1.1], [-44.5, -41.5, 0.95]]) {
    P.tree(k, x, y0 + 0.05, z, { h: 3.6 * s, r: 1.75 * s, leaf: '#4c9a45', seed: Math.round(-x * 7 - z) });
  }
  const bench = (x, z, ry) => {
    k.push(x, y0, z, ry);
    k.box('wood', 0, 0.45, 0, 1.6, 0.06, 0.45, '#8a6a46');
    k.box('wood', 0, 0.72, -0.2, 1.6, 0.4, 0.05, '#8a6a46');
    for (const sx of [-0.7, 0.7]) k.box('metal', sx, 0.22, 0, 0.06, 0.44, 0.4, '#2a2c2d');
    k.pop();
  };
  for (const [x, z, ry] of [
    [-29.4, -19.6, 0], [-26.0, -7.8, -Math.PI / 2], [-33.2, -12.6, -Math.PI / 2], [-56.8, -30.5, Math.PI / 2],
    [-52.5, -26, 0], [-36.2, -26, 0], [-48.4, -30, Math.PI / 2], [-26.2, -31, -Math.PI / 2],
    [-38.4, -36, -Math.PI / 2], [-49.4, -38, Math.PI / 2],
  ]) bench(x, z, ry);

  // lamp posts, with bulbs strung between them
  const H = 3.8;
  const posts = [[-40.8, -3.4], [-34.3, -3.4], [-31.9, -14.4], [-38.2, -21.2], [-47.1, -19.3], [-27, -26], [-50.5, -30], [-55.2, -25.2]];
  for (const [x, z] of posts) lampPost(k, x, y0, z, { h: H });
  const top = ([x, z]) => [x, y0 + H - 0.05, z];
  const links = [[0, 3], [3, 1], [1, 2], [0, 4], [4, 7], [3, 5], [4, 6], [2, 5]];
  let bulbs = 0;
  for (const [a, b] of links) bulbs += bulbString(k, top(posts[a]), top(posts[b]), 0.75, 10);
  void bulbs;

  // the glass house: a lean-to against the silo wall, high side on the wall
  const gz0 = -4.6, gz1 = -49.6, NB = 15;
  const inner = (t) => [lerp(-65.9, -49, t), lerp(gz0, gz1, t)];
  const outerAt = (z) => [-xCirc(z, C.R_IN - 1.45), z];
  const hi = 4.9, lo = 2.5, plinth = 0.9, FR = '#2d3331', WHITE = '#cdc9bf';
  // floor inside
  const fPts = [];
  for (let i = 0; i <= NB; i++) fPts.push(inner(i / NB));
  for (let i = NB; i >= 0; i--) fPts.push(outerAt(inner(i / NB)[1]));
  slab(k, fPts, y0 + 0.06, '#5f5d55');
  const gl = '#a9bab4';
  const quad = (a, b, c, d, color) => {
    // thin glass panel spanning four corners (roughly planar)
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute([...a, ...b, ...c, ...a, ...c, ...d], 3));
    g.computeVertexNormals();
    k.geo('glass', g, 0, 0, 0, color);
  };
  for (let i = 0; i <= NB; i++) {
    const [ix, iz] = inner(i / NB), [ox, oz] = outerAt(iz);
    k.cyl('metal', ix, y0, iz, 0.06, lo, FR, 6);
    k.rod('metal', [ix, y0 + lo, iz], [ox, y0 + hi, oz], 0.06, FR, 5);
    k.cyl('metal', ox, y0, oz, 0.06, hi, FR, 6);
    if (i === NB) continue;
    const [jx, jz] = inner((i + 1) / NB), [px, pz] = outerAt(jz);
    // plinth, glazing bars, glass
    const len = Math.hypot(jx - ix, jz - iz), ry = -Math.atan2(jz - iz, jx - ix);
    k.box('matte', (ix + jx) / 2, y0 + plinth / 2, (iz + jz) / 2, len + 0.05, plinth, 0.26, WHITE, ry);
    k.rod('metal', [ix, y0 + plinth, iz], [jx, y0 + plinth, jz], 0.04, FR, 4);
    k.rod('metal', [ix, y0 + lo, iz], [jx, y0 + lo, jz], 0.05, FR, 4);
    quad([ix, y0 + plinth, iz], [jx, y0 + plinth, jz], [jx, y0 + lo, jz], [ix, y0 + lo, iz], gl);
    quad([ix, y0 + lo, iz], [jx, y0 + lo, jz], [px, y0 + hi, pz], [ox, y0 + hi, oz], gl);
    // staging benches along both sides, crowded with pots
    for (const f of [0.18, 0.72]) {
      const bx0 = lerp(ix, ox, f), bz0 = lerp(iz, oz, f), bx1 = lerp(jx, px, f), bz1 = lerp(jz, pz, f);
      const bl = Math.hypot(bx1 - bx0, bz1 - bz0), bry = -Math.atan2(bz1 - bz0, bx1 - bx0);
      k.box('wood', (bx0 + bx1) / 2, y0 + 0.82, (bz0 + bz1) / 2, bl + 0.02, 0.06, 1.0, '#7a5a3a', bry);
      k.box('metal', (bx0 + bx1) / 2, y0 + 0.4, (bz0 + bz1) / 2, 0.06, 0.8, 0.9, '#2a2c2d', bry);
    }
  }
  // gable ends
  {
    const [ix, iz] = inner(0), [ox] = outerAt(gz0);
    k.bb('matte', ox, y0, iz - 0.13, ix, y0 + plinth, iz + 0.13, WHITE);
    quad([ox, y0 + plinth, iz], [ix, y0 + plinth, iz], [ix, y0 + lo, iz], [ox, y0 + hi, iz], '#ccd6d1');
    const [jx, jz] = inner(1), [px] = outerAt(gz1);
    k.bb('matte', px, y0, jz - 0.13, jx, y0 + plinth, jz + 0.13, WHITE);
    quad([px, y0 + plinth, jz], [jx, y0 + plinth, jz], [jx, y0 + lo, jz], [px, y0 + hi, jz], gl);
  }
  // pots: two rows on the staging, ninety-odd in all
  let pots = 0;
  for (const f of [0.18, 0.72]) {
    for (let i = 0; i < 47 && pots < 93; i++) {
      const t = (i + 0.5) / 47;
      const [ix, iz] = inner(t), [ox, oz] = outerAt(iz);
      const off = (i % 2 ? 0.28 : -0.28) / Math.max(1, Math.hypot(ox - ix, oz - iz));
      const x = lerp(ix, ox, f + off), z = lerp(iz, oz, f + off);
      k.cyl('matte', x, y0 + 0.85, z, 0.2, 0.26, '#9a5a3a', 8, 1.2);
      k.ico('foliage', x, y0 + 1.42, z, 0.42 + r() * 0.12, r.pick(['#8cc47a', '#7bb86a', '#9fd08a']), 1, 0.85, i);
      pots++;
    }
  }
  // a string of bulbs slung above the glass roof, the length of the house
  const along = (t, f) => {
    const [ix, iz] = inner(t), [ox, oz] = outerAt(inner(t)[1]);
    return [lerp(ix, ox, f), lerp(iz, oz, f)];
  };
  for (let sgm = 0; sgm < 4; sgm++) {
    const [ax, az] = along(sgm / 4, 0.3), [bx, bz] = along((sgm + 1) / 4, 0.3);
    bulbString(k, [ax, y0 + 4.45, az], [bx, y0 + 4.45, bz], 0.45, 7);
  }
  for (let sgm = 0; sgm <= 4; sgm++) {
    const [ax, az] = along(sgm / 4, 0.3);
    k.rod('metal', [ax, y0 + 4.45, az], [ax, y0 + C.ROOM_H, az], 0.01, '#1a1a1a', 3);
  }

  // the name board hangs over the back of the garden
  for (const x of [-46.4, -40.6]) k.rod('metal', [x, y0 + 6.1, -39], [x, y0 + C.ROOM_H, -39], 0.015, '#1e2222', 3);
  signs.place(signs.make('GARDENS 66', { style: 'panel', size: 60, bg: '#3b3a35', border: 'rgba(0,0,0,0)', spacing: 0.34 }), -43.5, y0 + 5.64, -39, 0.93);
  signs.place(signs.make('GLASS HOUSE', { style: 'green', size: 44 }), -70.2, y0 + 3.3, gz0 + 0.16, 0.4);
  const sz = -33.6, sx = -xCirc(sz, C.R_IN - 0.3);
  signs.place(signs.make('THE GARDENS · REFLECTION POOL', { style: 'panel', size: 36, bg: '#3b3a35', border: 'rgba(0,0,0,0)', spacing: 0.3 }), sx, y0 + 4.0, sz, 0.6, Math.atan2(-sx, -sz));
  const w = new Wisps('gardens/wisp', { size: 1.4, opacity: 0.2, seed: 66, rise: 0.8 });
  w.add(-44.2, y0 + 1.6, -11.9, 3, 1.2).add(-69, y0 + 0.8, -12, 1).add(-64, y0 + 0.8, -30, 1).add(-58, y0 + 0.8, -44, 1);
  dyn.add(w.group);
  updaters.push(w.update);
  pool.add(-44, y0 + 3.6, -11, 0xffd9a0, 20);
  pool.add(-30, y0 + 3.6, -10, 0xffd9a0, 16);
  pool.add(-62, y0 + 3.5, -20, 0xf2fff0, 14);
  pool.add(-40, y0 + 3.6, -30, 0xffd9a0, 12);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 68, east: the marketplace. A little town of two-storey shop blocks
// on a grid of narrow alleys; the cut runs straight through the front row,
// opening up their shelves and counters.
// ---------------------------------------------------------------------------
function market({ pool, signs, dyn, updaters }) {
  const k = new Kit('mids/market');
  const y0 = C.floorY(68);
  const r = makeRng(6868);
  const back = 62, BH = 6.1;
  const OUT = '#56534e', INSIDE = '#a39d90', SHELF = '#9a968c', CUT = '#dcd7cc';
  shell(k, { s: 1, y0, x0: 20.8, back, wall: '#4a4843', door: [-1.2, -4.4] });
  roomFloor(k, 1, y0, 20.8, back, '#6f6a62');
  liner(k, 1, y0, 0, -back, '#4a4843');
  const goods = ['#c9b98f', '#a9bb62', '#bf4f3c', '#d59a48', '#8fb070', '#d8c77a', '#b8643c', '#e0d6b8', '#7f9a5a'];

  const COLS = [[24.6, 30.9], [34.4, 44.9], [48.6, 58.8], [62.5, 80]];
  const ROWS = [[0, -13], [-16.5, -29.5], [-33, -46], [-49.5, -59]];

  /** Doors, windows and awnings along one outside face (local frame: +x along, +z out). */
  const decorate = (len, seed, { awnings = true, doorAt = null, awning = null } = {}) => {
    const rr = makeRng(seed);
    const n = Math.max(1, Math.floor((len - 0.8) / 3.3));
    const step = (len - 0.8) / n;
    for (let i = 0; i < n; i++) {
      const u = 0.4 + step * (i + 0.5);
      const door = doorAt === null ? (i + seed) % 2 === 0 : Math.abs(u - doorAt) < step / 2;
      if (door) {
        P.archDoor(k, u, 0, 0.0, 0, { w: 1.1, h: 2.25, color: '#27231f', frame: '#bdb6a6' });
        k.sphere('glow', u, 2.62, 0.18, 0.09, col('#ffd9a0', 5), 6, 4);
        if (awning || (awnings && rr() < 0.55)) {
          const c = awning || rr.pick(['#3d7f7a', '#a3392f', '#d9cfb5', '#3f6f4a']);
          k.box('fabric', u, 2.85, 0.5, 1.9, 0.05, 1.0, c, 0, 0.35, 0);
          k.box('fabric', u, 2.62, 0.98, 1.9, 0.22, 0.02, col(c, 0.85));
        }
      } else {
        const lit = rr() < 0.6;
        k.box('matte', u, 1.6, 0.03, 1.0, 1.1, 0.05, '#bdb6a6');
        k.box(lit ? 'glow' : 'matte', u, 1.6, 0.06, 0.8, 0.9, 0.02, lit ? col('#ffcf7a', 2.1) : '#2a2a28');
        k.box('wood', u, 1.02, 0.25, 1.4, 0.1, 0.45, '#6b4431');
      }
      // upper-storey window above every bay
      const lit = rr() < 0.55;
      k.box('matte', u, 4.45, 0.03, 0.9, 1.0, 0.05, '#bdb6a6');
      k.box(lit ? 'glow' : 'matte', u, 4.45, 0.06, 0.72, 0.82, 0.02, lit ? col('#ffd48a', 2) : '#2a2a28');
    }
  };

  ROWS.forEach(([za, zb], ri) => {
    COLS.forEach(([xa, xb0], ci) => {
      const xb = Math.min(xb0, xCirc(zb) - 0.9);
      if (xb - xa < 3.5) return;
      const seed = 100 + ri * 10 + ci;
      if (ri === 0) {
        // --- front row: cut open, two shops stacked
        const zS = -5.6;
        k.bb('matte', xa, y0, zb, xa + 0.3, y0 + BH, za, OUT);
        k.bb('matte', xb - 0.3, y0, zb, xb, y0 + BH, za, OUT);
        k.bb('matte', xa + 0.3, y0, zb, xb - 0.3, y0 + BH, zS, INSIDE);
        k.bb('matte', xa, y0 + BH - 0.25, zS, xb, y0 + BH, za, OUT);
        k.bb('matte', xa + 0.3, y0 + 3.0, zS, xb - 0.3, y0 + 3.25, za, '#6a6660');
        for (const x of [xa, xb - 0.3]) k.bb('matte', x - 0.02, y0, za - 0.05, x + 0.32, y0 + BH + 0.02, za + 0.001, CUT);
        k.bb('matte', xa, y0 + 2.98, za - 0.05, xb, y0 + 3.27, za + 0.001, CUT);
        k.bb('matte', xa, y0 + BH - 0.27, za - 0.05, xb, y0 + BH + 0.02, za + 0.001, CUT);
        for (const [ys, levels] of [[0, [1.35, 1.95, 2.55]], [3.25, [0.55, 1.15, 1.75]]]) {
          for (const lv of levels) {
            const yy = y0 + ys + lv;
            k.bb('matte', xa + 0.5, yy - 0.05, zS, xb - 0.5, yy, zS + 0.45, SHELF);
            for (let x = xa + 0.8; x < xb - 0.8; x += 0.62) {
              if (r() < 0.15) continue;
              const h = 0.16 + r() * 0.12;
              k.box('matte', x + (r() - 0.5) * 0.1, yy + h / 2, zS + 0.24, 0.34, h, 0.26, r.pick(goods));
            }
          }
          for (const x of [xa + 0.5, xb - 0.5]) k.bb('matte', x - 0.04, y0 + ys, zS, x + 0.04, y0 + ys + 2.7, zS + 0.45, col(SHELF, 0.85));
          // pendant bulb
          const cxm = (xa + xb) / 2;
          k.cyl('metal', cxm, y0 + ys + 2.25, -2.8, 0.01, (ys ? BH - 0.25 : 3.0) - ys - 2.25, '#1a1a1a', 3);
          k.sphere('glow', cxm, y0 + ys + 2.2, -2.8, 0.1, col('#fff0d2', 5), 8, 6);
        }
        // a storage chest upstairs by the side wall
        k.bb('wood', xb - 1.9, y0 + 3.25, zS + 0.05, xb - 0.6, y0 + 4.2, zS + 0.95, '#6b4431');
        // counter across the lower shop, with a few goods
        k.bb('wood', xa + 1, y0, -2.2, xb - 1, y0 + 0.98, -1.45, '#6b4431');
        k.bb('wood', xa + 0.95, y0 + 0.98, -2.25, xb - 0.95, y0 + 1.04, -1.4, '#7d5540');
        for (let i = 0; i < 5; i++) k.box('matte', xa + 1.4 + r() * (xb - xa - 2.8), y0 + 1.14, -1.8, 0.3, 0.2, 0.3, r.pick(goods));
        // outside faces of the side walls
        k.push(xa, y0, zb, -Math.PI / 2);
        decorate(-zb - 0.4, seed, { awnings: false, doorAt: -zb - 2.6, awning: ci === 3 ? '#3d7f7a' : ci === 2 ? '#a3392f' : null });
        k.pop();
        k.push(xb, y0, za - 0.4, Math.PI / 2);
        decorate(-zb - 0.4, seed + 5, { awnings: false });
        k.pop();
        k.push(xb, y0, zb, Math.PI);
        decorate(xb - xa, seed + 7);
        k.pop();
      } else {
        // --- closed blocks further back
        k.bb('matte', xa, y0, zb, xb, y0 + BH, za, OUT);
        k.bb('matte', xa - 0.05, y0 + BH - 0.3, zb - 0.05, xb + 0.05, y0 + BH, za + 0.05, '#65615a');
        k.push(xa, y0, za, 0);
        decorate(xb - xa, seed);
        k.pop();
        k.push(xb, y0, zb, Math.PI);
        decorate(xb - xa, seed + 3);
        k.pop();
        k.push(xa, y0, zb, -Math.PI / 2);
        decorate(za - zb, seed + 5, { awnings: ri !== 3 });
        k.pop();
        if (xb0 < 70) {
          k.push(xb, y0, za, Math.PI / 2);
          decorate(za - zb, seed + 8);
          k.pop();
        }
      }
    });
  });

  // a baker's stall where the first alley meets the cross street
  k.bb('wood', 31.4, y0, -15.6, 33.9, y0 + 1.0, -14.9, '#6b4431');
  for (const x of [31.5, 33.8]) k.cyl('metal', x, y0, -15.2, 0.04, 2.4, '#2a2c2d', 5);
  k.box('fabric', 32.65, y0 + 2.45, -14.9, 2.7, 0.05, 1.4, '#a3392f', 0, 0.3, 0);
  for (let i = 0; i < 6; i++) P.sack(k, 31.7 + i * 0.4, y0 + 0.98, -15.25, 0.22, r.pick(['#d8b77a', '#c9a15a', '#e2cf9f']));

  // the grocer's pitch in the first alley: a long red awning off the wall,
  // a trestle of produce and a blade sign facing the street
  k.push(31.0, y0, -7.2, 0);
  k.box('fabric', 0.62, 3.25, 0, 1.3, 0.05, 10.4, '#a3392f', 0, 0, -0.32);
  k.box('fabric', 1.25, 2.98, 0, 0.02, 0.25, 10.4, '#8e2f27');
  for (const z of [-5, -1.7, 1.7, 5]) k.rod('metal', [1.25, 3.08, z], [0.02, 3.45, z], 0.015, '#2a2c2d', 3);
  k.pop();
  k.bb('wood', 31.1, y0, -10.4, 32.0, y0 + 0.92, -7.6, '#6b4431');
  for (let i = 0; i < 9; i++) P.sack(k, 31.35 + (i % 2) * 0.4, y0 + 0.92, -7.9 - i * 0.28, 0.2, r.pick(['#a9bb62', '#bf4f3c', '#d59a48', '#8fb070']));
  P.crate(k, 33.3, y0, -5.2, 0.7, '#8b6a43', 0.3);
  k.rod('metal', [30.95, y0 + 2.82, -2.4], [32.6, y0 + 2.82, -2.4], 0.02, '#2a2c2d', 4);

  // lanterns strung down each alley and along the cross streets
  const lanterns = (a, b, n) => {
    const pts = [];
    for (let j = 0; j <= n; j++) pts.push([lerp(a[0], b[0], j / n), y0 + 5.05 - Math.sin((j / n) * Math.PI * 3) ** 2 * 0.2, lerp(a[1], b[1], j / n)]);
    for (let j = 0; j < n; j++) k.rod('metal', pts[j], pts[j + 1], 0.008, '#1a1a1a', 3);
    for (let j = 1; j < n; j++) {
      const [x, y, z] = pts[j];
      k.cyl('metal', x, y - 0.12, z, 0.07, 0.06, '#2a2c2d', 6);
      k.sphere('glow', x, y - 0.22, z, 0.12, col(j % 3 ? '#ffc86a' : '#ff8a5a', 4.5), 8, 6);
    }
    return n - 1;
  };
  let lant = 0;
  lant += lanterns([32.65, -0.5], [32.65, -46], 15);
  lant += lanterns([46.75, -0.5], [46.75, -46], 15);
  lant += lanterns([60.65, -0.5], [60.65, -41], 13);
  lant += lanterns([24, -14.75], [72, -14.75], 9);
  lant += lanterns([24, -31.25], [66, -31.25], 9);
  void lant;

  // crates and sacks in the alleys
  const lanes = [[31.2, 34.1, -1.5, -46], [45.2, 48.3, -1.5, -46], [59.1, 62.2, -1.5, -40], [22, 72, -13.6, -16], [22, 64, -30, -32.5]];
  for (let i = 0; i < 50; i++) {
    const [x0, x1, z0, z1] = lanes[i % lanes.length];
    const x = lerp(x0, x1, r() < 0.5 ? r() * 0.25 : 0.75 + r() * 0.25), z = lerp(z0, z1, r());
    if (x > xCirc(z) - 1.5) continue;
    if (r() < 0.65) P.crate(k, x, y0, z, 0.45 + r() * 0.35, r.pick(['#8b6a43', '#7a5a38', '#9a7a50']), r() * 0.6);
    else P.sack(k, x, y0, z, 0.45 + r() * 0.2, r.pick(['#b59a6a', '#c9b58a', '#a38a5a']));
  }

  // signs
  k.rod('metal', [30.9, y0 + 5.05, -3], [34.4, y0 + 5.05, -3], 0.03, '#2a2c2d', 5);
  for (const x of [31.7, 33.6]) k.rod('metal', [x, y0 + 5.05, -3], [x, y0 + 4.95, -3], 0.015, '#2a2c2d', 3);
  signs.place(signs.make('MARKET 68', { style: 'panel', size: 60, bg: '#2c3b3d' }), 32.65, y0 + 4.6, -3, 0.68);
  signs.place(signs.make('GROCERY', { style: 'panel', size: 44, bg: '#24403d' }), 31.75, y0 + 2.6, -2.36, 0.36);
  signs.place(signs.make('BAKERY', { style: 'red', size: 44 }), 32.65, y0 + 2.8, -14.85, 0.42);
  k.bb('fabric', 31.5, y0 + 2.42, -14.9, 33.8, y0 + 2.56, -14.84, '#3d7f7a');
  signs.place(signs.make('STALLS 1 – 140', { style: 'paint', size: 52, spacing: 0.8 }), 48.56, y0 + 5.2, -6.7, 0.5, -Math.PI / 2);
  signs.place(signs.make('BAZAAR ↑', { style: 'paint', size: 52, spacing: 0.3 }), 62.44, y0 + 4.95, -3.9, 0.46, -Math.PI / 2);

  const w = new Wisps('market/wisp', { size: 1.1, opacity: 0.24, seed: 68 });
  for (const [x, z] of [[32.2, -15.2], [33.2, -15.2], [40, -1.8], [53.5, -1.8], [67, -1.8]]) w.add(x, y0 + 1.2, z, 1, 0.1);
  dyn.add(w.group);
  updaters.push(w.update);
  for (const [x, z, i] of [[29, -3, 12], [40, -3, 14], [53.5, -3, 14], [67, -3, 12], [32.6, -12, 10], [46.7, -14, 10]]) pool.add(x, y0 + 4, z, 0xffc98a, i);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 70, west: the mines. A low, lamp-lit gallery with timber sets runs
// from the earth outside, through the silo wall, to a timber portal; beyond
// it the high chamber holds the headframe, the winch and the spoil.
// ---------------------------------------------------------------------------
function mines({ pool, signs, dyn, updaters }) {
  const k = new Kit('mids/mines');
  const y0 = C.floorY(70), yc = y0 + C.ROOM_H;
  const r = makeRng(7070);
  const wall = '#625e57', floor = '#545046', back = 30;
  const TUN = '#e4e0d6', TH = 4.0, tz1 = -2.8;
  const tx0 = -95.5, tx1 = -65.5, WOOD = '#7c5234';
  shell(k, { s: -1, y0, x0: 20.8, back, wall, door: [-1.2, -4.4] });
  roomFloor(k, -1, y0, 20.8, back, floor);
  // the chamber's west end: a shallow bay by the portal, then the deep hall
  const zBay = -7.2, xStep = -57.4;
  k.bb('matte', tx1 - 0.3, y0, zBay - 0.3, tx1, yc, tz1, '#2f2a25');
  k.bb('matte', tx1 - 0.3, y0, zBay - 0.3, xStep, yc, zBay, '#5a5751');
  k.bb('matte', xStep - 0.3, y0, -back, xStep, yc, zBay, '#5d5a54');
  k.bb('matte', tx1 - 0.3, y0 + TH + 0.3, tz1, tx1, yc, 0, '#55524c');
  k.bb('matte', tx1 - 0.32, y0 + TH + 0.3, -0.05, tx1 + 0.02, yc, 0.001, SECTION);

  // --- gallery: white-washed walls and roof, lamps under every set
  k.bb('matte', tx0, y0 - 0.3, tz1 - 0.2, tx1, y0 + 0.035, 0, '#8a857b');
  k.bb('matte', -C.R_IN, y0 + TH + 0.3, tz1 - 0.3, tx1 - 0.3, yc, tz1, '#574a3e');
  k.bb('matte', tx0, y0, tz1 - 0.3, tx1, y0 + TH + 0.3, tz1, TUN);
  k.bb('matte', tx0, y0 + TH, tz1 - 0.3, tx1, y0 + TH + 0.3, 0, TUN);
  k.bb('matte', tx0 - 0.4, y0, tz1 - 0.3, tx0, y0 + TH + 0.3, 0, TUN);
  k.bb('matte', tx0, y0 + TH + 0.26, -0.05, tx1, y0 + TH + 0.3, 0.001, '#cfc9bc');
  // fill the notch in the earth and the silo wall above the gallery
  k.bb('rock', -96.2, y0 + TH + 0.3, -9.2, -C.R_OUT, yc + 0.05, 0.015, '#3a322c');
  k.bb('rock', -96.2, y0 - 0.05, -9.2, -C.R_OUT, y0 + TH + 0.3, tz1 - 0.3, '#3a322c');
  k.bb('concrete', -C.R_OUT, y0 + TH + 0.3, -9.2, -C.R_IN + 0.02, yc + 0.05, 0.001, '#f3f0ea');
  k.bb('concrete', -C.R_OUT, y0 - 0.05, -9.2, -C.R_IN + 0.02, y0 + TH + 0.3, tz1 - 0.3, '#f3f0ea');
  // timber sets: a post at the front, one against the wall, a cap between
  for (let x = -94.6; x < tx1 - 1; x += 2.05) {
    k.box('wood', x, y0 + TH / 2, -0.35, 0.3, TH, 0.3, WOOD);
    k.box('wood', x, y0 + TH - 0.35, (tz1 - 0.35) / 2 + 0.05, 0.36, 0.34, -tz1 + 0.25, col(WOOD, 0.95));
    k.box('wood', x + 0.35, y0 + TH - 0.2, -0.35, 0.5, 0.14, 0.3, WOOD);
    k.sphere('glow', x + 0.75, y0 + TH - 0.1, -1.1, 0.12, col('#ffd59a', 5.5), 8, 6);
  }
  k.rod('metal', [tx0 + 0.5, y0 + 3.05, -0.25], [tx1, y0 + 3.05, -0.25], 0.015, '#1a1a1a', 3);
  // timber portal where the gallery meets the chamber
  for (const z of [-0.3, tz1 + 0.15]) k.box('wood', tx1 + 0.3, y0 + (TH + 0.3) / 2, z, 0.5, TH + 0.3, 0.45, WOOD);
  k.box('wood', tx1 + 0.3, y0 + TH + 0.2, (tz1 - 0.1) / 2, 0.55, 0.45, -tz1 + 0.5, col(WOOD, 0.9));
  signs.place(signs.make('SHAFT 1', { style: 'panel', size: 40 }), tx1 + 0.03, y0 + 2.6, -4.4, 0.24, Math.PI / 2);
  // a small board on the portal post, facing the cut
  k.box('metal', tx1 + 0.62, y0 + 3.5, -0.3, 0.3, 0.04, 0.04, '#2a2c2d');
  signs.place(signs.make('GALLERY 1 · KEEP CLEAR', { style: 'panel', size: 36, bg: '#2a2e2d' }), tx1 + 1.3, y0 + 3.5, -0.26, 0.36);

  // rails and sleepers from the face to the headframe
  for (let i = 0; i < 61; i++) k.box('wood', -94 + i * 0.8, y0 + 0.05, -1.25, 0.22, 0.1, 1.5, '#4f3b2a');
  for (const z of [-0.85, -1.65]) k.box('metal', -70, y0 + 0.14, z, 48.5, 0.08, 0.07, '#8a8d8e');
  // ore carts
  for (const x of [-84, -70.6, -60.5, -51.3, -48.8]) {
    k.push(x, y0 + 0.2, -1.25, 0);
    k.box('metal', 0, 0.55, 0, 1.35, 0.7, 0.95, '#3c3f40');
    k.box('metal', 0, 0.92, 0, 1.45, 0.06, 1.05, '#2e3031');
    for (const [a, b] of [[-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]]) k.cylR('metal', a, 0.14, b, 0.14, 0.08, '#222425', Math.PI / 2, 0, 0, 10);
    for (let n = 0; n < 5; n++) k.ico('rock', (r() - 0.5) * 0.8, 0.97, (r() - 0.5) * 0.55, 0.2 + r() * 0.12, '#262320', 0, 0.8, n);
    k.pop();
  }

  // --- chamber
  // spoil heaps: low, dark and flattened
  for (const [x, z, s] of [[-56.9, -3.6, 1.2], [-53.2, -4.8, 1.6], [-46.8, -5.6, 1.5], [-45.8, -12.2, 1.4]]) {
    k.geo('rock', UNIT.hemi(12, 4), x, y0 - 0.02, z, '#242120', s, s * 0.5, s * 0.8, 0, r() * 3, 0);
  }
  // headframe: two heavy timber legs rising from the cage in a V, free at
  // the top, with a pulley block slung between their heads
  const hx = -49.4, hz = -7.8, hy = y0 + 6.1;
  k.beam('wood', [hx - 0.12, y0 + 0.2, hz + 0.35], [hx - 2.0, hy, hz - 0.25], 0.42, 0.42, '#8a5a3a');
  k.beam('wood', [hx + 0.12, y0 + 0.2, hz - 0.35], [hx + 2.0, hy, hz + 0.25], 0.42, 0.42, '#8a5a3a');
  k.rod('metal', [hx - 1.9, hy - 0.1, hz], [hx + 1.9, hy - 0.1, hz], 0.03, '#1a1a1a', 4);
  k.box('metal', hx, hy - 0.05, hz, 0.34, 0.34, 0.22, '#5a4030');
  k.cylR('metal', hx, hy - 0.05, hz, 0.22, 0.26, '#2e3031', Math.PI / 2, 0, 0, 12);
  for (const sx of [-0.72, 0.72]) {
    k.rod('metal', [hx + sx, hy - 0.2, hz], [hx + sx, y0 + 4.25, hz], 0.012, '#1a1a1a', 3);
    k.box('wood', hx + sx, y0 + 4.1, hz, 0.32, 0.3, 0.3, '#8a5a3a');
  }
  k.rod('metal', [hx, hy - 0.1, hz], [hx, y0 + 2.5, hz], 0.02, '#1a1a1a', 4);
  // the cage: dark glazing in a steel frame on a pale base plate
  k.bb('matte', hx - 1.8, y0, hz - 1.3, hx + 1.8, y0 + 0.2, hz + 1.3, '#c9c6bd');
  k.geo('glass', UNIT.box(), hx, y0 + 1.35, hz, '#4e5856', 2, 2.3, 2);
  k.bb('matte', hx - 0.97, y0 + 0.2, hz - 0.97, hx + 0.97, y0 + 1.1, hz + 0.97, '#3d4140');
  for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.box('metal', hx + a, y0 + 1.35, hz + b, 0.06, 2.3, 0.06, '#2e3031');
  k.bb('metal', hx - 1.03, y0 + 2.47, hz - 1.03, hx + 1.03, y0 + 2.55, hz + 1.03, '#2e3031');
  // spare timbers stacked on a trestle beside the cage
  for (const sx of [-2.9, -1.9]) k.bb('wood', hx + sx - 0.06, y0, hz + 0.3, hx + sx + 0.06, y0 + 1.1, hz + 0.45, '#5e3e28');
  k.bb('wood', hx - 3.3, y0 + 1.1, hz + 0.1, hx - 1.5, y0 + 1.28, hz + 0.6, '#8a5a3a');
  k.bb('wood', hx - 3.2, y0 + 1.28, hz + 0.15, hx - 1.7, y0 + 1.46, hz + 0.55, '#7a4f33');
  // winch on its block, and the rope up to the pulley
  const wx = -57.1, wz = -6.3;
  k.bb('metal', wx - 1.1, y0, wz - 0.8, wx + 1.1, y0 + 1.6, wz + 0.8, '#3b3e3f');
  k.cylR('metal', wx, y0 + 2.15, wz, 0.55, 1.6, '#1e2021', Math.PI / 2, 0, 0, 18);
  for (const e of [-0.85, 0.85]) k.cylR('metal', wx, y0 + 2.15, wz + e, 0.62, 0.08, '#2e3031', Math.PI / 2, 0, 0, 18);
  k.rod('metal', [wx + 0.3, y0 + 2.65, wz], [hx - 0.1, hy + 0.05, hz], 0.022, '#1a1a1a', 4);
  // store shed and lamps about the chamber
  k.bb('matte', -40.1, y0, -25.5, -36.1, y0 + 3.0, -22.1, '#5a5044');
  k.bb('matte', -40.25, y0 + 3.0, -25.65, -35.95, y0 + 3.14, -21.95, '#453d33');
  k.bb('wood', -38.7, y0, -22.14, -37.5, y0 + 2.1, -22.08, '#3e3025');
  for (const [x, z] of [[-55.8, -16.3], [-41.8, -13.2], [-43.7, -3.2], [-30, -22]]) lampPost(k, x, y0, z, { h: 3.4 });
  // mess tables and packs near the landing
  for (const [x, z] of [[-26.5, -2.4], [-24.4, -5.8], [-27, -7.6], [-24, -1.6]]) {
    P.roundTable(k, x, y0, z, { r: 0.55, top: '#6a5a45' });
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + x;
      P.stool(k, x + Math.cos(a) * 0.9, y0, z + Math.sin(a) * 0.9, { color: '#3a3c3d' });
    }
  }
  for (let i = 0; i < 10; i++) k.box('fabric', -21.6 + (i % 2) * 0.35 - 0.2, y0 + 0.4, -6.3 - (i % 5) * 0.55, 0.3, 0.8, 0.45, r.pick(['#5a4a2f', '#4a5a3a', '#6a4a30']));
  // bulbs under the chamber ceiling
  for (const [x, z] of [[-61, -4], [-52, -3], [-42, -6], [-34, -4], [-26, -8], [-53, -18], [-44, -21], [-30, -20]]) cagedBulb(k, x, yc, z, { drop: 0.9, color: '#ffe2b0' });

  signs.place(signs.make('MINES · SHAFT 1 →', { style: 'panel', size: 48, bg: '#2f3331', spacing: 0.2 }), -35.2, y0 + 4.5, -back + 0.06, 1.2);
  const w = new Wisps('mines/wisp', { size: 1, opacity: 0.22, seed: 70 });
  w.add(-22, y0 + 1.2, -2.9, 1, 0.1).add(-90, y0 + 1.5, -1.4, 1, 0.3);
  dyn.add(w.group);
  updaters.push(w.update);
  for (const x of [-90, -80, -70]) pool.add(x, y0 + 3.4, -1.4, 0xffd59a, 12);
  pool.add(-52, y0 + 4.5, -8, 0xffe2b0, 16);
  pool.add(-36, y0 + 4, -16, 0xffe2b0, 12);
  pool.add(-26, y0 + 3, -5, 0xffd9a8, 10);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 73, east: the orchard. Fruit trees on a raised, grassed terrace under
// magenta grow-lights, tall beds of grain along its front, and a sunken
// break area with red drum tables below curved steps by the entrance.
// ---------------------------------------------------------------------------
function farms({ pool, signs }) {
  const k = new Kit('mids/farms');
  const y0 = C.floorY(73), yc = y0 + C.ROOM_H;
  const r = makeRng(7373);
  const back = 66, TER = 0.95;
  const wall = '#7a7466';
  shell(k, { s: 1, y0, x0: 20.8, back, wall, door: [-1.2, -4.4] });
  roomFloor(k, 1, y0, 20.8, back, '#4d7a3a', { mat: 'foliage' });
  liner(k, 1, y0, 0, -back, '#7b7263');

  // terrace: its west edge curves from the cut back towards the inner wall
  const edge = (z) => (z > -25 ? 36.2 - 7.6 * smooth(Math.min(1, -z / 25)) : 28.6);
  const R = C.R_IN - 0.15;
  const tPts = [];
  const NZ = 26;
  for (let i = 0; i <= NZ; i++) {
    const z = -(back - 0.3) * (i / NZ) ** 1.4;
    tPts.push([edge(z), z]);
  }
  // outline: the west edge from the cut to the back, then the silo wall back to the cut
  slab(k, [...tPts, ...arcPts(1, R, 0, -(back - 0.3), 28).reverse()], y0 + TER, '#b0ab98', { t: TER });
  // paved walk along the cut, grass behind
  slab(k, [[edge(0) + 0.3, -0.02], [R, -0.02], ...arcPts(1, R - 0.01, -0.02, -4.2, 4).slice(1), [edge(-4.2) + 0.3, -4.2]], y0 + TER + 0.03, '#a39b85', { t: 0.04 });
  const grass = [];
  for (let i = 0; i <= NZ; i++) {
    const z = -4.2 - (back - 4.6) * (i / NZ);
    grass.push([edge(z) + 0.35, z]);
  }
  slab(k, [...grass, ...arcPts(1, R - 0.02, -(back - 0.4), -4.2, 28)], y0 + TER + 0.04, '#4f7e3b', { t: 0.04, mat: 'foliage' });
  k.bb('matte', edge(0) - 0.02, y0, -0.05, R + 0.1, y0 + TER + 0.07, 0.001, '#b3ae9b');
  // on the east side a second, higher bed of orchard grass stands behind
  // the walk, walled in pale stone on its front and west sides
  const BED = 1.2, bedPts = [[56, -4.2], ...arcPts(1, R - 0.03, -4.2, -26, 8), [56, -26]];
  slab(k, bedPts, y0 + TER + BED, '#b3ae9b', { t: BED + 0.02 });
  slab(k, [[56.25, -4.45], ...arcPts(1, R - 0.05, -4.45, -25.75, 8), [56.25, -25.75]], y0 + TER + BED + 0.04, '#4f7e3b', { t: 0.04, mat: 'foliage' });
  k.bb('matte', 55.95, y0 + TER + BED, -26.05, 56.25, y0 + TER + BED + 0.08, -4.15, '#c4bfad');
  k.bb('matte', 56.25, y0 + TER + BED, -4.45, R - 0.2, y0 + TER + BED + 0.08, -4.15, '#c4bfad');
  // curved steps down into the break area
  for (let st = 0; st < 3; st++) {
    const dz = 0.42 * (st + 1), h = TER * (1 - (st + 1) / 3) + 0.001;
    if (h < 0.01) continue;
    for (let i = 0; i < 12; i++) {
      const za = -25 * (i / 12), zb = -25 * ((i + 1) / 12);
      const xa = edge(za) - dz, xb = edge(zb) - dz;
      const len = Math.hypot(xb - xa, zb - za);
      k.box('matte', (xa + xb) / 2 + 0.21, y0 + h / 2, (za + zb) / 2, 0.44, h, len + 0.03, '#aaa592', Math.atan2(xb - xa, zb - za));
    }
  }

  // grain beds along the front of the terrace
  const yT = y0 + TER + 0.04;
  for (const x of [37.6, 40.5, 43.4, 46.3, 49.2]) {
    k.bb('matte', x - 1.0, yT, -11.6, x + 1.0, yT + 0.25, -4.6, '#2a2723');
    k.bb('foliage', x - 0.95, yT + 0.25, -11.5, x + 0.95, yT + 2.25, -4.7, '#647532');
    k.bb('foliage', x - 0.97, yT + 2.25, -11.52, x + 0.97, yT + 2.45, -4.68, '#967f39');
  }
  // columns
  const COLS = [[26.2, -4.8], [26.4, -22], [33, -41], [46.3, -15], [61.4, -6.0], [46.3, -30], [61.2, -30], [46.3, -47], [61.2, -47], [26.4, -58]]
    .filter(([x, z]) => x < xCirc(z) - 1.4);
  for (const [x, z] of COLS) k.cyl('matte', x, y0, z, 1.15, C.ROOM_H, '#8e8b83', 20);
  // fruit trees behind the grain; the plot round x 41.8, z -20.5 stays clear,
  // as do the columns and the east paving
  const trees = [];
  for (let row = 0; row < 7; row++) {
    for (let i = -1; i < 6; i++) {
      const x = 39 + i * 6.6 + (row % 2) * 3.3, z = -15 - row * 7.4;
      if (x > xCirc(z) - 3.2 || x < edge(z) + 2.5) continue;
      if (Math.abs(x - 41.8) < 4.2 && Math.abs(z + 20.5) < 4.6) continue;
      if (x > 55.2 && z > -26.8) continue;
      if (COLS.some(([cx, cz]) => Math.hypot(x - cx, z - cz) < 2.8)) continue;
      trees.push([x, z, yT]);
    }
  }
  const yB = y0 + TER + BED + 0.06;
  for (const [x, z] of [[57.6, -11], [58.8, -7.8], [59.2, -4.9], [64.6, -7.6], [68.6, -6.2], [64.0, -15.5], [60.0, -20.5], [67.2, -21.5]]) trees.unshift([x, z, yB]);
  trees.forEach(([x, z, y], n) => P.tree(k, x, y, z, { h: 4.3, r: 1.9, trunk: '#5e4430', leaf: '#4c9642', fruit: n % 5 === 4 ? null : '#c0392b', seed: n }));
  // one big tree down in the break area
  P.tree(k, 29.3, y0, -3.6, { h: 5.0, r: 2.1, trunk: '#5e4430', leaf: '#4c9642', fruit: '#c0392b', seed: 31 });
  // magenta grow-lights across the ceiling, and tube lights between
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 7; j++) {
      const x = 24 + i * 3.25, z = -2.5 - j * 9.2;
      if (x > xCirc(z) - 1.5) continue;
      // hung a metre down on two wires, bright enough to bloom
      for (const sx of [-0.9, 0.9]) k.rod('metal', [x + sx, yc - 0.95, z], [x + sx, yc, z], 0.008, '#1e1f20', 3);
      k.box('matte', x, yc - 0.96, z, 2.3, 0.08, 0.42, '#3a3c3d');
      k.box('glow', x, yc - 1.05, z, 2.1, 0.1, 0.32, col('#ff6aa6', 12));
    }
  }
  for (let j = 0; j < 7; j++) {
    const z = -7 - j * 9.2, x1 = Math.min(62.4, xCirc(z) - 2);
    if (x1 < 26) continue;
    k.box('glow', (23 + x1) / 2, yc - 0.45, z, x1 - 23, 0.05, 0.05, col('#ffe6f0', 2.6));
  }

  // break area: red drum tables, wooden chairs, a string of bulbs
  for (const [x, z] of [[25.8, -2.4], [29.4, -6.8], [32.6, -3.2], [25.2, -7.6], [28.3, -10.4]]) {
    k.cyl('matte', x, y0, z, 0.6, 0.78, '#a8322a', 16);
    k.cyl('matte', x, y0 + 0.78, z, 0.62, 0.04, '#b8443a', 16);
    for (const a of [0.4, 0.4 + Math.PI]) {
      const cx = x + Math.cos(a) * 1.0, cz = z + Math.sin(a) * 1.0;
      k.push(cx, y0, cz, -a - Math.PI / 2);
      k.box('wood', 0, 0.45, 0, 0.44, 0.05, 0.42, '#7a5234');
      k.box('wood', 0, 0.75, -0.19, 0.44, 0.5, 0.04, '#7a5234');
      for (const [a2, b2] of [[-0.18, -0.17], [0.18, -0.17], [-0.18, 0.17], [0.18, 0.17]]) k.box('wood', a2, 0.22, b2, 0.04, 0.45, 0.04, '#6a4530');
      k.pop();
    }
  }
  let nb = 0;
  nb += bulbString(k, [22, y0 + 3.7, -1.2], [36.5, y0 + 3.7, -2.4], 0.5, 12);
  nb += bulbString(k, [36.5, y0 + 3.7, -2.4], [33, y0 + 3.7, -12.8], 0.45, 10);
  nb += bulbString(k, [22, y0 + 3.7, -1.2], [24.5, y0 + 3.7, -12.8], 0.45, 8);
  nb += bulbString(k, [24.5, y0 + 3.7, -12.8], [33, y0 + 3.7, -12.8], 0.4, 8);
  void nb;

  signs.place(signs.make('ARABLE · FRUIT TREES · GRAIN', { style: 'panel', size: 40, bg: '#2a302c' }), 29.6, y0 + 4.05, -1.3, 0.5);
  for (const x of [26.5, 32.7]) k.rod('metal', [x, y0 + 4.3, -1.3], [x, yc, -1.3], 0.012, '#2a2c2d', 3);
  for (const [x, z] of [[40, -8], [52, -14], [58, -30], [44, -40]]) pool.add(x, y0 + 5, z, 0xff7ab0, 16);
  pool.add(29, y0 + 3.2, -5, 0xffd9a0, 16);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 75, west: the Mids cafeteria. A barrel-shaped hall — flat back wall
// with its own wallscreen, bowed side walls with a teal band — under a
// dropped ceiling with a great spoked ring of light. A side area by the door
// holds cots and a barred alcove.
// ---------------------------------------------------------------------------
function midscafe({ pool, signs }) {
  const k = new Kit('mids/midscafe');
  const y0 = C.floorY(75), yc = y0 + C.ROOM_H, H = C.ROOM_H;
  const r = makeRng(7575);
  const wall = '#837864', teal = '#2e6d68', side = '#5c5a4d', back = 24;
  shell(k, { s: -1, y0, x0: 20.8, back, wall: side, door: [-1.2, -4.4], wainscot: '#4a483e' });
  roomFloor(k, -1, y0, 20.8, back, '#837768');
  liner(k, -1, y0, 0, -back, '#4f4b43');

  // hall outline: two bowed walls on a circle round (cx, cz), flat back wall
  const cx = -52, cz = -9.5, RA = 14.5, zB = -19;
  const th0 = Math.asin((0 - cz) / RA), th1 = Math.asin((zB - cz) / RA);
  const NA = 16;
  const bow = (e, th, rr = RA) => [cx + e * Math.cos(th) * rr, cz + Math.sin(th) * rr];
  for (const e of [-1, 1]) {
    for (let i = 0; i < NA; i++) {
      const ta = th0 + ((th1 - th0) * i) / NA, tb = th0 + ((th1 - th0) * (i + 1)) / NA, tm = (ta + tb) / 2;
      const [mx, mz] = bow(e, tm);
      const len = RA * Math.abs(tb - ta) + 0.05;
      // wall tangent is along z mostly; orient the box's long side (local z) with it
      const ry = Math.atan2(-e * Math.sin(tm), Math.cos(tm));
      k.box('matte', mx, y0 + H / 2, mz, 0.36, H, len, wall, ry);
      for (const d of [-1, 1]) {
        const [qx, qz] = bow(e, tm, RA + d * 0.2);
        k.box('matte', qx, y0 + 0.6, qz, 0.03, 1.2, len * ((RA + d * 0.2) / RA), teal, ry);
      }
    }
    const [sx] = bow(e, th0);
    k.bb('matte', sx - 0.2, y0, -0.05, sx + 0.2, yc, 0.001, SECTION);
  }
  const [bx0] = bow(-1, th1), [bx1] = bow(1, th1);
  k.bb('matte', bx0, y0, zB - 0.3, bx1, yc, zB, wall);
  k.bb('matte', bx0 + 0.2, y0, zB, bx1 - 0.2, y0 + 1.2, zB + 0.03, teal);
  // floor of the hall
  const hall = [];
  for (let i = 0; i <= NA; i++) hall.push(bow(1, th0 + ((th1 - th0) * i) / NA, RA - 0.18));
  for (let i = NA; i >= 0; i--) hall.push(bow(-1, th0 + ((th1 - th0) * i) / NA, RA - 0.18));
  slab(k, hall, y0 + 0.04, '#8b7e6b', { t: 0.02 });
  // dropped ceiling with the spoked ring hanging beneath it
  slab(k, hall, yc - 0.3, '#77705f', { t: 0.12 });
  const rcx = -52, rcz = -9.2, RR = 8.6;
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    const x = rcx + Math.cos(a) * RR, z = rcz + Math.sin(a) * RR;
    k.box('matte', x, yc - 0.75, z, (RR * Math.PI * 2) / 48 + 0.08, 0.5, 0.9, '#b3aa98', -a + Math.PI / 2);
  }
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    k.box('matte', rcx + Math.cos(a) * RR * 0.52, yc - 0.62, rcz + Math.sin(a) * RR * 0.52, RR * 0.92, 0.16, 0.34, '#a8a08e', -a);
    const b = a + Math.PI / 12;
    k.box('glow', rcx + Math.cos(b) * RR * 0.6, yc - 0.58, rcz + Math.sin(b) * RR * 0.6, 2.6, 0.03, 1.1, col('#fff3dc', 2.2), -b);
  }
  k.cyl('matte', rcx, yc - 0.95, rcz, 1.4, 0.65, '#a8a08e', 24);
  k.cyl('glow', rcx, yc - 0.97, rcz, 1.1, 0.03, col('#fff3dc', 2), 24);
  // linear pendant and a spot on a drop rod, west side
  const pry = -Math.atan2(-6.52 + 5.4, -61.92 + 64.75);
  for (const e of [-1.3, 1.3]) k.rod('metal', [-63.3 + e * Math.cos(pry), yc - 0.3, -6 - e * Math.sin(pry)], [-63.3 + e * Math.cos(pry), yc - 1.25, -6 - e * Math.sin(pry)], 0.01, '#1a1a1a', 3);
  k.box('metal', -63.3, yc - 1.3, -6, 3.0, 0.1, 0.22, '#2e3030', pry);
  k.box('glow', -63.3, yc - 1.36, -6, 2.8, 0.02, 0.14, col('#fff4e0', 3), pry);
  k.rod('metal', [-58.6, yc - 0.3, -7], [-58.6, y0 + 5.35, -7], 0.02, '#1a1a1a', 4);
  k.cyl('metal', -58.6, y0 + 5.0, -7, 0.42, 0.36, '#3a3c3d', 14);
  k.cyl('glow', -58.6, y0 + 4.98, -7, 0.34, 0.02, col('#fff4e0', 5), 14);

  // wallscreen on the back wall
  const sx = -52, sy = y0 + 2.9;
  const bez = roundRectShape(15.4, 3.8, 1.4);
  bez.holes.push(roundRectShape(14.2, 3.0, 0.9));
  k.geo('matte', extrude(bez, 0.45, false, 10), sx, sy, zB, '#9f9684');
  k.geo('matte', extrude(roundRectShape(14.2, 3.0, 0.9), 0.06, false, 10), sx, sy, zB + 0.02, '#161717');
  const tex = toTexture(surfaceViewCanvas(512, 128, { seed: 9 }), { repeat: false });
  // the picture is tinted warm, like an old sepia print of the outside
  const scr = k.mesh(screen(tex, sx, sy, zB + 0.1, 14, 2.8, 0, 1.7, 'midscafe/wallscreen'));
  scr.material.emissive.set('#f0cfa2');
  // glowing floor lamps and wall lights
  for (const [x, z] of [[-65.0, -7.2], [-63.5, -15.6], [-57, -18.2], [-47, -18.2], [-42.8, -15.6]]) P.floorLamp(k, x, y0, z, { h: 2.5, r: 0.24 });
  for (const th of [0.45, 0.33, -0.29]) {
    const [x, z] = bow(-1, th, RA - 0.2);
    P.sconce(k, x, y0 + 3.6, z, Math.atan2(-(x - cx), -(z - cz)), { color: '#fff0d6', power: 5 });
  }
  for (const [x, z] of [[-38.4, -6], [-38.8, -12.4]]) {
    const ry = Math.atan2(-(x - cx), -(z - cz));
    P.sconce(k, x, y0 + 3.6, z, ry, { color: '#fff0d6', power: 5 });
  }
  for (const x of [-60.5, -43.5]) P.sconce(k, x, y0 + 4.6, zB + 0.02, 0, { color: '#fff0d6', power: 5 });
  // doorway at the widest point of the west bow
  const [dx, dz] = bow(-1, -0.03, RA - 0.2);
  P.archDoor(k, dx, y0, dz, Math.atan2(-(dx - cx), -(dz - cz)), { w: 1.3, h: 2.55, color: '#3a3833', frame: '#9d9483' });

  // thirty-five tables and their chairs
  let chairs = 0;
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 5; j++) {
      const x = -61.6 + i * 3.2, z = -3 - j * 3.6;
      P.table(k, x, y0, z, 0, { w: 1.2, d: 0.9, h: 0.78, top: '#e6e0d2', leg: '#2e3030' });
      for (const [ddx, ddz, ry] of [[-0.3, -0.72, 0], [0.3, -0.72, 0], [-0.3, 0.72, Math.PI], [0.3, 0.72, Math.PI]]) {
        if (r() < 0.12) continue;
        P.chair(k, x + ddx, y0, z + ddz, ry, { color: '#3b3f3e' });
        chairs++;
      }
    }
  }

  // side area by the door: dark ceiling, cots, spare chairs, barred alcove
  k.bb('matte', -40.6, yc - 0.25, -back, -21, yc - 0.1, 0, '#1f2020');
  k.box('metal', -36.2, yc - 0.28, -6.8, 3.1, 0.06, 0.24, '#2e3030');
  k.box('glow', -36.2, yc - 0.32, -6.8, 3.0, 0.03, 0.14, col('#f4f6ff', 3.5));
  for (let i = 0; i < 4; i++) {
    const x = -28.2 + (i % 2) * 3.4, z = -1.4 - Math.floor(i / 2) * 2.2;
    k.box('fabric', x, y0 + 0.38, z, 1.9, 0.1, 0.8, '#7a5a3a');
    k.box('metal', x, y0 + 0.18, z, 1.8, 0.36, 0.06, '#4a4d4c');
  }
  P.crate(k, -35, y0, -4.2, 0.7, '#8a5a36', 0.2);
  for (let i = 0; i < Math.max(0, 129 - chairs); i++) P.chair(k, -36.5 + i * 0.62, y0, -21.2, 0, { color: '#3b3f3e' });
  for (let i = 0; i < 14; i++) k.rod('metal', [-24.6 + i * 0.26, y0, -5.2], [-24.6 + i * 0.26, y0 + 2.6, -5.2], 0.03, '#2a2c2d', 5);
  for (let i = 0; i < 14; i++) k.rod('metal', [-24.7, y0, -5.4 - i * 0.3], [-24.7, y0 + 2.6, -5.4 - i * 0.3], 0.03, '#2a2c2d', 5);
  for (let i = 0; i < 28; i++) k.rod('metal', [-24.7 + (i % 14) * 0.26, y0 + 1.3 * (1 + Math.floor(i / 14)) - 0.02, -5.2], [-24.7 + (i % 14) * 0.26 + 0.26, y0 + 1.3 * (1 + Math.floor(i / 14)) - 0.02, -5.2], 0.02, '#2a2c2d', 4);
  k.bb('metal', -24.8, y0 + 2.6, -9.7, -21, y0 + 2.7, -5.1, '#3a3c3d');
  k.box('fabric', -22.8, y0 + 0.4, -7.4, 1.9, 0.12, 0.8, '#6f7f6a');
  // west side: a dim service strip along the silo wall
  for (const [z, c] of [[-4, '#ffe9c8'], [-9, '#bfe8e0'], [-14, '#ffe9c8']]) {
    const x = -xCirc(z, C.R_IN - 0.2);
    k.box('glow', x, y0 + 2.2, z, 0.05, 0.3, 0.5, col(c, 2.5), Math.atan2(-x, -z));
  }
  for (const [x, z] of [[-70.1, -22.2], [-68.5, -8], [-71, -15]]) cagedBulb(k, x, yc, z, { drop: 0.5 });

  const dd = Math.hypot(cx - dx, cz - dz);
  signs.place(signs.make('EXIT', { style: 'panel', size: 34, bg: '#2a2e2c' }), dx + ((cx - dx) / dd) * 0.14, y0 + 3.05, dz + ((cz - dz) / dd) * 0.14, 0.24, Math.atan2(cx - dx, cz - dz));
  pool.add(-52, y0 + 4.2, -9.5, 0xfff0da, 26);
  pool.add(-59, y0 + 3, -15, 0xffe9c8, 14);
  pool.add(-45, y0 + 3, -15, 0xffe9c8, 14);
  pool.add(-31, y0 + 4, -8, 0xeef2ff, 10);
  return k.finish(roomMats());
}
