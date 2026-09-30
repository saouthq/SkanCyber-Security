import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "~/animations/gsap";
import { useReducedMotion } from "~/hooks/useMediaQuery";
import { setLenis } from "~/lib/lenis";

/** Défilement fluide (Lenis) synchronisé avec le ticker GSAP et ScrollTrigger. */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), wheelMultiplier: 0.95 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return null;
}
