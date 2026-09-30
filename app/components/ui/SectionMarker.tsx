type Props = { index: string; label: string; className?: string; intro?: boolean };

/** Marqueur de section façon plan technique : bit signal + numéro + filet. */
export function SectionMarker({ index, label, className = "", intro }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`} {...(intro ? { "data-intro": "" } : { "data-reveal": "fade" })}>
      <span className="h-[7px] w-[7px] shrink-0 rounded-[1.5px] bg-signal" aria-hidden />
      <span className="t-label text-bone">§ {index}</span>
      <span className="t-label text-ash">{label}</span>
      <span className="ml-2 hidden h-px flex-1 bg-[var(--line)] sm:block" aria-hidden />
    </div>
  );
}
