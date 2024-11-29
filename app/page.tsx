'use client'

import { useRecoilValue } from "recoil";
import { selectedChainState, walletState } from "./state";
import { useEffect, useState } from "react";
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { db } from "./services/firebase_client";
import { FaHistory, FaPlus, FaSpinner } from "react-icons/fa";
import { useMintVault } from "./hooks/use_exec";
import VaultInfoCard from "./widgets/vault_info_card";
import ActiveLiquidityRequestInfo from "./widgets/active_request_info";
import { useRouter } from 'next/navigation';
import ConnectWalletOptions from "./widgets/connect_wallet_options";
import classNames from "classnames";
import ClipBoardButton from "./widgets/clipboard_button";
import Link from "next/link";
import { WalletStatus } from "./enums/wallet_status";
import { VaultIndex } from "./types/vault_index";
import WelcomePage from "./widgets/welcome_page";
import { NAV_BAR_HEIGHT_SIZE } from "./utils/constants";

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
    if (status === WalletStatus.connected && chainInfo) {
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
    if (status === WalletStatus.connected && chainInfo) {
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
    <div className={classNames(
      `flex flex-col h-full overflow-y-auto overscroll-contain pt-${NAV_BAR_HEIGHT_SIZE} max-sm:pb-${NAV_BAR_HEIGHT_SIZE}`
    )}>
      {
        status === WalletStatus.connected &&
        <div className="flex flex-row items-center justify-between w-full min-h-36 bg-zinc-200 dark:bg-zinc-800 px-4 py-8">
          <span className="text-3xl">
            Manage Vaults
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
                  <FaSpinner className="w-4 h-4 mr-4 spinner" />
                  <span>Minting...</span>
                </>
              }

              {
                !isLoading && <>
                  <FaPlus className="w-4 h-4 mr-4" />
                  <span>New Vault</span>
                </>
              }
            </span>
          </div>
        </div>
      }

      {
        status === WalletStatus.connected &&
        <div className="p-4">
          <div className={classNames({
            "flex flex-row max-lg:w-full lg:max-w-80 rounded-lg p-1": true,
            "bg-zinc-300 dark:bg-zinc-800": true,
          })}>
            <span role="button" onClick={() => setSelectedTab(VaultTabs.owned_vaults)} className={classNames(
              'w-full rounded-lg text-sm px-4 py-2 text-center',
              selected_tab === VaultTabs.owned_vaults
                ? 'font-bold bg-white dark:bg-zinc-950'
                : ''
            )}>
              Owner
            </span>

            <span role="button" onClick={() => setSelectedTab(VaultTabs.accepted_deals)} className={classNames(
              'w-full rounded-lg text-sm px-4 py-2 text-center',
              selected_tab === VaultTabs.accepted_deals
                ? 'font-bold bg-white dark:bg-zinc-950'
                : ''
            )}>
              Lender
            </span>
          </div>
        </div>
      }


      {
        status === WalletStatus.connected && selected_tab === VaultTabs.owned_vaults &&
        owner_vaults.length === 0 &&
        <div className="flex w-full h-full items-center justify-center">
          <span className="whitespace-normal text-center">
            You have 0 vaults. <br />
            <span className=" text-blue-600" role="button" onClick={() => { !isLoading && mintVault() }}>
              Click New Vault to get started
            </span>
          </span>
        </div>
      }

      {
        status === WalletStatus.connected && selected_tab === VaultTabs.owned_vaults &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {owner_vaults.map((vault, index) => {
            return (
              <span key={vault.id} className={
                classNames({
                  "px-4 py-8": true,
                  "hover:shadow-lg dark:hover:bg-zinc-900": true,
                  "border-t border-zinc-300 dark:border-zinc-800": true,
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
        status === WalletStatus.connected && selected_tab === VaultTabs.accepted_deals &&
        active_lending_vaults.length > 0 &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {active_lending_vaults.map((vault, index) => {
            return (
              <div key={vault.id} className={
                classNames({
                  "px-4 py-8": true,
                  "hover:shadow-lg dark:hover:bg-zinc-900": true,
                  "border-t border-zinc-300 dark:border-zinc-800": true,
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
                    <FaHistory className="w-4 h-4" />
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
        status === WalletStatus.connected && selected_tab === VaultTabs.accepted_deals &&
        active_lending_vaults.length === 0 &&
        <div className="flex w-full h-full items-center justify-center">
          <span role="button" onClick={() => { router.push('/liquidity_requests') }} className="whitespace-normal text-center">
            You have not lent to any vaults yet. <br />
            <span className=" text-blue-600">
              See all open interests.
            </span>
          </span>
        </div>
      }

      {
        status !== WalletStatus.connected &&
        <WelcomePage />
      }
    </div>
  )
}
