export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 z-40 w-full border-b border-zinc-200/70 bg-white/85 backdrop-blur-lg transition duration-200 ease-out dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3 sm:px-6">
        <div className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-700 transition-colors duration-200 dark:text-zinc-100">
          SudoStake
        </div>
        <nav>
          <a
            href="#apps"
            className="inline-flex items-center justify-center rounded-full bg-[#1e4dd9] px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-[#193ec7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e4dd9]"
          >
            Explore Apps
          </a>
        </nav>
      </div>
    </header>
  );
}
