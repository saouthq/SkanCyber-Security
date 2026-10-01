import { pillars, services } from "~/content/services";
import { Eyebrow } from "~/components/ui/Eyebrow";
import { TLink } from "~/components/ui/TLink";

/** Index éditorial des huit services : une liste typographique, pas une grille de cartes. */
export function ServicesIndex() {
  const verbOf = (id: string) => pillars.find((p) => p.id === id)?.verb ?? "";
  return (
    <section aria-labelledby="services-title" className="section bg-white">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index="03">Services</Eyebrow>
            <h2 id="services-title" data-reveal="lines" className="t-display-l mt-8">
              Huit savoir-faire, <span className="accent">une</span> équipe.
            </h2>
          </div>
          <p data-reveal="fade" className="t-lead self-end lg:col-span-4 lg:col-start-9">
            De l'audit de sécurité au déploiement d'une plateforme SaaS, les mêmes ingénieurs conçoivent, construisent et protègent.
          </p>
        </div>

        <ul className="index-list mt-[var(--spacing-section-sm)] border-t border-[var(--line)]">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-[var(--line)]" data-reveal="fade">
              <TLink
                to={`/services/${s.slug}`}
                data-cursor="Voir"
                className="index-row group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 md:grid-cols-[5rem_1fr_10rem_3rem] md:py-8"
              >
                <span className="t-num">{s.index}</span>
                <span className="index-name t-index">{s.name}</span>
                <span className="t-small hidden md:block">{verbOf(s.pillar)}</span>
                <span
                  aria-hidden
                  className="grid h-10 w-10 place-items-center justify-self-end rounded-full shadow-[inset_0_0_0_1px_var(--line-strong)] transition-colors duration-500 group-hover:bg-amber group-hover:shadow-none"
                >
                  →
                </span>
              </TLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
