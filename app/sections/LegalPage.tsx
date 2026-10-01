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
        meta={
          <div className="flex flex-wrap items-center gap-4">
            <span className="t-small">Dernière mise à jour : {updated}</span>
            <ExampleBadge label="Champs entre crochets à compléter" />
          </div>
        }
      />
      <div className="shell grid gap-12 border-t border-[var(--line)] pb-[var(--spacing-section)] pt-16 lg:grid-cols-12">
        <nav aria-label="Sommaire" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-[calc(var(--nav-h)+2rem)] space-y-3">
            {sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#s${i + 1}`} className="flex items-baseline gap-3 text-ui text-ink-2 transition-colors hover:text-ink">
                  <span className="t-num">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-[44rem] lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section key={s.title} id={`s${i + 1}`} className="scroll-mt-32 border-b border-[var(--line)] py-10 first:pt-0">
              <h2 className="t-title flex items-baseline gap-4">
                <span className="t-num">{String(i + 1).padStart(2, "0")}</span>
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
