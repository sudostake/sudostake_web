import Image from "next/image";
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

const steps: Step[] = [
  {
    title: "Create a vault",
    description: "Choose a supported network and open a vault for the asset you want to use.",
  },
  {
    title: "Deposit and stake",
    description: "Deposit tokens into the vault and keep them staked while rewards continue accruing.",
  },
  {
    title: "Borrow USDC",
    description: "Use the staked position as collateral when you need liquidity.",
  },
];

const networks: Network[] = [
  {
    name: "NEAR",
    href: "https://near.sudostake.com",
    description: "Borrow against staked NEAR.",
    logoSrc: "/near-logo.png",
    logoAlt: "NEAR logo",
  },
  {
    name: "Archway",
    href: "https://cosmos.sudostake.com",
    description: "Borrow against staked ARCH.",
    logoSrc: "/archway-logo.svg",
    logoAlt: "Archway logo",
  },
  {
    name: "Chihuahua",
    href: "https://cosmos.sudostake.com",
    description: "Borrow against staked HUAHUA.",
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
        <fieldset className="panel panel--hero">
          <legend>Overview</legend>
          <div className="hero-copy">
            <h1>Borrow USDC with staked assets.</h1>
            <p>
              Open a vault on a supported network, deposit your tokens, keep them
              staked, and borrow against that position when you need liquidity.
            </p>
          </div>
        </fieldset>

        <div className="panel-grid">
          <fieldset className="panel">
            <legend>How it works</legend>
            <ol className="panel-list">
              {steps.map((step, index) => (
                <li key={step.title} className="panel-item">
                  <p className="item-index">{index + 1}.</p>
                  <h3>{step.title}</h3>
                  <p className="muted-text">{step.description}</p>
                </li>
              ))}
            </ol>
          </fieldset>

          <fieldset className="panel">
            <legend>Networks</legend>
            <ul className="panel-list">
              {networks.map((network) => (
                <li key={network.name} className="panel-item panel-item--network">
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
                    <div>
                      <h3>{network.name}</h3>
                      <p className="muted-text">{network.description}</p>
                    </div>
                  </div>
                  <p>
                    <a href={network.href} target="_blank" rel="noopener noreferrer">
                      Open {network.name} app
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </fieldset>
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
