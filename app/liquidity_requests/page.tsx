'use client'

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import VaultDealsToolbar from './widgets/vault_deals_toolbar';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { selectedChainState } from '../state';
import { format_duration } from '../utils/conversion';
import { LiquidityRequestType } from '../enums/liquidity_request_type';
import { VaultIndex } from '../models/vault_index';

export default function LiquidityRequests() {
  const [vaults, setVaults] = useState<VaultIndex[]>([]);
  const router = useRouter();
  const vault_deals_list_ref = useRef(null);
  const chainInfo = useRecoilValue(selectedChainState);

  return (
    <div className='h-full overflow-y-auto py-20 flex flex-col' ref={vault_deals_list_ref}>
      <div className="px-4 py-8 flex flex-row items-center justify-between w-full min-h-36 bg-zinc-200 dark:bg-zinc-800 text-3xl font-bold">
        <span>
          Open Interests
        </span>
      </div>

      <VaultDealsToolbar on_data={setVaults} list_ref={vault_deals_list_ref} />

      <div className="flex-grow">
        {
          vaults.length > 0 &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {vaults.map((vault, index) => {
              const formatted_duration = (vault.request_type !== LiquidityRequestType.fixed_interest_rental &&
                format_duration(vault.duration_in_seconds)
              )
              const request_currency = chainInfo.request_currencies.find(currency => currency.coinMinimalDenom === vault.requested_amount.denom);

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
                  <span>Vault #{vault.index_number}</span>
                  <span>Total staked: {vault.tvl.toLocaleString('en-us')} {chainInfo.stakeCurrency.coinDenom}</span>
                  <span className='py-4'></span>
                  {
                    vault.request_type === LiquidityRequestType.fixed_interest_rental &&
                    <>
                      <span>Open:
                        <span className='text-green-600'>
                          {' '}
                          {vault.request_type.split('_').map(d => `${d[0].toUpperCase()}${d.substring(1)}`).join(' ')}
                        </span>
                      </span>
                      <span className=''>Claim {vault.claimable_tokens} {chainInfo.stakeCurrency.coinDenom} in staking rewards.</span>
                      {
                        vault.can_cast_vote &&
                        <span className='italic'>(Includes voting rights)</span>
                      }
                    </>
                  }
                  {
                    vault.request_type === LiquidityRequestType.fixed_term_rental &&
                    <>
                      <span>Open:
                        <span className='text-blue-600'>
                          {' '}
                          {vault.request_type.split('_').map(d => `${d[0].toUpperCase()}${d.substring(1)}`).join(' ')}
                        </span>
                      </span>

                      <span className=''>Claim all staking rewards for {formatted_duration}.</span>
                      {
                        vault.can_cast_vote &&
                        <span className='italic'>(With voting rights)</span>
                      }
                    </>
                  }
                  {
                    vault.request_type === LiquidityRequestType.fixed_term_loan &&
                    <>
                      <span>Open:
                        <span className='text-red-600'>
                          {' '}
                          {vault.request_type.split('_').map(d => `${d[0].toUpperCase()}${d.substring(1)}`).join(' ')}
                        </span>
                      </span>
                      <span className=''>Get {(vault.requested_amount.amount + vault.interest_amount).toLocaleString('en-us')} {request_currency.coinDenom} in return or liquidate {vault.collateral_amount.toLocaleString('en-us')} {chainInfo.stakeCurrency.coinDenom} after {formatted_duration}.</span>
                    </>
                  }
                  <span className='py-4 mb-auto'></span>
                  <span>Cost: {vault.requested_amount.amount.toLocaleString('en-us')} {request_currency.coinDenom}</span>
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
