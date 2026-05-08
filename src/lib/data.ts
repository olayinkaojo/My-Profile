import type { Project, Experience, SkillGroup, CTFEntry, Certification, Article, Stat } from "@/types"

export const meta = {
  name: "Olayinka Ojo",
  initials: "OO",
  tagline: "I build systems that hold.",
  subtagline: "And find the ones that don't.",
  role: "security engineer + software developer",
  bio: "I design and ship software at the intersection of engineering and adversarial thinking. Over 15 years building secure digital infrastructure — from authentication systems and CI/CD pipelines to SIEM-backed threat detection platforms. Currently architecting a cloud-based threat intelligence platform to make real-time security data accessible to African enterprises.",
  location: "Nigeria",
  email: "olayinkaojo.ng@gmail.com",
  linkedin: "https://linkedin.com/in/olayinka-ojo",
  github: "https://github.com/olayinkaojo",
  twitter: "https://twitter.com/olayinkaojo",
}

export const stats: Stat[] = [
  { value: "15+", label: "years in tech" },
  { value: "35%", label: "faster incident response" },
  { value: "30+", label: "client accounts secured" },
  { value: "85%", label: "CTF success rate" },
]

export const experiences: Experience[] = [
  {
    role: "Security Analyst",
    company: "Lit Creative Designs Ltd",
    period: "2023 — 2025",
    highlight: "Reduced critical incident response times by 35% across 30+ client accounts",
    bullets: [
      "Implemented log analysis using Splunk across client platforms, identifying security threats and optimizing uptime over 18 months",
      "Engineered custom authentication modules with real-time permission controls integrated into client web applications",
      "Devised automated CI/CD pipelines that accelerated release cycles and reinforced code stability across multiple client projects",
      "Streamlined digital workflows while measurably improving security posture for diverse corporate clients",
    ],
  },
  {
    role: "IT / Systems Engineer",
    company: "JOPAG Logistics Ltd",
    period: "2022 — 2023",
    highlight: "60% reduction in threat resolution time, 100% P1 incident containment within SLA",
    bullets: [
      "Designed and implemented secure IT infrastructure, cutting system downtime by 40%",
      "Built logistics management platform that increased delivery efficiency by 35%",
      "Led incident response operations using SIEM platforms, reducing average threat resolution time by 60%",
      "Spearheaded enterprise-wide threat detection initiatives — 55% year-over-year decrease in undetected security events",
    ],
  },
]

export const projects: Project[] = [
  {
    id: "visual-threat-hub",
    number: "01",
    title: "Visual Threat Intelligence Hub",
    description:
      "Cloud-based security platform helping African SMEs visualize real-time cyber threats through interactive dashboards and AI-powered plain-language summaries. Built for non-technical decision-makers.",
    language: "Python",
    tags: ["python", "react", "ai", "cloud", "security"],
    status: "wip",
  },
  {
    id: "rbac-engine",
    number: "02",
    title: "RBAC Security Engine",
    description:
      "Role-Based Access Control system implemented across Linux and Windows server environments. Handles granular permission trees, session controls, and audit logging for enterprise deployments.",
    language: "Python",
    tags: ["python", "linux", "windows", "infra", "security"],
    github: "#",
  },
  {
    id: "auth-module",
    number: "03",
    title: "Secure Auth Module",
    description:
      "Custom authentication system with real-time permission controls integrated into production web applications. Strengthened data protection standards across complex multi-tenant digital ecosystems.",
    language: "JavaScript",
    tags: ["javascript", "node", "auth", "web", "security"],
    github: "#",
  },
  {
    id: "cicd-pipeline",
    number: "04",
    title: "CI/CD Security Pipeline",
    description:
      "Automated deployment pipeline with embedded security gates — static analysis, dependency auditing, and policy checks — enforcing code stability and security compliance across multiple client projects.",
    language: "Python",
    tags: ["python", "docker", "ci/cd", "devops", "security"],
    github: "#",
  },
]

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["JavaScript", "Python", "Go", "Ruby", "HTML", "CSS", "Bash"],
  },
  {
    category: "Security",
    skills: ["Burp Suite", "Metasploit", "Nmap", "Wireshark", "Kali Linux", "Nessus", "Splunk", "Hydra", "John the Ripper"],
  },
  {
    category: "Infrastructure",
    skills: ["Linux", "Windows Server", "Docker", "CI/CD", "SIEM", "RBAC"],
  },
  {
    category: "Web & Tools",
    skills: ["React", "Node.js", "WordPress", "Adobe Creative Suite", "Jira", "Asana"],
  },
]

export const ctfEntries: CTFEntry[] = [
  { year: "2024", platform: "HackTheBox", achievement: "85%+ completion rate" },
  { year: "2024", platform: "TryHackMe", achievement: "Multiple room completions" },
  { year: "2023", platform: "CTF Challenges", achievement: "Pen testing & vuln assessments" },
]

export const certifications: Certification[] = [
  { name: "Certified in Cybersecurity (CC)", issuer: "ISC2", year: "2025" },
  { name: "Leadership School", issuer: "Africa Centre for Leadership, Strategy & Development", year: "2025" },
  { name: "Cybersecurity Certification", issuer: "Youthrive", year: "2024" },
  { name: "Career Essentials in Cybersecurity", issuer: "Microsoft & LinkedIn", year: "2024" },
  { name: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn", year: "2024" },
]

export const articles: Article[] = [
  {
    date: "2025-03-10",
    title: "Building RBAC That Actually Holds Under Attack",
    tag: "security",
    slug: "rbac-under-attack",
  },
  {
    date: "2025-01-22",
    title: "SIEM Tuning for Small Teams: Cutting the Noise",
    tag: "ops",
    slug: "siem-tuning",
  },
  {
    date: "2024-11-08",
    title: "CI/CD Security Gates: What Most Teams Skip",
    tag: "devops",
    slug: "cicd-security",
  },
  {
    date: "2024-09-14",
    title: "Threat Intelligence for African SMEs — A Different Problem",
    tag: "strategy",
    slug: "threat-intel-africa",
  },
]
