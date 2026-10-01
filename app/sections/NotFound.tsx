import { Button } from "~/components/ui/Button";

export function NotFound() {
  return (
    <main id="main" className="shell grid min-h-[100svh] items-center gap-10 pb-16 pt-[calc(var(--nav-h)+3rem)] lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="t-eyebrow">Erreur 404</p>
        <h1 className="t-display-l mt-6 max-w-[12ch]">
          Cette page <span className="accent">n'existe</span> pas.
        </h1>
        <p className="t-lead mt-8 max-w-md">L'adresse est peut-être erronée, ou la page a été déplacée. Le reste du site fonctionne normalement.</p>
        <div className="mt-10">
          <Button to="/">Retour à l'accueil</Button>
        </div>
      </div>
      <p aria-hidden className="t-hero text-ink/10 lg:col-span-4 lg:col-start-9">404</p>
    </main>
  );
}
