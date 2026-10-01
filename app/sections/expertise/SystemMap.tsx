import { useEffect, useRef, useState } from "react";
import { gsap } from "~/animations/gsap";
import { domains, links, type DomainId } from "~/content/expertise";
import { prefersReducedMotion } from "~/lib/env";

const W = 1000;
const H = 640;
const byId = Object.fromEntries(domains.map((d) => [d.id, d])) as Record<DomainId, (typeof domains)[number]>;

/**
 * Carte d'architecture interactive. Chaque domaine est un bouton ; la
 * sélection allume ses connexions. La sécurité n'est pas un nœud comme les
 * autres : c'est le périmètre qui entoure la carte.
 */
export function SystemMap() {
  const [active, setActive] = useState<DomainId>("backend");
  const [hover, setHover] = useState<DomainId | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const focus = hover ?? active;
  const domain = byId[active];

  const connected = (id: DomainId) =>
    focus === "security" || id === focus || links.some(([a, b]) => (a === focus && b === id) || (b === focus && a === id));

  useEffect(() => {
    if (!panel.current || prefersReducedMotion()) return;
    gsap.fromTo(
      panel.current.querySelectorAll("[data-panel-item]"),
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.04, ease: "lock" },
    );
  }, [active]);

  const select = (id: DomainId) => setActive(id);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      {/* Carte (tablette et desktop) */}
      <div className="relative hidden md:block lg:col-span-8" data-reveal="fade">
        <div className="relative" style={{ aspectRatio: `${W} / ${H + 40}` }}>
          <svg viewBox={`0 0 ${W} ${H + 40}`} className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <pattern id="map-dots" width="25" height="25" patternUnits="userSpaceOnUse">
                <rect x="12" y="12" width="1.5" height="1.5" rx="0.75" fill="var(--color-ink)" fillOpacity="0.12" />
              </pattern>
            </defs>
            <rect width={W} height={H + 40} fill="url(#map-dots)" />
            {/* Périmètre = sécurité */}
            <rect
              x="20"
              y="30"
              width={W - 40}
              height={H - 40}
              rx="10"
              fill="none"
              strokeDasharray={focus === "security" ? "0" : "6 8"}
              stroke={focus === "security" ? "var(--color-amber)" : "var(--color-ink)"}
              strokeOpacity={focus === "security" ? 1 : 0.2}
              className="transition-all duration-700"
            />
            {/* Rangées de couches */}
            {[
              [110, "Interface"],
              [270, "Logique"],
              [400, "Données"],
              [530, "Fondations"],
            ].map(([y, l]) => (
              <text key={l} x="40" y={Number(y) - 44} fill="var(--color-ink)" fillOpacity="0.4" fontFamily="var(--font-sans)" fontSize="13" letterSpacing="0.2">
                {l}
              </text>
            ))}
            {links.map(([a, b]) => {
              const on = focus !== "security" && (a === focus || b === focus);
              const A = byId[a];
              const B = byId[b];
              return (
                <line
                  key={`${a}-${b}`}
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke={on ? "var(--color-ink)" : "var(--color-ink)"}
                  strokeOpacity={on ? 0.85 : focus === "security" ? 0.3 : 0.12}
                  strokeWidth={on ? 1.5 : 1}
                  className={`transition-all duration-500 ${on ? "map-flow" : ""}`}
                />
              );
            })}
          </svg>

          {domains
            .filter((d) => d.id !== "security")
            .map((d) => {
              const lit = connected(d.id);
              const isActive = active === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => select(d.id)}
                  onPointerEnter={() => setHover(d.id)}
                  onPointerLeave={() => setHover(null)}
                  onFocus={() => setHover(d.id)}
                  onBlur={() => setHover(null)}
                  aria-pressed={isActive}
                  className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full px-4 py-2.5 text-ui transition-all duration-500 ${
                    isActive
                      ? "bg-ink text-paper"
                      : lit
                        ? "bg-white text-ink shadow-[0_0_0_1px_var(--line-strong)]"
                        : "bg-paper text-ink-3 shadow-[0_0_0_1px_var(--line)]"
                  }`}
                  style={{ left: `${(d.x / W) * 100}%`, top: `${(d.y / (H + 40)) * 100}%` }}
                >
                  <span className="leading-none">{d.name}</span>
                </button>
              );
            })}

          <button
            type="button"
            onClick={() => select("security")}
            onPointerEnter={() => setHover("security")}
            onPointerLeave={() => setHover(null)}
            onFocus={() => setHover("security")}
            onBlur={() => setHover(null)}
            aria-pressed={active === "security"}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-2.5 text-ui font-medium transition-all duration-500 ${
              active === "security" ? "bg-amber text-ink" : "bg-paper text-amber-ink shadow-[0_0_0_1px_var(--color-amber)]"
            }`}
            style={{ left: "50%", top: `${((H - 10) / (H + 40)) * 100}%` }}
          >
            Sécurité — elle entoure tout
          </button>
        </div>
      </div>

      {/* Sélecteur (mobile) */}
      <div className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] md:hidden">
        <div className="flex w-max gap-2" role="group" aria-label="Domaines d'expertise">
          {domains.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => select(d.id)}
              aria-pressed={active === d.id}
              className={`rounded-full px-4 py-2.5 text-ui ${active === d.id ? "bg-ink text-paper" : "text-ink-2 shadow-[0_0_0_1px_var(--line-strong)]"}`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      {/* Panneau de détail */}
      <div ref={panel} className="lg:col-span-4" aria-live="polite">
        <div className="rounded-[1.25rem] bg-white p-7 shadow-[0_0_0_1px_var(--line)] md:p-9">
          <p data-panel-item className="t-eyebrow">Domaine</p>
          <h3 data-panel-item className="t-display-m mt-4">
            {domain.name}
          </h3>
          <p data-panel-item className="t-body mt-5">
            {domain.text}
          </p>
          <p data-panel-item className="t-eyebrow mt-8">
            Pratiques
          </p>
          <ul className="mt-3 border-t border-[var(--line)]">
            {domain.practices.map((p) => (
              <li key={p} data-panel-item className="flex items-center gap-3 border-b border-[var(--line)] py-3 text-ui">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
          <p data-panel-item className="t-eyebrow mt-8">
            Technologies
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {domain.tech.map((t) => (
              <li key={t} data-panel-item className="rounded-full bg-paper px-3 py-1.5 text-caption text-ink-2">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
