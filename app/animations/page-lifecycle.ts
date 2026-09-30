/**
 * Cycle de vie des pages : une page n'est « prête » que lorsque les polices
 * sont chargées et que la transition d'entrée a commencé. Les animations
 * d'intro attendent ce signal pour ne jamais se jouer sous le voile.
 */
type Listener = () => void;

let ready = false;
const listeners = new Set<Listener>();

declare global {
  interface Window {
    __introFallback?: number;
  }
}

export const pageLifecycle = {
  isReady: () => ready,
  setReady(value: boolean) {
    ready = value;
    if (!value) return;
    if (typeof window !== "undefined" && window.__introFallback) {
      window.clearTimeout(window.__introFallback);
      window.__introFallback = undefined;
    }
    const pending = [...listeners];
    listeners.clear();
    pending.forEach((fn) => fn());
  },
  onReady(fn: Listener) {
    if (ready) {
      fn();
      return () => {};
    }
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};
