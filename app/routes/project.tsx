import { data } from "react-router";
import type { Route } from "./+types/project";
import { CtaBand } from "~/components/layout/CtaBand";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { ExampleBadge } from "~/components/ui/ExampleBadge";
import { SectionMarker } from "~/components/ui/SectionMarker";
import { TLink } from "~/components/ui/TLink";
import { ProjectVisual } from "~/components/visuals/ProjectVisual";
import { getProject, projects } from "~/content/projects";
import { seo } from "~/lib/seo";
import { ArchitectureFlow } from "~/sections/projects/ArchitectureFlow";

export function loader({ params }: Route.LoaderArgs) {
  const project = getProject(params.slug);
  if (!project) throw data(null, { status: 404 });
  return { slug: project.slug };
}

export const meta: Route.MetaFunction = ({ params }) => {
  const p = getProject(params.slug);
  if (!p) return [{ title: "Projet introuvable — SkanCyber" }];
  return seo({ title: p.title, description: p.summary, path: `/projets/${p.slug}`, type: "article" });
};

export default function ProjectPage({ loaderData }: Route.ComponentProps) {
  const p = getProject(loaderData.slug)!;
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  const story = [
    { k: "01", label: "Contexte", text: p.context },
    { k: "02", label: "Problème", text: p.problem },
    { k: "03", label: "Solution", text: p.solution },
  ];

  return (
    <PageShell>
      <PageHero
        index={`03.${p.index.slice(2)}`}
        label="Étude de cas"
        title={p.title}
        titleClassName="t-h1 max-w-[15ch]"
        lead={p.summary}
        meta={
          <dl className="grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 border-t border-[var(--line)] pt-6 md:grid-cols-4">
            {[
              ["Client", p.client],
              ["Secteur", p.sector],
              ["Année", p.year],
              ["Périmètre", p.services.join(", ")],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="t-label text-smoke">{k}</dt>
                <dd className="mt-2 text-[0.95rem] text-bone">{v}</dd>
              </div>
            ))}
          </dl>
        }
        aside={
          <p className="t-body flex flex-col items-start gap-3 text-[0.875rem]">
            <ExampleBadge label="Étude de cas fictive" />
            Contenu d'exemple destiné à illustrer la structure d'une étude de cas. À remplacer par un projet réel.
          </p>
        }
      />

      <div className="shell">
        <div className="overflow-hidden rounded-[6px] border border-[var(--line)]" data-reveal="scan">
          <div data-parallax="0.06" className="scale-[1.12]">
            <ProjectVisual kind={p.visual} className="w-full" />
          </div>
        </div>
        <p className="t-label mt-4 text-smoke">Fig. 01 — Visuel schématique provisoire</p>
      </div>

      <section aria-label="Récit du projet" className="shell py-24 md:py-36">
        {story.map((s) => (
          <div key={s.k} className="grid gap-6 border-t border-[var(--line)] py-12 lg:grid-cols-12 lg:py-16">
            <p className="t-label flex gap-3 lg:col-span-3" data-reveal="fade">
              <span className="text-signal">{s.k}</span>
              <span className="text-ash">{s.label}</span>
            </p>
            <h2 className="sr-only">{s.label}</h2>
            <p data-reveal="lines" className="t-statement text-[clamp(1.5rem,2.6vw,2.6rem)] lg:col-span-9">
              {s.text}
            </p>
          </div>
        ))}
        <div className="grid gap-6 border-t border-[var(--line)] pt-12 lg:grid-cols-12">
          <p className="t-label text-ash lg:col-span-3" data-reveal="fade">
            Points clés
          </p>
          <ul className="grid gap-px overflow-hidden rounded-[6px] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:col-span-9" data-reveal="fade">
            {p.solutionPoints.map((pt, k) => (
              <li key={pt} className="flex gap-4 bg-ink p-6">
                <span className="t-label text-signal">{String(k + 1).padStart(2, "0")}</span>
                <span className="text-bone">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="archi-title" className="border-t border-[var(--line)] bg-graphite py-24 md:py-32">
        <div className="shell">
          <SectionMarker index="A" label="Architecture" />
          <h2 id="archi-title" data-reveal="lines" className="t-display t-h2 mt-8">
            Vue d'ensemble du système
          </h2>
          <ArchitectureFlow nodes={p.architecture} />
          <ul className="mt-14 flex flex-wrap gap-2" data-reveal="stagger">
            {p.stack.map((t) => (
              <li key={t} className="t-mono rounded-[3px] border border-[var(--line)] px-3 py-2 text-ash">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="results-title" className="shell py-24 md:py-36">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionMarker index="B" label="Résultats" className="flex-1" />
          <ExampleBadge label="Chiffres d'exemple" />
        </div>
        <h2 id="results-title" className="sr-only">
          Résultats
        </h2>
        <dl className="mt-12 grid border-t border-[var(--line)] md:grid-cols-3" data-reveal="stagger">
          {p.results.map((r) => (
            <div key={r.label} className="border-b border-[var(--line)] py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <dt className="sr-only">{r.label}</dt>
              <dd>
                <span className="t-display block text-[clamp(3rem,6vw,5.5rem)] leading-none">{r.value}</span>
                <span className="t-body mt-4 block max-w-[18rem]">{r.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-label="Galerie" className="shell pb-24 md:pb-36">
        <div className="grid gap-4 md:grid-cols-2">
          {["Capture d'écran", "Démonstration vidéo"].map((label) => (
            <div
              key={label}
              className="flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-[6px] border border-dashed border-[var(--line-strong)] bg-graphite"
              data-reveal="fade"
            >
              <span className="h-[7px] w-[7px] rounded-[1.5px] bg-signal" aria-hidden />
              <span className="t-label text-ash">{label} — emplacement réservé</span>
            </div>
          ))}
        </div>
      </section>

      <nav aria-label="Projet suivant" className="border-t border-[var(--line)]">
        <TLink to={`/projets/${next.slug}`} data-cursor="Suivant" className="group block">
          <div className="shell py-16 md:py-24">
            <span className="t-label text-smoke">Projet suivant — {next.index}</span>
            <span className="t-display mt-4 block text-[clamp(2.4rem,7vw,7rem)] leading-[0.95] transition-colors duration-500 group-hover:text-signal">
              {next.title}
            </span>
          </div>
        </TLink>
      </nav>

      <CtaBand />
    </PageShell>
  );
}
