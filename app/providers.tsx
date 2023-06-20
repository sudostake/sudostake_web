'use client';

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import {
    RecoilRoot,
    atom,
} from 'recoil';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { DEFAULT_REFETCH_ON_WINDOW_FOCUS_STALE_TIME } from './utils/constants';

type ToolBarInfo = {
    title: string,
    show_back_nav: boolean,
};

type WalletState = {
    client: SigningCosmWasmClient | null,
    status: WalletStatusType,
    name: string,
    address: String,
};

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

export const sideBarToggleState = atom<boolean>({
    key: 'sideBarToggleState',
    default: false,
});

export const toolBarState = atom<ToolBarInfo>({
    key: 'toolBarState',
    default: {
        title: '',
        show_back_nav: false,
    },
});

export const walletState = atom<WalletState>({
    key: 'walletState',
    default: {
        client: null,
        status: WalletStatusType.idle,
        name: '',
        address: '',
    },
});

export function Providers({ children }: {
    children: React.ReactNode
}) {
    return (
        <RecoilRoot>
            <QueryClientProvider client={new QueryClient({})}>
                {children}
            </QueryClientProvider>
        </RecoilRoot>
    );
}