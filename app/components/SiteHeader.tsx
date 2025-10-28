export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 z-40 w-full border-b border-zinc-200/70 bg-white/85 backdrop-blur-lg transition duration-200 ease-out dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 md:px-16">
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-700 transition-colors duration-200 dark:text-zinc-100">
          SudoStake
        </div>
        <nav className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <a
            href="#apps"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-[#1e4dd9]/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-[#1e4dd9] shadow-sm shadow-[#1e4dd9]/20 transition hover:-translate-y-1 hover:border-[#193ec7] hover:bg-[#1e4dd9] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e4dd9] sm:w-auto sm:min-w-[12rem] sm:px-6 whitespace-nowrap dark:border-[#4d73eb]/70 dark:bg-transparent dark:text-[#4d73eb] dark:hover:border-[#4d73eb] dark:hover:bg-[#1e4dd9] dark:hover:text-white"
          >
            Explore Apps
            <span aria-hidden className="transition group-hover:translate-y-0.5">
              &darr;
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
