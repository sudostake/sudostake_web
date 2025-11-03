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
    name: "Archway dApp",
    href: "https://sudostake-web-cosmos--sudostake.us-east4.hosted.app",
    status: "Mainnet",
    description:
      "Borrow USDC against staked ARCH without interrupting validator rewards.",
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
      "Simulate stake-backed NEAR loans and liquidation flows on testnet.",
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
    <section id="apps" className="w-full pt-10 pb-0 sm:pt-12 sm:pb-0 lg:pt-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <h2 className="text-pretty text-3xl font-semibold leading-tight text-primary-strong sm:text-4xl dark:text-zinc-100">
          Explore Apps
        </h2>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {networks.map((network) => (
            <li key={network.name} className="group">
              <a
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${network.name} ${network.status}`}
                className="relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-[color:var(--border-soft)] bg-white/92 px-6 py-6 text-left shadow-[0_32px_60px_-48px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:shadow-[0_42px_80px_-45px_rgba(15,23,42,0.6)] dark:border-zinc-800/70 dark:bg-zinc-950/75 sm:px-7 sm:py-7"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1.5 opacity-90 transition group-hover:opacity-100"
                  style={{ background: network.accent.gradient }}
                />
                <div className="relative flex flex-col gap-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-tertiary-soft dark:text-zinc-400">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-zinc-700 shadow-sm ring-1 ring-inset ring-white/60 backdrop-blur dark:bg-zinc-900/70 dark:text-zinc-200">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: network.accent.base }}
                      />
                      {network.status}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-semibold text-primary-strong dark:text-zinc-100">
                      {network.name}
                    </h3>
                    <p className="text-sm text-secondary-strong/90 dark:text-zinc-400">
                      {network.description}
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-between pt-1">
                  <span className="inline-flex items-center gap-2 rounded-full border border-transparent bg-white/80 px-4 py-2 text-sm font-semibold text-secondary-strong transition group-hover:border-[color:var(--accent-primary)] group-hover:text-[color:var(--accent-primary)] dark:bg-zinc-900/70 dark:text-zinc-200">
                    Open app
                  </span>
                  <span
                    aria-hidden
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-base font-semibold text-secondary-strong transition group-hover:translate-x-1 group-hover:text-[color:var(--accent-primary)] dark:bg-zinc-900/70 dark:text-zinc-200"
                  >
                    →
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
