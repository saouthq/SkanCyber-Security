import type { MetaDescriptor } from "react-router";
import { site } from "~/content/site";

type SeoInput = {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

/** Métadonnées complètes d'une page : title, description, canonical, Open Graph, Twitter. */
export function seo({ title, description = site.description, path, image = "/og.png", type = "website" }: SeoInput): MetaDescriptor[] {
  const fullTitle = path === "/" ? title : `${title} — ${site.shortName}`;
  const url = new URL(path, site.url).toString();
  const img = new URL(image, site.url).toString();
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: site.name },
    { property: "og:locale", content: site.locale },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: new URL("/icone-app-512.png", site.url).toString(),
  email: site.email,
  description: site.description,
  knowsAbout: [
    "Cybersécurité",
    "Test d'intrusion",
    "Développement logiciel",
    "Applications web",
    "Applications mobiles",
    "SaaS",
    "Automatisation",
    "Architecture informatique",
  ],
};
