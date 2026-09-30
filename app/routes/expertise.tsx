import type { Route } from "./+types/expertise";
import { CtaBand } from "~/components/layout/CtaBand";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { SectionMarker } from "~/components/ui/SectionMarker";
import { seo } from "~/lib/seo";
import { SystemMap } from "~/sections/expertise/SystemMap";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Expertise & technologies",
    description:
      "Frontend, backend, mobile, desktop, données, cloud, infrastructure, DevOps, IA appliquée et sécurité : une carte interactive de notre savoir-faire.",
    path: "/expertise",
  });

const criteria = [
  { k: "01", t: "Maturité", d: "Des technologies éprouvées en production, soutenues par une communauté active." },
  { k: "02", t: "Maintenabilité", d: "Ce que vos équipes, ou d'autres, pourront reprendre sans nous." },
  { k: "03", t: "Sécurité", d: "Un historique de vulnérabilités suivi, des mises à jour régulières, des secrets bien gérés." },
  { k: "04", t: "Réversibilité", d: "Pas d'enfermement : données exportables, standards ouverts, sorties possibles." },
];

export default function Expertise() {
  return (
    <PageShell>
      <PageHero
        index="02"
        label="Expertise"
        title="Une stack choisie, pas empilée."
        lead="Explorez la carte : chaque domaine est relié aux autres, et la sécurité entoure l'ensemble. Sélectionnez un domaine pour voir nos pratiques et nos outils."
      />

      <section aria-label="Carte d'expertise" className="shell pb-24 md:pb-36">
        <SystemMap />
      </section>

      <section aria-labelledby="criteria-title" className="border-t border-[var(--line)] py-24 md:py-36">
        <div className="shell">
          <SectionMarker index="02.B" label="Critères de choix" />
          <h2 id="criteria-title" data-reveal="lines" className="t-display t-h2 mt-8 max-w-[18ch]">
            Chaque outil doit mériter sa place.
          </h2>
          <ol className="mt-16 grid border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
            {criteria.map((c) => (
              <li key={c.k} className="border-b border-[var(--line)] py-8 sm:pr-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
                <span className="t-label text-signal">{c.k}</span>
                <h3 className="t-h3 mt-6">{c.t}</h3>
                <p className="t-body mt-3 text-[0.95rem]">{c.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Une question d'architecture ou de choix technique ?" action="En parler" />
    </PageShell>
  );
}
