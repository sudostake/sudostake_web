import { WalletStatusType, selectedChainState, walletState } from '../state'
import {
    useMutation,
} from '@tanstack/react-query'
import { useRecoilState, useRecoilValue } from 'recoil'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
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
                    alert('Please install Keplr extension and refresh the page');
                    throw new Error('Error connecting wallet');
                } else {
                    window.wallet = window.keplr;
                }

                break;
            }

            case WalletType.leap: {
                if (!window?.leap) {
                    alert('Please install leap extension or use the in-app browser in the mobile app');
                    throw new Error('Error connecting wallet');
                } else {
                    window.wallet = window.leap;
                }

                break;
            }

            case WalletType.cosmostation: {
                if (!window?.cosmostation) {
                    alert('Please install cosmostation extension or use the in-app browser in the mobile app');
                    throw new Error('Error connecting wallet');
                } else {
                    window.wallet = window.cosmostation.providers.keplr;
                }

                break;
            }
        }

        // Try connect keplr
        if (selected_wallet === WalletType.keplr) {
            await window.keplr.experimentalSuggestChain(chainInfo.src)
            await window.keplr.enable(chainInfo.src.chainId)

            const offlineSigner = await window.getOfflineSignerAuto(
                chainInfo.src.chainId
            )
            const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
                chainInfo.src.rpc,
                offlineSigner,
                {
                    gasPrice: GasPrice.fromString(chainInfo.gas_price),
                }
            )
            const [{ address }] = await offlineSigner.getAccounts()
            const key = await window.keplr.getKey(chainInfo.src.chainId)

            // Return response
            return {
                name: key.name,
                address,
                client: wasmChainClient,
                status: WalletStatusType.connected,
                wallet_logo_url: '/keplr_logo.svg',
            };
        }

        // Try connect leap
        if (selected_wallet === WalletType.leap) {
            await window.leap.experimentalSuggestChain(chainInfo.src)
            await window.leap.enable(chainInfo.src.chainId)

            const offlineSigner = await window.leap.getOfflineSignerAuto(
                chainInfo.src.chainId
            )
            const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
                chainInfo.src.rpc,
                offlineSigner,
                {
                    gasPrice: GasPrice.fromString(chainInfo.gas_price),
                }
            )
            const [{ address }] = await offlineSigner.getAccounts()
            const key = await window.leap.getKey(chainInfo.src.chainId)

            // Return response
            return {
                name: key.name,
                address,
                client: wasmChainClient,
                status: WalletStatusType.connected,
                wallet_logo_url: '/leap_wallet_logo.svg',
            };
        }

        // Try connect cosmostation
        if (selected_wallet === WalletType.cosmostation) {
            await window.wallet.experimentalSuggestChain(chainInfo.src);
            await window.wallet.enable(chainInfo.src.chainId);

            const offlineSigner = window.wallet.getOfflineSigner(chainInfo.src.chainId);
            const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
                chainInfo.src.rpc,
                offlineSigner,
                {
                    gasPrice: GasPrice.fromString(chainInfo.gas_price),
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
                wallet_logo_url: '/ibc_wallet.png',
            };
        }
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
                wallet_logo_url: '',
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
