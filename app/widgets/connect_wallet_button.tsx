'use client'

import { FaSignOutAlt } from "react-icons/fa"
import { useRecoilState, useRecoilValue } from "recoil";
import { WalletStatusType, selectedChainState, walletState } from "../state";
import { useConnectWallet } from "../hooks/use_connect_wallet";
import ClipBoardButton from "./clipboard_button";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConnectWalletButton() {
    const { mutate: connectWallet } = useConnectWallet()
    const [{ name, status, address }, setWalletState] = useRecoilState(walletState)
    const chainInfo = useRecoilValue(selectedChainState)
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('connection_status') === WalletStatusType.connected && status !== WalletStatusType.connected) {
                connectWallet();
            }
        }, 100)
    }, [status, connectWallet])

    const resetWalletConnection = () => {
        router.replace('/');

        setWalletState({
            status: WalletStatusType.idle,
            address: '',
            name: '',
            client: null,
        })

        // Update local storage
        localStorage.setItem('connection_status', WalletStatusType.idle);
        localStorage.removeItem('selected_wallet');
    }

    return (
        <>
            {
                status === WalletStatusType.connected &&
                <span className="flex items-center px-4 w-full h-16 border-t border-current">

                    <Image
                        src={chainInfo.logo_url}
                        alt="logo"
                        className="rounded-full"
                        width={30}
                        height={30}
                        priority
                    />

                    <span className="ml-2 text-sm lg:text-base font-medium">{name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase()}</span>
                    <span className="ml-auto mr-4">
                        <ClipBoardButton address={address} />
                    </span>
                    <span className="flex justify-center w-9 h-9 rounded-full border border-transparent hover:border-current mr-4">
                        <button onClick={() => resetWalletConnection()}> <FaSignOutAlt className="w-5 h-5" /></button>
                    </span>
                </span>
            }
        </>
    )
}
