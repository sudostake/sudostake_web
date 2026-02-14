import { HeroSection } from "./components/HeroSection";
import { NetworkSection } from "./components/NetworkSection";
import { SiteHeader } from "./components/SiteHeader";
import { LogoMark } from "./components/LogoMark";

type ResourceLink = {
  name: string;
  href: string;
  description: string;
};

const resources: ResourceLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/sudostake",
    description: "Read contracts, frontend code, and open issues.",
  },
  {
    name: "Telegram",
    href: "https://t.me/sudostake",
    description: "Get direct support from the SudoStake team and community.",
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/sudostake",
    description: "Follow product releases and protocol updates.",
  },
];

function ResourcesSection() {
  return (
    <section id="resources" className="w-full py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-2 sm:max-w-xl">
          <h2 className="section-heading text-[color:var(--text-primary)]">Resources</h2>
          <p className="section-subtitle text-[color:var(--text-secondary)]">
            Everything you need to track the protocol and get help quickly.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {resources.map(({ name, href, description }) => (
            <li key={href} className="h-full">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${name} in a new tab`}
                className="flex h-full flex-col gap-3 rounded-2xl surface-card px-5 py-6 text-left text-[color:var(--text-primary)] transition hover:border-[color:var(--accent-primary)]"
              >
                <span className="text-lg font-semibold text-[color:var(--text-primary)]">{name}</span>
                <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">{description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-primary)]">
                  Visit
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div id="top" className="min-h-dvh bg-[var(--background)] text-[color:var(--text-primary)] antialiased">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 sm:gap-10 sm:px-6 sm:py-12 lg:px-8">
        <HeroSection />
        <NetworkSection />
        <ResourcesSection />
      </main>

      <footer className="footer-panel py-8 text-center text-xs text-[color:var(--text-secondary)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-5 sm:px-6 lg:px-8">
          <LogoMark size={36} className="h-10 w-10" ariaLabel="SudoStake mark" />
          <span className="font-medium text-[color:var(--text-secondary)]">© 2026 SudoStake</span>
        </div>
      </footer>
    </div>
  );
}
