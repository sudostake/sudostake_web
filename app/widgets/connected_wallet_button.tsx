'use client'

import { FaSignOutAlt } from "react-icons/fa"
import { useRecoilState, useSetRecoilState } from "recoil";
import { WalletStatusType, selectedChainState, sideBarToggleState, walletState } from "../state";
import { useConnectWallet } from "../hooks/use_connect_wallet";
import ClipBoardButton from "./clipboard_button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { get_chain_info_from_id, supportedChains } from "../utils/supported_chains";
import SelectNetworkDialog from "./select_network_dialog";

export default function ConnectedWalletButton() {
    const { mutate: connectWallet } = useConnectWallet();
    const [{ name, status, address }, setWalletState] = useRecoilState(walletState);
    const [chainInfo, setSelectedChainState] = useRecoilState(selectedChainState);
    const setSideBarState = useSetRecoilState(sideBarToggleState);
    const router = useRouter();

    // Auto select chain
    useEffect(() => {
        const selected_chain_id = localStorage.getItem('selected_chain_id');

        if (selected_chain_id && !chainInfo) {
            setSelectedChainState(get_chain_info_from_id(selected_chain_id));
        }

        if (!selected_chain_id) {
            const default_chain = supportedChains[0];
            localStorage.setItem('selected_chain_id', default_chain.src.chainId);
            setSelectedChainState(default_chain);
        }
    }, [chainInfo]);

    // Try auto-connect wallet
    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('connection_status') === WalletStatusType.connected &&
                status !== WalletStatusType.connected && chainInfo) {
                connectWallet();
            }
        }, 100)
    }, [chainInfo, status, connectWallet]);

    const resetWalletConnection = () => {
        // Go back to home route
        router.replace('/');

        // Reset wallet connection state
        setWalletState({
            status: WalletStatusType.idle,
            address: '',
            name: '',
            client: null,
        })

        // Update local storage
        localStorage.setItem('connection_status', WalletStatusType.idle);
        localStorage.removeItem('selected_wallet');

        // Close nav bar
        setSideBarState(false);
    }

    return (
        <>
            {
                status === WalletStatusType.connected && chainInfo &&
                <span className="flex flex-col w-full">
                    <SelectNetworkDialog selected_chain={chainInfo} />

                    <span className="flex items-center px-4 w-full h-16 border-t border-current">
                        <span className="ml-2 text-sm lg:text-base font-medium">{name.toUpperCase()}</span>
                        <span className="ml-auto mr-4">
                            <ClipBoardButton address={address} />
                        </span>
                        <span className="flex justify-center w-9 h-9 rounded-full border border-transparent hover:border-current mr-2">
                            <button onClick={() => resetWalletConnection()}> <FaSignOutAlt className="w-5 h-5" /></button>
                        </span>
                    </span>
                </span>
            }
        </>
    )
}
