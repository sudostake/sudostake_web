import { SiteHeader } from "./components/SiteHeader";

const resources = [
  {
    name: "GitHub / Docs",
    href: "https://github.com/sudostake",
    description: "Review the code and documentation before you deploy capital.",
    accentClass:
      "text-[#ff4d00] group-hover:text-[#ff6b29] dark:text-[#ff6b29] dark:group-hover:text-[#ff814d]",
  },
  {
    name: "Telegram support",
    href: "https://t.me/sudostake",
    description: "Talk to the team directly and get questions answered in real time.",
    accentClass:
      "text-[#00b87b] group-hover:text-[#00ed96] dark:text-[#1af19f] dark:group-hover:text-[#3bf7b6]",
  },
];

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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="https://sudostake-web-cosmos--sudostake.us-east4.hosted.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Archway app in a new tab"
              className="group inline-flex w-full items-center justify-between gap-3 rounded-full border border-[#ff4d00] px-6 py-3 text-sm font-semibold text-[#ff4d00] shadow-sm transition hover:border-[#ff6b29] hover:text-[#ff6b29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d00] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-[#ff6b29] dark:text-[#ff6b29] dark:hover:border-[#ff814d] dark:hover:text-[#ff814d] dark:focus-visible:ring-offset-zinc-950 sm:w-auto sm:min-w-[200px] sm:px-7"
            >
              Open Archway app
              <span aria-hidden className="text-base transition-transform duration-150 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://sudostake-web-near--sudostake.us-east4.hosted.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open NEAR app in a new tab"
              className="group inline-flex w-full items-center justify-between gap-3 rounded-full border border-[#00ed96] px-6 py-3 text-sm font-semibold text-[#00b87b] shadow-sm transition hover:border-[#38f6b7] hover:text-[#1bcf94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ed96] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-[#1af19f] dark:text-[#1af19f] dark:hover:border-[#3bf7b6] dark:hover:text-[#3bf7b6] dark:focus-visible:ring-offset-zinc-950 sm:w-auto sm:min-w-[200px] sm:px-7"
            >
              Open NEAR app
              <span aria-hidden className="text-base transition-transform duration-150 group-hover:translate-x-1">→</span>
            </a>
          </div>
          <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-zinc-600 sm:mt-5 sm:text-[0.95rem] dark:text-zinc-300/90">
            <li>Vault stays under your keys; every borrow, repayment, or delegation needs your signature.</li>
            <li>Loan terms lock before funding, so lenders and borrowers share the same collateral model.</li>
            <li>Event logs and dashboards make monitoring positions and liquidations straightforward.</li>
          </ul>
        </section>

        <section className="space-y-4 sm:space-y-5">
          <div className="space-y-1.5 sm:space-y-2">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Resources</h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300/90">
              Review the code or talk to the team before you deploy capital.
            </p>
          </div>
          <ul className="grid gap-4 text-sm sm:grid-cols-2 sm:gap-5">
            {resources.map(({ name, href, description, accentClass }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${name} in a new tab`}
                  className="group flex h-full flex-col justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/60 sm:p-6"
                >
                  <div className="space-y-1.5 text-left">
                    <span className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{name}</span>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300/90">{description}</p>
                  </div>
                  <span
                    aria-hidden
                    className={`text-base font-semibold transition-transform duration-150 group-hover:translate-x-1 ${accentClass}`}
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-zinc-200/70 bg-white/85 py-12 text-xs text-zinc-500 dark:border-zinc-800/70 dark:bg-zinc-950/85 dark:text-zinc-400">
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
