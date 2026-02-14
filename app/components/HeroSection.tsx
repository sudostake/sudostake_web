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
          Unlock USDC without pausing your staking rewards.
        </p>

        <div className="flex">
          <a
            href="#apps"
            className="btn-primary inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition sm:w-auto"
          >
            Choose network
          </a>
        </div>

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
