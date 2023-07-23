import { useQuery } from "@tanstack/react-query"
import { ValidatorInfo, ValidatorUnbondingInfo, WalletStatusType, selectedChainState, validatorListState, walletState } from "../state";
import { useRecoilValue } from "recoil";
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { convertMicroDenomToDenom, secondsToDhms } from "../utils/conversion";
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

async function fetchUnbondingInfo({
    vault_address,
    token: { decimals }
}: {
    vault_address: string,
    token: {
        decimals: number
    }
}): Promise<{
    total_unbonding_amount: number,
    unbonding_list: ValidatorUnbondingInfo[]
}> {
    const api = `/api/unbonding_delegations?vault_address=${vault_address}`;
    const response = await fetch(api, {
        method: "GET",
    });

    // Calculate total unbonding amount
    // Note! this API may change as it is controlled by a third party
    let total = BigNumber(0);
    let unbonding_responses: any[] = (await response.json())['unbonding_responses'];
    let unbonding_list = unbonding_responses.map((res) => {
        let unbonding_info: ValidatorUnbondingInfo = {
            name: '',
            address: res['validator_address'],
            entries: []
        };

        // Update unbonding_info.entries and total
        Array.from<any[]>(res['entries']).forEach((entry) => {
            total = total.plus(BigNumber(entry['balance']));
            unbonding_info.entries.push({
                amount: convertMicroDenomToDenom(entry['balance'], decimals),
                completion_time: secondsToDhms(new Date(entry['completion_time']))
            });
        })

        return unbonding_info;
    });

    return {
        total_unbonding_amount: convertMicroDenomToDenom(total.toString(), decimals),
        unbonding_list
    }
}

export const useQueryRedelegationList = (vault_address: string) => {
    const { status } = useRecoilValue(walletState);
    const api = `/api/redelegations?vault_address=${vault_address}`;

    const { data: redelegation_list = [], isLoading } = useQuery<any[]>(
        ['redelegation_list', vault_address],
        async () => {
            const response = await fetch(api, {
                method: "GET"
            });
            return (await response.json())['redelegation_responses'];
        },
        { enabled: status === WalletStatusType.connected, }
    )

    return { redelegation_list, isLoading }
}

export const useQueryValidatorList = () => {
    const { status } = useRecoilValue(walletState);
    const api = "/api/validators";

    const { data: validator_list = [], isLoading } = useQuery<any[]>(
        ['validator_list'],
        async () => {
            const response = await fetch(api, {
                method: "GET",
            });
            const data = await response.json();
            return data['validators'];
        },
        { enabled: status === WalletStatusType.connected, }
    )

    return { validator_list, isLoading }
}


export const useQueryVaultMetaData = (vault_address: string) => {
    const { status, client } = useRecoilValue(walletState);
    const chainInfo = useRecoilValue(selectedChainState);

    const { data: vault_metadata, isLoading } = useQuery(
        ['vault_metadata', vault_address],
        async () => {
            const usd_currency = chainInfo.request_denoms.find(currency => currency.coinDenom === 'USDC');
            const [native_balance, usdc_balance, unbonding_details, vault_info, staking_info, all_delegations] = await Promise.all([
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
                        decimals: usd_currency.coinDecimals,
                        denom: usd_currency.coinMinimalDenom
                    },
                }),

                // Fetch unbonding amount
                fetchUnbondingInfo({
                    vault_address, token: {
                        decimals: 18,
                    },
                }),

                // Fetch vault info
                client.queryContractSmart(vault_address, { info: {} }),

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
                unbonding_details,
                all_delegations: Array.from<any>(all_delegations.data),
                vault_info
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

export const useFilteredValidators = (hide_zero_balance?: boolean) => {
    const { status } = useRecoilValue(walletState);
    const { validator_list } = useRecoilValue(validatorListState);

    const { data: filtered_list = [] } = useQuery<ValidatorInfo[]>(
        ['filtered_validators', `${Boolean(hide_zero_balance)}`],
        () => {
            if (Boolean(hide_zero_balance)) {
                return validator_list.filter(v => Number(v.delegated_amount) > 0.0099)
            }
            return validator_list;
        },
        { enabled: status === WalletStatusType.connected, }
    )

    return { filtered_list }
}
