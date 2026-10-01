import { useEffect, useState } from "react";
import type { Brief } from "./brief";

type Props = { brief: Brief; reference: string; step: number; total: number };

const Row = ({ k, v, active }: { k: string; v: string; active?: boolean }) => (
  <div className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-[var(--line)] py-3.5">
    <dt className={active ? "text-ink" : "text-ink-3"}>{k}</dt>
    <dd className={v ? "text-ink" : "text-ink-3"}>{v || "—"}</dd>
  </div>
);

/** Cahier des charges qui se rédige en direct, au fil des réponses. */
export function BriefSpec({ brief, reference, step, total }: Props) {
  const [date, setDate] = useState("—");
  useEffect(() => setDate(new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date())), []);
  return (
    <aside aria-label="Récapitulatif du brief" className="rounded-[1.5rem] bg-white p-7 text-ui shadow-[0_0_0_1px_var(--line)] md:p-9">
      <div className="flex items-center justify-between">
        <span className="t-title">Votre brief</span>
        <span className="t-mono">
          {reference}
        </span>
      </div>
      <p className="t-small mt-2">
        Rédigé le {date}
      </p>
      <dl className="mt-6 border-t border-[var(--line)]">
        <Row k="Projet" v={brief.types.join(", ")} active={step === 0} />
        <Row k="Stade" v={brief.stage} active={step === 1} />
        <Row k="Horizon" v={brief.timeline} active={step === 2} />
        <Row k="Budget" v={brief.budget} active={step === 3} />
        <Row
          k="Besoin"
          v={brief.description.trim().length > 140 ? `${brief.description.trim().slice(0, 140)}…` : brief.description.trim()}
          active={step === 4}
        />
        <Row k="Contact" v={[brief.name, brief.company].filter(Boolean).join(" — ")} active={step === 5} />
      </dl>
      <div className="mt-7 flex items-center gap-4" aria-hidden>
        <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
          <span className="absolute inset-y-0 left-0 rounded-full bg-amber transition-[width] duration-700" style={{ width: `${(step / total) * 100}%` }} />
        </span>
        <span className="t-small tabular-nums">{Math.round((step / total) * 100)} %</span>
      </div>
    </aside>
  );
}
