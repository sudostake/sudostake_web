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
    name: "Developer Docs",
    href: "https://github.com/sudostake/sudostake_web_near/tree/main/docs",
    description:
      "Step-by-step guides to launch stake-backed loans.",
    label: "Docs",
    accent: {
      base: "#1e4dd9",
    },
  },
  {
    name: "GitHub Repositories",
    href: "https://github.com/sudostake",
    description:
      "Code and tools that power SudoStake vaults.",
    label: "Code",
    accent: {
      base: "#3b4a73",
    },
  },
  {
    name: "Telegram Support",
    href: "https://t.me/sudostake",
    description:
      "Chat with the SudoStake team and partners.",
    label: "Support",
    accent: {
      base: "#00b87b",
    },
  },
  {
    name: "X (Twitter) Updates",
    href: "https://x.com/sudostake",
    description:
      "Updates on releases, community news, and credit.",
    label: "Updates",
    accent: {
      base: "#1d9bf0",
    },
  },
];

function ResourcesSection() {
  return (
    <section id="resources" className="w-full pt-10 pb-0 sm:pt-12 sm:pb-0 lg:pt-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-2 sm:max-w-xl">
          <h2 className="text-pretty text-3xl font-semibold leading-tight text-primary-strong sm:text-4xl dark:text-zinc-100">
            Resources
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {resources.map(({ name, href, description, accent }) => (
            <li key={href} className="group">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${name} in a new tab`}
                className="relative flex h-full flex-col justify-between gap-5 overflow-hidden rounded-3xl border border-[color:var(--border-soft)] bg-white/92 px-6 py-6 text-left shadow-[0_32px_60px_-48px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:shadow-[0_40px_70px_-42px_rgba(15,23,42,0.6)] dark:border-zinc-800/70 dark:bg-zinc-950/75 sm:px-7 sm:py-7"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 opacity-90 transition group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${accent.base} 0%, rgba(30,77,217,0.45) 100%)` }}
                />
                <div className="relative flex items-start gap-4">
                  <span
                    aria-hidden
                    className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white/85 shadow-[0_20px_30px_-24px_rgba(15,23,42,0.4)] transition group-hover:scale-105 dark:bg-zinc-900/70"
                    style={{ border: `1px solid ${accent.base}33` }}
                  >
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: accent.base }}
                    />
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold text-primary-strong dark:text-zinc-50">
                      {name}
                    </span>
                    <p className="text-sm leading-6 text-secondary-strong/90 dark:text-zinc-400">
                      {description}
                    </p>
                  </div>
                </div>
                <span
                  className="relative inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-primary)] transition group-hover:gap-3"
                >
                  Visit resource
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

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-20 pt-12 sm:gap-12 sm:px-6 sm:pt-16 lg:px-8">
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
