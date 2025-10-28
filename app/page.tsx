import { HeroSection } from "./components/HeroSection";
import { NetworkSection } from "./components/NetworkSection";
import { SiteHeader } from "./components/SiteHeader";

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(30,77,217,0.12)_0%,_rgba(255,255,255,0)_55%),radial-gradient(circle_at_bottom,_rgba(0,237,150,0.12)_0%,_rgba(255,255,255,0)_50%)] text-zinc-900 antialiased dark:bg-[radial-gradient(circle_at_top,_rgba(30,77,217,0.18)_0%,_rgba(0,0,0,0)_55%),radial-gradient(circle_at_bottom,_rgba(0,237,150,0.18)_0%,_rgba(0,0,0,0)_50%)] dark:text-zinc-100">
      <SiteHeader />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 pb-24 pt-28 sm:gap-16 sm:px-8 md:px-16">
        <HeroSection />
        <NetworkSection />
      </main>

      <footer className="border-t border-zinc-200/60 bg-white/70 py-8 text-center text-xs uppercase tracking-[0.25em] text-zinc-500/90 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/70 dark:text-zinc-400/90">
        Validator-grade infrastructure for borrowing across chains
      </footer>
    </div>
  );
}
