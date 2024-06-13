import { LiquidityRequestType } from "../enums/liquidity_request_type";

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
    request_type?: LiquidityRequestType,

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
}