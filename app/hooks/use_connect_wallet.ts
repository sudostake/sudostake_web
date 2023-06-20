import { WalletStatusType, walletState } from '@/app/providers'
import {
    useMutation,
} from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import { GAS_PRICE } from '../utils/constants'
import { useEffect } from 'react'

export const useConnectWallet = () => {
    const [{ status }, setWalletState] = useRecoilState(walletState)

    const useKeplr = async () => {
        if (window && !window?.keplr) {
            alert('Please install Keplr extension and refresh the page.')
            return
        }

        try {
            const offlineSigner = window.keplr.getOfflineSigner("constantine-3");
            const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
                'https://rpc.constantine.archway.tech:443',
                offlineSigner,
                {
                    gasPrice: GasPrice.fromString(GAS_PRICE),
                }
            )

            const [{ address }] = await offlineSigner.getAccounts()
            const key = await window.keplr.getKey('constantine-3')

            /* successfully update the wallet state */
            setWalletState({
                name: key.name,
                address,
                client: wasmChainClient,
                status: WalletStatusType.connected,
            })
        } catch (e) {
            /* set the error state */
            setWalletState({
                name: '',
                address: '',
                client: null,
                status: WalletStatusType.error,
            })

            /* throw the error for the UI */
            throw e
        }
    }

    const mutation = useMutation(async () => {
        /* set the fetching state */
        setWalletState((value) => ({
            ...value,
            client: null,
            status: WalletStatusType.connecting,
        }))

        // Try to connect wallet
        await useKeplr();
    }, {});

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