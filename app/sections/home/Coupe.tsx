import { useRef } from "react";
import { gsap, ScrollTrigger } from "~/animations/gsap";
import { layers, services } from "~/content/services";
import { useIntro } from "~/hooks/useIntro";
import type { SystemState } from "~/webgl/system-state";
import { SectionMarker } from "~/components/ui/SectionMarker";
import { TLink } from "~/components/ui/TLink";
import { ArrowRight } from "~/components/ui/Icons";

/**
 * § 02 — La Coupe. Le système s'éclate en couches ; chaque bloc de texte
 * met sa couche en avant. À la fin, le périmètre se referme sur l'ensemble :
 * la sécurité n'est pas une couche de plus, c'est l'enveloppe.
 */
export function Coupe({ state }: { state: SystemState }) {
  const root = useRef<HTMLElement>(null);

  // Les ScrollTriggers dépendent de la mise en page finale : créés quand la page est prête.
  useIntro(root, () => {
    const el = root.current!;
    const mm = gsap.matchMedia();

    mm.add({ desktop: "(min-width: 64rem)", mobile: "(max-width: 63.99rem)" }, (ctx) => {
      const desktop = ctx.conditions?.desktop;
      state.offsetX = desktop ? 0.27 : 0;
      state.offsetY = desktop ? 0.02 : 0.15;
      state.zoom = desktop ? 1.2 : 1.45;

      // Hero → coupe : le système s'ouvre et se décale
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top bottom", end: "top 15%", scrub: 1 } })
        .fromTo(
          state,
          { explode: 0, turn: 0, zoom: state.zoom, offsetX: state.offsetX, offsetY: state.offsetY },
          { explode: 1, turn: 0.28, zoom: 1, offsetX: desktop ? 0.24 : 0, offsetY: desktop ? 0 : -0.22, ease: "none" },
          0,
        );

      // Mise en avant progressive
      gsap.fromTo(state, { focus: 0 }, {
        focus: 1,
        ease: "none",
        scrollTrigger: { trigger: el.querySelector("[data-layer='0']"), start: "top 85%", end: "top 45%", scrub: true },
      });

      el.querySelectorAll<HTMLElement>("[data-layer]").forEach((block) => {
        const i = Number(block.dataset.layer);
        ScrollTrigger.create({
          trigger: block,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && gsap.to(state, { active: i, duration: 0.9, ease: "lock", overwrite: "auto" }),
        });
      });

      // Le périmètre se referme
      gsap
        .timeline({
          scrollTrigger: { trigger: el.querySelector("[data-envelope]"), start: "top 85%", end: "center 55%", scrub: 1 },
        })
        .fromTo(state, { focus: 1, explode: 1, turn: 0.28, zoom: 1, offsetX: desktop ? 0.24 : 0 }, { focus: 0, explode: 0.62, turn: 0.1, zoom: 1.12, offsetX: desktop ? 0.22 : 0, ease: "none", immediateRender: false }, 0)
        .fromTo(state, { envelope: 0 }, { envelope: 1, ease: "none", immediateRender: false }, 0.1);

      // Sortie : le système s'efface à mesure que la section suivante arrive
      gsap.fromTo(state, { opacity: 1 }, {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "bottom 85%", end: "bottom 20%", scrub: true },
      });
    });
  });

  const servicesFor = (layer: string) => services.filter((s) => s.layer === layer);

  return (
    <section ref={root} id="systeme" aria-labelledby="coupe-title" className="relative">
      <div className="shell flex min-h-[100svh] items-end pb-[12svh] lg:min-h-[80svh] lg:items-center lg:pb-0">
        <div className="coupe-card w-full lg:w-6/12">
          <SectionMarker index="01" label="Le système en coupe" />
          <h2 id="coupe-title" data-reveal="lines" className="t-display t-h2 mt-8 max-w-[14ch]">
            Quatre couches. Une seule exigence.
          </h2>
          <p data-reveal="fade" className="t-lead mt-8 max-w-[32rem] text-ash">
            Tout système numérique se lit en coupe : ce que l'on voit, ce qui décide, ce qui circule, ce qui soutient. Nous
            construisons chacune de ces couches — et nous les pensons ensemble.
          </p>
        </div>
      </div>

      {layers.map((layer, i) => (
        <div key={layer.id} data-layer={i} className="shell flex min-h-[100svh] items-end pb-[12svh] lg:items-center lg:pb-0">
          <article className="coupe-card w-full max-w-[34rem] lg:w-5/12">
            <div className="flex items-center gap-3">
              <span className="t-label text-signal">§ {layer.index}</span>
              <span className="h-px flex-1 bg-[var(--line)]" aria-hidden />
              <span className="t-label text-smoke">Couche {String(i + 1).padStart(2, "0")} / 04</span>
            </div>
            <h3 data-reveal="lines" className="t-display t-h2 mt-6">
              {layer.name}
            </h3>
            <p className="t-label mt-4 text-bone" data-reveal="fade">
              {layer.label}
            </p>
            <p className="t-body mt-5 max-w-[30rem]" data-reveal="fade">
              {layer.text}
            </p>
            <ul className="mt-8 border-t border-[var(--line)]" data-reveal="stagger">
              {servicesFor(layer.id).map((s) => (
                <li key={s.slug} className="border-b border-[var(--line)]">
                  <TLink
                    to={`/services/${s.slug}`}
                    className="group flex items-center justify-between gap-4 py-3.5 text-bone transition-colors hover:text-signal"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="t-label text-smoke">{s.index}</span>
                      <span>{s.name}</span>
                    </span>
                    <ArrowRight className="h-3 w-4 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                  </TLink>
                </li>
              ))}
            </ul>
          </article>
        </div>
      ))}

      <div data-envelope className="shell flex min-h-[130svh] items-center py-24">
        <div className="coupe-card max-w-[40rem] lg:w-6/12">
          <SectionMarker index="02" label="Le périmètre" />
          <p data-reveal="lines" className="t-display t-h2 mt-8">
            La sécurité n'est pas une couche.
          </p>
          <p data-reveal="lines" data-delay="0.15" className="t-display t-h2 mt-2 text-signal">
            C'est le périmètre.
          </p>
          <p data-reveal="fade" className="t-body mt-8 max-w-[30rem]">
            Elle ne s'ajoute pas à la fin d'un projet : elle se décide dans l'architecture, s'éprouve à chaque livraison et
            entoure chacune des couches que nous construisons.
          </p>
          <div data-reveal="fade" className="mt-8">
            <TLink to="/cybersecurite" className="t-label link-underline inline-flex items-center gap-3 text-bone">
              Notre approche de la cybersécurité <ArrowRight />
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}
