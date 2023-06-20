'use client'

import { FaSignInAlt, FaSignOutAlt, FaSpinner, FaUser } from "react-icons/fa"
import { useRecoilState } from "recoil";
import { WalletStatusType, walletState } from "../providers";
import { useConnectWallet } from "../hooks/use_connect_wallet";
import ClipBoardButton from "./clipboard_button";

export default function ConnectWalletButton() {
    const { mutate: connectWallet } = useConnectWallet()
    const [{ name, status }, setWalletState] = useRecoilState(walletState)

    const resetWalletConnection = () => {
        setWalletState({
            status: WalletStatusType.idle,
            address: '',
            name: '',
            client: null,
        })
    }

    const get_button_state = () => {
        switch (status) {
            case WalletStatusType.error:
            case WalletStatusType.idle:
                return <button onClick={() => connectWallet()} className="flex items-center px-3 w-full h-16 border-t-2 border-current">
                    <FaSignInAlt className="w-6 h-6 mr-3" />
                    <span className="ml-2 text-sm lg:text-lg font-medium">Connect Wallet</span>
                </button>

            case WalletStatusType.connecting:
                return <button className="flex items-center px-3 w-full h-16 border-t-2 border-current">
                    <FaSpinner className="w-6 h-6 mr-3 spinner" />
                    <span className="ml-2 text-sm lg:text-lg font-medium">Connecting...</span>
                </button>

            case WalletStatusType.connected:
                return (
                    <span className="flex items-center px-4 w-full h-16 border-t-2 border-current">
                        <FaUser className="w-6 h-6 mr-3" />
                        <span className="ml-2 text-sm lg:text-lg font-medium">{name}</span>
                        <span className="flex justify-center w-10 h-10 rounded-full border-2 border-transparent hover:border-current ml-auto mr-4">
                            <ClipBoardButton />
                        </span>
                        <span className="flex justify-center w-10 h-10 rounded-full border-2 border-transparent hover:border-current mr-4">
                            <button onClick={() => resetWalletConnection()}> <FaSignOutAlt className="w-5 h-5" /></button>
                        </span>
                    </span>
                )
        }
    }

    return (
        <>
            {get_button_state()}
        </>
    )
}
