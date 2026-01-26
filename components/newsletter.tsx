"use client"

import React from "react"

import { useState } from "react"
import { useI18n } from '@/lib/i18n'

export function Newsletter() {
  const { t } = useI18n()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    try {
      const response = await fetch("https://formspree.io/f/xqepnwgr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="newsletter" className="px-6 py-16 md:py-24 bg-card" aria-labelledby="newsletter-heading">
      <div className="max-w-xl mx-auto text-center">
        {/* Decorative quill icon */}
        <div className="mb-6">
          <svg className="w-12 h-12 mx-auto text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </div>

        <h2 id="newsletter-heading" className="text-3xl md:text-4xl font-serif mb-4 text-card-foreground">
          {t('newsletter.title')}
        </h2>
        <p className="text-muted-foreground mb-8">
          {t('newsletter.subtitle')}
        </p>

        {/* Screen reader live region for status updates */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {status === "loading" && "Subscribing to newsletter..."}
          {status === "success" && "Successfully subscribed to newsletter!"}
          {status === "error" && "Error subscribing to newsletter. Please try again."}
        </div>

        {status === "error" ? (
          <div className="p-6 bg-background rounded-lg border border-destructive/30 mb-4" role="alert">
            <p className="text-destructive font-medium">{t('newsletter.errorMessage')}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-3 text-sm text-muted-foreground underline hover:text-foreground"
            >
              {t('newsletter.tryAgain')}
            </button>
          </div>
        ) : status === "success" ? (
          <div className="p-6 bg-background rounded-lg border border-accent/30" role="status">
            <svg
              className="w-10 h-10 mx-auto text-accent mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-foreground font-medium">{t('newsletter.successTitle')}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t('newsletter.successMessage')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" aria-label="Newsletter subscription form">
            <label className="sr-only" htmlFor="email">
              {t('newsletter.emailLabel')}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t('newsletter.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              aria-label={status === "loading" ? t('newsletter.subscribing') : t('newsletter.subscribe')}
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t('newsletter.subscribing')}
                </span>
              ) : (
                t('newsletter.subscribe')
              )}
            </button>
          </form>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          {t('newsletter.disclaimer')}
        </p>
      </div>
    </section>
  )
}
