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
      <div className="relative flex w-full max-w-5xl flex-col items-center gap-4 overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-white px-6 py-12 text-center shadow-sm shadow-zinc-900/5 sm:px-8 sm:py-14 dark:border-zinc-800/70 dark:bg-zinc-900">
        <div className="absolute inset-0 -z-10 opacity-80 blur-3xl [background:radial-gradient(circle_at_top,_rgba(30,77,217,0.14)_0%,_rgba(30,77,217,0)_70%)] dark:opacity-60" />
        <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-[3.75rem]">
          Stake. Earn. Trade.
        </h1>
        <p className="text-pretty max-w-xl text-base text-zinc-600/90 dark:text-zinc-400 sm:text-lg">
          Earn from staking, trade anytime.
        </p>
        <p className="text-pretty max-w-xl text-sm text-zinc-500 sm:text-base dark:text-zinc-400/90">
          Keep delegated stake compounding while on-demand credit powers every trade.
        </p>
        <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center">
          <a
            href="#apps"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#1e4dd9] px-6 py-3 text-sm font-semibold text-white !text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#193ec7] hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e4dd9] motion-reduce:transform-none motion-reduce:transition-none sm:w-auto dark:!text-white"
          >
            Explore Apps
          </a>
          <a
            href="https://github.com/sudostake"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:-translate-y-0.5 hover:border-[#1e4dd9] hover:text-[#1e4dd9] motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-[#4d73eb] dark:hover:text-[#7c97f5]"
          >
            View Docs
          </a>
        </div>
      </div>

      <div className="w-full max-w-5xl">
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
              className="flex h-full min-h-[10rem] flex-col gap-4 rounded-2xl border border-zinc-200/70 bg-white/95 p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#1e4dd9] hover:shadow-md motion-safe:duration-150 motion-safe:ease-out motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-800/70 dark:bg-zinc-900/80 dark:hover:border-[#4d73eb]"
            >
              <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {role.title}
              </h4>
              <div className="h-px w-12 bg-zinc-200 dark:bg-zinc-700" />
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
