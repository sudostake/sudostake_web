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
import classNames from "classnames";
import ClipBoardButton from "./widgets/clipboard_button";
import Link from "next/link";

export default function Home() {
  // define tabs
  const enum VaultTabs {
    owned_vaults,
    accepted_deals
  };

  const [active_lending_vaults, setActiveLendingVaults] = useState<VaultIndex[]>([]);
  const [owner_vaults, setOwnerVaults] = useState<VaultIndex[]>([]);
  const [selected_tab, setSelectedTab] = useState<VaultTabs>(VaultTabs.owned_vaults);
  const { address, status } = useRecoilValue(walletState);
  const { mutate: mintVault, isLoading } = useMintVault();
  const router = useRouter();
  const chainInfo = useRecoilValue(selectedChainState);

  // Subscribe to owner's vaults
  useEffect(() => {
    if (status === WalletStatusTypes.connected && chainInfo) {
      return onSnapshot(
        query(
          collection(db, chainInfo.vault_collection_path),
          where("owner", "==", address), orderBy("index_number", "desc")
        ),
        (res) => {
          const vaults = res.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
          setOwnerVaults(vaults);
        }
      );
    } else {
      setOwnerVaults([]);
    }
  }, [address, status, setOwnerVaults, chainInfo]);

  // Subscribe to all vaults where owner has active lending positions
  useEffect(() => {
    if (status === WalletStatusTypes.connected && chainInfo) {
      return onSnapshot(
        query(
          collection(db, chainInfo.vault_collection_path),
          where("lender", "==", address), orderBy("index_number", "desc")
        ),
        (res) => {
          const lending_vaults = res.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
          setActiveLendingVaults(lending_vaults);
        }
      );
    } else {
      setActiveLendingVaults([]);
    }
  }, [address, status, setActiveLendingVaults, chainInfo]);

  return (
    <div className="h-full overflow-y-auto overscroll-contain py-20 flex flex-col">
      {
        status === WalletStatusTypes.connected &&
        <div className="flex flex-row items-center justify-between w-full min-h-36 bg-zinc-200 dark:bg-zinc-800 px-4 py-8 text-3xl font-bold">
          <span>
            My Vaults
          </span>

          <div role="button" onClick={() => { !isLoading && mintVault() }}
            className={classNames(
              'px-4 py-2 flex flex-row gap-2 items-center',
              'border border-transparent hover:border-dashed hover:border-zinc-700  dark:hover:border-zinc-300',
              'rounded-lg'
            )}>
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
                  <span>New Vault</span>
                </>
              }
            </span>
          </div>
        </div>
      }

      {
        status === WalletStatusTypes.connected &&
        <div className="p-4">
          <div className={classNames({
            "flex flex-row max-lg:w-full lg:max-w-80 rounded-lg p-1": true,
            "bg-zinc-300 dark:bg-zinc-800": true,
          })}>
            <span role="button" onClick={() => setSelectedTab(VaultTabs.owned_vaults)} className={classNames(
              'w-full rounded-lg text-sm px-4 py-2',
              selected_tab === VaultTabs.owned_vaults
                ? 'font-bold bg-white dark:bg-zinc-950'
                : ''
            )}>
              Owned by me
            </span>

            <span role="button" onClick={() => setSelectedTab(VaultTabs.accepted_deals)} className={classNames(
              'w-full rounded-lg text-sm px-4 py-2',
              selected_tab === VaultTabs.accepted_deals
                ? 'font-bold bg-white dark:bg-zinc-950'
                : ''
            )}>
              Invested in
            </span>
          </div>
        </div>
      }

      {
        status === WalletStatusTypes.connected && selected_tab === VaultTabs.owned_vaults &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {owner_vaults.map((vault, index) => {
            return (
              <span key={vault.id} className={
                classNames({
                  "p-4": true,
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
        </div>
      }

      {
        status === WalletStatusTypes.connected && selected_tab === VaultTabs.accepted_deals &&
        active_lending_vaults.length > 0 &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {active_lending_vaults.map((vault, index) => {
            return (
              <div key={vault.id} className={
                classNames({
                  "p-4": true,
                  "hover:shadow-[16px_32px_128px_-8px_rgba(0,0,0,0.07)] dark:hover:bg-zinc-900": true,
                  "border-t border-zinc-300 dark:border-zinc-700": true,
                  "md:max-lg:border-r": index % 2 === 0,
                  "md:max-lg:border-b": active_lending_vaults.length <= 2 || index >= active_lending_vaults.length - 2,
                  "lg:border-r": (index + 1) % 3 !== 0,
                  "lg:border-b": active_lending_vaults.length <= 3 || index >= active_lending_vaults.length - 3,
                  "max-sm:border-b": index === active_lending_vaults.length - 1,
                })
              }>
                <span>
                  #{vault.index_number}
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
        status === WalletStatusTypes.connected && selected_tab === VaultTabs.accepted_deals &&
        active_lending_vaults.length === 0 &&
        <div className="px-4">
          <span role="button" onClick={() => { router.push('/liquidity_requests') }} className="whitespace-normal">
            You have not lent to any vaults yet. <br />
            <span className=" text-blue-600">
              Go to market to see available lending options.
            </span>
          </span>
        </div>
      }

      {
        status !== WalletStatusTypes.connected &&
        <ConnectWalletOptions title="Connect to manage vaults." />
      }
    </div>
  )
}
