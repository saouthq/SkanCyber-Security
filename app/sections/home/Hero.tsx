import { useRef } from "react";
import { gsap } from "~/animations/gsap";
import { introDecode, introFade, introLines } from "~/animations/reveals";
import { site } from "~/content/site";
import { useIntro } from "~/hooks/useIntro";
import type { SystemState } from "~/webgl/system-state";
import { Button } from "~/components/ui/Button";
import { ArrowDown } from "~/components/ui/Icons";
import { LocalTime } from "~/components/ui/LocalTime";

/**
 * § 00 — Hero. Le titre est du HTML (lisible, indexable, LCP immédiat) ;
 * la scène WebGL derrière lui s'assemble en même temps que la typographie.
 */
export function Hero({ state }: { state: SystemState }) {
  const root = useRef<HTMLElement>(null);

  useIntro(root, (reduced) => {
    if (reduced) {
      state.intro = 1;
      return;
    }
    const q = gsap.utils.selector(root);
    const tl = gsap.timeline({ defaults: { ease: "lock" } });
    tl.from(q("[data-grid-line]"), { scaleY: 0, transformOrigin: "top", duration: 1.4, stagger: 0.08, ease: "precise" }, 0);
    tl.from(q("[data-grid-hline]"), { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "precise" }, 0.1);
    introDecode(q("[data-decode]"), tl, 0.15);
    introLines(q("h1")[0], tl, 0.3);
    tl.to(state, { intro: 1, duration: 2.8, ease: "power2.inOut" }, 0.35);
    tl.fromTo(q(".bit-dot"), { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(3)" }, 1.25);
    introFade(q("[data-hero-fade]"), tl, 0.95);
  });

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative flex min-h-[max(100svh,40rem)] flex-col justify-between pb-8 pt-[calc(var(--nav-h)+2rem)] md:pb-10"
    >
      {/* Grille de plan technique */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="shell relative h-full">
          <span data-grid-line className="absolute bottom-0 top-0 hidden w-px bg-[var(--line)] md:block" style={{ left: "var(--gutter)" }} />
          <span data-grid-line className="absolute bottom-0 top-0 hidden w-px bg-[var(--line)] md:block" style={{ right: "var(--gutter)" }} />
        </div>
      </div>

      <div className="shell relative">
        <p className="t-label flex flex-wrap items-center gap-x-3 gap-y-1 text-ash">
          <span data-decode data-intro className="text-bone">
            {site.name}
          </span>
          <span aria-hidden className="text-smoke">
            /
          </span>
          {site.domains.map((d, i) => (
            <span key={d} className="flex items-center gap-3">
              <span data-decode data-intro>
                {d}
              </span>
              {i < site.domains.length - 1 && (
                <span aria-hidden className="text-smoke">
                  ·
                </span>
              )}
            </span>
          ))}
        </p>

        <h1
          id="hero-title"
          data-intro
          className="t-display mt-8 max-w-[15ch] text-[clamp(2.75rem,7vw,8.25rem)] md:mt-10 lg:max-w-[12.5ch]"
        >
          Construit pour fonctionner. Conçu pour résister
          <span className="bit-dot ml-[0.06em] inline-block h-[0.17em] w-[0.17em] rounded-[0.03em] bg-signal align-baseline" aria-hidden />
          <span className="sr-only">.</span>
        </h1>
      </div>

      {/* Mobile : bande réservée à la scène, entre le titre et le texte */}
      <div aria-hidden className="h-[34svh] lg:hidden" />

      <div className="shell relative mt-6 lg:mt-14">
        <span data-grid-hline aria-hidden className="absolute left-[var(--gutter)] right-[var(--gutter)] top-0 h-px bg-[var(--line)]" />
        <div className="grid gap-10 pt-8 md:grid-cols-12 md:items-end md:gap-6">
          <div className="md:col-span-7 lg:col-span-6">
            <p data-hero-fade data-intro className="t-lead max-w-[34rem] text-ash">
              Nous concevons, développons et sécurisons des logiciels sur mesure — web, mobile, desktop, SaaS — pour les
              organisations qui ne peuvent pas se permettre qu'ils cèdent.
            </p>
            <div data-hero-fade data-intro className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact">Démarrer un projet</Button>
              <Button to="/services" variant="ghost">
                Nos services
              </Button>
            </div>
          </div>

          <dl data-hero-fade data-intro className="t-label hidden gap-x-8 gap-y-2 text-ash md:col-span-5 md:col-start-8 md:grid md:grid-cols-2 lg:col-span-4 lg:col-start-9">
            <dt className="text-smoke">Section</dt>
            <dd className="text-bone">§ 00 — Index</dd>
            <dt className="text-smoke">Heure locale</dt>
            <dd>
              <LocalTime className="text-bone" />
            </dd>
            <dt className="text-smoke">Couches</dt>
            <dd className="text-bone">04 + périmètre</dd>
          </dl>

          <a
            href="#systeme"
            data-hero-fade
            data-intro
            className="t-label hidden items-center gap-3 justify-self-end text-ash transition-colors hover:text-bone md:col-span-1 md:flex"
          >
            <span className="relative block h-10 w-px overflow-hidden bg-[var(--line)]">
              <span className="scroll-cue absolute inset-x-0 top-0 h-full bg-bone" />
            </span>
            <span className="sr-only">Découvrir le système</span>
            <ArrowDown className="h-3 w-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
