'use client'

import { useRecoilValue, useSetRecoilState } from "recoil";
import { WalletStatusType, toolBarState, walletState } from "./providers";
import { useEffect, useState } from "react";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db } from "./services/firebase_client";
import { FaPlus, FaSpinner } from "react-icons/fa";
import VaultInfo from "./components/vault_info";
import { useCreateVault } from "./hooks/use_create_vault";

export default function Home() {
  const [vaults, setVaults] = useState<any[]>([]);
  const setToolBarState = useSetRecoilState(toolBarState);
  const { address, status } = useRecoilValue(walletState);
  const { mutate: createVault, isLoading } = useCreateVault()

  useEffect(() => setToolBarState({
    title: 'Manage Vaults',
    show_back_nav: false
  }), [setToolBarState])

  // Subscribe to all vaults owned by the connected user address
  useEffect(() => {
    if (status === WalletStatusType.connected) {
      return onSnapshot(query(collection(db, "vaults"), where("config.owner", "==", address)), (res) => {
        const vaults = res.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setVaults(vaults);
      });
    } else {
      setVaults([]);
    }
  }, [address, status]);

  return (
    <div className=" h-full w-full overflow-y-scroll text-sm lg:text-lg">
      <h2 className="mb-4 font-bold ">My Vaults</h2>
      <button onClick={() => { !isLoading && createVault() }} className="flex items-center mb-4 border border-current rounded p-2">
        {
          isLoading && <>
            <FaSpinner className="w-6 h-6 mr-3 spinner" />
            <span>Creating Vault ...</span>
          </>
        }

        {
          !isLoading && <>
            <FaPlus className="w-5 h-5 mr-3" />
            <span>Create Vault</span>
          </>
        }
      </button>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
        {vaults.map((vault, index) => {
          return (
            <VaultInfo key={index} vault={vault} />
          );
        })}
      </div>

      <h2 className="mt-14 mb-4 font-bold">Active lending positions</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
        <div className="w-full h-60 p-4 border border-current rounded">
          coming soon...
        </div>
      </div>
    </div>
  )
}
