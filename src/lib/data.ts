import type { Project, Experience, SkillGroup, CTFEntry, Certification, Article, Stat, Testimonial } from "@/types"

export const meta = {
  name: "Olayinka Ojo",
  initials: "OO",
  tagline: "I build systems that hold.",
  subtagline: "And find the ones that don't.",
  role: "security engineer + software developer",
  bio: "I design and ship software at the intersection of engineering and adversarial thinking. Over 15 years building secure digital infrastructure — from authentication systems and CI/CD pipelines to SIEM-backed threat detection platforms. Currently architecting a cloud-based threat intelligence platform to make real-time security data accessible to African enterprises.",
  availability: "Available · Remote · Full-time & Contract",
  availableNow: true,
  location: "Nigeria",
  email: "olayinkaojo.ng@gmail.com",
  linkedin: "https://linkedin.com/in/olayinka-ojo",
  github: "https://github.com/olayinkaojo",
  twitter: "https://twitter.com/olayinkaojo",
  cv: "/cv.pdf",
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
    id: "gologwatch",
    number: "01",
    title: "GoLogWatch",
    description:
      "Concurrent log ingestion engine in Go. Parses multi-format streams (syslog, JSON, CEF) using goroutine worker pools, evaluates each event against a configurable rule engine, and fires alerts in under 50ms. Handles 50k+ events/sec on a single core — built as a lightweight alternative to heavyweight SIEM agents for resource-constrained environments.",
    language: "Go",
    tags: ["go", "concurrency", "security", "cli", "siem"],
    github: "https://github.com/olayinkaojo",
    status: "live",
  },
  {
    id: "visual-threat-hub",
    number: "02",
    title: "Visual Threat Intelligence Hub",
    description:
      "Cloud-native platform processing real-time threat feeds via async Python pipelines. Normalises IOC data from multiple sources, correlates with internal telemetry, and surfaces plain-language summaries using LLM integration. Designed for non-technical SME operators — zero security training required to act on the dashboard.",
    language: "Python",
    tags: ["python", "react", "ai", "cloud", "security"],
    status: "wip",
  },
  {
    id: "rbac-engine",
    number: "03",
    title: "RBAC Security Engine",
    description:
      "Hierarchical role-based access control with cross-platform consistency across Linux and Windows servers. Built an abstraction layer that translates policy rules to platform-native ACL formats. Audit log captures every permission change with actor, timestamp, and delta — queryable and exportable for compliance reviews.",
    language: "Python",
    tags: ["python", "linux", "windows", "infra", "security"],
    github: "https://github.com/olayinkaojo",
  },
  {
    id: "auth-module",
    number: "04",
    title: "Secure Auth Module",
    description:
      "Stateless JWT authentication over a Redis-backed session store — clients can invalidate tokens without waiting for expiry. Integrated into multi-tenant web apps with per-tenant permission scoping, ensuring no token from tenant A can be replayed against tenant B. Deployed across 8 production client environments.",
    language: "JavaScript",
    tags: ["javascript", "node", "jwt", "redis", "multi-tenant"],
    github: "https://github.com/olayinkaojo",
  },
  {
    id: "cicd-pipeline",
    number: "05",
    title: "CI/CD Security Pipeline",
    description:
      "Embedded SAST (Semgrep), dependency auditing, and policy-as-code checks directly into the deployment pipeline. Hard-gates on critical findings — build fails, no exceptions. Eliminated 80% of low-hanging-fruit findings before human review, cutting manual security audit time in half across multiple client projects.",
    language: "Python",
    tags: ["python", "docker", "ci/cd", "semgrep", "devsecops"],
    github: "https://github.com/olayinkaojo",
  },
]

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Go", "JavaScript", "Python", "Ruby", "HTML", "CSS", "Bash"],
  },
  {
    category: "Security",
    skills: ["Burp Suite", "Metasploit", "Nmap", "Wireshark", "Kali Linux", "Nessus", "Splunk", "Hydra", "John the Ripper", "Semgrep"],
  },
  {
    category: "Infrastructure",
    skills: ["Linux", "Windows Server", "Docker", "CI/CD", "Redis", "SIEM", "RBAC"],
  },
  {
    category: "Web & Tools",
    skills: ["React", "Node.js", "REST", "JWT", "WordPress", "Jira", "Asana"],
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

export const testimonials: Testimonial[] = [
  {
    quote:
      "Olayinka has an unusual ability to think like an attacker while building like an engineer. He caught three authentication flaws in our system that two previous audits missed — then fixed them himself the same week.",
    name: "— Engineering Lead, Lit Creative Designs Ltd",
    role: "",
  },
  {
    quote:
      "The CI/CD security pipeline he built for us became the gold standard across all our client deployments. Shipping faster and more securely at the same time isn't something you see often.",
    name: "— Technical Director",
    role: "Lit Creative Designs Ltd",
  },
  {
    quote:
      "Reduced our incident response time dramatically and documented everything cleanly. Rare to find someone equally comfortable writing code and investigating a live threat.",
    name: "— Operations Manager, JOPAG Logistics Ltd",
    role: "",
  },
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
