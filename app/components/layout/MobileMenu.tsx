import { useEffect, useRef } from "react";
import { gsap } from "~/animations/gsap";
import { primaryNav, site } from "~/content/site";
import { prefersReducedMotion } from "~/lib/env";
import { Button } from "~/components/ui/Button";
import { TLink } from "~/components/ui/TLink";

type Props = { open: boolean; onClose: () => void };

/** Menu plein écran : un voile papier descend, les liens montent ligne à ligne. */
export function MobileMenu({ open, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    tl.current = gsap
      .timeline({ paused: true })
      .set(el, { visibility: "visible" })
      .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "precise" })
      .from(el.querySelectorAll("[data-menu-line]"), { yPercent: 110, duration: 1, stagger: 0.06, ease: "lock" }, 0.25)
      .from(el.querySelectorAll("[data-menu-fade]"), { autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.05, ease: "lock" }, 0.45);
    return () => {
      tl.current?.kill();
    };
  }, []);

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (prefersReducedMotion()) {
      t.progress(open ? 1 : 0).pause();
      if (!open) gsap.set(root.current, { visibility: "hidden" });
      return;
    }
    if (open) t.timeScale(1).play();
    else t.timeScale(1.7).reverse();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    root.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={root}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      className="fixed inset-0 z-[60] flex flex-col bg-paper pt-[var(--nav-h)] lg:hidden"
      style={{ visibility: "hidden" }}
    >
      <nav className="shell flex flex-1 flex-col justify-center" aria-label="Menu mobile">
        <ul>
          {primaryNav.map((item, i) => (
            <li key={item.to} className="overflow-hidden">
              <TLink to={item.to} className="flex items-baseline gap-4 py-2">
                <span data-menu-line className="flex items-baseline gap-4">
                  <span className="t-num w-8">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t-display-m">{item.label}</span>
                </span>
              </TLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="shell flex flex-col gap-6 pb-10 pt-6">
        <div data-menu-fade>
          <Button to="/contact">Démarrer un projet</Button>
        </div>
        <a data-menu-fade href={`mailto:${site.email}`} className="t-small link-quiet w-fit">
          {site.email}
        </a>
      </div>
    </div>
  );
}
