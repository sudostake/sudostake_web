import { coin } from "@cosmjs/stargate";
import { get_constantine_3_currency_by_name, get_triomphe_currency_by_name, supported_constantine_3_currencies, supported_triomphe_currencies } from "../types/currency";
import { LiquidityRequest } from "../enums/liquidity_request";
import { KeplrWalletConfig } from "../types/keplr_wallet_config";
import { SudoStakeChainInfoSchema } from "../types/chain_info_schema";

const ArchwayTestNetKeplrConfig: KeplrWalletConfig = {
    chainId: "constantine-3",
    chainName: "Testnet",
    chainSymbolImageUrl: "/archway.png",
    stakeCurrency: get_constantine_3_currency_by_name("CONST"),
    currencies: [
        get_constantine_3_currency_by_name("CONST")
    ],
    feeCurrencies: [
        get_constantine_3_currency_by_name("CONST")
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

const ArchwayMainnetKeplrConfig: KeplrWalletConfig = {
    chainId: "archway-1",
    chainName: "Mainnet",
    chainSymbolImageUrl: "/archway.png",
    stakeCurrency: get_triomphe_currency_by_name("ARCH"),
    currencies: [
        get_triomphe_currency_by_name("ARCH")
    ],
    feeCurrencies: [
        get_triomphe_currency_by_name("ARCH")
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

const archway_constantine_3: SudoStakeChainInfoSchema = {
    keplr_wallet_config: ArchwayTestNetKeplrConfig,
    chain_id: ArchwayTestNetKeplrConfig.chainId,
    chain_name: ArchwayTestNetKeplrConfig.chainName,
    chain_logo_url: ArchwayTestNetKeplrConfig.chainSymbolImageUrl,
    rpc: ArchwayTestNetKeplrConfig.rpc,
    rest: ArchwayTestNetKeplrConfig.rest,
    stakeCurrency: ArchwayTestNetKeplrConfig.stakeCurrency,
    gas_price: '900000000000.000000000000000000aconst',
    sudomod_address: 'archway1fdnwzl70mz467h96x0stl2xdayysmnt9pgusqfpnnmjep2xyqj7q79heyg',
    vault_creation_fee: coin('10000000000000000000', 'aconst'),
    explorer_url: 'https://mintscan.io/archway-testnet',
    vault_versions: [
        {
            code_id: 484,
            collateral_options: [
                LiquidityRequest.fixed_interest_rental,
                LiquidityRequest.fixed_term_rental,
                LiquidityRequest.fixed_term_loan,
            ]
        },
        {
            code_id: 970,
            collateral_options: [
                LiquidityRequest.fixed_interest_rental,
                LiquidityRequest.fixed_term_rental,
                LiquidityRequest.fixed_term_loan,
            ]
        },
        {
            code_id: 1160,
            collateral_options: [
                LiquidityRequest.fixed_interest_rental,
                LiquidityRequest.fixed_term_rental,
                LiquidityRequest.fixed_term_loan,
            ]
        },
        {
            code_id: 1906,
            collateral_options: [
                LiquidityRequest.fixed_interest_rental,
                LiquidityRequest.fixed_term_rental,
                LiquidityRequest.fixed_term_loan,
            ]
        },
    ],
    request_currencies: supported_constantine_3_currencies,
    vault_collection_path: 'vaults',
    validators_img_base_url: 'https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/archway/moniker/'
};

const archway_mainnet: SudoStakeChainInfoSchema = {
    keplr_wallet_config: ArchwayMainnetKeplrConfig,
    chain_id: ArchwayMainnetKeplrConfig.chainId,
    chain_name: ArchwayMainnetKeplrConfig.chainName,
    chain_logo_url: ArchwayMainnetKeplrConfig.chainSymbolImageUrl,
    rpc: ArchwayMainnetKeplrConfig.rpc,
    rest: ArchwayMainnetKeplrConfig.rest,
    stakeCurrency: ArchwayMainnetKeplrConfig.stakeCurrency,
    gas_price: '900000000000.000000000000000000aarch',
    sudomod_address: 'archway1wyq63wtaktujyp7zrd58ytzc76g9vtamlgwrq9qhhf0j32usvfesn9s38g',
    vault_creation_fee: coin('10000000000000000000', 'aarch'),
    explorer_url: 'https://mintscan.io/archway',
    vault_versions: [
        {
            code_id: 156,
            collateral_options: [
                LiquidityRequest.fixed_interest_rental,
                // @Deprecated LiquidityRequest.fixed_term_rental,
                LiquidityRequest.fixed_term_loan,
            ]
        },
        {
            code_id: 277,
            collateral_options: [
                LiquidityRequest.fixed_interest_rental,
                LiquidityRequest.fixed_term_rental,
                LiquidityRequest.fixed_term_loan,
            ]
        },
    ],
    request_currencies: supported_triomphe_currencies,
    vault_collection_path: 'archway_mainnet_vaults',
    validators_img_base_url: 'https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/archway/moniker/'
};

export const supportedChains: SudoStakeChainInfoSchema[] = [
    archway_mainnet,
    archway_constantine_3
];

export function get_chain_info_from_rpc(rpc: string): SudoStakeChainInfoSchema | null {
    return supportedChains.find(c => c.rpc === rpc);
}

export function get_chain_info_from_id(id: string): SudoStakeChainInfoSchema | null {
    return supportedChains.find(c => c.chain_id === id);
}
