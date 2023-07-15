export interface IObjectMap<T> {
    [key: string]: T;
}

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

export type VaultIndex = {
    status?: string,
    request_type?: LiquidityRequestTypes,
    requested_amount?: {
        denom: string,
        amount: number,
    },
    can_cast_vote?: boolean,
    claimable_tokens?: number,
    duration_in_seconds?: number,
    interest_amount?: number,
    collateral_amount?: number
};

export type VaultInfo = {
    index: VaultIndex,
    config: any,
    liquidity_request: any
}