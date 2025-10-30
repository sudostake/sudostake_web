import { SiteHeader } from "./components/SiteHeader";

export default function Home() {
  return (
    <div className="min-h-dvh bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-24 px-5 pb-24 pt-28 sm:px-6">
        <section className="space-y-6 text-left sm:space-y-7">
          <h1 className="text-pretty text-3xl font-semibold leading-tight text-zinc-900 sm:text-[2.5rem] dark:text-zinc-50">
            Borrow against your staked balance without giving up control.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300/95">
            SudoStake vaults are non-custodial. You set collateral, confirm every action from your wallet, and keep staking
            rewards live while accessing stablecoin liquidity.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="https://sudostake-web-cosmos--sudostake.us-east4.hosted.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-between gap-3 rounded-full border border-[#ff4d00] px-6 py-3 text-sm font-semibold text-[#ff4d00] transition hover:border-[#ff6b29] hover:text-[#ff6b29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d00] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-[#ff6b29] dark:text-[#ff6b29] dark:hover:border-[#ff814d] dark:hover:text-[#ff814d] dark:focus-visible:ring-offset-zinc-950 sm:w-auto sm:min-w-[200px] sm:px-7"
            >
              Open Archway app
              <span aria-hidden className="text-base">→</span>
            </a>
            <a
              href="https://sudostake-web-near--sudostake.us-east4.hosted.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-between gap-3 rounded-full border border-[#00ed96] px-6 py-3 text-sm font-semibold text-[#00b87b] transition hover:border-[#38f6b7] hover:text-[#1bcf94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ed96] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-[#1af19f] dark:text-[#1af19f] dark:hover:border-[#3bf7b6] dark:hover:text-[#3bf7b6] dark:focus-visible:ring-offset-zinc-950 sm:w-auto sm:min-w-[200px] sm:px-7"
            >
              Open NEAR app
              <span aria-hidden className="text-base">→</span>
            </a>
          </div>
          <ul className="list-disc space-y-2.5 pl-5 text-sm text-zinc-600 sm:text-[0.95rem] dark:text-zinc-300/90">
            <li>Vault stays under your keys; every borrow, repayment, or delegation needs your signature.</li>
            <li>Loan terms lock before funding, so lenders and borrowers share the same collateral model.</li>
            <li>Event logs and dashboards make monitoring positions and liquidations straightforward.</li>
          </ul>
        </section>

        <section className="space-y-4 sm:space-y-5">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Resources</h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300/90">
            Review the code or talk to the team before you deploy capital.
          </p>
          <div className="flex flex-col gap-3 text-sm text-zinc-700 dark:text-zinc-300 sm:flex-row sm:items-center sm:gap-8">
            <a
              href="https://github.com/sudostake"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              GitHub / Docs
            </a>
            <a
              href="https://t.me/sudostake"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              Telegram support
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200/70 bg-white/85 py-10 text-xs text-zinc-500 dark:border-zinc-800/70 dark:bg-zinc-950/85 dark:text-zinc-400">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 sm:px-6 lg:px-8">
          <span className="font-semibold uppercase tracking-[0.28em]">Review the code</span>
          <p className="max-w-3xl leading-relaxed">
            SudoStake keeps its apps and contracts in public repositories. Review the code and match it to on-chain deployments
            before committing capital.
          </p>
        </div>
      </footer>
    </div>
  );
}
