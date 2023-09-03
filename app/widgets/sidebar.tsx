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
    icon: React.ReactNode;
    disabled_in_vault_page: boolean;
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
            disabled_in_vault_page: false,
        },
        {
            label: "Markets",
            href: "/liquidity_requests",
            target: "",
            icon: <FaExchangeAlt className="w-6 h-6 mr-2" />,
            disabled_in_vault_page: false,
        },
        {
            label: "Governance",
            href: "/governance",
            target: "",
            icon: <FaGlobe className="w-6 h-6 mr-2" />,
            disabled_in_vault_page: true,
        },
        {
            label: "History",
            href: address && chainInfo && (`${chainInfo.explorer_url}/account/${address}`),
            target: "_blank",
            icon: <FaHistory className="w-6 h-6 mr-2" />,
            disabled_in_vault_page: false,
        },

        {
            label: "Docs",
            href: "https://github.com/orgs/sudostake/repositories",
            target: "_blank",
            icon: <FaBook className="w-6 h-6 mr-3" />,
            disabled_in_vault_page: false,
        },
    ];

    useEffect(() => setSideBarState(!isMobile), [setSideBarState]);

    function handle_link_click(event: any, link_disabled_in_vault_page: boolean) {
        if (user_in_vault_page && link_disabled_in_vault_page) {
            event.preventDefault();
        } else {
            setSideBarState(!isOpen);
        }
    }

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
                <span role='button' onClick={() => setSideBarState(!isOpen)} className="flex items-center h-20 lg:h-24 py-4 px-2 lg:px-4 w-full border-b border-current">
                    <Image
                        src="/l1.png"
                        alt="sudostake Logo"
                        className="invert dark:invert-0"
                        width={50}
                        height={50}
                        priority
                    />
                    <span className="ml-2 text-lg lg:text-2xl font-bold">SudoStake</span>
                    <span className="rounded-full ml-auto mr-4 lg:hidden"> <FaTimes className="w-5 h-5" /></span>
                </span>

                <ul className="w-full flex flex-col mt-8 px-2">
                    {nav_itemLinks.map((nav_item, index) => {
                        return (
                            <Link key={index} href={nav_item.href} target={nav_item.target} onClick={(e) => {
                                handle_link_click(e, nav_item.disabled_in_vault_page);
                            }} passHref>
                                <li className={classNames({
                                    "flex items-center w-full h-16 px-3 mb-2 rounded-lg": true,
                                    "hover:border hover:border-current": !(user_in_vault_page && nav_item.disabled_in_vault_page),
                                    "cursor-none": user_in_vault_page && nav_item.disabled_in_vault_page,
                                    "border border-current": nav_item.href === pathname,
                                    "border border-transparent": nav_item.href !== pathname
                                })}>
                                    {nav_item.icon}
                                    <span className="ml-2 text-sm lg:text-base font-medium">{nav_item.label}</span>
                                    {nav_item.target && <span className="ml-auto"><FaLink className="w-4 h-4 mr-3" /></span>}
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
