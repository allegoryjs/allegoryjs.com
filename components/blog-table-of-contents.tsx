"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface BlogPost {
  slug: string
  title: string
  blurb: string
  dateLabel: string
}

interface BlogTableOfContentsProps {
  posts: BlogPost[]
}

function PostLink({ post }: { post: BlogPost }) {
  return (
    <a
      href={`#post-${post.slug}`}
      className="block group py-2"
    >
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
        {post.title}
      </span>
      <time className="block text-xs text-muted-foreground mt-0.5">
        {post.dateLabel}
      </time>
      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
        {post.blurb}
      </p>
    </a>
  )
}

export function BlogTableOfContents({ posts }: BlogTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (posts.length === 0) return null

  return (
    <div className="mb-8">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors">
          <span className="font-serif text-lg">Table of Contents</span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <nav
            className="mt-2 px-4 py-3 bg-card border border-border rounded-lg max-h-64 overflow-y-auto"
            aria-label="Table of Contents"
          >
            <ul className="space-y-1 divide-y divide-border">
              {posts.map((post) => (
                <li key={post.slug}>
                  <PostLink post={post} />
                </li>
              ))}
            </ul>
          </nav>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
