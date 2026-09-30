import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "~/animations/gsap";
import { hasFinePointer, prefersReducedMotion } from "~/lib/env";

type Props = { children: ReactNode; strength?: number; className?: string };

/** Attire légèrement son contenu vers le curseur (desktop uniquement). */
export function Magnetic({ children, strength = 0.28, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const inner = el.firstElementChild as HTMLElement | null;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const ixTo = inner ? gsap.quickTo(inner, "x", { duration: 0.6, ease: "power3" }) : null;
    const iyTo = inner ? gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3" }) : null;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      xTo(x * strength);
      yTo(y * strength);
      ixTo?.(x * strength * 0.35);
      iyTo?.(y * strength * 0.35);
    };
    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.45)" });
      if (inner) gsap.to(inner, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.45)" });
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className ?? ""}`}>
      {children}
    </span>
  );
}
