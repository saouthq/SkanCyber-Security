import { ScrubText } from "~/components/ui/ScrubText";
import { Eyebrow } from "~/components/ui/Eyebrow";

/** Une seule phrase, qui s'éclaire mot à mot au fil du scroll. */
export function Manifesto() {
  return (
    <section aria-label="Manifeste" className="section">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Eyebrow index="02">Notre conviction</Eyebrow>
        </div>
        <ScrubText className="t-statement lg:col-span-9">
          Un système qui fonctionne ne suffit plus. Il doit résister aux usages imprévus, aux pannes, aux erreurs et aux
          attaques. Nous construisons des logiciels et des infrastructures qui tiennent — et nous les protégeons dès la
          première ligne.
        </ScrubText>
      </div>
    </section>
  );
}
