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
import { VaultIndex } from "./utils/interface";
import ActiveLiquidityRequestInfo from "./widgets/active_request_info";
import { useRouter, usePathname } from 'next/navigation';
import { useConnectWallet } from "./hooks/use_connect_wallet";
import Image from "next/image";
import { WalletType } from "./utils/supported_wallets";

export default function Home() {
  const [active_lending_vaults, setActiveLendingVaults] = useState<VaultIndex[]>([]);
  const [owner_vaults, setOwnerVaults] = useState<VaultIndex[]>([]);
  const setToolBarState = useSetRecoilState(toolBarState);
  const { address, status } = useRecoilValue(walletState);
  const { mutate: createVault, isLoading } = useCreateVault();
  const router = useRouter();
  const { mutate: connectWallet } = useConnectWallet();
  const pathname = usePathname();

  // We are using route interceptor to show /vaults[id], which sets the title of the toolbar.
  // Set it back to the title for this page, when pathname === /
  useEffect(() => {
    if (pathname === '/') {
      setToolBarState({
        title: 'Manage Vaults',
        show_back_nav: false
      });
    }
  }, [pathname, setToolBarState])

  // Subscribe to owner's vaults
  useEffect(() => {
    if (status === WalletStatusType.connected) {
      return onSnapshot(query(collection(db, "vaults"), where("owner", "==", address), orderBy("index_number", "desc")), (res) => {
        const vaults = res.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setOwnerVaults(vaults);
      });
    } else {
      setOwnerVaults([]);
    }
  }, [address, status, setOwnerVaults]);

  // Subscribe to all vaults where owner has active lending positions
  useEffect(() => {
    if (status === WalletStatusType.connected) {
      return onSnapshot(query(collection(db, "vaults"), where("lender", "==", address), orderBy("index_number", "desc")), (res) => {
        const lending_vaults = res.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setActiveLendingVaults(lending_vaults);
      });
    } else {
      setActiveLendingVaults([]);
    }
  }, [address, status, setActiveLendingVaults]);

  function handle_select_wallet(type: WalletType) {
    localStorage.setItem('selected_wallet', type);
    connectWallet();
  }

  const connect_wallet_home = () => {
    switch (status) {
      case WalletStatusType.error:
      case WalletStatusType.idle: {
        return (
          <div className="flex flex-col gap-8">
            <span className="text-sm text-center">CONNECT WALLET</span>
            <button onClick={() => handle_select_wallet(WalletType.keplr)} className="flex items-center border border-current rounded-lg hover:ring-2 hover:ring-offset-2 p-3 text-sm lg:text-base font-medium lg:font-medium">
              <Image
                src="/keplr_logo.svg"
                alt="Keplr Wallet Logo"
                width={30}
                height={30}
                priority
              />
              <span className="ml-2 text-sm lg:text-base font-medium">KEPLR</span>
            </button>

            <button onClick={() => handle_select_wallet(WalletType.leap)} className="flex items-center border border-current rounded-lg hover:ring-2 hover:ring-offset-2 p-3 text-sm lg:text-base font-medium lg:font-medium">
              <Image
                src="/leap_wallet_logo.svg"
                alt="Leap Wallet Logo"
                width={30}
                height={30}
                priority
              />
              <span className="ml-2 text-sm lg:text-base font-medium">LEAP</span>
            </button>

            <button onClick={() => handle_select_wallet(WalletType.cosmostation)} className="flex items-center border border-current rounded-lg hover:ring-2 hover:ring-offset-2 p-3 text-sm lg:text-base font-medium lg:font-medium">
              <Image
                src="/ibc_wallet.png"
                alt="Cosmostation Wallet Logo"
                width={30}
                height={30}
                priority
              />
              <span className="ml-2 text-sm lg:text-base font-medium">IBC</span>
            </button>
          </div>
        );
      }

      case WalletStatusType.connecting:
        return <button className="flex items-center mb-4 border border-current rounded-lg hover:ring-2 hover:ring-offset-2 p-3 text-sm lg:text-base font-medium lg:font-medium">
          <FaSpinner className="w-6 h-6 mr-3 spinner" />
          <span className="ml-2 text-sm lg:text-base font-medium">Connecting...</span>
        </button>

      default:
        return <></>
    }
  }

  return (
    <div className="h-full w-full overflow-y-scroll text-sm lg:text-base py-8 px-2 lg:px-8">
      {status === WalletStatusType.connected &&
        <>
          <button onClick={() => { !isLoading && createVault() }} className="flex items-center mb-4 border border-current rounded-lg hover:ring-2 hover:ring-offset-2 h-16 px-3 text-sm lg:text-base font-medium lg:font-medium">
            {
              isLoading && <>
                <FaSpinner className="w-6 h-6 mr-4 spinner" />
                <span>Creating ...</span>
              </>
            }

            {
              !isLoading && <>
                <FaPlusSquare className="w-6 h-6 mr-4" />
                <span>Create a New Vault</span>
              </>
            }
          </button>

          {
            owner_vaults.length > 0 &&
            <>
              <h2 className="mt-14 mb-4 font-bold">My Vaults</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {owner_vaults.map((vault, index) => {
                  return (
                    <VaultInfoCard key={index} vault_info={vault} />
                  );
                })}
              </div>
            </>
          }

          {
            active_lending_vaults.length > 0 &&
            <>
              <h2 className="mt-14 mb-4 font-bold">Active lending positions</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {active_lending_vaults.map((vault, index) => {
                  return (
                    <div key={index} className="w-full p-4 border border-current rounded-lg grid grid-cols-1 gap-2">
                      <span className="flex items-center">
                        <span>Vault ID</span>
                        <span className="ml-auto">
                          #{vault.index_number}
                        </span>
                      </span>
                      <ActiveLiquidityRequestInfo vault_info={vault} hide_state_info={true} />
                      <button onClick={() => { router.push(`/vaults/${vault.id}`) }} className="flex items-center justify-center h-9 mt-4 border border-current rounded-lg hover:ring-2 hover:ring-offset-2 text-xs lg:text-sm lg:font-medium p-2">
                        View
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          }
        </>
      }

      {
        status !== WalletStatusType.connected &&
        <div className="flex w-full h-full items-center justify-center">
          {connect_wallet_home()}
        </div>
      }
    </div>
  )
}
