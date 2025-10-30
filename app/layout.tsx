import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SudoStake | Validator Liquidity",
  description:
    "Launch the validator-first credit and staking experience from SudoStake. Secure validators, intuitive delegations, unified rewards.",
  openGraph: {
    title: "SudoStake | Validator Liquidity",
    description:
      "Launch the validator-first credit and staking experience from SudoStake.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SudoStake | Validator Liquidity",
    description:
      "Launch the validator-first credit and staking experience from SudoStake.",
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
