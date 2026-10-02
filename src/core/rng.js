// Small deterministic helpers so every build of the silo looks the same.

export function makeRng(seed = 1) {
  let s = seed >>> 0;
  const next = () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  next.range = (a, b) => a + (b - a) * next();
  next.int = (a, b) => Math.floor(a + (b - a + 1) * next());
  next.pick = (arr) => arr[Math.floor(next() * arr.length)];
  next.chance = (p) => next() < p;
  next.sign = () => (next() < 0.5 ? -1 : 1);
  return next;
}

export const hashStr = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

// 2D value noise with smooth interpolation, plus fractal sum.
const P = new Uint8Array(512);
{
  const r = makeRng(7331);
  const p = [...Array(256).keys()];
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) P[i] = p[i & 255];
}
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const grad = (h, x, y) => {
  const v = h & 7;
  const u = v < 4 ? x : y;
  const w = v < 4 ? y : x;
  return ((v & 1) ? -u : u) + ((v & 2) ? -2 * w : 2 * w);
};

/** Gradient noise in roughly [-1, 1]. */
export function noise2(x, y) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  const u = fade(x), v = fade(y);
  const a = P[X] + Y, b = P[X + 1] + Y;
  const n00 = grad(P[a], x, y), n10 = grad(P[b], x - 1, y);
  const n01 = grad(P[a + 1], x, y - 1), n11 = grad(P[b + 1], x - 1, y - 1);
  const nx0 = n00 + u * (n10 - n00), nx1 = n01 + u * (n11 - n01);
  return (nx0 + v * (nx1 - nx0)) * 0.35;
}

export function fbm(x, y, oct = 4, lac = 2, gain = 0.5) {
  let a = 1, f = 1, sum = 0, norm = 0;
  for (let i = 0; i < oct; i++) {
    sum += a * noise2(x * f, y * f);
    norm += a;
    a *= gain;
    f *= lac;
  }
  return sum / norm;
}

export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (a, b, v) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
