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
  title: 'Sudo Stake',
  description: 'On-chain property rights for everyone.',
}

export default function RootLayout({
  children,
  vault_info_modal
}: {
  children: React.ReactNode,
  vault_info_modal: React.ReactNode,
}) {
  return (
    <html lang="en" className='bg-white dark:bg-zinc-950'>
      <body className={`bg-white dark:bg-zinc-950 flex flex-row w-screen h-screen ${inter.className}`} suppressHydrationWarning={true} >
        <StrictMode>
          <Providers>
            <ToolBar />
            <SideBar />
            <FailedVaultIndexHandler />
            <ToastContainer position="top-right" />
            <div className="flex-1 lg:ml-80 mt-20 bg-white dark:bg-zinc-950">
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
