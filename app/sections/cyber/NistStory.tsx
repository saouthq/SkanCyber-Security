import { useRef, useState } from "react";
import { ScrollTrigger } from "~/animations/gsap";
import { nistFunctions } from "~/content/company";
import { useIntro } from "~/hooks/useIntro";
import { Eyebrow } from "~/components/ui/Eyebrow";

/**
 * Récit épinglé : à gauche, la fonction en cours (grand chiffre, nom, progression) ;
 * à droite, les six fonctions du NIST CSF 2.0 défilent.
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
    <section ref={root} aria-labelledby="nist-title" className="section bg-white">
      <div className="shell">
        <Eyebrow index="B">Méthode — NIST CSF 2.0</Eyebrow>
        <h2 id="nist-title" data-reveal="lines" className="t-display-l mt-8 max-w-[16ch]">
          Six fonctions, <span className="accent">un</span> cycle continu.
        </h2>
        <p data-reveal="fade" className="t-lead mt-8 max-w-[38rem]">
          Nous structurons nos missions selon le NIST Cybersecurity Framework 2.0, un référentiel public et reconnu. Il
          permet de savoir où vous en êtes, ce qui manque et dans quel ordre agir.
        </p>

        <div className="mt-[var(--spacing-section-sm)] grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+3rem)]" aria-hidden>
              <p className="t-num text-5xl">{String(phase + 1).padStart(2, "0")}</p>
              <p className="t-display-l mt-4">{current.name}</p>
              <ol className="mt-10 grid grid-cols-6 gap-1.5">
                {nistFunctions.map((f, i) => (
                  <li key={f.id} className={`h-1 rounded-full transition-colors duration-500 ${i <= phase ? "bg-amber" : "bg-ink/10"}`} />
                ))}
              </ol>
              <p className="t-small mt-4">
                {nistFunctions.map((f) => f.name).join(" · ")}
              </p>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {nistFunctions.map((f, i) => (
              <li
                key={f.id}
                data-phase={i}
                className="border-t border-[var(--line)] py-12 lg:flex lg:min-h-[64svh] lg:flex-col lg:justify-center lg:py-16"
              >
                <p className="t-eyebrow flex items-baseline gap-3">
                  <span className="t-mark">({String(i + 1).padStart(2, "0")})</span>
                  Fonction {f.code}
                </p>
                <h3 className="t-display-m mt-5">{f.name}</h3>
                <p className="t-lead mt-6 max-w-[32rem]">{f.text}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {f.actions.map((a) => (
                    <li key={a} className="rounded-full bg-paper px-4 py-2 text-ui text-ink-2">
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
