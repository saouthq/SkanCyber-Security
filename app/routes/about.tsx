import type { Route } from "./+types/about";
import { CtaBand } from "~/components/layout/CtaBand";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { ExampleBadge } from "~/components/ui/ExampleBadge";
import { ScrubText } from "~/components/ui/ScrubText";
import { SectionMarker } from "~/components/ui/SectionMarker";
import { LogoSymbol } from "~/components/ui/Logo";
import { principles } from "~/content/company";
import { services } from "~/content/services";
import { seo } from "~/lib/seo";
import { Method } from "~/sections/home/Method";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "À propos",
    description:
      "SkanCyber Security réunit ingénierie logicielle et cybersécurité : une équipe technique qui conçoit, construit et protège des systèmes sur mesure.",
    path: "/a-propos",
  });

/** Repères : seuls des faits vérifiables ; le reste est explicitement à compléter. */
const figures: { value: string; label: string; todo?: boolean }[] = [
  { value: String(services.length).padStart(2, "0"), label: "domaines d'intervention" },
  { value: "05", label: "étapes de méthode, de l'audit à l'exploitation" },
  { value: "01", label: "interlocuteur technique par projet" },
  { value: "[—]", label: "années d'expérience cumulées", todo: true },
];

const team = [
  { role: "Fondateur · Direction technique" },
  { role: "Ingénierie logicielle" },
  { role: "Cybersécurité offensive" },
];

export default function About() {
  return (
    <PageShell>
      <PageHero
        index="05"
        label="À propos"
        title="Des ingénieurs pour des systèmes qui tiennent."
        titleClassName="t-h1 max-w-[15ch]"
        lead="SkanCyber Security est née d'un constat simple : on développe encore trop souvent d'un côté et on sécurise de l'autre. Nous faisons les deux, avec les mêmes équipes."
        aside={<LogoSymbol className="ml-auto h-40 w-auto opacity-90 lg:h-52" />}
      />

      <section aria-label="Manifeste" className="shell border-t border-[var(--line)] py-24 md:py-40">
        <p className="t-label text-ash" data-reveal="fade">
          Manifeste
        </p>
        <ScrubText className="t-statement mt-10 max-w-[28ch] text-[clamp(1.9rem,4.2vw,4.4rem)]">
          Un logiciel qui fonctionne ne suffit plus. Il doit résister aux usages imprévus, aux pannes, aux erreurs humaines et
          aux attaques. Nous concevons chaque système comme un ensemble de couches à protéger, et chaque ligne de code comme
          une surface à maîtriser.
        </ScrubText>
      </section>

      <section aria-labelledby="principles-title" className="border-t border-[var(--line)] py-24 md:py-36">
        <div className="shell">
          <SectionMarker index="05.A" label="Principes" />
          <h2 id="principles-title" data-reveal="lines" className="t-display t-h2 mt-8 max-w-[16ch]">
            Quatre règles que nous ne négocions pas.
          </h2>
          <ol className="mt-16">
            {principles.map((p) => (
              <li key={p.index} className="grid gap-4 border-t border-[var(--line)] py-10 md:grid-cols-12 md:gap-8" data-reveal="fade">
                <span className="t-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-signal md:col-span-2">{p.index}</span>
                <h3 className="t-h3 md:col-span-4">{p.title}</h3>
                <p className="t-body md:col-span-5 md:col-start-8">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="figures-title" className="border-t border-[var(--line)] bg-graphite py-24 md:py-32">
        <div className="shell">
          <SectionMarker index="05.B" label="Repères" />
          <h2 id="figures-title" className="sr-only">
            Repères
          </h2>
          <dl className="mt-12 grid grid-cols-2 border-l border-t border-[var(--line)] lg:grid-cols-4" data-reveal="stagger">
            {figures.map((f) => (
              <div key={f.label} className="border-b border-r border-[var(--line)] p-6 md:p-8">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className={`t-display block text-[clamp(2.6rem,5vw,4.6rem)] leading-none ${f.todo ? "text-smoke" : ""}`}>{f.value}</span>
                  <span className="t-body mt-4 block text-[0.95rem]">{f.label}</span>
                  {f.todo && <span className="placeholder-tag mt-4 inline-block">À compléter</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Method />

      <section aria-labelledby="team-title" className="border-t border-[var(--line)] py-24 md:py-36">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionMarker index="05.C" label="Équipe" className="flex-1" />
            <ExampleBadge label="Structure à compléter" />
          </div>
          <h2 id="team-title" data-reveal="lines" className="t-display t-h2 mt-8 max-w-[16ch]">
            Les personnes derrière les systèmes.
          </h2>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {team.map((m) => (
              <li key={m.role} className="rounded-[6px] border border-dashed border-[var(--line-strong)] p-6">
                <div className="flex aspect-[4/5] items-center justify-center rounded-[4px] bg-graphite">
                  <span className="t-label text-smoke">Portrait — emplacement réservé</span>
                </div>
                <p className="placeholder-text mt-6">[Nom Prénom]</p>
                <p className="t-label mt-2 text-ash">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Travaillons ensemble." />
    </PageShell>
  );
}
