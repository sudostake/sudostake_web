'use client'

import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toolBarState } from '../state';
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { db } from '../services/firebase_client';
import PendingLiquidityRequestInfo from '../widgets/pending_request_info';
import { VaultInfo } from '../utils/generic_interface';
import { useRouter } from 'next/navigation';

export default function LiquidityRequests() {
  const [vaults, setVaults] = useState<VaultInfo[]>([]);
  const setToolBarState = useSetRecoilState(toolBarState);
  const router = useRouter();

  useEffect(() => setToolBarState({
    title: 'Liquidity Requests',
    show_back_nav: false
  }), [setToolBarState]);

  // Subscribe to pending liquidity requests
  useEffect(() => {
    return onSnapshot(query(collection(db, "vaults"), where("index.status", "==", "pending"), orderBy("config.index_number", "desc")), (res) => {
      const vaults = res.docs
        .map((doc) => ({ ...doc.data(), id: doc.id } as VaultInfo));
      setVaults(vaults);
    });
  }, []);

  return (
    <div className="h-full w-full overflow-y-scroll text-sm lg:text-base p-4 lg:p-8">
      {
        vaults.length > 0 &&
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {vaults.map((vault, index) => {
            return (
              <div key={index} className="w-full p-4 border border-current rounded-lg grid grid-cols-1 gap-2">
                <span className="flex items-center">
                  <span>Vault ID</span>
                  <span className="ml-auto">
                    #{vault.config.index_number}
                  </span>
                </span>
                <PendingLiquidityRequestInfo vault_info={vault} />
                <button onClick={() => { router.push(`/vaults/${vault.id}`) }} className="flex items-center justify-center h-10 mt-4 border border-current rounded-lg hover:ring-2 hover:ring-offset-2 text-xs lg:text-sm lg:font-medium p-2">
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
