'use client'

import Vault from "@/app/vaults/[id]/page";
import { usePathname } from "next/navigation";

export default function VaultModalView({ params }: { params: { id: string } }) {
    const pathname = usePathname();

    return (
        <>
            {
                pathname.startsWith('/vaults/') &&
                <span className='z-19 fixed left-0 right-0 top-0 bottom-0 mx-auto sm:ml-56'>
                    <Vault params={params} />
                </span>
            }
        </>
    );
}
