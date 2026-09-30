/**
 * État partagé entre le DOM (ScrollTrigger) et la scène WebGL.
 * Objet mutable volontairement : aucune re-render React, lecture à chaque frame.
 */
export type SystemState = {
  /** 0 → 1 : apparition initiale (balayage diagonal) */
  intro: number;
  /** 0 → 1 : vue compacte → vue éclatée des couches */
  explode: number;
  /** 0 → 1 : force de la mise en avant d'une couche */
  focus: number;
  /** index de la couche active (0 Interface → 3 Fondations), interpolable */
  active: number;
  /** 0 → 1 : le périmètre (sécurité) se referme autour du système */
  envelope: number;
  /** décalage de composition, en fraction de l'écran (positif = droite / bas) */
  offsetX: number;
  offsetY: number;
  /** rotation additionnelle du système (radians) */
  turn: number;
  /** opacité globale */
  opacity: number;
  /** recul de la caméra (1 = cadrage par défaut) */
  zoom: number;
};

export const createSystemState = (): SystemState => ({
  intro: 0,
  explode: 0,
  focus: 0,
  active: 0,
  envelope: 0,
  offsetX: 0,
  offsetY: 0,
  turn: 0,
  opacity: 1,
  zoom: 1,
});
