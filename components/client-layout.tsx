"use client"

import { useI18n } from '@/lib/i18n'
import { useEffect } from 'react'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n()

  useEffect(() => {
    // Update the HTML lang attribute when locale changes
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  return <>{children}</>
}
