'use client'

import { useRef, useState } from 'react';
import PendingLiquidityRequestInfo from '../widgets/pending_request_info';
import { useRouter } from 'next/navigation';
import { VaultIndex } from '../utils/interface';
import VaultDealsToolbar from './widgets/vault_deals_toolbar';
import classNames from 'classnames';

export default function LiquidityRequests() {
  const [vaults, setVaults] = useState<VaultIndex[]>([]);
  const router = useRouter();
  const vault_deals_list_ref = useRef(null);

  return (
    <div className='h-full overflow-y-auto no-scrollbar py-20 flex flex-col'>
      <div className="px-4 py-8 flex flex-row items-center justify-between w-full min-h-36 bg-zinc-200 dark:bg-zinc-800 text-3xl font-bold">
        <span>
          Vault Deals
        </span>
      </div>

      <VaultDealsToolbar on_data={setVaults} list_ref={vault_deals_list_ref} />

      <div ref={vault_deals_list_ref} className="flex-grow text-sm lg:text-base">
        {
          vaults.length > 0 &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {vaults.map((vault, index) => {
              return (
                <div key={vault.id} role="button"
                  onClick={() => { router.push(`/vaults/${vault.id}`) }}
                  className={classNames({
                    "flex flex-col": true,
                    "w-full p-4": true,
                    "hover:shadow-[16px_32px_128px_-8px_rgba(0,0,0,0.07)] dark:hover:bg-zinc-900": true,
                    "border-t border-zinc-300 dark:border-zinc-600": true,
                    "md:max-lg:border-r": index % 2 === 0,
                    "md:max-lg:border-b": vaults.length <= 2 || index >= vaults.length - 2,
                    "lg:border-r": (index + 1) % 3 !== 0,
                    "lg:border-b": vaults.length <= 3 || index >= vaults.length - 3,
                    "max-sm:border-b": index === vaults.length - 1,
                  })}>
                  <span>
                    #{vault.index_number}
                  </span>
                  <PendingLiquidityRequestInfo vault_info={vault} show_tvl={true} />
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
