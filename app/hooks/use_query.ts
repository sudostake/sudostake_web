'use client'

import { useQuery } from "@tanstack/react-query"
import { ValidatorInfo, ValidatorUnbondingInfo, WalletStatusType, selectedChainState, validatorListState, walletState } from "../state";
import { useRecoilValue } from "recoil";
import { convertMicroDenomToDenom, secondsToDhms } from "../utils/conversion";
import { Currency, SudoStakeChainInfoSchema } from "../utils/supported_chains";
import { collection, getDocsFromServer, orderBy, query, where } from "firebase/firestore";
import { db } from "../services/firebase_client";
import { get_connection } from "../services/vault_indexer";

async function fetchTokenBalance({
    chain_info,
    address,
    denom,
    decimals
}: {
    chain_info: SudoStakeChainInfoSchema,
    address: string,
    denom: string,
    decimals: number
}) {
    const client = await get_connection(chain_info.src.rpc);
    const coin = await client.getBalance(address, denom);
    const amount = coin ? coin.amount : '0';
    return convertMicroDenomToDenom(amount, decimals)
}

async function fetchUnbondingInfo({
    vault_address,
    token: { decimals },
    chain_id
}: {
    vault_address: string,
    token: {
        decimals: number
    },
    chain_id: string
}): Promise<{
    total_unbonding_amount: number,
    unbonding_list: ValidatorUnbondingInfo[]
}> {
    const api = `/api/unbonding_delegations?vault_address=${vault_address}&chain_id=${chain_id}`;
    const response = await fetch(api, {
        method: "GET",
    });

    // Calculate total unbonding amount
    let total = 0;
    let unbonding_responses: any[] = (await response.json())['unbonding_responses'];
    let unbonding_list = unbonding_responses.map((res) => {
        let unbonding_info: ValidatorUnbondingInfo = {
            name: '',
            address: res['validator_address'],
            entries: []
        };

        // Update unbonding_info.entries and total_unbonding_amount
        Array.from<any[]>(res['entries']).forEach((entry) => {
            let amount = convertMicroDenomToDenom(entry['balance'], decimals);
            total += amount;
            unbonding_info.entries.push({
                amount,
                completion_time: secondsToDhms(new Date(entry['completion_time']))
            });
        })

        return unbonding_info;
    });

    return {
        total_unbonding_amount: total,
        unbonding_list
    }
}

export const useQueryRedelegationList = (vault_address: string) => {
    const chainInfo = useRecoilValue(selectedChainState);
    const { status } = useRecoilValue(walletState);
    const api = `/api/redelegations?vault_address=${vault_address}&chain_id=${chainInfo.src.chainId}`;

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
    const chainInfo = useRecoilValue(selectedChainState);
    const { status } = useRecoilValue(walletState);
    const api = chainInfo && `/api/validators?chain_id=${chainInfo.src.chainId}`;

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
    const chainInfo = useRecoilValue(selectedChainState);

    const { data: vault_metadata, isLoading } = useQuery(
        ['vault_metadata', vault_address],
        async () => {
            const client = await get_connection(chainInfo.src.rpc);

            const usd_currency = chainInfo.request_denoms.find(currency => currency.coinDenom === 'USDC');
            const [native_balance, usdc_balance, unbonding_details, vault_info, staking_info, all_delegations] = await Promise.all([
                // Fetch native balance
                fetchTokenBalance({
                    decimals: chainInfo.src.stakeCurrency.coinDecimals,
                    denom: chainInfo.src.stakeCurrency.coinMinimalDenom,
                    address: vault_address,
                    chain_info: chainInfo
                }),

                // Fetch USDC balance
                fetchTokenBalance({
                    decimals: usd_currency.coinDecimals,
                    denom: usd_currency.coinMinimalDenom,
                    address: vault_address,
                    chain_info: chainInfo
                }),

                // Fetch unbonding amount
                fetchUnbondingInfo({
                    vault_address,
                    token: {
                        decimals: chainInfo.src.stakeCurrency.coinDecimals,
                    },
                    chain_id: chainInfo.src.chainId
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
        {}
    )

    return { vault_metadata, isLoading }
}

export const useQueryBalance = (address: string, currency: Currency) => {
    const chainInfo = useRecoilValue(selectedChainState);

    const { data: balance = 0, isLoading } = useQuery(
        ['address_balance', address, currency.coinMinimalDenom],
        async () => {
            return await fetchTokenBalance({
                decimals: currency.coinDecimals,
                denom: currency.coinMinimalDenom,
                address,
                chain_info: chainInfo
            });
        },
        {}
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

export const useQueryOwnerVaults = () => {
    const { status, address } = useRecoilValue(walletState);

    const { data: vaults = [], isLoading } = useQuery(['owner_vaults', address],
        async () => {
            const q = query(collection(db, "vaults"), where("owner", "==", address), orderBy("index_number", "desc"));
            const querySnapshot = await getDocsFromServer(q);
            const dataset = [];
            querySnapshot
                .forEach((doc) => dataset.push({ ...doc.data(), id: doc.id }));
            return dataset;
        },
        { enabled: status === WalletStatusType.connected, }
    )

    return { vaults, isLoading }
}