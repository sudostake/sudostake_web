const roles = [
  {
    title: "Vault Owners",
    accent: "#1d4ed8",
    description: "Borrow USDC while your validator keeps earning.",
    bullets: [
      "Tap once to connect and keep validator bonds intact.",
      "Distribute collateral across validators without pausing rewards.",
      "Feel confident about every liquidation threshold before committing.",
    ],
  },
  {
    title: "Liquidity Providers",
    accent: "#059669",
    description: "Supply USDC with steady interest and optional liquidation rights.",
    bullets: [
      "Add liquidity with transparent pricing and slippage bounds.",
      "Inspect each loan state change before approving.",
      "Exit or trigger liquidations with deliberate confirmations.",
    ],
  },
];

const heroHighlights = [
  {
    label: "Vault onboarding",
    value: "5 min",
    description: "Connect your wallet, approve collateral, and borrow in under five minutes.",
  },
  {
    label: "Stake continuity",
    value: "100%",
    description: "Your stake stays bonded so rewards compound even after you borrow.",
  },
  {
    label: "Guided workflow",
    value: "Exact steps",
    description: "Every action prompts the next, so the interface feels precise and predictable.",
  },
];

export function HeroSection() {
  return (
    <section className="relative w-full mt-16 sm:mt-20 md:mt-24 overflow-hidden pb-10 pt-6 lg:pt-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5 text-left">
            <h1 className="text-pretty text-4xl font-semibold leading-[1.05] tracking-tight text-primary-strong sm:text-5xl lg:text-[3.6rem]">
              Earn from staking, trade anytime.
            </h1>
            <p className="text-base text-secondary-strong/90 dark:text-zinc-300">
              SudoStake keeps your staking rewards intact while letting you borrow, lend, and
              swap with crystal-clear confirmations and no guesswork.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#apps"
                className="inline-flex w-full items-center justify-center rounded-full bg-accent-primary px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_-20px_rgba(30,77,217,0.65)] transition hover:-translate-y-0.5 hover:bg-accent-primary-hover hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary focus-visible:text-white sm:w-auto"
                style={{ color: "#ffffff" }}
              >
                Explore Apps
              </a>
              <a
                href="https://github.com/sudostake/sudostake_web"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-border-strong bg-white/70 px-7 py-3 text-sm font-semibold text-secondary-strong transition hover:-translate-y-0.5 hover:border-accent-primary hover:text-accent-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary sm:w-auto dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-300"
              >
                View Source Code
              </a>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-border-soft bg-white/80 px-6 py-4 text-sm text-secondary-strong shadow-card-subtle backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/60 sm:grid-cols-3 sm:px-7 sm:py-5">
            {heroHighlights.map((highlight) => (
              <div key={highlight.label} className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-tertiary-soft dark:text-zinc-400">
                  {highlight.label}
                </span>
                <span className="text-2xl font-semibold text-primary-strong dark:text-zinc-50">
                  {highlight.value}
                </span>
                <p className="text-xs leading-5 text-secondary-strong/90 dark:text-zinc-400">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>

          <div className="relative flex flex-col gap-6 rounded-3xl border border-border-soft bg-white/85 px-6 py-6 shadow-card-subtle backdrop-blur dark:border-zinc-800/65 dark:bg-zinc-950/65">
            <span className="section-subtitle text-xs uppercase tracking-[0.35em] text-tertiary-soft dark:text-zinc-400">
              Designed for
            </span>
            <div className="grid gap-4 sm:grid-cols-2">
              {roles.map((role) => (
                <article
                  key={role.title}
                  className="flex flex-col gap-3 rounded-2xl border border-border-soft bg-surface-glass px-5 py-5 transition hover:border-[color:var(--accent-primary)] hover:bg-white/80 dark:hover:bg-zinc-900/70 dark:border-zinc-800/60 dark:bg-surface-muted"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-primary-strong dark:text-zinc-50">
                      {role.title}
                    </h3>
                    <span
                      aria-hidden
                      className="inline-flex h-3 w-3 rounded-full border border-border-soft shadow-sm"
                      style={{ backgroundColor: role.accent }}
                    />
                  </div>
                  <p className="text-sm text-secondary-strong/90 dark:text-zinc-400">{role.description}</p>
                  <ul className="flex flex-col gap-2 text-xs text-secondary-strong/90 dark:text-zinc-400">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span
                          className="mt-1 h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: role.accent }}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
