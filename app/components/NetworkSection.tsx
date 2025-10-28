type Network = {
  name: string;
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
    href: "https://sudostake-web-cosmos--sudostake.us-east4.hosted.app",
    accent: {
      base: "#ff4d00",
      gradient:
        "linear-gradient(135deg, rgba(255,77,0,0.18) 0%, rgba(255,129,74,0.12) 35%, rgba(255,182,153,0.18) 100%)",
      shadow: "shadow-[#ff4d00]/10",
    },
  },
  {
    name: "NEAR DApp",
    href: "https://sudostake-web-near--sudostake.us-east4.hosted.app",
    accent: {
      base: "#00ed96",
      gradient:
        "linear-gradient(135deg, rgba(0,237,150,0.18) 0%, rgba(58,248,180,0.12) 35%, rgba(156,255,217,0.18) 100%)",
      shadow: "shadow-[#00ed96]/15",
    },
  },
];

export function NetworkSection() {
  return (
    <section id="apps" className="w-full">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 sm:px-6">
        <div className="space-y-2 text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
            Apps across networks
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {networks.map((network) => (
            <a
              key={network.name}
              href={network.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/95 p-6 text-left shadow-sm ${network.accent.shadow} transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800/70 dark:bg-zinc-900/80 dark:shadow-black/40`}
            >
              <div
                className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
                style={{ background: network.accent.gradient }}
              />
              <div className="relative flex flex-col gap-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: network.accent.base }}
                    />
                    {network.name.split(" ")[0]}
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {network.name}
                  </h3>
                </div>
                <div className="relative">
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white transition group-hover:-translate-y-0.5 group-hover:brightness-95"
                    style={{ backgroundColor: network.accent.base }}
                  >
                    Open App
                    <span aria-hidden>&rarr;</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
