type Props = { index?: string; children: string; className?: string; reveal?: boolean };

/** Sur-titre éditorial : numéro en serif italique + libellé. */
export function Eyebrow({ index, children, className = "", reveal = true }: Props) {
  return (
    <p className={`t-eyebrow flex items-baseline gap-3 ${className}`} {...(reveal ? { "data-reveal": "fade" } : {})}>
      {index && <span className="t-mark">({index})</span>}
      <span>{children}</span>
    </p>
  );
}
