import { getLatestBlogPost, extractTitle, extractExcerpt } from "@/lib/blog"
import { HomeContent } from "@/components/home-content"

export default function Home() {
  const latest = getLatestBlogPost()
  const latestPost = latest
    ? {
        title: extractTitle(latest.rawContent),
        dateLabel: latest.dateLabel,
        excerpt: extractExcerpt(latest.rawContent),
        slug: latest.slug,
      }
    : null

  return <HomeContent latestPost={latestPost} />
}
