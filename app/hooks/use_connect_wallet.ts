import { WalletStatusType, selectedChainState, walletState } from '@/app/providers'
import {
    useMutation,
} from '@tanstack/react-query'
import { useRecoilState, useRecoilValue } from 'recoil'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import { GAS_PRICE } from '../utils/constants'
import { useEffect } from 'react'

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

        // Try to connect wallet
        if (window && !window?.keplr) {
            alert('Please install Keplr extension and refresh the page.')
            return
        }

        // Connec wallet
        const offlineSigner = window.keplr.getOfflineSigner(chainInfo.chain_id);
        const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
            chainInfo.rpc_endpoint,
            offlineSigner,
            {
                gasPrice: GasPrice.fromString(GAS_PRICE),
            }
        )
        const [{ address }] = await offlineSigner.getAccounts();
        const key = await window.keplr.getKey(chainInfo.chain_id);

        // Return success response
        return {
            name: key.name,
            address,
            client: wasmChainClient,
            status: WalletStatusType.connected,
        };
    }, {
        onSuccess(res) {
            setWalletState(res);
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

    return mutation;
}