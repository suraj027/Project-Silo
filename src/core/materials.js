import * as THREE from 'three';
import * as T from './textures.js';

// Shared textures & materials. Geometry carries its colour in vertex colours
// (or instance colours) so a handful of materials cover the whole silo.

export const TEX = {};
export const MATS = {};

export function buildMaterials() {
  TEX.concrete = T.toTexture(T.concreteCanvas(256, { base: [172, 166, 154], blotch: 18, speck: 12, seed: 1 }));
  TEX.wall = T.toTexture(T.concreteCanvas(512, { base: [196, 190, 178], seed: 2, lines: 5, blotch: 20 }));
  // the cut faces read as smooth painted grey, without pores or speckle
  TEX.section = T.toTexture(T.concreteCanvas(256, { base: [216, 210, 197], blotch: 7, speck: 4, pores: 0.0006, seed: 3 }));
  TEX.floor = T.toTexture(T.floorTiles(1024));
  TEX.floorN = T.toTexture(T.floorTilesNormal(512), { srgb: false });
  TEX.earth = T.toTexture(T.earthCanvas(256, 1024));
  TEX.terrain = T.toTexture(T.veinCanvas(512));
  TEX.waterN = T.toTexture(T.waterNormalCanvas(256), { srgb: false });
  TEX.soft = T.toTexture(T.softSpriteCanvas(64), { repeat: false });
  TEX.steam = T.toTexture(T.softSpriteCanvas(128, { noisy: true }), { repeat: false });
  TEX.chain = T.toTexture(T.chainLinkCanvas(256));
  TEX.column = T.toTexture(T.concreteCanvas(256, { base: [200, 195, 184], seed: 11, lines: 2 }));
  TEX.column.repeat.set(6, 684);

  const std = (o) => new THREE.MeshStandardMaterial({ vertexColors: true, ...o });

  MATS.matte = std({ name: 'matte', roughness: 0.88, metalness: 0 });
  MATS.metal = std({ name: 'metal', roughness: 0.42, metalness: 0.72 });
  MATS.wood = std({ name: 'wood', roughness: 0.5, metalness: 0.02 });
  MATS.fabric = std({ name: 'fabric', roughness: 0.95, metalness: 0 });
  MATS.foliage = std({ name: 'foliage', roughness: 0.92, metalness: 0 });
  MATS.rock = std({ name: 'rock', roughness: 0.97, metalness: 0, flatShading: true });
  MATS.concrete = std({ name: 'shaftConcrete', map: TEX.concrete, roughness: 0.88 });
  MATS.column = std({ name: 'shaftColumn', map: TEX.column, roughness: 0.9, vertexColors: false, color: 0xbcbdb2 });
  MATS.trim = std({ name: 'shaftTrim', roughness: 0.72, metalness: 0.05 });
  MATS.glass = new THREE.MeshPhysicalMaterial({
    name: 'glass',
    vertexColors: true,
    roughness: 0.06,
    metalness: 0,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  // Unlit, HDR vertex colours: anything above ~3 feeds the bloom.
  MATS.glow = new THREE.MeshBasicMaterial({ name: 'glow', vertexColors: true });
  MATS.water = std({
    name: 'water',
    roughness: 0.14,
    metalness: 0.05,
    transparent: true,
    opacity: 0.82,
    normalMap: TEX.waterN,
    normalScale: new THREE.Vector2(0.6, 0.6),
    depthWrite: false,
  });
  MATS.sheen = new THREE.MeshPhysicalMaterial({
    name: 'sheen',
    color: 0x2a3a38,
    roughness: 0.12,
    metalness: 0,
    transparent: true,
    opacity: 0.5,
    normalMap: TEX.waterN,
    depthWrite: false,
  });
  TEX.waterN.repeat.set(3, 3);
  return { TEX, MATS };
}

/** Sign material: lit like paint but lifted a little so it reads in the dark. */
export function signMaterial(tex, emissive = 0.55) {
  return new THREE.MeshStandardMaterial({
    map: tex,
    emissiveMap: tex,
    emissive: 0xffffff,
    emissiveIntensity: emissive,
    roughness: 0.6,
    metalness: 0,
    transparent: true,
    alphaTest: 0.02,
  });
}

/** Screen material: dark glass showing an emissive picture. */
export function screenMaterial(tex, intensity = 1.5, base = 0x101010) {
  return new THREE.MeshStandardMaterial({
    color: base,
    map: tex,
    emissiveMap: tex,
    emissive: 0xffffff,
    emissiveIntensity: intensity,
    roughness: 0.85,
    metalness: 0,
  });
}
