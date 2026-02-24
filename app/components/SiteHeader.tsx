import { LogoMark } from "./LogoMark";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Apps", href: "#apps" },
  { label: "Resources", href: "#resources" },
];

export function SiteHeader() {
  return (
    <header className="nav-panel sticky top-0 z-50">
      <div className="flex w-full items-center gap-3 px-5 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="mr-auto inline-flex items-center gap-3 text-lg font-bold text-[color:var(--foreground)] transition hover:text-[color:var(--accent-primary)] sm:text-xl"
          aria-label="SudoStake home"
        >
          <LogoMark size={34} className="h-9 w-9 flex-none rounded-full" />
          <span>SudoStake</span>
        </a>

        <nav className="flex items-center gap-3 text-xs font-medium text-[color:var(--text-secondary)] sm:gap-4 sm:text-sm">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="transition hover:text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[color:var(--accent-primary)]"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
