import { useRef } from "react";
import { useScrollReveals } from "~/hooks/useScrollReveals";
import { legalNav, primaryNav, site } from "~/content/site";
import { services } from "~/content/services";
import { getLenis } from "~/lib/lenis";
import { LocalTime } from "~/components/ui/LocalTime";
import { LogoSymbol } from "~/components/ui/Logo";
import { WORDMARK } from "~/components/ui/logo-paths";
import { TLink } from "~/components/ui/TLink";
import { ArrowDown } from "~/components/ui/Icons";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveals(ref);
  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-[var(--line)] bg-ink pt-20 md:pt-28" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Pied de page
      </h2>
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <LogoSymbol className="h-12 w-auto" />
          <p className="t-lead mt-8 max-w-sm text-ash">
            Ingénierie logicielle et cybersécurité. Nous concevons des systèmes, puis nous les défendons.
          </p>
        </div>

        <nav className="md:col-span-2" aria-label="Plan du site">
          <p className="t-label mb-5 text-smoke">Index</p>
          <ul className="space-y-2.5">
            {primaryNav.map((n) => (
              <li key={n.to}>
                <TLink to={n.to} className="link-underline text-ash transition-colors hover:text-bone">
                  {n.label}
                </TLink>
              </li>
            ))}
            <li>
              <TLink to="/contact" className="link-underline text-ash transition-colors hover:text-bone">
                Contact
              </TLink>
            </li>
          </ul>
        </nav>

        <nav className="md:col-span-3" aria-label="Services">
          <p className="t-label mb-5 text-smoke">Services</p>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <TLink to={`/services/${s.slug}`} className="link-underline text-ash transition-colors hover:text-bone">
                  {s.name}
                </TLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="t-label mb-5 text-smoke">Contact</p>
          <a href={`mailto:${site.email}`} className="link-underline break-all text-bone">
            {site.email}
          </a>
          <p className="t-mono mt-6 text-smoke">
            Heure locale <LocalTime className="text-ash" />
          </p>
        </div>
      </div>

      <div className="shell mt-20 flex flex-col-reverse gap-6 border-t border-[var(--line)] py-6 md:flex-row md:items-center md:justify-between">
        <p className="t-label text-smoke">© {new Date().getFullYear()} {site.name}</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {legalNav.map((n) => (
            <li key={n.to}>
              <TLink to={n.to} className="t-label text-smoke transition-colors hover:text-bone">
                {n.label}
              </TLink>
            </li>
          ))}
          <li>
            <button type="button" onClick={toTop} className="t-label flex items-center gap-2 text-smoke transition-colors hover:text-bone">
              Haut de page <ArrowDown className="h-3 w-2 rotate-180" />
            </button>
          </li>
        </ul>
      </div>

      {/* Logotype monumental — signature de fin de page */}
      <div className="shell pb-4" aria-hidden data-reveal="scan">
        <svg viewBox="905 160 2160 222" className="w-full" fill="var(--color-bone)" opacity="0.07">
          {WORDMARK.map(([t, d], i) => (
            <path key={i} transform={t} d={d} />
          ))}
        </svg>
      </div>
    </footer>
  );
}
