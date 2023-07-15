import { Coin, coin } from "@cosmjs/stargate";
import { IObjectMap } from "./generic_interface";

export type Currency = {
    coinDenom: string,
    coinMinimalDenom: string,
    coinDecimals: number,
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
    features: ['cosmwasm', 'ibc-transfer', 'ibc-go'],
    chainSymbolImageUrl: string,
    nodeProvider: {
        name: string,
        email: string,
        website: string,
    }
};

export type ChainInfo = {
    logo_url: string,
    vault_creation_fee: Coin,
    sudomod_address: string,
    src: ChainInfoFull,
    request_denoms: Currency[],
};

// Describe Archway chain info
const archwayChainInfo: ChainInfoFull = {
    "bech32Config": {
        "bech32PrefixAccAddr": "archway",
        "bech32PrefixAccPub": "archwaypub",
        "bech32PrefixConsAddr": "archwayvalcons",
        "bech32PrefixConsPub": "archwayvalconspub",
        "bech32PrefixValAddr": "archwayvaloper",
        "bech32PrefixValPub": "archwayvaloperpub"
    },
    "bip44": {
        "coinType": 118
    },
    "chainId": "constantine-3",
    "chainName": "Archway (Testnet)",
    "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/constantine/chain.png",
    "currencies": [
        {
            "coinDecimals": 18,
            "coinDenom": "CONST",
            "coinMinimalDenom": "aconst"
        }
    ],
    "features": ['cosmwasm', 'ibc-transfer', 'ibc-go'],
    "feeCurrencies": [
        {
            "coinDecimals": 18,
            "coinDenom": "CONST",
            "coinMinimalDenom": "aconst",

        }
    ],
    "rest": "https://api.constantine.archway.tech",
    "rpc": "https://rpc.constantine.archway.tech",
    "stakeCurrency": {
        "coinDecimals": 18,
        "coinDenom": "CONST",
        "coinMinimalDenom": "aconst"
    },
    "nodeProvider": {
        "name": "Phi Labs",
        "email": "support@philabs.xyz",
        "website": "https://philabs.xyz"
    }
};

// TODO update this
export const supportedChains: ChainInfo[] = [
    {
        logo_url: '/archway.png',
        // TODO dynamically get vault_creation_fee from sudomod_address
        vault_creation_fee: coin('10000000000000000000', 'aconst'),
        sudomod_address: 'archway1fdnwzl70mz467h96x0stl2xdayysmnt9pgusqfpnnmjep2xyqj7q79heyg',
        src: archwayChainInfo,
        request_denoms: [
            {
                coinDenom: 'CONST',
                coinMinimalDenom: 'aconst',
                coinDecimals: 18,
            },
            {
                coinDenom: 'USDC',
                coinMinimalDenom: 'ibc/usdc',
                coinDecimals: 18,
            }
        ]
    }
];
