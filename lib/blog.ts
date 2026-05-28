import * as fs from "fs"
import * as path from "path"

export interface BlogPost {
  slug: string
  number: number
  date: string
  dateLabel: string
  title: string
  blurb: string
  rawContent: string
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog")
const DEFAULT_EXCERPT_LENGTH = 200

function getBodyLines(rawContent: string): string[] {
  const bodyLines: string[] = []
  let insideJsxComment = false

  for (const line of rawContent.split("\n")) {
    const trimmed = line.trim()

    if (insideJsxComment) {
      if (trimmed.includes("*/}")) insideJsxComment = false
      continue
    }

    if (line.startsWith("import ")) continue

    if (trimmed.startsWith("{/*")) {
      if (!trimmed.includes("*/}")) insideJsxComment = true
      continue
    }

    bodyLines.push(line)
  }

  return bodyLines
}

function parseDateFromFilename(filename: string): { number: number; date: string; dateLabel: string } {
  // Format: 001_feb-08-2026.mdx
  const base = filename.replace(/\.mdx$/, "")
  const [numStr, ...dateParts] = base.split("_")
  const dateStr = dateParts.join("_") // e.g. "feb-08-2026"
  const number = parseInt(numStr, 10)

  // Parse "feb-08-2026" into a readable date label
  const parts = dateStr.split("-")
  if (parts.length !== 3) {
    return { number, date: dateStr, dateLabel: dateStr }
  }
  const [monthAbbr, day, year] = parts
  const monthMap: Record<string, string> = {
    jan: "January", feb: "February", mar: "March", apr: "April",
    may: "May", jun: "June", jul: "July", aug: "August",
    sep: "September", oct: "October", nov: "November", dec: "December",
  }
  const monthFull = monthMap[monthAbbr.toLowerCase()] || monthAbbr
  const dayNum = parseInt(day, 10)
  const dateLabel = `${monthFull} ${isNaN(dayNum) ? day : dayNum}, ${year}`

  return { number, date: dateStr, dateLabel }
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))

  const posts = files.map((filename) => {
    const { number, date, dateLabel } = parseDateFromFilename(filename)
    const rawContent = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8")
    const slug = filename.replace(/\.mdx$/, "")

    return { slug, number, date, dateLabel, title: extractTitle(rawContent), blurb: extractBlurb(rawContent), rawContent }
  })

  // Sort newest first (highest number = newest)
  posts.sort((a, b) => b.number - a.number)
  return posts
}

export function getLatestBlogPost(): BlogPost | null {
  const posts = getAllBlogPosts()
  return posts.length > 0 ? posts[0] : null
}

export function extractTitle(rawContent: string): string {
  // Find the first # heading in the MDX content (skip import lines)
  const lines = getBodyLines(rawContent)
  for (const line of lines) {
    const match = line.match(/^#\s+(.+)$/)
    if (match) return match[1]
  }
  return "Untitled"
}

function extractExcerptFromLines(lines: string[], maxLength: number): string {
  let foundTitle = false
  const paragraphs: string[] = []

  for (const line of lines) {
    if (line.match(/^#+\s/)) {
      if (!foundTitle) {
        foundTitle = true
        continue
      }
      // Stop at next heading
      break
    }
    if (!foundTitle) continue
    const trimmed = line.trim()
    if (trimmed) paragraphs.push(trimmed)
  }

  const text = paragraphs.join(" ")
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…"
}

export function extractExcerpt(rawContent: string, maxLength = DEFAULT_EXCERPT_LENGTH): string {
  return extractExcerptFromLines(getBodyLines(rawContent), maxLength)
}

export function extractExcerptMarkdown(rawContent: string): string {
  const lines = getBodyLines(rawContent)
  let foundTitle = false
  const excerptLines: string[] = []

  for (const line of lines) {
    if (line.match(/^#+\s/)) {
      if (!foundTitle) {
        foundTitle = true
        continue
      }
      break
    }

    if (!foundTitle) continue

    if (!line.trim()) {
      if (excerptLines.length > 0) break
      continue
    }

    excerptLines.push(line)
  }

  const excerpt = excerptLines.join("\n").trim()
  return excerpt || extractExcerptFromLines(lines, DEFAULT_EXCERPT_LENGTH)
}

export function extractBlurb(rawContent: string): string {
  // Look for a blurb comment in the format: {/* blurb: Your blurb here */}
  const blurbMatch = rawContent.match(/\{\/\*\s*blurb:\s*(.+?)\s*\*\/\}/)
  if (blurbMatch) {
    return blurbMatch[1].trim()
  }
  // Fallback: extract first sentence from content after title
  return extractExcerpt(rawContent, 150)
}
