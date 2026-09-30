import { useEffect, useRef } from "react";
import { gsap } from "~/animations/gsap";
import { useFinePointer, useReducedMotion } from "~/hooks/useMediaQuery";

/**
 * Curseur desktop : un point précis + un anneau qui suit avec inertie.
 * - au survol d'un élément interactif, l'anneau s'élargit ;
 * - `data-cursor="Voir"` (ou tout autre texte) affiche un label contextuel ;
 * - inactif sur écran tactile et en mouvement réduit (curseur natif conservé).
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current || !label.current) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.42, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.42, ease: "power3" });
    let visible = false;
    let mode: "idle" | "hover" | "label" | "text" = "idle";

    const setMode = (next: typeof mode, text = "") => {
      if (next === mode && next !== "label") return;
      mode = next;
      const r = ring.current!;
      const d = dot.current!;
      const l = label.current!;
      if (next === "label") l.textContent = text;
      gsap.to(r, {
        width: next === "label" ? 92 : next === "hover" ? 56 : 34,
        height: next === "label" ? 92 : next === "hover" ? 56 : 34,
        backgroundColor: next === "label" ? "rgba(244,244,242,1)" : "rgba(244,244,242,0)",
        borderColor: next === "hover" ? "rgba(255,106,74,0.9)" : "rgba(244,244,242,0.35)",
        opacity: next === "text" ? 0 : 1,
        duration: 0.45,
        ease: "lock",
      });
      gsap.to(l, { autoAlpha: next === "label" ? 1 : 0, duration: 0.25 });
      gsap.to(d, { scale: next === "idle" ? 1 : next === "text" ? 0 : 0.5, duration: 0.3 });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const onOver = (e: Event) => {
      const t = e.target as Element | null;
      if (!t?.closest) return;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled) return setMode("label", labelled.dataset.cursor ?? "");
      if (t.closest("input, textarea, select")) return setMode("text");
      if (t.closest("a, button, [role='button'], label, summary")) return setMode("hover");
      setMode("idle");
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
    };
    const onDown = () => gsap.to(ring.current, { scale: 0.82, duration: 0.2 });
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.4, ease: "lock" });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95]">
      <div
        ref={ring}
        className="absolute left-0 top-0 flex h-[34px] w-[34px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border opacity-0"
        style={{ borderColor: "rgba(244,244,242,0.35)" }}
      >
        <span ref={label} className="t-label text-[0.625rem] font-medium text-ink opacity-0" />
      </div>
      <div ref={dot} className="absolute left-0 top-0 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-[1.5px] bg-signal opacity-0" />
    </div>
  );
}
