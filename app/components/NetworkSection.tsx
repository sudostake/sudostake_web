type Network = {
  name: string;
  description: string;
  bullets: string[];
  href: string;
  accent: {
    base: string;
    gradient: string;
    shadow: string;
  };
};

const networks: Network[] = [
  {
    name: "Archway DApp",
    description: "Stake ARCH, borrow USDC. Mainnet ready.",
    bullets: [
      "Keep ARCH staked while unlocking USDC liquidity.",
      "Agree on LTV and repayment once, draw instantly.",
    ],
    href: "https://sudostake-web-cosmos--sudostake.us-east4.hosted.app",
    accent: {
      base: "#ff4d00",
      gradient:
        "linear-gradient(135deg, rgba(255,77,0,0.25) 0%, rgba(255,129,74,0.18) 35%, rgba(255,182,153,0.25) 100%)",
      shadow: "shadow-[#ff4d00]/15",
    },
  },
  {
    name: "NEAR DApp",
    description: "Stake NEAR, borrow USDC. Live on testnet.",
    bullets: [
      "Borrow against delegated NEAR without unstaking.",
      "Try the AI agent now; mainnet is on the roadmap.",
    ],
    href: "https://sudostake-web-near--sudostake.us-east4.hosted.app",
    accent: {
      base: "#00ed96",
      gradient:
        "linear-gradient(135deg, rgba(0,237,150,0.25) 0%, rgba(58,248,180,0.18) 35%, rgba(156,255,217,0.25) 100%)",
      shadow: "shadow-[#00ed96]/20",
    },
  },
];

export function NetworkSection() {
  return (
    <section id="apps" className="space-y-8">
      <div className="space-y-2 text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
          Multichain dapps
        </span>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Choose the network that matches your validators.
        </h2>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Each app mirrors the same borrowing and lending flow, optimized for the
          collateral you already manage.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {networks.map((network) => (
          <a
            key={network.name}
            href={network.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white/90 p-6 text-left shadow-lg ${network.accent.shadow} transition duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/40`}
          >
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div
                className="absolute inset-0"
                style={{ background: network.accent.gradient }}
              />
            </div>
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <span
                  className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em]"
                  style={{
                    borderColor: `${network.accent.base}66`,
                    backgroundColor: `${network.accent.base}1a`,
                    color: network.accent.base,
                  }}
                >
                  {network.name.split(" ")[0]}
                </span>
                <h3 className="text-2xl font-semibold">{network.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {network.description}
                </p>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {network.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2"
                    >
                      <span
                        className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: network.accent.base }}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <span
                className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-base font-semibold text-white transition duration-200 group-hover:-translate-y-0.5 group-hover:brightness-95"
                style={{ backgroundColor: network.accent.base }}
              >
                Open {network.name}
                <span aria-hidden>&rarr;</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
