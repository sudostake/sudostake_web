import { JsonObject } from "@cosmjs/cosmwasm-stargate";
import { Coin, coin } from "@cosmjs/stargate";

type Currency = {
    coinDenom: string,
    coinMinimalDenom: string,
    coinDecimals: number,
    coinGeckoId: string,
};

export type ChainInfo = {
    logo_url: string,
    vault_creation_fee: Coin,
    sudomod_address: string,
    src: JsonObject,
    usdc: Currency,
};

// Describe Archway chain info
const archwayCurrency: Currency = {
    coinDenom: 'CONST',
    coinMinimalDenom: 'aconst',
    coinDecimals: 18,
    coinGeckoId: 'constantine-network',
};
const archwayChainInfo = {
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
    // walletUrlForStaking: '',
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
    },
    {
        logo_url: '/huahua.png',
        vault_creation_fee: coin('1000000', 'uhuahua'),
        sudomod_address: '',
        src: {},
        usdc: {
            coinDenom: 'USDC',
            coinMinimalDenom: 'usdc',
            coinDecimals: 6,
            coinGeckoId: '',
        }
    },
];

