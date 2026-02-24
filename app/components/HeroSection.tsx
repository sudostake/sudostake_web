const quickStartSteps = [
  "Choose your network below to open the right app.",
  "Connect your wallet and select a staked asset as collateral.",
  "Borrow or lend USDC, then track your position from the dashboard.",
];

export function HeroSection() {
  return (
    <section id="how-it-works" className="w-full py-12 sm:py-14 lg:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-9">
        <h1 className="max-w-5xl text-pretty text-[2.15rem] font-bold leading-[1.04] tracking-[-0.02em] text-[color:var(--text-primary)] sm:text-[2.95rem] lg:text-[3.75rem]">
          Earn from staking.
          <span className="block">Trade anytime.</span>
        </h1>

        <div className="hero-panel rounded-2xl px-5 py-5 sm:px-7 sm:py-7">
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)] sm:text-xl">
            Start in 3 quick steps
          </h2>
          <ul className="mt-3 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-[color:var(--text-secondary)] sm:text-base">
            {quickStartSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
