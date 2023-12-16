'use client'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { SudoStakeChainInfoSchema } from './utils/supported_chains';
import { atom } from 'recoil'
import { WalletTypes } from './utils/interface';

export enum WalletStatusTypes {
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
    status: WalletStatusTypes,
    name: string,
    address: string,
    wallet_logo_url: string,
    selected_wallet: WalletTypes | null
};

export const walletState = atom<WalletState>({
    key: 'walletState',
    default: {
        client: null,
        status: WalletStatusTypes.idle,
        name: '',
        address: '',
        wallet_logo_url: '',
        selected_wallet: null
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

export const selectedChainState = atom<SudoStakeChainInfoSchema>({
    key: 'selectedChainState',
    default: null,
});

export type ValidatorInfo = {
    name: string,
    address: string,
    delegated_amount: number
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

export const VaultIndexErrorState = atom<boolean>({
    key: 'VaultIndexErrorState',
    default: false,
});