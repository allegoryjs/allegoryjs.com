"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const lastScrollCheck = useRef(0)
  const throttleMs = 100

  const handleScroll = useCallback(() => {
    const now = Date.now()
    if (now - lastScrollCheck.current < throttleMs) return
    lastScrollCheck.current = now

    // Show button after scrolling about 100vh
    const scrollThreshold = window.innerHeight
    setIsVisible(window.scrollY > scrollThreshold)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    // Check initial scroll position
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
