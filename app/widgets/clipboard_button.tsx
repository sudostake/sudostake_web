'use client'

import { FaClipboard, FaClipboardCheck } from "react-icons/fa"
import { useState } from "react";
import { toast } from "react-toastify";

type ComponentProps = {
    address: string,
    label?: string,
    size?: 'min' | 'max'
}

export default function ClipBoardButton({ address, label, size = 'max' }: ComponentProps) {
    const [isCopied, setIsCopied] = useState(false);
    const isMax = size === 'max';
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
        <span className="w-full flex flex-row items-center justify-between gap-4" role="button" onClick={handleCopyClick}>
            {label}
            <>
                {!isCopied && <FaClipboard className={`w-${isMax ? 5 : 4} h-${isMax ? 5 : 4}`} />}
                {isCopied && <FaClipboardCheck className={`w-${isMax ? 5 : 4} h-${isMax ? 5 : 4}`} />}
            </>
        </span>
    )
}
