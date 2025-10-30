import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

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
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
