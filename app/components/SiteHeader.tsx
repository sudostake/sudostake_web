"use client";

import { useEffect, useRef, useState } from "react";

import { LogoMark } from "./LogoMark";

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
    label: "X",
    href: "https://x.com/sudostake",
    external: true,
    ariaLabel: "Open SudoStake on X in a new tab",
  },
];

const MENU_ANIMATION_DURATION = 220;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);
  const [navState, setNavState] = useState<"open" | "closed">("closed");
  const navRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

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

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      setRenderMenu(true);
      setNavState("closed");
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        setNavState("open");
        animationFrameRef.current = null;
      });

      return () => {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };
    }

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setNavState("closed");
    return undefined;
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen && renderMenu) {
      const timeout = setTimeout(() => {
        setRenderMenu(false);
      }, MENU_ANIMATION_DURATION);

      return () => {
        clearTimeout(timeout);
      };
    }

    return undefined;
  }, [menuOpen, renderMenu]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header
        className="nav-panel fixed left-0 right-0 top-0 transition"
        style={{ zIndex: "var(--z-nav, 50)" }}
      >
        <div
          ref={navRef}
          className="flex w-full flex-wrap items-center gap-x-2 gap-y-1.5 px-4 py-1.5 sm:flex-nowrap sm:justify-between sm:px-6 sm:py-2.5 lg:px-8"
        >
          <div className="flex flex-1 items-center gap-2 sm:gap-4">
            <a
              href="#top"
              className="inline-flex items-center gap-3 whitespace-nowrap text-xl font-bold text-[color:var(--foreground)] transition hover:text-[color:var(--accent-primary)]"
              aria-label="SudoStake home"
            >
              <LogoMark size={34} className="h-9 w-9 flex-none rounded-[12px]" />
              <span>SudoStake</span>
            </a>
          </div>
          <div className="ml-auto flex items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-9 items-center justify-center rounded-full border border-[color:var(--border)] px-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--text-secondary)] transition hover:border-[color:var(--accent-primary)] hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-primary)] sm:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              Menu
            </button>
            <nav className="hidden items-center gap-3 text-sm font-medium text-[color:var(--text-secondary)] transition sm:flex">
              {navLinks.map(({ label, href, external, ariaLabel }) => (
                <a
                  key={href}
                  href={href}
                  className="transition hover:text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[color:var(--accent-primary)]"
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
      {renderMenu ? (
        <nav
          id="mobile-nav"
          className="nav-panel-mobile fixed inset-x-0 px-4 py-3 text-sm text-[color:var(--text-secondary)] shadow-sm sm:hidden nav-entry"
          style={{
            top: "var(--nav-height, 56px)",
            zIndex: "calc(var(--z-nav, 50) + 1)",
            maxHeight: "calc(100vh - var(--nav-height, 56px))",
            overflowY: "auto",
          }}
          data-state={navState}
          aria-hidden={!menuOpen}
        >
          <div className="flex w-full flex-col gap-3 px-1">
            {navLinks.map(({ label, href, external, ariaLabel }) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center justify-between rounded-lg border px-3 py-2 text-[color:var(--text-secondary)] transition hover:border-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary)]"
                style={{
                  borderColor: "color-mix(in oklab, var(--panel-border), transparent 8%)",
                  backgroundColor: "color-mix(in oklab, var(--surface), transparent 4%)",
                  boxShadow: "0 10px 28px -20px color-mix(in srgb, var(--foreground) 0.45, transparent)",
                }}
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
