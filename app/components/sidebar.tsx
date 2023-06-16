'use client'

import { FaExchangeAlt, FaGlobe, FaDatabase, FaHome, FaPlug, FaBook, FaTimes } from 'react-icons/fa';
import Image from 'next/image'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { sideBarToggleState } from '../providers';

// Define the NavItem type
type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

// Define NavLinks
const navLinks: NavItem[] = [
    {
        label: "Home",
        href: "/",
        icon: <FaHome className="w-6 h-6 mr-3" />,
    },
    {
        label: "Manage Vaults",
        href: "/manage_vaults",
        icon: <FaDatabase className="w-6 h-6 mr-3" />,
    },
    {
        label: "Liquidity Requests",
        href: "/open_liquidity_requests",
        icon: <FaExchangeAlt className="w-6 h-6 mr-3" />,
    },
    {
        label: "Governance",
        href: "/governance",
        icon: <FaGlobe className="w-6 h-6 mr-3" />,
    },
    {
        label: "Docs",
        href: "/docs",
        icon: <FaBook className="w-6 h-6 mr-3" />,
    },
];

export default function SideBar() {
    // Get pathname
    const pathname = usePathname();

    // Get the recoil state for the sidebar toggle
    const [isOpen, setSideBarState] = useRecoilState(sideBarToggleState);

    // Update the state after initial render
    useEffect(() => setSideBarState(!isMobile), [])

    return (
        <div className={
            classNames({
                "fixed w-full h-full lg:w-80": true,
                "md:translate-x-0": true,
                "-translate-x-full": !isOpen
            })
        }>
            <div className="flex flex-col w-full h-full overflow-hidden text-gray-300 bg-gray-900 z-10">
                <span className="flex items-center w-full py-8 px-2">
                    <Image
                        src="/l1.png"
                        alt="sudostake Logo"
                        // className="dark:invert"
                        width={60}
                        height={60}
                        priority
                    />
                    <span className="ml-2 text-sm lg:text-lg font-bold">SudoStake</span>
                    <button onClick={() => setSideBarState(!isOpen)} className="rounded-full ml-auto mr-4 lg:hidden"> <FaTimes className="w-6 h-6" /></button>
                </span>

                <ul className="w-full flex flex-col mt-3 px-2 border-t border-gray-700">
                    {navLinks.map((item, index) => {
                        return (
                            <Link key={index} href={item.href}>
                                <li className={classNames({
                                    "flex items-center w-full h-16 px-3 mt-2 rounded hover:bg-gray-500 hover:text-gray-300": true,
                                    "bg-gray-700 text-gray-300": pathname === item.href
                                })}>
                                    {item.icon}
                                    <span className="ml-2 text-sm lg:text-lg font-medium">{item.label}</span>
                                </li>
                            </Link>
                        );
                    })}
                </ul>

                <a className="flex items-center px-3 w-full h-16 mt-auto bg-gray-800 hover:bg-gray-500 hover:text-gray-300" href="#">
                    <FaPlug className="w-6 h-6 mr-3" />
                    <span className="ml-2 text-sm lg:text-lg font-medium">Connect Wallet</span>
                </a>
            </div>
        </div>

    )
}
