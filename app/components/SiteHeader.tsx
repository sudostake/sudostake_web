export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-zinc-900 transition-colors dark:text-zinc-100">
          SudoStake
        </span>
        <nav className="flex items-center gap-4 text-sm font-medium text-zinc-700 transition-colors dark:text-zinc-300">
          <a
            href="https://github.com/sudostake"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            GitHub
          </a>
          <a
            href="https://github.com/sudostake/sudostake_web_near/tree/main/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Docs
          </a>
        </nav>
      </div>
    </header>
  );
}
