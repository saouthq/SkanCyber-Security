import type { GlyphId } from "~/content/services";

/**
 * Glyphes animés en grille de bits — le langage visuel du logo appliqué
 * à chaque service. États : 0 éteint · 1 allumé · 2 signal · 3 trame.
 */
export type Cell = 0 | 1 | 2 | 3;
export type Glyph = { frames: number; interval: number; cell: (f: number, x: number, y: number) => Cell };

export const GRID = 12;

const inRect = (x: number, y: number, x0: number, y0: number, x1: number, y1: number) => x >= x0 && x <= x1 && y >= y0 && y <= y1;
const onRectEdge = (x: number, y: number, x0: number, y0: number, x1: number, y1: number) =>
  inRect(x, y, x0, y0, x1, y1) && (x === x0 || x === x1 || y === y0 || y === y1);
const h = (a: number, b: number) => {
  const s = Math.sin(a * 91.7 + b * 47.3) * 43758.5453;
  return s - Math.floor(s);
};

// Chemin en serpentin pour l'automatisation
const PATH: [number, number][] = (() => {
  const p: [number, number][] = [];
  const rows = [1, 5, 9];
  rows.forEach((y, r) => {
    const xs = Array.from({ length: 10 }, (_, i) => i + 1);
    (r % 2 ? xs.reverse() : xs).forEach((x) => p.push([x, y]));
    if (r < rows.length - 1) {
      const x = r % 2 ? 1 : 10;
      for (let yy = y + 1; yy < rows[r + 1]; yy++) p.push([x, yy]);
    }
  });
  return p;
})();

export const glyphs: Record<GlyphId, Glyph> = {
  // Une onde part du cœur, rencontre l'intrusion et la contient au périmètre.
  cyber: {
    frames: 7,
    interval: 620,
    cell(f, x, y) {
      const k = Math.floor(Math.max(Math.abs(x - 5.5), Math.abs(y - 5.5)));
      const intruder: [number, number][] = [
        [11, 3],
        [10, 4],
        [9, 4],
        [8, 5],
      ];
      const pos = intruder[f];
      if (pos && pos[0] === x && pos[1] === y && f <= 3) return 2;
      if (f >= 4 && k === 3 && x >= 8 && y >= 3 && y <= 6) return 2;
      if (k === 0) return 1;
      if (k === Math.min(f, 5)) return 1;
      if (k === 5) return 3;
      return 0;
    },
  },
  // Des modules s'assemblent et se connectent ; le dernier est déployé.
  software: {
    frames: 7,
    interval: 700,
    cell(f, x, y) {
      const order = [4, 1, 3, 5, 7, 0, 8, 2, 6];
      const bx = Math.floor(x / 4);
      const by = Math.floor(y / 4);
      const lx = x % 4;
      const ly = y % 4;
      const id = by * 3 + bx;
      const rank = order.indexOf(id);
      const visible = rank < f + 3;
      if (lx < 3 && ly < 3) {
        if (!visible) return 0;
        if (f === 6 && rank === 8) return 2;
        return rank === f + 2 ? 3 : 1;
      }
      if (ly === 1 && lx === 3 && bx < 2) {
        const r2 = order.indexOf(id + 1);
        return visible && r2 < f + 3 ? 3 : 0;
      }
      if (lx === 1 && ly === 3 && by < 2) {
        const r2 = order.indexOf(id + 3);
        return visible && r2 < f + 3 ? 3 : 0;
      }
      return 0;
    },
  },
  // Une mise en page se construit bloc par bloc.
  web: {
    frames: 6,
    interval: 680,
    cell(f, x, y) {
      if (f >= 4 && x === 10 && y === 0) return 2;
      if (inRect(x, y, 0, 0, 11, 1)) return y === 0 && f >= 0 ? 1 : 3;
      if (f >= 1 && inRect(x, y, 0, 3, 2, 11)) return x === 0 || y === 3 ? 3 : 0;
      if (f >= 2 && inRect(x, y, 4, 3, 11, 6)) return 1;
      if (f >= 3 && y >= 8 && x >= 4 && (x - 4) % 3 !== 2) return y === 8 ? 1 : 3;
      return 0;
    },
  },
  // Le contenu défile dans un terminal mobile ; une notification clignote.
  mobile: {
    frames: 6,
    interval: 520,
    cell(f, x, y) {
      if (onRectEdge(x, y, 3, 0, 8, 11)) return 3;
      if (x === 7 && y === 1 && f % 2 === 0) return 2;
      if (inRect(x, y, 4, 2, 7, 10)) {
        const row = (y + f) % 4;
        if (row === 0) return 0;
        if (row === 1) return x < 7 ? 1 : 0;
        return x < 6 ? 3 : 0;
      }
      return 0;
    },
  },
  // Deux fenêtres alternent au premier plan ; un curseur les parcourt.
  desktop: {
    frames: 6,
    interval: 700,
    cell(f, x, y) {
      const front = f % 2 === 0 ? "a" : "b";
      const cursor: [number, number][] = [
        [6, 6],
        [7, 5],
        [9, 7],
        [8, 8],
        [5, 4],
        [3, 5],
      ];
      if (cursor[f][0] === x && cursor[f][1] === y) return 2;
      const inA = inRect(x, y, 0, 1, 7, 7);
      const inB = inRect(x, y, 4, 4, 11, 10);
      const draw = (x0: number, y0: number, x1: number, y1: number, bright: boolean): Cell => {
        if (y === y0) return bright ? 1 : 3;
        if (onRectEdge(x, y, x0, y0, x1, y1)) return bright ? 3 : 0;
        return 0;
      };
      if (front === "a" && inA) return draw(0, 1, 7, 7, true);
      if (front === "b" && inB) return draw(4, 4, 11, 10, true);
      if (inA) return draw(0, 1, 7, 7, false);
      if (inB) return draw(4, 4, 11, 10, false);
      return 0;
    },
  },
  // Des espaces clients isolés se répliquent ; chacun garde sa frontière.
  saas: {
    frames: 10,
    interval: 480,
    cell(f, x, y) {
      const bx = Math.floor(x / 4);
      const by = Math.floor(y / 4);
      const lx = x % 4;
      const ly = y % 4;
      const id = by * 3 + bx;
      if (lx === 3 || ly === 3) return 0;
      if (id > f) return lx === 1 && ly === 1 ? 3 : 0;
      if (id === 4) return lx === 1 && ly === 1 ? 2 : 1;
      return lx === 1 && ly === 1 ? 1 : 3;
    },
  },
  // Un paquet parcourt un pipeline en serpentin.
  automation: {
    frames: PATH.length,
    interval: 90,
    cell(f, x, y) {
      const idx = PATH.findIndex(([px, py]) => px === x && py === y);
      if (idx === -1) return 0;
      const d = (f - idx + PATH.length) % PATH.length;
      if (d === 0) return 2;
      if (d < 4) return 1;
      return 3;
    },
  },
  // Trois baies de serveurs ; les voyants changent, une alerte apparaît.
  infra: {
    frames: 8,
    interval: 560,
    cell(f, x, y) {
      const rack = [0, 4, 8].find((r) => x >= r && x <= r + 2);
      if (rack === undefined || y < 1 || y > 10) return 0;
      if (y === 1 || y === 10) return 3;
      const lx = x - rack;
      if (lx === 2) {
        if (rack === 4 && y === 6 && f % 4 < 2) return 2;
        return h(f, x * 16 + y) > 0.45 ? 1 : 0;
      }
      return y % 3 === 0 ? 0 : 3;
    },
  },
};
