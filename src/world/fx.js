import * as THREE from 'three';
import { TEX } from '../core/materials.js';
import { makeRng } from '../core/rng.js';

/**
 * Soft sprites that rise, swell and fade on a loop: steam from drains,
 * cooking stalls, pond mist.
 */
export class Wisps {
  constructor(name, { color = '#e8ece8', opacity = 0.35, size = 1.3, rise = 1.4, life = 4.5, seed = 1 } = {}) {
    this.group = new THREE.Group();
    this.group.name = name;
    this.items = [];
    this.opts = { color, opacity, size, rise, life };
    this.rng = makeRng(seed);
    this.mat = new THREE.SpriteMaterial({ map: TEX.steam, color, transparent: true, depthWrite: false, opacity });
  }

  add(x, y, z, count = 1, spread = 0.4) {
    for (let i = 0; i < count; i++) {
      const s = new THREE.Sprite(this.mat.clone());
      s.name = this.group.name;
      const base = new THREE.Vector3(x + (this.rng() - 0.5) * spread, y, z + (this.rng() - 0.5) * spread);
      s.position.copy(base);
      this.group.add(s);
      this.items.push({ s, base, phase: this.rng() * this.opts.life, drift: (this.rng() - 0.5) * 0.4 });
    }
    return this;
  }

  update = (dt, t) => {
    const { life, rise, size, opacity } = this.opts;
    for (const w of this.items) {
      const k = ((t + w.phase) % life) / life;
      w.s.position.set(w.base.x + w.drift * k, w.base.y + k * rise, w.base.z);
      const sc = size * (0.55 + k * 0.9);
      w.s.scale.set(sc, sc, sc);
      w.s.material.opacity = opacity * Math.sin(k * Math.PI);
    }
  };
}
