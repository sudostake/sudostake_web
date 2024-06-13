import { Coin } from "@cosmjs/stargate"
import { Currency } from "./currency"
import { VaultVersion } from "./vault_version"
import { KeplrWalletConfig } from "./keplr_wallet_config"

export type SudoStakeChainInfoSchema = {
    // Define chain properties
    chain_id: string,
    chain_name: string,
    chain_logo_url: string,
    rpc: string,
    rest: string,
    stakeCurrency: Currency,
    validators_img_base_url: string,
    explorer_url: string,

    // Define contract properties 
    sudomod_address: string,
    vault_versions: VaultVersion[],
    vault_creation_fee: Coin,

    // Define firestore collection path
    vault_collection_path: string,

    // Define app properties
    request_currencies: Currency[],

    // Gas settings
    gas_price: string

    // Define keplr config
    keplr_wallet_config: KeplrWalletConfig
}