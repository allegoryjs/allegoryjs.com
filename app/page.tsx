import { serialize } from "next-mdx-remote/serialize"
import { getLatestBlogPost, extractExcerptMarkdown } from "@/lib/blog"
import { HomeContent } from "@/components/home-content"

export default async function Home() {
  const latest = getLatestBlogPost()
  const latestExcerpt = latest ? await serialize(extractExcerptMarkdown(latest.rawContent)) : null

  return (
    <HomeContent
      latestPost={
        latest
          ? {
              title: latest.title,
              dateLabel: latest.dateLabel,
              excerpt: latestExcerpt,
              slug: latest.slug,
            }
          : null
      }
    />
  )
}
