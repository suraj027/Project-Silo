# Project Silo

An interactive 3D cutaway of an underground silo — 144 levels, a great spiral
stair, and the rooms that keep it running — built with Three.js and Vite.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (e.g. http://localhost:5173). `npm run build`
produces a static site in `dist/`.

## Controls

- Drag to orbit, scroll to zoom, right-drag to pan
- Click a room (or a name in the list) to fly to it; ← / → step through places
- `Esc` returns to the whole silo, `` ` `` toggles the stats overlay (or add `?stats`)
- Switch between **Silo 18** and the dark, flooded **Silo 17** at the top left

## Layout

| Path | What it builds |
| --- | --- |
| `src/core/` | constants, seeded noise, geometry batching, canvas textures, materials, lighting & post-processing, camera tweens |
| `src/world/surface.js` | terrain, the earth cut, hoods, the hill and dead tree, skyline, dust |
| `src/world/shell.js` | outer wall, 145 slabs, level numerals, slab light strips, every generic level |
| `src/world/shaft.js` | central column, helix stair, landing rings, bridges, the Gap |
| `src/rooms/` | the named rooms (Up Top, the Mids, Down Deep and below) |
| `src/world/silo17.js` | overlays for the Silo 17 mode |
| `src/ui/`, `src/interact.js` | interface, labels, cards, picking and camera flights |
| `src/data/places.js` | the 22 places, camera framings and card copy |

Everything — geometry, textures and signage — is generated procedurally at
start-up; there are no model or image assets.
# Project-Silo
