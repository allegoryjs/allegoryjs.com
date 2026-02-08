"use client"

import Link from "next/link"

interface BlogPreviewProps {
  title: string
  dateLabel: string
  excerpt: string
  slug: string
}

export function BlogPreview({ title, dateLabel, excerpt, slug }: BlogPreviewProps) {
  return (
    <section className="px-6 py-16 md:py-24" aria-labelledby="blog-preview-heading">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs border border-accent/50 rounded-full bg-accent/10 text-primary">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Blog
          </div>
          <h2 id="blog-preview-heading" className="text-3xl md:text-4xl font-serif mb-4 text-foreground">
            From the Blog
          </h2>
          <p className="text-muted-foreground">
            Thoughts on interactive fiction, engine architecture, and the craft of game development.
          </p>
        </header>

        <div className="bg-card rounded-lg border border-border overflow-hidden p-6">
          <time className="text-xs text-muted-foreground">{dateLabel}</time>
          <h3 className="text-xl font-serif mt-2 mb-3 text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{excerpt}</p>
          <Link
            href={`/blog#post-${slug}`}
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            Read more
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/blog"
            className="text-sm text-primary hover:underline"
          >
            View all blog posts →
          </Link>
        </div>
      </div>
    </section>
  )
}
