import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { gsap } from "~/animations/gsap";
import { prefersReducedMotion } from "~/lib/env";
import { site } from "~/content/site";
import { Button } from "~/components/ui/Button";
import { Check } from "~/components/ui/Icons";
import { TLink } from "~/components/ui/TLink";
import { BriefSpec } from "./BriefSpec";
import { briefToText, emptyBrief, options, steps, submitBrief, type Brief } from "./brief";

/** Choix sous forme de pastilles — de vrais inputs (radio / checkbox), stylés. */
function Choice({ type, name, value, checked, onChange }: { type: "radio" | "checkbox"; name: string; value: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="group relative cursor-pointer">
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex items-center gap-3 rounded-[5px] border border-[var(--line-strong)] px-4 py-3.5 text-[1rem] text-ash transition-all duration-300 group-hover:border-bone/40 group-hover:text-bone peer-checked:border-signal peer-checked:bg-signal/10 peer-checked:text-bone peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal">
        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border transition-colors ${checked ? "border-signal bg-signal text-ink" : "border-[var(--line-strong)]"}`}>
          {checked && <Check className="h-2.5 w-2.5" />}
        </span>
        {value}
      </span>
    </label>
  );
}

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="t-label text-ash">{label}</span>
      {children}
      {hint && <span className="mt-2 block text-[0.8125rem] text-smoke">{hint}</span>}
    </label>
  );
}

const inputCls =
  "mt-3 block w-full border-0 border-b border-[var(--line-strong)] bg-transparent px-0 py-3 text-[1.25rem] text-bone placeholder:text-smoke transition-colors focus:border-signal focus:outline-none";

/**
 * Brief de projet guidé en six étapes. Le visiteur répond à des questions
 * simples ; un cahier des charges se construit en direct à côté.
 */
export function ProjectBrief() {
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Référence générée côté navigateur uniquement (le HTML pré-rendu reste stable)
  const [reference, setReference] = useState("SKC-······-····");
  useEffect(() => {
    const d = new Date();
    setReference(`SKC-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`);
  }, []);

  const current = steps[step];
  const canContinue = current.valid(brief);
  const set = <K extends keyof Brief>(k: K, v: Brief[K]) => setBrief((b) => ({ ...b, [k]: v }));
  const toggleType = (t: string) =>
    setBrief((b) => ({ ...b, types: b.types.includes(t) ? b.types.filter((x) => x !== t) : [...b.types, t] }));

  // Transition entre étapes + focus sur la question (accessibilité)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus({ preventScroll: true });
    if (!stage.current || prefersReducedMotion()) return;
    gsap.fromTo(stage.current.children, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "lock" });
  }, [step, done]);

  const next = (e?: FormEvent) => {
    e?.preventDefault();
    if (!canContinue) return;
    if (step < steps.length - 1) setStep(step + 1);
    else {
      submitBrief(brief, reference);
      setDone(true);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(briefToText(brief, reference));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (done) {
    return (
      <div className="grid gap-12 lg:grid-cols-12">
        <div ref={stage} className="lg:col-span-7" aria-live="polite">
          <p className="t-label text-signal">Brief {reference}</p>
          <h2 ref={heading} tabIndex={-1} className="t-display t-h2 mt-6 outline-none">
            Votre brief est prêt.
          </h2>
          <p className="t-lead mt-6 max-w-[34rem] text-ash">
            Votre messagerie s'est ouverte avec le brief pré-rempli : il ne reste qu'à l'envoyer. Si rien ne s'est ouvert,
            copiez le brief et envoyez-le à <span className="text-bone">{site.email}</span>.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button onClick={copy}>{copied ? "Brief copié" : "Copier le brief"}</Button>
            <Button onClick={() => submitBrief(brief, reference)} variant="ghost">
              Rouvrir la messagerie
            </Button>
          </div>
          <TLink to="/" className="t-label link-underline mt-10 inline-block text-ash">
            Retour à l'accueil
          </TLink>
        </div>
        <div className="lg:col-span-5">
          <BriefSpec brief={brief} reference={reference} step={steps.length} total={steps.length} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <form onSubmit={next} className="lg:col-span-7" noValidate aria-describedby="brief-hint">
        <div className="flex items-center gap-4">
          <span className="t-label text-signal">
            Étape {String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </span>
          <span className="relative h-px flex-1 bg-[var(--line)]" aria-hidden>
            <span className="absolute inset-y-0 left-0 bg-signal transition-[width] duration-700 ease-[var(--ease-out-expo)]" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </span>
        </div>

        <div ref={stage} className="mt-10 min-h-[26rem]">
          <fieldset>
            <legend className="contents">
              <h2 ref={heading} tabIndex={-1} className="t-display t-h2 max-w-[16ch] outline-none">
                {current.title}
              </h2>
            </legend>
            <p id="brief-hint" className="t-body mt-4">
              {current.hint}
            </p>

            <div className="mt-10">
              {current.id === "types" && (
                <div className="flex flex-wrap gap-2.5">
                  {options.types.map((t) => (
                    <Choice key={t} type="checkbox" name="types" value={t} checked={brief.types.includes(t)} onChange={() => toggleType(t)} />
                  ))}
                </div>
              )}
              {(current.id === "stage" || current.id === "timeline" || current.id === "budget") && (
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {options[current.id].map((o) => (
                    <Choice key={o} type="radio" name={current.id} value={o} checked={brief[current.id] === o} onChange={() => set(current.id, o)} />
                  ))}
                </div>
              )}
              {current.id === "description" && (
                <Field label="Votre besoin" hint={`${brief.description.trim().length} caractères — 20 minimum`}>
                  <textarea
                    rows={5}
                    value={brief.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Ex. : nous souhaitons remplacer notre outil de planification par une application web connectée à notre ERP…"
                    className={`${inputCls} resize-none text-[1.125rem] leading-relaxed`}
                    required
                  />
                </Field>
              )}
              {current.id === "contact" && (
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field label="Nom *">
                    <input className={inputCls} autoComplete="name" value={brief.name} onChange={(e) => set("name", e.target.value)} required />
                  </Field>
                  <Field label="E-mail *">
                    <input className={inputCls} type="email" autoComplete="email" value={brief.email} onChange={(e) => set("email", e.target.value)} required />
                  </Field>
                  <Field label="Organisation">
                    <input className={inputCls} autoComplete="organization" value={brief.company} onChange={(e) => set("company", e.target.value)} />
                  </Field>
                  <Field label="Téléphone">
                    <input className={inputCls} type="tel" autoComplete="tel" value={brief.phone} onChange={(e) => set("phone", e.target.value)} />
                  </Field>
                  <label className="flex cursor-pointer items-start gap-3 sm:col-span-2">
                    <input type="checkbox" checked={brief.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-4 w-4 accent-[var(--color-signal)]" required />
                    <span className="t-body text-[0.9rem]">
                      J'accepte que ces informations soient utilisées pour répondre à ma demande, conformément à la{" "}
                      <TLink to="/confidentialite" className="text-bone underline decoration-[var(--line-strong)] underline-offset-4">
                        politique de confidentialité
                      </TLink>
                      . *
                    </span>
                  </label>
                </div>
              )}
            </div>
          </fieldset>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-8">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="t-label link-underline text-ash transition-colors hover:text-bone disabled:pointer-events-none disabled:opacity-30"
          >
            ← Retour
          </button>
          <Button type="submit" disabled={!canContinue}>
            {step === steps.length - 1 ? "Préparer le brief" : "Continuer"}
          </Button>
        </div>
      </form>

      <div className="lg:col-span-4 lg:col-start-9">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
          <BriefSpec brief={brief} reference={reference} step={step} total={steps.length} />
          <p className="t-body mt-6 text-[0.875rem]">
            Vous préférez écrire directement ?{" "}
            <a href={`mailto:${site.email}`} className="link-underline text-bone">
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
