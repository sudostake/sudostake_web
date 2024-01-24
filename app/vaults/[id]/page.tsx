'use client'

import { useQueryValidatorList, useQueryVaultMetaData } from "@/app/hooks/use_query";
import { ValidatorInfo, ValidatorUnbondingInfo, WalletStatusTypes, selectedChainState, toolBarState, validatorListState, walletState } from "@/app/state";
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
import ConnectWalletOptions from "@/app/widgets/connect_wallet_options";

export default function Vault({ params }: { params: { id: string } }) {
    const setToolBarState = useSetRecoilState(toolBarState);
    const { address: current_user, status } = useRecoilValue(walletState);
    const setValidatorListState = useSetRecoilState(validatorListState);
    const chainInfo = useRecoilValue(selectedChainState);
    const { vault_metadata } = useQueryVaultMetaData(params.id);
    const { validator_list } = useQueryValidatorList();
    const usd_currency = chainInfo && chainInfo.request_denoms.find(currency => currency.coinDenom === 'USDC');

    // Here we index the vault_info from the vault metadata to also include state from
    // active liquidity request option
    const vault_info = (vault_metadata && chainInfo && index_vault_data({
        vault_info: vault_metadata.vault_info,
        staking_info: vault_metadata.staking_info,
        rpc: chainInfo.src.rpc,
        include_request_state: true
    }));

    // Vault actions
    const { mutate: claimRewards, isLoading: isClaimRewardsLoading } = useClaimRewards(params.id);
    const { mutate: close_request, isLoading: isCloseRequestLoading } = useClosePendingLiquidityRequest(params.id);
    const { mutate: accept_request, isLoading: isAcceptLoading } = useAcceptLiquidityRequest(params.id);
    const { mutate: repay_loan, isLoading: isRepayLoanLoading } = useRepayLoan(params.id);
    const { mutate: liquidate_collateral, isLoading: isLiquidatingCollateralLoading } = useLiquidateCollateral(params.id);

    // Vault conditions
    const is_owner = current_user === (vault_info && vault_info.owner);
    const is_lender = current_user === (vault_info &&
        vault_info.liquidity_request_status === 'active' &&
        vault_info.lender);

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

    const can_view_unbonding_info = is_owner || (is_lender && has_expired_fixed_term_loan)
    const native_balance = vault_metadata && vault_metadata.native_balance;
    const accumulated_rewards = vault_metadata && vault_metadata.acc_rewards;

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
                    delegated_amount: amount
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
            const bonded_status = info['status'];
            const name = info['description']['moniker'];

            // Update the names on validators_with_unbondings_map
            if (Boolean(validators_with_unbondings_map[address])) {
                validators_with_unbondings_map[address].name = name;
            }

            // Update validator list groups
            if (!Boolean(validators_with_delegations_map[address])) {
                if (!is_jailed && bonded_status === "BOND_STATUS_BONDED") {
                    validators_without_delegations_list.push({
                        name,
                        address,
                        delegated_amount: 0
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
            ],
        });

    }, [vault_metadata, validator_list, setValidatorListState, chainInfo]);

    const vault_details_view = () =>
        <div className="flex flex-col px-4 lg:px-8">
            <span className="flex flex-row justify-between w-full pb-4">
                <span className={is_owner ? "flex flex-col" : "flex flex-row justify-between w-full"}>
                    <span>{chainInfo.src.stakeCurrency.coinDenom}</span>
                    <span>
                        {native_balance.toLocaleString('en-us')}
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
                        {vault_metadata && vault_metadata.usdc_balance.toLocaleString('en-us')}
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
                        {vault_metadata && vault_metadata.total_staked.toLocaleString('en-us')}
                        {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                    </span>
                </span>
                {is_owner && <ManageStakeActionsMenu vault_address={params.id} />}
            </span>

            <span className="flex flex-row justify-between w-full py-4">
                <span className={can_claim_rewards ? "flex flex-col" : "flex flex-row justify-between w-full"}>
                    <span>Rewards</span>
                    <span>
                        {accumulated_rewards.toLocaleString('en-us')}
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
                                "px-2 inline-flex justify-center items-center border border-zinc-400 dark:border-zinc-700": true,
                                "rounded-lg hover:ring-1 hover:ring-offset-1 h-9 text-xs lg:text-sm lg:font-medium": true,
                                "w-24": !isClaimRewardsLoading
                            })}>
                            {
                                isClaimRewardsLoading && <>
                                    <FaSpinner className="w-4 h-4 mr-3 spinner" />
                                    <span>Claiming</span>
                                </>
                            }
                            {
                                !isClaimRewardsLoading && <>
                                    <span>Claim</span>
                                </>
                            }
                        </button>
                    </span>
                }
            </span>

            <span className="flex flex-row justify-between w-full py-4">
                <span className={can_view_unbonding_info ? "flex flex-col" : "flex flex-row justify-between w-full"}>
                    <span>Unbonding</span>
                    <span>
                        {vault_metadata && vault_metadata.unbonding_details.total_unbonding_amount.toLocaleString('en-us')}
                        {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                    </span>
                </span>
                {
                    can_view_unbonding_info &&
                    <UnbondingInfoDialog />
                }
            </span>
        </div>;

    return (
        <div className={classNames({
            "h-full overflow-y-scroll text-sm lg:text-base py-8": true,
            "flex flex-col": true,
            "w-full xl:w-3/4 xl:border-r xl:border-zinc-400 dark:xl:border-zinc-700": true,
        })}>
            {
                vault_metadata && status === WalletStatusTypes.connected &&
                <>
                    {vault_details_view()}

                    {is_owner && vault_info && vault_info.liquidity_request_status === 'idle' &&
                        <span className="py-20 px-4 lg:px-8">
                            <RequestLiquidityFlow
                                vault_address={params.id}
                                from_code_id={vault_info.from_code_id} />
                        </span>
                    }

                    {vault_info && vault_info.liquidity_request_status === 'pending' &&
                        <div className="flex w-full mt-8 flex-col text-sm lg:text-base">
                            <h2 className="flex flex-row items-center justify-between border-b border-t border-zinc-400 dark:border-zinc-700 px-4 lg:px-8 font-medium py-4">
                                <span>Option Details</span>
                                {
                                    is_owner &&
                                    <button onClick={() => { close_request() }} className={classNames({
                                        "h-9 inline-flex px-4 items-center border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 text-xs lg:text-sm lg:font-medium": true,
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
                                            "border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 ": true
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

                            <div className="flex flex-col w-full px-4 lg:px-8 mt-4">
                                <PendingLiquidityRequestInfo vault_info={vault_info} show_tvl={false} />
                            </div>
                        </div>
                    }

                    {vault_info && vault_info.liquidity_request_status === 'active' &&
                        <div className="flex w-full mt-8 flex-col text-sm lg:text-base">
                            <h2 className="flex flex-row items-center justify-between border-b border-t border-zinc-400 dark:border-zinc-700 px-4 lg:px-8 font-medium py-4">
                                <span>Option Details</span>
                                {
                                    can_repay_loan &&
                                    <button onClick={() => { repay_loan() }} className={classNames({
                                        "h-9 inline-flex px-4 items-center border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 text-xs lg:text-sm lg:font-medium": true,
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

                            <div className="flex flex-col w-full px-4 lg:px-8 mt-4">
                                <ActiveLiquidityRequestInfo vault_info={vault_info} />
                            </div>

                            {
                                has_expired_fixed_term_loan &&
                                <div className={classNames({
                                    "flex flex-col": true,
                                    "mt-8 px-4 lg:px-8": true,
                                })}>
                                    <div className="text-red-500">
                                        {`Your option has expired and ${is_owner ? 'you' : 'the vault owner'} did not repay the principal + interest to ${is_owner ? 'the lender' : 'you'}.`}
                                    </div>
                                    <div className="mt-4">
                                        <button onClick={() => { liquidate_collateral() }} className={classNames({
                                            "inline-flex items-center text-xs text-red-500 lg:text-sm lg:font-medium": true,
                                            "h-9 px-4": true,
                                            "border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1": true,
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
                status !== WalletStatusTypes.connected &&
                <ConnectWalletOptions title="Connect to see vault details." />
            }
        </div>
    );
}
