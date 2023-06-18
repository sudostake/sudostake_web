'use client'

import { FaClipboard, FaClipboardCheck } from "react-icons/fa"
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { walletState } from "../providers";

export default function ClipBoardButton() {
    const { address } = useRecoilValue(walletState)
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
        <button onClick={() => handleCopyClick()} className="rounded-full">
            {!isCopied && <FaClipboard className="w-5 h-5" />}
            {isCopied && <FaClipboardCheck className="w-5 h-5" />}
        </button>
    )
}
