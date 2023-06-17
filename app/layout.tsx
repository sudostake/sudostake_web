import './globals.css'
import { Inter } from 'next/font/google'
import SideBar from './components/sidebar'
import { Providers } from './providers';
import ToolBar from './components/toolbar';
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
          <ToolBar />
          <SideBar />

          {/* main content is displayed in this section */}
          <div className="flex-1 lg:ml-80">
            {children}
          </div>
        </Providers>

      </body>
    </html>
  )
}
