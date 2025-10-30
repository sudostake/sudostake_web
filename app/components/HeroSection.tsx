const roles = [
  {
    title: "Vault Owners",
    description:
      "Swap staked rights for USDC liquidity without pausing rewards.",
  },
  {
    title: "Liquidity Providers",
    description:
      "Provide USDC to earn fixed interest plus liquidation rights.",
  },
];

export function HeroSection() {
  return (
    <section className="relative w-full pt-16 lg:pt-24">
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[42px] border border-soft bg-surface-primary px-6 py-16 shadow-soft-elevated sm:px-10 lg:px-14">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-80 transition-opacity dark:opacity-60"
          style={{
            background:
              "radial-gradient(circle at -10% 0%, var(--accent-strong) 0%, rgba(30,77,217,0) 65%), radial-gradient(circle at 110% 20%, rgba(0,237,150,0.12) 0%, rgba(0,237,150,0) 50%)",
          }}
        />

        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] lg:items-center">
          <div className="flex flex-col gap-8 text-left">
            <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--border-strong)] bg-surface-muted/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.38em] text-tertiary-soft dark:border-zinc-700/70 dark:bg-zinc-900/60">
              Validator-native liquidity
            </span>
            <div className="space-y-6">
              <h1 className="text-balance text-4xl font-semibold leading-tight text-primary-strong sm:text-5xl lg:text-[3.5rem]">
                Stake. Earn. Trade.
              </h1>
              <p className="text-pretty max-w-xl text-base text-secondary-strong sm:text-lg dark:text-zinc-300/90">
                Earn from staking while staying liquid. SudoStake unlocks
                on-demand credit on top of your delegated stake so you can move
                capital without interrupting compounding rewards.
              </p>
              <p className="text-pretty max-w-xl text-sm text-muted-soft sm:text-base">
                No pauses. No forced exits. Just validator-first liquidity rails
                with disciplined risk controls.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#apps"
                className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent-primary)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-primary)] motion-reduce:transform-none motion-reduce:transition-none sm:w-auto"
              >
                Explore Apps
              </a>
              <a
                href="https://github.com/sudostake"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--border-strong)] px-6 py-3 text-sm font-semibold text-secondary-strong transition hover:-translate-y-0.5 hover:border-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary)] motion-reduce:transform-none motion-reduce:transition-none sm:w-auto dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-[#4d73eb] dark:hover:text-[#7c97f5]"
              >
                View Docs
              </a>
            </div>
          </div>

          <div className="relative rounded-[30px] border border-soft/70 bg-surface-muted/60 p-6 shadow-soft-elevated backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/70">
            <div className="absolute -top-14 right-10 hidden h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(30,77,217,0.12)_0%,_rgba(30,77,217,0)_70%)] blur-lg lg:block" />
            <div className="relative flex flex-col gap-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-tertiary-soft dark:text-zinc-400">
                  Two sides of the market
                </span>
                <p className="text-balance text-lg font-semibold text-primary-strong dark:text-zinc-100">
                  Purpose-built credit rails for validators and vaults.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {roles.map((role) => (
                  <article
                    key={role.title}
                    className="group relative flex flex-col gap-2 rounded-2xl border border-soft/70 bg-surface-primary/70 px-5 py-4 transition hover:-translate-y-0.5 hover:border-[color:var(--accent-primary)] hover:bg-accent-subtle/60 motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-800/70 dark:bg-zinc-900/80"
                  >
                    <h3 className="text-base font-semibold text-primary-strong dark:text-zinc-100">
                      {role.title}
                    </h3>
                    <p className="text-sm text-secondary-strong/90 dark:text-zinc-400">
                      {role.description}
                    </p>
                  </article>
                ))}
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-[color:var(--border-strong)] bg-surface-primary/60 px-5 py-4 text-xs uppercase tracking-[0.28em] text-tertiary-soft dark:border-zinc-700/70 dark:text-zinc-400">
                <span>Continuous staking rewards</span>
                <span>Instant credit access</span>
                <span>Managed liquidation coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
