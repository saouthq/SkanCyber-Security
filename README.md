# SkanCyber — site du groupe

Site vitrine français en Next.js 15, React 19, TypeScript, Framer Motion et Three.js. Export statique, sans variable d’environnement requise pour le site.

## Développement et vérification

```sh
npm ci
npm run dev
npm run check
npm run build
```

Le build exporte la page dans `out/`. Les polices sont locales. Aucune texture distante, aucun suivi d’audience ni cookie de collecte.

## Direction artistique

Ivoire, bleu électrique, orange signal et vert minéral. Sculpture procédurale en Three.js, narration en trois temps au défilement, démonstrations interactives des logiciels, schéma du restaurant de Strasbourg et contact contextualisé.

- `components/SkanExperience.tsx` : narration, navigation, schéma et contact.
- `components/SignalSculpture.tsx` : sculpture 3D procédurale, cycle de vie et pointeur.
- `components/ProductLab.tsx` : présentation des produits et démonstrations.
- `app/experience.css` : mise en page, identité, adaptations et mouvement réduit.

Le WebGL utilise une résolution plafonnée et s’arrête hors écran ou en onglet masqué. Une illustration vectorielle remplace la 3D avec le mouvement réduit ou si WebGL est indisponible. Le bouton de pause arrête les animations ambiantes. La narration reste lisible sans mouvement et les démos sont pilotées manuellement.

Les démos utilisent des données fictives. SkanEcom et SkanRestau montrent des concepts d’interface ; leur disponibilité et leur périmètre sont à préciser avec le fondateur. Aucune connexion entre les produits n’est promise. Le réseau du restaurant repose sur les informations du projet fourni ; les interactions sont simulées.

## Publication

Projet Vercel existant : `skancyber-security`. Production : https://skancyber-security.vercel.app

```sh
vercel link --project skancyber-security --scope saouthqs-projects
vercel deploy --yes
vercel promote <url-validée> --yes
```

La source est conservée dans le dépôt `saouthq/SkanCyber-Security`, branche par défaut `claude/dazzling-babbage-jcert0`.
