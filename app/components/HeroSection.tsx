const quickStartSteps = [
  "Choose your network below to open the right app.",
  "Connect your wallet and select a staked asset as collateral.",
  "Borrow or lend USDC, then track your position from the dashboard.",
];

export function HeroSection() {
  return (
    <section id="how-it-works" className="w-full py-12 sm:py-14 lg:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-9">
        <h1 className="max-w-5xl text-pretty text-[2.75rem] font-bold leading-[1.02] tracking-[-0.02em] text-[color:var(--text-primary)] sm:text-[3.7rem] lg:text-[4.9rem]">
          Earn from staking.
          <span className="block">Trade anytime.</span>
        </h1>

        <div className="hero-panel rounded-3xl px-6 py-6 sm:px-8 sm:py-8">
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)] sm:text-2xl">
            Start in 3 quick steps
          </h2>
          <ul className="mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed text-[color:var(--text-secondary)] sm:text-lg">
            {quickStartSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="flex">
          <a
            href="#apps"
            className="btn-primary inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition sm:w-auto"
          >
            Start now: choose network
          </a>
        </div>
      </div>
    </section>
  );
}
