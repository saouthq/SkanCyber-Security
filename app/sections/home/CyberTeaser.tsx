import { nistFunctions } from "~/content/company";
import { Button } from "~/components/ui/Button";
import { SectionMarker } from "~/components/ui/SectionMarker";
import { BitGlyph } from "~/components/visuals/BitGlyph";

/** § 06 — Cybersécurité : promesse sobre, référentiel public, lien vers la page dédiée. */
export function CyberTeaser() {
  return (
    <section aria-labelledby="cyber-teaser-title" className="relative border-t border-[var(--line)] bg-graphite py-28 md:py-40">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <SectionMarker index="06" label="Cybersécurité" />
          <h2 id="cyber-teaser-title" data-reveal="lines" className="t-display t-h2 mt-8 max-w-[13ch]">
            Mesurer. Réduire. Tenir.
          </h2>
          <p data-reveal="fade" className="t-lead mt-8 max-w-[32rem] text-ash">
            Aucun système n'est invulnérable. Notre travail consiste à le rendre difficile à compromettre, à détecter ce qui
            doit l'être et à préparer la réponse — avec des constats vérifiables, pas des promesses.
          </p>
          <div data-reveal="fade" className="mt-10">
            <Button to="/cybersecurite">Notre approche</Button>
          </div>
        </div>
        <div className="flex items-center justify-center lg:col-span-5 lg:col-start-8" data-reveal="scan">
          <BitGlyph glyph="cyber" className="w-full max-w-[26rem]" label="Détection et confinement d'une intrusion au périmètre" />
        </div>
      </div>

      <div className="shell mt-20 md:mt-28">
        <p className="t-label text-smoke" data-reveal="fade">
          Référentiel — NIST Cybersecurity Framework 2.0
        </p>
        <ol className="mt-6 grid grid-cols-2 border-l border-t border-[var(--line)] sm:grid-cols-3 lg:grid-cols-6" data-reveal="stagger">
          {nistFunctions.map((f) => (
            <li key={f.id} className="border-b border-r border-[var(--line)] p-5 md:p-6">
              <span className="t-label text-signal">{f.code}</span>
              <p className="t-h3 mt-6 text-[1.25rem]">{f.name}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
