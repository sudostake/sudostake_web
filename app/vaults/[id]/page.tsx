'use client'

import { useQueryVaultInfo } from "@/app/hooks/use_query_vault_info";
import { db } from "@/app/services/firebase_client";
import { WalletStatusType, toolBarState, walletState } from "@/app/state";
import classNames from "classnames";
import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import StakeActionsDropdown from "./stake_actions";

export default function Vault({ params }: { params: { id: string } }) {
    const [vault_info, setVaultInfo] = useState<any | null>(null);
    const setToolBarState = useSetRecoilState(toolBarState);
    const { info: vault_metadata } = useQueryVaultInfo(params.id);
    const { status } = useRecoilValue(walletState);

    // Subscribe to all vaults owned by the connected user address
    useEffect(() => {
        if (status === WalletStatusType.connected) {
            return onSnapshot(doc(db, "/vaults", params.id), (doc) => {
                const info = doc.data();
                setVaultInfo(info);
            });
        } else {
            setVaultInfo(null);
        }
    }, [status, setToolBarState]);

    useEffect(() => {
        if (Boolean(vault_info)) {
            setToolBarState({
                title: `Vault #${vault_info.config.index_number}`,
                show_back_nav: true
            })
        }
    }, [vault_info]);

    return (
        <div className="h-full w-full flex flex-col">
            <div className={classNames({
                "overflow-y-scroll text-sm lg:text-lg pt-4 pb-2 px-4 lg:px-8": true,
                "flex flex-col": true,
                "gap-12 divide-current divide-y": true,
            })}>
                <span className="flex flex-row justify-between w-full">
                    <span className="flex flex-col">
                        <span>CONST Balance</span>
                        <span>
                            {vault_metadata && vault_metadata.native_balance}
                            {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                        </span>
                    </span>
                    <span className="flex flex-row gap-2 py-2">
                        <button className="items-center border border-current rounded w-24">
                            Deposit
                        </button>
                        <button className="items-center border border-current rounded w-24">
                            Withdraw
                        </button>
                    </span>
                </span>

                <span className="flex flex-row justify-between w-full">
                    <span className="flex flex-col">
                        <span>USDC Balance</span>
                        <span>
                            {vault_metadata && vault_metadata.usdc_balance}
                            {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                        </span>
                    </span>
                    <span className="flex flex-row gap-2 py-2">
                        <button className="items-center border border-current rounded w-24">
                            Deposit
                        </button>
                        <button className="items-center border border-current rounded w-24">
                            Withdraw
                        </button>
                    </span>
                </span>

                <span className="flex flex-row justify-between w-full">
                    <span className="flex flex-col">
                        <span>Delegated</span>
                        <span>{vault_metadata && vault_metadata.total_staked}
                            {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                        </span>
                    </span>
                    <span className="flex flex-row py-2">
                        <StakeActionsDropdown />
                    </span>
                </span>

                <span className="flex flex-row justify-between w-full">
                    <span className="flex flex-col">
                        <span>Rewards</span>
                        <span>{vault_metadata && vault_metadata.acc_rewards}
                            {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}</span>
                    </span>
                    <span className="flex flex-row py-2">
                        <button className="items-center border border-current rounded w-24">
                            Claim
                        </button>
                    </span>
                </span>

                <span className="flex flex-row justify-between w-full">
                    <span className="flex flex-col">
                        <span>Unbonding</span>
                        <span> {vault_metadata && vault_metadata.unbonding}
                            {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}</span>
                    </span>
                    <span className="flex flex-row py-2">
                        <button className="items-center border border-current rounded w-24 text-sm lg:text-lg">
                            Info
                        </button>
                    </span>
                </span>
            </div>
            <span className="mt-auto p-4">
                <button className="text-sm lg:text-lg items-center border border-current rounded p-2">
                    Request Liquidity
                </button>
            </span>
        </div>
    )
}
