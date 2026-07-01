import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/lib/theme"
import CommandPalette from "@/components/CommandPalette"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const siteUrl = "https://www.olayinka.name.ng"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Olayinka Ojo — Security Engineer & Software Developer",
    template: "%s — Olayinka Ojo",
  },
  description:
    "Security engineer and software developer with 15+ years of experience in secure system design, penetration testing, and full-stack development. Building systems that hold — and finding the ones that don't.",
  keywords: [
    "security engineer",
    "software developer",
    "penetration testing",
    "DevSecOps",
    "threat intelligence",
    "SIEM",
    "Nigeria",
    "Olayinka Ojo",
  ],
  authors: [{ name: "Olayinka Ojo", url: siteUrl }],
  creator: "Olayinka Ojo",
  openGraph: {
    title: "Olayinka Ojo — Security Engineer & Software Developer",
    description:
      "Security engineer. Software developer. Building systems that hold — and finding the ones that don't.",
    url: siteUrl,
    siteName: "Olayinka Ojo",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Olayinka Ojo — Security Engineer & Software Developer",
    description:
      "Security engineer. Software developer. Building systems that hold — and finding the ones that don't.",
    creator: "@olayinkaojo",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
    types: { "application/rss+xml": `${siteUrl}/blog/feed.xml` },
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Olayinka Ojo",
  url: siteUrl,
  email: "mailto:olayinkaojo.ng@gmail.com",
  jobTitle: "Security Engineer & Software Developer",
  description:
    "Security engineer and software developer specialising in secure system design, threat detection, and DevSecOps.",
  nationality: "Nigeria",
  sameAs: [
    "https://github.com/olayinkaojo",
    "https://linkedin.com/in/olayinka-ojo",
    "https://twitter.com/olayinkaojo",
  ],
  knowsAbout: [
    "Application Security",
    "Penetration Testing",
    "Threat Intelligence",
    "DevSecOps",
    "SIEM",
    "Go",
    "Python",
    "JavaScript",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline script to apply theme before first paint — prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  )
}
