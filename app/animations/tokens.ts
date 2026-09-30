/**
 * Vocabulaire de mouvement SkanCyber — trois gestes, réutilisés partout.
 *  · scan  : un trait balaie la zone et révèle le contenu (entrées de section, transitions)
 *  · trace : les lignes et schémas se dessinent (diagrammes, méthode, 3D)
 *  · lock  : les éléments se calent dans la grille, décélération nette, sans rebond
 */
export const ease = {
  precise: "precise",
  lock: "lock",
  scan: "scan",
} as const;

export const duration = {
  micro: 0.35,
  short: 0.6,
  base: 0.9,
  long: 1.2,
} as const;

export const stagger = {
  chars: 0.018,
  words: 0.04,
  lines: 0.085,
  items: 0.07,
} as const;
