import type { ReactNode } from "react";
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
  icon?: ReactNode;
};

/**
 * Bouton : le libellé « roule » au survol et un bit signal s'étend en fond.
 * Rend un lien interne (to), externe (href) ou un <button>.
 */
export function Button({ children, to, href, variant = "primary", type = "button", onClick, disabled, className = "", icon }: Props) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      <span className="btn-fill" aria-hidden />
      <span className="btn-bit" aria-hidden />
      <span className="btn-label">
        <span data-text={children}>{children}</span>
      </span>
      <span className="btn-icon" aria-hidden>
        {icon ?? <Arrow />}
      </span>
    </>
  );
  if (to) return <TLink to={to} className={cls}>{inner}</TLink>;
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
