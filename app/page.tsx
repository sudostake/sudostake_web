export default function Home() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900 antialiased dark:from-black dark:via-zinc-950 dark:to-black dark:text-zinc-100">
      <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col items-center justify-center gap-14 px-5 pb-20 pt-14 text-center sm:px-8 sm:pb-24 sm:pt-16 md:px-16 md:pt-20">
        <section className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 sm:text-sm">
            Welcome to SudoStake
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Unlock Liquidity with the Assets You Already Stake
          </h1>
          <p className="mx-auto max-w-2xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Borrow stablecoins against staked positions without unbonding.
            Maintain custody, keep rewards compounding, and tap into on-demand
            liquidity while your assets keep working for you.
          </p>
        </section>

        <section className="grid w-full gap-6 sm:grid-cols-2">
          <div
            className="group relative cursor-not-allowed overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 text-left shadow-sm transition dark:border-zinc-800 dark:bg-zinc-900 sm:p-10"
            aria-disabled="true"
          >
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 dark:from-indigo-400/10 dark:via-purple-400/10 dark:to-blue-400/10" />
            </div>
            <h2 className="text-2xl font-semibold">Archway DApp</h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Collateralize staked ARCH to open a flexible USDC credit line
              without unbonding or disrupting rewards.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:bg-zinc-800 dark:text-indigo-300">
              Coming Soon
            </span>
          </div>

          <a
            href="https://sudostake-web-near--sudostake.us-east4.hosted.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 sm:p-10"
          >
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-lime-500/10 dark:from-emerald-400/10 dark:via-sky-400/10 dark:to-lime-400/10" />
            </div>
            <h2 className="text-2xl font-semibold">NEAR DApp</h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Borrow against staked NEAR while keeping custody of your tokens.
              Access USDC in minutes with transparent rates.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition group-hover:gap-3 dark:text-emerald-400">
              Launch NEAR App
              <span aria-hidden>&rarr;</span>
            </span>
          </a>
        </section>

        <footer className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 sm:text-xs">
          Validator infrastructure for multichain staking
        </footer>
      </main>
    </div>
  );
}
