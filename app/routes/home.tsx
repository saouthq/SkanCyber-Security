import type { Route } from "./+types/home";
import { PageShell } from "~/components/layout/PageShell";
import { seo } from "~/lib/seo";
import { ClosingCta } from "~/sections/home/ClosingCta";
import { CyberTeaser } from "~/sections/home/CyberTeaser";
import { Method } from "~/sections/home/Method";
import { SelectedWork } from "~/sections/home/SelectedWork";
import { ServicesIndex } from "~/sections/home/ServicesIndex";
import { SystemStory } from "~/sections/home/SystemStory";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "SkanCyber Security — Ingénierie logicielle & cybersécurité",
    description:
      "Nous concevons, développons et sécurisons des logiciels sur mesure : applications web, mobiles, desktop, SaaS, automatisation, architecture et cybersécurité.",
    path: "/",
  });

export default function Home() {
  return (
    <PageShell>
      <SystemStory />
      <ServicesIndex />
      <SelectedWork />
      <Method />
      <CyberTeaser />
      <ClosingCta />
    </PageShell>
  );
}
