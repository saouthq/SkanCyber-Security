import { data } from "react-router";
import type { Route } from "./+types/service";
import { CtaBand } from "~/components/layout/CtaBand";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { SectionMarker } from "~/components/ui/SectionMarker";
import { TLink } from "~/components/ui/TLink";
import { ArrowRight } from "~/components/ui/Icons";
import { BitGlyph } from "~/components/visuals/BitGlyph";
import { getService, services } from "~/content/services";
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
  const i = services.indexOf(s);
  const next = services[(i + 1) % services.length];

  return (
    <PageShell>
      <PageHero
        index={`01.${s.index}`}
        label="Service"
        title={s.name}
        lead={s.tagline}
        titleClassName="t-h1 max-w-[16ch]"
        aside={
          <div className="rounded-[6px] border border-[var(--line)] bg-graphite p-6">
            <BitGlyph glyph={s.glyph} className="w-full" label={`Visualisation — ${s.name}`} />
            <p className="t-label mt-5 flex justify-between text-smoke">
              <span>Fig. {s.index}</span>
              <span>{s.name}</span>
            </p>
          </div>
        }
      />

      <section className="shell grid gap-10 border-t border-[var(--line)] py-20 md:py-28 lg:grid-cols-12" aria-labelledby="intro-title">
        <h2 id="intro-title" className="sr-only">
          Notre approche
        </h2>
        <p className="t-label text-ash lg:col-span-3" data-reveal="fade">
          Approche
        </p>
        <p data-reveal="lines" className="t-statement text-[clamp(1.6rem,2.8vw,2.75rem)] lg:col-span-9">
          {s.intro}
        </p>
      </section>

      <section className="shell py-20 md:py-28" aria-labelledby="capabilities-title">
        <SectionMarker index="A" label="Ce que nous faisons" />
        <h2 id="capabilities-title" className="sr-only">
          Ce que nous faisons
        </h2>
        <ol className="mt-12 grid border-t border-[var(--line)] md:grid-cols-2" data-reveal="stagger">
          {s.capabilities.map((c, k) => (
            <li key={c.title} className="border-b border-[var(--line)] py-8 md:odd:border-r md:odd:pr-10 md:even:pl-10">
              <span className="t-label text-signal">{String(k + 1).padStart(2, "0")}</span>
              <h3 className="t-h3 mt-4">{c.title}</h3>
              <p className="t-body mt-3 max-w-[28rem]">{c.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell py-20 md:py-28" aria-labelledby="approach-title">
        <SectionMarker index="B" label="Déroulé" />
        <h2 id="approach-title" data-reveal="lines" className="t-display t-h2 mt-8">
          Comment nous procédons
        </h2>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[6px] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4" data-reveal="fade">
          {s.approach.map((a, k) => (
            <li key={a.title} className="bg-ink p-7">
              <span className="t-label text-smoke">Étape {k + 1}</span>
              <h3 className="t-h3 mt-10">{a.title}</h3>
              <p className="t-body mt-3 text-[0.95rem]">{a.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell grid gap-16 py-20 md:grid-cols-2 md:py-28" aria-label="Livrables et technologies">
        <div>
          <SectionMarker index="C" label="Livrables" />
          <ul className="mt-10 border-t border-[var(--line)]" data-reveal="stagger">
            {s.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-4 border-b border-[var(--line)] py-4 text-bone">
                <span className="h-[6px] w-[6px] rounded-[1px] bg-signal" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionMarker index="D" label="Technologies & référentiels" />
          <ul className="mt-10 flex flex-wrap gap-2" data-reveal="stagger">
            {s.stack.map((t) => (
              <li key={t} className="t-mono rounded-[3px] border border-[var(--line)] px-3 py-2 text-ash">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <nav aria-label="Service suivant" className="border-t border-[var(--line)]">
        <TLink to={`/services/${next.slug}`} data-cursor="Suivant" className="group shell flex items-center justify-between gap-8 py-16 md:py-24">
          <span>
            <span className="t-label text-smoke">Service suivant — {next.index}</span>
            <span className="t-display mt-4 block text-[clamp(2.2rem,6vw,6rem)] leading-none transition-colors duration-500 group-hover:text-signal">
              {next.name}
            </span>
          </span>
          <span className="hidden w-28 shrink-0 md:block">
            <BitGlyph glyph={next.glyph} className="w-full" />
          </span>
          <ArrowRight className="h-5 w-7 shrink-0 transition-transform duration-500 group-hover:translate-x-2 md:hidden" />
        </TLink>
      </nav>

      <CtaBand />
    </PageShell>
  );
}
