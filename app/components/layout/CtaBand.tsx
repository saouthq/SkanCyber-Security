import { Button } from "~/components/ui/Button";

type Props = { title?: string; text?: string; action?: string; to?: string };

/** Bandeau d'appel à l'action de fin de page. */
export function CtaBand({
  title = "Un système à concevoir, à reprendre ou à sécuriser ?",
  text = "Décrivez votre contexte en quelques minutes. Un ingénieur vous répond — pas un formulaire automatique.",
  action = "Démarrer un projet",
  to = "/contact",
}: Props) {
  return (
    <section aria-label="Démarrer un projet" className="border-t border-[var(--line)] bg-graphite">
      <div className="shell grid gap-10 py-24 md:py-32 lg:grid-cols-12 lg:items-end">
        <h2 data-reveal="lines" className="t-display t-h2 lg:col-span-7">
          {title}
        </h2>
        <div className="lg:col-span-4 lg:col-start-9" data-reveal="fade">
          <p className="t-body">{text}</p>
          <div className="mt-8">
            <Button to={to}>{action}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
