// Defines currency type
export type Currency = {
    coinDenom: string,
    coinMinimalDenom: string,
    coinDecimals: number,
    coinImageUrl: string,
}

// Archway constantine-3 currencies
export const supported_constantine_3_currencies: Currency[] = [
    {
        coinDenom: "CONST",
        coinMinimalDenom: "aconst",
        coinDecimals: 18,
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
    },
    {
        coinDenom: 'USDC',
        coinMinimalDenom: 'ibc/usdc',
        coinDecimals: 18,
        coinImageUrl: 'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/noble/uusdc.png'
    }
];

// Archway main-net currencies
export const supported_triomphe_currencies: Currency[] = [
    {
        coinDenom: 'USDC',
        coinMinimalDenom: 'ibc/43897B9739BD63E3A08A88191999C632E052724AB96BD4C74AE31375C991F48D',
        coinDecimals: 6,
        coinImageUrl: 'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/noble/uusdc.png'
    },
    {
        coinDenom: 'ARCH',
        coinMinimalDenom: 'aarch',
        coinDecimals: 18,
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
    },

    // Deprecated
    {
        coinDenom: 'TEST USDC',
        coinMinimalDenom: 'ibc/usdc',
        coinDecimals: 18,
        coinImageUrl: 'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/noble/uusdc.png'
    }
];

// 
export function get_triomphe_currency_by_name(name: string): Currency | null {
    return supported_triomphe_currencies.find(currency => currency.coinDenom === name);
}

// 
export function get_constantine_3_currency_by_name(name: string): Currency | null {
    return supported_constantine_3_currencies.find(currency => currency.coinDenom === name);
}