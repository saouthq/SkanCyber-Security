import { gsap, ScrollTrigger, SplitText } from "./gsap";
import { duration, ease, stagger } from "./tokens";

/**
 * Révélations déclaratives au scroll, pilotées par attributs HTML :
 *
 *   data-reveal="fade"     → « lock » : montée courte + fondu
 *   data-reveal="lines"    → titres : lignes masquées qui montent
 *   data-reveal="stagger"  → enfants directs en cascade
 *   data-reveal="trace"    → filets qui se tracent (data-axis="y" pour vertical)
 *   data-reveal="scan"     → balayage clip-path gauche → droite
 *   data-parallax="0.12"   → parallaxe subtile liée au scroll
 *
 * À appeler dans un gsap.context pour un nettoyage automatique.
 */
export function setupScrollReveals(root: HTMLElement) {
  const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & Element>(sel)) as T[];
  const start = "top 88%";

  q<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
    gsap.from(el, {
      y: 28,
      autoAlpha: 0,
      duration: duration.base,
      ease: ease.lock,
      delay: Number(el.dataset.delay ?? 0),
      scrollTrigger: { trigger: el, start, once: true },
    });
  });

  q<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 108,
          duration: duration.long,
          ease: ease.lock,
          stagger: stagger.lines,
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start, once: true },
        });
      },
    });
  });

  q<HTMLElement>('[data-reveal="stagger"]').forEach((el) => {
    gsap.from(el.children, {
      y: 22,
      autoAlpha: 0,
      duration: duration.base,
      ease: ease.lock,
      stagger: stagger.items,
      scrollTrigger: { trigger: el, start, once: true },
    });
  });

  q<HTMLElement>('[data-reveal="trace"]').forEach((el) => {
    const vertical = el.dataset.axis === "y";
    gsap.from(el, {
      [vertical ? "scaleY" : "scaleX"]: 0,
      transformOrigin: vertical ? "top center" : "left center",
      duration: duration.long * 1.2,
      ease: ease.precise,
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });

  q<HTMLElement>('[data-reveal="scan"]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: duration.long,
        ease: ease.scan,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
  });

  q<HTMLElement>("[data-parallax]").forEach((el) => {
    const amount = Number(el.dataset.parallax) || 0.1;
    gsap.fromTo(
      el,
      { yPercent: amount * 100 },
      {
        yPercent: -amount * 100,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  ScrollTrigger.refresh();
}

/** Titre d'intro : lignes masquées qui montent en passant du flou au net. */
export function introLines(el: Element, tl: gsap.core.Timeline, at: gsap.Position = 0) {
  const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
  tl.set(el, { autoAlpha: 1 }, at);
  tl.from(
    split.lines,
    {
      yPercent: 112,
      filter: "blur(10px)",
      duration: 1.25,
      ease: ease.lock,
      stagger: stagger.lines,
      clearProps: "filter",
    },
    at,
  );
  return split;
}

/** Label mono : décodage bref façon terminal, réservé aux micro-labels. */
export function introDecode(els: Element[], tl: gsap.core.Timeline, at: gsap.Position = 0) {
  els.forEach((el, i) => {
    const text = el.textContent ?? "";
    tl.set(el, { autoAlpha: 1 }, at);
    tl.to(
      el,
      {
        duration: 0.9,
        scrambleText: { text, chars: "01·/_", revealDelay: 0.25, speed: 0.6 },
        ease: "none",
      },
      typeof at === "number" ? at + i * 0.06 : at,
    );
  });
}

/** Élément « lock » : montée courte + fondu. */
export function introFade(els: gsap.TweenTarget, tl: gsap.core.Timeline, at: gsap.Position = 0) {
  tl.fromTo(
    els,
    { autoAlpha: 0, y: 18 },
    { autoAlpha: 1, y: 0, duration: duration.base, ease: ease.lock, stagger: stagger.items },
    at,
  );
}
