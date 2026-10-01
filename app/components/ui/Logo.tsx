import { useId } from "react";
import { SUBMARK, WORDMARK } from "./logo-paths";

const AMBER = "#FFB224";
const NAVY = "#1C2230";
const SLATE = "#3A4458";

/** Icônes gravées sur les faces latérales du cube (réseau à gauche, code à droite). */
function CubeIcons({ color }: { color: string }) {
  return (
    <>
      <g transform="matrix(0.866 -0.5 0 1 84.25 74)" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-9 -9 L-17 0 L-9 9 M9 -9 L17 0 L9 9 M4 -12 L-4 12" />
      </g>
      <g transform="matrix(0.866 0.5 0 1 35.75 74)">
        <path d="M-11 9 L0 -9 L11 9 Z" fill="none" stroke={color} strokeWidth="2.6" strokeLinejoin="round" />
        {[
          [-11, 9],
          [0, -9],
          [11, 9],
        ].map(([cx, cy]) => (
          <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="4.2" fill={color} />
        ))}
      </g>
    </>
  );
}

/** Le cube seul (viewBox 0 0 120 120). */
export function LogoSymbol({ className, title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="10 4 100 112" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
        <rect width="120" height="120" fill="#fff" />
        <CubeIcons color="#000" />
      </mask>
      <g mask={`url(#${id})`}>
        <polygon points="60,7 103.3,32 60,57 16.7,32" fill={AMBER} />
        <polygon points="14.1,36.5 57.4,61.5 57.4,111.5 14.1,86.5" fill={NAVY} />
        <polygon points="62.6,61.5 105.9,36.5 105.9,86.5 62.6,111.5" fill={SLATE} />
      </g>
      <CubeIcons color={AMBER} />
    </svg>
  );
}

type LogoProps = { className?: string; inverse?: boolean };

/** Logotype horizontal : cube + SKANCYBER + SECURITY. */
export function Logo({ className, inverse }: LogoProps) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="70 30 2860 660" className={className} role="img" aria-label="SkanCyber Security">
      <g transform="scale(6)">
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
          <rect width="120" height="120" fill="#fff" />
          <CubeIcons color="#000" />
        </mask>
        <g mask={`url(#${id})`}>
          <polygon points="60,7 103.3,32 60,57 16.7,32" fill={AMBER} />
          <polygon points="14.1,36.5 57.4,61.5 57.4,111.5 14.1,86.5" fill={inverse ? "#E8EAF0" : NAVY} />
          <polygon points="62.6,61.5 105.9,36.5 105.9,86.5 62.6,111.5" fill={inverse ? "#9AA3B5" : SLATE} />
        </g>
        <CubeIcons color={inverse ? NAVY : AMBER} />
      </g>
      <g fill={inverse ? "#F2F1ED" : NAVY}>
        {WORDMARK.map(([t, d], i) => (
          <path key={i} transform={t} d={d} />
        ))}
      </g>
      <g fill={inverse ? AMBER : "#B7791F"}>
        {SUBMARK.map(([t, d], i) => (
          <path key={i} transform={t} d={d} />
        ))}
      </g>
    </svg>
  );
}
