// World dimensions. One unit ≈ one metre. The silo is cut open along the
// z = 0 plane; everything interesting lives at z <= 0 and the camera looks in
// from +z.

export const LEVELS = 144;
export const LEVEL_H = 7.6; // floor-to-floor
export const SLAB_T = 0.6; // slab thickness
export const ROOM_H = LEVEL_H - SLAB_T; // 7.0 clear height
export const DEPTH = LEVELS * LEVEL_H; // 1094.4

export const R_OUT = 78; // outer face of the shell
export const R_IN = 75; // inner face of the shell
export const R_SLAB = 75.05;
export const R_HOLE = 19.2; // slab opening around the stairwell
export const R_GAL_IN = 15; // landing ring
export const R_GAL_OUT = 19;
export const R_PILLAR = 16.5;
export const R_COL = 1.5; // central column
export const R_HELIX = 5.9; // outer edge of the stair treads

export const BASE_Y = -1125; // floor of the mechanical hall under level 144
export const CAP_Y = -1134; // underside of the foundation cap
export const CAVE_Y = -1181; // floor of the digger cavern

export const CELL_X0 = 25; // first partition of the apartment band
export const CELL_X1 = 75;
export const CELL_W = (CELL_X1 - CELL_X0) / 6;
export const CELL_D = 12.85; // depth of a generic apartment cell

export const GAP_LEVEL = 91;
export const STAIR_TURNS_PER_LEVEL = 2;
export const STEPS_PER_TURN = 22;

/** y of the finished floor of level n (level 0 = roof slab / surface). */
export const floorY = (n) => -n * LEVEL_H;

export const zoneOf = (n) => (n <= 49 ? 'top' : n <= 119 ? 'mids' : n <= 144 ? 'deep' : 'below');

export const ZONES = {
  top: { label: 'Up Top', from: 1, to: 49 },
  mids: { label: 'The Mids', from: 50, to: 119 },
  deep: { label: 'Down Deep', from: 120, to: 144 },
  below: { label: 'Below', from: 145, to: 147 },
};

export const PRESETS = {
  silo: { label: 'Whole silo', position: [430, 40, 1320], target: [0, -560, 0] },
  surface: { label: 'Surface', position: [-180, 70, 260], target: [0, 6, -40] },
  top: { label: 'Up Top', position: [150, 60, 330], target: [0, -90, 0] },
  below: { label: 'Mechanical & below', position: [150, -1024, 360], target: [0, -1139.4, 0] },
};

// Silo 17 sits north-west of its neighbour.
export const SILO17_POS = [-300, -300];
