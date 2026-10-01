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
 * Navigation légère : logo, cinq liens, un appel à l'action.
 * Transparente en haut de page, elle prend un fond papier au scroll,
 * se retire quand on descend et revient dès qu'on remonte.
 */
export function Nav() {
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let last = window.scrollY;
    let hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > last && y > 160;
      if (down !== hidden) {
        hidden = down;
        gsap.to(el, { yPercent: down ? -105 : 0, duration: 0.7, ease: "lock" });
      }
      el.dataset.scrolled = y > 24 ? "true" : "false";
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = bar.current;
    if (!el || prefersReducedMotion()) return;
    return pageLifecycle.onReady(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-nav-item]"),
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 1, stagger: 0.05, delay: 0.15, ease: "lock" },
      );
    });
  }, []);

  useEffect(() => setOpen(false), [pathname]);

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
        className="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 data-[scrolled=true]:bg-paper/92 data-[scrolled=true]:shadow-[0_1px_0_var(--line)]"
      >
        <nav aria-label="Navigation principale" className="shell flex h-[var(--nav-h)] items-center justify-between gap-8">
          <TLink to="/" aria-label="SkanCyber Security — accueil" className="relative z-[70] -m-2 p-2" data-nav-item data-intro>
            <Logo className="h-8 w-auto md:h-9" />
          </TLink>

          <div className="flex items-center gap-10">
            <ul className="hidden items-center gap-8 lg:flex">
              {primaryNav.map((item) => {
                const active = pathname.startsWith(item.to);
                return (
                  <li key={item.to} data-nav-item data-intro>
                    <TLink
                      to={item.to}
                      aria-current={active ? "page" : undefined}
                      className="link-quiet text-ui text-ink-2 transition-colors duration-300 hover:text-ink aria-[current=page]:text-ink"
                    >
                      {item.label}
                    </TLink>
                  </li>
                );
              })}
            </ul>
            <div data-nav-item data-intro className="flex items-center gap-3">
              <Button to="/contact" className="hidden sm:inline-flex">
                Démarrer un projet
              </Button>
              <button
                type="button"
                className="relative z-[70] flex h-12 items-center gap-3 rounded-full px-4 text-ui font-medium shadow-[inset_0_0_0_1px_var(--line-strong)] lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? "Fermer" : "Menu"}
                <span className="relative block h-2 w-4" aria-hidden>
                  <span className={`absolute left-0 h-px w-4 bg-ink transition-transform duration-500 ${open ? "top-1 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 h-px w-4 bg-ink transition-transform duration-500 ${open ? "top-1 -rotate-45" : "top-2"}`} />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
