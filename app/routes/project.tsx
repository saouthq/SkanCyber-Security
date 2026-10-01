import { data } from "react-router";
import type { Route } from "./+types/project";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { Eyebrow } from "~/components/ui/Eyebrow";
import { ExampleBadge } from "~/components/ui/ExampleBadge";
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
    { k: "A", label: "Contexte", text: p.context },
    { k: "B", label: "Problème", text: p.problem },
    { k: "C", label: "Solution", text: p.solution },
  ];

  return (
    <PageShell>
      <PageHero
        index={p.index.replace("P.", "")}
        label="Étude de cas"
        title={p.title}
        lead={p.summary}
        meta={
          <div className="flex flex-col gap-8">
            <ExampleBadge label="Étude de cas fictive — à remplacer" />
            <dl className="grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--line)] pt-6 md:grid-cols-4">
              {[
                ["Client", p.client],
                ["Secteur", p.sector],
                ["Année", p.year],
                ["Périmètre", p.services.join(", ")],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="t-small">{k}</dt>
                  <dd className="mt-1 text-ui font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <div className="shell">
        <figure>
          <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_0_0_1px_var(--line)]" data-reveal="mask">
            <div data-parallax="0.05">
              <ProjectVisual kind={p.visual} className="w-full scale-[1.08]" />
            </div>
          </div>
          <figcaption className="t-small mt-4">Visuel schématique provisoire — à remplacer par des captures du projet.</figcaption>
        </figure>
      </div>

      <section aria-label="Récit du projet" className="section">
        <div className="shell">
          {story.map((s) => (
            <div key={s.k} className="grid gap-6 border-t border-[var(--line)] py-12 lg:grid-cols-12 lg:py-16">
              <div className="lg:col-span-3">
                <Eyebrow index={s.k}>{s.label}</Eyebrow>
              </div>
              <h2 className="sr-only">{s.label}</h2>
              <p data-reveal="lines" className="t-statement lg:col-span-9">
                {s.text}
              </p>
            </div>
          ))}
          <div className="grid gap-6 border-t border-[var(--line)] pt-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Eyebrow index="D">Points clés</Eyebrow>
            </div>
            <ol className="grid gap-x-12 sm:grid-cols-2 lg:col-span-9" data-reveal="stagger">
              {p.solutionPoints.map((pt, k) => (
                <li key={pt} className="flex gap-5 border-b border-[var(--line)] py-6">
                  <span className="t-num">{String(k + 1).padStart(2, "0")}</span>
                  <span className="text-body">{pt}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="archi-title" className="section bg-white">
        <div className="shell">
          <Eyebrow index="E">Architecture</Eyebrow>
          <h2 id="archi-title" data-reveal="lines" className="t-display-m mt-8">
            Vue d'ensemble <span className="accent">du</span> système
          </h2>
          <ArchitectureFlow nodes={p.architecture} />
          <ul className="mt-14 flex flex-wrap gap-2" data-reveal="stagger">
            {p.stack.map((t) => (
              <li key={t} className="rounded-full bg-paper px-4 py-2 text-ui text-ink-2">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="results-title" className="section">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Eyebrow index="F">Résultats</Eyebrow>
            <ExampleBadge label="Chiffres d'exemple" />
          </div>
          <h2 id="results-title" className="sr-only">
            Résultats
          </h2>
          <dl className="mt-12 grid border-t border-[var(--line)] md:grid-cols-3" data-reveal="stagger">
            {p.results.map((r) => (
              <div key={r.label} className="border-b border-[var(--line)] py-10 md:border-b-0 md:border-r md:px-10 md:first:pl-0 md:last:border-r-0">
                <dt className="sr-only">{r.label}</dt>
                <dd>
                  <span className="t-figure block">{r.value}</span>
                  <span className="t-body mt-4 block max-w-[18rem]">{r.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-label="Galerie" className="shell pb-[var(--spacing-section)]">
        <div className="grid gap-4 md:grid-cols-2">
          {["Capture d'écran", "Démonstration vidéo"].map((label) => (
            <div
              key={label}
              className="flex aspect-[16/10] items-center justify-center rounded-[1.25rem] bg-stone"
              data-reveal="fade"
            >
              <span className="placeholder-tag">{label} — emplacement réservé</span>
            </div>
          ))}
        </div>
      </section>

      <nav aria-label="Projet suivant" className="border-t border-[var(--line)]">
        <TLink to={`/projets/${next.slug}`} data-cursor="Suivant" className="group block">
          <div className="shell flex items-end justify-between gap-8 py-[var(--spacing-section-sm)]">
            <span>
              <span className="t-eyebrow">Projet suivant</span>
              <span className="t-display-l mt-4 block transition-transform duration-700 group-hover:translate-x-3">{next.title}</span>
            </span>
            <span aria-hidden className="t-display-m text-ink-3 transition-colors duration-500 group-hover:text-ink">
              →
            </span>
          </div>
        </TLink>
      </nav>
    </PageShell>
  );
}
