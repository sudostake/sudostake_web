'use client'

import { useClosePendingLiquidityRequest } from "@/app/hooks/use_exec";
import { selectedChainState } from "@/app/state";
import { SECONDS_IN_A_DAY } from "@/app/utils/constants";
import { LiquidityRequestTypes, VaultInfo } from "@/app/utils/generic_interface";
import classNames from "classnames"
import { FaCircle, FaSpinner } from "react-icons/fa"
import { useRecoilValue } from "recoil";

type ComponentProps = {
    vault_address: string,
    vault_info: VaultInfo
}

export default function PendingLiquidityRequest({ vault_address, vault_info }: ComponentProps) {
    const { mutate: close_request, isLoading } = useClosePendingLiquidityRequest(vault_address);
    const chainInfo = useRecoilValue(selectedChainState);
    const request_currency = chainInfo.request_denoms.find(currency => currency.coinMinimalDenom === vault_info.index.requested_amount.denom);

    return (
        <div className="flex flex-col text-sm lg:text-base w-full">
            <h2 className="flex flex-row items-center justify-between border-b border-current font-medium py-4">
                <span>Request Details</span>
                <button onClick={() => { close_request() }} className={classNames({
                    "py-2 h-full inline-flex px-4 items-center border border-current rounded-lg hover:ring-2 hover:ring-offset-2 text-xs lg:text-sm lg:font-medium": true,
                })}>
                    {
                        isLoading && <>
                            <FaSpinner className="w-5 h-5 mr-3 spinner" />
                            <span>Cancelling Request...</span>
                        </>
                    }
                    {
                        !isLoading && <>
                            <span>Cancel Request</span>
                        </>
                    }
                </button>
            </h2>

            <table className="table-fixed caption-top text-sm text-left">
                <tbody>
                    <tr className="border-b border-current border-dashed">
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span className="font-medium">Status</span>
                        </th>
                        <td className="py-4">
                            <span className="flex flex-row-reverse items-center">
                                <span>{vault_info.index.status.toUpperCase()}</span>
                                <FaCircle className="w-4 h-4 mr-3 text-orange-500" />
                            </span>
                        </td>
                    </tr>

                    <tr className="border-b border-current border-dashed">
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span className="font-medium">Request Type</span>
                        </th>
                        <td className="py-4 text-right">
                            <span>{vault_info.index.request_type.split('_').map(d => d.toUpperCase()).join(' ')}</span>
                        </td>
                    </tr>

                    <tr className="border-b border-current border-dashed">
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span>Requested Amount</span>
                        </th>
                        <td className="py-4 text-right">
                            <span>{vault_info.index.requested_amount.amount} {request_currency.coinDenom}</span>
                        </td>
                    </tr>

                    {
                        vault_info.index.request_type === LiquidityRequestTypes.fixed_interest_rental &&
                        <tr className="border-b border-current border-dashed">
                            <th scope="row" className="py-4 font-medium whitespace-nowrap">
                                <span>Claimable Tokens</span>
                            </th>
                            <td className="py-4 text-right">
                                <span>{vault_info.index.claimable_tokens} {chainInfo.src.stakeCurrency.coinDenom}</span>
                            </td>
                        </tr>
                    }

                    {vault_info.index.request_type !== LiquidityRequestTypes.fixed_term_loan &&
                        <tr className="border-b border-current border-dashed">
                            <th scope="row" className="py-4 font-medium whitespace-nowrap">
                                <span>Includes Voting Rights</span>
                            </th>
                            <td className="py-4 text-right">
                                <span>{vault_info.index.can_cast_vote ? 'YES' : 'NO'}</span>
                            </td>
                        </tr>
                    }

                    {vault_info.index.request_type !== LiquidityRequestTypes.fixed_interest_rental &&
                        <tr className="border-b border-current border-dashed">
                            <th scope="row" className="py-4 font-medium whitespace-nowrap">
                                <span>Duration</span>
                            </th>
                            <td className="py-4 text-right">
                                <span>{Math.round(vault_info.index.duration_in_seconds / SECONDS_IN_A_DAY)} days</span>
                            </td>
                        </tr>
                    }

                    {vault_info.index.request_type === LiquidityRequestTypes.fixed_term_loan &&
                        <tr className="border-b border-current border-dashed">
                            <th scope="row" className="py-4 font-medium whitespace-nowrap">
                                <span>Interest Amount</span>
                            </th>
                            <td className="py-4 text-right">
                                <span>{vault_info.index.interest_amount} {request_currency.coinDenom}</span>
                            </td>
                        </tr>
                    }

                    {vault_info.index.request_type === LiquidityRequestTypes.fixed_term_loan &&
                        <tr>
                            <th scope="row" className="py-4 font-medium whitespace-nowrap">
                                <span>Collateral Amount</span>
                            </th>
                            <td className="py-4 text-right">
                                <span>{vault_info.index.collateral_amount} {chainInfo.src.stakeCurrency.coinDenom}</span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
