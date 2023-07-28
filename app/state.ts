import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { ChainInfo, supportedChains } from './utils/supported_chains';
import { atom } from 'recoil'

export enum WalletStatusType {
    /* nothing happens to the wallet */
    idle = '@wallet-state/idle',
    /* connecting to the wallet */
    connecting = '@wallet-state/connecting',
    /* the wallet is fully connected */
    connected = '@wallet-state/connected',
    /* error when tried to connect */
    error = '@wallet-state/error',
}

export type WalletState = {
    client: SigningCosmWasmClient | null,
    status: WalletStatusType,
    name: string,
    address: string,
};

export const walletState = atom<WalletState>({
    key: 'walletState',
    default: {
        client: null,
        status: WalletStatusType.idle,
        name: '',
        address: '',
    },
    dangerouslyAllowMutability: true,
});

export const sideBarToggleState = atom<boolean>({
    key: 'sideBarToggleState',
    default: false,
});

export const toolBarState = atom<{
    title: string,
    show_back_nav: boolean,
}>({
    key: 'toolBarState',
    default: {
        title: '',
        show_back_nav: false,
    },
});

export const selectedChainState = atom<ChainInfo>({
    key: 'selectedChainState',
    default: supportedChains[0],
});

export type ValidatorInfo = {
    name: string,
    address: string,
    delegated_amount: string
};

type UnbondingEntry = {
    amount: number,
    completion_time: string
}

export type ValidatorUnbondingInfo = {
    name: string,
    address: string,
    entries: UnbondingEntry[]
};

export const validatorListState = atom<{
    validator_list: ValidatorInfo[],
    validator_unbonding_list: ValidatorUnbondingInfo[]

}>({
    key: 'validatorListState',
    default: {
        validator_list: [],
        validator_unbonding_list: []
    },
});
