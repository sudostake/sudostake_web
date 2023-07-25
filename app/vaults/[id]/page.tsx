'use client'

import { useQueryValidatorList, useQueryVaultMetaData } from "@/app/hooks/use_query";
import { ValidatorInfo, ValidatorUnbondingInfo, selectedChainState, toolBarState, validatorListState, walletState } from "@/app/state";
import classNames from "classnames";
import { useEffect } from "react"
import { FaSpinner } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useAcceptLiquidityRequest, useClaimRewards, useClosePendingLiquidityRequest, useLiquidateCollateral, useRepayLoan } from "@/app/hooks/use_exec";
import ManageStakeActionsMenu from "./widgets/stake_actions";
import { IObjectMap, LiquidityRequestTypes } from "@/app/utils/interface";
import { convertMicroDenomToDenom } from "@/app/utils/conversion";
import UnbondingInfoDialog from "./dialogs/undelegations_info";
import RequestLiquidityFlow from "./request_liquidity_flow";
import PendingLiquidityRequestInfo from "@/app/widgets/pending_request_info";
import ActiveLiquidityRequestInfo from "@/app/widgets/active_request_info";
import { index_vault_data } from "@/app/services/vault_indexer";
import DepositDialogButton from "./dialogs/deposit";
import WithdrawDialogButton from "./dialogs/withdraw";

export default function Vault({ params }: { params: { id: string } }) {
    const setToolBarState = useSetRecoilState(toolBarState);
    const { address: current_user } = useRecoilValue(walletState);
    const setValidatorListState = useSetRecoilState(validatorListState);
    const chainInfo = useRecoilValue(selectedChainState);
    const { vault_metadata } = useQueryVaultMetaData(params.id);
    const { validator_list } = useQueryValidatorList();
    const usd_currency = chainInfo.request_denoms.find(currency => currency.coinDenom === 'USDC');

    // Here we index the vault_info from the vault metadata to also include state from
    // active liquidity request option
    const vault_info = (vault_metadata && index_vault_data({
        vault_info: vault_metadata.vault_info,
        rpc: chainInfo.src.rpc,
        include_request_state: true
    }));

    // Vault actions
    const { mutate: claimRewards, isLoading } = useClaimRewards(params.id);
    const { mutate: close_request, isLoading: isCloseRequestLoading } = useClosePendingLiquidityRequest(params.id);
    const { mutate: accept_request, isLoading: isAcceptLoading } = useAcceptLiquidityRequest(params.id);
    const { mutate: repay_loan, isLoading: isRepayLoanLoading } = useRepayLoan(params.id);
    const { mutate: liquidate_collateral, isLoading: isLiquidatingCollateralLoading } = useLiquidateCollateral(params.id);

    // Vault conditions
    const is_owner = current_user === (vault_info && vault_info.owner);
    const has_active_rental_option = vault_info &&
        vault_info.liquidity_request_status === 'active' &&
        vault_info.request_type !== LiquidityRequestTypes.fixed_term_loan;
    const can_claim_rewards = is_owner || has_active_rental_option;

    // Fixed term loan conditions
    const can_repay_loan = is_owner && vault_info &&
        vault_info.liquidity_request_status === 'active' &&
        vault_info.request_type === LiquidityRequestTypes.fixed_term_loan &&
        !vault_info.processing_liquidation;
    const has_expired_fixed_term_loan = vault_info &&
        vault_info.liquidity_request_status === 'active' &&
        vault_info.request_type === LiquidityRequestTypes.fixed_term_loan &&
        vault_info.end_time === 'EXPIRED';
    const native_balance = vault_metadata && vault_metadata.native_balance;
    const accumulated_rewards = vault_metadata && vault_metadata.acc_rewards;
    const total_available_native_balance = native_balance + accumulated_rewards;
    const outstanding_fixed_term_loan_debt = has_expired_fixed_term_loan && (vault_info.collateral_amount - vault_info.already_claimed);

    // Set toolbar state
    useEffect(() => {
        if (Boolean(vault_info)) {
            setToolBarState({
                title: `Vault #${vault_info.index_number}`,
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
                                {native_balance.toFixed(2)}
                                {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                            </span>
                        </span>
                        {
                            is_owner &&
                            <span className="flex flex-row gap-2 py-2">
                                <DepositDialogButton to_address={params.id} currency={chainInfo.src.stakeCurrency} />
                                <WithdrawDialogButton from_address={params.id} currency={chainInfo.src.stakeCurrency} />
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
                                <DepositDialogButton to_address={params.id} currency={usd_currency} />
                                <WithdrawDialogButton from_address={params.id} currency={usd_currency} />
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
                        <span className={can_claim_rewards ? "flex flex-col" : "flex flex-row justify-between w-full"}>
                            <span>Rewards</span>
                            <span>
                                {accumulated_rewards.toFixed(2)}
                                {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                            </span>
                        </span>
                        {
                            can_claim_rewards &&
                            <span className="flex flex-row py-2">
                                <button
                                    type="button"
                                    disabled={vault_metadata && Number(vault_metadata.acc_rewards) <= 0}
                                    onClick={() => { claimRewards(has_active_rental_option) }} className={classNames({
                                        "px-2 h-9 inline-flex items-center justify-center border border-current rounded hover:ring-2 hover:ring-offset-2 text-xs lg:text-sm lg:font-medium": true,
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
                        <span className="flex flex-col">
                            <span>Unbonding</span>
                            <span> {vault_metadata && vault_metadata.unbonding_details.total_unbonding_amount.toFixed(2)}
                                {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}</span>
                        </span>
                        <span className="flex flex-row py-2">
                            <UnbondingInfoDialog />
                        </span>
                    </span>

                    {is_owner && vault_info && vault_info.liquidity_request_status === 'idle' &&
                        <span className="py-20">
                            <RequestLiquidityFlow vault_address={params.id} />
                        </span>
                    }

                    {vault_info && vault_info.liquidity_request_status === 'pending' &&
                        <div className="flex w-full mt-8 flex-col text-sm lg:text-base">
                            <h2 className="flex flex-row items-center justify-between border-b border-current font-medium py-4">
                                <span>Request Details</span>
                                {
                                    is_owner &&
                                    <button onClick={() => { close_request() }} className={classNames({
                                        "h-9 inline-flex px-4 items-center border border-current rounded-lg hover:ring-2 hover:ring-offset-2 text-xs lg:text-sm lg:font-medium": true,
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
                                    <button onClick={() => { accept_request(vault_info.requested_amount) }}
                                        className={classNames({
                                            "h-9 inline-flex px-4 items-center text-xs lg:text-sm lg:font-medium": true,
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

                    {vault_info && vault_info.liquidity_request_status === 'active' &&
                        <div className="flex w-full mt-8 flex-col text-sm lg:text-base">
                            <h2 className="flex flex-row items-center justify-between border-b border-current font-medium py-4">
                                <span>Request Details</span>
                                {
                                    can_repay_loan &&
                                    <button onClick={() => { repay_loan() }} className={classNames({
                                        "h-9 inline-flex px-4 items-center border border-current rounded-lg hover:ring-2 hover:ring-offset-2 text-xs lg:text-sm lg:font-medium": true,
                                    })}>
                                        {
                                            isRepayLoanLoading && <>
                                                <FaSpinner className="w-5 h-5 mr-3 spinner" />
                                                <span>Repaying Loan</span>
                                            </>
                                        }
                                        {
                                            !isRepayLoanLoading && <>
                                                <span>Repay Loan</span>
                                            </>
                                        }
                                    </button>
                                }
                            </h2>

                            <ActiveLiquidityRequestInfo vault_info={vault_info} />

                            {
                                has_expired_fixed_term_loan &&
                                <div className={classNames({
                                    "flex flex-col": true,
                                    "mt-8": true,
                                })}>
                                    <div className="text-red-500">
                                        {`Your option has expired and ${is_owner ? 'you' : 'the vault owner'} did not repay the principal + interest to ${is_owner ? 'the lender' : 'you'}.`}
                                    </div>
                                    <div className="mt-4">
                                        <button onClick={() => { liquidate_collateral() }} className={classNames({
                                            "inline-flex items-center text-xs text-red-500 lg:text-sm lg:font-medium": true,
                                            "h-9 px-4": true,
                                            "border border-current rounded-lg hover:ring-2 hover:ring-offset-2": true,
                                        })}>
                                            {
                                                isLiquidatingCollateralLoading && <>
                                                    <FaSpinner className="w-5 h-5 mr-3 spinner" />
                                                    <span>Processing ...</span>
                                                </>
                                            }
                                            {
                                                !isLiquidatingCollateralLoading && <>
                                                    <span>Process Liquidation</span>
                                                </>
                                            }
                                        </button>
                                    </div>
                                </div>
                            }
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
