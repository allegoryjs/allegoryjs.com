import { MDXRemote } from "next-mdx-remote/rsc"
import { BlogFooter } from "./blog-footer"

const components = {
  BlogFooter,
}

export function BlogPostRenderer({ source }: { source: string }) {
  // Strip import lines since we provide components directly
  const cleanedSource = source
    .split("\n")
    .filter((line) => !line.startsWith("import "))
    .join("\n")

  return <MDXRemote source={cleanedSource} components={components} />
}
