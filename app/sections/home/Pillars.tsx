import { useRef, useState } from "react";
import { ScrollTrigger } from "~/animations/gsap";
import { pillars, servicesFor } from "~/content/services";
import { useIntro } from "~/hooks/useIntro";
import { Eyebrow } from "~/components/ui/Eyebrow";
import { TLink } from "~/components/ui/TLink";

/**
 * Les trois métiers, racontés par la typographie. À gauche, les trois verbes
 * restent à l'écran ; celui du chapitre en cours s'allume pendant que le
 * texte défile à droite.
 */
export function Pillars() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useIntro(root, () => {
    root.current!.querySelectorAll<HTMLElement>("[data-pillar]").forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setActive(i),
      });
    });
  });

  return (
    <section ref={root} aria-labelledby="pillars-title" className="section bg-white">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index="01">Ce que nous faisons</Eyebrow>
            <h2 id="pillars-title" data-reveal="lines" className="t-display-l mt-8">
              Trois métiers. <span className="accent">Un</span> seul système.
            </h2>
          </div>
          <p data-reveal="fade" className="t-lead self-end lg:col-span-4 lg:col-start-9">
            Nous maîtrisons les trois, et c'est leur assemblage qui fait la solidité de ce que nous livrons.
          </p>
        </div>

        <div className="mt-[var(--spacing-section-sm)] grid gap-8 lg:grid-cols-12">
          {/* Les trois verbes, épinglés (desktop) */}
          <div className="hidden lg:col-span-6 lg:block" aria-hidden>
            <ol className="sticky top-[calc(var(--nav-h)+4rem)]">
              {pillars.map((p, i) => (
                <li
                  key={p.id}
                  className={`t-pillar transition-[color,font-variation-settings] duration-700 ${active === i ? "is-active" : ""}`}
                >
                  {p.verb}.
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            {pillars.map((p) => (
              <article key={p.id} data-pillar className="border-t border-[var(--line)] py-12 lg:flex lg:min-h-[78svh] lg:flex-col lg:justify-center">
                <p className="t-eyebrow flex items-baseline gap-3">
                  <span className="t-mark">({p.index})</span>
                  {p.name}
                </p>
                <h3 className="t-display-m mt-5 lg:hidden">{p.verb}.</h3>
                <p className="t-lead mt-6">{p.text}</p>
                <ul className="mt-10 border-t border-[var(--line)]">
                  {servicesFor(p.id).map((s) => (
                    <li key={s.slug} className="border-b border-[var(--line)]">
                      <TLink to={`/services/${s.slug}`} className="group flex items-center justify-between gap-4 py-4">
                        <span className="text-body transition-transform duration-500 group-hover:translate-x-1.5">{s.name}</span>
                        <span aria-hidden className="text-ink-3 transition-colors duration-500 group-hover:text-ink">
                          →
                        </span>
                      </TLink>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
