 "use client";

import { useState } from "react";

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
};

const navLinks: NavLink[] = [
  { label: "Apps", href: "#apps" },
  { label: "Resources", href: "#resources" },
  { label: "GitHub", href: "https://github.com/sudostake", external: true },
  {
    label: "Docs",
    href: "https://github.com/sudostake/sudostake_web_near/tree/main/docs",
    external: true,
  },
  {
    label: "X",
    href: "https://x.com/sudostake",
    external: true,
    ariaLabel: "Open SudoStake on X in a new tab",
  },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-white/75 backdrop-blur-xl transition dark:bg-zinc-950/80">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 font-display text-sm font-semibold uppercase tracking-[0.32em] text-zinc-900 transition hover:text-[color:var(--accent-primary)] dark:text-zinc-100 dark:hover:text-[color:var(--accent-primary)]"
          aria-label="SudoStake home"
        >
          <span
            aria-hidden
            className="relative inline-flex h-2.5 w-2.5"
          >
            <span className="absolute inset-0 inline-flex rounded-full bg-accent-primary/45 animate-pulse-glow" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-primary shadow-[0_0_12px_rgba(30,77,217,0.45)]" />
          </span>
          SudoStake
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-full border border-zinc-300/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-700/70 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-400 sm:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          Menu
        </button>
        <div className="hidden items-center gap-6 sm:flex">
          <nav className="flex items-center gap-4 text-sm font-medium text-zinc-600 transition dark:text-zinc-300">
            {navLinks.map(({ label, href, external, ariaLabel }) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-2 py-1 transition hover:text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent-primary)] dark:hover:text-[color:var(--accent-primary)]"
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={ariaLabel}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {menuOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-zinc-200/70 bg-white/95 px-5 py-4 text-sm text-zinc-700 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950/95 dark:text-zinc-200 sm:hidden"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3">
            {navLinks.map(({ label, href, external, ariaLabel }) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center justify-between rounded-lg border border-transparent px-3 py-2 transition hover:border-zinc-200 hover:bg-zinc-100/70 hover:text-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80 dark:hover:text-zinc-100"
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={ariaLabel}
                onClick={handleNavClick}
              >
                {label}
                <span
                  aria-hidden
                  className="text-xs font-semibold uppercase tracking-[0.25em]"
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
