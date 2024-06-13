import { Currency } from "./currency"

export type KeplrWalletConfig = {
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
}