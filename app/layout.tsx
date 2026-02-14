import "./globals.css";
import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SudoStake | Stake-Backed Liquidity",
  description:
    "Borrow or lend without unstaking. Unlock USDC liquidity while validator rewards keep compounding.",
  openGraph: {
    title: "SudoStake | Stake-Backed Liquidity",
    description:
      "Borrow or lend without unstaking. Unlock USDC liquidity while validator rewards keep compounding.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SudoStake | Stake-Backed Liquidity",
    description:
      "Borrow or lend without unstaking. Unlock USDC liquidity while validator rewards keep compounding.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakartaSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
