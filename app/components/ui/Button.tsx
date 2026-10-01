import { TLink } from "./TLink";
import { Arrow } from "./Icons";

type Variant = "primary" | "ghost";

type Props = {
  children: string;
  to?: string;
  href?: string;
  variant?: Variant;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

/**
 * Bouton pilule : le fond ambre monte au survol, le libellé roule,
 * la flèche pivote. Rend un lien interne (to), externe (href) ou un <button>.
 */
export function Button({ children, to, href, variant = "primary", type = "button", onClick, disabled, className = "" }: Props) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      <span className="btn-fill" aria-hidden />
      <span className="btn-label">
        <span data-text={children}>{children}</span>
      </span>
      <span className="btn-icon" aria-hidden>
        <Arrow className="h-2.5 w-2.5" />
      </span>
    </>
  );
  if (to)
    return (
      <TLink to={to} className={cls}>
        {inner}
      </TLink>
    );
  if (href)
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
