import { useRef } from "react";
import { gsap } from "~/animations/gsap";
import { useIntro } from "~/hooks/useIntro";

type Node = { label: string; detail: string };

/**
 * Schéma d'architecture simplifié : composants reliés de gauche à droite
 * (de haut en bas sur mobile). Les liaisons se tracent au scroll, puis un
 * paquet parcourt la chaîne en boucle.
 */
export function ArchitectureFlow({ nodes }: { nodes: Node[] }) {
  const root = useRef<HTMLOListElement>(null);

  useIntro(root, (reduced) => {
    if (reduced) return;
    const q = gsap.utils.selector(root);
    gsap
      .timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", once: true } })
      .from(q("[data-node]"), { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.12, ease: "lock" }, 0)
      .from(q("[data-link]"), { scaleX: 0, scaleY: 0, duration: 0.5, stagger: 0.12, ease: "precise" }, 0.25);
  });

  return (
    <ol ref={root} className="arch-flow mt-14 grid gap-3 lg:grid-flow-col lg:auto-cols-fr lg:gap-0">
      {nodes.map((n, i) => (
        <li key={n.label} className="relative flex flex-col lg:flex-row lg:items-center">
          <div data-node className="relative z-[1] flex-1 rounded-[6px] border border-[var(--line-strong)] bg-ink p-5">
            <span className="t-label text-signal">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-4 text-bone">{n.label}</p>
            <p className="t-mono mt-1 text-[0.75rem] text-smoke">{n.detail}</p>
          </div>
          {i < nodes.length - 1 && (
            <span aria-hidden className="relative mx-auto h-6 w-px shrink-0 overflow-hidden lg:mx-0 lg:h-px lg:w-8">
              <span data-link className="absolute inset-0 origin-top bg-[var(--line-strong)] lg:origin-left" />
              <span className="arch-packet absolute bg-signal" style={{ animationDelay: `${i * 0.35}s` }} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
