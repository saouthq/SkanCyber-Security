/** Signale un contenu d'exemple à remplacer — volontairement visible. */
export function ExampleBadge({ label = "Contenu d'exemple" }: { label?: string }) {
  return <span className="placeholder-tag" title="Contenu fictif, à remplacer avant la mise en ligne">{label}</span>;
}
