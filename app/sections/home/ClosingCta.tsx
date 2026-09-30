import { site } from "~/content/site";
import { Magnetic } from "~/components/ui/Magnetic";
import { TLink } from "~/components/ui/TLink";
import { Arrow } from "~/components/ui/Icons";

/** § 07 — Appel final : une phrase monumentale, magnétique, qui mène au brief. */
export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-ink py-32 md:py-48">
      <div className="shell">
        <p className="t-label text-ash" data-reveal="fade">
          § 07 — Contact
        </p>
        <h2 id="cta-title" className="sr-only">
          Démarrer un projet
        </h2>
        <Magnetic strength={0.12} className="mt-10 block">
          <TLink to="/contact" data-cursor="Écrire" className="cta-giant group block">
            <span data-reveal="lines" className="t-display block text-[clamp(3rem,11vw,13rem)] leading-[0.9]">
              Parlons de
            </span>
            <span data-reveal="lines" data-delay="0.1" className="t-display flex items-center gap-[0.2em] text-[clamp(3rem,11vw,13rem)] leading-[0.9]">
              <span className="transition-colors duration-700 group-hover:text-signal">votre système</span>
              <span className="inline-flex h-[0.6em] w-[0.6em] items-center justify-center rounded-[0.08em] border border-[var(--line-strong)] transition-all duration-700 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                <Arrow className="h-[0.28em] w-[0.28em]" />
              </span>
            </span>
          </TLink>
        </Magnetic>
        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--line)] pt-8 md:flex-row md:items-center md:justify-between" data-reveal="fade">
          <p className="t-body max-w-md">Un projet, une question technique, un audit à planifier : décrivez votre besoin, nous revenons vers vous rapidement.</p>
          <a href={`mailto:${site.email}`} className="t-mono link-underline text-bone">
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
