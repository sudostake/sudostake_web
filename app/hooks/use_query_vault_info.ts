import { useQuery } from "@tanstack/react-query"
import { WalletStatusType, walletState } from "../providers";
import { useRecoilValue } from "recoil";
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { convertMicroDenomToDenom } from "../utils/conversion";

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
    vault_address
}: { vault_address: string }) {
    const api = [
        'https://lcd-office.cosmostation.io/archway-testnet/cosmos/staking/v1beta1/delegators/',
        vault_address,
        '/unbonding_delegations'
    ].join('');

    const response = await fetch(api, {
        method: "GET",
    });
    const data = await response.json();

    return 0;
}

export const useQueryVaultInfo = (vault_address: string) => {
    const { status, client } = useRecoilValue(walletState);

    const { data: info, isLoading } = useQuery(
        ['vault_info', vault_address],
        async () => {
            const [native_balance, usdc_balance, unbonding_amount] = await Promise.all([
                // Fetch native balance
                fetchTokenBalance({
                    client,
                    address: vault_address,
                    token: {
                        decimals: 18,
                        denom: 'aconst'
                    },
                }),

                // Fetch USDC balance
                fetchTokenBalance({
                    client,
                    address: vault_address,
                    token: {
                        decimals: 18,
                        denom: 'usdc'
                    },
                }),

                // Fetch unbonding amount
                fetchUnbondingInfo({ vault_address })

                // TODO Fetch total delegated amount
                // Add this to the vault API

                // TODO Fetch accumulated staking rewards
                // Add this to the vault API
            ]);

            return {
                native_balance,
                usdc_balance: usdc_balance,
                unbonding: unbonding_amount,
                delegated: '0.000000',
                acc_rewards: '0.000000',
            };
        },
        { enabled: status === WalletStatusType.connected, }
    )

    return { info, isLoading }
}