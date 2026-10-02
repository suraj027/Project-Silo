import * as THREE from 'three';
import { Kit, UNIT, InstanceSet, col } from '../core/geom.js';
import { TEX } from '../core/materials.js';
import { toTexture, makeCanvas, drawingsCanvas } from '../core/textures.js';
import { makeRng, lerp } from '../core/rng.js';
import * as C from '../core/constants.js';
import { roomMats } from '../rooms/common.js';
import { TURN_H } from './shaft.js';
import { terrainY, SILOS } from './surface.js';

// ---------------------------------------------------------------------------
// Silo 17: the drowned, unpowered neighbour. Everything here is an overlay on
// the same silo model — a survivor camp, a rope bridge, graffiti, a lone tree,
// moss and emergency glows, a flooded bottom, a pump line and the remains on
// the surface — hidden until the Silo 17 switch turns it on.
// ---------------------------------------------------------------------------

const TARP = '#686655';
const ROPE = '#282421';
const WOOD = ['#6b5238', '#7a5f3e', '#5e4630', '#85643f'];
const POST = ['#3e3126', '#46382a', '#352a20'];
const CRATE = ['#7a5f3e', '#6b5a3a', '#5e6446', '#8b6a43', '#6f6a5c', '#57604a', '#454a47', '#3d4240'];
const LEAF = ['#4d8f46', '#5aa84e', '#3f7f3a', '#6aaa4f'];
const LAMP = '#ffd9a0';

// The overlay's own unlit glow material, so dimming the shared MATS.glow for
// the powerless silo leaves the camp lamps and emergency lights alone.
let GLOW = null;
const mats = (extra = {}) => ({ ...roomMats(), glow: GLOW, ...extra });

export function buildSilo17({ pool }) {
  GLOW = new THREE.MeshBasicMaterial({ name: 'silo17-glow', vertexColors: true });
  const group = new THREE.Group();
  group.name = 'silo17';
  const dyn = new THREE.Group();
  dyn.name = 'silo17/dyn';
  group.visible = dyn.visible = false;
  const updaters = [];
  const ctx = { pool, group, dyn, updaters };
  group.add(camp(ctx), ropeBridge(), graffiti(), loneTree(ctx), decay(ctx), pumpLine(ctx), remains());
  flood(ctx);
  let active = false;
  return {
    group,
    dyn,
    update(dt, t) {
      if (!active) return;
      for (const u of updaters) u(dt, t);
    },
    setActive(on) {
      active = !!on;
      group.visible = dyn.visible = active;
    },
  };
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------
const ropePoint = (a, b, sag, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t) - 4 * sag * t * (1 - t), lerp(a[2], b[2], t)];

/** Sagging rope between two points, as a chain of short rods. */
function rope(k, a, b, sag, { r = 0.016, color = ROPE, seg = 8 } = {}) {
  let prev = a;
  for (let i = 1; i <= seg; i++) {
    const p = ropePoint(a, b, sag, i / seg);
    k.rod('matte', prev, p, r, color, 4);
    prev = p;
  }
}

function polyline(k, pts, r, color, mat = 'matte') {
  for (let i = 1; i < pts.length; i++) k.rod(mat, pts[i - 1], pts[i], r, color, 4);
}

/**
 * A cloth sheet sampled from fn(u, v) -> [x, y, z] on an nu × nv grid, written
 * into the kit's 'tarp' batch (a double-sided material).
 */
function sheet(k, fn, nu, nv, color) {
  const b = k.batch('tarp');
  const c = col(color).clone();
  const pts = [];
  for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) pts.push(new THREE.Vector3(...fn(i / nu, j / nv)));
  const at = (i, j) => pts[Math.min(nv, Math.max(0, j)) * (nu + 1) + Math.min(nu, Math.max(0, i))];
  const du = new THREE.Vector3(), dv = new THREE.Vector3(), n = new THREE.Vector3();
  const first = b.n;
  for (let j = 0; j <= nv; j++) {
    for (let i = 0; i <= nu; i++) {
      du.subVectors(at(i + 1, j), at(i - 1, j));
      dv.subVectors(at(i, j + 1), at(i, j - 1));
      n.crossVectors(du, dv).normalize();
      const p = at(i, j);
      b.vert(p.x, p.y, p.z, n.x, n.y, n.z, i / nu, j / nv, c);
    }
  }
  for (let j = 0; j < nv; j++) {
    for (let i = 0; i < nu; i++) {
      const a = first + j * (nu + 1) + i, d = a + nu + 1;
      b.tri(a, a + 1, d + 1);
      b.tri(a, d + 1, d);
    }
  }
}

// ---------------------------------------------------------------------------
// a. Survivor camp: level 18 west, in the ground storey of the apartment
// cells. Sparse and unpowered: a few big boxes out on the floor, thin posts
// with rope lines, a trough of greens under small hanging lamps, a floodlight
// on a tripod fed by a generator, a box fan, stores at the back.
// ---------------------------------------------------------------------------
function camp({ dyn, updaters }) {
  const k = new Kit('silo17/camp');
  const y0 = C.floorY(18);
  const yc = y0 + 3.25; // underside of the cells' mezzanine
  const r = makeRng(1718);
  const WALL_Z = -C.CELL_D + 0.16; // face of the cells' back wall
  const tarpCol = () => col(TARP, 0.8 + r() * 0.3).clone();
  let boxes = 0;
  // shell.js furnishes these cells like any other apartment level (beds and
  // dressers on the back wall, tables, wardrobes by the partitions, a couch
  // and stools); everything below is placed clear of them:
  //   beds     x -27.65..-25.65, -41.43..-39.43, -44.38..-42.38, -52.6..-50.6, -66.3..-64.3 at z -12.3..-11.3
  //   dressers x -32.63..-31.03, -35.45..-33.85, -49.27..-47.67, -57.49..-55.89, -60.88..-59.28 at z -12.5..-11.9
  //   tables   (-28.7, -5.9), (-37.7, -5.95), (-46.4, -5.1), (-54.85, -5.35), (-62.2, -5.25), about 1.2 × 0.8
  //   and thin wardrobes / stools at x -25.4, -41.25, -42.1, -50.4, -66.25, -44.7, -62.8

  /** A plain box on the floor, or on top of another at y; returns its top. */
  const box = (x, z, w, h, d, color, ry = 0, y = y0) => {
    k.box('matte', x, y + h / 2, z, w, h, d, color, ry);
    boxes++;
    return y + h;
  };

  const post = (x, z, h) => {
    const steel = r() < 0.3;
    k.cyl(steel ? 'metal' : 'wood', x, y0, z, steel ? 0.035 : 0.045, h, steel ? '#3a3d3c' : r.pick(POST), 6);
    k.box('matte', x, y0 + 0.05, z, 0.24, 0.1, 0.24, '#57534b', r() * 0.6); // a brick for a foot
    k.box('matte', x, y0 + h - 0.1, z, 0.1, 0.12, 0.1, ROPE); // lashing
    return [x, y0 + h - 0.1, z];
  };

  /** A tarp thrown over a stack: flat on top, hanging down the sides. */
  const drape = (x, z, w, d, top, ry) => {
    const hw = w / 2 + 0.03, hd = d / 2 + 0.03;
    const hang = Math.min(top - y0 - 0.08, 0.28 + r() * 0.3);
    const cs = Math.cos(ry), sn = Math.sin(ry), ph = r() * 6;
    sheet(k, (u, v) => {
      const lx = (u * 2 - 1) * (hw + hang), lz = (v * 2 - 1) * (hd + hang);
      const ex = Math.max(0, Math.abs(lx) - hw), ez = Math.max(0, Math.abs(lz) - hd);
      const e = Math.max(ex, ez);
      const px = Math.sign(lx) * (Math.min(Math.abs(lx), hw) + ex * 0.15);
      const pz = Math.sign(lz) * (Math.min(Math.abs(lz), hd) + ez * 0.15);
      const y = top + 0.02 - e + (e > 0 ? 0.04 * Math.sin(u * 17 + v * 11 + ph) : 0.015 * Math.sin(u * 9 + ph));
      return [x + px * cs + pz * sn, y, z - px * sn + pz * cs];
    }, 14, 12, tarpCol());
  };

  /** A shaded lamp hanging on a cord; unpowered-dim, it only reads as a pale disc. */
  const lamp = (x, yTop, z, yLamp) => {
    k.rod('matte', [x, yTop, z], [x, yLamp + 0.12, z], 0.006, '#1f1c1a', 3);
    k.geo('metal', UNIT.cyl(10, 0.35), x, yLamp + 0.06, z, '#2f3130', 0.2, 0.12, 0.2);
    k.cyl('glow', x, yLamp - 0.006, z, 0.13, 0.012, col(LAMP, 1.25), 10);
  };

  const floodlight = (x, z, yaw, pitch) => {
    const hy = y0 + 1.45;
    for (let i = 0; i < 3; i++) {
      const a = yaw + 0.4 + (i * Math.PI * 2) / 3;
      k.rod('metal', [x + Math.cos(a) * 0.55, y0, z + Math.sin(a) * 0.55], [x, hy - 0.4, z], 0.02, '#2b2d2c', 5);
    }
    k.rod('metal', [x, hy - 0.45, z], [x, hy - 0.05, z], 0.028, '#2b2d2c', 6);
    const sp = Math.sin(pitch), cp = Math.cos(pitch);
    k.push(x, hy + 0.18, z, yaw);
    // head: local +z is the beam direction
    k.box('metal', 0, 0, 0, 0.46, 0.4, 0.26, '#3b3f3e', 0, pitch);
    k.box('metal', 0, 0.02 * cp + 0.17 * sp, 0.02 * sp - 0.17 * cp, 0.38, 0.3, 0.1, '#2b2e2d', 0, pitch);
    k.box('glow', 0, -0.14 * sp, 0.14 * cp, 0.38, 0.32, 0.02, col(LAMP, 1.6), 0, pitch);
    for (const s of [-1, 1]) k.rod('metal', [s * 0.27, -0.22, 0], [s * 0.27, 0.02, 0], 0.018, '#2d2f2f', 4);
    k.rod('metal', [-0.27, -0.22, 0], [0.27, -0.22, 0], 0.018, '#2d2f2f', 4);
    k.pop();
  };

  /** A box fan standing on a crate, facing the cut; its blades turn slowly. */
  const fan = (x, y, z) => {
    const S = 0.6, D = 0.18, cy = y + S / 2, fz = z + D / 2;
    k.box('metal', x, cy, z, S, S, D, '#3a3930');
    k.box('matte', x, cy, fz + 0.002, S - 0.07, S - 0.07, 0.004, '#191916');
    k.geo('metal', UNIT.torus(0.05, 4, 28), x, cy, fz + 0.035, '#262621', 0.26, 0.26, 0.26);
    for (const s of [-1, 1]) k.rod('metal', [x + s * 0.26, cy, fz + 0.035], [x, cy, fz + 0.035], 0.006, '#262621', 3);
    for (const s of [-1, 1]) k.box('metal', x + s * 0.2, y + 0.015, z, 0.07, 0.03, 0.3, '#262621');
    const kb = new Kit('silo17/fanBlades');
    for (let i = 0; i < 3; i++) {
      const a = Math.PI / 2 + (i * Math.PI * 2) / 3;
      kb.box('matte', Math.cos(a) * 0.115, Math.sin(a) * 0.115, 0, 0.21, 0.08, 0.012, '#dcd9cd', 0, 0, a);
    }
    kb.sphere('metal', 0, 0, 0.008, 0.035, '#2a2a26', 8, 6);
    const blades = kb.finish(mats());
    blades.position.set(x, cy, fz + 0.018);
    dyn.add(blades);
    updaters.push((dt) => {
      blades.rotation.z -= Math.min(dt, 0.1) * 1.9;
    });
  };

  // bay 0: the floodlight on its tripod by the partition, a small generator
  // behind it, and a few boxes round them ------------------------------------------
  {
    const fx = -25.95, fz = -9.1;
    floodlight(fx, fz, -Math.PI / 2 + 0.28, 0.12);
    const gx = -28.6, gz = -10.7;
    k.box('metal', gx, y0 + 0.35, gz, 0.9, 0.7, 0.6, '#5b4a2e');
    k.box('metal', gx, y0 + 0.74, gz, 0.6, 0.08, 0.4, '#2d2f2f');
    k.box('glow', gx - 0.2, y0 + 0.5, gz + 0.31, 0.06, 0.06, 0.02, col('#9dff8a', 1.6));
    polyline(k, [[gx + 0.2, y0 + 0.3, gz + 0.3], [gx + 0.3, y0 + 0.02, gz + 0.9], [fx - 0.3, y0 + 0.02, fz - 0.6], [fx, y0 + 0.5, fz]], 0.015, '#1c1c1c');
    box(-28.2, -7.95, 1.5, 0.95, 1.0, '#8f5c38', 0.04);
    const t = box(-27.4, -10.9, 1.1, 0.55, 0.7, '#4a7472', -0.03);
    box(-27.45, -10.92, 0.9, 0.42, 0.6, '#5a8480', 0.08, t);
    box(-25.9, -10.85, 1.1, 0.9, 0.7, '#36383a', 0.02);
  }

  // bay 1: a long crate out front, a lime box, the fan, a dark cube at the back
  box(-37.5, -4.95, 2.6, 1.1, 0.9, '#8f5c38', 0.03);
  box(-40.78, -3.3, 0.85, 0.85, 0.85, '#9aad4a', -0.12);
  box(-37.85, -12.3, 0.6, 0.6, 0.6, '#36383a', 0.1);
  fan(-35.75, box(-35.75, -7.05, 0.75, 0.7, 0.55, '#7a5a3a', 0.05), -7.05);

  // bay 3: a grey chest with dark end blocks, a grey crate with a jar on it
  box(-56.4, -9.6, 1.75, 1.2, 0.88, '#4a4c44', 0.02);
  for (const s of [-1, 1]) box(-56.4 + s * 1.02, -9.6 + s * 0.02, 0.3, 1.28, 0.94, '#272923', 0.02);
  k.cyl('matte', -52.62, box(-52.7, -5.4, 0.85, 0.95, 0.85, '#4f5a4f', 0.06), -5.38, 0.09, 0.2, '#cfc9b4', 10);

  // bay 4, at the back (mostly out of sight behind the partition) ------------------
  {
    let x = -64.1;
    const tops = [];
    while (x < -61.3) {
      const s = 0.6 + r() * 0.25;
      if (x + s > -60.95) break;
      const cx = x + s / 2;
      let y = y0;
      for (let i = 0, n = 1 + Math.floor(r() * 3); i < n; i++) y = box(cx + (r() - 0.5) * 0.06, -12.1 + (r() - 0.5) * 0.06, s * (1 - i * 0.1), s * 0.8, s * (1 - i * 0.1), r.pick(CRATE), (r() - 0.5) * 0.2, y);
      tops.push([cx, y, s]);
      x += s + 0.12;
    }
    const [dx, dy, ds] = tops.reduce((a, b) => (b[1] < a[1] ? b : a));
    drape(dx, -12.1, ds, ds, dy, 0.05);
    const t = box(-65.1, -10.3, 0.8, 0.6, 0.7, '#6f6a5c', 0.1);
    drape(-65.1, -10.3, 0.8, 0.7, box(-65.08, -10.3, 0.65, 0.5, 0.6, '#57604a', -0.05, t), 0.1);
  }

  // thin posts: a row across the back of each bay and a few out front, roped
  // together, guyed up to the mezzanine ------------------------------------------------
  const P0 = [
    [[-32.4, -9.3], [-29.6, -9.1], [-27.55, -9.25]],
    [[-40.9, -9.15], [-37.6, -9.35], [-34.0, -9.2]],
    [[-49.05, -9.2], [-45.7, -9.35], [-42.6, -9.1]],
    [[-54.8, -9.2], [-51.0, -9.25]],
    [[-65.6, -9.2], [-62.5, -9.3], [-59.2, -9.1]],
  ];
  const rows = P0.map((row) => row.map(([x, z]) => post(x, z, 2.4 + r() * 0.3)));
  for (const row of rows) {
    for (let j = 1; j < row.length; j++) rope(k, row[j - 1], row[j], 0.14 + r() * 0.12);
    for (const p of [row[0], row[row.length - 1]]) rope(k, p, [p[0] + (r() - 0.5) * 0.6, yc - 0.02, WALL_Z + 0.05], 0.06, { seg: 5 });
  }
  // front posts, each roped back to a post in the row behind it
  for (const [x, z, bay, j] of [[-30.6, -3.2, 0, 1], [-37.5, -2.4, 1, 1], [-45.55, -5.65, 2, 1], [-53.9, -3.6, 3, 0], [-61.5, -3.0, 4, 1]]) {
    const p = post(x, z, 2.3 + r() * 0.3);
    rope(k, p, rows[bay][j], 0.2 + r() * 0.15);
  }

  // children's drawings pinned to the back walls of bays 1–2, clear of the
  // doors and portholes on those walls -------------------------------------------------
  [[-37.5, 1717], [-46.0, 1718]].forEach(([dx, seed], i) => {
    const tex = toTexture(drawingsCanvas(384, 256, seed), { repeat: false });
    const W = 1.65, H = 1.1, wy = y0 + 1.5;
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(W, H),
      new THREE.MeshStandardMaterial({ name: 'silo17-drawings', map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: 0.22, roughness: 0.9, transparent: true, alphaTest: 0.03 })
    );
    m.position.set(dx, wy, WALL_Z + 0.02);
    m.name = `silo17/drawings${i}`;
    m.receiveShadow = true;
    k.mesh(m);
    for (const [u, v] of [[65, 16], [189, 18], [313, 15], [65, 136], [189, 138]]) {
      k.sphere('matte', dx - W / 2 + (u / 384) * W, wy + H / 2 - (v / 256) * H, WALL_Z + 0.04, 0.018, r.pick(['#c0392b', '#e0b030', '#2e86c1']), 6, 4);
    }
  });

  // troughs of greens in bays 2–3 under small hanging lamps, a tall pot -----------
  const trough = (x0, x1, z, n) => {
    const len = x1 - x0, cx = (x0 + x1) / 2;
    k.box('wood', cx, y0 + 0.16, z, len, 0.32, 0.82, '#6b4a32');
    k.box('wood', cx, y0 + 0.33, z, len + 0.06, 0.03, 0.88, '#5e4630');
    k.box('matte', cx, y0 + 0.325, z, len - 0.1, 0.02, 0.72, '#2e2219');
    for (let i = 0; i < n; i++) {
      const x = x0 + 0.35 + ((i + 0.5) / n) * (len - 0.7) + (r() - 0.5) * 0.15;
      const s = 0.2 + r() * 0.1;
      k.ico('foliage', x, y0 + 0.36 + s * 0.45, z + (r() - 0.5) * 0.3, s, r.pick(LEAF), 0, 0.75, r() * 6);
      if (r() < 0.6) k.ico('foliage', x + (r() - 0.5) * 0.2, y0 + 0.38 + s * 0.6, z + (r() - 0.5) * 0.3, s * 0.7, r.pick(LEAF), 0, 0.9, r() * 6);
    }
  };
  trough(-49.0, -45.2, -7.0, 5);
  trough(-44.2, -42.7, -7.0, 2);
  trough(-54.2, -51.3, -7.1, 5);
  for (const [x, z] of [[-48.3, -7.0], [-46.9, -7.05], [-43.45, -7.0], [-53.2, -7.1], [-51.8, -7.1]]) lamp(x, yc, z, y0 + 2.1);
  {
    const x = -47.9, z = -8.6;
    k.cyl('matte', x, y0, z, 0.22, 0.92, '#7a4226', 12, 1.25);
    k.cyl('matte', x, y0 + 0.9, z, 0.3, 0.07, '#693820', 12);
    k.cyl('matte', x, y0 + 0.93, z, 0.26, 0.02, '#2e2219', 12);
    k.ico('foliage', x, y0 + 1.18, z, 0.34, '#3f7f3a', 0, 0.8, 1.3);
    k.ico('foliage', x + 0.12, y0 + 1.36, z - 0.05, 0.22, '#4d8f46', 0, 0.9, 2.1);
    box(-46.6, -8.5, 0.6, 0.55, 0.6, '#8f5c38', 0.2);
  }

  const tarpMat = new THREE.MeshStandardMaterial({ name: 'silo17-tarp', vertexColors: true, roughness: 0.96, metalness: 0, side: THREE.DoubleSide });
  const g = k.finish(mats({ tarp: tarpMat }));
  g.userData.boxes = boxes;
  return g;
}

// ---------------------------------------------------------------------------
// b. A steep rope-and-plank bridge from the level-20 landing ring up to the
// helix one turn higher, lined up on the stairwell doorway at 301.5°, and the
// stub of a blown concrete bridge on the level-19 ring.
// ---------------------------------------------------------------------------

// helix geometry as in shaft.js: first tread at a = π/2, turning clockwise
const HELIX_A0 = Math.PI * 0.5;
/** Height of the helix parapet top above the floor at world (x, z), lower pass. */
function helixTop(x, z) {
  let t = -(Math.atan2(z, x) - HELIX_A0) / (Math.PI * 2);
  t -= Math.floor(t);
  return t * TURN_H + 1.0;
}

const HEMP = '#857657';

function ropeBridge() {
  const k = new Kit('silo17/ropeBridge');
  const r = makeRng(1919);
  // Level 20 has no concrete bridge at this angle (shaft.js sets them at 0°,
  // 120° and 240° there); level 19's bridge at 300° stays well above the ropes.
  const yF = C.floorY(20);
  const a = 1.5 * Math.PI + 0.55;
  const ax = Math.cos(a) * C.R_GAL_IN, az = Math.sin(a) * C.R_GAL_IN;
  // local frame: +x runs inward from the ring's inner edge to the helix, +z across
  const world = (lx, lz) => [ax - Math.cos(a) * lx + Math.sin(a) * lz, az - Math.sin(a) * lx - Math.cos(a) * lz];
  // the far end lands on the helix parapet on its second pass above level 20
  const topAt = (lx, lz) => helixTop(...world(lx, lz)) + TURN_H;
  const span = C.R_GAL_IN - C.R_HELIX;
  const y1 = 1.05, y2 = topAt(span, 0) + 0.03, sag = 0.4;
  const deck = (x) => {
    const t = x / span;
    return y1 + (y2 - y1) * t - sag * 4 * t * (1 - t);
  };

  k.push(ax, yF, az, Math.PI - a);
  // planks, pitched with the deck (a couple missing, one snapped)
  const N = 36, x0 = 0.06, step = (span - 0.12) / N;
  for (let i = 0; i < N; i++) {
    if (i === 13 || i === 27) continue;
    const x = x0 + (i + 0.5) * step;
    const pitch = Math.atan2(deck(x + 0.05) - deck(x - 0.05), 0.1);
    const snapped = i === 21;
    k.box('wood', x, deck(x) - 0.025, snapped ? -0.28 : (r() - 0.5) * 0.05, step - 0.05, 0.045, snapped ? 0.6 : 1.12 + (r() - 0.5) * 0.1, r.pick(WOOD), (r() - 0.5) * 0.08, 0, pitch);
  }
  // deck ropes under the plank ends, draped over the ring parapet (local x
  // -0.34..0, 1.02 high) and down its outer face to the anchor posts
  for (const s of [-1, 1]) {
    const pts = [[-1.0, 0.3, s * 0.8], [-0.38, 1.05, s * 0.66], [0.04, 1.05, s * 0.56]];
    for (let i = 0; i <= 24; i++) {
      const x = 0.06 + (i / 24) * (span - 0.1);
      pts.push([x, deck(x) - 0.06, s * 0.52]);
    }
    polyline(k, pts, 0.018, HEMP);
  }
  // anchor posts on the ring, stays back to plates by the doorway, a crate for a step
  for (const s of [-1, 1]) {
    k.cyl('wood', -1.0, 0, s * 0.8, 0.07, 2.1, WOOD[0], 7);
    k.box('metal', -1.0, 0.02, s * 0.8, 0.3, 0.04, 0.3, '#3a3d3c');
    k.rod('matte', [-1.0, 1.95, s * 0.8], [-3.7, 0.02, s * 0.7], 0.016, HEMP, 4);
    k.box('metal', -3.7, 0.02, s * 0.7, 0.16, 0.04, 0.16, '#3a3d3c');
  }
  k.box('wood', -0.7, 0.22, 0, 0.45, 0.44, 0.9, '#6b5238');
  // hand ropes from the anchor posts up to two short posts lashed on the helix
  // treads just inside its parapet, with suspenders down to the deck
  for (const s of [-1, 1]) {
    const ex = span + 0.45;
    const base = topAt(ex, s * 0.7) - 1.05;
    k.cyl('wood', ex, base, s * 0.7, 0.06, 2.05, WOOD[2], 7);
    k.box('fabric', ex - 0.25, topAt(span + 0.2, s * 0.7) + 0.07, s * 0.7, 0.34, 0.14, 0.28, '#7d6f55'); // sandbag on the parapet
    const p = [-1.0, 2.0, s * 0.8], q = [ex, base + 1.95, s * 0.7];
    rope(k, p, q, 0.3, { seg: 18, r: 0.02, color: HEMP });
    for (let i = 2; i < N; i += 4) {
      const x = x0 + (i + 0.5) * step;
      const h = ropePoint(p, q, 0.3, (x - p[0]) / (q[0] - p[0]));
      k.rod('matte', [x, h[1], h[2]], [x, deck(x) - 0.02, s * 0.55], 0.01, HEMP, 3);
    }
  }
  k.pop();

  // the blown bridge: a jagged stub, rebar and chunks hanging off the level-19
  // ring (there is no bridge at 240° on that level)
  const y = C.floorY(19);
  const b = (4 * Math.PI) / 3;
  k.push(Math.cos(b) * C.R_GAL_IN, y, Math.sin(b) * C.R_GAL_IN, Math.PI - b);
  k.box('concrete', 0.75, -0.3, 0, 1.5, 0.48, 3.0, '#bdb8ac', 0, 0, -0.04);
  k.box('concrete', 1.72, -0.4, -0.75, 0.62, 0.42, 1.2, '#b3ada1', 0.12, 0.05, -0.2);
  k.box('concrete', 1.62, -0.38, 0.85, 0.5, 0.4, 0.9, '#b8b2a6', -0.1, -0.04, -0.14);
  k.box('concrete', 0.42, 0.27, -1.38, 0.84, 0.66, 0.24, '#c4bfb3', 0, 0, -0.05);
  k.box('concrete', 0.3, 0.12, 1.38, 0.6, 0.36, 0.24, '#c4bfb3', 0.1);
  for (let i = 0; i < 9; i++) {
    const zz = -1.3 + i * 0.32 + (r() - 0.5) * 0.1;
    const bx = 1.5 + r() * 0.35, by = -0.32 + (r() - 0.5) * 0.2;
    k.rod('metal', [bx - 0.3, by, zz], [bx + 0.4 + r() * 0.7, by - 0.2 - r() * 0.8, zz + (r() - 0.5) * 0.4], 0.014, '#6b4a35', 4);
  }
  for (let i = 0; i < 4; i++) {
    const zz = -1.1 + i * 0.75 + (r() - 0.5) * 0.2;
    const bx = 1.45 + r() * 0.3, drop = 0.9 + r() * 1.3;
    const end = [bx + 0.25 + r() * 0.3, -0.45 - drop, zz + (r() - 0.5) * 0.3];
    k.rod('metal', [bx, -0.4, zz], end, 0.016, '#6b4a35', 4);
    k.ico('concrete', end[0], end[1] - 0.12, end[2], 0.22 + r() * 0.2, '#b3ada1', 0, 0.75, r() * 6);
  }
  k.cyl('matte', -1.4, 0.004, 0, 1.3, 0.012, '#35302b', 20);
  for (let i = 0; i < 10; i++) k.ico('concrete', -0.6 - r() * 2.5, 0.08, (r() - 0.5) * 3, 0.08 + r() * 0.14, '#aca79b', 0, 0.6, r() * 6);
  k.pop();
  return k.finish(mats());
}

// ---------------------------------------------------------------------------
// c. Graffiti sprayed across the level-1 cafeteria wallscreen.
// ---------------------------------------------------------------------------
/** The dead wallscreen: near-black glass with one word sprayed across it. */
function deadScreenCanvas(text, w = 1280, h = 256, seed = 1717) {
  const r = makeRng(seed);
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  // flat, dead glass with a little dust at the edges
  ctx.fillStyle = '#1a1a18';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 900; i++) {
    const edge = r() < 0.5 ? r() * 0.1 : 1 - r() * 0.1;
    const x = (r() < 0.5 ? edge : r()) * w, y = (r() < 0.5 ? r() : edge) * h;
    ctx.fillStyle = `rgba(150,145,130,${r() * 0.06})`;
    ctx.fillRect(x, y, 2, 2);
  }

  // big sprayed capitals, a touch right of centre, each letter a little crooked:
  // caps about two thirds of the screen's height, the word about 0.36 of its width
  const RED = [128, 52, 42];
  const size = h * 0.84;
  ctx.font = `900 ${size}px Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  const chars = [...text];
  const track = size * 0.12;
  const widths = chars.map((ch) => ctx.measureText(ch).width || size * 0.5);
  const natural = widths.reduce((a, b) => a + b, 0) + track * (chars.length - 1);
  const sx = Math.min(1.3, Math.max(0.75, (w * 0.36) / natural));
  const base = h * 0.75;
  const spots = [];
  let x = w * 0.518 - (natural * sx) / 2;
  chars.forEach((ch, i) => {
    const cw = widths[i] * sx;
    const cx = x + cw / 2, cy = base + (r() - 0.5) * 6;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((r() - 0.5) * 0.05);
    ctx.scale(sx, 1);
    ctx.shadowColor = `rgba(${RED.join(',')},0.35)`;
    ctx.shadowBlur = 5;
    ctx.fillStyle = `rgb(${RED.join(',')})`;
    ctx.fillText(ch, 0, 0);
    ctx.restore();
    spots.push([cx, cy, cw]);
    x += cw + track * sx;
  });
  // thin runs from the bottoms of the strokes, and a faint haze of overspray
  for (const [cx, cy, lw] of spots) {
    for (let j = 0; j < 3; j++) {
      const dx = cx + (r() - 0.5) * lw * 0.8, dy = cy - 4, len = 12 + r() * 40;
      const g = ctx.createLinearGradient(0, dy, 0, dy + len);
      g.addColorStop(0, `rgba(${RED.join(',')},0.8)`);
      g.addColorStop(1, `rgba(${RED.join(',')},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(dx, dy, 2 + r() * 2, len);
    }
    for (let j = 0; j < 220; j++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r());
      ctx.fillStyle = `rgba(${RED.join(',')},${r() * 0.12})`;
      ctx.fillRect(cx + Math.cos(a) * d * lw * 0.8, cy - size * 0.36 + Math.sin(a) * d * size * 0.5, 1.6, 1.6);
    }
  }
  return c;
}

function graffiti() {
  // covers the whole wallscreen (top.js: 22 × 4.4 at x 45, y -4.6, z -23.9)
  // so the dead screen hides its picture
  const tex = toTexture(deadScreenCanvas('WHY?'), { repeat: false });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(22, 4.4), new THREE.MeshBasicMaterial({ name: 'silo17-graffiti', map: tex }));
  m.position.set(45, -4.6, -23.8);
  m.name = 'silo17/graffiti';
  return m;
}

// ---------------------------------------------------------------------------
// d. A lone tree on a raised planter on level 73 east, its crown held up
// near the ceiling inside a dark grow stand with magenta panels, watered by a
// drip from a line run in along the ceiling.
// ---------------------------------------------------------------------------
function loneTree({ pool, group, dyn, updaters }) {
  const k = new Kit('silo17/loneTree');
  const y0 = C.floorY(73), yc = y0 + C.ROOM_H;
  const r = makeRng(7317);
  // planter footprint sits between mids.js's orchard trees (x 38 / 45.6 at
  // z -21.9) and in front of the crop bed that ends at z -18.2
  const px0 = 39.75, px1 = 43.85, pz0 = -22.6, pz1 = -18.35;
  const bed = y0 + 1.0;
  const tx = 41.0, tz = -20.2;
  const pcx = (px0 + px1) / 2, pcz = (pz0 + pz1) / 2;
  const STAND = '#26282c';

  // raised planter: plank sides, a lip and dark soil
  k.bb('wood', px0, y0, pz0, px1, bed - 0.04, pz1, '#5e4630');
  for (let i = 1; i < 4; i++) k.bb('wood', px0 - 0.01, y0 + i * 0.24, pz0 - 0.01, px1 + 0.01, y0 + i * 0.24 + 0.025, pz1 + 0.01, '#4e3a28');
  k.bb('wood', px0 - 0.05, bed - 0.06, pz0 - 0.05, px1 + 0.05, bed, pz1 + 0.05, '#6b5238');
  k.bb('matte', px0 + 0.08, bed - 0.05, pz0 + 0.08, px1 - 0.08, bed + 0.01, pz1 - 0.08, '#2e2219');
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + r() * 0.4;
    k.ico('rock', tx + Math.cos(a) * 0.75, bed + 0.04, tz + Math.sin(a) * 0.75, 0.1 + r() * 0.06, '#7d776b', 0, 0.7, r() * 6);
  }

  // trunk, roots, limbs and a big low-poly crown up under the ceiling
  const trunkTop = bed + 3.5;
  k.cyl('wood', tx, bed, tz, 0.2, trunkTop - bed, '#4d3523', 8, 0.55);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.4;
    k.rod('wood', [tx, bed + 0.3, tz], [tx + Math.cos(a) * 0.62, bed + 0.02, tz + Math.sin(a) * 0.62], 0.06, '#45301f', 5);
  }
  // [dx, height above floor, dz, radius]; tops stay under the ceiling grow bars
  const LOBES = [
    [0, 5.25, 0, 1.4],
    [1.1, 4.95, 0.35, 1.05],
    [-1.05, 5.0, -0.3, 1.1],
    [0.35, 5.7, -0.5, 0.9],
    [-0.5, 4.75, 0.65, 0.9],
    [0.55, 4.7, -0.95, 0.85],
    [-0.2, 5.75, 0.6, 0.8],
  ];
  LOBES.forEach(([dx, h, dz, rr], i) => {
    if (i) k.rod('wood', [tx, bed + 2.6 + i * 0.1, tz], [tx + dx * 0.8, y0 + h - 0.4, tz + dz * 0.8], 0.06, '#4d3523', 5);
    k.ico('leaf', tx + dx, y0 + h, tz + dz, rr, r.pick(['#2f6f2a', '#357731', '#3a7f34']), 1, 0.85, i * 1.7);
  });

  // the grow stand: corner posts from the planter to the ceiling, a top frame,
  // and a square of magenta panels just under the crown
  const corners = [[px0 + 0.1, pz0 + 0.1], [px1 - 0.1, pz0 + 0.1], [px1 - 0.1, pz1 - 0.1], [px0 + 0.1, pz1 - 0.1]];
  for (const [x, z] of corners) {
    k.cyl('metal', x, bed, z, 0.05, yc - 0.02 - bed, STAND, 8);
    k.box('metal', x, yc - 0.03, z, 0.26, 0.04, 0.26, STAND);
  }
  const panelY = y0 + 3.75;
  for (let i = 0; i < 4; i++) {
    const [ax, az] = corners[i], [bx, bz] = corners[(i + 1) % 4];
    k.rod('metal', [ax, yc - 0.3, az], [bx, yc - 0.3, bz], 0.03, STAND, 5);
    k.rod('metal', [ax, panelY - 0.06, az], [bx, panelY - 0.06, bz], 0.03, STAND, 5);
    // one panel along each side, tilted up and in towards the crown
    const mx = (ax + bx) / 2, mz = (az + bz) / 2;
    const along = Math.atan2(bx - ax, bz - az);
    const len = Math.hypot(bx - ax, bz - az) - 1.3;
    const nx = pcx - mx, nz = pcz - mz, nl = Math.hypot(nx, nz);
    const ox = (nx / nl) * 0.32, oz = (nz / nl) * 0.32;
    k.push(mx + ox, panelY, mz + oz, along);
    // local z runs along the side, local x points inwards or outwards
    const tilt = (nx * Math.cos(along) - nz * Math.sin(along) > 0 ? -1 : 1) * 0.55;
    k.box('metal', 0, 0, 0, 0.55, 0.06, len, '#2c2e30', 0, 0, tilt);
    k.box('glow', -Math.sin(tilt) * 0.035, Math.cos(tilt) * 0.035, 0, 0.48, 0.02, len - 0.08, col('#ff3f7a', 2.2), 0, 0, tilt);
    k.pop();
  }
  // the magenta panels light the planter and trunk; the crown carries its own glow
  pool.add(pcx, y0 + 3.3, pcz, 0xff5c8f, 9, group);

  // irrigation: fed along the ceiling from the west, dropping into the crown
  const pipe = '#5b5b57';
  const hy = yc - 0.2;
  const nx = 40.3, nz = -19.4, ny = y0 + 3.9;
  const path = [[33.3, yc, -15.6], [33.3, hy, -15.6], [nx, hy, -15.6], [nx, hy, nz], [nx, ny + 0.1, nz]];
  for (let i = 1; i < path.length; i++) {
    k.rod('metal', path[i - 1], path[i], 0.045, pipe, 8);
    k.sphere('metal', ...path[i], 0.065, pipe, 8, 6);
  }
  k.box('metal', 33.3, yc - 0.02, -15.6, 0.3, 0.04, 0.3, '#3a3c3d');
  for (const x of [35.6, 38.0]) k.rod('metal', [x, hy, -15.6], [x, yc - 0.01, -15.6], 0.012, '#2a2c2d', 4);
  k.geo('metal', UNIT.torus(0.18, 5, 14), 36.8, hy, -15.6, '#a3342b', 0.13, 0.13, 0.13, 0, Math.PI / 2, 0); // valve wheel
  k.cyl('metal', nx, ny, nz, 0.03, 0.1, '#3a3c3d', 6); // nozzle

  const yTop = ny - 0.01, yPud = bed + 0.014;
  const puddle = new THREE.Mesh(
    new THREE.CircleGeometry(0.3, 20),
    new THREE.MeshStandardMaterial({ name: 'silo17-puddle', color: '#1c2627', roughness: 0.06, metalness: 0.4, transparent: true, opacity: 0.85, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 })
  );
  puddle.rotation.x = -Math.PI / 2;
  puddle.position.set(nx, yPud, nz);
  puddle.name = 'silo17/puddle';
  k.mesh(puddle);

  // the drip: swells at the nozzle, falls, and rings the puddle
  const drip = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX.soft, color: '#d8f2ff', transparent: true, depthWrite: false, opacity: 0.95 }));
  drip.name = 'silo17/drip';
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.7, 1, 24), new THREE.MeshBasicMaterial({ name: 'silo17-ripple', color: '#cfeeff', transparent: true, opacity: 0, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(nx, yPud + 0.006, nz);
  ring.name = 'silo17/ripple';
  ring.visible = drip.visible = false;
  dyn.add(drip, ring);
  const FORM = 0.9, RING = 0.8;
  const fall = Math.sqrt((2 * (yTop - 0.03 - yPud)) / 9.81);
  const PERIOD = FORM + fall + RING + 0.3;
  updaters.push((dt, t) => {
    const u = t % PERIOD;
    if (u < FORM) {
      const q = u / FORM;
      drip.visible = true;
      drip.position.set(nx, yTop - 0.03 * q, nz);
      drip.scale.set(0.03 + 0.035 * q, 0.04 + 0.05 * q, 1);
    } else if (u < FORM + fall) {
      const f = u - FORM;
      drip.visible = true;
      drip.position.set(nx, yTop - 0.03 - 4.905 * f * f, nz);
      drip.scale.set(0.055, 0.1 + 0.06 * f, 1);
    } else drip.visible = false;
    const g = u - FORM - fall;
    if (g >= 0 && g < RING) {
      const q = g / RING;
      ring.visible = true;
      ring.scale.setScalar(0.04 + 0.25 * q);
      ring.material.opacity = 0.5 * (1 - q);
    } else ring.visible = false;
  });

  // the crown reads a saturated green against the dim orchard
  const leaf = new THREE.MeshStandardMaterial({ name: 'silo17-leaf', vertexColors: true, flatShading: true, roughness: 0.9, metalness: 0, emissive: '#3f9a3a', emissiveIntensity: 0.66 });
  return k.finish(mats({ leaf }));
}

// ---------------------------------------------------------------------------
// e. Decay up top: moss on the slab edges and the cut ring, green emergency
// glows round the stairwell.
// ---------------------------------------------------------------------------
function blobGeometry(seed) {
  const r = makeRng(seed);
  const g = new THREE.CircleGeometry(1, 16);
  const p = g.attributes.position;
  for (let i = 1; i < p.count; i++) {
    const s = 0.74 + r() * 0.32;
    p.setXY(i, p.getX(i) * s, p.getY(i) * s);
  }
  // the rim's first and last vertices coincide: keep the seam closed
  p.setXY(p.count - 1, p.getX(1), p.getY(1));
  g.computeBoundingSphere();
  return g;
}

function decay({ pool, group }) {
  const g = new THREE.Group();
  g.name = 'silo17/decay';
  const r = makeRng(2217);
  const MOSS = ['#1c2112', '#222815', '#191d0f', '#283018'];
  const mossMat = new THREE.MeshStandardMaterial({ name: 'silo17-moss', color: '#ffffff', roughness: 1, metalness: 0, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  const moss = new InstanceSet('silo17-moss', blobGeometry(5), mossMat, { castShadow: false, receiveShadow: true });
  // dark clumps hanging over the slab edges (0.6 m faces at z = 0), levels
  // 1–22, proud of the light strips so they break the lit bands
  for (let i = 0; i < 64; i++) {
    const n = 1 + (i % 22);
    const s = r.sign();
    const rx = 0.16 + r() * 0.12, ry = 0.38 + r() * 0.24;
    const x = s * (20 + r() * 53.5);
    const y = C.floorY(n) - 0.35 + (r() - 0.5) * 0.3;
    moss.add(x, y, 0.085, rx, ry, 1, col(r.pick(MOSS), 0.85 + r() * 0.3), 0, 0, (r() - 0.5) * 1.5);
  }
  // the cut ring of the wall, clear of the painted level numbers
  for (let i = 0; i < 16; i++) {
    const n = 1 + Math.floor(r() * 21);
    const s = r.sign();
    const rr = 0.3 + r() * 0.3;
    const x = s * (C.R_IN + 0.2 + rr * 0.6 + r() * (C.R_OUT - C.R_IN - 0.4 - rr * 1.2));
    const y = C.floorY(n) - 1.4 + r() * 2.6;
    moss.add(x, y, 0.05, rr * 0.6, rr * 1.4, 1, col(r.pick(MOSS), 0.85 + r() * 0.3), 0, 0, (r() - 0.5) * 1.2);
  }
  g.add(moss.build(4, 0, -170));

  // emergency glows round the back half of the stairwell: strips on the inner
  // face of each landing ring's hanging lip, and small boxes on the pillars
  const glow = new InstanceSet('silo17-emergency', UNIT.box(), GLOW, { castShadow: false, receiveShadow: false });
  // dim, green, never bright enough to bloom
  const G = col('#5f9a58', 0.9).clone();
  const PILLARS = [1, 2, 3, 4, 5, 6, 7].map((i) => Math.PI + (i / 8) * Math.PI);
  for (let n = 1; n <= 22; n++) {
    const y = C.floorY(n);
    for (let j = 0; j < 3; j++) {
      const th = Math.PI * (1.12 + ((j + 0.5 + (r() - 0.5) * 0.5) / 3) * 0.76);
      const rr = 18.47;
      glow.add(Math.cos(th) * rr, y - 0.93, Math.sin(th) * rr, 0.5, 0.07, 0.03, G, 0, Math.PI / 2 - th, 0);
    }
    for (let j = 0; j < (n % 2 ? 2 : 3); j++) {
      const a = PILLARS[(n * 3 + j * 3) % PILLARS.length];
      const rr = C.R_PILLAR - 0.31;
      glow.add(Math.cos(a) * rr, y + 2.0 + r() * 0.4, Math.sin(a) * rr, 0.07, 0.3, 0.03, G, 0, Math.PI / 2 - a, 0);
    }
  }
  g.add(glow.build(4, 0, -170));
  for (let n = 2; n <= 22; n += 4) pool.add(0, C.floorY(n) + 1.2, -15.5, 0x7fa07a, 7, group);
  return g;
}

// ---------------------------------------------------------------------------
// f. The flooded bottom. Water leaking in up top rains down the stairwell
// into the digger cavern, which is drowned in dark, still water (laid just
// over rooms/deep.js's own lit pool at y -1177.8). Under the stair the pool
// glows: a faint teal bloom on the dark water behind the cut, and a bright
// half-disc of caustics out in front of it. Debris rides the dark water.
// ---------------------------------------------------------------------------
const FLOOD_Y = -1179.1;
const FLOOD_R = 19;
const CAVE_WATER_Y = -1177.62;
const CAVE_R = 74;
const DRIP_TOP = -141;

const NOISE_GLSL = /* glsl */ `
  vec2 h2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(h2(i).x, h2(i + vec2(1.0, 0.0)).x, f.x), mix(h2(i + vec2(0.0, 1.0)).x, h2(i + vec2(1.0, 1.0)).x, f.x), f.y);
  }
`;
const WORLD_VERTEX = /* glsl */ `
  #include <fog_pars_vertex>
  varying vec3 vW;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vW = w.xyz;
    vec4 mvPosition = viewMatrix * w;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;

function flood({ pool, group, dyn, updaters }) {
  // the bright pool, out in front of the cut ----------------------------------
  const mat = new THREE.ShaderMaterial({
    name: 'silo17-flood',
    fog: true,
    uniforms: {
      ...THREE.UniformsUtils.clone(THREE.UniformsLib.fog),
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#7cf9eb') },
      uDeep: { value: new THREE.Color('#34504e') },
      uR: { value: FLOOD_R },
    },
    vertexShader: WORLD_VERTEX,
    fragmentShader: /* glsl */ `
      #include <fog_pars_fragment>
      uniform float uTime, uR;
      uniform vec3 uColor, uDeep;
      varying vec3 vW;
      ${NOISE_GLSL}
      // distance between the two nearest moving cell points: small on cell borders
      float cells(vec2 p, float t) {
        vec2 i = floor(p), f = fract(p);
        float d1 = 9.0, d2 = 9.0;
        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            vec2 g = vec2(float(x), float(y));
            vec2 o = 0.5 + 0.42 * sin(t + 6.2831 * h2(i + g));
            float d = length(g + o - f);
            if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
          }
        }
        return d2 - d1;
      }
      // rings spreading from where the drips land
      float ripples(vec2 p, float t) {
        float s = 0.0;
        for (int i = 0; i < 7; i++) {
          float fi = float(i);
          float period = 2.1 + fi * 0.37;
          float k = floor((t + fi * 1.3) / period);
          float age = fract((t + fi * 1.3) / period);
          vec2 c = (h2(vec2(k, fi * 7.1)) - 0.5) * 2.0 * uR * 0.8;
          c.y = abs(c.y);
          float d = length(p - c);
          s += smoothstep(0.3, 0.0, abs(d - age * 5.0)) * (1.0 - age);
        }
        return s;
      }
      void main() {
        float t = uTime;
        vec2 q = vW.xz;
        vec2 p = q * 0.3;
        float a = cells(p + vec2(t * 0.06, t * 0.035), t * 0.7);
        float b = cells(p * 1.7 - vec2(t * 0.05, -t * 0.03) + 3.1, t * 0.9 + 1.7);
        float c = pow(1.0 - smoothstep(0.0, 0.2, a), 3.0) * 0.8 + pow(1.0 - smoothstep(0.0, 0.16, b), 3.0) * 0.5;
        float rip = ripples(q, t);
        float n = vnoise(q * 0.12 + vec2(t * 0.02, 0.0));
        float r = length(q) / uR;
        float rim = smoothstep(0.93, 0.995, r);
        vec3 col = uDeep * (0.6 + 0.8 * n) + uColor * (0.06 + 0.14 * n + c * 1.4 + rip * 0.4);
        col = mix(col, uColor * 1.2, rim * 0.5);
        gl_FragColor = vec4(col, 1.0);
        #include <fog_fragment>
      }
    `,
  });
  const geo = new THREE.CircleGeometry(FLOOD_R, 48, Math.PI, Math.PI); // the z >= 0 half
  geo.rotateX(-Math.PI / 2);
  const water = new THREE.Mesh(geo, mat);
  water.position.y = FLOOD_Y;
  water.name = 'silo17/flood';
  dyn.add(water);

  // the drowned cavern: dark, still water with a sheen, glowing faintly over
  // the pool under the stair ---------------------------------------------------
  const darkMat = new THREE.ShaderMaterial({
    name: 'silo17-cavewater',
    fog: true,
    uniforms: {
      ...THREE.UniformsUtils.clone(THREE.UniformsLib.fog),
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color('#1e2526') },
      uSheen: { value: new THREE.Color('#353d3f') },
      uGlow: { value: new THREE.Color('#3fe0c8') },
      uR: { value: FLOOD_R },
    },
    vertexShader: WORLD_VERTEX,
    fragmentShader: /* glsl */ `
      #include <fog_pars_fragment>
      uniform float uTime, uR;
      uniform vec3 uDeep, uSheen, uGlow;
      varying vec3 vW;
      ${NOISE_GLSL}
      void main() {
        float t = uTime;
        vec2 p = vW.xz;
        vec3 V = normalize(cameraPosition - vW);
        float fres = pow(1.0 - clamp(V.y, 0.0, 1.0), 3.0);
        float w = vnoise(p * 0.3 + vec2(t * 0.05, t * 0.03)) * 0.6 + vnoise(p * 0.8 - vec2(t * 0.04, -t * 0.06)) * 0.4;
        float glint = smoothstep(0.76, 0.9, w);
        vec3 col = uDeep * (0.8 + 0.4 * w) + uSheen * ((0.15 + fres) * (0.6 + 0.8 * w) + glint * 0.5);
        float g = exp(-dot(p, p) / (uR * uR * 0.6));
        col += uGlow * g * (0.03 + 0.07 * smoothstep(0.5, 0.9, w));
        gl_FragColor = vec4(col, 1.0);
        #include <fog_fragment>
      }
    `,
  });
  const caveGeo = new THREE.CircleGeometry(CAVE_R, 96, 0, Math.PI); // the z <= 0 half
  caveGeo.rotateX(-Math.PI / 2);
  const cave = new THREE.Mesh(caveGeo, darkMat);
  cave.position.y = CAVE_WATER_Y;
  cave.name = 'silo17/caveWater';
  dyn.add(cave);
  // its cut face, over the teal edge of deep.js's pool
  const edge = new THREE.Mesh(
    new THREE.PlaneGeometry(150, CAVE_WATER_Y + 1178.62),
    new THREE.MeshStandardMaterial({ name: 'silo17-cavewater-edge', color: '#161d1f', roughness: 0.4, metalness: 0 })
  );
  edge.position.set(0, (CAVE_WATER_Y - 1178.62) / 2, 0.006);
  edge.name = 'silo17/caveWaterEdge';
  dyn.add(edge);

  // drips falling the length of the stairwell, clear of the central column
  const rd = makeRng(9117);
  const ND = 150, H = DRIP_TOP - FLOOD_Y;
  const seeds = new Float32Array(ND * 3); // x, z, phase
  const pos = new Float32Array(ND * 3);
  for (let i = 0; i < ND; i++) {
    const a = rd() * Math.PI * 2, d = 6.3 + Math.sqrt(rd()) * 8.3;
    seeds[i * 3] = Math.cos(a) * d;
    seeds[i * 3 + 1] = Math.sin(a) * d;
    seeds[i * 3 + 2] = rd();
  }
  const dripGeo = new THREE.BufferGeometry();
  dripGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const drips = new THREE.Points(
    dripGeo,
    new THREE.PointsMaterial({ name: 'silo17-drips', map: TEX.soft, color: '#bfe9f5', size: 0.16, sizeAttenuation: true, transparent: true, opacity: 0.55, depthWrite: false })
  );
  drips.name = 'silo17/drips';
  drips.frustumCulled = false;
  dyn.add(drips);
  const SPEED = 11;
  const placeDrips = (t) => {
    for (let i = 0; i < ND; i++) {
      const u = (t * SPEED) / H + seeds[i * 3 + 2];
      pos[i * 3] = seeds[i * 3];
      pos[i * 3 + 1] = DRIP_TOP - (u - Math.floor(u)) * H;
      pos[i * 3 + 2] = seeds[i * 3 + 1];
    }
    dripGeo.attributes.position.needsUpdate = true;
  };
  placeDrips(0);

  // floating debris: planks and crates riding the dark water
  const r = makeRng(1177);
  const N = 56;
  const D = new Float32Array(N * 8); // x, z, sx, sy, sz, ry, phase, rate
  const debris = new THREE.InstancedMesh(UNIT.box(), new THREE.MeshStandardMaterial({ name: 'silo17-debris', color: '#4a4038', roughness: 0.95, metalness: 0 }), N);
  debris.name = 'silo17/debris';
  const tint = new THREE.Color();
  // keep clear of deep.js's bore rig legs and rafts, of the shallows by the
  // cavern wall (the floor rises past r 64) and of the cut
  const AVOID = [[-8, -22, 10.5], [18, -12, 2.8], [32, -30, 2.5], [-36, -44, 3.1], [12, -46, 2.4]];
  for (let i = 0, tries = 0; i < N; tries++) {
    const a = Math.PI + 0.06 + r() * (Math.PI - 0.12), d = 16 + Math.sqrt(r()) * 44;
    const plank = r() < 0.5;
    const sx = plank ? 1.2 + r() * 1.6 : 0.5 + r() * 0.7;
    const sy = plank ? 0.1 + r() * 0.08 : 0.3 + r() * 0.3;
    const sz = plank ? 0.22 + r() * 0.2 : 0.5 + r() * 0.6;
    const x = Math.cos(a) * d, z = Math.sin(a) * d;
    const ext = Math.hypot(sx, sz) / 2 + 0.45; // footprint plus drift
    if (tries < 4000 && (z > -ext - 0.3 || AVOID.some(([ax, az, ar]) => Math.hypot(x - ax, z - az) < ar + ext))) continue;
    const o = i * 8;
    D[o] = x;
    D[o + 1] = z;
    D[o + 2] = sx;
    D[o + 3] = sy;
    D[o + 4] = sz;
    D[o + 5] = r() * Math.PI * 2;
    D[o + 6] = r() * Math.PI * 2;
    D[o + 7] = 0.6 + r() * 0.7;
    debris.setColorAt(i, tint.setScalar(0.75 + r() * 0.45));
    i++;
  }
  const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3();
  const place = (t) => {
    for (let i = 0; i < N; i++) {
      const o = i * 8, ph = D[o + 6], w = D[o + 7];
      _p.set(D[o] + Math.sin(t * 0.03 + ph) * 0.4, CAVE_WATER_Y + D[o + 3] * 0.2 + Math.sin(t * w + ph) * 0.05, D[o + 1] + Math.cos(t * 0.025 + ph) * 0.4);
      _e.set(Math.sin(t * w * 0.8 + ph) * 0.05, D[o + 5] + Math.sin(t * 0.05 + ph) * 0.1, Math.cos(t * w * 0.7 + ph * 1.3) * 0.04);
      _s.set(D[o + 2], D[o + 3], D[o + 4]);
      debris.setMatrixAt(i, _m.compose(_p, _q.setFromEuler(_e), _s));
    }
    debris.instanceMatrix.needsUpdate = true;
  };
  place(0);
  debris.computeBoundingSphere();
  debris.boundingSphere.radius += 1;
  debris.castShadow = true;
  debris.receiveShadow = true;
  dyn.add(debris);

  updaters.push((dt, t) => {
    mat.uniforms.uTime.value = t;
    darkMat.uniforms.uTime.value = t;
    place(t);
    placeDrips(t);
  });
  // a faint aqua wash from the pool onto the cut frame and the rig's legs
  pool.add(0, FLOOD_Y + 1.5, 4, 0x4fe8d0, 6, group);
}

// ---------------------------------------------------------------------------
// g. A pump let down on a long cable from a davit on the level-19 ring to the
// floor of level 30.
// ---------------------------------------------------------------------------
function pumpLine({ pool, group }) {
  const g = new THREE.Group();
  g.name = 'silo17/pump';
  const k = new Kit('silo17/pumpRig');
  const y19 = C.floorY(19);
  const drop = [-3, y19 - 1.2, -12]; // where the cable hangs free
  const a = Math.atan2(drop[2], drop[0]);
  const ca = Math.cos(a), sa = Math.sin(a);
  // davit: post on the ring, arm out over the stairwell, sheave at the tip
  const px = ca * 16.4, pz = sa * 16.4, armY = y19 + 2.3;
  const wr = 0.2, wx = drop[0] + ca * wr, wz = drop[2] + sa * wr, wy = y19 + 2.0;
  const dark = '#3b3e3d';
  k.box('metal', px, y19 + 0.03, pz, 0.7, 0.06, 0.7, '#2d2f2f');
  k.cyl('metal', px, y19, pz, 0.09, armY - y19 + 0.1, dark, 8);
  k.rod('metal', [px, armY, pz], [wx, armY, wz], 0.07, dark, 6);
  k.rod('metal', [px, y19 + 1.3, pz], [lerp(px, wx, 0.45), armY, lerp(pz, wz, 0.45)], 0.04, dark, 5);
  k.rod('metal', [wx, armY, wz], [wx, wy, wz], 0.025, '#2d2f2f', 4);
  k.geo('metal', UNIT.torus(0.25, 6, 16), wx, wy, wz, '#4a4c4d', wr, wr, wr, 0, -a, 0);
  // hand winch behind the post; the cable runs back to it over the sheave
  const hx = ca * 17.3 - sa * 0.55, hz = sa * 17.3 + ca * 0.55; // beside the post, clear of it
  const tx = -sa * 0.3, tz = ca * 0.3;
  k.rod('wood', [hx - tx, y19 + 0.5, hz - tz], [hx + tx, y19 + 0.5, hz + tz], 0.18, '#6b5238', 12);
  for (const s of [-1, 1]) k.box('metal', hx + s * tx * 1.15, y19 + 0.3, hz + s * tz * 1.15, 0.05, 0.6, 0.5, '#2d2f2f', -a + Math.PI / 2);
  k.rod('matte', [wx + ca * wr, wy, wz + sa * wr], [hx, y19 + 0.68, hz], 0.028, '#1f2122', 5);

  // the pump standing on the floor of level 30
  const [bx, by, bz] = [-11, -227, -19];
  const fy = C.floorY(30);
  const body = '#4d5b53';
  k.box('metal', bx, fy + 0.06, bz, 1.5, 0.12, 1.1, '#2d2f2f');
  k.cyl('metal', bx, fy + 0.12, bz, 0.42, 1.36, body, 16);
  for (const h of [0.3, 1.2]) k.geo('metal', UNIT.torus(0.12, 5, 20), bx, fy + 0.12 + h, bz, '#3a4640', 0.44, 0.44, 0.44, Math.PI / 2, 0, 0);
  k.cylR('metal', bx, fy + 1.76, bz, 0.28, 0.9, '#3a3f3d', 0, 0, Math.PI / 2, 14); // motor on top
  k.geo('metal', UNIT.torus(0.25, 5, 14), bx, fy + 2.18, bz, '#2d2f2f', 0.14, 0.14, 0.14, 0, Math.PI / 2, 0); // lifting eye
  k.sphere('glow', bx, by + 0.1, bz + 0.43, 0.07, col('#ffb070', 4.5), 10, 8);
  // outlet hose snaking off to a floor drain
  polyline(k, [[bx + 0.42, fy + 0.4, bz], [bx + 0.9, fy + 0.1, bz - 0.4], [bx + 1.3, fy + 0.08, bz - 2.4], [bx + 0.8, fy + 0.08, bz - 4.8], [bx + 1.1, fy + 0.08, bz - 6.2]], 0.07, '#2a2c2b', 'metal');
  k.box('metal', bx + 1.1, fy + 0.01, bz - 6.5, 0.8, 0.02, 0.8, '#1f2020');
  pool.add(bx, by + 0.6, bz + 0.9, 0xffb070, 8, group);
  g.add(k.finish(mats()));

  // the cable, a gentle curve down the stairwell that stays inside the landing
  // rings until it clears the ring of level 29
  const curve = new THREE.CatmullRomCurve3(
    [
      [drop[0], wy - 0.02, drop[2]],
      drop,
      [-3.5, -165, -12.1],
      [-4.6, -185, -12.3],
      [-5.9, -205, -12.4],
      [-7.0, -219.6, -12.2],
      [-7.4, -221.8, -12.7],
      [-8.4, -223.7, -14.3],
      [-9.9, -224.6, -16.9],
      [-10.7, -224.9, -18.5],
      [bx, fy + 2.3, bz],
    ].map((p) => new THREE.Vector3(...p)),
    false,
    'centripetal'
  );
  const cable = new THREE.Mesh(new THREE.TubeGeometry(curve, 260, 0.045, 6, false), new THREE.MeshStandardMaterial({ name: 'silo17-cable', color: '#1f2122', roughness: 0.6, metalness: 0.3 }));
  cable.name = 'silo17/pumpCable';
  cable.castShadow = true;
  g.add(cable);
  return g;
}

// ---------------------------------------------------------------------------
// h. Remains on the surface around silo 17's hood and along the way to 18.
// ---------------------------------------------------------------------------
function skeletonGeometry() {
  const k = new Kit('skeleton');
  const B = '#ffffff', D = '#4a4238';
  // lying on its back along +x (head at +x), ground at y = 0
  k.geo('bone', UNIT.sphere(9, 6), 0.8, 0.1, 0, B, 0.12, 0.1, 0.1);
  k.geo('bone', UNIT.sphere(6, 4), 0.9, 0.08, 0, B, 0.06, 0.05, 0.07);
  k.box('bone', 0.9, 0.03, 0, 0.1, 0.03, 0.09, B);
  for (const s of [-1, 1]) k.sphere('bone', 0.86, 0.165, s * 0.037, 0.026, D, 5, 3);
  k.sphere('bone', 0.925, 0.13, 0, 0.012, D, 4, 3);
  // spine and a collapsed rib cage
  for (let i = 0; i < 12; i++) k.box('bone', 0.66 - i * 0.058, 0.04, 0, 0.04, 0.04, 0.05, B);
  for (const [x, w, h] of [
    [0.6, 0.1, 0.09],
    [0.55, 0.13, 0.1],
    [0.5, 0.145, 0.105],
    [0.45, 0.15, 0.1],
    [0.4, 0.145, 0.095],
    [0.35, 0.135, 0.085],
    [0.3, 0.115, 0.07],
  ]) k.geo('bone', UNIT.torus(0.12, 3, 10), x, h * 0.85, 0, B, w, h * 0.85, 0.12, 0, Math.PI / 2, 0);
  k.box('bone', 0.47, 0.165, 0, 0.2, 0.02, 0.04, B);
  for (const s of [-1, 1]) {
    k.rod('bone', [0.64, 0.12, s * 0.02], [0.63, 0.06, s * 0.17], 0.012, B, 4);
    k.box('bone', 0.56, 0.02, s * 0.12, 0.14, 0.015, 0.1, B);
  }
  // pelvis
  k.geo('bone', UNIT.torus(0.3, 4, 9), 0.08, 0.07, 0, B, 0.13, 0.08, 0.1, 0, Math.PI / 2, 0);
  k.box('bone', 0.13, 0.03, 0, 0.08, 0.03, 0.06, B);
  // arms: one along the side, one folded over the belly
  k.rod('bone', [0.6, 0.05, 0.18], [0.32, 0.04, 0.24], 0.02, B, 4);
  k.rod('bone', [0.31, 0.04, 0.245], [0.07, 0.035, 0.27], 0.013, B, 4);
  k.rod('bone', [0.31, 0.03, 0.23], [0.07, 0.03, 0.255], 0.012, B, 4);
  k.box('bone', 0.0, 0.02, 0.27, 0.09, 0.015, 0.07, B);
  for (let f = 0; f < 4; f++) k.rod('bone', [-0.04, 0.02, 0.245 + f * 0.017], [-0.11, 0.015, 0.24 + f * 0.022], 0.006, B, 3);
  k.rod('bone', [0.6, 0.05, -0.18], [0.33, 0.04, -0.25], 0.02, B, 4);
  k.rod('bone', [0.32, 0.05, -0.25], [0.22, 0.12, -0.04], 0.013, B, 4);
  k.rod('bone', [0.32, 0.04, -0.23], [0.21, 0.11, -0.05], 0.012, B, 4);
  k.box('bone', 0.2, 0.13, 0.02, 0.08, 0.015, 0.07, B, 0.4);
  // legs
  for (const s of [-1, 1]) {
    const kz = s * (s > 0 ? 0.14 : 0.11);
    k.rod('bone', [0.05, 0.05, s * 0.09], [-0.36, 0.05, kz], 0.024, B, 4);
    k.sphere('bone', -0.37, 0.08, kz, 0.025, B, 5, 3);
    k.rod('bone', [-0.38, 0.045, kz], [-0.77, 0.04, kz + s * 0.03], 0.018, B, 4);
    k.rod('bone', [-0.38, 0.03, kz + s * 0.03], [-0.76, 0.03, kz + s * 0.05], 0.01, B, 4);
    k.box('bone', -0.82, 0.07, kz + s * 0.07, 0.05, 0.16, 0.08, B, 0, s * 0.9);
  }
  return k.batch('bone').build();
}

function remains() {
  const r = makeRng(1740);
  const s17 = SILOS.find((s) => s.id === 17) || { x: C.SILO17_POS[0], z: C.SILO17_POS[1] };
  // the hood sits 58 m from the silo's axis, its door facing silo 18 (as in surface.js)
  const face = Math.atan2(-s17.z, -s17.x);
  const ux = Math.cos(face), uz = Math.sin(face);
  const vx = -uz, vz = ux;
  const hx = s17.x + ux * 58, hz = s17.z + uz * 58;
  const spots = [];
  const ok = (x, z) => {
    if (x < -290 || x > -27 || z < -300 || z > -6) return false;
    const lx = (x - hx) * ux + (z - hz) * uz, lz = (x - hx) * vx + (z - hz) * vz;
    if (lx > -11.5 && lx < 1.2 && Math.abs(lz) < 4.2) return false; // the hood itself
    if (Math.hypot(x + 216.6, z + 216.6) < 3) return false; // the flag pole
    if (x > -37 && z > -8) return false; // silo 18's hood
    return spots.every(([sx, sz]) => Math.hypot(sx - x, sz - z) > 1.6);
  };
  let guard = 0;
  // a cluster before 17's door…
  while (spots.length < 16 && guard++ < 600) {
    const lx = 1.5 + Math.pow(r(), 1.4) * 16, lz = (r() - 0.5) * 20;
    const x = hx + ux * lx + vx * lz, z = hz + uz * lx + vz * lz;
    if (ok(x, z)) spots.push([x, z]);
  }
  // …and a thinning trail towards silo 18
  const ex = -34, ez = -12;
  const L = Math.hypot(ex - hx, ez - hz), tx = (ex - hx) / L, tz = (ez - hz) / L;
  while (spots.length < 40 && guard++ < 2400) {
    const t = Math.pow(r(), 1.3);
    const off = (r() - 0.5) * 2 * (8 + t * 30);
    const x = lerp(hx, ex, t) - tz * off, z = lerp(hz, ez, t) + tx * off;
    if (ok(x, z)) spots.push([x, z]);
  }

  const mat = new THREE.MeshStandardMaterial({ name: 'silo17-bone', color: '#d8d2c0', vertexColors: true, roughness: 0.82, metalness: 0 });
  const im = new THREE.InstancedMesh(skeletonGeometry(), mat, spots.length);
  im.name = 'silo17/remains';
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), qy = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0), n = new THREE.Vector3(), p = new THREE.Vector3(), s = new THREE.Vector3(), c = new THREE.Color();
  spots.forEach(([x, z], i) => {
    const h = terrainY(x, z);
    // lie flat on the local slope
    n.set(terrainY(x - 0.8, z) - terrainY(x + 0.8, z), 1.6, terrainY(x, z - 0.8) - terrainY(x, z + 0.8)).normalize();
    q.setFromUnitVectors(up, n).multiply(qy.setFromAxisAngle(up, r() * Math.PI * 2));
    const sc = 0.9 + r() * 0.15;
    im.setMatrixAt(i, m.compose(p.set(x, h + 0.04, z), q, s.set(sc, sc, sc)));
    im.setColorAt(i, c.setScalar(0.8 + r() * 0.25));
  });
  im.instanceMatrix.needsUpdate = true;
  im.computeBoundingSphere();
  im.castShadow = true;
  im.receiveShadow = true;
  return im;
}
