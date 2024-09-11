import classNames from "classnames";
import { useState } from "react";
import { FaEllipsisH, FaTimes, FaHistory } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import TransferVaultDialog from "./transfer_vault_dialog";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { selectedChainState } from "../state";
import ClipBoardButton from "./clipboard_button";
import { VaultIndex } from "../types/vault_index";

type ComponentProps = {
    vault_info: VaultIndex
}
export default function VaultInfoMenu({ vault_info }: ComponentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const chainInfo = useRecoilValue(selectedChainState);

    return (
        <div className="relative inline-block">
            <span role="button" onClick={() => setIsOpen(!isOpen)} className={
                classNames(
                    'w-7 h-7 inline-flex items-center justify-center rounded-lg hover:ring-1 hover:ring-offset-1',
                    {
                        'ring-1 ring-offset-1': isOpen
                    }
                )
            }>
                {
                    isOpen ? <FaTimes className={`w-5 h-5`} /> : <FaEllipsisH className={`w-5 h-5`} />
                }
            </span>

            {
                isOpen &&
                <span role="button" onClick={() => setIsOpen(!isOpen)} className="fixed inset-0 z-30" />
            }

            <div className={classNames({
                "absolute z-40 right-0 mt-2 w-56 origin-top-right rounded-lg shadow-lg overflow-hidden": true,
                "divide-y divide-zinc-300 dark:divide-zinc-900": true,
                "bg-zinc-100 dark:bg-zinc-800": true,
                "hidden": !isOpen
            })}>

                <div onClick={() => { router.push(`/vaults/${vault_info.id}`) }}
                    role="button" className={classNames({
                        "p-2": true,
                        "hover:bg-zinc-300 dark:hover:bg-zinc-700": true,
                    })}>
                    <span>View Details</span>
                </div>

                <div role="button" className={classNames({
                    "p-2": true,
                    "hover:bg-zinc-300 dark:hover:bg-zinc-700": true,
                })}>
                    <TransferVaultDialog key={vault_info.id} vault_info={vault_info} />
                </div>

                <div role="button" className={classNames({
                    "p-2": true,
                    "hover:bg-zinc-300 dark:hover:bg-zinc-700": true,
                })}>
                    <ClipBoardButton label="Copy Address" address={vault_info.id} size="min" />
                </div>

                <Link passHref href={(`${chainInfo.explorer_url}/account/${vault_info.id}`)}
                    target="_blank" role="button" className={classNames({
                        "p-2": true,
                        "hover:bg-zinc-300 dark:hover:bg-zinc-700": true,
                        "flex flex-row items-center justify-between": true
                    })}>
                    <span>History</span>
                    <span>
                        <FaHistory className={`w-4 h-4`} />
                    </span>
                </Link>
            </div>
        </div >
    );
}