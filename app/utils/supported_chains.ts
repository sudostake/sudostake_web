import { Coin, coin } from "@cosmjs/stargate";


export type Currency = {
    coinDecimals: number,
    coinDenom: string,
    coinGeckoId: string,
    coinMinimalDenom: string,
    gasPriceStep?: {
        low: number,
        average: number,
        high: number
    },
    coinImageUrl?: string,
};

export type KeplrChainInfoSchema = {
    bech32Config: {
        bech32PrefixAccAddr: string,
        bech32PrefixAccPub: string,
        bech32PrefixConsAddr: string,
        bech32PrefixConsPub: string,
        bech32PrefixValAddr: string,
        bech32PrefixValPub: string,
    },
    bip44: {
        coinType: 118
    },
    chainId: string,
    chainName: string,
    chainSymbolImageUrl: string,
    currencies: Currency[],
    features: ["cosmwasm"],
    feeCurrencies: Currency[],
    rest: string,
    rpc: string,
    stakeCurrency: Currency,
    nodeProvider: {
        name: string,
        email: string,
        website: string,
    }
};

const ArchwayTestNet: KeplrChainInfoSchema = {
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
            "coinGeckoId": "constantine-network",
            "coinMinimalDenom": "aconst"
        }
    ],
    "features": ["cosmwasm"],
    "feeCurrencies": [
        {
            "coinDecimals": 18,
            "coinDenom": "CONST",
            "coinGeckoId": "constantine-network",
            "coinMinimalDenom": "aconst",
            "gasPriceStep": {
                "low": 1000000000000,
                "average": 1500000000000,
                "high": 2000000000000
            }
        }
    ],
    "rest": "https://api.constantine.archway.tech",
    "rpc": "https://rpc.constantine.archway.tech",
    "stakeCurrency": {
        "coinDecimals": 18,
        "coinDenom": "CONST",
        "coinGeckoId": "constantine-network",
        "coinMinimalDenom": "aconst"
    },
    "nodeProvider": {
        "name": "Phi Labs",
        "email": "support@philabs.xyz",
        "website": "https://philabs.xyz"
    }
};

const ArchwayMainnet: KeplrChainInfoSchema = {
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
    "chainId": "archway-1",
    "chainName": "Archway",
    "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/chain.png",
    "currencies": [
        {
            "coinDecimals": 18,
            "coinDenom": "ARCH",
            "coinGeckoId": "archway",
            "coinMinimalDenom": "aarch",
            "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
        }
    ],
    "features": ["cosmwasm"],
    "feeCurrencies": [
        {
            "coinDecimals": 18,
            "coinDenom": "ARCH",
            "coinGeckoId": "archway",
            "coinMinimalDenom": "aarch",
            "gasPriceStep": {
                "low": 1000000000000,
                "average": 1500000000000,
                "high": 2000000000000
            },
            "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
        }
    ],
    "rest": "https://api.mainnet.archway.io",
    "rpc": "https://rpc.mainnet.archway.io",
    "stakeCurrency": {
        "coinDecimals": 18,
        "coinDenom": "ARCH",
        "coinGeckoId": "archway",
        "coinMinimalDenom": "aarch",
        "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
    },
    "nodeProvider": {
        "name": "Phi Labs",
        "email": "support@philabs.xyz",
        "website": "https://philabs.xyz"
    }
};
/**
 * Define sudostake supported chains below
 */
export type SudoStakeChainInfoSchema = {
    src: KeplrChainInfoSchema,
    explorer_url: string,
    vault_creation_fee: Coin,
    request_denoms: Currency[],
    sudomod_address: string,
    vault_code_ids: number[],
    vault_collection_path: string,
    gas_price: string,
};

export const supportedChains: SudoStakeChainInfoSchema[] = [
    {
        src: ArchwayTestNet,
        gas_price: '900000000000.000000000000000000aconst',
        sudomod_address: 'archway1fdnwzl70mz467h96x0stl2xdayysmnt9pgusqfpnnmjep2xyqj7q79heyg',
        vault_creation_fee: coin('10000000000000000000', 'aconst'),
        explorer_url: 'https://testnet.mintscan.io/archway-testnet',
        vault_code_ids: [
            // 6F364E2FF1DBDE2514A66E27F7CD02600A71BA83279D266FC92ED9AE35F331C8
            1160,
            // 469A91C2561DB2AC08002936778239061267D69A78B2F8946E5FDDC45CE34D44
            970,
            // 803215E894EF097E991E120601CB0B716744FE68E83B87DCF1AC18709B16A749
            484,
        ],
        request_denoms: [
            {
                coinDenom: 'CONST',
                coinMinimalDenom: 'aconst',
                coinDecimals: 18,
                coinGeckoId: "constantine-network",
            },
            {
                coinDenom: 'USDC',
                coinMinimalDenom: 'ibc/usdc',
                coinDecimals: 18,
                coinGeckoId: "",
            }
        ],
        vault_collection_path: 'vaults'
    },

    {
        src: ArchwayMainnet,
        gas_price: '900000000000.000000000000000000aarch',
        sudomod_address: 'archway1wyq63wtaktujyp7zrd58ytzc76g9vtamlgwrq9qhhf0j32usvfesn9s38g',
        vault_creation_fee: coin('10000000000000000000', 'aarch'),
        explorer_url: 'https://mintscan.io/archway',
        vault_code_ids: [156],
        request_denoms: [
            {
                coinDenom: 'USDC',
                coinMinimalDenom: 'ibc/43897B9739BD63E3A08A88191999C632E052724AB96BD4C74AE31375C991F48D',
                coinDecimals: 6,
                coinGeckoId: "",
            },
            {
                coinDenom: 'ARCH',
                coinMinimalDenom: 'aarch',
                coinDecimals: 18,
                coinGeckoId: "archway",
            },
            {
                coinDenom: 'USDC(DEPRECATED)',
                coinMinimalDenom: 'ibc/usdc',
                coinDecimals: 18,
                coinGeckoId: "",
            }
        ],
        vault_collection_path: 'archway_mainnet_vaults'
    },
];

export function get_chain_info_from_rpc(rpc: string): SudoStakeChainInfoSchema | null {
    return supportedChains.find(c => c.src.rpc === rpc);
}

export function get_chain_info_from_id(id: string): SudoStakeChainInfoSchema | null {
    return supportedChains.find(c => c.src.chainId === id);
}
