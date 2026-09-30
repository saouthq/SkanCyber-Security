import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { gsap } from "~/animations/gsap";
import { pageLifecycle } from "~/animations/page-lifecycle";
import { primaryNav } from "~/content/site";
import { prefersReducedMotion } from "~/lib/env";
import { getLenis } from "~/lib/lenis";
import { Button } from "~/components/ui/Button";
import { Logo } from "~/components/ui/Logo";
import { TLink } from "~/components/ui/TLink";
import { MobileMenu } from "./MobileMenu";

/**
 * Navigation minimale : logo, cinq liens, un appel à l'action.
 * Se retire quand on descend, revient dès qu'on remonte.
 */
export function Nav() {
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Masquage directionnel
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let last = window.scrollY;
    let hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > last && y > 120;
      if (down !== hidden) {
        hidden = down;
        gsap.to(el, { yPercent: down ? -110 : 0, duration: 0.6, ease: "lock" });
      }
      el.dataset.scrolled = y > 40 ? "true" : "false";
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrée au premier chargement
  useEffect(() => {
    const el = bar.current;
    if (!el || prefersReducedMotion()) return;
    return pageLifecycle.onReady(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-nav-item]"),
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.05, delay: 0.2, ease: "lock" },
      );
    });
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  return (
    <>
      <header
        ref={bar}
        data-scrolled="false"
        className="group/nav fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-500 data-[scrolled=true]:border-[var(--line)] data-[scrolled=true]:bg-ink/92"
      >
        <nav aria-label="Navigation principale" className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
          <TLink to="/" className="logo-link relative z-[70] -m-2 p-2" aria-label="SkanCyber Security — accueil" data-nav-item data-intro>
            <Logo className="h-7 w-auto md:h-8" />
          </TLink>

          <ul className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((item) => {
              const active = pathname.startsWith(item.to);
              return (
                <li key={item.to} data-nav-item data-intro>
                  <TLink
                    to={item.to}
                    aria-current={active ? "page" : undefined}
                    className="group relative flex items-baseline gap-1.5 py-2 text-[0.9375rem] text-ash transition-colors duration-300 hover:text-bone aria-[current=page]:text-bone"
                  >
                    <span className="t-label text-[0.5625rem] text-smoke transition-colors group-hover:text-signal group-aria-[current=page]:text-signal">
                      {item.index}
                    </span>
                    <span className="link-underline">{item.label}</span>
                  </TLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3" data-nav-item data-intro>
            <Button to="/contact" className="hidden h-11 sm:inline-flex">
              Démarrer un projet
            </Button>
            <button
              type="button"
              className="relative z-[70] flex h-11 items-center gap-3 rounded-[4px] border border-[var(--line-strong)] px-4 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="t-label">{open ? "Fermer" : "Menu"}</span>
              <span className="relative block h-2.5 w-4" aria-hidden>
                <span className={`absolute left-0 h-px w-4 bg-bone transition-transform duration-500 ${open ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-4 bg-bone transition-transform duration-500 ${open ? "top-1 -rotate-45" : "top-2"}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
