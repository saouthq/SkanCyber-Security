/**
 * Informations globales du site.
 * Les valeurs marquées TODO sont provisoires et doivent être confirmées.
 */
export const site = {
  name: "SkanCyber Security",
  shortName: "SkanCyber",
  // TODO: remplacer par le domaine définitif avant la mise en ligne.
  url: "https://www.skancyber.com",
  // TODO: adresse de réception des briefs à confirmer.
  email: "contact@skancyber.com",
  locale: "fr_FR",
  description:
    "SkanCyber Security conçoit, développe et sécurise des logiciels sur mesure — applications web, mobiles, desktop, SaaS — et accompagne les organisations en cybersécurité.",
  domains: ["Cybersécurité", "Ingénierie logicielle", "Architecture"],
} as const;

export type NavItem = { label: string; to: string; index: string };

export const primaryNav: NavItem[] = [
  { label: "Services", to: "/services", index: "01" },
  { label: "Expertise", to: "/expertise", index: "02" },
  { label: "Projets", to: "/projets", index: "03" },
  { label: "Cybersécurité", to: "/cybersecurite", index: "04" },
  { label: "À propos", to: "/a-propos", index: "05" },
];

export const legalNav: NavItem[] = [
  { label: "Mentions légales", to: "/mentions-legales", index: "L1" },
  { label: "Confidentialité", to: "/confidentialite", index: "L2" },
];
