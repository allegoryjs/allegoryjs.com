import { MDXRemote } from "next-mdx-remote/rsc"
import { BlogFooter } from "./blog-footer"
import { BlogPostHeading } from "./blog-post-heading"

export function BlogPostRenderer({ source, id }: { source: string; id: string }) {
  // Strip import lines since we provide components directly
  const cleanedSource = source
    .split("\n")
    .filter((line) => !line.startsWith("import "))
    .join("\n")

  const components = {
    BlogFooter,
    h1: ({ children }: { children?: React.ReactNode }) => (
      <BlogPostHeading id={id}>{children}</BlogPostHeading>
    ),
  }

  return <MDXRemote source={cleanedSource} components={components} />
}
