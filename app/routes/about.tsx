import type { Route } from "./+types/about";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { Eyebrow } from "~/components/ui/Eyebrow";
import { ExampleBadge } from "~/components/ui/ExampleBadge";
import { ScrubText } from "~/components/ui/ScrubText";
import { principles } from "~/content/company";
import { services } from "~/content/services";
import { seo } from "~/lib/seo";
import { Method } from "~/sections/home/Method";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Studio",
    description:
      "SkanCyber Security réunit ingénierie logicielle et cybersécurité : une équipe technique qui conçoit, construit et protège des systèmes sur mesure.",
    path: "/a-propos",
  });

/** Repères : seuls des faits vérifiables ; le reste est explicitement à compléter. */
const figures: { value: string; label: string; todo?: boolean }[] = [
  { value: String(services.length).padStart(2, "0"), label: "savoir-faire, en trois métiers" },
  { value: "05", label: "étapes de méthode, de l'audit à l'exploitation" },
  { value: "01", label: "interlocuteur technique par projet" },
  { value: "—", label: "années d'expérience cumulées", todo: true },
];

const team = ["Fondateur · Direction technique", "Ingénierie logicielle", "Cybersécurité offensive"];

export default function About() {
  return (
    <PageShell>
      <PageHero
        index="05"
        label="Studio"
        title={
          <>
            Des ingénieurs, <span className="accent">pas</span> des promesses.
          </>
        }
        lead="SkanCyber Security est née d'un constat simple : on développe encore trop souvent d'un côté et on sécurise de l'autre. Nous faisons les deux, avec les mêmes équipes."
      />

      <section aria-label="Manifeste" className="section border-t border-[var(--line)]">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow index="A">Manifeste</Eyebrow>
          </div>
          <ScrubText className="t-statement lg:col-span-9">
            Un logiciel qui fonctionne ne suffit plus. Il doit résister aux usages imprévus, aux pannes, aux erreurs humaines et
            aux attaques. Nous concevons chaque système comme un ensemble à protéger, et chaque ligne de code comme une
            surface à maîtriser.
          </ScrubText>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="section bg-white">
        <div className="shell">
          <Eyebrow index="B">Principes</Eyebrow>
          <h2 id="principles-title" data-reveal="lines" className="t-display-m mt-8 max-w-[18ch]">
            Quatre règles que nous <span className="accent">ne négocions pas.</span>
          </h2>
          <ol className="mt-16">
            {principles.map((p) => (
              <li key={p.index} className="grid gap-4 border-t border-[var(--line)] py-10 md:grid-cols-12 md:gap-8" data-reveal="fade">
                <span className="t-num md:col-span-1">{p.index}</span>
                <h3 className="t-title md:col-span-5">{p.title}</h3>
                <p className="t-body md:col-span-5 md:col-start-8">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="figures-title" className="section">
        <div className="shell">
          <Eyebrow index="C">Repères</Eyebrow>
          <h2 id="figures-title" className="sr-only">
            Repères
          </h2>
          <dl className="mt-12 grid grid-cols-2 gap-y-12 border-t border-[var(--line)] pt-10 lg:grid-cols-4" data-reveal="stagger">
            {figures.map((f) => (
              <div key={f.label} className="pr-6">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className={`t-figure block ${f.todo ? "text-ink-3" : ""}`}>{f.value}</span>
                  <span className="t-small mt-4 block max-w-[14rem]">{f.label}</span>
                  {f.todo && <span className="placeholder-tag mt-4">À compléter</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Method index="D" />

      <section aria-labelledby="team-title" className="section">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Eyebrow index="E">Équipe</Eyebrow>
            <ExampleBadge label="Structure à compléter" />
          </div>
          <h2 id="team-title" data-reveal="lines" className="t-display-m mt-8 max-w-[16ch]">
            Les personnes <span className="accent">derrière</span> les systèmes.
          </h2>
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {team.map((role) => (
              <li key={role}>
                <div className="flex aspect-[4/5] items-center justify-center rounded-[1.25rem] bg-stone">
                  <span className="placeholder-tag">Portrait — emplacement réservé</span>
                </div>
                <p className="mt-5 text-body font-medium">
                  <span className="placeholder-text">[Nom Prénom]</span>
                </p>
                <p className="t-small mt-1">{role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
