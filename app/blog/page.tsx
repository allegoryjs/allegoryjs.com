import { getAllBlogPosts } from "@/lib/blog"
import { BlogNav } from "@/components/blog-nav"
import { BlogPostRenderer } from "@/components/blog-post-renderer"

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BlogNav />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-12 text-center">Blog</h1>
        {posts.length === 0 && (
          <p className="text-center text-muted-foreground">No blog posts yet.</p>
        )}
        {posts.map((post) => (
            <article
              key={post.slug}
              id={`post-${post.slug}`}
              className="mb-16 pb-16 border-b border-border last:border-b-0"
            >
              <div className="mb-6">
                <time className="text-sm text-muted-foreground">{post.dateLabel}</time>
              </div>
              <div className="prose prose-neutral dark:prose-invert max-w-none
                [&>h1]:text-3xl [&>h1]:md:text-4xl [&>h1]:font-serif [&>h1]:mb-6
                [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:mt-10 [&>h2]:mb-4
                [&>h3]:text-xl [&>h3]:font-serif
                [&>p]:leading-relaxed [&>p]:mb-4 [&>p]:text-foreground/90
                [&>blockquote]:border-l-4 [&>blockquote]:border-accent [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1 [&>ul]:mb-4
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-1 [&>ol]:mb-4
                [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary/80
                [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4
                [&_strong]:text-foreground [&_em]:text-foreground/80
              ">
                <BlogPostRenderer source={post.rawContent} />
              </div>
            </article>
        ))}
      </div>
    </main>
  )
}
