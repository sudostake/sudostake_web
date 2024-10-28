'use client'

import { FaClipboard, FaClipboardCheck } from "react-icons/fa"
import { useState } from "react";

type ComponentProps = {
    address: string,
    label?: string,
    size?: 'min' | 'max'
}

export default function ClipBoardButton({ address, label, size = 'max' }: ComponentProps) {
    const [isCopied, setIsCopied] = useState(false);
    const isMax = size === 'max';

    async function copyTextToClipboard(text: string) {
        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                console.log("Text copied to clipboard!");
                return;
            } catch (error) {
                console.error("Clipboard API failed:", error);
            }
        }

        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // Prevents scrolling
        textArea.style.opacity = "0"; // Hide the text area
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand("copy");
            console.log("Text copied to clipboard!");
        } catch (error) {
            console.error("Fallback method failed:", error);
        } finally {
            document.body.removeChild(textArea);
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
        <span className="w-full flex flex-row items-center justify-between gap-4"
            role="button" onClick={handleCopyClick}>
            {label}
            <>
                {!isCopied && <FaClipboard className={`w-${isMax ? 5 : 4} h-${isMax ? 5 : 4}`} />}
                {isCopied && <FaClipboardCheck className={`w-${isMax ? 5 : 4} h-${isMax ? 5 : 4}`} />}
            </>
        </span>
    )
}
