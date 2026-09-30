import type { Route } from "./+types/privacy";
import { site } from "~/content/site";
import { seo } from "~/lib/seo";
import { LegalPage, Todo } from "~/sections/LegalPage";

export const meta: Route.MetaFunction = () =>
  seo({ title: "Politique de confidentialité", description: `Traitement des données personnelles sur le site ${site.name}.`, path: "/confidentialite" });

export default function Privacy() {
  return (
    <LegalPage
      index="L2"
      title="Politique de confidentialité"
      updated="à compléter"
      sections={[
        {
          title: "Responsable du traitement",
          body: (
            <p>
              {site.name}, <Todo>adresse</Todo>. Contact : <a href={`mailto:${site.email}`} className="link-underline text-bone">{site.email}</a>.
            </p>
          ),
        },
        {
          title: "Données collectées",
          body: (
            <p>
              Via le brief de projet : nom, adresse e-mail, organisation et téléphone (facultatifs), ainsi que la description de
              votre besoin. Aucune donnée n'est collectée à votre insu. Ce site n'utilise pas de cookie publicitaire.
            </p>
          ),
        },
        {
          title: "Finalités et base légale",
          body: (
            <p>
              Répondre à votre demande et, le cas échéant, préparer une proposition. Base légale : votre consentement et les
              mesures précontractuelles prises à votre demande (RGPD, art. 6.1.a et 6.1.b).
            </p>
          ),
        },
        {
          title: "Durée de conservation",
          body: (
            <p>
              <Todo>Durée — par exemple 3 ans après le dernier contact</Todo>, puis suppression ou anonymisation.
            </p>
          ),
        },
        {
          title: "Vos droits",
          body: (
            <p>
              Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité.
              Pour l'exercer : <a href={`mailto:${site.email}`} className="link-underline text-bone">{site.email}</a>. Vous pouvez
              également introduire une réclamation auprès de l'autorité de protection des données compétente.
            </p>
          ),
        },
        {
          title: "Sécurité",
          body: (
            <p>
              Les données sont transmises de façon chiffrée et conservées sur des systèmes dont l'accès est restreint. Mesures
              détaillées : <Todo>à préciser selon l'hébergement retenu</Todo>.
            </p>
          ),
        },
      ]}
    />
  );
}
