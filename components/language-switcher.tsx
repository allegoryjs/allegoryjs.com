"use client"

import { useState, useEffect, useRef } from 'react'
import { Globe } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useI18n } from '@/lib/i18n'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇲🇽' },
] as const

// Scroll behavior configuration
const SCROLL_THRESHOLD_SHOW = 10 // Show button when near top
const SCROLL_THRESHOLD_HIDE = 100 // Hide button after scrolling this far down
const SCROLL_THROTTLE_MS = 100 // Throttle scroll events to this interval

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const timeoutId = useRef<NodeJS.Timeout>()
  const { locale, setLocale, t } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      // Clear the previous timeout
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
      
      // Throttle scroll event
      timeoutId.current = setTimeout(() => {
        if (typeof window === 'undefined') return
        
        const currentScrollY = window.scrollY
        
        // Show when scrolling up or at the top
        if (currentScrollY < lastScrollY.current || currentScrollY < SCROLL_THRESHOLD_SHOW) {
          setIsVisible(true)
        } else if (currentScrollY > lastScrollY.current && currentScrollY > SCROLL_THRESHOLD_HIDE) {
          // Hide when scrolling down and past threshold
          setIsVisible(false)
        }
        
        lastScrollY.current = currentScrollY
      }, SCROLL_THROTTLE_MS)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
        if (timeoutId.current) {
          clearTimeout(timeoutId.current)
        }
      }
    }
  }, [])

  const handleLanguageChange = (languageCode: 'en' | 'es') => {
    setLocale(languageCode)
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className={`fixed top-6 right-6 z-50 p-3 bg-background border border-accent/50 rounded-full hover:bg-accent/10 hover:border-accent transition-all shadow-lg ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'
          }`}
          aria-label="Change language"
        >
          <Globe className="w-5 h-5 text-accent" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-2xl font-serif font-semibold">
              {t('languageSwitcher.title')}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              {t('languageSwitcher.description')}
            </Dialog.Description>
          </div>
          <div className="grid gap-3 py-4">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                  locale === language.code
                    ? 'border-accent bg-accent/10 text-foreground'
                    : 'border-border hover:border-accent/50 hover:bg-accent/5'
                }`}
              >
                <span className="text-2xl">{language.flag}</span>
                <span className="flex-1 text-left font-medium">{language.name}</span>
                {locale === language.code && (
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              aria-label={t('languageSwitcher.close')}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
