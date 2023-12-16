'use client'

import { FaExchangeAlt, FaGlobe, FaDatabase, FaBook, FaTimes, FaLink, FaHistory } from 'react-icons/fa';
import Image from 'next/image'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { WalletStatusTypes, selectedChainState, sideBarToggleState, walletState } from '../state';
import ConnectedWalletButton from './connected_wallet_button';
import { get_chain_info_from_id, supportedChains } from '../utils/supported_chains';
import { useConnectWallet } from '../hooks/use_connect_wallet';

type nav_itemItem = {
    label: string;
    href: string;
    target: string;
    icon: React.ReactNode
};

export default function SideBar() {
    const pathname = usePathname();
    const [isOpen, setSideBarState] = useRecoilState(sideBarToggleState);
    const [chainInfo, setSelectedChainState] = useRecoilState(selectedChainState);
    const { address } = useRecoilValue(walletState);
    const nav_itemLinks: nav_itemItem[] = [
        {
            label: "My Vaults",
            href: "/",
            target: "",
            icon: <FaDatabase className="w-6 h-6 mr-2" />,
        },
        {
            label: "Markets",
            href: "/liquidity_requests",
            target: "",
            icon: <FaExchangeAlt className="w-6 h-6 mr-2" />,
        },
        {
            label: "Governance",
            href: "/governance",
            target: "",
            icon: <FaGlobe className="w-6 h-6 mr-2" />,
        },
        {
            label: "History",
            href: address && chainInfo && (`${chainInfo.explorer_url}/account/${address}`),
            target: "_blank",
            icon: <FaHistory className="w-6 h-6 mr-2" />,
        },

        {
            label: "Docs",
            href: "https://github.com/orgs/sudostake/repositories",
            target: "_blank",
            icon: <FaBook className="w-6 h-6 mr-3" />,
        },
    ];

    useEffect(() => setSideBarState(!isMobile), [setSideBarState]);

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

    return (
        <div className={
            classNames({
                "fixed w-full h-full lg:w-80 z-20 lg:z-0": true,
                "lg:translate-x-0": true,
                "bg-white dark:bg-zinc-950": true,
                "-translate-x-full": !isOpen,
                "transition ease-in-out duration-300 transform": true,
            })
        }>
            <div

                className={
                    classNames({
                        "flex flex-col w-full h-full overflow-hidden z-10 ": true,
                        "lg:border-r lg:border-zinc-400 dark:lg:border-zinc-700": true
                    })
                }
            >
                <span role='button' onClick={() => setSideBarState(!isOpen)}
                    className={
                        classNames({
                            "px-4 h-20 flex items-center w-full": true,
                            "border-b border-zinc-400 dark:border-zinc-700": true
                        })
                    }>
                    <Image
                        src="/logo_light.png"
                        alt="sudostake Logo"
                        className="invert dark:invert-0"
                        width={24}
                        height={24}
                        priority
                    />
                    <span className="ml-5 text-lg lg:text-2xl font-bold">SudoStake</span>
                    <span className="rounded-full ml-auto lg:hidden"> <FaTimes className="w-5 h-5" /></span>
                </span>

                <ul className="w-full flex flex-col mt-8 px-2">
                    {nav_itemLinks.map((nav_item, index) => {
                        return (
                            <Link key={index} href={nav_item.href} target={nav_item.target} onClick={(e) => {
                                setSideBarState(!isOpen);;
                            }} passHref>
                                <li className={classNames({
                                    "flex items-center w-full h-16 px-2 mb-2 rounded-lg": true,
                                    "hover:font-bold": true,
                                    "font-bold": nav_item.href === pathname,
                                })}>
                                    {nav_item.icon}
                                    <span className="ml-4 text-sm lg:text-base">{nav_item.label}</span>
                                    {nav_item.target && <span className="ml-auto"><FaLink className="w-4 h-4" /></span>}
                                </li>
                            </Link>
                        );
                    })}
                </ul>

                <div className="flex items-center w-full mt-auto">
                    <ConnectedWalletButton />
                </div>
            </div>
        </div>
    )
}
