import { serialize } from "next-mdx-remote/serialize"
import { getLatestBlogPost, extractExcerptMarkdown } from "@/lib/blog"
import { HomeContent } from "@/components/home-content"

export default async function Home() {
  const latest = getLatestBlogPost()
  const latestPost = latest
    ? {
        title: latest.title,
        dateLabel: latest.dateLabel,
        excerpt: await serialize(extractExcerptMarkdown(latest.rawContent)),
        slug: latest.slug,
      }
    : null

  return (
    <HomeContent latestPost={latestPost} />
  )
}
