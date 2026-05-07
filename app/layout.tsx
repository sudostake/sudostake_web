import "./globals.css";
import type { Metadata } from "next";

const description =
  "Keep supported assets staked and borrow stablecoins through SudoStake vaults.";

export const metadata: Metadata = {
  title: "SudoStake | Borrow Stablecoins Without Unstaking",
  description,
  openGraph: {
    title: "SudoStake | Borrow Stablecoins Without Unstaking",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "SudoStake | Borrow Stablecoins Without Unstaking",
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
