import * as THREE from 'three';
import { terrainY, SILOS } from './surface.js';
import { makeCanvas, toTexture, pnoise } from '../core/textures.js';
import { makeRng, clamp, smooth } from '../core/rng.js';
import { SILO17_POS } from '../core/constants.js';
import { buildTumbleweeds } from './tumbleweeds.js';

// ---------------------------------------------------------------------------
// A slow sandstorm over the surface: no wall of dust, just a steady wind
// carrying sand. Low veils of it slide across the plain and drape over the
// dunes, sand streams off the crater rims, streaks snake along the ground,
// loose grains skip past up close, and the air thickens into a warm haze
// toward the horizon. Sand moves most where the ground faces the wind and
// little in the lee of a rim, and every gust rolls downwind through all of
// it. Everything lives behind the cut (z < 0), so the section stays clear.
// ---------------------------------------------------------------------------

/** Wind blows from the west, angled away from the viewer. */
const WIND = new THREE.Vector2(1, -0.32).normalize();
/** Speed of the sand inside the veils, m/s. */
const SPEED = 6;
/** Haze density at ground level, per metre of dusty air. */
const HAZE = 0.0002;

// Height field the shaders sample so veils and grains follow the ground.
// R holds the height, G how exposed the ground is to the wind.
const HM = { x0: -1300, x1: 1300, z0: -1600, z1: 0, step: 10 };

function heightTexture() {
  const nx = Math.round((HM.x1 - HM.x0) / HM.step) + 1;
  const nz = Math.round((HM.z1 - HM.z0) / HM.step) + 1;
  const h = new Float32Array(nx * nz);
  for (let j = 0; j < nz; j++) {
    for (let i = 0; i < nx; i++) h[j * nx + i] = terrainY(HM.x0 + i * HM.step, HM.z0 + j * HM.step);
  }
  const at = (x, z) => {
    const fx = clamp((x - HM.x0) / HM.step, 0, nx - 1.001), fz = clamp((z - HM.z0) / HM.step, 0, nz - 1.001);
    const i = Math.floor(fx), j = Math.floor(fz), u = fx - i, v = fz - j;
    const a = h[j * nx + i], b = h[j * nx + i + 1], c = h[(j + 1) * nx + i], d = h[(j + 1) * nx + i + 1];
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  };
  const data = new Uint16Array(nx * nz * 2);
  const wx = WIND.x, wz = WIND.y;
  for (let j = 0; j < nz; j++) {
    for (let i = 0; i < nx; i++) {
      const x = HM.x0 + i * HM.step, z = HM.z0 + j * HM.step;
      const y = h[j * nx + i];
      // Windward slopes and brinks are scoured hardest; the ground in the lee
      // of anything higher upwind (a crater's far wall and floor) lies calm.
      const up = at(x - wx * 12, z - wz * 12), dn = at(x + wx * 12, z + wz * 12);
      const slope = (dn - up) / 24;
      const crest = clamp((y - 0.5 * (up + dn)) / 1.5, 0, 1);
      const shelter = Math.max(Math.max(at(x - wx * 30, z - wz * 30), at(x - wx * 60, z - wz * 60)) - y - 3, 0);
      const expo = clamp(1 + 3 * slope + 0.6 * crest, 0.2, 1.8) * (1 - 0.75 * smooth(0, 6, shelter));
      data[(j * nx + i) * 2] = THREE.DataUtils.toHalfFloat(y);
      data[(j * nx + i) * 2 + 1] = THREE.DataUtils.toHalfFloat(expo);
    }
  }
  const t = new THREE.DataTexture(data, nx, nz, THREE.RGFormat, THREE.HalfFloatType);
  t.minFilter = t.magFilter = THREE.LinearFilter;
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  t.needsUpdate = true;
  return { tex: t, nx, nz };
}

/** Tileable fbm with separate periods along (px) and across (py). */
function fbmA(u, v, px, py, oct) {
  let amp = 1, f = 1, sum = 0, norm = 0;
  for (let i = 0; i < oct; i++) {
    sum += amp * pnoise(u * px * f, v * py * f, px * f, py * f);
    norm += amp;
    amp *= 0.5;
    f *= 2;
  }
  return sum / norm;
}

/**
 * Sand texture, u along the wind and v across it.
 * R: fine fibres, long and thin. G: soft billows. B: broad gusts.
 */
function sandCanvas(size = 256) {
  const c = makeCanvas(size);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  const d = img.data;
  const to8 = (n, k = 1) => Math.max(0, Math.min(255, Math.round((0.5 + n * 0.5 * k) * 255)));
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size, v = y / size;
      const i = (y * size + x) * 4;
      d[i] = to8(fbmA(u, v, 3, 24, 3), 1.5);
      d[i + 1] = to8(fbmA(u + 0.37, v + 0.11, 4, 8, 4), 1.3);
      d[i + 2] = to8(fbmA(u + 0.71, v + 0.53, 2, 2, 3), 1.2);
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

// --- shared GLSL ---------------------------------------------------------------
// Wind, time and the gust field. Gusts are broad patches that ride the wind
// at ~4.5 m/s, so a gust passes through veils, plumes, streaks and shrubs in
// turn rather than everything pulsing at once.
const STORM_GLSL = /* glsl */ `
  uniform float uTime;
  uniform float uStorm;
  uniform float uSpeed;
  uniform vec2 uWind;
  uniform sampler2D uSand;
  float gustAt(vec2 xz) {
    float a = dot(xz, uWind) - uTime * uSpeed * 0.75;
    float c = dot(xz, vec2(-uWind.y, uWind.x));
    return texture2D(uSand, vec2(a / 900.0, c / 520.0 + 0.6)).b;
  }
`;

// Ground height (x) and wind exposure (y) under a point. Needs nothing else.
const HEIGHT_GLSL = /* glsl */ `
  uniform sampler2D uHeight;
  uniform vec4 uHM;
  uniform vec2 uHMSize;
  vec2 terrainAt(vec2 xz) {
    vec2 uv = ((xz - uHM.xy) * uHM.z + 0.5) / uHMSize;
    return texture2D(uHeight, uv).rg;
  }
  float groundAt(vec2 xz) { return terrainAt(xz).x; }
`;

// How much of the view ray to P runs through dusty air: only the part behind
// the cut, weighted toward the ground (the dust thins out with height).
const HAZE_GLSL = /* glsl */ `
  uniform float uHaze;
  uniform vec3 uHazeColor;
  float stormHazeAmount(vec3 P) {
    if (uHaze <= 0.0 || P.z >= 0.0) return 0.0;
    vec3 C = cameraPosition;
    vec3 A = C.z > 0.0 ? C + (P - C) * clamp(C.z / max(C.z - P.z, 1e-3), 0.0, 1.0) : C;
    float len = length(P - A);
    const float H = 60.0;
    float ya = max(A.y, 0.0), yp = max(P.y, 0.0);
    float dy = yp - ya;
    float avg = abs(dy) < 0.5 ? exp(-0.5 * (ya + yp) / H) : H * (exp(-ya / H) - exp(-yp / H)) / dy;
    return (1.0 - exp(-uHaze * len * avg)) * smoothstep(-3.0, -1.0, P.y);
  }
`;

// Where sand is snaking along the ground right now, 0..1: threads under a
// metre wide and ~13 m long that wander side to side, gathered in groups
// that come and go with the gusts. Needs STORM_GLSL.
const STREAK_GLSL = /* glsl */ `
  float streakMask(vec2 xz) {
    vec2 q = vec2(dot(xz, uWind), dot(xz, vec2(-uWind.y, uWind.x)));
    float xs = q.x - uTime * uSpeed * 0.55;
    q.y += 0.6 * sin(xs / 6.0 + q.y * 0.5) + 2.0 * sin(q.x / 37.0 + uTime * 0.15);
    float f1 = texture2D(uSand, vec2(xs / 40.0, q.y / 18.0)).r;
    float f2 = texture2D(uSand, vec2((q.x - uTime * uSpeed * 0.45) / 400.0, q.y / 140.0 + 0.31)).g;
    return smoothstep(0.55, 0.85, f1) * smoothstep(0.35, 0.7, f2) * smoothstep(0.3, 0.7, gustAt(xz));
  }
`;

// --- veils and rim plumes ------------------------------------------------------------
const VEIL_VERT = /* glsl */ `
  ${STORM_GLSL}
  ${HEIGHT_GLSL}
  ${HAZE_GLSL}
  attribute vec4 aA; // anchor x, anchor z, plume base y (veils: -1e4), phase
  attribute vec4 aB; // length, height at the upwind end, height downwind, lift
  attribute vec4 aC; // travel (0 = rim plume), life in s, opacity, sink per metre
  varying vec2 vLocal;
  varying float vAlong;
  varying float vAcross;
  varying float vA;
  varying float vPlume;
  varying float vH;
  varying float vAbove;
  varying float vHaze;
  #include <fog_pars_vertex>

  void main() {
    float u = position.x, v = position.y;
    bool plume = aC.x <= 0.0;
    float age = fract(uTime / aC.y + aA.w);
    vec2 W = uWind;
    vec2 Wp = vec2(-W.y, W.x);
    float L = aB.x;
    vec2 c = aA.xy + (plume ? vec2(0.0) : W * (age - 0.5) * aC.x);
    vec2 xz = c + W * (plume ? u : u - 0.5) * L;
    // a slow side-to-side meander that travels downwind (a plume stays
    // pinned at its lip)
    xz += Wp * sin((u * L - uTime * uSpeed * 0.7) / 40.0 + aA.w * 20.0) * min(L * 0.035, 6.0) * (plume ? smoothstep(0.0, 0.3, u) : 1.0);

    // Turn the sheet about the wind axis to face the camera: from low down it
    // stands up as a veil, from above it lies along the ground as a drift.
    vec3 toCam = cameraPosition - vec3(xz.x, groundAt(xz), xz.y);
    vec3 sRaw = cross(vec3(W.x, 0.0, W.y), toCam);
    float side = length(sRaw) / max(length(toCam), 1e-3);
    float upright = abs(sRaw.y) / max(length(sRaw), 1e-3);
    vec3 s = normalize(sRaw + vec3(0.0, 0.04 * length(toCam), 0.0) * sign(sRaw.y + 1e-6));
    if (s.y < 0.0) s = -s;

    float H = mix(aB.y, aB.z, u);
    vec3 off = s * v * H;
    vec2 pxz = xz + off.xz;
    float ground = groundAt(pxz);
    // plumes leave the crest level and sink downwind, never below the ground
    float base = plume ? max(aA.z - aC.w * u * L, ground + 0.2) : ground + aB.w;
    // the upper sheet heaves in slow waves that roll downwind
    float heave = sin((u * L - uTime * uSpeed * 0.9) / 14.0 + aA.w * 30.0) * 0.1 * H * v * upright;
    vec3 P = vec3(pxz.x, base + off.y + heave, pxz.y);
    // a sheet lying flat never dips into the dunes
    P.y = max(P.y, ground + 0.1 + 0.15 * v * H);

    vLocal = vec2(u, v);
    vAlong = dot(P.xz, W);
    // a fixed 7-12 fibres across each sheet, whatever its size, so the
    // streaks still read from far away
    vAcross = v * (0.3 + 0.2 * fract(aA.w * 13.0)) + aA.w * 3.0;
    vPlume = plume ? 1.0 : 0.0;
    vH = H;
    vAbove = P.y - ground;
    vHaze = stormHazeAmount(P);

    // plumes are densest at the crest lip and thin out within ~50 m
    float ends = plume
      ? smoothstep(0.0, 0.03, u) * exp(-u * L / 55.0) * (1.0 - smoothstep(0.8, 1.0, u))
      : smoothstep(0.0, 0.3, u) * (1.0 - smoothstep(0.62, 1.0, u));
    // plumes on one crest pulse together as a gust arrives; veils fade in,
    // cross and fade out, stronger in the gusts
    float gst = gustAt(plume ? aA.xy - W * 40.0 : xz);
    float env = plume
      ? 0.2 + 0.8 * smoothstep(0.35, 0.7, gst)
      : sin(3.14159 * age) * (0.45 + 0.75 * smoothstep(0.3, 0.7, gst));
    // sand lifts where the ground faces the wind, hardly at all in the lee
    float expo = plume ? 1.0 : clamp(terrainAt(c).y, 0.3, 1.4);
    float nearFade = smoothstep(5.0, 40.0, distance(cameraPosition, P));
    float cut = 1.0 - smoothstep(-16.0, -2.0, P.z);
    // Fade where a sheet would turn edge-on, or flip across its axis as the
    // camera passes over it, and soften sheets lying flat so they don't
    // double the ground streaks seen from high up.
    float facing = smoothstep(0.06, 0.25, side) * smoothstep(0.03, 0.18, upright) * mix(0.45, 1.0, smoothstep(0.15, 0.6, upright));
    vA = uStorm * aC.z * ends * env * expo * nearFade * cut * facing;

    vec4 mvPosition = viewMatrix * vec4(P, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;

const VEIL_FRAG = /* glsl */ `
  ${STORM_GLSL}
  uniform vec3 uHazeColor;
  uniform vec3 uColor;
  uniform vec3 uColorHi;
  varying vec2 vLocal;
  varying float vAlong;
  varying float vAcross;
  varying float vA;
  varying float vPlume;
  varying float vH;
  varying float vAbove;
  varying float vHaze;
  #include <fog_pars_fragment>

  void main() {
    if (vA < 0.002) discard;
    float v = vLocal.y;
    // fine fibres race through the sheet; the billows roll along more slowly
    float fib = texture2D(uSand, vec2((vAlong - uTime * uSpeed) / 140.0, vAcross)).r;
    float bil = texture2D(uSand, vec2((vAlong - uTime * uSpeed * 0.6) / 260.0, vAcross * 0.35)).g;
    float body = smoothstep(0.34, 0.8, bil);
    float strands = smoothstep(0.3, 0.9, fib);
    // most of the sand rides low and thins out with height (plumes spread
    // higher), fraying into fibres toward the top
    float z = v * vH;
    float dens = exp(-z / (1.0 + mix(0.45, 0.7, vPlume) * vH)) * (1.0 - smoothstep(0.75, 1.0, v));
    dens *= mix(1.0, strands, smoothstep(0.3, 0.9, v));
    // soft where it meets the ground; plumes have no hard underside
    float a = body * dens * (0.3 + 0.9 * strands) * smoothstep(0.0, mix(0.06, 0.35, vPlume), v) * smoothstep(0.0, 0.6, vAbove) * vA;
    if (a < 0.004) discard;
    vec3 col = mix(uColor, uColorHi, clamp(v * 0.5 + strands * 0.5, 0.0, 1.0));
    gl_FragColor = vec4(col, a);
    #include <fog_fragment>
    gl_FragColor.rgb = mix(gl_FragColor.rgb, uHazeColor, vHaze);
  }
`;

// --- loose grains near the camera ------------------------------------------------------
const GRAIN_VERT = /* glsl */ `
  ${STORM_GLSL}
  ${HEIGHT_GLSL}
  ${HAZE_GLSL}
  ${STREAK_GLSL}
  uniform vec3 uCenter;
  uniform float uPx;
  uniform float uGrainA;
  attribute vec4 aSeed;
  varying float vA;
  varying float vHaze;
  // grains wrap on a fixed period around the orbit target, so zooming never
  // moves them
  const float PERIOD = 120.0;
  void main() {
    // the bouncing layer is the slowest sand of all
    float sp = uSpeed * (0.35 + aSeed.w * 0.45);
    vec2 p = aSeed.xy * PERIOD + uWind * uTime * sp;
    p += vec2(sin(uTime * 1.3 + aSeed.z * 40.0), cos(uTime * 1.1 + aSeed.x * 30.0)) * 0.1;
    vec2 o = uCenter.xz - 0.5 * PERIOD;
    vec2 xz = o + mod(p - o, PERIOD);
    // short ballistic hops: most stay under 0.2 m, the highest about 0.45 m
    float hMax = 0.02 - 0.12 * log(1.0 - 0.97 * aSeed.z);
    float T = 0.9 * sqrt(hMax) + 0.05;
    float ph = fract(uTime / T + aSeed.y * 7.0);
    float h = 0.01 + 4.0 * hMax * ph * (1.0 - ph);
    vec2 g = terrainAt(xz);
    vec3 P = vec3(xz.x, g.x + h, xz.y);
    vec4 mvPosition = viewMatrix * vec4(P, 1.0);
    float d = max(-mvPosition.z, 0.1);
    float px = 0.03 * uPx / d;
    gl_PointSize = clamp(px, 1.0, 3.0);
    vec2 e = abs(xz - uCenter.xz) / (0.5 * PERIOD);
    float edge = 1.0 - smoothstep(0.7, 1.0, max(e.x, e.y));
    float range = smoothstep(0.35, 1.0, px) * (1.0 - smoothstep(25.0, 60.0, d)) * smoothstep(1.5, 6.0, d);
    float cut = 1.0 - smoothstep(-4.0, -0.5, P.z);
    // they travel in the same snaking streams as the ground streaks
    vA = uGrainA * uStorm * edge * range * cut * (0.35 + 0.65 * streakMask(xz)) * clamp(g.y, 0.2, 1.5);
    vHaze = stormHazeAmount(P);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const GRAIN_FRAG = /* glsl */ `
  uniform vec3 uHazeColor;
  uniform vec3 uGrainColor;
  varying float vA;
  varying float vHaze;
  void main() {
    vec2 q = gl_PointCoord - 0.5;
    float a = (1.0 - dot(q, q) * 4.0) * vA;
    if (a <= 0.003) discard;
    gl_FragColor = vec4(mix(uGrainColor, uHazeColor, vHaze), a);
  }
`;

// --- instances -----------------------------------------------------------------------------
function veilInstances() {
  const r = makeRng(9090);
  const out = [];
  const veil = (x, z, L, H, opacity, lift = r() * 0.1) => {
    const life = 30 + r() * 40;
    // the veil's body drifts at most of the sand's speed
    const travel = life * SPEED * (0.65 + r() * 0.15);
    out.push([x, z, -1e4, r(), L, H * (0.75 + r() * 0.3), H * (0.9 + r() * 0.4), lift, travel, life, opacity, 0]);
  };
  // low drifts over the half of silo 18's floor where the flow comes back
  // down after clearing the west rim
  for (let i = 0; i < 18; i++) veil(-60 + r() * 210, -24 - r() * 110, 40 + r() * 70, 1.5 + r() * 4, 0.6 + r() * 0.3);
  // thin skins of sand climbing to the brinks: the outer west slope up to
  // the west crest, the inner east wall up to the east crest, the back rim
  for (let i = 0; i < 6; i++) {
    const L = 25 + r() * 35;
    veil(-118 - L / 2 + 8, -30 - r() * 90, L, 0.6 + r() * 0.9, 0.5 + r() * 0.25, 0);
  }
  for (let i = 0; i < 6; i++) veil(60 + r() * 50, -25 - r() * 75, 25 + r() * 35, 0.6 + r() * 0.9, 0.5 + r() * 0.25, 0);
  for (let i = 0; i < 6; i++) {
    const a = THREE.MathUtils.degToRad(200 + r() * 100), d = 112 + r() * 10;
    veil(Math.cos(a) * d, Math.min(-28, Math.sin(a) * d), 25 + r() * 35, 0.6 + r() * 0.9, 0.5 + r() * 0.25, 0);
  }
  // the rest gather into a few streams with clear air between them
  const stream = (centres) => centres[Math.floor(r() * centres.length)] + (r() - 0.5) * 60;
  for (let i = 0; i < 30; i++) veil(-400 + r() * 800, stream([-70, -190, -330]), 70 + r() * 150, 4 + r() * 10, 0.6 + r() * 0.3);
  for (let i = 0; i < 22; i++) veil(-850 + r() * 1700, stream([-430, -820, -1150]), 180 + r() * 300, 8 + r() * 16, 0.4 + r() * 0.2);

  // Sand streams off crater crests. Where the wind blows over a crest into
  // the bowl (the west rims) the plume is strong and sinks into the bowl;
  // where it spills out over the lee brink (the back and east rims) it is
  // fainter and holds its height. The strength follows how squarely the
  // wind crosses that stretch of crest.
  const plume = (cx, cz, rRim, a, L, H1, opacity) => {
    const x = cx + Math.cos(a) * rRim, z = cz + Math.sin(a) * rRim;
    if (z > -22) return;
    const y = terrainY(x, z);
    const nW = Math.cos(a) * WIND.x + Math.sin(a) * WIND.y;
    const sink = nW < -0.3 ? 0.06 + r() * 0.05 : 0.01 + r() * 0.02;
    const op = opacity * (0.45 + 0.55 * Math.abs(nW)) * (nW < 0 ? 1 : 0.75);
    out.push([x, z, y + 0.2, r(), L, 1 + r() * 1.5, H1, 0, 0, 1, op, sink]);
  };
  const big = (cx, cz, n) => {
    for (let i = 0; i < n; i++) plume(cx, cz, 116, Math.PI + 0.19 + (i / (n - 1)) * 0.95 + (r() - 0.5) * 0.08, 60 + r() * 60, 8 + r() * 8, 1.1 + r() * 0.3);
    for (let i = 0; i < 7; i++) plume(cx, cz, 117, Math.PI * (1.28 + r() * 0.4), 40 + r() * 40, 4 + r() * 5, 0.9 + r() * 0.3);
    for (let i = 0; i < 2; i++) plume(cx, cz, 117, Math.PI * (1.72 + r() * 0.22), 50 + r() * 40, 4 + r() * 5, 0.5 + r() * 0.2);
  };
  big(0, 0, 9);
  big(SILO17_POS[0], SILO17_POS[1], 6);
  for (const s of SILOS) {
    if (s.id === 18 || s.id === 17) continue;
    if (Math.abs(s.x) > 950 || s.z < -1350) continue;
    for (let i = 0; i < 3; i++) plume(s.x, s.z, 90, Math.PI + 0.1 + r() * 1.1, 45 + r() * 40, 3 + r() * 4, 0.6 + r() * 0.3);
  }
  return out;
}

// --- surface materials ---------------------------------------------------------------------
/**
 * Patch a surface material: haze over distance always, plus optionally sand
 * streaks running across it (`streaks`), a lean in the wind (`sway`) and a
 * minimum on-screen width for thin tubes with an `aThick` radius (`thin`).
 */
function patchMaterial(mat, U, { streaks = false, sway = false, thin = false } = {}) {
  const key = `storm:${streaks ? 's' : ''}${sway ? 'w' : ''}${thin ? 't' : ''}`;
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, U);
    const thinPars = thin ? 'uniform float uPxWorld;\nattribute float aThick;' : '';
    let vs = shader.vertexShader.replace('#include <common>', `#include <common>\n${STORM_GLSL}\nvarying vec3 vStormWorld;\n${thinPars}`);
    if (thin) {
      vs = vs.replace(
        '#include <begin_vertex>',
        /* glsl */ `#include <begin_vertex>
        {
          // twigs never get thinner than about half a pixel, so a tumbleweed
          // stays a tangle at a distance instead of breaking into shimmer
          vec4 thinW = modelMatrix * vec4(transformed, 1.0);
          float thinD = distance(cameraPosition, thinW.xyz);
          transformed += normal * max(0.0, uPxWorld * 0.5 * thinD - aThick);
        }`
      );
    }
    if (sway) {
      vs = vs.replace(
        '#include <project_vertex>',
        /* glsl */ `
        vec4 mvPosition = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          mvPosition = instanceMatrix * mvPosition;
        #endif
        vec4 swayWorld = modelMatrix * mvPosition;
        {
          // tufts lean with the wind, harder as a gust passes, and flutter;
          // capped so the (static) shadows still sit under them
          float hgt = max(transformed.y, 0.0);
          float ph = dot(swayWorld.xz, vec2(0.21, 0.13));
          float gust = 0.35 + 0.65 * smoothstep(0.3, 0.7, gustAt(swayWorld.xz));
          float flutter = sin(uTime * 4.3 + ph * 3.0) * 0.35 + sin(uTime * 7.1 + ph * 5.0) * 0.15;
          float bend = min((0.6 + flutter) * gust * hgt * hgt * 0.13 * uStorm, 0.25);
          swayWorld.xz += uWind * bend;
          swayWorld.y -= bend * bend * 0.3;
        }
        mvPosition = viewMatrix * swayWorld;
        gl_Position = projectionMatrix * mvPosition;
        `
      );
    }
    vs = vs.replace('#include <fog_vertex>', '#include <fog_vertex>\nvStormWorld = (mvPosition.xyz - viewMatrix[3].xyz) * mat3(viewMatrix);');
    shader.vertexShader = vs;

    const streakPars = streaks ? `${HEIGHT_GLSL}\n${STREAK_GLSL}\nuniform vec3 uSandAlbedo;` : '';
    let fs = shader.fragmentShader.replace('#include <common>', `#include <common>\n${STORM_GLSL}\n${HAZE_GLSL}\n${streakPars}\nvarying vec3 vStormWorld;`);
    if (streaks) {
      fs = fs.replace(
        '#include <color_fragment>',
        /* glsl */ `#include <color_fragment>
        if (uStorm > 0.0) {
          // sand snaking across the ground where it faces the wind; far off
          // the threads would only blur into a tint, so they fade out
          float s = streakMask(vStormWorld.xz) * terrainAt(vStormWorld.xz).y;
          s *= 1.0 - smoothstep(350.0, 1400.0, distance(vStormWorld, cameraPosition));
          diffuseColor.rgb = mix(diffuseColor.rgb, uSandAlbedo, clamp(s, 0.0, 1.0) * 0.4 * uStorm);
          // slow, kilometre-wide shadows where thicker dust passes overhead
          vec2 q = vec2(dot(vStormWorld.xz, uWind), dot(vStormWorld.xz, vec2(-uWind.y, uWind.x)));
          float dim = texture2D(uSand, vec2((q.x - uTime * uSpeed * 0.4) / 1400.0, q.y / 900.0 + 0.2)).b;
          diffuseColor.rgb *= 1.0 - 0.07 * uStorm * smoothstep(0.45, 0.8, dim);
        }`
      );
    }
    fs = fs.replace('#include <fog_fragment>', '#include <fog_fragment>\ngl_FragColor.rgb = mix(gl_FragColor.rgb, uHazeColor, stormHazeAmount(vStormWorld));');
    shader.fragmentShader = fs;
  };
  mat.customProgramCacheKey = () => key;
  mat.needsUpdate = true;
}

// ---------------------------------------------------------------------------------------------
export function createSandstorm({ scene, camera, controls, renderer }) {
  const group = new THREE.Group();
  group.name = 'sandstorm';

  const hm = heightTexture();
  const sand = toTexture(sandCanvas(256), { srgb: false });

  // shared uniforms: every material below holds these same objects
  const U = {
    uTime: { value: 0 },
    uStorm: { value: 1 },
    uSpeed: { value: SPEED },
    uWind: { value: WIND.clone() },
    uHaze: { value: HAZE },
    // warm ochre dust; the sky's horizon band takes the same colour
    uHazeColor: { value: new THREE.Color().setRGB(0.5, 0.36, 0.21) },
    uSand: { value: sand },
    uSandAlbedo: { value: new THREE.Color().setRGB(0.42, 0.31, 0.18) },
    uHeight: { value: hm.tex },
    uHM: { value: new THREE.Vector4(HM.x0, HM.z0, 1 / HM.step, 0) },
    uHMSize: { value: new THREE.Vector2(hm.nx, hm.nz) },
    // world size of one pixel at unit distance
    uPxWorld: { value: 0.001 },
  };
  const fog = () => THREE.UniformsUtils.clone(THREE.UniformsLib.fog);

  // veils and plumes
  const list = veilInstances();
  const quad = new THREE.PlaneGeometry(1, 1, 28, 4).translate(0.5, 0.5, 0);
  const geo = new THREE.InstancedBufferGeometry().copy(quad);
  const aA = new Float32Array(list.length * 4), aB = new Float32Array(list.length * 4), aC = new Float32Array(list.length * 4);
  list.forEach((p, i) => {
    aA.set(p.slice(0, 4), i * 4);
    aB.set(p.slice(4, 8), i * 4);
    aC.set(p.slice(8, 12), i * 4);
  });
  geo.setAttribute('aA', new THREE.InstancedBufferAttribute(aA, 4));
  geo.setAttribute('aB', new THREE.InstancedBufferAttribute(aB, 4));
  geo.setAttribute('aC', new THREE.InstancedBufferAttribute(aC, 4));
  geo.instanceCount = list.length;
  // covers every sheet at the far end of its drift
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 20, -760), 1600);
  const veilMat = new THREE.ShaderMaterial({
    name: 'sandVeils',
    uniforms: {
      ...fog(),
      ...U,
      // lit dust, a little brighter than the ground it blows over
      uColor: { value: new THREE.Color().setRGB(0.7, 0.53, 0.33) },
      uColorHi: { value: new THREE.Color().setRGB(1.05, 0.8, 0.52) },
    },
    vertexShader: VEIL_VERT,
    fragmentShader: VEIL_FRAG,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    // the sheets already face the camera, so one pass is enough
    forceSinglePass: true,
    fog: true,
  });
  const veils = new THREE.Mesh(geo, veilMat);
  veils.name = 'sandVeils';
  veils.renderOrder = 2;
  group.add(veils);

  // loose grains
  const GRAINS = 5000;
  const gr = makeRng(4242);
  const gGeo = new THREE.BufferGeometry();
  const seeds = new Float32Array(GRAINS * 4);
  for (let i = 0; i < seeds.length; i++) seeds[i] = gr();
  gGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(GRAINS * 3), 3));
  gGeo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 4));
  const grainMat = new THREE.ShaderMaterial({
    name: 'sandGrains',
    uniforms: {
      ...U,
      uCenter: { value: new THREE.Vector3() },
      uPx: { value: 1000 },
      uGrainA: { value: 0 },
      // a shade lighter and warmer than the floor, so it reads as moving sand
      uGrainColor: { value: new THREE.Color().setRGB(0.6, 0.46, 0.29) },
    },
    vertexShader: GRAIN_VERT,
    fragmentShader: GRAIN_FRAG,
    transparent: true,
    depthWrite: false,
  });
  const grains = new THREE.Points(gGeo, grainMat);
  grains.name = 'sandGrains';
  grains.frustumCulled = false;
  grains.renderOrder = 3;
  group.add(grains);

  // the ground, the props and the skyline sit in the same dusty air
  const patched = new Set();
  const patch = (root) => {
    root?.traverse((o) => {
      if (!o.isMesh || !o.material || patched.has(o.material)) return;
      patched.add(o.material);
      patchMaterial(o.material, U);
    });
  };
  const surface = scene.getObjectByName('surface');
  const earth = surface?.getObjectByName('earth');
  surface?.traverse((o) => {
    if (!o.isMesh || o === earth || patched.has(o.material)) return;
    patched.add(o.material);
    patchMaterial(o.material, U, { streaks: o.name === 'terrain', sway: o.name === 'shrubs' });
  });
  patch(scene.getObjectByName('surface-dynamic'));
  patch(scene.getObjectByName('silo17/remains'));

  // tumbleweeds loose on the surface
  const weeds = buildTumbleweeds();
  group.add(weeds.group);
  patchMaterial(weeds.weedMat, U, { thin: true });
  patchMaterial(weeds.shadowMat, U);

  // the sky's horizon band takes the same dust colour
  const skyU = scene.getObjectByName('sky')?.material.uniforms;
  if (skyU?.uDust) skyU.uDust.value = U.uHazeColor.value;

  const drawSize = new THREE.Vector2();
  let target = 1;
  const update = (dt, t) => {
    U.uTime.value = t;
    const k = U.uStorm.value;
    if (k !== target) U.uStorm.value = target > k ? Math.min(target, k + dt / 2) : Math.max(target, k - dt / 2);
    const s = U.uStorm.value;
    U.uHaze.value = HAZE * s;
    if (skyU?.uStorm) skyU.uStorm.value = s;

    renderer.getDrawingBufferSize(drawSize);
    U.uPxWorld.value = (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)) / drawSize.y;
    weeds.update(dt, t, U.uWind.value, s);

    // grains only show with the camera down near the ground, looking at it
    const tgt = controls.target;
    const dist = camera.position.distanceTo(tgt);
    const near = 1 - THREE.MathUtils.smoothstep(dist, 60, 140);
    const above = THREE.MathUtils.smoothstep(tgt.y, -3, 1) * THREE.MathUtils.smoothstep(camera.position.y, 0, 6);
    grainMat.uniforms.uGrainA.value = 0.5 * near * above;
    grains.visible = s > 0 && near * above > 0.01;
    if (grains.visible) {
      grainMat.uniforms.uCenter.value.copy(tgt);
      grainMat.uniforms.uPx.value = 1 / U.uPxWorld.value;
    }
    veils.visible = s > 0;
  };

  return {
    group,
    update,
    /** Storm strength, 0 (calm) to 1; eases over a couple of seconds. */
    set(k) {
      target = THREE.MathUtils.clamp(k, 0, 1);
    },
    get strength() {
      return U.uStorm.value;
    },
    uniforms: U,
  };
}
