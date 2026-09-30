import { useEffect, useState } from "react";
import type { Brief } from "./brief";

type Props = { brief: Brief; reference: string; step: number; total: number };

const Row = ({ k, v, active }: { k: string; v: string; active?: boolean }) => (
  <div className={`grid grid-cols-[7.5rem_1fr] gap-3 border-b border-[var(--line)] py-3 transition-colors duration-500 ${active ? "bg-bone/[0.03]" : ""}`}>
    <dt className="text-smoke">{k}</dt>
    <dd className={v ? "text-bone" : "text-smoke"}>{v || "—"}</dd>
  </div>
);

/** Cahier des charges qui se rédige en direct, au fil des réponses. */
export function BriefSpec({ brief, reference, step, total }: Props) {
  const [date, setDate] = useState("—");
  useEffect(() => setDate(new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date())), []);
  return (
    <aside aria-label="Récapitulatif du brief" className="t-mono rounded-[6px] border border-[var(--line)] bg-graphite p-6 text-[0.8125rem] md:p-8">
      <div className="flex items-center justify-between">
        <span className="t-label text-signal">Cahier des charges</span>
        <span className="t-label text-smoke">
          {reference}
        </span>
      </div>
      <p className="mt-2 text-smoke">
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
      <div className="mt-6 flex items-center gap-1.5" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-[1.5px] transition-colors duration-500 ${i < step ? "bg-bone" : i === step ? "bg-signal" : "bg-bone/10"}`}
          />
        ))}
        <span className="ml-3 text-smoke">
          {Math.round((step / total) * 100)} % complété
        </span>
      </div>
    </aside>
  );
}
