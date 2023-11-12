import './globals.css'
import { Inter } from 'next/font/google'
import SideBar from './widgets/sidebar'
import { Providers } from './providers';
import ToolBar from './widgets/toolbar';
import { StrictMode, Suspense } from 'react';
import Loading from './loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FailedVaultIndexHandler from './widgets/vault_index_handler';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Welcome to SudoStake',
  description: 'Non-Custodial | Smart Contract Staking | Peer-to-Peer Options Trading Platform',
}

export default function RootLayout({
  children,
  vault_info_modal
}: {
  children: React.ReactNode,
  vault_info_modal: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={`flex flex-row w-screen h-screen ${inter.className}`} suppressHydrationWarning={true} >
        <StrictMode>
          <Providers>
            <ToolBar />
            <SideBar />
            <FailedVaultIndexHandler />
            <ToastContainer position="top-right" />
            <div className="flex-1 lg:ml-80 mt-20 bg-gray-200 dark:bg-black">
              <Suspense fallback={<Loading />}>
                <>
                  {children}
                  {vault_info_modal}
                </>
              </Suspense>
            </div>
          </Providers>
        </StrictMode>
      </body>
    </html>
  )
}
