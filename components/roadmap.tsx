"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import useSWR from "swr"
import { useI18n } from "@/lib/i18n"

const README_API_URL =
  "https://api.github.com/repos/allegoryjs/allegoryjs/readme"

const fetcher = (url: string) =>
  fetch(url, { headers: { Accept: "application/vnd.github.v3.raw" } }).then(
    (res) => {
      if (!res.ok) throw new Error("Failed to fetch README")
      return res.text()
    }
  )

function extractMermaidBlock(markdown: string): string | null {
  // Target the mermaid block in the Roadmap section specifically
  const roadmapSection = markdown.indexOf("## Roadmap")
  const searchText =
    roadmapSection !== -1 ? markdown.slice(roadmapSection) : markdown
  const match = searchText.match(/```mermaid\s*\n([\s\S]*?)```/)
  return match ? match[1].trim() : null
}

const LIGHT_THEME_VARS = {
  fontFamily: "inherit",
  primaryColor: "#E0C9A6",
  primaryTextColor: "#4A3728",
  primaryBorderColor: "#C4A47A",
  secondaryColor: "#F0D4A8",
  secondaryTextColor: "#4A3728",
  secondaryBorderColor: "#D4B088",
  tertiaryColor: "#F5E6D0",
  tertiaryTextColor: "#4A3728",
  tertiaryBorderColor: "#D9C4A0",
  lineColor: "#C4A47A",
  textColor: "#4A3728",
  sectionBkgColor: "#F5E6D0",
  sectionBkgColor2: "#FDF6ED",
  altSectionBkgColor: "#FDF6ED",
  gridColor: "#D9CAAE",
  todayLineColor: "#C99A40",
  doneTaskBkgColor: "#C4A47A",
  doneTaskBorderColor: "#A88B5E",
  activeTaskBkgColor: "#E8BF8E",
  activeTaskBorderColor: "#C99A40",
  taskBkgColor: "#E0C9A6",
  taskBorderColor: "#C4A47A",
  taskTextColor: "#4A3728",
  taskTextDarkColor: "#4A3728",
  taskTextLightColor: "#F8F3EB",
  cScale0: "#E0C9A6",
  cScale1: "#F0D4A8",
  cScale2: "#D4B896",
  cScale3: "#E8C49A",
  cScaleLabel0: "#4A3728",
  cScaleLabel1: "#4A3728",
  cScaleLabel2: "#4A3728",
  cScaleLabel3: "#4A3728",
}

const DARK_THEME_VARS = {
  fontFamily: "inherit",
  primaryColor: "#5C4A3A",
  primaryTextColor: "#E8DCC8",
  primaryBorderColor: "#7A6650",
  secondaryColor: "#6B5540",
  secondaryTextColor: "#E8DCC8",
  secondaryBorderColor: "#8A7660",
  tertiaryColor: "#4A3828",
  tertiaryTextColor: "#E8DCC8",
  tertiaryBorderColor: "#6B5A48",
  lineColor: "#7A6650",
  textColor: "#E8DCC8",
  sectionBkgColor: "#3A2E22",
  sectionBkgColor2: "#342820",
  altSectionBkgColor: "#342820",
  gridColor: "#4A3E32",
  todayLineColor: "#C99A40",
  doneTaskBkgColor: "#7A6650",
  doneTaskBorderColor: "#9A8670",
  activeTaskBkgColor: "#8B7040",
  activeTaskBorderColor: "#C99A40",
  taskBkgColor: "#5C4A3A",
  taskBorderColor: "#7A6650",
  taskTextColor: "#E8DCC8",
  taskTextDarkColor: "#E8DCC8",
  taskTextLightColor: "#E8DCC8",
  cScale0: "#5C4A3A",
  cScale1: "#6B5540",
  cScale2: "#4A3828",
  cScale3: "#7A6248",
  cScaleLabel0: "#E8DCC8",
  cScaleLabel1: "#E8DCC8",
  cScaleLabel2: "#E8DCC8",
  cScaleLabel3: "#E8DCC8",
}

function RoadmapSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-8">
      <div className="h-6 bg-muted rounded w-1/3 mx-auto"></div>
      <div className="h-64 bg-muted rounded"></div>
    </div>
  )
}

export function Roadmap() {
  const { t } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)
  const [renderError, setRenderError] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 })

  const { data: readme, error, isLoading } = useSWR<string>(
    README_API_URL,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  const mermaidCode = readme ? extractMermaidBlock(readme) : null

  // Track dark mode preference and re-render chart when it changes
  useEffect(() => {
    if (typeof window === "undefined") return
    const mql = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(mql.matches)
    const handler = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
      setRendered(false)
      if (containerRef.current) containerRef.current.innerHTML = ""
    }
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  // Track horizontal scroll state for scroll indicators
  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    // 1px tolerance for subpixel rendering differences
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener("scroll", checkScroll, { passive: true })
    const observer = new ResizeObserver(checkScroll)
    observer.observe(el)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      observer.disconnect()
    }
  }, [checkScroll, rendered])

  // Drag-to-scroll handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current
    if (!el) return
    setIsDragging(true)
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: el.scrollLeft,
      scrollTop: el.scrollTop,
    }
  }, [])

  useEffect(() => {
    if (!isDragging) return
    const onMouseMove = (e: MouseEvent) => {
      const el = scrollRef.current
      if (!el) return
      e.preventDefault()
      el.scrollLeft = dragStart.current.scrollLeft - (e.clientX - dragStart.current.x)
      el.scrollTop = dragStart.current.scrollTop - (e.clientY - dragStart.current.y)
    }
    const onMouseUp = () => setIsDragging(false)
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [isDragging])

  const renderChart = useCallback(async () => {
    if (!mermaidCode || !containerRef.current || rendered) return

    try {
      const mermaid = (await import("mermaid")).default
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        gantt: {
          useMaxWidth: false,
          titleTopMargin: 25,
          barHeight: 40,
          barGap: 8,
          topPadding: 75,
          bottomPadding: 10,
          gridLineStartPadding: 35,
          fontSize: 14,
          sectionFontSize: 14,
          numberSectionStyles: 4,
          leftPadding: 120,
        },
        themeVariables: isDarkMode ? DARK_THEME_VARS : LIGHT_THEME_VARS,
      })

      const { svg } = await mermaid.render("roadmap-chart", mermaidCode)
      if (containerRef.current) {
        containerRef.current.innerHTML = svg
        setRendered(true)
      }
    } catch (err) {
      console.error("Mermaid render failed:", err)
      setRenderError(true)
    }
  }, [mermaidCode, rendered, isDarkMode])

  useEffect(() => {
    renderChart()
  }, [renderChart])

  return (
    <section className="px-6 py-16 md:py-24" aria-labelledby="roadmap-heading">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs border border-accent/50 rounded-full bg-accent/10 text-primary">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
            {t("roadmap.badge")}
          </div>
          <h2
            id="roadmap-heading"
            className="text-3xl md:text-4xl font-serif mb-4 text-foreground"
          >
            {t("roadmap.title")}
          </h2>
          <p className="text-muted-foreground">{t("roadmap.subtitle")}</p>
        </header>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2 bg-card">
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-foreground">
              {t("roadmap.source")}
            </span>
          </div>

          <div className="relative">
            {canScrollLeft && (
              <div
                className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none"
                aria-hidden="true"
              />
            )}
            {canScrollRight && (
              <div
                className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none"
                aria-hidden="true"
              />
            )}
            <div
              ref={scrollRef}
              className={`p-4 overflow-auto max-h-[400px] ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
              onMouseDown={onMouseDown}
              tabIndex={0}
            >
              {isLoading && <RoadmapSkeleton />}

              {error && (
                <div
                  className="p-8 text-center text-muted-foreground"
                  role="alert"
                >
                  <p>{t("roadmap.unableToLoad")}</p>
                  <a
                    href="https://github.com/allegoryjs/allegoryjs#roadmap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    {t("roadmap.viewOnGitHub")}
                  </a>
                </div>
              )}

              {renderError && (
                <div
                  className="p-8 text-center text-muted-foreground"
                  role="alert"
                >
                  <p>{t("roadmap.renderError")}</p>
                  <a
                    href="https://github.com/allegoryjs/allegoryjs#roadmap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    {t("roadmap.viewOnGitHub")}
                  </a>
                </div>
              )}

              {!isLoading && !error && !renderError && (
                <div
                  ref={containerRef}
                  aria-label={t("roadmap.chartLabel")}
                />
              )}
            </div>
          </div>

          <div className="px-4 py-3 border-t border-border bg-card">
            <a
              href="https://github.com/allegoryjs/allegoryjs#roadmap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {t("roadmap.viewFullRoadmap")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
