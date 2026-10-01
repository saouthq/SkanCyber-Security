import type { Route } from "./+types/legal-notice";
import { site } from "~/content/site";
import { seo } from "~/lib/seo";
import { LegalPage, Todo } from "~/sections/LegalPage";

export const meta: Route.MetaFunction = () =>
  seo({ title: "Mentions légales", description: `Mentions légales du site ${site.name}.`, path: "/mentions-legales" });

export default function LegalNotice() {
  return (
    <LegalPage
      index="L1"
      title="Mentions légales"
      updated="à compléter"
      sections={[
        {
          title: "Éditeur du site",
          body: (
            <>
              <p>
                {site.name} — <Todo>forme juridique</Todo> au capital de <Todo>montant</Todo> €.
              </p>
              <p>
                Siège social : <Todo>adresse complète</Todo>. Immatriculation : <Todo>RCS / identifiant fiscal</Todo>.
              </p>
              <p>
                Contact : <a href={`mailto:${site.email}`} className="link-underline text-ink">{site.email}</a> · <Todo>téléphone</Todo>
              </p>
            </>
          ),
        },
        { title: "Directeur de la publication", body: <p><Todo>Nom et fonction</Todo></p> },
        {
          title: "Hébergement",
          body: (
            <p>
              <Todo>Nom de l'hébergeur</Todo> — <Todo>adresse</Todo> — <Todo>contact</Todo>.
            </p>
          ),
        },
        {
          title: "Propriété intellectuelle",
          body: (
            <p>
              L'ensemble des contenus de ce site (textes, identité visuelle, logotype, code, visuels) est la propriété de{" "}
              {site.name}, sauf mention contraire. Toute reproduction sans autorisation préalable est interdite.
            </p>
          ),
        },
        {
          title: "Responsabilité",
          body: (
            <p>
              Les informations publiées sont fournies à titre indicatif. {site.name} s'efforce de les maintenir exactes et à jour
              mais ne saurait être tenue responsable d'une erreur ou d'une omission.
            </p>
          ),
        },
      ]}
    />
  );
}
