import { useEffect, useRef } from "react";
import { gsap } from "~/animations/gsap";
import { useFinePointer, useReducedMotion } from "~/hooks/useMediaQuery";

/**
 * Curseur desktop discret : un point qui s'inverse selon le fond.
 * Sur un élément `data-cursor="Explorer"`, une étiquette apparaît à côté du point.
 * Désactivé sur écran tactile et en mouvement réduit.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;
  const dot = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dot.current;
    const t = tag.current;
    if (!enabled || !d || !t) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const tx = gsap.quickTo(t, "x", { duration: 0.5, ease: "power3" });
    const ty = gsap.quickTo(t, "y", { duration: 0.5, ease: "power3" });
    let shown = false;
    let current = "";

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        shown = true;
        gsap.set([d, t], { x: e.clientX, y: e.clientY });
        gsap.to(d, { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      tx(e.clientX + 18);
      ty(e.clientY + 18);
    };
    const over = (e: Event) => {
      const el = e.target as Element | null;
      if (!el?.closest) return;
      const labelled = el.closest<HTMLElement>("[data-cursor]");
      const label = labelled?.dataset.cursor ?? "";
      const interactive = !!el.closest("a, button, [role='button'], label, summary");
      const text = !!el.closest("input, textarea, select");
      gsap.to(d, { scale: text ? 0 : interactive ? 2.6 : 1, duration: 0.45, ease: "lock" });
      if (label !== current) {
        current = label;
        if (label) t.textContent = label;
        gsap.to(t, { autoAlpha: label ? 1 : 0, scale: label ? 1 : 0.8, duration: 0.35, ease: "lock" });
      }
    };
    const leave = () => {
      shown = false;
      gsap.to([d, t], { autoAlpha: 0, duration: 0.25 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95]">
      <div ref={dot} className="absolute left-0 top-0 -ml-[5px] -mt-[5px] h-[10px] w-[10px] rounded-full bg-white opacity-0 mix-blend-difference" />
      <div
        ref={tag}
        className="absolute left-0 top-0 origin-top-left rounded-full bg-ink px-3 py-1.5 text-caption font-medium text-paper opacity-0"
      />
    </div>
  );
}
