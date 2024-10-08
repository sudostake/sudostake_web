'use client'

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import VaultDealsToolbar from './widgets/vault_deals_toolbar';
import classNames from 'classnames';
import { VaultIndex } from '../types/vault_index';
import OpenInterestCard from './widgets/open_interest_card';
import DocumentCounter from './widgets/document_counter';
import { useRecoilValue } from 'recoil';
import { selectedChainState } from '../state';

export default function LiquidityRequests() {
  const [vaults, setVaults] = useState<VaultIndex[]>([]);
  const router = useRouter();
  const vault_deals_list_ref = useRef(null);
  const chainInfo = useRecoilValue(selectedChainState);

  return (
    <div className='h-full overflow-y-auto pt-14 max-sm:pb-14 flex flex-col' ref={vault_deals_list_ref}>
      <div className="px-4 py-8 flex flex-row items-center justify-between w-full min-h-36 bg-zinc-200 dark:bg-zinc-800">
        <span className='text-3xl'>
          Open Interests (<DocumentCounter collection_path={chainInfo && chainInfo.vault_collection_path} />)
        </span>
      </div>

      <VaultDealsToolbar on_data={setVaults} list_ref={vault_deals_list_ref} />

      <div className="flex-grow">
        {
          vaults.length === 0 &&
          <div className="flex w-full h-full items-center justify-center">
            <h2 className="flex items-center"><span>No pending liquidity requests</span></h2>
          </div>
        }

        {
          vaults.length > 0 &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
              vaults.map((vault, index) => {
                return <div key={vault.id} role="button"
                  onClick={() => { router.push(`/vaults/${vault.id}`) }}
                  className={classNames({
                    "p-4": true,
                    "flex flex-col": true,
                    "w-full": true,
                    "hover:shadow-lg dark:hover:bg-zinc-900": true,
                    "border-t border-zinc-300 dark:border-zinc-800": true,
                    "md:max-lg:border-r": index % 2 === 0,
                    "md:max-lg:border-b": vaults.length <= 2 || index >= vaults.length - 2,
                    "lg:border-r": (index + 1) % 3 !== 0,
                    "lg:border-b": vaults.length <= 3 || index >= vaults.length - 3,
                    "max-sm:border-b": index === vaults.length - 1,
                  })}>
                  <OpenInterestCard vault_info={vault} />
                </div>
              })
            }
          </div>
        }
      </div>
    </div>
  )
}
