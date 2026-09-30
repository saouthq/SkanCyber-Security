import { BRAND_CELLS, MODULE, ORIGIN, PITCH } from "~/lib/brand";
import { SUBMARK, WORDMARK } from "./logo-paths";

type SymbolProps = { className?: string; title?: string };

/** Symbole seul — chaque pixel est animable individuellement (classe .bit). */
export function LogoSymbol({ className, title }: SymbolProps) {
  return (
    <svg viewBox="12 1 96 118" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {BRAND_CELLS.map(({ x, y, state }) => (
        <rect
          key={`${x}-${y}`}
          className="bit"
          data-state={state}
          x={ORIGIN.x + x * PITCH}
          y={ORIGIN.y + y * PITCH}
          width={MODULE}
          height={MODULE}
          rx={4}
          style={{ ["--i" as string]: x + y }}
          fill={state === 2 ? "var(--color-signal)" : "var(--color-bone)"}
          opacity={state === 0 ? 0.1 : 1}
        />
      ))}
    </svg>
  );
}

type LogoProps = { className?: string; withSubmark?: boolean };

/** Logotype horizontal complet (symbole + SKANCYBER + SECURITY). */
export function Logo({ className, withSubmark = true }: LogoProps) {
  return (
    <svg
      viewBox="100 34 2968 652"
      className={className}
      role="img"
      aria-label="SkanCyber Security"
    >
      <g transform="scale(6)">
        {BRAND_CELLS.map(({ x, y, state }) => (
          <rect
            key={`${x}-${y}`}
            className="bit"
            data-state={state}
            x={ORIGIN.x + x * PITCH}
            y={ORIGIN.y + y * PITCH}
            width={MODULE}
            height={MODULE}
            rx={4}
            style={{ ["--i" as string]: x + y }}
            fill={state === 2 ? "var(--color-signal)" : "var(--color-bone)"}
            opacity={state === 0 ? 0.1 : 1}
          />
        ))}
      </g>
      <g fill="var(--color-bone)">
        {WORDMARK.map(([t, d], i) => (
          <path key={i} transform={t} d={d} />
        ))}
      </g>
      {withSubmark && (
        <g fill="var(--color-signal)">
          {SUBMARK.map(([t, d], i) => (
            <path key={i} transform={t} d={d} />
          ))}
        </g>
      )}
    </svg>
  );
}
