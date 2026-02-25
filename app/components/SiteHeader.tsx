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
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="pixel-heading mr-auto inline-flex items-center gap-3 text-[0.62rem] text-[color:var(--foreground)] sm:text-[0.68rem]"
          aria-label="SudoStake home"
        >
          <LogoMark
            size={34}
            className="h-9 w-9 flex-none border-2 border-[color:var(--panel-border)] bg-[color:var(--surface-muted)] p-1"
          />
          <span>SudoStake</span>
        </a>

        <nav className="flex items-center gap-1 text-[0.56rem] text-[color:var(--text-secondary)] sm:gap-2 sm:text-[0.62rem]">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="pixel-link focus-soft text-[color:var(--text-secondary)] hover:text-[color:var(--accent-primary)]"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
