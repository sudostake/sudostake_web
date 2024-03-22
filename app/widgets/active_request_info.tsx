import { FaCircle } from "react-icons/fa";
import { LiquidityRequestTypes, VaultIndex } from "../utils/interface";
import { useRecoilValue } from "recoil";
import { selectedChainState } from "../state";

type ComponentProps = {
    vault_info: VaultIndex,
    hide_state_info?: boolean
}

export default function ActiveLiquidityRequestInfo({ vault_info, hide_state_info = false }: ComponentProps) {
    const chainInfo = useRecoilValue(selectedChainState);
    const request_currency = chainInfo.request_denoms.find(currency => currency.coinMinimalDenom === vault_info.requested_amount.denom);

    return (
        <table className="w-full table-fixed caption-top text-sm text-left">
            <tbody>
                <tr>
                    <th scope="row" className="py-4 font-medium whitespace-nowrap">
                        <span className="font-medium">Option Type</span>
                    </th>
                    <td className="py-4 text-right">
                        <span>{vault_info.request_type.split('_').map(d => d.toUpperCase()).join(' ')}</span>
                    </td>
                </tr>

                <tr>
                    <th scope="row" className="py-4 font-medium whitespace-nowrap">
                        <span className="font-medium">Status</span>
                    </th>
                    <td className="py-4">
                        <span className="flex flex-row-reverse items-center">
                            <span>{vault_info.liquidity_request_status.toUpperCase()}</span>
                            <FaCircle className="w-4 h-4 mr-3 text-green-500" />
                        </span>
                    </td>
                </tr>

                <tr>
                    <th scope="row" className="py-4 font-medium whitespace-nowrap">
                        <span>Option Cost</span>
                    </th>
                    <td className="py-4 text-right">
                        <span>{vault_info.requested_amount.amount} {request_currency.coinDenom}</span>
                    </td>
                </tr>

                <tr>
                    <th scope="row" className="py-4 font-medium whitespace-nowrap">
                        <span>Comission</span>
                    </th>
                    <td className="py-4 text-right">
                        0.3% <span>({0.003 * vault_info.requested_amount.amount} {request_currency.coinDenom})</span>
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

                {
                    vault_info.request_type !== LiquidityRequestTypes.fixed_term_rental && !hide_state_info &&
                    <tr>
                        <th scope="row" className="flex flex-col py-4 font-medium whitespace-nowrap">
                            <span>Already Claimed</span>

                        </th>
                        <td className="py-4 text-right">
                            <span>{vault_info.already_claimed.toLocaleString('en-us')} {chainInfo.src.stakeCurrency.coinDenom}</span>
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

                {vault_info.request_type !== LiquidityRequestTypes.fixed_interest_rental && !hide_state_info &&
                    <tr>
                        <th scope="row" className="py-4 font-medium whitespace-nowrap">
                            <span>Expires In</span>
                        </th>
                        <td className="py-4 text-right">
                            <span>{vault_info.end_time}</span>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );
}