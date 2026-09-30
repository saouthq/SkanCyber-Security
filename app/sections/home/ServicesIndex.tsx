import { useEffect, useRef, useState } from "react";
import { gsap } from "~/animations/gsap";
import { services } from "~/content/services";
import { hasFinePointer, prefersReducedMotion } from "~/lib/env";
import { BitGlyph } from "~/components/visuals/BitGlyph";
import { SectionMarker } from "~/components/ui/SectionMarker";
import { TLink } from "~/components/ui/TLink";
import { Arrow } from "~/components/ui/Icons";

/**
 * § 03 — Index des services : une liste typographique (pas de cartes).
 * Au survol, la ligne s'étire (axe de largeur de la police) et un aperçu
 * animé du service suit le curseur.
 */
export function ServicesIndex() {
  const list = useRef<HTMLUListElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = list.current;
    const pv = preview.current;
    if (!el || !pv || !hasFinePointer() || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(pv, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(pv, "y", { duration: 0.7, ease: "power3" });
    const rTo = gsap.quickTo(pv, "rotation", { duration: 0.9, ease: "power3" });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      xTo(e.clientX + 32);
      yTo(e.clientY - 120);
      rTo(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.4));
      lastX = e.clientX;
    };
    const enter = (e: PointerEvent) => {
      gsap.set(pv, { x: e.clientX + 32, y: e.clientY - 120 });
      gsap.to(pv, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "lock" });
    };
    const leave = () => {
      gsap.to(pv, { autoAlpha: 0, scale: 0.92, duration: 0.4, ease: "precise" });
      setActive(null);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const current = active !== null ? services[active] : null;

  return (
    <section aria-labelledby="services-title" className="relative bg-ink py-28 md:py-40">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionMarker index="03" label="Services" />
            <h2 id="services-title" data-reveal="lines" className="t-display t-h2 mt-8 max-w-[16ch]">
              Huit expertises. Un seul interlocuteur.
            </h2>
          </div>
          <p data-reveal="fade" className="t-body self-end lg:col-span-4 lg:col-start-9">
            De l'audit de sécurité au déploiement d'une plateforme SaaS, les mêmes équipes conçoivent, construisent et
            protègent. Aucune couche n'est pensée isolément.
          </p>
        </div>

        <ul ref={list} className="services-list mt-16 border-t border-[var(--line)] md:mt-24">
          {services.map((s, i) => (
            <li key={s.slug} className="border-b border-[var(--line)]" data-reveal="fade">
              <TLink
                to={`/services/${s.slug}`}
                data-cursor="Voir"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="service-row group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 md:grid-cols-[5rem_1fr_minmax(0,22rem)_3rem] md:py-8"
              >
                <span className="t-label text-smoke transition-colors duration-500 group-hover:text-signal">{s.index}</span>
                <span className="service-name t-display text-[clamp(1.7rem,4.4vw,4.4rem)] leading-none">{s.name}</span>
                <span className="t-body hidden text-[0.9375rem] leading-snug md:block">{s.tagline}</span>
                <span className="flex h-10 w-10 items-center justify-center justify-self-end rounded-[4px] border border-[var(--line)] transition-colors duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                  <Arrow />
                </span>
              </TLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Aperçu flottant (desktop) */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[17rem] scale-90 rounded-[6px] border border-[var(--line-strong)] bg-graphite p-5 opacity-0 lg:block"
        style={{ visibility: "hidden" }}
      >
        <div className="flex items-center justify-between">
          <span className="t-label text-signal">{current?.index ?? "--"}</span>
          <span className="t-label text-smoke">Aperçu</span>
        </div>
        <div className="mt-4 aspect-square">
          {current && <BitGlyph key={current.glyph} glyph={current.glyph} className="h-full w-full" />}
        </div>
        <p className="t-label mt-4 text-ash">{current?.name}</p>
      </div>
    </section>
  );
}
