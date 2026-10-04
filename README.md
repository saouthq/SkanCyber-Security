# SKANCYBER SECURITY

Première version du site vitrine français. Next.js App Router, TypeScript, Tailwind CSS 4, Framer Motion et Three.js. Export HTML statique adapté à Vercel.

## Démarrer

```sh
npm ci
npm run dev
```

## Vérifier et déployer

```sh
npm run check
npm run build
```

Importer ce dossier dans un dépôt Git puis dans Vercel, sélectionner Next.js, commande `npm run build`. Le dossier `out/` contient également l’export statique déjà compilé. Ne pas ouvrir directement son index en file:// : les ressources utilisent des chemins absolus. Pour une consultation locale de l’export : `python3 -m http.server 8000 --directory out`, puis ouvrir http://localhost:8000.

Aucun secret ni variable d’environnement nécessaire. Aucune publication effectuée : aucun compte Vercel connecté à la session de création. Aucun domaine réel configuré.

## Inclus

- Page française, liens d’ancrage, menu mobile, contacts téléphoniques fonctionnels.
- Console réseau / CRM / ERP automatique, sélection manuelle, pause.
- Démonstration Wi-Fi avec sélection des bornes et déplacement du terminal.
- Quatre réseaux séparés, test d’isolation simulé.
- Démonstration ERP avec commande, stock, facture et paiement.
- Réalisations restaurant Strasbourg et SkanFact ; emplacement supplémentaire explicitement à confirmer.
- Méthode proposée, fondateur, contact, informations légales.
- Maillage Three.js différé de 400 ms après montage ; shader de particules écrit à la main, liens, paquets lumineux, menace corail et membrane temporaire, réaction au curseur, transitions selon la section.
- 65 nœuds sur petit écran contre 150 sur ordinateur ; densité de pixels plafonnée à 1,5 ; rendu suspendu en onglet masqué ; nettoyage des ressources WebGL.
- Repli SVG si WebGL indisponible ou préférence de mouvement réduit. Les animations CSS s’arrêtent également et les démonstrations cessent leur progression automatique.
- Pas d’analytics, cookies ou formulaire de collecte. Polices Google Fonts (requête externe, sans bibliothèque de suivi).

## À confirmer avant mise en ligne commerciale

1. E-mail.
2. Nom de domaine.
3. Zones précises d’intervention sur place : France / Grand Est et Tunisie.
4. Intitulé exact de la formation et formulation du master en cours.
5. Autorisation de nommer le restaurant : nom volontairement absent.
6. Statut de SkanFact comme produit de SkanCyber.
7. Autres réalisations autorisées à montrer.
8. Tarifs : « sur devis » actuellement.
9. Gratuité du devis, délai de réponse et modalités d’accompagnement.
10. Coordonnées finales de l’hébergement après publication Vercel.
11. Suite du brief, reçu tronqué au milieu de la section 5.

La suite des sections a été proposée à partir des liens de navigation et des faits fournis. Aucun témoignage, client nommé, certification ou statistique commerciale n’a été créé. Les chiffres d’interfaces sont fictifs et marqués « démo ».

## Validation et limites

Build Next.js de production et vérification TypeScript réussis. Export HTML inspecté : titres, contacts et sections présents, ancres internes valides. Contrôle visuel et interactions réelles dans un navigateur non effectués (capacité de test navigateur prescrite indisponible). Performances 60 images/s non mesurées. Un contrôle ordinateur/mobile doit précéder la publication finale.

Le maillage représente les topologies demandées de manière abstraite. Les démonstrations ne sont pas reliées à un système réel ; le passage inter-onglets illustre le parcours, sans synchronisation métier persistante. Les sections méthode, fondateur, réalisations et contact sont éditoriales ; elles n’ont pas toutes leur propre maquette animée. Le site est donc une première version fonctionnelle à réviser contre la suite du brief, pas une validation exhaustive de toutes ses exigences.

## Fichiers principaux

- `app/page.tsx` : contenu HTML et sections.
- `app/globals.css` : identité visuelle et adaptation mobile.
- `components/Demos.tsx` : interfaces interactives.
- `components/Mesh.tsx` : scène WebGL et shader.
- `app/layout.tsx` : langue, titre et description SEO.
