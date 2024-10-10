'use client'

import { FaEllipsisH, FaSignOutAlt } from "react-icons/fa"
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import ConnectWalletOptions from "./connect_wallet_options";

export default function ConnectWallet() {
    const [document_node, setDocumentNode] = useState<globalThis.Document>();
    const [isOpen, setIsOpen] = useState(false);

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

    const modal_content = <>
        <span role="button"
            onClick={close_modal}
            className={`z-30 fixed inset-0 ${isOpen ? '' : 'hidden'}`} />

        <div className={classNames(
            {
                "absolute sm:right-0 top-14 z-40 max-sm:w-full sm:min-w-96 shadow-lg overflow-hidden px-4 py-16": true,
                "max-sm:rounded-b-lg sm:rounded-bl-lg": true,
                "bg-white dark:bg-zinc-900": true,
                "divide-y divide-zinc-300 dark:divide-zinc-700": true,
                "hidden": !isOpen
            }
        )}>
            <ConnectWalletOptions title="Connect to manage vaults." />
        </div>
    </>;

    return (
        <>
            <div role="button"
                onClick={toggleModal}
                className="px-4 flex items-center border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 w-24 h-9 text-xs lg:text-sm lg:font-medium"
                ref={buttonRef}>
                <span>Connect</span>
            </div>

            {document_node && createPortal(
                modal_content,
                document_node.body
            )}
        </>
    )
}
