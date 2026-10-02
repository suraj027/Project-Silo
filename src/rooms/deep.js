import * as THREE from 'three';
import { Kit, Batch, UNIT, col, extrude, roundRectShape } from '../core/geom.js';
import { MATS, TEX } from '../core/materials.js';
import { toTexture, makeCanvas, stencilBandCanvas } from '../core/textures.js';
import { makeRng, fbm, smooth, lerp } from '../core/rng.js';
import * as C from '../core/constants.js';
import { Wisps } from '../world/fx.js';
import { P, Signs, shell, screen, surfaceViewTexture, roomMats, SECTION } from './common.js';

// ---------------------------------------------------------------------------
// Down Deep: supply (110), the barricade (130), a small home (140), the
// workshop and mechanical cafeteria (144), then the generator hall and pump
// room under the bottom slab and the flooded cavern below the foundations.
// ---------------------------------------------------------------------------

const TAU = Math.PI * 2;
const HALF = Math.PI / 2;
const CORE = new THREE.Color('#ff7a2a').multiplyScalar(3.4);
const SLOT = new THREE.Color('#ffe2b0').multiplyScalar(3.2);
const SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';

export function buildDeep({ pool }) {
  const group = new THREE.Group();
  group.name = 'rooms/deep';
  const dyn = new THREE.Group();
  dyn.name = 'rooms/deep/dyn';
  const updaters = [];
  const signs = new Signs('deep');
  // generator state; `glow` and `spin` ease towards `on` so machines wind down
  const power = { on: true, glow: 1, spin: 1, spots: [], hooks: [] };
  const ctx = { pool, signs, dyn, updaters, power };
  for (const make of [supply, barricade, apartment, workshop, mechcafe, hall, digger]) group.add(make(ctx));
  group.add(signs.mesh());
  const update = (dt, t) => {
    const want = power.on ? 1 : 0;
    power.glow += (want - power.glow) * Math.min(1, dt * 3);
    power.spin += (want - power.spin) * Math.min(1, dt * 0.7);
    if (!power.on && power.spin < 0.002) power.spin = 0;
    for (const u of updaters) u(dt, t);
  };
  const setPower = (on) => {
    power.on = !!on;
    for (const [s, base] of power.spots) s.intensity = power.on ? base : 0;
    for (const h of power.hooks) h(power.on);
  };
  return { group, dyn, update, setPower };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Register a light spot and return it so its intensity can change later. */
function spot(pool, x, y, z, color, intensity) {
  pool.add(x, y, z, color, intensity);
  return pool.spots[pool.spots.length - 1];
}

const waterMat = (color) => {
  const m = MATS.water.clone();
  m.vertexColors = false;
  m.color.set(color);
  m.normalMap = MATS.water.normalMap.clone();
  m.normalMap.needsUpdate = true;
  return m;
};

/** Points along a wire hung from a to b, sagging by `drop` in the middle. */
function sag(a, b, drop, n = 8) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t - Math.sin(t * Math.PI) * drop, a[2] + (b[2] - a[2]) * t]);
  }
  return pts;
}

function wire(k, pts, r = 0.012, color = '#1b1b1b', seg = 3) {
  for (let i = 0; i < pts.length - 1; i++) k.rod('metal', pts[i], pts[i + 1], r, color, seg);
}

/** Bare bulb in a wire cage, centred on (x, y, z). */
function cagedBulb(k, x, y, z, { color = '#fff1d6', power = 5, stem = 0.25 } = {}) {
  k.cyl('metal', x, y + 0.1, z, 0.05, 0.08, '#2a2c2d', 8);
  if (stem) k.cyl('metal', x, y + 0.18, z, 0.012, stem, '#1e1f20', 4);
  k.sphere('glow', x, y, z, 0.075, col(color, power), 8, 6);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU + 0.4;
    k.rod('metal', [x + Math.cos(a) * 0.12, y + 0.11, z + Math.sin(a) * 0.12], [x + Math.cos(a) * 0.1, y - 0.15, z + Math.sin(a) * 0.1], 0.007, '#2a2c2d', 3);
  }
  k.geo('metal', UNIT.torus(0.08, 4, 12), x, y - 0.02, z, '#2a2c2d', 0.13, 0.13, 0.13, HALF, 0, 0);
}

/**
 * Displaced grid surface. `fn(u, v)` returns [x, y, z, r, g, b]; every quad is
 * wound so its normal agrees with `face(x, y, z)` (the side meant to be seen).
 */
function gridGeo(nu, nv, fn, face) {
  const Pos = [], Col = [], I = [];
  for (let j = 0; j <= nv; j++) {
    for (let i = 0; i <= nu; i++) {
      const q = fn(i / nu, j / nv);
      Pos.push(q[0], q[1], q[2]);
      Col.push(q[3] ?? 1, q[4] ?? q[3] ?? 1, q[5] ?? q[3] ?? 1);
    }
  }
  const A = new THREE.Vector3(), B = new THREE.Vector3(), Cc = new THREE.Vector3(), D = new THREE.Vector3();
  const id = (i, j) => j * (nu + 1) + i;
  for (let j = 0; j < nv; j++) {
    for (let i = 0; i < nu; i++) {
      const a = id(i, j), b = id(i + 1, j), c = id(i + 1, j + 1), d = id(i, j + 1);
      A.fromArray(Pos, a * 3);
      B.fromArray(Pos, b * 3);
      Cc.fromArray(Pos, c * 3).sub(A);
      D.fromArray(Pos, d * 3).sub(B);
      const n = Cc.cross(D); // diagonals: robust even where a == b
      const f = face(A.x, A.y, A.z);
      if (n.x * f[0] + n.y * f[1] + n.z * f[2] >= 0) I.push(a, b, c, a, c, d);
      else I.push(a, c, b, a, d, c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(Pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(Col, 3));
  g.setIndex(I);
  g.computeVertexNormals();
  return g;
}

/**
 * Flat, upward-facing floor over one side of a level: |x| >= x0 and
 * -back <= z <= 0, clipped by the shell. For a ceiling, build the other side
 * and turn it half over about z (rz = PI): it lands on side `s`, facing down.
 */
function floorGeo(s, x0, back, R = C.R_IN - 0.05, n = 32) {
  const a1 = Math.asin(Math.min(1, back / R));
  const pts = [new THREE.Vector2(s * x0, 0)];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * a1;
    pts.push(new THREE.Vector2(s * R * Math.cos(a), R * Math.sin(a)));
  }
  pts.push(new THREE.Vector2(s * x0, back));
  const g = new THREE.ShapeGeometry(new THREE.Shape(pts));
  g.rotateX(-HALF); // shape y is -z
  return g;
}

/**
 * Curved wall on radius R facing the silo axis, from angle a0 to a1
 * (atan2(z, x)), y0..y1. UVs are in units of `tile`.
 */
function curvedWall(R, a0, a1, y0, y1, { n = 48, tile = 1 } = {}) {
  const Pos = [], Nor = [], Uv = [], I = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n, c = Math.cos(a), s = Math.sin(a);
    const u = (R * Math.abs(a - a0)) / tile;
    Pos.push(c * R, y0, s * R, c * R, y1, s * R);
    Nor.push(-c, 0, -s, -c, 0, -s);
    Uv.push(u, 0, u, (y1 - y0) / tile);
  }
  const up = a1 > a0;
  for (let i = 0; i < n; i++) {
    const a = i * 2, b = a + 1, c = a + 2, d = a + 3;
    if (up) I.push(a, c, b, b, c, d);
    else I.push(a, b, c, b, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(Pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(Nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(Uv, 2));
  g.setIndex(I);
  return g;
}

/** Rounded door surround (w x h opening, bottom at y = 0), extruded along +z. */
function doorFrameGeo(w, h, t = 0.14, rr = 0.26, depth = 0.08) {
  const s = roundRectShape(w + 2 * t, h + t, rr + t * 0.6, 0, (h + t) / 2);
  s.holes.push(roundRectShape(w, h - 0.02, rr, 0, h / 2 + 0.01));
  return extrude(s, depth, false, 6);
}

function doorLeafGeo(w, h, rr = 0.26, depth = 0.04) {
  return extrude(roundRectShape(w, h - 0.02, rr, 0, h / 2 + 0.01), depth, false, 6);
}

/** Dark brick courses for the generator hall. */
function brickCanvas(size = 256, seed = 5) {
  const c = makeCanvas(size, size);
  const ctx = c.getContext('2d');
  const r = makeRng(seed);
  ctx.fillStyle = '#56524b';
  ctx.fillRect(0, 0, size, size);
  const rows = 8, bh = size / rows, bw = size / 4;
  for (let j = 0; j < rows; j++) {
    const off = (j % 2) * (bw / 2);
    for (let i = -1; i < 5; i++) {
      const v = 104 + Math.floor(r() * 22);
      ctx.fillStyle = `rgb(${v + 5},${v},${v - 7})`;
      ctx.fillRect(i * bw + off + 2, j * bh + 2, bw - 4, bh - 4);
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(i * bw + off + 2, j * bh + bh - 6, bw - 4, 4);
    }
  }
  return c;
}

/** Pill-shaped sign with one or two lines of text. */
function pillSign(signs, lines, { bg = '#2d5a57', fg = '#eef2ec', w = 440, h = 132 } = {}) {
  return signs.custom(w, h, (ctx, x, y) => {
    const rr = h / 2;
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.lineTo(x + w - rr, y);
    ctx.arc(x + w - rr, y + rr, rr, -HALF, HALF);
    ctx.lineTo(x + rr, y + h);
    ctx.arc(x + rr, y + rr, rr, HALF, 3 * HALF);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = fg;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `800 ${Math.round(h * 0.3)}px ${SANS}`;
    lines.forEach((t, i) => ctx.fillText(t, x + w / 2, y + h * (0.5 + (i - (lines.length - 1) / 2) * 0.34)));
  });
}

// ---------------------------------------------------------------------------
// Level 110, west: supply. Tall black racks fill the floor in five rows; a
// chain-link parts cage stands behind the front two on the landing side.
// ---------------------------------------------------------------------------
function supply({ pool, signs }) {
  const k = new Kit('deep/supply');
  const y0 = C.floorY(110), yc = y0 + C.ROOM_H;
  const r = makeRng(11010);
  const back = 48;
  shell(k, { s: -1, y0, x0: 20.8, back, wall: '#77736a' });
  k.geo('matte', floorGeo(-1, 20.8, back), 0, y0 + 0.02, 0, '#5b5a55');
  k.geo('matte', floorGeo(1, 20.8, back), 0, yc - 0.02, 0, '#2c2c2a', 1, 1, 1, 0, 0, Math.PI);
  // dark lining on the curve of the shell inside the room
  k.geo('matte', curvedWall(74.85, -Math.PI + 0.002, Math.atan2(-back, -Math.sqrt(C.R_IN ** 2 - back * back)), y0, yc, { n: 32 }), 0, 0, 0, '#4a463e');
  const stock = ['#3f8f8f', '#3f8f8f', '#3f8f8f', '#4a9a98', '#b89a6a', '#b89a6a', '#c8a878', '#8a4a32', '#6a6c6a', '#c8b690'];
  const spoolC = ['#d8d8d4', '#d8d8d4', '#e3dccb', '#c9a13b', '#d0b04a'];

  // upright cable spool: two flanges round a wound core
  const spool = (x, y, z, rr, h, c) => {
    k.cyl('matte', x, y, z, rr, 0.05, '#bdb6a4', 12);
    k.cyl('matte', x, y + 0.05, z, rr * 0.78, h - 0.1, c, 12);
    k.cyl('matte', x, y + h - 0.05, z, rr, 0.05, '#bdb6a4', 12);
  };

  // racks: 3.2 wide, 5.4 tall, five beam levels, loosely stocked so the rows
  // behind show through
  const RW = 3.2, RD = 1.0, RH = 5.4, post = '#2a2c2d', board = '#3b3d3e';
  const lv = [0.14, 1.44, 2.74, 4.04, 5.34];
  // the field is swung a few degrees about its east end, so the far rows run back
  const PX = -24, PZ = -3, RT = -0.09;
  const at = (lx, lz) => {
    const dx = lx - PX, dz = lz - PZ;
    return [PX + dx * Math.cos(RT) + dz * Math.sin(RT), PZ - dx * Math.sin(RT) + dz * Math.cos(RT)];
  };
  const rack = (lx, lz) => {
    const [x, z] = at(lx, lz);
    k.push(x, y0, z, RT);
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) k.box('metal', sx * (RW / 2 - 0.05), RH / 2, sz * (RD / 2 - 0.04), 0.07, RH, 0.07, post);
      for (let i = 0; i < 3; i++) {
        const ya = 0.3 + i * 1.7, yb = ya + 1.6;
        k.beam('metal', [sx * (RW / 2 - 0.05), ya, (i % 2 ? 1 : -1) * (RD / 2 - 0.06)], [sx * (RW / 2 - 0.05), yb, (i % 2 ? -1 : 1) * (RD / 2 - 0.06)], 0.025, 0.025, post);
      }
    }
    for (const yy of lv) {
      k.box('metal', 0, yy, 0, RW - 0.06, 0.03, RD, board);
      k.box('metal', 0, yy + 0.02, RD / 2 - 0.02, RW - 0.06, 0.08, 0.03, post);
      k.box('metal', 0, yy + 0.02, -RD / 2 + 0.02, RW - 0.06, 0.08, 0.03, post);
    }
    for (let i = 0; i < lv.length; i++) {
      const base = lv[i] + 0.02, clear = i < lv.length - 1 ? lv[i + 1] - lv[i] - 0.12 : 0.4;
      if (i === 0 && r() < 0.6) {
        // cable spools standing on the bottom beam, with a box between
        const n = 1 + Math.floor(r() * 3);
        const slots = [-1.05, -0.35, 0.35, 1.05].sort(() => r() - 0.5).slice(0, n);
        for (const sx of slots) spool(sx + (r() - 0.5) * 0.1, base, (r() - 0.5) * 0.2, 0.28 + r() * 0.1, 0.5 + r() * 0.25, r.pick(spoolC));
        if (n < 3 && r() < 0.7) {
          const free = [-1.05, -0.35, 0.35, 1.05].find((v) => !slots.includes(v));
          const bh = 0.4 + r() * 0.35;
          k.box('matte', free, base + bh / 2, 0, 0.62, bh, 0.7, col(r.pick(stock), 0.8 + r() * 0.3));
        }
        continue;
      }
      if (i === lv.length - 1) {
        // the top beam carries little: now and then a pair of dark canisters
        if (r() < 0.35) for (const dx of [0, 0.3]) k.cyl('matte', -RW / 2 + 0.5 + r() * 1.6 + dx, base, -0.15, 0.1, 0.36, '#2a2c2e', 8);
        continue;
      }
      let cx = -RW / 2 + 0.06 + r() * 0.25;
      while (cx < RW / 2 - 0.35) {
        const bw = 0.45 + r() * 0.45;
        if (cx + bw > RW / 2 - 0.06) break;
        const q = r();
        const z = (r() - 0.5) * 0.2;
        if (q < 0.07 && clear > 0.5) {
          // a rust drum on its side, round end to the aisle
          const rr = Math.min(0.28, clear * 0.45);
          k.cylR('matte', cx + bw / 2, base + rr, z, rr, 0.62, col('#8a4a32', 0.85 + r() * 0.3), HALF, 0, 0, 12);
        } else if (q < 0.13) {
          k.box('matte', cx + bw / 2, base + 0.14, z, Math.min(bw, 0.34), 0.28, 0.3, col('#c9a13b', 0.9 + r() * 0.2));
        } else if (q < 0.8) {
          const bh = Math.min(clear, 0.38 + r() * 0.42), bd = 0.5 + r() * 0.35;
          k.box('matte', cx + bw / 2, base + bh / 2, z, bw * 0.92, bh, bd, col(r.pick(stock), 0.8 + r() * 0.3));
        }
        cx += bw + 0.06 + r() * 0.3;
      }
    }
    k.pop();
  };
  const X0 = -65.6;
  const rows = [[-3.0, 13], [-9.8, 13], [-16.6, 8], [-23.4, 8], [-29.0, 10]];
  for (const [z, n] of rows) for (let i = 0; i < n; i++) rack(X0 + RW / 2 + i * RW, z);
  // painted aisle lines
  for (const [z, xa] of [[-3.95, -24], [-8.85, -24], [-10.75, -24], [-15.65, -24], [-17.55, -40], [-22.45, -40], [-24.35, -33.6], [-28.05, -33.6]]) {
    const [cx, cz] = at((X0 - 0.4 + xa) / 2, z);
    k.box('matte', cx, y0 + 0.03, cz, xa - X0 + 0.4, 0.01, 0.1, '#b59a3a', RT);
  }
  for (let x = -21.6; x > -72; x -= 1.6) k.bb('matte', x - 1.0, y0 + 0.025, -1.28, x, y0 + 0.035, -1.16, '#c9c3a8');
  // stepladder in the first aisle
  const [ldx, ldz] = at(-55.2, -6.4);
  k.push(ldx, y0, ldz, 0.3 + RT);
  for (const s of [-1, 1]) {
    k.beam('metal', [s * 0.28, 0, 0.45], [s * 0.24, 2.1, 0], 0.05, 0.05, '#b8942e');
    k.beam('metal', [s * 0.28, 0, -0.55], [s * 0.24, 2.1, 0], 0.04, 0.04, '#8a8d8e');
  }
  for (let i = 1; i <= 5; i++) k.box('metal', 0, i * 0.38, 0.45 - (i * 0.38 * 0.45) / 2.1, 0.52, 0.04, 0.16, '#8a8d8e');
  k.pop();

  // the cage: chain-link panels on steel posts
  const cx0 = -37.5, cx1 = -21.7, cz0 = -27.7, cz1 = -14.6, ch = 3.4;
  const gateX = -25.5;
  const front = [];
  for (let i = 0; i <= 6; i++) front.push([cx0 + (i / 6) * (cx1 - cx0), cz1]);
  front.splice(5, 0, [gateX, cz1]);
  const back2 = [];
  for (let i = 0; i <= 6; i++) back2.push([cx1 - (i / 6) * (cx1 - cx0), cz0]);
  const side = (x) => [
    [x, cz1 - (cz1 - cz0) / 3],
    [x, cz1 - (2 * (cz1 - cz0)) / 3],
  ];
  const loop = [...front, ...side(cx1), ...back2, ...side(cx0).reverse(), front[0]];
  const chain = new Batch();
  const white = new THREE.Color(1, 1, 1);
  const panel = (ax, az, bx, bz, ya, yb) => {
    const len = Math.hypot(bx - ax, bz - az);
    // normal agrees with the a-b-c winding so DoubleSide lighting flips correctly
    const nx = -(bz - az) / len, nz = (bx - ax) / len;
    const a = chain.vert(ax, ya, az, nx, 0, nz, 0, ya - y0, white);
    const b = chain.vert(bx, ya, bz, nx, 0, nz, len, ya - y0, white);
    const c = chain.vert(bx, yb, bz, nx, 0, nz, len, yb - y0, white);
    const d = chain.vert(ax, yb, az, nx, 0, nz, 0, yb - y0, white);
    chain.tri(a, b, c);
    chain.tri(a, c, d);
  };
  const postC = '#6a6e70', railC = '#7a7e80';
  for (const [x, z] of loop.slice(0, -1)) {
    k.cyl('metal', x, y0, z, 0.05, ch + 0.06, postC, 8);
    k.sphere('metal', x, y0 + ch + 0.08, z, 0.06, postC, 6, 4);
  }
  for (let i = 0; i < loop.length - 1; i++) {
    const [ax, az] = loop[i], [bx, bz] = loop[i + 1];
    const gate = bx === gateX && az === cz1;
    const e = gate ? 0.07 : 0;
    panel(ax + e, az, bx - e, bz, y0 + (gate ? 0.12 : 0.06), y0 + ch - (gate ? 0.14 : 0.04));
    for (const yy of gate ? [0.1, 1.7, ch - 0.12] : [0.08, ch]) k.rod('metal', [ax + e, y0 + yy, az], [bx - e, y0 + yy, bz], 0.022, railC, 5);
    if (gate) {
      for (const x of [ax + e, bx - e]) k.rod('metal', [x, y0 + 0.1, az], [x, y0 + ch - 0.12, az], 0.022, railC, 5);
      k.box('metal', bx - 0.2, y0 + 1.12, az + 0.07, 0.09, 0.12, 0.05, '#c9a13b');
      k.geo('metal', UNIT.torus(0.2, 4, 10, Math.PI), bx - 0.2, y0 + 1.18, az + 0.07, '#9a9d9e', 0.035, 0.035, 0.035);
    }
  }
  const chainTex = TEX.chain.clone();
  chainTex.repeat.set(0.9, 0.9);
  chainTex.needsUpdate = true;
  const chainMat = new THREE.MeshStandardMaterial({ name: 'deep/chainlink', map: chainTex, alphaTest: 0.5, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.5, color: '#aeb2b4' });
  const fence = new THREE.Mesh(chain.build(), chainMat);
  fence.name = 'deep/supply/cage';
  fence.castShadow = fence.receiveShadow = true;
  k.mesh(fence);

  // inside the cage: shelves of bolts, sealed cartons, a stock terminal
  const carton = (x, y, z, w, h, d, ry = 0, label = true) => {
    k.box('matte', x, y + h / 2, z, w, h, d, col('#b88d55', 0.85 + r() * 0.25), ry);
    k.box('matte', x, y + h + 0.004, z, w * 0.18, 0.008, d + 0.01, '#d9cfa8', ry);
    if (label) k.box('matte', x, y + h * 0.6, z + d / 2 + 0.003, w * 0.4, h * 0.25, 0.004, '#ece8dc');
  };
  const boltShelf = (x, z, ry) => {
    const w = 2.7, d = 0.6, bl = [0.1, 0.8, 1.5, 2.2];
    k.push(x, y0, z, ry);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) k.box('metal', sx * (w / 2 - 0.03), 1.15, sz * (d / 2 - 0.03), 0.05, 2.3, 0.05, '#4a4d4e');
    for (const yy of bl) k.box('metal', 0, yy, 0, w, 0.035, d, '#4a4d4e');
    for (const i of [1, 2]) {
      const bc = i === 1 ? '#9a9d9a' : '#b09050';
      for (let t = 0; t < 4; t++) {
        const tx = -0.98 + t * 0.65;
        k.box('metal', tx, bl[i] + 0.05, 0, 0.56, 0.07, 0.42, '#5f6462');
        for (let b = 0; b < 6; b++) {
          const bx = tx - 0.16 + (b % 3) * 0.16, bz = -0.08 + Math.floor(b / 3) * 0.16;
          k.cyl('metal', bx, bl[i] + 0.085, bz, 0.013, 0.07, bc, 4);
          k.cyl('metal', bx, bl[i] + 0.155, bz, 0.026, 0.02, bc, 6);
        }
      }
    }
    for (const i of [0, 3]) {
      let cx = -w / 2 + 0.1;
      while (cx < w / 2 - 0.5) {
        const cw = 0.4 + r() * 0.2;
        carton(cx + cw / 2, bl[i] + 0.02, 0, cw, 0.3 + r() * 0.25, 0.45);
        cx += cw + 0.05;
      }
    }
    k.pop();
  };
  for (const x of [-35.8, -32.9, -30, -27.1]) boltShelf(x, -27.2, 0);
  for (const z of [-24.2, -20.6]) boltShelf(-37, z, HALF);
  for (const [x, z, h] of [[-33.4, -21.2, 3], [-31.2, -22.8, 2], [-34.2, -18.2, 2], [-30.6, -19.4, 3]]) {
    for (let j = 0; j < h; j++) carton(x + (r() - 0.5) * 0.1, y0 + j * 0.5, z, 0.7, 0.48, 0.55, (r() - 0.5) * 0.2, false);
  }
  P.crtDesk(k, -27.4, y0, -16.2, 0, { desk: '#4a4d4e' });

  // round lamps between the rows and conduits along the slab edge
  for (const lx of [-62, -54, -46, -38, -30]) {
    for (const lz of [-6.4, -13.2, -20.0, -26.2]) {
      const [x, z] = at(lx, lz);
      k.cyl('metal', x, yc - 0.16, z, 0.55, 0.14, '#2e2f30', 16);
      k.cyl('glow', x, yc - 0.18, z, 0.45, 0.03, col('#f4f6f2', 3.4), 16);
    }
  }
  k.rod('metal', [-21, yc - 0.35, -1.5], [-74.4, yc - 0.35, -1.5], 0.12, '#4d4f4c', 8);
  k.rod('metal', [-21, yc - 0.55, -2.2], [-74.3, yc - 0.55, -2.2], 0.08, '#5d5f5c', 8);

  signs.place(signs.make('SUPPLY 110', { style: 'panel', size: 60 }), -42, y0 + 4.7, -back + 0.05, 0.8);
  rows.forEach(([z, n], i) => {
    const [xe, ze] = at(X0 + n * RW + 0.03, z);
    signs.place(signs.make(`ROW ${'ABCDE'[i]}`, { style: 'light', size: 40 }), xe, y0 + 4.85, ze, 0.32, HALF + RT);
  });
  signs.place(signs.make('PARTS CAGE', { style: 'light', size: 44, sub: 'SIGN FOR EVERY ITEM' }), -30.3, y0 + 2.6, cz1 + 0.06, 0.55);
  pool.add(-50, y0 + 5.6, -8, 0xe6ecef, 22);
  pool.add(-30, y0 + 5, -20, 0xe6ecef, 18);
  pool.add(-58, y0 + 5.6, -20, 0xe6ecef, 16);
  pool.add(-34, y0 + 4.5, -6, 0xeef0f0, 12);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 130, east: the barricade. A welded plate wall closes the corridor
// from the landing out to x = 45; the corridor wall carries on beyond it.
// ---------------------------------------------------------------------------
function barricade({ pool, signs, dyn, updaters }) {
  const k = new Kit('deep/barricade');
  const y0 = C.floorY(130), yc = y0 + C.ROOM_H;
  const r = makeRng(13030);
  const wall = '#6e6a61', bz = -6.2;
  const bx0 = 19.4, bx1 = 46.1;
  const { xEnd } = shell(k, { s: 1, y0, x0: bx0, back: -bz, wall, floor: '#57534c', innerWall: false });
  k.geo('matte', floorGeo(-1, bx0, -bz), 0, yc - 0.02, 0, '#353431', 1, 1, 1, 0, 0, Math.PI);

  // the plate wall: twelve uneven columns of welded plates, nine courses high
  const colX = [bx0, 21.6, 23.9, 25.9, 28.1, 30.05, 31.95, 34.2, 36.4, 38.5, 40.8, 43.4, bx1];
  const rows = 9, ph = C.ROOM_H / rows;
  const fz = bz + 0.1;
  const plates = ['#3a3d41', '#45474a', '#4f5053', '#34373a', '#4a4b4d', '#55504a', '#5a4436'];
  const dc = 5, dX0 = colX[dc], dX1 = colX[dc + 1], dXc = (dX0 + dX1) / 2, dT = 3 * ph;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < colX.length - 1; i++) {
      if (i === dc && j < 3) continue;
      const pw = colX[i + 1] - colX[i];
      const cx = (colX[i] + colX[i + 1]) / 2, cy = y0 + (j + 0.5) * ph;
      k.box('metal', cx + (r() - 0.5) * 0.06, cy + (r() - 0.5) * 0.05, fz + (r() - 0.5) * 0.04, pw - 0.06, ph - 0.04, 0.08, col(r.pick(plates), 0.85 + r() * 0.3), (r() - 0.5) * 0.03, 0, (r() - 0.5) * 0.03);
      for (const s of [-1, 1]) k.cylR('metal', cx + s * (pw / 2 - 0.14), cy + ph * 0.32, fz + 0.05, 0.03, 0.03, '#2e2b28', HALF, 0, 0, 6);
    }
  }
  // weld beads, picked out pale against the plates
  const seam = '#8c8b86';
  for (let j = 1; j < rows; j++) {
    const y = y0 + j * ph;
    const runs = j < 3 ? [[bx0, dX0], [dX1, bx1]] : [[bx0, bx1]];
    for (const [a, b] of runs) k.rod('metal', [a, y, fz + 0.045], [b, y, fz + 0.045], 0.026, seam, 5);
  }
  for (let j = 0; j < rows; j++) {
    for (let i = 1; i < colX.length - 1; i++) {
      if ((i === dc || i === dc + 1) && j < 3) continue;
      k.box('metal', colX[i] + (r() - 0.5) * 0.05, y0 + (j + 0.5) * ph, fz + 0.045, 0.05, ph, 0.05, seam);
    }
  }
  for (let i = 0; i < 18; i++) {
    const x = bx0 + 0.4 + r() * (bx1 - bx0 - 0.8);
    if (x > dX0 - 0.2 && x < dX1 + 0.2) continue;
    const len = 0.3 + r() * 0.9;
    k.box('matte', x, y0 + 2.6 + r() * 3.6 - len / 2, fz + 0.05, 0.05 + r() * 0.05, len, 0.006, col('#5a3a26', 0.8 + r() * 0.4));
  }
  // conduit strapped across the plates
  for (const y of [4.95, 2.3]) {
    k.rod('metal', [bx0, y0 + y, fz + 0.12], [bx1, y0 + y, fz + 0.12], 0.05, '#2e3031', 6);
    for (let x = bx0 + 1.2; x < bx1; x += 3.1) k.box('metal', x, y0 + y, fz + 0.1, 0.1, 0.16, 0.1, '#232526');
  }

  // the low door: dark jamb, dark leaf, a pale number plate and a pale wheel
  k.bb('metal', dX0, y0, fz - 0.06, dX0 + 0.28, y0 + dT, fz + 0.07, '#1f1d1b');
  k.bb('metal', dX1 - 0.12, y0, fz - 0.06, dX1, y0 + dT, fz + 0.07, '#2f2c29');
  k.bb('metal', dX0, y0 + dT - 0.12, fz - 0.06, dX1, y0 + dT, fz + 0.07, '#2f2c29');
  k.bb('metal', dX0 + 0.28, y0, fz - 0.05, dX1 - 0.12, y0 + dT - 0.12, fz + 0.04, '#2a2826');
  const wx = dX0 + 0.72 * (dX1 - dX0);
  k.geo('metal', UNIT.torus(0.08, 6, 20), wx, y0 + 1.2, fz + 0.07, '#b0b0a8', 0.22, 0.22, 0.22);
  for (let i = 0; i < 2; i++) k.box('metal', wx, y0 + 1.2, fz + 0.06, 0.42, 0.025, 0.02, '#b0b0a8', 0, 0, i * HALF);
  k.box('matte', dXc + 0.05, y0 + 2.05, fz + 0.06, 0.92, 0.44, 0.02, '#b9b9b4');
  signs.place(signs.make('130', { style: 'light', size: 64, weight: 900 }), dXc + 0.05, y0 + 2.05, fz + 0.075, 0.36);
  // caged bulb high over the door
  k.box('metal', dX0 + 0.8, y0 + 3.8, fz + 0.08, 0.1, 0.1, 0.25, '#2a2c2d');
  cagedBulb(k, dX0 + 0.8, y0 + 3.58, fz + 0.3, { color: '#ffd9a0', power: 5, stem: 0 });

  // caged red warning lamp on the plates (pulses)
  const lx = 38.7, ly = y0 + 4.9;
  k.box('metal', lx, ly, fz + 0.07, 0.34, 0.34, 0.06, '#2a2826');
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU;
    k.rod('metal', [lx + Math.cos(a) * 0.15, ly + Math.sin(a) * 0.15, fz + 0.1], [lx + Math.cos(a) * 0.15, ly + Math.sin(a) * 0.15, fz + 0.44], 0.008, '#2a2c2d', 3);
  }
  k.geo('metal', UNIT.torus(0.06, 4, 16), lx, ly, fz + 0.44, '#2a2c2d', 0.15, 0.15, 0.15);
  const lampC = new THREE.Color('#ff3b2e');
  const lampMat = new THREE.MeshBasicMaterial({ name: 'deep/barricade/warnlamp', color: lampC.clone().multiplyScalar(5) });
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 8), lampMat);
  lamp.position.set(lx, ly, fz + 0.26);
  lamp.name = 'deep/barricade/warnlamp';
  dyn.add(lamp);
  const red = spot(pool, lx, ly + 0.2, bz + 1.3, 0xff3b2e, 30);
  updaters.push((dt, t) => {
    const p = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 3)) ** 2;
    lampMat.color.copy(lampC).multiplyScalar(5 * p); // setRGB would skip the sRGB→linear step
    red.intensity = 30 * (0.55 + 0.45 * p);
  });
  // red sign on its own post in front of the plates
  k.cyl('metal', 34.85, y0, fz + 0.32, 0.04, 3.7, '#2a2826', 6);
  signs.place(signs.make('SEALED', { style: 'red', size: 52, sub: 'NO WAY THROUGH' }), 35.6, y0 + 3.73, fz + 0.37, 0.74);
  // pale hazard placard: a raised hand in a ring
  const halt = signs.custom(192, 128, (ctx, x, y, w, h) => {
    ctx.fillStyle = '#cfccc4';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#2a2b2b';
    ctx.lineWidth = 4;
    ctx.strokeRect(x + 6, y + 6, w - 12, h - 12);
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, 42, 0, TAU);
    ctx.stroke();
    ctx.fillStyle = '#2a2b2b';
    const hx = x + w / 2 - 15;
    ctx.fillRect(hx, y + 64, 30, 26);
    for (let i = 0; i < 4; i++) ctx.fillRect(hx + i * 8, y + 38 + (i === 0 || i === 3 ? 6 : 0), 6, 28);
    ctx.fillRect(hx - 10, y + 68, 12, 8);
  });
  signs.place(halt, 42.6, y0 + 3.3, fz + 0.08, 1.0);

  // sandbags heaped along the base, either side of the door
  const bag = (x, y, z) => k.geo('fabric', UNIT.sphere(10, 6), x, y, z, col('#7e7050', 0.8 + r() * 0.3), 0.34, 0.15, 0.23, 0, (r() - 0.5) * 0.3, 0);
  for (const [a, b] of [[22.3, dX0 - 0.1], [dX1 + 0.1, 40.3]]) {
    const m = Math.floor((b - a) / 0.62);
    const step = (b - a - 0.62) / (m - 1);
    for (let i = 0; i < m; i++) {
      const t = i / (m - 1), heap = 0.55 + 0.45 * Math.sin(t * Math.PI * 2.3 + a);
      bag(a + 0.31 + i * step, y0 + 0.14, fz + 0.34);
      bag(a + 0.4 + i * step, y0 + 0.14, fz + 0.92);
      if (i < m - 1 && heap > 0.3) bag(a + 0.31 + (i + 0.5) * step, y0 + 0.42, fz + 0.62);
      if (i < m - 1 && heap > 0.75) bag(a + 0.31 + i * step + (r() - 0.5) * 0.2, y0 + 0.7, fz + 0.5);
    }
  }
  // poles leaning on the plates in two bundles
  const lean = (x, xt, top, rr, c) => k.rod('metal', [x, y0, fz + 0.75 + r() * 0.35], [xt, y0 + top, fz + 0.1 + rr], rr, c, 8);
  lean(40.7, 40.2, 3.6, 0.055, '#6a3a2e');
  lean(41.0, 40.45, 3.5, 0.07, '#7a4232');
  lean(41.25, 40.7, 3.7, 0.05, '#5e3428');
  lean(41.5, 40.9, 3.3, 0.06, '#704030');
  lean(44.95, 44.3, 3.55, 0.06, '#6a5a50');
  lean(45.3, 44.65, 3.45, 0.05, '#5a5048');
  // gas bottles for the welding set
  for (const [x, z, c] of [[41.9, -5.1, '#3f5f4a'], [42.4, -5.35, '#6b3a2a']]) {
    k.cyl('metal', x, y0, z, 0.14, 1.2, c, 12);
    k.sphere('metal', x, y0 + 1.2, z, 0.14, c, 12, 6);
    k.cyl('metal', x, y0 + 1.3, z, 0.04, 0.12, '#8a8d8e', 6);
  }
  wire(k, sag([41.9, y0 + 1.4, -5.1], [40.8, y0 + 0.1, -4.2], 0.4, 6), 0.012, '#1a1a1a', 4);
  // cartons, toolbox, drum
  P.crate(k, 38.3, y0, -5.3, 0.95, '#6a4a38', 0.05);
  k.box('matte', 39.4, y0 + 0.25, -5.35, 0.7, 0.5, 0.6, '#565a5e', -0.08);
  k.box('metal', 36.65, y0 + 0.22, -5.2, 0.5, 0.44, 0.4, '#2a2b2c', 0.2);
  k.box('metal', 25.2, y0 + 0.14, -3.8, 0.6, 0.28, 0.28, '#a3342b', 0.3);
  P.barrel(k, 26, y0, -2.5, { color: '#4a4d4e' });

  // the corridor beyond: teal wainscot, stencil, boarded doors, a small fan
  k.bb('matte', bx1, y0, bz, xEnd, y0 + 1.6, bz + 0.05, '#3a8683');
  k.bb('matte', bx1, y0 + 1.6, bz, xEnd, y0 + 3.0, bz + 0.03, '#a39c90');
  k.bb('matte', bx1, y0 + 3.0, bz, xEnd, y0 + 3.75, bz + 0.03, '#5c5852');
  k.bb('matte', bx1, y0 + 3.73, bz, xEnd, y0 + 3.79, bz + 0.05, '#2c2b28');
  signs.place(signs.make('LEVEL 130', { style: 'paint', size: 90 }), 50, y0 + 4.8, bz + 0.03, 0.5);
  // boarded doors: pale rounded surrounds, dark leaves strapped with a pale cross
  const dW = 1.36, dH = 2.62, dFrame = doorFrameGeo(dW, dH, 0.1, 0.26), dLeaf = doorLeafGeo(dW, dH, 0.26);
  const strapL = Math.hypot(dW, dH - 0.2);
  for (const dx of [54.1, 67.3]) {
    k.geo('matte', dFrame, dx, y0, bz + 0.02, '#d4d0c6');
    k.geo('matte', dLeaf, dx, y0, bz + 0.06, '#232323');
    for (const s of [-1, 1]) k.box('metal', dx, y0 + dH / 2, bz + 0.115, 0.08, strapL, 0.02, '#8a8a86', 0, 0, s * Math.atan2(dW, dH - 0.2));
    k.box('metal', dx, y0 + dH / 2, bz + 0.12, 0.07, dH - 0.1, 0.02, '#8a8a86');
    k.box('metal', dx, y0 + dH * 0.55, bz + 0.12, dW - 0.06, 0.07, 0.02, '#8a8a86');
  }
  signs.place(halt, 58.8, y0 + 3.45, bz + 0.04, 0.7);
  const fx = 61.1, fy = y0 + 2.3, R = 0.45;
  k.cylR('metal', fx, fy, bz + 0.03, R, 0.06, '#1c1d1e', HALF, 0, 0, 20);
  k.geo('metal', UNIT.torus(0.12, 5, 24), fx, fy, bz + 0.12, '#232526', R, R, R);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU;
    k.rod('metal', [fx, fy, bz + 0.28], [fx + Math.cos(a) * R * 0.95, fy + Math.sin(a) * R * 0.95, bz + 0.24], 0.008, '#2a2c2d', 3);
  }
  const fan = new THREE.Group();
  fan.name = 'deep/barricade/fan';
  const fk = new Kit('deep/barricade/fan');
  const m = new THREE.Matrix4(), mt = new THREE.Matrix4(), mr = new THREE.Matrix4(), ms = new THREE.Matrix4();
  for (let i = 0; i < 4; i++) {
    m.makeRotationZ((i / 4) * TAU).multiply(mt.makeTranslation(0, R * 0.48, 0)).multiply(mr.makeRotationY(0.35)).multiply(ms.makeScale(R * 0.3, R * 0.74, 0.02));
    fk.geoMatrix('metal', UNIT.box(), m, '#4a4d4e');
  }
  fk.cylR('metal', 0, 0, 0.02, 0.08, 0.1, '#2a2c2d', HALF, 0, 0, 10);
  fan.add(fk.finish(roomMats()));
  fan.position.set(fx, fy, bz + 0.16);
  dyn.add(fan);
  updaters.push((dt) => (fan.rotation.z -= dt * 6));
  // darker panel high on the far wall
  k.bb('matte', 61.8, y0 + 4.4, bz, xEnd - 0.3, y0 + 5.8, bz + 0.08, '#4d504b');
  // conduits and lights under the slab
  k.rod('metal', [bx0, yc - 0.3, bz + 0.35], [74.3, yc - 0.3, bz + 0.35], 0.09, '#4a4b4a', 8);
  k.rod('metal', [bx0, yc - 0.22, -0.9], [74.5, yc - 0.22, -0.9], 0.06, '#5a5b58', 6);
  // a rail under the slab with junction boxes, and tube lights hung low off it
  k.rod('metal', [bx0, yc - 0.5, -3.0], [74.3, yc - 0.5, -3.0], 0.04, '#232425', 5);
  for (const x of [52, 57, 62, 67, 72]) k.box('metal', x, yc - 0.62, -3.0, 0.4, 0.26, 0.3, '#1e1f20');
  for (const x of [30, 48, 65.5]) {
    for (const s of [-1, 1]) k.cyl('metal', x + s * 1.2, yc - 0.72, -3.0, 0.01, 0.72, '#1e1f20', 3);
    P.tube(k, x, yc - 0.85, -3.0, 3.0, 0, { power: 3.6 });
  }
  // odds and ends along the corridor
  k.box('matte', 49.05, y0 + 0.3, -5.7, 1.3, 0.6, 0.6, '#55585a', 0.04);
  k.box('matte', 50.3, y0 + 0.28, -5.72, 0.95, 0.56, 0.55, '#6a5038', -0.06);
  pool.add(31, y0 + 3.2, -3.2, 0xfff0d8, 14);
  pool.add(50, y0 + 5, -3.5, 0xeef6ff, 20);
  pool.add(65, y0 + 5, -3.5, 0xeef6ff, 18);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 140, west: a corridor of doors and one small home.
// ---------------------------------------------------------------------------
function apartment({ pool, signs }) {
  const k = new Kit('deep/apartment');
  const y0 = C.floorY(140), yc = y0 + C.ROOM_H;
  const r = makeRng(14040);
  const upper = '#5f5c53', band = '#7c7160', teals = ['#1f4a47', '#255652', '#1d4543', '#2a5c58'];
  // the corridor wall runs 4.3 m behind the cut; the home is recessed to 8.6
  const bz = -4.3, hz = -8.6;
  const xW = -Math.sqrt(C.R_IN ** 2 - bz * bz) - 0.2;
  const xE = -17.4;
  const hx0 = -54, hx1 = -42;
  k.geo('matte', floorGeo(-1, -xE, -bz), 0, y0 + 0.02, 0, '#57534c');
  k.geo('matte', floorGeo(1, -xE, -bz), 0, yc - 0.02, 0, '#33322e', 1, 1, 1, 0, 0, Math.PI);

  // corridor wall: plaster in two tones over panelled teal wainscot
  const runs = [[xW, hx0 - 0.15], [hx1 + 0.15, xE]];
  for (const [a, b] of runs) {
    k.bb('matte', a, y0, bz - 0.3, b, yc, bz, upper);
    const a2 = Math.max(a, xW + 0.25);
    k.bb('matte', a2, y0 + 1.38, bz, b, y0 + 4.0, bz + 0.02, band);
    k.bb('matte', a2, y0 + 1.3, bz, b, y0 + 1.38, bz + 0.06, '#2a2c2a');
    let x = a2;
    while (x < b - 0.2) {
      const w = Math.min(b - x, 2.2 + r() * 1.6);
      k.bb('matte', x, y0, bz, x + w, y0 + 1.3, bz + 0.04, r.pick(teals));
      if (x + w < b - 0.05) k.bb('matte', x + w - 0.03, y0, bz, x + w + 0.03, y0 + 1.3, bz + 0.06, '#8a8578');
      x += w;
    }
  }
  // doors with rounded surrounds and brass name plates (one left ajar)
  const dw = 1.18, dh = 2.36;
  const frameG = doorFrameGeo(dw, dh), leafG = doorLeafGeo(dw, dh);
  const names = ['ARDEN', 'VOSS', 'KAMARA', 'LINDGREN', 'PRUETT'];
  [-66.1, -58.6, -37.5, -30.5, -23.5].forEach((x, i) => {
    k.geo('matte', frameG, x, y0, bz, '#bdb8ac');
    if (i === 3) {
      // hinged on the right, swung a little way out into the corridor
      k.push(x + dw / 2, y0, bz + 0.02, 0.5);
      k.geo('matte', leafG, -dw / 2, 0, 0, '#141515');
      k.pop();
      k.geo('matte', leafG, x, y0, bz + 0.004, '#060707');
    } else {
      k.geo('matte', leafG, x, y0, bz + 0.01, '#141515');
      k.box('metal', x, y0 + 2.02, bz + 0.07, 0.36, 0.12, 0.02, '#c9a85a');
      signs.place(signs.make(names[i], { style: 'light', bg: '#c9a85a', fg: '#2a2418', size: 30, weight: 700 }), x, y0 + 2.02, bz + 0.085, 0.08);
      k.sphere('metal', x + 0.42, y0 + 1.05, bz + 0.08, 0.035, '#b8a26a', 6, 4);
    }
  });
  // a string of bare bulbs along the wall, one every six metres
  const by = y0 + 3.45, bzz = bz + 0.45;
  for (const [a, b] of [[xW + 0.4, hx0 - 0.2], [hx1 + 0.2, xE]]) wire(k, sag([a, by, bzz], [b, by, bzz], 0.08, 12), 0.016, '#1b1b1b', 4);
  for (const x of [-70, -64, -58, -40, -34, -28, -22]) {
    k.cyl('metal', x, by - 0.14, bzz, 0.045, 0.16, '#3a3530', 6);
    k.sphere('glow', x, by - 0.25, bzz, 0.09, col('#ffd9a0', 6), 8, 6);
  }
  // pipe under the slab, stopping at the home's partitions
  for (const [a, b] of [[xW + 0.4, hx0 - 0.15], [hx1 + 0.15, xE]]) {
    k.rod('metal', [a, yc - 0.45, bz + 0.35], [b, yc - 0.45, bz + 0.35], 0.12, '#3a3b3a', 8);
    for (let x = a + 1.6; x < b; x += 4) k.box('metal', x, yc - 0.25, bz + 0.2, 0.06, 0.5, 0.4, '#2a2b2b');
  }

  // partitions round the home (doorway in the east one), capped at the cut
  const pd0 = -3.1, pd1 = -1.6, pc = '#5a5750';
  k.bb('matte', hx0 - 0.15, y0, hz, hx0 + 0.15, yc, 0, pc);
  k.bb('matte', hx1 - 0.15, y0, hz, hx1 + 0.15, yc, pd0, pc);
  k.bb('matte', hx1 - 0.15, y0, pd1, hx1 + 0.15, yc, 0, pc);
  k.bb('matte', hx1 - 0.15, y0 + 2.35, pd0, hx1 + 0.15, yc, pd1, pc);
  for (const x of [hx0, hx1]) k.bb('matte', x - 0.17, y0, -0.05, x + 0.17, yc, 0, SECTION);
  k.geo('matte', doorFrameGeo(1.5, 2.35, 0.12, 0.3), hx1 + 0.15, y0, (pd0 + pd1) / 2, '#b0ab9f', 1, 1, 1, 0, HALF, 0);

  // inside: grey floor, plain dim walls, a tan dado behind the desk
  const hin0 = hx0 + 0.15, hin1 = hx1 - 0.15, fy = y0 + 0.03;
  k.bb('matte', hin0, y0, hz, hin1, fy, 0, '#57534b');
  k.bb('matte', hin0, yc - 0.12, hz, hin1, yc, bz, '#2e2d2a');
  k.bb('matte', hin0, y0, hz - 0.3, hin1, yc, hz, '#57544d');
  k.bb('matte', hin0, yc - 0.55, hz, hin1, yc - 0.12, hz + 0.04, '#8a867c');
  k.bb('matte', -51.3, y0, hz, -44.4, y0 + 1.25, hz + 0.03, '#7a6a50');
  k.bb('matte', -51.3, y0 + 1.25, hz, -44.4, y0 + 1.3, hz + 0.05, '#40372c');
  k.bb('fabric', -49.6, fy, -4.4, -47.4, fy + 0.012, -2.2, '#4e3832');

  // a dark iron daybed along the back wall, a shelf over it
  k.push(-52.6, fy, -7.95, HALF);
  k.box('metal', 0, 0.3, 0, 1.0, 0.1, 2.3, '#2a2724');
  for (const zz of [-1.12, 1.12]) k.box('metal', 0, 0.42, zz, 1.0, 0.84, 0.05, '#2a2724');
  for (const [xx, zz] of [[-0.46, -1.1], [0.46, -1.1], [-0.46, 1.1], [0.46, 1.1]]) k.box('metal', xx, 0.15, zz, 0.05, 0.3, 0.05, '#2a2724');
  k.box('fabric', 0, 0.42, 0, 0.94, 0.14, 2.18, '#6a645a');
  k.box('fabric', 0, 0.5, 0.25, 0.97, 0.05, 1.5, '#5a5048');
  k.box('fabric', 0, 0.53, -0.82, 0.6, 0.09, 0.32, '#8a857a');
  k.pop();
  k.bb('wood', -53.5, y0 + 2.0, hz, -51.6, y0 + 2.04, hz + 0.3, '#4a3a2e');
  for (const x of [-53.3, -51.8]) k.box('metal', x, y0 + 1.9, hz + 0.1, 0.03, 0.2, 0.2, '#2a2826');
  k.box('matte', -53.1, y0 + 2.14, hz + 0.15, 0.3, 0.2, 0.22, '#6a5a4a');
  k.cyl('glass', -52.6, y0 + 2.04, hz + 0.15, 0.06, 0.16, '#cfe0dc', 8);
  k.box('matte', -52.1, y0 + 2.1, hz + 0.15, 0.34, 0.12, 0.2, '#3f5a6a');
  // round mirror, a little clock, a pinned note
  k.geo('metal', UNIT.torus(0.1, 8, 32), -50.2, y0 + 2.3, hz + 0.06, '#3a3026', 0.44, 0.44, 0.44);
  k.cylR('glow', -50.2, y0 + 2.3, hz + 0.04, 0.42, 0.02, col('#d8dcd6', 1.1), HALF, 0, 0, 32);
  k.geo('metal', UNIT.torus(0.12, 6, 24), -47.3, y0 + 2.1, hz + 0.05, '#3a3530', 0.17, 0.17, 0.17);
  k.cylR('matte', -47.3, y0 + 2.1, hz + 0.03, 0.16, 0.02, '#d3ccbb', HALF, 0, 0, 20);
  k.box('matte', -46.4, y0 + 2.1, hz + 0.03, 0.26, 0.34, 0.01, '#c8c2b2', 0, 0, 0.05);

  // desk with a lamp and the tools of someone who fixes things
  k.bb('wood', -49.3, fy + 0.74, hz + 0.05, -46.1, fy + 0.79, -7.8, '#5a4432');
  for (const x of [-49.22, -46.18]) for (const z of [hz + 0.12, -7.88]) k.box('wood', x, fy + 0.37, z, 0.06, 0.74, 0.06, '#3f3026');
  k.bb('wood', -49.25, fy + 0.18, hz + 0.1, -46.15, fy + 0.21, -7.85, '#4a3a2c');
  const ty = fy + 0.79, lx = -48.9, lz = -8.25;
  k.cyl('metal', lx, ty, lz, 0.12, 0.04, '#1e2021', 10);
  k.rod('metal', [lx, ty + 0.03, lz], [lx + 0.06, ty + 0.55, lz + 0.05], 0.02, '#1e2021', 5);
  k.rod('metal', [lx + 0.06, ty + 0.55, lz + 0.05], [lx + 0.36, ty + 0.64, lz + 0.2], 0.02, '#1e2021', 5);
  k.geo('metal', UNIT.cone(12), lx + 0.4, ty + 0.56, lz + 0.22, '#1e2224', 0.17, 0.22, 0.17);
  k.sphere('glow', lx + 0.4, ty + 0.48, lz + 0.22, 0.05, col('#ffd49a', 6), 8, 6);
  for (let i = 0; i < 12; i++) {
    const x = -48.4 + (i % 6) * 0.26 + (r() - 0.5) * 0.08, z = -8.35 + Math.floor(i / 6) * 0.3;
    if (i % 3 === 0) k.box('metal', x, ty + 0.01, z, 0.04, 0.02, 0.24, '#8a8d8e', r() - 0.5);
    else if (i % 3 === 1) {
      k.box('wood', x, ty + 0.015, z, 0.03, 0.03, 0.18, '#8a6a43', r() - 0.5);
      k.box('metal', x, ty + 0.02, z - 0.1, 0.1, 0.04, 0.05, '#3a3c3d', r() - 0.5);
    } else k.geo('metal', UNIT.torus(0.25, 4, 10), x, ty + 0.012, z, '#b86a3a', 0.07, 0.07, 0.07, HALF, 0, 0);
  }
  k.box('matte', -46.6, ty + 0.12, -8.3, 0.44, 0.24, 0.22, '#5a5044');
  k.cylR('matte', -46.5, ty + 0.14, -8.185, 0.05, 0.01, '#e3d7b3', HALF, 0, 0, 10);
  // small table with two high-backed chairs
  P.roundTable(k, -48.5, fy, -3.3, { r: 0.5, top: '#3a2e26', leg: '#1e1c1a', mat: 'wood' });
  for (const [x, ry] of [[-49.35, HALF], [-47.65, -HALF]]) {
    P.chair(k, x, fy, -3.3, ry, { color: '#2a2622', mat: 'wood' });
    k.push(x, fy, -3.3, ry);
    k.box('wood', 0, 1.02, -0.19, 0.44, 0.44, 0.05, '#2a2622');
    k.pop();
  }
  k.cyl('matte', -48.65, fy + 0.75, -3.35, 0.1, 0.02, '#d8d2c2', 16);
  k.cyl('matte', -48.3, fy + 0.75, -3.2, 0.045, 0.1, '#3f6a8a', 10);

  // mezzanine shelf across the back, hung from the slab, boxes on it, a ladder up
  const my = y0 + 3.7, mz1 = -5.0;
  k.bb('wood', hin0, my - 0.14, hz + 0.02, hin1, my, mz1, '#4a4038');
  k.bb('wood', hin0, my - 0.34, mz1 - 0.1, hin1, my - 0.14, mz1, '#3a3028');
  for (const x of [-52.2, -47.6, -44.6]) k.cyl('metal', x, my, mz1 + 0.05, 0.012, yc - my, '#2e2c2a', 4);
  P.railing(k, [[hin0, my, mz1 + 0.05], [-44.0, my, mz1 + 0.05]], 0.85, { color: '#2e2c2a', posts: 1.5 });
  for (const [x, c, w, h] of [[-52.7, '#6a4434', 1.0, 0.5], [-51.4, '#4a5664', 0.85, 0.45], [-48.1, '#2f4450', 1.05, 0.5], [-45.3, '#7a4a32', 0.9, 0.46]]) {
    k.box('matte', x, my + h / 2, -7.0 + (r() - 0.5) * 0.4, w, h, 0.75, c, (r() - 0.5) * 0.1);
  }
  k.box('matte', -50.1, my + 0.15, -7.4, 0.45, 0.3, 0.45, '#6a5e48', 0.2);
  for (const x of [-43.55, -43.05]) k.box('wood', x, (fy + my + 0.95) / 2, mz1 + 0.18, 0.05, my + 0.95 - fy, 0.05, '#5a4a3a');
  for (let y = fy + 0.3; y < my + 0.9; y += 0.3) k.box('wood', -43.3, y, mz1 + 0.18, 0.5, 0.035, 0.035, '#5a4a3a');
  // tall black wardrobe by the doorway, a wall lamp
  k.box('wood', -43.3, fy + 1.18, -3.95, 0.7, 2.36, 1.1, '#141414');
  k.box('matte', -42.93, fy + 2.05, -3.62, 0.02, 0.14, 0.22, '#b8b0a0');
  k.box('metal', -42.93, fy + 1.2, -3.7, 0.03, 0.16, 0.03, '#8a7a5a');
  k.box('metal', -44.3, y0 + 2.9, hz + 0.1, 0.1, 0.1, 0.16, '#2a2826');
  k.sphere('glow', -44.3, y0 + 2.75, hz + 0.2, 0.08, col('#ffd09a', 6), 8, 6);

  pool.add(-48.5, y0 + 3.0, -5.2, 0xffcf9a, 9);
  pool.add(-44.3, y0 + 2.6, -7.8, 0xffc27a, 7);
  pool.add(-64, y0 + 3, -2.5, 0xffd9a8, 12);
  pool.add(-31, y0 + 3, -2.5, 0xffd9a8, 12);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 144, east (left part): the radio workshop.
// ---------------------------------------------------------------------------
function workshop({ pool, signs }) {
  const k = new Kit('deep/workshop');
  const y0 = C.floorY(C.LEVELS), yc = y0 + C.ROOM_H;
  const r = makeRng(14414);
  const wall = '#5f5c55', teal = '#2f6664', bz = -12, px = 40;
  shell(k, { s: 1, y0, x0: 20.8, x1: px - 0.15, back: -bz, wall, floor: '#4a4843', door: [-5.4, -8.2] });
  k.bb('matte', 20.8, yc - 0.05, bz, px, yc - 0.02, 0, '#302f2c');
  k.bb('matte', 20.8, y0, bz, px - 0.15, y0 + 1.4, bz + 0.04, teal);
  k.bb('matte', 20.8, y0 + 1.4, bz, px - 0.15, y0 + 1.46, bz + 0.07, '#26302e');
  // partition to the cafeteria, with a doorway near the front
  k.bb('matte', px - 0.15, y0, bz - 0.3, px + 0.15, yc, -4.6, wall);
  k.bb('matte', px - 0.15, y0, -3.2, px + 0.15, yc, 0, wall);
  k.bb('matte', px - 0.15, y0 + 2.3, -4.6, px + 0.15, yc, -3.2, wall);
  k.bb('matte', px - 0.17, y0, -0.05, px + 0.17, yc, 0, SECTION);

  // a salvaged radio: case, speaker cloth, tuning dial, knobs (faces local +z)
  const radioCols = ['#6a5a4a', '#3a3d3c', '#8a7a5a', '#4a5a5a', '#2f3436'];
  let radios = 0;
  const radio = (x, y, z, w, h, d, lit, ry = 0, pal = radioCols) => {
    k.push(x, y, z, ry);
    k.box('matte', 0, h / 2, 0, w, h, d, col(r.pick(pal), 0.85 + r() * 0.3));
    const f = d / 2, dr = Math.min(w, h) * 0.2;
    k.box('matte', -w * 0.24, h * 0.5, f + 0.004, w * 0.38, h * 0.62, 0.008, '#26231f');
    if (lit) k.box('glow', w * 0.2, h * 0.58, f + 0.006, w * 0.36, h * 0.34, 0.006, col('#d8f0e0', 2.4));
    else k.cylR('matte', w * 0.2, h * 0.6, f + 0.008, dr, 0.012, '#e3d7b3', HALF, 0, 0, 12);
    for (let i = 0; i < 2; i++) k.cylR('matte', w * (0.1 + i * 0.2), h * 0.2, f + 0.02, 0.025, 0.04, '#1c1c1c', HALF, 0, 0, 8);
    k.pop();
    radios++;
  };
  // high double shelf of radios along the back wall
  const sx0 = 29.6, sx1 = 39.4;
  for (const yy of [3.6, 4.5]) {
    k.bb('metal', sx0, y0 + yy - 0.04, bz, sx1, y0 + yy, bz + 0.5, '#2e3031');
    let x = sx0 + 0.1;
    while (x < sx1 - 0.5) {
      const rw = 0.5 + r() * 0.3, rh = 0.3 + r() * 0.22;
      if (x + rw > sx1 - 0.05) break;
      radio(x + rw / 2, y0 + yy, bz + 0.26, rw, rh, 0.34, r() < 0.2);
      x += rw + 0.12 + r() * 0.2;
    }
  }
  for (const x of [29.8, 32.3, 34.8, 37.3, 39.2]) for (const yy of [3.6, 4.5]) k.box('metal', x, y0 + yy - 0.18, bz + 0.2, 0.04, 0.3, 0.3, '#2e3031');
  // uprights carrying the shelves and pegboard, a pipe down to the dark door
  for (const x of [sx0 + 0.05, sx1 - 0.05]) k.bb('metal', x - 0.05, y0, bz, x + 0.05, yc, bz + 0.12, '#232526');
  k.rod('metal', [26.75, yc, bz + 0.2], [26.75, y0 + 2.6, bz + 0.2], 0.06, '#232526', 6);
  for (const [y, rr] of [[yc - 0.3, 0.09], [yc - 0.58, 0.06]]) k.rod('metal', [20.8, y, bz + 0.35], [px - 0.15, y, bz + 0.35], rr, '#2a2c2d', 6);
  k.rod('matte', [20.8, y0 + 3.35, bz + 0.08], [sx0, y0 + 3.35, bz + 0.08], 0.04, '#2f6664', 6);
  // pegboard with a hundred hooks
  k.bb('matte', sx0, y0 + 1.1, bz, sx1, y0 + 3.4, bz + 0.04, '#6a5840');
  for (let j = 0; j < 5; j++) {
    for (let i = 0; i < 20; i++) {
      const x = sx0 + 0.3 + i * ((sx1 - sx0 - 0.6) / 19), y = y0 + 3.15 - j * 0.46;
      const z = bz + 0.04;
      k.rod('metal', [x, y, z], [x, y + 0.03, z + 0.11], 0.006, '#8a8d8e', 3);
      const t = r();
      if (t < 0.18) k.box('metal', x, y - 0.12, z + 0.03, 0.035, 0.24, 0.012, '#9a9d9e');
      else if (t < 0.32) {
        k.cyl('matte', x, y - 0.12, z + 0.04, 0.018, 0.09, r.pick(['#a3342b', '#c9a13b', '#3f6a8a']), 6);
        k.cyl('metal', x, y - 0.27, z + 0.04, 0.005, 0.15, '#9a9d9e', 4);
      } else if (t < 0.44) k.geo('matte', UNIT.torus(0.25, 5, 12), x, y - 0.08, z + 0.04, r.pick(['#b86a3a', '#a33a2e', '#2b2b2b']), 0.07, 0.07, 0.07);
      else if (t < 0.56) {
        for (const s of [-1, 1]) k.box('metal', x, y - 0.1, z + 0.03, 0.02, 0.2, 0.012, '#6a6e70', 0, 0, s * 0.15);
      } else if (t < 0.8) k.box('matte', x, y - 0.12, z + 0.03, 0.18, 0.24, 0.02, r.pick(['#d8d0bc', '#c9a13b', '#c9a13b', '#5a9a98', '#e3dccb']));
      else if (t < 0.86) k.cylR('matte', x, y - 0.06, z + 0.04, 0.05, 0.03, '#2b2b2b', HALF, 0, 0, 10);
    }
  }
  // long bench with a teal-blue cabinet front, radios on top
  k.bb('matte', 29.8, y0, bz + 0.05, 39.2, y0 + 0.8, bz + 0.92, '#2c5261');
  k.bb('matte', 29.75, y0 + 0.8, bz + 0.02, 39.25, y0 + 0.86, bz + 0.98, '#4a4d4a');
  for (const x of [31.7, 33.6, 35.5, 37.4]) k.box('matte', x, y0 + 0.4, bz + 0.925, 0.03, 0.7, 0.01, '#1f3a44');
  const ly = y0 + 0.86;
  for (const x of [30.5, 32.2, 34.1, 37.0, 38.6]) radio(x, ly, bz + 0.45, 0.6, 0.38, 0.36, true);
  k.box('metal', 35.6, ly + 0.02, bz + 0.55, 0.6, 0.03, 0.4, '#8a8d8e');
  k.box('metal', 35.6, ly + 0.14, bz + 0.37, 0.6, 0.25, 0.02, '#6a6e70');
  for (let i = 0; i < 5; i++) k.cyl('glass', 35.4 + (i % 3) * 0.16, ly + 0.035, bz + 0.5 + Math.floor(i / 3) * 0.14, 0.03, 0.1, '#d8dcd6', 8);
  k.rod('matte', [36.1, ly + 0.05, bz + 0.5], [36.4, ly + 0.2, bz + 0.7], 0.012, '#a3342b', 5);
  for (let i = 0; i < 14; i++) {
    const x = 30 + r() * 9, z = bz + 0.2 + r() * 0.7;
    if (r() < 0.5) k.box('matte', x, ly + 0.02, z, 0.04 + r() * 0.06, 0.03, 0.03 + r() * 0.05, r.pick(['#2b2b2b', '#b86a3a', '#3f6a8a', '#8a8d8e']), r() * 3);
    else k.cyl('metal', x, ly, z, 0.015 + r() * 0.02, 0.04, r.pick(['#8a8d8e', '#b09050']), 6);
  }
  P.stool(k, 35.4, y0, bz + 1.7, { color: '#3a3c3d', h: 0.72 });

  // blocked arch and a dark door on the left of the back wall
  P.archFrame(k, 28.55, y0, bz + 0.04, 0, { w: 1.3, h: 2.6, color: '#8f8a80', depth: 0.06, t: 0.1 });
  k.bb('matte', 26.0, y0, bz, 27.2, y0 + 2.4, bz + 0.06, '#1b1c1c');
  // freestanding shelf of radios facing the room, a low bench before it
  const shx = 26.2;
  const shH = 2.9, shelfCols = ['#b8a47a', '#c8b890', '#8a7a5a', '#4a8a8a', '#d8d0bc', '#6a5a4a'];
  for (const z of [-11.2, -8.5, -5.8]) k.box('metal', shx + 0.25, y0 + shH / 2, z, 0.5, shH, 0.05, '#5a5e60');
  k.bb('matte', shx - 0.05, y0, -11.2, shx, y0 + shH, -5.8, '#55585a');
  for (const yy of [0.1, 0.8, 1.5, 2.2, 2.9]) k.bb('metal', shx, y0 + yy - 0.04, -11.2, shx + 0.5, y0 + yy, -5.8, '#6a6e70');
  for (const yy of [0.1, 0.8, 1.5, 2.2]) {
    let z = -11.05;
    while (z < -6.2 && radios < 44) {
      const rw = 0.45 + r() * 0.3;
      if (z + rw > -5.9) break;
      radio(shx + 0.25, y0 + yy, z + rw / 2, rw, 0.28 + r() * 0.3, 0.32, r() < 0.25, HALF, shelfCols);
      z += rw + 0.06 + r() * 0.12;
    }
  }
  k.bb('wood', 26.8, y0 + 0.8, -10.6, 27.6, y0 + 0.86, -6.4, '#5a4630');
  for (const z of [-10.5, -6.5]) for (const x of [26.86, 27.54]) k.box('metal', x, y0 + 0.4, z, 0.05, 0.8, 0.05, '#2b2d2e');
  // coils of wire: seven hung flat on the pegboard, seven lying on the shelf's bottom board
  const coilC = ['#b86a3a', '#2b2b2b', '#a33a2e', '#8a8d8a', '#c9a13b', '#3a6a8a'];
  for (let i = 0; i < 14; i++) {
    const cr = 0.18 + r() * 0.08, c = col(r.pick(coilC), 0.85 + r() * 0.3);
    if (i < 7) k.geo('matte', UNIT.torus(0.22, 6, 16), 30.4 + i * 1.3, y0 + 1.5, bz + 0.09, c, cr, cr, cr * 1.3);
    else k.geo('matte', UNIT.torus(0.3, 6, 16), shx + 0.28, y0 + 2.9 + cr * 0.45, -10.8 + (i - 7) * 0.68, c, cr, cr, cr * 1.5, HALF, 0, 0);
  }
  // parts bins stacked against the inner wall by the front
  const binC = ['#3e6a8a', '#a33a2e', '#c9a13b', '#6b7a3a', '#8a8d8a'];
  for (let c = 0; c < 4; c++) {
    for (let j = 0; j < 7; j++) {
      const z = -1.4 - c * 0.9, y = y0 + j * 0.62;
      const bc = col(r.pick(binC), 0.85 + r() * 0.25).clone();
      k.box('matte', 21.16, y + 0.28, z, 0.62, 0.56, 0.84, bc);
      k.box('matte', 21.48, y + 0.16, z, 0.04, 0.3, 0.84, bc.multiplyScalar(0.8));
      k.box('matte', 21.505, y + 0.2, z, 0.005, 0.1, 0.3, '#e9e4d6');
    }
  }
  // old transmitter cabinet and a cable drum
  k.box('metal', 21.2, y0 + 1.0, -10.4, 0.7, 2.0, 1.2, '#4a5a5a');
  for (let i = 0; i < 6; i++) k.cylR('matte', 21.56, y0 + 1.5 - Math.floor(i / 3) * 0.4, -10.8 + (i % 3) * 0.4, 0.1, 0.02, '#e3d7b3', 0, 0, HALF, 12);
  k.box('glow', 21.56, y0 + 0.6, -10.4, 0.01, 0.06, 0.5, col('#ffb45a', 3));
  P.crate(k, 24.6, y0, -2.4, 0.7, '#7a5a38', 0.2);
  // a tan cabinet and dark boxes in the front corner by the partition
  k.box('matte', 39.25, y0 + 0.85, -2.3, 0.9, 1.7, 1.1, '#7a6448');
  k.box('matte', 38.78, y0 + 0.95, -2.3, 0.02, 1.5, 0.9, '#6a563c');
  k.box('matte', 38.1, y0 + 0.3, -3.1, 0.6, 0.6, 0.55, '#2e3032', 0.1);
  k.box('matte', 38.12, y0 + 0.85, -3.12, 0.5, 0.5, 0.48, '#3a3c3e', -0.1);

  // cables strung corner to corner, a few bulbs hanging off them
  const cables = [
    [[22.5, yc - 0.15, -2.0], [31.0, y0 + 1.3, bz + 0.1]],
    [[26.0, yc - 0.15, -1.5], [36.5, y0 + 2.1, bz + 0.1]],
    [[33.0, yc - 0.15, -1.0], [24.0, y0 + 3.0, bz + 0.1]],
    [[38.5, yc - 0.15, -2.5], [30.0, y0 + 3.45, bz + 0.1]],
    [[36.0, yc - 0.15, -1.2], [39.5, y0 + 1.2, bz + 0.1]],
    [[29.5, yc - 0.15, -3.0], [38.0, y0 + 3.5, bz + 0.1]],
    [[22.0, yc - 0.2, -8.0], [34.0, yc - 1.2, bz + 0.1]],
    [[39.5, yc - 0.2, -6.0], [27.0, y0 + 4.2, bz + 0.1]],
  ];
  cables.forEach(([a, b], i) => {
    const pts = sag(a, b, 0.3, 10);
    wire(k, pts, 0.012, '#1b1b1b', 3);
    if (i % 2 === 0) {
      const p = pts[4], drop = 0.25;
      k.cyl('metal', p[0], p[1] - drop, p[2], 0.006, drop, '#1b1b1b', 3);
      k.sphere('glow', p[0], p[1] - drop - 0.05, p[2], 0.06, col('#ffc27a', 5), 6, 4);
    }
  });
  // bright work lamp and a strip light
  P.pendant(k, 34, yc, -6, { drop: 1.1, color: '#fff4e0', power: 9, shade: '#2e3130', r: 0.34 });
  P.tube(k, 31.2, yc - 1.3, -4.5, 2.4, 0, { color: '#eef6ff', power: 4 });
  k.cyl('metal', 31.2, yc - 1.24, -4.5, 0.008, 1.24, '#1b1b1b', 3);
  signs.place(signs.make('144', { style: 'paint', size: 60, sub: 'CAFETERIA  →' }), 42, y0 + 4.2, -11.95, 0.5);
  pool.add(34, y0 + 5.2, -6, 0xfff0d8, 24);
  pool.add(27.5, y0 + 3.2, -8.5, 0xffc27a, 10);
  pool.add(35, y0 + 2.2, -10.8, 0xffd9a0, 10);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Level 144, east (right part): the mechanical cafeteria and its wallscreen.
// ---------------------------------------------------------------------------
function mechcafe({ pool, signs }) {
  const k = new Kit('deep/mechcafe');
  const y0 = C.floorY(C.LEVELS), yc = y0 + C.ROOM_H;
  const r = makeRng(14444);
  const wall = '#6b675e', teal = '#2f6664', bz = -22.3, wx = 44, sz = -12;
  const xW = Math.sqrt(C.R_IN ** 2 - bz * bz) + 0.2;
  k.geo('matte', floorGeo(1, 40.15, -bz), 0, y0 + 0.02, 0, '#46453f');
  k.geo('matte', floorGeo(-1, 40.15, -bz), 0, yc - 0.02, 0, '#2d2c29', 1, 1, 1, 0, 0, Math.PI);
  // back wall, the return behind the workshop, and its teal-banded face
  k.bb('matte', wx, y0, bz - 0.3, xW, yc, bz, wall);
  k.bb('matte', wx - 0.3, y0, bz - 0.3, wx, yc, sz, wall);
  k.bb('matte', 40.15, y0, sz - 0.3, wx, yc, sz, wall);
  k.bb('matte', 40.15, y0, sz, wx - 0.3, y0 + 1.2, sz + 0.04, teal);
  k.bb('matte', 40.15, y0 + 1.2, sz, wx - 0.3, y0 + 1.26, sz + 0.07, '#26302e');
  // dark panelled lining on the curve of the shell
  const a0 = Math.atan2(bz, xW - 0.2);
  k.geo('matte', curvedWall(74.75, a0, -0.002, y0, yc, { n: 24 }), 0, 0, 0, '#3a3935');
  for (let i = 0; i <= 6; i++) {
    const a = a0 + (i / 6) * (-a0);
    k.box('matte', Math.cos(a) * 74.7, y0 + C.ROOM_H / 2, Math.sin(a) * 74.7, 0.06, C.ROOM_H, 0.06, '#33322f');
  }
  k.geo('matte', curvedWall(74.7, a0, -0.002, y0 + 0.02, y0 + 0.4, { n: 24 }), 0, 0, 0, '#23221f');

  // wallscreen in a heavy dark bezel
  const sx = 52, sy = y0 + 4.4;
  const bez = roundRectShape(13.4, 3.5, 1.2);
  bez.holes.push(roundRectShape(12.2, 2.7, 0.8));
  k.geo('matte', extrude(bez, 0.45, false, 10), sx, sy, bz, '#3a3833');
  k.geo('matte', extrude(roundRectShape(12.2, 2.7, 0.8), 0.04, false, 10), sx, sy, bz, '#161717');
  k.mesh(screen(surfaceViewTexture(), sx, sy, bz + 0.25, 12, 2.5, 0, 1.15, 'deep/walker/wallscreen'));
  // dark splashback, three hanging bulbs, the long serving counter
  k.bb('matte', 46.4, y0 + 1.0, bz, 57.6, y0 + 2.8, bz + 0.06, '#1d1d1c');
  for (const x of [47.6, 52.3, 57.0]) {
    k.cyl('metal', x, y0 + 2.5, bz + 0.9, 0.008, C.ROOM_H - 2.5, '#1b1b1b', 3);
    k.cyl('metal', x, y0 + 2.42, bz + 0.9, 0.05, 0.1, '#2a2826', 6);
    k.sphere('glow', x, y0 + 2.34, bz + 0.9, 0.09, col('#ffc98a', 6), 8, 6);
  }
  k.bb('matte', 46.0, y0, -21.35, 59.0, y0 + 0.95, -20.35, '#34332f');
  k.bb('matte', 45.95, y0 + 0.95, -21.4, 59.05, y0 + 1.02, -20.3, '#8e8b84');
  k.cyl('metal', 57.6, y0 + 1.02, -20.85, 0.2, 0.55, '#8a8d8e', 12);
  k.cyl('metal', 57.6, y0 + 1.57, -20.85, 0.22, 0.05, '#5a5d5e', 12);
  for (let i = 0; i < 6; i++) k.box('metal', 48.5 + i * 0.05, y0 + 1.03 + i * 0.02, -20.85, 0.4, 0.015, 0.3, '#9aa09e');

  // nine round pedestal tables, four chairs each
  const tables = [[51.0, -12.0], [52.2, -6.4], [54.4, -17.4], [58.2, -10.6], [56.8, -3.4], [59.6, -16.8], [64.8, -14.2], [65.0, -8.6], [61.8, -4.0]];
  for (const [x, z] of tables) {
    k.cyl('metal', x, y0, z, 0.36, 0.72, '#232424', 14, 0.22);
    k.cyl('matte', x, y0 + 0.72, z, 0.8, 0.05, '#6e6c68', 24);
    const a0t = r() * TAU;
    for (let i = 0; i < 4; i++) {
      const a = a0t + i * HALF + (r() - 0.5) * 0.35, d = 1.05 + r() * 0.15;
      P.chair(k, x + Math.sin(a) * d, y0, z + Math.cos(a) * d, a + Math.PI + (r() - 0.5) * 0.3, { color: '#2c2d2d', mat: 'metal' });
    }
    if (r() < 0.6) k.box('metal', x + (r() - 0.5) * 0.6, y0 + 0.78, z + (r() - 0.5) * 0.6, 0.42, 0.02, 0.3, '#b5b8b6', r() * 3);
    if (r() < 0.5) k.cyl('matte', x + (r() - 0.5) * 0.6, y0 + 0.77, z + (r() - 0.5) * 0.6, 0.045, 0.1, '#e8e2d2', 10);
  }
  // the ring light: a broad dark hoop with lit panels underneath
  const rcx = 57.7, rcz = -9.9, rR = 7.3, rr0 = 6.1, ry0 = y0 + 6.3;
  const ann = new THREE.Shape();
  ann.absarc(0, 0, rR, 0, TAU, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, rr0, 0, TAU, true);
  ann.holes.push(hole);
  k.geo('metal', extrude(ann, 0.5, false, 64), rcx, ry0, rcz, '#5e5c58', 1, 1, 1, -HALF, 0, 0);
  const lit = col('#f2f4f0', 1.7).clone();
  for (let i = 0; i < 26; i++) {
    if ([3, 4, 11, 17, 18, 22].includes(i)) continue;
    const a = ((i + 0.5) / 26) * TAU;
    k.box('glow', rcx + Math.cos(a) * 6.6, ry0 - 0.04, rcz + Math.sin(a) * 6.6, 1.45, 0.08, 0.6, lit, HALF - a);
  }
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU + 0.4;
    k.cyl('metal', rcx + Math.cos(a) * 6.7, ry0 + 0.35, rcz + Math.sin(a) * 6.7, 0.01, yc - ry0 - 0.35, '#1b1b1b', 3);
  }

  // heavy door at the back right with a round port
  const hdx = 67.5;
  k.bb('metal', hdx - 1.1, y0, bz, hdx + 1.1, y0 + 2.95, bz + 0.16, '#2a2a28');
  k.bb('metal', hdx - 0.92, y0 + 0.02, bz + 0.1, hdx + 0.92, y0 + 2.72, bz + 0.22, '#151515');
  k.geo('metal', UNIT.torus(0.14, 6, 24), hdx, y0 + 1.75, bz + 0.25, '#3a3d3e', 0.28, 0.28, 0.28);
  k.cylR('glass', hdx, y0 + 1.75, bz + 0.24, 0.27, 0.02, '#8fa0a0', HALF, 0, 0, 16);
  k.box('metal', hdx + 0.62, y0 + 1.15, bz + 0.25, 0.06, 0.3, 0.06, '#5a5d5e');
  signs.place(signs.make('AUTHORISED ONLY', { style: 'light', size: 36 }), hdx, y0 + 3.2, bz + 0.03, 0.2);
  signs.place(pillSign(signs, ['MECHANICAL', 'CAFETERIA']), 62.6, y0 + 4.5, bz + 0.03, 1.0);
  // crates stacked by the shell
  P.crate(k, 72.2, y0, -6.4, 1.05, '#6a4a38', 0.2);
  P.crate(k, 72.6, y0, -5.2, 0.8, '#7a5a42', -0.1);
  k.box('matte', 70.8, y0 + 0.3, -5.6, 0.9, 0.6, 0.7, '#3a3c3e', 0.4);
  // pipe along the top of the back wall
  k.rod('metal', [wx, yc - 0.5, -21.8], [71.2, yc - 0.5, -21.8], 0.2, '#4d4e4b', 10);
  for (let x = wx + 2; x < 71; x += 4) k.box('metal', x, yc - 0.28, -21.95, 0.06, 0.44, 0.3, '#2a2b2b');
  pool.add(rcx, y0 + 5.2, rcz, 0xf2f6ff, 14);
  pool.add(52, y0 + 2.2, -19.5, 0xffc98a, 10);
  pool.add(47, y0 + 4, -15, 0xe8eef2, 10);
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Below 144: the mechanical hall on the foundation cap. A solid core under the
// stair splits it: the full-height generator hall to the west, a low pump room
// to the east with the core's section carried across above it.
// ---------------------------------------------------------------------------
function hall({ pool, signs, dyn, updaters, power }) {
  const k = new Kit('deep/hall');
  const yb = C.BASE_Y, yt = C.floorY(C.LEVELS) - C.SLAB_T;
  const CX = 19.5, zCore = -Math.sqrt(C.R_IN ** 2 - CX * CX);
  const pumpTop = -1113.8;

  // foundation cap: its top is the hall floor, its cut face carries a stencil band
  const floor = new THREE.CircleGeometry(C.R_IN + 0.05, 96, 0, Math.PI);
  floor.rotateX(-HALF);
  k.geo('matte', floor, 0, yb, 0, '#6a655b');
  const band = toTexture(stencilBandCanvas('FOUNDATION CAP · LOT 9 · NO ACCESS BELOW', 4096, 256, { size: 34, spacing: 0.42 }), { repeat: false });
  const capFace = new THREE.Mesh(new THREE.PlaneGeometry(2 * C.R_OUT, yb - C.CAP_Y), new THREE.MeshStandardMaterial({ name: 'deep/capSection', map: band, roughness: 0.92 }));
  capFace.position.set(0, (yb + C.CAP_Y) / 2, 0);
  capFace.name = 'deep/cap/section';
  capFace.receiveShadow = true;
  k.mesh(capFace);
  for (const y of [-1127.9, -1130.8]) k.bb('matte', -C.R_OUT, y - 0.04, 0, C.R_OUT, y + 0.04, 0.012, '#b3aa99');

  // the core: a block under the stair, cut face with four dark slots. Its
  // west face splays out a little towards the back of the hall.
  const secC = '#9a9587';
  const TW = 0.0955, qa = 1 + TW * TW, qb = -2 * CX * TW, qc = CX * CX - C.R_IN ** 2;
  const zW = (-qb - Math.sqrt(qb * qb - 4 * qa * qc)) / (2 * qa), xW = -CX + TW * zW;
  k.bb('matte', -CX, yb, -0.4, CX, yt, 0, secC);
  k.bb('matte', CX, yb, zCore, CX - 0.3, yt, -0.4, '#5d5a55');
  const wLen = Math.hypot(xW + CX, zW);
  k.box('matte', (xW - CX) / 2 + 0.15, (yb + yt) / 2, zW / 2, 0.3, yt - yb, wLen, '#5d5a55', Math.atan2(-TW, -1) + Math.PI);
  for (const x of [-12.75, -6.95, 6.95, 12.75]) k.bb('matte', x - 1.65, yb + 2.6, -0.05, x + 1.65, yt - 1.0, 0.012, '#1c1d1d');

  // the pump side: a lower ceiling, the section carried on above it
  k.bb('matte', CX, pumpTop, -0.4, C.R_IN, yt, 0, secC);
  k.geo('matte', floorGeo(-1, CX, -zCore), 0, pumpTop, 0, '#4a4843', 1, 1, 1, 0, 0, Math.PI);
  signs.place(signs.make('P-2 · PUMPS', { style: 'light', size: 40 }), 47, pumpTop + 4.7, 0.015, 0.42);
  k.geo('matte', curvedWall(74.8, Math.atan2(zCore, CX + 0.3), 0, yb, pumpTop, { n: 48 }), 0, 0, 0, '#3e3c38');
  // dark brick on the generator side's curved wall, a dark soffit over it
  const brickMat = new THREE.MeshStandardMaterial({ name: 'deep/brick', map: toTexture(brickCanvas(256, 5)), color: '#98928a', roughness: 0.95 });
  const brick = new THREE.Mesh(curvedWall(74.8, Math.PI, Math.atan2(zW, xW - 0.3) + TAU, yb, yt, { n: 64, tile: 8 }), brickMat);
  brick.name = 'deep/generator/brick';
  brick.receiveShadow = true;
  k.mesh(brick);
  k.geo('matte', floorGeo(1, CX, -zCore), 0, yt - 0.03, 0, '#3f3d39', 1, 1, 1, 0, 0, Math.PI);

  // ------------------------------------------------------------ generator
  const gx = -38.55, gz = -25.05;
  const blk = '#1c1e1f', blk2 = '#232627', deckC = '#3a3d3f', railC = '#34373a';
  const L1 = -1118.9, L2 = -1110.6, L3 = -1101.0;
  const rail = (pts, color = railC) => P.railing(k, pts, 1.05, { color, posts: 1.6 });
  const ring = (R, y, a0, a1, n = 36) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      pts.push([gx + Math.cos(a) * R, y, gz + Math.sin(a) * R]);
    }
    return pts;
  };
  // dark plate on the floor, a ring of pale stripes round the base
  const disc = new THREE.CircleGeometry(11.2, 64);
  disc.rotateX(-HALF);
  k.geo('matte', disc, gx, yb + 0.012, gz, '#2d2b29');
  for (let i = 0; i < 28; i++) {
    const a = ((i + 0.5) / 28) * TAU;
    k.box('matte', gx + Math.cos(a) * 6.75, yb + 0.02, gz + Math.sin(a) * 6.75, 0.85, 0.012, 1.1, '#b9b4a9', HALF - a);
  }
  // lower body with the core port
  k.cyl('metal', gx, yb, gz, 6.05, 0.35, '#141516', 48);
  k.cyl('metal', gx, yb + 0.35, gz, 5.65, L1 - yb - 0.35, blk, 48);
  for (const y of [yb + 1.0, L1 - 0.6]) k.geo('metal', UNIT.torus(0.03, 6, 64), gx, y, gz, '#101112', 5.66, 5.66, 5.66, HALF, 0, 0);
  k.geo('metal', UNIT.torus(0.1, 6, 32), gx, -1122.4, gz + 5.72, '#2a2c2d', 1.75, 1.75, 1.75);
  signs.place(signs.make('GEN-1', { style: 'paint', size: 44 }), gx, -1120.3, gz + 5.68, 0.28);
  // lower gantry
  for (let i = 0; i < 36; i++) {
    const a = ((i + 0.5) / 36) * TAU;
    k.box('metal', gx + Math.cos(a) * 7.05, L1 - 0.06, gz + Math.sin(a) * 7.05, 1.3, 0.1, 2.75, deckC, HALF - a);
  }
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * TAU + 0.13;
    k.rod('metal', [gx + Math.cos(a) * 5.65, L1 - 2.3, gz + Math.sin(a) * 5.65], [gx + Math.cos(a) * 8.2, L1 - 0.15, gz + Math.sin(a) * 8.2], 0.07, '#26282a', 6);
  }
  // middle section with cooling fins
  k.cyl('metal', gx, L1, gz, 4.3, L2 - L1, blk2, 40);
  for (let i = 0; i < 20; i++) {
    const a = ((i + 0.5) / 20) * TAU;
    k.box('metal', gx + Math.cos(a) * 4.97, -1112.1, gz + Math.sin(a) * 4.97, 0.09, 3.2, 1.35, '#2c2f31', HALF - a);
  }
  // upper gantry and the wide upper drum
  for (let i = 0; i < 36; i++) {
    const a = ((i + 0.5) / 36) * TAU;
    k.box('metal', gx + Math.cos(a) * 7.1, L2 - 0.06, gz + Math.sin(a) * 7.1, 1.72, 0.12, 5.4, deckC, HALF - a);
  }
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * TAU;
    k.rod('metal', [gx + Math.cos(a) * 4.3, L2 - 2.6, gz + Math.sin(a) * 4.3], [gx + Math.cos(a) * 9.4, L2 - 0.15, gz + Math.sin(a) * 9.4], 0.07, '#26282a', 6);
  }
  const uTop = -1102.9;
  k.cyl('metal', gx, L2, gz, 6.95, uTop - L2, blk, 48);
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * TAU;
    k.box('metal', gx + Math.cos(a) * 6.97, (L2 + uTop) / 2, gz + Math.sin(a) * 6.97, 0.05, uTop - L2 - 0.1, 0.05, '#101112', HALF - a);
  }
  for (const y of [L2 + 0.3, uTop - 0.35]) k.geo('metal', UNIT.torus(0.03, 6, 64), gx, y, gz, '#101112', 6.98, 6.98, 6.98, HALF, 0, 0);
  k.cyl('metal', gx, uTop, gz, 6.95, 0.7, '#222526', 48, 6.1 / 6.95);
  k.cyl('metal', gx, uTop + 0.7, gz, 6.1, 0.1, blk, 48);
  // exhaust stack to the slab, and a flue out to the wall
  k.cyl('metal', gx, uTop + 0.8, gz, 0.75, yt + 0.1 - uTop - 0.8, '#2a2c2d', 20);
  for (const y of [uTop + 1.4, -1097.5, yt - 0.5]) k.cyl('metal', gx, y, gz, 0.92, 0.2, '#1c1e1f', 20);
  const ux = gx / Math.hypot(gx, gz), uz = gz / Math.hypot(gx, gz), gR = Math.hypot(gx, gz);
  const fl = [gx + ux * 28.4, gz + uz * 28.4];
  k.rod('metal', [gx, -1098.8, gz], [fl[0], -1098.8, fl[1]], 0.32, '#34373a', 10);
  for (const d of [6, 14, 22]) k.cylR('metal', gx + ux * d, -1098.8, gz + uz * d, 0.42, 0.18, '#1f2122', 0, Math.atan2(-uz, ux), -HALF, 12);
  // lamps glowing through the casing: the core port and slots (dim with the power)
  const coreMat = new THREE.MeshBasicMaterial({ name: 'deep/generator/core', color: CORE.clone() });
  const slotMat = new THREE.MeshBasicMaterial({ name: 'deep/generator/slots', color: SLOT.clone() });
  const ck = new Kit('deep/generator/core');
  ck.geo('core', UNIT.circle(32), gx, -1122.4, gz + 5.68, '#ffffff', 1.62, 1.62, 1);
  for (let i = 0; i < 24; i++) {
    const a = ((i + 0.5) / 24) * TAU;
    ck.box('slot', gx + Math.cos(a) * 6.98, L2 + 0.95, gz + Math.sin(a) * 6.98, 0.16, 0.5, 0.04, '#ffffff', HALF - a);
  }
  const coreG = ck.finish({ core: coreMat, slot: slotMat }, { shadows: false });
  coreG.name = 'deep/generator/core';
  // a soft halo round the port
  const haloMat = new THREE.MeshBasicMaterial({ name: 'deep/generator/halo', color: new THREE.Color('#ff7a2a'), transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false });
  const halo = new THREE.Mesh(new THREE.CircleGeometry(3.6, 32), haloMat);
  halo.position.set(gx, -1122.4, gz + 5.9);
  halo.name = 'deep/generator/halo';
  coreG.add(halo);
  dyn.add(coreG);

  // --------------------------------- steel scaffold round the west wall
  const RO = 71.0, RI = 66.4, th0 = 3.19, th1 = 4.33;
  const S = (R, th) => [Math.cos(th) * R, Math.sin(th) * R];
  const frame = '#1f2122';
  const thG = Math.atan2(gz, gx) + TAU;
  for (let i = 0; i < 14; i++) {
    const th = th0 + (i / 13) * (th1 - th0);
    {
      const [x, z] = S(RO, th);
      k.box('metal', x, (yb + L3 + 1.2) / 2, z, 0.36, L3 + 1.2 - yb, 0.36, frame, HALF - th);
    }
    const [ax, az] = S(RO, th), [bx, bz2] = S(RI, th);
    for (const y of [L1, L2, L3]) k.beam('metal', [ax, y - 0.2, az], [bx, y - 0.2, bz2], 0.16, 0.22, frame);
    k.beam('metal', [ax, yb, az], [bx, L1 - 0.3, bz2], 0.07, 0.07, frame);
  }
  const nSeg = 40;
  for (const y of [L1, L2, L3]) {
    for (let i = 0; i < nSeg; i++) {
      const th = th0 + ((i + 0.5) / nSeg) * (th1 - th0);
      const [x, z] = S((RO + RI) / 2, th);
      k.box('metal', x, y - 0.06, z, ((RO + RI) / 2) * ((th1 - th0) / nSeg) + 0.04, 0.1, RO - RI + 0.3, deckC, HALF - th);
    }
    for (const R of [RO, RI]) {
      for (let i = 0; i < 13; i++) {
        const [ax, az] = S(R, th0 + (i / 13) * (th1 - th0)), [bx, bz2] = S(R, th0 + ((i + 1) / 13) * (th1 - th0));
        k.beam('metal', [ax, y - 0.2, az], [bx, y - 0.2, bz2], 0.14, 0.24, frame);
      }
    }
    // inner railing, with a gap where the bridges come in
    const gap = y === L3 ? 0 : 0.012;
    const arc = (ta, tb) => {
      const pts = [];
      const n = Math.max(2, Math.round((tb - ta) * 30));
      for (let i = 0; i <= n; i++) {
        const [x, z] = S(RI - 0.1, ta + ((tb - ta) * i) / n);
        pts.push([x, y, z]);
      }
      return pts;
    };
    if (gap) {
      rail(arc(th0, thG - gap));
      rail(arc(thG + gap, th1));
    } else rail(arc(th0, th1));
  }
  // bridges from the scaffold to both gantries, and the gantry railings
  for (const [y, rin] of [[L1, 8.35], [L2, 9.75]]) {
    const len = RI - 0.1 - gR - rin, mid = rin + len / 2;
    const bry = Math.atan2(ux, uz), nx = -uz, nz = ux;
    k.box('metal', gx + ux * mid, y - 0.06, gz + uz * mid, 1.4, 0.1, len, deckC, bry);
    for (const s of [-1, 1]) {
      k.box('metal', gx + ux * mid + nx * s * 0.72, y - 0.3, gz + uz * mid + nz * s * 0.72, 0.1, 0.4, len, frame, bry);
      rail([[gx + ux * rin + nx * s * 0.7, y, gz + uz * rin + nz * s * 0.7], [gx + ux * (rin + len) + nx * s * 0.7, y, gz + uz * (rin + len) + nz * s * 0.7]]);
    }
    const ga = Math.atan2(uz, ux), w = 0.72 / rin;
    rail(ring(rin - 0.05, y, ga + w, ga + TAU - w));
  }
  // stair climbing the wall behind the scaffold, from the back of the hall
  // up towards the front
  const nSteps = 123, sth0 = 3.363, sth1 = 4.29, rise = (L3 - yb) / nSteps;
  const stepAt = (i) => sth1 - (i / nSteps) * (sth1 - sth0);
  for (let i = 0; i < nSteps; i++) {
    const th = stepAt(i + 0.5);
    const [x, z] = S(72.35, th);
    k.box('metal', x, yb + (i + 1) * rise - 0.03, z, 0.6, 0.06, 2.0, '#34373a', HALF - th);
  }
  for (const R of [71.3, 73.4]) {
    for (let i = 0; i < nSteps; i += 6) {
      const j = Math.min(nSteps, i + 6);
      const [ax, az] = S(R, stepAt(i)), [bx, bz2] = S(R, stepAt(j));
      k.beam('metal', [ax, yb + i * rise - 0.15, az], [bx, yb + j * rise - 0.15, bz2], 0.08, 0.3, frame);
    }
  }
  const hr = [];
  for (let i = 0; i <= nSteps; i += 6) {
    const [x, z] = S(71.35, stepAt(i));
    hr.push([x, yb + i * rise, z]);
  }
  P.railing(k, hr, 1.0, { color: railC, posts: 1.8 });
  for (const y of [L1, L2, L3]) {
    const th = stepAt((y - yb) / rise);
    const [x, z] = S(72.0, th);
    k.box('metal', x, y - 0.06, z, 1.6, 0.1, 3.0, deckC, HALF - th);
  }

  // control box on the scaffold: a grid of lamps, an oval gauge window
  const cth = 3.40, cpy = -1106.6, cry = 0.47;
  const [cpx, cpz] = S(65.9, cth);
  k.push(cpx, cpy, cpz, cry);
  // a big pale box: a lamp panel on the left, an oval gauge window on the right
  const bx = -1.4, bW = 11.2, bH = 4.4;
  k.box('metal', bx, 0, 0, bW, bH, 1.0, '#8c8f8c');
  k.box('metal', bx, bH / 2 + 0.04, 0, bW + 0.1, 0.08, 1.1, '#6d706d');
  k.box('matte', bx - 2.5, 0, 0.51, 5.6, 3.5, 0.02, '#a2aaa4');
  for (let i = 0; i < 60; i++) {
    const c = i % 10, rw = Math.floor(i / 10);
    k.box('glow', bx - 4.9 + c * 0.53, 1.3 - rw * 0.52, 0.53, 0.2, 0.2, 0.02, col(['#6fe36a', '#6fe36a', '#9fe39a', '#ffb45a'][(i * 7) % 4], 2.6));
  }
  const ox = bx + 2.9;
  k.geo('metal', UNIT.torus(0.09, 6, 36), ox, 0, 0.52, '#e3e1da', 2.2, 1.45, 1.5);
  k.geo('matte', UNIT.circle(32), ox, 0, 0.515, '#141818', 2.15, 1.4, 1);
  k.geo('glass', UNIT.circle(32), ox, 0, 0.53, '#9fb0b0', 2.15, 1.4, 1);
  k.box('matte', ox + 0.55, -0.05, 0.525, 0.05, 1.0, 0.01, '#a3241c', 0, 0, -0.6);
  k.pop();
  const W = (lx, lz) => [cpx + lx * Math.cos(cry) + lz * Math.sin(cry), cpz - lx * Math.sin(cry) + lz * Math.cos(cry)];
  const ps = W(bx, 0.53);
  signs.place(signs.make('MAIN POWER', { style: 'light', size: 40 }), ps[0], cpy + bH / 2 + 0.35, ps[1], 0.34, cry);
  // riser from the box to the floor, and the feed across to the generator
  const vp = W(-2.3, 0.1);
  k.rod('metal', [vp[0], cpy - bH / 2, vp[1]], [vp[0], yb, vp[1]], 0.4, '#2c2e30', 12);
  k.cyl('metal', vp[0], yb, vp[1], 0.6, 0.3, '#1f2122', 12);
  const gg = W(-2.3, 0.55);
  k.cylR('matte', gg[0], yb + 4.6, gg[1], 0.22, 0.05, '#ece6d2', 0, cry - HALF, -HALF, 16);
  k.geo('metal', UNIT.torus(0.12, 6, 18), gg[0], yb + 1.7, gg[1], '#b32a22', 0.34, 0.34, 0.34, 0, cry, 0);
  const rs = W(-1.75, 0.45);
  signs.place(signs.make('SHUT', { style: 'red', size: 36 }), rs[0], yb + 2.4, rs[1], 0.2, cry);
  const hy = -1112.3;
  const ddx = gx - vp[0], ddz = gz - vp[1], dl = Math.hypot(ddx, ddz);
  const e = [gx - (ddx / dl) * 4.35, gz - (ddz / dl) * 4.35];
  k.sphere('metal', vp[0], hy, vp[1], 0.5, '#2c2e30', 10, 6);
  k.rod('metal', [vp[0], hy, vp[1]], [e[0], hy, e[1]], 0.36, '#3a3d40', 10);
  const pl = Math.hypot(e[0] - vp[0], e[1] - vp[1]), pry = Math.atan2(-ddz, ddx);
  for (let d = 2.5; d < pl - 0.5; d += 4) {
    const t = d / pl;
    k.cylR('metal', vp[0] + (e[0] - vp[0]) * t, hy, vp[1] + (e[1] - vp[1]) * t, 0.48, 0.18, '#1c1e1f', 0, pry, -HALF, 12);
  }
  const steam = new Wisps('deep/generator/steam', { size: 1.7, opacity: 0.3, rise: 2.4, life: 4.2, seed: 1451 });
  const sp = W(bx + bW / 2 + 0.4, 0.3);
  steam.add(sp[0], cpy + 0.2, sp[1], 2, 0.6);
  steam.add(vp[0] + (e[0] - vp[0]) * 0.35, hy + 0.3, vp[1] + (e[1] - vp[1]) * 0.35, 1, 0.3);
  dyn.add(steam.group);
  updaters.push(steam.update);
  power.hooks.push((on) => (steam.group.visible = on));

  // ------------------------------------ drive motor by the core's west face
  const mx0 = -24.9, mz0 = -28.5, my = yb + 2.3;
  k.bb('matte', mx0 - 3.2, yb, mz0 - 1.9, mx0 + 2.6, yb + 0.35, mz0 + 1.9, '#b3ada2');
  for (const s of [-1, 1]) k.box('metal', mx0 + 0.3, yb + 0.65, mz0 + s * 1.2, 3.8, 0.6, 0.5, '#1b1c1d');
  k.cylR('metal', mx0 + 0.3, my, mz0, 1.85, 4.4, '#1b1c1d', 0, 0, HALF, 28);
  for (let i = 0; i < 10; i++) k.geo('metal', UNIT.torus(0.05, 4, 28), mx0 - 1.6 + i * 0.42, my, mz0, '#111213', 1.87, 1.87, 1.87, 0, HALF, 0);
  k.cylR('metal', mx0 - 2.2, my, mz0, 1.6, 0.6, '#232526', 0, 0, HALF, 28);
  k.box('metal', mx0 + 0.9, my + 2.15, mz0, 1.3, 0.9, 1.1, '#232526');
  k.box('matte', mx0 + 0.9, my + 2.61, mz0, 0.8, 0.02, 0.5, '#e9e4d6');
  k.cylR('metal', mx0 - 2.75, my, mz0, 0.22, 0.5, '#8a8d8e', 0, 0, HALF, 10);
  const fly = new THREE.Group();
  fly.name = 'deep/generator/flywheel';
  fly.position.set(mx0 - 3.1, my, mz0);
  const fk = new Kit('deep/generator/flywheel');
  fk.cylR('metal', 0, 0, 0, 1.15, 0.26, '#2b2d2e', 0, 0, HALF, 24);
  for (let i = 0; i < 4; i++) fk.box('matte', -0.14, Math.cos((i / 4) * TAU) * 0.86, Math.sin((i / 4) * TAU) * 0.86, 0.01, 0.34, 0.34, i % 2 ? '#1d1d1c' : '#d8b43a');
  fly.add(fk.finish(roomMats()));
  dyn.add(fly);

  // ------------------------------------------------------------ pump room
  const pumps = [[27, -34], [35, -37], [43, -38.5], [51, -37.5], [59, -33]];
  pumps.forEach(([x, z], i) => {
    const c = i % 2 ? '#3d5e66' : '#46646b';
    k.bb('concrete', x - 2.6, yb, z - 1.3, x + 2.6, yb + 0.6, z + 1.3, '#77726a');
    const ay = yb + 1.75;
    k.box('metal', x - 1.1, yb + 0.9, z, 2.4, 0.6, 1.5, '#2b2d2e');
    k.cylR('metal', x - 1.1, ay, z, 0.95, 2.6, '#56616a', 0, 0, HALF, 24);
    for (let j = 0; j < 7; j++) k.geo('metal', UNIT.torus(0.05, 4, 24), x - 2.2 + j * 0.37, ay, z, '#4a545c', 0.97, 0.97, 0.97, 0, HALF, 0);
    k.cylR('metal', x - 2.45, ay, z, 0.7, 0.12, '#3a4046', 0, 0, HALF, 20);
    k.box('metal', x - 1.1, ay + 1.0, z + 0.5, 0.5, 0.35, 0.35, '#56616a');
    k.box('metal', x + 0.45, ay, z, 0.55, 0.9, 0.9, '#c9a13b');
    k.cylR('metal', x + 1.45, ay, z, 1.3, 0.95, c, 0, 0, HALF, 28);
    for (const fx of [1.0, 1.9]) k.geo('metal', UNIT.torus(0.05, 5, 28), x + fx, ay, z, '#2e3436', 1.3, 1.3, 1.3, 0, HALF, 0);
    k.cylR('metal', x + 2.3, ay, z, 0.5, 0.9, c, 0, 0, HALF, 16);
    k.cylR('metal', x + 2.55, ay, z, 0.72, 0.1, '#2e3436', 0, 0, HALF, 16);
    k.sphere('metal', x + 2.75, ay, z, 0.52, c, 12, 8);
    k.cyl('metal', x + 2.75, yb, z, 0.5, ay - yb, c, 16);
    k.cyl('metal', x + 1.45, ay + 1.1, z, 0.42, 1.4, c, 16);
    k.cyl('metal', x + 1.45, ay + 1.25, z, 0.6, 0.12, '#2e3436', 16);
    k.cylR('matte', x + 1.45, ay + 2.2, z + 0.47, 0.15, 0.04, '#ece6d2', HALF, 0, 0, 16);
  });
  // three standpipes from floor to ceiling near the cut, green valve heads low down
  for (const [x, z] of [[30.6, -4.65], [42.05, -8.95], [52.5, -12.9]]) {
    k.cyl('metal', x, yb, z, 0.16, pumpTop - yb, '#1f2122', 10);
    k.cyl('metal', x, yb + 0.35, z, 0.36, 0.45, '#2f6a52', 12);
    k.cyl('metal', x, pumpTop - 0.3, z, 0.26, 0.3, '#1a1b1c', 10);
  }
  // a pipe curving round under the ceiling
  const cp = [];
  for (let i = 0; i <= 24; i++) {
    const a = -0.97 + (i / 24) * 0.88;
    cp.push([Math.cos(a) * 50, pumpTop - 0.45, Math.sin(a) * 50]);
  }
  for (let i = 0; i < cp.length - 1; i++) k.rod('metal', cp[i], cp[i + 1], 0.14, '#232526', 8);
  for (let i = 2; i < cp.length; i += 5) k.box('metal', cp[i][0], pumpTop - 0.2, cp[i][2], 0.08, 0.4, 0.08, '#1a1b1c');
  const bp = [];
  for (let i = 0; i <= 20; i++) {
    const a = -1.25 + (i / 20) * 1.1;
    bp.push([Math.cos(a) * 74.2, yb + 3.2, Math.sin(a) * 74.2]);
  }
  for (let i = 0; i < bp.length - 1; i++) k.rod('metal', bp[i], bp[i + 1], 0.16, '#3a3c3d', 8);
  // feed main along the floor from the first pump into the core
  const feed = [[24.4, -34], [CX, -34]];
  for (let i = 0; i < feed.length - 1; i++) {
    const [ax, az] = feed[i], [bx, bz2] = feed[i + 1];
    k.rod('metal', [ax, yb + 0.9, az], [bx, yb + 0.9, bz2], 0.55, '#4d5a4a', 14);
    const len = Math.hypot(bx - ax, bz2 - az);
    for (let d = 2; d < len; d += 5) {
      const t = d / len;
      const x = ax + (bx - ax) * t;
      if (Math.abs(x) < CX + 0.8) continue;
      k.box('concrete', x, yb + 0.2, az + (bz2 - az) * t, 0.9, 0.4, 0.9, '#77726a');
    }
  }
  k.cylR('metal', CX + 0.1, yb + 0.9, -34, 0.8, 0.3, '#2e3436', 0, 0, HALF, 16);
  k.cyl('metal', 24.4, yb, -34, 0.55, 0.9, '#4d5a4a', 14);
  // wet floor sheen round the pumps
  const sheen = new Batch();
  const white = new THREE.Color(1, 1, 1);
  const blob = (x, z, rad, seed) => {
    const rr = makeRng(seed);
    const p1 = rr() * 6, p2 = rr() * 6;
    const s = new THREE.Shape();
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * TAU;
      const d = rad * (0.82 + 0.14 * Math.sin(a * 3 + p1) + 0.08 * Math.sin(a * 5 + p2));
      if (i === 0) s.moveTo(Math.cos(a) * d, Math.sin(a) * d);
      else s.lineTo(Math.cos(a) * d, Math.sin(a) * d);
    }
    const g = new THREE.ShapeGeometry(s);
    g.rotateX(-HALF);
    sheen.add(g, new THREE.Matrix4().makeTranslation(x, yb + 0.1, z), white);
  };
  blob(31, -31, 6, 1);
  blob(47, -33, 7, 2);
  blob(58, -26, 5, 3);
  blob(38, -22, 4, 4);
  blob(26, -18, 3.5, 5);
  const wet = new THREE.Mesh(sheen.build(), MATS.sheen);
  wet.name = 'deep/pumps/sheen';
  k.mesh(wet);
  // tarp over a pile of crates
  const tx = 26.5, tz = -8.5;
  P.crate(k, tx - 0.55, yb, tz, 0.9, '#7a5a38');
  P.crate(k, tx + 0.5, yb, tz + 0.1, 0.9, '#8b6a43', 0.1);
  P.crate(k, tx, yb + 0.9, tz, 0.6, '#9a7a50');
  P.crate(k, tx + 2.9, yb, tz + 0.4, 0.7, '#7a5a38', 0.3);
  const tarp = new THREE.PlaneGeometry(4.6, 3.6, 18, 14);
  tarp.rotateX(-HALF);
  const tp = tarp.attributes.position;
  for (let i = 0; i < tp.count; i++) {
    const x = tp.getX(i), z = tp.getZ(i);
    const hx = 1 - smooth(1.2, 2.3, Math.abs(x)), hz = 1 - smooth(0.8, 1.8, Math.abs(z));
    tp.setY(i, Math.max(0.02, 1.58 * Math.min(hx, hz) + fbm(x * 1.6 + 3, z * 1.6, 2) * 0.12));
  }
  tarp.computeVertexNormals();
  k.geo('fabric', tarp, tx, yb, tz, '#4f5d3f');
  for (const x of [-0.6, 0.6]) k.rod('fabric', [tx + x, yb + 0.05, tz + 1.75], [tx + x, yb + 1.62, tz], 0.015, '#c9b58a', 4);
  k.bb('matte', 21, yb, -8, 70, yb + 0.012, -7.7, '#b59a3a');
  for (const s of [-1, 1]) k.cyl('metal', 30 + s * 1.6, yb, -12.5, 0.05, 4.2, '#2a2c2d', 6);
  signs.place(signs.make('PUMP ROOM', { style: 'panel', size: 52 }), 30, yb + 3.8, -12.46, 0.55);
  // bare lamps hung low on long cords
  for (const [x, z] of [[44.8, -24], [66.9, -28.3], [72, -12.5], [48, -57.7]]) {
    k.cyl('metal', x, -1120.8, z, 0.012, pumpTop - -1120.8, '#1e1f20', 3);
    cagedBulb(k, x, -1121, z, { color: '#f4f0e6', power: 5, stem: 0 });
  }

  // lamps: the core spot and the gantry work light die with the generator
  const coreSpot = spot(pool, gx, yb + 3, gz + 7.5, 0xff8a3a, 80);
  const genSpot = spot(pool, gx + 2, -1101, gz + 11, 0xdfe9ff, 30);
  power.spots.push([coreSpot, 80], [genSpot, 30]);
  pool.add(-58, -1104, -24, 0xdfe9ff, 24);
  pool.add(-60, -1106, -12, 0xd8ffe0, 10);
  pool.add(-25, -1118, -31, 0xffe2b8, 14);
  pool.add(42, -1117.5, -28, 0xd8ecff, 12);
  pool.add(58, -1119, -16, 0xd8ecff, 9);
  pool.add(26, -1121, -9, 0xffd9a8, 12);

  updaters.push((dt, t) => {
    const flick = 1 + 0.05 * Math.sin(t * 9) + 0.03 * Math.sin(t * 23);
    const g = 0.015 + 0.985 * power.glow;
    coreMat.color.copy(CORE).multiplyScalar(g * flick);
    slotMat.color.copy(SLOT).multiplyScalar(g);
    haloMat.opacity = 0.32 * g * flick;
    fly.rotation.x -= dt * 3.2 * power.spin;
  });
  return k.finish(roomMats());
}

// ---------------------------------------------------------------------------
// Under the cap: the flooded cavern and the boring machine.
// ---------------------------------------------------------------------------
function digger({ pool, signs, dyn, updaters, power }) {
  const k = new Kit('deep/digger');
  const r = makeRng(14747);
  const yTop = C.CAP_Y, yBot = C.CAVE_Y, yW = -1177.8;
  const tun = { x: -75.5, y: -1173, z: -13 };
  const tunA = Math.atan2(tun.z, tun.x) + TAU;
  const rockC = new THREE.Color('#3a342e'), wetC = new THREE.Color('#262b29'), mudC = new THREE.Color('#5e4c3c'), tmp = new THREE.Color();

  // curved back wall, tucked behind the section frame at both ends and
  // pushed back round the tunnel mouth
  const wallR = (phi, y) => {
    let R = 74 + fbm(phi * 10, y / 8, 4) * 6 + fbm(phi * 3 + 4, y / 20, 2) * 5;
    const end = Math.min(phi - Math.PI, TAU - phi) * 74;
    R = lerp(Math.max(R, 75.8), R, smooth(0, 5, end));
    const d = Math.hypot((phi - tunA) * 74, y - tun.y);
    return Math.max(R, lerp(77, R, smooth(5.6, 8.0, d)));
  };
  const shade = (c, k2) => {
    tmp.copy(c).multiplyScalar(Math.max(0.3, k2));
    return [tmp.r, tmp.g, tmp.b];
  };
  const wallG = gridGeo(150, 30, (u, v) => {
    const phi = Math.PI + u * Math.PI, y = yBot + 1 + v * (yTop - yBot - 1);
    const R = wallR(phi, y);
    const base = tmp.copy(rockC).lerp(wetC, smooth(-1175.5, -1178.5, y)).clone();
    return [Math.cos(phi) * R, y, Math.sin(phi) * R, ...shade(base, 1.12 - (R - 73.5) * 0.07 + fbm(phi * 30, y / 3, 2) * 0.4)];
  }, (x, y, z) => [-x, 0, -z]);
  k.geo('rock', wallG, 0, 0, 0, '#ffffff');
  // rough ceiling just under the cap, flush with it at the cut
  const ceilY = (x, z) => yTop - 0.05 - smooth(0, 7, -z) * (0.5 + (fbm(x / 9, z / 9, 4) + 0.35) * 2.6);
  const ceilG = gridGeo(96, 22, (u, v) => {
    const phi = Math.PI + u * Math.PI, rad = v * 78;
    const x = Math.cos(phi) * rad, z = Math.sin(phi) * rad;
    return [x, ceilY(x, z), z, ...shade(rockC, 0.8 + fbm(x / 4, z / 4, 2) * 0.5)];
  }, () => [0, -1, 0]);
  k.geo('rock', ceilG, 0, 0, 0, '#ffffff');
  // uneven floor, rising to a shore near the wall, flat at the cut
  const floorY = (x, z) => {
    const rad = Math.hypot(x, z);
    return -1179 + smooth(0, 6, -z) * (-0.8 + fbm(x / 7, z / 7, 4) * 2.2 + smooth(64, 74, rad) * 3.4);
  };
  const floorG = gridGeo(96, 24, (u, v) => {
    const phi = Math.PI + u * Math.PI, rad = v * 78;
    const x = Math.cos(phi) * rad, z = Math.sin(phi) * rad, y = floorY(x, z);
    return [x, y, z, ...shade(y < yW ? wetC : mudC, 0.8 + fbm(x / 3, z / 3, 2) * 0.5)];
  }, () => [0, 1, 0]);
  k.geo('rock', floorG, 0, 0, 0, '#ffffff');
  // shore boulders
  for (let i = 0; i < 18; i++) {
    const phi = Math.PI + 0.1 + r() * (Math.PI - 0.2), rad = 62 + r() * 10;
    const x = Math.cos(phi) * rad, z = Math.sin(phi) * rad;
    if (z > -4) continue;
    const s = 0.8 + r() * 2.2;
    k.ico('rock', x, floorY(x, z) + s * 0.2, z, s, col('#3e3831', 0.75 + r() * 0.35), 0, 0.6 + r() * 0.4, r() * 6);
  }
  // low mud banks breaking the surface of the pool
  const banks = [[-46, -33, 6.0, 3.5], [10.5, -14.5, 8.0, 5.5], [38, -44.3, 4.5, 3.0], [57, -11, 2.4, 1.6]];
  for (const [x, z, sx, sz] of banks) {
    k.geo('rock', UNIT.sphere(18, 6), x, yW - 0.42, z, col('#6e5a48', 0.9 + r() * 0.15), sx, 0.7, sz, 0, r() * 0.4, 0);
  }
  // a lantern and a sack left on the bank beside the rig
  const [lbx, lbz] = [7.8, -17.2];
  k.cyl('wood', lbx, yW + 0.1, lbz, 0.05, 1.1, '#5a4a36', 6);
  k.box('metal', lbx, yW + 1.3, lbz, 0.26, 0.04, 0.26, '#2a2c2d');
  k.box('glass', lbx, yW + 1.15, lbz, 0.22, 0.26, 0.22, '#e8e2c8');
  k.sphere('glow', lbx, yW + 1.15, lbz, 0.08, col('#ffc27a', 6), 8, 6);
  P.sack(k, 13.4, yW + 0.12, -17.4, 0.6, '#8a7a5a');
  pool.add(lbx, yW + 1.6, lbz, 0xffc27a, 14);

  // section frame at the cut, the water's cut edge and the pool bed below it
  const sec = '#6a5846';
  k.bb('matte', -78, yBot, -0.6, -75, yTop, 0, sec);
  k.bb('matte', 75, yBot, -0.6, 78, yTop, 0, sec);
  k.bb('matte', -78, yBot - 0.5, -0.6, 78, -1179, 0, sec);
  k.bb('matte', -75, -1178.6, -0.05, 75, yW, 0.003, '#24484e');
  k.bb('matte', -75, -1179, -0.05, 75, -1178.6, 0.002, '#1a1c1b');

  // the pool
  const wm = waterMat('#34504f');
  wm.normalMap.repeat.set(24, 24);
  const water = new THREE.Mesh(new THREE.CircleGeometry(74, 72, 0, Math.PI), wm);
  water.rotation.x = -HALF;
  water.position.y = yW;
  water.name = 'deep/digger/water';
  dyn.add(water);
  updaters.push((dt, t) => wm.normalMap.offset.set(t * 0.012, t * 0.008));

  // a bolted hatch in the cavern roof, right under the core
  const hy = ceilY(0, -3.6) - 0.08;
  k.cyl('metal', 0, hy - 0.05, -3.6, 2.75, 0.15, '#3a3c3d', 32);
  k.cyl('metal', 0, hy - 0.12, -3.6, 2.35, 0.08, '#4a4d4e', 32);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * TAU;
    k.cyl('metal', Math.cos(a) * 2.55, hy - 0.12, -3.6 + Math.sin(a) * 2.55, 0.07, 0.08, '#8a8d8e', 6);
  }
  k.geo('metal', UNIT.torus(0.15, 6, 18), 0, hy - 0.22, -3.6, '#6a2a22', 0.4, 0.4, 0.4, HALF, 0, 0);

  // --------------------------------------------------------- boring machine
  const mx = -8, mz = -22;
  const dark = '#2c2e30', copper = '#7a4a2e';
  // four short splayed legs down to the pool bed
  const feet = [];
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + i * HALF;
    const foot = [mx + Math.cos(a) * 6.4, -1179.3, mz + Math.sin(a) * 6.4];
    feet.push(foot);
    k.cyl('metal', foot[0], -1179.8, foot[2], 0.9, 0.45, '#232526', 12);
    k.beam('metal', foot, [mx + Math.cos(a) * 4.0, -1175.7, mz + Math.sin(a) * 4.0], 0.42, 0.42, '#232526');
  }
  for (let i = 0; i < 4; i++) k.rod('metal', feet[i], feet[(i + 2) % 4], 0.12, '#1c1d1e', 6);
  // copper base drum, the tower, flanges, seams, ladder and stencil
  k.cyl('metal', mx, -1176.0, mz, 5.0, 4.7, copper, 40);
  for (const y of [-1175.6, -1171.8]) k.geo('metal', UNIT.torus(0.04, 5, 48), mx, y, mz, '#4a2a1a', 5.02, 5.02, 5.02, HALF, 0, 0);
  k.cyl('metal', mx, -1171.3, mz, 4.1, 18.6, dark, 40);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * TAU + 0.1;
    k.box('metal', mx + Math.cos(a) * 4.12, -1162.0, mz + Math.sin(a) * 4.12, 0.05, 18.5, 0.05, '#1c1e1f', HALF - a);
  }
  for (const y of [-1170.8, -1165.9, -1159.6, -1153.3]) k.geo('metal', UNIT.torus(0.04, 5, 48), mx, y, mz, '#1c1e1f', 4.14, 4.14, 4.14, HALF, 0, 0);
  signs.place(signs.make('BR-02', { style: 'paint', size: 70 }), mx, -1162.4, mz + 4.12, 0.7);
  const lzz = mz + 4.3;
  for (const s of [-1, 1]) k.rod('metal', [mx + s * 0.26, yW, lzz], [mx + s * 0.26, -1153.4, lzz], 0.03, '#8a8d8e', 5);
  for (let i = 0; i < 20; i++) k.rod('metal', [mx - 0.26, -1170.8 + i * 0.9, lzz], [mx + 0.26, -1170.8 + i * 0.9, lzz], 0.02, '#8a8d8e', 4);
  for (const y of [-1170, -1164, -1158]) for (const s of [-1, 1]) k.rod('metal', [mx + s * 0.26, y, mz + 4.05], [mx + s * 0.26, y, lzz], 0.025, '#8a8d8e', 4);
  // ring walkway on spokes, with a railing
  const pyy = -1165.5, RR = 13.0;
  for (let i = 0; i < 36; i++) {
    const a = ((i + 0.5) / 36) * TAU;
    k.box('metal', mx + Math.cos(a) * 12.45, pyy - 0.06, mz + Math.sin(a) * 12.45, 2.2, 0.1, 1.2, '#2e3032', HALF - a);
  }
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * TAU, b = ((i + 1) / 36) * TAU;
    const P0 = [mx + Math.cos(a) * RR, pyy, mz + Math.sin(a) * RR];
    k.rod('metal', P0, [P0[0], pyy + 1.1, P0[2]], 0.025, '#3a3c3d', 4);
    for (const h of [0.55, 1.1]) k.rod('metal', [P0[0], pyy + h, P0[2]], [mx + Math.cos(b) * RR, pyy + h, mz + Math.sin(b) * RR], 0.03, '#3a3c3d', 4);
  }
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU + 0.2;
    k.beam('metal', [mx + Math.cos(a) * 4.1, pyy - 0.25, mz + Math.sin(a) * 4.1], [mx + Math.cos(a) * 12.0, pyy - 0.25, mz + Math.sin(a) * 12.0], 0.22, 0.3, dark);
    k.rod('metal', [mx + Math.cos(a) * 4.1, pyy - 4.2, mz + Math.sin(a) * 4.1], [mx + Math.cos(a) * 11.2, pyy - 0.35, mz + Math.sin(a) * 11.2], 0.08, dark, 6);
  }
  // designation plate on the railing and work lamps
  const la = HALF - 0.5;
  const lpx = mx + Math.cos(la) * (RR + 0.05), lpz = mz + Math.sin(la) * (RR + 0.05);
  k.box('metal', lpx, pyy + 0.62, lpz, 2.5, 0.5, 0.04, '#c9bf9f', HALF - la);
  signs.place(signs.make('BORE RIG 02 · STANDBY', { style: 'stencil', size: 48 }), lpx + Math.cos(la) * 0.03, pyy + 0.62, lpz + Math.sin(la) * 0.03, 0.36, HALF - la);
  for (const a of [HALF + 0.9, -0.4]) {
    const x = mx + Math.cos(a) * RR, z = mz + Math.sin(a) * RR;
    k.box('metal', x, pyy + 1.3, z, 0.4, 0.3, 0.3, '#2a2c2d', HALF - a);
    k.box('glow', x + Math.cos(a) * 0.16, pyy + 1.3, z + Math.sin(a) * 0.16, 0.32, 0.22, 0.02, col('#fff0d8', 4), HALF - a);
  }

  // rotating head: eight cutter arms and the studded cone
  const head = new THREE.Group();
  head.name = 'deep/digger/head';
  head.position.set(mx, 0, mz);
  const hk = new Kit('deep/digger/head');
  const ay0 = -1158.4, ay1 = -1154.3, rA = 4.1, rB = 18.3, dy0 = -1152.7;
  hk.cyl('metal', 0, -1159.6, 0, 4.4, 1.6, '#232526', 40);
  for (let i = 0; i < 8; i++) {
    hk.push(0, 0, 0, (-i / 8) * TAU);
    hk.beam('metal', [rA, ay0, 0], [rB, ay1, 0], 0.7, 0.7, '#303234');
    hk.rod('metal', [rA, ay0 - 1.1, 0], [rA + (rB - rA) * 0.6, ay0 + (ay1 - ay0) * 0.6 - 0.3, 0], 0.12, '#1f2122', 6);
    const tilt = Math.atan2(ay1 - ay0, rB - rA);
    hk.geo('metal', UNIT.cyl(16), rB + 0.6, ay1 + 0.05, 0, '#8e8c86', 0.75, 1.3, 0.75, 0, 0, -HALF + tilt);
    hk.geo('metal', UNIT.cone(16), rB + 1.4, ay1 + 0.1, 0, '#c8c5bc', 0.6, 0.5, 0.6, 0, 0, -HALF + tilt);
    for (let j = 0; j < 6; j++) {
      const b = (j / 6) * TAU;
      hk.box('metal', rB + 0.6, ay1 + 0.05 + Math.cos(b) * 0.8, Math.sin(b) * 0.8, 0.3, 0.18, 0.18, '#b0ada6', 0, b, 0);
    }
    hk.pop();
  }
  hk.cyl('metal', 0, dy0 - 0.5, 0, 8.1, 0.5, '#232526', 48);
  hk.cyl('metal', 0, dy0, 0, 7.8, 5.6, '#2a2c2e', 48, 2.3 / 7.8);
  hk.cyl('metal', 0, dy0 + 5.6, 0, 2.3, 0.6, '#232526', 24);
  hk.cyl('metal', 0, dy0 + 6.2, 0, 0.9, 0.9, '#2a2c2e', 16, 0.6);
  for (const t of [0.33, 0.66]) hk.geo('metal', UNIT.torus(0.04, 5, 48), 0, dy0 + t * 5.6, 0, '#1c1e1f', 7.8 - t * 5.5, 7.8 - t * 5.5, 7.8 - t * 5.5, HALF, 0, 0);
  // 48 cutters in three rings on the cone
  const up = new THREE.Vector3(0, 1, 0), nrm = new THREE.Vector3(), pos = new THREE.Vector3(), scl = new THREE.Vector3();
  const q = new THREE.Quaternion(), m4 = new THREE.Matrix4();
  const sn = Math.hypot(5.6, 5.5), nr = 5.6 / sn, ny = 5.5 / sn;
  [[22, 0.16], [16, 0.5], [10, 0.82]].forEach(([cnt, t], ri) => {
    const rr = 7.8 - t * 5.5, yy = dy0 + t * 5.6;
    for (let i = 0; i < cnt; i++) {
      const a = (i / cnt) * TAU + ri * 0.2;
      nrm.set(nr * Math.cos(a), ny, nr * Math.sin(a));
      q.setFromUnitVectors(up, nrm);
      pos.set(rr * Math.cos(a), yy, rr * Math.sin(a)).addScaledVector(nrm, 0.22);
      hk.geoMatrix('metal', UNIT.cyl(8), m4.compose(pos, q, scl.set(0.26, 0.45, 0.26)), '#3a3c3d');
      pos.addScaledVector(nrm, 0.32);
      hk.geoMatrix('metal', UNIT.sphere(8, 6), m4.compose(pos, q, scl.set(0.26, 0.2, 0.26)), '#d2cec5');
    }
  });
  head.add(hk.finish(roomMats()));
  dyn.add(head);
  updaters.push((dt) => (head.rotation.y += dt * 0.35 * power.spin));

  // bolted tunnel mouth in the west wall, with a lamp beside it
  const tdx = Math.cos(tunA), tdz = Math.sin(tunA);
  const tmx = tdx * 73.3, tmz = tdz * 73.3;
  const tRy = Math.atan2(-tdx, -tdz);
  const TW = (lx, lz) => [tmx + lx * Math.cos(tRy) + lz * Math.sin(tRy), tmz - lx * Math.sin(tRy) + lz * Math.cos(tRy)];
  k.push(tmx, 0, tmz, tRy);
  const tube = gridGeo(24, 3, (u, v) => {
    const a = u * TAU;
    return [Math.cos(a) * 3, tun.y + Math.sin(a) * 3, -v * 3.6, 0.35, 0.34, 0.32];
  }, (x, y) => [-x, tun.y - y, 0]);
  k.geo('matte', tube, 0, 0, 0, '#5a5650');
  // outward-facing sleeve: the lining above only faces in, and the rock is pushed back round it
  k.geo('matte', UNIT.cyl(24, 1, true), 0, tun.y, -1.8, '#4a4640', 3.12, 3.6, 3.12, HALF, 0, 0);
  k.geo('matte', UNIT.circle(24), 0, tun.y, -3.5, '#080909', 3.02, 3.02, 1);
  // a thick pale collar round the mouth, bolted near its inner edge
  const collar = new THREE.Shape();
  collar.absarc(0, 0, 5.3, 0, TAU, false);
  const cHole = new THREE.Path();
  cHole.absarc(0, 0, 3.0, 0, TAU, true);
  collar.holes.push(cHole);
  k.geo('concrete', extrude(collar, 0.7, false, 40), 0, tun.y, -0.2, '#8e8a82');
  k.geo('metal', UNIT.torus(0.03, 5, 40), 0, tun.y, 0.52, '#3a3c3d', 3.05, 3.05, 3.05);
  for (let i = 0; i < 16; i++) {
    const b = (i / 16) * TAU;
    k.cylR('metal', Math.cos(b) * 3.5, tun.y + Math.sin(b) * 3.5, 0.55, 0.09, 0.14, '#9a9d9e', HALF, 0, 0, 6);
  }
  k.box('rock', 0, tun.y - 4.9, 1.2, 7.5, 1.2, 3.2, '#3a342e');
  k.box('metal', 0, tun.y + 3.75, 0.62, 0.1, 0.1, 0.25, '#2a2c2d');
  cagedBulb(k, 0, tun.y + 3.6, 0.85, { color: '#ffcf8a', power: 5, stem: 0 });
  k.pop();
  const tl = TW(0, 1.4), ts = TW(-6.2, 0.12);
  signs.place(signs.make('NO ENTRY BEYOND THIS POINT', { style: 'red', size: 34 }), ts[0], tun.y + 1.2, ts[1], 0.28, tRy);
  pool.add(tl[0], tun.y + 2.2, tl[1], 0xffcf8a, 14);
  pool.add(0, -1164, -10, 0xcfe6ff, 60);
  pool.add(mx, -1160, mz + 15, 0xfff0d8, 22);
  pool.add(-40, -1168, -35, 0xcfe6ff, 26);
  pool.add(40, -1168, -35, 0xcfe6ff, 26);
  return k.finish(roomMats());
}
