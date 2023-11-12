'use client'

import Vault from "@/app/vaults/[id]/page";
import { usePathname } from "next/navigation";

export default function VaultModalView({ params }: { params: { id: string } }) {
    const pathname = usePathname();

    return (
        <>
            {
                pathname.startsWith('/vaults/') &&
                <span className='fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-gray-200 dark:bg-black lg:ml-80 mt-20'>
                    <Vault params={params} />
                </span>
            }
        </>
    );
}
