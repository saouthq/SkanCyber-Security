/**
 * ÉTUDES DE CAS D'EXEMPLE
 * ───────────────────────
 * Ces projets sont fictifs : ils servent à montrer le rendu des pages.
 * Le champ `example: true` affiche un marqueur visible sur le site.
 * À remplacer par de vrais projets (anonymisés si nécessaire) avant la mise en ligne.
 */
export type ProjectVisual = "portal" | "logistics" | "field" | "network";

export type Project = {
  slug: string;
  index: string;
  title: string;
  client: string;
  sector: string;
  year: string;
  services: string[];
  summary: string;
  context: string;
  problem: string;
  solution: string;
  solutionPoints: string[];
  architecture: { label: string; detail: string }[];
  stack: string[];
  results: { value: string; label: string }[];
  visual: ProjectVisual;
  example: true;
};

export const projects: Project[] = [
  {
    slug: "portail-patients-securise",
    index: "P.01",
    title: "Portail patients sécurisé",
    client: "Groupe de cliniques privées",
    sector: "Santé",
    year: "2025",
    services: ["Application web", "Cybersécurité", "Architecture"],
    summary: "Un espace patient unique pour les rendez-vous, documents médicaux et échanges sécurisés.",
    context:
      "Un groupe de cinq cliniques gère les rendez-vous et l'envoi de documents médicaux via trois outils distincts, avec de nombreux échanges par e-mail non chiffrés.",
    problem:
      "Les données de santé transitent hors de tout cadre maîtrisé. Les équipes administratives passent un temps important à ressaisir les informations entre les outils.",
    solution:
      "Conception d'un portail patient unifié, hébergé sur une infrastructure certifiée pour les données de santé, avec authentification forte et journal d'accès complet.",
    solutionPoints: [
      "Authentification multi-facteur et gestion fine des consentements",
      "Chiffrement des documents au repos et en transit",
      "Connecteurs vers les logiciels de gestion existants",
      "Test d'intrusion avant mise en production, puis contre-audit",
    ],
    architecture: [
      { label: "Portail patient", detail: "React · SSR" },
      { label: "Passerelle API", detail: "Auth MFA · limitation" },
      { label: "Services métier", detail: "Node.js · files d'attente" },
      { label: "Données", detail: "PostgreSQL chiffré · stockage objet" },
      { label: "Connecteurs", detail: "Logiciels de gestion existants" },
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Keycloak", "Terraform"],
    results: [
      { value: "3 → 1", label: "outils remplacés par un portail unique" },
      { value: "0", label: "vulnérabilité critique au contre-audit" },
      { value: "−40 %", label: "de temps de traitement administratif" },
    ],
    visual: "portal",
    example: true,
  },
  {
    slug: "plateforme-logistique-temps-reel",
    index: "P.02",
    title: "Plateforme logistique temps réel",
    client: "Transporteur régional",
    sector: "Transport & logistique",
    year: "2025",
    services: ["SaaS", "Automatisation", "Infrastructure"],
    summary: "Suivi en temps réel de la flotte et automatisation de la planification des tournées.",
    context:
      "Un transporteur de 120 véhicules planifie ses tournées sur tableur et suit ses livraisons par téléphone.",
    problem:
      "Aucune visibilité en temps réel, des retards détectés trop tard et une planification qui dépend de deux personnes clés.",
    solution:
      "Développement d'une plateforme SaaS de suivi de flotte, reliée aux boîtiers télématiques, avec un moteur d'optimisation des tournées et des alertes automatiques.",
    solutionPoints: [
      "Ingestion des positions GPS en flux continu",
      "Optimisation des tournées sous contraintes (horaires, capacité)",
      "Notifications automatiques aux clients destinataires",
      "Infrastructure décrite en code, supervisée 24/7",
    ],
    architecture: [
      { label: "Boîtiers télématiques", detail: "MQTT" },
      { label: "Ingestion", detail: "Go · file de messages" },
      { label: "Optimisation", detail: "Python · solveur" },
      { label: "Plateforme", detail: "React · WebSocket" },
      { label: "Infrastructure", detail: "Kubernetes · Grafana" },
    ],
    stack: ["Go", "Python", "React", "PostgreSQL", "Kubernetes", "Grafana"],
    results: [
      { value: "120", label: "véhicules suivis en temps réel" },
      { value: "−18 %", label: "de kilomètres parcourus" },
      { value: "< 2 s", label: "entre la position GPS et l'écran" },
    ],
    visual: "logistics",
    example: true,
  },
  {
    slug: "application-terrain-hors-ligne",
    index: "P.03",
    title: "Application terrain hors ligne",
    client: "Entreprise de maintenance industrielle",
    sector: "Industrie",
    year: "2024",
    services: ["Application mobile", "Application desktop", "Intégration"],
    summary: "Rapports d'intervention numériques utilisables sans réseau, synchronisés avec l'ERP.",
    context:
      "Quarante techniciens interviennent sur des sites industriels souvent dépourvus de réseau. Les rapports sont rédigés sur papier puis ressaisis.",
    problem:
      "Délais de facturation longs, rapports incomplets et photos perdues. Aucune traçabilité fiable des interventions.",
    solution:
      "Application mobile hors ligne pour les techniciens et application desktop pour le bureau d'études, synchronisées avec l'ERP existant.",
    solutionPoints: [
      "Fonctionnement intégral sans réseau, synchronisation différée",
      "Stockage local chiffré, effacement à distance",
      "Signature client et photos horodatées",
      "Connecteur bidirectionnel avec l'ERP",
    ],
    architecture: [
      { label: "App mobile", detail: "React Native · SQLite chiffré" },
      { label: "Synchronisation", detail: "Résolution de conflits" },
      { label: "API", detail: "Node.js" },
      { label: "App bureau", detail: "Tauri" },
      { label: "ERP", detail: "Connecteur bidirectionnel" },
    ],
    stack: ["React Native", "Tauri", "Rust", "Node.js", "SQLite", "PostgreSQL"],
    results: [
      { value: "J+1", label: "facturation après intervention, contre J+12" },
      { value: "100 %", label: "des rapports complets et signés" },
      { value: "40", label: "techniciens équipés" },
    ],
    visual: "field",
    example: true,
  },
  {
    slug: "durcissement-si-industriel",
    index: "P.04",
    title: "Durcissement d'un SI industriel",
    client: "Site de production agroalimentaire",
    sector: "Industrie",
    year: "2024",
    services: ["Cybersécurité", "Architecture", "Infrastructure"],
    summary: "Audit, segmentation réseau et durcissement d'un système d'information industriel en activité.",
    context:
      "Un site de production fonctionne avec un réseau à plat reliant bureautique, supervision industrielle et accès distants des prestataires.",
    problem:
      "Un poste bureautique compromis pouvait atteindre directement les automates de production. Aucune supervision des accès distants.",
    solution:
      "Audit complet, puis segmentation progressive du réseau, bastion pour les accès distants et supervision des flux — sans interruption de la production.",
    solutionPoints: [
      "Cartographie des flux IT / OT",
      "Segmentation en zones et conduits (IEC 62443)",
      "Bastion d'administration et MFA pour les prestataires",
      "Supervision des flux et procédures de réponse",
    ],
    architecture: [
      { label: "Bureautique", detail: "Zone IT" },
      { label: "DMZ industrielle", detail: "Pare-feu · bastion" },
      { label: "Supervision", detail: "SCADA" },
      { label: "Automates", detail: "Zone OT isolée" },
      { label: "Détection", detail: "Sondes · journalisation" },
    ],
    stack: ["IEC 62443", "pfSense", "WireGuard", "Wazuh", "Ansible", "Nmap"],
    results: [
      { value: "5", label: "zones réseau au lieu d'un réseau à plat" },
      { value: "0 h", label: "d'arrêt de production pendant la migration" },
      { value: "100 %", label: "des accès distants tracés" },
    ],
    visual: "network",
    example: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
