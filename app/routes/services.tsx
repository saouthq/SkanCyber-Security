import type { Route } from "./+types/services";
import { CtaBand } from "~/components/layout/CtaBand";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { Arrow } from "~/components/ui/Icons";
import { TLink } from "~/components/ui/TLink";
import { BitGlyph } from "~/components/visuals/BitGlyph";
import { layers, services, type LayerId } from "~/content/services";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Services",
    description:
      "Cybersécurité, ingénierie logicielle, sites et applications web, mobiles, desktop, SaaS, automatisation, architecture et infrastructure.",
    path: "/services",
  });

const groups: { id: LayerId; index: string; name: string; label: string }[] = [
  { id: "perimetre", index: "A", name: "Périmètre", label: "Ce qui protège l'ensemble" },
  ...layers.map((l, i) => ({ id: l.id, index: String.fromCharCode(66 + i), name: l.name, label: l.label })),
];

export default function Services() {
  return (
    <PageShell>
      <PageHero
        index="01"
        label="Services"
        title="Concevoir. Construire. Protéger."
        lead="Huit expertises, organisées comme les couches d'un système. Chacune peut être mobilisée seule ; elles prennent tout leur sens ensemble."
      />

      <div className="shell pb-24 md:pb-36">
        {groups.map((g) => {
          const items = services.filter((s) => s.layer === g.id);
          if (!items.length) return null;
          return (
            <section key={g.id} aria-labelledby={`group-${g.id}`} className="grid gap-8 border-t border-[var(--line)] py-12 lg:grid-cols-12 lg:py-16">
              <div className="lg:col-span-3">
                <p className="t-label text-signal" data-reveal="fade">
                  Couche {g.index}
                </p>
                <h2 id={`group-${g.id}`} className="t-h3 mt-3" data-reveal="fade">
                  {g.name}
                </h2>
                <p className="t-label mt-2 text-smoke" data-reveal="fade">
                  {g.label}
                </p>
              </div>
              <ul className="lg:col-span-9">
                {items.map((s) => (
                  <li key={s.slug} className="border-b border-[var(--line)] first:border-t lg:first:border-t-0" data-reveal="fade">
                    <TLink
                      to={`/services/${s.slug}`}
                      data-cursor="Voir"
                      className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-5 py-7 md:grid-cols-[6.5rem_1fr_minmax(0,20rem)_auto] md:gap-8"
                    >
                      <span className="block rounded-[4px] border border-[var(--line)] bg-graphite p-2.5 transition-colors duration-500 group-hover:border-[var(--line-strong)]">
                        <BitGlyph glyph={s.glyph} className="w-full" />
                      </span>
                      <span>
                        <span className="t-label text-smoke">{s.index}</span>
                        <span className="t-display mt-2 block text-[clamp(1.6rem,3vw,2.8rem)] leading-none transition-colors duration-500 group-hover:text-signal">
                          {s.name}
                        </span>
                      </span>
                      <span className="t-body hidden text-[0.95rem] md:block">{s.summary}</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-[var(--line)] transition-colors duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                        <Arrow />
                      </span>
                    </TLink>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <CtaBand />
    </PageShell>
  );
}
