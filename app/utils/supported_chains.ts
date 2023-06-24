import { JsonObject } from "@cosmjs/cosmwasm-stargate";
import { Coin, coin } from "@cosmjs/stargate";

export type ChainInfo = {
    chain_id: string,
    logo_url: string,
    rpc_endpoint: string,
    denom: string,
    vault_creation_fee: Coin,
    sudomod_address: string,
    full_chain_info: JsonObject
};

const archwayCurrency = {
    coinDenom: 'CONST',
    coinMinimalDenom: 'aconst',
    coinDecimals: 18,
    coinGeckoId: 'constantine-network',
};
const archwayChainInfo = {
    chainId: 'constantine-3',
    chainName: 'Constantine',
    rpc: 'https://rpc.constantine.archway.tech',
    rest: 'https://api.constantine.archway.tech',
    stakeCurrency: archwayCurrency,
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: 'archway',
        bech32PrefixAccPub: 'archwaypub',
        bech32PrefixValAddr: 'archwayvaloper',
        bech32PrefixValPub: 'archwayvaloperpub',
        bech32PrefixConsAddr: 'archwayvalcons',
        bech32PrefixConsPub: 'archwayvalconspub',
    },
    currencies: [archwayCurrency],
    feeCurrencies: [archwayCurrency],
    coinType: 118,
    features: ['cosmwasm', 'ibc-transfer', 'ibc-go'],
    // walletUrlForStaking: '',
};


export const supportedChains: ChainInfo[] = [
    {
        chain_id: 'constantine-3',
        logo_url: '/archway.png',
        rpc_endpoint: 'https://rpc.constantine.archway.tech:443',
        denom: 'aconst',
        vault_creation_fee: coin('10000000000000000000', 'aconst'),
        sudomod_address: 'archway1unl5gda9zxr0dzcvsqs057quzku532vakprq44t8emz2edwcqcvs6z8aug',
        full_chain_info: archwayChainInfo
    },
    {
        chain_id: 'chihuahua-1',
        logo_url: '/huahua.png',
        rpc_endpoint: 'https://rpc.chihuahua.wtf:443/',
        denom: 'aconst',
        vault_creation_fee: coin('1000000', 'uhuahua'),
        sudomod_address: '',
        full_chain_info: {}
    },
];

