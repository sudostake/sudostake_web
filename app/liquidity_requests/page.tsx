'use client'

import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toolBarState } from '../state';
import PendingLiquidityRequestInfo from '../widgets/pending_request_info';
import { usePathname, useRouter } from 'next/navigation';
import { VaultIndex } from '../utils/interface';
import VaultDealsToolbar from './widgets/vault_deals_toolbar';

export default function LiquidityRequests() {
  const [vaults, setVaults] = useState<VaultIndex[]>([]);
  const setToolBarState = useSetRecoilState(toolBarState);
  const router = useRouter();
  const pathname = usePathname();
  const vault_deals_list_ref = useRef(null);

  // We are using route interceptor to show /vaults[id], which sets the title of the toolbar.
  // Set it back to the title for this page, when pathname === /liquidity_requests
  useEffect(() => {
    if (pathname === '/liquidity_requests') {
      setToolBarState({
        title: 'Vault Deals',
        show_back_nav: false
      });
    }
  }, [pathname, setToolBarState])

  return (
    <div className='flex flex-col h-full'>
      <VaultDealsToolbar on_data={setVaults} list_ref={vault_deals_list_ref} />

      <div ref={vault_deals_list_ref} className="flex-grow text-sm lg:text-base py-8 lg:px-8 pb-40 overflow-y-scroll overscroll-contain">
        {
          vaults.length > 0 &&
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vaults.map((vault, index) => {
              return (
                <div key={index} className="flex flex-col gap-2 w-full p-4 border-b border-current lg:border lg:rounded-lg">
                  <span className="flex items-center">
                    <span>Vault ID</span>
                    <span className="ml-auto">
                      #{vault.index_number}
                    </span>
                  </span>
                  <PendingLiquidityRequestInfo vault_info={vault} show_tvl={true} />
                  <button onClick={() => { router.push(`/vaults/${vault.id}`) }} className="flex items-center justify-center h-9 mt-4 border border-current rounded-lg hover:ring-2 hover:ring-offset-2 text-xs lg:text-sm lg:font-medium p-2">
                    View
                  </button>
                </div>
              );
            })}
          </div>
        }

        {
          vaults.length === 0 &&
          <div className="flex w-full h-full items-center justify-center">
            <h2 className="flex items-center"><span>No pending liquidity requests</span></h2>
          </div>
        }

      </div>
    </div>
  )
}
