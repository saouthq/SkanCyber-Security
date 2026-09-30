import { isRouteErrorResponse, Links, Meta, Outlet, Scripts } from "react-router";
import archivoLatin from "@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url";
import instrumentLatin from "@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2?url";

import type { Route } from "./+types/root";
import "./styles/app.css";
import { Cursor } from "~/components/layout/Cursor";
import { Footer } from "~/components/layout/Footer";
import { Nav } from "~/components/layout/Nav";
import { TransitionProvider } from "~/components/layout/PageTransition";
import { SmoothScroll } from "~/components/layout/SmoothScroll";
import { organizationJsonLd } from "~/lib/seo";
import { NotFound } from "~/sections/NotFound";

export const links: Route.LinksFunction = () => [
  { rel: "preload", href: archivoLatin, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "preload", href: instrumentLatin, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon-180.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

/**
 * Script d'amorçage (avant rendu) :
 *  - .js : active les états d'intro masqués (le HTML reste lisible sans JS)
 *  - .reduced-motion : aucun élément n'est masqué, aucune animation n'est jouée
 *  - filet de sécurité : si l'intro ne démarre pas, tout s'affiche après 4 s
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduced-motion');window.__introFallback=setTimeout(function(){d.classList.add('intro-fallback')},4000);})();`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b0b0d" />
        <meta name="color-scheme" content="dark" />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <Meta />
        <Links />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <TransitionProvider>
      <SmoothScroll />
      <Cursor />
      <Nav />
      <Outlet />
      <Footer />
    </TransitionProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFound />;
  const details = import.meta.env.DEV && error instanceof Error ? error.message : "Une erreur inattendue est survenue.";
  return (
    <main id="main" className="shell flex min-h-svh flex-col justify-center gap-6">
      <p className="t-label text-signal">Erreur</p>
      <h1 className="t-display t-h2">Le système a rencontré un problème.</h1>
      <p className="t-body max-w-xl">{details}</p>
      <a href="/" className="t-label link-underline w-fit text-bone">
        Retour à l'accueil
      </a>
    </main>
  );
}
