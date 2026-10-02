import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Geometry batching.
//
// Rooms are built from thousands of primitives. Instead of one mesh each, a
// Kit collects transformed primitives into one Batch per material and merges
// them into a single indexed BufferGeometry with vertex colours. Repeated
// objects that appear hundreds of times across the silo use InstanceSet.
// ---------------------------------------------------------------------------

const _v = new THREE.Vector3();
const _n = new THREE.Vector3();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _m = new THREE.Matrix4();
const _nm = new THREE.Matrix3();
const _c = new THREE.Color();
const _up = new THREE.Vector3(0, 1, 0);

/** Accepts a hex number/string/Color and an optional intensity multiplier. */
export function col(c, mul = 1) {
  if (c && c.isColor) _c.copy(c);
  else _c.set(c ?? 0xffffff);
  if (mul !== 1) _c.multiplyScalar(mul);
  return _c;
}

// Cached unit primitives -----------------------------------------------------
const cache = new Map();
const cached = (key, make) => {
  let g = cache.get(key);
  if (!g) cache.set(key, (g = whiten(make())));
  return g;
};

/**
 * Give a geometry an all-white colour attribute. Vertex-coloured materials
 * multiply by it, so instance colours come through unchanged.
 */
export function whiten(g) {
  if (!g.attributes.color) {
    const n = g.attributes.position.count;
    g.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(n * 3).fill(1), 3));
  }
  return g;
}

export const UNIT = {
  box: () => cached('box', () => new THREE.BoxGeometry(1, 1, 1)),
  /** Radius 1, height 1, centred. `top` is the top radius ratio. */
  cyl: (seg = 12, top = 1, open = false) =>
    cached(`cyl${seg}:${top}:${open}`, () => new THREE.CylinderGeometry(top, 1, 1, seg, 1, open)),
  sphere: (w = 12, h = 8) => cached(`sph${w}:${h}`, () => new THREE.SphereGeometry(1, w, h)),
  hemi: (w = 16, h = 6) =>
    cached(`hemi${w}:${h}`, () => new THREE.SphereGeometry(1, w, h, 0, Math.PI * 2, 0, Math.PI / 2)),
  ico: (detail = 0) => cached(`ico${detail}`, () => new THREE.IcosahedronGeometry(1, detail)),
  /** Torus with major radius 1 and tube ratio `t`. */
  torus: (t = 0.1, rs = 8, ts = 16, arc = Math.PI * 2) =>
    cached(`tor${t}:${rs}:${ts}:${arc}`, () => new THREE.TorusGeometry(1, t, rs, ts, arc)),
  plane: () => cached('plane', () => new THREE.PlaneGeometry(1, 1)),
  circle: (seg = 16) => cached(`circ${seg}`, () => new THREE.CircleGeometry(1, seg)),
  cone: (seg = 8) => cached(`cone${seg}`, () => new THREE.ConeGeometry(1, 1, seg)),
};

// ---------------------------------------------------------------------------
export class Batch {
  constructor() {
    this.P = [];
    this.N = [];
    this.U = [];
    this.C = [];
    this.I = [];
    this.n = 0;
  }

  get empty() {
    return this.n === 0;
  }

  add(geo, matrix, color) {
    const pos = geo.attributes.position;
    const nor = geo.attributes.normal;
    const uv = geo.attributes.uv;
    const vc = geo.attributes.color;
    _nm.getNormalMatrix(matrix);
    const flip = matrix.determinant() < 0;
    const base = this.n;
    const r = color.r, g = color.g, b = color.b;
    for (let i = 0; i < pos.count; i++) {
      _v.fromBufferAttribute(pos, i).applyMatrix4(matrix);
      this.P.push(_v.x, _v.y, _v.z);
      if (nor) {
        _n.fromBufferAttribute(nor, i).applyMatrix3(_nm).normalize();
        this.N.push(_n.x, _n.y, _n.z);
      } else this.N.push(0, 1, 0);
      if (uv) this.U.push(uv.getX(i), uv.getY(i));
      else this.U.push(0, 0);
      if (vc) this.C.push(r * vc.getX(i), g * vc.getY(i), b * vc.getZ(i));
      else this.C.push(r, g, b);
    }
    const idx = geo.index;
    const cnt = idx ? idx.count : pos.count;
    for (let i = 0; i < cnt; i += 3) {
      const a = idx ? idx.getX(i) : i;
      const bb = idx ? idx.getX(i + 1) : i + 1;
      const c = idx ? idx.getX(i + 2) : i + 2;
      if (flip) this.I.push(base + a, base + c, base + bb);
      else this.I.push(base + a, base + bb, base + c);
    }
    this.n += pos.count;
  }

  /** Raw triangle-soup helpers for hand-built surfaces. */
  vert(x, y, z, nx, ny, nz, u, v, color) {
    this.P.push(x, y, z);
    this.N.push(nx, ny, nz);
    this.U.push(u, v);
    this.C.push(color.r, color.g, color.b);
    return this.n++;
  }

  tri(a, b, c) {
    this.I.push(a, b, c);
  }

  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.P, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.N, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.U, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.C, 3));
    g.setIndex(this.n > 65535 ? new THREE.Uint32BufferAttribute(this.I, 1) : new THREE.Uint16BufferAttribute(this.I, 1));
    g.computeBoundingBox();
    g.computeBoundingSphere();
    return g;
  }
}

// ---------------------------------------------------------------------------
export class Kit {
  constructor(name = '') {
    this.name = name;
    this.batches = {};
    this.stack = [new THREE.Matrix4()];
    this.meshes = [];
  }

  get frame() {
    return this.stack[this.stack.length - 1];
  }

  /** Push a local frame (translation + yaw + optional uniform scale). */
  push(x = 0, y = 0, z = 0, ry = 0, s = 1) {
    const m = new THREE.Matrix4().compose(_p.set(x, y, z), _q.setFromEuler(_e.set(0, ry, 0)), _s.setScalar(s));
    this.stack.push(this.frame.clone().multiply(m));
    return this;
  }

  pop() {
    if (this.stack.length > 1) this.stack.pop();
    return this;
  }

  at(x, y, z, ry, fn) {
    this.push(x, y, z, ry);
    fn(this);
    this.pop();
    return this;
  }

  batch(mat) {
    return (this.batches[mat] ||= new Batch());
  }

  matrix(x, y, z, sx, sy, sz, rx = 0, ry = 0, rz = 0) {
    _m.compose(_p.set(x, y, z), _q.setFromEuler(_e.set(rx, ry, rz)), _s.set(sx, sy, sz));
    return _m.premultiply(this.frame);
  }

  /** Arbitrary geometry with a full transform. */
  geo(mat, geometry, x, y, z, color, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) {
    this.batch(mat).add(geometry, this.matrix(x, y, z, sx, sy, sz, rx, ry, rz), col(color));
    return this;
  }

  geoMatrix(mat, geometry, matrix, color) {
    _m.copy(matrix).premultiply(this.frame);
    this.batch(mat).add(geometry, _m, col(color));
    return this;
  }

  /** Centred box. */
  box(mat, x, y, z, sx, sy, sz, color, ry = 0, rx = 0, rz = 0) {
    return this.geo(mat, UNIT.box(), x, y, z, color, sx, sy, sz, rx, ry, rz);
  }

  /** Box from min/max corners. */
  bb(mat, x0, y0, z0, x1, y1, z1, color) {
    return this.box(mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2, Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0), color);
  }

  /** Vertical cylinder standing on (x, y, z). */
  cyl(mat, x, y, z, r, h, color, seg = 12, top = 1) {
    return this.geo(mat, UNIT.cyl(seg, top), x, y + h / 2, z, color, r, h, r);
  }

  /** Cylinder centred at (x,y,z) with explicit rotation. */
  cylR(mat, x, y, z, r, h, color, rx = 0, ry = 0, rz = 0, seg = 12) {
    return this.geo(mat, UNIT.cyl(seg), x, y, z, color, r, h, r, rx, ry, rz);
  }

  /** Cylinder between two points. */
  rod(mat, a, b, r, color, seg = 8) {
    const dir = _n.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const len = dir.length();
    if (len < 1e-5) return this;
    dir.divideScalar(len);
    _q.setFromUnitVectors(_up, dir);
    _m.compose(_p.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2), _q, _s.set(r, len, r));
    _m.premultiply(this.frame);
    this.batch(mat).add(UNIT.cyl(seg), _m, col(color));
    return this;
  }

  /** Box stretched between two points (for beams/rails with square section). */
  beam(mat, a, b, w, h, color) {
    const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    const len = Math.hypot(dx, dy, dz);
    if (len < 1e-5) return this;
    _n.set(dx, dy, dz).divideScalar(len);
    _q.setFromUnitVectors(_up, _n);
    _m.compose(_p.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2), _q, _s.set(w, len, h));
    _m.premultiply(this.frame);
    this.batch(mat).add(UNIT.box(), _m, col(color));
    return this;
  }

  sphere(mat, x, y, z, r, color, w = 12, h = 8, sy = 1) {
    return this.geo(mat, UNIT.sphere(w, h), x, y, z, color, r, r * sy, r);
  }

  ico(mat, x, y, z, r, color, detail = 0, sy = 1, ry = 0) {
    return this.geo(mat, UNIT.ico(detail), x, y, z, color, r, r * sy, r, 0, ry, 0);
  }

  /** Flat quad facing +z (rotate with ry). */
  quad(mat, x, y, z, w, h, color, ry = 0, rx = 0) {
    return this.geo(mat, UNIT.plane(), x, y, z, color, w, h, 1, rx, ry, 0);
  }

  /** Quad lying on the floor (facing +y). */
  floorQuad(mat, x, y, z, w, d, color, ry = 0) {
    return this.geo(mat, UNIT.plane(), x, y, z, color, w, d, 1, -Math.PI / 2, ry, 0);
  }

  /** Add an already-built mesh (textured signs, screens…). */
  mesh(m) {
    m.applyMatrix4(this.frame);
    this.meshes.push(m);
    return m;
  }

  /**
   * Merge every batch into meshes. `mats` maps material keys to materials.
   * Material keys may be namespaced like "matte" or "glow".
   */
  finish(mats, { shadows = true } = {}) {
    const group = new THREE.Group();
    group.name = this.name;
    for (const [key, b] of Object.entries(this.batches)) {
      if (b.empty) continue;
      const mat = mats[key];
      if (!mat) {
        console.warn('Kit: missing material', key);
        continue;
      }
      const mesh = new THREE.Mesh(b.build(), mat);
      mesh.name = `${this.name}/${key}`;
      const lit = !(mat.isMeshBasicMaterial || mat.transparent);
      mesh.castShadow = shadows && lit;
      mesh.receiveShadow = lit;
      mesh.matrixAutoUpdate = false;
      group.add(mesh);
    }
    for (const m of this.meshes) group.add(m);
    return group;
  }
}

// ---------------------------------------------------------------------------
// Instances split into vertical chunks so the frustum culls whole bands of the
// silo at once.
// ---------------------------------------------------------------------------
export class InstanceSet {
  constructor(name, geometry, material, { castShadow = true, receiveShadow = true } = {}) {
    this.name = name;
    this.geometry = geometry;
    this.material = material;
    this.mats = [];
    this.cols = [];
    this.ys = [];
    this.castShadow = castShadow;
    this.receiveShadow = receiveShadow;
  }

  get count() {
    return this.ys.length;
  }

  add(x, y, z, sx, sy, sz, color, rx = 0, ry = 0, rz = 0) {
    _m.compose(_p.set(x, y, z), _q.setFromEuler(_e.set(rx, ry, rz)), _s.set(sx, sy, sz));
    this.mats.push(..._m.elements);
    const c = col(color);
    this.cols.push(c.r, c.g, c.b);
    this.ys.push(y);
    return this;
  }

  addMatrix(m, color) {
    this.mats.push(...m.elements);
    const c = col(color);
    this.cols.push(c.r, c.g, c.b);
    this.ys.push(m.elements[13]);
    return this;
  }

  /** Build InstancedMeshes, one per vertical chunk. */
  build(chunks = 12, yTop = 0, yBot = -1130) {
    const group = new THREE.Group();
    group.name = this.name;
    if (!this.count) return group;
    const span = (yTop - yBot) / chunks;
    const buckets = Array.from({ length: chunks }, () => []);
    for (let i = 0; i < this.count; i++) {
      const k = Math.max(0, Math.min(chunks - 1, Math.floor((yTop - this.ys[i]) / span)));
      buckets[k].push(i);
    }
    buckets.forEach((ids, k) => {
      if (!ids.length) return;
      const im = new THREE.InstancedMesh(this.geometry, this.material, ids.length);
      im.name = `${this.name}#${k}`;
      const colors = new Float32Array(ids.length * 3);
      ids.forEach((i, j) => {
        im.instanceMatrix.array.set(this.mats.slice(i * 16, i * 16 + 16), j * 16);
        colors[j * 3] = this.cols[i * 3];
        colors[j * 3 + 1] = this.cols[i * 3 + 1];
        colors[j * 3 + 2] = this.cols[i * 3 + 2];
      });
      im.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
      im.instanceMatrix.needsUpdate = true;
      im.computeBoundingBox();
      im.computeBoundingSphere();
      im.castShadow = this.castShadow;
      im.receiveShadow = this.receiveShadow;
      im.matrixAutoUpdate = false;
      group.add(im);
    });
    return group;
  }
}

/** Simple extruded shape helper (shape in XY, extruded along +z by depth). */
export function extrude(shape, depth, bevel = false, curveSegments = 10) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 1,
    curveSegments,
  });
  return g;
}

/** Arch-topped rectangle shape (doors, windows). */
export function archShape(w, h, x = 0, y = 0) {
  const r = w / 2;
  const s = new THREE.Shape();
  s.moveTo(x - r, y);
  s.lineTo(x + r, y);
  s.lineTo(x + r, y + h - r);
  s.absarc(x, y + h - r, r, 0, Math.PI, false);
  s.lineTo(x - r, y);
  return s;
}

/** Rounded rectangle shape centred on (x, y). */
export function roundRectShape(w, h, r, x = 0, y = 0) {
  const s = new THREE.Shape();
  const x0 = x - w / 2, y0 = y - h / 2;
  r = Math.min(r, w / 2, h / 2);
  s.moveTo(x0 + r, y0);
  s.lineTo(x0 + w - r, y0);
  s.quadraticCurveTo(x0 + w, y0, x0 + w, y0 + r);
  s.lineTo(x0 + w, y0 + h - r);
  s.quadraticCurveTo(x0 + w, y0 + h, x0 + w - r, y0 + h);
  s.lineTo(x0 + r, y0 + h);
  s.quadraticCurveTo(x0, y0 + h, x0, y0 + h - r);
  s.lineTo(x0, y0 + r);
  s.quadraticCurveTo(x0, y0, x0 + r, y0);
  return s;
}
