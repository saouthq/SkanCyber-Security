# SkanCyber — site vitrine

Site français en Next.js 15, React 19, TypeScript et Framer Motion. Export statique, sans variable d’environnement requise.

## Développement

```sh
npm ci
npm run dev
npm run check
npm run build
```

Le build exporte le site dans `out/`. Polices locales, aucun suivi d’audience ni cookie de collecte.

## Présentation

Identité bleu nuit, blanc cassé et menthe. Une vitrine consacrée aux réseaux, aux sites web, aux logiciels métier, aux ERP, aux CRM et aux back-offices.

- `components/PremiumSite.tsx` : navigation responsive, services et aperçus, réalisations, approche, FAQ et contact.
- `components/MotionArchitecture.tsx` : scène fixe au défilement, quatre éléments persistants qui deviennent réseau, site web puis application, profondeur au pointeur, navigation entre les actes et présentation statique en mouvement réduit.
- `components/SignatureScenes.tsx` : composition d’accueil interactive, facture de démonstration intégrée au tableau de bord, déploiement des quatre usages réseau et réunion des métiers au contact.
- `components/PremiumMotion.tsx` : titre séquencé, profondeur du visuel, progression de lecture, accordéons et méthode animés.
- `app/premium.css` : identité, mises en page et adaptations mobiles.
- `public/images/infrastructure.jpg` : illustration d’infrastructure créée pour le site ; elle ne représente pas une installation client.

Les sections communiquent : liens d’accueil vers la bonne expertise, réalisations vers leurs domaines, services vers les projets correspondants et sujet conservé au contact. La navigation indique la section en cours. Les animations de révélation et les transitions respectent la préférence de mouvement réduit. Les aperçus d’interfaces utilisent des données fictives. Les réalisations présentent SkanFact et le projet réseau du restaurant de Strasbourg décrit dans les informations fournies. Les coordonnées permettent de contacter directement SkanCyber par téléphone ; le site ne simule pas un envoi de formulaire.

Le récit concentre le mouvement sur l’accueil, la transformation réseau → site → logiciel et les démonstrations de réalisations. Le signe flottant et les grandes traversées entre sections ont été retirés. Les démonstrations sont locales, utilisent des données fictives et n’émettent aucune facture réelle ni configuration réseau. L’aperçu web propose une bascule ordinateur/mobile animée. Le contact réunit les trois métiers avant les coordonnées directes.

## Publication

Projet Vercel : `skancyber-security`. Production : https://skancyber-security.vercel.app

```sh
vercel deploy --yes
vercel deploy --prod --yes
```

Dépôt : `saouthq/SkanCyber-Security`, branche par défaut `claude/dazzling-babbage-jcert0`.
