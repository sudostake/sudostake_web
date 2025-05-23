'use client'

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        label: "DEX",
        href: "/liquidity_requests",
    },
    {
        label: "Vote",
        href: "/governance",
    },
    {
        label: "Stats",
        href: "/statistics",
    },
];

export default function NavigationArea() {
    const pathname = usePathname();

    return (
        <div className={
            classNames(
                "z-20 flex fixed border-zinc-300 dark:border-zinc-800",
                "max-sm:flex-row",
                "max-sm:inset-x-0 bottom-0",
                "max-sm:h-14",
                "max-sm:border-t",
                "sm:flex-col",
                "sm:inset-y-0 sm:left-0",
                "sm:border-r",
                "sm:w-56",
                "bg-white dark:bg-zinc-900",
            )
        }>
            <div
                className={
                    classNames(
                        "flex flex-row gap-2 items-center",
                        "border-zinc-300 dark:border-zinc-800",
                        "p-4 h-14",
                        "max-sm:border-r",
                        "sm:border-b"
                    )
                }>

                <span className="max-sm:h-8 max-sm:w-8 flex items-center justify-center">
                    <span className='flex size-6 items-center'>
                        <Image
                            src="/logo.png"
                            alt="sudostake Logo"
                            className="invert-0 dark:invert rounded-full"
                            width={32}
                            height={32}
                            priority
                        />
                    </span>
                </span>


                <span className="max-sm:hidden text-lg">
                    SudoStake
                </span>
            </div>

            <div className={
                classNames(
                    "grow",
                    "flex flex-nowrap",
                    "max-sm:flex-row",
                    "sm:flex-col",
                    "sm:pt-4",
                    "max-sm:overflow-x-auto",
                    "max-sm:overflow-y-hidden",
                    "sm:overflow-y-auto",
                    "no-scrollbar"
                )
            }>
                {nav_items.map((nav_item) => {
                    return (
                        <Link key={nav_item.label}
                            href={nav_item.href}
                            passHref
                            className={
                                classNames(
                                    "w-full sm:min-w-36",
                                    "flex items-center",
                                    "sm:px-4 sm:py-2"
                                )
                            }>
                            <span className={
                                classNames(
                                    "flex w-full max-sm:justify-center sm:rounded-lg p-4",
                                    "sm:hover:shadow-lg sm:hover:bg-zinc-100 dark:sm:hover:bg-zinc-800",
                                    {
                                        "shadow-lg bg-zinc-100 dark:bg-zinc-800":
                                            nav_item.href === pathname
                                    },
                                )
                            }>
                                {nav_item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div >
    );
}
