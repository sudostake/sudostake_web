'use client'

import { useQueryValidatorList, useQueryVaultMetaData } from "@/app/hooks/use_query";
import { db } from "@/app/services/firebase_client";
import { ValidatorInfo, WalletStatusType, selectedChainState, toolBarState, validatorListState, walletState } from "@/app/state";
import classNames from "classnames";
import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DepositDialog from "./dialogs/deposit";
import WithdrawDialog from "./dialogs/withdraw_dialog";
import { useClaimRewards } from "@/app/hooks/use_exec";
import ManageStakeActionsMenu from "./dialogs/stake_actions";
import { IObjectMap } from "@/app/utils/generic_interface";
import { convertMicroDenomToDenom } from "@/app/utils/conversion";

export default function Vault({ params }: { params: { id: string } }) {
    const setToolBarState = useSetRecoilState(toolBarState);
    const { status } = useRecoilValue(walletState);
    const setValidatorListState = useSetRecoilState(validatorListState);
    const chainInfo = useRecoilValue(selectedChainState);
    const [vault_info, setVaultInfo] = useState<any | null>(null);
    const { vault_metadata } = useQueryVaultMetaData(params.id);
    const { validator_list } = useQueryValidatorList();
    const { mutate: claimRewards, isLoading } = useClaimRewards(params.id);

    // Listen to vault info from firebase
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

    // Set toolbar state
    useEffect(() => {
        if (Boolean(vault_info)) {
            setToolBarState({
                title: `Vault #${vault_info.config.index_number}`,
                show_back_nav: true
            })
        }
    }, [vault_info, setToolBarState]);

    // Update validatorListState
    useEffect(() => {
        const validators_without_delegations_list: ValidatorInfo[] = [];
        const jailed_validator_list: ValidatorInfo[] = [];
        const validators_with_delegations_map: IObjectMap<ValidatorInfo> = {};

        // Update validators_with_delegations_map
        if (Boolean(vault_metadata)) {
            const validators_with_delegations_list: any[] = vault_metadata.all_delegations;
            validators_with_delegations_list.forEach((info) => {
                const address: string = info['validator'];
                const amount = convertMicroDenomToDenom(info['amount']['amount'], chainInfo.src.stakeCurrency.coinDecimals)
                validators_with_delegations_map[address] = {
                    name: '',
                    address,
                    delegated_amount: `${amount}`
                };
            });
        }

        // Update validators_without_delegations_list and jailed_validator_list
        // as well as the names of the validators_with_delegations
        validator_list.forEach((info) => {
            const operator_address = info['operator_address'];
            const is_jailed = info['jailed'];
            const name = info['moniker'];

            if (!Boolean(validators_with_delegations_map[operator_address])) {
                if (!is_jailed) {
                    validators_without_delegations_list.push({
                        name,
                        address: operator_address,
                        delegated_amount: '0.00'
                    });
                } else {
                    jailed_validator_list.push({
                        name,
                        address: operator_address,
                        delegated_amount: '0.00'
                    });
                }
            } else {
                validators_with_delegations_map[operator_address].name = name;
            }
        });

        // setValidatorListState
        setValidatorListState([
            // sort this from largest to smallest
            ...Object.values(validators_with_delegations_map).sort((a, b) => Number(b.delegated_amount) - Number(a.delegated_amount)),
            ...validators_without_delegations_list,
            ...jailed_validator_list
        ]);

    }, [vault_metadata, validator_list, setValidatorListState, chainInfo]);

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
                            {vault_metadata && Number(vault_metadata.native_balance).toFixed(2)}
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
                            {vault_metadata && Number(vault_metadata.usdc_balance).toFixed(2)}
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
                        <span>{vault_metadata && Number(vault_metadata.total_staked).toFixed(2)}
                            {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                        </span>
                    </span>
                    <ManageStakeActionsMenu vault_address={params.id} />
                </span>

                <span className="flex flex-row justify-between w-full">
                    <span className="flex flex-col">
                        <span>Rewards</span>
                        <span>{vault_metadata && Number(vault_metadata.acc_rewards).toFixed(2)}
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
                        <span> {vault_metadata && Number(vault_metadata.unbonding).toFixed(2)}
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
