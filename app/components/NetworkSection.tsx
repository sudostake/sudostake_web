type Network = {
  name: string;
  href: string;
  status: string;
  description: string;
  accent: {
    base: string;
    gradient: string;
    shadow: string;
    text: string;
  };
};

const networks: Network[] = [
  {
    name: "Cosmos dApp",
    href: "https://cosmos.sudostake.com",
    status: "Mainnet",
    description:
      "Borrow USDC against staked ARCH while validator rewards keep compounding.",
    accent: {
      base: "#ff4d00",
      gradient:
        "linear-gradient(135deg, rgba(255,77,0,0.18) 0%, rgba(255,129,74,0.12) 35%, rgba(255,182,153,0.18) 100%)",
      shadow: "shadow-[#ff4d00]/10",
      text: "#ffffff",
    },
  },
  {
    name: "NEAR dApp",
    href: "https://near.sudostake.com",
    status: "Testnet",
    description:
      "Pilot stake-backed NEAR loans and liquidation flows inside a testnet sandbox.",
    accent: {
      base: "#00ed96",
      gradient:
        "linear-gradient(135deg, rgba(0,237,150,0.18) 0%, rgba(58,248,180,0.12) 35%, rgba(156,255,217,0.18) 100%)",
      shadow: "shadow-[#00ed96]/15",
      text: "#063b29",
    },
  },
];

export function NetworkSection() {
  return (
    <section id="apps" className="w-full py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading text-primary-strong dark:text-zinc-100">
            Launch across networks
          </h2>
          <p className="section-subtitle text-secondary-strong/90 dark:text-zinc-400">
            Pick the network that mirrors your validator set; the interface guides you through borrowing,
            lending, or liquidating with steady, predictable confirmations.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {networks.map((network) => (
            <li key={network.name}>
              <a
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${network.name} ${network.status}`}
                className="flex flex-col gap-5 rounded-2xl border border-border-soft bg-surface-glass px-6 py-5 text-left transition hover:border-[color:var(--accent-primary)] hover:bg-white/80 dark:hover:bg-zinc-900/70 dark:border-zinc-800/60 dark:bg-surface-muted"
              >
                <div className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-tertiary-soft dark:text-zinc-400">
                  <span
                    className="inline-flex h-2 w-2 rounded-full"
                    style={{ backgroundColor: network.accent.base }}
                  />
                  {network.status}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-semibold text-primary-strong dark:text-zinc-100">
                    {network.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-secondary-strong/90 dark:text-zinc-400">
                    {network.description}
                  </p>
                </div>
                <span className="text-sm font-semibold text-[color:var(--accent-primary)]">
                  Open {network.name} →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
