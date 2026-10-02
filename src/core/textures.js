import * as THREE from 'three';
import { makeRng, clamp } from './rng.js';

// Every texture in the scene is painted on a canvas at start-up.

let ANISO = 8;
export const setAnisotropy = (n) => (ANISO = n);

export function makeCanvas(w, h = w) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

export function toTexture(c, { srgb = true, repeat = true, aniso = ANISO, mips = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = repeat ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  t.anisotropy = aniso;
  t.generateMipmaps = mips;
  if (!mips) t.minFilter = THREE.LinearFilter;
  t.needsUpdate = true;
  return t;
}

// ---------------------------------------------------------------------------
// Periodic gradient noise so textures tile without seams.
// ---------------------------------------------------------------------------
const PERM = new Uint8Array(512);
{
  const r = makeRng(90210);
  const p = [...Array(256).keys()];
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
}
const GRADS = Array.from({ length: 16 }, (_, i) => [Math.cos((i / 16) * Math.PI * 2), Math.sin((i / 16) * Math.PI * 2)]);
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);

export function pnoise(x, y, px, py) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const X0 = ((xi % px) + px) % px, Y0 = ((yi % py) + py) % py;
  const X1 = (X0 + 1) % px, Y1 = (Y0 + 1) % py;
  const g = (X, Y, dx, dy) => {
    const gr = GRADS[PERM[PERM[X & 255] + (Y & 255)] & 15];
    return gr[0] * dx + gr[1] * dy;
  };
  const u = fade(xf), v = fade(yf);
  const a = g(X0, Y0, xf, yf), b = g(X1, Y0, xf - 1, yf);
  const c = g(X0, Y1, xf, yf - 1), d = g(X1, Y1, xf - 1, yf - 1);
  return (a + u * (b - a) + v * (c + u * (d - c) - (a + u * (b - a)))) * 1.4;
}

export function pfbm(x, y, period, oct = 4) {
  let amp = 1, f = 1, sum = 0, norm = 0;
  for (let i = 0; i < oct; i++) {
    sum += amp * pnoise(x * f, y * f, period * f, period * f);
    norm += amp;
    amp *= 0.5;
    f *= 2;
  }
  return sum / norm;
}

function eachPixel(c, fn) {
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(c.width, c.height);
  const d = img.data;
  const out = [0, 0, 0, 255];
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      fn(x, y, out);
      const i = (y * c.width + x) * 4;
      d[i] = out[0];
      d[i + 1] = out[1];
      d[i + 2] = out[2];
      d[i + 3] = out[3];
    }
  }
  ctx.putImageData(img, 0, 0);
  return ctx;
}

// ---------------------------------------------------------------------------
// Concrete family
// ---------------------------------------------------------------------------
export function concreteCanvas(size = 256, { base = [202, 197, 187], blotch = 16, speck = 14, seed = 1, pores = 0.004, lines = 0 } = {}) {
  const r = makeRng(seed);
  const c = makeCanvas(size);
  const s = 4;
  eachPixel(c, (x, y, o) => {
    const u = x / size, v = y / size;
    const n = pfbm(u * s, v * s, s, 5);
    const n2 = pfbm(u * s * 4 + 7.3, v * s * 4 + 1.1, s * 4, 3);
    let k = n * blotch + n2 * blotch * 0.35 + (r() - 0.5) * speck;
    if (lines) {
      // horizontal form-work joints
      const ly = (v * lines) % 1;
      if (ly < 0.012) k -= 18;
    }
    o[0] = clamp(base[0] + k, 0, 255);
    o[1] = clamp(base[1] + k, 0, 255);
    o[2] = clamp(base[2] + k * 0.95, 0, 255);
    o[3] = 255;
  });
  const ctx = c.getContext('2d');
  const nPores = Math.floor(size * size * pores);
  for (let i = 0; i < nPores; i++) {
    const x = r() * size, y = r() * size, rad = 0.4 + r() * 1.1;
    ctx.fillStyle = `rgba(60,55,48,${0.25 + r() * 0.35})`;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
  }
  // a few long water stains
  for (let i = 0; i < 6; i++) {
    const x = r() * size;
    const g = ctx.createLinearGradient(0, 0, 0, size);
    g.addColorStop(0, 'rgba(80,72,60,0)');
    g.addColorStop(0.5, `rgba(80,72,60,${0.04 + r() * 0.05})`);
    g.addColorStop(1, 'rgba(80,72,60,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, 2 + r() * 6, size);
  }
  return c;
}

// Floor tiles for the slab tops: large worn greige tiles (2 m at the slab's
// 10 m UV repeat) with thin dark grout lines.
export function floorTiles(size = 1024, n = 5, seed = 4) {
  const r = makeRng(seed);
  const c = makeCanvas(size);
  const ctx = c.getContext('2d');
  const t = size / n;
  // base noise first
  eachPixel(c, (x, y, o) => {
    const k = pfbm((x / size) * 6, (y / size) * 6, 6, 4) * 9 + (r() - 0.5) * 6;
    o[0] = 128 + k;
    o[1] = 118 + k;
    o[2] = 104 + k * 0.9;
    o[3] = 255;
  });
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      // each tile a slightly different shade of the same worn stone
      const tone = r();
      const a = 0.05 + r() * 0.1;
      ctx.fillStyle = tone < 0.4 ? `rgba(84,72,58,${a})` : tone < 0.8 ? `rgba(150,138,118,${a})` : `rgba(104,96,86,${a + 0.04})`;
      ctx.fillRect(i * t + 2, j * t + 2, t - 4, t - 4);
    }
  }
  ctx.fillStyle = 'rgba(46,40,33,0.75)';
  for (let i = 0; i <= n; i++) {
    ctx.fillRect(i * t - 2, 0, 4, size);
    ctx.fillRect(0, i * t - 2, size, 4);
  }
  return c;
}

export function floorTilesNormal(size = 512, n = 5) {
  const c = makeCanvas(size);
  const t = size / n;
  eachPixel(c, (x, y, o) => {
    const fx = (x % t) / t, fy = (y % t) / t;
    let nx = 0, ny = 0;
    const g = 0.035;
    if (fx < g) nx = -0.6;
    else if (fx > 1 - g) nx = 0.6;
    if (fy < g) ny = 0.6;
    else if (fy > 1 - g) ny = -0.6;
    o[0] = 128 + nx * 127;
    o[1] = 128 + ny * 127;
    o[2] = 255;
    o[3] = 255;
  });
  return c;
}

// Earth cross-section: horizontal strata, darker with depth.
export function earthCanvas(w = 256, h = 1024, seed = 12) {
  const r = makeRng(seed);
  const c = makeCanvas(w, h);
  const bands = [];
  let y = 0;
  while (y < 1) {
    const t = 0.006 + r() * 0.04;
    bands.push({ y0: y, y1: y + t, k: (r() - 0.5) * 12 });
    y += t;
  }
  let bi = 0;
  eachPixel(c, (x, py, o) => {
    const v = py / h;
    const warp = pfbm((x / w) * 3, v * 2, 3, 3) * 0.01;
    const vv = clamp(v + warp, 0, 0.9999);
    while (bi < bands.length - 1 && bands[bi].y1 < vv) bi++;
    while (bi > 0 && bands[bi].y0 > vv) bi--;
    const band = bands[bi].k;
    // smooth dark loam, a touch cooler with depth; the strata carry the detail
    const depth = Math.pow(v, 0.45);
    const base = [78 - depth * 16, 64 - depth * 12, 52 - depth * 8];
    const k = band * 1.3 + pfbm((x / w) * 8, v * 30, 8, 3) * 3 + (r() - 0.5) * 3;
    o[0] = clamp(base[0] + k, 0, 255);
    o[1] = clamp(base[1] + k * 0.85, 0, 255);
    o[2] = clamp(base[2] + k * 0.7, 0, 255);
    o[3] = 255;
  });
  const ctx = c.getContext('2d');
  // thin wavy seams following the strata, mostly paler, a few darker; the
  // waves use whole periods across the width so the texture still tiles
  for (let i = 0; i < 46; i++) {
    const py = r() * h;
    const light = r() < 0.75;
    ctx.strokeStyle = light ? `rgba(160,136,106,${0.1 + r() * 0.12})` : `rgba(26,19,14,${0.12 + r() * 0.1})`;
    ctx.lineWidth = 0.8 + r() * 1.4;
    const k1 = 1 + Math.floor(r() * 3), k2 = 2 + Math.floor(r() * 4);
    const a1 = 1 + r() * 3.5, a2 = r() * 1.5, p1 = r() * 6.28, p2 = r() * 6.28;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 4) {
      const t = (x / w) * Math.PI * 2;
      const yy = py + Math.sin(t * k1 + p1) * a1 + Math.sin(t * k2 + p2) * a2;
      if (x === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }
  return c;
}

/**
 * Dry plain seen from above: pale, low-contrast dust crossed by thin dark
 * meandering veins (iso-lines of warped noise), tiling seamlessly.
 */
export function veinCanvas(size = 512, seed = 23) {
  const r = makeRng(seed);
  const c = makeCanvas(size);
  eachPixel(c, (x, y, o) => {
    const u = x / size, v = y / size;
    // domain warp so the lines wander
    const wu = u + pfbm(u * 3 + 1.7, v * 3 + 9.2, 3, 3) * 0.06;
    const wv = v + pfbm(u * 3 + 5.3, v * 3 + 2.4, 3, 3) * 0.06;
    const f1 = pfbm(wu * 4, wv * 4, 4, 3);
    const f2 = pfbm(wu * 7 + 3.3, wv * 7 + 7.7, 7, 2);
    const mask = clamp(pfbm(u * 2 + 4.1, v * 2 + 0.6, 2, 2) * 1.6 + 0.5, 0, 1);
    // soft-edged bands a hand's width across rather than hairline cracks
    const l1 = 1 - clamp(Math.abs(f1) / 0.04, 0, 1);
    const l2 = (1 - clamp(Math.abs(f2) / 0.03, 0, 1)) * mask;
    const vein = Math.max(Math.pow(l1, 1.4), Math.pow(l2, 1.4) * 0.8);
    // some of the loops enclose slightly darker, damper patches
    const patch = clamp((-f1 - 0.06) / 0.12, 0, 1) * 9;
    const mott = pfbm(u * 6, v * 6, 6, 4) * 12 + pfbm(u * 24, v * 24, 24, 2) * 5 + (r() - 0.5) * 6 - patch;
    const base = [206, 202, 192];
    const d = vein * 74;
    o[0] = clamp(base[0] + mott - d, 0, 255);
    o[1] = clamp(base[1] + mott - d * 1.02, 0, 255);
    o[2] = clamp(base[2] + mott * 0.95 - d * 1.04, 0, 255);
    o[3] = 255;
  });
  return c;
}

// Dried, cracked ground: warped Voronoi edges over mottled sand.
export function crackedCanvas(size = 512, seed = 21) {
  const r = makeRng(seed);
  const c = makeCanvas(size);
  const G = 9;
  const pts = [];
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) pts.push([(i + 0.15 + r() * 0.7) / G, (j + 0.15 + r() * 0.7) / G]);
  const cell = (i, j) => pts[((j + G) % G) * G + ((i + G) % G)];
  eachPixel(c, (x, y, o) => {
    let u = x / size, v = y / size;
    // domain warp for wandering cracks
    const wu = u + pfbm(u * 5, v * 5, 5, 3) * 0.035;
    const wv = v + pfbm(u * 5 + 3.1, v * 5 + 8.7, 5, 3) * 0.035;
    const ci = Math.floor(wu * G), cj = Math.floor(wv * G);
    let d1 = 9, d2 = 9;
    for (let dj = -1; dj <= 1; dj++) {
      for (let di = -1; di <= 1; di++) {
        const I = ci + di, J = cj + dj;
        const p = cell(I, J);
        // shift wrapped neighbours back next to this pixel
        const ox = (I - (((I % G) + G) % G)) / G;
        const oy = (J - (((J % G) + G) % G)) / G;
        const dx = p[0] + ox - wu, dy = p[1] + oy - wv;
        const d = dx * dx + dy * dy;
        if (d < d1) {
          d2 = d1;
          d1 = d;
        } else if (d < d2) d2 = d;
      }
    }
    const edge = Math.sqrt(d2) - Math.sqrt(d1);
    const crack = 1 - clamp(edge / 0.012, 0, 1);
    const mott = pfbm(u * 6, v * 6, 6, 4);
    const fine = (r() - 0.5) * 10;
    let k = mott * 22 + fine;
    const base = [186, 178, 160];
    const cr = crack * crack * 95;
    o[0] = clamp(base[0] + k - cr, 0, 255);
    o[1] = clamp(base[1] + k - cr * 1.02, 0, 255);
    o[2] = clamp(base[2] + k * 0.9 - cr * 1.05, 0, 255);
    o[3] = 255;
  });
  return c;
}

export function waterNormalCanvas(size = 256, seed = 3) {
  const c = makeCanvas(size);
  const H = new Float32Array(size * size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) H[y * size + x] = pfbm((x / size) * 6, (y / size) * 6, 6, 4);
  void seed;
  eachPixel(c, (x, y, o) => {
    const h = (xx, yy) => H[((yy + size) % size) * size + ((xx + size) % size)];
    const dx = (h(x + 1, y) - h(x - 1, y)) * 3;
    const dy = (h(x, y + 1) - h(x, y - 1)) * 3;
    const l = Math.hypot(dx, dy, 1);
    o[0] = 128 + (-dx / l) * 127;
    o[1] = 128 + (-dy / l) * 127;
    o[2] = 128 + (1 / l) * 127;
    o[3] = 255;
  });
  return c;
}

export function softSpriteCanvas(size = 64, { core = 0.0, noisy = false, seed = 5 } = {}) {
  const c = makeCanvas(size);
  if (!noisy) {
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, size * core, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.45)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return c;
  }
  const r = makeRng(seed);
  eachPixel(c, (x, y, o) => {
    const u = x / size - 0.5, v = y / size - 0.5;
    const d = Math.hypot(u, v) * 2;
    const n = pfbm(x / size * 4, y / size * 4, 4, 4) * 0.5 + 0.5;
    const a = clamp(1 - d, 0, 1) ** 1.6 * (0.55 + n * 0.6);
    o[0] = o[1] = o[2] = 255;
    o[3] = clamp(a * 255 + (r() - 0.5) * 6, 0, 255);
  });
  return c;
}

export function chainLinkCanvas(size = 256) {
  const c = makeCanvas(size);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  ctx.strokeStyle = 'rgba(210,214,216,1)';
  ctx.lineWidth = 3;
  const s = size / 8;
  for (let i = -8; i <= 16; i++) {
    ctx.beginPath();
    ctx.moveTo(i * s, 0);
    ctx.lineTo(i * s + size, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(i * s, size);
    ctx.lineTo(i * s + size, 0);
    ctx.stroke();
  }
  return c;
}

// ---------------------------------------------------------------------------
// Text & signage
// ---------------------------------------------------------------------------
const FONT = 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif';

/** Level numerals 1..147 packed into an atlas (white paint, worn). */
export function numeralAtlas(count = 147, cols = 16, cell = 128) {
  const rows = Math.ceil(count / cols);
  const c = makeCanvas(cols * cell, rows * cell);
  const ctx = c.getContext('2d');
  const r = makeRng(144);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < count; i++) {
    const n = i + 1;
    const x = (i % cols) * cell + cell / 2, y = Math.floor(i / cols) * cell + cell / 2;
    const size = n >= 100 ? cell * 0.5 : cell * 0.62;
    ctx.font = `800 ${size}px ${FONT}`;
    ctx.fillStyle = '#f4f0e6';
    ctx.fillText(String(n), x, y + 2);
  }
  // paint wear
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 9000; i++) {
    ctx.fillStyle = `rgba(0,0,0,${0.2 + r() * 0.6})`;
    ctx.fillRect(r() * c.width, r() * c.height, 1 + r() * 2, 1 + r() * 2);
  }
  ctx.globalCompositeOperation = 'source-over';
  const tex = toTexture(c, { repeat: false });
  tex.userData = { cols, rows, count };
  return tex;
}

/**
 * Packs many small signs into one texture. Each `add` returns UV bounds and
 * aspect so geometry can be sized to match.
 */
export class SignAtlas {
  constructor(width = 2048, height = 1024) {
    this.c = makeCanvas(width, height);
    this.ctx = this.c.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.rowH = 0;
    this.pad = 6;
    this.entries = [];
  }

  add(text, { style = 'panel', size = 64, bg, fg, border, weight = 800, spacing = 0.12, padX = 0.45, padY = 0.32, sub, font = FONT, width } = {}) {
    const ctx = this.ctx;
    ctx.font = `${weight} ${size}px ${font}`;
    const letter = size * spacing;
    const measure = (t, f) => {
      ctx.font = f;
      let w = 0;
      for (const ch of t) w += ctx.measureText(ch).width + letter;
      return w - letter;
    };
    const mainFont = `${weight} ${size}px ${font}`;
    const subFont = `600 ${size * 0.42}px ${font}`;
    let tw = measure(text, mainFont);
    if (sub) tw = Math.max(tw, measure(sub, subFont));
    const w = Math.ceil(width ?? tw + size * padX * 2);
    const h = Math.ceil(size * (1 + padY * 2) + (sub ? size * 0.62 : 0));
    if (this.x + w + this.pad > this.c.width) {
      this.x = 0;
      this.y += this.rowH + this.pad;
      this.rowH = 0;
    }
    if (this.y + h > this.c.height) console.warn('SignAtlas full:', text);
    const x0 = this.x, y0 = this.y;
    const S = {
      panel: { bg: '#1d2120', fg: '#f1ece0', border: 'rgba(241,236,224,0.35)' },
      light: { bg: '#e9e4d6', fg: '#26282a', border: 'rgba(0,0,0,0.25)' },
      red: { bg: '#8e2a22', fg: '#f6e7d6', border: 'rgba(0,0,0,0.3)' },
      stencil: { bg: null, fg: '#2a2b2b', border: null },
      paint: { bg: null, fg: '#efe9dc', border: null },
      green: { bg: '#23402f', fg: '#e6f1e4', border: 'rgba(230,241,228,0.35)' },
      amber: { bg: '#2b2418', fg: '#ffd9a0', border: 'rgba(255,217,160,0.4)' },
    }[style] || {};
    const B = bg ?? S.bg, F = fg ?? S.fg, L = border ?? S.border;
    const ctx2 = this.ctx;
    ctx2.clearRect(x0, y0, w, h);
    if (B) {
      ctx2.fillStyle = B;
      ctx2.fillRect(x0, y0, w, h);
    }
    if (L) {
      ctx2.strokeStyle = L;
      ctx2.lineWidth = Math.max(2, size * 0.05);
      ctx2.strokeRect(x0 + size * 0.1, y0 + size * 0.1, w - size * 0.2, h - size * 0.2);
    }
    ctx2.fillStyle = F;
    ctx2.textBaseline = 'middle';
    const drawSpaced = (t, f, cy) => {
      ctx2.font = f;
      const tw2 = measure(t, f);
      let cx = x0 + (w - tw2) / 2;
      ctx2.font = f;
      for (const ch of t) {
        ctx2.fillText(ch, cx, cy);
        cx += ctx2.measureText(ch).width + letter;
      }
    };
    const mainY = y0 + size * (0.5 + padY) + (sub ? 0 : 0);
    drawSpaced(text, mainFont, mainY + size * 0.04);
    if (sub) {
      ctx2.globalAlpha = 0.75;
      drawSpaced(sub, subFont, y0 + size * (1 + padY) + size * 0.34);
      ctx2.globalAlpha = 1;
    }
    this.x += w + this.pad;
    this.rowH = Math.max(this.rowH, h);
    return this._entry(x0, y0, w, h);
  }

  _entry(x0, y0, w, h) {
    const W = this.c.width, H = this.c.height;
    const e = { U0: x0 / W, U1: (x0 + w) / W, V0: 1 - (y0 + h) / H, V1: 1 - y0 / H, aspect: w / h };
    this.entries.push(e);
    return e;
  }

  /** Draw arbitrary content with a callback(ctx, x, y, w, h). */
  custom(w, h, draw) {
    if (this.x + w + this.pad > this.c.width) {
      this.x = 0;
      this.y += this.rowH + this.pad;
      this.rowH = 0;
    }
    const x0 = this.x, y0 = this.y;
    this.ctx.save();
    draw(this.ctx, x0, y0, w, h);
    this.ctx.restore();
    this.x += w + this.pad;
    this.rowH = Math.max(this.rowH, h);
    return this._entry(x0, y0, w, h);
  }

  texture() {
    this.tex ||= toTexture(this.c, { repeat: false });
    return this.tex;
  }
}

// ---------------------------------------------------------------------------
// Painted screens
// ---------------------------------------------------------------------------

/** The outside, as the cafeteria screens show it: haze, hills, one dead tree. */
export function surfaceViewCanvas(w = 1024, h = 256, { seed = 8, tint = [1, 1, 1], grain = 10, scan = true, tree = true } = {}) {
  const r = makeRng(seed);
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#a8a498');
  sky.addColorStop(0.55, '#c9c3b4');
  sky.addColorStop(0.72, '#bdb6a6');
  sky.addColorStop(1, '#8b8474');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);
  // distant ridge
  const ridge = (y0, amp, freq, col, jag = 0) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 4) {
      const t = x / w;
      const y = y0 - Math.sin(t * freq + 1.3) * amp - Math.sin(t * freq * 2.7 + 0.4) * amp * 0.4 - (r() - 0.5) * jag;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  };
  ridge(h * 0.66, h * 0.03, 5, 'rgba(150,143,128,0.9)', 1.5);
  ridge(h * 0.72, h * 0.035, 3.2, 'rgba(128,120,104,0.95)', 1);
  // the near hill with its crest right of centre
  ctx.fillStyle = '#6f6757';
  ctx.beginPath();
  ctx.moveTo(0, h);
  const crestX = w * 0.62, crestY = h * 0.66;
  for (let x = 0; x <= w; x += 3) {
    const d = (x - crestX) / (w * 0.42);
    const y = crestY + (d * d) * h * 0.2 + Math.sin(x * 0.05) * 0.8;
    ctx.lineTo(x, Math.min(h, y));
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();
  // haze band
  const haze = ctx.createLinearGradient(0, h * 0.55, 0, h * 0.8);
  haze.addColorStop(0, 'rgba(210,204,190,0)');
  haze.addColorStop(0.5, 'rgba(210,204,190,0.25)');
  haze.addColorStop(1, 'rgba(210,204,190,0)');
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, w, h);
  if (tree) {
    // bare tree on the crest
    ctx.strokeStyle = '#2f2b25';
    ctx.lineCap = 'round';
    const tx = crestX + w * 0.02, ty = crestY + 1;
    const branch = (x, y, len, ang, wd, depth) => {
      const x2 = x + Math.cos(ang) * len, y2 = y - Math.sin(ang) * len;
      ctx.lineWidth = wd;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      if (depth > 0) {
        branch(x2, y2, len * 0.66, ang + 0.5 + r() * 0.2, wd * 0.62, depth - 1);
        branch(x2, y2, len * 0.62, ang - 0.45 - r() * 0.2, wd * 0.62, depth - 1);
      }
    };
    branch(tx, ty, h * 0.12, Math.PI / 2 + 0.04, 3.2, 3);
  }
  // grain + scanlines + vignette
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let y = 0; y < h; y++) {
    const sl = scan && y % 3 === 0 ? 0.93 : 1;
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const vx = x / w - 0.5, vy = y / h - 0.5;
      const vig = 1 - Math.min(0.45, (vx * vx * 0.8 + vy * vy * 2.2) * 0.9);
      const g = (r() - 0.5) * grain;
      d[i] = clamp((d[i] + g) * sl * vig * tint[0], 0, 255);
      d[i + 1] = clamp((d[i + 1] + g) * sl * vig * tint[1], 0, 255);
      d[i + 2] = clamp((d[i + 2] + g) * sl * vig * tint[2], 0, 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

/** A wall of small monitors, each showing a grainy exterior feed. */
export function monitorBankCanvas(w = 512, h = 288, cols = 4, rows = 3) {
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0d0f0e';
  ctx.fillRect(0, 0, w, h);
  const cw = w / cols, ch = h / rows;
  let seed = 30;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const feed = surfaceViewCanvas(Math.floor(cw - 10), Math.floor(ch - 10), {
        seed: seed++,
        tint: [0.86, 1.0, 0.9],
        grain: 26,
        tree: (i + j) % 3 === 0,
      });
      ctx.drawImage(feed, i * cw + 5, j * ch + 5);
    }
  }
  return c;
}

/** Stencilled text band for a cut concrete face. */
export function stencilBandCanvas(text, w = 2048, h = 128, { fg = 'rgba(40,40,38,0.85)', bg = '#dcd6c8', size = 30, spacing = 0.5 } = {}) {
  const c = concreteCanvas(256, { base: [220, 214, 200], blotch: 10, speck: 8, seed: 77 });
  const out = makeCanvas(w, h);
  const ctx = out.getContext('2d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  for (let x = 0; x < w; x += 256) for (let y = 0; y < h; y += 256) ctx.drawImage(c, x, y);
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.fillRect(0, h * 0.18, w, 2);
  ctx.fillRect(0, h * 0.82, w, 2);
  ctx.font = `700 ${size}px "Courier New", Courier, monospace`;
  ctx.fillStyle = fg;
  ctx.textBaseline = 'middle';
  let tw = 0;
  for (const ch of text) tw += ctx.measureText(ch).width + size * spacing;
  let x = (w - tw) / 2;
  for (const ch of text) {
    ctx.fillText(ch, x, h / 2 + 2);
    x += ctx.measureText(ch).width + size * spacing;
  }
  return out;
}

export function floorNumberCanvas(text = '144', w = 512, h = 256) {
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  const r = makeRng(1440);
  ctx.clearRect(0, 0, w, h);
  ctx.font = `900 ${h * 0.86}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#e8c65a';
  ctx.fillText(text, w / 2, h / 2 + 8);
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 2600; i++) {
    ctx.fillStyle = `rgba(0,0,0,${0.3 + r() * 0.7})`;
    const s = 1 + r() * 5;
    ctx.fillRect(r() * w, r() * h, s, s * (0.3 + r()));
  }
  return c;
}

export function drawingsCanvas(w = 384, h = 256, seed = 17) {
  const r = makeRng(seed);
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  const sheets = 5;
  for (let i = 0; i < sheets; i++) {
    const sx = 10 + (i % 3) * 124 + r() * 10, sy = 12 + Math.floor(i / 3) * 120 + r() * 8;
    ctx.save();
    ctx.translate(sx + 50, sy + 50);
    ctx.rotate((r() - 0.5) * 0.25);
    ctx.fillStyle = r() < 0.5 ? '#efe9d8' : '#e6dcc4';
    ctx.fillRect(-52, -50, 104, 100);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    const pal = ['#c0392b', '#2e86c1', '#27ae60', '#e67e22', '#7d3c98', '#2c3e50'];
    // simple crayon motifs: sun, spiral stair, stick trees, a door
    const motif = i % 4;
    ctx.strokeStyle = r.pick(pal);
    if (motif === 0) {
      ctx.beginPath();
      ctx.arc(0, -10, 18, 0, Math.PI * 2);
      ctx.stroke();
      for (let k = 0; k < 10; k++) {
        const a = (k / 10) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * 24, -10 + Math.sin(a) * 24);
        ctx.lineTo(Math.cos(a) * 34, -10 + Math.sin(a) * 34);
        ctx.stroke();
      }
    } else if (motif === 1) {
      ctx.beginPath();
      for (let k = 0; k < 90; k++) {
        const a = k * 0.25, rr = 4 + k * 0.42;
        ctx.lineTo(Math.cos(a) * rr * 0.9, Math.sin(a) * rr * 0.9);
      }
      ctx.stroke();
    } else if (motif === 2) {
      for (let k = -1; k <= 1; k++) {
        ctx.strokeStyle = '#6e4b2a';
        ctx.beginPath();
        ctx.moveTo(k * 30, 38);
        ctx.lineTo(k * 30, 5);
        ctx.stroke();
        ctx.fillStyle = r.pick(['#27ae60', '#1e8449', '#58d68d']);
        ctx.beginPath();
        ctx.arc(k * 30, -8, 16, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.strokeRect(-20, -30, 40, 64);
      ctx.beginPath();
      ctx.arc(10, 4, 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#e67e22';
      ctx.beginPath();
      ctx.moveTo(-40, -40);
      ctx.lineTo(40, -40);
      ctx.stroke();
    }
    ctx.restore();
  }
  return c;
}

export function graffitiCanvas(text = 'WHO BUILT THIS?', w = 1280, h = 256, seed = 71) {
  const r = makeRng(seed);
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  ctx.font = `900 ${h * 0.62}px "Marker Felt", "Chalkboard SE", "Comic Sans MS", ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(170,24,20,0.92)';
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-0.03);
  ctx.fillText(text, 0, 0);
  ctx.restore();
  // drips
  for (let i = 0; i < 26; i++) {
    const x = w * 0.08 + r() * w * 0.84, y = h * 0.6 + r() * h * 0.12, len = 10 + r() * 60;
    const g = ctx.createLinearGradient(0, y, 0, y + len);
    g.addColorStop(0, 'rgba(170,24,20,0.85)');
    g.addColorStop(1, 'rgba(170,24,20,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, y, 2 + r() * 3, len);
  }
  // overspray speckle
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(170,24,20,${r() * 0.25})`;
    ctx.fillRect(r() * w, h * 0.15 + r() * h * 0.7, 1.5, 1.5);
  }
  return c;
}

export function tatteredAlphaCanvas(w = 128, h = 64, seed = 9) {
  const r = makeRng(seed);
  const c = makeCanvas(w, h);
  eachPixel(c, (x, y, o) => {
    const u = x / w, v = y / h;
    const edge = 0.78 + pfbm(v * 6, 0.5, 6, 3) * 0.25 + (r() - 0.5) * 0.04;
    let a = u < edge ? 255 : 0;
    const hole = pfbm(u * 5 + 3, v * 5 + 7, 5, 3);
    if (hole > 0.42 && u > 0.35) a = 0;
    o[0] = o[1] = o[2] = a;
    o[3] = 255;
  });
  return c;
}
