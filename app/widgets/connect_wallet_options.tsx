'use client'
import Image from "next/image";
import { useConnectWallet } from "../hooks/use_connect_wallet";
import { useRecoilValue } from "recoil";
import { WalletStatusType, walletState } from "../state";
import { WalletType } from "../utils/supported_wallets";
import { FaSpinner } from "react-icons/fa";

type ComponentProps = {
    title: string,
}

export default function ConnectWalletOptions({ title }: ComponentProps) {
    const { mutate: connectWallet } = useConnectWallet();
    const { status } = useRecoilValue(walletState);

    function handle_select_wallet(type: WalletType) {
        localStorage.setItem('selected_wallet', type);
        connectWallet();
    }

    const connect_wallet_home = () => {
        switch (status) {
            case WalletStatusType.error:
            case WalletStatusType.idle: {
                return (
                    <div className="flex flex-col gap-8">
                        <span className="px-4 text-lg text-center">{title}</span>
                        <button onClick={() => handle_select_wallet(WalletType.keplr)} className="flex items-center border border-current rounded-lg hover:ring-2 hover:ring-offset-2 p-3 text-sm lg:text-base font-medium lg:font-medium">
                            <Image
                                src="/keplr_logo.svg"
                                alt="Keplr Wallet Logo"
                                width={30}
                                height={30}
                                priority
                            />
                            <span className="ml-2 text-sm lg:text-base font-medium">KEPLR</span>
                        </button>

                        <button onClick={() => handle_select_wallet(WalletType.leap)} className="flex items-center border border-current rounded-lg hover:ring-2 hover:ring-offset-2 p-3 text-sm lg:text-base font-medium lg:font-medium">
                            <Image
                                src="/leap_wallet_logo.svg"
                                alt="Leap Wallet Logo"
                                width={30}
                                height={30}
                                priority
                            />
                            <span className="ml-2 text-sm lg:text-base font-medium">LEAP</span>
                        </button>

                        <button onClick={() => handle_select_wallet(WalletType.cosmostation)} className="flex items-center border border-current rounded-lg hover:ring-2 hover:ring-offset-2 p-3 text-sm lg:text-base font-medium lg:font-medium">
                            <Image
                                src="/ibc_wallet.png"
                                alt="Cosmostaion Wallet Logo"
                                width={30}
                                height={30}
                                priority
                            />
                            <span className="ml-2 text-sm lg:text-base font-medium">COSMOSTATION</span>
                        </button>
                    </div>
                );
            }

            case WalletStatusType.connecting:
                return <button className="flex items-center mb-4 border border-current rounded-lg hover:ring-2 hover:ring-offset-2 p-3 text-sm lg:text-base font-medium lg:font-medium">
                    <FaSpinner className="w-6 h-6 mr-3 spinner" />
                    <span className="ml-2 text-sm lg:text-base font-medium">Connecting...</span>
                </button>

            default:
                return <></>
        }
    }

    return (
        <div className="flex w-full h-full items-center justify-center">
            {connect_wallet_home()}
        </div>
    )
}
