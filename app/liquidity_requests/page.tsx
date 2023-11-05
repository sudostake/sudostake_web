'use client'

import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedChainState, toolBarState } from '../state';
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { db } from '../services/firebase_client';
import PendingLiquidityRequestInfo from '../widgets/pending_request_info';
import { usePathname, useRouter } from 'next/navigation';
import { VaultIndex } from '../utils/interface';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SortOptions, { SortOptionTypes } from './widgets/sort_options';

export default function LiquidityRequests() {
  const [vaults, setVaults] = useState<VaultIndex[]>([]);
  const setToolBarState = useSetRecoilState(toolBarState);
  const router = useRouter();
  const pathname = usePathname();
  const chainInfo = useRecoilValue(selectedChainState);
  const [selected_sort_option, setSelectedSortOption] = useState<SortOptionTypes>();
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

  // Subscribe to pending liquidity requests
  useEffect(() => {
    if (chainInfo && selected_sort_option) {
      // Filter
      let constraints: any[] = [
        where("liquidity_request_status", "==", "pending"),
      ];

      // Order by
      if (selected_sort_option === SortOptionTypes.latest) {
        constraints.push(orderBy("indexed_at", "desc"));
      } else
        if (selected_sort_option === SortOptionTypes.highest_value_locked) {
          constraints.push(orderBy("tvl", "desc"));
        }

      // TODO add pagination constraints

      return onSnapshot(query(collection(db, chainInfo.vault_collection_path), ...constraints), (res) => {
        const vaults = res.docs
          .map((doc) => ({ ...doc.data(), id: doc.id } as VaultIndex));
        setVaults(vaults);
      });
    }
  }, [chainInfo, selected_sort_option]);

  function handle_select_sort_option(option: SortOptionTypes) {
    // Scroll to top of element
    vault_deals_list_ref.current.scrollTop = 0;

    setSelectedSortOption(option);
  }

  return (
    <div className='flex flex-col h-full'>

      <div className='flex flex-row px-4 lg:px-8 py-4 border-b border-current'>
        <SortOptions on_select={handle_select_sort_option} />

        <span className='flex items-center flex-row gap-8 ml-auto'>
          <FaChevronLeft className="w-4 h-4" role='button' />
          <span className='font-bold'>1</span>
          <FaChevronRight className="w-4 h-4" role='button' />
        </span>
      </div>

      <div ref={vault_deals_list_ref} className="flex-grow text-sm lg:text-base py-8 px-2 lg:px-8 overflow-y-scroll">
        {
          vaults.length > 0 &&
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {vaults.map((vault, index) => {
              return (
                <div key={index} className="w-full p-4 border border-current rounded-lg grid grid-cols-1 gap-2">
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
