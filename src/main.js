import '@fontsource/vt323/latin-400.css';
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { buildMaterials } from './core/materials.js';
import { setAnisotropy } from './core/textures.js';
import { createEnv } from './core/env.js';
import { PRESETS } from './core/constants.js';
import { PLACES } from './data/places.js';
import { buildShell } from './world/shell.js';
import { buildShaft } from './world/shaft.js';
import { buildShaftDynamic } from './world/shaftDynamic.js';
import { buildSurface, buildSurfaceDynamic } from './world/surface.js';
import { buildSilo17 } from './world/silo17.js';
import { createSilo17Look } from './world/silo17Look.js';
import { createSandstorm } from './world/sandstorm.js';
import { buildTop } from './rooms/top.js';
import { buildMids } from './rooms/mids.js';
import { buildDeep } from './rooms/deep.js';
import { createUI } from './ui/ui.js';
import { withExtraPlaces } from './ui/config.js';
import { createInteraction } from './interact.js';

const nextFrame = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));

// The loading screen is a terminal booting up: each finished step moves up
// into the log with an OK, the current one sits on the prompt line.
const loader = {
  el: document.getElementById('loader'),
  fill: document.getElementById('loader-fill'),
  text: document.getElementById('loader-text'),
  log: document.getElementById('loader-log'),
  pct: document.getElementById('loader-pct'),
  msg: null,
  set(p, msg) {
    this.fill.style.width = `${Math.round(p * 100)}%`;
    this.pct.textContent = `${Math.round(p * 100)}%`;
    if (!msg || msg === this.msg) return;
    if (this.msg) {
      const li = document.createElement('li');
      const label = document.createElement('span');
      label.textContent = this.msg.replace(/…$/, '');
      li.append(label, document.createElement('i'), Object.assign(document.createElement('b'), { textContent: 'OK' }));
      this.log.append(li);
      while (this.log.children.length > 7) this.log.firstChild.remove();
    }
    this.msg = msg;
    this.text.textContent = msg;
  },
  done() {
    this.set(1, 'Opening the doors…');
    // the tube switches off and the silo is behind it
    this.el.classList.add('done');
    setTimeout(() => this.el.remove(), 900);
  },
};

function detectPerf() {
  const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && Math.min(innerWidth, innerHeight) < 820);
  const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
  document.documentElement.classList.toggle('mobile', mobile);
  return {
    mobile,
    dpr,
    shadows: true,
    shadowMapSize: mobile ? 2048 : 4096,
    bloom: true,
    msaa: dpr >= 2 ? 0 : 4,
  };
}

/** Rendered triangle count of everything currently visible. */
function countTriangles(root) {
  let tris = 0;
  root.traverseVisible((o) => {
    if (!o.isMesh || !o.geometry) return;
    const g = o.geometry;
    const n = g.index ? g.index.count / 3 : g.attributes.position.count / 3;
    tris += n * (o.isInstancedMesh ? o.count : g.isInstancedBufferGeometry ? g.instanceCount : 1);
  });
  return tris;
}

async function boot() {
  const perf = detectPerf();
  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', stencil: false });
  renderer.setPixelRatio(perf.dpr);
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.info.autoReset = false;
  setAnisotropy(Math.min(8, renderer.capabilities.getMaxAnisotropy()));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 1, 14000);
  camera.position.set(...PRESETS.silo.position);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(...PRESETS.silo.target);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.screenSpacePanning = true;
  controls.minDistance = 2;
  controls.maxDistance = 4000;
  controls.zoomSpeed = 1.2;
  controls.minPolarAngle = 0.05;
  controls.maxPolarAngle = Math.PI - 0.05;
  controls.minAzimuthAngle = -1.5393804;
  controls.maxAzimuthAngle = 1.5393804;
  controls.update();

  loader.set(0.04, 'Pouring concrete…');
  await nextFrame();
  buildMaterials();
  const env = createEnv({ renderer, scene, camera, perf });
  const pool = env.pool;

  const world = new THREE.Group();
  world.name = 'world';
  const dynamic = new THREE.Group();
  dynamic.name = 'dynamic';
  scene.add(world, dynamic);
  const updaters = [];
  const addDyn = (d) => {
    if (!d) return;
    if (d.dyn) dynamic.add(d.dyn);
    if (d.update) updaters.push(d.update);
  };

  const stages = [
    [0.1, 'Shaping the surface…', () => {
      world.add(buildSurface({ pool }));
      const s = buildSurfaceDynamic();
      dynamic.add(s.group);
      updaters.push(s.update);
    }],
    [0.3, 'Casting 144 floors…', () => world.add(buildShell({ pool }))],
    [0.46, 'Building the stair…', () => {
      world.add(buildShaft({ pool }));
      const g = buildShaftDynamic();
      dynamic.add(g.group);
      updaters.push(g.update);
    }],
    [0.58, 'Furnishing Up Top…', () => world.add(buildTop({ pool }))],
    [0.68, 'Planting the Mids…', () => {
      const m = buildMids({ pool });
      world.add(m.group);
      addDyn(m);
    }],
    [0.78, 'Wiring Down Deep…', () => {
      app.deep = buildDeep({ pool });
      world.add(app.deep.group);
      addDyn(app.deep);
    }],
    [0.86, 'Flooding the neighbour…', () => {
      app.silo17 = buildSilo17({ pool });
      world.add(app.silo17.group);
      addDyn(app.silo17);
    }],
  ];

  const app = { renderer, scene, camera, controls, env, perf, world, dynamic, updaters, places: withExtraPlaces(PLACES) };
  window.app = app;

  for (const [p, msg, fn] of stages) {
    loader.set(p, msg);
    await nextFrame();
    await fn();
  }

  // Wind-borne sand over the surface. It patches the surface materials, so it
  // runs once they all exist and before the shaders compile.
  const storm = createSandstorm({ scene, camera, controls, renderer });
  dynamic.add(storm.group);
  updaters.push(storm.update);
  app.storm = storm;

  // Silo 18 / Silo 17 switch. The look module gives the powered-down rooms
  // their own materials, so it must run after every room is built.
  const look = createSilo17Look(scene);
  updaters.push((dt) => look.update(dt));
  app.silo = {
    mode: '18',
    set(mode) {
      if (mode === this.mode) return;
      this.mode = mode;
      const s17 = mode === '17';
      app.silo17?.setActive(s17);
      app.deep?.setPower(!s17);
      look.set(s17);
      document.documentElement.classList.toggle('silo17', s17);
      app.sceneTriangles = countTriangles(scene);
      renderer.shadowMap.needsUpdate = true;
    },
  };

  const onResize = () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight, false);
    env.resize(innerWidth, innerHeight, perf.dpr);
  };
  addEventListener('resize', onResize);
  onResize();

  loader.set(0.93, 'Compiling shaders…');
  await nextFrame();
  try {
    await renderer.compileAsync(scene, camera);
  } catch {
    /* compileAsync is an optimisation only */
  }
  renderer.shadowMap.needsUpdate = true;
  app.sceneTriangles = countTriangles(scene);

  const ui = createUI(app);
  const ix = createInteraction(app, ui);
  app.ui = ui;
  app.tour = ix;

  // The first frames upload every texture and fill the shadow map, which
  // takes the best part of a second. Draw them while the loading screen is
  // still up, so its switch-off animation runs on a page that is idle.
  loader.set(1, 'Opening the doors…');
  for (let i = 0; i < 2; i++) {
    env.update(controls.target, camera.position.distanceTo(controls.target), 0, false);
    env.composer.render(0);
    await nextFrame();
  }

  const timer = new THREE.Timer();
  timer.connect(document);
  let lastDist = 0;
  renderer.setAnimationLoop(() => {
    timer.update();
    const dt = Math.min(0.1, timer.getDelta());
    const t = timer.getElapsed();
    renderer.info.reset();
    ix.update(dt);
    controls.update();
    const dist = camera.position.distanceTo(controls.target);
    const near = THREE.MathUtils.clamp(dist * 0.0042, 0.05, 6);
    if (Math.abs(near - camera.near) / camera.near > 0.05) {
      camera.near = near;
      camera.updateProjectionMatrix();
    }
    for (const u of updaters) u(dt, t);
    const moving = ix.flying || Math.abs(dist - lastDist) > 1e-3;
    lastDist = dist;
    env.update(controls.target, dist, dt, moving);
    env.composer.render(dt);
    ui.update(dt);
  });

  loader.done();
  ui.showIntro?.(6500);
}

boot().catch((err) => {
  console.error(err);
  const t = document.getElementById('loader-text');
  if (t) t.textContent = 'Something went wrong while building the silo — see the console.';
  document.getElementById('loader')?.classList.add('error');
});
