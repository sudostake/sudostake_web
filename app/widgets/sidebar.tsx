'use client'

import { FaExchangeAlt, FaGlobe, FaDatabase, FaBook, FaTimes, FaLink, FaHistory } from 'react-icons/fa';
import Image from 'next/image'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedChainState, sideBarToggleState, walletState } from '../state';
import ConnectedWalletButton from './connected_wallet_button';

type nav_itemItem = {
    label: string;
    href: string;
    target: string;
    icon: React.ReactNode
};

export default function SideBar() {
    const pathname = usePathname();
    const user_in_vault_page = pathname.startsWith('/vaults/');
    const [isOpen, setSideBarState] = useRecoilState(sideBarToggleState);
    const { address } = useRecoilValue(walletState);
    const chainInfo = useRecoilValue(selectedChainState);

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

    return (
        <div className={
            classNames({
                "fixed w-full h-full lg:w-80 z-20 lg:z-0": true,
                "lg:translate-x-0": true,
                "bg-gray-300 dark:bg-black": true,
                "-translate-x-full": !isOpen,
                "transition ease-in-out duration-300 transform": true,
            })
        }>
            <div className="flex flex-col w-full h-full overflow-hidden z-10 lg:border-r lg:border-current">
                <span role='button' onClick={() => setSideBarState(!isOpen)}
                    className="py-4 px-4 flex items-center h-20 lg:h-24 w-full border-b border-current">
                    <Image
                        src="/logo_light.png"
                        alt="sudostake Logo"
                        className="invert dark:invert-0"
                        width={25}
                        height={25}
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
                                    "hover:border hover:border-current": true,
                                    "border border-current": nav_item.href === pathname,
                                    "border border-transparent": nav_item.href !== pathname
                                })}>
                                    {nav_item.icon}
                                    <span className="ml-4 text-sm lg:text-base font-medium">{nav_item.label}</span>
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
