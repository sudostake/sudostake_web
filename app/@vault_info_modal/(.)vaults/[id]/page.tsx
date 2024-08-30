'use client'

import Vault from "@/app/vaults/[id]/page";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';

export default function VaultModalView({ params }: { params: { id: string } }) {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <>

            {
                pathname.startsWith('/vaults/') &&
                <div role="button" onClick={() => router.back()}
                    className="fixed inset-0 bg-opacity-80 backdrop-blur-xs z-30" />
            }

            {
                pathname.startsWith('/vaults/') &&
                <span className={
                    classNames({
                        "z-30 fixed left-0 right-0 top-0 bottom-0": true,
                        "shadow-lg shadow-zinc-300 dark:shadow-black": true,
                        "lg:border border-zinc-300 dark:lg:border-zinc-800": true,
                        "w-full max-w-3xl mx-auto": true,
                        "dark:text-zinc-200": true,
                    })
                }>
                    <Vault params={{ ...params, intercepted: true }} />
                </span>
            }
        </>
    );
}
