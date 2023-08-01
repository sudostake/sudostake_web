'use client'

import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toolBarState } from '../state';
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { db } from '../services/firebase_client';
import PendingLiquidityRequestInfo from '../widgets/pending_request_info';
import { usePathname, useRouter } from 'next/navigation';
import { VaultIndex } from '../utils/interface';

export default function LiquidityRequests() {
  const [vaults, setVaults] = useState<VaultIndex[]>([]);
  const setToolBarState = useSetRecoilState(toolBarState);
  const router = useRouter();
  const pathname = usePathname();

  // We are using route interceptor to show /vaults[id], which sets the title of the toolbar.
  // Set it back to the title for this page, when pathname === /liquidity_requests
  useEffect(() => {
    if (pathname === '/liquidity_requests') {
      setToolBarState({
        title: 'Lend to vault owners',
        show_back_nav: false
      });
    }
  }, [pathname, setToolBarState])

  // Subscribe to pending liquidity requests
  useEffect(() => {
    return onSnapshot(query(collection(db, "vaults"), where("liquidity_request_status", "==", "pending"), orderBy("index_number", "desc")), (res) => {
      const vaults = res.docs
        .map((doc) => ({ ...doc.data(), id: doc.id } as VaultIndex));
      setVaults(vaults);
    });
  }, []);

  return (
    <div className="h-full w-full overflow-y-scroll text-sm lg:text-base py-4 px-2 lg:px-8">
      {
        vaults.length > 0 &&
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {vaults.map((vault, index) => {
            return (
              <div key={index} className="w-full p-4 border border-current rounded-lg grid grid-cols-1 gap-2">
                <span className="flex items-center">
                  <span>Vault ID</span>
                  <span className="ml-auto">
                    #{vault.index_number}
                  </span>
                </span>
                <PendingLiquidityRequestInfo vault_info={vault} />
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
  )
}
