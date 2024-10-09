import { LiquidityRequest } from "@/app/enums/liquidity_request";
import { selectedChainState } from "@/app/state";
import { VaultIndex } from "@/app/types/vault_index";
import { format_duration } from "@/app/utils/conversion";
import { useRecoilValue } from "recoil";


export default function OpenInterestCard({ vault_info: vault }: { vault_info: VaultIndex }) {
    const chainInfo = useRecoilValue(selectedChainState);

    const formatted_duration = (vault.request_type !== LiquidityRequest.fixed_interest_rental &&
        format_duration(vault.duration_in_seconds)
    )

    const request_currency = chainInfo.request_currencies
        .find(currency => currency.coinMinimalDenom === vault.requested_amount.denom);

    return (
        <>
            <span>Vault #{vault.index_number}</span>
            <span>Amount staked: {vault.tvl.toLocaleString('en-us')} {chainInfo.stakeCurrency.coinDenom}</span>
            <span className='py-4'></span>

            {
                vault.request_type === LiquidityRequest.fixed_interest_rental &&
                <>
                    <span className='text-green-600'>
                        {vault.request_type.split('_').map(d => `${d[0].toUpperCase()}${d.substring(1)}`).join(' ')}
                    </span>
                    <span className=''>Claim {vault.claimable_tokens} {chainInfo.stakeCurrency.coinDenom} in staking rewards.</span>
                    {
                        vault.can_cast_vote &&
                        <span className='italic'>(Includes voting rights)</span>
                    }
                </>
            }

            {
                vault.request_type === LiquidityRequest.fixed_term_rental &&
                <>
                    <span className='text-blue-600'>
                        {vault.request_type.split('_').map(d => `${d[0].toUpperCase()}${d.substring(1)}`).join(' ')}
                    </span>

                    <span className=''>Claim all staking rewards for {formatted_duration}.</span>
                    {
                        vault.can_cast_vote &&
                        <span className='italic'>(With voting rights)</span>
                    }
                </>
            }

            {
                vault.request_type === LiquidityRequest.fixed_term_loan && Boolean(request_currency) &&
                <>
                    <span className='text-red-600'>
                        {vault.request_type.split('_').map(d => `${d[0].toUpperCase()}${d.substring(1)}`).join(' ')}
                    </span>
                    <span>
                        {
                            [
                                "Get",
                                `${(vault.requested_amount.amount + vault.interest_amount).toLocaleString('en-us')}`,
                                `${request_currency.coinDenom}`,
                                "in return or liquidate",
                                `${vault.collateral_amount.toLocaleString('en-us')}`,
                                `${chainInfo.stakeCurrency.coinDenom}`,
                                "after",
                                `${formatted_duration}`
                            ].join(' ')
                        }
                    </span>
                </>
            }
            <span className='py-4 mb-auto'></span>

            {
                Boolean(request_currency) &&
                <span>Cost: {vault.requested_amount.amount.toLocaleString('en-us')} {request_currency.coinDenom}</span>
            }
        </>
    );
}