'use client'

import { useRecoilValue, useSetRecoilState } from "recoil";
import { WalletStatusType, walletState } from "./state";
import { useEffect, useState } from "react";
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { db } from "./services/firebase_client";
import { FaPlusSquare, FaSpinner } from "react-icons/fa";
import { useCreateVault } from "./hooks/use_exec";
import { toolBarState } from "./state";
import VaultInfoCard from "./widgets/vault_info_card";

export default function Home() {
  const [vaults, setVaults] = useState<any[]>([]);
  const setToolBarState = useSetRecoilState(toolBarState);
  const { address, status } = useRecoilValue(walletState);
  const { mutate: createVault, isLoading } = useCreateVault();

  useEffect(() => setToolBarState({
    title: 'Manage Vaults',
    show_back_nav: false
  }), [setToolBarState])

  // Subscribe to all vaults owned by the connected user address
  useEffect(() => {
    if (status === WalletStatusType.connected) {
      return onSnapshot(query(collection(db, "vaults"), where("config.owner", "==", address), orderBy("config.index_number", "desc")), (res) => {
        const vaults = res.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setVaults(vaults);
      });
    } else {
      setVaults([]);
    }
  }, [address, status]);

  return (

    <div className="h-full w-full overflow-y-scroll text-sm lg:text-base py-4 px-4 lg:px-8">
      {status === WalletStatusType.connected &&
        <>
          <button onClick={() => { !isLoading && createVault() }} className="flex items-center mb-4 h-10 border border-current rounded-lg hover:ring-2 hover:ring-offset-2 p-2 text-xs lg:text-sm lg:font-medium">
            {
              isLoading && <>
                <FaSpinner className="w-6 h-6 mr-3 spinner" />
                <span>Creating ...</span>
              </>
            }

            {
              !isLoading && <>
                <FaPlusSquare className="w-5 h-5 mr-3" />
                <span>Create Vault</span>
              </>
            }
          </button>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {vaults.map((vault, index) => {
              return (
                <VaultInfoCard key={index} vault={vault} />
              );
            })}
          </div>

          <h2 className="mt-14 mb-4 font-bold">Active lending positions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="w-full h-60 p-4 border border-current rounded">
              coming soon...
            </div>
          </div>
        </>
      }

      {
        status !== WalletStatusType.connected &&
        <div className="flex w-full h-full items-center justify-center">
          <h2 className="flex items-center"><span>Connect wallet to view vault details</span></h2>
        </div>
      }
    </div>
  )
}
