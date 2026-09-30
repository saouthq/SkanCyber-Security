import { site } from "~/content/site";

export type Brief = {
  types: string[];
  stage: string;
  timeline: string;
  budget: string;
  description: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  consent: boolean;
};

export const emptyBrief: Brief = {
  types: [],
  stage: "",
  timeline: "",
  budget: "",
  description: "",
  name: "",
  email: "",
  company: "",
  phone: "",
  consent: false,
};

export const options = {
  types: [
    "Site web",
    "Application web",
    "Application mobile",
    "Application desktop",
    "Logiciel sur mesure",
    "SaaS",
    "Cybersécurité",
    "Automatisation",
    "Architecture / infrastructure",
    "Autre",
  ],
  stage: ["Idée à cadrer", "Projet existant à faire évoluer", "Refonte complète", "Audit ou diagnostic"],
  timeline: ["Dès que possible", "Sous 3 mois", "3 à 6 mois", "Pas de contrainte"],
  budget: ["Moins de 10 k€", "10 à 30 k€", "30 à 80 k€", "Plus de 80 k€", "À définir ensemble"],
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const steps = [
  { id: "types", title: "Quel est votre projet ?", hint: "Plusieurs choix possibles.", valid: (b: Brief) => b.types.length > 0 },
  { id: "stage", title: "Où en êtes-vous ?", hint: "Pour adapter notre première approche.", valid: (b: Brief) => !!b.stage },
  { id: "timeline", title: "Quel est votre horizon ?", hint: "Une estimation suffit.", valid: (b: Brief) => !!b.timeline },
  { id: "budget", title: "Avez-vous une enveloppe ?", hint: "Facultatif — cela nous aide à proposer le bon périmètre.", valid: () => true },
  {
    id: "description",
    title: "Décrivez votre besoin.",
    hint: "Contexte, objectifs, contraintes : quelques phrases suffisent.",
    valid: (b: Brief) => b.description.trim().length >= 20,
  },
  {
    id: "contact",
    title: "Comment vous joindre ?",
    hint: "Nous revenons vers vous par e-mail.",
    valid: (b: Brief) => b.name.trim().length > 1 && EMAIL.test(b.email) && b.consent,
  },
] as const;

export function briefToText(b: Brief, ref: string) {
  return [
    `BRIEF ${ref}`,
    "",
    `Type de projet : ${b.types.join(", ") || "—"}`,
    `Stade : ${b.stage || "—"}`,
    `Horizon : ${b.timeline || "—"}`,
    `Budget : ${b.budget || "Non précisé"}`,
    "",
    "Besoin :",
    b.description.trim() || "—",
    "",
    `Contact : ${b.name}${b.company ? ` — ${b.company}` : ""}`,
    `E-mail : ${b.email}`,
    b.phone ? `Téléphone : ${b.phone}` : "",
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n");
}

/**
 * Envoi du brief.
 * TODO: brancher un point d'API (formulaire serveur, Resend, etc.) une fois
 * l'hébergement choisi. En attendant, le brief est transmis via le client
 * e-mail du visiteur — aucune donnée n'est envoyée à un service tiers.
 */
export function submitBrief(b: Brief, ref: string) {
  const subject = `Brief projet ${ref} — ${b.types.join(", ")}`;
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(briefToText(b, ref))}`;
  window.location.href = href;
}
