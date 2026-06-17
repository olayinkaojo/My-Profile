import { getAllPosts } from "@/lib/posts"

export async function GET() {
  const posts = getAllPosts()

  const items = posts
    .map((post) => {
      const url = `https://www.olayinka.name.ng/blog/${post.slug}`
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map((t) => `<category>${t}</category>`).join("\n      ")}
    </item>`
    })
    .join("")

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Olayinka Ojo — Writing</title>
    <link>https://www.olayinka.name.ng/blog</link>
    <description>Essays on AI engineering, cybersecurity, and building tech from Africa.</description>
    <language>en-GB</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://www.olayinka.name.ng/blog/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
