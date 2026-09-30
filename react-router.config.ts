import type { Config } from "@react-router/dev/config";
import { projects } from "./app/content/projects";
import { services } from "./app/content/services";

/** Toutes les pages sont pré-rendues en HTML statique (SEO), puis hydratées. */
export const staticPaths = [
  "/",
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  "/expertise",
  "/projets",
  ...projects.map((p) => `/projets/${p.slug}`),
  "/cybersecurite",
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/confidentialite",
];

export default {
  ssr: false,
  prerender: staticPaths,
} satisfies Config;
