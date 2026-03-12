import "./globals.css";
import type { Metadata } from "next";

const description =
  "Use supported staked assets as collateral to borrow USDC through SudoStake vaults.";

export const metadata: Metadata = {
  title: "SudoStake | Borrow USDC Against Staked Assets",
  description,
  openGraph: {
    title: "SudoStake | Borrow USDC Against Staked Assets",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "SudoStake | Borrow USDC Against Staked Assets",
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
