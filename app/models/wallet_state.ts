import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { WalletStatusType } from "../enums/wallet_status_type"
import { WalletType } from "../enums/wallet_type"

export type WalletState = {
    client: SigningCosmWasmClient | null,
    status: WalletStatusType,
    name: string,
    address: string,
    wallet_logo_url: string,
    selected_wallet: WalletType | null
}
