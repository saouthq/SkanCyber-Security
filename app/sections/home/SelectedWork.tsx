import { useRef } from "react";
import { gsap } from "~/animations/gsap";
import { projects } from "~/content/projects";
import { useIntro } from "~/hooks/useIntro";
import { Button } from "~/components/ui/Button";
import { ExampleBadge } from "~/components/ui/ExampleBadge";
import { Eyebrow } from "~/components/ui/Eyebrow";
import { TLink } from "~/components/ui/TLink";
import { ProjectVisual } from "~/components/visuals/ProjectVisual";

/**
 * Projets choisis. Desktop : défilement horizontal épinglé, les visuels
 * glissent dans leur cadre. Mobile : pile verticale, images pleine largeur.
 */
export function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIntro(root, (reduced) => {
    if (reduced) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 64rem)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
      });
      el.querySelectorAll<HTMLElement>("[data-pv]").forEach((pv) => {
        gsap.fromTo(
          pv,
          { xPercent: -5 },
          { xPercent: 5, ease: "none", scrollTrigger: { trigger: pv, containerAnimation: tween, start: "left right", end: "right left", scrub: true } },
        );
      });
      gsap.to(root.current!.querySelector("[data-progress]"), {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
      });
    });
  });

  return (
    <section ref={root} aria-labelledby="work-title" className="relative overflow-hidden lg:h-[100svh]">
      <div
        ref={track}
        className="flex flex-col gap-20 py-[var(--spacing-section)] lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-[5vw] lg:py-0 lg:pl-[var(--gutter)] lg:pr-[10vw]"
      >
        <div className="shell shrink-0 lg:w-[30vw] lg:px-0">
          <Eyebrow index="04">Projets</Eyebrow>
          <h2 id="work-title" data-reveal="lines" className="t-display-m mt-8">
            Des problèmes concrets, des systèmes <span className="accent">qui tiennent.</span>
          </h2>
          <p data-reveal="fade" className="t-body mt-6 max-w-[26rem]">
            Chaque projet commence par un problème réel et se termine par un système en production.
          </p>
          <div data-reveal="fade" className="mt-10 flex flex-wrap items-center gap-4">
            <Button to="/projets" variant="ghost">
              Tous les projets
            </Button>
            <ExampleBadge label="Projets d'exemple" />
          </div>
        </div>

        {projects.map((p) => (
          <article key={p.slug} className="shell shrink-0 lg:w-[58vw] lg:max-w-[64rem] lg:px-0">
            <TLink to={`/projets/${p.slug}`} data-cursor="Ouvrir" className="group block">
              <div className="overflow-hidden rounded-[1.25rem] bg-white shadow-[0_0_0_1px_var(--line)]">
                <div data-pv className="scale-[1.12] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.16]">
                  <ProjectVisual kind={p.visual} className="w-full" />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <h3 className="t-title">
                  <span className="t-num mr-3">{p.index.replace("P.", "")}</span>
                  {p.title}
                </h3>
                <p className="t-small">
                  {p.sector} · {p.services.join(", ")}
                </p>
              </div>
            </TLink>
          </article>
        ))}
      </div>

      <div aria-hidden className="absolute bottom-10 left-[var(--gutter)] right-[var(--gutter)] hidden h-px bg-[var(--line)] lg:block">
        <div data-progress className="h-full origin-left scale-x-0 bg-ink" />
      </div>
    </section>
  );
}
