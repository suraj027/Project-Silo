// Interface copy, plus the places that only exist in one of the two silos.

import { floorY } from '../core/constants.js';

export const HINT = 'Drag to orbit · Scroll to zoom · Right-drag to pan · ← → next place · Esc whole silo';

/**
 * Places shown only in one silo (`only: '17' | '18'`). `after` is the id of
 * the place they follow in the legend and the ← → tour.
 */
export const EXTRA_PLACES = [
  {
    id: 'camp',
    name: 'Survivors’ camp',
    zone: 'top',
    level: 18,
    side: 'west',
    span: 45,
    kind: 'room',
    only: '17',
    after: 'watcher',
    anchor: [-47, floorY(18) + 3.85, 0],
    cam: { position: [-36, floorY(18) + 4.9, 30], target: [-46, floorY(18) + 2.6, -13] },
    card: {
      title: 'Survivors’ camp',
      sub: 'Level 18, Silo 17 — a camp pitched in the dark',
      body:
        'With the lights gone, the last of Silo 17 moved out of the apartments and into the corridor in front of them. Tarps hang from roped posts, bedrolls line the floor underneath, and a floodlight on a tripod runs off a small generator. Crates, cartons and barrels are stacked along the back wall.',
      facts: [
        'Canopies and tents fill five bays between the apartment walls.',
        'Children’s drawings are pinned up beside a barrel stove.',
        'Lanterns hang from the ropes; the floodlight is the only strong light on the level.',
        'Old tyres and buckets of sand hold the posts upright.',
      ],
      foot: 'Silo 17 only · Props: tarps · bedrolls · floodlight · stove · stores',
    },
  },
];

/** Is this place part of the given silo? */
export const inMode = (p, mode) => !p.only || p.only === String(mode);

/** The base place list with the per-silo extras spliced in after their anchors. */
export function withExtraPlaces(places, extras = EXTRA_PLACES) {
  const out = places.slice();
  for (const x of extras) {
    const i = out.findIndex((p) => p.id === x.after);
    out.splice(i < 0 ? out.length : i + 1, 0, x);
  }
  return out;
}
