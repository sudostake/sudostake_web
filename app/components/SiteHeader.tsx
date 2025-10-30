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
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-zinc-900 transition-colors dark:text-zinc-100">
          SudoStake
        </span>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-full border border-zinc-300/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-700/70 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-400 sm:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          Menu
        </button>
        <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-700 transition-colors dark:text-zinc-300 sm:flex">
          {navLinks.map(({ label, href, external, ariaLabel }) => (
            <a
              key={href}
              href={href}
              className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={ariaLabel}
            >
              {label}
            </a>
          ))}
        </nav>
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
