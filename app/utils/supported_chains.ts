import { Coin, coin } from "@cosmjs/stargate";

export type Currency = {
    coinDenom: string,
    coinMinimalDenom: string,
    coinDecimals: number,
    coinGeckoId: string,
};

export type ChainInfoFull = {
    chainId: string,
    chainName: string,
    rpc: string,
    rest: string,
    stakeCurrency: Currency,
    bip44: {
        coinType: number,
    },
    bech32Config: {
        bech32PrefixAccAddr: string,
        bech32PrefixAccPub: string,
        bech32PrefixValAddr: string,
        bech32PrefixValPub: string,
        bech32PrefixConsAddr: string,
        bech32PrefixConsPub: string,
    },
    currencies: [Currency],
    feeCurrencies: [Currency],
    coinType: number,
    features: ['cosmwasm', 'ibc-transfer', 'ibc-go'],
    walletUrlForStaking: string,
};

export type ChainInfo = {
    logo_url: string,
    vault_creation_fee: Coin,
    sudomod_address: string,
    src: ChainInfoFull,
    usdc: Currency,
};

// Describe Archway chain info
const archwayCurrency: Currency = {
    coinDenom: 'CONST',
    coinMinimalDenom: 'aconst',
    coinDecimals: 18,
    coinGeckoId: 'constantine-network',
};
const archwayChainInfo: ChainInfoFull = {
    chainId: 'constantine-3',
    chainName: 'Constantine',
    rpc: 'https://rpc.constantine.archway.tech',
    rest: 'https://api.constantine.archway.tech',
    stakeCurrency: archwayCurrency,
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: 'archway',
        bech32PrefixAccPub: 'archwaypub',
        bech32PrefixValAddr: 'archwayvaloper',
        bech32PrefixValPub: 'archwayvaloperpub',
        bech32PrefixConsAddr: 'archwayvalcons',
        bech32PrefixConsPub: 'archwayvalconspub',
    },
    currencies: [archwayCurrency],
    feeCurrencies: [archwayCurrency],
    coinType: 118,
    features: ['cosmwasm', 'ibc-transfer', 'ibc-go'],
    walletUrlForStaking: '',
};

export const supportedChains: ChainInfo[] = [
    {
        logo_url: '/archway.png',
        vault_creation_fee: coin('10000000000000000000', 'aconst'),
        sudomod_address: 'archway1unl5gda9zxr0dzcvsqs057quzku532vakprq44t8emz2edwcqcvs6z8aug',
        src: archwayChainInfo,
        usdc: {
            coinDenom: 'USDC',
            coinMinimalDenom: 'usdc',
            coinDecimals: 18,
            coinGeckoId: 'constantine-network',
        }
    }
];

