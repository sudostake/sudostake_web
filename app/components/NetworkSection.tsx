import Image from "next/image";

type Network = {
  name: string;
  href: string;
  availability: string;
  logoSrc: string;
  logoAlt: string;
  summary: string;
  tokenTag: string;
};

const networks: Network[] = [
  {
    name: "Cosmos",
    href: "https://cosmos.sudostake.com",
    availability: "Mainnet",
    logoSrc: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
    logoAlt: "Cosmos logo",
    summary: "Use staked ATOM in your vault as collateral to access USDC.",
    tokenTag: "ATOM",
  },
  {
    name: "NEAR",
    href: "https://near.sudostake.com",
    availability: "Testnet",
    logoSrc: "https://pages.near.org/wp-content/uploads/2021/09/brand-icon-300x300.png",
    logoAlt: "NEAR logo",
    summary: "Testnet vault flow using staked NEAR as collateral for USDC.",
    tokenTag: "NEAR",
  },
];

export function NetworkSection() {
  return (
    <section id="apps" className="w-full py-10 sm:py-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="section-heading text-[color:var(--text-primary)]">Choose a network</h2>
          <span className="pixel-chip text-[color:var(--text-secondary)]">{networks.length} apps</span>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {networks.map((network) => (
            <li key={network.name} className="h-full">
              <a
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Go to ${network.name} (${network.availability})`}
                className="group pixel-card surface-card flex h-full min-w-0 flex-col gap-3 px-4 py-5 text-left text-[color:var(--text-primary)] sm:px-5 lg:flex-row lg:items-start lg:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span className="network-mark">
                    <Image src={network.logoSrc} alt={network.logoAlt} width={28} height={28} className="h-7 w-7 flex-none" />
                  </span>
                  <div className="flex min-w-0 flex-col gap-1">
                    <h3 className="pixel-heading text-[0.8rem] text-[color:var(--text-primary)] sm:text-[0.88rem]">
                      {network.name}
                    </h3>
                    <p className="break-words text-[0.7rem] leading-[1.3] text-[color:var(--text-secondary)] sm:text-[0.76rem]">
                      {network.summary}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  <p className="pixel-chip text-[color:var(--text-secondary)]">{network.tokenTag}</p>
                  <p className="pixel-chip text-[color:var(--text-tertiary)]">{network.availability}</p>
                  <span className="pixel-heading text-[0.64rem] text-[color:var(--accent-primary)] transition-transform group-hover:translate-x-0.5">
                    -&gt;
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
