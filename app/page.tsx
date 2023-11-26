'use client'

import { useRecoilValue, useSetRecoilState } from "recoil";
import { WalletStatusType, selectedChainState, walletState } from "./state";
import { useEffect, useState } from "react";
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { db } from "./services/firebase_client";
import { FaHistory, FaPlusSquare, FaSpinner } from "react-icons/fa";
import { useCreateVault } from "./hooks/use_exec";
import { toolBarState } from "./state";
import VaultInfoCard from "./widgets/vault_info_card";
import { VaultIndex } from "./utils/interface";
import ActiveLiquidityRequestInfo from "./widgets/active_request_info";
import { useRouter, usePathname } from 'next/navigation';
import ConnectWalletOptions from "./widgets/connect_wallet_options";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import ClipBoardButton from "./widgets/clipboard_button";
import Link from "next/link";

export default function Home() {
  const [active_lending_vaults, setActiveLendingVaults] = useState<VaultIndex[]>([]);
  const [owner_vaults, setOwnerVaults] = useState<VaultIndex[]>([]);
  const setToolBarState = useSetRecoilState(toolBarState);
  const { address, status } = useRecoilValue(walletState);
  const { mutate: createVault, isLoading } = useCreateVault();
  const router = useRouter();
  const pathname = usePathname();
  const chainInfo = useRecoilValue(selectedChainState);

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
    if (status === WalletStatusType.connected && chainInfo) {
      return onSnapshot(query(collection(db, chainInfo.vault_collection_path), where("owner", "==", address), orderBy("index_number", "desc")), (res) => {
        const vaults = res.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setOwnerVaults(vaults);
      });
    } else {
      setOwnerVaults([]);
    }
  }, [address, status, setOwnerVaults, chainInfo]);

  // Subscribe to all vaults where owner has active lending positions
  useEffect(() => {
    if (status === WalletStatusType.connected && chainInfo) {
      return onSnapshot(query(collection(db, chainInfo.vault_collection_path), where("lender", "==", address), orderBy("index_number", "desc")), (res) => {
        const lending_vaults = res.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setActiveLendingVaults(lending_vaults);
      });
    } else {
      setActiveLendingVaults([]);
    }
  }, [address, status, setActiveLendingVaults, chainInfo]);


  return (
    <div className="h-full w-full overflow-y-scroll text-sm lg:text-base py-8 px-2 lg:px-8">
      {status === WalletStatusType.connected &&
        <>
          <Tab.Group>
            <Tab.List className="flex flex-row max-w-md mb-8 border border-current dark:border-gray-600 rounded-lg">
              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg text-sm py-2',
                  selected
                    ? 'border border-current font-bold'
                    : ''
                )
              }>
                <h2>My Vaults</h2>
              </Tab>

              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg text-sm py-2',
                  selected
                    ? 'border border-current font-bold'
                    : ''
                )
              }>
                <h2>Accepted Deals</h2>
              </Tab>
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                  {owner_vaults.map((vault, index) => {
                    return (
                      <VaultInfoCard key={index} vault_info={vault} />
                    );
                  })}

                  <div role="button" onClick={() => { !isLoading && createVault() }} className="w-full p-4 border border-current border-dashed rounded-lg grid grid-cols-1 gap-2 items-center">
                    <span className="flex items-center text-sm lg:text-base font-medium justify-center">
                      {
                        isLoading && <>
                          <FaSpinner className="w-6 h-6 mr-4 spinner" />
                          <span>Creating ...</span>
                        </>
                      }

                      {
                        !isLoading && <>
                          <FaPlusSquare className="w-6 h-6 mr-4" />
                          <span>Create Vault</span>
                        </>
                      }
                    </span>
                  </div>
                </div>
              </Tab.Panel>

              <Tab.Panel>
                {
                  active_lending_vaults.length > 0 &&
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

                          <span className="flex flex-row gap-4 items-center justify-center mt-4">
                            <span className="flex items-center justify-center ">
                              <ClipBoardButton address={vault.id} />
                            </span>

                            <Link passHref href={(`${chainInfo.explorer_url}/account/${vault.id}`)}
                              target="_blank"
                              className="flex items-center justify-center w-9 h-9 rounded-full">
                              <FaHistory className="w-5 h-5" />
                            </Link>

                            <button onClick={() => { router.push(`/vaults/${vault.id}`) }} className="w-full flex items-center justify-center h-9 border border-current rounded-lg hover:ring-2 hover:ring-offset-2 text-xs lg:text-sm lg:font-medium p-2">
                              View
                            </button>
                          </span>

                        </div>
                      );
                    })}
                  </div>
                }

                {
                  active_lending_vaults.length === 0 &&
                  <div className="mt-8">
                    <span role="button" onClick={() => { router.push('/liquidity_requests') }} className="whitespace-normal">
                      No accepted deals yet. <br />
                      <span className=" text-blue-600">
                        Go to market to see available lending options.
                      </span>
                    </span>
                  </div>
                }
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </>
      }

      {
        status !== WalletStatusType.connected &&
        <ConnectWalletOptions title="Connect to manage vaults." />
      }
    </div>
  )
}
