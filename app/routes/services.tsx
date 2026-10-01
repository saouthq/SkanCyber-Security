import type { Route } from "./+types/services";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { TLink } from "~/components/ui/TLink";
import { pillars, servicesFor } from "~/content/services";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Services",
    description:
      "Cybersécurité, ingénierie logicielle, sites et applications web, mobiles, desktop, SaaS, automatisation, architecture et infrastructure.",
    path: "/services",
  });

export default function Services() {
  return (
    <PageShell>
      <PageHero
        index="01"
        label="Services"
        title={
          <>
            Protéger, construire, <span className="accent">relier.</span>
          </>
        }
        lead="Huit savoir-faire, organisés en trois métiers. Chacun peut être mobilisé seul ; ils prennent tout leur sens ensemble."
      />

      {pillars.map((p, i) => (
        <section
          key={p.id}
          aria-labelledby={`pillar-${p.id}`}
          className={`section border-t border-[var(--line)] ${i % 2 ? "bg-white" : ""}`}
        >
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
                <p className="t-eyebrow flex items-baseline gap-3" data-reveal="fade">
                  <span className="t-mark">({p.index})</span>
                  {p.name}
                </p>
                <h2 id={`pillar-${p.id}`} data-reveal="lines" className="t-display-l mt-6">
                  {p.verb}.
                </h2>
                <p data-reveal="fade" className="t-lead mt-6 max-w-[28rem]">
                  {p.text}
                </p>
              </div>
            </div>
            <ul className="index-list lg:col-span-6 lg:col-start-7">
              {servicesFor(p.id).map((s) => (
                <li key={s.slug} className="border-b border-[var(--line)] first:border-t" data-reveal="fade">
                  <TLink to={`/services/${s.slug}`} data-cursor="Voir" className="index-row group block py-8">
                    <span className="flex items-baseline justify-between gap-6">
                      <span className="flex items-baseline gap-5">
                        <span className="t-num">{s.index}</span>
                        <span className="index-name t-index">{s.name}</span>
                      </span>
                      <span aria-hidden className="text-ink-3 transition-colors duration-500 group-hover:text-ink">
                        →
                      </span>
                    </span>
                    <span className="t-body mt-4 block max-w-[34rem] pl-11">{s.summary}</span>
                  </TLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </PageShell>
  );
}
