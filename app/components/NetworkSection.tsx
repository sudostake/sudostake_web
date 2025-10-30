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
    href: "https://sudostake-web-near--sudostake.us-east4.hosted.app",
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
    <section id="apps" className="w-full py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
        <h2 className="text-pretty text-3xl font-semibold leading-tight text-primary-strong sm:text-4xl dark:text-zinc-100">
          Apps you can use today.
        </h2>

        <ul className="flex flex-col gap-5">
          {networks.map((network) => (
            <li
              key={network.name}
              className="group relative overflow-hidden rounded-3xl border border-[color:var(--border-strong)] bg-white/85 shadow-soft-elevated transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)] dark:border-zinc-800/75 dark:bg-zinc-950/70"
            >
              <a
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${network.name} ${network.status}`}
                className="flex h-full flex-col gap-6 px-5 py-6 transition sm:px-6 sm:py-7 lg:px-8"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-80 transition group-hover:opacity-100"
                  style={{ background: network.accent.gradient }}
                />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-tertiary-soft dark:text-zinc-400">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-zinc-700 shadow-sm ring-1 ring-inset ring-white/60 backdrop-blur dark:bg-zinc-900/60 dark:text-zinc-200">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: network.accent.base }}
                        />
                        {network.status}
                      </span>
                      <span className="text-zinc-600 dark:text-zinc-300">
                        {network.name.split(" ")[0]} network
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-primary-strong dark:text-zinc-100">
                      {network.name}
                    </h3>
                    <p className="text-sm text-secondary-strong/90 dark:text-zinc-400">
                      {network.description}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-2 rounded-full border border-current px-4 py-2 text-sm font-semibold transition group-hover:translate-x-1"
                    style={{ color: network.accent.base }}
                  >
                    Open app
                    <span aria-hidden className="text-base">→</span>
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
