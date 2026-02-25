import Image from "next/image";

type Network = {
  name: string;
  href: string;
  description: string;
  availability: string;
  logoSrc: string;
  logoAlt: string;
};

const networks: Network[] = [
  {
    name: "Cosmos",
    href: "https://cosmos.sudostake.com",
    description: "Stake-backed borrowing and lending on Cosmos mainnet.",
    availability: "Mainnet",
    logoSrc: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
    logoAlt: "Cosmos logo",
  },
  {
    name: "NEAR",
    href: "https://near.sudostake.com",
    description: "Stake-backed borrowing and lending on NEAR testnet.",
    availability: "Testnet",
    logoSrc: "https://pages.near.org/wp-content/uploads/2021/09/brand-icon-300x300.png",
    logoAlt: "NEAR logo",
  },
];

export function NetworkSection() {
  return (
    <section id="apps" className="w-full py-10 sm:py-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="section-heading text-[color:var(--text-primary)]">Choose a network</h2>
          <p className="section-subtitle text-[color:var(--text-secondary)]">
            Use mainnet for live capital and testnet to practice the same flow first.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {networks.map((network) => (
            <li key={network.name} className="h-full">
              <a
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${network.name} (${network.availability})`}
                className="pixel-card surface-card flex h-full flex-col gap-4 px-4 py-5 text-left text-[color:var(--text-primary)] sm:px-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex border-2 border-[color:var(--panel-border)] bg-[color:var(--surface-muted)] p-1.5">
                      <Image src={network.logoSrc} alt={network.logoAlt} width={28} height={28} className="h-7 w-7" />
                    </span>
                    <h3 className="pixel-heading text-[0.72rem] text-[color:var(--text-primary)] sm:text-[0.8rem]">
                      {network.name}
                    </h3>
                  </div>
                  <p className="pixel-chip text-[color:var(--text-tertiary)]">
                    {network.availability}
                  </p>
                </div>
                <p className="text-[1.14rem] leading-[1.18] text-[color:var(--text-secondary)]">
                  {network.description}
                </p>
                <span className="pixel-heading mt-auto text-[0.56rem] text-[color:var(--accent-primary)]">
                  Open app -&gt;
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
