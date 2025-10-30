const roles = [
  {
    title: "Vault Owners",
    description:
      "Borrow USDC while your stake keeps earning.",
  },
  {
    title: "Liquidity Providers",
    description:
      "Lend USDC to earn steady interest and collect liquidation rewards.",
  },
];

export function HeroSection() {
  return (
    <section className="w-full pt-8 sm:pt-10 lg:pt-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7 px-5 sm:px-6 lg:px-8">
        <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--border-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.38em] text-tertiary-soft dark:border-zinc-700/70">
          Stake-backed loans
        </span>
        <div className="flex flex-col gap-4 text-left sm:gap-5">
          <h1 className="text-pretty text-4xl font-semibold leading-tight text-primary-strong sm:text-5xl lg:text-[3.5rem]">
            Stake. Earn. Trade.
          </h1>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-secondary-strong/80 dark:text-zinc-400">
            Borrow without unstaking
          </p>
          <p className="text-pretty max-w-xl text-base text-secondary-strong sm:text-lg dark:text-zinc-300/90">
            Keep rewards coming while you borrow digital dollars with SudoStake.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href="#apps"
            className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-primary)] sm:w-auto"
          >
            Explore Apps
          </a>
          <a
            href="https://github.com/sudostake"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--border-strong)] px-6 py-3 text-sm font-semibold text-secondary-strong transition hover:border-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary)] sm:w-auto dark:border-zinc-700 dark:text-zinc-300"
          >
            View Docs
          </a>
        </div>

        <div className="flex flex-col gap-6 border-t border-[color:var(--border-strong)] pt-6 dark:border-zinc-800/80 md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-12 md:pt-8">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-tertiary-soft dark:text-zinc-400">
              Why it works
            </span>
            <ul className="flex flex-col gap-3 text-sm text-secondary-strong/90 dark:text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent-primary)]" />
                Rewards keep running while you borrow.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent-primary)]" />
                Get credit right away.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent-primary)]" />
                Planned liquidations keep unwind events calm.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 rounded-2xl border border-[color:var(--border-strong)] bg-white px-5 py-5 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950">
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-tertiary-soft dark:text-zinc-400">
              Who it's for
            </span>
            <div className="flex flex-col gap-5">
              {roles.map((role) => (
                <div key={role.title} className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-primary-strong dark:text-zinc-100">
                    {role.title}
                  </h3>
                  <p className="text-sm text-secondary-strong/90 dark:text-zinc-400">
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
