import { GRID } from "~/components/visuals/glyphs";
import { phasePatterns } from "./phase-patterns";

const PITCH = 22;
const MODULE = 18;

/** Grille 12 × 12 dont les bits se réorganisent selon la phase (transitions CSS). */
export function PhaseGrid({ phase, className = "" }: { phase: string; className?: string }) {
  const paint = phasePatterns[phase];
  const size = GRID * PITCH - (PITCH - MODULE);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={`bit-glyph ${className}`} aria-hidden>
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
            data-s={paint(x, y)}
            style={{ transitionDelay: `${(x + y) * 12}ms` }}
          />
        );
      })}
    </svg>
  );
}
