const roles = [
  {
    title: "For stakers",
    description: "Borrow USDC while your delegated stake keeps compounding.",
  },
  {
    title: "For lenders",
    description: "Match with vaults, lock in terms, and earn on secured loans.",
  },
];

const highlights = [
  "Archway mainnet: borrow against ARCH without unstaking.",
  "Loans run on fixed rates and LTV—agreed before funds move.",
  "NEAR + AI agent: live on testnet, mainnet next.",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/95 px-4 py-16 shadow-lg shadow-zinc-950/5 transition dark:border-zinc-800/70 dark:bg-zinc-950/70 sm:px-10">
      <div className="absolute inset-0 -z-10 opacity-80 blur-3xl saturate-150 [background:radial-gradient(circle_at_top_left,_rgba(30,77,217,0.18)_0%,_rgba(30,77,217,0)_60%)] dark:opacity-60" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 text-center sm:text-left">
        <div className="space-y-6">
          <span className="inline-flex w-fit items-center justify-center rounded-full border border-[#1e4dd9]/50 bg-[#1e4dd9]/10 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#1e4dd9] dark:border-[#4d73eb]/60 dark:bg-[#1e4dd9]/15 dark:text-[#7c97f5]">
            Peer to peer
          </span>
          <h1 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Peer-to-peer vaults for L1 stakers, matched with lenders.
          </h1>
          <p className="text-pretty mx-auto max-w-2xl text-base text-zinc-600 dark:text-zinc-400 sm:mx-0 sm:text-lg">
            Stake once, stay delegated, and tap USDC directly from matched peer
            lenders.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#apps"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-[#1e4dd9]/60 bg-white/95 px-6 py-3.5 text-base font-semibold text-[#1e4dd9] shadow-md shadow-[#1e4dd9]/20 transition duration-200 hover:-translate-y-0.5 hover:border-[#193ec7] hover:bg-[#1e4dd9] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e4dd9] sm:w-auto dark:border-[#4d73eb]/60 dark:bg-transparent dark:text-[#4d73eb] dark:hover:border-[#4d73eb] dark:hover:bg-[#1e4dd9] dark:hover:text-white"
              >
                Explore Apps
                <span aria-hidden className="transition group-hover:translate-y-0.5">
                  &darr;
                </span>
              </a>
              <a
                href="https://github.com/sudostake"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200/80 px-6 py-3.5 text-sm font-semibold text-zinc-600 transition duration-200 hover:-translate-y-0.5 hover:border-[#1e4dd9] hover:text-[#1e4dd9] dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-[#4d73eb] dark:hover:text-[#7c97f5]"
              >
                View Docs
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {roles.map((role) => (
            <article
              key={role.title}
              className="rounded-3xl border border-zinc-200 bg-white p-6 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/80"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                {role.title}
              </h3>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                {role.description}
              </p>
            </article>
          ))}
        </div>

        <aside className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg shadow-[#1e4dd9]/15 dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/40">
          <div className="absolute inset-0 -z-10 opacity-70 blur-3xl [background:radial-gradient(circle_at_center,_rgba(30,77,217,0.16)_0%,_rgba(30,77,217,0)_70%)] dark:opacity-50" />
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1e4dd9] dark:text-[#4f73ef]">
            Live today
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Validator-backed liquidity without giving up custody.
          </h2>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Launch peer-to-peer vaults on Archway and NEAR to keep staking rewards
            compounding while connecting directly with USDC lenders.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-2xl border border-zinc-200/70 bg-white/80 px-4 py-3 dark:border-zinc-800/70 dark:bg-zinc-900/70"
              >
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1e4dd9]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
