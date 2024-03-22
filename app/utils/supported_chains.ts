import { coin } from "@cosmjs/stargate";
import { KeplrChainInfoSchema, LiquidityRequestTypes, SudoStakeChainInfoSchema, VaultVersion } from "./interface";

const ArchwayTestNetKeplrConfig: KeplrChainInfoSchema = {
    chainId: "constantine-3",
    chainName: "Testnet",
    chainSymbolImageUrl: "/archway.png",
    stakeCurrency: {
        coinDecimals: 18,
        coinDenom: "CONST",
        coinGeckoId: "constantine-network",
        coinMinimalDenom: "aconst",
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
    },
    currencies: [
        {
            coinDecimals: 18,
            coinDenom: "CONST",
            coinGeckoId: "constantine-network",
            coinMinimalDenom: "aconst",
            coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
        }
    ],
    feeCurrencies: [
        {
            coinDecimals: 18,
            coinDenom: "CONST",
            coinGeckoId: "constantine-network",
            coinMinimalDenom: "aconst",
            gasPriceStep: {
                low: 1000000000000,
                average: 1500000000000,
                high: 2000000000000
            },
            coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
        }
    ],
    bech32Config: {
        bech32PrefixAccAddr: "archway",
        bech32PrefixAccPub: "archwaypub",
        bech32PrefixConsAddr: "archwayvalcons",
        bech32PrefixConsPub: "archwayvalconspub",
        bech32PrefixValAddr: "archwayvaloper",
        bech32PrefixValPub: "archwayvaloperpub"
    },
    bip44: { coinType: 118 },
    features: ["cosmwasm"],
    rest: "https://api.constantine.archway.io",
    rpc: "https://rpc.constantine.archway.io",
    nodeProvider: {
        name: "Phi Labs",
        email: "support@philabs.xyz",
        website: "https://philabs.xyz"
    }
};

const ArchwayMainnetKeplrConfig: KeplrChainInfoSchema = {
    chainId: "archway-1",
    chainName: "Mainnet",
    chainSymbolImageUrl: "/archway.png",
    stakeCurrency: {
        coinDecimals: 18,
        coinDenom: "ARCH",
        coinGeckoId: "archway",
        coinMinimalDenom: "aarch",
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
    },
    currencies: [
        {
            coinDecimals: 18,
            coinDenom: "ARCH",
            coinGeckoId: "archway",
            coinMinimalDenom: "aarch",
            coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
        }
    ],
    feeCurrencies: [
        {
            coinDecimals: 18,
            coinDenom: "ARCH",
            coinGeckoId: "archway",
            coinMinimalDenom: "aarch",
            gasPriceStep: {
                low: 1000000000000,
                average: 1500000000000,
                high: 2000000000000
            },
            coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
        }
    ],
    bech32Config: {
        bech32PrefixAccAddr: "archway",
        bech32PrefixAccPub: "archwaypub",
        bech32PrefixConsAddr: "archwayvalcons",
        bech32PrefixConsPub: "archwayvalconspub",
        bech32PrefixValAddr: "archwayvaloper",
        bech32PrefixValPub: "archwayvaloperpub"
    },
    bip44: { coinType: 118 },
    features: ["cosmwasm"],
    rest: "https://api.mainnet.archway.io",
    rpc: "https://rpc.mainnet.archway.io",
    nodeProvider: {
        name: "Phi Labs",
        email: "support@philabs.xyz",
        website: "https://philabs.xyz"
    }
};

const archway_constantine_3 = {
    src: ArchwayTestNetKeplrConfig,
    gas_price: '900000000000.000000000000000000aconst',
    sudomod_address: 'archway1fdnwzl70mz467h96x0stl2xdayysmnt9pgusqfpnnmjep2xyqj7q79heyg',
    vault_creation_fee: coin('10000000000000000000', 'aconst'),
    explorer_url: 'https://mintscan.io/archway-testnet',
    vault_versions: [
        {
            code_id: 484,
            collateral_options: [
                LiquidityRequestTypes.fixed_interest_rental,
                LiquidityRequestTypes.fixed_term_rental,
                LiquidityRequestTypes.fixed_term_loan,
            ]
        },
        {
            code_id: 970,
            collateral_options: [
                LiquidityRequestTypes.fixed_interest_rental,
                LiquidityRequestTypes.fixed_term_rental,
                LiquidityRequestTypes.fixed_term_loan,
            ]
        },
        {
            code_id: 1160,
            collateral_options: [
                LiquidityRequestTypes.fixed_interest_rental,
                LiquidityRequestTypes.fixed_term_rental,
                LiquidityRequestTypes.fixed_term_loan,
            ]
        },
        {
            code_id: 1906,
            collateral_options: [
                LiquidityRequestTypes.fixed_interest_rental,
                LiquidityRequestTypes.fixed_term_rental,
                LiquidityRequestTypes.fixed_term_loan,
            ]
        },
    ],
    request_denoms: [
        {
            coinDenom: 'CONST',
            coinMinimalDenom: 'aconst',
            coinDecimals: 18,
            coinGeckoId: "constantine-network",
            coinImageUrl: '/archway.png'
        },
        {
            coinDenom: 'USDC',
            coinMinimalDenom: 'ibc/usdc',
            coinDecimals: 18,
            coinGeckoId: "",
            coinImageUrl: '/usdc.png'
        }
    ],
    vault_collection_path: 'vaults',
    validators_img_base_url: 'https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/archway/moniker/'
};

const archway_mainnet = {
    src: ArchwayMainnetKeplrConfig,
    gas_price: '900000000000.000000000000000000aarch',
    sudomod_address: 'archway1wyq63wtaktujyp7zrd58ytzc76g9vtamlgwrq9qhhf0j32usvfesn9s38g',
    vault_creation_fee: coin('10000000000000000000', 'aarch'),
    explorer_url: 'https://mintscan.io/archway',
    vault_versions: [
        {
            code_id: 156,
            collateral_options: [
                LiquidityRequestTypes.fixed_interest_rental,
                // @Deprecated LiquidityRequestTypes.fixed_term_rental,
                LiquidityRequestTypes.fixed_term_loan,
            ]
        },
        {
            code_id: 277,
            collateral_options: [
                LiquidityRequestTypes.fixed_interest_rental,
                LiquidityRequestTypes.fixed_term_rental,
                LiquidityRequestTypes.fixed_term_loan,
            ]
        },
    ],
    request_denoms: [
        {
            coinDenom: 'USDC',
            coinMinimalDenom: 'ibc/43897B9739BD63E3A08A88191999C632E052724AB96BD4C74AE31375C991F48D',
            coinDecimals: 6,
            coinGeckoId: "",
            coinImageUrl: '/usdc.png'
        },
        {
            coinDenom: 'ARCH',
            coinMinimalDenom: 'aarch',
            coinDecimals: 18,
            coinGeckoId: "archway",
            coinImageUrl: '/archway.png'
        },
        {
            coinDenom: 'USDC(DEPRECATED)',
            coinMinimalDenom: 'ibc/usdc',
            coinDecimals: 18,
            coinGeckoId: "",
            coinImageUrl: '/usdc.png'
        }
    ],
    vault_collection_path: 'archway_mainnet_vaults',
    validators_img_base_url: 'https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/archway/moniker/'
};

export const supportedChains: SudoStakeChainInfoSchema[] = [
    archway_mainnet,
    archway_constantine_3
];

export function get_chain_info_from_rpc(rpc: string): SudoStakeChainInfoSchema | null {
    return supportedChains.find(c => c.src.rpc === rpc);
}

export function get_chain_info_from_id(id: string): SudoStakeChainInfoSchema | null {
    return supportedChains.find(c => c.src.chainId === id);
}
