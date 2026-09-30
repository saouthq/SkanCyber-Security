import type { Route } from "./+types/cyber";
import { CtaBand } from "~/components/layout/CtaBand";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { SectionMarker } from "~/components/ui/SectionMarker";
import { BitGlyph } from "~/components/visuals/BitGlyph";
import { getService } from "~/content/services";
import { seo } from "~/lib/seo";
import { NistStory } from "~/sections/cyber/NistStory";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Cybersécurité",
    description:
      "Audit de sécurité, tests d'intrusion, revue de code, durcissement et accompagnement à la conformité (ISO 27001, NIS 2, RGPD), structurés selon le NIST CSF 2.0.",
    path: "/cybersecurite",
  });

const commitments = [
  { t: "Pas de rapport générique", d: "Chaque constat est contextualisé, reproductible et accompagné d'une correction applicable." },
  { t: "Pas de peur vendue", d: "Nous classons les risques par impact réel sur votre activité, pas par effet d'annonce." },
  { t: "Pas de test hors cadre", d: "Aucune action sans périmètre écrit, règles d'engagement validées et contacts d'urgence définis." },
  { t: "Pas de promesse d'invulnérabilité", d: "Nous rendons votre système difficile à compromettre, et nous vous préparons au reste." },
];

export default function Cyber() {
  const cyber = getService("cybersecurite")!;

  return (
    <PageShell>
      <PageHero
        index="04"
        label="Cybersécurité"
        title="Rendre votre système difficile à compromettre."
        titleClassName="t-h1 max-w-[16ch]"
        lead="Nous évaluons votre exposition comme le ferait un attaquant, puis nous aidons vos équipes à corriger, détecter et répondre — avec des constats vérifiables et des priorités claires."
        aside={
          <div className="rounded-[6px] border border-[var(--line)] bg-graphite p-6">
            <BitGlyph glyph="cyber" className="w-full" label="Une intrusion détectée puis contenue au périmètre" />
            <p className="t-label mt-5 flex justify-between text-smoke">
              <span>Fig. 04</span>
              <span>Détection · confinement</span>
            </p>
          </div>
        }
      />

      <section aria-labelledby="offers-title" className="shell py-20 md:py-28">
        <SectionMarker index="04.0" label="Interventions" />
        <h2 id="offers-title" data-reveal="lines" className="t-display t-h2 mt-8 max-w-[16ch]">
          Ce que nous faisons, concrètement.
        </h2>
        <ol className="mt-14 grid border-t border-[var(--line)] md:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          {cyber.capabilities.map((c, i) => (
            <li key={c.title} className="border-b border-[var(--line)] py-8 md:pr-8 lg:[&:not(:nth-child(3n))]:border-r lg:[&:not(:nth-child(3n+1))]:pl-8">
              <span className="t-label text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-h3 mt-6">{c.title}</h3>
              <p className="t-body mt-3 text-[0.95rem]">{c.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <NistStory />

      <section aria-labelledby="commit-title" className="border-t border-[var(--line)] bg-graphite py-24 md:py-36">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionMarker index="04.B" label="Engagements" />
            <h2 id="commit-title" data-reveal="lines" className="t-display t-h2 mt-8 max-w-[12ch]">
              Ce que nous nous interdisons.
            </h2>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7" data-reveal="stagger">
            {commitments.map((c) => (
              <li key={c.t} className="border-t border-[var(--line)] py-7">
                <h3 className="flex items-center gap-3 text-[1.125rem] text-bone">
                  <span className="h-px w-4 bg-signal" aria-hidden />
                  {c.t}
                </h3>
                <p className="t-body mt-2 pl-7">{c.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="refs-title" className="shell py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionMarker index="04.C" label="Référentiels" />
            <h2 id="refs-title" className="t-h3 mt-8" data-reveal="fade">
              Des méthodes publiques, des résultats vérifiables.
            </h2>
          </div>
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-6 lg:col-start-7" data-reveal="stagger">
            {cyber.stack.map((t) => (
              <li key={t} className="t-mono rounded-[3px] border border-[var(--line)] px-3 py-2 text-ash">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Faire le point sur votre exposition ?"
        text="Un premier échange permet de cadrer le périmètre, les objectifs et le format d'intervention adapté."
        action="Planifier un audit"
      />
    </PageShell>
  );
}
