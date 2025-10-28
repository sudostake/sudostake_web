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
    <section className="flex w-full flex-col items-center gap-16 px-5 py-16 sm:px-6">
      <div className="flex w-full max-w-5xl flex-col items-center gap-5 rounded-[2.5rem] border border-zinc-200/80 bg-white/95 px-8 py-16 text-center shadow-sm shadow-zinc-900/5 dark:border-zinc-800/70 dark:bg-zinc-900/70 dark:shadow-none">
        <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          Stake. Earn. Trade.
        </h1>
        <p className="text-pretty max-w-xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
          Earn from staking, trade anytime.
        </p>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <a
            href="#apps"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#1e4dd9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#193ec7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e4dd9] sm:w-auto"
          >
            Explore Apps
          </a>
          <a
            href="https://github.com/sudostake"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-[#1e4dd9] hover:text-[#1e4dd9] dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-[#4d73eb] dark:hover:text-[#7c97f5]"
          >
            View Docs
          </a>
        </div>
      </div>

      <div className="w-full max-w-5xl px-5 sm:px-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            How It Works
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Two roles, one vaulted exchange.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {roles.map((role) => (
            <article
              key={role.title}
              className="flex h-full flex-col gap-4 rounded-2xl border border-zinc-200/80 bg-white/95 p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#1e4dd9] dark:border-zinc-800/70 dark:bg-zinc-900/80 dark:hover:border-[#4d73eb]"
            >
              <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {role.title}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {role.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
