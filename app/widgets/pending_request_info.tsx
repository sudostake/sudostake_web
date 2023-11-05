import { FaCircle } from "react-icons/fa";
import { LiquidityRequestTypes, VaultIndex } from "../utils/interface";
import { useRecoilValue } from "recoil";
import { selectedChainState } from "../state";
import { SECONDS_IN_A_DAY } from "../utils/constants";

type ComponentProps = {
    vault_info: VaultIndex,
    show_tvl: boolean
}

export default function PendingLiquidityRequestInfo({ vault_info, show_tvl }: ComponentProps) {
    const chainInfo = useRecoilValue(selectedChainState);
    const request_currency = chainInfo.request_denoms.find(currency => currency.coinMinimalDenom === vault_info.requested_amount.denom);

    // Calculate duration for fixed term rental options
    function format_duration(duration_in_seconds: number): string {
        const days = Math.round(duration_in_seconds / SECONDS_IN_A_DAY)
        return `${days} ${days > 1 ? 'days' : 'day'}`
    }
    const formatted_duration = (vault_info.request_type !== LiquidityRequestTypes.fixed_interest_rental &&
        format_duration(vault_info.duration_in_seconds)
    )

    return (
        <table className="table-fixed caption-top text-sm text-left">
            <tbody>
                {
                    !show_tvl &&
                    <tr className="border-b border-current border-dashed">
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span className="font-medium">Status</span>
                        </th>
                        <td className="py-4">
                            <span className="flex flex-row-reverse items-center">
                                <span>{vault_info.liquidity_request_status.toUpperCase()}</span>
                                <FaCircle className="w-4 h-4 mr-3 text-orange-500" />
                            </span>
                        </td>
                    </tr>
                }

                {
                    show_tvl &&
                    <tr className="border-b border-current border-dashed">
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span className="font-medium">Total Value Staked</span>
                        </th>
                        <td className="py-4 text-right">
                            <span>{vault_info.tvl.toLocaleString('en-us')} {chainInfo.src.stakeCurrency.coinDenom}</span>
                        </td>
                    </tr>
                }

                <tr className="border-b border-current border-dashed">
                    <th scope="row" className="py-4 font-medium whitespace-nowrap">
                        <span className="font-medium">Option Type</span>
                    </th>
                    <td className="py-4 text-right">
                        <span>{vault_info.request_type.split('_').map(d => d.toUpperCase()).join(' ')}</span>
                    </td>
                </tr>

                <tr className="border-b border-current border-dashed">
                    <th scope="row" className="py-4 font-medium whitespace-nowrap">
                        <span>Option Cost</span>
                    </th>
                    <td className="py-4 text-right">
                        <span>{vault_info.requested_amount.amount.toLocaleString('en-us')} {request_currency.coinDenom}</span>
                    </td>
                </tr>

                <tr className="border-b border-current border-dashed">
                    <th scope="row" className="py-4 font-medium whitespace-nowrap">
                        <span>Comission</span>
                    </th>
                    <td className="py-4 text-right">
                        0.3% <span>({(0.003 * vault_info.requested_amount.amount).toLocaleString('en-us')} {request_currency.coinDenom})</span>
                    </td>
                </tr>

                {
                    vault_info.request_type === LiquidityRequestTypes.fixed_interest_rental &&
                    <tr className="border-b border-current border-dashed">
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span>Claimable Staking Rewards</span>
                        </th>
                        <td className="py-4 text-right">
                            <span>{vault_info.claimable_tokens} {chainInfo.src.stakeCurrency.coinDenom}</span>
                        </td>
                    </tr>
                }

                {vault_info.request_type !== LiquidityRequestTypes.fixed_interest_rental &&
                    <tr className="border-b border-current border-dashed">
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span>Duration</span>
                        </th>
                        <td className="py-4 text-right">
                            <span>{formatted_duration}</span>
                        </td>
                    </tr>
                }

                {vault_info.request_type === LiquidityRequestTypes.fixed_term_loan &&
                    <tr className="border-b border-current border-dashed">
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span>Interest Amount</span>
                        </th>
                        <td className="py-4 text-right">
                            <span>{vault_info.interest_amount} {request_currency.coinDenom}</span>
                        </td>
                    </tr>
                }

                {vault_info.request_type === LiquidityRequestTypes.fixed_term_loan &&
                    <tr>
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span>Collateral Amount</span>
                        </th>
                        <td className="py-4 text-right">
                            <span>{vault_info.collateral_amount.toLocaleString('en-us')} {chainInfo.src.stakeCurrency.coinDenom}</span>
                        </td>
                    </tr>
                }

                {vault_info.request_type !== LiquidityRequestTypes.fixed_term_loan &&
                    <tr>
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span>Includes Voting Rights</span>
                        </th>
                        <td className="py-4 text-right">
                            <span>{vault_info.can_cast_vote ? 'YES' : 'NO'}</span>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );
}