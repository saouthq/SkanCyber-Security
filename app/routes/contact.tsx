import type { Route } from "./+types/contact";
import { PageShell } from "~/components/layout/PageShell";
import { PageHero } from "~/components/layout/PageHero";
import { seo } from "~/lib/seo";
import { ProjectBrief } from "~/sections/contact/ProjectBrief";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Démarrer un projet",
    description: "Décrivez votre projet en quelques étapes : type, stade, horizon, besoin. Un ingénieur SkanCyber vous répond.",
    path: "/contact",
  });

export default function Contact() {
  return (
    <PageShell>
      <PageHero
        index="06"
        label="Contact"
        title={
          <>
            Parlez-nous de <span className="accent">votre</span> projet.
          </>
        }
        lead="Six questions, deux minutes. Votre réponse prend la forme d'un premier cahier des charges, que nous étudions avant de vous recontacter."
      />
      <section aria-label="Brief de projet" className="shell border-t border-[var(--line)] pb-[var(--spacing-section)] pt-16 md:pt-20">
        <ProjectBrief />
      </section>
    </PageShell>
  );
}
