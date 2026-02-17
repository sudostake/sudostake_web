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
    <section id="apps" className="w-full py-12 sm:py-14 lg:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="section-heading text-[color:var(--text-primary)]">Choose a network</h2>
          <p className="section-subtitle text-[color:var(--text-secondary)]">
            Use mainnet for live capital and testnet to practice the same flow first.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {networks.map((network) => (
            <li key={network.name} className="h-full">
              <a
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${network.name} (${network.availability})`}
                className="flex h-full flex-col gap-4 rounded-2xl surface-card px-5 py-6 text-left text-[color:var(--text-primary)] transition hover:border-[color:var(--accent-primary)] sm:px-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-2">
                      <Image src={network.logoSrc} alt={network.logoAlt} width={28} height={28} className="h-7 w-7" />
                    </span>
                    <h3 className="text-[1.25rem] font-semibold leading-tight text-[color:var(--text-primary)] sm:text-[1.35rem]">
                      {network.name}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--text-tertiary)]">
                    {network.availability}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">{network.description}</p>
                <span className="mt-auto text-sm font-semibold text-[color:var(--accent-primary)]">
                  Open app
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
