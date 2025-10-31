"use client";

import { useEffect, useRef, useState } from "react";

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
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const setNavHeight = () => {
      const height = el.offsetHeight || 56;
      document.documentElement.style.setProperty("--nav-height", `${height}px`);
    };

    setNavHeight();

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(setNavHeight) : null;
    if (observer) observer.observe(el);
    window.addEventListener("resize", setNavHeight);

    return () => {
      window.removeEventListener("resize", setNavHeight);
      if (observer) observer.disconnect();
    };
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/55 transition dark:border-white/10 dark:bg-zinc-950/70 dark:supports-[backdrop-filter]:bg-zinc-950/50">
        <div
          ref={navRef}
          className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-1.5 px-4 py-1.5 sm:flex-nowrap sm:justify-between sm:px-6 sm:py-2.5 lg:px-8"
        >
          <div className="flex flex-1 items-center gap-2 sm:gap-4">
            <a
              href="#top"
              className="inline-flex items-center gap-2 whitespace-nowrap text-xl font-bold text-zinc-900 transition hover:text-[color:var(--accent-primary)] dark:text-zinc-100 dark:hover:text-[color:var(--accent-primary)]"
              aria-label="SudoStake home"
            >
              <span>SudoStake</span>
              <span
                aria-hidden
                className="relative inline-flex h-2.5 w-2.5 flex-shrink-0 items-center justify-center"
              >
                <span className="absolute inset-0 inline-flex rounded-full bg-accent-primary/45 animate-pulse-glow" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-primary shadow-[0_0_12px_rgba(30,77,217,0.45)]" />
              </span>
            </a>
          </div>
          <div className="ml-auto flex items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-9 items-center justify-center rounded-full border border-zinc-300/80 px-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-700/70 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-400 sm:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              Menu
            </button>
            <nav className="hidden items-center gap-3 text-sm font-medium text-secondary-text transition dark:text-zinc-300 sm:flex">
              {navLinks.map(({ label, href, external, ariaLabel }) => (
                <a
                  key={href}
                  href={href}
                  className="transition hover:text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[color:var(--accent-primary)] dark:hover:text-[color:var(--accent-primary)]"
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
      </header>
      <div aria-hidden="true" style={{ height: "var(--nav-height, 56px)" }} />
      {menuOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-zinc-200/70 bg-white/95 px-4 py-3 text-sm text-zinc-700 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950/95 dark:text-zinc-200 sm:hidden"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3">
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
    </>
  );
}
