import { getLatestBlogPost, extractExcerpt } from "@/lib/blog"
import { HomeContent } from "@/components/home-content"

export default function Home() {
  const latest = getLatestBlogPost()

  return (
    <HomeContent
      latestPost={
        latest
          ? {
              title: latest.title,
              dateLabel: latest.dateLabel,
              excerpt: extractExcerpt(latest.rawContent),
              slug: latest.slug,
            }
          : null
      }
    />
  )
}
