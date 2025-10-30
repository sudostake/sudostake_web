import type { CSSProperties } from "react";

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
    soft: string;
  };
};

const resources: ResourceLink[] = [
  {
    name: "Developer Docs",
    href: "https://github.com/sudostake/sudostake_web_near/tree/main/docs",
    description:
      "Deployment guides, contract references, and integration playbooks for stake-backed credit.",
    label: "Docs",
    accent: {
      base: "#1e4dd9",
      soft: "rgba(30, 77, 217, 0.12)",
    },
  },
  {
    name: "GitHub Repositories",
    href: "https://github.com/sudostake",
    description:
      "Contracts, SDKs, and tooling behind SudoStake vault collateralization and liquidity orchestration.",
    label: "Code",
    accent: {
      base: "#3b4a73",
      soft: "rgba(59, 74, 115, 0.12)",
    },
  },
  {
    name: "Telegram Support",
    href: "https://t.me/sudostake",
    description:
      "Direct line for delegators, validators, and underwriting partners scaling vaults.",
    label: "Support",
    accent: {
      base: "#00b87b",
      soft: "rgba(0, 184, 123, 0.14)",
    },
  },
  {
    name: "X (Twitter) Updates",
    href: "https://x.com/sudostake",
    description:
      "Product releases, ecosystem notes, and real-time liquidity updates from the team.",
    label: "Updates",
    accent: {
      base: "#1d9bf0",
      soft: "rgba(29, 155, 240, 0.16)",
    },
  },
];

function ResourcesSection() {
  return (
    <section
      id="resources"
      className="relative flex w-full flex-col gap-8 overflow-hidden rounded-[32px] border border-soft bg-surface-primary/90 px-6 py-12 shadow-soft-elevated sm:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(30,77,217,0.15) 0%, rgba(30,77,217,0) 60%), radial-gradient(circle at 100% 15%, rgba(0,184,123,0.14) 0%, rgba(0,184,123,0) 55%)",
        }}
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--border-strong)] bg-surface-muted/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-tertiary-soft dark:border-zinc-700/70 dark:bg-zinc-900/60">
            Stay connected
          </span>
          <div className="space-y-3">
            <h2 className="text-pretty text-3xl font-semibold leading-tight text-primary-strong sm:text-4xl dark:text-zinc-100">
              Resources & updates for stake-backed liquidity.
            </h2>
            <p className="max-w-xl text-sm text-secondary-strong/90 dark:text-zinc-400">
              Choose the channel that fits your workflow—from integration docs to
              release notes—so vault operators, validators, and LPs stay aligned.
            </p>
          </div>
        </div>
        <a
          href="#apps"
          className="relative inline-flex w-full items-center justify-center rounded-full border border-[color:var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[color:var(--accent-primary)] transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-subtle)] hover:text-[color:var(--accent-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-primary)] motion-reduce:transform-none motion-reduce:transition-none sm:w-auto"
        >
          View live apps
        </a>
      </div>

      <ul className="relative grid gap-5 text-sm sm:grid-cols-2 sm:gap-6">
        {resources.map(({ name, href, description, label, accent }) => {
          const accentStyle = {
            "--resource-accent-base": accent.base,
            "--resource-accent-soft": accent.soft,
          } as CSSProperties;

          return (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${name} in a new tab`}
                className="group relative flex h-full flex-col justify-between gap-6 rounded-2xl border border-soft bg-surface-primary/95 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[color:var(--resource-accent-base)] hover:bg-[color:var(--surface-primary)] motion-reduce:transform-none motion-reduce:transition-none dark:bg-zinc-900/70 dark:hover:bg-zinc-900/85"
                style={accentStyle}
              >
                <div className="flex flex-col gap-4 text-left">
                  <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--resource-accent-base)] bg-[color:var(--resource-accent-soft)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--resource-accent-base)]">
                    {label}
                  </span>
                  <div className="space-y-2">
                    <span className="text-base font-semibold text-primary-strong dark:text-zinc-50">
                      {name}
                    </span>
                    <p className="text-sm text-secondary-strong/90 dark:text-zinc-400">
                      {description}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--resource-accent-base)] transition-transform duration-150 group-hover:translate-x-1 group-hover:gap-3">
                  Visit resource
                  <span aria-hidden className="text-base">
                    →
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-dvh bg-[var(--background)] text-[color:var(--text-primary)] antialiased">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-5 pb-28 pt-20 sm:px-6 lg:px-8">
        <HeroSection />
        <NetworkSection />
        <ResourcesSection />
      </main>

      <footer className="border-t border-zinc-200/70 bg-white/85 py-12 text-xs text-zinc-500 dark:border-zinc-800/70 dark:bg-zinc-950/85 dark:text-zinc-400">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 sm:px-6 lg:px-8">
          <span className="font-semibold uppercase tracking-[0.28em]">© 2025 SudoStake</span>
        </div>
      </footer>
    </div>
  );
}
