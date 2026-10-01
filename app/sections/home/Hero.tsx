import { useRef } from "react";
import { gsap, SplitText } from "~/animations/gsap";
import { breathingType } from "~/animations/breathing-type";
import { introFade } from "~/animations/reveals";
import { useIntro } from "~/hooks/useIntro";
import { hasFinePointer } from "~/lib/env";
import { Button } from "~/components/ui/Button";

/**
 * Ouverture. Pas d'objet, pas de décor : la typographie est le visuel.
 * Les lignes montent depuis leur masque, puis le titre « respire » sous le
 * curseur (graisse et largeur variables). Sur tactile, une vague unique.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIntro(root, (reduced) => {
    if (reduced) return;
    const section = root.current!;
    const q = gsap.utils.selector(section);
    const title = q("h1")[0] as HTMLElement;
    const split = SplitText.create(title, { type: "lines,words,chars", mask: "lines", linesClass: "split-line" });
    const chars = (split.chars as HTMLElement[]).filter((c) => !c.closest(".accent"));

    const tl = gsap.timeline();
    introFade(q("[data-hero-top]"), tl, 0);
    tl.set(title, { autoAlpha: 1 }, 0);
    tl.from(split.lines, { yPercent: 110, duration: 1.4, ease: "lock", stagger: 0.1 }, 0.1);
    introFade(q("[data-hero-fade]"), tl, 0.75);

    if (hasFinePointer()) {
      const release = breathingType(section, chars);
      return () => release();
    }
    // Tactile : une vague de graisse traverse le titre une fois
    tl.fromTo(
      chars,
      { fontVariationSettings: '"wght" 480, "wdth" 96' },
      { fontVariationSettings: '"wght" 700, "wdth" 100', duration: 0.5, ease: "sine.inOut", stagger: { each: 0.035, yoyo: true, repeat: 1 } },
      1.1,
    );
  });

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative flex min-h-[max(100svh,42rem)] flex-col pb-10 pt-[calc(var(--nav-h)+2rem)]">
      <div className="shell flex justify-between gap-6" data-hero-top data-intro>
        <p className="t-eyebrow">Studio d'ingénierie numérique</p>
        <p className="t-eyebrow hidden text-right sm:block">Cybersécurité · Logiciel · Infrastructure</p>
      </div>

      <div className="shell my-auto py-12">
        <h1 id="hero-title" data-intro className="t-hero">
          Construire
          <br />
          ce qui <span className="accent">tient.</span>
        </h1>
      </div>

      <div className="shell flex flex-col gap-8 border-t border-[var(--line)] pt-8 lg:flex-row lg:items-end lg:justify-between">
        <p data-hero-fade data-intro className="t-lead max-w-[30rem]">
          SkanCyber conçoit, développe et sécurise les logiciels et les infrastructures dont votre activité dépend.
        </p>
        <div data-hero-fade data-intro className="flex flex-wrap items-center gap-3">
          <Button to="/contact">Démarrer un projet</Button>
          <Button to="/services" variant="ghost">
            Nos services
          </Button>
        </div>
      </div>
    </section>
  );
}
