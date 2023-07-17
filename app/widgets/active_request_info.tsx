import { FaCircle } from "react-icons/fa";
import { LiquidityRequestTypes, VaultInfo } from "../utils/generic_interface";
import { useRecoilValue } from "recoil";
import { selectedChainState } from "../state";
import { SECONDS_IN_A_DAY } from "../utils/constants";

type ComponentProps = {
    vault_info: VaultInfo
}

export default function ActiveLiquidityRequestInfo({ vault_info }: ComponentProps) {
    const chainInfo = useRecoilValue(selectedChainState);
    const request_currency = chainInfo.request_denoms.find(currency => currency.coinMinimalDenom === vault_info.index.requested_amount.denom);

    return (
        <table className="table-fixed caption-top text-sm text-left">
            <tbody>
                <tr className="border-b border-current border-dashed">
                    <th scope="row" className="py-4 font-medium whitespace-nowrap">
                        <span className="font-medium">Status</span>
                    </th>
                    <td className="py-4">
                        <span className="flex flex-row-reverse items-center">
                            <span>{vault_info.index.status.toUpperCase()}</span>
                            <FaCircle className="w-4 h-4 mr-3 text-green-500" />
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

                {vault_info.index.request_type !== LiquidityRequestTypes.fixed_term_loan &&
                    <tr>
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span>Includes Voting Rights</span>
                        </th>
                        <td className="py-4 text-right">
                            <span>{vault_info.index.can_cast_vote ? 'YES' : 'NO'}</span>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );
}