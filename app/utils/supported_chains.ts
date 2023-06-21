import { Coin, coin } from "@cosmjs/stargate";

export type ChainInfo = {
    chain_id: string,
    logo_url: string,
    rpc_endpoint: string,
    denom: string,
    vault_creation_fee: Coin,
    sudomod_address: string,
};

export const supportedChains: ChainInfo[] = [{
    chain_id: 'constantine-3',
    logo_url: '/archway.png',
    rpc_endpoint: 'https://rpc.constantine.archway.tech:443',
    denom: 'aconst',
    vault_creation_fee: coin('10000000000000000000', 'aconst'),
    sudomod_address: 'archway18jw94kucrgc20dzzt5mfs29cxksyufecc9p5dynmxfwwlfmuc32q7f2ht9'
}];