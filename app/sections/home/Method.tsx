import { useRef } from "react";
import { gsap } from "~/animations/gsap";
import { method } from "~/content/company";
import { useIntro } from "~/hooks/useIntro";
import { Eyebrow } from "~/components/ui/Eyebrow";

/**
 * § 05 — Méthode. Un trait se trace au fil du scroll ; chaque étape
 * s'allume lorsqu'il l'atteint (geste « trace »).
 */
export function Method({ index = "05" }: { index?: string }) {
  const root = useRef<HTMLElement>(null);

  useIntro(root, (reduced) => {
    if (reduced) return;
    const el = root.current!;
    const steps = el.querySelectorAll<HTMLElement>("[data-step]");
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 64rem)", mobile: "(max-width: 63.99rem)" }, (ctx) => {
      const desktop = ctx.conditions?.desktop;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el.querySelector("[data-steps]"), start: "top 75%", end: desktop ? "bottom 55%" : "bottom 70%", scrub: 1 },
      });
      tl.fromTo(el.querySelector("[data-track]"), desktop ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: "none", duration: steps.length }, 0);
      steps.forEach((step, i) => {
        tl.fromTo(step.querySelector("[data-node]"), { backgroundColor: "rgba(21,23,28,0.15)" }, { backgroundColor: "#f2a91d", duration: 0.2 }, i + 0.1);
        tl.fromTo(step.querySelectorAll("[data-step-text]"), { opacity: 0.25 }, { opacity: 1, duration: 0.4 }, i);
      });
    });
  });

  return (
    <section ref={root} aria-labelledby="method-title" className="section relative bg-stone">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index={index}>Méthode</Eyebrow>
            <h2 id="method-title" data-reveal="lines" className="t-display-l mt-8 max-w-[14ch]">
              Comprendre <span className="accent">avant</span> de construire.
            </h2>
          </div>
          <p data-reveal="fade" className="t-body self-end lg:col-span-4 lg:col-start-9">
            Cinq étapes, toujours dans cet ordre. La sécurité n'arrive pas en fin de parcours : elle a sa propre étape, avant
            la mise en production.
          </p>
        </div>

        <ol data-steps className="relative mt-20 grid gap-12 pl-8 lg:mt-28 lg:grid-cols-5 lg:gap-6 lg:pl-0 lg:pt-14">
          <span aria-hidden className="absolute bottom-0 left-[4px] top-0 w-px bg-[var(--line-strong)] lg:bottom-auto lg:left-0 lg:right-0 lg:top-[4px] lg:h-px lg:w-auto" />
          <span
            data-track
            aria-hidden
            className="absolute bottom-0 left-[4px] top-0 w-px origin-top bg-ink lg:bottom-auto lg:left-0 lg:right-0 lg:top-[4px] lg:h-px lg:w-auto lg:origin-left"
          />
          {method.map((m) => (
            <li key={m.index} data-step className="relative">
              <span
                data-node
                aria-hidden
                className="absolute -left-8 top-1.5 h-[9px] w-[9px] rounded-full bg-ink/15 lg:-top-14 lg:left-0"
              />
              <p data-step-text className="t-num">
                {m.index.replace("M.", "")}
              </p>
              <h3 data-step-text className="t-title mt-3">
                {m.title}
              </h3>
              <p data-step-text className="t-small mt-3 max-w-[22rem]">
                {m.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
