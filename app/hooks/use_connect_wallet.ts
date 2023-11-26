import { WalletStatusType, selectedChainState, walletState } from '../state'
import {
    useMutation,
} from '@tanstack/react-query'
import { useRecoilState, useRecoilValue } from 'recoil'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import { useEffect } from 'react'
import { WalletTypes } from '../utils/interface'

export const useConnectWallet = () => {
    const [{ status }, setWalletState] = useRecoilState(walletState)
    const chainInfo = useRecoilValue(selectedChainState)
    const mutation = useMutation(
        async () => {
            // Get selected wallet
            const selected_wallet = localStorage.getItem('selected_wallet') as WalletTypes;

            /* set the fetching state */
            setWalletState((value) => ({
                ...value,
                client: null,
                status: WalletStatusType.connecting,
                selected_wallet
            }));

            // Try connect keplr
            if (selected_wallet === WalletTypes.keplr) {
                if (!window?.keplr) {
                    alert('Please install Keplr extension and refresh the page');
                    throw new Error('Error connecting wallet');
                }

                await window.keplr.experimentalSuggestChain(chainInfo.src);
                await window.keplr.enable(chainInfo.src.chainId);

                const offlineSigner = await window.keplr.getOfflineSignerAuto(
                    chainInfo.src.chainId
                );
                const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
                    chainInfo.src.rpc,
                    offlineSigner,
                    {
                        gasPrice: GasPrice.fromString(chainInfo.gas_price),
                    }
                );
                const [{ address }] = await offlineSigner.getAccounts();
                const key = await window.keplr.getKey(chainInfo.src.chainId);

                // Return response
                return {
                    name: key.name,
                    address,
                    client: wasmChainClient,
                    status: WalletStatusType.connected,
                    wallet_logo_url: '/keplr_logo.svg',
                    selected_wallet
                };
            }

            // Try connect leap
            if (selected_wallet === WalletTypes.leap) {
                if (!window?.leap) {
                    alert('Please install leap extension or use the in-app browser in the mobile app');
                    throw new Error('Error connecting wallet');
                }

                await window.leap.enable(chainInfo.src.chainId);

                const offlineSigner = await window.leap.getOfflineSignerAuto(
                    chainInfo.src.chainId
                );
                const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
                    chainInfo.src.rpc,
                    offlineSigner,
                    {
                        gasPrice: GasPrice.fromString(chainInfo.gas_price),
                    }
                );
                const [{ address }] = await offlineSigner.getAccounts();
                const key = await window.leap.getKey(chainInfo.src.chainId);

                // Return response
                return {
                    name: key.name,
                    address,
                    client: wasmChainClient,
                    status: WalletStatusType.connected,
                    wallet_logo_url: '/leap_wallet_logo.svg',
                    selected_wallet
                };
            }

            // Try connect cosmostaion
            if (selected_wallet === WalletTypes.cosmostation) {
                if (!window?.cosmostation) {
                    alert('Please install cosmostaion extension or use the in-app browser in the mobile app');
                    throw new Error('Error connecting wallet');
                }

                await window.cosmostation.providers.keplr.experimentalSuggestChain(chainInfo.src)
                await window.cosmostation.providers.keplr.enable(chainInfo.src.chainId)

                const offlineSigner = await window.cosmostation.providers.keplr.getOfflineSigner(
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
                const key = await window.cosmostation.providers.keplr.getKey(chainInfo.src.chainId)

                // Return response
                return {
                    name: key.name,
                    address,
                    client: wasmChainClient,
                    status: WalletStatusType.connected,
                    wallet_logo_url: '/ibc_wallet.png',
                    selected_wallet
                };
            }
        }, {
        onSuccess(res) {
            setWalletState(res);

            // Update local storage
            localStorage.setItem('connection_status', WalletStatusType.connected);
        },
        onError(_) {
            setWalletState({
                name: '',
                address: '',
                client: null,
                status: WalletStatusType.error,
                wallet_logo_url: '',
                selected_wallet: null
            })
        }
    });

    // Listen to wallet keystore change
    useEffect(
        () => {
            function reconnectWallet() {
                if (status === WalletStatusType.connected) {
                    mutation.mutate(null)
                }
            }

            window.addEventListener('keplr_keystorechange', reconnectWallet);
            window.addEventListener('leap_keystorechange', reconnectWallet);
            window.addEventListener('cosmostation_keystorechange', reconnectWallet);

            return () => {
                window.removeEventListener('keplr_keystorechange', reconnectWallet);
                window.removeEventListener('leap_keystorechange', reconnectWallet);
                window.removeEventListener('cosmostation_keystorechange', reconnectWallet);
            }
        },
        [status, mutation]
    )

    return mutation;
}
