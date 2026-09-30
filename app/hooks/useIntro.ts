import { useEffect, type RefObject } from "react";
import { gsap } from "~/animations/gsap";
import { pageLifecycle } from "~/animations/page-lifecycle";
import { prefersReducedMotion } from "~/lib/env";

/**
 * Lance une chorégraphie d'entrée lorsque la page est prête.
 * Tout ce qui est créé dans `build` est automatiquement nettoyé (gsap.context).
 * En mouvement réduit, `build` n'est pas appelé : le contenu est déjà visible.
 */
export function useIntro(scope: RefObject<HTMLElement | null>, build: (reduced: boolean) => void) {
  useEffect(() => {
    let ctx: gsap.Context | undefined;
    const off = pageLifecycle.onReady(() => {
      if (!scope.current) return;
      ctx = gsap.context(() => build(prefersReducedMotion()), scope.current);
    });
    return () => {
      off();
      ctx?.revert();
    };
    // La chorégraphie est définie une fois par montage de page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
