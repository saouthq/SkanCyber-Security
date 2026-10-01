import type { Route } from "./+types/expertise";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { Eyebrow } from "~/components/ui/Eyebrow";
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
        index="04"
        label="Expertise"
        title={
          <>
            Une stack choisie, <span className="accent">pas</span> empilée.
          </>
        }
        lead="Explorez la carte : chaque domaine est relié aux autres, et la sécurité entoure l'ensemble. Sélectionnez un domaine pour voir nos pratiques et nos outils."
      />

      <section aria-label="Carte d'expertise" className="shell pb-[var(--spacing-section)]">
        <SystemMap />
      </section>

      <section aria-labelledby="criteria-title" className="section bg-white">
        <div className="shell">
          <Eyebrow index="B">Critères de choix</Eyebrow>
          <h2 id="criteria-title" data-reveal="lines" className="t-display-m mt-8 max-w-[18ch]">
            Chaque outil doit <span className="accent">mériter</span> sa place.
          </h2>
          <ol className="mt-16 grid gap-10 border-t border-[var(--line)] pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8" data-reveal="stagger">
            {criteria.map((c) => (
              <li key={c.k}>
                <span className="t-num">{c.k}</span>
                <h3 className="t-title mt-5">{c.t}</h3>
                <p className="t-small mt-3">{c.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageShell>
  );
}
