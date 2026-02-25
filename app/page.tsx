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
    <section id="resources" className="w-full py-10 sm:py-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-3 sm:max-w-2xl">
          <h2 className="section-heading text-[color:var(--text-primary)]">Resources</h2>
          <p className="section-subtitle text-[color:var(--text-secondary)]">
            Everything you need to track the protocol and get help quickly.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {resources.map(({ name, href, description }) => (
            <li key={href} className="h-full">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${name} in a new tab`}
                className="pixel-card surface-card flex h-full flex-col gap-3 px-4 py-5 text-left text-[color:var(--text-primary)]"
              >
                <span className="pixel-heading text-[0.64rem] text-[color:var(--text-primary)]">{name}</span>
                <p className="text-[1.12rem] leading-[1.18] text-[color:var(--text-secondary)]">{description}</p>
                <span className="pixel-heading mt-auto text-[0.54rem] text-[color:var(--accent-primary)]">Visit -&gt;</span>
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
    <div id="top" className="min-h-dvh bg-[var(--background)] text-[color:var(--text-primary)]">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10 lg:px-8">
        <HeroSection />
        <NetworkSection />
        <ResourcesSection />
      </main>

      <footer className="footer-panel py-7 text-center text-[0.56rem] text-[color:var(--text-secondary)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-5 sm:px-6 lg:px-8">
          <LogoMark
            size={36}
            className="h-10 w-10 border-2 border-[color:var(--panel-border)] bg-[color:var(--surface)] p-1"
            ariaLabel="SudoStake mark"
          />
          <span className="pixel-heading text-[0.5rem] text-[color:var(--text-secondary)]">© 2026 SudoStake</span>
        </div>
      </footer>
    </div>
  );
}
