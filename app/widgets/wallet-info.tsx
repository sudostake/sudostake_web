'use client'

import { FaEllipsisH, FaSignOutAlt } from "react-icons/fa"
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { walletState } from "../state";
import { WalletStatus } from "../enums/wallet_status";
import ClipBoardButton from "./clipboard_button";

export default function WalletInfo() {
    const [document_node, setDocumentNode] = useState<globalThis.Document>();
    const [isOpen, setIsOpen] = useState(false);
    const [{ name, wallet_logo_url, address }, setWalletState] = useRecoilState(walletState);

    const [targetRect, setTargetRect] = useState(null);
    const buttonRef = useRef(null);

    useLayoutEffect(() => {
        setDocumentNode(document);
    });

    function open_modal() {
        const rect = buttonRef.current.getBoundingClientRect();
        setTargetRect({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
        })

        setIsOpen(true)
    }

    function close_modal() {
        setTargetRect(null)
        setIsOpen(false)
    }

    function toggleModal() {
        isOpen ? close_modal() : open_modal()
    }

    function resetWalletConnection() {
        // Reset wallet connection state
        setWalletState({
            status: WalletStatus.idle,
            address: '',
            name: '',
            client: null,
            wallet_logo_url: '',
            selected_wallet: null
        })

        // Update local storage
        localStorage.removeItem('selected_wallet');
    }

    const modal_content = <>
        <span role="button"
            onClick={close_modal}
            className={`z-30 fixed inset-0 ${isOpen ? '' : 'hidden'}`} />

        <div className={classNames(
            {
                "absolute top-20 right-20 z-40 w-56 rounded-lg shadow-lg overflow-hidden": true,
                "divide-y divide-zinc-300 dark:divide-zinc-700": true,
                "bg-zinc-100 dark:bg-zinc-900": true,
                "hidden": !isOpen
            }
        )}>
            <div role="button" className={classNames({
                "p-2": true,
                "hover:bg-zinc-300 dark:hover:bg-zinc-700": true,
            })}>
                <ClipBoardButton label="Copy Address" address={address} size="min" />
            </div>
            <div role="button" onClick={resetWalletConnection} className={classNames({
                "p-2": true,
                "hover:bg-zinc-300 dark:hover:bg-zinc-700": true,
                "w-full flex flex-row items-center justify-between": true
            })}>
                <span>Log out</span>
                <FaSignOutAlt className="w-4 h-4" />
            </div>
        </div>
    </>;

    return (
        <>
            <div role="button"
                onClick={toggleModal}
                className="h-20 flex flex-row gap-2 justify-center items-center max-sm:grow px-4 sm:px-8"
                ref={buttonRef}>
                <Image
                    src={wallet_logo_url}
                    alt="wallet logo"
                    width={24}
                    height={24}
                    priority
                    className="rounded-full"
                />
                <span>{name}</span>
                <FaEllipsisH className="w-3 h-3" />
            </div>

            {document_node && createPortal(
                modal_content,
                document_node.body
            )}
        </>
    )
}
