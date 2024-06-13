'use client'

import Image from "next/image";
import { useConnectWallet } from "../hooks/use_connect_wallet";
import { useRecoilValue } from "recoil";
import { walletState } from "../state";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import isWebview from "is-ua-webview";
import { WalletStatusType } from "../enums/wallet_status_type";
import { WalletType } from "../enums/wallet_type";

type ComponentProps = {
    title: string,
}

export default function ConnectWalletOptions({ title }: ComponentProps) {
    const [no_signer_detected, setNoSigner] = useState(false);
    const [show_keplr, setShowKeplr] = useState(false);
    const [show_leap, setShowLeap] = useState(false);
    const [show_cosmostation, setShowCosmostation] = useState(false);
    const { mutate: connectWallet } = useConnectWallet();
    const { status, selected_wallet } = useRecoilValue(walletState);

    function handle_select_wallet(type: WalletType) {
        if (status !== WalletStatusType.connecting) {
            localStorage.setItem('selected_wallet', type);
            connectWallet();
        }
    };

    // Logic to connect correct wallet options(s)
    useEffect(() => {
        setTimeout(() => {
            const is_webview = isWebview(window.navigator.userAgent);
            const wallets = {
                keplr: Boolean(window?.keplr),
                leap: Boolean(window?.leap),
                cosmostation: Boolean(window?.cosmostation),
            };
            const only_keplr_signer = wallets.keplr && !wallets.leap && !wallets.cosmostation;

            setNoSigner(!wallets.keplr && !wallets.leap && !wallets.cosmostation);
            setShowKeplr((!is_webview && wallets.keplr) || (is_webview && only_keplr_signer));
            setShowLeap(wallets.leap);
            setShowCosmostation(!is_webview && wallets.cosmostation);
        }, 300);
    }, [setNoSigner, setShowKeplr, setShowLeap, setShowCosmostation]);

    const connect_wallet_home = () => {
        const keplr_image = <Image
            src="/keplr_logo.svg"
            alt="Keplr Wallet Logo"
            width={30}
            height={30}
            priority
        />;
        const leap_image = <Image
            src="/leap_wallet_logo.svg"
            alt="Leap Wallet Logo"
            width={30}
            height={30}
            priority
        />;
        const cosmostation_image = <Image
            src="/ibc_wallet.png"
            alt="Cosmostaion Wallet Logo"
            width={30}
            height={30}
            priority
        />;

        return (
            <>
                {
                    no_signer_detected &&
                    <div className="flex flex-col gap-8">
                        <span className="px-4 text-lg text-center">Install wallet to get started</span>
                        <span className="flex flex-row gap-16 items-center justify-center">
                            {keplr_image}
                            {leap_image}
                            {cosmostation_image}
                        </span>
                    </div>
                }

                {
                    !no_signer_detected &&
                    <div className="flex flex-col gap-8">
                        <span className="px-4 text-lg text-center">{title}</span>
                        {
                            show_leap &&
                            <button onClick={() => handle_select_wallet(WalletType.leap)} className="flex items-center border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 p-3 text-sm lg:text-base font-medium lg:font-medium h-14">
                                <>
                                    {leap_image}
                                    <span className="ml-2 text-sm lg:text-base font-medium">Leap</span>
                                    {
                                        status === WalletStatusType.connecting && selected_wallet === WalletType.leap &&
                                        <FaSpinner className="w-6 h-6 ml-auto mr-3 spinner" />
                                    }
                                </>
                            </button>
                        }

                        {
                            show_keplr &&
                            <button onClick={() => handle_select_wallet(WalletType.keplr)} className="flex items-center border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 p-3 text-sm lg:text-base font-medium lg:font-medium h-14">
                                <>
                                    {keplr_image}
                                    <span className="ml-2 text-sm lg:text-base font-medium">Keplr</span>
                                    {
                                        status === WalletStatusType.connecting && selected_wallet === WalletType.keplr &&
                                        <FaSpinner className="w-6 h-6 ml-auto mr-3 spinner" />
                                    }
                                </>
                            </button>
                        }

                        {
                            show_cosmostation &&
                            <button onClick={() => handle_select_wallet(WalletType.cosmostation)} className="flex items-center border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 p-3 text-sm lg:text-base font-medium lg:font-medium h-14">
                                <>
                                    {cosmostation_image}
                                    <span className="ml-2 text-sm lg:text-base font-medium">Cosmostation</span>
                                    {
                                        status === WalletStatusType.connecting && selected_wallet === WalletType.cosmostation &&
                                        <FaSpinner className="w-6 h-6 ml-auto mr-3 spinner" />
                                    }
                                </>
                            </button>
                        }
                    </div>
                }
            </>
        );
    }

    return (
        <div className="flex w-full h-full items-center justify-center">
            {connect_wallet_home()}
        </div>
    )
}
