import Image from "next/image";
import { BorrowCurrencyHero } from "./components/landing/BorrowCurrencyHero";
import { LogoMark } from "./components/LogoMark";

type Step = {
  title: string;
  description: string;
};

type Network = {
  name: string;
  href: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
};

type SocialLink = {
  name: string;
  href: string;
};

const borrowCurrencies = ["L1 tokens", "USDC", "EURC", "cNGN"];

const steps: Step[] = [
  {
    title: "Vault",
    description:
      "Open a USYC vault on Arc or a staked crypto vault on a supported L1.",
  },
  {
    title: "Fund",
    description:
      "Move collateral in through x402, bridging, or teleportation.",
  },
  {
    title: "Borrow",
    description:
      "Access crypto liquidity, USDC, EURC, or cNGN against that vault.",
  },
];

const networks: Network[] = [
  {
    name: "NEAR",
    href: "https://near.sudostake.com",
    description: "Use staked NEAR as collateral for stablecoin liquidity.",
    logoSrc: "/near-logo.png",
    logoAlt: "NEAR logo",
  },
  {
    name: "Archway",
    href: "https://cosmos.sudostake.com",
    description: "Use staked ARCH as collateral for stablecoin liquidity.",
    logoSrc: "/archway-logo.svg",
    logoAlt: "Archway logo",
  },
  {
    name: "Chihuahua",
    href: "https://cosmos.sudostake.com",
    description: "Use staked HUAHUA as collateral for stablecoin liquidity.",
    logoSrc: "/chihuahua-logo.svg",
    logoAlt: "Chihuahua logo",
  },
];

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/sudostake",
  },
  {
    name: "Telegram",
    href: "https://t.me/sudostake",
  },
  {
    name: "X",
    href: "https://x.com/sudostake",
  },
];

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div id="top" className="app-shell">
      <header className="app-bar">
        <div className="frame app-bar__row">
          <a href="#top" aria-label="SudoStake home" className="brand-link">
            <LogoMark size={32} className="brand-link__mark" />
            <span>SudoStake</span>
          </a>

          <nav className="toolbar-links" aria-label="External links">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="frame page-layout">
        <section className="hero-section">
          <BorrowCurrencyHero currencies={borrowCurrencies} />
        </section>

        <div className="content-grid">
          <section className="content-section" aria-labelledby="flow-title">
            <h2 id="flow-title">Flow</h2>
            <ol className="content-list">
              {steps.map((step, index) => (
                <li key={step.title} className="content-item">
                  <p className="item-index">{index + 1}.</p>
                  <h3>{step.title}</h3>
                  <p className="muted-text">{step.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="content-section" aria-labelledby="networks-title">
            <h2 id="networks-title">Networks</h2>
            <ul className="content-list network-list">
              {networks.map((network) => (
                <li key={network.name} className="content-item network-item">
                  <div className="network-summary-item">
                    <span className="network-logo">
                      <Image
                        src={network.logoSrc}
                        alt={network.logoAlt}
                        width={32}
                        height={32}
                        className="network-logo__image"
                      />
                    </span>
                    <div className="network-copy">
                      <h3>{network.name}</h3>
                      <p className="muted-text">{network.description}</p>
                    </div>
                  </div>
                  <p>
                    <a
                      className="network-action"
                      href={network.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Launch {network.name}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <div className="frame app-footer__row">
          <div className="brand-link">
            <LogoMark size={28} className="brand-link__mark brand-link__mark--small" ariaLabel="SudoStake mark" />
            <span>SudoStake</span>
          </div>

          <p>Copyright {currentYear} SudoStake.</p>
        </div>
      </footer>
    </div>
  );
}
