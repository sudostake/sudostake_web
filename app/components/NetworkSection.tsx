type Network = {
  name: string;
  href: string;
  status: string;
  accent: {
    base: string;
    gradient: string;
    shadow: string;
    text: string;
  };
};

const networks: Network[] = [
  {
    name: "Archway dApp",
    href: "https://sudostake-web-cosmos--sudostake.us-east4.hosted.app",
    status: "Mainnet",
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
    href: "https://sudostake-web-near--sudostake.us-east4.hosted.app",
    status: "Testnet",
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
    <section id="apps" className="w-full py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--border-strong)] bg-surface-muted/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-tertiary-soft dark:border-zinc-700/70 dark:bg-zinc-900/60">
              Apps across networks
            </span>
            <h2 className="text-pretty text-3xl font-semibold leading-tight text-primary-strong sm:text-4xl dark:text-zinc-100">
              Launch validator-first liquidity wherever your community stakes.
            </h2>
          </div>
          <p className="max-w-md text-sm text-secondary-strong/90 dark:text-zinc-400">
            Each deployment balances delegator rewards, underwriting capital,
            and liquidation coverage. Pick the stack that matches your validator
            footprint and open the rails instantly.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {networks.map((network) => (
            <a
              key={network.name}
              href={network.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${network.name} ${network.status}`}
              className={`group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[32px] border border-soft bg-surface-primary px-7 py-8 text-left shadow-sm ${network.accent.shadow} transition duration-200 hover:-translate-y-1 hover:border-[color:var(--accent-primary)] hover:bg-accent-subtle/70 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-800/70 dark:bg-zinc-900/80 dark:shadow-black/40`}
            >
              <div
                className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
                style={{ background: network.accent.gradient }}
              />
              <div className="relative flex flex-col gap-6">
                <div className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-tertiary-soft dark:text-zinc-400">
                  <span className="inline-flex items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: network.accent.base }}
                    />
                    {network.status}
                  </span>
                  <span>{network.name.split(" ")[0]}</span>
                </div>
                <h3 className="text-2xl font-semibold text-primary-strong dark:text-zinc-100">
                  {network.name}
                </h3>
                <p className="text-sm text-secondary-strong/90 dark:text-zinc-400">
                  Delegated vaults, instant credit lines, and orderly unwind
                  mechanics tuned to {network.name.split(" ")[0]} validators.
                </p>
              </div>

              <div className="relative">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition group-hover:-translate-y-0.5 group-hover:brightness-95 motion-reduce:transform-none motion-reduce:transition-none"
                  style={{
                    backgroundColor: network.accent.base,
                    color: network.accent.text,
                  }}
                >
                  Open App
                  <span aria-hidden>&rarr;</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
