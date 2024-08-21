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
        label: "Assets",
        href: "/",
    },
    {
        label: "DEX",
        href: "/liquidity_requests",
    },
    {
        label: "Poll",
        href: "/governance",
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
                "max-sm:h-20",
                "max-sm:border-t",
                "sm:flex-col",
                "sm:inset-y-0 sm:left-0",
                "sm:border-r",
                "sm:w-56",
                "bg-opacity-80 backdrop-blur-xs",
            )
        }>
            <div
                className={
                    classNames(
                        "flex flex-row gap-2 items-center",
                        "border-zinc-300 dark:border-zinc-800",
                        "p-4 h-20",
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
                    "flex flex-nowrap overflow-auto no-scrollbar",
                    "max-sm:flex-row",
                    "max-sm:pl-4",
                    "sm:pt-4",
                    "sm:flex-col"
                )
            }>
                {nav_items.map((nav_item) => {
                    return (
                        <Link key={nav_item.label}
                            href={nav_item.href}
                            passHref
                            className={
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
                                        "shadow-[3px_9px_32px_-4px_rgba(0,0,0,0.07)] max-sm:bg-zinc-200 dark:bg-zinc-800":
                                            nav_item.href === pathname
                                    },
                                )
                            }>
                                {nav_item.label}
                            </span>
                        </Link>
                    );
                })}

                <span className={
                    classNames(
                        "sm:mt-auto",
                        "sm:border-t sm:border-zinc-300 dark:sm:border-zinc-800",
                        "min-w-36 w-full",
                        "flex items-center",
                        "sm:px-4 sm:py-2"
                    )
                }>
                    <a href="https://github.com/sudostake"
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full max-sm:justify-center rounded-lg p-2">
                        GitHub
                    </a>
                </span>
            </div>
        </div >
    );
}
