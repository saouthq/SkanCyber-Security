import type { ProjectVisual as Kind } from "~/content/projects";

/**
 * Visuels schématiques provisoires des études de cas — dessinés dans le
 * langage de la marque (filets, bits, un seul signal). À remplacer par de
 * vraies captures ou vidéos du projet.
 */
export function ProjectVisual({ kind, className = "" }: { kind: Kind; className?: string }) {
  return (
    <svg viewBox="0 0 800 520" className={`project-visual ${className}`} role="img" aria-label="Visuel schématique provisoire">
      <defs>
        <pattern id={`dots-${kind}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="9" y="9" width="2" height="2" rx="0.5" fill="var(--color-bone)" fillOpacity="0.12" />
        </pattern>
      </defs>
      <rect width="800" height="520" fill="var(--color-graphite)" />
      <rect width="800" height="520" fill={`url(#dots-${kind})`} />
      {kind === "portal" && <Portal />}
      {kind === "logistics" && <Logistics />}
      {kind === "field" && <Field />}
      {kind === "network" && <Network />}
    </svg>
  );
}

const stroke = { stroke: "var(--color-bone)", strokeOpacity: 0.22, fill: "none", strokeWidth: 1 } as const;
const fill = (o: number) => ({ fill: "var(--color-bone)", fillOpacity: o });
const signal = { fill: "var(--color-signal)" };

function Portal() {
  return (
    <g>
      <rect x="90" y="60" width="620" height="400" rx="6" {...fill(0.03)} {...stroke} />
      <line x1="90" y1="96" x2="710" y2="96" {...stroke} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={106 + i * 16} y="74" width="8" height="8" rx="2" {...fill(0.25)} />
      ))}
      <rect x="90" y="96" width="150" height="364" {...fill(0.04)} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="110" y={124 + i * 34} width={i === 1 ? 90 : 70 + i * 8} height="8" rx="2" {...fill(i === 1 ? 0.8 : 0.2)} />
      ))}
      <rect x="270" y="124" width="200" height="14" rx="2" {...fill(0.85)} />
      <rect x="270" y="148" width="310" height="8" rx="2" {...fill(0.2)} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line x1="270" x2="680" y1={196 + i * 42} y2={196 + i * 42} {...stroke} />
          <rect x="270" y={210 + i * 42} width="14" height="14" rx="3" {...fill(0.14)} />
          <rect x="296" y={214 + i * 42} width={120 + ((i * 47) % 90)} height="7" rx="2" {...fill(0.5)} />
          <rect x="560" y={214 + i * 42} width="60" height="7" rx="2" {...fill(0.18)} />
          {i === 2 && <rect x="656" y={210 + i * 42} width="14" height="14" rx="3" {...signal} />}
        </g>
      ))}
    </g>
  );
}

function Logistics() {
  const route = "M120 400 C 200 330, 250 350, 320 280 S 450 170, 520 210 S 640 120, 690 110";
  return (
    <g>
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`h${i}`} x1="60" x2="740" y1={70 + i * 64} y2={70 + i * 64} {...stroke} strokeOpacity={0.07} />
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} y1="50" y2="470" x1={80 + i * 64} x2={80 + i * 64} {...stroke} strokeOpacity={0.07} />
      ))}
      <path d={route} {...stroke} strokeOpacity={0.5} strokeDasharray="4 6" />
      <path d="M140 150 C 260 190, 330 120, 470 330 S 640 420, 700 380" {...stroke} strokeOpacity={0.18} />
      {[
        [120, 400],
        [320, 280],
        [520, 210],
        [690, 110],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 7} y={y - 7} width="14" height="14" rx="3" {...fill(0.9)} />
          <rect x={x + 14} y={y - 4} width="54" height="7" rx="2" {...fill(0.25)} />
        </g>
      ))}
      <rect x="409" y="238" width="14" height="14" rx="3" {...signal} className="pv-blink" />
      <rect x="60" y="440" width="220" height="44" rx="4" {...fill(0.06)} {...stroke} />
      <rect x="76" y="455" width="90" height="7" rx="2" {...fill(0.6)} />
      <rect x="76" y="468" width="140" height="6" rx="2" {...fill(0.2)} />
    </g>
  );
}

function Field() {
  return (
    <g>
      <rect x="300" y="40" width="200" height="440" rx="26" {...fill(0.04)} {...stroke} strokeOpacity={0.35} />
      <rect x="370" y="54" width="60" height="8" rx="4" {...fill(0.2)} />
      <rect x="324" y="86" width="110" height="12" rx="2" {...fill(0.85)} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="324" y={124 + i * 44} width="16" height="16" rx="3" {...(i < 3 ? fill(0.85) : fill(0.12))} />
          <rect x="352" y={129 + i * 44} width={80 + ((i * 29) % 40)} height="7" rx="2" {...fill(i < 3 ? 0.5 : 0.2)} />
        </g>
      ))}
      <path d="M330 390 c 20 -30, 40 20, 60 -6 s 30 -20, 50 4 s 20 10, 30 -8" {...stroke} strokeOpacity={0.7} />
      <rect x="324" y="424" width="152" height="34" rx="4" {...signal} />
      <rect x="540" y="150" width="190" height="130" rx="6" {...fill(0.03)} {...stroke} />
      <rect x="556" y="168" width="80" height="8" rx="2" {...fill(0.6)} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="556" y={196 + i * 24} width={150 - i * 30} height="7" rx="2" {...fill(0.2)} />
      ))}
      <line x1="500" y1="215" x2="540" y2="215" {...stroke} strokeDasharray="3 5" strokeOpacity={0.5} />
      <rect x="70" y="200" width="170" height="120" rx="6" {...fill(0.03)} {...stroke} />
      <rect x="86" y="218" width="60" height="8" rx="2" {...fill(0.6)} />
      <text x="86" y="296" fill="var(--color-bone)" fillOpacity="0.45" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.5">
        HORS LIGNE
      </text>
      <line x1="240" y1="260" x2="300" y2="260" {...stroke} strokeDasharray="3 5" strokeOpacity={0.5} />
    </g>
  );
}

function Network() {
  const zones = [
    { x: 60, y: 70, w: 190, label: "IT" },
    { x: 305, y: 70, w: 190, label: "DMZ" },
    { x: 550, y: 70, w: 190, label: "OT" },
  ];
  return (
    <g>
      {zones.map((z, i) => (
        <g key={z.label}>
          <rect x={z.x} y={z.y} width={z.w} height="380" rx="6" {...fill(0.03)} {...stroke} strokeDasharray={i === 1 ? "0" : "4 5"} />
          <text x={z.x + 16} y={z.y + 28} fill="var(--color-bone)" fillOpacity="0.5" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="2">
            ZONE {z.label}
          </text>
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={z.x + 24 + (k % 2) * 80} y={z.y + 70 + Math.floor(k / 2) * 110} width="60" height="60" rx="6" {...fill(i === 1 ? 0.12 : 0.07)} {...stroke} />
          ))}
        </g>
      ))}
      <line x1="250" y1="260" x2="305" y2="260" stroke="var(--color-signal)" strokeWidth="1.5" />
      <line x1="495" y1="260" x2="550" y2="260" stroke="var(--color-signal)" strokeWidth="1.5" />
      <rect x="391" y="246" width="28" height="28" rx="5" {...signal} />
      <rect x="60" y="470" width="680" height="1" {...fill(0.2)} />
      <rect x="60" y="480" width="120" height="7" rx="2" {...fill(0.35)} />
    </g>
  );
}
