import { HeroSection } from "./components/HeroSection";
import { NetworkSection } from "./components/NetworkSection";
import { SiteHeader } from "./components/SiteHeader";

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[radial-gradient(circle_at_top,_var(--accent-subtle)_0%,_rgba(255,255,255,0)_55%),radial-gradient(circle_at_bottom,_rgba(0,237,150,0.08)_0%,_rgba(255,255,255,0)_50%)] text-primary-strong antialiased dark:bg-[radial-gradient(circle_at_top,_rgba(30,77,217,0.18)_0%,_rgba(0,0,0,0)_55%),radial-gradient(circle_at_bottom,_rgba(0,237,150,0.18)_0%,_rgba(0,0,0,0)_50%)] dark:text-zinc-100">
      <SiteHeader />

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-14 px-5 pb-28 pt-28 sm:gap-16 sm:px-6 lg:gap-20">
        <HeroSection />
        <NetworkSection />
      </main>

      <footer className="border-t border-soft bg-surface-glass py-8 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/80">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-5 text-center text-xs uppercase tracking-[0.3em] text-tertiary-soft sm:px-6 dark:text-zinc-400/90">
          <span>Validator-native liquidity rails for cross-chain borrowing</span>
          <nav className="flex flex-wrap items-center justify-center gap-4 text-[0.7rem] tracking-[0.2em]">
            <a href="https://github.com/sudostake" target="_blank" rel="noopener noreferrer" className="transition hover:text-[color:var(--accent-primary)] dark:hover:text-[#7c97f5]">
              GitHub
            </a>
            <a href="https://github.com/sudostake" target="_blank" rel="noopener noreferrer" className="transition hover:text-[color:var(--accent-primary)] dark:hover:text-[#7c97f5]">
              Docs
            </a>
            <a href="https://twitter.com/sudostake" target="_blank" rel="noopener noreferrer" className="transition hover:text-[color:var(--accent-primary)] dark:hover:text-[#7c97f5]">
              X
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
