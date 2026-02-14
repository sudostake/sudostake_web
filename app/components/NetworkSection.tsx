type Network = {
  name: string;
  href: string;
  description: string;
  availability: string;
};

const networks: Network[] = [
  {
    name: "Cosmos dApp",
    href: "https://cosmos.sudostake.com",
    description: "Stake-backed borrowing and lending on Cosmos mainnet.",
    availability: "Mainnet",
  },
  {
    name: "NEAR dApp",
    href: "https://near.sudostake.com",
    description: "Stake-backed borrowing and lending flow on NEAR testnet.",
    availability: "Testnet",
  },
];

export function NetworkSection() {
  return (
    <section id="apps" className="w-full py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-2">
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
                className="flex h-full flex-col gap-4 rounded-2xl surface-card px-6 py-6 text-left text-[color:var(--text-primary)] transition hover:border-[color:var(--accent-primary)]"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-semibold text-[color:var(--text-primary)]">
                    {network.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                    {network.description}
                  </p>
                  <p className="text-sm text-[color:var(--text-tertiary)]">{network.availability}</p>
                </div>
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
