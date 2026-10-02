import * as THREE from 'three';
import * as C from '../core/constants.js';

// ---------------------------------------------------------------------------
// The Gap's rope-and-pulley chair. The scaffold head and its wheel are static
// (buildGap in shaft.js); here the rope pays out and hauls in on a slow cycle,
// the wheel and the winch turn with it and the chair sways a little beneath.
// ---------------------------------------------------------------------------

const WHEEL = new THREE.Vector3(4.6, C.floorY(C.GAP_LEVEL - 1) + 0.9, 4.6);
const WHEEL_R = 0.32;
// the chair hangs a touch outboard of the wheel so it clears the scaffold rails
const OUTBOARD = 0.38;
const DRUM_R = 0.13;
// mean rope paid out below the wheel; the chair hangs just under the Gap's
// upper edge and dips about a level's height on each cycle
const ROPE_L = 5.4;
// top deck of the scaffold (see buildGap): planks at yBottom + 3.85 + 2 * 4.1
const DECK_Y = C.floorY(C.GAP_LEVEL + 1) + 3.85 + 2 * 4.1 + 0.035;

const UP = new THREE.Vector3(0, 1, 0);
const DOWN = new THREE.Vector3(0, -1, 0);
const _d = new THREE.Vector3();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();

/** Stretch a unit-height, y-aligned mesh between two points (no allocations). */
function stretch(mesh, a, b) {
  _d.subVectors(b, a);
  const len = _d.length();
  mesh.position.addVectors(a, b).multiplyScalar(0.5);
  if (len > 1e-6) mesh.quaternion.setFromUnitVectors(UP, _d.divideScalar(len));
  mesh.scale.set(1, len, 1);
  return mesh;
}

export function buildShaftDynamic() {
  const group = new THREE.Group();
  group.name = 'shaft-dynamic';

  const steel = new THREE.MeshStandardMaterial({ name: 'pulleySteel', color: '#2b2d2e', roughness: 0.5, metalness: 0.65 });
  const wood = new THREE.MeshStandardMaterial({ name: 'pulleyWood', color: '#8e5f35', roughness: 0.7, metalness: 0 });
  const cord = new THREE.MeshStandardMaterial({ name: 'pulleyCord', color: '#2f2a24', roughness: 0.92, metalness: 0 });

  const mesh = (geo, mat, parent = group) => {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };

  // main rope: wheel rim down to the chair's hook ------------------------------
  const rope = mesh(new THREE.CylinderGeometry(0.022, 0.022, 1, 6, 1, true), cord);
  rope.name = 'pulleyRope';

  // rope lying in the wheel's groove, and the hauling end down to a winch
  const groove = mesh(new THREE.TorusGeometry(WHEEL_R + 0.012, 0.022, 5, 14, Math.PI), cord);
  groove.position.copy(WHEEL);
  groove.name = 'pulleyGroove';
  const drumPos = new THREE.Vector3(3.95, DECK_Y + 0.36, 4.2);
  const haul = mesh(new THREE.CylinderGeometry(0.02, 0.02, 1, 6, 1, true), cord);
  haul.name = 'pulleyHaul';
  stretch(haul, _a.set(WHEEL.x - WHEEL_R - 0.012, WHEEL.y, WHEEL.z), _b.set(drumPos.x, drumPos.y + DRUM_R, drumPos.z));

  // spokes and hub that turn inside the static wheel rim
  const spokes = new THREE.Group();
  spokes.name = 'pulleySpokes';
  spokes.position.copy(WHEEL);
  group.add(spokes);
  const hub = mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.1, 10), steel, spokes);
  hub.rotation.x = Math.PI / 2;
  const spokeGeo = new THREE.BoxGeometry(WHEEL_R * 2 - 0.04, 0.024, 0.02);
  for (let i = 0; i < 3; i++) mesh(spokeGeo, steel, spokes).rotation.z = (i * Math.PI) / 3;

  // hand winch on the top deck of the scaffold
  const winch = new THREE.Group();
  winch.name = 'pulleyWinch';
  group.add(winch);
  for (const s of [-1, 1]) {
    const plate = mesh(new THREE.BoxGeometry(0.05, 0.5, 0.42), steel, winch);
    plate.position.set(drumPos.x + s * 0.23, DECK_Y + 0.25, drumPos.z);
  }
  const drum = new THREE.Group();
  drum.position.copy(drumPos);
  winch.add(drum);
  mesh(new THREE.CylinderGeometry(DRUM_R, DRUM_R, 0.4, 14), wood, drum).rotation.z = Math.PI / 2;
  const crankArm = mesh(new THREE.BoxGeometry(0.03, 0.26, 0.04), steel, drum);
  crankArm.position.set(0.27, 0.11, 0);
  const crankGrip = mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.14, 6), wood, drum);
  crankGrip.rotation.z = Math.PI / 2;
  crankGrip.position.set(0.33, 0.22, 0);

  // the chair: origin at the hook, hanging down -y, facing +z ------------------
  const chair = new THREE.Group();
  chair.name = 'pulleyChair';
  group.add(chair);
  const hook = mesh(new THREE.TorusGeometry(0.055, 0.012, 6, 14), steel, chair);
  hook.position.y = -0.05;
  const shackle = mesh(new THREE.BoxGeometry(0.1, 0.04, 0.04), steel, chair);
  shackle.position.y = -0.11;
  const suspGeo = new THREE.CylinderGeometry(0.011, 0.011, 1, 5, 1, true);
  const barGeo = new THREE.CylinderGeometry(0.014, 0.014, 1, 6);
  const bar = (geo, mat, a, b) => stretch(mesh(geo, mat, chair), _a.set(...a), _b.set(...b));
  for (const s of [-1, 1]) {
    const x = s * 0.28;
    bar(suspGeo, cord, [0, -0.12, 0], [x, -0.62, 0]);
    bar(barGeo, steel, [x, -0.62, 0], [x, -1.1, 0.02]); // upright
    bar(barGeo, steel, [x, -1.1, -0.26], [x, -1.1, 0.26]); // seat rail
    bar(barGeo, steel, [x, -1.1, -0.26], [x, -0.64, -0.32]); // back rail
    bar(barGeo, steel, [x, -0.86, -0.29], [x, -0.86, 0.02]); // arm
    bar(barGeo, steel, [x, -1.1, 0.26], [s * 0.25, -1.42, 0.3]); // footrest hanger
  }
  bar(barGeo, steel, [-0.26, -1.42, 0.3], [0.26, -1.42, 0.3]);
  const seat = mesh(new THREE.BoxGeometry(0.6, 0.045, 0.52), wood, chair);
  seat.position.set(0, -1.075, 0);
  const back = mesh(new THREE.BoxGeometry(0.6, 0.36, 0.035), wood, chair);
  back.position.set(0, -0.86, -0.29);
  back.rotation.x = -0.14;

  // animation --------------------------------------------------------------------
  const top = new THREE.Vector3(WHEEL.x + WHEEL_R, WHEEL.y, WHEEL.z);
  const hookP = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const twist = new THREE.Quaternion();
  let phase = 0;

  const update = (dt, t) => {
    const L = ROPE_L + 1.6 * Math.sin(0.22 * t);
    // pendulum rate follows the current rope length
    phase += Math.min(dt, 0.1) * Math.sqrt(9.81 / L);
    const th = 0.05 * Math.sin(phase);
    const lean = Math.atan2(OUTBOARD, L);
    const sl = Math.sin(lean), cl = Math.cos(lean);
    hookP.set(top.x + L * sl, top.y - L * cl * Math.cos(th), top.z + L * cl * Math.sin(th));
    stretch(rope, top, hookP);
    chair.position.copy(hookP);
    dir.subVectors(hookP, top).normalize();
    chair.quaternion.setFromUnitVectors(DOWN, dir).multiply(twist.setFromAxisAngle(UP, 0.09 * Math.sin(t * 0.31)));
    spokes.rotation.z = -L / WHEEL_R;
    drum.rotation.x = -(L - ROPE_L) / DRUM_R;
  };
  update(0, 0);

  return { group, update };
}
