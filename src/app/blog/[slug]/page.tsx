import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { marked } from "marked"
import { getAllSlugs, getPostBySlug } from "@/lib/posts"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    return {}
  }

  const ogImageUrl = `https://www.olayinka.name.ng/blog/og?title=${encodeURIComponent(post.title)}&tags=${encodeURIComponent(post.tags.join(","))}`

  return {
    title: `${post.title} — Olayinka Ojo`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `https://www.olayinka.name.ng/blog/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `https://www.olayinka.name.ng/blog/${slug}`,
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  const htmlContent = await marked(post.content, { gfm: true, breaks: false })

  return (
    <main style={{ background: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Nav spacer */}
      <div style={{ height: "64px" }} />

      <article className="max-w-3xl mx-auto px-6 py-24 lg:py-32">
        {/* Back link */}
        <Link
          href="/blog"
          className="font-mono text-xs inline-flex items-center gap-2 mb-16 transition-colors duration-150"
          style={{ color: "var(--text-muted)" }}
        >
          ← Writing
        </Link>

        {/* Post header */}
        <header className="mb-16">
          <p className="section-label mb-6" style={{ color: "var(--text-muted)" }}>
            // Writing
          </p>

          <h1
            className="font-sans font-black tracking-tight mb-8"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: "1.15",
            }}
          >
            {post.title}
          </h1>

          {/* Meta row */}
          <div
            className="flex flex-wrap items-center gap-4 pt-6"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              {formatDate(post.date)}
            </span>
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              ·
            </span>
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              {post.readingTime}
            </span>
            <div className="flex flex-wrap gap-2 ml-auto">
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
          </div>
        </header>

        {/* Post body */}
        <div
          className="mdx-body"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Footer nav */}
        <div
          className="mt-20 pt-8 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <Link
            href="/blog"
            className="font-mono text-xs transition-colors duration-150"
            style={{ color: "var(--accent-green)" }}
          >
            ← All posts
          </Link>
          <a
            href="/blog/feed.xml"
            className="font-mono text-xs transition-colors duration-150"
            style={{ color: "var(--text-muted)" }}
          >
            RSS
          </a>
        </div>
      </article>
    </main>
  )
}
