import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router";
import { gsap, ScrollTrigger } from "~/animations/gsap";
import { pageLifecycle } from "~/animations/page-lifecycle";
import { primaryNav } from "~/content/site";
import { prefersReducedMotion } from "~/lib/env";
import { getLenis } from "~/lib/lenis";

type TransitionApi = { go: (to: string) => void };
const TransitionContext = createContext<TransitionApi>({ go: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

function labelFor(pathname: string) {
  if (pathname === "/") return "§ 00 — Index";
  const match = primaryNav.find((n) => pathname.startsWith(n.to));
  if (match) return `§ ${match.index} — ${match.label}`;
  if (pathname.startsWith("/contact")) return "§ 06 — Contact";
  return "§ — SkanCyber";
}

function resetScroll() {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}

/**
 * Transition « scan » : un voile monte depuis le bas, un trait signal le
 * traverse, la page change sous le voile, puis le voile se retire vers le haut.
 * ~1,1 s au total. Désactivée en mouvement réduit.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const overlay = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const awaitingReveal = useRef(false);
  const firstRender = useRef(true);

  // Premier chargement : la page est prête quand les polices le sont.
  useEffect(() => {
    let cancelled = false;
    const fonts = document.fonts?.ready ?? Promise.resolve();
    fonts.then(() => {
      if (cancelled) return;
      requestAnimationFrame(() => pageLifecycle.setReady(true));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const go = useCallback(
    (to: string) => {
      const target = new URL(to, window.location.href);
      if (target.pathname === window.location.pathname) {
        const lenis = getLenis();
        const dest = target.hash ? document.querySelector<HTMLElement>(target.hash) : null;
        if (lenis) lenis.scrollTo(dest ?? 0);
        else if (dest) dest.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (busy.current) return;
      if (prefersReducedMotion() || !overlay.current) {
        navigate(to);
        return;
      }
      busy.current = true;
      pageLifecycle.setReady(false);
      getLenis()?.stop();

      const el = overlay.current;
      const panel = el.querySelector("[data-panel]");
      const line = el.querySelector("[data-line]");
      const label = el.querySelector("[data-label]");
      if (label) label.textContent = labelFor(target.pathname);

      gsap
        .timeline({
          onComplete: () => {
            awaitingReveal.current = true;
            navigate(to);
          },
        })
        .set(el, { visibility: "visible" })
        .fromTo(panel, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "precise" })
        .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "scan" }, 0.12)
        .fromTo(label, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "lock" }, 0.25);
    },
    [navigate],
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    resetScroll();
    ScrollTrigger.refresh();

    if (!awaitingReveal.current) {
      // Navigation arrière/avant du navigateur : pas de voile.
      pageLifecycle.setReady(true);
      return;
    }
    awaitingReveal.current = false;
    const el = overlay.current!;
    const panel = el.querySelector("[data-panel]");
    const label = el.querySelector("[data-label]");
    gsap
      .timeline({
        delay: 0.08,
        onStart: () => {
          getLenis()?.start();
          pageLifecycle.setReady(true);
        },
        onComplete: () => {
          gsap.set(el, { visibility: "hidden" });
          busy.current = false;
          document.getElementById("main")?.focus({ preventScroll: true });
        },
      })
      .to(label, { autoAlpha: 0, y: -10, duration: 0.25, ease: "precise" })
      .to(panel, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "precise" }, 0.05);
  }, [location.pathname]);

  const api = useMemo(() => ({ go }), [go]);

  return (
    <TransitionContext.Provider value={api}>
      {children}
      <div ref={overlay} className="pointer-events-none fixed inset-0 z-[90]" style={{ visibility: "hidden" }} aria-hidden>
        <div data-panel className="absolute inset-0 flex items-center justify-center bg-ink">
          <div data-line className="absolute left-0 right-0 top-1/2 h-px origin-left bg-signal/70" />
          <span data-label className="t-label relative mt-10 text-ash" />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
