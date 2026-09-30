// Génère public/sitemap.xml à partir des routes pré-rendues (exécuté avant le build).
import { writeFileSync } from "node:fs";

const { site } = await import("../app/content/site.ts");
const { services } = await import("../app/content/services.ts");
const { projects } = await import("../app/content/projects.ts");
const SITE = site.url;

const paths = [
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

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod><priority>${p === "/" ? "1.0" : "0.7"}</priority></url>`).join("\n")}
</urlset>
`;
writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap.xml : ${paths.length} URL`);
