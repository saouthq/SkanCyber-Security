import { useRef } from "react";
import { useScrollReveals } from "~/hooks/useScrollReveals";
import { legalNav, primaryNav, site } from "~/content/site";
import { services } from "~/content/services";
import { getLenis } from "~/lib/lenis";
import { Button } from "~/components/ui/Button";
import { Magnetic } from "~/components/ui/Magnetic";
import { TLink } from "~/components/ui/TLink";
import { WORDMARK } from "~/components/ui/logo-paths";

/**
 * Pied de page = dernier chapitre de chaque page : la « nuit ».
 * Un appel monumental, le plan du site, puis le logotype en filigrane.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveals(ref);

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="on-dark relative overflow-hidden bg-graphite" aria-labelledby="footer-title">
      <div className="shell pb-16 pt-[var(--spacing-section)]">
        <p className="t-eyebrow" data-reveal="fade">
          Un projet, un audit, une question technique
        </p>
        <h2 id="footer-title" className="mt-6">
          <Magnetic strength={0.08} className="block">
            <TLink to="/contact" data-cursor="Écrire" className="group block w-fit">
              <span data-reveal="lines" className="t-display-xl block">
                Parlons de votre <span className="accent text-amber">projet.</span>
              </span>
            </TLink>
          </Magnetic>
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-6" data-reveal="fade">
          <Button to="/contact">Démarrer un projet</Button>
          <a href={`mailto:${site.email}`} className="link-underline text-body">
            {site.email}
          </a>
        </div>

        <div className="mt-[var(--spacing-section-sm)] grid gap-12 border-t border-[var(--line-inverse)] pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <nav className="lg:col-span-3" aria-label="Plan du site">
            <p className="t-small mb-5 text-mist">Studio</p>
            <ul className="space-y-2.5">
              {primaryNav.map((n) => (
                <li key={n.to}>
                  <TLink to={n.to} className="link-quiet">
                    {n.label}
                  </TLink>
                </li>
              ))}
              <li>
                <TLink to="/contact" className="link-quiet">
                  Contact
                </TLink>
              </li>
            </ul>
          </nav>
          <nav className="lg:col-span-4" aria-label="Services">
            <p className="t-small mb-5 text-mist">Services</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <TLink to={`/services/${s.slug}`} className="link-quiet">
                    {s.name}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="t-small mb-5 text-mist">SkanCyber Security</p>
            <p className="max-w-xs text-mist">
              Cybersécurité, ingénierie logicielle et infrastructure. Nous concevons, construisons et protégeons.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-6 text-sm text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((n) => (
              <li key={n.to}>
                <TLink to={n.to} className="link-quiet">
                  {n.label}
                </TLink>
              </li>
            ))}
            <li>
              <button type="button" onClick={toTop} className="link-quiet">
                Haut de page ↑
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Logotype en filigrane — signature de fin de page */}
      <div className="shell pb-6" aria-hidden data-reveal="fade">
        <svg viewBox="895 150 2010 262" className="w-full" fill="currentColor" opacity="0.06">
          {WORDMARK.map(([t, d], i) => (
            <path key={i} transform={t} d={d} />
          ))}
        </svg>
      </div>
    </footer>
  );
}
