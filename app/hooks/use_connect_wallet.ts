import { WalletStatusType, selectedChainState, walletState } from '../state'
import {
    useMutation,
} from '@tanstack/react-query'
import { useRecoilState, useRecoilValue } from 'recoil'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import { GAS_PRICE } from '../utils/constants'
import { useEffect } from 'react'
import { WalletType } from '../utils/supported_wallets'

export const useConnectWallet = () => {
    const [{ status }, setWalletState] = useRecoilState(walletState)
    const chainInfo = useRecoilValue(selectedChainState)
    const mutation = useMutation(async () => {
        /* set the fetching state */
        setWalletState((value) => ({
            ...value,
            client: null,
            status: WalletStatusType.connecting,
        }))

        // Prepare environment for selected wallet
        const selected_wallet = localStorage.getItem('selected_wallet') as WalletType;
        switch (selected_wallet) {
            case WalletType.keplr: {
                if (!window?.keplr) {
                    alert('Please install Keplr extension and refresh the page')
                } else {
                    window.wallet = window.keplr;
                }

                break;
            }

            case WalletType.leap: {
                if (!window?.leap) {
                    alert('Please install leap extension or use the in-app browser in the mobile app')
                } else {
                    window.wallet = window.leap;
                }

                break;
            }

            case WalletType.cosmostation: {
                if (!window?.cosmostation) {
                    alert('Please install cosmostation extension or use the in-app browser in the mobile app');
                } else {
                    window.wallet = window.cosmostation.providers.keplr;
                }

                break;
            }
        }

        // Connect wallet
        await window.wallet.experimentalSuggestChain(chainInfo.src);
        await window.wallet.enable(chainInfo.src.chainId);

        const offlineSigner = window.wallet.getOfflineSigner(chainInfo.src.chainId);
        const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
            chainInfo.src.rpc,
            offlineSigner,
            {
                gasPrice: GasPrice.fromString(GAS_PRICE),
            }
        )
        const [{ address }] = await offlineSigner.getAccounts();
        const key = await window.wallet.getKey(chainInfo.src.chainId);

        // Return response
        return {
            name: key.name,
            address,
            client: wasmChainClient,
            status: WalletStatusType.connected,
        };
    }, {
        onSuccess(res) {
            setWalletState(res);

            // Update local storage
            localStorage.setItem('connection_status', WalletStatusType.connected);
        },
        onError(e) {
            setWalletState({
                name: '',
                address: '',
                client: null,
                status: WalletStatusType.error,
            })
        }
    });

    // Listen to wallet address change in keplr
    useEffect(
        function listenToWalletAddressChangeInKeplr() {
            function reconnectWallet() {
                if (status === WalletStatusType.connected) {
                    mutation.mutate(null)
                }
            }
            window.addEventListener('keplr_keystorechange', reconnectWallet)

            return () => {
                window.removeEventListener('keplr_keystorechange', reconnectWallet)
            }
        },
        // eslint-disable-next-line
        [status]
    )

    // Listen to wallet address change in leap
    useEffect(
        function listenToWalletAddressChangeInKeplr() {
            function reconnectWallet() {
                if (status === WalletStatusType.connected) {
                    mutation.mutate(null)
                }
            }
            window.addEventListener('leap_keystorechange', reconnectWallet)

            return () => {
                window.removeEventListener('leap_keystorechange', reconnectWallet)
            }
        },
        // eslint-disable-next-line
        [status]
    )

    // Listen to wallet address change in cosmostation
    useEffect(
        function listenToWalletAddressChangeInCosmostation() {
            function reconnectWallet() {
                if (status === WalletStatusType.connected) {
                    mutation.mutate(null)
                }
            }

            window?.cosmostation?.cosmos.on('accountChanged', () => reconnectWallet)
            return () => { }
        },
        // eslint-disable-next-line
        [status]
    )

    return mutation;
}