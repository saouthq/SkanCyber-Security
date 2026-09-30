import { useEffect, useRef } from "react";
import { gsap } from "~/animations/gsap";
import { primaryNav, site } from "~/content/site";
import { prefersReducedMotion } from "~/lib/env";
import { TLink } from "~/components/ui/TLink";

type Props = { open: boolean; onClose: () => void };

/** Menu plein écran (mobile / tablette) : voile qui descend, liens géants en cascade. */
export function MobileMenu({ open, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    tl.current = gsap
      .timeline({ paused: true })
      .set(el, { visibility: "visible" })
      .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "precise" })
      .from(el.querySelectorAll("[data-menu-line]"), { yPercent: 110, duration: 0.9, stagger: 0.06, ease: "lock" }, 0.25)
      .from(el.querySelectorAll("[data-menu-fade]"), { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.05 }, 0.45);
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
    else t.timeScale(1.6).reverse();
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
      className="fixed inset-0 z-[60] flex flex-col bg-graphite pt-[var(--nav-h)] lg:hidden"
      style={{ visibility: "hidden" }}
    >
      <nav className="shell flex flex-1 flex-col justify-center" aria-label="Menu mobile">
        <ul className="border-t border-[var(--line)]">
          {primaryNav.map((item) => (
            <li key={item.to} className="border-b border-[var(--line)]">
              <TLink to={item.to} className="flex items-baseline justify-between gap-4 overflow-hidden py-4">
                <span data-menu-line className="t-display block text-[clamp(2.2rem,10vw,4rem)]">
                  {item.label}
                </span>
                <span data-menu-fade className="t-label text-signal">
                  {item.index}
                </span>
              </TLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="shell flex items-end justify-between gap-6 pb-8 pt-6">
        <TLink to="/contact" data-menu-fade className="t-label flex items-center gap-2 text-bone">
          <span className="h-[7px] w-[7px] rounded-[1.5px] bg-signal" aria-hidden />
          Démarrer un projet
        </TLink>
        <a data-menu-fade href={`mailto:${site.email}`} className="t-mono text-ash">
          {site.email}
        </a>
      </div>
    </div>
  );
}
