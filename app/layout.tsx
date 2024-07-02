import './globals.css'
import { Providers } from './providers';
import ToolBar from './widgets/toolbar';
import { StrictMode, Suspense } from 'react';
import Loading from './loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FailedVaultIndexHandler from './widgets/vault_index_handler';
import NavigationArea from './widgets/nav_area';

export const metadata = {
  title: 'sudo stake',
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
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StrictMode>
          <Providers>
            <ToolBar />
            <NavigationArea />

            <div className="h-screen sm:pl-56 bg-white dark:bg-zinc-950">
              <Suspense fallback={<Loading />}>
                <>
                  {children}
                  {vault_info_modal}
                </>
              </Suspense>
            </div>

            <FailedVaultIndexHandler />
            <ToastContainer position="top-right" />
          </Providers>
        </StrictMode>
      </body>
    </html>
  )
}
