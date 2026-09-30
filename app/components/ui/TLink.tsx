import type { ComponentProps, MouseEvent } from "react";
import { Link } from "react-router";
import { usePageTransition } from "~/components/layout/PageTransition";

type Props = ComponentProps<typeof Link> & { to: string };

/** Lien interne qui passe par la transition de page. */
export function TLink({ to, onClick, target, ...rest }: Props) {
  const { go } = usePageTransition();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || target || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    go(to);
  };

  return <Link to={to} target={target} onClick={handle} {...rest} />;
}
