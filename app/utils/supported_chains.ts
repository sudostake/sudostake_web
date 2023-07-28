import { Coin, coin } from "@cosmjs/stargate";

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
    src: ChainInfoFull,
    request_denoms: Currency[],
    sudomod_address: string,
    vault_code_ids: number[]
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

export const supportedChains: ChainInfo[] = [
    {
        logo_url: '/archway.png',
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
        ],
        sudomod_address: 'archway1fdnwzl70mz467h96x0stl2xdayysmnt9pgusqfpnnmjep2xyqj7q79heyg',
        vault_creation_fee: coin('10000000000000000000', 'aconst'),
        vault_code_ids: [
            // 803215E894EF097E991E120601CB0B716744FE68E83B87DCF1AC18709B16A749
            484,

            // REMINDER
            // on Tuesday 01 august 2023
            // archwayd tx wasm execute $SUDOMOD_ADDR "$E_PAYLOAD" --from cashlex $NODE $TXFLAG -y
            // 469A91C2561DB2AC08002936778239061267D69A78B2F8946E5FDDC45CE34D44
            970
        ]
    }
];

export function get_chain_info_from_rpc(rpc: string): ChainInfo | null {
    return supportedChains.find(c => c.src.rpc === rpc);
}