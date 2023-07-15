'use client'

import { FaExchangeAlt, FaGlobe, FaDatabase, FaBook, FaTimes, FaLink } from 'react-icons/fa';
import Image from 'next/image'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { sideBarToggleState } from '../state';
import ConnectWalletButton from './connect_wallet_button';

type nav_itemItem = {
    label: string;
    href: string;
    target: string;
    icon: React.ReactNode;
};

const nav_itemLinks: nav_itemItem[] = [
    {
        label: "Manage Vaults",
        href: "/",
        target: "",
        icon: <FaDatabase className="w-6 h-6 mr-3" />,
    },
    {
        label: "Liquidity Requests",
        href: "/liquidity_requests",
        target: "",
        icon: <FaExchangeAlt className="w-6 h-6 mr-3" />,
    },
    {
        label: "Governance",
        href: "/governance",
        target: "",
        icon: <FaGlobe className="w-6 h-6 mr-3" />,
    },
    {
        label: "Docs",
        href: "https://github.com/sudostake",
        target: "_blank",
        icon: <FaBook className="w-6 h-6 mr-3" />,
    },
];

export default function SideBar() {
    const pathname = usePathname();
    const [isOpen, setSideBarState] = useRecoilState(sideBarToggleState);

    useEffect(() => setSideBarState(!isMobile), [setSideBarState])

    return (
        <div className={
            classNames({
                "fixed w-full h-full lg:w-80 z-20 lg:z-0": true,
                "md:translate-x-0": true,
                "bg-inherit": true,
                "-translate-x-full": !isOpen
            })
        }>
            <div className="flex flex-col w-full h-full overflow-hidden z-10 lg:border-r lg:border-current">
                <span className="flex items-center h-20 lg:h-24 py-4 px-2 lg:px-4 w-full border-b border-current">
                    <Image
                        src="/l1.png"
                        alt="sudostake Logo"
                        className="invert dark:invert-0"
                        width={50}
                        height={50}
                        priority
                    />
                    <span className="ml-2 text-lg lg:text-2xl font-bold">SudoStake</span>
                    <button onClick={() => setSideBarState(!isOpen)} className="rounded-full ml-auto mr-4 lg:hidden"> <FaTimes className="w-5 h-5" /></button>
                </span>

                <ul className="w-full flex flex-col mt-4 px-2">
                    {nav_itemLinks.map((nav_item, index) => {
                        return (
                            <Link key={index} href={nav_item.href} target={nav_item.target} onClick={() => setSideBarState(!isOpen)} passHref>
                                <li className={classNames({
                                    "flex items-center w-full h-16 px-3 mb-2 rounded-lg": true,
                                    "hover:border hover:border-current": true,
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
                    <ConnectWalletButton />
                </div>
            </div>
        </div>
    )
}
