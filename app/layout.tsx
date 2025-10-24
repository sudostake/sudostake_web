import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SudoStake | Multichain Staking",
  description:
    "Launch the Cosmos or NEAR staking experience built by SudoStake. Secure validators, intuitive delegations, unified rewards.",
  openGraph: {
    title: "SudoStake | Multichain Staking",
    description:
      "Launch the Cosmos or NEAR staking experience built by SudoStake.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SudoStake | Multichain Staking",
    description:
      "Launch the Cosmos or NEAR staking experience built by SudoStake.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
