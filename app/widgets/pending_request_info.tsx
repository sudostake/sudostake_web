import { FaCircle } from "react-icons/fa";
import { LiquidityRequestTypes, VaultIndex } from "../utils/interface";
import { useRecoilValue } from "recoil";
import { selectedChainState } from "../state";
import { SECONDS_IN_A_DAY } from "../utils/constants";
import { format_duration } from "../utils/conversion";

type ComponentProps = {
    vault_info: VaultIndex
}

export default function PendingLiquidityRequestInfo({ vault_info }: ComponentProps) {
    const chainInfo = useRecoilValue(selectedChainState);
    const request_currency = chainInfo.request_denoms.find(currency => currency.coinMinimalDenom === vault_info.requested_amount.denom);
    const formatted_duration = (vault_info.request_type !== LiquidityRequestTypes.fixed_interest_rental &&
        format_duration(vault_info.duration_in_seconds)
    )

    return (
        <table className="table-fixed caption-top text-sm text-left">
            <tbody>
                <tr>
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

                <tr>
                    <th scope="row" className="py-4 font-medium whitespace-nowrap">
                        <span className="font-medium">Open</span>
                    </th>
                    <td className="py-4 text-right">
                        <span>{vault_info.request_type.split('_').map(d => d.toUpperCase()).join(' ')}</span>
                    </td>
                </tr>



                {
                    vault_info.request_type === LiquidityRequestTypes.fixed_interest_rental &&
                    <tr>
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span>Claimable Rewards</span>
                        </th>
                        <td className="py-4 text-right">
                            <span>{vault_info.claimable_tokens} {chainInfo.src.stakeCurrency.coinDenom}</span>
                        </td>
                    </tr>
                }

                {vault_info.request_type !== LiquidityRequestTypes.fixed_interest_rental &&
                    <tr>
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span>Duration</span>
                        </th>
                        <td className="py-4 text-right">
                            <span>{formatted_duration}</span>
                        </td>
                    </tr>
                }

                {vault_info.request_type === LiquidityRequestTypes.fixed_term_loan &&
                    <tr>
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

                <tr>
                    <th scope="row" className="py-4 font-medium whitespace-nowrap">
                        <span>Cost</span>
                    </th>
                    <td className="py-4 text-right flex flex-col">
                        <span>{vault_info.requested_amount.amount.toLocaleString('en-us')} {request_currency.coinDenom}</span>
                        <span className="italic">
                            Comission <span>({(0.003 * vault_info.requested_amount.amount).toLocaleString('en-us')} {request_currency.coinDenom})</span>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}