import './globals.css'
import { Inter } from 'next/font/google'
import SideBar from './components/sidebar'
import { Providers } from './providers';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Welcome to SudoStake',
  description: 'Non-Custodial | Smart Contract Staking | Peer-to-Peer Options Trading Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`flex flex-row w-screen h-screen ${inter.className}`} suppressHydrationWarning={true} >
        <Providers>
          {/* Import SideBar component here */}
          <SideBar />

          {/* Import child components here */}
          <div className="flex-1 lg:pl-80">
            {children}
          </div>
        </Providers>

      </body>
    </html>
  )
}
