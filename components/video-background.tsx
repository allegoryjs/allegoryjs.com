"use client"

import { useEffect, useState } from "react"

export function VideoBackground() {
  const [showVideo, setShowVideo] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e: MediaQueryListEvent) => {
      setShowVideo(!e.matches)
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  if (!showVideo) return null

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none"
    >
      <source src="/background.webm" type="video/webm" />
      <source src="/background.mp4" type="video/mp4" />
    </video>
  )
}
