import { useEffect, useRef } from "react";
import type { GlyphId } from "~/content/services";
import { prefersReducedMotion } from "~/lib/env";
import { GRID, glyphs } from "./glyphs";

type Props = {
  glyph: GlyphId;
  className?: string;
  /** Lecture automatique quand visible (par défaut) ; false = image fixe */
  play?: boolean;
  label?: string;
};

const PITCH = 22;
const MODULE = 18;

/**
 * Visualisation d'un service en grille de bits (12 × 12).
 * Rendu une seule fois ; les images suivantes modifient directement les
 * attributs `data-s` (aucun re-render React). Pause hors écran.
 */
export function BitGlyph({ glyph, className = "", play = true, label }: Props) {
  const svg = useRef<SVGSVGElement>(null);
  const def = glyphs[glyph];
  const fast = def.interval < 200;

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const cells = Array.from(el.querySelectorAll<SVGRectElement>("rect"));
    let frame = 0;
    let timer = 0;

    const paint = (f: number) => {
      cells.forEach((c, i) => {
        c.dataset.s = String(def.cell(f, i % GRID, Math.floor(i / GRID)));
      });
    };
    paint(0);
    if (!play || prefersReducedMotion()) return;

    const tick = () => {
      frame = (frame + 1) % def.frames;
      paint(frame);
    };
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) timer = window.setInterval(tick, def.interval);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [def, play]);

  return (
    <svg
      ref={svg}
      viewBox={`0 0 ${GRID * PITCH - (PITCH - MODULE)} ${GRID * PITCH - (PITCH - MODULE)}`}
      className={`bit-glyph ${fast ? "bit-glyph--fast" : ""} ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {Array.from({ length: GRID * GRID }, (_, i) => {
        const x = i % GRID;
        const y = Math.floor(i / GRID);
        return (
          <rect
            key={i}
            x={x * PITCH}
            y={y * PITCH}
            width={MODULE}
            height={MODULE}
            rx={4}
            data-s={def.cell(0, x, y)}
            style={{ transitionDelay: fast ? "0ms" : `${(x + y) * 14}ms` }}
          />
        );
      })}
    </svg>
  );
}
