import * as fs from "fs"
import * as path from "path"

export interface BlogPost {
  slug: string
  number: number
  date: string
  dateLabel: string
  rawContent: string
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function parseDateFromFilename(filename: string): { number: number; date: string; dateLabel: string } {
  // Format: 001_feb-08-2026.mdx
  const base = filename.replace(/\.mdx$/, "")
  const [numStr, ...dateParts] = base.split("_")
  const dateStr = dateParts.join("_") // e.g. "feb-08-2026"
  const number = parseInt(numStr, 10)

  // Parse "feb-08-2026" into a readable date label
  const [monthAbbr, day, year] = dateStr.split("-")
  const monthMap: Record<string, string> = {
    jan: "January", feb: "February", mar: "March", apr: "April",
    may: "May", jun: "June", jul: "July", aug: "August",
    sep: "September", oct: "October", nov: "November", dec: "December",
  }
  const monthFull = monthMap[monthAbbr.toLowerCase()] || monthAbbr
  const dateLabel = `${monthFull} ${parseInt(day, 10)}, ${year}`

  return { number, date: dateStr, dateLabel }
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))

  const posts = files.map((filename) => {
    const { number, date, dateLabel } = parseDateFromFilename(filename)
    const rawContent = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8")
    const slug = filename.replace(/\.mdx$/, "")

    return { slug, number, date, dateLabel, rawContent }
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
  const lines = rawContent.split("\n")
  for (const line of lines) {
    const match = line.match(/^#\s+(.+)$/)
    if (match) return match[1]
  }
  return "Untitled"
}

export function extractExcerpt(rawContent: string, maxLength = 200): string {
  const lines = rawContent.split("\n")
  let foundTitle = false
  const paragraphs: string[] = []

  for (const line of lines) {
    // Skip imports and empty lines before title
    if (line.startsWith("import ")) continue
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
