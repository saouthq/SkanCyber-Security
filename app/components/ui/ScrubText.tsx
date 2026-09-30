import { useRef } from "react";
import { gsap, SplitText } from "~/animations/gsap";
import { useIntro } from "~/hooks/useIntro";

/** Paragraphe dont les mots s'éclairent un à un au fil du scroll. */
export function ScrubText({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useIntro(ref, (reduced) => {
    if (reduced || !ref.current) return;
    const split = SplitText.create(ref.current, { type: "words" });
    gsap.fromTo(
      split.words,
      { opacity: 0.16 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true },
      },
    );
  });

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
