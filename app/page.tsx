import { HeroSection } from "./components/HeroSection";
import { NetworkSection } from "./components/NetworkSection";
import { SiteHeader } from "./components/SiteHeader";
import { LogoMark } from "./components/LogoMark";

type ResourceLink = {
  name: string;
  href: string;
  tag: string;
};

const resources: ResourceLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/sudostake",
    tag: "GH",
  },
  {
    name: "Telegram",
    href: "https://t.me/sudostake",
    tag: "TG",
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/sudostake",
    tag: "X",
  },
];

function ResourcesSection() {
  return (
    <section id="resources" className="w-full py-10 sm:py-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="section-heading text-[color:var(--text-primary)]">Resources</h2>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {resources.map(({ name, href, tag }) => (
            <li key={href} className="h-full">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Go to ${name} in a new tab`}
                className="group pixel-card surface-card flex h-full items-center justify-between gap-4 px-4 py-5 text-left text-[color:var(--text-primary)]"
              >
                <span className="flex items-center gap-3">
                  <span className="pixel-chip min-w-[2.1rem] justify-center text-[color:var(--text-secondary)]">
                    {tag}
                  </span>
                  <span className="pixel-heading text-[0.72rem] text-[color:var(--text-primary)]">{name}</span>
                </span>
                <span className="pixel-heading text-[0.62rem] text-[color:var(--accent-primary)] transition-transform group-hover:translate-x-0.5">
                  -&gt;
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
    <div id="top" className="min-h-dvh bg-[var(--background)] text-[color:var(--text-primary)]">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10 lg:px-8">
        <HeroSection />
        <NetworkSection />
        <ResourcesSection />
      </main>

      <footer className="footer-panel py-7 text-center text-[0.64rem] text-[color:var(--text-secondary)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-5 sm:px-6 lg:px-8">
          <LogoMark
            size={36}
            className="h-10 w-10"
            ariaLabel="SudoStake mark"
          />
        </div>
      </footer>
    </div>
  );
}
