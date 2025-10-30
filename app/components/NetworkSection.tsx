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
    <section id="apps" className="w-full py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--border-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-tertiary-soft dark:border-zinc-700/70">
            Apps across networks
          </span>
          <h2 className="text-pretty text-3xl font-semibold leading-tight text-primary-strong sm:text-4xl dark:text-zinc-100">
            Apps you can use today.
          </h2>
        </div>

        <ul className="flex flex-col">
          {networks.map((network) => (
            <li
              key={network.name}
              className="border-t border-[color:var(--border-strong)] py-5 first:border-t-0 first:pt-0 dark:border-zinc-800/80"
            >
              <a
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${network.name} ${network.status}`}
                className="flex flex-col gap-4 text-left transition hover:text-primary-strong sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-tertiary-soft dark:text-zinc-400">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: network.accent.base }}
                      />
                      {network.status}
                    </span>
                    <span>{network.name.split(" ")[0]}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary-strong dark:text-zinc-100">
                    {network.name}
                  </h3>
                  <p className="text-sm text-secondary-strong/90 dark:text-zinc-400">
                    Delegated stake backs quick loans for {network.name.split(" ")[0]} staking.
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-2 text-sm font-semibold transition"
                  style={{ color: network.accent.base }}
                >
                  Open App
                  <span aria-hidden className="text-base">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
