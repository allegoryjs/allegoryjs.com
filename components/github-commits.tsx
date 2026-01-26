"use client"

import useSWR from "swr"
import { useI18n } from '@/lib/i18n'

interface Commit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
  html_url: string
  author: {
    login: string
    avatar_url: string
  } | null
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function CommitSkeleton() {
  return (
    <div className="flex gap-4 p-4 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-muted"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-3 bg-muted rounded w-1/4"></div>
      </div>
    </div>
  )
}

export function GitHubCommits() {
  const { t, locale } = useI18n()
  const { data, error, isLoading } = useSWR<Commit[]>(
    "https://api.github.com/repos/allegoryjs/allegoryjs/commits?per_page=5",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return t('githubCommits.today')
    if (diffInDays === 1) return t('githubCommits.yesterday')
    if (diffInDays < 7) return t('githubCommits.daysAgo', { count: diffInDays })
    if (diffInDays < 30) return t('githubCommits.weeksAgo', { count: Math.floor(diffInDays / 7) })
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { month: "short", day: "numeric" })
  }

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs border border-accent/50 rounded-full bg-accent/10 text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            {t('githubCommits.activeDevelopment')}
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-foreground">
            {t('githubCommits.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('githubCommits.subtitle')}
          </p>
        </header>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2 bg-card">
            <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-foreground">{t('githubCommits.repository')}</span>
          </div>

          <div className="divide-y divide-border">
            {isLoading && (
              <>
                <CommitSkeleton />
                <CommitSkeleton />
                <CommitSkeleton />
                <CommitSkeleton />
                <CommitSkeleton />
              </>
            )}

            {error && (
              <div className="p-8 text-center text-muted-foreground">
                <p>{t('githubCommits.unableToLoad')}</p>
                <a
                  href="https://github.com/allegoryjs/allegoryjs/commits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline mt-2 inline-block"
                >
                  {t('githubCommits.viewOnGitHub')}
                </a>
              </div>
            )}

            {data && Array.isArray(data) && data.map((commit) => (
              <a
                key={commit.sha}
                href={commit.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 p-4 hover:bg-accent/5 transition-colors group"
              >
                {commit.author?.avatar_url ? (
                  <img
                    src={commit.author.avatar_url || "/placeholder.svg"}
                    alt={commit.author.login}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                    {commit.commit.author.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
                    {commit.commit.message.split("\n")[0]}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="font-medium">{commit.author?.login || commit.commit.author.name}</span>
                    {" · "}
                    <span>{formatDate(commit.commit.author.date)}</span>
                    {" · "}
                    <span className="font-mono">{commit.sha.slice(0, 7)}</span>
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity self-center"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}

            {data && !Array.isArray(data) && (
              <div className="p-8 text-center text-muted-foreground">
                <p>{t('githubCommits.repositoryNotFound')}</p>
                <a
                  href="https://github.com/allegoryjs/allegoryjs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline mt-2 inline-block"
                >
                  {t('githubCommits.checkRepository')}
                </a>
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-border bg-card">
            <a
              href="https://github.com/allegoryjs/allegoryjs/commits"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {t('githubCommits.viewAllCommits')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
