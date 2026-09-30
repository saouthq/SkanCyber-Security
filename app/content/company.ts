/** Méthode, principes et référentiels — contenus partagés entre plusieurs pages. */

export const method = [
  { index: "M.01", title: "Audit", text: "Comprendre l'existant, les usages, les risques et les contraintes avant de proposer quoi que ce soit." },
  { index: "M.02", title: "Architecture", text: "Définir un système cible simple à raisonner, argumenté et chiffré." },
  { index: "M.03", title: "Construction", text: "Développer par itérations courtes, avec démonstrations, tests et revues de code." },
  { index: "M.04", title: "Durcissement", text: "Éprouver la sécurité avant la mise en production : tests, corrections, vérification." },
  { index: "M.05", title: "Exploitation", text: "Superviser, maintenir, faire évoluer — ou transmettre proprement à vos équipes." },
];

export const principles = [
  {
    index: "01",
    title: "La sécurité dès la conception",
    text: "Elle se décide dans l'architecture, pas dans un audit final. Chaque choix technique est évalué aussi sous l'angle du risque.",
  },
  {
    index: "02",
    title: "Du code qu'on peut relire",
    text: "Un logiciel doit rester compréhensible par quelqu'un d'autre que son auteur. Lisibilité, tests et documentation font partie de la livraison.",
  },
  {
    index: "03",
    title: "Un interlocuteur technique",
    text: "Vous échangez avec les personnes qui conçoivent et construisent votre système, du premier atelier à la mise en production.",
  },
  {
    index: "04",
    title: "La transparence avant la promesse",
    text: "Nous disons ce qui est faisable, ce qui ne l'est pas et ce que cela coûte. Aucun système n'est invulnérable : nous le rendons difficile à compromettre.",
  },
];

/** Fonctions du NIST Cybersecurity Framework 2.0 — référentiel public. */
export const nistFunctions = [
  {
    id: "govern",
    code: "GV",
    name: "Gouverner",
    text: "Définir la stratégie, les rôles et les politiques de sécurité adaptés à vos risques et à vos obligations.",
    actions: ["Analyse de risques", "Politiques de sécurité", "Accompagnement ISO 27001 / NIS 2"],
  },
  {
    id: "identify",
    code: "ID",
    name: "Identifier",
    text: "Cartographier vos actifs, vos flux et votre surface d'attaque pour savoir ce qu'il faut protéger.",
    actions: ["Cartographie du SI", "Inventaire des actifs exposés", "Audit d'architecture"],
  },
  {
    id: "protect",
    code: "PR",
    name: "Protéger",
    text: "Réduire la surface d'attaque : durcissement, gestion des identités, chiffrement, développement sécurisé.",
    actions: ["Durcissement des configurations", "Gestion des identités et accès", "Revue de code sécurité"],
  },
  {
    id: "detect",
    code: "DE",
    name: "Détecter",
    text: "Mettre en place la journalisation et la supervision qui permettent de voir un incident à temps.",
    actions: ["Journalisation centralisée", "Règles de détection", "Tests d'intrusion"],
  },
  {
    id: "respond",
    code: "RS",
    name: "Répondre",
    text: "Préparer les procédures, les rôles et les outils pour contenir un incident rapidement.",
    actions: ["Plans de réponse", "Exercices de crise", "Analyse post-incident"],
  },
  {
    id: "recover",
    code: "RC",
    name: "Rétablir",
    text: "Restaurer les services avec des sauvegardes testées et tirer les leçons de chaque incident.",
    actions: ["Sauvegardes vérifiées", "Plan de reprise d'activité", "Retour d'expérience"],
  },
];
