'use client'

import { FaSignOutAlt } from "react-icons/fa"
import { useRecoilState, useSetRecoilState } from "recoil";
import { WalletStatusType, selectedChainState, sideBarToggleState, walletState } from "../state";
import { useConnectWallet } from "../hooks/use_connect_wallet";
import ClipBoardButton from "./clipboard_button";
import { useEffect } from "react";
import { get_chain_info_from_id, supportedChains } from "../utils/supported_chains";
import SelectNetworkDialog from "./select_network_dialog";
import Image from "next/image";
import { WalletType } from "../utils/supported_wallets";

export default function ConnectedWalletButton() {
    const { mutate: connectWallet } = useConnectWallet();
    const [{ name, status, address, wallet_logo_url }, setWalletState] = useRecoilState(walletState);
    const [chainInfo, setSelectedChainState] = useRecoilState(selectedChainState);
    const setSideBarState = useSetRecoilState(sideBarToggleState);

    const resetWalletConnection = () => {
        // Reset wallet connection state
        setWalletState({
            status: WalletStatusType.idle,
            address: '',
            name: '',
            client: null,
            wallet_logo_url: '',
        })

        // Update local storage
        localStorage.setItem('connection_status', WalletStatusType.idle);
        localStorage.removeItem('selected_wallet');

        // Close nav bar
        setSideBarState(false);
    }

    // Auto select chain
    useEffect(() => {
        const selected_chain_id = localStorage.getItem('selected_chain_id');

        if (selected_chain_id && !chainInfo) {
            setSelectedChainState(get_chain_info_from_id(selected_chain_id));
        }

        if (!selected_chain_id) {
            const default_chain = supportedChains[1];
            localStorage.setItem('selected_chain_id', default_chain.src.chainId);
            setSelectedChainState(default_chain);
        }
    }, [chainInfo, setSelectedChainState]);

    // Try auto-connect wallet
    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('connection_status') === WalletStatusType.connected &&
                status !== WalletStatusType.connected && chainInfo) {
                connectWallet();
            }
        }, 100)
    }, [chainInfo, status, connectWallet]);

    // Reset wallet connection if cosmostation was connected by a client
    // because we have deprecated it for now.
    useEffect(() => {
        // Disconnect any user that is already connected to cosmostation
        // because we have deprecated support for it
        const selected_wallet = localStorage.getItem('selected_wallet') as WalletType;
        if (selected_wallet === WalletType.cosmostation) { resetWalletConnection(); }
    }, []);

    return (
        <>
            {
                status === WalletStatusType.connected && chainInfo &&
                <span className="flex flex-col w-full">
                    <SelectNetworkDialog selected_chain={chainInfo} />

                    <span className="flex items-center px-4 w-full h-16 border-t border-current">
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
