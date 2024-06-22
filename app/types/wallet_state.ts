import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { WalletStatus } from "../enums/wallet_status"
import { Wallet } from "../enums/wallet"

export type WalletState = {
    client: SigningCosmWasmClient | null,
    status: WalletStatus,
    name: string,
    address: string,
    wallet_logo_url: string,
    selected_wallet: Wallet | null
}
