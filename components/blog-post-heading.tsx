"use client"

import * as React from "react"
import { Check, Link as LinkIcon } from "lucide-react"

import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface BlogPostHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  id: string
  children: React.ReactNode
}

export function BlogPostHeading({ id, children, className, ...props }: BlogPostHeadingProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleClick = React.useCallback(async () => {
    if (typeof window === "undefined") return

    const url = `${window.location.origin}${window.location.pathname}#${id}`

    // Update the URL bar without scrolling/jumping the page
    try {
      window.history.replaceState(null, "", `#${id}`)
    } catch {
      // ignore
    }

    // Copy the deep link to the clipboard
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = url
        textarea.setAttribute("readonly", "")
        textarea.style.position = "absolute"
        textarea.style.left = "-9999px"
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }
    } catch {
      // Even if copying fails, still surface the icon swap so the user gets feedback
    }

    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }, [id])

  return (
    <h1 id={id} className={cn("relative scroll-mt-24", className)} {...props}>
      <Popover open={copied}>
        <PopoverAnchor asChild>
          <button
            type="button"
            onClick={handleClick}
            aria-label="Copy link to this post"
            title="Copy link to this post"
            className={cn(
              // Position: right on mobile, left on desktop
              "absolute top-1/2 -translate-y-1/2",
              "right-0 md:right-auto md:-left-10",
              // Visual: subtle floating control, more prominent on hover/focus
              "inline-flex items-center justify-center w-8 h-8 rounded-md",
              "text-muted-foreground hover:text-primary",
              "opacity-60 hover:opacity-100 focus-visible:opacity-100",
              "transition-opacity",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <span className="relative inline-block w-4 h-4">
              <LinkIcon
                className={cn(
                  "absolute inset-0 w-4 h-4 transition-opacity duration-300",
                  copied ? "opacity-0" : "opacity-100",
                )}
                aria-hidden="true"
              />
              <Check
                className={cn(
                  "absolute inset-0 w-4 h-4 text-primary transition-opacity duration-300",
                  copied ? "opacity-100" : "opacity-0",
                )}
                aria-hidden="true"
              />
            </span>
          </button>
        </PopoverAnchor>
        <PopoverContent
          side="top"
          align="center"
          sideOffset={8}
          className="w-auto px-3 py-1.5 text-xs"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          Copied!
        </PopoverContent>
      </Popover>
      {children}
    </h1>
  )
}
