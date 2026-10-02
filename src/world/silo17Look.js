import * as THREE from 'three';
import { MATS } from '../core/materials.js';

// ---------------------------------------------------------------------------
// Silo 17 has no power. The named rooms that ran on the silo's own supply go
// dim and desaturated — their lamps turn to dead olive glass, screens and
// monitors go black, signs lose their glow — and the stair's concrete takes
// an olive cast. Generic floors, IT (fed from elsewhere) and the other rooms
// are left alone. Everything eases in and out over about a second.
// ---------------------------------------------------------------------------

const OLIVE = '#273027';
const TOP_TINT = { matte: '#cbc8bf', metal: '#bcb8b1', wood: '#bcb5aa', fabric: '#b3ada6' };

/** Per-room treatment. `tint` multiplies material kinds, `glow` replaces lamp colour. */
const ROOMS = {
  'top/cafeteria': { tint: TOP_TINT, glow: OLIVE, screens: true },
  'top/sheriff': { tint: TOP_TINT, glow: OLIVE, screens: true },
  'top/judicial': { tint: TOP_TINT, glow: OLIVE, screens: true },
  'top/watcher': { tint: TOP_TINT, glow: OLIVE, screens: true },
  'mids/farms': { tint: { matte: '#cecbc4', foliage: '#ffadc4', metal: '#c4bfb8', wood: '#bcb5aa', fabric: '#bcb5aa' }, glow: '#000000' },
  'mids/filtration': { glass: '#aabcb8' },
  'mids/midscafe': { screens: true },
  'deep/digger': { tint: { rock: '#c4c8bc', metal: '#c4bfb8', matte: '#d4d3ce', fabric: '#bcb8ad', wood: '#bcb5aa' }, glow: '#000000', screens: true },
  'deep/hall': { glass: '#aabcb8', sheen: true, cap: true },
  'deep/mechcafe': { screens: true },
  'deep/supply': { cage: '#bcbcbc' },
};

// Our stair concrete is already a touch darker than white, so the olive cast
// is lifted to land on the same tone as a pure #a3a89a tint would on white.
const SHAFT_TINT = { shaftConcrete: '#bcc2b2', shaftColumn: '#b3b8a8', shaftTrim: '#b8bcb0' };
const SIGN_TINT = '#b3b3b3';
const DEAD_WATER = new THREE.Color('#0c1e22');
const DEAD_SHEEN = new THREE.Color('#0a1416');

const isScreen = (m) => m.isMeshStandardMaterial && m.emissiveMap && m.emissiveIntensity > 0;

export function createSilo17Look(scene) {
  // Each entry: { mat, from: {...}, to: {...} } — numeric/colour targets.
  const entries = [];
  const seen = new Set();

  const record = (mat, to) => {
    if (seen.has(mat)) return;
    seen.add(mat);
    const from = {};
    if (to.color) from.color = mat.color.clone();
    if (to.emissiveIntensity !== undefined) from.emissiveIntensity = mat.emissiveIntensity;
    if (to.opacity !== undefined) from.opacity = mat.opacity;
    entries.push({ mat, from, to });
  };
  const mul = (c, hex) => c.clone().multiply(new THREE.Color(hex));

  // Give a room its own copies of the shared library materials so changing
  // them cannot leak into the generic floors or other rooms. Materials a room
  // made for itself (generator core, cage mesh…) stay as they are, so any code
  // still holding a reference to them keeps working.
  const shared = new Set(Object.values(MATS));
  const ownMaterials = (root) => {
    const copies = new Map();
    root.traverse((o) => {
      if (!o.isMesh) return;
      const swap = (m) => {
        if (!shared.has(m)) return m;
        if (!copies.has(m)) copies.set(m, m.clone());
        return copies.get(m);
      };
      o.material = Array.isArray(o.material) ? o.material.map(swap) : swap(o.material);
    });
  };

  for (const [name, rule] of Object.entries(ROOMS)) {
    const root = scene.getObjectByName(name);
    if (!root) continue;
    ownMaterials(root);
    root.traverse((o) => {
      if (!o.isMesh) return;
      for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
        const kind = m.name;
        if (rule.screens && isScreen(m)) record(m, { emissiveIntensity: 0 });
        else if (kind === 'glow' && rule.glow) record(m, { color: mul(m.color, rule.glow) });
        else if (kind === 'glass') record(m, { opacity: 0.5, ...(rule.glass ? { color: mul(m.color, rule.glass) } : {}) });
        else if (kind === 'sheen' && rule.sheen) record(m, { color: DEAD_SHEEN.clone(), opacity: 0.8 });
        else if (kind === 'deep/capSection' && rule.cap) record(m, { color: mul(m.color, '#909090'), ...(m.emissiveIntensity ? { emissiveIntensity: 0 } : {}) });
        else if (kind === 'deep/chainlink' && rule.cage) record(m, { color: mul(m.color, rule.cage) });
        else if (rule.tint?.[kind]) record(m, { color: mul(m.color, rule.tint[kind]) });
      }
    });
  }

  // Signs in every zone lose their glow.
  for (const name of ['top/signs', 'mids/signs', 'deep/signs']) {
    const s = scene.getObjectByName(name);
    if (s?.material) record(s.material, { color: mul(s.material.color, SIGN_TINT), emissiveIntensity: 0 });
  }

  // Filtration water turns dark and still.
  const midsDyn = scene.getObjectByName('rooms/mids/dyn');
  midsDyn?.traverse((o) => {
    if (o.isMesh && /filtration/.test(o.name) && o.material?.name === 'water') record(o.material, { color: DEAD_WATER.clone(), opacity: 0.95 });
  });

  // The stair: concrete, column and rails pick up the olive cast.
  const shaft = scene.getObjectByName('shaft');
  shaft?.traverse((o) => {
    if (!o.isMesh) return;
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
      const tint = SHAFT_TINT[m.name];
      if (tint) record(m, { color: mul(m.color, tint) });
      else if (o.name === 'placardNumerals') record(m, { color: mul(m.color, '#c4c4c4') });
    }
  });

  let target = 0;
  let k = 0;
  const apply = (t) => {
    for (const { mat, from, to } of entries) {
      if (to.color) mat.color.copy(from.color).lerp(to.color, t);
      if (to.emissiveIntensity !== undefined) mat.emissiveIntensity = from.emissiveIntensity + (to.emissiveIntensity - from.emissiveIntensity) * t;
      if (to.opacity !== undefined) mat.opacity = from.opacity + (to.opacity - from.opacity) * t;
    }
  };

  return {
    count: entries.length,
    set(active) {
      target = active ? 1 : 0;
    },
    /** Ease towards the current mode; cheap once settled. */
    update(dt) {
      if (k === target) return;
      k = target > k ? Math.min(target, k + dt / 1.1) : Math.max(target, k - dt / 1.1);
      apply(k * k * (3 - 2 * k));
    },
  };
}
