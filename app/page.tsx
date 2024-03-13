'use client'

import { useRecoilValue } from "recoil";
import { selectedChainState, walletState } from "./state";
import { useEffect, useState } from "react";
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { db } from "./services/firebase_client";
import { FaHistory, FaPlusSquare, FaSpinner } from "react-icons/fa";
import { useMintVault } from "./hooks/use_exec";
import VaultInfoCard from "./widgets/vault_info_card";
import { VaultIndex, WalletStatusTypes } from "./utils/interface";
import ActiveLiquidityRequestInfo from "./widgets/active_request_info";
import { useRouter } from 'next/navigation';
import ConnectWalletOptions from "./widgets/connect_wallet_options";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import ClipBoardButton from "./widgets/clipboard_button";
import Link from "next/link";

export default function Home() {
  const [active_lending_vaults, setActiveLendingVaults] = useState<VaultIndex[]>([]);
  const [owner_vaults, setOwnerVaults] = useState<VaultIndex[]>([]);
  const { address, status } = useRecoilValue(walletState);
  const { mutate: mintVault, isLoading } = useMintVault();
  const router = useRouter();
  const chainInfo = useRecoilValue(selectedChainState);

  // Subscribe to owner's vaults
  useEffect(() => {
    if (status === WalletStatusTypes.connected && chainInfo) {
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
    if (status === WalletStatusTypes.connected && chainInfo) {
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
    <div className="h-full w-full text-sm lg:text-base overflow-y-auto py-20">
      {status === WalletStatusTypes.connected &&
        <>
          <Tab.Group>
            <Tab.List className={classNames({
              "flex flex-row max-w-md rounded-lg h-12 p-1 mx-4 my-8": true,
              "bg-zinc-300 dark:bg-zinc-800": true,
            })}>
              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg text-sm py-2',
                  selected
                    ? 'font-bold bg-white dark:bg-zinc-950'
                    : ''
                )
              }>
                <h2>My Vaults</h2>
              </Tab>

              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg text-sm py-2',
                  selected
                    ? 'font-bold bg-white dark:bg-zinc-950'
                    : ''
                )
              }>
                <h2>Accepted Deals</h2>
              </Tab>
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {owner_vaults.map((vault, index) => {
                    return (
                      <span key={vault.id} className={
                        classNames({
                          "py-4 px-4 lg:px-8": true,
                          "hover:shadow-[16px_32px_128px_-8px_rgba(0,0,0,0.07)] dark:hover:bg-zinc-900": true,
                          "border-t border-zinc-300 dark:border-zinc-700": true,
                          "md:max-lg:border-r": index % 2 === 0,
                          "md:max-lg:border-b": owner_vaults.length <= 2 || index >= owner_vaults.length - 2,
                          "lg:border-r": (index + 1) % 3 !== 0,
                          "lg:border-b": owner_vaults.length <= 3 || index >= owner_vaults.length - 3,
                          "max-sm:border-b": index === owner_vaults.length - 1,
                        })
                      }>
                        <VaultInfoCard vault_info={vault} />
                      </span>
                    );
                  })}

                  <div role="button" onClick={() => { !isLoading && mintVault() }} className="w-full p-4 border border-zinc-400 border-dashed dark:border-zinc-700 grid grid-cols-1 gap-2 items-center">
                    <span className="flex items-center text-sm lg:text-base font-medium justify-center">
                      {
                        isLoading && <>
                          <FaSpinner className="w-6 h-6 mr-4 spinner" />
                          <span>Minting...</span>
                        </>
                      }

                      {
                        !isLoading && <>
                          <FaPlusSquare className="w-6 h-6 mr-4" />
                          <span>Mint Vault</span>
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
                    {active_lending_vaults.map((vault) => {
                      return (
                        <div key={vault.id} className="w-full p-4 border border-zinc-400 dark:border-zinc-600 rounded-lg grid grid-cols-1 gap-2">
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

                            <button onClick={() => { router.push(`/vaults/${vault.id}`) }} className="w-full flex items-center justify-center h-9 border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 text-xs lg:text-sm lg:font-medium p-2">
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
                  <div className="mt-8 px-4 lg:px-8">
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
        status !== WalletStatusTypes.connected &&
        <ConnectWalletOptions title="Connect to manage vaults." />
      }
    </div>
  )
}
