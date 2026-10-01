import { useRef, type ReactNode } from "react";
import { gsap } from "~/animations/gsap";
import { introFade, introLines } from "~/animations/reveals";
import { useIntro } from "~/hooks/useIntro";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  lead?: string;
  aside?: ReactNode;
  meta?: ReactNode;
  size?: "xl" | "l";
};

/** En-tête des pages intérieures : sur-titre, titre monumental, chapeau, visuel optionnel. */
export function PageHero({ index, label, title, lead, aside, meta, size = "l" }: Props) {
  const root = useRef<HTMLElement>(null);

  useIntro(root, (reduced) => {
    if (reduced) return;
    const q = gsap.utils.selector(root);
    const tl = gsap.timeline();
    introFade(q("[data-hero-eyebrow]"), tl, 0);
    introLines(q("h1")[0], tl, 0.1);
    introFade(q("[data-hero-fade]"), tl, 0.55);
  });

  return (
    <header ref={root} className="relative pb-[var(--spacing-section-sm)] pt-[calc(var(--nav-h)+clamp(4rem,9vw,8rem))]">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className={aside ? "lg:col-span-8" : "lg:col-span-11"}>
          <p data-hero-eyebrow data-intro className="t-eyebrow flex items-baseline gap-3">
            <span className="t-mark">({index})</span>
            {label}
          </p>
          <h1 data-intro className={`${size === "xl" ? "t-display-xl" : "t-display-l"} mt-8 max-w-[14ch] text-balance`}>
            {title}
          </h1>
          {lead && (
            <p data-hero-fade data-intro className="t-lead mt-10 max-w-[38rem]">
              {lead}
            </p>
          )}
          {meta && (
            <div data-hero-fade data-intro className="mt-10">
              {meta}
            </div>
          )}
        </div>
        {aside && (
          <div data-hero-fade data-intro className="lg:col-span-4 lg:self-end">
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}
