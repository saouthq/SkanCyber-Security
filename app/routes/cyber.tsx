import type { Route } from "./+types/cyber";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { Eyebrow } from "~/components/ui/Eyebrow";
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
        index="02"
        label="Cybersécurité"
        title={
          <>
            Difficile à <span className="accent">compromettre.</span>
          </>
        }
        lead="Nous évaluons votre exposition comme le ferait un attaquant, puis nous aidons vos équipes à corriger, détecter et répondre — avec des constats vérifiables et des priorités claires."
      />

      <section aria-labelledby="offers-title" className="section border-t border-[var(--line)]">
        <div className="shell">
          <Eyebrow index="A">Interventions</Eyebrow>
          <h2 id="offers-title" data-reveal="lines" className="t-display-m mt-8 max-w-[18ch]">
            Ce que nous faisons, <span className="accent">concrètement.</span>
          </h2>
          <ol className="mt-16 grid gap-x-12 border-t border-[var(--line)] md:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {cyber.capabilities.map((c, i) => (
              <li key={c.title} className="border-b border-[var(--line)] py-10">
                <span className="t-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-title mt-5">{c.title}</h3>
                <p className="t-small mt-3">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <NistStory />

      <section aria-labelledby="commit-title" className="section">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="C">Engagements</Eyebrow>
            <h2 id="commit-title" data-reveal="lines" className="t-display-m mt-8 max-w-[12ch]">
              Ce que nous nous <span className="accent">interdisons.</span>
            </h2>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7" data-reveal="stagger">
            {commitments.map((c) => (
              <li key={c.t} className="border-t border-[var(--line)] py-8">
                <h3 className="t-title">{c.t}</h3>
                <p className="t-body mt-2">{c.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="refs-title" className="section bg-stone">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="D">Référentiels</Eyebrow>
            <h2 id="refs-title" className="t-title mt-8 max-w-[22ch]" data-reveal="fade">
              Des méthodes publiques, des résultats vérifiables.
            </h2>
          </div>
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-6 lg:col-start-7" data-reveal="stagger">
            {cyber.stack.map((t) => (
              <li key={t} className="rounded-full bg-white px-4 py-2 text-ui text-ink-2">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
