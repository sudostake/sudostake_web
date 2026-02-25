type LaunchLink = {
  label: string;
  href: string;
};

const launchLinks: LaunchLink[] = [
  { label: "Cosmos", href: "https://cosmos.sudostake.com" },
  { label: "NEAR", href: "https://near.sudostake.com" },
  { label: "GitHub", href: "https://github.com/sudostake" },
];

export function HeroSection() {
  return (
    <section id="how-it-works" className="w-full py-10 sm:py-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 sm:gap-8">
        <h1 className="pixel-hero max-w-5xl text-[1rem] font-normal text-[color:var(--text-primary)] sm:text-[1.32rem] lg:text-[1.62rem]">
          Earn from staking.
          <span className="block">Trade anytime.</span>
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          {launchLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-card surface-card inline-flex items-center gap-2 px-3 py-2 text-[color:var(--text-primary)]"
              aria-label={`Go to ${link.label}`}
            >
              <span className="pixel-heading text-[0.66rem]">{link.label}</span>
              <span className="pixel-heading text-[0.58rem] text-[color:var(--accent-primary)]">-&gt;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
