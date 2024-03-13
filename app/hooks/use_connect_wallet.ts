import { selectedChainState, walletState } from '../state'
import {
    useMutation,
} from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import { WalletStatusTypes, WalletTypes } from '../utils/interface'

export const useConnectWallet = () => {
    const setWalletState = useSetRecoilState(walletState)
    const chainInfo = useRecoilValue(selectedChainState)
    const mutation = useMutation(
        async () => {
            // Get selected wallet
            const selected_wallet = localStorage.getItem('selected_wallet') as WalletTypes;

            /* set the fetching state */
            setWalletState((value) => ({
                ...value,
                client: null,
                status: WalletStatusTypes.connecting,
                selected_wallet
            }));

            // Try connect keplr
            if (selected_wallet === WalletTypes.keplr) {
                await window.keplr.experimentalSuggestChain(chainInfo.src);
                await window.keplr.enable(chainInfo.src.chainId);

                const offlineSigner = await window.keplr.getOfflineSigner(
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
                    status: WalletStatusTypes.connected,
                    wallet_logo_url: '/keplr_logo.svg',
                    selected_wallet
                };
            }

            // Try connect leap
            if (selected_wallet === WalletTypes.leap) {
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
                    status: WalletStatusTypes.connected,
                    wallet_logo_url: '/leap_wallet_logo.svg',
                    selected_wallet
                };
            }

            // Try connect cosmostaion
            if (selected_wallet === WalletTypes.cosmostation) {
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

                // return
                return {
                    name: key.name,
                    address,
                    client: wasmChainClient,
                    status: WalletStatusTypes.connected,
                    wallet_logo_url: '/ibc_wallet.png',
                    selected_wallet
                };
            }
        }, {
        onSuccess(res) {
            setWalletState(res);
        },
        onError(_) {
            setWalletState({
                name: '',
                address: '',
                client: null,
                status: WalletStatusTypes.error,
                wallet_logo_url: '',
                selected_wallet: null
            })
        }
    });

    return mutation;
}
