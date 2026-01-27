"use client"

import { useI18n } from '@/lib/i18n'

export function HowItWorks() {
  const { t } = useI18n()

  const features = [
    {
      title: t('howItWorks.simulationFirst.title'),
      description: t('howItWorks.simulationFirst.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ),
    },
    {
      title: t('howItWorks.eventDriven.title'),
      description: t('howItWorks.eventDriven.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      title: t('howItWorks.webNative.title'),
      description: t('howItWorks.webNative.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
    },
  ]

  const architecture = [
    {
      label: t('howItWorks.architecture.ecsDataModel.label'),
      description: t('howItWorks.architecture.ecsDataModel.description'),
    },
    {
      label: t('howItWorks.architecture.semanticNLP.label'),
      description: t('howItWorks.architecture.semanticNLP.description'),
    },
    {
      label: t('howItWorks.architecture.lawsMiddleware.label'),
      description: t('howItWorks.architecture.lawsMiddleware.description'),
    },
    {
      label: t('howItWorks.architecture.reactiveEventBus.label'),
      description: t('howItWorks.architecture.reactiveEventBus.description'),
    },
  ]

  return (
    <section className="px-6 py-16 md:py-24 bg-card" aria-labelledby="how-it-works-heading">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-serif mb-4 text-card-foreground">
            {t('howItWorks.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </header>

        {/* Core Philosophy Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16" role="list" aria-label={t('accessibility.coreFeatures')}>
          {features.map((feature) => (
            <article
              key={feature.title}
              className="p-6 bg-background rounded-lg border border-border hover:border-accent/50 transition-colors"
              role="listitem"
            >
              <div className="text-accent mb-4" aria-hidden="true">{feature.icon}</div>
              <h3 className="text-xl font-serif mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        {/* Architecture Overview */}
        <div className="bg-background rounded-lg border border-border p-8">
          <h3 className="text-xl font-serif mb-6 text-foreground text-center">
            {t('howItWorks.underTheHood')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-6" role="list" aria-label={t('accessibility.architectureComponents')}>
            {architecture.map((item, index) => (
              <div key={item.label} className="flex gap-4" role="listitem">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-mono text-sm" aria-hidden="true">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-12 bg-foreground/5 rounded-lg border border-border overflow-hidden">
          <div className="px-4 py-2 bg-foreground/5 border-b border-border flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/50" aria-hidden="true"></div>
            <div className="w-3 h-3 rounded-full bg-accent/50" aria-hidden="true"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50" aria-hidden="true"></div>
            <span className="ml-2 text-xs text-muted-foreground font-mono">{t('howItWorks.codeExample')}</span>
          </div>
          <pre className="p-6 text-sm overflow-x-auto" role="region" aria-label={t('accessibility.codeExample')}>
            <code className="text-foreground font-mono">
{`// Define entities with a fluent API
ThereIsAContainer('chest')
    .withCapacity(10)
    .containing('golden-key')
    .onIntent('OPEN', ({ entity }) => {
        if (entity.isLocked) {
            return Failure("The chest is locked tight.");
        }
        return Success("The lid creaks open, revealing treasures within.");
    });`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
