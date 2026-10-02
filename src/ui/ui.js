import { Vector3 } from 'three';
import { PRESETS, floorY } from '../core/constants.js';
import { makeRng, hashStr } from '../core/rng.js';
import { PLACES, ZONE_TITLES, DYK } from '../data/places.js';
import { HINT, inMode } from './config.js';

// ---------------------------------------------------------------------------
// DOM overlay: brand, mode / view switches, places legend, leader lines,
// projected zone markers, hover chip, facts ticker, intro title, place card,
// toast and the perf readout. Pure presentation — interact.js drives it.
// ---------------------------------------------------------------------------

const SVGNS = 'http://www.w3.org/2000/svg';
const OVERVIEW_DIST = 650; // camera-to-target distance that counts as "whole silo"
const ZONE_ORDER = ['surface', 'top', 'mids', 'deep', 'below'];
const VIEW_KEYS = ['silo', 'surface', 'top', 'below'];
const DYK_HOLD = 9; // seconds a fact stays up
const DYK_FADE = 0.9; // matches the .dyk opacity transition
const DYK_WAIT = 1.2; // pause before the first fact after the intro / a card
const DYK_SWITCH_REST = 10; // extra quiet time after a silo switch (the toast and title speak first)

// Zone labels float just outside the east face of the shell (x = 78);
// `s17` replaces the title while Silo 17 is on.
const MARKERS = [
  { title: 'UP TOP', s17: 'UP TOP · DARK', sub: 'Levels 1–49', at: [97, -6, 0] },
  { title: 'THE MIDS', sub: 'Levels 50–119', at: [97, floorY(50) + 2, 0] },
  { title: 'DOWN DEEP', sub: 'Levels 120–144', at: [97, floorY(120) + 2, 0] },
  { title: 'BELOW', sub: 'Generator · the Digger', at: [97, -1104, 0] },
  { title: 'THE GREAT STAIR', sub: '288 turns · 432 bridges', at: [17, -224, 24], center: true },
];

const INTRO = {
  18: ['SILO 18', '144 levels · over a kilometre deep · one stair'],
  17: ['SILO 17', 'No power · lower levels flooded'],
};

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

/** A place's level as the terminal prints it: 001, 073, 145 (the surface keeps its arrow). */
const lvlText = (p) => {
  const b = p.badge ?? p.level;
  return typeof b === 'number' ? String(b).padStart(3, '0') : String(b);
};

function button(cls, text, attrs = {}) {
  const b = el('button', cls, text);
  b.type = 'button';
  for (const k in attrs) b.setAttribute(k, attrs[k]);
  return b;
}

export function createUI(app) {
  const places = app.places || PLACES;
  const n = places.length;
  const html = document.documentElement;
  const root = document.getElementById('ui');
  const svg = document.getElementById('leaders');
  root.textContent = '';
  svg.textContent = '';

  // Tiny event hub so interact.js can subscribe to UI actions.
  const handlers = {};
  const on = (type, fn) => {
    (handlers[type] ||= []).push(fn);
    return () => handlers[type].splice(handlers[type].indexOf(fn) >>> 0, 1);
  };
  const emit = (type, arg) => {
    const list = handlers[type];
    if (list) for (const fn of list) fn(arg);
  };

  // --- top left: brand, switches, legend ------------------------------------
  const topLeft = el('div', 'ui-top-left');
  const brand = el('div', 'brand');
  brand.append(el('div', 'brand-title', 'SILO'));

  const row = el('div', 'row');
  const modeSeg = el('div', 'seg');
  modeSeg.id = 'mode';
  modeSeg.setAttribute('role', 'group');
  modeSeg.setAttribute('aria-label', 'Silo');
  const modeBtns = {
    18: button(null, 'Silo 18', { title: 'Home', 'data-mode': '18' }),
    17: button(null, 'Silo 17', { title: 'No power, lower levels flooded', 'data-mode': '17' }),
  };
  modeSeg.append(modeBtns[18], modeBtns[17]);
  modeSeg.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-mode]');
    if (b) emit('mode', b.dataset.mode);
  });

  const viewSeg = el('div', 'seg');
  viewSeg.id = 'views';
  viewSeg.setAttribute('role', 'group');
  viewSeg.setAttribute('aria-label', 'Views');
  const viewBtns = {};
  for (const k of VIEW_KEYS) {
    viewBtns[k] = button(null, PRESETS[k].label, { 'data-view': k, 'aria-pressed': 'false' });
    viewSeg.append(viewBtns[k]);
  }
  viewSeg.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-view]');
    if (b) emit('view', b.dataset.view);
  });
  row.append(modeSeg, viewSeg);

  const legend = el('nav');
  legend.id = 'legend';
  legend.setAttribute('aria-label', 'Places');
  const itemEls = new Array(n).fill(null); // indexed like `places`
  const itemById = new Map();
  for (const zone of ZONE_ORDER) {
    const list = places.filter((p) => p.zone === zone);
    if (!list.length) continue;
    legend.append(el('div', 'legend-zone', ZONE_TITLES[zone] || zone));
    for (const p of list) {
      const b = button('legend-item', null, { 'data-id': p.id });
      b.append(el('span', 'lvl', lvlText(p)), el('span', 'name', p.name));
      b.addEventListener('pointerenter', () => emit('legend-hover', p.id));
      b.addEventListener('pointerleave', () => emit('legend-hover', null));
      b.addEventListener('focus', () => emit('legend-hover', p.id));
      b.addEventListener('blur', () => emit('legend-hover', null));
      if (p.only) b.hidden = !inMode(p, app.silo?.mode === '17' ? '17' : '18');
      legend.append(b);
      itemEls[places.indexOf(p)] = b;
      itemById.set(p.id, b);
    }
  }
  legend.addEventListener('click', (e) => {
    const b = e.target.closest('.legend-item');
    if (b) emit('legend', b.dataset.id);
  });
  // The places list is drawn as a green-phosphor terminal: a header with a
  // live clock, the list itself, a prompt that echoes whatever is under the
  // pointer, and the CRT glass (scanlines, grille, rolling refresh) on top.
  const term = el('div', 'crt');
  const termHead = el('div', 'crt-head');
  const termTitle = el('span', 'crt-title');
  const termClock = el('span', 'crt-clock');
  termClock.setAttribute('aria-hidden', 'true');
  termHead.append(termTitle, termClock);
  const termCols = el('div', 'crt-cols');
  termCols.setAttribute('aria-hidden', 'true');
  termCols.append(el('span', null, 'LVL'), el('span', null, 'LOCATION'));
  const termFoot = el('div', 'crt-foot');
  termFoot.setAttribute('aria-hidden', 'true');
  const termPrompt = el('span', 'crt-prompt');
  termFoot.append(termPrompt, el('span', 'crt-cursor'));
  const termFx = el('div', 'crt-fx');
  termFx.setAttribute('aria-hidden', 'true');
  termFx.append(el('div', 'crt-roll'));
  term.append(termHead, termCols, legend, termFoot, termFx);
  topLeft.append(brand, row, term);

  // --- top right: stats + hint ----------------------------------------------
  const topRight = el('div', 'ui-top-right');
  const stats = el('div', 'stats');
  stats.id = 'stats';
  const fpsEl = el('span', null, '-- fps');
  const trisEl = el('span', null, '0.00M tris');
  const sceneEl = el('span', null, '0.00M in scene');
  const callsEl = el('span', null, '0 calls');
  stats.append(fpsEl, trisEl, sceneEl, callsEl);
  topRight.append(stats, el('div', 'hint', HINT));
  if (new URLSearchParams(location.search).has('stats')) html.classList.add('stats');

  // --- zone markers -----------------------------------------------------------
  const zones = el('div');
  zones.id = 'zones';
  const markers = MARKERS.map((m) => {
    const e = el('div', m.center ? 'zone-marker center' : 'zone-marker');
    const b = el('b', null, m.title);
    e.append(b, el('i', null, m.sub));
    zones.append(e);
    return { el: e, b, def: m, x: m.at[0], y: m.at[1], z: m.at[2], sx: NaN, sy: NaN, vis: false, center: !!m.center };
  });

  // --- hover chip, facts, intro, card, toast -------------------------------------
  const chipEl = el('div', 'chip');
  chipEl.id = 'chip';
  chipEl.setAttribute('aria-hidden', 'true');
  const chipText = el('span');
  const chipSmall = el('small');
  chipEl.append(chipText, chipSmall);

  const dykEl = el('div', 'dyk');
  dykEl.id = 'dyk';
  dykEl.setAttribute('aria-live', 'polite');

  const introEl = el('div', 'intro');
  introEl.id = 'intro';
  const introA = el('div', 'intro-a');
  const introB = el('div', 'intro-b');
  introEl.append(introA, introB);

  const cardEl = el('aside', 'card');
  cardEl.id = 'card';
  cardEl.setAttribute('aria-labelledby', 'card-title');
  cardEl.setAttribute('aria-hidden', 'true');
  cardEl.inert = true;
  const cardClose = button('card-close', 'X', { 'aria-label': 'Close' });
  const cardLevel = el('div', 'card-level');
  const cardTitle = el('h2', 'card-title');
  cardTitle.id = 'card-title';
  const cardSub = el('div', 'card-sub');
  const cardBody = el('p', 'card-body');
  const cardFacts = el('ul', 'card-facts');
  const cardEps = el('div', 'card-eps');
  const cardNav = el('div', 'card-nav');
  const cardPrev = button(null, '< prev', { id: 'card-prev' });
  const cardIndex = el('span');
  cardIndex.id = 'card-index';
  const cardNext = button(null, 'next >', { id: 'card-next' });
  cardNav.append(cardPrev, cardIndex, cardNext);
  // Drawn as a terminal window like the places list: a title bar, the text
  // (which scrolls on its own, under fixed CRT glass), and a row of keys.
  const cardBar = el('div', 'card-bar');
  cardBar.append(cardLevel, cardClose);
  const cardScroll = el('div', 'card-scroll');
  cardScroll.append(cardTitle, cardSub, cardBody, cardFacts, cardEps);
  const cardFx = el('div', 'crt-fx');
  cardFx.setAttribute('aria-hidden', 'true');
  cardFx.append(el('div', 'crt-roll'));
  cardEl.append(cardBar, cardScroll, cardNav, cardFx);
  cardClose.addEventListener('click', () => emit('close'));
  cardPrev.addEventListener('click', () => emit('prev'));
  cardNext.addEventListener('click', () => emit('next'));

  const toastEl = el('div', 'toast');
  toastEl.id = 'toast';
  toastEl.setAttribute('role', 'status');
  toastEl.setAttribute('aria-live', 'polite');

  root.append(topLeft, topRight, zones, chipEl, dykEl, introEl, cardEl, toastEl);

  // --- leader lines ------------------------------------------------------------
  const leaders = places.map((p) => {
    const g = document.createElementNS(SVGNS, 'g');
    g.dataset.id = p.id;
    g.style.display = 'none';
    const path = document.createElementNS(SVGNS, 'path');
    path.setAttribute('class', 'leader');
    const dot = document.createElementNS(SVGNS, 'circle');
    dot.setAttribute('class', 'leader-dot');
    dot.setAttribute('r', '3.2');
    g.append(path, dot);
    svg.append(g);
    const a = p.anchor || [0, 0, 0];
    return { g, path, dot, ax: a[0], ay: a[1], az: a[2], shown: false, hot: false, sx: NaN, sy: NaN, dx: NaN, dy: NaN };
  });

  // --- state -------------------------------------------------------------------
  let W = innerWidth;
  let H = innerHeight;
  let cardOpen = false;
  let activeId = null;
  let hoverId = null;
  let mode = app.silo?.mode === '17' ? '17' : '18';

  // Legend geometry is cached and re-measured on scroll / resize / a slow timer.
  // Rows scrolled out of the panel keep their lines: they simply start
  // off-panel (and often off-screen), so every place stays tied to its room.
  const itemY = new Float32Array(n);
  const itemIn = new Uint8Array(n);
  let legendOk = false;
  let legendX = 0;
  let layoutDirty = true;
  let layoutAge = 0;

  const onResize = () => {
    W = innerWidth;
    H = innerHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', String(W));
    svg.setAttribute('height', String(H));
    layoutDirty = true;
  };
  addEventListener('resize', onResize);
  onResize();
  legend.addEventListener('scroll', () => (layoutDirty = true), { passive: true });
  document.fonts?.ready?.then(() => (layoutDirty = true));

  function measureLegend() {
    layoutDirty = false;
    layoutAge = 0;
    const r = legend.getBoundingClientRect();
    legendOk = r.width > 0 && r.height > 0;
    if (!legendOk) return;
    // lines leave from the terminal's outer edge
    legendX = term.getBoundingClientRect().right + 2;
    for (let i = 0; i < n; i++) {
      const it = itemEls[i];
      if (!it || it.hidden) {
        itemIn[i] = 0;
        continue;
      }
      const ir = it.getBoundingClientRect();
      itemY[i] = (ir.top + ir.bottom) * 0.5;
      itemIn[i] = ir.height > 0 ? 1 : 0;
    }
  }

  // Projection into CSS pixels. Returns 0 behind / clipped, 1 in front but
  // off-screen, 2 on-screen; the pixel position lands in `scr`.
  const _p = new Vector3();
  const scr = { x: 0, y: 0 };
  function project(x, y, z) {
    _p.set(x, y, z).project(app.camera);
    scr.x = Math.max(-1e4, Math.min(1e4, (_p.x * 0.5 + 0.5) * W));
    scr.y = Math.max(-1e4, Math.min(1e4, (0.5 - _p.y * 0.5) * H));
    if (!(_p.z > -1 && _p.z < 1)) return 0;
    return _p.x >= -1 && _p.x <= 1 && _p.y >= -1 && _p.y <= 1 ? 2 : 1;
  }

  function updateMarkers(overview) {
    for (let i = 0; i < markers.length; i++) {
      const m = markers[i];
      const vis = overview && project(m.x, m.y, m.z) === 2;
      if (vis) {
        const x = Math.round(scr.x);
        const y = Math.round(scr.y);
        if (x !== m.sx || y !== m.sy) {
          m.sx = x;
          m.sy = y;
          m.el.style.transform = m.center ? `translate(${x}px, ${y}px) translateX(-50%)` : `translate(${x}px, ${y}px)`;
        }
      }
      if (vis !== m.vis) {
        m.vis = vis;
        // Labels appear at once (no fade-in) and fade out when leaving the overview.
        m.el.classList.toggle('on', vis);
      }
    }
  }

  // Only the place under the pointer (or the open one) gets a line; the
  // overview stays clear.
  function updateLeaders(dt) {
    layoutAge += dt;
    if (layoutDirty || layoutAge > 1) measureLegend();
    for (let i = 0; i < n; i++) {
      const L = leaders[i];
      let show = false;
      let hot = false;
      if (legendOk && itemIn[i]) {
        const id = places[i].id;
        const code = project(L.ax, L.ay, L.az);
        if (id === hoverId) show = hot = code > 0;
        else if (cardOpen) show = hot = id === activeId && code > 0;
        if (show) {
          const sx = Math.round(legendX);
          const sy = Math.round(itemY[i]);
          const dx = Math.round(scr.x);
          const dy = Math.round(scr.y);
          if (sx !== L.sx || sy !== L.sy || dx !== L.dx || dy !== L.dy) {
            L.sx = sx;
            L.sy = sy;
            L.dx = dx;
            L.dy = dy;
            const ex = Math.round(sx + 0.75 * (dx - sx));
            L.path.setAttribute('d', `M${sx} ${sy}L${ex} ${sy}L${dx} ${dy}`);
            L.dot.setAttribute('cx', String(dx));
            L.dot.setAttribute('cy', String(dy));
          }
        }
      }
      if (show !== L.shown) {
        L.shown = show;
        L.g.style.display = show ? '' : 'none';
      }
      if (hot !== L.hot) {
        L.hot = hot;
        L.g.classList.toggle('hot', hot);
      }
    }
  }

  // --- stats readout (twice a second) -----------------------------------------
  let statFrames = 0;
  let statT0 = performance.now();
  function updateStats() {
    statFrames++;
    const now = performance.now();
    const span = now - statT0;
    if (span < 500) return;
    if (html.classList.contains('stats')) {
      const info = app.renderer.info.render;
      fpsEl.textContent = `${Math.round((statFrames * 1000) / span)} fps`;
      trisEl.textContent = `${(info.triangles / 1e6).toFixed(2)}M tris`;
      sceneEl.textContent = `${((app.sceneTriangles || 0) / 1e6).toFixed(2)}M in scene`;
      callsEl.textContent = `${info.calls} calls`;
    }
    statFrames = 0;
    statT0 = now;
  }
  const toggleStats = (force) => html.classList.toggle('stats', force);

  // --- did-you-know ticker ------------------------------------------------------
  const facts = DYK.slice();
  {
    const r = makeRng(hashStr('did-you-know'));
    for (let i = facts.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [facts[i], facts[j]] = [facts[j], facts[i]];
    }
  }
  let dykIdx = -1;
  let dykState = 'hidden'; // hidden → in → out → in …
  let dykT = 0;
  let dykRest = 0; // extra wait before the next fact (set by a silo switch)
  const dykNext = () => {
    if (!facts.length) return;
    dykIdx = (dykIdx + 1) % facts.length;
    dykEl.textContent = facts[dykIdx];
    dykEl.classList.add('show');
    dykState = 'in';
    dykT = 0;
  };
  function updateDyk(dt) {
    if (cardOpen || introOn) {
      if (dykState !== 'hidden') {
        dykEl.classList.remove('show');
        dykState = 'hidden';
      }
      dykT = 0;
      return;
    }
    dykT += dt;
    if (dykState === 'hidden') {
      if (dykT >= DYK_WAIT + dykRest) {
        dykRest = 0;
        dykNext();
      }
    } else if (dykState === 'in') {
      if (dykT >= DYK_HOLD) {
        dykEl.classList.remove('show');
        dykState = 'out';
        dykT = 0;
      }
    } else if (dykT >= DYK_FADE) dykNext();
  }

  // --- intro title ----------------------------------------------------------------
  let introOn = false;
  let introTimer = 0;
  let introAt = 0;
  const introText = () => {
    const [a, b] = INTRO[mode] || INTRO[18];
    introA.textContent = a;
    introB.textContent = b;
  };
  function showIntro(ms = 4000) {
    introText();
    clearTimeout(introTimer);
    void introEl.offsetWidth; // let the fade run even on a fresh element
    introEl.classList.add('show');
    introOn = true;
    introAt = performance.now();
    introTimer = setTimeout(hideIntro, ms);
  }
  function hideIntro() {
    clearTimeout(introTimer);
    if (!introOn) return;
    introOn = false;
    introEl.classList.remove('show');
  }
  // Any deliberate input dismisses the title (after a short grace period so
  // the click that summoned it does not also dismiss it).
  const dismissIntro = () => {
    if (introOn && performance.now() - introAt > 300) hideIntro();
  };
  for (const type of ['pointerdown', 'wheel', 'keydown']) addEventListener(type, dismissIntro, { capture: true, passive: true });

  // --- card ------------------------------------------------------------------------
  function showCard(place, index, total) {
    if (index == null || total == null) {
      const list = places.filter((q) => inMode(q, mode));
      index ??= list.indexOf(place);
      total ??= list.length;
    }
    const c = place.card || {};
    cardLevel.textContent = c.level ?? `LEVEL ${place.level} · ${ZONE_TITLES[place.zone] || ''}`.toUpperCase();
    cardTitle.textContent = c.title ?? place.name;
    cardSub.textContent = c.sub ?? '';
    cardSub.hidden = !c.sub;
    cardBody.textContent = c.body ?? '';
    cardBody.hidden = !c.body;
    cardFacts.replaceChildren(...(c.facts || []).map((f) => el('li', null, f)));
    cardFacts.hidden = !(c.facts && c.facts.length);
    cardEps.textContent = c.foot ?? '';
    cardEps.hidden = !c.foot;
    cardIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    cardScroll.scrollTop = 0;
    // each page prints out afresh
    cardEl.classList.remove('printing');
    void cardEl.offsetWidth;
    cardEl.classList.add('printing');
    cardEl.inert = false;
    cardEl.setAttribute('aria-hidden', 'false');
    cardEl.classList.add('show');
    cardOpen = true;
  }
  function hideCard() {
    if (cardEl.contains(document.activeElement)) document.activeElement.blur();
    cardEl.classList.remove('show');
    cardEl.setAttribute('aria-hidden', 'true');
    cardEl.inert = true;
    cardOpen = false;
  }

  // --- toast -------------------------------------------------------------------------
  let toastTimer = 0;
  function toast(msg, ms = 2600) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), ms);
  }

  // --- chip ----------------------------------------------------------------------------
  let chipOn = false;
  let chipStr = null;
  let chipSub = null;
  let chipW = 0;
  let chipH = 0;
  let chipX = NaN;
  let chipY = NaN;
  function chip(text, x, y, small = '') {
    if (text !== chipStr || small !== chipSub) {
      chipStr = text;
      chipSub = small;
      chipText.textContent = text;
      chipSmall.textContent = small;
      chipSmall.hidden = !small;
      chipW = chipEl.offsetWidth;
      chipH = chipEl.offsetHeight;
      chipX = NaN;
    }
    let px = x + 14;
    let py = y + 18;
    if (px + chipW > W - 8) px = x - chipW - 12;
    if (py + chipH > H - 8) py = y - chipH - 10;
    px = Math.round(Math.max(4, px));
    py = Math.round(Math.max(4, py));
    // Re-picks under a still pointer (damping, flights) land here every frame.
    if (px !== chipX || py !== chipY) {
      chipX = px;
      chipY = py;
      chipEl.style.transform = `translate(${px}px, ${py}px)`;
    }
    if (!chipOn) {
      chipOn = true;
      chipEl.classList.add('show');
    }
  }
  function hideChip() {
    if (!chipOn) return;
    chipOn = false;
    chipEl.classList.remove('show');
  }

  // --- selection state -----------------------------------------------------------------
  function revealInLegend(item) {
    const r = legend.getBoundingClientRect();
    if (!r.height) return;
    const ir = item.getBoundingClientRect();
    if (ir.top < r.top + 6) legend.scrollTop -= r.top + 6 - ir.top;
    else if (ir.bottom > r.bottom - 6) legend.scrollTop += ir.bottom - (r.bottom - 6);
  }
  function setActive(id) {
    if (id === activeId) return;
    const prev = itemById.get(activeId);
    if (prev) {
      prev.classList.remove('active');
      prev.removeAttribute('aria-current');
    }
    activeId = id ?? null;
    const cur = itemById.get(activeId);
    if (cur) {
      cur.classList.add('active');
      cur.setAttribute('aria-current', 'true');
      revealInLegend(cur);
    }
  }
  function setHover(id) {
    id = id ?? null;
    if (id === hoverId) return;
    itemById.get(hoverId)?.classList.remove('hover');
    hoverId = id;
    itemById.get(hoverId)?.classList.add('hover');
  }
  function setView(key) {
    for (const k of VIEW_KEYS) {
      const sel = k === key;
      viewBtns[k].classList.toggle('active', sel);
      viewBtns[k].setAttribute('aria-pressed', String(sel));
    }
  }
  function setMode(m) {
    const prevMode = mode;
    mode = m === '17' ? '17' : '18';
    // A real switch withdraws the current fact; the ticker comes back to the
    // new silo only after the toast and the title have had their moment.
    if (mode !== prevMode) {
      dykEl.classList.remove('show');
      dykState = 'hidden';
      dykT = 0;
      dykRest = DYK_SWITCH_REST;
    }
    for (const k of ['18', '17']) {
      modeBtns[k].classList.toggle('active', k === mode);
      modeBtns[k].setAttribute('aria-pressed', String(k === mode));
    }
    html.classList.toggle('silo17', mode === '17');
    termTitle.textContent = mode === '17' ? 'SILO-17 // AUX PWR' : 'SILO-18 // INDEX';
    for (const mk of markers) mk.b.textContent = (mode === '17' && mk.def.s17) || mk.def.title;
    places.forEach((p, i) => {
      if (p.only && itemEls[i]) itemEls[i].hidden = !inMode(p, mode);
    });
    if (activeId && !inMode(places.find((p) => p.id === activeId) || {}, mode)) setActive(null);
    if (hoverId && !inMode(places.find((p) => p.id === hoverId) || {}, mode)) setHover(null);
    layoutDirty = true;
    introText();
  }
  setMode(mode);

  // --- terminal: clock and prompt ----------------------------------------------------------
  const placeById = new Map(places.map((p) => [p.id, p]));
  let clockSec = -1;
  let promptTarget = '';
  let promptT = 0;
  function updateTerminal(dt) {
    const now = new Date();
    if (now.getSeconds() !== clockSec) {
      clockSec = now.getSeconds();
      termClock.textContent = now.toTimeString().slice(0, 8);
    }
    // The prompt types out what the pointer is on (or what is open).
    const p = placeById.get(hoverId) || placeById.get(activeId);
    const target = p ? `> ${p.id === activeId ? 'VIEW' : 'GOTO'} ${lvlText(p)} ${p.name}` : '> READY';
    if (target !== promptTarget) {
      promptTarget = target;
      promptT = 2;
    }
    if (promptT < promptTarget.length) {
      promptT = Math.min(promptTarget.length, promptT + dt * 55);
      termPrompt.textContent = promptTarget.slice(0, Math.floor(promptT));
    }
  }

  // --- per frame (after render) ----------------------------------------------------------
  function update(dt) {
    const dist = app.camera.position.distanceTo(app.controls.target);
    const overview = dist > OVERVIEW_DIST && !cardOpen;
    updateMarkers(overview);
    updateLeaders(dt);
    updateStats();
    updateDyk(dt);
    updateTerminal(dt);
  }

  showIntro(6500);

  return {
    update,
    showCard,
    hideCard,
    setActive,
    setHover,
    setView,
    setMode,
    toast,
    chip,
    hideChip,
    showIntro,
    hideIntro,
    toggleStats,
    on,
    onLegend: (fn) => on('legend', fn),
    legendEl: legend,
    cardEl,
    get cardOpen() {
      return cardOpen;
    },
    get mode() {
      return mode;
    },
  };
}
