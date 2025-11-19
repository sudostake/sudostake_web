import { HeroSection } from "./components/HeroSection";
import { NetworkSection } from "./components/NetworkSection";
import { SiteHeader } from "./components/SiteHeader";

type ResourceLink = {
  name: string;
  href: string;
  description: string;
  label: string;
  accent: {
    base: string;
  };
};

const resources: ResourceLink[] = [
  {
    name: "GitHub Repositories",
    href: "https://github.com/sudostake",
    description: "Every repo and utility that keeps SudoStake vaults running.",
    label: "Code",
    accent: {
      base: "#3b4a73",
    },
  },
  {
    name: "Telegram Support",
    href: "https://t.me/sudostake",
    description: "Tap into Telegram to talk directly with SudoStake builders and partners.",
    label: "Support",
    accent: {
      base: "#00b87b",
    },
  },
  {
    name: "X (Twitter) Updates",
    href: "https://x.com/sudostake",
    description: "Concise news on releases, community milestones, and protocol insight.",
    label: "Updates",
    accent: {
      base: "#1d9bf0",
    },
  },
];

function ResourcesSection() {
  return (
    <section id="resources" className="w-full py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-2 sm:max-w-xl">
          <h2 className="section-heading text-primary-strong dark:text-zinc-100">Connections</h2>
          <p className="section-subtitle text-secondary-strong/90 dark:text-zinc-400">
            Code, community, and live updates keep every step transparent so you know what happens next.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {resources.map(({ name, href, description, label, accent }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${name} in a new tab`}
                className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-surface-glass px-5 py-6 text-left transition hover:border-[color:var(--accent-primary)] hover:bg-white/80 dark:hover:bg-zinc-900/70 dark:border-zinc-800/60 dark:bg-surface-muted"
              >
                <span
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.32em]"
                  style={{ color: accent.base }}
                >
                  {label}
                </span>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full"
                    style={{
                      border: `1px solid ${accent.base}33`,
                      backgroundColor: `${accent.base}12`,
                    }}
                  >
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: accent.base }}
                    />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold text-primary-strong dark:text-zinc-50">
                      {name}
                    </span>
                    <p className="text-sm leading-relaxed text-secondary-strong/90 dark:text-zinc-400">
                      {description}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-primary)]">
                  Open resource
                  <span aria-hidden className="text-base">→</span>
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

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 pb-20 pt-12 sm:gap-14 sm:px-6 sm:pt-16 lg:px-8">
        <HeroSection />
        <NetworkSection />
        <ResourcesSection />
      </main>

      <footer className="border-t border-zinc-200/70 bg-white/85 py-10 text-center text-xs text-zinc-500 dark:border-zinc-800/70 dark:bg-zinc-950/85 dark:text-zinc-400">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-5 sm:px-6 lg:px-8">
          <span className="font-semibold uppercase tracking-[0.28em]">© 2025 SudoStake</span>
        </div>
      </footer>
    </div>
  );
}
