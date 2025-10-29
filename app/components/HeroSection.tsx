const roles = [
  {
    title: "For Vault Owners",
    description:
      "Swap staked rights for USDC liquidity without pausing rewards.",
  },
  {
    title: "For Liquidity Providers",
    description:
      "Provide USDC to earn fixed interest plus liquidation rights.",
  },
];

export function HeroSection() {
  return (
    <section className="flex w-full flex-col items-center gap-16 py-16">
      <div className="relative flex w-full max-w-5xl flex-col items-center gap-4 overflow-hidden rounded-[2rem] border border-soft bg-surface-primary px-6 py-12 text-center shadow-soft-elevated sm:px-8 sm:py-14 dark:border-zinc-800/70 dark:bg-zinc-900">
        <div
          className="absolute inset-0 -z-10 opacity-80 blur-3xl transition-opacity dark:opacity-60"
          style={{
            background:
              "radial-gradient(circle at 20% -10%, var(--accent-strong) 0%, rgba(30,77,217,0) 70%)",
          }}
        />
        <h1 className="text-balance text-4xl font-semibold leading-tight text-primary-strong sm:text-5xl lg:text-[3.75rem]">
          Stake. Earn. Trade.
        </h1>
        <p className="text-pretty max-w-xl text-base text-secondary-strong dark:text-zinc-400 sm:text-lg">
          Earn from staking, trade anytime.
        </p>
        <p className="text-pretty max-w-xl text-sm text-tertiary-soft sm:text-base dark:text-zinc-400/90">
          Keep delegated stake compounding while on-demand credit powers every trade.
        </p>
        <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center">
          <a
            href="#apps"
            className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent-primary)] px-6 py-3 text-sm font-semibold text-white !text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-primary-hover)] hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-primary)] motion-reduce:transform-none motion-reduce:transition-none sm:w-auto dark:!text-white"
          >
            Explore Apps
          </a>
          <a
            href="https://github.com/sudostake"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-strong)] px-6 py-3 text-sm font-semibold text-secondary-strong transition hover:-translate-y-0.5 hover:border-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary)] motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-[#4d73eb] dark:hover:text-[#7c97f5]"
          >
            View Docs
          </a>
        </div>
      </div>

      <div className="w-full max-w-5xl">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-secondary-strong sm:text-3xl dark:text-zinc-100">
            How It Works
          </h2>
          <p className="mt-2 text-sm text-secondary-strong dark:text-zinc-400">
            Two roles, one vaulted exchange.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {roles.map((role) => (
            <article
              key={role.title}
              className="flex h-full min-h-[10rem] flex-col gap-4 rounded-2xl border border-soft bg-surface-primary p-6 text-left shadow-soft-elevated transition hover:-translate-y-0.5 hover:border-[color:var(--accent-primary)] hover:bg-accent-subtle motion-safe:duration-150 motion-safe:ease-out motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-800/70 dark:bg-zinc-900/80 dark:hover:border-[#4d73eb]"
            >
              <h3 className="text-lg font-semibold tracking-tight text-primary-strong dark:text-zinc-100">
                {role.title}
              </h3>
              <div className="h-px w-12 bg-[color:var(--border-soft)] dark:bg-zinc-700" />
              <p className="text-sm text-secondary-strong dark:text-zinc-400">
                {role.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
