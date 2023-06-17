'use client'

import { FaExchangeAlt, FaGlobe, FaDatabase, FaHome, FaPlug, FaBook, FaTimes } from 'react-icons/fa';
import Image from 'next/image'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { sideBarToggleState } from '../providers';

type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

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
        href: "/liquidity_requests",
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
    const pathname = usePathname();
    const [isOpen, setSideBarState] = useRecoilState(sideBarToggleState);

    useEffect(() => setSideBarState(!isMobile), [])

    return (
        <div className={
            classNames({
                "fixed w-full h-full lg:w-80": true,
                "md:translate-x-0": true,
                "bg-inherit":true,
                "-translate-x-full": !isOpen
            })
        }>
            <div className="flex flex-col w-full h-full overflow-hidden z-10 lg:border-r lg:border-current">
                <span className="flex items-center h-20 lg:h-24 py-4 px-4 w-full border-b border-current">
                    <Image
                        src="/l1.png"
                        alt="sudostake Logo"
                        className="invert"
                        width={40}
                        height={40}
                        priority
                    />
                    <span className="ml-2 text-lg lg:text-2xl font-bold">SudoStake</span>
                    <button onClick={() => setSideBarState(!isOpen)} className="rounded-full ml-auto mr-4 lg:hidden"> <FaTimes className="w-5 h-5" /></button>
                </span>

                <ul className="w-full flex flex-col mt-4 px-2">
                    {navLinks.map((item, index) => {
                        return (
                            <Link key={index} href={item.href} onClick={() => setSideBarState(!isOpen)}>
                                <li className={classNames({
                                    "flex items-center w-full h-16 px-3 mt-2": true,
                                    "rounded hover:border-2 hover:border-current": true
                                })}>
                                    {item.icon}
                                    <span className="ml-2 text-sm lg:text-lg font-medium">{item.label}</span>
                                </li>
                            </Link>
                        );
                    })}
                </ul>

                <a className="flex items-center px-3 w-full h-16 mt-auto hover:border-t-2 hover:border-current" href="#">
                    <FaPlug className="w-6 h-6 mr-3" />
                    <span className="ml-2 text-sm lg:text-lg font-medium">Connect Wallet</span>
                </a>
            </div>
        </div>
    )
}
