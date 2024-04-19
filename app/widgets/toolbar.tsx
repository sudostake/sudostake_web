'use client'

import classNames from 'classnames';
import { useEffect } from 'react';
import { get_chain_info_from_id, supportedChains } from '../utils/supported_chains';
import { useRecoilState } from 'recoil';
import { selectedChainState, walletState } from '../state';
import SelectNetworkDialog from './select_network_dialog';
import { WalletStatusTypes } from '../utils/interface';
import Image from 'next/image';
import ClipBoardButton from './clipboard_button';
import { useConnectWallet } from '../hooks/use_connect_wallet';
import { FaSignOutAlt } from 'react-icons/fa';

export default function ToolBar() {
    const [{ name, status, address, wallet_logo_url }, setWalletState] = useRecoilState(walletState);
    const [chainInfo, setSelectedChainState] = useRecoilState(selectedChainState);
    const { mutate: connectWallet } = useConnectWallet();

    // Auto select chain
    useEffect(() => {
        const selected_chain_id = localStorage.getItem('selected_chain_id');
        if (selected_chain_id) {
            setSelectedChainState(get_chain_info_from_id(selected_chain_id));
        } else {
            const default_chain = supportedChains[0];
            localStorage.setItem('selected_chain_id', default_chain.src.chainId);
            setSelectedChainState(default_chain);
        }
    }, [setSelectedChainState]);

    // Listen to wallet keystore change
    useEffect(() => {
        if (status === WalletStatusTypes.connected) {
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

    function resetWalletConnection() {
        // Reset wallet connection state
        setWalletState({
            status: WalletStatusTypes.idle,
            address: '',
            name: '',
            client: null,
            wallet_logo_url: '',
            selected_wallet: null
        })

        // Update local storage
        localStorage.removeItem('selected_wallet');
    }

    return (
        <div className={
            classNames(
                "fixed z-20 top-0 flex flex-row sm:justify-between",
                "w-full h-20",
                "sm:pl-56",
                "border-b border-zinc-300 dark:border-zinc-700",
                "bg-opacity-80 backdrop-blur-xs"
            )
        }>
            <div className='h-20 flex items-center pl-4 pr-8 border-r border-zinc-300 dark:border-zinc-700'>
                {
                    chainInfo &&
                    <SelectNetworkDialog selected_chain={chainInfo} />
                }
            </div>

            {
                status === WalletStatusTypes.connected && chainInfo &&
                <div className="h-20 flex flex-row gap-2 items-center max-sm:grow max-sm:pl-4">
                    <Image
                        src={wallet_logo_url}
                        alt="wallet logo"
                        width={24}
                        height={24}
                        priority
                        className="rounded-full"
                    />

                    <span className=''>
                        <ClipBoardButton label={name} address={address} size='min' />
                    </span>

                    <span
                        className={
                            classNames(
                                "flex justify-center ml-8 max-sm:ml-auto ",
                                "border-l border-zinc-300 dark:border-zinc-700",
                                "h-20 w-20"
                            )
                        }
                    >
                        <button onClick={() => resetWalletConnection()}> <FaSignOutAlt className="w-5 h-5" /></button>
                    </span>
                </div>
            }
        </div>
    )
}
