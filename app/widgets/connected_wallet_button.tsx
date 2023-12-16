'use client'

import { FaSignOutAlt } from "react-icons/fa"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { WalletStatusTypes, selectedChainState, sideBarToggleState, walletState } from "../state";
import ClipBoardButton from "./clipboard_button";
import SelectNetworkDialog from "./select_network_dialog";
import Image from "next/image";
import { useConnectWallet } from "../hooks/use_connect_wallet";
import { useEffect } from "react";

export default function ConnectedWalletButton() {
    const [{ name, status, address, wallet_logo_url }, setWalletState] = useRecoilState(walletState);
    const chainInfo = useRecoilValue(selectedChainState);
    const setSideBarState = useSetRecoilState(sideBarToggleState);
    const { mutate: connectWallet } = useConnectWallet();

    // Listen to wallet keystore change
    useEffect(() => {
        if (status === WalletStatusTypes.connected) {
            const reconnectWallet = () => {
                connectWallet();
            }

            window.addEventListener("keplr_keystorechange", reconnectWallet);
            window.addEventListener("leap_keystorechange", reconnectWallet);
            //window.addEventListener('cosmostation_keystorechange', reconnectWallet);

            return () => {
                window.removeEventListener("keplr_keystorechange", reconnectWallet);
                window.removeEventListener("leap_keystorechange", reconnectWallet);
                // window.removeEventListener('cosmostation_keystorechange', reconnectWallet);
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

        // Close nav bar
        setSideBarState(false);
    }

    return (
        <>
            {
                status === WalletStatusTypes.connected && chainInfo &&
                <span className="flex flex-col w-full">
                    <SelectNetworkDialog selected_chain={chainInfo} />

                    <span className="flex items-center px-4 w-full h-16 border-t border-zinc-400 dark:border-zinc-700">
                        <Image
                            src={wallet_logo_url}
                            alt="wallet logo"
                            width={24}
                            height={24}
                            priority
                            className="rounded-full"
                        />
                        <span className="ml-6 text-sm lg:text-base font-medium">{name.toUpperCase()}</span>
                        <span className="ml-auto mr-4">
                            <ClipBoardButton address={address} />
                        </span>
                        <span className="flex justify-center rounded-full">
                            <button onClick={() => resetWalletConnection()}> <FaSignOutAlt className="w-5 h-5" /></button>
                        </span>
                    </span>
                </span>
            }
        </>
    )
}
