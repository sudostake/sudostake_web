import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SudoStake | Stake-Backed Loans",
  description:
    "Stake with your favorite validators, keep rewards growing, and borrow digital dollars through SudoStake vaults.",
  openGraph: {
    title: "SudoStake | Stake-Backed Loans",
    description:
      "Stake with your favorite validators, keep rewards growing, and borrow digital dollars through SudoStake vaults.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SudoStake | Stake-Backed Loans",
    description:
      "Stake with your favorite validators, keep rewards growing, and borrow digital dollars through SudoStake vaults.",
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
