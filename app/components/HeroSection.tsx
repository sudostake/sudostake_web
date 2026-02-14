const keyActions = [
  "Borrow USDC against staked collateral without unbonding.",
  "Lend USDC and earn from protocol borrowing activity.",
];

export function HeroSection() {
  return (
    <section id="how-it-works" className="w-full py-10 sm:py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <h1 className="text-pretty text-4xl font-semibold leading-[1.1] text-[color:var(--text-primary)] sm:text-5xl lg:text-[3.2rem]">
          Earn from staking, trade anytime.
        </h1>
        <p className="max-w-3xl text-base text-[color:var(--text-secondary)]">
          SudoStake keeps validator rewards active while you use staked collateral
          for USDC liquidity.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href="https://cosmos.sudostake.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent-primary)] px-7 py-3 text-sm font-semibold text-[color:var(--primary-text)] transition hover:bg-[color:var(--accent-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent-primary)] sm:w-auto"
          >
            Open Cosmos dApp
          </a>
          <a
            href="#apps"
            className="inline-flex w-full items-center justify-center rounded-full border px-7 py-3 text-sm font-semibold text-[color:var(--text-secondary)] transition hover:border-[color:var(--accent-primary)] hover:text-[color:var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent-primary)] sm:w-auto"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "color-mix(in oklab, var(--surface), transparent 40%)",
            }}
          >
            Compare Networks
          </a>
        </div>

        <p className="text-sm text-[color:var(--text-tertiary)]">
          Available now on Cosmos mainnet and NEAR testnet.
        </p>

        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-6">
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">What you can do</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[color:var(--text-secondary)]">
            {keyActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
