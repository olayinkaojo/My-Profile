import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Writing — Olayinka Ojo",
  description:
    "Essays on AI engineering, cybersecurity, and building tech from Africa.",
  openGraph: {
    title: "Writing — Olayinka Ojo",
    description: "Essays on AI engineering, cybersecurity, and building tech from Africa.",
    type: "website",
    url: "https://www.olayinka.name.ng/blog",
    images: [
      {
        url: "https://www.olayinka.name.ng/blog/og?title=Writing%20%E2%80%94%20Olayinka%20Ojo&tags=AI%20Engineering%2CCybersecurity%2CAfrica",
        width: 1200,
        height: 630,
        alt: "Writing — Olayinka Ojo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — Olayinka Ojo",
    description: "Essays on AI engineering, cybersecurity, and building tech from Africa.",
    images: ["https://www.olayinka.name.ng/blog/og?title=Writing%20%E2%80%94%20Olayinka%20Ojo&tags=AI%20Engineering%2CCybersecurity%2CAfrica"],
  },
  alternates: {
    canonical: "https://www.olayinka.name.ng/blog",
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <main style={{ background: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Nav spacer */}
      <div style={{ height: "64px" }} />

      <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
        {/* Back link */}
        <Link
          href="/"
          className="font-mono text-xs inline-flex items-center gap-2 mb-16 transition-colors duration-150"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={undefined}
        >
          ← olayinka.name.ng
        </Link>

        {/* Header */}
        <p
          className="section-label mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          // Writing
        </p>

        <div
          className="flex items-end justify-between mb-16"
          style={{ borderBottom: "1px solid var(--border)", paddingBottom: "2rem" }}
        >
          <h1
            className="font-sans font-black tracking-tight"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
            }}
          >
            Writing
          </h1>
          <span
            className="font-mono text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
        </div>

        {/* Post list */}
        <div className="flex flex-col">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block py-8 transition-colors duration-150"
              style={{
                borderTop: "1px solid var(--border)",
                borderBottom: i === posts.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              {/* Top row: date + reading time */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {formatDate(post.date)}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {post.readingTime}
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-sans font-semibold mb-3 transition-colors duration-150 group-hover:text-[color:var(--accent-cyan)]"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "var(--text-primary)",
                  lineHeight: "1.35",
                }}
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p
                className="font-sans text-sm mb-4 leading-relaxed"
                style={{ color: "var(--text-secondary)", maxWidth: "65ch" }}
              >
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--accent-green)",
                      borderRadius: "2px",
                    }}
                  >
                    [{tag}]
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* RSS link */}
        <div className="mt-12">
          <a
            href="/blog/feed.xml"
            className="font-mono text-xs transition-colors duration-150"
            style={{ color: "var(--text-muted)" }}
          >
            RSS feed →
          </a>
        </div>
      </div>
    </main>
  )
}
