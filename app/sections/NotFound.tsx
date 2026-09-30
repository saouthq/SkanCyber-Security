import { BitGlyph } from "~/components/visuals/BitGlyph";
import { Button } from "~/components/ui/Button";

export function NotFound() {
  return (
    <main id="main" className="shell flex min-h-[100svh] flex-col justify-center gap-10 pt-[var(--nav-h)] md:flex-row md:items-center md:justify-between">
      <div>
        <p className="t-label text-signal">Erreur 404 — ressource introuvable</p>
        <h1 className="t-display t-h1 mt-6 max-w-[12ch]">Cette page n'existe pas.</h1>
        <p className="t-body mt-6 max-w-md">L'adresse est peut-être erronée, ou la page a été déplacée. Le reste du système fonctionne normalement.</p>
        <div className="mt-10">
          <Button to="/">Retour à l'accueil</Button>
        </div>
      </div>
      <BitGlyph glyph="infra" className="w-full max-w-[18rem] opacity-80" />
    </main>
  );
}
