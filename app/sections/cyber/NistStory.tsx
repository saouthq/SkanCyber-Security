import { useRef, useState } from "react";
import { ScrollTrigger } from "~/animations/gsap";
import { nistFunctions } from "~/content/company";
import { useIntro } from "~/hooks/useIntro";
import { SectionMarker } from "~/components/ui/SectionMarker";
import { PhaseGrid } from "./PhaseGrid";

/**
 * Narration épinglée : la grille reste à l'écran (desktop) et se
 * réorganise à chaque fonction du NIST CSF 2.0 traversée.
 */
export function NistStory() {
  const root = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);

  useIntro(root, () => {
    root.current!.querySelectorAll<HTMLElement>("[data-phase]").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setPhase(Number(el.dataset.phase)),
      });
    });
  });

  const current = nistFunctions[phase];

  return (
    <section ref={root} aria-labelledby="nist-title" className="border-t border-[var(--line)] py-24 md:py-36">
      <div className="shell">
        <SectionMarker index="04.A" label="Méthode — NIST CSF 2.0" />
        <h2 id="nist-title" data-reveal="lines" className="t-display t-h2 mt-8 max-w-[18ch]">
          Six fonctions, un cycle continu.
        </h2>
        <p data-reveal="fade" className="t-body mt-6 max-w-[36rem]">
          Nous structurons nos missions selon le NIST Cybersecurity Framework 2.0, un référentiel public et reconnu. Il
          permet de savoir où vous en êtes, ce qui manque et dans quel ordre agir.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+3rem)]">
              <div className="rounded-[6px] border border-[var(--line)] bg-graphite p-8">
                <div className="flex items-center justify-between">
                  <span className="t-label text-signal">{current.code}</span>
                  <span className="t-label text-smoke">
                    {String(phase + 1).padStart(2, "0")} / {String(nistFunctions.length).padStart(2, "0")}
                  </span>
                </div>
                <PhaseGrid phase={current.id} className="mt-8 w-full" />
                <p className="t-h3 mt-8">{current.name}</p>
              </div>
              <ol className="mt-4 grid grid-cols-6 gap-1" aria-hidden>
                {nistFunctions.map((f, i) => (
                  <li key={f.id} className={`h-[3px] rounded-full transition-colors duration-500 ${i <= phase ? "bg-signal" : "bg-bone/10"}`} />
                ))}
              </ol>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {nistFunctions.map((f, i) => (
              <li key={f.id} data-phase={i} className="border-t border-[var(--line)] py-12 lg:flex lg:min-h-[70svh] lg:flex-col lg:justify-center lg:py-16">
                <div className="mb-8 max-w-[14rem] rounded-[6px] border border-[var(--line)] bg-graphite p-4 lg:hidden">
                  <PhaseGrid phase={f.id} className="w-full" />
                </div>
                <p className="t-label flex gap-3">
                  <span className="text-signal">{f.code}</span>
                  <span className="text-smoke">Fonction {String(i + 1).padStart(2, "0")}</span>
                </p>
                <h3 className="t-display mt-5 text-[clamp(2.2rem,4vw,3.8rem)] leading-none">{f.name}</h3>
                <p className="t-lead mt-6 max-w-[32rem] text-ash">{f.text}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {f.actions.map((a) => (
                    <li key={a} className="t-mono rounded-[3px] border border-[var(--line)] px-3 py-2 text-[0.75rem] text-bone">
                      {a}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
