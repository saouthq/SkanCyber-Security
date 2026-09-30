import type { ReactNode } from "react";
import { PageHero } from "~/components/layout/PageHero";
import { PageShell } from "~/components/layout/PageShell";
import { ExampleBadge } from "~/components/ui/ExampleBadge";

type Section = { title: string; body: ReactNode };

/** Gabarit des pages légales : sommaire à gauche, contenu lisible à droite. */
export function LegalPage({ index, title, updated, sections }: { index: string; title: string; updated: string; sections: Section[] }) {
  return (
    <PageShell>
      <PageHero
        index={index}
        label="Informations légales"
        title={title}
        titleClassName="t-h1 max-w-[16ch]"
        meta={
          <div className="flex flex-wrap items-center gap-4">
            <span className="t-label text-smoke">Dernière mise à jour : {updated}</span>
            <ExampleBadge label="Champs entre crochets à compléter" />
          </div>
        }
      />
      <div className="shell grid gap-12 border-t border-[var(--line)] pb-28 pt-16 lg:grid-cols-12">
        <nav aria-label="Sommaire" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-[calc(var(--nav-h)+2rem)] space-y-3">
            {sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#s${i + 1}`} className="t-label flex gap-3 text-ash transition-colors hover:text-bone">
                  <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="legal-prose max-w-[44rem] lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section key={s.title} id={`s${i + 1}`} className="scroll-mt-32 border-b border-[var(--line)] py-10 first:pt-0">
              <h2 className="t-h3">
                <span className="t-label mr-4 align-middle text-signal">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div className="t-body mt-5 space-y-4">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

export const Todo = ({ children }: { children: ReactNode }) => <span className="placeholder-text">[{children}]</span>;
