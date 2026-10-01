/** Signale un contenu d'exemple à remplacer — volontairement visible. */
export function ExampleBadge({ label = "Contenu d'exemple" }: { label?: string }) {
  return (
    <span className="placeholder-tag" title="Contenu fictif, à remplacer avant la mise en ligne">
      <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
      {label}
    </span>
  );
}
