const roles = [
  {
    title: "Vault Owners",
    description:
      "Borrow USDC while your stake keeps earning.",
  },
  {
    title: "Liquidity Providers",
    description:
      "Lend USDC to earn steady interest or exercise liquidation rights.",
  },
];

export function HeroSection() {
  return (
    <section className="w-full mt-16 sm:mt-20 md:mt-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="section-shell relative overflow-hidden bg-white/70 px-6 py-10 shadow-soft-elevated backdrop-blur-2xl dark:bg-zinc-950/55 sm:px-8 lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute -left-28 -top-24 h-64 w-64 rounded-full bg-(--accent-primary)/18 blur-3xl sm:-left-32 sm:-top-32 sm:h-72 sm:w-72" />
          <div className="pointer-events-none absolute -bottom-28 -right-16 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl sm:h-80 sm:w-80 dark:bg-emerald-300/10" />

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 text-left">
              <h1 className="text-pretty text-4xl font-semibold leading-[1.05] tracking-tight text-primary-strong sm:text-5xl lg:text-[3.6rem]">
                Earn from staking, trade anytime.
              </h1>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="#apps"
                className="inline-flex w-full items-center justify-center rounded-full bg-accent-primary px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_-20px_rgba(30,77,217,0.65)] transition hover:-translate-y-0.5 hover:bg-accent-primary-hover hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary focus-visible:text-white sm:w-auto"
                  style={{ color: "#ffffff" }}
                >
                  Explore Apps
                </a>
                <a
                  href="https://github.com/sudostake/sudostake_web_near/tree/main/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-border-strong bg-white/70 px-7 py-3 text-sm font-semibold text-secondary-strong transition hover:-translate-y-0.5 hover:border-accent-primary hover:text-accent-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary sm:w-auto dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-300"
                >
                  View Docs
                </a>
              </div>
            </div>

            <div className="relative flex flex-col gap-6 rounded-3xl border border-border-soft bg-white/85 px-6 py-6 shadow-[0_32px_60px_-45px_rgba(15,23,42,0.55)] backdrop-blur dark:border-zinc-800/65 dark:bg-zinc-950/65">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-tertiary-soft dark:text-zinc-400">
                Who it&apos;s for
              </span>
              <div className="grid gap-4 sm:grid-cols-2">
                {roles.map((role) => (
                  <div
                    key={role.title}
                    className="rounded-2xl border border-transparent bg-white/80 p-4 shadow-[0_18px_35px_-30px_rgba(15,23,42,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_55px_-38px_rgba(15,23,42,0.5)] dark:bg-zinc-900/70"
                  >
                    <h3 className="text-sm font-semibold text-primary-strong dark:text-zinc-100">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-sm text-secondary-strong/90 dark:text-zinc-400">
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
