import * as THREE from 'three';
import { Batch, Kit, UNIT, col, extrude, archShape, roundRectShape } from '../core/geom.js';
import { MATS, signMaterial, screenMaterial } from '../core/materials.js';
import { SignAtlas, toTexture, surfaceViewCanvas } from '../core/textures.js';
import * as C from '../core/constants.js';

// ---------------------------------------------------------------------------
// Shared building blocks for the named rooms.
// ---------------------------------------------------------------------------

export const roomMats = () => ({
  matte: MATS.matte,
  metal: MATS.metal,
  wood: MATS.wood,
  fabric: MATS.fabric,
  glass: MATS.glass,
  glow: MATS.glow,
  foliage: MATS.foliage,
  water: MATS.water,
  concrete: MATS.concrete,
  trim: MATS.trim,
  rock: MATS.rock,
});

export const SECTION = '#a39d91';

/** One sign atlas per zone; signs are quads that sample it. */
export class Signs {
  constructor(name, emissive = 0.55) {
    this.name = name;
    this.atlas = new SignAtlas(2048, 2048);
    this.batch = new Batch();
    this.emissive = emissive;
  }

  make(text, opts) {
    return this.atlas.add(text, opts);
  }

  custom(w, h, draw) {
    return this.atlas.custom(w, h, draw);
  }

  /** Place a sign centred on (x,y,z), `h` tall, facing +z rotated by ry. */
  place(e, x, y, z, h, ry = 0, rx = 0) {
    const w = h * e.aspect;
    const m = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, 0, 'YXZ')),
      new THREE.Vector3(1, 1, 1)
    );
    const n = new THREE.Vector3(0, 0, 1).transformDirection(m);
    const white = new THREE.Color(1, 1, 1);
    const P = (dx, dy) => new THREE.Vector3(dx, dy, 0).applyMatrix4(m);
    const a = P(-w / 2, -h / 2), b = P(w / 2, -h / 2), c = P(w / 2, h / 2), d = P(-w / 2, h / 2);
    const ia = this.batch.vert(a.x, a.y, a.z, n.x, n.y, n.z, e.U0, e.V0, white);
    const ib = this.batch.vert(b.x, b.y, b.z, n.x, n.y, n.z, e.U1, e.V0, white);
    const ic = this.batch.vert(c.x, c.y, c.z, n.x, n.y, n.z, e.U1, e.V1, white);
    const id = this.batch.vert(d.x, d.y, d.z, n.x, n.y, n.z, e.U0, e.V1, white);
    this.batch.tri(ia, ib, ic);
    this.batch.tri(ia, ic, id);
    return w;
  }

  mesh() {
    if (this.batch.empty) return new THREE.Group();
    const m = new THREE.Mesh(this.batch.build(), signMaterial(this.atlas.texture(), this.emissive));
    m.name = `${this.name}/signs`;
    m.material.polygonOffset = true;
    m.material.polygonOffsetFactor = -2;
    m.receiveShadow = true;
    return m;
  }
}

/** A textured screen (wallscreen, monitor bank). Returns the mesh. */
export function screen(tex, x, y, z, w, h, ry = 0, intensity = 1.5, name = 'screen') {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), screenMaterial(tex, intensity));
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.name = name;
  return m;
}

let _viewTex = null;
export function surfaceViewTexture() {
  _viewTex ||= toTexture(surfaceViewCanvas(1024, 256), { repeat: false });
  return _viewTex;
}

// ---------------------------------------------------------------------------
// Props. Each takes the kit and a local frame (x, y, z, ry) and builds in
// local coordinates: +x right, +y up, -z back (away from the viewer).
// ---------------------------------------------------------------------------
export const P = {
  table(k, x, y, z, ry = 0, { w = 1.8, d = 0.9, h = 0.75, top = '#8a7e6a', leg = '#393b3a', mat = 'matte' } = {}) {
    k.push(x, y, z, ry);
    k.box(mat, 0, h - 0.03, 0, w, 0.06, d, top);
    const lx = w / 2 - 0.08, lz = d / 2 - 0.08;
    for (const [a, b] of [[-lx, -lz], [lx, -lz], [-lx, lz], [lx, lz]]) k.box('metal', a, (h - 0.06) / 2, b, 0.05, h - 0.06, 0.05, leg);
    k.pop();
  },

  roundTable(k, x, y, z, { r = 0.6, h = 0.75, top = '#8a7e6a', leg = '#393b3a', mat = 'matte' } = {}) {
    k.cyl(mat, x, y + h - 0.05, z, r, 0.05, top, 16);
    k.cyl('metal', x, y, z, 0.05, h - 0.05, leg, 6);
    k.cyl('metal', x, y, z, r * 0.45, 0.04, leg, 10);
  },

  chair(k, x, y, z, ry = 0, { color = '#3b3f3e', mat = 'matte', h = 0.45 } = {}) {
    k.push(x, y, z, ry);
    k.box(mat, 0, h, 0, 0.44, 0.05, 0.42, color);
    k.box(mat, 0, h + 0.3, -0.19, 0.44, 0.5, 0.05, color);
    for (const [a, b] of [[-0.19, -0.18], [0.19, -0.18], [-0.19, 0.18], [0.19, 0.18]]) k.box('metal', a, h / 2, b, 0.035, h, 0.035, '#2a2c2d');
    k.pop();
  },

  stool(k, x, y, z, { color = '#6a4b32', h = 0.5, r = 0.2 } = {}) {
    k.cyl('matte', x, y + h - 0.05, z, r, 0.05, color, 10);
    k.cyl('metal', x, y, z, 0.03, h - 0.05, '#2a2c2d', 5);
  },

  /** Desk with a boxy CRT terminal and keyboard. */
  crtDesk(k, x, y, z, ry = 0, { desk = '#5c5f5b', body = '#cfc8b4', screen = '#86e39a', w = 1.5, d = 0.75, power = 2.2, chair = true } = {}) {
    k.push(x, y, z, ry);
    k.box('matte', 0, 0.73, 0, w, 0.05, d, desk);
    k.box('matte', -w / 2 + 0.05, 0.36, 0, 0.05, 0.72, d - 0.05, desk);
    k.box('matte', w / 2 - 0.05, 0.36, 0, 0.05, 0.72, d - 0.05, desk);
    k.box('matte', 0, 0.99, -0.12, 0.46, 0.42, 0.44, body);
    k.box('matte', 0, 0.96, -0.36, 0.34, 0.3, 0.2, body);
    k.box('glow', 0, 1.0, 0.105, 0.34, 0.26, 0.01, col(screen, power));
    k.box('matte', 0, 0.77, 0.22, 0.42, 0.03, 0.15, '#bdb6a2');
    k.pop();
    if (chair) P.chair(k, x + Math.sin(ry) * 0.75, y, z + Math.cos(ry) * 0.75, ry + Math.PI, { color: '#34383a' });
  },

  cabinet(k, x, y, z, ry = 0, { w = 0.6, h = 1.3, d = 0.6, color = '#6b6f6a', drawers = 3 } = {}) {
    k.push(x, y, z, ry);
    k.box('metal', 0, h / 2, 0, w, h, d, color);
    for (let i = 0; i < drawers; i++) {
      const yy = (h / drawers) * (i + 0.5);
      k.box('metal', 0, yy, d / 2 + 0.01, w * 0.86, h / drawers - 0.06, 0.02, col(color, 1.08));
      k.box('metal', 0, yy + 0.08, d / 2 + 0.03, w * 0.3, 0.03, 0.03, '#cfcfc8');
    }
    k.pop();
  },

  locker(k, x, y, z, ry = 0, { w = 0.55, h = 1.8, d = 0.5, color = '#56706c' } = {}) {
    k.push(x, y, z, ry);
    k.box('metal', 0, h / 2, 0, w, h, d, color);
    for (let i = 0; i < 4; i++) k.box('metal', 0, h - 0.15 - i * 0.05, d / 2 + 0.005, w * 0.6, 0.02, 0.01, '#2e3a38');
    k.box('metal', w * 0.3, h * 0.55, d / 2 + 0.02, 0.04, 0.12, 0.03, '#c9c9c0');
    k.pop();
  },

  bed(k, x, y, z, ry = 0, { blanket = '#b9c2bd', frame = '#5b605c', w = 1.0, l = 2.0, iron = false } = {}) {
    k.push(x, y, z, ry);
    k.box(iron ? 'metal' : 'matte', 0, 0.3, 0, w, 0.12, l, frame);
    k.box('fabric', 0, 0.44, 0, w - 0.06, 0.16, l - 0.06, '#e9e6de');
    k.box('fabric', 0, 0.53, 0.2, w - 0.02, 0.05, l * 0.62, blanket);
    k.box('fabric', 0, 0.56, -l / 2 + 0.3, w * 0.7, 0.1, 0.34, '#f4f2ec');
    for (const [a, b] of [[-w / 2 + 0.04, -l / 2 + 0.04], [w / 2 - 0.04, -l / 2 + 0.04], [-w / 2 + 0.04, l / 2 - 0.04], [w / 2 - 0.04, l / 2 - 0.04]]) {
      k.box('metal', a, 0.15, b, 0.05, 0.3, 0.05, '#2d2f2f');
    }
    if (iron) {
      k.box('metal', 0, 0.7, -l / 2, w, 0.05, 0.05, frame);
      k.box('metal', -w / 2, 0.45, -l / 2, 0.05, 0.6, 0.05, frame);
      k.box('metal', w / 2, 0.45, -l / 2, 0.05, 0.6, 0.05, frame);
    }
    k.pop();
  },

  /** Hanging lamp: cord, shade, glowing bulb. */
  pendant(k, x, yCeil, z, { drop = 1.2, color = '#fff0d2', power = 5, shade = '#2e3130', r = 0.28 } = {}) {
    k.cyl('metal', x, yCeil - drop, z, 0.012, drop, '#1e1f20', 4);
    k.geo('metal', UNIT.cone(12), x, yCeil - drop - 0.08, z, shade, r, 0.26, r, Math.PI, 0, 0);
    k.sphere('glow', x, yCeil - drop - 0.2, z, 0.1, col(color, power), 8, 6);
  },

  /** Tall glowing lamp standard (cafeteria style). */
  floorLamp(k, x, y, z, { h = 2.6, r = 0.22, color = '#fff4de', power = 6 } = {}) {
    k.cyl('metal', x, y, z, 0.18, 0.08, '#2d2f2f', 10);
    k.cyl('glow', x, y + 0.5, z, r, h - 0.5, col(color, power), 12);
    k.cyl('metal', x, y + h, z, r + 0.03, 0.06, '#2d2f2f', 12);
  },

  sconce(k, x, y, z, ry = 0, { color = '#ffdcae', power = 5 } = {}) {
    k.push(x, y, z, ry);
    k.box('metal', 0, 0, 0.05, 0.22, 0.34, 0.1, '#6d5a3a');
    k.geo('glow', UNIT.cyl(10), 0, 0.05, 0.16, col(color, power), 0.09, 0.22, 0.09);
    k.pop();
  },

  panelLight(k, x, y, z, w = 1.4, d = 0.5, { color = '#f4f2ea', power = 2.8 } = {}) {
    k.box('metal', x, y + 0.03, z, w + 0.1, 0.06, d + 0.1, '#58595a');
    k.box('glow', x, y - 0.01, z, w, 0.02, d, col(color, power));
  },

  tube(k, x, y, z, len, ry = 0, { color = '#eef6ff', power = 3.2 } = {}) {
    k.push(x, y, z, ry);
    k.box('metal', 0, 0.06, 0, len + 0.1, 0.06, 0.2, '#58595a');
    k.cylR('glow', 0, 0, 0, 0.045, len, col(color, power), 0, 0, Math.PI / 2, 8);
    k.pop();
  },

  crate(k, x, y, z, s = 0.7, color = '#8b6a43', ry = 0) {
    k.box('matte', x, y + s / 2, z, s, s, s, color, ry);
    k.box('matte', x, y + s / 2, z, s + 0.02, s * 0.16, s + 0.02, col(color, 0.8), ry);
  },

  barrel(k, x, y, z, { r = 0.36, h = 0.95, color = '#5a6468', mat = 'metal' } = {}) {
    k.cyl(mat, x, y, z, r, h, color, 14);
    k.geo(mat, UNIT.torus(0.06, 5, 16), x, y + h * 0.28, z, col(color, 0.8), r, r, r, Math.PI / 2, 0, 0);
    k.geo(mat, UNIT.torus(0.06, 5, 16), x, y + h * 0.72, z, col(color, 0.8), r, r, r, Math.PI / 2, 0, 0);
  },

  sack(k, x, y, z, s = 0.45, color = '#b59a6a') {
    k.geo('fabric', UNIT.sphere(10, 7), x, y + s * 0.55, z, color, s * 0.8, s * 0.6, s * 0.65);
  },

  plant(k, x, y, z, s = 0.5, { pot = '#8a5a3c', leaf = '#4d8f46' } = {}) {
    k.cyl('matte', x, y, z, s * 0.45, s * 0.6, pot, 10, 1.2);
    k.ico('foliage', x, y + s * 0.85, z, s * 0.55, leaf, 0, 0.9, x + z);
  },

  tree(k, x, y, z, { h = 2.6, r = 1.2, trunk = '#6a4a30', leaf = '#4f9a48', fruit = null, seed = 1 } = {}) {
    k.cyl('matte', x, y, z, 0.12, h * 0.6, trunk, 6, 0.7);
    const L = [
      [0, h * 0.72, 0, 1],
      [r * 0.45, h * 0.62, r * 0.2, 0.7],
      [-r * 0.4, h * 0.66, -r * 0.25, 0.72],
      [r * 0.1, h * 0.86, -r * 0.3, 0.62],
    ];
    L.forEach(([a, b, c, s], i) => k.ico('foliage', x + a, y + b, z + c, r * s, col(leaf, 0.9 + ((seed + i) % 3) * 0.08), 1, 0.85, seed + i));
    if (fruit) {
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2 + seed;
        k.ico('matte', x + Math.cos(a) * r * 0.85, y + h * 0.6 + (i % 3) * 0.3, z + Math.sin(a) * r * 0.85, 0.09, fruit, 0);
      }
    }
  },

  /** Generic figure in a hooded white work suit. */
  figure(k, x, y, z, ry = 0, { suit = '#e7e4db', visor = '#2b3336', trim = '#b9b4a6' } = {}) {
    k.push(x, y, z, ry);
    for (const s of [-1, 1]) {
      k.cyl('fabric', s * 0.13, 0, 0, 0.11, 0.86, suit, 10);
      k.box('fabric', s * 0.13, 0.05, 0.04, 0.18, 0.1, 0.3, trim);
      k.geo('fabric', UNIT.cyl(10), s * 0.36, 1.2, 0, suit, 0.085, 0.62, 0.085, 0, 0, s * 0.12);
      k.sphere('fabric', s * 0.4, 0.88, 0.02, 0.09, trim, 8, 6);
    }
    k.geo('fabric', UNIT.cyl(14), 0, 1.22, 0, suit, 0.27, 0.72, 0.2);
    k.sphere('fabric', 0, 1.58, 0, 0.27, suit, 14, 10, 0.7);
    k.box('fabric', 0, 1.25, -0.24, 0.34, 0.46, 0.14, trim);
    k.sphere('fabric', 0, 1.86, 0, 0.21, suit, 14, 10);
    k.geo('glass', UNIT.sphere(12, 8), 0, 1.87, 0.08, col(visor), 0.17, 0.12, 0.13);
    k.geo('matte', UNIT.sphere(12, 8), 0, 1.87, 0.1, col(visor), 0.15, 0.1, 0.1);
    k.pop();
  },

  /** Round pressure door (vault style), facing +x in local space. */
  roundDoor(k, x, y, z, ry = 0, { r = 1.65, color = '#23272a' } = {}) {
    k.push(x, y, z, ry);
    k.geo('metal', UNIT.torus(0.14, 8, 32), 0, 0, 0, '#3a3f42', r + 0.1, r + 0.1, r + 0.1, 0, Math.PI / 2, 0);
    k.geo('metal', UNIT.cyl(32), 0, 0, 0, color, r, 0.3, r, 0, 0, Math.PI / 2);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      k.geo('metal', UNIT.box(), 0.18, Math.sin(a) * r * 0.5, Math.cos(a) * r * 0.5, '#4d5357', 0.08, 0.12, r * 0.95, a, 0, 0);
    }
    k.geo('metal', UNIT.cyl(16), 0.22, 0, 0, '#62686b', 0.32, 0.1, 0.32, 0, 0, Math.PI / 2);
    k.pop();
  },

  /** Straight run of railing between points at height h. */
  railing(k, pts, h = 1.0, { color = '#2a2c2e', posts = 1.2, r = 0.03 } = {}) {
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      k.rod('metal', [a[0], a[1] + h, a[2]], [b[0], b[1] + h, b[2]], r, color, 5);
      k.rod('metal', [a[0], a[1] + h * 0.5, a[2]], [b[0], b[1] + h * 0.5, b[2]], r * 0.7, color, 4);
      const len = Math.hypot(b[0] - a[0], b[2] - a[2]);
      const n = Math.max(1, Math.round(len / posts));
      for (let j = 0; j <= n; j++) {
        const t = j / n;
        const px = a[0] + (b[0] - a[0]) * t, py = a[1] + (b[1] - a[1]) * t, pz = a[2] + (b[2] - a[2]) * t;
        k.rod('metal', [px, py, pz], [px, py + h, pz], r * 0.8, color, 4);
      }
    }
  },

  /** Shelf unit with random boxes/tins. */
  shelf(k, x, y, z, ry = 0, { w = 1.6, h = 2.2, d = 0.5, levels = 4, color = '#4d4f4e', items = null, rng = Math.random, fill = 0.8, palette = ['#b5372e', '#4f8a4a', '#d8b04a', '#3e6a8a', '#c9c3b2'] } = {}) {
    k.push(x, y, z, ry);
    for (const s of [-1, 1]) k.box('metal', s * (w / 2), h / 2, 0, 0.05, h, d, color);
    for (let i = 0; i < levels; i++) {
      const yy = 0.12 + (i * (h - 0.2)) / (levels - 1 || 1);
      k.box('metal', 0, yy, 0, w, 0.04, d, color);
      if (i === levels - 1 && levels > 1) continue;
      let cx = -w / 2 + 0.06;
      while (cx < w / 2 - 0.1) {
        const bw = 0.12 + rng() * 0.22;
        if (rng() < fill) {
          const bh = 0.12 + rng() * 0.28;
          const c = items ? items(rng) : palette[Math.floor(rng() * palette.length)];
          k.box('matte', cx + bw / 2, yy + 0.02 + bh / 2, (rng() - 0.5) * 0.1, bw * 0.9, bh, d * (0.5 + rng() * 0.4), c);
        }
        cx += bw + 0.02;
      }
    }
    k.pop();
  },

  /** Arched doorway frame (no leaf) set into a wall facing +z. */
  archFrame(k, x, y, z, ry = 0, { w = 1.4, h = 2.4, color = '#d8d4c8', depth = 0.35, t = 0.14 } = {}) {
    const s = new THREE.Shape();
    const outer = archShape(w + t * 2, h + t);
    s.curves = outer.curves;
    s.holes.push(archShape(w, h));
    k.geo('matte', extrude(s, depth, false, 12), x, y, z - depth / 2, color, 1, 1, 1, 0, ry, 0);
  },

  archDoor(k, x, y, z, ry = 0, { w = 1.1, h = 2.2, color = '#3a3d3c', frame = '#cfc9bc' } = {}) {
    const s = new THREE.Shape();
    const outer = archShape(w + 0.24, h + 0.12);
    s.curves = outer.curves;
    s.holes.push(archShape(w, h));
    k.geo('matte', extrude(s, 0.1, false, 10), x, y, z, frame, 1, 1, 1, 0, ry, 0);
    k.geo('matte', extrude(archShape(w, h), 0.05, false, 10), x, y, z + 0.01, color, 1, 1, 1, 0, ry, 0);
  },

  roundRect(k, mat, x, y, z, w, h, r, depth, color, ry = 0) {
    k.geo(mat, extrude(roundRectShape(w, h, r), depth, false, 8), x, y, z, color, 1, 1, 1, 0, ry, 0);
  },
};

// ---------------------------------------------------------------------------
// Room shells
// ---------------------------------------------------------------------------

/**
 * Walls for a room on one side of a level. Coordinates are world space; `s`
 * is the side sign. x0/x1 are unsigned distances from the axis.
 */
export function shell(k, { s, y0, x0 = 26, x1 = 75, back = 13, h = C.ROOM_H, wall = '#8f8a7e', floor = null, ceiling = null, door = [-1.2, -4.4], wainscot = null, innerWall = true, backWall = true }) {
  const X = (x) => s * x;
  const xOut = Math.sqrt(Math.max(0, C.R_IN * C.R_IN - back * back));
  const xEnd = Math.min(x1, xOut + 0.2);
  if (backWall) {
    k.bb('matte', X(x0), y0, -back - 0.3, X(xEnd), y0 + h, -back, wall);
    if (wainscot) k.bb('matte', X(x0 + 0.3), y0, -back + 0.02, X(xEnd), y0 + 1.1, -back + 0.06, wainscot);
  }
  if (innerWall) {
    // wall facing the landing, with a doorway
    const [dz0, dz1] = door;
    k.bb('matte', X(x0 - 0.3), y0, dz1, X(x0), y0 + h, -back - 0.3, wall);
    k.bb('matte', X(x0 - 0.3), y0 + 2.6, dz0, X(x0), y0 + h, dz1, wall);
    k.bb('matte', X(x0 - 0.3), y0, dz0, X(x0), y0 + h, 0, wall);
    k.bb('matte', X(x0 - 0.32), y0, -0.05, X(x0 + 0.02), y0 + h, 0, SECTION);
    if (wainscot) k.bb('matte', X(x0 + 0.02), y0, dz1, X(x0 + 0.05), y0 + 1.1, -back, wainscot);
  }
  if (floor) k.bb('matte', X(x0), y0, -back, X(xEnd), y0 + 0.02, 0, floor);
  if (ceiling) k.bb('matte', X(x0), y0 + h - 0.12, -back, X(xEnd), y0 + h, 0, ceiling);
  return { X, xEnd };
}

export function addPick(list, place, box) {
  list.push({ id: place, ...box });
}
