import { LiquidityRequestType } from "../enums/liquidity_request_type"

export type VaultVersion = {
    code_id: number,
    collateral_options: LiquidityRequestType[]
}