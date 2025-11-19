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
        <div className="relative flex flex-col gap-10 rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0b1c2a]/90 via-[#132d4a]/60 to-[#071028]/90 px-6 py-8 shadow-[0_40px_90px_-45px_rgba(1,6,35,0.9)] sm:px-10 sm:py-10">
          <div className="flex flex-col gap-5 text-left">
            <h1 className="text-pretty text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              Earn from staking, trade anytime.
            </h1>
            <p className="text-base text-white/80">
              Keep validator rewards compounding while borrowing, lending, or swapping behind clear confirmations.
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
                className="inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-[color:var(--accent-primary)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent-primary)] sm:w-auto"
              >
                View Source Code
              </a>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/80 shadow-[0_25px_60px_-40px_rgba(0,0,0,0.8)] sm:grid-cols-3 sm:px-7 sm:py-5">
            {heroHighlights.map((highlight) => (
              <div key={highlight.label} className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  {highlight.label}
                </span>
                <span className="text-2xl font-semibold text-white">
                  {highlight.value}
                </span>
                <p className="text-xs leading-5 text-white/70">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>

          <div className="relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-b from-[#132d4a]/70 to-[#0b1c2a]/85 px-6 py-6 shadow-[0_40px_80px_-45px_rgba(1,4,20,0.9)]">
            <span className="section-subtitle text-xs uppercase tracking-[0.35em] text-white/60">
              Designed for
            </span>
            <div className="grid gap-4 sm:grid-cols-2">
              {roles.map((role) => (
                <article
                  key={role.title}
                  className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-5 text-white/90 shadow-[0_15px_35px_-25px_rgba(0,0,0,0.85)] transition hover:border-[color:var(--accent-primary)] hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">
                      {role.title}
                    </h3>
                    <span
                      aria-hidden
                      className="inline-flex h-3 w-3 rounded-full border border-white/30 shadow-sm"
                      style={{ backgroundColor: role.accent }}
                    />
                  </div>
                  <p className="text-sm text-white/80">{role.description}</p>
                  <ul className="flex flex-col gap-2 text-xs text-white/70">
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
