import { BorrowCurrencyHero } from "./components/landing/BorrowCurrencyHero";
import { LogoMark } from "./components/LogoMark";

type Step = {
  title: string;
  description: string;
};

type Network = {
  name: string;
  href?: string;
};

const steps: Step[] = [
  {
    title: "Create a vault",
    description: "Choose USYC or a supported staked asset.",
  },
  {
    title: "Deposit collateral",
    description: "Fund the vault and keep the position active.",
  },
  {
    title: "Access liquidity",
    description: "Borrow against the vault when you need capital.",
  },
];

const networks: Network[] = [
  {
    name: "Arc",
  },
  {
    name: "NEAR",
    href: "https://near.sudostake.com",
  },
  {
    name: "Archway",
    href: "https://cosmos.sudostake.com",
  },
  {
    name: "Chihuahua",
    href: "https://cosmos.sudostake.com",
  },
];

export default function Home() {
  return (
    <div id="top" className="app-shell">
      <header className="app-bar">
        <div className="frame app-bar__row">
          <a href="#top" aria-label="SudoStake home" className="brand-link">
            <LogoMark size={32} className="brand-link__mark" />
            <span>SudoStake</span>
          </a>
        </div>
      </header>

      <main className="frame page-layout">
        <section className="hero-section">
          <BorrowCurrencyHero />
        </section>

        <div className="content-grid">
          <section className="content-section" aria-labelledby="flow-title">
            <h2 id="flow-title">How it works</h2>
            <ol className="content-list">
              {steps.map((step) => (
                <li key={step.title} className="content-item">
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
                  {network.href ? (
                    <a
                      className="network-action"
                      href={network.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {network.name}
                    </a>
                  ) : (
                    <span className="network-action network-action--disabled">
                      {network.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
