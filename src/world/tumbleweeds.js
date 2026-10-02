import * as THREE from 'three';
import { terrainY } from './surface.js';
import { makeCanvas } from '../core/textures.js';
import { makeRng, clamp, smooth } from '../core/rng.js';

// ---------------------------------------------------------------------------
// Two tumbleweeds loose on the surface. They wander wherever the gusts take
// them, slowing in the lulls, bouncing over the bumps, rolling faster
// downhill, and stay behind the cut: one rattles around silo 18's crater
// floor, the other roams the rim and the plain behind it.
// ---------------------------------------------------------------------------

/** A ball of thin, curling twigs (3-sided tubes), with a few thicker stems. */
function tumbleweedGeometry(seed, R) {
  const r = makeRng(seed);
  const pos = [], nor = [], colr = [], thick = [], idx = [];
  const base = new THREE.Color('#9c7d50');
  const grey = new THREE.Color('#8f8068');
  const c = new THREE.Color();
  const t = new THREE.Vector3(), n1 = new THREE.Vector3(), n2 = new THREE.Vector3(), o = new THREE.Vector3();

  /** A tube along `pts`; `ref` is any vector never parallel to the path. */
  const tube = (pts, rad, color, ref) => {
    const start = pos.length / 3;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      t.subVectors(b, a).normalize();
      n1.crossVectors(t, ref).normalize();
      n2.crossVectors(t, n1);
      const rr = rad * (1 - 0.5 * (i / (pts.length - 1)));
      for (let k = 0; k < 3; k++) {
        const ang = (k / 3) * Math.PI * 2;
        o.copy(n1).multiplyScalar(Math.cos(ang)).addScaledVector(n2, Math.sin(ang));
        pos.push(pts[i].x + o.x * rr, pts[i].y + o.y * rr, pts[i].z + o.z * rr);
        nor.push(o.x, o.y, o.z);
        colr.push(color.r, color.g, color.b);
        thick.push(rr);
      }
    }
    for (let i = 0; i < pts.length - 1; i++) {
      for (let k = 0; k < 3; k++) {
        const a = start + i * 3 + k, b = start + i * 3 + ((k + 1) % 3);
        idx.push(a, b, a + 3, b, b + 3, a + 3);
      }
    }
  };
  const randDir = () => {
    const u = r() * 2 - 1, a = r() * Math.PI * 2, s = Math.sqrt(1 - u * u);
    return new THREE.Vector3(s * Math.cos(a), u, s * Math.sin(a));
  };
  const shade = (rho) => {
    c.copy(r() < 0.3 ? grey : base).multiplyScalar(0.75 + r() * 0.4);
    // the tangle darkens toward the middle
    return c.clone().multiplyScalar(0.5 + 0.5 * rho);
  };

  // curling twigs: arcs round the centre on shells, mostly near the outside
  const arcs = [];
  for (let i = 0; i < 200; i++) {
    const N = randDir();
    const U = new THREE.Vector3().crossVectors(N, Math.abs(N.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)).normalize();
    const V = new THREE.Vector3().crossVectors(N, U);
    const rho = 1 - 0.45 * r() * r();
    const a0 = r() * Math.PI * 2, span = 1 + r() * 1.7;
    const wob = r() * 10;
    const pts = [];
    for (let k = 0; k <= 10; k++) {
      const a = a0 + (k / 10) * span;
      const rk = R * rho * (1 + 0.07 * Math.sin(k * 1.3 + wob));
      pts.push(new THREE.Vector3().addScaledVector(U, Math.cos(a) * rk).addScaledVector(V, Math.sin(a) * rk).addScaledVector(N, Math.sin(k * 0.9 + wob) * 0.04 * R));
    }
    pts.forEach((p) => (p.y *= 0.86));
    tube(pts, 0.006 + r() * 0.006, shade(rho), N);
    arcs.push(pts);
  }
  // short spiky side twigs poking out of the arcs
  for (let i = 0; i < 220; i++) {
    const arc = arcs[Math.floor(r() * arcs.length)];
    const p0 = arc[1 + Math.floor(r() * (arc.length - 2))];
    const d = p0.clone().normalize().add(randDir().multiplyScalar(0.8)).normalize();
    const L = 0.06 + r() * 0.18;
    const p1 = p0.clone().addScaledVector(d, L * 0.5).add(randDir().multiplyScalar(0.015));
    const p2 = p0.clone().addScaledVector(d, L);
    tube([p0, p1, p2], 0.004, shade(p0.length() / R), randDir());
  }
  // a few thicker stems from the old root out to the shell
  for (let i = 0; i < 7; i++) {
    const d = randDir();
    const bend = randDir().multiplyScalar(0.25 * R);
    const pts = [];
    for (let k = 0; k <= 6; k++) {
      const f = k / 6;
      pts.push(d.clone().multiplyScalar(R * 0.92 * f).addScaledVector(bend, Math.sin(f * Math.PI)));
    }
    pts.forEach((p) => (p.y *= 0.86));
    tube(pts, 0.016 + r() * 0.008, shade(0.7), randDir());
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(colr, 3));
  g.setAttribute('aThick', new THREE.Float32BufferAttribute(thick, 1));
  g.setIndex(idx);
  g.computeBoundingSphere();
  return g;
}

function shadowTexture() {
  const c = makeCanvas(64);
  const ctx = c.getContext('2d');
  // the alpha map is read from the green channel: a soft, lacy blot
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 64, 64);
  const grd = ctx.createRadialGradient(32, 32, 0, 32, 32, 31);
  grd.addColorStop(0, '#fff');
  grd.addColorStop(0.5, '#b0b0b0');
  grd.addColorStop(1, '#000');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 64, 64);
  const r = makeRng(7);
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  for (let i = 0; i < 70; i++) {
    ctx.beginPath();
    ctx.arc(8 + r() * 48, 8 + r() * 48, 1 + r() * 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
}

// The sun's direction (matches the key light in env.js), for the shadow offset.
const SUN = new THREE.Vector3(354, 670, 931).normalize();
const CUT_Z = -12; // keep clear of the section and silo 18's hood

const angleLerp = (a, b, k) => {
  const d = Math.atan2(Math.sin(b - a), Math.cos(b - a));
  return a + d * k;
};

export function buildTumbleweeds() {
  const group = new THREE.Group();
  group.name = 'tumbleweeds';
  const weedMat = new THREE.MeshStandardMaterial({ name: 'tumbleweed', vertexColors: true, roughness: 1, metalness: 0 });
  const shadowMat = new THREE.MeshBasicMaterial({
    name: 'tumbleweedShadow',
    color: '#000000',
    alphaMap: shadowTexture(),
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    polygonOffsetUnits: -4,
  });
  const shadowGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);

  const defs = [
    // roams silo 18's crater floor (it is ~82 m across the flat)
    { seed: 11, R: 0.7, x: -40, z: -45, cx: -30, cz: -50, range: 70 },
    // roams the back rim and the plain behind it
    { seed: 29, R: 0.55, x: 60, z: -150, cx: -10, cz: -175, range: 130 },
  ];
  const weeds = defs.map((d, i) => {
    const mesh = new THREE.Mesh(tumbleweedGeometry(d.seed, d.R), weedMat);
    mesh.name = 'tumbleweed';
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.name = 'tumbleweedShadow';
    shadow.renderOrder = 1;
    group.add(mesh, shadow);
    return {
      ...d,
      mesh,
      shadow,
      heading: -0.2 + i * 2.4,
      speed: 0,
      hop: 0,
      q: new THREE.Quaternion(),
      phase: i * 37.1,
    };
  });

  const axis = new THREE.Vector3(), dq = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
  const n = new THREE.Vector3();
  const sunXZ = new THREE.Vector2(-SUN.x, -SUN.z).multiplyScalar(1 / SUN.y);

  /**
   * @param wind   THREE.Vector2, unit wind direction in (x, z)
   * @param power  0..1 storm strength: calm leaves them lying still
   */
  const update = (dt, t, wind, power) => {
    dt = Math.min(dt, 0.1);
    const windAng = Math.atan2(wind.y, wind.x);
    for (const w of weeds) {
      // where the wind wants it to go: mostly downwind, but gusts swing it
      // right round, so over a minute or two it goes every which way
      const ph = w.phase;
      let want = windAng + Math.sin(t * 0.11 + ph) * 1.7 + Math.sin(t * 0.047 + ph * 3.1) * 1.3;
      // drift back toward its own patch, and away from the cut
      const dx = w.cx - w.x, dz = w.cz - w.z;
      const far = smooth(w.range * 0.6, w.range, Math.hypot(dx, dz));
      want = angleLerp(want, Math.atan2(dz, dx), far);
      want = angleLerp(want, -Math.PI / 2 + Math.sign(Math.cos(w.heading)) * 0.5, smooth(CUT_Z - 8, CUT_Z, w.z));
      w.heading = angleLerp(w.heading, want, Math.min(1, dt * 0.7));
      const hx = Math.cos(w.heading), hz = Math.sin(w.heading);

      // gusts set the pace; it rolls faster downhill and stalls going up
      const gust = 0.5 + 0.5 * Math.sin(t * 0.37 + ph) * Math.sin(t * 0.13 + ph * 0.7);
      const e = 0.6;
      const slope = ((terrainY(w.x + hx * e, w.z + hz * e) - terrainY(w.x - hx * e, w.z - hz * e)) / (2 * e)) || 0;
      const target = Math.max(0, power * (0.3 + 3.2 * gust * gust) - slope * 9);
      w.speed += (target - w.speed) * Math.min(1, dt * 1.2);
      const ds = w.speed * dt;
      w.x += hx * ds;
      w.z = Math.min(CUT_Z, w.z + hz * ds);

      // roll about the axis across the direction of travel, bouncing every
      // couple of metres
      axis.set(hz, 0, -hx);
      w.q.premultiply(dq.setFromAxisAngle(axis, ds / w.R)).normalize();
      w.hop += ds / 2.4;
      const bounce = Math.abs(Math.sin(w.hop * Math.PI)) * clamp(w.speed / 2.5, 0, 1) * 0.35;
      const gy = terrainY(w.x, w.z);
      w.mesh.position.set(w.x, gy + w.R * 0.86 + bounce, w.z);
      w.mesh.quaternion.copy(w.q);

      // soft shadow on the ground, cast away from the sun and stretched
      const lift = w.R * 0.86 + bounce;
      const sx = w.x + sunXZ.x * lift, sz = w.z + sunXZ.y * lift;
      const sy = terrainY(sx, sz);
      n.set(terrainY(sx - 0.5, sz) - terrainY(sx + 0.5, sz), 1, terrainY(sx, sz - 0.5) - terrainY(sx, sz + 0.5)).normalize();
      w.shadow.position.set(sx, sy + 0.04, sz);
      w.shadow.quaternion.setFromUnitVectors(up, n);
      w.shadow.rotateY(-Math.atan2(sunXZ.y, sunXZ.x));
      const fade = 1 / (1 + bounce * 1.5);
      w.shadow.scale.set(w.R * 3.4 * fade, 1, w.R * 2.0 * fade);
    }
  };

  return { group, update, weedMat, shadowMat };
}
