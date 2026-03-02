import Image from "next/image";

type Chain = {
  name: string;
  href: string;
  logoSrc: string;
  logoAlt: string;
};

const chains: Chain[] = [
  {
    name: "ARCH",
    href: "https://cosmos.sudostake.com",
    logoSrc: "https://raw.githubusercontent.com/cosmos/chain-registry/master/archway/images/archway.svg",
    logoAlt: "ARCH logo",
  },
  {
    name: "HUAHUA",
    href: "https://cosmos.sudostake.com",
    logoSrc: "https://raw.githubusercontent.com/cosmos/chain-registry/master/chihuahua/images/huahua.svg",
    logoAlt: "HUAHUA logo",
  },
  {
    name: "NEAR",
    href: "https://near.sudostake.com",
    logoSrc: "https://pages.near.org/wp-content/uploads/2021/09/brand-icon-300x300.png",
    logoAlt: "NEAR logo",
  },
];

export function NetworkSection() {
  return (
    <section id="apps" className="w-full py-10 sm:py-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="section-heading text-[color:var(--text-primary)]">Choose a network</h2>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chains.map((chain) => (
            <li key={chain.name} className="h-full">
              <a
                href={chain.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Go to ${chain.name}`}
                className="group pixel-card surface-card flex h-full items-center gap-3 px-4 py-4 text-left text-[color:var(--text-primary)] sm:px-5"
              >
                <span className="network-mark">
                  <Image src={chain.logoSrc} alt={chain.logoAlt} width={28} height={28} className="h-7 w-7 flex-none" />
                </span>
                <h3 className="pixel-heading text-[0.8rem] text-[color:var(--text-primary)] sm:text-[0.88rem]">{chain.name}</h3>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
