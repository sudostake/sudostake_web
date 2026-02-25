const quickStartSteps = [
  "Choose your network below to open the right app.",
  "Connect your wallet and select a staked asset as collateral.",
  "Borrow or lend USDC, then track your position from the dashboard.",
];

export function HeroSection() {
  return (
    <section id="how-it-works" className="w-full py-10 sm:py-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 sm:gap-8">
        <p className="pixel-chip w-fit text-[color:var(--text-primary)]">Protocol Console v1.0</p>
        <h1 className="pixel-hero max-w-5xl text-[1rem] font-normal text-[color:var(--text-primary)] sm:text-[1.32rem] lg:text-[1.62rem]">
          Earn from staking.
          <span className="block">Trade anytime.</span>
        </h1>
        <div className="pixel-rule max-w-4xl" aria-hidden />

        <div className="hero-panel px-4 py-4 sm:px-6 sm:py-6">
          <h2 className="pixel-heading text-[0.64rem] text-[color:var(--text-primary)] sm:text-[0.7rem]">
            Start in 3 quick steps
          </h2>
          <ol className="mt-3 space-y-2.5 text-[1.16rem] leading-[1.2] text-[color:var(--text-secondary)] sm:text-[1.26rem]">
            {quickStartSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="pixel-chip min-w-[2.1rem] justify-center text-[color:var(--text-primary)]">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
