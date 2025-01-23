import { selectedChainState, walletState } from '../state'
import {
    useMutation,
} from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import { WalletStatus } from '../enums/wallet_status'
import { Wallet } from '../enums/wallet'
import { getOfflineSigner } from "@cosmostation/cosmos-client";

export const useConnectWallet = () => {
    const setWalletState = useSetRecoilState(walletState)
    const chainInfo = useRecoilValue(selectedChainState)
    const mutation = useMutation(
        async () => {
            // Get selected wallet
            const selected_wallet = localStorage.getItem('selected_wallet') as Wallet;

            /* set the fetching state */
            setWalletState((value) => ({
                ...value,
                client: null,
                status: WalletStatus.connecting,
                selected_wallet
            }));

            // Try connect keplr
            if (selected_wallet === Wallet.keplr) {

                await window.keplr.experimentalSuggestChain(chainInfo.keplr_wallet_config);
                await window.keplr.enable(chainInfo.chain_id);

                const offlineSigner: any = await window.keplr.getOfflineSignerAuto(
                    chainInfo.chain_id
                );
                const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
                    chainInfo.rpc,
                    offlineSigner,
                    {
                        gasPrice: GasPrice.fromString(chainInfo.gas_price),
                    }
                );
                const [{ address }] = await offlineSigner.getAccounts();
                const key = await window.keplr.getKey(chainInfo.chain_id);

                return {
                    name: key.name,
                    address,
                    client: wasmChainClient,
                    status: WalletStatus.connected,
                    wallet_logo_url: '/keplr_logo.svg',
                    selected_wallet
                };
            }

            // Try connect leap
            if (selected_wallet === Wallet.leap) {
                await window.leap.enable(chainInfo.chain_id);

                const offlineSigner = await window.leap.getOfflineSignerAuto(
                    chainInfo.chain_id
                );
                const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
                    chainInfo.rpc,
                    offlineSigner,
                    {
                        gasPrice: GasPrice.fromString(chainInfo.gas_price),
                    }
                );
                const [{ address }] = await offlineSigner.getAccounts();
                const key = await window.leap.getKey(chainInfo.chain_id);

                return {
                    name: key.name,
                    address,
                    client: wasmChainClient,
                    status: WalletStatus.connected,
                    wallet_logo_url: '/leap_wallet_logo.svg',
                    selected_wallet
                };
            }

            // Try connect cosmostaion
            if (selected_wallet === Wallet.cosmostation) {
                await window.cosmostation.providers.keplr.experimentalSuggestChain(chainInfo.keplr_wallet_config)
                await window.cosmostation.providers.keplr.enable(chainInfo.chain_id)

                const offlineSigner: any = await getOfflineSigner(chainInfo.chain_id);

                const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
                    chainInfo.rpc,
                    offlineSigner,
                    {
                        gasPrice: GasPrice.fromString(chainInfo.gas_price),
                    }
                )
                const [{ address }] = await offlineSigner.getAccounts()
                const key = await window.cosmostation.providers.keplr.getKey(chainInfo.chain_id)

                return {
                    name: key.name,
                    address,
                    client: wasmChainClient,
                    status: WalletStatus.connected,
                    wallet_logo_url: '/ibc_wallet.png',
                    selected_wallet
                };
            }

            // TODO Connect to ledger directly. 
        }, {
        onSuccess(res) {
            setWalletState(res);
        },
        onError(e) {
            setWalletState({
                name: '',
                address: '',
                client: null,
                status: WalletStatus.error,
                wallet_logo_url: '',
                selected_wallet: null
            })
        }
    });

    return mutation;
}
