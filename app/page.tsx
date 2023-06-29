'use client'

import { useRecoilValue, useSetRecoilState } from "recoil";
import { WalletStatusType, walletState } from "./state";
import { useEffect, useState } from "react";
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { db } from "./services/firebase_client";
import { FaPlus, FaSpinner } from "react-icons/fa";
import VaultInfo from "./components/vault_info";
import { useCreateVault } from "./hooks/use_exec";
import { toolBarState } from "./state";

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
    <div className="h-full w-full overflow-y-scroll text-sm lg:text-lg py-4 px-4 lg:px-8">
      <button onClick={() => { !isLoading && createVault() }} className="flex items-center mb-4 border border-current rounded p-2">
        {
          isLoading && <>
            <FaSpinner className="w-6 h-6 mr-3 spinner" />
            <span>Creating ...</span>
          </>
        }

        {
          !isLoading && <>
            <FaPlus className="w-5 h-5 mr-3" />
            <span>Create Vault</span>
          </>
        }
      </button>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {vaults.map((vault, index) => {
          return (
            <VaultInfo key={index} vault={vault} />
          );
        })}
      </div>

      <h2 className="mt-14 mb-4 font-bold">Active lending positions</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="w-full h-60 p-4 border border-current rounded">
          coming soon...
        </div>
      </div>
    </div>
  )
}
