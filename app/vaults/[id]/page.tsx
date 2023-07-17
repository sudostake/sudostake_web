'use client'

import { useQueryValidatorList, useQueryVaultMetaData } from "@/app/hooks/use_query";
import { db } from "@/app/services/firebase_client";
import { ValidatorInfo, ValidatorUnbondingInfo, WalletStatusType, selectedChainState, toolBarState, validatorListState, walletState } from "@/app/state";
import classNames from "classnames";
import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DepositDialog from "./dialogs/deposit";
import WithdrawDialog from "./dialogs/withdraw";
import { useAcceptLiquidityRequest, useClaimRewards, useClosePendingLiquidityRequest } from "@/app/hooks/use_exec";
import ManageStakeActionsMenu from "./widgets/stake_actions";
import { IObjectMap, VaultInfo } from "@/app/utils/generic_interface";
import { convertMicroDenomToDenom } from "@/app/utils/conversion";
import UnbondingInfoDialog from "./dialogs/undelegations_info";
import RequestLiquidityFlow from "./request_liquidity_flow";
import PendingLiquidityRequestInfo from "@/app/widgets/pending_request_info";
import ActiveLiquidityRequestInfo from "@/app/widgets/active_request_info";

export default function Vault({ params }: { params: { id: string } }) {
    const setToolBarState = useSetRecoilState(toolBarState);
    const { status, address: vault_owner } = useRecoilValue(walletState);
    const setValidatorListState = useSetRecoilState(validatorListState);
    const chainInfo = useRecoilValue(selectedChainState);
    const [vault_info, setVaultInfo] = useState<VaultInfo | null>(null);
    const { vault_metadata } = useQueryVaultMetaData(params.id);
    const { validator_list } = useQueryValidatorList();
    const { mutate: claimRewards, isLoading } = useClaimRewards(params.id);
    const { mutate: close_request, isLoading: isCloseRequestLoading } = useClosePendingLiquidityRequest(params.id);
    const { mutate: accept_request, isLoading: isAcceptLoading } = useAcceptLiquidityRequest(params.id);
    const usd_currency = chainInfo.request_denoms.find(currency => currency.coinDenom === 'USDC');

    // Check who is viewing the vault
    const is_owner = vault_owner === (vault_info && vault_info.config.owner);

    // Listen to vault info from firebase
    useEffect(() => {
        if (status === WalletStatusType.connected) {
            return onSnapshot(doc(db, "/vaults", params.id), (doc) => {
                const info = doc.data() as VaultInfo;
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
        const validators_with_unbondings_map: IObjectMap<ValidatorUnbondingInfo> = {};

        if (Boolean(vault_metadata)) {
            // Update validators_with_delegations_map
            vault_metadata.all_delegations.forEach((info) => {
                const address: string = info['validator'];
                const amount = convertMicroDenomToDenom(info['amount']['amount'], chainInfo.src.stakeCurrency.coinDecimals)
                validators_with_delegations_map[address] = {
                    name: '',
                    address,
                    delegated_amount: `${amount}`
                };
            });

            // Update validators_with_unbondings_map
            vault_metadata.unbonding_details.unbonding_list.forEach((info) => {
                validators_with_unbondings_map[info.address] = { ...info }
            })
        }

        // Update validators_without_delegations_list, 
        // jailed_validator_list and validators_with_delegations
        validator_list.forEach((info) => {
            const address = info['operator_address'];
            const is_jailed = info['jailed'];
            const name = info['description']['moniker'];

            // Update the names on validators_with_unbondings_map
            if (Boolean(validators_with_unbondings_map[address])) {
                validators_with_unbondings_map[address].name = name;
            }

            // Update validator list groups
            if (!Boolean(validators_with_delegations_map[address])) {
                if (!is_jailed) {
                    validators_without_delegations_list.push({
                        name,
                        address,
                        delegated_amount: '0.00'
                    });
                } else {
                    jailed_validator_list.push({
                        name,
                        address,
                        delegated_amount: '0.00'
                    });
                }
            } else {
                // Update the names on validators_with_delegations_map
                validators_with_delegations_map[address].name = name;
            }
        });

        // setValidatorListState
        setValidatorListState({
            validator_unbonding_list: Object.values(validators_with_unbondings_map),
            validator_list: [
                ...Object.values(validators_with_delegations_map).sort((a, b) => Number(b.delegated_amount) - Number(a.delegated_amount)),
                ...validators_without_delegations_list,
                ...jailed_validator_list
            ],
        });

    }, [vault_metadata, validator_list, setValidatorListState, chainInfo]);

    return (
        <div className={classNames({
            "h-full overflow-y-scroll text-sm lg:text-base p-4 lg:px-8": true,
            "flex flex-col": true,
            "w-full xl:w-3/4 xl:border-r xl:border-current": true,
        })}>
            {
                vault_metadata &&
                <>
                    <span className="flex flex-row justify-between w-full pb-4">
                        <span className={is_owner ? "flex flex-col" : "flex flex-row justify-between w-full"}>
                            <span>{chainInfo.src.stakeCurrency.coinDenom}</span>
                            <span>
                                {vault_metadata && Number(vault_metadata.native_balance).toFixed(2)}
                                {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                            </span>
                        </span>
                        {
                            is_owner &&
                            <span className="flex flex-row gap-2 py-2">
                                <DepositDialog to_address={params.id} currency={chainInfo.src.stakeCurrency} />
                                <WithdrawDialog from_address={params.id} currency={chainInfo.src.stakeCurrency} />
                            </span>
                        }
                    </span>

                    <span className="flex flex-row justify-between w-full py-4">
                        <span className={is_owner ? "flex flex-col" : "flex flex-row justify-between w-full"}>
                            <span>{usd_currency.coinDenom}</span>
                            <span>
                                {vault_metadata && Number(vault_metadata.usdc_balance).toFixed(2)}
                                {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                            </span>
                        </span>
                        {
                            is_owner &&
                            <span className="flex flex-row gap-2 py-2">
                                <DepositDialog to_address={params.id} currency={usd_currency} />
                                <WithdrawDialog from_address={params.id} currency={usd_currency} />
                            </span>
                        }
                    </span>

                    <span className="flex flex-row justify-between w-full py-4">
                        <span className={is_owner ? "flex flex-col" : "flex flex-row justify-between w-full"}>
                            <span>Delegated</span>
                            <span>
                                {vault_metadata && Number(vault_metadata.total_staked).toFixed(2)}
                                {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                            </span>
                        </span>
                        {is_owner && <ManageStakeActionsMenu vault_address={params.id} />}
                    </span>

                    <span className="flex flex-row justify-between w-full py-4">
                        <span className={is_owner ? "flex flex-col" : "flex flex-row justify-between w-full"}>
                            <span>Rewards</span>
                            <span>
                                {vault_metadata && Number(vault_metadata.acc_rewards).toFixed(2)}
                                {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                            </span>
                        </span>
                        {
                            is_owner &&
                            <span className="flex flex-row py-2">
                                <button
                                    type="button"
                                    disabled={vault_metadata && Number(vault_metadata.acc_rewards) <= 0}
                                    onClick={() => { claimRewards() }} className={classNames({
                                        "px-2 h-10 inline-flex items-center justify-center border border-current rounded hover:ring-2 hover:ring-offset-2 text-xs lg:text-sm lg:font-medium": true,
                                        "w-24": !isLoading
                                    })}>
                                    {
                                        isLoading && <>
                                            <FaSpinner className="w-4 h-4 mr-3 spinner" />
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
                        }
                    </span>

                    <span className="flex flex-row justify-between w-full py-4">
                        <span className={is_owner ? "flex flex-col" : "flex flex-row justify-between w-full"}>
                            <span>Unbonding</span>
                            <span> {vault_metadata && vault_metadata.unbonding_details.total_unbonding_amount.toFixed(2)}
                                {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}</span>
                        </span>
                        {
                            is_owner &&
                            <span className="flex flex-row py-2">
                                <UnbondingInfoDialog />
                            </span>
                        }
                    </span>

                    {is_owner && vault_info && (!Boolean(vault_info.liquidity_request)) &&
                        <span className="py-20">
                            <RequestLiquidityFlow vault_address={params.id} />
                        </span>
                    }

                    {vault_info && Boolean(vault_info.liquidity_request) && vault_info.index.status === 'pending' &&
                        <div className="flex w-full mt-8 flex-col text-sm lg:text-base">
                            <h2 className="flex flex-row items-center justify-between border-b border-current font-medium py-4">
                                <span>Request Details</span>
                                {
                                    is_owner && <button onClick={() => { close_request() }} className={classNames({
                                        "h-10 inline-flex px-4 items-center border border-current rounded-lg hover:ring-2 hover:ring-offset-2 text-xs lg:text-sm lg:font-medium": true,
                                    })}>
                                        {
                                            isCloseRequestLoading && <>
                                                <FaSpinner className="w-5 h-5 mr-3 spinner" />
                                                <span>Cancelling Request...</span>
                                            </>
                                        }
                                        {
                                            !isCloseRequestLoading && <>
                                                <span>Cancel Request</span>
                                            </>
                                        }
                                    </button>
                                }

                                {
                                    !is_owner &&
                                    <button onClick={() => { accept_request(vault_info.index.requested_amount) }}
                                        className={classNames({
                                            "h-10 inline-flex px-4 items-center text-xs lg:text-sm lg:font-medium": true,
                                            "border border-current rounded-lg hover:ring-2 hover:ring-offset-2 ": true
                                        })}>
                                        {
                                            isAcceptLoading && <>
                                                <FaSpinner className="w-5 h-5 mr-3 spinner" />
                                                <span>Accepting Request...</span>
                                            </>
                                        }
                                        {
                                            !isAcceptLoading && <>
                                                <span>Accept Request</span>
                                            </>
                                        }
                                    </button>
                                }
                            </h2>

                            <PendingLiquidityRequestInfo vault_info={vault_info} />
                        </div>
                    }

                    {vault_info && Boolean(vault_info.liquidity_request) && vault_info.index.status === 'active' &&
                        <div className="flex w-full mt-8 flex-col text-sm lg:text-base">
                            <ActiveLiquidityRequestInfo vault_info={vault_info} />
                        </div>
                    }
                </>
            }

            {
                !vault_metadata &&
                <div className="flex w-full h-full items-center justify-center">
                    <h2 className="flex items-center"><span>Connect wallet to view vault details</span></h2>
                </div>
            }
        </div>
    )
}
