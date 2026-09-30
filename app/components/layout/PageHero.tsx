import { useRef, type ReactNode } from "react";
import { gsap } from "~/animations/gsap";
import { introDecode, introFade, introLines } from "~/animations/reveals";
import { useIntro } from "~/hooks/useIntro";

type Props = {
  index: string;
  label: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
  meta?: ReactNode;
  titleClassName?: string;
};

/** En-tête des pages intérieures : marqueur, titre monumental, chapeau, visuel optionnel. */
export function PageHero({ index, label, title, lead, aside, meta, titleClassName = "t-h1 max-w-[14ch]" }: Props) {
  const root = useRef<HTMLElement>(null);

  useIntro(root, (reduced) => {
    if (reduced) return;
    const q = gsap.utils.selector(root);
    const tl = gsap.timeline();
    tl.from(q("[data-hero-line]"), { scaleX: 0, transformOrigin: "left", duration: 1.3, ease: "precise" }, 0);
    tl.set(q("[data-hero-marker]"), { autoAlpha: 1 }, 0);
    introDecode(q("[data-decode]"), tl, 0.1);
    introLines(q("h1")[0], tl, 0.2);
    introFade(q("[data-hero-fade]"), tl, 0.6);
  });

  return (
    <header ref={root} className="relative pb-16 pt-[calc(var(--nav-h)+4rem)] md:pb-24 md:pt-[calc(var(--nav-h)+7rem)]">
      <div className="shell">
        <div data-hero-marker data-intro className="flex items-center gap-3">
          <span className="h-[7px] w-[7px] rounded-[1.5px] bg-signal" aria-hidden />
          <span data-decode className="t-label text-bone">
            § {index}
          </span>
          <span data-decode className="t-label text-ash">
            {label}
          </span>
          <span data-hero-line className="ml-2 h-px flex-1 bg-[var(--line)]" aria-hidden />
        </div>
        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className={aside ? "lg:col-span-7" : "lg:col-span-12"}>
            <h1 data-intro className={`t-display ${titleClassName}`}>
              {title}
            </h1>
            {lead && (
              <p data-hero-fade data-intro className="t-lead mt-10 max-w-[38rem] text-ash">
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
            <div data-hero-fade data-intro className="lg:col-span-4 lg:col-start-9 lg:self-end">
              {aside}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
