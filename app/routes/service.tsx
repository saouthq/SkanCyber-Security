import { data } from "react-router";
import type { Route } from "./+types/service";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { Eyebrow } from "~/components/ui/Eyebrow";
import { TLink } from "~/components/ui/TLink";
import { getService, pillarOf, services } from "~/content/services";
import { seo } from "~/lib/seo";

export function loader({ params }: Route.LoaderArgs) {
  const service = getService(params.slug);
  if (!service) throw data(null, { status: 404 });
  return { slug: service.slug };
}

export const meta: Route.MetaFunction = ({ params }) => {
  const s = getService(params.slug);
  if (!s) return [{ title: "Service introuvable — SkanCyber" }];
  return seo({ title: s.name, description: s.summary, path: `/services/${s.slug}` });
};

export default function ServicePage({ loaderData }: Route.ComponentProps) {
  const s = getService(loaderData.slug)!;
  const pillar = pillarOf(s);
  const next = services[(services.indexOf(s) + 1) % services.length];

  return (
    <PageShell>
      <PageHero
        index={s.index}
        label={`${pillar.verb} — ${pillar.name}`}
        title={s.name}
        lead={s.tagline}
      />

      <section className="section border-t border-[var(--line)]" aria-labelledby="approach-intro">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow index="A">Notre approche</Eyebrow>
          </div>
          <p id="approach-intro" data-reveal="lines" className="t-statement lg:col-span-9">
            {s.intro}
          </p>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="capabilities-title">
        <div className="shell">
          <Eyebrow index="B">Ce que nous faisons</Eyebrow>
          <h2 id="capabilities-title" data-reveal="lines" className="t-display-m mt-8 max-w-[18ch]">
            Des interventions <span className="accent">précises.</span>
          </h2>
          <ol className="mt-16 grid border-t border-[var(--line)] md:grid-cols-2" data-reveal="stagger">
            {s.capabilities.map((c, k) => (
              <li key={c.title} className="border-b border-[var(--line)] py-10 md:odd:border-r md:odd:pr-12 md:even:pl-12">
                <span className="t-num">{String(k + 1).padStart(2, "0")}</span>
                <h3 className="t-title mt-5">{c.title}</h3>
                <p className="t-body mt-3 max-w-[30rem]">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="steps-title">
        <div className="shell">
          <Eyebrow index="C">Déroulé</Eyebrow>
          <h2 id="steps-title" data-reveal="lines" className="t-display-m mt-8">
            Comment nous procédons
          </h2>
          <ol className="mt-16 grid gap-10 border-t border-[var(--line)] pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8" data-reveal="stagger">
            {s.approach.map((a, k) => (
              <li key={a.title}>
                <span className="t-num">{String(k + 1).padStart(2, "0")}</span>
                <h3 className="t-title mt-5">{a.title}</h3>
                <p className="t-small mt-3">{a.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-stone" aria-label="Livrables et technologies">
        <div className="shell grid gap-16 md:grid-cols-2">
          <div>
            <Eyebrow index="D">Livrables</Eyebrow>
            <ul className="mt-10 border-t border-[var(--line)]" data-reveal="stagger">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-4 border-b border-[var(--line)] py-4 text-body">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow index="E">Technologies et référentiels</Eyebrow>
            <ul className="mt-10 flex flex-wrap gap-2" data-reveal="stagger">
              {s.stack.map((t) => (
                <li key={t} className="rounded-full bg-white px-4 py-2 text-ui text-ink-2 shadow-[0_0_0_1px_var(--line)]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <nav aria-label="Service suivant" className="border-t border-[var(--line)]">
        <TLink to={`/services/${next.slug}`} data-cursor="Suivant" className="group block">
          <div className="shell flex items-end justify-between gap-8 py-[var(--spacing-section-sm)]">
            <span>
              <span className="t-eyebrow">Service suivant</span>
              <span className="t-display-l mt-4 block transition-transform duration-700 group-hover:translate-x-3">{next.name}</span>
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
