type FlowStep = {
  title: string;
  detail: string;
};

const flowSteps: FlowStep[] = [
  {
    title: "Stake",
    detail: "Stake your L1 assets and keep validator rewards active.",
  },
  {
    title: "Vault",
    detail: "Your vault smart contract allows users or agents to use staked assets as collateral.",
  },
  {
    title: "Borrow",
    detail: "Access USDC liquidity on demand without exiting your stake.",
  },
];

export function HeroSection() {
  return (
    <section id="how-it-works" className="w-full py-10 sm:py-12 lg:py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:items-center">
        <div className="flex flex-col gap-5">
          <span className="pixel-chip w-fit text-[color:var(--text-secondary)]">Vault-native collateral</span>
          <h1 className="pixel-hero max-w-5xl text-[1rem] font-normal text-[color:var(--text-primary)] sm:text-[1.32rem] lg:text-[1.62rem]">
            Use staked L1 assets
            <span className="block">as collateral for USDC.</span>
          </h1>
          <p className="max-w-3xl text-[0.86rem] text-[color:var(--text-secondary)] sm:text-[0.94rem]">
            SudoStake vault smart contracts allow users or agents to use staked L1 assets as collateral to access USDC on demand.
          </p>
        </div>

        <div className="illustration-shell px-4 py-5 sm:px-5 sm:py-6">
          <p className="pixel-heading text-[0.6rem] text-[color:var(--text-secondary)]">How it works</p>
          <ol className="story-rail mt-4">
            {flowSteps.map((step, index) => (
              <li key={step.title} className="story-step">
                <span className="story-index">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="story-title">{step.title}</h3>
                <p className="story-copy">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
