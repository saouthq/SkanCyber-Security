type P = { className?: string };

export const Arrow = ({ className = "h-3 w-3" }: P) => (
  <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
    <path d="M1 11 11 1M3.5 1H11v7.5" />
  </svg>
);

export const ArrowRight = ({ className = "h-3 w-4" }: P) => (
  <svg viewBox="0 0 16 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
    <path d="M0 6h15M10 1l5 5-5 5" />
  </svg>
);

export const ArrowDown = ({ className = "h-4 w-3" }: P) => (
  <svg viewBox="0 0 12 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
    <path d="M6 0v15M1 10l5 5 5-5" />
  </svg>
);

export const Plus = ({ className = "h-3 w-3" }: P) => (
  <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
    <path d="M6 0v12M0 6h12" />
  </svg>
);

export const Check = ({ className = "h-3 w-3" }: P) => (
  <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="m1 6.5 3.2 3L11 2.5" />
  </svg>
);
