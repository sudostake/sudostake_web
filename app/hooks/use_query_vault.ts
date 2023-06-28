import { useQuery } from "@tanstack/react-query"
import { WalletStatusType, selectedChainState, walletState } from "../state";
import { useRecoilValue } from "recoil";
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { convertMicroDenomToDenom } from "../utils/conversion";
import BigNumber from "bignumber.js";

async function fetchTokenBalance({
    client,
    address,
    token: { denom, decimals },
}: {
    client: SigningCosmWasmClient,
    address: string,
    token: {
        denom: string,
        decimals: number
    }
}) {
    const coin = await client.getBalance(address, denom);
    const amount = coin ? Number(coin.amount) : 0;
    return convertMicroDenomToDenom(amount, decimals)
}

async function fetchUnbondingInfo({
    vault_address,
    token: { decimals }
}: {
    vault_address: string, token: {
        decimals: number
    }
}) {
    const api = [
        'https://lcd-office.cosmostation.io/archway-testnet/cosmos/staking/v1beta1/delegators/',
        vault_address,
        '/unbonding_delegations'
    ].join('');
    const response = await fetch(api, {
        method: "GET",
    });
    const data = await response.json();

    // Calculate total unbonding amount
    // Note! this API may change as it is controlled by a third party
    let total = new BigNumber(0);
    let unbonding_responses: any[] = data['unbonding_responses'];
    unbonding_responses.forEach((res) => {
        let entries: any[] = res['entries'];
        entries.forEach((entry) => {
            let amount = new BigNumber(entry['balance'])
            total = total.plus(amount);
        })
    });

    return convertMicroDenomToDenom(total.toString(), decimals)
}

export const useQueryVaultMetaData = (vault_address: string) => {
    const { status, client } = useRecoilValue(walletState);
    const chainInfo = useRecoilValue(selectedChainState);

    const { data: vault_metadata, isLoading } = useQuery(
        ['vault_info', vault_address],
        async () => {
            const [native_balance, usdc_balance, unbonding_amount, staking_info] = await Promise.all([
                // Fetch native balance
                fetchTokenBalance({
                    client,
                    address: vault_address,
                    token: {
                        decimals: chainInfo.src.stakeCurrency.coinDenom,
                        denom: chainInfo.src.stakeCurrency.coinMinimalDenom
                    },
                }),

                // Fetch USDC balance
                fetchTokenBalance({
                    client,
                    address: vault_address,
                    token: {
                        decimals: chainInfo.usdc.coinDecimals,
                        denom: chainInfo.usdc.coinMinimalDenom
                    },
                }),

                // Fetch unbonding amount
                fetchUnbondingInfo({
                    vault_address, token: {
                        decimals: 18,

                    },
                }),

                // Fetch staking info
                client.queryContractSmart(vault_address, { staking_info: {} })
            ]);

            return {
                native_balance,
                usdc_balance: usdc_balance,
                total_staked: convertMicroDenomToDenom(staking_info['total_staked'], 18),
                acc_rewards: convertMicroDenomToDenom(staking_info['accumulated_rewards'], 18),
                unbonding: unbonding_amount,
            };
        },
        { enabled: status === WalletStatusType.connected, }
    )

    return { vault_metadata, isLoading }
}