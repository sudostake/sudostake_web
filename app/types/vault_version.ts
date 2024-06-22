import { LiquidityRequest } from "../enums/liquidity_request"

export type VaultVersion = {
    code_id: number,
    collateral_options: LiquidityRequest[]
}