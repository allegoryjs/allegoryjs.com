"use client"

import Link from "next/link"

export function BlogNav() {
  return (
    <nav className="px-6 py-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Home
        </Link>
        <div className="font-serif text-lg">
          <span className="text-primary">Allegory</span>
          <span className="text-muted-foreground font-normal">.js</span>
          <span className="text-muted-foreground font-normal text-sm ml-2">Blog</span>
        </div>
      </div>
    </nav>
  )
}
