import * as THREE from 'three';
import { PRESETS, floorY } from './core/constants.js';
import { smooth } from './core/rng.js';
import { Flight } from './core/tween.js';
import { PLACES } from './data/places.js';
import { inMode } from './ui/config.js';

// ---------------------------------------------------------------------------
// Camera tours and input: flights between places, keyboard shortcuts,
// hover / click picking against invisible volumes, and the wiring between
// the UI's buttons and the camera.
// ---------------------------------------------------------------------------

const CLICK_PX = 5; // max pointer travel for a click
const CLICK_MS = 400; // max press duration for a click
const DEG = Math.PI / 180;
const GROUND_Y = 0.12; // the crater floor over silo 18

const MODE_TOAST = {
  18: 'Silo 18 — lights on, pumps running',
  17: 'Silo 17 — dark, and the deep levels are under water',
};

const isTyping = (t) => !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
const toVec = (out, v) => (Array.isArray(v) ? out.fromArray(v) : out.copy(v));

/** Invisible (but raycastable) volumes, one per place, in world coordinates. */
function buildPickVolumes(places) {
  const group = new THREE.Group();
  group.name = 'pick';
  // Double-sided so a camera zoomed right into a room still hits its volume.
  const mat = new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide });
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeo = new THREE.SphereGeometry(1, 16, 12);
  const add = (i, geo, x, y, z, sx, sy, sz, radius) => {
    const m = new THREE.Mesh(geo, mat);
    m.name = `pick/${places[i].id}`;
    m.position.set(x, y, z);
    m.scale.set(sx, sy, sz);
    m.userData = { index: i, center: new THREE.Vector3(x, y, z), radius };
    m.updateMatrix();
    m.matrixAutoUpdate = false;
    group.add(m);
  };
  const sphere = (i, [x, y, z], r) => add(i, sphereGeo, x, y, z, r, r, r, r);
  const box = (i, [x, y, z], [sx, sy, sz]) => add(i, boxGeo, x, y, z, sx, sy, sz, 0.5 * Math.hypot(sx, sy, sz));

  places.forEach((p, i) => {
    if (p.kind === 'room') {
      if (p.pickBox) box(i, p.pickBox.center, p.pickBox.size);
      else {
        const s = p.side === 'west' ? -1 : 1;
        const d = 37.5 * Math.sin((p.span || 45) * DEG);
        box(i, [s * 47, floorY(p.level) + 3.5, -d / 2], [56, 7, d]);
      }
    } else sphere(i, p.pick?.sphere || p.anchor, p.pick?.r || 14);
  });
  group.updateMatrixWorld(true);
  return group;
}

export function createInteraction(app, ui) {
  const { camera, controls, scene } = app;
  const canvas = app.renderer.domElement;
  const places = app.places || PLACES;
  const indexOf = new Map(places.map((p, i) => [p.id, i]));
  let current = null; // id of the place on show

  // Some places exist in only one of the two silos (the Silo 17 camp).
  const mode = () => (app.silo?.mode ?? ui.mode) === '17' ? '17' : '18';
  const here = (p) => inMode(p, mode());
  const tour = () => places.filter(here);

  // --- flights -------------------------------------------------------------------
  const flight = new Flight();
  const _to = new THREE.Vector3();
  const _toT = new THREE.Vector3();

  /**
   * Fly the camera and orbit target to a new pose. Short hops take ~1.2 s,
   * trips down the whole silo ~2.6 s. Long trips between close-ups bow
   * outward so the silo comes into view mid-flight.
   */
  function fly(position, target, { duration, arc, onDone } = {}) {
    toVec(_to, position);
    toVec(_toT, target);
    const travel = Math.max(camera.position.distanceTo(_to), controls.target.distanceTo(_toT));
    if (travel < 1e-3) {
      flight.cancel();
      onDone?.();
      return;
    }
    const dur = duration ?? 1.2 + 1.4 * Math.min(1, Math.sqrt(travel / 1100));
    if (arc == null) {
      // Up to 35 % of the trip; skipped when either end is already a wide shot,
      // since a straight line from far away never clips the model.
      const far = Math.max(camera.position.distanceTo(controls.target), _to.distanceTo(_toT));
      arc = 0.35 * travel * smooth(80, 600, travel) * THREE.MathUtils.clamp(1 - far / (0.8 * travel), 0, 1);
    }
    flight.start(camera.position, controls.target, _to, _toT, { duration: dur, arc, onDone });
  }
  // Any user drag / wheel / touch takes the camera back.
  controls.addEventListener('start', () => flight.cancel());

  // --- navigation ------------------------------------------------------------------
  function go(id) {
    const i = indexOf.get(id);
    if (i === undefined) return;
    const p = places[i];
    if (!here(p)) return;
    current = p.id;
    fly(p.cam.position, p.cam.target);
    const list = tour();
    ui.showCard(p, list.indexOf(p), list.length);
    ui.setActive(p.id);
    ui.setView(null);
    ui.hideIntro();
  }

  function view(key) {
    const pr = PRESETS[key];
    if (!pr) return;
    current = null;
    fly(pr.position, pr.target);
    ui.hideCard();
    ui.setActive(null);
    ui.setView(key);
  }

  const home = () => view('silo');

  function step(dir) {
    const list = tour();
    const n = list.length;
    if (!n) return;
    const i = current == null ? -1 : list.findIndex((p) => p.id === current);
    const j = i < 0 ? (dir > 0 ? 0 : n - 1) : (i + dir + n) % n;
    go(list[j].id);
  }
  const next = () => step(1);
  const prev = () => step(-1);

  function setMode(m) {
    if (m !== '17' && m !== '18') return;
    const was = app.silo?.mode ?? ui.mode;
    if (was === m) return;
    app.silo?.set(m);
    ui.setMode(m);
    setHoverIdx(-1);
    pickPending = inside;
    // A place that does not exist in the other silo closes with it.
    if (current != null && !here(places[indexOf.get(current)])) home();
    ui.toast(MODE_TOAST[m]);
    ui.showIntro(4000);
  }

  // --- picking -------------------------------------------------------------------------
  const pickGroup = buildPickVolumes(places);
  scene.add(pickGroup);
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const hits = [];
  let rectX = 0;
  let rectY = 0;
  let rectW = 1;
  let rectH = 1;
  const measureCanvas = () => {
    const r = canvas.getBoundingClientRect();
    rectX = r.left;
    rectY = r.top;
    rectW = r.width || 1;
    rectH = r.height || 1;
  };
  measureCanvas();
  addEventListener('resize', measureCanvas);

  /**
   * Index of the place under a client-space point, or -1. Overlapping volumes
   * (a spot inside a room, say) resolve to whichever one the ray passes
   * closest to the centre of, relative to its size.
   */
  function pickAt(cx, cy) {
    ndc.set(((cx - rectX) / rectW) * 2 - 1, -((cy - rectY) / rectH) * 2 + 1);
    camera.updateMatrixWorld();
    raycaster.setFromCamera(ndc, camera);
    hits.length = 0;
    raycaster.intersectObjects(pickGroup.children, false, hits);
    // The ground hides what is under it: past the point where the ray meets
    // the ground behind the cut, nothing below can be picked (so the hatch
    // and shelter pick the surface, not the room under them).
    const ro = raycaster.ray.origin, rd = raycaster.ray.direction;
    let groundT = Infinity;
    if (ro.y > GROUND_Y && rd.y < 0) {
      const t = (GROUND_Y - ro.y) / rd.y;
      if (ro.z + rd.z * t < 0) groundT = t;
    }
    let best = -1;
    let bestScore = Infinity;
    for (let k = 0; k < hits.length; k++) {
      const u = hits[k].object.userData;
      if (!here(places[u.index]) || hits[k].distance > groundT) continue;
      const score = raycaster.ray.distanceToPoint(u.center) / u.radius;
      if (score < bestScore) {
        bestScore = score;
        best = u.index;
      }
    }
    hits.length = 0;
    return best;
  }

  // Hover state. Picking is deferred to update() so it runs at most once a frame.
  let hoverIdx = -1;
  let px = 0;
  let py = 0;
  let inside = false; // a mouse / pen is over the canvas
  let held = false; // a button is down
  let pickPending = false;
  const chipLevels = places.map((p) => (p.level > 0 ? `L${p.level}` : ''));

  function setHoverIdx(i) {
    if (i < 0) {
      if (hoverIdx < 0) return;
      hoverIdx = -1;
      ui.hideChip();
      ui.setHover(null);
      canvas.style.cursor = '';
      return;
    }
    const p = places[i];
    if (i !== hoverIdx) {
      hoverIdx = i;
      ui.setHover(p.id);
      canvas.style.cursor = 'pointer';
    }
    ui.chip(p.name, px, py, chipLevels[i]);
  }

  canvas.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    px = e.clientX;
    py = e.clientY;
    inside = true;
    held = e.buttons !== 0;
    pickPending = true;
  });
  canvas.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'touch') return;
    inside = false;
    pickPending = false;
    setHoverIdx(-1);
  });
  canvas.addEventListener('wheel', () => (pickPending = inside), { passive: true });
  // The view keeps moving after input (damping, flights): re-pick under a still pointer.
  controls.addEventListener('change', () => {
    if (inside) pickPending = true;
  });

  // Clicks / taps: a short, still press of the primary button.
  const downs = new Set();
  let downId = -1;
  let downX = 0;
  let downY = 0;
  let downT = 0;
  canvas.addEventListener('pointerdown', (e) => {
    // A primary press means no other pointer is down: drop ids whose pointerup never arrived.
    if (e.isPrimary) downs.clear();
    downs.add(e.pointerId);
    if (e.pointerType !== 'touch') held = true;
    setHoverIdx(-1);
    if (e.button !== 0 || downs.size > 1) {
      downId = -1;
      return;
    }
    downId = e.pointerId;
    downX = e.clientX;
    downY = e.clientY;
    downT = performance.now();
  });
  const release = (e) => {
    downs.delete(e.pointerId);
    if (e.pointerType !== 'touch') {
      held = e.buttons !== 0;
      pickPending = inside;
    }
  };
  canvas.addEventListener('pointerup', (e) => {
    release(e);
    if (e.pointerId !== downId || e.button !== 0) return;
    downId = -1;
    if (Math.hypot(e.clientX - downX, e.clientY - downY) > CLICK_PX || performance.now() - downT > CLICK_MS) return;
    const i = pickAt(e.clientX, e.clientY);
    if (i >= 0) go(places[i].id);
  });
  canvas.addEventListener('pointercancel', (e) => {
    release(e);
    if (e.pointerId === downId) downId = -1;
  });

  // --- keyboard ---------------------------------------------------------------------------
  addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
    if (isTyping(e.target) || isTyping(document.activeElement)) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'Escape') home();
    else if (e.code === 'Backquote' || e.key === '`') ui.toggleStats();
  });

  // --- UI wiring ----------------------------------------------------------------------------
  ui.onLegend(go);
  ui.on('legend-hover', (id) => ui.setHover(id));
  ui.on('prev', prev);
  ui.on('next', next);
  ui.on('close', home);
  ui.on('mode', setMode);
  ui.on('view', view);
  ui.setMode(mode());
  // No view is highlighted until one is picked.
  ui.setView(null);

  // --- per frame (before render) ---------------------------------------------------------
  function update(dt) {
    if (flight.active) {
      flight.step(dt, camera.position, controls.target);
      controls.update();
    }
    if (!pickPending || !inside || held) return;
    // No hover while flying (names would flicker past a still pointer); the
    // pending pick runs on the frame the flight lands.
    if (flight.active) setHoverIdx(-1);
    else {
      pickPending = false;
      setHoverIdx(pickAt(px, py));
    }
  }

  return {
    go,
    view,
    home,
    next,
    prev,
    fly,
    setMode,
    update,
    pickGroup,
    get current() {
      return current;
    },
    get flying() {
      return flight.active;
    },
  };
}
