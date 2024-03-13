'use client'

import { FaClipboard, FaClipboardCheck } from "react-icons/fa"
import { useState } from "react";
import { toast } from "react-toastify";

type ComponentProps = {
    address: string
}

export default function ClipBoardButton({ address }: ComponentProps) {
    const [isCopied, setIsCopied] = useState(false);
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = () => {
        copyTextToClipboard(address)
            .then(() => {
                toast(`Address copied`, { type: 'success' });
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <button className="flex items-center justify-center w-9 h-9 rounded-full border border-transparent hover:border-zinc-400" onClick={() => handleCopyClick()}>
            {!isCopied && <FaClipboard className="w-4 h-4" />}
            {isCopied && <FaClipboardCheck className="w-4 h-4" />}
        </button>
    )
}
