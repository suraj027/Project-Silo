import * as THREE from 'three';
import { Kit, UNIT, col, extrude, roundRectShape, archShape } from '../core/geom.js';
import { toTexture, monitorBankCanvas, surfaceViewCanvas } from '../core/textures.js';
import { makeRng } from '../core/rng.js';
import * as C from '../core/constants.js';
import { P, Signs, screen, roomMats, SECTION } from './common.js';

// ---------------------------------------------------------------------------
// Up Top: levels 1–49.
// ---------------------------------------------------------------------------

export function buildTop({ pool }) {
  const group = new THREE.Group();
  group.name = 'rooms/top';
  const signs = new Signs('top');
  const parts = [cafeteria, sheriff, judicial, it, watcher];
  for (const make of parts) group.add(make({ pool, signs }));
  group.add(signs.mesh());
  return group;
}

// ---------------------------------------------------------------------------
// Local helpers (common.js is shared and read-only).
// ---------------------------------------------------------------------------
const R_LINE = 74.7;

/** Thin floor finish so named rooms don't show the generic slab tiles. */
function pad(k, x0, x1, z0, z1, y, color, t = 0.03) {
  k.bb('matte', x0, y, z0, x1, y + t, z1, color);
}

/** Floor finish from xIn out to the shell, in strips that follow the curve. */
function floorArc(k, s, xIn, zA, zB, y, color, { step = 3, R = 74.9, t = 0.03 } = {}) {
  const n = Math.max(1, Math.ceil(Math.abs(zB - zA) / step));
  for (let i = 0; i < n; i++) {
    const za = zA + ((zB - zA) * i) / n, zb = zA + ((zB - zA) * (i + 1)) / n;
    const zs = Math.min(Math.abs(za), Math.abs(zb));
    const xo = Math.sqrt(R * R - zs * zs);
    if (xo <= xIn) continue;
    k.bb('matte', s * xIn, y, za, s * xo, y + t, zb, color);
  }
}

/** Flat panels lining the inner face of the shell between two depths. */
function lining(k, s, y0, zA, zB, { h = C.ROOM_H, color = '#8d8b85', seam = null, step = 2.4, R = R_LINE } = {}) {
  const n = Math.max(1, Math.ceil(Math.abs(zB - zA) / step));
  for (let i = 0; i < n; i++) {
    const za = zA + ((zB - zA) * i) / n, zb = zA + ((zB - zA) * (i + 1)) / n;
    const xa = s * Math.sqrt(R * R - za * za), xb = s * Math.sqrt(R * R - zb * zb);
    const dx = xb - xa, dz = zb - za, len = Math.hypot(dx, dz);
    k.box('matte', (xa + xb) / 2, y0 + h / 2, (za + zb) / 2, len + 0.04, h, 0.2, color, Math.atan2(-dz, dx));
    if (seam && i > 0) {
      const f = (R - 0.11) / R;
      k.box('matte', xa * f, y0 + h / 2, za * f, 0.07, h, 0.07, seam);
    }
  }
}

/** Sample a smooth plan curve through [x, z] points (ordered front to back). */
function spline(pts, n = 90) {
  const c = new THREE.SplineCurve(pts.map(([x, z]) => new THREE.Vector2(x, z)));
  return c.getSpacedPoints(n).map((v) => [v.x, v.y]);
}

// Side walls of the two east halls bow outwards and swing back in at the
// rear corners: [depth fraction, outward bulge in metres].
const BARREL = [[0, 0], [0.1235, 1.55], [0.247, 2.65], [0.37, 3.3], [0.432, 3.35], [0.551, 3.05], [0.691, 2.35], [0.815, 1.55], [0.918, 0.65], [1, -0.45]];
function barrel(x0, dir, depth, k = 1) {
  return spline(BARREL.map(([t, b]) => [x0 + dir * b * k, -t * depth]));
}

/** Point on a sampled curve at depth z, with its unit tangent (towards -z). */
function along(Pts, z) {
  for (let i = 0; i < Pts.length - 1; i++) {
    const [x0, z0] = Pts[i], [x1, z1] = Pts[i + 1];
    if ((z0 - z) * (z1 - z) <= 0 && z0 !== z1) {
      const t = (z - z0) / (z1 - z0);
      const dx = x1 - x0, dz = z1 - z0, l = Math.hypot(dx, dz);
      return { x: x0 + dx * t, tx: dx / l, tz: dz / l };
    }
  }
  const last = z > Pts[0][1] ? 0 : Pts.length - 1;
  const [xa, za] = Pts[Math.max(0, last - 1)], [xb, zb] = Pts[Math.max(1, last)];
  const l = Math.hypot(xb - xa, zb - za) || 1;
  return { x: Pts[last][0], tx: (xb - xa) / l, tz: (zb - za) / l };
}

/**
 * Point on one face of a curved wall (centreline Pts, thickness t) at depth z.
 * side +1 is the face on the +normal (x+ for a wall running towards -z).
 * ry turns a local frame so its +z looks out of that face.
 */
function faceAt(Pts, z, t, side) {
  const a = along(Pts, z);
  const nx = -a.tz * side, nz = a.tx * side;
  return { x: a.x + (nx * t) / 2, z: z + (nz * t) / 2, nx, nz, ry: Math.atan2(nx, nz) };
}

/** Extruded wall of thickness t along the stretch of a curve between two depths. */
function curveWall(k, Pts, z0, z1, t, yb, h, color, mat = 'matte') {
  const pts = [[along(Pts, z0).x, z0], ...Pts.filter(([, z]) => z < z0 - 0.05 && z > z1 + 0.05), [along(Pts, z1).x, z1]];
  const A = [], B = [];
  for (let i = 0; i < pts.length; i++) {
    const [x, z] = pts[i];
    if (i === 0 || i === pts.length - 1) {
      // square ends so the wall stops exactly on the cut plane
      A.push([x + t / 2, z]);
      B.push([x - t / 2, z]);
      continue;
    }
    const a = pts[i - 1], b = pts[i + 1];
    let tx = b[0] - a[0], tz = b[1] - a[1];
    const l = Math.hypot(tx, tz);
    tx /= l;
    tz /= l;
    A.push([x - (tz * t) / 2, z + (tx * t) / 2]);
    B.push([x + (tz * t) / 2, z - (tx * t) / 2]);
  }
  const sh = new THREE.Shape();
  sh.moveTo(A[0][0], -A[0][1]);
  for (let i = 1; i < A.length; i++) sh.lineTo(A[i][0], -A[i][1]);
  for (let i = B.length - 1; i >= 0; i--) sh.lineTo(B[i][0], -B[i][1]);
  const g = new THREE.ExtrudeGeometry(sh, { depth: h, bevelEnabled: false, curveSegments: 1 });
  k.geo(mat, g, 0, yb, 0, color, 1, 1, 1, -Math.PI / 2, 0, 0);
}

/** Cut-face cap on the z = 0 plane. */
function cap(k, x0, x1, y0, y1, depth = 0.04) {
  k.bb('matte', Math.min(x0, x1) - 0.02, y0, -depth, Math.max(x0, x1) + 0.02, y1, 0.01, SECTION);
}

/** Linear light fixture on two wires. */
function barLight(k, x, yCeil, z, len, { ry = 0, drop = 1.1, color = '#f3efe4', power = 1.6, body = '#2b2e30' } = {}) {
  k.push(x, yCeil - drop, z, ry);
  k.box('metal', 0, 0.06, 0, len, 0.12, 0.3, body);
  k.box('glow', 0, -0.006, 0, len - 0.14, 0.02, 0.18, col(color, power));
  for (const s of [-1, 1]) k.box('metal', s * (len / 2 - 0.35), (drop + 0.12) / 2, 0, 0.018, drop - 0.12, 0.018, '#1d1f20');
  k.pop();
}

/** Wall lamp: a glowing globe on a small plate, facing local +z. */
function globe(k, x, y, z, ry = 0, { color = '#fff1dc', power = 4, r = 0.17, plate = '#4a4a46' } = {}) {
  k.push(x, y, z, ry);
  k.box('metal', 0, 0, 0.03, 0.16, 0.26, 0.06, plate);
  k.sphere('glow', 0, 0, 0.21, r, col(color, power), 10, 8);
  k.pop();
}

/** Standing lamp with a tall glowing capsule (cafeteria). */
function capsuleLamp(k, x, y, z, { color = '#fff2dc', power = 4.2 } = {}) {
  k.cyl('metal', x, y, z, 0.22, 0.05, '#3a3c3b', 12);
  k.cyl('metal', x, y, z, 0.04, 0.95, '#3a3c3b', 6);
  k.cyl('glow', x, y + 0.9, z, 0.2, 1.55, col(color, power), 14);
  k.cyl('metal', x, y + 2.45, z, 0.22, 0.06, '#3a3c3b', 12);
}

/** Oval drum hanging from the ceiling. */
function soffit(k, cx, yCeil, cz, rx, rz, depth, color) {
  const sh = new THREE.Shape();
  sh.absellipse(0, 0, rx, rz, 0, Math.PI * 2, false, 0);
  k.geo('matte', extrude(sh, depth, false, 48), cx, yCeil - depth, cz, color, 1, 1, 1, -Math.PI / 2, 0, 0);
  // a darker reveal where it meets the ceiling
  const rim = new THREE.Shape();
  rim.absellipse(0, 0, rx - 0.25, rz - 0.25, 0, Math.PI * 2, false, 0);
  k.geo('matte', extrude(rim, 0.12, false, 48), cx, yCeil - depth - 0.1, cz, col(color, 0.86), 1, 1, 1, -Math.PI / 2, 0, 0);
}

/** Pedestal desk with a cream CRT (IT), facing local +z; chair in front. */
function itDesk(k, x, y, z, ry = 0) {
  k.push(x, y, z, ry);
  k.box('matte', 0, 0.745, 0, 1.3, 0.05, 0.72, '#abb3a9');
  k.box('matte', -0.48, 0.36, 0, 0.32, 0.72, 0.66, '#8e988e');
  k.box('matte', 0.61, 0.36, 0, 0.05, 0.72, 0.66, '#8e988e');
  k.box('matte', 0.07, 0.42, -0.31, 1.12, 0.6, 0.04, '#88928a');
  k.box('matte', 0.05, 1.0, -0.1, 0.46, 0.42, 0.42, '#e0dccb');
  k.box('matte', 0.05, 0.97, -0.34, 0.34, 0.3, 0.16, '#d6d2c0');
  k.box('glow', 0.05, 1.01, 0.113, 0.36, 0.28, 0.01, col('#eef4e4', 1.9));
  k.box('matte', 0.05, 0.785, 0.2, 0.44, 0.03, 0.15, '#c8c3b0');
  k.pop();
  P.chair(k, x + Math.sin(ry) * 0.72, y, z + Math.cos(ry) * 0.72, ry + Math.PI, { color: '#2f3335' });
}

/** Wood-panelled wall in a local frame: runs along x, face at z = 0 looking +z. */
function woodWall(k, L, h, { base = '#4a2921', wain = '#6c4634', batten = '#63392b', rail = '#7b5139', frieze = '#3e2219', panel = 3.3, battens = null, wainH = 0.95 } = {}) {
  k.box('wood', 0, h / 2, -0.15, L, h, 0.3, base);
  k.box('wood', 0, wainH / 2, 0.02, L, wainH, 0.04, wain);
  k.box('wood', 0, wainH + 0.03, 0.05, L, 0.08, 0.1, rail);
  k.box('wood', 0, h - 0.16, 0.04, L, 0.32, 0.08, frieze);
  let xs = battens;
  if (!xs) {
    const n = Math.max(1, Math.round(L / panel));
    xs = Array.from({ length: n + 1 }, (_, i) => -L / 2 + (i * L) / n);
  }
  for (const x of xs) k.box('wood', x, h / 2, 0.05, 0.16, h, 0.1, batten);
}

/**
 * Arched, glass-fronted cabinet in a local frame (back on z = 0), standing on
 * a low wooden base so the arch starts above the wainscot.
 */
function archCabinet(k, lx, rng, { w = 1.6, h = 2.4, base = 0.9, mounted = false, color = '#3e2119' } = {}) {
  if (!mounted) k.box('wood', lx, base / 2, 0.24, w + 0.1, base, 0.48, '#4a2a1f');
  k.box('wood', lx, base - 0.03, 0.26, w + 0.16, 0.06, 0.52, '#5c3526');
  k.push(lx, base, 0, 0);
  const ring = new THREE.Shape();
  ring.curves = archShape(w, h).curves;
  ring.holes.push(archShape(w - 0.24, h - 0.2, 0, 0.1));
  k.geo('wood', extrude(ring, 0.46, false, 12), 0, 0, 0, color);
  k.geo('wood', extrude(archShape(w - 0.2, h - 0.15, 0, 0.08), 0.04, false, 12), 0, 0, 0.01, '#2a1712');
  for (const yy of [0.12, 0.72, 1.32]) {
    k.box('wood', 0, yy, 0.25, w - 0.26, 0.04, 0.4, '#4a2a20');
    let cx = -w / 2 + 0.2;
    while (cx < w / 2 - 0.25) {
      const bw = 0.08 + rng() * 0.14, bh = 0.2 + rng() * 0.26;
      k.box('matte', cx + bw / 2, yy + 0.02 + bh / 2, 0.24, bw, bh, 0.26, rng.pick(['#6a2a22', '#2e4436', '#7a5c34', '#34384e', '#a8966e', '#b7ae9a']));
      cx += bw + 0.03;
    }
  }
  // glazing bars instead of a full pane, so the contents read through
  k.box('wood', 0, (h - 0.1) / 2, 0.44, 0.05, h - 0.3, 0.04, color);
  k.box('wood', 0, 1.02, 0.44, w - 0.24, 0.05, 0.04, color);
  k.box('glow', 0, h - w / 2 - 0.05, 0.12, w * 0.5, 0.03, 0.1, col('#ffd6a0', 1.6));
  k.pop();
}

function bin(k, x, y, z, color) {
  k.cyl('metal', x, y, z, 0.42, 1.05, color, 14);
  k.geo('metal', UNIT.torus(0.07, 5, 16), x, y + 1.05, z, col(color, 0.72), 0.42, 0.42, 0.42, Math.PI / 2, 0, 0);
  k.cyl('matte', x, y + 0.98, z, 0.36, 0.03, '#1c1e1e', 12);
}

let _cafTex = null;
/** The wallscreen picture: a pale cream sky over warm brown ground. */
function cafScreenTexture() {
  if (_cafTex) return _cafTex;
  const c = surfaceViewCanvas(1024, 256, { tint: [1, 1, 1] });
  try {
    const ctx = c.getContext('2d');
    const img = ctx.getImageData(0, 0, c.width, c.height);
    const d = img.data;
    if (d && d.length) {
      for (let i = 0; i < d.length; i += 4) {
        const L = (0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2]) / 255;
        const t = Math.min(1, Math.max(0, (L - 0.4) / 0.3));
        d[i] = Math.min(255, d[i] * (1.12 + 0.06 * t));
        d[i + 1] = Math.min(255, d[i + 1] * (0.98 + 0.2 * t));
        d[i + 2] = Math.min(255, d[i + 2] * (0.84 + 0.36 * t));
      }
      ctx.putImageData(img, 0, 0);
    }
  } catch {
    // no pixel access: keep the plain picture
  }
  _cafTex = toTexture(c, { repeat: false });
  return _cafTex;
}

// ---------------------------------------------------------------------------
// Level 1, east: the cafeteria and its wallscreen.
// ---------------------------------------------------------------------------
function cafeteria({ pool, signs }) {
  const k = new Kit('top/cafeteria');
  const y0 = C.floorY(1), yc = y0 + C.ROOM_H, H = C.ROOM_H;
  const r = makeRng(101);
  // warm, fairly dark finishes: the hall reads sepia under its lamps
  const wall = '#958a76', rear = '#857a68', galley = '#625c50', T = 0.6;

  // Plan: a dining hall between two curved side walls; the galley lies east
  // of it, an open lobby behind the stairwell side.
  const west = barrel(29.75, -1, 24.3);
  const east = barrel(60.25, 1, 24.3);
  curveWall(k, west, 0, -24.3, T, y0, H, wall);
  cap(k, 29.45, 30.05, y0, yc);
  curveWall(k, east, 0, -3.4, T, y0, H, wall);
  curveWall(k, east, -5.4, -24.3, T, y0, H, wall);
  curveWall(k, east, -3.4, -5.4, T, y0 + 2.8, H - 2.8, wall);
  cap(k, 59.95, 60.55, y0, yc);
  k.bb('matte', 29.9, y0, -24.6, 64.2, yc, -24.0, rear);

  // floors: hall + landing strip, the lobby behind, the galley
  for (let z = 0; z > -24; z -= 2) {
    const xa = along(east, z).x, xb = along(east, z - 2).x;
    pad(k, 19.6, 29.6, z, z - 2, y0, '#9b917f');
    pad(k, 29.6, Math.max(xa, xb, along(east, z - 1).x), z, z - 2, y0, '#a59989');
    if (z > -18.3) floorArc(k, 1, Math.min(xa, xb), z, Math.max(z - 2, -18.3), y0, '#857f73', { step: 2 });
  }
  pad(k, 10, 30.2, -24.0, -33.8, y0, '#8f877a');
  pad(k, 10, 19.6, -20.6, -24.0, y0, '#8f877a');
  // lobby walls seen past the west pier
  k.bb('matte', 10, y0, -34.1, 30.5, yc, -33.8, '#6d6553');
  k.bb('matte', 29.9, y0, -33.8, 30.5, yc, -24.3, '#6d6553');

  // the wallscreen in a rounded, bevelled surround
  const sx = 45, sy = y0 + 3.0;
  const surround = roundRectShape(24.7, 6.0, 2.4);
  surround.holes.push(roundRectShape(22.9, 5.3, 1.5, 0, -0.3));
  const bz = new THREE.ExtrudeGeometry(surround, { depth: 0.35, bevelEnabled: true, bevelThickness: 0.22, bevelSize: 0.25, bevelSegments: 3, curveSegments: 10 });
  k.geo('matte', bz, sx, y0 + 3.3, -23.93, '#857863');
  k.bb('matte', 33.7, y0 + 0.55, -24.02, 56.3, y0 + 5.45, -23.98, '#141515');
  k.mesh(screen(cafScreenTexture(), sx, sy, -23.95, 22, 4.4, 0, 1.15, 'top/cafeteria/wallscreen'));

  // ceiling: an oval drum over the tables, linear fixtures on wires
  soffit(k, 45.9, yc, -12.5, 10.25, 7.2, 0.95, '#a0957f');
  for (const [x, z] of [[30.75, -19], [34.6, -19], [59.3, -19], [59.45, -10]]) barLight(k, x, yc, z, 3.4, { color: '#f6ead4' });
  for (const x of [42.3, 50.9]) {
    k.box('metal', x, yc - 1.15, -19.3, 0.55, 0.36, 0.42, '#2d3031');
    k.box('metal', x, yc - 0.5, -19.3, 0.03, 1.0, 0.03, '#1d1f20');
  }

  // wall lamps where the side walls swing in, and over the portholes
  for (const z of [-18.6, -22.0]) {
    const f = faceAt(west, z, T, 1);
    globe(k, f.x, y0 + 4.0, f.z, f.ry);
  }
  for (const z of [-11.0, -15.8, -20.6]) {
    const f = faceAt(east, z, T, -1);
    globe(k, f.x, y0 + 4.1, f.z, f.ry);
  }

  // standing lamps: pairs along the side walls and flanking the screen
  const lamps = [[31.1, -7.2], [31.4, -12.2], [58.9, -7.4], [58.9, -16.2], [40.3, -23.0], [47.2, -23.0]];
  for (const [x, z] of lamps) capsuleLamp(k, x, y0, z);

  // sixty-five separate tables: nine files receding from the cut, eight deep,
  // the first file only where the west wall bows out; chairs on both sides
  let tables = 0;
  for (let j = 0; j < 8; j++) {
    const z = -1.4 - j * 3.04;
    for (let i = 0; i < 9; i++) {
      const x = 30.05 + i * 3.425;
      if (x - 1.25 < faceAt(west, z, T, 1).x) continue;
      if (i === 0 && (j < 2 || j > 5)) continue;
      if (lamps.some(([lx, lz]) => Math.abs(lx - x) < 1.2 && Math.abs(lz - z) < 1.0)) continue;
      tables++;
      P.table(k, x, y0, z, 0, { w: 1.7, d: 0.85, top: '#d9d4c6', leg: '#3a3d3d' });
      for (const dz of [-0.64, 0.64]) {
        for (const dx of [-0.45, 0.45]) {
          if (r() < 0.12) continue;
          P.chair(k, x + dx, y0, z + dz, dz > 0 ? Math.PI : 0, { color: '#34383a' });
        }
      }
    }
  }
  void tables;

  // portholes in the east wall, looking into the lit galley
  const ring = roundRectShape(1.75, 2.1, 0.62);
  ring.holes.push(roundRectShape(1.42, 1.78, 0.48));
  const ringGeo = extrude(ring, 0.12, false, 8);
  const paneGeo = extrude(roundRectShape(1.44, 1.8, 0.48), 0.02, false, 8);
  for (const z of [-11.0, -15.8]) {
    const f = faceAt(east, z, T, -1);
    k.push(f.x, y0 + 1.95, f.z, f.ry);
    k.geo('metal', ringGeo, 0, 0, 0.0, '#6d6b66');
    k.geo('glow', paneGeo, 0, 0, -0.01, col('#e3e8e4', 1.25));
    k.pop();
  }

  // the cafeteria sign on the hall side of the west wall
  {
    const f = faceAt(west, -10, T, 1);
    const e = signs.make('CAFETERIA', { style: 'panel', size: 56 });
    signs.place(e, f.x + f.nx * 0.03, y0 + 4.25, f.z + f.nz * 0.03, 0.7, f.ry);
  }

  // galley: back wall, lining, serving counter, cabinets, pendants
  const gz = -18.3;
  k.bb('matte', along(east, gz).x, y0, gz - 0.3, 72.8, yc, gz, galley);
  lining(k, 1, y0, 0, gz, { color: galley });
  k.bb('matte', 63.6, y0, -6.1, 73.2, y0 + 1.05, -5.0, '#b9b2a2');
  k.bb('matte', 63.5, y0 + 1.05, -6.2, 73.3, y0 + 1.12, -4.9, '#cbc5b6');
  k.bb('matte', 63.6, y0, -5.02, 73.2, y0 + 0.12, -4.98, '#7a756a');
  k.box('matte', 69.0, y0 + 1.35, -5.65, 0.95, 0.46, 0.5, '#5a5d5b');
  for (let i = 0; i < 5; i++) k.box('matte', 64.6 + i * 0.9, y0 + 1.14, -5.55, 0.62, 0.04, 0.42, '#a49d8c');
  for (let i = 0; i < 3; i++) P.cabinet(k, 71.5 + i * 0.6, y0, -9.55, 0, { w: 0.58, h: 1.4, d: 0.5, color: '#7c7f79', drawers: 2 });
  P.shelf(k, 67.4, y0, gz + 0.35, 0, { w: 5, h: 2.2, levels: 4, color: '#4f514f', rng: r, palette: ['#b3ad9e', '#8a867b', '#9e947c', '#6c7b78'] });
  // bare warm bulbs over the counter; the one nearest the doorway is dim
  P.pendant(k, 66.0, yc, -5.6, { drop: 2.85, r: 0.16, power: 1.6, color: '#ffd9a8', shade: '#3a3c3b' });
  for (const x of [68.2, 70.4, 72.4]) P.pendant(k, x, yc, -5.6, { drop: 2.85, r: 0.16, power: 4.2, color: '#ffcf96', shade: '#3a3c3b' });

  pool.add(45, y0 + 4.5, -11, 0xffe6c4, 30);
  pool.add(37, y0 + 3.0, -20, 0xffdcb0, 14);
  pool.add(53, y0 + 3.0, -20, 0xffdcb0, 14);
  pool.add(68.5, y0 + 3.8, -6, 0xffd29a, 16);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 1, west: sheriff's office, holding cell, the airlock and the ramp.
// ---------------------------------------------------------------------------
function sheriff({ pool, signs }) {
  const k = new Kit('top/sheriff');
  const y0 = C.floorY(1), yc = y0 + C.ROOM_H;
  const r = makeRng(202);
  const wall = '#8f8d86', teal = '#2e6a66', back = '#958b7b';

  // ---- the office
  pad(k, -74.9, -52.0, -13.3, 0, y0, '#a7a698');
  k.bb('matte', -74.2, y0, -13.3, -52.45, yc, -13.0, wall);
  k.bb('matte', -73.9, y0, -12.98, -52.45, y0 + 1.0, -12.94, teal);
  lining(k, -1, y0, 0, -13.0, { color: '#8e8d82' });
  // a dark ceiling the fixtures hang from
  k.bb('matte', -74.9, yc - 0.07, -13.3, -52.0, yc - 0.01, -0.04, '#45463f');
  // partition to the holding cell: a big window in a dark rounded frame
  const px0 = -52.45, px1 = -52.0;
  const wz0 = -4.3, wz1 = -0.7, wy0 = y0 + 0.25, wy1 = y0 + 3.15;
  k.bb('matte', px0, y0, -13.3, px1, yc, wz0, wall);
  k.bb('matte', px0, y0, wz1, px1, yc, 0, wall);
  k.bb('matte', px0, y0, wz0, px1, wy0, wz1, wall);
  k.bb('matte', px0, wy1, wz0, px1, yc, wz1, wall);
  {
    const W = wz1 - wz0, Hh = wy1 - wy0;
    const fr = new THREE.Shape();
    fr.moveTo(-W / 2, -Hh / 2);
    fr.lineTo(W / 2, -Hh / 2);
    fr.lineTo(W / 2, Hh / 2);
    fr.lineTo(-W / 2, Hh / 2);
    fr.lineTo(-W / 2, -Hh / 2);
    fr.holes.push(roundRectShape(W - 0.3, Hh - 0.3, 0.55));
    k.geo('matte', extrude(fr, px1 - px0 + 0.04, false, 8), px0 - 0.02, (wy0 + wy1) / 2, (wz0 + wz1) / 2, '#2b2e2f', 1, 1, 1, 0, Math.PI / 2, 0);
    k.geo('glass', UNIT.box(), (px0 + px1) / 2, (wy0 + wy1) / 2, (wz0 + wz1) / 2, '#b9cfcc', 0.03, Hh - 0.32, W - 0.32);
  }
  cap(k, px0, px1, y0, yc);
  k.bb('wood', px0 - 0.05, y0, -9.4, px0, y0 + 2.5, -8.1, '#6e5238');
  // lockers either side of the office door
  for (let i = 0; i < 4; i++) {
    P.locker(k, -52.72, y0, -12.3 + i * 0.57, -Math.PI / 2, { color: '#6c7c76' });
    P.locker(k, -52.72, y0, -7.5 + i * 0.57, -Math.PI / 2, { color: '#6c7c76' });
  }
  // desks with white terminals
  for (const [x, z] of [[-70.5, -3.6], [-64.6, -3.6], [-59.2, -3.6], [-54.5, -3.6], [-64.0, -9.4], [-58.6, -9.4]]) {
    P.crtDesk(k, x, y0, z, 0, { desk: '#7e807b', body: '#dcd7c7', screen: '#e2eed8', power: 1.8 });
  }
  // grey-green cabinets against the back wall
  for (const x of [-72.0, -71.38, -70.76, -70.14, -62.1, -61.48]) P.cabinet(k, x, y0, -12.6, 0, { w: 0.6, h: 1.4, color: '#7f8f86' });
  // back wall: sign, star, whiteboard, lamps, a vertical tube
  const e = signs.make('SHERIFF', { style: 'panel', size: 60, bg: '#2f6b68', fg: '#f4f1e8', border: 'rgba(244,241,232,0.4)' });
  signs.place(e, -63.0, y0 + 4.95, -12.9, 0.95);
  k.geo('matte', UNIT.cyl(32), -63.1, y0 + 3.7, -12.95, '#8f6d34', 0.76, 0.05, 0.76, Math.PI / 2, 0, 0);
  k.geo('metal', UNIT.torus(0.06, 6, 32), -63.1, y0 + 3.7, -12.9, '#c9a45a', 0.74, 0.74, 0.74);
  const star = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const a = Math.PI / 2 + (i / 10) * Math.PI * 2;
    const rr = i % 2 ? 0.21 : 0.5;
    if (i === 0) star.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
    else star.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  k.geo('metal', extrude(star, 0.05), -63.1, y0 + 3.7, -12.93, '#d8b25a');
  k.bb('matte', -68.4, y0 + 1.8, -12.98, -65.8, y0 + 3.0, -12.92, '#e6e5df');
  for (const x of [-71.7, -60.1]) globe(k, x, y0 + 4.5, -12.98, 0);
  k.box('metal', -72.1, y0 + 2.35, -12.95, 0.14, 1.7, 0.08, '#6a6c6b');
  k.box('glow', -72.1, y0 + 2.35, -12.89, 0.1, 1.6, 0.05, col('#f1f5ff', 6));
  for (const x of [-72.2, -64.5, -57.3]) barLight(k, x, yc, -6, 3.2, { drop: 0.5 });
  pool.add(-63, y0 + 4.5, -6.5, 0xf2f2ea, 28);

  // ---- holding cell and airlock chamber: a low block under one roof
  const bz = -4.7;
  k.bb('matte', -52.0, y0, bz, -48.72, y0 + 0.03, 0, '#56595a');
  k.bb('matte', -48.72, y0, bz, -44.6, y0 + 0.03, 0, '#3d4042');
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) k.box('matte', -47.95 + i * 1.17, y0 + 0.035, -0.9 - j * 1.0, 0.36, 0.01, 0.08, '#d9d4c0');
  }
  k.bb('matte', -52.0, y0 + 3.35, bz, -44.6, y0 + 3.6, 0, '#bdb8ad');
  cap(k, -52.0, -44.6, y0 + 3.35, y0 + 3.6);
  // the bays are split only by slim columns at the front
  for (const [a, b] of [[-48.9, -48.55], [-45.0, -44.6]]) {
    k.bb('matte', a, y0, -0.45, b, y0 + 3.35, 0, '#b8b3a8');
    cap(k, a, b, y0, y0 + 3.35);
  }
  // inner door: a round frame between cell and chamber, its leaf swung open
  k.geo('metal', UNIT.torus(0.1, 8, 32), -48.72, y0 + 1.55, -2.25, '#2a2e30', 1.35, 1.35, 1.35, 0, Math.PI / 2, 0);
  k.box('metal', -48.72, y0 + 0.08, -2.25, 0.3, 0.16, 2.4, '#2a2e30');
  // the outer door: a heavy black slab with rounded corners on the back wall
  {
    const dx0 = -48.85, dx1 = -45.1, dh = 2.95, dz = -4.1, dt = 0.4;
    const w = dx1 - dx0, cx = (dx0 + dx1) / 2;
    k.geo('metal', extrude(roundRectShape(w, dh, 0.6), dt, false, 8), cx, y0 + dh / 2, dz, '#141617');
    for (const hy of [0.55, 1.45, 2.35]) k.box('metal', cx, y0 + hy, dz + dt + 0.04, w - 0.5, 0.12, 0.08, '#4a4f52');
    k.box('metal', cx - 0.2, y0 + dh / 2, dz + dt + 0.03, 0.05, dh - 0.4, 0.05, '#2c3032');
    k.geo('metal', UNIT.torus(0.1, 6, 20), cx - 0.75, y0 + 1.5, dz + dt + 0.12, '#8d9396', 0.32, 0.32, 0.32);
    k.geo('metal', UNIT.cyl(10), cx - 0.75, y0 + 1.5, dz + dt + 0.08, '#6a7073', 0.08, 0.14, 0.08, Math.PI / 2, 0, 0);
  }
  // spray-nozzle frames, front and back of the chamber
  const nx = [-48.25, -46.78, -45.3], ny = [0.9, 1.95, 3.0];
  for (const zf of [-1.3, -3.45]) {
    for (const x of nx) k.rod('metal', [x, y0 + 0.05, zf], [x, y0 + 3.35, zf], 0.045, '#8e9396', 6);
    for (const yy of ny) k.rod('metal', [-48.4, y0 + yy, zf], [-45.15, y0 + yy, zf], 0.04, '#8e9396', 6);
    const inward = zf > -2.5 ? -1 : 1;
    for (const x of nx) {
      for (const yy of ny) k.cylR('metal', x, y0 + yy, zf + inward * 0.1, 0.07, 0.16, '#b7bcbe', Math.PI / 2, 0, 0, 8);
    }
  }
  for (const x of [-50.45, -46.78]) k.box('glow', x, y0 + 3.33, -2.35, 1.3, 0.03, 0.5, col('#eef4ff', 2.6));
  // the cell: a bench, a waiting figure, a suit hung on the back wall
  k.bb('wood', -51.95, y0 + 0.45, -4.5, -51.35, y0 + 0.52, -2.3, '#6e5238');
  P.figure(k, -50.6, y0, -2.4, 0.35);
  P.figure(k, -50.85, y0 + 0.62, -4.2, 0.05);
  k.box('metal', -50.85, y0 + 2.78, -4.55, 0.6, 0.05, 0.3, '#5b5e5d');
  k.box('metal', -50.85, y0 + 2.62, -4.42, 0.04, 0.3, 0.04, '#5b5e5d');
  pool.add(-50.4, y0 + 2.8, -2.4, 0xeef4ff, 10);
  pool.add(-46.8, y0 + 2.8, -2.2, 0xe8f4ff, 12);

  // ---- the way out: one long ramp, in a tunnel open to the cut, climbing
  // straight from the airlock to the hatch in the ground. Where it nears the
  // surface the silo's roof is its ceiling, and its last stretch rises under
  // the hatch itself. As in the show, tall strip lights line the wall, small
  // red lamps run along the ceiling and the floor is ribbed.
  const ax = -44.6, bx = -23.8, rise = -y0; // foot at level 1, top at ground level
  const run = bx - ax, pitch = Math.atan2(rise, run), len = Math.hypot(run, rise);
  const tanP = rise / run, cP = Math.cos(pitch), sP = Math.sin(pitch);
  const floorAt = (x) => y0 + (x - ax) * tanP;
  const HEAD = 3.6, ROOF = 0.42, UNDER = yc; // tunnel headroom; underside of the silo roof
  const xRoof = ax + (UNDER - HEAD - y0) / tanP; // where the tunnel's own roof meets the silo's
  const zc = bz / 2, wz = -bz;
  const slab = '#b3aa98';
  // the ramp's floor slab (top surface on the line) and its cut face
  {
    const mx = (ax + bx) / 2, my = y0 + rise / 2;
    k.box('matte', mx + sP * 0.25, my - cP * 0.25, zc, len, 0.5, wz, slab, 0, 0, pitch);
    k.box('matte', mx + sP * 0.25, my - cP * 0.25, -0.01, len, 0.52, 0.04, SECTION, 0, 0, pitch);
  }
  // the tunnel's roof slab, until it runs into the silo's roof
  {
    const rl = (xRoof - ax) / cP + 0.6;
    const hp = HEAD * cP + ROOF / 2;
    const cx = ax + (rl / 2) * cP - sP * hp, cy = y0 + (rl / 2) * sP + cP * hp;
    k.box('matte', cx, cy, zc, rl, ROOF, wz, slab, 0, 0, pitch);
    k.box('matte', cx, cy, -0.01, rl, ROOF + 0.02, 0.04, SECTION, 0, 0, pitch);
  }
  // the back wall of the whole wing
  k.bb('matte', -52.0, y0, bz - 0.3, bx, yc, bz, back);
  pad(k, ax, bx, bz, 0, y0, '#9c968a');
  // ribbed floor, all the way up
  for (let x = ax + 0.5; x < bx - 0.3; x += 0.45) k.box('matte', x, floorAt(x) + 0.012, zc, 0.09, 0.025, wz - 0.1, '#6f695e', 0, 0, pitch);
  // tall strip lights on the wall, each in a dark frame, while there is room
  for (let x = ax + 1.6; floorAt(x) + 3.1 < UNDER; x += 2.4) {
    const f = floorAt(x);
    k.box('metal', x, f + 1.75, bz + 0.03, 0.34, 2.5, 0.06, '#26292b');
    k.box('glow', x, f + 1.75, bz + 0.07, 0.13, 2.25, 0.03, col('#dff6ff', 5));
  }
  // small red lamps along the ceiling
  for (let x = ax + 2.2; x < bx - 8; x += 3.1) {
    const cy = Math.min(floorAt(x) + HEAD, UNDER) - 0.04;
    k.sphere('glow', x, cy, zc, 0.07, col('#ff3b2e', 7), 8, 6, 0.6);
  }
  // a pale handrail on short brackets, and a conduit under the tunnel roof
  const railEnd = bx - 2.7;
  k.rod('metal', [ax + 0.6, floorAt(ax + 0.6) + 0.95, bz + 0.16], [railEnd, floorAt(railEnd) + 0.95, bz + 0.16], 0.03, '#b3aea3', 6);
  for (let x = ax + 1.4; x < railEnd; x += 2.6) k.box('metal', x, floorAt(x) + 0.9, bz + 0.08, 0.04, 0.1, 0.16, '#8f8b82');
  k.rod('metal', [ax + 0.4, floorAt(ax + 0.4) + HEAD - 0.22, -0.55], [xRoof - 0.3, floorAt(xRoof - 0.3) + HEAD - 0.22, -0.55], 0.12, '#6e6254', 8);
  // keypads by the lower end
  for (const [x, dy] of [[-41.9, 0], [-40.8, 0.2]]) {
    k.box('metal', x, y0 + 3.0 + dy, bz + 0.04, 0.46, 0.62, 0.08, '#55585a');
    k.box('glow', x, y0 + 3.08 + dy, bz + 0.09, 0.07, 0.3, 0.01, col('#f2f2ea', 2.2));
  }
  pool.add(-39, floorAt(-39) + 2.6, -2.4, 0xdff3ff, 14);
  pool.add(-32, floorAt(-32) + 1.9, -2.4, 0xdff3ff, 12);
  void r;
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 14, west: Judicial and the relic store.
// ---------------------------------------------------------------------------
function judicial({ pool, signs }) {
  const k = new Kit('top/judicial');
  const y0 = C.floorY(14), yc = y0 + C.ROOM_H;
  const r = makeRng(1414);
  const hc = 4.5; // chamber ceiling
  const hr = 3.6; // relic store ceiling
  const cx0 = -50.0, cx1 = -30.3, cz1 = -15.0; // chamber interior
  const pw = cx0 - 0.3; // relic-store side of the partition

  // ---- the cut: a deep header over both rooms, the side walls' faces
  k.bb('matte', -74.95, y0 + hr, -0.3, pw, yc, 0.01, SECTION);
  k.bb('matte', pw, y0 + hc, -0.3, -21.0, yc, 0.01, SECTION);
  cap(k, pw, cx0, y0, y0 + hc, 0.3);
  cap(k, cx1, cx1 + 0.3, y0, y0 + hc, 0.3);

  // ---- the chamber
  pad(k, cx0, cx1, cz1, 0, y0, '#40362f');
  k.bb('wood', cx0, y0 + hc, cz1, cx1, y0 + hc + 0.2, -0.3, '#3b261f');
  const bwc = (cx0 + cx1) / 2, bwl = cx1 - cx0 + 0.6;
  // back wall battens leave a wide panel behind the emblem
  k.at(bwc, y0, cz1, 0, () => woodWall(k, bwl, hc, { battens: [cx0 + 0.08, -49.0, -46.35, -43.7, -35.0, -32.4, cx1 - 0.08].map((x) => x - bwc) }));
  k.at(cx0, y0, cz1 / 2, Math.PI / 2, () => woodWall(k, -cz1, hc));
  k.at(cx1, y0, cz1 / 2, -Math.PI / 2, () => woodWall(k, -cz1, hc));
  // sunburst emblem over the bench: cream ring, short rays round a dark eye
  {
    const ex = -39.3, ey = y0 + 3.02, ez = cz1 + 0.16, cream = '#e2d6b8', dark = '#2c1c16';
    k.geo('matte', UNIT.cyl(40), ex, ey, ez, cream, 1.1, 0.08, 1.1, Math.PI / 2, 0, 0);
    k.geo('matte', UNIT.cyl(40), ex, ey, ez + 0.04, dark, 0.94, 0.04, 0.94, Math.PI / 2, 0, 0);
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      k.box('matte', ex + Math.cos(a) * 0.6, ey + Math.sin(a) * 0.6, ez + 0.07, 0.36, 0.1, 0.02, cream, 0, 0, a);
    }
  }
  // framed pictures and brass lamps on the back wall
  for (const x of [-47.6, -33.7]) {
    k.bb('wood', x - 0.5, y0 + 2.1, cz1 + 0.06, x + 0.5, y0 + 3.1, cz1 + 0.1, '#8c7452');
    k.bb('matte', x - 0.4, y0 + 2.2, cz1 + 0.1, x + 0.4, y0 + 3.0, cz1 + 0.12, '#1d2626');
  }
  const warm = { color: '#ffd9a6', power: 4.5, plate: '#6d5a3a' };
  for (const x of [-45.0, -36.6]) globe(k, x, y0 + 3.6, cz1 + 0.1, 0, warm);
  globe(k, cx0 + 0.1, y0 + 3.6, -12.3, Math.PI / 2, warm);
  for (const [z, y] of [[-12.8, 3.6], [-2.4, 3.55]]) globe(k, cx1 - 0.1, y0 + y, z, -Math.PI / 2, warm);
  // arched glass cabinets: one on a low base on the partition, two hung on
  // the right wall (a settee sits under the rear one)
  k.at(cx0 + 0.1, y0, -7.5, Math.PI / 2, () => archCabinet(k, 0, r, { w: 1.9, h: 2.3, base: 0.95 }));
  for (const [z, w] of [[-9.4, 1.7], [-3.2, 2.0]]) k.at(cx1 - 0.1, y0, z, -Math.PI / 2, () => archCabinet(k, 0, r, { w, h: 2.2, base: 1.1, mounted: true }));
  // a low credenza in the back corner
  k.bb('wood', -49.9, y0, -14.95, -48.3, y0 + 0.85, -14.3, '#4a2a1e');
  k.bb('wood', -49.95, y0 + 0.85, -15.0, -48.25, y0 + 0.9, -14.25, '#5c3526');
  k.cyl('metal', -48.8, y0 + 0.9, -14.6, 0.06, 0.26, '#b89a55', 8);
  // the vault door into the relic store
  k.at(cx0, y0, -4.9, Math.PI / 2, () => {
    k.box('metal', 0, 1.35, 0.08, 1.5, 2.7, 0.08, '#2a2c2d');
    k.box('metal', 0, 1.3, 0.14, 1.3, 2.55, 0.06, '#141617');
    k.geo('metal', UNIT.torus(0.12, 6, 20), 0, 1.35, 0.2, '#c9a13b', 0.2, 0.2, 0.2);
    k.geo('metal', UNIT.cyl(16), 0, 1.35, 0.19, '#8a6a2a', 0.12, 0.04, 0.12, Math.PI / 2, 0, 0);
    k.box('matte', 0, 1.85, 0.18, 0.5, 0.14, 0.01, '#d8d2c2');
  });
  const rs = signs.make('RELIC STORAGE', { style: 'panel', size: 40 });
  signs.place(rs, cx0 + 0.14, y0 + 2.95, -4.9, 0.24, Math.PI / 2);
  // carpet; the bench desk stands on its back edge with the judge's chair behind
  k.bb('fabric', -43.8, y0 + 0.02, -10.8, -36.3, y0 + 0.05, -4.8, '#7e261f');
  k.bb('fabric', -43.45, y0 + 0.05, -10.45, -36.65, y0 + 0.06, -5.15, '#942f26');
  k.bb('wood', -42.4, y0, -10.7, -37.8, y0 + 1.0, -9.75, '#4f2c20');
  k.bb('wood', -42.55, y0 + 1.0, -10.8, -37.65, y0 + 1.08, -9.62, '#6a3f2d');
  for (const x of [-41.55, -38.65]) k.bb('wood', x - 0.55, y0, -9.75, x + 0.55, y0 + 1.0, -9.35, '#5a3325');
  k.bb('wood', -40.55, y0 + 0.15, -9.76, -39.65, y0 + 0.85, -9.7, '#3e2219');
  for (const x of [-41.9, -38.2]) {
    k.cyl('metal', x, y0 + 1.08, -10.3, 0.09, 0.05, '#b89a55', 10);
    k.cyl('metal', x, y0 + 1.1, -10.3, 0.02, 0.26, '#b89a55', 5);
    k.sphere('glow', x, y0 + 1.42, -10.3, 0.09, col('#ffcf8a', 4.5), 8, 6);
  }
  k.box('matte', -39.6, y0 + 1.1, -10.25, 0.5, 0.02, 0.34, '#d8d0bc');
  {
    k.push(-40.1, y0, -11.35, 0);
    k.box('wood', 0, 0.25, 0, 0.62, 0.5, 0.56, '#3d2016');
    k.box('fabric', 0, 0.52, 0, 0.66, 0.08, 0.6, '#6b3a28');
    k.box('fabric', 0, 1.2, -0.27, 0.7, 1.3, 0.12, '#6b3a28');
    k.box('wood', 0, 1.88, -0.27, 0.76, 0.08, 0.14, '#4a2a1f');
    k.pop();
  }
  // a settee along the right wall and a low table before it
  k.bb('wood', -31.15, y0, -10.6, -30.4, y0 + 0.45, -8.2, '#4a281c');
  k.bb('fabric', -31.2, y0 + 0.45, -10.65, -30.35, y0 + 0.55, -8.15, '#5e2c22');
  k.bb('fabric', -30.6, y0 + 0.55, -10.65, -30.35, y0 + 1.0, -8.15, '#5e2c22');
  k.bb('wood', -32.6, y0, -9.2, -31.5, y0 + 0.42, -7.8, '#35211a');
  pool.add(-40, y0 + 3.4, -8, 0xffcf8f, 22);

  // ---- the relic store behind the partition
  const rx0 = -74.9;
  pad(k, rx0, pw, cz1 - 0.3, 0, y0, '#595650');
  k.bb('matte', -74.5, y0 + hr, cz1 - 0.3, pw, y0 + hr + 0.2, -0.3, '#8e8b84');
  k.bb('matte', -74.5, y0, cz1 - 0.3, pw, y0 + hr, cz1, '#8a8780');
  k.bb('matte', pw - 0.03, y0, cz1, pw, y0 + hr, -0.3, '#8a8780');
  lining(k, -1, y0, 0, cz1, { h: hr, color: '#8a8780' });
  const shelfRow = (x, z, w) => {
    k.push(x, y0, z, 0);
    for (const s of [-1, 0, 1]) k.box('metal', (s * w) / 2, 1.6, 0, 0.06, 3.2, 0.7, '#222426');
    for (const yy of [0.1, 0.85, 1.6, 2.35, 3.1]) {
      k.box('metal', 0, yy, 0, w, 0.04, 0.7, '#2b2d2f');
      if (yy > 3) continue;
      let cx = -w / 2 + 0.12;
      while (cx < w / 2 - 0.3) {
        const bw = 0.34 + r() * 0.2;
        if (r() < 0.55) k.box('matte', cx + bw / 2, yy + 0.2, (r() - 0.5) * 0.1, bw, 0.36, 0.5, r.pick(['#b8a27a', '#a48b62', '#c9b58a', '#8f7a58']));
        else k.sphere('fabric', cx + bw / 2, yy + 0.21, 0, bw * 0.5, r.pick(['#e2dccb', '#d6cdb6', '#ece6d8']), 8, 6, 0.8);
        cx += bw + 0.05;
      }
    }
    k.pop();
  };
  for (const x of [-61.6, -57.6, -53.6]) shelfRow(x, -10.2, 3.8);
  shelfRow(-61.6, -3.0, 3.8);
  k.bb('wood', -56.3, y0, -4.8, -54.7, y0 + 0.78, -4.0, '#5e3a28');
  P.chair(k, -55.5, y0, -3.65, Math.PI, { color: '#2e2a28' });
  P.crtDesk(k, -71.1, y0, -5.6, 0);
  P.crtDesk(k, -67.6, y0, -5.6, 0);
  for (let i = 0; i < 5; i++) P.cabinet(k, -73.0 + i * 0.6, y0, -8.55, 0, { w: 0.58, h: 1.4, color: '#5e6360' });
  for (const x of [-62, -68]) P.panelLight(k, x, y0 + hr - 0.02, -6);
  pool.add(-58, y0 + 3.0, -6, 0xf0efe8, 14);

  // ---- vestibule to the right, with the name over the way in
  const vz = -7.3;
  pad(k, cx1 + 0.3, -21.0, vz, 0, y0, '#5c5852');
  k.bb('matte', cx1 + 0.3, y0, vz - 0.3, -21.5, y0 + hc, vz, '#7a7465');
  k.bb('matte', cx1 + 0.3, y0 + 1.0, vz, -21.5, y0 + 1.8, vz + 0.04, '#6b4632');
  k.bb('matte', cx1 + 0.3, y0, vz, -21.5, y0 + 1.0, vz + 0.04, '#3f403e');
  k.bb('matte', cx1 + 0.3, y0 + hc - 0.02, vz, -21.0, y0 + hc + 0.2, -0.3, '#3c3a36');
  const js = signs.make('JUDICIAL', { style: 'panel', size: 60, bg: '#5a3a2c' });
  signs.place(js, -26.6, y0 + 3.9, vz + 0.06, 0.6);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 19, east: IT bullpen, glass office and the server room ("the Vault").
// ---------------------------------------------------------------------------
function it({ pool, signs }) {
  const k = new Kit('top/it');
  const y0 = C.floorY(19), yc = y0 + C.ROOM_H, H = C.ROOM_H;
  const r = makeRng(1919);
  const wall = '#7d7b75', side = '#76736b', T = 0.6, bz = -21.0;

  // the west wall bows out and stays out; the east wall bows out like the
  // cafeteria's and swings back in at the rear corner
  const west = spline([[0, 0], [0.1, 1.3], [0.22, 2.2], [0.38, 2.7], [0.6, 2.8], [0.8, 2.6], [1, 2.2]].map(([t, b]) => [34.25 - b, -t * 21.3]));
  const east = barrel(57.8, 1, 21.3);
  curveWall(k, west, 0, -21.3, T, y0, H, wall);
  cap(k, 33.95, 34.55, y0, yc);
  curveWall(k, east, 0, -21.3, T, y0, H, wall);
  cap(k, 57.5, 58.1, y0, yc);
  // back wall with the doorway to the racks
  k.bb('matte', 29.7, y0, bz - 0.6, 43.9, yc, bz, wall);
  k.bb('matte', 47.9, y0, bz - 0.6, 62.7, yc, bz, wall);
  k.bb('matte', 43.9, y0 + 3.5, bz - 0.6, 47.9, yc, bz, wall);
  for (const x of [43.75, 48.05]) k.bb('metal', x - 0.15, y0, bz - 0.65, x + 0.15, y0 + 3.6, bz + 0.05, '#a3a7a9');
  k.bb('metal', 43.6, y0 + 3.5, bz - 0.65, 48.2, y0 + 3.65, bz + 0.05, '#a3a7a9');

  // floors, the lobby behind the stairwell side, the open strip to the east
  for (let z = 0; z > bz; z -= 2) {
    const z1 = Math.max(z - 2, bz - 0.6);
    const xa = along(east, z).x, xb = along(east, z1).x, xm = along(east, (z + z1) / 2).x;
    pad(k, 19.6, Math.max(xa, xb, xm), z, z1, y0, '#858779');
    floorArc(k, 1, Math.min(xa, xb), z, z1, y0, '#83816f', { step: 2 });
  }
  pad(k, 10, 30.3, bz, -33.8, y0, '#807e6e');
  k.bb('matte', 10, y0, -34.1, 30.6, yc, -33.8, '#5c584b');
  k.bb('matte', 29.7, y0, -33.8, 30.3, yc, -21.3, '#5c584b');
  lining(k, 1, y0, 0, bz - 0.6, { color: side, seam: '#6f6c64' });
  k.bb('matte', 60.0, y0, bz - 0.6, 72.2, yc, bz - 0.3, side);

  // ceiling drum and fixtures
  soffit(k, 47.0, yc, -11.0, 8.35, 6.0, 0.95, '#8a8373');
  for (const [x, z, l] of [[35.7, -17, 3.4], [40.9, -17, 2.4], [54.8, -17, 2.4], [57.1, -8, 3.4]]) barLight(k, x, yc, z, l, { color: '#eef2ff', drop: 1.3 });
  k.box('metal', 47.6, yc - 1.2, -17, 0.5, 0.3, 0.4, '#2d3031');
  k.box('metal', 47.6, yc - 0.52, -17, 0.03, 1.05, 0.03, '#1d1f20');

  // doors along the back and east walls, each with a lamp above
  const door = (x, z, ry) => {
    k.push(x, y0, z, ry);
    k.box('metal', 0, 1.27, 0.03, 1.1, 2.55, 0.06, '#3f4648');
    k.box('metal', 0, 1.25, 0.07, 0.94, 2.44, 0.04, '#5a6366');
    k.box('metal', 0.34, 1.15, 0.1, 0.06, 0.2, 0.05, '#c9c9c0');
    k.pop();
  };
  for (const x of [34.3, 38.0, 42.1, 51.9, 56.4]) {
    door(x, bz, 0);
    globe(k, x, y0 + 3.2, bz, 0, { color: '#f4f6ff', power: 4.5 });
  }
  {
    const f = faceAt(east, -3.0, T, -1);
    door(f.x, f.z, f.ry);
    globe(k, f.x, y0 + 3.2, f.z, f.ry, { color: '#f4f6ff', power: 4.5 });
    for (const z of [-10.8, -16.0]) {
      const g = faceAt(east, z, T, -1);
      globe(k, g.x, y0 + 3.2, g.z, g.ry, { color: '#f4f6ff', power: 4.5 });
    }
  }

  // server room: two lines of racks either side of an aisle, glass beyond;
  // brightly lit so the racks read from the hall
  const srv = '#5f676e';
  k.bb('matte', 40.7, y0, -46.3, 41.0, yc, bz - 0.6, srv);
  k.bb('matte', 51.0, y0, -46.3, 51.3, yc, bz - 0.6, srv);
  k.bb('matte', 40.7, y0, -46.6, 51.3, yc, -46.3, srv);
  k.bb('matte', 40.7, yc - 0.1, -46.6, 51.3, yc - 0.02, bz - 0.6, '#4a5055');
  pad(k, 41.0, 51.0, bz - 0.6, -46.3, y0, '#3c4245');
  for (const z of [-24.5, -29.5, -38.5]) P.panelLight(k, 46, yc - 0.12, z, 3.2, 0.5, { color: '#e4f0ff', power: 3.4 });
  const leds = ['#58f07a', '#58f07a', '#58f07a', '#ffb347', '#ff4b3e', '#6fd6ff'];
  for (const [x, s] of [[44.6, 1], [47.4, -1]]) {
    for (let i = 0; i < 6; i++) {
      const z = -24.4 - i * 1.44;
      k.box('metal', x, y0 + 1.05, z, 0.95, 2.1, 1.36, '#2c3034');
      k.box('metal', x + s * 0.48, y0 + 1.05, z, 0.02, 1.95, 1.2, '#1c1e1f');
      for (let n = 0; n < 6; n++) k.box('glow', x + s * 0.495, y0 + 0.35 + r() * 1.5, z - 0.5 + r() * 1.0, 0.01, 0.03, 0.06, col(r.pick(leds), 4));
    }
  }
  k.geo('glass', UNIT.box(), 46, y0 + 1.6, -33.4, '#cfe0e6', 9.8, 3.2, 0.05);
  for (let x = 41.2; x <= 50.9; x += 2.42) k.bb('metal', x - 0.04, y0, -33.46, x + 0.04, y0 + 3.2, -33.34, '#3b3e3e');
  for (const x of [42.5, 49.5]) for (const z of [-37.5, -40.5]) k.box('metal', x, y0 + 1.05, z, 1.3, 2.1, 1.0, '#26292b');
  k.bb('fabric', 45.2, y0 + 0.03, -45.1, 46.8, y0 + 0.05, -44.1, '#34403f');
  P.tube(k, 46, yc - 0.3, -34, 8, Math.PI / 2, { color: '#cfe6ff', power: 2.2 });
  pool.add(46, y0 + 2.8, -26, 0xcfe4ff, 16);

  // thirty-nine desks: six rows of six, two by the office, one inside it
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) itDesk(k, 35.2 + i * 3.1, y0, -2.6 - j * 3.3, 0);
  }
  itDesk(k, 54.3, y0, -3.2, 0);
  itDesk(k, 56.9, y0, -3.2, 0);
  itDesk(k, 58.3, y0, -8.0, -Math.PI / 2);

  // glass office by the east wall
  const ox0 = 53.5, ox1 = 59.4, oz0 = -5.0, oz1 = -11.0;
  k.bb('metal', ox0, y0, oz1, ox1, y0 + 0.06, oz0, '#5b5e5c');
  const pane = (a, b, fixed, alongX) => {
    const L = Math.abs(b - a), m = (a + b) / 2;
    if (alongX) {
      k.bb('metal', a, y0, fixed - 0.06, b, y0 + 0.55, fixed + 0.06, '#34383a');
      k.geo('glass', UNIT.box(), m, y0 + 1.75, fixed, '#d7e6e6', L, 2.4, 0.04);
      k.bb('metal', a, y0 + 2.95, fixed - 0.06, b, y0 + 3.08, fixed + 0.06, '#34383a');
      for (let t = 0; t <= L + 0.01; t += L / Math.max(1, Math.round(L / 2))) k.bb('metal', a + t - 0.04, y0, fixed - 0.05, a + t + 0.04, y0 + 3.0, fixed + 0.05, '#34383a');
    } else {
      k.bb('metal', fixed - 0.06, y0, Math.min(a, b), fixed + 0.06, y0 + 0.55, Math.max(a, b), '#34383a');
      k.geo('glass', UNIT.box(), fixed, y0 + 1.75, m, '#d7e6e6', 0.04, 2.4, L);
      k.bb('metal', fixed - 0.06, y0 + 2.95, Math.min(a, b), fixed + 0.06, y0 + 3.08, Math.max(a, b), '#34383a');
      for (let t = 0; t <= L + 0.01; t += L / Math.max(1, Math.round(L / 2))) k.bb('metal', fixed - 0.05, y0, Math.min(a, b) + t - 0.04, fixed + 0.05, y0 + 3.0, Math.min(a, b) + t + 0.04, '#34383a');
    }
  };
  pane(ox0, ox1, oz0, true);
  pane(ox0, ox1, oz1, true);
  pane(oz0, oz1, ox0, false);
  pane(oz0, oz1, ox1, false);
  for (const z of [-9.0, -9.6, -10.2]) P.cabinet(k, 54.0, y0, z, Math.PI / 2, { w: 0.58, h: 1.4, d: 0.5, color: '#6e726f' });
  k.bb('matte', ox0 - 0.06, y0 + 3.08, oz1 - 0.06, ox1 + 0.06, y0 + 3.18, oz0 + 0.06, '#5f6363');
  P.panelLight(k, 56.45, y0 + 3.0, -8.0, 3.4, 0.6);

  // the name on the hall side of the west wall
  {
    const f = faceAt(west, -8, T, 1);
    const e = signs.make('IT', { style: 'panel', size: 60, sub: 'INFORMATION TECHNOLOGY' });
    signs.place(e, f.x + f.nx * 0.03, y0 + 4.1, f.z + f.nz * 0.03, 0.8, f.ry);
  }
  pool.add(46, y0 + 4, -10, 0xf0f4ff, 26);
  pool.add(56.4, y0 + 2.8, -8.0, 0xfff4e0, 14);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 20, west: the watcher room and Recycling 20.
// ---------------------------------------------------------------------------
function watcher({ pool, signs }) {
  const k = new Kit('top/watcher');
  const y0 = C.floorY(20), yc = y0 + C.ROOM_H;
  const r = makeRng(2020);

  // ---- a solid block, cut open on two small rooms
  const wx0 = -63.9, wx1 = -54.5, wh = 3.1; // watcher opening
  const nx0 = -73.2, nx1 = -64.4, nh = 3.3; // nook opening
  const bx1 = -50.1; // block's east face = recycling's west wall
  const face = (x0, x1, a, b) => k.bb('matte', x0, y0 + a, -0.3, x1, y0 + b, 0.01, SECTION);
  face(-74.95, bx1, nh, C.ROOM_H);
  face(-74.95, nx0, 0, nh);
  face(nx1, wx0, 0, nh);
  face(wx0, wx1, wh, nh);
  face(wx1, bx1, 0, nh);
  k.bb('matte', wx1, y0, -11.3, bx1, yc, -0.3, '#7f7b6d');
  k.bb('matte', -74.5, y0 + nh, -11.3, wx1, yc, -0.3, '#8f8c85');

  // the watcher room: dark, low, lit by its monitor bank
  const dark = '#1f2428';
  const wz = -9.6;
  k.bb('matte', nx1, y0, wz - 0.3, wx1, y0 + wh, wz, dark);
  k.bb('matte', nx1, y0, wz, wx0, y0 + nh, -0.3, dark);
  k.bb('matte', wx0, y0 + wh, wz, wx1, y0 + wh + 0.2, -0.3, '#181c1f');
  pad(k, wx0, wx1, wz, -0.3, y0, '#262b2e');
  const bank = toTexture(monitorBankCanvas(512, 288, 4, 3), { repeat: false });
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) k.box('matte', -60.2 + 0.25 + i * 0.5, y0 + 0.9 + 0.2 + j * 0.4, -9.15, 0.54, 0.44, 0.9, '#2b302f');
  }
  k.mesh(screen(bank, -59.2, y0 + 1.5, -8.68, 2.0, 1.2, 0, 1.6, 'top/watcher/crtbank'));
  k.bb('matte', -60.4, y0, -8.6, -58.0, y0 + 0.78, -7.9, '#2a2f2e');
  P.chair(k, -59.0, y0, -7.6, Math.PI, { color: '#2a2e2d' });
  // a small panel of indicator lamps on the side wall
  k.box('matte', wx0 + 0.02, y0 + 1.85, -6.3, 0.04, 1.1, 1.1, '#2c3236');
  for (const [dz, dy] of [[-0.3, 0.05], [0.3, -0.05], [0.05, 0.3], [-0.05, -0.3]]) {
    k.box('glow', wx0 + 0.05, y0 + 1.85 + dy, -6.3 + dz, 0.01, 0.22, 0.24, col('#eef2ea', 3));
  }
  pool.add(-59.2, y0 + 2.0, -7.2, 0x9ff0b8, 10);

  // the nook beside it: grey, a few bins
  const nz = -6.5;
  k.bb('matte', -74.5, y0, nz - 0.3, nx1, y0 + nh, nz, '#a9a69c');
  k.bb('matte', nx1 - 0.02, y0, nz, nx1, y0 + nh, -0.3, '#a9a69c');
  pad(k, -74.9, nx1, nz, -0.3, y0, '#9e9b93');
  for (const [x, z] of [[-70.5, -3.6], [-69.4, -3.1], [-68.35, -3.5]]) bin(k, x, y0, z, '#1f2324');

  // ---- Recycling 20
  const wall = '#8f8b7e', teal = '#3d7c78', bz = -11.0;
  k.bb('matte', bx1, y0, bz - 0.3, -20.5, yc, bz, wall);
  k.bb('matte', bx1, y0 + 1.05, bz + 0.02, -20.7, y0 + 1.32, bz + 0.06, teal);
  k.bb('matte', bx1, y0 + 1.05, bz, bx1 + 0.04, y0 + 1.32, -0.3, teal);
  k.bb('matte', -21, y0, bz, -20.7, yc, -3.2, wall);
  k.bb('matte', -21, y0 + 2.6, -3.2, -20.7, yc, 0, wall);
  cap(k, -21, -20.7, y0, yc);
  pad(k, bx1, -20.7, bz, 0, y0, '#8a8276');
  k.rod('metal', [bx1 + 0.2, y0 + 6.0, bz + 0.25], [-21.2, y0 + 6.0, bz + 0.25], 0.08, '#6f7272', 8);
  // a square chute from above into a pyramid hopper, a bin beneath it
  const cx = -43.5, cz = -7.5;
  k.box('metal', cx, (y0 + 2.72 + yc) / 2, cz, 1.1, yc - y0 - 2.72, 1.1, '#6a6e72');
  k.box('metal', cx, y0 + 2.74, cz, 1.34, 0.08, 1.34, '#55595c');
  k.geo('metal', UNIT.cyl(4, 3.0), cx, y0 + 2.03, cz, '#62666a', 0.31, 1.34, 0.31, 0, Math.PI / 4, 0);
  k.cyl('metal', cx, y0 + 1.14, cz, 0.16, 0.24, '#55595c', 10);
  // linear fixtures on wires
  for (const x of [-46.0, -38.6, -31.2]) barLight(k, x, yc, -8, 3.1, { drop: 2.25 });
  // chalkboard of notes, and the sign above it
  k.bb('wood', -42.6, y0 + 1.58, bz + 0.02, -38.9, y0 + 3.03, bz + 0.05, '#5a4a38');
  const notes = signs.custom(420, 170, (ctx, x, y, w, h) => {
    ctx.fillStyle = '#1f2a24';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(232,234,224,0.8)';
    ctx.lineWidth = 3;
    const rr = makeRng(20);
    for (let row = 0; row < 7; row++) {
      let cx0 = x + 22;
      const cy = y + 20 + row * 21;
      const end = x + w - 30 - rr() * 150;
      while (cx0 < end) {
        const seg = 12 + rr() * 34;
        ctx.beginPath();
        ctx.moveTo(cx0, cy + (rr() - 0.5) * 2);
        ctx.lineTo(Math.min(end, cx0 + seg), cy + (rr() - 0.5) * 2);
        ctx.stroke();
        cx0 += seg + 8 + rr() * 6;
      }
    }
  });
  signs.place(notes, -40.75, y0 + 2.3, bz + 0.07, 1.33);
  const e = signs.make('RECYCLING 20', { style: 'panel', size: 56, bg: '#3d4243' });
  signs.place(e, -38.6, y0 + 3.95, bz + 0.03, 0.62);
  // seventeen bins (three sit in the nook)
  const binCols = ['#2c6662', '#2c6662', '#3a3e3f', '#2a5a57', '#45494a'];
  const spots = [
    [-48.1, -8.6], [-46.1, -8.6], [-41.7, -8.6], [-39.1, -8.6], [-37.0, -8.6], [-34.5, -8.6], [-31.9, -8.6], [-29.8, -8.6], [-27.6, -8.6],
    [cx, cz], [-47.6, -3.0], [-45.1, -3.0], [-42.7, -3.0], [-40.3, -3.0],
  ];
  for (const [x, z] of spots) bin(k, x, y0, z, r.pick(binCols));
  // parts shelves
  for (let i = 0; i < 4; i++) {
    const x = -32.9 + i * 2.6;
    P.shelf(k, x, y0, -10.35, 0, { w: 2.5, h: 2.8, d: 0.8, levels: 4, color: '#8e9290', rng: r, fill: 0.7, palette: ['#8a8d8a', '#6b6e6c', '#a0a39f', '#7a5a3a', '#4f6a6a'] });
    for (let n = 0; n < 4; n++) k.cylR('metal', x - 0.8 + n * 0.5, y0 + 1.05, -10.35, 0.07, 0.6, '#9a9d9a', Math.PI / 2, 0, 0, 8);
  }
  // a kiosk by the door and the intake desk
  k.bb('wood', -50.05, y0, -5.0, -48.95, y0 + 1.95, -3.6, '#3b2f27');
  k.bb('wood', -49.95, y0 + 0.2, -3.6, -49.05, y0 + 1.7, -3.57, '#4a3b30');
  k.bb('metal', -49.75, y0 + 1.95, -4.5, -49.2, y0 + 2.2, -4.1, '#4a4d4c');
  k.box('glow', -49.45, y0 + 2.12, -4.09, 0.12, 0.05, 0.01, col('#ffb347', 3));
  // a white chest against the back wall, behind the bins
  k.bb('matte', -36.7, y0, -10.95, -35.2, y0 + 1.1, -10.15, '#d9d8d1');
  k.bb('matte', -36.75, y0 + 1.1, -11.0, -35.15, y0 + 1.16, -10.1, '#c8c7bf');
  k.bb('metal', -36.4, y0 + 0.85, -10.14, -35.5, y0 + 0.9, -10.1, '#8a8c8a');
  P.crtDesk(k, -27.2, y0, -4.2, 0, { desk: '#5e615c' });
  pool.add(-38.6, y0 + 4, -6, 0xffe4bf, 22);
  pool.add(-28, y0 + 4, -6, 0xffe4bf, 14);
  return k.finish(roomMats());
}
