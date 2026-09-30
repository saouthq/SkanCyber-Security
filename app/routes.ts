import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("services", "routes/services.tsx"),
  route("services/:slug", "routes/service.tsx"),
  route("expertise", "routes/expertise.tsx"),
  route("projets", "routes/projects.tsx"),
  route("projets/:slug", "routes/project.tsx"),
  route("cybersecurite", "routes/cyber.tsx"),
  route("a-propos", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("mentions-legales", "routes/legal-notice.tsx"),
  route("confidentialite", "routes/privacy.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
