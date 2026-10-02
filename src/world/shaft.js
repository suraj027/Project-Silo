import * as THREE from 'three';
import { Batch, Kit, UNIT, col } from '../core/geom.js';
import { MATS, TEX } from '../core/materials.js';
import { numeralAtlas, toTexture, floorNumberCanvas } from '../core/textures.js';
import { makeRng } from '../core/rng.js';
import * as C from '../core/constants.js';

// ---------------------------------------------------------------------------
// The Great Stair: a central column, a helix that turns twice per level, a
// landing ring on every level and three bridges per level tying them together.
// ---------------------------------------------------------------------------

const TURN_H = C.LEVEL_H / C.STAIR_TURNS_PER_LEVEL; // 3.8
const STEPS = C.STEPS_PER_TURN * C.STAIR_TURNS_PER_LEVEL; // 44 per level
const RISE = C.LEVEL_H / STEPS;
const DA = (Math.PI * 2) / C.STEPS_PER_TURN;
const HELIX_A0 = Math.PI * 0.5; // angle of the first tread at floor level
const HAND = -1; // turning direction as the stair climbs

/** Angle of the helix centreline at height h above a floor. */
const helixAngle = (h) => HELIX_A0 + HAND * (h / TURN_H) * Math.PI * 2;
/** Height (0..TURN_H) of the helix above a floor at angle a, nearest pass. */
function helixHeightAt(a) {
  let t = ((a - HELIX_A0) * HAND) / (Math.PI * 2);
  t -= Math.floor(t);
  return t * TURN_H;
}

const WHITE = new THREE.Color(1, 1, 1);

// Annular sector prism with outward normals on every face.
function sector(b, r0, r1, a0, a1, y0, y1, color, caps = true) {
  const P = (r, a, y) => [Math.cos(a) * r, y, Math.sin(a) * r];
  const face = (pts, n) => {
    const ids = pts.map((p, i) => b.vert(p[0], p[1], p[2], n[0], n[1], n[2], i === 1 || i === 2 ? 1 : 0, i >= 2 ? 1 : 0, color));
    b.tri(ids[0], ids[1], ids[2]);
    b.tri(ids[0], ids[2], ids[3]);
  };
  const am = (a0 + a1) / 2;
  // top (CCW from above)
  face([P(r0, a0, y1), P(r0, a1, y1), P(r1, a1, y1), P(r1, a0, y1)].reverse(), [0, 1, 0]);
  face([P(r0, a0, y0), P(r0, a1, y0), P(r1, a1, y0), P(r1, a0, y0)], [0, -1, 0]);
  face([P(r1, a0, y0), P(r1, a1, y0), P(r1, a1, y1), P(r1, a0, y1)].reverse(), [Math.cos(am), 0, Math.sin(am)]);
  face([P(r0, a0, y0), P(r0, a1, y0), P(r0, a1, y1), P(r0, a0, y1)], [-Math.cos(am), 0, -Math.sin(am)]);
  if (caps) {
    face([P(r0, a0, y0), P(r0, a0, y1), P(r1, a0, y1), P(r1, a0, y0)].reverse(), [Math.sin(a0), 0, -Math.cos(a0)]);
    face([P(r0, a1, y0), P(r0, a1, y1), P(r1, a1, y1), P(r1, a1, y0)], [-Math.sin(a1), 0, Math.cos(a1)]);
  }
}

// Fix winding after the fact: make every triangle agree with its vertex normal.
function orient(g) {
  const p = g.attributes.position, n = g.attributes.normal, idx = g.index.array;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), nn = new THREE.Vector3();
  for (let i = 0; i < idx.length; i += 3) {
    a.fromBufferAttribute(p, idx[i]);
    b.fromBufferAttribute(p, idx[i + 1]);
    c.fromBufferAttribute(p, idx[i + 2]);
    nn.fromBufferAttribute(n, idx[i]);
    const fn = b.sub(a).cross(c.sub(a));
    if (fn.dot(nn) < 0) {
      const t = idx[i + 1];
      idx[i + 1] = idx[i + 2];
      idx[i + 2] = t;
    }
  }
  return g;
}

/** Ribbon following the helix: for (h) returns [r, y] pairs for inner/outer edge. */
function helixRibbon(b, h0, h1, samples, fn, color) {
  let prev = null;
  for (let i = 0; i <= samples; i++) {
    const h = h0 + ((h1 - h0) * i) / samples;
    const a = helixAngle(h);
    const [[ra, ya], [rb, yb], n] = fn(h, a);
    const ia = b.vert(Math.cos(a) * ra, ya, Math.sin(a) * ra, n[0], n[1], n[2], i / 4, 0, color);
    const ib = b.vert(Math.cos(a) * rb, yb, Math.sin(a) * rb, n[0], n[1], n[2], i / 4, 1, color);
    if (prev) {
      b.tri(prev[0], prev[1], ib);
      b.tri(prev[0], ib, ia);
    }
    prev = [ia, ib];
  }
}

// ---------------------------------------------------------------------------
// Where a bridge flight meets the helix the parapet is left open. The gap is
// the bridge's width measured along the helix, i.e. a short span of height.
const BRIDGE_W = 3.0;
const HELIX_GAP = (Math.asin((BRIDGE_W / 2 + 0.1) / C.R_HELIX) * TURN_H) / (Math.PI * 2);

/** Split [hs, he] into the runs that stay solid between the open spans. */
function solidRuns(hs, he, gaps) {
  const cuts = gaps
    .map(([a, b]) => [Math.max(a, hs), Math.min(b, he)])
    .filter(([a, b]) => b > a)
    .sort((p, q) => p[0] - q[0]);
  const runs = [];
  let s = hs;
  for (const [a, b] of cuts) {
    if (a > s + 0.02) runs.push([s, a]);
    s = Math.max(s, b);
  }
  if (he > s + 0.02) runs.push([s, he]);
  return runs;
}

function buildHelix({ h0 = 0, h1 = C.LEVEL_H, broken = false, openings = [] } = {}) {
  const concrete = new Batch();
  const trim = new Batch();
  const dark = col('#2a2c2e').clone();
  const stone = WHITE;
  const rnd = makeRng(Math.round(h0 * 100) + 5);
  const first = Math.ceil(h0 / RISE), last = Math.floor(h1 / RISE);
  for (let k = first; k < last; k++) {
    const top = (k + 1) * RISE;
    const a0 = helixAngle(k * RISE), a1 = helixAngle((k + 1.08) * RISE);
    const lo = Math.min(a0, a1), hi = Math.max(a0, a1);
    let r1 = 5.5;
    // broken ends: the outermost treads are snapped off
    if (broken && (k === first || k === last - 1)) r1 = 3.2 + rnd() * 1.5;
    sector(concrete, C.R_COL - 0.02, r1, lo, hi, top - 0.22, top, stone);
  }
  const hs = Math.max(h0, 0), he = Math.min(h1, C.LEVEL_H);
  const samples = Math.max(2, Math.round(((he - hs) / C.LEVEL_H) * 176));
  // soffit
  helixRibbon(concrete, hs, he, samples, (h, a) => [[C.R_COL, h - 0.52], [C.R_HELIX, h - 0.52], [0, -1, 0]], stone);
  // solid outer parapet (outside face, top, inside face) with a slim handrail,
  // left open where the bridges come in
  const PH = 1.0;
  const gaps = openings.map((h) => [h - HELIX_GAP, h + HELIX_GAP]);
  for (const [rs, re] of solidRuns(hs, he, gaps)) {
    const n = Math.max(2, Math.round(((re - rs) / (he - hs)) * samples));
    helixRibbon(concrete, rs, re, n, (h, a) => [[C.R_HELIX, h - 0.52], [C.R_HELIX, h + PH], [Math.cos(a), 0, Math.sin(a)]], stone);
    helixRibbon(concrete, rs, re, n, (h, a) => [[5.52, h + PH], [C.R_HELIX, h + PH], [0, 1, 0]], stone);
    helixRibbon(concrete, rs, re, n, (h, a) => [[5.52, h - 0.05], [5.52, h + PH], [-Math.cos(a), 0, -Math.sin(a)]], stone);
    // square ends where the parapet stops at an opening
    for (const [h, sgn] of [
      [rs, -1],
      [re, 1],
    ]) {
      if ((sgn < 0 && h <= hs + 1e-3) || (sgn > 0 && h >= he - 1e-3)) continue;
      const a = helixAngle(h);
      const t = [-Math.sin(a) * HAND * sgn, 0, Math.cos(a) * HAND * sgn];
      const P = (r, y) => [Math.cos(a) * r, y, Math.sin(a) * r];
      const q = [P(5.52, h - 0.05), P(C.R_HELIX, h - 0.52), P(C.R_HELIX, h + PH), P(5.52, h + PH)];
      const ids = q.map((p, i) => concrete.vert(p[0], p[1], p[2], t[0], t[1], t[2], i === 1 || i === 2 ? 1 : 0, i >= 2 ? 1 : 0, stone));
      concrete.tri(ids[0], ids[1], ids[2]);
      concrete.tri(ids[0], ids[2], ids[3]);
    }
    let prev = null;
    const m = Math.max(1, Math.round(n / 2));
    for (let i = 0; i <= m; i++) {
      const h = rs + ((re - rs) * i) / m;
      const a = helixAngle(h);
      const p = [Math.cos(a) * 5.71, h + PH + 0.1, Math.sin(a) * 5.71];
      if (prev) addRod(trim, prev, p, 0.03, dark, 5);
      prev = p;
    }
  }
  return { concrete: orient(concrete.build()), trim: trim.build() };
}

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _v = new THREE.Vector3(), _up = new THREE.Vector3(0, 1, 0);
function addRod(b, a, c, r, color, seg = 6) {
  _v.set(c[0] - a[0], c[1] - a[1], c[2] - a[2]);
  const len = _v.length();
  if (len < 1e-4) return;
  _q.setFromUnitVectors(_up, _v.divideScalar(len));
  _m.compose(new THREE.Vector3((a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2), _q, new THREE.Vector3(r, len, r));
  b.add(UNIT.cyl(seg), _m, color);
}
function addBox(b, x, y, z, sx, sy, sz, color, ry = 0) {
  _m.compose(new THREE.Vector3(x, y, z), _q.setFromEuler(new THREE.Euler(0, ry, 0)), new THREE.Vector3(sx, sy, sz));
  b.add(UNIT.box(), _m, color);
}

// ---------------------------------------------------------------------------
// Landing ring
// ---------------------------------------------------------------------------
// (silo17.js dresses pillars 1..7 of this set, on their inner faces at R_PILLAR - 0.3)
const PILLAR_ANGLES = Array.from({ length: 9 }, (_, i) => Math.PI + (i / 8) * Math.PI);
// the lamps hang on the pillars behind the cut, not on the two at the section
const LAMP_ANGLES = PILLAR_ANGLES.slice(1, -1);
// pillars were thickened outwards so their inner faces stay put
const PILLAR_R = 0.5, PILLAR_C = C.R_PILLAR - 0.3 + PILLAR_R;
// even levels: east, back-left, front-left… odd levels turned 60° from them
const BRIDGE_SETS = [
  [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3],
  [Math.PI / 3, Math.PI, (5 * Math.PI) / 3],
];
/** Height above the floor of the helix pass a bridge climbs to (first turn). */
const bridgeHeight = (angle) => helixHeightAt(angle);
const HELIX_OPENINGS = BRIDGE_SETS.map((set) => set.map(bridgeHeight));

function buildGallery({ bridges, half = false }) {
  const concrete = new Batch();
  const trim = new Batch();
  const housing = new Batch();
  const glow = new Batch();
  const dark = col('#2a2c2e').clone();
  const seg = 96;
  const aStart = half ? Math.PI : 0, aEnd = Math.PI * 2;
  const n = half ? seg / 2 : seg;
  const rOut = C.R_HOLE; // meets the slab edge without overlapping it
  // gaps in the parapet where the bridges land
  const gapHalf = Math.asin(1.62 / C.R_GAL_IN);
  const inGap = (a) =>
    bridges.some((b) => {
      const d = Math.abs(((a - b + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
      return d < gapHalf;
    });
  for (let i = 0; i < n; i++) {
    const a0 = aStart + ((aEnd - aStart) * i) / n, a1 = aStart + ((aEnd - aStart) * (i + 1)) / n;
    sector(concrete, C.R_GAL_IN, rOut, a0, a1, -C.SLAB_T, 0, WHITE, false);
    // a shallow cornice where the ring meets the stairwell wall below; only
    // round the back, so the ring's front edge reads as one slab
    if (a0 >= Math.PI - 1e-6) sector(concrete, 18.5, 19.45, a0, a1, -1.25, -C.SLAB_T - 0.002, WALL_TONE, false);
  }
  if (!half) for (const a of [Math.PI, Math.PI * 2]) sector(concrete, 18.5, 19.45, a - 0.001, a, -1.25, -C.SLAB_T - 0.002, WALL_TONE);
  // solid parapet on the inner edge, broken where bridges arrive
  const ps = half ? 72 : 144;
  let runStart = null;
  const flush = (endA) => {
    if (runStart === null) return;
    const steps = Math.max(1, Math.round((endA - runStart) / ((Math.PI * 2) / 144)));
    for (let k = 0; k < steps; k++) {
      const a0 = runStart + ((endA - runStart) * k) / steps, a1 = runStart + ((endA - runStart) * (k + 1)) / steps;
      sector(concrete, C.R_GAL_IN, 15.34, a0, a1, 0, 1.02, WHITE, false);
    }
    sector(concrete, C.R_GAL_IN, 15.34, runStart, runStart + 0.001, 0, 1.02, WHITE);
    sector(concrete, C.R_GAL_IN, 15.34, endA - 0.001, endA, 0, 1.02, WHITE);
    // handrail on top of the run
    let prev = null;
    const rsN = Math.max(2, steps);
    for (let k = 0; k <= rsN; k++) {
      const a = runStart + ((endA - runStart) * k) / rsN;
      const p = [Math.cos(a) * 15.17, 1.12, Math.sin(a) * 15.17];
      if (prev) addRod(trim, prev, p, 0.03, dark, 5);
      prev = p;
    }
    runStart = null;
  };
  for (let i = 0; i <= ps; i++) {
    const a = aStart + ((aEnd - aStart) * i) / ps;
    const gap = inGap(a) || i === ps;
    if (!gap && runStart === null) runStart = a;
    if (gap) flush(a);
  }
  if (half) {
    // close the cut ends
    for (const a of [Math.PI, Math.PI * 2]) sector(concrete, C.R_GAL_IN, rOut, a - 0.001, a, -C.SLAB_T, 0, WHITE);
  }
  // stout concrete pillars
  for (const a of PILLAR_ANGLES) {
    const x = Math.cos(a) * PILLAR_C, z = Math.sin(a) * PILLAR_C;
    _m.compose(new THREE.Vector3(x, 3.5, z), _q.identity(), new THREE.Vector3(PILLAR_R, 7, PILLAR_R));
    concrete.add(UNIT.cyl(14), _m, WHITE);
    _m.compose(new THREE.Vector3(x, 6.82, z), _q.identity(), new THREE.Vector3(PILLAR_R + 0.16, 0.36, PILLAR_R + 0.16));
    concrete.add(UNIT.cyl(14), _m, WHITE);
    _m.compose(new THREE.Vector3(x, 0.14, z), _q.identity(), new THREE.Vector3(PILLAR_R + 0.12, 0.28, PILLAR_R + 0.12));
    concrete.add(UNIT.cyl(14), _m, WHITE);
  }
  // rectangular lamps on the pillars' stair faces: a glowing panel behind two
  // dark slats in a shallow steel box
  const warm = col('#ffe0b4', 4.6).clone();
  for (const a of LAMP_ANGLES) {
    const ry = -a + Math.PI / 2;
    const R = (d) => PILLAR_C - PILLAR_R - d;
    const at = (d) => [Math.cos(a) * R(d), Math.sin(a) * R(d)];
    let [x, z] = at(-0.05);
    addBox(housing, x, SCONCE_Y, z, 0.78, 0.5, 0.3, WHITE, ry);
    [x, z] = at(0.1);
    addBox(glow, x, SCONCE_Y, z, 0.64, 0.36, 0.02, warm, ry);
    [x, z] = at(0.12);
    for (const dy of [-0.06, 0.06]) addBox(housing, x, SCONCE_Y + dy, z, 0.66, 0.035, 0.03, WHITE, ry);
  }
  stairwellWall(concrete);
  return { concrete: orient(concrete.build()), trim: trim.build(), housing: housing.build(), glow: glow.build() };
}

// The stairwell's own wall: a half-cylinder standing on the edge of the slab
// opening, floor to ceiling behind the landing ring, pierced by doorways out
// to the lobby: a wide one each side just behind the cut (z -0.8 .. -5.2,
// leaving a short return at the section) and two round the back.
const WALL_IN = C.R_HOLE, WALL_OUT = C.R_HOLE + 0.3;
const SCONCE_Y = 2.75;
// the wall stands in the ring's shadow in the original: a shade darker
const WALL_TONE = new THREE.Color(0.8, 0.8, 0.79);
const sideDoor = [Math.asin(0.8 / WALL_IN), Math.asin(5.2 / WALL_IN)];
const WALL_DOORS = [
  [Math.PI + sideDoor[0], Math.PI + sideDoor[1], 3.0],
  [1.5 * Math.PI - 0.55 - 1.05 / WALL_IN, 1.5 * Math.PI - 0.55 + 1.05 / WALL_IN, 2.7],
  [1.5 * Math.PI + 0.55 - 1.05 / WALL_IN, 1.5 * Math.PI + 0.55 + 1.05 / WALL_IN, 2.7],
  [2 * Math.PI - sideDoor[1], 2 * Math.PI - sideDoor[0], 3.0],
];
function stairwellWall(b) {
  const H = C.ROOM_H;
  const runs = [];
  let a = Math.PI;
  for (const [d0, d1] of WALL_DOORS) {
    runs.push([a, d0]);
    a = d1;
  }
  runs.push([a, Math.PI * 2]);
  const step = Math.PI / 48;
  const span = (a0, a1, y0, y1) => {
    const n = Math.max(1, Math.round((a1 - a0) / step));
    for (let k = 0; k < n; k++) sector(b, WALL_IN, WALL_OUT, a0 + ((a1 - a0) * k) / n, a0 + ((a1 - a0) * (k + 1)) / n, y0, y1, WALL_TONE, false);
  };
  for (const [a0, a1] of runs) {
    span(a0, a1, 0, H);
    // jambs / cut ends
    sector(b, WALL_IN, WALL_OUT, a0, a0 + 0.0008, 0, H, WALL_TONE);
    sector(b, WALL_IN, WALL_OUT, a1 - 0.0008, a1, 0, H, WALL_TONE);
  }
  // lintels (their undersides come with the span)
  for (const [d0, d1, dh] of WALL_DOORS) span(d0, d1, dh, H);
}

// ---------------------------------------------------------------------------
// Bridges: a short flight from the helix to the ring at a fixed angle.
// ---------------------------------------------------------------------------
// Every flight climbs from the ring (floor level) to the helix pass above it,
// so some are nearly flat and some are proper stairs up to 3.5 m.
// `cut` (a radius) snaps the flight off short of the helix, for the Gap.
function buildBridge(angle, cut = null) {
  const concrete = new Batch();
  const trim = new Batch();
  const dark = col('#2a2c2e').clone();
  const hh = bridgeHeight(angle);
  // from just inside the helix treads to just past the ring parapet
  const r0 = 5.45, r1 = C.R_GAL_IN + 0.45;
  const W = BRIDGE_W, PW = 0.24, T = 0.45, LAND = 0.7, PH = 1.0;
  const rEnd = cut ?? r0;
  const local = new Batch();
  const localTrim = new Batch();
  const prism = (pts, z0, depth) => {
    const shape = new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)));
    const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 1 });
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 0.3, uv.getY(i) * 0.3);
    _m.makeTranslation(0, 0, z0);
    local.add(g, _m, WHITE);
  };
  // stepped profile in (radius, height): a short landing at each end and
  // equal risers between, over a straight sloping soffit
  const n = Math.max(1, Math.round(hh / 0.17));
  const rise = hh / n, tread = (r1 - r0 - 2 * LAND) / n;
  const soffit = (x) => -T + (hh * clamp01((r1 - LAND - x) / (r1 - LAND - r0)));
  const rail = (x) => PH + hh * clamp01((r1 - LAND - x) / (r1 - 2 * LAND - r0));
  const pts = [
    [r1, -T],
    [r1, 0],
  ];
  let x = r1 - LAND, y = 0;
  for (let k = 1; k <= n && x > rEnd; k++) {
    pts.push([x, (k - 1) * rise], [x, k * rise]);
    y = k * rise;
    x -= tread;
  }
  pts.push([rEnd, y], [rEnd, soffit(rEnd)]);
  if (rEnd < r1 - LAND) pts.push([r1 - LAND, -T]);
  prism(pts, -W / 2 + PW * 0.5, W - PW);
  // solid parapets with a slim rail on top
  for (const z0 of [-W / 2, W / 2 - PW]) {
    const outline = [
      [r1, -T],
      [r1, PH],
      [r1 - LAND, PH],
    ];
    if (rEnd < r0 + LAND) outline.push([r0 + LAND, hh + PH]);
    outline.push([rEnd, rail(rEnd)], [rEnd, soffit(rEnd)]);
    if (rEnd < r1 - LAND) outline.push([r1 - LAND, -T]);
    prism(outline, z0, PW);
    const zz = z0 + PW / 2;
    const knots = [r1, r1 - LAND, Math.max(r0 + LAND, rEnd), rEnd].filter((v, i, a) => i === 0 || v < a[i - 1] - 1e-3);
    for (let i = 0; i < knots.length - 1; i++) addRod(localTrim, [knots[i], rail(knots[i]) + 0.1, zz], [knots[i + 1], rail(knots[i + 1]) + 0.1, zz], 0.03, dark, 5);
  }
  if (cut !== null) {
    // snapped-off end: a few lumps still clinging to it
    const rr = makeRng(Math.round(angle * 1000));
    for (let i = 0; i < 5; i++) {
      const s = 0.18 + rr() * 0.22;
      _m.compose(
        new THREE.Vector3(rEnd + (rr() - 0.3) * 0.5, soffit(rEnd) + rr() * (y - soffit(rEnd)), (rr() - 0.5) * (W - 0.6)),
        _q.setFromEuler(new THREE.Euler(rr() * 3, rr() * 3, 0)),
        new THREE.Vector3(s, s * 0.7, s)
      );
      local.add(UNIT.ico(0), _m, col('#b8b3a6'));
    }
  }
  const rot = new THREE.Matrix4().makeRotationY(-angle);
  concrete.add(local.build(), rot, WHITE);
  trim.add(localTrim.build(), rot, WHITE);
  return { concrete: orient(concrete.build()), trim: trim.build() };
}
const clamp01 = (v) => Math.min(1, Math.max(0, v));

// ---------------------------------------------------------------------------
function instanced(name, geo, mat, ys, { cast = true, receive = true } = {}) {
  const im = new THREE.InstancedMesh(geo, mat, ys.length);
  im.name = name;
  ys.forEach((y, i) => im.setMatrixAt(i, _m.makeTranslation(0, y, 0)));
  im.instanceMatrix.needsUpdate = true;
  im.computeBoundingBox();
  im.computeBoundingSphere();
  im.castShadow = cast;
  im.receiveShadow = receive;
  im.matrixAutoUpdate = false;
  return im;
}

/** Split instances by vertical chunk for culling. */
function chunked(name, geo, mat, ys, chunks = 6, opts) {
  const g = new THREE.Group();
  g.name = name;
  const per = Math.ceil(ys.length / chunks);
  for (let i = 0; i < ys.length; i += per) g.add(instanced(`${name}#${i / per}`, geo, mat, ys.slice(i, i + per), opts));
  return g;
}

// The stair's concrete: the shared cast-concrete texture, toned down to the
// warm mid-grey of the stairwell.
let CONC = null;

export function buildShaft({ pool }) {
  const group = new THREE.Group();
  group.name = 'shaft';
  CONC = MATS.concrete.clone();
  CONC.name = 'shaftConcrete';
  // a neutral tint: the warm texture and lamps give the stair its faint
  // warmth, as in the original's grey concrete
  CONC.color.set('#c2c2b6');
  const trimMat = MATS.trim;
  const housingMat = new THREE.MeshStandardMaterial({ name: 'sconceHousing', color: '#3a3c3d', roughness: 0.6, metalness: 0.4 });

  // central column -----------------------------------------------------------
  const colH = C.DEPTH + 0.4;
  const column = new THREE.Mesh(new THREE.CylinderGeometry(C.R_COL, C.R_COL, colH, 40, 1, true), MATS.column);
  column.position.y = -colH / 2 - 0.2;
  column.name = 'column';
  column.castShadow = column.receiveShadow = true;
  group.add(column);

  // helix --------------------------------------------------------------------
  // one flight per level, in two variants whose parapets open where that
  // level's bridges come in
  const skip = new Set([C.GAP_LEVEL, C.GAP_LEVEL + 1]);
  for (const parity of [0, 1]) {
    const helix = buildHelix({ openings: HELIX_OPENINGS[parity] });
    const helixYs = [];
    for (let n = 2; n <= C.LEVELS; n++) if (n % 2 === parity && !skip.has(n)) helixYs.push(C.floorY(n));
    group.add(chunked(`helix${parity}`, helix.concrete, CONC, helixYs, 4));
    group.add(chunked(`helixRail${parity}`, helix.trim, trimMat, helixYs, 4, { cast: false }));
  }
  // the top flight stops under the roof slab
  const top = buildHelix({ h1: C.LEVEL_H - 0.64, openings: HELIX_OPENINGS[1] });
  const topC = new THREE.Mesh(top.concrete, CONC);
  const topT = new THREE.Mesh(top.trim, trimMat);
  topC.position.y = topT.position.y = C.floorY(1);
  topC.castShadow = topC.receiveShadow = true;
  topC.name = 'helixL1';
  group.add(topC, topT);

  // landing rings ----------------------------------------------------------
  const galYs = [[], []];
  for (let n = 1; n < C.LEVELS; n++) galYs[n % 2].push(C.floorY(n));
  for (const parity of [0, 1]) {
    const g = buildGallery({ bridges: BRIDGE_SETS[parity] });
    const ys = galYs[parity];
    group.add(chunked(`gallery${parity}`, g.concrete, CONC, ys));
    group.add(chunked(`galleryRail${parity}`, g.trim, trimMat, ys, 6, { cast: false }));
    group.add(chunked(`gallerySconceHousings${parity}`, g.housing, housingMat, ys, 6, { cast: false }));
    group.add(chunked(`gallerySconces${parity}`, g.glow, MATS.glow, ys, 6, { cast: false, receive: false }));
  }
  const g144 = buildGallery({ bridges: BRIDGE_SETS[C.LEVELS % 2], half: true });
  for (const [geo, mat, name] of [
    [g144.concrete, CONC, 'gallery144'],
    [g144.trim, trimMat, 'galleryRail144'],
    [g144.housing, housingMat, 'sconceHousing144'],
    [g144.glow, MATS.glow, 'sconce144'],
  ]) {
    const m = new THREE.Mesh(geo, mat);
    m.position.y = C.floorY(C.LEVELS);
    m.name = name;
    m.castShadow = m.receiveShadow = mat !== MATS.glow;
    group.add(m);
  }

  // bridges ------------------------------------------------------------------
  // on every level; in the Gap the flights that no longer meet a stair end
  // snapped off in mid-air
  const brokenAt = (n, a) => n === C.GAP_LEVEL || (n === C.GAP_LEVEL + 1 && bridgeHeight(a) > 1.0);
  for (const parity of [0, 1]) {
    BRIDGE_SETS[parity].forEach((a, i) => {
      const br = buildBridge(a);
      const ys = [];
      for (let n = 1; n <= C.LEVELS; n++) {
        if (n % 2 !== parity) continue;
        if (!brokenAt(n, a)) {
          ys.push(C.floorY(n));
          continue;
        }
        const bb = buildBridge(a, 7.0 + ((i * 37 + n) % 5) * 0.35);
        for (const [geo, mat] of [
          [bb.concrete, CONC],
          [bb.trim, trimMat],
        ]) {
          const m = new THREE.Mesh(geo, mat);
          m.position.y = C.floorY(n);
          m.name = `gapBridge${n}-${i}`;
          m.castShadow = m.receiveShadow = mat === CONC;
          group.add(m);
        }
      }
      group.add(chunked(`bridges${parity}${i}`, br.concrete, CONC, ys, 4));
      group.add(chunked(`bridgeRails${parity}${i}`, br.trim, trimMat, ys, 4, { cast: false }));
    });
  }

  // column placards with level numbers + column sconces -----------------------
  group.add(buildPlacards());

  // light spots for the pool: one of the pillar lamps on each landing
  for (let n = 1; n <= C.LEVELS; n += 1) {
    const a = LAMP_ANGLES[(n * 3) % LAMP_ANGLES.length];
    // a metre and a half out from the lamp so the pillar isn't scorched
    const r = PILLAR_C - PILLAR_R - 1.6;
    pool.add(Math.cos(a) * r, C.floorY(n) + SCONCE_Y, Math.sin(a) * r, 0xffe2bd, 12);
  }

  // the bottom of the stair ---------------------------------------------------
  group.add(buildBottom());
  // the Gap -------------------------------------------------------------------
  group.add(buildGap());
  return group;
}

function buildPlacards() {
  const g = new THREE.Group();
  g.name = 'placards';
  const plates = new Batch();
  const glow = new Batch();
  const nums = new Batch();
  const atlas = numeralAtlas(147, 16, 128);
  const { cols, rows } = atlas.userData;
  // choose the angle where the helix passes 3.2 m above the floor
  const aP = helixAngle(3.2);
  const nx = Math.cos(aP), nz = Math.sin(aP);
  const tangentRy = -aP + Math.PI / 2;
  for (let n = 1; n <= C.LEVELS; n++) {
    const y = C.floorY(n);
    const r = C.R_COL + 0.08;
    addBox(plates, nx * r, y + 1.6, nz * r, 1.3, 1.34, 0.12, col('#1e2021'), tangentRy);
    // numeral quad on the plate
    const i = n - 1, cx = i % cols, cy = Math.floor(i / cols);
    const u0 = cx / cols, u1 = (cx + 1) / cols, v1 = 1 - cy / rows, v0 = 1 - (cy + 1) / rows;
    const px = nx * (r + 0.07), pz = nz * (r + 0.07);
    const tx = nz, tz = -nx; // viewer's right when facing the column
    const h = 0.55;
    const P = (dx, dy) => [px + tx * dx, y + 1.6 + dy, pz + tz * dx];
    const A = P(-h, -h), B = P(h, -h), Cc = P(h, h), D = P(-h, h);
    const ia = nums.vert(...A, nx, 0, nz, u0, v0, WHITE);
    const ib = nums.vert(...B, nx, 0, nz, u1, v0, WHITE);
    const ic = nums.vert(...Cc, nx, 0, nz, u1, v1, WHITE);
    const id = nums.vert(...D, nx, 0, nz, u0, v1, WHITE);
    nums.tri(ia, ib, ic);
    nums.tri(ia, ic, id);
    // three small sconces on the column
    for (const k of [0, 1, 2]) {
      const a = helixAngle(3.2 + k * 1.1) + 0.6 + k * 2.1;
      const hh = 1.9 + k * 1.3;
      const rr = C.R_COL + 0.1;
      _m.compose(new THREE.Vector3(Math.cos(a) * rr, y + hh, Math.sin(a) * rr), _q.identity(), new THREE.Vector3(0.15, 0.86, 0.15));
      glow.add(UNIT.cyl(10), _m, col('#f0e6d2', 3.4));
    }
  }
  const pm = new THREE.Mesh(orientSafe(plates.build()), MATS.trim);
  pm.name = 'placardPlates';
  pm.castShadow = true;
  const gm = new THREE.Mesh(glow.build(), MATS.glow);
  gm.name = 'columnSconces';
  const nm = new THREE.Mesh(nums.build(), new THREE.MeshBasicMaterial({ map: atlas, transparent: true, depthWrite: false, color: '#f2efe6' }));
  nm.name = 'placardNumerals';
  g.add(pm, gm, nm);
  return g;
}
const orientSafe = (g) => g;

function buildBottom() {
  const kit = new Kit('shaftBottom');
  const y = C.floorY(C.LEVELS);
  const concrete = kit.batch('concrete');
  // full disc under the stair, including the part in front of the cut
  for (let i = 0; i < 120; i++) {
    const a0 = (i / 120) * Math.PI * 2, a1 = ((i + 1) / 120) * Math.PI * 2;
    sector(concrete, C.R_COL, 19.35, a0, a1, y - 0.62, y + 0.02, WHITE, false);
    sector(concrete, 7.3, 7.6, a0, a1, y, y + 1.1, WHITE, false);
    sector(concrete, 7.25, 7.65, a0, a1, y + 1.1, y + 1.18, WHITE, false);
  }
  // railing on the drum edge at the front
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    kit.rod('trim', [Math.cos(a) * 18.9, y, Math.sin(a) * 18.9], [Math.cos(a) * 18.9, y + 1.1, Math.sin(a) * 18.9], 0.03, '#2a2c2e', 4);
    const b = ((i + 1) / 48) * Math.PI * 2;
    kit.rod('trim', [Math.cos(a) * 18.9, y + 1.1, Math.sin(a) * 18.9], [Math.cos(b) * 18.9, y + 1.1, Math.sin(b) * 18.9], 0.035, '#2a2c2e', 5);
  }
  // planters/benches around the drum
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3;
    kit.box('wood', Math.cos(a) * 10.5, y + 0.25, Math.sin(a) * 10.5, 1.9, 0.08, 0.5, '#886946', -a + Math.PI / 2);
    kit.box('trim', Math.cos(a) * 10.5, y + 0.12, Math.sin(a) * 10.5, 1.6, 0.24, 0.3, '#3a3c3d', -a + Math.PI / 2);
  }
  const group = kit.finish({ concrete: CONC, trim: MATS.trim, wood: MATS.wood });
  group.children.forEach((m) => {
    if (m.geometry.index) orient(m.geometry);
  });
  // painted "144" on the floor in front of the cut
  const tex = toTexture(floorNumberCanvas('144'), { repeat: false });
  const paint = new THREE.Mesh(
    new THREE.PlaneGeometry(7.2, 3.6),
    new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.92, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 })
  );
  paint.rotation.x = -Math.PI / 2;
  paint.position.set(-6.2, y + 0.03, 11.7);
  paint.name = 'paint144';
  paint.receiveShadow = true;
  group.add(paint);
  return group;
}

// ---------------------------------------------------------------------------
// The Gap: helix missing around level 91; broken stubs, rubble, a scaffold,
// and a rope-and-pulley chair (animated in dynamic.js).
// ---------------------------------------------------------------------------
function buildGap() {
  const group = new THREE.Group();
  group.name = 'gap';
  const yBottom = C.floorY(C.GAP_LEVEL + 1); // -699.2
  const yTop = C.floorY(C.GAP_LEVEL - 1); // -684.0
  // only a quarter turn survives at each end of the break
  const stubB = buildHelix({ h0: 0, h1: 1.0, broken: true });
  const stubT = buildHelix({ h0: C.LEVEL_H - 1.0, h1: C.LEVEL_H, broken: true });
  for (const [h, y, name] of [
    [stubB, yBottom, 'gapStubBottom'],
    [stubT, C.floorY(C.GAP_LEVEL), 'gapStubTop'],
  ]) {
    const m = new THREE.Mesh(h.concrete, CONC);
    const t = new THREE.Mesh(h.trim, MATS.trim);
    m.position.y = t.position.y = y;
    m.name = name;
    m.castShadow = m.receiveShadow = true;
    group.add(m, t);
  }
  const kit = new Kit('gapProps');
  const r = makeRng(9191);
  // rubble: chunks lodged on the lower stub's treads, and broken lumps still
  // clinging to the snapped ends of both stubs
  for (let i = 0; i < 18; i++) {
    // the lower stub turns through the front-right quadrant (0 < a < 90°)
    const a = r() * (Math.PI / 2 - 0.12) + 0.06;
    const rr = 2 + r() * 3.2;
    const s = 0.18 + r() * 0.34;
    const y = yBottom + Math.min(helixHeightAt(a), 1.0) + s * 0.35;
    kit.ico('concrete', Math.cos(a) * rr, y, Math.sin(a) * rr, s, '#b3ad9f', 0, 0.55 + r() * 0.4, r() * 6);
  }
  // broken lumps heaped on the lower stub's last whole tread
  {
    const yy = yBottom + 1.0, a = helixAngle(0.9);
    for (let i = 0; i < 6; i++) {
      const rr = 1.9 + r() * 3.4, s = 0.22 + r() * 0.3;
      const da = (r() - 0.5) * 0.18;
      kit.ico('concrete', Math.cos(a + da) * rr, yy + s * (0.3 + r() * 0.3), Math.sin(a + da) * rr, s, '#a9a396', 0, 0.7 + r() * 0.4, r() * 6);
    }
  }
  // a narrow scaffold tower in the Gap, climbing past the break
  const X0 = 2.0, X1 = 4.1, Z0 = 2.3, Z1 = 4.4;
  const dark = '#2a2c2d';
  const yHead = yTop + 1.2;
  for (const [x, z] of [
    [X0, Z0],
    [X1, Z0],
    [X0, Z1],
    [X1, Z1],
  ]) kit.rod('trim', [x, yBottom, z], [x, yHead, z], 0.055, dark, 6);
  for (let y = yBottom + 1.0; y < yHead + 0.1; y += 2.05) {
    kit.rod('trim', [X0, y, Z0], [X1, y, Z0], 0.04, dark, 5);
    kit.rod('trim', [X0, y, Z1], [X1, y, Z1], 0.04, dark, 5);
    kit.rod('trim', [X0, y, Z0], [X0, y, Z1], 0.04, dark, 5);
    kit.rod('trim', [X1, y, Z0], [X1, y, Z1], 0.04, dark, 5);
  }
  let flip = false;
  for (let y = yBottom + 1.0; y < yHead - 2; y += 2.05) {
    const y2 = Math.min(y + 2.05, yHead);
    kit.rod('trim', [X0, flip ? y : y2, Z0], [X1, flip ? y2 : y, Z0], 0.028, dark, 4);
    kit.rod('trim', [X1, flip ? y2 : y, Z1], [X1, flip ? y : y2, Z0], 0.028, dark, 4);
    kit.rod('trim', [X0, flip ? y2 : y, Z1], [X0, flip ? y : y2, Z0], 0.028, dark, 4);
    flip = !flip;
  }
  // plank decks (the top one carries the winch)
  for (let k = 0; k < 3; k++) {
    const y = yBottom + 3.85 + k * 4.1;
    for (let j = 0; j < 5; j++) kit.box('wood', X0 + 0.22 + j * 0.46 + 0.02, y, (Z0 + Z1) / 2, 0.42, 0.06, Z1 - Z0 + 0.3, j % 2 ? '#7c5431' : '#8e5f35');
  }
  // ladder up the west face
  for (let y = yBottom + 0.35; y < yHead - 0.2; y += 0.4) kit.box('trim', X0 - 0.22, y, 3.35, 0.05, 0.05, 0.62, '#77776f');
  kit.rod('trim', [X0 - 0.22, yBottom, 3.02], [X0 - 0.22, yHead, 3.02], 0.035, '#77776f', 4);
  kit.rod('trim', [X0 - 0.22, yBottom, 3.68], [X0 - 0.22, yHead, 3.68], 0.035, '#77776f', 4);
  // pulley head: a cantilever along z = 4.6 carrying the wheel rim
  kit.rod('trim', [X0, yHead, Z1], [X0, yHead, 4.6], 0.07, dark, 6);
  kit.rod('trim', [X1, yHead, Z1], [X1, yHead, 4.6], 0.07, dark, 6);
  kit.rod('trim', [X0, yHead, 4.6], [5.5, yHead, 4.6], 0.085, dark, 6);
  kit.rod('trim', [X1, yHead - 1.4, Z1], [5.2, yHead, 4.6], 0.04, dark, 5);
  kit.geo('trim', UNIT.torus(0.12, 6, 18), 4.6, yTop + 0.9, 4.6, '#4a4c4d', 0.32, 0.32, 0.32, 0, 0, 0);
  const g = kit.finish({ concrete: CONC, trim: MATS.trim, wood: MATS.wood });
  group.add(g);
  return group;
}

export { helixAngle, TURN_H };
