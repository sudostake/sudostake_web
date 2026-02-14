import { LogoMark } from "./LogoMark";

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
};

const navLinks: NavLink[] = [
  { label: "Overview", href: "#how-it-works" },
  { label: "Apps", href: "#apps" },
  { label: "Resources", href: "#resources" },
  { label: "GitHub", href: "https://github.com/sudostake", external: true },
];

export function SiteHeader() {
  return (
    <header className="nav-panel sticky top-0 z-50">
      <div className="flex w-full items-center gap-3 px-5 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="mr-auto inline-flex items-center gap-3 text-xl font-bold text-[color:var(--foreground)] transition hover:text-[color:var(--accent-primary)]"
          aria-label="SudoStake home"
        >
          <LogoMark size={34} className="h-9 w-9 flex-none" />
          <span>SudoStake</span>
        </a>

        <nav className="hidden items-center gap-3 text-sm font-medium text-[color:var(--text-secondary)] sm:flex">
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
          <a
            href="#apps"
            className="btn-primary inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition"
          >
            Open app
          </a>
        </nav>

        <a
          href="#apps"
          className="btn-primary inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition sm:hidden"
        >
          Open app
        </a>
      </div>
    </header>
  );
}
