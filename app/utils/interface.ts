export interface IObjectMap<T> {
    [key: string]: T;
}

export type RequestOption = {
    id: LiquidityRequestTypes,
    title: string,
    description: string
};

export enum LiquidityRequestTypes {
    fixed_interest_rental = 'fixed_interest_rental',
    fixed_term_rental = 'fixed_term_rental',
    fixed_term_loan = 'fixed_term_loan',
}

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

    /**
     * These applies to only fixed term loan request option
     */
    interest_amount?: number,
    collateral_amount?: number,

    // This is the expiry date for fixed term liquidity request options
    end_time?: string | 'EXPIRED',

    // This indicates if an expired fixed term loan is currently undergoing liquidation by the lender
    processing_liquidation?: boolean,

    // This is the amount staked in the vault
    tvl?: number,
};
