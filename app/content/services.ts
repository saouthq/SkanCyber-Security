export type LayerId = "interface" | "logique" | "flux" | "fondations" | "perimetre";

export type GlyphId =
  | "cyber"
  | "software"
  | "web"
  | "mobile"
  | "desktop"
  | "saas"
  | "automation"
  | "infra";

export type Service = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  layer: LayerId;
  glyph: GlyphId;
  summary: string;
  intro: string;
  capabilities: { title: string; text: string }[];
  deliverables: string[];
  stack: string[];
  approach: { title: string; text: string }[];
};

export const services: Service[] = [
  {
    slug: "cybersecurite",
    index: "01",
    name: "Cybersécurité",
    tagline: "Mesurer l'exposition. Réduire la surface. Tenir dans la durée.",
    layer: "perimetre",
    glyph: "cyber",
    summary:
      "Audits, tests d'intrusion, durcissement et accompagnement à la conformité — avec des recommandations que vos équipes peuvent réellement appliquer.",
    intro:
      "Nous abordons la sécurité comme des ingénieurs : en comprenant comment votre système fonctionne avant d'évaluer comment il peut céder. Chaque constat est reproductible, priorisé selon son impact réel et accompagné d'une correction concrète.",
    capabilities: [
      { title: "Audit de sécurité", text: "Revue d'architecture, de configuration et de processus. Cartographie de la surface d'attaque." },
      { title: "Tests d'intrusion", text: "Applications web, API, mobile et réseau interne. Méthodologie documentée, preuves reproductibles." },
      { title: "Revue de code sécurité", text: "Analyse manuelle et outillée du code source, orientée vulnérabilités exploitables." },
      { title: "Durcissement", text: "Configuration des serveurs, du cloud, des identités et des accès selon les référentiels reconnus." },
      { title: "Accompagnement conformité", text: "Préparation aux exigences ISO 27001, NIS 2 et RGPD : écarts, plan d'action, preuves." },
      { title: "Sensibilisation", text: "Formations ciblées pour les équipes techniques et métiers, construites sur vos cas réels." },
    ],
    deliverables: ["Rapport de constats priorisés", "Plan de remédiation", "Synthèse pour la direction", "Contre-audit après correction"],
    stack: ["OWASP ASVS", "MITRE ATT&CK", "NIST CSF 2.0", "Burp Suite", "Nmap", "Semgrep", "CIS Benchmarks"],
    approach: [
      { title: "Cadrer", text: "Périmètre, règles d'engagement, objectifs métier." },
      { title: "Éprouver", text: "Tests manuels et outillés, selon une méthodologie documentée." },
      { title: "Prioriser", text: "Chaque constat est classé par impact et facilité d'exploitation." },
      { title: "Corriger", text: "Accompagnement de la remédiation, puis vérification." },
    ],
  },
  {
    slug: "developpement-logiciel",
    index: "02",
    name: "Ingénierie logicielle",
    tagline: "Du logiciel métier conçu pour durer, pas seulement pour être livré.",
    layer: "logique",
    glyph: "software",
    summary:
      "Conception et développement de logiciels sur mesure : architecture claire, code lisible, tests automatisés et documentation.",
    intro:
      "Un logiciel sur mesure n'a de valeur que s'il reste compréhensible et modifiable dans cinq ans. Nous concevons des architectures simples à raisonner, écrivons un code que vos équipes peuvent reprendre et automatisons ce qui doit l'être.",
    capabilities: [
      { title: "Conception & architecture", text: "Modélisation du domaine, découpage en modules, choix techniques argumentés." },
      { title: "Développement", text: "Code typé, testé, revu. Intégration continue dès le premier jour." },
      { title: "Modernisation", text: "Reprise d'applications existantes, migration progressive sans rupture de service." },
      { title: "API & interopérabilité", text: "API REST et GraphQL documentées, versionnées et sécurisées." },
    ],
    deliverables: ["Code source et droits associés", "Documentation technique", "Tests automatisés", "Pipeline CI/CD"],
    stack: ["TypeScript", "Node.js", "Python", "Go", "C#/.NET", "PostgreSQL"],
    approach: [
      { title: "Comprendre", text: "Ateliers métier, contraintes, existant." },
      { title: "Concevoir", text: "Architecture, maquettes, découpage en lots." },
      { title: "Livrer", text: "Itérations courtes, démonstrations régulières." },
      { title: "Transmettre", text: "Documentation, formation, maintenance." },
    ],
  },
  {
    slug: "developpement-web",
    index: "03",
    name: "Sites & applications web",
    tagline: "Des interfaces rapides, accessibles et sûres, du site vitrine à l'application métier.",
    layer: "interface",
    glyph: "web",
    summary:
      "Sites institutionnels, plateformes et applications web performantes, pensées pour l'accessibilité, le référencement et la sécurité.",
    intro:
      "Le web est la surface la plus exposée de votre système. Nous construisons des interfaces rapides et accessibles, avec une attention particulière à ce qui ne se voit pas : en-têtes de sécurité, gestion des sessions, validation des entrées.",
    capabilities: [
      { title: "Sites institutionnels", text: "Identité forte, performance, référencement et contenu administrable." },
      { title: "Applications web", text: "Espaces clients, back-offices, outils métier riches et réactifs." },
      { title: "Performance", text: "Core Web Vitals, rendu statique ou hybride, optimisation des médias." },
      { title: "Accessibilité", text: "Conformité WCAG / RGAA, navigation clavier, contrastes, lecteurs d'écran." },
    ],
    deliverables: ["Application déployée", "Design system", "Audit Lighthouse & accessibilité", "Documentation d'exploitation"],
    stack: ["React", "Next.js", "React Router", "Vue", "Tailwind CSS", "Node.js"],
    approach: [
      { title: "Cadrer", text: "Objectifs, publics, parcours clés." },
      { title: "Designer", text: "Direction artistique, prototypes, design system." },
      { title: "Développer", text: "Composants, intégration, tests." },
      { title: "Mesurer", text: "Performance, accessibilité, analytique respectueuse." },
    ],
  },
  {
    slug: "applications-mobiles",
    index: "04",
    name: "Applications mobiles",
    tagline: "iOS et Android, fluides en main, robustes hors connexion.",
    layer: "interface",
    glyph: "mobile",
    summary:
      "Applications mobiles natives ou multiplateformes, conçues pour les usages terrain comme pour le grand public.",
    intro:
      "Une application mobile vit dans des conditions difficiles : réseau instable, appareils variés, données sensibles stockées localement. Nous concevons pour ces contraintes dès le départ.",
    capabilities: [
      { title: "Multiplateforme", text: "React Native ou Flutter pour une base de code unique et des performances natives." },
      { title: "Hors connexion", text: "Synchronisation, gestion des conflits, stockage local chiffré." },
      { title: "Sécurité mobile", text: "Authentification forte, protection des secrets, conformité OWASP MASVS." },
      { title: "Publication", text: "Préparation et suivi des soumissions App Store et Google Play." },
    ],
    deliverables: ["Applications publiées", "Back-end et API", "Tableau de bord d'administration", "Guide de maintenance"],
    stack: ["React Native", "Flutter", "Swift", "Kotlin", "SQLite", "Firebase"],
    approach: [
      { title: "Explorer", text: "Usages réels, contraintes terrain." },
      { title: "Prototyper", text: "Parcours testés sur appareil." },
      { title: "Construire", text: "Itérations et tests sur parc d'appareils." },
      { title: "Publier", text: "Déploiement progressif, suivi des incidents." },
    ],
  },
  {
    slug: "applications-desktop",
    index: "05",
    name: "Applications desktop",
    tagline: "Des outils de poste de travail précis, rapides et intégrés à votre environnement.",
    layer: "interface",
    glyph: "desktop",
    summary:
      "Applications Windows, macOS et Linux pour les métiers qui exigent puissance, accès matériel ou fonctionnement local.",
    intro:
      "Certains métiers ont besoin d'un logiciel installé : accès au matériel, gros volumes de données, fonctionnement isolé. Nous développons des applications desktop modernes, signées et mises à jour de façon sûre.",
    capabilities: [
      { title: "Multiplateforme", text: "Tauri ou Electron pour Windows, macOS et Linux depuis une même base." },
      { title: "Natif", text: "C#/.NET ou Rust lorsque la performance ou l'intégration système l'exigent." },
      { title: "Intégration matérielle", text: "Périphériques, ports série, lecteurs, imprimantes spécialisées." },
      { title: "Mises à jour sûres", text: "Signature de code, mises à jour automatiques vérifiées." },
    ],
    deliverables: ["Installeurs signés", "Canal de mise à jour", "Documentation utilisateur", "Code source"],
    stack: ["Tauri", "Electron", "Rust", "C#/.NET", "WPF", "SQLite"],
    approach: [
      { title: "Analyser", text: "Postes, environnements, contraintes réseau." },
      { title: "Concevoir", text: "Interface dense mais lisible." },
      { title: "Développer", text: "Tests sur chaque plateforme cible." },
      { title: "Déployer", text: "Packaging, signature, diffusion." },
    ],
  },
  {
    slug: "saas",
    index: "06",
    name: "Solutions SaaS",
    tagline: "Des plateformes multi-clients pensées pour l'échelle et l'isolation des données.",
    layer: "logique",
    glyph: "saas",
    summary:
      "Conception et développement de produits SaaS : architecture multi-tenant, facturation, gestion des rôles et observabilité.",
    intro:
      "Un SaaS réussi repose sur des fondations invisibles : isolation stricte des données entre clients, gestion fine des droits, facturation fiable, supervision. Nous les concevons avant la première fonctionnalité.",
    capabilities: [
      { title: "Architecture multi-tenant", text: "Isolation des données adaptée à votre modèle et à vos contraintes réglementaires." },
      { title: "Identités & rôles", text: "SSO, authentification forte, permissions granulaires, journal d'audit." },
      { title: "Facturation", text: "Abonnements, usage mesuré, intégration Stripe." },
      { title: "Observabilité", text: "Logs, métriques, traces et alertes dès la mise en production." },
    ],
    deliverables: ["Plateforme en production", "Console d'administration", "Documentation API", "Runbooks d'exploitation"],
    stack: ["TypeScript", "PostgreSQL", "Redis", "Stripe", "Kubernetes", "OpenTelemetry"],
    approach: [
      { title: "Modéliser", text: "Offre, tenants, rôles, données." },
      { title: "Fonder", text: "Socle technique, sécurité, CI/CD." },
      { title: "Itérer", text: "Fonctionnalités par valeur métier." },
      { title: "Opérer", text: "Supervision, astreinte, évolutions." },
    ],
  },
  {
    slug: "automatisation",
    index: "07",
    name: "Automatisation & intégration",
    tagline: "Relier vos outils et supprimer les tâches répétitives, sans créer de boîte noire.",
    layer: "flux",
    glyph: "automation",
    summary:
      "Automatisation de processus, intégration de systèmes hétérogènes et pipelines de données fiables et observables.",
    intro:
      "Chaque ressaisie manuelle est une source d'erreur et une perte de temps. Nous connectons vos systèmes (ERP, CRM, outils métier) avec des flux traçables, testés et faciles à faire évoluer.",
    capabilities: [
      { title: "Automatisation de processus", text: "Workflows métier, validations, notifications, génération de documents." },
      { title: "Intégration de systèmes", text: "Connecteurs entre ERP, CRM, comptabilité et outils internes." },
      { title: "Pipelines de données", text: "Collecte, transformation et synchronisation fiables et rejouables." },
      { title: "IA appliquée", text: "Extraction de documents, classification, assistants internes, avec contrôle humain." },
    ],
    deliverables: ["Flux automatisés en production", "Cartographie des échanges", "Supervision & alertes", "Documentation"],
    stack: ["Python", "Node.js", "n8n", "Temporal", "RabbitMQ", "API REST"],
    approach: [
      { title: "Observer", text: "Processus actuels, volumes, irritants." },
      { title: "Cartographier", text: "Systèmes, données, points de contrôle." },
      { title: "Automatiser", text: "Flux par ordre de gain." },
      { title: "Superviser", text: "Traçabilité, reprise sur erreur." },
    ],
  },
  {
    slug: "architecture-infrastructure",
    index: "08",
    name: "Architecture & infrastructure",
    tagline: "Des fondations cloud et on-premise dimensionnées, observables et reproductibles.",
    layer: "fondations",
    glyph: "infra",
    summary:
      "Architecture des systèmes d'information, infrastructure cloud ou sur site, infrastructure-as-code et DevOps.",
    intro:
      "Une bonne architecture se remarque surtout par ce qui n'arrive pas : pas de panne en cascade, pas de coûts incontrôlés, pas de dépendance à une seule personne. Nous concevons des infrastructures décrites en code, supervisées et documentées.",
    capabilities: [
      { title: "Architecture SI", text: "Audit de l'existant, schéma cible, trajectoire de transformation." },
      { title: "Cloud & sur site", text: "AWS, Azure, GCP, OVHcloud ou infrastructure interne, selon vos contraintes." },
      { title: "Infrastructure as Code", text: "Environnements reproductibles avec Terraform et Ansible." },
      { title: "DevOps & SRE", text: "CI/CD, conteneurs, supervision, plan de reprise d'activité." },
    ],
    deliverables: ["Dossier d'architecture", "Infrastructure décrite en code", "Tableaux de supervision", "Plan de reprise"],
    stack: ["AWS", "Azure", "OVHcloud", "Terraform", "Kubernetes", "Docker", "Grafana"],
    approach: [
      { title: "Auditer", text: "Existant, risques, coûts." },
      { title: "Concevoir", text: "Architecture cible argumentée." },
      { title: "Migrer", text: "Par étapes, avec retour arrière possible." },
      { title: "Exploiter", text: "Supervision, optimisation continue." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const layers: { id: LayerId; index: string; name: string; label: string; text: string }[] = [
  {
    id: "interface",
    index: "02.1",
    name: "Interface",
    label: "Ce que vos utilisateurs touchent",
    text: "Sites, applications web, mobiles et desktop. La surface visible du système — et la plus exposée.",
  },
  {
    id: "logique",
    index: "02.2",
    name: "Logique",
    label: "Ce que votre métier exige",
    text: "Logiciels sur mesure et plateformes SaaS. Les règles de votre activité, traduites en code lisible et testé.",
  },
  {
    id: "flux",
    index: "02.3",
    name: "Flux",
    label: "Ce qui circule entre vos outils",
    text: "Automatisation et intégration. Les données passent d'un système à l'autre sans ressaisie et sans perte.",
  },
  {
    id: "fondations",
    index: "02.4",
    name: "Fondations",
    label: "Ce sur quoi tout repose",
    text: "Architecture, cloud et infrastructure. Des environnements reproductibles, supervisés et dimensionnés.",
  },
];
