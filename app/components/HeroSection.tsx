type FlowStep = {
  title: string;
  detail: string;
};

const flowSteps: FlowStep[] = [
  {
    title: "Create Vault",
    detail: "Create a vault on your selected network.",
  },
  {
    title: "Deposit Tokens",
    detail: "Deposit supported L1 tokens into your vault.",
  },
  {
    title: "Stake",
    detail: "Stake and manage your deposited tokens with your preferred validators.",
  },
  {
    title: "Access USDC",
    detail: "Use your vault containing staked tokens as security to access USDC liquidity.",
  },
];

export function HeroSection() {
  return (
    <section id="how-it-works" className="w-full py-10 sm:py-12 lg:py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:items-center">
        <div className="flex flex-col gap-5">
          <h1 className="pixel-hero max-w-5xl text-[1rem] font-normal text-[color:var(--text-primary)] sm:text-[1.32rem] lg:text-[1.62rem]">
            Use staked L1 tokens
            <span className="block">as collateral for USDC.</span>
          </h1>
          <p className="max-w-3xl text-[0.86rem] text-[color:var(--text-secondary)] sm:text-[0.94rem]">
            Create your vault, deposit supported tokens, stake with validators, and use your staked position to unlock USDC liquidity.
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
