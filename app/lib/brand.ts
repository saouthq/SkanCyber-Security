/**
 * Le symbole SKANCYBER : une grille 4 × 5, « 9 pixels + 1 bit actif ».
 *  '#' = pixel allumé · '*' = bit actif (signal) · '.' = pixel éteint
 */
export const BRAND_GRID = [".##*", "#...", ".##.", "...#", "###."] as const;

export const BRAND_CELLS = BRAND_GRID.flatMap((row, y) =>
  row.split("").map((c, x) => ({ x, y, state: c === "*" ? 2 : c === "#" ? 1 : 0 })),
);

/** Géométrie du kit : module 18, gouttière 4, rayon 4 (viewBox 120). */
export const MODULE = 18;
export const PITCH = 22;
export const ORIGIN = { x: 18, y: 7 };
