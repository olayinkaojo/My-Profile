export interface Project {
  id: string
  number: string
  title: string
  description: string
  language: string
  tags: string[]
  github?: string
  live?: string
  status?: "live" | "wip"
}

export interface Experience {
  role: string
  company: string
  period: string
  highlight: string
  bullets: string[]
}

export interface SkillGroup {
  category: string
  skills: string[]
}

export interface CTFEntry {
  year: string
  platform: string
  achievement: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface Article {
  date: string
  title: string
  tag: string
  slug: string
}

export interface Stat {
  value: string
  label: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
}
