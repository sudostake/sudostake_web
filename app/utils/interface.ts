import { Coin } from "@cosmjs/stargate";
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'

// Defines the shape for objects with unique keys maping to same value type T
export interface IObjectMap<T> {
    [key: string]: T;
}

export enum WalletStatusTypes {
    idle = '@wallet-state/idle',
    connecting = '@wallet-state/connecting',
    connected = '@wallet-state/connected',
    error = '@wallet-state/error',
}

export enum WalletTypes {
    keplr = 'keplr',
    leap = 'leap',
    cosmostation = 'cosmostation',
}

export type WalletState = {
    client: SigningCosmWasmClient | null,
    status: WalletStatusTypes,
    name: string,
    address: string,
    wallet_logo_url: string,
    selected_wallet: WalletTypes | null
};

// Each enum keys have values here to override the default numeric indexing
export enum LiquidityRequestTypes {
    fixed_interest_rental = 'fixed_interest_rental',
    fixed_term_rental = 'fixed_term_rental',
    fixed_term_loan = 'fixed_term_loan',
}

export type RequestOption = {
    id: LiquidityRequestTypes,
    title: string,
    description: string
};

export type VaultVersion = {
    code_id: number,
    collateral_options: LiquidityRequestTypes[]
}

export type Currency = {
    coinDecimals: number,
    coinDenom: string,
    coinGeckoId: string,
    coinMinimalDenom: string,
    coinImageUrl: string,
    gasPriceStep?: {
        low: number,
        average: number,
        high: number
    },
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

export type SudoStakeChainInfoSchema = {
    src: KeplrChainInfoSchema,
    explorer_url: string,
    vault_creation_fee: Coin,
    request_denoms: Currency[],
    sudomod_address: string,
    vault_versions: VaultVersion[],
    vault_collection_path: string,
    gas_price: string,
    validators_img_base_url: string
};

/**
 * This type describes a vault object in a read-only firebase database
 * used as the index layer for all vaults
 */
export type VaultIndex = {
    // This is the address of the vault
    id?: string,

    // This keeps track of when this vault was last indexed
    indexed_at?: Date,

    // This is the code id this vault was instantiated from
    from_code_id?: number,

    // This is a sequential number assigned at vault creation
    index_number?: number,

    // This is the current Externally Owned Account that can control the vault
    owner?: string,

    // This is the  Externally Owned Account that lent the requested amount to the vault owner
    lender?: string,

    // This is the current user that can vote with the vault
    active_voter?: string,

    // This indicates if the vault is currently being leased out in exchange for
    // liquidity
    liquidity_request_status?: 'idle' | 'pending' | 'active',

    // This describes the terms the vault owner is offering to a potential lender
    // in excahange of the requested amount of liquidity
    request_type?: LiquidityRequestTypes,

    // This describes the amount the vault owner is requesting for
    requested_amount?: {
        denom: string,
        amount: number,
    },

    // THis conditionally applies to all all liquidity requesat types
    can_cast_vote?: boolean,

    // This applies to only fixed_interest_rental
    claimable_tokens?: number,

    // This is the amount of tokens the lender has already claimed
    already_claimed?: number,

    // This applies to only fixed term liquidity request options
    // (fixed_term_rental and fixed_term_loan)
    duration_in_seconds?: number,

    // Amount to be paid as interest on the requested amount
    // (applies only fixed term loans)
    interest_amount?: number,

    // Amount to be liquidated in the event of a default by the vault owner
    // (applies only fixed term loans)
    collateral_amount?: number,

    // This is the expiry date for fixed term liquidity request options
    end_time?: string | 'EXPIRED',

    // This indicates if an expired fixed term loan is currently 
    // undergoing liquidation by the lender
    processing_liquidation?: boolean,

    // This is the amount staked in the vault
    tvl?: number,
};

export enum vote_options_type {
    yes = 'yes',
    no = 'no',
    no_with_veto = 'no_with_veto',
    abstain = 'abstain'
}

export type Decision = {
    id: vote_options_type,
    title: string,
    description: string,
}

export type VotingVault = {
    vault: VaultIndex,
    has_voted: boolean,
}

export type ValidatorInfo = {
    name: string,
    address: string,
    delegated_amount: number
};

export type UnbondingEntry = {
    amount: number,
    completion_time: string
}

export type ValidatorUnbondingInfo = {
    name: string,
    address: string,
    entries: UnbondingEntry[]
};
