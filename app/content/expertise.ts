/**
 * Carte d'expertise — domaines, positions sur le schéma et technologies.
 * TODO: ajuster les technologies à la stack réellement pratiquée.
 */
export type DomainId =
  | "frontend"
  | "mobile"
  | "desktop"
  | "backend"
  | "ai"
  | "database"
  | "cloud"
  | "infrastructure"
  | "devops"
  | "security";

export type Domain = {
  id: DomainId;
  code: string;
  name: string;
  /** Position sur un plan de 1000 × 640 */
  x: number;
  y: number;
  text: string;
  practices: string[];
  tech: string[];
};

export const domains: Domain[] = [
  {
    id: "frontend",
    code: "FE",
    name: "Frontend",
    x: 170,
    y: 110,
    text: "Interfaces rapides, accessibles et maintenables, construites sur des design systems.",
    practices: ["Rendu statique et hybride", "Accessibilité WCAG / RGAA", "Design systems", "Performance Web Vitals"],
    tech: ["TypeScript", "React", "Next.js", "Vue", "Tailwind CSS", "GSAP", "Three.js"],
  },
  {
    id: "mobile",
    code: "MB",
    name: "Mobile",
    x: 500,
    y: 110,
    text: "Applications iOS et Android, multiplateformes ou natives, conçues pour le hors connexion.",
    practices: ["Offline-first", "Stockage chiffré", "OWASP MASVS", "Publication stores"],
    tech: ["React Native", "Flutter", "Swift", "Kotlin", "SQLite"],
  },
  {
    id: "desktop",
    code: "DK",
    name: "Desktop",
    x: 830,
    y: 110,
    text: "Applications de poste de travail légères, signées, avec mises à jour automatiques sûres.",
    practices: ["Multiplateforme", "Intégration matérielle", "Signature de code", "Mises à jour vérifiées"],
    tech: ["Tauri", "Electron", "Rust", "C#/.NET", "WPF"],
  },
  {
    id: "backend",
    code: "BE",
    name: "Backend",
    x: 320,
    y: 270,
    text: "Services et API robustes, typés et testés, pensés pour être lus et modifiés.",
    practices: ["API REST & GraphQL", "Architecture hexagonale", "Tests automatisés", "Files de messages"],
    tech: ["Node.js", "Python", "Go", "C#/.NET", "RabbitMQ"],
  },
  {
    id: "ai",
    code: "IA",
    name: "IA appliquée",
    x: 680,
    y: 270,
    text: "Intégration de modèles de langage et d'apprentissage là où ils apportent un gain mesurable.",
    practices: ["Extraction de documents", "Recherche sémantique", "Assistants internes", "Évaluation & garde-fous"],
    tech: ["Python", "API LLM", "pgvector", "LangGraph", "ONNX"],
  },
  {
    id: "database",
    code: "DB",
    name: "Données",
    x: 500,
    y: 400,
    text: "Modélisation, performance et protection des données, du transactionnel à l'analytique.",
    practices: ["Modélisation", "Chiffrement", "Sauvegardes testées", "Migrations sans interruption"],
    tech: ["PostgreSQL", "Redis", "SQLite", "MongoDB", "ClickHouse"],
  },
  {
    id: "cloud",
    code: "CL",
    name: "Cloud",
    x: 170,
    y: 530,
    text: "Architectures cloud dimensionnées au besoin réel, avec maîtrise des coûts et de la souveraineté.",
    practices: ["Multi-cloud", "Hébergement souverain", "FinOps", "Haute disponibilité"],
    tech: ["AWS", "Azure", "GCP", "OVHcloud", "Scaleway"],
  },
  {
    id: "infrastructure",
    code: "IN",
    name: "Infrastructure",
    x: 500,
    y: 530,
    text: "Infrastructures décrites en code, reproductibles, supervisées et documentées.",
    practices: ["Infrastructure as Code", "Conteneurs", "Réseau & segmentation", "Plan de reprise"],
    tech: ["Terraform", "Ansible", "Kubernetes", "Docker", "Linux"],
  },
  {
    id: "devops",
    code: "DO",
    name: "DevOps",
    x: 830,
    y: 530,
    text: "Livraison continue et observabilité : chaque changement est testé, tracé et réversible.",
    practices: ["CI/CD", "Observabilité", "Gestion des secrets", "Déploiements progressifs"],
    tech: ["GitHub Actions", "GitLab CI", "Grafana", "Prometheus", "OpenTelemetry"],
  },
  {
    id: "security",
    code: "SC",
    name: "Sécurité",
    x: 500,
    y: 620,
    text: "La sécurité n'est pas un domaine à part : elle entoure et traverse chacun des autres.",
    practices: ["Sécurité dès la conception", "Tests d'intrusion", "Revue de code", "Durcissement & conformité"],
    tech: ["OWASP", "MITRE ATT&CK", "Burp Suite", "Semgrep", "Wazuh", "Vault"],
  },
];

export const links: [DomainId, DomainId][] = [
  ["frontend", "backend"],
  ["mobile", "backend"],
  ["mobile", "ai"],
  ["desktop", "ai"],
  ["desktop", "backend"],
  ["backend", "ai"],
  ["backend", "database"],
  ["ai", "database"],
  ["backend", "cloud"],
  ["database", "infrastructure"],
  ["cloud", "infrastructure"],
  ["infrastructure", "devops"],
  ["ai", "devops"],
];
