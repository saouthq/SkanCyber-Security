import { useRef } from "react";
import { gsap } from "~/animations/gsap";
import { projects } from "~/content/projects";
import { useIntro } from "~/hooks/useIntro";
import { Button } from "~/components/ui/Button";
import { ExampleBadge } from "~/components/ui/ExampleBadge";
import { SectionMarker } from "~/components/ui/SectionMarker";
import { TLink } from "~/components/ui/TLink";
import { ProjectVisual } from "~/components/visuals/ProjectVisual";

/**
 * § 04 — Travaux choisis. Desktop : défilement horizontal épinglé, les
 * visuels glissent légèrement à l'intérieur de leur cadre (parallaxe).
 * Mobile : pile verticale simple.
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
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      el.querySelectorAll<HTMLElement>("[data-pv]").forEach((pv) => {
        gsap.fromTo(
          pv,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: pv, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
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
    <section ref={root} aria-labelledby="work-title" className="relative overflow-hidden bg-ink lg:h-[100svh]">
      <div
        ref={track}
        className="flex flex-col gap-16 py-28 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-[6vw] lg:py-0 lg:pl-[var(--gutter)] lg:pr-[12vw]"
      >
        <div className="shell shrink-0 lg:w-[34vw] lg:max-w-[34rem] lg:px-0">
          <SectionMarker index="04" label="Travaux choisis" />
          <h2 id="work-title" data-reveal="lines" className="t-display mt-8 text-[clamp(2.1rem,3.6vw,4rem)] leading-[0.98]">
            Des problèmes concrets. Des systèmes qui tiennent.
          </h2>
          <p data-reveal="fade" className="t-body mt-6 max-w-[26rem]">
            Chaque projet commence par un problème concret et se termine par un système qui tient. Quelques exemples de ce que
            nous construisons.
          </p>
          <div data-reveal="fade" className="mt-8 flex flex-wrap items-center gap-4">
            <Button to="/projets" variant="ghost">
              Tous les projets
            </Button>
            <ExampleBadge label="Projets d'exemple" />
          </div>
        </div>

        {projects.map((p) => (
          <article key={p.slug} className="shell shrink-0 lg:w-[56vw] lg:max-w-[60rem] lg:px-0">
            <TLink to={`/projets/${p.slug}`} data-cursor="Ouvrir" className="group block">
              <div className="relative overflow-hidden rounded-[6px] border border-[var(--line)]">
                <div data-pv className="scale-[1.14] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.18]">
                  <ProjectVisual kind={p.visual} className="w-full" />
                </div>
                <span className="t-label absolute left-4 top-4 rounded-[3px] bg-ink/80 px-2 py-1 text-bone">{p.index}</span>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <h3 className="t-h3 transition-colors duration-500 group-hover:text-signal">{p.title}</h3>
                  <p className="t-body mt-2 max-w-[36rem] text-[0.95rem]">{p.summary}</p>
                </div>
                <p className="t-label text-smoke md:text-right">
                  {p.sector}
                  <br />
                  {p.services.join(" · ")}
                </p>
              </div>
            </TLink>
          </article>
        ))}
      </div>

      <div aria-hidden className="absolute bottom-10 left-[var(--gutter)] right-[var(--gutter)] hidden h-px bg-[var(--line)] lg:block">
        <div data-progress className="h-full origin-left scale-x-0 bg-signal" />
      </div>
    </section>
  );
}
