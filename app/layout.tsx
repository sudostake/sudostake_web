import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SudoStake | Stake-Backed Liquidity",
  description:
    "Stake with your preferred validators, keep rewards compounding, and borrow stablecoins through SudoStake vaults.",
  openGraph: {
    title: "SudoStake | Stake-Backed Liquidity",
    description:
      "Stake with your preferred validators, keep rewards compounding, and borrow stablecoins through SudoStake vaults.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SudoStake | Stake-Backed Liquidity",
    description:
      "Stake with your preferred validators, keep rewards compounding, and borrow stablecoins through SudoStake vaults.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">
        {children}
      </body>
    </html>
  );
}
