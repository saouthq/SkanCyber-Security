/**
 * Vocabulaire de mouvement SkanCyber — trois gestes, réutilisés partout.
 *  · masque : un volet s'ouvre et révèle l'image ou le titre (entrées, transitions)
 *  · tracé  : les filets et schémas se dessinent (méthode, schémas)
 *  · calage : les éléments se posent, décélération longue, sans rebond
 */
export const ease = {
  precise: "precise",
  lock: "lock",
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
