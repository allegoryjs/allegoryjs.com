import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { GitHubCommits } from "@/components/github-commits"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function Home() {
  return (
    <main className="min-h-screen">
      <LanguageSwitcher />
      <Hero />
      <HowItWorks />
      <GitHubCommits />
      <Newsletter />
      <Footer />
    </main>
  )
}
