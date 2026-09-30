/**
 * Motifs des couches — chaque couche a une texture qui évoque son rôle :
 *  0 Interface  : fenêtres et panneaux (contours + en-têtes)
 *  1 Logique    : modules reliés par des connecteurs
 *  2 Flux       : voies de circulation horizontales et verticales
 *  3 Fondations : baies régulières et denses
 * Retourne 0 (éteint), 1 (allumé) ou 2 (bit actif, couleur signal).
 */
export function hash(a: number, b: number, c = 0) {
  const s = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

type Rect = [number, number, number, number]; // u0, v0, u1, v1

const WINDOWS: Rect[] = [
  [0.06, 0.06, 0.46, 0.38],
  [0.54, 0.06, 0.94, 0.24],
  [0.54, 0.3, 0.94, 0.6],
  [0.06, 0.46, 0.46, 0.94],
  [0.54, 0.68, 0.94, 0.94],
];

export function layerPattern(layer: number, i: number, j: number, cols: number, rows: number): 0 | 1 | 2 {
  const u = (i + 0.5) / cols;
  const v = (j + 0.5) / rows;
  const cu = 1 / cols;
  const cv = 1 / rows;

  switch (layer) {
    case 0: {
      if (i === cols - 3 && j === 2) return 2;
      for (const [u0, v0, u1, v1] of WINDOWS) {
        if (u < u0 || u > u1 || v < v0 || v > v1) continue;
        const edge = u - u0 < cu || u1 - u < cu || v - v0 < cv || v1 - v < cv;
        const header = v - v0 < cv * 2.2;
        if (edge || header) return 1;
        return hash(i, j, 1) > 0.9 ? 1 : 0;
      }
      return 0;
    }
    case 1: {
      if (i === 4 && j === rows - 6) return 2;
      const step = 6;
      const bi = i % step;
      const bj = j % step;
      const block = [Math.floor(i / step), Math.floor(j / step)] as const;
      const alive = hash(block[0], block[1], 2) > 0.22;
      if (alive && bi < 3 && bj < 3) return 1;
      if (bj === 1 && bi >= 3 && hash(block[0], block[1], 3) > 0.45) return 1;
      if (bi === 1 && bj >= 3 && hash(block[0], block[1], 4) > 0.55) return 1;
      return 0;
    }
    case 2: {
      if (i === Math.floor(cols * 0.62) && j === 12) return 2;
      if (j % 6 === 2 && (i + j) % 5 !== 0) return 1;
      if (i % 8 === 5 && j % 2 === 0) return 1;
      return 0;
    }
    default: {
      if (i === 2 && j === 3) return 2;
      const inRack = i % 4 !== 3 && j % 10 < 8;
      return inRack && hash(i, j, 5) > 0.18 ? 1 : 0;
    }
  }
}
