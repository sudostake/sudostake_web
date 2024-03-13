'use client'

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRecoilValue } from "recoil";
import { selectedChainState, walletState } from "../state";
import { FaLink } from "react-icons/fa";

type NavItem = {
    label: string;
    href: string;
};

const nav_items: NavItem[] = [
    {
        label: "Vaults",
        href: "/",
    },
    {
        label: "Deals",
        href: "/liquidity_requests",
    },
    {
        label: "Vote",
        href: "/governance",
    },
];

export default function NavigationArea() {
    const pathname = usePathname();
    const chainInfo = useRecoilValue(selectedChainState);
    const { address } = useRecoilValue(walletState);

    return (
        <div className={
            classNames(
                "z-20 flex fixed border-zinc-300 dark:border-zinc-700",
                "max-sm:flex-row",
                "max-sm:inset-x-0 bottom-0",
                "max-sm:h-20",
                "max-sm:border-t",
                "sm:flex-col",
                "sm:inset-y-0 sm:left-0",
                "sm:border-r",
                "sm:w-56",
                "bg-opacity-80 backdrop-blur-lg"
            )
        }>
            <div
                className={
                    classNames(
                        "flex flex-row gap-5 items-center",
                        "border-zinc-300 dark:border-zinc-700",
                        "p-4 h-20",
                        "max-sm:border-r",
                        "sm:border-b"
                    )
                }>

                <span className="h-8 w-8 flex flex-col items-center justify-center">
                    <Image
                        src="/logo_light.png"
                        alt="sudostake Logo"
                        className="invert dark:invert-0"
                        width={24}
                        height={24}
                        priority
                    />
                </span>

                <span className="max-sm:hidden text-lg lg:text-2xl font-bold">
                    SudoStake
                </span>
            </div>

            <div className={
                classNames(
                    "grow",
                    "flex flex-nowrap overflow-auto no-scrollbar",
                    "max-sm:flex-row",
                    "max-sm:pl-4",
                    "sm:pt-4",
                    "sm:flex-col"
                )
            }>
                {nav_items.map((nav_item) => {
                    return (
                        <Link key={nav_item.label} href={nav_item.href} passHref className={
                            classNames(
                                "min-w-36 w-full",
                                "flex items-center",
                                "sm:px-4 sm:py-2"
                            )
                        }>
                            <span className={
                                classNames(
                                    "flex w-full max-sm:justify-center rounded-lg p-4",
                                    "sm:hover:shadow-[3px_9px_32px_-4px_rgba(0,0,0,0.07)] dark:sm:hover:bg-zinc-900",
                                    {
                                        "shadow-[3px_9px_32px_-4px_rgba(0,0,0,0.07)] max-sm:bg-zinc-200 dark:bg-zinc-800": nav_item.href === pathname
                                    },
                                )
                            }>
                                {nav_item.label}
                            </span>
                        </Link>
                    );
                })}

                <Link key="History" href={address && chainInfo && (`${chainInfo.explorer_url}/account/${address}`)} passHref className={
                    classNames(
                        "min-w-36 w-full",
                        "flex items-center",
                        "sm:px-4 sm:py-2",
                    )
                }>
                    <span className={
                        classNames(
                            "flex items-center w-full max-sm:justify-center rounded-lg p-4",
                            "sm:hover:shadow-[3px_9px_32px_-4px_rgba(0,0,0,0.07)] dark:hover:bg-zinc-900",
                        )
                    }>
                        <span>History</span>
                        <span className="ml-auto max-sm:hidden"><FaLink className="w-4 h-4" /></span>
                    </span>
                </Link>

                <span className={
                    classNames(
                        "sm:mt-auto",
                        "sm:border-t sm:border-zinc-300 dark:sm:border-zinc-700",
                        "min-w-36 w-full",
                        "flex items-center",
                        "sm:px-4 sm:py-2"
                    )
                }>
                    <span className="flex w-full max-sm:justify-center rounded-lg p-2">
                        Docs
                    </span>
                </span>

                <span className={
                    classNames(
                        "min-w-36 w-full",
                        "flex items-center",
                        "sm:px-4 sm:py-2"
                    )
                }>
                    <span className="flex w-full max-sm:justify-center rounded-lg p-2 ">
                        Deal Types
                    </span>
                </span>
            </div>
        </div >
    );
}
