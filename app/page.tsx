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
    <section id="resources" className="w-full py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-5 sm:px-6 lg:px-8">
        <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--border-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-tertiary-soft dark:border-zinc-700/70">
          Stay connected
        </span>
        <div className="flex flex-col gap-3 sm:max-w-lg">
          <h2 className="text-pretty text-3xl font-semibold leading-tight text-primary-strong sm:text-4xl dark:text-zinc-100">
            Key guides and updates for stake-backed loans.
          </h2>
          <p className="max-w-xl text-sm text-secondary-strong/90 dark:text-zinc-400">
            Choose the channel you prefer to stay in sync.
          </p>
        </div>

        <ul className="flex flex-col text-sm">
          {resources.map(({ name, href, description, label, accent }) => (
            <li
              key={href}
              className="border-t border-[color:var(--border-strong)] py-5 first:border-t-0 first:pt-0 dark:border-zinc-800/80"
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${name} in a new tab`}
                className="flex flex-col gap-3 transition hover:text-primary-strong sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-2">
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.28em]"
                    style={{ color: accent.base }}
                  >
                    {label}
                  </span>
                  <span className="text-base font-semibold text-primary-strong dark:text-zinc-50">
                    {name}
                  </span>
                  <p className="text-sm text-secondary-strong/90 dark:text-zinc-400">
                    {description}
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-2 text-sm font-semibold transition"
                  style={{ color: accent.base }}
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
    <div className="min-h-dvh bg-[var(--background)] text-[color:var(--text-primary)] antialiased">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-5 pb-20 pt-14 sm:px-6 lg:px-8">
        <HeroSection />
        <NetworkSection />
        <ResourcesSection />
      </main>

      <footer className="border-t border-zinc-200/70 bg-white/85 py-10 text-xs text-zinc-500 dark:border-zinc-800/70 dark:bg-zinc-950/85 dark:text-zinc-400">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 sm:px-6 lg:px-8">
          <span className="font-semibold uppercase tracking-[0.28em]">© 2025 SudoStake</span>
        </div>
      </footer>
    </div>
  );
}
