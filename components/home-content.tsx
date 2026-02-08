"use client"

import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { BlogPreview } from "@/components/blog-preview"
import { GitHubCommits } from "@/components/github-commits"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useI18n } from "@/lib/i18n"

interface BlogPreviewData {
  title: string
  dateLabel: string
  excerpt: string
  slug: string
}

export function HomeContent({ latestPost }: { latestPost: BlogPreviewData | null }) {
  const { t } = useI18n()

  return (
    <>
      {/* Skip Navigation Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {t('accessibility.skipToContent')}
      </a>
      <main id="main-content" className="min-h-screen">
        <LanguageSwitcher />
        <Hero />
        <HowItWorks />
        {latestPost && (
          <BlogPreview
            title={latestPost.title}
            dateLabel={latestPost.dateLabel}
            excerpt={latestPost.excerpt}
            slug={latestPost.slug}
          />
        )}
        <GitHubCommits />
        <Newsletter />
        <Footer />
      </main>
    </>
  )
}
