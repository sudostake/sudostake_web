'use client'

import classNames from 'classnames';
import { useEffect } from 'react';
import { get_chain_info_from_id, supportedChains } from '../utils/supported_chains';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedChainState, walletState } from '../state';
import SelectNetwork from './select_network';
import { useConnectWallet } from '../hooks/use_connect_wallet';
import { WalletStatus } from '../enums/wallet_status';
import SearchWidget from './search_widget';
import WalletInfo from './wallet-info';
import ConnectWallet from './connect_wallet';

export default function ToolBar() {
    const { status } = useRecoilValue(walletState);
    const [chainInfo, setSelectedChainState] = useRecoilState(selectedChainState);
    const { mutate: connectWallet } = useConnectWallet();

    // Auto select chain
    useEffect(() => {
        const selected_chain_id = localStorage.getItem('selected_chain_id');
        if (selected_chain_id) {
            setSelectedChainState(get_chain_info_from_id(selected_chain_id));
        } else {
            const default_chain = supportedChains[0];
            localStorage.setItem('selected_chain_id', default_chain.chain_id);
            setSelectedChainState(default_chain);
        }
    }, [setSelectedChainState]);

    // Listen to wallet keystore change
    useEffect(() => {
        if (status === WalletStatus.connected) {
            const reconnectWallet = () => {
                connectWallet();
            }

            window.addEventListener("keplr_keystorechange", reconnectWallet);
            window.addEventListener("leap_keystorechange", reconnectWallet);
            window.addEventListener('cosmostation_keystorechange', reconnectWallet);

            return () => {
                window.removeEventListener("keplr_keystorechange", reconnectWallet);
                window.removeEventListener("leap_keystorechange", reconnectWallet);
                window.removeEventListener('cosmostation_keystorechange', reconnectWallet);
            }
        }

    }, [status]);

    return (
        <div className={
            classNames(
                "fixed z-20 top-0 flex flex-row",
                "w-full h-14",
                "sm:pl-56",
                "border-b border-zinc-300 dark:border-zinc-800",
                " bg-white dark:bg-zinc-900",
            )
        }>
            <div className='h-full flex items-center pl-4 pr-8'>
                {
                    chainInfo &&
                    <SelectNetwork />
                }
            </div>

            <div className='grow'></div>


            <div className='h-full flex items-center'>
                {
                    status === WalletStatus.connected && chainInfo &&
                    <WalletInfo />
                }
            </div>

            <div className='h-full flex items-center pr-4'>
                {
                    status !== WalletStatus.connected && chainInfo &&
                    <ConnectWallet />
                }
            </div>

            <span
                className={
                    classNames(
                        "flex justify-center",
                        "border-l border-zinc-300 dark:border-zinc-800",
                        "h-full"
                    )
                }
            >
                <SearchWidget />
            </span>
        </div>
    )
}
