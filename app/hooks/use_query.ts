import { useQuery } from "@tanstack/react-query"
import { ValidatorInfo, WalletStatusType, selectedChainState, validatorListState, walletState } from "../state";
import { useRecoilValue } from "recoil";
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { convertMicroDenomToDenom } from "../utils/conversion";
import BigNumber from "bignumber.js";
import { Currency } from "../utils/supported_chains";

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

// TODO
// Refactor this into a query
async function fetchUnbondingInfo({
    vault_address,
    token: { decimals }
}: {
    vault_address: string,
    token: {
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
    let total = BigNumber(0);
    let unbonding_responses: any[] = data['unbonding_responses'];
    unbonding_responses.forEach((res) => {
        let entries: any[] = res['entries'];
        entries.forEach((entry) => {
            let amount = BigNumber(entry['balance'])
            total = total.plus(amount);
        })
    });

    return convertMicroDenomToDenom(total.toString(), decimals)
}


export const useQueryVaultMetaData = (vault_address: string) => {
    const { status, client } = useRecoilValue(walletState);
    const chainInfo = useRecoilValue(selectedChainState);

    const { data: vault_metadata, isLoading } = useQuery(
        ['vault_metadata', vault_address],
        async () => {
            const [native_balance, usdc_balance, unbonding_amount, staking_info, all_delegations] = await Promise.all([
                // Fetch native balance
                fetchTokenBalance({
                    client,
                    address: vault_address,
                    token: {
                        decimals: chainInfo.src.stakeCurrency.coinDecimals,
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
                client.queryContractSmart(vault_address, { staking_info: {} }),

                // Fetch all delegations info
                client.queryContractSmart(vault_address, { all_delegations: {} })
            ]);

            return {
                native_balance,
                usdc_balance: usdc_balance,
                total_staked: convertMicroDenomToDenom(staking_info['total_staked'], 18),
                acc_rewards: convertMicroDenomToDenom(staking_info['accumulated_rewards'], 18),
                unbonding: unbonding_amount,
                all_delegations: all_delegations.data,
            };
        },
        { enabled: status === WalletStatusType.connected, }
    )

    return { vault_metadata, isLoading }
}

export const useQueryBalance = (address: string, currency: Currency) => {
    const { status, client } = useRecoilValue(walletState);

    const { data: balance = 0, isLoading } = useQuery(
        ['address_balance', address, currency.coinMinimalDenom],
        async () => {
            return await fetchTokenBalance({
                client,
                address,
                token: {
                    decimals: currency.coinDecimals,
                    denom: currency.coinMinimalDenom
                },
            });
        },
        { enabled: status === WalletStatusType.connected, }
    )

    return { balance, isLoading }
}

export const useQueryValidatorList = () => {
    const { status } = useRecoilValue(walletState);
    const api = "https://api.mintscan.io/v1/archway-testnet/validators";

    const { data: validator_list = [], isLoading } = useQuery<any[]>(
        ['validator_list'],
        async () => {
            const response = await fetch(api, {
                method: "GET",
            });
            return await response.json();
        },
        { enabled: status === WalletStatusType.connected, }
    )

    return { validator_list, isLoading }
}

export const useQueryRedelegationList = (vault_address: string) => {
    const { status } = useRecoilValue(walletState);
    const api = [
        'https://lcd-office.cosmostation.io/archway-testnet/cosmos/staking/v1beta1/delegators/',
        vault_address,
        '/redelegations'
    ].join('');

    const { data: redelegation_list = [], isLoading } = useQuery<any[]>(
        ['redelegation_list', vault_address],
        async () => {
            const response = await fetch(api, {
                method: "GET",
            });
            return (await response.json())['redelegation_responses'];
        },
        { enabled: status === WalletStatusType.connected, }
    )

    return { redelegation_list, isLoading }
}

export const useFilteredValidators = (hide_zero_balance?: boolean) => {
    const { status } = useRecoilValue(walletState);
    const validators = useRecoilValue(validatorListState);

    const { data: validator_list = [] } = useQuery<ValidatorInfo[]>(
        ['filtered_validators', `${Boolean(hide_zero_balance)}`],
        () => {
            if (Boolean(hide_zero_balance)) {
                return validators.filter(v => Number(v.delegated_amount) > 0.0099)
            }
            return validators;
        },
        { enabled: status === WalletStatusType.connected, }
    )

    return { validator_list }
}
