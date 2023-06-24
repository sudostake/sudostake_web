import './globals.css'
import { Inter } from 'next/font/google'
import SideBar from './components/sidebar'
import { Providers } from './providers';
import ToolBar from './components/toolbar';
import { Suspense } from 'react';
import Loading from './loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <ToastContainer position="top-right" />
          {/* main content is displayed in this section */}
          <div className="flex-1 lg:ml-80 mt-20 lg:mt-24">
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  )
}
