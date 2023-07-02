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

export const walletState = atom<{
    client: SigningCosmWasmClient | null,
    status: WalletStatusType,
    name: string,
    address: string,
}>({
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

export const validatorListState = atom<ValidatorInfo[]>({
    key: 'validatorListState',
    default: [],
});