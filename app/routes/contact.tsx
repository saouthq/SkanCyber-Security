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
        title="Démarrons par votre système."
        titleClassName="t-h1 max-w-[14ch]"
        lead="Six questions, deux minutes. Votre réponse prend la forme d'un premier cahier des charges, que nous étudions avant de vous recontacter."
      />
      <section aria-label="Brief de projet" className="shell border-t border-[var(--line)] pb-28 pt-16 md:pb-40 md:pt-20">
        <ProjectBrief />
      </section>
    </PageShell>
  );
}
