import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { MATS } from './materials.js';

// ---------------------------------------------------------------------------
// Lighting, sky, fog and post-processing.
// ---------------------------------------------------------------------------

export const SETTINGS = {
  hemiSky: '#cdbfa8',
  hemiGround: '#2a231c',
  hemiI: 0.55,
  keyI: 1.7,
  keyColor: '#fff0da',
  fillI: 0.35,
  fillColor: '#9fb3c8',
  fog: '#9c9a90',
  fogDensity: 0.00022,
  bloom: 0.42,
  bloomR: 0.38,
  bloomT: 3,
  grade: 0.55,
  envI: 0.35,
};

// The sun sits high over the viewer's right shoulder and follows the orbit
// target so its shadow frustum stays tight around whatever is being looked at.
const KEY_OFFSET = new THREE.Vector3(354, 670, 931);
const FILL_OFFSET = new THREE.Vector3(-708.9, 253.2, 658.3);

const GradeShader = {
  name: 'SiloGrade',
  uniforms: { tDiffuse: { value: null }, uAmount: { value: SETTINGS.grade } },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uAmount;
    varying vec2 vUv;
    void main() {
      vec4 src = texture2D(tDiffuse, vUv);
      vec3 c = src.rgb;
      // soft contrast curve
      vec3 curved = c * c * (3.0 - 2.0 * c);
      c = mix(c, curved, 0.28 * uAmount);
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      // cool, slightly green shadows; warm highlights
      float sh = 1.0 - smoothstep(0.0, 0.45, l);
      float hi = smoothstep(0.55, 1.0, l);
      c *= mix(vec3(1.0), vec3(0.9, 1.0, 0.98), sh * 0.5 * uAmount);
      c *= mix(vec3(1.0), vec3(1.05, 1.0, 0.95), hi * 0.5 * uAmount);
      // vignette, a touch low of centre
      float d = distance(vUv, vec2(0.5, 0.48));
      c *= 1.0 - smoothstep(0.45, 0.95, d) * 0.32 * uAmount;
      gl_FragColor = vec4(c, src.a);
    }
  `,
};

function makeSky() {
  const mat = new THREE.ShaderMaterial({
    name: 'sky',
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uTop: { value: new THREE.Color('#b9b8b1') },
      uHorizon: { value: new THREE.Color('#e9e6dc') },
      uDeep: { value: new THREE.Color('#3b3631') },
      // the void below the horizon lightens toward the north-east
      uLobe: { value: new THREE.Color('#54524d') },
      uLobeDir: { value: new THREE.Vector2(Math.sin(0.35), -Math.cos(0.35)) },
      uLift: { value: 1 },
      // wind-borne dust (the sandstorm sets both)
      uDust: { value: new THREE.Color().setRGB(0.5, 0.36, 0.21) },
      uStorm: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        // view direction from the camera, so the horizon stays level with the
        // eye even a kilometre down the shaft
        vDir = normalize((modelMatrix * vec4(position, 1.0)).xyz - cameraPosition);
        vec4 p = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * p;
        gl_Position.z = gl_Position.w; // pin to the far plane
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uTop, uHorizon, uDeep, uLobe, uDust;
      uniform vec2 uLobeDir;
      uniform float uLift, uStorm;
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 c = mix(uHorizon, uTop, pow(smoothstep(0.0, 0.65, h), 0.8));
        // dust in the air: a warm cast overhead, thickening to the horizon
        c = mix(c, uDust, uStorm * (0.45 + 0.45 * (1.0 - smoothstep(-0.02, 0.5, h))));
        // Below the horizon the void under the crust is near black, except
        // for a broad, dim glow a little east of north that fades out ~35°
        // down and ~55° round from its centre.
        vec2 d2 = normalize(vDir.xz + vec2(1e-5));
        float off = acos(clamp(dot(d2, uLobeDir), -1.0, 1.0));
        float g = 1.0 - smoothstep(0.21, 0.96, off);
        float el = asin(clamp(h, -1.0, 1.0));
        float a = smoothstep(-0.59, -0.07, el);
        float k = clamp(-cameraPosition.y / 800.0, 0.0, 1.0);
        vec3 below = uDeep + uLobe * g * a * mix(1.0, 0.6, k);
        // a crisp horizon from above ground; from far down the shaft it
        // softens and rides a little above eye level
        c = mix(c, below, smoothstep(mix(0.004, 0.06, k), mix(-0.03, -0.003, k), h));
        gl_FragColor = vec4(c * uLift, 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(9000, 48, 24), mat);
  sky.name = 'sky';
  sky.frustumCulled = false;
  sky.renderOrder = -10;
  return sky;
}

/**
 * A small pool of point lights that hop to the lamps nearest the orbit target.
 * Rooms register "light spots"; only the closest few are ever lit for real.
 */
class LightPool {
  constructor(scene, count = 6) {
    this.spots = [];
    this.lights = [];
    this.scale = 1;
    for (let i = 0; i < count; i++) {
      const l = new THREE.PointLight(0xffd9a8, 0, 0, 2);
      l.name = `pool-${i}`;
      l.userData = { want: 0, spot: null };
      scene.add(l);
      this.lights.push(l);
    }
    this._last = new THREE.Vector3(1e9, 0, 0);
    this._t = 0;
  }

  add(x, y, z, color = 0xffd9a8, intensity = 24, group = null) {
    this.spots.push({ p: new THREE.Vector3(x, y, z), color: new THREE.Color(color), intensity, group });
  }

  update(target, dt) {
    this._t += dt;
    if (this._t > 0.25 || this._last.distanceToSquared(target) > 4) {
      this._t = 0;
      this._last.copy(target);
      const near = [];
      for (const s of this.spots) {
        if (s.group && !s.group.visible) continue;
        const d = s.p.distanceToSquared(target);
        if (d < 110 * 110) near.push([d, s]);
      }
      near.sort((a, b) => a[0] - b[0]);
      const chosen = near.slice(0, this.lights.length).map((x) => x[1]);
      // keep lights that are already on a chosen spot, reassign the rest
      const free = [];
      for (const l of this.lights) {
        const idx = chosen.indexOf(l.userData.spot);
        if (idx >= 0) chosen[idx] = null;
        else free.push(l);
      }
      for (const s of chosen) {
        if (!s) continue;
        const l = free.shift();
        if (!l) break;
        l.userData.spot = s;
        l.position.copy(s.p);
        l.color.copy(s.color);
        l.intensity = 0;
      }
      for (const l of free) l.userData.spot = null;
    }
    const k = Math.min(1, dt * 4);
    for (const l of this.lights) {
      const want = l.userData.spot ? l.userData.spot.intensity * this.scale : 0;
      l.intensity += (want - l.intensity) * k;
    }
  }
}

export function createEnv({ renderer, scene, camera, perf }) {
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = perf.shadows;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;

  scene.fog = new THREE.FogExp2(SETTINGS.fog, SETTINGS.fogDensity);

  const hemi = new THREE.HemisphereLight(SETTINGS.hemiSky, SETTINGS.hemiGround, SETTINGS.hemiI);
  hemi.position.set(0, 1, 0);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(SETTINGS.keyColor, SETTINGS.keyI);
  key.castShadow = perf.shadows;
  key.shadow.mapSize.setScalar(perf.shadowMapSize);
  key.shadow.camera.near = 20;
  key.shadow.camera.far = 2600;
  key.shadow.bias = -0.00025;
  key.shadow.normalBias = 0.035;
  key.shadow.radius = 2;
  scene.add(key, key.target);

  const fill = new THREE.DirectionalLight(SETTINGS.fillColor, SETTINGS.fillI);
  fill.target.position.set(0, -560, 0);
  fill.position.copy(fill.target.position).add(FILL_OFFSET);
  scene.add(fill, fill.target);

  const sky = makeSky();
  scene.add(sky);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, 0.04).texture;
  scene.environmentIntensity = SETTINGS.envI;
  room.dispose?.();

  const pool = new LightPool(scene, 6);

  // Post-processing -----------------------------------------------------------
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  const rt = new THREE.WebGLRenderTarget(size.x, size.y, {
    type: THREE.HalfFloatType,
    samples: perf.msaa,
  });
  const composer = new EffectComposer(renderer, rt);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(size.x / 2, size.y / 2), SETTINGS.bloom, SETTINGS.bloomR, SETTINGS.bloomT);
  bloom.enabled = perf.bloom;
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  const grade = new ShaderPass(GradeShader);
  composer.addPass(grade);

  const env = {
    hemi,
    key,
    fill,
    sky,
    pool,
    composer,
    bloom,
    grade,
    settings: SETTINGS,
    glowScale: 1,
    _shadowFrame: 0,
    _lastTarget: new THREE.Vector3(1e9, 0, 0),
    setGlow(k) {
      env.glowScale = k;
      MATS.glow.color.setScalar(k);
    },
    resize(w, h, dpr) {
      composer.setPixelRatio(dpr);
      composer.setSize(w, h);
      bloom.resolution.set((w * dpr) / 2, (h * dpr) / 2);
    },
    /** Called every frame with the orbit target and camera distance. */
    update(target, dist, dt, moving) {
      key.target.position.copy(target);
      key.position.copy(target).add(KEY_OFFSET);
      const half = THREE.MathUtils.clamp(dist * 1.1, 24, 800);
      const cam = key.shadow.camera;
      if (Math.abs(cam.right - half) > half * 0.02) {
        cam.left = -half;
        cam.right = half;
        cam.top = half;
        cam.bottom = -half;
        cam.updateProjectionMatrix();
        renderer.shadowMap.needsUpdate = true;
      }
      if (env._lastTarget.distanceToSquared(target) > 1e-4 || moving) {
        env._lastTarget.copy(target);
        renderer.shadowMap.needsUpdate = true;
      }
      // refresh occasionally for the few moving props
      if (++env._shadowFrame % 8 === 0) renderer.shadowMap.needsUpdate = true;
      pool.update(target, dt);
    },
  };
  return env;
}
