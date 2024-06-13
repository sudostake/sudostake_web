import { LiquidityRequestType } from "../enums/liquidity_request_type"

export type RequestOption = {
    id: LiquidityRequestType,
    title: string,
    description: string
}
