'use client'

import { useQueryVaultMetaData } from "@/app/hooks/use_query";
import { db } from "@/app/services/firebase_client";
import { WalletStatusType, selectedChainState, toolBarState, walletState } from "@/app/state";
import classNames from "classnames";
import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import StakeActionsDropdown from "./widgets/stake_actions";
import DepositDialog from "./dialogs/deposit_dialog";
import WithdrawDialog from "./dialogs/withdraw_dialog";
import { useClaimRewards } from "@/app/hooks/use_exec";

export default function Vault({ params }: { params: { id: string } }) {
    const setToolBarState = useSetRecoilState(toolBarState);
    const { status } = useRecoilValue(walletState);
    const chainInfo = useRecoilValue(selectedChainState);
    const [vault_info, setVaultInfo] = useState<any | null>(null);
    const { vault_metadata } = useQueryVaultMetaData(params.id);
    const { mutate: claimRewards, isLoading } = useClaimRewards(params.id);

    useEffect(() => {
        if (status === WalletStatusType.connected) {
            return onSnapshot(doc(db, "/vaults", params.id), (doc) => {
                const info = doc.data();
                setVaultInfo(info);
            });
        } else {
            setVaultInfo(null);
        }
    }, [status, params.id]);

    useEffect(() => {
        if (Boolean(vault_info)) {
            setToolBarState({
                title: `Vault #${vault_info.config.index_number}`,
                show_back_nav: true
            })
        }
    }, [vault_info, setToolBarState]);

    return (
        <div className="h-full w-full flex flex-col">
            <div className={classNames({
                "overflow-y-scroll text-sm lg:text-lg pt-4 pb-2 px-4 lg:px-8": true,
                "flex flex-col": true,
                "gap-12 divide-slate-500 divide-y": true,
            })}>
                <span className="flex flex-row justify-between w-full">
                    <span className="flex flex-col">
                        <span>{chainInfo.src.stakeCurrency.coinDenom}</span>
                        <span>
                            {vault_metadata && vault_metadata.native_balance}
                            {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                        </span>
                    </span>
                    <span className="flex flex-row gap-2 py-2">
                        <DepositDialog to_address={params.id} currency={chainInfo.src.stakeCurrency} />
                        <WithdrawDialog from_address={params.id} currency={chainInfo.src.stakeCurrency} />
                    </span>
                </span>

                <span className="flex flex-row justify-between w-full">
                    <span className="flex flex-col">
                        <span>{chainInfo.usdc.coinDenom}</span>
                        <span>
                            {vault_metadata && vault_metadata.usdc_balance}
                            {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                        </span>
                    </span>
                    <span className="flex flex-row gap-2 py-2">
                        <DepositDialog to_address={params.id} currency={chainInfo.usdc} />
                        <WithdrawDialog from_address={params.id} currency={chainInfo.usdc} />
                    </span>
                </span>

                <span className="flex flex-row justify-between w-full">
                    <span className="flex flex-col">
                        <span>Delegated</span>
                        <span>{vault_metadata && vault_metadata.total_staked}
                            {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                        </span>
                    </span>
                    <StakeActionsDropdown />
                </span>

                <span className="flex flex-row justify-between w-full">
                    <span className="flex flex-col">
                        <span>Rewards</span>
                        <span>{vault_metadata && vault_metadata.acc_rewards}
                            {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}</span>
                    </span>
                    <span className="flex flex-row py-2">
                        <button
                            type="button"
                            disabled={vault_metadata && Number(vault_metadata.acc_rewards) <= 0}
                            onClick={() => { claimRewards() }} className={classNames({
                                "px-2 inline-flex items-center justify-center border border-current rounded text-xs lg:text-sm lg:font-medium": true,
                                "w-24": !isLoading
                            })}>
                            {
                                isLoading && <>
                                    <FaSpinner className="w-5 h-5 mr-3 spinner" />
                                    <span>Claiming</span>
                                </>
                            }
                            {
                                !isLoading && <>
                                    <span>Claim</span>
                                </>
                            }
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
                        <button type="button"
                            disabled={vault_metadata && Number(vault_metadata.unbonding) <= 0}
                            className="w-24 items-center border border-current rounded text-xs lg:text-sm lg:font-medium">
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
