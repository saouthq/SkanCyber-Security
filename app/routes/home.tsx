import type { Route } from "./+types/home";
import { PageShell } from "~/components/layout/PageShell";
import { seo } from "~/lib/seo";
import { Manifesto } from "~/sections/home/Manifesto";
import { Method } from "~/sections/home/Method";
import { Hero } from "~/sections/home/Hero";
import { Pillars } from "~/sections/home/Pillars";
import { SelectedWork } from "~/sections/home/SelectedWork";
import { ServicesIndex } from "~/sections/home/ServicesIndex";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "SkanCyber Security — Cybersécurité & ingénierie logicielle",
    description:
      "SkanCyber conçoit, développe et sécurise les systèmes numériques dont votre activité dépend : cybersécurité, logiciels sur mesure, web, mobile, desktop, SaaS, infrastructure.",
    path: "/",
  });

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Pillars />
      <Manifesto />
      <ServicesIndex />
      <SelectedWork />
      <Method />
    </PageShell>
  );
}
