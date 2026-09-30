import type { Cell } from "~/components/visuals/glyphs";

const h = (x: number, y: number) => {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s);
};
const ring = (x: number, y: number) => Math.floor(Math.max(Math.abs(x - 5.5), Math.abs(y - 5.5)));

/** Un motif par fonction NIST CSF : la même grille se réorganise à chaque étape. */
export const phasePatterns: Record<string, (x: number, y: number) => Cell> = {
  govern: (x, y) => {
    if (ring(x, y) === 5) return 3;
    if ([3, 5, 7, 9].includes(y)) {
      if (x === 2) return y === 3 ? 2 : 1;
      if (x >= 4 && x <= 9 - (y % 3)) return 3;
    }
    return 0;
  },
  identify: (x, y) => {
    if (x === 9 && y === 3) return 2;
    const v = h(x, y);
    if (v > 0.8) return 1;
    if (v > 0.62) return 3;
    return 0;
  },
  protect: (x, y) => {
    const k = ring(x, y);
    if (k === 0) return 1;
    if (k === 5) return 1;
    if (k === 3) return 3;
    return 0;
  },
  detect: (x, y) => {
    if (x === 8 && y === 4) return 2;
    if (y === 6) return 1;
    if (h(x + 3, y) > 0.86) return 3;
    return 0;
  },
  respond: (x, y) => {
    if (x === 8 && y === 4) return 2;
    if (x >= 7 && x <= 9 && y >= 3 && y <= 5) return 1;
    if (h(x + 7, y + 1) > 0.88) return 3;
    return 0;
  },
  recover: (x, y) => {
    if (y === 6) return 1;
    return x % 3 !== 2 && y % 3 !== 2 ? 3 : 0;
  },
};
