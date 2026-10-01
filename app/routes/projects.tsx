import { useEffect, useRef, useState } from "react";
import type { Route } from "./+types/projects";
import { gsap } from "~/animations/gsap";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { ExampleBadge } from "~/components/ui/ExampleBadge";
import { TLink } from "~/components/ui/TLink";
import { ProjectVisual } from "~/components/visuals/ProjectVisual";
import { projects } from "~/content/projects";
import { hasFinePointer, prefersReducedMotion } from "~/lib/env";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Projets",
    description: "Études de cas : contexte, problème, solution, architecture et résultats de projets logiciels et de cybersécurité.",
    path: "/projets",
  });

export default function Projects() {
  const list = useRef<HTMLUListElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Aperçu qui suit le curseur, avec une légère inclinaison liée à la vitesse
  useEffect(() => {
    const el = list.current;
    const pv = preview.current;
    if (!el || !pv || !hasFinePointer() || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(pv, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(pv, "y", { duration: 0.8, ease: "power3" });
    const skew = gsap.quickTo(pv, "skewX", { duration: 0.6, ease: "power3" });
    let last = 0;
    const move = (e: PointerEvent) => {
      xTo(e.clientX - 200);
      yTo(e.clientY - 140);
      skew(gsap.utils.clamp(-8, 8, (e.clientX - last) * 0.5));
      last = e.clientX;
    };
    const enter = (e: PointerEvent) => {
      gsap.set(pv, { x: e.clientX - 200, y: e.clientY - 140 });
      gsap.fromTo(pv, { clipPath: "inset(50% 50% 50% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, duration: 0.7, ease: "lock" });
    };
    const leave = () => gsap.to(pv, { clipPath: "inset(50% 50% 50% 50%)", duration: 0.5, ease: "precise" });
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <PageShell>
      <PageHero
        index="03"
        label="Projets"
        title={
          <>
            Des problèmes concrets, des systèmes <span className="accent">qui tiennent.</span>
          </>
        }
        lead="Chaque étude de cas suit la même structure : contexte, problème, solution, architecture, résultats. Les projets présentés ici sont des exemples illustratifs."
        meta={<ExampleBadge label="Projets d'exemple — à remplacer" />}
      />

      <section aria-label="Liste des projets" className="shell pb-[var(--spacing-section)]">
        <div className="t-small hidden grid-cols-[5rem_1fr_14rem_6rem_3rem] gap-6 border-b border-[var(--line)] pb-4 md:grid">
          <span>N°</span>
          <span>Projet</span>
          <span>Secteur</span>
          <span>Année</span>
          <span />
        </div>
        <ul ref={list} className="index-list">
          {projects.map((p, i) => (
            <li key={p.slug} className="border-b border-[var(--line)]" data-reveal="fade">
              <TLink
                to={`/projets/${p.slug}`}
                data-cursor="Ouvrir"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="index-row group grid gap-4 py-8 md:grid-cols-[5rem_1fr_14rem_6rem_3rem] md:items-center md:gap-6 md:py-10"
              >
                <span className="t-num">{p.index.replace("P.", "")}</span>
                <span className="index-name t-index">{p.title}</span>
                <span className="t-small">{p.sector}</span>
                <span className="t-small">{p.year}</span>
                <span
                  aria-hidden
                  className="hidden h-10 w-10 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--line-strong)] transition-colors duration-500 group-hover:bg-amber group-hover:shadow-none md:grid"
                >
                  →
                </span>
                <span className="mt-2 block overflow-hidden rounded-[1rem] bg-white shadow-[0_0_0_1px_var(--line)] md:hidden">
                  <ProjectVisual kind={p.visual} className="w-full" />
                </span>
              </TLink>
            </li>
          ))}
        </ul>
      </section>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[26rem] overflow-hidden rounded-[1.25rem] bg-white opacity-0 shadow-[0_30px_60px_-30px_rgb(21_23_28/0.35),0_0_0_1px_var(--line)] md:block"
        style={{ visibility: "hidden" }}
      >
        <ProjectVisual key={projects[active].slug} kind={projects[active].visual} className="w-full" />
      </div>
    </PageShell>
  );
}
