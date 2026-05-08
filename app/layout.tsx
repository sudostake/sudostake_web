import "./globals.css";
import type { Metadata } from "next";

const description =
  "Use USYC or staked crypto vaults to borrow crypto liquidity, USDC, EURC, and cNGN across Arc and supported L1 chains.";

export const metadata: Metadata = {
  title: "SudoStake | Vault-Backed Liquidity Across Arc and L1s",
  description,
  openGraph: {
    title: "SudoStake | Vault-Backed Liquidity Across Arc and L1s",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "SudoStake | Vault-Backed Liquidity Across Arc and L1s",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
